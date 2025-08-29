+++
title = "Go Shell Sort Algorithm"
date = 2025-08-29T19:55:51.524+01:00
draft = false
description = "Learn how to implement shell sort in Go. Includes examples and explanations of the algorithm."
image = ""
imageBig = ""
categories = ["golang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Go Shell Sort Algorithm

last modified March 8, 2025

This tutorial explains the Shell Sort algorithm in Go, demonstrating its use
for sorting numeric and textual data in ascending and descending order, with a
benchmark against Quick Sort.

An algorithm is a well-defined series of steps crafted to solve a
problem or execute a task efficiently. It forms the backbone of programming,
enabling systematic solutions.

Sorting is the act of arranging data into a specific sequence, such
as ascending or descending. It’s crucial for optimizing data access and
analysis in various applications.

## Common Sorting Algorithms

Here are some widely used sorting algorithms:

- Bubble Sort

- Selection Sort

- Insertion Sort

- Merge Sort

- Quick Sort

- Shell Sort

## Shell Sort Algorithm

Shell Sort enhances Insertion Sort by comparing and sorting elements at
specific intervals, or gaps, rather than adjacent ones. It starts with large
gaps and reduces them over iterations.

This approach minimizes the number of shifts needed, making it more efficient
than plain Insertion Sort. Its time complexity varies between O(n log n) and
O(n²), depending on the gap sequence.

## Shell Sort Example

Here’s a Go implementation of Shell Sort for numeric data.

shell_sort.go
  

package main

import "fmt"

func shellSort(arr []int) {
    n := len(arr)
    gap := n / 2

    for gap &gt; 0 {
        for i := gap; i &lt; n; i++ {
            temp := arr[i]
            j := i
            for j &gt;= gap &amp;&amp; arr[j-gap] &gt; temp {
                arr[j] = arr[j-gap]
                j -= gap
            }
            arr[j] = temp
        }
        gap /= 2
    }
}

func main() {
    nums := []int{12, 34, 54, 2, 3}
    shellSort(nums)
    fmt.Println("Sorted array:", nums)
}

The shellSort function sorts an integer slice in ascending order.
It begins with a gap of half the array length, shrinking it by half each
iteration.

Within each gap, it performs an insertion-like sort, shifting larger elements
rightward. This example sorts a small array, showing the algorithm’s basic
operation in Go.

$ go run shell_sort.go
Sorted array: [2 3 12 34 54]

## Sorting Textual Data

Shell Sort can also sort strings. Below is an example for ascending and
descending order in Go.

shell_sort_text.go
  

package main

import "fmt"

func shellSort(arr []string, reverse bool) {
    n := len(arr)
    gap := n / 2

    for gap &gt; 0 {
        for i := gap; i &lt; n; i++ {
            temp := arr[i]
            j := i
            if reverse {
                for j &gt;= gap &amp;&amp; arr[j-gap] &lt; temp {
                    arr[j] = arr[j-gap]
                    j -= gap
                }
            } else {
                for j &gt;= gap &amp;&amp; arr[j-gap] &gt; temp {
                    arr[j] = arr[j-gap]
                    j -= gap
                }
            }
            arr[j] = temp
        }
        gap /= 2
    }
}

func main() {
    words := []string{"apple", "banana", "cherry", "date", "elderberry"}
    shellSort(words, false)
    fmt.Println("Ascending order:", words)

    shellSort(words, true)
    fmt.Println("Descending order:", words)
}

The shellSort function now takes a reverse boolean to
toggle sorting direction. For ascending, it shifts larger strings; for
descending, smaller ones.

This sorts the string slice in place, making it versatile for text data like
names or categories in Go programs, with the gap-based approach improving
efficiency.

$ go run shell_sort_text.go
Ascending order: [apple banana cherry date elderberry]
Descending order: [elderberry date cherry banana apple]

## Comparing Shell Sort with Quick Sort

Shell Sort offers good performance for medium-sized data, but Quick Sort’s
average O(n log n) complexity often makes it faster for large datasets. This
benchmark compares them in Go.

compare_sorts.go
  

package main

import (
    "fmt"
    "math/rand"
    "time"
)

func shellSort(arr []int) {
    n := len(arr)
    gap := n / 2

    for gap &gt; 0 {
        for i := gap; i &lt; n; i++ {
            temp := arr[i]
            j := i
            for j &gt;= gap &amp;&amp; arr[j-gap] &gt; temp {
                arr[j] = arr[j-gap]
                j -= gap
            }
            arr[j] = temp
        }
        gap /= 2
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
    data := make([]int, 10000)
    for i := range data {
        data[i] = rand.Intn(1000)
    }

    shellData := make([]int, len(data))
    copy(shellData, data)
    start := time.Now()
    shellSort(shellData)
    shellTime := time.Since(start)

    quickData := make([]int, len(data))
    copy(quickData, data)
    start = time.Now()
    quickSort(quickData)
    quickTime := time.Since(start)

    fmt.Printf("Shell Sort time: %.6f seconds\n", shellTime.Seconds())
    fmt.Printf("Quick Sort time: %.6f seconds\n", quickTime.Seconds())
}

This benchmark tests both algorithms on 10,000 random integers. Shell Sort
modifies the array in place using gaps, while Quick Sort creates new slices
via recursion.

Quick Sort typically outperforms Shell Sort on large datasets due to its
divide-and-conquer efficiency. Shell Sort shines with smaller or partially
sorted data, offering a practical tradeoff.

Understanding these differences aids in selecting the best algorithm for
specific use cases in Go, balancing simplicity and speed.

## Source

[Go sort package documentation](https://pkg.go.dev/sort)

This tutorial covered Shell Sort in Go, with examples for numbers and text,
plus a performance comparison to Quick Sort.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Go tutorials](/golang/).