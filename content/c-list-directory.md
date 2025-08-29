+++
title = "C# list directory"
date = 2025-08-27T23:23:20.197+01:00
draft = false
description = "C# list directory tutorial show how to list 
directory contents in C#. We list files and directories and filter output based
on file name pattern, file extension, file size, or content."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# list directory

last modified July 5, 2023

 

C# list directory tutorial show how to list directory contents in C#. We list
files and directories and filter output based on file name pattern, file
extension, file size, or content.

## Directory definition

A directory, also called a folder, is a location for storing files on your
computer. In addition to files, a directory also stores other directories
or shortcuts.

In C# we can use Directory or DirectoryInfo to work
with directories. Directory is a static class that provides static
methods for working with directories. An instance of a DirectoryInfo
provides information about a specific directory.

The classes are available in the System.IO namespace.

Generally, the methods return an enumerable collection (e.g. 
Directory.EnumerateFiles) or an array of values 
(e.g. Directory.GetFiles). When we use a method that returns an 
array, we must wait for the whole array to be returned while with the enumerable
collection, we can process data right away. Working with enumerable collections
is more efficient and takes less memory. 

## C# DirectoryInfo.EnumerateDirectories

The DirectoryInfo.EnumerateDirectories returns an enumerable
collection of directory information for the specified directory.

Program.cs
  

var myDir = "/home/janbodnar/Downloads/";
var dirInfo = new DirectoryInfo(myDir);

var dirs = dirInfo.EnumerateDirectories("*", new EnumerationOptions 
    { RecurseSubdirectories = true });

foreach (var name in dirs)
{
    Console.WriteLine(name);
}

In the example, we recursively find all directories in the chosen directory.

## C# Directory.EnumerateFiles multiple extensions

The Directory.EnumerateFiles returns an enumerable collection
of full file names that meet the specified criteria. In the following
example, we search for files having multiple extensions.

Program.cs
  

var path = "/home/janbodnar/Documents";

var result = Directory.EnumerateFiles(path, "*.txt", 
    SearchOption.AllDirectories).Union(Directory.EnumerateFiles(path, "*.csv", 
    SearchOption.AllDirectories));

foreach (var file in result)
{
    Console.WriteLine(file);
}

The example lists all text and CSV files. We use LINQ and the Union
operation.

The following example is an alternative solution with the LINQ's Where
method.

Program.cs
  

string path = "/home/janbodnar/";
string[] extensions = { ".csv", ".txt", ".pdf" };

var files = Directory.EnumerateFiles(path, "*.*", SearchOption.AllDirectories)
    .Where(s =&gt; extensions.Any(ext =&gt; ext == Path.GetExtension(s)));

foreach (string file in files)
{
    Console.WriteLine(file);
}

Console.WriteLine("{0} files found.", files.Count&lt;string&gt;().ToString());

The example recursively searches for CSV, TXT, and PDF files.

## C# Directory.EnumerateFiles file name pattern

In the following example, we list files based on a file name pattern.

Program.cs
  

var path = "/home/janbodnar/";

var files = from file in Directory.EnumerateFiles(path, "*.txt", 
                SearchOption.AllDirectories)
            where Path.GetFileName(file).ToLower().Contains("data")
            select file;

foreach (var file in files)
{
    Console.WriteLine("{0}", file);
}

Console.WriteLine("{0} files found.", files.Count&lt;string&gt;().ToString());

The example searches recursively for text files, whose file name (the last part
of the path) contains the word data.

## C# Directory.EnumerateFiles file size

The following example searches for large files recursively.

Program.cs
  

long limit = 1024 * 1024 * 1024;
var path = "/home/janbodnar/Downloads/";

var dirInfo = new DirectoryInfo(path);

foreach (var fInfo in dirInfo.EnumerateFiles("*", 
    SearchOption.AllDirectories))
{
    if (fInfo.Length &gt; limit) 
    {
        Console.WriteLine(fInfo.Name);
    }
}

The example prints all files from the Downloads directory which are larger than
1GB. The size of the file is determined with FileInfo's
Length property.

## C# Directory.EnumerateFiles order by file size

The following example lists large files and sorts them in descending order.

Program.cs
  

var path = "/home/janbodnar/Downloads/";
var size = 1024 * 1024 * 1024;
var directory = new DirectoryInfo(path);

var files = from fInfo in directory.EnumerateFiles("*",
                SearchOption.AllDirectories)
            where fInfo.Length &gt; size
            orderby fInfo.Length descending
            select new
            {
                FullName = fInfo.FullName,
                Size = fInfo.Length
            };

foreach (var file in files)
{
    Console.WriteLine($"{file.FullName} - {file.Size} bytes");
}
 

The example searches for large files recursively (&gt; 1GB) and sorts them in
descending order.

## C# Directory.EnumerateFiles file datetime

The following example list all files based on their creation datetime. 

Program.cs
  

var path = "/home/janbodnar/Documents";

var directory = new DirectoryInfo(path);
var dateLimit = new DateTime(2010, 01, 01);

var files = from file in directory.EnumerateFiles("*",
                SearchOption.AllDirectories)
            where file.CreationTimeUtc &lt; dateLimit
            select new
            {
                FullName = file.FullName,
            };

foreach (var file in files)
{
    Console.WriteLine($"{file.FullName}");
}

In the example, we list all files that were created before 2010.

## C# Directory.EnumerateFiles search content

In the following example, we list files that contain some text.

Program.cs
  

var files = from file in Directory.EnumerateFiles("balzac", "*.txt", 
                    SearchOption.AllDirectories)
            from line in File.ReadLines(file)
            where line.Contains("Rastignac")
            select new
            {
                File = file,
                Line = line
            };

foreach (var file in files) 
{
    Console.WriteLine(file);
}

In the example, we recursively search the balzac directory for 
text files and look for the Rastignac character. We print a line from each book
he is mentioned in. 

$ dotnet run
{ File = balzac/father_goriot.txt, Line = Misfortune had accustomed Eugene de Rastignac, for that was his name, to }
{ File = balzac/father_goriot.txt, Line = Eugene de Rastignac was a thoroughly southern type; he had a fair }
{ File = balzac/father_goriot.txt, Line = beginning of Eugene de Rastignac's second twelvemonth, this figure }
{ File = balzac/father_goriot.txt, Line = Eugene de Rastignac had just returned to Paris in a state of mind not }
{ File = balzac/father_goriot.txt, Line = Rastignac's first year of study for the preliminary examinations in law }
...

## C# Directory.GetDirectories

The Directory.GetDirectories returns the names of subdirectories.
The subdirectories may meet optional specified criteria.

Program.cs
  

var path = "/home/janbodnar/Documents";

string[] myDirs = Directory.GetDirectories(path);
Console.WriteLine("Directories:");

foreach (var myDir in myDirs)
{
    Console.WriteLine(myDir);
}

The example lists top-level subdirectories of the specified directory.

string[] myDirs = Directory.GetDirectories(path);

**Note:** The Directory.GetDirectories method returns
a string array. For a complex task, this can eat up a lot of memory.

## C# Directory.GetDirectories recursive

Passing SearchOption.AllDirectories option to the 
Directory.GetDirectories method, we can recursively search for
directories.

Program.cs
  

var docPath = "/home/janbodnar/Documents";

string[] myDirs = Directory.GetDirectories(docPath, "t*",
        SearchOption.AllDirectories);

Console.WriteLine("Directories:");

foreach (var myDir in myDirs)
{
    Console.WriteLine(myDir);
}

The example lists all directories that start with the t character.

string[] myDirs = Directory.GetDirectories(docPath, "t*",
    SearchOption.AllDirectories);

The first parameter of the Directory.GetDirectories is the
directory to be listed. The second parameter is the search string to match
against the names of subdirectories to be listed. The third parameter specifies
whether the search operation should include all subdirectories or only the
current directory.

## C# Directory.GetFiles

The Directory.GetFiles returns the names of files that meet the
(optional) criteria.

Program.cs
  

string[] files = Directory.GetFiles("/home/janbodnar/Documents", "*.txt");

foreach (string name in files)
{
    Console.WriteLine(name);
}

The example lists all files in the Documents directory; the
subdirectories are not searched.

## C# Directory.GetFiles recursive

With the SearchOption.AllDirectories option, we can search for 
files recursively.

Program.cs
  

string[] files = Directory.GetFiles("/home/janbodnar/Documents", "*.csv", 
    SearchOption.AllDirectories);

foreach (string name in files)
{
    Console.WriteLine(name);
}

The example lists all files in the user's Documents directory
recursively.

## C# directory size

In the following example, we determine the size of a directory. 

Program.cs
  

long size = 0;
var path = "/home/janbodnar/Documents/prog/c#/";

var dirInfo = new DirectoryInfo(path);

foreach (FileInfo fi in dirInfo.GetFiles("*", SearchOption.AllDirectories))
{
    size += fi.Length;
}

Console.WriteLine($"The directory size: {size} bytes");

To get the size of a directory, we use the DirectoryInfo's
GetFiles method. It returns an array of type FileInfo.
The FileInfo's Length property retrieves the size of a
file.

foreach (FileInfo fi in dirInfo.GetFiles("*", SearchOption.AllDirectories))
{
    size += fi.Length;
}

We search for all files in the specified directory and its subdirectories.
We get the size of each of the retrieved files and add them.

In this article we have showed how to list directories in C#.

## Source

[Directory class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.directory?view=net-8.0)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).