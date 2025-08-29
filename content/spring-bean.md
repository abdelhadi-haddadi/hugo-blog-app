+++
title = "Spring @Bean"
date = 2025-08-29T20:11:46.167+01:00
draft = false
description = "Spring @Bean annotation tutorial shows how to use @Bean annotation to declare beans in Java configuration classes."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @Bean

last modified October 18, 2023

In this article we show how to use @Bean annotation to declare beans in Java
configuration classes.

Spring is a popular Java application framework for creating
enterprise applications.

## Spring @Bean

@Bean annotation indicates that the annotated method produces a bean to
be managed by the Spring container. It is a direct analog of the &lt;bean/&gt;
XML tag. @Bean supports most of the attributes offered by &lt;bean/&gt;,
such as: init-method, destroy-method, autowiring, lazy-init,
dependency-check, depends-on, scope.

## Spring @Bean example

The application produces a Spring-managed bean with the @Bean annotation.
It also gives the bean some aliases.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───bean
│   │           │       HelloMessage.java
│   │           └───config
│   │                   AppConfig.java
│   └───resources
│           logback.xml
│           messages.properties
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
    &lt;artifactId&gt;beanannotation&lt;/artifactId&gt;
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

In the pom.xml file, we have basic Spring dependencies
spring-core, spring-context, and logging
logback-classic dependency.

The exec-maven-plugin is used for executing Spring application from
the Maven on the command line.

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

The logback.xml is a configuration file for the Logback logging
library.

resources/messages.properties
  

motd="Hello there!"

The messages.properties contains a message of the day property,
which is used by our HelloMessage bean. This gives the application
more flexibility and avoids hardcoding the message into the Java code.

com/zetcode/bean/HelloMessage.java
  

package com.zetcode.bean;

public class HelloMessage {

    private String message;

    public HelloMessage(String message) {

        this.message = message;
    }

    public String getMessage() {

        return message;
    }
}

The HelloMessage bean is created with a @Bean annotated
method.

com/zetcode/config/AppCofig.java
  

package com.zetcode.config;

import com.zetcode.bean.HelloMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource(value="messages.properties")
public class AppConfig {

    @Value("${motd}")
    private String message;

    @Bean(name={"myMessage", "motd"})
    public HelloMessage helloMessageProducer() {

        var helloMessage = new HelloMessage(message);

        return helloMessage;
    }
}

We define a HelloMessage producer in the AppConfig.

@Configuration
@PropertySource(value="messages.properties")
public class AppConfig {

With @Configuration we declare that AppConfig is
a configuration class. The @PropertySource annotation allows us
to use properties from the messages.properties file easily with
@Value.

@Value("${motd}")
private String message;

We inject the motd property into the message attribute.

@Bean(name={"myMessage", "motd"})
public HelloMessage helloMessageProducer() {

    var helloMessage = new HelloMessage(message);

    return helloMessage;
}

The helloMessageProducer produces a new HelloMessage bean.
It takes its message from the external property. The @Bean annotation
makes the HelloMessage bean produced and managed by Spring.
In addition, we give the bean two aliases.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.bean.HelloMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "com.zetcode")
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(Application.class);

        var msgBean1 = ctx.getBean(HelloMessage.class);
        logger.info("{}", msgBean1.getMessage());

        var msgBean2 = (HelloMessage) ctx.getBean("myMessage");
        logger.info("{}", msgBean2.getMessage());

        var msgBean3 = (HelloMessage) ctx.getBean("motd");
        logger.info("{}", msgBean3.getMessage());

        ctx.close();
    }
}

The application is annotated with @ComponentScan. The basePackages
option tells Spring to look for components in the com/zetcode package and
its subpackages.

var ctx = new AnnotationConfigApplicationContext(Application.class);

AnnotationConfigApplicationContext is a Spring standalone application context.
It accepts the annotated Application as an input; thus the scanning is
enabled.

var msgBean1 = ctx.getBean(HelloMessage.class);
logger.info("{}", msgBean1.getMessage());

We get the bean by its type.

var msgBean2 = (HelloMessage) ctx.getBean("myMessage");
logger.info("{}", msgBean2.getMessage());

var msgBean3 = (HelloMessage) ctx.getBean("motd");
logger.info("{}", msgBean3.getMessage());

Here we get the same bean by its aliases.

$ mvn -q exec:java
14:39:29.324 INFO  com.zetcode.Application - "Hello there!"
14:39:29.324 INFO  com.zetcode.Application - "Hello there!"
14:39:29.324 INFO  com.zetcode.Application - "Hello there!"

We run the application.

In this article we have used the @Bean annotation to produce a
managed Spring bean.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).