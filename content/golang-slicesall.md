+++
title = "Golang slices.All"
date = 2025-08-29T19:55:52.613+01:00
draft = false
description = "Learn how to use slices.All in Go. Includes examples of checking conditions on slices."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.All

last modified April 20, 2025

This tutorial explains how to use the slices.All function in Go.
We'll cover slice operations with practical examples of checking conditions.

The slices.All function tests whether all elements in a slice satisfy
a given condition. It's part of Go's experimental slices package.

This function is useful for validating data or checking properties across all
elements of a collection. It returns true only if all elements pass the test.

## Basic slices.All Example

The simplest use of slices.All checks if all numbers in a slice are
positive. We define a test function and apply it to each element.

basic_all.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    allPositive := slices.All(numbers, func(n int) bool {
        return n &gt; 0
    })
    
    fmt.Println("All numbers positive:", allPositive)
}

We create a slice of positive numbers and check if all elements are greater than
zero. The anonymous function defines our condition for each element.

## Checking String Properties

slices.All can verify properties of string elements. This example
checks if all strings in a slice have length greater than 3.

string_check.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "cherry"}
    
    allLong := slices.All(words, func(s string) bool {
        return len(s) &gt; 3
    })
    
    fmt.Println("All words longer than 3 chars:", allLong)
}

The test function examines each string's length. Since all words meet the
condition, the function returns true.

## Working with Structs

We can use slices.All with custom struct types. This example checks
if all people in a slice are adults.

struct_check.go
  

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
    
    allAdults := slices.All(people, func(p Person) bool {
        return p.Age &gt;= 18
    })
    
    fmt.Println("All adults:", allAdults)
}

The function checks each person's age field. Since Charlie is under 18, the
result is false.

## Combining Multiple Conditions

Complex conditions can be combined in the test function. This example checks if
all numbers are even and positive.

combined_conditions.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{2, 4, 6, 8, 10}
    
    allValid := slices.All(numbers, func(n int) bool {
        return n &gt; 0 &amp;&amp; n%2 == 0
    })
    
    fmt.Println("All numbers even and positive:", allValid)
}

The condition combines two checks using logical AND. All numbers satisfy both
conditions, so the result is true.

## Empty Slice Behavior

slices.All has special behavior for empty slices. This example
demonstrates how it always returns true for empty slices.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    result := slices.All(empty, func(n int) bool {
        return n &gt; 100 // Condition doesn't matter
    })
    
    fmt.Println("Result for empty slice:", result)
}

With no elements to check, the function vacuously returns true. This behavior
follows mathematical logic for universal quantification.

## Performance Considerations

For large slices, the performance of the test function matters. This example
benchmarks different approaches.

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
        largeSlice[i] = i
    }
    
    // Simple condition
    start := time.Now()
    _ = slices.All(largeSlice, func(n int) bool {
        return n &gt;= 0
    })
    fmt.Println("Simple condition:", time.Since(start))
    
    // Complex condition
    start = time.Now()
    _ = slices.All(largeSlice, func(n int) bool {
        return n &gt;= 0 &amp;&amp; n%2 == 0 &amp;&amp; n &lt; 1_000_000
    })
    fmt.Println("Complex condition:", time.Since(start))
}

The execution time depends on the condition complexity and early termination.
slices.All stops at the first false condition for efficiency.

## Practical Example: Input Validation

This practical example validates user input using slices.All.
We check if all provided numbers are within an acceptable range.

input_validation.go
  

package main

import (
    "fmt"
    "slices"
    "strconv"
)

func main() {
    inputs := []string{"42", "15", "99", "101"}
    
    numbers := make([]int, len(inputs))
    for i, s := range inputs {
        num, err := strconv.Atoi(s)
        if err != nil {
            fmt.Println("Invalid input:", s)
            return
        }
        numbers[i] = num
    }
    
    allValid := slices.All(numbers, func(n int) bool {
        return n &gt;= 0 &amp;&amp; n &lt;= 100
    })
    
    if allValid {
        fmt.Println("All inputs are valid percentages")
    } else {
        fmt.Println("Some inputs are outside 0-100 range")
    }
}

We convert strings to integers, then verify all values are between 0 and 100.
The combination of conversion and validation demonstrates real-world usage.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.All function in Go with practical
examples of checking conditions across slice elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).