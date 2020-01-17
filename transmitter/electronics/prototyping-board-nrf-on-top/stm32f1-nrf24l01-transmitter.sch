EESchema Schematic File Version 4
EELAYER 30 0
EELAYER END
$Descr A4 11693 8268
encoding utf-8
Sheet 1 1
Title "STM32F1 NRF24L01 RC transmitter"
Date "2017-02-09"
Rev "2"
Comp "LANE Boys RC"
Comment1 ""
Comment2 ""
Comment3 ""
Comment4 ""
$EndDescr
$Comp
L stm32f1-nrf24l01-transmitter-rescue:NRF24L01P U3
U 1 1 57202BD1
P 9650 1650
F 0 "U3" H 9300 2100 60  0000 L CNN
F 1 "NRF24L01P" H 9950 1150 60  0000 C CNN
F 2 "WLA:NRF24L01P-PA-LNA" H 9650 1650 60  0001 C CNN
F 3 "~" H 9650 1650 60  0000 C CNN
	1    9650 1650
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:LIPO_CHARGER_+_PROTECTION U1
U 1 1 57202BEA
P 3000 6650
F 0 "U1" H 2000 7200 60  0000 L CNN
F 1 "LIPO_CHARGER_+_PROTECTION" H 3000 6650 60  0000 C CNN
F 2 "WLA:LiPo_charger_and_protection" H 3000 6650 60  0001 C CNN
F 3 "~" H 3000 6650 60  0000 C CNN
	1    3000 6650
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:BATTERY BT1
U 1 1 57202BF9
P 1300 6650
F 0 "BT1" H 1300 6850 50  0000 C CNN
F 1 "BATTERY" H 1300 6460 50  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 1300 6650 60  0001 C CNN
F 3 "~" H 1300 6650 60  0000 C CNN
	1    1300 6650
	0    1    1    0   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR01
U 1 1 57202C42
P 6450 7300
F 0 "#PWR01" H 6450 7300 30  0001 C CNN
F 1 "GND" H 6450 7230 30  0001 C CNN
F 2 "" H 6450 7300 60  0000 C CNN
F 3 "" H 6450 7300 60  0000 C CNN
	1    6450 7300
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VDD #PWR02
U 1 1 57202CE6
P 6450 6400
F 0 "#PWR02" H 6450 6500 30  0001 C CNN
F 1 "VDD" H 6450 6510 30  0000 C CNN
F 2 "" H 6450 6400 60  0000 C CNN
F 3 "" H 6450 6400 60  0000 C CNN
	1    6450 6400
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VDD #PWR03
U 1 1 57202CFF
P 4550 850
F 0 "#PWR03" H 4550 950 30  0001 C CNN
F 1 "VDD" H 4550 960 30  0000 C CNN
F 2 "" H 4550 850 60  0000 C CNN
F 3 "" H 4550 850 60  0000 C CNN
	1    4550 850 
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VCC #PWR04
U 1 1 57202D18
P 5550 850
F 0 "#PWR04" H 5550 950 30  0001 C CNN
F 1 "VCC" H 5550 950 30  0000 C CNN
F 2 "" H 5550 850 60  0000 C CNN
F 3 "" H 5550 850 60  0000 C CNN
	1    5550 850 
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR05
U 1 1 57202D59
P 4800 4750
F 0 "#PWR05" H 4800 4750 30  0001 C CNN
F 1 "GND" H 4800 4680 30  0001 C CNN
F 2 "" H 4800 4750 60  0000 C CNN
F 3 "" H 4800 4750 60  0000 C CNN
	1    4800 4750
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR06
U 1 1 57202D68
P 5000 4750
F 0 "#PWR06" H 5000 4750 30  0001 C CNN
F 1 "GND" H 5000 4680 30  0001 C CNN
F 2 "" H 5000 4750 60  0000 C CNN
F 3 "" H 5000 4750 60  0000 C CNN
	1    5000 4750
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR07
U 1 1 57202D77
P 5200 4750
F 0 "#PWR07" H 5200 4750 30  0001 C CNN
F 1 "GND" H 5200 4680 30  0001 C CNN
F 2 "" H 5200 4750 60  0000 C CNN
F 3 "" H 5200 4750 60  0000 C CNN
	1    5200 4750
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:C-RESCUE-stm32f1-nrf24l01-transmitter C1
U 1 1 57202EE1
P 10350 1150
F 0 "C1" H 10350 1250 40  0000 L CNN
F 1 "1u" H 10356 1065 40  0000 L CNN
F 2 "Capacitors_SMD:C_0805_HandSoldering" H 10388 1000 30  0001 C CNN
F 3 "~" H 10350 1150 60  0000 C CNN
	1    10350 1150
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR08
U 1 1 57202EF0
P 10350 1450
F 0 "#PWR08" H 10350 1450 30  0001 C CNN
F 1 "GND" H 10350 1380 30  0001 C CNN
F 2 "" H 10350 1450 60  0000 C CNN
F 3 "" H 10350 1450 60  0000 C CNN
	1    10350 1450
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VCC #PWR09
U 1 1 57202F26
P 9650 750
F 0 "#PWR09" H 9650 850 30  0001 C CNN
F 1 "VCC" H 9650 850 30  0000 C CNN
F 2 "" H 9650 750 60  0000 C CNN
F 3 "" H 9650 750 60  0000 C CNN
	1    9650 750 
	1    0    0    -1  
$EndComp
Text Label 6700 3150 2    60   ~ 0
CSN
Text Label 6700 3300 2    60   ~ 0
SCK
Text Label 6700 3450 2    60   ~ 0
MISO
Text Label 6700 3600 2    60   ~ 0
MOSI
Text Label 8500 1500 0    60   ~ 0
IRQ
Text Label 8500 1600 0    60   ~ 0
MISO
Text Label 8500 1700 0    60   ~ 0
MOSI
Text Label 8500 1800 0    60   ~ 0
SCK
Text Label 8500 1900 0    60   ~ 0
CSN
$Comp
L stm32f1-nrf24l01-transmitter-rescue:R-RESCUE-stm32f1-nrf24l01-transmitter R1
U 1 1 572032A2
P 7550 5850
F 0 "R1" V 7630 5850 40  0000 C CNN
F 1 "1k" V 7557 5851 40  0000 C CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 7480 5850 30  0001 C CNN
F 3 "~" H 7550 5850 30  0000 C CNN
	1    7550 5850
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_2 P2
U 1 1 572032B1
P 7200 5350
F 0 "P2" V 7150 5350 40  0000 C CNN
F 1 "LED" V 7250 5350 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 7200 5350 60  0001 C CNN
F 3 "" H 7200 5350 60  0000 C CNN
	1    7200 5350
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VCC #PWR010
U 1 1 572032C0
P 7550 5100
F 0 "#PWR010" H 7550 5200 30  0001 C CNN
F 1 "VCC" H 7550 5200 30  0000 C CNN
F 2 "" H 7550 5100 60  0000 C CNN
F 3 "" H 7550 5100 60  0000 C CNN
	1    7550 5100
	1    0    0    -1  
$EndComp
NoConn ~ 3700 3900
NoConn ~ 3700 4050
NoConn ~ 6250 4050
Text Label 7950 6100 2    60   ~ 0
LED
Text Label 3200 3750 0    60   ~ 0
LED
$Comp
L stm32f1-nrf24l01-transmitter-rescue:R-RESCUE-stm32f1-nrf24l01-transmitter R2
U 1 1 57203444
P 8750 5450
F 0 "R2" V 8830 5450 40  0000 C CNN
F 1 "22k" V 8757 5451 40  0000 C CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 8680 5450 30  0001 C CNN
F 3 "~" H 8750 5450 30  0000 C CNN
	1    8750 5450
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:R-RESCUE-stm32f1-nrf24l01-transmitter R3
U 1 1 57203451
P 8750 6050
F 0 "R3" V 8830 6050 40  0000 C CNN
F 1 "33k" V 8757 6051 40  0000 C CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 8680 6050 30  0001 C CNN
F 3 "~" H 8750 6050 30  0000 C CNN
	1    8750 6050
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VDD #PWR011
U 1 1 57203459
P 8750 5100
F 0 "#PWR011" H 8750 5200 30  0001 C CNN
F 1 "VDD" H 8750 5210 30  0000 C CNN
F 2 "" H 8750 5100 60  0000 C CNN
F 3 "" H 8750 5100 60  0000 C CNN
	1    8750 5100
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR012
U 1 1 572034AB
P 8750 6400
F 0 "#PWR012" H 8750 6400 30  0001 C CNN
F 1 "GND" H 8750 6330 30  0001 C CNN
F 2 "" H 8750 6400 60  0000 C CNN
F 3 "" H 8750 6400 60  0000 C CNN
	1    8750 6400
	1    0    0    -1  
$EndComp
Text Label 9300 5750 2    60   ~ 0
ADC0
Text Notes 8750 4850 0    60   ~ 0
Battery level\nsensing
Text Label 3200 1500 0    60   ~ 0
ADC0
Text Label 3200 1650 0    60   ~ 0
PA1/ADC1
Text Label 3200 1800 0    60   ~ 0
PA2/ADC2
Text Label 3200 1950 0    60   ~ 0
PA3/ADC3
Text Label 3200 2100 0    60   ~ 0
PA4/ADC4
Text Label 3200 2250 0    60   ~ 0
PA5/ADC5
Text Label 3200 2400 0    60   ~ 0
PA6/ADC6
Text Label 3200 2550 0    60   ~ 0
PA7/ADC7
Text Label 6700 1500 2    60   ~ 0
PB0/ADC8
Text Label 6700 1650 2    60   ~ 0
PB1/ADC9
Text Label 3200 2700 0    60   ~ 0
IRQ
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K1
U 1 1 57203BE7
P 1300 1250
F 0 "K1" V 1250 1250 50  0000 C CNN
F 1 "CONN_3" V 1350 1250 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 1250 60  0001 C CNN
F 3 "" H 1300 1250 60  0000 C CNN
	1    1300 1250
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K2
U 1 1 57203BF4
P 1300 1650
F 0 "K2" V 1250 1650 50  0000 C CNN
F 1 "CONN_3" V 1350 1650 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 1650 60  0001 C CNN
F 3 "" H 1300 1650 60  0000 C CNN
	1    1300 1650
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K3
U 1 1 57203C22
P 1300 2050
F 0 "K3" V 1250 2050 50  0000 C CNN
F 1 "CONN_3" V 1350 2050 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 2050 60  0001 C CNN
F 3 "" H 1300 2050 60  0000 C CNN
	1    1300 2050
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K4
U 1 1 57203C28
P 1300 2450
F 0 "K4" V 1250 2450 50  0000 C CNN
F 1 "CONN_3" V 1350 2450 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 2450 60  0001 C CNN
F 3 "" H 1300 2450 60  0000 C CNN
	1    1300 2450
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K5
U 1 1 57203C2E
P 1300 2850
F 0 "K5" V 1250 2850 50  0000 C CNN
F 1 "CONN_3" V 1350 2850 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 2850 60  0001 C CNN
F 3 "" H 1300 2850 60  0000 C CNN
	1    1300 2850
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K6
U 1 1 57203C34
P 1300 3250
F 0 "K6" V 1250 3250 50  0000 C CNN
F 1 "CONN_3" V 1350 3250 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 3250 60  0001 C CNN
F 3 "" H 1300 3250 60  0000 C CNN
	1    1300 3250
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K7
U 1 1 57203C3A
P 1300 3650
F 0 "K7" V 1250 3650 50  0000 C CNN
F 1 "CONN_3" V 1350 3650 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 3650 60  0001 C CNN
F 3 "" H 1300 3650 60  0000 C CNN
	1    1300 3650
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K8
U 1 1 57203C40
P 1300 4050
F 0 "K8" V 1250 4050 50  0000 C CNN
F 1 "CONN_3" V 1350 4050 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 4050 60  0001 C CNN
F 3 "" H 1300 4050 60  0000 C CNN
	1    1300 4050
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K9
U 1 1 57203C46
P 1300 4450
F 0 "K9" V 1250 4450 50  0000 C CNN
F 1 "CONN_3" V 1350 4450 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 4450 60  0001 C CNN
F 3 "" H 1300 4450 60  0000 C CNN
	1    1300 4450
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VCC #PWR013
U 1 1 57203C4E
P 1850 1000
F 0 "#PWR013" H 1850 1100 30  0001 C CNN
F 1 "VCC" H 1850 1100 30  0000 C CNN
F 2 "" H 1850 1000 60  0000 C CNN
F 3 "" H 1850 1000 60  0000 C CNN
	1    1850 1000
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K10
U 1 1 57203E9D
P 1300 4850
F 0 "K10" V 1250 4850 50  0000 C CNN
F 1 "CONN_3" V 1350 4850 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 4850 60  0001 C CNN
F 3 "" H 1300 4850 60  0000 C CNN
	1    1300 4850
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K11
U 1 1 57203EA3
P 1300 5250
F 0 "K11" V 1250 5250 50  0000 C CNN
F 1 "CONN_3" V 1350 5250 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 1300 5250 60  0001 C CNN
F 3 "" H 1300 5250 60  0000 C CNN
	1    1300 5250
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR014
U 1 1 57203F33
P 1950 5500
F 0 "#PWR014" H 1950 5500 30  0001 C CNN
F 1 "GND" H 1950 5430 30  0001 C CNN
F 2 "" H 1950 5500 60  0000 C CNN
F 3 "" H 1950 5500 60  0000 C CNN
	1    1950 5500
	1    0    0    -1  
$EndComp
Text Label 2450 1150 2    60   ~ 0
PA1/ADC1
Text Label 2450 1550 2    60   ~ 0
PA2/ADC2
Text Label 2450 1950 2    60   ~ 0
PA3/ADC3
Text Label 2450 2350 2    60   ~ 0
PA4/ADC4
Text Label 2450 2750 2    60   ~ 0
PA5/ADC5
Text Label 2450 3150 2    60   ~ 0
PA6/ADC6
Text Label 2450 3550 2    60   ~ 0
PA7/ADC7
Text Label 2450 3950 2    60   ~ 0
PB0/ADC8
Text Label 2450 4350 2    60   ~ 0
PB1/ADC9
Text Label 2450 4750 2    60   ~ 0
PB11
Text Label 2450 5150 2    60   ~ 0
PB10
Text Label 6700 2850 2    60   ~ 0
PB10
Text Label 6700 3000 2    60   ~ 0
PB11
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR015
U 1 1 57204AD8
P 10050 6100
F 0 "#PWR015" H 10050 6100 30  0001 C CNN
F 1 "GND" H 10050 6030 30  0001 C CNN
F 2 "" H 10050 6100 60  0000 C CNN
F 3 "" H 10050 6100 60  0000 C CNN
	1    10050 6100
	1    0    0    -1  
$EndComp
Text Label 9700 5600 0    60   ~ 0
RX
Text Label 9700 5700 0    60   ~ 0
TX
Text Notes 9800 4850 0    60   ~ 0
Diagnostics UART
Text Label 3200 2850 0    60   ~ 0
TX
Text Label 3200 3000 0    60   ~ 0
RX
Text Notes 7150 4850 0    60   ~ 0
Front panel LED
$Comp
L stm32f1-nrf24l01-transmitter-rescue:SPEAKER SP1
U 1 1 5720518F
P 10650 3450
F 0 "SP1" H 10550 3700 70  0000 C CNN
F 1 "SPEAKER" H 10550 3200 70  0001 C CNN
F 2 "Buzzers_Beepers:Buzzer_12x9.5RM7.6" H 10650 3450 60  0001 C CNN
F 3 "~" H 10650 3450 60  0000 C CNN
	1    10650 3450
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR016
U 1 1 572051AD
P 9800 4250
F 0 "#PWR016" H 9800 4250 30  0001 C CNN
F 1 "GND" H 9800 4180 30  0001 C CNN
F 2 "" H 9800 4250 60  0000 C CNN
F 3 "" H 9800 4250 60  0000 C CNN
	1    9800 4250
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:R-RESCUE-stm32f1-nrf24l01-transmitter R4
U 1 1 572052B4
P 9250 3650
F 0 "R4" V 9330 3650 40  0000 C CNN
F 1 "1k" V 9257 3651 40  0000 C CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 9180 3650 30  0001 C CNN
F 3 "~" H 9250 3650 30  0000 C CNN
	1    9250 3650
	1    0    0    -1  
$EndComp
Text Label 8750 3150 0    60   ~ 0
BUZZER
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VDD #PWR017
U 1 1 572053AF
P 9800 3100
F 0 "#PWR017" H 9800 3200 30  0001 C CNN
F 1 "VDD" H 9800 3210 30  0000 C CNN
F 2 "" H 9800 3100 60  0000 C CNN
F 3 "" H 9800 3100 60  0000 C CNN
	1    9800 3100
	1    0    0    -1  
$EndComp
Text Label 3200 3450 0    60   ~ 0
BUZZER
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_2 P1
U 1 1 57205598
P 1300 5900
F 0 "P1" V 1250 5900 40  0000 C CNN
F 1 "Charge" V 1350 5900 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 1300 5900 60  0001 C CNN
F 3 "" H 1300 5900 60  0000 C CNN
	1    1300 5900
	-1   0    0    1   
$EndComp
Text Notes 9500 2850 0    60   ~ 0
Alarm buzzer
$Comp
L stm32f1-nrf24l01-transmitter-rescue:SPST SW1
U 1 1 572058EC
P 4950 5850
F 0 "SW1" H 4950 5950 70  0000 C CNN
F 1 "ON/OFF" H 4950 5750 70  0000 C CNN
F 2 "Buttons_Switches_SMD:SW_SPST_FSMSM" H 4950 5850 60  0001 C CNN
F 3 "~" H 4950 5850 60  0000 C CNN
	1    4950 5850
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:PWR_FLAG #FLG018
U 1 1 572059A3
P 6750 6450
F 0 "#FLG018" H 6750 6545 30  0001 C CNN
F 1 "PWR_FLAG" H 6750 6630 30  0000 C CNN
F 2 "" H 6750 6450 60  0000 C CNN
F 3 "" H 6750 6450 60  0000 C CNN
	1    6750 6450
	1    0    0    -1  
$EndComp
NoConn ~ 3700 3150
NoConn ~ 3700 3300
$Comp
L stm32f1-nrf24l01-transmitter-rescue:PWR_FLAG #FLG019
U 1 1 572067E0
P 3000 5750
F 0 "#FLG019" H 3000 5845 30  0001 C CNN
F 1 "PWR_FLAG" H 3000 5930 30  0000 C CNN
F 2 "" H 3000 5750 60  0000 C CNN
F 3 "" H 3000 5750 60  0000 C CNN
	1    3000 5750
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:PWR_FLAG #FLG020
U 1 1 572067EF
P 1300 6300
F 0 "#FLG020" H 1300 6395 30  0001 C CNN
F 1 "PWR_FLAG" H 1300 6480 30  0000 C CNN
F 2 "" H 1300 6300 60  0000 C CNN
F 3 "" H 1300 6300 60  0000 C CNN
	1    1300 6300
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:PWR_FLAG #FLG021
U 1 1 57206A98
P 1550 6300
F 0 "#FLG021" H 1550 6395 30  0001 C CNN
F 1 "PWR_FLAG" H 1550 6480 30  0000 C CNN
F 2 "" H 1550 6300 60  0000 C CNN
F 3 "" H 1550 6300 60  0000 C CNN
	1    1550 6300
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR022
U 1 1 57206B26
P 9650 2500
F 0 "#PWR022" H 9650 2500 30  0001 C CNN
F 1 "GND" H 9650 2430 30  0001 C CNN
F 2 "" H 9650 2500 60  0000 C CNN
F 3 "" H 9650 2500 60  0000 C CNN
	1    9650 2500
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_2 P4
U 1 1 572059D9
P 5950 6850
F 0 "P4" V 5900 6850 40  0000 C CNN
F 1 "PWR-IN" V 6000 6850 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 5950 6850 60  0001 C CNN
F 3 "" H 5950 6850 60  0000 C CNN
	1    5950 6850
	-1   0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_2 P3
U 1 1 572059F5
P 5650 6850
F 0 "P3" V 5600 6850 40  0000 C CNN
F 1 "PWR-BAT" V 5700 6850 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 5650 6850 60  0001 C CNN
F 3 "" H 5650 6850 60  0000 C CNN
	1    5650 6850
	1    0    0    1   
$EndComp
Text Notes 3200 3550 0    60   ~ 0
TIM2_CH1
$Comp
L stm32f1-nrf24l01-transmitter-rescue:STM32F103C8T6_DEV_BOARD U2
U 1 1 57202BC2
P 5000 2700
F 0 "U2" H 4000 4200 60  0000 L CNN
F 1 "STM32F103C8T6_DEV_BOARD" H 5950 1000 60  0000 C CNN
F 2 "WLA:STM32F103C8T6" H 5150 3100 60  0001 C CNN
F 3 "~" H 5150 3100 60  0000 C CNN
	1    5000 2700
	1    0    0    -1  
$EndComp
Text Label 8500 1400 0    60   ~ 0
CE
$Comp
L stm32f1-nrf24l01-transmitter-rescue:C-RESCUE-stm32f1-nrf24l01-transmitter C2
U 1 1 5747F7DC
P 9050 6050
F 0 "C2" H 9050 6150 40  0000 L CNN
F 1 "100nF" H 9056 5965 40  0000 L CNN
F 2 "Capacitors_SMD:C_0805_HandSoldering" H 9088 5900 30  0001 C CNN
F 3 "~" H 9050 6050 60  0000 C CNN
	1    9050 6050
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR023
U 1 1 5747F906
P 9050 6400
F 0 "#PWR023" H 9050 6400 30  0001 C CNN
F 1 "GND" H 9050 6330 30  0001 C CNN
F 2 "" H 9050 6400 60  0000 C CNN
F 3 "" H 9050 6400 60  0000 C CNN
	1    9050 6400
	1    0    0    -1  
$EndComp
Text Label 6700 1800 2    60   ~ 0
PB3
Text Label 6700 1950 2    60   ~ 0
PB4
Text Label 6700 2100 2    60   ~ 0
PB5
Text Label 6700 2250 2    60   ~ 0
PB6
Text Label 6700 2400 2    60   ~ 0
PB7
Text Label 6700 2550 2    60   ~ 0
PB8
Text Label 6700 2700 2    60   ~ 0
PB9
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_2 P5
U 1 1 589BC0A8
P 10150 3450
F 0 "P5" V 10100 3450 40  0000 C CNN
F 1 "Buzzer" V 10200 3450 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 10150 3450 60  0001 C CNN
F 3 "" H 10150 3450 60  0000 C CNN
	1    10150 3450
	1    0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_3 K12
U 1 1 589BCD46
P 10500 5600
F 0 "K12" V 10450 5600 50  0000 C CNN
F 1 "UART" V 10550 5600 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x03_Pitch2.54mm" H 10500 5600 60  0001 C CNN
F 3 "" H 10500 5600 60  0000 C CNN
	1    10500 5600
	1    0    0    -1  
$EndComp
Wire Wire Line
	4300 6350 4450 6350
Wire Wire Line
	4800 4600 4800 4750
Wire Wire Line
	5000 4600 5000 4750
Wire Wire Line
	5200 4600 5200 4750
Wire Wire Line
	4550 850  4550 950 
Wire Wire Line
	10350 1350 10350 1450
Wire Wire Line
	9650 750  9650 850 
Wire Wire Line
	10350 850  10350 950 
Connection ~ 9650 850 
Wire Wire Line
	6250 3150 6700 3150
Wire Wire Line
	6250 3300 6700 3300
Wire Wire Line
	6250 3450 6700 3450
Wire Wire Line
	6250 3600 6700 3600
Wire Wire Line
	8350 1400 9000 1400
Wire Wire Line
	9000 1900 8500 1900
Wire Wire Line
	9000 1800 8500 1800
Wire Wire Line
	9000 1700 8500 1700
Wire Wire Line
	9000 1600 8500 1600
Wire Wire Line
	9000 1500 8500 1500
Wire Wire Line
	7550 5100 7550 5250
Wire Wire Line
	7550 5450 7550 5600
Wire Wire Line
	7550 6100 7950 6100
Wire Wire Line
	3700 3750 3200 3750
Wire Wire Line
	8750 5100 8750 5200
Wire Wire Line
	8750 5700 8750 5750
Wire Wire Line
	8750 6300 8750 6400
Wire Wire Line
	8750 5750 9050 5750
Connection ~ 8750 5750
Wire Wire Line
	3700 1500 3200 1500
Wire Wire Line
	3200 1650 3700 1650
Wire Wire Line
	3700 1800 3200 1800
Wire Wire Line
	3200 1950 3700 1950
Wire Wire Line
	3200 2100 3700 2100
Wire Wire Line
	3200 2250 3700 2250
Wire Wire Line
	3200 2400 3700 2400
Wire Wire Line
	3200 2550 3700 2550
Wire Wire Line
	6700 1500 6250 1500
Wire Wire Line
	6700 1650 6250 1650
Wire Wire Line
	3200 2700 3700 2700
Wire Wire Line
	1950 5350 1650 5350
Wire Wire Line
	1950 1350 1950 1750
Wire Wire Line
	1650 4950 1950 4950
Connection ~ 1950 5350
Wire Wire Line
	1650 4550 1950 4550
Connection ~ 1950 4950
Wire Wire Line
	1650 4150 1950 4150
Connection ~ 1950 4550
Wire Wire Line
	1650 3350 1950 3350
Connection ~ 1950 4150
Wire Wire Line
	1650 3750 1950 3750
Connection ~ 1950 3750
Wire Wire Line
	1650 1750 1950 1750
Connection ~ 1950 3350
Wire Wire Line
	1650 2950 1950 2950
Connection ~ 1950 2950
Wire Wire Line
	1650 2550 1950 2550
Connection ~ 1950 2550
Wire Wire Line
	1650 2150 1950 2150
Connection ~ 1950 2150
Wire Wire Line
	1650 1350 1950 1350
Connection ~ 1950 1750
Wire Wire Line
	6700 3000 6250 3000
Wire Wire Line
	6700 2850 6250 2850
Wire Wire Line
	10150 5700 9700 5700
Wire Wire Line
	9700 5600 10150 5600
Wire Wire Line
	3200 2850 3700 2850
Wire Wire Line
	3200 3000 3700 3000
Wire Wire Line
	9800 4100 9800 4250
Wire Wire Line
	9800 3550 9800 3650
Wire Wire Line
	9250 3900 9500 3900
Wire Wire Line
	9250 3400 9250 3150
Wire Wire Line
	9250 3150 8750 3150
Wire Wire Line
	9800 3100 9800 3250
Wire Wire Line
	3200 3450 3700 3450
Wire Wire Line
	1650 5800 3000 5800
Wire Wire Line
	3000 5750 3000 5800
Wire Wire Line
	1300 6950 1550 6950
Wire Wire Line
	1300 6350 1700 6350
Connection ~ 3000 5800
Wire Wire Line
	1300 6300 1300 6350
Wire Wire Line
	1550 6300 1550 6950
Connection ~ 1550 6950
Wire Wire Line
	9650 2350 9650 2500
Wire Wire Line
	2450 1150 1650 1150
Wire Wire Line
	2450 1550 1650 1550
Wire Wire Line
	2450 1950 1650 1950
Wire Wire Line
	2450 2350 1650 2350
Wire Wire Line
	2450 2750 1650 2750
Wire Wire Line
	2450 3150 1650 3150
Wire Wire Line
	2450 3550 1650 3550
Wire Wire Line
	2450 3950 1650 3950
Wire Wire Line
	2450 4350 1650 4350
Wire Wire Line
	2450 4750 1650 4750
Wire Wire Line
	2450 5150 1650 5150
Wire Wire Line
	1850 5250 1650 5250
Wire Wire Line
	1850 1000 1850 1250
Wire Wire Line
	1650 4850 1850 4850
Connection ~ 1850 4850
Wire Wire Line
	1650 4450 1850 4450
Connection ~ 1850 4450
Wire Wire Line
	1650 3650 1850 3650
Connection ~ 1850 3650
Wire Wire Line
	1650 3250 1850 3250
Connection ~ 1850 3250
Wire Wire Line
	1650 4050 1850 4050
Connection ~ 1850 4050
Wire Wire Line
	1650 2850 1850 2850
Connection ~ 1850 2850
Wire Wire Line
	1650 2450 1850 2450
Connection ~ 1850 2450
Wire Wire Line
	1650 2050 1850 2050
Connection ~ 1850 2050
Wire Wire Line
	1650 1650 1850 1650
Connection ~ 1850 1650
Wire Wire Line
	1650 1250 1850 1250
Connection ~ 1850 1250
Wire Wire Line
	6300 6750 6450 6750
Wire Wire Line
	6450 6400 6450 6600
Wire Wire Line
	6300 6950 6450 6950
Wire Wire Line
	6450 6950 6450 7100
Wire Wire Line
	6750 6750 6750 6450
Connection ~ 6450 6750
Wire Wire Line
	4300 6950 5300 6950
Wire Wire Line
	4450 6350 4450 5850
Wire Wire Line
	5450 5850 5450 6350
Wire Wire Line
	5450 6350 5300 6350
Wire Wire Line
	5300 6350 5300 6600
Wire Wire Line
	5550 850  5550 950 
Wire Wire Line
	8350 850  9650 850 
Wire Wire Line
	8350 850  8350 1400
Wire Wire Line
	9050 5850 9050 5750
Connection ~ 9050 5750
Wire Wire Line
	9050 6250 9050 6400
Wire Wire Line
	6700 1800 6250 1800
Wire Wire Line
	6700 1950 6250 1950
Wire Wire Line
	6700 2100 6250 2100
Wire Wire Line
	6700 2250 6250 2250
Wire Wire Line
	6700 2400 6250 2400
Wire Wire Line
	6700 2550 6250 2550
Wire Wire Line
	6250 2700 7350 2700
Wire Wire Line
	5300 6600 6450 6600
Connection ~ 6450 6600
Connection ~ 5300 6600
Wire Wire Line
	5300 6950 5300 7100
Wire Wire Line
	5300 7100 6450 7100
Connection ~ 6450 7100
Wire Wire Line
	9550 3250 9800 3250
Wire Wire Line
	10350 3250 10350 3350
Connection ~ 9800 3250
Wire Wire Line
	9800 3650 10350 3650
Wire Wire Line
	10350 3650 10350 3550
Connection ~ 9800 3650
Wire Wire Line
	10150 5500 10050 5500
Wire Wire Line
	10050 5500 10050 6100
NoConn ~ 6700 1800
NoConn ~ 6700 1950
NoConn ~ 6700 2100
NoConn ~ 6700 2250
NoConn ~ 6700 2400
NoConn ~ 6700 2550
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VCC #PWR024
U 1 1 589BC63C
P 5000 850
F 0 "#PWR024" H 5000 950 30  0001 C CNN
F 1 "VCC" H 5000 950 30  0000 C CNN
F 2 "" H 5000 850 60  0000 C CNN
F 3 "" H 5000 850 60  0000 C CNN
	1    5000 850 
	1    0    0    -1  
$EndComp
Wire Wire Line
	5000 850  5000 950 
$Comp
L stm32f1-nrf24l01-transmitter-rescue:Q_NPN_CBE Q1
U 1 1 589EC521
P 9700 3900
F 0 "Q1" H 9900 3950 50  0000 L CNN
F 1 "BC547B" H 9900 3850 50  0000 L CNN
F 2 "TO_SOT_Packages_THT:TO-92_Inline_Wide" H 9900 4000 50  0001 C CNN
F 3 "" H 9700 3900 50  0000 C CNN
	1    9700 3900
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:C C3
U 1 1 589ECC74
P 9550 3400
F 0 "C3" H 9575 3500 50  0000 L CNN
F 1 "1u" H 9575 3300 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805_HandSoldering" H 9588 3250 50  0001 C CNN
F 3 "" H 9550 3400 50  0000 C CNN
	1    9550 3400
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR025
U 1 1 589ECD1A
P 9550 3650
F 0 "#PWR025" H 9550 3650 30  0001 C CNN
F 1 "GND" H 9550 3580 30  0001 C CNN
F 2 "" H 9550 3650 60  0000 C CNN
F 3 "" H 9550 3650 60  0000 C CNN
	1    9550 3650
	1    0    0    -1  
$EndComp
Wire Wire Line
	9550 3550 9550 3650
$Comp
L stm32f1-nrf24l01-transmitter-rescue:CONN_2 P6
U 1 1 58CFE9D2
P 7700 3950
F 0 "P6" V 7650 3950 40  0000 C CNN
F 1 "Meter" V 7750 3950 40  0000 C CNN
F 2 "Pin_Headers:Pin_Header_Straight_1x02_Pitch2.54mm" H 7700 3950 60  0001 C CNN
F 3 "" H 7700 3950 60  0000 C CNN
	1    7700 3950
	1    0    0    1   
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:R-RESCUE-stm32f1-nrf24l01-transmitter R5
U 1 1 58D0049F
P 7350 3400
F 0 "R5" V 7430 3400 40  0000 C CNN
F 1 "3k9" V 7357 3401 40  0000 C CNN
F 2 "Resistors_SMD:R_0805_HandSoldering" V 7280 3400 30  0001 C CNN
F 3 "~" H 7350 3400 30  0000 C CNN
	1    7350 3400
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:C C4
U 1 1 58D005D2
P 7000 4000
F 0 "C4" H 7025 4100 50  0000 L CNN
F 1 "1u" H 7025 3900 50  0000 L CNN
F 2 "Capacitors_SMD:C_0805_HandSoldering" H 7038 3850 50  0001 C CNN
F 3 "" H 7000 4000 50  0000 C CNN
	1    7000 4000
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR026
U 1 1 58D00698
P 7350 4350
F 0 "#PWR026" H 7350 4350 30  0001 C CNN
F 1 "GND" H 7350 4280 30  0001 C CNN
F 2 "" H 7350 4350 60  0000 C CNN
F 3 "" H 7350 4350 60  0000 C CNN
	1    7350 4350
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR027
U 1 1 58D00709
P 7000 4350
F 0 "#PWR027" H 7000 4350 30  0001 C CNN
F 1 "GND" H 7000 4280 30  0001 C CNN
F 2 "" H 7000 4350 60  0000 C CNN
F 3 "" H 7000 4350 60  0000 C CNN
	1    7000 4350
	1    0    0    -1  
$EndComp
Wire Wire Line
	7000 3850 7350 3850
Wire Wire Line
	7350 3850 7350 3650
Wire Wire Line
	7350 2700 7350 3150
Wire Wire Line
	7350 4050 7350 4350
Wire Wire Line
	7000 4150 7000 4350
Text Notes 8000 4400 1    60   ~ 0
Analog meter (PWM)
Wire Wire Line
	1750 6150 1750 6000
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR028
U 1 1 58D05116
P 3000 7550
F 0 "#PWR028" H 3000 7550 30  0001 C CNN
F 1 "GND" H 3000 7480 30  0001 C CNN
F 2 "" H 3000 7550 60  0000 C CNN
F 3 "" H 3000 7550 60  0000 C CNN
	1    3000 7550
	1    0    0    -1  
$EndComp
Wire Wire Line
	1750 6000 1650 6000
Wire Wire Line
	3000 7450 3000 7550
$Comp
L stm32f1-nrf24l01-transmitter-rescue:GND-RESCUE-stm32f1-nrf24l01-transmitter #PWR029
U 1 1 58D0663D
P 1750 6150
F 0 "#PWR029" H 1750 6150 30  0001 C CNN
F 1 "GND" H 1750 6080 30  0001 C CNN
F 2 "" H 1750 6150 60  0000 C CNN
F 3 "" H 1750 6150 60  0000 C CNN
	1    1750 6150
	1    0    0    -1  
$EndComp
$Comp
L stm32f1-nrf24l01-transmitter-rescue:VCC #PWR030
U 1 1 58D2422E
P 5350 850
F 0 "#PWR030" H 5350 950 30  0001 C CNN
F 1 "VCC" H 5350 950 30  0000 C CNN
F 2 "" H 5350 850 60  0000 C CNN
F 3 "" H 5350 850 60  0000 C CNN
	1    5350 850 
	1    0    0    -1  
$EndComp
Wire Wire Line
	5350 850  5350 950 
Connection ~ 7350 3850
Text Notes 7500 3400 0    39   ~ 0
Resistor value depends on meter. \n3k9 is for the Airtronics meter, \nwhich is full scale 400mV / 670 Ohm.\n3k9 gives 483mV at 3.3V.
Text Notes 6900 2700 0    60   ~ 0
TIM4_CH4
Wire Wire Line
	9650 850  9650 950 
Wire Wire Line
	9650 850  10350 850 
Wire Wire Line
	8750 5750 8750 5800
Wire Wire Line
	1950 5350 1950 5500
Wire Wire Line
	1950 4950 1950 5350
Wire Wire Line
	1950 4550 1950 4950
Wire Wire Line
	1950 4150 1950 4550
Wire Wire Line
	1950 3750 1950 4150
Wire Wire Line
	1950 3350 1950 3750
Wire Wire Line
	1950 2950 1950 3350
Wire Wire Line
	1950 2550 1950 2950
Wire Wire Line
	1950 2150 1950 2550
Wire Wire Line
	1950 1750 1950 2150
Wire Wire Line
	3000 5800 3000 5850
Wire Wire Line
	1550 6950 1700 6950
Wire Wire Line
	1850 4850 1850 5250
Wire Wire Line
	1850 4450 1850 4850
Wire Wire Line
	1850 3650 1850 4050
Wire Wire Line
	1850 3250 1850 3650
Wire Wire Line
	1850 4050 1850 4450
Wire Wire Line
	1850 2850 1850 3250
Wire Wire Line
	1850 2450 1850 2850
Wire Wire Line
	1850 2050 1850 2450
Wire Wire Line
	1850 1650 1850 2050
Wire Wire Line
	1850 1250 1850 1650
Wire Wire Line
	6450 6750 6750 6750
Wire Wire Line
	9050 5750 9300 5750
Wire Wire Line
	6450 6600 6450 6750
Wire Wire Line
	5300 6600 5300 6750
Wire Wire Line
	6450 7100 6450 7300
Wire Wire Line
	9800 3250 9800 3350
Wire Wire Line
	9800 3250 10350 3250
Wire Wire Line
	9800 3650 9800 3700
$EndSCHEMATC
