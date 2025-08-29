+++
title = "Python sched Module"
date = 2025-08-29T20:10:18.667+01:00
draft = false
description = "Detailed Python tutorial on the sched module for event scheduling, with examples and best practices."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python sched Module

last modified March 10, 2025

The sched module in Python is a lightweight tool for scheduling
events to run at specific times. It's great for tasks like periodic jobs or
delayed actions in single-threaded apps. This tutorial covers its usage with
clear examples.

Unlike threading or multiprocessing, sched is simple and
non-blocking, making it ideal for basic timing needs without added complexity.

## Basic Usage

This example shows how to schedule a task with a delay.

basic_scheduler.py
  

import sched
import time

def print_message():
    print("Hello, World!")

scheduler = sched.scheduler(time.time, time.sleep)
scheduler.enter(5, 1, print_message)  # Run after 5 seconds
scheduler.run()  # Start the scheduler

Here, scheduler.enter sets the print_message
function to run after 5 seconds. scheduler.run
executes all scheduled events in order.

## Repeating Events

This example creates a task that repeats every 5 seconds.

repeating_events.py
  

import sched
import time

def print_message():
    print(f"Tick at {time.ctime()}")
    scheduler.enter(5, 1, print_message)  # Reschedule

scheduler = sched.scheduler(time.time, time.sleep)
scheduler.enter(5, 1, print_message)  # First run
scheduler.run()  # Runs indefinitely

The function reschedules itself, forming a loop. Note that
scheduler.run blocks until stopped manually.

## Priority and Arguments

This example uses priorities and passes arguments to tasks.

priority_arguments.py
  

import sched
import time

def print_message(msg):
    print(msg)

scheduler = sched.scheduler(time.time, time.sleep)
scheduler.enter(5, 2, print_message, ("Low priority",))  # Priority 2
scheduler.enter(5, 1, print_message, ("High priority",))  # Priority 1
scheduler.run()

Lower priority numbers run first if times overlap. The
argument tuple passes data to the function.

## Cancel Scheduled Events

This example cancels a scheduled task before it runs.

cancel_event.py
  

import sched
import time

def print_message():
    print("This won't run!")

scheduler = sched.scheduler(time.time, time.sleep)
event = scheduler.enter(5, 1, print_message)
scheduler.cancel(event)  # Remove from queue
scheduler.run()  # Nothing happens

scheduler.cancel takes an event object and removes it, preventing
execution if not yet run.

## Advanced: Using Absolute Time

This example schedules a task at an exact time.

absolute_time.py
  

import sched
import time

def print_message():
    print(f"Event at {time.ctime()}")

scheduler = sched.scheduler(time.time, time.sleep)
run_time = time.time() + 5  # 5 seconds ahead
scheduler.enterabs(run_time, 1, print_message)
scheduler.run()

scheduler.enterabs uses absolute time (e.g.,
Unix timestamp) instead of a relative delay.

## New Example: Task with Exception Handling

This example safely handles errors in scheduled tasks.

exception_handling.py
  

import sched
import time

def risky_task():
    try:
        result = 10 / 0  # Simulate error
    except ZeroDivisionError:
        print("Caught an error!")

scheduler = sched.scheduler(time.time, time.sleep)
scheduler.enter(3, 1, risky_task)  # Run after 3 seconds
scheduler.run()

Wrapping tasks in try-except prevents the
scheduler from crashing due to unhandled exceptions.

## New Example: Scheduled File Cleanup

This example schedules a file deletion task.

file_cleanup.py
  

import sched
import time
import os

def cleanup_temp_file():
    file = "temp.txt"
    if os.path.exists(file):
        os.remove(file)
        print(f"Deleted {file}")
    else:
        print(f"{file} not found")

scheduler = sched.scheduler(time.time, time.sleep)
scheduler.enter(5, 1, cleanup_temp_file)
scheduler.run()

This simulates a cleanup job, useful for temp files or logs. Check file
existence to avoid errors.

## Best Practices for sched

- **Keep Tasks Light:** Use for simple, non-blocking jobs.

- **Handle Errors:** Add exception handling in tasks.

- **Set Priorities:** Use priority for same-time events.

- **Cancel Events:** Remove unneeded tasks to save resources.

- **Avoid Blocking:** Don't use for long-running tasks.

- **Log Activity:** Log events for debugging and monitoring.

## Source

[Python sched Module Documentation](https://docs.python.org/3/library/sched.html)

This tutorial explored the sched module with
examples like repeating tasks, priorities, and file cleanup.
Follow the best practices for reliable scheduling.

## Author

My name is Jan Bodnar, a passionate programmer with years of
experience. Since 2007, I've written over 1400 articles and
8 e-books, with over eight years teaching programming.

List [all Python tutorials](/python/).