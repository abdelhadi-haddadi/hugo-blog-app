+++
title = "Python os.killpg Function"
date = 2025-08-29T20:09:21.919+01:00
draft = false
description = "Complete guide to Python's os.killpg function covering process group signaling, signal handling, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.killpg Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.killpg function,
which sends signals to process groups. We'll cover signal types, process
groups, and practical examples of process management.

## Basic Definitions

The os.killpg function sends a signal to a process group. It
requires the process group ID (pgid) and a signal number as parameters.

Key parameters: pgid (process group ID), sig (signal number). On success,
returns None. Raises OSError on failure (invalid pgid or permissions).

## Sending SIGTERM to a Process Group

This basic example demonstrates sending SIGTERM to terminate all processes
in a group. SIGTERM allows graceful shutdown unlike SIGKILL.

basic_killpg.py
  

import os
import signal
import time
from multiprocessing import Process

def worker():
    print(f"Worker PID: {os.getpid()} running")
    time.sleep(60)

if __name__ == "__main__":
    # Create a new process group
    os.setpgrp()
    
    # Start child processes
    children = [Process(target=worker) for _ in range(3)]
    for p in children:
        p.start()
    
    print(f"Process group ID: {os.getpgid(0)}")
    input("Press Enter to terminate process group...")
    
    # Send SIGTERM to entire process group
    os.killpg(os.getpgid(0), signal.SIGTERM)
    print("Sent SIGTERM to process group")

This creates a process group with worker processes. When triggered, it sends
SIGTERM to all processes in the group. Each process can handle the signal.

Note we use os.getpgid(0) to get our own process group ID (0 means current).

## Graceful Shutdown with SIGTERM

This example shows proper signal handling for graceful shutdown. Processes
can clean up resources before exiting when receiving SIGTERM.

graceful_shutdown.py
  

import os
import signal
import sys
import time
from multiprocessing import Process

def cleanup():
    print(f"{os.getpid()}: Performing cleanup...")
    time.sleep(1)  # Simulate cleanup
    print(f"{os.getpid()}: Cleanup complete")

def signal_handler(signum, frame):
    print(f"{os.getpid()}: Received signal {signum}")
    cleanup()
    sys.exit(0)

def worker():
    signal.signal(signal.SIGTERM, signal_handler)
    print(f"Worker {os.getpid()} running")
    while True:
        time.sleep(1)

if __name__ == "__main__":
    os.setpgrp()
    children = [Process(target=worker) for _ in range(3)]
    for p in children:
        p.start()
    
    print(f"Main PID: {os.getpid()}, PGID: {os.getpgid(0)}")
    input("Press Enter to terminate...")
    
    os.killpg(os.getpgid(0), signal.SIGTERM)
    for p in children:
        p.join()
    print("All processes terminated gracefully")

Each worker registers a SIGTERM handler for cleanup. When killpg sends SIGTERM,
all processes perform cleanup before exiting. The main process waits for them.

This pattern is common in servers and long-running processes needing cleanup.

## Forced Termination with SIGKILL

SIGKILL cannot be caught or ignored. This example shows using it to forcefully
terminate unresponsive processes in a group.

force_kill.py
  

import os
import signal
import time
from multiprocessing import Process

def unresponsive_worker():
    print(f"Unresponsive worker {os.getpid()} running")
    while True:
        time.sleep(1)
        # Simulate ignoring SIGTERM
        pass

if __name__ == "__main__":
    os.setpgrp()
    children = [Process(target=unresponsive_worker) for _ in range(3)]
    for p in children:
        p.start()
    
    print(f"PGID: {os.getpgid(0)}")
    input("First try SIGTERM (press Enter)...")
    
    # Try graceful termination first
    os.killpg(os.getpgid(0), signal.SIGTERM)
    time.sleep(2)  # Give processes time to exit
    
    # Check if any children still alive
    alive = any(p.is_alive() for p in children)
    if alive:
        print("Processes not responding to SIGTERM")
        input("Press Enter to force kill with SIGKILL...")
        os.killpg(os.getpgid(0), signal.SIGKILL)
    
    for p in children:
        p.join(timeout=0.1)
    print("All processes terminated")

This first attempts graceful shutdown with SIGTERM. If processes don't exit,
it follows up with SIGKILL. SIGKILL immediately terminates processes.

Use SIGKILL sparingly as it doesn't allow cleanup and may leave resources locked.

## Different Process Groups

This demonstrates killing a specific process group rather than the current one.
We create two separate groups and terminate one selectively.

specific_group.py
  

import os
import signal
import time
from multiprocessing import Process

def group_member(name):
    print(f"{name} PID: {os.getpid()}, PGID: {os.getpgid(0)}")
    while True:
        time.sleep(1)

if __name__ == "__main__":
    # Create first process group
    p1 = Process(target=group_member, args=("Group1",))
    p1.start()
    time.sleep(0.1)  # Ensure process starts
    
    # Create second process group
    p2 = Process(target=group_member, args=("Group2",))
    p2.start()
    time.sleep(0.1)
    
    # Get their PGIDs
    pgid1 = os.getpgid(p1.pid)
    pgid2 = os.getpgid(p2.pid)
    
    print(f"Group1 PGID: {pgid1}, Group2 PGID: {pgid2}")
    input("Press Enter to kill Group1...")
    
    os.killpg(pgid1, signal.SIGTERM)
    p1.join()
    print("Group1 terminated, Group2 still running")
    input("Press Enter to exit...")
    os.killpg(pgid2, signal.SIGTERM)
    p2.join()

We create two independent process groups and terminate one while keeping the
other running. Each Process creates its own group by default on Unix.

This shows how to target specific groups rather than just the current one.

## Error Handling

This example demonstrates proper error handling when using os.killpg, including
permission checks and invalid process group scenarios.

error_handling.py
  

import os
import signal
import errno

def safe_killpg(pgid, sig):
    try:
        os.killpg(pgid, sig)
        print(f"Successfully sent signal {sig} to group {pgid}")
    except ProcessLookupError:
        print(f"Process group {pgid} does not exist")
    except PermissionError:
        print(f"Permission denied to signal group {pgid}")
    except OSError as e:
        if e.errno == errno.ESRCH:
            print(f"No such process group {pgid}")
        else:
            print(f"Error signaling group {pgid}: {e}")

if __name__ == "__main__":
    # Test with various scenarios
    safe_killpg(0, signal.SIGTERM)  # Current process group
    safe_killpg(999999, signal.SIGTERM)  # Non-existent group
    safe_killpg(1, signal.SIGTERM)  # Init process (usually permission denied)

The safe_killpg function handles common error cases gracefully. It checks for
non-existent groups, permission issues, and other potential errors.

Proper error handling is crucial when managing processes as conditions may
change between checking and signaling.

## Signal Propagation

This example shows how signals propagate to child processes in a group and
demonstrates different signal behaviors.

signal_propagation.py
  

import os
import signal
import time
from multiprocessing import Process

def child(signal_name):
    print(f"Child {os.getpid()} waiting for {signal_name}")
    while True:
        time.sleep(1)

if __name__ == "__main__":
    os.setpgrp()
    signals = [
        (signal.SIGTERM, "SIGTERM"),
        (signal.SIGINT, "SIGINT"),
        (signal.SIGHUP, "SIGHUP")
    ]
    
    # Create a child for each signal type
    children = [Process(target=child, args=(name,)) for _, name in signals]
    for p in children:
        p.start()
    
    print(f"Main PID: {os.getpid()}, PGID: {os.getpgid(0)}")
    for sig, name in signals:
        input(f"Press Enter to send {name}...")
        os.killpg(os.getpgid(0), sig)
        time.sleep(0.5)  # Allow time for signal handling
    
    for p in children:
        p.join(timeout=1)
    print("Done")

This creates multiple child processes and sends different signals to the group.
Each child would typically handle these signals differently in a real scenario.

Signals like SIGTERM terminate by default, while others like SIGHUP may have
different default actions or be caught by handlers.

## Process Group Creation

This advanced example demonstrates creating and managing custom process groups,
then signaling specific groups.

custom_groups.py
  

import os
import signal
import time
from multiprocessing import Process

def group_worker(name, pgid):
    # Create new session and process group
    os.setsid()
    print(f"{name} PID: {os.getpid()}, PGID: {os.getpgid(0)}")
    while True:
        time.sleep(1)

if __name__ == "__main__":
    # Create two separate process groups
    group1 = Process(target=group_worker, args=("Group1",))
    group1.start()
    time.sleep(0.1)
    
    group2 = Process(target=group_worker, args=("Group2",))
    group2.start()
    time.sleep(0.1)
    
    # Get their PGIDs
    pgid1 = os.getpgid(group1.pid)
    pgid2 = os.getpgid(group2.pid)
    
    print(f"Main PGID: {os.getpgid(0)}")
    print(f"Group1 PGID: {pgid1}, Group2 PGID: {pgid2}")
    
    input("Press Enter to terminate Group1...")
    os.killpg(pgid1, signal.SIGTERM)
    group1.join()
    
    input("Press Enter to terminate Group2...")
    os.killpg(pgid2, signal.SIGTERM)
    group2.join()
    
    print("All groups terminated")

Each worker creates its own session and process group using os.setsid(). This
allows completely independent process groups that can be signaled separately.

This pattern is useful for managing sets of related processes independently
from other groups in the system.

## Security Considerations

- **Permissions:** Need appropriate privileges to signal process groups

- **Orphaned processes:** Be careful not to kill unintended groups

- **Signal safety:** Async-signal-safe functions only in handlers

- **Race conditions:** Process groups may change between check and signal

- **Cross-platform:** Behavior differs between Unix and Windows

## Best Practices

- **Graceful first:** Try SIGTERM before SIGKILL for cleanup

- **Error handling:** Always handle potential errors from killpg

- **Minimal privileges:** Run with least privileges needed

- **Document signals:** Clearly document signal handling in code

- **Test thoroughly:** Signal timing can be tricky to test

## Source References

- [Python os.killpg Documentation](https://docs.python.org/3/library/os.html#os.killpg)

- [Linux killpg(2) man page](https://man7.org/linux/man-pages/man2/killpg.2.html)

- [Linux signal(7) man page](https://man7.org/linux/man-pages/man7/signal.7.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).