+++
title = "Go Radix Sort"
date = 2025-08-29T19:55:34.686+01:00
draft = false
description = "Learn how to implement radix sort in Go. Includes examples and explanations of the algorithm."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Radix Sort

last modified March 8, 2025

This tutorial implements and explains the Radix Sort algorithm in Go, focusing
on sorting numeric and textual data efficiently.

An algorithm is a precise sequence of steps crafted to solve a
problem or execute a task. It's a core concept in programming, driving
computational solutions.

Sorting involves arranging data into a defined order, like ascending
or descending. It enhances data access speed and supports analysis in
applications like search engines.

## Common Sorting Algorithms

Here are some notable sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Radix Sort

## Radix Sort

Radix Sort is a non-comparative algorithm that sorts by processing
each digit or character of the data, from least to most significant. It excels
with integers and fixed-length strings.

Unlike comparison-based sorts like Quick Sort, Radix Sort uses counting to
distribute elements into buckets, offering linear time complexity under
specific conditions.

## Radix Sort Example

Here's a Go implementation of Radix Sort for integers.

radix_sort.go
  

package main

import "fmt"

func countingSort(arr []int, exp int) {
    n := len(arr)
    output := make([]int, n)
    count := make([]int, 10)

    for i := 0; i &lt; n; i++ {
        index := arr[i] / exp
        count[index%10]++
    }

    for i := 1; i &lt; 10; i++ {
        count[i] += count[i-1]
    }

    for i := n - 1; i &gt;= 0; i-- {
        index := arr[i] / exp
        output[count[index%10]-1] = arr[i]
        count[index%10]--
    }

    for i := 0; i &lt; n; i++ {
        arr[i] = output[i]
    }
}

func radixSort(arr []int) {
    maxNum := arr[0]
    for _, num := range arr {
        if num &gt; maxNum {
            maxNum = num
        }
    }
    for exp := 1; maxNum/exp &gt; 0; exp *= 10 {
        countingSort(arr, exp)
    }
}

func main() {
    arr := []int{170, 45, 75, 90, 802, 24, 2, 66}
    radixSort(arr)
    fmt.Println("Sorted array:", arr)
}

This code uses countingSort as a helper to sort by each digit,
starting from the least significant. The exp variable tracks the
current digit place (1, 10, 100, etc.).

The radixSort function finds the maximum number to determine how
many digits to process. It modifies the array in place, sorting it in ascending
order efficiently.

$ go run radix_sort.go
Sorted array: [2 24 45 66 75 90 170 802]

## Sorting Textual Data

Radix Sort can sort strings too. Below is an example sorting strings in both
ascending and descending order.

radix_sort_strings.go
  

package main

import "fmt"

func countingSortStrings(arr []string, index int) {
    n := len(arr)
    output := make([]string, n)
    count := make([]int, 256)

    for i := 0; i &lt; n; i++ {
        char := byte(0)
        if index &lt; len(arr[i]) {
            char = arr[i][index]
        }
        count[char]++
    }

    for i := 1; i &lt; 256; i++ {
        count[i] += count[i-1]
    }

    for i := n - 1; i &gt;= 0; i-- {
        char := byte(0)
        if index &lt; len(arr[i]) {
            char = arr[i][index]
        }
        output[count[char]-1] = arr[i]
        count[char]--
    }

    for i := 0; i &lt; n; i++ {
        arr[i] = output[i]
    }
}

func radixSortStrings(arr []string, reverse bool) {
    maxLen := 0
    for _, s := range arr {
        if len(s) &gt; maxLen {
            maxLen = len(s)
        }
    }
    for i := maxLen - 1; i &gt;= 0; i-- {
        countingSortStrings(arr, i)
    }
    if reverse {
        for i, j := 0, len(arr)-1; i &lt; j; i, j = i+1, j-1 {
            arr[i], arr[j] = arr[j], arr[i]
        }
    }
}

func main() {
    arr := []string{"apple", "banana", "kiwi", "mango", "cherry"}
    radixSortStrings(arr, false)
    fmt.Println("Ascending order:", arr)

    radixSortStrings(arr, true)
    fmt.Println("Descending order:", arr)
}

The countingSortStrings function sorts based on a specific
character position, using a 256-slot count array for ASCII characters. It pads
shorter strings with null bytes implicitly.

The radixSortStrings function processes characters from right to
left, ensuring correct lexicographical order. The reverse flag
swaps elements for descending order after sorting.

This is practical for sorting names, IDs, or tags in Go applications requiring
textual data organization.

$ go run radix_sort_strings.go
Ascending order: [apple banana cherry kiwi mango]
Descending order: [mango kiwi cherry banana apple]

## Radix Sort vs Quick Sort

Radix Sort shines with fixed-size data like integers or strings, boasting a
time complexity of O(nk), where k is the number of digits or characters. Quick
Sort, with O(n log n) average complexity, is more versatile.

The benchmark below compares their performance on a large integer dataset in
Go, highlighting their strengths.

radix_vs_quick.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func countingSort(arr []int, exp int) {
    n := len(arr)
    output := make([]int, n)
    count := make([]int, 10)

    for i := 0; i &lt; n; i++ {
        index := arr[i] / exp
        count[index%10]++
    }

    for i := 1; i &lt; 10; i++ {
        count[i] += count[i-1]
    }

    for i := n - 1; i &gt;= 0; i-- {
        index := arr[i] / exp
        output[count[index%10]-1] = arr[i]
        count[index%10]--
    }

    for i := 0; i &lt; n; i++ {
        arr[i] = output[i]
    }
}

func radixSort(arr []int) {
    maxNum := arr[0]
    for _, num := range arr {
        if num &gt; maxNum {
            maxNum = num
        }
    }
    for exp := 1; maxNum/exp &gt; 0; exp *= 10 {
        countingSort(arr, exp)
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
    arr := make([]int, 10000)
    for i := range arr {
        arr[i] = rand.Intn(10000)
    }

    radixData := make([]int, len(arr))
    copy(radixData, arr)
    start := time.Now()
    radixSort(radixData)
    radixTime := time.Since(start)

    quickData := make([]int, len(arr))
    copy(quickData, arr)
    start = time.Now()
    quickSort(quickData)
    quickTime := time.Since(start)

    fmt.Printf("Radix Sort time: %.6f seconds\n", radixTime.Seconds())
    fmt.Printf("Quick Sort time: %.6f seconds\n", quickTime.Seconds())
}

This benchmark creates 10,000 random integers. radixSort sorts in
place using digit-based counting, while quickSort recursively
partitions the data, returning a new slice.

Radix Sort often outperforms Quick Sort for integers with a small range of
digits, but Quick Sort adapts better to varied data types. Results vary, but
Radix Sort typically edges out on this dataset.

## Source

[Go sort package documentation](https://pkg.go.dev/sort)

This tutorial implemented Radix Sort in Go, covering numbers and strings, with
a comparison to Quick Sort for performance insights.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).