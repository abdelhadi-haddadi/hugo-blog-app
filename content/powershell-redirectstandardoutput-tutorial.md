+++
title = "PowerShell -RedirectStandardOutput Tutorial"
date = 2025-08-29T20:07:11.994+01:00
draft = false
description = "PowerShell tutorial on using -RedirectStandardOutput parameter with process cmdlets."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell -RedirectStandardOutput Tutorial

last modified February 15, 2025

This tutorial covers the PowerShell -RedirectStandardOutput parameter in depth.
It explains how to capture and redirect standard output from processes.

## Output Stream Basics

PowerShell processes have three main output streams: Standard Output (stdout),
Standard Error (stderr), and Standard Input (stdin). The -RedirectStandardOutput
parameter allows capturing stdout to a file or variable. This is useful for
logging or processing command output.

## Basic -RedirectStandardOutput Usage

The simplest way to use -RedirectStandardOutput is with Start-Process. This
example runs ipconfig and saves output to a file. The file will contain the
network configuration details. The parameter accepts a file path as its value.

redirect1.ps1
  

Start-Process -FilePath "ipconfig" -RedirectStandardOutput "ipconfig.txt" -NoNewWindow -Wait

This command runs ipconfig and saves output to ipconfig.txt. The -NoNewWindow
keeps the process in the current window. -Wait ensures the command completes
before continuing.

## Redirecting Output to a Variable

You can capture process output in a variable instead of a file. This requires
using the Out-String cmdlet to convert the output. The variable can then be
processed further in your script. This approach is useful for dynamic output.

redirect2.ps1
  

$output = Start-Process -FilePath "systeminfo" -RedirectStandardOutput "temp.txt" -NoNewWindow -Wait -PassThru
$result = Get-Content "temp.txt" | Out-String
Remove-Item "temp.txt"
$result

This example captures systeminfo output to a temporary file. The content is then
read into a variable and the temp file deleted. The -PassThru returns process
information.

## Combining Standard Output and Error

To capture both stdout and stderr, use both -RedirectStandardOutput and
-RedirectStandardError. This ensures you get all process output in separate
files. It's useful for complete logging of command execution.

redirect3.ps1
  

Start-Process -FilePath "ping" -ArgumentList "nonexistenthost" `
    -RedirectStandardOutput "ping_out.txt" `
    -RedirectStandardError "ping_err.txt" `
    -NoNewWindow -Wait

This attempts to ping a non-existent host, capturing output and error streams.
The error stream will contain the "Ping request could not find host" message.

## Appending to Existing Files

By default, -RedirectStandardOutput overwrites existing files. To append instead,
use the &gt;&gt; operator in a script block. This is useful for building log files
over time. The example shows how to append multiple command outputs.

redirect4.ps1
  

$logFile = "system_log.txt"
Start-Process -FilePath "hostname" -RedirectStandardOutput $logFile -NoNewWindow -Wait
Start-Process -FilePath "whoami" -RedirectStandardOutput $logFile -NoNewWindow -Wait

This creates a system log with hostname and current user information. Each
command's output is appended to the same file. Note this actually overwrites -
see next example for true appending.

## True Appending with Script Block

For true appending behavior, use a script block with Add-Content. This example
shows proper technique for accumulating output. The output is first captured to
a variable then appended. This avoids potential file locking issues.

redirect5.ps1
  

$logFile = "true_append.log"
$tempFile = "temp_output.txt"

Start-Process -FilePath "netstat" -ArgumentList "-ano" `
    -RedirectStandardOutput $tempFile -NoNewWindow -Wait
Add-Content -Path $logFile -Value (Get-Content $tempFile)
Remove-Item $tempFile

This captures netstat output to a temp file, then appends it to the log. The
temp file is cleaned up afterward. This method ensures atomic append operations.

## Redirecting PowerShell Command Output

-RedirectStandardOutput works with external commands, but for PowerShell cmdlets,
use the redirection operator. This example shows both approaches. The &gt; operator
is simpler for native PowerShell output.

redirect6.ps1
  

# For external commands
Start-Process -FilePath "dir" -RedirectStandardOutput "dir_output.txt" -NoNewWindow -Wait

# For PowerShell cmdlets
Get-Process &gt; "processes.txt"

The first command attempts to run dir (would fail on Unix-like systems). The
second captures Get-Process output to a file. Use the appropriate method for
each command type.

## Handling Large Output

For commands producing large output, consider streaming the output. This example
shows how to process output line by line. It prevents memory issues with very
large outputs. The file is read and processed incrementally.

redirect7.ps1
  

$outputFile = "large_output.txt"
Start-Process -FilePath "powershell" -ArgumentList "Get-ChildItem C:\ -Recurse" `
    -RedirectStandardOutput $outputFile -NoNewWindow -Wait

Get-Content $outputFile | ForEach-Object {
    # Process each line here
    if ($_ -match "\.exe$") { $_ }
}

This recursively lists all files on C:\, saving to a file. Then processes the
file line by line, filtering for .exe files. The approach is memory-efficient.

## Timeout and Process Control

When redirecting output, you may need to handle long-running processes. This
example shows timeout handling. The script kills the process if it runs too
long. This prevents indefinite hangs.

redirect8.ps1
  

$process = Start-Process -FilePath "ping" -ArgumentList "google.com -t" `
    -RedirectStandardOutput "ping_continuous.txt" -NoNewWindow -PassThru

try {
    $process | Wait-Process -Timeout 5 -ErrorAction Stop
}
catch {
    $process | Stop-Process -Force
    Write-Output "Process timed out and was terminated"
}

This starts a continuous ping to google.com. If it runs longer than 5 seconds,
it's terminated. The output up to timeout is saved. Useful for unreliable
commands.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the -RedirectStandardOutput parameter in depth.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).