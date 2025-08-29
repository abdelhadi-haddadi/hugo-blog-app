+++
title = "Golang strconv.FormatUint"
date = 2025-08-29T19:56:15.504+01:00
draft = false
description = "Learn how to convert unsigned integer values to strings using strconv.FormatUint in Go. Includes practical examples and base options."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.FormatUint

last modified April 20, 2025

This tutorial explains how to use the strconv.FormatUint function in Go.
We'll cover unsigned integer-to-string conversion basics with practical examples.

The strconv.FormatUint function converts an unsigned integer to a string.
It provides flexible formatting options including different number bases.

FormatUint returns the string representation of an unsigned integer in a given base.
The base must be between 2 and 36. For base 10, it's similar to fmt.Sprintf.

## Basic strconv.FormatUint Example

The simplest use of strconv.FormatUint converts an unsigned integer to
a base 10 string. Here we demonstrate basic conversion.

basic_formatuint.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := uint64(42)
    str := strconv.FormatUint(num, 10)
    
    fmt.Printf("Unsigned integer %d converted to string '%s'\n", num, str)
}

We convert the unsigned integer 42 to a base 10 string. The function returns the
string representation without any error possibility.

## Converting to Different Bases

strconv.FormatUint supports conversion to various bases. This example
shows hexadecimal, binary, and octal conversions.

different_bases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := uint64(255)
    
    fmt.Println("Base 10:", strconv.FormatUint(num, 10))
    fmt.Println("Hexadecimal:", strconv.FormatUint(num, 16))
    fmt.Println("Binary:", strconv.FormatUint(num, 2))
    fmt.Println("Octal:", strconv.FormatUint(num, 8))
}

We convert the same number to different string representations. The base parameter
determines the numeric system used for conversion.

## Formatting Large Numbers

FormatUint can handle very large unsigned integers. This example
demonstrates conversion of maximum uint64 values.

large_numbers.go
  

package main

import (
    "fmt"
    "math"
    "strconv"
)

func main() {
    maxUint64 := uint64(math.MaxUint64)
    str := strconv.FormatUint(maxUint64, 10)
    
    fmt.Printf("Maximum uint64 value: %d\n", maxUint64)
    fmt.Printf("As string: %s\n", str)
    fmt.Println("Length:", len(str))
}

We convert the maximum uint64 value to a string. The function handles the full
range of uint64 values without any issues.

## Performance Comparison

This example compares FormatUint with fmt.Sprintf for
unsigned integer formatting.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 1000000
    num := uint64(123456789)
    
    // Benchmark FormatUint
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        strconv.FormatUint(num, 10)
    }
    fmt.Println("FormatUint duration:", time.Since(start))
    
    // Benchmark fmt.Sprintf
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        fmt.Sprintf("%d", num)
    }
    fmt.Println("Sprintf duration:", time.Since(start))
}

FormatUint is generally faster than fmt.Sprintf for
simple unsigned integer conversions. The difference matters in performance-critical code.

## Custom Number Formatting

This example shows how to create custom number formatting using FormatUint
with additional string manipulation.

custom_formatting.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
)

func formatWithCommas(num uint64) string {
    str := strconv.FormatUint(num, 10)
    var parts []string
    
    for i := len(str); i &gt; 0; i -= 3 {
        start := i - 3
        if start &lt; 0 {
            start = 0
        }
        parts = append([]string{str[start:i]}, parts...)
    }
    
    return strings.Join(parts, ",")
}

func main() {
    num := uint64(1234567890)
    fmt.Println("Formatted with commas:", formatWithCommas(num))
}

We convert the number to a string then add comma separators. This demonstrates
how FormatUint can be part of more complex formatting solutions.

## Hexadecimal with Prefix

This example shows how to create hexadecimal strings with the "0x" prefix using
FormatUint.

hex_prefix.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := uint64(255)
    hexStr := "0x" + strconv.FormatUint(num, 16)
    
    fmt.Println("Hexadecimal with prefix:", hexStr)
    
    // Uppercase hexadecimal
    upperHex := "0X" + strconv.FormatUint(num, 16)
    fmt.Println("Uppercase hexadecimal:", upperHex)
}

We concatenate the "0x" prefix with the hexadecimal string. For uppercase letters,
we can use "0X" prefix instead.

## Practical Example: File Permissions

This practical example demonstrates using FormatUint to convert Unix
file permissions to octal strings.

file_permissions.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    permissions := uint64(0644) // Common file permission
    permStr := strconv.FormatUint(permissions, 8)
    
    fmt.Printf("Permissions: %s (octal)\n", permStr)
    fmt.Printf("Equivalent to: -rw-r--r--\n")
    
    // Convert back to verify
    parsed, _ := strconv.ParseUint(permStr, 8, 64)
    fmt.Printf("Parsed back: %#o\n", parsed)
}

We convert file permissions to an octal string. The example shows how this can be
useful in system programming contexts.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.FormatUint function in Go with
practical examples of unsigned integer-to-string conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).