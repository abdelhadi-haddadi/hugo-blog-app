+++
title = "PowerShell Foreach-Object -Parallel"
date = 2025-08-29T20:06:54.022+01:00
draft = false
description = "PowerShell Foreach-Object -Parallel tutorial shows how to use parallel processing in PowerShell."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Foreach-Object -Parallel

last modified February 15, 2025

This tutorial covers the Foreach-Object -Parallel cmdlet in PowerShell.  
It enables parallel processing of pipeline input for improved performance.  
Parallel execution can significantly speed up operations on large datasets.  
The cmdlet was introduced in PowerShell 7.0 as part of the PowerShell Core.

## Parallel processing basics

Parallel processing executes multiple operations simultaneously.  
In PowerShell, this is achieved with Foreach-Object -Parallel.  
It processes pipeline items concurrently rather than sequentially.  
Each iteration runs in a separate PowerShell runspace.  
This is ideal for CPU-bound or I/O-bound operations.

## Basic parallel processing

The simplest usage processes each input item in parallel.  
By default, it uses up to 5 parallel threads.  
The script block contains the operation to perform.  
The $_ variable represents the current pipeline item.

parallel1.ps1
  

1..10 | Foreach-Object -Parallel {
    "Processing item $_"
    Start-Sleep -Milliseconds 500
}

This example processes numbers 1 through 10 in parallel.  
Each iteration sleeps for 500 milliseconds.  
The output order may vary due to parallel execution.  
Notice how items complete faster than sequential processing.

## Controlling thread count

The -ThrottleLimit parameter controls maximum parallel threads.  
Higher values increase concurrency but consume more resources.  
Lower values reduce resource usage but decrease speed.  
The optimal value depends on your system and workload.

parallel2.ps1
  

1..20 | Foreach-Object -Parallel {
    "Processing item $_ (Thread $PID)"
    Start-Sleep -Seconds 1
} -ThrottleLimit 3

This example limits processing to 3 concurrent threads.  
The $PID shows each runspace's process ID.  
Notice how only 3 items process simultaneously.  
Adjust throttle limit based on your system capabilities.

## Using external variables

The -Using scope modifier accesses external variables.  
By default, parallel script blocks have isolated scope.  
This prevents race conditions but requires explicit sharing.  
Reference external variables with $using:variableName.

parallel3.ps1
  

$prefix = "Result"
1..5 | Foreach-Object -Parallel {
    "$($using:prefix): $_ squared is $($_ * $_)"
}

This example uses an external $prefix variable.  
Each iteration calculates the square of the number.  
The $using: prefix accesses the external variable.  
Output combines the prefix with calculation results.

## Error handling in parallel

Error handling works similarly to sequential processing.  
Try/Catch blocks can capture exceptions in parallel.  
Errors are aggregated and reported after completion.  
Use -ErrorAction for controlling error behavior.

parallel4.ps1
  

1..5 | Foreach-Object -Parallel {
    try {
        if ($_ % 2 -eq 0) {
            throw "Even number error"
        }
        "Processed odd $_"
    }
    catch {
        "Error processing $_: $_"
    }
}

This example throws errors for even numbers.  
Odd numbers process normally without errors.  
Each error is caught and handled individually.  
Output shows successful and failed items clearly.

## Returning objects from parallel

Parallel blocks can return objects to the pipeline.  
Output is collected and emitted when all complete.  
Returned objects maintain their original type.  
This enables further pipeline processing.

parallel5.ps1
  

$results = 1..10 | Foreach-Object -Parallel {
    [PSCustomObject]@{
        Number = $_
        Square = $_ * $_
        IsEven = $_ % 2 -eq 0
    }
}

$results | Format-Table

This example returns custom objects for each number.  
Each object contains the number, its square, and parity.  
Results are collected in $results variable.  
Format-Table displays the collected data neatly.

## File processing in parallel

Parallel processing excels at I/O-bound operations.  
File operations benefit greatly from parallel execution.  
This example processes multiple files concurrently.  
Measure-Command shows the performance improvement.

parallel6.ps1
  

$files = Get-ChildItem -Path "C:\Temp\*.log"
Measure-Command {
    $files | Foreach-Object -Parallel {
        $content = Get-Content $_.FullName
        "$($_.Name) has $($content.Count) lines"
    } -ThrottleLimit 10
}

This example processes all .log files in parallel.  
Each file's line count is calculated and reported.  
ThrottleLimit is increased for better I/O utilization.  
Measure-Command shows total execution time.

## API requests in parallel

Web requests are ideal for parallel processing.  
Each request runs independently of others.  
This significantly reduces total execution time.  
Use Invoke-RestMethod for API calls.

parallel7.ps1
  

$urls = @(
    "https://api.github.com/users/powershell"
    "https://api.github.com/users/microsoft"
    "https://api.github.com/users/github"
)

$urls | Foreach-Object -Parallel {
    try {
        $response = Invoke-RestMethod -Uri $_
        "User $($response.login) has $($response.public_repos) repos"
    }
    catch {
        "Failed to fetch $_"
    }
}

This example fetches GitHub user data in parallel.  
Each URL is processed concurrently.  
Results show username and repository count.  
Errors are caught and handled gracefully.

## Complex parallel workflow

Parallel processing can combine multiple operations.  
This example shows a complete data processing workflow.  
It demonstrates variable sharing and result aggregation.  
The -AsJob parameter runs processing in background.

parallel8.ps1
  

$data = 1..100
$results = @{}
$job = $data | Foreach-Object -Parallel {
    $square = $_ * $_
    $cube = $_ * $_ * $_
    $results = @{
        Number = $_
        Square = $square
        Cube = $cube
    }
    $using:results[$_] = $results
} -ThrottleLimit 10 -AsJob

$job | Wait-Job
$results.GetEnumerator() | Sort-Object Key | Select-Object -First 5

This example calculates squares and cubes in parallel.  
Results are stored in a shared hashtable.  
The -AsJob parameter enables background processing.  
Final output shows the first 5 calculated results.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

This tutorial covered the Foreach-Object -Parallel cmdlet in PowerShell.  
Parallel processing can dramatically improve script performance.  
Remember to balance thread count with system resources.  
Proper error handling ensures reliable parallel execution.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).