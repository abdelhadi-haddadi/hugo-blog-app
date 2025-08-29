+++
title = "Golang slices.Reverse"
date = 2025-08-29T19:56:04.981+01:00
draft = false
description = "Learn how to reverse slices in Go using the slices.Reverse function. This tutorial provides examples for reversing integers, strings, structs, and more."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Reverse

last modified April 20, 2025

This tutorial explains how to use the slices.Reverse function in Go.
We'll cover slice reversal operations with practical examples.

The slices.Reverse function reverses the order of elements in a slice.
It's part of Go's experimental slices package introduced in Go 1.21.

This function modifies the original slice in place rather than creating a new one.
It works with any slice type and maintains type safety through generics.

## Basic slices.Reverse Example

The simplest use of slices.Reverse reverses a slice of integers.
The function modifies the original slice directly.

basic_reverse.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    slices.Reverse(numbers)
    
    fmt.Println("Reversed numbers:", numbers)
}

We create a slice of numbers and reverse their order. The output shows the
modified slice with elements in reverse order.

## Reversing String Slices

slices.Reverse works with string slices as well. This example
reverses a list of names.

string_reverse.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    names := []string{"Alice", "Bob", "Charlie", "Diana"}
    slices.Reverse(names)
    
    fmt.Println("Reversed names:", names)
}

The string slice is reversed in place, with the first element becoming last.
The operation maintains all string values unchanged.

## Reversing Struct Slices

We can reverse slices of custom struct types. This example reverses a slice
of Person structs.

struct_reverse.go
  

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
    }
    
    slices.Reverse(people)
    fmt.Println("Reversed people:", people)
}

The struct slice is reversed while maintaining all field values. Each Person
struct remains intact, only their order changes.

## Empty and Single-Element Slices

slices.Reverse handles edge cases gracefully. This example shows
behavior with empty and single-element slices.

edge_cases.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    empty := []int{}
    single := []string{"alone"}
    
    slices.Reverse(empty)
    slices.Reverse(single)
    
    fmt.Println("Empty:", empty)
    fmt.Println("Single:", single)
}

Reversing empty or single-element slices has no visible effect. The operation
completes but doesn't change the slice contents.

## Preserving Original Slice

To keep the original slice unchanged, create a copy before reversing. This
example demonstrates both approaches.

preserve_original.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    original := []int{10, 20, 30, 40}
    
    // Modifies original
    slices.Reverse(original)
    fmt.Println("Modified original:", original)
    
    // Preserve original with copy
    preserved := []int{10, 20, 30, 40}
    copy := slices.Clone(preserved)
    slices.Reverse(copy)
    
    fmt.Println("Original:", preserved)
    fmt.Println("Reversed copy:", copy)
}

We show both direct modification and copy-then-reverse approaches. The
slices.Clone function helps preserve the original data.

## Performance Considerations

For large slices, reversing can be memory intensive. This example benchmarks
the operation with different slice sizes.

performance.go
  

package main

import (
    "fmt"
    "slices"
    "time"
)

func main() {
    sizes := []int{1_000, 10_000, 100_000, 1_000_000}
    
    for _, size := range sizes {
        slice := make([]int, size)
        for i := range slice {
            slice[i] = i
        }
        
        start := time.Now()
        slices.Reverse(slice)
        elapsed := time.Since(start)
        
        fmt.Printf("Size %d: %v\n", size, elapsed)
    }
}

The benchmark shows how execution time scales with slice size. Reversing is
an O(n) operation that swaps n/2 elements.

## Practical Example: Palindrome Check

This practical example uses slices.Reverse to check if a string
is a palindrome (reads the same forwards and backwards).

palindrome.go
  

package main

import (
    "fmt"
    "slices"
)

func isPalindrome(s string) bool {
    runes := []rune(s)
    reversed := slices.Clone(runes)
    slices.Reverse(reversed)
    
    return slices.Equal(runes, reversed)
}

func main() {
    tests := []string{"radar", "hello", "madam", "golang"}
    
    for _, word := range tests {
        fmt.Printf("%s: %t\n", word, isPalindrome(word))
    }
}

We convert the string to runes, create a reversed copy, and compare. This
demonstrates a real-world use of slice reversal.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Reverse function in Go with practical
examples of reversing slice elements in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).