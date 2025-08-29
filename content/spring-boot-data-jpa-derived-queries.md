+++
title = "Spring Boot Data JPA derived queries"
date = 2025-08-29T20:12:11.121+01:00
draft = false
description = "Spring Boot Data JPA derived queries tutorial shows how to create queries from method names."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Data JPA derived queries

last modified July 25, 2023

In this article we show how to create queries from method names.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## Spring Data JPA

Spring Data JPA facilitates the implementation of JPA based repositories. It
enhances support for JPA based data access layers. It makes it easier to build
Spring-powered applications that use data access technologies. Spring Data JPA
is a part of the larger Spring Data family.

## Spring Data JPA derived queries

Spring Data JPA can create queries from method names. This is a specific form of 
a *convention over configuration*. Spring Data JPA creates queries from 
specific keywords with combination of attributes; for instance: 
findByAgeLessThan, findByFirstnameEndingWith, or 
findByFirstnameEquals. The list of keywords is available in Spring Data JPA
[documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation).

## Spring Boot Data JPA derived queries example

The following application is uses two derived queries.

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

The Gradle builds file contains dependencies for H2 database and Spring Boot Data
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

@Entity
@Table(name = "cities")
public class City {

The @Entity annotation specifies that the class is an entity and is
mapped to a database table. The @Table annotation specifies the
name of the database table to be used for mapping.

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;

The @Id annotation specifies the primary key of an entity and the
@GeneratedValue provides for the specification of generation
strategies for the values of primary keys.

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

Later, the data-h2.sql file is executed. It fills the
table with data.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

    List&lt;City&gt; findByNameEndingWith(String ending);
    List&lt;City&gt; findByPopulationLessThan(int population);
}

We have two methods from which derived queries are generated.

List&lt;City&gt; findByNameEndingWith(String ending);

Here the query will look form city names that end with a specified string.

List&lt;City&gt; findByPopulationLessThan(int population);

There the query will look for cities with population less than the specified amount.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;

import java.util.List;

public interface ICityService {

    List&lt;City&gt; findByNameEndingWith(String ending);
    List&lt;City&gt; findByPopulationLessThan(int population);
}

ICityService provides two contract methods.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    @Autowired
    private CityRepository cityRepository;

    @Override
    public List&lt;City&gt; findByNameEndingWith(String ending) {
        return cityRepository.findByNameEndingWith(ending);
    }

    @Override
    public List&lt;City&gt; findByPopulationLessThan(int population) {
        return cityRepository.findByPopulationLessThan(population);
    }
}

CityService contains the service method implementations. 
The derived queries are called on the cityRepository.

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

        logger.info("Finding cities having population less than one million");
        var res1 = cityService.findByPopulationLessThan(1000000);
        logger.info("{}", res1);

        logger.info("Finding cities by name ending with 'est'");
        var res2 = cityService.findByNameEndingWith("est");
        logger.info("{}", res2);
    }
}

The MyRunner fetches all cities with population less than one
million and all cities whose names end in 'est'.

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

$ ./gradlew bootRun -q
...
... Finding cities having population less than one million
... [City{id=1, name=Bratislava, population=432000}, City{id=7, name=Brest, population=139163}, 
     City{id=8, name=Edinburgh, population=464000}]
... Finding cities by name ending with 'est'
... [City{id=2, name=Budapest, population=1759000}, City{id=7, name=Brest, population=139163}, 
     City{id=12, name=Bucharest, population=1836000}]
...

We run the application.

In this article we have used Spring Data JPA derived queries to fetch data. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).