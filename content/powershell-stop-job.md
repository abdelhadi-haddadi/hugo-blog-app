+++
title = "PowerShell Stop-Job"
date = 2025-08-29T20:07:18.776+01:00
draft = false
description = "PowerShell Stop-Job tutorial shows how to use PowerShell to stop background jobs."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Stop-Job

last modified February 15, 2025

In this article, we will cover the Stop-Job cmdlet in PowerShell. 
This cmdlet stops background jobs running in PowerShell. It is useful for 
managing long-running tasks.

## Job basics

A job in PowerShell is a background task that runs independently. Jobs allow 
you to run commands without blocking the console. Each job has a unique ID 
and state (Running, Completed, Failed). The Stop-Job cmdlet 
terminates running jobs.

## Basic Stop-Job usage

The simplest way to use Stop-Job is with a job object. First, 
start a job with Start-Job. Then pass the job to Stop-Job. 
This immediately terminates the background task.

stopjob1.ps1
  

$job = Start-Job -ScriptBlock { Start-Sleep -Seconds 60 }
Stop-Job -Job $job

This script starts a background job that sleeps for 60 seconds. The 
Stop-Job cmdlet stops it before completion. The job state 
changes to Stopped.

## Stop job by ID

Jobs can be stopped using their unique ID numbers. First, list jobs with 
Get-Job to find the ID. Then pass the ID to Stop-Job. 
This is useful when managing multiple jobs.

stopjob2.ps1
  

Start-Job -ScriptBlock { Start-Sleep -Seconds 30 }
Get-Job
Stop-Job -Id 1

This starts a sleep job, lists all jobs, then stops job ID 1. The job ID 
is shown in the Get-Job output. IDs are assigned sequentially.

## Stop multiple jobs

Multiple jobs can be stopped at once using pipeline input. First filter 
jobs with Get-Job, then pipe to Stop-Job. This 
is efficient for bulk job management.

stopjob3.ps1
  

Start-Job -ScriptBlock { Start-Sleep -Seconds 20 }
Start-Job -ScriptBlock { Start-Sleep -Seconds 30 }
Get-Job -State Running | Stop-Job

This starts two sleep jobs, then stops all running jobs. The pipeline 
passes each running job to Stop-Job. Both jobs are terminated.

## Stop job by name

Jobs can be named when created and stopped by name. Use the -Name 
parameter with both Start-Job and Stop-Job. Named 
jobs are easier to manage in complex scripts.

stopjob4.ps1
  

Start-Job -Name "MyJob" -ScriptBlock { Start-Sleep -Seconds 40 }
Stop-Job -Name "MyJob"

This creates a named job "MyJob" that sleeps for 40 seconds. The 
Stop-Job cmdlet stops it by name. Named jobs are easier to track.

## Force stop a stuck job

Some jobs may not respond to normal stop requests. The -Force 
parameter can terminate stubborn jobs. This should be used as a last resort 
for unresponsive jobs.

stopjob5.ps1
  

$job = Start-Job -ScriptBlock { while($true) { } }
Stop-Job -Job $job -Force

This starts an infinite loop job. The -Force parameter 
ensures termination. Forced stops may leave resources in an inconsistent state.

## Stop remote jobs

Jobs running on remote computers can be stopped too. First create a remote 
job with Invoke-Command. Then stop it using the job object or ID.

stopjob6.ps1
  

$session = New-PSSession -ComputerName Server01
$job = Invoke-Command -Session $session -ScriptBlock { Start-Sleep -Seconds 50 } -AsJob
Stop-Job -Job $job

This creates a remote session and starts a sleep job. The Stop-Job 
cmdlet terminates the remote job. Remote job management requires proper permissions.

## Confirm before stopping

The -Confirm parameter prompts before stopping each job. This 
prevents accidental job termination. It's useful in production environments.

stopjob7.ps1
  

Start-Job -ScriptBlock { Start-Sleep -Seconds 10 }
Stop-Job -Id 1 -Confirm

This starts a sleep job, then prompts before stopping it. The confirmation 
shows the job details. Answer 'Y' to proceed or 'N' to cancel.

## Stop all jobs

All jobs can be stopped at once using Get-Job with 
Stop-Job. This is a quick way to clean up all background 
tasks. Be careful as it stops every job.

stopjob8.ps1
  

Start-Job -ScriptBlock { Start-Sleep -Seconds 15 }
Start-Job -ScriptBlock { Start-Sleep -Seconds 25 }
Get-Job | Stop-Job

This starts two sleep jobs, then stops all jobs. The pipeline passes every 
job to Stop-Job. All background tasks are terminated.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Stop-Job cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).