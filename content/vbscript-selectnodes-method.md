+++
title = "VBScript SelectNodes Method"
date = 2025-08-29T20:14:49.688+01:00
draft = false
description = "Learn about VBScript SelectNodes method, including XML parsing, node selection, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SelectNodes Method

last modified April 9, 2025

The SelectNodes method in VBScript is part of the XML DOM (Document
Object Model). It allows querying XML documents using XPath expressions to
select matching nodes. This powerful method enables efficient XML data
extraction and manipulation in VBScript applications.

SelectNodes returns a node list containing all matching elements.
It's commonly used for parsing configuration files, web services responses, and
data exchange formats. This tutorial covers SelectNodes with
practical examples to demonstrate its usage.

## SelectNodes Method Overview

The SelectNodes method takes an XPath expression as its parameter.
It searches the XML document and returns all nodes matching the expression. The
method is available on any XML DOM node object in VBScript.

Key features include complex query capabilities through XPath syntax. It can
search by element name, attribute values, or hierarchical relationships.
SelectNodes is case-sensitive and requires proper XML namespace
handling when applicable.

## Basic Node Selection

This example demonstrates the simplest use of SelectNodes to select
all elements with a specific tag name. It loads an XML document from a string
and queries for all "book" elements. The results are then processed in a loop.

basic_selectnodes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;library&gt;&lt;book&gt;&lt;title&gt;VBScript Guide&lt;/title&gt;&lt;/book&gt;" &amp; _
               "&lt;book&gt;&lt;title&gt;XML Mastery&lt;/title&gt;&lt;/book&gt;&lt;/library&gt;"

Set books = xmlDoc.SelectNodes("//book")
For Each book In books
    WScript.Echo book.SelectSingleNode("title").text
Next

Set xmlDoc = Nothing

The script creates an XML DOM document and loads sample XML data. The XPath
expression "//book" selects all book elements in the document. The loop then
extracts and displays each book's title. This shows basic node selection and
navigation.

## Selecting Nodes by Attribute

This example shows how to select nodes based on attribute values using
SelectNodes. The XPath expression filters elements with specific
attribute conditions. This is useful for finding specific data in XML documents.

attribute_selection.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;users&gt;&lt;user role='admin'&gt;Alice&lt;/user&gt;" &amp; _
               "&lt;user role='user'&gt;Bob&lt;/user&gt;&lt;user role='admin'&gt;Charlie&lt;/user&gt;&lt;/users&gt;"

Set admins = xmlDoc.SelectNodes("//user[@role='admin']")
For Each admin In admins
    WScript.Echo admin.text &amp; " is an admin"
Next

Set xmlDoc = Nothing

The script loads XML with user elements having role attributes. The XPath
"//user[@role='admin']" selects only users with admin role. The square brackets
enclose the attribute condition. This demonstrates attribute-based filtering.

## Hierarchical Node Selection

This example demonstrates selecting nodes based on their hierarchical position
in the XML document. The XPath expression navigates through parent-child
relationships to find specific nodes. This shows structured document traversal.

hierarchical_selection.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;departments&gt;&lt;dept name='IT'&gt;" &amp; _
               "&lt;employee&gt;John&lt;/employee&gt;&lt;employee&gt;Sarah&lt;/employee&gt;&lt;/dept&gt;" &amp; _
               "&lt;dept name='HR'&gt;&lt;employee&gt;Mike&lt;/employee&gt;&lt;/dept&gt;&lt;/departments&gt;"

Set itEmployees = xmlDoc.SelectNodes("//dept[@name='IT']/employee")
For Each emp In itEmployees
    WScript.Echo "IT employee: " &amp; emp.text
Next

Set xmlDoc = Nothing

The script selects only employees within the IT department. The XPath expression
first finds the dept element with name='IT', then selects its employee children.
This two-step navigation shows hierarchical querying capabilities.

## Selecting Multiple Node Types

This example shows how to select different types of nodes with a single XPath
expression. The pipe character (|) acts as a union operator in XPath. This
allows combining multiple queries into one result set.

multiple_types.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.loadXML "&lt;config&gt;&lt;setting name='timeout'&gt;30&lt;/setting&gt;" &amp; _
               "&lt;log level='debug'/&gt;&lt;server port='8080'/&gt;&lt;/config&gt;"

Set nodes = xmlDoc.SelectNodes("//setting | //log | //server")
For Each node In nodes
    If node.nodeName = "setting" Then
        WScript.Echo "Setting: " &amp; node.text
    Else
        WScript.Echo "Element: " &amp; node.nodeName
    End If
Next

Set xmlDoc = Nothing

The script selects setting, log, and server elements with one query. The XPath
"//setting | //log | //server" combines three separate queries. The loop then
handles each node type differently based on its nodeName property.

## Using Namespaces with SelectNodes

This example demonstrates SelectNodes with XML namespaces, which
requires special handling. Namespace prefixes must be declared and used in the
XPath expression. This shows how to work with namespace-qualified XML.

namespace_selection.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
xmlDoc.async = False
xmlDoc.setProperty "SelectionNamespaces", "xmlns:ns='http://example.com'"
xmlDoc.loadXML "&lt;ns:data xmlns:ns='http://example.com'&gt;" &amp; _
               "&lt;ns:item&gt;Value1&lt;/ns:item&gt;&lt;ns:item&gt;Value2&lt;/ns:item&gt;&lt;/ns:data&gt;"

Set items = xmlDoc.SelectNodes("//ns:item")
For Each item In items
    WScript.Echo item.text
Next

Set xmlDoc = Nothing

The script first sets the SelectionNamespaces property to declare the namespace
prefix. The XML document uses the ns prefix for all elements. The XPath
expression must include this prefix to match nodes. This ensures proper
namespace-aware querying.

## Source

[XML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757846(v=vs.84))

In this article, we have explored the SelectNodes method in VBScript,
covering its usage and practical applications. From basic node selection to
complex namespace handling, these examples demonstrate powerful XML processing.
With this knowledge, you can effectively parse and manipulate XML data in your
VBScript applications.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).