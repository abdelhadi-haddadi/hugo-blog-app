+++
title = "Introduction to Spring Boot"
date = 2025-08-29T20:12:19.723+01:00
draft = false
description = "This article is an introduction to the Spring Boot framework. Spring is a popular Java framework for creating enterprise applications."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Spring Boot

last modified July 31, 2023

This article is an introduction to the Spring Boot framework. 

## Spring

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring that helps create stand-alone, production-grade Spring 
based applications easily.

Spring Boot is a complete ecosystem for building enterprise applications. It
includes many modules to build classic web, reactive applications, and
microservices. Spring Boot applications can be developed in Java, Groovy or
Kotlin. 

The applications can be assembled in Maven or Groovy.

## Spring Boot starters

Spring Boot applications are built using starters. Starters are a set of
convenient dependency descriptors that you we include in our application.
Starters are collections of all Spring and related technologies that helps us 
quickly set up our applications. 

In other words, starters are convenient collections of dependecies. For
instance, the spring-boot-starter-data-jdbc is a starter for using
Spring Data JDBC.

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-mustache'
    runtimeOnly 'mysql:mysql-connector-java'
}

The starters are added to the Maven and Gradle build files. 

We can use Spring Initializr to initialize Spring Boot applications. It is
availabe as an online service at https://start.spring.io/. It is 
also possible to use a Spring command line tool. 

## Spring Boot simple example

We create a simple Java web REST application.

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
│       ├── application.properties
│       ├── static
│       └── templates
└── test

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

This is the Gradle build file. We include the spring-boot-starter-web
starter which is used to create both classic ans REST web applications.

resources/application.properties
  

spring.main.banner-mode=off

In the application.properties file, we turn off the banner.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
    
    @GetMapping(value="/status")
    public ResponseEntity&lt;String&gt; status() {

        return ResponseEntity.ok("OK");
    }

    @GetMapping(value="/hello/{name}/")
    public ResponseEntity&lt;String&gt; hello(@PathVariable String name) {

        var msg = String.format("Hello %s!", name);
        return ResponseEntity.ok(msg);
    }
}

We have two endpoints: /status and /hello/{{name}}/.

@RestController
public class MyController {

To create Restful applications, we use the @RestController
annotation.

@GetMapping(value="/status")
public ResponseEntity&lt;String&gt; status() {

    return ResponseEntity.ok("OK");
}

We use ResponseEntity to build HTTP responses. 

@GetMapping(value="/hello/{name}/")
public ResponseEntity&lt;String&gt; hello(@PathVariable String name) {

    var msg = String.format("Hello %s!", name);
    return ResponseEntity.ok(msg);
}

We use the @PathVariable annotation to get the value from the path.

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

In the Application, we set up the application.

@SpringBootApplication
public class Application {

With @SpringBootApplication, we initialize the Spring Boot
application.

$ ./gradlew bootRun

We start the application.

$ curl localhost:8080/status -i
HTTP/1.1 200
Content-Type: text/plain;charset=UTF-8
Content-Length: 2
Date: Mon, 31 Jul 2023 12:37:25 GMT

OK

```
$ curl localhost:8080/hello/Peter/
Hello Peter!

```

We generate requests to both endpoints with curl.

In this article we have introduced the Spring Boot framework.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).