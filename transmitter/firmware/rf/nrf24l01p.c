#include <stdbool.h>
#include <stdint.h>
#include <stdlib.h>

#include <libopencm3/stm32/gpio.h>
#include <libopencm3/stm32/exti.h>
#include <libopencmsis/core_cm3.h>

#include <nrf24l01p.h>
#include <spi.h>


// ****************************************************************************
static uint8_t spi_buffer[NRF24_MAX_PAYLOAD_SIZE + 1];
static uint8_t rf_setup;
static nrf24_int_callback_t int_callback = NULL;

// ****************************************************************************
// Send a one-byte command to the nRF24.
// Returns the STATUS register value
// ****************************************************************************
static uint8_t write_command(uint8_t cmd)
{
    spi_buffer[0] = cmd;
    return SPI_transaction(1, spi_buffer);
}


// ****************************************************************************
// Write a command to the nRF24, followed by data bytes
// Returns the STATUS register value
// ****************************************************************************
static uint8_t write_command_buffer(uint8_t cmd, const uint8_t *buffer, uint8_t count)
{
    int i;

    if (count > NRF24_MAX_PAYLOAD_SIZE) {
        count = NRF24_MAX_PAYLOAD_SIZE;
    }

    spi_buffer[0] = cmd;
    for (i = 0; i < count; i++) {
        spi_buffer[i + 1] = buffer[i];
    }

    return SPI_transaction(count + 1, spi_buffer);
}


// ****************************************************************************
// Send a command to the nRF24 and read *count* bytes of data from the nRF24.
// Returns the STATUS register value
// ****************************************************************************
static uint8_t read_command_buffer(uint8_t cmd, uint8_t *buffer, uint8_t count)
{
    int i;

    if (count > NRF24_MAX_PAYLOAD_SIZE) {
        count = NRF24_MAX_PAYLOAD_SIZE;
    }

    spi_buffer[0] = cmd;

    SPI_transaction(count + 1, spi_buffer);

    for (i = 0; i < count; i++) {
        buffer[i] = spi_buffer[i + 1];
    }

    return spi_buffer[0];
}


// ****************************************************************************
uint8_t NRF24_read_register(uint8_t reg)
{
    spi_buffer[0] = NRF24_R_REGISTER | reg;
    spi_buffer[1] = 0;

    SPI_transaction(2, spi_buffer);

    return spi_buffer[1];
}


// ****************************************************************************
void NRF24_write_register(uint8_t reg, uint8_t value)
{
    // Data sheet page 52: The nRF24L01+ must be in a standby or power down mode
    // before writing to the configuration registers.
    // i.e. CE must be 0 in receive mode
    //
    // It is unclear what a "configuration register" is, because in order
    // to change to power down mode one has to write the CONFIG register?!
    // We assume that registers that configure the transceiver are meant, like
    // setting the channel, address, payload size, CRC, etc.
    //
    // It is left to the user of this library to set/clear CE properly.

    spi_buffer[0] = NRF24_W_REGISTER | reg;
    spi_buffer[1] = value;

    SPI_transaction(2, spi_buffer);
}


// ****************************************************************************
// Write a register that accepts multiple bytes of data
// Example: TX_ADDR register has up to 5 bytes of data
// Returns the STATUS register
// ****************************************************************************
uint8_t NRF24_write_multi_byte_register(uint8_t reg, const uint8_t *buffer, uint8_t count)
{
    return write_command_buffer(NRF24_W_REGISTER | reg, buffer, count);
}


// ****************************************************************************
// Return the contents of the STATUS register by issuing a NOP command
// ****************************************************************************
uint8_t NRF24_get_status(void)
{
    return write_command(NRF24_NOP);
}


// ****************************************************************************
void NRF24_flush_rx_fifo(void)
{
    write_command(NRF24_FLUSH_RX);
}


// ****************************************************************************
void NRF24_flush_tx_fifo(void)
{
    write_command(NRF24_FLUSH_TX);
}


// ****************************************************************************
void NRF24_write_payload(const uint8_t payload[], uint8_t payload_size)
{
    write_command_buffer(NRF24_W_TX_PAYLOAD, payload, payload_size);
}


// ****************************************************************************
void NRF24_write_payload_noack(const uint8_t payload[], uint8_t payload_size)
{
    write_command_buffer(NRF24_W_TX_PAYLOAD_NOACK, payload, payload_size);
}


// ****************************************************************************
void NRF24_read_payload(uint8_t *payload, uint8_t payload_size)
{
    read_command_buffer(NRF24_R_RX_PAYLOAD, payload, payload_size);
}


// ****************************************************************************
void NRF24_activate(uint8_t code)
{
    spi_buffer[0] = NRF24_ACTIVATE;
    spi_buffer[1] = code;

    SPI_transaction(2, spi_buffer);
}


// ****************************************************************************
void NRF24_set_bitrate(uint8_t bitrate)
{
    rf_setup = rf_setup & 0xd7;             // Preset 1 mbps

    if (bitrate == 250) {
        rf_setup |= NRF24_RF_DR_LOW;        // 250 kbps
    }
    else if (bitrate != 1) {
        rf_setup |= NRF24_RF_DR_HIGH;       // Default to 2 Mbps
    }

    NRF24_write_register(NRF24_RF_SETUP, rf_setup);
}


// ****************************************************************************
void NRF24_set_power(uint8_t power)
{
    rf_setup = (rf_setup & 0xf9) | ((power & 0x03) << 1);
    NRF24_write_register(NRF24_RF_SETUP, rf_setup);
}


// ****************************************************************************
// Interrupt handler for EXTI8 (our nRF IRQ goes to PA8, hence EXTI8)
void exti9_5_isr(void)
{
    exti_reset_request(EXTI8);
    if (int_callback) {
        (*int_callback)();
    }
}


// ****************************************************************************
void NRF24_enable_interrupt(nrf24_int_callback_t callback)
{
    int_callback = callback;

    // GPIO PA8 setup for falling-edge IRQ, with a pull-down
    gpio_set_mode(GPIOA, GPIO_MODE_INPUT, GPIO_CNF_INPUT_PULL_UPDOWN, GPIO8);
    gpio_clear(GPIOA, GPIO8);

    exti_select_source(EXTI8, GPIOA);
    exti_set_trigger(EXTI8, EXTI_TRIGGER_FALLING);
    exti_enable_request(EXTI8);
    nvic_enable_irq(NVIC_EXTI9_5_IRQ);
}

// ****************************************************************************
void NRF24_init(void)
{
    rf_setup = 0x0f;
}