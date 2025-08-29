+++
title = "C# FileInfo"
date = 2025-08-27T23:23:03.162+01:00
draft = false
description = "C# FileInfo tutorial shows how to work with files with FileInfo in C#. FileInfo provides properties and instance methods for the creation, copying, deletion, moving, and opening of files."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# FileInfo

last modified May 18, 2025

 

In this article, we explore how FileInfo facilitates file
management in C#.

## Understanding FileInfo

The FileInfo class provides a range of properties and instance
methods for handling files, including creation, copying, deletion, moving, and
opening operations. It also supports the initialization of
FileStream objects, allowing efficient file access and
manipulation.

.NET also includes the File class, which serves a similar purpose
but differs in functionality. While FileInfo represents a specific
file instance and enables detailed file operations, File is a
static utility class that provides convenient methods for working with files
without requiring an object instance.

Using FileInfo is beneficial when you need to retrieve file
metadata, perform multiple operations on a file, or optimize performance by
reducing redundant security checks. On the other hand, File is
ideal for simple file operations that do not require persistent file objects.

words.txt
  

sky
borrow
war
ocean
cup
cloud
water
read
book
look

In several examples, we use this text file.

## C# FileInfo simple example

We have a simple example with FileInfo.

Program.cs
  

var fi = new FileInfo("words.txt");

Console.WriteLine(fi.Name);
Console.WriteLine(fi.FullName);

bool ro = fi.IsReadOnly;

if (ro)
{
    Console.WriteLine("readonly file");
}
else
{
    Console.WriteLine("not a readonly file");
}

We create a FileInfo object, passing a text file to its
constructor. Then we print its three properties.

Console.WriteLine(fi.Name);
Console.WriteLine(fi.FullName);

We print its name and fullname. 

bool ro = fi.IsReadOnly;

if (ro)
{
    Console.WriteLine("readonly file");
}
else
{
    Console.WriteLine("not a readonly file");
}

We determine whether the file is readonly.

$ dotnet run
words.txt
/home/jano/Documents/prog/csharp/fileinfo/First/words.txt
not a readonly file

## C# FileInfo create text file

The CreateText method creates a StreamWriter that
writes a new text file.

Program.cs
  

var fi = new FileInfo("colours.txt");

using StreamWriter sw = fi.CreateText();

sw.WriteLine("red");
sw.WriteLine("yellow");
sw.WriteLine("white");
sw.WriteLine("brown");

We create a new text file colours.txt. We write four lines into the 
file. 

using StreamWriter sw = fi.CreateText();

The StreamWriter class implements the IDisposable
interface; therefore, we use the using statement to close the 
resources when we are done.

## C# FileInfo read file

The OpenText creates a StreamReader with UTF8 encoding
that reads from an existing text file.

Program.cs
  

var fi = new FileInfo("words.txt");

using StreamReader sr = fi.OpenText();
string? s = string.Empty;

while ((s = sr.ReadLine()) != null)
{
    Console.WriteLine(s);
}

In the example, we read a file line by line.

$ dotnet run
sky
borrow
war
ocean
cup
cloud
water
read
book
look

## C# FileInfo delete file

The Delete method deletes a file.

Program.cs
  

var fi = new FileInfo("/etc/hostname");

try
{
    fi.Delete();

} catch (UnauthorizedAccessException e)
{
    Console.WriteLine("failed to delete file");
    Console.WriteLine(e.Message);
}

In the example, we try to delete a system file. Since we do not have enough 
permissions, an exception is thrown.

$ dotnet run
failed to delete file
Access to the path '/etc/hostname' is denied.

## C# FileInfo copy file

The CopyTo copies an existing file to a new file, disallowing the
overwriting of an existing file.

Program.cs
  

var fi = new FileInfo("words.txt");
fi.CopyTo("words2.txt");

The example creates a copy of the words.txt file.

## C# FileInfo Directory

The Directory gets an instance of the parent directory.

Program.cs
  

var fi = new FileInfo("/etc/hostname");
var di = fi.Directory;

Console.WriteLine(di?.FullName);
Console.WriteLine(di?.LastAccessTime);
Console.WriteLine(di?.Root);

The example prints the file's parent directory fullname, last access time and 
root directory.

$ dotnet run
/etc
6/30/2022 11:46:07 AM
/

## C# FileInfo rename file

You can rename a file by using the MoveTo method of
FileInfo. This method moves the file to a new path, which can
include a new name.

Program.cs
  

var fi = new FileInfo("words.txt");
if (fi.Exists)
{
    fi.MoveTo("words_renamed.txt");
    Console.WriteLine("File renamed to words_renamed.txt");
}
else
{
    Console.WriteLine("File does not exist.");
}

This example checks if words.txt exists and renames it to
words_renamed.txt.

$ dotnet run
File renamed to words_renamed.txt

## C# FileInfo check if file exists

Before performing file operations, it is good practice to check if the file
exists using the Exists property.

Program.cs
  

var fi = new FileInfo("words.txt");

if (fi.Exists)
{
    Console.WriteLine("File exists.");
}
else
{
    Console.WriteLine("File does not exist.");
}

This example prints a message depending on whether words.txt exists.

$ dotnet run
File exists.

## C# FileInfo append text to file

The AppendText method opens an existing file for appending text. If
the file does not exist, it creates a new one.

Program.cs
  

var fi = new FileInfo("words.txt");

using (StreamWriter sw = fi.AppendText())
{
    sw.WriteLine("newword");
}

Console.WriteLine("Text appended to file.");

This example appends the word newword to words.txt.

$ dotnet run
Text appended to file.

## Source

[FileInfo class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.fileinfo?view=net-8.0)

In this article we have used FileInfo to work with files.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).