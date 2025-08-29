+++
title = "VBScript MSXML2.IXMLDOMElement Object"
date = 2025-08-29T20:14:44.114+01:00
draft = false
description = "Learn about VBScript MSXML2.IXMLDOMElement Object, including XML element manipulation, attributes, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript MSXML2.IXMLDOMElement Object

last modified April 9, 2025

The MSXML2.IXMLDOMElement object in VBScript represents an element 
node in an XML document. It is part of the Microsoft XML Core Services (MSXML) 
library. This object provides methods and properties to manipulate XML elements.

IXMLDOMElement allows accessing element attributes, child nodes, 
and text content. It inherits from IXMLDOMNode with additional 
element-specific features. This tutorial covers IXMLDOMElement with 
practical examples to demonstrate its usage.

## IXMLDOMElement Object Overview

The IXMLDOMElement interface represents XML elements in a DOM tree.
It provides access to element name, attributes, and child nodes. Key properties 
include tagName, attributes, and text.

Important methods include getAttribute, setAttribute, 
and removeAttribute. The object supports namespace operations and 
XPath queries. Understanding this interface is essential for XML processing in 
VBScript.

## Creating and Accessing an XML Element

This example demonstrates creating an XML document and accessing an element. 
It shows how to create a DOM document and retrieve an element reference. The 
script creates a simple XML structure and accesses the root element.

basic_element.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;person&gt;&lt;name&gt;John&lt;/name&gt;&lt;/person&gt;&lt;/root&gt;"

Set rootElement = xmlDoc.documentElement
WScript.Echo "Root element: " &amp; rootElement.tagName

Set personElement = rootElement.firstChild
WScript.Echo "First child: " &amp; personElement.tagName

Set xmlDoc = Nothing

The script creates an XML document with a root element and child elements. 
documentElement property gets the root element. The 
tagName property displays the element names. This shows basic 
element access in an XML document.

## Working with Element Attributes

This example demonstrates attribute manipulation on an XML element. It shows how 
to set, get, and remove attributes. The script creates an element and modifies 
its attributes programmatically.

element_attributes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set element = xmlDoc.createElement("product")
element.setAttribute "id", "P1001"
element.setAttribute "category", "Electronics"

WScript.Echo "ID: " &amp; element.getAttribute("id")
WScript.Echo "Category: " &amp; element.getAttribute("category")

element.removeAttribute "category"
WScript.Echo "Category after removal: " &amp; element.getAttribute("category")

Set xmlDoc = Nothing

The script creates a product element and adds two attributes. It retrieves 
attribute values using getAttribute. The removeAttribute 
method demonstrates attribute removal. This shows complete attribute management.

## Accessing Element Text Content

This example shows how to work with element text content. It demonstrates 
different ways to access and modify element text. The script creates elements 
with text content and manipulates it.

element_text.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.loadXML "&lt;book&gt;&lt;title&gt;VBScript Programming&lt;/title&gt;&lt;/book&gt;"

Set titleElement = xmlDoc.documentElement.firstChild
WScript.Echo "Text content: " &amp; titleElement.text

titleElement.text = "Advanced VBScript"
WScript.Echo "Modified text: " &amp; titleElement.text

Set xmlDoc = Nothing

The script loads an XML document with a book title. It accesses the text content 
using the text property. The example then modifies the text content 
and displays the change. This demonstrates simple text manipulation.

## Creating Nested XML Elements

This example demonstrates building a complex XML structure with nested elements.
It shows how to create elements and append them as children. The script 
constructs an XML document programmatically.

nested_elements.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set root = xmlDoc.createElement("employees")
xmlDoc.appendChild root

Set employee = xmlDoc.createElement("employee")
employee.setAttribute "id", "E101"
root.appendChild employee

Set name = xmlDoc.createElement("name")
name.text = "Alice Johnson"
employee.appendChild name

WScript.Echo xmlDoc.xml

Set xmlDoc = Nothing

The script creates an employees root element with nested employee elements. Each 
employee has attributes and child elements. The complete structure is built 
programmatically. The xml property outputs the final XML document.

## Searching Elements with XPath

This example demonstrates using XPath to find specific elements. It shows how to 
query elements based on their attributes or position. The script loads an XML 
document and performs XPath queries.

xpath_search.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;products&gt;&lt;product id='1'&gt;Laptop&lt;/product&gt;" &amp; _
               "&lt;product id='2'&gt;Phone&lt;/product&gt;&lt;/products&gt;"

Set products = xmlDoc.selectNodes("//product[@id='2']")
For Each product In products
    WScript.Echo "Found product: " &amp; product.text
Next

Set xmlDoc = Nothing

The script loads an XML document with product elements. It uses XPath to find 
products with specific attributes. The selectNodes method returns 
matching elements. This demonstrates powerful XML querying capabilities.

## Source

[MSXML2.IXMLDOMElement Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms763774(v=vs.85))

In this article, we have explored the MSXML2.IXMLDOMElement object 
in VBScript, covering its usage and practical applications. From basic element 
manipulation to complex XML processing, these examples demonstrate essential 
XML handling techniques. With this knowledge, you can effectively work with XML 
in your VBScript applications.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).