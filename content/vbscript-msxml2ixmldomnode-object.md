+++
title = "VBScript MSXML2.IXMLDOMNode Object"
date = 2025-08-29T20:14:45.241+01:00
draft = false
description = "Learn about VBScript MSXML2.IXMLDOMNode Object, including XML node manipulation, traversal, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript MSXML2.IXMLDOMNode Object

last modified April 9, 2025

The MSXML2.IXMLDOMNode object in VBScript represents a single node 
in an XML document tree. It is part of the Microsoft XML Core Services (MSXML) 
library. This object provides methods and properties to manipulate XML nodes. 
It serves as the base interface for all other XML DOM node types.

IXMLDOMNode enables reading, modifying, adding, and deleting XML 
nodes. It supports navigation through the XML document structure. This tutorial 
covers IXMLDOMNode with practical examples to demonstrate its usage.

## IXMLDOMNode Object Overview

The IXMLDOMNode interface is the fundamental building block of XML 
DOM. It provides core functionality shared by all node types. Properties include 
nodeName, nodeValue, and childNodes.

Key methods include appendChild, removeChild, and 
selectNodes. The object supports XPath expressions for node 
selection. Understanding this interface is essential for XML processing in 
VBScript.

## Accessing Node Properties

This example demonstrates accessing basic properties of an XML node. It shows 
how to retrieve the node name, value, and type. The script loads a simple XML 
string and examines its root node.

node_properties.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book&gt;&lt;title&gt;VBScript Guide&lt;/title&gt;&lt;/book&gt;"

Set root = xmlDoc.documentElement
WScript.Echo "Node name: " &amp; root.nodeName
WScript.Echo "Node type: " &amp; root.nodeType
WScript.Echo "XML content: " &amp; root.xml

Set xmlDoc = Nothing

The script creates an XML document with a book element. It accesses the root 
node's properties using nodeName and nodeType. The 
xml property returns the node's complete XML content.

## Navigating Child Nodes

This example shows how to traverse child nodes of an XML element. It 
demonstrates accessing the first child node and iterating through all children. 
The script examines each node's properties.

child_nodes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;library&gt;&lt;book&gt;Title1&lt;/book&gt;&lt;book&gt;Title2&lt;/book&gt;&lt;/library&gt;"

Set library = xmlDoc.documentElement
Set firstChild = library.firstChild
WScript.Echo "First child name: " &amp; firstChild.nodeName

For Each child In library.childNodes
    WScript.Echo "Child node value: " &amp; child.text
Next

Set xmlDoc = Nothing

The script loads an XML document with multiple book elements. It accesses the 
first child node using firstChild. Then it iterates through all 
children using the childNodes collection.

## Modifying Node Content

This example demonstrates modifying XML node content. It shows how to change a 
node's text value and attributes. The script updates the XML document and 
outputs the modified content.

modify_node.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;person&gt;&lt;name&gt;John&lt;/name&gt;&lt;age&gt;30&lt;/age&gt;&lt;/person&gt;"

Set nameNode = xmlDoc.selectSingleNode("//name")
nameNode.text = "Michael"

Set ageNode = xmlDoc.selectSingleNode("//age")
ageNode.text = "35"

WScript.Echo "Modified XML: " &amp; vbCrLf &amp; xmlDoc.xml

Set xmlDoc = Nothing

The script loads an XML document with person data. It uses 
selectSingleNode to locate specific nodes. The text content of 
both name and age nodes is updated. Finally, the modified XML is displayed.

## Adding and Removing Nodes

This example shows how to add new nodes and remove existing ones. It 
demonstrates creating elements and appending them to the document. The script 
also shows node removal.

add_remove_nodes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;employees&gt;&lt;employee&gt;Alice&lt;/employee&gt;&lt;/employees&gt;"

Set root = xmlDoc.documentElement

' Add new employee
Set newEmp = xmlDoc.createElement("employee")
newEmp.text = "Bob"
root.appendChild newEmp

' Remove first employee
Set firstEmp = root.firstChild
root.removeChild firstEmp

WScript.Echo "Updated XML: " &amp; vbCrLf &amp; xmlDoc.xml

Set xmlDoc = Nothing

The script starts with an XML document containing one employee. It creates a new 
employee node using createElement and appends it. Then it removes 
the original employee node. The final XML shows the modifications.

## Using XPath to Select Nodes

This example demonstrates using XPath expressions to select nodes. It shows how 
to retrieve specific nodes based on criteria. The script uses both 
selectNodes and selectSingleNode methods.

xpath_selection.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;products&gt;&lt;product id='1'&gt;Laptop&lt;/product&gt;&lt;product id='2'&gt;Phone&lt;/product&gt;&lt;/products&gt;"

' Select single node
Set product1 = xmlDoc.selectSingleNode("//product[@id='1']")
WScript.Echo "Product 1: " &amp; product1.text

' Select multiple nodes
Set products = xmlDoc.selectNodes("//product")
For Each prod In products
    WScript.Echo "Product: " &amp; prod.text
Next

Set xmlDoc = Nothing

The script loads an XML document with product data. It uses XPath to select a 
specific product by ID attribute. Then it selects all product nodes and 
iterates through them. XPath provides powerful node selection capabilities.

## Source

[MSXML2.IXMLDOMNode Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms764730(v=vs.85))

In this article, we have explored the MSXML2.IXMLDOMNode object in 
VBScript, covering its properties and methods. From basic node access to complex 
manipulations, these examples demonstrate XML processing capabilities. With this 
knowledge, you can effectively work with XML data in your VBScript applications.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).