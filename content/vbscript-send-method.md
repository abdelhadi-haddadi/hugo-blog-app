+++
title = "VBScript Send Method"
date = 2025-08-29T20:15:36.618+01:00
draft = false
description = "Learn about VBScript Send method, including keystroke simulation, automation tasks, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Send Method

last modified April 9, 2025

The Send method in VBScript is part of the WScript.Shell
object. It simulates keystrokes by sending them to the active window. This method
is commonly used for automation tasks and interacting with applications. It can
send individual keys or combinations with modifiers like Ctrl or Alt.

Send is powerful but requires careful use as it affects the active
window. It's often used with AppActivate to target specific windows.
This tutorial covers Send with practical examples to demonstrate its
usage in various scenarios.

## Send Method Overview

The Send method takes a string parameter representing keystrokes to
send. Special keys are represented by codes in curly braces (e.g., {ENTER}). The
method sends keystrokes to the window that currently has focus. It's available
through the WScript.Shell object in VBScript.

Key features include support for modifier keys (Ctrl, Alt, Shift) and special
keys. The method doesn't wait for the target application to process the keys.
Understanding Send helps create automation scripts for repetitive
tasks.

## Basic Keystroke Simulation

This example demonstrates the simplest use of Send to type text.
It shows how to send basic alphanumeric characters to the active window. The
script types "Hello World" followed by an Enter key press.

basic_send.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Send "Hello World"
WshShell.Send "{ENTER}"

Set WshShell = Nothing

The script creates a WScript.Shell object and calls Send
twice. First it sends the text "Hello World", then the Enter key. The {ENTER}
special code represents the Enter key. This simulates typing and pressing Enter.

## Using Modifier Keys

This example shows how to send key combinations with modifier keys like Ctrl and
Alt. It demonstrates the syntax for combining modifiers with other keys. The
script sends Ctrl+C (copy) and Alt+F4 (close window) commands.

modifier_keys.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Send "^c"  ' Ctrl+C
WScript.Sleep 1000  ' Wait 1 second
WshShell.Send "%{F4}" ' Alt+F4

Set WshShell = Nothing

The script uses ^ for Ctrl and % for Alt in the key combinations. The sleep
command adds a delay between actions. Special characters must be enclosed in
braces. This shows how to automate common keyboard shortcuts in scripts.

## Sending Special Keys

Send can simulate pressing special keys like function keys, arrows,
or navigation keys. This example demonstrates sending various special keys. The
script sends Tab, Arrow keys, and function keys to navigate interfaces.

special_keys.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Send "{TAB}"
WshShell.Send "{RIGHT}"
WshShell.Send "{F5}"
WshShell.Send "{PGDN}"

Set WshShell = Nothing

Each special key is enclosed in curly braces with its name. TAB moves focus,
RIGHT moves cursor right, F5 refreshes, and PGDN scrolls down. This shows how to
automate navigation without mouse interaction in applications.

## Targeting Specific Applications

This example combines Send with AppActivate to target
a specific application window. It demonstrates proper window targeting before
sending keys. The script activates Notepad before sending text.

target_app.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "notepad"
WScript.Sleep 500 ' Wait for Notepad to launch
WshShell.AppActivate "Notepad"
WshShell.Send "Automated text entry"
WshShell.Send "{ENTER}Second line"

Set WshShell = Nothing

The script launches Notepad, waits briefly, then activates its window. After
activation, it sends text and Enter key. AppActivate ensures keys
go to the correct window. This pattern is essential for reliable automation.

## Complex Automation Sequence

This example shows a more complex automation sequence using multiple Send
calls with delays. It demonstrates typing, navigation, and key combinations in
sequence. The script automates a simple data entry task.

complex_sequence.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.Run "notepad"
WScript.Sleep 1000
WshShell.AppActivate "Notepad"

WshShell.Send "Name: John Doe{TAB}"
WScript.Sleep 200
WshShell.Send "Age: 30{TAB}"
WScript.Sleep 200
WshShell.Send "^s" ' Ctrl+S to save
WScript.Sleep 500
WshShell.Send "user_data.txt{ENTER}"

Set WshShell = Nothing

The script fills a form-like interface in Notepad with field navigation. It uses
TAB to move between fields and includes delays for reliability. Finally, it saves
the file with Ctrl+S. This shows realistic automation with timing considerations.

## Source

[WScript.Shell Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/a72y2t11(v=vs.84))

In this article, we have explored the Send method in VBScript,
covering its usage and practical applications. From basic typing to complex
automation sequences, these examples demonstrate keyboard simulation. With this
knowledge, you can create powerful automation scripts for Windows.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).