+++
title = "Python time.thread_time_ns Function"
date = 2025-08-29T20:11:02.485+01:00
draft = false
description = "Complete guide to Python's time.thread_time_ns function covering thread-specific CPU time measurement in nanoseconds with practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.thread_time_ns Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.thread_time_ns function,
which returns thread-specific CPU time in nanoseconds. We'll cover precise timing,
performance measurement, and practical examples.

## Basic Definitions

The time.thread_time_ns function returns the sum of system and user
CPU time of the current thread in nanoseconds. It's thread-specific and doesn't
include time spent during sleep.

Key characteristics: nanosecond precision, thread-specific measurement, and
useful for profiling CPU-bound operations. The return value is an integer
for maximum precision.

## Basic Thread Time Measurement

The simplest use of time.thread_time_ns measures CPU time for
the current thread. This example shows basic usage and conversion to seconds.

basic_thread_time.py
  

import time

# Get current thread CPU time in nanoseconds
thread_time = time.thread_time_ns()
print(f"Thread CPU time: {thread_time} ns")

# Convert to seconds
seconds = thread_time / 1e9
print(f"Thread CPU time: {seconds:.9f} seconds")

This example demonstrates getting the thread-specific CPU time and converting
it to seconds. The nanosecond precision allows for extremely accurate timing.

Note that this measures only CPU time used by the current thread, not wall-clock
time or time spent in other threads.

## Measuring CPU-bound Operation

time.thread_time_ns is ideal for measuring CPU-bound operations.
This example shows how to time a computation-intensive task.

cpu_bound.py
  

import time

def compute_factorial(n):
    result = 1
    for i in range(1, n+1):
        result *= i
    return result

# Start timer
start = time.thread_time_ns()

# Execute CPU-bound operation
fact = compute_factorial(10000)

# Calculate duration
end = time.thread_time_ns()
duration_ns = end - start

print(f"Computation took {duration_ns} ns")
print(f"Computation took {duration_ns / 1e6:.3f} ms")

This pattern accurately measures only the CPU time spent in the computation,
excluding any time spent waiting or sleeping. The result is in nanoseconds.

The example also shows conversion to milliseconds for more readable output.

## Comparing Thread Time vs Process Time

This example compares thread_time_ns with process_time_ns
to show thread-specific vs process-wide CPU time measurement.

thread_vs_process.py
  

import time
import threading

def cpu_work():
    sum(range(10**6))

# Single thread measurement
thread_start = time.thread_time_ns()
process_start = time.process_time_ns()
cpu_work()
thread_end = time.thread_time_ns()
process_end = time.process_time_ns()

print(f"Single thread:")
print(f"  Thread time: {(thread_end - thread_start) / 1e6:.3f} ms")
print(f"  Process time: {(process_end - process_start) / 1e6:.3f} ms")

# Multi-thread measurement
def worker():
    thread_start = time.thread_time_ns()
    cpu_work()
    thread_end = time.thread_time_ns()
    print(f"  Worker thread time: {(thread_end - thread_start) / 1e6:.3f} ms")

print("\nMulti-thread:")
process_start = time.process_time_ns()
threads = [threading.Thread(target=worker) for _ in range(2)]
for t in threads:
    t.start()
for t in threads:
    t.join()
process_end = time.process_time_ns()

print(f"  Total process time: {(process_end - process_start) / 1e6:.3f} ms")

The example shows that thread_time_ns measures only the current thread's CPU
time, while process_time_ns includes all threads in the process.

In multi-threaded scenarios, thread_time_ns provides precise per-thread metrics.

## Profiling Function Execution

This example creates a decorator that profiles function execution using
thread_time_ns for accurate CPU time measurement.

profiler.py
  

import time

def profile(func):
    def wrapper(*args, **kwargs):
        start = time.thread_time_ns()
        result = func(*args, **kwargs)
        end = time.thread_time_ns()
        duration_ns = end - start
        print(f"{func.__name__} took {duration_ns} ns ({duration_ns / 1e6:.3f} ms)")
        return result
    return wrapper

@profile
def calculate_primes(n):
    primes = []
    candidate = 2
    while len(primes) &lt; n:
        is_prime = True
        for p in primes:
            if p * p &gt; candidate:
                break
            if candidate % p == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(candidate)
        candidate += 1
    return primes

calculate_primes(1000)

The profiler decorator measures only the CPU time spent executing the function,
excluding any time spent in I/O or sleeping. This is ideal for CPU-bound tasks.

The nanosecond precision allows detecting even very small performance differences.

## Comparing CPU-bound vs I/O-bound Operations

This example demonstrates how thread_time_ns behaves differently
with CPU-bound and I/O-bound operations.

cpu_vs_io.py
  

import time

def cpu_task():
    sum(i*i for i in range(10**6))

def io_task():
    time.sleep(0.1)  # Simulate I/O wait

print("CPU-bound task:")
start = time.thread_time_ns()
cpu_task()
end = time.thread_time_ns()
print(f"  Thread CPU time: {(end - start) / 1e6:.3f} ms")

print("\nI/O-bound task:")
start = time.thread_time_ns()
io_task()
end = time.thread_time_ns()
print(f"  Thread CPU time: {(end - start) / 1e6:.3f} ms")

The CPU-bound task shows significant thread CPU time, while the I/O-bound task
shows nearly zero CPU time despite taking wall-clock time.

This demonstrates that thread_time_ns measures only actual CPU usage, not
time spent waiting for I/O operations.

## Multi-threaded Performance Analysis

This example uses thread_time_ns to analyze performance in
a multi-threaded application, showing per-thread CPU usage.

multi_thread.py
  

import time
import threading

def worker(worker_id):
    start = time.thread_time_ns()
    
    # Simulate work with different CPU intensities
    for i in range(worker_id * 1000000):
        x = i * i
    
    end = time.thread_time_ns()
    duration = (end - start) / 1e6
    print(f"Worker {worker_id} CPU time: {duration:.3f} ms")

threads = []
for i in range(1, 4):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

Each thread reports its own CPU time, allowing analysis of how work is distributed
across threads. Heavier workloads show proportionally higher CPU times.

This technique is valuable for identifying thread imbalance in parallel
processing applications.

## Microbenchmarking Small Code Snippets

The nanosecond precision of thread_time_ns makes it ideal for
microbenchmarking small code snippets. This example compares two approaches.

microbenchmark.py
  

import time

def test_list_comprehension():
    start = time.thread_time_ns()
    [x*x for x in range(1000)]
    end = time.thread_time_ns()
    return end - start

def test_loop():
    start = time.thread_time_ns()
    result = []
    for x in range(1000):
        result.append(x*x)
    end = time.thread_time_ns()
    return end - start

# Warm-up runs (JIT compilation, cache effects)
test_list_comprehension()
test_loop()

# Actual measurements
lc_times = [test_list_comprehension() for _ in range(100)]
loop_times = [test_loop() for _ in range(100)]

avg_lc = sum(lc_times) / len(lc_times)
avg_loop = sum(loop_times) / len(loop_times)

print(f"List comprehension avg: {avg_lc:.1f} ns")
print(f"Traditional loop avg: {avg_loop:.1f} ns")
print(f"Difference: {avg_loop - avg_lc:.1f} ns ({avg_loop/avg_lc:.1f}x)")

The example shows how to properly microbenchmark small code differences by
using multiple runs and averaging. Warm-up runs help avoid measurement bias.

Nanosecond precision reveals even small performance differences between
seemingly similar implementations.

## Best Practices

- **Precision needs:** Use thread_time_ns when nanosecond precision is required

- **Thread-specific:** Remember it measures only current thread CPU time

- **CPU-bound tasks:** Ideal for measuring computation without I/O

- **Microbenchmarks:** Perfect for comparing small code variations

- **Multi-threading:** Use to analyze per-thread CPU usage patterns

## Source References

- [Python thread_time_ns Documentation](https://docs.python.org/3/library/time.html#time.thread_time_ns)

- [Python process_time_ns Documentation](https://docs.python.org/3/library/time.html#time.process_time_ns)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).