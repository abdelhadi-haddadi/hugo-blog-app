+++
title = "Python BoundedBarrier"
date = 2025-08-29T20:07:43.244+01:00
draft = false
description = "Python BoundedBarrier tutorial shows how to synchronize Python threads using a custom BoundedBarrier for thread coordination."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python BoundedBarrier

last modified February 15, 2025

In this article we show how to synchronize Python threads using a custom
BoundedBarrier.

A BoundedBarrier is a synchronization primitive that allows a fixed
number of threads to wait for each other to reach a common barrier point. Unlike
the built-in threading.Barrier, a BoundedBarrier can
be implemented with additional constraints, such as limiting the maximum number
of threads that can wait at the barrier.

This tutorial demonstrates how to create a custom BoundedBarrier
using Python's threading.Condition and threading.Lock.

## BoundedBarrier Implementation

The following example demonstrates how to implement a custom BoundedBarrier.

main.py
  

import threading

class BoundedBarrier:
    def __init__(self, max_threads):
        self.max_threads = max_threads
        self.count = 0
        self.condition = threading.Condition()

    def wait(self):
        with self.condition:
            self.count += 1
            if self.count == self.max_threads:
                self.condition.notify_all()  # Notify all waiting threads
                self.count = 0  # Reset the counter for reuse
            else:
                self.condition.wait()  # Wait for other threads

def worker(barrier, thread_name):
    print(f"{thread_name} is starting")
    barrier.wait()  # Wait at the barrier
    print(f"{thread_name} has passed the barrier")

def main():
    max_threads = 3
    barrier = BoundedBarrier(max_threads)

    threads = []
    for i in range(max_threads):  # Create 3 threads
        thread = threading.Thread(target=worker, args=(barrier, f"Thread-{i+1}"))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print("All threads have passed the barrier")

if __name__ == "__main__":
    main()

In this program, a custom BoundedBarrier is implemented using
threading.Condition. The barrier allows a fixed number of threads
to wait for each other before proceeding.

self.condition = threading.Condition()

The BoundedBarrier uses a Condition object to manage thread synchronization.

self.count += 1
if self.count == self.max_threads:
    self.condition.notify_all()  # Notify all waiting threads
    self.count = 0  # Reset the counter for reuse
else:
    self.condition.wait()  # Wait for other threads

Each thread increments the counter when it reaches the barrier. If the counter
reaches the maximum number of threads, all waiting threads are notified, and the
counter is reset. Otherwise, the thread waits for other threads to arrive.

barrier = BoundedBarrier(max_threads)

The BoundedBarrier is initialized with the maximum number of
threads that can wait at the barrier.

$ python main.py
Thread-1 is starting
Thread-2 is starting
Thread-3 is starting
Thread-1 has passed the barrier
Thread-2 has passed the barrier
Thread-3 has passed the barrier
All threads have passed the barrier

## BoundedBarrier with Reuse

The following example demonstrates how to reuse the BoundedBarrier
for multiple synchronization points.

main.py
  

import threading
import time

class BoundedBarrier:
    def __init__(self, max_threads):
        self.max_threads = max_threads
        self.count = 0
        self.condition = threading.Condition()

    def wait(self):
        with self.condition:
            self.count += 1
            if self.count == self.max_threads:
                self.condition.notify_all()  # Notify all waiting threads
                self.count = 0  # Reset the counter for reuse
            else:
                self.condition.wait()  # Wait for other threads

def worker(barrier, thread_name, num_phases):
    for phase in range(num_phases):
        print(f"{thread_name} is working on phase {phase + 1}")
        time.sleep(1)  # Simulate work for the phase
        print(f"{thread_name} has completed phase {phase + 1}")
        barrier.wait()  # Wait at the barrier
        print(f"{thread_name} is moving to the next phase")

def main():
    max_threads = 3
    num_phases = 2  # Number of phases in the task
    barrier = BoundedBarrier(max_threads)

    threads = []
    for i in range(max_threads):  # Create 3 threads
        thread = threading.Thread(target=worker, args=(barrier, f"Thread-{i+1}", num_phases))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print("All phases completed by all threads")

if __name__ == "__main__":
    main()

In this program, the BoundedBarrier is reused for multiple
synchronization points. Each thread works on two phases, and the barrier ensures
that all threads complete one phase before moving to the next.

barrier.wait()  # Wait at the barrier

Each thread calls the wait method on the barrier after completing a
phase. This ensures that all threads finish the current phase before moving to
the next one.

$ python main.py
Thread-1 is working on phase 1
Thread-2 is working on phase 1
Thread-3 is working on phase 1
Thread-1 has completed phase 1
Thread-2 has completed phase 1
Thread-3 has completed phase 1
Thread-1 is moving to the next phase
Thread-2 is moving to the next phase
Thread-3 is moving to the next phase
Thread-1 is working on phase 2
Thread-2 is working on phase 2
Thread-3 is working on phase 2
Thread-1 has completed phase 2
Thread-2 has completed phase 2
Thread-3 has completed phase 2
Thread-1 is moving to the next phase
Thread-2 is moving to the next phase
Thread-3 is moving to the next phase
All phases completed by all threads

## Multi-Phase Task with Timeout Example

The following example demonstrates how to use a custom
BoundedBarrier with a timeout to synchronize threads across
multiple phases of execution. If a thread does not reach the barrier within the
specified timeout, it will proceed without waiting for the other threads.

main.py
  

import threading
import time

class BoundedBarrier:
    def __init__(self, max_threads):
        self.max_threads = max_threads
        self.count = 0
        self.condition = threading.Condition()

    def wait(self, timeout=None):
        with self.condition:
            self.count += 1
            if self.count == self.max_threads:
                self.condition.notify_all()  # Notify all waiting threads
                self.count = 0  # Reset the counter for reuse
                return True  # Barrier tripped
            else:
                if timeout is None:
                    self.condition.wait()  # Wait indefinitely
                else:
                    if not self.condition.wait(timeout):  # Wait with timeout
                        self.count -= 1  # Decrement count if timeout occurs
                        return False  # Barrier not tripped
                return True  # Barrier tripped

def worker(barrier, thread_name, num_phases):
    for phase in range(num_phases):
        print(f"{thread_name} is working on phase {phase + 1}")
        time.sleep(1)  # Simulate work for the phase
        print(f"{thread_name} has completed phase {phase + 1}")
        if not barrier.wait(timeout=2):  # Wait at the barrier with a timeout
            print(f"{thread_name} timed out waiting for the barrier in phase {phase + 1}")
            continue
        print(f"{thread_name} is moving to the next phase")

def main():
    max_threads = 3
    num_phases = 2  # Number of phases in the task
    barrier = BoundedBarrier(max_threads)

    threads = []
    for i in range(max_threads):  # Create 3 threads
        thread = threading.Thread(target=worker, args=(barrier, f"Thread-{i+1}", num_phases))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print("All phases completed by all threads")

if __name__ == "__main__":
    main()

In this program, the BoundedBarrier is used with a timeout to
synchronize threads across multiple phases. If a thread does not reach the
barrier within 2 seconds, it will proceed without waiting for the other threads.

def wait(self, timeout=None):
    with self.condition:
        self.count += 1
        if self.count == self.max_threads:
            self.condition.notify_all()  # Notify all waiting threads
            self.count = 0  # Reset the counter for reuse
            return True  # Barrier tripped
        else:
            if timeout is None:
                self.condition.wait()  # Wait indefinitely
            else:
                if not self.condition.wait(timeout):  # Wait with timeout
                    self.count -= 1  # Decrement count if timeout occurs
                    return False  # Barrier not tripped
            return True  # Barrier tripped

The wait method is updated to support a timeout. If the timeout
occurs, the thread decrements the counter and proceeds without waiting for the
other threads.

if not barrier.wait(timeout=2):  # Wait at the barrier with a timeout
    print(f"{thread_name} timed out waiting for the barrier in phase {phase + 1}")
    continue

Each thread calls the wait method with a timeout of 2 seconds. If
the barrier is not tripped within this time, the thread proceeds without
waiting.

$ python main.py
Thread-1 is working on phase 1
Thread-2 is working on phase 1
Thread-3 is working on phase 1
Thread-1 has completed phase 1
Thread-2 has completed phase 1
Thread-3 has completed phase 1
Thread-1 is moving to the next phase
Thread-2 is moving to the next phase
Thread-3 is moving to the next phase
Thread-1 is working on phase 2
Thread-2 is working on phase 2
Thread-3 is working on phase 2
Thread-1 has completed phase 2
Thread-2 has completed phase 2
Thread-3 has completed phase 2
Thread-1 is moving to the next phase
Thread-2 is moving to the next phase
Thread-3 is moving to the next phase
All phases completed by all threads

## Source

[Python threading - documentation](https://docs.python.org/3/library/threading.html)

In this article we have shown how to synchronize Python threads using a custom BoundedBarrier.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).