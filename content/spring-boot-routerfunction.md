+++
title = "Spring Boot RouterFunction"
date = 2025-08-29T20:12:32.092+01:00
draft = false
description = "Spring Boot RouterFunction tutorial shows how to create functional routes in Spring Boot applications. RouterFunction represents a function that routes to a handler function."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot RouterFunction

last modified July 29, 2023

In this article we show how to create functional routes in Spring Boot
applications.

## Reactive programming

Reactive programming is a programming paradigm that is functional,
event-based, non-blocking, asynchronous, and centered around data stream
processing. The term *reactive* comes from the fact that we react to
changes such as mouse clicks or I/O events.

Traditional Spring MVC applications use annotations such as
@GetMapping to map request paths to controller actions. Functional
routing API is an alternative way of this mapping.

## RouterFunction

RouterFunction represents a function that routes to
a handler function.

## Spring Boot RouterFunction example

In the following application we create a reactive Spring Boot application with 
functional routes.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───routes
│   │                   MyRoutes.java
│   └───resources
└───test
    └───java
        └───com
            └───zetcode
                └───routes
                        MyRoutesTest.java

This is the project structure of the Spring application.

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
    implementation 'org.springframework.boot:spring-boot-starter-webflux'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

This is the build.gradle file. The RouterFunction
is in the spring-boot-starter-webflux dependency.

com/zetcode/routes/MyRoutes.java
  

package com.zetcode.routes;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;
import static org.springframework.web.reactive.function.server.RequestPredicates.GET;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;
import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Configuration
public class MyRoutes {

    @Bean
    RouterFunction&lt;ServerResponse&gt; home() {
        return route(GET("/"), request -&gt; ok().body(fromValue("Home page")));
    }

    @Bean
    RouterFunction&lt;ServerResponse&gt; about() {
        return route(GET("/about"), request -&gt; ok().body(fromValue("About page")));
    }
}

We define two function routes.

@Bean
RouterFunction&lt;ServerResponse&gt; home() {
    return route(GET("/"), request -&gt; ok().body(fromValue("Home page")));
}

With functional routes, we can write simple and elegant code. Here we return 
a simple text message for the home page.

com/zetcode/routes/MyRoutesTest.java
  

package com.zetcode.routes;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MyRoutesTest {

    @Autowired
    private WebTestClient client;

    @Test
    public void test_home_page() {

        client.get().uri("/").exchange().expectStatus().isOk()
                .expectBody(String.class).isEqualTo("Home page");
    }

    @Test
    public void test_about_page() {

        client.get().uri("/about").exchange().expectStatus().isOk()
                .expectBody(String.class).isEqualTo("About page");
    }
}

With WebTestClient, we test the two routes.

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

This code sets up the Spring Boot application.

$ ./gradlew bootRun

We run the application and navigate to localhost:8080.

In this article we have learned how to use functional routes with
RouterFunction.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).