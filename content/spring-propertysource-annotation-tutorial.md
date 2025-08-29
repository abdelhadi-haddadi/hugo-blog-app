+++
title = "Spring @PropertySource annotation tutorial"
date = 2025-08-29T20:11:57.527+01:00
draft = false
description = "Spring @PropertySource tutorial shows how to use @PropertySource annotation to include properties in the Environment and inject properties with @Value."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @PropertySource annotation tutorial

last modified October 18, 2023

Spring @PropertySource annotation tutorial shows how to use @PropertySource annotation to 
include properties into the Environment and inject properties with @Value.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring @PropertySource

@PropertySource is a convenient annotation for including PropertySource
to Spring's Environment and allowing to inject properties via @Value into class
attributes. (PropertySource is an object representing a set of property pairs
from a particular source.)

@PropertySource is used together with @Configuration.

## Spring @PropertySource example

The application uses Spring's @PropertySource to include properties from 
the application.properties file into the Environment and to inject them 
into class attributes.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───config
│   │                   AppConfig.java
│   └───resources
│           application.properties
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
    &lt;artifactId&gt;propertysource&lt;/artifactId&gt;
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

resources/application.properties
  

app.name=My application
app.version=1.1

We have two properties in application.properties file.

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value = "application.properties", ignoreResourceNotFound = true)
public class AppConfig {

}

AppConfig is the application configuration class. The @PropertySource
injects properties from the application.properties into the Spring's Environment.

com/zetcode/Application.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.core.env.Environment;

@ComponentScan(basePackages = "com.zetcode")
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    @Autowired
    private Environment env;

    @Value("${app.name}")
    private String appName;

    @Value("${app.version}")
    private String appVersion;

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(Application.class);
        var app = ctx.getBean(Application.class);

        app.run();

        ctx.close();
    }

    private void run() {

        logger.info("From Environment");
        logger.info("Application name: {}", env.getProperty("app.name"));
        logger.info("Application version: {}", env.getProperty("app.version"));

        logger.info("Using @Value injection");
        logger.info("Application name: {}", appName);
        logger.info("Application version: {}", appVersion);
    }
}

In the Application, we get the properties using two methods.

@Autowired
private Environment env;

We inject the Environment. We can retrieve the properties with 
its getProperty method.

@Value("${app.name}")
private String appName;

@Value("${app.version}")
private String appVersion;

We inject the properties with @Value annotation into the attributes.

logger.info("From Environment");
logger.info("Application name: {}", env.getProperty("app.name"));
logger.info("Application version: {}", env.getProperty("app.version"));

The first way to retrieve properties is from the Environment using
the getProperty method.

logger.info("Using @Value injection");
logger.info("Application name: {}", appName);
logger.info("Application version: {}", appVersion);

The second way is to use the injected attributes.

$ mvn -q exec:java
15:00:20.653 INFO  com.zetcode.Application - From Environment 
15:00:20.668 INFO  com.zetcode.Application - Application name: My application 
15:00:20.668 INFO  com.zetcode.Application - Application version: 1.1 
15:00:20.668 INFO  com.zetcode.Application - Using @Value injection 
15:00:20.668 INFO  com.zetcode.Application - Application name: My application 
15:00:20.668 INFO  com.zetcode.Application - Application version: 1.1 

We run the application.

In this article we have shown how to use @PropertySource annotation to conveniently
work with properties in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).