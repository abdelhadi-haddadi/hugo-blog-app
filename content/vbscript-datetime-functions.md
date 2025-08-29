+++
title = "VBScript Date/Time Functions"
date = 2025-08-29T20:14:40.797+01:00
draft = false
description = "Learn about VBScript Date/Time functions, including Now, Date, Time, and more. Understand how to work with dates and times effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Date/Time Functions

last modified April 4, 2025

VBScript provides a comprehensive set of functions for working with dates and
times. These functions allow you to retrieve, manipulate, and format date/time
values. Understanding these functions is essential for tasks like logging,
scheduling, and time-based calculations in scripts.

## VBScript Date/Time Functions Overview

VBScript includes several built-in functions for date and time operations. The
primary functions are Now, Date, Time,
DateAdd, DateDiff, DatePart, and
FormatDateTime. These functions help retrieve current date/time,
perform calculations, and format output.

Date values in VBScript are stored as floating-point numbers where the integer
part represents the date and the fractional part represents the time. This
numeric representation allows for easy date arithmetic and comparisons.

## Getting Current Date and Time

The Now, Date, and Time functions are the
most basic date/time functions. Now returns both date and time,
while Date and Time return just the date or time
components respectively.

current_datetime.vbs
  

Dim currentDateTime, currentDate, currentTime
currentDateTime = Now()
currentDate = Date()
currentTime = Time()

WScript.Echo "Current Date and Time: " &amp; currentDateTime
WScript.Echo "Current Date: " &amp; currentDate
WScript.Echo "Current Time: " &amp; currentTime

This example demonstrates how to retrieve the current system date and time. The
Now function provides both components, while Date and
Time separate them. These functions don't require any parameters.

## Date Arithmetic with DateAdd

The DateAdd function allows you to perform date arithmetic by
adding or subtracting time intervals. It takes three parameters: the interval
type, the number of intervals, and the original date.

date_arithmetic.vbs
  

Dim today, nextWeek, nextMonth, nextYear, yesterday
today = Date()
nextWeek = DateAdd("d", 7, today)       ' Add 7 days
nextMonth = DateAdd("m", 1, today)      ' Add 1 month
nextYear = DateAdd("yyyy", 1, today)    ' Add 1 year
yesterday = DateAdd("d", -1, today)     ' Subtract 1 day

WScript.Echo "Today: " &amp; today
WScript.Echo "Next Week: " &amp; nextWeek
WScript.Echo "Next Month: " &amp; nextMonth
WScript.Echo "Next Year: " &amp; nextYear
WScript.Echo "Yesterday: " &amp; yesterday

This example shows various date calculations using DateAdd. The
first parameter specifies the interval type ("d" for day, "m" for month, etc.).
Negative numbers subtract time. This is useful for calculating deadlines or
expiration dates.

## Date Difference with DateDiff

The DateDiff function calculates the difference between two dates
in specified units. It takes three parameters: interval type, date1, and date2.
The result is the number of intervals between the two dates.

date_difference.vbs
  

Dim startDate, endDate, daysDiff, monthsDiff, yearsDiff
startDate = #1/15/2025#
endDate = #4/4/2025#
daysDiff = DateDiff("d", startDate, endDate)
monthsDiff = DateDiff("m", startDate, endDate)
yearsDiff = DateDiff("yyyy", startDate, endDate)

WScript.Echo "Days between dates: " &amp; daysDiff
WScript.Echo "Months between dates: " &amp; monthsDiff
WScript.Echo "Years between dates: " &amp; yearsDiff

This example calculates the difference between two dates in days, months, and
years. DateDiff is useful for calculating ages, durations, or time
remaining until an event. Note that months and years differences are integer
values.

## Extracting Date Parts with DatePart

The DatePart function extracts specific components from a date,
such as year, month, day, or weekday. It takes two parameters: the part to
extract and the date value.

date_parts.vbs
  

Dim currentDate, year, month, day, weekday
currentDate = Date()
year = DatePart("yyyy", currentDate)
month = DatePart("m", currentDate)
day = DatePart("d", currentDate)
weekday = DatePart("w", currentDate)

WScript.Echo "Current Date: " &amp; currentDate
WScript.Echo "Year: " &amp; year
WScript.Echo "Month: " &amp; month
WScript.Echo "Day: " &amp; day
WScript.Echo "Weekday: " &amp; weekday &amp; " (1=Sunday, 7=Saturday)"

This example demonstrates how to extract various components from a date. The
weekday returns a number from 1 (Sunday) to 7 (Saturday). This function is
useful when you need to process dates based on their components.

## Formatting Dates with FormatDateTime

The FormatDateTime function formats a date/time value according to
specified formatting options. It takes two parameters: the date and the format
constant (0-4).

date_formatting.vbs
  

Dim currentDateTime, longDate, shortDate, longTime, shortTime
currentDateTime = Now()
longDate = FormatDateTime(currentDateTime, 1)    ' vbLongDate
shortDate = FormatDateTime(currentDateTime, 2)   ' vbShortDate
longTime = FormatDateTime(currentDateTime, 3)    ' vbLongTime
shortTime = FormatDateTime(currentDateTime, 4)   ' vbShortTime

WScript.Echo "Original: " &amp; currentDateTime
WScript.Echo "Long Date: " &amp; longDate
WScript.Echo "Short Date: " &amp; shortDate
WScript.Echo "Long Time: " &amp; longTime
WScript.Echo "Short Time: " &amp; shortTime

This example shows different date/time formatting options. The format constants
determine the output style. This is particularly useful for displaying dates in
user interfaces or reports according to regional settings.

## Source

[VBScript Date/Time Functions Documentation](https://learn.microsoft.com/en-us/previous-versions//s2w3k6xf(v=vs.85))

In this article, we have explored the essential VBScript Date/Time functions,
covering retrieval, manipulation, and formatting of date/time values. From basic
functions like Now and Date to more advanced
operations with DateAdd and DateDiff, these tools are
vital for any VBScript programmer working with temporal data.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).