+++
title = "VBScript CreateNode Method"
date = 2025-08-29T20:14:43.006+01:00
draft = false
description = "Learn about VBScript CreateNode method, including XML document manipulation, node creation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript CreateNode Method

last modified April 9, 2025

The CreateNode method in VBScript is part of the Microsoft XML DOM
implementation. It creates a new node of a specified type for an XML document.
This method is essential for programmatically building or modifying XML
structures. It provides flexibility in XML document manipulation.

CreateNode allows creating various node types including elements,
attributes, and text nodes. It's commonly used in XML processing scripts. This
tutorial covers CreateNode with practical examples to demonstrate
its usage in different scenarios.

## CreateNode Method Overview

The CreateNode method takes three parameters: node type, node name,
and namespace URI. It returns a new node object that can be inserted into an XML
document. The method is available through the MSXML DOMDocument object in
VBScript.

Key features include support for all standard XML node types and namespace
awareness. It doesn't automatically add the node to the document tree.
CreateNode is fundamental for dynamic XML generation. Understanding
this method helps create robust XML processing scripts.

## Creating a Simple Element Node

This example demonstrates creating a basic element node using
CreateNode. It shows how to create a node and append it to the
document. The example creates a "book" element as a child of the root.

simple_element.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;library&gt;&lt;/library&gt;"

Set root = xmlDoc.documentElement
Set newNode = xmlDoc.createNode(1, "book", "")
root.appendChild newNode

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates an XML document with a root "library" element. It then creates
a "book" element node (type 1) and appends it. The output shows the complete XML
with the new node. This demonstrates basic node creation and insertion.

## Creating a Text Node

This example shows how to create a text node and add it to an element. Text nodes
are fundamental for adding content to XML elements. The example creates a title
element with text content.

text_node.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book&gt;&lt;/book&gt;"

Set book = xmlDoc.documentElement
Set titleNode = xmlDoc.createNode(1, "title", "")
Set textNode = xmlDoc.createNode(3, "", "")
textNode.text = "VBScript Programming"

titleNode.appendChild textNode
book.appendChild titleNode

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates a text node (type 3) with no name. It sets the node's text
content and appends it to a title element. The title element is then added to
the book element. This shows hierarchical node construction.

## Creating an Attribute Node

This example demonstrates creating an attribute node for an element. Attributes
provide additional information about elements. The example adds an "id"
attribute to a book element.

attribute_node.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;library&gt;&lt;book/&gt;&lt;/library&gt;"

Set book = xmlDoc.selectSingleNode("//book")
Set attrNode = xmlDoc.createNode(2, "id", "")
attrNode.text = "B001"

book.attributes.setNamedItem attrNode

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates an attribute node (type 2) named "id". It sets the attribute
value and adds it to the book element. Attributes are added differently than
other nodes. This shows specialized node handling for attributes.

## Creating a Namespaced Node

This example shows how to create a node with a namespace. Namespaces help avoid
element name conflicts. The example creates an element in a custom namespace.

namespaced_node.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;lib:library xmlns:lib='http://example.com/library'/&gt;"

Set root = xmlDoc.documentElement
Set newNode = xmlDoc.createNode(1, "lib:book", "http://example.com/library")
root.appendChild newNode

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates a namespaced "book" element. The namespace URI must match the
document's declaration. The output shows proper namespace prefix usage. This
demonstrates advanced XML features in VBScript.

## Creating a Complex XML Structure

This example combines multiple node types to build a complex structure. It shows
how CreateNode can be used to generate complete XML documents. The
example creates a book catalog entry.

complex_structure.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;catalog&gt;&lt;/catalog&gt;"

Set catalog = xmlDoc.documentElement
Set book = xmlDoc.createNode(1, "book", "")
Set title = xmlDoc.createNode(1, "title", "")
Set titleText = xmlDoc.createNode(3, "", "")
titleText.text = "Advanced VBScript"

title.appendChild titleText
book.appendChild title
catalog.appendChild book

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script builds a catalog with a book entry containing a title. It demonstrates
nested node creation and proper document structure. Multiple node types are
combined. This shows practical XML generation techniques.

## Source

[MSXML DOMDocument Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms760891(v=vs.85))

In this article, we have explored the CreateNode method in VBScript,
covering its usage and practical applications. From simple elements to complex
namespaced structures, these examples demonstrate XML manipulation. With this
knowledge, you can enhance your XML processing scripts with dynamic node
creation.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).