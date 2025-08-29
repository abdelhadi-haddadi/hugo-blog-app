+++
title = "VBScript Outlook.MailItem Object"
date = 2025-08-29T20:15:22.126+01:00
draft = false
description = "Learn about VBScript Outlook.MailItem object, including email creation, sending, and manipulation. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Outlook.MailItem Object

last modified April 9, 2025

The Outlook.MailItem object in VBScript represents an email message
in Microsoft Outlook. It provides properties and methods to create, modify, and
send email messages programmatically. This object is part of the Outlook Object
Model and requires Outlook to be installed.

MailItem allows automation of email-related tasks through scripting.
You can set recipients, subject, body, and attachments. This tutorial covers
MailItem with practical examples to demonstrate its capabilities.
Understanding this object enables powerful email automation solutions.

## MailItem Object Overview

The MailItem object is created through the Outlook Application
object. It contains properties like To, Subject, and
Body. Methods include Send and Display.
It supports HTML and plain text email formats.

Key properties control email appearance and delivery. Methods handle sending and
displaying messages. The object integrates with Outlook's security features.
Understanding these members is essential for email automation. This tutorial
explores common usage scenarios.

## Creating a Basic Email

This example demonstrates creating a simple email message. It shows how to set
basic properties like recipient, subject, and body. The email is displayed for
user review before sending.

basic_email.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set mail = outlookApp.CreateItem(0) ' 0 = olMailItem

mail.To = "recipient@example.com"
mail.Subject = "Test Email from VBScript"
mail.Body = "This is a test email created using VBScript."

mail.Display ' Show the email before sending
' mail.Send ' Uncomment to send immediately

Set mail = Nothing
Set outlookApp = Nothing

The script creates an Outlook application instance and a new mail item. It sets
the recipient, subject, and body text. The Display method shows
the email in Outlook. Remove the comment to send automatically.

## Sending Email with HTML Formatting

This example shows how to create an HTML-formatted email. The
HTMLBody property allows rich formatting. HTML emails support
images, links, and styled text for professional communication.

html_email.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set mail = outlookApp.CreateItem(0)

mail.To = "manager@example.com"
mail.Subject = "Monthly Report"
mail.HTMLBody = "&lt;h1&gt;Monthly Sales Report&lt;/h1&gt;" &amp; _
                "&lt;p&gt;Here is the &lt;b&gt;summary&lt;/b&gt;:&lt;/p&gt;" &amp; _
                "&lt;ul&gt;&lt;li&gt;Q1: $120,000&lt;/li&gt;" &amp; _
                "&lt;li&gt;Q2: $150,000&lt;/li&gt;&lt;/ul&gt;" &amp; _
                "&lt;p&gt;&lt;a href='http://example.com'&gt;Details&lt;/a&gt;&lt;/p&gt;"

mail.Send
Set mail = Nothing
Set outlookApp = Nothing

The script creates an HTML-formatted email with headings, bold text, and a list.
The HTMLBody property accepts standard HTML markup. This allows
creating visually appealing emails directly from VBScript. The email is sent
automatically.

## Adding Attachments to an Email

This example demonstrates adding file attachments to an email message. The
Attachments.Add method includes files with the email. Multiple
attachments can be added by calling the method repeatedly.

email_with_attachments.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set mail = outlookApp.CreateItem(0)

mail.To = "colleague@example.com"
mail.Subject = "Project Documents"
mail.Body = "Please find attached the project files."

' Add attachments
mail.Attachments.Add "C:\Projects\spec.docx"
mail.Attachments.Add "C:\Projects\timeline.xlsx"

mail.Send
Set mail = Nothing
Set outlookApp = Nothing

The script creates an email and adds two file attachments. The
Attachments.Add method takes the full file path as parameter.
Attachments can be any file type supported by Outlook. The email is sent
automatically with both files attached.

## Setting CC and BCC Recipients

This example shows how to add CC and BCC recipients to an email. The
CC and BCC properties work similarly to the
To property. Multiple recipients can be separated by semicolons.

email_with_cc_bcc.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set mail = outlookApp.CreateItem(0)

mail.To = "client@example.com"
mail.CC = "manager@example.com;team@example.com"
mail.BCC = "archive@example.com"
mail.Subject = "Project Update"
mail.Body = "Here's the latest project status."

mail.Display
Set mail = Nothing
Set outlookApp = Nothing

The script sets primary, CC, and BCC recipients. Multiple addresses are
separated by semicolons. BCC recipients are hidden from other recipients. The
email is displayed for review before sending. This approach ensures proper
recipient management.

## Creating and Saving a Draft Email

This example demonstrates creating an email and saving it to the Drafts folder
instead of sending. The Save method stores the message for later
editing. This is useful for templates or incomplete messages.

save_draft.vbs
  

Set outlookApp = CreateObject("Outlook.Application")
Set mail = outlookApp.CreateItem(0)

mail.To = "support@example.com"
mail.Subject = "Technical Assistance Request"
mail.Body = "Dear Support Team," &amp; vbCrLf &amp; vbCrLf &amp; _
            "I need help with the following issue:" &amp; vbCrLf &amp; _
            "1. Problem description" &amp; vbCrLf &amp; _
            "2. Steps to reproduce" &amp; vbCrLf &amp; vbCrLf &amp; _
            "Thank you," &amp; vbCrLf &amp; "John Doe"

mail.Save
Set mail = Nothing
Set outlookApp = Nothing

The script creates a detailed email template and saves it as a draft. The
Save method stores the message in Outlook's Drafts folder.
vbCrLf adds line breaks for proper formatting. Users can later
complete and send the draft message.

## Source

[Outlook MailItem Documentation](https://learn.microsoft.com/en-us/office/vba/api/outlook.mailitem)

In this article, we have explored the Outlook.MailItem object in
VBScript, covering its usage and practical applications. From basic emails to
HTML formatting and attachments, these examples demonstrate Outlook automation.
With this knowledge, you can enhance your workflow with automated email
processing.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).