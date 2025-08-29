+++
title = "VBScript XML Property"
date = 2025-08-29T20:14:50.800+01:00
draft = false
description = "Learn about VBScript XML property, including XML parsing, document manipulation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript XML Property

last modified April 9, 2025

The xml property in VBScript is part of the Microsoft XML DOM
(Document Object Model). It returns the XML representation of a node and its
descendants as a string. This property is available on IXMLDOMNode objects and
their descendants. It's essential for XML document manipulation in VBScript.

xml provides serialized XML content including tags, attributes,
and text. It's commonly used for debugging, logging, and XML transformation.
This tutorial covers xml property with practical examples to
demonstrate its usage in various scenarios.

## XML Property Overview

The xml property returns a string containing the XML markup for
a node and all its children. It works with all node types including elements,
attributes, and text nodes. The output includes proper XML formatting with
indentation where applicable.

Key features include complete XML serialization and proper encoding of special
characters. The property is read-only and cannot be used to modify XML content.
Understanding this property helps in XML document inspection and manipulation.

## Basic XML Document Serialization

This example demonstrates the simplest use of xml property to
serialize an entire XML document. It shows how to load an XML string and output
its serialized form. The example uses MSXML2.DOMDocument to parse the XML.

basic_xml_property.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;books&gt;&lt;book&gt;&lt;title&gt;VBScript Guide&lt;/title&gt;&lt;/book&gt;&lt;/books&gt;"

WScript.Echo xmlDoc.xml

Set xmlDoc = Nothing

The script creates an XML DOM document and loads a simple XML string. The
xml property returns the complete XML markup as a string. The
output matches the input XML but may include additional formatting. This is
useful for verifying document structure.

## Serializing Specific Nodes

This example shows how to use xml property on specific nodes
rather than the entire document. It demonstrates selective serialization of
XML fragments. The example navigates to a child node before serializing.

node_serialization.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;catalog&gt;&lt;book id='101'&gt;&lt;title&gt;Advanced VBScript&lt;/title&gt;&lt;/book&gt;&lt;/catalog&gt;"

Set bookNode = xmlDoc.selectSingleNode("//book")
WScript.Echo bookNode.xml

Set bookNode = Nothing
Set xmlDoc = Nothing

The script loads an XML document and selects a specific book node. The
xml property serializes just this node and its children. The output
includes the book element with its attributes and child elements. This is useful
for extracting document fragments.

## Comparing Document and Element XML

This example demonstrates the difference between using xml on the
document versus individual elements. It shows how the output varies based on
the node type. The example highlights XML declaration inclusion.

document_vs_element.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;?xml version='1.0'?&gt;&lt;root&gt;&lt;item&gt;Test&lt;/item&gt;&lt;/root&gt;"

WScript.Echo "Document XML:"
WScript.Echo xmlDoc.xml

WScript.Echo vbCrLf &amp; "Element XML:"
Set root = xmlDoc.documentElement
WScript.Echo root.xml

Set root = Nothing
Set xmlDoc = Nothing

The script shows that document-level xml includes the XML
declaration. Element-level serialization omits this declaration. Both outputs
include proper formatting and complete node hierarchies. This distinction is
important when generating XML fragments versus complete documents.

## Handling Special Characters

This example demonstrates how xml property automatically handles
special characters in XML content. It shows proper escaping of reserved
characters like ampersands and angle brackets. The example verifies correct
serialization.

special_characters.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;data&gt;&lt;text&gt;AT&amp;T &gt; Sprint &amp; Verizon&lt;/text&gt;&lt;/data&gt;"

WScript.Echo xmlDoc.xml

Set xmlDoc = Nothing

The script contains special characters that would be invalid in raw XML. The
xml property properly escapes these characters in the output. The
resulting XML is well-formed and can be parsed again. This automatic escaping
simplifies XML generation.

## Creating XML from Scratch

This example shows how to build an XML document programmatically and then use
xml property to serialize it. It demonstrates dynamic XML
generation in VBScript. The example creates elements and attributes.

create_and_serialize.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set root = xmlDoc.createElement("inventory")
xmlDoc.appendChild root

Set item = xmlDoc.createElement("item")
item.setAttribute "id", "X205"
item.textContent = "Keyboard"
root.appendChild item

WScript.Echo xmlDoc.xml

Set item = Nothing
Set root = Nothing
Set xmlDoc = Nothing

The script creates a new XML document from scratch without loading existing XML.
Elements and attributes are added programmatically. The xml
property serializes the complete generated structure. This approach is useful for
dynamic XML generation in applications.

## Source

[MSXML DOMDocument Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms760399(v=vs.85))

In this article, we have explored the xml property in VBScript,
covering its usage and practical applications. From complete document
serialization to node-specific fragments, these examples demonstrate XML
processing capabilities. With this knowledge, you can effectively work with XML
in your VBScript applications.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).