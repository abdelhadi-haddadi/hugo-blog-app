+++
title = "C# StreamReader"
date = 2025-08-29T19:51:28.822+01:00
draft = false
description = "C# StreamReader tutorial shows how to read text files in C# with StreamReader. StreamReader reads characters from a byte stream in a particular encoding."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# StreamReader

last modified May 2, 2025

 

C# StreamReader tutorial shows how to read text files in C# with StreamReader. 
[C# tutorial](http://zetcode.com/lang/csharp/) is a comprehensive
tutorial on C# language.

In C#, input and output operations are based on *streams*. A
Stream is an abstract base class for handling sequences of bytes.
Streams serve as intermediaries for reading and writing data in various
contexts, such as files, input/output devices, inter-process communication
pipes, or TCP/IP sockets.

## C# StreamReader

The StreamReader class facilitates reading text data from a
*byte stream* in a specified encoding. Unlike working directly with
bytes, StreamReader simplifies text processing by automatically
handling character decoding. By default, it uses *UTF-8 encoding*, unless
explicitly set otherwise.

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states, 
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the 
course of three days, during the second Persian invasion of Greece. 

In the following examples, we will read from this file using
StreamReader.

## C# StreamReader ReadToEnd Method

The ReadToEnd method retrieves all characters from the current
position to the end of the stream. It returns the remaining content as a
string—if the end of the stream has already been reached, an empty
string is returned instead.

**Note:** This method is not suitable for large files.
Attempting to read an 8 GB file in its entirety would result in high memory
consumption, potentially affecting system performance.

Program.cs
  

var fileName = "thermopylae.txt";

using var sr = new StreamReader(fileName);

string content = sr.ReadToEnd();
Console.WriteLine(content);

The example reads a file into a string in one shot. 

var fileName = "thermopylae.txt";

We define the filename. 

using var sr = new StreamReader(fileName);

A new StreamReader is created. The using keyword
releases the IO resources when the sr variable goes out of scope.

string content = sr.ReadToEnd();
Console.WriteLine(content);

We read the contents of the file with ReadToEnd and print 
them to the console.

$ dotnet run
The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

## C# StreamReader ReadBlock

The ReadBlock method reads the specified maximum number of
characters from the current stream and writes the data to a buffer, beginning at
the specified index. It returns the number of characters that have been read.

Program.cs
  

var fileName = "thermopylae.txt";

using var sr = new StreamReader(fileName);

char[] buf = new char[25];

int n = sr.ReadBlock(buf, 0, buf.Length);

Console.WriteLine($"{n} characters read");
Console.WriteLine(buf);

The example reads the first twenty-five characters from the file.

char[] buf = new char[25];

We define the character buffer.

int c = sr.ReadBlock(buf, 0, buf.Length);

We read characters from the file with the ReadBlock method. We
start from the first character and specify the length of the array as the number
of characters to be read. 

Console.WriteLine($"{n} characters read");

We print the number of characters read. 

Console.WriteLine(buf); 

We print the character array content.

$ dotnet run
25 characters read
The Battle of Thermopylae

## C# StreamReader ReadLine

The ReadLine method reads a line of characters from the current
stream and returns the data as a string. It returns
null if the end of the input stream is reached.

Program.cs
  

var fileName = "thermopylae.txt";

using var sr = new StreamReader(fileName);

string? line;

while ((line = sr.ReadLine()) != null)
{
    Console.WriteLine(line);
}

The example reads the whole file line by line by using the ReadLine
method.

string? line;

while ((line = sr.ReadLine()) != null)
{
    Console.WriteLine(line);
}

We use a while loop to read all lines. 

## C# StreamReader read web page

In the following example, we read HTML data from a web page.    

Program.cs
  

using var httpClient = new HttpClient();
var url = "http://webcode.me";

var stream = await httpClient.GetStreamAsync(url);

using var sr = new StreamReader(stream);

string content = sr.ReadToEnd();
Console.WriteLine(content);

The example reads the home page of a website; it uses the HttpClient.
HttpClient sends HTTP requests and receives HTTP responses from a
resource identified by a URL.

using var httpClient = new HttpClient();
var url = "http://webcode.me";

An HttpClient and the URL are created.

using var sr = new StreamReader(stream);

The StreamReader can take streams as argument as well.

var stream = await httpClient.GetStreamAsync(url);

We asynchronously read from the URL.

string content = sr.ReadToEnd();
Console.WriteLine(content);

We read the whole page and print the HTML data to the console.

$ dotnet run
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;

    &lt;p&gt;
         Hello there. How are you?
    &lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

## Source

[StreamReader class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.streamreader?view=net-8.0)

In this article we have read text files in C# with StreamReader.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).