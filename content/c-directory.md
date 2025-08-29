+++
title = "C# Directory"
date = 2025-08-27T23:22:57.431+01:00
draft = false
description = "Learn how to manage directories in C# with
this tutorial. Discover how to create, delete, list directories, and handle
permissions using C# file system methods and best practices."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Directory

last modified May 1, 2025

 

This C# Directory tutorial demonstrates how to manage directories in C#. 
Our examples include creating, deleting, listing, and checking permissions 
of directories.

The [C# List Directory](/csharp/listdirectory/) tutorial provides a
comprehensive guide on listing directory contents in C#, helping you navigate
and manage file system structures effectively.

## What Is a Directory?

A directory, commonly known as a folder, serves as a structured storage location
for files on a computer. Directories can also contain subdirectories or
shortcuts, allowing for organized data management.

## Working with Directories in C#

C# provides two primary classes for directory handling:

  Directory - A static class offering methods for creating,
  deleting, and manipulating directories.
  DirectoryInfo - An instance-based class that provides
  detailed information about a specific directory, including attributes and
  metadata.

Both classes are part of the System.IO namespace and serve distinct
purposes—while Directory is ideal for quick operations,
DirectoryInfo is better suited for working with directory objects
and retrieving extended details.

## C# create directory

Use the Directory.CreateDirectory method to create a directory.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

var dirName = $@"{docPath}\test";

DirectoryInfo di = Directory.CreateDirectory(dirName);
Console.WriteLine($"Full name: {di.FullName}, Name: {di.Name}, Parent: {di.Parent}");

if (Directory.Exists(dirName))
{
    Console.WriteLine("Directory exists");
}
else
{
    Console.WriteLine("Directory does not exist");
}

This example creates a test directory in the user's 
Documents folder.

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

We retrieve the MyDocuments folder path using 
Environment.GetFolderPath.

var dirName = $@"{docPath}\test";

This defines the full path for the new directory.

DirectoryInfo di = Directory.CreateDirectory(dirName);
Console.WriteLine($"Full name: {di.FullName}, Name: {di.Name}, Parent: {di.Parent}");

The Directory.CreateDirectory method creates a directory and 
returns a DirectoryInfo object. We print its full name, name, 
and parent directory.

if (Directory.Exists(dirName))
{
    Console.WriteLine("Directory exists");
}
else
{
    Console.WriteLine("Directory does not exist");
}

The Directory.Exists method checks if the specified directory 
exists.

## C# get current directory

The Directory.GetCurrentDirectory method retrieves the 
application's current working directory.

Program.cs
  

var curDir = Directory.GetCurrentDirectory();
Console.WriteLine(curDir);

Console.WriteLine(Directory.GetDirectoryRoot(curDir));

This program displays the current working directory and its root, obtained 
using Directory.GetDirectoryRoot.

$ dotnet run
C:\Users\Jano\Documents\csharp\directory\CurrentDirectory
C:\

## C# delete directory

Use the Directory.Delete method to remove a directory.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
var myDir = $@"{docPath}/test3";

Directory.CreateDirectory(myDir);
Console.WriteLine(Directory.Exists(myDir));

Directory.Delete(myDir);
Console.WriteLine(Directory.Exists(myDir));

This example creates a directory, verifies its existence, deletes it, and 
checks its existence again.

$ dotnet run
True
False

## C# move directory

The Directory.Move method renames or moves a directory.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

var sourceDir = $@"{docPath}\test";
var destDir = $@"{docPath}\test2";

Directory.Move(sourceDir, destDir);

This example renames a directory.

Directory.Move(sourceDir, destDir);

The Directory.Move method takes source and destination 
directory paths as parameters.

## C# list drives

The Directory.GetLogicalDrives method lists the names of 
logical drives in the format :\.

Program.cs
  

string[] drives = Directory.GetLogicalDrives();

foreach (string drive in drives)
{
    System.Console.WriteLine(drive);
}

This example displays all drives on the computer.

## C# list directories

The Directory.GetDirectories method returns subdirectory names, 
optionally matching specified criteria.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

string[] myDirs = Directory.GetDirectories(docPath);
Console.WriteLine("Directories:");

foreach (var myDir in myDirs)
{
    Console.WriteLine(myDir);
}

This example lists all subdirectories in the specified directory.

The next example filters directories based on specific criteria.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
Console.WriteLine(docPath);

string[] myDirs = Directory.GetDirectories(docPath, "w*",
        SearchOption.TopDirectoryOnly);

Console.WriteLine("Directories:");

foreach (var myDir in myDirs)
{
    Console.WriteLine(myDir);
}

This example lists directories starting with the letter w.

string[] myDirs = Directory.GetDirectories(docPath, "w*", SearchOption.TopDirectoryOnly);

The Directory.GetDirectories method accepts the directory path, 
a search pattern for subdirectory names, and a search option to limit to the 
current directory or include subdirectories.

## C# list files

The Directory.GetFiles method returns file names, optionally 
matching specified criteria.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

string[] myFiles = Directory.GetFiles(docPath);
Console.WriteLine("Files:");

foreach (var myFile in myFiles)
{
    Console.WriteLine(myFile);
}

This example lists all files in the user's Documents folder.

## C# directory times

The Directory.GetCreationTime method retrieves a directory's 
creation date and time. Directory.GetLastAccessTime gets the 
last access date and time, and Directory.GetLastWriteTime 
fetches the last write date and time.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

var myDir = $@"{docPath}\test";

var creationTime = Directory.GetCreationTime(myDir);
var lastAccessTime = Directory.GetLastAccessTime(myDir);
var lastWriteTime = Directory.GetLastWriteTime(myDir);

Console.WriteLine($"Creation time: {creationTime}");
Console.WriteLine($"Last access time: {lastAccessTime}");
Console.WriteLine($"Last write time: {lastWriteTime}");

This example prints the creation, last access, and last write times of the 
specified directory.

## C# list entries

The Directory.GetFileSystemEntries method returns names of all 
files and subdirectories, optionally matching specified criteria.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

string[] entries = Directory.GetFileSystemEntries(docPath, "w*");
Console.WriteLine("Entries:");

foreach (var entry in entries)
{
    Console.WriteLine(entry);
}

This program lists all entries starting with w in the specified 
directory.

## C# directory size

The following example calculates a directory's size.

Program.cs
  

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
long size = 0;
var myDir = $@"{docPath}/csharp";

var dirInfo = new DirectoryInfo(myDir);

foreach (FileInfo fi in dirInfo.GetFiles("*", SearchOption.AllDirectories))
{
    size += fi.Length;
}

Console.WriteLine($"The directory size: {size} bytes");

To calculate a directory's size, we use DirectoryInfo's 
GetFiles method, which returns an array of FileInfo 
objects. The Length property of FileInfo provides 
each file's size.

foreach (FileInfo fi in dirInfo.GetFiles("*", SearchOption.AllDirectories))
{
    size += fi.Length;
}

We iterate through all files in the directory and its subdirectories, 
summing their sizes.

## C# copy directory

The following example copies a directory.

Program.cs
  

var source = @"C:\Users\Jano\Documents\websites";
var dest = @"C:\Users\Jano\Documents\websites-2";

DirectoryCopy(source, dest, true);
Console.WriteLine("Copying finished");
        
void DirectoryCopy(string source, string dest, bool copySubDirs = true)
{
    var dir = new DirectoryInfo(source);

    if (!dir.Exists)
    {
        throw new DirectoryNotFoundException(
            $"Source directory does not exist or could not be found: {source}");
    }

    DirectoryInfo[] dirs = dir.GetDirectories();

    if (!Directory.Exists(dest))
    {
        Directory.CreateDirectory(dest);
    }

    FileInfo[] files = dir.GetFiles();

    foreach (FileInfo file in files)
    {
        string tempPath = Path.Combine(dest, file.Name);
        file.CopyTo(tempPath, false);
    }

    if (copySubDirs)
    {
        foreach (DirectoryInfo subdir in dirs)
        {
            string tempPath = Path.Combine(dest, subdir.Name);
            DirectoryCopy(subdir.FullName, tempPath, copySubDirs);
        }
    }
}

This example copies a directory and its subdirectories to a new location.

var source = @"C:\Users\Jano\Documents\websites";
var dest = @"C:\Users\Jano\Documents\websites-2";

We specify the source and destination directory paths.

DirectoryCopy(source, dest, true);

The DirectoryCopy method handles the copying, with the third 
parameter indicating whether to include subdirectories.

var dir = new DirectoryInfo(source);

if (!dir.Exists)
{
    throw new DirectoryNotFoundException(
        $"Source directory does not exist or could not be found: {source}");
}

We create a DirectoryInfo object for the source path and check 
if it exists, throwing a DirectoryNotFoundException if it does 
not.

DirectoryInfo[] dirs = dir.GetDirectories();

We retrieve all top-level directories using GetDirectories.

if (!Directory.Exists(dest))
{
    Directory.CreateDirectory(dest);
}

We create the destination directory if it does not exist.

FileInfo[] files = dir.GetFiles();

foreach (FileInfo file in files)
{
    string tempPath = Path.Combine(dest, file.Name);
    file.CopyTo(tempPath, false);
}

We retrieve and copy all files to the destination directory.

if (copySubDirs)
{
    foreach (DirectoryInfo subdir in dirs)
    {
        string tempPath = Path.Combine(dest, subdir.Name);
        DirectoryCopy(subdir.FullName, tempPath, copySubDirs);
    }
}

If copySubDirs is true, we recursively copy subdirectories and 
their contents.

## C# directory access control list

An access control list (ACL) contains access control entries (ACEs). Each ACE 
identifies a trustee and specifies their allowed, denied, or audited access 
rights.

The DirectoryInfo.GetAccessControl method retrieves the ACL 
entries for a directory.

$ dotnet add package System.IO.FileSystem.AccessControl

We must include the System.IO.FileSystem.AccessControl package.

Program.cs
  

using System.Security.AccessControl;

var docPath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
var myDir = $@"{docPath}\test";

var dirInfo = new DirectoryInfo(myDir);
DirectorySecurity dSecurity = dirInfo.GetAccessControl();
AuthorizationRuleCollection acl = dSecurity.GetAccessRules(true, true,
    typeof(System.Security.Principal.NTAccount));

foreach (FileSystemAccessRule ace in acl)
{
    Console.WriteLine("Account: {0}", ace.IdentityReference.Value);
    Console.WriteLine("Type: {0}", ace.AccessControlType);
    Console.WriteLine("Rights: {0}", ace.FileSystemRights);
    Console.WriteLine("Inherited: {0}", ace.IsInherited);

    Console.WriteLine("------------------------");
}

This example displays the ACL for the specified directory.

var dirInfo = new DirectoryInfo(myDir);

We create a DirectoryInfo object for the directory.

DirectorySecurity dSecurity = dirInfo.GetAccessControl();

The GetAccessControl method returns a 
DirectorySecurity object containing the directory's access 
control rules.

AuthorizationRuleCollection acl = dSecurity.GetAccessRules(true, true,
        typeof(System.Security.Principal.NTAccount));

We obtain a collection of security rules using GetAccessRules.

foreach (FileSystemAccessRule ace in acl)
{
    Console.WriteLine("Account: {0}", ace.IdentityReference.Value);
    Console.WriteLine("Type: {0}", ace.AccessControlType);
    Console.WriteLine("Rights: {0}", ace.FileSystemRights);
    Console.WriteLine("Inherited: {0}", ace.IsInherited);

    Console.WriteLine("------------------------");
}

We iterate through the access control rules and display them.

## Source

[Directory class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.io.directory?view=net-8.0)

This article explored working with directories in C#.

## Author

I am Jan Bodnar, a passionate programmer with extensive experience. I have 
been writing programming articles since 2007, authoring over 1,400 articles 
and 8 e-books. I have more than ten years of experience teaching 
programming.

List [all C# tutorials](/csharp/).