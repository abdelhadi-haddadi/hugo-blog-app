+++
title = "VBScript FindComputer Method"
date = 2025-08-29T20:15:26.586+01:00
draft = false
description = "Learn about VBScript FindComputer method, including network discovery, WMI queries, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript FindComputer Method

last modified April 9, 2025

The FindComputer method in VBScript is part of the
IWshNetwork interface. It searches for computers on the network
using their names. This method is useful for network administration and
automation tasks. It returns a boolean indicating if the computer was found.

FindComputer works by sending a network broadcast request. It can
detect computers in the same workgroup or domain. The method is synchronous and
may take several seconds to complete. This tutorial covers FindComputer
with practical examples.

## FindComputer Method Overview

The FindComputer method takes one parameter: the computer name to
search for. It returns True if the computer is found, False otherwise. The
method is available through the WScript.Network object in VBScript.

Key features include simple network discovery and basic computer verification.
It doesn't provide detailed information about found computers. The method works
best in Windows domain environments. Understanding this method helps create
network-aware scripts.

## Basic Computer Search

This example demonstrates the simplest use of FindComputer to check
if a computer exists on the network. It shows how to initialize the network
object and perform a basic search. The result is displayed to the user.

basic_findcomputer.vbs
  

Set network = CreateObject("WScript.Network")
computerName = "SERVER01"
found = network.FindComputer(computerName)

If found Then
    WScript.Echo computerName &amp; " was found on the network."
Else
    WScript.Echo computerName &amp; " was not found."
End If

Set network = Nothing

The script creates a WScript.Network object and calls
FindComputer for "SERVER01". The result is stored in the found
variable. The script then displays whether the computer was located or not.

## Searching Multiple Computers

This example shows how to check for multiple computers in sequence. It
demonstrates using FindComputer in a loop. The script tests each
computer name in an array and reports results.

multiple_computers.vbs
  

Set network = CreateObject("WScript.Network")
computers = Array("WS01", "WS02", "WS03", "SERVER01")

For Each comp In computers
    If network.FindComputer(comp) Then
        WScript.Echo comp &amp; " is online."
    Else
        WScript.Echo comp &amp; " is offline or doesn't exist."
    End If
Next

Set network = Nothing

The script tests each computer in the array using FindComputer. It
provides status feedback for each machine. This approach is useful for basic
network inventory checks. The method may take time for each search.

## Validating Computer Before Connection

This example demonstrates using FindComputer before attempting a
network connection. It verifies a computer exists before mapping a drive. This
can prevent errors in automated scripts.

pre_connection_check.vbs
  

Set network = CreateObject("WScript.Network")
targetComputer = "FILESERVER"

If network.FindComputer(targetComputer) Then
    network.MapNetworkDrive "Z:", "\\" &amp; targetComputer &amp; "\Shared"
    WScript.Echo "Drive mapped successfully."
Else
    WScript.Echo "Cannot map drive - computer not found."
End If

Set network = Nothing

The script checks if "FILESERVER" exists before mapping a drive. This prevents
errors from attempting to connect to unavailable computers. The method adds
robustness to network operations in scripts.

## Searching with User Input

This example shows interactive use of FindComputer with user input.
It prompts for a computer name and reports if it's found. This demonstrates
script flexibility for different scenarios.

interactive_search.vbs
  

Set network = CreateObject("WScript.Network")
computerName = InputBox("Enter computer name to search:")

If computerName &lt;&gt; "" Then
    If network.FindComputer(computerName) Then
        MsgBox computerName &amp; " was found on the network."
    Else
        MsgBox computerName &amp; " was not found."
    End If
End If

Set network = Nothing

The script uses InputBox to get the target computer name. It then
calls FindComputer with the provided name. The result is shown in a
message box. This approach works well for interactive tools.

## Logging Search Results

This example extends FindComputer with result logging. It searches
for computers and writes findings to a text file. This demonstrates practical
application for network audits.

logging_results.vbs
  

Set network = CreateObject("WScript.Network")
Set fso = CreateObject("Scripting.FileSystemObject")
logFile = "C:\Temp\ComputerSearch.log"

computers = Array("DC01", "PRINTSERVER", "SQLSERVER", "WS100")

Set file = fso.OpenTextFile(logFile, 8, True) ' 8 = ForAppending

For Each comp In computers
    found = network.FindComputer(comp)
    file.WriteLine Now() &amp; " - " &amp; comp &amp; ": " &amp; IIf(found, "Found", "Not Found")
Next

file.Close
WScript.Echo "Search results logged to " &amp; logFile

Set file = Nothing
Set fso = Nothing
Set network = Nothing

The script searches multiple computers and logs results with timestamps. It uses
FileSystemObject for file operations. This creates an audit trail
of network computer availability. The approach is useful for maintenance scripts.

## Source

[WScript.Network Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/a4a4at6y(v=vs.84))

In this article, we have explored the FindComputer method in VBScript,
covering its usage and practical applications. From simple searches to logged
network audits, these examples demonstrate computer discovery techniques. With
this knowledge, you can enhance your network administration scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).