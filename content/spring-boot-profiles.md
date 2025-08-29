+++
title = "Spring Boot Profiles"
date = 2025-08-29T20:12:27.576+01:00
draft = false
description = "Spring Boot Profiles tutorial shows how to use profiles in a Spring Boot application. A profile is a set of configuration settings."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Profiles

last modified July 29, 2023

In this article we show how to use profiles in a Spring Boot application.

Spring Boot is a popular application framework for creating
enterprise application in Java, Kotlin, or Groovy.

## Spring Boot profiles

The development process of an application has different stages; the typical ones
are development, testing, and production. Spring Boot profiles group parts of
the application configuration and make it be available only in certain
environments.

A *profile* is a set of configuration settings. Spring Boot allows to
define profile specific property files in the form of
application-{profile}.properties. It automatically loads the
properties in an application.properties file for all profiles, and
the ones in profile-specific property files only for the specified profile. The
keys in the profile-specific property override the ones in the master property
file.

**Note: ** Spring Boot properties are loaded in a particular order.
If several profiles are specified, the last-wins strategy applies.

The @Profile annotation indicates that a component is eligible for
registration when the specified profile or profiles are active. The default
profile is called default; all the beans that do not have a profile
set belong to this profile.

There are plenty of ways of defining active profiles in Spring Boot, including
command line arguments, Maven/Gradle settings, JVM system parameters,
environment variables, spring.profiles.active property, and
SpringApplication methods.

**Note: ** Some approaches set and replace active profiles, while
other add active profiles on top of existing active profiles.

In integration tests, profiles are activated with @ActiveProfiles.

## Spring Boot profiles example

In the following application, we have three profiles (local, dev, prod) and two profile-specific
property files. We use the spring.profiles.active to *set* active profiles and
SpringApplicationBuilder's profiles method to *add* new active
profiles.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           └── Application.java
│   └── resources
│       ├── application-dev.properties
│       ├── application-prod.properties
│       └── application.properties
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
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

This is the build.gradle file.

resources/application.properties
  

spring.profiles.active=local

We set one profile in the application.properties file.

resources/application-dev.properties
  

message=Dev message

In the application-dev.properties, we have a message
property.

resources/application-prod.properties
  

message=Prod message

In the application-prod.properties, we define the same property.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        new SpringApplicationBuilder(Application.class)
                .profiles("dev", "prod")
                .run(args);
    }
}

@Component
class MyRunner implements CommandLineRunner {

    @Autowired
    private Environment environment;

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Active profiles: " +
                Arrays.toString(environment.getActiveProfiles()));
    }
}

@Component
@Profile(value="dev")
class MyRunner2 implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        System.out.println("In development");
    }
}

@Component
@Profile(value="prod &amp; !dev")
class MyRunner3 implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        System.out.println("In production");
    }
}

@Component
@Profile(value="local")
class MyRunner4 implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        System.out.println("In local");
    }
}

@Component
@Profile(value={"dev &amp; local"})
class MyRunner5 implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        System.out.println("In development and local");
    }
}

@Component
@Profile(value={"dev", "prod"})
class MyRunner6 implements CommandLineRunner {

    @Value("${message}")
    private String message;

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Message: " + message);
    }
}

In the application.properties we have set the local profile
to be active. With the SpringApplicationBuilder's profiles
method we *add* two additional profiles. With the @Profile
annotations, we determine which runner beans are registered.

@Component
class MyRunner implements CommandLineRunner {

    @Autowired
    private Environment environment;

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Active profiles: " +
                Arrays.toString(environment.getActiveProfiles()));
    }
}

This bean is always run; it outputs all the active profiles.

@Component
@Profile(value="dev")
class MyRunner2 implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        System.out.println("In development");
    }
}

This runner is executed when the dev profile is active.

@Component
@Profile(value="prod &amp; !dev")
class MyRunner3 implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        System.out.println("In production");
    }
}

This bean is executed when the prod profile is active and the dev is not active.

@Component
@Profile(value={"dev &amp; local"})
class MyRunner5 implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        System.out.println("In development and local");
    }
}

This bean is executed when both dev and local profiles are active.

@Component
@Profile(value={"dev", "prod"})
class MyRunner6 implements CommandLineRunner {

    @Value("${message}")
    private String message;

    @Override
    public void run(String... args) throws Exception {

        System.out.println("Message: " + message);
    }
}

This bean is executed for either dev or prod profiles (or both).
What message is outputed depends on which profile was loaded last.

$ ./gradlew bootRun
...
Active profiles: [dev, prod, local]
In development
In local
In development and local
Message: Prod message

With the local profile set in the application.properties file and
the dev and prod ones added with the the SpringApplicationBuilder's
profiles method, we get this output. We get the "Prod message",
because the prod profile was specified after the dev.

In this article we have worked with Spring Boot profiles.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).