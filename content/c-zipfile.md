+++
title = "C# ZipFile"
date = 2025-08-29T19:51:39.008+01:00
draft = false
description = "C# struct tutorial shows how to work with struct types in C#. A structure is a value type defined with the struct keyword."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# ZipFile

last modified July 5, 2023

 

In this article we use ZipFile to create, read, and extract ZIP files in C#.

## ZIP

ZIP is an archive file format that supports lossless data compression. A ZIP
file may contain one or more files or directories that may have been compressed.

ZipFile provides static methods for creating, extracting, and
opening zip archives. It is part of the System.IO.Compression
package.

## C# ZipFile.CreateFromDirectory

The ZipFile.CreateFromDirectory creates a zip archive that contains
files and directories from the specified directory.

Program.cs
  

using System.IO.Compression;

string dirName = "data";
string zipName = "archive.zip";

if (File.Exists(zipName))
{
    File.Delete(zipName);
}

ZipFile.CreateFromDirectory(dirName, zipName);

In the example, we create a new ZIP file from a directory.

string dirName = "data";
string zipName = "archive.zip";

We define the name of the directory and the ZIP archive.

if (File.Exists(zipName))
{
    File.Delete(zipName);
}

We check if the archive already exists with File.Exists. If it 
exists, we delete it with File.Delete.

ZipFile.CreateFromDirectory(dirName, zipName);

The parameters of ZipFile.CreateFromDirectory are the directory 
name and the name of the ZIP file.

## C# ZipFile include specified files

In the next example, we choose which files we include in the archive.

Program.cs
  

using System.IO.Compression;

string zipName = "archive.zip";

if (File.Exists(zipName))
{
    File.Delete(zipName);
}

var files = Directory.GetFiles(@"data", "*.jpg");

using var archive = ZipFile.Open(zipName, ZipArchiveMode.Create);

foreach (var file in files)
{
    archive.CreateEntryFromFile(file, Path.GetFileName(file));
}

The program takes all JPG images from the specified directory and creates 
an archive from them. 

var files = Directory.GetFiles(@"data", "*.jpg");

With Directory.GetFiles, we find all files that match the given 
pattern.

using var archive = ZipFile.Open(zipName, ZipArchiveMode.Create);

We open the ZIP archive in the ZipArchiveMode.Create with 
ZipFile.Open.

foreach (var file in files)
{
    archive.CreateEntryFromFile(file, Path.GetFileName(file));
}

We add files to the archive with CreateEntryFromFile.

## C# ZipFile.ExtractToDirectory

The ZipFile.ExtractToDirectory extracts all the files in the
specified zip archive to the given directory.

Program.cs
  

using System.IO.Compression;

string dirName = "data2";
string zipName = "archive.zip";

if (Directory.Exists(dirName))
{
    Directory.Delete(dirName, true);
}

ZipFile.ExtractToDirectory(zipName, dirName);

In the example, we extract the contents of a ZIP file to a directory. 

if (Directory.Exists(dirName))
{
    Directory.Delete(dirName, true);
}

First, we check if the directory already exists with
Directory.Exists and delete it if it does with
Directory.Delete.

ZipFile.ExtractToDirectory(zipName, dirName);

We extract the archive to the directory with
ZipFile.ExtractToDirectory.

The ZipFile.ExtractToDirectory has an overload which takes 
the overwriteFiles parameter. It overwrite files destination files 
if set to true.

Program.cs
  

using System.IO.Compression;

string dirName = "data2";
string zipName = "archive.zip";

ZipFile.ExtractToDirectory(zipName, dirName, true);

In this example, instead of checking and deleting a directory, we use the 
overwriteFiles parameter.

## C# ZipFile read contents

In the next example, we read the contents of a ZIP file.

Program.cs
  

using System.IO.Compression;

string zipFile = "data.zip";

using var archive = ZipFile.OpenRead(zipFile);

foreach (var entry in archive.Entries)
{
    Console.WriteLine(entry.Name);
}

With ZipFile.Open, we open a zip archive for reading.

foreach (var entry in archive.Entries)
{
    Console.WriteLine(entry.Name);
}

Via the Entries attribute, we retrieve all of the files in a ZIP
archive.

## Source

[ZipFile class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.compression.zipfile?view=net-8.0)

In this article we have worked with ZIP files in C#. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).