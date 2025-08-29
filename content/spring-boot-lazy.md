+++
title = "Spring Boot @Lazy"
date = 2025-08-29T20:12:21.927+01:00
draft = false
description = "Spring Boot @Lazy tutorial shows how to lazily intialize beans with @Lazy annotation. A @Lazy bean is not initialized until referenced by another bean or explicitly retrieved from BeanFactory."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @Lazy

last modified July 23, 2023

In this article we show how to lazily intialize beans with Spring @Lazy
annotation.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort. 

## @Lazy

@Lazy annotation indicates whether a bean is to be 
lazily initialized. It can be used on @Component and
@Bean definitions. A @Lazy bean is not 
initialized until referenced by another bean or explicitly retrieved 
from BeanFactory. Beans that are not annotated with @Lazy
are initialized eagerly.

## Spring Boot @Lazy example

In the following example we create beans that are initialized lazily and eagerly. 
It demostrates the difference between the two types of beans. The application is 
a simple Spring Boot web application, which runs on embedded Tomcat server. 
We use Freemarker template engine.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── bean
│   │           │   ├── MyBean.java
│   │           │   ├── MyLazyBean.java
│   │           │   └── StartUpBean.java
│   │           └── controller
│   │               └── MyController.java
│   └── resources
│       ├── application.properties
│       ├── static
│       │   └── index.html
│       └── templates
│           └── showMessages.ftlh
└── test
    └── java

This is the project structure.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
}

This is the build.gradle file. 

resources/application.properties
  

spring.main.banner-mode=off
logging.level.org.springframework=ERROR

In the application.properties we turn off the banner and set 
the logging level.

com/zetcode/bean/MyBean.java
  

package com.zetcode.bean;

import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class MyBean {

    static Logger log = Logger.getLogger(MyBean.class.getName());

    public MyBean() {

        log.info("MyBean initialized");
    }

    public String getMessage() {

        return "Message from MyBean";
    }
}

This is MyBean. This bean is initialized eagerly, that is, 
at the start of the Spring framework.

com/zetcode/bean/MyLazyBean.java
  

package com.zetcode.bean;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
@Lazy
public class MyLazyBean {

    static Logger log = Logger.getLogger(MyLazyBean.class.getName());

    public MyLazyBean() {

        log.info("MyLazyBean initialized");
    }

    public String getMessage() {

        return "Message from MyLazyBean";
    }
}

MyLazyBean contains the @Lazy annotation. It is 
initialized lazily, when first requested. It is requested from the controller.

com/zetcode/bean/StartUpBean.java
  

package com.zetcode.bean;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class StartUpBean implements 
        ApplicationListener&lt;ApplicationReadyEvent&gt; {

    static Logger log = Logger.getLogger(StartUpBean.class.getName());

    @Override
    public void onApplicationEvent(ApplicationReadyEvent applicationReadyEvent) {

        log.info("Application is ready");
    }
}

StartUpBean implements an application listener; it logs a message
when the application is ready.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.MyBean;
import com.zetcode.bean.MyLazyBean;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {
    
    private final BeanFactory factory;

    @Autowired
    public MyController(BeanFactory factory) {
        this.factory = factory;
    }

    @GetMapping(path="/messages")
    public String getMessages(Model model) {

        MyLazyBean myLazyBean = factory.getBean(MyLazyBean.class);
        MyBean myBean = factory.getBean(MyBean.class);

        model.addAttribute("mybean", myBean.getMessage());
        model.addAttribute("mylazybean", myLazyBean.getMessage());

        return "showMessages";
    }
}

This is a controller class. It creates the two beans and receives their
messages. The messages are displayd in a Freemarker template.

private final BeanFactory factory;

@Autowired
public MyController(BeanFactory factory) {
    this.factory = factory;
}

We inject the BeanFactory. The factory is used for accessing
Spring beans.

MyLazyBean myLazyBean = factory.getBean(MyLazyBean.class);

This is the moment when the MyLazyBean is initialized.

MyBean myBean = factory.getBean(MyBean.class);

We get the MyBean from the factory; MyBean
was initialized at Spring's startup.

resources/templates/showMessages.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Show data&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;/head&gt;
    &lt;body&gt;

        &lt;p&gt;
            MyBean: ${mybean}
        &lt;/p&gt;

        &lt;p&gt;
            MyLazyBean: ${mylazybean}
        &lt;/p&gt;

    &lt;/body&gt;
&lt;/html&gt;

The Freemarker template displays the messages from the two beans.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;a href="messages"&gt;Get messages&lt;/a&gt;

&lt;/body&gt;
&lt;/html&gt;

In the index.html there is a link to get the messages from
beans.

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

The Application sets up the Spring Boot application. 
The @SpringBootApplication enables auto-configuration and 
component scanning.

$ ./gradlew bootRun

We start the application.

Initializing Spring embedded WebApplicationContext
com.zetcode.bean.MyBean : MyBean initialized
com.zetcode.Application : Started Application in 2.483 seconds (JVM running for 2.854)
com.zetcode.bean.StartUpBean : Application is ready

We can see these log messages when Spring Boot starts. Notice that MyBean
was initialized at startup.

com.zetcode.bean.MyLazyBean : MyLazyBean initialized

When the controller is called, the MyLazyBean is initialized.

In this article we have showed how to use Spring @Lazy annotation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).