+++
title = "C# record"
date = 2025-08-29T19:51:18.850+01:00
draft = false
description = "C# record tutorial shows how to work with the record type in C#. A record is a reference type whose purpose is to hold data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# record

last modified July 5, 2023

 

C# record tutorial shows how to work with the record type in C#. 

A record is a reference type whose main purpose is to hold data. It is very
useful for data analysis. The record type simplifies code and improves its
readability, and removes unnecessary boilerplate.

The record type provides the following features:

    - concise syntax for data-centric objects

    - concise syntax for immutable data

    - value-based equality

    - concise syntax for non-destructive mutation

    - built-in formattting for printing

The compiler creates an override of Object.Equals(Object) and
Object.GetHashCode. It creates methods for == and
!= operators and implements the
System.IEquatable&lt;T&gt;. Records also provide an override of  
Object.ToString. 

While records share a lot of similarities with standard classes, they have
different purposes. Classes are used for defining complex hierarchies of objects
and their responsitilities, records excel in storing data for the purpose of 
their analysis.

**Note:** The record type is an important part of the functional 
programming philosophy. It is a very useful tool for data analysis.

Important functional languages, such as F# and Clojure, have record types since
their inception. The record type appeared in C# 9.0.

## C# record positional syntax

To easiest way to create a record is to use the *positional syntax*.

record User(string FirstName, string LastName, string occupation);

Using this syntax, the compiler automatically creates the following:

    a public init-only auto-implemented property for each positional
    parameter provided in the record declaration. 
    a primary constructor whose parameters match the positional parameters
    on the record declaration
    a Deconstruct method with an out parameter for each
    positional parameter provided in the record declaration

The data created with positional syntax is immutable. Data immutability is an 
important cornerstone of functional programming.

## C# record simple examples

In the following example, we create a simple record type.

Program.cs
  

var users = new List&lt;User&gt;
{
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
};

users.ForEach(Console.WriteLine);

Console.WriteLine(users[0].FirstName);
Console.WriteLine(users[0].LastName);
Console.WriteLine(users[0].Salary);

record User(string FirstName, string LastName, int Salary);

We create a User record in one line; we are ready to use it. 

users.ForEach(Console.WriteLine);

We traverse the list of users and print them to the console. Thanks to the
built-in formatting of records, we have a human-readable output for the records.

Console.WriteLine(users[0].FirstName);
Console.WriteLine(users[0].LastName);
Console.WriteLine(users[0].Salary);

The properties are automatically created.

$ dotner run
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Albert, LastName = Novak, Salary = 1930 }
John
Doe
1230

In the second example, we use a record type with LINQ.

Program.cs
  

var cars = new List&lt;Car&gt;
{
    new ("Audi", "red", 52642),
    new ("Mercedes", "blue", 57127),
    new ("Skoda", "black", 9000),
    new ("Volvo", "red", 29000),
    new ("Bentley", "yellow", 350000),
    new ("Citroen", "white", 21000),
    new ("Hummer", "black", 41400),
    new ("Volkswagen", "white", 21600),
};

var groups = from car in cars
             group car by car.Colour;

foreach (var group in groups)
{
    Console.WriteLine(group.Key);

    foreach (var car in group)
    {
        Console.WriteLine($" {car.Name} {car.Price}");
    }
}

record Car(string Name, string Colour, int Price);

We use LINQ expression to group our cars by their colours. Again, we have
defined the record type in one line. We focus on the data analysis and not on 
complex OOP techniques.

$ dotnet run
red
  Audi 52642
  Volvo 29000
blue
  Mercedes 57127
black
  Skoda 9000
  Hummer 41400
yellow
  Bentley 350000
white
  Citroen 21000
  Volkswagen 21600

## C# record equality

Records provide value-based equality. When we focus on data analysis, this is 
the expected behaviour. Classes on the other hand provide reference equality 
by default. To have value-based equality with classes, we have to add additional 
lines of code to the class definitions, which is often done with IDE generators
and is considered boilerplate.

Program.cs
  

var u1 = new User("John", "Doe", "gardener");
var u2 = new User("John", "Doe", "gardener");

Console.WriteLine(u1 == u2);

var p1 = new Person("Roger", "Roe", "driver");
var p2 = new Person("Roger", "Roe", "driver");

Console.WriteLine(p1 == p2);

record User(string FirstName, string LastName, string occupation);

class Person
{
    public Person(string firstName, string lastName, string occupation)
    {
        FirstName = firstName;
        LastName = lastName;
        Occupation = occupation;
    }

    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Occupation { get; set; }
}

In the example, we compare two records and two class objects having the same
data.

$ dotnet run
True
False

The records compare values while the class objects references. The second output
is False because p1 and p2 point to two different
objects in memory.

## C# record Deconstruct

With the positional syntax, we have the Deconstruct method
automatically implemented. 

Program.cs
  

var u = new User("John", "Doe", 980);

(string fname, string lname, int sal) = u;

Console.WriteLine($"{fname} {lname} earns {sal} per month");

record User(string FirstName, string LastName, int Salary);

A record's properties can be easily separated into variables with deconstrution
operation.

$ dotnet run
John Doe earns 980 per month

## C# record non-destructive mutation

In functional programming, we work with immutable data. When we need to modify 
data, we create modified copies of the original data, which is intact. 
This simple rule brings huge benefits in concurrent programming.

We can use the with keyword to get modified copies of our records.

Program.cs
  

var users = new List&lt;User&gt;
{
    new ("John", "Doe", 1230),
    new ("Lucy", "Novak", 670),
    new ("Ben", "Walter", 2050),
    new ("Robin", "Brown", 2300),
    new ("Amy", "Doe", 1250),
    new ("Joe", "Draker", 1190),
    new ("Janet", "Doe", 980),
    new ("Albert", "Novak", 1930),
};

var users2 = new List&lt;User&gt;();
users.ForEach(u =&gt; users2.Add(u with { Salary = u.Salary + 200 }));

users.ForEach(Console.WriteLine);

Console.WriteLine("---------------");

users2.ForEach(Console.WriteLine);

record User(string FirstName, string LastName, int Salary);

In the example, we have a list of users. We want to add a bonus to each user.
Rather than modifying the original list, we create a new one with their salaries
modified.

$ dotnet run
User { FirstName = John, LastName = Doe, Salary = 1230 }
User { FirstName = Lucy, LastName = Novak, Salary = 670 }
User { FirstName = Ben, LastName = Walter, Salary = 2050 }
User { FirstName = Robin, LastName = Brown, Salary = 2300 }
User { FirstName = Amy, LastName = Doe, Salary = 1250 }
User { FirstName = Joe, LastName = Draker, Salary = 1190 }
User { FirstName = Janet, LastName = Doe, Salary = 980 }
User { FirstName = Albert, LastName = Novak, Salary = 1930 }
---------------
User { FirstName = John, LastName = Doe, Salary = 1430 }
User { FirstName = Lucy, LastName = Novak, Salary = 870 }
User { FirstName = Ben, LastName = Walter, Salary = 2250 }
User { FirstName = Robin, LastName = Brown, Salary = 2500 }
User { FirstName = Amy, LastName = Doe, Salary = 1450 }
User { FirstName = Joe, LastName = Draker, Salary = 1390 }
User { FirstName = Janet, LastName = Doe, Salary = 1180 }
User { FirstName = Albert, LastName = Novak, Salary = 2130 }

## C# mutable record

It is possible to create a mutable record. However, when possible, the usage of 
immutable records is preferred.

Program.cs
  

var u = new User("John", "Doe", "gardener");
Console.WriteLine(u);

u.Occupation = "driver";
Console.WriteLine(u);

record User
{
    public User(string firstName, string lastName, string occupation)
    {
        FirstName = firstName;
        LastName = lastName;
        Occupation = occupation;
    }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Occupation { get; set; } = default!;
};

By implementing our own properties, we have a mutable record.

$ dotnet run
User { FirstName = John, LastName = Doe, Occupation = gardener }
User { FirstName = John, LastName = Doe, Occupation = driver }

## Web scraping example

To demonstrate the usefulness of records, we have a more complex example which 
scrapes data from a website. 

$ dotnet add package AngleSharp
$ dotnet add package CsvHelper

We need to add the AngleSharp and CsvHelper packages 
to the project.

Program.cs
  

using System.Collections.Generic;
using System.Globalization;
using AngleSharp;
using CsvHelper;

var config = Configuration.Default.WithDefaultLoader();
using var context = BrowsingContext.New(config);

var url = "https://nrf.com/resources/top-retailers/top-100-retailers/top-100-retailers-2019";
using var doc = await context.OpenAsync(url);

var htable = doc.GetElementById("stores-list--section-16266");
var trs = htable.QuerySelectorAll("tr").Skip(1);

var csvConfig = new CsvHelper.Configuration.CsvConfiguration(CultureInfo.CurrentCulture)
{
    ShouldQuote = args =&gt; false
};

using var fs = new StreamWriter("data.csv");
using var writer = new CsvWriter(fs, csvConfig);

var rows = new List&lt;Row&gt;();

foreach (var tr in trs)
{
    var tds = tr.QuerySelectorAll("td").Take(3);
    var fields = (from e in tds select e.TextContent).ToArray();
    var row = new Row(fields[0], fields[1], fields[2]);

    rows.Add(row);
}

writer.WriteRecords(rows);

record Row(string Rank, string Company, string Sales);

In the example, we scrape data from a website. In the HTML table, there are 
100 top retailers in the US. We connect to the website, parse the HTML table, 
and pick three of its columns. The parsed data is saved into a CSV file.
The example creates the Row record, which stores one row of the 
parsed data.

## Source

[Records - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record)

In this article we have covered C# record type. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).