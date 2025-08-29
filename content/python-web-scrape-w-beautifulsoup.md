+++
title = "Python web scrape w/ BeautifulSoup"
date = 2025-08-29T20:11:11.661+01:00
draft = false
description = "In this article we show how to do web scraping in Python using the BeautifulSoup library."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python web scrape w/ BeautifulSoup

last modified January 29, 2024

In this article we show how to do web scraping in Python using the
BeautifulSoup library.

*Web scraping* is fetching and extracting data from web pages. Web
scraping is used to collect and process data for marketing or research. The
data include job listings, price comparisons, or social media postings.

## BeautifulSoup

BeautifulSoup is a popular Python library for parsing HTML and XML documents.
BeautifulSoup transforms a complex HTML document into a complex tree of Python
objects, such as tag, navigable string, or comment.

To fetch data from a web page, we use the requests library.

## Scraping title

In the first example, we scrape the title of a web page.

title.py
  

#!/usr/bin/python

import bs4
import requests

url = 'http://webcode.me'
resp = requests.get(url)

soup = bs4.BeautifulSoup(resp.text, 'lxml')

print(soup.title)
print(soup.title.text)
print(soup.title.parent)

The program fetches an HTML document from webcode.me and uses BeautifulSoup
library to get the title of the document.

import bs4

We import the BeautifulSoup library.

import requests

We import the Requests library; it is a popular HTTP library.

url = 'http://webcode.me'
resp = requests.get(url)

We generate a GET requests to the given URL.

soup = bs4.BeautifulSoup(resp.text, 'lxml')

We create the BeautifulSoup object from the HTML document.

print(soup.title)
print(soup.title.text)
print(soup.title.parent)

We print the title, its contents, and the title's parent.

$ ./title.py 
&lt;title&gt;My html page&lt;/title&gt;
My html page
&lt;head&gt;
&lt;meta charset="utf-8"/&gt;
&lt;meta content="width=device-width, initial-scale=1.0" name="viewport"/&gt;
&lt;link href="format.css" rel="stylesheet"/&gt;
&lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;

## Scraping attributes

HTML attributes are special words used inside the opening tag to control the
element's behaviour. 

attrs.py
  

#!/usr/bin/python

import bs4
import requests

url = 'http://webcode.me/'
resp = requests.get(url)

soup = bs4.BeautifulSoup(resp.text, 'lxml')

link = soup.link

print(link.attrs)
print(link.attrs['href'])

In the example, we print the attributes of the link tag.

link = soup.link

We get the link tag.

print(link.attrs)

We retrieve all attributes of the link tag.

print(link.attrs['href'])

Here we get the href attribute.

$ ./attrs.py 
{'rel': ['stylesheet'], 'href': 'format.css'}
format.css

## Scraping descendants and parents

All the descendants and parents of a tag can be accessed via the
descendants and parents attributes.

des_par.py
  

#!/usr/bin/python

import bs4
import requests

url = 'http://webcode.me/os.html'
resp = requests.get(url)

soup = bs4.BeautifulSoup(resp.text, 'lxml')

ul = soup.ul

for e in ul.descendants:
    if isinstance(e, bs4.element.Tag):
        print(e.name)

print('-----------------------')

for e in ul.parents:
    print(e.name)

In the program, we find the ul tag and print its children and
ancestors.

for e in ul.descendants:
    if isinstance(e, bs4.element.Tag):
        print(e.name)

The descendants also include text elements while we want only the tags.
Therefore, we filter the elements with the isinstance method.
We get the names of the tags with the name attribute.

$ v ./des_par.py 
li
li
li
li
li
-----------------------
body
html
[document]

## Finding tags by name

With the find_all method, we can find all elements by name.

find_all.py
  

#!/usr/bin/python

import bs4
import requests

url = 'http://webcode.me/os.html'
resp = requests.get(url)

soup = bs4.BeautifulSoup(resp.text, 'lxml')

els = soup.find_all('li')

for e in els:
    print(e.string)

In the program, we find all li tags.

els = soup.find_all('li')

for e in els:
    print(e.string)

We find all li tags and print their text contents.

$ ./find_all.py 
Solaris
FreeBSD
Debian
NetBSD
Windows

## Finding tags by id

With find, we can find elements by its id attribute.

find_by_id.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup
import requests as req

url = 'http://webcode.me/os.html'
resp = req.get(url)

soup = BeautifulSoup(resp.text, 'lxml')

e = soup.find(id='netbsd')

print(e.name)
print(e.string)
print(e.prettify())

In the example, we find the tag that has id equal to 'netbsd'.

print(e.name)
print(e.string)
print(e.prettify())

We print the tags name, string content, and the prettified output.

$ ./find_by_id.py 
p

        NetBSD is a free, fast, secure, and highly portable Unix-like Open
        Source operating system.
    
&lt;p id="netbsd"&gt;
    NetBSD is a free, fast, secure, and highly portable Unix-like Open
        Source operating system.
&lt;/p&gt;

## Scraping multiple tags

We can pass the find_all function a list of tags that we want to 
find.

multiple_tags.py
  

#!/usr/bin/python

import bs4
import requests

url = 'http://webcode.me/os.html'
resp = requests.get(url)

soup = bs4.BeautifulSoup(resp.text, 'lxml')

els = soup.find_all(['title', 'h1', 'footer'])

for e in els:
    print(e.prettify())

We scrape the following three tags: title, h1, and footer.

$ ./multiple_tags.py 
&lt;title&gt;
 Header
&lt;/title&gt;

&lt;h1&gt;
 Operating systems
&lt;/h1&gt;

&lt;footer&gt;
 @ webcode.me
&lt;/footer&gt;

## Finding by function

We can pass a function to the attribute; the function returns True for each 
element that matches.

soup_fun.py
  

#!/usr/bin/python

import bs4
import requests

def find_tags(tag):
    return tag.name in ['title', 'h1', 'footer']

url = 'http://webcode.me/os.html'
resp = requests.get(url)

soup = bs4.BeautifulSoup(resp.text, 'lxml')

els = soup.find_all(name=find_tags)

for e in els:
    print(e.prettify())

The program finds three tags in the document.

def find_tags(tag):
    return tag.name in ['title', 'h1', 'footer']

The find_tags function returns True for which the tag.name in
['title', 'h1', 'footer'] expression returns True.

## Finding elements by string

With the string attribute, we can find elements that contain the 
specified string.

find_string.py
  

#!/usr/bin/python

import bs4
import re
import requests

url = 'http://webcode.me/os.html'
resp = requests.get(url)

soup = bs4.BeautifulSoup(resp.text, 'lxml')

term = re.compile('BSD')
els = soup.find_all('p', string=term)

for e in els:
    print(e.string.strip())

In the example, we find all paragraphs that contain the BSD string.

$ ./find_string.py 
FreeBSD is an advanced computer operating system used to power modern
        servers, desktops, and embedded platforms.
NetBSD is a free, fast, secure, and highly portable Unix-like Open
        Source operating system.

## Finding by CSS selectors

CSS selectors allow us to search by complex queries.

top_countries.py
  

#!/usr/bin/python

import bs4
import requests

url = 'http://webcode.me/countries.html'
resp = requests.get(url)

soup = bs4.BeautifulSoup(resp.text, 'lxml')

data = soup.select('tbody tr:nth-child(-n+5)')

for row in data:
    print(row.text.strip().replace('\n', ' '))

We can pass CSS selectors to the select method.

data = soup.select('tbody tr:nth-child(-n+5)')

With the given CSS selector, we find top 5 most populated country from the 
given table.

$ ./top_countries.py 
1 China 1382050000
2 India 1313210000
3 USA 324666000
4 Indonesia 260581000
5 Brazil 207221000

## Source

[Python BeautifulSoup documentation](https://beautiful-soup-4.readthedocs.io/en/latest/)

In this article we have showed how to do web scraping in Python with the
BeautifulSoup library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).