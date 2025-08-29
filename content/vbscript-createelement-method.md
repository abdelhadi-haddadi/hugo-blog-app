+++
title = "VBScript CreateElement Method"
date = 2025-08-29T20:14:43.023+01:00
draft = false
description = "Learn about VBScript CreateElement method, including XML/HTML element creation, DOM manipulation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript CreateElement Method

last modified April 9, 2025

The CreateElement method in VBScript is used to create new element
nodes in XML or HTML documents. It's part of the Document Object Model (DOM)
interface. This method generates elements that can be inserted into document
structures. It's essential for dynamic document manipulation.

CreateElement creates elements without immediately adding them to
the document. You must explicitly append created elements to the DOM tree. This
tutorial covers CreateElement with practical examples to demonstrate
its usage in various scenarios.

## CreateElement Method Overview

The CreateElement method takes one parameter: the tag name of the
element to create. It returns a new element node object that isn't part of the
document yet. The method is available through the DOM document object in
VBScript.

Key features include element creation for both XML and HTML documents. Created
elements can have attributes and content added before insertion.
CreateElement is fundamental for programmatic document generation.
Understanding this method helps create dynamic content in scripts.

## Creating a Simple XML Element

This example demonstrates creating a basic XML element using
CreateElement. It shows how to create an element, set its text
content, and append it to a document. The resulting XML structure is then
output.

simple_xml_element.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set root = xmlDoc.createElement("Person")
xmlDoc.appendChild root

Set name = xmlDoc.createElement("Name")
name.text = "John Doe"
root.appendChild name

WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates an XML document and a root "Person" element. It then creates
a "Name" child element with text content. The resulting XML structure is output,
showing proper nesting. This demonstrates basic element creation and hierarchy.

## Creating HTML Elements

This example shows how to create HTML elements using CreateElement.
It creates a paragraph element with text content. The example demonstrates HTML-
specific element creation and manipulation in VBScript.

html_element.vbs
  

Set htmlDoc = CreateObject("htmlfile")
Set body = htmlDoc.body

Set paragraph = htmlDoc.createElement("p")
paragraph.innerText = "This is a new paragraph."
body.appendChild paragraph

WScript.Echo body.innerHTML
Set htmlDoc = Nothing

The script creates an HTML document and accesses its body element. It then
creates a paragraph element and sets its text. The paragraph is appended to the
document body. The resulting HTML is output to demonstrate the structure.

## Creating Elements with Attributes

This example demonstrates creating an element with attributes using
CreateElement. It shows how to create an element and then add
attributes to it. The example uses XML but applies to HTML as well.

element_with_attributes.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set book = xmlDoc.createElement("Book")
book.setAttribute "id", "B001"
book.setAttribute "category", "Fiction"

Set title = xmlDoc.createElement("Title")
title.text = "The Great Novel"
book.appendChild title

xmlDoc.appendChild book
WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates a "Book" element with id and category attributes. It then
creates a "Title" child element with text content. The resulting XML shows the
element with both attributes and nested content. This demonstrates attribute
handling with created elements.

## Creating Nested Elements

This example shows how to create complex nested element structures using
CreateElement. It builds a hierarchical XML structure with multiple
levels. Each level demonstrates element creation and proper nesting.

nested_elements.vbs
  

Set xmlDoc = CreateObject("MSXML2.DOMDocument")
Set catalog = xmlDoc.createElement("Catalog")

Set book = xmlDoc.createElement("Book")
Set title = xmlDoc.createElement("Title")
title.text = "XML Basics"
book.appendChild title

Set author = xmlDoc.createElement("Author")
author.text = "Jane Smith"
book.appendChild author

catalog.appendChild book
xmlDoc.appendChild catalog
WScript.Echo xmlDoc.xml
Set xmlDoc = Nothing

The script creates a "Catalog" root element with nested "Book" element. The
"Book" contains "Title" and "Author" child elements with text content. The
result shows proper XML nesting. This demonstrates building complex structures
with CreateElement.

## Creating and Manipulating Form Elements

This example demonstrates creating HTML form elements dynamically. It shows how
to create input elements, set their properties, and add them to a form. The
example creates a complete form structure.

form_elements.vbs
  

Set htmlDoc = CreateObject("htmlfile")
Set body = htmlDoc.body

Set form = htmlDoc.createElement("form")
form.setAttribute "action", "/submit"
form.setAttribute "method", "post"

Set input = htmlDoc.createElement("input")
input.setAttribute "type", "text"
input.setAttribute "name", "username"
form.appendChild input

Set submit = htmlDoc.createElement("input")
submit.setAttribute "type", "submit"
submit.setAttribute "value", "Send"
form.appendChild submit

body.appendChild form
WScript.Echo body.innerHTML
Set htmlDoc = Nothing

The script creates a form element with action and method attributes. It then
creates text input and submit button elements. These are added to the form,
which is then appended to the document body. The resulting HTML form is output.

## Source

[MSXML DOM Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/6kxy1a51(v=vs.84))

In this article, we have explored the CreateElement method in
VBScript, covering its usage and practical applications. From simple elements to
complex nested structures, these examples demonstrate dynamic document creation.
With this knowledge, you can enhance your scripts with dynamic content
generation.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).