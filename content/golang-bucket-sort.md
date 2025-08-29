+++
title = "Golang Bucket Sort"
date = 2025-08-29T19:55:01.763+01:00
draft = false
description = "Learn how to implement bucket sort in Go. Includes examples of sorting algorithms."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Golang Bucket Sort

last modified March 9, 2025

This tutorial dives into the bucket sort algorithm in Golang. We'll explore
sorting numbers and text in ascending and descending order, and compare it with
quick sort using benchmarks.

An algorithm is a structured set of steps to solve a problem or
complete a task. It's a cornerstone of programming and computer science.

Sorting organizes data into a specific sequence, like ascending or
descending. It's vital for efficient data handling and analysis in programs.

## Common Sorting Algorithms

Here are some popular sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Bucket Sort

## Bucket Sort Algorithm

Bucket sort is a distribution-based sorting method. It divides elements into
“buckets,” sorts each bucket individually, and then combines them. It shines
when data is evenly spread across a range.

Unlike comparison-based sorts, it relies on distributing data, making it fast
for uniform distributions but less effective otherwise.

## Bucket Sort Example: Numeric Data

Here's a Golang implementation of bucket sort for numbers in ascending order.

bucket_sort_numeric.go
  

package main

import (
    "fmt"
    "sort"
)

func bucketSort(arr []float64) []float64 {

    if len(arr) == 0 {
        return arr
    }

    maxVal := arr[0]

    for _, val := range arr {
        if val &gt; maxVal {
            maxVal = val
        }
    }

    bucketSize := maxVal / float64(len(arr))
    buckets := make([][]float64, len(arr))

    for i := range buckets {
        buckets[i] = []float64{}
    }

    for _, num := range arr {

        idx := int(num / bucketSize)
        if idx &gt;= len(arr) {
            idx = len(arr) - 1
        }
        buckets[idx] = append(buckets[idx], num)
    }

    for i := range buckets {
        sort.Float64s(buckets[i])
    }

    result := []float64{}

    for _, bucket := range buckets {
        result = append(result, bucket...)
    }

    return result
}

func main() {

    arr := []float64{0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51}
    sorted := bucketSort(arr)
    fmt.Println("Sorted array:", sorted)
}

This sorts a slice of floating-point numbers using bucket sort. It uses Go's
sort.Float64s to sort each bucket.

$ go run bucket_sort_numeric.go
Sorted array: [0.32 0.33 0.37 0.42 0.47 0.51 0.52]

## Bucket Sort Example: Textual Data

Here's an example sorting strings by length in descending order using bucket sort.

bucket_sort_textual.go
  

package main

import (
    "fmt"
    "sort"
)

func bucketSortTextual(arr []string) []string {

    if len(arr) == 0 {
        return arr
    }

    maxLen := 0
    for _, s := range arr {
        if len(s) &gt; maxLen {
            maxLen = len(s)
        }
    }

    buckets := make([][]string, maxLen+1)
    for i := range buckets {
        buckets[i] = []string{}
    }

    for _, s := range arr {
        buckets[len(s)] = append(buckets[len(s)], s)
    }

    for i := range buckets {
        sort.Sort(sort.Reverse(sort.StringSlice(buckets[i])))
    }

    result := []string{}
    for i := len(buckets) - 1; i &gt;= 0; i-- {
        result = append(result, buckets[i]...)
    }

    return result
}

func main() {

    arr := []string{"apple", "banana", "kiwi", "mango", "pear"}
    sorted := bucketSortTextual(arr)
    fmt.Println("Sorted array:", sorted)
}

This sorts strings by length in descending order, with alphabetical reverse
order within each bucket using sort.Reverse.

$ go run bucket_sort_textual.go
Sorted array: [banana mango apple pear kiwi]

## Comparing Bucket Sort with Quick Sort

Bucket sort excels with uniformly distributed data, running in O(n + k) time
where k is the number of buckets. Quick sort, averaging O(n log n), is more
versatile for general cases.

### Benchmark Example

This compares bucket sort and quick sort performance on a large dataset.

benchmark.go
  

package main

import (
    "fmt"
    "math/rand"
    "sort"
    "time"
)

func bucketSort(arr []float64) []float64 {

    if len(arr) == 0 {
        return arr
    }

    maxVal := arr[0]
    for _, val := range arr {
        if val &gt; maxVal {
            maxVal = val
        }
    }

    bucketSize := maxVal / float64(len(arr))
    buckets := make([][]float64, len(arr))

    for i := range buckets {
        buckets[i] = []float64{}
    }

    for _, num := range arr {

        idx := int(num / bucketSize)
        if idx &gt;= len(arr) {
            idx = len(arr) - 1
        }

        buckets[idx] = append(buckets[idx], num)
    }

    for i := range buckets {
        sort.Float64s(buckets[i])
    }

    result := []float64{}
    for _, bucket := range buckets {
        result = append(result, bucket...)
    }

    return result
}

func quickSort(arr []float64) []float64 {

    if len(arr) &lt;= 1 {
        return arr
    }

    pivot := arr[len(arr)/2]
    left, middle, right := []float64{}, []float64{}, []float64{}
    
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
    arr := make([]float64, 10000)
    
    for i := range arr {
        arr[i] = rand.Float64() * 1000
    }

    start := time.Now()
    bucketSort(append([]float64{}, arr...))
    fmt.Printf("Bucket Sort Time: %.6f seconds\n", time.Since(start).Seconds())

    start = time.Now()
    quickSort(append([]float64{}, arr...))
    fmt.Printf("Quick Sort Time: %.6f seconds\n", time.Since(start).Seconds())
}

This benchmarks both algorithms on 10,000 random floats. Bucket sort may edge
out on uniform data, but quick sort is more consistent overall.

## Source

[Golang Official Documentation](https://golang.org/doc/)

We've covered bucket sort in Golang and compared it with quick sort. It's great
for uniform data, while quick sort is a robust all-purpose choice.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).