+++
title = "C# write text files"
date = 2025-08-29T19:51:36.759+01:00
draft = false
description = "C# write text files shows how to write text files in C#. Input & output operations in C# are based on streams. A Stream is an abstract base class of all streams."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# write text files

last modified July 5, 2023

 

C# write text files shows how to write text files in C#. Input &amp; output
operations in C# are based on streams. A Stream is an abstract base class of all
streams. 

Input &amp; output in C# is based on streams. A Stream is an
abstract base class of all streams. A stream is an abstraction of a sequence of
bytes, such as a file, an input/output device, an inter-process communication
pipe, or a TCP/IP socket. 

## C# stream

Stream provides a generic interface to the types of input and
output, and isolate the programmer from the specific details of the operating
system and the underlying devices. For instance, MemoryStream works
with data located in the memory and FileStream with data in a files.

## C# write text file with File.WriteAllText

The File.WriteAllText method creates a new file, writes the
contents to the file, and then closes the file. If the target file already
exists, it is overwritten.

Program.cs
  

var path = "data.txt";

string text = "old falcon";
File.WriteAllText(path, text);

Console.WriteLine("text written");

The example writes text to a file. 

File.WriteAllText(path, text);

The File.WriteAllText method takes two parameters: the file to
write to and the string to write to the file. The method takes an optional third
parameter: the encoding. If it is not specified, UTF8 is set. 

## C# write text with File.WriteAllLines

 
The File.WriteAllLines method creates a new file, writes one or more strings
 to the file, and then closes the file.

Program.cs
  

var path = "data.txt";

string[] lines = {"old falcon", "deep forest", "golden ring"};
File.WriteAllLines(path, lines);

Console.WriteLine("lines written to file");

The example writes three lines to the file.

string[] lines = {"old falcon", "deep forest", "golden ring"};

This is a string array of three lines. 

File.WriteAllLines(path, lines);

The lines are written to the file with the File.WriteAllLines method.

## C# write text with File.WriteAllBytes

The File.WriteAllBytes method creates a new file, writes the
specified byte array to the file, and then closes the file. If the target file
already exists, it is overwritten.

Program.cs
  

using System.Text;

var path = "data.txt";

string text = "Today is a beautiful day. We go swimming and fishing.";
byte[] data = Encoding.ASCII.GetBytes(text);

File.WriteAllBytes(path, data);

Console.WriteLine("data written to file");

The example writes text into a text file with the
File.WriteAllBytes method.

string text = "Today is a beautiful day. We go swimming and fishing.";
byte[] data = Encoding.ASCII.GetBytes(text);

First, we transform the text into bytes using the Encoding.ASCII.GetBytes
method.

File.WriteAllBytes(path, data);

The array of bytes is then written to the file with the File.WriteAllBytes
method.

## C# write text with StreamWriter's WriteLine

The StreamWriter's WriteLine method writes out a formatted 
string and a new line to the stream.

Program.cs
  

var path = "data.txt";

using var sw = new StreamWriter(path);
sw.WriteLine("old falcon");

Console.WriteLine("data written to file");

The example writes one line to the text file.

using var sw = new StreamWriter(path);
sw.WriteLine("old falcon");

A line is written to the text file. We use the using keyword
to automatically release the file resource when the sw variable
goes out of scope.

## C# write text with FileStream's write

The FileStream's write method writes 
a block of bytes to the file stream. 

public override void Write(byte[] array, int offset, int count);

The first parameter is the buffer containing data to write to the stream. The
second parameter is the zero-based byte offset in array from which to begin
copying bytes to the stream. And the third parameter is the maximum number of
bytes to write.

Program.cs
  

using System.Text;

var path = "data.txt";

using FileStream fs = File.OpenWrite(path);

var data = "falcon\nhawk\nforest\ncloud\nsky";
byte[] bytes = Encoding.UTF8.GetBytes(data);

fs.Write(bytes, 0, bytes.Length);

Console.WriteLine("data written to file");

The example writes text data to the text file.

using FileStream fs = File.OpenWrite(path);

First, we open a file stream with the File.OpenWrite method.

var data = "falcon\nhawk\nforest\ncloud\nsky";
byte[] bytes = Encoding.UTF8.GetBytes(data);

Then we transform the text data into bytes with the Encoding.UTF8.GetBytes
method.

fs.Write(bytes, 0, bytes.Length);

Finally, we write the array of bytes to the file stream.

## C# write text asynchronously

In the previous examples, we have written text data synchronously. C# also
provides equivalent asynchronous methods. 

The File.WriteAllTextAsync asynchronously creates a new file,
writes the specified string to the file, and then closes the file. If the target
file already exists, it is overwritten.

Program.cs
  

var path = "data.txt";

string text = "an old falcon";
await File.WriteAllTextAsync(path, text);

Console.WriteLine("text written");

In the example, we write to the text file asynchronously.

await File.WriteAllTextAsync(path, text);

The await operator is applied to a task in an asynchronous method
to suspend the execution of the method until the awaited task finishes. 

## Source

[File class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.file?view=net-8.0)

In this article we have written to text files in various ways in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).