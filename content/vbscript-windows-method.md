+++
title = "VBScript Windows Method"
date = 2025-08-29T20:15:31.001+01:00
draft = false
description = "Learn about VBScript Windows Method, including window operations, script execution, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Windows Method

last modified April 9, 2025

The Windows Method in VBScript refers to the WScript object's
methods and properties. This object provides access to the Windows Script Host
environment. It allows interaction with the Windows operating system through
scripts. Common uses include displaying messages, running programs, and
accessing script arguments.

WScript is automatically available in VBScript files run with
Windows Script Host. It serves as the main interface between scripts and the
Windows environment. This tutorial covers essential WScript methods
with practical examples to demonstrate their usage.

## Windows Method Overview

The WScript object provides several key methods for script
execution. These include Echo for output, Sleep for
pausing, and CreateObject for COM object creation. Properties like
Arguments access script parameters.

WScript methods enable interaction with the Windows environment.
They handle script execution, timing, and object creation. Understanding these
methods is essential for effective Windows scripting. The examples below
demonstrate common use cases.

## Displaying Messages with Echo

The Echo method displays text in a message box or command line.
This example shows basic message output. It's the simplest way to provide script
feedback. Echo accepts multiple arguments separated by commas.

basic_echo.vbs
  

WScript.Echo "Hello, Windows Script Host!"
WScript.Echo "Current time is:", Time
WScript.Echo "Script name:", WScript.ScriptName

The script displays three messages using Echo. The first shows a
simple string. The second combines a string with the Time
function. The third uses the ScriptName property of
WScript.

## Pausing Script Execution

The Sleep method pauses script execution for a specified time.
This example demonstrates timed delays. Sleep is useful for pacing operations or
creating timeouts. The duration is specified in milliseconds.

script_sleep.vbs
  

WScript.Echo "Starting countdown..."
WScript.Sleep 1000 ' 1 second
WScript.Echo "3"
WScript.Sleep 1000
WScript.Echo "2"
WScript.Sleep 1000
WScript.Echo "1"
WScript.Echo "Liftoff!"

The script creates a simple countdown with one-second pauses. Each
Sleep call stops execution for 1000 milliseconds. This shows how
to control script timing for user feedback or process pacing.

## Accessing Script Arguments

The Arguments collection provides access to command-line
parameters. This example shows how to process script arguments. It demonstrates
counting and displaying passed parameters. Arguments are accessed by index.

script_arguments.vbs
  

Set args = WScript.Arguments
WScript.Echo "Number of arguments:", args.Count

For i = 0 To args.Count - 1
    WScript.Echo "Argument", i + 1, ":", args(i)
Next

The script first displays the total argument count. Then it loops through all
arguments using a For loop. Each argument's position and value are
displayed. This is useful for parameter-driven scripts.

## Creating COM Objects

The CreateObject method instantiates COM objects for automation.
This example creates a FileSystemObject. COM objects extend script capabilities
beyond basic functions. Many Windows components are accessible via COM.

create_object.vbs
  

Set fso = WScript.CreateObject("Scripting.FileSystemObject")
Set file = fso.CreateTextFile("test.txt", True)
file.WriteLine "This is a test file."
file.Close

WScript.Echo "File created successfully."

The script creates a FileSystemObject then uses it to make a text file. The
CreateObject method takes the COM class name as parameter. This
demonstrates integrating with Windows components through scripting.

## Running External Programs

The Run method executes external programs from a script. This
example launches Notepad. Run can start any executable with
optional parameters. It returns the process exit code.

run_program.vbs
  

returnCode = WScript.Run("notepad.exe", 1, True)

If returnCode = 0 Then
    WScript.Echo "Notepad closed normally."
Else
    WScript.Echo "Notepad closed with error:", returnCode
End If

The script runs Notepad and waits for it to close. The second parameter (1)
makes the window visible. The third parameter (True) makes the script wait. The
exit code is captured and evaluated after Notepad closes.

## Source

[WScript Object Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/aew9yb99(v=vs.84))

In this article, we have explored the Windows Method in VBScript through the
WScript object. From simple message display to program execution,
these examples demonstrate essential scripting techniques. With this knowledge,
you can create more powerful and interactive Windows scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).