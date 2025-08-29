+++
title = "Python os.setsid Function"
date = 2025-08-29T20:09:37.755+01:00
draft = false
description = "Complete guide to Python's os.setsid function covering process group creation, session management, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.setsid Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.setsid function,
which creates new process sessions. We'll cover Unix process groups, session
management, and practical daemonization examples.

## Basic Definitions

The os.setsid function creates a new session and sets the
process as its leader. It's a Unix-specific system call that detaches from
the controlling terminal.

Key features: creates new session, becomes session leader, becomes process
group leader, has no controlling terminal. Returns the new session ID.

## Creating a New Session

This basic example demonstrates creating a new session with os.setsid.
The child process becomes a session leader independent of the parent.

basic_setsid.py
  

import os
import time

pid = os.fork()

if pid == 0:  # Child process
    print(f"Child PID: {os.getpid()}")
    print(f"Child PGID before setsid: {os.getpgid(0)}")
    
    # Create new session
    sid = os.setsid()
    print(f"New SID: {sid}")
    print(f"Child PGID after setsid: {os.getpgid(0)}")
    
    time.sleep(10)  # Keep process alive to observe
else:  # Parent process
    print(f"Parent PID: {os.getpid()}")
    print(f"Parent PGID: {os.getpgid(0)}")
    os.waitpid(pid, 0)  # Wait for child

The child process creates a new session with os.setsid, becoming independent.
The parent's process group remains unchanged while the child gets a new one.

Note that os.setsid will fail if the calling process is already a process
group leader, which is why we fork first.

## Creating a Daemon Process

A common use of os.setsid is daemon creation. This example shows the full
daemonization process including session creation and file descriptor handling.

daemon_process.py
  

import os
import sys
import time

def daemonize():
    # Fork first time to background
    pid = os.fork()
    if pid &gt; 0:
        sys.exit(0)  # Exit parent
    
    # Create new session
    os.setsid()
    
    # Fork second time to ensure not session leader
    pid = os.fork()
    if pid &gt; 0:
        sys.exit(0)
    
    # Change working directory
    os.chdir('/')
    
    # Close file descriptors
    for fd in range(3, 1024):
        try:
            os.close(fd)
        except OSError:
            pass
    
    # Redirect stdio to /dev/null
    os.open('/dev/null', os.O_RDWR)  # stdin
    os.dup2(0, 1)  # stdout
    os.dup2(0, 2)  # stderr

if __name__ == '__main__':
    daemonize()
    while True:
        with open('/tmp/daemon.log', 'a') as f:
            f.write(f"Daemon running at {time.ctime()}\n")
        time.sleep(5)

This creates a proper daemon process by forking twice, creating a new session,
and handling file descriptors. The daemon writes to a log file periodically.

The double fork ensures the daemon cannot reacquire a controlling terminal.
The working directory is changed to prevent filesystem unmounting issues.

## Handling Session Leader Restrictions

This example demonstrates the restriction that process group leaders cannot
call setsid, and how to work around it with proper forking.

session_leader.py
  

import os

try:
    # This will fail because we're already a process group leader
    sid = os.setsid()
    print(f"Created session {sid}")
except OSError as e:
    print(f"Error calling setsid: {e}")

# Proper approach: fork first
pid = os.fork()
if pid == 0:  # Child
    try:
        sid = os.setsid()
        print(f"Child created session {sid}")
        print(f"New PGID: {os.getpgid(0)}")
    except OSError as e:
        print(f"Child error: {e}")
    os._exit(0)
else:  # Parent
    os.waitpid(pid, 0)
    print("Parent exiting")

The first attempt fails because the main process is a process group leader.
The second approach forks first, allowing the child (not a group leader)
to successfully create a new session.

This demonstrates why daemonization typically involves forking before
calling setsid, to avoid the process group leader restriction.

## Process Group Management

This example shows how setsid affects process groups and demonstrates
process group management with os.setpgid and os.getpgid.

process_groups.py
  

import os
import time

def show_ids(label):
    print(f"{label}: PID={os.getpid()}, PGID={os.getpgid(0)}, SID={os.getsid(0)}")

show_ids("Parent before fork")

pid = os.fork()
if pid == 0:  # Child
    show_ids("Child before setsid")
    
    # Create new session
    sid = os.setsid()
    show_ids("Child after setsid")
    
    # Fork again to create a process group
    pid2 = os.fork()
    if pid2 == 0:  # Grandchild
        show_ids("Grandchild before setpgid")
        os.setpgid(0, 0)  # Create new process group
        show_ids("Grandchild after setpgid")
        time.sleep(10)
    else:
        time.sleep(10)
else:  # Parent
    show_ids("Parent after fork")
    os.waitpid(pid, 0)

This demonstrates the process hierarchy changes when creating new sessions
and process groups. The grandchild creates its own process group within
the child's session.

The output shows how PID, PGID, and SID values change at each step,
illustrating the process relationships.

## Terminal Control and Session Leadership

This example demonstrates how setsid detaches from the controlling terminal
and how session leaders interact with terminal signals.

terminal_control.py
  

import os
import signal
import time

def handler(signum, frame):
    print(f"Received signal {signum}")

# Set up signal handler
signal.signal(signal.SIGHUP, handler)

pid = os.fork()
if pid == 0:  # Child
    print(f"Child PID: {os.getpid()}")
    
    # Create new session (detaches from terminal)
    os.setsid()
    
    print("Child in new session, ignoring SIGHUP")
    signal.signal(signal.SIGHUP, signal.SIG_IGN)
    
    time.sleep(30)  # Keep process alive
else:  # Parent
    print(f"Parent PID: {os.getpid()}")
    time.sleep(1)  # Let child set up
    
    # Send SIGHUP to child's process group
    os.kill(-pid, signal.SIGHUP)
    os.waitpid(pid, 0)

The child process creates a new session and ignores SIGHUP signals.
The parent attempts to send SIGHUP to the child's original process group.

This demonstrates how session leaders handle terminal signals differently
and how process groups affect signal delivery.

## Session ID Inheritance

This example shows how session IDs are inherited across fork and exec calls,
and how setsid creates new independent sessions.

session_inheritance.py
  

import os
import sys

def show_session():
    print(f"PID: {os.getpid()}, SID: {os.getsid(0)}")

show_session()  # Original process

pid = os.fork()
if pid == 0:  # Child
    show_session()  # Inherited session
    
    # Create new session
    os.setsid()
    show_session()
    
    # Execute new program
    os.execvp("python3", ["python3", "-c", 
             "import os; print(f'Exec PID: {os.getpid()}, SID: {os.getsid(0)}')"])
else:  # Parent
    os.waitpid(pid, 0)
    show_session()  # Still original session

The child process first inherits the parent's session, then creates a new
one with setsid, and finally executes a new program that shows its session.

This demonstrates that exec preserves the session ID, while setsid creates
a completely new independent session.

## Security Considerations

- **Privilege separation:** New sessions may affect privilege inheritance

- **Signal handling:** Session leaders handle terminal signals differently

- **Resource limits:** New sessions may have different resource constraints

- **Process isolation:** Sessions provide basic process isolation

- **Platform limitations:** Windows has different process grouping

## Best Practices

- **Fork first:** Always fork before calling setsid

- **Handle stdio:** Redirect or close file descriptors after setsid

- **Change directory:** Avoid filesystem unmounting issues

- **Signal handling:** Set up appropriate signal handlers

- **Error checking:** Verify setsid return value

## Source References

- [Python os.setsid Documentation](https://docs.python.org/3/library/os.html#os.setsid)

- [Linux setsid(2) man page](https://man7.org/linux/man-pages/man2/setsid.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).