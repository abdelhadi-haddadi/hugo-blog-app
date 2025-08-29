+++
title = "Golang maps.Values"
date = 2025-08-29T19:55:29.113+01:00
draft = false
description = "Learn how to extract values from maps in Go. Includes examples of iterating over map values."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang maps.Values

last modified April 27, 2025

This tutorial explains how to use the maps.Values function in Go.
We'll cover map operations with practical examples of retrieving values from maps.

The maps.Values function returns a slice containing all the values in a map.
It's part of Go's standard maps package, introduced in Go 1.21.

This function is useful for scenarios where you need to process or analyze all values
stored in a map without needing their associated keys. The order of values in the
returned slice is not guaranteed, as maps in Go are inherently unordered.

## Basic maps.Values Example

The simplest use of maps.Values retrieves all values from a map.
This example extracts values from a map of student grades.

basic_values.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    grades := map[string]int{
        "Alice": 85,
        "Bob":   90,
        "Charlie": 78,
    }
    
    values := maps.Values(grades)
    
    fmt.Println("All grades:", values)
}

We create a map with student names as keys and their grades as values.
maps.Values returns a slice of integers containing all grades.
The output might be something like [85 90 78], though the order is not guaranteed.

## Summing Map Values

maps.Values can be used to perform calculations on map values.
This example calculates the sum of all values in a map.

sum_values.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    prices := map[string]int{
        "apple":  50,
        "banana": 30,
        "orange": 40,
    }
    
    values := maps.Values(prices)
    total := 0
    for _, v := range values {
        total += v
    }
    
    fmt.Println("Total price:", total)
}

The function retrieves all prices as a slice, which we iterate over to compute the sum.
The output will be Total price: 120.

## Working with Struct Values

maps.Values works with maps containing struct values.
This example extracts all struct values from a map of employees.

struct_values.go
  

package main

import (
    "fmt"
    "maps"
)

type Employee struct {
    Name   string
    Salary int
}

func main() {
    employees := map[string]Employee{
        "e1": {"Alice", 50000},
        "e2": {"Bob", 60000},
        "e3": {"Charlie", 55000},
    }
    
    values := maps.Values(employees)
    
    fmt.Println("All employees:")
    for _, emp := range values {
        fmt.Printf("%s: %d\n", emp.Name, emp.Salary)
    }
}

The function returns a slice of Employee structs, which we iterate over
to print each employee's details.

## Filtering Values

You can process the slice returned by maps.Values to filter values.
This example finds all values above a threshold.

filter_values.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    scores := map[string]int{
        "Alice":  95,
        "Bob":    85,
        "Charlie": 92,
        "Dave":   88,
    }
    
    values := maps.Values(scores)
    highScores := []int{}
    for _, score := range values {
        if score &gt;= 90 {
            highScores = append(highScores, score)
        }
    }
    
    fmt.Println("High scores (90+):", highScores)
}

We use maps.Values to get all scores and then filter for scores of 90 or higher.
The output might be High scores (90+): [95 92].

## Empty Map Behavior

maps.Values handles empty maps by returning an empty slice.
This example demonstrates this behavior.

empty_map.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    emptyMap := map[string]int{}
    
    values := maps.Values(emptyMap)
    
    fmt.Println("Values from empty map:", values)
    fmt.Println("Length of values:", len(values))
}

For an empty map, maps.Values returns an empty slice.
The output will be Values from empty map: [] and Length of values: 0.

## Performance Considerations

The performance of maps.Values depends on the map size.
This example benchmarks the function with a large map.

performance.go
  

package main

import (
    "fmt"
    "maps"
    "time"
)

func main() {
    largeMap := make(map[string]int, 1_000_000)
    for i := 0; i &lt; 1_000_000; i++ {
        largeMap[fmt.Sprintf("key%d", i)] = i
    }
    
    start := time.Now()
    values := maps.Values(largeMap)
    fmt.Println("Time to get values:", time.Since(start))
    fmt.Println("Number of values:", len(values))
}

The function creates a large map and measures the time to retrieve all values.
The operation is generally efficient, as it involves a single pass through the map.

## Practical Example: Data Analysis

This practical example uses maps.Values to analyze sales data.
We calculate the average of all sales values in a map.

data_analysis.go
  

package main

import (
    "fmt"
    "maps"
)

func main() {
    sales := map[string]float64{
        "Jan": 15000.50,
        "Feb": 18000.75,
        "Mar": 16500.25,
        "Apr": 17000.00,
    }
    
    values := maps.Values(sales)
    sum := 0.0
    for _, v := range values {
        sum += v
    }
    average := sum / float64(len(values))
    
    fmt.Printf("Average sales: %.2f\n", average)
}

We use maps.Values to get all sales figures, sum them, and compute the average.
The output will be something like Average sales: 16625.38.

## Source

[Go maps package documentation](https://pkg.go.dev/maps)

This tutorial covered the maps.Values function in Go with practical
examples of retrieving and processing map values in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).