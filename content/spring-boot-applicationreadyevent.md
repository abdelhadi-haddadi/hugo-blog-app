+++
title = "Spring Boot ApplicationReadyEvent"
date = 2025-08-29T20:12:04.264+01:00
draft = false
description = "Spring Boot ApplicationReadyEvent tutorial shows how to execute a task when an application is ready."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot ApplicationReadyEvent

last modified July 29, 2023

In this article we show how to execute a task when an application is ready.

A Spring Boot application issues various events. We can use listeners to react
to such events.

For instance, the ApplicationStartedEvent is sent after the context
has been refreshed but before any application and command-line runners have been
called. The ApplicationReadyEvent is sent after any application and
command-line runners have been called. It indicates that the application is
ready to service requests.

## Spring Boot ApplicationReadyEvent example

The following Spring Boot application is a simple web application that triggers
a web request in reaction to the ApplicationStartedEvent. The
request is made with WebClient.

build.gradle 
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───bean
│   │           │       TimeResponse.java
│   │           ├───event
│   │           │       AppEvents.java
│   │           └───route
│   │                   AppRoutes.java
│   └───resources
└───test
    └───java
        └───com
            └───zetcode
                └───route
                        AppRoutesTest.java

This is the project structure.

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
    implementation 'org.springframework.boot:spring-boot-starter-webflux'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. The spring-boot-starter-webflux is
starter for building WebFlux applications using Spring Framework's Reactive Web
support.

com/zetcode/bean/TimeResponse.java
  

package com.zetcode.bean;

public class TimeResponse {

    private String date;
    private Long unixtime;
    private String time;

    public String getDate() {

        return date;
    }

    public void setDate(String date) {

        this.date = date;
    }

    public Long getUnixtime() {

        return unixtime;
    }

    public void setUnixtime(Long unixtime) {

        this.unixtime = unixtime;
    }

    public String getTime() {

        return time;
    }

    public void setTime(String time) {

        this.time = time;
    }

    @Override
    public String toString() {

        final StringBuilder sb = new StringBuilder("TimeResponse{");
        sb.append("date='").append(date).append('\'');
        sb.append(", unixtime=").append(unixtime);
        sb.append(", time='").append(time).append('\'');
        sb.append('}');

        return sb.toString();
    }
}

This is the TimeResponse bean. It is used to store data 
from the web request.

com/zetcode/event/AppEvents.java
  

package com.zetcode.event;

import com.zetcode.bean.TimeResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
public class AppEvents {

    private static final Logger logger = LoggerFactory.getLogger(AppEvents.class);

    @EventListener(ApplicationReadyEvent.class)
    public void startApp() {

        var webClient = WebClient.create("http://time.jsontest.com/");

        Mono&lt;TimeResponse&gt; result = webClient.get()
                .retrieve()
                .bodyToMono(TimeResponse.class);

        result.subscribe(res -&gt; logger.info("{}", res));
    }
}

In AppEvents we create a simple GET request.

@EventListener(ApplicationReadyEvent.class)
public void startApp() {

With @EventListener annotation, we register for the
ApplicationReadyEvent.

var webClient = WebClient.create("http://time.jsontest.com/");

From the http://time.jsontest.com/, we get the current time.

Mono&lt;TimeResponse&gt; result = webClient.get()
    .retrieve()
    .bodyToMono(TimeResponse.class);

result.subscribe(res -&gt; logger.info("{}", res));

With WebClient, we create a GET request to the site and output 
the result to the terminal.

com/zetcode/route/AppRoutes.java
  

package com.zetcode.route;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Configuration
public class AppRoutes {

    @Bean
    RouterFunction&lt;ServerResponse&gt; home() {

        return route(GET("/"), request -&gt; ok().bodyValue("Home page"));
    }
}

Our application uses a functional web framework to return a simple message
for the home page.

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

The Application sets up the Spring Boot application

com/zetcode/route/AppRoutesTest.java
  

package com.zetcode.route;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AppRoutesTest {

    @Autowired
    private WebTestClient client;

    @Test
    public void test_home_page() {

        client.get().uri("/").exchange().expectStatus().isOk()
                .expectBody(String.class).isEqualTo("Home page");
    }
}

With WebTestClient, we create a test method for the home page.

...
... com.zetcode.event.AppEvents: TimeResponse{date='07-18-2023', unixtime=null, time='11:02:38 AM'}
...

When the application starts, we get this message to the terminal.

In this article we have worked with ApplicationReadyEvent.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).