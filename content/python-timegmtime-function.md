+++
title = "Python time.gmtime Function"
date = 2025-08-29T20:10:56.825+01:00
draft = false
description = "Complete guide to Python's time.gmtime function covering UTC time conversion, time struct manipulation, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.gmtime Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.gmtime function,
which converts seconds since epoch to a UTC time struct. We'll cover UTC time
conversion, struct manipulation, and practical examples.

## Basic Definitions

The time.gmtime function converts seconds since the epoch to a
UTC time struct (struct_time). It represents time in Coordinated Universal Time.

Key characteristics: returns a named tuple with 9 time components, ignores
timezone settings, and is useful for consistent UTC time representation.
The input is seconds since epoch (January 1, 1970).

## Basic UTC Time Conversion

The simplest use of time.gmtime converts current time to UTC.
This example shows basic usage and struct_time components.

basic_gmtime.py
  

import time

# Get current timestamp
timestamp = time.time()

# Convert to UTC time struct
utc_time = time.gmtime(timestamp)

print("UTC time struct:", utc_time)
print("Year:", utc_time.tm_year)
print("Month:", utc_time.tm_mon)
print("Day:", utc_time.tm_mday)
print("Hour:", utc_time.tm_hour)
print("Minute:", utc_time.tm_min)
print("Second:", utc_time.tm_sec)

This example demonstrates converting current time to UTC. The struct_time
contains year, month, day, hour, minute, second, and other components.

The tm_isdst flag is always 0 for UTC time since daylight
saving time doesn't apply to Coordinated Universal Time.

## Converting Specific Timestamps

time.gmtime can convert any valid epoch timestamp to UTC.
This example shows conversion of specific historical timestamps.

specific_timestamps.py
  

import time

# Unix epoch (January 1, 1970)
epoch = time.gmtime(0)
print("Unix epoch:", time.strftime("%Y-%m-%d %H:%M:%S", epoch))

# First human on the moon (July 20, 1969 20:17 UTC)
moon_landing = time.gmtime(-14159000)
print("Moon landing:", time.strftime("%Y-%m-%d %H:%M:%S", moon_landing))

# Python 1.0 release (January 1994)
python_release = time.gmtime(757382400)
print("Python 1.0:", time.strftime("%Y-%m-%d", python_release))

This example converts specific historical moments to UTC time structs.
Negative values represent timestamps before the Unix epoch.

The strftime function formats the time struct into readable
strings according to the specified format codes.

## Comparing gmtime and localtime

While gmtime returns UTC, localtime returns
local time. This example compares both functions.

compare_localtime.py
  

import time

timestamp = time.time()

utc_time = time.gmtime(timestamp)
local_time = time.localtime(timestamp)

print("UTC time:", time.strftime("%Y-%m-%d %H:%M:%S", utc_time))
print("Local time:", time.strftime("%Y-%m-%d %H:%M:%S", local_time))
print("Timezone offset:", (local_time.tm_hour - utc_time.tm_hour), "hours")

The difference between UTC and local time depends on your timezone.
The example calculates the timezone offset in hours.

For consistent results across systems, UTC (gmtime) is preferred over
local time which varies by timezone settings.

## Working with Time Struct Components

The time struct returned by gmtime has accessible attributes.
This example demonstrates working with individual components.

struct_components.py
  

import time

utc_time = time.gmtime()

# Accessing struct components
print("Current UTC time components:")
print(f"Year: {utc_time.tm_year}")
print(f"Month: {utc_time.tm_mon} ({time.strftime('%B', utc_time)})")
print(f"Day of month: {utc_time.tm_mday}")
print(f"Day of week: {utc_time.tm_wday} ({time.strftime('%A', utc_time)})")
print(f"Day of year: {utc_time.tm_yday}")
print(f"Hour: {utc_time.tm_hour}")
print(f"Minute: {utc_time.tm_min}")
print(f"Second: {utc_time.tm_sec}")
print(f"DST flag: {utc_time.tm_isdst} (always 0 for UTC)")

The struct_time is a named tuple with readable attributes. Weekdays are
0-6 (Monday-Sunday), months are 1-12, and DST flag is always 0 for UTC.

The strftime function can convert numeric components to
readable names (like month names).

## Creating Custom UTC Times

You can create custom UTC times by converting specific timestamps.
This example shows creating times for specific dates.

custom_times.py
  

import time

def create_utc_time(year, month, day, hour=0, minute=0, second=0):
    """Create a UTC time struct for specific date/time"""
    time_str = f"{year}-{month:02d}-{day:02d} {hour:02d}:{minute:02d}:{second:02d}"
    time_tuple = (year, month, day, hour, minute, second, 0, 0, 0)
    timestamp = time.mktime(time_tuple) - time.timezone
    return time.gmtime(timestamp)

# Create specific UTC times
new_year = create_utc_time(2025, 1, 1, 0, 0, 0)
print("New Year 2025:", time.strftime("%Y-%m-%d %H:%M:%S", new_year))

eclipse = create_utc_time(2024, 4, 8, 18, 18, 0)
print("Solar eclipse 2024:", time.strftime("%Y-%m-%d %H:%M:%S", eclipse))

This example creates UTC time structs for specific dates and times.
The function accounts for timezone offset when creating the timestamp.

Note this approach works for dates after 1970. For historical dates,
consider using the datetime module instead.

## Converting Between Time Formats

time.gmtime helps convert between different time formats.
This example shows conversions between timestamp, struct, and string.

time_conversions.py
  

import time

# Current timestamp
timestamp = time.time()

# Convert to UTC struct
utc_struct = time.gmtime(timestamp)

# Convert struct to formatted string
time_str = time.strftime("%Y-%m-%d %H:%M:%S", utc_struct)

# Convert string back to struct
parsed_struct = time.strptime(time_str, "%Y-%m-%d %H:%M:%S")

# Convert struct back to timestamp
new_timestamp = time.mktime(parsed_struct) - time.timezone

print("Original timestamp:", timestamp)
print("Formatted string:", time_str)
print("Reconstructed timestamp:", new_timestamp)
print("Difference:", abs(timestamp - new_timestamp), "seconds")

This demonstrates a complete conversion cycle between different time
representations. The small difference comes from floating-point precision.

The strptime function parses strings into time structs,
while strftime formats structs into strings.

## Time Zone Conversion with gmtime

time.gmtime can help with timezone conversions when combined
with offsets. This example converts UTC to different timezones.

timezone_conversion.py
  

import time

def utc_to_timezone(utc_struct, offset_hours):
    """Convert UTC struct_time to another timezone"""
    timestamp = time.mktime(utc_struct) - time.timezone
    adjusted_timestamp = timestamp + (offset_hours * 3600)
    return time.gmtime(adjusted_timestamp)

current_utc = time.gmtime()

# Convert to different timezones
print("UTC:", time.strftime("%Y-%m-%d %H:%M", current_utc))
print("New York (EST):", time.strftime("%Y-%m-%d %H:%M", 
      utc_to_timezone(current_utc, -5)))
print("Tokyo (JST):", time.strftime("%Y-%m-%d %H:%M", 
      utc_to_timezone(current_utc, 9)))
print("London (GMT):", time.strftime("%Y-%m-%d %H:%M", 
      utc_to_timezone(current_utc, 0)))

This example converts UTC time to different timezones by applying hour
offsets. Note this doesn't account for daylight saving time changes.

For production code, consider using the pytz or
zoneinfo modules for more robust timezone handling.

## Best Practices

- **UTC preference:** Use gmtime for consistent UTC time across systems

- **Time structs:** Access components by name (tm_year, tm_mon etc.)

- **Formatting:** Use strftime for readable string output

- **Timezones:** Convert to local time only when displaying to users

- **Precision:** Remember gmtime discards sub-second precision

## Source References

- [Python time.gmtime Documentation](https://docs.python.org/3/library/time.html#time.gmtime)

- [Python struct_time Documentation](https://docs.python.org/3/library/time.html#time.struct_time)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).