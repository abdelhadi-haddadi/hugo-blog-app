+++
title = "Reading text files in C#"
date = 2025-08-29T19:51:17.752+01:00
draft = false
description = "Learn to read text files in C# using StreamReader, FileStream, and more. This comprehensive tutorial covers synchronous and asynchronous file reading with practical examples."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Reading text files in C#

last modified April 22, 2025

 

This tutorial demonstrates various methods for reading text files in C#,
focusing on efficient stream-based techniques.

In C#, input and output operations rely on streams. The Stream
class serves as an abstract base for all streams, representing a sequence of
bytes from sources like files, I/O devices, inter-process pipes, or TCP/IP
sockets.

## C# stream

The Stream class provides a unified interface for input and output,
abstracting away operating system and device-specific details. For example,
MemoryStream handles in-memory data, while FileStream
manages file-based data.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

The examples in this tutorial read from this sample text file.

## C# read text file with File.ReadLines

The File.ReadLines method returns an
IEnumerable of a file's lines, closing the file after
iteration. It is memory-efficient, ideal for large files compared to methods
loading entire contents at once.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

var enumLines = File.ReadLines(path, Encoding.UTF8);

foreach (var line in enumLines)
{
    Console.WriteLine(line);
}

This example iterates over the file's lines using a foreach loop, printing each
line to the console efficiently.

## C# read text file with File.ReadAllLines

The File.ReadAllLines method reads all lines of a text file into a
string array and closes the file automatically.

**Note: ** File.ReadLines is more memory-efficient
than File.ReadAllLines for large files due to its iterative
approach.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

string[] lines = File.ReadAllLines(path, Encoding.UTF8);

foreach (string line in lines)
{
    Console.WriteLine(line);
}

This example reads the entire thermopylae.txt file into a string
array and prints each line to the console.

foreach (string line in lines)
{
    Console.WriteLine(line);
}

The string array is iterated to display each line, processing the file's
contents in memory.

## C# read text file with File.ReadAllText

The File.ReadAllText method reads a text file's entire contents
into a single string and closes the file.

**Note: ** Use File.ReadAllText for small files only,
as it loads the entire file into memory, which is inefficient for large files.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

string content = File.ReadAllText(path, Encoding.UTF8);
Console.WriteLine(content);

This example reads the full contents of thermopylae.txt into a
string and outputs it to the console.

## C# reading text file with StreamReader

The StreamReader class is designed for reading character data in a
specific encoding, optimized for processing text files line by line or in full.

### Using StreamReader's ReadToEnd

The ReadToEnd method reads all characters from the current stream
position to the end, returning the content as a string.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);
using var sr = new StreamReader(fs, Encoding.UTF8);

string content = sr.ReadToEnd();

Console.WriteLine(content);

This example uses StreamReader with ReadToEnd to read
the entire file content via a FileStream.

using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);

The FileStream class creates a stream for file operations,
supporting both synchronous and asynchronous access with specified mode and
permissions.

using var sr = new StreamReader(fs, Encoding.UTF8);

The FileStream is passed to StreamReader, enabling
text reading with UTF-8 encoding.

string content = sr.ReadToEnd();

The ReadToEnd method retrieves all characters from the stream's
current position to its end.

### Using File.OpenRead

The File.OpenRead method provides a convenient way to create a
FileStream for reading.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using var fs = File.OpenRead(path);
using var sr = new StreamReader(fs, Encoding.UTF8);

string content = sr.ReadToEnd();

Console.WriteLine(content);

This example uses File.OpenRead to create a FileStream,
which is read by StreamReader using ReadToEnd.

### Using StreamReader's ReadLine

The ReadLine method reads a single line from the stream, returning
it as a string, ideal for line-by-line processing.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);
using var sr = new StreamReader(fs, Encoding.UTF8);

string line = String.Empty;

while ((line = sr.ReadLine()) != null)
{
    Console.WriteLine(line);
}

This example reads thermopylae.txt line by line using
StreamReader's ReadLine method.

string line = String.Empty;

while ((line = streamReader.ReadLine()) != null)
{
        Console.WriteLine(line);
}

A while loop reads each line using ReadLine, printing it until the
end of the file is reached.

## C# read text with File.OpenText

The File.OpenText method opens a UTF-8 encoded text file for
reading, simplifying StreamReader creation.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using StreamReader sr = File.OpenText(path);
string content = sr.ReadToEnd();

Console.WriteLine(content);

This example uses File.OpenText to open a text file and reads its
contents with ReadToEnd.

## C# read text file asynchronously with StreamReader's ReadToEndAsync

The ReadToEndAsync method asynchronously reads all characters from
the stream's current position to its end, returning a string.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);
using var sr = new StreamReader(fs, Encoding.UTF8);

string content = await sr.ReadToEndAsync();
Console.WriteLine(content);

This example reads a text file asynchronously using
ReadToEndAsync, improving performance for I/O-bound operations.

string content = await sr.ReadToEndAsync();

The await operator pauses execution until the asynchronous
ReadToEndAsync task completes, ensuring non-blocking operation.

## C# read text file with buffered StreamReader

This example demonstrates reading a large text file using a buffered
StreamReader with a custom buffer size for optimized performance.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using var fs = new FileStream(path, FileMode.Open, FileAccess.Read);
using var sr = new StreamReader(fs, Encoding.UTF8, true, 1024);

string line;
while ((line = sr.ReadLine()) != null)
{
    Console.WriteLine(line);
}

This example uses a StreamReader with a 1KB buffer to read
thermopylae.txt line by line, optimizing memory usage for large
files.

## C# read text file with async ReadLineAsync

The ReadLineAsync method reads a line asynchronously, enhancing
performance for line-by-line processing in I/O-bound applications.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using var fs = File.OpenRead(path);
using var sr = new StreamReader(fs, Encoding.UTF8);

string line;
while ((line = await sr.ReadLineAsync()) != null)
{
    Console.WriteLine(line);
}

This example reads thermopylae.txt line by line asynchronously
using ReadLineAsync, ensuring efficient non-blocking I/O.

## C# read text file with TextReader

The TextReader class, base of StreamReader, provides a
generic way to read text, useful for abstracting text sources.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

using TextReader reader = File.OpenText(path);
string content = reader.ReadToEnd();

Console.WriteLine(content);

This example uses TextReader via File.OpenText to read
the entire thermopylae.txt file, demonstrating a flexible text
reading approach.

## C# read text file with error handling

This example shows how to handle file reading errors, ensuring robust file I/O
operations with proper exception management.

Program.cs
  

using System.Text;

var path = "thermopylae.txt";

try
{
    using var fs = File.OpenRead(path);
    using var sr = new StreamReader(fs, Encoding.UTF8);

    string content = sr.ReadToEnd();
    Console.WriteLine(content);
}
catch (FileNotFoundException)
{
    Console.WriteLine("Error: The file was not found.");
}
catch (IOException ex)
{
    Console.WriteLine($"Error reading file: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"Unexpected error: {ex.Message}");
}

This example wraps file reading in a try-catch block, handling specific
exceptions like FileNotFoundException and IOException
to ensure robust error reporting.

## Source

[File and Stream I/O](https://learn.microsoft.com/en-us/dotnet/standard/io/)

This article explored multiple techniques for reading text files in C#,
including synchronous and asynchronous methods.

## Author

I am Jan Bodnar, a dedicated programmer with extensive experience in software
development. Since 2007, I have authored over 1,400 programming articles and
eight e-books. With more than a decade of teaching programming, I share my
expertise through comprehensive tutorials.

List [all C# tutorials](/csharp/).