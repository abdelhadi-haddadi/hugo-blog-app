+++
title = "Python os.wait4 Function"
date = 2025-08-29T20:09:47.023+01:00
draft = false
description = "Complete guide to Python's os.wait4 function covering child process management, resource monitoring, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.wait4 Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.wait4 function,
which waits for child process completion and retrieves resource usage.
We'll cover process management, resource monitoring, and practical examples.

## Basic Definitions

The os.wait4 function waits for a child process to complete and
returns its termination status along with resource usage information.

Key parameters: pid (process ID to wait for), options (flags like WNOHANG).
Returns a tuple of (pid, status, resource_usage). Unix systems only.

## Basic Process Waiting

The simplest use of os.wait4 waits for any child process to
complete. This example creates a child process and waits for its termination.

basic_wait.py
  

import os
import time

pid = os.fork()

if pid == 0:  # Child process
    print("Child process running")
    time.sleep(2)
    print("Child process exiting")
    os._exit(0)
else:  # Parent process
    print(f"Parent waiting for child {pid}")
    pid, status, rusage = os.wait4(pid, 0)
    print(f"Child {pid} exited with status {status}")
    print(f"Resource usage: {rusage}")

This creates a child process that sleeps for 2 seconds. The parent waits
for it to complete using os.wait4. The resource usage information includes
CPU time and memory usage.

The status contains the exit code and signal information if the process
was terminated by a signal.

## Non-blocking Wait with WNOHANG

The WNOHANG option makes os.wait4 non-blocking. It returns immediately if
no child process has terminated. This allows polling while doing other work.

non_blocking.py
  

import os
import time

pid = os.fork()

if pid == 0:  # Child
    time.sleep(3)
    os._exit(42)
else:  # Parent
    print("Parent checking child status...")
    while True:
        result = os.wait4(pid, os.WNOHANG)
        if result[0] == 0:
            print("Child still running...")
            time.sleep(1)
        else:
            pid, status, rusage = result
            print(f"Child exited with status {status &gt;&gt; 8}")
            break

The parent periodically checks the child's status without blocking. When
WNOHANG is used and the child hasn't exited, wait4 returns (0, 0, 0).

The exit status is encoded in the status value. Right-shifting by 8 bits
extracts the actual exit code (42 in this case).

## Waiting for Specific Process

You can wait for a specific child process by providing its PID. This is
useful when managing multiple child processes independently.

specific_process.py
  

import os
import time

children = []
for i in range(3):
    pid = os.fork()
    if pid == 0:  # Child
        time.sleep(i + 1)
        os._exit(i)
    else:
        children.append(pid)
        print(f"Started child {pid}")

# Wait for middle child (second in list)
target_pid = children[1]
pid, status, rusage = os.wait4(target_pid, 0)
print(f"Child {pid} exited with status {status &gt;&gt; 8}")

# Wait for remaining children
for pid in children:
    if pid != target_pid:
        os.wait4(pid, 0)

This creates three child processes with different sleep durations. The parent
first waits specifically for the second child (PID in children[1]).

After handling the specific child, it waits for the remaining children to
prevent zombie processes.

## Handling Resource Usage Information

The resource usage information provides detailed statistics about the child's
execution. This example demonstrates interpreting these values.

resource_usage.py
  

import os
import time
import resource

pid = os.fork()

if pid == 0:  # Child
    # Use some CPU and memory
    start = time.time()
    while time.time() - start &lt; 1:  # Burn CPU for 1 second
        pass
    data = "x" * 10_000_000  # Allocate memory
    time.sleep(0.5)
    os._exit(0)
else:  # Parent
    pid, status, rusage = os.wait4(pid, 0)
    print("Resource usage statistics:")
    print(f"User CPU time: {rusage.ru_utime:.3f} seconds")
    print(f"System CPU time: {rusage.ru_stime:.3f} seconds")
    print(f"Max RSS: {rusage.ru_maxrss} KB")
    print(f"Page faults: {rusage.ru_majflt} major, {rusage.ru_minflt} minor")

The child process performs CPU-intensive work and allocates memory. The parent
prints detailed resource usage statistics after the child exits.

Key metrics include CPU time (user and system), maximum resident set size
(memory), and page fault counts.

## Handling Terminated Children

When a child process terminates abnormally (e.g., by signal), os.wait4
provides information about the termination cause in the status value.

signal_handling.py
  

import os
import signal
import time

pid = os.fork()

if pid == 0:  # Child
    print("Child running")
    time.sleep(5)
    print("Child exiting normally")
    os._exit(0)
else:  # Parent
    time.sleep(1)
    os.kill(pid, signal.SIGTERM)
    pid, status, rusage = os.wait4(pid, 0)
    
    if os.WIFEXITED(status):
        print(f"Child exited normally with status {os.WEXITSTATUS(status)}")
    elif os.WIFSIGNALED(status):
        print(f"Child terminated by signal {os.WTERMSIG(status)}")
    elif os.WIFSTOPPED(status):
        print(f"Child stopped by signal {os.WSTOPSIG(status)}")

The parent sends SIGTERM to the child after 1 second. The wait4 call then
returns information about this signal termination.

The WIF... functions help interpret the status value to determine how the
process terminated (normally, by signal, or stopped).

## Waiting for Any Child Process

Using pid=-1 with os.wait4 waits for any child process to terminate. This
is useful when managing multiple children without tracking specific PIDs.

any_child.py
  

import os
import time
import random

# Start several child processes
children = []
for i in range(5):
    pid = os.fork()
    if pid == 0:  # Child
        sleep_time = random.randint(1, 5)
        time.sleep(sleep_time)
        os._exit(sleep_time)
    else:
        children.append(pid)
        print(f"Started child {pid} (will sleep {i+1}s)")

# Wait for any child to finish
while children:
    pid, status, rusage = os.wait4(-1, 0)
    exit_code = os.WEXITSTATUS(status)
    print(f"Child {pid} exited after {exit_code} seconds")
    children.remove(pid)

print("All children exited")

This creates 5 child processes with random sleep durations. The parent waits
for any child to complete using pid=-1, handling them in termination order.

The loop continues until all children have exited (children list is empty).
This pattern is common in server processes managing multiple workers.

## Security Considerations

- **PID reuse:** Be aware of potential PID reuse between wait calls

- **Zombie processes:** Always wait for children to prevent zombies

- **Signal handling:** Signals can interrupt wait calls (use EINTR handling)

- **Privileges:** Requires appropriate permissions to wait for processes

- **Platform limits:** Behavior may vary across Unix-like systems

## Best Practices

- **Error handling:** Check for and handle EINTR errors

- **Resource monitoring:** Use rusage for performance tracking

- **Signal awareness:** Handle WIFSIGNALED cases appropriately

- **Child tracking:** Maintain PID lists for multiple children

- **Timeout patterns:** Combine WNOHANG with timeouts for robustness

## Source References

- [Python os.wait4 Documentation](https://docs.python.org/3/library/os.html#os.wait4)

- [Linux wait4(2) man page](https://man7.org/linux/man-pages/man2/wait4.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).