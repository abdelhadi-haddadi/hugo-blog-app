+++
title = "Visual Basic input & output"
date = 2025-08-29T20:03:20.539+01:00
draft = false
description = "This part of the Visual Basic tutorial covers input & output in Visual Basic."
image = ""
imageBig = ""
categories = ["lang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../collections/)

# Visual Basic input &amp; output

last modified October 18, 2023

This chapter is dedicated to input &amp; output in Visual Basic. The input &amp;
output in Visual Basic is based on streams.

Streams are objects to work with input &amp; output. A stream is an abstraction
of a sequence of bytes, such as a file, an input/output device, an inter-process
communication pipe, or a TCP/IP socket. In Visual Basic, we have a
Stream class that is an abstract class for all streams. There are
additional classes that derive from the Stream class and make the programming a
lot easier.

## MemoryStream

A MemoryStream is a stream which works with data in a computer
memory.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

   Sub Main()

      Dim ms As Stream = New MemoryStream(6)

      ms.WriteByte(9)
      ms.WriteByte(11)
      ms.WriteByte(6)
      ms.WriteByte(8)
      ms.WriteByte(3)
      ms.WriteByte(7)

      ms.Position = 0

      Dim rs As Integer
      rs = ms.ReadByte()

      Do While rs &lt;&gt; -1
        Console.WriteLine(rs)
        rs = ms.ReadByte()
      Loop

      ms.Close()

   End Sub

End Module

We write six numbers to a memory with a MemoryStream.
Then we read those numbers and print them to the console.

Dim ms As Stream = New MemoryStream(6)

The line creates and initializes a MemoryStream
object with a capacity of six bytes.

ms.Position = 0

We set the position of the cursor in the stream to
the beginning using the Position property.

ms.WriteByte(9)
ms.WriteByte(11)
ms.WriteByte(6)
...

The WriteByte method writes a byte to the current
stream at the current position.

Do While rs &lt;&gt; -1
  Console.WriteLine(rs)
  rs = ms.ReadByte()
Loop

Here we read all bytes from the stream and print them to the console.

ms.Close()

Finally, we close the stream.

$ dotnet run
9
11
6
8
3
7

## StreamReader &amp; StreamWriter

StreamReader reads characters from a byte stream. It defaults to
UTF-8 encoding. StreamWriter writes characters to a stream in a
particular encoding.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

   Sub Main()

       Dim file As String
       file = "languages"

       Try
           Dim stream As StreamReader
           stream = New StreamReader(file)
           Console.WriteLine(stream.ReadToEnd())
       Catch e As IOException
           Console.WriteLine("Cannot read file.")
       End Try

   End Sub

End Module

We have a file called languages. We read characters from that file and print
them to the console.

Dim stream As StreamReader
stream = New StreamReader(file)

The StreamReader takes a file name as a parameter.

Console.WriteLine(stream.ReadToEnd())

The ReadToEnd method reads all characters to the end of the stream.

$ cat languages
Python
Visual Basic
PERL
Java
C
C#
$ dotnet run
Python
Visual Basic
PERL
Java
C
C#

We have a languages file in the current directory. We print all lines of the
file to the console.

In the next example, we count lines.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

   Sub Main()

       Dim file As String
       Dim count As Integer

       file = "languages"

       Try
           Dim stream As StreamReader
           stream = New StreamReader(file)

           While Not (stream.ReadLine() Is Nothing)
               count += 1
           End While

       Catch e As IOException
           Console.WriteLine("Cannot read file.")
       End Try

       Console.WriteLine("There are {0} lines", count)

   End Sub

End Module

Counting lines in a file.

While Not (stream.ReadLine() Is Nothing)
    count += 1
End While

In the While loop, we read a line from the stream with the ReadLine
method. It returns a line from the stream or Nothing if the end of the input
stream is reached.

An example with StreamWriter follows.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

   Sub Main()

      Dim mstream As New MemoryStream()
      Dim swriter As New StreamWriter(mstream)

      swriter.Write("ZetCode, tutorials for programmers.")
      swriter.Flush()

      Dim sreader As New StreamReader(mstream)
      Console.WriteLine(sreader.ReadToEnd())
      sreader.Close()

   End Sub

End Module

In the preceding example, we write characters to the memory.

Dim mstream As New MemoryStream()

A MemoryStream is created.

Dim swriter As New StreamWriter(mstream)

A StreamWriter class takes a memory stream as a parameter. This
way, we are going to write to memory stream.

swriter.Write("ZetCode, tutorials for programmers.")
swriter.Flush()

We write some text to the writer. The Flush clears all buffers for
the current writer and causes any buffered data to be written to the underlying
stream.

Dim sreader As New StreamReader(mstream)
Console.WriteLine(sreader.ReadToEnd())

Now we create an instance of the stream reader and read everything we have
written back.

## FileStream

A FileStream class uses a stream on a file on the filesystem. This
class can be used to read from files, write to files, open them and close them.

Program.vb
  

Option Strict On

Imports System.IO
Imports System.Text

Module Example

   Sub Main()
        Dim fstream As New FileStream("author", FileMode.Append)
        Dim bytes As Byte() = New UTF8Encoding().GetBytes("Фёдор Михайлович Достоевский")

        fstream.Write(bytes, 0, bytes.Length)
        fstream.Close()
   End Sub

End Module

We write some text in Russian cyrillica to the file in the current working
directory.

Dim fstream As New FileStream("author", FileMode.Append)

A FileStream object is created. The second parameter is a mode, in
which the file is opened. The append mode opens the file if it exists and seeks
to the end of the file, or creates a new file.

Dim bytes As Byte() = New UTF8Encoding().GetBytes("Фёдор Михайлович Достоевский")

We create an array of bytes from text in Russian azbuka.

fstream.Write(bytes, 0, bytes.Length)

We write the bytes to the file stream.

## XmlTextReader

We can use streams to read XML data. The XmlTextReader is the class
to read XML files in Visual Basic. The class is forward-only and read-only.

We have the following XML test file.

&lt;?xml version="1.0" encoding="utf-8" ?&gt;
&lt;languages&gt;
    &lt;language&gt;Python&lt;/language&gt;
    &lt;language&gt;Ruby&lt;/language&gt;
    &lt;language&gt;Javascript&lt;/language&gt;
    &lt;language&gt;C#&lt;/language&gt;
&lt;/languages&gt;

Program.vb
  

```
Option Strict On

Imports System.IO
Imports System.Xml

Module Example

    Sub Main()

        Dim file As String
        file = "languages.xml"

        Try
            Dim xreader As New XmlTextReader(file)

            xreader.MoveToContent()

            Do While xreader.Read()
                Select Case xreader.NodeType
                    Case XmlNodeType.Element
                        Console.Write(xreader.Name &amp; ": ")
                    Case XmlNodeType.Text
                        Console.WriteLine(xreader.Value)
                End Select
            Loop

            xreader.Close()

        Catch e As IOException
            Console.WriteLine("Cannot read file.")
        Catch e As XmlException
            Console.WriteLine("XML parse error")
        End Try

     End Sub

End Module

```

This Visual Basic program reads data from the previously
specified XML file and prints it to the terminal.

Dim xreader As New XmlTextReader(file)

An XmlTextReader object is created. It takes the file name as a
parameter.

xreader.MoveToContent()

The MoveToContent method moves to the actual content of the XML
file.

Do While xreader.Read()

This line reads the next node from the stream.

Case XmlNodeType.Element
    Console.Write(xreader.Name &amp; ": ")
Case XmlNodeType.Text
    Console.WriteLine(xreader.Value)

Here we print the element name and element text.

Catch e As XmlException
    Console.WriteLine("XML parse error")

We check for XML parse error.

$ dotnet run
language: Python
language: Ruby
language: Javascript
language: C#

## Files and directories

The .NET framework provides other classes that we can use to work with files and
directories.

A File class is a higher level class that has shared methods for
file creation, deletion, copying, moving, and opening. These methods make the
job easier.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

    Sub Main()
       Try
            Dim sw As StreamWriter

            sw = File.CreateText("cars")

            sw.WriteLine("Toyota")
            sw.WriteLine("Skoda")
            sw.WriteLine("BMW")
            sw.WriteLine("Volkswagen")
            sw.WriteLine("Volvo")

            sw.Close()
       Catch e As IOException
           Console.WriteLine("IO error")
       End Try

    End Sub

End Module

In the example, we create a cars file and write some car names into it.

sw = File.CreateText("cars")

The CreateText method creates or opens a file for writing UTF-8
encoded text. It returns a StreamWriter object.

sw.WriteLine("Toyota")
sw.WriteLine("Skoda")
...

We write two lines to the stream.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

    Sub Main()

        If File.Exists("cars")
            Console.WriteLine(File.GetCreationTime("cars"))
            Console.WriteLine(File.GetLastWriteTime("cars"))
            Console.WriteLine(File.GetLastAccessTime("cars"))
        End If

        File.Copy("cars", "newcars")

    End Sub

End Module

In the second example, we show other five shared methods of the
File class.

If File.Exists("cars")

The Exists method determines whether the specified file exists.

Console.WriteLine(File.GetCreationTime("cars"))
Console.WriteLine(File.GetLastWriteTime("cars"))
Console.WriteLine(File.GetLastAccessTime("cars"))

We get creation time, last write time and last access time of the specified
file.

File.Copy("cars", "newcars")

The Copy method copies the file.

The My.Computer.FileSystem is and object, which provides properties
and methods for working with drives, files, and directories.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

    Sub Main()

        Try
            My.Computer.FileSystem.CreateDirectory("temp")
            My.Computer.FileSystem.CreateDirectory("newdir")
            My.Computer.FileSystem.MoveDirectory("temp", "temporary")
        Catch e As IOException
            Console.WriteLine("Cannot create directories")
            Console.WriteLine(e.Message)
        End Try

    End Sub

End Module

We use two methods from the above mentioned object.

My.Computer.FileSystem.CreateDirectory("temp")

The CreateDirectory method creates a new directory.

My.Computer.FileSystem.MoveDirectory("temp", "temporary")

The MoveDirectory method gives a specified
directory a new name.

The DirectoryInfo and Directory have methods for
creating, moving, and enumerating through directories and subdirectories.

Program.vb
  

Option Strict On

Imports System.IO

Module Example

    Dim subDir As IO.DirectoryInfo
    Dim dir As New IO.DirectoryInfo("../io")

    Dim fileName As String

    Dim files As String() = Directory.GetFiles("../io")
    Dim dirs As DirectoryInfo() = dir.GetDirectories()

    Sub Main()

        For Each subDir In dirs
            Console.WriteLine(subDir.Name)
        Next

        For Each fileName In files
            Console.WriteLine(fileName)
        Next

    End Sub

End Module

We use the DirectoryInfo class to traverse a specific directory and
print its contents.

Dim dir As New IO.DirectoryInfo("../io")

We show the contents of this directory (io).

Dim files As String() = Directory.GetFiles("../io")

We get all files of the io directory using the shared
GetFiles method.

Dim dirs As DirectoryInfo() = dir.GetDirectories()

We get all directories.

For Each subDir In dirs
    Console.WriteLine(subDir.Name)
Next

Here we loop through directories and print their names to the console.

For Each fileName In files
    Console.WriteLine(fileName)
Next

Here we loop through the array of files and print their names to the console.

$ dotnet run
newdir
temp
temporary
../io/append.vb
../io/append.vb~
../io/author
../io/cars
...

In this chapter, we have covered input &amp; output operations in Visual Basic.

[Contents](..)
[Previous](../collections/)