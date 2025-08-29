+++
title = "Spring p-namespace tutorial"
date = 2025-08-29T20:11:56.437+01:00
draft = false
description = "Spring property namespace tutorial shows how to use p-namespace in property-based injection in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring p-namespace tutorial

last modified October 18, 2023

Spring property namespace tutorial shows how to use
p-namespace in property-based injection in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring p-namespace

Spring p-namespace is an XML shortcut and replacement of the
&lt;property/&gt; subelement of the &lt;bean/&gt; tag.
To enable the p-namespace feature, we need to add the 
xmlns:p="http://www.springframework.org/schema/p" into the XML file. Note
that this namespace does not have a separate XSD file; therefore, IDEs such as IntelliJ
do not recognize it.

## Spring p-namespace example

The application contains two HelloMessage beans. One is injected with the older 
&lt;property/&gt;, the other one with the newer p-namespace attribute.

src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───bean
│   │                   HelloMessage.java
│   └───resources
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
    &lt;artifactId&gt;cnamespace&lt;/artifactId&gt;
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

resources/my-beans.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:p="http://www.springframework.org/schema/p"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd"&gt;

    &lt;bean name="msg1" class="com.zetcode.bean.HelloMessage"&gt;
        &lt;property name="message" value="How are you?"/&gt;
    &lt;/bean&gt;

    &lt;bean name="msg2" class="com.zetcode.bean.HelloMessage" p:message="Hello there"/&gt;

&lt;/beans&gt;

The my-beans.xml file declares two beans: msg1 and 
msg2. The msg1 uses &lt;property/&gt; tag
to inject its values, while msg2 uses p:message attribute.

com/zetcode/bean/HelloMessage.java
  

package com.zetcode.bean;

public class HelloMessage {

    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {

        this.message = message;
    }
}

This is the HelloMessage class that is managed by Spring container. It must contain
a setter method because we use property-based injection in our application.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.bean.HelloMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new GenericXmlApplicationContext("my-beans.xml");

        var msg1 = (HelloMessage) ctx.getBean("msg1");
        logger.info("{}", msg1.getMessage());

        var msg2 = (HelloMessage) ctx.getBean("msg2");
        logger.info("{}", msg2.getMessage());

        ctx.close();
    }
}

This is the main application class. It retrieves the two HelloMessage 
beans and prints them to the console.

$ mvn -q exec:java
16:52:11.257 [main] INFO  com.zetcode.Application - How are you? 
16:52:11.273 [main] INFO  com.zetcode.Application - Hello there 

We run the application. 

In this article we have shown how to use property-based injection with p-namespace.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).