+++
title = "C# TAR"
date = 2025-08-29T19:51:32.257+01:00
draft = false
description = "C# TAR tutorial shows how to work with TAR archives in C# language."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# TAR

last modified July 5, 2023

 

C# TAR tutorial shows how to work with TAR archives in C# language 

## TAR archive

A tar (tape archive) file is an archive of files. It is a common file format on
Unix systems. A tar package files together for backup or distribution purposes.
TAR files are not compressed.

.NET contains tools to work with TAR files in the
System.Formats.Tar namespace.

## C# TarFile.CreateFromDirectory

The TarFile.CreateFromDirectory creates a tar file that contains
all the files from the specified directory.

$ ls data
words.txt  words2.txt

We have two text files in the data directory.

Program.cs
  

using System.Formats.Tar;

try {
    TarFile.CreateFromDirectory("data", "words.tar", false);

} catch (IOException e) {
    
    Console.WriteLine("failed to create archive");
    Console.WriteLine($"{e.Message}");
}

The program creates a new tar archive from files in the data directory.

TarFile.CreateFromDirectory("data", "words.tar", false);

The first parameter is the directory from which we take the files. The second is
the archive name. The last parameter determines if we include the base directory
name as the first path segment in all the names of the archive entries.

## C# TarFile.ExtractToDirectory

The TarFile.ExtractToDirectory extracts the contents of a tar file
into the specified directory.

Program.cs
  

using System.Formats.Tar;

try {
    TarFile.ExtractToDirectory("words.tar", "data", false);

} catch (IOException e) {
    
    Console.WriteLine("failed to extraxt archive");
    Console.WriteLine($"{e.Message}");
}

In the program, we extract the words.tar file into a directory.

## C# TarReader

The TarReader reads a tar archive from a stream.

Program.cs
  

using System.Formats.Tar;

using FileStream fs = File.OpenRead("words.tar");
using var tr = new TarReader(fs);

TarEntry? entry;
while ((entry = tr.GetNextEntry(true)) != null)
{
    Console.WriteLine($"Name: {entry.Name}, Length: {entry.Length}");
}

In the program we show the files in the provided tar.

using FileStream fs = File.OpenRead("words.tar");
using var tr = new TarReader(fs);

We open a file stream with File.OpenRead and create a new instance 
of the TarReader.

TarEntry? entry;
while ((entry = tr.GetNextEntry(true)) != null)
{
    Console.WriteLine($"Name: {entry.Name}, Length: {entry.Length}");
}

We go over the tar entries in a while loop using GetNextEntry. 
We print the file names and their size.

$ dotnet run
Name: words.txt, Length: 17
Name: words2.txt, Length: 19

In the next example, we read the contents of the archive files.

Program.cs
  

using System.Formats.Tar;
using System.Text;

using FileStream fs = File.OpenRead("words.tar");
using var tr = new TarReader(fs);

TarEntry? entry;
while ((entry = tr.GetNextEntry(true)) != null)
{
    using MemoryStream ms = new MemoryStream();

    if (entry.DataStream != null)
    {
        entry.DataStream.CopyTo(ms);

        string res = Encoding.UTF8.GetString(ms.ToArray());
        Console.WriteLine(res);
    }
}

The program opens the tar file and reads the contents of the text files.

TarEntry? entry;
while ((entry = tr.GetNextEntry(true)) != null)
{
    using MemoryStream ms = new MemoryStream();
    ...
}

We open a new memory stream.

if (entry.DataStream != null)
{
    entry.DataStream.CopyTo(ms);
    ...
}

We copy the data from the tar entry data stream into the memory stream.

string res = Encoding.UTF8.GetString(ms.ToArray());
Console.WriteLine(res);

## Source

[TarFile class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.formats.tar.tarfile?view=net-8.0)

We transform the memory stream into a string and print it to the console.

In this article we have worked with tar files in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).