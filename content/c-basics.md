+++
title = "C# basics"
date = 2025-08-27T23:22:44.763+01:00
draft = false
description = "C# basics tutorial covers the basics of C#
programming. We work with variables, constants and basic data types. We read and
write to the console; we mention variable interpolation."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# basics

last modified January 17, 2024

 

In this article we cover basic programming concepts of the C# language. We
introduce the very basic programs. We work with variables, constants and basic
data types. We read and write to the console; we mention variable interpolation.

## C# old school example

We start with a traditional C# example.

Program.cs
  

using System;

namespace Simple
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("This is C#");
        }
    }
}

The program prints "This is C#" message to the console. We explain it line by
line.

using System;

The using keyword imports a specific namespace to our program.
Namespaces are created to group and/or distinguish named entities from other
ones. This prevents name conflicts. This line is a C# statement. Each statement
is ended with a semicolon.

namespace Simple
{

We declare a namespace. Namespaces are used to organize code and to prevent
name clashes.

class Program
{
    ...
}

Each C# program is structured. It consists of classes and its members. A class
is a basic building block of a C# program. The above code is a class definition.
The definition has a body, which starts with a left curly brace {
and ends with a right curly brace }.

static void Main(string[] args)
{
    ...
}

The Main is a method. A method is a piece of code created to do a
specific job. Instead of putting all code into one place, we divide it into
pieces, called methods. This brings modularity to our application. Each method
has a body, in which we place statements. The body of a method is enclosed by
curly brackets.

The specific job for the Main method is to start the application.
It is the entry point to each console C# program. The method is declared to be
static. This static method can be called without the need
to create an instance of the Program class. First we need start the
application and after that, we are able to create instances of classes. The 
void keyword signifies that the method does not return any value. 
(Methods may or may not return values.)

The Main method has the args argument, which stores
command line arguments. Through command line arguments, users of the program can 
pass it values.

Console.WriteLine("This is C#");

In this code line, we print the "This is C#" string to the console. To print a
message to the console, we use the WriteLine method of the
Console class. The class represents the standard input, output, and
error streams for console applications. Note that Console class is
part of the System namespace. This line was the reason to import
the namespace with the using System;
statement. If we didn't use the statement, we would have to use the fully
qualified name of the WriteLine method:
System.Console.WriteLine("This is C#");.

$ dotnet run
This is C#

## C# basic example simplified

Over the years, C# has been significantly improved and simplified. The language 
became much more approachable for beginners.

Program.cs
  

namespace Simple;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("This is C#");
    }
}

Since C# 10, we can omit the using System; statement. It is
automatically included with *implicit usings*. 

namespace Simple;

Also, the namespace declaration can be reduced as well (C# 10). This is called 
file-scoped namespace and it reduces the need for a block and indentation.

With top-level statements (C# 9), we can further simplify the code.  
We don't need to use the Main method as a starting point and the
code does not have to be placed inside an application class.

**Note: ** Only one file in the application may use top-level
statements.

For small programs, we can also omit the namespace declaration.

Program.cs
  

Console.WriteLine("This is C#");

Now the original 12 line code example was reduced to a single line of code.

## C# console reading values

We can use the Console class to read values as well.

Program.cs
  

Console.Write("Enter your name: ");

string name = Console.ReadLine();
Console.WriteLine($"Hello {name}");

The second program reads a value from a console and prints it.

string name = Console.ReadLine();

We read a line from the terminal. When we hit the Enter key, the input is
assigned to the name variable. The input is stored into the
name variable, which is declared to be of type string.

Console.WriteLine($"Hello {name}");

In this code line, we do string formatting. The {name} specifier
is replaced with the value of the name variable.

$ dotnet run
Enter your name: Jan
Hello Jan

## C# command line arguments

C# programs can receive command line arguments. They follow the name of the
program, when we run it. A C# program receives command line arguments in the
args array of strings.

Program.cs
  

for (int i = 0; i &lt; args.Length; i++)
{
    Console.WriteLine($"{args[i]}");
}

Command line arguments can be passed to the Mainmethod.

for (int i = 0; i &lt; args.Length; i++)
{
    Console.WriteLine($"{args[i]}");
}

We go through the array of these arguments with a for loop and print them to the
console. The Length property gives the number of elements in the
array. Loops and arrays will be described in more detail later.

$ dotnet run 1 2 3
1
2
3

We provide three numbers as command line arguments and these are printed to the
console.

## C# variables

A *variable* is a place to store data. A variable has a name and a data
type. A data type determines what values can be assigned to the variable, for
instance integers, strings, or boolean values. Over the time of the program
variables can obtain various values of the same data type. Variables are always
initialized to the default value of their type before any reference to the
variable can be made.

Program.cs
  

string city = "New York";
string name = "Paul"; int age = 35;
string nationality = "American";

Console.WriteLine(city);
Console.WriteLine(name);
Console.WriteLine(age);
Console.WriteLine(nationality);

city = "London";
Console.WriteLine(city);

In the example we have four variables.

string city = "New York";

We declare a city variable of the string type and
initialize it to the "New York" value.

string name = "Paul"; int age = 35;

We declare and initialize two more variables. We can put two statements on one
line. But for readability reasons, each statement should be on a separate line.

Console.WriteLine(city);
Console.WriteLine(name);
Console.WriteLine(age);
Console.WriteLine(nationality);

We print the values of the variables to the terminal.

city = "London";

We assign a new value to the city variable.

$ dotnet run
New York
Paul
35
American
London

## The var keyword

Variables at a method scope can be implicitly typed using the var
keyword. The variables are always strongly typed, but with var
the type is inferred by C# compiler from the right side of the assignment.

Program.cs
  

var name = "Peter";
var age = 23;

Console.WriteLine($"{name} is {age} years old");

name = "Jozef";
age = 32;

Console.WriteLine($"{name} is {age} years old");

Console.WriteLine(name.GetType());
Console.WriteLine(age.GetType());

In the program we have two implicitly typed variables.

var name = "Peter";
var age = 23;

On the left side of the assignment we use the var keyword.
The name variable is of string type and the
age of int. The types are inferred from the right side
of the assignment.

Console.WriteLine(name.GetType());
Console.WriteLine(age.GetType());

We determine the types of the variables with GetType.

$ dotnet run
Peter is 23 years old
Jozef is 32 years old
System.String
System.Int32

## C# List collection

While variables hold single values, multiple values can be added to collections.
A List is a sequence of elements, which can be accessed by indexing
operation with []. Elements of a list can be traversed with e.g. a
foreach keyword.

The List type is resides in the 
System.Collections.Generic, which is included with implicit usings.

Program.cs
  

List&lt;string&gt; words = ["stone", "rock", "falcon", "sky"];

Console.WriteLine(words[2]);

Console.WriteLine();

foreach (var word in words)
{
    Console.WriteLine(word);
}

In the example, we work a list of words.

List&lt;string&gt; words = ["stone", "rock", "falcon", "sky"];

A list object is created. Between the angle brackets (&lt;&gt;) we
specify the data type of the list elements. The list is initialized with
elements inside the square brackets ([]). Each element of the list 
is separated with comma.

Console.WriteLine(words[2]);

Here we print the third element to the console. (The indexes start from 0.)

foreach (var word in words)
{
    Console.WriteLine(word);
}

Using a foreach loop, we go through all elements of the list and print them to
the console. In each of the cycles, the
word variable is given one of the elements from the list.

$ dotnet run
falcon

stone
rock
falcon
sky

## C# discards

*Discards* are special, write-only variables which are used to trash the
values that are not interesting to the programmer. The _
(underscore character) is used for a discard.

Program.cs
  

var vals = (1, 2, 3, 4, 5, 6);

(int x, int y, int z, _, _, _) = vals;

Console.WriteLine(x);
Console.WriteLine(y);
Console.WriteLine(z);

The example defines a tuple of values. By using a deconstruction operation, we
assign the values of the tuples into variables.

var vals = (1, 2, 3, 4, 5, 6);

We define a tuple of six values. A tuple is a collection of ordered,
heterogeneous elements.

(int x, int y, int z, _, _, _) = vals;

Say, we are interested only in the first three values of the tuple. On the left
side of the assignment, we define three variables: x,
y, and y. Since the vals tuple has six
elements, we need to have six variables on the left side as well. Here we can
use the _ character for the remainding variables. This way we
indicate that currently these values are not important to us an we won't work
with them.

## C# Range method

The Range method generates a sequence of numbers within a specified
range. The first parameter is the value of the first integer in the sequence.
The second parameter is the  number of sequential integers to generate.

Program.cs
  

foreach(var el in Enumerable.Range(1, 10))
{
    Console.WriteLine(el);
}

The example prints values 1..10 to the terminal using a foreach loop. The
sequence of the integers were generated with the Range
method.

## C# constants

Unlike variables, *constants* retain their values. Once initialized, they
cannot be modified. Constants are created with the const keyword.

Program.cs
  

const int WIDTH = 100;
const int HEIGHT = 150;
int var = 40;

var = 50;

// WIDTH = 110;

In this example, we declare two constants and one variable.

const int WIDTH = 100;
const int HEIGHT= 150;

We use the const keyword to inform the compiler that we declare a
constant. It is a convention to write constants in upper case letters.

int var = 40;

var = 50;

We declare and initialize a variable. Later, we assign a new value to the
variable.

// WIDTH = 110;

This is not possible with a constant. If we uncomment this line, we get a
compilation error.

## C# string formatting

Building strings from variables is a very common task in programming.
C# has the string.Format method to format strings.

Program.cs
  

int age = 34;
string name = "William";

string msg = string.Format("{0} is {1} years old.", name, age);
Console.WriteLine(msg);

Strings are immutable in C#. We cannot modify an existing string. We must create
a new string from existing strings and other types. In the code example, we
create a new string. We also use values from two variables.

int age = 34;
string name = "William";

Here we define two variables.

string msg = string.Format("{0} is {1} years old.", name, age);

We use the Format method of the built-in string class. The
{0}, {1} are the places where the variables are
evaluated. The numbers represent the position of the variable. The
{0} evaluates to the first supplied variable and the
{1} to the second.

$ dotnet run
William is 34 years old.

## C# string interpolation

Some dynamic languages like Perl, PHP or Ruby support string/variable
interpolation. Variable interpolation is replacing variables with their values
inside string literals. C# supports variable interpolation since C# 6.0.

Program.cs
  

string name = "Peter";
int age = 34;

string msg = $"{name} is {age} years old";

Console.WriteLine(msg);

In the code example, we build a string using variable interpolation.

string msg = $"{name} is {age} years old";

The string is preceded with the $ character and the variables
are inside curly brackets.

$ dotnet run
Peter is 34 years old

## Source

[A tour of the C# language](https://learn.microsoft.com/en-us/dotnet/csharp/tour-of-csharp/)

In this article we covered some basics of the C# language.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).