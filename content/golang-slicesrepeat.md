+++
title = "Golang slices.Repeat"
date = 2025-08-29T19:56:03.785+01:00
draft = false
description = "Learn how to create repeated elements in slices using slices.Repeat in Go. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Repeat

last modified April 20, 2025

This tutorial explains how to use the slices.Repeat function in Go.
We'll cover slice operations with practical examples of creating repeated elements.

The slices.Repeat function creates a new slice by repeating the given
element a specified number of times. It's part of Go's experimental slices package.

This function is useful for initializing slices with repeated values or creating
patterns. It returns a new slice with the element repeated count times.

## Basic slices.Repeat Example

The simplest use of slices.Repeat creates a slice with repeated zeros.
We specify the element to repeat and the count of repetitions.

basic_repeat.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    repeated := slices.Repeat(0, 5)
    fmt.Println("Repeated zeros:", repeated)
}

We create a slice with five zeros. The first argument is the value to repeat,
and the second is the repetition count. The output shows [0 0 0 0 0].

## Repeating Strings

slices.Repeat can create slices of repeated strings. This example
makes a slice with three "hello" strings.

string_repeat.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    greetings := slices.Repeat("hello", 3)
    fmt.Println("Greetings:", greetings)
}

The function repeats the string "hello" three times. The result is a slice
containing ["hello", "hello", "hello"].

## Working with Structs

We can use slices.Repeat with custom struct types. This example
creates multiple instances of a Person struct.

struct_repeat.go
  

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
    defaultPerson := Person{"Unknown", 0}
    people := slices.Repeat(defaultPerson, 2)
    
    fmt.Println("People:", people)
}

We define a Person struct and create two copies of a default instance.
Each element in the resulting slice is a separate copy of the struct.

## Negative Count Handling

slices.Repeat handles negative counts by returning an empty slice.
This example demonstrates the behavior with invalid counts.

negative_count.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    // Valid count
    positive := slices.Repeat(1, 3)
    fmt.Println("Positive count:", positive)
    
    // Negative count
    negative := slices.Repeat(1, -1)
    fmt.Println("Negative count:", negative)
}

With a positive count, we get the expected repeated elements. With negative
counts, the function returns an empty slice without panicking.

## Zero Count Behavior

When count is zero, slices.Repeat returns an empty slice.
This example shows the difference between zero and positive counts.

zero_count.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := slices.Repeat("test", 0)
    fmt.Println("Empty slice:", empty, "Length:", len(empty))
    
    nonEmpty := slices.Repeat("test", 1)
    fmt.Println("Non-empty slice:", nonEmpty, "Length:", len(nonEmpty))
}

A count of zero produces an empty slice, while count 1 creates a single-element
slice. Both are valid but represent different concepts.

## Performance Considerations

For large repetition counts, memory allocation becomes important. This example
benchmarks different repetition sizes.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    start := time.Now()
    small := slices.Repeat(1, 100)
    _ = small
    fmt.Println("Small slice:", time.Since(start))
    
    start = time.Now()
    large := slices.Repeat(1, 1_000_000)
    _ = large
    fmt.Println("Large slice:", time.Since(start))
}

The execution time scales with the count parameter. Memory allocation is done
once for the entire slice, making it efficient for large counts.

## Practical Example: Initializing a Game Board

This practical example uses slices.Repeat to initialize a game board
with default values. We create a 2D slice representing the board.

game_board.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    const width, height = 5, 5
    const emptyCell = "."
    
    // Create one row
    row := slices.Repeat(emptyCell, width)
    
    // Create board by repeating rows
    board := slices.Repeat(row, height)
    
    // Print the board
    for _, row := range board {
        fmt.Println(row)
    }
}

We first create a single row of empty cells, then repeat that row to form the
board. This demonstrates how to build complex structures with repeated slices.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Repeat function in Go with practical
examples of creating repeated slice elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).