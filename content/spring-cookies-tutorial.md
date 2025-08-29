+++
title = "Spring cookies tutorial"
date = 2025-08-29T20:11:50.895+01:00
draft = false
description = "Spring cookies tutorial shows how to work with cookies in a Spring application. Cookies are read with @CookieValue annotation."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring cookies tutorial

last modified October 18, 2023

Spring cookies tutorial shows how to work with cookies in a Spring application.
Cookies are read with @CookieValue annotation.

Spring is a popular Java application framework for creating enterprise applications.

## Cookies

Cookie is a small piece of data that a server sends to the user's web
browser. The browser may store it and send it back with the next request to the
same server.

Cookies are mainly used for session management, personalization, and tracking.

## @CookieValue

@CookieValue is an annotation which indicates that a method parameter
should be bound to an HTTP cookie.

## HttpCookie

HttpCookie represents an HTTP cookie as a name-value pair
consistent with the content of the "Cookie" request header. The ResponseCookie
sub-class has the additional attributes expected in the "Set-Cookie" response
header.

## Spring cookies example

The following example creates a Spring web application that writes and reads a cookie.

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
    &lt;artifactId&gt;cookiesex&lt;/artifactId&gt;
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

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;9.4.49.v20220914&lt;/version&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

We declare the project dependencies. 

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

The logback.xml is a configuration file for the Logback logging library.

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

The WebConfig enables Spring MVC annotations with @EnableWebMvc
and configures component scanning for the com.zetcode package.

com/zetcode/MyController.java
  

package com.zetcode.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    private static final Logger logger = LoggerFactory.getLogger(MyController.class);

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/readCookie")
    public void readCookie(@CookieValue(value = "fav-col",
            defaultValue = "unknown") String favColour) {

        logger.info("Favourite colour: {}", favColour);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/writeCookie")
    public ResponseEntity writeCookie() {

        var favColour = "steelblue";
        var cookie = ResponseCookie.from("fav-col", favColour).build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .build();
    }
}

We have two GET mappings. The first mapping reads a cookie, the second one writes a cookie.

public void readCookie(@CookieValue(value = "fav-col",
        defaultValue = "unknown") String favColour) {

We read a cookie value with @CookieValue. There is a default value 
if the cookie is not set or has expired.

var favColour = "steelblue";
var cookie = ResponseCookie.from("fav-col", favColour).build();

return ResponseEntity.ok()
        .header(HttpHeaders.SET_COOKIE, cookie.toString())
        .build();

We create a cookie with ResponseCookie and set it to the 
response header.

$ mvn jetty:run

We start the Jetty server. Now, first locate the browser to the localhost:8080/writeCookie
and then read the cookie by navigating to localhost:8080/readCookie.

In this article we have work with cookies in Spring. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).