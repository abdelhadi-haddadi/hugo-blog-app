+++
title = "VBScript TransformNode Method"
date = 2025-08-29T20:14:50.797+01:00
draft = false
description = "Learn about VBScript TransformNode method, including XML transformations, XSLT processing, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript TransformNode Method

last modified April 9, 2025

The TransformNode method in VBScript is used to transform XML 
documents using XSLT stylesheets. It applies an XSL transformation to an XML 
node and returns the result as a string. This method is part of the Microsoft 
XML DOM implementation. It's essential for XML processing in VBScript.

TransformNode enables powerful XML data manipulation and 
presentation. It's commonly used for converting XML to HTML or other formats. 
This tutorial covers TransformNode with practical examples to 
demonstrate its usage in various scenarios.

## TransformNode Method Overview

The TransformNode method takes an XSLT stylesheet as input and 
returns the transformed output. It works on XML DOM nodes, transforming them 
according to XSL rules. The method is available through the MSXML DOM objects.

Key features include XML-to-HTML conversion and data restructuring. It requires 
properly formatted XML and XSLT documents. TransformNode is 
synchronous and returns the result immediately. Understanding this method helps 
create dynamic XML processing scripts.

## Basic XML to HTML Transformation

This example demonstrates the simplest use of TransformNode to 
convert XML to HTML. It shows loading both XML and XSLT documents. The 
transformation produces HTML output from the XML data.

basic_transform.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set xslDoc = CreateObject("MSXML2.DOMDocument")

xmlDoc.async = False
xslDoc.async = False

xmlDoc.load("data.xml")
xslDoc.load("transform.xsl")

result = xmlDoc.transformNode(xslDoc)
WScript.Echo result

Set xmlDoc = Nothing
Set xslDoc = Nothing

The script creates XML and XSLT DOM documents. It loads XML data from "data.xml" 
and XSLT from "transform.xsl". TransformNode applies the 
transformation. The result contains HTML generated from the XML source.

## Transforming Specific XML Nodes

TransformNode can transform specific nodes rather than entire 
documents. This example shows selecting a node before transformation. It 
demonstrates targeted transformations on document subsets.

node_selection.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set xslDoc = CreateObject("MSXML2.DOMDocument")

xmlDoc.async = False
xslDoc.async = False

xmlDoc.load("catalog.xml")
xslDoc.load("product.xsl")

Set productNode = xmlDoc.selectSingleNode("//product[@id='101']")
result = productNode.transformNode(xslDoc)

WScript.Echo result
Set xmlDoc = Nothing
Set xslDoc = Nothing

The script loads an XML catalog and XSLT stylesheet. It selects a specific 
product node using XPath. TransformNode transforms only this node. 
This approach is useful for processing document fragments.

## Parameterized XSLT Transformations

This example shows passing parameters to XSLT transformations. Parameters allow 
dynamic control over the transformation process. The script demonstrates setting 
XSLT parameters before calling TransformNode.

parameters.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set xslDoc = CreateObject("MSXML2.DOMDocument")
Set template = CreateObject("MSXML2.XSLTemplate")

xmlDoc.async = False
xslDoc.async = False

xmlDoc.load("data.xml")
xslDoc.load("param_transform.xsl")

Set processor = template.createProcessor()
processor.input = xmlDoc
processor.addParameter "sortOrder", "descending"
processor.addParameter "maxItems", 5

processor.transform
result = processor.output

WScript.Echo result
Set xmlDoc = Nothing
Set xslDoc = Nothing
Set template = Nothing

The script uses XSLTemplate for parameterized transformations. It sets two 
parameters: sortOrder and maxItems. The processor applies these to the 
transformation. This technique enables flexible, runtime-configurable 
transformations.

## Error Handling in Transformations

This example demonstrates proper error handling during XML transformations. It 
shows checking document loading status and catching transformation errors. Robust 
error handling is essential for production scripts.

error_handling.vbs
  

On Error Resume Next

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set xslDoc = CreateObject("MSXML2.DOMDocument")

xmlDoc.async = False
xslDoc.async = False

If Not xmlDoc.load("data.xml") Then
    WScript.Echo "XML Error: " &amp; xmlDoc.parseError.reason
    WScript.Quit 1
End If

If Not xslDoc.load("transform.xsl") Then
    WScript.Echo "XSL Error: " &amp; xslDoc.parseError.reason
    WScript.Quit 1
End If

result = xmlDoc.transformNode(xslDoc)
If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Transformation Error: " &amp; Err.Description
Else
    WScript.Echo result
End If

Set xmlDoc = Nothing
Set xslDoc = Nothing

The script checks for loading errors using parseError. It handles transformation 
errors with VBScript's error handling. This approach ensures graceful failure 
when issues occur. Proper error handling makes scripts more reliable.

## Transforming XML to Plain Text

TransformNode can produce plain text output, not just HTML. This 
example shows converting XML data to a CSV format. The XSLT stylesheet generates 
comma-separated values from XML input.

xml_to_csv.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set xslDoc = CreateObject("MSXML2.DOMDocument")

xmlDoc.async = False
xslDoc.async = False

xmlDoc.load("employees.xml")
xslDoc.load("csv_transform.xsl")

result = xmlDoc.transformNode(xslDoc)
WScript.Echo result

Set xmlDoc = Nothing
Set xslDoc = Nothing

The script loads employee data in XML format. The XSLT stylesheet converts this 
to CSV output. TransformNode applies the text-based transformation. 
This technique is useful for data export scenarios.

## Source

[MSXML TransformNode Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757828(v=vs.84))

In this article, we have explored the TransformNode method in 
VBScript, covering its usage and practical applications. From basic XML to HTML 
conversions to parameterized transformations, these examples demonstrate the 
method's versatility. With this knowledge, you can implement robust XML 
processing in your VBScript applications.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).