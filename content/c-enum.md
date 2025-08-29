+++
title = "C# enum"
date = 2025-08-27T23:22:59.672+01:00
draft = false
description = "C# enum tutorial shows how to work with enum type in C# language. Enumeration is a data type consisting of a set of named values."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# enum

last modified July 5, 2023

 

C# enum tutorial shows how to work with enum type in C# language. 

Enumerated type (also called enumeration or enum) is a data type consisting of a
set of named values. A variable that has been declared as having an enumerated
type can be assigned any of the enumerators as a value. Enumerations make the
code more readable. 

We define an enumeration type with the enum keyword.

enum Difficulty
{
    Easy,
    Normal,
    Hard,
    VeryHard
}

By default, the associated constant values of enum members are of type
int. They start with zero and increase by one following the
definition text order. It is possible to define other types including
byte, sbyte, short, ushort,
uint, long, and ulong.

Enumerations are value types; they are created on the stack and not on the heap.

## C# enum simple example

The following is a simple example with the enum type.

Program.cs
  

Day day = Day.Monday;

if (day == Day.Monday)
{
    Console.WriteLine("It is Monday");
}

Console.WriteLine(day);

foreach (int i in Enum.GetValues(typeof(Day)))
{
    Console.WriteLine(i);
}

enum Day
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

We create an enumeration for week days.

enum Day
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

The enumeration is created with a enum keyword.
The Monday, Tuesday, ... barewords store in fact numbers 0..6.

Day day = Day.Monday;

We have a variable called day which is of the enumerated type Day.
It is initialized to Monday.

if (day == Day.Monday)
{
    Console.WriteLine("It is Monday");
}

This code is more readable than comparing a day variable to some number.

Console.WriteLine(day);

This line prints Monday to the console.

foreach (int i in Enum.GetValues(typeof(Day)))
{
    Console.WriteLine(i);
}

This loop prints 0..6 to the console. We get underlying types of the
enum values. For a computer, an enum is just a number.
The typeof is an operator used to obtain the
System.Type object for a type. It is needed by the
GetValues method. This method returns an array of the values of a
specified enumeration. And the
foreach keyword goes through the array, element by element and
prints them to the terminal.

$ dotnet run
It is Monday
Monday
0
1
2
3
4
5
6

We can provide our own values for the enum members.

Program.cs
  

foreach (int i in Enum.GetValues(typeof(Day)))
{
    Console.WriteLine(i);
}

enum Day
{
    Monday = 10,
    Tuesday = 11,
    Wednesday = 12,
    Thursday = 13,
    Friday = 14,
    Saturday = 15,
    Sunday = 16
}

In the example, we provide values 10 through 16 to the members of the
Day enumeration.

$ dotnet run
10
11
12
13
14
15

The following example should not be used; it only clarifies how
enum type works.

Program.cs
  

foreach (int i in Enum.GetValues(typeof(Days)))
{
    Console.WriteLine(i);
}

enum Days
{
    Monday,
    Tuesday,
    Wednesday = 8,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

We start with default values for enum members, then we set the 
Wednesday member to eight. The next member Thursday is 
set to nine etc.

$ dotnet run
0
1
8
9
10
11
12

## C# enum different type for members

In the next example, we change the data type for the enumeration members.

Program.cs
  

Season s1 = Season.Spring;
Season s2 = Season.Autumn;

Console.WriteLine(s1);
Console.WriteLine(s2);

Console.WriteLine("----------------------");

Console.WriteLine(s1.GetType());
Console.WriteLine(Enum.GetUnderlyingType(s1.GetType()));

enum Season : byte
{
    Spring = 1,
    Summer = 2,
    Autumn = 3,
    Winter = 4
}

We have the Season enumeration. The member values are set to the 
byte type.

$ dotnet run
Spring
Autumn
----------------------
Season
System.Byte

## C# enum convertions

It is possible to do explicit convertions between the enumeration type and its
underlying integral type. 

Program.cs
  

var p1 = Priority.Minor;

Console.WriteLine($"Integral value of {p1} is {(int) p1}");

var p2 = (Priority) 1;
Console.WriteLine(p2);

var p3 = (Priority) 2;
Console.WriteLine(p3);

enum Priority
{
    Minor,
    Major,
    Critical
}

There are three explicit convertions in the example.

Console.WriteLine($"Integral value of {p1} is {(int) p1}");

In this code line we convert the p1 member type to its type 
using the (int) cast.

var p2 = (Priority) 1;
Console.WriteLine(p2);

Here we convert the integer value to the member type.

$ dotnet run
Integral value of Minor is 0
Major
Critical

## C# enum Flags

With the Flags attribute, we can turn an enumeration into a bit
field. It can be then used as a set of flags. (The associated values of those
enum members should be the powers of two.)

This way the enumeration can represent a combination of choices. We can use the
bitwise logical operators | or &amp; to combine
choices or intersect combinations of choices.

Program.cs
  

var readWrite = Permissions.Read | Permissions.Write;
Console.WriteLine(readWrite);

[Flags]
enum Permissions
{
    Execute = 0b_0000_0001,
    Write = 0b_0000_0010,
    Read = 0b_0000_0100
}

In the example, we define read &amp; write permission with the |
operator.

$ dotnet run 
Write, Read

## C# Enum.IsDefined

The Enum.IsDefined method checks if a given integral value, or its
name as a string, exists in the specified enumeration.

Program.cs
  

Console.WriteLine(Enum.IsDefined(typeof(Priority), 0));
Console.WriteLine(Enum.IsDefined(typeof(Priority), 4));

Console.WriteLine("-------------");

Console.WriteLine(Enum.IsDefined(typeof(Priority), "Critical"));
Console.WriteLine(Enum.IsDefined(typeof(Priority), "Medium"));

Console.WriteLine("-------------");

Console.WriteLine(Enum.IsDefined(typeof(Priority), Priority.Major));
Console.WriteLine(Enum.IsDefined(typeof(Priority), Priority.Minor | Priority.Critical));

[Flags]
enum Priority
{
    Minor = 1,
    Major = 2,
    Critical = 4
}

In the example, we use the Enum.IsDefined method to check if
certain values exists in the Priority enumeration.

$ dotnet run
False
True
-------------
True
False
-------------
True
False

## Source

[Enumeration types - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/enum)

In this article we have worked with enumerations in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).