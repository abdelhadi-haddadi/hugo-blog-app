+++
title = "VBScript parentNode Property"
date = 2025-08-29T20:14:47.453+01:00
draft = false
description = "Learn about VBScript parentNode property, including DOM traversal, node relationships, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript parentNode Property

last modified April 9, 2025

The parentNode property in VBScript is a fundamental DOM property 
that returns the parent node of the specified node. It allows navigation upward 
through the document hierarchy. This property is read-only and available on all 
DOM nodes in VBScript.

parentNode is essential for DOM traversal and manipulation. It 
provides access to ancestor elements in the document tree. This tutorial covers 
parentNode with practical examples to demonstrate its usage.

## parentNode Property Overview

The parentNode property references the immediate parent of a node 
in the DOM tree. For document nodes, it returns Nothing. For element nodes, it 
returns the containing element. Text nodes return their parent element.

Key features include read-only access and null returns for document nodes. It 
works with all node types in the DOM hierarchy. Understanding this property 
helps create robust DOM navigation scripts.

## Basic parentNode Usage

This example demonstrates the simplest use of parentNode to access 
an element's parent. It shows how to navigate from a child element to its 
parent. The parent element's properties can then be accessed or modified.

basic_parentnode.vbs
  

Set doc = CreateObject("HTMLFILE")
doc.write "&lt;html&gt;&lt;body&gt;&lt;div id='child'&gt;Content&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;"
Set child = doc.getElementById("child")
Set parent = child.parentNode

WScript.Echo parent.tagName ' Output: BODY

The script creates an HTML document with a div element. It gets the div element 
by ID, then accesses its parent using parentNode. The parent's 
tagName is displayed, showing successful navigation.

## Checking for Document Node

This example shows how to handle cases where a node might be the document root. 
The parentNode of the document element returns Nothing. This 
demonstrates proper null checking in DOM traversal.

document_node.vbs
  

Set doc = CreateObject("HTMLFILE")
doc.write "&lt;html&gt;&lt;body&gt;&lt;/body&gt;&lt;/html&gt;"
Set htmlElement = doc.documentElement
Set parent = htmlElement.parentNode

If parent Is Nothing Then
    WScript.Echo "This is the document root"
Else
    WScript.Echo parent.tagName
End If

The script checks the parentNode of the HTML element. Since it's the document 
root, the parent is Nothing. This example shows important null checking when 
working with DOM hierarchies.

## Navigating Multiple Levels

parentNode can be chained to navigate multiple levels up the DOM 
tree. This example shows accessing a grandparent element by using 
parentNode twice. Each call moves one level up the hierarchy.

multi_level.vbs
  

Set doc = CreateObject("HTMLFILE")
doc.write "&lt;html&gt;&lt;body&gt;&lt;div&gt;&lt;p id='para'&gt;Text&lt;/p&gt;&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;"
Set para = doc.getElementById("para")
Set grandparent = para.parentNode.parentNode

WScript.Echo grandparent.tagName ' Output: BODY

The script starts with a paragraph element, moves to its parent div, then to the 
body element. This demonstrates multi-level DOM traversal using chained 
parentNode properties.

## Modifying Parent Element

This example shows how to modify a parent element after accessing it through 
parentNode. The parent element's style can be changed, or other 
properties manipulated. This demonstrates practical DOM modification.

modify_parent.vbs
  

Set doc = CreateObject("HTMLFILE")
doc.write "&lt;html&gt;&lt;body&gt;&lt;div id='child'&gt;Content&lt;/div&gt;&lt;/body&gt;&lt;/html&gt;"
Set child = doc.getElementById("child")
Set parent = child.parentNode

parent.style.backgroundColor = "yellow"
WScript.Echo parent.style.backgroundColor ' Output: yellow

The script accesses a child element's parent and changes its background color. 
This shows how parentNode enables not just navigation but also 
modification of ancestor elements in the DOM.

## Event Handling with parentNode

This advanced example demonstrates using parentNode in event 
handling. The parent of an event target can be accessed to implement event 
delegation. This is useful for dynamic content.

event_handling.vbs
  

Set doc = CreateObject("HTMLFILE")
doc.write "&lt;html&gt;&lt;body&gt;&lt;ul id='list'&gt;&lt;li&gt;Item 1&lt;/li&gt;&lt;li&gt;Item 2&lt;/li&gt;&lt;/ul&gt;&lt;/body&gt;&lt;/html&gt;"
Set list = doc.getElementById("list")

' Simulate event handling
Function HandleClick(element)
    Set parent = element.parentNode
    WScript.Echo "Clicked item's parent ID: " &amp; parent.id
End Function

' Simulate click on first list item
Set firstItem = list.getElementsByTagName("li")(0)
HandleClick(firstItem) ' Output: Clicked item's parent ID: list

The script simulates event handling where the parent of a clicked element is 
accessed. This pattern is common in event delegation scenarios. The parent's ID 
is displayed to confirm successful navigation.

## Source

[DOM Node Properties Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms533697(v=vs.85))

In this article, we have explored the parentNode property in 
VBScript, covering its usage and practical applications. From basic navigation 
to event handling, these examples demonstrate DOM traversal techniques. With 
this knowledge, you can enhance your VBScript DOM manipulation capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).