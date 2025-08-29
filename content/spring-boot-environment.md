+++
title = "Spring Boot Environment"
date = 2025-08-29T20:12:15.241+01:00
draft = false
description = "Spring Boot Environment tutorial shows how to read environment variables in Spring Boot."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Environment

last modified July 16, 2023

Spring Boot Environment shows how to read environment variables in Spring Boot.
A Spring Boot application can be deployed in a variety of environments and
reading environment variables can be helpful in such cases.

Spring is a popular Java application framework and Spring Boot 
is a next step of evolution of Spring which helps create stand-alone,
production-grade Spring based applications with minimal effort.

Environment is an interface representing the environment in which
the current application is running. It can be use to get profiles and properties
of the application environment.

$ echo $JAVA_HOME
/home/jano/.jdks/corretto-17.0.3

In this sample case, we have a JAVA_HOME environment variable
defined.

build.gradle
...
src
├── main
│&nbsp;  ├── java
│   │   └── com
│   │       └── zetcode
│   │           └── Application.java
│   └── resources
│       ├── application.properties
│       └── logback.xml
└── test
    ├── java
    └── resources

This is the project structure of the Spring Boot application.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
}

This is the Gradle build file. The spring-boot-starter is the core
starter that includes auto-configuration support, logging, and YAML. The
application is packaged into a JAR file.

resources/application.properties
  

spring.main.banner-mode=off
spring.output.ansi.enabled=ALWAYS
logging.pattern.console=%clr(%d{yy-MM-dd E HH:mm:ss.SSS}){blue} %clr(%-5p) %clr(%logger{0}){blue} %clr(%m){faint}%n

app.name=MyApp

The application.properties file contains application configuration
settings. Spring has some built-in application properties and we can create our
custom ones. The spring.main.banner-mode property is a Spring
built-in property; we turn off the Spring's banner. The next two lines set up
logging with colour support. The app.name is our custom property
that contains the application name.

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;include resource="org/springframework/boot/logging/logback/base.xml" /&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="INFO"/&gt;
&lt;/configuration&gt;

The application logging is configured in the logback.xml file.
We set the level of logging levels. We don't want our output to be cluttered
with unnecessary messages. The spring-boot-starter dependency
enables logback for logging.

com/zetcode/Application.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class Application implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    private final Environment env;

    public Application(Environment env) {
        this.env = env;
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("{}", env.getProperty("JAVA_HOME"));
        logger.info("{}", env.getProperty("app.name"));
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

In the Application, we create a bean, call its method and set up
the Spring Boot application. The CommandLineRunner interface
indicates that a bean should run when it is contained within a
SpringApplication. It can be used to create command line
applications in Spring Boot.

@SpringBootApplication
public class Application implements CommandLineRunner {

The  @SpringBootApplication annotation enables auto-configuration 
and component scanning. 

private final Environment env;

public Application(Environment env) {
    this.env = env;
}

We inject the Environment in order to obtain the properties.

logger.info("{}", env.getProperty("JAVA_HOME"));

Here, we retrieve the JAVA_HOME environment variable.

logger.info("{}", env.getProperty("app.name"));

Environment can be used to get the properties from the 
application.properties file as well: get the 
app.name property.

$ ./gradlew bootRun
...
22-05-19 Thu 11:03:03.217 INFO  Application /home/jano/.jdks/corretto-17.0.3
22-05-19 Thu 11:03:03.218 INFO  Application MyApp

We run the application. 

In this article we have used Spring Environment to read
environment variable. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).