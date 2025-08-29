+++
title = "Python re.purge() Function"
date = 2025-08-29T20:10:14.016+01:00
draft = false
description = "Comprehensive tutorial on Python's re.purge function with practical examples"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python re.purge() Function

last modified April 20, 2025

## Introduction to re.purge

The re.purge function is part of Python's re module.
It clears the regular expression cache used by the module to store compiled
patterns.

Python caches recently used regular expressions to improve performance.
The re.purge function allows manual clearing of this cache.

This function is particularly useful in memory-sensitive applications or
when working with many unique patterns that shouldn't be cached long-term.

## Basic Syntax

The syntax for re.purge is simple as it takes no arguments:

re.purge()

Calling this function clears the internal cache of compiled regex patterns.
Subsequent regex operations will need to recompile patterns if used again.

## Basic Cache Purge Example

Here's a simple demonstration of clearing the regex cache.

basic_purge.py
  

#!/usr/bin/python

import re

# Compile some patterns to fill the cache
re.compile(r'pattern1')
re.compile(r'pattern2')

# Clear the cache
re.purge()

# These will need to be compiled fresh
re.compile(r'pattern1')
re.compile(r'pattern2')

This example shows the basic usage of re.purge to clear the
cache between compilations.

re.compile(r'pattern1')

This first compilation adds the pattern to Python's internal regex cache.

re.purge()

This call clears all cached compiled patterns, freeing memory immediately.

## Measuring Cache Impact

Let's measure how the cache affects compilation performance.

cache_impact.py
  

#!/usr/bin/python

import re
import time

def time_compilation(pattern):
    start = time.perf_counter()
    re.compile(pattern)
    return time.perf_counter() - start

# First compilation (uncached)
t1 = time_compilation(r'\d+')

# Second compilation (cached)
t2 = time_compilation(r'\d+')

# After purge
re.purge()
t3 = time_compilation(r'\d+')

print(f"First: {t1:.6f}s, Second: {t2:.6f}s, After purge: {t3:.6f}s")

This demonstrates the performance difference between cached and
uncached compilations.

## Memory Management with Purge

Here's how re.purge can help manage memory usage.

memory_management.py
  

#!/usr/bin/python

import re
import sys

def show_cache_size():
    return sys.getsizeof(re._cache)

# Fill cache with many patterns
for i in range(1000):
    re.compile(f'pattern_{i}')

print(f"Cache size before purge: {show_cache_size()} bytes")

# Clear the cache
re.purge()

print(f"Cache size after purge: {show_cache_size()} bytes")

This example shows how re.purge can reduce memory usage by
clearing the regex cache.

## Cache Behavior with Identical Patterns

The cache stores identical patterns efficiently.

identical_patterns.py
  

#!/usr/bin/python

import re

# These compile to the same pattern object
pattern1 = re.compile(r'\d+')
pattern2 = re.compile(r'\d+')

print(f"Same object: {pattern1 is pattern2}")

# After purge, new objects are created
re.purge()
pattern3 = re.compile(r'\d+')
pattern4 = re.compile(r'\d+')

print(f"After purge: {pattern3 is pattern4}")

This demonstrates how identical patterns share cached objects until
the cache is cleared.

## Cache Limits and Purge Timing

Python's regex cache has a default limit we can observe.

cache_limits.py
  

#!/usr/bin/python

import re
import sys

# Check default cache size
print(f"Default cache limit: {re._MAXCACHE}")

# Fill cache beyond limit
for i in range(re._MAXCACHE + 10):
    re.compile(f'pattern_{i}')

# Verify cache size
print(f"Actual cache size: {len(re._cache)}")

# Purge resets everything
re.purge()
print(f"After purge: {len(re._cache)}")

This shows how the cache automatically manages its size and how
re.purge provides manual control.

## Testing Cache-Dependent Code

re.purge is useful for testing cache-dependent behavior.

testing.py
  

#!/usr/bin/python

import re

def test_pattern_compilation():
    # Ensure fresh start
    re.purge()
    
    # Test first compilation
    start = time.perf_counter()
    re.compile(r'complex_pattern')
    first_time = time.perf_counter() - start
    
    # Test cached compilation
    start = time.perf_counter()
    re.compile(r'complex_pattern')
    cached_time = time.perf_counter() - start
    
    assert cached_time &lt; first_time, "Cache not working"
    print("Test passed")

test_pattern_compilation()

This demonstrates using re.purge to ensure consistent
testing conditions.

## Best Practices

When using re.purge, consider these best practices:

- Use sparingly - the cache exists to improve performance

- Call before memory-intensive operations if using many unique patterns

- Use in testing to ensure consistent behavior

- Combine with custom caching for specialized applications

- Monitor actual memory impact before optimizing

## Performance Considerations

re.purge should be used judiciously as clearing the cache
forces recompilation of subsequent patterns.

The performance impact depends on your pattern complexity and usage
frequency. Measure before optimizing cache behavior.

## Source

[Python re.purge() documentation](https://docs.python.org/3/library/re.html#re.purge)

This tutorial covered Python's re.purge function and its
role in managing the regex cache. Use it wisely for memory management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).