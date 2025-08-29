+++
title = "Golang slices.IsSorted"
date = 2025-08-29T19:56:01.535+01:00
draft = false
description = "Learn how to use slices.IsSorted in Go to check if slices are sorted. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.IsSorted

last modified April 20, 2025

This tutorial explains how to use the slices.IsSorted function in Go.
We'll cover slice operations with practical examples of checking sort order.

The slices.IsSorted function tests whether a slice is sorted in
ascending order. It's part of Go's experimental slices package.

This function is useful for verifying data integrity or checking preconditions
before performing operations that require sorted input.

## Basic slices.IsSorted Example

The simplest use of slices.IsSorted checks if a slice of integers
is sorted in ascending order. The function returns a boolean result.

basic_sorted.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    unsorted := []int{5, 3, 1, 4, 2}
    
    fmt.Println("Numbers sorted:", slices.IsSorted(numbers))
    fmt.Println("Unsorted sorted:", slices.IsSorted(unsorted))
}

We create two slices - one sorted and one unsorted. The function correctly
identifies their sort status by comparing adjacent elements.

## Checking String Slices

slices.IsSorted works with string slices using lexicographical
order. This example demonstrates sorting check for string elements.

string_sorted.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "cherry"}
    mixed := []string{"zebra", "apple", "banana"}
    
    fmt.Println("Words sorted:", slices.IsSorted(words))
    fmt.Println("Mixed sorted:", slices.IsSorted(mixed))
}

Strings are compared using their Unicode code points. The first slice is
correctly ordered while the second fails the sort check.

## Working with Custom Types

For custom types, we must implement the cmp.Ordered interface.
This example shows how to check sorting for a slice of structs.

custom_type.go
  

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
        {"Charlie", 35},
    }
    
    unsortedPeople := []Person{
        {"Charlie", 35},
        {"Alice", 25},
        {"Bob", 30},
    }
    
    fmt.Println("People sorted by age:", 
        slices.IsSortedFunc(people, func(a, b Person) int {
            return cmp.Compare(a.Age, b.Age)
        }))
    
    fmt.Println("Unsorted people:", 
        slices.IsSortedFunc(unsortedPeople, func(a, b Person) int {
            return cmp.Compare(a.Age, b.Age)
        }))
}

We use slices.IsSortedFunc with a custom comparison function.
The function checks if elements are ordered by age in ascending order.

## Empty and Single-Element Slices

slices.IsSorted has special behavior for empty and single-element
slices. Both cases are considered sorted by definition.

edge_cases.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := []int{}
    single := []string{"hello"}
    
    fmt.Println("Empty slice sorted:", slices.IsSorted(empty))
    fmt.Println("Single-element sorted:", slices.IsSorted(single))
}

The function returns true for these edge cases since no elements violate the
sort order. This matches mathematical definitions of sortedness.

## Descending Order Check

To check for descending order, we can use slices.IsSortedFunc
with a reversed comparison. This example demonstrates the technique.

descending_order.go
  

package main

import (
    "cmp"
    "fmt"
    "slices"
)

func main() {
    descending := []int{5, 4, 3, 2, 1}
    ascending := []int{1, 2, 3, 4, 5}
    
    isDescending := slices.IsSortedFunc(descending, func(a, b int) int {
        return cmp.Compare(b, a) // Reverse comparison
    })
    
    fmt.Println("Descending sorted:", isDescending)
    fmt.Println("Ascending as descending:", 
        slices.IsSortedFunc(ascending, func(a, b int) int {
            return cmp.Compare(b, a)
        }))
}

By comparing b to a instead of a to b, we effectively check for descending
order. The first slice passes while the second fails this check.

## Performance Considerations

For large slices, slices.IsSorted is efficient as it stops at the
first out-of-order element. This example demonstrates its early termination.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    // Large mostly-sorted slice with one unsorted element at start
    largeSlice := make([]int, 1_000_000)
    for i := range largeSlice {
        largeSlice[i] = i
    }
    largeSlice[0] = 1_000_000 // Make first element out of order
    
    start := time.Now()
    sorted := slices.IsSorted(largeSlice)
    elapsed := time.Since(start)
    
    fmt.Printf("Checked 1M elements in %v\n", elapsed)
    fmt.Println("Slice sorted:", sorted)
}

The function returns quickly because it finds the unsorted element immediately.
This makes it efficient for validation of potentially unsorted data.

## Practical Example: Input Validation

This practical example uses slices.IsSorted to validate that user
input numbers are provided in ascending order.

input_validation.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
)

func main() {
    inputs := []string{"10", "20", "30", "15"}
    
    numbers := make([]int, len(inputs))
    for i, s := range inputs {
        num, err := strconv.Atoi(s)
        if err != nil {
            fmt.Println("Invalid input:", s)
            return
        }
        numbers[i] = num
    }
    
    if slices.IsSorted(numbers) {
        fmt.Println("Inputs are in ascending order")
    } else {
        fmt.Println("Inputs are not properly sorted")
    }
}

We convert strings to integers and verify they're sorted. This demonstrates a
real-world use case for data validation in applications.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.IsSorted function in Go with
practical examples of checking sort order in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).