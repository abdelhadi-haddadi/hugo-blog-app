+++
title = "PowerShell Call Operator"
date = 2025-08-29T20:06:45.183+01:00
draft = false
description = "PowerShell Call Operator tutorial shows how to use the call operator (&) in PowerShell to execute commands and scripts."
image = ""
imageBig = ""
categories = ["powershell"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PowerShell Call Operator

last modified February 15, 2025

In this article, we will cover the Call Operator (&amp;) in PowerShell. This
operator is used to execute commands, scripts, or script blocks. It provides
flexibility in command execution and string evaluation.

## Call Operator basics

The call operator (&amp;) in PowerShell executes commands, scripts, or script
blocks. It can run commands stored in variables or strings. The operator
helps when dealing with dynamic command execution. It's particularly useful
for executing paths containing spaces.

## Basic Call Operator usage

The simplest use of the call operator is to execute a command or script.
The operator is followed by the command name or path. This is equivalent
to typing the command directly. The operator can help with command clarity.

call1.ps1
  

&amp; notepad

This command launches Notepad using the call operator. The operator executes
the notepad.exe application. This is functionally equivalent to typing
"notepad" directly.

## Executing scripts with spaces in path

The call operator is essential when executing scripts with spaces in their
path. Without it, PowerShell would treat each space-separated part as a
separate command. The operator ensures the entire path is treated as one.
Quotes around the path are required.

call2.ps1
  

&amp; "C:\My Scripts\test script.ps1"

This command executes a script located in a path containing spaces. The
call operator processes the quoted path correctly. Without it, PowerShell
would generate an error.

## Executing commands stored in variables

The call operator can execute commands stored in variables. This is useful
for dynamic command construction. The variable can contain the entire
command string. The operator evaluates and executes the content.

call3.ps1
  

$command = "Get-Process"
&amp; $command

This example stores "Get-Process" in a variable and executes it. The call
operator evaluates the variable content as a command. This technique enables
dynamic command execution based on runtime conditions.

## Combining with Invoke-Expression

The call operator can be combined with Invoke-Expression for complex
scenarios. Invoke-Expression evaluates strings as PowerShell code. Together,
they provide powerful dynamic execution capabilities. This should be used
cautiously due to security implications.

call4.ps1
  

$cmd = "Get-ChildItem"
&amp; { Invoke-Expression $cmd }

This example shows how to combine both operators. The script block executes
Invoke-Expression with the command string. This pattern is useful for
advanced scripting scenarios requiring dynamic code evaluation.

## Executing external programs with parameters

The call operator can execute external programs with parameters. Parameters
can be passed after the command. This works similarly to direct command
execution. The operator handles the parameter passing correctly.

call5.ps1
  

&amp; "C:\Program Files\Internet Explorer\iexplore.exe" "https://zetcode.com"

This command launches Internet Explorer with a specific URL. The call operator
ensures the path with spaces is handled properly. The URL parameter is passed
correctly to the application.

## Using with script blocks

The call operator can execute script blocks defined with curly braces. Script
blocks are reusable units of code. They can accept parameters and return
values. The operator executes the block in the current scope.

call6.ps1
  

$block = { param($name) "Hello, $name!" }
&amp; $block -name "PowerShell"

This example defines a script block that accepts a parameter. The call
operator executes the block with the provided parameter. The output will
be "Hello, PowerShell!". Script blocks are powerful for code reuse.

## Error handling with call operator

Error handling works normally with the call operator. Try/Catch blocks can
capture exceptions. This is important for robust script execution. The
operator doesn't change the error behavior of the called command.

call7.ps1
  

try {
    &amp; "nonexistent_command"
} catch {
    Write-Host "Command failed: $_"
}

This example demonstrates error handling with the call operator. The
nonexistent command triggers an exception. The catch block captures and
displays the error message. This pattern ensures graceful failure.

## Combining with splatting

The call operator can be combined with splatting for parameter passing.
Splatting uses a hashtable to supply parameters. This makes commands more
readable. The operator processes the splatted parameters correctly.

call8.ps1
  

$params = @{
    Path = "C:\Windows"
    Recurse = $true
    File = $true
}
&amp; { Get-ChildItem @params }

This example uses splatting to pass parameters to Get-ChildItem. The call
operator executes the script block containing the splatted command. This
technique improves code readability for complex commands.

## Source

[PowerShell documentation](https://docs.microsoft.com/en-us/powershell/)

In this article, we have covered the Call Operator in PowerShell.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PowerShell tutorials](/powershell/).