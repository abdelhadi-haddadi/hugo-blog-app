+++
title = "Golang Counting Sort Algorithm"
date = 2025-08-29T19:55:07.310+01:00
draft = false
description = "Learn how to implement counting sort in Go. Includes examples and explanations."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Counting Sort Algorithm

last modified March 9, 2025

This tutorial explains the counting sort algorithm in Golang. We'll define it,
show examples for sorting numbers and text, and compare it with quick sort.

An algorithm is a clear, step-by-step method to solve a problem or
do a task. It's the foundation of how programs process and manage data.

Sorting arranges data in a specific order, like ascending or
descending. It's essential in computing for organizing and retrieving data.

## Common Sorting Algorithms

Here are some well-known sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Counting Sort

## Counting Sort Algorithm

Counting sort is a non-comparison-based sorting method. It counts how many times
each element appears in the input, then uses this count to place elements in
their correct sorted positions.

It's fast for small ranges of integers but requires extra memory for the count
array. Unlike comparison sorts, it doesn't compare elements directly.

### Counting Sort Example

Here's a Golang implementation of counting sort for integers.

counting_sort.go
  

package main

import "fmt"

func countingSort(arr []int) []int {
    if len(arr) == 0 {
        return arr
    }
    maxVal := arr[0]
    for _, num := range arr {
        if num &gt; maxVal {
            maxVal = num
        }
    }
    count := make([]int, maxVal+1)
    for _, num := range arr {
        count[num]++
    }
    sorted := []int{}
    for i := 0; i &lt; len(count); i++ {
        for count[i] &gt; 0 {
            sorted = append(sorted, i)
            count[i]--
        }
    }
    return sorted
}

func main() {
    arr := []int{4, 2, 2, 8, 3, 3, 1}
    sorted := countingSort(arr)
    fmt.Println("Sorted array:", sorted)
}

This code sorts an integer slice in ascending order using counting sort.

$ go run counting_sort.go
Sorted array: [1 2 2 3 3 4 8]

### Sorting Textual Data

Counting sort can also sort text, like a string's characters. Here's an example:

counting_sort_text.go
  

package main

import "fmt"

func countingSortText(text string) string {
    if len(text) == 0 {
        return text
    }
    maxVal := int(rune(text[0]))
    for _, char := range text {
        if int(char) &gt; maxVal {
            maxVal = int(char)
        }
    }
    count := make([]int, maxVal+1)
    for _, char := range text {
        count[int(char)]++
    }
    sorted := []rune{}
    for i := 0; i &lt; len(count); i++ {
        for count[i] &gt; 0 {
            sorted = append(sorted, rune(i))
            count[i]--
        }
    }
    return string(sorted)
}

func main() {
    text := "counting"
    sorted := countingSortText(text)
    fmt.Println("Sorted text:", sorted)
}

This sorts a string's characters in ascending order using counting sort.

$ go run counting_sort_text.go
Sorted text: cginnottu

### Sorting in Descending Order

To sort in descending order, we reverse the output loop in counting sort.

counting_sort_desc.go
  

package main

import "fmt"

func countingSortDesc(arr []int) []int {
    if len(arr) == 0 {
        return arr
    }
    maxVal := arr[0]
    for _, num := range arr {
        if num &gt; maxVal {
            maxVal = num
        }
    }
    count := make([]int, maxVal+1)
    for _, num := range arr {
        count[num]++
    }
    sorted := []int{}
    for i := len(count) - 1; i &gt;= 0; i-- {
        for count[i] &gt; 0 {
            sorted = append(sorted, i)
            count[i]--
        }
    }
    return sorted
}

func main() {
    arr := []int{4, 2, 2, 8, 3, 3, 1}
    sorted := countingSortDesc(arr)
    fmt.Println("Sorted array (descending):", sorted)
}

This sorts an integer slice in descending order.

$ go run counting_sort_desc.go
Sorted array (descending): [8 4 3 3 2 2 1]

## Comparison with Quick Sort

Counting sort excels with small integer ranges, running in O(n + k) time, where
k is the range of values. Quick sort, a comparison-based method, averages O(n
log n) and handles larger datasets better.

### Benchmark Example

This example compares counting sort and quick sort performance.

benchmark.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func countingSort(arr []int) []int {
    if len(arr) == 0 {
        return arr
    }
    maxVal := arr[0]
    for _, num := range arr {
        if num &gt; maxVal {
            maxVal = num
        }
    }
    count := make([]int, maxVal+1)
    for _, num := range arr {
        count[num]++
    }
    sorted := []int{}
    for i := 0; i &lt; len(count); i++ {
        for count[i] &gt; 0 {
            sorted = append(sorted, i)
            count[i]--
        }
    }
    return sorted
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
    data := make([]int, 10000)
    for i := range data {
        data[i] = rand.Intn(1000)
    }

    start := time.Now()
    countingSort(append([]int{}, data...))
    fmt.Printf("Counting sort time: %.6f seconds\n", time.Since(start).Seconds())

    start = time.Now()
    quickSort(append([]int{}, data...))
    fmt.Printf("Quick sort time: %.6f seconds\n", time.Since(start).Seconds())
}

This benchmarks both algorithms on 10,000 random integers. Counting sort may
win with small ranges, but quick sort scales better.

## Source

[Golang Official Documentation](https://golang.org/doc/)

We've explored counting sort in Golang and compared it with quick sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).