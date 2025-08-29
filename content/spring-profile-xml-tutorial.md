+++
title = "Spring profile XML tutorial"
date = 2025-08-29T20:11:56.429+01:00
draft = false
description = "Spring profile XML tutorial shows how to configure profiles in XML for a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring profile XML tutorial

last modified October 18, 2023

Spring profile XML tutorial shows how to configure profiles in XML
for a Spring application.

Spring is a popular Java application framework for creating enterprise
applications.

## Spring profile

A profile is a named set of beans declared for a specific environment such as
development or production. Profiles can be configured in XML or using annotations.

## Spring profile example

The application defines two profiles: production and development.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               Application.java
│   └───resources
│           database-dev.properties
│           database-prod.properties
│           logback.xml
└───test
    └───java

This is the project structure. We have two property files: database-dev.properties
and database-prod.properties.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
            http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;profileex&lt;/artifactId&gt;
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
spring-context, spring-jdbc, and logging logback-classic dependency.

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

resources/database-dev.properties
  

db.url=jdbc:h2:mem:testdb
db.username=testuser
db.password=s$cret

These are development properties.

resources/database-prod.properties
  

db.url=jdbc:postgresql://localhost/mydb
db.username=user7
db.password=s$cret

These are production properties.

resources/my-beans.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd"&gt;

    &lt;context:property-placeholder location="classpath:database-${spring.profiles.active}.properties"/&gt;

    &lt;bean id="dataSource" class="org.springframework.jdbc.datasource.SimpleDriverDataSource"&gt;
        &lt;property name="url" value="${db.url}"/&gt;
        &lt;property name="username" value="${db.username}"/&gt;
        &lt;property name="password" value="${db.password}"/&gt;
    &lt;/bean&gt;

&lt;/beans&gt;

The my-beans.xml contains a dataSource bean.
The &lt;context:property-placeholder&gt; tag configures properties for the
datasource, based on the active Spring profile.

com/zetcode/Application.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        System.setProperty("spring.profiles.active", "prod");

        var ctx = new GenericXmlApplicationContext("my-beans.xml");

        var dataSource = (SimpleDriverDataSource) ctx.getBean("dataSource");

        logger.info("Url: {}", dataSource.getUrl());
        logger.info("User name: {}", dataSource.getUsername());
        logger.info("Password: {}", dataSource.getPassword());

        ctx.close();
    }
}

The application retrieves the dataSource bean and prints its properties.
The active property is set with System.setProperty method. Alternatively,
we can set the property as a VM variable -Dspring.profiles.active=prod
or in IDE settings.

$ mvn -q -Dspring.profiles.active=dev exec:java
20:30:45.832 INFO  com.zetcode.Application - Url: jdbc:h2:mem:testdb
20:30:45.832 INFO  com.zetcode.Application - User name: testuser
20:30:45.832 INFO  com.zetcode.Application - Password: s$cret

We run the application with the profile set on the command line

In this article we have created a development and production profile for a
Spring application.

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).