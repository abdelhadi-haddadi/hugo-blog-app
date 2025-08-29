+++
title = "C# send mail"
date = 2025-08-29T19:51:22.149+01:00
draft = false
description = "C# send email tutorial shows how to send simple emails in C# with System.Net.Mail and Mailkit."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# send mail

last modified July 5, 2023

 

C# send email tutorial shows how to send simple emails in C# with
System.Net.Mail and Mailkit.

## SMTP

The Simple Mail Transfer Protocol (SMTP) is an internet standard communication
protocol for electronic mail transmission. Mail servers and clients use SMTP to
send and receive mail messages. 

In C#, we can use System.Net.Mail and Mailkit to send emails. The
built-in System.Net.Mail can be used for simple solutions, while 
Mailkit is better suited for complex tasks.

**Note:** Gmail is not ideal for testing mails. We should use an
online service such as Mailtrap or Mailgun, or use an SMTP server provided by a
webhosting company.

In this article we are going to use [Maitrap](https://mailtrap.io/)
service to test our examples. Mailtrap offers a free plan for personal testing. 

## C# simple mail example

In the first example, we send a simple message.

Program.cs
  

using System.Net.Mail;
using System.Net;

var from = "from@example.com";
var to = "to@example.com";
var subject = "Test mail";
var body = "Test body";

var username = "username"; // get from Mailtrap
var password = "password"; // get from Mailtrap

var host = "smtp.mailtrap.io";
var port = 2525;

var client = new SmtpClient(host, port)
{
    Credentials = new NetworkCredential(username, password),
    EnableSsl = true
};

client.Send(from, to, subject, body);

Console.WriteLine("Email sent");

An email is sent with SmtpClient.

var from = "from@example.com";
var to = "to@example.com";
var subject = "Test mail";
var body = "Test body";

These are the email details.

var username = "username"; // get from Mailtrap
var password = "password"; // get from Mailtrap

We use the username and password that we get from the Mailtrap service.

var host = "smtp.mailtrap.io";
var port = 2525;

This is the SMTP host and port.

var client = new SmtpClient(host, port)
{
    Credentials = new NetworkCredential(username, password),
    EnableSsl = true
};

An SmtpClient is created through which we send the email.

client.Send(from, to, subject, body);

The Send method sends the specified email message to an SMTP server
for delivery. The message sender, recipients, subject, and message body are
string values.

## C# email JSON config

In the next example, we show how to read the email details from a JSON config 
file.

$ dotnet add package Microsoft.Extensions.Configuration.Json

We add the Microsoft.Extensions.Configuration.Json package.

email.json
  

{
    "Smtp": {
      "Host": "smtp.mailtrap.io",
      "Port": 2525,
      "Username": "username",
      "Password": "password"
    }
  }

This is the JSON config file.

Program.cs
  

using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;

var from = "from@example.com";
var to = "to@example.com";
var subject = "Test mail";
var body = "Test body";

var builder = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("email.json");
var config = builder.Build();

var host = config["Smtp:Host"];
var port = Convert.ToInt32(config["Smtp:Port"]);
var username = config["Smtp:Username"];
var password = config["Smtp:Password"];

var client = new SmtpClient(host, port);
client.Credentials = new NetworkCredential(username, password);
client.EnableSsl = true;

client.Send(from, to, subject, body);

Console.WriteLine("Email sent");

In the example, the host, port, username, and passowrd are read from a JSON 
config file.

## C# HTML email

In the next example, we send an HTML email.

Program.cs
  

using System.Net.Mail;
using System.Net;

var from = new MailAddress("from@example.com");
var to = new MailAddress("to@example.com");
var subject = "HTML email";
var body = "&lt;p&gt;An old &lt;b&gt;falcon&lt;/b&gt; in the sky.&lt;/p&gt;";

var username = "username"; // get from Mailtrap
var password = "password"; // get from Mailtrap

var host = "smtp.mailtrap.io";
var port = 2525;

var client = new SmtpClient(host, port);
client.Credentials = new NetworkCredential(username, passowrd);
client.EnableSsl = true;

var mail = new MailMessage();
mail.Subject = subject;
mail.From = from;
mail.To.Add(to);
mail.Body = body;
mail.IsBodyHtml = true;

client.Send(mail);

Console.WriteLine("Email sent");

We use MailMessage to send HTML emails.

var mail = new MailMessage();
mail.Subject = subject;
mail.From = from;
mail.To.Add(to);
mail.Body = body;
mail.IsBodyHtml = true;

client.Send(mail);

Now the email details are set to MailMessage. The
IsBodyHtml indicates that the body is in HTML.

## C# email attachment

In the next example, we attach a text file to the email.

words.txt
  

sky
blud
rock
water
poem

We send this text file in the attachment.

Program.cs
  

using System.Net.Mail;
using System.Net;

var from = new MailAddress("from@example.com");
var to = new MailAddress("to@example.com");
var subject = "Email with attachment";
var body = "Email body";

var username = "username"; // get from Mailtrap
var password = "password"; // get from Mailtrap

var host = "smtp.mailtrap.io";
var port = 2525;

var client = new SmtpClient(host, port);
client.Credentials = new NetworkCredential(username, passowrd);
client.EnableSsl = true;

var mail = new MailMessage();
mail.Subject = subject;
mail.From = from;
mail.To.Add(to);
mail.Body = body;

var attachment = new Attachment("words.txt");
mail.Attachments.Add(attachment);

client.Send(mail);

Console.WriteLine("Email sent");

We use the Attachments property and the Attachment
class to send an attachment with the email.

## C# send simple mail with Mailkit

Now we use the Mailkit library to send a simple mail.

$ dotnet add package Mailkit

We add the Mailkit package to the project.

Program.cs
  

using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

var host = "smtp.mailtrap.io";
var port = 2525;

var username = "username"; // get from Mailtrap
var password = "password"; // get from Mailtrap

var message = new MimeMessage();

message.From.Add(new MailboxAddress("John Doe", "john.doe@example.com"));
message.To.Add(new MailboxAddress("Jane Doe", "jane.doe@example.com"));
message.Subject = "Test subject";

var bodyBuilder = new BodyBuilder();
bodyBuilder.TextBody = "Test body";
message.Body = bodyBuilder.ToMessageBody();

var client = new SmtpClient();

client.Connect(host, port, SecureSocketOptions.Auto);
client.Authenticate(username, password);

client.Send(message);
client.Disconnect(true);

Console.WriteLine("Email sent");

We use MimeMessage, BodyBuilder, and
SmtpClient classes to generate email. The email is sent with 
Send.

## C# HTML email with Mailkit

In the next example, we send an HTML email.

Program.cs
  

using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

var host = "smtp.mailtrap.io";
var port = 2525;

var username = "username"; // get from Mailtrap
var password = "password"; // get from Mailtrap

var message = new MimeMessage();

message.From.Add(new MailboxAddress("John Doe", "john.doe@example.com"));
message.To.Add(new MailboxAddress("Jane Doe", "jane.doe@example.com"));
message.Subject = "Test subject";

var bodyBuilder = new BodyBuilder();
bodyBuilder.HtmlBody = "&lt;p&gt;An old &lt;b&gt;falcon&lt;/b&gt; in the sky.&lt;/p&gt;";
message.Body = bodyBuilder.ToMessageBody();

var client = new SmtpClient();

client.Connect(host, port, SecureSocketOptions.Auto);
client.Authenticate(username, password);

client.Send(message);
client.Disconnect(true);

Console.WriteLine("Email sent");

The HTML body is added with the HtmlBody attribute.

## Source

[System.Net Namespace](https://learn.microsoft.com/en-us/dotnet/api/system.net?view=net-8.0)

In this article we have sent simple emails in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).