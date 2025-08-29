+++
title = "Golang strconv.ParseInt"
date = 2025-08-29T19:56:17.760+01:00
draft = false
description = "Learn how to parse integers from strings using strconv.ParseInt in Go. Includes practical examples and base options."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.ParseInt

last modified April 20, 2025

This tutorial explains how to use the strconv.ParseInt function in Go.
We'll cover string-to-integer conversion with different bases and bit sizes.

The strconv.ParseInt function converts a string to an integer with
specified base (0 to 36) and bit size (0 to 64). It's more flexible than Atoi.

ParseInt interprets a string in the given base and returns the corresponding
value. It returns two values: the parsed integer and an error if conversion fails.

## Basic strconv.ParseInt Example

The simplest use of strconv.ParseInt converts a base-10 string to
a 64-bit integer. Here we demonstrate successful conversion and error handling.

basic_parseint.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "42"
    
    num, err := strconv.ParseInt(numStr, 10, 64)
    if err != nil {
        fmt.Println("Conversion error:", err)
        return
    }
    
    fmt.Printf("String '%s' converted to integer %d\n", numStr, num)
}

We convert the string "42" to a 64-bit integer using base 10. The error is
checked to handle cases where conversion fails. Successful conversion prints
the integer value.

## Handling Different Bases

strconv.ParseInt can parse numbers in various bases. This example
shows conversion of hexadecimal, binary, and octal numbers.

different_bases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Hexadecimal (base 16)
    hexNum, _ := strconv.ParseInt("2a", 16, 64)
    fmt.Println("Hexadecimal 2a:", hexNum)
    
    // Binary (base 2)
    binNum, _ := strconv.ParseInt("1010", 2, 64)
    fmt.Println("Binary 1010:", binNum)
    
    // Octal (base 8)
    octNum, _ := strconv.ParseInt("12", 8, 64)
    fmt.Println("Octal 12:", octNum)
}

We demonstrate parsing numbers in base 16 (hex), base 2 (binary), and base 8
(octal). The function handles all these cases correctly when given the right base.

## Automatic Base Detection

When base 0 is specified, ParseInt detects the base from the string prefix. This
example shows how it works with different number formats.

auto_base.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Detects base from prefix
    decNum, _ := strconv.ParseInt("42", 0, 64)
    hexNum, _ := strconv.ParseInt("0x2a", 0, 64)
    octNum, _ := strconv.ParseInt("052", 0, 64)
    
    fmt.Println("Decimal 42:", decNum)
    fmt.Println("Hexadecimal 0x2a:", hexNum)
    fmt.Println("Octal 052:", octNum)
}

With base 0, the function recognizes 0x prefix as hex and 0 prefix as octal.
No prefix means base 10. This provides flexible input handling.

## Handling Different Bit Sizes

The bitSize parameter determines the integer type that will hold the result.
This example shows conversions to different bit sizes.

bit_sizes.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // 8-bit integer
    num8, _ := strconv.ParseInt("127", 10, 8)
    fmt.Printf("8-bit: %d (type: %T)\n", num8, num8)
    
    // 16-bit integer
    num16, _ := strconv.ParseInt("32767", 10, 16)
    fmt.Printf("16-bit: %d (type: %T)\n", num16, num16)
    
    // 32-bit integer
    num32, _ := strconv.ParseInt("2147483647", 10, 32)
    fmt.Printf("32-bit: %d (type: %T)\n", num32, num32)
    
    // 64-bit integer
    num64, _ := strconv.ParseInt("9223372036854775807", 10, 64)
    fmt.Printf("64-bit: %d (type: %T)\n", num64, num64)
}

The bitSize parameter affects the return type. Values beyond the specified size
will return an error. The actual type is always int64 regardless of bitSize.

## Error Handling Scenarios

ParseInt can fail for various reasons. This example demonstrates different error
cases and how to handle them properly.

error_cases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []struct {
        input string
        base  int
        bits  int
    }{
        {"123", 10, 64},
        {"12.3", 10, 64},
        {"abc", 10, 64},
        {"123abc", 10, 64},
        {"", 10, 64},
        {"7fffffffffffffff", 16, 32},
    }
    
    for _, tc := range testCases {
        _, err := strconv.ParseInt(tc.input, tc.base, tc.bits)
        if err != nil {
            fmt.Printf("Error parsing '%s' (base %d, bits %d): %v\n",
                tc.input, tc.base, tc.bits, err)
        }
    }
}

We test various error scenarios including invalid characters, empty strings,
and overflow conditions. Each error provides specific information about the failure.

## Comparing ParseInt and Atoi

strconv.Atoi is actually a wrapper for ParseInt. This
example shows their relationship and when to use each.

atoi_comparison.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "42"
    
    // Using Atoi
    num1, err1 := strconv.Atoi(numStr)
    if err1 != nil {
        fmt.Println("Atoi error:", err1)
    } else {
        fmt.Println("Atoi result:", num1)
    }
    
    // Equivalent ParseInt call
    num2, err2 := strconv.ParseInt(numStr, 10, 0)
    if err2 != nil {
        fmt.Println("ParseInt error:", err2)
    } else {
        fmt.Println("ParseInt result:", num2)
    }
}

Atoi is simpler for base-10 conversions, while ParseInt
offers more control. They produce identical results for valid base-10 input.

## Practical Example: Hex Color Parser

This practical example demonstrates using ParseInt to parse RGB color
values from hexadecimal strings.

hex_color.go
  

package main

import (
    "fmt"
    "strconv"
)

func parseHexColor(color string) (r, g, b int, err error) {
    if len(color) != 7 || color[0] != '#' {
        return 0, 0, 0, fmt.Errorf("invalid color format")
    }
    
    // Parse red component
    r64, err := strconv.ParseInt(color[1:3], 16, 64)
    if err != nil {
        return 0, 0, 0, err
    }
    
    // Parse green component
    g64, err := strconv.ParseInt(color[3:5], 16, 64)
    if err != nil {
        return 0, 0, 0, err
    }
    
    // Parse blue component
    b64, err := strconv.ParseInt(color[5:7], 16, 64)
    if err != nil {
        return 0, 0, 0, err
    }
    
    return int(r64), int(g64), int(b64), nil
}

func main() {
    color := "#ff00cc"
    r, g, b, err := parseHexColor(color)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    fmt.Printf("Color %s: R=%d, G=%d, B=%d\n", color, r, g, b)
}

We parse a hexadecimal color string into its RGB components. Each color channel
is extracted as a substring and converted using base-16 parsing.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.ParseInt function in Go with
practical examples of string-to-integer conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).