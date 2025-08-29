+++
title = "C# check type"
date = 2025-08-27T23:22:49.356+01:00
draft = false
description = "C# check type tutorial shows how to check types in C# with typeof and is operators, and the GetType method."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# check type

last modified January 21, 2024

 

In this article we show how to check types in C# with typeof and
is operators, and the GetType method.

In C#, every variable and expression has a type. A *type* is a set of
values and the allowable operations on those values.

A type stores the following information:

    - storage space that a variable of the type requires

    - maximum and minimum values of the type

    - type members such as fields or methods

    - base type from which it inherits

    - implemented interfaces

    - allowable operations

The compiler uses these information to ensure type-safe operations.

The System.Type class represents type declarations.

We can check type with typeof operator, is operator,
or GetType method. The typeof operator obtains the
System.Type instance for a type. The operator checks the type at
compile time. It only works on types, not variables.

The GetType method gets the type of the current object instance.
It checks the type at runtime.

The is operator checks if an instance is in the type's inheritance
tree. In addition, it allows type-safe casting.

## C# typeof example

The first example uses the typeof operator to print the
System.Type for built-int types.

Program.cs
  

Type t = typeof(int);
Console.WriteLine(t);

Console.WriteLine(typeof(List&lt;int&gt;));
Console.WriteLine(typeof(string));
Console.WriteLine(typeof(double));
Console.WriteLine(typeof(float));
Console.WriteLine(typeof(decimal));
Console.WriteLine(typeof(User));

record User(string Name, string Occupation);

The example prints System.Type for int, List&lt;int&gt;, string,
double, float, decimal and User.

$ dotnet run
System.Int32
System.Collections.Generic.List`1[System.Int32]
System.String
System.Double
System.Single
System.Decimal
User

## C# GetType example

The following example checks the types of three variables.

Program.cs
  

int x = 34;
string word = "falcol";
decimal i = 23.54m;

if (x.GetType() == typeof(int))
{
    Console.WriteLine("x has int type");
}

if (word.GetType() == typeof(string))
{
    Console.WriteLine("word has string type");
}

if (i.GetType() == typeof(decimal))
{
    Console.WriteLine("i has decimal type");
}

We define an integer, string, and decimal variables. We use the
GetType method to check the types at runtime.

$ dotnet run
x has int type
word has string type
i has decimal type

## C# is operator

The is operator checks if an object is compatible with a given
type, i.e. it is in its inheritance tree.

Program.cs
  

Base _base = new();
Derived derived = new();

Console.WriteLine(_base is Base);
Console.WriteLine(_base is object);
Console.WriteLine(derived is Base);
Console.WriteLine(_base is Derived);

class Base { }
class Derived : Base { }

We create two objects from user defined types.

class Base {}
class Derived : Base {}

We have a Base and a Derived class. The
Derived class inherits from the Base class.

Console.WriteLine(_base is Base);
Console.WriteLine(_base is object);

Base equals Base and so the first line prints True.
The Base is also compatible with Object type. This is
because each class inherits from the mother of all classes — the
Object class.

Console.WriteLine(derived is Base);
Console.WriteLine(_base is Derived);

The derived object is compatible with the Base class because it
explicitly inherits from the Base class. On the other hand, the
_base object has nothing to do with the Derived class.

$ dotnet run
True
True
True
False

## C# type-safe checking with is

We can perform type-safe casting with the is operator.

Program.cs
  

object[] vals = [
    12, "falcon", 3, 1, true, 20
];

foreach (var e in vals)
{
    if (e is int val)
    {
        Console.WriteLine($"{val} powered is {val * val}");
    }
}

We have an array of objects. For all integers, we calculate its power.

if (e is int val)
{
    Console.WriteLine($"{val} powered is {val * val}");
}

If the conversion is possible, the is operator creates a local
variable val of int type.

$ dotnet run
12 powered is 144
3 powered is 9
1 powered is 1
20 powered is 400

Alternatively, we can use the LINQ's OfType method for the job.

Program.cs
  

object[] vals = [
    12, "falcon", 3, 1, true, 20
];

var res = vals.OfType&lt;int&gt;();

foreach (var e in res)
{
    Console.WriteLine($"{e} powered is {e * e}");
}

The OfType method filters the elements of an
IEnumerable based on a specified type.

## C# check boxed value

With the is operator, we can check the actual type of a boxed
value. Boxing is the process of converting a value type to the type
object.

Program.cs
  

object o = 12;
Console.WriteLine(o is int);
Console.WriteLine(o is double);

object o2 = "falcon";
Console.WriteLine(o2 is string);
Console.WriteLine(o2 is char);

The example determines the actual type of two boxed values.

$ dotnet run
True
False
True
False

## C# switch expression type pattern

Types can be patterns to the switch expression.

Program.cs
  

int age = 23;
string name = "Peter";

List&lt;string&gt; colors = ["blue", "khaki", "orange"];
int[] nums = [1, 2, 3, 4, 5];

Console.WriteLine(check(age));
Console.WriteLine(check(name));
Console.WriteLine(check(colors));
Console.WriteLine(check(nums));

object check(object val) =&gt; val switch
{
    int =&gt; "integer",
    string =&gt; "string",
    List&lt;string&gt; =&gt; "list of strings",
    Array =&gt; "array",
    _ =&gt; "unknown"
};

In the example, we check the types of variables using switch expression.

$ dotnet run
integer
string
list of strings
array

## Source

[Type-testing operators and cast expressions](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/type-testing-and-cast)

In this article we showed how to check types in C# with typeof,
is, and GetType.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).