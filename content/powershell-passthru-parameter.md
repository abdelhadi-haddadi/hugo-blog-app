+++
title = "PowerShell -PassThru Parameter"
date = 2025-08-29T20:07:10.891+01:00
draft = false
description = "PowerShell -PassThru parameter tutorial shows how to use PowerShell to manage processes with output objects."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell -PassThru Parameter

last modified February 15, 2025

In this article, we will cover the -PassThru parameter in
PowerShell. This parameter returns objects that would otherwise not be
returned by default.

## -PassThru basics

The -PassThru parameter tells cmdlets to return output objects
even when they normally wouldn't. Many cmdlets perform actions without
output by default. -PassThru forces these cmdlets to return
the affected objects. This is useful for chaining commands in pipelines.

## Basic -PassThru usage with Stop-Process

By default, Stop-Process doesn't return any output when it
terminates processes. With -PassThru, it returns the stopped
process objects. This allows you to verify the action or pipe results.

passthru1.ps1
  

Stop-Process -Name "notepad" -PassThru

This command stops all Notepad processes and returns their objects. Without
-PassThru, you would get no confirmation of the action.

## Using -PassThru with Start-Process

Start-Process doesn't return the new process object by default.
With -PassThru, you get the Process object of the started
application. This is useful for tracking or managing the new process.

passthru2.ps1
  

$proc = Start-Process notepad -PassThru
$proc | Select-Object Id, Name, StartTime

This starts Notepad and stores its Process object in $proc. We then display
selected properties of the new process.

## -PassThru with Wait-Process

Wait-Process normally doesn't return anything when waiting
completes. With -PassThru, it returns the waited-on process
object. This confirms which process was being monitored.

passthru3.ps1
  

$proc = Start-Process notepad -PassThru
Wait-Process -InputObject $proc -PassThru

This starts Notepad, waits for it to exit, then returns its process object.
The output confirms which process was waited on.

## Combining -PassThru with Where-Object

You can filter processes before passing them to another cmdlet with
-PassThru. This example stops high-memory processes while
keeping the pipeline flowing. The filtered processes are passed through.

passthru4.ps1
  

Get-Process | Where-Object { $_.WS -gt 100MB } | 
Stop-Process -PassThru | 
Format-Table Name, Id, WS -AutoSize

This finds processes using over 100MB of working set, stops them, and
formats the output. -PassThru enables the pipeline flow.

## -PassThru with Debug-Process

Debug-Process attaches a debugger without output by default.
With -PassThru, it returns the process being debugged. This
helps confirm the debugging target.

passthru5.ps1
  

Debug-Process -Name "powershell" -PassThru

This attaches a debugger to PowerShell processes and returns them. Without
-PassThru, you wouldn't see which processes were affected.

## Using -PassThru with Suspend-Process

Suspend-Process pauses processes without output by default.
With -PassThru, it returns the suspended process objects.
This verifies which processes were paused.

passthru6.ps1
  

Suspend-Process -Name "notepad" -PassThru

This suspends Notepad processes and returns their objects. You can then
resume them later using Resume-Process.

## -PassThru with Resume-Process

Resume-Process resumes suspended processes without output.
With -PassThru, it returns the resumed process objects.
This confirms which processes were reactivated.

passthru7.ps1
  

Resume-Process -Name "notepad" -PassThru

This resumes previously suspended Notepad processes and returns them.
The output shows the processes that were brought back to running state.

## Chaining multiple -PassThru operations

You can chain multiple operations with -PassThru to maintain
the pipeline. This example starts, waits for, and stops a process while
keeping the object flowing through each step.

passthru8.ps1
  

Start-Process notepad -PassThru | 
Wait-Process -PassThru | 
Stop-Process -PassThru

This starts Notepad, waits for it to exit, then stops it, with each cmdlet
passing the Process object to the next. -PassThru enables this
entire pipeline to work.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the -PassThru parameter in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).