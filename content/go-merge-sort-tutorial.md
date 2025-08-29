+++
title = "Go Merge Sort Tutorial"
date = 2025-08-29T19:55:30.235+01:00
draft = false
description = "Learn how to implement merge sort in Go. Includes examples and performance analysis."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Merge Sort Tutorial

last modified March 8, 2025

This tutorial explores the Merge Sort algorithm in Go, demonstrating its use
for sorting numeric and textual data in ascending and descending order, with a
benchmark against Quick Sort.

An algorithm is a structured sequence of steps crafted to solve a
problem or perform a task efficiently. It's a cornerstone of programming,
driving computational solutions.

Sorting means organizing data into a specific sequence, such as
ascending or descending. It's vital for enhancing data retrieval and analysis
in various applications.

## Common Sorting Algorithms

Here are some well-known sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Heap Sort

## Merge Sort Algorithm

Merge Sort is a divide-and-conquer algorithm that splits an array into two
halves, recursively sorts each half, and then merges them back together in
sorted order.

With a consistent time complexity of O(n log n), Merge Sort is stable and
efficient, though it requires extra space for merging. It excels with linked
lists and large datasets.

## Merge Sort Example

Below is a Go implementation of Merge Sort for numbers and strings.

merge_sort.go
  

package main

import "fmt"

func mergeSort(arr []int) []int {
    if len(arr) &lt;= 1 {
        return arr
    }
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    return merge(left, right)
}

func merge(left, right []int) []int {
    result := make([]int, 0, len(left)+len(right))
    i, j := 0, 0
    for i &lt; len(left) &amp;&amp; j &lt; len(right) {
        if left[i] &lt; right[j] {
            result = append(result, left[i])
            i++
        } else {
            result = append(result, right[j])
            j++
        }
    }
    result = append(result, left[i:]...)
    result = append(result, right[j:]...)
    return result
}

func mergeSortStrings(arr []string) []string {
    if len(arr) &lt;= 1 {
        return arr
    }
    mid := len(arr) / 2
    left := mergeSortStrings(arr[:mid])
    right := mergeSortStrings(arr[mid:])
    return mergeStrings(left, right)
}

func mergeStrings(left, right []string) []string {
    result := make([]string, 0, len(left)+len(right))
    i, j := 0, 0
    for i &lt; len(left) &amp;&amp; j &lt; len(right) {
        if left[i] &lt; right[j] {
            result = append(result, left[i])
            i++
        } else {
            result = append(result, right[j])
            j++
        }
    }
    result = append(result, left[i:]...)
    result = append(result, right[j:]...)
    return result
}

func sortDescending(arr []int) []int {
    sorted := mergeSort(arr)
    for i, j := 0, len(sorted)-1; i &lt; j; i, j = i+1, j-1 {
        sorted[i], sorted[j] = sorted[j], sorted[i]
    }
    return sorted
}

func sortStringsDescending(arr []string) []string {
    sorted := mergeSortStrings(arr)
    for i, j := 0, len(sorted)-1; i &lt; j; i, j = i+1, j-1 {
        sorted[i], sorted[j] = sorted[j], sorted[i]
    }
    return sorted
}

func main() {
    numbers := []int{38, 27, 43, 3, 9, 82, 10}
    words := []string{"apple", "banana", "cherry", "date", "elderberry"}
    fmt.Println("Sorted numbers (ascending):", mergeSort(numbers))
    fmt.Println("Sorted numbers (descending):", sortDescending(numbers))
    fmt.Println("Sorted words (ascending):", mergeSortStrings(words))
    fmt.Println("Sorted words (descending):", sortStringsDescending(words))
}

The mergeSort function recursively splits and merges integer
slices, while mergeSortStrings does the same for strings. The
merge helper combines sorted halves.

For descending order, sortDescending and
sortStringsDescending reverse the ascending result. This approach
leverages Go's slice operations for clarity and efficiency.

$ go run merge_sort.go
Sorted numbers (ascending): [3 9 10 27 38 43 82]
Sorted numbers (descending): [82 43 38 27 10 9 3]
Sorted words (ascending): [apple banana cherry date elderberry]
Sorted words (descending): [elderberry date cherry banana apple]

## Comparing Merge Sort with Quick Sort

Merge Sort guarantees O(n log n) time complexity and stability, making it
reliable. Quick Sort averages O(n log n) but can degrade to O(n²) in worst-case
scenarios, like sorted data.

This benchmark compares their performance on a large dataset in Go.

benchmark.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func mergeSort(arr []int) []int {
    if len(arr) &lt;= 1 {
        return arr
    }
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    return merge(left, right)
}

func merge(left, right []int) []int {
    result := make([]int, 0, len(left)+len(right))
    i, j := 0, 0
    for i &lt; len(left) &amp;&amp; j &lt; len(right) {
        if left[i] &lt; right[j] {
            result = append(result, left[i])
            i++
        } else {
            result = append(result, right[j])
            j++
        }
    }
    result = append(result, left[i:]...)
    result = append(result, right[j:]...)
    return result
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
    numbers := make([]int, 10000)
    for i := range numbers {
        numbers[i] = rand.Intn(10000)
    }

    mergeData := make([]int, len(numbers))
    copy(mergeData, numbers)
    start := time.Now()
    mergeSort(mergeData)
    mergeTime := time.Since(start)

    quickData := make([]int, len(numbers))
    copy(quickData, numbers)
    start = time.Now()
    quickSort(quickData)
    quickTime := time.Since(start)

    fmt.Printf("Merge Sort Time: %.6f seconds\n", mergeTime.Seconds())
    fmt.Printf("Quick Sort Time: %.6f seconds\n", quickTime.Seconds())
}

This benchmark tests Merge Sort and Quick Sort on 10,000 random integers.
Merge Sort creates new slices during merging, while Quick Sort partitions in a
similar recursive manner.

Merge Sort's predictable performance contrasts with Quick Sort's potential
speed advantage due to better cache locality. Actual results vary, but Merge
Sort ensures consistency.

## Source

[Go sort package documentation](https://pkg.go.dev/sort)

This tutorial explained Merge Sort in Go, with examples for numbers and text,
and a benchmark against Quick Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).