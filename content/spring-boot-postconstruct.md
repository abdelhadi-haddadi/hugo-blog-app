+++
title = "Spring Boot @PostConstruct"
date = 2025-08-29T20:12:26.441+01:00
draft = false
description = "Spring Boot @PostConstruct tutorial shows how to use the @PostConstruct annotation in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @PostConstruct

last modified July 20, 2023

Spring Boot @PostConstruct tutorial shows how to use the
@PostConstruct annotation in a Spring application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## @PostConstruct

@PostConstruct is an annotation used on a method that needs to be
executed after dependency injection is done to perform any initialization.

## Spring Boot @PostConstruct example

The following application demonstrates the usage of @PostConstruct.
It uses the annotation to create two log methods that are called after their
beans are initialized. These messages are shown after the application is run.
The application itself sends a message to the client. The text message is read
from a configuration file.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── controller
│   │           │   └── MyController.java
│   │           └── service
│   │               ├── IMessageService.java
│   │               └── MessageService.java
│   └── resources
│       ├── application.properties
│       └── static
│           └── index.html
└── test
    ├── java
    └── resources

This is the project structure.

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
}

This is the Gradle build file. The spring-boot-starter-web is a
starter for building web, including RESTful, applications using Spring MVC. It
uses Tomcat as the default embedded container.

resources/application.properties
  

my.msg=Hello there

spring.main.banner-mode=off
logging.level.org.springframework=ERROR

The application.properties is the main configuration file in Spring
Boot. We set a message property, which will be returned by the application to
the client. We turn off the Spring banner and reduce the amount of logging of
the Spring framework.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.service.IMessageService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    private static final Logger logger = LoggerFactory.getLogger(MyController.class);

    final IMessageService messageService;

    @Autowired
    public MyController(IMessageService messageService) {
        this.messageService = messageService;
    }

    @RequestMapping(value = "/message")
    public String getMessage() {

        return messageService.getMessage();
    }

    @PostConstruct
    public void doLog() {
        logger.info("Info message in MyController");
    }
}

This is MyController. It sends a message to the client.

@RequestMapping(value = "/message")
public String getMessage() {

    String message = messageService.getMessage();

    return message;
}

A message is generated from the message service and returned to the client.

@PostConstruct
public void doLog() {
    logger.info("Info message in MyController");
}

The doLog method is decorated with the @PostConstruct
annotation. The method is called after the MyController bean is
initialized. It logs a simple informational message.

com/zetcode/service/IMessageService.java
  

package com.zetcode.service;

public interface IMessageService {

    String getMessage();
}

The IMessageService contains the getMessage contract
method.

com/zetcode/service/MessageService.java
  

package com.zetcode.service;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MessageService implements IMessageService {

    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    @Value(value = "${my.msg}")
    private String message;

    @Override
    public String getMessage() {

        return message;
    }

    @PostConstruct
    public void doLog() {
        logger.info("Info message in MessageService");
    }
}

The MessageService contains the implementation of the
getMessage
method.

@Value(value = "${my.msg}")
private String message;

The message that is returned to the client is read from the
application.properties file with the @Value annotation
and set to the message field.

@Override
public String getMessage() {

    return message;
}

The getMessage returns the message string.

@PostConstruct
public void doLog() {
    logger.info("Info message in MessageService");
}

MessageService also contains the doLog method
decorated with @PostConstruct. It is called after the bean is
initialized.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;a href="/message"&gt;Get Message&lt;/a&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains a link to get the message.

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
application. The @SpringBootApplication annotation enables
auto-configuration and component scanning.

$ ./gradlew bootRun
...
... com.zetcode.service.MessageService  : Info message in MessageService
... com.zetcode.controller.MyController : Info message in MyController
...

After the application is run, we can see these two log messages on the console.

In this article we have shown how to use @PostConstruct
annotation in a Spring Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).