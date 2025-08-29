+++
title = "C# IOException"
date = 2025-08-27T23:23:12.244+01:00
draft = false
description = "C# IOException tutorial shows how to work with
I/O exceptions in C#. The IOException is thrown when an I/O error occurs."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# IOException

last modified July 5, 2023

 

In this article we show how to work with IOExceptions in C#. 

Working with IO often causes errors. .NET throws IO exceptions when an IO error 
happens. The base IO exception is called IOException.

There are several other more specific IO exceptions:

    - FileNotFoundException

    - DirectoryNotFoundException

    - DriveNotFoundException

    - PathTooLongException

    - OperationCanceledException

These are derived from the base IOException. When handling
exceptions, we always handle the IOException last. Otherwise, the 
more specific exception will not be evaluated.

The exceptions are handled with try/catch keywords. Users of our
programs should be presented with easy to understand error messages. More
technical details are to be reserved for administartors. Errors are often written
to logfiles.

## Reading file

According to the documentation, the File.ReadAllText method opens a
text file, reads all the text in the file, and then closes the file. Also the 
documentation lists the possible exceptions that may be thrown.

Program.cs
  

var filename = "words.txt";

var content = File.ReadAllText(filename);
Console.WriteLine(content);

The example reads the contents of a text file. If no explicit exception handling 
is done, the .NET handles the exceptions.

$ dotnet run
Unhandled exception. System.IO.FileNotFoundException: Could not find file ...

Since the file was missing, the program failed with
System.IO.FileNotFoundException.

## The try/catch keywords

In the next example, we handle the possible error with try/catch.

Program.cs
  

var filename = "words.txt";

try
{
    var content = File.ReadAllText(filename);
    Console.WriteLine(content);
}
catch (FileNotFoundException e)
{
    Console.WriteLine("failed to read file");
    Console.WriteLine(e.Message);
}

One of the goals of exception handling is to provide accessible error messages 
to the users. They should not be bothered with technical details of the 
exceptions. 

$ dotnet run
failed to read file
Could not find file '/home/jano/Documents/prog/csharp/ioex/First/words.txt'.

This time we have a more readable error message.

Program.cs
  

var filename = "words.txt";

try
{
    var content = File.ReadAllText(filename);
    Console.WriteLine(content);
}
catch (FileNotFoundException e)
{
    Console.WriteLine("file was not found");
    Console.WriteLine(e.Message);
}
catch (IOException e)
{
    Console.WriteLine("IO error");
    Console.WriteLine(e.Message);
}

If we also catch the base IOException, it must follow the more 
specific one.

## Network streams

IO exceptions can be thrown when we read and write to network streams.

Program.cs
  

using System.Text;
using System.Net.Sockets;

using var client = new TcpClient();

var hostname = "webcode.me";
client.Connect(hostname, 80);

using NetworkStream networkStream = client.GetStream();
networkStream.ReadTimeout = 2000;

var message = @"GET / HTTP/1.1
Accept: text/html, charset=utf-8
Accept-Language: en-US
User-Agent: C# program
Connection: close
Host: webcode.me" + "\r\n\r\n";

using var reader = new StreamReader(networkStream, Encoding.UTF8);
byte[] bytes = Encoding.UTF8.GetBytes(message);

try
{
    networkStream.Write(bytes, 0, bytes.Length);
    Console.WriteLine(reader.ReadToEnd());
}
catch (IOException e)
{
    Console.WriteLine("GET request failed");
    Console.WriteLine(e.Message);
}

The example creates a GET request to a web page.

try
{
    networkStream.Write(bytes, 0, bytes.Length);
    Console.WriteLine(reader.ReadToEnd());
}
catch (IOException e)
{
    Console.WriteLine("GET request failed");
    Console.WriteLine(e.Message);
}

The network stream Write and ReadToEnd methods may 
throw IO exceptions.

## Source

[IOException class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.ioexception?view=net-8.0)

In this article we have worked with IOExceptions in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).