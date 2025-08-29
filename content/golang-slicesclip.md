+++
title = "Golang slices.Clip"
date = 2025-08-29T19:55:54.865+01:00
draft = false
description = "Learn how to clip slices in Go. Includes examples and explanations of slice clipping operations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Clip

last modified April 20, 2025

This tutorial explains how to use the slices.Clip function in Go.
We'll cover slice operations with practical examples of memory optimization.

The slices.Clip function removes unused capacity from a slice,
returning a new slice with length equal to capacity. It's part of Go's slices
package.

This function is useful for memory optimization when you want to reduce the
underlying array size to exactly fit the slice's elements.

## Basic slices.Clip Example

The simplest use of slices.Clip demonstrates how it reduces a
slice's capacity to match its length. We'll create a slice with extra capacity.

basic_clip.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s := make([]int, 3, 10) // length 3, capacity 10
    fmt.Printf("Before: len=%d, cap=%d\n", len(s), cap(s))
    
    clipped := slices.Clip(s)
    fmt.Printf("After: len=%d, cap=%d\n", len(clipped), cap(clipped))
}

We create a slice with length 3 and capacity 10. After clipping, the capacity
matches the length. The original slice remains unchanged.

## Clip After Append Operations

slices.Clip is often used after append operations that may leave
extra capacity. This example shows clipping after growing a slice.

append_clip.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    s := []int{1, 2, 3}
    s = append(s, 4, 5)
    fmt.Printf("After append: len=%d, cap=%d\n", len(s), cap(s))
    
    s = slices.Clip(s)
    fmt.Printf("After clip: len=%d, cap=%d\n", len(s), cap(s))
}

Appending elements often increases capacity beyond what's needed. Clipping
ensures the slice uses only necessary memory.

## Clip with Sub-slices

Clipping works with sub-slices created through slicing operations. This example
shows clipping a sub-slice of a larger slice.

subslice_clip.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    original := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    sub := original[2:5] // len=3, cap=8
    
    fmt.Printf("Sub-slice before: len=%d, cap=%d\n", len(sub), cap(sub))
    clipped := slices.Clip(sub)
    fmt.Printf("Sub-slice after: len=%d, cap=%d\n", len(clipped), cap(clipped))
}

The sub-slice initially has capacity extending to the end of the original array.
Clipping removes this unused capacity.

## Clip with Empty Slices

slices.Clip handles empty slices specially. This example shows its
behavior with nil and empty slices.

empty_clip.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var nilSlice []int
    emptySlice := []int{}
    
    fmt.Println("Nil slice before:", len(nilSlice), cap(nilSlice))
    clippedNil := slices.Clip(nilSlice)
    fmt.Println("Nil slice after:", len(clippedNil), cap(clippedNil))
    
    fmt.Println("Empty slice before:", len(emptySlice), cap(emptySlice))
    clippedEmpty := slices.Clip(emptySlice)
    fmt.Println("Empty slice after:", len(clippedEmpty), cap(clippedEmpty))
}

Clipping a nil slice returns nil. Clipping an empty non-nil slice returns an
empty slice with zero capacity.

## Clip for Memory Optimization

This example demonstrates memory savings by clipping large slices that won't grow
further.

memory_optimization.go
  

package main

import (
    "fmt"
    "slices"
    "runtime"
)

func printMemUsage() {
    var m runtime.MemStats
    runtime.ReadMemStats(&amp;m)
    fmt.Printf("Alloc = %v MiB\n", m.Alloc/1024/1024)
}

func main() {
    printMemUsage()
    
    large := make([]int, 1_000_000, 2_000_000)
    printMemUsage()
    
    clipped := slices.Clip(large)
    printMemUsage()
    
    _ = clipped // prevent optimization removal
}

The example shows memory allocation before and after clipping. The clipped slice
uses half the memory of the original.

## Clip with String Slices

slices.Clip works with slices of any type, including strings. This
example clips a slice of string values.

string_clip.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    names := make([]string, 3, 10)
    names[0] = "Alice"
    names[1] = "Bob"
    names[2] = "Charlie"
    
    fmt.Printf("Before: len=%d, cap=%d\n", len(names), cap(names))
    names = slices.Clip(names)
    fmt.Printf("After: len=%d, cap=%d\n", len(names), cap(names))
}

String slices behave like other types when clipped. The capacity reduces to match
the length, optimizing memory usage.

## Practical Example: Returning Slices from Functions

This practical example shows clipping slices returned from functions to ensure
callers get optimally sized slices.

function_return.go
  

package main

import (
    "fmt"
    "slices"
)

func generateNumbers(count int) []int {
    numbers := make([]int, 0, count*2) // Extra capacity
    
    for i := 0; i &lt; count; i++ {
        numbers = append(numbers, i*10)
    }
    
    return slices.Clip(numbers)
}

func main() {
    nums := generateNumbers(5)
    fmt.Println("Numbers:", nums)
    fmt.Printf("Length: %d, Capacity: %d\n", len(nums), cap(nums))
}

The function creates a slice with extra capacity during generation but clips it
before returning. This provides memory efficiency to callers.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Clip function in Go with practical
examples of memory optimization and slice capacity management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).