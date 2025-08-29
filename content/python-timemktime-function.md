+++
title = "Python time.mktime Function"
date = 2025-08-29T20:10:57.957+01:00
draft = false
description = "Complete guide to Python's time.mktime function covering time tuple conversion, timestamp generation, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.mktime Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.mktime function,
which converts a time tuple in local time to seconds since the epoch.

## Basic Definitions

The time.mktime function converts a struct_time or
9-element tuple representing local time to seconds since the epoch.

Key characteristics: accepts local time (not UTC), handles DST, returns float,
and is the inverse of time.localtime. It raises OverflowError
for dates outside its range.

## Basic Time Tuple Conversion

This example shows basic usage of time.mktime to convert a
local time tuple to a timestamp.

basic_mktime.py
  

import time

# Create a time tuple for 2025-04-11 14:30:00
time_tuple = (2025, 4, 11, 14, 30, 0, 0, 0, 0)

# Convert to timestamp
timestamp = time.mktime(time_tuple)
print(f"Timestamp: {timestamp}")

# Convert back to verify
local_time = time.localtime(timestamp)
print(f"Local time: {time.strftime('%Y-%m-%d %H:%M:%S', local_time)}")

This demonstrates converting a time tuple to timestamp and back. The tuple
must have 9 elements, with the last three being weekday, Julian day, and DST.

The DST flag (-1, 0, 1) affects conversion. When set to -1, mktime guesses
whether DST was in effect.

## Current Time to Timestamp

This example shows how to get the current local time as a timestamp using
time.mktime with time.localtime.

current_time.py
  

import time

# Get current local time as struct_time
local_time = time.localtime()

# Convert to timestamp
timestamp = time.mktime(local_time)

print(f"Current timestamp: {timestamp}")
print(f"Formatted local time: {time.strftime('%c', local_time)}")

This is useful when you need the current time as a timestamp but want to
work with the time components first. The conversion preserves DST info.

Note this is different from time.time() which returns UTC
timestamp directly.

## DST Handling with mktime

This example demonstrates how time.mktime handles Daylight
Saving Time transitions.

dst_example.py
  

import time

# Create time tuple for DST transition (example for US/Eastern)
# March 10, 2024 2:30 AM (non-existent during DST transition)
try:
    time_tuple = (2024, 3, 10, 2, 30, 0, 0, 0, -1)  # -1 = let mktime decide
    timestamp = time.mktime(time_tuple)
    print(f"Converted timestamp: {timestamp}")
    print(f"Interpreted as: {time.strftime('%c', time.localtime(timestamp))}")
except Exception as e:
    print(f"Error: {e}")

# November 3, 2024 1:30 AM (ambiguous during DST end)
time_tuple = (2024, 11, 3, 1, 30, 0, 0, 0, -1)
timestamp = time.mktime(time_tuple)
print(f"Converted timestamp: {timestamp}")
print(f"Interpreted as: {time.strftime('%c', time.localtime(timestamp))}")

time.mktime adjusts for invalid times during DST transitions.
It may shift times forward or backward to maintain consistency.

The DST flag in the time tuple affects how ambiguous times are resolved.

## Creating Specific Dates

This example shows how to create timestamps for specific dates like
birthdays or holidays using time.mktime.

specific_dates.py
  

import time

def create_timestamp(year, month, day, hour=0, minute=0, second=0):
    time_tuple = (year, month, day, hour, minute, second, 0, 0, -1)
    return time.mktime(time_tuple)

# Create timestamps for various events
new_year = create_timestamp(2025, 1, 1)
birthday = create_timestamp(2025, 4, 11, 14, 30)
christmas = create_timestamp(2025, 12, 25)

print(f"New Year 2025: {new_year} ({time.ctime(new_year)})")
print(f"Birthday: {birthday} ({time.ctime(birthday)})")
print(f"Christmas 2025: {christmas} ({time.ctime(christmas)})")

This pattern is useful for creating timestamps from known dates. The helper
function simplifies timestamp creation with sensible defaults.

The generated timestamps can be used for date comparisons or scheduling.

## Date Arithmetic with mktime

This example demonstrates date arithmetic by adding days to a date using
time.mktime.

date_arithmetic.py
  

import time

def add_days(timestamp, days):
    time_tuple = time.localtime(timestamp)
    # Create new time tuple with adjusted day
    new_tuple = (time_tuple.tm_year, time_tuple.tm_mon, 
                time_tuple.tm_mday + days, time_tuple.tm_hour,
                time_tuple.tm_min, time_tuple.tm_sec,
                time_tuple.tm_wday, time_tuple.tm_yday,
                time_tuple.tm_isdst)
    return time.mktime(new_tuple)

current = time.time()
one_week_later = add_days(current, 7)

print(f"Current: {time.ctime(current)}")
print(f"One week later: {time.ctime(one_week_later)}")

This shows how to perform date math by converting to time tuple, modifying,
and converting back. mktime handles month/year rollovers.

For more complex date operations, consider the datetime module.

## Validating Time Tuples

This example demonstrates how time.mktime can validate time
tuples by checking for invalid dates.

validation.py
  

import time

def is_valid_date(year, month, day):
    try:
        time_tuple = (year, month, day, 0, 0, 0, 0, 0, -1)
        time.mktime(time_tuple)
        return True
    except (OverflowError, ValueError):
        return False

# Test some dates
print(f"2025-02-29 valid? {is_valid_date(2025, 2, 29)}")  # False (not leap)
print(f"2024-02-29 valid? {is_valid_date(2024, 2, 29)}")  # True (leap)
print(f"2025-04-31 valid? {is_valid_date(2025, 4, 31)}")  # False
print(f"2025-05-15 valid? {is_valid_date(2025, 5, 15)}")  # True

time.mktime raises exceptions for invalid dates, making it
useful for validation. This checks for impossible dates like February 29th
in non-leap years.

The function returns False for dates outside the supported range (platform-
dependent, typically 1970-2038).

## Best Practices

- **Time zones:** Remember mktime works with local time, not UTC

- **DST handling:** Set tm_isdst to -1 to let mktime determine DST

- **Input validation:** Validate time tuples before conversion

- **Range limitations:** Be aware of platform timestamp limits

- **Precision:** Results are floats but typically whole seconds

## Source References

- [Python time.mktime Documentation](https://docs.python.org/3/library/time.html#time.mktime)

- [Python struct_time Documentation](https://docs.python.org/3/library/time.html#time.struct_time)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).