+++
title = "Spring @Autowired tutorial"
date = 2025-08-29T20:11:46.172+01:00
draft = false
description = "Spring @Autowired tutorial shows how to inject dependencies in a Spring application with @Autowired annotation."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @Autowired tutorial

last modified October 18, 2023

Spring @Autowired tutorial shows how to inject dependencies in a Spring
application with @Autowired annotation.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring @Autowired

@Autowired annotation marks a constructor, field, setter method or
config method to be autowired by Spring's dependency injection facilities.
It is an alternative to the JSR-330 @Inject annotation.

## Spring @Autowired example

The application injects a dependency with @Autowired. The dependency
is a service object that returns words. 

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───service
│   │                   WordService.java
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
    &lt;artifactId&gt;springautowired&lt;/artifactId&gt;
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

com/zetcode/service/WordService.java
  

package com.zetcode.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;

@Service
public class WordService {

    private final List&lt;String&gt; words = List.of("pen", "sky",
            "rock", "forest", "falcon", "eagle");

    public List&lt;String&gt; all() {

        return words;
    }

    public String randomWord() {

        return words.get(new Random().nextInt(words.size()));
    }
}

WordService class is annotated with the @Service
annotation. It is registered by Spring as a managed bean with the help of 
component scanning. This service object is later injected into the Application
with @Autowired.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.service.WordService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

@Component
@ComponentScan(basePackages="com.zetcode")
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    @Autowired
    private WordService wordService;

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(Application.class);

        var bean = ctx.getBean(Application.class);
        bean.run();

        ctx.close();
    }

    public void run() {

        logger.info("{}", wordService.randomWord());
        logger.info("{}", wordService.randomWord());

        var words = wordService.all();
        words.stream().forEach(word -&gt; logger.info("{}", word));
    }
}

The application is annotated with outputs words using the WordService. 
The service dependency is injected into the Application with 
@Autowired.

@Autowired
private WordService wordService;

This is called field injection. 

**Note:** While field injection is short and sweet, in general, it 
is recommended to use constructor or setter injection.

$ mvn -q exec:java
17:15:34.504 INFO  com.zetcode.Application - falcon
17:15:34.507 INFO  com.zetcode.Application - eagle
17:15:34.508 INFO  com.zetcode.Application - pen
17:15:34.508 INFO  com.zetcode.Application - sky
17:15:34.509 INFO  com.zetcode.Application - rock
17:15:34.509 INFO  com.zetcode.Application - forest
17:15:34.510 INFO  com.zetcode.Application - falcon
17:15:34.510 INFO  com.zetcode.Application - eagle

We run the application. 

In this article we have injected dependencies in Spring with @Autowired.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).