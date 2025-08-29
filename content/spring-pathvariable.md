+++
title = "Spring @PathVariable"
date = 2025-08-29T20:11:55.309+01:00
draft = false
description = "Spring @PathVariable tutorial shows how to read a URL variable with @PathVariable annotation."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @PathVariable

last modified October 18, 2023

Spring @PathVariable tutorial shows how to read a URL template variable with
@PathVariable annotation. We create a Spring RESTful application to
demonstrate the annotation.

Spring is a popular Java application framework for creating
enterprise applications.

## @PathVariable

@PathVariable is a Spring annotation which indicates that a method
parameter should be bound to a URI template variable. If the method parameter is
Map&lt;String, String&gt; then the map is populated with all path
variable names and values.

It has the following optional elements:

  - name -  name of the path variable to bind to

  - required - tells whether the path variable is required

  - value - alias for name

## Spring @PathVariable example

The following example creates a Spring web application which uses @PathVariable.
The values of the variables are logged.

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
│           logback.xml
└───test
    └───java

This is the project structure of the Spring application.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;pathvariableex&lt;/artifactId&gt;
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
            &lt;version&gt;1.4.1&lt;/version&gt;
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
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.2&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;9.4.49.v20220914&lt;/version&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

We declare the project dependencies. The @PathVariable comes
from spring-webmvc package.

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="INFO"/&gt;

    &lt;appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender"&gt;
        &lt;encoder&gt;
            &lt;Pattern&gt;%d{HH:mm:ss.SSS} %blue(%-5level) %magenta(%logger{36}) - %msg %n
            &lt;/Pattern&gt;
        &lt;/encoder&gt;
    &lt;/appender&gt;

    &lt;root&gt;
        &lt;level value="INFO" /&gt;
        &lt;appender-ref ref="consoleAppender" /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;

The logback.xml is a configuration file for the Logback logging
library.

com/zetcode/config/MyWebInitializer.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

@Configuration
public class MyWebInitializer extends
        AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class&lt;?&gt;[] getRootConfigClasses() {
        return null;
    }

    @Override
    protected Class&lt;?&gt;[] getServletConfigClasses() {

        return new Class[]{WebConfig.class};
    }

    @Override
    protected String[] getServletMappings() {

        return new String[]{"/"};
    }
}

DispatcherServlet, which is a front controller for a Spring web
application, is registered in MyWebInitializer.

@Override
protected Class&lt;?&gt;[] getServletConfigClasses() {

    return new Class[]{WebConfig.class};
}

The getServletConfigClasses returns a web configuration class.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.zetcode"})
public class WebConfig {

}

The WebConfig enables Spring MVC annotations with
@EnableWebMvc and configures component scanning for the
com.zetcode package.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MyController {

    private static final Logger logger = LoggerFactory.getLogger(MyController.class);

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/user/{name}")
    public void process(@PathVariable String name) {

        logger.info("User name: {}", name);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/user/{name}/{email}")
    public void process2(@PathVariable String name, @PathVariable String email) {

        logger.info("User name: {} and email: {}", name, email);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/book/{author}/{title}")
    public void process3(@PathVariable Map&lt;String, String&gt; vals) {

        logger.info("{}: {}", vals.get("author"), vals.get("title"));

    }
}

We have three mappings for GET requests.

@ResponseStatus(value = HttpStatus.OK)
@GetMapping(value = "/user/{name}")
public void process(@PathVariable String name) {

    logger.info("User name: {}", name);
}

In this code, a URI template variable is bound to the name method parameter.

@ResponseStatus(value = HttpStatus.OK)
@GetMapping(value = "/user/{name}/{email}")
public void process2(@PathVariable String name, @PathVariable String email) {

    logger.info("User name: {} and email: {}", name, email);
}

Multiple variables can be bound, too, by specifying multiple @PathVariable
annotations.

@ResponseStatus(value = HttpStatus.OK)
@GetMapping(value = "/book/{author}/{title}")
public void process3(@PathVariable Map&lt;String, String&gt; vals) {

    logger.info("{}: {}", vals.get("author"), vals.get("title"));
}

Multiple variables can be bound also with Map&lt;String, String&gt;.

$ mvn jetty:run

We start the Jetty server.

$ curl localhost:8080/user/Peter/peter@gmail.com/

We issue a request with curl.

22:04:35.273 INFO  com.zetcode.controller.MyController - User name: Peter and email: peter@gmail.com

The application logs this message.

In this article, we have created a RESTful web application with Spring
framework. We have demonstrated the usage of @PathVariable.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).