+++
title = "Golang slices.MaxFunc"
date = 2025-08-29T19:56:02.658+01:00
draft = false
description = "Learn how to find the maximum element in a slice using slices.MaxFunc in Go with custom comparison functions. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.MaxFunc

last modified April 20, 2025

This tutorial explains how to use the slices.MaxFunc function in Go.
We'll cover finding maximum elements with custom comparison functions.

The slices.MaxFunc function returns the maximum element in a slice
according to a custom comparison function. It's part of Go's experimental slices package.

This function is useful when you need to find the "largest" element based on
custom criteria rather than natural ordering. It panics if the slice is empty.

## Basic slices.MaxFunc Example

The simplest use of slices.MaxFunc finds the maximum number in a
slice. We provide a comparison function that compares two integers.

basic_max.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{3, 1, 4, 1, 5, 9, 2, 6}
    
    max := slices.MaxFunc(numbers, func(a, b int) int {
        if a &lt; b {
            return -1
        } else if a &gt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("Maximum number:", max)
}

We create a slice of numbers and find the maximum using a comparison function.
The function returns -1 if a &lt; b, 1 if a &gt; b, and 0 if they're equal.

## Finding the Longest String

slices.MaxFunc can find the longest string in a slice. This example
compares strings by their length.

longest_string.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "cherry", "date"}
    
    longest := slices.MaxFunc(words, func(a, b string) int {
        if len(a) &lt; len(b) {
            return -1
        } else if len(a) &gt; len(b) {
            return 1
        }
        return 0
    })
    
    fmt.Println("Longest word:", longest)
}

The comparison function examines string lengths rather than lexicographic order.
"banana" is returned as the longest string with 6 characters.

## Working with Structs

We can use slices.MaxFunc with custom struct types. This example
finds the oldest person in a slice.

struct_max.go
  

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
    
    oldest := slices.MaxFunc(people, func(a, b Person) int {
        if a.Age &lt; b.Age {
            return -1
        } else if a.Age &gt; b.Age {
            return 1
        }
        return 0
    })
    
    fmt.Println("Oldest person:", oldest)
}

The function compares Person structs by their Age field. Bob is returned as the
oldest person with age 30.

## Custom Comparison Logic

Complex comparison logic can be implemented in the function. This example finds
the number with the largest absolute value.

absolute_max.go
  

package main

import (
    "fmt"
    "math"
    "slices"
)

func main() {
    numbers := []int{-5, 2, -8, 3, 1}
    
    maxAbs := slices.MaxFunc(numbers, func(a, b int) int {
        absA := math.Abs(float64(a))
        absB := math.Abs(float64(b))
        
        if absA &lt; absB {
            return -1
        } else if absA &gt; absB {
            return 1
        }
        return 0
    })
    
    fmt.Println("Number with largest absolute value:", maxAbs)
}

The comparison function first calculates absolute values before comparing.
-8 is returned as it has the largest absolute value (8).

## Handling Empty Slices

slices.MaxFunc panics when called on an empty slice. This example
shows how to handle this case safely.

empty_slice.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    var empty []int
    
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered from panic:", r)
        }
    }()
    
    // This will panic
    _ = slices.MaxFunc(empty, func(a, b int) int {
        if a &lt; b {
            return -1
        } else if a &gt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("This line won't be reached")
}

We use defer and recover to handle the panic gracefully. Always check slice
length before calling MaxFunc in production code.

## Finding Maximum by Multiple Fields

We can implement complex comparison logic using multiple fields. This example
finds the highest scoring student, with name as tiebreaker.

multi_field.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

type Student struct {
    Name  string
    Score int
}

func main() {
    students := []Student{
        {"Alice", 85},
        {"Bob", 92},
        {"Charlie", 85},
        {"Diana", 92},
    }
    
    topStudent := slices.MaxFunc(students, func(a, b Student) int {
        if a.Score &lt; b.Score {
            return -1
        } else if a.Score &gt; b.Score {
            return 1
        }
        // Tiebreaker: compare names alphabetically
        return strings.Compare(a.Name, b.Name)
    })
    
    fmt.Printf("Top student: %s with score %d\n", topStudent.Name, topStudent.Score)
}

When scores are equal, the comparison falls back to alphabetical name order.
Bob is returned as the top student, beating Diana in the name comparison.

## Practical Example: Latest File

This practical example finds the most recently modified file in a directory.
We compare files by their modification timestamps.

latest_file.go
  

package main

import (
    "fmt"
    "os"
    "slices"
    "time"
)

func main() {
    files := []string{"file1.txt", "file2.txt", "file3.txt"}
    
    fileInfos := make([]os.FileInfo, 0, len(files))
    for _, f := range files {
        fi, err := os.Stat(f)
        if err != nil {
            fmt.Printf("Error reading %s: %v\n", f, err)
            continue
        }
        fileInfos = append(fileInfos, fi)
    }
    
    if len(fileInfos) == 0 {
        fmt.Println("No valid files found")
        return
    }
    
    latest := slices.MaxFunc(fileInfos, func(a, b os.FileInfo) int {
        aTime := a.ModTime()
        bTime := b.ModTime()
        
        if aTime.Before(bTime) {
            return -1
        } else if aTime.After(bTime) {
            return 1
        }
        return 0
    })
    
    fmt.Printf("Latest file: %s (modified at %v)\n", latest.Name(), latest.ModTime())
}

We first collect file information, then find the file with the most recent
modification time. The example handles errors and empty results gracefully.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.MaxFunc function in Go with practical
examples of finding maximum elements using custom comparison functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).