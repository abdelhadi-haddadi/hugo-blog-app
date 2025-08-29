+++
title = "Spring Boot Data JPA sort"
date = 2025-08-29T20:12:12.353+01:00
draft = false
description = "Spring Boot Data JPA sort tutorial shows how to sort query results in Spring Data JPA. Query results are sorted either with ORDER BY clause or with a Sort object."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Data JPA sort

last modified July 25, 2023

In this article we show how to sort query results in Spring Data JPA. Query
results are sorted either with ORDER BY clause or with a Sort object.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring that helps create stand-alone, production-grade Spring 
based applications easily.

## Spring Data JPA

*Spring Data JPA* is part of the umbrella Spring Data project that makes
it easier to implement JPA based repositories. Spring Data JPA uses JPA to store
data in a relational database. It can create repository implementations
automatically, at runtime, from a repository interface. 

## Spring Data JPA sorting

In Spring Data JPA query results can be sorted in two ways:

    - using an ORDER BY clause in a JPQL query

    - adding a parameter of type Sort to the query method

## Spring Boot Data JPA sort example

The following application retrieves cities sorted in ascending order. 

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───controller
│   │           │       MyController.java
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

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    runtimeOnly 'com.h2database:h2'
}

This is the Gradle build file.

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2
spring.jpa.hibernate.ddl-auto=none

In the main properties file, we turn off the Spring Boot banner with the 
spring.main.banner-mode property. The spring.sql.init.platform
is set to h2, so the database name is present in the database initialization 
scripts. Since we initialize scripts from SQL code, we turn off automatic creation of tables 
from entities by settting spring.jpa.hibernate.ddl-auto to none.

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

This is the City entity. 

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
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Suzhou', 4327066);
INSERT INTO cities(name, population) VALUES('Zhengzhou', 4122087);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

Later, the data-h2.sql file is executed. It fills the
table with data.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;

import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAllOrderByPopulationAsc();
    List&lt;City&gt; findAllOrderByNameAsc();
}

ICityService contains two contract methods. 

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final CityRepository repository;

    @Autowired
    public CityService(CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public List&lt;City&gt; findAllOrderByPopulationAsc() {
        return repository.findAllOrderByPopulationAsc();
    }

    @Override
    public List&lt;City&gt; findAllOrderByNameAsc() {

        var sort = Sort.by(Sort.Direction.ASC, "name");
        return repository.findAllOrderByNameAsc(sort);
    }
}

Here we have the implementations of the two sorting methods. 

@Override
public List&lt;City&gt; findAllOrderByNameAsc() {

    var sort = Sort.by(Sort.Direction.ASC, "name");
    return repository.findAllOrderByNameAsc(sort);
}

The Sort.by sorts the query results by name in ascending order. It 
is passed to the findAllOrderByNameAsc method as a parameter.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

    @Query("FROM City ORDER BY population ASC")
    List&lt;City&gt; findAllOrderByPopulationAsc();

    @Query("FROM City")
    List&lt;City&gt; findAllOrderByNameAsc(Sort sort);
}

CityRepository has two sorting methods. In the first case, 
we use the ORDER BY clause. In the second case, we use the 
Sort object. 

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyController {

    private final ICityService cityService;

    @Autowired
    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping(value = "/cities")
    public List&lt;City&gt; getCitiesByPopulation() {

        return cityService.findAllOrderByPopulationAsc();
    }

    @GetMapping(value = "/cities2")
    public List&lt;City&gt; getCitiesByName() {

        return cityService.findAllOrderByNameAsc();
    }
}

The controller is RESTFul and returns data in a JSON format.

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

Application is the entry point which sets up the Spring Boot
application. 

We run the application with ./gradlew bootRun.

$ curl localhost:8080/cities
[{"id":1,"name":"Bratislava","population":432000},{"id":7,"name":"Edinburgh","population":464000},
{"id":3,"name":"Prague","population":1280000},{"id":4,"name":"Warsaw","population":1748000},
{"id":2,"name":"Budapest","population":1759000},{"id":10,"name":"Berlin","population":3671000},
{"id":5,"name":"LosAngeles","population":3971000},{"id":9,"name":"Zhengzhou","population":4122087},
{"id":8,"name":"Suzhou","population":4327066},{"id":6,"name":"NewYork","population":8550000}]

In this output, the cities are sorted by population in asceding order.

$ curl localhost:8080/cities2
[{"id":10,"name":"Berlin","population":3671000},{"id":1,"name":"Bratislava","population":432000},
{"id":2,"name":"Budapest","population":1759000},{"id":7,"name":"Edinburgh","population":464000},
{"id":5,"name":"LosAngeles","population":3971000},{"id":6,"name":"NewYork","population":8550000},
{"id":3,"name":"Prague","population":1280000},{"id":8,"name":"Suzhou","population":4327066},
{"id":4,"name":"Warsaw","population":1748000},{"id":9,"name":"Zhengzhou","population":4122087}]

In this output, the cities are sorted by name in asceding order.

This article showed how to sort query results in Spring Boot Data JPA. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).