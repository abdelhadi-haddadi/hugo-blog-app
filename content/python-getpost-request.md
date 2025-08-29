+++
title = "Python GET/POST request"
date = 2025-08-29T20:08:36.287+01:00
draft = false
description = "Python HTTP GET/POST tutorial shows how to send a GET and a POST request in Python. We use the request and urllib3 modules."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python GET/POST request

last modified January 29, 2024

In this article we show how to send a GET and a POST request in Python. In the 
examples, we use the request, urllib3, and 
socket modules. We also show how to process a GET or POST request 
in Flask.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP is the foundation of data communication for the World Wide Web.

In the examples, we use httpbin.org, which is a freely available 
HTTP request and response service, and the webcode.me, which is 
a tiny HTML page for testing.

## HTTP GET

The HTTP GET method requests a representation of the specified resource. 

GET requests:

    - should only be used to request a resource

    - parameters are displayed in the URL

    - can be cached

    - remain in the browser history

    - can be bookmarked

    - should never be used when dealing with sensitive data

    - have length limits

## HTTP POST

The HTTP POST method sends data to the server. It is often used when 
uploading a file or when submitting a completed web form.

POST requests:

    - should be used to create a resource

    - parameters are not displayed in the URL

    - are never cached

    - do not remain in the browser history

    - cannot be bookmarked

    - can be used when dealing with sensitive data

    - have no length limits

## Python urllib3

The urllib3 module is a powerful, sanity-friendly HTTP client for Python.

$ pip install urllib3

We install the urllib3 module with pip. 

## Python requests

Requests is a simple and elegant Python HTTP library. It provides methods for
accessing Web resources via HTTP. It is released under the Apache License 2.0. 
It is one of the most popular Python packages.

$ pip install requests

We install the request module.

## Python Flask

Flask is the most popular Python micro web framework. Most of the functionality
is available as extensions including validation, form handling,
object-relational mappers, or authentication. Flask is based on Werkzeug WSGI
toolkit and Jinja2 template engine. 

$ pip install Flask

We install Flask.

## Python GET request with urllib3

A GET request is created with the request method, which receives 
the 'GET' value as its first parameter.

get_req.py
  

#!/usr/bin/python

import urllib3

http = urllib3.PoolManager()

url = 'http://webcode.me'

resp = http.request('GET', url)
print(resp.data.decode('utf-8'))

A GET request is sent to webcode.me.

$ ./get_req.py 
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

## Python POST request with urllib3

A POST request is created with the request method, which receives 
the 'POST' value as its first parameter.

post_req.py
  

#!/usr/bin/python

import urllib3
import certifi

http = urllib3.PoolManager(ca_certs=certifi.where())

url = 'https://httpbin.org/post'

req = http.request('POST', url, fields={'name': 'John Doe', 
    'occupation': 'gardener'})
print(req.data.decode('utf-8'))

A POST request is sent to httpbin.org/post.

$ ./post_req.py 
{
    "args": {}, 
    "data": "", 
    "files": {}, 
    "form": {
    "name": "John Doe", 
    "occupation": "gardener"
    }, 
    "headers": {
    "Accept-Encoding": "identity", 
    "Content-Length": "230", 
    "Content-Type": "multipart/form-data; boundary=510415c9b680823ee5512359fa1b3d22", 
    "Host": "httpbin.org", 
    "X-Amzn-Trace-Id": "Root=1-5f159c14-fc386023685d681205723862"
    }, 
    ...
    "url": "https://httpbin.org/post"
}

## Python GET request with requests

A GET request is generated with the get method.

get_req2.py
  

#!/usr/bin/python

import requests as req

resp = req.get("http://webcode.me")

print(resp.text)

A GET request is sent to webcode.me.

## Python POST request with requests

A POST request is generated with the post method.

post_req2.py
  

#!/usr/bin/python

import requests as req

data = {'name': 'Peter'}

resp = req.post("https://httpbin.org/post", data)
print(resp.text)

A POST request is sent to httpbin.org/post.

## Python process GET request in Flask

The following example shows how to process a GET request in a Flask application.

app.py
  

#!/usr/bin/python

from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():

    return 'Home page'

@app.route('/greet', methods=['GET'])
def greet():

    name = request.args.get('name', 'Guest')
    msg = f'Hello {name}'

    return msg, 200, {'Content-Type': 'text/plain; charset=utf-8'}

The application creates and sends a message to the client. It uses the value
from the name query parameter. 

@app.route('/greet', methods=['GET'])
def greet():
...

The greet function is mapped to the /greet
path and the GET type request.

$ export FLASK_APP=app.py
$ flask run

We run the application.

$ curl -i localhost:5000/greet?name=Lucia
HTTP/1.0 200 OK
Content-Type: text/plain; charset=utf-8
Content-Length: 11
Server: Werkzeug/1.0.0 Python/3.8.3
Date: Mon, 20 Jul 2020 13:37:38 GMT

Hello Lucia

We create a GET request to the application using the curl tool.
With the -i option, we also include the response header.

## Python process POST request in Flask

The following example shows how to process a POST request in Flask.

app.py
  

#!/usr/bin/python

from flask import Flask, make_response

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Home page'

@app.route('/users/&lt;name&gt;', methods=['POST'])
def create_user(name):

    msg = f'user {name} created'
    return make_response(msg, 201)

To process a POST request, we specify the method name in the methods
parameter.

$ export FLASK_APP=app.py
$ flask run

We run the application.

$ curl -X POST localhost:5000/users/Peter/
user Peter created

A POST request is created. 

## Source

[Python urllib3 User Guide](https://urllib3.readthedocs.io/en/stable/user-guide.html)

In this article we have generated basic GET and POST requests in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).