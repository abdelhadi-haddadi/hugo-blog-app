+++
title = "Golang slices.Clone"
date = 2025-08-29T19:55:55.999+01:00
draft = false
description = "Learn how to clone slices in Go using the slices.Clone function. This tutorial provides examples for creating independent copies of slices, handling structs, and more."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Clone

last modified April 20, 2025

This tutorial explains how to use the slices.Clone function in Go.
We'll cover slice cloning operations with practical examples.

The slices.Clone function creates a new slice that is a shallow copy
of the original slice. It's part of Go's experimental slices package.

This function is useful when you need an independent copy of a slice to prevent
unintended modifications to the original data. It returns a new slice with the
same elements.

## Basic slices.Clone Example

The simplest use of slices.Clone creates a copy of a string slice.
We can then modify the copy without affecting the original.

basic_clone.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    original := []string{"apple", "banana", "cherry"}
    clone := slices.Clone(original)
    
    clone[0] = "orange"
    
    fmt.Println("Original:", original)
    fmt.Println("Clone:", clone)
}

We create a clone of the original slice and change its first element. The
original slice remains unchanged, demonstrating independent copies.

## Cloning Integer Slices

slices.Clone works with any slice type. This example clones a slice
of integers and modifies the copy.

int_clone.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    nums := []int{1, 2, 3, 4, 5}
    numsCopy := slices.Clone(nums)
    
    numsCopy[0] = 100
    numsCopy = append(numsCopy, 6)
    
    fmt.Println("Original:", nums)
    fmt.Println("Clone:", numsCopy)
}

The clone starts with the same elements but can be modified independently. We
change an element and append a new value without affecting the original.

## Cloning Struct Slices

When cloning slices of structs, remember it's a shallow copy. This example shows
how struct fields remain shared between original and clone.

struct_clone.go
  

package main

import (
    "fmt"
    "slices"
)

type Point struct {
    X, Y int
}

func main() {
    original := []Point{{1, 2}, {3, 4}}
    clone := slices.Clone(original)
    
    clone[0].X = 100
    
    fmt.Println("Original:", original)
    fmt.Println("Clone:", clone)
}

Modifying a struct field in the clone affects the original because the structs
are shared. The slice headers are different but point to the same struct values.

## Empty Slice Behavior

slices.Clone handles empty slices gracefully. This example
demonstrates cloning an empty slice and checking its properties.

empty_clone.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := []int{}
    clone := slices.Clone(empty)
    
    fmt.Println("Original len:", len(empty), "cap:", cap(empty))
    fmt.Println("Clone len:", len(clone), "cap:", cap(clone))
    
    clone = append(clone, 1)
    fmt.Println("Modified clone:", clone)
}

The clone is a new empty slice with the same type. We can append to it without
affecting the original empty slice, which remains empty.

## Performance Considerations

For large slices, cloning has memory and performance implications. This example
benchmarks cloning different sized slices.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    sizes := []int{100, 10_000, 1_000_000}
    
    for _, size := range sizes {
        slice := make([]int, size)
        
        start := time.Now()
        _ = slices.Clone(slice)
        elapsed := time.Since(start)
        
        fmt.Printf("Size: %d, Time: %v\n", size, elapsed)
    }
}

The time taken increases with slice size. slices.Clone allocates new
memory and copies all elements, so consider performance for large slices.

## Comparing with Manual Copy

This example compares slices.Clone with manual slice copying using
append or make+copy.

compare_copy.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    original := []int{1, 2, 3, 4, 5}
    
    // Method 1: slices.Clone
    clone1 := slices.Clone(original)
    
    // Method 2: append
    clone2 := append([]int(nil), original...)
    
    // Method 3: make + copy
    clone3 := make([]int, len(original))
    copy(clone3, original)
    
    // Modify all clones
    clone1[0] = 100
    clone2[0] = 200
    clone3[0] = 300
    
    fmt.Println("Original:", original)
    fmt.Println("Clone1:", clone1)
    fmt.Println("Clone2:", clone2)
    fmt.Println("Clone3:", clone3)
}

All three methods create independent copies. slices.Clone provides
a cleaner, more readable alternative to manual copying techniques.

## Practical Example: Immutable Function Parameters

This practical example shows how to use slices.Clone to protect
function parameters from modification.

immutable_params.go
  

package main

import (
    "fmt"
    "slices"
)

func processData(data []string) []string {
    // Create a local copy to prevent modifying input
    localCopy := slices.Clone(data)
    
    // Modify the copy
    for i := range localCopy {
        localCopy[i] = "processed_" + localCopy[i]
    }
    
    return localCopy
}

func main() {
    original := []string{"a", "b", "c"}
    result := processData(original)
    
    fmt.Println("Original:", original)
    fmt.Println("Result:", result)
}

By cloning the input slice, we ensure the original data remains unchanged. This
is a common pattern when working with slice parameters in functions.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Clone function in Go with practical
examples of creating independent slice copies in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).