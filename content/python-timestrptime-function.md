+++
title = "Python time.strptime Function"
date = 2025-08-29T20:11:01.288+01:00
draft = false
description = "Complete guide to Python's time.strptime function covering string parsing, time conversion, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time.strptime Function

Last modified April 11, 2025

This comprehensive guide explores Python's time.strptime function,
which parses strings representing time according to format specifications.

## Basic Definitions

The time.strptime function converts a string representing time
to a time tuple (struct_time) according to a format specification.

Key characteristics: returns a time.struct_time object, raises ValueError
for invalid formats, and uses format codes similar to strftime.

## Basic String to Time Conversion

This example demonstrates the simplest use of strptime to parse a date string.
The format string must match the input string exactly.

basic_strptime.py
  

import time

date_string = "2025-04-11"
format_string = "%Y-%m-%d"

parsed_time = time.strptime(date_string, format_string)
print(parsed_time)
print(f"Year: {parsed_time.tm_year}")
print(f"Month: {parsed_time.tm_mon}")
print(f"Day: {parsed_time.tm_mday}")

The format string "%Y-%m-%d" matches the "YYYY-MM-DD" format of the input.
The function returns a struct_time object with parsed components.

Each component can be accessed via attributes like tm_year, tm_mon, etc.
The struct_time can be converted to other formats or used in calculations.

## Parsing Time with Hours and Minutes

This example shows how to parse a string containing both date and time
components using strptime.

time_parsing.py
  

import time

datetime_string = "2025-04-11 14:30:00"
format_string = "%Y-%m-%d %H:%M:%S"

parsed_time = time.strptime(datetime_string, format_string)
print(parsed_time)
print(f"Hour: {parsed_time.tm_hour}")
print(f"Minute: {parsed_time.tm_min}")
print(f"Second: {parsed_time.tm_sec}")

The format string includes time components with %H for 24-hour format hours,
%M for minutes, and %S for seconds.

Note that strptime is strict about format matching - extra spaces or different
delimiters will cause ValueError.

## Handling Different Date Formats

This example demonstrates parsing dates in different formats by adjusting
the format string accordingly.

different_formats.py
  

import time

# US format: Month/Day/Year
us_date = "04/11/2025"
us_format = "%m/%d/%Y"

# European format: Day.Month.Year
eu_date = "11.04.2025"
eu_format = "%d.%m.%Y"

# Parsing both formats
us_parsed = time.strptime(us_date, us_format)
eu_parsed = time.strptime(eu_date, eu_format)

print("US format parsed:", us_parsed)
print("EU format parsed:", eu_parsed)

The same date is parsed from different regional formats by changing the
format string to match the input structure.

This flexibility makes strptime useful for processing dates from various
sources with different formatting conventions.

## Parsing Weekday and Month Names

This example shows how to parse dates containing weekday or month names
using the appropriate format codes.

named_components.py
  

import time

date_with_names = "Friday, April 11, 2025"
format_string = "%A, %B %d, %Y"

parsed_time = time.strptime(date_with_names, format_string)
print(parsed_time)
print(f"Weekday (0-6): {parsed_time.tm_wday}")
print(f"Month (1-12): {parsed_time.tm_mon}")

%A matches full weekday names (Monday, Tuesday, etc.), while %B matches
full month names (January, February, etc.).

The parsed struct_time contains numeric values for these components in
tm_wday (0=Monday) and tm_mon (1=January) attributes.

## Handling 12-Hour Time Format

This example demonstrates parsing time in 12-hour format with AM/PM
designation using the %I and %p format codes.

ampm_time.py
  

import time

time_string = "02:30 PM"
format_string = "%I:%M %p"

parsed_time = time.strptime(time_string, format_string)
print(parsed_time)
print(f"24-hour hour: {parsed_time.tm_hour}")  # Will be 14

%I represents hours in 12-hour format (01-12), while %p matches AM/PM.
The parsed time converts to 24-hour format in the struct_time.

Note that the input must include the AM/PM designation when using %p,
otherwise it will raise ValueError.

## Parsing Timezone Information

This example shows how to parse strings containing timezone information
using the %Z format code.

timezone_parsing.py
  

import time

datetime_string = "2025-04-11 14:30:00 EST"
format_string = "%Y-%m-%d %H:%M:%S %Z"

parsed_time = time.strptime(datetime_string, format_string)
print(parsed_time)
print(f"Timezone: {parsed_time.tm_zone}")

%Z matches timezone names like EST, UTC, GMT, etc. The parsed time
includes this in the tm_zone attribute of the struct_time.

Note that strptime doesn't perform timezone conversion - it only stores
the timezone name in the struct_time.

## Error Handling with strptime

This example demonstrates proper error handling when parsing potentially
invalid date strings.

error_handling.py
  

import time

def safe_strptime(date_string, format_string):
    try:
        return time.strptime(date_string, format_string)
    except ValueError as e:
        print(f"Error parsing '{date_string}': {e}")
        return None

# Valid date
result = safe_strptime("2025-04-11", "%Y-%m-%d")
print("Valid date result:", result)

# Invalid date
result = safe_strptime("2025-02-30", "%Y-%m-%d")  # Feb 30 doesn't exist
print("Invalid date result:", result)

# Wrong format
result = safe_strptime("11/04/2025", "%Y-%m-%d")
print("Wrong format result:", result)

The function catches ValueError exceptions that occur when the input string
doesn't match the format or contains invalid date components.

This is important for robust date parsing, especially when processing
user input or data from external sources.

## Best Practices

- **Format matching:** Ensure format string exactly matches input structure

- **Error handling:** Always handle ValueError for invalid inputs

- **Locale awareness:** Month/weekday names depend on locale settings

- **Timezones:** Consider using datetime for better timezone support

- **Validation:** Validate parsed dates (e.g., check for Feb 30)

## Source References

- [Python time.strptime Documentation](https://docs.python.org/3/library/time.html#time.strptime)

- [Python strftime Format Codes](https://docs.python.org/3/library/time.html#time.strftime)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).