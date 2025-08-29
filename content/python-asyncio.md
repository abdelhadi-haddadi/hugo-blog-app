+++
title = "Python asyncio"
date = 2025-08-29T20:07:40.980+01:00
draft = false
description = "Python asyncio tutorial shows how to do asynchronous programming in Python using the asyncio module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python asyncio

last modified January 29, 2024

In this article we show how to use the asyncio module for async programming
in Python.

With asynchronous programming, we can execute tasks concurrently with the main
program execution.

## The asyncio module

The asyncio is a library to write asynchronous programs in Python.

The module provides high-level API to:

    - run Python coroutines concurrently

    - perform network IO and IPC

    - control subprocesses

    - distribute tasks via queues

    - synchronize concurrent code

Concurrent programming is used for two kinds of tasks: IO-bound tasks and
CPU-boud tasks. Requesting data from a network, accessing a database, or reading
and writing are IO-bound tasks. CPU-boud tasks are tasks that are
computationally expensive, such as mathematical calculations or graphics
processing.

**Note:** Asynchronous programming is suited for IO-bound tasks.

To do async programming in Python, we use an event loop, coroutines, and
futures. The event loop is the main task which is responsible for managing the
asynchronous tasks and distributing them for execution. Coroutines are functions
that schedule the execution of the events. Futures are the result of the
execution of the coroutines. A result may end in an exception.

A coroutine is a Python function used in cooperative multitasking, where they
can be paused and resumed. The async keyword is used to create a
Python coroutine. The await keyword suspends execution of a
coroutine until it completes and returns the result data.

## Python asyncio simple example

The next is a simple example with asyncio.

simple.py
  

#!/usr/bin/python

import asyncio

async def mul(x, y):
    return x * y

loop = asyncio.get_event_loop()

try:
    res2 = loop.run_until_complete(mul(5, 5))
    print(res2)

finally:
    loop.close()

The program creates and runs an asynchronous function which multiplies two
numbers.

async def mul(x, y):
    return x * y

A coroutine is a function declared with async modifier.

loop = asyncio.get_event_loop()

The get_event_loop returns an asyncio event loop. An event loop is
needed to execute asynchronous code.

res = loop.run_until_complete(mul(5, 5))

The run_until_complete function runs the event loop until a future
is done. It returns the future's result, or raises its exception. A Future
represents an eventual result of an asynchronous operation.

## Python asyncio create_task

The create_task function wraps the given coroutine into a task and
schedules its execution. It returns the task object. The task is executed in the
loop returned by get_running_loop.

Coroutines are wrapped into tasks to gain additional functionality, such as task
cancellation or checking ready status.

create_task.py
  

#!/usr/bin/python

import asyncio

async def mul(x, y):
    return x * y

loop = asyncio.get_event_loop()

try:
    task = loop.create_task(mul(10, 10))

    res = loop.run_until_complete(task)
    print(res)

finally:
    loop.close()

The example creates a task and schedules it for execution. It prints the final
result.

## Python asyncio.sleep

The asyncio.sleep function sleeps the current coroutine for the
given amount of seconds. The function is often used to simulate a long-running
task.

sleep.py
  

#!/usr/bin/python

import asyncio
import time

async def task(tid, n):

    await asyncio.sleep(n)
    print(f'task {tid} finished')

loop = asyncio.get_event_loop()

tm1 = time.perf_counter()

try:
    t1 = loop.create_task(task(1, 3))
    loop.run_until_complete(t1)

    t2 = loop.create_task(task(2, 2))
    loop.run_until_complete(t2)

    t3 = loop.create_task(task(3, 1))
    loop.run_until_complete(t3)

finally:
    loop.close()

tm2 = time.perf_counter()
print(f'Total time elapsed: {tm2-tm1:0.2f} seconds')

In the example, we create and schedule three tasks. These tasks simulate some
work with asyncio.sleep. Each of the tasks runs asynchronously to
the main program, but the tasks themselves run sequentially in the main program.
We measure the elapsed time with time.perf_counter.

$ ./sleep.py
task 1 finished
task 2 finished
task 3 finished
Total time elapsed: 6.01 seconds

## Python asyncio gather

The asyncio.gather function is used to schedule multiple coroutines
concurrently.

gather.py
  

#!/usr/bin/python

import asyncio
import time

async def task(tid, n):

    await asyncio.sleep(n)
    print(f'task {tid} finished')

loop = asyncio.get_event_loop()

tm1 = time.perf_counter()

try:

    tasks = [
        loop.create_task(task(1, 3)),
        loop.create_task(task(2, 2)),
        loop.create_task(task(3, 1))
    ]

    loop.run_until_complete(asyncio.gather(*tasks))

finally:
    loop.close()

tm2 = time.perf_counter()
print(f'Total time elapsed: {tm2-tm1:0.2f} seconds')

In the example, we run the three tasks concurrently with
asyncio.gather.

$ ./asyncio_gather.py
task 3 finished
task 2 finished
task 1 finished
Total time elapsed: 3.00 seconds

## Python asyncio.run

With asyncio.run is a convenient function which simplifies our
code.The function creates an event loop, schedules the coroutines and in the end
closes the loop.

run.py
  

#!/usr/bin/python

import asyncio
import time

async def task(tid, n):

    await asyncio.sleep(n)
    print(f'task {tid} finished')

async def main():

    t1 = asyncio.create_task(task(1, 3))
    t2 = asyncio.create_task(task(2, 2))
    t3 = asyncio.create_task(task(3, 1))

    await asyncio.gather(t1, t2, t3)

tm1 = time.perf_counter()

asyncio.run(main())

tm2 = time.perf_counter()
print(f'Total time elapsed: {tm2-tm1:0.2f} seconds')

With asyncio.run, the code is more compact.

## Python asyncio echo server

In the following example, we create an echo server. An echo server sends the
message from the client back.

echo_server.py
  

#!/usr/bin/python

import asyncio

class EchoProtocol(asyncio.Protocol):

    def connection_made(self, transport):
        self.transport = transport

    def data_received(self, data):
        print(f'received: {data}')
        self.transport.write(data)

async def main(host, port):

    print(f'starting server on port {port}')

    loop = asyncio.get_running_loop()
    server = await loop.create_server(EchoProtocol, host, port)
    await server.serve_forever()

try:
    asyncio.run(main('127.0.0.1', 8001))
except KeyboardInterrupt:
    print('terminated')

The create_server function returns a coroutine which creates a TCP
server bound to host and port. The serve_forever function starts
accepting connections until the coroutine is cancelled. The server is closed
when the coroutine is cancelled.

$ nc 127.0.0.1 8001
Hello!
Hello!
Hi!
Hi!

We test the server with the nc command.

## Multiple HTTP requests

To make multiple async HTTP requests, we use the httpx module. The
module provides an HTTP client which contains sync and async APIs, and support
for both HTTP/1.1 and HTTP/2.

async_req.py
  

#!/usr/bin/python

import httpx
import asyncio

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

asyncio.run(launch())

The example makes asynchronous HTTP requests to five websites. It prints the
status code of all the provided urls.

$ ./async_req.py
200
200
200
200
200

## Python Playwright async example

Many libraries have support for asynchronous programming. The MS Playwright
library allows to automate browsers both in synchronous and asynchronous
modes.

async_title.py
  

#!/usr/bin/python

import asyncio

from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as playwright:

        webkit = playwright.webkit
        browser = await webkit.launch()
        page = await browser.new_page()

        url = 'http://webcode.me'
        await page.goto(url)
        title = await page.title()

        print(title)

        await browser.close()

asyncio.run(main())

In the example, we get the title of a web page with Playwright. We use
the async API.

$ ./async_title.py
My html page

## Source

[Python asyncio - language reference](https://docs.python.org/3/library/asyncio.html)

In this article we have worked with the Python's asyncio module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).