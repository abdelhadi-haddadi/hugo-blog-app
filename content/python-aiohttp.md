+++
title = "Python aiohttp"
date = 2025-08-29T20:07:36.535+01:00
draft = false
description = "Python aiohttp tutorial shows how to create asynchronous HTTP clients and servers in Python using the aiohttp module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python aiohttp

last modified January 29, 2024

In this article we show how to use the aiohttp module to create asynchronous
HTTP clients and servers in Python.

With asynchronous programming, we can execute tasks concurrently with the main
program execution.

With the aiohttp module, we can create asynchronous HTTP clients and servers 
in Python. The module also supports websocket. It allows to create web servers 
with pluggable middleware and routing.

## Python aiohttp simple client

The first example is a simple asynchronous HTTP client.

simple_client.py
  

#!/usr/bin/python

import aiohttp
import asyncio

url = 'http://webcode.me'

async def main():

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:

            print("Status:", response.status)

            data = await response.text()
            print(data)

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)
loop.run_until_complete(main())

In the program, we connect to a small web site and retrieve its status and
content.

import aiohttp
import asyncio

We import both aiohttp and asyncio modules.

async with aiohttp.ClientSession() as session:

A client session is created. It uses a connection pool for network connections.

async with session.get(url) as response:

We create a GET request with the get method.

print("Status:", response.status)

From the response object, we get the status code via the status
field.

data = await response.text()
print(data)

We get the content with the text method and print it to the
terminal.

loop = asyncio.new_event_loop()
asyncio.set_event_loop(loop)
loop.run_until_complete(main())

With the help of the asyncio module, we set up an event loop which 
is necessary for asynchronous programming.

λ ./simple_client.py 
Status: 200
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
...

## Python aiohttp multiple async requests

In the next example, we generate multiple asynchronous requests with aiohttp.

multiple.py
  

#!/usr/bin/python

import aiohttp
import asyncio

async def get_async(url):
    async with aiohttp.ClientSession() as session:
        return await session.get(url)

urls = ['http://webcode.me', 'https://httpbin.org/get',
    'https://google.com', 'https://stackoverflow.com',
    'https://github.com']

async def launch():
    
    resps = await asyncio.gather(*map(get_async, urls))
    data = [resp.status for resp in resps]

    for status_code in data:
        print(status_code)

asyncio.run(launch())

In the program, we create asynchronous HTTP GET requests to multiple URLs.

urls = ['http://webcode.me', 'https://httpbin.org/get',
    'https://google.com', 'https://stackoverflow.com',
    'https://github.com']

This is the list of URLs.

async def launch():

    resps = await asyncio.gather(*map(get_async, urls))
    data = [resp.status for resp in resps]

    for status_code in data:
        print(status_code)

With the built-in map function, we apply the get_async function to
the list of URLs. The returned list is unpacked into positional arguments with
the * (star) operator. If all coroutines are completed successfully, the result
is an aggregate list of returned values (HTML codes).

asyncio.run(launch())

The asyncio.run is a convenient function which simplifies our code.
The function creates an event loop, schedules the coroutines and in the end
closes the loop.

$ ./multiple.py 
200
200
200
200
200

## Python aiohttp simple web server

The following example creates a simple web server.

simple_web.py
  

#!/usr/bin/python

from aiohttp import web

async def home(req):
    return web.Response(text="home page")

app = web.Application()
app.add_routes([web.get('/', home)])

web.run_app(app)

The web server has one route that returns a text message.

async def home(req):
    return web.Response(text="home page")

The home function returns a text response.

app = web.Application()

A web application is created. 

app.add_routes([web.get('/', home)])

A new route is added with add_routes. The / path is 
mapped to the home handler.

web.run_app(app)

The run_app starts the web application.

$ ./simple_web.py 
======== Running on http://0.0.0.0:8080 ========
(Press CTRL+C to quit)

We start the web server.

$ curl localhost:8080
home page

In a different terminal, we generate a GET request with the curl
tool.

We can use Python decorators to define routes.

decor.py
  

#!/usr/bin/python

from aiohttp import web
routes = web.RouteTableDef()

@routes.get('/')
async def home(request):
    return web.Response(text="home page")

app = web.Application()
app.add_routes(routes)

web.run_app(app)

This program creates a simple web server, which has one route. The route is
defined with the @routes decorator.

## Python aiohttp JSON response

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. The official Internet media type for JSON is application/json.

The aiohttp module uses web.json_response to generate 
a JSON response.

send_json.py
  

#!/usr/bin/python

from aiohttp import web
routes = web.RouteTableDef()

@routes.get('/')
async def home(req):
    return web.Response(text="home page")

@routes.get('/users')
async def users(req):
    users = [{'name': 'John Doe', 'email': 'john.doe@example.org'},
            {'name': 'Roger Roe', 'email': 'roger.roe@example.org'}]
    return web.json_response(users)

app = web.Application()
app.add_routes(routes)

web.run_app(app)

In the application we define two routes using decorators. The
/users path returns a JSON response to the caller.

$  curl localhost:8080/
home page
$ curl localhost:8080/users
[{"name": "John Doe", "email": "john.doe@example.org"}, 
 {"name": "Roger Roe", "email": "roger.roe@example.org"}]

## Source

[Python aiohttp documentation](https://docs.aiohttp.org/en/stable/)

In this article we have worked with the Python's aiohttp module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).