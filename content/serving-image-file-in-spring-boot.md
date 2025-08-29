+++
title = "Serving image file in Spring Boot"
date = 2025-08-29T20:12:33.239+01:00
draft = false
description = "In this article we show how to serve an image file in Spring Boot RESTful web application. The image is a JPEG file located in the resources directory."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Serving image file in Spring Boot

last modified July 31, 2023

In this article we show how to serve an image file in Spring Boot RESTful web application. 
The image is a JPEG file located in the resources directory.

Spring is a Java application framework for developing Java
enterprise applications. It also helps integrate various enterprise components. 
Spring Boot makes it easy to create Spring-powered, production-grade applications 
and services with minimum setup requirements.

We are going to show three ways to send image data to the client. 

## Spring image example

The web application contains a sid.jpg file in the
src/main/resources/image directory.
ClassPathResource is used to get hold of the image file. 

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           └── controller
│   │               └── MyController.java
│   └── resources
│       └── image
│           └── sid.jpg
└── test
    └── java

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

This is the Gradle build file. The spring-boot-starter-web is a
starter for building web applications with Spring MVC. It uses Tomcat as the
default embedded server. 

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
@SpringBootApplication enables component scanning and
autoconfiguration.

### Serve image with HttpServletResponse

 

In the first case, we directly write to the HttpServletResponse.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class MyController {

    @RequestMapping(value = "/sid", method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)

    public void getImage(HttpServletResponse response) throws IOException {

        var imgFile = new ClassPathResource("image/sid.jpg");

        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(imgFile.getInputStream(), response.getOutputStream());
    }
}

In this controller, we get the image resource and write it directly to the 
response object.

var imgFile = new ClassPathResource("image/sid.jpg");

We get the image resource from the classpath (src/main/resources directory
is in the Java classpath) with the ClassPathResource.

response.setContentType(MediaType.IMAGE_JPEG_VALUE);

The content type of the response is set to the MediaType.IMAGE_JPEG_VALUE.

StreamUtils.copy(imgFile.getInputStream(), response.getOutputStream());

With StreamUtils we copy the data from the image to the response object.

### Serve image with ResponseEntity

 

In the second case, we use ResponseEntity.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class MyController {

    @RequestMapping(value = "/sid", method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity&lt;byte[]&gt; getImage() throws IOException {

        var imgFile = new ClassPathResource("image/sid.jpg");
        byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(bytes);
    }
}

The getImage method return type is set to
ResponseEntity&lt;byte[]&gt;.

byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());

With the StreamUtils.copyToByteArray we copy the image data into a byte array.

return ResponseEntity
        .ok()
        .contentType(MediaType.IMAGE_JPEG)
        .body(bytes);

The byte array is given to the body of the ResponseEntity.

### Serve image with ResponseEntity and InputStreamResource

 

In the third case, we use ResponseEntity and InputStreamResource.
InputStreamResource is Spring's abstraction of low-level resources.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class MyController {

    @RequestMapping(value = "/sid", method = RequestMethod.GET,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity&lt;InputStreamResource&gt; getImage() throws IOException {

        var imgFile = new ClassPathResource("image/sid.jpg");

        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG)
                .body(new InputStreamResource(imgFile.getInputStream()));
    }
}

The getImage method return type is set to 
ResponseEntity&lt;InputStreamResource&gt;.

return ResponseEntity
        .ok()
        .contentType(MediaType.IMAGE_JPEG)
        .body(new InputStreamResource(imgFile.getInputStream()));

The body of the ResponseEntity returns an InputStreamResource.

$ ./gradlew bootRun

We start Spring Boot application.

We navigate to http://localhost:8080/sid to display the image in
the browser.

In this article we have shown how to send image data to the client from a Spring
Boot applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).