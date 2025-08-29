+++
title = "Spring Boot context path"
date = 2025-08-29T20:12:07.617+01:00
draft = false
description = "Spring Boot context path turorial shows how to setting context path in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot context path

last modified July 16, 2023

Spring Boot context path turorial shows how to setting context path in a Spring
application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## Context path

The *context path* is the name of the URL at which we access
the application. The default context path is empty.

The context path can be changed in many ways. We can set it in the properties
file, with the SERVER_SERVLET_CONTEXT_PATH
environment variable, with Java System property, or on the command line.

$ export SERVER_SERVLET_CONTEXT_PATH=/myapp

On Unix systems, we can change the SERVER_SERVLET_CONTEXT_PATH
with the export command.

&gt; set SERVER_SERVLET_CONTEXT_PATH=/myapp

On Windows, it is done with the set command.

server.servlet.context-path=/myapp

The property can be change in the application.properties file.
(Also in the application.yml file.)

@Configuration
public class AppConfig {

    @Bean
    public WebServerFactoryCustomizer&lt;ConfigurableServletWebServerFactory&gt;
        webServerFactoryCustomizer() {

        return factory -&gt; factory.setContextPath("/myapp");
    }
}

The context path can be set with the WebServerFactoryCustomizer
bean.

@SpringBootApplication
public class Application  {

    public static void main(String[] args) {

        System.setProperty("server.servlet.context-path", "/myapp");
        SpringApplication.run(Application.class, args);
    }
}

Here we set the context with the Java System property.

new SpringApplicationBuilder(Application.class)
    .bannerMode(Banner.Mode.OFF)
    .properties("server.servlet.context-path=/myapp")
    .logStartupInfo(false)
    .build()
    .run(args);

Here we set the context path as the default property using the 
SpringApplicationBuilder.

$ java -jar -Dserver.servlet.context-path=/test target/SpringBootContextPath-1.0-SNAPSHOT.jar

Here we set the context path on the command line.

Spring gives these options different priorities. The following list shows the
priorities in descending order.

    - Java config

    - command line arguments

    - Java System properties

    - OS Environment variables

    - application.properties

    - default properties

The higher the option, the higher the priority.

## Spring Boot context path example

In the following application, we set a custom context path. Several options are
commented. Play with these options to the idea of their priorities.

... Tomcat started on port(s): 8080 (http) with context path '/myapp'

When the application starts, Spring Boot shows an information message about the
chosen context path on the terminal.

build.gradle
...
src
├── main
│&nbsp;  ├── java
│&nbsp;  │&nbsp;  └── com
│&nbsp;  │&nbsp;      └── zetcode
│&nbsp;  │&nbsp;          ├── Application.java
│&nbsp;  │&nbsp;          ├── config
│&nbsp;  │&nbsp;          │&nbsp;  └── AppConfig.java
│&nbsp;  │&nbsp;          └── controller
│&nbsp;  │&nbsp;              └── MyController.java
│&nbsp;  └── resources
│&nbsp;      └── application.yml
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

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

This is the Gradle build file. 

resources/application.yml
  

server:
  servlet:
    context-path: /myapp3

In the application.yml file we write various configuration settings
of a Spring Boot application. We can set the context path here. This
configuration can be overwritten using other options with higher priority, such
as @Bean configuration.

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
public class AppConfig {

    @Bean
    public WebServerFactoryCustomizer&lt;ConfigurableServletWebServerFactory&gt;
        webServerFactoryCustomizer() {

        return factory -&gt; factory.setContextPath("/myapp1");
    }
}

Here we set the context path with the WebServerFactoryCustomizer bean.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    @GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    public @ResponseBody String home() {

        return "home page";
    }
}

MyController handles a request from the client. For the home page, 
it returns a simple text value.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

//        System.setProperty("server.servlet.context-path", "/myapp2");
//        SpringApplication.run(Application.class, args);

        new SpringApplicationBuilder(Application.class)
                .bannerMode(Banner.Mode.OFF)
                .properties("server.servlet.context-path=/myapp4")
                .logStartupInfo(false)
                .build()
                .run(args);
    }
}

Application is the entry point which sets up Spring Boot
application. Here we can also set the context path; either with a Java System
property, or with the default properties of the builder. 

In this article we have shown how to set a context path in a Spring Boot
application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).