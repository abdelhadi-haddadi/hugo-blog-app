+++
title = "Spring Boot automated controller"
date = 2025-08-29T20:12:05.355+01:00
draft = false
description = "Spring Boot automated controller shows how to create simple automated controller in a Spring Boot application with ViewControllerRegistry."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot automated controller

last modified July 29, 2023

In this article we show how to create simple automated controller in a Spring
Boot application with ViewControllerRegistry. Our application shows a simple
page that displays current date. We use FreeMarker as template engine.

Spring is a popular Java application framework. 
Spring Boot is an effort to create stand-alone, production-grade 
Spring based applications without much hassle.

FreeMarker is a server-side Java template engine for both web and
standalone environments. Templates are written in the FreeMarker Template
Language (FTL), which is a simple, specialized language.

## ViewControllerRegistry

Sometimes we do not need complex controller logic and just want to return a view. 
ViewControllerRegistry registers simple automated controllers
pre-configured with status code and/or a view. Its
addViewController method maps a view controller to the given URL
path (or pattern) in order to render a response with a pre-configured status
code and view.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───config
│   │                   MvcConfig.java
│   └───resources
│       └───templates
│               index.ftlh
└───test
    └───java
        └───com
            └───zetcode
                    HomePageTest.java

This is the project structure. FreeMarker template files have .ftlh
suffix; they are located in the resources/templates directory by
default. 

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
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'

}

test {
    useJUnitPlatform()
}

The spring-boot-starter-freemarker is starter for building 
Spring MVC applications with FreeMarker. The spring-boot-starter-test
imports necessary testing modules. The application is packaged into a JAR file.

com/zetcode/config/MvcConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }
}

In the MvcConfig class we configure a view and a controller for the
home page. The index view is mapped to the index.ftlh
template file which is located in the src/main/resources/templates
directory.

resources/templates/index.ftlh
  

&lt;#assign now = .now&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;Today is: ${now?string.short}&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.ftlh template file is the home page of the application.
It displays current date.

&lt;#assign now = .now&gt;

Here we assign current date time value to the now variable.

&lt;p&gt;Today is: ${now?string.short}&lt;/p&gt;

We print the date in the short format.

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

com/zetcode/HomePageTest.java
  

package com.zetcode;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
public class HomePageTest {

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    @Test
    public void testHomePage() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.get("/"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.view().name("index"))
                .andDo(MockMvcResultHandlers.print());
    }
}

This is a test for the home page.

$ ./gradlew bootRun

We start the application.

$ curl localhost:8080
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;Today is: 7/18/23, 1:47 PM&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

With the curl tool, we retrieve the home page.

In this article we have created a simple controller and view in Spring Boot
without creating a specific controller class. We have used FreeMarker as
template engine.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).