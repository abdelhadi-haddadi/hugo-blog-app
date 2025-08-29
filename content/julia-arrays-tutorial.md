+++
title = "Julia Arrays Tutorial"
date = 2025-08-29T20:02:18.278+01:00
draft = false
description = "Julia tutorial on arrays, covering basic and advanced usage with practical examples."
image = ""
imageBig = ""
categories = ["julia"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Julia Arrays Tutorial

last modified March 3, 2025

Arrays in Julia are collections of elements, all of the same type, stored in a
contiguous block of memory. They are one of the most versatile and commonly used
data structures in Julia. This tutorial covers basic and advanced usage of arrays
with practical examples.

Arrays can be one-dimensional (vectors), two-dimensional (matrices), or
multi-dimensional. They are mutable, meaning their contents can be modified
after creation.

## Creating Arrays

This example demonstrates how to create a simple one-dimensional array.

main.jl
  

arr = [1, 2, 3, 4, 5]

The array arr contains the integers 1 through 5.

## Accessing Array Elements

This example shows how to access elements in an array using indices.

main.jl
  

arr = [10, 20, 30, 40, 50]
println(arr[3])  # Output: 30

Arrays in Julia are 1-indexed, so arr[3] accesses the third element.

## Modifying Array Elements

This example demonstrates how to modify an element in an array.

main.jl
  

arr = [1, 2, 3, 4, 5]
arr[2] = 99
println(arr)  # Output: [1, 99, 3, 4, 5]

The second element of arr is changed to 99.

## Creating a 2D Array

This example shows how to create a two-dimensional array (matrix).

main.jl
  

matrix = [1 2 3; 4 5 6; 7 8 9]

The matrix is a 3x3 array with elements arranged in rows and columns.

## Array Slicing

This example demonstrates how to slice an array to extract a subset of elements.

main.jl
  

arr = [10, 20, 30, 40, 50]
slice = arr[2:4]  # Output: [20, 30, 40]

The slice arr[2:4] extracts elements from index 2 to 4.

## Concatenating Arrays

This example shows how to concatenate two arrays.

main.jl
  

arr1 = [1, 2, 3]
arr2 = [4, 5, 6]
combined = [arr1; arr2]  # Output: [1, 2, 3, 4, 5, 6]

The ; operator concatenates arr1 and arr2.

## Array Comprehensions

This example demonstrates how to create an array using a comprehension.

main.jl
  

squares = [x^2 for x in 1:5]  # Output: [1, 4, 9, 16, 25]

The comprehension generates an array of squares for numbers 1 through 5.

## Finding Array Length

This example shows how to find the length of an array.

main.jl
  

arr = [1, 2, 3, 4, 5]
println(length(arr))  # Output: 5

The length function returns the number of elements in arr.

## Sorting Arrays

This example demonstrates how to sort an array.

main.jl
  

arr = [5, 3, 1, 4, 2]
sorted_arr = sort(arr)  # Output: [1, 2, 3, 4, 5]

The sort function sorts the elements of arr in ascending order.

## Multidimensional Array Operations

This example shows how to perform operations on a multidimensional array.

main.jl
  

matrix = [1 2; 3 4]
sum_matrix = sum(matrix, dims=1)  # Output: [4 6]

The sum function calculates the sum of each column in matrix.

## Best Practices for Arrays

- **Preallocate Arrays:** Preallocate arrays for better performance in loops.

- **Use Comprehensions:** Use comprehensions for concise array creation.

- **Leverage Broadcasting:** Use broadcasting for element-wise operations.

- **Check Dimensions:** Verify array dimensions before performing operations.

## Source

[Julia Arrays Documentation](https://docs.julialang.org/en/v1/base/arrays/)

In this article, we have explored various examples of using arrays in Julia,
including creation, modification, slicing, and advanced operations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Julia tutorials](/all/#julia).