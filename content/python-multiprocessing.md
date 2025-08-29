+++
title = "Python multiprocessing"
date = 2025-08-29T20:08:56.692+01:00
draft = false
description = "Python multiprocessing tutorial is an introductory tutorial to process-based parallelism in Python. The multiprocessing module allows the programmer to fully leverage multiple processors on a given machine."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python multiprocessing

last modified January 29, 2024

Python multiprocessing tutorial is an introductory tutorial to process-based
parallelism in Python.

## Python multiprocessing

The multiprocessing module allows the programmer to fully
leverage multiple processors on a given machine. The API used is similar
to the classic threading module. It offers both local and remote
concurrency.

The multiprocesing module avoids the limitations of the Global Interpreter Lock
(GIL) by using subprocesses instead of threads. The multiprocessed code does not
execute in the same order as serial code. There is no guarantee that the
first process to be created will be the first to complete.

## Python GIL

A global interpreter lock (GIL) is a mechanism used in Python interpreter to
synchronize the execution of threads so that only one native thread can execute
at a time, even if run on a multi-core processor.

The C extensions, such as numpy, can manually release the GIL to speed up
computations. Also, the GIL released before potentionally blocking I/O
operations.

Note that both Jython and IronPython do not have the GIL.

## Concurrency and parallelism

Concurrency means that two or more calculations happen within the same time
frame. Parallelism means that two or more calculations happen at the same
moment. Parallelism is therefore a specific case of concurrency. It requires
multiple CPU units or cores.

True parallelism in Python is achieved by creating multiple processes, each
having a Python interpreter with its own separate GIL.

Python has three modules for concurrency: multiprocessing,
threading, and asyncio. When the tasks are CPU
intensive, we should consider the multiprocessing module. When
the tasks are I/O bound and require lots of connections, the asyncio
module is recommended. For other types of tasks and when libraries cannot
cooperate with asyncio, the threading module can be
considered.

## Embarrassinbly parallel

The term *embarrassinbly parallel* is used to describe a problem or workload
that can be easily run in parallel. It is important to realize that not all workloads
can be divided into subtasks and run parallelly. For instance those, who need lots
of communication among subtasks.

The examples of perfectly parallel computations include:

  - Monte Carlo analysis

  - numerical integration

  - rendering of computer graphics

  - brute force searches in cryptography

  - genetic algorithms

Another situation where parallel computations can be applied is when we run
several different computations, that is, we don't divide a problem into subtasks.
For instance, we could run calculations of π using different algorithms in
parallel.

## Process vs thread

Both processes and threads are independent sequences of execution. The following
table summarizes the differences between a process and a thread:

Process
Thread

processes run in separate memory (process isolation)
threads share memory

uses more memory
uses less memory

children can become zombies
no zombies possible

more overhead
less overhead

slower to create and destroy
faster to create and destroy

easier to code and debug
can become harder to code and debug

Table: Process vs thread

## Process

The Process object represents an activity that is run in a
separate process. The multiprocessing.Process class has equivalents
of all the methods of threading.Thread. The Process
constructor should always be called with keyword arguments.

The target argument of the constructor is the callable
object to be invoked by the run method.
The name is the process name. The start method
starts the process's activity. The join method blocks until the
process whose join method is called terminates. If the
timeout option is provided, it blocks at most timeout seconds.
The is_alive method returns a boolean value indicationg whether the
process is alive. The terminate method terminates the process.

## The __main__ guard

The Python multiprocessing style guide recommends to place the multiprocessing
code inside the __name__ == '__main__' idiom. This is due to the
way the processes are created on Windows. The guard is to prevent the endless
loop of process generations.

## Simple process example

The following is a simple program that uses multiprocessing.

simple.py
  

#!/usr/bin/python

from multiprocessing import Process

def fun(name):
    print(f'hello {name}')

def main():

    p = Process(target=fun, args=('Peter',))
    p.start()

if __name__ == '__main__':
    main()

We create a new process and pass a value to it.

def fun(name):
    print(f'hello {name}')

The function prints the passed parameter.

def main():

    p = Process(target=fun, args=('Peter',))
    p.start()

A new process is created. The target option provides the callable
that is run in the new process. The args provides the data to
be passed. The multiprocessing code is placed inside the main guard.
The process is started with the start method.

if __name__ == '__main__':
    main()

The code is placed inside the __name__ == '__main__' idiom.

## Python multiprocessing join

The join method blocks the execution of the main process until the
process whose join method is called terminates. Without the
join method, the main process won't wait until the process gets
terminated.

joining.py
  

#!/usr/bin/python

from multiprocessing import Process
import time

def fun():

    print('starting fun')
    time.sleep(2)
    print('finishing fun')

def main():

    p = Process(target=fun)
    p.start()
    p.join()

if __name__ == '__main__':

    print('starting main')
    main()
    print('finishing main')

The example calls the join on the newly created process.

$ ./joining.py
starting main
starting fun
finishing fun
finishing main

The *finishing main* message is printed after the child process has
finished.

$ ./joining.py
starting main
finishing main
starting fun
finishing fun

When we comment out the join method, the main process finishes
before the child process.

It is important to call the join methods after the start
methods.

join_order.py
  

#!/usr/bin/python

from multiprocessing import Process
import time

def fun(val):

    print(f'starting fun with {val} s')
    time.sleep(val)
    print(f'finishing fun with {val} s')

def main():

    p1 = Process(target=fun, args=(3, ))
    p1.start()
    # p1.join()

    p2 = Process(target=fun, args=(2, ))
    p2.start()
    # p2.join()

    p3 = Process(target=fun, args=(1, ))
    p3.start()
    # p3.join()

    p1.join()
    p2.join()
    p3.join()

    print('finished main')

if __name__ == '__main__':

    main()

If we call the join methods incorrectly, then we in fact run
the processes sequentially. (The incorrect way is commented out.)

## Python multiprocessing is_alive

The is_alive method determines if the process is running.

alive.py
  

#!/usr/bin/python

from multiprocessing import Process
import time

def fun():

    print('calling fun')
    time.sleep(2)

def main():

    print('main fun')

    p = Process(target=fun)
    p.start()
    p.join()

    print(f'Process p is alive: {p.is_alive()}')

if __name__ == '__main__':
    main()

When we wait for the child process to finish with the join method,
the process is already dead when we check it. If we comment out the join,
the process is still alive.

## Python multiprocessing Process Id

The os.getpid returns the current process Id, while the
os.getppid returns the parent's process Id.

process_id.py
  

#!/usr/bin/python

from multiprocessing import Process
import os

def fun():

    print('--------------------------')

    print('calling fun')
    print('parent process id:', os.getppid())
    print('process id:', os.getpid())

def main():

    print('main fun')
    print('process id:', os.getpid())

    p1 = Process(target=fun)
    p1.start()
    p1.join()

    p2 = Process(target=fun)
    p2.start()
    p2.join()

if __name__ == '__main__':
    main()

The example runs two child processes. It prints their Id and their parent's Id.

$ ./parent_id.py
main fun
process id: 7605
--------------------------
calling fun
parent process id: 7605
process id: 7606
--------------------------
calling fun
parent process id: 7605
process id: 7607

The parent Id is the same, the process Ids are different for each child process.

## Naming processes

With the name property of the Process, we can
give the worker a specific name. Otherwise, the module creates its own name.

naming_workers.py
  

#!/usr/bin/python

from multiprocessing import Process, current_process
import time

def worker():

    name = current_process().name
    print(name, 'Starting')
    time.sleep(2)
    print(name, 'Exiting')

def service():

    name = current_process().name
    print(name, 'Starting')
    time.sleep(3)
    print(name, 'Exiting')

if __name__ == '__main__':

    service = Process(name='Service 1', target=service)
    worker1 = Process(name='Worker 1', target=worker)
    worker2 = Process(target=worker) # use default name

    worker1.start()
    worker2.start()
    service.start()

In the example, we create three processes; two of them are given a custom name.

$ ./naming_workers.py
Worker 1 Starting
Process-3 Starting
Service 1 Starting
Worker 1 Exiting
Process-3 Exiting
Service 1 Exiting

## Subclassing Process

When we subclass the Process, we override the run
method.

subclass.py
  

#!/usr/bin/python

import time
from multiprocessing import Process

class Worker(Process):

    def run(self):

        print(f'In {self.name}')
        time.sleep(2)

def main():

    worker = Worker()
    worker.start()

    worker2 = Worker()
    worker2.start()

    worker.join()
    worker2.join()

if __name__ == '__main__':
    main()

We create a Worker class which inherits from the Process.
In the run method, we write the worker's code.

## Python multiprocessing Pool

The management of the worker processes can be simplified with the Pool
object. It controls a pool of worker processes to which jobs can be submitted.
The pool's map method chops the given iterable into a number of
chunks which it submits to the process pool as separate tasks. The pool's
map is a parallel equivalent of the built-in map method.
The map blocks the main execution until all computations finish.

The Pool can take the number of processes as a parameter.
It is a value with which we can experiment. If we do not provide any value,
then the number returned by os.cpu_count is used.

worker_pool.py
  

#!/usr/bin/python

import time
from timeit import default_timer as timer
from multiprocessing import Pool, cpu_count

def square(n):

    time.sleep(2)

    return n * n

def main():

    start = timer()

    print(f'starting computations on {cpu_count()} cores')

    values = (2, 4, 6, 8)

    with Pool() as pool:
        res = pool.map(square, values)
        print(res)

    end = timer()
    print(f'elapsed time: {end - start}')

if __name__ == '__main__':
    main()

In the example, we create a pool of processes and apply values on the
square function. The number of cores is determined with the
cpu_unit function.

$ ./worker_pool.py
starting computations on 4 cores
[4, 16, 36, 64]
elapsed time: 2.0256662130013865

On a computer with four cores it took slightly more than 2 seconds to finish
four computations, each lasting two seconds.

$ ./worker_pool.py
starting computations on 4 cores
[4, 16, 36, 64, 100]
elapsed time: 4.029600699999719

When we add additional value to be computed, the time increased to over four
seconds.

## Multiple arguments

To pass multiple arguments to a worker function, we can use the starmap
method. The elements of the iterable are expected to be iterables that are
unpacked as arguments.

multi_args.py.py
  

#!/usr/bin/python

import time
from timeit import default_timer as timer
from multiprocessing import Pool, cpu_count

def power(x, n):

    time.sleep(1)

    return x ** n

def main():

    start = timer()

    print(f'starting computations on {cpu_count()} cores')

    values = ((2, 2), (4, 3), (5, 5))

    with Pool() as pool:
        res = pool.starmap(power, values)
        print(res)

    end = timer()
    print(f'elapsed time: {end - start}')

if __name__ == '__main__':
    main()

In this example, we pass two values to the power function: the
value and the exponent.

$ ./multi_args.py
starting computations on 4 cores
[4, 64, 3125]
elapsed time: 1.0230950259974634

## Multiple functions

The following example shows how to run multiple functions
in a pool.

multiple_functions.py
  

#!/usr/bin/python

from multiprocessing import Pool
import functools

def inc(x):
    return x + 1

def dec(x):
    return x - 1

def add(x, y):
    return x + y

def smap(f):
    return f()

def main():

    f_inc = functools.partial(inc, 4)
    f_dec = functools.partial(dec, 2)
    f_add = functools.partial(add, 3, 4)

    with Pool() as pool:
        res = pool.map(smap, [f_inc, f_dec, f_add])

        print(res)

if __name__ == '__main__':
    main()

We have three functions, which are run independently in a pool. We use the
functools.partial to prepare the functions and their parameters
before they are executed.

$ ./multiple_functions.py
[5, 1, 7]

## Python multiprocessing π calculation

The π is the ratio of the circumference of any circle to the diameter of the
circle. The π is an irrational number whose decimal form neither ends
nor becomes repetitive. It is approximately equal to 3.14159. There are several
formulas to calculate π.

Calculating approximations of π can take a long time, so we can leverage the
parallel computations. We use the Bailey–Borwein–Plouffe formula to calculate π.

calc_pi.py
  

#!/usr/bin/python

from decimal import Decimal, getcontext
from timeit import default_timer as timer

def pi(precision):

    getcontext().prec = precision

    return sum(1/Decimal(16)**k *
        (Decimal(4)/(8*k+1) -
         Decimal(2)/(8*k+4) -
         Decimal(1)/(8*k+5) -
         Decimal(1)/(8*k+6)) for k in range (precision))

start = timer()
values = (1000, 1500, 2000)
data = list(map(pi, values))
print(data)

end = timer()
print(f'sequentially: {end - start}')

First, we calculate three approximations sequentially. The precision is the number
of digits of the computed π.

$ ./calc_pi.py
...
sequentially: 0.5738053179993585

On our machine, it took 0.57381 seconds to compute the three approximations.

In the following example, we use a pool of processes to calculate the three
approximations.

calc_pi2.py
  

#!/usr/bin/python

from decimal import Decimal, getcontext
from timeit import default_timer as timer
from multiprocessing import Pool, current_process
import time

def pi(precision):

    getcontext().prec=precision

    return sum(1/Decimal(16)**k *
        (Decimal(4)/(8*k+1) -
         Decimal(2)/(8*k+4) -
         Decimal(1)/(8*k+5) -
         Decimal(1)/(8*k+6)) for k in range (precision))

def main():

    start = timer()

    with Pool(3) as pool:

        values = (1000, 1500, 2000)
        data = pool.map(pi, values)
        print(data)

    end = timer()
    print(f'paralelly: {end - start}')

if __name__ == '__main__':
    main()

We run the calculations in a pool of three processes and we gain some small
increase in efficiency.

./calc_pi2.py
...
paralelly: 0.38216479000038817

When we run the calculations in parallel, it took 0.38216479 seconds.

## Separate memory in a process

In multiprocessing, each worker has its own memory. The memory is not shared
like in threading.

own_memory_space.py
  

#!/usr/bin/python

from multiprocessing import Process, current_process

data = [1, 2]

def fun():

    global data

    data.extend((3, 4, 5))
    print(f'Result in {current_process().name}: {data}')

def main():

    worker = Process(target=fun)
    worker.start()
    worker.join()

    print(f'Result in main: {data}')

if __name__ == '__main__':

    main()

We create a worker to which we pass the global data list.
We add additional values to the list in the worker but the original list in the
main process is not modified.

$ ./own_memory_space.py
Result in Process-1: [1, 2, 3, 4, 5]
Result in main: [1, 2]

As we can see from the output, the two lists are separate.

## Sharing state between processes

Data can be stored in a shared memory using Value or
Array.

**Note:** It is best to avoid sharing data between processes.
Message passing is preferred.

counter.py
  

#!/usr/bin/python

from multiprocessing import Process, Value
from time import sleep

def f(counter):

    sleep(1)

    with counter.get_lock():
        counter.value += 1

    print(f'Counter: {counter.value}')

def main():

    counter = Value('i', 0)

    processes = [Process(target=f, args=(counter, )) for _ in range(30)]

    for p in processes:
        p.start()

    for p in processes:
        p.join()

if __name__ == '__main__':
    main()

The example creates a counter object which is shared among processes.
Each of the processes increases the counter.

with counter.get_lock():
    counter.value += 1

Each process must acquire a lock for itself.

## Message passing with queues

The message passing is the preferred way of communication among processes.
Message passing avoids having to use synchronization primitives such as
locks, which are difficult to use and error prone in complex situations.

To pass messages, we can utilize the pipe for the connection between two
processes. The queue allows multiple producers and consumers.

simple_queue.py
  

#!/usr/bin/python

from multiprocessing import Process, Queue
import random

def rand_val(queue):

    num = random.random()
    queue.put(num)

def main():

    queue = Queue()

    processes = [Process(target=rand_val, args=(queue,)) for _ in range(4)]

    for p in processes:
        p.start()

    for p in processes:
        p.join()

    results = [queue.get() for _ in processes]
    print(results)

if __name__ == "__main__":
    main()

In the example, we create four processes. Each process generates a random value
and puts it into the queue. After all processes finish, we get all values from
the queue.

processes = [Process(target=rand_val, args=(queue,)) for _ in range(4)]

The queue is passed as an argument to the process.

results = [queue.get() for _ in processes]

The get method removes and returns the item from the queue.

$ ./simple_queue.py
[0.7829025790441544, 0.46465345633928223, 0.4804438310782676, 0.7146952404346074]

The example generates a list of four random values.

In the following example, we put words in a queue. The created processes
read the words from the queue.

simple_queue2.py
  

#!/usr/bin/python

from multiprocessing import Queue, Process, current_process

def worker(queue):
    name = current_process().name
    print(f'{name} data received: {queue.get()}')

def main():

    queue = Queue()
    queue.put("wood")
    queue.put("sky")
    queue.put("cloud")
    queue.put("ocean")

    processes = [Process(target=worker, args=(queue,)) for _ in range(4)]

    for p in processes:
        p.start()

    for p in processes:
        p.join()

if __name__ == "__main__":
    main()

Four processes are created; each of them reads a word from the queue and prints
it.

$ ./simple_queue2.py
Process-1 data received: wood
Process-2 data received: sky
Process-3 data received: cloud
Process-4 data received: ocean

**Note: ** Read the [Long-running task in Tkinter](/articles/tkinterlongruntask/)
to learn how to use a queue in a Tkinter GUI application.

## Queue order

In multiprocessing, there is no guarantee that the processes finish in a certain
order.

queue_order.py
  

#!/usr/bin/python

from multiprocessing import Process, Queue
import time
import random

def square(idx, x, queue):

    time.sleep(random.randint(1, 3))
    queue.put((idx, x * x))

def main():

    data = [2, 4, 6, 3, 5, 8, 9, 7]
    queue = Queue()
    processes = [Process(target=square, args=(idx, val, queue))
                 for idx, val in enumerate(data)]

    for p in processes:
        p.start()

    for p in processes:
        p.join()

    unsorted_result = [queue.get() for _ in processes]

    result = [val[1] for val in sorted(unsorted_result)]
    print(result)

if __name__ == '__main__':
    main()

We have processes that calculate the square of a value. The input data is
in certain order and we need to maintain this order. To deal with this,
we keep an extra index for each input value.

def square(idx, x, queue):

    time.sleep(random.randint(1, 3))
    queue.put((idx, x * x))

To illustrate variation, we randomly slow down the calculation with the sleep
method. We place an index into the queue with the calculated square.

unsorted_result = [queue.get() for _ in processes]

We get the results. At this moment, the tuples are in random order.

result = [val[1] for val in sorted(unsorted_result)]

We sort the result data by their index values.

$ ./queue_order.py
[4, 16, 36, 9, 25, 64, 81, 49]

We get the square values that correspond to the initial data.

## Calculating π with Monte Carlo method

Monte Carlo methods  are a broad class of computational algorithms that rely on
repeated random sampling to obtain numerical results. The underlying concept is
to use randomness to solve problems that might be deterministic in principle.

The following formula is used to calculate the approximation of π:

  
    π
    4
  
  ≈
  
    M
    N
  

The *M* is the number of generated points in the square and *N*
is the total number of points.

While this method of π calculation is interesting and perfect for school
examples, it is not very accurate. There are far better algorithms to get π.

monte_carlo_pi.py
  

#!/usr/bin/python

from random import random
from math import sqrt
from timeit import default_timer as timer

def pi(n):

    count = 0

    for i in range(n):

        x, y = random(), random()

        r = sqrt(pow(x, 2) + pow(y, 2))

        if r &lt; 1:
            count += 1

    return 4 * count / n

start = timer()
pi_est = pi(100_000_000)
end = timer()

print(f'elapsed time: {end - start}')
print(f'π estimate: {pi_est}')

In the example, we calculate the approximation of the π value using
one hundred million generated random points.

$ ./monte_carlo_pi.py
elapsed time: 44.7768127549989
π estimate: 3.14136588

It took 44.78 seconds to calculate the approximation of π

Now we divide the whole task of π computation into subtasks.

monte_carlo_pi_mul.py
  

#!/usr/bin/python

import random
from multiprocessing import Pool, cpu_count
from math import sqrt
from timeit import default_timer as timer

def pi_part(n):
    print(n)

    count = 0

    for i in range(int(n)):

        x, y = random.random(), random.random()

        r = sqrt(pow(x, 2) + pow(y, 2))

        if r &lt; 1:
            count += 1

    return count

def main():

    start = timer()

    np = cpu_count()
    print(f'You have {np} cores')

    n = 100_000_000

    part_count = [n/np for i in range(np)]

    with Pool(processes=np) as pool:

        count = pool.map(pi_part, part_count)
        pi_est = sum(count) / (n * 1.0) * 4

        end = timer()

        print(f'elapsed time: {end - start}')
        print(f'π estimate: {pi_est}')

if __name__=='__main__':
    main()

In the example, we find out the number of cores and divide the random sampling
into subtasks. Each task will compute the random values independently.

n = 100_000_000

part_count = [n/np for i in range(np)]

Instead of calculating 100_000_000 in one go, each subtask will calculate a
portion of it.

count = pool.map(pi_part, part_count)
pi_est = sum(count) / (n * 1.0) * 4

The partial calculations are passed to the count variable and
the sum is then used in the final formula.

$ ./monte_carlo_pi_mul.py
You have 4 cores
25000000.0
25000000.0
25000000.0
25000000.0
elapsed time: 29.45832426099878
π estimate: 3.1414868

When running the example in parallel with four cores, the calculations took
29.46 seconds.

## Source

[Python multiprocessing — Process-based parallelism](https://docs.python.org/3/library/multiprocessing.html)

In this article we have worked with the multiprocessing
module.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).