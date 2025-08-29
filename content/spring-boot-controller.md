+++
title = "Spring Boot @Controller"
date = 2025-08-29T20:12:08.825+01:00
draft = false
description = "Spring Boot @Controller tutorial shows how to use the @Controller annotation in a Spring Boot application to build a web controller."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @Controller

last modified July 25, 2023

Spring Boot @Controller tutorial shows how to use the @Controller
annotation in a Spring application to build a web controller.

Spring Boot is a popular application framework to create enterprise
application in Java, Kotlin, or Groovy.

## Spring MVC

Spring MVC is the original web framework built on the Servlet API. It
is build on the popular MVC design pattern.
MVC(Model-View-Controller) is a software architecture pattern, which
separates application into three areas: model, view, and controller. The model
represents a Java object carrying data. The view represents the visualization of
the data that the model contains. The controller controls the data flow into
model object and updates the view whenever data changes. It keeps view and model
separate.

Spring Framework 5.0 introduced a parallel reactive stack web framework called
*Spring WebFlux*.

## Spring Boot @Controller

@Controller annotation indicates that the annotated class is a
controller. It is a specialization of @Component and is
autodetected through classpath scanning. It is typically used in combination
with annotated handler methods based on the
@RequestMapping annotation. @RestController is a sibling
convenience annotation for creating Restful controllers.

## Spring Boot @Controller example

In the following application, we demonstrate the usage of
@Controller. The application returns current data and time to the
client.

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
│       ├── static
│       │   └── index.html
│       └── templates
│           └── showMessage.ftlh
└── test
    ├── java
    └── resources

This is the project structure of the Spring application.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
}

This is the Gradle build file. The 
org.springframework.boot:spring-boot-starter-web is a starter for
building web, including RESTful, applications using Spring MVC.
The spring-boot-starter-freemarker is a dependency for the
Freemarker template engine. 

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;

@Controller
public class MyController {

    @RequestMapping(value = "/getDateAndTime")
    public ModelAndView getDateAndTime() {

        var now = LocalDateTime.now();
        var dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        var date_time = dtf.format(now);

        var params = new HashMap&lt;String, Object&gt;();
        params.put("date_time", date_time);

        return new ModelAndView("showMessage", params);
    }
}

This is MyController. It responds to the request from the client.
It finds out the current date and time and resolves the processing to the
showMessage.ftlh template, passing it data.

@Controller
public class MyController {

MyController is annotated with the @Controller
annotation.

@RequestMapping(value = "/getDateAndTime")
public ModelAndView getDateAndTime() {

The getDateAndTime method is mapped to the
getDateAndTime URL pattern; it returns a ModelAndView,
which is a holder for both Model and View in the web MVC framework.

var now = LocalDateTime.now();
var dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
var date_time = dtf.format(now);

We get and format the local date and time.

var params = new HashMap&lt;String, Object&gt;();
params.put("date_time", date_time);

The date and time string is added to the map of parameters.

return new ModelAndView("showMessage", params);

We return the ModelAndView. Since there is a Freemarker dependency
in the POM file, Spring resolves processging to the showMessage.ftlh
template file, passing it the params object.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;a href="getDateAndTime"&gt;Get date and time&lt;/a&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains a link that calls the Spring controller. It
is a static resource and is located in the predefined
src/main/resources/static directory.

resources/templates/showMessage.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Show message&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;

Date and time: ${date_time}

&lt;/body&gt;
&lt;/html&gt;

The showMessage.ftlh is a Freemarker template file. It is located
in the predefined src/main/resources/templates directory. It
outputs the date and time, using the ${} syntax.

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
auto-configuration and component scanning. During the scanning process, the
@Controller annotation is looked up and a Spring bean is created
from the MyController class.

$ ./gradlew bootRun

After the application is run, we can navigate to localhost:8080.

In this article we have shown how to use @Controller annotation
in a Spring Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).