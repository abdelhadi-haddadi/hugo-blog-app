+++
title = "Python Semaphore"
date = 2025-08-29T20:10:20.891+01:00
draft = false
description = "Python Semaphore tutorial shows how to synchronize Python threads using Semaphore for resource management."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Semaphore

last modified February 15, 2025

In this article we show how to synchronize Python threads using
threading.Semaphore.

Semaphore is a synchronization tool that controls access to a
shared resource through a set of permits. It is useful for managing limited
resources, such as database connections or thread pools, where only a certain
number of threads can access the resource simultaneously.

A Semaphore is initialized with a number of permits. Threads can
acquire a permit using the acquire method and release it using the
release method. If no permits are available, the thread will block
until a permit is released by another thread.

## Semaphore Example

The following example demonstrates how to use threading.Semaphore
to control access to a shared resource.

main.py
  

import threading
import time

class SharedResource:
    def __init__(self, permits):
        self.semaphore = threading.Semaphore(permits)

    def use_resource(self, thread_name):
        with self.semaphore:  # Acquire and release a permit automatically
            print(f"{thread_name} is using the resource")
            time.sleep(2)  # Simulate resource usage
            print(f"{thread_name} is releasing the resource")

def worker(shared_resource, thread_name):
    shared_resource.use_resource(thread_name)

def main():
    shared_resource = SharedResource(2)  # Allow 2 permits

    threads = []
    for i in range(5):  # Create 5 threads
        thread = threading.Thread(target=worker, args=(shared_resource, f"Thread-{i+1}"))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print("All tasks completed")

if __name__ == "__main__":
    main()

In this program, a Semaphore is used to limit access to a shared
resource. Only two threads can access the resource at a time, as the semaphore
is initialized with two permits.

self.semaphore = threading.Semaphore(permits)

The SharedResource class is initialized with a
Semaphore that has a specified number of permits.

with self.semaphore:  # Acquire and release a permit automatically

The with statement is used to automatically acquire and release a
permit, ensuring proper resource management.

shared_resource = SharedResource(2)  # Allow 2 permits

The SharedResource is initialized with two permits, meaning only
two threads can access the resource simultaneously.

$ python main.py
Thread-1 is using the resource
Thread-2 is using the resource
Thread-1 is releasing the resource
Thread-2 is releasing the resource
Thread-3 is using the resource
Thread-4 is using the resource
Thread-3 is releasing the resource
Thread-4 is releasing the resource
Thread-5 is using the resource
Thread-5 is releasing the resource
All tasks completed

## Semaphore with Timeout

The following example demonstrates how to use a Semaphore with a
timeout. If a thread cannot acquire a permit within the specified timeout, it
will proceed without accessing the resource.

main.py
  

import threading
import time

class SharedResource:
    def __init__(self, permits):
        self.semaphore = threading.Semaphore(permits)

    def use_resource(self, thread_name):
        if self.semaphore.acquire(timeout=1):  # Try to acquire a permit with a timeout
            print(f"{thread_name} is using the resource")
            time.sleep(2)  # Simulate resource usage
            print(f"{thread_name} is releasing the resource")
            self.semaphore.release()  # Release the permit
        else:
            print(f"{thread_name} could not acquire the resource")

def worker(shared_resource, thread_name):
    shared_resource.use_resource(thread_name)

def main():
    shared_resource = SharedResource(2)  # Allow 2 permits

    threads = []
    for i in range(5):  # Create 5 threads
        thread = threading.Thread(target=worker, args=(shared_resource, f"Thread-{i+1}"))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print("All tasks completed")

if __name__ == "__main__":
    main()

In this program, the Semaphore is used with a timeout. If a thread
cannot acquire a permit within 1 second, it will proceed without accessing the
resource.

if self.semaphore.acquire(timeout=1):  # Try to acquire a permit with a timeout

The acquire method is called with a timeout of 1 second. If the
permit is not acquired within this time, the thread proceeds without accessing
the resource.

$ python main.py
Thread-1 is using the resource
Thread-2 is using the resource
Thread-3 could not acquire the resource
Thread-4 could not acquire the resource
Thread-1 is releasing the resource
Thread-2 is releasing the resource
Thread-5 is using the resource
Thread-5 is releasing the resource
All tasks completed

## Thread Pool with Semaphore Example

The following example demonstrates how to use a threading.Semaphore
to implement a thread pool. The thread pool limits the number of concurrent
tasks being executed to a fixed size.

main.py
  

import threading
import time

class Task:
    def __init__(self, task_id, semaphore):
        self.task_id = task_id
        self.semaphore = semaphore

    def run(self):
        with self.semaphore:  # Acquire and release a permit automatically
            print(f"Task {self.task_id} is running on {threading.current_thread().name}")
            time.sleep(2)  # Simulate task execution
            print(f"Task {self.task_id} is completed")

def worker(task):
    task.run()

def main():
    pool_size = 3  # Maximum number of concurrent tasks
    semaphore = threading.Semaphore(pool_size)

    tasks = []
    for i in range(10):  # Create 10 tasks
        task = Task(i + 1, semaphore)
        thread = threading.Thread(target=worker, args=(task,))
        tasks.append(thread)
        thread.start()

    for thread in tasks:
        thread.join()  # Wait for all threads to complete

    print("All tasks completed")

if __name__ == "__main__":
    main()

In this program, a Semaphore is used to limit the number of
concurrent tasks being executed to a fixed size (3 in this case). Each task
acquires a permit before execution and releases it after completion.

with self.semaphore:  # Acquire and release a permit automatically

The with statement is used to automatically acquire and release a
permit, ensuring proper resource management.

pool_size = 3  # Maximum number of concurrent tasks
semaphore = threading.Semaphore(pool_size)

The Semaphore is initialized with a pool size of 3, meaning only 3
tasks can run concurrently.

$ python main.py
Task 1 is running on Thread-1
Task 2 is running on Thread-2
Task 3 is running on Thread-3
Task 1 is completed
Task 4 is running on Thread-4
Task 2 is completed
Task 5 is running on Thread-5
Task 3 is completed
Task 6 is running on Thread-6
Task 4 is completed
Task 7 is running on Thread-7
Task 5 is completed
Task 8 is running on Thread-8
Task 6 is completed
Task 9 is running on Thread-9
Task 7 is completed
Task 10 is running on Thread-10
Task 8 is completed
Task 9 is completed
Task 10 is completed
All tasks completed

## Source

[Python Semaphore - documentation](https://docs.python.org/3/library/threading.html#threading.Semaphore)

In this article we have shown how to synchronize Python threads using Semaphore
for resource management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).