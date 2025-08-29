+++
title = "Golang strconv.Itoa"
date = 2025-08-29T19:56:16.642+01:00
draft = false
description = "Learn how to convert integers to strings using strconv.Itoa in Go. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang strconv.Itoa

last modified April 20, 2025

This tutorial explains how to use the strconv.Itoa function in Go.
We'll cover integer-to-string conversion basics with practical examples.

The strconv.Itoa function converts an integer to its string
representation. It's a simple and efficient way to format numbers as strings.

Itoa stands for "integer to ASCII". The function takes an integer and returns
its base 10 string representation. It's the inverse of strconv.Atoi.

## Basic strconv.Itoa Example

The simplest use of strconv.Itoa converts an integer to a string.
Here we demonstrate basic conversion with different integer values.

basic_itoa.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := 42
    str := strconv.Itoa(num)
    
    fmt.Printf("Integer %d converted to string '%s'\n", num, str)
    
    // Negative number
    negNum := -123
    negStr := strconv.Itoa(negNum)
    fmt.Printf("Integer %d converted to string '%s'\n", negNum, negStr)
}

We convert both positive and negative integers to their string representations.
The function handles all valid integer values without error checking needed.

## Formatting Different Integer Types

While Itoa works with int, other integer types need
conversion first. This example shows handling of various integer types.

different_types.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    // int8
    var num8 int8 = 127
    str8 := strconv.Itoa(int(num8))
    fmt.Println("int8:", str8)
    
    // int64
    var num64 int64 = 9223372036854775807
    str64 := strconv.Itoa(int(num64))
    fmt.Println("int64:", str64)
    
    // uint
    var numUint uint = 42
    strUint := strconv.Itoa(int(numUint))
    fmt.Println("uint:", strUint)
}

We convert different integer types by first casting them to int.
This ensures compatibility with Itoa which only accepts int.

## Concatenating Numbers with Strings

A common use case is building strings that include numbers. This example shows
how to concatenate integers with other strings.

concatenation.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    age := 30
    name := "Alice"
    
    // Using fmt.Sprintf
    msg1 := fmt.Sprintf("%s is %d years old", name, age)
    fmt.Println(msg1)
    
    // Using strconv.Itoa and string concatenation
    msg2 := name + " is " + strconv.Itoa(age) + " years old"
    fmt.Println(msg2)
    
    // Building a filename
    fileNum := 5
    filename := "data_" + strconv.Itoa(fileNum) + ".txt"
    fmt.Println("Filename:", filename)
}

Itoa enables direct string concatenation with numbers. This is
useful for building dynamic strings like filenames or messages.

## Performance Comparison with fmt.Sprintf

For converting integers to strings, Itoa is faster than
fmt.Sprintf. This example benchmarks both approaches.

performance.go
  

package main

import (
    "fmt"
    "strconv"
    "time"
)

func main() {
    const iterations = 1000000
    num := 12345
    
    // Benchmark Itoa
    start := time.Now()
    for i := 0; i &lt; iterations; i++ {
        strconv.Itoa(num)
    }
    fmt.Println("Itoa duration:", time.Since(start))
    
    // Benchmark Sprintf
    start = time.Now()
    for i := 0; i &lt; iterations; i++ {
        fmt.Sprintf("%d", num)
    }
    fmt.Println("Sprintf duration:", time.Since(start))
}

Itoa is significantly faster than fmt.Sprintf for
simple integer-to-string conversion. Use Itoa when performance matters.

## Alternative: strconv.FormatInt

For more control over formatting, strconv.FormatInt can be used.
This example compares Itoa with FormatInt.

format_int.go
  

package main

import (
    "fmt"
    "strconv"
)

func main() {
    num := 42
    
    // Using Itoa
    str1 := strconv.Itoa(num)
    fmt.Println("Itoa:", str1)
    
    // Using FormatInt
    str2 := strconv.FormatInt(int64(num), 10)
    fmt.Println("FormatInt:", str2)
    
    // FormatInt with different bases
    hexStr := strconv.FormatInt(int64(num), 16)
    fmt.Println("Hexadecimal:", hexStr)
    
    binStr := strconv.FormatInt(int64(num), 2)
    fmt.Println("Binary:", binStr)
}

Itoa is simpler for base 10 conversion, while FormatInt
offers more flexibility with different bases. Choose based on your needs.

## Practical Example: Building a CSV Line

This example demonstrates using Itoa to format data for CSV output.
We convert multiple numeric fields to strings.

csv_builder.go
  

package main

import (
    "fmt"
    "strconv"
)

type Product struct {
    ID    int
    Price int
    Stock int
}

func main() {
    p := Product{ID: 1001, Price: 2499, Stock: 42}
    
    csvLine := strconv.Itoa(p.ID) + "," +
               strconv.Itoa(p.Price) + "," +
               strconv.Itoa(p.Stock)
    
    fmt.Println("CSV line:", csvLine)
    
    // Alternative with fmt.Sprintf
    csvLine2 := fmt.Sprintf("%d,%d,%d", p.ID, p.Price, p.Stock)
    fmt.Println("CSV line (fmt):", csvLine2)
}

We build a CSV line by converting each numeric field to a string.
Itoa provides a lightweight way to format numbers without the
overhead of fmt.

## Error Handling Edge Cases

While Itoa doesn't return errors, there are some edge cases to
consider. This example explores potential issues with large numbers.

edge_cases.go
  

package main

import (
    "fmt"
    "math"
    "strconv"
)

func main() {
    // Maximum int value
    maxInt := math.MaxInt
    strMax := strconv.Itoa(maxInt)
    fmt.Println("Max int:", strMax)
    
    // Minimum int value
    minInt := math.MinInt
    strMin := strconv.Itoa(minInt)
    fmt.Println("Min int:", strMin)
    
    // Very large int64 converted to int
    var bigNum int64 = math.MaxInt64
    strBig := strconv.Itoa(int(bigNum)) // Potential overflow
    fmt.Println("Big number:", strBig)
}

Itoa handles all valid int values correctly. However,
converting larger types to int first may cause overflow issues.

## Source

[Go strconv package documentation](https://pkg.go.dev/strconv)

This tutorial covered the strconv.Itoa function in Go with
practical examples of integer-to-string conversion in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).