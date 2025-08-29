+++
title = "VBScript SelectSingleNode Method"
date = 2025-08-29T20:14:49.677+01:00
draft = false
description = "Learn about VBScript SelectSingleNode method, including XML parsing, node selection, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SelectSingleNode Method

last modified April 9, 2025

The SelectSingleNode method in VBScript is part of the XML DOM
(Document Object Model). It searches for the first node that matches a specified
XPath expression. This method is essential for parsing and extracting data from
XML documents. It returns a single node object or Nothing if no match is found.

SelectSingleNode enables precise XML data extraction with XPath
queries. It's commonly used in configuration file processing and web services.
This tutorial covers SelectSingleNode with practical examples to
demonstrate its usage in various scenarios.

## SelectSingleNode Method Overview

The SelectSingleNode method takes an XPath expression as its
parameter. It searches within the current node's descendants for a match. The
method is available on any XML DOM node object in VBScript scripting.

Key features include XPath 1.0 expression support and namespace-aware queries.
It returns Nothing if no matching node is found. Understanding this method helps
create robust XML processing scripts. Proper error handling is recommended when
working with the results.

## Basic XML Node Selection

This example demonstrates the simplest use of SelectSingleNode to
find a node by its name. It shows loading an XML string and selecting a specific
element. The selected node's text content is then displayed.

basic_selection.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;person&gt;&lt;name&gt;John Doe&lt;/name&gt;&lt;age&gt;30&lt;/age&gt;&lt;/person&gt;&lt;/root&gt;"

Set nameNode = xmlDoc.SelectSingleNode("//name")
WScript.Echo nameNode.text ' Output: John Doe

Set xmlDoc = Nothing

The script creates an XML DOM document and loads a simple XML string. It then
uses SelectSingleNode with "//name" XPath to find the name element.
The node's text content is displayed. This shows basic XML navigation.

## Selecting with Absolute Path

This example shows using an absolute XPath path to select a specific node. 
Absolute paths start from the document root. This approach is useful when you
know the exact structure of your XML document.

absolute_path.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;bookstore&gt;&lt;book&gt;&lt;title&gt;VBScript Guide&lt;/title&gt;&lt;price&gt;29.99&lt;/price&gt;&lt;/book&gt;&lt;/bookstore&gt;"

Set priceNode = xmlDoc.SelectSingleNode("/bookstore/book/price")
WScript.Echo priceNode.text ' Output: 29.99

Set xmlDoc = Nothing

The script loads a bookstore XML structure. It uses an absolute path
"/bookstore/book/price" to directly access the price element. This method is
precise but requires knowledge of the full document structure.

## Selecting with Attribute Condition

SelectSingleNode can select nodes based on attribute values using
XPath predicates. This example demonstrates finding a node where an attribute
matches a specific value. It's useful for filtering XML data.

attribute_condition.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xml = "&lt;users&gt;&lt;user id='101'&gt;Alice&lt;/user&gt;&lt;user id='102'&gt;Bob&lt;/user&gt;&lt;/users&gt;"
xmlDoc.loadXML xml

Set userNode = xmlDoc.SelectSingleNode("//user[@id='102']")
WScript.Echo userNode.text ' Output: Bob

Set xmlDoc = Nothing

The script loads user data with ID attributes. The XPath "//user[@id='102']"
finds the user node where id equals 102. This demonstrates attribute-based
selection, a powerful XML querying technique.

## Selecting with Namespace

This example shows how to handle XML documents with namespaces when using
SelectSingleNode. Namespaces require special handling in XPath
queries. The example demonstrates registering and using namespace prefixes.

namespace_selection.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.setProperty "SelectionNamespaces", "xmlns:ns='http://example.com'"
xml = "&lt;ns:root xmlns:ns='http://example.com'&gt;&lt;ns:item&gt;Data&lt;/ns:item&gt;&lt;/ns:root&gt;"
xmlDoc.loadXML xml

Set itemNode = xmlDoc.SelectSingleNode("//ns:item")
WScript.Echo itemNode.text ' Output: Data

Set xmlDoc = Nothing

The script first sets the SelectionNamespaces property to define a prefix for
the namespace. It then uses this prefix in the XPath query "//ns:item" to
select the namespaced node. This is essential for working with namespace-aware
XML documents.

## Selecting with Complex XPath

This example demonstrates a more complex XPath expression with
SelectSingleNode. It combines multiple conditions to precisely
select a specific node. This shows the full power of XPath in VBScript.

complex_xpath.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xml = "&lt;products&gt;&lt;product category='electronics'&gt;&lt;name&gt;TV&lt;/name&gt;&lt;price&gt;499&lt;/price&gt;&lt;/product&gt;" &amp; _
      "&lt;product category='furniture'&gt;&lt;name&gt;Chair&lt;/name&gt;&lt;price&gt;99&lt;/price&gt;&lt;/product&gt;&lt;/products&gt;"
xmlDoc.loadXML xml

Set node = xmlDoc.SelectSingleNode("//product[price&gt;100 and @category='electronics']/name")
WScript.Echo node.text ' Output: TV

Set xmlDoc = Nothing

The script loads product data and uses a complex XPath query. The expression
finds electronics products priced over 100 and selects their name. This
demonstrates combining attribute tests and value comparisons in XPath.

## Source

[XML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757828(v=vs.84))

In this article, we have explored the SelectSingleNode method in
VBScript, covering its usage and practical applications. From simple node
selection to complex XPath queries, these examples demonstrate powerful XML
processing capabilities. With this knowledge, you can effectively parse and
extract data from XML documents in your VBScript projects.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).