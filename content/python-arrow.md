+++
title = "Python arrow"
date = 2025-08-29T20:07:38.744+01:00
draft = false
description = "Python arrow tutorial shows how to work with date and time in Python with arrow module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python arrow

last modified January 29, 2024

In this article we show how to work with date and time in Python with arrow
module.

## Python arrow

Arrow is a Python module for working with date and time. Comparing to the
built-in date and time tools, it makes  much easier to create, manipulate,
format and convert dates, times, and timestamps.

## Installing arrow

The arrow module is installed with the following command:

$ sudo pip3 install arrow

We use the pip3 command to install arrow module.

## UTC time

There is a pragmatic need for one global time. One global time helps to avoid
confusion about time zones and daylight saving time. The UTC (Universal
Coordinated time) is the primary time standard. UTC is used in aviation, weather
forecasts, flight plans, air traffic control clearances, and maps. Unlike local
time, UTC does not change with a change of seasons. 

utc_time.py
  

#!/usr/bin/python

import arrow

utc = arrow.utcnow()
print(utc)
print(utc.to('local'))

The UTC time is created with the utcnow function.

print(utc.to('local'))

With the to method, we convert the UTC time to local time.

## Local time

Local time is a time in a particular region or time zone.

local_time.py
  

#!/usr/bin/python

import arrow

now = arrow.now()
print(now)
print(now.to('UTC'))

The local time is created with the now function. The
to method is used to convert the local time into the UTC time.

## Parsing time

The get method is used to parse time.

parse_time.py
  

#!/usr/bin/python

import arrow

d1 = arrow.get('2012-06-05 16:20:03', 'YYYY-MM-DD HH:mm:ss')
print(d1)

d2 = arrow.get(1504384602)
print(d2)

The example parses time from a date and time string and a timestamp.

$ ./parse_time.py 
2012-06-05T16:20:03+00:00
2017-09-02T20:36:42+00:00

## Unix time

The Unix time is the number of seconds since the Unix epoch. The
timestamp attribute returns the value of time in seconds since 0
hours, 0 minutes, 0 seconds, January 1, 1970, Coordinated Universal Time.

unix_time.py
  

#!/usr/bin/python

import arrow

utc = arrow.utcnow()
print(utc)

unix_time = utc.timestamp
print(unix_time)

date = arrow.Arrow.fromtimestamp(unix_time)
print(date)

The example prints the local time and the Unix time. Then it converts the Unix
time back to the date object.

date = arrow.Arrow.fromtimestamp(unix_time)

With the fromtimestamp method, we convert the Unix time back to the
arrow date object.

2017-09-02T21:57:11.483795+02:00
1504382231
2017-09-02T21:57:11+02:00

It is also possible to format a date to a Unix time.

format2unix.py
  

#!/usr/bin/python

import arrow

utc = arrow.utcnow()
    
print(utc.format('X'))

By passing the 'X' specifier to the format method,
we print the current local date as the Unix time.

$ ./format2unix.py 
1504383196

## Formatting date and time

Date and time can be formatted with the format method.

formatting.py
  

#!/usr/bin/python

import arrow

now = arrow.now()

year = now.format('YYYY')
print("Year: {0}".format(year))

date = now.format('YYYY-MM-DD')
print("Date: {0}".format(date))

date_time = now.format('YYYY-MM-DD HH:mm:ss')
print("Date and time: {0}".format(date_time))

date_time_zone = now.format('YYYY-MM-DD HH:mm:ss ZZ')
print("Date and time and zone: {0}".format(date_time_zone))

The example shows local date and time in various formats utilizing
format method.

$ ./formatting.py 
Year: 2017
Date: 2017-09-02
Date and time: 2017-09-02 22:00:32
Date and time and zone: 2017-09-02 22:00:32 +02:00

## Converting to regional time

With the to method, we can convert 
the date and time to a regional time. 

converting.py
  

#!/usr/bin/python

import arrow

utc = arrow.utcnow()

print(utc.to('US/Pacific').format('HH:mm:ss'))
print(utc.to('Europe/Bratislava').format('HH:mm:ss'))
print(utc.to('Europe/Moscow').format('HH:mm:ss'))

The example creates a UTC time and converts it to three
regional times.

$ ./converting.py 
13:24:06
22:24:06
23:24:06

This is the ouput.

## Getting weekday

The weekday of a date can be found with the weekday
or the format method.

weekday.py
  

#!/usr/bin/python

import arrow

d1 = arrow.get('1948-12-13')

print(d1.weekday())
print(d1.format('dddd'))

The code example gets the weekday of '1948-12-13'.

$ ./weekday.py 
0
Monday

On 12th of December 1948, it was Monday.

## Shifting time

The shift method is used to shift time.

shifting.py
  

#!/usr/bin/python

import arrow

now = arrow.now()

print(now.shift(hours=5).time())
print(now.shift(days=5).date())

print(now.shift(years=-8).date())

The example computes the current local time and shifts it 
three times. 

print(now.shift(hours=5).time())

We shift the time forward by five hours.

print(now.shift(days=5).date())

We shift the date by five days forward.

print(now.shift(years=-8).date())

Here, we shift the date by eight years backward.

$ ./shifting.py 
03:44:23.100887
2017-09-07
2009-09-02

## Daylight saving time

Daylight saving time (DST) is the practice of advancing clocks during summer months 
so that evening daylight lasts longer. 
The time is adjusted forward one hour in the beginning of spring and adjusted 
backward in the autumn to standard time.

daylightsaving.py.py
  

#!/usr/bin/python

import arrow

now = arrow.now()

print(now.format("YYYY-MM-DD HH:mm:ss ZZ"))
print(now.dst())

The example shows daylight saving time with dst.

$ ./daylightsaving.py 
2017-09-02 22:46:37 +02:00
1:00:00

The output shows that the local time was adjusted by one hour.

## Humanizing date and time

On social web sites we can often see terms such as 'an hour ago' or '5 min ago',
which provide quick information for humans about when the post was created or
modified. Arrow contains a humanize method to create such terms.

humanize.py
  

#!/usr/bin/python

import arrow

now = arrow.now()

d1 = now.shift(minutes=-15).humanize()
print(d1)

d2 = now.shift(hours=5).humanize()
print(d2)

The example humanizes two dates. 

$ ./humanizing.py 
15 minutes ago
in 4 hours

## Source

[Python arrow documentation](https://arrow.readthedocs.io/en/latest/)

In this article we have worked with date and time in Python with the arrow 
module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).