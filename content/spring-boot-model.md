+++
title = "Spring Boot Model"
date = 2025-08-29T20:12:23.022+01:00
draft = false
description = "Spring Boot Model tutorial shows how to use Model in a Spring Boot application. The purpose of the model is to hold data. Model defines a holder for model attributes and is primarily designed for adding attributes to the model."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Model

last modified July 24, 2023

In this article we show how to work with a model in a Spring Boot application.
The model is represented by Model, ModelMap, and
ModelAndView in Spring.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## MVC

MVC (Model-View-Controller) is a software architecture pattern, which
separates application into three parts: model, view, and controller. The model
represents a Java object carrying data. The view visualizes the data that the
model contains. The controller manages the data flow into model object and
updates the view whenever data changes; it keeps view and model separate.

## Spring MVC

Spring MVC is the original web framework built on the Servlet API. It
is build on the MVC design pattern. Spring Framework 5.0 introduced a parallel
reactive stack web framework called *Spring WebFlux*.

## Model, ModelMap, ModelAndView

Model, ModelMap, and ModelAndView are used to
define a model in a Spring MVC application.
Model defines a holder for model attributes and is primarily designed for adding
attributes to the model. ModelMap is an extension of Model with
the ability to store attributes in a map and chain method calls. ModelAndView
is a holder for a model and a view; it allows to return both model and view in one
return value.

## Spring Boot Model example

The following simple web application uses Model, ModelMap,
and ModelAndView in the controller methods. The model holds
application data, which is displayed in the view. We use the Freemaker library
for the view layer.

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
│       ├── application.properties
│       ├── static
│       │   └── index.html
│       └── templates
│           └── show.ftlh
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

This is the Gradle build file.

resources/application.properties
  

spring.main.banner-mode=off
spring.main.log-startup-info=false

mymessage=Hello there

The application.properties is the main configuration file in Spring
Boot. We turn off the Spring banner and startup logging of the Spring framework.
The mymessage property contains the message.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

@Controller
public class MyController {

    @Value("${mymessage}")
    private String message;

    @GetMapping("/getMessage")
    public String getMessage(Model model) {

        model.addAttribute("message", message);

        return "show";
    }

    @GetMapping("/getMessage2")
    public ModelAndView getMessage() {

        var mav = new ModelAndView();

        mav.addObject("message", message);
        mav.setViewName("show");

        return mav;
    }

    @GetMapping("/getMessageAndTime")
    public String getMessageAndTime(ModelMap map) {

        var ldt = LocalDateTime.now();

        var fmt = DateTimeFormatter.ofLocalizedDateTime(
                FormatStyle.MEDIUM);

        fmt.withLocale(new Locale("sk", "SK"));
        fmt.withZone(ZoneId.of("CET"));
        String time = fmt.format(ldt);

        map.addAttribute("message", message).addAttribute("time", time);

        return "show";
    }
}

This is MyController. It has three methods that respond to
client requests.

@Controller
public class MyController {

MyController is annotated with the @Controller annotation.

@Value("${mymessage}")
private String message;

With the @Value annotation, we insert the mymessage
property from the application.properties file into the
message attribute.

@GetMapping("/getMessage")
public String getMessage(Model model) {

    model.addAttribute("message", message);

    return "show";
}

The @GetMapping maps the /getMessage URL pattern to the
getMessage method. In the getMessage method, we
use the Model. It receives a message attribute with
the addAttribute method. The return keyword returns the name of
the view, which will be resolved to show.ftlh, because we use the
Freemarker template system.

@GetMapping("/getMessage2")
public ModelAndView getMessage() {

    var mav = new ModelAndView();
    mav.addObject("message", message);
    mav.setViewName("show");

    return mav;
}

In the second case, we use the ModelAndView. We use
addObject and setViewName to add the model data
and the view name. The method returns ModelAndView object.

@GetMapping("/getMessageAndTime")
public String getMessageAndTime(ModelMap map) {

    var ldt = LocalDateTime.now();

    var fmt = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM);

    fmt.withLocale(new Locale("sk", "SK"));
    fmt.withZone(ZoneId.of("CET"));

    var time = fmt.format(ldt);

    map.addAttribute("message", message).addAttribute("time", time);

    return "show";
}

In the getMessageAndTime method, we use ModelMap.
The model map receives two attributes: message and time.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"/&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;ul&gt;
            &lt;li&gt;&lt;a href="getMessage"&gt;Get message&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="getMessage2"&gt;Get message 2&lt;/a&gt;&lt;/li&gt;
            &lt;li&gt;&lt;a href="getMessageAndTime"&gt;Get message and time&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains three links that call the Spring controller
methods. It is a static resource and is located in the predefined
src/main/resources/static directory.

resources/templates/show.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Message&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            Message: ${message}
        &lt;/p&gt;

        &lt;#if time??&gt;
            &lt;p&gt;Date and time: ${time}&lt;/p&gt;
        &lt;/#if&gt;

    &lt;/body&gt;
&lt;/html&gt;

The show.ftlh is a Freemarker template file. It is located in the
predefined src/main/resources/templates directory. It outputs the
message and optionally the time with the ${} syntax.

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
application.

$ ./gradlew bootRun

After we start the application, we navigate to localhost:8080.

In this article we have have worked with a model in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).