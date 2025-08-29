+++
title = "VBScript IsRestricted Method"
date = 2025-08-29T20:15:27.697+01:00
draft = false
description = "Learn about VBScript IsRestricted method, including security checks, registry access, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript IsRestricted Method

last modified April 9, 2025

The IsRestricted method in VBScript is part of the Windows Script
Host (WSH) security model. It checks if a specific command or operation is
restricted by the system's security settings. This method helps determine if
certain actions can be safely executed in the current security context.

IsRestricted returns a Boolean value indicating restriction status.
It's commonly used before executing potentially sensitive operations. This
tutorial covers IsRestricted with practical examples to demonstrate
its usage in security-conscious scripting.

## IsRestricted Method Overview

The IsRestricted method takes a single string parameter representing
the command name. It returns True if the command is restricted, False otherwise.
The method is available through the WScript object in VBScript.

Key features include checking against system security policies and registry
settings. It doesn't prevent execution but helps make informed decisions.
IsRestricted is particularly useful in enterprise environments.
Understanding this method helps create more secure scripts.

## Basic Command Restriction Check

This example demonstrates the simplest use of IsRestricted to check
a common command. It shows how the method returns True or False based on system
settings. The script checks if the "RegWrite" command is restricted.

basic_isrestricted.vbs
  

isRestricted = WScript.IsRestricted("RegWrite")

If isRestricted Then
    WScript.Echo "Registry writing is restricted on this system."
Else
    WScript.Echo "Registry writing is allowed on this system."
End If

The script calls IsRestricted with "RegWrite" as the parameter. The
result determines if registry write operations are permitted. This check helps
avoid errors in scripts that need to modify the registry.

## Checking Multiple Commands

This example shows how to check multiple commands in sequence. It demonstrates
using IsRestricted with different operation types. The script
checks restrictions for file operations and WSH methods.

multiple_checks.vbs
  

commands = Array("FileSystemObject", "WshNetwork", "Run", "Exec")

For Each cmd In commands
    If WScript.IsRestricted(cmd) Then
        WScript.Echo cmd &amp; " is restricted"
    Else
        WScript.Echo cmd &amp; " is allowed"
    End If
Next

The script creates an array of commands to check. It loops through each command,
calling IsRestricted for each one. This approach helps assess the
security environment before attempting sensitive operations.

## Conditional Script Execution

This example demonstrates using IsRestricted to control script flow.
The script checks restrictions before attempting registry operations. It shows how
to implement graceful fallback behavior when restricted.

conditional_execution.vbs
  

If WScript.IsRestricted("RegRead") Then
    WScript.Echo "Cannot read registry - using default value"
    value = "Default"
Else
    Set WshShell = CreateObject("WScript.Shell")
    value = WshShell.RegRead("HKCU\Software\MyApp\Setting")
End If

WScript.Echo "The value is: " &amp; value

The script first checks if registry reading is restricted. If restricted, it
uses a default value instead. This pattern makes scripts more robust in locked-
down environments while maintaining functionality where possible.

## Checking Custom Restrictions

This example shows how IsRestricted works with custom restrictions
defined in the registry. It demonstrates checking a hypothetical custom command
that might be restricted in some environments.

custom_restriction.vbs
  

customCommand = "MyCompany_CustomOperation"

If WScript.IsRestricted(customCommand) Then
    WScript.Echo "Custom operation is restricted by policy"
Else
    WScript.Echo "Proceeding with custom operation"
    ' Execute custom operation here
End If

The script checks for a custom restriction that might be defined in enterprise
environments. This pattern allows administrators to control specific script
behaviors through policy. The method works with any command name in the
restrictions list.

## Full Security Check Routine

This comprehensive example combines multiple IsRestricted checks
into a security validation routine. It demonstrates a practical implementation
for production scripts that need thorough security checking.

security_check.vbs
  

Function CheckSecurity()
    Dim restrictedOps
    restrictedOps = 0
    
    If WScript.IsRestricted("FileSystemObject") Then
        WScript.Echo "Warning: File system operations restricted"
        restrictedOps = restrictedOps + 1
    End If
    
    If WScript.IsRestricted("WshNetwork") Then
        WScript.Echo "Warning: Network operations restricted"
        restrictedOps = restrictedOps + 1
    End If
    
    If WScript.IsRestricted("RegWrite") Then
        WScript.Echo "Warning: Registry writes restricted"
        restrictedOps = restrictedOps + 1
    End If
    
    If restrictedOps &gt; 0 Then
        WScript.Echo "Script functionality may be limited"
        CheckSecurity = False
    Else
        CheckSecurity = True
    End If
End Function

If Not CheckSecurity() Then
    WScript.Quit(1)
End If

' Main script execution continues here
WScript.Echo "All required operations are permitted"

The script defines a function that checks multiple restrictions. It counts how
many operations are restricted and warns about each one. If any restrictions are
found, the script exits early. This pattern helps avoid runtime errors in locked-
down environments.

## Source

[WSH Security Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/d5wf4tte(v=vs.84))

In this article, we have explored the IsRestricted method in VBScript,
covering its usage and practical applications. From basic checks to comprehensive
security routines, these examples demonstrate security-aware scripting. With this
knowledge, you can create scripts that adapt to different security environments.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).