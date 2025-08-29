+++
title = "Python os.fork Function"
date = 2025-08-29T20:09:10.615+01:00
draft = false
description = "Complete guide to Python's os.fork function covering process creation, child processes, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.fork Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.fork function,
which creates child processes in Unix-like systems. We'll cover process
creation, parent-child relationships, and practical multiprocessing examples.

## Basic Definitions

The os.fork function creates a new process by duplicating the
calling process. The new process is called the child, the original is parent.

It returns 0 in the child process and the child's PID in the parent process.
On error, it raises OSError. This is a Unix-specific system call.

## Basic Fork Example

This simple example demonstrates the basic usage of os.fork.
It shows how the same code runs in both parent and child processes.

basic_fork.py
  

import os

print("Before fork")

pid = os.fork()

if pid == 0:
    print(f"Child process with PID: {os.getpid()}")
else:
    print(f"Parent process with PID: {os.getpid()}, child PID: {pid}")

print("Both processes continue from here")

After fork, both processes continue execution from the same point. The if
statement separates their behavior based on the return value.

The child gets PID 0, while the parent gets the child's actual PID. Both
print statements will execute, but in different processes.

## Fork with Different Tasks

This example shows how parent and child processes can perform different tasks.
The child runs a calculation while the parent waits for it to finish.

fork_tasks.py
  

import os
import time

def child_task():
    print(f"Child process {os.getpid()} starting")
    total = 0
    for i in range(1000000):
        total += i
    print(f"Child calculated sum: {total}")
    time.sleep(2)
    print("Child exiting")

def parent_task(child_pid):
    print(f"Parent process {os.getpid()} waiting for child")
    _, status = os.waitpid(child_pid, 0)
    print(f"Child exited with status: {status}")

pid = os.fork()

if pid == 0:
    child_task()
    os._exit(0)  # Explicit exit
else:
    parent_task(pid)
    print("Parent continuing")

The child performs a CPU-intensive calculation while the parent waits using
os.waitpid. The child explicitly exits with os._exit.

Note the use of os._exit in the child to avoid running any cleanup
handlers that might be registered in the parent process.

## Fork with Shared File Descriptors

This example demonstrates how file descriptors are shared between parent and
child processes after a fork. Both can read and write the same file.

fork_file.py
  

import os

file_path = "shared.txt"

# Create and write to file before fork
with open(file_path, "w") as f:
    f.write("Initial content\n")

# Open file in append mode
f = open(file_path, "a+")

pid = os.fork()

if pid == 0:
    # Child process
    f.write(f"Child writing at position {f.tell()}\n")
    f.flush()
    f.seek(0)
    print("Child read:", f.read())
    f.close()
else:
    # Parent process
    f.write(f"Parent writing at position {f.tell()}\n")
    f.flush()
    os.waitpid(pid, 0)  # Wait for child
    f.seek(0)
    print("Parent read:", f.read())
    f.close()

Both processes share the same file descriptor and can interleave writes. The
output shows how their operations affect the same file position.

Note the use of flush to ensure writes appear in the correct
order, and proper waiting to avoid race conditions.

## Fork with Global Variables

This example shows how global variables behave after a fork. Each process gets
its own copy of the variables, and changes aren't shared.

fork_globals.py
  

import os

counter = 0

pid = os.fork()

if pid == 0:
    # Child process
    counter += 1
    print(f"Child counter: {counter}")
else:
    # Parent process
    counter += 2
    print(f"Parent counter: {counter}")
    os.waitpid(pid, 0)

print(f"Final counter: {counter}")

The child increments the counter by 1, the parent by 2. Each process has its
own memory space, so changes don't affect the other process.

The "Final counter" output will be different in each process, demonstrating
that they have independent copies of the variable.

## Fork Bomb Example

This dangerous example demonstrates how uncontrolled forking can create a fork
bomb. Warning: Running this may crash your system!

fork_bomb.py
  

import os
import time

def fork_bomb():
    while True:
        try:
            pid = os.fork()
            if pid == 0:  # Child
                time.sleep(0.1)
            else:         # Parent
                print(f"Created child {pid}")
        except OSError as e:
            print(f"Fork failed: {e}")
            break

if __name__ == "__main__":
    print("WARNING: This is a fork bomb!")
    print("It will create processes until system resources are exhausted.")
    print("Run at your own risk!")
    # Uncomment to actually run
    # fork_bomb()

This code creates child processes in an infinite loop, eventually exhausting
system resources. It's included for educational purposes only.

The commented-out call prevents accidental execution. Never run actual fork
bombs on production systems.

## Fork with Signal Handling

This example shows how to handle signals in forked processes. The parent sends
a signal to the child, which handles it with a custom handler.

fork_signals.py
  

import os
import signal
import time

def child_handler(signum, frame):
    print(f"Child {os.getpid()} received signal {signum}")

pid = os.fork()

if pid == 0:
    # Child process
    signal.signal(signal.SIGUSR1, child_handler)
    print(f"Child {os.getpid()} waiting for signal")
    time.sleep(10)  # Wait for signal
    print("Child exiting")
    os._exit(0)
else:
    # Parent process
    time.sleep(1)  # Give child time to set up handler
    print(f"Parent sending SIGUSR1 to child {pid}")
    os.kill(pid, signal.SIGUSR1)
    os.waitpid(pid, 0)
    print("Parent exiting")

The child sets up a signal handler for SIGUSR1, then waits. The parent sends
the signal after a delay. The handler prints a message when triggered.

Signal handling in child processes requires careful synchronization to ensure
the handler is registered before the signal is sent.

## Fork with Process Groups

This advanced example demonstrates creating a new process group with the child
process, useful for managing groups of related processes.

fork_process_group.py
  

import os
import time

pid = os.fork()

if pid == 0:
    # Child becomes process group leader
    os.setpgid(0, 0)
    print(f"Child PID: {os.getpid()}, PGID: {os.getpgid(0)}")
    time.sleep(5)
    print("Child exiting")
    os._exit(0)
else:
    # Parent
    print(f"Parent PID: {os.getpid()}, PGID: {os.getpgid(0)}")
    print(f"Child PID: {pid}, Child PGID: {os.getpgid(pid)}")
    os.waitpid(pid, 0)
    print("Parent exiting")

The child calls os.setpgid to create a new process group. This
is useful when you want the child to be independent of the parent's group.

Process groups are particularly important for terminal control and signal
delivery to groups of processes.

## Security Considerations

- **Resource limits:** Forking too many processes can exhaust system resources

- **Memory usage:** Copy-on-write doesn't prevent eventual memory duplication

- **Cleanup:** Zombie processes must be properly reaped with wait

- **Platform limits:** Windows doesn't support os.fork

- **Thread safety:** Forking in multithreaded programs can be dangerous

## Best Practices

- **Always wait:** Use os.wait or os.waitpid to clean up child processes

- **Handle errors:** Check for OSError when forking

- **Use _exit:** In children, use os._exit instead of sys.exit

- **Limit forking:** Consider multiprocessing module for complex cases

- **Signal safety:** Be careful with signals in forked processes

## Source References

- [Python os.fork Documentation](https://docs.python.org/3/library/os.html#os.fork)

- [Linux fork(2) man page](https://man7.org/linux/man-pages/man2/fork.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).