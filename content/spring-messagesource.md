+++
title = "Spring MessageSource"
date = 2025-08-29T20:11:54.221+01:00
draft = false
description = "Spring MessageSource tutorial shows how to translate messages using MessageSource in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring MessageSource

last modified October 18, 2023

Spring MessageSource tutorial shows how to translate messages using
MessageSource in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications.

## Spring MessageSource

MessageSource is used for resolving messages, with support for the
parameterization and internationalization of the messages. Spring contains two
built-in MessageSource implementations:
ResourceBundleMessageSource and
ReloadableResourceBundleMessageSource. The latter is able to reload
message definitions without restarting the Virtual Machine.

## Spring MessageSource example

The following application contains messages in English and German language. It
uses the built-in ResourceBundleMessageSource.

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
│       │   logback.xml
│       └───messages
│               label.properties
│               label_de.properties
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
    &lt;artifactId&gt;messagesource&lt;/artifactId&gt;
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

resources/messages/labels.properties
  

l1=Earth
l2=Hello {0}, how are you?

These are English messages. The second property receives a parameter.

resources/messages/labels_de.properties
  

l1=Erde
l2=Hallo {0}, wie geht's?

These are German messages.

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

@Configuration
public class AppConfig {

    @Bean
    public ResourceBundleMessageSource messageSource() {

        var source = new ResourceBundleMessageSource();
        source.setBasenames("messages/label");
        source.setUseCodeAsDefaultMessage(true);

        return source;
    }
}

The AppConfig configures the ResourceBundleMessageSource.
The setBasenames tells where to look for message definitions.

com/zetcode/Application.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;

import java.util.Locale;

@ComponentScan(basePackages = "com.zetcode")
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    @Autowired
    private MessageSource messageSource;

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(Application.class);

        var app = ctx.getBean(Application.class);
        app.run();

        ctx.close();
    }

    public void run() {

        logger.info("Translated messages:");
        logger.info("{}", messageSource.getMessage("l1",
                null, Locale.GERMAN));
        logger.info("{}", messageSource.getMessage("l1",
                null, Locale.ENGLISH));

        logger.info("Translated parameterized messages:");
        logger.info("{}", messageSource.getMessage("l2",
                new Object[] {"Paul Smith"}, Locale.GERMAN));
        logger.info("{}", messageSource.getMessage("l2",
                new Object[] {"Paul Smith"}, Locale.ENGLISH));
    }
}

The application prints plain messages and parameterized messages to
the console.

@Autowired
private MessageSource messageSource;

We inject the MessageSource, which was generated in AppConfig.

logger.info("{}", messageSource.getMessage("l1",
    null, Locale.GERMAN));

The getMessage takes the property name as the first parameter. The
second parameter is null, because the messsage takes no parameters.
The third parameter is the locale.

logger.info("{}", messageSource.getMessage("l2",
    new Object[] {"Paul Smith"}, Locale.GERMAN));

Here we also provide a parameter to the message.

$ mvn -q exec:java
22:08:27.984 INFO  com.zetcode.Application - Translated messages:
22:08:27.984 INFO  com.zetcode.Application - Erde
22:08:27.984 INFO  com.zetcode.Application - Earth
22:08:27.984 INFO  com.zetcode.Application - Translated parameterized messages:
22:08:27.984 INFO  com.zetcode.Application - Hallo Paul Smith, wie gehts?
22:08:27.984 INFO  com.zetcode.Application - Hello Paul Smith, how are you?

We run the application.

In this article we have shown how to use ResourceBundleMessageSource
in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).