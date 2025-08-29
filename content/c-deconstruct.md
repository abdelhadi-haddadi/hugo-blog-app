+++
title = "C# deconstruct"
date = 2025-08-27T23:22:56.318+01:00
draft = false
description = "Learn how to deconstruct objects, tuples, and structs in C#. This tutorial covers unpacking variables efficiently using deconstruction techniques in .NET applications."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# deconstruct

last modified May 14, 2025

 

This C# deconstruction tutorial demonstrates how to unpack variables from
various data types, such as tuples, structs, and classes, into individual
components for more convenient access.

Deconstruction is the process of breaking down complex types into their
constituent parts. For example, a tuple can be split into individual elements,
or an object can be deconstructed into its properties for easier handling in
code.

## C# deconstruct tuple

In the next example we deconstruct tuples into items.

Program.cs
  

var user = ("John", "Doe", "gardener");

var (firstName, lastName, occupation) = user;

Console.WriteLine(firstName);
Console.WriteLine(lastName);
Console.WriteLine(occupation);

Console.WriteLine("-----------------");

var (fn, ln, oc) = getUser();

Console.WriteLine(fn);
Console.WriteLine(ln);
Console.WriteLine(oc);

(string, string, string) getUser()
{
    var fname = "John";
    var lname = "Doe";
    var occupation = "gardener";
    
    return (fname, lname, occupation);
}

A user tuple has three items; these items are unpacked into separate variables.

var (firstName, lastName, occupation) = user;

Here, we perform the deconstructing operation;

$ dotnet run
John
Doe
gardener
-----------------
John
Doe
gardener

Discards can be used for items that are not needed.

Program.cs
  

var user = ("John", "Doe", "gardener");
var (fname, lname, _) = user;

Console.WriteLine($"{fname} {lname}")

In this program, we use a discard for the third value.

## C# deconstruct dictionary

A dictionary consists of key/value pairs. These pairs can be unpacked into 
two separate variables.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

foreach ((string k, string v) in domains)
{
    Console.WriteLine($"{k}: {v}");
}

In a foreach loop, we unpack each pair into k and v
variables.

$ dotnet run
sk: Slovakia
ru: Russia
de: Germany
no: Norway

## C# deconstruct class

To deconstruct classes, we have to implement the Deconstruct
method.

Program.cs
  

var u = new User("John", "Doe", "gardener");
var (fname, lname, occupation) = u;

Console.WriteLine($"{fname} {lname} is a(n) {occupation}");

var (fn, ln) = u;
Console.WriteLine($"{fn} {ln}");

class User
{
    string FirstName { get; set; }
    string LastName { get; set; }
    string Occupation { get; set; }

    public User(string fname, string lname, string occupation)
    {
        FirstName = fname;
        LastName = lname;
        Occupation = occupation;
    }

    public void Deconstruct(out string fname, out string lname)
    {
        fname = FirstName;
        lname = LastName;
    }

    public void Deconstruct(out string fname, out string lname, 
        out string occupation)
    {
        fname = FirstName;
        lname = LastName;
        occupation = Occupation;
    }
}

We can have multiple Deconstruct methods.

var u = new User("John", "Doe", "gardener");
var (fname, lname, occupation) = u;

Here, we deconstruct the User type into three variables.

var (fn, ln) = u;
Console.WriteLine($"{fn} {ln}");

Here, we deconstruct the user into two variables.

public void Deconstruct(out string fname, out string lname)
{
    fname = FirstName;
    lname = LastName;
}

The variables that are deconstructed have the out modifier.

$ dotnet run
John Doe is a(n) gardener
John Doe

## C# deconstruct struct

We can deconstruct custom structs by implementing a Deconstruct
method.

Program.cs
  

var point = new Point(5, 10);
var (x, y) = point;

Console.WriteLine($"x: {x}, y: {y}");

struct Point
{
    public int X { get; }
    public int Y { get; }
    public Point(int x, int y) =&gt; (X, Y) = (x, y);
    public void Deconstruct(out int x, out int y)
    {
        x = X;
        y = Y;
    }
}

This example shows how to deconstruct a struct into its fields.

## C# deconstruct KeyValuePair

Dictionary entries can be deconstructed directly in a foreach loop using
KeyValuePair.

Program.cs
  

var dict = new Dictionary&lt;string, int&gt; { {"apple", 3}, {"banana", 5} };

foreach (var (key, value) in dict)
{
    Console.WriteLine($"{key} =&gt; {value}");
}

Here, each key/value pair is unpacked into separate variables in the loop.

## C# deconstruct record

Record types with positional parameters are automatically deconstructed; the 
compiler creates the Deconstruct method for us.

Program.cs
  

var user = new User("John", "Doe", "gardener");
var (firstName, lastName, occupation) = user;

Console.WriteLine($"{firstName} {lastName} is a(n) {occupation}");

record User(string FirstName, string LastName, string Occupation);

In the example, we unpack the User record.

## C# deconstruct extension method

In the next example, we create a Deconstruct extension method.

Program.cs
  

var dt = new DateTime(2021, 9, 16);
(int year, int month, int day) = dt;

Console.WriteLine(year);
Console.WriteLine(month);
Console.WriteLine(day);

public static class MyExtension
{
    public static void Deconstruct(this DateTime dateTime, out int year,
        out int month, out int day)
    {
        year = dateTime.Year;
        month = dateTime.Month;
        day = dateTime.Day;
    }
}

The program defines a Deconstruct method for the
DateTime type; it unpacks the type into its year, month, and day 
parts.

$ dotnet run
2021
9
16

## Source

[Deconstructing tuples and other types](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/deconstruct)

In this article we have worked with deconstructing operations in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).