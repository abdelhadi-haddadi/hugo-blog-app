+++
title = "Spring c-namespace tutorial"
date = 2025-08-29T20:11:49.589+01:00
draft = false
description = "Spring constructor namespace tutorial shows how to use c-namespace in constructor-based injection in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring c-namespace tutorial

last modified October 18, 2023

Spring constructor namespace tutorial shows how to use
c-namespace in constructor-based injection in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring c-namespace

Spring c-namespace is an XML shortcut and replacement of the
&lt;constructor-arg/&gt; subelement of the &lt;bean/&gt; tag.
To enable the c-namespace feature, we need to add the 
xmlns:c="http://www.springframework.org/schema/c" into the XML file. Note
that this namespace does not have a separate XSD file; therefore, IDEs such as IntelliJ
do not recognize it.

## Spring c-namespace example

The application contains two User beans. One is injected with the older 
&lt;constructor-arg/&gt;, the other one with the newer c-namespace attribute.

src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───bean
│   │                   User.java
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
        xmlns:c="http://www.springframework.org/schema/c"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd"&gt;

    &lt;bean name="user1" class="com.zetcode.bean.User"&gt;
        &lt;constructor-arg name="name" value="John Doe"/&gt;
        &lt;constructor-arg name="occupation" value="gardener"/&gt;
    &lt;/bean&gt;

    &lt;bean name="user2" class="com.zetcode.bean.User"
            c:name="Peter Smith" c:occupation="teacher"/&gt;

&lt;/beans&gt;

The my-beans.xml file declares two beans: user1 and 
user2. The user1 uses &lt;constructor-arg/&gt;
to inject its values, while user2 uses c:name and c:occupation
attributes.

com/zetcode/bean/User.java
  

package com.zetcode.bean;

public class User {

    private String name;
    private String occupation;

    public User(String name, String occupation) {
        this.name = name;
        this.occupation = occupation;
    }

    @Override
    public String toString() {

        final var sb = new StringBuilder("User{");
        sb.append("name='").append(name).append('\'');
        sb.append(", occupation='").append(occupation).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

This is the User class that is managed by Spring container. It must contain
a constructor because we use constructor-based injection in our application.

com/zetcode/Application.java
  

package com.zetcode;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new GenericXmlApplicationContext("my-beans.xml");

        var u1 = ctx.getBean("user1");
        var u2 = ctx.getBean("user2");

        logger.info("{}", u1);
        logger.info("{}", u2);

        ctx.close();
    }
}

This is the main application class. It retrieves the two beans and prints them 
to the console.

$ mvn -q exec:java
16:40:39.632 INFO  com.zetcode.Application - User{name='John Doe', occupation='gardener'} 
16:40:39.632 INFO  com.zetcode.Application - User{name='Peter Smith', occupation='teacher'} 

We run the application. 

In this article we have shown how to use constructor-based injection with c-namespace.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).