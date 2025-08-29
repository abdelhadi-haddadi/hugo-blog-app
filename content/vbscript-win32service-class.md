+++
title = "VBScript Win32_Service Class"
date = 2025-08-29T20:15:45.513+01:00
draft = false
description = "Learn about VBScript Win32_Service class, including service management, querying, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Win32_Service Class

last modified April 9, 2025

The Win32_Service class in VBScript provides access to Windows
service management through WMI (Windows Management Instrumentation). It allows
querying, starting, stopping, and configuring Windows services. This class is
part of the WMI infrastructure and requires proper permissions to use.

Win32_Service offers comprehensive control over system services.
It can retrieve detailed information about installed services. This tutorial
covers Win32_Service with practical examples to demonstrate its
usage in system administration scripts.

## Win32_Service Class Overview

The Win32_Service class represents a Windows service on a local or
remote computer. It contains properties like Name, DisplayName, State, and
StartMode. Methods include StartService, StopService, and ChangeStartMode.

Key features include service status monitoring and configuration changes. It
requires administrator privileges for most operations. The class provides access
to both system and application services. Understanding this class helps automate
service management tasks.

## Listing All Services

This example demonstrates how to list all services on a system using
Win32_Service. It retrieves basic information about each service.
The script connects to WMI and queries the Win32_Service class.

list_services.vbs
  

strComputer = "."
Set objWMIService = GetObject("winmgmts:\\" &amp; strComputer &amp; "\root\cimv2")
Set colServices = objWMIService.ExecQuery("Select * from Win32_Service")

For Each objService in colServices
    WScript.Echo "Name: " &amp; objService.Name &amp; vbCrLf &amp; _
                 "Display Name: " &amp; objService.DisplayName &amp; vbCrLf &amp; _
                 "State: " &amp; objService.State &amp; vbCrLf &amp; _
                 "Start Mode: " &amp; objService.StartMode &amp; vbCrLf
Next

The script connects to the local WMI service and queries all Win32_Service
instances. It then loops through each service, displaying its Name, DisplayName,
State, and StartMode. This provides a comprehensive view of all services.

## Checking Service Status

This example shows how to check the status of a specific service. It queries the
Win32_Service class for a service by name. The script demonstrates service state
verification before taking action.

check_service.vbs
  

strServiceName = "Spooler"
strComputer = "."
Set objWMIService = GetObject("winmgmts:\\" &amp; strComputer &amp; "\root\cimv2")
Set colServices = objWMIService.ExecQuery("Select * from Win32_Service Where Name='" &amp; strServiceName &amp; "'")

For Each objService in colServices
    WScript.Echo "Service: " &amp; objService.DisplayName &amp; vbCrLf &amp; _
                 "State: " &amp; objService.State &amp; vbCrLf &amp; _
                 "Start Mode: " &amp; objService.StartMode
Next

The script checks the status of the Print Spooler service. It uses a WQL query
with a WHERE clause to filter for the specific service. The output shows the
current state and start mode of the service.

## Starting a Service

This example demonstrates how to start a stopped service using the
StartService method. It first checks the service state, then starts
it if stopped. The script includes error handling for robustness.

start_service.vbs
  

strServiceName = "Spooler"
strComputer = "."
Set objWMIService = GetObject("winmgmts:\\" &amp; strComputer &amp; "\root\cimv2")
Set colServices = objWMIService.ExecQuery("Select * from Win32_Service Where Name='" &amp; strServiceName &amp; "'")

For Each objService in colServices
    If objService.State = "Stopped" Then
        errReturn = objService.StartService()
        If errReturn = 0 Then
            WScript.Echo "Service started successfully"
        Else
            WScript.Echo "Failed to start service. Error: " &amp; errReturn
        End If
    Else
        WScript.Echo "Service is already running"
    End If
Next

The script attempts to start the Print Spooler service if it's stopped. It checks
the return code from StartService to verify success. Error handling
provides feedback if the operation fails. This pattern is useful for service
management scripts.

## Stopping a Service

This example shows how to stop a running service using the
StopService method. It verifies the service state before attempting
to stop it. The script includes status reporting for user feedback.

stop_service.vbs
  

strServiceName = "Spooler"
strComputer = "."
Set objWMIService = GetObject("winmgmts:\\" &amp; strComputer &amp; "\root\cimv2")
Set colServices = objWMIService.ExecQuery("Select * from Win32_Service Where Name='" &amp; strServiceName &amp; "'")

For Each objService in colServices
    If objService.State = "Running" Then
        errReturn = objService.StopService()
        If errReturn = 0 Then
            WScript.Echo "Service stopped successfully"
        Else
            WScript.Echo "Failed to stop service. Error: " &amp; errReturn
        End If
    Else
        WScript.Echo "Service is not running"
    End If
Next

The script stops the Print Spooler service if it's running. It checks the return
code from StopService to determine success. This approach ensures
clean service shutdown and provides feedback. Similar to starting, proper state
checking prevents errors.

## Changing Service Startup Type

This example demonstrates changing a service's startup type using the
ChangeStartMode method. It shows how to configure services for
automatic, manual, or disabled startup. The script includes validation.

change_startup.vbs
  

strServiceName = "Spooler"
strStartMode = "Automatic" ' Can be Automatic, Manual, or Disabled
strComputer = "."
Set objWMIService = GetObject("winmgmts:\\" &amp; strComputer &amp; "\root\cimv2")
Set colServices = objWMIService.ExecQuery("Select * from Win32_Service Where Name='" &amp; strServiceName &amp; "'")

For Each objService in colServices
    errReturn = objService.ChangeStartMode(strStartMode)
    If errReturn = 0 Then
        WScript.Echo "Start mode changed successfully to " &amp; strStartMode
    Else
        WScript.Echo "Failed to change start mode. Error: " &amp; errReturn
    End If
Next

The script changes the Print Spooler service's startup type to Automatic. The
ChangeStartMode method accepts the new startup type as a parameter.
Error handling ensures the operation's success is reported. This is useful for
service configuration scripts.

## Source

[Win32_Service Class Documentation](https://learn.microsoft.com/en-us/windows/win32/cimwin32prov/win32-service)

In this article, we have explored the Win32_Service class in
VBScript, covering its usage and practical applications. From querying service
status to managing service states and configurations, these examples demonstrate
powerful service management capabilities. With this knowledge, you can create
robust system administration scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).