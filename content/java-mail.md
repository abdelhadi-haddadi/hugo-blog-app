+++
title = "Java mail"
date = 2025-08-29T20:00:01.791+01:00
draft = false
description = "Java mail tutorial shows how to send and receive mails on the JVM."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java mail

last modified January 27, 2024

 

Java mail tutorial shows how to send and receive mails on the JVM. We use 
Java, Groovy and Clojure languages.

## SMTP

The Simple Mail Transfer Protocol (SMTP) is an internet standard communication
protocol for electronic mail transmission. Mail servers and clients use SMTP to
send and receive mail messages. 

## POP3

The Post Office Protocol (POP) is an application-layer Internet
standard protocol used by e-mail clients to retrieve e-mail from a mail
server. POP3 is the current version of the protocol.

Jakarta Mail is a Jakarta EE API used to send and receive email via SMTP, POP3
and IMAP. Simple Java mail library is a thin layer on top of Jakarta Mail which 
provides an easy API for sending emails via SMTP protocol.

**Note:** Gmail is not ideal for testing mails. We should use an
online service such as Mailtrap or Mailgun, or use an SMTP server provided by a
webhosting company.

In this article we are going to use [Maitrap](https://mailtrap.io/)
service to test our examples. Mailtrap offers a free plan for personal testing. 

## Java send mail with Simple Java mail

In the first example, we send an email in Java using Simple Java Mail library.

com/zetcode/SimpleJavaMail.java
  

package com.zetcode;

import org.simplejavamail.api.email.Email;
import org.simplejavamail.email.EmailBuilder;
import org.simplejavamail.mailer.MailerBuilder;

public class SimpleJavaMail {

    public static void main(String[] args) {

        var username = "username";
        var password = "password";
        var host = "smtp.mailtrap.io";
        var port = 2525;

        Email email = EmailBuilder.startingBlank()
                .from("John Doe", "john.doe@example.com")
                .to("Jane Doe", "jane.doe@example.com")
                .to("Peter Doe", "peter.doe@example.com")
                .withSubject("Test subject")
                .withPlainText("Test body")
                .buildEmail();

        MailerBuilder
                .withSMTPServer(host, port, username, password)
                .buildMailer()
                .sendMail(email);

        System.out.println("Email sent successfully");
    }
}

The email is built with EmailBuilder and sent with
MailerBuilder.

## Send text mail with Jakarta Mail

In the next example, we send a simple text mail using Groovy and 
Jakarta Mail. 

text_mail.gvy
  

@Grab(group='com.sun.mail', module='jakarta.mail', version='2.0.1')
@Grab(group='com.sun.activation', module='jakarta.activation', version='2.0.1')

import java.util.Properties

import jakarta.mail.Authenticator
import jakarta.mail.Message
import jakarta.mail.MessagingException
import jakarta.mail.PasswordAuthentication
import jakarta.mail.Session
import jakarta.mail.Transport
import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage

def to = "test@example.com"
def from = "from@example.com"
def username = "username" 
def password = "password" 

def host = "smtp.mailtrap.io"
def port = 2525

def props = new Properties()

props.put("mail.smtp.auth", "true")
props.put("mail.smtp.starttls.enable", "true") // optional in Mailtrap
props.put("mail.smtp.host", host)
props.put("mail.smtp.port", port)

def auth = new Authenticator() {
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, password)
    }
}

def session = Session.getInstance(props, auth)
def message = new MimeMessage(session)

message.setFrom(new InternetAddress(from))
message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to))
message.setSubject("Groovy email")
message.setText("Test message")

Transport.send(message)

println("Email sent successfully")

The example send a simple text mail to Mailtrap.

@Grab(group='com.sun.mail', module='jakarta.mail', version='2.0.1')
@Grab(group='com.sun.activation', module='jakarta.activation', version='2.0.1')

We need jakarta.mail and jakarta.activation libraries.

def props = new Properties()

props.put("mail.smtp.auth", "true")
props.put("mail.smtp.starttls.enable", "true") // optional in Mailtrap
props.put("mail.smtp.host", host)
props.put("mail.smtp.port", port)

We set up email properties.

def auth = new Authenticator() {
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, password)
    }
}

We create Authenticator for password authentication.

def session = Session.getInstance(props, auth)

The Session class represents a mail session.

def message = new MimeMessage(session)

This MimeMessage represents a MIME style email message.

message.setFrom(new InternetAddress(from))
message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to))
message.setSubject("Groovy email")
message.setText("Test message")

We set the sender, recipients, subject and body.

Transport.send(message)

The email is finally sent with Transport.send.

## Send HTML email

The following example sends an email with HTML body.

html_email.gvy
  

@Grab(group='com.sun.mail', module='jakarta.mail', version='2.0.1')
@Grab(group='com.sun.activation', module='jakarta.activation', version='2.0.1')

import java.util.Properties

import jakarta.mail.Authenticator
import jakarta.mail.Message
import jakarta.mail.MessagingException
import jakarta.mail.PasswordAuthentication
import jakarta.mail.Session
import jakarta.mail.Transport
import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage

def to = "test@example.com"
def from = "from@example.com"
def username = "username"
def password = "password"
def host = "smtp.mailtrap.io"
def port = 2525
def props = new Properties()

props.put("mail.smtp.auth", "true")
props.put("mail.smtp.host", host)
props.put("mail.smtp.port", port)

def auth = new Authenticator() {
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, password)
    }
}

def session = Session.getInstance(props, auth)
def message = new MimeMessage(session)

message.setFrom(new InternetAddress(from))
message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to))
message.setSubject("Groovy email")

def msg = "&lt;p&gt;an &lt;em&gt;old falcon&lt;/em&gt; in the sky&lt;/p&gt;"
message.setContent(msg, "text/html; charset=utf-8");

Transport.send(message)

println("Email sent successfully")

The code example sends HTML body content. The content is set with
setContent method.

## Send mail with attachment

Modern email systems use the MIME standard; a message and all its attachments
are encapsulated in a single multipart message, with base64 encoding used to
convert binary into 7-bit ASCII text. 

words.txt
  

sky
blud
rock
water
poem

We send this text file in the attachment.

A multipart/mixed MIME message is composed of a mix of different data types.
Each body part is delineated by a boundary. The boundary is a text string used
to delineate one part of the message body from another. 

attachment.gvy
  

@Grab(group='com.sun.mail', module='jakarta.mail', version='2.0.1')
@Grab(group='com.sun.activation', module='jakarta.activation', version='2.0.1')

import java.util.Properties

import jakarta.mail.Authenticator
import jakarta.mail.Message
import jakarta.mail.MessagingException
import jakarta.mail.PasswordAuthentication
import jakarta.mail.Session
import jakarta.mail.Transport
import jakarta.mail.internet.InternetAddress
import jakarta.mail.internet.MimeMessage
import jakarta.mail.internet.MimeBodyPart
import jakarta.mail.internet.MimeMultipart

import jakarta.activation.DataHandler
import jakarta.activation.FileDataSource

def to = "test@example.com"
def from = "from@example.com"
def username = "9c1d45eaf7af5b"
def password = "ad62926fa75d0f"

def host = "smtp.mailtrap.io"
def port = 2525

def props = new Properties()

props.put("mail.smtp.auth", "true")
props.put("mail.smtp.host", host)
props.put("mail.smtp.port", port)

def auth = new Authenticator() {
    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(username, password)
    }
}

def session = Session.getInstance(props, auth)
def message = new MimeMessage(session)

message.setFrom(new InternetAddress(from))
message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to))

message.setSubject("Email with attachment")

def msgPart = new MimeBodyPart()
msgPart.setText('words.txt file')

def fds = new FileDataSource('words.txt')

def attachPart = new MimeBodyPart()
attachPart.setDataHandler(new DataHandler(fds))
attachPart.setFileName(fds.getName())

def multipart = new MimeMultipart()
multipart.addBodyPart(msgPart)
multipart.addBodyPart(attachPart)

message.setContent(multipart)

Transport.send(message)

println("Email sent successfully")

The example sends an email with a simple text file as attachment.

def msgPart = new MimeBodyPart()
msgPart.setText('words.txt file')

One MimeBodyPart is the body content of the email.

def fds = new FileDataSource('words.txt')

def attachPart = new MimeBodyPart()
attachPart.setDataHandler(new DataHandler(fds))
attachPart.setFileName(fds.getName())

Another MimeBodyPart is the text file.

def multipart = new MimeMultipart()
multipart.addBodyPart(msgPart)
multipart.addBodyPart(attachPart)

The body parts are added to the MimeMultipart.

message.setContent(multipart)

The MimeMultipart is set as the content to the email message.

## Retrieve emails via POP3

The example retrieves all emails via POP3.

pop3.gvy
  

@Grab(group='com.sun.mail', module='jakarta.mail', version='2.0.1')
@Grab(group='com.sun.activation', module='jakarta.activation', version='2.0.1')

import java.util.Properties

import jakarta.mail.Folder
import jakarta.mail.Session

def username = "username"
def password = "password"

def host = "pop3.mailtrap.io"
def port = 9950

def props = new Properties()
props.put("mail.pop3.host", host)
props.put("mail.pop3.port", port)

def session = Session.getDefaultInstance(props)
session.setDebug(true)
def store = session.getStore("pop3")
store.connect(host, username, password)

def inbox = store.getFolder("Inbox")
inbox.open(Folder.READ_ONLY)

def messages = inbox.getMessages()

for (message in messages) {

    println message.getFrom()
    println message.getSubject()
    println message.getContentStream().getText("UTF-8") 
    println "-------------------------"
}

inbox.close(true)
store.close()

We read all the messages from the inbox.

def props = new Properties()
props.put("mail.pop3.host", host)
props.put("mail.pop3.port", port)

We set up the properties.

def session = Session.getDefaultInstance(props)
session.setDebug(true)

We create the mail session. We can set a debug mode. This will give us plenty of 
useful information.

def store = session.getStore("pop3")

We get the message store with getStore; we provide the POP3 access 
protocol.

inbox.open(Folder.READ_ONLY)

The store is opened in read-only mode.

def messages = inbox.getMessages()

We get all the messages with getMessages.

for (message in messages) {

    println message.getFrom()
    println message.getSubject()
    println message.getContentStream().getText("UTF-8") 
    println "-------------------------"
}

We retrieve the sender address, subject and body of the messages.

## Clojure examples

Next we present Clojure code examples.

:dependencies [[org.clojure/clojure "1.10.3"]
[com.sun.activation/jakarta.activation "2.0.1"]
[com.sun.mail/jakarta.mail "2.0.1"]]

These are the dependencies.

first/core.clj
  

(ns first.core
  (:import java.util.Properties)
  (:import (jakarta.mail.internet MimeMessage InternetAddress))
  (:import (jakarta.mail Transport
                         Session
                         Authenticator
                         Message$RecipientType
                         PasswordAuthentication)))

(def user "username")
(def password "password")
(def port 2525)
(def host "smtp.mailtrap.io")

(def props (doto (Properties.)
             (.putAll {"mail.smtp.user" user "mail.smtp.host" host
                       "mail.smtp.port" port "mail.smtp.auth", "true"})))

(def auth (proxy [Authenticator] []
            (getPasswordAuthentication []
              (PasswordAuthentication. user password))))

(def session (Session/getInstance props auth))
(def msg (MimeMessage. session))

(defn -main
  []

  (.setFrom msg (InternetAddress. "john.doe@example.com"))
  (.addRecipient msg Message$RecipientType/TO (InternetAddress. "roger.roe@example.com"))

  (.setSubject msg "Mail subject")
  (.setText msg "Mail body")

  (Transport/send msg))

The example sends a simple text mail. 

html/core.clj
  

(ns html.core
  (:import java.util.Properties)
  (:import (jakarta.mail.internet MimeMessage InternetAddress))
  (:import (jakarta.mail Transport
                         Session
                         Authenticator
                         Message$RecipientType
                         PasswordAuthentication)))

(def user "username")
(def password "password")
(def port 2525)
(def host "smtp.mailtrap.io")

(def props (doto (Properties.)
             (.putAll {"mail.smtp.user" user "mail.smtp.host" host
                       "mail.smtp.port" port "mail.smtp.auth", "true"})))

(def auth (proxy [Authenticator] []
            (getPasswordAuthentication []
              (PasswordAuthentication. user password))))

(def session (Session/getInstance props auth))
(def msg (MimeMessage. session))

(defn -main
  []

  (.setFrom msg (InternetAddress. "john.doe@example.com"))
  (.addRecipient msg Message$RecipientType/TO (InternetAddress. "roger.roe@example.com"))

  (.setSubject msg "Mail subject")
  (.setText msg "Mail body")
  (.setContent msg "&lt;p&gt;an &lt;em&gt;old falcon&lt;/em&gt; in the sky&lt;/p&gt;" "text/html; charset=utf-8")
  (Transport/send msg))

This example sends an email with HTML body.

attach/core.clj
  

(ns attach.core
  (:import java.util.Properties)
  (:import (jakarta.activation FileDataSource DataHandler))
  (:import (jakarta.mail.internet MimeMessage MimeBodyPart
                                  MimeMultipart InternetAddress))
  (:import (jakarta.mail Transport
                         Session
                         Authenticator
                         Message$RecipientType
                         PasswordAuthentication)))

(def user "username")
(def password "password")
(def port 2525)
(def host "smtp.mailtrap.io")
(def from "john.doe@example.com")
(def to "roger.roe@example.com")
(def subject "Mail subject")

(def fileName (str (System/getProperty "user.dir") "/words.txt"))

(def props (doto (Properties.)
             (.putAll {"mail.smtp.user" user, "mail.smtp.host" host,
                       "mail.smtp.port" port, "mail.smtp.auth", "true"})))

(def auth (proxy [Authenticator] []
            (getPasswordAuthentication []
              (PasswordAuthentication. user password))))

(def session (Session/getInstance props auth))
(def msg (MimeMessage. session))
(def msgPart (MimeBodyPart.))
(def fds (FileDataSource. fileName))
(def attachPart (MimeBodyPart.))
(def multipart (MimeMultipart.))

(defn -main
  []

  (.setFrom msg (InternetAddress. from))
  (.addRecipient msg Message$RecipientType/TO (InternetAddress. to))

  (. msg setSubject subject)
  (. msgPart setText "words.txt file")
  (. attachPart setDataHandler (DataHandler. fds))
  (. attachPart setFileName (. fds getName))
  (. multipart addBodyPart  msgPart)
  (. multipart addBodyPart  attachPart)
  (. msg setContent multipart)

  (Transport/send msg))

The example sends an email with attachment.

pop3/core.clj
  

(ns pop3.core
  (:import (jakarta.mail Session Folder)))

(def user "username")
(def password "password")
(def host "pop3.mailtrap.io")
(def port 9950)

(def props (System/getProperties))

(def session (Session/getDefaultInstance props))
;; (.setDebug session true)
(def store (.getStore session "pop3"))
(.connect store host port user password)
(def inbox (.getFolder store "Inbox"))
(.open inbox Folder/READ_ONLY)
(def messages (.getMessages inbox))

(defn -main []

  ;; (connect)
  (println (count messages))

  (doseq [m messages] (let [subject (.getSubject m) body (slurp (.getInputStream m))]
                        (println subject)
                        (println body)
                        (prn "---------------------------")))

  (.close inbox true)
  (.close store))

Finally, we have an example which retrieves emails via POP3.

## Source

[Jakarta Mail](https://jakarta.ee/specifications/mail/2.0/jakarta-mail-spec-2.0)

In this article we have shown how to send and receive emails on the JVM 
with Java, Groovy and Clojure languages.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).