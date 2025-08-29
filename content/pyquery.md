+++
title = "Pyquery"
date = 2025-08-29T20:09:59.341+01:00
draft = false
description = "Pyquery tutorial shows how to make jquery queries on HTML documents in Python. Pyquery examples select elements, insert elements, iterate over elements, or scrape a web page."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Pyquery

last modified January 29, 2024

Pyquery tutorial shows how to make jquery queries on XML documents in Python.

*jQuery* is a JavaScript library which is used to manipulate DOM. With
jQuery, we can find, select, traverse, and manipulate parts of an HTML document.

## Pyquery

Pyquery is a Python library which has similar API to jQuery. It uses
lxml module for fast XML and HTML manipulation. The API is as much
as possible similar to jQuery. 

## Installing pyquery

Pyquery is installed with the following command:

$ sudo pip3 install pyquery

We use the pip3 command to install pyquery module.

## The HTML file

In the examples, we will use the following HTML file:

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Header&lt;/title&gt;
        &lt;meta charset="utf-8"&gt;                   
    &lt;/head&gt;
        
    &lt;body&gt;
        &lt;h2&gt;Operating systems&lt;/h2&gt;
        
        &lt;ul id="mylist" style="width:150px"&gt;
            &lt;li&gt;Solaris&lt;/li&gt;
            &lt;li&gt;FreeBSD&lt;/li&gt;
            &lt;li&gt;Debian&lt;/li&gt;                      
            &lt;li&gt;NetBSD&lt;/li&gt;           
            &lt;li&gt;Windows&lt;/li&gt;         
        &lt;/ul&gt;
    &lt;/body&gt;    
&lt;/html&gt;

## Simple example

In the first example, we use pyquery module to get the 
text of a header.

header.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq

with open("index.html", "r") as f:
    
    contents = f.read()
    
    doc = pq(contents)
    text = doc("h2").text()
    
    print(text)

The code example prints the text of the h2 element.

from pyquery import PyQuery as pq

We import the PyQuery class from the pyquery
module. The PyQuery is the main class for doing work.

with open("index.html", "r") as f:
    
    contents = f.read()

We open the index.html file and read its contents
with the read method. 

doc = pq(contents)

A PyQuery object is created; the HTML data is passed to the 
constructor.

text = doc("h2").text()

We select the h2 tag and get its text with the text
method.

$ ./header.py 
Operating systems

## The text and html methods

The text method retrieves the text of an element while 
the html method retrieves the HTML data of the element.

get_list.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq

with open("index.html", "r") as f:
    
    contents = f.read()
    
    doc = pq(contents)
    
    text = doc("ul").text()
    print("\n".join(text.split()))
    
    text = doc("ul").html()
    print("\n".join(text.split()))    

We get the text data and the HTML data of the ul element.

$ ./get_list.py 
Solaris
FreeBSD
Debian
NetBSD
Windows
&lt;li&gt;Solaris&lt;/li&gt;
&lt;li&gt;FreeBSD&lt;/li&gt;
&lt;li&gt;Debian&lt;/li&gt;
&lt;li&gt;NetBSD&lt;/li&gt;
&lt;li&gt;Windows&lt;/li&gt;

## Attributes

Element attributes can be retrieved with the attr method.

attributes.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq

with open("index.html", "r") as f:
    
    contents = f.read()
    
    doc = pq(contents)
    
    tag = doc("ul")
    
    print(tag.attr("id"))
    print(tag.attr("style")) 

In the code example, we retrieve and print two attributes of the ul
element: id and style.

$ ./attributes.py 
mylist
width:150px

## Web scraping

Requests is a simple Python HTTP library. It provides methods for 
accessing Web resources via HTTP.

scraping.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq
import requests as req

resp = req.get("http://www.webcode.me")
doc = pq(resp.text)

title = doc('title').text()
print(title)

The example retrieves the title of a simple web page.

resp = req.get("http://www.webcode.me")
doc = pq(resp.text)

We get the HTML data of the page.

title = doc('title').text()
print(title)

We retrieve its title.

$ ./scraping.py 
My html page

## Selecting tags

The selectors are used to select elements in an HTML document 
that meet certain criteria. The criteria can be their name, id, 
class name, attributes or a combination of them.

selecting.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq

def print_item(self, item):
    
    print("Tag: {0}, Text: {1}".format(item.tag, item.text))

with open("index.html", "r") as f:
    
    contents = f.read()
    
    doc = pq(contents)
    
    first_li = doc("li:first")
    print(first_li.text())
    
    last_li = doc("li:last")
    print(last_li.text())
    
    odd_lis = doc("li:odd")    
    odd_lis.each(print_item)

The example selects various li tags from the HTML document.

def print_item(self, item):
    
    print("Tag: {0}, Text: {1}".format(item.tag, item.text))

In this function, we print the tag name and its text.

first_li = doc("li:first")
print(first_li.text())

We select the first li tag and print its content with 
the text method.

last_li = doc("li:last")
print(last_li.text())

Here we get the last li tag.

odd_lis = doc("li:odd")    
odd_lis.each(print_item)

With the help of the each method, we print the tag and its content
of the every odd li element.

$ ./selecting.py 
Solaris
Windows
Tag: li, Text: FreeBSD
Tag: li, Text: NetBSD

## Removing elements

The remove method deletes a tag.

removing.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq

with open("index.html", "r") as f:
    
    contents = f.read()
    
    doc = pq(contents)

    removed_item = doc('li:last').remove()
    
    print(removed_item)
    print(doc)

In the example, we remove the last li tag.

removed_item = doc('li:last').remove()

We select the last li tag and remove it with remove. 
The removed element is returned.

print(removed_item)
print(doc)

We print the deleted item and the document, which has the element removed.

$ ./removing.py 
&lt;li&gt;Windows&lt;/li&gt;         
        
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Header&lt;/title&gt;
        &lt;meta charset="utf-8"/&gt;                   
    &lt;/head&gt;
        
    &lt;body&gt;
        &lt;h2&gt;Operating systems&lt;/h2&gt;
        
        &lt;ul id="mylist" style="width:150px"&gt;
            &lt;li&gt;Solaris&lt;/li&gt;
            &lt;li&gt;FreeBSD&lt;/li&gt;
            &lt;li&gt;Debian&lt;/li&gt;                      
            &lt;li&gt;NetBSD&lt;/li&gt;           
                      
        &lt;/ul&gt;
    &lt;/body&gt;    
&lt;/html&gt;

## The items method

The items method allows to iterate over elements.

iterate.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq

with open("index.html", "r") as f:
    
    contents = f.read()
    
    doc = pq(contents)

    items = [item.text() for item in doc.items('li')]
    print(items)

The example iterates over the li elements of the
document.

items = [item.text() for item in doc.items('li')]

The items method is used to create a Python list of
li elements in a list comprehension.

$ ./iterate.py 
['Solaris', 'FreeBSD', 'Debian', 'NetBSD', 'Windows']

## Appending and prepending elements

The append method adds an element at the end 
of a node and the prepend method inserts the 
element at the beginning of a node.

append_prepend.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq

with open("index.html", "r") as f:
    
    contents = f.read()
    
    doc = pq(contents)
    mylist = doc("#mylist")
    
    mylist.prepend("&lt;li&gt;DragonFly&lt;/li&gt;")
    mylist.append("&lt;li&gt;OpenBSD&lt;/li&gt;")
    
    print(mylist)

The code example inserts two li elements with 
the prepend and append methods.

## The filter method

The filter method is used to filter elements.

filtering.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq

with open("index.html", "r") as f:
    
    contents = f.read()
    
    doc = pq(contents)

    filtered = doc('li').filter(lambda i: pq(this).text().startswith(('F', 'D', 'N')))
    print(filtered.text())

The example displays operating systems that start with F, D, or N. We use a filter
method and an anonymous function.

$ ./filtering.py 
FreeBSD Debian NetBSD

## Source

[Python pyquery documentation](https://pyquery.readthedocs.io/en/latest/)

In this article we have worked with the Python pyquery library. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).