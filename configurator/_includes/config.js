var CONFIG_VERSIONS = CONFIG_VERSIONS || {};

// Legend:
// o: offset with the parent structure
// s: element size (number of bytes)
// c: count (number of elements)
// h: human-friendly name (optional)
// t: type
//      'u': unsigned integer
//      'i': signed integer
//      'c': string (Note: may not be 0 terminated if it fills the element)
//      'uuid': 128-bit (16 bytes) universally unique identifier
//      'CONFIG': schema describes the overall config structure
//      'TX': schema describes a transmitter
//      'MODEL': schema describes a model
//      any other value: refers to named elements in TYPES[]

CONFIG_VERSIONS[1] = {
    CONFIG: { t: 'CONFIG', o: 0, s: 4612, c: 1,
        VERSION: {o: 0, s: 4, c: 1, t: 'u'},
        TX: {o: 4, s: 1720, c: 1, t: 's'},
        MODEL: {o: 1724, s: 2888, c: 1, t: 's'},
    },

    TX: { o: 4, s: 1720, c: 1, t: 'TX',
        UUID: {t: 'uuid', o: 0, s: 1, c: 16},
        NAME: {t: 'c', o: 16, s: 1, c: 16},
        LAST_CHANGED: {t: 'u', o: 32, s: 4, c: 1},
        HARDWARE_INPUTS: {t: 's', o: 36, s: 32, c: 32},
        HARDWARE_INPUTS_PCB_INPUT: {t: 's', o: 36, s: 24, c: 1},
        HARDWARE_INPUTS_PCB_INPUT_GPIOPORT: {t: 'u', o: 36, s: 4, c: 1},
        HARDWARE_INPUTS_PCB_INPUT_GPIO: {t: 'u', o: 40, s: 2, c: 1},
        HARDWARE_INPUTS_PCB_INPUT_ADC_CHANNEL: {t: 'u', o: 42, s: 1, c: 1},
        HARDWARE_INPUTS_PCB_INPUT_TYPE: {t: 'pcb_input_type_t', o: 43, s: 1, c: 1},
        HARDWARE_INPUTS_PCB_INPUT_PIN_NAME: {t: 'c', o: 44, s: 1, c: 10},
        HARDWARE_INPUTS_PCB_INPUT_SCHEMATIC_REFERENCE: {t: 'c', o: 54, s: 1, c: 6},
        HARDWARE_INPUTS_TYPE: {t: 'hardware_input_type_t', o: 60, s: 1, c: 1},
        HARDWARE_INPUTS_CALIBRATION: {t: 'u', o: 62, s: 2, c: 3},
        LOGICAL_INPUTS: {t: 's', o: 1060, s: 20, c: 32},
        LOGICAL_INPUTS_TYPE: {t: 'input_type_t', o: 1060, s: 1, c: 1},
        LOGICAL_INPUTS_SUB_TYPE: {t: 'input_sub_type_t', o: 1061, s: 1, c: 1},
        LOGICAL_INPUTS_POSITION_COUNT: {t: 'u', o: 1062, s: 1, c: 1},
        LOGICAL_INPUTS_HARDWARE_INPUTS: {t: 'u', o: 1063, s: 1, c: 12},
        LOGICAL_INPUTS_LABELS: {t: 'input_label_t', o: 1075, s: 1, c: 5},
        TRIM_RANGE: {t: 'i', o: 1700, s: 4, c: 1},
        TRIM_STEP_SIZE: {t: 'i', o: 1704, s: 4, c: 1},
        BIND_TIMEOUT_MS: {t: 'u', o: 1708, s: 4, c: 1},
        DOUBLE_CLICK_TIMEOUT_MS: {t: 'u', o: 1712, s: 4, c: 1},
        LED_PWM_PERCENT: {t: 'u', o: 1716, s: 1, c: 1},
    },

    MODEL: { o: 1724, s: 2888, c: 1, t: 'MODEL',
        UUID: {t: 'uuid', o: 0, s: 1, c: 16},
        NAME: {t: 'c', o: 16, s: 1, c: 16},
        LAST_CHANGED: {t: 'u', o: 32, s: 4, c: 1},
        MIXER_UNITS: {t: 's', o: 36, s: 26, c: 100},
        MIXER_UNITS_CURVE: {t: 's', o: 36, s: 15, c: 1},
        MIXER_UNITS_CURVE_TYPE: {t: 'curve_type_t', o: 36, s: 1, c: 1},
        MIXER_UNITS_CURVE_SMOOTHING: {t: 'interpolation_type_t', o: 37, s: 1, c: 1},
        MIXER_UNITS_CURVE_POINTS: {t: 'i', o: 38, s: 1, c: 13},
        MIXER_UNITS_SRC: {t: 'src_label_t', h: 'Source', o: 51, s: 1, c: 1},
        MIXER_UNITS_DST: {t: 'channel_label_t', h: 'Destination', o: 52, s: 1, c: 1},
        MIXER_UNITS_SW: {t: 's', o: 53, s: 3, c: 1},
        MIXER_UNITS_SW_SW: {t: 'input_label_t', h: 'Switch', o: 53, s: 1, c: 1},
        MIXER_UNITS_SW_CMP: {t: 'comparison_t', h: 'Comparison', o: 54, s: 1, c: 1},
        MIXER_UNITS_SW_VALUE: {t: 'u', o: 55, s: 1, c: 1},
        MIXER_UNITS_OP: {t: 'operation_type_t', h: 'Operation', o: 56, s: 1, c: 1},
        MIXER_UNITS_SCALAR: {t: 'i', o: 57, s: 1, c: 1},
        MIXER_UNITS_OFFSET: {t: 'i', o: 58, s: 1, c: 1},
        MIXER_UNITS_TAG: {t: 'u', o: 59, s: 1, c: 1},
        MIXER_UNITS_INVERT_SOURCE: {t: 'u', o: 60, s: 1, c: 1},
        MIXER_UNITS_APPLY_TRIM: {t: 'u', o: 61, s: 1, c: 1},
        LIMITS: {t: 's', o: 2636, s: 28, c: 8},
        LIMITS_EP_L: {t: 'i', o: 2636, s: 4, c: 1},
        LIMITS_EP_H: {t: 'i', o: 2640, s: 4, c: 1},
        LIMITS_SUBTRIM: {t: 'i', o: 2644, s: 4, c: 1},
        LIMITS_LIMIT_L: {t: 'i', o: 2648, s: 4, c: 1},
        LIMITS_LIMIT_H: {t: 'i', o: 2652, s: 4, c: 1},
        LIMITS_FAILSAFE: {t: 'i', o: 2656, s: 4, c: 1},
        LIMITS_SPEED: {t: 'u', o: 2660, s: 1, c: 1},
        LIMITS_INVERT: {t: 'u', o: 2661, s: 1, c: 1},
        RF_PROTOCOL_TYPE: {t: 'rf_protocol_type_t', o: 2860, s: 1, c: 1},
        RF: {t: 's', o: 2861, s: 25, c: 1},
        RF_PROTOCOL_HK310: {t: 's', o: 2861, s: 25, c: 1},
        RF_PROTOCOL_HK310_HOP_CHANNELS: {t: 'u', o: 2861, s: 1, c: 20},
        RF_PROTOCOL_HK310_ADDRESS: {t: 'u', o: 2881, s: 1, c: 5},
    },

    TYPES: {
        pcb_input_type_t: {
            'Input not present': 0,
            'Analog/Digital': 1,
            'Digital': 2,
        },
        hardware_input_type_t: {
            'Input not used': 0,
            'Analog, center detent': 1,
            'Analog': 2,
            'Analog, positive only': 3,
            'On/Off switch': 4,
            'On/Off/On switch': 5,
            'Push-button': 6,
        },
        input_type_t: {
            'Input not used': 0,
            'Analog': 1,
            'Switch': 2,
            'BCD switch': 3,
            'Momentary switch': 4,
            'Trim': 5,
        },
        input_sub_type_t: {
            'SUB_TYPE_NOT_APPLICABLE': 0,
            'Up/Down buttons': 1,
            'Increment-and-loop': 2,
            'Decrement-and-loop': 3,
            'Sawtooth': 4,
            'Double-click for decrement': 5,
        },
        input_label_t: {
            'NONE': 0,
            'ST': 1,
            'TH': 2,
            'THR': 3,
            'RUD': 4,
            'AIL': 5,
            'ELE': 6,
            'AUX': 7,
            'ST-DR': 8,
            'RUD-DR': 9,
            'AIL-DR': 10,
            'ELE-DR': 11,
            'TH-DR': 12,
            'THR-DR': 13,
            'TH-HOLD': 14,
            'GEAR': 15,
            'FLAPS': 16,
            'TRAINER': 17,
            'SIDE-L': 18,
            'SIDE-R': 19,
            'POT1': 20,
            'POT2': 21,
            'POT3': 22,
            'POT4': 23,
            'POT5': 24,
            'POT6': 25,
            'POT7': 26,
            'POT8': 27,
            'POT9': 28,
            'SW1': 29,
            'SW2': 30,
            'SW3': 31,
            'SW4': 32,
            'SW5': 33,
            'SW7': 35,
            'SW8': 36,
            'SW9': 37,
        },
        channel_label_t: {
            'CH1': 0,
            'CH2': 1,
            'CH3': 2,
            'CH4': 3,
            'CH5': 4,
            'CH6': 5,
            'CH7': 6,
            'CH8': 7,
            'VIRTUAL1': 8,
            'VIRTUAL2': 9,
            'VIRTUAL3': 10,
            'VIRTUAL4': 11,
            'VIRTUAL5': 12,
            'VIRTUAL6': 13,
            'VIRTUAL7': 14,
            'VIRTUAL8': 15,
            'VIRTUAL9': 16,
            'VIRTUAL10': 17,
        },
        src_label_t: {
            'NONE': 0,
            'NONE': 1,
            'ST': 2,
            'TH': 3,
            'THR': 4,
            'RUD': 5,
            'AIL': 6,
            'ELE': 7,
            'AUX': 8,
            'ST-DR': 9,
            'RUD-DR': 10,
            'AIL-DR': 11,
            'ELE-DR': 12,
            'TH-DR': 13,
            'THR-DR': 14,
            'TH-HOLD': 15,
            'GEAR': 16,
            'FLAPS': 17,
            'TRAINER': 18,
            'SIDE-L': 19,
            'SIDE-R': 20,
            'POT1': 21,
            'POT2': 22,
            'POT3': 23,
            'POT4': 24,
            'POT5': 25,
            'POT6': 26,
            'POT7': 27,
            'POT8': 28,
            'POT9': 29,
            'SW1': 30,
            'SW2': 31,
            'SW3': 32,
            'SW4': 33,
            'SW5': 34,
            'SW7': 36,
            'SW8': 37,
            'SW9': 38,
            'CH1': 39,
            'CH2': 40,
            'CH3': 41,
            'CH4': 42,
            'CH5': 43,
            'CH6': 44,
            'CH7': 45,
            'CH8': 46,
            'VIRTUAL1': 47,
            'VIRTUAL2': 48,
            'VIRTUAL3': 49,
            'VIRTUAL4': 50,
            'VIRTUAL5': 51,
            'VIRTUAL6': 52,
            'VIRTUAL7': 53,
            'VIRTUAL8': 54,
            'VIRTUAL9': 55,
            'VIRTUAL10': 56,
        },
        rf_protocol_type_t: {
            'HobbyKing HKR3000': 0,
        },
        operation_type_t: {
            '=': 0,
            '+': 1,
            '*': 2,
            'MIN': 3,
            'MAX': 4,
        },
        comparison_t: {
            '==': 0,
            '!=': 1,
            '>': 2,
            '>=': 3,
            '<': 4,
            '<=': 5,
        },
        curve_type_t: {
            'Linear': 0,
            'Fixed value': 1,
            'Min/Max': 2,
            '0/Max': 3,
            '>0': 4,
            '<0': 5,
            'Absolute': 6,
            'Expo': 7,
            'Deadband': 8,
            '3-Point': 9,
            '5-Point': 10,
            '7-Point': 11,
            '9-Point': 12,
            '11-Point': 13,
            '13-Point': 14,
        },
        interpolation_type_t: {
            'Linear': 0,
            'Smoothing': 1,
        },
    }
};
