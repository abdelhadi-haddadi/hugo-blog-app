+++
title = "C# statement"
date = 2025-08-29T19:51:27.717+01:00
draft = false
description = "C# statement tutorial defines statements and shows how to work with them. A statement is an instruction for the computer program to perform an action."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# statement

last modified July 5, 2023

 

C# statement tutorial defines statements and shows how to work with them in C#
language.

A computer program largely consists of two building blocks: statements and
expressions. An expression is a unit of code that resolves to a
value. A statement is an instruction for the computer program to
perform an action. 

In general, statements are used to perform common tasks such as declaring
variables, assigning values, calling methods, looping through collections, and
performing conditions. 

A statement can be a single line of code ended with a semicolon, or there can 
be multiple statements enclosed in {} brackets.

C# recognizes the following types of statements: 

  - declaration statement

  - method invocation statement

  - iteration statement

  - expression statement

  - selection statement

  - empty statement

  - jump statement

  - exception handling statement

  - checked and unchecked statements

  - using statement

  - goto statement

**Note: ** this clasification is loose; other languages may use 
different categories.

## C# declaration and method invocation statements

In the first example, we have declaration and method invocation statements.

Program.cs
  

var name = "John Doe";
var age = 34;

Console.WriteLine($"{name} is {age} years old");
Console.WriteLine(Environment.Version);

We define two variables and create a message from them.

var name = "John Doe";
var age = 34;

These two lines are declaration statements.

Console.WriteLine($"{name} is {age} years old");
Console.WriteLine(Environment.Version);

These are method invocation statements.

## C# iteration statement

Iteration statements are used for repeated actions or for traversing
collections. For this we use the do, for, foreach, and while keywords.

Program.cs
  

var words = new List&lt;string&gt; { "falcon", "vulcan", "owl", "stone", "bread" };

foreach (var word in words) 
{
    Console.WriteLine(word);
}

Console.WriteLine("--------------------------");

for (int i = 0; i &lt; words.Count; i++)
{
    Console.WriteLine(words[i]);
}

Console.WriteLine("--------------------------");

int j = 5;

while (j &gt; 0)
{
    Console.WriteLine("falcon");
    j--;
} 

In the example, we have three iteration statements. We go over a list of words 
with foreach and for statements and output a word five 
times with the while statement.

## C# expression statement

The following example uses an expression statement.

Program.cs
  

var baskets = 12;
var apples_per_basket = 30;

var total = baskets * apples_per_basket;

Console.WriteLine($"There are {total} apples");

We compute the total number of apples in all baskets.

var total = baskets * apples_per_basket;

We have an expression statement. This could be also called an assignment
statement or assignment expression statement.

## C# selection statement

Selection statements, or conditional statements, are use to process certain 
branch of code based on one or more specified conditions. Selection statements
are performed with if or switch statements.

Program.cs
  

var r = new Random();
int n = r.Next(-5, 5);

Console.WriteLine(n);

if (n &lt; 0)
{
    Console.WriteLine("The n variable is negative");
} else if (n == 0)
{
    Console.WriteLine("The n variable is zero");

} else
{
    Console.WriteLine("The n variable is positive");
}

In the example only one code block is executed. This is controled by the if 
statement depending on the returned random value.

## C# empty statement

An empty statement is used when there are no statements.

Program.cs
  

int[] vals = new int[10];
int n = vals.Length;

for (int i = 0; i &lt; n; vals[i++] = 0)
;

Console.WriteLine(string.Join(", ", vals));

A semicolon is used for en empty statement.

## C# jump statement

Jump statements transfer control to another section of code. They are created 
with the break, continue, goto, return, and yield keywords. 

Program.cs
  

var random = new Random();

while (true)
{
    int num = random.Next(1, 30);
    Console.Write("{0} ", num);

    if (num == 22)
    {
        break;
    }
}

Console.Write('\n');

The example presents the break statement. We jump out of the
endless while loop using break.

## C# exception handling statement

The exception handling statements are used for dealing with exceptions in code. 
For this, we use the try/catch/finally keywords.

Program.cs
  

int x = 100;
int y = 0;
int z;

try
{
    z = x / y;
}
catch (ArithmeticException e)
{
    Console.WriteLine("An exception occurred");
    Console.WriteLine(e.Message);
}

In the program, we deal with an ArithmeticException.

## C# checked and unchecked statements

The checked and unchecked statements are used to control the overflow checking
context for integral-type arithmetic operations and conversions.

An arithmetic overflow is a condition that occurs when a calculation produces a
result that is greater in magnitude than that which a given register or storage
location can store or represent. 

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

With the checked keyword, we can enforce an exception when the
overflow occurs. 

## C# using statement

The using statement obtains one or more resources, executes a statement, and
then disposes of the resource.

Program.cs
  

using System.Text;

var path = "data.txt";

using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);
using var sr = new StreamReader(fs, Encoding.UTF8);

string content = sr.ReadToEnd();

Console.WriteLine(content);

In the example, we read the contents of a file. With the using
statement, we automatically handle the disposal of file-related resources.

## C# goto statement

With goto statement, the code execution can be transferred to the 
specified label.

Program.cs
  

Console.WriteLine("message 1");

goto next;

Console.WriteLine("message 2");

next:
    Console.WriteLine("message 3");

In the example, we skip the second message. This creates an unreachable
statement warning.

## Source

[C# statements - programming Guide](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/statements)

In this article we have worked with statements in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).