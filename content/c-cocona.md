+++
title = "C# Cocona"
date = 2025-08-27T23:22:50.481+01:00
draft = false
description = "C# Cocona tutorial shows how to create console
C# applications using the Cocona library."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Cocona

last modified January 18, 2024

 

In this article we create simple console applications in C# using the Cocona
library.

Cocona is a library which makes it easy and fast to build console
applications on .NET. The library mimics ASP.NET Core Minimal API. It has
similar semantics like standard Unix tools.

There are two versions of the library: Cocona and Cocona.Light. The light
version has less overheads and features. It has no Logging, DI, and
configuration.

## C# Cocona simple example

We have a very simple console application.

Program.cs
  

using Cocona;

CoconaLiteApp.Run((string name) =&gt;
{
    Console.WriteLine($"Hello {name}");
});

If our application has only one command, we can directly use the
CoconaLiteApp.Run method. Cocona creates a command-line option
from the method parameter (name).

$ dotnet run --name Peter
Hello Peter

We pass a value to the --name option. The program responds with
a hello message.

$ dotnet run -- --help
Usage: FirstEx [--name &lt;String&gt;] [--help] [--version]

FirstEx

Options:
    --name &lt;String&gt;     (Required)
    -h, --help         Show help message
    --version          Show version

Cocona automatically creates the application help. Since dotnet
command also has the --help option, we must precede ours with
--.

The previous code was a shortened version of the following one:

Program.cs
  

using Cocona;

var builder = CoconaLiteApp.CreateBuilder();
var app = builder.Build();

app.AddCommand((string name) =&gt;
{
    Console.WriteLine($"Hello {name}");
});

app.Run();

In this code example, we build the Cocona application with a builder and add
a new command with AddCommand.

app.Run();

The Run method starts the Cocona enabled application.

## Class-based example

In class-based applications, public methods are automatically transformed into
commands.

Program.cs
  

using Cocona;

class Program
{
    static void Main(string[] args)
    {
        CoconaLiteApp.Run&lt;Program&gt;(args);
    }

    public void Message(string name, int age)
    {
        Console.WriteLine($"{name} is {age} years old");
    }
}

The program accepts two options: --name and --age.

$ dotnet run --name John --age 34
John is 34 years old

## Multiple named commands

We can add multiple named commands.

Program.cs
  

using Cocona;

var app = CoconaLiteApp.Create();

app.AddCommand("add", () =&gt; { Console.WriteLine("add command"); });
app.AddCommand("remove", () =&gt; { Console.WriteLine("remove command");});
app.AddCommand("show", () =&gt; { Console.WriteLine("show command"); });

app.Run();

The example adds three named commands.

app.AddCommand("add", () =&gt; { Console.WriteLine("add command"); });

The first parameter is the name of the command. The second parameter is the
delegate to the command body.

## Flags

Flags can be added with the Option attribute.

Program.cs
  

using Cocona;

var app = CoconaLiteApp.Create();

app.AddCommand(([Option('f')] bool force, [Option('r')] bool recursive) =&gt;
{
    Console.WriteLine(force);
    Console.WriteLine(recursive);
});

app.Run();

The example adds two flags: -f and -r.

$ dotnet run -- -f -r
True
True

$ dotnet run -- -fr
True
True

We can use both -f -r and -fr variations.

## An array of values

An array of values can be inserted into an array. This option is not supported
in the light Cocona application.

Program.cs
  

using Cocona;

var app = CoconaApp.CreateBuilder().Build();

app.AddCommand(([Option('N')]string[] names) =&gt;
{
    foreach (var name in names)
    {
        Console.WriteLine(name);
    }
});

app.Run();

The program accepts one or more values for the -N option.

app.AddCommand(([Option('N')]string[] names) =&gt;

An array of strings is decorated with the [Option('N')] attribute.

$ dotnet run -NPaul -NJane -NJohn -NLucy
Paul
Jane
John
Lucy

## Source

[Cocona Github page](https://github.com/mayuki/Cocona)

In this article we have created simple console applications in C# using Cocona.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).