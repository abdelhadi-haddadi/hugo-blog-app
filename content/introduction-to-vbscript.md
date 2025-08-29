+++
title = "Introduction to VBScript"
date = 2025-08-29T20:15:18.777+01:00
draft = false
description = "Introduction to VBScript tutorial shows the basics of VBScript programming, including WSH, wscript, and cscript commands."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to VBScript

last modified February 19, 2025

VBScript (Visual Basic Scripting Edition) is a lightweight, interpreted
scripting language developed by Microsoft. It is a simplified subset of the
Visual Basic programming language, making it easy to learn and use. VBScript is
widely utilized for automating routine tasks in Windows environments, such as
file manipulation, system configuration, and process management. Being
lightweight, it allows users to create scripts without needing to install
additional software, as it is natively supported by the Windows operating
system. VBScript scripts are executed by the Windows Script Host (WSH), which
serves as the runtime environment, making it an essential tool for system
administrators and power users who need quick and efficient solutions to
repetitive tasks.

## Windows Script Host (WSH)

The Windows Script Host (WSH) is a flexible scripting host environment provided
by Microsoft for running scripts written in languages like VBScript and JScript.
Introduced as an alternative to batch files, WSH allows developers and
administrators to write more sophisticated and interactive scripts. It acts as
the engine that interprets and executes the code, providing essential services
such as file system access, interaction with Windows applications, and
manipulation of system settings. WSH offers two powerful command-line tools,
wscript.exe and cscript.exe, which enable users to
execute scripts in different contexts based on their requirements. This
flexibility has made WSH an integral part of the Windows scripting ecosystem.

### The wscript tool

The wscript tool is specifically designed to execute scripts in a
graphical user interface (GUI) environment. When running scripts with
wscript, output is displayed through pop-up message boxes or dialog
windows, making it an ideal choice for tasks that require user interaction or
visual prompts. For instance, scripts that provide alerts, gather user input, or
display status messages benefit from the GUI capabilities of
wscript. This tool enhances usability by providing a more
interactive and user-friendly experience compared to traditional console-based
outputs.

### The cscript tool

The cscript tool, in contrast, is tailored for running scripts in a
command-line interface (CLI) environment. It displays output directly in the
console, making it suitable for scripts that perform background operations or
those that do not require user interaction. cscript is particularly
useful for tasks like data processing, logging, and automating repetitive
command-line tasks. Additionally, it supports command-line arguments, enabling
users to pass parameters to scripts and customize their behavior. Its simplicity
and flexibility make it a popular choice for administrators managing servers and
executing batch operations.

### Common Options

Both wscript and cscript support the following options:

- //T:nn: Sets a timeout for the script in seconds.

- //I: Enables interactive mode.

- //B: Batch mode. Suppresses script errors and prompts from displaying.

- //D: Enables the Active Debugging.

- //E:engine: Uses the specified script engine to run the script.

- //H:CScript: Registers cscript.exe as the default script host for the given script file extension.

- //H:WScript: Registers wscript.exe as the default script host for the given script file extension.

- //Job:xxxxx: Executes a WSF job by name.

- //Logo: Displays the logo banner (the default).

- //NoLogo: Prevents display of the logo banner.

## Simple Example

The first example demonstrates how to output text to the console.

hello.vbs
  

WScript.Echo "Hello there!"

The WScript.Echo function outputs the text "Hello there!" to the
console. Run the script using cscript:

cscript hello.vbs

## Variables in VBScript

Variables in VBScript are used to store data. They are declared using the
Dim keyword.

variables.vbs
  

Dim name
name = "John Doe"

WScript.Echo "Name: " &amp; name

This example declares a variable name and assigns it the value
"John Doe". The value is then displayed using WScript.Echo.

## Conditional Statements

VBScript supports conditional statements like If...Then...Else for
decision-making.

conditions.vbs
  

Dim age
age = 20

If age &gt;= 18 Then
    WScript.Echo "You are an adult."
Else
    WScript.Echo "You are a minor."
End If

This example checks the value of the age variable and outputs a
message based on the condition.

## Loops in VBScript

VBScript supports loops like For...Next and Do...Loop
for repetitive tasks.

loops.vbs
  

Dim i

For i = 1 To 5
    WScript.Echo "Iteration: " &amp; i
Next

This example uses a For...Next loop to output the iteration number
five times.

## Functions in VBScript

Functions in VBScript are reusable blocks of code that perform a specific task.

functions.vbs
  

Function Add(a, b)
    Add = a + b
End Function

Dim result
result = Add(5, 3)

WScript.Echo "Result: " &amp; result

This example defines a function Add that takes two parameters and
returns their sum. The result is displayed using WScript.Echo.

## Working with Files

VBScript can interact with the file system using the FileSystemObject.

file_operations.vbs
  

Dim fso, file
Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("example.txt", True)

file.WriteLine("This is a test file.")
file.Close()

WScript.Echo "File created successfully."

This example creates a text file named example.txt and writes a line
of text to it.

In this article, we introduced VBScript and the Windows Script Host (WSH). We
covered the basics of VBScript programming, including variables, conditional
statements, loops, functions, and file operations. We also discussed the
wscript and cscript commands and their options.
VBScript is a versatile scripting language that is widely used for automation
and web development.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).