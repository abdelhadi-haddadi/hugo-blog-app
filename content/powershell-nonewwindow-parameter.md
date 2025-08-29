+++
title = "PowerShell -NoNewWindow Parameter"
date = 2025-08-29T20:07:08.516+01:00
draft = false
description = "PowerShell -NoNewWindow tutorial shows how to use PowerShell to manage processes without opening new windows."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell -NoNewWindow Parameter

last modified February 15, 2025

This tutorial covers the PowerShell -NoNewWindow parameter. 
It explains how to run processes in the current console window. The 
parameter is used with several process-related cmdlets. Examples show 
practical applications of this parameter.

## Understanding -NoNewWindow

The -NoNewWindow parameter prevents PowerShell from opening 
a new window when starting a process. By default, some cmdlets launch 
processes in new windows. This parameter keeps the process output in the 
current console. It's useful for scripting and output capture.

## Basic usage with Start-Process

The most common use of -NoNewWindow is with Start-Process. 
Without it, Start-Process opens a new window for the application. With 
it, the process runs in the current console window. This example starts 
Notepad in the current window.

nonewwindow1.ps1
  

Start-Process notepad -NoNewWindow

This command launches Notepad without creating a new window. The output 
appears in the current PowerShell console. Note that GUI apps like Notepad 
may still create their own windows.

## Running command-line tools

Command-line tools work particularly well with -NoNewWindow. 
Their output appears directly in the PowerShell console. This example runs 
the ipconfig command. The network configuration output appears immediately.

nonewwindow2.ps1
  

Start-Process ipconfig -NoNewWindow -Wait

The -Wait parameter ensures PowerShell waits for completion. 
Without it, the command would run asynchronously. The output appears in 
the current console window.

## Capturing output with -NoNewWindow

Combining -NoNewWindow with redirection captures output. 
This example runs ping and saves results to a file. The command runs in 
the current console but output goes to the file.

nonewwindow3.ps1
  

Start-Process ping -ArgumentList "google.com" -NoNewWindow -Wait -RedirectStandardOutput ping_results.txt

The ping command output is saved to ping_results.txt. Without 
-NoNewWindow, this would create a separate window. The 
-RedirectStandardOutput parameter handles the file output.

## Running PowerShell scripts

You can use -NoNewWindow to run PowerShell scripts. This 
keeps all output in the current console session. The example runs another 
script without spawning a new window. This maintains a cleaner workspace.

nonewwindow4.ps1
  

Start-Process powershell -ArgumentList "-File C:\scripts\test.ps1" -NoNewWindow -Wait

The script test.ps1 runs in the current console window. All its output 
appears in the same window as the parent script. The -Wait 
ensures sequential execution.

## Combining with -PassThru

The -PassThru parameter returns process objects. Combined 
with -NoNewWindow, it allows process management. This 
example starts a process and stores its object. The object can then be 
used to monitor or stop the process.

nonewwindow5.ps1
  

$process = Start-Process notepad -NoNewWindow -PassThru
$process | Get-Process

The process object is stored in $process. The second line displays 
information about it. This technique works well for process automation 
scripts.

## Running hidden processes

-NoNewWindow can be combined with -WindowStyle Hidden. 
This runs processes without any visible window. The example starts a 
background PowerShell command. The command executes without any UI.

nonewwindow6.ps1
  

Start-Process powershell -ArgumentList "-Command Get-Date" -NoNewWindow -WindowStyle Hidden

The Get-Date command runs completely hidden. No console window appears 
during execution. This is useful for background tasks and scheduled jobs.

## Using with Invoke-Command

-NoNewWindow also works with Invoke-Command for remote 
sessions. This keeps remote command output in the local console. The 
example runs a command on a remote computer. Results appear in the 
current window.

nonewwindow7.ps1
  

Invoke-Command -ComputerName Server01 -ScriptBlock { Get-Process } -NoNewWindow

The remote Get-Process output appears locally. Without 
-NoNewWindow, this might open separate windows. The 
parameter ensures a cleaner remote management experience.

## Error handling with -NoNewWindow

Error streams can be captured when using -NoNewWindow. This 
example demonstrates error redirection. The command attempts to access a 
non-existent file. Errors are redirected to a log file.

nonewwindow8.ps1
  

Start-Process powershell -ArgumentList "-Command Get-Content nofile.txt" -NoNewWindow -Wait -RedirectStandardError errors.log

Error messages are saved to errors.log. The console shows no error output. 
This technique is useful for logging and debugging scripts.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

This tutorial has covered the PowerShell -NoNewWindow parameter. 
The examples demonstrated various practical applications. This parameter is 
valuable for console-based process management.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).