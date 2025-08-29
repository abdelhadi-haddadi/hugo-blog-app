+++
title = "Python ElementTree"
date = 2025-08-29T20:11:14.401+01:00
draft = false
description = "Python ElementTree tutorial shows how to use the ElementTree module for XML parsing and creation in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python ElementTree

last modified February 15, 2025

In this article, we show how to use the ElementTree module in
Python for XML parsing and creation. The ElementTree module
provides a simple and efficient API for working with XML data. It is part of
Python's standard library and is widely used for XML processing.

The ElementTree module is particularly useful for tasks like
reading, writing, and modifying XML files.

Key features:

    - A lightweight and user-friendly API for parsing and manipulating XML data.

    - Represents the XML document as a tree structure, with elements as nodes.

    - Ideal for smaller to medium-sized XML files.

## Parsing XML with ElementTree

The following example demonstrates how to parse an XML document using
ElementTree.

main.py
  

import xml.etree.ElementTree as ET

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
    &lt;product&gt;
        &lt;id&gt;3&lt;/id&gt;
        &lt;name&gt;Product 3&lt;/name&gt;
        &lt;price&gt;24.59&lt;/price&gt;
        &lt;quantity&gt;350&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product&gt;
        &lt;id&gt;4&lt;/id&gt;
        &lt;name&gt;Product 4&lt;/name&gt;
        &lt;price&gt;9.9&lt;/price&gt;
        &lt;quantity&gt;650&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product&gt;
        &lt;id&gt;5&lt;/id&gt;
        &lt;name&gt;Product 5&lt;/name&gt;
        &lt;price&gt;45&lt;/price&gt;
        &lt;quantity&gt;290&lt;/quantity&gt;
    &lt;/product&gt;
&lt;/products&gt;
"""

# Parse the XML data
root = ET.fromstring(xml_data)

# Iterate over product elements
for product in root.findall('product'):

    id = product.find('id').text
    name = product.find('name').text
    price = product.find('price').text
    quantity = product.find('quantity').text
    print(f"Id: {id}, Name: {name}, Price: {price}, Quantity: {quantity}")

In this program, the ET.fromstring function is used to parse the
XML data. The findall method is used to find all
product elements, and the find method is used to
extract the values of id, name, price,
and quantity tags.

$ python main.py
Id: 1, Name: Product 1, Price: 10.99, Quantity: 30
Id: 2, Name: Product 2, Price: 20.99, Quantity: 130
Id: 3, Name: Product 3, Price: 24.59, Quantity: 350
Id: 4, Name: Product 4, Price: 9.9, Quantity: 650
Id: 5, Name: Product 5, Price: 45, Quantity: 290

## Modifying XML with ElementTree

The following example demonstrates how to modify an XML document using
ElementTree.

main.py
  

import xml.etree.ElementTree as ET

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
root = ET.fromstring(xml_data)

# Modify the first product's price
first_product = root.find('product')
first_product.find('price').text = '15.99'

# Add a new product
new_product = ET.Element('product')
ET.SubElement(new_product, 'id').text = '3'
ET.SubElement(new_product, 'name').text = 'Product 3'
ET.SubElement(new_product, 'price').text = '30.99'
ET.SubElement(new_product, 'quantity').text = '200'
root.append(new_product)

# Print the modified XML
print(ET.tostring(root, encoding='unicode'))

In this program, the find method is used to locate the first
product element, and its price is modified. A new
product element is created using ET.Element and
ET.SubElement, and it is appended to the root element. The modified
XML is printed using ET.tostring.

## Reading XML File with id Attribute

The following example demonstrates how to read an XML file where each
product element has an id attribute. The program
extracts the id attribute along with the name,
price, and quantity values.

products.xml
  

&lt;products&gt;
    &lt;product id="1"&gt;
        &lt;name&gt;Product 1&lt;/name&gt;
        &lt;price&gt;10.99&lt;/price&gt;
        &lt;quantity&gt;30&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product id="2"&gt;
        &lt;id&gt;2&lt;/id&gt;
        &lt;name&gt;Product 2&lt;/name&gt;
        &lt;price&gt;20.99&lt;/price&gt;
        &lt;quantity&gt;130&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product id="3"&gt;
        &lt;name&gt;Product 3&lt;/name&gt;
        &lt;price&gt;24.59&lt;/price&gt;
        &lt;quantity&gt;350&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product id="4"&gt;
        &lt;name&gt;Product 4&lt;/name&gt;
        &lt;price&gt;9.9&lt;/price&gt;
        &lt;quantity&gt;650&lt;/quantity&gt;
    &lt;/product&gt;
    &lt;product id="5"&gt;
        &lt;name&gt;Product 5&lt;/name&gt;
        &lt;price&gt;45&lt;/price&gt;
        &lt;quantity&gt;290&lt;/quantity&gt;
    &lt;/product&gt;
&lt;/products&gt;

We have products with ids as attributes.

main.py
  

import xml.etree.ElementTree as ET

file_name = 'products.xml'

tree = ET.parse(file_name)
root = tree.getroot()

# Iterate over product elements
for product in root.findall('product'):
    # Extract the id attribute
    product_id = product.get('id')
    name = product.find('name').text
    price = product.find('price').text
    quantity = product.find('quantity').text
    print(f"Id: {product_id}, Name: {name}, Price: {price}, Quantity: {quantity}")

```
tree = ET.parse(file_name)
root = tree.getroot()

```

We parse the document with parse method and use the getroot
method to get the root of the document.

product_id = product.get('id')
name = product.find('name').text
price = product.find('price').text
quantity = product.find('quantity').text

The get method is used to extract the id attribute
from each product element. The find method is used to
extract the values of name, price, and
quantity.

$ python main.py
Id: 1, Name: Product 1, Price: 10.99, Quantity: 30
Id: 2, Name: Product 2, Price: 20.99, Quantity: 130
Id: 3, Name: Product 3, Price: 24.59, Quantity: 350
Id: 4, Name: Product 4, Price: 9.9, Quantity: 650
Id: 5, Name: Product 5, Price: 45, Quantity: 290

## Writing XML with ElementTree

The following example demonstrates how to create and write an XML document using
ElementTree.

main.py
  

import xml.etree.ElementTree as ET

# Create the root element
root = ET.Element('products')

# Create product elements
product1 = ET.SubElement(root, 'product')
ET.SubElement(product1, 'id').text = '1'
ET.SubElement(product1, 'name').text = 'Product 1'
ET.SubElement(product1, 'price').text = '10.99'
ET.SubElement(product1, 'quantity').text = '30'

product2 = ET.SubElement(root, 'product')
ET.SubElement(product2, 'id').text = '2'
ET.SubElement(product2, 'name').text = 'Product 2'
ET.SubElement(product2, 'price').text = '20.99'
ET.SubElement(product2, 'quantity').text = '130'

# Function to pretty-print XML
def prettify(element, level=0):
    indent = '  '
    if len(element):
        if not element.text or not element.text.strip():
            element.text = '\n' + indent * (level + 1)
        for elem in element:
            prettify(elem, level + 1)
            if not elem.tail or not elem.tail.strip():
                elem.tail = '\n' + indent * (level + 1)
        if not elem.tail or not elem.tail.strip():
            elem.tail = '\n' + indent * level
    else:
        if level and (not element.tail or not element.tail.strip()):
            element.tail = '\n' + indent * level
    return element

# Pretty-print the XML
pretty_root = prettify(root)

# Create an ElementTree object
tree = ET.ElementTree(pretty_root)

# Write the pretty-printed XML to a file
tree.write('products2.xml', encoding='utf-8', xml_declaration=True)

print("XML file created successfully with proper indentation.")

In this program, the ET.Element and ET.SubElement
functions are used to create the XML structure. The tree.write
method is used to write the XML data to a file.

The prettify function is used to indent the XML data neatly.

## Source

[Python ElementTree - Documentation](https://docs.python.org/3/library/xml.etree.elementtree.html)

In this article, we have shown how to use the ElementTree module in
Python for XML parsing, modification, and creation. The ElementTree
module is a powerful tool for working with XML data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).