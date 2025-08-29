+++
title = "Python datetime"
date = 2025-08-29T20:07:55.687+01:00
draft = false
description = "Python datetime tutorial shows how to use the datetime module for working with dates and times in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python datetime

last modified February 15, 2025

In this article, we show how to use the datetime module in Python.
The datetime module provides classes for working with dates, times,
and time intervals. It is particularly useful for tasks like date arithmetic,
formatting dates, and parsing date strings.

The datetime module is part of Python's standard library, so no
additional installation is required.

## Basic Usage of datetime

The following example demonstrates how to use the datetime module
to work with dates and times.

main.py
    

from datetime import datetime

# Get the current date and time
now = datetime.now()
print("Current Date and Time:", now)

# Access individual components
print("Year:", now.year)
print("Month:", now.month)
print("Day:", now.day)
print("Hour:", now.hour)
print("Minute:", now.minute)
print("Second:", now.second)

In this program, the datetime.now function is used to get the
current date and time. The individual components (year, month, day, hour,
minute, second) are accessed using attributes of the datetime
object.

$ python main.py
Current Date and Time: 2025-02-15 12:34:56.789012
Year: 2025
Month: 2
Day: 15
Hour: 12
Minute: 34
Second: 56

## Formatting Dates and Times

The following example demonstrates how to format dates and times using the
strftime method.

main.py
    

from datetime import datetime

# Get the current date and time
now = datetime.now()

# Format the date and time
formatted_date = now.strftime("%Y-%m-%d")
formatted_time = now.strftime("%H:%M:%S")
formatted_datetime = now.strftime("%Y-%m-%d %H:%M:%S")

print("Formatted Date:", formatted_date)
print("Formatted Time:", formatted_time)
print("Formatted Date and Time:", formatted_datetime)

In this program, the strftime method is used to format the date and
time into different string representations.

$ python main.py
Formatted Date: 2025-02-15
Formatted Time: 12:34:56
Formatted Date and Time: 2025-02-15 12:34:56

## Parsing Dates and Times

The following example demonstrates how to parse date strings into
datetime objects using the strptime method.

main.py
    

from datetime import datetime

# Parse a date string
date_string = "2025-02-15 12:34:56"
parsed_date = datetime.strptime(date_string, "%Y-%m-%d %H:%M:%S")

print("Parsed Date:", parsed_date)

In this program, the strptime method is used to parse a date string
into a datetime object.

$ python main.py
Parsed Date: 2025-02-15 12:34:56

## Date Arithmetic

The following example demonstrates how to perform date arithmetic using the
timedelta class.

main.py
    

from datetime import datetime, timedelta

# Get the current date and time
now = datetime.now()

# Add 5 days to the current date
future_date = now + timedelta(days=5)

# Subtract 2 weeks from the current date
past_date = now - timedelta(weeks=2)

print("Current Date:", now)
print("Future Date (5 days later):", future_date)
print("Past Date (2 weeks earlier):", past_date)

In this program, the timedelta class is used to add or subtract
time intervals from a datetime object.

$ python main.py
Current Date: 2025-02-15 12:34:56.789012
Future Date (5 days later): 2025-02-20 12:34:56.789012
Past Date (2 weeks earlier): 2025-02-01 12:34:56.789012

## Working with Time Zones

The following example demonstrates how to work with time zones using the
pytz library.

main.py
    

from datetime import datetime
import pytz

# Get the current time in UTC
utc_now = datetime.now(pytz.utc)
print("Current Time in UTC:", utc_now)

# Convert UTC time to a specific time zone
eastern = pytz.timezone('US/Eastern')
eastern_time = utc_now.astimezone(eastern)
print("Current Time in US/Eastern:", eastern_time)

In this program, the pytz library is used to work with time zones.
The current time is retrieved in UTC and then converted to the US/Eastern time
zone.

$ python main.py
Current Time in UTC: 2025-02-15 12:34:56.789012+00:00
Current Time in US/Eastern: 2025-02-15 07:34:56.789012-05:00

## Source

[Python datetime - Documentation](https://docs.python.org/3/library/datetime.html)

In this article, we have shown how to use the datetime module in Python for working with dates, times, and time intervals. The datetime module is a powerful tool for date and time manipulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).