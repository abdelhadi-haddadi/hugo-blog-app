+++
title = "C# byte"
date = 2025-08-29T19:50:30.723+01:00
draft = false
description = "C# byte tutorial shows how to work with the byte type in C#. The byte type is an simple, numeric, value type in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# byte

last modified July 5, 2023

 

In this article we show how to work with the byte type in C#.

The byte type is an simple, numeric, value type in C#.
The byte type is mainly used in IO operations, when working with
files and network connections.

There are two basic byte types:

keyword  range         size                     .NET type
sbyte    -128 to 127   Signed 8-bit integer     System.SByte
byte     0 to 255      Unsigned 8-bit integer   System.Byte

The listing shows the keywords, range, size and .NET type for the two byte
types.

## C# byte and sbyte

In the first example, we present the basic attributes of the byte types.

Program.cs
  

byte val1 = 5;
sbyte val2 = -4;

Console.WriteLine(val1);
Console.WriteLine(val2);

Console.WriteLine(val1.GetType());
Console.WriteLine(val2.GetType());

Console.WriteLine("------------------------");

Console.WriteLine(byte.MinValue);
Console.WriteLine(byte.MaxValue);

Console.WriteLine(sbyte.MinValue);
Console.WriteLine(sbyte.MaxValue);

Console.WriteLine("------------------------");

Console.WriteLine(typeof(byte));
Console.WriteLine(typeof(sbyte));
Console.WriteLine(default(byte));
Console.WriteLine(default(sbyte));

The program program defines byte and sbyte types and
prints their attributes.

Console.WriteLine(val1.GetType());
Console.WriteLine(val2.GetType());

We can determine the type of a variable with GetType.

Console.WriteLine(byte.MinValue);
Console.WriteLine(byte.MaxValue);

The minimum and maximum values are determined with MinValue and
MaxValue attributes.

Console.WriteLine(typeof(byte));
Console.WriteLine(typeof(sbyte));

The underlying .NET type is determined with typeof keyword.

Console.WriteLine(default(byte));
Console.WriteLine(default(sbyte));

The default value of a type is returned with default keyword.

$ dotnet run
5
-4
System.Byte
System.SByte
------------------------
0
255
-128
127
------------------------
System.Byte
System.SByte
System.Byte
0
0

## C# convert string to bytes

We convert strings to bytes and vice versa with Encoding.

Program.cs
  

using System.Text;

string word = "čerešňa";

byte[] data = Encoding.UTF8.GetBytes(word);
Console.WriteLine(string.Join(" ", data));

string word2 = Encoding.UTF8.GetString(data);
Console.WriteLine(word2);

We have a word which contains three accented letters.

byte[] data = Encoding.UTF8.GetBytes(word);

To turn the string into bytes, we use the Encoding.UTF8.GetBytes.

string word2 = Encoding.UTF8.GetString(data);

To get the string from the array of bytes, we use the
Encoding.UTF8.GetString method.

$ dotnet run
196 141 101 114 101 197 161 197 136 97
čerešňa

The word has seven letters. In the array we have ten bytes. This means that
the three accented letters are represented by two bytes each.

## C# write bytes to file

In the next example, we write some data to a text file.

public override void Write(byte[] buffer, int offset, int count);

The FileStream.Write method writes a block of bytes to the file
stream. The method takes three parameters: the byte array, the zero-based byte
offset in array from which to begin copying bytes to the stream, and the
maximum number of bytes to write.

Program.cs
  

using System.Text;

var path = "words.txt";

using FileStream fs = File.Create(path);
byte[] data = Encoding.UTF8.GetBytes("falcon\nribbon\ncloud\nwater");
fs.Write(data, 0, data.Length);

Console.WriteLine("data written to file");

The example writes four words to a file.

using FileStream fs = File.Create(path);

We create a new file with File.Create. The method returns a
FileStream.

byte[] data = Encoding.UTF8.GetBytes("falcon\nribbon\ncloud\nwater");

We get the bytes of the text with Encoding.UTF8.GetBytes

fs.Write(data, 0, data.Length);

We write the whole array of bytes to the filestream with Write.

## Get HTML page

The HttpClient.GetByteArrayAsync sends a GET request to the
specified Uri and return the response body as a byte array in an asynchronous
operation.

Program.cs
  

string url = "http://webcode.me";
HttpClient client = new HttpClient();

byte[] data = await client.GetByteArrayAsync(url);

string fname = "index.html";
File.WriteAllBytes(fname, data);

We retrieve an HTML page into an array of bytes with
GetByteArrayAsync. Then we write the array of bytes into a file
with File.WriteAllBytes.

## C# File.ReadAllBytes

The File.ReadAllBytes opens a binary file, reads the contents of
the file into a byte array, and then closes the file.

Program.cs
  

var path = "favicon.ico";
byte[] data = File.ReadAllBytes(path);

int i = 0;

foreach (byte c in data)
{
    Console.Write("{0:X2} ", c);
    i++;

    if (i % 10 == 0)
    {
        Console.WriteLine();
    }
}

The example reads a favicon.ico binary file. The data is printed to the console
in hexadecimal format. 

$ dotnet run
00 00 01 00 01 00 10 10 00 00 
00 00 00 00 68 05 00 00 16 00 
00 00 28 00 00 00 10 00 00 00 
20 00 00 00 01 00 08 00 00 00 
00 00 00 01 00 00 00 00 00 00 
00 00 00 00 00 01 00 00 00 00 
00 00 00 00 00 00 FF FF FF 00 
4D 45 3D 00 00 00 00 00 00 00 
...

## HttpServer example

An HTTP server writes its data to the output stream of the response object.

Program.cs
  

using System.Net;
using System.Text;

using var listener = new HttpListener();
listener.Prefixes.Add("http://localhost:8001/");

listener.Start();

Console.WriteLine("Listening on port 8001...");

while (true)
{
    HttpListenerContext context = listener.GetContext();

    using HttpListenerResponse resp = context.Response;
    resp.Headers.Set("Content-Type", "text/plain");

    string data = "Hello there!";
    byte[] buffer = Encoding.UTF8.GetBytes(data);
    resp.ContentLength64 = buffer.Length;

    using Stream ros = resp.OutputStream;
    ros.Write(buffer, 0, buffer.Length);
}

C# has the HttpListener to create simple HTTP servers. Our server
sends a text message.

using HttpListenerResponse resp = context.Response;
resp.Headers.Set("Content-Type", "text/plain");

In the response headers, we set the Content-Type to
text/plain to hint the client what kind of data to expect.

string data = "Hello there!";
byte[] buffer = Encoding.UTF8.GetBytes(data);

We transform the message into bytes.

resp.ContentLength64 = buffer.Length;

We set the content length.

using Stream ros = resp.OutputStream;
ros.Write(buffer, 0, buffer.Length);

Finally, we write the bytes to the output stream with Write.

$ curl localhost:8001
Hello there!

## Source

[Byte struct - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.byte?view=net-8.0)

In this article we have worked with byte type in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).