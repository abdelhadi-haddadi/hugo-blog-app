+++
title = "Spring Boot Mustache"
date = 2025-08-29T20:12:24.264+01:00
draft = false
description = "Spring Boot Mustache tutorial shows how to create a simple Spring Boot web application with Mustache template engine."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Mustache

last modified July 28, 2023

In this article we create a simple Spring Boot web application with Mustache
template engine.

## Mustache

Mustache is a simple web template system. It is available for many
programming languages including Java. Mustache is described as a logic-less
because it does not have any explicit control flow statements, such as if and
else conditionals or for loops. Looping and conditional evaluation can be
achieved using section tags processing lists and lambdas.

## Spring Boot Mustache example

The following example is a Spring Boot web application that uses Mustache
template engine.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           └── controller
│   │               └── HelloController.java
│   └── resources
│       └── templates
│           └── hello.mustache
└── test
    ├── java
    │   └── com
    │       └── zetcode
    │           └── controller
    │               └── HelloControllerTest.java
    └── resources

This is the project structure. The template files have .mustache
suffix; they are located in the src/main/resources/templates
directory by default. Spring Boot automatically configures Mustache when it
finds the dependency in the Gradle build file.

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
    implementation 'org.springframework.boot:spring-boot-starter-mustache'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. The spring-boot-starter-mustache
is starter for building Spring MVC applications with Mustache.

com/zetcode/controller/HelloController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    @GetMapping(value = "/hello")
    public String hello(Model model) {

        var msg = "Hello there!";
        model.addAttribute("message", msg);

        return "hello";
    }
}

We have a simple HelloController where we map the
/hello URL path to the hello.mustache view. We add
a short text attribute to the model for rendering in the view.

return "hello";

The returned value is the name of the view (without the suffix) to be rendered.

resources/templates/hello.mustache
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Hello&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

 {{ message }}

&lt;/body&gt;
&lt;/html&gt;

The hello.mustache is a Mustache template file that contains
placeholders to be filled with data from the model. Mustache uses the
{{ }} syntax.

com/zetcode/controller/HelloControllerTest.java
  

package com.zetcode.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest
@AutoConfigureMockMvc
class HelloControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testHome() throws Exception {

        var expected = "Hello there!";
        this.mockMvc.perform(get("/hello"))
                .andExpect(content().string(containsString(expected)));
    }
}

This is a HelloControllerTest, which check for the presence of
the hello message in the response.

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

We set up the Spring Boot application. The @SpringBootApplication
annotation enables auto-configuration and component scanning.

$ ./gradlew bootRun

We run the application and navigate to localhost:8080/hello.

In this article we have created a Spring Boot web application with Mustache.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).