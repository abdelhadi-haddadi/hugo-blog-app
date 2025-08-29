+++
title = "Spring Boot scheduling tasks"
date = 2025-08-29T20:12:32.150+01:00
draft = false
description = "Spring Boot scheduler tutorial shows how to scheduled tasks with @Scheduled in Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot scheduling tasks

last modified July 16, 2023

Spring Boot scheduling tasks tutorial shows how to schedule tasks with
@Scheduled in a Spring Boot application.

Spring Boot is a popular framework for building enterprise
applications in Java, Kotlin, or Groovy.

## Spring Boot scheduling tasks

The @EnableScheduling enables scheduling in a Spring Boot application.
Methods decorated with the @Scheduled annotation are run periodically.
The methods should return void and should not have any parameters.

The ScheduledAnnotationBeanPostProcessor is a bean post-processor
that registers methods annotated with @Scheduled to be invoked by
a TaskScheduler according to the fixedRate, fixedDelay,
cron expression provided via the annotation. The
fixedDelay property runs tasks with a fixe delay
of n millisecond between consecutive executions of tasks.
The fixedRate runs the scheduled task at every n millisecond. It
does not check for any previous executions of the task.

The @Scheduled(cron="pattern") allows to define a crontab pattern
to run tasks. The pattern is a list of six single space-separated fields:
representing second, minute, hour, day, month, weekday. Month and weekday names
can be given as the first three letters of the English names.
For instance, the "0 0/30 8-10 * * *" cron pattern schedules
tasks to be run at 8:00, 8:30, 9:00, 9:30, 10:00 and 10:30 every day.

## Spring Boot scheduling example

In the following application, we schedule a task with a fixed rate of 15s.
The task connects to a website and reads its date header.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───scheduling
│   │           │       ScheduledTasks.java
│   │           └───service
│   │                   HeadRequestService.java
│   └───resources
│           application.properties
└───test
    └───java

This is the project structure of the Spring Boot application.

build.gradle
  

plugins {
    id 'java'
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '17'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

This is the Gradle build file. We add the spring-boot-starter-web
for a simple web application.

resources/application.properties
  

spring.main.banner-mode=off
spring.main.log-startup-info=false

The application.properties file contains application configuration
settings. With the spring.main.banner-mode, we turn off the
Spring Boot banner and with the spring.main.log-startup-info property,
we turn off the startup logging information.

com/zetcode/scheduling/ScheduledTasks.java
  

package com.zetcode.scheduling;

import com.zetcode.service.HeadRequestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    private final HeadRequestService headRequestService;

    @Autowired
    public ScheduledTasks(HeadRequestService headRequestService) {
        this.headRequestService = headRequestService;
    }

    @Scheduled(fixedRate = 15000)
    public void getHeadValue() {
        log.info("Value: {}", headRequestService.doHeadRequest());
    }
}

In the ScheduledTasks, we schedule a task to run every 15s.

@Scheduled(fixedRate = 15000)
public void getHeadValue() {
    log.info("Value: {}", headRequestService.doHeadRequest());
}

Every 15s, the doHeadRequest of the HeadRequestService is called.

com/zetcode/service/HeadRequestService.java
  

package com.zetcode.service;

import com.zetcode.scheduling.ScheduledTasks;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class HeadRequestService {

    private static final Logger log = LoggerFactory.getLogger(ScheduledTasks.class);
    private HttpHeaders headers;

    public String doHeadRequest() {

        HttpClient client = HttpClient.newHttpClient();

        try {
            var request = HttpRequest.newBuilder(URI.create("http://webcode.me"))
                    .method("HEAD", HttpRequest.BodyPublishers.noBody())
                    .build();

            HttpResponse&lt;Void&gt; response = client.send(request,
                    HttpResponse.BodyHandlers.discarding());

            headers = response.headers();

        } catch (IOException | InterruptedException e) {

            log.error("Failed to send HEAD request");
        }

        var opt = headers.firstValue("date");
        return opt.orElse("");
    }
}

The doHeadRequest method issues a HEAD request to the webcode.me
website and retrieves the date header from its response.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@EnableScheduling
@RestController
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    private String home() {

        return "home page";
    }
}

In the Applicaiton, we set up the Spring Boot application.
With the @EnableScheduling, we enable scheduling for the application.
In addition, we add a simple web page that returns text.

$ ./gradlew bootRun
...
2023-07-17T18:38:54.662+02:00  INFO 16732 --- [   scheduling-1] com.zetcode.scheduling.ScheduledTasks    : Value: Mon, 17 Jul 2023 16:37:43 GMT
2023-07-17T18:39:09.167+02:00  INFO 16732 --- [   scheduling-1] com.zetcode.scheduling.ScheduledTasks    : Value: Mon, 17 Jul 2023 16:37:58 GMT
2023-07-17T18:39:24.165+02:00  INFO 16732 --- [   scheduling-1] com.zetcode.scheduling.ScheduledTasks    : Value: Mon, 17 Jul 2023 16:38:13 GMT

We run the application with ./gradlew bootRun. In the output
we can see the messages of the scheduled method.

In this article we have worked with scheduling in a Spring Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).