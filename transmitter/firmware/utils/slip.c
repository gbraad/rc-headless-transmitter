#include <stdint.h>
#include <string.h>

#include <slip.h>

// SLIP protocol implementation according to RFC1055
// https://tools.ietf.org/html/rfc1055

// Special SLIP character codes
#define END             0xc0        // Start/end of packet
#define ESC             0xdb        // Byte stuffing
#define ESC_END         0xdc        // ESC ESC_END means END data byte
#define ESC_ESC         0xdd        // ESC ESC_ESC means ESC data byte


// ****************************************************************************
void SLIP_init(slip_t *s)
{
    s->state = SLIP_IDLE;
    s->message_size = 0;
}


// ****************************************************************************
bool SLIP_decode(slip_t *s, uint8_t new_input)
{
    // If we are getting called after we received already a complete message,
    // re-initialize for receiving a new message
    if (s->state == SLIP_MESSAGE_RECEIVED) {
        SLIP_init(s);
    }

    // If the SLIP message is too long wait until it finishes, then start
    // capturing the next message. This means long messages are simply ignored.
    if (s->state == SLIP_OVERFLOW) {
        if (new_input == END) {
            SLIP_init(s);
        }
        return false;
    }

    switch (new_input) {
        case END:
            // We return True only if we received a message
            if (s->message_size) {
                s->state = SLIP_MESSAGE_RECEIVED;
                return true;
            }
            return false;

        case ESC:
            s->state = SLIP_ESC;
            break;

        default:
            if (s->state == SLIP_ESC) {
                s->state = SLIP_IDLE;
                switch (new_input) {
                    case ESC_ESC:
                        new_input = ESC;
                        break;

                    case ESC_END:
                        new_input = END;
                        break;

                    // Protocol violation; handle it gracefully by ignoring ESC
                    default:
                        break;
                }
            }

            if (s->message_size < s->buffer_size) {
                s->buffer[s->message_size] = new_input;
                ++s->message_size;
            }
            else {
                s->state = SLIP_OVERFLOW;
            }
            break;
    }

    return false;
}


// ****************************************************************************
void SLIP_encode(const uint8_t *data, uint8_t length, void (* callback)(uint8_t))
{
    if (callback == NULL  ||  length == 0) {
        return;
    }

    callback(END);

    while (length) {

        switch (*data) {
            case END:
                callback(ESC);
                callback(ESC_END);
                break;

            case ESC:
                callback(ESC);
                callback(ESC_ESC);
                break;

            default:
                callback(*data);
        }

        --length;
        ++data;
    }

    callback(END);
}