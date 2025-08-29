+++
title = "C# struct"
date = 2025-08-29T19:51:31.166+01:00
draft = false
description = "C# struct tutorial shows how to work with struct types in C#. A structure is a value type defined with the struct keyword."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# struct

last modified July 5, 2023

 

In this article we work with struct type in C#.

## The struct type

A structure is a value type. The type is defined with the
struct keyword. Structures are similar to the classes. Structures
are meant to represent lightweight objects like Point,
Rectangle, Color and similar. In many cases,
structures may be more efficient than classes. Structures are value types and
are created on the stack. Note that primitive data types like
int, bool, float are technically
struct types.

All struct types inherit from System.ValueType
and further from System.Object. Structures are never
abstract and they are always implicitly sealed. So struct types do not
support inheritance. Therefore, the struct data member cannot be
declared  protected. The abstract and sealed modifiers are not
permitted for a struct definition. A struct is not
permitted to declare a parameterless constructor.

Structures can also contain constructors, constants, fields, methods, properties,
indexers, operators, events, and nested types. However, if we need to implement
more of these features, we might consider using a class instead.
Structures can implement an interface. A struct can be used as a
nullable type and can be assigned a null value.

## C# struct simple example

The following example creates a simple structure.

Program.cs
  

var p = new Point(2, 5);
Console.WriteLine(p);

public struct Point
{
    private int x;
    private int y;

    public Point(int x, int y)
    {
        this.x = x;
        this.y = y;
    }

    public override string ToString()
    {
        return $"Point x:{x}, y:{y}";
    }
}

The example creates a Point structure. The point could be
represented by a class too, but with struct we are more efficient;
especially, if we dealt with lots of points.

var p = new Point(2, 5);
Console.WriteLine(p);

We create the Point structure and call its ToString
method.

public struct Point
{
    ...
}

The structure is declared with the struct keyword.

public override string ToString()
{
    return $"Point x:{x}, y:{y}";
}

The inheritance is not supported for struct types. But we can use
the override keyword for methods, from which the
struct type implicitly inherits. The ToString method
is such a case.

$ dotnet run
Point x:2, y:5

## No new keyword

It is possible to create an instance of the struct type without
the new keyword.

Program.cs
  

Person p;
p.name = "Jane";
p.age = 17;

Console.WriteLine($"{p.name} is {p.age} years old");

public struct Person
{
    public string name;
    public int age;
}

We have a Person structure with two public members.

Person p;

First we declare a Person structure.

p.name = "Jane";
p.age = 17;

Later we initialize the structure with some data.

$ dotnet run
Jane is 17 years old

## C# struct auto-implemented properties

We can use auto-implemented properties with struct types.

Program.cs
  

var p1 = new Person("John Doe", "gardener");
Console.WriteLine(p1);

var p2 = new Person("Roger Roe", "driver");
Console.WriteLine(p2);

public struct Person
{
    public Person(string name, string occupation)
    {
        this.Name = name;
        this.Occupation = occupation;
    }

    public string Name { get; set; }
    public string Occupation { get; set; }

    public override string ToString()
    {
        return $"{Name} is a(n) {Occupation}";
    }
}

In the program, we have a Person struct type which has
auto-implemented Name and Occupation properties.

public string Name { get; set; }
public string Occupation { get; set; }

The get and set keywords are used to create
auto-implemented properties. We have more concise and readable code.

## C# readonly struct

With the readonly modifier, we can create a immutable struct types.
All members of a readonly struct must be readonly. Field members also use
the readonly modifier, while auto-properties can also use the
init keyword.

Program.cs
  

var p = new Point(3, 7);
Console.WriteLine(p);

public readonly struct Point
{
    public Point(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double X { get; init; }
    public double Y { get; init; }

    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}

In the example, we create a point. The Point struct has two
readonly properties: X and Y.

public double X { get; init; }
public double Y { get; init; }

The init keyword creates an init-only setter. It assigns a value to
the property only during object construction. This enforces immutability.

## C# structures are value types

The structure types are value types. They are created on the stack. When a value
type is created only a single space in memory is allocated to store the value.
An assignment of a value type copies the value.

Program.cs
  

var p1 = new Person("Beky", 18);
var p2 = p1;

Console.WriteLine(p2);
p2.Name = "Jane";
p2.Age = 17;

Console.WriteLine(p2);
Console.WriteLine(p1);

public struct Person
{
    public Person(string name, int age) : this()
    {
        this.Name = name;
        this.Age = age;
    }

    public string Name { get; set; }
    public int Age { get; set; }

    public override string ToString()
    {
        return $"{Name} is {Age} years old";
    }
}

We have a Person structure with two data members. We have a two
parameter constructor and we also use automatic properties.

var p1 = new Person("Beky", 18);
var p2 = p1;

Here we create a struct. And then the created struct
is assigned to another struct. We create a copy of the structure.

p2.Name = "Jane";
p2.Age = 17;

We change the data of the second structure. The first one is not
affected, since we work on the copy of the original struct type.

public string Name { get; set; }
public int Age { get; set; }

Automatic properties can be used in struct types.

$ dotnet run
Beky is 18 years old
Jane is 17 years old
Beky is 18 years old

## Primitive types are structures

The primitive data types like int, float, or
bool are structures under the hood. This differs from languages
like C++ or Java.

Program.cs
  

float x = 12.3f;
int y = 34;
bool z = false;

Console.WriteLine(x.GetType());
Console.WriteLine(y.GetType());
Console.WriteLine(z.GetType());

We have three variables: a float, an int, and a bool.
We call the GetType method on each of them.

Console.WriteLine(x.GetType());

We call the GetType method on the float value. Each structure
implicitly inherits from the System.ValueType class which contains
the GetType method.

$ dotnet run
System.Single
System.Int32
System.Boolean

## Source

[Structure types - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/struct)

In this article we covered the struct type in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).