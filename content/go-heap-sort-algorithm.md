+++
title = "Go Heap Sort Algorithm"
date = 2025-08-29T19:55:20.106+01:00
draft = false
description = "Learn how to implement the heap sort algorithm in Go. Includes examples of sorting arrays."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Heap Sort Algorithm

last modified March 8, 2025

This tutorial explains the Heap Sort algorithm in Go, covering sorting of
numeric and textual data in ascending and descending order, with a benchmark
against Quick Sort.

An algorithm is a precise sequence of steps designed to solve a
problem or complete a task efficiently. It's a fundamental building block of
programming logic.

Sorting involves arranging data into a specific order, like
ascending or descending. It's essential for optimizing data access and
processing in applications.

## Common Sorting Algorithms

Here are some widely recognized sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Heap Sort Algorithm

Heap Sort is a comparison-based algorithm that leverages a binary heap data
structure. It first builds a max-heap (for ascending order), then repeatedly
extracts the largest element.

With a consistent time complexity of O(n log n), Heap Sort is efficient and
stable for large datasets. It's particularly useful when memory usage must be
minimized, as it sorts in place.

## Heap Sort Example

Below is a Go implementation of Heap Sort for numeric data.

heap_sort.go
  

package main

import "fmt"

func heapify(arr []int, n, i int) {
    largest := i
    left := 2*i + 1
    right := 2*i + 2

    if left &lt; n &amp;&amp; arr[i] &lt; arr[left] {
        largest = left
    }

    if right &lt; n &amp;&amp; arr[largest] &lt; arr[right] {
        largest = right
    }

    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

func heapSort(arr []int) {
    n := len(arr)

    for i := n/2 - 1; i &gt;= 0; i-- {
        heapify(arr, n, i)
    }

    for i := n - 1; i &gt; 0; i-- {
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    }
}

func main() {
    arr := []int{12, 11, 13, 5, 6, 7}
    heapSort(arr)
    fmt.Println("Sorted array:", arr)
}

The heapify function ensures the max-heap property by comparing a
node with its children and swapping if needed. It's called recursively to
maintain the heap structure.

The heapSort function first builds a max-heap from the array, then
iteratively moves the largest element (root) to the end, reducing the heap size
and re-heapifying.

$ go run heap_sort.go
Sorted array: [5 6 7 11 12 13]

## Heap Sort for Textual Data

Heap Sort can sort strings too. Here's an example for ascending order in Go.

heap_sort_text.go
  

package main

import "fmt"

func heapify(arr []string, n, i int) {
    largest := i
    left := 2*i + 1
    right := 2*i + 2

    if left &gt; n &amp;&amp; arr[i] &gt; arr[left] {
        largest = left
    }

    if right &gt; n &amp;&amp; arr[largest] &gt; arr[right] {
        largest = right
    }

    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

func heapSort(arr []string) {
    n := len(arr)

    for i := n/2 - 1; i &gt;= 0; i-- {
        heapify(arr, n, i)
    }

    for i := n - 1; i &gt; 0; i-- {
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    }
}

func main() {
    arr := []string{"banana", "apple", "cherry", "date"}
    heapSort(arr)
    fmt.Println("Sorted array:", arr)
}

This version adapts heapify and heapSort for strings,
using Go's built-in string comparison. It sorts the slice in place, arranging
the strings alphabetically.

This is useful for tasks like sorting lists of names or tags in Go programs,
leveraging the same heap-based logic as with numbers.

$ go run heap_sort_text.go
Sorted array: [apple banana cherry date]

## Heap Sort in Descending Order

For descending order, we modify heapify to build a min-heap instead
of a max-heap.

heap_sort_desc.go
  

package main

import "fmt"

func heapify(arr []int, n, i int) {
    smallest := i
    left := 2*i + 1
    right := 2*i + 2

    if left &lt; n &amp;&amp; arr[i] &gt; arr[left] {
        smallest = left
    }

    if right &lt; n &amp;&amp; arr[smallest] &gt; arr[right] {
        smallest = right
    }

    if smallest != i {
        arr[i], arr[smallest] = arr[smallest], arr[i]
        heapify(arr, n, smallest)
    }
}

func heapSortDesc(arr []int) {
    n := len(arr)

    for i := n/2 - 1; i &gt;= 0; i-- {
        heapify(arr, n, i)
    }

    for i := n - 1; i &gt; 0; i-- {
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
    }
}

func main() {
    arr := []int{12, 11, 13, 5, 6, 7}
    heapSortDesc(arr)
    fmt.Println("Sorted array in descending order:", arr)
}

The heapify function now ensures a min-heap by selecting the
smallest value among the node and its children. heapSortDesc
builds and extracts from this min-heap.

This sorts the array in descending order, useful for ranking items from highest
to lowest, such as scores or priorities in Go applications.

$ go run heap_sort_desc.go
Sorted array in descending order: [13 12 11 7 6 5]

## Heap Sort vs Quick Sort

Heap Sort guarantees O(n log n) time complexity, making it predictable. Quick
Sort averages O(n log n) but can hit O(n²) in rare worst-case scenarios, like
nearly sorted data.

## Benchmarking Heap Sort and Quick Sort

This benchmark compares Heap Sort and Quick Sort on a random dataset in Go.

benchmark.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func heapify(arr []int, n, i int) {

    largest := i
    left := 2*i + 1
    right := 2*i + 2

    if left &lt; n &amp;&amp; arr[i] &lt; arr[left] {
        largest = left
    }

    if right &lt; n &amp;&amp; arr[largest] &lt; arr[right] {
        largest = right
    }

    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}

func heapSort(arr []int) {
    n := len(arr)

    for i := n/2 - 1; i &gt;= 0; i-- {
        heapify(arr, n, i)
    }

    for i := n - 1; i &gt; 0; i-- {
        arr[i], arr[0] = arr[0], arr[i]
        heapify(arr, i, 0)
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
    arr := make([]int, 1000)
    for i := range arr {
        arr[i] = rand.Intn(1000)
    }

    heapData := make([]int, len(arr))
    copy(heapData, arr)
    start := time.Now()
    heapSort(heapData)
    heapTime := time.Since(start)

    quickData := make([]int, len(arr))
    copy(quickData, arr)
    start = time.Now()
    quickSort(quickData)
    quickTime := time.Since(start)

    fmt.Printf("Heap Sort Time: %.6f seconds\n", heapTime.Seconds())
    fmt.Printf("Quick Sort Time: %.6f seconds\n", quickTime.Seconds())
}

This code benchmarks both algorithms on 1,000 random integers. Heap Sort sorts
in place using a max-heap, while Quick Sort builds new slices via partitioning.

Heap Sort's consistent O(n log n) performance contrasts with Quick Sort's
potential variability. Quick Sort often edges out slightly due to better cache
usage, but results depend on data patterns.

## Source

[Go sort package documentation](https://pkg.go.dev/sort)

This tutorial explained Heap Sort in Go, with examples for numbers and text,
and a benchmark against Quick Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).