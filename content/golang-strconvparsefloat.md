+++
title = "Golang strconv.ParseFloat"
date = 2025-08-29T19:56:17.748+01:00
draft = false
description = "Learn how to parse floating-point numbers from strings using strconv.ParseFloat in Go. Includes practical examples and error handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.ParseFloat

last modified April 20, 2025

This tutorial explains how to use the strconv.ParseFloat function in Go.
We'll cover string-to-float conversion basics with practical examples.

The strconv.ParseFloat function converts a string to a floating-point number.
It's essential for parsing numeric input that may contain decimal points.

ParseFloat accepts strings representing floating-point numbers in decimal or
scientific notation. It returns two values: the parsed float and an error.
This follows Go's error handling pattern.

## Basic strconv.ParseFloat Example

The simplest use of strconv.ParseFloat converts a numeric string to
a float. Here we demonstrate successful conversion and error handling.

basic_parsefloat.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "3.1415"
    
    num, err := strconv.ParseFloat(numStr, 64)
    if err != nil {
        fmt.Println("Conversion error:", err)
        return
    }
    
    fmt.Printf("String '%s' converted to float %f\n", numStr, num)
}

We convert the string "3.1415" to a float64. The error is checked to handle cases
where conversion fails. Successful conversion prints the floating-point value.

## Handling Conversion Errors

strconv.ParseFloat returns an error for invalid numeric strings.
This example shows proper error handling for different input cases.

error_handling.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []string{"3.14", "1.5e2", "abc", "123.45.67", ""}
    
    for _, tc := range testCases {
        num, err := strconv.ParseFloat(tc, 64)
        if err != nil {
            fmt.Printf("'%s' is not a valid float: %v\n", tc, err)
        } else {
            fmt.Printf("'%s' converted to %f\n", tc, num)
        }
    }
}

We test various string inputs, including valid and invalid cases. The error
message helps identify why conversion failed for each invalid input.

## Converting User Input

A common use case is converting command-line arguments or user input. This
example demonstrates reading and converting numbers from standard input.

user_input.go
  

package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func main() {
    reader := bufio.NewReader(os.Stdin)
    
    fmt.Print("Enter a floating-point number: ")
    input, _ := reader.ReadString('\n')
    input = strings.TrimSpace(input)
    
    num, err := strconv.ParseFloat(input, 64)
    if err != nil {
        fmt.Println("Please enter a valid floating-point number")
        return
    }
    
    fmt.Printf("You entered: %f (square: %f)\n", num, num*num)
}

We read user input, trim whitespace, then attempt conversion. The program
provides feedback for invalid input and demonstrates using the converted value.

## Working with Different Bit Sizes

ParseFloat can return either float32 or float64 values based on the
bitSize parameter. This example shows both approaches.

bit_sizes.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "123.45678901234567890"
    
    // 32-bit float
    num32, _ := strconv.ParseFloat(numStr, 32)
    fmt.Printf("32-bit float: %f\n", num32)
    
    // 64-bit float
    num64, _ := strconv.ParseFloat(numStr, 64)
    fmt.Printf("64-bit float: %f\n", num64)
    
    fmt.Printf("Precision difference: %.20f vs %.20f\n", num32, num64)
}

The bitSize parameter (32 or 64) determines the precision of the returned value.
Float64 provides more precision but uses more memory than float32.

## Scientific Notation Support

ParseFloat supports scientific notation. This example demonstrates
converting numbers in scientific format.

scientific_notation.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    scientificNumbers := []string{"1.23e3", "1.23E3", "1e-5", "-2.5e-2"}
    
    for _, sn := range scientificNumbers {
        num, err := strconv.ParseFloat(sn, 64)
        if err != nil {
            fmt.Printf("Failed to parse '%s': %v\n", sn, err)
        } else {
            fmt.Printf("'%s' = %f\n", sn, num)
        }
    }
}

Scientific notation (using 'e' or 'E') is commonly used for very large or very
small numbers. ParseFloat handles both positive and negative exponents.

## Alternative: fmt.Sscanf

fmt.Sscanf provides another way to parse floats from strings.
This example compares it with ParseFloat.

sscanf.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "3.14159"
    
    // Using ParseFloat
    num1, err1 := strconv.ParseFloat(numStr, 64)
    if err1 != nil {
        fmt.Println("ParseFloat error:", err1)
    } else {
        fmt.Println("ParseFloat result:", num1)
    }
    
    // Using Sscanf
    var num2 float64
    _, err2 := fmt.Sscanf(numStr, "%f", &amp;num2)
    if err2 != nil {
        fmt.Println("Sscanf error:", err2)
    } else {
        fmt.Println("Sscanf result:", num2)
    }
}

Sscanf is more flexible but slower than ParseFloat. Use
ParseFloat for simple float conversions and Sscanf for
more complex parsing needs.

## Practical Example: Calculating Average

This practical example demonstrates using ParseFloat to calculate
the average of numbers from command-line arguments.

average.go
  

package main

import (
    "fmt"
    "os"
    "strconv"
)

func main() {
    if len(os.Args) &lt; 2 {
        fmt.Println("Please provide numbers to average")
        return
    }
    
    var sum float64
    count := len(os.Args[1:])
    
    for _, arg := range os.Args[1:] {
        num, err := strconv.ParseFloat(arg, 64)
        if err != nil {
            fmt.Printf("'%s' is not a valid number\n", arg)
            return
        }
        sum += num
    }
    
    average := sum / float64(count)
    fmt.Printf("Average: %.2f\n", average)
}

We iterate through command-line arguments, convert each to a float, and
calculate the average. Invalid numbers terminate the program with an error.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.ParseFloat function in Go with
practical examples of string-to-float conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).