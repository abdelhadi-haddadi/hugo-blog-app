+++
title = "Linux kill Command"
date = 2025-08-29T20:03:28.410+01:00
draft = false
description = "Linux tutorial on the kill command, covering basic and advanced process termination with practical examples."
image = ""
imageBig = ""
categories = ["linux"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Linux kill Command

last modified March 3, 2025

The kill command in Linux is used to terminate processes by sending
specific signals. It is a powerful tool for managing running processes and
ensuring system stability. This tutorial covers basic and advanced usage of
kill with practical examples.

kill is commonly used to stop misbehaving processes, free up system
resources, or gracefully shut down applications.

## Terminate a Process by PID

This example demonstrates how to terminate a process using its Process ID (PID).

kill 1234

The kill command sends the default SIGTERM signal to
the process with PID 1234, requesting it to terminate gracefully.

## Forcefully Terminate a Process

This example shows how to forcefully terminate a process using the
SIGKILL signal.

kill -9 1234

The -9 option sends the SIGKILL signal, which
immediately terminates the process with PID 1234.

## List All Available Signals

This example demonstrates how to list all available signals that can be sent
using the kill command.

kill -l

The -l option lists all signal names and their corresponding
numbers.

## Send a Specific Signal

This example shows how to send a specific signal to a process.

kill -SIGHUP 1234

The -SIGHUP option sends the SIGHUP signal to the
process with PID 1234, often used to reload configurations.

## Terminate Multiple Processes

This example demonstrates how to terminate multiple processes at once.

kill 1234 5678 91011

The kill command sends the SIGTERM signal to all
specified PIDs, requesting them to terminate gracefully.

## Terminate Processes by Name

This example shows how to terminate processes by their name using
pkill.

pkill process_name

The pkill command sends the SIGTERM signal to all
processes matching process_name.

## Gracefully Stop All Processes by User

This example demonstrates how to gracefully stop all processes owned by a
specific user.

pkill -u username

The -u option sends the SIGTERM signal to all
processes owned by username.

## Advanced: Terminate Processes with a Custom Signal

This example shows how to send a custom signal to a process.

kill -SIGUSR1 1234

The -SIGUSR1 option sends the SIGUSR1 signal to the
process with PID 1234, often used for custom process handling.

## Best Practices for kill

- **Use SIGTERM First:** Always try SIGTERM before SIGKILL to allow graceful termination.

- **Check Process Status:** Use ps or top to verify processes before terminating them.

- **Use pkill for Convenience:** Use pkill to terminate processes by name instead of PID.

- **Be Cautious with SIGKILL:** Use SIGKILL only when necessary, as it does not allow cleanup.

## Source

[GNU kill Manual](https://www.gnu.org/software/coreutils/manual/html_node/kill-invocation.html)

In this article, we have explored various examples of using the kill
command for terminating processes, including advanced features like custom
signals and process management by name or user.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Linux tutorials](/all/#linux).