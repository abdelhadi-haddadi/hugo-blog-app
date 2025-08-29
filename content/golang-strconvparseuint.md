+++
title = "Golang strconv.ParseUint"
date = 2025-08-29T19:56:17.742+01:00
draft = false
description = "Learn how to parse unsigned integers from strings using strconv.ParseUint in Go. Includes practical examples and base options."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.ParseUint

last modified April 20, 2025

This tutorial explains how to use the strconv.ParseUint function in Go.
We'll cover string-to-unsigned-integer conversion basics with practical examples.

The strconv.ParseUint function converts a string to an unsigned integer.
It supports different bases (2 to 36) and returns the parsed value as uint64.

ParseUint is more flexible than Atoi as it handles different number bases and
ensures unsigned results. It returns the parsed value and an error for invalid input.

## Basic strconv.ParseUint Example

The simplest use of strconv.ParseUint converts a numeric string to an
unsigned integer. Here we demonstrate base 10 conversion with error handling.

basic_parseuint.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "42"
    
    num, err := strconv.ParseUint(numStr, 10, 64)
    if err != nil {
        fmt.Println("Conversion error:", err)
        return
    }
    
    fmt.Printf("String '%s' converted to uint64 %d\n", numStr, num)
}

We convert the string "42" to an unsigned 64-bit integer. The error is checked
to handle invalid input. Successful conversion prints the unsigned integer value.

## Handling Different Bases

strconv.ParseUint can parse numbers in different bases. This example
shows hexadecimal, binary, and base 8 (octal) conversions.

different_bases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Hexadecimal (base 16)
    hexNum, _ := strconv.ParseUint("2a", 16, 64)
    fmt.Println("Hexadecimal 2a:", hexNum)
    
    // Binary (base 2)
    binNum, _ := strconv.ParseUint("1010", 2, 64)
    fmt.Println("Binary 1010:", binNum)
    
    // Octal (base 8)
    octNum, _ := strconv.ParseUint("755", 8, 64)
    fmt.Println("Octal 755:", octNum)
}

We parse numbers in different bases by specifying the base parameter. The bit
size (64) determines the maximum value that can be represented.

## Handling Large Numbers

ParseUint can handle very large unsigned integers. This example shows
parsing numbers close to uint64's maximum value.

large_numbers.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    maxUint64 := "18446744073709551615"
    num, err := strconv.ParseUint(maxUint64, 10, 64)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    fmt.Printf("Max uint64: %d\n", num)
    
    // This will overflow
    overflow := "18446744073709551616"
    _, err = strconv.ParseUint(overflow, 10, 64)
    fmt.Println("Overflow error:", err)
}

We demonstrate parsing the maximum uint64 value and show what happens when
attempting to parse a value that's too large for uint64.

## Error Handling Scenarios

ParseUint returns specific errors for different invalid inputs.
This example demonstrates common error cases.

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
    }{
        {"-42", 10},    // Negative number
        {"12.3", 10},   // Decimal point
        {"abc", 10},    // Non-numeric
        {"123", 37},    // Invalid base
        {"", 10},       // Empty string
    }
    
    for _, tc := range testCases {
        _, err := strconv.ParseUint(tc.input, tc.base, 64)
        fmt.Printf("Input '%s' (base %d): %v\n", tc.input, tc.base, err)
    }
}

Each test case shows a different type of invalid input. The error messages help
identify exactly why the conversion failed for each case.

## Bit Size Variations

The bit size parameter affects the range of values that can be parsed. This
example shows different bit sizes and their effects.

bit_sizes.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "65535" // Max uint16 value
    
    // 8-bit
    u8, _ := strconv.ParseUint(numStr, 10, 8)
    fmt.Println("8-bit:", u8) // Will overflow
    
    // 16-bit
    u16, _ := strconv.ParseUint(numStr, 10, 16)
    fmt.Println("16-bit:", u16)
    
    // 32-bit
    u32, _ := strconv.ParseUint(numStr, 10, 32)
    fmt.Println("32-bit:", u32)
    
    // 64-bit
    u64, _ := strconv.ParseUint(numStr, 10, 64)
    fmt.Println("64-bit:", u64)
}

The same number string produces different results based on the bit size. Smaller
bit sizes may cause overflow errors if the number is too large.

## Practical Example: Hex Color Parser

This practical example demonstrates using ParseUint to parse
hexadecimal color codes into RGB components.

hex_color.go
  

package main

import (
    "fmt"
    "strconv"
)

func parseHexColor(color string) (r, g, b uint8, err error) {
    if len(color) != 7 || color[0] != '#' {
        return 0, 0, 0, fmt.Errorf("invalid color format")
    }
    
    // Parse red component
    r64, err := strconv.ParseUint(color[1:3], 16, 8)
    if err != nil {
        return 0, 0, 0, err
    }
    
    // Parse green component
    g64, err := strconv.ParseUint(color[3:5], 16, 8)
    if err != nil {
        return 0, 0, 0, err
    }
    
    // Parse blue component
    b64, err := strconv.ParseUint(color[5:7], 16, 8)
    if err != nil {
        return 0, 0, 0, err
    }
    
    return uint8(r64), uint8(g64), uint8(b64), nil
}

func main() {
    color := "#ff00ff"
    r, g, b, err := parseHexColor(color)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    
    fmt.Printf("Color %s: R=%d, G=%d, B=%d\n", color, r, g, b)
}

We parse a hexadecimal color string into its RGB components using ParseUint.
Each color component is parsed separately with base 16 and 8-bit size.

## Comparing ParseUint and ParseInt

This example shows the difference between ParseUint and ParseInt,
particularly when handling negative numbers.

compare_parsers.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "-42"
    
    // ParseUint fails with negative numbers
    u64, err := strconv.ParseUint(numStr, 10, 64)
    if err != nil {
        fmt.Println("ParseUint error:", err)
    } else {
        fmt.Println("ParseUint result:", u64)
    }
    
    // ParseInt handles negative numbers
    i64, err := strconv.ParseInt(numStr, 10, 64)
    if err != nil {
        fmt.Println("ParseInt error:", err)
    } else {
        fmt.Println("ParseInt result:", i64)
    }
}

ParseUint rejects negative numbers while ParseInt accepts them.
This demonstrates when to use each function based on input requirements.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.ParseUint function in Go with
practical examples of string-to-unsigned-integer conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).