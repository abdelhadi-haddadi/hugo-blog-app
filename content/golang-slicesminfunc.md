+++
title = "Golang slices.MinFunc"
date = 2025-08-29T19:56:03.796+01:00
draft = false
description = "Learn how to find the minimum element in a slice using slices.MinFunc in Go with custom comparison functions. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.MinFunc

last modified April 20, 2025

This tutorial explains how to use the slices.MinFunc function in Go.
We'll cover finding minimum elements with custom comparison functions.

The slices.MinFunc function returns the minimum element in a slice
according to a custom comparison function. It's part of Go's experimental slices
package.

This function is useful when you need to find minimum values with custom ordering
rules or for complex data types. It returns the first minimum element found.

## Basic slices.MinFunc Example

The simplest use of slices.MinFunc finds the smallest number in a
slice. We define a comparison function that returns -1, 0, or 1.

basic_min.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{3, 1, 4, 1, 5, 9}
    
    min := slices.MinFunc(numbers, func(a, b int) int {
        if a &lt; b {
            return -1
        } else if a &gt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("Minimum number:", min)
}

We create a slice of numbers and find the minimum using a standard comparison.
The function returns 1 for the smallest element in the slice.

## Finding Minimum String Length

slices.MinFunc can find strings with minimum length. This example
compares strings by their length rather than lexicographical order.

string_min.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "cherry", "date"}
    
    shortest := slices.MinFunc(words, func(a, b string) int {
        if len(a) &lt; len(b) {
            return -1
        } else if len(a) &gt; len(b) {
            return 1
        }
        return 0
    })
    
    fmt.Println("Shortest word:", shortest)
}

The comparison function examines string lengths instead of their contents. "Date"
is returned as the shortest string with 4 characters.

## Working with Structs

We can use slices.MinFunc with custom struct types. This example
finds the youngest person in a slice.

struct_min.go
  

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
        {"Charlie", 17},
    }
    
    youngest := slices.MinFunc(people, func(a, b Person) int {
        if a.Age &lt; b.Age {
            return -1
        } else if a.Age &gt; b.Age {
            return 1
        }
        return 0
    })
    
    fmt.Println("Youngest person:", youngest.Name)
}

The function compares the Age field of each Person struct. Charlie is returned
as the youngest at 17 years old.

## Case-Insensitive String Comparison

This example demonstrates finding the minimum string while ignoring case
differences in the comparison.

case_insensitive.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"Apple", "banana", "cherry", "aardvark"}
    
    min := slices.MinFunc(words, func(a, b string) int {
        aLower := strings.ToLower(a)
        bLower := strings.ToLower(b)
        if aLower &lt; bLower {
            return -1
        } else if aLower &gt; bLower {
            return 1
        }
        return 0
    })
    
    fmt.Println("First in alphabetical order:", min)
}

The comparison converts strings to lowercase before comparing. "aardvark" is
returned as the minimum, despite its original casing.

## Empty Slice Behavior

slices.MinFunc panics when called with an empty slice. This
example demonstrates proper error handling.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()
    
    // This will panic
    _ = slices.MinFunc(empty, func(a, b int) int {
        if a &lt; b {
            return -1
        } else if a &gt; b {
            return 1
        }
        return 0
    })
}

The function panics because there's no valid minimum in an empty slice. Always
check slice length before calling MinFunc in production code.

## Finding Minimum by Absolute Value

This example finds the number with the smallest absolute value, demonstrating
custom mathematical comparisons.

absolute_min.go
  

package main

import (
    "fmt"
    "math"
    "slices"
)

func main() {
    numbers := []int{-5, 2, -1, 3, -2}
    
    minAbs := slices.MinFunc(numbers, func(a, b int) int {
        absA := math.Abs(float64(a))
        absB := math.Abs(float64(b))
        if absA &lt; absB {
            return -1
        } else if absA &gt; absB {
            return 1
        }
        return 0
    })
    
    fmt.Println("Number with smallest absolute value:", minAbs)
}

The comparison function uses absolute values instead of the numbers themselves.
-1 is returned as having the smallest absolute value (1).

## Practical Example: Finding Cheapest Product

This practical example finds the cheapest product in a slice using
slices.MinFunc with a custom comparison.

cheapest_product.go
  

package main

import (
    "fmt"
    "slices"
)

type Product struct {
    Name  string
    Price float64
}

func main() {
    products := []Product{
        {"Laptop", 999.99},
        {"Phone", 699.99},
        {"Tablet", 299.99},
        {"Monitor", 199.99},
    }
    
    cheapest := slices.MinFunc(products, func(a, b Product) int {
        if a.Price &lt; b.Price {
            return -1
        } else if a.Price &gt; b.Price {
            return 1
        }
        return 0
    })
    
    fmt.Printf("Cheapest product: %s ($%.2f)\n", cheapest.Name, cheapest.Price)
}

We compare Product structs by their Price field. The Monitor is returned as the
cheapest product at $199.99.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.MinFunc function in Go with practical
examples of finding minimum elements with custom comparison functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).