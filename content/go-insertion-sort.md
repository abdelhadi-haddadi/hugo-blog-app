+++
title = "Go Insertion Sort"
date = 2025-08-29T19:55:22.394+01:00
draft = false
description = "Learn how to implement the insertion sort algorithm in Go. Includes examples of sorting arrays."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Insertion Sort

last modified March 8, 2025

This tutorial explains the Insertion Sort algorithm in Go, showing its use for
numeric and textual data in ascending and descending order, with a benchmark
against Quick Sort.

An algorithm is a precise set of steps designed to solve a problem
or complete a task efficiently. It's a core concept in programming, enabling
data processing and automation.

Sorting involves arranging data into a defined order, like
ascending or descending. It's crucial for optimizing data retrieval and
supporting analysis tasks.

## Common Sorting Algorithms

Here are some notable sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Insertion Sort

Insertion Sort is a straightforward algorithm that builds a sorted
array incrementally, one element at a time. It's highly efficient for small or
nearly sorted datasets.

With a time complexity of O(n²), it becomes inefficient for large datasets,
but its simplicity and in-place operation make it valuable for specific use
cases like online sorting.

### Insertion Sort Example

Here's a Go implementation of Insertion Sort for numbers and strings.

insertion_sort.go
  

package main

import "fmt"

func insertionSort(arr []int) {

    for i := 1; i &lt; len(arr); i++ {
        key := arr[i]
        j := i - 1
        for j &gt;= 0 &amp;&amp; arr[j] &gt; key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

func insertionSortStrings(arr []string) {

    for i := 1; i &lt; len(arr); i++ {

        key := arr[i]
        j := i - 1
        for j &gt;= 0 &amp;&amp; arr[j] &gt; key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

func insertionSortDesc(arr []int) {

    for i := 1; i &lt; len(arr); i++ {

        key := arr[i]
        j := i - 1
        for j &gt;= 0 &amp;&amp; arr[j] &lt; key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

func insertionSortStringsDesc(arr []string) {
    for i := 1; i &lt; len(arr); i++ {
        key := arr[i]
        j := i - 1
        for j &gt;= 0 &amp;&amp; arr[j] &lt; key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

func main() {
    numbers := []int{12, 11, 13, 5, 6}
    words := []string{"apple", "banana", "cherry", "date"}
    
    insertionSort(numbers)
    fmt.Println("Sorted numbers (ascending):", numbers)
    
    insertionSortStrings(words)
    fmt.Println("Sorted words (ascending):", words)
    
    insertionSortDesc(numbers)
    fmt.Println("Sorted numbers (descending):", numbers)
    
    insertionSortStringsDesc(words)
    fmt.Println("Sorted words (descending):", words)
}

The insertionSort and insertionSortStrings functions
sort integers and strings in ascending order, while
insertionSortDesc and insertionSortStringsDesc sort
in descending order.

Each function works in place, shifting elements to insert the current key into
its correct position. This showcases Go's type-specific approach, handling
both numeric and textual data efficiently.

$ go run insertion_sort.go
Sorted numbers (ascending): [5 6 11 12 13]
Sorted words (ascending): [apple banana cherry date]
Sorted numbers (descending): [13 12 11 6 5]
Sorted words (descending): [date cherry banana apple]

### Explanation

Insertion Sort iterates through the array, treating the first element as
sorted. For each subsequent element, it shifts larger (or smaller, for
descending) elements rightward.

func insertionSort(arr []int) {

    for i := 1; i &lt; len(arr); i++ {
        key := arr[i]
        j := i - 1
    
        for j &gt;= 0 &amp;&amp; arr[j] &gt; key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

The insertionSort function sorts in ascending order by comparing
each key with prior elements, shifting as needed until the key fits.

func insertionSortDesc(arr []int) {

    for i := 1; i &lt; len(arr); i++ {
        key := arr[i]
        j := i - 1
        for j &gt;= 0 &amp;&amp; arr[j] &lt; key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
}

The insertionSortDesc function reverses the comparison to sort in
descending order, shifting smaller elements to make room for the key.

## Comparing Insertion Sort with Quick Sort

Insertion Sort's O(n²) complexity suits small or partially sorted data, while
Quick Sort's average O(n log n) efficiency excels with larger datasets. This
benchmark highlights their differences in Go.

benchmark.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func insertionSort(arr []int) {

    for i := 1; i &lt; len(arr); i++ {
        key := arr[i]
        j := i - 1
        for j &gt;= 0 &amp;&amp; arr[j] &gt; key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
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

    insertData := make([]int, len(data))
    copy(insertData, data)
    start := time.Now()
    insertionSort(insertData)
    insertTime := time.Since(start)

    quickData := make([]int, len(data))
    copy(quickData, data)
    start = time.Now()
    quickSort(quickData)
    quickTime := time.Since(start)

    fmt.Printf("Insertion Sort Time: %.6f seconds\n", insertTime.Seconds())
    fmt.Printf("Quick Sort Time: %.6f seconds\n", quickTime.Seconds())
}

This benchmark tests both algorithms on 1,000 random integers. Insertion Sort
modifies the array in place, while Quick Sort creates new slices via
recursion and partitioning.

Quick Sort typically outperforms Insertion Sort significantly on larger
datasets due to its logarithmic scaling. Insertion Sort's advantage lies in
its simplicity and performance on small or nearly sorted data.

## Source

[Go sort package documentation](https://pkg.go.dev/sort)

This tutorial explained Insertion Sort in Go, with examples for numbers and
text, and a benchmark against Quick Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).