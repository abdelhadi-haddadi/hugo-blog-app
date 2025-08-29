+++
title = "Spring @ComponentScan tutorial"
date = 2025-08-29T20:11:49.597+01:00
draft = false
description = "Spring @ComponentScan tutorial shows how to enable component scanning in a Spring application. Component scanning enables auto-detection of beans by Spring container."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @ComponentScan tutorial

last modified October 18, 2023

Spring @ComponentScan tutorial shows how to enable component scanning in a Spring 
application. Component scanning enables auto-detection of beans by Spring container.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring @ComponentScan

@ComponentScan annotation enables component scanning in Spring. 
Java classes that are decorated with stereotypes such as @Component, 
@Configuration, @Service are auto-detected by Spring.
The @ComponentScan's basePackages attribute specifies
which packages should be scanned for decorated beans.

The @ComponentScan annotation is an alternative to 
&lt;context:component-scan&gt; XML tag.

## Spring @ComponentScan example

The application enables component scanning with @ComponentScan.
We have one service bean that returns the current time.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───service
│   │                   TimeService.java
│   └───resources
│           logback.xml
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
    &lt;artifactId&gt;componentscan&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

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
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-context&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-core&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;      
        
    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
                &lt;artifactId&gt;exec-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.1.0&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;mainClass&gt;com.zetcode.Application&lt;/mainClass&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

In the pom.xml file, we have basic Spring dependencies spring-core, 
spring-context, and logging logback-classic dependency.

The exec-maven-plugin is used for executing Spring application from the
Maven on the command line.

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

com/zetcode/service/TimeService.java
  

package com.zetcode.service;

import org.springframework.stereotype.Service;

import java.time.LocalTime;

@Service
public class TimeService {

    public LocalTime getTime() {

        var now = LocalTime.now();

        return now;
    }
}

The TimeService class is annotated with the @Service
annotation. It is registered by Spring as a managed bean with the help of 
component scanning.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.service.TimeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@ComponentScan(basePackages = "com.zetcode")
@Configuration
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(Application.class);

        var timeService = (TimeService) ctx.getBean("timeService");
        logger.info("The time is {}", timeService.getTime());

        ctx.close();
    }
}

The application is annotated with @ComponentScan. The basePackages
option tells Spring to look for components in the com/zetcode package and 
its subpackages.

var ctx = new AnnotationConfigApplicationContext(Application.class);

AnnotationConfigApplicationContext is a Spring standalone application context.
It accepts the annotated Application as an input; thus the scanning is 
enabled.

var timeService = (TimeService) ctx.getBean("timeService");
logger.info("The time is {}", timeService.getTime());

We get the registered service bean and call its method.

$ mvn -q exec:java
10:57:01.912 INFO  com.zetcode.Application - The time is 10:57:01.912235800

We run the application. 

In this article we have enabled component scanning with @ComponentScan.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).