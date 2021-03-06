This directory contains the firmware that goes into the [*headless transmitter*](https://github.com/laneboysrc/rc-headless-transmitter).

It runs on the STM32F103C8T6 micro-controller.

The software makes used of [libopencm3](http://libopencm3.org/).

The firmware is built using a [GNU Make](https://www.gnu.org/software/make/) makefile. The compiler is [ARM GCC toolchain](https://launchpad.net/gcc-arm-embedded), version 5.2.1. [OpenOCD](http://openocd.org/) is used to program the firmware into the micro-controller.

In the [Makefile](Makefile), adjust the variable `GNU_INSTALL_ROOT` and `OPENOCD` to match your installation.

Run

    make

to build the firmware. When done, run

    make program

to flash the firmware into the micro-controller.

