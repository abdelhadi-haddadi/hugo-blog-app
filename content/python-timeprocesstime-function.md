+++
title = "Python time.process_time Function"
date = 2025-08-29T20:11:00.173+01:00
draft = false
description = "Complete guide to Python's time.process_time function covering CPU time measurement, performance timing, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.process_time Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.process_time function,
which returns CPU time used by the current process. We'll cover CPU time measurement,
performance benchmarking, and practical timing examples.

## Basic Definitions

The time.process_time function returns the current CPU time as a
floating point number expressed in seconds. It measures system and user CPU time.

Key characteristics: measures process CPU time only (not sleep time), platform-
dependent precision, and useful for CPU-bound performance measurement.
The return value is a float for subsecond precision.

## Basic CPU Time Measurement

The simplest use of time.process_time measures CPU time used.
This example shows basic usage and comparison with wall-clock time.

basic_process_time.py
  

import time

# Get current CPU time
cpu_start = time.process_time()

# Perform CPU-bound work
sum(range(10000000))

cpu_end = time.process_time()
print(f"CPU time used: {cpu_end - cpu_start:.4f} seconds")

# Compare with wall-clock time
wall_start = time.time()
sum(range(10000000))
wall_end = time.time()
print(f"Wall-clock time: {wall_end - wall_start:.4f} seconds")

This example demonstrates measuring CPU time versus wall-clock time.
CPU time only counts when the process is actively using the CPU.

The difference shows how much time was spent waiting versus computing.
This is useful for performance optimization.

## Measuring Function CPU Time

time.process_time is ideal for measuring CPU-bound function
performance. This example shows how to time a CPU-intensive function.

function_timing.py
  

import time

def cpu_intensive_task():
    result = 0
    for i in range(10000000):
        result += i * i
    return result

# Start CPU timer
start_cpu = time.process_time()

# Execute CPU-bound function
result = cpu_intensive_task()

# Calculate CPU duration
end_cpu = time.process_time()
cpu_duration = end_cpu - start_cpu

print(f"Function result: {result}")
print(f"CPU time used: {cpu_duration:.6f} seconds")

This pattern measures actual CPU usage, ignoring any time spent waiting.
It's perfect for optimizing CPU-bound algorithms.

The precision of process_time makes it suitable for micro-
benchmarking tight loops and mathematical operations.

## Comparing CPU Time vs Wall Time

This example demonstrates the difference between CPU time and wall-clock
time when sleep operations are involved.

sleep_comparison.py
  

import time

def mixed_operation():
    # CPU-bound work
    sum(range(1000000))
    # I/O-bound wait
    time.sleep(1)
    # More CPU work
    sum(range(1000000))

# CPU time measurement
cpu_start = time.process_time()
mixed_operation()
cpu_end = time.process_time()
print(f"CPU time: {cpu_end - cpu_start:.4f} sec")

# Wall time measurement
wall_start = time.time()
mixed_operation()
wall_end = time.time()
print(f"Wall time: {wall_end - wall_start:.4f} sec")

process_time ignores sleep time, while time.time
measures total elapsed time. This shows how I/O affects performance.

For CPU-bound optimization, focus on CPU time. For overall performance,
consider both metrics.

## Profiling Multiple Operations

This example uses process_time to profile different operations
and compare their CPU usage.

profiling.py
  

import time
import math

def measure_operation(op, name):
    start = time.process_time()
    op()
    duration = time.process_time() - start
    print(f"{name}: {duration:.6f} sec")

# Define operations
def list_comp():
    [x*x for x in range(1000000)]

def map_lambda():
    list(map(lambda x: x*x, range(1000000)))

def math_operations():
    for x in range(10000):
        math.sin(x) + math.cos(x)

# Profile each operation
measure_operation(list_comp, "List comprehension")
measure_operation(map_lambda, "Map with lambda")
measure_operation(math_operations, "Math functions")

This technique helps identify CPU-intensive operations in your code.
The results can guide optimization efforts.

Note that absolute times may vary between runs, but relative comparisons
remain meaningful for optimization.

## Tracking Cumulative CPU Time

This example demonstrates tracking cumulative CPU time across multiple
function calls or iterations.

cumulative_time.py
  

import time
import random

def process_data(data):
    # Simulate variable CPU load
    time.sleep(random.random() * 0.1)
    return sum(x*x for x in data)

total_cpu = 0.0
data_sets = [list(range(i, i+10000)) for i in range(0, 100000, 10000)]

for data in data_sets:
    cpu_start = time.process_time()
    result = process_data(data)
    cpu_end = time.process_time()
    total_cpu += cpu_end - cpu_start
    print(f"Processed set, result: {result}")

print(f"\nTotal CPU time: {total_cpu:.4f} seconds")
print(f"Average per set: {total_cpu/len(data_sets):.6f} seconds")

Tracking cumulative CPU time helps identify performance trends across
multiple operations or data sets.

This pattern is useful for batch processing systems where understanding
total resource usage is important.

## Comparing Algorithms

This example uses process_time to compare the CPU efficiency
of different algorithms solving the same problem.

algorithm_comparison.py
  

import time

def factorial_recursive(n):
    return 1 if n &lt;= 1 else n * factorial_recursive(n-1)

def factorial_iterative(n):
    result = 1
    for i in range(1, n+1):
        result *= i
    return result

def measure_factorial(func, n, name):
    start = time.process_time()
    result = func(n)
    duration = time.process_time() - start
    print(f"{name} ({n}): {duration:.6f} sec")
    return result

n = 900
rec_result = measure_factorial(factorial_recursive, n, "Recursive")
iter_result = measure_factorial(factorial_iterative, n, "Iterative")

assert rec_result == iter_result

CPU time measurement provides objective data for algorithm selection.
This example compares recursive vs. iterative factorial implementations.

Such comparisons are valuable when optimizing critical code paths where
small differences in efficiency matter.

## Monitoring CPU Usage Over Time

This example shows how to monitor CPU usage patterns during long-running
operations by sampling at intervals.

cpu_monitoring.py
  

import time
import random

def long_running_task():
    # Simulate mixed CPU and I/O workload
    for i in range(10):
        # CPU-intensive phase
        start_phase = time.process_time()
        sum(x*x for x in range(1000000 * (i+1)))
        cpu_time = time.process_time() - start_phase
        
        # Report phase statistics
        print(f"Phase {i+1}: CPU time {cpu_time:.3f} sec")
        
        # Simulate I/O wait
        time.sleep(random.random())

# Start monitoring
print("Starting task monitoring...")
start_total = time.process_time()
long_running_task()
total_cpu = time.process_time() - start_total

print(f"\nTotal CPU time: {total_cpu:.3f} seconds")

This technique helps identify phases of CPU-intensive activity in long
processes. The data can guide optimization efforts.

By breaking down CPU usage by phase, you can target optimizations where
they'll have the most impact.

## Best Practices

- **Use case:** Prefer process_time for CPU-bound performance measurement

- **Precision:** Provides high-resolution CPU time measurements

- **Sleep time:** Doesn't count time spent sleeping or waiting

- **Multi-core:** Sums CPU time across all threads/cores

- **Children:** Doesn't include child process CPU time

## Source References

- [Python process_time Documentation](https://docs.python.org/3/library/time.html#time.process_time)

- [Python perf_counter Documentation](https://docs.python.org/3/library/time.html#time.perf_counter)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).