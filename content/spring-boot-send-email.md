+++
title = "Spring Boot send email"
date = 2025-08-29T20:12:13.674+01:00
draft = false
description = "Spring Boot send email tutorial shows how to send email in a Spring Boot application. We use a Mailtrap service."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot send email

last modified July 28, 2023

In this article we show how to send email in a Spring Boot application. We use a
Mailtrap service.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring which helps create stand-alone, production-grade Spring
based applications easily.

## Spring Boot email example

In the following example, we create an application that sends an email
to Mailtrap account. We need to register an account if we do not have one.
The registration process is very easy and fast. There is a free tier for
sending 500 emails per month.

**Note:** Gmail is not ideal for testing applications. We should
use an online service such as Mailtrap or Mailgun, or use an SMTP server provided
by a webhosting company.

The application has a web interface to send the email. In addition, email can be
send from a test.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───controller
│   │           │       MyController.java
│   │           └───service
│   │                   EmailService.java
│   └───resources
│       │   application.properties
│       ├───static
│       │       index.html
│       └───templates
│               emailsent.ftlh
└───test
    └───java
        └───com
            └───zetcode
                    SendEmailApplicationTest.java

This is the project structure of the Spring Boot application.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
    implementation 'org.springframework.boot:spring-boot-starter-mail'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

We have project dependencies in build.gradle. For emails, we need
to declare spring-boot-starter-mail.

resources/application.properties
  

spring.main.banner-mode=off

spring.mail.protocol=smtp
spring.mail.host=sandbox.smtp.mailtrap.io
spring.mail.port=2525
spring.mail.username=-mailtrapusername-
spring.mail.password=-mailtrappasswd-
spring.mail.properties.mail.smtp.auth = true
spring.mail.properties.mail.smtp.starttls.enable = true

We configure the email settings for Mailtrap. These details are provided in our
Mailtrap account.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.service.EmailService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    private final EmailService emailService;

    public MyController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping(value = "/sendmail")
    public String sendmail() {

        emailService.sendMail("kate@example.com", "Test Subject", "Test mail");

        return "emailsent";
    }
}

The controller contains a mapping that sends an email.

com/zetcode/service/EmailService.java
  

package com.zetcode.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendMail(String toEmail, String subject, String message) {

        var mailMessage = new SimpleMailMessage();

        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        mailMessage.setFrom("johndoe@example.com");

        javaMailSender.send(mailMessage);
    }
}

The email service sends a simple email using JavaMailSender and
SimpleMailMessage.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;a href="sendmail"&gt;Send mail&lt;/a&gt;

&lt;/body&gt;
&lt;/html&gt;

The index.html file is the home page. It contains an anchor to send
the email.

resources/templates/emailsent.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Email sent&lt;/title&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
Email was sent
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

The template contains a simple message that is displayed after successful email
dispatch.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

Application is the entry point which sets up Spring Boot
application.

com/zetcode/SendEmailApplicationTest.java
  

package com.zetcode;

import com.zetcode.service.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SendEmailApplicationTest {

    @Autowired
    private EmailService emailService;

    @Test
    public void testEmail() {
        emailService.sendMail("frank23@example.com", "Test subject", "Test mail");
    }
}

This is a test for sending email.

$ ./gradlew bootRun

After the application is run, we can navigate to localhost:8080.

In this article we have shown how to send an email in Spring Boot.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).