+++
title = "Python Barrier"
date = 2025-08-29T20:07:40.976+01:00
draft = false
description = "Python Barrier tutorial shows how to synchronize Python threads using Barrier for thread coordination."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Barrier

last modified July 15, 2024

In this article we show how to synchronize Python threads using threading.Barrier.

Barrier is a synchronization primitive that allows a fixed number of threads to wait for each other to reach a common barrier point. It is useful for coordinating multiple threads to perform a task in phases.

A Barrier is initialized with a count representing the number of threads that must reach the barrier before they can all proceed. Each thread calls the wait method on the barrier, which blocks until all threads have reached the barrier. Once all threads have arrived, they are released, and the barrier can be reused.

## Barrier Example

The following example demonstrates how to use threading.Barrier to synchronize multiple threads.

main.py
  

import threading
import time

def worker(barrier, thread_name):
    print(f"{thread_name} is starting")
    time.sleep(2)  # Simulate some work
    print(f"{thread_name} is waiting at the barrier")
    barrier.wait()  # Wait for all threads to reach the barrier
    print(f"{thread_name} is continuing after the barrier")

def main():
    num_threads = 3
    barrier = threading.Barrier(num_threads)

    threads = []
    for i in range(num_threads):  # Create 3 threads
        thread = threading.Thread(target=worker, args=(barrier, f"Thread-{i+1}"))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print("All threads completed")

if __name__ == "__main__":
    main()

In this program, a Barrier is used to synchronize three threads. Each thread performs some work, waits at the barrier, and then continues after all threads have reached the barrier.

barrier = threading.Barrier(num_threads)

The Barrier is initialized with the number of threads that must reach the barrier before they can all proceed.

barrier.wait()  # Wait for all threads to reach the barrier

Each thread calls the wait method on the barrier, which blocks until all threads have reached the barrier.

for thread in threads:
    thread.join()  # Wait for all threads to complete

The main thread waits for all worker threads to complete using the join method.

$ python main.py
Thread-1 is starting
Thread-2 is starting
Thread-3 is starting
Thread-1 is waiting at the barrier
Thread-2 is waiting at the barrier
Thread-3 is waiting at the barrier
Thread-1 is continuing after the barrier
Thread-2 is continuing after the barrier
Thread-3 is continuing after the barrier
All threads completed

## Barrier with Action

The following example demonstrates how to use a Barrier with an
action. The action is executed once all threads have reached the barrier.

main.py
  

import threading
import time

def worker(barrier, thread_name):
    print(f"{thread_name} is starting")
    time.sleep(2)  # Simulate some work
    print(f"{thread_name} is waiting at the barrier")
    barrier.wait()  # Wait for all threads to reach the barrier
    print(f"{thread_name} is continuing after the barrier")

def barrier_action():
    print("All threads have reached the barrier")

def main():
    num_threads = 3
    barrier = threading.Barrier(num_threads, action=barrier_action)

    threads = []
    for i in range(num_threads):  # Create 3 threads
        thread = threading.Thread(target=worker, args=(barrier, f"Thread-{i+1}"))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print("All threads completed")

if __name__ == "__main__":
    main()

In this program, the Barrier is initialized with an action that is
executed once all threads have reached the barrier.

barrier = threading.Barrier(num_threads, action=barrier_action)

The Barrier is initialized with an action that is executed once all
threads have reached the barrier.

def barrier_action():
    print("All threads have reached the barrier")

The action is a function that is executed once all threads have reached the barrier.

$ python main.py
Thread-1 is starting
Thread-2 is starting
Thread-3 is starting
Thread-1 is waiting at the barrier
Thread-2 is waiting at the barrier
Thread-3 is waiting at the barrier
All threads have reached the barrier
Thread-1 is continuing after the barrier
Thread-2 is continuing after the barrier
Thread-3 is continuing after the barrier
All threads completed

## Multi-Phase Task with Barrier Example

The following example demonstrates how to use a threading.Barrier
to synchronize threads across multiple phases of execution. Each phase
represents a distinct stage of work, and the barrier ensures that all threads
complete one phase before moving to the next.

main.py
  

import threading
import time

def worker(barrier, thread_name, num_phases):
    for phase in range(num_phases):
        print(f"{thread_name} is working on phase {phase + 1}")
        time.sleep(1)  # Simulate work for the phase
        print(f"{thread_name} has completed phase {phase + 1}")
        barrier.wait()  # Wait for all threads to complete the phase
        print(f"{thread_name} is moving to the next phase")

def main():
    num_threads = 3
    num_phases = 3  # Number of phases in the task
    barrier = threading.Barrier(num_threads)

    threads = []
    for i in range(num_threads):  # Create 3 threads
        thread = threading.Thread(target=worker, args=(barrier, f"Thread-{i+1}", num_phases))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()  # Wait for all threads to complete

    print("All phases completed by all threads")

if __name__ == "__main__":
    main()

In this program, a Barrier is used to synchronize three threads
across three phases of execution. Each thread works on a phase, waits for all
threads to complete the phase, and then moves to the next phase.

barrier = threading.Barrier(num_threads)

The Barrier is initialized with the number of threads that must
reach the barrier before they can all proceed to the next phase.

barrier.wait()  # Wait for all threads to complete the phase

Each thread calls the wait method on the barrier after completing a
phase. This ensures that all threads finish the current phase before moving to
the next one.

for thread in threads:
    thread.join()  # Wait for all threads to complete

The main thread waits for all worker threads to complete using the join method.

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
Thread-1 is working on phase 3
Thread-2 is working on phase 3
Thread-3 is working on phase 3
Thread-1 has completed phase 3
Thread-2 has completed phase 3
Thread-3 has completed phase 3
Thread-1 is moving to the next phase
Thread-2 is moving to the next phase
Thread-3 is moving to the next phase
All phases completed by all threads

## Source

[Python Barrier - documentation](https://docs.python.org/3/library/threading.html#threading.Barrier)

In this article we have shown how to synchronize Python threads using Barrier for thread coordination.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).