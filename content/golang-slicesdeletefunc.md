+++
title = "Golang slices.DeleteFunc"
date = 2025-08-29T19:55:59.349+01:00
draft = false
description = "Learn how to use slices.DeleteFunc in Go to remove elements based on conditions. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.DeleteFunc

last modified April 20, 2025

This tutorial explains how to use the slices.DeleteFunc function in Go.
We'll cover slice operations with practical examples of deleting elements.

The slices.DeleteFunc function removes elements from a slice that
satisfy a given condition. It's part of Go's experimental slices package.

This function is useful for filtering data or removing unwanted elements from
a collection. It modifies the slice in place and returns the modified slice.

## Basic slices.DeleteFunc Example

The simplest use of slices.DeleteFunc removes all negative numbers
from a slice. We define a test function to identify elements to delete.

basic_delete.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, -2, 3, -4, 5}
    
    numbers = slices.DeleteFunc(numbers, func(n int) bool {
        return n &lt; 0
    })
    
    fmt.Println("Positive numbers:", numbers)
}

We create a slice with both positive and negative numbers. The function removes
all elements where the condition (n &lt; 0) is true.

## Deleting Empty Strings

slices.DeleteFunc can filter out empty strings from a slice. This
example removes all empty or whitespace-only strings.

empty_strings.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "", "banana", "  ", "cherry"}
    
    words = slices.DeleteFunc(words, func(s string) bool {
        return strings.TrimSpace(s) == ""
    })
    
    fmt.Println("Non-empty words:", words)
}

The test function uses strings.TrimSpace to handle whitespace.
The modified slice contains only non-empty strings.

## Working with Structs

We can use slices.DeleteFunc with custom struct types. This example
removes all inactive users from a slice.

struct_delete.go
  

package main

import (
    "fmt"
    "slices"
)

type User struct {
    Name   string
    Active bool
}

func main() {
    users := []User{
        {"Alice", true},
        {"Bob", false},
        {"Charlie", true},
    }
    
    users = slices.DeleteFunc(users, func(u User) bool {
        return !u.Active
    })
    
    fmt.Println("Active users:", users)
}

The function checks each user's Active field. Bob is removed from the slice
because his Active status is false.

## Deleting Duplicate Elements

We can combine slices.DeleteFunc with a map to remove duplicates.
This example keeps only the first occurrence of each unique number.

remove_duplicates.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 2, 3, 4, 4, 4, 5}
    seen := make(map[int]bool)
    
    numbers = slices.DeleteFunc(numbers, func(n int) bool {
        if seen[n] {
            return true
        }
        seen[n] = true
        return false
    })
    
    fmt.Println("Unique numbers:", numbers)
}

The map tracks seen numbers, and subsequent duplicates are deleted. The result
contains each number only once.

## Case-Insensitive String Filtering

This example demonstrates case-insensitive filtering using
slices.DeleteFunc. We remove all occurrences of "apple".

case_insensitive.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    fruits := []string{"Apple", "banana", "APPLE", "cherry", "apple"}
    
    fruits = slices.DeleteFunc(fruits, func(s string) bool {
        return strings.EqualFold(s, "apple")
    })
    
    fmt.Println("Filtered fruits:", fruits)
}

strings.EqualFold performs case-insensitive comparison. All forms
of "apple" are removed regardless of case.

## Performance Considerations

For large slices, the performance of the test function matters. This example
compares different filtering approaches.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    largeSlice := make([]int, 1_000_000)
    for i := range largeSlice {
        largeSlice[i] = i % 10 // Create repeating pattern
    }
    
    // Simple condition
    start := time.Now()
    _ = slices.DeleteFunc(largeSlice, func(n int) bool {
        return n == 5
    })
    fmt.Println("Simple condition:", time.Since(start))
    
    // Complex condition
    start = time.Now()
    _ = slices.DeleteFunc(largeSlice, func(n int) bool {
        return n &gt; 5 &amp;&amp; n % 2 == 0
    })
    fmt.Println("Complex condition:", time.Since(start))
}

The execution time depends on the condition complexity and number of deletions.
slices.DeleteFunc is efficient as it modifies the slice in place.

## Practical Example: Input Sanitization

This practical example sanitizes user input by removing invalid entries using
slices.DeleteFunc.

input_sanitization.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
)

func main() {
    inputs := []string{"42", "invalid", "15", "99", "not_a_number"}
    
    // First convert to numbers, tracking valid entries
    numbers := make([]int, 0, len(inputs))
    valid := make([]bool, len(inputs))
    
    for i, s := range inputs {
        num, err := strconv.Atoi(s)
        if err == nil {
            numbers = append(numbers, num)
            valid[i] = true
        }
    }
    
    // Now filter the original slice
    inputs = slices.DeleteFunc(inputs, func(s string) bool {
        _, err := strconv.Atoi(s)
        return err != nil
    })
    
    fmt.Println("Valid numbers:", numbers)
    fmt.Println("Sanitized inputs:", inputs)
}

We first identify invalid entries, then use slices.DeleteFunc to
remove them. This demonstrates real-world data cleaning.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.DeleteFunc function in Go with
practical examples of filtering slice elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).