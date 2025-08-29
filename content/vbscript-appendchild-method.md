+++
title = "VBScript AppendChild Method"
date = 2025-08-29T20:14:40.721+01:00
draft = false
description = "Learn about VBScript AppendChild method, including XML node manipulation, DOM operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript AppendChild Method

last modified April 9, 2025

The AppendChild method in VBScript is part of the XML DOM (Document
Object Model). It adds a new child node as the last child of a specified parent
node. This method is essential for dynamically building and modifying XML
documents in VBScript. It works with all node types including elements, text,
and comments.

AppendChild modifies the document structure by adding nodes to the
DOM tree. The method returns the appended node if successful. This tutorial
covers AppendChild with practical examples to demonstrate its usage
in various scenarios.

## AppendChild Method Overview

The AppendChild method takes one parameter: the node to append. It
returns the appended node object. The method is available on any XML DOM node
that can have children. It's commonly used with the MSXML2.DOMDocument
object in VBScript.

Key features include automatic document structure modification and support for
all node types. The method throws an error if the node type is incompatible with
the parent. Understanding this method is crucial for XML manipulation in
VBScript.

## Basic XML Document Creation

This example demonstrates creating a simple XML document from scratch using
AppendChild. We'll build a root element and add a child element
with text content. This shows the fundamental usage of the method.

basic_appendchild.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set root = xmlDoc.createElement("Root")
xmlDoc.appendChild root

Set child = xmlDoc.createElement("Message")
child.text = "Hello World"
root.appendChild child

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates an XML document object and a root element. The root is
appended to the document. Then a child element with text is created and
appended to the root. The final XML structure is output to demonstrate the
result.

## Adding Multiple Child Elements

This example shows how to add multiple child elements to a parent node using
AppendChild. We'll create a simple inventory list with several
items. Each item is added sequentially to demonstrate multiple appends.

multiple_children.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set inventory = xmlDoc.createElement("Inventory")
xmlDoc.appendChild inventory

items = Array("Book", "Pen", "Notebook", "Pencil")
For Each item in items
    Set elem = xmlDoc.createElement("Item")
    elem.text = item
    inventory.appendChild elem
Next

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates an Inventory root element and adds multiple Item elements
using a loop. Each iteration creates a new element, sets its text, and appends
it. This pattern is common when building XML from arrays or collections.

## Appending Existing Nodes

AppendChild can also move existing nodes within a document. This
example demonstrates moving a node from one parent to another. The original node
is removed from its previous position automatically.

move_node.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.loadXML "&lt;Library&gt;&lt;Books&gt;&lt;Book/&gt;&lt;/Books&gt;&lt;Magazines/&gt;&lt;/Library&gt;"

Set book = xmlDoc.selectSingleNode("//Book")
Set magazines = xmlDoc.selectSingleNode("//Magazines")
magazines.appendChild book

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script loads an XML document with predefined structure. It selects a Book
node and moves it from Books to Magazines. The output shows the modified
structure where Book is now under Magazines.

## Creating Nested Structures

This example demonstrates building complex nested XML structures using multiple
AppendChild calls. We'll create a company department structure with
employees. Each level of nesting requires separate append operations.

nested_structure.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set company = xmlDoc.createElement("Company")
xmlDoc.appendChild company

Set dept = xmlDoc.createElement("Department")
dept.setAttribute "name", "IT"
company.appendChild dept

Set employee = xmlDoc.createElement("Employee")
employee.text = "John Doe"
dept.appendChild employee

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script builds a Company element containing a Department, which contains an
Employee. Each level is added using AppendChild. Attributes are
set before appending where needed. The result is a properly nested XML
structure.

## Appending Different Node Types

AppendChild works with various node types beyond just elements.
This example shows appending a comment node and a text node to an element.
Different node types require different creation methods.

node_types.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set root = xmlDoc.createElement("Root")
xmlDoc.appendChild root

Set comment = xmlDoc.createComment("Sample XML Document")
root.appendChild comment

Set textNode = xmlDoc.createTextNode("Sample text content")
root.appendChild textNode

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates a root element and appends both a comment and text node to
it. Note the different methods used to create each node type
(createComment and createTextNode). The output shows
the mixed content in the resulting XML.

## Source

[MSXML DOMDocument Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms762278(v=vs.85))

In this article, we have explored the AppendChild method in VBScript,
covering its usage and practical applications. From simple XML creation to complex
node manipulation, these examples demonstrate powerful XML document building.
With this knowledge, you can enhance your XML processing scripts with dynamic
content generation.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).