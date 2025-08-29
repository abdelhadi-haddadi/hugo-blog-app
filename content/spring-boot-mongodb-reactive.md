+++
title = "Spring Boot MongoDB Reactive"
date = 2025-08-29T20:12:24.247+01:00
draft = false
description = "Spring Boot MongoDB Reactive tutorial shows how to do reactive programming with MongoDB in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot MongoDB Reactive

last modified July 16, 2023

Spring Boot MongoDB Reactive tutorial shows how to do reactive programming with
MongoDB in a Spring Boot application.

## MongoDB

MongoDB is a NoSQL cross-platform document-oriented database. It is one of
the most popular databases available. MongoDB is developed by MongoDB Inc. and is
published as free and open-source software.

The Spring Data MongoDB project provides integration with the MongoDB document database.

## Reactive programming

Reactive programming is a programming paradigm that is functional, event-based,
non-blocking, asynchronous, and centered around data stream processing.
The term *reactive* comes from the fact that we react to changes such as
mouse clicks or I/O events.

Reactive applications scale better and are more efficient when we are dealing
with lots of streaming data. Reactive applications are non-blocking; they're not 
using resources waiting for processes to finish.

When building a reactive application, we need it to be reactive all the way down
to the database. We need to use a database that supports reactive programming.
MongoDB is a database that has reactive support.

Reactive applications implement an event-based model where data is pushed to the
consumer. The consumer of data is called a subscriber, because it subscribes to
the publisher, which publishes asynchronous streams of data.

## Spring Reactor

Spring Reactor is a reactive library for building non-blocking applications on
the JVM based on the Reactive Streams Specification.

The Reactor Project offers two types of publishers: Mono and
Flux. Flux is a publisher that produces 0 to N values. 
Operations that return multiple elements use this type.
Mono is a publisher that produces 0 to 1 value. It is used for
operations that return a single element.

## Spring Boot MongoDB Reactive example

In the following application we use reactive programming with a MongoDB database.

**Note:** by default, without any specific configuration,
Spring Boot attempts to connect to a locally hosted instance of MongoDB, using
the test database name.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───model
│   │           │       City.java
│   │           ├───repository
│   │           │       CityRepository.java
│   │           └───service
│   │                   CityService.java
│   │                   ICityService.java
│   └───resources
│           application.properties
└───test
    └───java

This is the project structure of the Spring application.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;springbootmongodbreactive&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;2.6.7&lt;/version&gt;
    &lt;/parent&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-data-mongodb-reactive&lt;/artifactId&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;2.6.7&lt;/version&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven pom.xml file. The spring-boot-starter-data-mongodb-reactive
is a Spring Boot starter for using MongoDB document-oriented database and Spring Data MongoDB Reactive.

resources/application.properties
  

spring.main.banner-mode=off

In the application.properties, we turn off the Spring Boot banner
and set the logging properties. Spring Boot by default attempts to connect to
a locally hosted instance of MongoDB, using the test database.

# mongodb
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=testdb

If we want to configure MongoDB, we can set the corresponding properties.

com/zetcode/model/City.java
  

package com.zetcode.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document(value="cities")
public class City {

    @Id
    private String id;

    private String name;
    private int population;

    public City() {
    }

    public City(String name, int population) {
        this.name = name;
        this.population = population;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.name);
        hash = 79 * hash + this.population;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final City other = (City) obj;
        if (this.population != other.population) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {

        var builder = new StringBuilder();
        builder.append("City{id=").append(id).append(", name=")
                .append(name).append(", population=")
                .append(population).append("}");

        return builder.toString();
    }
}

This is the City bean which has three attributes: id,
name, and population.

@Document(value="cities")
public class City {

The bean is decorated with the optional @Document annotation.

@Id
private String id;

The id is decorated with the @Id annotation.
Spring automatically generates a new id for a newly generated city object.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

@Configuration
public interface CityRepository extends ReactiveMongoRepository&lt;City, String&gt; {
}

By extending from the ReactiveMongoRepository, we have a reactive
MongoDB repository.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface ICityService {

    Mono&lt;City&gt; insert(City city);
    Flux&lt;City&gt; saveAll(List&lt;City&gt; cities);
    Mono&lt;City&gt; findById(String id);
    Flux&lt;City&gt; findAll();
    Mono&lt;Void&gt; deleteAll();
}

ICityService contains five contract methods.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.City;
import com.zetcode.service.CityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    @Autowired
    private CityService cityService;

    @Override
    public void run(String... args) throws Exception {

        logger.info("Creating cities");

        var cities = List.of(new City("Bratislava", 432000),
                new City("Budapest", 1759000),
                new City("Prague", 1280000),
                new City("Warsaw", 1748000));

        Mono&lt;Void&gt; one = cityService.deleteAll();

        Flux&lt;City&gt; two = cityService.saveAll(cities);
        Flux&lt;City&gt; three = cityService.findAll();
        three.subscribe(city -&gt; logger.info("{}", city));

        Mono&lt;Void&gt; all = Mono.when(one, two, three);
        all.block();
    }
}

We have a command line runner. In its run method
we access the MongoDB using reactive programming.

Mono&lt;Void&gt; one = cityService.deleteAll();

We delete all cities if there are any in the collection.

Flux&lt;City&gt; two = cityService.saveAll(cities);

We save a list of cities.

Flux&lt;City&gt; three = cityService.findAll();
three.subscribe(System.out::println);

We find all cities from the collection. We subscribe to the publisher
with the subscribe method and print the retrieved cities
to the terminal.

Mono&lt;Void&gt; all = Mono.when(one, two, three);

With Mono.when we aggregate the three publishers into a new Mono
that will be fulfilled when all sources have completed.

all.block();

With block we trigger all three operations and wait for the completion.
Since we have a console application, we introduce a blocking operation in order to 
get the results on the terminal. 

The subscribe method starts the work and returns immediately. We have 
no guarantee that the operation is done when other parts of the application run.
The block is a blocking operation: it triggers the operation and 
waits for its completion.

**Note:** Generally, we rarely use blocking calls in our applications.
Operations in a console application is one of a few exceptions.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

This code sets up the Spring Boot application.

In this article we have learned how to program MongoDB using reactive programming 
model in a Spring Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).