+++
title = "C# File"
date = 2025-08-29T19:50:45.277+01:00
draft = false
description = "Learn how to work with files in C# programming. This tutorial covers file creation, reading, writing, deleting, and appending operations, helping you master file handling in C# with practical examples."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# File

last modified May 12, 2025

 

This tutorial explores file handling in C# and covers essential operations such
as creating, reading, writing, deleting, and appending files.

In C#, file management is handled using the System.IO and
System.Text namespaces, providing efficient tools for working with
files.

The File class in System.IO offers static methods for
fundamental file operations, including creation, copying, deletion, moving, and
opening. It also facilitates the creation of FileStream objects for
advanced file manipulation.

For object-oriented file handling, .NET provides the FileInfo
class. While FileInfo represents an individual file instance with
detailed properties, File serves as a utility class for managing
files across applications.

## The words.txt file

This is a text file that we work with in some examples.

words.txt
  

sky
blue
cloud
raisin
tree
falcon
owl
eagle
rock
water
lake

## C# File.Create

The File.create creates or overwrites a file in the specified path.
It returns a FileStream, which  provides read/write access to the
file specified in path.

Program.cs
  

using System.Text;

var path = "words.txt";

using FileStream fs = File.Create(path);
byte[] data = Encoding.UTF8.GetBytes("falcon\nribbon\ncloud");
fs.Write(data, 0, data.Length);

Console.WriteLine("data written to file");

The example creates a file and writes three words into it. This demonstrates how
to use a FileStream to write raw bytes to a file, which is useful when you need
precise control over file content or are working with binary data.

using FileStream fs = File.Create(path);

We create a file and retrieve a file stream to the file. This stream provides
direct access to the file's bytes, allowing for efficient reading and writing
operations.

byte[] data = Encoding.UTF8.GetBytes("falcon\nribbon\ncloud");

We get the bytes of the three words we are going to write with
Encoding.UTF8.GetBytes. This step is necessary because files store
data as bytes, and converting strings to bytes ensures the correct encoding is
used.

fs.Write(data, 0, data.Length);

The bytes are written to the file with Write. This method writes
the specified byte array to the file, starting at the given offset and writing
the specified number of bytes.

## C# File.CreateText

The File.CreateText creates or opens a file for writing UTF-8
encoded text. If the file already exists, its contents are overwritten. It
returns a StreamWriter that writes to the specified file using
UTF-8 encoding.

Program.cs
  

var path = "words.txt";

using StreamWriter sw = File.CreateText(path);

sw.WriteLine("falcon");
sw.WriteLine("sky");
sw.WriteLine("cloud");

Console.WriteLine("data written to file");

The example creates a new file with File.CreateText. It writes
three words with WriteLine. This approach is convenient for writing
text data, as the StreamWriter handles character encoding and line endings
automatically.

## C# File.Copy

The File.copy copies an existing file to a new file. It takes the
source file and the destination file as parameters.

Program.cs
  

var sourcePath = "words.txt";
var destPath = "words_bck.txt";

File.Copy(sourcePath, destPath);

Console.WriteLine("file copied");

The example copies a text file. This operation is useful for creating backups or
duplicating files for further processing without altering the original.

## C# File.Move

The File.Move moves a specified file to a new location. With this
method, we can move a file to a new location or to rename a file.

Program.cs
  

var sourcePath = "words.txt";
var destPath = "data.txt";

File.Move(sourcePath, destPath);

Console.WriteLine("file moved");

The example renames words.txt to data.txt. This
demonstrates how to move a file to a new location or change its name within the
same directory.

## C# File.Exists

The File.Exists determines whether the specified file exists.

Program.cs
  

var path = "words2.txt";

if (File.Exists(path))
{
    Console.WriteLine("the file exists");
} else {

    Console.WriteLine("the file does not exist");
}

In the code example we check if the words2.txt file exists. This is
a common operation to prevent errors when attempting to access or modify files
that may not be present.

## C# File.Delete

The File.Delete deletes the specified file.

Program.cs
  

var path = "words.txt";

File.Delete(path);

Console.WriteLine("file deleted");

The example deletes a text file. Deleting files is essential for managing disk
space and removing outdated or unnecessary data from your application.

## C# File.GetCreationTime

The File.GetCreationTime returns the creation date and time of the
specified file or directory.

Program.cs
  

var path = "words.txt";

DateTime dt = File.GetCreationTime(path);

Console.WriteLine($"Creation time: {dt}");

The example prints the creation time of the words.txt file. Knowing when a file was created can be useful for logging, auditing, or managing file lifecycles.

$ dotnet run
Creation time: 16. 1. 2024 11:31:35

## C# File.GetLastWriteTime

The File.GetLastWriteTime returns the date and time of the
specified file or directory was last written to.

Program.cs
  

var path = "words.txt";

DateTime dt = File.GetLastWriteTime(path);

Console.WriteLine($"Last write time: {dt}");

The example prints the last write time of the text file. This information helps
track when a file was last modified, which is important for synchronization and
backup tasks.

## C# File.Open

The File.Open opens a FileStream on the specified path.
The overloaded methods of File.Open allow to specify the file mode
(Open, Create, CreateNew, Truncate, Append, or OpenOrCreate), the file access
(Read, Write, ReadWrite).

The file share value specifies the type of access other threads have to the
file, such as Delete, None, Read, ReadWrite, Write, or Inheritable.

Program.cs
  

using System.Text;

var path = "words.txt";

using FileStream fs = File.Open(path, FileMode.Open, FileAccess.Read);

byte[] buf = new byte[1024];
int c;

while ((c = fs.Read(buf, 0, buf.Length)) &gt; 0)
{
    Console.WriteLine(Encoding.UTF8.GetString(buf, 0, c));
}

The example reads the contents of the words.txt file. This
demonstrates how to use a FileStream to read raw bytes from a file and convert
them into a string using a specific encoding.

using FileStream fs = File.Open(path, FileMode.Open, FileAccess.Read);

We open the file for reading. This ensures that the file is accessed in a way
that prevents accidental modification while allowing data to be read
efficiently.

byte[] buf = new byte[1024];
int c;

We create a buffer of bytes and an auxiliary variable. The buffer temporarily
holds the data read from the file, and the variable tracks how many bytes were
actually read.

while ((c = fs.Read(buf, 0, buf.Length)) &gt; 0)
{
    Console.WriteLine(Encoding.UTF8.GetString(buf, 0, c));
}

The Read method reads a block of bytes from the stream and writes
the data to the given buffer. The Encoding.UTF8.GetString decodes a
sequence of bytes into a string. This approach is efficient for reading large
files in chunks.

$ dotnet run
sky
blue
cloud
raisin
tree
falcon
owl
eagle
rock
water
lake

## C# File.OpenRead

The File.OpenRead opens an existing file for reading. It returns a
read-only FileStream on the specified path. It is a convenience
method to the File.Open.

Program.cs
  

using System.Text;

var path = "words.txt";

using FileStream fs = File.OpenRead(path);

byte[] buf = new byte[1024];
int c;

while ((c = fs.Read(buf, 0, buf.Length)) &gt; 0)
{
    Console.WriteLine(Encoding.UTF8.GetString(buf, 0, c));
}

The example reads a file with File.OpenRead. This method simplifies
opening a file for reading by returning a read-only FileStream, making it easy
to process file data.

## C# File.OpenText

The File.OpenText opens an existing UTF-8 encoded text file for
reading. It returns a StreamReader on the specified path.

Program.cs
  

var path = "words.txt";

using StreamReader sr = File.OpenText(path);

string s = String.Empty;

while ((s = sr.ReadLine()) != null)
{
    Console.WriteLine(s);
}

The example opens a text file and reads its contents. Using a
StreamReader allows you to read text data line by line, which is
ideal for processing structured text files such as logs or CSVs.

while ((s = sr.ReadLine()) != null)
{
    Console.WriteLine(s);
}

We read the text file line by line. We do not have to decode the bytes into the
string ourselves. The StreamReader handles the conversion from bytes to strings,
making text processing straightforward.

## C# File.OpenWrite

The File.OpenWrite opens an existing file or creates a new file for
writing. It returns a FileStream object on the specified path with
write access.

Program.cs
  

var path = "langs.txt";

using FileStream fs = File.OpenWrite(path);
using StreamWriter sr = new StreamWriter(fs);

sr.WriteLine("PHP\nDart\nJava\nC#\n");

Console.WriteLine("data written");

The example opens a file in write mode and writes a line to the file. This
demonstrates how to use a FileStream and StreamWriter
together to write text data efficiently.

using FileStream fs = File.OpenWrite(path);
using StreamWriter sr = new StreamWriter(fs);

We open a filestream to the specified path. The stream is passed to the
StreamWriter, which is used to write characters in a particular
encoding (UTF8 by default). This setup is useful for writing large amounts of text data to a file.

sr.WriteLine("PHP\nDart\nJava\nC#\n");

A line of text is written to the file with WriteLine. The
StreamWriter automatically adds a newline character, making it easy to write
multiple lines of text.

## C# File.ReadLines

The File.ReadLines method reads lines from a text file lazily,
returning an IEnumerable&lt;string&gt;. Unlike
File.ReadAllLines, it does not load all lines into memory at once,
making it more efficient for large files.

Program.cs
  

var path = "words.txt";

var lines = File.ReadLines(path);

foreach (var line in lines)
{
    Console.WriteLine(line);
}

This example reads lines from a file one at a time using File.ReadLines, reducing memory usage compared to File.ReadAllLines. The returned enumerable is traversed with a foreach loop, processing each line as needed. This is especially useful for processing large files without loading them entirely into memory.

## C# File.ReadAllLines

The File.ReadAllLines method reads all lines of a text file into a
string[] array in a single operation. Since the entire file is
loaded into memory at once, this approach is better suited for small to
moderately-sized files.

Program.cs
  

var path = "words.txt";

string[] lines = File.ReadAllLines(path);

foreach (var line in lines)
{
    Console.WriteLine(line);
}

This example reads all lines from a file at once, storing them in a string[] array. The entire array is then iterated through using a foreach loop. This approach is suitable for small to moderately-sized files where memory usage is not a concern.

If working with large files, consider using File.ReadLines to minimize memory consumption. This method reads lines lazily, making it more efficient for processing big files.

## C# File.ReadAllText

The File.ReadAllText opens a text file, reads all the text in the
file into a string, and then closes the file. Note that this method should not
be used for very large files.

Program.cs
  

var path = "words.txt";

string readText = File.ReadAllText(path);
Console.WriteLine(readText);

The example reads the whole text into a string in one go. This is convenient for quickly loading the entire contents of a file, but should be avoided for very large files to prevent excessive memory usage.

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

The example reads a favicon.ico binary file. The data is printed to
the console in hex format. This demonstrates how to process binary files and
display their contents in a human-readable way.

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

## C# File.WriteAllText

The File.WriteAllText creates a new file, writes the contents to
the file, and then closes the file. If the target file already exists, it is
overwritten.

Program.cs
  

var path = "words.txt";

string data = "sky\ncloud\nfalcon\nowl\ncrane";
File.WriteAllText(path, data);

Console.WriteLine("data written");

In the example, we write four words to a file with
File.WriteAllText. This method is useful for quickly saving text
data to a file, overwriting any existing content.

## C# File.WriteAllLines

The File.WriteAllLines creates a new file, writes one or more
strings to the file, and then closes the file.

Program.cs
  

using System.Text;

var path = "words.txt";

string[] data = { "sky", "cloud", "falcon", "hawk" };
File.WriteAllLines(path, data, Encoding.UTF8);

Console.WriteLine("data written");

In the example, we have an array of strings. We write these strings to a file in
one go with File.WriteAllLines. This is an efficient way to save
multiple lines of text to a file at once.

## C# File.WriteAllBytes

The File.WriteAllBytes creates a new file, writes the specified
byte array to the file, and then closes the file.

Program.cs
  

using System.Text;

var path = "words.txt";

var text = "falcon\nhawk\nforest\ncloud\nsky";
byte[] data = Encoding.UTF8.GetBytes(text);

File.WriteAllBytes(path, data);

Console.WriteLine("data written");

The example writes data to a file with File.WriteAllBytes. This
method is ideal for saving binary data, such as images or serialized objects,
directly to a file.

var text = "falcon\nhawk\nforest\ncloud\nsky";
byte[] data = Encoding.UTF8.GetBytes(text);

First, we transform the text data into a array of bytes with
Encoding.UTF8.GetBytes. This conversion ensures that the text is
properly encoded for storage as binary data.

File.WriteAllBytes(path, data);

Then we write the array to the file with File.WriteAllBytes. This
operation saves the entire byte array to the file in one step.

## C# File.AppendText

The File.AppendText creates a StreamWriter that
appends UTF-8 encoded text to an existing file, or to a new file if the
specified file does not exist.

Program.cs
  

var path = "words.txt";

using StreamWriter sw = File.AppendText(path);

sw.WriteLine("sky");
sw.WriteLine("lake");

The example appends two words to the words.txt file. Appending data
is useful for adding new information to an existing file without overwriting its
contents.

## C# File.AppendAllText

The File.AppendAllText appends the specified string to the file.
It creates the file if it does not exist.

Program.cs
  

var path = "words.txt";
var contents = "armour\nsword\narrow\n";

File.AppendAllText(path, contents);

Console.WriteLine("text appended to file");

The example appends three words to the specified text file. This method is
convenient for adding text to a file, automatically creating the file if it does
not exist.

## C# File.AppendAllLines

The File.AppendAllLines appends lines to a file, and then closes
the file.

Program.cs
  

var path = "words.txt";
List&lt;string&gt; data = ["brown", "blue", "khaki"];

File.AppendAllLines(path, data);

Console.WriteLine("data written to file");

The example appends a list of strings to the file with
File.AppendAllLines. This is helpful for adding multiple lines of
text to a file in a single operation.

## C# File.Replace

The File.Replace method replaces the contents of a specified file
with the contents of another file, optionally creating a backup of the replaced
file.

Program.cs
  

var sourceFile = "words.txt";
var destFile = "words2.txt";
var backupFile = "words_backup.txt";

File.Replace(sourceFile, destFile, backupFile);

Console.WriteLine("file replaced");

The example replaces the contents of words2.txt with
words.txt and creates a backup. This operation is useful for
updating files while preserving the previous version for recovery if needed.

## C# File.SetAttributes and File.GetAttributes

The File.SetAttributes and File.GetAttributes methods
allow you to set and retrieve file attributes such as read-only or hidden.

Program.cs
  

var path = "words.txt";

File.SetAttributes(path, FileAttributes.ReadOnly);
var attrs = File.GetAttributes(path);

Console.WriteLine($"File attributes: {attrs}");

The example sets the file as read-only and then retrieves and prints its
attributes. This demonstrates how you can programmatically change file
properties and verify the changes, which is especially useful for automating
file management tasks or enforcing certain file access policies in your C#
programs.

In this article we have worked with files in C#. We have utilized the
File class of the System.IO. The provided examples
cover a wide range of file operations, giving you practical knowledge to handle
files efficiently and securely in your own C# projects.

## Source

[C# File class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.file?view=net-8.0)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).