+++
title = "C# data type"
date = 2025-08-27T23:22:54.050+01:00
draft = false
description = "C# data type tutorial covers data types of the
C# language. A data type is a set of values and the allowable operations on
those values."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# data type

last modified July 5, 2023

 

In this article we talk about data types in C#.

Computer programs, including spreadsheets, text editors, calculators, or chat
clients, work with data. Tools to work with various data types are essential
part of a modern computer language. A *data type* is a set of values and
the allowable operations on those values.

## C# data type

A data type is a set of values, and the allowable operations on those
values.

The two fundamental data types in C# are value types and reference types.
Primitive types (except strings), enumerations, tuples, and structures are value
types. Classes, records, strings, interfaces, arrays, and delegates are
reference types. Every type has a default value.

*Reference types* are created on the Heap. The lifetime of the reference
type is managed by the .NET framework. The default value for reference types is
null reference. Assignment to a variable of a reference type creates a copy of
the reference rather than a copy of the referenced value.

*Value types* are created on the stack. The lifetime is determined by the
lifetime of the variable. Assignment to a variable of a value type creates a
copy of the value being assigned. Value types have different default values. For
example, boolean default value is false, decimal 0, string an empty string "".

## C# Boolean values

The bool data type is a primitive data type having one of two
values: true or false.

We are going to choose a name for a newborn. If it is going to be a boy, we
choose John. If it is going to be a girl, we choose Victoria.

Program.cs
  

var random = new Random();

bool male = Convert.ToBoolean(random.Next(0, 2));

if (male)
{
    Console.WriteLine("We will use name John");
}
else
{
    Console.WriteLine("We will use name Victoria");
}

The program uses a random number generator to simulate our case.

var random = new Random();

We create a Random object which is used to compute random numbers.
It is part of the System namespace.

bool male = Convert.ToBoolean(random.Next(0, 2));

The Next method returns a random number within a specified range.
The lower bound is included, the upper bound is not. In other words, we receive
either 0 or 1. Later the Convert method converts these values to
boolean ones, 0 to false and 1 to true.

if (male)
{
    Console.WriteLine("We will use name John");
} else
{
    Console.WriteLine("We will use name Victoria");
}

If the male variable is set to true, we choose the
name John. Otherwise, we choose the name Victoria. Control structures like
if/else statements work with boolean values.

$ dotnet run
We will use name John
$ dotnet run
We will use name John
$ dotnet run
We will use name Victoria

## C# integers

Integers are a subset of the real numbers. They are written without a fraction
or a decimal component. Integers fall within a set Z = {..., -2, -1, 0, 1, 2,
...}. Integers are infinite.

In computer languages, integers are primitive data types. Computers can
practically work only with a subset of integer values, because computers have
finite capacity. Integers are used to count discrete entities. We can have 3, 4,
6 humans, but we cannot have 3.33 humans. We can have 3.33 kilograms.

VB Alias
.NET Type
Size
Range

sbyte
System.SByte
1 byte

-128 to 127

byte
System.Byte
1 byte
0 to 255

short
System.Int16

2 bytes
-32,768 to 32,767

ushort
System.UInt16
2 bytes
0 to 65,535

int
System.Int32
4 bytes
-2,147,483,648 to 2,147,483,647

uint
System.UInt32
4 bytes
0 to 4,294,967,295

long
System.Int64
8 bytes
-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

ulong
System.UInt64
8 bytes

0 to 18,446,744,073,709,551,615

These integer types may be used according to our needs. No one, (except perhaps
for some biblical people), can be older than 120, 130 years. We can then use the
byte type for age variable in a program. This will save some
memory.

### Discrete entities

If we work with integers, we deal with discrete entities. We would use integers
to count apples.

Program.cs
  

int baskets = 16;
int applesInBasket = 24;

int total = baskets * applesInBasket;

Console.WriteLine($"There are total of {total} apples");

In our program, we count the total amount of apples. We use the multiplication
operation.

int baskets = 16;
int applesInBasket = 24;

The number of baskets and the number of apples in each basket are integer
values.

int total = baskets * applesInBasket;

Multiplying those values we get an integer too.

$ dotnet run
There are total of 384 apples

### C# integer notations

Integers can be specified in three different *notations* in C#: decimal,
hexadecimal, and binary. There are no notations for octal values. Decimal
numbers are used normally as we know them. Hexadecimal numbers are preceded with
0x characters, binary with 0b.

**Note:** some languages also support the octal notation; C# does
not.

Program.cs
  

int num1 = 31;
int num2 = 0x31;
int num3 = 0b1101;

Console.WriteLine(num1);
Console.WriteLine(num2);
Console.WriteLine(num3);

In the program, we have three integers expressed in three different notations.

$ dotnet run
31
49
13

The default notation is the decimal. The program shows these three numbers in
decimal.

### Using underscores

C# allows to use underscore characters for numeric literals
to increase readability of the values.

Program.cs
  

var num1 = 234_321_000;
Console.WriteLine(num1);

var num2 = 0b_0110_000_100;
Console.WriteLine(num2);

The program uses an integer literals with underscore character to improve the
readability of the values.

### Arithmetic overflow

An *arithmetic overflow* is a condition that occurs when a calculation
produces a result that is greater in magnitude than that which a given register
or storage location can store or represent.

Program.cs
  

byte a = 254;

Console.WriteLine(a);
a++;

Console.WriteLine(a);
a++;

Console.WriteLine(a);
a++;

Console.WriteLine(a);

In this example, we try to assign a value beyond the range of a data type. This
leads to an arithmetic overflow.

$ dotnet run
254
255
0
1

When an overflow occurs, the variable is reset to the lower bound of the data
type. (In case of a byte type it is zero.)

With the checked keyword, we can enforce an exception when the
overflow occurs.

Program.cs
  

checked
{
    byte a = 254;

    Console.WriteLine(a);
    a++;

    Console.WriteLine(a);
    a++;

    Console.WriteLine(a);
    a++;

    Console.WriteLine(a);
}

In the example, the statements are placed in the body of the
checked block.

$ dotnet run
254
255
Unhandled Exception: System.OverflowException: Arithmetic operation resulted in an overflow.
    ...

This time a System.OverflowException is thrown.

## C# floating point numbers

Floating point numbers represent real numbers in computing. Real numbers measure
continuous quantities, like weight, height, or speed. In C# we have three
floating point types: float, double, and
decimal.

C# Alias
.NET Type
Size
Precision
Range

float
System.Single

4 bytes
7 digits
+-1.5 x 10-45 to +-3.4 x 1038 

double
System.Double
8 bytes

15-16 digits
+-5.0 x 10-324 to +-1.7 x 10308 

decimal
System.Decimal
16 bytes
28-29 decimal places

+-1.0 x 10-28  to +-7.9 x 1028 

The above table gives the characteristics of the floating point types.

By default, real numbers are double in C# programs. To use a different type, we
must use a suffix. The F/f for float numbers and
M/m for decimal numbers.

Program.cs
  

float n1 = 1.234f;
double n2 = 1.234;
decimal n3 = 1.234m;

Console.WriteLine(n1);
Console.WriteLine(n2);
Console.WriteLine(n3);

Console.WriteLine(n1.GetType());
Console.WriteLine(n2.GetType());
Console.WriteLine(n3.GetType());

In the above program, we use three different literal notations for floating
point numbers.

float n1 = 1.234f;

The f suffix is used for a float number.

double n2 = 1.234;

If we do not use a suffix, then it is a double number. We
can optionally use the d suffix.

Console.WriteLine(n1.GetType());

The GetType method returns the type of the number.

$ dotnet run
1.234
1.234
1.234
System.Single
System.Double
System.Decimal

We can use various syntax to create floating point values.

Program.cs
  

float n1 = 1.234f;
float n2 = 1.2e-3f;
float n3 = (float)1 / 3;

Console.WriteLine(n1);
Console.WriteLine(n2);
Console.WriteLine(n3);

We have three ways to create floating point values. The first is the 'normal'
way using a decimal point. The second uses a scientific notation. And the last
one as a result of a numerical operation.

float n2 = 1.2e-3f;

This is the scientific notation for floating point numbers. Also known as
exponential notation, it is a way of writing numbers too large or small to be
conveniently written in standard decimal notation.

float n3 = (float) 1 / 3;

The (float) construct is called casting. The division operation
returns integer numbers by default. By casting we get a float number.

$ dotnet run
1.234
0.0012
0.3333333

The float and double types are inexact.

Program.cs
  

double n1 = 0.1 + 0.1 + 0.1;
double n2 = 0.3;

Console.WriteLine(n1);
Console.WriteLine(n2);

if (n1 == n2)
{
    Console.WriteLine("Numbers are equal");
}
else
{
    Console.WriteLine("Numbers are not equal");
}

Caution should be exercised when comparing floating point values.

$ dotnet run
0.30000000000000004
0.3
Numbers are not equal

A sprinter for 100m ran 9.87s. What is his speed in km/h?

Program.cs
  

using System;

float distance = 0.1f;

float time = 9.87f / 3600;

float speed = distance / time;

Console.WriteLine($"The average speed of a sprinter is {speed} km/h");

In this example, it is necessary to use floating point values.

float distance = 0.1f;

100 m is 0.1 km.

float time = 9.87f / 3600;

9.87 s is 9.87/(60*60) h.

float speed = distance / time;

To get the speed, we divide the distance by the time.

$ dotnet run
The average speed of a sprinter is 36.47416 km/h

## C# enumerations

Enumerated type (also called enumeration or enum) is a data type consisting of a
set of named values. A variable that has been declared as having an enumerated
type can be assigned any of the enumerators as a value. Enumerations make the
code more readable.

Program.cs
  

Days day = Days.Monday;

if (day == Days.Monday)
{
    Console.WriteLine("It is Monday");
}

Console.WriteLine(day);

foreach (int i in Enum.GetValues(typeof(Days)))
{
    Console.WriteLine(i);
}

enum Days
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

In our code example, we create an enumeration for week days.

enum Days
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

The enumeration is created with a enum keyword. The Monday,
Tuesday, ... barewords store in fact numbers 0..6.

Days day = Days.Monday;

We have a variable called day which is of the enumerated type Days. It is
initialized to Monday.

if (day == Days.Monday)
{
    Console.WriteLine("It is Monday");
}

This code is more readable than comparing a day variable to some number.

Console.WriteLine(day);

This line prints Monday to the console.

foreach (int i in Enum.GetValues(typeof(Days)))
{
    Console.WriteLine(i);
}

This loop prints 0..6 to the console. We get underlying types of the
enum values. For a computer, an enum is just a number.
The typeof is an operator used to obtain the
System.Type object for a type. It is needed by the
GetValues method. This method returns an array of the values of a
specified enumeration. And the foreach keyword goes through the
array, element by element and prints them to the terminal.

We further work with enumerations.

Program.cs
  

Seasons s1 = Seasons.Spring;
Seasons s2 = Seasons.Autumn;

Console.WriteLine(s1);
Console.WriteLine(s2);

public enum Seasons : byte
{
    Spring = 1,
    Summer = 2,
    Autumn = 3,
    Winter = 4
}

Seasons can be easily used as enums. We can specify the underlying type for the
enum and we can give exact values for them.

public enum Seasons : byte
{
    Spring = 1,
    Summer = 2,
    Autumn = 3,
    Winter = 4
}

With a colon and a data type we specify the underlying type for the
enum. We also give each member a specific number.

Console.WriteLine(s1);
Console.WriteLine(s2);

These two lines print the enum values to the console.

$ dotnet run
Spring
Autumn

## C# tuples

A tuple is an ordered, immutable list of heterogeneous data values. Tuples are
value types. Tuples must contain at least two elements. Tuples are defined with
round brackets .

Program.cs
  

var words = ("sky", "blue", "rock", "fountain");

Console.WriteLine(words);

Console.WriteLine(words.Item1);
Console.WriteLine(words.Item2);

var words2 = (w1: "forest", w2: "deep", w3: "sea");

Console.WriteLine(words2.w1);
Console.WriteLine(words2.w2);
Console.WriteLine(words2.w3);

In the example we define two tuples.

var words = ("sky", "blue", "rock", "fountain");

This is an unnamed tuple definition.

Console.WriteLine(words);

We print all elements of the tuple to the console.

Console.WriteLine(words.Item1);
Console.WriteLine(words.Item2);

We print the first two elements. We access elements of an unnamed tuple with
special Item1, Item2, ... properties.

var words2 = (w1: "forest", w2: "deep", w3: "sea");

This is a definition of a named tuple.

Console.WriteLine(words2.w1);
Console.WriteLine(words2.w2);
Console.WriteLine(words2.w3);

We access the elements by their names.

$ dotnet run
(sky, blue, rock, fountain)
sky
blue
forest
deep
sea

## C# records

C# 9 introduced records. Records are immutable reference types. Record
types use value-based equality. A record is created with the record
keyword.

Records' main purpose is to be data holders.

Program.cs
  

var cars = new List&lt;Car&gt;
{
    new Car("Audi", 52642),
    new Car("Mercedes", 57127),
    new Car("Skoda", 9000),
    new Car("Volvo", 29000),
    new Car("Bentley", 350000),
    new Car("Citroen", 21000),
    new Car("Hummer", 41400),
    new Car("Volkswagen", 21600)
};

var res = from car in cars
          where car.Price &gt; 30000 &amp;&amp; car.Price &lt; 100000
          select new { car.Name, car.Price };

foreach (var car in res)
{
    Console.WriteLine($"{car.Name} {car.Price}");
}

record Car(string Name, int Price);

In the example, we use LINQ to filter the list of car objects. We include all
cars whose price is between 30000 and 100000. The Language-Integrated Query
(LINQ) resides in the System.Linq namespace, which is included
with implicit usings.

record Car(string Name, int Price);

A car is a record type.

$ dotnet run
Audi 52642
Mercedes 57127
Hummer 41400

## C# strings and chars

The string is a data type representing textual data in computer
programs. A string in C# is a sequence of Unicode characters. A
char is a single Unicode character. Strings are enclosed by double
quotes.

Program.cs
  

string word = "ZetCode";

char c = word[0];

Console.WriteLine(c);

The program prints 'Z' character to the terminal.

string word = "ZetCode";

Here we create a string variable and assign it the "ZetCode" value.

char c = word[0];

A string is an array of Unicode characters. We can use the array
access notation to get a specific character from the string. The number inside
the square brackets is the index into the array of characters. The index is
counted from zero. It means that the first character has index 0.

$ dotnet run
Z

## C# arrays

The array is a complex data type which handles a collection of elements. Each of
the elements can be accessed by an index. All the elements of an array must be
of the same data type.

Program.cs
  

int[] numbers = new int[5];

numbers[0] = 3;
numbers[1] = 2;
numbers[2] = 1;
numbers[3] = 5;
numbers[4] = 6;

int len = numbers.Length;

for (int i = 0; i &lt; len; i++)
{
    Console.WriteLine(numbers[i]);
}

In this example, we declare an array, fill it with data and then print the
contents of the array to the console.

int[] numbers = new int[5];

We declare an integer array which can store up to five integers. So we have an
array of five elements, with indexes 0..4.

numbers[0] = 3;
numbers[1] = 2;
numbers[2] = 1;
numbers[3] = 5;
numbers[4] = 6;

Here we assign values to the created array. We can access the elements of an
array by the array access notation. It consists of the array name followed by
square brackets. Inside the brackets we specify the index to the element that we
want.

int len = numbers.Length;

Each array has a Length property which returns
the number of elements in the array.

for (int i=0; i&lt;len; i++)
{
    Console.WriteLine(numbers[i]);
}

We traverse the array and print the data to the console.

## C# DateTime

The DateTime is a value type. It represents an instant in time,
typically expressed as a date and time of day.

Program.cs
  

DateTime now = DateTime.Now;

System.Console.WriteLine(now);
System.Console.WriteLine(now.ToShortDateString());
System.Console.WriteLine(now.ToShortTimeString());

We show today's date in three different formats: date &amp; time,
date, and time.

DateTime now = DateTime.Now;

Gets a DateTime object that is set to the current date and time
on this computer, expressed as the local time.

System.Console.WriteLine(now);

This line prints the date in full format.

System.Console.WriteLine(now.ToShortDateString());
System.Console.WriteLine(now.ToShortTimeString());

The ToShortDateString returns a short date string format,
the ToShortTimeString returns a short time string format.

$ dotnet run
11/1/2022 10:26:06 AM
11/1/2022
10:26 AM

## C# type casting

We often work with multiple data types at once. Converting one data
type to another one is a common job in programming. *Type conversion*
or *typecasting* refers to changing an entity of one data type into
another. There are two types of conversion: implicit and explicit. Implicit type
conversion, also known as coercion, is an automatic type conversion by the
compiler.

Program.cs
  

int val1 = 0;
byte val2 = 15;

val1 = val2;

Console.WriteLine(val1.GetType());
Console.WriteLine(val2.GetType());

Console.WriteLine(12 + 12.5);
Console.WriteLine("12" + 12);

In this example, we have several implicit conversions.

val1 = val2;

Here we work with two different types: int and byte.
We assign a byte value to an int value. It is a
widening operation. The int values have four bytes; byte values have only one
byte. *Widening* conversions are allowed. If we wanted to assign a
int to a byte, this would be a *shortening*
conversion.

Implicit shortening conversions are not allowed by C# compiler. This is because
in implicit shortening conversion we could unintentionally loose precision. We
can do shortening conversions, but we must inform the compiler about it. That we
know what we are doing. It can be done with explicit conversion.

Console.WriteLine(12 + 12.5);

We add two values: one integer and one floating point value. The result is a
floating point value. It is a widening implicit conversion.

Console.WriteLine("12" + 12);

The result is 1212. An integer is converted to a string and the two strings are
concatenated.

Next we show some explicit conversions in C#.

Program.cs
  

double b = 13.5;

float a = (float) b;
float c = (int) a;

Console.WriteLine(a);
Console.WriteLine(b);
Console.WriteLine(c);

We have three values. We do some explicit conversions with these values.

float a = (float) b;

We convert a double value to a float value. Explicit
conversion is done by specifying the intended type between two round brackets.
In this case, no precision is lost. Number 13.5 can be safely assigned to both
types.

float c = (int) a;

We convert a float value to int value. In this
statement, we loose some precision: 13.5 becomes 13.

$ dotnet run
13.5
13.5
13

## C# Nullable types

Value types cannot be assigned a null literal, reference types can.
Applications that work with databases deal with the null value.
Because of this, special nullable types were introduced into the C# language.
Nullable types are instances of the System.Nullable&lt;T&gt;
struct.

Program.cs
  

Nullable&lt;bool&gt; male = null;
int? age = null;

Console.WriteLine(male.HasValue);
Console.WriteLine(age.HasValue);

A simple example demonstrating nullable types.

Nullable&lt;bool&gt; male = null;
int? age = null;

There are two ways how to declare a nullable type. Either with the
Nullable&lt;T&gt; generic structure in which the type is specified
between the angle brackets, or we can use a question mark after
the type. The latter is in fact a shorthand for the first notation.

$ dotnet run
False
False

## C# Convert &amp; Parse methods

There are two groups of methods which are used to convert values.

Program.cs
  

Console.WriteLine(Convert.ToBoolean(0.3));
Console.WriteLine(Convert.ToBoolean(3));
Console.WriteLine(Convert.ToBoolean(0));
Console.WriteLine(Convert.ToBoolean(-1));

Console.WriteLine(Convert.ToInt32("452"));
Console.WriteLine(Convert.ToInt32(34.5));

The Convert class has many methods for converting values. We use
two of them.

Console.WriteLine(Convert.ToBoolean(0.3));

We convert a double value to a bool value.

Console.WriteLine(Convert.ToInt32("452"));

And here we convert a string to an int.

$ dotnet run
True
True
False
True
452
34

Program.cs
  

```
Console.WriteLine(int.Parse("34"));
Console.WriteLine(int.Parse("-34"));
Console.WriteLine(int.Parse("+34"));

```

Converting strings to integers is a very common task. We often do such
conversions when we fetch values from databases or GUI components.

Console.WriteLine(int.Parse("34"));

We use the Parse method of the int to convert a
string to int value.

$ dotnet run
34
-34
34

## Source

[Built-in types](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/built-in-types)

In this article we have covered data types and their conversions in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).