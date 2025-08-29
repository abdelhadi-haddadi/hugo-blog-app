+++
title = "Spring Boot ApplicationContext"
date = 2025-08-29T20:12:04.279+01:00
draft = false
description = "Spring Boot ApplicationContext tutorial shows how to use ApplicationContext in Spring Boot application. ApplicationContext represents the Spring IoC container and is responsible for instantiating, configuring, and assembling the beans."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot ApplicationContext

last modified July 16, 2023

Spring Boot ApplicationContext tutorial shows how to use ApplicationContext
in a Spring Boot application.

Spring Boot is a popular framework for building enterprise 
applications in Java, Kotlin, or Groovy. 

## Spring ApplicationContext

ApplicationContext is a corner stone of a Spring Boot application.  
It represents the Spring IoC container and is responsible for instantiating, 
configuring, and assembling the beans. The container gets its instructions on
what objects to instantiate, configure, and assemble by reading configuration 
metadata. The configuration metadata is represented in XML, 
Java annotations, or Java code.

ApplicationContext provides the following:

    - Bean factory methods for accessing application components

    - The ability to load file resources in a generic way

    - The ability to publish events to registered listeners

    - The ability to resolve messages, supporting internationalization

ApplicationContext has several implementations. For instance, 
the ClassPathXmlApplicationContext takes configuration from an 
XML file on the classpath or AnnotationConfigApplicationContext, 
which reads configuration using annotations, especially @Configuration.

## Getting ApplicationContext

To access the application context, we can autowire the ApplicationContext
interface or implement the ApplicationContextAware.

## Spring Boot ApplicationContext example

In the following application, we access the application context and use 
its methods.

build.gradle
gradlew
gradlew.bat
settings.gradle
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───bean
│   │                   MyBean.java
│   └───resources
│           application.yml
└───test
    ├───java
    └───resources

This is the project structure of the Spring Boot application.

build.gradle
  

plugins {
    id 'java'
    id 'org.springframework.boot' version '2.2.2.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
}

group 'com.zetcode'
version '1.0-SNAPSHOT'

sourceCompatibility = 11

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter'
}

This is the Gradle build file. The spring-boot-starter is the core
starter that includes auto-configuration support, logging, and YAML. The
application is packaged into a JAR file.

resources/application.yml
  

spring:
  main:
    banner-mode: "off"
    log-startup-info: "false"
  
  application:
      name: "My application"

The application.yml file contains application configuration
settings. There are some built-in application properties and we can create our
custom ones. The banner-mode property is a Spring built-in
property; we turn off the Spring's banner.  
With the log-startup-info property, we can turn off 
the startup logging information. The name is a property to set 
the application name.

com/zetcode/bean/MyBean.java
  

package com.zetcode.bean;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class MyBean implements ApplicationContextAware {

    private String applicationId;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) 
            throws BeansException {

        applicationId = applicationContext.getId();
    }

    public String getApplicationId() {

        return applicationId;
    }
}

MyBean implements the ApplicationContextAware. 
Spring Boot injects the application context into the parameter of the 
setApplicationContext method, where we get the Id of the 
Spring application. (The Id here is the name of the application.)

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.bean.MyBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class Application implements CommandLineRunner {

    @Autowired
    private ApplicationContext applicationContext;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println(applicationContext.getDisplayName());
        System.out.println(applicationContext.getId());

        MyBean myBean = applicationContext.getBean(MyBean.class);
        System.out.println(myBean.getApplicationId());
    }
}

In the Application, we create a bean, call its method and
set up the Spring Boot application. The CommandLineRunner interface
indicates that a bean should run when it is contained within a SpringApplication.
It can be used to create command line applications in Spring Boot.

@SpringBootApplication
public class Application implements CommandLineRunner {

The @SpringBootApplication annotation enables auto-configuration
and component scanning. Spring Boot finds the MyBean annotation 
and loads it into the application context bean factory.

@Autowired
private ApplicationContext applicationContext;

With the @Autowired annotation we inject our 
ApplicationContext bean into the field. Now we can access the methods 
of the context.

System.out.println(applicationContext.getDisplayName());
System.out.println(applicationContext.getId());

We print the application context's display name and Id. 

MyBean myBean = applicationContext.getBean(MyBean.class);
System.out.println(myBean.getApplicationId());

We get the MyBean from the bean factory with the getBean
method. Then we call its getApplicationId method. 

$ gradlew -q bootRun
org.springframework.context.annotation.AnnotationConfigApplicationContext@51a9ad5e
My application
My application

We run the application with gradlew -q bootRun. From the output we 
can see, that we use the AnnotationConfigApplicationContext.

In this article we have introduced the Spring Boot ApplicationContext.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).