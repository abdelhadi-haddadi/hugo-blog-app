+++
title = "Spring AnnotationConfigApplicationContext"
date = 2025-08-29T20:11:45.067+01:00
draft = false
description = "Spring AnnotationConfigApplicationContext tutorial shows how to use AnnotationConfigApplicationContext in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring AnnotationConfigApplicationContext

last modified October 18, 2023

Spring AnnotationConfigApplicationContext tutorial shows
how to use AnnotationConfigApplicationContext in a Spring application.

Spring is a popular Java application framework. 

## AnnotationConfigApplicationContext

AnnotationConfigApplicationContext is a standalone application context which 
accepts annotated classes as input. For instance, @Configuration or @Component.
Beans can be looked up with scan or registered with register.

## Spring AnnotationConfigApplicationContext example

The following example uses AnnotationConfigApplicationContext to build 
a standalone Spring application. It has one Spring bean--DateTimeService--, which 
is located with scan.

pom.mxl
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───bean
│   │                   DateTimeService.java
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
    &lt;artifactId&gt;annotappctx&lt;/artifactId&gt;
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

This is the Maven build file for our Spring application.

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

This is the Logback configuration file. 

com/zetcode/bean/DateTimeService.java
  

package com.zetcode.bean;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class DateTimeService {

    public LocalDate getDate() {

        return LocalDate.now();
    }

    public LocalTime getTime() {

        return LocalTime.now();
    }

    public LocalDateTime getDateTime() {

        return LocalDateTime.now();
    }
}

The DateTimeService is a service class that provides data and time 
services. It is decorated with @Service stereotype, which causes it to 
be detected by the scanning process.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.bean.DateTimeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    @Autowired
    private DateTimeService dateTimeService;

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext();
        ctx.scan("com.zetcode");
        ctx.refresh();

        var bean = ctx.getBean(Application.class);
        bean.run();

        ctx.close();
    }

    public void run() {

        logger.info("Current time: {}", dateTimeService.getTime());
        logger.info("Current date: {}", dateTimeService.getDate());
        logger.info("Current datetime: {}", dateTimeService.getDateTime());
    }
}

We set up the application and inject the DateTimeService. We call 
all three service methods.

@Component
public class Application {

The Application is also decorated with a stereotype, this time @Component.
It will also be detected by Spring. We need to call its run method to go 
outside the static context.

@Autowired
private DateTimeService dateTimeService;    

The service class is injected with @Autowired.

var ctx = new AnnotationConfigApplicationContext();
ctx.scan("com.zetcode");
ctx.refresh();

A new AnnotationConfigApplicationContext is created. The scan
method scans the com.zetcode package and its subpackages for annotated classes
to generate beans. We need to call the refresh method to finish the process.

public void run() {

    logger.info("Current time: {}", dateTimeService.getTime());
    logger.info("Current date: {}", dateTimeService.getDate());
    logger.info("Current datetime: {}", dateTimeService.getDateTime());
}

We get the current date, time, and datetime. 

$ mvn package
$ mvn -q exec:java
19:25:12.842 INFO  com.zetcode.Application - Current time: 19:25:12.842639200
19:25:12.842 INFO  com.zetcode.Application - Current date: 2019-01-05
19:25:12.842 INFO  com.zetcode.Application - Current datetime: 2019-01-05T19:25:12.842639200

We run the application.    

In this article we have used AnnotationConfigApplicationContext 
to create a new standalone Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).