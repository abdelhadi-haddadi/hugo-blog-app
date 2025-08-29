+++
title = "C# input & output"
date = 2025-08-29T19:50:53.165+01:00
draft = false
description = "Input & output in C# tutorial shows how to do input & output operations in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# input &amp; output

last modified July 5, 2023

 

In this article we cover input &amp; output in operations in C#. The input &amp;
output in C# is based on streams.

## C# stream

A *stream* is an abstraction of a sequence of bytes, such as a file, an
input/output device, an inter-process communication pipe, or a TCP/IP socket.
Streams transfer data from one point to another point. Streams are also capable
of manipulating the data; for example they can compress or encrypt the data. In
the .NET, the System.IO namespaces contain types that enable
reading and writing on data streams and files.

C# provides higher-level methods for I/O operations in the File 
class and lower-level methods in classes such as StreamReader 
or StreamWriter.

## Handling exceptions

I/O operations are error-prone. We can run into exceptions such as 
FileNotFoundException or UnauthorizedAccessException. 
Unlike Java, C# does not force the programmer to manually handle the exceptions.
It is the programmer's decision whether to manually handle an exception. 
If the exception is not manually handled in the try/catch/finally
contruct, the exception is handled by CLR.

## Releasing resources

I/O resources must be released. The reources can be released manually in the 
finally clause with the Dispose method. The using
keyword can be used for automatic release of the resources. Also, the 
methods in the File class release the resources for us.

## Example text file

In the examples, we use this simple text file:

thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

## C# File.ReadAllText

File provides static methods for the creation, copying, deletion,
moving, and opening of a single file, and aids in the creation of FileStream
objects.

**Note:** The File.ReadAllText is not suited for 
reading very large files.

The File.ReadAllText opens a file, reads all text in the file
with the specified encoding, and then closes the file.

Program.cs
  

using System.Text;

var path = "/home/janbodnar/Documents/thermopylae.txt";

var text = File.ReadAllText(path, Encoding.UTF8);
Console.WriteLine(text);

The program reads the contents of the thermopylae.txt file 
and prints them to the console.

var text = File.ReadAllText(path, Encoding.UTF8);

We read the whole file into a string in one shot. In the second argument, we
specify the encoding.

$ dotnet run
The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

## C# File.ReadAllLines

File.ReadAllLines opens a text file, reads all lines of the file
into a string array, and then closes the file.    

File.ReadAllLines is a convenient method for reading files in C#. 
It should not be used when dealing with very large files.

Program.cs
  

var path = "/home/janbodnar/Documents/thermopylae.txt";

string[] lines = File.ReadAllLines(path);

foreach (string line in lines)
{
    Console.WriteLine(line);
}

The example reads all lines from a file into a string array. We go through the
array in a foreach loop and print each line to the console.

## C# create file

The File.CreateText creates or opens a file for writing 
UTF-8 encoded text. If the file already exists, its contents are overwritten.

Program.cs
  

var path = "/home/janbodnar/Documents/cars.txt";

using var sw = File.CreateText(path);

sw.WriteLine("Hummer");
sw.WriteLine("Skoda");
sw.WriteLine("BMW");
sw.WriteLine("Volkswagen");
sw.WriteLine("Volvo");

In the example, we create a cars.txt file and write some car names
into it.

using var sw = File.CreateText(path);

The CreateText method creates or opens a file for writing UTF-8
encoded text. It returns a StreamWriter object.

sw.WriteLine("Hummer");
sw.WriteLine("Skoda");
...

We write two lines to the stream.

## C# create, last write, last access time

With the File class, we can get the creation, last write and last
access times of a file. The Exists method determines whether the
specified file exists.

Program.cs
  

var path = "cars.txt";

if (File.Exists(path))
{
    Console.WriteLine(File.GetCreationTime(path));
    Console.WriteLine(File.GetLastWriteTime(path));
    Console.WriteLine(File.GetLastAccessTime(path));
}

If a specified file exists, we determine its creation, last write, and last
access times.

if (File.Exists(path))

The Exists method returns true if the caller has the
required permissions and path contains the name of an existing file; otherwise,
false. This method also returns false if path is
null, an invalid path, or a zero-length string.

Console.WriteLine(File.GetCreationTime(path));
Console.WriteLine(File.GetLastWriteTime(path));
Console.WriteLine(File.GetLastAccessTime(path));

We get creation time, last write time and last access time of the specified
file.

$ dotnet run
2/25/2021 11:41:19 AM
2/25/2021 11:41:19 AM
2/25/2021 11:41:27 AM

## C# copy file

The File.Copy method copies an existing file to a new file. It
allows to overwrite a file of the same name.

Program.cs
  

var srcPath = "/home/janbodnar/Documents/cars.txt";
var destPath = "/home/janbodnar/Documents/cars2.txt";

File.Copy(srcPath, destPath, true);

Console.WriteLine("File copied");

 Then we copy the contents of the file to another file.

var srcPath = "/home/janbodnar/Documents/cars.txt";
var destPath = "/home/janbodnar/Documents/cars2.txt";

```
File.Copy(srcPath, destPath, true);

```

The Copy method copies the file. The third parameter specifies 
if the file should be overwritten, if it exists.

## C# IDisposable interface

Streams implement the IDisposable interface. Objects that implement
this interface must be disposed manually at the earliest opportunity. This is
done by calling the Dispose method in the finally block or by
utilizing the using statement.

Program.cs
  

StreamReader? sr = null;

var path = "thermopylae.txt";

try
{
    sr = new StreamReader(path);
    Console.WriteLine(sr.ReadToEnd());
}
catch (IOException e)
{
    Console.WriteLine("Cannot read file");
    Console.WriteLine(e.Message);
}
catch (UnauthorizedAccessException e)
{
    Console.WriteLine("Cannot access file");
    Console.WriteLine(e.Message);
}
finally
{
    sr?.Dispose();
}

In this example, we read characters from a file on a disk. We manually release
allocated resources.

sr = new StreamReader(path);
Console.WriteLine(sr.ReadToEnd());

The StreamReader class is used to read characters. Its parent
implements the IDisposable interface.

} catch (IOException e)
{
    Console.WriteLine("Cannot read file");
    Console.WriteLine(e.Message);

} catch (UnauthorizedAccessException e)
{
    Console.WriteLine("Cannot access file");
    Console.WriteLine(e.Message);
}

Possible exceptions are handled in the catch blocks.

finally
{
    sr?.Dispose();
}

In the finally block, the Dispose method cleans up the resources.
With the null-conditinal operator we call the method only if the variable is not
null.

## C# using statement

The using statement defines a scope at the end of which an
object will be disposed. It provides a convenient syntax that ensures the
correct use of IDisposable objects.

Program.cs
  

var path = "/home/janbodnar/Documents/thermopylae.txt";

using (var sr = new StreamReader(path))
{
    Console.WriteLine(sr.ReadToEnd());
}

The example reads the contents of the thermopylae.txt file.
The resources are released with the using statement. If we do not
handle the IO exceptions, they will be handled by CLR.

## C# using declaration

The using declaration is a variable declaration preceded by the 
using keyword. It tells the compiler that the variable being
declared should be disposed at the end of the enclosing scope. The using
declaration is available since C# 8.0.

Program.cs
  

var path = "thermopylae.txt";

using var sr = new StreamReader(path);

Console.WriteLine(sr.ReadToEnd());

The example reads the contents of the thermopylae.txt file.
The resources are automatically cleaned when the sr variable 
goes out of scope (at the end of the Main method.).

## C# MemoryStream

MemoryStream is a stream which works with data in a computer
memory.

Program.cs
  

using var ms = new MemoryStream(6);

ms.WriteByte(9);
ms.WriteByte(11);
ms.WriteByte(6);
ms.WriteByte(8);
ms.WriteByte(3);
ms.WriteByte(7);

ms.Position = 0;

int rs = ms.ReadByte();

do
{
    Console.WriteLine(rs);
    rs = ms.ReadByte();

} while (rs != -1);

We write six numbers to a memory with a MemoryStream. Then we read
those numbers and print them to the console.

using var ms = new MemoryStream(6);

The line creates and initializes a MemoryStream object with a
capacity of six bytes.

ms.WriteByte(9);
ms.WriteByte(11);
ms.WriteByte(6);
...

The WriteByte method writes a byte to the current stream at the
current position.

ms.Position = 0;

We set the position of the cursor in the stream to the beginning using the
Position property.

do
{
    Console.WriteLine(rs);
    rs = ms.ReadByte();

} while (rs != -1);

Here we read all bytes from the stream and print them to the console.

$ dotnet run
9
11
6
8
3
7

## C# StreamReader

StreamReader reads characters from a byte stream. It defaults to
UTF-8 encoding.

Program.cs
  

var path = "/home/janbodnar/Documents/thermopylae.txt";

using var sr = new StreamReader(path);

while (sr.Peek() &gt;= 0)
{
    Console.WriteLine(sr.ReadLine());
}

We read the contents of a file. This time we read the file line by line using
the ReadLine method.

while (sr.Peek() &gt;= 0)
{
    Console.WriteLine(sr.ReadLine());
}

The Peek method returns the next available character but does not
consume it. It indicates whether we can call the ReadLine method
again. It returns -1 if there are no characters to be read.

## C# count lines

In the next example, we be counting lines.

Program.cs
  

int count = 0;
var path = "/home/janbodnar/Documents/thermopylae.txt";

using var sr = new StreamReader(path);

while (sr.ReadLine() != null)
{
    count++;
}

Console.WriteLine($"There are {count} lines");

We use a StreamReader and a while loop.

while(stream.ReadLine() != null)
{
    count++;
}

In the while loop, we read a line from the stream with the ReadLine 
method. It returns a line from the stream or null if the end of the
input stream is reached.

$ dotnet run
There are 3 lines

## C# StreamWriter

StreamWriter writes characters to a stream in a particular
encoding.

Program.cs
  

var path = "/home/janbodnar/Documents/newfile.txt";
using var sw = new StreamWriter(path);

sw.WriteLine("Today is a beautiful day.");

The example writes a string to a file with StreamWriter.

using var sw = new StreamWriter(path);

We create a new StreamWriter. The default enconding is UTF-8. The
StreamWriter takes a path as a parameter. If the file exists, it is
overwritten; otherwise, a new file is created.

## C# FileStream

FileStream provides a stream for a file, supporting both
synchronous and asynchronous read and write operations.

StreamReader and StreamWriter work with text data,
while FileStream works with bytes.

Program.cs
  

using System.Text;

var path = "/home/janbodnar/Documents/newfile2.txt";

using var fs = new FileStream(path, FileMode.Append);

var text = "Фёдор Михайлович Достоевский\n";
byte[] bytes = new UTF8Encoding().GetBytes(text);

fs.Write(bytes, 0, bytes.Length);

We write some text in Russian Cyrillic to a file.

using System.Text;

The UTF8Encoding class is located in the System.Text
namespace.

using var fs = new FileStream(path, FileMode.Append);

A FileStream object is created. The second parameter is a mode in
which the file is opened. The append mode opens the file if it exists and seeks
to the end of the file, or creates a new file.

var text = "Фёдор Михайлович Достоевский";

This is text in Russian Cyrillic.

byte[] bytes = new UTF8Encoding().GetBytes(text);

An array of bytes is created from the text in Russian Cyrillic.

fs.Write(bytes, 0, bytes.Length);

We write the bytes to the file stream.

$ cat /home/janbodnar/Documents/newfile2.txt
Фёдор Михайлович Достоевский

We show the contents of the created file.

## C# XmlTextReader

We can use streams to read XML data. The XmlTextReader is the class
to read XML files in C#. The class is forward-only and read-only.

We have the following XML test file:

languages.xml
  

&lt;?xml version="1.0" encoding="utf-8" ?&gt;
&lt;languages&gt;
    &lt;language&gt;Python&lt;/language&gt;
    &lt;language&gt;Ruby&lt;/language&gt;
    &lt;language&gt;Javascript&lt;/language&gt;
    &lt;language&gt;C#&lt;/language&gt;
&lt;/languages&gt;

This file contains language names between custom XML tags.

Program.cs
  

using System.Xml;

string path = "/home/janbodnar/Documents/languages.xml";
using var xreader = new XmlTextReader(path);

xreader.MoveToContent();

while (xreader.Read())
{
    var node = xreader.NodeType switch
    {
        XmlNodeType.Element =&gt; String.Format("{0}: ", xreader.Name),
        XmlNodeType.Text =&gt; String.Format("{0} \n", xreader.Value),
        _ =&gt; ""
    };

    Console.Write(node);
}

This example reads data from the XML file and prints it to the terminal.

using System.Xml;

The System.Xml namespace contains
classes related to Xml reading and writing.

using var xreader = new XmlTextReader(path);

An XmlTextReader object is created. It is a reader that provides
fast, non-cached, forward-only access to XML data. It takes the file name as a
parameter.

xreader.MoveToContent();

The MoveToContent method moves to the
actual content of the XML file.

while (xreader.Read())

This line reads the next node from the stream. The
Read method returns false if there are no more nodes
left.

var node = xreader.NodeType switch
{
    XmlNodeType.Element =&gt; String.Format("{0}: ", xreader.Name),
    XmlNodeType.Text =&gt; String.Format("{0} \n", xreader.Value),
    _ =&gt; ""
};

Console.Write(node);

Here we print the element name and the element text.

$ dotnet run
language: Python
language: Ruby
language: Javascript
language: C#

## C# create, move directory

The System.IO.Directory is a class that has static methods for
creating, moving, and enumerating through directories and subdirectories.

Program.cs
  

Directory.CreateDirectory("temp");
Directory.CreateDirectory("newdir");
Directory.Move("temp", "temporary");

We create two directories and rename one of the created ones. The directories
are created in the project folder.

Directory.CreateDirectory("temp");

The CreateDirectory method creates a new directory.

Directory.Move("temp", "temporary");

The Move method gives a specified directory a new name.

## C# DirectoryInfo

DirectoryInfo exposes instance methods for creating, moving,
and enumerating through directories and subdirectories. 

Program.cs
  

var path = "/home/janbodnar/Documents";
var dirInfo = new DirectoryInfo(path);

string[] files = Directory.GetFiles(path);
DirectoryInfo[] dirs = dirInfo.GetDirectories();

foreach (DirectoryInfo subDir in dirs)
{
    Console.WriteLine(subDir.Name);
}

foreach (string fileName in files)
{
    Console.WriteLine(fileName);
}

We use the DirectoryInfo class to traverse a specific directory and
print its contents.

var path = "/home/janbodnar/Documents";
var DirInfo = new DirectoryInfo(path);

We show the contents of the specified directory.

string[] files = Directory.GetFiles(path);

We get all files of the directory using the static
GetFiles method.

DirectoryInfo[] dirs = dir.GetDirectories();

We get all the directories.

foreach (DirectoryInfo subDir in dirs)
{
    Console.WriteLine(subDir.Name);
}

Here we loop through directories and print their names to the console.

foreach (string fileName in files)
{
    Console.WriteLine(fileName);
}

Here we loop through the array of files and print their names to the console.

## Source

[File and Stream I/O](https://learn.microsoft.com/en-us/dotnet/standard/io/)

In this article we have covered Input/Output operations in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).