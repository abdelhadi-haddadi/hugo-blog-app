+++
title = "VBScript firstChild Property"
date = 2025-08-29T20:14:44.129+01:00
draft = false
description = "Learn about VBScript firstChild property, including XML parsing, DOM traversal, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript firstChild Property

last modified April 9, 2025

The firstChild property in VBScript is part of the Document Object
Model (DOM). It returns the first child node of a specified node. This property
is commonly used when parsing XML documents or traversing DOM trees. It provides
access to nested elements or text content within parent nodes.

firstChild returns Nothing if the node has no children.
It can return different node types including elements, text, or comments. This
tutorial covers firstChild with practical examples to demonstrate
its usage in various scenarios.

## firstChild Property Overview

The firstChild property belongs to the DOM Node interface. It
provides read-only access to a node's first child. The property is available
when working with XML documents or HTML DOM in VBScript.

Key features include automatic whitespace text node detection in XML. It's often
used with nodeType to determine the child's type.
firstChild is fundamental for recursive DOM traversal algorithms.
Understanding this property is essential for XML processing in VBScript.

## Accessing Simple XML Element Content

This example demonstrates basic usage of firstChild to access text
content within an XML element. It shows how to retrieve the value of a simple
element. The XML contains a single book element with a title.

simple_xml.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book&gt;&lt;title&gt;VBScript Programming&lt;/title&gt;&lt;/book&gt;"

Set titleNode = xmlDoc.documentElement.firstChild
WScript.Echo titleNode.firstChild.nodeValue ' Output: VBScript Programming

Set xmlDoc = Nothing

The script loads a simple XML document and accesses the title element. The
firstChild of the book element is the title node. The text content
is accessed via the title node's firstChild. This demonstrates basic
DOM traversal.

## Handling Whitespace Text Nodes

XML documents often contain whitespace for formatting. This example shows how
firstChild might return a whitespace text node. It demonstrates
checking node types to handle such cases properly.

whitespace_nodes.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;catalog&gt;" &amp; vbCrLf &amp; "  &lt;book/&gt;" &amp; vbCrLf &amp; "&lt;/catalog&gt;"

Set firstNode = xmlDoc.documentElement.firstChild
If firstNode.nodeType = 3 Then ' Text node
    WScript.Echo "Whitespace node found"
Else
    WScript.Echo "Element node found"
End If

Set xmlDoc = Nothing

The formatted XML creates whitespace text nodes. The script checks the
nodeType of the first child. Node type 3 indicates a text node,
which would be whitespace in this case. This technique helps handle real-world
XML documents.

## Navigating Nested XML Structures

This example shows using firstChild to navigate a nested XML
structure. It demonstrates chaining firstChild calls to reach deep
elements. The XML contains nested book and author information.

nested_xml.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;library&gt;&lt;book&gt;&lt;author&gt;&lt;name&gt;John Doe&lt;/name&gt;&lt;/author&gt;&lt;/book&gt;&lt;/library&gt;"

Set bookNode = xmlDoc.documentElement.firstChild
Set authorNode = bookNode.firstChild
Set nameNode = authorNode.firstChild

WScript.Echo nameNode.firstChild.nodeValue ' Output: John Doe

Set xmlDoc = Nothing

The script traverses from library to book to author to name nodes. Each step uses
firstChild to go one level deeper. Finally, it accesses the text
content of the name element. This pattern is common in XML processing.

## Checking for Empty Nodes

This example demonstrates how to handle cases where nodes might be empty. It
shows proper checking before accessing firstChild. The XML contains
both populated and empty elements.

empty_nodes.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;data&gt;&lt;item&gt;Value&lt;/item&gt;&lt;item/&gt;&lt;/data&gt;"

Set firstItem = xmlDoc.documentElement.firstChild
If Not firstItem.firstChild Is Nothing Then
    WScript.Echo firstItem.firstChild.nodeValue ' Output: Value
Else
    WScript.Echo "Empty node"
End If

Set secondItem = firstItem.nextSibling
If Not secondItem.firstChild Is Nothing Then
    WScript.Echo secondItem.firstChild.nodeValue
Else
    WScript.Echo "Empty node" ' Output: Empty node
End If

Set xmlDoc = Nothing

The script checks both populated and empty item elements. It verifies
firstChild is not Nothing before accessing it. This
prevents errors when processing XML with optional elements. The example shows
defensive programming practices.

## Processing Mixed Content Nodes

XML elements can contain mixed content (text and elements). This example shows
how firstChild behaves with mixed content. The XML contains a
description with both text and embedded elements.

mixed_content.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;description&gt;This is &lt;em&gt;important&lt;/em&gt; text.&lt;/description&gt;"

Set firstNode = xmlDoc.documentElement.firstChild
WScript.Echo "Node type: " &amp; firstNode.nodeType ' Output: 3 (text node)
WScript.Echo "Content: " &amp; firstNode.nodeValue ' Output: "This is "

Set xmlDoc = Nothing

The description element contains both text and an em element. The
firstChild returns the initial text node. The script demonstrates
how to identify and process different node types in mixed content scenarios.

## Source

[MSDN DOM Node Interface](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms534196(v=vs.84))

In this article, we have explored the firstChild property in
VBScript, covering its usage and practical applications. From simple XML
traversal to handling complex cases like whitespace and mixed content, these
examples demonstrate robust DOM processing. With this knowledge, you can
effectively navigate and process XML documents in VBScript.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).