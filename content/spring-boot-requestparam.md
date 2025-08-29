+++
title = "Spring Boot @RequestParam"
date = 2025-08-29T20:12:28.711+01:00
draft = false
description = "Spring Boot @RequestParam tutorial shows how to read a request parameter with @RequestParam annotation in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @RequestParam

last modified July 16, 2023

In this article we are going to use the @RequestParam annotation
in a controller to read request parameters.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring which helps create stand-alone, production-grade
Spring based applications easily.

## Spring @RequestParam

@RequestParam is a Spring annotation used to bind a web request
parameter to a method parameter.

It has the following optional elements:

  - defaultValue - used as a fallback when the request parameter is not provided or has an empty value

  - name -  name of the request parameter to bind to

  - required - tells whether the parameter is required

  - value - alias for name

## Spring @RequestParam example

The following example creates a Spring Boot web application which uses
@RequestParam. We have an HTML form with two tags: text input and
check box. These two tags create request parameters that are read in the
controller with @RequestParam.

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
│       └── static
│           └── index.html
└── test
    ├── java
    └── resources

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
    implementation 'org.springframework.boot:spring-boot-devtools'
}

In the the Gradle build file we have the spring-boot-starter-web,
which is a starter for building web applications using Spring MVC. It uses
Tomcat as the default embedded container. The spring-boot-devtools
is an artifact useful when developing Spring Boot applications; it allows
automatic restart or live reload of applications. The application is packaged
into a JAR file.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    @RequestMapping(path="/message", produces=MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String processForm(@RequestParam(defaultValue="Guest") String name,
                              @RequestParam(required = false) String adult) {

        var greet = "on".equals(adult) ? "Good morning" : "Hi";

        return String.format("%s %s!", greet, name);
    }
}

The controller processes the HTML form. It reads two parameters from
the request.

@Controller
public class MyController {

A controller class is annotated with the @Controller annotation in
Spring.

@RequestMapping(path="/message", produces=MediaType.TEXT_PLAIN_VALUE)
@ResponseBody

The processForm method is mapped to the /message path
and returns plain text. The @ResponseBody annotation indicates that
the method return value is bound to the web response body.

public String processForm(@RequestParam(defaultValue="Guest") String name,
        @RequestParam(required = false) String adult) {

With the @RequestParam annotation, we bind the request parameter to
the method variable. The defaultValue option gives a default value
if the parameter is not available (the text input was left empty). The
required option tells that the parameter is required. The method
retuns a string.

var greet = "on".equals(adult) ? "Good morning" : "Hi";

return String.format("%s %s!", greet, name);

We build the message and return it.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"/&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"/&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;form action="message"&gt;

            &lt;div&gt;
                &lt;label&gt;Name:&lt;/label&gt;
                &lt;input type="text" name="name"&gt;
            &lt;/div&gt;

            &lt;div&gt;
                &lt;label&gt;&lt;input type="checkbox" name="adult"&gt;Adult&lt;/label&gt;
            &lt;/div&gt;

            &lt;button type="submit"&gt;Submit&lt;/button&gt;

        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.html file is the home page. The file is located in the
src/main/resources/static
directory, where Spring Boot expects static resources such as HTML or CSS files.
We have a simple HTML form with input text and check box tags.

&lt;form action="message"&gt;

The action option contains a string that is used in controller method mapping.

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

After the application is run, we can navigate to localhost:8080.

In this article we have created web application with Spring Boot framework.
We have demonstrated the usage of @RequestParam.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).