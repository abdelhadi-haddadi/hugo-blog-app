+++
title = "Linux cal Command"
date = 2025-08-29T20:03:23.941+01:00
draft = false
description = "Linux tutorial on the cal command, covering basic and advanced calendar display with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux cal Command

last modified March 3, 2025

The cal command in Linux is used to display a calendar in the
terminal. It is a simple yet powerful tool for viewing monthly or yearly
calendars. This tutorial covers basic and advanced usage of cal
with practical examples.

cal is commonly used for quickly checking dates, planning events,
and viewing historical or future calendars.

## Display Current Month

This example demonstrates how to display the calendar for the current month.

cal

The cal command outputs the calendar for the current month.

## Display Specific Month

This example shows how to display the calendar for a specific month and year.

cal 10 2023

The cal command displays the calendar for October 2023.

## Display Entire Year

This example demonstrates how to display the calendar for an entire year.

cal 2024

The cal command outputs the calendar for the year 2024.

## Display Julian Calendar

This example shows how to display the calendar in Julian format.

cal -j

The -j option displays the calendar with Julian dates.

## Display Monday as First Day

This example demonstrates how to display the calendar with Monday as the first
day of the week.

cal -m

The -m option sets Monday as the first day of the week.

## Display Three Months

This example shows how to display the previous, current, and next month.

cal -3

The -3 option displays three months: previous, current, and next.

## Best Practices for cal

- **Use for Quick Reference:** Use cal to quickly check dates or plan events.

- **Combine with Other Commands:** Use cal with commands like grep for advanced filtering.

- **Customize Output:** Use options like -j or -m to customize the calendar display.

- **Check Historical Dates:** Use cal to view calendars for past or future years.

## Source

[Linux cal Manual](https://man7.org/linux/man-pages/man1/cal.1.html)

In this article, we have explored various examples of using the cal
command for displaying calendars, including advanced features like Julian dates
and custom week starts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).