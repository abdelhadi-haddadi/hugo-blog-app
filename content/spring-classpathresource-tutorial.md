+++
title = "Spring ClassPathResource tutorial"
date = 2025-08-29T20:11:48.477+01:00
draft = false
description = "Spring ClassPathResource tutorial shows how to read resources with a ClassPathResource in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring ClassPathResource tutorial

last modified October 18, 2023

Spring ClassPathResource tutorial shows how to read resources with a ClassPathResource
in a Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Spring ClassPathResource

ClassPathResource allows to obtain resources from a Java classpath.

## Spring ClassPathResource example

The application reads text data from a file located in the Java classpath.

src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───service
│   │                   ReadWordsService.java
│   └───resources
│           logback.xml
│           my-beans.xml
│           words.txt
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
    &lt;artifactId&gt;classpathres&lt;/artifactId&gt;
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
        xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd"&gt;

    &lt;bean name="readWordsService" class="com.zetcode.service.ReadWordsService"/&gt;

&lt;/beans&gt;

In the my-beans.xml file, we configure the readWordsService
bean. It becomes a Spring managed bean.

resources/words.txt
  

sky
blue
mountain
fresh
cloud
rock
water
melon

The resources directory is included in the classpath. The application reads
words from the words.txt file.

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

com/zetcode/service/ReadWordsService.java
  

package com.zetcode.service;

import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

public class ReadWordsService {

    public List&lt;String&gt; readWords() throws IOException {

        var res = new ClassPathResource("words.txt");

        var myFile = res.getFile();
        var lines = Files.readAllLines(myFile.toPath());

        return lines;
    }
}

The ReadWordsService reads the words into a list and returns
the list to the client.

var res = new ClassPathResource("words.txt");

The ClassPathResource is used to locate the text file.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.service.ReadWordsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.GenericXmlApplicationContext;
import java.io.IOException;

public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) throws IOException {

        var ctx = new GenericXmlApplicationContext("my-beans.xml");

        var wordsService = (ReadWordsService) ctx.getBean("readWordsService");
        var words = wordsService.readWords();

        words.forEach(word -&gt; logger.info(word));

        ctx.close();
    }
}

This is the main application class. 

var wordsService = (ReadWordsService) ctx.getBean("readWordsService");
var words = wordsService.readWords();

words.forEach(word -&gt; logger.info(word));

We retrieve the readWordsService bean from the container and 
call its readWords method. The words are printed to the console.

$ mvn -q exec:java
00:25:49.008 [com.zetcode.Application.main()] INFO  com.zetcode.Application - sky
00:25:49.008 [com.zetcode.Application.main()] INFO  com.zetcode.Application - blue
00:25:49.008 [com.zetcode.Application.main()] INFO  com.zetcode.Application - mountain
00:25:49.008 [com.zetcode.Application.main()] INFO  com.zetcode.Application - fresh
00:25:49.008 [com.zetcode.Application.main()] INFO  com.zetcode.Application - cloud
00:25:49.008 [com.zetcode.Application.main()] INFO  com.zetcode.Application - rock
00:25:49.008 [com.zetcode.Application.main()] INFO  com.zetcode.Application - water
00:25:49.008 [com.zetcode.Application.main()] INFO  com.zetcode.Application - melon

We run the application. 

In this article we have worked with Spring's ClassPathResource.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).