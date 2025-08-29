+++
title = "C# Assert"
date = 2025-08-27T23:22:43.608+01:00
draft = false
description = "C# Assert tutorial shows how to use the Assert class for debugging and testing in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Assert

last modified February 15, 2025

 

In this article, we show how to use the Assert class in C#. The
Assert class is part of the System.Diagnostics
namespace and is used for debugging and testing to validate conditions. If a
condition is not met, the Assert method throws an exception,
helping you identify issues in your code.

The Assert class is particularly useful for unit testing and
debugging, as it allows you to verify assumptions and catch errors early in the
development process.

## Basic Usage of Assert

The following example demonstrates how to use the Assert class to
validate a condition.

Program.cs
  

int x = 10;
int y = 20;

// Assert that x is less than y
Debug.Assert(x &lt; y, "x should be less than y");

Console.WriteLine("Assertion passed.");

In this program, the Debug.Assert method is used to validate that
x is less than y. If the condition is false, the
program will throw an exception with the specified message.

$ dotnet run
Assertion passed.

If the condition is not met, the program will output:

$ dotnet run
Debug Assertion Failed: x should be less than y

## Assert with Custom Message

The following example demonstrates how to use the Assert class with
a custom error message.

Program.cs
  

int age = 15;

// Assert that age is greater than or equal to 18
Debug.Assert(age &gt;= 18, "Age must be at least 18");

Console.WriteLine("Assertion passed.");

In this program, the Debug.Assert method is used to validate that
age is greater than or equal to 18. If the condition is false, the
program will throw an exception with the specified message.

$ dotnet run
Debug Assertion Failed: Age must be at least 18

## Assert with Complex Conditions

The following example demonstrates how to use the Assert class with
complex conditions.

Program.cs
  

string name = "Alice";
int length = name.Length;

// Assert that the name is not null and has a length greater than 0
Debug.Assert(!string.IsNullOrEmpty(name) &amp;&amp; length &gt; 0, "Name must not be null or empty");

Console.WriteLine("Assertion passed.");

In this program, the Debug.Assert method is used to validate that
name is not null or empty and has a length greater than 0. If the
condition is false, the program will throw an exception.

$ dotnet run
Assertion passed.

## Disabling Assertions

By default, assertions are only active in debug builds. To disable assertions,
you can define the DEBUG constant or use the
Conditional attribute. The following example demonstrates how to
disable assertions.

Program.cs
  

#define DEBUG // Comment this line to disable assertions

using System.Diagnostics;

int x = 10;
int y = 5;

// Assert that x is less than y
Debug.Assert(x &lt; y, "x should be less than y");

Console.WriteLine("Assertion passed.");

In this program, the DEBUG constant is defined to enable
assertions. If you comment out the #define DEBUG line, assertions
will be disabled, and the program will not throw an exception.

$ dotnet run
Debug Assertion Failed: x should be less than y

## Source

[C# Assert - Documentation](https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics.debug.assert)

In this article, we have shown how to use the Assert class in C#
for debugging and testing. The Assert class is a powerful tool for
validating conditions and catching errors early in the development process.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).