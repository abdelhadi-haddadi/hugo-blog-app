+++
title = "C# search string"
date = 2025-08-29T19:51:21.044+01:00
draft = false
description = "C# search string tutorial shows how to search for strings in C# language. We can use String search methods or Regex for more advanced searching operations."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# search string

last modified January 26, 2024

 

In this article we show how to search for strings in C# language.

C# provides a few methods for searching strings, including Contains,
StartsWith, EndsWith, IndexOf, and 
LastIndexOf. More complex searching operations can be performed 
with the Regex class. 

## C# Contains

The Contains method returns a boolean value indicating whether the 
substring occurs within the specified string.

Program.cs
  

var text = "An old hawk in the sky";
var word = "hawk";

if (text.Contains(word))
{
    Console.WriteLine($"The text contains the {word} word");
} else 
{
    Console.WriteLine($"The text does not contain the {word} word");
}

In the example, we look for the hawk word in the sentence.

$ dotnet run
The text contains the hawk word

## C# StartsWith and EndsWith

The StartsWith determines whether the beginning of the string 
matches the specified string and the EndsWith determines whether 
the end of the string matches the specified string. 

Program.cs
  

var text = "old hawk";

if (text.StartsWith("old"))
{
    Console.WriteLine("The text starts with the old string");
} else
{
    Console.WriteLine("The text does not with the old string");
} 

if (text.EndsWith("hawk"))
{
    Console.WriteLine("The text ends with the hawk string");
} else 
{
    Console.WriteLine("The text does not end with the hawk string");
}

In the example, we show the usage of the two methods.

$ dotnet run
The text starts with the old string
The text ends with the hawk string

## C# IndexOf and LastIndexOf

The IndexOf method finds the zero-based index of the first 
occurrence of a specified Unicode character or string; it returns -1 if 
the character or string is not found. The LastIndexOf method finds 
the zero-based index of the last occurrence of a specified Unicode character or
string.; it returns -1 if the character or string is not found.

Program.cs
  

var text = "There is an old hawk in the sky. The sun is shining.";
var word = "is";

int first = text.IndexOf(word);
int last = text.LastIndexOf(word);

Console.WriteLine($"The first index of the word {word}: {first}");
Console.WriteLine($"The last index of the word {word}: {last}");

In the example, we find the first and last occurrence of the is word.

$ dotnet run
The first index of the word is: 6
The last index of the word is: 41

## C# Regex Match

The Regex can be used to do more complex searching operations.
[C# Regex tutorial](/csharp/regex/) covers regular expressions in 
C# in more detail. 

The Match's Success property returns a boolean value
indicating whether the match is successful. The NextMatch method
returns a new Match object with the results for the next match,
starting at the position at which the last match ended.

The positions of the matches can be found in the string with the
Index property of the Match.

Program.cs
  

using System.Text.RegularExpressions;

            var content = @"Foxes are omnivorous mammals belonging to several genera 
of the family Canidae. Foxes have a flattened skull, upright triangular ears, 
a pointed, slightly upturned snout, and a long bushy tail. Foxes live on every 
continent except Antarctica. By far the most common and widespread species of 
fox is the red fox.";

var rx = new Regex("fox(es)?", RegexOptions.Compiled |
    RegexOptions.IgnoreCase);

Match match = rx.Match(content);

while (match.Success)
{
    Console.WriteLine($"{match.Value} at index {match.Index}");
    match = match.NextMatch();
}

We look for all occurrences of the fox word.

var rx = new Regex("fox(es)?", RegexOptions.Compiled | 
    RegexOptions.IgnoreCase);

We add the (es)? expression to include the plural form of the word.
The RegexOptions.IgnoreCase searches in case-insensitive mode. 

Match match = rx.Match(content);

while (match.Success)
{
    Console.WriteLine($"{match.Value} at index {match.Index}");
    match = match.NextMatch();
}

The Value returns the matched string and the Index
returns its index in the text. The NextMatch method finds the next 
occurrence of a match.

$ dotnet run
Foxes at index 0
Foxes at index 82
Foxes at index 198
fox at index 300
fox at index 315

## Source

[String class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.string?view=net-8.0)

In this article we have searched for strings in C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).