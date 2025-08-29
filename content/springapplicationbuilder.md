+++
title = "SpringApplicationBuilder"
date = 2025-08-29T20:12:33.235+01:00
draft = false
description = "SpringApplicationBuilder tutorial shows how to use SpringApplicationBuilder to create SpringApplication and ApplicationContext instances."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# SpringApplicationBuilder

last modified August 2, 2023

In this article we show how to use SpringApplicationBuilder to create a simple
Spring Boot application.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## SpringApplication

SpringApplication is a class to bootstrap a Spring application from a
Java main method. It creates an appropriate ApplicationContext
instance (depending on the classpath), registers a
CommandLinePropertySource to expose command line arguments as
Spring properties, refreshes the application context, loading all singleton
beans, and triggers any CommandLineRunner beans.

## SpringApplicationBuilder

SpringApplicationBuilder is a builder for
SpringApplication and ApplicationContext instances
with convenient fluent API and context hierarchy support.

## Spring Boot example

The following application is a simple Spring Boot console application
which uses SpringApplicationBuilder to set up a Spring Boot
application.

The application takes an argument from the user; it expects a full URL of
a website and returns its title.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           └── MyRunner.java
│   └── resources
└── test
    └── java

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
    implementation 'org.jsoup:jsoup:1.16.1'
}

Spring Boot starters are a set of convenient dependency descriptors which
greatly simplify the configuration. The spring-boot-starter is the
core Spring starter. The jsoup dependency is for the JSoup library.

com/zetcode/MyRunner.java
  

package com.zetcode;

import java.util.List;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {

        if (!args.containsOption("website")) {

            System.err.println("no website specified");
        } else {

            List&lt;String&gt; vals = args.getOptionValues("website");
            String url = vals.get(0);

            Document doc = Jsoup.connect(url).get();
            String title = doc.title();
            System.out.printf("The title is: %s%n", title);
        }
    }
}

After the Spring application is loaded, any bean that implements ApplicationRunner
is executed.

if (!args.containsOption("website")) {

We check if there is a --website option specified on the command line.

List&lt;String&gt; vals = args.getOptionValues("website");
String url = vals.get(0);

We get the value of the option.

Document doc = Jsoup.connect(url).get();
String title = doc.title();
System.out.printf("The title is: %s%n", title);

With JSoup, we get the title of the specified website.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.Banner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        new SpringApplicationBuilder(Application.class)
                .bannerMode(Banner.Mode.OFF)
                .logStartupInfo(false)
                .build()
                .run(args);
    }
}

Application is the entry point which sets up Spring Boot
application. The @SpringBootApplication annotation enables
auto-configuration and component scanning.

new SpringApplicationBuilder(Application.class)
        .bannerMode(Banner.Mode.OFF)
        .logStartupInfo(false)
        .build()
        .run(args);

The SpringApplicationBuilder is used to build the Spring application. We turn
off the banner and the startup information.

$ ./gradlew bootRun -q --args=--website=http://webcode.me
The title is: My html page

The command line arguments are passed with the --args. The
-q (for quiet) is a Gradle option that turns of Gradle messages.

In this article we have covered SpringApplicationBuilder.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).