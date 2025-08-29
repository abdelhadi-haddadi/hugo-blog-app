+++
title = "Go current time"
date = 2025-08-29T19:55:07.285+01:00
draft = false
description = "Learn how to get the current time in Go. Includes examples of time formatting and manipulation."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go current time

last modified April 11, 2024

In this article we show how to display current date and time in Golang. The
time package provides functionality for measuring and displaying
time. 

The Now function returns the current local time. 

The Format function returns a textual representation of the time
value formatted according to layout. The layout is either a predefined constant
value or a specific format of the reference datetime: Mon Jan 2
15:04:05-0700 MST 2006.

## Go current time example

The following example print the current date and time.

current_time.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    now := time.Now()

    fmt.Println("The current datetime is:", now)
}

The example prints the current time with Now.

$ go run current_time.go 
The current datetime is: 2020-05-26 18:56:03.268250331 +0200 CEST m=+0.000060798

## Go current time parts

In the following example, we print the parts of the current time.

current_time_parts.go
  

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

In the code example, we print the year, month, day, hour, minute, second, and
nanosecond with the corresponding functions separately.

$ go run current_time_parts.go 
Year: 2020
Month: May
Day: 26
Hour: 19
Minute: 1
Second: 12
Nanosecond: 985372280

    

## Go format current time

Go does not use the typical yyyy-mm-dd format specifier; it uses
the following reference datetime format:

Mon Jan 2 15:04:05 -0700 MST 2006

We format the time how we structure this specific reference datetime.

current_time_format.go
  

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

$ go run current_time_format.go 
Time:  19:07:53
Date: May 26, 2020
Timestamp: May 26 19:07:53
ANSIC: Tue May 26 19:07:53 2020
UnixDate: Tue May 26 19:07:53 CEST 2020
Kitchen: 7:07PM

## Source

[Go time package - reference](https://pkg.go.dev/time)

In this article we have shown how to display current datetime in Golang.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).