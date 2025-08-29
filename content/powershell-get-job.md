+++
title = "PowerShell Get-Job"
date = 2025-08-29T20:06:58.521+01:00
draft = false
description = "PowerShell Get-Job tutorial shows how to use PowerShell to manage and monitor background jobs."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Get-Job

last modified February 15, 2025

In this article, we will cover the Get-Job cmdlet in
PowerShell. This cmdlet retrieves information about background jobs running
in the current session.

## Job basics

A PowerShell job represents a background task that runs independently of
the current session. Jobs allow long-running tasks to execute without blocking
the console. Each job has a unique ID, name, state, and other properties.
The Get-Job cmdlet is essential for job monitoring and management.

## Basic Get-Job usage

The simplest way to use Get-Job is without any parameters. This
lists all jobs in the current session. The output includes job IDs, names,
states, and completion status. Each job is represented as a Job object.

job1.ps1
  

Get-Job

This command retrieves all jobs in the current session. The output shows
job IDs, names, and their current states (Running, Completed, Failed).

## Get specific job by ID

You can retrieve information about a specific job using its ID. Use the
-Id parameter followed by the job ID. This is useful when you need to
check the status of a particular background task. Job IDs are assigned
sequentially when jobs are created.

job2.ps1
  

Get-Job -Id 1

This command returns information about the job with ID 1. Only one job
will be returned since IDs are unique within a session.

## Get jobs by name

Jobs can be retrieved by their names using the -Name parameter. This is
helpful when you have named jobs. Wildcards are supported for partial
matching. Names make jobs easier to identify than numerical IDs.

job3.ps1
  

Get-Job -Name "Data*"

This command returns all jobs whose names start with "Data". The asterisk
acts as a wildcard character for pattern matching.

## Filter jobs by state

You can filter jobs based on their current state. Common states include
Running, Completed, and Failed. Use the -State parameter to filter jobs.
This helps identify jobs that need attention or have finished.

job4.ps1
  

Get-Job -State Running

This command lists all currently running jobs. It's useful for monitoring
active background tasks in your session.

## Formatting job output

The default table format can be changed using Format-List for
detailed information. This shows all available properties of the job object.
You can also select specific properties using Select-Object.

job5.ps1
  

Get-Job | Format-List *

This command displays all properties of all jobs in list format. The output
includes detailed information like start time, end time, and child jobs.

## Get job results

After a job completes, you can retrieve its results using Receive-Job.
First use Get-Job to identify completed jobs. Then pipe them to
Receive-Job to get the output. This is how you collect data from background tasks.

job6.ps1
  

Get-Job -State Completed | Receive-Job

This command retrieves results from all completed jobs. The output shows
whatever data the background jobs produced during execution.

## Get child jobs

Some jobs create child jobs, like those started with Start-Job.
Use the -IncludeChildJob parameter to see these. Child jobs represent
individual tasks within a parent job. This is useful for complex job hierarchies.

job7.ps1
  

Get-Job -IncludeChildJob

This command shows both parent and child jobs. Child jobs are indented
under their parent jobs in the output.

## Get jobs from previous sessions

The -IncludeJobCommand parameter shows the command that started each job.
This helps identify what a job was doing. Combined with Format-List, it
provides complete job information including the original command.

job8.ps1
  

Get-Job -IncludeJobCommand | Format-List

This command displays all jobs with their full details, including the
commands that created them. Useful for auditing or documentation.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Get-Job cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).