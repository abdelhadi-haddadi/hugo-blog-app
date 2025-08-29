+++
title = "C# List Remove"
date = 2025-08-27T23:23:20.192+01:00
draft = false
description = "C# List Remove tutorial shows how to delete
elements in a list."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# List Remove

last modified January 19, 2024

 

In this article we show how to delete list elements in C#.

C# list is a collection of elements of the same type. The elements can be
accessed by index.

We can delete list elements with Remove, RemoveAll, 
RemoveAt, RemoveRange and Clear methods.

## C# List Remove

The Remove method removes the first occurrence of a specific object
from the list.

public bool Remove (T item)

It returns true if item is successfully removed; otherwise, false.

Program.cs
  

List&lt;string&gt; words = [ "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" ];

string word = "sky";

removeWord(word);
removeWord(word);

Console.WriteLine(string.Join(' ', words));

void removeWord(string word) 
{
    if (words.Remove(word))
    {
        Console.WriteLine($"{word} removed");
    } else 
    {
        Console.WriteLine($"failed to remove {word}");
    }
}

In the program, we define a list of strings. We use the Remove
method to delete a word. 

$ dotnet run
sky removed
failed to remove sky
cup new war wrong crypto forest water cup

## C# List RemoveAt

The RemoveAt removes the element at the specified index of the
list.

public void RemoveAt (int index)

This is the syntax.

Program.cs
  

List&lt;string&gt; words = [ "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" ];

Console.WriteLine(string.Join(' ', words));

words.RemoveAt(0);
words.RemoveAt(5);

Console.WriteLine(string.Join(' ', words));

In the program we remove two elements with RemoveAt.

words.RemoveAt(0);
words.RemoveAt(5);

The first and the sixth elements are removed.

$ dotnet run
sky cup new war wrong crypto forest water cup
cup new war wrong crypto water cup

## C# List RemoveAll

The RemoveAll method removes all the elements that match the
conditions defined by the specified predicate.

public int RemoveAll (Predicate&lt;T&gt; match);

It returns the number of elements removed from the list. 

Program.cs
  

List&lt;string&gt; words = [ "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" ];

Console.WriteLine(string.Join(' ', words));

int n = words.RemoveAll(e =&gt; e.StartsWith('w'));

Console.WriteLine($"{n} elements removed");
Console.WriteLine(string.Join(' ', words));

We remove all words that start with 'w'. Then we print the number of words 
deleted.

int n = words.RemoveAll(e =&gt; e.StartsWith('w'));

We pass a predicate in the form of a lambda expression to the
RemoveAll method.

$ dotnet run
sky cup new war wrong crypto forest water cup
3 elements removed
sky cup new crypto forest cup

## C# List RemoveRange

The RemoveRange method removes a range of elements from the list.

public void RemoveRange(int index, int count)

The parameters are the starting index of the range of elements to remove and 
the number of elements to remove.

Program.cs
  

List&lt;string&gt; words = [ "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" ];

Console.WriteLine(string.Join(' ', words));

words.RemoveRange(0, 4);

Console.WriteLine(string.Join(' ', words));

In the example, we remove four elements, starting from the beginning.

$ dotnet run
sky cup new war wrong crypto forest water cup
wrong crypto forest water cup

## C# List Clear

The Clear method removes all elements from the list.

Program.cs
  

List&lt;string&gt; words = [ "sky", "cup", "new", "war", "wrong",
    "crypto", "forest", "water", "cup" ];

Console.WriteLine(words.Count);

words.Clear();

Console.WriteLine(words.Count);

The program deletes all words with Clear. We check the number of 
elements with Count.

$ dotnet run
9
0

## Source

[List class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-8.0)

In this article we have showed how to remove list elements in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).