+++
title = "Golang slices.Chunk"
date = 2025-08-29T19:55:54.855+01:00
draft = false
description = "Learn how to split slices into smaller chunks in Go using the slices.Chunk function. This tutorial provides examples for batch processing, pagination, and more."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Chunk

last modified April 20, 2025

This tutorial explains how to use the slices.Chunk function in Go.
We'll cover slice operations with practical examples of splitting slices.

The slices.Chunk function divides a slice into smaller chunks of a
specified size. It's part of Go's experimental slices package.

This function is useful for batch processing, pagination, or parallel processing
of data. It returns a slice of slices containing the chunks.

## Basic slices.Chunk Example

The simplest use of slices.Chunk splits a slice into equal-sized
chunks. Here we split a slice of 6 numbers into chunks of size 2.

basic_chunk.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5, 6}
    chunks := slices.Chunk(numbers, 2)
    
    fmt.Println("Original slice:", numbers)
    fmt.Println("Chunks:", chunks)
}

We create a slice of numbers and split it into chunks of 2 elements each.
The function returns a slice containing three smaller slices.

## Uneven Chunk Sizes

When the slice length isn't divisible by chunk size, the last chunk will be
smaller. This example demonstrates this behavior.

uneven_chunks.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    letters := []string{"a", "b", "c", "d", "e"}
    chunks := slices.Chunk(letters, 2)
    
    fmt.Println("Original slice:", letters)
    fmt.Println("Chunks:", chunks)
}

The slice has 5 elements, so chunking by 2 creates 3 chunks. The last chunk
contains only one element.

## Chunk Size Larger Than Slice

If the chunk size exceeds the slice length, the result contains one chunk with
all elements. This example shows this edge case.

large_chunk.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    data := []float64{1.1, 2.2, 3.3}
    chunks := slices.Chunk(data, 5)
    
    fmt.Println("Original slice:", data)
    fmt.Println("Chunks:", chunks)
}

The chunk size 5 is larger than our 3-element slice. The function returns a
single chunk containing all elements.

## Working with Structs

We can use slices.Chunk with custom struct types. This example
chunks a slice of Person structs.

struct_chunk.go
  

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
        {"Diana", 22},
    }
    
    chunks := slices.Chunk(people, 2)
    
    fmt.Println("People chunks:")
    for i, chunk := range chunks {
        fmt.Printf("Chunk %d: %v\n", i+1, chunk)
    }
}

The slice of Person structs is divided into chunks of 2. Each chunk maintains
the original struct type and data.

## Empty Slice Behavior

slices.Chunk handles empty slices gracefully. This example shows
the result when chunking an empty slice.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    chunks := slices.Chunk(empty, 3)
    
    fmt.Println("Empty slice chunks:", chunks)
    fmt.Println("Number of chunks:", len(chunks))
}

Chunking an empty slice returns an empty slice of slices. This behavior is
consistent with mathematical expectations.

## Practical Example: Batch Processing

This practical example demonstrates using chunks for batch processing. We process
data in batches to avoid overwhelming a system.

batch_processing.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func processBatch(batch []int) {
    fmt.Println("Processing batch:", batch)
    time.Sleep(500 * time.Millisecond)
}

func main() {
    data := make([]int, 10)
    for i := range data {
        data[i] = i + 1
    }
    
    chunks := slices.Chunk(data, 3)
    
    for _, batch := range chunks {
        processBatch(batch)
    }
}

We create a slice of 10 numbers and split it into chunks of 3. Each chunk is
then processed separately with a simulated delay.

## Performance Considerations

For large slices, chunking can be memory intensive. This example benchmarks
chunking performance with different sizes.

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
    
    sizes := []int{10, 100, 1000, 10000}
    
    for _, size := range sizes {
        start := time.Now()
        chunks := slices.Chunk(largeSlice, size)
        elapsed := time.Since(start)
        
        fmt.Printf("Chunk size %6d: %d chunks, time %v\n",
            size, len(chunks), elapsed)
    }
}

The execution time depends on chunk size and slice length. Smaller chunks mean
more allocations but may be better for parallel processing.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Chunk function in Go with practical
examples of splitting slices into smaller chunks for various use cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).