+++
title = "Spring BeanFactory tutorial"
date = 2025-08-29T20:11:47.287+01:00
draft = false
description = "Spring BeanFactory tutorial shows how use BeanFactory to work with beans in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring BeanFactory tutorial

last modified October 18, 2023

Spring BeanFactory tutorial shows how use BeanFactory to work with beans in a Spring application

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring BeanFactory

BeanFactory is a central registry of application components.
It centralizes configuration of application components. BeanFactory loads 
bean definitions stored in a configuration source such as an XML document or
a Java configuration. 

## Spring BeanFactory example

The application creates a bean factory, loads bean definitions from 
an XML configuration file and applies a post processor on the beans.

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
    &lt;artifactId&gt;beanfactory&lt;/artifactId&gt;
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

resources/database.properties
  

db.url=jdbc:h2:mem:testdb
db.username=testuser
db.password=s$cret

These properties are going to be inserted into a bean with a bean post processing
factory.

resources/my-beans.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd"&gt;

    &lt;bean id="dataSource" class="org.springframework.jdbc.datasource.SimpleDriverDataSource"&gt;
        &lt;property name="url" value="${db.url}"&gt;&lt;/property&gt;
        &lt;property name="username" value="${db.username}"&gt;&lt;/property&gt;
        &lt;property name="password" value="${db.password}"&gt;&lt;/property&gt;
    &lt;/bean&gt;

&lt;/beans&gt;

The my-beans.xml file declares a dataSource bean. 
The ${} syntax inserts values from an external properties file.

com/zetcode/Application.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.config.PropertyPlaceholderConfigurer;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var factory = new DefaultListableBeanFactory();
        var reader = new XmlBeanDefinitionReader(factory);
        reader.loadBeanDefinitions(new ClassPathResource("my-beans.xml"));

        var cfg = new PropertyPlaceholderConfigurer();
        cfg.setLocation(new ClassPathResource("database.properties"));
        cfg.postProcessBeanFactory(factory);

        var dataSource = (SimpleDriverDataSource) factory.getBean("dataSource");

        logger.info("Url: {}", dataSource.getUrl());
        logger.info("User name: {}", dataSource.getUsername());
        logger.info("Password: {}", dataSource.getPassword());
    }
}

The application creates a BeanFactory and registers a bean.

var factory = new DefaultListableBeanFactory();
var reader = new XmlBeanDefinitionReader(factory);
reader.loadBeanDefinitions(new ClassPathResource("my-beans.xml"));

A DefaultListableBeanFactory, which is an implementation of the BeanFactory,
is created. It reads beans from my-beans.xml configuration file with 
XmlBeanDefinitionReader. The bean definitions are loaded with loadBeanDefinitions.

var cfg = new PropertyPlaceholderConfigurer();
cfg.setLocation(new ClassPathResource("database.properties"));
cfg.postProcessBeanFactory(factory);

The PropertyPlaceholderConfigurer inserts properties into the bean from 
the database.properties file.

var dataSource = (SimpleDriverDataSource) factory.getBean("dataSource");

We get the bean from the factory with getBean.

logger.info("Url: {}", dataSource.getUrl());
logger.info("User name: {}", dataSource.getUsername());
logger.info("Password: {}", dataSource.getPassword());

We retrieve the dataSource bean attributes.

$ mvn -q exec:java
10:02:30.701 INFO  com.zetcode.Application - Url: jdbc:h2:mem:testdb
10:02:30.701 INFO  com.zetcode.Application - User name: testuser
10:02:30.701 INFO  com.zetcode.Application - Password: s$cret

We run the application. 

In this article we have shown how a BeanFactory is created and 
how bean definitions are loaded and post processed.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).