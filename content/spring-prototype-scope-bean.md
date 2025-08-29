+++
title = "Spring Prototype scope bean"
date = 2025-08-29T20:11:57.508+01:00
draft = false
description = "Spring Prototype scope bean tutorial shows how to use a Prototype scoped bean in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Prototype scope bean

last modified October 18, 2023

Spring Prototype scoped bean tutorial shows how to use a Prototype scoped bean 
in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring Prototype bean

*Prototype beans* are created every time a new request for that bean is 
made.

Other bean scopes are: singleton, request, session, global session, and application.

## Spring Prototype bean example

The application creates two prototype scoped beans and checks if they
are identical. The application is a classic Spring 5 console application.

────src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │
│   │           └───bean
│   │                   Message.java
│   │
│   └───resources
│           logback.xml
│           my-beans.xml
│
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
    &lt;artifactId&gt;prototypescopedbean&lt;/artifactId&gt;
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

resources/my-beans.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd"&gt;

    &lt;context:component-scan base-package="com.zetcode"/&gt;

&lt;/beans&gt;

With the context:component-scan tag, we instruct Spring to look for 
beans in the com.zetcode package. It will find our sole Message
bean, which is decorated with @Component.

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

com/zetcode/bean/Message.java
  

package com.zetcode.bean;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class Message {

    private String message;

    public String getMessage() {

        return message;
    }
}

The Message is a Spring bean managed by the Spring container.
It has prototype scope. 

@Component
@Scope("prototype")
public class Message {

The @Scope("prototype") sets the scope of the bean to 
prototypes; the default is singleton.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.bean.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new GenericXmlApplicationContext("my-beans.xml");

        var beanA = ctx.getBean(Message.class);
        var beanB = ctx.getBean(Message.class);

        if (beanA.equals(beanB)) {

            logger.info("The beans are identical");
        } else {

            logger.info("The beans are not identical");
        }

	ctx.close();
    }
}

This is the main application class. 

var ctx = new GenericXmlApplicationContext("my-beans.xml");

We create the Spring application context from the my-beans.xml
file using GenericXmlApplicationContext.

var bean1 = ctx.getBean(Message.class);
var bean2 = ctx.getBean(Message.class);

app.run(bean1, bean2);

We get two beans from the application context and pass them to 
the run method for comparison.

logger.info(a.getMessage());

We read the message from the bean.

if (a.equals(b)) {

    logger.info("The beans are the same");
} else {

    logger.info("The beans are not the same");
}

We test if the two beans are identical.

$ mvn -q exec:java
21:26:03.089 [com.zetcode.Application.main()] INFO  com.zetcode.Application - The beans are not identical

We run the application. Change the spope of the Message bean to singleton and 
compare the results.

In this article we have worked with a prototype Spring bean.  

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).