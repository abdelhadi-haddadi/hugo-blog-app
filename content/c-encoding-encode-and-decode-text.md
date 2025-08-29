+++
title = "C# Encoding - Encode and Decode Text"
date = 2025-08-27T23:22:58.541+01:00
draft = false
description = "Learn C# encoding techniques in this
comprehensive tutorial. Understand how to encode and decode text using Base64,
UTF-8, ASCII, and Unicode in C# for efficient data processing."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Encoding - Encode and Decode Text

last modified May 11, 2025

 

This article provides a comprehensive guide on encoding and decoding data in C#.
Understanding how text is processed and stored is essential for handling
different character sets and ensuring seamless data exchange across
applications.

Unicode is a universal computing industry standard designed to provide
consistent encoding, representation, and handling of text in most of the world's
writing systems. It ensures that characters from different languages and symbols
are properly represented across platforms, making globalized applications more
reliable.

In C#, a string is a collection of Unicode characters. It is a data type that
stores sequences of characters, typically as bytes, where each element
represents a character according to a specific character encoding. Internally,
C# uses UTF-16 encoding, ensuring that characters are stored in a standardized
manner while supporting a vast range of symbols and languages.

*Encoding* is the process of converting a set of Unicode characters into
a sequence of bytes, allowing data to be stored or transmitted efficiently.
*Decoding* reverses this process, transforming encoded bytes back into
readable Unicode characters. These processes play a critical role in handling
text input, file operations, network communications, and data serialization.

.NET provides several standard character encodings to accommodate different use
cases. These include ASCII, UTF-7 (now deprecated), UTF-8, UTF-16, and UTF-32.
Among them, UTF-8 is widely used due to its efficient handling of various
characters while minimizing storage requirements. UTF-16 remains the default
encoding within the C# environment.

The System.Text.Encoding class in .NET offers robust functionality
for encoding and decoding text. It enables developers to convert between
different character sets, ensuring data integrity when interacting with diverse
systems. The default encoding used internally in .NET is UTF-16, which can be
accessed via Encoding.Unicode.

## C# Encoding GetByteCount

The GetByteCount method returns the number of bytes produced by
encoding the specified characters.

Program.cs
  

using System.Text;

string text = "one 🐘 and three 🐋";

int n = Encoding.UTF8.GetByteCount(text);
Console.WriteLine($"UTF-8: {n}");

n = Encoding.UTF32.GetByteCount(text);
Console.WriteLine($"UTF-32: {n}");

n = Encoding.Unicode.GetByteCount(text);
Console.WriteLine($"UTF-16: {n}");

n = Encoding.BigEndianUnicode.GetByteCount(text);
Console.WriteLine($"UTF-16BE: {n}");

n = Encoding.Latin1.GetByteCount(text);
Console.WriteLine($"Latin1: {n}");

n = Encoding.ASCII.GetByteCount(text);
Console.WriteLine($"ASCII: {n}");

The example prints the number of bytes produced when the given string is encoded
with each specified encoding. This output helps you understand how different
encodings represent the same string in memory. Some encodings, like UTF-8, use
variable-length bytes for characters, while others, such as UTF-32, use a fixed
length. The difference in byte counts shows how much space each encoding
requires for the same text, which is important when optimizing for storage or
compatibility.

$ dotnet run
UTF-8: 23
UTF-32: 68
UTF-16: 38
UTF-16BE: 38
Latin1: 19
ASCII: 19

## C# Encoding GetBytes

The GetBytes method returns a byte array containing the results of
encoding the specified set of characters.

Program.cs
  

using System.Text;

string text = "one 🐘 and three 🐋";

Console.WriteLine("UTF-8 bytes");
byte[] uft8Data = Encoding.UTF8.GetBytes(text);
showBytes(uft8Data);

Console.WriteLine("UTF-16 bytes");
byte[] uft16Data = Encoding.Unicode.GetBytes(text);
showBytes(uft16Data);

Console.WriteLine("UTF-16BE bytes");
byte[] uft16BEData = Encoding.BigEndianUnicode.GetBytes(text);
showBytes(uft16BEData);

Console.WriteLine("Latin1 bytes");
byte[] latin1Data = Encoding.Latin1.GetBytes(text);
showBytes(latin1Data);

void showBytes(byte[] data)
{
    int i = 0;

    foreach (var e in data)
    {
        Console.Write($"{e.ToString("X4")} ");
        i++;

        if (i % 10 == 0)
        {
            Console.WriteLine();
        }
    }

    Console.WriteLine();
}

The example encodes the given string into bytes using UTF-8, UTF-16, UTF-16BE,
and Latin1 encodings. By examining the byte arrays, you can see how each
encoding handles Unicode characters, especially those outside the basic ASCII
range. For example, UTF-8 and UTF-16 can represent emojis and special symbols,
while Latin1 replaces unsupported characters with placeholders. This
demonstrates why choosing the right encoding is crucial for preserving data
integrity.

$ dotnet run
UTF-8 bytes
006F 006E 0065 0020 00F0 009F 0090 0098 0020 0061
006E 0064 0020 0074 0068 0072 0065 0065 0020 00F0
009F 0090 008B
UTF-16 bytes
006F 0000 006E 0000 0065 0000 0020 0000 003D 00D8
0018 00DC 0020 0000 0061 0000 006E 0000 0064 0000
0020 0000 0074 0000 0068 0000 0072 0000 0065 0000
0065 0000 0020 0000 003D 00D8 000B 00DC
UTF-16BE bytes
0000 006F 0000 006E 0000 0065 0000 0020 00D8 003D
00DC 0018 0000 0020 0000 0061 0000 006E 0000 0064
0000 0020 0000 0074 0000 0068 0000 0072 0000 0065
0000 0065 0000 0020 00D8 003D 00DC 000B
Latin1 bytes
006F 006E 0065 0020 003F 003F 0020 0061 006E 0064
0020 0074 0068 0072 0065 0065 0020 003F 003F

## C# Encoding GetString

The GetString method builds a string by decoding a given sequence
of bytes.

Program.cs
  

using System.Text;

string text = "one 🐘 and three 🐋";

Console.WriteLine("UTF-8 bytes");
byte[] uft8Data = Encoding.UTF8.GetBytes(text);
string output = Encoding.UTF8.GetString(uft8Data);
Console.WriteLine(output);

Console.WriteLine("UTF-16 bytes");
byte[] uft16Data = Encoding.Unicode.GetBytes(text);
output = Encoding.Unicode.GetString(uft16Data);
Console.WriteLine(output);

Console.WriteLine("UTF-16BE bytes");
byte[] uft16BEData = Encoding.BigEndianUnicode.GetBytes(text);
output = Encoding.BigEndianUnicode.GetString(uft16BEData);
Console.WriteLine(output);

Console.WriteLine("Latin1 bytes");
byte[] latin1Data = Encoding.Latin1.GetBytes(text);
output = Encoding.Latin1.GetString(latin1Data);
Console.WriteLine(output);

In this example, we first encode the string into a byte array using
GetBytes. Then, we decode the bytes back into strings with
GetString. Four different encodings are demonstrated.

This process shows how encoding and decoding work together. If the same encoding
is used for both operations, the original string is preserved. However, if the
encoding cannot represent certain characters (as with Latin1 and emojis), those
characters are lost or replaced. This highlights the importance of matching
encodings when transferring or storing text data.

$ dotnet run
UTF-8 bytes
one 🐘 and three 🐋
UTF-16 bytes
one 🐘 and three 🐋
UTF-16BE bytes
one 🐘 and three 🐋
Latin1 bytes
one ?? and three ??

The Latin1 encoding cannot represent emoticons, so they appear as question marks.

## C# Base64 Encoding and Decoding

Base64 encoding is commonly used to encode binary data as text, making it safe
for transmission over protocols that only support text. In C#, you can use the
Convert.ToBase64String and Convert.FromBase64String
methods to encode and decode data.

Program.cs
  

using System.Text;

string text = "Encode this string to Base64!";

// Encode to Base64
byte[] bytes = Encoding.UTF8.GetBytes(text);
string base64 = Convert.ToBase64String(bytes);
Console.WriteLine($"Base64: {base64}");

// Decode from Base64
byte[] decodedBytes = Convert.FromBase64String(base64);
string decodedText = Encoding.UTF8.GetString(decodedBytes);
Console.WriteLine($"Decoded: {decodedText}");

This example shows how to encode a string to Base64 and then decode it back to
the original string. Base64 is useful for encoding data that needs to be stored
or transferred as plain text, such as in XML or JSON files, or when embedding
binary data in text-based formats.

## C# Encoding.Convert

The Encoding.Convert method converts a byte array from one
encoding to another.

Program.cs
  

using System.Text;

string text = "one 🐘 and three 🐋";

byte[] utf16Data = Encoding.Unicode.GetBytes(text);
byte[] utf8Data = Encoding.Convert(Encoding.Unicode, Encoding.UTF8, utf16Data);

Console.WriteLine("UTF-16 bytes");
showBytes(utf16Data);

Console.WriteLine();

Console.WriteLine("UTF-8 bytes");
showBytes(utf8Data);

Console.WriteLine();
string output = Encoding.UTF8.GetString(utf8Data);
Console.WriteLine(output);

void showBytes(byte[] data)
{
    int i = 0;

    foreach (var e in data)
    {
        Console.Write($"{e.ToString("X4")} ");
        i++;

        if (i % 10 == 0)
        {
            Console.WriteLine();
        }
    }

    Console.WriteLine();
}

In this example, we convert UTF-16 bytes to UTF-8 bytes. The
Encoding.Convert method is useful when you need to change the
encoding of data, such as when reading from a file in one encoding and saving it
in another. This ensures compatibility between systems that expect different
encodings, and helps prevent data corruption or loss during conversion.

$ dotnet run
UTF-16 bytes
006F 0000 006E 0000 0065 0000 0020 0000 003D 00D8 
0018 00DC 0020 0000 0061 0000 006E 0000 0064 0000 
0020 0000 0074 0000 0068 0000 0072 0000 0065 0000 
0065 0000 0020 0000 003D 00D8 000B 00DC 

UTF-8 bytes
006F 006E 0065 0020 00F0 009F 0090 0098 0020 0061 
006E 0064 0020 0074 0068 0072 0065 0065 0020 00F0 
009F 0090 008B 

one 🐘 and three 🐋

## C# read/write data with Encoding

Next, we write data to a file and read it back using a specified encoding.

Program.cs
  

using System.Text;

string text = "one 🐘 and three 🐋";

using var fs = new FileStream("data.txt", FileMode.OpenOrCreate);
using var sw = new StreamWriter(fs, Encoding.UTF8);
sw.Write(text);

In this example, we write text to a file using Encoding.UTF8.

Specifying the encoding when writing to a file ensures that the text is stored
correctly and can be read by other applications expecting the same encoding.
UTF-8 is a common choice for its compatibility and efficiency, especially when
working with international text or sharing files across platforms.

using var sw = new StreamWriter(fs, Encoding.UTF8);

The second parameter of StreamWriter specifies the character
encoding to use.

$ dotnet run
$ file data.txt 
data.txt: Unicode text, UTF-8 (with BOM) text, with no line terminators
$ cat data.txt 
one 🐘 and three 🐋

Next, we read the data from the file.

Program.cs
  

using System.Text;

using var fs = new FileStream("data.txt", FileMode.Open);
using var sr = new StreamReader(fs, Encoding.UTF8);

string? text = sr.ReadLine();
Console.WriteLine(text);

We use StreamReader to read the data, specifying the encoding as
the second parameter. By providing the correct encoding to
StreamReader, you ensure that the bytes in the file are interpreted
properly as characters. This is essential for reading files created with
different encodings, and helps avoid issues with misinterpreted or corrupted
text.

$ dotnet run
one 🐘 and three 🐋

## Source

[Encoding class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.text.encoding?view=net-8.0)

In this article, we explored encoding and decoding data in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).