+++
title = "Python ThreadPoolExecutor"
date = 2025-08-29T20:10:54.613+01:00
draft = false
description = "Python ThreadPoolExecutor tutorial demonstrates concurrent programming in Python using ThreadPoolExecutor."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python ThreadPoolExecutor

last modified April 19, 2025

This tutorial explores concurrent programming in Python using ThreadPoolExecutor,
a powerful tool for managing threads efficiently.

Concurrent programming aims to enhance code efficiency by executing tasks
simultaneously. This can be achieved through threading, parallelism, or
asynchronous operations. Here, we focus on threading with ThreadPoolExecutor.

A thread is a separate flow of execution within a program. Threads excel at
I/O-bound tasks, like file downloads or database queries. Python's Global
Interpreter Lock (GIL) limits true parallelism, making threads suitable for
I/O-bound tasks rather than CPU-bound ones, where multiprocessing is preferred.

The Global Interpreter Lock (GIL) is a mechanism in Python that ensures only one
thread executes Python bytecode at a time, even on multi-core systems. This
prevents concurrency issues but restricts parallel execution.

The threading module offers a foundational interface for creating
and managing threads in Python, enabling concurrent task execution.

## ThreadPoolExecutor

The concurrent.futures module provides a high-level interface for
executing tasks concurrently. ThreadPoolExecutor, part of this module,
simplifies thread management by maintaining a pool of reusable worker threads,
streamlining thread creation, execution, and cleanup.

Creating new threads incurs significant overhead. ThreadPoolExecutor's worker
threads are reused after tasks complete, improving performance and efficiency.

## Future

A Future object represents the eventual outcome of an asynchronous
operation, which may result in a value or an exception. Its result
method retrieves the operation's outcome once complete.

## Python ThreadPoolExecutor submit

The submit method schedules a callable for execution and returns a
Future object, which tracks the task's progress and result.

submitfun.py
  

#!/usr/bin/python

from time import sleep
from concurrent.futures import ThreadPoolExecutor
import threading

def task(id, n):

    print(f"thread {id} started")
    print(f"thread {id} : {threading.get_ident()}")
    sleep(n)
    print(f"thread {id} completed")

with ThreadPoolExecutor() as executor:

    executor.submit(task, 1, 4)
    executor.submit(task, 2, 3)
    executor.submit(task, 3, 2)

This example demonstrates submitting three tasks for concurrent execution using
ThreadPoolExecutor's submit method.

def task(id, n):

    print(f"thread {id} started")
    print(f"thread {id} : {threading.get_ident()}")
    sleep(n)
    print(f"thread {id} completed")

The task function prints the thread's ID, its unique identifier, and
status messages. It uses sleep to simulate a time-consuming
operation, such as I/O-bound work.

with ThreadPoolExecutor() as executor:

We create a ThreadPoolExecutor instance as a context manager, ensuring it shuts
down automatically when tasks are complete.

executor.submit(task, 1, 4)
executor.submit(task, 2, 3)
executor.submit(task, 3, 2)

Three tasks are submitted using submit, each with a unique ID and
sleep duration, enabling concurrent execution.

$ ./submitfun.py
thread 1 started
thread 1 : 140563097032256
thread 2 started
thread 2 : 140563088639552
thread 3 started
thread 3 : 140563005306432
thread 3 completed
thread 2 completed
thread 1 completed

## Python ThreadPoolExecutor map

The map method applies a function to each item in one or more
iterables, executing tasks concurrently and returning results in order.

mapfun.py
  

#!/usr/bin/python

from time import sleep
from concurrent.futures import ThreadPoolExecutor
import threading

def task(id, n):

    print(f"thread {id} started")
    print(f"thread {id} : {threading.get_ident()}")
    sleep(n)
    print(f"thread {id} completed")

with ThreadPoolExecutor() as executor:

    executor.map(task, [1, 2, 3], [4, 3, 2])

This example reimplements the previous program using map, passing
lists of thread IDs and sleep durations for concurrent execution.

## Python ThreadPoolExecutor Future.result

A Future object encapsulates the result of a concurrent task. The
result method retrieves the task's return value, blocking until the
task completes.

resultfun.py
  

#!/usr/bin/python

from time import sleep, perf_counter
import random
from concurrent.futures import ThreadPoolExecutor

def task(tid):

    r = random.randint(1, 5)
    print(f'task {tid} started, sleeping {r} secs')
    sleep(r)

    return f'finished task {tid}, slept {r}'

start = perf_counter()

with ThreadPoolExecutor() as executor:

    t1 = executor.submit(task, 1)
    t2 = executor.submit(task, 2)
    t3 = executor.submit(task, 3)

    print(t1.result())
    print(t2.result())
    print(t3.result())

finish = perf_counter()

print(f"It took {finish-start} second(s) to finish.")

This example runs tasks that sleep for random durations, retrieves their results,
and measures total execution time using perf_counter.

return f'finished task {tid}, slept {r}'

The task returns a string describing its completion, accessible via the
result method of the Future object.

start = perf_counter()

The perf_counter function provides high-precision timing to measure
the total duration of the concurrent tasks.

t1 = executor.submit(task, 1)
t2 = executor.submit(task, 2)
t3 = executor.submit(task, 3)

print(t1.result())
print(t2.result())
print(t3.result())

Three tasks are submitted, and their results are retrieved using
result, which blocks until each task completes, preserving the
submission order.

$ ./resultfun.py
task 1 started, sleeping 3 secs
task 2 started, sleeping 4 secs
task 3 started, sleeping 1 secs
finished task 1, slept 3
finished task 2, slept 4
finished task 3, slept 1
It took 4.005295900977217 second(s) to finish.

The program takes as long as the longest task due to concurrent execution. The
result method's blocking nature ensures results appear in submission
order. The next example addresses this limitation.

## Python ThreadPoolExecutor as_completed

The as_completed function provides an iterator over Future objects,
yielding results as tasks complete, regardless of submission order.

Note that map cannot be used with as_completed, as
map returns results in iterable order.

as_completed.py
  

#!/usr/bin/python

from time import sleep, perf_counter
import random
from concurrent.futures import ThreadPoolExecutor, as_completed

def task(tid):

    r = random.randint(1, 5)
    print(f'task {tid} started, sleeping {r} secs')
    sleep(r)

    return f'finished task {tid}, slept {r}'

start = perf_counter()

with ThreadPoolExecutor() as executor:

    tids = [1, 2, 3]
    futures = []

    for tid in tids:
        futures.append(executor.submit(task, tid))

    for res in as_completed(futures):
        print(res.result())

finish = perf_counter()

print(f"It took {finish-start} second(s) to finish.")

This example retrieves task results in the order they complete, using
as_completed to handle Futures dynamically.

$ ./as_completed.py
task 1 started, sleeping 3 secs
task 2 started, sleeping 4 secs
task 3 started, sleeping 2 secs
finished task 3, slept 2
finished task 1, slept 3
finished task 2, slept 4
It took 4.00534593896009 second(s) to finish.

## Multiple concurrent HTTP requests

This example uses ThreadPoolExecutor to perform multiple HTTP requests
concurrently, leveraging the requests library to fetch web page
status codes.

web_requests.py
  

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
print(f'elapsed {tm2-tm1:0.2f} seconds')

The program concurrently checks the HTTP status codes of multiple websites,
demonstrating ThreadPoolExecutor's efficiency for I/O-bound tasks.

$ ./web_requests.py 
200
200
200
200
200
200
200
elapsed 0.81 seconds

## Concurrent pinging

This example uses ThreadPoolExecutor to ping multiple websites concurrently,
executing the external ping command via the subprocess
module.

pinging.py
  

#!/usr/bin/python

from time import perf_counter
from concurrent.futures import ThreadPoolExecutor, as_completed
import subprocess

def task(url):

    ok, _ = subprocess.getstatusoutput(
        [f'ping -c 3 -w 10 {url}'])
    
    return ok == 0, url

urls = ['webcode.me', 'clojure.org', 'fsharp.org', 
    'www.perl.org', 'python.org', 'go.dev', 'raku.org']

start = perf_counter()

with ThreadPoolExecutor() as executor:

    futures = []

    for url in urls:
        futures.append(executor.submit(task, url))

    for future in as_completed(futures):

        r, u = future.result()
        
        if r:
            print(f'OK -&gt; {u}')
        else:
            print(f'failed -&gt; {u}')

finish = perf_counter()

print(f"elapsed {finish-start} second(s)")

The program concurrently pings multiple websites, reporting their availability
based on the ping command's exit status.

ok, _ = subprocess.getstatusoutput(
    [f'ping -c 3 -w 10 {url}'])

The getstatusoutput function captures the exit code and output of
the ping command, which sends three ICMP packets with a 10-second
timeout to the specified URL.

$ ./pinging.py 
OK -&gt; go.dev
OK -&gt; fsharp.org
OK -&gt; www.perl.org
OK -&gt; python.org
OK -&gt; raku.org
OK -&gt; clojure.org
OK -&gt; webcode.me
elapsed 2.384801392967347 second(s)

## Concurrent File Reading

This example uses ThreadPoolExecutor to read multiple text files concurrently,
demonstrating its use for I/O-bound file operations.

file_reading.py
  

#!/usr/bin/python

from concurrent.futures import ThreadPoolExecutor, as_completed
from time import perf_counter

def read_file(filename):
    try:
        with open(filename, 'r') as f:
            content = f.read()
        return f"Read {filename}: {len(content)} chars"
    except Exception as e:
        return f"Error reading {filename}: {e}"

files = ['file1.txt', 'file2.txt', 'file3.txt']

start = perf_counter()

with ThreadPoolExecutor() as executor:
    futures = [executor.submit(read_file, f) for f in files]
    for future in as_completed(futures):
        print(future.result())

finish = perf_counter()
print(f"Elapsed {finish-start:.2f} seconds")

This program reads three text files concurrently, reporting the number of
characters read from each or any errors encountered.

## Concurrent Database Queries

This example demonstrates ThreadPoolExecutor for executing multiple SQLite
database queries concurrently, ideal for I/O-bound database tasks.

db_queries.py
  

#!/usr/bin/python

import sqlite3
from concurrent.futures import ThreadPoolExecutor, as_completed
from time import perf_counter

def query_db(query):
    with sqlite3.connect('example.db') as conn:
        cursor = conn.cursor()
        cursor.execute(query)
        result = cursor.fetchall()
    return f"Query '{query}' returned {len(result)} rows"

queries = [
    "SELECT * FROM users WHERE age &gt; 20",
    "SELECT * FROM orders WHERE total &gt; 100",
    "SELECT * FROM products"
]

start = perf_counter()

with ThreadPoolExecutor() as executor:
    futures = [executor.submit(query_db, q) for q in queries]
    for future in as_completed(futures):
        print(future.result())

finish = perf_counter()
print(f"Elapsed {finish-start:.2f} seconds")

The program executes three SQLite queries concurrently, reporting the number of
rows returned by each query, showcasing efficient database access.

## Concurrent Image Downloads

This example uses ThreadPoolExecutor to download multiple images from URLs
concurrently, leveraging the requests library for HTTP requests.

image_downloads.py
  

#!/usr/bin/python

import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from time import perf_counter

def download_image(url):
    try:
        resp = requests.get(url)
        filename = url.split('/')[-1]
        with open(filename, 'wb') as f:
            f.write(resp.content)
        return f"Downloaded {filename}"
    except Exception as e:
        return f"Error downloading {url}: {e}"

urls = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.png',
    'https://example.com/image3.jpg'
]

start = perf_counter()

with ThreadPoolExecutor() as executor:
    futures = [executor.submit(download_image, u) for u in urls]
    for future in as_completed(futures):
        print(future.result())

finish = perf_counter()
print(f"Elapsed {finish-start:.2f} seconds")

The program downloads three images concurrently, saving them locally and
reporting success or errors, ideal for network-bound tasks.

## Concurrent Text Processing

This example uses ThreadPoolExecutor to process multiple text strings
concurrently, counting words in each, suitable for lightweight text tasks.

text_processing.py
  

#!/usr/bin/python

from concurrent.futures import ThreadPoolExecutor, as_completed
from time import perf_counter

def count_words(text):
    words = text.split()
    return f"Text '{text[:20]}...' has {len(words)} words"

texts = [
    "Python is a versatile programming language",
    "Concurrency improves performance in I/O tasks",
    "ThreadPoolExecutor simplifies thread management"
]

start = perf_counter()

with ThreadPoolExecutor() as executor:
    futures = [executor.submit(count_words, t) for t in texts]
    for future in as_completed(futures):
        print(future.result())

finish = perf_counter()
print(f"Elapsed {finish-start:.2f} seconds")

The program counts words in three text strings concurrently, reporting the word
count for each, demonstrating simple concurrent text processing.

## Source

[Python ThreadPoolExecutor - language reference](https://docs.python.org/3/library/concurrent.futures.html#threadpoolexecutor)

This tutorial covered concurrent programming with ThreadPoolExecutor, showcasing
its effectiveness for I/O-bound tasks in Python.

## Author

My name is Jan Bodnar, a dedicated programmer with extensive experience. Since
2007, I have authored over 1,400 programming articles and 8 e-books, with more
than a decade of teaching programming.

List [all Python tutorials](/python/).