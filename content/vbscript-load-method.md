+++
title = "VBScript Load Method"
date = 2025-08-29T20:14:46.347+01:00
draft = false
description = "Learn about VBScript Load method, including XML document loading, file operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Load Method

last modified April 9, 2025

The Load method in VBScript is part of the XMLDOMDocument
object. It loads an XML document from a specified file or URL. This method is
essential for working with XML data in VBScript applications. It supports both
synchronous and asynchronous loading modes.

Load parses the XML content and builds a document object model. It
returns True if loading succeeds, False otherwise. This tutorial covers
Load with practical examples to demonstrate its usage in various
scenarios.

## Load Method Overview

The Load method takes one parameter: the path to an XML file or URL.
It creates an in-memory representation of the XML document. The method is
available through the MSXML2.DOMDocument object in VBScript.

Key features include XML validation during loading and error handling. It
supports both local files and remote resources. Understanding this method is
crucial for XML processing in VBScript applications.

## Basic XML File Loading

This example demonstrates the simplest use of Load to read an XML
file. It shows how to create an XMLDOM object and load a local file. The script
checks if loading was successful.

basic_load.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
success = xmlDoc.Load("C:\data\config.xml")

If success Then
    WScript.Echo "XML loaded successfully"
Else
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
End If

Set xmlDoc = Nothing

The script creates an XMLDOMDocument and attempts to load a file.
It checks the return value of Load to determine success. If loading
fails, it displays the parse error reason. This is the foundation for XML
processing.

## Loading XML from URL

This example shows how to load XML data from a web URL. It demonstrates the
Load method's ability to fetch remote resources. The same basic
error checking applies to URL loading.

url_load.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
success = xmlDoc.Load("https://example.com/data/feed.xml")

If success Then
    WScript.Echo "Remote XML loaded successfully"
Else
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
End If

Set xmlDoc = Nothing

The script sets async to False for synchronous loading. It then
attempts to load XML from a web URL. Error handling remains consistent with file
loading. This enables working with web-based XML services.

## Asynchronous Loading with Events

This example demonstrates asynchronous XML loading with event handling. It shows
how to respond to loading completion. Asynchronous mode allows the script to
continue processing during loading.

async_load.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = True

' Set up event handler
Set xmlDoc.onreadystatechange = GetRef("DocStateChange")

xmlDoc.Load("C:\data\large.xml")
WScript.Echo "Loading started..."

' Keep script running while loading
Do While xmlDoc.readyState &lt;&gt; 4
    WScript.Sleep 100
Loop

Sub DocStateChange
    If xmlDoc.readyState = 4 Then
        If xmlDoc.parseError.errorCode = 0 Then
            WScript.Echo "Asynchronous load complete"
        Else
            WScript.Echo "Load error: " &amp; xmlDoc.parseError.reason
        End If
    End If
End Sub

Set xmlDoc = Nothing

The script enables asynchronous mode and sets an event handler. It starts loading
and continues execution. The event handler checks for completion and errors. This
approach is useful for large files or slow networks.

## Validating XML During Load

This example shows how to validate XML against a schema during loading. It
demonstrates setting validation properties before calling Load.
Validation helps ensure XML conforms to expected structure.

validate_load.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.validateOnParse = True
xmlDoc.resolveExternals = True

success = xmlDoc.Load("C:\data\order.xml")

If success Then
    WScript.Echo "Valid XML document loaded"
Else
    WScript.Echo "Validation error: " &amp; xmlDoc.parseError.reason
End If

Set xmlDoc = Nothing

The script enables validation and external reference resolution. The
Load method will now validate the XML. Any validation errors appear
in the parseError object. This ensures only valid XML is processed.

## Loading XML String Directly

This example demonstrates loading XML from a string instead of a file. It uses
the loadXML method which is similar to Load. This is
useful when XML is generated programmatically.

string_load.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlString = "&lt;root&gt;&lt;item&gt;Test&lt;/item&gt;&lt;/root&gt;"
success = xmlDoc.loadXML(xmlString)

If success Then
    WScript.Echo "XML string loaded successfully"
Else
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
End If

Set xmlDoc = Nothing

The script creates an XML string and loads it directly. The same error checking
applies as with file loading. This approach is efficient for small XML fragments.
It's commonly used with dynamically generated XML.

## Source

[XMLDOMDocument Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms762722(v=vs.85))

In this article, we have explored the Load method in VBScript,
covering its usage and practical applications. From basic file loading to
advanced asynchronous operations, these examples demonstrate XML processing
techniques. With this knowledge, you can effectively work with XML data in your
VBScript applications.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).