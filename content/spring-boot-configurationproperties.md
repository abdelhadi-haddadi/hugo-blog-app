+++
title = "Spring Boot @ConfigurationProperties"
date = 2025-08-29T20:12:07.622+01:00
draft = false
description = "Spring Boot @ConfigurationProperties tutorial shows how to bind properties to an object with @ConfigurationProperties in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @ConfigurationProperties

last modified July 18, 2023

Spring Boot @ConfigurationProperties tutorial shows how to bind properties to an
object with @ConfigurationProperties in a Spring Boot application.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## @ConfigurationProperties

@ConfigurationProperties allows to map the entire Properties and
Yaml files into an object easily. It also allows to validate properties with
JSR-303 bean validation. By default, the annotation reads from the
application.properties file. The source file can be changed with
@PropertySource annotation.

## Spring Boot @ConfigurationProperties example

The following application reads configuration data from the 
application.properties file, which is the default 
Spring Boot configuration file.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           └───conf
│   │                   AppProperties.java
│   └───resources
│           application.properties
└───test
    └───java

This is the project structure.

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

This is the build.gradle file.

resources/application.properties
  

spring.main.banner-mode=off

app.colour=steelblue
app.lang=en
app.theme=dark

In the application.properties file we have three custom properties. 
They have the app prefix.

com/zetcode/conf/AppProperties.java
  

package com.zetcode.conf;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private String colour;
    private String lang;
    private String theme;

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public String getLang() {
        return lang;
    }

    public void setLang(String lang) {
        this.lang = lang;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }
}

The properties are going to be bind to this configuration object. 

@Configuration
@ConfigurationProperties(prefix = "app")
public class AppProperties {

The @Configuration annotation makes it a Spring-managed bean.
In the @ConfigurationProperties, we set the prefix for our 
properties.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.conf.AppProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    private final AppProperties appProperties;

    @Autowired
    public MyRunner(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("Colour: {}", appProperties.getColour());
        logger.info("Language: {}", appProperties.getLang());
        logger.info("Theme: {}", appProperties.getTheme());
    }
}

In the MyRunner, we inject the AppProperties into a 
field and read its values.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {
    
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

Application is the entry point which sets up Spring Boot
application. 

## Spring Boot @ConfigurationProperties example II

In the second application, we will also validate the properties. 

build.gradle 
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           └───conf
│   │                   MailProperties.java
│   └───resources
│           application.properties
│           mail.properties
└───test
    └───java

This is the project structure.

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
    implementation 'org.hibernate.validator:hibernate-validator'
}

This is the build.gradle file. We have an additional
hibernate-validator dependency.

resources/application.properties
  

spring.main.banner-mode=off

This is the application.properties file. 

resources/mail.properties
  

hostname=info@example.com
port=9000
from=admin@example.com

recipients[0]=user1@example.com
recipients[1]=user2@example.com
recipients[2]=user3@example.com
recipients[3]=user4@example.com

We have a custom mail.properties file. 

com/zetcode/config/MailProperties.java
  

package com.zetcode.conf;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.validation.annotation.Validated;

import java.util.List;

@Configuration
@PropertySource("classpath:mail.properties")
@ConfigurationProperties
@Validated
public class MailProperties {

    @NotNull
    private String hostname;

    @Min(1000)
    @Max(10000)
    private int port;

    @NotNull
    private String from;

    @NotNull
    private List&gt;String&gt; recipients;

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public List&gt;String&gt; getRecipients() {
        return recipients;
    }

    public void setRecipients(List&gt;String&gt; recipients) {
        this.recipients = recipients;
    }
}

We use the @PropertySource annotation set the path to the 
custom properties file. The @Validated annotation validates 
the properties.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.conf.MailProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    private final MailProperties mailProperties;

    @Autowired
    public MyRunner(MailProperties mailProperties) {
        this.mailProperties = mailProperties;
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("Hostname: {}", mailProperties.getHostname());
        logger.info("Port: {}", mailProperties.getPort());
        logger.info("From: {}", mailProperties.getFrom());
        logger.info("Recipients: {}", mailProperties.getRecipients());
    }
}

We inject the MailProperties and read them in the run
method. 

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

This is the Application class.

We run the application with ./gradlew bootRun.

In this article we have shown how to use @ConfigurationProperties
to read configuration properties from an external file.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).