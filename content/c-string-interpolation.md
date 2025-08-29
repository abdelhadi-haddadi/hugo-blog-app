+++
title = "C# String Interpolation"
date = 2025-08-29T19:51:30.040+01:00
draft = false
description = "This C# string interpolation tutorial demonstrates how to create strings using string interpolation techniques."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# String Interpolation

Last modified April 18, 2025

 

This tutorial explores how to perform string interpolation in C#.

In C#, strings can be constructed using either string formatting or string
interpolation. This tutorial focuses on the latter approach.

*String interpolation* involves embedding expressions within a string
literal, replacing them with their evaluated results. A string prefixed with the
$ character is an interpolated string, and expressions are enclosed
in curly braces {}.

An interpolated expression has the following structure:

{&lt;interpolationExpression&gt;[,&lt;alignment&gt;][:&lt;formatString&gt;]}

The interpolationExpression is the expression evaluated to produce
the result. The alignment specifies the minimum width of the
result's string representation. The formatString defines the
formatting style of the result.

## Simple Example

This example demonstrates basic string interpolation in C#.

Program.cs
  

string name = "John Doe";
int age = 34;

Console.WriteLine($"{name} is {age} years old");

DateTime now = DateTime.Now;
Console.WriteLine($"Today is {now.DayOfWeek}, it's {now:HH:mm}");

The program creates two interpolated strings with variables and a
formatted date.

string name = "John Doe";
int age = 34;

Two variables are defined for use in the first interpolated string.

Console.WriteLine($"{name} is {age} years old");

The $ prefix marks the interpolated string, and variables
are inserted within curly braces {}.

$ dotnet run
John Doe is 34 years old
Today is Sunday, it's 22:12

## String Interpolation Alignment

This example shows how to align text in interpolated strings.

Program.cs
  

List&lt;User&gt; users =
[
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
];

foreach (var user in users)
{
    string fname = $"{user.FirstName} {user.LastName}";
    Console.WriteLine($"|{fname, -15}|{user.Salary, 8}|");
}

record User(string FirstName, string LastName, int Salary);

The program displays a list of users, aligning names to the left and
salaries to the right.

string fname = $"{user.FirstName} {user.LastName}";

The first and last names are combined into a full name using
interpolation.

Console.WriteLine($"|{fname, -15}|{user.Salary, 8}|");

A negative alignment value left-aligns the text, while a positive value
right-aligns it.

$ dotnet run 
|John Doe       |    1230|
|Lucy Novak     |     670|
|Ben Walter     |    2050|
|Robin Brown    |    2300|
|Amy Doe        |    1250|
|Joe Draker     |    1190|
|Janet Doe      |     980|
|Albert Novak   |    1930|

## Format Strings

This example applies format strings to interpolated expressions.

Program.cs
  

DateTime now = DateTime.Now;

Console.WriteLine($"Short date: {now:d}");
Console.WriteLine($"Long date: {now:D}");
Console.WriteLine($"Short time: {now:t}");
Console.WriteLine($"Long time: {now:T}");
Console.WriteLine($"Month: {now:M}");
Console.WriteLine($"Year: {now:Y}");

The program formats the current date and time using various format
specifiers in interpolated strings.

$ dotnet run
Short date: 19. 1. 2024
Long date: Friday, January 19, 2024
Short time: 11:19
Long time: 11:19:22
Month: January 19
Year: January 2024

## Interpolated Strings with Newlines

Since C# 11, interpolated strings can include newlines for improved
readability.

Program.cs
  

List&lt;User&gt; users =
[
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
];

Console.WriteLine($"User with highest salary:\n{
    users.MaxBy(u =&gt; u.Salary)
}");

record User(string FirstName, string LastName, int Salary);

The program embeds a multiline LINQ expression within an interpolated
string, enhancing code clarity.

$ dotnet run
User with highest salary:
User { FirstName = Robin, LastName = Brown, Salary = 2300 }

## Raw Strings

Introduced in C# 11, raw strings allow unescaped text and are enclosed
by at least three double quotes.

Program.cs
  

var countries = new Dictionary&lt;string, string&gt;
{
    {"Russia", "Moscow"},
    {"Slovakia", "Bratislava"},
    {"Germany", "Berlin"},
    {"Hungary", "Budapest"},
};

foreach (var (k, v) in countries)
{
    Console.WriteLine($"""The capital of "{k}" is "{v}"  """);
}

Raw strings simplify handling text with quotes, as no escape sequences
are needed.

$ dotnet run
The capital of "Russia" is "Moscow"  
The capital of "Slovakia" is "Bratislava"  
The capital of "Germany" is "Berlin"  
The capital of "Hungary" is "Budapest"  

## Conditional Operator

When using a conditional operator in interpolation, enclose the colon in
parentheses to avoid conflicts.

Program.cs
  

var items = new Dictionary&lt;string, int&gt;
{
    {"ring", 2},
    {"lamp", 1},
    {"chair", 3},
    {"coin", 5},
    {"TV", 4},
    {"book", 4},
    {"pen", 1},
};

Console.WriteLine("List of items:");

foreach (var (k, v) in items)
{
    Console.WriteLine($"""{v} {k}{(v == 1 ? "" : "s")}""");
}

The program uses a conditional operator within an interpolated string to
handle pluralization.

$ dotnet run
List of items:
2 rings
1 lamp
3 chairs
5 coins
4 TVs
4 books
1 pen

## Number Formatting

This example demonstrates formatting numbers in interpolated strings.

Program.cs
  

double price = 49.99;
int quantity = 3;

Console.WriteLine($"Total cost: {price * quantity:C}");
Console.WriteLine($"Price per item: {price:F2}");
Console.WriteLine($"Quantity: {quantity:D3}");

The program formats currency, fixed-point, and padded integer values
using format specifiers.

$ dotnet run
Total cost: $149.97
Price per item: 49.99
Quantity: 003

## String Interpolation with Expressions

Interpolated strings can include complex expressions for dynamic
content.

Program.cs
  

int x = 5;
int y = 10;

Console.WriteLine($"The sum of {x} and {y} is {x + y}");
Console.WriteLine($"The product is {x * y}");
Console.WriteLine($"Is {x} less than {y}? {(x &lt; y ? "Yes" : "No")}");

The program embeds arithmetic and conditional expressions within
interpolated strings.

$ dotnet run
The sum of 5 and 10 is 15
The product is 50
Is 5 less than 10? Yes

## Interpolated Strings with Collections

This example uses interpolation to format collection data concisely.

Program.cs
  

List&lt;string&gt; fruits = ["apple", "banana", "orange"];
Console.WriteLine($"Favorite fruits: {string.Join(", ", fruits)}");
Console.WriteLine($"Total fruits: {fruits.Count}");

The program combines collection data and string joining within an
interpolated string.

$ dotnet run
Favorite fruits: apple, banana, orange
Total fruits: 3

## Multiline Raw Interpolated Strings

Raw interpolated strings can span multiple lines for complex formatting.

Program.cs
  

string name = "Alice";
int score = 95;

string message = $"""
    Dear {name},
    Your score is {score}.
    {(score &gt;= 90 ? "Excellent work!" : "Keep practicing!")}
    """;

Console.WriteLine(message);

The program uses a multiline raw interpolated string with embedded
expressions for a formatted message.

$ dotnet run
Dear Alice,
Your score is 95.
Excellent work!

## Source

[String interpolation in C#](https://learn.microsoft.com/en-us/dotnet/csharp/tutorials/string-interpolation)

This tutorial has demonstrated various techniques for string
interpolation in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since
2007. To date, I have authored over 1,400 articles and 8 e-books. I
possess more than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).