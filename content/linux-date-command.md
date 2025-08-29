+++
title = "Linux date Command"
date = 2025-08-29T20:03:26.155+01:00
draft = false
description = "Linux tutorial on the date command, covering basic and advanced usage with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux date Command

last modified March 3, 2025

The date command in Linux is used to display or set the system date
and time. It is a powerful tool for managing time-related tasks, such as
scheduling, logging, and formatting timestamps. This tutorial covers basic and
advanced usage of date with practical examples.

date is commonly used for displaying the current date and time,
formatting timestamps, and setting the system clock.

## Display Current Date and Time

This example demonstrates how to display the current date and time.

date

The date command outputs the current system date and time in the
default format.

## Display Date in a Specific Format

This example shows how to display the date in a custom format.

date +"%Y-%m-%d %H:%M:%S"

The + option allows you to specify a custom format. In this case,
it displays the date and time in YYYY-MM-DD HH:MM:SS format.

## Display Only the Date

This example demonstrates how to display only the date.

date +"%Y-%m-%d"

The + option formats the output to show only the date in
YYYY-MM-DD format.

## Display Only the Time

This example shows how to display only the time.

date +"%H:%M:%S"

The + option formats the output to show only the time in
HH:MM:SS format.

## Display the Day of the Week

This example demonstrates how to display the day of the week.

date +"%A"

The + option formats the output to show the full name of the day
(e.g., Monday).

## Display the Unix Timestamp

This example shows how to display the Unix timestamp.

date +"%s"

The + option formats the output to show the number of seconds since
the Unix epoch (January 1, 1970).

## Set the System Date and Time

This example demonstrates how to set the system date and time.

sudo date -s "2025-03-03 12:34:56"

The -s option sets the system date and time to the specified value.
Root privileges are required.

## Display the Last Modification Time of a File

This example shows how to display the last modification time of a file.

date -r filename.txt

The -r option displays the last modification time of
filename.txt.

## Display the Date in UTC

This example demonstrates how to display the date and time in UTC.

date -u

The -u option displays the current date and time in Coordinated
Universal Time (UTC).

## Advanced: Calculate Future or Past Dates

This example shows how to calculate a future or past date.

date -d "next Friday"

The -d option allows you to calculate dates relative to the current
date. In this case, it displays the date of the next Friday.

## Best Practices for date

- **Use Custom Formats:** Use the + option to format dates for specific needs.

- **Check File Timestamps:** Use -r to check file modification times.

- **Set Time Carefully:** Use -s with caution to avoid system issues.

- **Use UTC for Consistency:** Use -u for time-sensitive tasks.

## Source

[GNU date Manual](https://www.gnu.org/software/coreutils/manual/html_node/date-invocation.html)

In this article, we have explored various examples of using the date
command for displaying, formatting, and setting system dates and times, including
advanced features like Unix timestamps and relative date calculations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).