+++
title = "Spring Boot listing beans"
date = 2025-08-29T20:12:21.906+01:00
draft = false
description = "Spring Boot listing beans shows how to list all beans stored in the Spring container, including built-in and custom beans."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot listing beans

last modified July 16, 2023

Spring Boot listing beans shows how to list all beans stored in the Spring
container, including built-in and custom beans.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring which helps create stand-alone, production-grade
Spring based applications with minimal effort.

The core Spring containter creates and manages beans. The beans are available
throught ApplicationContext.
In the following application, we list all stored beans. 
The application is command line Spring Boot application.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           └───bean
│   │                   MyBean.java
│   └───resources
└───test
    ├───java
    └───resources

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
starter that includes auto-configuration support, logging, and YAML. 

com/zetcode/bean/MyBean.java
  

package com.zetcode.bean;

import org.springframework.stereotype.Component;

@Component
public class MyBean {
    
    private final String message = "This is MyBean";
    
    public String getMessage() {
        
        return message;
    }
}

The MyBean is a custom bean that is created and managed by Spring.
Classes decorated by @Component annotation are auto-detected by
Spring and stored in Spring container.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.bean.MyBean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private final ApplicationContext appContext;
    private final MyBean myBean;

    public MyRunner(ApplicationContext appContext, MyBean myBean) {
        this.appContext = appContext;
        this.myBean = myBean;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println(myBean.getMessage());

        System.out.println("List of beans:");

        String[] beans = appContext.getBeanDefinitionNames();

        for (String bean : beans) {
            System.out.println(bean);
        }
    }
}

The CommandLineRunner interface indicates that a bean 
should run when it is contained within a SpringApplication.
It can be used to create Spring Boot command line applications.

@Component
public class MyRunner implements CommandLineRunner {

MyRunner is a Spring bean as well and is listed among the beans.

public MyRunner(ApplicationContext appContext, MyBean myBean) {
    this.appContext = appContext;
    this.myBean = myBean;
}

The ApplicationContext and the custom MyBean are
injected into the fields in constructor injection.

System.out.println(myBean.getMessage());

Here we print the message stored in our custom bean.

String[] beans = appContext.getBeanDefinitionNames();

From the application context, we get an array of bean names with the
getBeanDefinitionNames.

for (String bean : beans) {
    System.out.println(bean);
}

The bean names are printed to the console.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

In the Application, set up the Spring Boot application. The 
set up the Spring Boot application. The @SpringBootApplication 
enables auto-configuration and component scanning. Spring will automatically
scan for beans and will pick up both MyBean and MyRunner.

$ ./gradlew -q bootRun
...
This is MyBean
List of beans:
org.springframework.context.annotation.internalConfigurationAnnotationProcessor
org.springframework.context.annotation.internalAutowiredAnnotationProcessor
org.springframework.context.annotation.internalCommonAnnotationProcessor
org.springframework.context.event.internalEventListenerProcessor
org.springframework.context.event.internalEventListenerFactory
application
org.springframework.boot.autoconfigure.internalCachingMetadataReaderFactory
myRunner
myBean
...

We run the application. The -q option turns off Gradle messages.

In this article we have listed all beans stored in a Spring container.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [Spring Boot tutorials](/all/#springboot).