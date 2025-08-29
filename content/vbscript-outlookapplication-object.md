+++
title = "VBScript Outlook.Application Object"
date = 2025-08-29T20:15:21.015+01:00
draft = false
description = "Learn about VBScript Outlook.Application object, including email operations, calendar management, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Outlook.Application Object

last modified April 9, 2025

The Outlook.Application object in VBScript provides access to 
Microsoft Outlook's functionality. It allows automation of email, calendar, 
contacts, and tasks. This object is part of the Outlook Object Model and 
requires Outlook to be installed.

Outlook.Application enables scripted interaction with Outlook 
features. It can create, send, and manage emails programmatically. This 
tutorial covers the object with practical examples to demonstrate its usage.

## Outlook.Application Object Overview

The Outlook.Application object is the root of the Outlook 
object hierarchy. It provides access to all other Outlook objects like 
MailItem and AppointmentItem. The object must be 
created using the CreateObject function in VBScript.

Key properties include NameSpace for accessing data stores and 
Explorers for open windows. Methods like CreateItem 
generate new Outlook items. Understanding this object enables powerful 
Outlook automation.

## Sending a Basic Email

This example demonstrates how to create and send a simple email using 
Outlook.Application. It shows the minimum required code to send a message. 
The script creates a new mail item, sets basic properties, and sends it.

basic_email.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set mailItem = outlookApp.CreateItem(0) ' 0 = olMailItem

mailItem.Subject = "Test Email from VBScript"
mailItem.To = "recipient@example.com"
mailItem.Body = "This is a test email sent via VBScript."
mailItem.Send

Set mailItem = Nothing
Set outlookApp = Nothing

The script creates an Outlook.Application instance and a new mail item. 
It sets the subject, recipient, and body text before sending. The 
CreateItem(0) method creates an email (olMailItem = 0). 
Always clean up objects with Set Nothing when done.

## Creating a Calendar Appointment

This example shows how to create a calendar appointment using 
Outlook.Application. It demonstrates setting start/end times, subject, 
and location. The appointment is saved to the default calendar folder.

calendar_appointment.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set appointment = outlookApp.CreateItem(1) ' 1 = olAppointmentItem

appointment.Subject = "Team Meeting"
appointment.Location = "Conference Room A"
appointment.Start = "2025-04-15 14:00"
appointment.End = "2025-04-15 15:00"
appointment.Body = "Quarterly team planning session"
appointment.Save

Set appointment = Nothing
Set outlookApp = Nothing

The script creates an appointment item (olAppointmentItem = 1) and sets 
its properties. The Start and End properties 
use a specific date-time format. Unlike email, appointments are saved 
with Save rather than sent immediately.

## Reading Inbox Messages

This example demonstrates accessing and reading messages from the Inbox. 
It shows how to navigate the Outlook folder hierarchy and read message 
properties. The script lists the subject and sender of recent messages.

read_inbox.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set namespace = outlookApp.GetNamespace("MAPI")
Set inbox = namespace.GetDefaultFolder(6) ' 6 = olFolderInbox

WScript.Echo "Inbox contains " &amp; inbox.Items.Count &amp; " items"

For Each item In inbox.Items
    If item.Class = 43 Then ' 43 = olMail
        WScript.Echo "Subject: " &amp; item.Subject
        WScript.Echo "From: " &amp; item.SenderName
        WScript.Echo "------"
    End If
Next

Set inbox = Nothing
Set namespace = Nothing
Set outlookApp = Nothing

The script accesses the MAPI namespace and default Inbox folder 
(olFolderInbox = 6). It iterates through items, checking for mail 
messages (olMail = 43). For each mail, it displays the subject and 
sender name. This approach can be extended to process messages.

## Sending Email with Attachment

This example shows how to send an email with a file attachment. It 
demonstrates the Attachments.Add method and additional 
email properties. The script creates a more complete email message.

email_with_attachment.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set mailItem = outlookApp.CreateItem(0)

mailItem.Subject = "Report Attachment"
mailItem.To = "manager@example.com"
mailItem.CC = "team@example.com"
mailItem.Body = "Please find attached the quarterly report."
mailItem.Attachments.Add "C:\Reports\Q2_2025.xlsx"
mailItem.Importance = 2 ' 2 = olImportanceHigh
mailItem.Send

Set mailItem = Nothing
Set outlookApp = Nothing

The script creates an email and adds an attachment from a specified 
file path. It sets CC recipients and importance level 
(olImportanceHigh = 2). Attachments can be files or Outlook items. 
Multiple attachments can be added with separate Add calls.

## Creating a Contact Item

This example demonstrates creating a new contact in the default Contacts 
folder. It shows setting various contact properties like name, email, 
and phone numbers. The contact is saved to the Contacts folder.

create_contact.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set contact = outlookApp.CreateItem(2) ' 2 = olContactItem

contact.FullName = "John Smith"
contact.CompanyName = "Acme Corporation"
contact.Email1Address = "john.smith@acme.com"
contact.BusinessTelephoneNumber = "+1 (555) 123-4567"
contact.JobTitle = "Sales Manager"
contact.Save

Set contact = Nothing
Set outlookApp = Nothing

The script creates a contact item (olContactItem = 2) and sets standard 
contact properties. The Save method stores the contact in 
the default Contacts folder. Additional properties can be set for more 
detailed contact information.

## Source

[Outlook Object Model Reference](https://learn.microsoft.com/en-us/office/vba/api/overview/outlook)

In this article, we have explored the Outlook.Application 
object in VBScript, covering its usage and practical applications. From 
sending emails to managing calendars and contacts, these examples 
demonstrate powerful Outlook automation. With this knowledge, you can 
enhance your scripts with robust Outlook integration.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).