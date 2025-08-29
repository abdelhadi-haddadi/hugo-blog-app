+++
title = "Spring context:property-placeholder tutorial"
date = 2025-08-29T20:11:57.515+01:00
draft = false
description = "Spring context:property-placeholder tutorial shows how to use context:property-placeholder tag to externalize properties in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring context:property-placeholder tutorial

last modified October 18, 2023

Spring context:property-placeholder tutorial shows how to use context:property-placeholder 
tag to externalize properties in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring context:property-placeholder

The context:property-placeholder tag is used to externalize properties in a separate
file. It automatically configures PropertyPlaceholderConfigurer, which replaces 
the ${} placeholders, which are resolved against a specified properties file 
(as a Spring resource location).

## Spring context:property-placeholder example

The application uses context:property-placeholder to configure
properties of a datasource.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               Application.java
│   └───resources
│           database.properties
│           logback.xml
│           my-beans.xml
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
    &lt;artifactId&gt;propertyplaceholder&lt;/artifactId&gt;
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

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
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
spring-context, spring-jdbc and logging logback-classic dependency.

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

resources/database.properties
  

db.url=jdbc:h2:mem:testdb
db.username=testuser
db.password=s$cret

These values are externalized in a database.properties file. This approach
is more flexible than placing the values right into the XML file.

resources/my-beans.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd"&gt;

    &lt;context:property-placeholder location="classpath:database.properties"/&gt;

    &lt;bean id="dataSource" class="org.springframework.jdbc.datasource.SimpleDriverDataSource"&gt;
        &lt;property name="url" value="${db.url}"&gt;&lt;/property&gt;
        &lt;property name="username" value="${db.username}"&gt;&lt;/property&gt;
        &lt;property name="password" value="${db.password}"&gt;&lt;/property&gt;
    &lt;/bean&gt;

&lt;/beans&gt;

The context:property-placeholder specifies the location of the properties
file; in our case, it is database.properties file in any classpath directory.

&lt;bean id="dataSource" class="org.springframework.jdbc.datasource.SimpleDriverDataSource"&gt;
    &lt;property name="url" value="${db.url}"&gt;&lt;/property&gt;
    &lt;property name="username" value="${db.username}"&gt;&lt;/property&gt;
    &lt;property name="password" value="${db.password}"&gt;&lt;/property&gt;
&lt;/bean&gt;    

A dataSource bean is defined. It takes its values from the properties file via 
the ${} syntax.

com/zetcode/Application.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new GenericXmlApplicationContext("my-beans.xml");

        var dataSource = (SimpleDriverDataSource) ctx.getBean("dataSource");

        logger.info("Url: {}", dataSource.getUrl());
        logger.info("User name: {}", dataSource.getUsername());
        logger.info("Password: {}", dataSource.getPassword());

        ctx.close();
    }
}

This is the main application class. It retrieves the dataSource bean 
and prints its properties.

$ mvn -q exec:java
11:27:43.790 INFO  com.zetcode.Application - Url: jdbc:h2:mem:testdb 
11:27:43.790 INFO  com.zetcode.Application - User name: testuser 
11:27:43.790 INFO  com.zetcode.Application - Password: s$cret 

We run the application. 

In this article we have shown how to use context:property-placeholder to
externalize properties.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).