+++
title = "C# lambda expression"
date = 2025-08-29T19:50:56.637+01:00
draft = false
description = "Learn how to use lambda expressions in C#. This tutorial covers lambda syntax, anonymous functions, functional programming concepts, and practical examples for using lambda in .NET applications."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# lambda expression

last modified May 14, 2025

 

This C# lambda expression tutorial explains how to use lambda expressions to
write more concise and readable code in C#.

A *lambda expression* is an *anonymous function* that is not bound
to an identifier. It can be used wherever a delegate type is expected, allowing
for in-line function definitions without explicitly declaring a separate method.
Lambda expressions are commonly used in LINQ queries, event handling, and
functional programming.

Lambda expressions enable a more compact syntax compared to traditional methods,
improving code readability and reducing boilerplate. They are especially useful
for short operations where defining a full method would be unnecessary.

Lambda expressions have two primary forms:

    
        
            Syntax
            Description
        
    
    
        
            (input-parameters) =&gt; expression
            Single-line lambda with an expression body.
        
        
            (input-parameters) =&gt; { &lt;sequence-of-statements&gt; }
            Multi-line lambda with a statement block.
        
    

## C# lambda expression simple example

The following is a simple example with lambda expressions.

Program.cs
  

Func&lt;int, int&gt; square = x =&gt; x * x;
Func&lt;int, int&gt; cube = x =&gt; x * x * x;
Func&lt;int, int&gt; inc = x =&gt; x++;
Func&lt;int, int, int&gt; add = (x, y) =&gt; x + y;

Console.WriteLine(square(5));
Console.WriteLine(cube(5));
Console.WriteLine(inc(5));
Console.WriteLine(add(5, 7));

In the example, we define four functions.

Func&lt;int, int&gt; square = x =&gt; x * x;

A Func delegate refers to a lambda expression, which squares
the input value. This is the closest equivalent of plain functions in other
languages.

$ dotnet run
25
125
5
12

## C# lambda statement

The *lambda statement* may have multiple statements, which are enclosed
in {} braces.

Program.cs
  

Action&lt;string&gt; greet = name =&gt;
{
    string greeting = $"Hello {name}!";
    Console.WriteLine(greeting);
};

greet("Pau");
greet("Lucia");

In the example, we use an Action delegate. On the right side
of the equation, we have a lambda statement, which consists of two statements.
The Action delegate takes one input parameter and does not return
anything.

$ dotnet run
Hello Pau!
Hello Lucia!

## C# lambda expression with arrays

In the following examples, we work with arrays.

Program.cs
  

int[] vals = [1, -2, 3, 4, 0, -3, 2, 1, 3];

var v1 = Array.FindIndex(vals, x =&gt; x == 3);
Console.WriteLine(v1);

var v2 = Array.FindLastIndex(vals, x =&gt; x == 3);
Console.WriteLine(v2);

var positive = Array.FindAll(vals, x =&gt; x &gt; 0);
Console.WriteLine(string.Join(",", positive));

The array functions expect a predicate function, which is applied for all
elements of the array.

var positive = Array.FindAll(vals, x =&gt; x &gt; 0);

We pass the FindAll method a lambda expressions as its second
parameter; the expression is a predicate which returns true for values greater
than zero.

$ dotnet run
2
8
1,3,4,2,1,3

## C# lambda expression with LINQ

We can use lambda expressions in many LINQ methods.

Program.cs
  

List&lt;int&gt; vals = [-1, 2, -2, 0, 3, 4, -5];

var squared = vals.Select(x =&gt; x * x);
Console.WriteLine(string.Join(", ", squared));

var filtered = vals.Where(x =&gt; x &gt; 0);
Console.WriteLine(string.Join(", ", filtered));

In the example, we use lambda expression in LINQ's Select and
Where methods.

$ dotnet run
1, 4, 4, 0, 9, 16, 25
2, 3, 4

## Lambda default parameters

Since C# 12, parameters in lambdas can have default values.

Program.cs
  

var message = (string greet, string name = "there") =&gt; $"{greet} {name}!";

var res = message("Hi", "Tom");
Console.WriteLine(res);

var res2 = message("Hello");
Console.WriteLine(res2);

Providing the name parameter becomes now optional. The optional
parameters must follow the mandatory.

$ dotnet run
Hi Tom!
Hello there!

## C# array of lambda expressions

In the following example, we create an array of lambda expressions.

Program.cs
  

Func&lt;int, int&gt;[] funs =
[
    x =&gt; x * x,
    x =&gt; ++x,
    x =&gt; --x
];

for (int i = 0; i &lt; 6; i++)
{
    Console.WriteLine(funs[0](i));
    Console.WriteLine(funs[1](i));
    Console.WriteLine(funs[2](i));
    Console.WriteLine();
}

In the example, we put three lambda expression in an array. Then in the for
loop, we pass integers 0..5 to the three lambda expressions.

## C# lambda expression discards

Since C# 9.0, we can use discards (_) as parameters of lambdas and anonymous
methods.

Program.cs
  

using System.Windows.Forms;
using System.Drawing;

namespace QuitButton;
 
class MyForm : Form
{
    private FlowLayoutPanel flowPanel = new();

    public MyForm()
    {
        InitComponents();
    }

    private void InitComponents()
    {
        Text = "Quit button";
        ClientSize = new Size(800, 450);

        flowPanel = new FlowLayoutPanel();

        flowPanel.Dock = DockStyle.Fill;
        flowPanel.BorderStyle = BorderStyle.FixedSingle;

        var button = new Button();
        button.Margin = new Padding(10, 10, 0, 0);

        button.Text = "Quit";
        button.AutoSize = true;
        button.Click += (_, _) =&gt; Close();

        flowPanel.Controls.Add(button);
        Controls.Add(flowPanel);

        CenterToScreen();
    }

    [STAThread]
    static void Main()
    {
        Application.SetHighDpiMode(HighDpiMode.SystemAware);
        Application.EnableVisualStyles();
        Application.Run(new MyForm());
    }
}

The example is a simple GUI application created with Winforms; it works
only on Windows.

button.Click += (_, _) =&gt; Close();

Since we do not work with the sender object and the event arguments, we can
use discards.

## C# lambda with closure

A lambda expression can capture and use variables from its enclosing scope. This
is called a closure.

Program.cs
  

int factor = 3;
Func&lt;int, int&gt; multiply = x =&gt; x * factor;

Console.WriteLine(multiply(5));
factor = 4;
Console.WriteLine(multiply(5));

The lambda expression uses the variable factor from the outer
scope. If the value of factor changes, the lambda reflects the new
value.

## C# lambda as a comparator

Lambdas can be used to define custom sort orders for collections, such as
sorting strings by length.

Program.cs
  

List&lt;string&gt; words = ["pear", "apple", "banana", "kiwi"];

words.Sort((a, b) =&gt; a.Length.CompareTo(b.Length));
Console.WriteLine(string.Join(", ", words));

The lambda (a, b) =&gt; a.Length.CompareTo(b.Length) is used as a
custom comparator to sort the list by string length.

## C# lambda with multiple parameters and statements

A lambda can have multiple parameters and a block of statements, such as for
aggregating values.

Program.cs
  

List&lt;int&gt; nums = [1, 2, 3, 4];

int sum = nums.Aggregate(0, (acc, x) =&gt; {

    int result = acc + x;
    Console.WriteLine($"Adding {x}, sum so far: {result}");
    return result;
});

Console.WriteLine($"Total: {sum}");

This example uses a multi-parameter, multi-statement lambda in
Aggregate to sum values and print progress at each step.

In this article we have worked with lambda expressions in C#.

## Source

[Lambda expressions and anonymous functions](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/operators/lambda-expressions)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).