+++
title = "Python BeautifulSoup"
date = 2025-08-29T20:07:42.161+01:00
draft = false
description = "Python BeautifulSoup tutorial shows how to use BeautifulSoup Python library. The examples find tags, traverse document tree, modify document, and scrape web pages."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python BeautifulSoup

last modified January 29, 2024

Python BeautifulSoup tutorial is an introductory tutorial to BeautifulSoup
Python library. The examples find tags, traverse document tree, modify document,
and scrape web pages.

## BeautifulSoup

BeautifulSoup is a Python library for parsing HTML and XML documents. It is often used
for web scraping. BeautifulSoup transforms a complex HTML document into a complex
tree of Python objects, such as tag, navigable string, or comment.

## Installing BeautifulSoup

We use the pip3 command to install the necessary modules.

$ sudo pip3 install lxml

We need to install the lxml module, which is used
by BeautifulSoup.

$ sudo pip3 install bs4

BeautifulSoup is installed with the above command.

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

        &lt;p&gt;
          FreeBSD is an advanced computer operating system used to
          power modern servers, desktops, and embedded platforms.
        &lt;/p&gt;

        &lt;p&gt;
          Debian is a Unix-like computer operating system that is
          composed entirely of free software.
        &lt;/p&gt;

    &lt;/body&gt;
&lt;/html&gt;

## Python BeautifulSoup simple example

In the first example, we use BeautifulSoup module to get three tags.

simple.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    print(soup.h2)
    print(soup.head)
    print(soup.li)

The code example prints HTML code of three tags.

from bs4 import BeautifulSoup

We import the BeautifulSoup class from the bs4
module. The BeautifulSoup is the main class for doing work.

with open('index.html', 'r') as f:

    contents = f.read()

We open the index.html file and read its contents
with the read method.

soup = BeautifulSoup(contents, 'lxml')

A BeautifulSoup object is created; the HTML data is passed to the
constructor. The second option specifies the parser.

print(soup.h2)
print(soup.head)

Here we print the HTML code of two tags: h2 and head.

print(soup.li)

There are multiple li elements; the line prints the first one.

$ ./simple.py
&lt;h2&gt;Operating systems&lt;/h2&gt;
&lt;head&gt;
&lt;title&gt;Header&lt;/title&gt;
&lt;meta charset="utf-8"/&gt;
&lt;/head&gt;
&lt;li&gt;Solaris&lt;/li&gt;

## BeautifulSoup tags, name, text

The name attribute of a tag gives its name and
the text attribute its text content.

tags_names.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    print(f'HTML: {soup.h2}, name: {soup.h2.name}, text: {soup.h2.text}')

The code example prints HTML code, name, and text of the h2 tag.

$ ./tags_names.py
HTML: &lt;h2&gt;Operating systems&lt;/h2&gt;, name: h2, text: Operating systems

## BeautifulSoup traverse tags

With the recursiveChildGenerator method we traverse the HTML 
document.

traverse_tree.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    for child in soup.recursiveChildGenerator():

        if child.name:

            print(child.name)

The example goes through the document tree and prints the
names of all HTML tags.

$ ./traverse_tree.py
html
head
title
meta
body
h2
ul
li
li
li
li
li
p
p

In the HTML document we have these tags.

## BeautifulSoup element children

With the children attribute, we can get the children
of a tag.

get_children.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    root = soup.html

    root_childs = [e.name for e in root.children if e.name is not None]
    print(root_childs)

The example retrieves children of the html tag, places them
into a Python list and prints them to the console. Since the children
attribute also returns spaces between the tags, we add a condition to include
only the tag names.

$ ./get_children.py
['head', 'body']

The html tags has two children: head and body.

## BeautifulSoup element descendants

With the descendants attribute we get all descendants (children of all levels)
of a tag.

get_descendants.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    root = soup.body

    root_childs = [e.name for e in root.descendants if e.name is not None]
    print(root_childs)

The example retrieves all descendants of the body tag.

$ ./get_descendants.py
['h2', 'ul', 'li', 'li', 'li', 'li', 'li', 'p', 'p']

These are all the descendants of the body tag.

## BeautifulSoup web scraping

Requests is a simple Python HTTP library. It provides methods for
accessing Web resources via HTTP.

scraping.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup
import requests as req

resp = req.get('http://webcode.me')

soup = BeautifulSoup(resp.text, 'lxml')

print(soup.title)
print(soup.title.text)
print(soup.title.parent)

The example retrieves the title of a simple web page. It also
prints its parent.

resp = req.get('http://webcode.me')

soup = BeautifulSoup(resp.text, 'lxml')

We get the HTML data of the page.

print(soup.title)
print(soup.title.text)
print(soup.title.parent)

We retrieve the HTML code of the title, its text, and the HTML code
of its parent.

$ ./scraping.py 
&lt;title&gt;My html page&lt;/title&gt;
My html page
&lt;head&gt;
&lt;meta charset="utf-8"/&gt;
&lt;meta content="width=device-width, initial-scale=1.0" name="viewport"/&gt;
&lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;

## BeautifulSoup prettify code

With the prettify method, we can make the HTML code look better.

prettify.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup
import requests as req

resp = req.get('http://webcode.me')

soup = BeautifulSoup(resp.text, 'lxml')

print(soup.prettify())

We prettify the HTML code of a simple web page.

$ ./prettify.py 
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"/&gt;
    &lt;meta content="width=device-width, initial-scale=1.0" name="viewport"/&gt;
    &lt;title&gt;
      My html page
    &lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;p&gt;
      Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;
    &lt;p&gt;
      Hello there. How are you?
    &lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;

## BeautifulSoup scraping with built-in web server

We can also serve HTML pages with a simple built-in HTTP server. 

$ mkdir public
$ cp index.html public/

We create a public directory and copy the index.html
there. 

$ python -m http.server --directory public
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...

Then we start the Python HTTP server.

scraping2.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup
import requests as req

resp = req.get('http://localhost:8000/')

soup = BeautifulSoup(resp.text, 'lxml')

print(soup.title)
print(soup.body)

Now we get the document from the locally running server.

## BeautifulSoup find elements by Id

With the find method we can find elements by various means
including element id.

find_by_id.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    #print(soup.find('ul', attrs={ 'id' : 'mylist'}))
    print(soup.find('ul', id='mylist'))

The code example finds ul tag that has mylist id.
The commented line has is an alternative way of doing the same task.

## BeautifulSoup find all tags

With the find_all method we can find all elements that meet
some criteria.

find_all.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    for tag in soup.find_all('li'):
        print(f'{tag.name}: {tag.text}')

The code example finds and prints all li tags.

$ ./find_all.py 
li: Solaris
li: FreeBSD
li: Debian
li: NetBSD
li: Windows

The find_all method can take a list of elements
to search for.

find_all2.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    tags = soup.find_all(['h2', 'p'])

    for tag in tags:
        print(' '.join(tag.text.split()))

The example finds all h2 and p elements
and prints their text.

The find_all method can also take a function which determines
what elements should be returned.

find_by_fun.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

def myfun(tag):

    return tag.is_empty_element

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    tags = soup.find_all(myfun)
    print(tags)

The example prints empty elements.

$ ./find_by_fun.py
[&lt;meta charset="utf-8"/&gt;]

The only empty element in the document is meta.

It is also possible to find elements by using regular expressions.

regex.py
  

#!/usr/bin/python

import re

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    strings = soup.find_all(string=re.compile('BSD'))

    for txt in strings:

        print(' '.join(txt.split()))

The example prints content of elements that contain 'BSD' string.

$ ./regex.py
FreeBSD
NetBSD
FreeBSD is an advanced computer operating system used to power modern servers, desktops, and embedded platforms.

## BeautifulSoup CSS selectors

With the select and select_one methods, we can use
some CSS selectors to find elements.

select_nth_tag.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    print(soup.select('li:nth-of-type(3)'))

This example uses a CSS selector to print the HTML code of the third 
li element.

$ ./select_nth_tag.py
&lt;li&gt;Debian&lt;/li&gt;

This is the third li element.

The # character is used in CSS to select tags by their
id attributes.

select_by_id.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    print(soup.select_one('#mylist'))

The example prints the element that has mylist id.

## BeautifulSoup append element

The append method appends a new tag to the HTML document.

append_tag.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    newtag = soup.new_tag('li')
    newtag.string='OpenBSD'

    ultag = soup.ul

    ultag.append(newtag)

    print(ultag.prettify())

The example appends a new li tag.

newtag = soup.new_tag('li')
newtag.string='OpenBSD'

First, we create a new tag with the new_tag method.

ultag = soup.ul

We get the reference to the ul tag.

ultag.append(newtag)

We append the newly created tag to the ul tag.

print(ultag.prettify())

We print the ul tag in a neat format.

## BeautifulSoup insert element

The insert method inserts a tag at the specified location.

insert_tag.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    newtag = soup.new_tag('li')
    newtag.string='OpenBSD'

    ultag = soup.ul

    ultag.insert(2, newtag)

    print(ultag.prettify())

The example inserts a li tag at the third
position into the ul tag.

## BeautifulSoup replace text

The replace_with replaces a text of an element.

replace_text.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    tag = soup.find(text='Windows')
    tag.replace_with('OpenBSD')

    print(soup.ul.prettify())

The example finds a specific element with the find method and
replaces its content with the replace_with method.

## BeautifulSoup remove element

The decompose method removes a tag from the tree and destroys it.

decompose_tag.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup

with open('index.html', 'r') as f:

    contents = f.read()

    soup = BeautifulSoup(contents, 'lxml')

    ptag2 = soup.select_one('p:nth-of-type(2)')

    ptag2.decompose()

    print(soup.body.prettify())

The example removes the second p element.

## Source

[Python Beautiful Soup Documentation](https://beautiful-soup-4.readthedocs.io/en/latest/)

In this article we have worked with the Python BeautifulSoup library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).