#include <stdint.h>
#include <stdio.h>
// #include <string.h>

#include <libopencm3/stm32/gpio.h>
#include <libopencm3/stm32/rcc.h>
#include <libopencm3/stm32/timer.h>
#include <libopencmsis/core_cm3.h>

#include <led.h>
#include <systick.h>
#include <uart.h>
#include <watchdog.h>
#include <webusb.h>


// ****************************************************************************
static void clock_init(void)
{
    rcc_clock_setup_in_hsi_out_48mhz();

    // Enable clocks for GPIO ports
    // IMPORTANT: you can not 'or' them into one call due to bit-mangling
    rcc_periph_clock_enable(RCC_GPIOA);
    rcc_periph_clock_enable(RCC_GPIOB);
    rcc_periph_clock_enable(RCC_GPIOC);
    rcc_periph_clock_enable(RCC_AFIO);
}


// ****************************************************************************
int main(void)
{
    clock_init();
    SYSTICK_init();
    UART_init();
    WEBUSB_init();
    WATCHDOG_start();
    LED_init();
    printf("\n\n\n**********\nUSB dongle initialized\n");

    while (1) {
        WATCHDOG_reset();
        WEBUSB_poll();
    }

    return 0;
}
