+++
title = "Python time.process_time_ns Function"
date = 2025-08-29T20:11:00.167+01:00
draft = false
description = "Complete guide to Python's time.process_time_ns function covering nanosecond precision timing, process time measurement, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.process_time_ns Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.process_time_ns function,
which returns process time in nanoseconds. We'll cover high-precision timing,
performance measurement, and practical examples.

## Basic Definitions

The time.process_time_ns function returns the current process time
as an integer in nanoseconds. Process time measures CPU time used by the process.

Key characteristics: nanosecond precision, measures CPU time (not wall-clock),
and excludes sleep time. It's ideal for benchmarking CPU-bound operations.
The return value is an integer for precise timing measurements.

## Basic Process Time Measurement

The simplest use of time.process_time_ns measures process time.
This example shows basic usage and conversion to seconds.

basic_process_time.py
  

import time

# Get current process time in nanoseconds
process_time_ns = time.process_time_ns()
print(f"Process time: {process_time_ns} ns")

# Convert to seconds
process_time_sec = process_time_ns / 1e9
print(f"Process time: {process_time_sec:.9f} seconds")

This example demonstrates getting the current process time in nanoseconds.
The value is converted to seconds for human-readable display.

Note that process time only increases while the CPU is actively working on
your process, unlike wall-clock time.

## Measuring Function Execution Time

time.process_time_ns is ideal for measuring CPU time of functions.
This example shows how to time a CPU-intensive operation.

function_timing.py
  

import time

def calculate_primes(n):
    primes = []
    for candidate in range(2, n + 1):
        is_prime = True
        for divisor in range(2, int(candidate ** 0.5) + 1):
            if candidate % divisor == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(candidate)
    return primes

# Start timer
start_time = time.process_time_ns()

# Execute CPU-bound function
primes = calculate_primes(10000)

# Calculate duration
end_time = time.process_time_ns()
duration_ns = end_time - start_time

print(f"Found {len(primes)} primes in {duration_ns / 1e6:.3f} ms")

This pattern measures only the CPU time used by the calculation, excluding
any time spent waiting or sleeping. The result is in nanoseconds.

The duration is converted to milliseconds for better readability while
maintaining precision.

## Comparing Process Time and Wall Time

This example compares process time with wall-clock time to show the difference
when including sleep operations.

compare_times.py
  

import time

def mixed_operation():
    # CPU-bound work
    sum(range(1000000))
    # I/O-bound wait
    time.sleep(1)
    # More CPU work
    sum(range(2000000))

# Wall-clock time measurement
wall_start = time.time()
mixed_operation()
wall_end = time.time()
print(f"Wall time: {(wall_end - wall_start) * 1e3:.3f} ms")

# Process time measurement
proc_start = time.process_time_ns()
mixed_operation()
proc_end = time.process_time_ns()
print(f"Process time: {(proc_end - proc_start) / 1e6:.3f} ms")

Wall time includes sleep time, while process time only counts active CPU usage.
This shows how they differ for operations with waiting periods.

Process time is better for measuring actual CPU workload, while wall time
measures total elapsed time.

## Microbenchmarking with process_time_ns

For microbenchmarks, process_time_ns provides nanosecond precision.
This example benchmarks a small operation multiple times.

microbenchmark.py
  

import time

def benchmark(func, iterations=1000000):
    start = time.process_time_ns()
    for _ in range(iterations):
        func()
    end = time.process_time_ns()
    ns_per_op = (end - start) / iterations
    print(f"{func.__name__}: {ns_per_op:.2f} ns/operation")

def empty_func():
    pass

def small_calc():
    3.14159 * 2.71828

benchmark(empty_func)
benchmark(small_calc)

This measures the per-operation cost by running many iterations and dividing
the total time. Nanosecond precision reveals small performance differences.

Note that modern CPUs may optimize empty loops, so results should be interpreted
carefully.

## Profiling Code Sections

process_time_ns can profile different code sections separately.
This example shows detailed CPU time breakdown.

profiling.py
  

import time

def complex_operation():
    # Section 1: Setup
    start1 = time.process_time_ns()
    data = [i**2 for i in range(10000)]
    end1 = time.process_time_ns()
    
    # Section 2: Processing
    start2 = time.process_time_ns()
    result = sum(x % 7 for x in data)
    end2 = time.process_time_ns()
    
    # Section 3: Cleanup
    start3 = time.process_time_ns()
    sorted_data = sorted(data)
    end3 = time.process_time_ns()
    
    # Report timings
    print(f"Setup: {(end1 - start1) / 1e6:.3f} ms")
    print(f"Processing: {(end2 - start2) / 1e6:.3f} ms")
    print(f"Cleanup: {(end3 - start3) / 1e6:.3f} ms")
    return result

complex_operation()

This pattern helps identify which parts of a function consume the most CPU time.
Each section is timed independently for detailed analysis.

The results are converted to milliseconds for readability while maintaining
precise measurement of each section.

## Comparing Algorithms

This example uses process_time_ns to compare the performance of
different algorithms solving the same problem.

algorithm_comparison.py
  

import time

def factorial_recursive(n):
    return 1 if n &lt;= 1 else n * factorial_recursive(n - 1)

def factorial_iterative(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

def time_algorithm(func, arg):
    start = time.process_time_ns()
    result = func(arg)
    end = time.process_time_ns()
    return result, end - start

n = 500
result_rec, time_rec = time_algorithm(factorial_recursive, n)
result_it, time_it = time_algorithm(factorial_iterative, n)

print(f"Recursive: {time_rec / 1e6:.3f} ms")
print(f"Iterative: {time_it / 1e6:.3f} ms")
print(f"Same result: {result_rec == result_it}")

The example compares recursive and iterative factorial implementations.
Process time measurement shows which approach is more CPU-efficient.

Note that for very large n, the recursive version might hit Python's recursion
limit before showing its full performance characteristics.

## Tracking Cumulative Process Time

This example demonstrates tracking cumulative CPU time across multiple operations
using process_time_ns.

cumulative_time.py
  

import time
import random

def perform_work():
    # Simulate variable CPU workload
    n = random.randint(100000, 500000)
    sum(range(n))

total_cpu_ns = 0
operations = 0

while total_cpu_ns &lt; 5e9:  # Run until 5 seconds CPU time
    start = time.process_time_ns()
    perform_work()
    end = time.process_time_ns()
    
    operation_time = end - start
    total_cpu_ns += operation_time
    operations += 1
    
    print(f"Op {operations}: {operation_time / 1e6:.3f} ms", end=" | ")
    print(f"Total: {total_cpu_ns / 1e9:.3f} s")

print(f"\nCompleted {operations} operations in {total_cpu_ns / 1e9:.3f} s CPU time")

This tracks the total CPU time consumed by a series of operations until reaching
a threshold. Each operation's contribution is measured precisely.

The example shows how to monitor cumulative CPU usage for batch processing
or long-running tasks.

## Best Practices

- **Precision needs:** Use process_time_ns for nanosecond precision CPU timing

- **CPU-bound work:** Ideal for measuring actual CPU usage, not I/O time

- **Microbenchmarks:** Perfect for small, fast operations needing high precision

- **Comparisons:** Use for relative performance measurements between algorithms

- **Multi-threading:** Be aware that process time includes all threads

## Source References

- [Python process_time_ns Documentation](https://docs.python.org/3/library/time.html#time.process_time_ns)

- [Python process_time Documentation](https://docs.python.org/3/library/time.html#time.process_time)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).