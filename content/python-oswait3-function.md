+++
title = "Python os.wait3 Function"
date = 2025-08-29T20:09:45.898+01:00
draft = false
description = "Complete guide to Python's os.wait3 function covering child process management, resource usage, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.wait3 Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.wait3 function,
which waits for child process completion and returns resource usage data.
We'll cover process management, status interpretation, and practical examples.

## Basic Definitions

The os.wait3 function waits for any child process to complete
and returns its process ID, exit status, and resource usage information.

Key parameters: options (WNOHANG, WUNTRACED). Returns a tuple of (pid,
status, resource_usage). Available on Unix-like systems only.

## Basic Process Waiting

The simplest use of os.wait3 waits for any child process to
terminate. This example creates a child process and waits for its completion.

basic_wait.py
  

import os
import sys

pid = os.fork()

if pid == 0:  # Child process
    print("Child process running")
    sys.exit(42)
else:  # Parent process
    print(f"Parent waiting for child {pid}")
    pid, status, rusage = os.wait3(0)
    print(f"Child {pid} exited with status {status}")
    print(f"Exit code: {os.WEXITSTATUS(status)}")
    print(f"Resource usage: {rusage}")

This example forks a child process that exits with code 42. The parent waits
for the child and prints its exit status and resource usage information.

The os.WEXITSTATUS macro extracts the exit code from the status
value returned by wait3. Resource usage includes CPU time and memory stats.

## Non-blocking Wait with WNOHANG

The WNOHANG option makes os.wait3 non-blocking. It returns
immediately if no child process has terminated. This allows polling.

non_blocking.py
  

import os
import time

pid = os.fork()

if pid == 0:  # Child
    print("Child sleeping for 2 seconds")
    time.sleep(2)
    os._exit(0)
else:  # Parent
    print("Parent polling for child completion")
    while True:
        result = os.wait3(os.WNOHANG)
        if result[0] != 0:  # Child exited
            print(f"Child {result[0]} exited")
            break
        print("Child still running...")
        time.sleep(0.5)

The parent process polls for child completion every 0.5 seconds using WNOHANG.
This prevents blocking while waiting for the child to finish sleeping.

When no child has exited, wait3 returns (0, 0, 0). The actual child PID is
only returned when the child terminates.

## Handling Multiple Child Processes

os.wait3 can manage multiple child processes. This example creates
several children and waits for them in sequence as they terminate.

multiple_children.py
  

import os
import time
import random

children = []
for i in range(3):
    pid = os.fork()
    if pid == 0:  # Child
        sleep_time = random.randint(1, 3)
        print(f"Child {i} sleeping for {sleep_time}s")
        time.sleep(sleep_time)
        os._exit(i)
    else:  # Parent
        children.append(pid)

print(f"Parent waiting for children {children}")
while children:
    pid, status, _ = os.wait3(0)
    exit_code = os.WEXITSTATUS(status)
    print(f"Child {pid} exited with code {exit_code}")
    children.remove(pid)

Three child processes are created with random sleep durations. The parent waits
for each child in the order they complete, not the order they were created.

The children list tracks active child PIDs. As each child exits, it's removed
from the list until all children have been reaped.

## Capturing Resource Usage

The resource usage tuple from os.wait3 provides detailed
information about CPU time, memory usage, and other system resources.

resource_usage.py
  

import os
import time

def child_work():
    # Simulate CPU and memory usage
    start = time.time()
    data = []
    while time.time() - start &lt; 1:  # Run for 1 second
        data.append("x" * 1000)  # Allocate memory
    return len(data)

pid = os.fork()

if pid == 0:  # Child
    count = child_work()
    os._exit(count)
else:  # Parent
    pid, status, rusage = os.wait3(0)
    print(f"Child user time: {rusage.ru_utime:.3f}s")
    print(f"Child system time: {rusage.ru_stime:.3f}s")
    print(f"Max RSS: {rusage.ru_maxrss} KB")
    print(f"Page faults: {rusage.ru_majflt}")
    print(f"Blocks in: {rusage.ru_inblock}")
    print(f"Blocks out: {rusage.ru_oublock}")

The child process performs CPU-intensive work and memory allocation. The parent
captures detailed resource usage statistics after the child exits.

Key metrics include user CPU time, system CPU time, maximum resident set size,
page faults, and block I/O operations.

## Handling Stopped Processes

Using WUNTRACED option, os.wait3 can detect when child processes
are stopped (e.g., by SIGSTOP) rather than terminated.

stopped_process.py
  

import os
import signal
import time

pid = os.fork()

if pid == 0:  # Child
    print("Child running, will be stopped")
    time.sleep(10)  # Give time to send signal
    os._exit(0)
else:  # Parent
    print(f"Parent waiting for child {pid}")
    time.sleep(1)  # Wait a moment before stopping
    os.kill(pid, signal.SIGSTOP)
    
    pid, status, _ = os.wait3(os.WUNTRACED)
    if os.WIFSTOPPED(status):
        print(f"Child {pid} stopped by signal {os.WSTOPSIG(status)}")
    
    # Continue the child
    os.kill(pid, signal.SIGCONT)
    pid, status, _ = os.wait3(0)
    print(f"Child {pid} exited with status {status}")

The parent sends SIGSTOP to the child, then detects the stopped state using
WUNTRACED. It then continues the child with SIGCONT and waits for termination.

os.WIFSTOPPED checks if the child was stopped, and
os.WSTOPSIG gets the stopping signal number.

## Error Handling

os.wait3 can raise OSError in certain conditions. This example
demonstrates proper error handling when waiting for child processes.

error_handling.py
  

import os
import errno

try:
    # Try to wait when no children exist
    pid, status, rusage = os.wait3(os.WNOHANG)
    print("This won't be reached")
except OSError as e:
    if e.errno == errno.ECHILD:
        print("No child processes to wait for")
    else:
        print(f"Unexpected error: {e}")

# Create and immediately wait for child
pid = os.fork()
if pid == 0:
    os._exit(0)
else:
    try:
        pid, status, rusage = os.wait3(0)
        print(f"Child {pid} exited normally")
    except OSError as e:
        print(f"Error waiting for child: {e}")

The first attempt to wait fails with ECHILD (no child processes). The second
part shows successful waiting after creating a child process.

Proper error handling is essential as system conditions may change between
process creation and waiting operations.

## Advanced Process Groups

os.wait3 can monitor processes in specific process groups.
This example demonstrates managing a process group of children.

process_groups.py
  

import os
import time

# Create new process group
os.setpgrp()

children = []
for i in range(3):
    pid = os.fork()
    if pid == 0:  # Child
        # Children in same process group
        print(f"Child {i} in group {os.getpgrp()}")
        time.sleep(i + 1)
        os._exit(0)
    else:
        children.append(pid)

print(f"Parent waiting for children in group {os.getpgrp()}")
while children:
    try:
        pid, status, _ = os.wait3(0)
        if pid &gt; 0:
            print(f"Child {pid} exited")
            children.remove(pid)
    except OSError as e:
        if e.errno == errno.ECHILD:
            break
        raise

print("All children exited")

This creates a new process group and several child processes. The parent waits
for all children in its process group to exit, handling errors appropriately.

Process groups allow managing related processes together and are particularly
useful for shell job control implementations.

## Security Considerations

- **Race conditions:** Child state may change between checks

- **Signal handling:** SIGCHLD may interfere with wait3

- **Resource limits:** Too many processes may cause failures

- **Privileges:** Requires permission to wait for child processes

- **Platform limits:** Behavior varies across Unix systems

## Best Practices

- **Always wait:** Prevent zombie process accumulation

- **Handle errors:** Check for ECHILD and other conditions

- **Use WNOHANG:** For non-blocking operation when needed

- **Check status:** Use WIFEXITED/WIFSIGNALED macros

- **Monitor resources:** Analyze rusage for performance data

## Source References

- [Python os.wait3 Documentation](https://docs.python.org/3/library/os.html#os.wait3)

- [Linux wait3(2) man page](https://man7.org/linux/man-pages/man2/wait3.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).