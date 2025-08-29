+++
title = "VBScript Text Property"
date = 2025-08-29T20:14:50.812+01:00
draft = false
description = "Learn about VBScript Text property, including string manipulation, control properties, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Text Property

last modified April 9, 2025

The Text property in VBScript is used to get or set the text content
of various objects. It's commonly available in UI controls like textboxes and
labels. The property provides access to string data for manipulation and display.
Understanding Text is essential for interactive scripting.

Text differs from Value in that it always deals with
string representations. It's widely used in forms and user interfaces. This
tutorial covers Text with practical examples to demonstrate its
usage in different contexts.

## Text Property Overview

The Text property represents the visible string content of an
object. It's readable and writable in most implementations. The property is
available in HTML DOM elements and Windows Script Host controls.

Key features include automatic string conversion and direct content access. It
doesn't perform validation on assignment. Text works with both
simple strings and formatted content. Understanding this property helps create
interactive scripts.

## Basic Text Box Manipulation

This example demonstrates basic usage of the Text property with an
input box. It shows how to get and set text content. The script interacts with
user input through the property.

basic_text.vbs
  

Dim userInput
userInput = InputBox("Enter your name:")
MsgBox "You entered: " &amp; userInput, vbInformation, "Result"

' Set default text in second input
userInput = InputBox("Confirm your name:", "Confirmation", "John Doe")
MsgBox "Final value: " &amp; userInput

The script uses InputBox which has an implicit Text
property. The first call gets user input. The second demonstrates setting
default text. The property handles all string interactions.

## HTML DOM Text Manipulation

This example shows Text property usage with HTML DOM elements. It
demonstrates reading and modifying element content. The script interacts with a
web page's elements.

html_text.vbs
  

Set IE = CreateObject("InternetExplorer.Application")
IE.Visible = True
IE.Navigate "about:blank"

Do While IE.Busy
    WScript.Sleep 100
Loop

IE.Document.body.innerHTML = "&lt;input type='text' id='txtBox' value='Initial'&gt;"
IE.Document.getElementById("txtBox").Text = "New Value"

MsgBox "Text box contains: " &amp; IE.Document.getElementById("txtBox").Text
IE.Quit

The script creates an IE instance and adds a text box. It modifies the
Text property then reads it back. This shows DOM interaction
through VBScript.

## FileSystemObject TextStream

This example demonstrates the Text property with file operations.
It shows reading file content through TextStream. The property
provides access to file contents.

file_text.vbs
  

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("example.txt", True)
file.WriteLine "Sample text content"
file.Close

Set file = fso.OpenTextFile("example.txt", 1)
content = file.ReadAll
MsgBox "File contains: " &amp; content
file.Close
Set fso = Nothing

The script creates a file and writes text to it. Then it reads back the content
using ReadAll which populates the Text property
equivalents. This shows file content handling.

## WScript Echo Text Output

This example shows using the Text property equivalent with
WScript.Echo. It demonstrates console output of text content. The
method automatically handles string conversion.

echo_text.vbs
  

Dim greeting
greeting = "Hello, World!"
WScript.Echo greeting

Dim numText
numText = 123.45
WScript.Echo "Number as text: " &amp; numText

The script outputs text directly to the console. It shows both direct string
output and number-to-text conversion. WScript.Echo uses the
Text representation.

## Dictionary Object Text Conversion

This example demonstrates implicit Text property usage with a
Dictionary object. It shows how VBScript handles text conversion
for collection objects.

dict_text.vbs
  

Set dict = CreateObject("Scripting.Dictionary")
dict.Add "name", "John"
dict.Add "age", 30

textRep = "Dictionary contents: " &amp; vbCrLf
For Each key In dict.Keys
    textRep = textRep &amp; key &amp; ": " &amp; dict(key) &amp; vbCrLf
Next

MsgBox textRep
Set dict = Nothing

The script creates a dictionary and converts its contents to text. Each value is
automatically converted to its text representation. This shows collection
handling with text.

## Source

[VBScript Properties Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/d1et7k7c(v=vs.84))

In this article, we have explored the Text property in VBScript,
covering its usage and practical applications. From simple dialogs to file
operations and DOM manipulation, these examples demonstrate text handling. With
this knowledge, you can enhance your scripts with robust text processing.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).