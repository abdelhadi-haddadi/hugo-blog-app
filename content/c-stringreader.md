+++
title = "C# StringReader"
date = 2025-08-29T19:51:31.162+01:00
draft = false
description = "C# StringReader tutorial shows how to read strings in C# with StringReader. StringReader reads text data from strings."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# StringReader

last modified July 5, 2023

 

C# StringReader tutorial shows how to read strings in C# with StringReader.

Input &amp; output in C# is based on streams. A Stream is an
abstract base class of all streams. A stream is an abstraction of a sequence of
bytes, such as a file, an input/output device, an inter-process communication
pipe, or a TCP/IP socket.

## C# StringReader

StringReader reads text data from strings. It can read data
synchronously or asynchronously. The reading operation is stream-based.

## C# StringReader ReadToEnd

The ReadToEnd method reads all characters from the current position
to the end of the string and returns them as a single string.

Program.cs
  

using System.Text;

var sb = new StringBuilder();
sb.AppendLine("There is a hawk in the sky.");
sb.AppendLine("The sun is shining.");
sb.AppendLine("The flowers are blossoming.");

using var reader = new StringReader(sb.ToString());
string text = reader.ReadToEnd();
Console.WriteLine(text);

The example builds a string with StringBuilder and then reads
the text with StringReader's ReadToEnd.

$ dotnet run
There is a hawk in the sky.
The sun is shining.
The flowers are blossoming.

## C# StringReader ReadLine

The ReadLine method reads a line of characters from the current
string and returns the data as a string.

Program.cs
  

var text = @"The Battle of Thermopylae was fought between an alliance 
of Greek city-states, led by King Leonidas of Sparta, and the Persian Empire of 
Xerxes I over the course of three days, during the second Persian invasion of Greece.";

using var sr = new StringReader(text);

int count = 0;
string line;

while ((line = sr.ReadLine()) != null)
{
    count++;
    Console.WriteLine("Line {0}: {1}", count, line);
}

In the example, we count the lines of a multiline string.

while ((line = sr.ReadLine()) != null)
{

The ReadLine method returns the next line from the current 
string, or null if the end of the string is reached.

$ dotnet run
Line 1: The Battle of Thermopylae was fought between an alliance
Line 2: of Greek city-states, led by King Leonidas of Sparta, and the Persian Empire of
Line 3: Xerxes I over the course of three days, during the second Persian invasion of Greece.

## C# StringReader Read

The Read method reads the next character from the input string 
and advances the character position by one character.

Program.cs
  

var text = "There is an old hawk in the sky.";

using var reader = new StringReader(text);

int count = 0;
char mychar = 'h';
int n;

while ((n = reader.Read()) != -1)
{
    char c = (char) n;

    if (c.Equals(mychar))
    {
        count++;
    }
}

Console.WriteLine($"There are {count} '{mychar}' characters in the string");

In the example, we count the occurrence of the 'h' character in the text. 

while ((n = reader.Read()) != -1)
{

The Read method returns the next character from the underlying 
string, or -1 if no more characters are available.

$ dotnet run
There are 3 'h' characters in the string

## Source

[StringReader class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.stringreader?view=net-8.0)

In this article we have read strings in C# with StringReader.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).