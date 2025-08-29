+++
title = "C# readonly"
date = 2025-08-29T19:51:17.761+01:00
draft = false
description = "C# readonly tutorial shows how to use the readonly keyword to create immutable fields in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# readonly

last modified February 16, 2025

 

In this article, we show how to use the readonly keyword in C#. The
readonly keyword is used to create immutable fields that can only
be assigned a value once, either at the time of declaration or in the
constructor.

The readonly keyword is particularly useful for creating fields
that should not change after initialization, ensuring immutability and improving
code safety.

The fields can be initialized either at the time of declaration or in the
constructor of the class. After initialization, the value of a
readonly field cannot be changed.

## Basic Usage of readonly

The following example demonstrates how to use the readonly keyword
to create an immutable field.

Program.cs
  

class Program
{
    // Declare a readonly field
    private readonly int _value;

    // Initialize the readonly field in the constructor
    public Program(int value)
    {
        _value = value;
    }

    public void PrintValue()
    {
        Console.WriteLine($"Value: {_value}");
    }
}

class MainClass
{
    static void Main()
    {
        var program = new Program(10);
        program.PrintValue();
    }
}

In this program, the _value field is declared as
readonly and initialized in the constructor. Once initialized, the
value of _value cannot be changed.

$ dotnet run
Value: 10

## The readonly vs const keywords

The following example demonstrates the difference between readonly
and const fields.

Program.cs
  

class Program
{
    // Declare a const field
    public const int ConstValue = 100;

    // Declare a readonly field
    public readonly int ReadonlyValue;

    public Program(int value)
    {
        ReadonlyValue = value;
    }
}

class MainClass
{
    static void Main()
    {
        Console.WriteLine($"Const Value: {Program.ConstValue}");

        var program = new Program(200);
        Console.WriteLine($"Readonly Value: {program.ReadonlyValue}");
    }
}

In this program, the ConstValue field is declared as
const, meaning its value must be assigned at compile time and
cannot be changed. The ReadonlyValue field is declared as
readonly, meaning its value can be assigned at runtime but cannot
be changed after initialization.

$ dotnet run
Const Value: 100
Readonly Value: 200

## readonly with Reference Types

The following example demonstrates how to use the readonly keyword
with reference types.

Program.cs
  

class Person
{
    public string? Name { get; set; }
}

class Program
{
    // Declare a readonly field of a reference type
    private readonly Person? _person;

    public Program(string name)
    {
        _person = new Person { Name = name };
    }

    public void Show() =&gt; Console.WriteLine($"Person Name: {_person?.Name}");

    public void ChangeName(string name) =&gt; _person.Name = name;
}

class MainClass
{
    static void Main()
    {

        var program = new Program("Alice");
        program.Show();

        program.ChangeName("Bob");
        program.Show();
    }
}

In this program, the _person field is declared as
readonly, meaning the reference to the Person object
cannot be changed after initialization. However, the properties of the
Person object can still be modified.

$ dotnet run
Person Name: Alice
Person Name: Bob

## Source

[C# readonly - Documentation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/readonly)

In this article, we have shown how to use the readonly keyword in C# to create immutable fields. The readonly keyword is a powerful tool for ensuring immutability and improving code safety.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).