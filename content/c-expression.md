+++
title = "C# expression"
date = 2025-08-29T19:50:44.154+01:00
draft = false
description = "Explore C# expressions with this in-depth tutorial. Learn lambda, switch, query, and interpolated string expressions through practical examples."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# expression

last modified April 22, 2025

 

This article explores the use of expressions in C# programming.

An expression is a code unit that evaluates to a single value.

Expressions consist of operands and operators, where operators specify the
operations to be performed on the operands.

C# supports various types of expressions, including:

- lambda expressions

- query expressions

- switch expressions

- with expressions

- interpolated string expressions

- expression body definitions

Func square = (int x) =&gt; x * x;

The right side of this assignment features a function body expression, which
yields a computed value.

Console.WriteLine("falcon");

Conversely, a *statement*, like console output, does not produce a value.

## C# lambda expression

A *lambda expression* is an anonymous function without a fixed
identifier, using the =&gt; operator to separate parameters from the
body.

Program.cs
  

int[] vals = { 1, -2, 3, 4, 0, -3, 2, 1, 3 };

var res = Array.FindAll(vals, (e) =&gt; e &gt; 0);
Console.WriteLine(string.Join(" ", res));

This example filters positive integers from an array using a lambda expression
(e) =&gt; e &gt; 0 as a predicate for Array.FindAll.

$ dotnet run
1 3 4 2 1 3

## C# query expression

A *query expression* enables data extraction and transformation in C#
through structured queries.

Program.cs
  

int[] vals = { -2, 4, 6, -1, 2, 0, 1, -3, -4, 2, 3, 8 };

var evens = 
    from val in vals
    where val % 2 == 0
    select val;

Console.WriteLine(string.Join(" ", evens));

This example employs a query expression to identify all even numbers in an
array of integers.

$ dotnet run
-2 4 6 2 0 -4 2 8

## C# switch expression

A *switch expression* facilitates branching by comparing an expression
against patterns, returning the value of the matched arm, unlike traditional
switch statements.

Program.cs
  

int age = 23;
string name = "Peter";

List colors = new List {"blue", "khaki", "orange"};
var nums = new int[] {1, 2, 3, 4, 5};

Console.WriteLine(check(age));
Console.WriteLine(check(name));
Console.WriteLine(check(colors));
Console.WriteLine(check(nums));

object check(object val) =&gt; val switch 
{
    int =&gt; "integer",
    string =&gt; "string",
    List =&gt; "list of strings",
    Array =&gt; "array",
    _ =&gt; "unknown"
};

This example uses a switch expression to determine the data type of various
variables.

$ dotnet run
integer
string
list of strings
array

## C# with expression

A *with expression* creates a modified copy of an operand, altering
specified properties or fields.

Program.cs
  

Point p1 = new Point(0, 0);
Point p2 = p1 with { y = 3 };

Console.WriteLine(p1);
Console.WriteLine(p2);

record Point(int x, int y);

This example generates a copy of a point, modifying its y
coordinate to 3 using a with expression.

$ dotnet run
Point { x = 0, y = 0 }
Point { x = 0, y = 3 }

## C# interpolated string expressions

Interpolated string expressions, prefixed with $, allow embedding
expressions within strings for dynamic formatting.

Program.cs
  

int x = 5;
int y = 6;

Console.WriteLine($"{x} * {y} = {x * y}");

This example constructs a formatted string by embedding a multiplication
expression within an interpolated string.

$ dotnet run
5 * 6 = 30

## C# expression body definitions

*Expression body definitions* offer a concise syntax for defining
functions, constructors, properties, indexers, or finalizers.

Program.cs
  

Func square = (int x) =&gt; x * x;

int r = square(5);
Console.WriteLine(r);

var u = new User("John Doe", "gardener");
Console.WriteLine(u);

class User
{
    public User(string name, string occupation) =&gt;
        (Name, Occupation) = (name, occupation);

    public string Name { get; set; }
    public string Occupation { get; set; }

    public override string ToString() =&gt; $"{Name} is a {Occupation}";
}

This program demonstrates expression body definitions for a square
function, a User constructor, and a ToString method.

$ dotnet run
25
John Doe is a gardener

## Source

[Expressions - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/expressions)

This article has demonstrated working with various expressions in C#.

## Author

I am Jan Bodnar, a dedicated programmer with extensive experience in software
development. Since 2007, I have authored over 1,400 programming articles and
eight e-books. With more than a decade of teaching programming, I share my
expertise through comprehensive tutorials.

List [all C# tutorials](/csharp/).