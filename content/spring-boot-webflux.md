+++
title = "Spring Boot WebFlux"
date = 2025-08-29T20:12:38.934+01:00
draft = false
description = "Spring Boot WebFlux tutorial shows how to create a simple Spring Boot reactive web application with WebFlux."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot WebFlux

last modified July 21, 2023

Spring Boot WebFlux tutorial shows how to create a simple Spring Boot
reactive web application with WebFlux.

## WebFlux

WebFlux is a Spring reactive-stack web framework. It was added to
Spring 5. It is fully non-blocking, supports reactive streams back pressure, and
runs on such servers such as Netty, Undertow, and Servlet 3.1+ containers.

Spring WebFlux is an alternative to the traditional Spring MVC.

Spring WebFlux internally uses Project Reactor and its publisher implementations
Flux and Mono. It supports two programming models: a) annotation-based reactive
components, b) functional routing and handling.

## Reactive programming

Reactive programming is a programming paradigm that is functional,
event-based, non-blocking, asynchronous, and centered around data stream
processing. The term *reactive* comes from the fact that we react to
changes such as mouse clicks or I/O events.

Reactive applications scale better and are more efficient when we are dealing
with lots of streaming data. Reactive applications are non-blocking; they're not
using resources waiting for processes to finish.

Reactive applications implement an event-based model where data is pushed to the
consumer. The consumer of data, a subscriber, subscribes to the publisher,
which publishes asynchronous streams of data.

## Spring Reactor

Spring Reactor is a reactive library for building non-blocking applications on
the JVM based on the Reactive Streams Specification.

The Reactor Project offers two types of publishers: Mono and
Flux. Flux is a publisher that produces 0 to N values.
Operations that return multiple elements use this type.
Mono is a publisher that produces 0 to 1 value. It is used for
operations that return a single element.

## Spring Boot WebFlux example

In the following application we create a simple Spring Boot web application with
reactive support.

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
│           application.properties
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
    implementation 'org.springframework.boot:spring-boot-starter-webflux'
}

This is the Gradle build file. The spring-boot-starter-webflux is a
Spring Boot starter for building WebFlux applications using Spring Framework's
Reactive Web support.

resources/application.properties
  

spring.main.banner-mode=off

In the application.properties, we turn off the Spring Boot banner.

com/zetcode/MyController.java
  

package com.zetcode.controller;

import org.reactivestreams.Publisher;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class MyController {

    @GetMapping("/")
    public Publisher&lt;String&gt; home() {

        return Mono.just("Home page");
    }
}

We have a simple REST endpoint, which returns a message.
The home method return type is a Publisher.
Mono.just emits the specified string message.

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

$ ./gradlew bootRun

We run the application and navigate to localhost:8080.

In this article we have created a simple Spring Boot WebFlux application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).