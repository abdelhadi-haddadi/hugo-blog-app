+++
title = "Spring Boot REST H2"
date = 2025-08-29T19:48:44.654+01:00
draft = false
description = "In this article we create a simple Spring Boot RESTful application with H2 database."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot REST H2

last modified July 25, 2023

In this article we create a simple Spring Boot RESTful application with H2
database.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is a way to create stand-alone,
production-grade Spring based applications with minimal effort.

Apache Tomcat  is an open source Java Servlet Container developed by
the Apache Software Foundation (ASF). Tomcat implements several Java EE
specifications including Java Servlet, JavaServer Pages (JSP), Java EL, and
WebSocket. Tomcat can be run in standalone and embedded mode.

H2 is an open source relational database management system created
entirely in Java. It can be embedded in Java applications or run in the
client-server mode. It is easy to deploy and install and has small footprint.

JdbcTemplate is a Spring library that helps programmers create
applications that work with relational databases and JDBC. It takes care of many
tedious and error-prone low-level details such as handling transactions,
cleaning up resources, and correctly handling exceptions.
JdbcTemplate is shipped in Spring's spring-jdbc module.

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. Humans can easily read and write and machines parse and generate JSON.
The official Internet media type for JSON is application/json. The
JSON filename extension is .json.

A RESTFul application follows the REST architectural style, which is used for
designing networked applications. RESTful applications generate HTTP requests
which perform CRUD (Create/Read/Update/Delete) operations on resources.

## Application

Our application is a Spring Boot RESTful application that runs on embedded Tomcat
server. It returns data from H2 database in JSON format. The application uses
JdbcTemplate to simplify JDBC programming.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── bean
│   │           │   └── City.java
│   │           ├── controller
│   │           │   └── MyController.java
│   │           └── service
│   │               ├── CityService.java
│   │               └── ICityService.java
│   └── resources
│       ├── application.yml
│       ├── data-h2.sql
│       └── schema-h2.sql
└── test
    └── java

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
    implementation 'com.h2database:h2'
}

This is the Gradle build file. The h2 dependency is a driver for H2
database. The spring-boot-starter-web is starter for building web,
including RESTful, applications using Spring MVC. The
spring-boot-starter-jdbc is a starter for using JDBC in Spring
Boot.

application.yml
  

server:
  port: 8086
  servlet:
    context-path: /rest

spring:
  main:
    banner-mode: "off"
  datasource:
    driverClassName: org.h2.Driver
    url: jdbc:h2:mem:testdb
  sql:
    init:
      platform: h2

logging:
  level:
    org:
      springframework: ERROR

The application.yml file contains various configuration settings of
a Spring Boot application. We have mappings for server port and context path
(application name). With the banner-mode property we turn off the
Spring banner. The platform value is used in SQL initialization scripts:
schema-${platform}.sql and data-${platform}.sql. The
H2 database is run in memory. Also, we set the logging level for spring
framework to ERROR. The file is located in the in the
src/main/resources directory.

com/zetcode/bean/City.java
  

package com.zetcode.bean;

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
    public String toString() {
        return "City{" + "id=" + id + ", name=" + name +
                ", population=" + population + '}';
    }
}

This is the City bean.

schema-h2.sql
  

CREATE TABLE cities(id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), population BIGINT);

This SQL script creates the cities table.

data-h2.sql
  

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

import com.zetcode.bean.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAll();
    City findById(Long id);
}

ICityService provides contract methods to get all cities and get a
city by its id from the data source.

com/zetcode/CityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final JdbcTemplate jtm;

    @Autowired
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

        String sql = "SELECT * FROM cities WHERE id=?";

        return jtm.queryForObject(sql, new BeanPropertyRowMapper&lt;&gt;(City.class), id);
    }
}

CityService contains the implementation of the findAll
and findById methods. We use Spring JdbcTemplate to execute SQL
code.

private final JdbcTemplate jtm;

@Autowired
public CityService(JdbcTemplate jtm) {
    this.jtm = jtm;
}

JdbcTemplate is injected.

String sql = "SELECT * FROM cities";

This is SQL to select all cities from the cities table.

return jtm.query(sql, new BeanPropertyRowMapper&lt;&gt;(City.class));

The statement is executed with query.
BeanPropertyRowMapper converts a row into a new instance of the
specified mapped target class.

String sql = "SELECT * FROM cities WHERE id=?";

This is SQL to select a specific city identified by id from the
cities table.

return jtm.queryForObject(sql, new BeanPropertyRowMapper&lt;&gt;(City.class), id);

To get one row from the cities table, we use the
queryForObject
method.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.City;
import com.zetcode.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyController {

    private final ICityService cityService;

    @Autowired
    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @RequestMapping("/cities")
    public List&lt;City&gt; findCities() {

        return cityService.findAll();
    }

    @RequestMapping("/cities/{userId}")
    public City findCity(@PathVariable Long userId) {

        return cityService.findById(userId);
    }
}

This is the controller class for the Spring Boot RESTful application. The
@RestController annotation creates a RESTful controller. While the
traditional MVC controller uses ModelAndView, the RESTful
controller simply returns the object and the object data is written directly to
the HTTP response in JSON or XML format.

private final ICityService cityService;

@Autowired
public MyController(ICityService cityService) {
    this.cityService = cityService;
}

We inject a ICityService into the countryService
field.

@RequestMapping("/cities")
public List&lt;City&gt; findCities() {

    return cityService.findAll();
}

The @RequestMapping annotation is used to map web requests to Spring
controller methods. Here we map a request with the /cities path
to the controller's findCities method. The default request is
a GET request.

We do not need to convert the City domain object to JSON manually.
Because Jackson 2 is on the classpath, included via
spring-boot-starter-web, Spring chooses
MappingJackson2HttpMessageConverter
automatically to convert the City instance to JSON.

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

With ./gradlew bootRun command, we run the application. The
application is deployed on embedded Tomcat server.

$ curl localhost:8086/rest/cities
[{"id":1,"name":"Bratislava","population":432000},{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},{"id":8,"name":"Berlin","population":3671000}]

With the curl command, we get all cities.

$ curl localhost:8086/rest/cities/1
{"id":1,"name":"Bratislava","population":432000}

Here we get one city identified by its id.

In this article we have created a Spring Boot RESTful application, which returns
data from H2 database in JSON format.