+++
title = "C# field Keyword"
date = 2025-08-27T23:23:01.895+01:00
draft = false
description = "This C# field tutorial demonstrates how to
use the field keyword for declaring class fields in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# field Keyword

Last modified April 19, 2025

 

This tutorial explores how to use the field keyword in C# to
declare backing fields for auto-implemented properties.

The field keyword, introduced in C# 12, provides a way to
explicitly reference the backing field of an auto-implemented property,
enabling custom logic in property accessors while maintaining concise syntax.

## Understanding the field Keyword

In C#, auto-implemented properties automatically create a private backing
field. Before C# 12, developers had no direct way to access this field in
custom getter or setter logic. The field keyword addresses this
by allowing explicit reference to the backing field.

Key characteristics of field:

    - Only usable within property or indexer accessors.

    - Refers to the compiler-generated backing field of an auto-implemented property.

    - Enables custom logic without manually declaring a backing field.

    - Not a standalone variable; it's a contextual keyword.

## Basic field Usage

This example shows how to use field to validate a property value.

Program.cs
  

class Person
{
    private string _name = "Unknown";
    public string Name
    {
        get =&gt; field;
        set =&gt; field = string.IsNullOrEmpty(value) ? "Unknown" : value;
    }
}

var person = new Person();
person.Name = "";
Console.WriteLine(person.Name);
person.Name = "Alice";
Console.WriteLine(person.Name);

The Name property uses field to ensure the backing
field is never set to an empty or null string.

$ dotnet run
Unknown
Alice

## Property with Custom Getter Logic

This example uses field to modify the getter of a property.

Program.cs
  

class Product
{
    public decimal Price
    {
        get =&gt; field * 1.1m; // Apply 10% markup
        set =&gt; field = value &lt; 0 ? 0 : value;
    }
}

var product = new Product();
product.Price = 100;
Console.WriteLine(product.Price);
product.Price = -50;
Console.WriteLine(product.Price);

The Price property uses field to apply a markup in
the getter and prevent negative values in the setter.

$ dotnet run
110
0

## Using field with Indexers

This example demonstrates field in an indexer.

Program.cs
  

class Scores
{
    public int this[int index]
    {
        get =&gt; field;
        set =&gt; field = value &gt;= 0 &amp;&amp; value &lt;= 100 ? value : throw new ArgumentException("Score must be between 0 and 100.");
    }
}

var scores = new Scores();
scores[0] = 85;
Console.WriteLine(scores[0]);
try
{
    scores[1] = 150;
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

The indexer uses field to validate scores, ensuring they are
within a valid range.

$ dotnet run
85
Score must be between 0 and 100.

## Combining field with Init-Only Properties

This example shows field with an init-only property.

Program.cs
  

class Configuration
{
    public string ConnectionString
    {
        get =&gt; field;
        init =&gt; field = string.IsNullOrWhiteSpace(value) ? throw new ArgumentException("Invalid connection string") : value;
    }
}

var config = new Configuration { ConnectionString = "Server=localhost" };
Console.WriteLine(config.ConnectionString);
try
{
    var invalidConfig = new Configuration { ConnectionString = "   " };
}
catch (ArgumentException e)
{
    Console.WriteLine(e.Message);
}

The ConnectionString property uses field to enforce
valid initialization.

$ dotnet run
Server=localhost
Invalid connection string

## Using field for Lazy Initialization

This example demonstrates field for lazy initialization in a
property.

Program.cs
  

class DataCache
{
    public string Data
    {
        get =&gt; field ??= LoadData();
        set =&gt; field = value;
    }

    private string LoadData() =&gt; "Loaded from source";
}

var cache = new DataCache();
Console.WriteLine(cache.Data);
cache.Data = "Custom data";
Console.WriteLine(cache.Data);

The Data property uses field to lazily initialize
the backing field when first accessed.

$ dotnet run
Loaded from source
Custom data

## Best Practices

When using the field keyword:

    - Use field only when custom logic is needed in accessors.

    - Keep accessor logic simple to maintain readability.

    - Combine with validation to enforce business rules.

    - Avoid overusing field when standard auto-implemented properties suffice.

## Source

[field keyword - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/field)

This tutorial has demonstrated how to use the field keyword in
C# to work with backing fields of auto-implemented properties and indexers.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007. To
date, I have authored over 1,400 articles and 8 e-books. I possess more than ten
years of experience in teaching programming.

List [all C# tutorials](/csharp/).