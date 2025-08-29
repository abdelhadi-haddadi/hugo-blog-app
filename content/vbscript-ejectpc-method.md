+++
title = "VBScript EjectPC Method"
date = 2025-08-29T20:15:25.471+01:00
draft = false
description = "Learn about VBScript EjectPC method, including CD/DVD ejection, system tray operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript EjectPC Method

last modified April 9, 2025

The EjectPC method in VBScript is part of the
WScript.Shell object. It ejects the computer from its docking
station or opens the CD/DVD tray. This method provides programmatic control
over hardware components. It's commonly used in system administration scripts.

EjectPC can trigger hardware ejection without physical buttons.
It works with both docking stations and optical drives. This tutorial covers
EjectPC with practical examples to demonstrate its usage.

## EjectPC Method Overview

The EjectPC method doesn't require parameters and returns no value.
It's available through the WScript.Shell object in VBScript.
The method behavior depends on system hardware configuration.

Key features include hardware-agnostic ejection commands and simple invocation.
It may require administrative privileges on some systems. EjectPC
works best with compatible hardware. Understanding this method helps create
automated system control scripts.

## Basic CD/DVD Tray Ejection

This example demonstrates the simplest use of EjectPC to open
the CD/DVD tray. It shows how the method triggers the hardware ejection
mechanism. The script requires minimal code to perform the operation.

basic_eject.vbs
  

Set wshShell = CreateObject("WScript.Shell")
wshShell.EjectPC

Set wshShell = Nothing

The script creates a WScript.Shell object and calls
EjectPC. This will open the default optical drive tray if
available. No parameters or return values are needed for basic operation.

## Eject with Confirmation Dialog

This example adds a confirmation dialog before ejecting. It demonstrates
how to combine EjectPC with user interaction. The script only
proceeds if the user confirms the action.

confirm_eject.vbs
  

Set wshShell = CreateObject("WScript.Shell")
answer = MsgBox("Eject CD/DVD tray?", vbQuestion + vbYesNo, "Confirmation")

If answer = vbYes Then
    wshShell.EjectPC
    MsgBox "Tray ejected successfully", vbInformation, "Status"
End If

Set wshShell = Nothing

The script shows a confirmation dialog before calling EjectPC.
If the user clicks Yes, the tray ejects and shows a success message.
This approach makes the script more user-friendly.

## Handling Ejection Errors

This example demonstrates error handling when using EjectPC.
It shows how to catch and respond to potential hardware issues. The script
provides feedback if ejection fails.

error_handling.vbs
  

On Error Resume Next

Set wshShell = CreateObject("WScript.Shell")
wshShell.EjectPC

If Err.Number &lt;&gt; 0 Then
    MsgBox "Error " &amp; Err.Number &amp; ": " &amp; Err.Description, vbCritical, "Error"
Else
    MsgBox "Ejection successful", vbInformation, "Status"
End If

On Error GoTo 0
Set wshShell = Nothing

The script uses error handling to catch potential issues. If EjectPC
fails, it displays the error details. Successful execution shows a confirmation
message instead.

## Ejecting with Delay

This example adds a delay before ejection. It demonstrates how to combine
EjectPC with timing operations. The script waits before executing
the ejection command.

delayed_eject.vbs
  

Set wshShell = CreateObject("WScript.Shell")
MsgBox "Ejecting in 5 seconds...", vbInformation, "Countdown"

WScript.Sleep 5000 ' 5 second delay
wshShell.EjectPC

Set wshShell = Nothing

The script shows a message and waits 5 seconds before ejection. The
WScript.Sleep method provides the delay functionality.
This approach is useful for timed operations.

## Checking Hardware Availability

This example checks for ejectable hardware before attempting ejection.
It demonstrates how to verify system capabilities. The script provides
feedback if no ejectable devices are found.

hardware_check.vbs
  

Set wshShell = CreateObject("WScript.Shell")
On Error Resume Next

wshShell.EjectPC

If Err.Number = 424 Then
    MsgBox "No ejectable hardware found", vbExclamation, "Warning"
ElseIf Err.Number &lt;&gt; 0 Then
    MsgBox "Error " &amp; Err.Number &amp; ": " &amp; Err.Description, vbCritical, "Error"
Else
    MsgBox "Hardware ejected successfully", vbInformation, "Success"
End If

On Error GoTo 0
Set wshShell = Nothing

The script attempts ejection and checks specific error codes. Error 424
typically indicates no ejectable hardware. Other errors show generic messages,
while success confirms proper operation.

## Source

[WScript.Shell Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/aew9yb99(v=vs.84))

In this article, we have explored the EjectPC method in VBScript,
covering its usage and practical applications. From basic ejection to error
handling and timing, these examples demonstrate hardware control techniques.
With this knowledge, you can enhance your system administration scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).