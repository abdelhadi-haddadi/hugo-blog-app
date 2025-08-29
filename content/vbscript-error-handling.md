+++
title = "VBScript Error Handling"
date = 2025-08-29T20:14:51.911+01:00
draft = false
description = "Learn about VBScript error handling techniques including On Error Resume Next, Err object, and structured error handling with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Error Handling

last modified April 4, 2025

Error handling in VBScript is essential for creating robust scripts that can
gracefully handle unexpected situations. Unlike some modern languages, VBScript
uses a simple but effective error handling mechanism. This tutorial covers all
aspects of VBScript error handling with practical examples.

## VBScript Error Handling Overview

VBScript provides two primary error handling approaches: inline error handling
with On Error Resume Next and the Err object for
error inspection. There is no try-catch mechanism like in other languages.

The On Error Resume Next statement tells VBScript to continue
execution after an error occurs. The Err object contains details
about the last error. Proper error handling prevents scripts from crashing and
allows for meaningful error messages.

## Basic Error Handling with On Error Resume Next

The simplest form of error handling in VBScript uses On Error Resume
Next. This statement makes the script continue execution after an error.
You should check the Err object immediately after operations that
might fail.

basic_error_handling.vbs
  

On Error Resume Next

Dim result
result = 10 / 0  ' Division by zero error

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error #" &amp; Err.Number &amp; ": " &amp; Err.Description
    Err.Clear
Else
    WScript.Echo "Result: " &amp; result
End If

This example demonstrates basic error handling. The division by zero would
normally crash the script, but with error handling, we catch and display the
error. Always clear the error with Err.Clear after handling it.

## Using the Err Object

The Err object provides detailed information about runtime errors.
It contains properties like Number, Description,
Source, and methods like Clear and
Raise.

err_object.vbs
  

On Error Resume Next

Dim fso, file
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("nonexistent.txt", 1)

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error Details:"
    WScript.Echo "Number: " &amp; Err.Number
    WScript.Echo "Description: " &amp; Err.Description
    WScript.Echo "Source: " &amp; Err.Source
    Err.Clear
Else
    file.Close
End If

This example shows how to use the Err object properties when handling file
operations. The script attempts to open a non-existent file, triggering an
error. We then display all available error information before clearing it.

## Nested Error Handling

For complex scripts, you might need nested error handling. You can disable error
handling with On Error GoTo 0 and re-enable it as needed. This
allows different error handling strategies in different parts of your script.

nested_error_handling.vbs
  

On Error Resume Next

Dim x, y
x = 10
y = 0

' First operation with error handling
Dim result1
result1 = x / y

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "First operation failed: " &amp; Err.Description
    Err.Clear
End If

' Disable error handling temporarily
On Error GoTo 0

' Second operation without error handling
Dim result2
result2 = x / y  ' This will cause script to stop

WScript.Echo "This line won't be reached"

This example shows nested error handling. The first division is protected, while
the second is not. The script will stop at the second division. Use this
technique carefully to control error handling scope.

## Creating Custom Errors

You can generate custom errors using the Err.Raise method. This is
useful for validating input or creating specific error conditions. You can use
built-in error numbers or define your own.

custom_errors.vbs
  

Sub ProcessValue(value)
    If Not IsNumeric(value) Then
        Err.Raise 1001, "ProcessValue", "Input must be numeric"
    End If
    WScript.Echo "Processing: " &amp; value * 2
End Sub

On Error Resume Next
ProcessValue "abc"

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Custom Error #" &amp; Err.Number &amp; ": " &amp; Err.Description
    WScript.Echo "Source: " &amp; Err.Source
    Err.Clear
End If

This example demonstrates creating and handling custom errors. The
ProcessValue subroutine raises an error if the input isn't
numeric. The main script catches and displays this custom error with its
details.

## Error Handling in File Operations

File operations are common sources of errors in scripts. Proper error handling
makes file operations more reliable. Always check for errors after file
operations and provide meaningful feedback to users.

file_operations.vbs
  

On Error Resume Next

Dim fso, file, content
Set fso = CreateObject("Scripting.FileSystemObject")

' Try to read a file
Set file = fso.OpenTextFile("data.txt", 1)
If Err.Number = 53 Then ' File not found
    WScript.Echo "Error: File not found. Creating new file."
    Err.Clear
    Set file = fso.CreateTextFile("data.txt")
    file.WriteLine "Default content"
    file.Close
ElseIf Err.Number &lt;&gt; 0 Then
    WScript.Echo "Unexpected error: " &amp; Err.Description
    WScript.Quit 1
End If

' If we got here, either file existed or was created
Set file = fso.OpenTextFile("data.txt", 1)
content = file.ReadAll
file.Close

WScript.Echo "File content: " &amp; content

This example shows comprehensive file operation error handling. It attempts to
open a file, handles the "file not found" case specifically, creates the file
if needed, and handles other potential errors. This makes the script more robust.

## Source

[VBScript Error Handling Documentation](https://learn.microsoft.com/en-us/previous-versions//sbf45ze0(v=vs.85))

In this article, we have explored VBScript error handling techniques in depth.
From basic On Error Resume Next to advanced custom error creation,
these methods help create robust scripts. Proper error handling prevents crashes
and improves user experience. With these examples, you can implement effective
error handling in your VBScript projects.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).