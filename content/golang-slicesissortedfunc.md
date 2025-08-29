+++
title = "Golang slices.IsSortedFunc"
date = 2025-08-29T19:56:02.654+01:00
draft = false
description = "Learn how to use slices.IsSortedFunc in Go to check custom sort orders in slices. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.IsSortedFunc

last modified April 20, 2025

This tutorial explains how to use the slices.IsSortedFunc function in Go.
We'll cover slice operations with practical examples of checking sort order.

The slices.IsSortedFunc function tests whether a slice is sorted according
to a custom comparison function. It's part of Go's experimental slices package.

This function is useful for verifying custom sort orders beyond simple ascending
or descending sequences. It returns true if the slice is sorted as defined.

## Basic slices.IsSortedFunc Example

The simplest use of slices.IsSortedFunc checks if numbers are sorted
in ascending order. We define a comparison function that returns -1, 0, or 1.

basic_sorted.go
  

package main

import (
    "cmp"
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    isSorted := slices.IsSortedFunc(numbers, func(a, b int) int {
        return cmp.Compare(a, b)
    })
    
    fmt.Println("Is sorted:", isSorted)
}

We create a sorted slice and check its order using the standard comparison.
The function returns true since the numbers are in ascending sequence.

## Checking Descending Order

slices.IsSortedFunc can verify descending order by reversing the
comparison logic. This example checks if numbers are sorted high to low.

descending_order.go
  

package main

import (
    "cmp"
    "fmt"
    "slices"
)

func main() {
    numbers := []int{5, 4, 3, 2, 1}
    
    isSorted := slices.IsSortedFunc(numbers, func(a, b int) int {
        return cmp.Compare(b, a) // Reverse comparison
    })
    
    fmt.Println("Is sorted descending:", isSorted)
}

By comparing b to a instead of a to b, we invert the sort order check.
The function confirms our slice is properly sorted in descending order.

## Custom Struct Sorting

We can use slices.IsSortedFunc with custom struct types. This example
checks if people are sorted by age.

struct_sorting.go
  

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
        {"Charlie", 35},
    }
    
    isSorted := slices.IsSortedFunc(people, func(a, b Person) int {
        return cmp.Compare(a.Age, b.Age)
    })
    
    fmt.Println("Sorted by age:", isSorted)
}

The comparison function examines the Age field of each Person struct.
Since ages increase sequentially, the function returns true.

## Case-Insensitive String Sorting

slices.IsSortedFunc can handle case-insensitive string comparisons.
This example checks if words are sorted alphabetically ignoring case.

case_insensitive.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "Banana", "cherry"}
    
    isSorted := slices.IsSortedFunc(words, func(a, b string) int {
        return strings.Compare(strings.ToLower(a), strings.ToLower(b))
    })
    
    fmt.Println("Case-insensitive sorted:", isSorted)
}

We convert strings to lowercase before comparing to ignore case differences.
The function confirms our slice follows alphabetical order regardless of case.

## Empty and Single-Element Slices

slices.IsSortedFunc has special behavior for empty and single-element
slices. These cases are always considered sorted.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := []int{}
    single := []string{"hello"}
    
    emptySorted := slices.IsSortedFunc(empty, func(a, b int) int {
        return 0 // Doesn't matter
    })
    
    singleSorted := slices.IsSortedFunc(single, func(a, b string) int {
        return 0 // Doesn't matter
    })
    
    fmt.Println("Empty sorted:", emptySorted)
    fmt.Println("Single-element sorted:", singleSorted)
}

With zero or one elements, there are no pairs to compare. The function
returns true by definition for these cases.

## Complex Custom Sorting

We can implement complex sorting logic with slices.IsSortedFunc.
This example checks if points are sorted by distance from origin.

complex_sorting.go
  

package main

import (
    "fmt"
    "math"
    "slices"
)

type Point struct {
    X, Y float64
}

func main() {
    points := []Point{
        {1, 1},
        {2, 2},
        {3, 3},
    }
    
    isSorted := slices.IsSortedFunc(points, func(a, b Point) int {
        distA := math.Sqrt(a.X*a.X + a.Y*a.Y)
        distB := math.Sqrt(b.X*b.X + b.Y*b.Y)
        
        if distA &lt; distB {
            return -1
        } else if distA &gt; distB {
            return 1
        }
        return 0
    })
    
    fmt.Println("Sorted by distance:", isSorted)
}

We calculate each point's distance from the origin before comparing.
The function verifies the points are ordered by increasing distance.

## Practical Example: Version Numbers

This practical example checks if version strings are sorted correctly,
handling the dotted-number format appropriately.

version_sorting.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
    "strings"
)

func main() {
    versions := []string{"1.2", "1.10", "1.9", "2.0"}
    
    isSorted := slices.IsSortedFunc(versions, func(a, b string) int {
        aParts := strings.Split(a, ".")
        bParts := strings.Split(b, ".")
        
        for i := 0; i &lt; len(aParts) &amp;&amp; i &lt; len(bParts); i++ {
            aNum, _ := strconv.Atoi(aParts[i])
            bNum, _ := strconv.Atoi(bParts[i])
            
            if aNum != bNum {
                return aNum - bNum
            }
        }
        return len(aParts) - len(bParts)
    })
    
    fmt.Println("Versions sorted correctly:", isSorted)
}

We split version strings into components and compare numerically.
The function returns false because "1.10" should come after "1.9".

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.IsSortedFunc function in Go with practical
examples of checking custom sort orders in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).