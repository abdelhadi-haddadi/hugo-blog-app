+++
title = "Golang slices.CompareFunc"
date = 2025-08-29T19:55:57.113+01:00
draft = false
description = "A detailed guide on using slices.CompareFunc in Go for custom slice comparisons with examples and explanations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.CompareFunc

last modified April 20, 2025

This tutorial explains how to use the slices.CompareFunc function in Go.
We'll cover slice comparison operations with practical examples using custom comparison functions.

The slices.CompareFunc function compares two slices element-wise using a custom comparison function.
It's part of Go's experimental slices package and provides flexible comparison capabilities.

This function is useful when you need custom comparison logic beyond simple equality checks.
It returns -1, 0, or 1 based on the comparison result of corresponding elements.

## Basic slices.CompareFunc Example

The simplest use of slices.CompareFunc compares two integer slices.
We define a comparison function that returns the standard -1, 0, 1 ordering.

basic_compare.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s1 := []int{1, 2, 3}
    s2 := []int{1, 2, 4}
    
    cmp := slices.CompareFunc(s1, s2, func(a, b int) int {
        if a &lt; b {
            return -1
        }
        if a &gt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("Comparison result:", cmp)
}

We compare two similar integer slices with one differing element.
The custom function implements standard integer comparison logic.
The result is -1 because s1 is lexicographically less than s2.

## Case-Insensitive String Comparison

slices.CompareFunc can compare string slices with custom logic.
This example performs case-insensitive comparison of string elements.

string_compare.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    s1 := []string{"apple", "Banana", "cherry"}
    s2 := []string{"Apple", "banana", "Cherry"}
    
    cmp := slices.CompareFunc(s1, s2, func(a, b string) int {
        aLower := strings.ToLower(a)
        bLower := strings.ToLower(b)
        
        if aLower &lt; bLower {
            return -1
        }
        if aLower &gt; bLower {
            return 1
        }
        return 0
    })
    
    fmt.Println("Case-insensitive comparison:", cmp)
}

The comparison function converts strings to lowercase before comparing.
This makes the comparison case-insensitive. The result is 0 (equal) because
the slices contain the same words in different cases.

## Comparing Struct Slices

We can use slices.CompareFunc with custom struct types.
This example compares slices of Person structs by age field.

struct_compare.go
  

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
    group1 := []Person{
        {"Alice", 25},
        {"Bob", 30},
    }
    
    group2 := []Person{
        {"Alice", 25},
        {"Bob", 35},
    }
    
    cmp := slices.CompareFunc(group1, group2, func(a, b Person) int {
        if a.Age &lt; b.Age {
            return -1
        }
        if a.Age &gt; b.Age {
            return 1
        }
        return 0
    })
    
    fmt.Println("Person comparison by age:", cmp)
}

The comparison function only considers the Age field of Person structs.
The result is -1 because Bob is younger in group1 than in group2.
Name fields are ignored in this comparison.

## Comparing Different Length Slices

slices.CompareFunc handles slices of different lengths.
This example demonstrates the behavior when comparing unequal length slices.

length_compare.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s1 := []int{1, 2, 3}
    s2 := []int{1, 2, 3, 4}
    
    cmp := slices.CompareFunc(s1, s2, func(a, b int) int {
        if a &lt; b {
            return -1
        }
        if a &gt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("Different length comparison:", cmp)
}

When slices have different lengths, the shorter slice is considered less.
The result is -1 because s1 is shorter than s2, even though their common
elements are equal. This follows lexicographical ordering rules.

## Custom Float Comparison with Tolerance

For floating-point numbers, we often need comparison with tolerance.
This example implements approximate equality for float64 slices.

float_compare.go
  

package main

import (
    "fmt"
    "math"
    "slices"
)

func main() {
    s1 := []float64{1.0, 2.0, 3.0000001}
    s2 := []float64{1.0, 2.0, 3.0}
    
    cmp := slices.CompareFunc(s1, s2, func(a, b float64) int {
        if math.Abs(a-b) &lt; 0.0001 {
            return 0
        }
        if a &lt; b {
            return -1
        }
        return 1
    })
    
    fmt.Println("Float comparison with tolerance:", cmp)
}

The comparison function uses a small epsilon value (0.0001) to determine equality.
Numbers within this tolerance are considered equal. The result is 0 because
3.0000001 and 3.0 are considered equal with this tolerance.

## Reverse Order Comparison

We can implement reverse ordering by inverting the comparison logic.
This example compares slices in descending order.

reverse_compare.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s1 := []int{5, 3, 1}
    s2 := []int{5, 2, 1}
    
    cmp := slices.CompareFunc(s1, s2, func(a, b int) int {
        if a &gt; b {
            return -1
        }
        if a &lt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("Reverse order comparison:", cmp)
}

The comparison function returns inverted results to achieve descending order.
The result is -1 because 3 (in s1) is greater than 2 (in s2) in reverse order.
This demonstrates how to implement custom ordering logic.

## Practical Example: Version Number Comparison

This practical example compares version number slices using custom logic.
Version numbers are compared component by component.

version_compare.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
    "strings"
)

func main() {
    v1 := []string{"1", "2", "3"}
    v2 := []string{"1", "10", "0"}
    
    cmp := slices.CompareFunc(v1, v2, func(a, b string) int {
        aNum, _ := strconv.Atoi(a)
        bNum, _ := strconv.Atoi(b)
        
        if aNum &lt; bNum {
            return -1
        }
        if aNum &gt; bNum {
            return 1
        }
        return 0
    })
    
    fmt.Println("Version comparison result:", cmp)
}

Version strings are converted to numbers before comparison.
The result is -1 because 2 is less than 10 in the second component.
This demonstrates real-world usage for version number comparisons.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.CompareFunc function in Go with practical
examples of comparing slices with custom logic in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).