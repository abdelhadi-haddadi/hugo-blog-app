+++
title = "Golang slices.Sort"
date = 2025-08-29T19:56:04.975+01:00
draft = false
description = "Learn how to sort elements in slices using slices.Sort in Go. Includes practical examples for numbers, strings, and custom types."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Sort

last modified April 20, 2025

This tutorial explains how to use the slices.Sort function in Go.
We'll cover sorting operations with practical examples for different data types.

The slices.Sort function sorts the elements of a slice in ascending
order. It's part of Go's experimental slices package and works with ordered types.

This function is optimized for performance and provides a convenient way to sort
collections without writing custom sorting logic for basic cases.

## Basic slices.Sort Example

The simplest use of slices.Sort sorts a slice of integers in
ascending order. The function modifies the original slice in place.

basic_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{5, 2, 9, 1, 5, 6}
    slices.Sort(numbers)
    fmt.Println("Sorted numbers:", numbers)
}

We create a slice of unordered numbers and sort them. The output shows the
numbers in ascending order. The original slice is modified.

## Sorting Strings

slices.Sort can sort string slices alphabetically. This example
demonstrates sorting a list of names.

string_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    names := []string{"Zoe", "Alice", "Bob", "Charlie"}
    slices.Sort(names)
    fmt.Println("Sorted names:", names)
}

The strings are sorted in lexicographical order. The sort is case-sensitive,
with uppercase letters coming before lowercase in ASCII order.

## Sorting Structs with Custom Comparison

For custom types, we use slices.SortFunc with a comparison function.
This example sorts people by age.

struct_sort.go
  

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
    
    slices.SortFunc(people, func(a, b Person) int {
        return cmp.Compare(a.Age, b.Age)
    })
    
    fmt.Println("People sorted by age:", people)
}

We define a comparison function that uses cmp.Compare to determine
the order. The function returns -1, 0, or 1 for less, equal, or greater.

## Sorting in Descending Order

To sort in descending order, we reverse the comparison logic. This example
sorts numbers from highest to lowest.

descending_sort.go
  

package main

import (
    "cmp"
    "fmt"
    "slices"
)

func main() {
    numbers := []int{5, 2, 9, 1, 5, 6}
    
    slices.SortFunc(numbers, func(a, b int) int {
        return cmp.Compare(b, a) // Reverse order
    })
    
    fmt.Println("Descending order:", numbers)
}

By comparing b to a instead of a to b, we invert the sort order. The same
technique works for any comparable type.

## Sorting with Multiple Criteria

Complex sorts can use multiple fields. This example sorts people by last name,
then first name.

multi_field_sort.go
  

package main

import (
    "cmp"
    "fmt"
    "slices"
)

type Person struct {
    First string
    Last  string
}

func main() {
    people := []Person{
        {"Alice", "Smith"},
        {"Bob", "Johnson"},
        {"Alice", "Johnson"},
    }
    
    slices.SortFunc(people, func(a, b Person) int {
        if c := cmp.Compare(a.Last, b.Last); c != 0 {
            return c
        }
        return cmp.Compare(a.First, b.First)
    })
    
    fmt.Println("Sorted people:", people)
}

The comparison first checks last names, then falls back to first names if
last names are equal. This creates a natural sorting order.

## Stable Sorting

slices.SortStableFunc maintains the relative order of equal elements.
This is useful when preserving original order matters.

stable_sort.go
  

package main

import (
    "cmp"
    "fmt"
    "slices"
)

type Item struct {
    Name  string
    Order int // Original position
}

func main() {
    items := []Item{
        {"A", 1},
        {"B", 2},
        {"A", 3},
    }
    
    slices.SortStableFunc(items, func(a, b Item) int {
        return cmp.Compare(a.Name, b.Name)
    })
    
    fmt.Println("Stable sorted items:", items)
}

Both "A" items maintain their original relative order (1 before 3). Regular
sort might not preserve this ordering for equal elements.

## Performance Considerations

The sort functions use efficient algorithms. This example benchmarks sorting
different sized slices.

performance.go
  

package main

import (
    "fmt"
    "math/rand"
    "slices"
    "time"
)

func main() {
    sizes := []int{100, 10_000, 1_000_000}
    
    for _, size := range sizes {
        slice := make([]int, size)
        for i := range slice {
            slice[i] = rand.Intn(size)
        }
        
        start := time.Now()
        slices.Sort(slice)
        elapsed := time.Since(start)
        
        fmt.Printf("Sorted %d elements in %v\n", size, elapsed)
    }
}

The implementation uses an optimized quicksort for most cases. Performance
degrades to O(n^2) for worst-case inputs, though this is rare in practice.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Sort function in Go with practical
examples of sorting different data types in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).