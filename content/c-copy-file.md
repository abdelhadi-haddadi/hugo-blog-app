+++
title = "C# copy file"
date = 2025-08-29T19:50:36.350+01:00
draft = false
description = "Learn to copy files in C# using File.Copy and advanced directory operations. This comprehensive tutorial covers single and multiple file copying with practical examples."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# copy file

last modified April 22, 2025

 

This tutorial demonstrates how to copy files in C# using the
File.Copy method, part of the System.IO namespace.
Learn to handle single and multiple file copying efficiently.

## C# File.Copy synopsis

public static void Copy(string sourceFileName, string destFileName);

This method accepts a source file path and a destination file path, copying the
source file to the specified destination.

public static void Copy(string sourceFileName, string destFileName, bool overwrite);

The overloaded method includes an overwrite boolean parameter,
allowing the destination file to be overwritten if set to true.

## C# copy file example

This example illustrates copying a single file to a new location on the disk.

Program.cs
  

var source = @"C:\Users\Jano\Documents\words.txt";
var destination = @"C:\Users\Jano\Documents\words_bck.txt";

File.Copy(source, destination);
Console.WriteLine("File copied");

This program copies a text file from a source to a destination path, confirming
the operation's success.

var source = @"C:\Users\Jano\Documents\words.txt";
var destination = @"C:\Users\Jano\Documents\words_bck.txt";

The source and destination file paths are defined using verbatim strings for
clarity and platform compatibility.

File.Copy(source, destination);

The File.Copy method performs the copy operation, creating a new
file at the destination.

$ dotnet run
File copied

$ dotnet run
Unhandled exception. System.IO.IOException: The file 'C:\Users\Jano\Documents\words_bck.txt' 
already exists.
...

Running the program twice without overwriting causes an exception, as the
destination file already exists. Using the overloaded method with
overwrite: true prevents this issue.

## C# copy files example

This example demonstrates copying multiple text files to a backup directory.

Program.cs
  

string sourceDir = @"C:\Users\Jano\Documents\";
string backupDir = @"C:\Users\Jano\Documents\backup\";

string[] textFiles = Directory.GetFiles(sourceDir, "*.txt");

foreach (string textFile in textFiles)
{
    string fileName = textFile.Substring(sourceDir.Length);

    File.Copy(Path.Combine(sourceDir, fileName), 
            Path.Combine(backupDir, fileName), true);
}

Console.WriteLine("Files copied");

This program copies all text files from a source directory to a backup
directory, overwriting existing files.

string[] textFiles = Directory.GetFiles(sourceDir, "*.txt");

The Directory.GetFiles method retrieves all text files in the
source directory based on the "*.txt" pattern.

foreach (string textFile in textFiles)
{
    string fileName = textFile.Substring(sourceDir.Length);

    File.Copy(Path.Combine(sourceDir, fileName), 
            Path.Combine(backupDir, fileName), true);
}

The program iterates over the text files, extracts the file name using
Substring, and copies each file to the backup directory using
Path.Combine for path construction.

## C# Copy File with Error Handling

This example demonstrates a robust approach to copying files in C# while
incorporating error handling to address common issues such as missing source
files, access violations, or unexpected exceptions. Error handling ensures that
the program can gracefully recover or notify the user in case of problems,
making it more reliable and user-friendly.

Program.cs
  

var source = @"C:\Users\Jano\Documents\words.txt";
var destination = @"C:\Users\Jano\Documents\words_bck.txt";

try
{
    File.Copy(source, destination, true);
    Console.WriteLine("File copied successfully");
}
catch (FileNotFoundException)
{
    Console.WriteLine("Error: Source file not found");
}
catch (IOException ex)
{
    Console.WriteLine($"Error copying file: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"Unexpected error: {ex.Message}");
}

The File.Copy method is used to copy a file from the specified
source path to the destination path. The third
parameter, true, ensures that the method overwrites the destination
file if it already exists, providing flexibility for updates. By wrapping the
operation in a try-catch block, the program can handle
potential errors gracefully and provide meaningful feedback to the user.

The program accounts for potential errors that might occur during file
operations. If the source file is not found, a
FileNotFoundException is thrown, and the program displays a clear
error message to inform the user. For other input/output errors, such as access
violations, insufficient disk space, or file locks, an IOException
is caught, and its message is presented to help identify the issue.

Additionally, any other unexpected errors are caught using a generic
Exception block, ensuring that unforeseen situations do not crash
the program.

## C# copy file with progress reporting

This example copies a large file while reporting progress, useful for user
feedback during long operations.

Program.cs
  

using System.IO;

var source = @"C:\Users\Jano\Documents\large_file.dat";
var destination = @"C:\Users\Jano\Documents\large_file_copy.dat";

using var sourceStream = new FileStream(source, FileMode.Open, FileAccess.Read);
using var destStream = new FileStream(destination, FileMode.Create, FileAccess.Write);

var buffer = new byte[81920];
long totalBytes = sourceStream.Length;
long bytesCopied = 0;
int bytesRead;

while ((bytesRead = sourceStream.Read(buffer, 0, buffer.Length)) &gt; 0)
{
    destStream.Write(buffer, 0, bytesRead);
    bytesCopied += bytesRead;
    double progress = (double)bytesCopied / totalBytes * 100;
    Console.WriteLine($"Progress: {progress:F2}%");
}

Console.WriteLine("File copied successfully");

This program manually copies a file using streams, reporting progress as a
percentage based on bytes copied, ideal for large files.

## C# Copy Directory Recursively

This example illustrates how to copy an entire directory, including its
subdirectories and files, recursively to a specified new location. Recursive
copying is a common approach for duplicating complex directory structures,
ensuring that all nested files and folders are preserved during the process.
This method is particularly useful for tasks like creating backups or
transferring project directories between environments.

Program.cs
  

string sourceDir = @"C:\Users\Jano\Documents\project";
string destDir = @"C:\Users\Jano\Documents\project_backup";

void CopyDirectory(string source, string dest)
{
    Directory.CreateDirectory(dest);

    foreach (var file in Directory.GetFiles(source))
    {
        string fileName = Path.GetFileName(file);
        File.Copy(file, Path.Combine(dest, fileName), true);
    }

    foreach (var dir in Directory.GetDirectories(source))
    {
        string dirName = Path.GetFileName(dir);
        CopyDirectory(dir, Path.Combine(dest, dirName));
    }
}

CopyDirectory(sourceDir, destDir);
Console.WriteLine("Directory copied successfully");

In this program, the CopyDirectory function is designed to copy all
contents of a source directory to a destination directory. It starts by creating
the destination directory using Directory.CreateDirectory, ensuring
that the directory structure is set up even if it doesn't already exist.

The function then iterates over all the files in the source directory using
Directory.GetFiles. For each file, the File.Copy
method is used to copy it to the destination directory, preserving the original
filename. The true parameter in File.Copy ensures that
files are overwritten if they already exist in the destination, providing
flexibility for updates or replacements.

Next, the function processes subdirectories within the source directory using
Directory.GetDirectories. It recursively calls
CopyDirectory for each subdirectory, ensuring that the entire
directory tree is replicated. This recursive approach allows for efficient
traversal and duplication of nested directory structures.

## C# Copy File Asynchronously

This example demonstrates how to copy a file asynchronously using streams in C#.
By leveraging asynchronous programming, it improves performance for I/O-bound
operations, allowing your application to remain responsive even when performing
potentially time-consuming tasks like file copying.

Program.cs
  

using System.IO;

var source = @"C:\Users\Jano\Documents\words.txt";
var destination = @"C:\Users\Jano\Documents\words_bck.txt";

async Task CopyFileAsync(string sourcePath, string destPath)
{
    using var sourceStream = new FileStream(sourcePath, FileMode.Open, FileAccess.Read);
    using var destStream = new FileStream(destPath, FileMode.Create, FileAccess.Write);

    await sourceStream.CopyToAsync(destStream);
}

await CopyFileAsync(source, destination);
Console.WriteLine("File copied asynchronously");

In this program, the CopyFileAsync function efficiently copies a
file from one location to another by using the asynchronous
CopyToAsync method provided by the Stream class. This
method performs a non-blocking copy operation, meaning the calling thread
remains free to handle other tasks while the file is being copied. Asynchronous
programming is especially beneficial in applications that require high
responsiveness, such as graphical user interfaces (GUIs) or server-side
applications handling multiple simultaneous requests.

The await keyword ensures that the asynchronous copying operation
is awaited, allowing the program to continue its execution only once the
operation is completed. This provides a clean and efficient way to handle I/O
operations without blocking the main thread, making it a great choice for
scenarios where scalability and responsiveness are critical.

By implementing file copying in this asynchronous manner, developers can achieve
improved efficiency and a better user experience in applications that require
heavy file manipulation or interaction with external resources.

## Source

[File.Copy method](https://learn.microsoft.com/en-us/dotnet/api/system.io.file.copy?view=net-8.0)

This article explored various techniques for copying files and directories in
C#, including error handling and asynchronous operations.

## Author

I am Jan Bodnar, a dedicated programmer with extensive experience in software
development. Since 2007, I have authored over 1,400 programming articles and
eight e-books. With more than a decade of teaching programming, I share my
expertise through comprehensive tutorials.

List [all C# tutorials](/csharp/).