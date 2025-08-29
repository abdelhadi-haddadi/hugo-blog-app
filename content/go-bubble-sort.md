+++
title = "Go Bubble Sort"
date = 2025-08-29T19:55:01.773+01:00
draft = false
description = "Learn how to implement bubble sort in Go. Includes examples of sorting algorithms."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Bubble Sort

last modified March 8, 2025

This tutorial explores the Bubble Sort algorithm in Go. We demonstrate sorting
numeric and textual data in ascending and descending order, and benchmark it
against Quick Sort.

An algorithm is a well-defined sequence of steps designed to solve a
problem or complete a task efficiently. In programming, algorithms are the
backbone of computational logic.

Sorting refers to organizing a collection of data into a specific
sequence, such as ascending (smallest to largest) or descending (largest to
smallest). It's a key operation in many applications, from databases to user
interfaces.

## Common Sorting Algorithms

Here are some widely recognized sorting algorithms:

- Bubble Sort

- Quick Sort

- Merge Sort

- Insertion Sort

- Selection Sort

## Bubble Sort Algorithm

Bubble Sort is a straightforward sorting method that iterates through a list,
comparing adjacent items and swapping them if they're out of order. It's named
for how larger elements "bubble up" to the end.

The process repeats until no more swaps are needed, indicating the list is
sorted. While simple, it's not the fastest for large datasets due to its
quadratic time complexity.

## Bubble Sort Example

Below is a Go implementation of Bubble Sort for numbers.

bubble_sort.go
  

package main

import "fmt"

func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i &lt; n; i++ {
        for j := 0; j &lt; n-i-1; j++ {
            if arr[j] &gt; arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}

func main() {
    nums := []int{64, 34, 25, 12, 22, 11, 90}
    bubbleSort(nums)
    fmt.Println("Sorted array:", nums)
}

This code defines a bubbleSort function that sorts an integer slice
in ascending order. The outer loop runs n times, where
n is the slice length.

The inner loop compares adjacent elements, swapping them if the left is greater
than the right. After execution, the array is sorted from smallest to largest.

$ go run bubble_sort.go
Sorted array: [11 12 22 25 34 64 90]

## Sorting Textual Data

Bubble Sort can also handle strings. Here's an example sorting text in both
ascending and descending order.

bubble_sort_text.go
  

package main

import "fmt"

func bubbleSort(arr []string, reverse bool) {
    n := len(arr)
    for i := 0; i &lt; n; i++ {
        for j := 0; j &lt; n-i-1; j++ {
            if (!reverse &amp;&amp; arr[j] &gt; arr[j+1]) || (reverse &amp;&amp; arr[j] &lt; arr[j+1]) {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}

func main() {
    words := []string{"banana", "apple", "cherry", "date"}
    bubbleSort(words, false)
    fmt.Println("Ascending order:", words)

    bubbleSort(words, true)
    fmt.Println("Descending order:", words)
}

The bubbleSort function now takes a reverse boolean to
toggle sorting direction. For ascending, it swaps if the left string is
alphabetically greater.

For descending, it swaps if the left is less than the right. This flexibility
makes it useful for sorting names, tags, or other textual data in Go programs.

$ go run bubble_sort_text.go
Ascending order: [apple banana cherry date]
Descending order: [date cherry banana apple]

## Comparing Bubble Sort with Quick Sort

Bubble Sort's simplicity comes at a cost—it's slow for large datasets, with a
time complexity of O(n²). Quick Sort, with an average complexity of O(n log n),
is much faster.

The example below benchmarks both algorithms using a large random dataset to
highlight their performance differences in Go.

sort_benchmark.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func bubbleSort(arr []int) {
    n := len(arr)
    for i := 0; i &lt; n; i++ {
        for j := 0; j &lt; n-i-1; j++ {
            if arr[j] &gt; arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
}

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

func main() {
    rand.Seed(time.Now().UnixNano())
    data := make([]int, 1000)
    for i := range data {
        data[i] = rand.Intn(1000)
    }

    bubbleData := make([]int, len(data))
    copy(bubbleData, data)
    start := time.Now()
    bubbleSort(bubbleData)
    bubbleTime := time.Since(start)

    quickData := make([]int, len(data))
    copy(quickData, data)
    start = time.Now()
    quickSort(quickData)
    quickTime := time.Since(start)

    fmt.Printf("Bubble Sort time: %.6f seconds\n", bubbleTime.Seconds())
    fmt.Printf("Quick Sort time: %.6f seconds\n", quickTime.Seconds())
}

This code generates 1000 random integers and times both sorting methods. The
bubbleSort function modifies the slice in place, while
quickSort returns a new sorted slice using recursion.

Quick Sort partitions the data around a pivot, recursively sorting sublists,
making it more efficient. The benchmark typically shows Bubble Sort taking
significantly longer—often by a factor of 10 or more.

Understanding these differences helps developers choose the right algorithm
for their needs, balancing simplicity against performance in real-world Go
applications.

## Source

[Go sort package documentation](https://pkg.go.dev/sort)

This tutorial covered Bubble Sort in Go, with examples for numbers and text,
plus a performance comparison to Quick Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).