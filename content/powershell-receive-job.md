+++
title = "PowerShell Receive-Job"
date = 2025-08-29T20:07:11.991+01:00
draft = false
description = "PowerShell Receive-Job tutorial shows how to retrieve results from background jobs in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Receive-Job

last modified February 15, 2025

This article covers the Receive-Job cmdlet in PowerShell. It
retrieves results from background jobs started with Start-Job.
Background jobs allow running commands asynchronously.

## Job basics

A PowerShell job represents a command running in the background. Jobs allow
long-running tasks to execute without blocking the console. Each job has a
unique ID and state (Running, Completed, Failed). The Receive-Job
cmdlet gets the results from completed jobs.

## Basic Receive-Job usage

The simplest way to use Receive-Job is with a job object. First
start a job with Start-Job, then retrieve its results. The job
must be completed before receiving results. You can check job status with
Get-Job.

receive1.ps1
  

$job = Start-Job -ScriptBlock { Get-Process }
Receive-Job -Job $job

This example starts a job to get processes and then retrieves the results.
The output is the same as running Get-Process directly but
executed asynchronously.

## Receive job by ID

Jobs can be received by their ID instead of the job object. First get the
job ID from Get-Job output. Then use the -Id parameter with
Receive-Job. This is useful when working with multiple jobs.

receive2.ps1
  

Start-Job -ScriptBlock { Get-Service }
$jobId = (Get-Job).Id
Receive-Job -Id $jobId

This starts a job to get services, stores its ID, and receives the output.
The job ID is unique for each session and helps identify specific jobs.

## Receive job by name

Jobs can be named when created for easier identification. Use the -Name
parameter with Start-Job. Then receive results using the same
name with Receive-Job. Named jobs simplify management in
complex scripts.

receive3.ps1
  

Start-Job -Name "ServiceJob" -ScriptBlock { Get-Service }
Receive-Job -Name "ServiceJob"

This creates a named job to get services and receives its output. The name
makes the job easier to reference than using IDs or job objects.

## Keep job results after receiving

By default, job results are deleted after being received. Use the -Keep
parameter to preserve the results. This allows receiving the output multiple
times. The job must still be completed before receiving results.

receive4.ps1
  

$job = Start-Job -ScriptBlock { 1..5 }
Receive-Job -Job $job -Keep
Receive-Job -Job $job -Keep

This job outputs numbers 1 through 5. The -Keep parameter allows receiving
the results twice. Without -Keep, the second receive would return nothing.

## Receive partial job results

For long-running jobs, you can receive partial results as they become
available. Use the -WriteEvents parameter to stream output. The job continues
running while you receive partial results. This is useful for monitoring
progress.

receive5.ps1
  

$job = Start-Job -ScriptBlock { 1..10 | ForEach-Object { $_; Start-Sleep -Seconds 1 } }
while ($job.State -eq 'Running') {
    Receive-Job -Job $job -WriteEvents
    Start-Sleep -Milliseconds 500
}

This job outputs numbers with delays. The script receives results as they
are produced. The loop continues until the job completes.

## Receive job results as raw objects

By default, results are formatted for display. Use -AutoFormat:$false to
get raw objects. This preserves all properties and methods. Raw objects are
useful for further processing in scripts.

receive6.ps1
  

$job = Start-Job -ScriptBlock { Get-Process -Name "notepad" }
$results = Receive-Job -Job $job -AutoFormat:$false
$results | Get-Member

This gets Notepad processes as raw objects. The Get-Member
cmdlet shows all available properties and methods. The output is not
formatted for display.

## Receive job error output

Jobs can produce error output separate from standard output. Use the
-Error parameter to receive error streams. This helps diagnose problems
in background jobs. Error output is not received by default.

receive7.ps1
  

$job = Start-Job -ScriptBlock { Get-Item "nonexistentfile.txt" -ErrorAction SilentlyContinue }
Receive-Job -Job $job -Error

This job attempts to access a nonexistent file. The -Error parameter
retrieves the error message. Without it, the error would be missed.

## Receive job from remote computer

Jobs can run on remote computers using Invoke-Command. Use
Receive-Job with the -Session parameter to get results. The
job must be created with Invoke-Command -AsJob.

receive8.ps1
  

$session = New-PSSession -ComputerName "Server01"
$job = Invoke-Command -Session $session -ScriptBlock { Get-Process } -AsJob
Receive-Job -Job $job

This creates a remote session and runs a job on Server01. The results are
received locally. Remote jobs work similarly to local jobs but execute on
another computer.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Receive-Job cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).