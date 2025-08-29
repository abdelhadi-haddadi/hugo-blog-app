+++
title = "Golang slices.AppendSeq"
date = 2025-08-29T19:55:53.744+01:00
draft = false
description = "A comprehensive guide to using slices.AppendSeq in Go. Learn how to append multiple elements to slices with practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.AppendSeq

last modified April 20, 2025

This tutorial explains how to use the slices.AppendSeq function in Go.
We'll cover slice operations with practical examples of appending elements.

The slices.AppendSeq function appends multiple elements to a slice in
a single operation. It's part of Go's experimental slices package.

This function provides a convenient way to add several elements at once while
handling memory allocation efficiently. It returns a new slice with all elements.

## Basic slices.AppendSeq Example

The simplest use of slices.AppendSeq appends numbers to a slice.
We start with an initial slice and add multiple values.

basic_append.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3}
    numbers = slices.AppendSeq(numbers, 4, 5, 6)
    
    fmt.Println("Appended numbers:", numbers)
}

We create a slice with three numbers and append three more values. The function
returns a new slice containing all six elements in order.

## Appending Different Types

slices.AppendSeq works with any slice type. This example appends
strings to a string slice.

string_append.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    fruits := []string{"apple", "banana"}
    fruits = slices.AppendSeq(fruits, "cherry", "date", "elderberry")
    
    fmt.Println("Fruits:", fruits)
}

The function appends three string elements to our initial two-element slice.
Type safety is maintained as all elements must match the slice type.

## Appending to Empty Slice

We can use slices.AppendSeq with empty slices. This example starts
with nil and builds a slice.

empty_append.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []float64
    numbers := slices.AppendSeq(empty, 1.1, 2.2, 3.3)
    
    fmt.Println("Created from empty:", numbers)
}

Starting with a nil slice, we create a new slice with three float values.
The function handles the initial allocation automatically.

## Combining Multiple Slices

slices.AppendSeq can combine with the spread operator to merge
slices. This example demonstrates merging two slices.

combine_slices.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    part1 := []int{1, 2, 3}
    part2 := []int{4, 5, 6}
    combined := slices.AppendSeq(part1, part2...)
    
    fmt.Println("Combined slices:", combined)
}

Using the spread operator (...), we append all elements from part2 to part1.
This creates a new slice containing all elements from both slices.

## Appending Struct Values

We can append struct instances using slices.AppendSeq. This example
works with a custom Person type.

struct_append.go
  

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
    people := []Person{{"Alice", 25}}
    people = slices.AppendSeq(people, Person{"Bob", 30}, Person{"Charlie", 17})
    
    fmt.Println("People:", people)
}

We start with one person and append two more. The function handles the struct
values just like primitive types, maintaining type safety.

## Performance Comparison

This example compares slices.AppendSeq with multiple append calls.
We measure the performance difference.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    const count = 1_000_000
    var base []int
    
    // Using slices.AppendSeq
    start := time.Now()
    base = slices.AppendSeq(base, make([]int, count)...)
    fmt.Println("AppendSeq duration:", time.Since(start))
    
    // Using multiple append calls
    start = time.Now()
    for i := 0; i &lt; count; i++ {
        base = append(base, i)
    }
    fmt.Println("Multiple append duration:", time.Since(start))
}

slices.AppendSeq is generally faster for bulk operations as it can
allocate memory more efficiently than multiple individual append calls.

## Practical Example: Building a Command

This practical example builds a command string from parts using
slices.AppendSeq.

command_builder.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    cmdParts := []string{"git", "commit"}
    flags := []string{"-m", "Initial commit"}
    
    fullCmd := slices.AppendSeq(cmdParts, flags...)
    command := strings.Join(fullCmd, " ")
    
    fmt.Println("Command:", command)
}

We combine base command parts with flags into a single slice, then join them into
a space-separated string. This demonstrates real-world usage.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.AppendSeq function in Go with practical
examples of appending elements to slices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).