+++
title = "Spring Boot findAll"
date = 2025-08-29T20:12:15.250+01:00
draft = false
description = "Spring Boot findAll shows how to retrieve all entities using findAll method of the CrudRepository."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot findAll

last modified July 18, 2023

Spring Boot findAll shows how to retrieve all entities using findAll method of
the CrudRepository.

Spring is a popular Java/Kotlin application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## CrudRepository

CrudRepository interface provides generic CRUD operations on a
repository for a specific type. Its findAll method retrieves all
entities of the type.

## Spring Boot findAll example

The following application sets up a repository of City objects. In
the console runner we retrieve city objects by their Ids.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── MyRunner.java
│   │           ├── model
│   │           │   └── City.java
│   │           ├── repository
│   │           │   └── CityRepository.java
│   │           └── service
│   │               ├── CityService.java
│   │               └── ICityService.java
│   └── resources
│       ├── application.properties
│       ├── data-h2.sql
│       └── schema-h2.sql
└── test
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

The build.gradle file contains dependencies for Spring Data JPA
and H2 database.

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2
spring.jpa.hibernate.ddl-auto=none

The application.properties is Spring Boot's main configuration
file. The Spring Boot banner is turned off with the
spring.main.banner-mode property.

The spring.sql.init.platform sets the vendor name of the database.
It is used in the initialization scripts. The
spring.jpa.hibernate.ddl-auto disables the automatic creation of
schemas from entities.

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

The table is filled with data from the data-h2.sql file.

com/zetcode/model/City.java
  

package com.zetcode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Objects;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        City city = (City) o;
        return population == city.population &amp;&amp;
                Objects.equals(name, city.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, population);
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

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

}

By extending from the Spring CrudRepository, we have some basic
methods for our data repository implemented. 

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;

public interface ICityService {

    Iterable&lt;City&gt; findAll();
}

ICityService provides a contract method to retrieve all cities.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService implements ICityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public Iterable&lt;City&gt; findAll() {

        return cityRepository.findAll();
    }
}

CityService contains the implementation of the findAll
method. We use the repository to retrieve data from the database.

private final CityRepository cityRepository;

@Autowired
public CityService(CityRepository cityRepository) {
    this.cityRepository = cityRepository;
}

CityRepository is injected.

@Override
public Iterable&lt;City&gt; findAll() {

    return cityRepository.findAll();
}

The findAll returns the Iterable&lt;City&gt;.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private final ICityService cityService;

    @Autowired
    public MyRunner(ICityService cityService) {
        this.cityService = cityService;
    }

    @Override
    public void run(String... args) throws Exception {

        var cities = cityService.findAll();
        cities.forEach(System.out::println);
    }
}

In the MyRunner we retrieve all cities.

var cities = cityService.findAll();
cities.forEach(System.out::println);

We get all cities and print them to the console.

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
City(id=1, name='Bratislava', population=432000)
City(id=2, name='Budapest', population=1759000)
City(id=3, name='Prague', population=1280000)
City(id=4, name='Warsaw', population=1748000)
City(id=5, name='Los Angeles', population=3971000)
City(id=6, name='New York', population=8550000)
City(id=7, name='Edinburgh', population=464000)
City(id=8, name='Suzhou', population=4327066)
City(id=9, name='Zhengzhou', population=4122087)
City(id=10, name='Berlin', population=3671000)
...

We run the application.

In this article we have showed how to find all entities using
CrudRepository's findAll method. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).