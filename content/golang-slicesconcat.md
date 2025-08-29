+++
title = "Golang slices.Concat"
date = 2025-08-29T19:55:58.233+01:00
draft = false
description = "Golang slices.Concat tutorial explains how to concatenate multiple slices into one with practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Concat

last modified April 20, 2025

This tutorial explains how to use the slices.Concat function in Go.
We'll cover slice concatenation with practical examples of combining slices.

The slices.Concat function combines multiple slices into a single new
slice. It's part of Go's experimental slices package.

This function is useful for merging data from different sources or combining
results from multiple operations. It preserves the order of elements.

## Basic slices.Concat Example

The simplest use of slices.Concat combines two integer slices.
The result contains all elements from both slices in order.

basic_concat.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    slice1 := []int{1, 2, 3}
    slice2 := []int{4, 5, 6}
    
    combined := slices.Concat(slice1, slice2)
    fmt.Println("Combined slice:", combined)
}

We create two slices and concatenate them into one. The new slice contains all
elements from slice1 followed by all elements from slice2.

## Concatenating Multiple Slices

slices.Concat can combine more than two slices at once. This
example shows concatenation of three string slices.

multi_concat.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruits := []string{"apple", "banana"}
    veggies := []string{"carrot", "potato"}
    meats := []string{"chicken", "beef"}
    
    allFood := slices.Concat(fruits, veggies, meats)
    fmt.Println("All food items:", allFood)
}

The function accepts any number of slice arguments. The result maintains the
order of slices and their elements as provided in the arguments.

## Working with Different Types

All slices passed to slices.Concat must be of the same type.
This example demonstrates concatenation with custom struct types.

struct_concat.go
  

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
    group1 := []Person{{"Alice", 25}, {"Bob", 30}}
    group2 := []Person{{"Charlie", 17}, {"Dana", 40}}
    
    allPeople := slices.Concat(group1, group2)
    fmt.Println("All people:", allPeople)
}

We combine two slices of Person structs. The type safety ensures all elements
in the resulting slice are of the same type.

## Empty Slice Behavior

slices.Concat handles empty slices gracefully. This example shows
concatenation with empty slices.

empty_concat.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := []int{}
    numbers := []int{1, 2, 3}
    
    result := slices.Concat(empty, numbers, empty)
    fmt.Println("Result with empty slices:", result)
}

Empty slices don't contribute elements but don't cause errors. The result
contains only elements from non-empty slices.

## Performance Considerations

For large slices, concatenation performance matters. This example benchmarks
the operation with different slice sizes.

performance_concat.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    large1 := make([]int, 1_000_000)
    large2 := make([]int, 1_000_000)
    
    start := time.Now()
    _ = slices.Concat(large1, large2)
    fmt.Println("Concatenation time:", time.Since(start))
}

slices.Concat allocates a new slice with capacity for all elements.
It then copies elements from each source slice into the new slice.

## Modifying Concatenated Slices

Changes to original slices don't affect the concatenated result. This example
demonstrates this independence.

modify_concat.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    original1 := []int{1, 2, 3}
    original2 := []int{4, 5, 6}
    
    combined := slices.Concat(original1, original2)
    original1[0] = 99
    
    fmt.Println("Original 1:", original1)
    fmt.Println("Combined:", combined)
}

Modifying an element in the original slice doesn't change the concatenated
result. The function creates a completely new slice.

## Practical Example: Combining Results

This practical example shows how to combine results from different operations
using slices.Concat.

practical_concat.go
  

package main

import (
    "fmt"
    "slices"
)

func getEvenNumbers(max int) []int {
    var evens []int
    for i := 0; i &lt;= max; i += 2 {
        evens = append(evens, i)
    }
    return evens
}

func getOddNumbers(max int) []int {
    var odds []int
    for i := 1; i &lt;= max; i += 2 {
        odds = append(odds, i)
    }
    return odds
}

func main() {
    evens := getEvenNumbers(10)
    odds := getOddNumbers(10)
    
    allNumbers := slices.Concat(evens, odds)
    fmt.Println("All numbers:", allNumbers)
}

We generate even and odd numbers separately, then combine them. This pattern
is useful when collecting results from different sources or operations.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Concat function in Go with practical
examples of combining slices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).