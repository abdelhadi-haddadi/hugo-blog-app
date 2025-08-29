+++
title = "Spring @Configuration tutorial"
date = 2025-08-29T20:11:49.677+01:00
draft = false
description = "Spring @Configuration tutorial shows how to configure Spring application using @Configuration annotation."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @Configuration tutorial

last modified October 18, 2023

Spring @Configuration annotation tutorial shows how to configure
Spring application using @Configuration annotation.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring @Configuration

@Configuration annotation is used for Spring annotation based configuration. 
The @Configuration is a marker annotation which indicates that a class 
declares one or more @Bean methods and may be processed
by the Spring container to generate bean definitions and service requests for
those beans at runtime

## Spring @Configuration example

The following application uses @Configuration to configure a Spring 
application. 

pom.xml
src
└───src
    ├───main
    │   ├───java
    │   │   └───com
    │   │       └───zetcode
    │   │           │   Application.java
    │   │           └───config
    │   │                   AppConfig.java
    │   │                   H2Configurer.java
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
    &lt;artifactId&gt;configurationex&lt;/artifactId&gt;
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
app.db=H2

Here we have some application properties.

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@ComponentScan(basePackages = "com.zetcode")
@PropertySource(value = "application.properties")
public class AppConfig {

    @Bean
    public H2Configurer databaseConfig() {
        return new H2Configurer();
    }
}

AppConfig is the application configuration class. It is 
decorated with the @Configuration annotation, which is a specialization 
of the @Component.

@Configuration
@ComponentScan(basePackages = "com.zetcode")
@PropertySource(value = "application.properties")
public class AppConfig {

Component scanning is enabled with @ComponentScan and the resources
are loaded with @PropertySource.

@Bean
public H2Configurer databaseConfig() {
    return new H2Configurer();
}

With @Bean annotation, we create a H2Configurer bean.

com/zetcode/config/H2Configurer.java
  

package com.zetcode.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class H2Configurer {

    private static final Logger logger = LoggerFactory.getLogger(H2Configurer.class);

    public H2Configurer() {

        logger.info("Configuring H2 database");
    }
}

The H2Configurer simply logs a message.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.config.AppConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${app.name}")
    private String applicationName;

    @Value("${app.db}")
    private String database;

    private void run() {

        logger.info("Application name: {}", applicationName);
        logger.info("Database: {}", database);

    }
}

The application class prints the application properties. The properties are 
injected into the attributes with @Value.

var ctx = new AnnotationConfigApplicationContext(AppConfig.class);

The AppConfig is loaded into the application context.

$ mvn -q exec:java
20:07:39.769 INFO  com.zetcode.config.H2Configurer - Configuring H2 database 
20:07:39.801 INFO  com.zetcode.Application - Application name: My application 
20:07:39.816 INFO  com.zetcode.Application - Database: H2 

We run the application. 

In this article we have configured a Spring application with @Configuration.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).