+++
title = "C# foreach"
date = 2025-08-27T23:23:05.392+01:00
draft = false
description = "C# foreach tutorial shows how to loop over
data in C# with foreach statement and forEach method. The foreach statement
executes a statement or a block of statements for each element in a collection
which implements IEnumerable."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# foreach

last modified January 17, 2024

 

In this article we show how to loop over data in C# with foreach
statement and forEach method.

foreach (var val in vals)
{
    ...
}

The foreach statement executes a statement or a block of statements
for each element in a collection which implements IEnumerable.

public void ForEach (Action&lt;T&gt; action);

The ForEach method performs the specified action on each element of
the List&lt;T&gt;.

## C# foreach array

In the following example, we go over elements of an array using the
foreach
statement.

Program.cs
  

int[] vals = [1, 2, 3, 4, 5];

foreach (var val in vals)
{
    Console.WriteLine(val);
}

The example prints all elements of the array of integers.

$ dotnet run
1
2
3
4
5

## C# foreach two-dimensional array

The next example loops over a two-dimensional array.

Program.cs
  

int[,] vals =
{
    {1, 2, 3, 4, 5},
    {6, 7, 8, 9, 10},
    {11, 12, 13, 14, 15}
};

foreach (var e in vals)
{
    Console.Write($"{e} ");
}

Console.WriteLine();

Console.WriteLine("------------------------------------");

foreach (int i in Enumerable.Range(0, vals.GetLength(0)))
{
    foreach (int j in Enumerable.Range(0, vals.GetLength(1)))
    {
        Console.Write($"{vals[i, j]}");
    }

    Console.WriteLine();
}

We have a two-dimensional array of integers. We loop over the values twice.

foreach (var e in vals)
{
    Console.Write($"{e} ");
}

Here, we loop over the elements one by one. 

foreach (int i in Enumerable.Range(0, vals.GetLength(0)))
{
    foreach (int j in Enumerable.Range(0, vals.GetLength(1)))
    {
        Console.Write($"{vals[i, j]}");
    }

    Console.WriteLine();
}

Using two foreach loops, we loop over the nested arrays.

$ dotnet run
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 
------------------------------------
1 2 3 4 5
6 7 8 9 10
11 12 13 14 15

## C# foreach List

In the following example, we loop over a list with the foreach
statement.

Program.cs
  

List&lt;string&gt; words = ["tea", "falcon", "book", "sky"];

foreach (var word in words)
{
    Console.WriteLine(word);
}

We print all elements of the list of strings.

$ dotnet run
tea
falcon
book
sky

## C# foreach list of lists

In the next example, we loop over a list of lists.

Program.cs
  

List&lt;List&lt;string&gt;&gt; words =
[
    new() {"tea", "falcon", "book", "sky"},
    new() {"cup", "crown", "borrow", "moore"},
    new() {"arm", "nice", "frost", "sea"}
];

foreach (var nested in words)
{
    foreach (var word in nested)
    {
        Console.WriteLine(word);
    }
}

To iterate over a list of lists, we use two foreach loops.

## C# foreach Dictionary

The following example loops over elements of a dictionary with
foreach statement.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

foreach (var pair in domains)
{
    Console.WriteLine($"{pair.Key} - {pair.Value}");
}

Console.WriteLine("-----------------------");

foreach ((var Key, var Value) in domains)
{
    Console.WriteLine($"{Key} - {Value}");
}

We have a dictionary of domains. Using the foreach statement,
we loop over the key/value pairs of the dictionary.

$ dotnet run
sk - Slovakia
ru - Russia
de - Germany
no - Norway
-----------------------
sk - Slovakia
ru - Russia
de - Germany
no - Norway

## C# forEach array

In the following example, we go over elements of an array using the
forEach method.

Program.cs
  

int[] vals = [1, 2, 3, 4, 5];

Array.ForEach(vals, e =&gt; Console.WriteLine(e));

The example prints all elements of the array of integers. We use the
Array.ForEach method.

## C# forEach List

In the following example, we loop over a list with the forEach
method.

Program.cs
  

List&lt;string&gt; words = ["tea", "falcon", "book", "sky"];

words.ForEach(e =&gt; Console.WriteLine(e));

We print all elements of the list of strings.

## C# foreach Dictionary

The following example loops over elements of a dictionary with
ForEach. In this case we also use Linq.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

domains.ToList().ForEach(pair =&gt; Console.WriteLine($"{pair.Key} - {pair.Value}"));

We call Linq's ToList method to transform the dictionary to a list
and then call the ForEach method.

## Source

[C# language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/)

In this article we have covered the foreach statement and the
forEach method in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).