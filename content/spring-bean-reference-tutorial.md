+++
title = "Spring bean reference tutorial"
date = 2025-08-29T20:11:48.501+01:00
draft = false
description = "Spring bean reference tutorial shows how to refer to beans in a XML configuration file in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring bean reference tutorial

last modified October 18, 2023

Spring bean reference tutorial shows how to refer to beans in a XML configuration 
file in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring ref attribute

The ref attribute is a shortcut to the &lt;ref&gt; tag,
used to refer to other beans for injection.

## Spring bean reference example

The application contains two beans: infoMessage and mesageRenderer.
The mesageRenderer refers to the infoMessage via the ref
attribute.

src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───bean
│   │           │       IMessage.java
│   │           │       InfoMessage.java
│   │           └───service
│   │                   MessageRenderer.java
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
    &lt;artifactId&gt;beanreference&lt;/artifactId&gt;
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

resources/my-beans.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd"&gt;
    
    &lt;bean id="infoMessage" class="com.zetcode.bean.InfoMessage"/&gt;

    &lt;bean name="messageRenderer" class="com.zetcode.service.MessageRenderer"&gt;
            &lt;constructor-arg name="message" ref="infoMessage"/&gt;
    &lt;/bean&gt;

&lt;/beans&gt;

The my-beans.xml file declares two beans: info and 
messageRenderer. The infoMessage refers to the infoMessage
via the ref attribute. Spring injects the infoMessage bean 
into the message attribute via constructor injection.

com/zetcode/bean/IMessage.java
  

package com.zetcode.bean;

public interface IMessage {

    String getMessage();
}

The IMessage interface has one method declaration.

com/zetcode/bean/InfoMessage.java
  

package com.zetcode.bean;

public class InfoMessage implements IMessage {

    public String getMessage() {

        return "This is information message";
    }
}

The InfoMessage bean returns an information message.

com/zetcode/service/MessageRenderer.java
  

package com.zetcode.service;

import com.zetcode.Application;
import com.zetcode.bean.IMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MessageRenderer {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    private IMessage message;

    public MessageRenderer(IMessage message) {
        this.message = message;
    }
    
    public void renderMessage() {

        logger.info("{}", message.getMessage());
    }
}

The MessageRenderer renders a message. It expects one bean to be
injected. Spring injects the infoMessage bean into the 
MessageRenderer via constructor injection. 

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.service.MessageRenderer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new GenericXmlApplicationContext("my-beans.xml");
        var renderer =  (MessageRenderer) ctx.getBean("messageRenderer");

        renderer.renderMessage();

        ctx.close();
    }
}

This is the main application class. It retrieves the MessageRenderer bean
and call its renderMessage method.

$ mvn -q exec:java
12:05:23.567 [com.zetcode.Application.main()] INFO  com.zetcode.Application - This is information message

We run the application. 

In this article we have shown how to refer to other beans with Spring's XML
ref attribute.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).