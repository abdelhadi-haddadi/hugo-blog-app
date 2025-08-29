+++
title = "Golang strconv.FormatFloat"
date = 2025-08-29T19:56:14.353+01:00
draft = false
description = "Learn how to convert float values to strings using strconv.FormatFloat in Go. Includes practical examples and formatting options."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.FormatFloat

last modified April 20, 2025

This tutorial explains how to use the strconv.FormatFloat function in Go.
We'll cover float-to-string conversion basics with practical examples.

The strconv.FormatFloat function converts a floating-point number to a string.
It provides precise control over formatting with various options.

FormatFloat takes four parameters: the float value, format byte, precision, and bitSize.
It returns the formatted string representation of the floating-point number.

## Basic strconv.FormatFloat Example

The simplest use of strconv.FormatFloat converts a float to a string.
Here we demonstrate basic conversion with default formatting.

basic_formatfloat.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    f := 123.456
    
    s := strconv.FormatFloat(f, 'f', -1, 64)
    fmt.Printf("Float %f converted to string '%s'\n", f, s)
}

We convert the float 123.456 to a string using 'f' format. The precision -1 means
use the smallest number of digits necessary. 64 specifies float64 type.

## Different Formatting Options

strconv.FormatFloat supports several format options. This example
shows different format specifiers in action.

format_options.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    f := 123.456
    
    fmt.Println("'f' format:", strconv.FormatFloat(f, 'f', 2, 64))
    fmt.Println("'e' format:", strconv.FormatFloat(f, 'e', 3, 64))
    fmt.Println("'E' format:", strconv.FormatFloat(f, 'E', 4, 64))
    fmt.Println("'g' format:", strconv.FormatFloat(f, 'g', -1, 64))
    fmt.Println("'G' format:", strconv.FormatFloat(f, 'G', 5, 64))
}

We demonstrate 'f' (decimal), 'e' (scientific), 'E' (scientific uppercase),
'g' (compact), and 'G' (compact uppercase) formats. Each has different output.

## Controlling Precision

The precision parameter controls how many digits are displayed. This example
shows how precision affects different format types.

precision_control.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    f := 123.456789
    
    for i := 0; i &lt;= 6; i++ {
        fmt.Printf("Precision %d: %s\n", 
            i, strconv.FormatFloat(f, 'f', i, 64))
    }
}

We gradually increase precision from 0 to 6 digits after the decimal point.
Higher precision values show more digits, rounding when necessary.

## Scientific Notation Formatting

Scientific notation is useful for very large or small numbers. This example
demonstrates scientific formatting options.

scientific_format.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    small := 0.0000123456
    large := 1234567890.12345
    
    fmt.Println("Small number:", strconv.FormatFloat(small, 'e', -1, 64))
    fmt.Println("Large number:", strconv.FormatFloat(large, 'E', 3, 64))
}

We format a very small number with 'e' and a large number with 'E'. Scientific
notation makes these values more readable and compact.

## Compact Formatting with 'g'

The 'g' format chooses between decimal and scientific notation automatically.
This example shows how it produces compact output.

compact_format.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numbers := []float64{123.456, 123456789.0, 0.0000123456}
    
    for _, num := range numbers {
        fmt.Println(strconv.FormatFloat(num, 'g', -1, 64))
    }
}

The 'g' format selects the most appropriate representation for each number.
Medium-sized numbers use decimal, while very large/small use scientific.

## Handling Special Float Values

strconv.FormatFloat correctly handles special float values like
Infinity and NaN. This example demonstrates their string representation.

special_values.go
  

package main

import (
    "fmt"
    "math"
    "strconv"
)

func main() {
    posInf := math.Inf(1)
    negInf := math.Inf(-1)
    nan := math.NaN()
    
    fmt.Println("Positive Infinity:", strconv.FormatFloat(posInf, 'f', -1, 64))
    fmt.Println("Negative Infinity:", strconv.FormatFloat(negInf, 'g', -1, 64))
    fmt.Println("NaN:", strconv.FormatFloat(nan, 'e', -1, 64))
}

Special float values are converted to their standard string representations.
Infinity becomes "+Inf" or "-Inf", while NaN becomes "NaN".

## Practical Example: CSV Data Formatting

This practical example shows using FormatFloat to prepare float
data for CSV output with controlled precision.

csv_formatting.go
  

package main

import (
    "fmt"
    "strconv"
)

type Measurement struct {
    Name  string
    Value float64
}

func main() {
    data := []Measurement{
        {"Temperature", 23.4567},
        {"Humidity", 45.6},
        {"Pressure", 1013.2468},
    }
    
    for _, m := range data {
        fmt.Printf("%s,%s\n", 
            m.Name, strconv.FormatFloat(m.Value, 'f', 2, 64))
    }
}

We format measurement values with 2 decimal places for consistent CSV output.
This ensures uniform precision in the generated data file.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.FormatFloat function in Go with
practical examples of float-to-string conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).