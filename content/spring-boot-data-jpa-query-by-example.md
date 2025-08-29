+++
title = "Spring Boot Data JPA Query By Example"
date = 2025-08-29T20:12:12.358+01:00
draft = false
description = "Spring Boot Data JPA Query By Example tutorial shows how to create queries with Spring Data JPA Query By Example technique."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Data JPA Query By Example

last modified July 25, 2023

In this article we show how to create queries with Spring Data JPA Query By
Example technique.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## Spring Data JPA

Spring Data JPA facilitates the implementation of JPA based repositories. It
enhances support for JPA based data access layers. It makes it easier to build
Spring-powered applications that use data access technologies. Spring Data JPA
is a part of the larger Spring Data family.

## Spring Data JPA Query By Example

Query by Example (QBE) is a user-friendly querying technique with
a simple interface. It allows dynamic query creation. We do not need to write 
queries with store-specific query language.

We work with three objects. The probe is the actual example of a
domain object with populated fields. The ExampleMatcher contains
details on how to match particular fields. The Example 
consists of the probe and the ExampleMatcher. It is used to create
the query.

QBE has some limitations; it cannot create some more advanced queries.    

## Spring Boot Data JPA QBE example

The following application is uses QBE to generate queries.

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
│   │           ├───repository
│   │           │       CityRepository.java
│   │           └───service
│   │                   CityService.java
│   │                   ICityService.java
│   └───resources
│           application.properties
│           data-h2.sql
│           schema-h2.sql
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
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'com.h2database:h2'
}

The Gradle build file contains dependencies for H2 database and Spring Boot Data
JPA.

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2
spring.jpa.hibernate.ddl-auto=none

In the application.properties file we write various configuration
settings of a Spring Boot application. With the
spring.main.banner-mode property we turn off the Spring banner.

The spring.sql.init.platform sets the vendor name of the database.
It is used in the initialization scripts. The 
spring.jpa.hibernate.ddl-auto disables the automatic creation of
schemas from entities.

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

This is the City entity. Each entity must have at least two
annotations defined: @Entity and @Id.

resources/schema-h2.sql
  

CREATE TABLE cities(id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), population INT);

When the application is started, the schema-h2.sql script
is executed. It creates a new database table.

resources/data-h2.sql
  

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Brest', 139163);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Suzhou', 4327066);
INSERT INTO cities(name, population) VALUES('Zhengzhou', 4122087);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);
INSERT INTO cities(name, population) VALUES('Bucharest', 1836000);

Later, the data-h2.sql file is executed. It fills the table with
data.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt;,
        QueryByExampleExecutor&lt;City&gt; {

}

We enable the QBE API by extending our repository from the QueryByExampleExecutor.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;

import java.util.List;

public interface ICityService {

    List&lt;City&gt; findByNameEnding(String ending);
    List&lt;City&gt; findByName(String name);
}

ICityService provides two contract methods.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.exact;

@Service
public class CityService implements ICityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List&lt;City&gt; findByNameEnding(String ending) {

        var city = new City();
        city.setName(ending);

        var matcher = ExampleMatcher.matching()
                .withMatcher("name", ExampleMatcher.GenericPropertyMatcher::endsWith)
                .withIgnorePaths("population");

        var example = Example.of(city, matcher);
        return (List&lt;City&gt;) cityRepository.findAll(example);
    }

    @Override
    public List&lt;City&gt; findByName(String name) {

        var city = new City();
        city.setName(name);

        var matcher = ExampleMatcher.matching()
                .withMatcher("name", exact())
                .withIgnorePaths("population");

        var example = Example.of(city, matcher);
        return (List&lt;City&gt;) cityRepository.findAll(example);
    }
}

CityService contains the service method implementations. 

var city = new City();
city.setName(ending);

We have a City domain object. This is called the probe.

var matcher = ExampleMatcher.matching()
    .withMatcher("name", match -&gt; match.endsWith())
    .withIgnorePaths("population");

A matcher matches a string ending against the city name and ignores the
population. 

var example = Example.of(city, matcher);

An Example is created from the domain object and the matcher.

return (List&lt;City&gt;) cityRepository.findAll(example);

The Example is passed to the findAll method.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.service.ICityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    private final ICityService cityService;

    @Autowired
    public MyRunner(ICityService cityService) {
        this.cityService = cityService;
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("Finding cities by name");
        var res1 = cityService.findByName("Bratislava");
        logger.info("{}", res1);

        var res2 = cityService.findByName("Berlin");
        logger.info("{}", res2);

        logger.info("Finding cities by name ending with est");
        var res3 = cityService.findByNameEnding("est");
        logger.info("{}", res3);
    }
}

MyRunner looks for 'Bratislava' and 'Berlin' cities and finds all
cities whose name ends in 'est'.

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

$ ./gradlew bootRun
...
... Finding cities by name
... [City{id=1, name=Bratislava, population=432000}]
... [City{id=11, name=Berlin, population=3671000}]
... Finding cities by name ending with est
... [City{id=2, name=Budapest, population=1759000}, City{id=7, name=Brest, population=139163}, 
     City{id=12, name=Bucharest, population=1836000}]
...

We run the application.

In this article we have used Spring Data JPA Query By Example technique to
generate queries.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).