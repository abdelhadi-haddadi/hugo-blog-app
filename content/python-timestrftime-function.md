+++
title = "Python time.strftime Function"
date = 2025-08-29T20:11:01.314+01:00
draft = false
description = "Complete guide to Python's time.strftime function covering time formatting, format codes, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.strftime Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.strftime function,
which formats time tuples into readable strings. We'll cover format codes,
common patterns, and practical formatting examples.

## Basic Definitions

The time.strftime function converts a time tuple or struct_time
to a string according to format specifications. It's the inverse of
strptime.

Key characteristics: locale-aware formatting, supports numerous format codes,
and works with time.struct_time objects. The function returns a string
based on the format specification.

## Basic Time Formatting

This example demonstrates basic usage of strftime to format
the current time into different string representations.

basic_formatting.py
  

import time

# Get current time as struct_time
current_time = time.localtime()

# Format using strftime
print(time.strftime("%Y-%m-%d", current_time))  # 2025-04-11
print(time.strftime("%A, %B %d %Y", current_time))  # Friday, April 11 2025
print(time.strftime("%I:%M:%S %p", current_time))  # 02:30:45 PM
print(time.strftime("%H:%M:%S", current_time))  # 14:30:45

This shows common format codes: %Y for year, %m for month, %d for day,
%H for 24-hour, %I for 12-hour, %M for minutes, %S for seconds.

The function uses the current locale settings for month/day names and
AM/PM indicators unless overridden.

## Custom Date Formats

strftime allows creating custom date formats by combining
format codes. This example shows various date formatting options.

custom_formats.py
  

import time

now = time.localtime()

# Different date formats
print(time.strftime("%d/%m/%Y", now))  # 11/04/2025 (European style)
print(time.strftime("%m-%d-%y", now))  # 04-11-25 (US short style)
print(time.strftime("%Y%m%d", now))  # 20250411 (ISO compact)
print(time.strftime("%A %d %B, %Y", now))  # Friday 11 April, 2025
print(time.strftime("%Y-%j", now))  # 2025-101 (year and day of year)

The %j format code shows day of year (1-366). %A and %B give full weekday
and month names respectively.

Different regions prefer different date formats - strftime makes it easy
to adapt to local conventions.

## Time Formatting Options

This example focuses specifically on time formatting with various
precision and representation options.

time_formats.py
  

import time

now = time.localtime()

# Time formatting examples
print(time.strftime("%H:%M", now))  # 14:30 (24-hour with minutes)
print(time.strftime("%I:%M:%S %p", now))  # 02:30:45 PM (12-hour with AM/PM)
print(time.strftime("%H:%M:%S.%f", now))  # 14:30:45.123456 (with microseconds)
print(time.strftime("%X", now))  # 14:30:45 (locale's time representation)

Note that %f for microseconds may not work on all platforms as struct_time
doesn't store microseconds. The %X code uses locale-specific time format.

For precise time measurements, consider datetime which natively supports
microseconds.

## Locale-Aware Formatting

strftime respects locale settings for month/day names and
other locale-specific representations. This example demonstrates this.

locale_formatting.py
  

import time
import locale

now = time.localtime()

# Default locale
print(time.strftime("%A, %B %d", now))  # Friday, April 11

# Change to German locale
locale.setlocale(locale.LC_TIME, 'de_DE')
print(time.strftime("%A, %B %d", now))  # Freitag, April 11

# Change to French locale
locale.setlocale(locale.LC_TIME, 'fr_FR')
print(time.strftime("%A, %B %d", now))  # vendredi, avril 11

Locale settings affect weekday names (%A), month names (%B), AM/PM (%p),
and other textual representations.

Remember to handle potential locale availability issues in production code.

## Combining Date and Time

This example shows how to create comprehensive datetime strings by
combining date and time format codes.

datetime_formatting.py
  

import time

now = time.localtime()

# Common combined formats
print(time.strftime("%c", now))  # Fri Apr 11 14:30:45 2025 (locale's default)
print(time.strftime("%Y-%m-%d %H:%M:%S", now))  # 2025-04-11 14:30:45
print(time.strftime("%a %b %d %H:%M:%S %Y", now))  # Fri Apr 11 14:30:45 2025
print(time.strftime("%A, %B %d %Y at %I:%M %p", now))  # Friday, April 11 2025 at 02:30 PM

The %c format code provides the locale's appropriate date and time
representation. Other combinations offer precise control over output.

For ISO 8601 format, consider using datetime.isoformat() instead.

## Special Format Codes

strftime includes several special format codes for less common
but useful representations. This example demonstrates them.

special_codes.py
  

import time

now = time.localtime()

# Special format codes
print(time.strftime("%U", now))  # 15 (week number, Sunday first)
print(time.strftime("%W", now))  # 15 (week number, Monday first)
print(time.strftime("%w", now))  # 5 (weekday as decimal, 0=Sunday)
print(time.strftime("%j", now))  # 101 (day of year)
print(time.strftime("%Z", now))  # EDT (timezone name)
print(time.strftime("%z", now))  # -0400 (UTC offset)

Week number calculations (%U, %W) vary by locale. Timezone information
(%Z, %z) depends on platform support.

These codes are useful for specialized date calculations and timezone-aware
applications.

## Formatting UTC Time

This example shows how to format UTC time rather than local time using
time.gmtime instead of time.localtime.

utc_formatting.py
  

import time

# Get UTC time
utc_time = time.gmtime()

# Format UTC time
print(time.strftime("%Y-%m-%d %H:%M:%S UTC", utc_time))  # 2025-04-11 18:30:45 UTC
print(time.strftime("%H:%M Z", utc_time))  # 18:30 Z (Zulu time)
print(time.strftime("%a, %d %b %Y %H:%M:%S GMT", utc_time))  # Fri, 11 Apr 2025 18:30:45 GMT

UTC formatting is essential for systems that need timezone-independent
timestamps or for network protocols.

The 'Z' suffix indicates Zulu time (UTC+0), common in aviation and military.

## Best Practices

- **Locale awareness:** Be mindful of locale settings for production code

- **Error handling:** Catch potential ValueError for invalid struct_time

- **Readability:** Use descriptive format strings for maintainability

- **Performance:** Reuse format strings for repeated formatting

- **Timezones:** Clearly indicate timezone in formatted output

## Source References

- [Python time.strftime Documentation](https://docs.python.org/3/library/time.html#time.strftime)

- [Python strptime Documentation](https://docs.python.org/3/library/time.html#time.strptime)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).