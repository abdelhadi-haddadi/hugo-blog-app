+++
title = "Golang slices.SortedStableFunc"
date = 2025-08-29T19:56:06.095+01:00
draft = false
description = "Learn how to check if a slice is sorted stably using slices.SortedStableFunc in Go with custom comparison functions. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.SortedStableFunc

last modified April 20, 2025

This tutorial explains how to use the slices.SortedStableFunc function in Go.
We'll cover stable sorting with custom comparison functions through practical examples.

The slices.SortedStableFunc function checks if a slice is already sorted
using a custom comparison function while preserving equal elements' order.

This function is part of Go's experimental slices package and is useful when you need
to maintain the relative order of equal elements after sorting.

## Basic SortedStableFunc Example

The simplest use of slices.SortedStableFunc checks if a slice of integers
is sorted in ascending order using a custom comparison function.

basic_sorted.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 2, 3, 4, 5}
    
    isSorted := slices.SortedStableFunc(numbers, func(a, b int) int {
        return a - b
    })
    
    fmt.Println("Is slice sorted:", isSorted)
}

We create a slice of integers with duplicate values and check if it's sorted.
The comparison function returns a negative, zero, or positive value indicating order.

## Sorting Strings Case-Insensitively

slices.SortedStableFunc can verify case-insensitive string sorting.
This example checks if strings are sorted ignoring case differences.

string_sorting.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "Banana", "cherry", "Date"}
    
    isSorted := slices.SortedStableFunc(words, func(a, b string) int {
        return strings.Compare(strings.ToLower(a), strings.ToLower(b))
    })
    
    fmt.Println("Is slice sorted case-insensitively:", isSorted)
}

The comparison function converts strings to lowercase before comparing.
This ensures the check is case-insensitive while maintaining stability.

## Working with Structs

We can use slices.SortedStableFunc with custom struct types.
This example checks if people are sorted by age while preserving order.

struct_sorting.go
  

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
        {"Bob", 25},
        {"Charlie", 30},
    }
    
    isSorted := slices.SortedStableFunc(people, func(a, b Person) int {
        return a.Age - b.Age
    })
    
    fmt.Println("Are people sorted by age:", isSorted)
}

The function checks if the slice is sorted by age while keeping original order
for people with the same age. Alice and Bob maintain their relative positions.

## Descending Order Check

slices.SortedStableFunc can verify descending order by reversing
the comparison logic. This example demonstrates descending integer sorting.

descending_order.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{5, 4, 3, 2, 2, 1}
    
    isSorted := slices.SortedStableFunc(numbers, func(a, b int) int {
        return b - a // Reverse comparison for descending order
    })
    
    fmt.Println("Is slice sorted descending:", isSorted)
}

By subtracting a from b instead of b from a, we invert the comparison logic.
This checks for descending order while maintaining stability for equal values.

## Empty and Single-Element Slices

slices.SortedStableFunc has special behavior for empty and single-element
slices. These cases are always considered sorted.

edge_cases.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := []int{}
    single := []string{"alone"}
    
    emptySorted := slices.SortedStableFunc(empty, func(a, b int) int {
        return a - b
    })
    
    singleSorted := slices.SortedStableFunc(single, func(a, b string) int {
        return len(a) - len(b)
    })
    
    fmt.Println("Empty slice sorted:", emptySorted)
    fmt.Println("Single-element sorted:", singleSorted)
}

Both empty and single-element slices are trivially sorted since there are no
elements to compare or only one element exists. The comparison function is irrelevant.

## Custom Comparison Logic

Complex comparison logic can be implemented in the function. This example checks
if numbers are sorted by absolute value while preserving original order.

custom_comparison.go
  

package main

import (
    "fmt"
    "math"
    "slices"
)

func main() {
    numbers := []int{-3, -2, -1, 0, 1, 1, 2, 3}
    
    isSorted := slices.SortedStableFunc(numbers, func(a, b int) int {
        absA := math.Abs(float64(a))
        absB := math.Abs(float64(b))
        if absA &lt; absB {
            return -1
        }
        if absA &gt; absB {
            return 1
        }
        return 0
    })
    
    fmt.Println("Sorted by absolute value:", isSorted)
}

The comparison function first calculates absolute values before comparing.
Equal absolute values maintain their original relative order in the slice.

## Practical Example: Version Sorting

This practical example checks if version strings are sorted correctly,
handling both numeric and stability aspects of version comparison.

version_sorting.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
    "strings"
)

func main() {
    versions := []string{"1.0", "1.1", "1.1.1", "1.2", "1.10"}
    
    isSorted := slices.SortedStableFunc(versions, func(a, b string) int {
        aParts := strings.Split(a, ".")
        bParts := strings.Split(b, ".")
        
        for i := 0; i &lt; len(aParts) &amp;&amp; i &lt; len(bParts); i++ {
            aNum, _ := strconv.Atoi(aParts[i])
            bNum, _ := strconv.Atoi(bParts[i])
            
            if aNum != bNum {
                return aNum - bNum
            }
        }
        
        return len(aParts) - len(bParts)
    })
    
    fmt.Println("Are versions sorted correctly:", isSorted)
}

The comparison function splits version strings and compares each numeric component.
This ensures proper version ordering (1.10 comes after 1.2) while being stable.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.SortedStableFunc function in Go with practical
examples of stable sorting verification with custom comparison functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).