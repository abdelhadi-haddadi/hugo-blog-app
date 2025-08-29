+++
title = "C# Base64"
date = 2025-08-27T23:22:44.791+01:00
draft = false
description = "C# Base64 tutorial shows how to encode and decode binary data to and from Base64."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Base64

last modified July 5, 2023

 

In this article we show how to encode and decode binary data to and from Base64.

Encoding is the process of converting data from one form to another. Decoding is
the reverse process.

*Base64* is a group of similar binary-to-text encoding schemes that
represent binary data in an text string format.

Base64 encoding schemes are commonly used when we need to store and transfer
binary data over media that are designed to deal with text. For instance,
Base64 encoding is used in email attachments.

The Convert class contains the following methods related to Base64:
ToBase64String, ToBase64CharArray,
FromBase64String, and FromBase64CharArray.

## C# Convert.ToBase64String

The Convert.ToBase64String method converts an array of 8-bit
unsigned integers to its equivalent string representation that is encoded with
base-64 digits.

Program.cs
  

using System.Text;

string msg = "one 🐘 and three 🐋";
byte[] data = Encoding.UTF8.GetBytes(msg);

string base64 = Convert.ToBase64String(data);

Console.WriteLine(msg);
Console.WriteLine(string.Join(' ', data.Select(e =&gt; e.ToString("X2"))));
Console.WriteLine(base64);

We define a string with two emoji characters.

byte[] data = Encoding.UTF8.GetBytes(msg);

First, we transform the string to an array of bytes.

string base64 = Convert.ToBase64String(data);

Then we convert the array into a base-64 string with
Convert.ToBase64String.

Console.WriteLine(msg);
Console.WriteLine(string.Join(' ', data.Select(e =&gt; e.ToString("X2"))));
Console.WriteLine(base64);

We print the string, the array in hex format, and the base-64 string.

$ dotnet run
one 🐘 and three 🐋
6F 6E 65 20 F0 9F 90 98 20 61 6E 64 20 74 68 72 65 65 20 F0 9F 90 8B
b25lIPCfkJggYW5kIHRocmVlIPCfkIs=

## C# Convert.FromBase64String

The Convert.FromBase64String converts the specified string, which
encodes binary data as base-64 digits, to an equivalent 8-bit unsigned integer
array.

Program.cs
  

using System.Text;

string base64 = "b25lIPCfkJggYW5kIHRocmVlIPCfkIs=";
byte[] data = Convert.FromBase64String(base64);

string msg = Encoding.UTF8.GetString(data);

Console.WriteLine(base64);
Console.WriteLine(string.Join(' ', data.Select(e =&gt; e.ToString("X2"))));
Console.WriteLine(msg);

We convert a base-64 encoding to a string with
Convert.FromBase64String.

$ dotnet run
b25lIPCfkJggYW5kIHRocmVlIPCfkIs=
6F 6E 65 20 F0 9F 90 98 20 61 6E 64 20 74 68 72 65 65 20 F0 9F 90 8B
one 🐘 and three 🐋

## C# Base64 extension methods

In the following example, we create extension methods for encoding and decoding 
Base64 data. 

Program.cs
  

using System.Text;

namespace Base64Ex;

class Program
{
    static void Main()
    {
        string msg = "one 🐘 and three 🐋";
        string base64 = msg.EncodeBase64();
        string msg2 = base64.DecodeBase64();

        Console.WriteLine(msg);
        Console.WriteLine(base64);
        Console.WriteLine(msg2);
    }
}

static class ExtensionMethods
{
    public static string EncodeBase64(this string value)
    {
        byte[] data = Encoding.UTF8.GetBytes(value);
        return Convert.ToBase64String(data);
    }

    public static string DecodeBase64(this string value)
    {
        byte[] data = System.Convert.FromBase64String(value);
        return Encoding.UTF8.GetString(data);
    }
}

The program creates the EncodeBase64 and DecodeBase64
extension methods.

string msg = "one 🐘 and three 🐋";
string base64 = msg.EncodeBase64();
string msg2 = base64.DecodeBase64();

The extension methods can be directly called on the string.

$ dotnet run
one 🐘 and three 🐋
b25lIPCfkJggYW5kIHRocmVlIPCfkIs=
one 🐘 and three 🐋

## Source

[Base64 class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.buffers.text.base64?view=net-8.0)

In this article we have shown how to encode and decode binary data to and from
Base64.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).