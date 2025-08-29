+++
title = "VBScript SetAutoLogonPolicy Method"
date = 2025-08-29T20:15:37.756+01:00
draft = false
description = "Learn about VBScript SetAutoLogonPolicy method, including security policies, automatic logon configuration, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript SetAutoLogonPolicy Method

last modified April 9, 2025

The SetAutoLogonPolicy method in VBScript is part of the
WScript.Shell object. It configures automatic logon settings for
Windows systems. This method controls whether credentials are stored for
automatic logon. It's commonly used in system administration and deployment
scenarios.

SetAutoLogonPolicy helps manage security by controlling credential
storage. It accepts a single parameter specifying the policy level. This
tutorial covers SetAutoLogonPolicy with practical examples to
demonstrate its usage.

## SetAutoLogonPolicy Method Overview

The SetAutoLogonPolicy method takes one parameter: the policy
level. It modifies registry settings related to automatic logon. The method
affects how Windows handles stored credentials. It's available through the
WScript.Shell object in VBScript.

Key features include controlling credential storage and security levels. It
doesn't require administrative privileges for basic queries. Understanding this
method helps create secure deployment scripts. The policy affects the entire
system's automatic logon behavior.

## Disabling AutoLogon Completely

This example demonstrates how to completely disable automatic logon. It sets the
most restrictive policy level. This prevents any credentials from being stored
for automatic logon. It's the most secure configuration.

disable_autologon.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.SetAutoLogonPolicy 0
WScript.Echo "AutoLogon has been completely disabled"

Set WshShell = Nothing

The script creates a WScript.Shell object and calls
SetAutoLogonPolicy with parameter 0. This disables all automatic
logon functionality. No credentials will be stored in the registry. This is
recommended for secure environments.

## Allowing AutoLogon with Restrictions

This example shows how to allow automatic logon with some restrictions. It sets
a moderate policy level. Credentials can be stored but with additional security
checks. This balances convenience with security.

restricted_autologon.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.SetAutoLogonPolicy 1
WScript.Echo "AutoLogon enabled with restrictions"

Set WshShell = Nothing

The script sets the policy level to 1, which enables restricted automatic logon.
This allows credentials to be stored but with additional protections. It's
suitable for environments needing some automation. The exact restrictions depend
on Windows version.

## Enabling Full AutoLogon Functionality

This example demonstrates enabling full automatic logon functionality. It sets
the least restrictive policy level. This allows credentials to be stored without
additional protections. Use with caution in secure environments.

full_autologon.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.SetAutoLogonPolicy 2
WScript.Echo "Full AutoLogon functionality enabled"

Set WshShell = Nothing

The script sets the policy level to 2, enabling full automatic logon. Credentials
can be stored in the registry without restrictions. This is useful for test
environments or kiosk systems. It's not recommended for production networks.

## Checking Current AutoLogon Policy

While SetAutoLogonPolicy sets the policy, this example shows how to
check the current setting. It reads the registry value directly. This helps
verify policy changes or audit system settings.

check_policy.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")
policy = WshShell.RegRead("HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\AutoLogonPolicy")

Select Case policy
    Case 0: WScript.Echo "AutoLogon disabled"
    Case 1: WScript.Echo "Restricted AutoLogon"
    Case 2: WScript.Echo "Full AutoLogon enabled"
    Case Else: WScript.Echo "Unknown policy value: " &amp; policy
End Select

Set WshShell = Nothing

The script reads the AutoLogonPolicy registry value directly. It then displays
the current policy level in human-readable form. This is useful for diagnostic
scripts or system audits. The registry path may vary by Windows version.

## Configuring AutoLogon for Specific User

This comprehensive example shows how to configure automatic logon for a specific
user. It combines policy setting with credential configuration. The script sets
both the policy and required registry values.

configure_user_autologon.vbs
  

Set WshShell = WScript.CreateObject("WScript.Shell")

' Set policy to allow AutoLogon
WshShell.SetAutoLogonPolicy 2

' Configure AutoLogon credentials
WshShell.RegWrite "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\DefaultUserName", "TestUser", "REG_SZ"
WshShell.RegWrite "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\DefaultPassword", "P@ssw0rd", "REG_SZ"
WshShell.RegWrite "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon\AutoAdminLogon", "1", "REG_SZ"

WScript.Echo "AutoLogon configured for user TestUser"

Set WshShell = Nothing

The script first sets the policy to allow automatic logon. It then writes the
required registry values for username and password. Finally, it enables
AutoAdminLogon. Note that storing passwords in scripts is a security risk.

## Source

[WScript.Shell Documentation](https://learn.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/aew9yb99(v=vs.84))

In this article, we have explored the SetAutoLogonPolicy method in
VBScript, covering its usage and practical applications. From disabling automatic
logon to full configuration, these examples demonstrate system administration
techniques. With this knowledge, you can better manage automatic logon in your
Windows environment.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).