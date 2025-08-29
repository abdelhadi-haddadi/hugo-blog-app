+++
title = "Python os.setpgrp Function"
date = 2025-08-29T20:09:36.653+01:00
draft = false
description = "Complete guide to Python's os.setpgrp function covering process group creation, management, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.setpgrp Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.setpgrp function,
which creates or joins process groups. We'll cover Unix process management,
group creation, and practical examples of process control.

## Basic Definitions

The os.setpgrp function creates a new process group or joins an
existing one. It's a Unix-specific system call for process management.

Process groups help manage related processes together, particularly for signal
handling and terminal control. The function takes no parameters and returns
the new process group ID.

## Creating a New Process Group

This basic example demonstrates creating a new process group from a Python
script. The child process becomes the group leader of a new process group.

basic_setpgrp.py
  

import os
import time

print(f"Parent PID: {os.getpid()}, PGID: {os.getpgid(0)}")

pid = os.fork()

if pid == 0:  # Child process
    print(f"Child PID before setpgrp: {os.getpid()}, PGID: {os.getpgid(0)}")
    os.setpgrp()
    print(f"Child PID after setpgrp: {os.getpid()}, PGID: {os.getpgid(0)}")
    time.sleep(10)
else:  # Parent process
    print(f"Parent waiting for child {pid}")
    os.waitpid(pid, 0)

The child process calls os.setpgrp() to create a new process group.
The parent process waits for the child to complete before exiting.

Note that the child's process group ID changes after setpgrp is
called, becoming the leader of its own group.

## Daemon Process Creation

This example shows how os.setpgrp is used when creating daemon
processes. Daemons typically create new process groups to become independent.

daemon_process.py
  

import os
import sys
import time

def daemonize():
    # Fork and exit parent
    pid = os.fork()
    if pid &gt; 0:
        sys.exit(0)
    
    # Create new session and process group
    os.setsid()
    os.setpgrp()
    
    # Fork again to prevent acquiring controlling terminal
    pid = os.fork()
    if pid &gt; 0:
        sys.exit(0)
    
    # Change working directory
    os.chdir('/')
    
    # Redirect standard file descriptors
    sys.stdout.flush()
    sys.stderr.flush()
    si = open(os.devnull, 'r')
    so = open(os.devnull, 'a+')
    se = open(os.devnull, 'a+')
    os.dup2(si.fileno(), sys.stdin.fileno())
    os.dup2(so.fileno(), sys.stdout.fileno())
    os.dup2(se.fileno(), sys.stderr.fileno())

if __name__ == "__main__":
    daemonize()
    print("Daemon running (this won't be seen)")
    while True:
        with open("/tmp/daemon.log", "a") as f:
            f.write("Daemon working...\n")
        time.sleep(5)

This creates a proper daemon process by forking twice, creating a new session,
and setting a new process group. The daemon redirects its output to /dev/null.

The os.setpgrp call ensures the daemon runs in its own process
group, independent of the terminal that launched it.

## Process Group Isolation

This example demonstrates isolating a process group to prevent signals from
affecting child processes. The parent creates a child in a new process group.

process_isolation.py
  

import os
import signal
import time

def child_process():
    print(f"Child PID: {os.getpid()}, PGID: {os.getpgid(0)}")
    time.sleep(30)
    print("Child exiting normally")

pid = os.fork()

if pid == 0:
    os.setpgrp()  # Create new process group
    child_process()
else:
    print(f"Parent PID: {os.getpid()}, Child PID: {pid}")
    print("Sending SIGTERM to entire process group in 5 seconds...")
    time.sleep(5)
    os.killpg(os.getpgid(pid), signal.SIGTERM)
    print("Signal sent")
    os.waitpid(pid, 0)

The child creates its own process group with os.setpgrp(). After
5 seconds, the parent sends SIGTERM to the child's process group.

This demonstrates how process groups allow signaling multiple related processes
at once while isolating them from other groups.

## Job Control Simulation

This example simulates simple job control by creating multiple process groups
and managing them separately. It demonstrates foreground and background jobs.

job_control.py
  

import os
import time

def worker(name):
    print(f"{name} started (PID: {os.getpid()}, PGID: {os.getpgid(0)})")
    for i in range(5):
        print(f"{name} working...")
        time.sleep(1)
    print(f"{name} finished")

# Create background job
bg_pid = os.fork()
if bg_pid == 0:
    os.setpgrp()
    worker("Background job")
    os._exit(0)

# Create foreground job
fg_pid = os.fork()
if fg_pid == 0:
    worker("Foreground job")
    os._exit(0)

print(f"Background job PID: {bg_pid}, PGID: {os.getpgid(bg_pid)}")
print(f"Foreground job PID: {fg_pid}, PGID: {os.getpgid(fg_pid)}")

# Wait for foreground job
os.waitpid(fg_pid, 0)
print("Foreground job completed")

# Check background job status
try:
    os.waitpid(bg_pid, os.WNOHANG)
    print("Background job still running")
except ChildProcessError:
    print("Background job already finished")

The background job creates its own process group with os.setpgrp(),
while the foreground job remains in the parent's group. The parent waits for
the foreground job to complete.

This demonstrates how shells manage foreground and background jobs using
process groups.

## Process Group Inheritance

This example shows how process groups are inherited by default and how
os.setpgrp changes this behavior. It forks multiple processes.

group_inheritance.py
  

import os

def print_ids(label):
    print(f"{label} - PID: {os.getpid()}, PPID: {os.getppid()}, PGID: {os.getpgid(0)}")

print_ids("Original process")

pid1 = os.fork()
if pid1 == 0:
    print_ids("Child 1 (inherited group)")
    pid2 = os.fork()
    if pid2 == 0:
        print_ids("Child 2 (before setpgrp)")
        os.setpgrp()
        print_ids("Child 2 (after setpgrp)")
        os._exit(0)
    os.waitpid(pid2, 0)
    os._exit(0)

os.waitpid(pid1, 0)

pid3 = os.fork()
if pid3 == 0:
    os.setpgrp()
    print_ids("Child 3 (new group)")
    os._exit(0)

os.waitpid(pid3, 0)

The example shows three levels of forking. Child 1 inherits the parent's group,
Child 2 creates a new group, and Child 3 immediately creates its own group.

This demonstrates how process groups are inherited by default but can be changed
with os.setpgrp().

## Signal Handling with Process Groups

This example demonstrates how process groups affect signal delivery. It creates
multiple processes with different group configurations.

signal_handling.py
  

import os
import signal
import time

def handler(signum, frame):
    print(f"Process {os.getpid()} received signal {signum}")

# Set up signal handler
signal.signal(signal.SIGUSR1, handler)

# Process in original group
pid1 = os.fork()
if pid1 == 0:
    print(f"Process A (PID: {os.getpid()}, PGID: {os.getpgid(0)})")
    time.sleep(10)
    os._exit(0)

# Process in new group
pid2 = os.fork()
if pid2 == 0:
    os.setpgrp()
    print(f"Process B (PID: {os.getpid()}, PGID: {os.getpgid(0)})")
    time.sleep(10)
    os._exit(0)

print("Sending signal to original process group in 3 seconds...")
time.sleep(3)
os.killpg(os.getpgid(0), signal.SIGUSR1)

print("Sending signal to all processes in 3 seconds...")
time.sleep(3)
os.kill(-1, signal.SIGUSR1)

os.waitpid(pid1, 0)
os.waitpid(pid2, 0)

Process A remains in the original process group, while Process B creates a new
group. The example sends signals to different groups to demonstrate the effect.

The first signal only reaches Process A, while the second signal reaches both
processes, showing how process groups control signal delivery.

## Terminal Control Example

This advanced example shows how process groups relate to terminal control. It
demonstrates creating a process group that can take control of a terminal.

terminal_control.py
  

import os
import pty
import tty
import signal

def child_process():
    os.setpgrp()
    print(f"Child PID: {os.getpid()}, PGID: {os.getpgid(0)}")
    
    # Set up terminal
    tty.setraw(0)
    
    print("Child has terminal control. Press Ctrl+C to exit")
    try:
        while True:
            data = os.read(0, 1024)
            if not data:
                break
            os.write(1, data.upper())
    except KeyboardInterrupt:
        print("\nChild exiting")

pid, fd = pty.fork()

if pid == 0:
    child_process()
    os._exit(0)
else:
    print(f"Parent PID: {os.getpid()}, Child PID: {pid}")
    print("Waiting for child to finish...")
    os.waitpid(pid, 0)
    print("Parent exiting")

The child process creates a new process group with os.setpgrp()
and takes control of the pseudo-terminal. It echoes input in uppercase until
Ctrl+C is pressed.

This demonstrates how process groups are essential for terminal control and
how they interact with terminal signals like Ctrl+C.

## Security Considerations

- **Privilege requirements:** May require appropriate permissions

- **Signal isolation:** Affects how signals are delivered

- **Terminal control:** Impacts which process group controls terminal

- **Platform limitations:** Unix-specific functionality

- **Orphaned processes:** New groups may need special cleanup

## Best Practices

- **Use for daemons:** Essential for proper daemon operation

- **Combine with setsid:** Often used together for full isolation

- **Consider alternatives:** os.setsid may be preferable

- **Document intentions:** Clearly note why process groups are changed

- **Handle cleanup:** Ensure proper signal handling for new groups

## Source References

- [Python os.setpgrp Documentation](https://docs.python.org/3/library/os.html#os.setpgrp)

- [Linux setpgid(2) man page](https://man7.org/linux/man-pages/man2/setpgid.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).