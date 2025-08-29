+++
title = "VBScript Strings"
date = 2025-08-29T20:15:33.235+01:00
draft = false
description = "VBScript strings tutorial shows how to work with strings in VBScript with examples using WScript.Echo."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Strings

last modified February 19, 2025

In this article, we will learn how to work with strings in VBScript. Strings are
sequences of characters used to represent text. We will use WScript.Echo
to output results and run the scripts using cscript.

## Hello message

The first example demonstrates how to create and display a string.

simple_string.vbs
  

Dim message
message = "Hello there!"

WScript.Echo message

This example declares a string variable message and assigns it the
value "Hello there!". The string is then displayed using WScript.Echo.

## Concatenating Strings

You can concatenate strings using the &amp; operator.

concatenate_strings.vbs
  

Dim firstName, lastName, fullName
firstName = "John"
lastName = "Doe"
fullName = firstName &amp; " " &amp; lastName

WScript.Echo fullName

This example concatenates two strings firstName and lastName
to create a full name.

## String Length

You can determine the length of a string using the Len function.

string_length.vbs
  

Dim text
text = "VBScript"

WScript.Echo "Length: " &amp; Len(text)

This example calculates and displays the length of the string text.

## Substrings

You can extract a substring from a string using the Mid function.

substring.vbs
  

Dim sentence, substring
sentence = "The quick brown fox"
substring = Mid(sentence, 5, 5)

WScript.Echo "Substring: " &amp; substring

This example extracts a substring starting at position 5 with a length of 5
characters.

## String Comparison

You can compare strings using the = operator or the StrComp
function.

string_comparison.vbs
  

Dim str1, str2
str1 = "apple"
str2 = "Apple"

If StrComp(str1, str2, vbTextCompare) = 0 Then
    WScript.Echo "Strings are equal."
Else
    WScript.Echo "Strings are not equal."
End If

This example compares two strings case-insensitively using StrComp.

## String Replacement

You can replace parts of a string using the Replace function.

string_replacement.vbs
  

Dim original, replaced
original = "I like apples."
replaced = Replace(original, "apples", "oranges")

WScript.Echo replaced

This example replaces the word "apples" with "oranges" in the string
original.

## String Splitting

You can split a string into an array using the Split function.

string_splitting.vbs
  

Dim data, parts, part
data = "apple,banana,cherry"
parts = Split(data, ",")

For Each part In parts
    WScript.Echo part
Next

This example splits the string data into an array using a comma as
the delimiter and outputs each part.

## String Trimming

You can remove leading and trailing spaces from a string using the Trim,
LTrim, and RTrim functions.

string_trimming.vbs
  

Dim untrimmed, trimmed
untrimmed = "   VBScript   "
trimmed = Trim(untrimmed)

WScript.Echo "Trimmed: '" &amp; trimmed &amp; "'"

This example trims leading and trailing spaces from the string untrimmed.

## String Case Conversion

You can convert a string to uppercase or lowercase using the UCase
and LCase functions.

string_case_conversion.vbs
  

Dim mixedCase, upperCase, lowerCase
mixedCase = "VBScript"
upperCase = UCase(mixedCase)
lowerCase = LCase(mixedCase)

WScript.Echo "Uppercase: " &amp; upperCase
WScript.Echo "Lowercase: " &amp; lowerCase

This example converts the string mixedCase to uppercase and lowercase.

## String Searching

You can search for a substring within a string using the InStr
function.

string_searching.vbs
  

Dim mainString, searchString, position
mainString = "The quick brown fox"
searchString = "brown"
position = InStr(mainString, searchString)

WScript.Echo "Position: " &amp; position

This example searches for the substring "brown" within the string
mainString and returns its position.

In this article, we explored how to work with strings in VBScript. We covered
creating strings, concatenation, length, substrings, comparison, replacement,
splitting, trimming, case conversion, and searching. Strings are fundamental to
many programming tasks, and VBScript provides a rich set of functions to
manipulate them.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all VBScript tutorials](/vbscript/).