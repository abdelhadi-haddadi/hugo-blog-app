+++
title = "Golang Selection Sort"
date = 2025-08-29T19:55:51.521+01:00
draft = false
description = "Learn how to implement selection sort in Go. Includes examples and explanations of the algorithm."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Selection Sort

last modified March 9, 2025

This article explores the selection sort algorithm in Golang. We'll define it,
show examples for sorting numbers and strings, and compare it with quick sort.

An algorithm is a clear, step-by-step process to solve a problem or
complete a task. It's a core concept in programming, guiding how code works.

Sorting organizes data into a specific order, like ascending or
descending. It's a key skill in computer science for managing and accessing data.

## Common Sorting Algorithms

Here are some widely used sorting algorithms:

- Selection Sort

- Bubble Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Selection Sort Algorithm

The selection sort algorithm repeatedly scans the unsorted part of a
list to find the smallest (or largest) element. It then swaps this element with
the first unsorted position. This repeats until the list is fully sorted.

It's simple to understand and implement, but not the fastest for large datasets.

## Selection Sort Example

Below is a Golang implementation of selection sort. It works with slices and can
sort in ascending or descending order.

selection_sort.go
  

package main

import "fmt"

func selectionSort(arr []interface{}, ascending bool) []interface{} {
    n := len(arr)
    for i := 0; i &lt; n; i++ {
        idx := i
        for j := i + 1; j &lt; n; j++ {
            less := compare(arr[j], arr[idx]) &lt; 0
            if (ascending &amp;&amp; less) || (!ascending &amp;&amp; !less) {
                idx = j
            }
        }
        arr[i], arr[idx] = arr[idx], arr[i]
    }
    return arr
}

func compare(a, b interface{}) int {
    switch a.(type) {
    case int:
        return a.(int) - b.(int)
    case string:
        if a.(string) &lt; b.(string) {
            return -1
        } else if a.(string) &gt; b.(string) {
            return 1
        }
        return 0
    }
    return 0
}

func main() {
    // Sorting numeric data
    numbers := []interface{}{64, 25, 12, 22, 11}
    fmt.Println("Ascending:", selectionSort(numbers, true))
    fmt.Println("Descending:", selectionSort(numbers, false))

    // Sorting textual data
    words := []interface{}{"apple", "banana", "kiwi", "cherry"}
    fmt.Println("Ascending:", selectionSort(words, true))
    fmt.Println("Descending:", selectionSort(words, false))
}

The selectionSort function takes a slice of interface{}
and a boolean for sort direction. It uses a helper compare function
to handle different data types like integers and strings.

$ go run selection_sort.go
Ascending: [11 12 22 25 64]
Descending: [64 25 22 12 11]
Ascending: [apple banana cherry kiwi]
Descending: [kiwi cherry banana apple]

## Comparing Selection Sort with Quick Sort

Selection sort is easy to code but slow for big lists, with a time complexity of
O(n²). Quick sort, using a divide-and-conquer strategy, is faster at O(n log n)
on average. Let's benchmark them.

benchmark.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func selectionSort(arr []int) []int {
    n := len(arr)
    for i := 0; i &lt; n; i++ {
        idx := i
        for j := i + 1; j &lt; n; j++ {
            if arr[j] &lt; arr[idx] {
                idx = j
            }
        }
        arr[i], arr[idx] = arr[idx], arr[i]
    }
    return arr
}

func quickSort(arr []int) []int {
    if len(arr) &lt;= 1 {
        return arr
    }
    pivot := arr[len(arr)/2]
    left, middle, right := []int{}, []int{}, []int{}
    for _, x := range arr {
        if x &lt; pivot {
            left = append(left, x)
        } else if x == pivot {
            middle = append(middle, x)
        } else {
            right = append(right, x)
        }
    }
    return append(append(quickSort(left), middle...), quickSort(right)...)
}

func main() {
    rand.Seed(time.Now().UnixNano())
    data := make([]int, 1000)
    for i := range data {
        data[i] = rand.Intn(1000)
    }

    // Benchmark selection sort
    start := time.Now()
    selectionSort(append([]int{}, data...))
    fmt.Printf("Selection Sort Time: %.6f seconds\n", time.Since(start).Seconds())

    // Benchmark quick sort
    start = time.Now()
    quickSort(append([]int{}, data...))
    fmt.Printf("Quick Sort Time: %.6f seconds\n", time.Since(start).Seconds())
}

This benchmarks selection sort and quick sort on 1000 random integers. Quick
sort typically finishes much faster due to its efficient design.

## Source

[Golang Official Documentation](https://golang.org/doc/)

This tutorial covered selection sort in Golang and compared it with quick sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).