+++
title = "C# command line arguments"
date = 2025-08-29T19:50:35.194+01:00
draft = false
description = "C# command line arguments tutorial shows how to work with command line arguments in C#. Command line arguments are values passed to applications usually through the terminal."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# command line arguments

last modified July 5, 2023

 

In this article we show how to work with command line arguments in C#.

Command line arguments are values passed to console programs usually through the
terminal.

We can send command line arguments to a Main method by declaring
a parameter with the string[] type. Programs that use top-level
statements have a default built-in args variable, which contains
the arguments.

## C# cmd args in Main

In the first example, we pass command line arguments to a Main
method.

Program.cs
  

class Program
{
    static void Main(string[] args)
    {
        foreach (var arg in args)
        {
            Console.WriteLine(arg);
        }
    }
}

In the program, we simply print all arguments to the console.

static void Main(string[] args)

Command line arguments have the string[] type. It is a convention
to name the variable args.

$ dotnet run John Doe gardener
John
Doe
gardener

## C# cmd args without Main

In case there is no Main method, the arguments are accessible via 
the args built-in variable.

Program.cs
  

Console.WriteLine($"You have passed {args.Length} arguments");

foreach (var arg in args)
{
    Console.WriteLine(arg);
}

The program prints the number of command line arguments and prints them to the 
terminal.

$ dotnet run 1 2 3 4 5 6
You have passed 6 arguments
1
2
3
4
5
6

## C# Environment.GetCommandLineArgs

The Environment.GetCommandLineArgs returns a string array
containing the command-line arguments for the current process. 

Program.cs
  

string[] cargs = Environment.GetCommandLineArgs();

Console.WriteLine($"You have passed {cargs.Length} arguments");

foreach (var arg in cargs)
{
    Console.WriteLine(arg);
}

It is more explicit than the default built-in args variable. Also, 
Environment.GetCommandLineArgs counts the program name as one of 
the arguments.

$ dotnet run 1 2 3 4 5 
You have passed 6 arguments
/home/jano/Documents/prog/csharp/cmd-args/SimpleEx/bin/Debug/net6.0/SimpleEx.dll
1
2
3
4
5

## C# Environment.CommanLine

The Environment.CommanLine returns a string containing command-line
arguments.

Program.cs
  

string cargs = Environment.CommandLine;
Console.WriteLine(cargs);

string[] vals = cargs.Split(" ");

try
{
    int sum = vals.Skip(1).Select(e =&gt; Convert.ToInt32(e)).Sum();
    Console.WriteLine($"The sum of values is {sum}");
    return 0;
}
catch (FormatException e)
{
    Console.WriteLine("Invalid input");
    Console.WriteLine(e.Message);
    return 1;
}

The program expects a list of integers as input.

string cargs = Environment.CommandLine;

We get the command line input with Environment.CommandLine.

string[] vals = cargs.Split(" ");

We split the string into parts.

int sum = vals.Skip(1).Select(e =&gt; Convert.ToInt32(e)).Sum();

We skip the first argument, which is the program name. We convert the strings 
into integers and compute a sum.

catch (FormatException e)
{

Parsing command line arguments is error-prone. We can get
FormatExceptions.

## C# CommandLineParser

The Command Line Parser Library offers a clean and concise API for manipulating
command line arguments.

$ dotnet add package CommandLineParser

We add the CommandLineParser package.

Program.cs
  

namespace CommandLineArgs;

using CommandLine;

class Options
{
    [Option("vals")]
    public IEnumerable&lt;int&gt;? Vals { get; set; }

}

class Program
{
    static void Main(string[] args)
    {
        Parser.Default.ParseArguments&lt;Options&gt;(args).WithParsed&lt;Options&gt;(o =&gt;
        {
            if (o.Vals != null)
            {
                int sum = o.Vals.Sum();
                Console.WriteLine($"The sum is {sum}");
            }
            else
            {
                Console.WriteLine("No arguments");
            }
        });
    }
}

The program defines a --vals option which accepts a sequence of 
integers.

$ dotnet run --vals 1 2 3 4 5 6
The sum is 21

## Source

[Main and command-line arguments](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/program-structure/main-command-line)

In this article we have worked with command line arguments in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).