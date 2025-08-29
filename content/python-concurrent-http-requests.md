+++
title = "Python concurrent HTTP requests"
date = 2025-08-29T20:07:51.091+01:00
draft = false
description = "Python concurrent HTTP requests tutorial shows how to perform concurrent HTTP requests in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python concurrent HTTP requests

last modified January 29, 2024

In this article we show how to generate concurrent HTTP requests in Python.

The Hypertext Transfer Protocol (HTTP) is an application protocol for
distributed, collaborative, hypermedia information systems. Within the HTTP
protocol, clients and servers communicate by exchanging messages. The messages
sent by the client, usually a Web browser, are called requests and the messages
sent by the server as an answer are called responses.

**Note:** the word concurrent means that we handle multiple tasks
within a specific time frame, for instance within 5 minutes. This does not
necessarily imply we are executing tasks at the same moment.

## Concurrent requests

Requests can be handled sequentially or concurrently. Sequential requests are
managed one by one. This can be inefficient if we deal with many requests. In
concurrent requests, the program does not wait for a request to finish to handle
another one; they are handled concurrently.

There are two basic ways to generate concurrent HTTP requests: via multiple
threads or via async programming. In multi-threaded approach, each request is
handled by a specific thread. In asynchronous programming, there is (usually)
one thread and an event loop, which periodically checks for the completion of
a task.

In Python, we can use ThreadPoolExecutor to generate concurrent
requests. To do async programming, we can use the asyncio module.
With the module, we also need to use modules that support async programming,
such as aiohttp or httpx.

## Python synchronous HTTP requests

In the first example, we create multiple HTTP requests synchronously. To measure
elapsed time, we use the perf_counter function.

mul_sync.py
  

#!/usr/bin/python

import requests as req
import time

urls = ['http://webcode.me', 'https://httpbin.org/get',
    'https://google.com', 'https://stackoverflow.com',
    'https://github.com', 'https://clojure.org',
    'https://fsharp.org']

tm1 = time.perf_counter()

for url in urls:

    resp = req.get(url)
    print(resp.status_code)

tm2 = time.perf_counter()
print(f'Total time elapsed: {tm2-tm1:0.2f} seconds')

In the example, we generate HTTP requests to seven websites and retrieve their
status codes. We use the requests library. The requests are
executed synchronously, one by one.

$ ./mul_sync.py
200
200
200
200
200
200
200
Total time elapsed: 2.96 seconds

## Python async HTTP requests

The following example generates asynchronous HTTP requests.

mul_async.py
  

#!/usr/bin/python

import httpx
import asyncio
import time

async def get_async(url):
    async with httpx.AsyncClient() as client:
        return await client.get(url)

urls = ['http://webcode.me', 'https://httpbin.org/get',
    'https://google.com', 'https://stackoverflow.com',
    'https://github.com', 'https://clojure.org',
    'https://fsharp.org']

async def launch():

    resps = await asyncio.gather(*map(get_async, urls))
    data = [resp.status_code for resp in resps]

    for status_code in data:
        print(status_code)

tm1 = time.perf_counter()

asyncio.run(launch())

tm2 = time.perf_counter()
print(f'Total time elapsed: {tm2-tm1:0.2f} seconds')

The example uses the httpx module to create an async client and the
asyncio module to create an event loop and schedule the async tasks.

async def get_async(url):
    async with httpx.AsyncClient() as client:
        return await client.get(url)

In Python async programming, we work with coroutines. A corountine is decorated
with the async keyword. The await keyword is used
to wait for a corountine and get its result once the function is finished.

resps = await asyncio.gather(*map(get_async, urls))

Multiple coroutines are handled concurrently with asyncio.gather
function.

$ ./mul_async.py
200
200
301
200
200
200
200
Total time elapsed: 0.93 seconds

## Python multi-threaded HTTP requests

In the next example, we generate concurrent HTTP requests with
ThreadPoolExecutor. A ThreadPoolExecutor uses a pool
of threads to execute calls concurrently.

threaded.py
  

#!/usr/bin/python

import requests
import concurrent.futures
import time

def get_status(url):

    resp = requests.get(url=url)
    return resp.status_code

urls = ['http://webcode.me', 'https://httpbin.org/get',
    'https://google.com', 'https://stackoverflow.com',
    'https://github.com', 'https://clojure.org',
    'https://fsharp.org']

tm1 = time.perf_counter()

with concurrent.futures.ThreadPoolExecutor() as executor:

    futures = []

    for url in urls:
        futures.append(executor.submit(get_status, url=url))

    for future in concurrent.futures.as_completed(futures):
        print(future.result())

tm2 = time.perf_counter()
print(f'Total time elapsed: {tm2-tm1:0.2f} seconds')

The ThreadPoolExecutor is located in the
concurrent.futures module.

with concurrent.futures.ThreadPoolExecutor() as executor:

A ThreadPoolExecutor is created.

futures.append(executor.submit(get_status, url=url))

The submit method schedules the function and returns a future
object representing the execution of the function.

for future in concurrent.futures.as_completed(futures):
    print(future.result())

The as_completed method returns an iterator over the futures. 
It yields futures as they complete.

$ ./threaded.py 
200
200
200
200
200
200
200
Total time elapsed: 0.86 seconds

## Source

[Python concurrency - documentation](https://docs.python.org/3/library/concurrency.html)

In this article we have showed how to generate concurrent HTTP requests in
Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).