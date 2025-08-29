+++
title = "PowerShell Invoke-Command"
date = 2025-08-29T20:07:05.227+01:00
draft = false
description = "PowerShell Invoke-Command tutorial shows how to use PowerShell to run commands on local and remote systems."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Invoke-Command

last modified February 15, 2025

In this article, we will cover the Invoke-Command cmdlet in
PowerShell. This cmdlet runs commands on local and remote computers.

## Invoke-Command basics

The Invoke-Command cmdlet runs commands on local or remote
computers. It establishes temporary connections for remote execution.
Results are returned to the local computer. This is essential for
administrative tasks across multiple systems.

## Basic Invoke-Command usage

The simplest way to use Invoke-Command is with a script block.
The script block contains commands to execute. This example runs locally.
The output shows the current date and time.

invoke1.ps1
  

Invoke-Command -ScriptBlock { Get-Date }

This command executes the Get-Date cmdlet in a script block. The result
is returned to the console. No remote computers are involved here.

## Running command on remote computer

To run commands on remote computers, use the -ComputerName parameter.
Specify one or more computer names. PowerShell Remoting must be enabled
on targets. This example gets services from a remote server.

invoke2.ps1
  

Invoke-Command -ComputerName "Server01" -ScriptBlock { Get-Service }

This command retrieves all services from Server01. The remote computer
must be accessible and properly configured. Results are returned locally.

## Running multiple commands

You can execute multiple commands in a single script block. Separate
commands with semicolons. This example gets system information and
processes. Both results are returned in the output.

invoke3.ps1
  

Invoke-Command -ScriptBlock {
    Get-CimInstance Win32_OperatingSystem;
    Get-Process | Select-Object -First 3
}

This command gets OS details and the first three processes. The output
contains both sets of information. Commands run in the order specified.

## Using local variables in remote commands

Local variables can be passed to remote commands using -ArgumentList.
The $args array accesses these values in the script block. This enables
dynamic command execution. The example passes a process name.

invoke4.ps1
  

$processName = "explorer"
Invoke-Command -ComputerName "Server01" -ScriptBlock {
    Get-Process -Name $args[0]
} -ArgumentList $processName

This command gets the explorer process on Server01. The $processName
variable is passed as an argument. $args[0] accesses it in the script.

## Running commands on multiple computers

Multiple computers can be specified in -ComputerName. Use commas to
separate computer names. The command runs on all specified systems.
Results include the originating computer name.

invoke5.ps1
  

Invoke-Command -ComputerName "Server01","Server02" -ScriptBlock {
    Get-CimInstance Win32_ComputerSystem
}

This command gets computer system information from two servers. Each
result shows which computer it came from. Output is combined.

## Running script files remotely

Existing script files can be executed remotely with -FilePath. The script
must be accessible from the local computer. This avoids typing complex
commands. The example runs a local script remotely.

invoke6.ps1
  

Invoke-Command -ComputerName "Server01" -FilePath "C:\scripts\check_disk.ps1"

This command runs the check_disk.ps1 script on Server01. The script must
exist at the specified local path. No script block is needed here.

## Persistent remote sessions

For multiple commands, create persistent sessions with New-PSSession.
Pass the session to Invoke-Command with -Session. This maintains one
connection. It's more efficient than creating new connections.

invoke7.ps1
  

$session = New-PSSession -ComputerName "Server01"
Invoke-Command -Session $session -ScriptBlock { Get-Service }
Invoke-Command -Session $session -ScriptBlock { Get-Process }
Remove-PSSession $session

This creates a persistent session to Server01. Two commands run using
the same connection. The session is removed when done.

## Running commands as different user

The -Credential parameter allows running commands as another user. This
requires appropriate permissions. A credential object stores the username
and password. The example shows remote execution as admin.

invoke8.ps1
  

$cred = Get-Credential
Invoke-Command -ComputerName "Server01" -ScriptBlock {
    whoami
} -Credential $cred

This prompts for credentials before execution. The whoami command shows
the effective username. The specified user must have remote access.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Invoke-Command cmdlet in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).