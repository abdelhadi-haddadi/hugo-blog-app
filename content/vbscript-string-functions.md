+++
title = "VBScript String Functions"
date = 2025-08-29T20:15:32.109+01:00
draft = false
description = "Learn about VBScript string functions, including Len, InStr, Mid, Replace, and more. Understand how to manipulate strings effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript String Functions

last modified April 4, 2025

VBScript provides a rich set of string manipulation functions that allow you to 
work with text data efficiently. These functions enable operations like searching, 
extracting, comparing, and modifying strings. This tutorial covers essential 
VBScript string functions with practical examples to demonstrate their usage.

## VBScript String Functions Overview

String functions in VBScript operate on string data to perform various text 
processing tasks. Common operations include finding string length, searching for 
substrings, extracting parts of strings, and case conversion. These functions 
are essential for text processing in scripts.

VBScript strings are 1-based, meaning the first character is at position 1. Most 
string functions are case-insensitive by default but can be made case-sensitive. 
Understanding these functions is crucial for effective string manipulation.

## Len Function

The Len function returns the number of characters in a string. It's 
useful for validating input length or processing strings character by character. 
The function takes a single string argument and returns an integer.

len_function.vbs
  

Dim sampleText, textLength
sampleText = "Hello, World!"
textLength = Len(sampleText)

WScript.Echo "The text '" &amp; sampleText &amp; "' contains " &amp; textLength &amp; " characters."

' Example with empty string
WScript.Echo "Empty string length: " &amp; Len("")

' Example with spaces
WScript.Echo "Spaces length: " &amp; Len("   ")

This example demonstrates the Len function with different string 
inputs. Notice how it counts all characters, including spaces and punctuation. 
The empty string returns 0, and strings containing only spaces return the count 
of spaces.

## InStr Function

The InStr function searches for a substring within another string 
and returns its position. It can perform case-sensitive or case-insensitive 
searches. The function takes up to four arguments: start position, string to 
search, substring to find, and comparison method.

instr_function.vbs
  

Dim mainText, searchText, position
mainText = "The quick brown fox jumps over the lazy dog"
searchText = "fox"

position = InStr(1, mainText, searchText, vbTextCompare)
WScript.Echo "'fox' found at position: " &amp; position

' Case-sensitive search
position = InStr(1, "Hello World", "world", vbBinaryCompare)
WScript.Echo "Case-sensitive search result: " &amp; position

' Substring not found
position = InStr(1, mainText, "cat", vbTextCompare)
WScript.Echo "Search for 'cat' returns: " &amp; position

This example shows different search scenarios with InStr. The first 
search finds "fox" in the sentence. The second demonstrates case-sensitive 
search that fails. The last shows the return value (0) when the substring isn't 
found.

## Mid Function

The Mid function extracts a substring from a string, starting at a 
specified position for a given length. It's useful for parsing fixed-format 
strings or extracting specific parts. The function takes three arguments: the 
string, start position, and length.

mid_function.vbs
  

Dim fullText, extracted
fullText = "VBScript String Functions"

' Extract "Script"
extracted = Mid(fullText, 3, 6)
WScript.Echo "Extracted: " &amp; extracted

' Extract from position to end (omit length)
extracted = Mid(fullText, 11)
WScript.Echo "Rest of string: " &amp; extracted

' Practical example - get file extension
Dim fileName, extPos, extension
fileName = "document.txt"
extPos = InStrRev(fileName, ".")
extension = Mid(fileName, extPos + 1)
WScript.Echo "File extension: " &amp; extension

This example demonstrates various uses of Mid. The first extracts a 
specific portion. The second shows how omitting the length returns the remainder 
of the string. The practical example combines InStrRev with 
Mid to extract a file extension.

## Replace Function

The Replace function substitutes all occurrences of a substring 
with another string. It's powerful for text transformations and cleanup. The 
function takes three required arguments: the string, substring to replace, and 
replacement text, plus optional count and comparison arguments.

replace_function.vbs
  

Dim originalText, modifiedText
originalText = "I like apples, apples are my favorite fruit."

' Replace all occurrences
modifiedText = Replace(originalText, "apples", "oranges")
WScript.Echo modifiedText

' Replace first occurrence only
modifiedText = Replace(originalText, "apples", "oranges", 1, 1)
WScript.Echo "First replacement: " &amp; modifiedText

' Case-sensitive replacement
modifiedText = Replace("Hello World", "hello", "Hi", 1, , vbBinaryCompare)
WScript.Echo "Case-sensitive replace: " &amp; modifiedText

This example shows different replacement scenarios. The first replaces all 
occurrences. The second demonstrates limiting replacements. The last shows a 
case-sensitive replacement that fails because the case doesn't match.

## String Manipulation with UCase and LCase

The UCase and LCase functions convert strings to 
uppercase and lowercase respectively. These are useful for case normalization 
before comparisons or for formatting output. Both functions take a single string 
argument.

case_functions.vbs
  

Dim mixedCase, upperCase, lowerCase
mixedCase = "VBScript String Functions"

upperCase = UCase(mixedCase)
lowerCase = LCase(mixedCase)

WScript.Echo "Original: " &amp; mixedCase
WScript.Echo "Uppercase: " &amp; upperCase
WScript.Echo "Lowercase: " &amp; lowerCase

' Practical example - case-insensitive comparison
Dim userInput = "YES"
If UCase(userInput) = "YES" Then
    WScript.Echo "User agreed"
Else
    WScript.Echo "User did not agree"
End If

This example demonstrates basic case conversion and a practical use case for 
case-insensitive comparison. The comparison example shows how to normalize user 
input before checking its value, making the check case-insensitive.

## Source

[VBScript String Functions Documentation](https://learn.microsoft.com/en-us/previous-versions//3ca8tfek(v=vs.85))

In this article, we have explored the essential string functions in VBScript, 
covering operations from basic length checks to advanced search and replace. 
These functions form the foundation of text processing in VBScript. With these 
tools, you can effectively manipulate and analyze string data in your scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).