+++
title = "Python lxml"
date = 2025-08-29T20:08:52.245+01:00
draft = false
description = "Python lxml tutorial shows how to create and parse XML and HTML data in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python lxml

last modified January 29, 2024

In this article we show how to parse and generate XML and HTML data in Python
using the lxml library.

The lxml library provides Python bindings for the C libraries libxml2 and
libxslt.

The following file is used in the examples.

words.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Words&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;ul&gt;
    &lt;li&gt;sky&lt;/li&gt;
    &lt;li&gt;cup&lt;/li&gt;
    &lt;li&gt;water&lt;/li&gt;
    &lt;li&gt;cloud&lt;/li&gt;
    &lt;li&gt;bear&lt;/li&gt;
    &lt;li&gt;wolf&lt;/li&gt;
&lt;/ul&gt;

&lt;div id="output"&gt;
    ...
&lt;/div&gt;

&lt;/body&gt;
&lt;/html&gt;

This is a simple HTML document.

## Python lxml iterate tags

In the first example, we iterate over the tags of the document.

tags.py
  

#!/usr/bin/python

from lxml import html

fname = 'words.html'
tree = html.parse(fname)

for e in tree.iter():
    print(e.tag)

The program lists all available HTML tags.

from lxml import html

We import the html module.

fname = 'words.html'
tree = html.parse(fname)

We parse the document from the given file with parse.

for e in tree.iter():
    print(e.tag)

We iterate over the elements utilizing iter.

$ ./tags.py
html
head
meta
title
body
ul
li
li
li
li
li
li
div

## Python lxml root element

The root element is retrieved with getroot.

root.py
  

#!/usr/bin/python

from lxml import html
import re

fname = 'words.html'

tree = html.parse(fname)
root = tree.getroot()

print(root.tag)

print('----------------')

print(root.head.tag)
print(root.head.text_content().strip())

print('----------------')

print(root.body.tag)
print(re.sub('\s+', ' ', root.body.text_content()).strip())

In the program, we get the root element. We print the head, body tags and their
text content.

tree = html.parse(fname)
root = tree.getroot()

From the document tree, we get the root using the getroot method.

print(root.tag)

We print the tag name (html) of the root element.

print(root.head.tag)
print(root.head.text_content().strip())

We print the head tag and its text content.

print(root.body.tag)
print(re.sub('\s+', ' ', root.body.text_content()).strip())

Similarly, we print the body tag and its text content. To remove excessive
space, we use a regular expression.

$ ./root.py
html
----------------
head
Words
----------------
body
sky cup water cloud bear wolf ...

## Python lxml create document

The lxml module allows to create HTML documents.

create_doc.py
  

#!/usr/bin/python

from lxml import etree

root = etree.Element('html', lang='en')

head = etree.SubElement(root, 'head')
title = etree.SubElement(head, 'title')
title.text = 'HTML document'
body = etree.SubElement(root, 'body')

p = etree.SubElement(body, 'p')
p.text = 'A simple HTML document'

with open('new.html', 'wb') as f:
    f.write(etree.tostring(root, pretty_print=True))

We use the etree module for generating the document.

root = etree.Element('html', lang='en')

We create the root element.

head = etree.SubElement(root, 'head')
title = etree.SubElement(head, 'title')

Inside the root element, we create two children.

title.text = 'HTML document'

We insert text via the text attribute.

with open('new.html', 'wb') as f:
    f.write(etree.tostring(root, pretty_print=True))

Finally, we write the document to a file.

## Python lxml findall

The findall method is used to find all specified elements.

find_all.py
  

#!/usr/bin/python

from lxml import html

fname = 'words.html'

root = html.parse(fname)
els = root.findall('body/ul/li')

for e in els:
    print(e.text)

The program finds all li tags and prints their content.

els = root.findall('body/ul/li')

We find all elements with findall. We pass the exact path to the
elements.

for e in els:
    print(e.text)

We iterate over the tags and print their text content.

$ ./find_all.py
sky
cup
water
cloud
bear
wolf

## Python lxml find by id

A specific element can be found by get_element_by_id.

find_by_id.py
  

#!/usr/bin/python

from lxml import html

fname = 'words.html'

tree = html.parse(fname)
root = tree.getroot()

e = root.get_element_by_id('output')
print(e.tag)
print(e.text.strip())

The program finds the div element by its id and prints it tag name
and text content.

$ ./find_by_id.py
div
...

## Python lxml web scrape

The lxml module can be used for web scraping.

scrape.py
  

#!/usr/bin/python

import urllib3
import re
from lxml import html

http = urllib3.PoolManager()

url = 'http://webcode.me/countries.html'
resp = http.request('GET', url)

content = resp.data.decode('utf-8')
doc = html.fromstring(content)

els = doc.findall('body/table/tbody/tr')

for e in els[:10]:
    row = e.text_content().strip()
    row2 = re.sub('\s+', ' ', row)
    print(row2)

The program fetches an HTML document that contains a list of most populated
countries. It prints the top ten countries from the table.

import urllib3

To fetch the web page, we use the urllib3 library.

http = urllib3.PoolManager()

url = 'http://webcode.me/countries.html'
resp = http.request('GET', url)

We generate a GET request to the resource.

content = resp.data.decode('utf-8')
doc = html.fromstring(content)

We decode the content and parse the document.

els = doc.findall('body/table/tbody/tr')

We find all tr tags which contain the data.

for e in els[:10]:
    row = e.text_content().strip()
    row2 = re.sub('\s+', ' ', row)
    print(row2)

We go over the list of rows and print the top ten rows.

$ ./scrape.py
1 China 1382050000
2 India 1313210000
3 USA 324666000
4 Indonesia 260581000
5 Brazil 207221000
6 Pakistan 196626000
7 Nigeria 186988000
8 Bangladesh 162099000
9 Russia 146838000
10 Japan 126830000

## Source

[lxml - XML and HTML with Python](https://lxml.de/)

In this article we have processed XML/HTML data in Python with lxml.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).