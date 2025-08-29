+++
title = "Golang slices.Grow"
date = 2025-08-29T19:56:00.439+01:00
draft = false
description = "Learn how to use slices.Grow in Go to efficiently increase slice capacity. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Grow

last modified April 20, 2025

This tutorial explains how to use the slices.Grow function in Go.
We'll cover slice capacity management with practical examples.

The slices.Grow function increases a slice's capacity to guarantee
space for additional elements. It's part of Go's experimental slices package.

This function is useful when you need to append many elements efficiently.
It minimizes memory allocations by pre-allocating capacity in advance.

## Basic slices.Grow Example

The simplest use of slices.Grow prepares a slice for future appends.
We specify how many additional elements we expect to add.

basic_grow.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s := []int{1, 2, 3}
    fmt.Println("Before Grow - len:", len(s), "cap:", cap(s))
    
    s = slices.Grow(s, 5)
    fmt.Println("After Grow - len:", len(s), "cap:", cap(s))
    
    // Now we can append without reallocations
    s = append(s, 4, 5, 6, 7, 8)
    fmt.Println("After append - len:", len(s), "cap:", cap(s))
}

We grow the slice by 5 elements, then append 5 values. The capacity increases
to accommodate future additions without multiple allocations.

## Growing an Empty Slice

slices.Grow works with empty slices. This example shows how to
pre-allocate capacity for a new slice.

empty_grow.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var s []string
    fmt.Println("Before Grow - len:", len(s), "cap:", cap(s))
    
    s = slices.Grow(s, 10)
    fmt.Println("After Grow - len:", len(s), "cap:", cap(s))
    
    // Efficient appending
    for i := 0; i &lt; 10; i++ {
        s = append(s, fmt.Sprintf("item%d", i))
    }
    fmt.Println("Final slice:", s)
}

The empty slice gets capacity for 10 elements. Subsequent appends don't trigger
reallocations until we exceed the grown capacity.

## Growing with Capacity Already Available

If the slice already has sufficient capacity, slices.Grow does
nothing. This example demonstrates this behavior.

sufficient_capacity.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s := make([]int, 0, 10) // Initial capacity 10
    fmt.Println("Before Grow - len:", len(s), "cap:", cap(s))
    
    s = slices.Grow(s, 5) // Requesting 5 more
    fmt.Println("After Grow - len:", len(s), "cap:", cap(s))
    
    // Capacity remains the same
    fmt.Println("No change if capacity sufficient")
}

Since the slice already had capacity for 10 elements, requesting 5 more doesn't
change anything. The function returns the original slice.

## Growing Beyond Current Capacity

When growing beyond current capacity, the slice gets a new backing array.
This example shows the memory allocation behavior.

beyond_capacity.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s := []int{1, 2, 3}
    fmt.Printf("Original array address: %p\n", &amp;s[0])
    
    s = slices.Grow(s, 100) // Large growth
    fmt.Printf("New array address: %p\n", &amp;s[0])
    
    fmt.Println("Capacity increased from 3 to:", cap(s))
}

The memory address changes because Go allocates a new array. The capacity grows
to accommodate both existing elements and the requested growth.

## Performance Comparison

This example compares growing vs. repeated appends. It shows the performance
benefit of pre-allocation.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    const size = 1_000_000
    
    // Without pre-allocation
    start := time.Now()
    var s1 []int
    for i := 0; i &lt; size; i++ {
        s1 = append(s1, i)
    }
    fmt.Println("Append without Grow:", time.Since(start))
    
    // With pre-allocation
    start = time.Now()
    s2 := make([]int, 0)
    s2 = slices.Grow(s2, size)
    for i := 0; i &lt; size; i++ {
        s2 = append(s2, i)
    }
    fmt.Println("Append with Grow:", time.Since(start))
}

Pre-allocating with slices.Grow is faster because it avoids
multiple reallocations. The difference becomes significant with large slices.

## Growing Slice of Structs

slices.Grow works with any slice type. This example demonstrates
growing a slice of custom structs.

struct_slice.go
  

package main

import (
    "fmt"
    "slices"
)

type Point struct {
    X, Y float64
}

func main() {
    points := []Point{{1, 2}, {3, 4}}
    fmt.Println("Initial capacity:", cap(points))
    
    points = slices.Grow(points, 100)
    fmt.Println("Grown capacity:", cap(points))
    
    // Efficiently add many points
    for i := 0; i &lt; 100; i++ {
        points = append(points, Point{float64(i), float64(i * 2)})
    }
    fmt.Println("Final length:", len(points))
}

We grow a slice of Point structs to hold 100 additional elements. The same
performance benefits apply to custom types as with built-in types.

## Practical Example: Batch Processing

This practical example shows slices.Grow in a batch processing
scenario where we know the approximate result size.

batch_processing.go
  

package main

import (
    "fmt"
    "math/rand"
    "slices"
    "time"
)

func processItem(i int) float64 {
    time.Sleep(time.Microsecond) // Simulate work
    return rand.Float64() * float64(i)
}

func main() {
    const batchSize = 10_000
    results := make([]float64, 0)
    
    // Pre-allocate for expected results
    results = slices.Grow(results, batchSize)
    
    start := time.Now()
    for i := 0; i &lt; batchSize; i++ {
        results = append(results, processItem(i))
    }
    
    fmt.Printf("Processed %d items in %v\n", 
        len(results), time.Since(start))
    fmt.Println("Final capacity:", cap(results))
}

By growing the slice before processing, we avoid reallocations during the batch.
This optimization is especially valuable in performance-critical code.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Grow function in Go with practical
examples of efficient slice capacity management in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).