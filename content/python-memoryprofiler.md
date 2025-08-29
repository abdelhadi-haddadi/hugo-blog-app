+++
title = "Python memory_profiler"
date = 2025-08-29T20:08:54.474+01:00
draft = false
description = "Python memory_profiler tutorial shows how to monitor and profile memory usage in Python programs."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python memory_profiler

last modified February 15, 2025

In this article we show how to use the memory_profiler library in
Python. The memory_profiler library is used to monitor and profile
the memory usage of a Python program. It helps developers track memory usage and
identify memory leaks by providing detailed reports on how memory is allocated
and used throughout the execution of the program.

Key features of memory_profiler include:

  **Line-by-line memory usage**: It shows the memory usage of
  each line of a Python function, helping to pinpoint areas with high memory
  consumption.
  **Simple integration**: By using decorators like
  @profile, you can easily mark functions for memory
  profiling.
  **Real-time monitoring**: It can display memory usage
  information in real-time, providing immediate insights into memory
  behavior.

## The @profile Decorator

The @profile decorator is a tool from the
memory_profiler library used to monitor and measure the memory
usage of a specific function. When you add the @profile decorator
to a function, it tracks the memory usage of the function line by line,
providing detailed insights into how much memory is being used before and after
each line of code within that function.

mem_prof.py
  

from memory_profiler import profile

# Define a function to monitor its memory usage
@profile
def allocate_memory(n, count):
    strings = []
    for i in range(count):
        # Create a large string
        large_string = "a" * (n * n)
        strings.append(large_string)
        print(f"String {i+1} of length {n * n} created")
    return strings

# Call the function with larger value and multiple allocations
if __name__ == "__main__":
    allocate_memory(2000, 30)

In this program, the @profile decorator is used to monitor the
memory usage of the allocate_memory function. The function creates
large strings and appends them to a list, allowing us to observe memory
allocation and deallocation.

@profile
def allocate_memory(n, count):

The @profile decorator is applied to the
allocate_memory function to enable memory profiling.

large_string = "a" * (n * n)

A large string is created in each iteration, causing memory usage to increase.

$ python -m memory_profiler mem_prof.py

Run the example.

## The memory_usage Function

The memory_usage function from the memory_profiler
library is used to get the current memory usage of a process or specific code
block. It returns the memory usage in MiB (Mebibytes) and can be helpful for
monitoring memory consumption in your program.

main.py
  

import pandas as pd
import numpy as np
import time
from memory_profiler import memory_usage

def pandas_example():
    # Create a large dataset
    num_rows = 10**7
    df = pd.DataFrame({
        'col1': np.random.randint(0, 100, size=num_rows),
        'col2': np.random.random(size=num_rows),
        'col3': np.random.choice(['A', 'B', 'C', 'D'], size=num_rows)
    })

    # Measure memory usage and time taken for a pandas operation
    start_time = time.time()
    mem_usage = memory_usage((df['col1'].mean, ()))
    end_time = time.time()

    print(f"Pandas Memory Usage: {max(mem_usage)} MB")
    print(f"Pandas Time Taken: {end_time - start_time} seconds")

if __name__ == '__main__':
    pandas_example()

In this program, the memory_usage function is used to measure the
memory consumption of a pandas operation. The program creates a large DataFrame
and calculates the mean of one of its columns.

mem_usage = memory_usage((df['col1'].mean, ()))

The memory_usage function is used to measure the memory usage of
the df['col1'].mean operation.

print(f"Pandas Memory Usage: {max(mem_usage)} MB")

The maximum memory usage during the operation is printed.

$ python main.py
Pandas Memory Usage: 294.81640625 MB
Pandas Time Taken: 6.853306293487549 seconds

## Source

[Python memory_profiler - documentation](https://pypi.org/project/memory-profiler/)

In this article we have shown how to use the memory_profiler library to monitor and profile memory usage in Python programs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).