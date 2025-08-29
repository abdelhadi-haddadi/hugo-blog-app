+++
title = "C# closure"
date = 2025-08-27T23:22:50.450+01:00
draft = false
description = "C# closure tutorial defines closures and shows how to use them. A closure is an anonymous delegate which maintains access to free variables outside the definition of the block."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# closure

last modified July 5, 2023

 

C# closure tutorial defines closures and shows how to use them.

**Note:** The definition of closures may vary a bit in other
programming languages.

A closure is an anonymous delegate which maintains access to free variables
outside the definition of the block. It can still refer to the variables after
the method has finished executing.

var limit = 0;
Predicate&lt;int&gt; greaterThan = e =&gt; e &gt; limit;

We have an anonymous lambda expression that refers to the limit
variable, even thought it vas not declared in the block or passed as a
parameter.

## C# closure example

The following is a simple closure example.

Program.cs
  

var c = CreateCounter();

Console.WriteLine(c());
Console.WriteLine(c());
Console.WriteLine(c());
Console.WriteLine(c());
Console.WriteLine(c());

Func&lt;int&gt; CreateCounter()
{
    int c = 0;
    return () =&gt; c = c + 1;
}

The CreateCounter is called several times; after each call, the
state (value of c) is retained.

$ dotnet run
1
2
3
4
5

## C# closure example II

Closures are often used in LINQ code.

Program.cs
  

var vals = new int[] {-1, -2, 0, 1, 5, 3};

var limit = 0;
Func&lt;int, bool&gt; greaterThan = e =&gt; e &gt; limit;

var res = vals.Where(greaterThan);

foreach (var e in res)
{
    Console.WriteLine(e);
}

In the example, we define a filter delegate. The limit variable 
that is used in the predicate is a free variable defined outside of the 
predicate definition.

$ dotnet run 
1
3
5 

## C# closure example III

We use a closure in the iterator example.

Program.cs
  

var words = new List&lt;string&gt; { "sky", "cloud", "rock", "war", "web" };
var it = CreateIterator(words);

string e;

while ((e = it()) != null)
{
    Console.WriteLine(e);
}

Iterator&lt;T&gt; CreateIterator&lt;T&gt;(IList&lt;T&gt; data) where T : class
{
    var i = 0;
    return delegate { return (i &lt; data.Count) ? data[i++] : null; };
}

public delegate T Iterator&lt;T&gt;() where T : class;

We have a generic iterator. In order for the iterator to work, we must retain 
the state of the increment variable.

## Source

[What are closures in .NET?](https://stackoverflow.com/questions/428617/what-are-closures-in-net)

In this article we have worked with closures in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).