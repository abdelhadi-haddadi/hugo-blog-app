+++
title = "Python smtplib"
date = 2025-08-29T20:10:24.242+01:00
draft = false
description = "Python smtplib tutorial shows how to send emails in Python with smtplib module."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python smtplib

last modified January 29, 2024

Python smtplib tutorial shows how to send emails in Python with smtplib module.
To send emails, we use a Python development server, Mailtrap online service and
a shared webhosting mail server.

## SMTP

Simple Mail Transfer Protocol (SMTP) is a communication protocol for
electronic mail transmission. Is is an Internet standard, which  was first
defined in 1982 by RFC 821, and updated in 2008 by RFC 5321 to Extended SMTP
additions. Mail servers and other message transfer agents use SMTP to send and
receive mail messages.

## The smtplib module

The smtplib is a Python library for sending emails using the Simple
Mail Transfer Protocol (SMTP). The smtplib is a built-in module; we
do not need to install it. It abstracts away all the complexities of SMTP.

## Mail servers

To actually send an email, we need to have access to a mail server. Python comes
with a simple development mail server. Mailslurper is an easy to use local
development server. Shared webhosting providers give us access to a mail server.
We can find the details in the account.

**Note:** Avoid using Gmail, because it is a highly secured server
and it is quite complex to make it work. In fact, most if not all examples on
the Internet demonstrating how to send an email with a Gmail server do not work.
Instead, use development servers or a shared webhosting server.

Finally, we can use a web service. There are development web services such as
MailTrap or MailSlurp, or production services such as Mailgun or Mandrill.

## Using Python built-in mail server

$ python -m smtpd -c DebuggingServer -n localhost:1025

We start the Python built-in mail server on port 1025.

built_in.py
  

#!/usr/bin/python

import smtplib
from email.mime.text import MIMEText

sender = 'admin@example.com'
receivers = ['info@example.com']

port = 1025
msg = MIMEText('This is test mail')

msg['Subject'] = 'Test mail'
msg['From'] = 'admin@example.com'
msg['To'] = 'info@example.com'

with smtplib.SMTP('localhost', port) as server:

    # server.login('username', 'password')
    server.sendmail(sender, receivers, msg.as_string())
    print("Successfully sent email")

We send a simple text message to the local development mail server.

sender = 'admin@example.com'
receivers = ['info@example.com']

We provide the sender and receiver(s). The example.com is
a domain name used specifically for illustrative examples in documents.

msg = MIMEText('This is test mail')

msg['Subject'] = 'Test mail'
msg['From'] = 'admin@example.com'
msg['To'] = 'info@example.com'

MimeText is used for sending text emails. We provide the
subject, from and to options.

with smtplib.SMTP('localhost', port) as server:
...

The SMTP class manages a connection to an SMTP server.

# server.login('username', 'password')

Since we use a local development server, we do not have to log in.

server.sendmail(sender, receivers, msg.as_string())

The email is sent with sendmail.

$ python -m smtpd -c DebuggingServer -n localhost:1025
---------- MESSAGE FOLLOWS ----------
b'Content-Type: text/plain; charset="us-ascii"'
b'MIME-Version: 1.0'
b'Content-Transfer-Encoding: 7bit'
b'Subject: Test mail'
b'From: admin@example.com'
b'To: info@example.com'
b'X-Peer: ::1'
b''
b'This is test mail'
------------ END MESSAGE ------------

We get this message after we send the email.

## Sending mail to Mailtrap

Mailtrap offers a free plan which allows us to send 500 mails per month.
Setting up Mailtrap is very easy. It literally takes seconds if we have Github
or Google accounts.

The neccessary credentials are provided in the settings page.
Also, there are short code examples which show how to use the
service, including smtplib, Django, or Flask.

mailtrap_simple.py
  

#!/usr/bin/python

import smtplib
from email.mime.text import MIMEText

sender = 'admin@example.com'
receiver = 'info@example.com'

msg = MIMEText('This is test mail')

msg['Subject'] = 'Test mail'
msg['From'] = 'admin@example.com'
msg['To'] = 'info@example.com'

user = 'username'
password = 'passoword'

with smtplib.SMTP("smtp.mailtrap.io", 2525) as server:

    server.login(user, password)
    server.sendmail(sender, receiver, msg.as_string())
    print("mail successfully sent")

The example sends a simple mail to the Mailtrap account.

server.login(user, password)

The username and password are given in the settings page; they are comprised
of random characters such as 24h328df3e32.

## Sending email with attachment

MIMEMultipart is used when we have attachments or want to provide
alternative versions of the same content (e.g. a plain text/HTML version).

words.txt
  

falcon
blue
sky
cloud

We have a simple text file.

mailtrap_attachment.py
  

#!/usr/bin/python

import smtplib
from os.path import basename
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication

sender = 'admin@example.com'
receiver = 'info@example.com'

msg = MIMEMultipart()

msg['Subject'] = 'Test mail with attachment'
msg['From'] = 'admin@example.com'
msg['To'] = 'info@example.com'

filename = 'words.txt'
with open(filename, 'r') as f:
    part = MIMEApplication(f.read(), Name=basename(filename))

part['Content-Disposition'] = 'attachment; filename="{}"'.format(basename(filename))
msg.attach(part)

user = 'username'
password = 'password'

with smtplib.SMTP("smtp.mailtrap.io", 2525) as server:

    server.login(user, password)
    server.sendmail(sender, receiver, msg.as_string())
    print("Successfully sent email")

The example sends an email with a text file attachment to Mailtrap.

filename = 'words.txt'
with open(filename, 'r') as f:
    part = MIMEApplication(f.read(), Name=basename(filename))

We read the contents of the text file.

part['Content-Disposition'] = 'attachment; filename="{}"'.format(basename(filename))
msg.attach(part)

The attachment is added with the attach method.

## Mailtrap with STARTTLS

Mailtrap does not support SSL on any SMTP port, it supports only STARTTLS.
If we tried to use SSL, we would get the following error message:

ssl.SSLError: [SSL: WRONG_VERSION_NUMBER] wrong version number (_ssl.c:1045)

The so called *oportunistic TLS* (Transport Layer Security) is an extension
in plain text communication protocols. It offers a way to upgrade a plain text
connection to an encrypted (TLS or SSL) connection instead of using a separate port
for encrypted communication. Several protocols use a command named STARTTLS for
this purpose. It is primarily intended as a countermeasure to passive monitoring.

mailtrap_secured.py
  

#!/usr/bin/python

import smtplib

from email.mime.text import MIMEText

port = 465

sender = 'admin@example.com'
receiver = 'info@example.com'

msg = MIMEText('Secured test mail')

msg['Subject'] = 'Test mail'
msg['From'] = 'admin@example.com'
msg['To'] = 'info@example.com'

user = 'username'
password = 'password'

with smtplib.SMTP("smtp.mailtrap.io", port) as server:

    server.starttls() # Secure the connection

    server.login(user, password)
    server.sendmail(sender, receiver, msg.as_string())
    print("mail successfully sent")

The example sends an email to a Mailtrap account with opportunistic TLS.

server.starttls() # Secure the connection

The starttls puts the connection to the SMTP server
into TLS mode.

## Sending mail via SSL

The following example sends an email via SSL. A webhosting SMTP server
(from websupport.sk) is utilized.

send_mail_ssl.py
  

#!/usr/bin/python

import smtplib, ssl
from email.mime.text import MIMEText

sender = 'admin@example.com'
receivers = ['info@example.com']

port = 465
user = 'admin@example.com'
password = 'password'

msg = MIMEText('This is test mail')

msg['Subject'] = 'Test mail'
msg['From'] = 'admin@example.com'
msg['To'] = 'info@example.com'

context = ssl.create_default_context()

with smtplib.SMTP_SSL("smtp.websupport.sk", port, context=context) as server:

    server.login(user, password)
    server.sendmail(sender, receivers, msg.as_string())
    print('mail successfully sent')

The SMTP_SSL connects over an SSL encrypted socket.

## Source

[Python smtplib — SMTP protocol client](https://docs.python.org/3/library/smtplib.html)

In this article we have used Python smtplib module to send emails.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).