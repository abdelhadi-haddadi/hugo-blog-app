+++
title = "Tcl clock Command"
date = 2025-08-29T20:12:53.479+01:00
draft = false
description = "Tcl clock command tutorial shows how to handle time and date in Tcl. Learn clock with practical examples."
image = ""
imageBig = ""
categories = ["tcl"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Tcl clock Command

last modified April 3, 2025

The Tcl clock command provides comprehensive time and date handling
capabilities. It can convert between different time formats, perform date
arithmetic, and format time values. The command is essential for any time-
related operations in Tcl.

## Basic Definition

The clock command operates on seconds since the Unix epoch (Jan 1,
1970). It can convert between human-readable formats and machine time. The
command supports various subcommands for different operations.

Common subcommands include clock seconds, clock format,
and clock scan. These handle getting current time, formatting time
values, and parsing time strings respectively.

## Getting Current Time

The simplest use of clock is to get the current time in seconds.
This demonstrates the basic time retrieval functionality.

clock_seconds.tcl
  

set current_time [clock seconds]
puts "Current time in seconds since epoch: $current_time"

This code gets the current time as seconds since the Unix epoch. The value
represents the number of seconds since January 1, 1970 (UTC). This is the
fundamental time representation in Tcl.

## Formatting Time Values

The clock format subcommand converts seconds to human-readable
strings. It supports customizable formatting using conversion specifiers.

clock_format.tcl
  

set now [clock seconds]
set formatted [clock format $now -format "%Y-%m-%d %H:%M:%S"]
puts "Formatted time: $formatted"

This example shows how to format the current time into a standard date-time
string. The format string uses %Y for year, %m for month, %d for day, etc.
This is useful for displaying timestamps to users.

## Parsing Time Strings

The clock scan subcommand converts human-readable time strings
into seconds. It can interpret various date and time formats.

clock_scan.tcl
  

set time_str "2025-04-15 14:30:00"
set seconds [clock scan $time_str -format "%Y-%m-%d %H:%M:%S"]
puts "Time in seconds: $seconds"

This code parses a formatted date-time string back into seconds. The format
specifier must match the input string format. This is useful for processing
user input or log files.

## Date Arithmetic

The clock add subcommand performs date arithmetic by adding or
subtracting time intervals. It handles month and year boundaries correctly.

clock_add.tcl
  

set now [clock seconds]
set future [clock add $now 2 weeks]
puts "Now: [clock format $now]"
puts "Two weeks later: [clock format $future]"

This example adds two weeks to the current time. The command automatically
adjusts for month transitions. Valid units include years, months, weeks,
days, hours, minutes, and seconds.

## Time Zone Handling

The clock command can work with different time zones. The
-timezone option specifies which time zone to use.

clock_timezone.tcl
  

set now [clock seconds]
set ny_time [clock format $now -timezone "America/New_York"]
set london_time [clock format $now -timezone "Europe/London"]
puts "New York: $ny_time"
puts "London: $london_time"

This code displays the current time in two different time zones. The time
zone names follow the Olson database format. This is useful for applications
that need to display times in multiple locations.

## Comparing Times

Times can be compared directly when represented as seconds. This allows for
easy determination of which event occurred first.

clock_compare.tcl
  

set time1 [clock scan "2025-01-01"]
set time2 [clock scan "2025-06-01"]
if {$time1 &lt; $time2} {
    puts "January comes before June"
}

This example compares two dates by converting them to seconds first. The
comparison operators work directly on these numeric values. This technique
is useful for sorting or filtering events by time.

## Best Practices

- **Consistency:** Use UTC for storage and convert for display.

- **Formatting:** Prefer ISO 8601 format (%Y-%m-%d) for storage.

- **Time zones:** Always specify time zones for user-facing times.

- **Leap seconds:** Be aware Tcl doesn't handle leap seconds.

- **Performance:** Cache formatted times if used repeatedly.

 

This tutorial covered the Tcl clock command with practical
examples showing its usage for time handling and manipulation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Tcl Tutorials](/tcl/).