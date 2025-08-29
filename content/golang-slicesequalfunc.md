+++
title = "Golang slices.EqualFunc"
date = 2025-08-29T19:56:00.443+01:00
draft = false
description = "Learn how to use slices.EqualFunc in Go to compare slices with custom equality logic. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.EqualFunc

last modified April 20, 2025

This tutorial explains how to use the slices.EqualFunc function in Go.
We'll cover slice comparison with custom equality functions through examples.

The slices.EqualFunc function compares two slices using a custom
equality function. It's part of Go's experimental slices package.

This function is useful when you need custom comparison logic between slice
elements. It returns true only if all corresponding elements are equal.

## Basic slices.EqualFunc Example

The simplest use of slices.EqualFunc compares two integer slices.
We define an equality function that checks if numbers are equal.

basic_equal.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    nums1 := []int{1, 2, 3}
    nums2 := []int{1, 2, 3}
    
    equal := slices.EqualFunc(nums1, nums2, func(a, b int) bool {
        return a == b
    })
    
    fmt.Println("Slices are equal:", equal)
}

We create two identical slices and compare them. The anonymous function defines
our equality condition for each pair of elements.

## Case-Insensitive String Comparison

slices.EqualFunc can compare strings case-insensitively. This example
checks if two string slices contain the same words regardless of case.

case_insensitive.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words1 := []string{"Apple", "Banana"}
    words2 := []string{"apple", "banana"}
    
    equal := slices.EqualFunc(words1, words2, func(a, b string) bool {
        return strings.EqualFold(a, b)
    })
    
    fmt.Println("Case-insensitive equal:", equal)
}

The test function uses strings.EqualFold for case-insensitive
comparison. The slices are considered equal despite different casing.

## Comparing Structs by Field

We can use slices.EqualFunc with custom struct types. This example
compares slices of Person structs by their Age field.

struct_comparison.go
  

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
        {"Charlie", 25},
        {"Dana", 30},
    }
    
    equal := slices.EqualFunc(group1, group2, func(a, b Person) bool {
        return a.Age == b.Age
    })
    
    fmt.Println("Groups have same ages:", equal)
}

The function compares only the Age fields, ignoring names. The slices are equal
as their age sequences match.

## Floating-Point Comparison with Tolerance

For floating-point numbers, exact equality is often problematic. This example
uses a tolerance-based comparison.

float_comparison.go
  

package main

import (
    "fmt"
    "math"
    "slices"
)

func main() {
    floats1 := []float64{1.0, 2.0, 3.0}
    floats2 := []float64{1.0000001, 1.9999999, 3.0000001}
    
    equal := slices.EqualFunc(floats1, floats2, func(a, b float64) bool {
        return math.Abs(a-b) &lt; 0.0001
    })
    
    fmt.Println("Floats equal within tolerance:", equal)
}

The comparison uses a small epsilon value to account for floating-point
imprecision. The slices are considered equal despite tiny differences.

## Comparing Different Types

slices.EqualFunc can compare slices of different but compatible
types. This example compares integers with their string representations.

type_conversion.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
)

func main() {
    nums := []int{1, 2, 3}
    strs := []string{"1", "2", "3"}
    
    equal := slices.EqualFunc(nums, strs, func(n int, s string) bool {
        return strconv.Itoa(n) == s
    })
    
    fmt.Println("Numbers match strings:", equal)
}

The function converts integers to strings for comparison. The slices are equal
as their values correspond despite different types.

## Empty and Nil Slice Behavior

slices.EqualFunc handles empty and nil slices specially. This
example demonstrates various edge cases.

empty_slices.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var nilSlice []int
    emptySlice := []int{}
    dataSlice := []int{1, 2, 3}
    
    // Nil vs empty
    fmt.Println("Nil == empty:", 
        slices.EqualFunc(nilSlice, emptySlice, func(a, b int) bool {
            return a == b
        }))
    
    // Nil vs nil
    fmt.Println("Nil == nil:", 
        slices.EqualFunc(nilSlice, nilSlice, func(a, b int) bool {
            return a == b
        }))
    
    // Empty vs data
    fmt.Println("Empty == data:", 
        slices.EqualFunc(emptySlice, dataSlice, func(a, b int) bool {
            return a == b
        }))
}

Nil and empty slices are considered equal to each other but not to non-empty
slices. The comparison function is never called for empty/nil slices.

## Practical Example: Database Results Comparison

This practical example compares database query results while ignoring certain
fields like timestamps or IDs.

db_comparison.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

type User struct {
    ID        int
    Username  string
    Email     string
    CreatedAt time.Time
}

func main() {
    // Simulated database results
    dbResult1 := []User{
        {1, "alice", "alice@example.com", time.Now()},
        {2, "bob", "bob@example.com", time.Now()},
    }
    
    dbResult2 := []User{
        {3, "alice", "alice@example.com", time.Now().Add(time.Hour)},
        {4, "bob", "bob@example.com", time.Now().Add(time.Hour)},
    }
    
    equal := slices.EqualFunc(dbResult1, dbResult2, func(a, b User) bool {
        return a.Username == b.Username &amp;&amp; a.Email == b.Email
    })
    
    fmt.Println("User data matches (excluding IDs/timestamps):", equal)
}

We compare user data while ignoring automatically generated fields. This
demonstrates a real-world use case for custom equality logic.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.EqualFunc function in Go with
practical examples of custom slice comparison in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).