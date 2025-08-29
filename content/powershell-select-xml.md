+++
title = "PowerShell Select-Xml"
date = 2025-08-29T20:07:15.396+01:00
draft = false
description = "PowerShell Select-Xml tutorial shows how to use PowerShell to query and extract data from XML documents."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Select-Xml

last modified February 15, 2025

In this article, we will cover the Select-Xml cmdlet in
PowerShell. This cmdlet searches XML documents for text matching XPath
queries. It's essential for XML parsing and data extraction tasks.

## XML basics

XML (eXtensible Markup Language) is a structured data format. It uses tags
to define elements and attributes to store additional information. PowerShell
provides several ways to work with XML files. The Select-Xml
cmdlet is specifically designed for querying XML content.

## Basic Select-Xml usage

The simplest way to use Select-Xml is with a file path and
XPath query. The cmdlet returns matching nodes as XML objects. You can
access node properties and methods for further processing.

xml1.ps1
  

Select-Xml -Path "config.xml" -XPath "//book"

This command searches config.xml for all book elements. The double slash
in XPath means "search at any level". Each match is returned as a node
object with properties.

## Selecting specific attributes

You can extract specific attributes from XML elements using XPath. The @
symbol in XPath refers to attributes. This is useful when you need only
certain data from complex XML structures.

xml2.ps1
  

Select-Xml -Path "data.xml" -XPath "//person/@id"

This command retrieves all id attributes from person elements in data.xml.
The output shows attribute values. You can pipe results to other cmdlets
for processing.

PS C:\&gt; .\xml2.ps1

Node  Path        Pattern
----  ----        -------
id    data.xml    //person/@id
id    data.xml    //person/@id

## Using XML content directly

Instead of file paths, you can pass XML content directly to Select-Xml.
Use the -Content parameter with a string containing XML. This works well
for small XML fragments or dynamically generated XML.

xml3.ps1
  

$xml = "&lt;books&gt;&lt;book id='101'&gt;PowerShell Guide&lt;/book&gt;&lt;/books&gt;"
Select-Xml -Content $xml -XPath "//book"

This example searches XML content stored in a variable. The command finds
the book element and returns its details. No external file is needed.

## Working with namespaces

XML documents often use namespaces to avoid element name conflicts. To
query these, you must specify namespace mappings. Use the -Namespace
parameter with a hashtable of prefix-URI pairs.

xml4.ps1
  

$ns = @{ns="http://example.com/books"}
Select-Xml -Path "catalog.xml" -XPath "//ns:book" -Namespace $ns

This command searches for book elements in a namespace. The ns prefix
maps to the specified URI. Without proper namespace handling, queries
would fail to match elements.

## Filtering with XPath conditions

XPath supports conditional expressions for filtering nodes. You can check
attribute values, element content, or positions. This allows precise
targeting of specific XML data.

xml5.ps1
  

Select-Xml -Path "inventory.xml" -XPath "//item[price &gt; 100]"

This example finds item elements where price is greater than 100. The
condition is specified in square brackets. Multiple conditions can be
combined with and/or operators.

## Accessing node values

To extract text content from nodes, use the Node property of results.
Each match object has Node with the actual XML node. You can access
its InnerText or other properties.

xml6.ps1
  

(Select-Xml -Path "notes.xml" -XPath "//title").Node.InnerText

This command gets the text content of title elements. The parentheses
ensure we access Node after query execution. InnerText contains all
text within the element.

## Combining with other cmdlets

Select-Xml results can be piped to other cmdlets for processing.
For example, you might format output or export data. This enables
complex XML processing workflows.

xml7.ps1
  

Select-Xml -Path "employees.xml" -XPath "//employee" |
    ForEach-Object { $_.Node.name }

This pipeline extracts names from employee elements. ForEach-Object
processes each match. The $_ variable represents the current object.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Select-Xml cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).