+++
title = "Python time.timezone Function"
date = 2025-08-29T20:11:03.599+01:00
draft = false
description = "Complete guide to Python's time.timezone function covering timezone offset calculation, daylight saving time, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.timezone Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.timezone function,
which provides the local timezone offset from UTC. We'll cover timezone
calculations, daylight saving time, and practical examples.

## Basic Definitions

The time.timezone variable contains the offset in seconds west of
UTC for the local timezone (without DST). Positive values are west of UTC,
negative values are east.

Key characteristics: constant value (doesn't change with DST), negative for
timezones east of UTC, and used with other time functions for conversions.
It's initialized when the time module is first imported.

## Basic Timezone Offset

This example demonstrates how to get the basic timezone offset and convert
it to hours for better readability.

basic_timezone.py
  

import time

# Get timezone offset in seconds
offset_seconds = time.timezone
print(f"Timezone offset in seconds: {offset_seconds}")

# Convert to hours
offset_hours = offset_seconds / 3600
print(f"Timezone offset in hours: {offset_hours:.1f}")

# Determine direction
direction = "west" if offset_seconds &gt; 0 else "east"
print(f"Timezone is {abs(offset_hours):.1f} hours {direction} of UTC")

This example shows the raw offset value and converts it to hours. The
direction is calculated based on the sign of the offset.

Note that this doesn't account for daylight saving time. For DST-aware
calculations, use time.altzone instead.

## Comparing Timezone and Altzone

This example compares time.timezone (standard time) with
time.altzone (daylight saving time) to show the difference.

compare_zones.py
  

import time

print(f"Standard time offset: {time.timezone / 3600:.1f} hours")
print(f"Daylight time offset: {time.altzone / 3600:.1f} hours")

difference = (time.timezone - time.altzone) / 3600
print(f"Daylight saving difference: {difference:.1f} hours")

is_dst = time.daylight and time.localtime().tm_isdst &gt; 0
print(f"Is daylight saving time active? {is_dst}")

The example shows both standard and daylight saving time offsets. The
difference between them is typically 1 hour in most timezones.

The time.daylight flag indicates if DST is defined for the
timezone, while tm_isdst shows if it's currently active.

## Timezone-Aware Timestamp Conversion

This example demonstrates how to use time.timezone to convert
UTC timestamps to local time while accounting for the timezone offset.

timezone_conversion.py
  

import time

def utc_to_local(utc_timestamp):
    # Apply timezone offset (convert seconds to hours)
    local_timestamp = utc_timestamp - time.timezone
    return time.localtime(local_timestamp)

# Get current UTC time
utc_now = time.time()
print(f"UTC timestamp: {utc_now}")

# Convert to local time
local_time = utc_to_local(utc_now)
print(f"Local time: {time.strftime('%Y-%m-%d %H:%M:%S', local_time)}")

# Compare with built-in localtime()
builtin_local = time.localtime(utc_now)
print(f"Built-in localtime: {time.strftime('%Y-%m-%d %H:%M:%S', builtin_local)}")

This shows manual conversion from UTC to local time using the timezone
offset. The result matches Python's built-in localtime().

Note this doesn't handle daylight saving time automatically. For production
code, use localtime() directly or the datetime module.

## Timezone in HTTP Headers

This example shows how to use time.timezone to generate
timezone information for HTTP headers like Date.

http_timezone.py
  

import time

def format_http_date(timestamp=None):
    if timestamp is None:
        timestamp = time.time()
    
    # Convert to GMT time struct
    gmt_time = time.gmtime(timestamp)
    
    # Format according to HTTP spec
    return time.strftime("%a, %d %b %Y %H:%M:%S GMT", gmt_time)

def get_timezone_offset():
    offset = -time.timezone  # Invert sign for HTTP convention
    hours = offset // 3600
    minutes = (offset % 3600) // 60
    return f"{hours:+03d}{minutes:02d}"

print("HTTP Date header:", format_http_date())
print("Timezone offset for headers:", get_timezone_offset())

HTTP uses GMT/UTC for dates but sometimes needs timezone offsets. This
shows both proper HTTP date formatting and offset calculation.

The offset sign is inverted because HTTP uses positive for east of UTC,
opposite to Python's convention.

## Timezone-Aware File Timestamps

This example demonstrates using time.timezone to display
file modification times in the local timezone.

file_timestamps.py
  

import os
import time

def get_local_file_mtime(filename):
    # Get file modification time (UTC timestamp)
    mtime = os.path.getmtime(filename)
    
    # Adjust for timezone offset
    local_mtime = mtime - time.timezone
    
    # Convert to time struct
    return time.localtime(local_mtime)

filename = "example.txt"
with open(filename, "w") as f:
    f.write("Test content")

mtime = get_local_file_mtime(filename)
print(f"File modified at: {time.strftime('%Y-%m-%d %H:%M:%S', mtime)}")

# Compare with direct conversion
print(f"Built-in localtime: {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(os.path.getmtime(filename)))}")

File timestamps are typically stored in UTC. This shows how to convert
them to local time using the timezone offset.

The result matches Python's built-in conversion, demonstrating the
correctness of the manual calculation.

## Timezone in Database Operations

This example shows how to handle timezone offsets when working with
databases that store timestamps in UTC.

database_timezone.py
  

import time
import sqlite3

# Create in-memory database
conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE events (id INTEGER PRIMARY KEY, name TEXT, created REAL)")

# Insert current UTC time
utc_now = time.time()
conn.execute("INSERT INTO events (name, created) VALUES (?, ?)", 
             ("Test Event", utc_now))
conn.commit()

# Retrieve and convert to local time
for row in conn.execute("SELECT name, created FROM events"):
    name, utc_timestamp = row
    local_time = time.localtime(utc_timestamp - time.timezone)
    print(f"Event '{name}' created at {time.strftime('%Y-%m-%d %H:%M:%S', local_time)}")

conn.close()

Databases often store timestamps in UTC. This example demonstrates
converting them back to local time for display using the timezone offset.

The same principle applies to other databases like MySQL or PostgreSQL,
though their timestamp handling functions may differ.

## Best Practices

- **UTC storage:** Always store timestamps in UTC in databases

- **Local display:** Convert to local time only for display purposes

- **DST awareness:** Use time.localtime() for automatic DST handling

- **Negative values:** Remember negative means east of UTC

- **Modern alternatives:** Consider datetime with pytz for complex cases

## Source References

- [Python time.timezone Documentation](https://docs.python.org/3/library/time.html#time.timezone)

- [Python time.altzone Documentation](https://docs.python.org/3/library/time.html#time.altzone)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).