+++
title = "Golang strconv.AppendUint"
date = 2025-08-29T19:56:13.235+01:00
draft = false
description = "Learn how to append unsigned integer values to byte slices using strconv.AppendUint in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.AppendUint

last modified April 20, 2025

This tutorial explains how to use the strconv.AppendUint function in Go.
We'll cover unsigned integer to byte slice conversion with practical examples.

The strconv.AppendUint function appends the string representation of an
unsigned integer to a byte slice. It's efficient for building formatted output.

AppendUint is particularly useful when you need to build strings or byte slices
containing numeric values without creating intermediate string objects.

## Basic strconv.AppendUint Example

The simplest use of strconv.AppendUint appends an unsigned integer
to a byte slice. Here we demonstrate basic usage with base 10 conversion.

basic_appenduint.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Number: ")
    num := uint64(42)
    
    buf = strconv.AppendUint(buf, num, 10)
    fmt.Println(string(buf))
}

We start with a byte slice containing "Number: ". We append the string
representation of 42 to it. The result is printed as a string.

## Using Different Bases

strconv.AppendUint supports different numeric bases. This example
shows hexadecimal, binary, and octal representations.

different_bases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := uint64(255)
    
    buf10 := strconv.AppendUint([]byte{}, num, 10)
    buf16 := strconv.AppendUint([]byte{}, num, 16)
    buf2 := strconv.AppendUint([]byte{}, num, 2)
    buf8 := strconv.AppendUint([]byte{}, num, 8)
    
    fmt.Println("Decimal:", string(buf10))
    fmt.Println("Hexadecimal:", string(buf16))
    fmt.Println("Binary:", string(buf2))
    fmt.Println("Octal:", string(buf8))
}

We convert the same number (255) to different bases. Each conversion starts with
an empty byte slice. The results show different string representations.

## Building a Formatted String

This example demonstrates building a complex formatted string using multiple
AppendUint calls and other append operations.

formatted_string.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    buf := []byte("Values: ")
    
    for i := uint64(1); i &lt;= 5; i++ {
        buf = strconv.AppendUint(buf, i, 10)
        buf = append(buf, ' ')
    }
    
    fmt.Println(string(buf))
}

We start with "Values: " and append numbers 1 through 5 with spaces. The result
is a single string built efficiently without temporary allocations.

## Appending to Existing Data

This example shows how AppendUint can append to existing byte slices
containing other data, preserving the original content.

existing_data.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    data := []byte{0x48, 0x65, 0x6c, 0x6c, 0x6f} // "Hello" in ASCII
    num := uint64(12345)
    
    result := strconv.AppendUint(data, num, 10)
    fmt.Println(string(result))
}

We start with a byte slice containing "Hello". We append the number 12345 to it.
The result combines the original bytes with the new numeric representation.

## Performance Comparison

This example compares AppendUint with string concatenation to
demonstrate its performance benefits.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 100000
    num := uint64(42)
    
    // Using AppendUint
    start := time.Now()
    buf := []byte{}
    for i := 0; i &lt; iterations; i++ {
        buf = strconv.AppendUint(buf[:0], num, 10)
    }
    fmt.Println("AppendUint duration:", time.Since(start))
    
    // Using string concatenation
    start = time.Now()
    s := ""
    for i := 0; i &lt; iterations; i++ {
        s = strconv.FormatUint(num, 10)
    }
    fmt.Println("FormatUint duration:", time.Since(start))
}

AppendUint is generally more efficient than string concatenation for
building complex output. It avoids creating intermediate string objects.

## Error Handling with Invalid Bases

While AppendUint doesn't return errors, using invalid bases has
defined behavior. This example explores edge cases.

invalid_bases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := uint64(42)
    
    // Valid base
    buf10 := strconv.AppendUint([]byte{}, num, 10)
    fmt.Println("Base 10:", string(buf10))
    
    // Base 1 (invalid)
    buf1 := strconv.AppendUint([]byte{}, num, 1)
    fmt.Println("Base 1:", string(buf1))
    
    // Base 36 (valid)
    buf36 := strconv.AppendUint([]byte{}, num, 36)
    fmt.Println("Base 36:", string(buf36))
    
    // Base 37 (invalid)
    buf37 := strconv.AppendUint([]byte{}, num, 37)
    fmt.Println("Base 37:", string(buf37))
}

Bases outside 2-36 range fall back to base 10. This ensures the function always
produces valid output without panicking.

## Practical Example: Building a CSV Line

This practical example demonstrates using AppendUint to efficiently
build a CSV line containing numeric data.

csv_builder.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    values := []uint64{100, 200, 300, 400, 500}
    buf := []byte("ID,Value\n")
    
    for i, v := range values {
        buf = strconv.AppendUint(buf, uint64(i+1), 10)
        buf = append(buf, ',')
        buf = strconv.AppendUint(buf, v, 10)
        buf = append(buf, '\n')
    }
    
    fmt.Println(string(buf))
}

We build a CSV header and rows with sequential IDs and values. AppendUint
efficiently converts numbers to their string representation in the buffer.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.AppendUint function in Go with
practical examples of unsigned integer to byte slice conversion.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).