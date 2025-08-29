+++
title = "Golang slices.Index"
date = 2025-08-29T19:56:00.425+01:00
draft = false
description = "Learn how to use slices.Index in Go to find elements in slices. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Index

last modified April 20, 2025

This tutorial explains how to use the slices.Index function in Go.
We'll cover slice searching operations with practical examples.

The slices.Index function returns the index of the first occurrence
of a value in a slice. It's part of Go's experimental slices package.

This function is useful for finding elements in collections. It returns -1 if
the value is not found in the slice.

## Basic slices.Index Example

The simplest use of slices.Index finds a number in a slice of
integers. We search for the value 3 in a small slice.

basic_index.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    idx := slices.Index(numbers, 3)
    
    fmt.Println("Index of 3:", idx)
}

We create a slice of numbers and search for value 3. The function returns 2
since slice indices start at 0.

## Finding Strings in a Slice

slices.Index can search for string elements. This example finds
the position of "banana" in a fruit slice.

string_index.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruits := []string{"apple", "banana", "cherry", "date"}
    
    idx := slices.Index(fruits, "banana")
    
    fmt.Println("Index of banana:", idx)
}

The function searches the slice and returns 1 for "banana". String comparison
is case-sensitive in Go.

## Searching for Struct Values

We can use slices.Index with custom struct types. This example
finds a specific person in a slice.

struct_index.go
  

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
    
    target := Person{"Bob", 30}
    idx := slices.Index(people, target)
    
    fmt.Println("Index of Bob:", idx)
}

The function compares all struct fields. It returns 1 for Bob's record since
both name and age match exactly.

## Handling Not Found Cases

When the value isn't found, slices.Index returns -1. This example
demonstrates this behavior.

not_found.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    colors := []string{"red", "green", "blue"}
    
    idx := slices.Index(colors, "yellow")
    
    if idx == -1 {
        fmt.Println("Color not found")
    } else {
        fmt.Println("Color found at index:", idx)
    }
}

We search for "yellow" which isn't in the slice. The function returns -1, and
we handle this case with a conditional check.

## Searching in Empty Slices

slices.Index returns -1 for empty slices. This example shows the
behavior with an empty string slice.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []string
    
    idx := slices.Index(empty, "test")
    
    fmt.Println("Index in empty slice:", idx)
}

With no elements to search, the function immediately returns -1. This is the
expected behavior for empty collections.

## Performance Considerations

For large slices, the search performance is linear. This example benchmarks
the search time in a large slice.

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
    
    // Search for first element
    start := time.Now()
    _ = slices.Index(largeSlice, 0)
    fmt.Println("First element search:", time.Since(start))
    
    // Search for last element
    start = time.Now()
    _ = slices.Index(largeSlice, 999_999)
    fmt.Println("Last element search:", time.Since(start))
}

The execution time varies based on the element position. Finding early elements
is faster than searching for items at the end.

## Practical Example: Checking for Duplicates

This practical example uses slices.Index to check for duplicate
values in a slice.

duplicates.go
  

package main

import (
    "fmt"
    "slices"
)

func hasDuplicates(slice []int) bool {
    for i, v := range slice {
        if slices.Index(slice[i+1:], v) != -1 {
            return true
        }
    }
    return false
}

func main() {
    numbers := []int{1, 2, 3, 4, 5, 2}
    
    if hasDuplicates(numbers) {
        fmt.Println("Slice contains duplicates")
    } else {
        fmt.Println("All elements are unique")
    }
}

We check each element against the remaining slice portion. The function returns
true when it finds any duplicate value.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Index function in Go with practical
examples of finding elements in slices of various types.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).