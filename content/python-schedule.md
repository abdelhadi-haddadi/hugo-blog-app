+++
title = "Python Schedule"
date = 2025-08-29T20:10:19.790+01:00
draft = false
description = "Python Schedule tutorial shows how to use the schedule library for task scheduling in Python."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Schedule

last modified February 15, 2025

In this article, we show how to use the schedule library in Python.
The schedule library is used to schedule tasks to run at specific
intervals or times. It is particularly useful for automating repetitive tasks,
such as sending emails, generating reports, or performing backups.

The schedule library is easy to use and provides a simple API for
scheduling tasks.

## Installing the Schedule Library

Before using the schedule library, you need to install it using pip.

$ pip install schedule

## Scheduling a Task

The following example demonstrates how to schedule a task to run every 10 seconds.

main.py
  

import schedule
import time

def task():
    print("Task is running...")

# Schedule the task to run every 10 seconds
schedule.every(10).seconds.do(task)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(1)

In this program, the schedule.every(10).seconds.do(task) function
is used to schedule the task function to run every 10 seconds. The
schedule.run_pending() function checks if any scheduled tasks are
due to run and executes them.

$ python main.py
Task is running...
Task is running...
Task is running...

## Scheduling a Task at a Specific Time

The following example demonstrates how to schedule a task to run at a specific time every day.

main.py
  

import schedule
import time

def task():
    print("Task is running...")

# Schedule the task to run at 10:00 AM every day
schedule.every().day.at("10:00").do(task)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(1)

In this program, the schedule.every().day.at("10:00").do(task)
function is used to schedule the task function to run at 10:00 AM
every day.

$ python main.py
Task is running...

## Scheduling Multiple Tasks

The following example demonstrates how to schedule multiple tasks at different
intervals.

main.py
  

import schedule
import time

def task1():
    print("Task 1 is running...")

def task2():
    print("Task 2 is running...")

# Schedule task1 to run every 5 seconds
schedule.every(5).seconds.do(task1)

# Schedule task2 to run every 10 seconds
schedule.every(10).seconds.do(task2)

# Keep the script running
while True:
    schedule.run_pending()
    time.sleep(1)

In this program, task1 is scheduled to run every 5 seconds, and
task2 is scheduled to run every 10 seconds.

$ python main.py
Task 1 is running...
Task 1 is running...
Task 2 is running...
Task 1 is running...

## Canceling a Scheduled Task

The following example demonstrates how to cancel a scheduled task.

main.py
  

import schedule
import time

def task():
    print("Task is running...")

# Schedule the task to run every 5 seconds
job = schedule.every(5).seconds.do(task)

# Keep the script running for 15 seconds
start_time = time.time()
while time.time() - start_time &lt; 15:
    schedule.run_pending()
    time.sleep(1)

# Cancel the task
schedule.cancel_job(job)
print("Task canceled.")

In this program, the schedule.cancel_job(job) function is used to
cancel the scheduled task after 15 seconds.

$ python main.py
Task is running...
Task is running...
Task is running...
Task canceled.

## Source

[Python Schedule - Documentation](https://schedule.readthedocs.io/en/stable/)

In this article, we have shown how to use the schedule library in
Python for task scheduling. The schedule library is a powerful tool
for automating repetitive tasks.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).