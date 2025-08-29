+++
title = "C# flow control"
date = 2025-08-27T23:23:04.290+01:00
draft = false
description = "In this article we cover the flow control in C#. We define several keywords that enable us to control the flow of a C# program."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# flow control

last modified January 19, 2024

 

In this article we talk about the flow control in C#. We define several keywords
that enable us to control the flow of a C# program.

When a C# program is run, the code is executed from top to bottom. The flow of
the program can be altered with various keywords, including if/else, for, while,
and switch.

The control flow structures can be used to executed code conditionally or
multiple times. 

## C# if statement

The if statement has the following general form:

if (expression)
{
    statement;
}

The if keyword is used to check if an expression is true. If it is
true, a statement is then executed. The statement can be a single statement or a
compound statement. A compound statement consists of multiple statements
enclosed by the block. A block is code enclosed by curly brackets.

Program.cs
  

var r = new Random();
int n = r.Next(-5, 5);

Console.WriteLine(n);

if (n &gt; 0)
{
    Console.WriteLine("The n variable is positive");
}
 

A random number is generated. If the number is greater than zero, we print a
message to the terminal.

var r = new Random();
int n = r.Next(-5, 5);

These two lines generate a random integer between -5 .. 5.

if (n &gt; 0)
{
    Console.WriteLine("The n variable is positive");
}

Using the if keyword, we check if the generated number is greater
than zero. The if keyword is followed by a pair of round brackets.
Inside the brackets, we place an expression. The expression results in a boolean
value. If the boolean value is true, then the block enclosed by two curly
brackets is executed. 

In our case, the string "The n variable is positive" is printed to the terminal.
If the random value is negative, nothing is done. The curly brackets are
optional if we have only one expression.

$ dotnet run
-3
$ dotnet run
-4
$ dotnet run
-1
$ dotnet run
1
The n variable is positive

When the condition is met, the message is written to the console.

## C# else statement

We can use the else keyword to create a simple branch.
If the expression inside the square brackets following the if
keyword evaluates to false, the statement following the else
keyword is automatically executed.

Program.cs
  

var r = new Random();
int n = r.Next(-5, 5);

Console.WriteLine(n);

if (n &gt; 0)
{
    Console.WriteLine("The number is positive");
} else
{
    Console.WriteLine("The number is negative");
}

Either the block following the if keyword is executed, or the
block following the else keyword.

if (n &gt; 0)
{
    Console.WriteLine("The number is positive");
} else
{
    Console.WriteLine("The number is negative");
}

The else keyword follows the right curly bracket of the
if block. It has its own block enclosed by a pair of curly brackets.

$ dotnet run
-3
The number is negative
$ dotnet run
-1
The number is negative
$ dotnet run
2
The number is positive

We execute the program three times.

## C# else if

We can create multiple branches using the else if keyword.
The else if keyword tests for another condition if and only if
the previous condition was not met. Note that we can use multiple
else if keywords in our tests.

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

The previous program had a slight issue. Zero was given to negative values.
The following program will fix this.

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

If the first condition evaluates to true, e.g. the entered value is less than zero,
the first block is executed and the remaining two blocks are skipped. If the first
condition is not met, then the second condition following the if else
keywords is checked. If the second condition evaluates to true, the second block
is executed. If not, the third block following the else keyword is
executed. The else block is always executed if the previous
conditions were not met.

$ dotnet run
-1
The n variable is negative
$ dotnet run
4
The n variable is positive
$ dotnet run
1
The n variable is positive
$ dotnet run
0
The n variable is zero

We execute the program three times. The 0 is correctly handled.

## C# switch statement

The switch statement is a selection control flow statement.
It allows the value of a variable or expression to control the flow of program
execution via a multi-way branch. It creates multiple branches in a simpler way
than using the combination of if/else if/else 
statements.

We have a variable or an expression. The switch keyword is used
to test a value from the variable or the expression against a list of values.
The list of values is presented with the case keyword.
If the values match, the statement following the case is executed.
There is an optional default statement. It is executed if no other
match is found.

Since C# 7.0, the match expression can be any non-null expression.

### Selecting day of week

In the following example, we select a day of week with  switch
statement.

Program.cs
  

var dayOfWeek = DateTime.Now.DayOfWeek;

switch (dayOfWeek)
{
    case DayOfWeek.Sunday:
        Console.WriteLine("dies Solis");
        break;

    case DayOfWeek.Monday:
        Console.WriteLine("dies Lunae");
        break;

    case DayOfWeek.Tuesday:
        Console.WriteLine("dies Martis");
        break;

    case DayOfWeek.Wednesday:
        Console.WriteLine("dies Mercurii");
        break;

    case DayOfWeek.Thursday:
        Console.WriteLine("dies Jovis");
        break;

    case DayOfWeek.Friday:
        Console.WriteLine("dies Veneris");
        break;

    case DayOfWeek.Saturday:
        Console.WriteLine("dies Saturni");
        break;
}

The example determines the current day of week and prints its Latin equivalent.

switch (dayOfWeek)
{
    ...
}

In the round brackets, the switch keyword takes a value from an
expression, which is going to be tested. The body of the switch
keyword is placed inside a pair or curly brackets. In the body, we can place
multiple case options. Each option is ended with the
break keyword.

case DayOfWeek.Sunday:
    Console.WriteLine("dies Solis");
    break;

With the case statement, we test the value of the matching
expression. If it is equal to DayOfWeek.Sunday, we print the
Latin dies Solis.

$ dotnet run
dies Solis

The program was run on Sunday.

### Selecting domain

The user is requested to enter a domain name. The domain name is read and stored
in a variable. The variable is tested with the switch keyword
against a list of options.

Program.cs
  

Console.Write("Enter a domain name: ");

string domain = Console.ReadLine();

domain = domain.Trim().ToLower();

switch (domain)
{
    case "us":
        Console.WriteLine("United States");
    break;

    case "de":
        Console.WriteLine("Germany");
    break;

    case "sk":
        Console.WriteLine("Slovakia");
    break;

    case "hu":
        Console.WriteLine("Hungary");
    break;

    default:
        Console.WriteLine("Unknown");
    break;
}

In our program, we have a domain variable. We read a value for the
variable from the command line. We use the case statement to test
for the value of the variable. There are several options. If the value equals
for example to "us" the "United States" string is printed to the console.

string domain = Console.ReadLine();

Input from the user is read from the console.

domain = domain.Trim().ToLower();

The Trim method strips the variable from potential leading and
trailing white spaces. The ToLower converts the characters to
lowercase. Now the "us", "US", "us " are viable options for the us domain name.

case "us":
    Console.WriteLine("United States");
break;

In this case option, we test if the domain variable is equal to "us" string.
If true, we print a message to the console. The option is ended with the
break keyword. If one of the options is successfully evaluated,
the break keyword terminates the switch block.

default:
    Console.WriteLine("Unknown");
break;

The default keyword is optional. If none of the case
options is evaluated, then the default section is executed.

$ dotnet run
Enter a domain name: us
United States

$ dotnet run
Enter a domain name: HU
Hungary

$ dotnet run
Enter a domain name: pl
Unknown

### Using when statement

The case statement can be used with when
statement to specify additional condition.

Program.cs
  

Console.Write("Enter your age: ");

var input = Console.ReadLine();

var age = Int32.Parse(input.Trim());

switch (age)
{
    case var myAge when myAge &lt; 0:
        Console.WriteLine("Age cannot be a negative value");
    break;

    case var myAge when myAge &gt; 130:
        Console.WriteLine("This is an unlikely high age");
    break;

    default:
        Console.WriteLine("The entered age is {0}", age);
    break;
}

In the program the user is asked to enter his age.

case var myAge when myAge &lt; 0:
    Console.WriteLine("Age cannot be a negative value");
break;

With the help of the when expression, we test if the entered
value is less than 0. With the var keyword, we create a temporary
myAge variable.

### Using enumeration as match expression

For the matching expression, we can use any type. In the following example,
we use an enumeration.

Program.cs
  

var color = (Color) (new Random()).Next(0, 7);

switch (color)
{
    case Color.Red:
        Console.WriteLine("The color is red");
        break;

    case Color.Green:
        Console.WriteLine("The color is green");
        break;

    case Color.Blue:
        Console.WriteLine("The color is blue");
        break;

    case Color.Brown:
        Console.WriteLine("The color is brown");
        break;

    case Color.Yellow:
        Console.WriteLine("The color is yellow");
        break;

    case Color.Pink:
        Console.WriteLine("The color is pink");
        break;

    case Color.Orange:
        Console.WriteLine("The color is orange");
        break;

    default:
        Console.WriteLine("The color is unknown.");
        break;
}

enum Color { Red, Green, Blue, Brown, Yellow, Pink, Orange }

The example generates randomly a colour enumeration. The swith
statement determines which colour value was generated.

$ dotnet run
The color is orange

$ dotnet run
The color is blue

$ dotnet run
The color is brown

We run the program.

## Switch expressions

Switch expressions make the syntax of a switch statement more
concise. They were introduced in C# 8.0.

Program.cs
  

Console.Write("Enter a domain name: ");

string domain = Console.ReadLine();

domain = domain.Trim().ToLower();

string result = domain switch
{
    "us" =&gt; "United States",
    "de" =&gt; "Germany",
    "sk" =&gt; "Slovakia",
    "hu" =&gt; "Hungary",

    _ =&gt; "Unknown"
};

Console.WriteLine(result);

The variable comes before the switch keyword. The case
and : elements are replaced with =&gt;. The
default  case is replaced with a _ discard. The bodies
are expressions, not statements.

## C# while statement

The while statement is a control flow statement that allows code to
be executed repeatedly based on a given boolean condition.

while (expression)
{
    statement;
}

The while keyword executes the statements inside the block enclosed
by the curly brackets. The statements are executed each time the expression is
evaluated to true.

Program.cs
  

int i = 0;
int sum = 0;

while (i &lt; 10)
{
    i++;
    sum += i;
}

Console.WriteLine(sum);

In the code example, we calculate the sum of values from a range of numbers.

The while loop has three parts. Initialization, testing and
updating. Each execution of the statement is called a cycle.

int i = 0;

We initiate the i variable. It is used as a counter.

while (i &lt; 10)
{
   ...
}

The expression inside the round brackets following the while
keyword is the second phase, the testing. The statements in the body are
executed until the expression is evaluated to false.

i++;

This is the last, third phase of the while loop, the updating. We
increment the counter. Note that improper handling of the while
loops may lead to endless cycles.

### Do-while statement

It is possible to run the statement at least once. Even if the condition is not
met. For this, we can use the do while keywords.

Program.cs
  

int count = 0;

do {
    Console.WriteLine(count);
} while (count != 0);

First the block is executed and then the truth expression is evaluated.
In our case, the condition is not met and the do while statement
terminates.

## C# for statement

When the number of cycles is know before the loop is initiated, we can use the
for statement. In this construct we declare a counter variable
which is automatically increased or decreased in value during each repetition of
the loop.

## Simple for loop

A for loop has three phases: initialization, condition and
code block execution, and incrementation.

Program.cs
  

for (int i = 0; i &lt; 10; i++)
{
    Console.WriteLine(i);
}

In this example, we print numbers 0..9 to the console.

for (int i = 0; i &lt; 10; i++)
{
    Console.WriteLine(i);
}

There are three phases. In the first phase, we initiate the counter
i to zero. This phase is done only once. Next comes the condition.
If the condition is met, the statement inside the for block is executed. In the
third phase the counter is increased. Now we repeat the 2, 3 phases until the
condition is not met and the for loop is left. In our case, when the counter
i is equal to 10, the for loop stops executing.

## For loop array traversal

A for loop can be used for traversal of an array. From the Length
property of the array we know the size of the array.

Program.cs
  

string[] planets = [ "Mercury", "Venus", "Earth",
    "Mars", "Jupiter", "Saturn", "Uranus", "Pluto" ];

for (int i = 0; i &lt; planets.Length; i++)
{
    Console.WriteLine(planets[i]);
}

Console.WriteLine("In reverse:");

for (int i = planets.Length - 1; i &gt;= 0; i--)
{
    Console.WriteLine(planets[i]);
}

We have an array holding the names of planets in our Solar System. Using two for
loops, we print the values in ascending and descending orders.

for (int i = 0; i &lt; planets.Length; i++)
{
    Console.WriteLine(planets[i]);
}

The arrays are accessed by zero-based indexing. The first item has index 0.
Therefore, the i variable is initialized to zero. The condition
checks if the i variable is less than the length of the array. In
the final phase, the i variable is incremented.

for (int i = planets.Length - 1; i &gt;= 0; i--)
{
    Console.WriteLine(planets[i]);
}

This for loop prints the elements of the array in reverse order. The
i counter is initialized to array size. Since the indexing is zero
based, the last element has index array size-1. The condition ensures that the
counter is greater or equal to zero. (Array indexes cannot be negative). In the
third step, the i counter is decremented by one.

## More expressions in for loop

More expressions can be placed in the initialization and iteration phase of
the for loop.

Program.cs
  

var r = new Random();
var values = new int[10];

int sum = 0;
int num = 0;

for (int i = 0; i &lt; 10; i++, sum += num)
{
    num = r.Next(10);
    values[i] = num;
}

Console.WriteLine(string.Join(",", values));
Console.WriteLine("The sum of the values is {0}", sum);

In our example, we create an array of ten random numbers. A sum of the
numbers is calculated.

for (int i = 0; i &lt; 10; i++, sum += num)
{
    num = r.Next(10);
    values[i] = num;
}

In the third part of the for loop, we have two expressions separated by a comma
character. The i counter is incremented and the current number is
added to the sum variable.

Console.WriteLine(string.Join(",", values));

Using the Join method of the System.String class,
we print all the values of the array in one shot. They will be separated by
a comma character.

$ dotnet run
9,3,1,7,9,8,5,6,3,3
The sum of the values is 54

### Nested for loops

For statements can be nested; i.e. a for statement can be placed inside another
for statement. All cycles of a nested for loops are executed for each cycle of
the outer for loop.

Program.cs
  

string[] a1 = ["A", "B", "C"];
string[] a2 = ["A", "B", "C"];

for (int i = 0; i &lt; a1.Length; i++)
{
    for (int j = 0; j &lt; a2.Length; j++)
    {
        Console.WriteLine(a1[i] + a2[j]);
    }
}

In this example, we create a cartesian product of two arrays.

string[] a1 = ["A", "B", "C"];
string[] a2 = ["A", "B", "C"];

We have two arrays. Each of the arrays has tree letters. A caresian product
is when each of the elements from one array is paired with all elements of
the other array. To achieve this, we use a nested for loop.

for (int i = 0; i &lt; a1.Length; i++)
{
    for (int j = 0; j &lt; a2.Length; j++)
    {
        Console.WriteLine(a1[i] + a2[j]);
    }
}

There is a nested for loop inside another parent for loop. The nested for loop
is executed fully for each of the cycles of the parent for loop.

$ dotnet run
AA
AB
AC
BA
BB
BC
CA
CB
CC

## C# foreach statement

The foreach construct simplifies traversing over
collections of data. It has no explicit counter. The foreach
statement goes through the array or collection one by one and
the current value is copied to a variable defined in the construct.

Program.cs
  

string[] planets = [ "Mercury", "Venus", "Earth", "Mars", "Jupiter",
    "Saturn", "Uranus", "Neptune" ];

foreach (string planet in planets)
{
    Console.WriteLine(planet);
}

In this example, we use the foreach statement to go
through an array of planets.

foreach (string planet in planets)
{
    Console.WriteLine(planet);
}

The usage of the foreach statement is straightforward. The
planets is an array that we iterate through. The
planet is a temporary variable that has the current value from the
array. The foreach statement goes through all the planets and
prints them to the console.

$ dotnet run
Mercury
Venus
Earth
Mars
Jupiter
Saturn
Uranus
Neptune

## C# break statement

The break statement can be used to terminate a block defined by
while, for or switch statements.

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

We define an endless while loop. We use the break
statement to get out of this loop. We choose a random value from 1 to 30.
We print the value. If the value equals to 22, we finish the endless while loop.

$ dotnet run
18 3 21 26 12 27 23 25 2 21 15 4 18 12 24 13 7 19 10 26 5 22

## C# continue statement

The continue statement is used to skip a part of the loop and
continue with the next iteration of the loop. It can be used in combination with
for and while statements.

In the following example, we print a list of numbers that cannot be divided by 2
without a remainder (odds).

Program.cs
  

int num = 0;

while (num &lt; 1000)
{
    num++;

    if (num % 2 == 0)
    {
        continue;
    }

    Console.Write($"{num} ");
}

Console.Write('\n');

We iterate through numbers 1..999 with the while loop.

if (num % 2 == 0)
{
    continue;
}

If the expression num % 2 returns 0, the number in question can be
divided by 2. The continue statement is executed and the rest of
the cycle is skipped. In our case, the last statement of the loop is skipped and
the number is not printed to the console. The next iteration is started.

## Source

[Statements, Expressions, Operators](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/statements#c-language-specification)

In this article we have covered C# control flow structures.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).