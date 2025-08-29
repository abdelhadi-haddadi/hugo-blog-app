+++
title = "Golang slices.Sorted"
date = 2025-08-29T19:56:06.068+01:00
draft = false
description = "Learn how to check if a slice is sorted using slices.Sorted in Go. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Sorted

last modified April 20, 2025

This tutorial explains how to use the slices.Sorted function in Go.
We'll cover slice operations with practical examples of checking sort order.

The slices.Sorted function tests whether a slice is sorted in
ascending order. It's part of Go's experimental slices package.

This function is useful for validating data or checking preconditions before
performing operations that require sorted input. It returns a boolean result.

## Basic slices.Sorted Example

The simplest use of slices.Sorted checks if a slice of integers is
sorted in ascending order. The function requires no additional parameters.

basic_sorted.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    unsorted := []int{5, 3, 1, 4, 2}
    
    fmt.Println("Numbers sorted:", slices.Sorted(numbers))
    fmt.Println("Unsorted sorted:", slices.Sorted(unsorted))
}

We create two slices - one sorted and one unsorted. The function correctly
identifies their sort status. The output shows true and false respectively.

## Checking String Slices

slices.Sorted works with string slices too. This example checks if
a slice of words is in alphabetical order.

string_sorted.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "cherry"}
    mixed := []string{"zebra", "apple", "banana"}
    
    fmt.Println("Words sorted:", slices.Sorted(words))
    fmt.Println("Mixed sorted:", slices.Sorted(mixed))
}

The function uses lexicographical order for strings. The first slice is properly
ordered while the second isn't, as "zebra" comes before "apple".

## Working with Custom Types

For custom types, we need to implement the Ordered interface.
This example shows how to check sorting for a slice of custom structs.

custom_type.go
  

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
        {"Charlie", 35},
    }
    
    unsortedPeople := []Person{
        {"Bob", 30},
        {"Alice", 25},
        {"Charlie", 35},
    }
    
    fmt.Println("People sorted:", slices.SortedFunc(people, func(a, b Person) int {
        return a.Age - b.Age
    }))
    
    fmt.Println("Unsorted people:", slices.SortedFunc(unsortedPeople, func(a, b Person) int {
        return a.Age - b.Age
    }))
}

Note: We use SortedFunc here because Sorted requires
the Ordered constraint. The comparison function defines our sort
order based on age.

## Empty and Single-Element Slices

slices.Sorted has special behavior for edge cases. Empty and
single-element slices are always considered sorted.

edge_cases.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := []int{}
    single := []string{"alone"}
    
    fmt.Println("Empty sorted:", slices.Sorted(empty))
    fmt.Println("Single element sorted:", slices.Sorted(single))
}

These cases return true because there are no elements to compare or only one
element exists. This matches mathematical definitions of sortedness.

## Checking Descending Order

To check for descending order, we can use slices.SortedFunc with
a custom comparison. This example demonstrates both directions.

descending.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    asc := []int{1, 2, 3, 4, 5}
    desc := []int{5, 4, 3, 2, 1}
    
    fmt.Println("Ascending sorted:", slices.Sorted(asc))
    fmt.Println("Descending sorted:", slices.IsSortedFunc(desc, func(a, b int) int {
        return b - a // Reverse comparison
    }))
}

The standard Sorted checks ascending order only. For descending,
we provide a comparison function that reverses the usual order.

## Performance Considerations

For large slices, the performance of slices.Sorted matters. This
example benchmarks the operation on different slice sizes.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    sizes := []int{1_000, 10_000, 100_000}
    
    for _, size := range sizes {
        slice := make([]int, size)
        for i := range slice {
            slice[i] = i
        }
        
        start := time.Now()
        _ = slices.Sorted(slice)
        fmt.Printf("Size %d: %v\n", size, time.Since(start))
    }
}

The function stops at the first out-of-order element it finds. Best-case
performance is O(1) if the first two elements are out of order.

## Practical Example: Input Validation

This practical example validates that user-provided numbers are sorted before
processing. It demonstrates real-world usage.

input_validation.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
)

func main() {
    inputs := []string{"10", "20", "15", "30"}
    
    numbers := make([]int, len(inputs))
    for i, s := range inputs {
        num, err := strconv.Atoi(s)
        if err != nil {
            fmt.Println("Invalid input:", s)
            return
        }
        numbers[i] = num
    }
    
    if slices.Sorted(numbers) {
        fmt.Println("Processing sorted numbers...")
        // Perform operations that require sorted input
    } else {
        fmt.Println("Error: Numbers must be provided in sorted order")
    }
}

We convert strings to integers, then verify they're sorted. This pattern is
common when processing data that requires ordering for correctness.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Sorted function in Go with practical
examples of checking sort order in various scenarios and data types.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).