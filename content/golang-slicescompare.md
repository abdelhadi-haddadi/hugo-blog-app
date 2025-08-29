+++
title = "Golang slices.Compare"
date = 2025-08-29T19:55:57.109+01:00
draft = false
description = "Understand how to compare slices in Go. Includes examples of equality checks and comparisons."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Compare

last modified April 20, 2025

This tutorial explains how to use the slices.Compare function in Go.
We'll cover slice comparison operations with practical examples.

The slices.Compare function compares two slices lexicographically.
It returns 0 if the slices are equal, -1 if the first slice is "less", or 1 if
the first slice is "greater".

This function is useful for sorting, testing equality, and ordering operations.
It compares elements in order until it finds a difference or reaches the end.

## Basic slices.Compare Example

The simplest use of slices.Compare checks if two integer slices are
equal. The function returns 0 when slices have identical elements.

basic_compare.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s1 := []int{1, 2, 3}
    s2 := []int{1, 2, 3}
    
    result := slices.Compare(s1, s2)
    fmt.Println("Comparison result:", result)
}

We create two identical integer slices and compare them. The output is 0,
indicating the slices are equal element by element.

## Comparing Different Slices

slices.Compare returns -1 or 1 when slices differ. This example
shows comparison of slices with different elements.

different_slices.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s1 := []int{1, 2, 3}
    s2 := []int{1, 3, 2}
    
    result1 := slices.Compare(s1, s2)
    result2 := slices.Compare(s2, s1)
    
    fmt.Println("s1 vs s2:", result1)
    fmt.Println("s2 vs s1:", result2)
}

The first comparison returns -1 because 2 is less than 3 at index 1. The reverse
comparison returns 1, showing the order matters.

## Comparing String Slices

We can use slices.Compare with string slices. The comparison is
lexicographical, like dictionary order.

string_compare.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words1 := []string{"apple", "banana"}
    words2 := []string{"apple", "cherry"}
    
    result := slices.Compare(words1, words2)
    fmt.Println("Comparison result:", result)
}

The function compares "banana" and "cherry" at index 1. Since "banana" comes
before "cherry" alphabetically, it returns -1.

## Comparing Slices of Different Lengths

When comparing slices of different lengths, the shorter slice is considered
"less" if all elements match up to the shorter length.

different_lengths.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s1 := []int{1, 2, 3}
    s2 := []int{1, 2}
    
    result1 := slices.Compare(s1, s2)
    result2 := slices.Compare(s2, s1)
    
    fmt.Println("Longer vs shorter:", result1)
    fmt.Println("Shorter vs longer:", result2)
}

The first comparison returns 1 because s1 is longer than s2. The second returns
-1 because s2 is shorter than s1. Elements match up to the shorter length.

## Using Compare with Struct Slices

slices.Compare works with any comparable type, including structs.
The comparison is field-by-field in declaration order.

struct_compare.go
  

package main

import (
    "fmt"
    "slices"
)

type Point struct {
    X, Y int
}

func main() {
    p1 := []Point{{1, 2}, {3, 4}}
    p2 := []Point{{1, 2}, {3, 5}}
    
    result := slices.Compare(p1, p2)
    fmt.Println("Comparison result:", result)
}

The function compares Point structs first by X, then by Y. At index 1, Y values
4 and 5 differ, so it returns -1 since 4 is less than 5.

## Practical Example: Version Comparison

This practical example compares version numbers represented as integer slices.
It demonstrates real-world use of slices.Compare.

version_compare.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    v1 := []int{1, 18, 0}
    v2 := []int{1, 19, 0}
    
    result := slices.Compare(v1, v2)
    
    switch result {
    case -1:
        fmt.Println("v1 is older than v2")
    case 0:
        fmt.Println("Versions are equal")
    case 1:
        fmt.Println("v1 is newer than v2")
    }
}

We compare two version numbers (1.18.0 and 1.19.0) represented as integer
slices. The output shows v1 is older than v2 due to the 18 vs 19 comparison.

## Performance Considerations

For large slices, slices.Compare performance is linear with slice
length. This example benchmarks comparison operations.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    large1 := make([]int, 1_000_000)
    large2 := make([]int, 1_000_000)
    
    // Equal slices
    start := time.Now()
    _ = slices.Compare(large1, large2)
    fmt.Println("Equal slices:", time.Since(start))
    
    // Different at start
    large2[0] = 1
    start = time.Now()
    _ = slices.Compare(large1, large2)
    fmt.Println("Different first element:", time.Since(start))
    
    // Different at end
    large2[0] = 0
    large2[999_999] = 1
    start = time.Now()
    _ = slices.Compare(large1, large2)
    fmt.Println("Different last element:", time.Since(start))
}

The function stops at the first difference, so performance varies based on where
the first mismatch occurs. Early differences are faster to detect.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Compare function in Go with
practical examples of comparing slices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).