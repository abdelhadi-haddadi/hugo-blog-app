+++
title = "Spring Boot @Qualifier"
date = 2025-08-29T20:12:27.583+01:00
draft = false
description = "Spring Boot @Qualifier tutorial shows how to differentiate beans of the same type with @Qualifier."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @Qualifier

last modified July 20, 2023

Spring Boot @Qualifier tutorial shows how to differentiate beans of
the same type with @Qualifier. It can also be used to annotate
other custom annotations that can then be used as qualifiers.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring which helps create stand-alone, production-grade Spring
based applications with minimal effort.

The following three applications are command line Spring Boot applications.

## Differentiating Person beans

In our application, we have two beans of Person type: Student and
Manager. We use the @Qualifier annotation to distinguish between them.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           └───model
│   │                   Manager.java
│   │                   Person.java
│   │                   Student.java
│   └───resources
└───test
    └───java

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

This is the Gradle build file. The spring-boot-starter is the core
starter that includes auto-configuration support, logging, and YAML. The
application is packaged into a JAR file.

com/zetcode/model/Person.java
  

package com.zetcode.model;

public interface Person {

    String info();
}

We have an interface that defines the Person type.

com/zetcode/model/Student.java
  

package com.zetcode.model;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("student")
public class Student implements Person {

    @Override
    public String info() {

        return "Student";
    }
}

Student inherits from Person.
@Component is a basic Spring annotation that allows Student
to be detected by Spring containter. The @Qualifier("student") uniquely
identifies this bean with the "student" string.

com/zetcode/model/Manager.java
  

package com.zetcode.model;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("manager")
public class Manager implements Person {

    @Override
    public String info() {
        return "Manager";
    }
}

We have another bean called Manager. This bean is also identified
with the @Qualifier("manager") annotation.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    @Autowired
    @Qualifier("student")
    private Person p1;

    @Autowired
    @Qualifier("manager")
    private Person p2;

    @Override
    public void run(String... args) throws Exception {

        logger.info("{}", p1.info());
        logger.info("{}", p2.info());
    }
}

The CommandLineRunner interface indicates that a bean should run
when it is contained within a SpringApplication. It can be used to
create command line applications in Spring Boot.

@Component
public class MyRunner implements CommandLineRunner {

The CommandLineRunner is also a Spring bean and is decorated with
the @Component annotation; it is auto-detected by Spring.

@Autowired
@Qualifier("student")
private Person p1;

We inject a Person bean into the p1 field. The
@Qualifier("student") specifies that it is a Student
bean.

@Autowired
@Qualifier("manager")
private Person p2;

Likewise, we inject the Manager bean into the p2 field.

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
The @SpringBootApplication annotation enables auto-configuration
and component scanning.

## Using factory to create beans

In the second application, we use a factory class to generate beans.
The build.gradle, Person.java, 
Application.java, MyRunner.java remain unchanged.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───conf
│   │           │       PersonFactory.java
│   │           └───model
│   │                   Manager.java
│   │                   Person.java
│   │                   Student.java
│   └───resources
└───test
    └───java

This is the project structure.

com/zetcode/model/Manager.java
  

package com.zetcode.model;

public class Manager implements Person {

    @Override
    public String info() {

        return "Manager";
    }
}

The annotations are removed from the Manager
class.

com/zetcode/model/Student.java
  

package com.zetcode.model;

public class Student implements Person {

    @Override
    public String info() {

        return "Student";
    }
}

Likewise, there are no annotations for the Student class.

com/zetcode/conf/PersonFactory.java
  

package com.zetcode.conf;

import com.zetcode.model.Manager;
import com.zetcode.model.Person;
import com.zetcode.model.Student;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PersonFactory {

    @Bean
    @Qualifier("student")
    public Person createStudent() {

        return new Student();
    }

    @Bean
    @Qualifier("manager")
    public Person createManager() {

        return new Manager();
    }
}

In the previous example, the beans were auto-detected by Spring. Here, the
PersonFactory creates two beans with the help of the
@Bean annotation.

@Bean
@Qualifier("student")
public Person createStudent() {

    return new Student();
}

The @Bean annotation marks methods that define beans.
The @Qualifier("student") tells which implementation
of the Person to create.

## Creating custom @Qualifier annotation

To reduce code, we can create custom @Qualifier annotations.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───conf
│   │           │       PersonFactory.java
│   │           ├───model
│   │           │       Manager.java
│   │           │       Person.java
│   │           │       Student.java
│   │           └───qualifier
│   │                   PersonQ.java
│   └───resources
└───test
    └───java

This is the project structure; we list all files except for
build.gradle, which is listed in the first application.

com/zetcode/model/Person.java
  

package com.zetcode.model;

public interface Person {

    String info();
}

This is the Person type.

com/zetcode/model/Manager.java
  

package com.zetcode.model;

import org.springframework.stereotype.Component;

@Component
public class Manager implements Person {

    @Override
    public String info() {

        return "Manager";
    }
}

The Manager class is decorated with @Component
annotation; it will be auto-detected by Spring.

com/zetcode/model/Student.java
  

package com.zetcode.model;

import org.springframework.stereotype.Component;

@Component
public class Student implements Person {

    @Override
    public String info() {

        return "Student";
    }
}

The same applies for the Student.

com/zetcode/qualifier/PersonQ.java
  

package com.zetcode.qualifier;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.beans.factory.annotation.Qualifier;

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Qualifier
public @interface PersonQ {

    String value();
}

Here we define a new @PersonQ qualifier.

@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})

The @Targer annotation tells where the annotation can be applied.
In our case, it can be applied to fields, methods, and parameters.

@Retention(RetentionPolicy.RUNTIME)

The @Retention annotation specifies how the marked annotation is
stored. With RetentionPolicy.RUNTIME the marked annotation is
retained by the JVM so it can be used by the runtime environment.

public @interface PersonQ {

The @interface keyword is used to declare a new annotation type.

com/zetcode/conf/PersonFactory.java
  

package com.zetcode.conf;

import com.zetcode.model.Manager;
import com.zetcode.model.Person;
import com.zetcode.model.Student;
import com.zetcode.qualifier.PersonQ;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PersonFactory {

    @PersonQ("student")
    public Person createStudent() {

        return new Student();
    }

    @PersonQ("manager")
    public Person createManager() {

        return new Manager();
    }
}

In the PersonFactory we use the @PersonQ
to identify what kind of beans are created.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.Person;
import com.zetcode.qualifier.PersonQ;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    @Autowired
    @PersonQ("student")
    private Person p1;

    @Autowired
    @PersonQ("manager")
    private Person p2;

    @Override
    public void run(String... args) throws Exception {

        logger.info("{}", p1.info());
        logger.info("{}", p2.info());
    }
}

In the MyRunner, we inject beans with @Autowired
and @PersonQ annotations.

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

In Application, we set up the Spring Boot application.

In this article we have worked with the @Qualifier annotation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).