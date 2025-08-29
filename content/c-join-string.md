+++
title = "C# join string"
date = 2025-08-27T23:23:12.246+01:00
draft = false
description = "C# join string tutorial shows how to join strings in C# with string.Join. The string.Join method concatenates the elements of a specified array or collection using the provided separator between each element."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# join string

last modified July 5, 2023

 

C# join string tutorial shows how to join strings in C# with string.Join.

## C# string.Join

The string.Join method concatenates the elements of a specified
array or collection using the provided separator between each element.

Join(Char, Object[])
Join(Char, String[])
Join(String, IEnumerable&lt;String&gt;)
Join(String, Object[])
Join(String, String[])
Join(Char, String[], Int32, Int32)
Join(String, String[], Int32, Int32)
Join&lt;T&gt;(Char, IEnumerable&lt;T&gt;)
Join&lt;T&gt;(String, IEnumerable&lt;T&gt;)

There are nine overloaded string.Join methods.

## C# join string - list of strings

The following example joins a list of strings.

Program.cs
  

var words = new List&lt;string&gt; {"falcon", "wood", "cloud", "cup", "sky", "water"};

var text = string.Join(',', words);
Console.WriteLine(text);

We have a list of words. We join all the words of the list with comma.

$ dotnet run
falcon,wood,cloud,cup,sky,water

## C# join string - specify elements to join

We can specify which elements to join.

Program.cs
  

var words = new string[] {"falcon", "wood", "cloud", "cup", "sky", "water"};

var text = string.Join(',', words, 0, 3);
Console.WriteLine(text);

In the example, we join the first three elements of the array.

var text = string.Join(',', words, 0, 3);

The third element is the starting index, the fourth is the number of elements 
to join.

$ dotnet run
falcon,wood,cloud

## C# join string - array of objects

We can join various types of objects in an array.

Program.cs
  

object[] vals = { 1, 2.3, false, "falcon" };

var text = string.Join("-", vals);
Console.WriteLine(text);

We have an array of objects: an integer, a floating point value, a boolean, and
a string. We join all these objects with a dash character.

$ dotnet run
1-2.3-False-falcon

## C# join string - LINQ and IEnumerable

In the following example, we use LINQ and the overloaded Join method, which 
uses IEnumerable.

Program.cs
  

var words = new List&lt;string&gt; {"sky", "cup", "ocean", "dry", "tool", "rust"};

var text = string.Join(",", words.Where(e =&gt; e.Length == 3));
Console.WriteLine(text);

We have a list of words. We join all words from the list that have three
letters.

$ dotnet run
sky,cup,dry

## C# join string - records

In the following example we join records.

Program.cs
  

var users = new List&lt;User&gt; { new ("John Doe", "garderner"), 
    new ("Roger Roe", "driver"), new ("Lucia Smith", "teacher")};

var text = string.Join("\n", users);
Console.WriteLine(text);

record User(string name, string occupation);

We have a list of users. We join them with a newline character.

$ dotnet run
User { name = John Doe, occupation = garderner }
User { name = Roger Roe, occupation = driver }
User { name = Lucia Smith, occupation = teacher }

## C# join string - create ASCII alphabet

In the next example, we create an ASCII alphabet.

Program.cs
  

int idx1 = 97;
int idx2 = 65;

var text = string.Join(" ", CreateAlphabet());
Console.WriteLine(text);

List&lt;char&gt; CreateAlphabet() {

    var vals = new List&lt;char&gt;();

    int span1 = idx1 + 25;
    for (int i = idx1; i &lt;= span1; i++) 
    {
        vals.Add(Convert.ToChar(i));
    }

    int span2 = idx2 + 25;
    for (int i = idx2; i &lt;= span2; i++) 
    {
        vals.Add(Convert.ToChar(i));
    }

    return vals;
}

In the ASCII table, there are 25 lower-case letters and 25 upper-case letters. 
Their indexes start from 97 and 65, respectively.

$ dotnet run
a b c d e f g h i j k l m n o p q r s t u v w x y z A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

## Source

[string.Join method](https://learn.microsoft.com/en-us/dotnet/api/system.string.join?view=net-8.0)

In this article we have joined strings in C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).