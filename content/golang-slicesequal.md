+++
title = "Golang slices.Equal"
date = 2025-08-29T19:55:59.342+01:00
draft = false
description = "Learn how to use slices.Equal in Go to compare slices for equality. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Equal

last modified April 20, 2025

This tutorial explains how to use the slices.Equal function in Go.
We'll cover slice comparison with practical examples of checking equality.

The slices.Equal function compares two slices for equality. It checks
if both slices have the same length and contain equal elements in the same order.

This function is useful for comparing collections of data without writing manual
loops. It works with any comparable type in Go (types that support == operator).

## Basic slices.Equal Example

The simplest use of slices.Equal compares two integer slices. The
function returns true only if both slices are identical in length and content.

basic_equal.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    slice1 := []int{1, 2, 3}
    slice2 := []int{1, 2, 3}
    slice3 := []int{1, 2, 4}
    
    fmt.Println("slice1 == slice2:", slices.Equal(slice1, slice2))
    fmt.Println("slice1 == slice3:", slices.Equal(slice1, slice3))
}

We create three slices where two are identical. The function correctly identifies
equal and unequal slices. The comparison is both length and element sensitive.

## Comparing String Slices

slices.Equal works with string slices just as well. This example
compares two string slices for equality.

string_equal.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruits1 := []string{"apple", "banana", "cherry"}
    fruits2 := []string{"apple", "banana", "cherry"}
    fruits3 := []string{"Apple", "Banana", "Cherry"}
    
    fmt.Println("fruits1 == fruits2:", slices.Equal(fruits1, fruits2))
    fmt.Println("fruits1 == fruits3:", slices.Equal(fruits1, fruits3))
}

String comparisons are case-sensitive in Go. The function returns false for
differently cased strings even if they look similar.

## Comparing Struct Slices

We can compare slices of structs if the struct fields are comparable. This
example demonstrates struct slice comparison.

struct_equal.go
  

package main

import (
    "fmt"
    "slices"
)

type Point struct {
    X, Y int
}

func main() {
    points1 := []Point{{1, 2}, {3, 4}}
    points2 := []Point{{1, 2}, {3, 4}}
    points3 := []Point{{1, 2}, {3, 5}}
    
    fmt.Println("points1 == points2:", slices.Equal(points1, points2))
    fmt.Println("points1 == points3:", slices.Equal(points1, points3))
}

The function compares all fields of each struct element. All fields must be equal
for the slices to be considered equal.

## Comparing Different Length Slices

slices.Equal immediately returns false for slices of different
lengths, without comparing elements. This example demonstrates this behavior.

length_equal.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    short := []int{1, 2, 3}
    long := []int{1, 2, 3, 4}
    
    fmt.Println("Different length slices:", slices.Equal(short, long))
    
    samePrefix := []int{1, 2, 3, 0}
    fmt.Println("Same prefix slices:", slices.Equal(short, samePrefix[:3]))
}

Even if the first elements match, different lengths make slices unequal. The
function checks length before comparing elements for efficiency.

## Comparing Empty Slices

Empty slices are considered equal by slices.Equal. This example
shows various empty slice comparisons.

empty_equal.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty1 := []int{}
    empty2 := make([]int, 0)
    var empty3 []int
    
    fmt.Println("empty1 == empty2:", slices.Equal(empty1, empty2))
    fmt.Println("empty1 == empty3:", slices.Equal(empty1, empty3))
    fmt.Println("empty1 == nil:", slices.Equal(empty1, nil))
}

All empty slices are equal regardless of how they were created. The function
treats nil slices as equal to empty slices.

## Comparing Slices with Different Capacities

Capacity doesn't affect equality comparison. This example shows that only length
and elements matter for equality.

capacity_equal.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    slice1 := make([]int, 3, 10)
    slice2 := make([]int, 3, 5)
    
    for i := 0; i &lt; 3; i++ {
        slice1[i] = i + 1
        slice2[i] = i + 1
    }
    
    fmt.Println("Different capacity slices:", slices.Equal(slice1, slice2))
    fmt.Println("Capacities:", cap(slice1), cap(slice2))
}

Despite different capacities, the slices are equal because their lengths and
elements match. Capacity is irrelevant for equality comparison.

## Practical Example: Testing Function Output

This practical example uses slices.Equal to test a function that
returns a slice. It's a common use case in unit testing.

testing_equal.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func SplitAndTrim(s string) []string {
    parts := strings.Split(s, ",")
    for i := range parts {
        parts[i] = strings.TrimSpace(parts[i])
    }
    return parts
}

func main() {
    input := "apple, banana, cherry"
    expected := []string{"apple", "banana", "cherry"}
    
    result := SplitAndTrim(input)
    
    if slices.Equal(result, expected) {
        fmt.Println("Test passed!")
    } else {
        fmt.Println("Test failed. Got:", result)
    }
}

We compare the function output with expected results. This pattern is useful for
validating functions that return slices in test cases.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Equal function in Go with practical
examples of comparing slices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).