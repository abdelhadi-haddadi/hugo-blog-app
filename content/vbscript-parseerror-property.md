+++
title = "VBScript parseError Property"
date = 2025-08-29T20:14:47.449+01:00
draft = false
description = "Learn about VBScript parseError property, including error detection, debugging, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript parseError Property

last modified April 9, 2025

The parseError property in VBScript provides information about 
syntax errors in XML documents. It returns an object containing details about 
the last parsing error. This property is available when working with the 
Microsoft XML DOM objects. It's essential for robust XML processing.

parseError helps identify line numbers, error codes, and error 
descriptions. It enables developers to handle XML parsing issues gracefully. 
This tutorial covers parseError with practical examples to 
demonstrate its usage.

## parseError Property Overview

The parseError property returns an IXMLDOMParseError object when 
an XML parsing error occurs. It contains multiple properties that describe 
the error. These include errorCode, line, linepos, and reason.

Key properties include errorCode (numeric error identifier) and reason (text 
description). The line and linepos properties pinpoint the error location. 
Understanding these properties helps create robust XML processing scripts.

## Basic parseError Detection

This example demonstrates checking for XML parsing errors using the 
parseError property. It shows how to detect when an XML document 
fails to load. The script loads malformed XML and checks for errors.

basic_parseerror.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;item&gt;Test&lt;/item" ' Missing closing bracket

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error Code: " &amp; xmlDoc.parseError.errorCode
    WScript.Echo "Line: " &amp; xmlDoc.parseError.line
    WScript.Echo "Reason: " &amp; xmlDoc.parseError.reason
End If

Set xmlDoc = Nothing

The script creates an XML DOM object and attempts to load malformed XML. The 
parseError property is checked for non-zero errorCode. Error 
details including line number and reason are displayed. This is the basic 
pattern for error detection.

## Checking Specific Error Conditions

This example shows how to check for specific error conditions using the 
parseError property. It demonstrates handling different types of 
XML parsing errors. The script tests for well-formedness errors.

specific_errors.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;item&gt;Test&lt;/root&gt;" ' Improper nesting

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    Select Case xmlDoc.parseError.errorCode
        Case -1072896659
            WScript.Echo "XML not well-formed"
        Case -1072898022
            WScript.Echo "Invalid character in XML"
        Case Else
            WScript.Echo "Unknown XML error"
    End Select
End If

Set xmlDoc = Nothing

The script attempts to load XML with improper nesting. It checks the errorCode 
and provides specific messages for known errors. This approach allows for 
targeted error handling. The case structure makes error responses more precise.

## Loading XML from File with Error Handling

This example demonstrates using parseError when loading XML from 
a file. It shows comprehensive error handling for file operations. The script 
checks both file access and XML parsing errors.

file_loading.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
success = xmlDoc.load("nonexistent.xml")

If Not success Then
    If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
        WScript.Echo "XML Error: " &amp; xmlDoc.parseError.reason
        WScript.Echo "File: " &amp; xmlDoc.parseError.url
    Else
        WScript.Echo "Failed to load file (non-XML error)"
    End If
End If

Set xmlDoc = Nothing

The script attempts to load a non-existent XML file. It checks both the load 
return value and parseError properties. This provides complete error 
information. The example distinguishes between XML parsing and file access 
errors.

## Creating Custom Error Messages

This example shows how to create user-friendly error messages using 
parseError properties. It formats error information for better 
readability. The script combines multiple error properties.

custom_errors.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;item&gt;Test&lt;item&gt;&lt;/root&gt;"

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    errorMsg = "XML Parsing Error:" &amp; vbCrLf &amp; _
               "Code: " &amp; xmlDoc.parseError.errorCode &amp; vbCrLf &amp; _
               "Line " &amp; xmlDoc.parseError.line &amp; ", Pos " &amp; xmlDoc.parseError.linepos &amp; vbCrLf &amp; _
               "Reason: " &amp; xmlDoc.parseError.reason
    WScript.Echo errorMsg
End If

Set xmlDoc = Nothing

The script loads malformed XML and builds a detailed error message. It combines 
errorCode, line numbers, and reason into a formatted string. This approach 
produces professional-quality error reporting. The message is easier for users 
to understand.

## Validating XML Against DTD

This example demonstrates using parseError for DTD validation 
errors. It shows how to detect schema violations. The script loads XML with 
an invalid element.

dtd_validation.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.validateOnParse = True
xmlDoc.loadXML "&lt;?xml version='1.0'?&gt;&lt;!DOCTYPE root [&lt;!ELEMENT root (item)*&gt;&lt;!ELEMENT item (#PCDATA)&gt;]&gt;&lt;root&gt;&lt;invalid/&gt;&lt;/root&gt;"

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Validation Error: " &amp; xmlDoc.parseError.reason
    WScript.Echo "Element: " &amp; xmlDoc.parseError.srcText
End If

Set xmlDoc = Nothing

The script enables DTD validation and loads XML with an invalid element. The 
parseError property captures validation failures. The srcText 
property shows the offending element. This is useful for debugging schema 
compliance issues.

## Source

[XML DOM parseError Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757019(v=vs.84))

In this article, we have explored the parseError property in 
VBScript, covering its usage and practical applications. From basic error 
detection to advanced validation scenarios, these examples demonstrate 
effective XML error handling. With this knowledge, you can create more robust 
XML processing scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).