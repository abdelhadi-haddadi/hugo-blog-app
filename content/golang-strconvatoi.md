+++
title = "Golang strconv.Atoi"
date = 2025-08-29T19:56:13.147+01:00
draft = false
description = "Learn how to convert strings to integers using strconv.Atoi in Go. Includes practical examples and error handling."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.Atoi

last modified April 20, 2025

This tutorial explains how to use the strconv.Atoi function in Go.
We'll cover string-to-integer conversion basics with practical examples.

The strconv.Atoi function converts a string to an integer. It's one
of the most commonly used functions in Go for parsing numeric input.

Atoi stands for "ASCII to integer". The function returns two values: the parsed
integer and an error. This is Go's idiomatic way of handling potential failures.

## Basic strconv.Atoi Example

The simplest use of strconv.Atoi converts a numeric string to an
integer. Here we demonstrate successful conversion and error handling.

basic_atoi.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    numStr := "42"
    
    num, err := strconv.Atoi(numStr)
    if err != nil {
        fmt.Println("Conversion error:", err)
        return
    }
    
    fmt.Printf("String '%s' converted to integer %d\n", numStr, num)
}

We convert the string "42" to an integer. The error is checked to handle cases
where conversion fails. Successful conversion prints the integer value.

## Handling Conversion Errors

strconv.Atoi returns an error for invalid numeric strings. This
example shows proper error handling for different input cases.

error_handling.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    testCases := []string{"123", "12.3", "abc", "123abc", ""}
    
    for _, tc := range testCases {
        num, err := strconv.Atoi(tc)
        if err != nil {
            fmt.Printf("'%s' is not a valid integer: %v\n", tc, err)
        } else {
            fmt.Printf("'%s' converted to %d\n", tc, num)
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
    
    fmt.Print("Enter a number: ")
    input, _ := reader.ReadString('\n')
    input = strings.TrimSpace(input)
    
    num, err := strconv.Atoi(input)
    if err != nil {
        fmt.Println("Please enter a valid integer")
        return
    }
    
    fmt.Printf("You entered: %d (double: %d)\n", num, num*2)
}

We read user input, trim whitespace, then attempt conversion. The program
provides feedback for invalid input and demonstrates using the converted value.

## Working with Different Bases

While Atoi only handles base 10, we can use ParseInt
for other bases. This example shows both approaches.

number_bases.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // Base 10 with Atoi
    num1, _ := strconv.Atoi("42")
    fmt.Println("Base 10:", num1)
    
    // Hexadecimal with ParseInt
    num2, _ := strconv.ParseInt("2a", 16, 64)
    fmt.Println("Hexadecimal:", num2)
    
    // Binary with ParseInt
    num3, _ := strconv.ParseInt("1010", 2, 64)
    fmt.Println("Binary:", num3)
}

Atoi is equivalent to ParseInt(s, 10, 0). For other
bases, ParseInt must be used directly with the appropriate base.

## Performance Considerations

For performance-critical code, avoiding repeated conversions can help. This
example benchmarks Atoi against alternatives.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 1000000
    testStr := "12345"
    
    // Benchmark Atoi
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        strconv.Atoi(testStr)
    }
    fmt.Println("Atoi duration:", time.Since(start))
    
    // Benchmark ParseInt
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        strconv.ParseInt(testStr, 10, 64)
    }
    fmt.Println("ParseInt duration:", time.Since(start))
}

Atoi is slightly faster than ParseInt for base 10
conversions. However, the difference is usually negligible for most use cases.

## Alternative: fmt.Sscanf

fmt.Sscanf provides another way to parse integers from strings.
This example compares it with Atoi.

sscanf.go
  

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
    
    // Using Sscanf
    var num2 int
    _, err2 := fmt.Sscanf(numStr, "%d", &amp;num2)
    if err2 != nil {
        fmt.Println("Sscanf error:", err2)
    } else {
        fmt.Println("Sscanf result:", num2)
    }
}

Sscanf is more flexible but slower than Atoi. Use
Atoi for simple integer conversions and Sscanf for
more complex parsing needs.

## Practical Example: Summing Numbers

This practical example demonstrates using Atoi to sum numbers from
command-line arguments with proper error handling.

sum_numbers.go
  

package main

import (
    "fmt"
    "os"
    "strconv"
)

func main() {
    if len(os.Args) &lt; 2 {
        fmt.Println("Please provide numbers to sum")
        return
    }
    
    var sum int
    for _, arg := range os.Args[1:] {
        num, err := strconv.Atoi(arg)
        if err != nil {
            fmt.Printf("'%s' is not a valid number\n", arg)
            return
        }
        sum += num
    }
    
    fmt.Println("Sum:", sum)
}

We iterate through command-line arguments, convert each to an integer, and
accumulate the sum. Invalid numbers terminate the program with an error message.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.Atoi function in Go with
practical examples of string-to-integer conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).