+++
title = "VBScript lastChild Property"
date = 2025-08-29T20:14:45.244+01:00
draft = false
description = "Learn about VBScript lastChild property, including XML DOM traversal, node manipulation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript lastChild Property

last modified April 9, 2025

The lastChild property in VBScript is part of the Document Object
Model (DOM). It returns the last child node of a specified node. This property
is read-only and commonly used in XML document traversal. It helps navigate
hierarchical node structures efficiently.

lastChild returns Nothing if the node has no children. It's useful
for accessing the final element in a node collection. This tutorial covers
lastChild with practical examples to demonstrate its usage in
various scenarios.

## lastChild Property Overview

The lastChild property belongs to the DOM Node interface. It
provides access to a node's last child without using childNodes collection. The
property is available when working with XML documents in VBScript.

Key features include direct access to the last node and null return for empty
nodes. It works with all node types including elements and text nodes.
Understanding this property helps create efficient XML processing scripts.

## Basic lastChild Access

This example demonstrates the simplest use of lastChild to access
the last child of an XML element. It shows how to load an XML document and
navigate to the last child node. The example outputs the node name and value.

basic_lastchild.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;item&gt;First&lt;/item&gt;&lt;item&gt;Second&lt;/item&gt;&lt;item&gt;Last&lt;/item&gt;&lt;/root&gt;"

Set lastNode = xmlDoc.documentElement.lastChild
WScript.Echo "Node name: " &amp; lastNode.nodeName &amp; ", Value: " &amp; lastNode.text

Set xmlDoc = Nothing

The script creates an XML document with three items. lastChild
accesses the final "item" node. The output shows the node name ("item") and its
text content ("Last"). This demonstrates basic last node access.

## Checking for No Children

This example shows how to handle cases where a node has no children.
lastChild returns Nothing when there are no child nodes. The script
demonstrates proper null checking before accessing node properties.

no_children.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;emptyNode/&gt;&lt;/root&gt;"

Set emptyNode = xmlDoc.documentElement.firstChild
Set lastChild = emptyNode.lastChild

If lastChild Is Nothing Then
    WScript.Echo "No child nodes found"
Else
    WScript.Echo "Last child: " &amp; lastChild.nodeName
End If

Set xmlDoc = Nothing

The script checks if lastChild returns Nothing for an empty node.
This is important to avoid runtime errors when accessing node properties. The
example outputs "No child nodes found" as expected.

## Accessing Nested Last Child

This example demonstrates accessing the last child in a nested XML structure. It
shows how to chain lastChild calls to navigate deep hierarchies.
The script retrieves the innermost last node.

nested_lastchild.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;group&gt;&lt;item&gt;A&lt;/item&gt;&lt;item&gt;B&lt;/item&gt;&lt;/group&gt;&lt;group&gt;&lt;item&gt;C&lt;/item&gt;&lt;/group&gt;&lt;/root&gt;"

' Get last group, then its last item
Set lastGroup = xmlDoc.documentElement.lastChild
Set lastItem = lastGroup.lastChild

WScript.Echo "Last item in last group: " &amp; lastItem.text

Set xmlDoc = Nothing

The script first gets the last "group" node, then its last "item" node. This
two-step navigation is common in XML processing. The output shows "C" as the
last item in the last group.

## Comparing firstChild and lastChild

This example compares firstChild and lastChild
properties. It demonstrates accessing both ends of a node collection. The script
shows the difference between these navigation properties.

first_vs_last.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;colors&gt;&lt;color&gt;Red&lt;/color&gt;&lt;color&gt;Green&lt;/color&gt;&lt;color&gt;Blue&lt;/color&gt;&lt;/colors&gt;"

Set first = xmlDoc.documentElement.firstChild
Set last = xmlDoc.documentElement.lastChild

WScript.Echo "First color: " &amp; first.text
WScript.Echo "Last color: " &amp; last.text

Set xmlDoc = Nothing

The script loads an XML document with color values. It outputs both the first
and last color nodes. This demonstrates how to access opposite ends of a node
collection using these properties.

## Processing Mixed Content Nodes

This example shows lastChild behavior with mixed content nodes. XML
elements can contain both elements and text nodes. The script demonstrates
identifying the actual last child in such cases.

mixed_content.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book&gt;Introduction&lt;chapter&gt;1&lt;/chapter&gt;&lt;chapter&gt;2&lt;/chapter&gt;&lt;/book&gt;"

Set lastChild = xmlDoc.documentElement.lastChild
WScript.Echo "Last child node type: " &amp; lastChild.nodeType
WScript.Echo "Last child value: " &amp; lastChild.text

Set xmlDoc = Nothing

The XML contains both text ("Introduction") and element nodes. The script shows
that lastChild correctly returns the last chapter node. Node type 1
indicates an element node, and its text value is displayed.

## Source

[XML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757828(v=vs.84))

In this article, we have explored the lastChild property in
VBScript, covering its usage and practical applications. From basic node access
to complex nested structures, these examples demonstrate efficient XML
navigation. With this knowledge, you can enhance your XML processing scripts
with robust node traversal.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).