+++
title = "Loading resources in Spring Boot"
date = 2025-08-29T20:12:21.923+01:00
draft = false
description = "Spring Boot loading resources tutorial shows how to load resources in a Spring Boot application. The application loads a text file and counts the words occurrences."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Loading resources in Spring Boot

last modified July 29, 2023

In this article we are going to show how to load resources in a Spring Boot
application.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is a way to create stand-alone,
production-grade Spring based applications with minimal effort.

## Spring Boot Resource

Resource is data, such as images, audio, and text, that a program
needs to access in a way that is independent of the location of the program
code.

Because java.net.URL is not adequate for handling all kinds
of low level resources, Spring introduced org.springframework.core.io.Resource.
To access resources, we can use @Value annotation or ResourceLoader class.

## Spring Boot load resource example

Our application is a Spring Boot command line application that counts the
occurrence of words in a text file. The file is located in the
src/main/resources directory.

build.gradle 
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           └───service
│   │                   CountWords.java
│   └───resources
│           application.yml
│           thermopylae.txt
└───test
    └───java

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
}

This is the Gradle build file. Spring Boot starters are a set of convenient
dependency descriptors we can include in our application. The
spring-boot-starter dependency is a core starter that includes
auto-configuration support, logging and YAML.

resources/application.yml
  

spring:
    main:
        banner-mode: "off"

logging:
    level:
        org:
            springframework: ERROR
        com:
            zetcode: INFO

The application.yml file contains various configuration settings of
a Spring Boot application. We have the banner-mode property where
we turn off the Spring banner. Also, we set the logging level for spring
framework to ERROR and our application to INFO. The file is located in the in the
src/main/resources directory.

resources/thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.
It took place simultaneously with the naval battle at Artemisium, in August
or September 480 BC, at the narrow coastal pass of Thermopylae.
The Persian invasion was a delayed response to the defeat of the first Persian
invasion of Greece, which had been ended by the Athenian victory at the Battle
of Marathon in 490 BC. Xerxes had amassed a huge army and navy, and set out to
conquer all of Greece.

This is the text file that we read in our application. It is also located
in the src/main/resources directory.

com/zetcode/service/CountWords.java
  

package com.zetcode.service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

@Component
public class CountWords {

    public Map&lt;String, Integer&gt; getWordsCount(Resource res) throws IOException {

        Map&lt;String, Integer&gt; wordCount = new HashMap&lt;&gt;();

        List&lt;String&gt; lines = Files.readAllLines(Paths.get(res.getURI()),
                StandardCharsets.UTF_8);

        for (String line : lines) {

            String[] words = line.split("\\s+");

            for (String word : words) {

                if (word.endsWith(".") || word.endsWith(",")) {

                    word = word.substring(0, word.length() - 1);
                }

                if (wordCount.containsKey(word)) {

                    wordCount.put(word, wordCount.get(word) + 1);

                } else {

                    wordCount.put(word, 1);
                }
            }
        }

        return wordCount;
    }
}

CountWords is a Spring managed bean that performs the counting
of words in the given file. The text is read from a file into a list of
sentences. The sentences are split the into words and counted.

Map&lt;String, Integer&gt; wordCount = new HashMap&lt;&gt;();

The wordCount is a map, where keys are words and the frequency
is an integer.

List&lt;String&gt; lines = Files.readAllLines(Paths.get(res.getURI()),
        StandardCharsets.UTF_8);

We read all content in one shot with the Files.readAllLines method.
The Files.readAllLines method returns a list of strings.

for (String line : lines) {

    String[] words = line.split(" ");
...

We go through the lines and split them into words; the words are separated by
spaces.

if (word.endsWith(".") || word.endsWith(",")) {

    word = word.substring(0, word.length()-1);
}

We remove trailing dots and commas.

if (wordCount.containsKey(word)) {

    wordCount.put(word, wordCount.get(word) + 1);

} else {

    wordCount.put(word, 1);
}

If the word is already in the map, we increase its frequency; otherwise
we insert it into the map and set its frequency to one.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.service.CountWords;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    @Value("classpath:thermopylae.txt")
    private Resource res;

    private final CountWords countWords;

    @Autowired
    public MyRunner(CountWords countWords) {
        this.countWords = countWords;
    }

    @Override
    public void run(String... args) throws Exception {

        Map&lt;String, Integer&gt; words =  countWords.getWordsCount(res);

        for (String key : words.keySet()) {

            System.out.println(key + ": " + words.get(key));
        }
    }
}

With the CommandLineRunner, the Spring Boot application is run on
the terminal.

@Value("classpath:thermopylae.txt")
private Resource res;

Using the @Value annotation, we set the file into
the resource.

private final CountWords countWords;

@Autowired
public MyRunner(CountWords countWords) {
    this.countWords = countWords;
}

We inject the CountWords bean.

Map&lt;String, Integer&gt; words =  countWords.getWordsCount(res);

for (String key : words.keySet()) {

    System.out.println(key + ": " + words.get(key));
}

We call the getWordsCount method and receive a map of
words and their frequencies. We iterate over the map and print the
key/value pairs to the console.

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
The @SpringBootApplication enables auto-configuration and
component scanning.

## Using ResourceLoader

Previously, we have used @Value annotation to load the resource.
The following is an alternative solution with ResourceLoader.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.service.CountWords;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class MyRunner implements CommandLineRunner {

    private final ResourceLoader resourceLoader;
    private final CountWords countWords;

    @Autowired
    public MyRunner(ResourceLoader resourceLoader, CountWords countWords) {
        this.resourceLoader = resourceLoader;
        this.countWords = countWords;
    }

    @Override
    public void run(String... args) throws Exception {

        Resource res = resourceLoader.getResource("classpath:thermopylae.txt");

        Map&lt;String, Integer&gt; words =  countWords.getWordsCount(res);

        for (String key : words.keySet()) {

            System.out.println(key + ": " + words.get(key));
        }
    }
}

Alternatively, we can use ResourceLoader to load the resource.

private final ResourceLoader resourceLoader;
private final CountWords countWords;

@Autowired
public MyRunner(ResourceLoader resourceLoader, CountWords countWords) {
    this.resourceLoader = resourceLoader;
    this.countWords = countWords;
}

The ResourceLoader and CountWords are injected.

Resource res = resourceLoader.getResource("classpath:thermopylae.txt");

The Resource is obtained from the resource loader with the
getResource method.

## Running the application

The application is run on the command line.

$ ./gradlew bootRun -q
...
been: 1
Athenian: 1
alliance: 1
navy: 1
fought: 1
led: 1
delayed: 1
had: 2
during: 1
three: 1
second: 1
Greece: 3
...

We run the application. The -q option supresses the Gradle logs.

In this article we worked with resources in a Spring Boot application. We used
@Value and ResourceLoader to load a resource file.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).