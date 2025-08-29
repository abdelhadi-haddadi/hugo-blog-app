+++
title = "Golang slices.Max"
date = 2025-08-29T19:56:02.662+01:00
draft = false
description = "Learn how to find the maximum element in a slice using slices.Max in Go. Includes examples for numbers, strings, and custom types."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Max

last modified April 20, 2025

This tutorial explains how to use the slices.Max function in Go.
We'll cover finding maximum elements in slices with practical examples.

The slices.Max function returns the maximum element in a slice.
It's part of Go's experimental slices package and works with ordered types.

This function is useful for finding the largest value in a collection.
It panics if the slice is empty, so always check length before using.

## Basic slices.Max Example

The simplest use of slices.Max finds the largest number in a slice.
We pass the slice directly to the function.

basic_max.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{3, 5, 1, 8, 2}
    
    maxNum := slices.Max(numbers)
    
    fmt.Println("Maximum number:", maxNum)
}

We create a slice of integers and find the maximum value. The function returns 8,
which is the largest number in the slice.

## Finding Maximum String

slices.Max can also find the maximum string in a slice.
Strings are compared lexicographically.

string_max.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruits := []string{"apple", "banana", "cherry", "date"}
    
    maxFruit := slices.Max(fruits)
    
    fmt.Println("Lexicographically last fruit:", maxFruit)
}

The function compares strings alphabetically. "date" is returned as it comes last
in dictionary order among the given fruits.

## Working with Structs

We can use slices.MaxFunc with custom struct types.
This example finds the oldest person in a slice.

struct_max.go
  

package main

import (
    "cmp"
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
        {"Charlie", 20},
    }
    
    oldest := slices.MaxFunc(people, func(a, b Person) int {
        return cmp.Compare(a.Age, b.Age)
    })
    
    fmt.Println("Oldest person:", oldest)
}

We use slices.MaxFunc with a custom comparison function.
The function returns Bob as he has the highest age value.

## Handling Empty Slices

slices.Max panics when called on an empty slice.
This example shows how to safely handle empty slices.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    if len(empty) == 0 {
        fmt.Println("Slice is empty, cannot find maximum")
        return
    }
    
    // This would panic if uncommented:
    // max := slices.Max(empty)
    // fmt.Println(max)
}

Always check slice length before calling slices.Max.
The example demonstrates proper empty slice handling.

## Finding Maximum Float

This example demonstrates finding the maximum float value in a slice.
Floats are compared by their numerical value.

float_max.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    temperatures := []float64{36.6, 37.2, 35.8, 38.1, 36.9}
    
    maxTemp := slices.Max(temperatures)
    
    fmt.Printf("Highest temperature: %.1f\n", maxTemp)
}

The function correctly identifies 38.1 as the maximum temperature.
Floating-point comparison follows standard IEEE 754 rules.

## Custom Comparison with MaxFunc

slices.MaxFunc allows custom comparison logic.
This example finds the longest string in a slice.

custom_max.go
  

package main

import (
    "cmp"
    "fmt"
    "slices"
)

func main() {
    words := []string{"short", "medium length", "very long string", "tiny"}
    
    longest := slices.MaxFunc(words, func(a, b string) int {
        return cmp.Compare(len(a), len(b))
    })
    
    fmt.Println("Longest string:", longest)
}

We compare strings by length instead of lexicographical order.
The function returns "very long string" as it has the most characters.

## Practical Example: Exam Scores

This practical example finds the highest score in a test result slice.
It demonstrates real-world usage of slices.Max.

exam_scores.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    scores := []int{85, 92, 78, 95, 88, 91}
    
    if len(scores) == 0 {
        fmt.Println("No scores available")
        return
    }
    
    topScore := slices.Max(scores)
    
    fmt.Printf("The highest exam score is %d/100\n", topScore)
}

We first check for empty slices to avoid panics.
Then we find and display the highest score from the test results.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Max function in Go with practical
examples of finding maximum elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).