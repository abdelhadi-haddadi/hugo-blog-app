+++
title = "C# object & collection initializers"
date = 2025-08-29T19:51:10.634+01:00
draft = false
description = "C# object & collection initializers tutorial shows how to initiate objects and collections with initializers."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# object &amp; collection initializers

last modified July 5, 2023

 

C# object &amp; collection initializers tutorial shows how to initiate objects and
collections with initializers. 

With object initializers, we can assign values to any accessible fields or
properties of an object at creation time without having to invoke a constructor
followed by lines of assignment statements. (We cannot use object initializers 
on records.)

## C# object initializer

In the following example, we use an object initializer.

Program.cs
  

var u1 = new User { FirstName = "John", LastName = "Doe", Occupation = "gardener" };
var u2 = new User { LastName = "Roe", Occupation = "driver", FirstName = "Roger" };

Console.WriteLine(u1);
Console.WriteLine(u2);

class User
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Occupation { get; set; }

    public override string ToString()
    {
        return $"User {FirstName} {LastName} {Occupation}";
    }
}

We create two users utilizing the object initializer syntax. 

var u1 = new User { FirstName = "John", LastName = "Doe", Occupation = "gardener" };

We use a pair of {} brackets; the fields are separated with a comma 
character.

var u2 = new User { LastName = "Roe", Occupation = "driver", FirstName = "Roger" };

The order of the fields is not relevant.

$ dotnet run
User John Doe gardener
User Roger Roe driver

## C# object initializer with anonymous type

We can create anonymous types with object initializers; this is useful in LINQ 
expressions.

Program.cs
  

var u1 = new { FirstName = "John", LastName = "Doe", Occupation = "gardener" };
var u2 = new { FirstName = "Roger", LastName = "Roe", Occupation = "driver" };

Console.WriteLine(u1);
Console.WriteLine(u2);

The example creates two users.

$ dotnet run
{ FirstName = John, LastName = Doe, Occupation = gardener }
{ FirstName = Roger, LastName = Roe, Occupation = driver }

In the next example, we use an anonymous type in a LINQ query expression.

Program.cs
  

var users = new List&lt;User&gt;
{
  new (1, "John", "Doe", "London", "gardener", "2001-04-01", 860),
  new (2, "Lenny", "Ferguson", "New York", "programmer", "1997-12-11", 980),
  new (3, "Andrew", "Ramos", "Boston", "shop keeper", "1987-02-22", 600),
  new (4, "Peter", "Stastny", "Prague", "retired", "1936-03-24", 500),
  new (5, "Anna", "Fabry", "Bratislava", "accountant", "1973-11-18", 780),
  new (6, "Albert", "Markovic", "Bratislava", "lawyer", "1940-12-11", 1250),
  new (7, "Adam",  "Palffy", "Trnava", "policeman", "1983-12-01", 890),
  new (8, "Robert", "Palkovic", "Bratislava", "veterinary", "1965-05-15", 990),
};

var data = from user in users
           select new { user.FirstName, user.LastName, user.Salary };

foreach (var u in data)
{
    Console.WriteLine(u);
}

record User(int Id, string FirstName, string LastName, string City,
    string Occupation, string DateOfBirth, decimal Salary);

We have a list of users where each user has seven properties. In the LINQ query 
expression, we generate a list of anonymous types, where each item has only a 
subset of the properties.

$ dotnet run
{ FirstName = John, LastName = Doe, Salary = 860 }
{ FirstName = Lenny, LastName = Ferguson, Salary = 980 }
{ FirstName = Andrew, LastName = Ramos, Salary = 600 }
{ FirstName = Peter, LastName = Stastny, Salary = 500 }
{ FirstName = Anna, LastName = Fabry, Salary = 780 }
{ FirstName = Albert, LastName = Markovic, Salary = 1250 }
{ FirstName = Adam, LastName = Palffy, Salary = 890 }
{ FirstName = Robert, LastName = Palkovic, Salary = 990 }

## C# list initializer

In the following example, we use a list initializer.

Program.cs
  

var vals = new List&lt;int&gt; { 1, -2, -1, 0, 2, 4, 3, -5 };

var positive = from val in vals
               where val &gt; 0
               select val;

Console.WriteLine(string.Join(" ", positive));

We have a list of integers. We apply a query expression on the list.

var vals = new List&lt;int&gt; { 1, -2, -1, 0, 2, 4, 3, -5 };

The list collection is initialized in one go; all the elements are specified 
within the pair of {} brackets.

$ dotnet run
1 2 4 3

In the next example, we use a list initializer with a User type.

Program.cs
  

var users = new List&lt;User&gt;
{
    new User {FirstName="John", LastName="Doe", Occupation="gardener"},
    new User {FirstName="Roger", LastName="Roe", Occupation="driver"},
};

foreach (var user in users)
{
    Console.WriteLine(user);
}

class User
{
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public string Occupation { get; init; }

    public override string ToString()
    {
        return $"User {FirstName} {LastName} {Occupation}";
    }
}

In this example, we work create a list of users utilizing the list initializer
syntax.

$ dotnet run
User John Doe gardener
User Roger Roe driver

## C# Dictionary initializers

Dictionary initializers can be specified in two ways.

Program.cs
  

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

Console.WriteLine(domains["sk"]);

var days = new Dictionary&lt;string, string&gt;
{
    ["mo"] =  "Monday",
    ["tu"] =  "Tuesday",
    ["we"] =  "Wednesday",
    ["th"] =  "Thursday",
    ["fr"] =  "Friday",
    ["sa"] =  "Saturday",
    ["su"] =  "Sunday"
};

Console.WriteLine(days["fr"]);

The example creates two dictionaries.

var domains = new Dictionary&lt;string, string&gt;
{
    {"sk", "Slovakia"},
    {"ru", "Russia"},
    {"de", "Germany"},
    {"no", "Norway"}
};

A new dictionary is created. Between the angle brackets &lt;&gt;,
we specify the data type of the keys and values. New pairs of key/value
elements are written inside nested {} brackets; each pair
is separated by a comma character. For instance, the "sk" key
refers to the "Slovakia" value.

Console.WriteLine(domains["sk"]);

To get a value, we specify the dictionary name followed by square []
brackets. Between the brackets, we specify the key name.

var days = new Dictionary&lt;string, string&gt;
{
    ["mo"] =  "Monday",
    ["tu"] =  "Tuesday",
    ["we"] =  "Wednesday",
    ["th"] =  "Thursday",
    ["fr"] =  "Friday",
    ["sa"] =  "Saturday",
    ["su"] =  "Sunday"
};

This is an alternative syntax; the values are assigned to keys using dictionary
access notation.

$ dotnet run
Slovakia
Friday

## Source

[Object and Collection Initializers](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/object-and-collection-initializers)

In this article we have worked with object &amp; collection initializers in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).