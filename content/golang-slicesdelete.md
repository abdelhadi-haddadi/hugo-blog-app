+++
title = "Golang slices.Delete"
date = 2025-08-29T19:55:59.337+01:00
draft = false
description = "Learn how to use slices.Delete in Go to remove elements from slices. Includes practical examples and use cases."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.Delete

last modified April 20, 2025

This tutorial explains how to use the slices.Delete function in Go.
We'll cover slice operations with practical examples of removing elements.

The slices.Delete function removes elements from a slice and returns
the modified slice. It's part of Go's experimental slices package.

This function is useful for safely removing elements without memory leaks. It
handles index bounds checking and returns a new slice with elements removed.

## Basic slices.Delete Example

The simplest use of slices.Delete removes one element from a slice.
We specify the start and end index of the elements to remove.

basic_delete.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    // Remove element at index 2 (value 3)
    numbers = slices.Delete(numbers, 2, 3)
    
    fmt.Println("After deletion:", numbers)
}

We create a slice of numbers and remove the element at index 2. The function
takes the slice and the range to delete (from 2 to 3, exclusive).

## Removing Multiple Elements

slices.Delete can remove a range of elements. This example removes
three consecutive elements from a slice.

multiple_delete.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    letters := []string{"a", "b", "c", "d", "e", "f"}
    
    // Remove elements from index 1 to 4 (b, c, d)
    letters = slices.Delete(letters, 1, 4)
    
    fmt.Println("After deletion:", letters)
}

The function removes elements from index 1 up to (but not including) index 4.
The resulting slice contains ["a", "e", "f"].

## Working with Struct Slices

We can use slices.Delete with custom struct types. This example
removes a person from a slice of Person structs.

struct_delete.go
  

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
    
    // Remove Bob (index 1)
    people = slices.Delete(people, 1, 2)
    
    fmt.Println("Remaining people:", people)
}

The function removes the element at index 1 (Bob). The slice is modified to
contain only Alice and Charlie.

## Edge Case: Empty Slice

slices.Delete handles empty slices gracefully. This example shows
the behavior when trying to delete from an empty slice.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    // Try to delete from empty slice
    result := slices.Delete(empty, 0, 1)
    
    fmt.Println("Result:", result)
    fmt.Println("Length:", len(result))
}

The function returns an empty slice without panicking. This makes it safe to use
even when the input might be empty.

## Performance Considerations

For large slices, deleting elements has performance implications. This example
benchmarks deletion at different positions.

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
    
    // Delete from start
    start := time.Now()
    _ = slices.Delete(largeSlice, 0, 1)
    fmt.Println("Delete from start:", time.Since(start))
    
    // Delete from middle
    start = time.Now()
    _ = slices.Delete(largeSlice, 500_000, 500_001)
    fmt.Println("Delete from middle:", time.Since(start))
    
    // Delete from end
    start = time.Now()
    _ = slices.Delete(largeSlice, 999_999, 1_000_000)
    fmt.Println("Delete from end:", time.Since(start))
}

Deleting from the start is most expensive as it requires shifting all elements.
Deleting from the end is fastest as no shifting is needed.

## Practical Example: Removing Invalid Entries

This practical example removes invalid entries from a slice of user inputs.
We filter out negative numbers from a list of measurements.

filter_invalid.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    measurements := []float64{1.2, -0.5, 3.4, -2.1, 5.6, -0.9}
    
    // Remove all negative measurements
    for i := 0; i &lt; len(measurements); {
        if measurements[i] &lt; 0 {
            measurements = slices.Delete(measurements, i, i+1)
        } else {
            i++
        }
    }
    
    fmt.Println("Valid measurements:", measurements)
}

We iterate through the slice and remove negative values. Note how we only
increment the index when we don't delete to handle the shifted elements.

## Combining with Other Slice Operations

This example shows how to combine slices.Delete with other slice
operations to implement more complex functionality.

combined_operations.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    data := []int{10, 20, 30, 40, 50, 60, 70}
    
    // Find index of element to delete
    idx := slices.Index(data, 40)
    
    if idx != -1 {
        // Delete element and everything after it
        data = slices.Delete(data, idx, len(data))
    }
    
    fmt.Println("Result:", data)
}

We first find the index of the element to delete using slices.Index.
Then we delete that element and all following elements in one operation.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.Delete function in Go with practical
examples of removing elements from slices in various scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).