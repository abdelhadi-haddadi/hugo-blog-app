+++
title = "Python time.time Function"
date = 2025-08-29T20:11:03.588+01:00
draft = false
description = "Complete guide to Python's time.time function covering timestamp generation, performance timing, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.time Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.time function,
which returns the current time in seconds since the epoch. We'll cover timestamp
generation, performance measurement, and practical timing examples.

## Basic Definitions

The time.time function returns the current time as a floating point
number expressed in seconds since the epoch (January 1, 1970, 00:00:00 UTC).

Key characteristics: platform-dependent precision (typically microsecond),
monotonic on most systems, and useful for timing operations and logging.
The return value is a float for subsecond precision.

## Basic Timestamp Generation

The simplest use of time.time generates a current timestamp.
This example shows basic usage and conversion to other time formats.

basic_time.py
  

import time

# Get current timestamp
timestamp = time.time()
print(f"Current timestamp: {timestamp}")

# Convert to readable format
local_time = time.localtime(timestamp)
print(f"Local time: {time.strftime('%Y-%m-%d %H:%M:%S', local_time)}")

# Convert to UTC
utc_time = time.gmtime(timestamp)
print(f"UTC time: {time.strftime('%Y-%m-%d %H:%M:%S', utc_time)}")

This example demonstrates getting the current timestamp and converting it to
both local and UTC time formats. The timestamp is a float with subsecond
precision.

The strftime function formats the time struct into a human-readable
string according to the specified format codes.

## Measuring Code Execution Time

time.time is commonly used to measure code execution duration.
This example shows how to time a block of code with microsecond precision.

timing.py
  

import time

def slow_function():
    # Simulate work
    time.sleep(1.5)

# Start timer
start_time = time.time()

# Execute code to time
slow_function()

# Calculate duration
end_time = time.time()
duration = end_time - start_time

print(f"Function took {duration:.4f} seconds")

This pattern is useful for performance testing. The start time is captured
before execution, and end time after. The difference gives the duration.

The :.4f format specifier displays the duration with 4 decimal
places for millisecond precision.

## Comparing Time.time with Time.perf_counter

While time.time measures wall-clock time, time.perf_counter
provides highest available resolution for benchmarking. This example compares them.

comparison.py
  

import time

def test_function():
    sum(range(1000000))

# Using time.time()
start = time.time()
test_function()
end = time.time()
print(f"time.time(): {end - start:.6f} sec")

# Using time.perf_counter()
start = time.perf_counter()
test_function()
end = time.perf_counter()
print(f"time.perf_counter(): {end - start:.6f} sec")

time.time is affected by system clock changes, while
perf_counter is monotonic and better for short intervals.

For most timing needs, perf_counter is preferred, while
time is better for actual timestamps.

## Creating Timeouts

time.time can implement timeouts by comparing current time
against a deadline. This example shows a timeout decorator.

timeout.py
  

import time

def timeout(seconds):
    def decorator(func):
        def wrapper(*args, **kwargs):
            start = time.time()
            result = func(*args, **kwargs)
            elapsed = time.time() - start
            if elapsed &gt; seconds:
                raise TimeoutError(f"Function exceeded {seconds} second timeout")
            return result
        return wrapper
    return decorator

@timeout(2)
def potentially_slow_operation():
    time.sleep(1.5)  # Simulate work
    return "Success"

print(potentially_slow_operation())  # Success

@timeout(1)
def too_slow_operation():
    time.sleep(1.5)
    return "Should timeout"

try:
    too_slow_operation()
except TimeoutError as e:
    print(f"Caught: {e}")

The decorator measures execution time and raises if it exceeds the limit.
This pattern is useful for enforcing maximum runtime for operations.

Note this doesn't actually interrupt the function - it only checks after
completion. For true interruption, consider threading.

## Rate Limiting with Time.time

This example implements rate limiting using time.time to
track and control request frequency.

rate_limit.py
  

import time

class RateLimiter:
    def __init__(self, calls_per_second):
        self.period = 1.0 / calls_per_second
        self.last_call = 0
    
    def __call__(self, func):
        def wrapper(*args, **kwargs):
            now = time.time()
            elapsed = now - self.last_call
            if elapsed &lt; self.period:
                time.sleep(self.period - elapsed)
            self.last_call = time.time()
            return func(*args, **kwargs)
        return wrapper

@RateLimiter(2)  # 2 calls per second max
def make_api_request():
    print("API request made at", time.strftime("%H:%M:%S"))

for _ in range(5):
    make_api_request()

The RateLimiter decorator ensures wrapped functions aren't called more than
the specified rate. It sleeps to maintain proper spacing between calls.

This is useful for APIs with rate limits or any operation that needs
throughput control.

## Time-based Cache Expiration

time.time can implement cache expiration by storing timestamps
with cached values. This example shows a simple expiring cache.

expiring_cache.py
  

import time

class ExpiringCache:
    def __init__(self, ttl_seconds):
        self.cache = {}
        self.ttl = ttl_seconds
    
    def get(self, key):
        item = self.cache.get(key)
        if item and time.time() - item['timestamp'] &lt; self.ttl:
            return item['value']
        return None
    
    def set(self, key, value):
        self.cache[key] = {
            'value': value,
            'timestamp': time.time()
        }

cache = ExpiringCache(5)  # 5 second TTL
cache.set('data', 42)

print(cache.get('data'))  # 42
time.sleep(6)
print(cache.get('data'))  # None (expired)

The cache checks item age against the current time on each get. Items older
than the TTL (time-to-live) are considered expired and return None.

This pattern is useful for temporary data storage where freshness matters
more than persistence.

## Best Practices

- **Precision needs:** Use time.time for timestamps, perf_counter for benchmarks

- **Time zones:** Remember time.time returns UTC, convert for local time

- **Monotonicity:** For timing intervals, consider monotonic clocks

- **Float precision:** Be aware of floating-point precision limitations

- **Clock changes:** System clock adjustments can affect time.time

## Source References

- [Python time.time Documentation](https://docs.python.org/3/library/time.html#time.time)

- [Python perf_counter Documentation](https://docs.python.org/3/library/time.html#time.perf_counter)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).