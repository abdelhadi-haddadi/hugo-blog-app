+++
title = "Spring Boot @Component"
date = 2025-08-29T20:12:06.522+01:00
draft = false
description = "Spring Boot @Component tutorial shows how to use the @Component annotation in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @Component

last modified July 16, 2023

Spring Boot @Component tutorial shows how to use the @Component
annotation in a Spring application. In the example, we create a Spring Boot
console application.

Spring is a popular Java/Kotlin application framework and Spring
Boot is an evolution of Spring that helps create stand-alone,
production-grade Spring based applications easily.

## @Component

@Component is the most generic Spring annotation. A Java class
decorated with @Component is found during classpath scanning and
registered in the context as a Spring bean. @Service,
@Repository, and @Controller are specializations of
@Component, which are used for more specific cases. 

@ComponentScan ensures that the classes decorated with
@Component are found and registered as Spring beans.
@ComponentScan is automatically included with 
@SpringBootApplication.

@Bean servers a similar purpose as @Component. It is
not autodetected. Methods decorated with @Bean produce a bean to be
managed by the Spring container during configuration stage.

## Spring Boot @Component example

The following application demonstrates the usage of @Component. 
It uses the annotation to create a bean that randomly generates names.

build.gradle 
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── MyRunner.java
│   │           └── service
│   │               ├── NowService.java
│   │               └── RandomNameService.java
│   └── resources
└── test
    ├── java
    └── resources

This is the project structure.

build.gradle
  

plugins {
    id 'java'
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '17'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
}

This is the Gradle build file. The spring-boot-starter is a core
starter, including auto-configuration support, logging, and YAML. 

resources/application.properties
  

spring.main.banner-mode=off
logging.level.org.springframework=ERROR
logging.pattern.console=%d{dd-MM-yyyy HH:mm:ss} %magenta([%thread]) %highlight(%-5level) %logger.%M - %msg%n

The application.properties is the main configuration file in Spring
Boot. We turn off the Spring banner, reduce the amount of logging of the Spring
framework by selecting only error messages, and set the console logging pattern.

com/zetcode/service/RandomNameService.java
  

package com.zetcode.service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class RandomNameService {

    private final List&lt;String&gt; names = List.of("Paul", "Peter", "Lucia", 
        "Martin", "Robert", "Svetlana");

    public String getName() {

        var rand = new Random();
        return names.get(rand.nextInt(names.size()));
    }
}

The RandomNameService is a Java class decorated with
@Service, which is a special case of @Component. It
will be detected during component scan process and registered as a Spring bean. 

com/zetcode/service/NowService.java
  

package com.zetcode.service;

import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class NowService {

    public String now() {

        return Instant.now().toString();
    }
}

This is another service class. 

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.service.RandomNameService;
import com.zetcode.service.NowService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    private final RandomNameService randomNameService;
    private final NowService nowService;

    public MyRunner(RandomNameService randomNameService, NowService nowService) {
        this.randomNameService = randomNameService;
        this.nowService = nowService;
    }

    @Override
    public void run(String... args) throws Exception {

            logger.info("Random name: {}", randomNameService.getName());
            logger.info("Now: {}", nowService.now());
    }
}

By implementing the CommandLineRunner interface, the run 
method of the MyRunner class will be executed after the application
starts.

@Component
public class MyRunner implements CommandLineRunner {

MyRunner is decorated with @Component, so it will be
autodetected and registered.

private final RandomNameService randomNameService;
private final NowService nowService;

public MyRunner(RandomNameService randomNameService, NowService nowService) {
    this.randomNameService = randomNameService;
    this.nowService = nowService;
}

We inject two service beans.

@Override
public void run(String... args) throws Exception {

        logger.info("Random name: {}", randomNameService.getName());
        logger.info("Now: {}", nowService.now());
}

In the run method, we call the service methods.

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
application. The @SpringBootApplication annotation enables 
auto-configuration and component scanning. It is a convenience annotation
for @Configuration, @EnableAutoConfiguration, 
and @ComponentScan annotations.

$ ./gradlew bootRun
...
2023-07-16T11:57:20.396+02:00  INFO 14480 --- [main] com.zetcode.MyRunner: Random name: Robert
2023-07-16T11:57:20.398+02:00  INFO 14480 --- [main] com.zetcode.MyRunner: Now: 2023-07-16T09:57:20.398118100Z

After the application is run, we can see the log messages in the console.

In this tutorial we have shown how to use @Component annotation in
a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).