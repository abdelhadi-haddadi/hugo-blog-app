+++
title = "C# extension method"
date = 2025-08-29T19:50:44.163+01:00
draft = false
description = "C# extension method tutorial shows how to define and use extension methods in C# language. An extension method is a method added to an object after the original object was compiled."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# extension method

last modified July 7, 2024

 

In this article we show how to define and use extension methods in C#.

## C# extension method

Extension methods are methods that can be inserted to existing types without
creating a new derived type, recompiling, or otherwise modifying the original
type.

Extension methods are static methods, but in C# they are called as if they were
normal C# methods. They use this modifier in their parameters.

Extension methods are only in scope when we explicitly import the namespace
into your source code with a using directive.

In the standard library, we can find plenty of extension methods, most notably
in LINQ.

## C# LINQ extension methods

LINQ is a mini language built into C# that brings more advanced query abilities.

Program.cs
  

string[] words = [ "falcon", "oak", "sky", "cloud", "tree", "tea", "water" ];

Console.WriteLine(words.First(word =&gt; word.Length == 3));
Console.WriteLine(words.Last(word =&gt; word.Length == 3));

The example prints the first and the last word that has three letters.

Console.WriteLine(words.First(word =&gt; word.Length == 3));
Console.WriteLine(words.Last(word =&gt; word.Length == 3));

Both First and Last are C# extension methods that are
defined in the System.Linq namespace.

$ dotnet run
oak
tea

## C# extension method example

In the following example, we add a new method to the string type.

Program.cs
  

var msg = "We walked for hours. We saw four hawks in the sky.";

int n = msg.WordCount();
Console.WriteLine(n);

public static class ExtensionMethods
{
    public static int WordCount(this string str)
    {
        return str.Split(new char[] { ' ', '.', '?' },
            StringSplitOptions.RemoveEmptyEntries).Length;
    }
}

The WordCount method is a static methods defined in a static class.
Its parameter contains the this keyword.

int n = msg.WordCount();

The method is called directly on the string.

$ dotnet run
11

## C# extension method example II

In the next example, we add an extension method to the int type.

Program.cs
  

int x = 20;
int y = -5;

Console.WriteLine(x.Abs());
Console.WriteLine(y.Abs());

public static class ExtensionMethods
{
    public static int Abs(this int val)
    {
        if (val &lt; 0)
        {
            return -val;
        }

        return val;
    }
}

The example adds the Abs method, which returns an absolute value
of the given integer.

$ dotnet run
20
5

## C# generic extension method

In the next example, we define a FindAll extension method for the
list type.

ExtensionMethods.cs
  

public static class ExtensionMethods
{
    public static List&lt;T&gt; FindAll&lt;T&gt;(this List&lt;T&gt; vals, List&lt;Predicate&lt;T&gt;&gt; preds)
    {
        List&lt;T&gt; data = new List&lt;T&gt;();

        foreach (T e in vals)
        {
            bool pass = true;

            foreach (Predicate&lt;T&gt; p in preds)
            {
                if (!(p(e)))
                {
                    pass = false;
                    break;
                }
            }

            if (pass) data.Add(e);
        }

        return data;
    }
}

The FindAll method returns list elements that fill all the
specified predicates.

public static List&lt;T&gt; FindAll&lt;T&gt;(this List&lt;T&gt; vals, List&lt;Predicate&lt;T&gt;&gt; preds)

The FindAll method takes a list of generic predicate functions as
a parameter. It returns a filtered generic list.

Program.cs
  

List&lt;Predicate&lt;int&gt;&gt; preds = [e =&gt; e &gt; 0, e =&gt; e % 2 == 0];

List&lt;int&gt; vals = [-3, -2, -1, 0, 1, 2, 3, 4];
var filtered = vals.FindAll(preds);

foreach (var e in filtered)
{

    Console.WriteLine(e);
}

Console.WriteLine("---------------------");

List&lt;string&gt; words = ["sky", "wrath", "wet", "sun", "pick", "who",
    "cloud", "war", "water", "jump", "ocean"];

List&lt;Predicate&lt;string&gt;&gt; preds2 = [e =&gt; e.StartsWith("w"), e =&gt; e.Length == 3];

var filtered2 = words.FindAll(preds2);

foreach (var e in filtered2)
{

    Console.WriteLine(e);
}

We define two lists: an integer list and a string list. From the integer list,
we filter out all positive even values. From the string list, we get all words
that start with 'w' and have three letters.

$ dotnet run
2
4
---------------------
wet
who
war

## C# Base64 extension methods

In the following example, we create extension methods for encoding and decoding
Base64 data. *Base64* is a group of similar binary-to-text encoding
schemes that represent binary data in a text string format.

Program.cs
  

using System.Text;

namespace Base64Ex;

class Program
{
    static void Main()
    {
        string msg = "one 🐘 and three 🐋";
        string base64 = msg.EncodeBase64();
        string msg2 = base64.DecodeBase64();

        Console.WriteLine(msg);
        Console.WriteLine(base64);
        Console.WriteLine(msg2);
    }
}

static class ExtensionMethods
{
    public static string EncodeBase64(this string value)
    {
        byte[] data = Encoding.UTF8.GetBytes(value);
        return Convert.ToBase64String(data);
    }

    public static string DecodeBase64(this string value)
    {
        byte[] data = System.Convert.FromBase64String(value);
        return Encoding.UTF8.GetString(data);
    }
}

The program creates the EncodeBase64 and DecodeBase64
extension methods.

string msg = "one 🐘 and three 🐋";
string base64 = msg.EncodeBase64();
string msg2 = base64.DecodeBase64();

The extension methods can be directly called on the string.

$ dotnet run
one 🐘 and three 🐋
b25lIPCfkJggYW5kIHRocmVlIPCfkIs=
one 🐘 and three 🐋

## Source

[Extention methods](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/extension-methods)

In this article we have worked with extension methods in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).