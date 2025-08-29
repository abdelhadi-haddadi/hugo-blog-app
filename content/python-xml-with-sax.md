+++
title = "Python XML with SAX"
date = 2025-08-29T20:11:14.407+01:00
draft = false
description = "Python XML with SAX tutorial shows how to use the SAX API for event-driven XML parsing in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python XML with SAX

last modified February 15, 2025

In this article, we show how to use the SAX (Simple API for XML) in
Python for event-driven XML parsing. SAX is a memory-efficient approach to
parsing XML documents, making it suitable for large files. Unlike DOM (Document
Object Model), SAX does not load the entire XML document into memory. Instead,
it processes the document sequentially and triggers events as it encounters
elements, attributes, and text.

The xml.sax module is part of Python's standard library, so no
additional installation is required.

## Basic SAX Parsing

The following example demonstrates how to parse an XML document using SAX. We
create a custom handler class to handle events such as start elements, end
elements, and character data.

main.py
  

import xml.sax
from io import StringIO

class MyHandler(xml.sax.ContentHandler):
    def __init__(self):
        self.current_element = ""
        self.current_data = ""

    # Called when an element starts
    def startElement(self, tag, attributes):
        self.current_element = tag
        if tag == "book":
            print("Book Id:", attributes["id"])

    # Called when an element ends
    def endElement(self, tag):
        if tag == "title":
            print("Title:", self.current_data)
        elif tag == "author":
            print("Author:", self.current_data)
        elif tag == "year":
            print("Year:", self.current_data)
        self.current_data = ""

    # Called when character data is found
    def characters(self, content):
        if self.current_element in ["title", "author", "year"]:
            self.current_data += content.strip()

# XML data
xml_data = """
&lt;catalog&gt;
    &lt;book id="1"&gt;
        &lt;title&gt;The Great Gatsby&lt;/title&gt;
        &lt;author&gt;F. Scott Fitzgerald&lt;/author&gt;
        &lt;year&gt;1925&lt;/year&gt;
    &lt;/book&gt;
    &lt;book id="2"&gt;
        &lt;title&gt;1984&lt;/title&gt;
        &lt;author&gt;George Orwell&lt;/author&gt;
        &lt;year&gt;1949&lt;/year&gt;
    &lt;/book&gt;
&lt;/catalog&gt;
"""

# Create a SAX parser
parser = xml.sax.make_parser()
handler = MyHandler()
parser.setContentHandler(handler)

# Parse the XML data
parser.parse(StringIO(xml_data))

In this program, the MyHandler class inherits from
xml.sax.ContentHandler and overrides the startElement,
endElement, and characters methods to handle XML
events. 

parser.parse(StringIO(xml_data))

The StringIO is used to create an in-memory file-like object from
the xml_data string. This allows the parser.parse method to read the XML data as
if it were reading from a file.

$ python main.py
Book Id: 1
Title: The Great Gatsby
Author: F. Scott Fitzgerald
Year: 1925
Book Id: 2
Title: 1984
Author: George Orwell
Year: 1949

## Handling Attributes

The following example demonstrates how to handle attributes in XML elements using SAX.

main.py
  

import xml.sax
from io import StringIO

import xml.sax

class MyHandler(xml.sax.ContentHandler):
    def __init__(self):
        self.current_element = ""

    # Called when an element starts
    def startElement(self, tag, attributes):
        self.current_element = tag
        if tag == "book":
            print("Book Id:", attributes["id"])
            print("Category:", attributes["category"])

    # Called when an element ends
    def endElement(self, tag):
        pass

    # Called when character data is found
    def characters(self, content):
        pass

# XML data
xml_data = """
&lt;catalog&gt;
    &lt;book id="1" category="fiction"&gt;
        &lt;title&gt;The Great Gatsby&lt;/title&gt;
        &lt;author&gt;F. Scott Fitzgerald&lt;/author&gt;
        &lt;year&gt;1925&lt;/year&gt;
    &lt;/book&gt;
    &lt;book id="2" category="dystopian"&gt;
        &lt;title&gt;1984&lt;/title&gt;
        &lt;author&gt;George Orwell&lt;/author&gt;
        &lt;year&gt;1949&lt;/year&gt;
    &lt;/book&gt;
    &lt;book id="3" category="fiction"&gt;
        &lt;title&gt;War and Peace&lt;/title&gt;
        &lt;author&gt;Leo Tolstoy&lt;/author&gt;
        &lt;year&gt;1869&lt;/year&gt;
    &lt;/book&gt;
&lt;/catalog&gt;
"""

# Create a SAX parser
parser = xml.sax.make_parser()
handler = MyHandler()
parser.setContentHandler(handler)

# Parse the XML data
parser.parse(StringIO(xml_data))

In this program, the startElement method is used to handle
attributes of the book element, such as id and
category.

$ python main.py
Book Id: 1
Category: fiction
Book Id: 2
Category: dystopian
Book Id: 3
Category: fiction

## Parsing XML Files

The following example demonstrates how to parse an XML file using SAX. This
approach is memory-efficient because it processes the file sequentially without
loading it entirely into memory.

products.xml
  

&lt;products&gt;
    &lt;product&gt;
        &lt;id&gt;1&lt;/id&gt;
        &lt;name&gt;Product 1&lt;/name&gt;
        &lt;price&gt;10.99&lt;/price&gt;
        &lt;quantity&gt;30&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product&gt;
        &lt;id&gt;2&lt;/id&gt;
        &lt;name&gt;Product 2&lt;/name&gt;
        &lt;price&gt;20.99&lt;/price&gt;
        &lt;quantity&gt;130&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product&gt;
        &lt;id&gt;4&lt;/id&gt;
        &lt;name&gt;Product 4&lt;/name&gt;
        &lt;price&gt;24.59&lt;/price&gt;
        &lt;quantity&gt;350&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product&gt;
        &lt;id&gt;5&lt;/id&gt;
        &lt;name&gt;Product 5&lt;/name&gt;
        &lt;price&gt;9.9&lt;/price&gt;
        &lt;quantity&gt;650&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product&gt;
        &lt;id&gt;6&lt;/id&gt;
        &lt;name&gt;Product 6&lt;/name&gt;
        &lt;price&gt;45&lt;/price&gt;
        &lt;quantity&gt;290&lt;/quantity&gt;
    &lt;/product&gt;
&lt;/products&gt;

This is the file. 

main.py
  

from xml.sax import make_parser, ContentHandler

class ProductHandler(ContentHandler):
  def __init__(self):
    self.current_data = ""
    self.product = {}
  
  def startElement(self, name, attrs):
    self.current_data = ""
    if name == "product":
      self.product = {}
  
  def characters(self, content):
    self.current_data += content.strip()
  
  def endElement(self, name):
    if name != "product":
      self.product[name] = self.current_data
    else:
      print(f"Id: {self.product['id']}, Name: {self.product['name']}")

parser = make_parser()
parser.setContentHandler(ProductHandler())
parser.parse("products.xml")

In this program, the parser.parse method is used to parse a XML
file named products.xml. The SAX parser processes the file
sequentially, making it suitable for large files.

$ python main.py
Id: 1, Name: Product 1
Id: 2, Name: Product 2
Id: 4, Name: Product 4
Id: 5, Name: Product 5
Id: 6, Name: Product 6

## Source

[Python SAX - Documentation](https://docs.python.org/3/library/xml.sax.html)

In this article, we have shown how to use the SAX API in Python for event-driven XML parsing. The SAX approach is memory-efficient and suitable for large XML files.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).