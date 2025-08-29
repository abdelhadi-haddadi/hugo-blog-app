+++
title = "Golang slices.SortFunc"
date = 2025-08-29T19:56:07.240+01:00
draft = false
description = "Learn how to sort slices using slices.SortFunc in Go with custom comparison functions. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.SortFunc

last modified April 20, 2025

This tutorial explains how to use the slices.SortFunc function in Go.
We'll cover custom sorting of slices with practical examples.

The slices.SortFunc function sorts a slice using a custom comparison
function. It's part of Go's experimental slices package.

This function provides flexible sorting when built-in ordering isn't sufficient.
It allows sorting by any criteria you define in your comparison function.

## Basic slices.SortFunc Example

The simplest use of slices.SortFunc sorts integers in descending
order. We define a comparison function that reverses the normal order.

basic_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{3, 1, 4, 1, 5, 9, 2, 6}
    
    slices.SortFunc(numbers, func(a, b int) int {
        return b - a // For descending order
    })
    
    fmt.Println("Sorted numbers:", numbers)
}

The comparison function returns a positive number when a should come after b.
This results in a descending sort of the integer slice.

## Sorting Strings by Length

slices.SortFunc can sort strings by length instead of lexicographical
order. This example shows how to implement custom string sorting.

string_length_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "kiwi", "orange"}
    
    slices.SortFunc(words, func(a, b string) int {
        return len(a) - len(b)
    })
    
    fmt.Println("Sorted by length:", words)
}

The comparison function subtracts string lengths to determine order. Shorter
strings appear first in the sorted result.

## Sorting Structs by Field

We can use slices.SortFunc to sort structs by specific fields.
This example sorts people by age.

struct_sort.go
  

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
        {"Charlie", 20},
    }
    
    slices.SortFunc(people, func(a, b Person) int {
        return a.Age - b.Age
    })
    
    fmt.Println("Sorted by age:", people)
}

The comparison function accesses the Age field of each struct. The result is
sorted from youngest to oldest person.

## Case-Insensitive String Sorting

This example demonstrates case-insensitive sorting of strings using
slices.SortFunc.

case_insensitive_sort.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"Apple", "banana", "cherry", "apricot"}
    
    slices.SortFunc(words, func(a, b string) int {
        return strings.Compare(strings.ToLower(a), strings.ToLower(b))
    })
    
    fmt.Println("Case-insensitive sort:", words)
}

The comparison converts both strings to lowercase before comparing. This ensures
sorting ignores case differences between words.

## Multi-Field Sorting

slices.SortFunc can implement complex sorting criteria. This example
sorts by multiple fields (last name then first name).

multi_field_sort.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

type Person struct {
    First string
    Last  string
}

func main() {
    people := []Person{
        {"John", "Doe"},
        {"Alice", "Smith"},
        {"Bob", "Smith"},
        {"Alice", "Adams"},
    }
    
    slices.SortFunc(people, func(a, b Person) int {
        if cmp := strings.Compare(a.Last, b.Last); cmp != 0 {
            return cmp
        }
        return strings.Compare(a.First, b.First)
    })
    
    fmt.Println("Sorted people:", people)
}

The comparison first checks last names, then falls back to first names if last
names are equal. This creates a natural multi-field sort order.

## Custom Order Sorting

This example shows how to sort elements according to a custom priority order
rather than natural ordering.

custom_order_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    colors := []string{"red", "blue", "green", "red", "blue"}
    priority := map[string]int{"red": 1, "blue": 2, "green": 3}
    
    slices.SortFunc(colors, func(a, b string) int {
        return priority[a] - priority[b]
    })
    
    fmt.Println("Sorted by priority:", colors)
}

The comparison uses a priority map to define the sort order. Red appears first,
followed by blue, then green in the sorted result.

## Stable Sorting

While slices.SortFunc isn't stable by default, we can implement
stability by including original indices in the comparison.

stable_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    items := []struct {
        Value int
        Index int
    }{
        {3, 0}, {1, 1}, {2, 2}, {1, 3}, {3, 4},
    }
    
    slices.SortFunc(items, func(a, b struct {
        Value int
        Index int
    }) int {
        if a.Value != b.Value {
            return a.Value - b.Value
        }
        return a.Index - b.Index
    })
    
    fmt.Println("Stable sort result:", items)
}

When values are equal, the comparison uses the original index to maintain order.
This achieves stable sorting behavior with slices.SortFunc.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.SortFunc function in Go with practical
examples of custom sorting for various data types and scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).