+++
title = "Golang slices.SortedFunc"
date = 2025-08-29T19:56:06.087+01:00
draft = false
description = "Learn how to check if a slice is sorted using slices.SortedFunc in Go with custom comparison functions. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.SortedFunc

last modified April 20, 2025

This tutorial explains how to use the slices.SortedFunc function in Go.
We'll cover custom sorting checks with practical examples.

The slices.SortedFunc function tests whether a slice is sorted according
to a custom comparison function. It's part of Go's experimental slices package.

This function is useful when you need to verify sorting order beyond basic
ascending/descending checks. It returns true if the slice is sorted.

## Basic slices.SortedFunc Example

The simplest use of slices.SortedFunc checks if numbers are sorted
in ascending order. We define a comparison function for integers.

basic_sorted.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    isSorted := slices.SortedFunc(numbers, func(a, b int) int {
        return a - b
    })
    
    fmt.Println("Numbers sorted:", isSorted)
}

The comparison function returns a negative, zero, or positive value depending on
whether a should come before, equal to, or after b. The slice is sorted.

## Checking Descending Order

slices.SortedFunc can verify descending order by reversing the
comparison logic. This example checks if numbers are sorted high to low.

descending_order.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{5, 4, 3, 2, 1}
    
    isSorted := slices.SortedFunc(numbers, func(a, b int) int {
        return b - a
    })
    
    fmt.Println("Numbers sorted descending:", isSorted)
}

By subtracting a from b instead of b from a, we reverse the sort order check.
The function returns true for properly descending sequences.

## Sorting Strings by Length

We can use slices.SortedFunc with custom criteria. This example
checks if strings are sorted by length.

string_length.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"a", "bb", "ccc", "dddd"}
    
    isSorted := slices.SortedFunc(words, func(a, b string) int {
        return len(a) - len(b)
    })
    
    fmt.Println("Words sorted by length:", isSorted)
}

The comparison function uses string lengths instead of lexicographical order.
This demonstrates custom sorting criteria beyond default comparisons.

## Working with Structs

slices.SortedFunc works with custom struct types. This example checks
if people are sorted by age.

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
        {"Bob", 30},
        {"Charlie", 35},
    }
    
    isSorted := slices.SortedFunc(people, func(a, b Person) int {
        return a.Age - b.Age
    })
    
    fmt.Println("People sorted by age:", isSorted)
}

The comparison function accesses the Age field of each Person struct. The slice
is considered sorted when ages are in ascending order.

## Case-Insensitive String Sorting

This example demonstrates case-insensitive sorting verification using
slices.SortedFunc with strings.

case_insensitive.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "Banana", "cherry", "Date"}
    
    isSorted := slices.SortedFunc(words, func(a, b string) int {
        return strings.Compare(strings.ToLower(a), strings.ToLower(b))
    })
    
    fmt.Println("Case-insensitive sorted:", isSorted)
}

By converting strings to lowercase before comparison, we ignore case differences.
The function checks if words are sorted alphabetically regardless of case.

## Empty and Single-Element Slices

slices.SortedFunc has special behavior for empty and single-element
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
    
    emptySorted := slices.SortedFunc(empty, func(a, b int) int {
        return a - b
    })
    
    singleSorted := slices.SortedFunc(single, func(a, b string) int {
        return len(a) - len(b)
    })
    
    fmt.Println("Empty sorted:", emptySorted)
    fmt.Println("Single element sorted:", singleSorted)
}

With zero or one elements, there's nothing to compare, so the function returns
true. This matches mathematical definitions of sortedness.

## Practical Example: Version Sorting

This practical example checks if version strings are sorted correctly, handling
both numeric and lexicographic components.

version_sorting.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
    "strings"
)

func main() {
    versions := []string{"1.2", "1.10", "1.9", "2.0", "0.5"}
    
    isSorted := slices.SortedFunc(versions, func(a, b string) int {
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
    
    fmt.Println("Versions sorted:", isSorted)
}

The comparison function splits version strings and compares components numerically.
This demonstrates complex real-world sorting verification.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.SortedFunc function in Go with
practical examples of checking custom sorting orders in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).