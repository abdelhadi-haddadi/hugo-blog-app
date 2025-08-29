+++
title = "Python os.forkpty Function"
date = 2025-08-29T20:09:11.753+01:00
draft = false
description = "Complete guide to Python's os.forkpty function covering pseudo-terminal creation, process forking, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.forkpty Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.forkpty function,
which creates a child process with a pseudo-terminal. We'll cover terminal
emulation, process communication, and practical examples.

## Basic Definitions

The os.forkpty function combines fork() and pty creation. It
creates a child process connected to a new pseudo-terminal (pty).

Returns a tuple (pid, fd) where pid is 0 in child, child's PID in parent.
fd is the file descriptor of the master end of the pty. The child gets
the slave end as stdin/stdout/stderr.

## Basic Forkpty Example

This simple example demonstrates the basic usage of os.forkpty. The parent
process communicates with the child through the pseudo-terminal.

basic_forkpty.py
  

import os
import sys

pid, fd = os.forkpty()

if pid == 0:  # Child process
    print("Child process running in pty")
    sys.stdout.flush()
    data = sys.stdin.readline()
    print(f"Child received: {data.strip()}")
    sys.exit(0)
else:  # Parent process
    print(f"Parent process with child PID: {pid}")
    os.write(fd, b"Hello from parent\n")
    output = os.read(fd, 1024)
    print(f"Parent received: {output.decode().strip()}")
    os.waitpid(pid, 0)

The child process runs in a pseudo-terminal and can be controlled by the
parent. The parent writes to and reads from the child through the pty.

This demonstrates the basic communication pattern between parent and child
processes using a pseudo-terminal.

## Running Shell in Pty

This example shows how to run a shell in a pseudo-terminal. The parent can
send commands and read output as if interacting with a real terminal.

shell_in_pty.py
  

import os
import select
import sys

pid, fd = os.forkpty()

if pid == 0:  # Child process
    os.execvp("bash", ["bash"])
else:  # Parent process
    while True:
        r, w, e = select.select([fd, sys.stdin], [], [])
        
        if fd in r:
            output = os.read(fd, 1024)
            if not output:
                break
            sys.stdout.write(output.decode())
            sys.stdout.flush()
            
        if sys.stdin in r:
            cmd = sys.stdin.readline()
            os.write(fd, cmd.encode())

The child process runs bash in the pseudo-terminal. The parent uses select
to handle both user input and pty output in a non-blocking manner.

This creates an interactive shell session where commands can be sent and
output received through the pty.

## Terminal Size Control

This example demonstrates how to control the terminal size of the pty.
The parent can modify the window size which affects programs in the child.

terminal_size.py
  

import os
import fcntl
import termios
import struct

def set_winsize(fd, rows, cols):
    winsize = struct.pack("HHHH", rows, cols, 0, 0)
    fcntl.ioctl(fd, termios.TIOCSWINSZ, winsize)

pid, fd = os.forkpty()

if pid == 0:  # Child process
    os.execvp("bash", ["bash"])
else:  # Parent process
    # Set initial terminal size
    set_winsize(fd, 40, 120)
    
    # After some time, resize the terminal
    import time
    time.sleep(2)
    set_winsize(fd, 20, 60)
    
    os.waitpid(pid, 0)

The set_winsize function uses ioctl with TIOCSWINSZ to change the terminal
dimensions. This affects how programs like text editors display content.

The example shows an initial size of 40x120, then changes to 20x60 after
2 seconds. Programs in the child will adapt to the new size.

## Raw Mode Terminal

This example puts the pty in raw mode, disabling line buffering and special
character handling. This is useful for interactive applications.

raw_mode.py
  

import os
import tty
import sys
import select

pid, fd = os.forkpty()

if pid == 0:  # Child process
    os.execvp("bash", ["bash"])
else:  # Parent process
    # Put terminal in raw mode
    old_settings = tty.tcgetattr(fd)
    tty.setraw(fd)
    
    try:
        while True:
            r, w, e = select.select([fd, sys.stdin], [], [])
            
            if fd in r:
                output = os.read(fd, 1024)
                if not output:
                    break
                sys.stdout.write(output.decode())
                sys.stdout.flush()
                
            if sys.stdin in r:
                cmd = sys.stdin.read(1)
                os.write(fd, cmd.encode())
    finally:
        # Restore original terminal settings
        tty.tcsetattr(fd, tty.TCSADRAIN, old_settings)

The parent puts the pty in raw mode using tty.setraw(). This disables echo,
line buffering, and special character processing (like Ctrl+C).

The example ensures terminal settings are restored when done. This is
important to avoid leaving the terminal in an unusable state.

## Pty with Environment Control

This example shows how to control the environment of the child process
running in the pty. We set custom environment variables before exec.

pty_environment.py
  

import os
import sys

pid, fd = os.forkpty()

if pid == 0:  # Child process
    # Modify environment
    os.environ["CUSTOM_VAR"] = "special_value"
    os.environ["TERM"] = "xterm-256color"
    
    # Run command that shows environment
    os.execvp("bash", ["bash", "-c", "echo $CUSTOM_VAR; echo $TERM; sleep 2"])
else:  # Parent process
    output = os.read(fd, 1024)
    print("Child output:")
    print(output.decode())
    os.waitpid(pid, 0)

The child process sets custom environment variables before executing bash.
These variables are only visible to the child and its descendants.

The example demonstrates setting both a custom variable and standard
terminal-related variables like TERM.

## Signal Handling in Pty

This example demonstrates signal handling between parent and child processes
communicating through a pty. The parent can send signals to the child.

pty_signals.py
  

import os
import signal
import time
import sys

pid, fd = os.forkpty()

if pid == 0:  # Child process
    # Set up signal handler
    def handler(signum, frame):
        print(f"\nChild received signal {signum}")
        sys.exit(0)
    
    signal.signal(signal.SIGINT, handler)
    signal.signal(signal.SIGTERM, handler)
    
    print("Child waiting for signals...")
    while True:
        time.sleep(1)
else:  # Parent process
    time.sleep(1)  # Give child time to start
    print(f"Parent sending SIGINT to child {pid}")
    os.kill(pid, signal.SIGINT)
    
    status = os.waitpid(pid, 0)
    print(f"Child exit status: {status[1]}")

The child process sets up signal handlers for SIGINT and SIGTERM. The parent
sends SIGINT to demonstrate signal delivery through the pty.

This shows how signals can be used to control a child process running in
a pseudo-terminal.

## Pty with Timeout

This example implements a timeout when reading from the pty, demonstrating
how to handle cases where the child might hang or take too long to respond.

pty_timeout.py
  

import os
import select
import sys
import time

pid, fd = os.forkpty()

if pid == 0:  # Child process
    print("Child will respond after 3 seconds")
    time.sleep(3)
    print("Child done")
    sys.exit(0)
else:  # Parent process
    timeout = 2  # seconds
    start = time.time()
    
    while True:
        remaining = timeout - (time.time() - start)
        if remaining &lt;= 0:
            print("\nTimeout reached, killing child")
            os.kill(pid, signal.SIGTERM)
            break
            
        r, w, e = select.select([fd], [], [], remaining)
        
        if fd in r:
            output = os.read(fd, 1024)
            if not output:
                break
            print(output.decode(), end="")
        else:
            print("\nNo output within timeout period")
            os.kill(pid, signal.SIGTERM)
            break
    
    os.waitpid(pid, 0)

The parent waits for output from the child with a 2-second timeout. The
child intentionally sleeps for 3 seconds to trigger the timeout.

This demonstrates how to implement timeouts when interacting with processes
through a pty, which is important for robust applications.

## Security Considerations

- **Privilege separation:** Child processes inherit parent privileges

- **Terminal injection:** Be cautious with untrusted input to ptys

- **Signal handling:** Properly handle signals in both processes

- **Resource cleanup:** Ensure ptys are properly closed

- **Platform differences:** Behavior may vary between Unix systems

## Best Practices

- **Error handling:** Check return values and handle errors

- **Resource management:** Use context managers for file descriptors

- **Signal safety:** Be aware of signal handling in both processes

- **Terminal settings:** Restore original settings when done

- **Testing:** Test with different terminal types and sizes

## Source References

- [Python os.forkpty Documentation](https://docs.python.org/3/library/os.html#os.forkpty)

- [Linux pty(7) man page](https://man7.org/linux/man-pages/man7/pty.7.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).