+++
title = "Spring Boot @Order"
date = 2025-08-29T20:12:25.345+01:00
draft = false
description = "Spring Boot @Order tutorial shows how to order beans with @Order annotation."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @Order

last modified July 21, 2023

Spring Boot @Order tutorial shows how to order beans with @Order annotation.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## @Order

@Order defines the sort order for an annotated component. The
value is optional and represents an order value. Lower values have
higher priority.

## Spring Boot @Order example

The following application orders the execution of beans implementing
CommandLineRunner.

build.gradle 
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               Application.java
│   │               MyRunner.java
│   │               MyRunner2.java
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

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
}

This is the Gradle build file.

com/zetcode/MyRunner.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(value = 2)
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    @Override
    public void run(String... args) {

        logger.info("Running MyRunner");
    }
}

The bean is started when the application starts. With the @Order
annotation we give it a priority level.

com/zetcode/MyRunner2.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(value = 1)
public class MyRunner2 implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner2.class);

    @Override
    public void run(String... args) {
        logger.info("Running MyRunner2");
    }
}

This is MyRunner2. It has a higher priority set with @Order,
so it is executed before MyRunner.

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

$ ./gradlew bootRun
...
... com.zetcode.MyRunner2  : Running MyRunner2
... com.zetcode.MyRunner   : Running MyRunner

We run the application.

In this article we have shown how to use @Order annotation to set
the order of execution of beans.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).