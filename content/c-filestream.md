+++
title = "C# FileStream"
date = 2025-08-27T23:23:03.172+01:00
draft = false
description = "Learn how to read and write files in C# using
FileStream with this comprehensive tutorial. Explore practical examples for
efficient file handling."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# FileStream

last modified April 22, 2025

 

This C# FileStream tutorial demonstrates how to read and write files using the
FileStream class in C#.

## C# FileStream

The FileStream class offers a Stream interface for file
operations, enabling both synchronous and asynchronous reading and writing. A
stream represents a sequence of data flowing from a source to a destination,
which may include disks, memory, sockets, or other programs.

When utilizing FileStream, operations are performed at the byte
level. For more convenient handling of text data, developers can employ
StreamWriter and StreamReader classes.

## C# FileStream write text

The following example illustrates how to write text data to a file using the
FileStream class.

Program.cs
  

using System.Text;

var fileName = @"C:\Users\Jano\Documents\words.txt";

using FileStream fs = File.OpenWrite(fileName);

var data = "falcon\nhawk\nforest\ncloud\nsky";
byte[] bytes = Encoding.UTF8.GetBytes(data);

fs.Write(bytes, 0, bytes.Length);

This example writes several words into a text file, demonstrating basic file
output operations.

using FileStream fs = File.OpenWrite(fileName);

The File.OpenWrite method initializes a FileStream
instance configured for writing operations.

var data = "falcon\nhawk\nforest\ncloud\nsky";
byte[] bytes = Encoding.UTF8.GetBytes(data);

Text data is converted into a byte array using the
Encoding.UTF8.GetBytes method for file writing.

fs.Write(bytes, 0, bytes.Length);

The Write method writes the byte array to the
FileStream, storing the data in the file.

## C# FileStream write text with StreamWriter

This example demonstrates using FileStream alongside
StreamWriter for efficient text writing.

Program.cs
  

var fileName = @"C:\Users\Jano\Documents\words.txt";

using FileStream fs = File.Create(fileName);
using var sr = new StreamWriter(fs);

sr.WriteLine("coin\nfalcon\nhawk\nforest");

Console.WriteLine("done");

This example writes text to a file using StreamWriter, which
simplifies writing character data in a specified encoding.

using FileStream fs = File.Create(fileName);
using var sr = new StreamWriter(fs);

A StreamWriter instance is created, accepting the
FileStream as its underlying stream.

sr.WriteLine("coin\nfalcon\nhawk\nforest");

The WriteLine method writes a line of text to the
FileStream, appending a newline character.

## C# FileStream read text

The following example shows how to read text data from a file using
FileStream.

Program.cs
  

using System.Text;

var fileName = @"C:\Users\Jano\Documents\words.txt";

using FileStream fs = File.OpenRead(fileName);

byte[] buf = new byte[1024];
int c;

while ((c = fs.Read(buf, 0, buf.Length)) &gt; 0)
{
    Console.WriteLine(Encoding.UTF8.GetString(buf, 0, c));
}

This example reads a text file, converts its byte data to strings using UTF8
encoding, and outputs the content to the console.

using FileStream fs = File.OpenRead(fileName);

The File.OpenRead method opens a FileStream for
reading, preparing the file for input operations.

byte[] buf = new byte[1024];

A byte array, buf, is allocated to store data read from the file
during input operations.

while ((c = fs.Read(buf, 0, buf.Length)) &gt; 0)
{
    Console.WriteLine(Encoding.UTF8.GetString(buf, 0, c));
}

The Read method retrieves a block of bytes from the
FileStream into the buffer. The
Encoding.UTF8.GetString method converts these bytes into a string
for display.

## C# FileStream read text with StreamReader

This example demonstrates reading text from a file using FileStream
combined with StreamReader.

Program.cs
  

var fileName = @"C:\Users\Jano\Documents\words.txt";

using FileStream fs = File.OpenRead(fileName);
using var sr = new StreamReader(fs);

string line;

while ((line = sr.ReadLine()) != null)
{
    Console.WriteLine(line);
}

This example reads a text file using StreamReader, which eliminates
the need for manual byte-to-character conversion.

using FileStream fs = File.OpenRead(fileName);
using var sr = new StreamReader(fs);

The StreamReader is initialized with the FileStream,
using UTF8 encoding by default if none is specified.

string line;

while ((line = sr.ReadLine()) != null)
{
    Console.WriteLine(line);
}

The ReadLine method of StreamReader retrieves each
line of text, returning null when the stream ends.

## C# FileStream CopyTo

The CopyTo method transfers bytes from one stream to another,
simplifying file copying operations.

Program.cs
  

var fileName = "words.txt";
using var fs = new FileStream(fileName, FileMode.Open);

var fileName2 = "words_copy.txt";
using var fs2 = new FileStream(fileName2, FileMode.OpenOrCreate);

fs.CopyTo(fs2);

Console.WriteLine("File copied");

This example copies a text file using the CopyTo method,
demonstrating a straightforward file duplication process.

## C# FileStream download image

The following example illustrates downloading a small image file using
FileStream.

Program.cs
  

using var httpClient = new HttpClient();
var url = "http://webcode.me/favicon.ico";
byte[] imageBytes = await httpClient.GetByteArrayAsync(url);

using var fs = new FileStream("favicon.ico", FileMode.Create);
fs.Write(imageBytes, 0, imageBytes.Length);

Console.WriteLine("Image downloaded");

This example uses HttpClient to fetch a small image as a byte array,
which is then written to a file using FileStream.

using var fs = new FileStream("favicon.ico", FileMode.Create);
fs.Write(imageBytes, 0, imageBytes.Length);

A new file is created for writing, and the image's byte array is written to it
using the Write method.

## C# FileStream read image

This example demonstrates reading an image file and displaying its contents as
hexadecimal data.

Program.cs
  

var fileName = @"C:\Users\Jano\Documents\favicon.ico";

using var fs = new FileStream(fileName, FileMode.Open);

int c;
int i = 0;

while ((c = fs.ReadByte()) != -1)
{

    Console.Write("{0:X2} ", c);
    i++;

    if (i % 10 == 0)
    {
        Console.WriteLine();
    }
}

This example reads a small image file and outputs its bytes in hexadecimal
format, suitable for small files.

while ((c = fs.ReadByte()) != -1)
{

The ReadByte method reads one byte from the file, advancing the
position, and returns -1 when the stream ends.

Console.Write("{0:X2} ", c);

The format specifier {0:X2} displays each byte in two-digit
hexadecimal notation.

if (i % 10 == 0)
{
    Console.WriteLine();
}

A newline is inserted after every ten bytes to organize the hexadecimal output
into rows.

## C# FileStream streaming

Streaming involves transmitting data continuously, allowing the recipient to
process it before the entire file is received.

Program.cs
  

using var httpClient = new HttpClient();

var url = "https://cdn.netbsd.org/pub/NetBSD/NetBSD-9.2/images/NetBSD-9.2-amd64-install.img.gz";

var fname = Path.GetFileName(url);

var resp = await httpClient.GetAsync(url,
    HttpCompletionOption.ResponseHeadersRead);
resp.EnsureSuccessStatusCode();

using Stream ms = await resp.Content.ReadAsStreamAsync();

using FileStream fs = File.Create(fname);
await ms.CopyToAsync(fs);

Console.WriteLine("file downloaded");

This example downloads a NetBSD USB image using streaming, enabling efficient
handling of large files.

using var httpClient = new HttpClient();

The HttpClient class facilitates HTTP requests for downloading
content from the web.

var resp = await httpClient.GetAsync(url,
    HttpCompletionOption.ResponseHeadersRead);

Using HttpCompletionOption.ResponseHeadersRead, the operation
completes after headers are read, deferring content retrieval.

using Stream ms = await resp.Content.ReadAsStreamAsync();

The ReadAsStreamAsync method returns a stream representing the HTTP
content as an asynchronous operation.

using FileStream fs = File.Create(fname);

The File.Create method creates or overwrites a file, preparing it
for streaming data.

await ms.CopyToAsync(fs);

The CopyToAsync method continuously transfers the stream's data to
the file stream.

## Source

[FileStream class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.filestream?view=net-8.0)

This article explored using FileStream for reading and writing
files in C#.

## Author

I am Jan Bodnar, a dedicated programmer with extensive experience in software
development. Since 2007, I have authored over 1,400 programming articles and
eight e-books. With more than a decade of teaching programming, I share my
expertise through comprehensive tutorials.

List [all C# tutorials](/csharp/).