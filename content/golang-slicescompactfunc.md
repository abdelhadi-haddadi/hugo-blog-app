+++
title = "Golang slices.CompactFunc"
date = 2025-08-29T19:55:57.101+01:00
draft = false
description = "Learn how to use custom functions to compact slices in Go. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.CompactFunc

last modified April 20, 2025

This tutorial explains how to use the slices.CompactFunc function in Go.
We'll cover slice operations with practical examples of compacting slices.

The slices.CompactFunc function replaces consecutive equal elements with
a single copy using a custom comparison function. It's part of Go's slices package.

This function is useful for removing duplicates from sorted slices when equality
needs custom logic. It modifies the slice in place and returns the new length.

## Basic slices.CompactFunc Example

The simplest use of slices.CompactFunc removes consecutive duplicates
from a slice of integers. We define a comparison function for equality.

basic_compact.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 1, 2, 3, 3, 3, 4, 5, 5}
    
    unique := slices.CompactFunc(numbers, func(a, b int) bool {
        return a == b
    })
    
    fmt.Println("Compacted slice:", numbers[:unique])
}

We create a slice with consecutive duplicates and remove them. The comparison
function checks for equality between adjacent elements.

## Case-Insensitive String Compaction

slices.CompactFunc can compact strings case-insensitively. This example
treats different cases as equal when they're consecutive.

case_insensitive.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"apple", "Apple", "banana", "BANANA", "cherry"}
    
    unique := slices.CompactFunc(words, func(a, b string) bool {
        return strings.EqualFold(a, b)
    })
    
    fmt.Println("Case-insensitive compact:", words[:unique])
}

The comparison uses strings.EqualFold for case-insensitive equality.
Consecutive words with different cases are considered duplicates.

## Compacting Struct Slices

We can use slices.CompactFunc with custom struct types. This example
compacts a slice of points based on their coordinates.

struct_compact.go
  

package main

import (
    "fmt"
    "slices"
)

type Point struct {
    X, Y int
}

func main() {
    points := []Point{
        {1, 2}, {1, 2}, {3, 4}, {3, 4}, {3, 4}, {5, 6},
    }
    
    unique := slices.CompactFunc(points, func(a, b Point) bool {
        return a.X == b.X &amp;&amp; a.Y == b.Y
    })
    
    fmt.Println("Unique points:", points[:unique])
}

The function checks both X and Y coordinates for equality. Consecutive duplicate
points are removed from the slice.

## Compacting with Custom Logic

Complex comparison logic can be implemented in the function. This example compacts
numbers considering them equal if their difference is less than 0.5.

custom_logic.go
  

package main

import (
    "fmt"
    "math"
    "slices"
)

func main() {
    numbers := []float64{1.0, 1.2, 1.6, 2.0, 2.1, 2.9, 3.0}
    
    unique := slices.CompactFunc(numbers, func(a, b float64) bool {
        return math.Abs(a-b) &lt; 0.5
    })
    
    fmt.Println("Approximately unique:", numbers[:unique])
}

The comparison uses floating-point math to determine approximate equality.
Numbers close to each other are considered duplicates.

## Empty Slice Behavior

slices.CompactFunc handles empty slices gracefully. This example
demonstrates its behavior with empty and nil slices.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    nilSlice := []string(nil)
    
    emptyResult := slices.CompactFunc(empty, func(a, b int) bool {
        return a == b
    })
    
    nilResult := slices.CompactFunc(nilSlice, func(a, b string) bool {
        return a == b
    })
    
    fmt.Println("Empty slice result:", emptyResult)
    fmt.Println("Nil slice result:", nilResult)
}

Both empty and nil slices return 0 as the new length. The original slices remain
unchanged as there are no elements to compact.

## Performance Considerations

For large slices, the performance of the comparison function matters. This example
benchmarks different comparison approaches.

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
        largeSlice[i] = i % 10 // Create many duplicates
    }
    
    // Simple comparison
    start := time.Now()
    _ = slices.CompactFunc(largeSlice, func(a, b int) bool {
        return a == b
    })
    fmt.Println("Simple comparison:", time.Since(start))
    
    // Complex comparison
    start = time.Now()
    _ = slices.CompactFunc(largeSlice, func(a, b int) bool {
        return a%2 == b%2 // Group by even/odd
    })
    fmt.Println("Complex comparison:", time.Since(start))
}

The execution time depends on the comparison complexity. slices.CompactFunc
processes elements sequentially, modifying the slice in place.

## Practical Example: Deduplicating Log Entries

This practical example uses slices.CompactFunc to remove consecutive
duplicate log entries while preserving the original order.

log_deduplication.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

type LogEntry struct {
    Timestamp string
    Message   string
}

func main() {
    logs := []LogEntry{
        {"2023-01-01T10:00:00", "System started"},
        {"2023-01-01T10:00:05", "User logged in"},
        {"2023-01-01T10:00:05", "User logged in"}, // Duplicate
        {"2023-01-01T10:01:00", "File saved"},
        {"2023-01-01T10:01:00", "File saved"},    // Duplicate
        {"2023-01-01T10:02:00", "System shutdown"},
    }
    
    unique := slices.CompactFunc(logs, func(a, b LogEntry) bool {
        return a.Timestamp == b.Timestamp &amp;&amp; 
               strings.EqualFold(a.Message, b.Message)
    })
    
    fmt.Println("Deduplicated logs:")
    for _, log := range logs[:unique] {
        fmt.Printf("%s: %s\n", log.Timestamp, log.Message)
    }
}

We compare both timestamp and message (case-insensitive) to identify duplicates.
The result preserves the first occurrence of each unique log entry.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.CompactFunc function in Go with practical
examples of compacting slices with custom comparison logic in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).