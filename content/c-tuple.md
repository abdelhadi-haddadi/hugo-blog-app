+++
title = "C# tuple"
date = 2025-08-29T19:51:35.631+01:00
draft = false
description = "C# tuple tutorial shows how to work with a tuple type in C#. A tuple is a grouping of unnamed but ordered values."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# tuple

last modified January 26, 2024

 

In this article we show how to work with a tuple type in C#.

A *tuple* is a grouping of unnamed but ordered values. The values can be 
of different types. Tuples can either be reference types 
(backed by System.Tuple) or value types (backed by 
System.ValueTuple).

Since C# 7, a tuple became a part of the language syntax. In this article we 
focus on the newer syntax. The new syntax uses round brackets to define and 
work with tuples.

## C# tuple simple example

In the following example, we create a new tuple using the old and the new way.

Program.cs
  

var u1 = Tuple.Create("John", "Done", "gardener");
Console.WriteLine($"{u1.Item1} {u1.Item2} is a {u1.Item3}");

var u2 = ("Roger", "Roe", "driver"); 
Console.WriteLine($"{u2.Item1} {u2.Item2} is a {u2.Item3}");

We create two tuples and print their contents to the console.

var u1 = Tuple.Create("John", "Done", "gardener");
Console.WriteLine($"{u1.Item1} {u1.Item2} is a {u1.Item3}");

This is the old way of creating tuples. A new instance of a
System.Tuple is created. The members of the tuple are accessed with
ItemN members. This tuple is a reference type. 

var u2 = ("Roger", "Roe", "driver"); 
Console.WriteLine($"{u2.Item1} {u2.Item2} is a {u2.Item3}");

Here is the more recent way of creating a tuple. This tuple is a value type.
We access the tuple fields with Item1, Item2, 
and Item3; however, it is possible to name our fields. 

$ dotnet run
John Done is a gardener
Roger Roe is a driver

## C# tuple field names

We can name our tuple fields.

Program.cs
  

var u1 = (Name: "John Doe", Age: 34);
Console.WriteLine($"{u1.Name} is {u1.Age} years old");

(string Name, int Age) u2 = ("Roger Roe", 55); 
Console.WriteLine($"{u2.Name} is {u2.Age} years old");

var name = "Jane Doe";
var age = 26;

var u3 = (name, age);
Console.WriteLine($"{u3.name} is {u3.age} years old");

The example shows three different ways to name tuple fields.

var u1 = (Name: "John Doe", Age: 34);

The field name is separated from its value with a colon character. The fields 
are separated with comma.

Console.WriteLine($"{u1.Name} is {u1.Age} years old");

Here we refer to the tuple fields by their names. 

(string Name, int Age) u2 = ("Roger Roe", 55); 

When we assign a tuple to another tuple, we specify the names and the types
inside a pair of round brackets before the variable name.

var name = "Jane Doe";
var age = 26;

var u3 = (name, age);

It is possible to create a tuple from existing variables. The compiler infers 
the types of the fields.

## C# tuple swap values

With tuples, we can easily swap values of two variables.

Program.cs
  

var (x, y) = (11, 2);

Console.WriteLine($"x: {x}");
Console.WriteLine($"y: {y}");

(y, x) = (x, y);

Console.WriteLine($"x: {x}");
Console.WriteLine($"y: {y}");

We define and initialize two variables x and y. Later
we swap their values in one line. 

(y, x) = (x, y);

Tuples allow us to swap values easily in one line. 

$ dotnet run 
x: 11
y: 2
x: 2
y: 11

## C# tuple deconstruction

We can unpackage all the items in a tuple in a single operation. This is called
tuple deconstruction.

Program.cs
  

var (name1, age1) = ("John Doe", 34);
Console.WriteLine($"{name1} is {age1} years old");

(string name2, int age2) = ("Roger Roe", 55);
Console.WriteLine($"{name2} is {age2} years old");

string name3;
int age3;

(name3, age3) = ("Jane Doe", 26);
Console.WriteLine($"{name3} is {age3} years old");

The example shows how to deconstruct tuples.

var (name1, age1) = ("John Doe", 34);

The tuple field values are stored in name1 and age1
variables. We do the variable definition and assignment in one shot.

(string name2, int age2) = ("Roger Roe", 55);

Here we explicitly specify the variable types.

string name3;
int age3;

(name3, age3) = ("Jane Doe", 26);

## C# nested tuples

It is possible to nest tuples into other tuples.

Program.cs
  

var data = ((1, 2, 3), (3, 4, 5), (6, 7, 8));
Console.WriteLine(data);

Console.WriteLine(data.Item1);
Console.WriteLine(data.Item2);
Console.WriteLine(data.Item1);

Console.WriteLine(data.Item1.Item1);
Console.WriteLine(data.Item2.Item3);

In the example, we have a tuple which has three nested tuples consisting of
three values.

Console.WriteLine(data.Item1);

Here we get the first nested tuple: (1, 2, 3).

Console.WriteLine(data.Item1.Item1);
Console.WriteLine(data.Item2.Item3);

Here we get the first and the third element of the first nested tuple.

$ dotnet run
((1, 2, 3), (3, 4, 5), (6, 7, 8))
(1, 2, 3)
(3, 4, 5)
(1, 2, 3)
1
5

## C# tuple as function parameter

Tuples can be function parameters.

Program.cs
  

ShowInfo(("John", "Doe", "programmer"));
ShowInfo(("Roger", "Roe", "driver"));
ShowInfo(("Jane", "Doe", "teacher"));

void ShowInfo((string FirstName, string LastName, string Occupation) u)
{
    Console.WriteLine($"{u.FirstName} {u.LastName} is a {u.Occupation}");
}

In the example, we pass tuples to the ShowInfo function, which 
builds and prints a message from its fields.

## C# tuple as return value

Tuples can be returned from functions.

Program.cs
  

var user = GetUser();
Console.WriteLine($"{user.FirstName} {user.LastName} is a {user.Occupation}");

(string FirstName, string LastName, string Occupation) GetUser()
{
    return ("John", "Doe", "programmer");
}

The GetUser's return type is a tuple having three fields.

## C# tuple &amp; pattern matching

A pattern is a syntactic form that can be used to express the shape of data
against which incoming data is to be compared. Tuples are one of the patterns 
that can be utilized in pattern matching. 

Program.cs
  

var rand = new Random();

List&lt;string&gt; opts = ["rock", "paper", "scissors"];

string p1 = opts[rand.Next(opts.Count)];
string p2 = opts[rand.Next(opts.Count)];

Console.WriteLine($"player 1 has {p1}, player 2 has {p2}");

string res = RockPaperScissors(p1, p2);
Console.WriteLine(res);

string RockPaperScissors(string player1, string player2) =&gt; (player1, player2) switch
{
    ("rock", "paper") =&gt; "Rock is covered by paper. Player 2 wins",
    ("rock", "scissors") =&gt; "Rock breaks scissors. Player 1 wins.",
    ("paper", "rock") =&gt; "Paper covers rock. Player 1 wins.",
    ("paper", "scissors") =&gt; "Paper is cut by scissors.  Player 2 wins.",
    ("scissors", "rock") =&gt; "Scissors are broken by rock.  Player 2 wins.",
    ("scissors", "paper") =&gt; "Scissors cut paper. Player 1 wins.",
    (_, _) =&gt; "tie"
};

This is a simple skeleton of a rock-paper-scissors game. 

string RockPaperScissors(string player1, string player2) =&gt; (player1, player2) switch
{
    ("rock", "paper") =&gt; "Rock is covered by paper. Player 2 wins",
    ("rock", "scissors") =&gt; "Rock breaks scissors. Player 1 wins.",
    ("paper", "rock") =&gt; "Paper covers rock. Player 1 wins.",
    ("paper", "scissors") =&gt; "Paper is cut by scissors.  Player 2 wins.",
    ("scissors", "rock") =&gt; "Scissors are broken by rock.  Player 2 wins.",
    ("scissors", "paper") =&gt; "Scissors cut paper. Player 1 wins.",
    (_, _) =&gt; "tie"
};

We use tuple patterns in a switch expression. The tuples represent choices of
the two players. Each of the switch expression arms represent a possible
scenario in the game. 

$ dotnet run
player 1 has rock, player 2 has scissors
Rock breaks scissors. Player 1 wins.
$ dotnet run
player 1 has paper, player 2 has rock
Paper covers rock. Player 1 wins.
$ dotnet run
player 1 has scissors, player 2 has rock
Scissors are broken by rock.  Player 2 wins.

## Source

[Tuple types - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-tuples)

In this article we have worked with tuples in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).