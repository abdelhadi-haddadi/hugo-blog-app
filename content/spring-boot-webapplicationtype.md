+++
title = "Spring Boot WebApplicationType"
date = 2025-08-29T20:12:38.931+01:00
draft = false
description = "Spring Boot WebApplicationType tutorial presents various types of web applications in a Spring Boot application. The example shows how to set the WebApplicationType."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot WebApplicationType

last modified July 20, 2023

Spring Boot WebApplicationType tutorial presents various types  of web
applications in a Spring Boot application. The example shows how to set the
WebApplicationType.

Spring Boot is a popular application framework for creating
enterprise application in Java, Kotlin, or Groovy.

## WebApplicationType

The WebApplicationType is an enumeration of possible types of web applications.
There are three possible values:

	- NONE - the application should not run as a web application and should not start an embedded web server.

	- REACTIVE - the application should run as a reactive web application and should start an embedded reactive web server.

	- SERVLET - the application should run as a servlet-based web application and should start an embedded servlet web server.

## Spring Boot example

In the following application, we define the web application type of a 
Spring Boot application.

build.gradle 
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           └── Application.java
│   └── resources
└── test
    └── java

This is the project structure of the Spring Boot application.

build.gradle
  

plugins {
    id 'java'
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '17'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-webflux'
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

test {
    useJUnitPlatform()
}

In the build.gradle file, we have dependencies for a classic
servlet and reactive web application.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        new SpringApplicationBuilder(Application.class)
                .web(WebApplicationType.SERVLET)
                .run(args);
    }
}

@RestController
class MyController {

    @GetMapping("/")
    public String hello() {

        return "Home page";
    }
}

@Configuration
class MyRoutes {

    @Bean
    RouterFunction&lt;ServerResponse&gt; about() {
        return route(GET("/about"), request -&gt; ok().body(fromValue("About page")));
    }
}

@Component
class MyRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Hello there!");
    }
}

In the Application, we define the Spring Boot application and set up 
a classic web rest point, a reactive route and a commandline runner.

new SpringApplicationBuilder(Application.class)
    .web(WebApplicationType.SERVLET)
    .run(args);

We define the web application type using the SpringApplicationBuilder.
For the WebApplicationType.SERVLET, the reactive route is not available.

$ ./gradlew bootRun

We start the application.

$ curl localhost:8080/
Home page

The classic servlet rest point is active.

In this article we have worked with a Spring Boot WebApplicationType. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).