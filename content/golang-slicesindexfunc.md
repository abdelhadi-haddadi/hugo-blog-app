+++
title = "Golang slices.IndexFunc"
date = 2025-08-29T19:56:01.524+01:00
draft = false
description = "Learn how to use slices.IndexFunc in Go to find elements in slices with custom conditions. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.IndexFunc

last modified April 20, 2025

This tutorial explains how to use the slices.IndexFunc function in Go.
We'll cover slice operations with practical examples of finding elements.

The slices.IndexFunc function searches for the first element in a slice
that satisfies a given condition. It returns the index of the first match.

If no element satisfies the condition, it returns -1. This function is useful
for custom element searches in slices of any type.

## Basic slices.IndexFunc Example

The simplest use of slices.IndexFunc finds the first negative number
in a slice. We define a test function to check each element.

basic_indexfunc.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, -3, 4, 5}
    
    idx := slices.IndexFunc(numbers, func(n int) bool {
        return n &lt; 0
    })
    
    fmt.Println("First negative at index:", idx)
}

We search for the first number less than zero. The function returns index 2
where -3 is located. The anonymous function defines our search condition.

## Finding Strings with Specific Properties

slices.IndexFunc can find strings with specific characteristics.
This example locates the first string starting with 'b'.

string_search.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "banana", "cherry", "blueberry"}
    
    idx := slices.IndexFunc(words, func(s string) bool {
        return strings.HasPrefix(s, "b")
    })
    
    fmt.Println("First 'b' word at index:", idx)
}

The test function uses strings.HasPrefix to check each string.
It returns index 1 where "banana" is found, the first matching element.

## Searching Struct Slices

We can use slices.IndexFunc with custom struct types. This example
finds the first person under 18 in a slice.

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
        {"Charlie", 17},
        {"Dave", 16},
    }
    
    idx := slices.IndexFunc(people, func(p Person) bool {
        return p.Age &lt; 18
    })
    
    fmt.Println("First minor at index:", idx)
}

The function checks each person's age field. It returns index 2 where Charlie
is found, even though Dave is also under 18.

## Case-Insensitive String Search

This example demonstrates case-insensitive search using IndexFunc.
We find the first occurrence of "go" regardless of case.

case_insensitive.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    langs := []string{"Python", "Go", "Rust", "GO", "Java"}
    
    idx := slices.IndexFunc(langs, func(s string) bool {
        return strings.EqualFold(s, "go")
    })
    
    fmt.Println("First 'go' at index:", idx)
}

strings.EqualFold performs case-insensitive comparison. The function
returns index 1 where "Go" is found, ignoring the later "GO" at index 3.

## Finding Elements with Multiple Conditions

Complex conditions can be combined in the test function. This example finds the
first even number greater than 10.

multiple_conditions.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{5, 8, 12, 7, 14, 9}
    
    idx := slices.IndexFunc(numbers, func(n int) bool {
        return n &gt; 10 &amp;&amp; n%2 == 0
    })
    
    fmt.Println("First even &gt;10 at index:", idx)
}

The condition combines two checks using logical AND. It returns index 2 where 12
is found, the first number satisfying both conditions.

## Handling No Matches

When no elements satisfy the condition, IndexFunc returns -1.
This example demonstrates handling the no-match case.

no_match.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 3, 5, 7, 9}
    
    idx := slices.IndexFunc(numbers, func(n int) bool {
        return n%2 == 0
    })
    
    if idx == -1 {
        fmt.Println("No even numbers found")
    } else {
        fmt.Println("First even at index:", idx)
    }
}

Since the slice contains only odd numbers, the function returns -1. We check
this value to handle the no-match case appropriately.

## Practical Example: Finding Available Port

This practical example uses IndexFunc to find the first available
port from a list of used ports.

port_finder.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    usedPorts := []int{80, 443, 8080, 3000, 8000}
    availablePorts := []int{3000, 4000, 5000, 8080, 9000}
    
    idx := slices.IndexFunc(availablePorts, func(p int) bool {
        return !slices.Contains(usedPorts, p)
    })
    
    if idx != -1 {
        fmt.Printf("First available port: %d at index %d\n", 
            availablePorts[idx], idx)
    } else {
        fmt.Println("No available ports found")
    }
}

We search for the first port in availablePorts that isn't in usedPorts. The
function returns index 1 where port 4000 is found as available.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.IndexFunc function in Go with
practical examples of finding elements in slices with custom conditions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).