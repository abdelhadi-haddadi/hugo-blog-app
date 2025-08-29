+++
title = "C# Bogus"
date = 2025-08-29T19:50:29.551+01:00
draft = false
description = "C# Bogus tutorial shows how to generate fake data in C# using the Bogus library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Bogus

last modified July 5, 2023

 

In this article we show how to generate fake data in C# using the Bogus
library.

Bogus is a simple fake data generator for .NET. It is inspired by faker.js.

Fake data is useful when building and testing our application.

We can use a classic, procedural or a fluent syntax to generate fake data.

$ dotnet add package Bogus

Inside a project, we add the Bogus package.

## C# Bogus simple example

The following is a simple example that generates fake data.

Program.cs
  

using Bogus;

var occupations = new string[] { "gardener", "teacher", "writer", "programmer" };
var faker = new Faker&lt;User&gt;()
   .RuleFor(u =&gt; u.Name, f =&gt; f.Name.FullName())
   .RuleFor(u =&gt; u.Occupation, f =&gt; f.PickRandom(occupations));

var res = faker.Generate(5);
Console.WriteLine(string.Join("\n", res));

public class User
{
    public string? Name;
    public string? Occupation;

    public override string ToString()
    {
        return $"{Name} {Occupation}";
    }
}

The program generates fake user data.

var occupations = new string[] { "gardener", "teacher", "writer", "programmer" };
var faker = new Faker&lt;User&gt;()
    .RuleFor(u =&gt; u.Name, f =&gt; f.Name.FullName())
    .RuleFor(u =&gt; u.Occupation, f =&gt; f.PickRandom(occupations));

The fake data is generated using defined rules. With fluent syntax, we generate
users with a faker full name and a random occupation, which is picked from the
given array.

var res = faker.Generate(5);

We generate five fake users.

public class User
{
    public string? Name;
    public string? Occupation;

    public override string ToString()
    {
        return $"{Name} {Occupation}";
    }
}

We define the User type with two attributes: Name and
Occupation.

$ dotnet run
Donny Torphy gardener
Ansel Hauck teacher
Edyth Friesen programmer
Constantin Howe programmer
Dayana Gorczany teacher

## C# Bogus classic syntax

We can generate fake data with a procedural syntax.

Program.cs
  

using Bogus;

var faker = new Faker();

var fname = faker.Person.FirstName;
var lname = faker.Person.LastName;
var email = faker.Person.Email;

Console.WriteLine($"{fname} {lname} {email}");

The program creates a fake data for a person, consisting of a first name, last
name, and email.

$ dotnet run
Connie Trantow Connie14@hotmail.com

## C# Bogus internationalized data

We can create data in various languages.

Program.cs
  

using Bogus;

var fakerSk = new Faker("sk");

var fname = fakerSk.Person.FirstName;
var lname = fakerSk.Person.LastName;
var email = fakerSk.Person.Email;

Console.WriteLine($"{fname} {lname} {email}");

var fakerRu = new Faker("ru");

var fname2 = fakerRu.Person.FirstName;
var lname2 = fakerRu.Person.LastName;
var email2 = fakerRu.Person.Email;

Console.WriteLine($"{fname2} {lname2} {email2}");

The program creates fake data in Slovak and Russian.

var fakerSk = new Faker("sk");

The local is passed to the constructor of the Faker.

$ dotnet run
Matej Farkašovský Matej48@gmail.com
Валентин Кузьмин Valentin_Kuzmin39@gmail.com

## C# Bogus fake data by type

We can generate fake data by type.

Program.cs
  

using Bogus;

var faker = new Faker&lt;Item&gt;()
   .RuleForType(typeof(string), f =&gt; f.Lorem.Word())
   .RuleForType(typeof(int), f =&gt; int.MaxValue)
   .RuleFor(u =&gt; u.Weight, f =&gt; f.Random.Double(100, 200));

var res = faker.Generate(3);
Console.WriteLine(string.Join("\n", res));

public class Item
{
    public string? Name;
    public int Quantity;
    public double Weight;

    public override string ToString()
    {
        return $"{Name} {Quantity} {Weight}";
    }
}

In the program, we generate fake data for strings, integers, and doubles.

var faker = new Faker&lt;Item&gt;()
    .RuleForType(typeof(string), f =&gt; f.Lorem.Word())
    .RuleForType(typeof(int), f =&gt; int.MaxValue)
    .RuleFor(u =&gt; u.Weight, f =&gt; f.Random.Double(100, 200));

The rules are based on the types of the attributes of the Item
class.

$ dotnet run
maxime 2147483647 199.6262336436771
dolore 2147483647 189.21804805485243
tempora 2147483647 111.86314197682654

## C# Bogus faking dates

Via the Date property, we can create fake dates.

Program.cs
  

using Bogus;

var now = DateTime.Now;
Console.WriteLine($"{now}");

var faker = new Faker();
Console.WriteLine(faker.Date.Future(20));
Console.WriteLine(faker.Date.Past(50));
Console.WriteLine(faker.Date.Between(new DateTime(2022, 1, 1),
    new DateTime(2025, 1, 1)));

In the example, we create fake datetime values in the future, past, and between
the tiven range.

Console.WriteLine(faker.Date.Future(20));

Here, we create a fake datetime max 20 years in the future.

Console.WriteLine(faker.Date.Past(50));

We create a datetime value max 50 years back in time.

Console.WriteLine(faker.Date.Between(new DateTime(2022, 1, 1),
    new DateTime(2025, 1, 1)));

This line creates a datetime value between the specified two datetimes.

$ dotnet run
9/8/2022 5:17:07 PM
1/16/2027 6:56:03 PM
1/29/1979 8:21:46 AM
1/12/2023 6:54:39 PM`

## Source

[Bogus Github page](https://github.com/bchavez/Bogus)

In this article we have generated fake data in C# using Bogus library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).