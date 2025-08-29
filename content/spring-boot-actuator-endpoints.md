+++
title = "Spring Boot actuator endpoints"
date = 2025-08-29T20:12:03.148+01:00
draft = false
description = "Spring Boot actuator tutorial shows how to enable actuator endpoints in a Spring Boot application. Actuator endpoints are used to provide information and monitor our applications."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot actuator endpoints

last modified July 31, 2023

In this article we show how to enable actuator endpoints in a Spring Boot
application.

Spring Boot is a popular application framework for creating
enterprise application in Java, Kotlin, or Groovy.

Actuator endpoints are used to provide information and monitor our applications.
They are enabled with the spring-boot-actuator module.

The following is a partial is of built-in actuator endpoints.

    - beans - displays a complete list of all Spring beans

    - caches - exposes available caches

    - env - exposes properties from Spring's ConfigurableEnvironment

    - health - shows application health information

    - metrics - shows metrics information for the current application

    - shutdown - lets the application be gracefully shutdown

    - threaddump - performs a thread dump.

The actuator endpoint returns a list of available endpoints.
Endpoints are available for HTTP and JMX.

By default, only the health endpoint is enabled. We can enable 
endpoints via the management.endpoints.web.exposure.include 
property

management.endpoints.web.exposure.include=*

Here we enable most endpoints with the star operator.

management.endpoints.web.exposure.include=health,info,beans,env

We can enable only specific endpoints.

management.endpoint.shutdown.enabled=true

Some endpoints, such as shutdown, must be enabled explicitly due 
to their sensitivity.

## Spring Boot actuator example

The following application enables actuator endpoints.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───actuator
│   │           │       MyEndpoint.java
│   │           └───controller
│   │                   HelloController.java
│   └───resources
│           application.properties
└───test
    ├───java
    └───resources

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
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
}

This is the Gradle build file. We include the
spring-boot-starter-actuator module.

resources/application.properties
  

spring.main.banner-mode=off
management.endpoints.web.exposure.include=health,beans,env,now

In the Application properties file, we enable the health, beans, env, and 
now endpoints. The now endpoint is a custom one.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping(path = "/hello")
    public ResponseEntity&lt;String&gt; hello() {

        return ResponseEntity.ok("hello there!");
    }
}

The application has a simple controller with one mapping.

com/zetcode/actuator/MyEndpoint.java
  

package com.zetcode.actuator;

import org.springframework.boot.actuate.endpoint.annotation.Endpoint;
import org.springframework.boot.actuate.endpoint.annotation.ReadOperation;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Endpoint(id="now")
@Component
public class MyEndpoint {

    @ReadOperation
    @Bean
    public LocalDateTime now() {
        return LocalDateTime.now();
    }
}

We create a custom actuator with @Endpoint. It returns the 
current datetime.

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

We build the application and run it.

$ curl localhost:8080/actuator/health
{"status":"UP"}
$ curl localhost:8080/actuator/now
"2023-07-31T16:38:54.3963529"

We check two endpoints.

In this tutorial we have worked with actuator endpoints.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).