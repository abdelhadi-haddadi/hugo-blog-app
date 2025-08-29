+++
title = "VBScript MSXML2.DOMDocument Object"
date = 2025-08-29T20:14:43.018+01:00
draft = false
description = "Learn about VBScript MSXML2.DOMDocument object, including XML parsing, document creation, and manipulation. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript MSXML2.DOMDocument Object

last modified April 9, 2025

The MSXML2.DOMDocument object in VBScript provides XML document 
parsing and manipulation capabilities. It's part of Microsoft's XML Core 
Services (MSXML). This object enables loading, creating, and modifying XML 
documents programmatically.

MSXML2.DOMDocument supports XPath queries and XSLT transformations.
It's widely used for configuration files, data exchange, and web services. This
tutorial covers DOMDocument with practical examples to demonstrate its usage.

## DOMDocument Object Overview

The MSXML2.DOMDocument object represents an XML document in memory.
It provides methods to load, save, and navigate XML data. The object implements
the W3C DOM (Document Object Model) Level 1 and Level 2 specifications.

Key properties include async, documentElement, and
parseError. Important methods are load,
save, and selectNodes. Understanding this object helps
create robust XML processing scripts.

## Loading and Parsing an XML File

This example demonstrates loading an XML file from disk and parsing its contents.
It shows basic error handling and document navigation. The script checks for
loading errors before processing.

load_xml_file.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.validateOnParse = True

If xmlDoc.Load("C:\data\books.xml") Then
    Set root = xmlDoc.documentElement
    WScript.Echo "Root element: " &amp; root.nodeName
Else
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
End If

Set xmlDoc = Nothing

The script creates a DOMDocument object and sets async to false for
synchronous loading. It attempts to load "books.xml" and checks the result. If
successful, it displays the root element name. Otherwise, it shows the error.

## Creating a New XML Document

This example shows how to create a new XML document from scratch. It
demonstrates adding elements, attributes, and text nodes. The resulting document
is saved to disk.

create_xml.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set root = xmlDoc.createElement("Catalog")
xmlDoc.appendChild root

Set book = xmlDoc.createElement("Book")
book.setAttribute "id", "101"
root.appendChild book

Set title = xmlDoc.createElement("Title")
title.Text = "VBScript Programming"
book.appendChild title

xmlDoc.Save "C:\data\new_catalog.xml"
Set xmlDoc = Nothing

The script creates a new XML document with a root "Catalog" element. It adds a
"Book" element with an id attribute. A "Title" element with text content is
added to the book. Finally, the document is saved to "new_catalog.xml".

## Querying XML with XPath

This example demonstrates using XPath to query specific nodes in an XML
document. It shows how to select nodes matching criteria and iterate through
results. XPath provides powerful query capabilities.

xpath_query.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.Load "C:\data\books.xml"

Set books = xmlDoc.selectNodes("//Book[@category='Programming']")
For Each book In books
    Set title = book.selectSingleNode("Title")
    WScript.Echo title.Text
Next

Set xmlDoc = Nothing

The script loads an XML file and selects all Book elements with category
"Programming". It iterates through matching nodes and displays their titles.
XPath expressions provide flexible query options for XML data extraction.

## Modifying an XML Document

This example shows how to modify existing XML content. It demonstrates updating
element values and adding new nodes. The modified document is then saved back to
disk.

modify_xml.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.Load "C:\data\books.xml"

Set price = xmlDoc.selectSingleNode("//Book[1]/Price")
price.Text = "29.99"

Set book = xmlDoc.selectSingleNode("//Book[last()]")
Set newBook = book.cloneNode(True)
newBook.setAttribute "id", "105"
xmlDoc.documentElement.appendChild newBook

xmlDoc.Save "C:\data\books_updated.xml"
Set xmlDoc = Nothing

The script loads an XML file and updates the price of the first book. It then
clones the last book, changes its id, and appends it to the document. Finally,
the modified document is saved with a new filename.

## Transforming XML with XSLT

This example demonstrates transforming XML to HTML using XSLT. It shows loading
both XML and XSLT files and performing the transformation. The result is saved
as an HTML file.

xslt_transform.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set xslDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xslDoc.async = False

xmlDoc.Load "C:\data\books.xml"
xslDoc.Load "C:\data\books.xsl"

Set fso = CreateObject("Scripting.FileSystemObject")
Set outFile = fso.CreateTextFile("C:\data\books.html", True)
outFile.Write xmlDoc.transformNode(xslDoc)
outFile.Close

Set xmlDoc = Nothing
Set xslDoc = Nothing
Set fso = Nothing

The script loads both XML and XSLT documents. It performs the transformation
using transformNode. The resulting HTML is saved to a file. XSLT
provides powerful XML transformation capabilities for presentation.

## Source

[MSXML2.DOMDocument Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms763742(v=vs.85))

In this article, we have explored the MSXML2.DOMDocument object in
VBScript, covering its usage and practical applications. From basic loading to
advanced transformations, these examples demonstrate XML processing. With this
knowledge, you can enhance your scripts with robust XML handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).