+++
title = "Python os.times Function"
date = 2025-08-29T20:09:43.697+01:00
draft = false
description = "Complete guide to Python's os.times function covering process timing measurements, CPU usage statistics, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.times Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.times function,
which provides process and system CPU times. We'll cover time measurement,
interpretation of results, and practical timing examples.

## Basic Definitions

The os.times function returns process and system CPU times as
a named tuple. It measures time in clock ticks (seconds per tick varies).

Returned tuple contains: user, system, children_user, children_system,
and elapsed time. On Windows, only user and system times are available.

## Basic Usage of os.times

This example demonstrates the basic usage of os.times to get
process timing information. We'll print all available time measurements.

basic_times.py
  

import os

# Get process times
times = os.times()

print(f"User CPU time: {times.user}")
print(f"System CPU time: {times.system}")
print(f"Children user CPU time: {times.children_user}")
print(f"Children system CPU time: {times.children_system}")
print(f"Elapsed real time: {times.elapsed}")

# Get clock ticks per second
print(f"\nClock ticks per second: {os.sysconf('SC_CLK_TCK')}")

This code retrieves and displays all timing information available from
os.times. The user time is CPU time spent in user-mode code.

System time is CPU time spent in kernel-mode. Children times account for
spawned processes. Elapsed time is wall-clock time since process start.

## Measuring Code Execution Time

We can use os.times to measure CPU time consumed by a code block.
This differs from time.time() which measures wall-clock time.

measure_execution.py
  

import os
import math

def calculate_primes(n):
    return [x for x in range(2, n) 
            if all(x % y != 0 for y in range(2, int(math.sqrt(x)) + 1))]

# Get initial times
start = os.times()

# Execute CPU-intensive task
primes = calculate_primes(10000)

# Get final times
end = os.times()

# Calculate differences
user_time = end.user - start.user
system_time = end.system - start.system
total_cpu = user_time + system_time

print(f"User CPU time used: {user_time:.2f} seconds")
print(f"System CPU time used: {system_time:.2f} seconds")
print(f"Total CPU time used: {total_cpu:.2f} seconds")
print(f"Found {len(primes)} prime numbers")

This measures the CPU time consumed by a prime number calculation function.
User time shows time in our code, system time shows kernel operations.

Note this measures CPU time, not wall-clock time. For I/O-bound operations,
wall-clock time might be more relevant (use time.time() instead).

## Comparing Process and Children Times

This example demonstrates how os.times tracks both the main
process and its children's CPU usage by spawning subprocesses.

children_times.py
  

import os
import subprocess

print("Before any child processes:")
initial = os.times()
print(f"Children user: {initial.children_user}")
print(f"Children system: {initial.children_system}\n")

# Run several external commands
commands = ["sleep 1", "ls -l /", "df -h"]
for cmd in commands:
    subprocess.run(cmd, shell=True)

print("\nAfter running child processes:")
final = os.times()
print(f"Children user: {final.children_user}")
print(f"Children system: {final.children_system}")

print("\nChild process totals:")
print(f"Total user time: {final.children_user - initial.children_user}")
print(f"Total system time: {final.children_system - initial.children_system}")

The example runs several shell commands and shows how child process times
accumulate. The sleep command uses little CPU, while ls and df use more.

Children times are useful when your program spawns many subprocesses and
you want to track their combined resource usage separately.

## Calculating CPU Utilization

We can calculate CPU utilization percentage by comparing CPU time to
real elapsed time. This shows how efficiently the CPU is being used.

cpu_utilization.py
  

import os
import time

def busy_work():
    sum = 0
    for i in range(10**7):
        sum += i
    return sum

start_times = os.times()
start_wall = time.time()

# Perform work
result = busy_work()

end_times = os.times()
end_wall = time.time()

# Calculate times
cpu_time = (end_times.user - start_times.user) + \
           (end_times.system - start_times.system)
wall_time = end_wall - start_wall

utilization = (cpu_time / wall_time) * 100

print(f"CPU time used: {cpu_time:.2f} seconds")
print(f"Wall-clock time: {wall_time:.2f} seconds")
print(f"CPU utilization: {utilization:.1f}%")
print(f"Result: {result}")

This calculates CPU utilization by comparing CPU time to real time. 100%
means the process used all available CPU continuously during execution.

For multi-core systems, utilization can exceed 100% if using multiple cores.
This example only measures single-threaded performance.

## Profiling Function Performance

os.times can be used to profile individual functions by
measuring their CPU time consumption. This helps identify performance bottlenecks.

function_profiling.py
  

import os

def fast_operation():
    return sum(range(1000))

def slow_operation():
    total = 0
    for i in range(1000000):
        total += i * i
    return total

def profile_function(func):
    start = os.times()
    result = func()
    end = os.times()
    
    cpu_time = (end.user - start.user) + (end.system - start.system)
    print(f"{func.__name__} took {cpu_time:.4f} CPU seconds")
    return result

print("Profiling function performance:")
profile_function(fast_operation)
profile_function(slow_operation)

This creates a simple profiling function that measures CPU time used by
other functions. The fast operation completes quickly, the slow one takes longer.

For more sophisticated profiling, consider Python's built-in profile or
cProfile modules which provide more detailed analysis.

## Comparing os.times with time.time

This example contrasts os.times (CPU time) with time.time
(wall-clock time) to show when each is appropriate for performance measurement.

times_vs_time.py
  

import os
import time

def cpu_intensive():
    return sum(i*i for i in range(10**6))

def io_intensive():
    with open("temp.txt", "w") as f:
        for i in range(10000):
            f.write(f"Line {i}\n")
    os.remove("temp.txt")

def measure(func):
    print(f"\nMeasuring {func.__name__}:")
    
    # CPU time measurement
    start_cpu = os.times()
    func()
    end_cpu = os.times()
    cpu_time = (end_cpu.user - start_cpu.user) + \
               (end_cpu.system - start_cpu.system)
    
    # Wall-clock time measurement
    start_wall = time.time()
    func()
    end_wall = time.time()
    wall_time = end_wall - start_wall
    
    print(f"CPU time: {cpu_time:.4f} seconds")
    print(f"Wall time: {wall_time:.4f} seconds")
    print(f"Ratio: {cpu_time/wall_time:.1%}")

measure(cpu_intensive)
measure(io_intensive)

The CPU-bound function shows similar CPU and wall times. The I/O-bound function
shows much lower CPU usage compared to wall time due to waiting.

Use os.times for CPU-bound optimization, time.time for overall performance
measurement including I/O waits.

## Platform Differences

- **Unix systems:** Provides all five time measurements

- **Windows:** Only user and system times are available

- **Clock ticks:** Vary by system (use os.sysconf('SC_CLK_TCK'))

- **Precision:** Typically lower than time.perf_counter

- **Child processes:** Only includes direct children, not grandchildren

## Best Practices

- **Choose appropriate metric:** CPU time vs wall-clock time

- **Consider clock resolution:** May not detect very short operations

- **Account for system load:** Other processes affect measurements

- **Use for relative comparisons:** Absolute values vary by system

- **Combine with other tools:** For complete profiling needs

## Source References

- [Python os.times Documentation](https://docs.python.org/3/library/os.html#os.times)

- [Linux times(2) man page](https://man7.org/linux/man-pages/man2/times.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).