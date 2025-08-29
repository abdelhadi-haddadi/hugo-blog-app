+++
title = "C# variable"
date = 2025-08-29T19:51:35.608+01:00
draft = false
description = "C# variable tutorial shows how to work with variables in C#. A variable represents a storage location."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# variable

last modified July 5, 2023

 

C# variable tutorial shows how to work with variables in C#.
[C# tutorial](http://zetcode.com/lang/csharp/) is a comprehensive
tutorial on C# language.

A *variable* is a storage location. A variable has a name and a data
type. A data type determines what values can be assigned to the variable, for
instance integers, strings, or boolean values. Over the time of the program
variables can obtain various values of the same data type.

Variables are always initialized to the default value of their type before any
reference to the variable can be made.

Variable names must adhere to the rules for valid C# identifiers. Variable names
must start with a letter, or _. They may contain Unicode letter characters,
decimal digit characters, Unicode connecting characters, Unicode combining
characters, or Unicode formatting characters. Variable names are case sensitive.

## C# variable example

In the first example, we define several variables.

Program.cs
  

string city = "Berlin";
string name = "Peter"; int age = 36;
string nationality = "German";

Console.WriteLine(city);
Console.WriteLine(name);
Console.WriteLine(age);
Console.WriteLine(nationality);

city = "London";
Console.WriteLine(city);

In the example we have four variables.

string city = "Berlin";

We declare a city variable of the string type and
initialize it to the "New York" value.

string name = "Peter"; int age = 36;

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
Berlin
Peter
36
German
London

## C# variable - var keyword

Variables can be implicitly typed using the var
keyword. The variables are always strongly typed, but with var
the type is inferred by C# compiler from the right side of the assignment.

Program.cs
  

var name = "Lucia";
var age = 27;

Console.WriteLine($"{name} is {age} years old");

name = "Robert";
age = 42;

Console.WriteLine($"{name} is {age} years old");

Console.WriteLine(name.GetType());
Console.WriteLine(age.GetType());

In the example we have two implicitly typed variables.

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
Lucia is 27 years old
Robert is 42 years old
System.String
System.Int32

## C# local variable

A local variable is a variable whose scope is within the block in which it is
declared. Local variables can be defined in functions, try statements, switch
statements, or for and foreach statements.

Program.cs
  

Console.WriteLine(Repeat(0, "hey"));
Console.WriteLine(Repeat());
Console.WriteLine(Repeat(4));
Console.WriteLine(Repeat(5, "cau"));

string Repeat(int times = 0, string message = "")
{
    int _times = 3;
    string _message = "hello";

    if (times == 0 &amp;&amp; string.IsNullOrEmpty(message)) {

        return string.Join(" ", Enumerable.Repeat(_message, _times));
    } else if (times == 0 &amp;&amp; !string.IsNullOrEmpty(message)) {

        return string.Join(" ", Enumerable.Repeat(message, _times));
    } else if (times != 0 &amp;&amp; string.IsNullOrEmpty(message)) {

        return string.Join(" ", Enumerable.Repeat(_message, times));
    } else if (times != 0 &amp;&amp; !string.IsNullOrEmpty(message)) {

        return string.Join(" ", Enumerable.Repeat(message, times));
    } else {

        return String.Empty;
    }
}

In the example, we have defined two local variables: _times and
_message. They validity is limited by the curly brackets of the
Repeat function.

$ dotnet run
hey hey hey
hello hello hello
hello hello hello hello
cau cau cau cau cau

## C# instance variable

An instance variable lives within an instance of the created class. It ceases to
exist when there are no more references to the instance.

Each instance variable is unique in each created object.

Program.cs
  

var u1 = new User { Name = "John Doe", Occupation = "gardener" };
Console.WriteLine(u1);

var u2 = new User { Name = "Roger Roe", Occupation = "accountant" };
Console.WriteLine(u2);

class User
{
    public User() {}

    public string Name { set; get; }
    public string Occupation { set; get; }

    public override string ToString()
    {
        return $"{Name} is a(n) {Occupation}";
    }
}

We have the User class, which has two instance variables:
Name and Occupation. These two variables are distinct
in the created two instances of the class.

$ dotnet run
John Doe is a(n) gardener
Roger Roe is a(n) accountant

## C# static variable

A static variable value is shared among all instances of the class. Only one
copy of a static member exists, regardless of how many instances of the class
are created.

Program.cs
  

var counter1 = new Counter();
counter1.f();
counter1.f();
counter1.f();

var counter2 = new Counter();
counter2.f();
counter2.f();
counter2.f();

var ret1 = counter1.show();
var ret2 = counter2.show();

Console.WriteLine(ret1);
Console.WriteLine(ret2);

class Counter
{
    static int count = 0;

    public void f()
    {
        count++;
    }

    public string show() {

        return $"# of calls: {count}";
    }
}

We have a count static member variable, defined inside the
Counter class. The counter is incremented via the f
method.

var counter1 = new Counter();
counter1.f();
counter1.f();
counter1.f();

We create a counter object and call the f method three times.

var counter2 = new Counter();
counter2.f();
counter2.f();
counter2.f();

We create another counter object and call its f method three times.

$ dotner run
$ of calls: 6
$ of calls: 6

From the output we can see that both objects share the static count
variable.

## C# variable  - function parameters

Value parameters come into existence upon invocation of a function, member
function, or anonymous function to which the parameter belongs. It is
initialized with the value of the argument given in the invocation.

Program.cs
  

int r = Add(5, 6);
Console.WriteLine(r);

int r2 = Add(11, 12);
Console.WriteLine(r2);

int Add(int x, int y) {

    return x + y;
}

In the example, we have two function parameters: x and
y. They are valid within the bounds of the Add
function.

$ dotnet run
11
23

## C# variable  - function reference parameters

A parameter declared with a ref modifier is a reference parameter.
A reference parameter does not create a new storage location; it represents the
same storage location as the variable given as the argument. 

Program.cs
  

int x = 5;
int y = 6;

Console.WriteLine(x);
Console.WriteLine(y);

Change(ref x, ref y);

Console.WriteLine("--------------------");

Console.WriteLine(x);
Console.WriteLine(y);

void Change(ref int x, ref int y) {

    x = 15;
    y = 16;
}

In the Change function, now new variables are created. References 
to existing x and y variables are passed instead.

$ dotnet run
5
6
--------------------
15
16

## Source

[Declaration statements - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/statements/declarations)

In this article we have worked with variables in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).