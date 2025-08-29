+++
title = "Golang strconv.FormatInt"
date = 2025-08-29T19:56:15.514+01:00
draft = false
description = "Learn how to convert integer values to strings using strconv.FormatInt in Go. Includes practical examples and base options."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.FormatInt

last modified April 20, 2025

This tutorial explains how to use the strconv.FormatInt function in Go.
We'll cover integer-to-string conversion basics with practical examples.

The strconv.FormatInt function converts an integer to a string. It's one
of the most commonly used functions in Go for formatting numeric output.

FormatInt allows specifying the base for conversion (2-36). The function returns
the string representation of the integer in the specified base.

## Basic strconv.FormatInt Example

The simplest use of strconv.FormatInt converts an integer to a
base 10 string. Here we demonstrate basic conversion.

basic_formatint.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := int64(42)
    str := strconv.FormatInt(num, 10)
    
    fmt.Printf("Integer %d converted to string '%s'\n", num, str)
}

We convert the integer 42 to a base 10 string. The function takes an int64 value
and returns its string representation in the specified base.

## Converting to Different Bases

strconv.FormatInt supports conversion to various bases. This example
shows conversions to binary, octal, decimal, and hexadecimal.

different_bases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := int64(42)
    
    fmt.Println("Binary:", strconv.FormatInt(num, 2))
    fmt.Println("Octal:", strconv.FormatInt(num, 8))
    fmt.Println("Decimal:", strconv.FormatInt(num, 10))
    fmt.Println("Hexadecimal:", strconv.FormatInt(num, 16))
}

We convert the same number to different bases. Base 2 gives binary, 8 gives octal,
10 gives decimal, and 16 gives hexadecimal representation.

## Handling Negative Numbers

strconv.FormatInt properly handles negative numbers. This example
demonstrates conversion of negative values.

negative_numbers.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := int64(-42)
    
    fmt.Println("Decimal:", strconv.FormatInt(num, 10))
    fmt.Println("Hexadecimal:", strconv.FormatInt(num, 16))
    fmt.Println("Binary:", strconv.FormatInt(num, 2))
}

Negative numbers are converted with a leading minus sign. The base conversion
works the same way as with positive numbers.

## FormatInt vs Itoa

strconv.Itoa is a simpler alternative for base 10 conversion. This
example compares FormatInt and Itoa.

formatint_vs_itoa.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := int64(42)
    
    // Using FormatInt for base 10
    str1 := strconv.FormatInt(num, 10)
    fmt.Println("FormatInt:", str1)
    
    // Using Itoa (only for base 10)
    str2 := strconv.Itoa(int(num))
    fmt.Println("Itoa:", str2)
}

Itoa is more convenient for base 10 conversion of int values.
FormatInt is needed for other bases or when working with int64.

## Performance Considerations

For performance-critical code, understanding conversion costs is important. This
example benchmarks FormatInt against alternatives.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 1000000
    num := int64(12345)
    
    // Benchmark FormatInt
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        strconv.FormatInt(num, 10)
    }
    fmt.Println("FormatInt duration:", time.Since(start))
    
    // Benchmark fmt.Sprintf
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        fmt.Sprintf("%d", num)
    }
    fmt.Println("Sprintf duration:", time.Since(start))
}

FormatInt is significantly faster than fmt.Sprintf for
integer-to-string conversion. Use FormatInt when performance matters.

## Alternative: fmt.Sprintf

fmt.Sprintf provides another way to format integers as strings. This
example compares it with FormatInt.

sprintf.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := int64(42)
    
    // Using FormatInt
    str1 := strconv.FormatInt(num, 10)
    fmt.Println("FormatInt result:", str1)
    
    // Using Sprintf
    str2 := fmt.Sprintf("%d", num)
    fmt.Println("Sprintf result:", str2)
}

Sprintf is more flexible but slower than FormatInt. Use
FormatInt for simple conversions and Sprintf when you need complex formatting.

## Practical Example: Number Formatting

This practical example demonstrates using FormatInt to create formatted number
strings with padding and different bases.

number_formatting.go
  

package main

import (
    "fmt"
    "strconv"
    "strings"
)

func main() {
    numbers := []int64{7, 42, 255, 1024, 65535}
    
    for _, num := range numbers {
        // Format with leading zeros
        dec := strconv.FormatInt(num, 10)
        dec = fmt.Sprintf("%06s", dec)
        
        // Format as hexadecimal
        hex := strconv.FormatInt(num, 16)
        hex = strings.ToUpper(hex)
        hex = fmt.Sprintf("0x%04s", hex)
        
        fmt.Printf("%d → Dec: %s, Hex: %s\n", num, dec, hex)
    }
}

We format numbers with leading zeros and hexadecimal prefixes. FormatInt provides
the base conversion, while fmt.Sprintf handles the padding.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.FormatInt function in Go with
practical examples of integer-to-string conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).