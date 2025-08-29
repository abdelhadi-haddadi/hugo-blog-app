+++
title = "Python web scrape"
date = 2025-08-29T20:11:10.546+01:00
draft = false
description = "Python web scrape tutorial shows how to extract data in Python. We use multiple libraries for web scraping."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python web scrape

last modified January 29, 2024

In this article we show how to do web scraping in Python. We use multiple
Python libraries.

*Web scraping* is fetching and extracting data from web pages. Web
scraping is used to collect and process data for marketing or research. The
data include job listings, price comparisons, or social media postings.

Python is a popular choice for data science. It contains many libraries for
web scraping. To fetch data, we can utilize the requests or
urllib3 libraries. The httpx library can be used if
we want to create asynchronous clients.

To process the data, we can use the lxml, pyquery, or
BeautifulSoup. These libraries are suited for static data. If the data is hidden
behind a JavaScript wall, we can use the Selenium or PlayWright libraries.

## Web scrape with urllib3 &amp; lxml

In the first example, we fetch data with urllib3 and process it
with lxml.

main.py
  

#!/usr/bin/python

import urllib3
from lxml import html

http = urllib3.PoolManager()

url = 'http://webcode.me'
resp = http.request('GET', url)

content = resp.data.decode('utf-8')
root = html.fromstring(content)

print('------------------------')

print(root.head.find(".//title").text)

print('------------------------')

for e in root:
    print(e.tag)

print('------------------------')

print(root.body.text_content().strip())

The program retrievs the HTML title, tags, and the text content of the HTML
body.

http = urllib3.PoolManager()

A PoolManager is created. It handles all of the details of connection pooling
and thread safety.

url = 'http://webcode.me'
resp = http.request('GET', url)

We generate a GET request to the specified URL.

content = resp.data.decode('utf-8')
root = html.fromstring(content)

We get and decode the content. We parse the string to create an HTML document
for lxml.

print(root.head.find(".//title").text)

We print the title of the document.

for e in root:
    print(e.tag)

Here we print all the tags from the first level of the document.

print(root.body.text_content().strip())

We print the text data of the HTML body.

$ ./main.py 
------------------------
My html page
------------------------
head
body
------------------------
Today is a beautiful day. We go swimming and fishing.
    
    
    
         Hello there. How are you?

## Web scrape with requests and pyquery

In the second example, we use the requests library to fetch data
and pyquery to process data. 

main.py
  

#!/usr/bin/python

from pyquery import PyQuery as pq
import requests as req

resp = req.get("http://www.webcode.me")
doc = pq(resp.text)

title = doc('title').text()
print(title)

pars = doc('p').text()
print(pars)

In the example, we get the title and the text data from all p tags.

resp = req.get("http://www.webcode.me")
doc = pq(resp.text)

We generate a GET request and create a parsable document object from the
response.

title = doc('title').text()
print(title)

We get the title tag from the document and print its text.

$ ./main.py
My html page
Today is a beautiful day. We go swimming and fishing. Hello there. How are you?

## Python scrape dictionary definitions

In the next example, we scrape definitions of a word from dictionary.com.
We use the requests and lxml libraries.

get_term.py
  

#!/usr/bin/python

import requests as req
from lxml import html
import textwrap

term = "dog"

resp = req.get("http://www.dictionary.com/browse/" + term)
root = html.fromstring(resp.content)

for sel in root.xpath("//span[contains(@class, 'one-click-content')]"):

    if sel.text:

        s = sel.text.strip()

        if (len(s) &gt; 3):

            print(textwrap.fill(s, width=50))

The program fetches the definitions of the term dog.

import textwrap

The textwrap module is used to wrap text to a certain width.

resp = req.get("http://www.dictionary.com/browse/" + term)

To perform a search, we append the term at the end of the URL.

root = html.fromstring(resp.content)

We need to use resp.content rather than resp.text
because html.fromstring implicitly expects bytes as input. (The
resp.content returns content in bytes whereas
resp.text as Unicode text.

for sel in root.xpath("//span[contains(@class, 'one-click-content')]"):

    if sel.text:

        s = sel.text.strip()

        if (len(s) &gt; 3):

            print(textwrap.fill(s, width=50))

We parse the content. The main definitions are located inside the
span tag, which has the one-click-content attribute.
We improve the formatting by removing excessive white space and stray
characters. The text width has maximum of 50 characters. Note that such parsing
is subject to change.

$ ./get_term.py
a domesticated canid,
any carnivore of the dog family Canidae, having
prominent canine teeth and, in the wild state, a
long and slender muzzle, a deep-chested muscular
body, a bushy tail, and large, erect ears.
...

## Python web scrape with BeautifulSoup

BeautifulSoup is a Python library for parsing HTML and XML documents. It is one 
of the most powerful web scraping solutions.

BeautifulSoup transforms a complex HTML document into a complex tree of Python
objects, such as tag, navigable string, or comment.

main.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup
import requests as req

resp = req.get('http://webcode.me')

soup = BeautifulSoup(resp.text, 'lxml')

print(soup.title)
print(soup.title.text)
print(soup.title.parent)

In the example, we get the title tag, title text and the parent of the title
tag. To fetch the web page, we utilize the requests library.

soup = BeautifulSoup(resp.text, 'lxml')

A BeautifulSoup object is created; the HTML data is passed to the constructor.
The second option specifies the internal parser.

print(soup.title)
print(soup.title.text)
print(soup.title.parent)

We get the data using built-in attributes.

$ ./main.py
&lt;title&gt;My html page&lt;/title&gt;
My html page
&lt;head&gt;
&lt;meta charset="utf-8"/&gt;
&lt;meta content="width=device-width, initial-scale=1.0" name="viewport"/&gt;
&lt;link href="format.css" rel="stylesheet"/&gt;
&lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;

## Python scrape top 5 countries

In the next example, we extract top 5 most populated countries.

top_countries.py
  

#!/usr/bin/python

from bs4 import BeautifulSoup
import requests as req

resp = req.get('http://webcode.me/countries.html')

soup = BeautifulSoup(resp.text, 'lxml')

data = soup.select('tbody tr:nth-child(-n+5)')

for row in data:
    print(row.text.strip().replace('\n', ' '))

To extract the data, we use the select method which perform a CSS
selection operation.

$ ./top_countries.py 
1 China 1382050000
2 India 1313210000
3 USA 324666000
4 Indonesia 260581000
5 Brazil 207221000

## Python scrape dynamic content

We can scrape dynamic content with PlayWright or Selenium. In our example, we
use the PlayWright library.

$ pip install --upgrade pip
$ pip install playwright
$ playwright install

We install PlayWright and the drivers.

main.py
  

#!/usr/bin/python

from playwright.sync_api import sync_playwright

with sync_playwright() as p:

    browser = p.chromium.launch()

    page = browser.new_page()
    page.goto("http://webcode.me/click.html")

    page.click('button', button='left')
    print(page.query_selector('#output').text_content())

    browser.close()

There is a single button on the web page. When we click on the button, a text 
message appears in the output div tag.

with sync_playwright() as p:

We work in synchronous mode.

browser = p.chromium.launch()

We use the chromium browser. The browser is headless.

page = browser.new_page()
page.goto("http://webcode.me/click.html")

We navigate to the page.

page.click('button', button='left')

We click on the button.

print(page.query_selector('#output').text_content())

We retrieve the message.

$ ./main.py 
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/109.0.5414.46 Safari/537.36

## Source

[Python Playwright documentation](https://playwright.dev/python/docs/intro)

In this article we have showed how to do web scraping in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).