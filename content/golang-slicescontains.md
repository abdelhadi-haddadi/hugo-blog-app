+++
title = "Golang slices.Contains"
date = 2025-08-29T19:55:58.216+01:00
draft = false
description = "Learn how to use slices.Contains in Go to check if an element exists in slices. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Contains

last modified April 20, 2025

This tutorial explains how to use the slices.Contains function in Go.
We'll cover slice operations with practical examples of checking for elements.

The slices.Contains function tests whether a slice contains a specific
element. It's part of Go's experimental slices package.

This function is useful for checking element existence without writing manual
loops. It returns true if the element is found, false otherwise.

## Basic slices.Contains Example

The simplest use of slices.Contains checks if a number exists in a
slice. We pass the slice and the target value to search for.

basic_contains.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    hasThree := slices.Contains(numbers, 3)
    hasSix := slices.Contains(numbers, 6)
    
    fmt.Println("Contains 3:", hasThree)
    fmt.Println("Contains 6:", hasSix)
}

We create a slice of numbers and check for the presence of 3 and 6. The function
returns true for 3 (present) and false for 6 (not present).

## Checking String Presence

slices.Contains works with string slices. This example checks if a
specific fruit exists in a slice.

string_contains.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruits := []string{"apple", "banana", "cherry"}
    
    hasBanana := slices.Contains(fruits, "banana")
    hasOrange := slices.Contains(fruits, "orange")
    
    fmt.Println("Has banana:", hasBanana)
    fmt.Println("Has orange:", hasOrange)
}

The function performs case-sensitive comparison. Banana is found while orange is
not present in the slice.

## Working with Structs

For custom struct types, slices.Contains uses deep equality. This
example checks for a specific person in a slice.

struct_contains.go
  

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
    
    target := Person{"Bob", 30}
    hasBob := slices.Contains(people, target)
    
    fmt.Println("Contains Bob:", hasBob)
}

The function compares all struct fields. Only an exact match (both name and age)
will return true.

## Checking for Multiple Values

We can combine slices.Contains with loops to check multiple values.
This example verifies if all required items are present.

multiple_values.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    inventory := []string{"sword", "shield", "potion"}
    required := []string{"sword", "potion"}
    
    allPresent := true
    for _, item := range required {
        if !slices.Contains(inventory, item) {
            allPresent = false
            break
        }
    }
    
    fmt.Println("All required items present:", allPresent)
}

We iterate through required items and check each one. The result is true only if
all items are found in the inventory.

## Empty Slice Behavior

slices.Contains always returns false for empty slices. This example
demonstrates this behavior.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []string
    
    result := slices.Contains(empty, "anything")
    
    fmt.Println("Result for empty slice:", result)
}

An empty slice cannot contain any elements. The function returns false regardless
of the search value.

## Performance Considerations

For large slices, slices.Contains performs a linear search. This
example benchmarks the operation.

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
    
    // Search for first element
    start := time.Now()
    _ = slices.Contains(largeSlice, 0)
    fmt.Println("First element:", time.Since(start))
    
    // Search for last element
    start = time.Now()
    _ = slices.Contains(largeSlice, 999_999)
    fmt.Println("Last element:", time.Since(start))
    
    // Search for missing element
    start = time.Now()
    _ = slices.Contains(largeSlice, -1)
    fmt.Println("Missing element:", time.Since(start))
}

The function scans elements sequentially. Best case is O(1) (first element),
worst case is O(n) (last or missing element).

## Practical Example: User Validation

This practical example checks if a username exists in a list of registered users.

user_validation.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    registeredUsers := []string{"alice", "bob", "charlie"}
    
    var username string
    fmt.Print("Enter username: ")
    fmt.Scanln(&amp;username)
    
    if slices.Contains(registeredUsers, username) {
        fmt.Println("Welcome back,", username)
    } else {
        fmt.Println("Username not found")
    }
}

The program prompts for a username and checks against the registered list. This
demonstrates a common real-world use case.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Contains function in Go with practical
examples of checking for elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).