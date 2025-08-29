+++
title = "Spring Boot import beans"
date = 2025-08-29T20:12:19.727+01:00
draft = false
description = "Spring Boot import beans tutorial shows how to import additional beans into application context of a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot import beans

last modified July 21, 2023

Spring Boot import beans tutorial shows how to import additional beans into
application context of a Spring Boot application.

Spring Boot is a popular application framework for creating enterprise 
application in Java, Kotlin, or Groovy.

The @SpringBootApplication is a convenience annotation which allows
to define autoconfiguration, component scanning, and define extra beans on the
application class. 

Spring beans are typically registered in the application context via component
scanning in modern applications. But it is also possible to import beans with
the @Import annotation or the
SpringApplicationBuilder's sources method. 

## Spring Boot import beans example

In the following application, we turn off the component scanning and register the service bean 
with @Import and sources.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           └── service
│   │               └── TimeService.java
│   └── resources
└── test
    └── java

This is the project structure of the Spring Boot application.

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

This is the Gradle build.gradle file.

com/zetcode/service/TimeService.java
  

package com.zetcode.service;

import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
public class TimeService {

    public LocalTime getTime() {

        return LocalTime.now();
    }
}

We have a simple service bean that returns the current local time.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.service.TimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@EnableAutoConfiguration
@Configuration
@Import(value=TimeService.class)
public class Application implements CommandLineRunner {

    public static void main(String[] args) {

        new SpringApplicationBuilder(Application.class)
//                .sources(TimeService.class)
                .build()
                .run(args);
    }

    @Autowired
    private TimeService timeService;

    @Override
    public void run(String... args) throws Exception {

        System.out.println(timeService.getTime());
    }
}

We intentionally did not use the @SpringBootApplication annotation and 
did not specify the @ComponentScan annotation either. In order to register 
and use the TimeService bean, we have to import it.

@EnableAutoConfiguration
@Configuration
@Import(value=TimeService.class)
public class Application implements CommandLineRunner {

We import the TimeService bean into the application context.

	        new SpringApplicationBuilder(Application.class)
//                .sources(TimeService.class)
                .build()
                .run(args);

An alternative way to import the bean is to use the
SpringApplicationBuilder's sources method. Since we
have already imported the bean, the line is commented.

@Autowired
private TimeService timeService;

Now that the bean is registered, we can inject it into the field.

System.out.println(timeService.getTime());

Finally, we call the getTime method of the bean.

$ ./gradlew -q bootRun
...
17:43:10.494434800

We run the application.

In this article we have shown how to import additional beans into the
application context.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).