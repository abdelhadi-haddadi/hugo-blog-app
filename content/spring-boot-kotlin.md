+++
title = "Spring Boot Kotlin"
date = 2025-08-29T20:12:20.821+01:00
draft = false
description = "Spring Boot Kotlin tutorial shows how to build a simple Spring Boot application in Kotlin language."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Kotlin

last modified July 31, 2023

In this article we show how to build a simple Spring Boot application in Kotlin
language. In the example, we create a Spring Boot console application.

Spring is a popular Java/Kotlin application framework and Spring
Boot is an evolution of Spring that helps create stand-alone,
production-grade Spring based applications easily.

@Component is the most generic Spring annotation. A Kotlin class
decorated with @Component is found during classpath scanning and
registered in the context as a Spring bean. @Service,
@Repository, and @Controller are specializations of
@Component, which are used for more specific cases.

## Kotlin

Kotlin is a statically-typed programming language that runs on the Java virtual
machine. Kotlin was created by JetBrains. Kotlin is and object-oriented and
functional programming language. Kotlin was designed to be a pragmatic, concise,
safe, and interoperable programming language.

## Spring Boot Kotlin example

The following application creates a simple Spring Boot console application in
Kotlin language. It uses the @Component annotation to create a bean
that randomly generates names.

build.gradle.kts
...
src
├── main
│   ├── kotlin
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.kt
│   │           ├── Runner.kt
│   │           └── service
│   │               └── RandomNameGenerator.kt
│   └── resources
│       └── application.properties
└── test
    ├── kotlin
    └── resources

This is the project structure.

build.gradle.kts
  

import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "3.1.2"
    id("io.spring.dependency-management") version "1.1.2"
    kotlin("jvm") version "1.8.22"
    kotlin("plugin.spring") version "1.8.22"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType&lt;KotlinCompile&gt; {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType&lt;Test&gt; {
    useJUnitPlatform()
}

This is the Gradle build.gradle.kts file.

resources/application.properties
  

spring.main.banner-mode=off
logging.level.org.springframework=ERROR
logging.pattern.console=%d{dd-MM-yyyy HH:mm:ss} %magenta([%thread]) %highlight(%-5level) %logger.%M - %msg%n

The application.properties is the main configuration file in Spring
Boot. We turn off the Spring banner, reduce the amount of logging of the Spring
framework by selecting only error messages, and set the console logging pattern.

com/zetcode/service/RandomNameGenerator.kt
  

package com.zetcode.service

import org.springframework.stereotype.Component

@Component
class RandomNameGenerator {

    fun generate(): String {

        val names = listOf("Peter", "Roland", "Lucy", "Robert", "Jane")
        return names.random()
    }
}

The RandomNameGenerator is a Kotlin class decorated with
@Component. It will be detected during component scan process and
registered as a Spring bean.

com/zetcode/MyRunner.kt
  

package com.zetcode

import com.zetcode.service.RandomNameGenerator
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class MyRunner : CommandLineRunner {

    private val logger: Logger = LoggerFactory.getLogger(MyRunner::class.java)

    @Autowired
    private val randGenerator: RandomNameGenerator? = null

    override fun run(vararg args: String?) {

        logger.info("Generating random name: {}", randGenerator?.generate())
        logger.info("Generating random name: {}", randGenerator?.generate())
        logger.info("Generating random name: {}", randGenerator?.generate())
    }
}

By implementing the CommandLineRunner, the run
method of the MyRunner class will be executed after the application
starts.

@Component
public class MyRunner implements CommandLineRunner {

MyRunner is also decorated with @Component, so it will
be autodetected and registered as well.

@Autowired
private val randGenerator: RandomNameGenerator? = null

With the @Autowired annotation, we inject the
RandomNameGenerator bean into the randGenerator field.

override fun run(vararg args: String?) {

    logger.info("Generating random name: {}", randGenerator?.generate())
    logger.info("Generating random name: {}", randGenerator?.generate())
    logger.info("Generating random name: {}", randGenerator?.generate())
}

In the run method, we log messages containing random names.

com/zetcode/Application.kt
  

package com.zetcode

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class Application

fun main(args: Array&lt;String&gt;) {

    runApplication&lt;Application&gt;(*args)
}

Application is the entry point which sets up Spring Boot
application. The @SpringBootApplication annotation enables
auto-configuration and component scanning. It is a convenience annotation for
@Configuration, @EnableAutoConfiguration, and
@ComponentScan annotations.

$ ./gradlew bootRun
...
... INFO  com.zetcode.MyRunner.run - Generating random name: Lucy
... INFO  com.zetcode.MyRunner.run - Generating random name: Lucy
... INFO  com.zetcode.MyRunner.run - Generating random name: Jane

After the application is run, we can see the log messages in the console.

In this article we have shown created a simple Spring Boot application in
Kotlin.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).