+++
title = "VBScript Attributes Property"
date = 2025-08-29T20:14:53.013+01:00
draft = false
description = "Learn about VBScript Attributes property, including file attribute constants, attribute checking, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Attributes Property

last modified April 9, 2025

The Attributes property in VBScript is part of the
FileSystemObject object model. It represents the attributes of a
file or folder, such as read-only, hidden, or system status. This property
allows reading and modifying file/folder attributes programmatically.

Attributes are represented as numeric values using bitmask constants. You can
check, set, or remove specific attributes using bitwise operations. This
tutorial covers the Attributes property with practical examples to
demonstrate its usage.

## Attributes Property Overview

The Attributes property is available for both File and
Folder objects. It returns or sets an integer representing the
current attributes. Each attribute corresponds to a specific bit in this integer
value.

Common attribute constants include Normal (0), ReadOnly (1), Hidden (2), System
(4), and Archive (32). Attributes can be combined using bitwise OR operations.
Understanding these constants is essential for working with file attributes.

## Checking File Attributes

This example demonstrates how to check a file's attributes. We'll examine
whether a file is read-only, hidden, or has other attributes set. The script
uses bitwise AND operations to test specific attributes.

check_attributes.vbs
  

Const ReadOnly = 1
Const Hidden = 2
Const System = 4
Const Archive = 32

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\test.txt")

If (file.Attributes And ReadOnly) = ReadOnly Then
    WScript.Echo "File is read-only"
End If

If (file.Attributes And Hidden) = Hidden Then
    WScript.Echo "File is hidden"
End If

Set file = Nothing
Set fso = Nothing

The script first defines attribute constants for clarity. It then checks the
file's attributes using bitwise operations. The AND operation isolates specific
bits to test whether they're set. This approach allows checking multiple
attributes independently.

## Setting File Attributes

This example shows how to modify a file's attributes. We'll set the read-only
and hidden attributes while preserving other existing attributes. The script
demonstrates proper bitwise operations for attribute manipulation.

set_attributes.vbs
  

Const ReadOnly = 1
Const Hidden = 2

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\test.txt")

' Set read-only and hidden attributes while preserving others
file.Attributes = file.Attributes Or ReadOnly Or Hidden

WScript.Echo "Attributes set successfully"

Set file = Nothing
Set fso = Nothing

The script uses bitwise OR to add attributes without affecting others. This
approach ensures existing attributes remain unchanged. The operation combines the
current attributes with the new ones we want to set.

## Removing File Attributes

This example demonstrates removing specific attributes from a file. We'll remove
the read-only attribute while keeping other attributes intact. The script uses
bitwise NOT and AND operations for precise attribute control.

remove_attributes.vbs
  

Const ReadOnly = 1

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\test.txt")

' Remove read-only attribute while preserving others
file.Attributes = file.Attributes And (Not ReadOnly)

WScript.Echo "Read-only attribute removed"

Set file = Nothing
Set fso = Nothing

The script first inverts the read-only constant using NOT. Then it ANDs this
value with the current attributes. This operation clears only the read-only bit
while leaving other attribute bits unchanged.

## Listing All Attributes

This example shows how to list all attributes set on a file. It checks each
possible attribute and reports which ones are active. The script provides a
comprehensive view of a file's attributes.

list_attributes.vbs
  

Const Normal = 0
Const ReadOnly = 1
Const Hidden = 2
Const System = 4
Const Volume = 8
Const Directory = 16
Const Archive = 32
Const Alias = 1024
Const Compressed = 2048

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\test.txt")

WScript.Echo "File attributes for: " &amp; file.Name

If file.Attributes = Normal Then
    WScript.Echo "Normal (no attributes set)"
Else
    If (file.Attributes And ReadOnly) = ReadOnly Then WScript.Echo "ReadOnly"
    If (file.Attributes And Hidden) = Hidden Then WScript.Echo "Hidden"
    If (file.Attributes And System) = System Then WScript.Echo "System"
    ' Additional attribute checks would follow the same pattern
End If

Set file = Nothing
Set fso = Nothing

The script defines all standard attribute constants for completeness. It then
checks each attribute individually against the file's attributes. This approach
provides a detailed breakdown of which attributes are currently set.

## Combining Multiple Attribute Operations

This advanced example demonstrates complex attribute manipulation. We'll set
some attributes while clearing others in a single operation. The script shows
how to perform multiple attribute changes efficiently.

combined_attributes.vbs
  

Const ReadOnly = 1
Const Hidden = 2
Const Archive = 32

Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.GetFile("C:\test.txt")

' Set Archive, remove ReadOnly, preserve Hidden if set
file.Attributes = (file.Attributes And (Not ReadOnly)) Or Archive

WScript.Echo "Attributes updated:"
WScript.Echo "Archive set, ReadOnly cleared, Hidden preserved"

Set file = Nothing
Set fso = Nothing

The script performs multiple attribute operations in one statement. It clears the
read-only attribute, sets the archive attribute, and preserves the hidden
attribute if it was set. This demonstrates efficient attribute management.

## Source

[FileSystemObject Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/1ft05kf3(v=vs.84))

In this article, we have explored the Attributes property in
VBScript, covering its usage and practical applications. From basic attribute
checking to complex manipulation, these examples demonstrate robust file
attribute management. With this knowledge, you can enhance your file handling
scripts with precise attribute control.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).