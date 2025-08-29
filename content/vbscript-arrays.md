+++
title = "VBScript Arrays"
date = 2025-08-29T20:14:38.334+01:00
draft = false
description = "VBScript arrays tutorial shows how to work with arrays in VBScript with examples using WScript.Echo."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Arrays

last modified February 19, 2025

In this article, we will learn how to work with arrays in VBScript. Arrays are
used to store multiple values in a single variable. They are useful when you
need to handle a collection of data. We will use WScript.Echo to
output array values and run the scripts using cscript.

## Simple Array Example

The first example demonstrates how to declare and use a simple array.

simple_array.vbs
  

Dim fruits(2)
fruits(0) = "Apple"
fruits(1) = "Banana"
fruits(2) = "Cherry"

WScript.Echo "First fruit: " &amp; fruits(0)

This example declares an array fruits with three elements and
assigns values to them. The first element is displayed using
WScript.Echo.

## Dynamic Arrays

VBScript supports dynamic arrays whose size can be changed at runtime using
ReDim.

dynamic_array.vbs
  

Dim numbers()
ReDim numbers(2)

numbers(0) = 10
numbers(1) = 20
numbers(2) = 30

ReDim Preserve numbers(4)
numbers(3) = 40
numbers(4) = 50

WScript.Echo "Third number: " &amp; numbers(2)

This example shows how to resize an array while preserving its existing values.

## Multi-Dimensional Arrays

VBScript supports multi-dimensional arrays for storing data in a table-like
structure.

multi_dim_array.vbs
  

Dim matrix(2, 2)
matrix(0, 0) = 1
matrix(0, 1) = 2
matrix(1, 0) = 3
matrix(1, 1) = 4

WScript.Echo "Value at (1,1): " &amp; matrix(1, 1)

This example declares a 2D array and assigns values to its elements.

## Array Length

You can determine the length of an array using the UBound function.

array_length.vbs
  

Dim colors(2)
colors(0) = "Red"
colors(1) = "Green"
colors(2) = "Blue"

WScript.Echo "Array length: " &amp; (UBound(colors) + 1)

```
Dim colors(2) 

```

We declare an array with 3 elements (indices 0 to 2).

This example calculates and displays the length of the colors array.

## Iterating Through an Array

You can use a For...Next loop to iterate through an array.

iterate_array.vbs
  

Dim animals(2)
animals(0) = "Cat"
animals(1) = "Dog"
animals(2) = "Bird"

For i = 0 To UBound(animals)
    WScript.Echo "Animal: " &amp; animals(i)
Next

This example iterates through the animals array and displays each
element.

Run the script with cscript:
cscript iterate_array.vbs

Output:
Animal: Cat
Animal: Dog
Animal: Bird

## Sorting an Array

VBScript does not have a built-in array sorting function, but you can implement
a simple sorting algorithm.

sort_array.vbs
  

Dim nums(4)
nums(0) = 5
nums(1) = 3
nums(2) = 8
nums(3) = 1
nums(4) = 4

For i = 0 To UBound(nums) - 1
    For j = i + 1 To UBound(nums)
        If nums(i) &gt; nums(j) Then
            temp = nums(i)
            nums(i) = nums(j)
            nums(j) = temp
        End If
    Next
Next

For i = 0 To UBound(nums)
    WScript.Echo "Number: " &amp; nums(i)
Next

This example sorts the nums array in ascending order. The example 
uses a bubble sort algorithm, which is simple but inefficient. 

The next example uses a more powerfule quick sort algorithm.

sort_array2.vbs
  

Dim nums(4)
nums(0) = 5
nums(1) = 3
nums(2) = 8
nums(3) = 1
nums(4) = 4

' Quick Sort Function
Sub QuickSort(arr, low, high)
    Dim pivotIndex
    If low &lt; high Then
        pivotIndex = Partition(arr, low, high)
        QuickSort arr, low, pivotIndex - 1
        QuickSort arr, pivotIndex + 1, high
    End If
End Sub

' Partition Function
Function Partition(arr, low, high)
    Dim pivot, i, j, temp
    pivot = arr(high)
    i = low - 1

    For j = low To high - 1
        If arr(j) &lt;= pivot Then
            i = i + 1
            ' Swap arr(i) and arr(j)
            temp = arr(i)
            arr(i) = arr(j)
            arr(j) = temp
        End If
    Next

    ' Swap arr(i + 1) and arr(high)
    temp = arr(i + 1)
    arr(i + 1) = arr(high)
    arr(high) = temp

    Partition = i + 1
End Function

' Call QuickSort on the nums array
QuickSort nums, 0, UBound(nums)

' Print the sorted numbers
For i = 0 To UBound(nums)
    WScript.Echo "Number: " &amp; nums(i)
Next

The program sorts an array of integers with quick sort algorithm.

## Passing Arrays to Functions

You can pass arrays to functions for processing.

array_function.vbs
  

Function PrintArray(arr)
    For i = 0 To UBound(arr)
        WScript.Echo "Element: " &amp; arr(i)
    Next
End Function

Dim values(2)
values(0) = 100
values(1) = 200
values(2) = 300

PrintArray(values)

This example passes the values array to the PrintArray
function, which displays each element.

## Array of Objects

VBScript allows you to create arrays of objects.

object_array.vbs
  

Class Person
    Public Name
    Public Age
End Class

Dim people(1)
Set people(0) = New Person
people(0).Name = "Alice"
people(0).Age = 25

Set people(1) = New Person
people(1).Name = "Bob"
people(1).Age = 30

WScript.Echo "First person: " &amp; people(0).Name

This example creates an array of Person objects and accesses their
properties.

## Filtering Arrays

You can filter arrays using loops and conditions.

filter_array.vbs
  

Dim numbers(4)
numbers(0) = 10
numbers(1) = 15
numbers(2) = 20
numbers(3) = 25
numbers(4) = 30

For i = 0 To UBound(numbers)
    If numbers(i) &gt; 20 Then
        WScript.Echo "Filtered number: " &amp; numbers(i)
    End If
Next

This example filters and displays numbers greater than 20.

## Combining Arrays

You can combine two arrays into one using loops.

combine_arrays.vbs
  

Dim arr1(2)
arr1(0) = "A"
arr1(1) = "B"
arr1(2) = "C"

Dim arr2(2)
arr2(0) = "D"
arr2(1) = "E"
arr2(2) = "F"

Dim combined(5)

For i = 0 To UBound(arr1)
    combined(i) = arr1(i)
Next

For i = 0 To UBound(arr2)
    combined(UBound(arr1) + 1 + i) = arr2(i)
Next

For i = 0 To UBound(combined)
    WScript.Echo "Combined: " &amp; combined(i)
Next

This example combines arr1 and arr2 into a single
array.

In this article, we explored various aspects of working with arrays in VBScript.
We covered simple arrays, dynamic arrays, multi-dimensional arrays, array
length, iteration, sorting, passing arrays to functions, arrays of objects,
filtering, and combining arrays. Arrays are a powerful feature in VBScript that
allow you to manage collections of data efficiently.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).