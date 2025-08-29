+++
title = "VBScript XML DOM (MSXML)"
date = 2025-08-29T20:15:47.733+01:00
draft = false
description = "Learn how to work with XML documents in VBScript using MSXML DOM. Understand parsing, creating, and manipulating XML with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript XML DOM (MSXML)

last modified April 4, 2025

VBScript can work with XML documents using Microsoft XML Core Services (MSXML).
This tutorial covers the XML DOM objects and methods available in MSXML. You'll
learn how to parse, create, and manipulate XML documents in VBScript with
practical examples.

## XML DOM Overview

The XML Document Object Model (DOM) provides a programming interface for XML
documents. MSXML is Microsoft's implementation of the XML DOM. It allows you to
load, parse, modify, and save XML documents programmatically.

Key objects in MSXML include DOMDocument, IXMLDOMNode,
IXMLDOMNodeList, and IXMLDOMElement. These objects
provide methods to navigate and manipulate XML documents. We'll explore each
with examples in the following sections.

## Loading and Parsing an XML File

This example demonstrates how to load and parse an XML file using MSXML. The
DOMDocument object is used to load the XML file. We then traverse
the document to display its contents.

load_xml.vbs
  

Dim xmlDoc, root, books, book
Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("books.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

Set root = xmlDoc.documentElement
Set books = root.getElementsByTagName("book")

For Each book In books
    WScript.Echo "Title: " &amp; book.getAttribute("title")
    WScript.Echo "Author: " &amp; book.getAttribute("author")
Next

This script loads an XML file named books.xml. It checks for parsing errors
using the parseError object. Then it retrieves all book elements and displays
their title and author attributes. The async property is set to false for
synchronous loading.

## Creating a New XML Document

This example shows how to create a new XML document from scratch. We'll use the
DOMDocument object and its methods to create elements and
attributes. The resulting XML will be saved to a file.

create_xml.vbs
  

Dim xmlDoc, root, employee, name, position
Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")

' Create processing instruction and root element
xmlDoc.appendChild xmlDoc.createProcessingInstruction("xml", "version='1.0'")
Set root = xmlDoc.createElement("employees")
xmlDoc.appendChild root

' Create employee element
Set employee = xmlDoc.createElement("employee")
root.appendChild employee

' Add attributes to employee
employee.setAttribute "id", "1001"

' Create child elements
Set name = xmlDoc.createElement("name")
name.text = "John Smith"
employee.appendChild name

Set position = xmlDoc.createElement("position")
position.text = "Software Developer"
employee.appendChild position

' Save to file
xmlDoc.save "employees.xml"
WScript.Echo "XML document created successfully"

This script creates a new XML document with employee data. It starts with the
XML declaration, creates a root element, and adds child elements with text
content. Finally, it saves the document to a file. Each step demonstrates
different DOM methods for building XML structures.

## Modifying an Existing XML Document

This example demonstrates how to modify an existing XML document. We'll load an
XML file, make changes to its content, and save the modified version. The
example shows adding, updating, and removing nodes.

modify_xml.vbs
  

Dim xmlDoc, root, books, newBook
Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("books.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

Set root = xmlDoc.documentElement
Set books = root.getElementsByTagName("book")

' Update first book's title
If books.length &gt; 0 Then
    books(0).setAttribute "title", "Updated Title"
End If

' Add a new book
Set newBook = xmlDoc.createElement("book")
newBook.setAttribute "title", "New Book"
newBook.setAttribute "author", "New Author"
root.appendChild newBook

' Remove the last book
If books.length &gt; 1 Then
    root.removeChild books(books.length - 1)
End If

' Save changes
xmlDoc.save "books_modified.xml"
WScript.Echo "XML document modified successfully"

This script loads an XML file, updates an existing book's title, adds a new
book, and removes the last book. It demonstrates common modification operations
using DOM methods. The changes are then saved to a new file, preserving the
original.

## Searching XML with XPath

XPath is a powerful query language for selecting nodes in an XML document. This
example shows how to use XPath expressions with MSXML to find specific nodes.
We'll search for books by a particular author.

xpath_search.vbs
  

Dim xmlDoc, nodeList, node
Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("books.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

' Set selection language to XPath
xmlDoc.setProperty "SelectionLanguage", "XPath"

' Find books by specific author
Set nodeList = xmlDoc.selectNodes("//book[@author='J.R.R. Tolkien']")

If nodeList.length &gt; 0 Then
    WScript.Echo "Found " &amp; nodeList.length &amp; " books by J.R.R. Tolkien:"
    For Each node In nodeList
        WScript.Echo "- " &amp; node.getAttribute("title")
    Next
Else
    WScript.Echo "No books found by J.R.R. Tolkien"
End If

This script uses XPath to search for books by a specific author. The
selectNodes method executes the XPath query, returning a node list.
We then iterate through the results. XPath provides flexible querying
capabilities beyond simple element name searches.

## Handling XML Namespaces

XML namespaces prevent element name conflicts in complex documents. This example
demonstrates how to work with namespaced XML in VBScript. We'll load a document
with namespaces and access its elements.

namespaces.vbs
  

Dim xmlDoc, root, ns, products, product
Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("products.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

' Set up namespace manager
Set ns = CreateObject("MSXML2.IXMLDOMSchemaCollection")
xmlDoc.setProperty "SelectionNamespaces", "xmlns:p='http://example.com/products'"

' Access elements with namespace prefix
Set root = xmlDoc.documentElement
Set products = xmlDoc.selectNodes("//p:product")

WScript.Echo "Found " &amp; products.length &amp; " products:"
For Each product In products
    WScript.Echo "ID: " &amp; product.getAttribute("id") &amp; _
                 ", Name: " &amp; product.selectSingleNode("p:name").text
Next

This script handles an XML document with namespaces. We use the
SelectionNamespaces property to declare namespace prefixes. The
XPath queries then use these prefixes to access namespaced elements. This
approach is essential for working with standardized XML formats like SOAP or
XHTML.

## Source

[MSXML Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms763742(v=vs.85))

In this article, we have explored the fundamentals of working with XML in
VBScript using MSXML. From loading and parsing to creating and modifying XML
documents, these examples provide a solid foundation. With these techniques,
you can integrate XML processing into your VBScript automation tasks
effectively.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).