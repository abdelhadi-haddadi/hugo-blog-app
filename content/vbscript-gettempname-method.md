+++
title = "VBScript GetTempName Method"
date = 2025-08-29T20:15:06.545+01:00
draft = false
description = "Learn about VBScript GetTempName method, including temporary file creation, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetTempName Method

last modified April 9, 2025

The GetTempName method in VBScript is part of the
FileSystemObject. It generates a random temporary file name that
can be used for temporary file operations. This method doesn't create the file,
just provides a unique name. It's commonly used with temporary file operations.

GetTempName creates names in the format "radXXXXXX" where X is a
random character. The names are guaranteed to be unique during script execution.
This tutorial covers GetTempName with practical examples to
demonstrate its usage.

## GetTempName Method Overview

The GetTempName method takes no parameters and returns a string
with a random temporary filename. It's available through the
FileSystemObject in VBScript scripting. The method is often used
with GetSpecialFolder to get the temp folder path.

Key features include guaranteed uniqueness and consistent naming format. It
doesn't create or verify file existence. GetTempName is useful for
temporary data storage needs. Understanding this method helps create robust file
handling scripts.

## Basic GetTempName Usage

This example demonstrates the simplest use of GetTempName to
generate a random temporary filename. It shows how to call the method and
display the result. The filename follows the standard temporary file format.

basic_gettempname.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
tempName = fso.GetTempName()
WScript.Echo "Temporary filename: " &amp; tempName

Set fso = Nothing

The script creates a FileSystemObject and calls
GetTempName. The result is a string like "rad12345.tmp". The
extension is typically .tmp but may vary. This name can be used to create a
temporary file.

## Creating a Temporary File

This example shows how to combine GetTempName with the temp folder
to create an actual temporary file. It demonstrates practical usage for
temporary data storage. The file is created in the system's temp directory.

create_tempfile.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
tempFolder = fso.GetSpecialFolder(2) ' 2 = TemporaryFolder
tempName = fso.GetTempName()
tempPath = fso.BuildPath(tempFolder, tempName)

Set tempFile = fso.CreateTextFile(tempPath)
tempFile.WriteLine "This is temporary data"
tempFile.Close

WScript.Echo "Created temporary file: " &amp; tempPath

Set fso = Nothing

The script gets the system temp folder and generates a temp filename. It then
combines them to create a full path. A text file is created at this path with
sample content. This is a common pattern for temporary file usage.

## Multiple Temporary Files

This example demonstrates generating multiple temporary filenames in sequence.
It shows how GetTempName produces different names each call. The
names are displayed to show their uniqueness.

multiple_tempfiles.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")

For i = 1 To 5
    tempName = fso.GetTempName()
    WScript.Echo "Temp name " &amp; i &amp; ": " &amp; tempName
Next

Set fso = Nothing

The script generates and displays five different temporary filenames. Each call
to GetTempName produces a unique result. This is useful when
multiple temporary files are needed in a script. The names follow the same
format but with different random characters.

## Temporary File with Custom Extension

This example shows how to create a temporary file with a custom extension
instead of .tmp. It demonstrates modifying the generated name. The script
replaces the default extension with a custom one.

custom_extension.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
tempName = fso.GetTempName()
customName = Left(tempName, Len(tempName) - 3) &amp; "log"

WScript.Echo "Original: " &amp; tempName
WScript.Echo "Modified: " &amp; customName

Set fso = Nothing

The script generates a standard temp name then modifies its extension. The
original .tmp extension is replaced with .log. This technique is useful when
needing specific file types for temporary data. The base random name portion
remains unchanged.

## Temporary File Cleanup

This example demonstrates proper cleanup of temporary files created with
GetTempName. It shows creating, using, and deleting a temporary
file. Proper cleanup is important for temporary files.

tempfile_cleanup.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
tempPath = fso.BuildPath(fso.GetSpecialFolder(2), fso.GetTempName())

Set tempFile = fso.CreateTextFile(tempPath)
tempFile.WriteLine "Temporary data"
tempFile.Close

' Use the file here...

If fso.FileExists(tempPath) Then
    fso.DeleteFile(tempPath)
    WScript.Echo "Temporary file deleted: " &amp; tempPath
End If

Set fso = Nothing

The script creates a temp file, uses it, then deletes it. The
FileExists check prevents errors if the file was already deleted.
This pattern ensures no leftover temporary files. It's a best practice for
temporary file handling.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/d6dw7ae9(v=vs.84))

In this article, we have explored the GetTempName method in VBScript,
covering its usage and practical applications. From simple name generation to
complete temporary file lifecycle management, these examples demonstrate reliable
temporary file handling. With this knowledge, you can enhance your scripts with
proper temporary file operations.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).