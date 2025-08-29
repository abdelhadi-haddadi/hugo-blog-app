+++
title = "Golang slices.Insert"
date = 2025-08-29T19:56:01.541+01:00
draft = false
description = "Learn how to use slices.Insert in Go to add elements into slices. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Insert

last modified April 20, 2025

This tutorial explains how to use the slices.Insert function in Go.
We'll cover slice insertion operations with practical examples.

The slices.Insert function inserts elements into a slice at a specified
index. It's part of Go's experimental slices package.

This function is useful for modifying slices by adding new elements at any
position. It returns a new slice with the inserted elements.

## Basic slices.Insert Example

The simplest use of slices.Insert adds one element at position 2.
The original slice remains unchanged.

basic_insert.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    newNumbers := slices.Insert(numbers, 2, 99)
    
    fmt.Println("Original:", numbers)
    fmt.Println("Modified:", newNumbers)
}

We create a slice of numbers and insert 99 at index 2. The new slice contains
the inserted element while the original stays intact.

## Inserting Multiple Elements

slices.Insert can insert multiple elements at once. This example
adds three strings at position 1.

multiple_insert.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruits := []string{"apple", "banana", "cherry"}
    
    newFruits := slices.Insert(fruits, 1, "orange", "pear", "grape")
    
    fmt.Println("Original:", fruits)
    fmt.Println("Modified:", newFruits)
}

The function accepts variadic arguments for elements to insert. All elements are
added consecutively starting at the specified index.

## Inserting at the Beginning

To insert at the start of a slice, use index 0. This example prepends elements.

prepend.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    letters := []string{"d", "e", "f"}
    
    newLetters := slices.Insert(letters, 0, "a", "b", "c")
    
    fmt.Println("Original:", letters)
    fmt.Println("Modified:", newLetters)
}

Inserting at index 0 effectively prepends elements to the slice. The original
slice remains unchanged.

## Inserting at the End

To append elements, use the slice length as the index. This example adds elements
to the end.

append_insert.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    colors := []string{"red", "green", "blue"}
    
    newColors := slices.Insert(colors, len(colors), "yellow", "purple")
    
    fmt.Println("Original:", colors)
    fmt.Println("Modified:", newColors)
}

Using len(slice) as the index appends elements. This is equivalent
to using the built-in append function.

## Inserting into an Empty Slice

slices.Insert works with empty slices. This example demonstrates
inserting into a nil slice.

empty_insert.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    newSlice := slices.Insert(empty, 0, 10, 20, 30)
    
    fmt.Println("Original:", empty)
    fmt.Println("Modified:", newSlice)
}

Inserting into an empty slice creates a new slice with the specified elements.
The operation is valid even with index 0 on a nil slice.

## Inserting with Out-of-Bounds Index

Attempting to insert beyond the slice length causes a panic. This example shows
the safe way to handle insertions.

bounds_check.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    data := []int{1, 2, 3}
    
    // Safe insertion
    if len(data) &gt;= 5 {
        newData := slices.Insert(data, 5, 99)
        fmt.Println(newData)
    } else {
        fmt.Println("Cannot insert beyond slice length")
    }
    
    // Correct approach
    newData := slices.Insert(data, len(data), 99)
    fmt.Println("Safe insertion:", newData)
}

Always check slice bounds before inserting. The function panics if the index is
greater than the slice length.

## Practical Example: Inserting into a Sorted Slice

This practical example maintains a sorted slice by inserting at the correct
position. It finds the insertion point first.

sorted_insert.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    sorted := []int{10, 20, 30, 40, 50}
    newValue := 25
    
    // Find insertion point
    i, _ := slices.BinarySearch(sorted, newValue)
    
    // Insert at the correct position
    newSorted := slices.Insert(sorted, i, newValue)
    
    fmt.Println("Original:", sorted)
    fmt.Println("Modified:", newSorted)
}

We use slices.BinarySearch to find where to insert the new value.
This maintains the sorted order efficiently.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Insert function in Go with practical
examples of inserting elements into slices at various positions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).