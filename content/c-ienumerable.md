+++
title = "C# IEnumerable"
date = 2025-08-27T23:23:09.952+01:00
draft = false
description = "C# IEnumerable tutorial covers the IEnumerable interface, which is a standard C# interface that enables iterating over collections using foreach loops."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# IEnumerable

last modified February 2, 2024

 

In this article we explain the C# IEnumerable interface.

IEnumerable is a standard C# interface that enables iterating over
collections using the foreach loops. IEnumerable uses
IEnumerator internally. It is used to perform the iterations. It
controls moving from one element to the next in the list.

Objects implementing the IEnumerable interface must define the
GetEnumerator method, which returns the IEnumerator.
The IEnumerator implements the MoveNext,
Reset and Current methods.

In addition, IEnumerable also enables generators in C#, using
yield return and yield break statements and it is used
in combination with LINQ for data manipulation in collections.

## Enabling foreach interations

IEnumerable enables seamless interaction with foreach
keyword.

Program.cs
  

IEnumerable&lt;int&gt; range = Enumerable.Range(1, 6);
List&lt;string&gt; words = ["sky", "cup", "beer"];
IEnumerable&lt;char&gt; chars = "an old falcon".AsEnumerable();
decimal[] vals = [1m, 2m, 3m];

DoIteration(range);
DoIteration(words);
DoIteration(chars);
DoIteration(vals.AsEnumerable());

void DoIteration&lt;T&gt;(IEnumerable&lt;T&gt; vals)
{
    foreach (var e in vals)
    {
        Console.Write($"{e} ");
    }

    Console.WriteLine();
}

In the program, we define a generic DoIteration method that
iterates over a range of numbers, list of words, sequence of characters and an
array of chars. 

IEnumerable&lt;char&gt; chars = "an old falcon".AsEnumerable();

A string is transformed into a sequence of chars with AsEnumerable.

void DoIteration&lt;T&gt;(IEnumerable&lt;T&gt; vals)

The DoIteration method takes a generic IEnumerable
as a parameter.

foreach (var e in vals)
{
    Console.Write($"{e} ");
}

We go through the passed parameters with foreach.

$ dotnet run
1 2 3 4 5 6
sky cup beer
a n   o l d   f a l c o n
1 2 3

## IEnumerable and generators

The next program we creates an IEnumerable of tuples from a
generator.

Program.cs
  

int n = 10;

IEnumerable&lt;string&gt; res = FibSeq().TakeWhile(f =&gt; f.n &lt;= n).Select(f =&gt; $"{f.fib}");
Console.WriteLine(string.Join(" ", res));

IEnumerable&lt;(int n, int fib)&gt; FibSeq()
{
    yield return (0, 0);
    yield return (1, 1);

    var (x, y, n) = (1, 0, 0);

    while (x &lt; int.MaxValue - y)
    {
        (x, y, n) = (x + y, x, n + 1);
        yield return (n, x);
    }
}

In the example, we calculate the Fibonacci sequence.

IEnumerable&lt;string&gt; res = FibSeq().TakeWhile(f =&gt; f.n &lt;= n).Select(f =&gt; $"{f.fib}");

We consume the Fibonacci sequence with the LINQ's TakeWhile method.

Console.WriteLine(string.Join(" ", res));

The sequence of strings is joined.

IEnumerable&lt;(int n, int fib)&gt; FibSeq()
{
    yield return (0, 0);
    yield return (1, 1);

    var (x, y, n) = (1, 0, 0);

    while (x &lt; int.MaxValue - y)
    {
        (x, y, n) = (x + y, x, n + 1);
        yield return (n, x);
    }
}

The FibSeq method returns a sequence of tuple values. Each tuple
contains the n value, up to which we generate the sequence and 
the current Fibonacci value fib.

yield return (0, 0);
yield return (1, 1);

The first two tuples are returned with yield return.

var (x, y, n) = (1, 0, 0);

while (x &lt; int.MaxValue - y)
{
    (x, y, n) = (x + y, x, n + 1);
    yield return (n, x);
}

The rest of the sequence is calculated with a while loop. The sequence goes 
up to int.MaxValue.

## IEnumerable with a custom class

In the next example we create an enumerable custom class.

Program.cs
  

using System.Collections;

Bag bag = new();

foreach (object e in bag)
{
    Console.WriteLine(e);
}

class Bag : IEnumerable&lt;object&gt;
{
    private readonly object[] data = [1, "falcon", 4.4m, new DateTime(2024, 01, 31)];

    public IEnumerator&lt;object&gt; GetEnumerator()
    {
        foreach (var item in data)
        {
            yield return item;
        }
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

We define a Bag class which can be traversed with a foreach
loop.

class Bag : IEnumerable&lt;object&gt;
{
    private readonly object[] data = [1, "falcon", 4.4m, new DateTime(2024, 01, 31)];

    public IEnumerator&lt;object&gt; GetEnumerator()
    {
        foreach (var item in data)
        {
            yield return item;
        }
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}

The custom class implements the IEnumerable interface. The
Bag class defines the GetEnumerator method. It
generates data from the data array with yield return.

$ dotnet run
1
falcon
4,4
31. 1. 2024 0:00:00

## IEnumerable with query expressions

LINQ query expressions return IEnumerables, which can be iterated 
later with foreach.

Program.cs
  

IEnumerable&lt;int&gt; vals = from value in Enumerable.Range(0, 5)
                              select value;

foreach (var e in vals)
{
    Console.WriteLine(e);
}

List&lt;string&gt; words = [ "sky", "forest", "war", "buy",
    "crypto", "cup", "water", "cloud" ];

IEnumerable&lt;string&gt; res = from word in words
                                where word.StartsWith('c')
                                select word;

Console.WriteLine(string.Join(',', res));

In the example, we iterate over two query expressions: a range of integers and 
a list of words.

$ dotnet run 
0
1
2
3
4
crypto,cup,cloud

## Source

[IEnumerable&lt;T&gt; Interface - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ienumerable-1?view=net-8.0)

In this article we have covered the C# IEnumerable interface.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).