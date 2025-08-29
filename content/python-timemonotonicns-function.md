+++
title = "Python time.monotonic_ns Function"
date = 2025-08-29T20:10:59.064+01:00
draft = false
description = "Complete guide to Python's time.monotonic_ns function covering nanosecond timing, performance measurement, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.monotonic_ns Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.monotonic_ns function,
which returns a nanosecond-resolution monotonic clock value. We'll cover precise
timing, performance measurement, and practical examples.

## Basic Definitions

The time.monotonic_ns function returns a clock value in nanoseconds.
It is monotonic (never decreases) and unaffected by system clock adjustments.

Key characteristics: nanosecond resolution, ideal for precise timing intervals,
and guaranteed to never go backward. The reference point is undefined but
consistent during program execution.

## Basic Usage of monotonic_ns

This example demonstrates the basic usage of time.monotonic_ns to
measure time intervals with nanosecond precision.

basic_monotonic.py
  

import time

# Get current monotonic time in nanoseconds
start = time.monotonic_ns()

# Simulate some work
time.sleep(0.5)  # Sleep for 500 milliseconds

# Get end time
end = time.monotonic_ns()

# Calculate duration in nanoseconds
duration_ns = end - start
duration_ms = duration_ns / 1_000_000  # Convert to milliseconds

print(f"Operation took {duration_ns} nanoseconds")
print(f"Which is {duration_ms:.2f} milliseconds")

This example shows how to measure time intervals with nanosecond precision.
The sleep duration is accurately measured despite system clock changes.

Note that while the resolution is in nanoseconds, the actual precision depends
on the underlying system capabilities.

## Comparing monotonic_ns with monotonic

This example compares time.monotonic_ns with time.monotonic
to show the difference in precision and representation.

comparison.py
  

import time

def test_function():
    sum(range(1_000_000))

# Using time.monotonic()
start = time.monotonic()
test_function()
end = time.monotonic()
print(f"time.monotonic(): {(end - start) * 1e9:.0f} ns")

# Using time.monotonic_ns()
start = time.monotonic_ns()
test_function()
end = time.monotonic_ns()
print(f"time.monotonic_ns(): {end - start} ns")

Both functions use the same underlying clock, but monotonic_ns
provides direct access to nanosecond values without floating-point conversion.

The monotonic_ns version avoids potential floating-point precision
issues for very precise measurements.

## Microbenchmarking with monotonic_ns

This example demonstrates using time.monotonic_ns for microbenchmarking
small code segments with high precision.

microbenchmark.py
  

import time

def benchmark(func, iterations=1_000_000):
    start = time.monotonic_ns()
    for _ in range(iterations):
        func()
    end = time.monotonic_ns()
    ns_per_op = (end - start) / iterations
    print(f"{func.__name__}: {ns_per_op:.2f} ns/operation")

def empty_function():
    pass

def simple_math():
    42 * 42

benchmark(empty_function)
benchmark(simple_math)

This pattern is useful for measuring the performance of very small operations.
The nanosecond resolution allows accurate timing of individual operations.

Note that microbenchmarks can be affected by various system factors and should
be interpreted carefully.

## Precise Rate Limiting

This example implements a high-precision rate limiter using time.monotonic_ns
to control operation frequency with nanosecond accuracy.

rate_limiter.py
  

import time

class NanoRateLimiter:
    def __init__(self, operations_per_second):
        self.interval_ns = 1_000_000_000 // operations_per_second
        self.last_run = 0
    
    def __call__(self, func):
        def wrapper(*args, **kwargs):
            now = time.monotonic_ns()
            elapsed = now - self.last_run
            if elapsed &lt; self.interval_ns:
                delay_ns = self.interval_ns - elapsed
                time.sleep(delay_ns / 1e9)  # Convert to seconds
            self.last_run = time.monotonic_ns()
            return func(*args, **kwargs)
        return wrapper

@NanoRateLimiter(1000)  # 1000 operations per second
def high_freq_operation():
    print("Operation at", time.monotonic_ns() % 1_000_000)

for _ in range(5):
    high_freq_operation()

The rate limiter ensures operations don't exceed the specified rate by
precisely measuring intervals in nanoseconds.

This is particularly useful for hardware control or high-frequency APIs
where precise timing is critical.

## Measuring Small Code Blocks

This example shows how to measure very small code blocks using time.monotonic_ns
with a context manager for convenience.

timing_context.py
  

import time
from contextlib import contextmanager

@contextmanager
def time_ns():
    start = time.monotonic_ns()
    yield
    end = time.monotonic_ns()
    print(f"Duration: {end - start} ns")

# Measure list comprehension
with time_ns():
    squares = [x*x for x in range(1000)]

# Measure dictionary creation
with time_ns():
    d = {x: x*x for x in range(1000)}

The context manager automatically measures and prints the execution time
of the code block within the with statement.

This pattern makes it easy to add precise timing to existing code without
cluttering the logic with timing code.

## Long-running Process Monitoring

This example demonstrates using time.monotonic_ns to monitor
a long-running process with periodic progress updates.

progress_monitor.py
  

import time

def long_running_task():
    total_items = 1_000_000
    start_time = time.monotonic_ns()
    last_report = start_time
    
    for i in range(total_items):
        # Simulate work
        time.sleep(0.001)
        
        # Report progress every second
        current_time = time.monotonic_ns()
        if current_time - last_report &gt;= 1_000_000_000:
            elapsed_s = (current_time - start_time) / 1_000_000_000
            progress = (i + 1) / total_items * 100
            print(f"{elapsed_s:.1f}s: {progress:.1f}% complete")
            last_report = current_time
    
    total_time = (time.monotonic_ns() - start_time) / 1_000_000_000
    print(f"Task completed in {total_time:.2f} seconds")

long_running_task()

The example uses nanosecond timing to precisely control progress reporting
intervals while avoiding drift from floating-point accumulation errors.

This approach ensures accurate timing even for very long-running processes
where small timing errors could accumulate significantly.

## Best Practices

- **Precision needs:** Use monotonic_ns when nanosecond resolution is required

- **Long durations:** Be mindful of integer overflow with very long measurements

- **System limitations:** Actual precision depends on OS and hardware

- **Clock source:** Uses the best available monotonic clock on the system

- **Conversion:** Divide by 1e9 for seconds when needed

## Source References

- [Python time.monotonic_ns Documentation](https://docs.python.org/3/library/time.html#time.monotonic_ns)

- [PEP 564 - Add new time functions with nanosecond resolution](https://peps.python.org/pep-0564/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).