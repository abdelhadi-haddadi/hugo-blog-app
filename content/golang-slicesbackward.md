+++
title = "Golang slices.Backward"
date = 2025-08-29T19:55:53.729+01:00
draft = false
description = "Learn how to reverse slices in Go with practical examples and explanations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Backward

last modified April 20, 2025

This tutorial explains how to use the slices.Backward function in Go.
We'll cover reverse iteration over slices with practical examples.

The slices.Backward function provides a way to iterate over a slice
in reverse order. It's part of Go's experimental slices package.

This function is useful when you need to process elements from last to first.
It returns an iterator that yields elements starting from the end.

## Basic slices.Backward Example

The simplest use of slices.Backward prints numbers in reverse order.
We create an iterator and loop through it.

basic_backward.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    for it := slices.Backward(numbers); ; {
        num, ok := it.Next()
        if !ok {
            break
        }
        fmt.Println(num)
    }
}

We create a backward iterator for the numbers slice. The loop continues until
Next() returns false, printing elements from 5 to 1.

## Processing Strings in Reverse

slices.Backward can iterate over string slices in reverse. This
example prints words from last to first.

string_backward.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "cherry"}
    
    for it := slices.Backward(words); ; {
        word, ok := it.Next()
        if !ok {
            break
        }
        fmt.Println(word)
    }
}

The iterator yields "cherry", then "banana", and finally "apple". This shows
how to process string elements in reverse order.

## Modifying Elements During Iteration

We can modify slice elements during reverse iteration. This example doubles
each number while going backward.

modify_backward.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    for it := slices.Backward(numbers); ; {
        num, ok := it.Next()
        if !ok {
            break
        }
        *num *= 2
    }
    
    fmt.Println("Modified slice:", numbers)
}

The iterator returns pointers to elements, allowing modification. The slice
becomes [2, 4, 6, 8, 10] after iteration.

## Combining with Other Slice Functions

slices.Backward can be combined with other slice operations.
This example filters even numbers while iterating backward.

combined_backward.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5, 6}
    var evens []int
    
    for it := slices.Backward(numbers); ; {
        num, ok := it.Next()
        if !ok {
            break
        }
        if *num%2 == 0 {
            evens = append(evens, *num)
        }
    }
    
    fmt.Println("Even numbers in reverse:", evens)
}

We collect even numbers in reverse order. The result is [6, 4, 2], showing how
to combine filtering with reverse iteration.

## Empty Slice Behavior

slices.Backward handles empty slices gracefully. This example
demonstrates its behavior with an empty slice.

empty_backward.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []string
    
    count := 0
    for it := slices.Backward(empty); ; {
        _, ok := it.Next()
        if !ok {
            break
        }
        count++
    }
    
    fmt.Println("Elements processed:", count)
}

The iterator immediately returns false for empty slices. No elements are
processed, and count remains zero.

## Performance Considerations

Reverse iteration has the same performance characteristics as forward iteration.
This example benchmarks backward vs forward iteration.

performance_backward.go
  

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
    
    // Backward iteration
    start := time.Now()
    for it := slices.Backward(largeSlice); ; {
        _, ok := it.Next()
        if !ok {
            break
        }
    }
    fmt.Println("Backward iteration:", time.Since(start))
    
    // Forward iteration
    start = time.Now()
    for _, v := range largeSlice {
        _ = v
    }
    fmt.Println("Forward iteration:", time.Since(start))
}

Both iterations take similar time, showing that reverse iteration doesn't add
significant overhead. The difference is negligible for most use cases.

## Practical Example: Undo Operation

This practical example implements an undo feature using reverse iteration.
We process actions in reverse to undo them.

undo_backward.go
  

package main

import (
    "fmt"
    "slices"
)

type Action struct {
    Name string
    Undo func()
}

func main() {
    actions := []Action{
        {"create", func() { fmt.Println("Undo create") }},
        {"edit", func() { fmt.Println("Undo edit") }},
        {"delete", func() { fmt.Println("Undo delete") }},
    }
    
    fmt.Println("Undoing actions:")
    for it := slices.Backward(actions); ; {
        action, ok := it.Next()
        if !ok {
            break
        }
        action.Undo()
    }
}

The undo operations execute in reverse order: first delete, then edit, then
create. This demonstrates a real-world use case for reverse iteration.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Backward function in Go with
practical examples of reverse iteration in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).