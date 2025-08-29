+++
title = "Python os.getpriority Function"
date = 2025-08-29T20:09:18.445+01:00
draft = false
description = "Complete guide to Python's os.getpriority function covering process priority checks, nice values, and practical examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python os.getpriority Function

Last modified April 11, 2025

This comprehensive guide explores Python's os.getpriority function,
which retrieves the scheduling priority of a process. We'll cover priority
values, process selection, and practical system monitoring examples.

## Basic Definitions

The os.getpriority function returns the scheduling priority of a
specified process. Priorities affect how much CPU time a process receives.

Key parameters: which (process selection: PRIO_PROCESS, PRIO_PGRP, PRIO_USER),
who (process ID, process group ID, or user ID). Returns the nice value.

## Getting Current Process Priority

The simplest use of os.getpriority retrieves the current process's
priority. This shows the default nice value (typically 0) for new processes.

current_priority.py
  

import os

# Get priority of current process
pid = os.getpid()
priority = os.getpriority(os.PRIO_PROCESS, pid)

print(f"Current process priority (PID {pid}): {priority}")

# Typical nice values range from -20 (highest) to 19 (lowest)
print(f"Priority range: -20 (highest) to 19 (lowest)")

This example gets the current process ID and queries its scheduling priority.
The priority is returned as a nice value, where lower numbers mean higher
priority.

On Unix-like systems, only privileged processes can set negative nice values
(higher priority). Normal users can only decrease priority.

## Getting Another Process's Priority

We can check the priority of any running process by specifying its PID. This
requires appropriate permissions to access process information.

other_process_priority.py
  

import os

# Get priority of system processes (PID 1 is usually init/systemd)
try:
    init_priority = os.getpriority(os.PRIO_PROCESS, 1)
    print(f"Init process priority: {init_priority}")
except PermissionError:
    print("Cannot access init process priority (permission denied)")

# Get priority of parent process
parent_pid = os.getppid()
try:
    parent_priority = os.getpriority(os.PRIO_PROCESS, parent_pid)
    print(f"Parent process priority (PID {parent_pid}): {parent_priority}")
except ProcessLookupError:
    print("Parent process no longer exists")

This example attempts to get the priority of the init process (PID 1) and the
parent process. Note that permission checks are needed for system processes.

ProcessLookupError is raised if the specified process doesn't exist, while
PermissionError occurs for insufficient privileges.

## Getting Process Group Priority

Using PRIO_PGRP, we can get the priority of an entire process group. This
returns the priority for the group leader process.

process_group_priority.py
  

import os

# Get current process group ID
pgid = os.getpgid(0)  # 0 means current process
print(f"Current process group ID: {pgid}")

# Get priority of the process group
try:
    group_priority = os.getpriority(os.PRIO_PGRP, pgid)
    print(f"Process group priority: {group_priority}")
except PermissionError:
    print("Cannot access process group priority")

# Compare with individual process priorities
current_priority = os.getpriority(os.PRIO_PROCESS, os.getpid())
print(f"Current process priority: {current_priority}")

This example shows how to get the priority of a process group. The group
priority typically matches the priority of the group leader process.

Process groups allow managing multiple related processes with a single
priority setting command.

## Getting User Process Priority

With PRIO_USER, we can get the default priority for all processes owned by
a specific user. This shows the base nice value for new processes.

user_priority.py
  

import os
import pwd

# Get current user ID
uid = os.getuid()
username = pwd.getpwuid(uid).pw_name

# Get user priority
try:
    user_priority = os.getpriority(os.PRIO_USER, uid)
    print(f"Default priority for user {username} (UID {uid}): {user_priority}")
except PermissionError:
    print(f"Cannot check priority for user {username}")

# Compare with root user (UID 0)
try:
    root_priority = os.getpriority(os.PRIO_USER, 0)
    print(f"Root user priority: {root_priority}")
except PermissionError:
    print("Cannot check root user priority")

This example retrieves the priority setting for the current user and attempts
to check the root user's priority. Normal users typically can't check other
users' priorities.

User-level priority settings affect all new processes created by that user
unless explicitly changed.

## Monitoring Priority Changes

This example demonstrates monitoring priority changes by comparing before and
after values when modifying process priority.

monitor_priority.py
  

import os
import time

pid = os.getpid()

def show_priority():
    try:
        return os.getpriority(os.PRIO_PROCESS, pid)
    except Exception as e:
        print(f"Error getting priority: {e}")
        return None

print(f"Initial priority: {show_priority()}")

# Try to increase priority (requires privileges)
try:
    os.setpriority(os.PRIO_PROCESS, pid, -5)
    print(f"After increasing priority: {show_priority()}")
except PermissionError:
    print("Cannot increase priority (requires root)")

# Decrease priority (normal users can do this)
os.setpriority(os.PRIO_PROCESS, pid, 10)
print(f"After decreasing priority: {show_priority()}")

The example shows how to monitor priority changes. First it displays the
initial priority, then attempts to increase it (usually fails without root),
and finally decreases it.

The os.setpriority function modifies the priority, while
os.getpriority retrieves the current value.

## Handling Errors

This example demonstrates proper error handling when using os.getpriority,
including cases for non-existent processes and permission issues.

error_handling.py
  

import os

def safe_get_priority(pid):
    try:
        priority = os.getpriority(os.PRIO_PROCESS, pid)
        print(f"Priority for PID {pid}: {priority}")
    except ProcessLookupError:
        print(f"Process {pid} does not exist")
    except PermissionError:
        print(f"Cannot access priority for PID {pid} (permission denied)")
    except Exception as e:
        print(f"Unexpected error checking PID {pid}: {e}")

# Test with various PIDs
safe_get_priority(os.getpid())  # Current process
safe_get_priority(1)           # Init process (may need permissions)
safe_get_priority(99999)       # Non-existent process
safe_get_priority(0)           # Invalid PID

This robust implementation handles all potential error cases when checking
process priorities. It demonstrates proper exception handling for different
scenarios.

The function gracefully handles permission issues, non-existent processes,
and other unexpected errors that might occur.

## Comparing Process Priorities

This example compares priorities of multiple processes to identify which has
higher scheduling priority.

compare_priorities.py
  

import os

def compare_processes(pid1, pid2):
    try:
        prio1 = os.getpriority(os.PRIO_PROCESS, pid1)
        prio2 = os.getpriority(os.PRIO_PROCESS, pid2)
        
        if prio1 &lt; prio2:
            print(f"PID {pid1} has higher priority ({prio1} vs {prio2})")
        elif prio1 &gt; prio2:
            print(f"PID {pid2} has higher priority ({prio2} vs {prio1})")
        else:
            print(f"Both processes have equal priority ({prio1})")
    except Exception as e:
        print(f"Comparison failed: {e}")

# Compare current process with parent
current_pid = os.getpid()
parent_pid = os.getppid()
compare_processes(current_pid, parent_pid)

# Compare with system processes
compare_processes(current_pid, 1)  # Init process

This example compares the priorities of two processes. Lower nice values mean
higher priority, so we check which process has the smaller value.

The comparison helps understand how the scheduler might prioritize different
processes competing for CPU time.

## Security Considerations

- **Permission requirements:** Reading other processes' priorities may need privileges

- **Privilege escalation:** Negative nice values require root/sudo

- **Process visibility:** Users can only see their own processes by default

- **System impact:** Improper priority settings can affect system stability

- **Cross-platform:** Windows has different priority concepts

## Best Practices

- **Error handling:** Always handle ProcessLookupError and PermissionError

- **Minimal changes:** Adjust priorities conservatively

- **Document assumptions:** Note any priority requirements in your code

- **Restore defaults:** Return processes to normal priority when done

- **Consider alternatives:** For complex scheduling, use dedicated tools

## Source References

- [Python os.getpriority Documentation](https://docs.python.org/3/library/os.html#os.getpriority)

- [Linux getpriority(2) man page](https://man7.org/linux/man-pages/man2/getpriority.2.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).