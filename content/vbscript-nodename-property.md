+++
title = "VBScript nodeName Property"
date = 2025-08-29T20:14:46.342+01:00
draft = false
description = "Learn about VBScript nodeName property, including XML/HTML DOM navigation, node types, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript nodeName Property

last modified April 9, 2025

The nodeName property in VBScript returns the name of a node in the
DOM (Document Object Model). It's a read-only property available on all node
types. The returned value depends on the node type, providing identification
for elements, attributes, and other node types.

For element nodes, nodeName returns the tag name in uppercase. For
attribute nodes, it returns the attribute name. Text nodes return "#text". This
property is essential for navigating and manipulating XML/HTML documents in
VBScript.

## nodeName Property Overview

The nodeName property is part of the DOM Core specification. It
provides a standardized way to identify node types in a document tree. The
property works with both XML and HTML documents when processed through the DOM.

Different node types return different values from nodeName. Element
nodes return their tag name, attribute nodes return their attribute name.
Document nodes return "#document". Understanding these values helps in DOM
navigation and manipulation.

## Getting Element Node Names

This example demonstrates how to retrieve the name of an element node. We'll
load a simple XML document and examine the nodeName of its root element. The
example shows basic XML parsing in VBScript.

element_nodename.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book&gt;&lt;title&gt;VBScript Guide;&lt;title&gt;&lt;/book&gt;"

Set root = xmlDoc.documentElement
WScript.Echo "Root node name: " &amp; root.nodeName ' Output: BOOK

Set xmlDoc = Nothing

The script creates an XML DOM object and loads a simple XML string. It accesses
the documentElement (root node) and displays its nodeName. Note that element
names are returned in uppercase by default in VBScript's XML DOM.

## Examining Different Node Types

This example shows how nodeName behaves with different node types.
We'll examine an element, its attribute, and a text node. Each node type returns
a different value from the nodeName property.

node_types.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;product id='101'&gt;&lt;name&gt;Widget&lt;/name&gt;&lt;/product&gt;"

Set product = xmlDoc.documentElement
Set attr = product.getAttributeNode("id")
Set text = product.firstChild.firstChild

WScript.Echo "Element: " &amp; product.nodeName    ' Output: PRODUCT
WScript.Echo "Attribute: " &amp; attr.nodeName    ' Output: id
WScript.Echo "Text node: " &amp; text.nodeName    ' Output: #text

Set xmlDoc = Nothing

The script loads XML with an element, attribute, and text content. It displays
nodeName for each node type. Notice the attribute keeps its original case while
the element name is uppercase. Text nodes return the special value "#text".

## Navigating HTML Document Structure

This example demonstrates using nodeName to navigate an HTML
document. We'll examine the node names at different levels of a simple HTML
structure. The example shows how to traverse the DOM tree.

html_navigation.vbs
  

Set htmlDoc = CreateObject("htmlfile")
htmlDoc.write "&lt;html&gt;&lt;body&gt;&lt;h1&gt;Welcome&lt;/h1&gt;&lt;p&gt;Content&lt;/p&gt;&lt;/body&gt;&lt;/html&gt;"

Set html = htmlDoc.documentElement
Set body = html.firstChild
Set heading = body.firstChild

WScript.Echo "HTML: " &amp; html.nodeName    ' Output: HTML
WScript.Echo "BODY: " &amp; body.nodeName    ' Output: BODY
WScript.Echo "H1: " &amp; heading.nodeName   ' Output: H1

Set htmlDoc = Nothing

The script creates an HTML document object and writes simple HTML content. It
then navigates from the root HTML element down to the H1 element. Each node's
name is displayed, showing the hierarchical structure of the document.

## Processing XML with Node Names

This example shows a practical use of nodeName to process XML data.
We'll iterate through child nodes and perform actions based on their names. The
script demonstrates conditional processing using node names.

xml_processing.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;data&gt;&lt;item&gt;A&lt;/item&gt;&lt;note&gt;Important&lt;/note&gt;&lt;item&gt;B&lt;/item&gt;&lt;/data&gt;"

Set root = xmlDoc.documentElement
For Each node In root.childNodes
    If node.nodeName = "ITEM" Then
        WScript.Echo "Found item: " &amp; node.text
    ElseIf node.nodeName = "NOTE" Then
        WScript.Echo "Found note: " &amp; node.text
    End If
Next

Set xmlDoc = Nothing

The script loads XML containing different element types. It loops through child
nodes and checks their nodeName values. Based on the element name, it performs
different actions. This pattern is common in XML processing scripts.

## Comparing nodeName and tagName

This example compares the nodeName property with the
tagName property. While similar for elements, they behave
differently for other node types. The script demonstrates these differences.

nodename_tagname.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;element attr='value'&gt;Text&lt;/element&gt;&lt;/root&gt;"

Set elem = xmlDoc.documentElement.firstChild
Set attr = elem.getAttributeNode("attr")
Set text = elem.firstChild

WScript.Echo "Element nodeName: " &amp; elem.nodeName  ' Output: ELEMENT
WScript.Echo "Element tagName: " &amp; elem.tagName    ' Output: ELEMENT
WScript.Echo "Attribute nodeName: " &amp; attr.nodeName ' Output: attr
WScript.Echo "Text nodeName: " &amp; text.nodeName     ' Output: #text

Set xmlDoc = Nothing

The script shows that for elements, nodeName and tagName return the same value.
However, tagName is undefined for non-element nodes. nodeName works consistently
across all node types, making it more versatile for DOM navigation.

## Source

[XML DOM Reference](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms534184(v=vs.84))

In this article, we have explored the nodeName property in VBScript,
covering its behavior with different node types and practical applications. From
simple XML parsing to complex document navigation, these examples demonstrate
how nodeName helps identify and process nodes. With this knowledge, you can
write more robust DOM processing scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).