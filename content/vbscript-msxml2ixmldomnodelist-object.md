+++
title = "VBScript MSXML2.IXMLDOMNodeList Object"
date = 2025-08-29T20:14:45.236+01:00
draft = false
description = "Learn about VBScript MSXML2.IXMLDOMNodeList Object, including XML node traversal, manipulation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript MSXML2.IXMLDOMNodeList Object

last modified April 9, 2025

The MSXML2.IXMLDOMNodeList object in VBScript represents a collection 
of XML nodes. It is part of the Microsoft XML Core Services (MSXML) library. 
This object provides methods to access and manipulate nodes in an XML document. 
It is commonly returned by methods like getElementsByTagName.

IXMLDOMNodeList allows iteration through nodes and accessing them 
by index. It maintains the order of nodes as they appear in the XML document. 
This tutorial covers IXMLDOMNodeList with practical examples to 
demonstrate its usage in VBScript.

## IXMLDOMNodeList Object Overview

The IXMLDOMNodeList interface provides several key properties and 
methods. The length property returns the number of nodes in the 
collection. The item method retrieves a node by its index position.

Nodes in the collection are zero-indexed. The object is live, meaning changes 
to the XML document are reflected automatically. Understanding this object is 
essential for effective XML processing in VBScript applications.

## Basic NodeList Iteration

This example demonstrates how to load an XML document and iterate through all 
nodes in a NodeList. We'll use the getElementsByTagName method to 
retrieve all elements with a specific tag name.

basic_nodelist.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("books.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

Set bookNodes = xmlDoc.getElementsByTagName("book")

For i = 0 To bookNodes.length - 1
    WScript.Echo "Book Title: " &amp; bookNodes.item(i).getAttribute("title")
Next

Set bookNodes = Nothing
Set xmlDoc = Nothing

The script loads an XML file and retrieves all book elements. 
It then iterates through the NodeList using a For loop. For each node, it 
outputs the value of the title attribute. The length 
property determines the loop bounds.

## Accessing Specific Nodes in a NodeList

This example shows how to access specific nodes in a NodeList by index. 
We'll demonstrate both direct access and checking for node existence before 
access. This is useful when you need specific nodes rather than iterating all.

specific_nodes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("employees.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

Set empNodes = xmlDoc.getElementsByTagName("employee")

' Access first employee
If empNodes.length &gt; 0 Then
    WScript.Echo "First employee: " &amp; empNodes.item(0).text
End If

' Access third employee if exists
If empNodes.length &gt;= 3 Then
    WScript.Echo "Third employee: " &amp; empNodes.item(2).text
Else
    WScript.Echo "Third employee not found"
End If

Set empNodes = Nothing
Set xmlDoc = Nothing

The script checks the NodeList length before accessing specific indices. 
This prevents errors when trying to access non-existent nodes. The item 
method retrieves nodes by their zero-based position. Always validate the 
NodeList length before accessing specific indices.

## Modifying Nodes in a NodeList

This example demonstrates how to modify nodes within a NodeList. Since 
NodeList is live, changes to nodes are immediately reflected in the XML 
document. We'll update attribute values for all matching nodes.

modify_nodes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("products.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

Set productNodes = xmlDoc.getElementsByTagName("product")

For i = 0 To productNodes.length - 1
    productNodes.item(i).setAttribute "status", "active"
Next

' Save modified XML
xmlDoc.save "products_updated.xml"

Set productNodes = Nothing
Set xmlDoc = Nothing

The script loads an XML file and retrieves all product elements. 
It then iterates through the NodeList and updates each product's status 
attribute. The changes are immediately reflected in the NodeList and saved to 
a new file. This demonstrates the live nature of NodeList collections.

## Filtering Nodes in a NodeList

While NodeList doesn't have built-in filtering, we can implement custom 
filtering logic. This example shows how to process only nodes that meet 
specific criteria. We'll check attribute values during iteration.

filter_nodes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("orders.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

Set orderNodes = xmlDoc.getElementsByTagName("order")
WScript.Echo "Processing high-value orders:"

For i = 0 To orderNodes.length - 1
    Set order = orderNodes.item(i)
    amount = CDbl(order.getAttribute("amount"))
    
    If amount &gt; 1000 Then
        WScript.Echo "Order ID: " &amp; order.getAttribute("id") &amp; _
                     ", Amount: $" &amp; amount
    End If
Next

Set orderNodes = Nothing
Set xmlDoc = Nothing

The script processes only orders with amounts greater than $1000. It demonstrates 
how to implement custom filtering logic when working with NodeList. Each node's 
attributes are examined during iteration to determine if processing should occur. 
This pattern is useful for selective node processing.

## Converting NodeList to Array

Sometimes it's useful to convert a NodeList to an array for easier manipulation. 
This example shows how to create an array from a NodeList. We'll preserve node 
references in the array for later processing.

nodelist_to_array.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument.6.0")
xmlDoc.async = False
xmlDoc.load("customers.xml")

If xmlDoc.parseError.errorCode &lt;&gt; 0 Then
    WScript.Echo "Error loading XML: " &amp; xmlDoc.parseError.reason
    WScript.Quit
End If

Set customerNodes = xmlDoc.getElementsByTagName("customer")

' Create array to hold nodes
Dim customerArray()
ReDim customerArray(customerNodes.length - 1)

' Populate array
For i = 0 To customerNodes.length - 1
    Set customerArray(i) = customerNodes.item(i)
Next

' Process array
For Each cust In customerArray
    WScript.Echo "Customer: " &amp; cust.getAttribute("name")
Next

Set customerNodes = Nothing
Set xmlDoc = Nothing

The script creates an array sized to match the NodeList length. It then copies 
each node reference into the array. The array can be processed independently of 
the original NodeList. This technique is useful when you need to work with a 
static collection of nodes.

## Source

[MSXML2.IXMLDOMNodeList Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/desktop/ms763824(v=vs.85))

In this article, we have explored the MSXML2.IXMLDOMNodeList object 
in VBScript, covering its usage and practical applications. From basic iteration 
to advanced filtering and conversion techniques, these examples demonstrate 
effective XML processing. With this knowledge, you can enhance your VBScript 
applications with robust XML handling capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).