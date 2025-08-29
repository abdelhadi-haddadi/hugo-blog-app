+++
title = "VBScript Help Method"
date = 2025-08-29T20:15:27.704+01:00
draft = false
description = "Learn about VBScript Help method, including context-sensitive help, command-line help, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Help Method

last modified April 9, 2025

The Help method in VBScript is part of the Windows Script Host
(WSH) object model. It displays help information for a script when executed with
the /? parameter. This method provides a standard way to implement command-line
help in VBScript files. It's commonly used to document script usage and options.

Help allows script authors to provide context-sensitive help to
users. When called, it displays the help text and exits the script. This
tutorial covers Help with practical examples to demonstrate its
usage in various scenarios.

## Help Method Overview

The Help method is available through the WScript
object in VBScript. It takes a string parameter containing the help text to
display. When invoked, it shows the help message and terminates script
execution. This provides a consistent help experience across scripts.

Key features include automatic command-line parameter handling and standardized
help display. The method is triggered by the /? switch when running the script.
Understanding this method helps create user-friendly command-line scripts. It's
particularly useful for administrative scripts and tools.

## Basic Help Implementation

This example demonstrates the simplest use of Help to display basic
script information. It shows how to check for the help request and respond
appropriately. The script exits after displaying the help text.

basic_help.vbs
  

If WScript.Arguments.Named.Exists("?") Then
    helpText = "Usage: basic_help.vbs [options]" &amp; vbCrLf &amp; _
               "Options:" &amp; vbCrLf &amp; _
               "/param1   First parameter" &amp; vbCrLf &amp; _
               "/param2   Second parameter"
    WScript.Echo helpText
    WScript.Quit
End If

' Main script logic would go here
WScript.Echo "Script is running..."

The script checks for the /? parameter using WScript.Arguments.Named.
If found, it displays the help text and exits. The help text includes usage
instructions and parameter descriptions. Without the help flag, normal execution
continues.

## Advanced Help with Sections

This example shows a more sophisticated help implementation with multiple
sections. It demonstrates formatting help text for better readability. The help
includes description, usage, and examples sections.

advanced_help.vbs
  

If WScript.Arguments.Named.Exists("?") Then
    helpText = "FILE PROCESSOR SCRIPT" &amp; vbCrLf &amp; vbCrLf &amp; _
               "Description:" &amp; vbCrLf &amp; _
               "  Processes input files according to specified parameters" &amp; vbCrLf &amp; vbCrLf &amp; _
               "Usage:" &amp; vbCrLf &amp; _
               "  advanced_help.vbs /input:file /output:dir [/verbose]" &amp; vbCrLf &amp; vbCrLf &amp; _
               "Parameters:" &amp; vbCrLf &amp; _
               "  /input    Specifies input file path" &amp; vbCrLf &amp; _
               "  /output   Specifies output directory" &amp; vbCrLf &amp; _
               "  /verbose  Enables detailed logging"
    
    WScript.Echo helpText
    WScript.Quit
End If

' Main script processing would go here

The help text is organized into clear sections with proper spacing. Each
parameter gets its own line with a description. This format makes the help
information easier to read and understand. The script exits after displaying the
help message.

## Context-Sensitive Help

This example demonstrates context-sensitive help that changes based on provided
parameters. It shows different help messages for different help requests. The
script tailors the help output to what the user might need.

context_help.vbs
  

If WScript.Arguments.Named.Exists("?") Then
    If WScript.Arguments.Named.Exists("basic") Then
        helpText = "Basic Usage:" &amp; vbCrLf &amp; _
                   "context_help.vbs /input:file"
    ElseIf WScript.Arguments.Named.Exists("advanced") Then
        helpText = "Advanced Usage:" &amp; vbCrLf &amp; _
                   "context_help.vbs /input:file /output:dir" &amp; vbCrLf &amp; _
                   "/mode:fast|normal|thorough"
    Else
        helpText = "General Help:" &amp; vbCrLf &amp; _
                   "Use /?basic for basic help" &amp; vbCrLf &amp; _
                   "Use /?advanced for advanced options"
    End If
    
    WScript.Echo helpText
    WScript.Quit
End If

' Main script processing

The script checks for additional parameters after the help request. Different
help messages are shown based on these parameters. This allows for tiered help
documentation within a single script. Users can request more detailed help as
needed.

## Help with Example Usage

This example includes practical usage examples in the help text. It demonstrates
how to show sample command lines that users can copy and modify. Examples help
users understand how to apply the parameters.

example_help.vbs
  

If WScript.Arguments.Named.Exists("?") Then
    helpText = "DATABASE BACKUP SCRIPT" &amp; vbCrLf &amp; vbCrLf &amp; _
               "Usage:" &amp; vbCrLf &amp; _
               "example_help.vbs /server:name /db:database [/compress]" &amp; vbCrLf &amp; vbCrLf &amp; _
               "Examples:" &amp; vbCrLf &amp; _
               "1. Basic backup:" &amp; vbCrLf &amp; _
               "   example_help.vbs /server:SQL01 /db:Customers" &amp; vbCrLf &amp; _
               "2. Compressed backup:" &amp; vbCrLf &amp; _
               "   example_help.vbs /server:SQL02 /db:Orders /compress"
    
    WScript.Echo helpText
    WScript.Quit
End If

' Database backup logic would go here

The help text includes both parameter descriptions and concrete examples. Each
example shows a complete command line with different options. This approach helps
users quickly understand how to use the script. The examples demonstrate common
usage patterns.

## Localized Help Text

This example shows how to implement localized help text based on system
settings. It demonstrates checking the system locale and displaying appropriate
help. This technique is useful for multilingual script distribution.

localized_help.vbs
  

Set shell = CreateObject("WScript.Shell")
locale = shell.RegRead("HKCU\Control Panel\International\Locale")

If WScript.Arguments.Named.Exists("?") Then
    If Left(locale, 4) = "0409" Then ' English
        helpText = "Usage: script.vbs /param:value"
    ElseIf Left(locale, 4) = "040C" Then ' French
        helpText = "Utilisation: script.vbs /param:valeur"
    Else ' Default to English
        helpText = "Usage: script.vps /param:value"
    End If
    
    WScript.Echo helpText
    WScript.Quit
End If

' Main script processing
Set shell = Nothing

The script reads the system locale from the registry. Based on the locale ID, it
displays help text in the appropriate language. This provides a better user
experience for non-English speakers. The example shows English and French
variants.

## Source

[WSH Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/d5wf67tc(v=vs.84))

In this article, we have explored the Help method in VBScript,
covering its usage and practical applications. From basic help implementations
to advanced context-sensitive help, these examples demonstrate effective script
documentation. With this knowledge, you can create more user-friendly command-
line scripts with comprehensive help systems.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).