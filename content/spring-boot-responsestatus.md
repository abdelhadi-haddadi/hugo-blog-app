+++
title = "Spring Boot @ResponseStatus"
date = 2025-08-29T20:12:29.870+01:00
draft = false
description = "Spring Boot @ResponseStatus tutorial shows how to use @ResponseStatus annotation in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @ResponseStatus

last modified July 16, 2023

Spring Boot @ResponseStatus tutorial shows how to use @ResponseStatus annotation
in a Spring application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## @ResponseStatus

@ResponseStatus marks a method or exception class with the status
code and reason message that should be returned. The status code is applied to
the HTTP response when the handler method is invoked, or whenever the specified
exception is thrown. It overrides status information set by other means, like
ResponseEntity or redirect:.

## Spring Boot @ResponseStatus example

In the following application, we demonstrate  the usage of the
@ResponseStatus annotation. The application simulates a form for
retrieving orders by their Id. Trying to find orders with an Id greater than 500
will throw an exception. As a consequence of this exception, a custom error page
is displayed.

build.gradle
...
src
├── main
│&nbsp; ├── java
│  │  └── com
│  │      └── zetcode
│  │          ├── Application.java
│  │          ├── controller
│  │          │  └── MyController.java
│  │          └── exception
│  │              └── OrderNotFoundException.java
│  └── resources
│      ├── static
│      │  └── index.html
│      └── templates
│          └── error.ftlh
└── test
    ├── java
    └── resources

This is the project structure of the Spring application.

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
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
}

This is the Gradle build file. The spring-boot-starter-freemarker
is a dependency for Freemarker template engine.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.exception.OrderNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    @RequestMapping(value = "/orders/{id}")
    @ResponseBody
    public String getOrder(@PathVariable("id") long id) {

        if (id &lt; 0 || id &gt; 500) {

            var message = String.format("Order %d not found", id);
            throw new OrderNotFoundException(message);
        }

        var message = String.format("Returning order %d", id);

        return message;
    }
}

The MyController's getOrder method responds to
the client request. It reads the order Id from the path with @PathVariable.

if (id &lt; 0 || id &gt; 500) {

    var message = String.format("Order %d not found", id);
    throw new OrderNotFoundException(message);
}

For invalid orders (id &lt; 0) and orders greater than 500, we throw the
OrderNotFoundException exception. This is a simple simulation
of an order system.

var message = String.format("Returning order %d", id);

For other orders Ids, we return a message indicating that the order was found
and returned.

com/zetcode/exception/OrderNotFoundException.java
  

package com.zetcode.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "No such order")
public class OrderNotFoundException extends RuntimeException {

    public OrderNotFoundException(String message) {

        super(message);
    }
}

We have a custom OrderNotFoundException. It is decorated with the
@ResponseStatus annotation. The value is set to
HttpStatus.NOT_FOUND and the reason message says "No such order".
This information will be used in the error page.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="/orders/505/"&gt;Get order with Id 505&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains a link that looks for an order with Id 505.
The file is located in the src/main/resources/static directory.

resources/templates/error.ftlh
  

&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Error page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;

    &lt;body&gt;
        &lt;div&gt;
            &lt;h1&gt;Error occurred&lt;/h1&gt;

            &lt;p&gt;${status}: ${error}&lt;/p&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;

The error.ftlh is a generic error page. It is Freemarker template
file which shows status, error, and the reason message. These values were set
with @ResponseStatus earlier. It is located in the
src/main/resources/templates directory.

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

In this article we have shown how to use the @ResponseStatus
annotation in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).