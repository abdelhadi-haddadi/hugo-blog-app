+++
title = "VBScript Outlook.Folder Object"
date = 2025-08-29T20:15:21.003+01:00
draft = false
description = "Learn about VBScript Outlook.Folder object, including folder operations, email management, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Outlook.Folder Object

last modified April 9, 2025

The Outlook.Folder object in VBScript represents a folder in the
Microsoft Outlook hierarchy. It's part of the Outlook Object Model for
automation. Folders can contain mail items, contacts, calendar entries, or other
folders. This object provides methods to access and manage folder contents.

Outlook.Folder enables programmatic interaction with Outlook data.
It supports operations like accessing items, creating subfolders, and managing
folder properties. This tutorial covers Outlook.Folder with practical
examples to demonstrate its usage in automation scripts.

## Outlook.Folder Object Overview

The Outlook.Folder object is obtained through the Outlook
Application object hierarchy. It represents any folder in Outlook's namespace,
including default and custom folders. Key properties include Name,
Items, and Folders collection.

Important methods include CopyHere, MoveTo, and
Delete. The object supports events for monitoring folder changes.
Understanding this object helps automate Outlook data management tasks
effectively.

## Accessing Default Inbox Folder

This example demonstrates accessing the default Inbox folder in Outlook. It shows
how to navigate the Outlook object hierarchy to reach the Inbox. The script then
displays basic information about the folder.

access_inbox.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set namespace = outlookApp.GetNamespace("MAPI")
Set inbox = namespace.GetDefaultFolder(6) ' 6 = olFolderInbox

WScript.Echo "Inbox Name: " &amp; inbox.Name
WScript.Echo "Item Count: " &amp; inbox.Items.Count

Set inbox = Nothing
Set namespace = Nothing
Set outlookApp = Nothing

The script creates an Outlook Application object and gets the MAPI namespace.
GetDefaultFolder(6) retrieves the Inbox folder. The folder's name
and item count are displayed. Always release objects when done to free resources.

## Listing Subfolders of a Folder

This example shows how to enumerate all subfolders of a given Outlook folder.
It demonstrates accessing the Folders collection property. Each
subfolder's name and item count are displayed.

list_subfolders.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set namespace = outlookApp.GetNamespace("MAPI")
Set inbox = namespace.GetDefaultFolder(6) ' Inbox

For Each subfolder In inbox.Folders
    WScript.Echo "Subfolder: " &amp; subfolder.Name
    WScript.Echo "  Items: " &amp; subfolder.Items.Count
Next

Set inbox = Nothing
Set namespace = Nothing
Set outlookApp = Nothing

The script accesses the Inbox folder's Folders collection. It loops
through each subfolder, displaying its name and item count. This technique works
for any folder with subfolders in the Outlook hierarchy.

## Creating a New Subfolder

This example demonstrates creating a new subfolder within an existing Outlook
folder. It shows the Folders.Add method in action. The script
creates a "Processed" subfolder in the Inbox.

create_subfolder.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set namespace = outlookApp.GetNamespace("MAPI")
Set inbox = namespace.GetDefaultFolder(6) ' Inbox

Set newFolder = inbox.Folders.Add("Processed")
WScript.Echo "Created folder: " &amp; newFolder.Name

Set newFolder = Nothing
Set inbox = Nothing
Set namespace = Nothing
Set outlookApp = Nothing

The script adds a new folder named "Processed" to the Inbox. The Add
method returns the newly created Folder object. Error handling
should be added for cases where the folder already exists.

## Moving Emails Between Folders

This example shows how to move email items between folders using the
MoveTo method. It demonstrates finding specific emails in the Inbox
and moving them to another folder. The script moves unread emails to a "To
Process" folder.

move_emails.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set namespace = outlookApp.GetNamespace("MAPI")
Set inbox = namespace.GetDefaultFolder(6) ' Inbox

' Get or create target folder
On Error Resume Next
Set targetFolder = inbox.Folders("To Process")
If targetFolder Is Nothing Then
    Set targetFolder = inbox.Folders.Add("To Process")
End If
On Error GoTo 0

' Move unread emails
For Each item In inbox.Items
    If item.UnRead Then
        item.Move targetFolder
    End If
Next

WScript.Echo "Moved unread emails to: " &amp; targetFolder.Name

Set targetFolder = Nothing
Set inbox = Nothing
Set namespace = Nothing
Set outlookApp = Nothing

The script first ensures the target folder exists. It then iterates through all
Inbox items, moving unread emails to the target folder. The Move
method is used instead of MoveTo when working with individual items.

## Processing Folder Items

This example demonstrates processing all items in a folder. It shows how to
access email properties and perform actions based on them. The script displays
sender and subject for each email in the Inbox.

process_items.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set namespace = outlookApp.GetNamespace("MAPI")
Set inbox = namespace.GetDefaultFolder(6) ' Inbox

For Each item In inbox.Items
    If item.Class = 43 Then ' olMail = 43
        WScript.Echo "From: " &amp; item.SenderName
        WScript.Echo "Subject: " &amp; item.Subject
        WScript.Echo "Received: " &amp; item.ReceivedTime
        WScript.Echo "---"
    End If
Next

Set inbox = Nothing
Set namespace = Nothing
Set outlookApp = Nothing

The script checks each item's class to ensure it's a mail item (class 43). For
each mail item, it displays the sender, subject, and received time. This pattern
can be extended to process items based on various criteria.

## Source

[Outlook.Folder Object Documentation](https://learn.microsoft.com/en-us/office/vba/api/outlook.folder)

In this article, we have explored the Outlook.Folder object in
VBScript, covering its usage and practical applications. From accessing folders
to processing items and managing folder structure, these examples demonstrate
powerful Outlook automation capabilities. With this knowledge, you can create
robust scripts for Outlook data management.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).