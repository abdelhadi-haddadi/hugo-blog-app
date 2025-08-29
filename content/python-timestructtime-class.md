+++
title = "Python time.struct_time Class"
date = 2025-08-29T20:11:02.443+01:00
draft = false
description = "Complete guide to Python's time.struct_time class covering creation, manipulation, and practical examples of time tuple handling."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.struct_time Class

Last modified April 11, 2025

This comprehensive guide explores Python's time.struct_time class,
which represents time as a named tuple with nine attributes. We'll cover creation,
manipulation, conversion, and practical examples of working with time tuples.

## Basic Definitions

The time.struct_time class is a time tuple that represents time
broken down into nine components. It's returned by functions like
localtime() and gmtime().

The nine attributes are: tm_year, tm_mon, tm_mday, tm_hour, tm_min, tm_sec,
tm_wday, tm_yday, and tm_isdst. This structure provides a human-readable
representation of time.

## Creating a struct_time Object

The simplest way to create a struct_time is by converting a
timestamp using localtime() or gmtime().
This example shows basic creation.

create_struct.py
  

import time

# Get current time as struct_time
current_time = time.localtime()
print("Current local time:", current_time)

# Get UTC time as struct_time
utc_time = time.gmtime()
print("Current UTC time:", utc_time)

# Access individual attributes
print(f"Year: {current_time.tm_year}")
print(f"Month: {current_time.tm_mon}")
print(f"Day: {current_time.tm_mday}")

This example demonstrates creating struct_time objects from the
current time. The localtime() function returns local time,
while gmtime() returns UTC time.

Individual attributes can be accessed using dot notation (e.g., tm_year).
The output shows the full structure of the time tuple.

## Converting struct_time to String

struct_time objects can be formatted into human-readable strings
using strftime(). This example shows various formatting options.

format_time.py
  

import time

now = time.localtime()

# Basic formatting
print(time.strftime("%Y-%m-%d %H:%M:%S", now))

# More complex formats
print(time.strftime("%A, %B %d, %Y", now))
print(time.strftime("Today is day %j of the year", now))
print(time.strftime("Local time: %I:%M %p", now))

# Using different locales (if available)
try:
    import locale
    locale.setlocale(locale.LC_TIME, 'fr_FR')
    print(time.strftime("%A %d %B %Y", now))
except:
    print("French locale not available")

The strftime() function offers extensive formatting options.
Format codes like %Y for year and %m for month create custom date strings.

Locale settings can affect month and day names. The example shows attempting
to use French locale for date formatting.

## Converting struct_time to Timestamp

struct_time objects can be converted back to timestamps using
mktime(). This example demonstrates the conversion process.

convert_to_timestamp.py
  

import time

# Create a struct_time for a specific date
birthday = time.strptime("1990-05-15", "%Y-%m-%d")

# Convert to timestamp
timestamp = time.mktime(birthday)
print(f"Birthday timestamp: {timestamp}")

# Convert back to verify
converted_back = time.localtime(timestamp)
print("Converted back:", converted_back)

# Compare original and converted
print("Original:", birthday.tm_year, birthday.tm_mon, birthday.tm_mday)
print("Converted:", converted_back.tm_year, converted_back.tm_mon, converted_back.tm_mday)

mktime() converts local time to seconds since epoch. The example
shows round-trip conversion from string to struct_time to timestamp and back.

Note that mktime() uses local time, while gmtime()
would use UTC. Daylight saving time may affect the conversion.

## Creating Custom struct_time Objects

While usually created by time functions, you can create custom
struct_time objects. This example shows manual creation.

custom_struct.py
  

import time

# Create a custom struct_time (9-element sequence)
custom_time = time.struct_time((2025, 12, 31, 23, 59, 59, 2, 365, 0))

print("Custom time tuple:", custom_time)
print(f"New Year's Eve {custom_time.tm_year}:")
print(time.strftime("%A, %B %d at %I:%M %p", custom_time))

# Note: Some values are calculated automatically
print("Day of week (0-6, 0 is Monday):", custom_time.tm_wday)
print("Day of year (1-366):", custom_time.tm_yday)

The struct_time constructor takes a 9-element sequence.
The example creates a time tuple for December 31, 2025 at 11:59:59 PM.

Some values like tm_wday (weekday) and tm_yday (year day) are calculated
automatically based on the date components provided.

## Comparing struct_time Objects

struct_time objects can be compared to determine chronological
order. This example demonstrates comparison operations.

compare_time.py
  

import time

def create_time(date_str):
    return time.strptime(date_str, "%Y-%m-%d")

# Create several time objects
time1 = create_time("2025-01-15")
time2 = create_time("2025-03-20")
time3 = create_time("2025-01-15")

# Comparisons
print("time1 == time3:", time1 == time3)
print("time1 &lt; time2:", time1 &lt; time2)
print("time2 &gt; time3:", time2 &gt; time3)

# Sorting a list of times
times = [
    create_time("2025-12-01"),
    create_time("2025-04-15"),
    create_time("2025-08-20")
]
sorted_times = sorted(times)
print("\nSorted times:")
for t in sorted_times:
    print(time.strftime("%Y-%m-%d", t))

struct_time objects support comparison operators (&lt;, &gt;, ==, etc.).
This allows sorting and chronological comparison of dates and times.

The example shows creating multiple time objects from strings, comparing them,
and sorting a list of dates. The comparison is done field by field.

## Working with Time Zones

struct_time objects can represent both local and UTC times.
This example shows working with different time zones.

timezones.py
  

import time

# Get current time in different representations
local_now = time.localtime()
utc_now = time.gmtime()
timestamp = time.time()

print("Local time:", time.strftime("%Y-%m-%d %H:%M:%S", local_now))
print("UTC time:", time.strftime("%Y-%m-%d %H:%M:%S", utc_now))

# Calculate time difference
local_hour = local_now.tm_hour
utc_hour = utc_now.tm_hour
time_diff = (local_hour - utc_hour) % 24
print(f"Local time is UTC+{time_diff} hours")

# Convert between local and UTC
def local_to_utc(t):
    timestamp = time.mktime(t)
    return time.gmtime(timestamp)

def utc_to_local(t):
    timestamp = time.mktime(t) - time.timezone
    return time.localtime(timestamp)

converted_utc = local_to_utc(local_now)
print("\nLocal converted to UTC:", time.strftime("%Y-%m-%d %H:%M:%S", converted_utc))

converted_local = utc_to_local(utc_now)
print("UTC converted to local:", time.strftime("%Y-%m-%d %H:%M:%S", converted_local))

This example demonstrates the difference between local time and UTC time.
It includes functions to convert between the two representations.

The time difference calculation shows the local UTC offset in hours.
Daylight saving time may affect these conversions.

## Best Practices

- **Immutability:** struct_time objects are immutable - create new ones for modifications

- **Time zones:** Be explicit about whether you're working with local time or UTC

- **Validation:** Validate values when creating custom struct_time objects

- **Conversion:** Use mktime() for local time, calendar.timegm() for UTC conversions

- **Formatting:** Prefer strftime() for consistent string representations

## Source References

- [Python struct_time Documentation](https://docs.python.org/3/library/time.html#time.struct_time)

- [Python strftime Documentation](https://docs.python.org/3/library/time.html#time.strftime)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).