+++
title = "Golang slices.Values"
date = 2025-08-29T19:56:07.233+01:00
draft = false
description = "Learn how to extract values from maps using slices.Values in Go. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Values

last modified April 20, 2025

This tutorial explains how to use the slices.Values function in Go.
We'll cover map operations with practical examples of extracting values.

The slices.Values function returns the values of a map as a slice.
It's part of Go's experimental slices package introduced in Go 1.21.

This function is useful when you need to work with map values independently of
their keys. The returned slice is in random order, matching Go's map iteration.

## Basic slices.Values Example

The simplest use of slices.Values extracts values from a string map.
We'll create a map and get all its values as a slice.

basic_values.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruitMap := map[string]int{
        "apple":  5,
        "banana": 3,
        "cherry": 7,
    }
    
    values := slices.Values(fruitMap)
    fmt.Println("Fruit quantities:", values)
}

We create a map of fruit names to quantities. slices.Values returns
a slice containing all the values (5, 3, 7) in random order.

## Working with Struct Values

slices.Values can handle maps with struct values. This example
extracts person objects from a map keyed by ID.

struct_values.go
  

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
    people := map[int]Person{
        1: {"Alice", 25},
        2: {"Bob", 30},
        3: {"Charlie", 35},
    }
    
    personList := slices.Values(people)
    fmt.Println("People:", personList)
}

The map uses integer IDs as keys and Person structs as values. The function
returns a slice of all Person objects, ignoring their map keys.

## Empty Map Behavior

slices.Values handles empty maps gracefully. This example shows it
returns an empty slice when the input map has no elements.

empty_map.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    emptyMap := map[string]int{}
    
    values := slices.Values(emptyMap)
    fmt.Println("Values from empty map:", values)
    fmt.Println("Length:", len(values))
}

The function returns a valid empty slice when given an empty map. This behavior
matches Go's convention for empty collections.

## Modifying Returned Slice

The slice returned by slices.Values is a new copy. This example
demonstrates that modifying it doesn't affect the original map.

modify_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    scores := map[string]int{
        "Alice": 85,
        "Bob":   92,
        "Carol": 78,
    }
    
    scoreSlice := slices.Values(scores)
    scoreSlice[0] = 100
    
    fmt.Println("Modified slice:", scoreSlice)
    fmt.Println("Original map:", scores)
}

Changing elements in the returned slice doesn't modify the original map values.
The function creates a new slice with copies of the map values.

## Using Values with Other Functions

The returned slice can be used with other slice functions. This example sorts
the values after extracting them from a map.

sort_values.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    temperatures := map[string]float64{
        "Monday":    72.5,
        "Tuesday":   68.3,
        "Wednesday": 75.1,
        "Thursday":  69.8,
    }
    
    tempValues := slices.Values(temperatures)
    slices.Sort(tempValues)
    
    fmt.Println("Sorted temperatures:", tempValues)
}

We extract temperature values from the map and sort them in ascending order.
This demonstrates how slices.Values enables slice operations.

## Performance Considerations

For large maps, slices.Values allocates memory for the new slice.
This example benchmarks the operation with different map sizes.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    smallMap := make(map[int]int, 100)
    largeMap := make(map[int]int, 1_000_000)
    
    for i := 0; i &lt; 100; i++ {
        smallMap[i] = i
    }
    
    for i := 0; i &lt; 1_000_000; i++ {
        largeMap[i] = i
    }
    
    start := time.Now()
    _ = slices.Values(smallMap)
    fmt.Println("Small map:", time.Since(start))
    
    start = time.Now()
    _ = slices.Values(largeMap)
    fmt.Println("Large map:", time.Since(start))
}

The function's execution time scales linearly with map size. Memory allocation
is the primary cost factor for large maps.

## Practical Example: Data Processing

This practical example processes survey data stored in a map. We extract values
to calculate statistics.

data_processing.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    surveyResults := map[string]int{
        "Q1": 4, "Q2": 5, "Q3": 3,
        "Q4": 2, "Q5": 5, "Q6": 4,
    }
    
    ratings := slices.Values(surveyResults)
    
    total := 0
    for _, r := range ratings {
        total += r
    }
    
    average := float64(total) / float64(len(ratings))
    fmt.Printf("Average rating: %.2f\n", average)
}

We extract survey ratings from a map to compute their average. This demonstrates
a real-world use case for slices.Values in data analysis.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Values function in Go with practical
examples of extracting values from maps in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).