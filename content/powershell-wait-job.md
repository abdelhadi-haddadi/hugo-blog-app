+++
title = "PowerShell Wait-Job"
date = 2025-08-29T20:07:21.192+01:00
draft = false
description = "PowerShell Wait-Job tutorial shows how to use PowerShell to wait for background jobs to complete."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Wait-Job

last modified February 15, 2025

In this article, we will cover the Wait-Job cmdlet in
PowerShell. This cmdlet suspends execution until background jobs complete.
It is essential for job management and synchronization.

## Job basics

A PowerShell job represents a background task that runs independently.
Jobs allow parallel execution of commands without blocking the console.
Each job has a state (Running, Completed, Failed) and output data.
The Wait-Job cmdlet pauses execution until specified jobs finish.

## Basic Wait-Job usage

The simplest way to use Wait-Job is with a job object.
This suspends the script until the job completes. The cmdlet returns
the job object when finished. No parameters are required for basic usage.

waitjob1.ps1
  

$job = Start-Job -ScriptBlock { Start-Sleep -Seconds 5 }
Wait-Job $job

This script starts a background job that sleeps for 5 seconds.
Wait-Job pauses execution until the job completes.
The console remains responsive during the wait period.

## Wait for multiple jobs

Wait-Job can accept multiple job objects as input.
It waits until all specified jobs complete. The jobs can be passed
as an array or through the pipeline. This is useful for parallel tasks.

waitjob2.ps1
  

$job1 = Start-Job -ScriptBlock { Start-Sleep -Seconds 3 }
$job2 = Start-Job -ScriptBlock { Start-Sleep -Seconds 5 }
Wait-Job $job1, $job2

This example starts two jobs with different sleep durations.
Wait-Job waits for both to finish before continuing.
The total wait time is determined by the longest-running job.

## Timeout parameter

The -Timeout parameter limits how long to wait for jobs.
If jobs don't complete within the timeout, execution continues.
The value is specified in seconds. This prevents indefinite blocking.

waitjob3.ps1
  

$job = Start-Job -ScriptBlock { Start-Sleep -Seconds 10 }
Wait-Job $job -Timeout 5

This script starts a 10-second job but only waits 5 seconds.
The job continues running in the background after the timeout.
The cmdlet returns control to the script after 5 seconds.

## Wait for any job to complete

The -Any parameter makes Wait-Job return
when any specified job completes. This is useful for scenarios where
you need the first available result. Other jobs continue running.

waitjob4.ps1
  

$job1 = Start-Job -ScriptBlock { Start-Sleep -Seconds 3 }
$job2 = Start-Job -ScriptBlock { Start-Sleep -Seconds 5 }
Wait-Job $job1, $job2 -Any

This example waits for either job to finish. The cmdlet returns
after 3 seconds when the first job completes. The second job
continues running in the background.

## Pipeline input

Wait-Job accepts job objects through the pipeline.
This allows chaining with other job-related cmdlets. The syntax
is cleaner when working with multiple jobs. Pipeline input is
processed the same as parameter input.

waitjob5.ps1
  

Get-Job | Wait-Job

This command waits for all current jobs to complete.
Get-Job retrieves all job objects and pipes them
to Wait-Job. This is convenient for batch processing.

## Retrieve job results after waiting

After waiting for jobs, you typically want to retrieve results.
Use Receive-Job to get output from completed jobs.
This should be done after Wait-Job confirms completion.

waitjob6.ps1
  

$job = Start-Job -ScriptBlock { Get-Process }
Wait-Job $job
Receive-Job $job

This script starts a job to get processes, waits for completion,
then retrieves the results. The output is the same as running
Get-Process directly but executed in the background.

## Error handling

Failed jobs can be detected after waiting. Check the job's
State property for "Failed". The Error
property contains details about the failure. This allows proper
error handling in scripts.

waitjob7.ps1
  

$job = Start-Job -ScriptBlock { Get-Item "nonexistent.txt" }
Wait-Job $job
if ($job.State -eq "Failed") {
    $job.Error
}

This example attempts to access a nonexistent file in a job.
After waiting, it checks for failure and displays the error.
The error message explains why the job failed.

## Wait for remote jobs

Wait-Job works with jobs running on remote computers.
The jobs must be started with Invoke-Command using
the -AsJob parameter. The waiting behavior is the
same as for local jobs.

waitjob8.ps1
  

$job = Invoke-Command -ComputerName Server01 -ScriptBlock { 
    Get-Process 
} -AsJob
Wait-Job $job
Receive-Job $job

This script runs Get-Process on a remote computer.
Wait-Job pauses until the remote job completes.
The results are then retrieved and displayed locally.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Wait-Job cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).