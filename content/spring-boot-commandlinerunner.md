+++
title = "Spring Boot CommandLineRunner"
date = 2025-08-29T20:12:06.518+01:00
draft = false
description = "Spring Boot CommandLineRunner tutorial shows how to run beans using CommandLineRunner interface."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot CommandLineRunner

last modified August 2, 2023

In this article we show how to run beans using CommandLineRunner interface.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring that helps create stand-alone, production-grade Spring 
based applications easily.

## CommandLineRunner

CommandLineRunner is an interface used to indicate that a bean
should run when it is contained within a SpringApplication. A Spring Boot
application can have multiple beans implementing CommandLineRunner.
These can be ordered with @Order.

## Spring Boot CommandLineRunner example

The following application demonstrates the usage of
CommandLineRunner. It creates cities in a H2 in-memory database and
later lists them.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───model
│   │           │       City.java
│   │           └───repository
│   │                   CityRepository.java
│   └───resources
│           application.properties
└───test
    ├── java
    └── resources

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
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'com.h2database:h2'
}

This is the Gradle build file. We use the H2 database and Spring Data JPA.

resources/application.properties
  

spring.main.banner-mode=off

The application.properties is the main configuration file in Spring
Boot. With spring.main.banner-mode=off we turn off the Spring
banner.

com/zetcode/model/City.java
  

package com.zetcode.model;

import java.util.Objects;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private int population;

    public City() {
    }

    public City(String name, int population) {
        this.name = name;
        this.population = population;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

This is the City model, which has the following properties:
id, name, and population.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {
}

CityRepository has some generic CRUD operations on a repository for
a City.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    private final CityRepository repository;

    public MyRunner(CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) throws Exception {
        repository.deleteAll();

        repository.save(new City("Bratislava", 432000));
        repository.save(new City("Budapest", 1759000));
        repository.save(new City("Prague", 1280000));

        repository.findAll().forEach((city) -&gt; {
            logger.info("{}", city);
        });
    }
}

By implementing the CommandLineRunner, the run 
method of the MyRunner class will be executed after the application
starts.

@Component
public class MyRunner implements CommandLineRunner {

MyRunner is also decorated with @Component, so it will
be autodetected and registered as well.

private final CityRepository repository;

public MyRunner(CityRepository repository) {
    this.repository = repository;
}

We inject the CityRepository bean into the repository
field.

@Override
public void run(String... args) throws Exception {

    repository.save(new City("Bratislava", 432000));
    repository.save(new City("Budapest", 1759000));
    repository.save(new City("Prague", 1280000));

    repository.findAll().forEach((city) -&gt; {
        logger.info("{}", city);
    });

In the run method, we create three cities and later 
find all of them and print them to the console.

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

Application is the entry point which sets up Spring Boot
application. 

$ ./gradlew bootRun

We run the application.

In this article we have shown how to use CommandLineRunner
interface to create a bean that is run when the application starts.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).