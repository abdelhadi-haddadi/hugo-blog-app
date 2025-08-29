+++
title = "PowerShell Arrays"
date = 2025-08-29T20:06:44.006+01:00
draft = false
description = "PowerShell arrays tutorial shows how to work with arrays in PowerShell with examples using Write-Output."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Arrays

last modified February 19, 2025

In this article, we will learn how to work with arrays in PowerShell. Arrays are
used to store multiple values in a single variable. They are useful when you
need to handle a collection of data. We will use Write-Output to
output array values and run the scripts using the PowerShell console.

## Simple Array Example

The first example demonstrates how to create and display a simple array.

simple_array.ps1
  

$fruits = @("Apple", "Banana", "Cherry")
Write-Output $fruits

This example declares an array $fruits with three elements and
displays its contents using Write-Output.

## Accessing Array Elements

You can access individual elements of an array using their index.

access_elements.ps1
  

$fruits = @("Apple", "Banana", "Cherry")
Write-Output "First fruit: " $fruits[0]
Write-Output "Second fruit: " $fruits[1]

This example accesses the first and second elements of the $fruits
array.

## Adding Elements to an Array

You can add elements to an array using the += operator.

add_elements.ps1
  

$fruits = @("Apple", "Banana")
$fruits += "Cherry"
Write-Output $fruits

This example adds a new element "Cherry" to the $fruits array.

## Removing Elements from an Array

PowerShell does not provide a direct way to remove elements from an array, but
you can create a new array excluding the elements you want to remove.

remove_elements.ps1
  

$fruits = @("Apple", "Banana", "Cherry")
$fruits = $fruits | Where-Object { $_ -ne "Banana" }
Write-Output $fruits

This example removes the element "Banana" from the $fruits array.

## Iterating Through an Array

You can iterate through an array using a foreach loop.

iterate_array.ps1
  

$fruits = @("Apple", "Banana", "Cherry")

foreach ($fruit in $fruits) {
    Write-Output $fruit
}

This example iterates through the $fruits array and outputs each
element.

## Multidimensional Arrays

PowerShell supports multidimensional arrays, which are arrays of arrays.

multidimensional_array.ps1
  

$matrix = @(
    @(1, 2, 3),
    @(4, 5, 6),
    @(7, 8, 9)
)

Write-Output $matrix[1][2]

This example creates a 3x3 matrix and accesses the element at row 1, column 2.

## Array Length

You can determine the length of an array using the Length property.

array_length.ps1
  

$fruits = @("Apple", "Banana", "Cherry")
Write-Output "Array length: " $fruits.Length

This example calculates and displays the length of the $fruits array.

## Sorting an Array

You can sort an array using the Sort-Object cmdlet.

sort_array.ps1
  

$fruits = @("Cherry", "Apple", "Banana")
$sortedFruits = $fruits | Sort-Object
Write-Output $sortedFruits

This example sorts the $fruits array in ascending order.

## Filtering an Array

You can filter an array using the Where-Object cmdlet.

filter_array.ps1
  

$numbers = @(1, 2, 3, 4, 5)
$evenNumbers = $numbers | Where-Object { $_ % 2 -eq 0 }
Write-Output $evenNumbers

This example filters the $numbers array to include only even numbers.

## Combining Arrays

You can combine two arrays using the + operator.

combine_arrays.ps1
  

$fruits1 = @("Apple", "Banana")
$fruits2 = @("Cherry", "Date")
$combinedFruits = $fruits1 + $fruits2
Write-Output $combinedFruits

This example combines the $fruits1 and $fruits2 arrays
into a single array.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we explored how to work with arrays in PowerShell. We covered
creating arrays, accessing elements, adding and removing elements, iterating
through arrays, multidimensional arrays, array length, sorting, filtering, and
combining arrays. Arrays are a powerful feature in PowerShell that allow you to
manage collections of data efficiently.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).