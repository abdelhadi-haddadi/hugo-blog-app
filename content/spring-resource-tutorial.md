+++
title = "Spring Resource tutorial"
date = 2025-08-29T20:11:59.732+01:00
draft = false
description = "Spring Resource tutorial shows how to use Resource to work with various resources in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Resource tutorial

last modified October 18, 2023

Spring Resource tutorial shows how to use Resource to work with various resources 
in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring Resource

Resource abstracts from the actual type of an underlying resource, such as 
a file or class path resource. It can be used to identify local or remote resources.    

Spring ApplicationContext contains the getResource method, which 
returns a resource handle for the specified resource type. It can be a classpath, file, 
or URL resource.

## Spring Resource example

The application uses Spring's Resource to read a local file and a remote
web page.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───service
│   │                   MyService.java
│   └───resources
│           logback.xml
│           words.txt
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
    &lt;artifactId&gt;resourceex&lt;/artifactId&gt;
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

resources/words.txt
  

clean
sky
forest
blue
crystal
cloud
river

The words.txt file contains a couple of words.

com/zetcode/MyService.java
  

package com.zetcode.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
public class MyService {

    private static final Logger logger = LoggerFactory.getLogger(MyService.class);

    @Autowired
    private ApplicationContext ctx;

    public void readWebPage() {

        var res = ctx.getResource("http://webcode.me");

        try (var is = new InputStreamReader(res.getInputStream());
                var bis = new BufferedReader(is)) {

            bis.lines().forEach(System.out::println);

        } catch (IOException ex) {
            logger.warn("{}", ex);
        }
    }

    public void readFile() {

        // var res = ctx.getResource("file:C:/Users/Jano/Documents/words.txt");
        var res = ctx.getResource("classpath:words.txt");

        try (var is = new InputStreamReader(res.getInputStream());
                var bis = new BufferedReader(is)) {

            bis.lines().forEach(System.out::println);

        } catch (IOException ex) {
            logger.warn("{}", ex);
        }
    }
}

The MyService has two methods that read a web page and a local text file.

@Autowired
private ApplicationContext ctx;

We inject the ApplicationContext. We use its getResource method 
to get resource handlers.

var res = ctx.getResource("http://webcode.me");

We get a Resource from a web page.

// var res = ctx.getResource("file:C:/Users/Jano/Documents/words.txt");
var res = ctx.getResource("classpath:words.txt");

We can get a Resource from an absoute file path or a classpath.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.service.MyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.zetcode")
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    @Autowired
    private MyService myService;

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(Application.class);
        var app = ctx.getBean(Application.class);

        app.run();
        ctx.close();
    }

    public void run() {

        myService.readWebPage();
        myService.readFile();
    }
}

This is the main application class. 

@Autowired
private MyService myService;

A service bean is injected into the class with @Autowired.

myService.readWebPage();
myService.readFile();

We call the myService methods.

In this article we have shown how to use Resource to read a local text 
file and a web page.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).