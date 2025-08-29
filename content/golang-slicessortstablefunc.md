+++
title = "Golang slices.SortStableFunc"
date = 2025-08-29T19:56:07.249+01:00
draft = false
description = "Learn how to sort slices stably using slices.SortStableFunc in Go with custom comparison functions. Includes practical examples."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang slices.SortStableFunc

last modified April 20, 2025

This tutorial explains how to use the slices.SortStableFunc function
in Go. We'll cover stable sorting with practical examples using custom comparison.

The slices.SortStableFunc function sorts a slice while preserving the
original order of equal elements. It's part of Go's experimental slices package.

This function is useful when you need to maintain the relative order of equal
elements after sorting. It accepts a custom comparison function for sorting.

## Basic SortStableFunc Example

The simplest use of slices.SortStableFunc sorts integers in
ascending order. We define a comparison function that returns -1, 0, or 1.

basic_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{3, 1, 4, 1, 5, 9, 2, 6}
    
    slices.SortStableFunc(numbers, func(a, b int) int {
        if a &lt; b {
            return -1
        }
        if a &gt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("Sorted numbers:", numbers)
}

We sort a slice of integers while preserving the order of equal elements. The
comparison function follows the standard less-than convention.

## Sorting Strings by Length

slices.SortStableFunc can sort strings by custom criteria. This
example sorts strings by length while keeping original order for equal lengths.

string_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "kiwi", "orange", "fig"}
    
    slices.SortStableFunc(words, func(a, b string) int {
        if len(a) &lt; len(b) {
            return -1
        }
        if len(a) &gt; len(b) {
            return 1
        }
        return 0
    })
    
    fmt.Println("Sorted by length:", words)
}

The comparison function examines string lengths instead of lexicographical order.
Original order is preserved for strings with equal lengths.

## Sorting Structs by Multiple Fields

We can use slices.SortStableFunc with custom struct types. This
example sorts people by age, then by name for equal ages.

struct_sort.go
  

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
        {"Charlie", 25},
        {"David", 30},
    }
    
    slices.SortStableFunc(people, func(a, b Person) int {
        if a.Age &lt; b.Age {
            return -1
        }
        if a.Age &gt; b.Age {
            return 1
        }
        if a.Name &lt; b.Name {
            return -1
        }
        if a.Name &gt; b.Name {
            return 1
        }
        return 0
    })
    
    fmt.Println("Sorted people:")
    for _, p := range people {
        fmt.Printf("%s (%d)\n", p.Name, p.Age)
    }
}

The comparison function first checks age, then name for equal ages. The stable
sort preserves original order for people with identical age and name.

## Case-Insensitive String Sorting

This example demonstrates case-insensitive sorting while preserving original
order for strings that compare equal case-insensitively.

case_insensitive.go
  

package main

import (
    "fmt"
    "slices"
    "strings"
)

func main() {
    words := []string{"Apple", "banana", "apple", "Banana", "cherry"}
    
    slices.SortStableFunc(words, func(a, b string) int {
        aLower := strings.ToLower(a)
        bLower := strings.ToLower(b)
        if aLower &lt; bLower {
            return -1
        }
        if aLower &gt; bLower {
            return 1
        }
        return 0
    })
    
    fmt.Println("Case-insensitive sorted:", words)
}

We convert strings to lowercase before comparison. The original order of "Apple"
and "apple" is preserved due to stable sorting.

## Sorting in Descending Order

To sort in descending order, we simply reverse the comparison logic. This
example sorts numbers from highest to lowest.

descending_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    numbers := []int{3, 1, 4, 1, 5, 9, 2, 6}
    
    slices.SortStableFunc(numbers, func(a, b int) int {
        if a &gt; b {
            return -1
        }
        if a &lt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("Descending sorted:", numbers)
}

The comparison function returns -1 when a &gt; b to achieve descending order. Equal
elements maintain their original relative positions.

## Sorting with Complex Logic

slices.SortStableFunc can handle complex sorting criteria. This
example sorts strings by length, then alphabetically for equal lengths.

complex_sort.go
  

package main

import (
    "fmt"
    "slices"
)

func main() {
    words := []string{"apple", "banana", "kiwi", "orange", "fig", "pear"}
    
    slices.SortStableFunc(words, func(a, b string) int {
        if len(a) &lt; len(b) {
            return -1
        }
        if len(a) &gt; len(b) {
            return 1
        }
        if a &lt; b {
            return -1
        }
        if a &gt; b {
            return 1
        }
        return 0
    })
    
    fmt.Println("Complex sorted:", words)
}

The comparison function first compares lengths, then performs lexicographical
comparison for strings of equal length. Stable sort preserves original order.

## Practical Example: Employee Sorting

This practical example sorts employees by department, then by salary within
departments, preserving original order for equal comparisons.

employee_sort.go
  

package main

import (
    "fmt"
    "slices"
)

type Employee struct {
    Name       string
    Department string
    Salary     int
}

func main() {
    employees := []Employee{
        {"Alice", "HR", 50000},
        {"Bob", "IT", 75000},
        {"Charlie", "HR", 50000},
        {"David", "IT", 80000},
        {"Eve", "Finance", 60000},
    }
    
    slices.SortStableFunc(employees, func(a, b Employee) int {
        if a.Department &lt; b.Department {
            return -1
        }
        if a.Department &gt; b.Department {
            return 1
        }
        if a.Salary &lt; b.Salary {
            return -1
        }
        if a.Salary &gt; b.Salary {
            return 1
        }
        return 0
    })
    
    fmt.Println("Sorted employees:")
    for _, e := range employees {
        fmt.Printf("%s: %s $%d\n", e.Name, e.Department, e.Salary)
    }
}

Employees are first sorted by department name, then by salary within each
department. Original order is preserved for employees with identical fields.

## Source

[Go experimental slices package documentation](https://pkg.go.dev/golang.org/x/exp/slices)

This tutorial covered the slices.SortStableFunc function in Go with
practical examples of stable sorting with custom comparison functions.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).