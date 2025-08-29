+++
title = "VBScript GetElementsByTagName Method"
date = 2025-08-29T20:14:44.126+01:00
draft = false
description = "Learn about VBScript GetElementsByTagName method, including HTML parsing, element selection, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript GetElementsByTagName Method

last modified April 9, 2025

The GetElementsByTagName method in VBScript is part of the DOM
(Document Object Model) interface. It retrieves all elements with a specified
tag name from an HTML or XML document. This method returns a collection of
elements that can be iterated through. It's commonly used in web scraping and
document manipulation.

GetElementsByTagName enables efficient element selection without
knowing element IDs or classes. It works with both HTML and XML documents. This
tutorial covers GetElementsByTagName with practical examples to
demonstrate its usage.

## GetElementsByTagName Method Overview

The GetElementsByTagName method takes one parameter: the tag name
to search for. It returns a collection of elements matching the specified tag.
The method is available on document objects and individual element nodes in
VBScript.

Key features include case-insensitive matching in HTML documents and support for
wildcard selection. It searches through all descendants of the element it's
called on. Understanding this method helps create robust document processing
scripts.

## Basic Tag Name Selection

This example demonstrates the simplest use of GetElementsByTagName
to select all paragraph elements. It shows how to access the returned collection
and display element content. The script processes an HTML string in memory.

basic_tag_selection.vbs
  

Set htmlDoc = CreateObject("htmlfile")
htmlDoc.write "&lt;html&gt;&lt;body&gt;&lt;p&gt;First paragraph&lt;/p&gt;&lt;p&gt;Second paragraph&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;"

Set paragraphs = htmlDoc.getElementsByTagName("p")
For Each para In paragraphs
    WScript.Echo para.innerText
Next

Set htmlDoc = Nothing

The script creates an HTML document with two paragraphs. GetElementsByTagName
returns all paragraph elements. The loop displays each paragraph's text content.
This demonstrates basic tag-based element selection.

## Accessing Element Attributes

This example shows how to retrieve attributes from elements selected by tag name.
It demonstrates accessing the href attribute of anchor tags. The script processes
a simple HTML document with links.

element_attributes.vbs
  

Set htmlDoc = CreateObject("htmlfile")
htmlDoc.write "[Example](https://example.com)[Google](https://google.com)"

Set links = htmlDoc.getElementsByTagName("a")
For Each link In links
    WScript.Echo "Text: " &amp; link.innerText &amp; ", Href: " &amp; link.href
Next

Set htmlDoc = Nothing

The script creates an HTML document with two anchor tags. GetElementsByTagName
selects all anchor elements. The loop displays each link's text and URL. This
shows how to work with element attributes.

## Nested Element Selection

This example demonstrates selecting elements within a specific container. It
shows how to limit the scope of GetElementsByTagName to a div
element. The script processes an HTML document with nested structure.

nested_selection.vbs
  

Set htmlDoc = CreateObject("htmlfile")
htmlDoc.write "Content paragraph

Outside paragraph

"

Set contentDiv = htmlDoc.getElementById("content")
Set contentParagraphs = contentDiv.getElementsByTagName("p")

For Each para In contentParagraphs
    WScript.Echo "Content paragraph: " &amp; para.innerText
Next

Set htmlDoc = Nothing

The script creates an HTML document with paragraphs inside and outside a div.
GetElementsByTagName is called on the div element to select only
its child paragraphs. This demonstrates scoped element selection.

## Working with Tables

This example shows how to process HTML tables using GetElementsByTagName.
It demonstrates selecting table rows and cells to extract tabular data. The script
processes a simple HTML table structure.

table_processing.vbs
  

Set htmlDoc = CreateObject("htmlfile")
htmlDoc.write "&lt;html&gt;&lt;body&gt;&lt;table&gt;&lt;tr&gt;&lt;td&gt;Cell 1&lt;/td&gt;&lt;td&gt;Cell 2&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;Cell 3&lt;/td&gt;&lt;td&gt;Cell 4&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;&lt;/body&gt;&lt;/html&gt;"

Set rows = htmlDoc.getElementsByTagName("tr")
rowNum = 1

For Each row In rows
    Set cells = row.getElementsByTagName("td")
    cellText = ""
    For Each cell In cells
        cellText = cellText &amp; cell.innerText &amp; " | "
    Next
    WScript.Echo "Row " &amp; rowNum &amp; ": " &amp; cellText
    rowNum = rowNum + 1
Next

Set htmlDoc = Nothing

The script creates an HTML document with a simple table. GetElementsByTagName
first selects all table rows, then cells within each row. The nested loops
process the table structure to display cell contents. This shows hierarchical
element processing.

## Selecting Multiple Tag Types

This example demonstrates selecting multiple element types in a single operation.
It shows how to use the wildcard character (*) with GetElementsByTagName.
The script processes an HTML document with various elements.

wildcard_selection.vbs
  

Set htmlDoc = CreateObject("htmlfile")
htmlDoc.write "&lt;html&gt;&lt;body&gt;&lt;h1&gt;Title&lt;/h1&gt;&lt;p&gt;Paragraph&lt;/p&gt;&lt;div&gt;Division&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;"

Set allElements = htmlDoc.getElementsByTagName("*")
For Each elem In allElements
    WScript.Echo "Element: " &amp; elem.tagName &amp; ", Content: " &amp; elem.innerText
Next

Set htmlDoc = Nothing

The script creates an HTML document with various elements. GetElementsByTagName("*")
selects all elements in the document. The loop displays each element's tag name
and content. This demonstrates comprehensive document traversal.

## Source

[DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms536634(v=vs.84))

In this article, we have explored the GetElementsByTagName method in VBScript,
covering its usage and practical applications. From basic element selection to
complex document traversal, these examples demonstrate powerful HTML processing.
With this knowledge, you can enhance your web scraping and document manipulation
scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).