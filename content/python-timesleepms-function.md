+++
title = "Python time.sleep_ms Function"
date = 2025-08-29T20:11:01.294+01:00
draft = false
description = "Complete guide to Python's time.sleep_ms function covering millisecond delays, timing operations, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.sleep_ms Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.sleep_ms function,
which suspends execution for a given number of milliseconds. We'll cover basic
usage, timing operations, and practical examples with microcontrollers.

## Basic Definitions

The time.sleep_ms function pauses program execution for the
specified number of milliseconds. It's commonly available in MicroPython
and other embedded Python implementations.

Key characteristics: millisecond precision, non-blocking alternatives available,
and useful for timing control in hardware projects. Unlike time.sleep,
it takes integer milliseconds rather than float seconds.

## Basic Delay Example

The simplest use of time.sleep_ms creates a delay in milliseconds.
This example shows basic usage with different delay durations.

basic_delay.py
  

import time

print("Starting...")
time.sleep_ms(500)  # Delay for 500 milliseconds
print("Half second passed")
time.sleep_ms(1000) # Delay for 1 second
print("One second passed")
time.sleep_ms(2000) # Delay for 2 seconds
print("Two seconds passed")

This example demonstrates simple delays between print statements. The function
takes an integer argument representing milliseconds to pause execution.

Note that sleep_ms is more precise than converting seconds to
milliseconds with sleep in embedded environments.

## Blinking LED Example

time.sleep_ms is commonly used in hardware projects to control
timing. This example shows an LED blinking pattern.

blink_led.py
  

from machine import Pin
import time

led = Pin(2, Pin.OUT)  # Configure GPIO2 as output

while True:
    led.value(1)       # Turn LED on
    time.sleep_ms(500) # Wait 500ms
    led.value(0)       # Turn LED off
    time.sleep_ms(500) # Wait 500ms

This creates a visible blinking pattern with 500ms intervals. The timing
controls the blink rate precisely in milliseconds.

For MicroPython boards with built-in LEDs, this provides immediate visual
feedback without additional hardware.

## Button Debouncing

time.sleep_ms helps debounce mechanical buttons by adding a
delay after detection. This example shows simple debounce logic.

debounce.py
  

from machine import Pin
import time

button = Pin(0, Pin.IN, Pin.PULL_UP)  # Configure GPIO0 as input

while True:
    if button.value() == 0:  # Button pressed
        time.sleep_ms(50)    # Debounce delay
        if button.value() == 0:  # Still pressed
            print("Button pressed!")
            while button.value() == 0:  # Wait for release
                time.sleep_ms(10)

The initial delay filters out mechanical bounce. The second check confirms
a real press after the bounce period.

Typical debounce times range from 10-50ms depending on the switch
characteristics.

## Non-blocking Delays

This example demonstrates non-blocking delays using time.sleep_ms
with timestamps, allowing other code to run during waits.

non_blocking.py
  

import time

last_print = 0
print_interval = 1000  # 1 second

while True:
    current_time = time.ticks_ms()
    
    if time.ticks_diff(current_time, last_print) &gt;= print_interval:
        print("Regular message every second")
        last_print = current_time
    
    # Other tasks can run here
    # while waiting for the interval

Instead of blocking with sleep_ms, this checks elapsed time
using ticks_ms and ticks_diff.

This pattern is essential for responsive applications that need to perform
multiple tasks simultaneously.

## Pulse Width Modulation (PWM)

time.sleep_ms can create simple PWM signals for controlling
LED brightness or motor speed. This example shows manual PWM.

pwm.py
  

from machine import Pin
import time

led = Pin(2, Pin.OUT)
duty_cycle = 30  # 30% brightness

while True:
    # On time
    led.value(1)
    time.sleep_ms(duty_cycle)
    
    # Off time
    led.value(0)
    time.sleep_ms(100 - duty_cycle)

The duty cycle controls brightness by varying the on/off ratio. This creates
a 100Hz PWM signal with adjustable duty.

For better performance, use hardware PWM when available rather than
software timing.

## Timing Sensor Readings

time.sleep_ms helps space out sensor readings to prevent
overloading. This example shows timed DHT22 sensor reads.

sensor_timing.py
  

import dht
from machine import Pin
import time

sensor = dht.DHT22(Pin(4))
read_interval = 2000  # 2 seconds between reads

while True:
    try:
        sensor.measure()
        temp = sensor.temperature()
        hum = sensor.humidity()
        print(f"Temp: {temp}°C, Humidity: {hum}%")
    except Exception as e:
        print("Sensor read error:", e)
    
    time.sleep_ms(read_interval)

The delay ensures proper timing between sensor reads. Many sensors require
minimum intervals between measurements.

Error handling is important as sensors may fail during reads, especially
in noisy environments.

## Best Practices

- **Precision:** sleep_ms is more precise than sleep for millisecond delays

- **Blocking:** Consider non-blocking approaches for complex applications

- **Power saving:** Use deepsleep instead for battery-powered devices

- **Sensor timing:** Respect minimum delay requirements for sensors

- **Alternatives:** Use hardware timers for critical timing needs

## Source References

- [MicroPython time.sleep_ms Documentation](https://docs.micropython.org/en/latest/library/time.html#time.sleep_ms)

- [Python time.sleep Documentation](https://docs.python.org/3/library/time.html#time.sleep)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).