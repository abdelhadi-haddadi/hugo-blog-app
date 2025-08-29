+++
title = "Golang slices.Collect"
date = 2025-08-29T19:55:55.990+01:00
draft = false
description = "Learn how to transform slices in Go using the slices.Collect function. This tutorial provides examples for element conversion, struct field extraction, and more."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Collect

last modified April 20, 2025

This tutorial explains how to use the slices.Collect function in Go.
We'll cover slice transformations with practical examples of element conversion.

The slices.Collect function transforms elements of a slice by applying
a mapping function to each element. It returns a new slice with transformed values.

This function is useful for converting data types or extracting specific fields.
It follows a functional programming pattern similar to map in other languages.

## Basic slices.Collect Example

The simplest use of slices.Collect converts numbers to strings.
We define a transformation function and apply it to each element.

basic_collect.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    strings := slices.Collect(numbers, func(n int) string {
        return strconv.Itoa(n)
    })
    
    fmt.Println("Converted strings:", strings)
}

We create a slice of integers and convert each to a string representation.
The anonymous function defines our transformation logic for each element.

## Extracting Struct Fields

slices.Collect can extract specific fields from struct elements.
This example collects names from a slice of Person structs.

extract_fields.go
  

package main

import (
    "fmt"
    "slices"
)

type Person struct {
    Name string
    Age  int
}

func main() {
    people := []Person{
        {"Alice", 25},
        {"Bob", 30},
        {"Charlie", 17},
    }
    
    names := slices.Collect(people, func(p Person) string {
        return p.Name
    })
    
    fmt.Println("Names:", names)
}

The transformation function accesses each person's Name field. The result is a
slice containing only the names from the original structs.

## Type Conversion

We can use slices.Collect for type conversion between numeric types.
This example converts int32 values to float64.

type_conversion.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    ints := []int32{10, 20, 30, 40, 50}
    
    floats := slices.Collect(ints, func(n int32) float64 {
        return float64(n)
    })
    
    fmt.Printf("Converted floats: %v (type: %T)\n", floats, floats)
}

Each int32 value is converted to float64. The type conversion preserves the
numeric value while changing the underlying representation.

## Calculating Derived Values

Complex calculations can be performed in the transformation function.
This example computes squares of numbers.

derived_values.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    squares := slices.Collect(numbers, func(n int) int {
        return n * n
    })
    
    fmt.Println("Squares:", squares)
}

The transformation function squares each input number. The result contains the
calculated values while the original slice remains unchanged.

## Empty Slice Behavior

slices.Collect handles empty slices gracefully. This example
demonstrates its behavior with empty input.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    result := slices.Collect(empty, func(n int) string {
        return "unused" // Never called
    })
    
    fmt.Println("Result for empty slice:", result)
    fmt.Println("Length:", len(result))
}

With no elements to process, the function returns an empty slice of the target
type. The transformation function is never called in this case.

## Performance Considerations

For large slices, the performance of the transformation function matters.
This example benchmarks different approaches.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    largeSlice := make([]int, 1_000_000)
    for i := range largeSlice {
        largeSlice[i] = i
    }
    
    // Simple transformation
    start := time.Now()
    _ = slices.Collect(largeSlice, func(n int) int {
        return n * 2
    })
    fmt.Println("Simple transformation:", time.Since(start))
    
    // Complex transformation
    start = time.Now()
    _ = slices.Collect(largeSlice, func(n int) float64 {
        return float64(n) * 1.5 / 3.14159
    })
    fmt.Println("Complex transformation:", time.Since(start))
}

The execution time depends on the transformation complexity. Memory allocation
for the new slice also affects overall performance.

## Practical Example: API Response Processing

This practical example processes API responses using slices.Collect.
We extract specific fields from JSON responses.

api_processing.go
  

package main

import (
    "encoding/json"
    "fmt"
    "slices"
)

type User struct {
    ID       int    `json:"id"`
    Username string `json:"username"`
    Email    string `json:"email"`
    Active   bool   `json:"active"`
}

func main() {
    responses := []string{
        `{"id":1,"username":"alice","email":"alice@example.com","active":true}`,
        `{"id":2,"username":"bob","email":"bob@example.com","active":false}`,
        `{"id":3,"username":"charlie","email":"charlie@example.com","active":true}`,
    }
    
    users := slices.Collect(responses, func(s string) User {
        var u User
        json.Unmarshal([]byte(s), &amp;u)
        return u
    })
    
    usernames := slices.Collect(users, func(u User) string {
        return u.Username
    })
    
    fmt.Println("Active users:", usernames)
}

We first convert JSON strings to User structs, then extract usernames.
This demonstrates chaining multiple transformations for data processing.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Collect function in Go with practical
examples of transforming slice elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).