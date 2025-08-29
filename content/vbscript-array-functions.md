+++
title = "VBScript Array Functions"
date = 2025-08-29T20:14:38.328+01:00
draft = false
description = "Learn about VBScript array functions, including Array, UBound, LBound, Split, and more. Understand how to manipulate arrays effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Array Functions

last modified April 4, 2025

Arrays in VBScript are powerful data structures that store multiple values. 
VBScript provides several built-in functions to work with arrays efficiently. 
This tutorial covers essential array functions with practical examples. You'll 
learn how to create, manipulate, and process arrays in your scripts.

## VBScript Array Functions Overview

VBScript offers various functions to handle arrays. The key functions include 
Array() for creation, UBound() and LBound() 
for bounds checking, Split() for string conversion, and 
Join() for array concatenation. These functions simplify array 
manipulation tasks.

Arrays can be fixed-size or dynamic, and VBScript handles both types well. 
Understanding these functions is crucial for effective data processing. We'll 
explore each function with practical examples in the following sections.

## Creating Arrays with Array() Function

The Array() function creates and initializes an array in one step. 
It takes comma-separated values and returns a variant containing an array. This 
is the simplest way to create an array with predefined values.

array_create.vbs
  

' Create and initialize an array
Dim colors
colors = Array("Red", "Green", "Blue", "Yellow")

' Display array elements
For i = LBound(colors) To UBound(colors)
    WScript.Echo "Color " &amp; i &amp; ": " &amp; colors(i)
Next

This example demonstrates array creation and iteration. The Array() 
function creates a zero-based array. We use LBound() and 
UBound() to get the lower and upper bounds for the loop.

## Determining Array Size with UBound() and LBound()

UBound() returns the highest available index, while LBound() 
returns the lowest (usually 0). These functions are essential for safe array 
traversal. They help prevent "Subscript out of range" errors.

array_bounds.vbs
  

Dim numbers(5)
numbers(0) = 10
numbers(1) = 20
numbers(2) = 30
numbers(3) = 40
numbers(4) = 50
numbers(5) = 60

WScript.Echo "Array lower bound: " &amp; LBound(numbers)
WScript.Echo "Array upper bound: " &amp; UBound(numbers)
WScript.Echo "Array size: " &amp; (UBound(numbers) - LBound(numbers) + 1)

This example shows how to determine array bounds and calculate size. The array 
is explicitly dimensioned with 6 elements (0-5). The size calculation adds 1 
because array indices are inclusive.

## Splitting Strings into Arrays with Split()

The Split() function divides a string into an array based on a 
delimiter. It's useful for parsing CSV data or log files. The delimiter can be 
any character or string, with space as the default.

array_split.vbs
  

Dim sentence, words
sentence = "The quick brown fox jumps over the lazy dog"

' Split by space (default delimiter)
words = Split(sentence)

' Display each word
For Each word In words
    WScript.Echo word
Next

' Split with custom delimiter
Dim csvData, fields
csvData = "John,Doe,35,New York"
fields = Split(csvData, ",")

WScript.Echo "First name: " &amp; fields(0)
WScript.Echo "Last name: " &amp; fields(1)

This example demonstrates both default and custom delimiter splitting. The first 
part splits a sentence into words, while the second parses CSV data. Notice how 
array indexing starts at 0.

## Joining Arrays into Strings with Join()

The Join() function combines array elements into a single string. 
It's the inverse of Split(). You can specify a delimiter to separate 
elements. The default delimiter is a space.

array_join.vbs
  

Dim fruits(3), fruitString, csvString
fruits(0) = "Apple"
fruits(1) = "Banana"
fruits(2) = "Orange"
fruits(3) = "Mango"

' Join with default delimiter (space)
fruitString = Join(fruits)
WScript.Echo "Fruits: " &amp; fruitString

' Join with custom delimiter
csvString = Join(fruits, ",")
WScript.Echo "CSV: " &amp; csvString

This example shows array joining with different delimiters. The first join uses 
spaces, creating a readable list. The second uses commas, creating CSV-formatted 
output. Join() is perfect for generating delimited strings from arrays.

## Filtering Arrays with Filter() Function

The Filter() function returns a subset of an array based on search 
criteria. It can perform case-sensitive or insensitive searches. The function 
returns a new array containing matching elements.

array_filter.vbs
  

Dim names(4), filteredNames
names(0) = "John"
names(1) = "Jane"
names(2) = "Bob"
names(3) = "Alice"
names(4) = "Joan"

' Filter names starting with "Jo"
filteredNames = Filter(names, "Jo")

WScript.Echo "Names starting with 'Jo':"
For Each name In filteredNames
    WScript.Echo name
Next

' Case-insensitive filter
filteredNames = Filter(names, "jo", True, vbTextCompare)
WScript.Echo "Case-insensitive matches for 'jo':"
For Each name In filteredNames
    WScript.Echo name
Next

This example demonstrates basic and advanced filtering. The first filter finds 
exact matches, while the second performs case-insensitive matching. The 
vbTextCompare constant enables case-insensitive comparison.

## Source

[VBScript Array Functions Documentation](https://learn.microsoft.com/en-us/previous-versions//d1wf56tt(v=vs.85))

In this article, we have explored essential VBScript array functions, from 
creation to manipulation. These functions provide powerful tools for handling 
collections of data. With practical examples, we've shown how to process arrays 
effectively. Mastering these functions will significantly enhance your scripting 
capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).