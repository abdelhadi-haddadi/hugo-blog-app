+++
title = "C# exception"
date = 2025-08-27T23:23:00.787+01:00
draft = false
description = "C# exception tutorial shows how to work with exceptions in C#. An exception represents an error that occurs during application execution."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# exception

last modified July 5, 2023

 

In this article we show how to work with exceptions in C#.

An *exception* represents an error that occurs during application
execution.

During the execution of our application many things might go wrong. A disk might
get full and we cannot save our file. An Internet connection might go down while
our application tries to connect to a site. These errors might cause problems
including an application crash. It is a responsibility of a programmer to handle
errors that can be anticipated.

The try, catch and finally keywords are
used to work with exceptions.

Exception is the base class for all exceptions. The errors are
reported by exceptions being thrown. After an exception is thrown, it is handled
by the application or by the default exception handler. The exception contains
information about the error.

Different kinds of exceptions are thrown during the development of the
application and after the development has finished. Developers receive
exceptions with lots of technical details, while users get only short, basic
informative messages. 

## C# catching exception

The catch keyword is used to catch an exception that is thrown.

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

In the above program, we intentionally divide a number by zero. This leads to an
error. Note that this is a scholarly example to demonstrate how exceptions work.
In reality, division by error is a program error which is resolved by ensuring
that the denominator is not zero.

try
{
    z = x / y;
}

Statements that are error prone are placed in the try block.

catch (ArithmeticException e)
{
    Console.WriteLine("An exception occurred");
    Console.WriteLine(e.Message);
}

Exception types follow the catch keyword. In our case we have an
ArithmeticException. This exception is thrown for errors in an
arithmetic, casting, or conversion operation. Statements that follow the
catch keyword are executed when an error occurs. When an exception
occurs, an exception object is created. From this object we get the
Message property and print it to the console.

$ dotnet run
An exception occurred
Attempted to divide by zero.

## C# uncaught exception

Any uncaught exception in the current context propagates to a higher context and
looks for an appropriate catch block to handle it. If it can't find any suitable
catch blocks, the default mechanism of the .NET runtime will terminate the
execution of the entire program.

Program.cs
  

int x = 100;
int y = 0;

int z = x / y;

Console.WriteLine(z);

In this program, we divide by zero. There is no no custom exception handling.

$ dotnet run
Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
...

The C# compiler gives the above error message.

## C# IOException

The IOException is thrown when an I/O error occurs. In the
following example we read the contents of a file.

Program.cs
  

var fs = new FileStream("langs.txt", FileMode.OpenOrCreate);

try
{
    var sr = new StreamReader(fs);
    string? line;

    while ((line = sr.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }

}
catch (IOException e)
{
    Console.WriteLine("IO Error");
    Console.WriteLine(e.Message);
}
finally
{
    Console.WriteLine("Inside finally block");

    if (fs != null)
    {
        fs.Close();
    }
}

The statements following the finally keyword are always executed.
It is often used for clean-up tasks, such as closing files or clearing buffers.

catch (IOException e)
{
    Console.WriteLine("IO Error");
    Console.WriteLine(e.Message);
}

In this case, we catch for a specific IOException exception.

finally
{
    Console.WriteLine("Inside finally block");

    if (fs != null)
    {
        fs.Close();
    }
}

These lines guarantee that the file handler is closed.

$ cat langs.txt
C#
Java
Python
Ruby
PHP
JavaScript

These are the contents of the langs.txt file.

$ dotnet run
C#
Java
Python
Ruby
PHP
JavaScript
Inside finally block

## C# multiple exceptions

We often need to deal with multiple exceptions.

Program.cs
  

int x;
int y;
double z;

try
{
    Console.Write("Enter first number: ");
    x = Convert.ToInt32(Console.ReadLine());

    Console.Write("Enter second number: ");
    y = Convert.ToInt32(Console.ReadLine());

    z = x / y;
    Console.WriteLine("Result: {0:N} / {1:N} = {2:N}", x, y, z);
}
catch (DivideByZeroException e)
{
    Console.WriteLine("Cannot divide by zero");
    Console.WriteLine(e.Message);

}
catch (FormatException e)
{
    Console.WriteLine("Wrong format of number.");
    Console.WriteLine(e.Message);
}

In this example, we catch for various exceptions. Note that more specific
exceptions should precede the generic ones. We read two numbers from the console
and check for zero division error and for wrong format of number.

$ dotnet run
Enter first number: we
Wrong format of number.
Input string was not in a correct format.

## C# custom exception

Custom exceptions are user defined exception classes that derive from the
System.Exception class.

Program.cs
  

int x = 340004;
const int LIMIT = 333;

try
{
    if (x &gt; LIMIT)
    {
        throw new BigValueException("Exceeded the maximum value");
    }
}
catch (BigValueException e)
{
    Console.WriteLine(e.Message);
}

class BigValueException : Exception
{
    public BigValueException(string msg) : base(msg) { }
}

We assume that we have a situation in which we cannot deal with big numbers.

class BigValueException : Exception

We have a BigValueException class. This class derives from the
built-in Exception class.

const int LIMIT = 333;

Numbers bigger than this constant are considered to be "big" by our program.

public BigValueException(string msg) : base(msg) {}

Inside the constructor, we call the parent's constructor. We pass the message to
the parent.

if (x &gt; LIMIT)
{
    throw new BigValueException("Exceeded the maximum value");
}

If the value is bigger than the limit, we throw our custom exception. We give
the exception a message "Exceeded the maximum value".

catch (BigValueException e)
{
    Console.WriteLine(e.Message);
}

We catch the exception and print its message to the console.

$ dotnet run
Exceeded the maximum value

## Source

[Exceptions and Exception Handling](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/exceptions/)

In this article we worked with exceptions in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).