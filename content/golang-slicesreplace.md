+++
title = "Golang slices.Replace"
date = 2025-08-29T19:56:04.970+01:00
draft = false
description = "Learn how to replace elements in slices using slices.Replace in Go. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Replace

last modified April 20, 2025

This tutorial explains how to use the slices.Replace function in Go.
We'll cover slice operations with practical examples of replacing elements.

The slices.Replace function replaces elements in a slice with new
elements. It's part of Go's experimental slices package.

This function is useful for modifying slices without creating new ones. It can
replace zero or more elements with zero or more new elements.

## Basic slices.Replace Example

The simplest use of slices.Replace replaces one element with
another. We specify the start and end index of the elements to replace.

basic_replace.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    // Replace element at index 2 (value 3) with 99
    newNumbers := slices.Replace(numbers, 2, 3, 99)
    
    fmt.Println("Original:", numbers)
    fmt.Println("Modified:", newNumbers)
}

We replace one element (index 2) with a new value (99). The original slice
remains unchanged, and a new slice is returned.

## Replacing Multiple Elements

slices.Replace can replace multiple elements at once. This example
replaces two elements with three new values.

multiple_replace.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    colors := []string{"red", "green", "blue", "yellow"}
    
    // Replace elements at index 1-2 with three new colors
    newColors := slices.Replace(colors, 1, 3, "orange", "purple", "cyan")
    
    fmt.Println("Original:", colors)
    fmt.Println("Modified:", newColors)
}

We replace "green" and "blue" with three new colors. The slice length increases
by one because we added more elements than we removed.

## Replacing with Zero Elements

We can use slices.Replace to effectively delete elements by
replacing them with nothing. This removes elements without leaving gaps.

delete_elements.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    data := []int{10, 20, 30, 40, 50, 60}
    
    // Remove elements at index 2-4 (30, 40, 50)
    newData := slices.Replace(data, 2, 5)
    
    fmt.Println("Original:", data)
    fmt.Println("Modified:", newData)
}

By not providing replacement values, we effectively delete the specified range.
The resulting slice is shorter than the original.

## Inserting Without Replacement

slices.Replace can insert elements without replacing any by using
equal start and end indices. This example demonstrates insertion.

insert_elements.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    letters := []string{"a", "b", "c", "d"}
    
    // Insert at index 2 without replacing any elements
    newLetters := slices.Replace(letters, 2, 2, "x", "y", "z")
    
    fmt.Println("Original:", letters)
    fmt.Println("Modified:", newLetters)
}

We insert three new elements at position 2 without removing any. The slice
length increases by three as a result.

## Edge Case: Empty Slice

slices.Replace handles empty slices gracefully. This example shows
how to build a slice from an empty one.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    // Build a new slice by replacing in empty slice
    newSlice := slices.Replace(empty, 0, 0, 1, 2, 3)
    
    fmt.Println("Original:", empty)
    fmt.Println("Modified:", newSlice)
}

We start with an empty slice and insert three elements. The function works as
expected, creating a new slice with the specified values.

## Replacing Struct Elements

slices.Replace works with custom struct types. This example
demonstrates replacing struct values in a slice.

struct_replace.go
  

package main

import (
    "fmt"
    "slices"
)

type Point struct {
    X, Y int
}

func main() {
    points := []Point{
        {1, 2},
        {3, 4},
        {5, 6},
    }
    
    // Replace the middle point with two new points
    newPoints := slices.Replace(points, 1, 2, Point{7, 8}, Point{9, 10})
    
    fmt.Println("Original:", points)
    fmt.Println("Modified:", newPoints)
}

We replace one Point struct with two new ones. The function handles custom types
just as well as built-in types.

## Practical Example: Updating Records

This practical example shows how to update records in a slice. We replace
outdated entries with current ones.

update_records.go
  

package main

import (
    "fmt"
    "slices"
)

type Product struct {
    ID    int
    Name  string
    Price float64
}

func main() {
    products := []Product{
        {1, "Laptop", 999.99},
        {2, "Phone", 699.99},
        {3, "Tablet", 399.99},
    }
    
    // Update prices for products with ID 2 and 3
    updated := slices.Replace(products, 1, 3,
        Product{2, "Phone", 649.99},
        Product{3, "Tablet", 349.99},
    )
    
    fmt.Println("Original products:")
    for _, p := range products {
        fmt.Printf("%d: %s $%.2f\n", p.ID, p.Name, p.Price)
    }
    
    fmt.Println("\nUpdated products:")
    for _, p := range updated {
        fmt.Printf("%d: %s $%.2f\n", p.ID, p.Name, p.Price)
    }
}

We replace two products with updated price information. The example demonstrates
a real-world use case for the Replace function.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Replace function in Go with practical
examples of replacing elements in slices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).