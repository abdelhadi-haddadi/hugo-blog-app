+++
title = "C# LINQ SelectMany"
date = 2025-08-29T19:51:00.088+01:00
draft = false
description = "C# LINQ SelectMany tutorial shows how to flatten sequences into a single sequence in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# LINQ SelectMany

last modified July 5, 2023

 

In this article we show how to flatten sequences into a single sequence with
LINQ's SelectMany method.

Language-Integrated Query (LINQ) is a domain-specific language for querying data
from various data sources, including arrays, lists, XML files, or databases.

The SelectMany method flattens a number of sequences into a single
sequence.

## C# LINQ SelectMany array of arrays

The first example is a simple program which uses LINQ SelectMany
method.

Program.cs
  

int[][] vals = {
    new[] {1, 2, 3},
    new[] {4},
    new[] {5, 6, 6, 2, 7, 8},
};

var res = vals.SelectMany(a =&gt; a).OrderBy(e =&gt; e);
Console.WriteLine(string.Join(", ", res));

In the program, we have an array of arrays. With the SelectMany
method, we flatten the two-dimensional array into an one-dimensional array
values. The values are also ordered.

$ dotnet run
1, 2, 2, 3, 4, 5, 6, 6, 7, 8

## C# LINQ SelectMany Distinct

The Distinct method is used to get unique values.

Program.cs
  

var vals = new List&lt;List&lt;int&gt;&gt; {
    new List&lt;int&gt; {1, 2, 3, 3},
    new List&lt;int&gt; {4},
    new List&lt;int&gt; {5, 6, 6, 7, 7}
};

var res = vals.SelectMany(list =&gt; list)
              .Distinct()
              .OrderByDescending(e =&gt; e);

Console.WriteLine(string.Join(", ", res));

In the program, we flatten all integers from a list of lists into a single
sequence. We pick up only unique values and order them in descending order.

$ dotnet run
7, 6, 5, 4, 3, 2, 1

## C# LINQ SelectMany string list

In the next example, we apply the SelectMany method on a list of 
strings.

Program.cs
  

var ru_words = new List&lt;string&gt; { "осторожность", "собака", "облако", "чашка" };

var res = ru_words.SelectMany(e =&gt; e);
Console.WriteLine(string.Join(",", res));

We define a list of Russian words. The SelectMany cuts the words 
into letters and forms a single sequence from them.

$ dotnet run
о,с,т,о,р,о,ж,н,о,с,т,ь,с,о,б,а,к,а,о,б,л,а,к,о,ч,а,ш,к,а

## C# LINQ SelectMany on record field

The next example applies the SelectMany method on a record field.

Program.cs
  

var users = new List&lt;User&gt; 
{ 
    new ("John", "Doe", new List&lt;string&gt; { "red", "blue" }),
    new ("Roger", "Roe", new List&lt;string&gt; { "black", "yellow" }),
    new ("Jerry", "Dane", new List&lt;string&gt; { "blue", "orange", "white" }),
    new ("Thomas", "Green", new List&lt;string&gt; { "brown" }),
};

List&lt;string&gt; res = users.SelectMany(e =&gt; e.colours).ToList();
Console.WriteLine(string.Join(",", res));

record User(string fname, string lname, List&lt;string&gt; colours);

We have a list of users, who have their favourite colours specified. The colours 
are defined as a list of strings inside a record type.

List&lt;string&gt; res = users.SelectMany(e =&gt; e.colours).ToList();

The flattening operation is applied on the colours fields of the 
records.

$ dotnet run
red,blue,black,yellow,blue,orange,white,brown

## C# LINQ Select

We can perform the same operations with Select; the
SelectMany is more convenient.

Program.cs
  

var users = new List&lt;User&gt; 
{ 
    new ("John", "Doe", new List&lt;string&gt; { "red", "blue" }),
    new ("Roger", "Roe", new List&lt;string&gt; { "black", "yellow" }),
    new ("Jerry", "Dane", new List&lt;string&gt; { "blue", "orange", "white" }),
    new ("Thomas", "Green", new List&lt;string&gt; { "brown" }),
};

IEnumerable&lt;List&lt;string&gt;&gt; res = users.Select(e =&gt; e.colours).ToList();

List&lt;string&gt; colours = new List&lt;string&gt;();

foreach(var cols in res)
{
    foreach (var col in cols)
    {
        colours.Add(col);
    }
}

Console.WriteLine(string.Join(",", colours));

colours.Clear();

foreach (var data in res)
{
    colours.AddRange(data);
}

Console.WriteLine(string.Join(",", colours));

record User(string fname, string lname, List&lt;string&gt; colours);

In the example we flatten all favourite colours into a list of strings. 

foreach(var cols in res)
{
    foreach (var col in cols)
    {
        colours.Add(col);
    }
}

In the first case, we use two foreach loops.

foreach (var data in res)
{
    colours.AddRange(data);
}

In the second case, we use a foreach loop and the AddRange method.

$ dotnet run
red,blue,black,yellow,blue,orange,white,brown
red,blue,black,yellow,blue,orange,white,brown

## Source

[Enumerable.SelectMany method](https://learn.microsoft.com/en-us/dotnet/api/system.linq.enumerable.selectmany?view=net-8.0)

In this article we have presented the LINQ SelectMany method.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).