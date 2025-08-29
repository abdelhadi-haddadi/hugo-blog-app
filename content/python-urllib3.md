+++
title = "Python urllib3"
date = 2025-08-29T20:11:08.165+01:00
draft = false
description = "Python urllib3 tutorial introduces the Python urllib3 module. We show how to grab data, post data, stream data, work with JSON, and use redirects."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python urllib3

last modified January 29, 2024

Python urllib3 tutorial introduces the Python urllib3 module. We show how to
grab data, post data, stream data, work with JSON, and use redirects.

The Hypertext Transfer Protocol (HTTP) is an application
protocol for distributed, collaborative, hypermedia information systems. HTTP is
the foundation of data communication for the World Wide Web.

## Python urllib3

The urllib3 module is a powerful, sanity-friendly HTTP client for 
Python. It supports thread safety, connection pooling, client-side SSL/TLS 
verification, file uploads with multipart encoding, helpers for retrying requests 
and dealing with HTTP redirects, gzip and deflate encoding, and proxy for HTTP 
and SOCKS. 

$ pip install urllib3

We install the urllib3 module with pip.

## Python urllib3 version

The first program prints the version of the urllib3 module.

version.py
  

#!/usr/bin/python

import urllib3

print(urllib3.__version__)

The program prints the version or urllib3.

$ ./version.py
1.24.1

This is a sample output of the example.

## Python urllib3 status

HTTP response status codes indicate whether a specific HTTP request has been
successfully completed. Responses are grouped in five classes:

    - Informational responses (100–199)

    - Successful responses (200–299)

    - Redirects (300–399)

    - Client errors (400–499)

    - Server errors (500–599)

status.py
  

#!/usr/bin/python

import urllib3

http = urllib3.PoolManager()

url = 'http://webcode.me'

resp = http.request('GET', url)
print(resp.status)

The example creates a GET request to the webcode.me. It prints 
the status code of the response.

http = urllib3.PoolManager()

We create a PoolManager to generate a request. It handles all of the 
details of connection pooling and thread safety.

url = 'http://webcode.me'

This is the URL to which we send the request.

resp = http.request('GET', url)

With the request method, we make a GET request to the specified
URL.

print(resp.status)

We print the status code of the response.

$ status.py
200

The 200 status code means that the request has succeeded.

## Python urllib3 GET request

The HTTP GET method requests a representation of the specified resource.

get_request.py
  

#!/usr/bin/python

import urllib3

http = urllib3.PoolManager()

url = 'http://webcode.me'

resp = http.request('GET', url)
print(resp.data.decode('utf-8'))

The example sends a GET request to the webcode.me webpage. 
It returns the HTML code of the home page.

req = http.request('GET', url)

A GET request is generated.

print(resp.data.decode('utf-8'))

We get the data or the response and decode it into text. 

$ ./get_request.py
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

## Python urllib3 HEAD request

A HEAD request is a GET request without a message body.

head_request.py
  

#!/usr/bin/python

import urllib3

http = urllib3.PoolManager()

url = 'http://webcode.me'
resp = http.request('HEAD', url)

print(resp.headers['Server'])
print(resp.headers['Date'])
print(resp.headers['Content-Type'])
print(resp.headers['Last-Modified'])

In the example, we create a HEAD request to the webcode.me website.

print(resp.headers['Server'])
print(resp.headers['Date'])
print(resp.headers['Content-Type'])
print(resp.headers['Last-Modified'])

The response object contains the headers dictionary, which 
has the various header fields, such as server and date. 

$ ./head_request.py
nginx/1.6.2
Thu, 20 Feb 2020 14:35:14 GMT
text/html
Sat, 20 Jul 2019 11:49:25 GMT

From the output we can see that the web server of the website is nginx and 
the content type is HTML code.

## Python urllib3 HTTPS request

The urllib3 provides client-side TLS/SSL verification. For this, we
need to download the certifi module. It is a carefully curated
collection of Root Certificates for validating the trustworthiness of SSL
certificates while verifying the identity of TLS hosts. It has been extracted
from the Requests project.

$ pip install certifi

We install certifi.

import certifi

print(certifi.where())

To reference the installed certificate authority (CA) bundle, we use the 
built-in where function.

status2.py
  

#!/usr/bin/python

import urllib3
import certifi

url = 'https://httpbin.org/anything'

http = urllib3.PoolManager(ca_certs=certifi.where())
resp = http.request('GET', url)

print(resp.status)

We create a GET request to the https://httpbin.org/anything page.

http = urllib3.PoolManager(ca_certs=certifi.where())

We pass the root CA bundle to the PoolManager. Without this 
CA bundle, the request would issue the following warning:
 InsecureRequestWarning: Unverified HTTPS request is being made. Adding certificate verification is strongly advised..

## Python urllib3 query parameters

Query parameters are the part of a uniform resource locator (URL) which assigns
values to specified parameters. This is one way of sending data to the
destination server.

http://example.com/api/users?name=John%20Doe&amp;occupation=gardener

The query parameters are specified after the ? character. Multiple 
fields are separated with the &amp;. Special characters, such as spaces, 
are encoded. In the above string, the space is encoded with the %20
value.

query_params.py
  

#!/usr/bin/python

import urllib3
import certifi

http = urllib3.PoolManager(ca_certs=certifi.where())

payload = {'name': 'Peter', 'age': 23}

url = 'https://httpbin.org/get'
req = http.request('GET', url, fields=payload)

print(req.data.decode('utf-8'))

In the example, we send a GET request with some query parameters to the 
https://httpbin.org/get. The link simply returns some data back 
to the client, including the query parameters. The site is used for testing 
HTTP requests.

payload = {'name': 'Peter', 'age': 23}

This is the payload to be sent.

req = http.request('GET', url, fields=payload)

The query parameters are specified with the fields option.

$ ./query_params.py
{
  "args": {
    "age": "23",
    "name": "Peter"
  },
  "headers": {
    "Accept-Encoding": "identity",
    "Host": "httpbin.org",
    "X-Amzn-Trace-Id": "Root=1-5e4ea45f-c3c9c721c848f8f81a3129d8"
  },
  "origin": "188.167.251.9",
  "url": "https://httpbin.org/get?name=Peter&amp;age=23"
}

The httpbin.org responded with a JSON string, which includes 
our payload as well.

## Python urllib3 POST request

The HTTP POST method sends data to the server. It is often used when uploading
a file or when submitting a completed web form. 

post_request.py
  

#!/usr/bin/python

import urllib3
import certifi

http = urllib3.PoolManager(ca_certs=certifi.where())

url = 'https://httpbin.org/post'

req = http.request('POST', url, fields={'name': 'John Doe'})
print(req.data.decode('utf-8'))

The example sends a POST request. The data is specified with the fields
option.

$ ./post_request.py
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "name": "John Doe"
  },
  ...
  "url": "https://httpbin.org/post"
}

## Python urllib3 send JSON

In requests, such as POST or PUT, the client tells the server what type of 
data is actually sent with the Content-Type header.

send_json.py
  

#!/usr/bin/python

import urllib3
import certifi
import json

http = urllib3.PoolManager(ca_certs=certifi.where())

payload = {'name': 'John Doe'}
encoded_data = json.dumps(payload).encode('utf-8')

resp = http.request(
     'POST',
     'https://httpbin.org/post',
     body=encoded_data,
     headers={'Content-Type': 'application/json'})

data = json.loads(resp.data.decode('utf-8'))['json']
print(data)

The example sends JSON data. 

payload = {'name': 'John Doe'}
encoded_data = json.dumps(payload).encode('utf-8')

We encode the JSON data into binary format.

resp = http.request(
     'POST',
     'https://httpbin.org/post',
     body=encoded_data,
     headers={'Content-Type': 'application/json'})

We specify the Content-Type header in the request.

data = json.loads(resp.data.decode('utf-8'))['json']
print(data)

We decode the returned data back to text and print it to the console.

## Python urllib3 binary data

In the following example, we download binary data.   

get_binary.py
  

#!/usr/bin/python

import urllib3

http = urllib3.PoolManager()

url = 'http://webcode.me/favicon.ico'
req = http.request('GET', url)

with open('favicon.ico', 'wb') as f:
    f.write(req.data)

The example downloads a small icon.

with open('favicon.ico', 'wb') as f:
    f.write(req.data)

The req.data is in a binary format, which we can directly 
write to the disk.

## Python urllib3 stream data

Chunked transfer encoding is a streaming data transfer mechanism available since
HTTP 1.1. In chunked transfer encoding, the data stream is divided into a series 
of non-overlapping *chunks*.

The chunks are sent out and received independently of one another. Each chunk is
preceded by its size in bytes.  

Setting preload_content to False means that urllib3
will stream the response content. The stream  method iterates
over chunks of the response content. When streaming, we should call 
release_conn to release the http connection back
to the connection pool so that it can be re-used.

streaming.py
  

#!/usr/bin/python

import urllib3
import certifi

url = "https://docs.oracle.com/javase/specs/jls/se8/jls8.pdf"

local_filename = url.split('/')[-1]

http = urllib3.PoolManager(ca_certs=certifi.where())

resp = http.request(
    'GET',
    url,
    preload_content=False)

with open(local_filename, 'wb') as f:

    for chunk in resp.stream(1024):
        f.write(chunk)

resp.release_conn()

In the example, we download a PDF file. 

resp = http.request(
    'GET',
    url,
    preload_content=False)

With preload_content=False, we enable streaming. 

with open(local_filename, 'wb') as f:

    for chunk in resp.stream(1024):
        f.write(chunk)

We iterate over the chunks of data and save them to a file.

resp.release_conn()

In the end, we release the connection.

## Python urllib3 redirect

A redirect sends users and search engines to a different URL from the one
they originally requested. To follow redirects, we set the redirect
option to True.

redirect.py
  

#!/usr/bin/python

import urllib3
import certifi

http = urllib3.PoolManager(ca_certs=certifi.where())

url = 'https://httpbin.org/redirect-to?url=/'
resp = http.request('GET', url, redirect=True)

print(resp.status)
print(resp.geturl())
print(resp.info())

The example follows a redirect. 

$ ./redirect.py
200
/
HTTPHeaderDict({'Date': 'Fri, 21 Feb 2020 12:49:29 GMT', 'Content-Type': 'text/html; 
charset=utf-8', 'Content-Length': '9593', 'Connection': 'keep-alive', 
'Server': 'gunicorn/19.9.0', 'Access-Control-Allow-Origin': '*', 
'Access-Control-Allow-Credentials': 'true'})

## Python urllib3 Flask example

In the following example, we send a request to a small Flask web application.
Learn more about Flask web framework in [Python Flask tutorial](/python/flask).

$ pip install flask

We need to install the flask module. 

app.py
  

#!/usr/bin/python

from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/headers')
def hello():

    ua = request.headers.get('user-agent')
    ka = request.headers.get('connection')

    return f'User agent: {ua}; Connection: {ka}'

The application has one route. It sends the user agent and connection header 
fields of a request to the client.

send_req.py
  

#!/usr/bin/python

import urllib3

http = urllib3.PoolManager()

url = 'localhost:5000/headers'

headers = urllib3.make_headers(keep_alive=True, user_agent='Python program')
resp = http.request('GET', url, headers=headers)
print(resp.data.decode('utf-8'))

In this program, we send a request to our Flask application.

url = 'localhost:5000/headers'

Flask runs on port 5000 by default. 

headers = urllib3.make_headers(keep_alive=True, user_agent='Python program')

With the make_headers helper method, we create a headers dictionary.

resp = http.request('GET', url, headers=headers)

We send a GET request to the URL; we specify the headers dictionary.

print(resp.data.decode('utf-8'))

We print the response to the terminal.

$ export FLASK_APP=app.py
$ flask run

We run the Flask application.

$ ./send_req.py
User agent: Python program; Connection: keep-alive

From a different terminal, we launch the send_req.py program.

## Source

[Python urllib3 documentation](https://urllib3.readthedocs.io/en/stable/)

In this article we have worked with the Python urllib3 module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).