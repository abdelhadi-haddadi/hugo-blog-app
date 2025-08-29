+++
title = "Go Quick Sort"
date = 2025-08-29T19:55:33.564+01:00
draft = false
description = "Learn how to implement quick sort in Go. Includes examples and explanations of the algorithm."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Quick Sort

last modified March 8, 2025

This tutorial explores the Quick Sort algorithm in Go, showing how to sort
numeric and textual data in ascending and descending order.

An algorithm is a structured sequence of steps designed to address a
problem or perform a task efficiently. It's a cornerstone of programming,
guiding computational logic.

Sorting means organizing data into a specific sequence, such as
ascending (small to large) or descending (large to small). It's vital for tasks
like data retrieval and presentation.

## Common Sorting Algorithms

Here are some well-known sorting algorithms:

- Quick Sort

- Merge Sort

- Bubble Sort

- Insertion Sort

- Selection Sort

## Quick Sort Algorithm

Quick Sort is a divide-and-conquer algorithm that selects a pivot element and
partitions the array around it. Elements smaller than the pivot go left, larger
ones go right.

The sub-arrays are recursively sorted, leading to a fully sorted array. With an
average time complexity of O(n log n), it's efficient for most datasets,
though worst-case is O(n²).

## Quick Sort Example

Below is a Go implementation of Quick Sort for numbers and strings.

quick_sort.go
  

package main

import "fmt"

func quickSort(arr []int) []int {

    if len(arr) &lt;= 1 {
        return arr
    }
    
    pivot := arr[len(arr)/2]
    left := []int{}
    middle := []int{}
    right := []int{}
    
    for _, x := range arr {
        if x &lt; pivot {
            left = append(left, x)
        } else if x == pivot {
            middle = append(middle, x)
        } else {
            right = append(right, x)
        }
    }
    
    left = quickSort(left)
    right = quickSort(right)
    return append(append(left, middle...), right...)
}

func quickSortStrings(arr []string) []string {

    if len(arr) &lt;= 1 {
        return arr
    }
    pivot := arr[len(arr)/2]
    left := []string{}
    middle := []string{}
    right := []string{}
    
    for _, x := range arr {
        if x &lt; pivot {
            left = append(left, x)
        } else if x == pivot {
            middle = append(middle, x)
        } else {
            right = append(right, x)
        }
    }

    left = quickSortStrings(left)
    right = quickSortStrings(right)
    return append(append(left, middle...), right...)
}

func main() {

    numbers := []int{3, 6, 8, 10, 1, 2, 1}
    sortedNumbers := quickSort(numbers)
    fmt.Println("Sorted numbers:", sortedNumbers)

    words := []string{"banana", "apple", "cherry", "date"}
    sortedWords := quickSortStrings(words)
    fmt.Println("Sorted words:", sortedWords)
}

The quickSort function sorts integers, while
quickSortStrings handles strings. Both use a middle pivot and
partition the data recursively.

The result is a new sorted slice in ascending order. This approach leverages
Go's type system, ensuring flexibility for different data types in a concise
way.

$ go run quick_sort.go
Sorted numbers: [1 1 2 3 6 8 10]
Sorted words: [apple banana cherry date]

## Sorting in Descending Order

Here's how to adapt Quick Sort for descending order in Go.

quick_sort_desc.go
  

package main

import "fmt"

func quickSortDesc(arr []int) []int {
    
    if len(arr) &lt;= 1 {
        return arr
    }
    
    pivot := arr[len(arr)/2]
    left := []int{}
    middle := []int{}
    right := []int{}
    
    for _, x := range arr {
        if x &gt; pivot {
            left = append(left, x)
        } else if x == pivot {
            middle = append(middle, x)
        } else {
            right = append(right, x)
        }
    }
    left = quickSortDesc(left)
    right = quickSortDesc(right)
    return append(append(left, middle...), right...)
}

func quickSortStringsDesc(arr []string) []string {

    if len(arr) &lt;= 1 {
        return arr
    }
    pivot := arr[len(arr)/2]
    left := []string{}
    middle := []string{}
    right := []string{}
    
    for _, x := range arr {
        if x &gt; pivot {
            left = append(left, x)
        } else if x == pivot {
            middle = append(middle, x)
        } else {
            right = append(right, x)
        }
    }

    left = quickSortStringsDesc(left)
    right = quickSortStringsDesc(right)
    return append(append(left, middle...), right...)
}

func main() {
    numbers := []int{3, 6, 8, 10, 1, 2, 1}
    sortedNumbersDesc := quickSortDesc(numbers)
    fmt.Println("Sorted numbers (descending):", sortedNumbersDesc)

    words := []string{"banana", "apple", "cherry", "date"}
    sortedWordsDesc := quickSortStringsDesc(words)
    fmt.Println("Sorted words (descending):", sortedWordsDesc)
}

The quickSortDesc and quickSortStringsDesc functions
reverse the partitioning logic—larger elements go left, smaller go right—yielding
descending order.

This adaptation is useful for scenarios like ranking items from highest to
lowest, such as scores or alphabetically reversed lists in Go applications.

$ go run quick_sort_desc.go
Sorted numbers (descending): [10 8 6 3 2 1 1]
Sorted words (descending): [date cherry banana apple]

## Comparing Quick Sort with Insertion Sort

Quick Sort's average O(n log n) performance outshines Insertion Sort's O(n²),
especially for large datasets. This benchmark in Go illustrates the difference.

benchmark.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func quickSort(arr []int) []int {

    if len(arr) &lt;= 1 {
        return arr
    }
    pivot := arr[len(arr)/2]
    left := []int{}
    middle := []int{}
    right := []int{}

    for _, x := range arr {
        if x &lt; pivot {
            left = append(left, x)
        } else if x == pivot {
            middle = append(middle, x)
        } else {
            right = append(right, x)
        }
    }

    left = quickSort(left)
    right = quickSort(right)
    return append(append(left, middle...), right...)
}

func insertionSort(arr []int) []int {

    result := make([]int, len(arr))
    copy(result, arr)

    for i := 1; i &lt; len(result); i++ {
        key := result[i]
        j := i - 1
        for j &gt;= 0 &amp;&amp; key &lt; result[j] {
            result[j+1] = result[j]
            j--
        }
        result[j+1] = key
    }
    return result
}

func main() {

    rand.Seed(time.Now().UnixNano())
    data := make([]int, 10000)
    for i := range data {
        data[i] = rand.Intn(1000)
    }

    quickData := make([]int, len(data))
    copy(quickData, data)
    start := time.Now()
    quickSort(quickData)
    quickTime := time.Since(start)

    insertData := make([]int, len(data))
    copy(insertData, data)
    start = time.Now()
    insertionSort(insertData)
    insertTime := time.Since(start)

    fmt.Printf("Quick Sort time: %.6f seconds\n", quickTime.Seconds())
    fmt.Printf("Insertion Sort time: %.6f seconds\n", insertTime.Seconds())
}

This code generates 10,000 random integers and times both algorithms. Quick Sort
uses recursion and partitioning, while Insertion Sort shifts elements one by
one.

Quick Sort typically finishes much faster—often by an order of magnitude—due to
its logarithmic scaling. Insertion Sort, while simpler, struggles with large
data, making it less practical here.

Such comparisons help developers choose algorithms based on dataset size and
performance needs in Go projects.

## Source

[Go sort package documentation](https://pkg.go.dev/sort)

This tutorial explained Quick Sort in Go, with examples for ascending and
descending sorts, plus a benchmark against Insertion Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).