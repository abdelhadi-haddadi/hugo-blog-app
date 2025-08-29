+++
title = "Golang slices.BinarySearch"
date = 2025-08-29T19:55:53.740+01:00
draft = false
description = "Learn how to perform binary search in Go slices using slices.BinarySearch. Includes examples and practical use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.BinarySearch

last modified April 20, 2025

This tutorial explains how to use the slices.BinarySearch function in Go.
We'll cover binary search operations on sorted slices with practical examples.

The slices.BinarySearch function searches for a target value in a sorted
slice. It returns the position where the target is found or where it would be.

Binary search is efficient with O(log n) time complexity. The slice must be sorted
in ascending order for the function to work correctly.

## Basic slices.BinarySearch Example

The simplest use of slices.BinarySearch finds a number in a sorted
slice. The function returns the index and a boolean indicating if the value was found.

basic_search.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 3, 5, 7, 9}
    
    index, found := slices.BinarySearch(numbers, 5)
    
    fmt.Printf("Found: %v at index: %d\n", found, index)
}

We create a sorted slice and search for the value 5. The function returns index 2
and true, as 5 exists in the slice at that position.

## Searching for a Non-existent Value

When the target isn't found, slices.BinarySearch returns where it
would be inserted. This example demonstrates that behavior.

not_found.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{10, 20, 30, 40, 50}
    
    index, found := slices.BinarySearch(numbers, 25)
    
    fmt.Printf("Found: %v at index: %d\n", found, index)
}

The value 25 isn't in the slice. The function returns index 2 (between 20 and 30)
and false. This is useful for insertion points.

## Searching Strings

slices.BinarySearch works with string slices too. This example
searches for a name in a sorted list.

string_search.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    names := []string{"Alice", "Bob", "Charlie", "David"}
    
    index, found := slices.BinarySearch(names, "Charlie")
    
    fmt.Printf("Found: %v at index: %d\n", found, index)
}

The string slice must be sorted lexicographically. "Charlie" is found at index 2,
so the function returns true and that position.

## Working with Custom Types

For custom types, we can use slices.BinarySearchFunc. This example
searches a slice of structs by age.

custom_type.go
  

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
    
    index, found := slices.BinarySearchFunc(people, 30, 
        func(p Person, age int) int {
            return cmp.Compare(p.Age, age)
        })
    
    fmt.Printf("Found: %v at index: %d\n", found, index)
}

We provide a comparison function that compares Person.Age with our target. The
function finds Bob at index 1 where the age matches 30.

## Searching Float Values

Float slices require careful handling due to precision issues. This example shows
how to search for a floating-point number.

float_search.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    values := []float64{1.1, 2.2, 3.3, 4.4, 5.5}
    
    index, found := slices.BinarySearch(values, 3.3)
    
    fmt.Printf("Found: %v at index: %d\n", found, index)
}

The float slice must be sorted in ascending order. The function correctly finds
3.3 at index 2. Note that floating-point comparisons can be tricky with precision.

## Edge Cases

This example explores edge cases like empty slices and searching for the first
or last element.

edge_cases.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := []int{}
    numbers := []int{10, 20, 30}
    
    // Empty slice
    index, found := slices.BinarySearch(empty, 5)
    fmt.Printf("Empty: %v at %d\n", found, index)
    
    // First element
    index, found = slices.BinarySearch(numbers, 10)
    fmt.Printf("First: %v at %d\n", found, index)
    
    // Last element
    index, found = slices.BinarySearch(numbers, 30)
    fmt.Printf("Last: %v at %d\n", found, index)
}

Searching an empty slice returns index 0 and false. First and last elements are
handled correctly, returning their true indices.

## Practical Example: Phone Book Lookup

This practical example demonstrates using binary search for efficient phone number
lookup in a sorted contact list.

phone_book.go
  

package main

import (
    "fmt"
    "slices"
)

type Contact struct {
    Name  string
    Phone string
}

func main() {
    contacts := []Contact{
        {"Alice", "555-0101"},
        {"Bob", "555-0102"},
        {"Charlie", "555-0103"},
        {"David", "555-0104"},
    }
    
    // Sort by name
    slices.SortFunc(contacts, func(a, b Contact) int {
        if a.Name &lt; b.Name {
            return -1
        }
        return 1
    })
    
    // Search for Bob
    index, found := slices.BinarySearchFunc(contacts, "Bob",
        func(c Contact, name string) int {
            if c.Name &lt; name {
                return -1
            }
            if c.Name &gt; name {
                return 1
            }
            return 0
        })
    
    if found {
        fmt.Printf("Found %s: %s\n", contacts[index].Name, 
            contacts[index].Phone)
    } else {
        fmt.Println("Contact not found")
    }
}

We first sort contacts by name, then search for "Bob". The binary search quickly
finds the contact information. This is efficient for large contact lists.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.BinarySearch function in Go with
practical examples of searching sorted slices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).