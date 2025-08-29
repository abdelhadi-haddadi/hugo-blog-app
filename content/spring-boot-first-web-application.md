+++
title = "Spring Boot first web application"
date = 2025-08-29T20:12:16.399+01:00
draft = false
description = "Spring Boot first web application tutorial shows how to create a simple Spring Boot web application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot first web application

last modified July 29, 2023

Spring Boot first web application tutorial shows how to create a simple Spring
Boot web application. The current trend is to launch Spring Boot applications
from an executable JAR. (See SpringBootServletInitializer
tutorial for an example of a traditional WAR deployment.)

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications with minimal effort.

## Spring Boot web application example

The application shows a message and today's date. The message is retrieved
from an appplication's property.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───controller
│   │                   MyController.java
│   └───resources
│       │   application.properties
│       └───templates
│               index.peb
└───test
    └───java

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
    implementation 'io.pebbletemplates:pebble-spring-boot-starter:3.2.1'
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

This is the Gradle build file. The spring-boot-starter-web is
starter for building web, including RESTful, applications using Spring MVC.

The pebble-spring-boot-starter contains the Pebble template engine.
When Spring Boot detects this starter, it automatically configures Pebble for us.

The application is packaged into a JAR file, which contains an embedded Tomcat
web server.

resources/application.properties
  

application.message=Hello there

The application.properties file contains various configuration
settings of a Spring Boot application. We have one custom message option.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.time.LocalDate;
import java.util.Map;

@Controller
public class MyController {

    @Value("${application.message}")
    private String message = "Hi there";

    @GetMapping("/")
    public String index(Model model) {

        model.addAttribute("now", LocalDate.now());
        model.addAttribute("message", this.message);

        return "index";
    }
}

This is the controller class for the Spring Boot web application. A controller
is decorated with the @Controller annotation. The controller has
one mapping. The mapping resolves to the index.peb, which is
located in the resources/templates directory.

@Value("${application.message}")
private String message = "Hi there";

We inject a value from the application.properties into the message
variable.

@GetMapping("/")
public String index(Model model) {

    model.addAttribute("now", LocalDate.now());
    model.addAttribute("message", this.message);

    return "index";
}

The @GetMapping annotation maps a GET request with the /
path to the index method handler. A model is created and filled with data.
Spring Boot resolves the index view to the index.peb
template file, to which it also sends the model data.

resources/templates/index.peb
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
Today: {{ now }}
&lt;/p&gt;

&lt;p&gt;
Message: {{ message }}
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

The index.peb displays two values: the current date and the
received message. Both values are passed to the template via the controller.

&lt;p&gt;
Today: {{ now }}
&lt;/p&gt;

Pebble uses the {{}} syntax to display the variable.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

The Application sets up the Spring Boot application.

$ ./gradlew bootRun

We run the application. Now we can navigate to localhost:8080 to see
the application message.

In this article we have created our first Spring Boot web application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).