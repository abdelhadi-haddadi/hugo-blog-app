+++
title = "VBScript LoadXML Method"
date = 2025-08-29T20:14:46.353+01:00
draft = false
description = "Learn about VBScript LoadXML method, including XML parsing, document loading, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript LoadXML Method

last modified April 9, 2025

The LoadXML method in VBScript is part of the Microsoft XML DOM
implementation. It loads an XML document from a string containing XML markup.
This method parses the XML string and builds a DOM tree in memory. It's
commonly used for XML processing in VBScript applications.

LoadXML provides a way to work with XML data directly from strings.
It's useful when XML content comes from sources other than files. This tutorial
covers LoadXML with practical examples to demonstrate its usage.
Understanding this method is essential for XML processing in VBScript.

## LoadXML Method Overview

The LoadXML method belongs to the DOMDocument object.
It takes one parameter: a string containing well-formed XML. The method returns
True if loading succeeds, False otherwise. It replaces any existing document
content with the new XML.

Key features include in-memory XML parsing and DOM tree construction. The method
validates XML syntax but not against schemas. LoadXML is often
paired with other DOM methods for XML manipulation. It's available in MSXML
versions 2.0 and later.

## Basic XML Loading

This example demonstrates the simplest use of LoadXML to parse an
XML string. It shows how to create a DOMDocument and load XML content. The
example then verifies the loading was successful.

basic_loadxml.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlString = "&lt;root&gt;&lt;item&gt;Test&lt;/item&gt;&lt;/root&gt;"
success = xmlDoc.LoadXML(xmlString)

If success Then
    WScript.Echo "XML loaded successfully"
    WScript.Echo xmlDoc.xml
Else
    WScript.Echo "Error loading XML"
End If

Set xmlDoc = Nothing

The script creates a DOMDocument and calls LoadXML.
The XML string "&lt;root&gt;&lt;item&gt;Test&lt;/item&gt;&lt;/root&gt;" is
parsed into a DOM tree. The method returns True, indicating success. The XML
content is then echoed back.

## Handling XML Errors

This example shows how to handle errors when loading malformed XML. It
demonstrates checking the parseError object after a failed load. The script
provides detailed error information.

error_handling.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlString = "&lt;root&gt;&lt;item&gt;Test&lt;/item" ' Missing closing tag
success = xmlDoc.LoadXML(xmlString)

If Not success Then
    Set err = xmlDoc.parseError
    WScript.Echo "Error loading XML:"
    WScript.Echo "Line: " &amp; err.line
    WScript.Echo "Position: " &amp; err.linepos
    WScript.Echo "Reason: " &amp; err.reason
End If

Set xmlDoc = Nothing

The script attempts to load invalid XML (missing closing tag). 
LoadXML returns False, indicating failure. The parseError object
provides details about the error. This helps diagnose and fix XML syntax issues
in scripts.

## Loading XML with Namespaces

This example demonstrates loading XML containing namespaces. It shows how
LoadXML handles namespace declarations. The script then accesses
elements using their namespace-qualified names.

namespace_xml.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlString = "&lt;ns:root xmlns:ns='http://example.com'&gt;" &amp; _
            "&lt;ns:item&gt;Value&lt;/ns:item&gt;&lt;/ns:root&gt;"
success = xmlDoc.LoadXML(xmlString)

If success Then
    Set node = xmlDoc.selectSingleNode("//ns:item")
    WScript.Echo node.text ' Output: Value
End If

Set xmlDoc = Nothing

The script loads XML with a namespace declaration. LoadXML correctly
parses the namespace information. The script then uses XPath with namespace
prefix to access elements. This shows proper namespace handling in VBScript XML
processing.

## Modifying Loaded XML

This example shows how to modify XML after loading it with LoadXML.
It demonstrates adding new elements to the parsed DOM tree. The modified XML is
then output.

modify_xml.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlString = "&lt;root&gt;&lt;item&gt;Original&lt;/item&gt;&lt;/root&gt;"
success = xmlDoc.LoadXML(xmlString)

If success Then
    Set newElem = xmlDoc.createElement("newItem")
    newElem.text = "Added"
    xmlDoc.documentElement.appendChild newElem
    WScript.Echo xmlDoc.xml
End If

Set xmlDoc = Nothing

The script loads basic XML and adds a new element. LoadXML creates
the initial DOM structure. The script then creates and appends a new element.
Finally, it outputs the modified XML showing the changes.

## Loading XML with CDATA Sections

This example demonstrates LoadXML handling XML containing CDATA
sections. CDATA preserves special characters in text content. The script shows
how to access CDATA content after loading.

cdata_xml.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlString = "&lt;root&gt;&lt;![CDATA[&lt;This&gt; is &amp; CDATA content]]&gt;&lt;/root&gt;"
success = xmlDoc.LoadXML(xmlString)

If success Then
    WScript.Echo xmlDoc.documentElement.text
End If

Set xmlDoc = Nothing

The script loads XML containing a CDATA section. LoadXML correctly
parses the CDATA content. The script then accesses the text content, which
includes the special characters. This shows CDATA handling in VBScript XML
processing.

## Source

[MSXML DOMDocument Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms762722(v=vs.85))

In this article, we have explored the LoadXML method in VBScript,
covering its usage and practical applications. From basic XML loading to handling
complex cases like namespaces and CDATA, these examples demonstrate reliable XML
processing. With this knowledge, you can enhance your scripts with robust XML
handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).