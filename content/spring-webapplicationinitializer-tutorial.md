+++
title = "Spring WebApplicationInitializer tutorial"
date = 2025-08-29T20:12:02.061+01:00
draft = false
description = "Spring WebApplicationInitializer tutorial shows how to bootstrap Spring web applications programatically with WebApplicationInitializer."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring WebApplicationInitializer tutorial

last modified October 18, 2023

Spring WebApplicationInitializer tutorial shows how to bootstrap Spring web applications 
programatically with WebApplicationInitializer.

Spring is a popular Java application framework for creating enterprise
applications. 

## WebApplicationInitializer

WebApplicationInitializer is used for booting Spring web applications. 
WebApplicationInitializer registers a Spring DispatcherServlet and 
creates a Spring web application context. Mostly, developers use 
AbstractAnnotationConfigDispatcherServletInitializer, which is an implementation
of the WebApplicationInitializer, to create Spring web applications.

Traditionally, Java web applications based on Servlets were using web.xml file 
to configure a Java web application. Since Servlet 3.0, web applications can be created
programatically via Servlet context listeners.

## Spring WebApplicationInitializer example

The following application uses WebApplicationInitializer to create a Spring 
web application.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           ├───config
│   │           │       MyWebInitializer.java
│   │           │       WebConfig.java
│   │           └───controller
│   │                   MyController.java
│   └───resources
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;mockmvcex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.3.23&lt;/spring-version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;
            &lt;artifactId&gt;logback-classic&lt;/artifactId&gt;
            &lt;version&gt;1.4.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;5.3.23&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.2&lt;/version&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

In the pom.xml file we have the following dependencies: logback-classic
javax.servlet-api,  and spring-webmvc.

com/zetcode/config/MyWebInitializer.java
  

package com.zetcode.config;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

public class MyWebInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {

        var ctx = new AnnotationConfigWebApplicationContext();
        ctx.register(WebConfig.class);
        ctx.setServletContext(servletContext);

        var servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(ctx));
        servlet.setLoadOnStartup(1);
        servlet.addMapping("/");
    }
}

MyWebInitializer implements the WebApplicationInitializer
interface. The bootstrap code is in the onStartup method.

var ctx = new AnnotationConfigWebApplicationContext();
ctx.register(WebConfig.class);
ctx.setServletContext(servletContext);

We create an AnnotationConfigWebApplicationContext and register a web configureation
file with register. We bind the application context with the Servlet context.

var servlet = servletContext.addServlet("dispatcher", new DispatcherServlet(ctx));
servlet.setLoadOnStartup(1);
servlet.addMapping("/");

Here we register a Spring DispatcherServlet, which is a front controller for 
a Spring web application.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = "com.zetcode")
public class WebConfig {
}

The WebConfig enables Spring MVC annotations with @EnableWebMvc
and configures component scanning for the com.zetcode package.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
    public String home() {

        return "This is home page";
    }
}

MyController is a RESTful controller, which has one mapping.

$ curl localhost:8080
This is home page

We connect to the home page with curl tool.

In this article we have created a simple Spring web application with 
WebApplicationInitializer.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).