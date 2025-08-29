+++
title = "Go datetime format"
date = 2025-08-29T19:55:08.417+01:00
draft = false
description = "Learn how to format date and time in Go. Includes examples of custom and standard formats."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go datetime format

last modified April 11, 2024

In this article we show how to format datetime values in Golang.

In Go, we use the time.Format function to format datetime values.

func (t Time) Format(layout string) string

The function returns a textual representation of the time value formatted
according to the layout defined by the argument

Go does not use the usual approach of using format specifiers such as
yyyy-mm-dd to format datetime values. Instead, it uses a uniqe
datetime value of Mon Jan 2 15:04:05 MST 2006. So in order to
format a datetime value, we choose a specific layout of this fixed datetime.

const (

    Layout      = "01/02 03:04:05PM '06 -0700"
    ANSIC       = "Mon Jan _2 15:04:05 2006"
    UnixDate    = "Mon Jan _2 15:04:05 MST 2006"
    RubyDate    = "Mon Jan 02 15:04:05 -0700 2006"
    RFC822      = "02 Jan 06 15:04 MST"
    RFC822Z     = "02 Jan 06 15:04 -0700"
    RFC850      = "Monday, 02-Jan-06 15:04:05 MST"
    RFC1123     = "Mon, 02 Jan 2006 15:04:05 MST"
    RFC1123Z    = "Mon, 02 Jan 2006 15:04:05 -0700"
    RFC3339     = "2006-01-02T15:04:05Z07:00"
    RFC3339Nano = "2006-01-02T15:04:05.999999999Z07:00"
    Kitchen     = "3:04PM"

    // Handy time stamps.
    Stamp      = "Jan _2 15:04:05"
    StampMilli = "Jan _2 15:04:05.000"
    StampMicro = "Jan _2 15:04:05.000000"
    StampNano  = "Jan _2 15:04:05.000000000"
)

There are several predefined layouts in the time module available.

## Go datetime format example

In the first example, we format the current datetime.

main.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    now := time.Now()

    fmt.Println("Time: ", now.Format("15:04:05"))
    fmt.Println("Short date:", now.Format("Jan 2, 2006"))
    fmt.Println("Long date:", now.Format("Mon Jan 2 15:04:05 2006"))
}

We get the current datetime with time.Now function and format it 
in three ways utilizing the Format function.

$ go run main.go
Time:  18:10:34
Short date: May 29, 2022
Long date: Sun May 29 18:10:34 2022

## Go predefined datetime formats

In the time package, there are several predefined time formats.

main.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    now := time.Now()

    fmt.Println("ANSIC:", now.Format(time.ANSIC))
    fmt.Println("Layout:", now.Format(time.Layout))
    fmt.Println("RFC1123:", now.Format(time.RFC1123))
    fmt.Println("RFC1123Z:", now.Format(time.RFC1123Z))
    fmt.Println("Kitchen:", now.Format(time.Kitchen))
    fmt.Println("RFC3339:", now.Format(time.RFC3339))
    fmt.Println("RFC3339Nano:", now.Format(time.RFC3339Nano))
    fmt.Println("RFC822:", now.Format(time.RFC822))
    fmt.Println("RFC822Z:", now.Format(time.RFC822Z))
    fmt.Println("RFC850:", now.Format(time.RFC850))
    fmt.Println("RubyDate:", now.Format(time.RubyDate))
    fmt.Println("UnixDate:", now.Format(time.UnixDate))
    fmt.Println("RFC1123:", now.Format(time.RFC1123))
    fmt.Println("RFC1123Z:", now.Format(time.RFC1123Z))
}

The example uses fourteen predefined formats.

$ go run main.go
ANSIC: Sun May 29 18:15:38 2022
Layout: 05/29 06:15:38PM '22 +0200
RFC1123: Sun, 29 May 2022 18:15:38 CEST
RFC1123Z: Sun, 29 May 2022 18:15:38 +0200
Kitchen: 6:15PM
RFC3339: 2022-05-29T18:15:38+02:00
RFC3339Nano: 2022-05-29T18:15:38.753172438+02:00
RFC822: 29 May 22 18:15 CEST
RFC822Z: 29 May 22 18:15 +0200
RFC850: Sunday, 29-May-22 18:15:38 CEST
RubyDate: Sun May 29 18:15:38 +0200 2022
UnixDate: Sun May 29 18:15:38 CEST 2022
RFC1123: Sun, 29 May 2022 18:15:38 CEST
RFC1123Z: Sun, 29 May 2022 18:15:38 +0200

## Go time format stamps

There are also predefined timestamp formats.

main.go
  

package main

import (
    "fmt"
    "time"
)

func main() {

    now := time.Now()

    fmt.Println("Stamp:", now.Format(time.Stamp))
    fmt.Println("StampMicro:", now.Format(time.StampMicro))
    fmt.Println("StampMilli:", now.Format(time.StampMilli))
    fmt.Println("StampNano:", now.Format(time.StampNano))
}

The example prints the current time in four available timestamps.

$ go run main.go
Stamp: May 29 18:20:00
StampMicro: May 29 18:20:00.571331
StampMilli: May 29 18:20:00.571
StampNano: May 29 18:20:00.571331153

## Source

[Go time package - reference](https://pkg.go.dev/time)

In this article we have worked with date and time in Go.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).