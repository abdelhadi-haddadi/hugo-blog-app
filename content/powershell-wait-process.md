+++
title = "PowerShell Wait-Process"
date = 2025-08-29T20:07:22.283+01:00
draft = false
description = "PowerShell Wait-Process tutorial shows how to use PowerShell to wait for processes to stop."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Wait-Process

last modified February 15, 2025

In this article, we will cover the Wait-Process cmdlet in
PowerShell. This cmdlet waits for processes to stop before continuing
script execution. It's useful for process synchronization.

## Wait-Process basics

The Wait-Process cmdlet waits for one or more running processes
to stop before accepting input. It can wait for processes specified by name,
ID, or process object. This is helpful when scripts need to wait for
applications to complete.

## Basic Wait-Process usage

The simplest way to use Wait-Process is with a process name.
The cmdlet will wait until all instances of that process terminate. This
blocks script execution until the condition is met.

wait1.ps1
  

Wait-Process -Name "notepad"

This command waits for all Notepad processes to exit. The PowerShell session
will be unresponsive until Notepad closes. No output is produced unless
using -Verbose.

## Wait for process by ID

You can wait for a specific process using its process ID (PID). This is
precise as each process has a unique ID. Use the -Id parameter followed
by the PID. This is useful when targeting a specific instance.

wait2.ps1
  

Wait-Process -Id 1234

This command waits for the process with ID 1234 to terminate. The script
will pause execution until this specific process exits. Useful for
monitoring specific application instances.

## Timeout for waiting

You can specify a timeout period for waiting using the -Timeout parameter.
This prevents indefinite waiting if a process hangs. The value is in seconds.
After timeout, an error is thrown if the process is still running.

wait3.ps1
  

Wait-Process -Name "calc" -Timeout 30

This waits for Calculator to exit, but only for 30 seconds. If Calculator
is still running after 30 seconds, an error occurs. This prevents scripts
from hanging indefinitely.

## Wait for multiple processes

Wait-Process can wait for multiple processes simultaneously.
Provide multiple process names or IDs separated by commas. The cmdlet waits
until all specified processes terminate.

wait4.ps1
  

Wait-Process -Name "notepad", "calc"

This command waits for both Notepad and Calculator to close. The script
continues only when neither process is running. Useful for complex
dependency scenarios.

## Pipeline input

Wait-Process accepts process objects from the pipeline. This
allows combining with Get-Process for flexible process
selection. The pipeline approach is powerful for complex filtering.

wait5.ps1
  

Get-Process -Name "chrome" | Wait-Process

This gets all Chrome processes and waits for them to exit. The pipeline
passes process objects directly to Wait-Process. This is
cleaner than using intermediate variables.

## Error handling

By default, Wait-Process throws errors for non-existent
processes. Use -ErrorAction SilentlyContinue to suppress these errors.
This is useful when process termination is uncertain.

wait6.ps1
  

Wait-Process -Name "nonexistent" -ErrorAction SilentlyContinue

This attempts to wait for a non-existent process but suppresses the error.
The script continues immediately since the process isn't running. Useful
for cleanup scripts.

## Verbose output

The -Verbose parameter provides detailed information about the waiting
process. This helps with debugging and monitoring script execution.
Verbose output shows which processes are being monitored.

wait7.ps1
  

Wait-Process -Name "explorer" -Verbose

This waits for Windows Explorer to close with verbose output. The console
shows real-time status updates. Helpful for understanding script behavior.

## Combining with Stop-Process

Wait-Process is often used with Stop-Process to
ensure processes terminate. First request termination, then wait for
completion. This creates reliable process management sequences.

wait8.ps1
  

Stop-Process -Name "notepad" -PassThru | Wait-Process

This stops Notepad and waits for it to fully terminate. -PassThru passes
the process object to Wait-Process. Ensures clean shutdown
before continuing.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Wait-Process cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).