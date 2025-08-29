+++
title = "VBScript nodeValue Property"
date = 2025-08-29T20:14:47.461+01:00
draft = false
description = "Learn about VBScript nodeValue property, including XML node manipulation, text content access, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript nodeValue Property

last modified April 9, 2025

The nodeValue property in VBScript is part of the XML DOM (Document 
Object Model). It represents the value of a node, depending on its type. For text 
nodes, it contains the actual text content. For attribute nodes, it contains the 
attribute value. This property is essential for XML processing in VBScript.

nodeValue allows reading and modifying node content in XML documents. 
It works with text nodes, comment nodes, and attribute nodes. Understanding this 
property is crucial for effective XML manipulation. This tutorial covers 
nodeValue with practical examples.

## nodeValue Property Overview

The nodeValue property returns or sets the value of the current node. 
Its behavior varies based on node type. For element nodes, it returns null. For 
text nodes, it returns the text content. For attributes, it returns the attribute 
value.

Key features include direct access to node content and simple modification 
capability. It's read/write for most applicable node types. The property is 
available on all node objects in the XML DOM. Mastering nodeValue 
enables efficient XML data processing.

## Reading Text Node Value

This example demonstrates reading the value of a text node. It loads a simple XML 
string and extracts text content. The script shows how to access the text node's 
nodeValue property.

read_text_node.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book&gt;&lt;title&gt;VBScript Guide&lt;/title&gt;&lt;/book&gt;"

Set titleNode = xmlDoc.documentElement.firstChild
textContent = titleNode.firstChild.nodeValue

WScript.Echo textContent ' Output: VBScript Guide

Set xmlDoc = Nothing

The script creates an XML document with a book title. It accesses the text node 
inside the title element. The nodeValue property returns "VBScript 
Guide". This demonstrates basic text content retrieval from XML.

## Modifying Text Node Value

This example shows how to modify a text node's content using nodeValue. 
It loads an XML document and updates a text node. The change is then verified by 
reading back the value.

modify_text_node.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;person&gt;&lt;name&gt;John&lt;/name&gt;&lt;/person&gt;"

Set nameNode = xmlDoc.documentElement.firstChild
nameNode.firstChild.nodeValue = "Jane"

updatedName = nameNode.firstChild.nodeValue
WScript.Echo updatedName ' Output: Jane

Set xmlDoc = Nothing

The script changes the name from "John" to "Jane" by assigning a new value to 
nodeValue. This demonstrates how to update XML content dynamically. 
The property provides direct write access to text node content.

## Reading Attribute Value

This example illustrates reading an attribute value using nodeValue. 
It processes an XML element with attributes. The script shows how to access 
attribute nodes and their values.

read_attribute.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;product id='P100' status='active'/&gt;"

Set productNode = xmlDoc.documentElement
Set idAttr = productNode.getAttributeNode("id")

attrValue = idAttr.nodeValue
WScript.Echo attrValue ' Output: P100

Set xmlDoc = Nothing

The script retrieves the "id" attribute's value from a product element. The 
nodeValue property returns "P100" when accessed on the attribute 
node. This shows attribute value access in XML processing.

## Modifying Attribute Value

This example demonstrates modifying an attribute value using nodeValue. 
It updates an XML attribute and verifies the change. The script shows attribute 
manipulation in action.

modify_attribute.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;user role='guest'/&gt;"

Set userNode = xmlDoc.documentElement
Set roleAttr = userNode.getAttributeNode("role")

roleAttr.nodeValue = "admin"
updatedRole = roleAttr.nodeValue

WScript.Echo updatedRole ' Output: admin

Set xmlDoc = Nothing

The script changes the user's role from "guest" to "admin" by modifying the 
attribute's nodeValue. This demonstrates dynamic attribute updates. 
The property allows both reading and writing attribute values.

## Working with Comment Nodes

This example shows how to access comment node content using nodeValue. 
It processes an XML document containing comments. The script extracts and displays 
the comment text.

comment_node.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;!-- Sample comment --&gt;&lt;data/&gt;"

Set commentNode = xmlDoc.firstChild
commentText = commentNode.nodeValue

WScript.Echo commentText ' Output: Sample comment

Set xmlDoc = Nothing

The script accesses the comment node preceding the root element. The 
nodeValue property returns the comment text without the markup. This 
demonstrates comment processing in XML documents.

## Source

[XML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757828(v=vs.84))

In this article, we have explored the nodeValue property in VBScript, 
covering its usage with different node types. From text nodes to attributes and 
comments, these examples demonstrate versatile XML content manipulation. With this 
knowledge, you can effectively process and modify XML documents in VBScript.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).