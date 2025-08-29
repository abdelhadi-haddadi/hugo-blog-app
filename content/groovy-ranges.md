+++
title = "Groovy Ranges"
date = 2025-08-29T19:56:31.290+01:00
draft = false
description = "Groovy Ranges tutorial covers basics, numeric ranges, steps, and date ranges with examples."
image = ""
imageBig = ""
categories = ["groovy"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Groovy Ranges

last modified March 20, 2025

Ranges in Groovy define sequences using the .. operator,
supporting numbers, characters, dates, and more. They're iterable and
offer methods for manipulation. This tutorial explores range creation and
usage with practical examples.

## Simple Numeric Range

Ranges are created with two dots between start and end values, providing a
quick way to generate sequences of numbers.

SimpleRange.groovy
  

def range = 1..5
println range

1..5 creates an inclusive range from 1 to 5. When printed, it
shows as a list-like sequence [1, 2, 3, 4, 5]. Ranges are objects of type
groovy.lang.IntRange, blending simplicity with functionality.

$ groovy SimpleRange.groovy
[1, 2, 3, 4, 5]

## Range in a Loop

Ranges are iterable, making them ideal for loops to process sequences
without manually listing each element.

RangeLoop.groovy
  

def range = 1..3

for (num in range) {
    println num
}

1..3 iterates over 1, 2, 3 in a for loop, printing
each number. This showcases ranges as a concise alternative to traditional
index-based loops, enhancing readability.

$ groovy RangeLoop.groovy
1
2
3

## Numeric Range Basics

Numeric ranges have properties like from and to,
and can be converted to lists, offering insight into their structure.

NumericRangeBasics.groovy
  

def vals = 1..10
println vals.from
println vals.to
println vals.toList()

1..10 defines an inclusive range. from returns 1,
the start, and to returns 10, the end. toList
converts it to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], explicitly listing all
values. This shows ranges as both compact objects and expandable sequences.

$ groovy NumericRangeBasics.groovy
1
10
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

## Stepping Through Ranges

The step method generates a new range with specified
increments, allowing you to skip values within the sequence.

RangeStep.groovy
  

def vals2 = (1..7).step(2)
println vals2

(1..7).step(2) starts at 1, ends at 7, and steps by 2,
producing [1, 3, 5, 7]. It includes only every second value, stopping at or
before 7. This method returns a list, offering a flexible way to customize
range progression.

$ groovy RangeStep.groovy
[1, 3, 5, 7]

## Reverse Ranges

Ranges can count downwards by reversing the order of start and end,
creating descending sequences effortlessly.

ReverseRange.groovy
  

def vals3 = 10..1
println vals3

10..1 defines a range from 10 down to 1, inclusive, resulting
in [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]. Unlike ascending ranges, the larger
number comes first, and Groovy handles the decrement automatically,
simplifying reverse iteration.

$ groovy ReverseRange.groovy
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

## Exclusive Ranges

Using ..&lt;, ranges can exclude the upper bound, with an extra
&lt; excluding the lower bound too, refining the sequence.

ExclusiveRange.groovy
  

def vals4 = 1..&lt;10
println vals4.toList()

def vals5 = 1&lt;..&lt;10
println vals5.toList()

1..&lt;10 includes 1 but excludes 10, yielding [1, 2, 3, 4, 5, 6,
7, 8, 9]. 1&lt;..&lt;10 excludes both ends, starting after 1 and
stopping before 10, giving [2, 3, 4, 5, 6, 7, 8, 9]. These notations
provide precise control over range boundaries.

$ groovy ExclusiveRange.groovy
[1, 2, 3, 4, 5, 6, 7, 8, 9]
[2, 3, 4, 5, 6, 7, 8, 9]

## Character Ranges

Ranges extend to characters, creating sequences of letters with methods to
inspect and manipulate them, leveraging their ordinal values.

CharRange.groovy
  

def chars = 'a'..'z'
println chars 
println chars.size()
println chars.contains('c')
println chars.getFrom() 
println chars.getTo()

'a'..'z' generates a range of lowercase letters [a, b, c, ...,
z]. size returns 26, the count of letters.
contains('c') checks inclusion (true). getFrom
and getTo return 'a' and 'z', the bounds. This uses
character codes internally, making it intuitive for alphabetic sequences.

$ groovy CharRange.groovy
[a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z]
26
true
a
z

## Date and Time Ranges: Months

Ranges work with date/time types like Month, enabling
sequences of temporal units for calendar-based tasks.

MonthRange.groovy
  

import java.time.Month

def months = Month.JANUARY..Month.DECEMBER

for (def m in months) {
    println m
}

Month.JANUARY..Month.DECEMBER creates a range of all 12 months.
The for loop iterates, printing each month from JANUARY to
DECEMBER. This leverages Java's Month enum, showing ranges'
compatibility with ordered types beyond numbers and characters.

$ groovy MonthRange.groovy
JANUARY
FEBRUARY
MARCH
APRIL
MAY
JUNE
JULY
AUGUST
SEPTEMBER
OCTOBER
NOVEMBER
DECEMBER

## Date and Time Ranges: Days

Ranges can span LocalDate objects, creating sequences of days
for date-based iterations, useful in scheduling or logging.

DayRange.groovy
  

import java.time.LocalDate

def days = LocalDate.now()..LocalDate.now().plusDays(17)

for (def d in days) {
    println d
}

LocalDate.now()..LocalDate.now().plusDays(17) spans from today
to 17 days later (e.g., March 20, 2025, to April 6, 2025). The loop prints
each date, totaling 18 days (inclusive). Output varies by run date, but
ranges adapt seamlessly to LocalDate's ordering, simplifying
date sequences.

$ groovy DayRange.groovy  // Example for March 20, 2025
2025-03-20
2025-03-21
2025-03-22
[...continues...]
2025-04-05
2025-04-06

## Range with Negative Numbers

Ranges can include negative numbers, maintaining the same inclusive or
exclusive behavior as positive ranges.

NegativeRange.groovy
  

def negRange = -3..2
println negRange.toList()

-3..2 creates an inclusive range from -3 to 2, resulting in
[-3, -2, -1, 0, 1, 2]. This demonstrates ranges' flexibility with any
integer bounds, ascending or descending, broadening their applicability.

$ groovy NegativeRange.groovy
[-3, -2, -1, 0, 1, 2]

## Source

[Groovy Documentation](https://groovy-lang.org/documentation.html)

This tutorial explored Groovy ranges with practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

List [all Groovy tutorials](/all/#groovy).