+++
title = "VBScript Status Property"
date = 2025-08-29T20:15:39.951+01:00
draft = false
description = "Learn about VBScript Status Property, including error handling, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Status Property

last modified April 9, 2025

The Status property in VBScript is used to check the status of 
various operations, particularly in file handling. It returns a numeric value 
indicating success or failure of an operation. This property is commonly 
available in objects like File and Folder from the 
FileSystemObject.

The Status property helps in error handling and operation 
verification. It provides immediate feedback about the state of an object or 
operation. Understanding this property is crucial for robust script development.

## Status Property Overview

The Status property typically returns 0 for success and non-zero 
for errors. Different objects may have specific status codes with particular 
meanings. It's often used after operations that might fail, like file copies or 
deletes.

Key features include immediate operation feedback and simple error detection. 
The property doesn't throw exceptions but provides status codes. It's available 
in several VBScript objects for consistent error handling.

## Checking File Copy Status

This example demonstrates using the Status property after a file 
copy operation. It shows how to verify if the copy succeeded. The status is 
checked immediately after the copy attempt.

file_copy_status.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set sourceFile = fso.GetFile("C:\temp\source.txt")
sourceFile.Copy "C:\temp\destination.txt"

If sourceFile.Status = 0 Then
    WScript.Echo "File copied successfully"
Else
    WScript.Echo "Copy failed with status: " &amp; sourceFile.Status
End If

Set fso = Nothing

The script attempts to copy a file and checks the Status property. 
A status of 0 indicates success, while other values indicate errors. This 
provides immediate feedback about the operation's outcome.

## Verifying File Delete Operation

This example shows how to use the Status property after deleting a 
file. It demonstrates error handling for file operations. The status check helps 
confirm the deletion was successful.

file_delete_status.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set fileToDelete = fso.GetFile("C:\temp\oldfile.txt")
fileToDelete.Delete

If fileToDelete.Status = 0 Then
    WScript.Echo "File deleted successfully"
Else
    WScript.Echo "Delete failed with status: " &amp; fileToDelete.Status
End If

Set fso = Nothing

After attempting to delete a file, the script checks the Status 
property. This immediate verification helps identify issues like permission 
problems. The status code provides specific information about the operation's 
outcome.

## Checking Folder Creation Status

This example demonstrates using the Status property with folder 
operations. It shows how to verify if a folder was created successfully. The 
status check occurs right after the creation attempt.

folder_create_status.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set newFolder = fso.CreateFolder("C:\temp\newfolder")

If newFolder.Status = 0 Then
    WScript.Echo "Folder created successfully"
Else
    WScript.Echo "Folder creation failed with status: " &amp; newFolder.Status
End If

Set fso = Nothing

The script creates a new folder and checks its Status property. 
This helps detect issues like existing folders or permission problems. The status 
check provides immediate feedback about the operation.

## Verifying File Attribute Changes

This example shows using the Status property after modifying file 
attributes. It demonstrates how to confirm attribute changes were applied 
successfully. The status check occurs after setting the attributes.

file_attributes_status.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set myFile = fso.GetFile("C:\temp\test.txt")
myFile.Attributes = myFile.Attributes Or 1 ' Set read-only

If myFile.Status = 0 Then
    WScript.Echo "Attributes changed successfully"
Else
    WScript.Echo "Attribute change failed with status: " &amp; myFile.Status
End If

Set fso = Nothing

After attempting to change file attributes, the script checks the 
Status property. This helps verify the operation succeeded. The 
status code provides specific information about any issues encountered.

## Handling Multiple Operations Status

This example demonstrates checking Status after multiple file 
operations. It shows how to track the status of sequential operations. Each 
operation's status is checked individually.

multi_operation_status.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set myFile = fso.CreateTextFile("C:\temp\log.txt")
If myFile.Status = 0 Then WScript.Echo "File created"

myFile.WriteLine "Test log entry"
If myFile.Status = 0 Then WScript.Echo "Write succeeded"

myFile.Close
If myFile.Status = 0 Then WScript.Echo "Close succeeded"

Set fso = Nothing

The script performs multiple file operations and checks Status 
after each. This granular approach helps identify exactly where failures occur. 
Each status check provides feedback about that specific operation's success.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the Status property in VBScript,
covering its usage and practical applications. From file operations to folder 
management, these examples demonstrate reliable status checking. With this 
knowledge, you can enhance your scripts with robust error handling.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).