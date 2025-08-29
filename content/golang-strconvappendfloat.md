+++
title = "Golang strconv.AppendFloat"
date = 2025-08-29T19:56:09.618+01:00
draft = false
description = "Learn how to append float values to byte slices using strconv.AppendFloat in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendFloat

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendFloat function in Go.
We'll cover float-to-string conversion basics with practical examples.

The strconv.AppendFloat function converts a floating-point number to a string
and appends it to a byte slice. It provides precise control over formatting.

AppendFloat is efficient for building strings with float values, as it avoids
allocations by appending directly to existing byte slices. It supports various
formatting options and precisions.

## Basic strconv.AppendFloat Example

The simplest use of strconv.AppendFloat converts a float to a string
and appends it to a byte slice. Here we demonstrate basic usage.

basic_appendfloat.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Value: ")
    f := 3.14159
    
    buf = strconv.AppendFloat(buf, f, 'f', 2, 64)
    
    fmt.Println(string(buf))
}

We start with a byte slice containing "Value: " and append a formatted float.
The 'f' format specifies fixed-point notation, with 2 decimal places.

## Different Formatting Options

strconv.AppendFloat supports several formatting options. This
example demonstrates the 'f', 'e', 'g', and 'b' formats.

formats.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    f := 1234.5678
    
    fmt.Println(string(strconv.AppendFloat([]byte{}, f, 'f', 2, 64)))
    fmt.Println(string(strconv.AppendFloat([]byte{}, f, 'e', 2, 64)))
    fmt.Println(string(strconv.AppendFloat([]byte{}, f, 'g', 4, 64)))
    fmt.Println(string(strconv.AppendFloat([]byte{}, f, 'b', -1, 64)))
}

Each format produces different output: 'f' for fixed-point, 'e' for scientific
notation, 'g' for compact representation, and 'b' for binary exponent.

## Controlling Precision

The precision parameter controls how many digits are displayed. This example
shows different precision values with the same float.

precision.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    f := 3.141592653589793
    
    for _, prec := range []int{0, 2, 4, 6, 8} {
        buf := strconv.AppendFloat([]byte("π ≈ "), f, 'f', prec, 64)
        fmt.Println(string(buf))
    }
}

We demonstrate π with increasing precision levels. Higher precision values show
more decimal places in the output.

## Building Complex Strings

AppendFloat is useful for building complex strings efficiently.
This example creates a formatted measurement string.

complex_string.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    temp := 23.456
    humidity := 45.678
    
    buf := []byte("Current conditions: ")
    buf = strconv.AppendFloat(buf, temp, 'f', 1, 64)
    buf = append(buf, "°C, "...)
    buf = strconv.AppendFloat(buf, humidity, 'f', 1, 64)
    buf = append(buf, "% humidity"...)
    
    fmt.Println(string(buf))
}

We build a weather report string by appending multiple float values and text.
This approach minimizes allocations compared to string concatenation.

## Handling Special Float Values

AppendFloat correctly handles special float values like NaN and
infinity. This example demonstrates their string representations.

special_values.go
  

package main

import (
    "fmt"
    "math"
    "strconv"
)

func main() {
    values := []float64{
        math.NaN(),
        math.Inf(1),
        math.Inf(-1),
        0.0,
    }
    
    for _, v := range values {
        buf := strconv.AppendFloat([]byte{}, v, 'g', -1, 64)
        fmt.Println(string(buf))
    }
}

Special float values are converted to their string representations: "NaN" for
not-a-number, "+Inf" for positive infinity, and "-Inf" for negative infinity.

## Performance Comparison

This example compares AppendFloat with fmt.Sprintf for
float-to-string conversion performance.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 1000000
    f := 123.456789
    
    // Benchmark AppendFloat
    start := time.Now()
    buf := make([]byte, 0, 32)
    for i := 0; i &lt; iterations; i++ {
        buf = strconv.AppendFloat(buf[:0], f, 'f', 2, 64)
    }
    fmt.Println("AppendFloat duration:", time.Since(start))
    
    // Benchmark Sprintf
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        _ = fmt.Sprintf("%.2f", f)
    }
    fmt.Println("Sprintf duration:", time.Since(start))
}

AppendFloat is significantly faster than fmt.Sprintf
for float formatting, especially when building strings in performance-critical code.

## Practical Example: CSV Generation

This practical example demonstrates using AppendFloat to generate
CSV data with float values efficiently.

csv_generation.go
  

package main

import (
    "fmt"
    "strconv"
)

type Measurement struct {
    Time  float64
    Value float64
}

func main() {
    data := []Measurement{
        {0.0, 12.3},
        {1.0, 15.6},
        {2.0, 18.2},
        {3.0, 22.1},
    }
    
    var csv []byte
    csv = append(csv, "time,value\n"...)
    
    for _, m := range data {
        csv = strconv.AppendFloat(csv, m.Time, 'f', 1, 64)
        csv = append(csv, ',')
        csv = strconv.AppendFloat(csv, m.Value, 'f', 1, 64)
        csv = append(csv, '\n')
    }
    
    fmt.Println(string(csv))
}

We generate CSV output by appending float values directly to a byte slice.
This approach is memory-efficient and avoids unnecessary string allocations.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendFloat function in Go with
practical examples of float-to-string conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).