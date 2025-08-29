+++
title = "Go datetime"
date = 2025-08-29T19:55:08.435+01:00
draft = false
description = "Learn how to work with date and time in Go. Includes examples of parsing and formatting."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go datetime

last modified May 4, 2025

In this article we show how to work with datetime in Golang. The
time package provides functionality for measuring and displaying
time.

## Definitions

A *calendar time*, also known as absolute time, specifies a precise point
in the time continuum. It is typically expressed using a timestamp that includes
the date, time, and time zone—for example, July 29, 2021, at 13:02:05 CET.
Calendar time serves as a reference for logging events, scheduling activities,
and synchronizing processes.

A *time interval* represents the continuous span between two calendar
times. It can range from nanoseconds to centuries, depending on the context. For
instance, the period from 15:00 to 19:00 on February 20, 2020, constitutes a
four-hour interval. Time intervals are essential in fields such as physics,
computing, and project management, where precise measurement of durations is
required.

The *elapsed time* of an interval refers to its duration, representing
the difference between its start and end points. It can be expressed in units
such as seconds, minutes, hours, or days. For example, an elapsed time of 38
minutes may refer to the duration of a meeting or a travel segment. Unlike
calendar time, which specifies exact moments, elapsed time focuses on the
measurement of temporal passage.

An *amount of time* is the cumulative total of multiple elapsed times,
which may occur at different instances and are not necessarily consecutive. For
example, if a person spends eleven hours working on a project spread over
several days, the total amount of time devoted to the task is eleven hours,
regardless of when those hours were logged. This concept is useful in
productivity analysis and scheduling.

A *period* is the elapsed time between two events, often signifying
phases in processes or activities. In physics and engineering, the term "period"
can refer to the duration of one complete cycle of a repeating event, such as
the time it takes for a pendulum to swing back and forth once. In human
activities, a period might denote a work shift, a semester in education, or a
financial quarter in business.

*CPU time* refers to the amount of time a central processing unit (CPU)
actively executes instructions for a program or operating system. It excludes
idle or waiting periods when the CPU is not performing calculations. Measured in
clock ticks or seconds, CPU time is an important metric in computing,
particularly for performance analysis and optimization. High CPU time usage may
indicate intensive computation or inefficient processing.

An *epoch* is a reference point in time from which a particular era
begins. It is commonly used in computing, astronomy, and history. For instance,
the *Unix epoch* is the designated starting point for Unix-based
timekeeping: 00:00:00 UTC on January 1, 1970 (ISO 8601: 1970-01-01T00:00:00Z).
Many operating systems and programming languages use this epoch to calculate
time differences and timestamps.

*Wall time*, also known as real-world or wall-clock time, measures
elapsed time using a standard chronometer such as a wristwatch, wall clock, or
electronic timing device. It is often used in performance benchmarking and
real-time applications. The term originated from the practice of referencing
physical clocks mounted on walls. Wall time differs from CPU time, which counts
only active processing periods. Additionally, discrepancies may arise due to
factors such as system latency, clock drift, and adjustments for daylight saving
time.

## Go current time example

The following example demonstrates how to retrieve and display the current date 
and time in Go. This is achieved using the time package, which 
provides robust functionality for working with time-related operations.

main.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    now := time.Now()
    fmt.Println("Current datetime:", now)
}

In this example, the Now function from the time 
package is used to obtain the current date and time. The result is then 
printed to the console, showcasing the precision and detail provided by the 
time package.

$ go run main.go
Current datetime: 2022-05-29 17:46:47.069217048 +0200 CEST m=+0.000013004

## Go UTC time

Our planet is a sphere that rotates around its axis, causing the Sun to rise 
at different times in various locations. This rotation, which takes 
approximately 24 hours, led to the division of the world into 24 time zones. 
Local time within each zone is often adjusted further by daylight saving time.

To address the need for a unified global time standard, UTC (Universal 
Coordinated Time) was established. UTC eliminates confusion caused by time 
zones and daylight saving adjustments. It is widely used in aviation, weather 
forecasting, air traffic control, and other global applications. Unlike local 
time, UTC remains constant throughout the year.

$ timedatectl
               Local time: Ne 2022-05-29 17:48:07 CEST
           Universal time: Ne 2022-05-29 15:48:07 UTC
                 RTC time: Ne 2022-05-29 15:48:07
                Time zone: Europe/Bratislava (CEST, +0200)
System clock synchronized: yes
              NTP service: active
          RTC in local TZ: no

In this example, the local timezone is Central European Summer Time (CEST), 
with a UTC offset of +2 hours. This offset represents the difference between 
local time and UTC.

main.go
  

package main

import (
     "fmt"
     "time"
)

func main() {

     utc := time.Now().UTC()
     fmt.Println(utc)
}

The example above demonstrates how to retrieve the current UTC time using the 
UTC function from the time package. This ensures 
that the time is displayed in a globally consistent format.

$ go run main.go
2022-05-29 15:50:07.413562417 +0000 UTC

## Go datetime parts

The following example illustrates how to extract and display individual 
components of the current date and time, such as the year, month, day, hour, 
minute, second, and nanosecond.

main.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    now := time.Now()

    fmt.Println("Year:", now.Year())
    fmt.Println("Month:", now.Month())
    fmt.Println("Day:", now.Day())
    fmt.Println("Hour:", now.Hour())
    fmt.Println("Minute:", now.Minute())
    fmt.Println("Second:", now.Second())
    fmt.Println("Nanosecond:", now.Nanosecond())
}

In this example, the time package provides dedicated functions 
for accessing each component of the current datetime. These functions allow 
for precise and detailed manipulation of time data.

$ go run main.go
Year: 2022
Month: May
Day: 29
Hour: 17
Minute: 50
Second: 38
Nanosecond: 266573694

## Go Date function

The time.Date function in Go allows developers to create a 
datetime object by specifying the year, month, day, hour, minute, second, 
nanosecond, and location. This function is particularly useful for generating 
specific timestamps or initializing datetime values for further operations.

main.go
  

package main

import (
     "fmt"
     "time"
)

func main() {
     t := time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC)
     fmt.Printf("Go launch date: %s\n", t.Local())
}

In the example, we create a datetime object representing the launch date 
of the Go programming language. The time.Date function is used to 
set the exact moment in time, including the UTC timezone.

The parameters passed to the time.Date function include the year, 
month, day, hour, minute, second, nanosecond, and location. This level of 
detail ensures precise control over the datetime object being created.

The resulting datetime object can be formatted or manipulated as needed, 
making the time.Date function a versatile tool for working with 
dates and times in Go.

$ go run main.go
Go launch date: 2009-11-11 00:00:00 +0100 CET

## Go format datetime

Go does not use the typical yyyy-mm-dd format specifier; it uses
the following reference datetime format:

Mon Jan 2 15:04:05 -0700 MST 2006

We format the time how we structure this specific reference datetime.

main.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    now := time.Now()

    fmt.Println("Time: ", now.Format("15:04:05"))
    fmt.Println("Date:", now.Format("Jan 2, 2006"))
    fmt.Println("Timestamp:", now.Format(time.Stamp))
    fmt.Println("ANSIC:", now.Format(time.ANSIC))
    fmt.Println("UnixDate:", now.Format(time.UnixDate))
    fmt.Println("Kitchen:", now.Format(time.Kitchen))
}

The example displays the current time in custom and predefined formats.

fmt.Println("Date:", now.Format("Jan 2, 2006"))

This is an example of a custom datetime format.

fmt.Println("ANSIC:", now.Format(time.ANSIC))

This is an example of a predefined format.

$ go run main.go
Time:  17:51:45
Date: May 29, 2022
Timestamp: May 29 17:51:45
ANSIC: Sun May 29 17:51:45 2022
UnixDate: Sun May 29 17:51:45 CEST 2022
Kitchen: 5:51PM

## Go parse datetime

The Parse function in Go is used to convert a formatted string 
into a time value. This function is essential for interpreting and working 
with date and time strings in various formats.

The layout parameter defines the expected format of the input string. It uses 
a reference time to specify the structure. Predefined layouts such as ANSIC, 
UnixDate, and RFC3339 provide convenient options for common formats.

main.go
  

package main

import (
     "fmt"
     "log"
     "time"
)

func main() {

     vals := []string{"2021-07-28", "2020-11-12", "2019-01-05"}

     for _, val := range vals {

          t, err := time.Parse("2006-01-02", val)

          if err != nil {

               log.Fatal(err)
          }

          fmt.Println(t)
     }
}

In the example, we parse three date strings using the Parse 
function. Each string is converted into a time value, which can then be used 
for further operations or comparisons.

$ go run main.go
2021-07-28 00:00:00 +0000 UTC
2020-11-12 00:00:00 +0000 UTC
2019-01-05 00:00:00 +0000 UTC

## Go datetime arithmetic

The Add and AddDate functions in Go allow for 
performing arithmetic operations on datetime values. These functions are 
useful for calculating future or past dates and times.

In the example, we demonstrate three operations: adding 27 hours, adding 2 
years, 10 months, and 11 days, and subtracting 6 hours. These operations 
illustrate the flexibility of datetime arithmetic in Go.

main.go
  

package main

import (
     "fmt"
     "time"
)

func main() {

     now := time.Now()

     t1 := now.Add(time.Hour * 27)
     fmt.Println(t1.Format(time.UnixDate))

     t2 := now.AddDate(2, 10, 11)
     fmt.Println(t2.Format(time.UnixDate))

     t3 := now.Add(-time.Hour * 6)
     fmt.Println(t3.Format(time.UnixDate))
}

In the code example, we perform three arithmetic operations.

t1 := now.Add(time.Hour * 27)

We add 27 hours.

t2 := now.AddDate(2, 10, 11)

We add 2 years, 10 months, and 11 days.

t3 := now.Add(-time.Hour * 6)

We subtract 6 hours.

$ go run main.go
Mon May 30 20:52:29 CEST 2022
Wed Apr  9 17:52:29 CEST 2025
Sun May 29 11:52:29 CEST 2022

## Go datetime Duration

A Duration in Go represents the elapsed time between two time 
instants. It is expressed as an int64 nanosecond count, providing high 
precision for time calculations.

The Sub function calculates the duration between two time 
instants. This is useful for measuring time intervals or determining the 
difference between specific dates and times.

The Since function is a shorthand for time.Now().Sub(t). 
It calculates the time elapsed since a specified datetime, making it ideal for 
tracking durations relative to the current time.

main.go
  

package main

import (
     "fmt"
     "time"
)

func main() {

     t1 := time.Date(2020, time.November, 10, 23, 0, 0, 0, time.UTC)
     t2 := time.Date(2021, time.July, 28, 16, 22, 0, 0, time.UTC)

     elapsed := t2.Sub(t1)

     fmt.Println(elapsed)
}

The example calculates the elapsed time between two time instants.

$ go run main.go
6233h22m0s

main.go
  

```
package main

import (
     "fmt"
     "time"
)

func main() {

     t2 := time.Now()

     year, _, _ := t2.Date()
     t1 := time.Date(year, 0, 0, 0, 0, 0, 0, time.Local)

     elapsed := time.Since(t1)

     fmt.Println(elapsed)
}

```

The Since function returns the time elapsed since the specified
datetime. It is shorthand for time.Now().Sub(t).

$ go run main.go
4336h53m3.593593645s

## Go datetime Location

The In function in Go converts a time value to a specific 
location. This is particularly useful for working with time zones and 
ensuring that datetime values are displayed in the desired context.

In the example, we retrieve the current local time and convert it to various 
time zones using the In function. This demonstrates how to 
handle time zone conversions effectively.

main.go
  

package main

import (
     "fmt"
     "log"
     "time"
)

func main() {

     names := []string{
          "Local",
          "UTC",
          "Pacific/Galapagos",
          "Europe/Budapest",
          "Europe/Moscow",
          "Asia/Vladivostok",
          "Antarctica/Vostok",
          "America/New_York",
          "Africa/Tripoli",
     }

     now := time.Now()

     for _, name := range names {

          loc, err := time.LoadLocation(name)

          if err != nil {
               log.Fatal(err)
          }

          t := now.In(loc)

          fmt.Println(loc, ": ", t)
     }
}

The example gets the current local time and determines the corresponding time
in different locations.

$ go run main.go
Local :  2022-05-29 17:53:24.652877602 +0200 CEST
UTC :  2022-05-29 15:53:24.652877602 +0000 UTC
Pacific/Galapagos :  2022-05-29 09:53:24.652877602 -0600 -06
Europe/Budapest :  2022-05-29 17:53:24.652877602 +0200 CEST
Europe/Moscow :  2022-05-29 18:53:24.652877602 +0300 MSK
Asia/Vladivostok :  2022-05-30 01:53:24.652877602 +1000 +10
Antarctica/Vostok :  2022-05-29 21:53:24.652877602 +0600 +06
America/New_York :  2022-05-29 11:53:24.652877602 -0400 EDT
Africa/Tripoli :  2022-05-29 17:53:24.652877602 +0200 EET

## Go Unix time

Unix time, also known as POSIX time, represents the number of seconds that 
have elapsed since the Unix epoch (January 1, 1970, 00:00:00 UTC). It is a 
widely used standard for time representation in computing.

main.go
  

package main

import (
     "fmt"
     "time"
)

func main() {

     timestamp := time.Now().Unix()
     fmt.Printf("%d\n", timestamp)
}

In the example, we use the Unix function to retrieve the current 
Unix time. This value can be used for timestamping or synchronizing events 
across systems.

$ go run main.go
1653839627

## Go datetime comparison

To compare datetime values in Go, we use the Equal, 
Before, and After functions. These functions enable 
precise comparisons between time instants.

main.go
  

package main

import (
     "fmt"
     "time"
)

func main() {

     var t1 = time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC)
     var t2 = time.Date(2021, time.July, 28, 16, 22, 0, 0, time.UTC)
     var t3 = time.Date(2021, time.July, 28, 16, 22, 0, 0, time.UTC)

     if t1.Equal(t2) {

          fmt.Println("t1 and t2 are equal")
     } else {

          fmt.Println("t1 and t2 are not equal")
     }

     if t2.Equal(t3) {

          fmt.Println("t2 and t3 are equal")
     } else {

          fmt.Println("t2 and t3 are not equal")
     }

     if t1.Before(t2) {

          fmt.Println("t1 is before t2")
     }

     if t3.After(t1) {

          fmt.Println("t3 is after t1")
     }
}

In the example, we compare three datetime values to determine their equality 
and relative order. This demonstrates the utility of comparison functions in 
handling datetime logic.

$ go run main.go
t1 and t2 are not equal
t2 and t3 are equal
t1 is before t2
t3 is after t1

## Source

[Go time package - reference](https://pkg.go.dev/time)

In this article, we explored various ways to work with date and time in Go,
including retrieving the current time, formatting, parsing, performing
arithmetic, and handling time zones. These examples demonstrate the versatility
and power of Go's time package for managing datetime operations
effectively.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).