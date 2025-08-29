+++
title = "Golang slices.Compact"
date = 2025-08-29T19:55:55.995+01:00
draft = false
description = "A guide to compacting slices in Go. Learn how to remove duplicate elements with examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Compact

last modified April 20, 2025

This tutorial explains how to use the slices.Compact function in Go.
We'll cover slice operations with practical examples of removing duplicates.

The slices.Compact function replaces consecutive runs of equal
elements with a single copy. It's part of Go's experimental slices package.

This function is useful for cleaning up data by removing adjacent duplicates.
It modifies the slice in place and returns the new length of the slice.

## Basic slices.Compact Example

The simplest use of slices.Compact removes consecutive duplicates
from a slice of integers. The function modifies the original slice.

basic_compact.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 1, 2, 2, 3, 3, 3, 4}
    
    newLength := slices.Compact(numbers)
    numbers = numbers[:newLength]
    
    fmt.Println("Compacted numbers:", numbers)
}

We create a slice with consecutive duplicates. After compacting, only unique
consecutive values remain. The slice is shortened to the new length.

## Working with Strings

slices.Compact works with string slices too. This example removes
consecutive duplicate words from a slice.

string_compact.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"hello", "hello", "world", "go", "go", "go"}
    
    newLength := slices.Compact(words)
    words = words[:newLength]
    
    fmt.Println("Compacted words:", words)
}

The function compares strings and removes consecutive duplicates. Note that
non-consecutive duplicates remain in the slice.

## Custom Comparison Function

slices.CompactFunc allows custom comparison logic. This example
compacts case-insensitive string duplicates.

custom_compact.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"Hello", "hello", "World", "world", "Go"}
    
    newLength := slices.CompactFunc(words, func(a, b string) bool {
        return strings.EqualFold(a, b)
    })
    words = words[:newLength]
    
    fmt.Println("Case-insensitive compact:", words)
}

We use strings.EqualFold for case-insensitive comparison. The
function removes consecutive words that match regardless of case.

## Working with Structs

We can compact slices of custom struct types. This example removes consecutive
people with the same age.

struct_compact.go
  

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
        {"Bob", 25},
        {"Charlie", 30},
        {"Dave", 30},
        {"Eve", 30},
    }
    
    newLength := slices.CompactFunc(people, func(a, b Person) bool {
        return a.Age == b.Age
    })
    people = people[:newLength]
    
    fmt.Println("Compacted people:", people)
}

The custom comparison function checks only the Age field. Consecutive people
with the same age are removed, keeping only the first occurrence.

## Empty Slice Behavior

slices.Compact handles empty slices gracefully. This example
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
    
    emptyLen := slices.Compact(empty)
    nilLen := slices.Compact(nilSlice)
    
    fmt.Println("Empty slice length:", emptyLen)
    fmt.Println("Nil slice length:", nilLen)
}

Both empty and nil slices return length 0. The function safely handles these
edge cases without modification.

## Performance Considerations

For large slices, compacting can be memory efficient. This example benchmarks
the operation on a large slice.

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
        largeSlice[i] = i % 10 // Creates many consecutive duplicates
    }
    
    start := time.Now()
    newLength := slices.Compact(largeSlice)
    largeSlice = largeSlice[:newLength]
    
    fmt.Println("Compacted length:", newLength)
    fmt.Println("Time taken:", time.Since(start))
}

The operation is efficient as it works in-place. Memory usage remains constant
regardless of input size, only modifying the existing slice.

## Practical Example: Log Deduplication

This practical example uses slices.Compact to remove consecutive
duplicate log entries while preserving order.

log_deduplication.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    logs := []string{
        "ERROR: Disk full",
        "ERROR: Disk full",
        "INFO: Backup started",
        "WARNING: High CPU usage",
        "WARNING: High CPU usage",
        "WARNING: High CPU usage",
        "INFO: Backup completed",
    }
    
    newLength := slices.Compact(logs)
    logs = logs[:newLength]
    
    fmt.Println("Deduplicated logs:")
    for _, log := range logs {
        fmt.Println(log)
    }
}

Consecutive duplicate log messages are removed while maintaining the original
order. This helps reduce log noise while preserving important sequence.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Compact function in Go with practical
examples of removing consecutive duplicates from slices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).