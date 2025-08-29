+++
title = "C# StringBuilder"
date = 2025-08-29T19:51:30.023+01:00
draft = false
description = "C# StringBuilder tutorial shows how to use StringBuilder in C#. StringBuilder is a mutable sequence of characters. The examples demonstrate how to modify strings with StringBuilder."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# StringBuilder

last modified May 14, 2025

 

This C# StringBuilder tutorial demonstrates how to efficiently manipulate
strings using StringBuilder. Unlike String objects,
which are immutable and require creating modified copies,
StringBuilder enables in-place string modifications, reducing
memory overhead.

## StringBuilder

StringBuilder represents a mutable sequence of characters, making
it ideal for scenarios where frequent modifications to a string are required.
Unlike immutable strings, it allows efficient changes without unnecessary memory
allocations.

Key methods of StringBuilder include:

- Append - Adds text to the existing string.

- Insert - Inserts text at a specified position.

- Replace - Replaces occurrences of a specified substring.

These methods provide powerful ways to manipulate text dynamically while
optimizing performance.

## C# StringBuilder is mutable

C# String is immutable while StringBuilder is mutable.

Program.cs
  

using System.Text;

var word = "rock";
var word2 = word.Replace('r', 'd');

Console.WriteLine(word2);

var builder = new StringBuilder("rock");
builder.Replace('r', 'd');

Console.WriteLine(builder);

The example demonstrates the main difference between String and 
StringBuilder.

var word2 = word.Replace('r', 'd');

C# String has a Replace method but it does
not modify the original string. It creates a modified copy instead.

var builder = new StringBuilder("rock");
builder.Replace('r', 'd');

On the other hand, the StringBuilder replaces the string in-place.

Console.WriteLine(builder);

The Console.WriteLine method invokes the StringBuilder's
ToString method, which converts the value of the builder to a
string.

$ dotnet run
dock
dock

## C# StringBuilder Append and AppendLine

The Append method appends the string representation of a specified
object to the builder. The AppendLine method appends the default
line terminator to the end of the current StringBuilder object.

Program.cs
  

using System.Text;

var builder= new StringBuilder("There are");

builder.Append(" ");
builder.Append("three hawks ");
builder.Append("in the sky");

builder.AppendLine();

builder.AppendLine("The weather is beautiful");
builder.Append("The flowers blossom");

Console.WriteLine(builder);

The example builds a string using Append and AppendLine
methods.

var builder= new StringBuilder("There are");

builder.Append(" ");
builder.Append("three hawks ");
builder.Append("in the sky");

builder.AppendLine();

Here we add one sentence to the StringBuilder.

builder.AppendLine("The weather is beautiful");

We can add a sentence and a new line in one go.

$ dotnet run
There are three hawks in the sky
The weather is beautiful
The flowers blossom

## C# StringBuilder AppendJoin

The AppendJoin method concatenates the string representations of
the elements in the provided array of objects, using the specified separator
between each member and appends the result to the current instance of the string
builder.

Program.cs
  

using System.Text;

var words = new string[] { "in", "the", "sky"};
var builder = new StringBuilder("There are");

builder.Append(" ");
builder.Append("three hawks ");
builder.AppendJoin(" ", words);
builder.Append(".");

Console.WriteLine(builder);

In the program, we build a message with StringBuilder. Some of 
the words come from an array of strings.

$ dotnet run
There are three hawks in the sky.

## C# StringBuilder AppendFormat

The AppendFormat method allows to add a formatted string to the 
StringBuilder.

Program.cs
  

using System.Text;

string name = "Peter";
int age = 34;

var builder = new StringBuilder();

builder.AppendFormat("{0} is {1} years old", name, age);

Console.WriteLine(builder);

In the example, we build a string with AppendFormat.

$ dotnet run
Peter is 34 years old

## C# StringBuilder Insert

The Insert method is used to insert a string into the specified
position of the builder.

Program.cs
  

using System.Text;

var sentence = "There is a red fox in the forest.";
var builder = new StringBuilder(sentence);

builder.Insert(19, "and a wolf ");

Console.WriteLine(builder);

The example inserts a string into a sentence with the Insert 
method.

$ dotnet run
There is a red fox and a wolf in the forest.

## C# StringBuilder Replace

The Replace method replaces a substring in the string builder with 
the specified new string.

Program.cs
  

using System.Text;

var sentence = "I saw a red fox running into the forest.";
var builder = new StringBuilder(sentence);

var term = "fox";
var newterm = "dog";

int idx = builder.ToString().IndexOf(term);
int len = term.Length;

builder.Replace(term, newterm, idx, idx + len);

Console.WriteLine(builder);

The example replaces the word fox with dog.

int idx = builder.ToString().IndexOf(term);

We find the beginning index of the substring to be replaced.

int len = term.Length;

We get the length of the substring.

builder.Replace(term, newterm, idx, idx + len);

We call the Replace method. The first parameter is the old value, 
the second parameter the new value. The next two parameters are the starting 
index and the length of the substring.

$ dotnet run
I saw a red dog running into the forest.

## C# StringBuilder Remove

The Remove method removes the specified range of characters 
from this instance.

Program.cs
  

using System.Text;

var sentence = "There is a red fox in the forest.";
var builder = new StringBuilder(sentence);

builder.Remove(11, 3);
Console.WriteLine(builder);

builder.Remove(11, 1);
Console.WriteLine(builder);

The example deletes a few characters from a string.

builder.Remove(11, 3);

With the Remove method, we delete a substring.

builder.Remove(11, 1);

We delete another character.

$ dotnet run
There is a  fox in the forest.
There is a fox in the forest.

```
$ dotnet run
apple, banana, cherry, date, fig, grape

```

## C# StringBuilder Clear and reuse

The Clear method removes all characters from the
StringBuilder instance, allowing you to reuse the same object for
building new strings. This is useful in scenarios where you need to construct
multiple strings in a loop or method, reducing memory allocations and improving
performance.

Program.cs
  

using System.Text;

var builder = new StringBuilder();

builder.Append("First sentence.");
Console.WriteLine(builder);

builder.Clear();
builder.Append("Second sentence, after clearing.");
Console.WriteLine(builder);

In this example, the StringBuilder is used to build two different
strings. After outputting the first string, Clear is called to
reset the builder, and a new string is constructed. This approach is more
efficient than creating a new StringBuilder instance each time.

$ dotnet run
First sentence.
Second sentence, after clearing.

## Source

[StringBuilder class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.text.stringbuilder?view=net-8.0)

In this article we have worked with C# StringBuilder.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).