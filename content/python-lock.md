+++
title = "Python Lock"
date = 2025-08-29T20:08:52.251+01:00
draft = false
description = "Python Lock tutorial shows how to synchronize Python threads using Lock for resource management."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Lock

last modified February 15, 2025

In this article we show how to synchronize Python threads using threading.Lock.

Lock is a synchronization primitive that ensures only one thread
can access a shared resource at a time. It is useful for preventing race
conditions when multiple threads attempt to modify shared data simultaneously.

A Lock has two states: locked and unlocked. A thread can acquire a
lock using the acquire method and release it using the
release method. If the lock is already acquired by another thread,
the calling thread will block until the lock is released.

## Lock Example

The following example demonstrates how to use threading.Lock to
protect a shared resource.

main.py
  

import threading

class SharedResource:
    def __init__(self):
        self.lock = threading.Lock()
        self.value = 0

    def increment(self):
        with self.lock:  # Acquire and release the lock automatically
            self.value += 1
            print(f"Value after increment: {self.value}")

def worker(shared_resource):
    for _ in range(5):  # Each thread increments the value 5 times
        shared_resource.increment()

def main():
    shared_resource = SharedResource()

    threads = []
    for i in range(3):  # Create 3 threads
        thread = threading.Thread(target=worker, args=(shared_resource,))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print(f"Final value: {shared_resource.value}")

if __name__ == "__main__":
    main()

In this program, a Lock is used to protect a shared integer value.
Multiple threads increment the value, and the lock ensures that only one thread
can modify the value at a time.

self.lock = threading.Lock()

The SharedResource class is initialized with a Lock to
protect the shared value.

with self.lock:  # Acquire and release the lock automatically

The with statement is used to automatically acquire and release the
lock, ensuring proper synchronization.

shared_resource = SharedResource()

The SharedResource is initialized, and the lock is used to protect
the shared value.

$ python main.py
Value after increment: 1
Value after increment: 2
Value after increment: 3
Value after increment: 4
Value after increment: 5
Value after increment: 6
Value after increment: 7
Value after increment: 8
Value after increment: 9
Value after increment: 10
Value after increment: 11
Value after increment: 12
Value after increment: 13
Value after increment: 14
Value after increment: 15
Final value: 15

## Lock with Timeout

The following example demonstrates how to use a Lock with a
timeout. If a thread cannot acquire the lock within the specified timeout, it
will proceed without modifying the shared resource.

main.py
  

import threading
import time

class SharedResource:
    def __init__(self):
        self.lock = threading.Lock()
        self.value = 0

    def increment(self):
        if self.lock.acquire(timeout=1):  # Try to acquire the lock with a timeout
            try:
                self.value += 1
                print(f"Value after increment: {self.value}")
            finally:
                self.lock.release()  # Release the lock
        else:
            print("Could not acquire the lock")

def worker(shared_resource):
    for _ in range(5):  # Each thread increments the value 5 times
        shared_resource.increment()
        time.sleep(0.5)  # Simulate some work

def main():
    shared_resource = SharedResource()

    threads = []
    for i in range(3):  # Create 3 threads
        thread = threading.Thread(target=worker, args=(shared_resource,))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print(f"Final value: {shared_resource.value}")

if __name__ == "__main__":
    main()

In this program, the Lock is used with a timeout. If a thread
cannot acquire the lock within 1 second, it will proceed without modifying the
shared resource.

if self.lock.acquire(timeout=1):  # Try to acquire the lock with a timeout

The acquire method is called with a timeout of 1 second. If the
lock is not acquired within this time, the thread proceeds without modifying the
shared resource.

$ python main.py
Value after increment: 1
Value after increment: 2
Value after increment: 3
Value after increment: 4
Value after increment: 5
Value after increment: 6
Value after increment: 7
Value after increment: 8
Value after increment: 9
Value after increment: 10
Value after increment: 11
Value after increment: 12
Value after increment: 13
Value after increment: 14
Value after increment: 15
Final value: 15

## Thread-Safe Queue with Lock Example

The following example demonstrates how to use a threading.Lock to
implement a thread-safe queue. The lock ensures that only one thread can modify
the queue at a time.

main.py
  

import threading
import time
import queue

class ThreadSafeQueue:
    def __init__(self):
        self.queue = queue.Queue()
        self.lock = threading.Lock()

    def put(self, item):
        with self.lock:  # Acquire and release the lock automatically
            self.queue.put(item)
            print(f"Added item: {item}")

    def get(self):
        with self.lock:  # Acquire and release the lock automatically
            if not self.queue.empty():
                item = self.queue.get()
                print(f"Removed item: {item}")
                return item
            return None

def producer(safe_queue):
    for i in range(5):  # Produce 5 items
        safe_queue.put(i)
        time.sleep(0.5)  # Simulate production time

def consumer(safe_queue):
    for _ in range(5):  # Consume 5 items
        safe_queue.get()
        time.sleep(1)  # Simulate consumption time

def main():
    safe_queue = ThreadSafeQueue()

    # Create producer and consumer threads
    producer_thread = threading.Thread(target=producer, args=(safe_queue,))
    consumer_thread = threading.Thread(target=consumer, args=(safe_queue,))

    producer_thread.start()
    consumer_thread.start()

    producer_thread.join()
    consumer_thread.join()

    print("Queue operations completed")

if __name__ == "__main__":
    main()

In this program, a Lock is used to protect a shared queue. The
producer thread adds items to the queue, and the consumer thread removes items
from the queue. The lock ensures that only one thread can modify the queue at a
time.

self.lock = threading.Lock()

The ThreadSafeQueue class is initialized with a Lock
to protect the shared queue.

with self.lock:  # Acquire and release the lock automatically

The with statement is used to automatically acquire and release the
lock, ensuring proper synchronization.

safe_queue = ThreadSafeQueue()

The ThreadSafeQueue is initialized, and the lock is used to protect
the shared queue.

$ python main.py
Added item: 0
Removed item: 0
Added item: 1
Added item: 2
Removed item: 1
Added item: 3
Added item: 4
Removed item: 2
Removed item: 3
Removed item: 4
Queue operations completed

## Source

[Python Lock - documentation](https://docs.python.org/3/library/threading.html#threading.Lock)

In this article we have shown how to synchronize Python threads using Lock for resource management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).