+++
title = "Spring Boot H2"
date = 2025-08-29T20:12:18.614+01:00
draft = false
description = "Spring Boot H2 tutorial shows how to work with an embedded H2 in-memory database in a Spring Boot application. A simple RESTful application is created."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot H2

last modified August 2, 2023

In this article we show how to work with an embedded H2 in-memory database in a
Spring Boot application. A simple RESTful application is created.

Spring is a Java application framework for developing Java enterprise
applications. It also helps integrate various enterprise components. Spring Boot
makes it easy to create Spring-powered, production-grade applications and
services with minimum setup requirements.

H2 is an open source relational database management system created
entirely in Java. It can be embedded in Java applications or run in the
client-server mode. It is easy to deploy and install and has small footprint.

JdbcTemplate is a Spring library that helps programmers create 
applications that work with relational databases and JDBC. It takes care of many 
tedious and error-prone low-level details such as handling transactions, 
cleaning up resources, and correctly handling exceptions. 
JdbcTemplate is shipped in Spring's spring-jdbc module.

JSON (JavaScript Object Notation) is a lightweight data-interchange format. 
Humans can easily read and write and machines parse and generate JSON.
The official Internet media type for JSON is application/json. 
The JSON filename extension is .json.

A RESTFul application follows the REST architectural style, which is used for
designing networked applications. RESTful applications generate HTTP requests
which perform CRUD (Create/Read/Update/Delete) operations on resources.

## Spring Boot RESTFul application

H2 can be easily used with Spring Boot. When Spring Boot detects H2 in the POM
file, it automatically configures an in-memory H2 database for the application.

The following is a simple Spring Boot application that has RESTFul services. 

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
│   │           └───service
│   │                   CityService.java
│   │                   ICityService.java
│   └───resources
│           application.properties
│           data-h2.sql
│           schema-h2.sql
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
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    runtimeOnly 'com.h2database:h2'
}

The build.gradle file contains the necessary dependencies.

com/zetcode/model/City.java
  

package com.zetcode.model;

import java.util.Objects;
import java.util.StringJoiner;

public class City {

    private Long id;
    private String name;
    private int population;

    public City() {
    }

    public City(Long id, String name, int population) {
        this.id = id;
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
                Objects.equals(id, city.id) &amp;&amp;
                Objects.equals(name, city.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, population);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", City.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("name='" + name + "'")
                .add("population=" + population)
                .toString();
    }
}

This is City bean class. It contains the following attributes:
id, name, and population.

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.url=jdbc:h2:mem:testdb

The application.properties is the main Spring Boot configuration
file. We turn of the Spring Boot banner and configure the H2 database. The
platform value is used in SQL initialization scripts:
schema-${platform}.sql
and data-${platform}.sql. 

Notice that we do not configure the datasource. This is because Spring
automatically configures H2 in the in-memory mode if there is no configuration
data. We wanted to have an in-memory database, so we leave Spring to do the
automatic configuration.

resources/schema-h2.sql
  

CREATE TABLE cities(id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), population BIGINT);

This SQL script creates the cities table.

resources/data-h2.sql
  

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

This script fills the table with data. Both scripts are located in the root of
the classpath.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAll();
    City findById(Long id);
}

ICityService provides contract methods to get all cities and get a
city by its Id from the data source.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final JdbcTemplate jtm;

    public CityService(JdbcTemplate jtm) {
        this.jtm = jtm;
    }

    @Override
    public List&lt;City&gt; findAll() {

        String sql = "SELECT * FROM cities";

        return jtm.query(sql, new BeanPropertyRowMapper&lt;&gt;(City.class));
    }

    @Override
    public City findById(Long id) {

        String sql = "SELECT * FROM cities WHERE id = ?";

        return jtm.queryForObject(sql, new BeanPropertyRowMapper&lt;&gt;(City.class), id);
    }
}

CityService contains the implementation of the findAll 
and the findById methods. We retrieve all cities from 
the cities table with the help of the JdbcTemplate.

private final JdbcTemplate jtm;

public CityService(JdbcTemplate jtm) {
    this.jtm = jtm;
}

JdbcTemplate is injected.

String sql = "SELECT * FROM cities";

With this SQL we select all cities from the cities table.

return jtm.query(sql, new BeanPropertyRowMapper&lt;&gt;(City.class));

BeanPropertyRowMapper converts a row into a new instance of the 
specified mapped target class.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyController {

    private final ICityService cityService;

    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @RequestMapping("/cities")
    public List&lt;City&gt; findCities() {

        return cityService.findAll();
    }

    @RequestMapping("/cities/{cityId}")
    public City findCity(@PathVariable Long cityId) {

        return cityService.findById(cityId);
    }

    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity&lt;String&gt; noCityFound(EmptyResultDataAccessException e) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No City found");
    }
}

In the MyController, we have two methods that react to two
requests. The traditional MVC controller uses a view technology to perform
server-side rendering to HTML. The RESTful web service controller writes data to
the HTTP response. The default format is JSON.

@RestController
public class MyController {

@RestController annotation creates RESTFul web services in Spring.

private final ICityService cityService;

public MyController(ICityService cityService) {
    this.cityService = cityService;
}

We inject the CityService object. It is used to retrieve data from
the database.

@RequestMapping("/cities")
public List&lt;City&gt; findCities() {

    return cityService.findAll();
}

We get all the cities. 

@RequestMapping("/cities/{cityId}")
public City findCity(@PathVariable Long cityId) {

    return cityService.findById(cityId);
}

We find a specific city.

@ExceptionHandler(EmptyResultDataAccessException.class)
public ResponseEntity&lt;String&gt; noCityFound(EmptyResultDataAccessException e) {

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No City found");
}

We send an error message if no city is found. 

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

$ ./gradlew bootRun

We start Spring Boot application.

$ curl localhost:8080/cities
[{"id":1,"name":"Bratislava","population":432000},{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},{"id":8,"name":"Berlin","population":3671000}]

Here we get the list of cities in a JSON string.

In this article we used an in-memory H2 database in a RESTFul web application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/all/#sprinboot).