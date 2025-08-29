+++
title = "PowerShell Start-Job"
date = 2025-08-29T20:07:18.794+01:00
draft = false
description = "PowerShell Start-Job tutorial shows how to use PowerShell to run background jobs and parallel tasks."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Start-Job

last modified February 15, 2025

In this article, we will cover the Start-Job cmdlet in
PowerShell. This cmdlet allows you to run commands in the background as
separate jobs. Background jobs are useful for long-running tasks.

## Job basics

A PowerShell job is a task that runs in the background independently of
the current session. Jobs allow parallel execution of commands without
blocking the console. Each job has a unique ID and state (Running, Completed,
Failed). The Start-Job cmdlet initiates background jobs.

## Basic Start-Job usage

The simplest way to use Start-Job is with a script block
containing the command to run. The job starts immediately and runs in
the background. You can continue working while the job executes.

job1.ps1
  

Start-Job -ScriptBlock { Get-Process }

This command starts a background job that retrieves process information.
The job runs independently of the current session. You can check its
status with Get-Job.

## Naming a job

You can assign a name to a job for easier identification. Use the -Name
parameter followed by your chosen name. Named jobs are easier to manage
when working with multiple background tasks. The name appears in job
listing outputs.

job2.ps1
  

Start-Job -Name "ProcessJob" -ScriptBlock { Get-Process }

This command starts a named background job. The job will appear as
"ProcessJob" in job listings. Named jobs can be referenced by name
instead of ID for convenience.

## Passing arguments to jobs

You can pass arguments to jobs using the -ArgumentList parameter. The
arguments are available in the script block as $args or named variables.
This allows dynamic job behavior based on input values. Arguments are
passed positionally.

job3.ps1
  

Start-Job -ScriptBlock { param($pname) Get-Process -Name $pname } -ArgumentList "chrome"

This command starts a job that gets processes by name. The "chrome"
argument is passed to the script block. The param block declares the
parameter for cleaner code. The job will retrieve Chrome processes.

## Running jobs with different credentials

Jobs can run with different credentials using the -Credential parameter.
This is useful when tasks require elevated permissions. You will be
prompted to enter credentials unless they're stored. The job runs in
the security context of the specified user.

job4.ps1
  

$cred = Get-Credential
Start-Job -ScriptBlock { Get-WmiObject Win32_ComputerSystem } -Credential $cred

This command starts a job that runs with specified credentials. The
Get-Credential cmdlet prompts for username and password. The job
executes the WMI query with those credentials. Useful for admin tasks.

## Running jobs on remote computers

Jobs can execute on remote computers using the -ComputerName parameter.
This allows distributed task execution. The remote computer must have
PowerShell remoting enabled. Results are returned to the local session.

job5.ps1
  

Start-Job -ScriptBlock { Get-Service } -ComputerName "Server01"

This command starts a job on Server01 that lists services. The job runs
remotely while you continue working locally. Requires WinRM configuration
on the remote machine. Useful for managing multiple servers.

## Running multiple jobs in parallel

You can start multiple jobs simultaneously for parallel processing. Each
job runs independently with its own resources. This is useful for tasks
that can be divided. PowerShell manages the job execution automatically.

job6.ps1
  

1..5 | ForEach-Object {
    Start-Job -Name "Job$_" -ScriptBlock { Start-Sleep -Seconds 5; "Job $_ completed" }
}

This command starts five jobs that each sleep for 5 seconds. The jobs
run in parallel, completing faster than sequential execution. The jobs
are named Job1 through Job5 for identification. Demonstrates parallel
processing power.

## Running jobs with initializations

Jobs can include initialization scripts using the -InitializationScript
parameter. This runs before the main script block. Useful for setting up
environment variables or modules. The initialization runs once per job.

job7.ps1
  

$init = { Import-Module ActiveDirectory }
Start-Job -InitializationScript $init -ScriptBlock { Get-ADUser -Filter * }

This command initializes the AD module before running the main script.
The job can then use AD cmdlets. Initialization ensures required
components are available. Useful for complex job setups.

## Running jobs with different runspaces

Advanced users can specify custom runspaces for jobs. The -Runspace
parameter accepts a runspace object. This allows fine-grained control
over job execution environment. Useful for specialized scenarios.

job8.ps1
  

$rs = [RunspaceFactory]::CreateRunspace()
$rs.Open()
Start-Job -Runspace $rs -ScriptBlock { [System.Environment]::OSVersion }

This command creates a custom runspace for the job. The job runs in this
isolated environment. Demonstrates advanced job configuration. The runspace
must be opened before use. Requires understanding of PowerShell hosting.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Start-Job cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).