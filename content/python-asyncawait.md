+++
title = "Python async/await"
date = 2025-08-29T20:07:39.855+01:00
draft = false
description = "Python async/await tutorial shows how to use async await keywords in Python. With asynchronous programming, we can execute tasks concurrently with the main program execution."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python async/await

last modified January 29, 2024

In this article we show how to use async/await keywords in Python.

With asynchronous programming, we can execute tasks concurrently with the main
program execution. The async and await keywords simplify asynchronous
programming in Python. Python has asynchronous programming model built into the
language.

## Python coroutine

A coroutine is a Python function used in cooperative multitasking, where they
can be paused and resumed. A coroutine is declared with the 
async def syntax.

## The async/await keywords

The async/await keywords were standardized in Python 3.7. They
simplify asynchronous programming in Python. The async keyword is
used to create a Python coroutine. The await keyword suspends
execution of a coroutine until it completes and returns the result data.
The await keywords only works within an async function.

## Python async/await example I

The following is a simple program which uses async/await keywords.

simple.py
  

#!/usr/bin/python

import asyncio

async def mul(x, y):
    return x * y

loop = asyncio.get_event_loop()

res = loop.run_until_complete(mul(5, 5))
print(res2)

loop.close()

The program creates and runs an asynchronous function.

async def mul(x, y):
    return x * y

A coroutine is a function declared with async modifier.

loop = asyncio.get_event_loop()

The get_event_loop returns an asyncio event loop. An event loop is 
needed to execute asynchronous code.

res = loop.run_until_complete(mul(5, 5))

The run_until_complete function runs the event loop until a future
is done. It return the future's result, or raise its exception. A Future
represents an eventual result of an asynchronous operation.

## Python async/await example II

With asyncio.run, we simplify the code. The function creates an 
event loop, schedules the coroutines and in the end closes the loop.

simple2.py
  

#!/usr/bin/python

import asyncio

async def add(x, y):
    return x + y

async def get_results():
    res1 = await add(3, 4)
    res2 = await add(8, 5)

    print(res1, res2)

asyncio.run(get_results())

In the example, we run two async functions.  

$ python simple2.py 
7 13

## Python async/await example III

Gathering is a convenient way to schedule multiple coroutines to run
concurrently. We gather coroutines with asyncio.gather.

With asyncio.sleep we create a coroutine that finishes in the
specified number of secods. It is often used to simulate a long-running task.

simple3.py
  

#!/usr/bin/python

import asyncio
import time
import random

async def task1():

    wait = random.randint(0, 3)
    await asyncio.sleep(wait)
    print("task 1 finished")

async def task2():

    wait = random.randint(0, 3)
    await asyncio.sleep(wait)
    print("task 2 finished")

async def task3():

    wait = random.randint(0, 3)
    await asyncio.sleep(wait)
    print("task 3 finished")

async def main():

    for x in range(2):
        await asyncio.gather(task1(), task2(), task3())
        time.sleep(1)
        print('----------------------------')

t1 = time.perf_counter()
asyncio.run(main())
t2 = time.perf_counter()

print(f'Total time elapsed: {t2-t1:0.2f} seconds')

We have three tasks that finish in a random number of seconds. This way we 
simulate execution of three different long-running tasks.

async def main():

    for x in range(2):
        await asyncio.gather(task1(), task2(), task3())
        print('----------------------------')

The main functions gathers all the three tasks. It is also a coroutine,
decorated with async. We await the results of the
asyncio.gather with the await keyword.

$ python simple3.py 
task 2 finished
task 1 finished
task 3 finished
----------------------------
task 3 finished
task 2 finished
task 1 finished
----------------------------
Total time elapsed: 8.01 seconds

## Python Playwright async example

Many libraries have support for asynchronous programming. The MS Playwright
library allows to automate browsers both in synchronous and asynchronous
modes.

screenshot.py
  

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
        await page.screenshot(path='shot.png')

        await browser.close()

asyncio.run(main())

In the example, we create a screenshot of a web page with Playwright. We use 
the async API.

## Source

[Python asyncio - language reference](https://docs.python.org/3/library/asyncio.html)

In this article we have worked with async/await keywords in Python.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).