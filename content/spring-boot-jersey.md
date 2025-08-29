+++
title = "Spring Boot Jersey"
date = 2025-08-29T20:12:19.711+01:00
draft = false
description = "Spring Boot Jersey tutorial shows how to set up a simple RESTFul application with Jersey in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Jersey

last modified August 2, 2023

Spring Boot Jersey tutorial shows how to set up a simple RESTFul application
with Jersey in a Spring Boot application. Jersey is an alternative to Spring
RESTFul applications created with @RestController.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is the next step in evolution of
Spring framework. It helps create stand-alone, production-grade Spring based
applications with minimal effort. It promotes using the
*convention over configuration* principle over XML configurations.

## RESTFul application

A RESTFul application follows the REST architectural
style, which is used for designing networked applications. RESTful applications
generate HTTP requests performing CRUD (Create/Read/Update/Delete) operations
on resources. RESTFul applications typically return data in JSON or XML format.

## JAX-RS

Java API for RESTful Web Services (JAX-RS) is a Java programming
language API specification that provides support in creating web services
according to the Representational State Transfer (REST) architectural pattern.
JAX-RS uses annotations to simplify the development and deployment of web
service clients and endpoints. JAX-RS is an official part of Java EE.

## Jersey

Jersey is an open source framework for developing RESTful Web
Services in Java. It is a reference implementation of the Java API for RESTful
Web Services (JAX-RS) specification.

## Spring Boot Jersey example

The following application is a simple Spring Boot RESTful application created with Jersey.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── config
│   │           │   └── JerseyConfig.java
│   │           └── endpoint
│   │               ├── HelloEndpoint.java
│   │               └── ReverseReturnEndpoint.java
│   └── resources
└── test
    └── java
        └── com
            └── zetcode
                └── ApplicationTests.java

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
    implementation 'org.springframework.boot:spring-boot-starter-jersey'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. The spring-boot-starter-jersey is a
starter for building RESTful web applications using JAX-RS and Jersey. It is an
alternative to spring-boot-starter-web.

The spring-boot-starter-test is a starter for testing Spring Boot
applications with libraries including JUnit, Hamcrest and Mockito.

resources/application.yml
  

server:
    port: 8086
    context-path: /api

spring:
    main:
        banner-mode: "off"

logging:
    level:
        org:
            springframework: ERROR

In the application.yml file we write various configuration settings
of a Spring Boot application. We set the port and the context path. With the
banner-mode property we turn off the Spring banner.

We set the logging level for spring framework to ERROR. The
application.yml file is located in the in the
src/main/resources directory.

com/zetcode/config/JerseyConfig.java
  

package com.zetcode.config;

import com.zetcode.service.HelloService;
import com.zetcode.service.ReverseService;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {

        register(HelloService.class);
        register(ReverseService.class);
    }
}

JerseyConfig registers two service classes.

com/zetcode/service/HelloService.java
  

package com.zetcode.service;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import org.springframework.stereotype.Service;

@Service
@Path("/hello")
public class HelloService {

    @GET
    @Produces("text/plain")
    public String hello() {
        return "Hello from Spring";
    }
}

This is the HelloService. The @Path annotation defines
the URL to which the service class will respond. HelloService is
annotated also with Spring's @Service for autodetection. Our
service method simply returns "Hello from Spring" message.

com/zetcode/service/ReverseService.java
  

package com.zetcode.service;

import javax.validation.constraints.NotNull;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import org.springframework.stereotype.Service;

@Service
@Path("/reverse")
public class ReverseService {

    @GET
    @Produces("text/plain")
    public String reverse(@QueryParam("data") @NotNull String data) {
        return new StringBuilder(data).reverse().toString();
    }
}

The reverse service method returns a string which is reversed.
It accepts one parameter, which cannot be null. @QueryParam
binds the value(s) of a HTTP query parameter to a resource method parameter.

com/zetcode/ApplicationTests.java
  

package com.zetcode;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class ApplicationTests {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void hello() {
        ResponseEntity&lt;String&gt; entity = this.restTemplate.getForEntity("/hello",
                String.class);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(entity.getBody()).isEqualTo("Hello from Spring");
    }

    @Test
    public void reverse() {
        ResponseEntity&lt;String&gt; entity = this.restTemplate
                .getForEntity("/reverse?data=regit", String.class);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(entity.getBody()).isEqualTo("tiger");
    }

    @Test
    public void validation() {
        ResponseEntity&lt;String&gt; entity = this.restTemplate.getForEntity("/reverse",
                String.class);
        assertThat(entity.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}

In the ApplicationTests, we test the two endpoints.

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

The Application sets up the Spring Boot application. The
@SpringBootApplication enables auto-configuration and component
scanning.

$ ./gradlew bootRun

We run the application. The application is deployed on embedded Tomcat server.

$ curl localhost:8086/api/hello
Hello from Spring

With the curl command, we connect to the hello endpoint.

$ curl localhost:8086/api/reverse?data=summer
remmus

The summer's characters are reversed.

In this article we have created a simple RESTFul application in Spring Boot with
Jersey, which is the reference implementation of the JAX-RS specification.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).