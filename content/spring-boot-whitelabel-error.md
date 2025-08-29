+++
title = "Spring Boot Whitelabel Error"
date = 2025-08-29T20:12:40.085+01:00
draft = false
description = "Spring Boot Whitelabel Error tutorial shows how to configuare and display error messages in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Whitelabel Error

last modified July 16, 2023

Spring Boot Whitelabel Error tutorial shows how to configuare and display error
messages in a Spring Boot application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring which helps create stand-alone, production-grade Spring
based applications easily.

## WhiteLabel Error Page

WhiteLabel Error Page is a generic Spring Boot error page that is displayed
when no custom error page is present.

server.error.whitelabel.enabled=false

A WhiteLabel Error can is disabled in the application.properties file by
setting the server.error.whitelabel.enabled to false.

spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration

Another way of disabling the WhiteLabel Error is excluding the ErrorMvcAutoConfiguration.

@SpringBootApplication(exclude = {ErrorMvcAutoConfiguration.class})
public class Application {

Alternatively, the exclusion can be done in an annotation.

When the WhiteLabel Error Page is disabled and no custom error page is provided,
the web server's error page (Tomcat, Jetty) is shown.

## Spring Boot Custom Error Page

Without using a Thymeleaf template engine, we can place a generic custom
error page in a src/main/resources/public/errors directory.

resources/public/errors/404.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;404 - resource not found&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;404 - Resource not found&lt;/h2&gt;

&lt;p&gt;
The requested resource was not found; - public
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is a generic error page for 404 error.

resources/templates/error.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Error occurred&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Error occurred&lt;/h1&gt;

&lt;p&gt;
    An error has occurred. Please contact the administrator; - template generic
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

A generic error page using a template can be placed in the
src/main/resources/templates/ directory.

resources/templates/error/404.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;404 - resource not found&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;404 - Resource not found&lt;/h2&gt;

&lt;p&gt;
The requested resource was not found; template - specific
&lt;/p&gt;

&lt;p th:text="${error}"&gt;Error Info&lt;/p&gt;
&lt;p th:text="${status}"&gt;Status&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

A specific error page using a template can be placed in the
src/main/resources/templates/error/ directory.

## Spring Boot Custom Error Page example

In the following example we create a simple Spring Boot application
with uses a custom error page for the 404 error.

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
│           └───error
│                   404.html
└───test
    └───java

This is the project structure of the Spring application.

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
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. We have the spring-boot-starter-web
and spring-boot-starter-thymeleaf starters.

resources/application.properties
  

#server.error.whitelabel.enabled=false
#spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration

In the application.properties, we can turn off the WhiteLabel Error
with on of these settings. If we provide a custom error page, it automatically
takes precedence over the WhiteLabel Error.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping("/")
    public String home() {

        return "Home page";
    }
}

We have a simple controller that returns a text message for a home page.

resources/templates/error/404.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;404 - resource not found&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;404 - Resource not found&lt;/h2&gt;

&lt;p&gt;
The requested resource was not found; template - specific
&lt;/p&gt;

&lt;p th:text="${error}"&gt;Error Info&lt;/p&gt;
&lt;p th:text="${status}"&gt;Status&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is a custom template error page created with Thymeleaf.

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

This code sets up the Spring Boot application.

In this article we have covered the WhiteLabel Error and we showed how to
create our custom error pages.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).