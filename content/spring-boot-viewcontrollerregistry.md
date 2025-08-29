+++
title = "Spring Boot ViewControllerRegistry"
date = 2025-08-29T20:12:37.750+01:00
draft = false
description = "Spring Boot ViewControllerRegistry tutorial shows how to use ViewControllerRegistry to create simple routes."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot ViewControllerRegistry

last modified August 2, 2023

In this article we show how to use ViewControllerRegistry to create simple
routes.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort. 

## ViewControllerRegistry

ViewControllerRegistry allows to create simple automated
controllers pre-configured with status code and/or a view.

## Spring Boot ViewControllerRegistry example

In the following example we create a simple route with ViewControllerRegistry.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───config
│   │                   AppConfig.java
│   └───resources
│       ├───static
│       │       index.html
│       └───templates
│               hello.html
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
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
}

The spring-boot-starter-web is a starter for building web,
including RESTful, applications using Spring MVC. It uses Tomcat as the default
embedded container. The spring-boot-starter-thymeleaf is a starter
for building MVC web applications using Thymeleaf views.

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/hello").setViewName("hello");
    }
}

In the AppConfig we register a new route with
ViewControllerRegistry's addViewController method.

resources/templates/hello.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Hello page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    Hello there
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

The hello.html view displays a simple message.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
    This is home page. Go to &lt;a href="hello"&gt;hello page&lt;/a&gt;
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is a home page.

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
The @SpringBootApplication enables auto-configuration and 
component scanning.

$ ./gradlew bootRun

After the application is run, we can navigate to localhost:8080/.

In this article we have showed how to use Spring ViewControllerRegistry
to create simple routes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).