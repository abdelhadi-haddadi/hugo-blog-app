+++
title = "C# trim string"
date = 2025-08-29T19:51:34.501+01:00
draft = false
description = "C# trim string tutorial shows how to trim strings in C# language with String.Trim, String.TrimStart and String.TrimEnd."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# trim string

last modified January 25, 2024

 

In this article we show how to trim strings in C# language with
String.Trim, String.TrimStart and String.TrimEnd.

The String.Trim method removes all leading and trailing 
white-space characters from the current string. The overloaded 
String.Trim(Char[]) method removes all leading and trailing
occurrences of a set of characters specified in an array from the current
string.

The String.TrimStart method removes all leading and the 
String.TrimEnd all trailing  characters or set of characters from
the string.

## C# trim string example

In the first example, we remove all the leading and trailing white spaces. 

Program.cs
  

var word = "\tfalcon  ";

Console.WriteLine(word.Length);

var word2 = word.TrimStart();
Console.WriteLine(word2.Length);

var word3 = word.TrimEnd();
Console.WriteLine(word3.Length);

var word4 = word.Trim();
Console.WriteLine(word4.Length);

We have a word with a leading tabulator and trailing two spaces. We call the 
three trimming methods and check the returned string's length with the 
Length property.

## C# trim string example II

In the following example, we trim trailing non-whitespace characters from the
words.

Program.cs
  

var text = "Look! There is a hawk in the sky. Do you have a camera?";
var words = text.Split(' ');

Array.ForEach(words, word =&gt;
{
    Console.WriteLine(word.TrimEnd(['?', '.', '!']));
});

We cut the sentence into words with Split. Then we remove the 
trailing ?, !, and . characters from the 
words with the TrimEnd method.

## Source

[String.Trim method](https://learn.microsoft.com/en-us/dotnet/api/system.string.trim?view=net-8.0)

In this article we have trimmed strings in C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).