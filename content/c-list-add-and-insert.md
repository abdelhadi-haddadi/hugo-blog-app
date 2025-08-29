+++
title = "C# List Add & Insert"
date = 2025-08-27T23:23:17.934+01:00
draft = false
description = "C# List Add & Insert tutorial shows how to
add elements to a list in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# List Add &amp; Insert

last modified July 5, 2023

 

In this article we show how to add new elements to a list in C#.

C# list is a collection of elements of the same type. The elements can be
accessed by index.

In C#, we can use the Add, AddRange,
Insert, and InsertRange methods to add elements to a
list.

## C# List Add

The Add method appends an element to a list.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "war", "crypto" };

words.Add("water");
Console.WriteLine(string.Join(",", words));

words.Add("falcon");
Console.WriteLine(string.Join(",", words));

words.Add("soap");
Console.WriteLine(string.Join(",", words));

We define a list of words. Using Add, we append three new
words.

$ dotnet run
sky,war,crypto,water
sky,war,crypto,water,falcon
sky,war,crypto,water,falcon,soap

## C# List AddRange

The AddRange method appends elements of a collection to the list.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "war", "crypto" };
var words2 = new List&lt;string&gt; { "falcon", "soap" };
var words3 = new string[] { "book", "cloud" };
var words4 = new HashSet&lt;string&gt; { "money", "dog" };

Console.WriteLine(string.Join(",", words));

words.AddRange(words2);
Console.WriteLine(string.Join(",", words));

words.AddRange(words3);
Console.WriteLine(string.Join(",", words));

words.AddRange(words4);
Console.WriteLine(string.Join(",", words));

In the example, we add elements of another list, array, and set to the initial
list of strings.

$ dotnet run
sky,war,crypto
sky,war,crypto,falcon,soap
sky,war,crypto,falcon,soap,book,cloud
sky,war,crypto,falcon,soap,book,cloud,money,dog

## C# List Insert

The Insert method inserts an element into a list at the specified
index.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "war", "crypto" };

words.Insert(0, "storm");
words.Insert(words.Count, "fortress");

Console.WriteLine(string.Join(",", words));

In the program, we insert a word at the beginning and at the end with
Insert.

$ dotnet run
storm,sky,war,crypto,fortress

## C# List InsertRange

The InsertRange method inserts elements of a collection at the
specified index.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "war", "crypto" };
var words2 = new List&lt;string&gt; { "falcon", "soap" };
var words3 = new string[] { "book", "cloud" };
var words4 = new HashSet&lt;string&gt; { "money", "dog" };

Console.WriteLine(string.Join(",", words));

words.InsertRange(0, words2);
Console.WriteLine(string.Join(",", words));

words.InsertRange(0, words3);
Console.WriteLine(string.Join(",", words));

words.InsertRange(words.Count, words4);
Console.WriteLine(string.Join(",", words));

In the program, we insert elements of another list, array, and set to an initial
list of strings.

$ dotnet run 
sky,war,crypto
falcon,soap,sky,war,crypto
book,cloud,falcon,soap,sky,war,crypto
book,cloud,falcon,soap,sky,war,crypto,money,dog

## Source

[List class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-8.0)

    

In this article we have showed how add new elements to a list in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).