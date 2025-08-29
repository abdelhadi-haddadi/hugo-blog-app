+++
title = "Spring Boot JpaRepository"
date = 2025-08-29T20:12:20.827+01:00
draft = false
description = "SpringBoot JpaRepository tutorial shows how to use JpaRepository to manage data in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot JpaRepository

last modified July 23, 2023

SpringBoot JpaRepository tutorial shows how to use JpaRepository to manage data
in a Spring Boot application.

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications with minimal effort.

## Spring Data

Spring Data is Spring-based programming model for data access. It
reduces the amount of code needed for working with databases and datastores. It
consists of several modules. The Spring Data JPA simplifies the development of
Spring applications that use JPA technology.

With Spring Data, we define a repository interface for each domain entity in the
application. A repository contains methods for performing CRUD operations,
sorting and paginating data. @Repository is a marker annotation,
which indicates that the underlying interface is a repository. A repository is
created by extending specific repository interfaces, such as
CrudRepository, PagingAndSortingRepository, or
JpaRepository.

Spring Data has advanced integration with Spring MVC controllers and provides
dynamic query derivation from repository method names.

## JpaRepository

JpaRepository is JPA specific extension of Repository.
It contains the full API of CrudRepository and
PagingAndSortingRepository. So it contains API for basic CRUD
operations and also API for pagination and sorting.

## Spring Boot JpaRepository example

The following Spring Boot application manages a City entity with
JpaRepository. The data is saved in H2 database. The application is
a console program.

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
    └───java

This is the project structure.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'com.h2database:h2'
}

This is the Gradle build file. The spring-boot-starter-data-jpa is
a starter for using Spring Data JPA with Hibernate.

resources/application.properties
  

spring.main.banner-mode=off
logging.pattern.console=%clr(%d{yy-MM-dd E HH:mm:ss.SSS}){blue} %clr(%-5p) %clr(%logger{0}){blue} %clr(%m){faint}%n

The application.properties is the main Spring Boot configuration
file. With the spring.main.banner-mode property we turn off the
Spring banner. The logging.pattern.console defines the log pattern
for the console. 

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

This is the City entity. It contains the following
attributes: id, name, and population.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository&lt;City, Long&gt; {

}

The CityRepository extends from the JpaRepository.
It provides the type of the entity and of its primary key.

**Note: ** In Java enterprise applications it is a good practice 
to define a service layer that works with repositories. For simplicity reasons, 
we skip the service layer.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    private final CityRepository cityRepository;

    @Autowired
    public MyRunner(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        cityRepository.save(new City("Bratislava", 432000));
        cityRepository.save(new City("Budapest", 1759000));
        cityRepository.save(new City("Prague", 1280000));
        cityRepository.save(new City("Warsaw", 1748000));
        cityRepository.save(new City("Los Angeles", 3971000));
        cityRepository.save(new City("New York", 8550000));
        cityRepository.save(new City("Edinburgh", 464000));

        logger.info("# of cities: {}", cityRepository.count());

        logger.info("All cities unsorted:");
        var cities = cityRepository.findAll();
        logger.info("{}", cities);

        logger.info("------------------------");

        logger.info("All cities sorted by name in descending order");
        var sortedCities = cityRepository.findAll(Sort.by(Sort.Direction.DESC, "name"));
        logger.info("{}", sortedCities);

        logger.info("------------------------");

        logger.info("Deleting all cities");
        cityRepository.deleteAllInBatch();

        logger.info("# of cities: {}", cityRepository.count());
    }
}

In the MyRunner, we use various methods of the JpaRepository.

private final CityRepository cityRepository;

@Autowired
public MyRunner(CityRepository cityRepository) {
    this.cityRepository = cityRepository;
}

We inject the CityRepository into the cityRepository field.

cityRepository.save(new City("Bratislava", 432000));

A new city is inserted with save.

logger.info("# of cities: {}", cityRepository.count());

We count the number of cities with count.

logger.info("All cities unsorted:");
var cities = cityRepository.findAll();
logger.info("{}", cities);

With findAll, we get all cities.

logger.info("All cities sorted by name in descending order");
var sortedCities = cityRepository.findAll(Sort.by(Sort.Direction.DESC, "name"));
logger.info("{}", sortedCities);

By passing a Sort object to the findAll method, we 
get all cities sorted by names in descending order.

logger.info("Deleting all cities");
cityRepository.deleteAllInBatch();

We delete all cities in a batch with deleteAllInBatch.

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

...
... INFO  MyRunner # of cities: 7
... INFO  MyRunner All cities unsorted:
... INFO  MyRunner [City{id=1, name=Bratislava, population=432000}, City{id=2, name=Budapest, population=1759000}, City{id=3, name=Prague, population=1280000}, City{id=4, name=Warsaw, population=1748000}, City{id=5, name=Los Angeles, population=3971000}, City{id=6, name=New York, population=8550000}, City{id=7, name=Edinburgh, population=464000}]
... INFO  MyRunner ------------------------
... INFO  MyRunner All cities sorted by name in descending order
... INFO  MyRunner [City{id=4, name=Warsaw, population=1748000}, City{id=3, name=Prague, population=1280000}, City{id=6, name=New York, population=8550000}, City{id=5, name=Los Angeles, population=3971000}, City{id=7, name=Edinburgh, population=464000}, City{id=2, name=Budapest, population=1759000}, City{id=1, name=Bratislava, population=432000}]
... INFO  MyRunner ------------------------
... INFO  MyRunner Deleting all cities
... INFO  MyRunner # of cities: 0
...

In this article we have managed our application data with JpaRepository.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).