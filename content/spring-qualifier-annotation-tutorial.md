+++
title = "Spring @Qualifier annotation tutorial"
date = 2025-08-29T20:11:58.650+01:00
draft = false
description = "Spring @Qualifier annotation tutorial shows how to use @Qualifier to differentiate beans in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @Qualifier annotation tutorial

last modified October 18, 2023

Spring @Qualifier annotation tutorial shows how to use @Qualifier to differentiate 
beans in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring @Qualifier annotation

The @Qualifier annotation helps disambiguate bean references when Spring
would otherwise not be able to do so.

## Spring @Qualifier example

The application has different types of message beans. We differentiate between them
with @Qualifier.

src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───bean
│   │           │       IMessage.java
│   │           │       Info.java
│   │           │       Warning.java
│   │           └───service
│   │                   MessageProducer.java
│   └───resources
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
    &lt;artifactId&gt;qualifierannotation&lt;/artifactId&gt;
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

In the pom.xml file, we have basic Spring dependencies spring-core
and spring-context and logging logback-classic dependency.

The exec-maven-plugin is used for executing Spring application from the
Maven on the command line.

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="INFO"/&gt;

    &lt;appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender"&gt;
        &lt;encoder&gt;
            &lt;Pattern&gt;%d{HH:mm:ss.SSS} [%thread] %blue(%-5level) %magenta(%logger{36}) - %msg %n
            &lt;/Pattern&gt;
        &lt;/encoder&gt;
    &lt;/appender&gt;

    &lt;root&gt;
        &lt;level value="INFO" /&gt;
        &lt;appender-ref ref="consoleAppender" /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;

The logback.xml is a configuration file for the Logback logging library.

com/zetcode/bean/IMessage.java
  

package com.zetcode.bean;

public interface IMessage {

    String getMessage();
}

The IMessage interface has one method declaration.

com/zetcode/bean/Info.java
  

package com.zetcode.bean;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("info")
public class Info implements IMessage {

    @Override
    public String getMessage() {

        return "This is an information message";
    }
}

The first implementation of the interface gives an information message.
The @Qualifier is used to identify the bean.

com/zetcode/bean/Warning.java
  

package com.zetcode.bean;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("warning")
public class Warning implements IMessage {

    public String getMessage() {

        return "This is a warning message";
    }
}

The second implementation gives a warning message. It is also named with 
the @Qualifier.

com/zetcode/service/MessageProducer.java
  

package com.zetcode.service;

import com.zetcode.bean.IMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class MessageProducer {

    private static final Logger logger = LoggerFactory.getLogger(MessageProducer.class);

    @Autowired
    @Qualifier("info")
    private IMessage infoMessage;

    @Autowired
    @Qualifier("warning")
    private IMessage warningMessage;

    public void produce() {

        logger.info("{}", infoMessage.getMessage());
        logger.warn("{}", warningMessage.getMessage());
    }
}

The MessageProducer injects two IMessage beans. To differentiate between them,
we use @Qualifier annotations.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.service.MessageProducer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.zetcode.bean;com.zetcode.service")
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        logger.info("Application starting");

        try (var ctx = new AnnotationConfigApplicationContext(Application.class)) {

            var messageProducer = (MessageProducer) ctx.getBean("messageProducer");
            messageProducer.produce();
        }
    }
}

This is the main application class. It retrieves the messageProducer bean
and call its produce method.

$ mvn -q exec:java
10:50:03.309 [com.zetcode.Application.main()] INFO  com.zetcode.Application - Application starting
10:50:03.574 [com.zetcode.Application.main()] INFO  com.zetcode.service.MessageProducer - This is an information message
10:50:03.574 [com.zetcode.Application.main()] WARN  com.zetcode.service.MessageProducer - This is a warning message

We run the application. 

In this article we have worked with Spring's @Qualifier annotation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).