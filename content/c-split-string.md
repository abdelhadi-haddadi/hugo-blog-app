+++
title = "C# Split String"
date = 2025-08-29T19:51:25.504+01:00
draft = false
description = "Discover how to split strings in C# using String.Split and Regex.Split methods. This comprehensive tutorial explains string manipulation techniques with step-by-step examples to help you master data parsing in C# programming."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Split String

last modified April 20, 2025

This tutorial explores how to split strings in C# using the String.Split and
Regex.Split methods, with practical examples for various scenarios.

## Overview of String Splitting

The String.Split method divides a string into an array of substrings based on
specified delimiters, such as characters or strings. For more complex patterns,
Regex.Split uses regular expressions to define splitting criteria.

Split(Char[], Int32, StringSplitOptions)
Split(Char, Int32, StringSplitOptions)
Split(String[], Int32, StringSplitOptions)
Split(String[], StringSplitOptions)
Split(String, Int32, StringSplitOptions)
Split(Char[], StringSplitOptions)
Split(Char[], Int32)
Split(Char, StringSplitOptions)
Split(String, StringSplitOptions)
Split(Char[])

String.Split offers ten overloads to handle different delimiter
types, counts, and options like removing empty entries.

Split(String, String, RegexOptions, TimeSpan)
Split(String, String, RegexOptions)
Split(String, Int32, Int32)
Split(String, Int32)
Split(String)
Split(String, String)

Regex.Split provides seven overloads, enabling splits based on
regular expression patterns, with options for case sensitivity and timeouts.

## Splitting a String by a Single Character

This example demonstrates the basic use of String.Split to divide a sentence
into words using a space delimiter.

Program.cs
  

string text = "There is an old hawk in the sky";
string[] words = text.Split(' ');

Array.ForEach(words, Console.WriteLine);

The program splits a sentence into words by a space character, creating an array
of substrings. The Array.ForEach method prints each word on a new line.

This simple approach is ideal for parsing text with consistent delimiters, such
as space-separated words in a sentence. The output lists each word individually,
demonstrating the split operation.

$ dotnet run
There
is
an
old
hawk
in
the
sky

## Omitting Empty Entries

This example uses StringSplitOptions.RemoveEmptyEntries to exclude
empty substrings when splitting a string with multiple spaces.

Program.cs
  

string text = "There  is an old  hawk in the sky";
string[] words = text.Split(' ', StringSplitOptions.RemoveEmptyEntries);

Array.ForEach(words, Console.WriteLine);

The text contains multiple consecutive spaces, which could produce empty entries
in the resulting array. By using StringSplitOptions.RemoveEmptyEntries, the
program ensures only non-empty substrings are included.

This technique is useful for cleaning up text data with inconsistent spacing,
such as user input or log files. The output shows only the actual words, with
empty entries omitted.

$ dotnet run
There
is
an
old
hawk
in
the
sky

## Splitting by Multiple Characters

This example splits a string using multiple delimiter characters, showcasing
String.Split's ability to handle diverse separators.

Program.cs
  

string text = "falcon;eagle,forest,sky;cloud,water,rock;wind";
string[] words = text.Split([',', ';']);

Array.ForEach(words, Console.WriteLine);

The program splits a string containing words separated by commas and semicolons.
The Split method accepts an array of characters as delimiters,
splitting the string whenever either character is encountered.

This approach is valuable for parsing data with multiple separators, such as CSV
files with mixed delimiters. The output lists each word, demonstrating the
successful split by both delimiters.

$ dotnet run
falcon
eagle
forest
sky
cloud
water
rock
wind

## Limiting the Number of Substrings

This example limits the number of substrings produced by String.Split using the
count parameter in an overloaded method.

Program.cs
  

string text = "falcon,eagle,forest,sky,cloud,water,rock,wind";
string[] words = text.Split(',', 4);

Array.ForEach(words, Console.WriteLine);

The program splits a comma-separated string into at most four substrings. The
Split method stops splitting after reaching the specified count, leaving the
remaining text as a single substring.

This technique is useful for extracting a fixed number of fields from structured
data, such as the first few columns of a CSV row. The output shows the first
three words as separate substrings, with the rest combined into the fourth.

$ dotnet run
falcon
eagle
forest
sky,cloud,water,rock,wind

## Splitting by a String Delimiter

This example uses String.Split to divide a string based on a string delimiter,
rather than a single character.

Program.cs
  

string text = "hawkxxowlxxvulturexxeagle";
string[] birds = text.Split("xx");

Array.ForEach(birds, Console.WriteLine);

The program splits a string using "xx" as the delimiter, producing an array of
bird names. The Split overload accepting a string delimiter enables this
functionality.

This method is ideal for parsing text with multi-character separators, such as
log entries or custom-formatted data. The output lists each bird name,
confirming the successful split.

$ dotnet run
hawk
owl
vulture
eagle

## Splitting with Regex.Split

This example uses Regex.Split to split a string based on a regular expression
pattern, handling complex delimiter scenarios.

Program.cs
  

using System.Text.RegularExpressions;

string text = "There are\t\t many clouds   in the \n sky.";
Regex rx = new Regex(@"\s+", RegexOptions.Compiled);
string[] data = rx.Split(text);

Array.ForEach(data, Console.WriteLine);

The program splits a string containing tabs, multiple spaces, and a newline
using a regular expression (\s+) that matches one or more whitespace characters.
The RegexOptions.Compiled flag improves performance for repeated use.

Regex.Split is powerful for handling irregular delimiters, such as varying
whitespace in text files. The output lists the non-empty substrings, showing
effective splitting by the pattern. For more details, see the
[C# Regular Expressions tutorial](/csharp/regex/).

$ dotnet run
There
are
many
clouds
in
the
sky.

## Joining Split Strings

This example demonstrates String.Join, which complements splitting by
concatenating an array of strings with a specified separator.

Program.cs
  

List&lt;string&gt; words = ["falcon", "wood", "sky", "water"];
string text = string.Join(",", words);

Console.WriteLine(text);

The program joins a list of words into a single string, using a comma as the
separator. String.Join is the inverse of String.Split, combining elements into a
unified string.

This method is useful for formatting data, such as creating CSV strings or
displaying lists. The output shows the words joined by commas, illustrating the
reverse of the splitting process.

$ dotnet run
falcon,wood,sky,water

## Source

[How to separate strings using String.Split in C#](https://learn.microsoft.com/en-us/dotnet/csharp/how-to/parse-strings-using-split)

In this article, we explored splitting strings in C# using String.Split and
Regex.Split.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).