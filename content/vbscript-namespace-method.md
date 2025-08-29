+++
title = "VBScript NameSpace Method"
date = 2025-08-29T20:15:28.816+01:00
draft = false
description = "Learn about VBScript NameSpace method, including WMI connections, system management, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript NameSpace Method

last modified April 9, 2025

The NameSpace method in VBScript is part of the Windows Management
Instrumentation (WMI) scripting interface. It provides access to WMI namespaces
which organize system management information. This method is essential for WMI
scripting and system administration tasks.

NameSpace allows scripts to connect to specific WMI namespaces to
query system information. It's commonly used for hardware monitoring, software
inventory, and system configuration. This tutorial covers NameSpace
with practical examples to demonstrate its usage.

## NameSpace Method Overview

The NameSpace method is called on a WMI SWbemLocator
object. It takes a namespace path as its parameter and returns an
SWbemServices object. This object provides access to WMI classes
and instances within the specified namespace.

Key features include connecting to local or remote systems and accessing various
WMI namespaces. The root\cimv2 namespace contains most system management
classes. Understanding this method is crucial for effective WMI scripting in
VBScript.

## Basic Namespace Connection

This example demonstrates the simplest use of NameSpace to connect
to the root\cimv2 namespace. It shows how to establish a basic WMI connection.
This is the foundation for most WMI scripting operations.

basic_namespace.vbs
  

Set objLocator = CreateObject("WbemScripting.SWbemLocator")
Set objService = objLocator.ConnectServer(".", "root\cimv2")

WScript.Echo "Connected to namespace: " &amp; objService.Path_.Namespace

Set objService = Nothing
Set objLocator = Nothing

The script creates a SWbemLocator object and calls
ConnectServer with the local machine (".") and namespace path. The
resulting SWbemServices object provides access to WMI classes. The
namespace path is displayed for verification.

## Querying System Information

This example shows how to use NameSpace to query basic system
information. It connects to root\cimv2 and retrieves operating system details.
This demonstrates practical use of the namespace connection.

system_info.vbs
  

Set objLocator = CreateObject("WbemScripting.SWbemLocator")
Set objService = objLocator.ConnectServer(".", "root\cimv2")
Set colItems = objService.ExecQuery("Select * From Win32_OperatingSystem")

For Each objItem in colItems
    WScript.Echo "OS Name: " &amp; objItem.Caption
    WScript.Echo "Version: " &amp; objItem.Version
Next

Set colItems = Nothing
Set objService = Nothing
Set objLocator = Nothing

After connecting to the namespace, the script queries the Win32_OperatingSystem
class. It then displays the OS name and version. This pattern can be used to
access various system information through WMI.

## Connecting to Different Namespaces

WMI contains multiple namespaces for different system components. This example
shows connecting to the root\default namespace. It demonstrates how to access
different management areas within WMI.

different_namespace.vbs
  

Set objLocator = CreateObject("WbemScripting.SWbemLocator")
Set objService = objLocator.ConnectServer(".", "root\default")

WScript.Echo "Connected to namespace: " &amp; objService.Path_.Namespace

Set objService = Nothing
Set objLocator = Nothing

The script connects to the root\default namespace instead of root\cimv2. This
namespace contains different WMI classes and providers. The same pattern can be
used to access other namespaces like root\security or root\directory\ldap.

## Remote System Connection

NameSpace can connect to remote systems for management tasks. This
example demonstrates connecting to a remote machine's WMI namespace. Proper
permissions are required for remote connections.

remote_connection.vbs
  

strComputer = "remotePC"
Set objLocator = CreateObject("WbemScripting.SWbemLocator")
Set objService = objLocator.ConnectServer(strComputer, "root\cimv2")

WScript.Echo "Connected to remote namespace: " &amp; objService.Path_.Namespace

Set objService = Nothing
Set objLocator = Nothing

The script connects to a remote computer specified by strComputer. The same
namespace structure exists on remote systems. This enables centralized
management of multiple machines through WMI scripting.

## Accessing Security Namespace

This example shows connecting to the security namespace to access security-related
WMI classes. The root\security namespace contains classes for security settings
and events. This demonstrates specialized namespace usage.

security_namespace.vbs
  

Set objLocator = CreateObject("WbemScripting.SWbemLocator")
Set objService = objLocator.ConnectServer(".", "root\security")

WScript.Echo "Connected to security namespace: " &amp; objService.Path_.Namespace

Set objService = Nothing
Set objLocator = Nothing

The script connects to the root\security namespace which contains security-
specific WMI providers. From here, you can query security events, settings, and
other security-related information. This namespace is particularly useful for
security auditing scripts.

## Source

[SWbemLocator Documentation](https://learn.microsoft.com/en-us/windows/win32/wmisdk/swbemlocator)

In this article, we have explored the NameSpace method in VBScript,
covering its usage and practical applications. From basic connections to remote
system management, these examples demonstrate WMI namespace access. With this
knowledge, you can enhance your system administration scripts with powerful WMI
capabilities.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).