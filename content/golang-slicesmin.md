+++
title = "Golang slices.Min"
date = 2025-08-29T19:56:03.792+01:00
draft = false
description = "Learn how to find the minimum element in a slice using slices.Min in Go. Includes examples for numbers, strings, and custom types."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Min

last modified April 20, 2025

This tutorial explains how to use the slices.Min function in Go.
We'll cover finding minimum elements in slices with practical examples.

The slices.Min function returns the minimum element in a slice.
It's part of Go's experimental slices package and works with ordered types.

This function is useful for finding smallest values in collections of numbers,
strings, or other comparable types. It panics if the slice is empty.

## Basic slices.Min Example

The simplest use of slices.Min finds the smallest number in a slice.
The function works with any ordered type that supports comparison.

basic_min.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{3, 1, 4, 1, 5, 9, 2, 6}
    
    minNum := slices.Min(numbers)
    fmt.Println("Minimum number:", minNum)
}

We create a slice of integers and find the smallest value. The function returns 1,
which appears twice in the slice. Only the first occurrence is considered.

## Finding Minimum String

slices.Min can find the lexicographically smallest string in a slice.
String comparison follows Unicode code point order.

string_min.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruits := []string{"apple", "banana", "cherry", "apricot"}
    
    minFruit := slices.Min(fruits)
    fmt.Println("First fruit alphabetically:", minFruit)
}

The function compares strings character by character. "apricot" comes before
"apple" because 'a' == 'a' but 'p' &lt; 'r' in Unicode order.

## Working with Custom Types

To use slices.Min with custom types, they must implement the
Ordered constraint. This example shows a custom ordered type.

custom_type.go
  

package main

import (
    "fmt"
    "slices"
)

type Temperature float64

func main() {
    temps := []Temperature{22.5, 18.3, 25.7, 16.8, 20.1}
    
    minTemp := slices.Min(temps)
    fmt.Println("Minimum temperature:", minTemp)
}

Our Temperature type is based on float64 which already
implements ordering. The function correctly finds the lowest temperature value.

## Handling Empty Slices

Calling slices.Min on an empty slice causes a panic. We should
always check slice length first to avoid runtime errors.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    if len(empty) == 0 {
        fmt.Println("Cannot find min of empty slice")
        return
    }
    
    // This would panic if executed:
    // min := slices.Min(empty)
    // fmt.Println(min)
}

The code demonstrates proper empty slice handling. Always check length before
calling slices.Min when the slice might be empty.

## Finding Minimum with Custom Comparison

For complex types without built-in ordering, we can use slices.MinFunc.
This example finds the shortest string by length.

custom_comparison.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "fig", "cherry"}
    
    shortest := slices.MinFunc(words, func(a, b string) int {
        return len(a) - len(b)
    })
    
    fmt.Println("Shortest word:", shortest)
}

slices.MinFunc takes a comparison function that returns negative
when a &lt; b. Here we compare string lengths instead of lexicographical order.

## Performance Considerations

slices.Min has O(n) time complexity. For large slices, consider
parallel processing if performance is critical.

performance.go
  

package main

import (
    "fmt"
    "math/rand"
    "slices"
    "time"
)

func main() {
    rand.Seed(time.Now().UnixNano())
    largeSlice := make([]int, 1_000_000)
    for i := range largeSlice {
        largeSlice[i] = rand.Intn(1_000_000)
    }
    
    start := time.Now()
    min := slices.Min(largeSlice)
    elapsed := time.Since(start)
    
    fmt.Printf("Found min %d in %v\n", min, elapsed)
}

The example benchmarks finding the minimum in a large slice. The operation is
linear but still fast for typical use cases.

## Practical Example: Student Grades

This practical example finds the lowest grade in a class. It demonstrates real-world
usage with error handling and custom types.

student_grades.go
  

package main

import (
    "fmt"
    "slices"
)

type Grade int

func main() {
    grades := []Grade{85, 92, 78, 90, 65, 88, 72}
    
    if len(grades) == 0 {
        fmt.Println("No grades available")
        return
    }
    
    lowest := slices.Min(grades)
    fmt.Println("Lowest grade in class:", lowest)
    
    if lowest &lt; 60 {
        fmt.Println("Warning: At least one failing grade")
    }
}

We define a Grade type and find the minimum value. The code includes
proper empty slice checking and follow-up actions based on the result.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Min function in Go with practical
examples of finding minimum elements in various scenarios and data types.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).