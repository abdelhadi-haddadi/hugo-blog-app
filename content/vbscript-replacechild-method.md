+++
title = "VBScript ReplaceChild Method"
date = 2025-08-29T20:14:48.563+01:00
draft = false
description = "Learn about VBScript ReplaceChild method, including XML node replacement, DOM manipulation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ReplaceChild Method

last modified April 9, 2025

The ReplaceChild method in VBScript is part of the XML DOM
(Document Object Model). It replaces a child node with another node within an
XML document structure. This method is essential for dynamic XML manipulation
in VBScript applications.

ReplaceChild requires both the new node and the node to be replaced.
It returns the replaced node if successful. This tutorial covers
ReplaceChild with practical examples to demonstrate its usage in
various scenarios.

## ReplaceChild Method Overview

The ReplaceChild method takes two parameters: the new node and the
old node to be replaced. It must be called on the parent node containing the
child to be replaced. The method is available through the XML DOM in VBScript.

Key features include node hierarchy maintenance and DOM structure integrity.
It throws an error if the old node isn't a child of the calling node.
ReplaceChild is fundamental for XML document manipulation.

## Basic Node Replacement

This example demonstrates the simplest use of ReplaceChild to
replace one element node with another. It shows loading XML, creating a new
node, and performing the replacement.

basic_replace.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;oldNode&gt;Content&lt;/oldNode&gt;&lt;/root&gt;"

Set newElem = xmlDoc.createElement("newNode")
newElem.text = "New Content"

Set oldNode = xmlDoc.documentElement.firstChild
xmlDoc.documentElement.replaceChild newElem, oldNode

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates an XML document with one child node. It then creates a new
node and replaces the existing one. The output shows the updated XML with the
new node in place of the old one.

## Replacing Text Nodes

This example shows how to replace a text node within an element using
ReplaceChild. It demonstrates working with different node types
in the XML DOM.

replace_textnode.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book&gt;&lt;title&gt;Old Title;&lt;title&gt;&lt;/book&gt;"

Set newText = xmlDoc.createTextNode("New Title")
Set oldText = xmlDoc.documentElement.firstChild.firstChild

xmlDoc.documentElement.firstChild.replaceChild newText, oldText
WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script loads XML with a book title. It creates a new text node and replaces
the existing title text. Note how we navigate to the text node child of the
title element before replacement.

## Replacing Attributes

While attributes aren't child nodes, this example shows how to simulate
attribute replacement using ReplaceChild with attribute nodes.
It demonstrates advanced DOM manipulation techniques.

replace_attribute.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;product id='123' status='old'/&gt;"

Set newAttr = xmlDoc.createAttribute("status")
newAttr.value = "new"

Set elem = xmlDoc.documentElement
Set oldAttr = elem.getAttributeNode("status")

elem.replaceChild newAttr, oldAttr
WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script replaces the status attribute by treating it as a child node.
This approach requires getting the attribute node first. The output shows
the updated attribute value in the XML.

## Conditional Node Replacement

This example demonstrates replacing nodes only when certain conditions are met.
It shows practical application of ReplaceChild in real-world
scenarios with decision logic.

conditional_replace.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;items&gt;&lt;item&gt;Apple&lt;/item&gt;&lt;item&gt;Orange&lt;/item&gt;&lt;/items&gt;"

Set newItem = xmlDoc.createElement("item")
newItem.text = "Banana"

For Each node In xmlDoc.documentElement.childNodes
    If node.text = "Orange" Then
        xmlDoc.documentElement.replaceChild newItem, node
        Exit For
    End If
Next

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script searches for a specific node value before performing replacement.
It only replaces the "Orange" item with "Banana". This pattern is useful for
selective XML modifications.

## Replacing with Imported Nodes

This advanced example shows how to replace nodes with nodes imported from
another document. It demonstrates cross-document node manipulation in VBScript.

import_replace.vbs
  

Set srcDoc = CreateObject("Microsoft.XMLDOM")
srcDoc.async = False
srcDoc.loadXML "&lt;newSection&gt;&lt;data&gt;Important&lt;/data&gt;&lt;/newSection&gt;"

Set mainDoc = CreateObject("Microsoft.XMLDOM")
mainDoc.async = False
mainDoc.loadXML "&lt;document&gt;&lt;section&gt;Old&lt;/section&gt;&lt;/document&gt;"

Set newNode = mainDoc.importNode(srcDoc.documentElement, True)
Set oldNode = mainDoc.documentElement.firstChild

mainDoc.documentElement.replaceChild newNode, oldNode
WScript.Echo mainDoc.xml

Set srcDoc = Nothing
Set mainDoc = Nothing

The script imports a node from one XML document to another before replacement.
The importNode method is used to make the node compatible. This
technique is useful for combining XML documents.

## Source

[XML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757828(v=vs.84))

In this article, we have explored the ReplaceChild method in VBScript,
covering its usage and practical applications. From simple node replacements to
advanced cross-document operations, these examples demonstrate powerful XML
manipulation. With this knowledge, you can enhance your XML processing scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).