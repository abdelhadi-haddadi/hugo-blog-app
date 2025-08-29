+++
title = "VBScript childNodes Property"
date = 2025-08-29T20:14:41.897+01:00
draft = false
description = "Learn about VBScript childNodes property, including XML parsing, node traversal, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript childNodes Property

last modified April 9, 2025

The childNodes property in VBScript is part of the XML DOM 
implementation. It returns a collection of all child nodes of the specified 
node. This property is essential for navigating and manipulating XML documents.
It provides access to both element nodes and text nodes within the hierarchy.

childNodes is read-only and returns a NodeList object. The 
collection includes all direct children regardless of node type. This tutorial 
covers childNodes with practical examples to demonstrate XML 
processing in VBScript.

## childNodes Property Overview

The childNodes property belongs to the XML DOM Node interface. 
It provides access to all immediate children of a node. The returned NodeList 
is live, updating automatically as the document changes. Nodes are indexed 
starting from 0.

Important aspects include handling whitespace text nodes and element nodes. 
The property works with both loaded XML documents and dynamically created 
nodes. Understanding childNodes is fundamental for XML processing.

## Basic XML Document Traversal

This example demonstrates basic traversal of an XML document using 
childNodes. It shows how to access and display child nodes. 
The script loads a simple XML string and examines its structure.

basic_traversal.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;item&gt;First&lt;/item&gt;&lt;item&gt;Second&lt;/item&gt;&lt;/root&gt;"

Set root = xmlDoc.documentElement
For Each child In root.childNodes
    WScript.Echo child.nodeName &amp; ": " &amp; child.text
Next

Set xmlDoc = Nothing

The script creates an XML document with two item elements. It accesses the 
root element's childNodes collection. Each child node's name 
and text content are displayed. This shows basic XML navigation.

## Counting Child Nodes

This example demonstrates using the childNodes length property. 
It shows how to determine the number of children a node contains. The count 
includes all node types, not just elements.

count_nodes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&gt;books&gt;&gt;book/&gt;&gt;book/&gt;&gt;book/&gt;&gt;/books&gt;"

Set books = xmlDoc.documentElement
WScript.Echo "Number of book elements: " &amp; books.childNodes.length

Set xmlDoc = Nothing

The script loads an XML document with three book elements. It accesses the 
childNodes.length property of the books element. The output 
shows the count of direct child nodes. This is useful for validation.

## Accessing Specific Child Nodes

This example shows how to access specific nodes using their index in the 
childNodes collection. It demonstrates zero-based indexing and 
direct node access. The script retrieves and displays a particular child.

specific_node.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;colors&gt;&lt;color&gt;Red&lt;/color&gt;&lt;color&gt;Green&lt;/color&gt;&lt;color&gt;Blue&lt;/color&gt;&lt;/colors&gt;"

Set colors = xmlDoc.documentElement
Set secondColor = colors.childNodes(1)
WScript.Echo "Second color: " &amp; secondColor.text

Set xmlDoc = Nothing

The script loads an XML document with three color elements. It accesses the 
second color using index 1 (zero-based). The text content of the specific 
node is displayed. This shows targeted node access.

## Handling Different Node Types

This example demonstrates working with different node types in the 
childNodes collection. It shows how to identify and process 
element nodes versus text nodes. The script examines each child's node type.

node_types.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;data&gt;Text content&lt;item&gt;Value&lt;/item&gt;&lt;/data&gt;"

Set dataNode = xmlDoc.documentElement
For Each child In dataNode.childNodes
    Select Case child.nodeType
        Case 1: WScript.Echo "Element: " &amp; child.nodeName
        Case 3: WScript.Echo "Text: " &amp; child.nodeValue
    End Select
Next

Set xmlDoc = Nothing

The script loads XML containing both text and element nodes. It checks each 
child's nodeType property. Different processing occurs based on 
whether the node is an element or text. This shows type-aware processing.

## Modifying Child Nodes

This example demonstrates modifying nodes within the childNodes 
collection. It shows how to change node content and structure. The script 
updates a specific child node's value.

modify_nodes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;settings&gt;&lt;option&gt;Default&lt;/option&gt;&lt;/settings&gt;"

Set settings = xmlDoc.documentElement
settings.childNodes(0).text = "Custom"
WScript.Echo "Modified option: " &amp; settings.childNodes(0).text

Set xmlDoc = Nothing

The script loads an XML document with one option element. It accesses the 
first child node and modifies its text content. The change is then verified 
by displaying the updated value. This shows dynamic XML modification.

## Source

[XML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757828(v=vs.84))

In this article, we have explored the childNodes property in 
VBScript, covering its usage and practical applications. From basic traversal 
to node modification, these examples demonstrate XML processing techniques. 
With this knowledge, you can effectively work with XML documents in VBScript.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).