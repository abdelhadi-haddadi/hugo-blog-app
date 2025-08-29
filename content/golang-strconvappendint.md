+++
title = "Golang strconv.AppendInt"
date = 2025-08-29T19:56:10.896+01:00
draft = false
description = "Learn how to append integer values to byte slices using strconv.AppendInt in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendInt

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendInt function in Go.
We'll cover integer-to-byte-slice conversion with practical examples.

The strconv.AppendInt function appends the string representation of an
integer to a byte slice. It's efficient for building byte buffers with numbers.

AppendInt is useful when you need to construct byte slices containing numeric
values. It avoids temporary string allocations compared to string conversion.

## Basic strconv.AppendInt Example

The simplest use of strconv.AppendInt appends an integer to a byte
slice. The function returns the extended slice with the number's string form.

basic_appendint.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Number: ")
    buf = strconv.AppendInt(buf, 42, 10)
    
    fmt.Println(string(buf))
}

We start with a byte slice containing "Number: ". AppendInt adds "42" to it.
The base parameter (10) specifies decimal representation. The result is printed.

## Appending to an Empty Slice

strconv.AppendInt works with empty slices. This example shows how
to build a byte slice from scratch with multiple integer values.

empty_slice.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    var buf []byte
    
    buf = strconv.AppendInt(buf, 10, 10)
    buf = append(buf, ' ')
    buf = strconv.AppendInt(buf, 20, 10)
    buf = append(buf, ' ')
    buf = strconv.AppendInt(buf, 30, 10)
    
    fmt.Println(string(buf))
}

We initialize an empty byte slice and append three numbers with spaces between.
Each AppendInt call returns a new slice that we reassign to buf. The result is
"10 20 30".

## Different Number Bases

The base parameter controls the numeric representation. This example demonstrates
conversion to binary, octal, decimal, and hexadecimal formats.

number_bases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Bases: ")
    
    buf = strconv.AppendInt(buf, 42, 2)  // binary
    buf = append(buf, ' ')
    buf = strconv.AppendInt(buf, 42, 8)  // octal
    buf = append(buf, ' ')
    buf = strconv.AppendInt(buf, 42, 10) // decimal
    buf = append(buf, ' ')
    buf = strconv.AppendInt(buf, 42, 16) // hexadecimal
    
    fmt.Println(string(buf))
}

We append the number 42 in four different bases. The base must be between 2 and
36. For bases &gt; 10, lowercase letters a-z are used for digits &gt;= 10.

## Negative Numbers

strconv.AppendInt correctly handles negative integers. This example
shows how negative values are formatted in the output.

negative_numbers.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Temperatures: ")
    
    buf = strconv.AppendInt(buf, -10, 10)
    buf = append(buf, '°', ' ')
    buf = strconv.AppendInt(buf, 0, 10)
    buf = append(buf, '°', ' ')
    buf = strconv.AppendInt(buf, 25, 10)
    buf = append(buf, '°')
    
    fmt.Println(string(buf))
}

Negative numbers are prefixed with a minus sign. We also demonstrate appending
non-numeric bytes (° symbol) alongside the numeric values in the same slice.

## Building a CSV Line

This practical example shows how to construct a CSV line with integer values
using strconv.AppendInt for efficient string building.

csv_builder.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    values := []int64{100, 200, 300, 400, 500}
    buf := []byte("ID,Value\n")
    
    for i, v := range values {
        buf = strconv.AppendInt(buf, int64(i+1), 10)
        buf = append(buf, ',')
        buf = strconv.AppendInt(buf, v, 10)
        buf = append(buf, '\n')
    }
    
    fmt.Println(string(buf))
}

We build a CSV header and rows with sequential IDs and values. AppendInt is used
for both the ID counter and the values. This avoids string conversions.

## Performance Comparison

This example compares strconv.AppendInt with string concatenation
for building strings with numbers, showing the performance advantage.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
    "time"
)

func appendIntMethod(n int) string {
    buf := []byte{}
    for i := 0; i &lt; n; i++ {
        buf = strconv.AppendInt(buf, int64(i), 10)
        buf = append(buf, ' ')
    }
    return string(buf)
}

func stringConcatMethod(n int) string {
    var s string
    for i := 0; i &lt; n; i++ {
        s += strconv.Itoa(i) + " "
    }
    return s
}

func main() {
    const count = 10000
    
    start := time.Now()
    appendIntMethod(count)
    fmt.Println("AppendInt duration:", time.Since(start))
    
    start = time.Now()
    stringConcatMethod(count)
    fmt.Println("String concat duration:", time.Since(start))
}

AppendInt is significantly faster for building large strings with numbers because
it avoids temporary string allocations. The difference grows with larger inputs.

## Custom Number Formatting

This advanced example demonstrates building a custom number formatter with
thousands separators using strconv.AppendInt.

custom_format.go
  

package main

import (
    "fmt"
    "strconv"
)

func formatWithCommas(n int64) string {
    if n == 0 {
        return "0"
    }
    
    var buf []byte
    negative := n &lt; 0
    if negative {
        n = -n
    }
    
    for i := 0; n &gt; 0; i++ {
        if i &gt; 0 &amp;&amp; i%3 == 0 {
            buf = append([]byte{','}, buf...)
        }
        digit := byte('0' + n%10)
        buf = append([]byte{digit}, buf...)
        n /= 10
    }
    
    if negative {
        buf = append([]byte{'-'}, buf...)
    }
    
    return string(buf)
}

func main() {
    fmt.Println(formatWithCommas(0))
    fmt.Println(formatWithCommas(42))
    fmt.Println(formatWithCommas(1234))
    fmt.Println(formatWithCommas(987654321))
    fmt.Println(formatWithCommas(-12345678))
}

We build the number string digit by digit from right to left, inserting commas
every three digits. This shows how AppendInt-like logic can be customized.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendInt function in Go with
practical examples of efficient integer-to-byte-slice conversion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).