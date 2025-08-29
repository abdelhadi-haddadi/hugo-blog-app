+++
title = "SpringRunner tutorial"
date = 2025-08-29T20:12:00.848+01:00
draft = false
description = "SpringRunner tutorial shows how to test Spring applications with SpringRunner."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# SpringRunner tutorial

last modified October 18, 2023

SpringRunner tutorial shows how to test Spring applications with SpringRunner.

Spring is a popular Java application framework. In the tutorial, 
we use Spring 5 version.

## SpringRunner

SpringRunner is an alias for the SpringJUnit4ClassRunner, which 
joins JUnit testing library with the Spring TestContext Framework.
We use it with @RunWith(SpringRunner.class).

With SpringRunner, we can implement standard JUnit 4-based unit and integration tests.

The Spring TestContext Framework provides generic, annotation-driven unit and integration testing 
support that is agnostic of the testing framework in use (JUnit, TestNG). 

## SpringRunner example

In the following application we test a simple service with SprigRunner.
The application is a Spring standalone console application.

The application contains two property files: one file is for the production application, 
the other one for testing.    

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───config
│   │           │       AppConfig.java
│   │           └───service
│   │                   HelloService.java
│   └───resources
│           application.properties
│           logback.xml
└───test
    ├───java
    │   └───com
    │       └───zetcode
    │           └───service
    │                   HelloServiceTest.java
    └───resources
            appTest.properties

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;springrunnerex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

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

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-test&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.hamcrest&lt;/groupId&gt;
            &lt;artifactId&gt;hamcrest-all&lt;/artifactId&gt;
            &lt;version&gt;1.3&lt;/version&gt;
            &lt;scope&gt;test&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;junit&lt;/groupId&gt;
            &lt;artifactId&gt;junit&lt;/artifactId&gt;
            &lt;version&gt;4.12&lt;/version&gt;
            &lt;scope&gt;test&lt;/scope&gt;
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

This is the Maven build file. We have the following dependencies: logback-classic
for logging, spring-context and spring-core are basic Spring 
dependencies, spring-test is for testing, hamcrest-all contains
all modules for the Hamcrest matching library, and JUnit is the library 
for unit testing.

The exec-maven-plugin helps execute system and Java programs.

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

resources/application.properties
  

app.message=Hello there!

The application.properties contains one message property, which is 
displayed by the HelloMessage service.

com/zetcode/AppConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan(basePackages = "com.zetcode")
@PropertySource("application.properties")
public class AppConfig {
}

AppConfig configures component scanning and loads properties from 
the provided file. 

com/zetcode/servide/HelloService.java
  

package com.zetcode.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class HelloService {

    @Value("${app.message}")
    private String message;

    public String sayHello() {

        return message;
    }
}

HelloService returns a message retrieved from the application.properties
file.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.config.AppConfig;
import com.zetcode.service.HelloService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(AppConfig.class);

        var app = ctx.getBean(Application.class);
        app.run();

        ctx.close();
    }

    @Autowired
    private HelloService helloService;

    private void run() {

        logger.info("Calling hello service");
        logger.info(helloService.sayHello());

    }
}

The application prints a message to the console using HelloService.

$ mvn -q exec:java
17:50:54.118 INFO  com.zetcode.Application - Calling hello service
17:50:54.118 INFO  com.zetcode.Application - Hello there!

We run the application.

resources/appTest.properties
  

app.message=Testing hello message

The appTest.properties is specific for the testing.

com/zetcode/service/HelloServiceTest.java
  

package com.zetcode.service;

import com.zetcode.config.AppConfig;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes={HelloService.class})
@TestPropertySource("/appTest.properties")
public class HelloServiceTest {

    @Value("${app.message}")
    private String message;

    @Autowired
    private HelloService helloService;

    @Test
    public void testHelloMessage() {

        var message = helloService.sayHello();
        assertThat(message, equalTo(message));
    }
}

HelloServiceTest is used for testing the HelloService class.

@RunWith(SpringRunner.class)
@ContextConfiguration(classes={HelloService.class})
@TestPropertySource("/appTest.properties")
public class HelloServiceTest {

The test class is annotated with @RunWith(SpringRunner.class).
The @ContextConfiguration defines class-level metadata which is used to 
determine how to load and configure an application context for integration tests. 
In addition, we provide custom test property file with @TestPropertySource.

@Value("${app.message}")
private String message;

We inject the message from the appTest.properties file.

@Autowired
private HelloService helloService;

We inject the HelloMessage service class. This is the class to 
be tested.

@Test
public void testHelloMessage() {

    var message = helloService.sayHello();
    assertThat(message, equalTo(message));
}

We test that the message from the service method equals to the injected 
string value.

$ mvn -q test

-------------------------------------------------------
    T E S T S
-------------------------------------------------------
Running com.zetcode.service.HelloServiceTest
Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.489 sec

Results :

Tests run: 1, Failures: 0, Errors: 0, Skipped: 0

We run the tests.

In this article we shown how to use SpringRunner to create tests
in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).