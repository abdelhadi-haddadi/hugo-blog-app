+++
title = "Spring Boot @PathVariable"
date = 2025-08-29T20:12:26.426+01:00
draft = false
description = "Spring Boot @PathVariable tutorial shows how to read an URL variable with @PathVariable annotation."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @PathVariable

last modified July 18, 2023

Spring Boot @PathVariable tutorial shows how to read an URL template 
variable with @PathVariable annotation. We create a Spring Boot
RESTful application to demonstrate the annotation.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring which helps create stand-alone, production-grade
Spring based applications easily.

## @PathVariable

@PathVariable is a Spring annotation which indicates that a method parameter
should be bound to a URI template variable.

It has the following optional elements:

  - name -  name of the path variable to bind to

  - required - tells whether the path variable is required

  - value - alias for name

## Spring Boot @PathVariable example

The following example creates a Spring Boot web application which uses @PathVariable.
The application receives an URL from which it builds a text response to the client.

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
└───test
    └───java

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
}

This is the Gradle build file. The spring-boot-starter-web is a
starter for building web applications using Spring MVC. It uses Tomcat as the
default embedded container. 

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @RequestMapping(path="/{name}/{age}")
    public String getMessage(@PathVariable("name") String name,
                             @PathVariable("age") String age) {

        return String.format("%s is %s years old", name, age);
    }
}

The controller processes the request from the client. It reads two values from 
the URL of the request.

@RestController
public class MyController {

We have a RESTful web application.

@RequestMapping(path="/{name}/{age}")
public String getMessage(@PathVariable("name") String name, 
        @PathVariable("age") String age) {

With the @PathVariable annotation, we bind the request URL template
path variable to the method variable. For instance, with the /Paul/28
URL, the Paul value is bind to the name variable, and 28 value to 
the age variable.

return String.format("%s is %s years old", name, age);

We build the message and return it.

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

We start the Spring Boot application.

$ curl localhost:8080/Robert/39
Robert is 39 years old

We create a request to the application with the curl tool. The
application responds with a message; the values were extracted from the URL with
@PathVariable.

In this article we have created a RESTful web application with Spring Boot
framework. We have demonstrated the usage of @PathVariable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).