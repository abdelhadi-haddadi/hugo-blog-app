+++
title = "VBScript CloneNode Method"
date = 2025-08-29T20:14:41.906+01:00
draft = false
description = "Learn about VBScript CloneNode method, including node cloning, XML operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript CloneNode Method

last modified April 9, 2025

The CloneNode method in VBScript is part of the XML DOM (Document
Object Model). It creates a duplicate of a specified node from an XML document.
This method is essential for XML manipulation and document processing in VBScript.
It allows copying nodes while optionally including child nodes.

CloneNode provides control over whether to perform a deep or shallow
copy of the node. Understanding this method is crucial for advanced XML
processing. This tutorial covers CloneNode with practical examples
to demonstrate its usage in various scenarios.

## CloneNode Method Overview

The CloneNode method takes one parameter: a boolean value
indicating whether to clone all child nodes. When true, it performs a deep copy
including all descendants. When false, it only clones the node itself.

Key features include preserving node attributes and namespace information. The
method returns a new node object identical to the original. Cloned nodes are
initially not part of any document tree. They must be explicitly inserted into
the document structure.

## Basic Node Cloning

This example demonstrates the simplest use of CloneNode to create a
copy of an XML element. It shows both shallow and deep cloning operations. The
resulting nodes are examined to show the differences.

basic_clonenode.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book&gt;&lt;title&gt;Learning VBScript;&lt;title&gt;&lt;/book&gt;"

Set originalNode = xmlDoc.documentElement
Set shallowCopy = originalNode.cloneNode(False)
Set deepCopy = originalNode.cloneNode(True)

WScript.Echo "Shallow copy XML: " &amp; shallowCopy.xml
WScript.Echo "Deep copy XML: " &amp; deepCopy.xml

Set xmlDoc = Nothing

The script creates an XML document and clones its root element. The shallow copy
contains only the book element without children. The deep copy
includes both the book element and its title child.

## Cloning with Attributes

This example shows how CloneNode handles element attributes during
cloning. Both shallow and deep copies preserve all attributes of the original
node. Attribute values remain identical in the cloned nodes.

cloning_attributes.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;book id='101' category='Programming'&gt;&lt;/book&gt;"

Set bookNode = xmlDoc.documentElement
Set clonedNode = bookNode.cloneNode(True)

WScript.Echo "Original attributes: " &amp; bookNode.xml
WScript.Echo "Cloned attributes: " &amp; clonedNode.xml

Set xmlDoc = Nothing

The script clones a book element with two attributes. The cloned
node contains identical attribute values. This demonstrates that attribute
information is preserved regardless of the deep parameter value.

## Inserting Cloned Nodes

This example demonstrates how to clone a node and insert it back into the
document. It shows the complete workflow from cloning to document modification.
The cloned node becomes part of the document structure.

inserting_clones.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;library&gt;&lt;book&gt;Title 1&lt;/book&gt;&lt;/library&gt;"

Set library = xmlDoc.documentElement
Set firstBook = library.firstChild
Set clonedBook = firstBook.cloneNode(True)

library.appendChild clonedBook
WScript.Echo "Modified XML: " &amp; xmlDoc.xml

Set xmlDoc = Nothing

The script clones a book node and appends it to the library. The resulting XML
contains two identical book elements. This pattern is useful for duplicating
template nodes in XML documents.

## Cloning Different Node Types

CloneNode works with various XML node types beyond just elements.
This example demonstrates cloning text nodes and comment nodes. Each node type
behaves slightly differently when cloned.

node_types.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;!-- Comment --&gt;Text node&lt;/root&gt;"

Set comment = xmlDoc.documentElement.firstChild
Set textNode = xmlDoc.documentElement.lastChild

Set clonedComment = comment.cloneNode(True)
Set clonedText = textNode.cloneNode(True)

WScript.Echo "Cloned comment: " &amp; clonedComment.xml
WScript.Echo "Cloned text: " &amp; clonedText.xml

Set xmlDoc = Nothing

The script clones a comment node and a text node from an XML document. Both
clones retain their original content. This demonstrates CloneNode's
versatility across different node types.

## Cloning with Namespaces

This advanced example shows how CloneNode handles namespaced XML
elements. Namespace declarations and prefixes are preserved in the cloned nodes.
The example uses a document with namespace definitions.

namespaces.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;ns:book xmlns:ns='http://example.com'/&gt;"

Set bookNode = xmlDoc.documentElement
Set clonedNode = bookNode.cloneNode(True)

WScript.Echo "Cloned namespaced node: " &amp; clonedNode.xml

Set xmlDoc = Nothing

The script clones a namespaced XML element. The cloned node maintains the
original namespace declaration. This behavior is crucial for working with complex
XML documents using namespaces.

## Source

[XML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757828(v=vs.84))

In this article, we have explored the CloneNode method in VBScript,
covering its usage and practical applications. From simple node copies to complex
namespace handling, these examples demonstrate reliable XML node cloning. With
this knowledge, you can enhance your XML processing scripts with robust node
manipulation capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).