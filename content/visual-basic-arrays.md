+++
title = "Visual Basic arrays"
date = 2025-08-29T20:03:18.282+01:00
draft = false
description = "This part of the Visual Basic tutorial covers arrays in Visual Basic."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../flowcontrol/)
[Next](../procedures/)

# Visual Basic arrays

last modified October 18, 2023

In this part of the Visual Basic programming tutorial, we cover arrays.

*Arrays* are collections of data. A variable can hold only one item at a time.
Arrays can hold multiple items. These items are called elements of the array.
Arrays store data of the *same data type*. Each element can be referred
to by an index. Arrays are zero based. The index of the first element is zero.

*Collections* serve the similar purpose. They are are more powerful than
arrays. They will be described later.

Arrays are used to store data of our applications. We declare arrays to be of a
certain data type. We specify their length. And we initialize arrays with data.
We have several methods for working with array. We can modify the elements, sort
them, copy them or search them.

## Initializing arrays

There are several ways, how we can initialize an array in Visual Basic.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim array(5) As Integer

        array(0) = 3
        array(1) = 2
        array(2) = 1
        array(3) = 5
        array(4) = 6

        For i As Integer = 0 To array.Length-1
            Console.WriteLine(array(i))
        Next

    End Sub

End Module

We declare and initialize a numerical array. The contents of the
array are printed to the console.

Dim array(5) As Integer

Here we declare an array which contains five elements. All elements
are integers.

array(0) = 3
array(1) = 2
...

We initialize the array with some data. This is assignment initialization. The
indexes are in the parentheses. Number 3 is going to be the first element of the
array, 2 the second.

For i As Integer = 0 To array.Length-1
    Console.WriteLine(array(i))
Next

We go through the array and print its elements. An array has a
Length property, which gives the number of elements
in the array. Since arrays are zero based, the indexes are 0..length-1.

We can declare and initialize an array in one statement.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim array() As Integer = { 2, 4, 5, 6, 7, 3, 2 }

        For Each i As Integer In array
            Console.WriteLine(i)
        Next

    End Sub

End Module

This is a modified version of the previous program.

Dim array() As Integer = { 2, 4, 5, 6, 7, 3, 2 }

An array is declared and initialized in one step. The elements are specified in
the curly brackets. We did not specify the length of the array. The compiler
will do it for us.

For Each i As Integer In array
    Console.WriteLine(i)
Next

We use the For Each keyword to traverse the array and print its
contents.

## The bounds of an array

Visual Basic has two functions for getting the bounds of an array. The
LBound function returns the lowest available subscript for the
indicated dimension of an array. The UBound function returns the
highest available subscript for the indicated dimension of an array. So far we
have worked with one dimensional arrays.

Program.vb
  

Option Strict On

Module Example

    Dim n1 As Integer
    Dim n2 As Integer

    Sub Main()

        Dim names() As String = { "Jane", "Lucy", "Timea", "Beky", "Lenka"}

        n1 = LBound(names)
        n2 = UBound(names)

        Console.WriteLine(n1)
        Console.WriteLine(n2)

        For i As Integer = n1 To n2
            Console.WriteLine(names(i))
        Next

    End Sub

End Module

We have an array of names. We calculate and work with the lower and upper bound
of that array.

n1 = LBound(names)
n2 = UBound(names)

The n1 is the lowest index, the n2 the highest index
in the names array.

For i As Integer = n1 To n2
    Console.WriteLine(names(i))
Next

We examine the array using both the lower and upper bounds of the array.

$ dotnet run
0
4
Jane
Lucy
Timea
Beky
Lenka

## Array dimensions

So far, we have worked with one dimensional arrays. The number of indexes needed
to specify an element is called the *dimension*, or *rank* of the
array.

We work with two-dimensional array.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim numbers(,) As Integer = { {2, 1}, {3, 5}, 
            {4, 4}, {7, 2}, {0, 0} }

        For i As Integer = 0 To UBound(numbers, 1)
            For j As Integer = 0 To UBound(numbers, 2)
                Console.Write(CStr(numbers(i, j)) + " ")
            Next j
            Console.Write(vbCrLf)
        Next i

    End Sub

End Module

If we need two indexes to access an element in an array, than
we have a two dimensional array.

Dim numbers(,) As Integer = { {2, 1}, {3, 5}, 
    {4, 4}, {7, 2}, {0, 0} }

We declare and initialize a two dimensional array in one statement. Note the
comma inside the parentheses following the name of the array.

For i As Integer = 0 To UBound(numbers, 1)
    For j As Integer = 0 To UBound(numbers, 2)
        Console.Write(CStr(numbers(i, j)) + " ")
    Next j
    Console.Write(vbCrLf)
Next i

We need two loops to get the data from the two dimensional array.
The UBound function has an optional second
parameter, rank. It is a dimension for which we retrieve the highest
index. If the rank is omitted, the 1 dimension is assumed.

$ dotnet run
2 1
3 5
4 4
7 2
0 0

Next we work with a three-dimensional array.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim i As Integer
        Dim j As Integer
        Dim k As Integer

        Dim nums(,,) As Integer = { 
            {{12, 2, 8}}, 
            {{14, 5, 2}}, 
            {{3, 26, 9}}, 
            {{4, 11, 2}} 
        }

        For i = 0 To UBound(nums, 1)
            For j = 0 To UBound(nums, 2)
                For k = 0 To UBound(nums, 3)
                    Console.Write(CStr(nums(i, j, k)) + " ")
                Next k
            Next j
            Console.Write(vbCrLf)
        Next i

    End Sub

End Module

We have a numerical three dimensional array. Again, we initialize
the array with numbers and print them to the terminal.

Dim nums(,,) As Integer = { 
    {{12, 2, 8}}, 
    {{14, 5, 2}}, 
    {{3, 26, 9}}, 
    {{4, 11, 2}} 
}

There is another comma between the parentheses on the left side
and additional curly brackets on the right side.

For k = 0 To UBound(nums, 3)
    Console.Write(CStr(nums(i, j, k)) + " ")
Next k

This loop goes through the third dimension. We use three indexes to
retrieve the value from the array.

$ dotnet run
12 2 8
14 5 2
3 26 9
4 11 2

We print the contents of the three dimensional array to the
console.

There is a Rank function, which gives the number of dimensions of
an array.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim array1() As Integer = {1, 2}
        Dim array2(,) As Integer = { { 1 }, { 2 } }
        Dim array3(, ,) As Integer = { { { 1, 2 }, { 2, 1 } } }

        Console.WriteLine(array1.Rank())
        Console.WriteLine(array2.Rank())
        Console.WriteLine(array3.Rank())

    End Sub

End Module

We have three arrays. We use the Rank function to get the number of
dimensions for each of them.

Console.WriteLine(array1.Rank())

Here we get the rank for the first array.

## Jagged arrays

Arrays that have elements of the same size are called *rectangular*
arrays. In contrast, arrays which have elements of different size are called
*jagged* arrays. Jagged arrays are declared and initialized
differently.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim jagged As Integer()() = New Integer(4)() {}

        jagged(0) = New Integer() {1}
        jagged(1) = New Integer() {3, 4}
        jagged(2) = New Integer() {5, 6, 7}
        jagged(3) = New Integer() {5, 6}
        jagged(4) = New Integer() {9}

        For i As Integer = 0 To jagged.GetUpperBound(0)
            For j As Integer = 0 To jagged(i).GetUpperBound(0)
                Console.Write(jagged(i)(j) &amp; " ")
            Next

            Console.Write(vbCrLf)
        Next

    End Sub

End Module

This is an example of a jagged array.

Dim jagged As Integer()() = New Integer(4)() {}

This is a declaration of a jagged array. We have an array of arrays. More
specifically, we have declared an array to have five arrays of Integer data
type.

jagged(0) = New Integer() {1}
jagged(1) = New Integer() {3, 4}
...

Each of the arrays must be individually initialized.

Console.Write(jagged(i)(j) &amp; " ")

Unlike in rectangular arrays, each index is surrounded by
parentheses.

## Array methods

There are various methods for working with arrays. These methods can be used for
retrieving, modifying data, sorting, copying, searching data. These methods that
we use are static methods of the Array class or member methods of the array
objects.

Program.vb
  

Option Strict On

Module Example

    Sub Main()

        Dim names() As String = {"Jane", "Frank", "Alice", "Tom" }

        Array.Sort(names)

        For Each el As String In names
            Console.Write(el + " ")
        Next

        Console.Write(vbCrLf)

        Array.Reverse(names)

        For Each el As String In names
            Console.Write(el + " ")
        Next

        Console.Write(vbCrLf)

    End Sub

End Module

In this example, we sort the data.

Dim names() As String = {"Jane", "Frank", "Alice", "Tom" }

We have an array of strings.

Array.Sort(names)

The Sort method sorts the data alphabetically.

Array.Reverse(names)

The Reverse method reverses the sequence of the elements in the
entire one-dimensional array.

$ dotnet run
Alice Frank Jane Tom
Tom Jane Frank Alice

We have ordered the names in ascending and descending order.

The following example uses SeValue, GetValue,
IndexOf, Copy and Clear methods.

Program.vb
  

Option Strict On

Module Example

    Dim names() As String = {"Jane", "Frank", "Alice", "Tom" }
    Dim girls(0 To 3) As String

    Sub Main()

        names.SetValue("Beky", 1)
        names.SetValue("Erzebeth", 3)

        Console.WriteLine(names.GetValue(1))
        Console.WriteLine(names.GetValue(3))

        Console.WriteLine(Array.IndexOf(names, "Erzebeth"))

        Array.Copy(names, girls, names.Length)

        For Each el As String In girls
            Console.Write(el + " ")
        Next

        Console.Write(vbCrLf)

        Array.Clear(names, 0, 2)

        For Each el As String In names
            Console.Write(el + " ")
        Next

        Console.Write(vbCrLf)

    End Sub

End Module

This example introduces additional methods.

Dim girls(0 To 3) As String

Yet another way to declare an array.

names.SetValue("Beky", 1)
names.SetValue("Erzebeth", 3)

The SetValue sets a value for a
specific index in the array.

Console.WriteLine(names.GetValue(1))
Console.WriteLine(names.GetValue(3))

We retrieve the values from the array with the
GetValue method.

Console.WriteLine(Array.IndexOf(names, "Erzebeth"))

The IndexOf method returns an index
for the first occurrence of a specific value.

Array.Copy(names, girls, names.Length)

The Copy method copies values from the source array to the
destination array. The first parameter is the source array, the second is the
destination array. The third parameter is the length; it specifies the number of
elements to copy.

Array.Clear(names, 0, 2)

The Clear method clears elements from the array. It takes three
parameters, the array, the start index and the number of elements from the index
to clear.

In this part of the Visual Basic tutorial, we worked with arrays.

[Contents](..)
[Previous](../flowcontrol/)
[Next](../procedures/)