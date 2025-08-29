+++
title = "Python time"
date = 2025-08-29T20:10:55.703+01:00
draft = false
description = "Python time tutorial shows how to work with time in Python using the standard time module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python time

last modified January 29, 2024

Python time tutorial shows how to work with time in Python using the standard
time module.

## Python time module

The time module is a standard Python module that contains time
access and conversion functions. Note that this module has limitations; for
instance, the functions may not handle dates and times before the epoch or far
in the future.

Additional time-related functionality can be found in standard
datetime and calendar modules, or in third-party
arrow module.

## Python time structure

Several functions including time.gmtime,
time.localtime time.asctime work with the
time.struct_time object.

time.struct_time(tm_year=2021, tm_mon=6, tm_mday=27, tm_hour=14, tm_min=12,
     tm_sec=20, tm_wday=6, tm_yday=178, tm_isdst=1)

This is an example of a time structure.

     
          Index
          Attribute
          Values
     

     
          0
          tm_year
          0000, ...., 2021, ..., 9999
     
     
          1
          tm_mon
          1, 2, ..., 12
     
     
          2
          tm_mday
          1, 2, ..., 31
     
     
          3
          tm_hour
          0, 1, ..., 23
     
     
          4
          tm_min
          0, 1, ..., 59
     
     
          5
          tm_sec
          0, 1, ..., 61
     
     
          6
          tm_wday
          0, 1, ..., 6; Monday is 0
     
     
          7
          tm_yday
          1, 2, ..., 366
     
     
          8
          tm_isdst
          0, 1 or -1
     

The values of the time.struct_time object are accessible using both
indices and attributes. We can use the time.asctime function 
converts the time.struct_time into a standard human readable string 
form.

## Python time epoch

An epoch is an instant in time chosen as the origin of a particular era. The
Unix epoch is the time 00:00:00 UTC on 1 January 1970 (or 1970-01-01T00:00:00Z
ISO 8601).

epoch.py
  

#!/usr/bin/python

import time

e = time.gmtime(0)

print(e)
print(e.tm_year, e.tm_mon, e.tm_mday)

The example prints the platform's epoch

e = time.gmtime(0)

To get the epoch, we pass 0 to the time.gmtime function.

$ ./epoch.py
time.struct_time(tm_year=1970, tm_mon=1, tm_mday=1, tm_hour=0, tm_min=0,
     tm_sec=0, tm_wday=3, tm_yday=1, tm_isdst=0)
1970 1 1

## Python time.time

The time.time function returns the time in seconds since the epoch
as a floating point number.

time_fun.py
  

#!/usr/bin/python

import time

t = time.time()

print(t)

The example returns the time in seconds since epoch.

$ date +%s
1624795343
$ ./time_fun.py
1624795347.1246026

## Python time.localtime

The time.localtime function converts a time expressed in seconds
since the epoch to a time structure in local time.

loc_time.py
  

#!/usr/bin/python

import time

secs = time.time()

loc_time = time.localtime(secs)

print(f'local time: {loc_time}')

print(loc_time.tm_year)
print(loc_time.tm_mon)
print(loc_time.tm_mday)

print('-------------------------')

print(loc_time[0])
print(loc_time[1])
print(loc_time[2])

We get the elapsed seconds with the time.time function and pass 
it to the time.localtime function. We get the 

$ ./loc_time.py 
local time: time.struct_time(tm_year=2021, tm_mon=6, tm_mday=27, tm_hour=14, 
     tm_min=20, tm_sec=15, tm_wday=6, tm_yday=178, tm_isdst=1)
2021
6
27
-------------------------
2021
6
27

## Python time.ctime

The time.ctime function converts a time expressed in seconds since
the epoch to a specific string format, representing local time.

loc_time2.py
  

#!/usr/bin/python

import time
secs = time.time()

loc_time = time.ctime(secs)

print(f'local time: {loc_time}')

The example uses the time.ctime function to express the time 
expressed in seconds since epoch into a human readable time format.

$ ./loc_time2.py 
local time: Sun Jun 27 14:46:18 2021

## Python time.gmtime

The time.gmtime converts a time expressed in seconds since the
epoch to a time structure in UTC.

There is a pragmatic need for one global time. One global time helps to avoid
confusion about time zones and daylight saving time. The UTC (Universal
Coordinated time) was chosen to be the primary time standard. UTC is used in
aviation, weather forecasts, flight plans, air traffic control clearances, and
maps. Unlike local time, UTC does not change with a change of seasons. 

utc_time.py
  

#!/usr/bin/python

import time

utc = time.gmtime()
print(utc)

print('--------------------')

print(utc.tm_year)
print(utc.tm_mon)
print(utc.tm_mday)
print(utc.tm_hour)

The example prints the Universal time.

$ ./utc_time.py 
time.struct_time(tm_year=2021, tm_mon=6, tm_mday=27, tm_hour=12, tm_min=55, 
     tm_sec=31, tm_wday=6, tm_yday=178, tm_isdst=0)
--------------------
2021
6
27
12

## Python time.asctime

The time.asctime function converts the
time.struct_time into a standard human readable string form.

asc_time.py
  

#!/usr/bin/python

import time

loc = time.localtime()
utc = time.gmtime()

print(time.asctime(loc))
print(time.asctime(utc))

With the help of the time.asctime, we print the local time and the 
UTC time.

$ ./asc_time.py 
Sun Jun 27 15:06:15 2021
Sun Jun 27 13:06:15 2021

## Python time.strptime

The time.strptime function parses a string representing a time
according to the specified format. The returned value is a time structure.

parse_time.py
  

#!/usr/bin/python

import time

v1 = '2021-06-25'
v2 = '25/11/2020'

d1 = time.strptime(v1, '%Y-%m-%d')
print(time.asctime(d1))

d2 = time.strptime(v2, '%d/%m/%Y')
print(time.asctime(d2))

The example dates expressed in two different formats.

$ ./parse_time.py 
Fri Jun 25 00:00:00 2021
Wed Nov 25 00:00:00 2020

## Python time.strftime

The time.strftime function converts a time structure representing a
time to a string as specified by the format argument.

format_time.py
  

#!/usr/bin/python

import time

loc = time.localtime()

print(time.strftime('%Y-%m-%d', loc))
print(time.strftime('%c', loc))
print(time.strftime('%A', loc))
print(time.strftime('%B', loc))
print(time.strftime("%H:%M:%S", loc))

The example uses the time.localtime to get a local time expressed 
in a time structure. Then it formats the returned value into different time 
formats.

$ ./format_time.py 
2021-06-27
Sun Jun 27 15:17:37 2021
Sunday
June
15:17:37

## Source

[Python time — Time access and conversions](https://docs.python.org/3/library/time.html)

In this article we have worked with the time module in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).