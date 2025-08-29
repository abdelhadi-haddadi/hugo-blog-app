+++
title = "VBScript Application Property"
date = 2025-08-29T20:15:24.395+01:00
draft = false
description = "Learn about VBScript Application Property, including object references, global variables, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Application Property

last modified April 9, 2025

The Application property in VBScript provides access to the global
ASP Application object. It stores variables and objects available to all users
of an application. This property is essential for maintaining state across
multiple pages and users in web applications.

Application variables persist until the web server restarts or the
application ends. They are shared among all sessions and users. This tutorial
covers the Application property with practical examples to
demonstrate its usage in ASP applications.

## Application Property Overview

The Application property is automatically available in ASP pages.
It represents the Application object that stores application-wide information.
Variables stored in Application are accessible to all pages in the application.

Key features include locking mechanisms for thread safety and event handlers
for application start/end. The Application object supports methods like
Lock and Unlock for safe concurrent access.
Understanding this property helps create robust web applications.

## Storing and Retrieving Application Variables

This example demonstrates basic usage of the Application property to store and
retrieve variables. Application variables are set using simple assignment and
accessed through the Application object. They persist across page requests.

basic_application.vbs
  

' Store application variables
Application("SiteName") = "My Web Application"
Application("VisitorCount") = 0

' Retrieve and display values
Response.Write "Welcome to " &amp; Application("SiteName") &amp; "&lt;br&gt;"
Response.Write "Current visitors: " &amp; Application("VisitorCount")

' Increment visitor count
Application.Lock
Application("VisitorCount") = Application("VisitorCount") + 1
Application.Unlock

The script stores two application variables: SiteName and VisitorCount. These
values can be accessed from any page in the application. The VisitorCount is
incremented with proper locking to ensure thread safety during concurrent access.

## Using Application Objects

The Application property can store objects in addition to simple values. This
example shows how to store and retrieve a Dictionary object. Objects stored in
Application must support apartment-threading or be marked as free-threaded.

application_objects.vbs
  

' Create and store a Dictionary object
Set Application("UserSettings") = Server.CreateObject("Scripting.Dictionary")
Application("UserSettings").Add "Theme", "Dark"
Application("UserSettings").Add "Language", "English"

' Retrieve and use the object
Set userPrefs = Application("UserSettings")
Response.Write "Current theme: " &amp; userPrefs("Theme") &amp; "&lt;br&gt;"
Response.Write "Language: " &amp; userPrefs("Language")

' Clean up (when no longer needed)
Set Application("UserSettings") = Nothing

A Dictionary object is created and stored in the Application collection. The
object is then retrieved and its values are displayed. Proper cleanup is shown
when the object is no longer needed to free resources.

## Application Locking Mechanism

This example demonstrates the importance of locking when modifying Application
variables. The Lock and Unlock methods prevent concurrent access issues. They
ensure only one client can modify Application data at a time.

application_locking.vbs
  

' Initialize counter if not set
If IsEmpty(Application("PageHits")) Then
    Application.Lock
    Application("PageHits") = 0
    Application.Unlock
End If

' Safely increment counter
Application.Lock
Application("PageHits") = Application("PageHits") + 1
Application.Unlock

Response.Write "Total page hits: " &amp; Application("PageHits")

The script initializes a page hit counter if it doesn't exist. Each page view
increments the counter within a locked section. This prevents race conditions
when multiple users access the page simultaneously.

## Application Events

The Application property is related to Application events in global.asa. This
example shows how to handle Application start and end events. These events
allow initialization and cleanup of application-wide resources.

global.asa
  

&lt;SCRIPT LANGUAGE="VBScript" RUNAT="Server"&gt;
Sub Application_OnStart
    ' Initialize application variables
    Application("StartTime") = Now()
    Application("ActiveUsers") = 0
End Sub

Sub Application_OnEnd
    ' Cleanup code
    Set Application("StartTime") = Nothing
    Set Application("ActiveUsers") = Nothing
End Sub
&lt;/SCRIPT&gt;

The global.asa file contains event handlers for application start and end. When
the application starts, variables are initialized. When it ends, cleanup is
performed. These events occur once per application lifetime.

## Shared Configuration Settings

Application variables are ideal for storing configuration settings shared across
all pages. This example shows how to maintain application-wide settings that
can be accessed from any page. Changes affect all users immediately.

configuration_settings.vbs
  

' Admin page - update settings
If Request.Form("UpdateSettings") = "Yes" Then
    Application.Lock
    Application("MaintenanceMode") = Request.Form("MaintenanceMode")
    Application("MaxUsers") = CInt(Request.Form("MaxUsers"))
    Application.Unlock
End If

' Regular page - check settings
If Application("MaintenanceMode") = "Yes" Then
    Response.Write "System is in maintenance mode. Please try again later."
    Response.End
End If

The admin page updates application-wide settings that affect all users. Regular
pages check these settings to modify their behavior. This pattern is useful for
system-wide configuration management in web applications.

## Source

[ASP Application Object Documentation](https://learn.microsoft.com/en-us/previous-versions/iis/6.0-sdk/ms525581(v=vs.90))

In this article, we have explored the Application property in
VBScript, covering its usage and practical applications. From simple variable
storage to complex object management, these examples demonstrate robust
application state management. With this knowledge, you can enhance your ASP
applications with proper shared state handling.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).