+++
title = "Spring Boot GenericApplicationContext"
date = 2025-08-29T20:12:17.505+01:00
draft = false
description = "Spring Boot GenericApplicationContext tutorial explains the usage of the GenericApplicationContext in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot GenericApplicationContext

last modified July 28, 2023

Spring Boot GenericApplicationContext tutorial shows how to use the
GenericApplicationContext  in a Spring application. In the example,
we create a Spring Boot console application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## GenericApplicationContext

GenericApplicationContext is an implementation of the
ApplicationContext, which does not  assume a specific bean
definition format; e.g. XML or annotations.

## Spring Boot GenericApplicationContext example

In the following application we create a GenericApplicationContext
and register a new bean with the context's registerBean method.
Later we retrieve the bean from the application context with getBean.

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
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. The spring-boot-starter is a core
starter, including auto-configuration support, logging, and YAML. The
spring-boot-starter-test adds testing support in Spring.

application.properties
  

spring.main.banner-mode=off
logging.level.root=ERROR
logging.pattern.console=%d{dd-MM-yyyy HH:mm:ss} %magenta([%thread]) %highlight(%-5level) %logger.%M - %msg%n

The application.properties is the main configuration file in Spring
Boot. We turn off the Spring banner, reduce the amount of logging to errors
only, and set the console logging pattern.

com/zetcode/service/TimeService.java
  

package com.zetcode.service;

import java.time.Instant;

public class TimeService {

    public Instant getNow() {

        return Instant.now();
    }
}

TimeService contains a simple method which returns current date and
time. This service class is going to be registered in our generic application
context.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.service.TimeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.support.GenericApplicationContext;

@SpringBootApplication
public class Application implements CommandLineRunner {

    private final GenericApplicationContext context;

    public Application(GenericApplicationContext context) {
        this.context = context;
    }

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        context.registerBean("com.zetcode.Service.TimeService",
                TimeService.class, TimeService::new);

        var timeService = (TimeService) context.getBean(TimeService.class);

        System.out.println(timeService.getNow());

        context.registerShutdownHook();
    }
}

Application is the entry point which sets up Spring Boot
application. The @SpringBootApplication annotation enables
auto-configuration and component scanning. It is a convenience annotation
for @Configuration, @EnableAutoConfiguration,
and @ComponentScan annotations.

private final GenericApplicationContext context;

public Application(GenericApplicationContext context) {
    this.context = context;
}

We inject the GenericApplicationContext.

context.registerBean("com.zetcode.Service.TimeService",
    TimeService.class, TimeService::new);

A new TimeService bean is registered with the
registerBean method.

var timeService = (TimeService) context.getBean(TimeService.class);

We retrieve the bean with getBean.

System.out.println(timeService.getNow());

Finally, we call the bean's getNow method.

com/zetcode/ApplicationTests.java
  

package com.zetcode;

import com.zetcode.service.TimeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.support.GenericApplicationContext;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ApplicationTests {

    @Autowired
    private GenericApplicationContext context;

    @Test
    public void testNow() {

        var timeService = (TimeService) context.getBean("com.zetcode.service.TimeService");
        var now = timeService.getNow();

        assertThat(now.isBefore(Instant.now()));
    }
}

We have a simple test that uses the TimeService's
getNow method.

var timeService = (TimeService) context.getBean("com.zetcode.service.TimeService");

This time we refer to the bean by its given name.

$ ./gradlew bootRun
...
... INFO  Application MyApp

We run the application.

In this article we have shown how to use
GenericApplicationContext in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).