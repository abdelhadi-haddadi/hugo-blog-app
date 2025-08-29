+++
title = "Spring Boot @Bean"
date = 2025-08-29T20:12:05.368+01:00
draft = false
description = "Spring Boot Bean tutorial shows how to create a simple Bean in Spring Boot framework using the @Bean annotation."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @Bean

last modified July 23, 2023

In this article we create a simple Bean in Spring Boot framework using the
@Bean annotation.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring which helps create stand-alone, production-grade Spring
based applications with minimal effort.

## Spring @Bean annotation

Spring @Bean annotation tells that a method produces a bean to be
managed by the Spring container. It is a method-level annotation. During Java
configuration (@Configuration), the method is executed and its
return value is registered as a bean within a BeanFactory.

## Spring Boot @Bean example

The core Spring container creates and manages beans. In the following application,
we show how to create a Spring bean with the @Bean annotation.
The application is command line Spring Boot application.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               Application.java
│   │               AppName.java
│   └───resources
│           application.properties
│           logback.xml
└───test
    ├── java
    └── resources

This is the project structure of the Spring Boot application.

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
    implementation 'org.springframework.boot:spring-boot-starter'
}

This is the Gradle build file. The spring-boot-starter is the core
starter that includes auto-configuration support, logging, and YAML. The
application is packaged into a JAR file.

com/zetcode/AppName.java
  

package com.zetcode;

interface AppName {

    String getName();
}

We have a simple interface that defines a contract. It is used to
create an anonymous class that returns the application name.

resources/application.properties
  

spring.main.banner-mode=off
spring.main.log-startup-info=false
app.name=SpringBootBean

The application.properties file contains application configuration
settings. There are some built-in application properties and we can create our
custom ones. The spring.main.banner-mode property is a Spring built-in
property; we turn off the Spring's banner.  
With the spring.main.log-startup-info property, we can turn off 
the startup logging information. The app.name is our custom
property that contains the application name.

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;include resource="org/springframework/boot/logging/logback/base.xml" /&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="INFO"/&gt;
&lt;/configuration&gt;

In the logback.xml file, we configure the application logging.
We set the level of logging to ERROR. This way our output is not cluttered
with unnecessary information. The spring-boot-starter dependency
enables logback for logging.

com/zetcode/Application.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;

@SpringBootApplication
public class Application implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    private final AppName appName;

    @Lazy
    public Application(AppName appName) {
        this.appName = appName;
    }

    @Bean
    public AppName getAppName(@Value("${app.name}") String appName) {

        return () -&gt; appName;
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("Application name: {}", appName.getName());
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

In the Application, we create a bean, call its method and set up
the Spring Boot application. The CommandLineRunner interface
indicates that a bean should run when it is contained within a
SpringApplication. It can be used to create command line
applications in Spring Boot.

@SpringBootApplication
public class Application implements CommandLineRunner {

The @SpringBootApplication annotation enables auto-configuration
and component scanning.

@Lazy
public Application(AppName appName) {
    this.appName = appName;
}

The bean is being injected; we use the @Lazy annotation to avoid 
circular bean reference.

@Bean
public AppName getAppName(@Value("${app.name}") String appName) {

    return () -&gt; appName;
}

Here we create the AppName bean; the bean is managed by Spring
container. While the @Component annotation is used to decorate
classes that are auto-detected by Spring scanning, the @Bean
annotation is used to explicitly declare a bean creation.

The @Value annotation is used to set the value of the
app.name property into the appName parameter.

logger.info("Application name: {}", appName.getName());

We call the bean's getName method.

$ ./gradlew bootRun 

&gt; Task :bootRun
2023-07-23T16:49:02.009+02:00  INFO ... : Application name: SpringBootBean

We run the application with ./gradlew bootRun.

In this article we have created a Spring bean with the @Bean
annotation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).