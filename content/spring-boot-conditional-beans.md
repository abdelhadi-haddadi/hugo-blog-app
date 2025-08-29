+++
title = "Spring Boot Conditional beans"
date = 2025-08-29T20:12:07.613+01:00
draft = false
description = "Spring Boot Conditional beans tutorial shows how to register beans into the Spring Boot application context based on conditions."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Conditional beans

last modified July 18, 2023

Spring Boot Conditional beans tutorial shows how to register beans into the
Spring Boot application context based on conditions.

Spring Boot is a popular application framework for creating
enterprise application in Java, Kotlin, or Groovy.

## @Conditional

The @Conditional annotation indicates that a component is only
registered into the application context when all the specified conditions match.
If a @Configuration class is marked with @Conditional,
all of the @Bean methods, @Import annotations, and
@ComponentScan annotations associated with that class will be
subject to the conditions. 

Spring provides plenty of conditional annotations out-of-the-box, including
@ConditionalOnClass, @ConditionalOnMissingBean,
@ConditionalOnBean, @ConditionalOnProperty, 
@ConditionalOnNotWebApplication, and @ConditionalOnExpression.

## Spring Boot Conditional beans example

In the following application we have two beans that are registered based on
conditions.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── bean
│   │           │   ├── GenericMessage.java
│   │           │   ├── MessageBean.java
│   │           │   └── WelcomeMessage.java
│   │           ├── conf
│   │           │   └── AppConf.java
│   │           └── MyRunner.java
│   └── resources
│       └── application.properties
└── test
    └── java

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

This is the build.gradle file.

com/zetcode/bean/MessageBean.java
  

package com.zetcode.bean;

public interface MessageBean {

    String getMessage();
}

This is the MessageBean.

com/zetcode/bean/GenericMessage.java
  

package com.zetcode.bean;

public record GenericMessage(String message) implements MessageBean {

}

This is a GenericMessage used for a generic message. 

com/zetcode/bean/WelcomeMessage.java
  

package com.zetcode.bean;

public record WelcomeMessage(String message) implements MessageBean {

}

The WelcomeMessage is suited for a welcome message.

com/zetcode/conf/AppConf.java
  

package com.zetcode.conf;

import com.zetcode.bean.GenericMessage;
import com.zetcode.bean.WelcomeMessage;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConf {

    @Bean
    @ConditionalOnProperty(name="welcomebean.enabled", havingValue="true")
    public WelcomeMessage welcomeBeanBean() {

        return new WelcomeMessage("Welcome!");
    }

    @Bean
    @ConditionalOnMissingBean(WelcomeMessage.class)
    public GenericMessage messageBean() {

        return new GenericMessage("Today is a beautiful day.");
    }
}

In the AppConf we have two bseans that are defined based on
conditions.

@Bean
@ConditionalOnProperty(name="welcomebean.enabled", havingValue="true")
public WelcomeMessage welcomeBeanBean() {

    return new WelcomeMessage("Welcome!");
}

With the @ConditionalOnProperty, the WelcomeMessage
bean is registered only if there is a welcomebean.enabled property
set to true.

@Bean
@ConditionalOnMissingBean(WelcomeMessage.class)
public GenericMessage messageBean() {

    return new GenericMessage("Today is a beautiful day.");
}

The GenericMessage is registered on condition that the
WelcomeMessage is not.

resources/application.properties
  

spring.main.banner-mode=off
welcomebean.enabled=true

In the application.properties file, we define the
welcomebean.enabled property.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.bean.MessageBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private final MessageBean messageBean;

    @Autowired
    public MyRunner(MessageBean messageBean) {
        this.messageBean = messageBean;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println(messageBean.message());
    }
}

In MyRunner we autowire a message bean and print the message.
Depending on the welcomebean.enabled property, we either get a
welcome message or the generic message.

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

$ ./gradlew bootRun
...
Welcome!

We run the application.

In this article we have worked with conditional beans. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).