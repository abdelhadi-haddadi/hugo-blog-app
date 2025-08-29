+++
title = "SpringBootServletInitializer"
date = 2025-08-29T20:12:34.344+01:00
draft = false
description = "SpringBootServletInitializer tutorial shows how to deploy a Spring Boot application from a traditional WAR deployment."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# SpringBootServletInitializer

last modified July 23, 2023

In this article we show how to deploy a Spring Boot application from a
traditional WAR deployment.

The current trend is to deploy Spring Boot application from
an executable JAR. (See the [Spring Boot first web application](/articles/springbootwebfirst)
for details how to start a simple web application from JAR.)

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications with minimal effort.

## SpringBootServletInitializer

SpringBootServletInitializer is an interface to run
SpringApplication from a traditional WAR deployment. It binds Servlet, Filter
and ServletContextInitializer beans from the application context to the server.

## SpringBootServletInitializer example

The application creates a simple Spring Boot RESTful application and packages it
into a WAR.

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

This is the project structure.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

This is the Gradle build file. The spring-boot-starter-web is
starter for building web, including RESTful, applications using Spring MVC.

The application is packaged into a WAR file.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String index() {

        return "Hello there";
    }
}

This is the controller class for the Spring Boot web application. A controller
is decorated with the @Restontroller annotation.

@GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
public String index() {

    return "Hello there";
}

A GET request to the home page returns a string. The binding is done with
@GetMapping.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

The Application sets up the Spring Boot application. It extends
from SpringBootServletInitializer so that it can be deployed as
a WAR.

The application can be run both by deploying the WAR on a Tomcat server and
executing it as a self-executable web archive with embedded Tomcat.

In this article we have created our first Spring Boot web application deployable
from a traditional WAR.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).