+++
title = "Python time.perf_counter_ns Function"
date = 2025-08-29T20:10:59.068+01:00
draft = false
description = "Complete guide to Python's time.perf_counter_ns function covering high-resolution timing, benchmarking, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.perf_counter_ns Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.perf_counter_ns function,
which returns a high-resolution performance counter in nanoseconds. We'll cover
high-precision timing, benchmarking, and practical examples.

## Basic Definitions

The time.perf_counter_ns function returns an integer representing
a performance counter in nanoseconds. It provides the highest available resolution
timer for short duration measurements.

Key characteristics: nanosecond resolution, monotonic (always increases),
not affected by system clock changes, and ideal for benchmarking and profiling.
The counter's reference point is undefined (only differences matter).

## Basic Performance Measurement

The simplest use of time.perf_counter_ns measures code execution
time with nanosecond precision. This example shows basic usage.

basic_timing.py
  

import time

def calculate_sum(n):
    return sum(range(n))

# Start timer
start = time.perf_counter_ns()

# Execute function
result = calculate_sum(1000000)

# End timer
end = time.perf_counter_ns()

# Calculate duration in nanoseconds
duration = end - start
print(f"Calculation took {duration} ns")
print(f"Result: {result}")

This example demonstrates how to measure the execution time of a function
with nanosecond precision. The duration is calculated by subtracting start
from end timestamps.

Note that the absolute values of perf_counter_ns are meaningless - only
the differences between measurements are useful.

## Comparing perf_counter_ns with perf_counter

This example compares perf_counter_ns with its floating-point
counterpart perf_counter to show precision differences.

comparison.py
  

import time

def empty_loop(n):
    for _ in range(n):
        pass

iterations = 1000000

# Using perf_counter (float seconds)
start = time.perf_counter()
empty_loop(iterations)
end = time.perf_counter()
float_duration = end - start

# Using perf_counter_ns (integer nanoseconds)
start_ns = time.perf_counter_ns()
empty_loop(iterations)
end_ns = time.perf_counter_ns()
ns_duration = end_ns - start_ns

print(f"perf_counter: {float_duration:.9f} sec")
print(f"perf_counter_ns: {ns_duration} ns")
print(f"Converted ns: {ns_duration / 1e9:.9f} sec")

perf_counter_ns provides integer nanoseconds while
perf_counter returns float seconds. The ns version avoids
floating-point precision issues for very short intervals.

For most timing needs, either works well, but perf_counter_ns is better
for extremely precise measurements.

## Measuring Function Call Overhead

perf_counter_ns can measure very small time intervals like
function call overhead. This example demonstrates this capability.

function_overhead.py
  

import time

def empty_function():
    pass

# Measure single call overhead
start = time.perf_counter_ns()
empty_function()
end = time.perf_counter_ns()
single_call = end - start

# Measure average overhead over many calls
trials = 1000000
start = time.perf_counter_ns()
for _ in range(trials):
    empty_function()
end = time.perf_counter_ns()
avg_call = (end - start) / trials

print(f"Single call overhead: {single_call} ns")
print(f"Average call overhead: {avg_call:.2f} ns")

This measures the time taken to call an empty function. The single call
measurement shows raw overhead while the averaged version reduces noise.

Such precise measurements are useful when optimizing performance-critical
code where every nanosecond matters.

## Benchmarking Different Implementations

This example uses perf_counter_ns to compare the performance
of different Python implementations of the same algorithm.

benchmarking.py
  

import time

def sum_with_for(n):
    total = 0
    for i in range(n):
        total += i
    return total

def sum_with_builtin(n):
    return sum(range(n))

def measure(func, n, trials=100):
    start = time.perf_counter_ns()
    for _ in range(trials):
        func(n)
    end = time.perf_counter_ns()
    return (end - start) / trials

n = 10000
trials = 100

for_loop_time = measure(sum_with_for, n, trials)
builtin_time = measure(sum_with_builtin, n, trials)

print(f"For loop sum: {for_loop_time:.0f} ns per call")
print(f"Builtin sum: {builtin_time:.0f} ns per call")
print(f"Builtin is {for_loop_time/builtin_time:.1f}x faster")

The example measures two ways to sum numbers: using a manual for loop
versus Python's built-in sum. Results show their relative performance.

Averaging over multiple trials reduces measurement noise and provides
more reliable comparisons between implementations.

## Precision Limitations and Clock Resolution

This example demonstrates the practical resolution limits of
perf_counter_ns by measuring the smallest detectable interval.

resolution_test.py
  

import time

def measure_resolution():
    # Measure smallest detectable time difference
    min_diff = float('inf')
    for _ in range(1000):
        t1 = time.perf_counter_ns()
        t2 = time.perf_counter_ns()
        if t2 &gt; t1:
            diff = t2 - t1
            if diff &lt; min_diff:
                min_diff = diff
    return min_diff

resolution = measure_resolution()
print(f"Smallest detectable interval: {resolution} ns")

# Verify with time.sleep(0)
sleep_start = time.perf_counter_ns()
time.sleep(0)
sleep_end = time.perf_counter_ns()
print(f"time.sleep(0) duration: {sleep_end - sleep_start} ns")

The first part measures the smallest time difference the timer can detect.
The second part shows that even sleep(0) takes measurable time due to
Python's overhead.

Actual resolution depends on hardware and OS. Modern systems typically
have nanosecond resolution timers, but overhead may limit practical use.

## Microbenchmarking with perf_counter_ns

This example shows how to create a microbenchmark decorator using
perf_counter_ns for precise function timing.

microbenchmark.py
  

import time
from functools import wraps

def benchmark(n_trials=1000, warmup=100):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            # Warmup phase (avoid JIT/cache effects)
            for _ in range(warmup):
                func(*args, **kwargs)
            
            # Measurement phase
            total_ns = 0
            for _ in range(n_trials):
                start = time.perf_counter_ns()
                func(*args, **kwargs)
                end = time.perf_counter_ns()
                total_ns += (end - start)
            
            avg_ns = total_ns / n_trials
            print(f"{func.__name__}: {avg_ns:.1f} ns per call "
                  f"(over {n_trials} trials)")
            return func(*args, **kwargs)
        return wrapper
    return decorator

@benchmark(n_trials=10000, warmup=1000)
def list_comprehension(n):
    return [i*i for i in range(n)]

@benchmark(n_trials=10000, warmup=1000)
def manual_loop(n):
    result = []
    for i in range(n):
        result.append(i*i)
    return result

list_comprehension(100)
manual_loop(100)

The decorator handles warmup runs to avoid startup effects, then measures
average execution time over many trials. This provides reliable microbenchmarks.

The example compares list comprehension versus manual loop performance,
showing how to properly benchmark small code differences.

## Best Practices

- **Precision needs:** Use perf_counter_ns for nanosecond precision timing

- **Monotonicity:** The counter always increases, ideal for intervals

- **Averaging:** For small operations, average over many runs

- **Warmup:** Include warmup runs to avoid startup overhead

- **Clock resolution:** Be aware of your system's actual timer resolution

## Source References

- [Python perf_counter_ns Documentation](https://docs.python.org/3/library/time.html#time.perf_counter_ns)

- [PEP 564 - Add Nanosecond Resolution Time Functions](https://peps.python.org/pep-0564/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).