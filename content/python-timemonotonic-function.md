+++
title = "Python time.monotonic Function"
date = 2025-08-29T20:10:57.952+01:00
draft = false
description = "Complete guide to Python's time.monotonic function covering monotonic clocks, performance timing, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.monotonic Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.monotonic function,
which provides a monotonic clock for reliable time measurements. We'll cover its
usage for benchmarking, performance timing, and practical examples.

## Basic Definitions

The time.monotonic function returns a floating point number
representing seconds from an unspecified starting point. The key feature is
that it never goes backward, even if system time is adjusted.

Key characteristics: guaranteed monotonic (never decreases), not affected by
system clock changes, ideal for measuring elapsed time, and has unspecified
reference point (only differences matter). The resolution is platform-dependent.

## Basic Usage of time.monotonic

The simplest use of time.monotonic measures elapsed time between
two points. This example shows basic timing functionality.

basic_monotonic.py
  

import time

# Get initial monotonic time
start = time.monotonic()

# Simulate some work
time.sleep(1.5)

# Get end time
end = time.monotonic()

# Calculate elapsed time
elapsed = end - start
print(f"Elapsed time: {elapsed:.3f} seconds")

This example demonstrates the fundamental pattern for measuring elapsed time.
The difference between two monotonic timestamps gives reliable duration.

The :.3f format specifier displays the time with millisecond
precision, though actual precision depends on the platform.

## Comparing time.monotonic with time.time

This example compares time.monotonic with time.time
to show how system clock changes affect them differently.

compare_clocks.py
  

import time

print("Starting comparison...")
print("Change your system clock during this test to see the difference")

start_mono = time.monotonic()
start_time = time.time()

time.sleep(10)  # Change system clock during this sleep

end_mono = time.monotonic()
end_time = time.time()

print(f"monotonic duration: {end_mono - start_mono:.2f} seconds")
print(f"time.time duration: {end_time - start_time:.2f} seconds")

time.monotonic will always show ~10 seconds, while
time.time may show incorrect duration if clock was adjusted.

This demonstrates why monotonic clocks are essential for reliable timing
measurements, especially for long-running processes.

## Precision Benchmarking with time.monotonic

time.monotonic is excellent for microbenchmarking due to its
high resolution. This example measures a function's execution time.

benchmarking.py
  

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

# Time the function
start = time.monotonic()
primes = calculate_primes(10000)
end = time.monotonic()

print(f"Found {len(primes)} primes in {end - start:.6f} seconds")

This pattern is useful for performance optimization. The monotonic clock
provides reliable timing unaffected by system clock adjustments.

For even higher precision, consider time.perf_counter which
may provide better resolution on some platforms.

## Creating a Timer Class

This example shows how to create a reusable timer class using
time.monotonic for accurate timing measurements.

timer_class.py
  

import time

class Timer:
    def __init__(self):
        self._start = None
        self._elapsed = 0
    
    def start(self):
        if self._start is not None:
            raise RuntimeError("Timer already running")
        self._start = time.monotonic()
    
    def stop(self):
        if self._start is None:
            raise RuntimeError("Timer not running")
        self._elapsed += time.monotonic() - self._start
        self._start = None
    
    def reset(self):
        self._start = None
        self._elapsed = 0
    
    @property
    def elapsed(self):
        if self._start is not None:
            return self._elapsed + (time.monotonic() - self._start)
        return self._elapsed

# Usage example
timer = Timer()
timer.start()
time.sleep(1.5)
timer.stop()
print(f"Elapsed: {timer.elapsed:.3f} seconds")

timer.start()
time.sleep(0.75)
timer.stop()
print(f"Total elapsed: {timer.elapsed:.3f} seconds")

The Timer class can be started, stopped, and queried for elapsed time.
It accumulates time across multiple start/stop cycles.

This is useful for profiling code sections where you need cumulative
timing across multiple executions.

## Implementing a Timeout with time.monotonic

This example shows how to implement a timeout mechanism using
time.monotonic that won't be affected by system clock changes.

timeout.py
  

import time

def run_with_timeout(timeout_seconds, func, *args, **kwargs):
    start = time.monotonic()
    result = func(*args, **kwargs)
    elapsed = time.monotonic() - start
    
    if elapsed &gt; timeout_seconds:
        raise TimeoutError(f"Operation timed out after {elapsed:.2f} seconds")
    return result

# Example usage
def long_running_operation(duration):
    time.sleep(duration)
    return "Done"

try:
    # This will succeed
    print(run_with_timeout(2, long_running_operation, 1.5))
    
    # This will timeout
    print(run_with_timeout(1, long_running_operation, 1.5))
except TimeoutError as e:
    print(f"Error: {e}")

The timeout is reliable because it uses the monotonic clock. Even if the
system clock changes during execution, the timeout will work correctly.

Note this doesn't actually interrupt the function - it only checks the
time after completion. For true interruption, consider threading.

## Measuring Frame Rate in a Game Loop

This example demonstrates using time.monotonic to measure
and maintain a consistent frame rate in a game loop.

game_loop.py
  

import time

TARGET_FPS = 60
FRAME_TIME = 1.0 / TARGET_FPS

def game_loop():
    frame_count = 0
    start_time = time.monotonic()
    last_frame_time = start_time
    
    while frame_count &lt; 120:  # Run for 120 frames
        current_time = time.monotonic()
        elapsed = current_time - last_frame_time
        
        # Only process frame if enough time has passed
        if elapsed &gt;= FRAME_TIME:
            # Simulate game logic and rendering
            time.sleep(0.005)  # Simulate variable work time
            
            frame_count += 1
            last_frame_time = current_time
            
            # Calculate current FPS
            total_elapsed = current_time - start_time
            current_fps = frame_count / total_elapsed
            print(f"Frame {frame_count}: {current_fps:.1f} FPS")

game_loop()

The game loop uses the monotonic clock to maintain consistent timing
regardless of system clock changes. It calculates the actual FPS achieved.

This pattern is essential for games and simulations where consistent
timing is more important than wall-clock time.

## Best Practices

- **Use for durations:** Always use for measuring elapsed time, not absolute time

- **Reference point:** The zero point is arbitrary - only differences matter

- **High precision:** For microbenchmarks, consider time.perf_counter

- **Platform consistency:** Resolution varies across platforms

- **Long-running processes:** Essential for reliable timing in long processes

## Source References

- [Python time.monotonic Documentation](https://docs.python.org/3/library/time.html#time.monotonic)

- [PEP 418 - Adding monotonic time](https://peps.python.org/pep-0418/)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).