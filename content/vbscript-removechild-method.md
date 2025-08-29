+++
title = "VBScript RemoveChild Method"
date = 2025-08-29T20:14:48.574+01:00
draft = false
description = "Learn about VBScript RemoveChild method, including XML node removal, DOM manipulation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript RemoveChild Method

last modified April 9, 2025

The RemoveChild method in VBScript is part of the XML DOM
(Document Object Model). It removes a specified child node from an XML document.
This method is essential for dynamic XML manipulation in VBScript. It returns
the removed node, allowing for further processing if needed.

RemoveChild requires a reference to the node being removed. It
operates on the immediate children of the calling node. This tutorial covers
RemoveChild with practical examples to demonstrate its usage in
various scenarios.

## RemoveChild Method Overview

The RemoveChild method takes one parameter: the child node to
remove. It returns the removed node object. The method is available through
the XML DOM objects in VBScript scripting.

Key features include direct DOM manipulation and node reference handling. It
doesn't delete the node from memory unless all references are cleared.
RemoveChild is fundamental for XML document modification.
Understanding this method helps create robust XML processing scripts.

## Basic Node Removal

This example demonstrates the simplest use of RemoveChild to
remove a node from an XML document. It shows loading XML, finding a node,
and removing it. The parent-child relationship is clearly shown.

basic_removechild.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;books&gt;&lt;book&gt;&lt;title&gt;VBScript Guide;&lt;title&gt;&lt;/book&gt;&lt;/books&gt;"

Set root = xmlDoc.documentElement
Set child = root.firstChild
removedNode = root.removeChild(child)

WScript.Echo "Removed node: " &amp; removedNode.xml
WScript.Echo "Remaining XML: " &amp; root.xml

Set xmlDoc = Nothing

The script creates an XML document with one book node. It removes the book
node using RemoveChild. The removed node is stored in
removedNode. The output shows both the removed node and the
remaining XML structure.

## Removing Specific Child Node

This example shows how to remove a specific child node by checking its
attributes or content. It demonstrates selective node removal based on
node properties. The script loops through child nodes to find the target.

specific_remove.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;employees&gt;&lt;employee id='1'/&gt;&lt;employee id='2'/&gt;&lt;/employees&gt;"

Set root = xmlDoc.documentElement
For Each node In root.childNodes
    If node.getAttribute("id") = "1" Then
        root.removeChild(node)
        Exit For
    End If
Next

WScript.Echo "Modified XML: " &amp; root.xml
Set xmlDoc = Nothing

The script removes the employee node with id="1". It loops through all
child nodes checking the id attribute. When found, it removes that specific
node. The remaining XML contains only the employee with id="2".

## Error Handling with RemoveChild

This example demonstrates proper error handling when using
RemoveChild. It shows how to handle cases where the child node
doesn't exist. The script uses VBScript's error handling mechanism.

error_handling.vbs
  

On Error Resume Next

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;root&gt;&lt;child/&gt;&lt;/root&gt;"

Set root = xmlDoc.documentElement
Set nonExistent = xmlDoc.createElement("nonexistent")
removedNode = root.removeChild(nonExistent)

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error: " &amp; Err.Description
Else
    WScript.Echo "Node removed successfully"
End If

Set xmlDoc = Nothing

The script attempts to remove a node that isn't a child of the root element.
This would normally cause an error. With error handling, the script gracefully
catches and reports the error instead of crashing. This makes scripts more
robust.

## Removing Multiple Child Nodes

This example shows how to remove multiple child nodes from an XML document.
It demonstrates working with node collections and removing nodes in sequence.
The script clears all child nodes from the root element.

multiple_remove.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;items&gt;&lt;item&gt;A&lt;/item&gt;&lt;item&gt;B&lt;/item&gt;&lt;item&gt;C&lt;/item&gt;&lt;/items&gt;"

Set root = xmlDoc.documentElement
While root.childNodes.length &gt; 0
    root.removeChild(root.firstChild)
Wend

WScript.Echo "Empty XML: " &amp; root.xml
Set xmlDoc = Nothing

The script removes all child nodes from the items element. It uses a while
loop that continues until no child nodes remain. Each iteration removes the
first child node. The final XML shows an empty items element.

## Removing and Reusing Nodes

This example demonstrates how to remove a node and reuse it elsewhere in
the document. It shows the returned node from RemoveChild being
appended to a different parent. This technique is useful for node reorganization.

reuse_node.vbs
  

Set xmlDoc = CreateObject("Microsoft.XMLDOM")
xmlDoc.async = False
xmlDoc.loadXML "&lt;data&gt;&lt;source&gt;&lt;item&gt;Content&lt;/item&gt;&lt;/source&gt;&lt;target/&gt;&lt;/data&gt;"

Set source = xmlDoc.getElementsByTagName("source")(0)
Set target = xmlDoc.getElementsByTagName("target")(0)
Set item = source.firstChild

removedNode = source.removeChild(item)
target.appendChild(removedNode)

WScript.Echo "Modified XML: " &amp; xmlDoc.xml
Set xmlDoc = Nothing

The script moves an item node from source to target element. It first removes
the node from source, then appends it to target. The node maintains all its
content and attributes during this operation. This shows how nodes can be
repositioned in the document.

## Source

[XML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms757828(v=vs.84))

In this article, we have explored the RemoveChild method in VBScript,
covering its usage and practical applications. From simple node removal to complex
document restructuring, these examples demonstrate effective XML manipulation.
With this knowledge, you can enhance your XML processing scripts with dynamic
node management.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).