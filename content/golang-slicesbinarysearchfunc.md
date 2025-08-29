+++
title = "Golang slices.BinarySearchFunc"
date = 2025-08-29T19:55:54.877+01:00
draft = false
description = "Learn how to use slices.BinarySearchFunc in Go for binary search with custom comparison functions. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.BinarySearchFunc

last modified April 20, 2025

This tutorial explains how to use the slices.BinarySearchFunc function in Go.
We'll cover binary search operations with custom comparison functions.

The slices.BinarySearchFunc function performs binary search on a sorted slice.
It uses a custom comparison function to determine element ordering.

This function is efficient for searching in large sorted collections.
It returns the position where the target would be inserted to maintain order.

## Basic BinarySearchFunc Example

The simplest use searches for a number in a sorted slice.
We define a comparison function that returns -1, 0, or 1.

basic_search.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 3, 5, 7, 9}
    
    cmp := func(a, b int) int {
        if a == b {
            return 0
        } else if a &lt; b {
            return -1
        }
        return 1
    }
    
    pos, found := slices.BinarySearchFunc(numbers, 5, cmp)
    fmt.Printf("Position: %d, Found: %v\n", pos, found)
}

The comparison function follows standard ordering rules.
The search finds the value 5 at position 2 in the slice.

## Searching Strings

slices.BinarySearchFunc can search string slices.
This example performs case-insensitive string comparison.

string_search.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "Banana", "cherry", "Date"}
    
    cmp := func(a, b string) int {
        aLower := strings.ToLower(a)
        bLower := strings.ToLower(b)
        
        switch {
        case aLower == bLower:
            return 0
        case aLower &lt; bLower:
            return -1
        default:
            return 1
        }
    }
    
    pos, found := slices.BinarySearchFunc(words, "banana", cmp)
    fmt.Printf("Position: %d, Found: %v\n", pos, found)
}

The comparison function converts strings to lowercase first.
This makes the search case-insensitive while finding "Banana".

## Searching Structs by Field

We can search struct slices by specific fields.
This example searches for people by age.

struct_search.go
  

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
        {"Charlie", 35},
    }
    
    cmp := func(p Person, age int) int {
        switch {
        case p.Age == age:
            return 0
        case p.Age &lt; age:
            return -1
        default:
            return 1
        }
    }
    
    pos, found := slices.BinarySearchFunc(people, 30, cmp)
    fmt.Printf("Position: %d, Found: %v\n", pos, found)
}

The comparison function compares the Age field of Person structs.
It finds Bob at position 1 who is exactly 30 years old.

## Custom Ordering

BinarySearchFunc supports custom ordering schemes.
This example searches in descending order.

descending_order.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{9, 7, 5, 3, 1} // Descending order
    
    cmp := func(a, b int) int {
        if a == b {
            return 0
        } else if a &gt; b { // Note: reversed comparison
            return -1
        }
        return 1
    }
    
    pos, found := slices.BinarySearchFunc(numbers, 5, cmp)
    fmt.Printf("Position: %d, Found: %v\n", pos, found)
}

The comparison function reverses the standard ordering logic.
This allows searching in descending-order sorted slices.

## Searching with Partial Matches

We can implement partial matching in comparisons.
This example searches for prefixes in string slices.

prefix_search.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "application", "banana", "book"}
    
    cmp := func(s, prefix string) int {
        if strings.HasPrefix(s, prefix) {
            return 0
        } else if s &lt; prefix {
            return -1
        }
        return 1
    }
    
    pos, found := slices.BinarySearchFunc(words, "app", cmp)
    fmt.Printf("Position: %d, Found: %v\n", pos, found)
}

The comparison checks for prefix matches using strings.HasPrefix.
It finds "apple" and "application" as matches for "app".

## Handling Not Found Cases

When the target isn't found, the function returns the insertion position.
This example demonstrates handling missing elements.

not_found.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{10, 20, 30, 40, 50}
    
    cmp := func(a, b int) int {
        if a == b {
            return 0
        } else if a &lt; b {
            return -1
        }
        return 1
    }
    
    pos, found := slices.BinarySearchFunc(numbers, 25, cmp)
    if found {
        fmt.Println("Found at position", pos)
    } else {
        fmt.Printf("Not found, would insert at %d\n", pos)
    }
}

The value 25 isn't in the slice but would be inserted at position 2.
This maintains the sorted order of the slice.

## Practical Example: Dictionary Lookup

This practical example implements dictionary lookup.
It searches for word definitions in a sorted slice.

dictionary.go
  

package main

import (
    "fmt"
    "slices"
)

type Entry struct {
    Word       string
    Definition string
}

func main() {
    dictionary := []Entry{
        {"apple", "A fruit"},
        {"banana", "Yellow fruit"},
        {"cherry", "Small red fruit"},
    }
    
    cmp := func(e Entry, word string) int {
        switch {
        case e.Word == word:
            return 0
        case e.Word &lt; word:
            return -1
        default:
            return 1
        }
    }
    
    pos, found := slices.BinarySearchFunc(dictionary, "banana", cmp)
    if found {
        fmt.Println("Definition:", dictionary[pos].Definition)
    } else {
        fmt.Println("Word not found")
    }
}

The comparison function matches Entry structs by their Word field.
It efficiently finds definitions in the sorted dictionary slice.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.BinarySearchFunc function in Go.
We explored various search scenarios with custom comparison functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).