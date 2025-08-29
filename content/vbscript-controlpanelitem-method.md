+++
title = "VBScript ControlPanelItem Method"
date = 2025-08-29T20:15:25.482+01:00
draft = false
description = "Learn about VBScript ControlPanelItem method, including control panel applet access, system settings, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript ControlPanelItem Method

last modified April 9, 2025

The ControlPanelItem method in VBScript is part of the
WScript.Shell object. It launches Control Panel applets directly
from scripts. This method provides programmatic access to system configuration
tools. It's useful for automating system administration tasks.

ControlPanelItem accepts the canonical name of Control Panel items.
It opens the specified applet in the Windows Control Panel. This tutorial covers
ControlPanelItem with practical examples to demonstrate its usage.

## ControlPanelItem Method Overview

The ControlPanelItem method takes one parameter: the Control Panel
applet name. It doesn't return any value but launches the specified applet. The
method is available through the WScript.Shell object in VBScript.

Key features include direct access to system configuration tools. It works with
both classic and modern Control Panel items. The method requires proper
permissions to execute. Understanding this method helps create administration
scripts.

## Opening Display Settings

This example demonstrates opening the Display Settings control panel applet.
It shows the basic usage of ControlPanelItem. The applet name
must match the system's canonical name for the control panel item.

display_settings.vbs
  

Set shell = CreateObject("WScript.Shell")
shell.ControlPanelItem "desk.cpl"

Set shell = Nothing

The script creates a WScript.Shell object and calls
ControlPanelItem. The parameter "desk.cpl" opens Display Settings.
This is the canonical name for the display properties control panel applet.

## Accessing Mouse Properties

This example shows how to open the Mouse Properties control panel applet.
It demonstrates accessing hardware configuration settings. The mouse properties
dialog provides various configuration options.

mouse_properties.vbs
  

Set shell = CreateObject("WScript.Shell")
shell.ControlPanelItem "main.cpl"

Set shell = Nothing

The script uses "main.cpl" to open Mouse Properties. This canonical name works
across different Windows versions. The applet allows configuring pointer speed,
button configuration, and other mouse settings.

## Opening Network Connections

This example demonstrates accessing network configuration through Control Panel.
It shows how to open the Network Connections applet. This is useful for network
administration scripts.

network_connections.vbs
  

Set shell = CreateObject("WScript.Shell")
shell.ControlPanelItem "ncpa.cpl"

Set shell = Nothing

The script uses "ncpa.cpl" to open Network Connections. This applet displays all
network adapters and their status. Administrators can view and modify network
interface settings from here.

## Accessing Power Options

This example shows how to open the Power Options control panel applet.
It demonstrates accessing system power management settings. Power Options
control various power-saving features.

power_options.vbs
  

Set shell = CreateObject("WScript.Shell")
shell.ControlPanelItem "powercfg.cpl"

Set shell = Nothing

The script uses "powercfg.cpl" to open Power Options. This applet allows
configuring power plans and sleep settings. It's useful for managing laptop
power settings through scripts.

## Opening Date and Time Settings

This example demonstrates accessing the Date and Time control panel applet.
It shows how to open system time configuration. This is useful for scripts
that need to verify or modify time settings.

datetime_settings.vbs
  

Set shell = CreateObject("WScript.Shell")
shell.ControlPanelItem "timedate.cpl"

Set shell = Nothing

The script uses "timedate.cpl" to open Date and Time settings. This applet
allows configuring system clock, time zone, and internet time synchronization.
The method provides direct access to these settings.

## Source

[WScript.Shell Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/aew9yb99(v=vs.84))

In this article, we have explored the ControlPanelItem method in
VBScript, covering its usage and practical applications. From display settings
to network configuration, these examples demonstrate system administration
capabilities. With this knowledge, you can enhance your administration scripts
with direct Control Panel access.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).