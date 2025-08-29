+++
title = "Python httpx"
date = 2025-08-29T20:08:40.918+01:00
draft = false
description = "Python httpx tutorial shows how to create HTTP requests in Python with the httpx module. The httpx allows to create both synchronous and asynchronous HTTP requests."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python httpx

last modified January 29, 2024

Python httpx tutorial shows how to create HTTP requests in Python with the httpx
module. The httpx allows to create both synchronous and asynchronous HTTP
requests.

## The httpx module

HTTPX is an HTTP client for Python 3, which provides sync and async APIs, and
support for both HTTP/1.1 and HTTP/2. It has similar API to the popular 
Python requests library. HTTPX requires Python 3.6+.

$ pip install httpx

We install the module with the pip command.

The httpx supports asynchronous web requests. With the combination of httpx and 
asyncio modules and async and await keywords, we can generate asynchronous web 
requests. This may lead to considerable increase of efficiency in our programs.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP is the foundation of data communication for the World Wide Web.

## Python httpx status code

In the first example, we determine the status of a web page. The status code 
is determined with the status_code property.

sync_status.py
  

#!/usr/bin/python

import httpx 

r = httpx.head('http://webcode.me')
print(r.status_code)

The example creates a synchronous HEAD request to the webcode.me website and
retrieves an http response. From the response, we get the status code. 

$ ./sync_status.py 
200

## Python httpx GET request

The following example creates a synchronous GET request.

sync_get.py
  

#!/usr/bin/python

import httpx 

r = httpx.get('http://webcode.me')
print(r.text)

We generate a GET request to a web page with the httpx.get method. 
The page is retrieved and and its HTML code is printed to the console.

$ ./sync_get.py 
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
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

There is a params option to send query parameters with the 
request.

sync_query_params.py
  

#!/usr/bin/python

import httpx 

payload = {'name': 'John Doe', 'occupation': 'gardener'}
r = httpx.get('https://httpbin.org/get', params = payload)
print(r.text)

The example sends query parameters with the GET request.

$ ./sync_query_params.py 
{
    "args": {
    "name": "John Doe", 
    "occupation": "gardener"
    }, 
    "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate, br", 
    "Host": "httpbin.org", 
    "User-Agent": "python-httpx/0.16.1", 
    "X-Amzn-Trace-Id": "Root=1-600817ec-25cb3dea461b3e7a6f21df27"
    }, 
    ...
    "url": "https://httpbin.org/get?name=John+Doe&amp;occupation=gardener"
}

## Python httpx POST form request

A POST request is generated with httpx.post method. 

With application/x-www-form-urlencoded the data is sent in the body of the
request; the keys and values are encoded in key-value tuples separated by
'&amp;', with a '=' between the key and the value.

sync_post_form.py
  

#!/usr/bin/python

import httpx 

payload = {'name': 'John Doe', 'occupation': 'gardener'}

r = httpx.post('https://httpbin.org/post', data=payload)
print(r.text)

We generate a synchronous POST request with FORM data to httpbin.org/post. The
payload is set to the data option.

$ ./sync_post_form.py 
{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip, deflate, br", 
    "Content-Length": "33", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "python-httpx/0.16.1", 
    "X-Amzn-Trace-Id": "Root=1-600819fd-5e7b28a97b2484c8438a6f2e"
  }, 
  "json": null, 
  ... 
  "url": "https://httpbin.org/post"
}

## Python httpx stream data

For larger downloads, we can stream responses that do not load the entire
response body into memory at once. For streaming, we use the
httpx.stream method.

sync_stream.py
  

#!/usr/bin/python

import httpx

url = 'https://download.freebsd.org/ftp/releases/amd64/amd64/ISO-IMAGES/12.0/FreeBSD-12.0-RELEASE-amd64-mini-memstick.img'

with open('FreeBSD-12.0-RELEASE-amd64-mini-memstick.img', 'wb') as f:

    with httpx.stream('GET', url) as r:

        for chunk in r.iter_bytes():
            f.write(chunk)

The example downloads the image of a FreeBSD OS. We iterate over the binary 
content with the iter_bytes method.

## Python httpx async GET request

The following example generates a simple asynchronous GET request.

async_get.py
  

#!/usr/bin/python

import httpx
import asyncio

async def main():
    async with httpx.AsyncClient() as client:
        r = await client.get('http://test.webcode.me')
        print(r.text)

asyncio.run(main())

In the example, we retrieve a small HTML page asynchronously.

import httpx
import asyncio

We need to import the httpx and asyncio modules. The
asyncio module is a library to write concurrent code using the
async/await syntax; it is often a perfect fit for IO-bound tasks.

async def main():

With async def, we create a coroutine. Coroutines are used for 
cooperative multitasking. 

async with httpx.AsyncClient() as client:

We create an asynchronous HTTP client. The library also must support the
asynchronous programming model.

r = await client.get('http://test.webcode.me')

With the await keyword, the get coroutine is launched
and then the program resumes execution; the coroutine gives control of the
execution back to the event loop. So the program does not halt waiting for the 
request. When the request arrives, the event loop continues where the coroutine
was awaited.

**Note: ** the await keyword must always be used within an async 
function.

asyncio.run(main())

The run method starts the event loop and calls the
main coroutine. The event loop is the central point for
registering, executing, and cancelling asynchronous functions.

## Python httpx multiple asynchronous GET requests

The asyncio.gather function runs coroutines concurrently.

async_mul_get.py
  

#!/usr/bin/python

import httpx
import asyncio

async def get_async(url):
    async with httpx.AsyncClient() as client:
        return await client.get(url)

urls = ["http://webcode.me", "https://httpbin.org/get"]

async def launch():
    resps = await asyncio.gather(*map(get_async, urls))
    data = [resp.text for resp in resps]
    
    for html in data:
        print(html)

asyncio.run(launch())

The example generates two asynchronous GET requests.

async def get_async(url):
     async with httpx.AsyncClient() as client:
         return await client.get(url)

This is the coroutine that generates asynchronous GET requests.

urls = ["http://webcode.me", "https://httpbin.org/get"]

We have two URLs.

async def launch():
     resps = await asyncio.gather(*map(get_async, urls))
     data = [resp.text for resp in resps]
     
     for html in data:
         print(html)

With the built-in map function, we apply the get_async
function to the list of URLs. The returned list is unpacked into positional 
arguments with the * (star) operator. If all coroutines are
completed successfully, the result is an aggregate list of returned values (HTML
codes).

## Python httpx async POST form request

The following example shows how to send an asynchronous POST requests with form 
data. 

async_post_form.py
  

#!/usr/bin/python

import httpx
import asyncio

async def main():

    data = {'name': 'John Doe', 'occupation': 'gardener'}

    async with httpx.AsyncClient() as client:
        r = await client.post('https://httpbin.org/post', data=data)
        print(r.text)

asyncio.run(main())

The data is passed to the data option of the post
coroutine.

## Python httpx async POST JSON request

The following example shows how to send an asynchronous POST request with JSON
data. 

post_json.py
  

#!/usr/bin/python

import httpx
import asyncio

async def main():

    data = {'int': 123, 'boolean': True, 'list': ['a', 'b', 'c']}

    async with httpx.AsyncClient() as client:
        r = await client.post('https://httpbin.org/post', json=data)
        print(r.text)

asyncio.run(main())

The data is set to the json option of the post
coroutine.

## Python httpx asynchronous stream request

The example shows how to download a large binary file in an asynchronous stream.

async_stream.py
  

#!/usr/bin/python

import httpx
import asyncio

url = 'https://download.freebsd.org/ftp/releases/amd64/amd64/ISO-IMAGES/12.0/FreeBSD-12.0-RELEASE-amd64-mini-memstick.img'

async def main():
    with open('FreeBSD-12.0-RELEASE-amd64-mini-memstick.img', 'wb') as f:

        async with httpx.AsyncClient() as client:
            async with client.stream('GET', url) as r:

                async for chunk in r.aiter_bytes():
                    f.write(chunk)

asyncio.run(main())

We use the client.stream and aiter_bytes functions.

## Comparing synchronous and asynchronous requests

In the following two examples, we compare the efficiency of a group of
synchronous and asynchronous requests. With the time module, 
we calculate the elapsed time. 

multiple_sync.py
  

#!/usr/bin/python

import httpx
import time

urls = ['http://webcode.me', 'https://httpbin.org/get', 
    'https://google.com', 'https://stackoverflow.com', 
    'https://github.com', 'https://mozilla.org']

start_time = time.monotonic()

for url in urls:
    r = httpx.get(url)
    print(r.status_code)

print(f'Elapsed: {time.monotonic() - start_time}')

We generate six synchronous GET requests and calculate the elapsed time. 

multiple_async.py
  

#!/usr/bin/python

import httpx
import asyncio
import time

async def get_async(url):
    async with httpx.AsyncClient() as client:
        return await client.get(url)

urls = ['http://webcode.me', 'https://httpbin.org/get', 
    'https://google.com', 'https://stackoverflow.com', 
    'https://github.com']

async def launch():
    resps = await asyncio.gather(*map(get_async, urls))
    data = [resp.status_code for resp in resps]
    
    for status_code in data:
        print(status_code)

start_time = time.monotonic()
asyncio.run(launch())
print(f'Elapsed: {time.monotonic() - start_time}')

We generate six asynchronous GET requests. 

$ ./multiple_async.py 
200
200
200
200
200
Elapsed: 0.935432159982156
$ ./multiple_sync.py 
200
200
200
200
200
200
Elapsed: 3.5428215700085275

In our case, the difference was more than 2.5 seconds.

## Source

[Python httpx documentation](https://www.python-httpx.org/)

In this article we have generated synchronous and asynchronous web requests
in Python with the httpx module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).