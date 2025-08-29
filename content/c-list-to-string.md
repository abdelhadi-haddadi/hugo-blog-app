+++
title = "C# List to String"
date = 2025-08-27T23:23:20.173+01:00
draft = false
description = "Learn how to convert a List to a string in C#.
This tutorial covers different methods for formatting and joining List elements,
including string concatenation and delimiter-based approaches."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# List to String

Last modified May 14, 2025

 

This tutorial demonstrates how to convert a List to a string in C#.

To convert a list of elements into a single string in C#, we can use the
string.Join method, StringBuilder class,
Enumerable.Aggregate method, or the string concatenation
operator.

The string.Join method combines elements of a collection or
array, inserting a specified separator between each element. The
StringBuilder class efficiently builds strings dynamically.
The Enumerable.Aggregate method applies an accumulator
function across a sequence of values.

C# uses the + operator to concatenate strings, though this
can be less efficient for large lists.

## Using string.Join

The following example uses the string.Join method to
convert a list into a string.

Program.cs
  

List&lt;string&gt; words = ["a", "visit", "to", "London"];
var res = string.Join("-", words);

Console.WriteLine(res);

This example creates a slug from a list of words by joining them with hyphens.
This method is efficient even for large lists because it allocates the result
string only once.

$ dotnet run
a-visit-to-London

## Using StringBuilder

This example demonstrates the use of the StringBuilder
class to build a string from a list.

Program.cs
  

using System.Text;

List&lt;string&gt; words = ["There", "are", "three", "chairs", "and", "two",
    "lamps", "in",  "the", "room"];

var builder = new StringBuilder();

foreach (var word in words)
{
    builder.Append(word).Append(' ');
}

Console.WriteLine(builder.ToString());

The code iterates through the list using a foreach loop, appending each
word and a space to a StringBuilder object. The
ToString method converts the result to a string. This approach is
very efficient for large lists due to the mutable nature of
StringBuilder.

$ dotnet run
There are three chairs and two lamps in the room

## Using Enumerable.Aggregate

The next example employs the Enumerable.Aggregate method
to convert a list to a string.

Program.cs
  

List&lt;string&gt; words = ["There", "are", "three", "chairs", "and", "two", 
    "lamps", "in",  "the", "room"];

var res = words.Aggregate((total, part) =&gt; $"{total} {part}");
Console.WriteLine(res);

This example uses string interpolation within the accumulator function to build
the string by concatenating each word with a space. While convenient,
Aggregate is less efficient than StringBuilder or
string.Join for large lists.

## Using String Concatenation

This example uses the string concatenation operator to build a string
from a list.

Program.cs
  

List&lt;string&gt; words = ["There", "are", "three", "chairs", "and", "two", 
    "lamps", "in",  "the", "room"];

string res = string.Empty;

words.ForEach(word =&gt; {

    res += $"{word} ";
});

Console.WriteLine(res);

The code iterates over the list using the ForEach method,
appending each word and a space to the result string using the
+= operator. This approach is simple and easy to understand.
However, repeated string concatenation can be inefficient for large lists. For
large lists, this method is not recommended due to performance overhead.

## Using string.Concat

Another way to convert a list to a string is to use the
string.Concat method. This method concatenates all elements of the
list without any separator. It is a quick way to join list elements when no
delimiter is needed. This method is efficient for combining many strings
together.

Program.cs
  

List&lt;string&gt; words = ["There", "are", "three", "chairs", "and", "two", 
    "lamps", "in",  "the", "room"];

var res = string.Concat(words);
Console.WriteLine(res);

This example uses string.Concat to join all elements of the list
into a single string without any separator. If you need a separator, use
string.Join instead. This method is efficient for large lists as it
allocates the result string only once.

## Source

[string.Join method](https://learn.microsoft.com/en-us/dotnet/api/system.string.join?view=net-8.0)

This tutorial has demonstrated various methods to convert a list to a
string in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since
2007. To date, I have authored over 1,400 articles and 8 e-books. I
possess more than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).