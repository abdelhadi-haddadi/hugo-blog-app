+++
title = "Golang slices.ContainsFunc"
date = 2025-08-29T19:55:58.225+01:00
draft = false
description = "Learn how to use slices.ContainsFunc in Go to check elements with custom conditions. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.ContainsFunc

last modified April 20, 2025

This tutorial explains how to use the slices.ContainsFunc function in Go.
We'll cover slice operations with practical examples of checking for elements.

The slices.ContainsFunc function tests whether a slice contains any
element that satisfies a given condition. It's part of Go's experimental slices package.

This function is useful for searching elements with specific properties in a
collection. It returns true if at least one element passes the test.

## Basic slices.ContainsFunc Example

The simplest use of slices.ContainsFunc checks if a slice contains
any negative numbers. We define a test function to identify negative values.

basic_contains.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, -3, 4, 5}
    
    hasNegative := slices.ContainsFunc(numbers, func(n int) bool {
        return n &lt; 0
    })
    
    fmt.Println("Contains negative number:", hasNegative)
}

We create a slice with one negative number and check for its presence. The
anonymous function defines our condition for identifying negative values.

## Checking String Properties

slices.ContainsFunc can verify properties of string elements. This
example checks if any string in a slice starts with a specific prefix.

string_check.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "banana", "cherry"}
    
    hasPrefix := slices.ContainsFunc(words, func(s string) bool {
        return strings.HasPrefix(s, "ban")
    })
    
    fmt.Println("Contains word starting with 'ban':", hasPrefix)
}

The test function uses strings.HasPrefix to check each string.
Since "banana" matches the condition, the function returns true.

## Working with Structs

We can use slices.ContainsFunc with custom struct types. This
example checks if any person in a slice is underage.

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
    
    hasMinor := slices.ContainsFunc(people, func(p Person) bool {
        return p.Age &lt; 18
    })
    
    fmt.Println("Contains minor:", hasMinor)
}

The function checks each person's age field. Since Charlie is under 18, the
result is true.

## Combining Multiple Conditions

Complex conditions can be combined in the test function. This example checks if
any number is both even and negative.

combined_conditions.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{2, -4, 6, -8, 10}
    
    hasEvenNegative := slices.ContainsFunc(numbers, func(n int) bool {
        return n &lt; 0 &amp;&amp; n%2 == 0
    })
    
    fmt.Println("Contains even negative number:", hasEvenNegative)
}

The condition combines two checks using logical AND. The slice contains -4 and
-8 which satisfy both conditions, so the result is true.

## Empty Slice Behavior

slices.ContainsFunc has special behavior for empty slices. This
example demonstrates how it always returns false for empty slices.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    result := slices.ContainsFunc(empty, func(n int) bool {
        return n &gt; 100 // Condition doesn't matter
    })
    
    fmt.Println("Result for empty slice:", result)
}

With no elements to check, the function returns false. This behavior follows
mathematical logic for existential quantification.

## Performance Considerations

For large slices, the performance of the test function matters. This example
shows how the function stops at the first match.

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
    largeSlice[999_999] = -1 // Add negative at end
    
    // Search for negative number
    start := time.Now()
    found := slices.ContainsFunc(largeSlice, func(n int) bool {
        return n &lt; 0
    })
    elapsed := time.Since(start)
    
    fmt.Printf("Found negative: %v (took %v)\n", found, elapsed)
}

The execution time depends on the position of the matching element.
slices.ContainsFunc stops at the first true condition.

## Practical Example: Input Validation

This practical example validates user input using slices.ContainsFunc.
We check if any provided number is outside an acceptable range.

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
    
    hasInvalid := slices.ContainsFunc(numbers, func(n int) bool {
        return n &lt; 0 || n &gt; 100
    })
    
    if hasInvalid {
        fmt.Println("Contains invalid percentage (outside 0-100 range)")
    } else {
        fmt.Println("All inputs are valid percentages")
    }
}

We convert strings to integers, then check for any values outside 0-100 range.
The combination of conversion and validation demonstrates real-world usage.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.ContainsFunc function in Go with
practical examples of searching for elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).