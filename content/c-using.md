+++
title = "C# using"
date = 2025-08-29T19:51:35.617+01:00
draft = false
description = "Learn how to use the 'using' statement and 'using' directive in C# for efficient resource management and namespace organization with practical examples."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# using

last modified May 21, 2025

 

C# using tutorial shows how to work with the using statement/directive in C#.

The using keyword has three different uses:

    - using statement

    - using directive

    - using static directive

The using statement defines a scope at the end of which an object will be
disposed. The using directive creates an alias for a namespace or imports types
defined in other namespaces. The using static directive imports the members of a
class. This allows us to use static members without qualifying them with the
class name.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

We read from this text file.

## C# using statement

The Dispose method must be called on unmanaged resources such 
as files, streams, or window handles. Traditionally, the resources were released 
in the finally block of the try/(catch)/finally 
statements.

The using statement automatically releases the resources when the
object goes out of scope. It also ensures that the Dispose is
called when an exception occurrs.

In an object inherits from the IDisposable interface, it must be 
explicitly released.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);
using var sr = new StreamReader(fs, Encoding.UTF8);

string content = sr.ReadToEnd();

Console.WriteLine(content);

In the example, we read from a text file.

using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);
using var sr = new StreamReader(fs, Encoding.UTF8);

Both FileStream and StreamReader inherit from the 
IDisposable interface. With the using statement we 
ensure that the resources are correctly released when the two objects go 
out of scope; in our case, when they reach the end of the file.

The older syntax required to create a block with curly brackets.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read))
{ 
    using (var sr = new StreamReader(fs, Encoding.UTF8))
    {
        string content = sr.ReadToEnd();
        Console.WriteLine(content);
    }
}

Both using statements create their blocks.

It is possible to group the using statements together.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using (var fs = new FileStream(path, FileMode.Open, FileAccess.Read))
using (var sr = new StreamReader(fs, Encoding.UTF8))
{
    string content = sr.ReadToEnd();
    Console.WriteLine(content);
}

In the example, we have an alternative syntax; we create one block with two 
using statements.

The oldest syntax uses try/finally keywords.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

FileStream? fs = null;
StreamReader? sr = null;

try
{
    fs = new FileStream(path, FileMode.Open, FileAccess.Read);
    sr = new StreamReader(fs, Encoding.UTF8);

    string content = sr.ReadToEnd();
    Console.WriteLine(content);

} finally
{

    fs?.Close();
    sr?.Close();
}

In the finally clause, we close the resources with the
Close method. Note that Close also calls
Dispose.

C# introduced several convenience methods for reading text, such as 
File.ReadAllLines or File.ReadAllText. These methods 
automatically call the Dispose method for us.

Program.cs
  

using System.Text;

var path = "/home/janbodnar/Documents/thermopylae.txt";

string content = File.ReadAllText(path, Encoding.UTF8);
Console.WriteLine(content);

As per documentation, the ReadAllText method opens a text file,
reads all the text in the file into a string, and then closes the file.

## C# using directive

The using directive allows us to use types of a particular namespace so that we
do not have to fully qualify the use of a type in that namespace.

Program.cs
  

int[] vals = [1, 4, -5, 3, -3, -1, 0, 2, 6, 7];
var positive = vals.Where(e =&gt; e &gt; 0);

Console.WriteLine(string.Join(" ", positive));

We use two using directives at the top of the file. They allow 
use to use Console.WriteLine and Where methods.

Since C# 10 these two statements are redundant, however. We have them included
in the implicit global usings by default.

## C# using directive for aliases

With the using directive, we can also create aliases.

Program.cs
  

using Terminal = System.Console;

Terminal.WriteLine("Hello there!");

In the example, we create an alias for System.Console.

## C# using static directive

The using static allows us to access static members and nested
types of a type without having to qualify the access with the type name.

Program.cs
  

using static System.Math;

Console.WriteLine(Sqrt(3*3 + 4*4));

In the example, we import the Sqrt method into our namespace.
Now we can use it without the Math. prefix.

## Source

[using keyword - language reference](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using)

In this article we have worked with the using statement/directive
in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).