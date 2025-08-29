+++
title = "Python deque (Double-Ended Queue)"
date = 2025-08-29T20:07:56.849+01:00
draft = false
description = "Complete guide to Python's deque from collections module covering operations, performance, and practical applications"
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python deque (Double-Ended Queue)

last modified April 2, 2025

A deque (pronounced "deck") is a double-ended queue from Python's 
collections module that supports efficient append and pop 
operations from both ends. It provides O(1) time complexity for these 
operations compared to O(n) for lists. This guide covers deque creation, 
operations, performance characteristics, and practical applications. Deques are 
ideal for queues, stacks, and sliding window algorithms.

## Basic deque Operations

Deques support versatile operations from both ends with consistent performance. 
They can be initialized empty or from an iterable, with optional max length. 
This example demonstrates core deque operations. Understanding these 
fundamentals is key to leveraging deques effectively.

basic_operations.py
from collections import deque

# Create a deque
d = deque([1, 2, 3])  # Initialize with elements
print(f"Initial deque: {d}")  # deque([1, 2, 3])

# Append elements
d.append(4)      # Add to right end
d.appendleft(0)  # Add to left end
print(f"After appends: {d}")  # deque([0, 1, 2, 3, 4])

# Pop elements
right = d.pop()       # Remove from right
left = d.popleft()    # Remove from left
print(f"After pops: {d}, popped: {left}, {right}")  # deque([1, 2, 3]), 0, 4

# Additional example: Max length
limited = deque(maxlen=3)
for i in range(5):
    limited.append(i)
    print(limited)  # Last 3 elements: deque([2, 3, 4], maxlen=3)

# Additional example: Rotation
d = deque([1, 2, 3, 4, 5])
d.rotate(2)   # Right rotation
print(d)      # deque([4, 5, 1, 2, 3])
d.rotate(-1)  # Left rotation
print(d)      # deque([5, 1, 2, 3, 4])

The example shows basic deque creation and modification. append/ 
appendleft add elements, while pop/ 
popleft remove them. The maxlen parameter creates a bounded deque 
that discards old elements when full.

Rotation moves elements circularly - positive numbers rotate right, negative 
left. Unlike lists, deque operations at both ends remain efficient regardless 
of size. This makes deques ideal for FIFO/LIFO structures.

## Performance Characteristics

Deques provide O(1) performance for append/pop operations at both ends versus 
O(n) for lists. This example benchmarks deque vs list performance. 
Understanding these differences helps choose the right data structure.

performance.py
from collections import deque
import timeit

# Test data sizes
sizes = [1000, 10000, 100000]

print(f"{'Size':&lt;10}{'deque append':&lt;20}{'list append':&lt;20}")
for size in sizes:
    # Time deque appendleft
    d_time = timeit.timeit(
        'd.appendleft(0)', 
        setup=f'from collections import deque; d = deque(range({size}))',
        number=10000
    )
    
    # Time list insert(0)
    l_time = timeit.timeit(
        'l.insert(0, 0)', 
        setup=f'l = list(range({size}))',
        number=10000
    )
    
    print(f"{size:&lt;10}{d_time:&lt;20.5f}{l_time:&lt;20.5f}")

# Additional example: Middle access
print("\nMiddle access performance:")
d = deque(range(100000))
l = list(range(100000))

%timeit d[50000]  # Slower than list
%timeit l[50000]  # Faster O(1) access

The benchmark shows deque's consistent O(1) performance for left appends 
regardless of size, while list's insert(0) becomes O(n) slower 
as size grows. Deques are optimized for end operations but have O(n) 
performance for middle access.

Lists are faster for random access (lst[index]) since deques are 
implemented as doubly-linked lists. Choose deques when frequently adding/
removing from both ends, lists for random access or fixed-length operations.

## Queue Implementations

Deques naturally implement both FIFO (queue) and LIFO (stack) structures. This 
example shows thread-safe queue implementations. Deques are ideal for these 
patterns due to their efficient end operations.

queues.py
from collections import deque
import threading

# FIFO Queue (First-In-First-Out)
class Queue:
    def __init__(self):
        self._items = deque()
        self._lock = threading.Lock()
    
    def enqueue(self, item):
        with self._lock:
            self._items.append(item)
    
    def dequeue(self):
        with self._lock:
            return self._items.popleft()
    
    def size(self):
        with self._lock:
            return len(self._items)

# LIFO Stack (Last-In-First-Out)
class Stack:
    def __init__(self):
        self._items = deque()
    
    def push(self, item):
        self._items.append(item)
    
    def pop(self):
        return self._items.pop()
    
    def peek(self):
        return self._items[-1] if self._items else None

# Usage
q = Queue()
q.enqueue('a')
q.enqueue('b')
print(q.dequeue())  # 'a'

s = Stack()
s.push('x')
s.push('y')
print(s.pop())      # 'y'

# Additional example: Bounded queue
class BoundedQueue:
    def __init__(self, max_size):
        self._items = deque(maxlen=max_size)
    
    def enqueue(self, item):
        if len(self._items) == self._items.maxlen:
            raise Exception("Queue full")
        self._items.append(item)
    
    def dequeue(self):
        return self._items.popleft()

bq = BoundedQueue(2)
bq.enqueue(1)
bq.enqueue(2)
# bq.enqueue(3)  # Raises Exception

The Queue class implements thread-safe FIFO operations using 
append (enqueue) and popleft (dequeue). The 
Stack uses append/pop for LIFO 
behavior. Both leverage deque's efficient end operations.

The BoundedQueue shows how to use maxlen for fixed-
size queues. Deques automatically discard old elements when full, but this 
example enforces an exception instead. These patterns are common in producer-
consumer scenarios.

## Sliding Window Algorithms

Deques excel at sliding window problems where you need to maintain a window of 
elements over a sequence. This example demonstrates a maximum sliding window 
implementation. Deques efficiently maintain window invariants.

sliding_window.py
from collections import deque

def max_sliding_window(nums, k):
    """Return max of each sliding window of size k."""
    q = deque()
    result = []
    
    for i, num in enumerate(nums):
        # Remove indices outside current window
        while q and q[0] &lt;= i - k:
            q.popleft()
        
        # Remove smaller elements from back
        while q and nums[q[-1]] &lt;= num:
            q.pop()
        
        q.append(i)
        
        # Window is fully formed
        if i &gt;= k - 1:
            result.append(nums[q[0]])
    
    return result

# Example usage
nums = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
print(max_sliding_window(nums, k))  # [3, 3, 5, 5, 6, 7]

# Additional example: Moving average
def moving_average(stream, window_size):
    q = deque(maxlen=window_size)
    for num in stream:
        q.append(num)
        yield sum(q) / len(q)

print(list(moving_average([10, 20, 30, 40, 50], 3)))  # [10.0, 15.0, 20.0, 30.0, 40.0]

The max_sliding_window function maintains indices in deque
q such that nums[q[0]] is always the maximum in the
current window. Elements outside the window are removed from the front, while
smaller elements are removed from the back before adding new indices.

The moving_average generator shows a simpler sliding window 
application using maxlen to maintain the window size. Deques make 
these algorithms concise and efficient compared to manual list manipulation.

## Multithreading with deque

Deques can be used in multithreaded applications when properly synchronized. 
This example shows a thread-safe producer-consumer pattern. While deque 
operations are atomic, proper locking is needed for compound operations.

threading.py
from collections import deque
import threading
import time
import random

class ProducerConsumer:
    def __init__(self, max_size):
        self.buffer = deque(maxlen=max_size)
        self.lock = threading.Lock()
        self.not_empty = threading.Condition(self.lock)
        self.not_full = threading.Condition(self.lock)
    
    def produce(self, item):
        with self.not_full:
            while len(self.buffer) == self.buffer.maxlen:
                self.not_full.wait()
            self.buffer.append(item)
            self.not_empty.notify()
    
    def consume(self):
        with self.not_empty:
            while not self.buffer:
                self.not_empty.wait()
            item = self.buffer.popleft()
            self.not_full.notify()
            return item

# Test
def producer(pc, items):
    for item in items:
        time.sleep(random.random())
        pc.produce(item)
        print(f"Produced: {item}")

def consumer(pc, count):
    for _ in range(count):
        time.sleep(random.random() * 2)
        item = pc.consume()
        print(f"Consumed: {item}")

pc = ProducerConsumer(3)
producer_thread = threading.Thread(
    target=producer, args=(pc, ['A', 'B', 'C', 'D', 'E'])
)
consumer_thread = threading.Thread(
    target=consumer, args=(pc, 5)
)

producer_thread.start()
consumer_thread.start()
producer_thread.join()
consumer_thread.join()

The ProducerConsumer class uses a bounded deque with condition 
variables to coordinate producers and consumers. Producers wait when the buffer 
is full, consumers wait when empty. Notifications ensure threads wake when 
conditions change.

While deque operations are thread-safe for single operations, compound 
operations (like check-then-act) require synchronization. The example shows 
proper locking for thread coordination, preventing race conditions in 
multithreaded scenarios.

## Deque vs Other Data Structures

Deques have different tradeoffs than lists, queues, and other collections. 
This example compares deques to alternatives. Choosing the right structure 
depends on your access patterns and performance needs.

comparison.py
from collections import deque
from queue import Queue, LifoQueue
import timeit

# Deque vs List for queue operations
print("Queue operations (popleft vs pop(0)):")
d = deque(range(100000))
l = list(range(100000))

%timeit d.popleft()      # Much faster
%timeit l.pop(0)         # Slow for large lists

# Deque vs queue.Queue
print("\nqueue.Queue vs deque:")
q = Queue()
d = deque()

%timeit q.put(1); q.get()  # Thread-safe but slower
%timeit d.append(1); d.popleft()  # Faster but not thread-safe

# Deque vs LifoQueue for stacks
print("\nStack operations:")
s = LifoQueue()
d = deque()

%timeit s.put(1); s.get()  # Thread-safe stack
%timeit d.append(1); d.pop()  # Faster alternative

# Additional example: Deque as circular buffer
def circular_buffer():
    d = deque(maxlen=10)
    for i in range(15):
        d.append(i)
    return list(d)  # Last 10 elements

print(circular_buffer())  # [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

Deques outperform lists for queue operations (popleft vs 
pop(0)) and match lists for stack operations. The 
queue.Queue and LifoQueue are thread-safe but slower 
than deque for single-threaded use.

Deques work well as circular buffers when using maxlen, 
automatically discarding old elements. For thread-safe scenarios, use 
queue module classes; otherwise, deque generally provides better 
performance for end operations.

## Best Practices

Use deques instead of lists when frequently adding/removing from both ends. 
For thread safety, add proper synchronization or use queue module. 
Set maxlen for bounded collections to prevent unbounded growth. 
Prefer deque's built-in methods over manual list manipulation for queue/stack 
operations. Consider deque for sliding window algorithms and similar patterns.

## Source References

Learn more from these resources: 
[Python deque Documentation](https://docs.python.org/3/library/collections.html#collections.deque),
[Python Time Complexity](https://wiki.python.org/moin/TimeComplexity),
and [Real Python deque Guide](https://realpython.com/python-deque/).

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).