+++
title = "C# tutorial"
date = 2025-08-29T20:03:03.191+01:00
draft = false
description = "C# tutorial teaches the basics and some advanced topics of the C# language. The tutorial is suitable for beginners and intermediate programmers."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# tutorial

last modified January 22, 2024

This is C# tutorial. In this tutorial you will learn the basics of the C#
language.

The basics of C# are covered in [C# basics](/csharp/basics/),
[C# lexical structure](/csharp/lexical-structure/),
[C# variable](/csharp/variable/),
[C# statement](/csharp/statement/),
[C# flow control](/csharp/flow-control/),
[C# operator](/csharp/operator/),
[C# data type](/csharp/data-type/).

Object-oriented programming is covered in [C# class](/csharp/class/),
[C# object](/csharp/object/), and [C# OOP](/csharp/oop/).

## C#

C# is a modern, high-level, general-purpose, object-oriented programming
language. It is the principal language of the .NET. It supports functional,
procedural, generic, object-oriented, and component-oriented programming
disciplines.

The design goals of the language were software robustness, durability and
programmer productivity. It can be used to create console applications, GUI
applications, web applications, both on PCs and embedded systems. C# was created
by Microsoft corporation.

## .NET

.NET is an open-source, general-purpose development platform maintained by
Microsoft and the .NET community on GitHub. With .NET, we can use multiple
languages, editors, and libraries to build for web, mobile, desktop, games, and
IoT.

$  dotnet --version
8.0.101

In order to work with .NET, we need to dowload and install .NET SDK. The .NET 8
supports C# 12.0.

## Compiling C# programs

After installing .NET SDK, we can build our first C# program.

$ dotnet new console -o Simple

With the dotnet new console command, we create a new console
application.

Program.cs
  

Console.WriteLine("This is C#");

This is a simple C# program that prints a message to the console.

$ dotnet run
This is C#

We compile and run a simple C# program with dotnet run.

## Visual Studio Code

Visual Studio Code is a lightweight, powerful, modern source code editor which
is available for Windows, macOS and Linux. It comes with built-in support for
JavaScript, TypeScript and Node.js and has a rich ecosystem of extensions for
other languages and runtimes including C# and .NET.

It includes support for debugging, embedded Git control, syntax highlighting,
intelligent code completion, snippets, and code refactoring.

## Source

[C# language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/)

List [all C# tutorials](/csharp/).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.