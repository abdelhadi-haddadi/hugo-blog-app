+++
title = "Spring Boot @ModelAttribute"
date = 2025-08-29T20:12:23.008+01:00
draft = false
description = "Spring Boot @ModelAttribute tutorial shows how to use the @ModelAttribute annotation in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @ModelAttribute

last modified July 16, 2023

Spring Boot @ModelAttribute tutorial shows how to use the
@ModelAttribute annotation in a Spring application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## @ModelAttribute

@ModelAttribute binds a method parameter or method return value to
a named model attribute, which is exposed to web views. Methods annotated with
@ModelAttribute are invoked before the controller methods with
@RequestMapping.

## Spring Boot @ModelAttribute example

The following application demonstrates the usage of @ModelAttribute.
It is used to generate a message of the day in the application. The message is
read from the properties file.

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
│       ├── static
│       │   └── index.html
│       └── templates
│           ├── pageOne.mustache
│           └── pageTwo.mustache
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
    implementation 'org.springframework.boot:spring-boot-starter-mustache'
}

This is the Gradle build file.

resources/application.properties
  

spring.main.banner-mode=off
logging.level.org.springframework=ERROR

messages.motd=Welcome

The application.properties is the main configuration file in Spring
Boot. We turn off the Spring banner and reduce the amount of logging of the
Spring framework by selecting only error messages.

The messages.motd property contains the message.

com/zetcode/service/IMessageService.java
  

package com.zetcode.service;

public interface IMessageService {

    String getMessage();
}

The IMessageService contains the getMessage
contract method.

com/zetcode/service/MessageService.java
  

package com.zetcode.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MessageService implements IMessageService {

    @Value("${messages.motd}")
    private String motd="Hello";

    @Override
    public String getMessage() {

        return motd;
    }
}

The implementation of the getMessage method retrieves the
message from the properties file, using the @Value annotation.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import com.zetcode.service.IMessageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class MyController {

    private final IMessageService messageService;

    public MyController(IMessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/pageOne")
    public String getPageOne() {

        return "pageOne";
    }

    @GetMapping("/pageTwo")
    public String getPageTwo() {

        return "pageTwo";
    }

    @ModelAttribute("motd")
    public String message() {

        return messageService.getMessage();
    }
}

Since MyController is annotated with a @Controller
annotation, it becomes a Spring MVC controller class. With
@GetMapping annotation, we map two URL patterns to Mustache views.
Both of these templates receive a motd model attribute.

@ModelAttribute("motd")
public String message() {

    return messageService.getMessage();
}

A method annotated with @ModelAttribute is executed before
@RequestMapping method and their specializations such as 
@GetMapping. The message generated from the
messageService is stored in the motd model attribute
and will be available to both Mustache views.

resources/templates/pageOne.mustache
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;title&gt;Page one&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h2&gt;Page one&lt;/h2&gt;

&lt;p&gt;
    {{ motd }}
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is pageOne.mustache view. The motd attribute is
accessed with {{ }} syntax.

resources/templates/pageTwo.mustache
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;title&gt;Page two&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;Page two&lt;/h2&gt;

&lt;p&gt;
    {{ motd }}
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is pageTwo.mustache view.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"/&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;

    &lt;body&gt;
        &lt;a href="/pageOne"&gt;Go to page one&lt;/a&gt;&lt;br&gt;
        &lt;a href="/pageTwo"&gt;Go to page two&lt;/a&gt;
    &lt;/body&gt;

&lt;/html&gt;

This is home page. It contains two links.

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

$ ./gradlew bootRun

After the application is run, we can navigate to localhost:8080.

In this article we have shown how to use @ModelAttribute
annotation in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).