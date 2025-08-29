+++
title = "Python minidom"
date = 2025-08-29T20:11:14.412+01:00
draft = false
description = "Python minidom tutorial shows how to use the minidom module for XML parsing and creation in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python minidom

last modified March 7, 2025

In this article, we show how to use the minidom module in
Python for XML parsing and creation. The minidom module
offers a lightweight DOM interface for XML, part of Python's standard
library.

The minidom module is useful for reading, writing, and
modifying XML documents using a DOM-based approach.

Key features:

    - Simple DOM API for parsing and manipulating XML data.

    - Represents XML as a tree of nodes (elements, attributes, etc.).

    - Suitable for small to medium-sized XML files.

## Parsing XML with minidom

This example shows how to parse an XML document using minidom.

main.py
  

from xml.dom import minidom

# XML data
xml_data = """
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
&lt;/products&gt;
"""

# Parse the XML data
doc = minidom.parseString(xml_data)

# Get all product elements
products = doc.getElementsByTagName('product')

# Iterate over product elements
for product in products:
    id = product.getElementsByTagName('id')[0].firstChild.data
    name = product.getElementsByTagName('name')[0].firstChild.data
    price = product.getElementsByTagName('price')[0].firstChild.data
    qty = product.getElementsByTagName('quantity')[0].firstChild.data
    print(f"Id: {id}, Name: {name}, Price: {price}, Quantity: {qty}")

Here, parseString parses the XML string into a DOM object.
We use getElementsByTagName to find elements and extract
their text with firstChild.data.

$ python main.py
Id: 1, Name: Product 1, Price: 10.99, Quantity: 30
Id: 2, Name: Product 2, Price: 20.99, Quantity: 130

## Modifying XML with minidom

This example shows how to modify an XML document using minidom.

main.py
  

from xml.dom import minidom

# XML data
xml_data = """
&lt;products&gt;
    &lt;product&gt;
        &lt;id&gt;1&lt;/id&gt;
        &lt;name&gt;Product 1&lt;/name&gt;
        &lt;price&gt;10.99&lt;/price&gt;
        &lt;quantity&gt;30&lt;/quantity&gt;
    &lt;/product&gt;
&lt;/products&gt;
"""

# Parse the XML data
doc = minidom.parseString(xml_data)

# Modify the first product's price
product = doc.getElementsByTagName('product')[0]
price = product.getElementsByTagName('price')[0]
price.firstChild.data = '15.99'

# Add a new product
new_product = doc.createElement('product')
doc.documentElement.appendChild(new_product)
for tag, text in [('id', '2'), ('name', 'Product 2'), 
                  ('price', '30.99'), ('quantity', '200')]:
    elem = doc.createElement(tag)
    elem.appendChild(doc.createTextNode(text))
    new_product.appendChild(elem)

# Print the modified XML
print(doc.toprettyxml(indent="  "))

We modify the price by updating firstChild.data. A new
product is created with createElement and text nodes are
added using createTextNode.

## Reading XML File with id Attribute

This example reads an XML file with id attributes using
minidom.

products.xml
  

&lt;products&gt;
    &lt;product id="1"&gt;
        &lt;name&gt;Product 1&lt;/name&gt;
        &lt;price&gt;10.99&lt;/price&gt;
        &lt;quantity&gt;30&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product id="2"&gt;
        &lt;name&gt;Product 2&lt;/name&gt;
        &lt;price&gt;20.99&lt;/price&gt;
        &lt;quantity&gt;130&lt;/quantity&gt;
    &lt;/product&gt;
&lt;/products&gt;

Products have id as attributes.

main.py
  

from xml.dom import minidom

file_name = 'products.xml'

# Parse the XML file
doc = minidom.parse(file_name)
products = doc.getElementsByTagName('product')

# Iterate over product elements
for product in products:
    product_id = product.getAttribute('id')
    name = product.getElementsByTagName('name')[0].firstChild.data
    price = product.getElementsByTagName('price')[0].firstChild.data
    qty = product.getElementsByTagName('quantity')[0].firstChild.data
    print(f"Id: {product_id}, Name: {name}, Price: {price}, Quantity: {qty}")

We use getAttribute to extract the id attribute
and firstChild.data for element text.

$ python main.py
Id: 1, Name: Product 1, Price: 10.99, Quantity: 30
Id: 2, Name: Product 2, Price: 20.99, Quantity: 130

## Writing XML with minidom

This example creates and writes an XML document using minidom.

main.py
  

from xml.dom import minidom

# Create the document
doc = minidom.Document()

# Create the root element
root = doc.createElement('products')
doc.appendChild(root)

# Create product elements
for i, (name, price, qty) in enumerate([
    ('Product 1', '10.99', '30'),
    ('Product 2', '20.99', '130')
], 1):
    product = doc.createElement('product')
    root.appendChild(product)
    for tag, text in [('id', str(i)), ('name', name), 
                      ('price', price), ('quantity', qty)]:
        elem = doc.createElement(tag)
        elem.appendChild(doc.createTextNode(text))
        product.appendChild(elem)

# Write to file with pretty printing
with open('products2.xml', 'w', encoding='utf-8') as f:
    f.write(doc.toprettyxml(indent="  "))

print("XML file created successfully with proper indentation.")

We build the XML structure with createElement and
createTextNode, then write it using toprettyxml.

## Source

[Python minidom - Documentation](https://docs.python.org/3/library/xml.dom.minidom.html)

This article demonstrated using the minidom module in Python
for XML parsing, modification, and creation.

## Author

My name is Jan Bodnar, a passionate programmer with years of experience.
I've been writing programming articles since 2007, with over 1400 articles
and 8 e-books to date.

List [all Python tutorials](/python/).