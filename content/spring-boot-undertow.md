+++
title = "Spring Boot Undertow"
date = 2025-08-29T20:12:37.733+01:00
draft = false
description = "Spring Boot Undertow tutorial shows how to use Undertow server in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Undertow

last modified July 16, 2023

Spring Boot Undertow tutorial shows how to use Undertow server in a Spring Boot
application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## Undertow

Undertow is a flexible performant web server which provides both blocking and
non-blocking API's. It comes from the JBoss project.

## Spring Boot Undertow example

By default, Spring Boot uses a Tomcat embedded web server. The following example
shows how to use Undertow.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───config
│   │           │       AppConfig.java
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
    implementation('org.springframework.boot:spring-boot-starter-web') {
        exclude group: 'org.springframework.boot', module: 'spring-boot-starter-tomcat'
    }

    implementation 'org.springframework.boot:spring-boot-starter-undertow'
}

This is the Gradle build file. We explicitly exclude the Tomcat server
dependency and include the Undertow dependency.

resources/application.properties
  

spring.main.banner-mode=off

In the application.properties file we have various configuration
settings of a Spring Boot application. With the spring.main.banner-mode
property we turn off the Spring banner. 

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping(value="/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String home() {

        return "Home page";
    }
}

The home page returns a simple text message.

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.boot.web.embedded.undertow.UndertowBuilderCustomizer;
import org.springframework.boot.web.embedded.undertow.UndertowServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public UndertowServletWebServerFactory embeddedServletContainerFactory() {
        UndertowServletWebServerFactory factory =
                new UndertowServletWebServerFactory();

        factory.addBuilderCustomizers((UndertowBuilderCustomizer)
                builder -> builder.addHttpListener(8081, "0.0.0.0"));

        return factory;
    }
}

We set up the Undertow server. The server will listen on port 8081.

 -->

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

The Application is the entry point which sets up Spring Boot
application. 

$ ./gradlew bootRun

We run the application and navigate to localhost:8080.

...
... io.undertow                              : starting server: Undertow - 2.3.7.Final
... org.xnio                                 : XNIO version 3.8.8.Final
... org.xnio.nio                             : XNIO NIO Implementation Version 3.8.8.Final
... org.jboss.threads                        : JBoss Threads version 3.5.0.Final
... o.s.b.w.e.undertow.UndertowWebServer     : Undertow started on port(s) 8080 (http)

In the console we can see the Undertow server starting.

In this article we have shown how use Undertow server in a Spring Boot
application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).