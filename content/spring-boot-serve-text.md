+++
title = "Spring Boot serve text"
date = 2025-08-29T20:12:36.627+01:00
draft = false
description = "Spring Boot send text tutorial shows how to serve plain text in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot serve text

last modified July 20, 2023

Spring Boot serve text tutorial shows how to serve plain text in a Spring Boot
application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## Content type

Content type, or media type, is a string sent along with a file indicating the
type of the file. It describes the content format; for example, an HTML file
might be labeled text/html, or an image file as image/png. It serves the same
purpose as filename extensions on Windows.

The content-type header values is used to indicate the 
media type of the resource. The text/plain; charset=utf-8 is used 
for text files. 

## Spring Boot serve text example

The following application shows three ways to send text to the client.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           └── controller
│   │               └── MyController.java
│   └── resources
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

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

This is the Gradle build file. We only need the
spring-boot-starter-web dependency.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

@Controller
public class MyController {

    @GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody
    String home() {

        return "home page";
    }

    @GetMapping(value = "/about")
    public void test(HttpServletResponse response) throws IOException {

        response.addHeader("content-type", "text/plain; charset=utf-8");
        response.setStatus(200);

        PrintWriter out = response.getWriter();
        out.println("about page");
    }

    @GetMapping(value = "/contact")
    public ResponseEntity&lt;String&gt; contact() {

        var httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));

        return new ResponseEntity&lt;&gt;("contact page", httpHeaders, HttpStatus.OK);
    }
}

We have three methods to return text in the controller. Each method uses a different
technique.

@Controller
public class MyController {

    @GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody
    String home() {

        return "home page";
    }

Since the controller is annotated with the @Controller annotation, 
we have to add the @ResponseBody annotation to directly write 
to the body of the response rather that returning a view name to be processed. 
The home method has a String return type and 
the produces attribute is set to MediaType.TEXT_PLAIN_VALUE.

@GetMapping(value = "/about")
public void test(HttpServletResponse response) throws IOException {

    response.addHeader("content-type", "text/plain; charset=utf-8");
    response.setStatus(200);

    PrintWriter out = response.getWriter();
    out.println("about page");
}

The second way uses the HttpServletResponse. It is a low-level
approach where we directly write to the response object. 

@GetMapping(value = "/contact")
public ResponseEntity&lt;String&gt; contact() {

    var httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(new MediaType("text", "plain", StandardCharsets.UTF_8));

    return new ResponseEntity&lt;&gt;("contact page", httpHeaders, HttpStatus.OK);
}

In the third case, we use the ResponseEntity to serve text. 
The media type is set in the HttpHeaders. 

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

We run the application with ./gradlew bootRun.

$ curl localhost:8080
home page
$ curl localhost:8080/about
about page
$ curl localhost:8080/contact
contact page

This is the output for all three pages.

$ curl -i localhost:8080/contact
HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 12
Date: Thu, 20 Jul 2023 09:44:07 GMT

contact page

With the curl's -i option we also include the headers.

In this article we have shown how to send text data to the client from a
Spring Boot application. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).