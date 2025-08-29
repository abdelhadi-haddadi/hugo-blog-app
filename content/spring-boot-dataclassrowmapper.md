+++
title = "Spring Boot DataClassRowMapper"
date = 2025-08-29T20:12:09.968+01:00
draft = false
description = "Spring Boot DataClassRowMapper tutorial shows how to convert a table row into a new instance of a specified bean class with DataClassRowMapper."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot DataClassRowMapper

last modified July 23, 2023

In this article we show how to convert a table row into a new instance of a
specified bean class with DataClassRowMapper.

Spring Boot is a popular application framework for creating enterprise
application in Java, Kotlin, or Groovy.

## DataClassRowMapper

DataClassRowMapper is a RowMapper implementation that
converts a table row into a new instance of the specified mapped target class.
The mapped target class must be a top-level class.

DataClassRowMapper allows us to use Java records.

## Spring Boot DataClassRowMapper example

The following application uses a DataClassRowMapper to map a result
set row to a City bean.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── model
│   │           │   └── City.java
│   │           ├── MyRunner.java
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

This is the project structure of the Spring Boot application.

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
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    runtimeOnly 'com.h2database:h2'
}

The build.gradle file contains dependencies for
spring-boot-starter-jdbc and h2.

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.url=jdbc:h2:mem:testdb

In the application.properties, we turn off the Spring Boot banner
and set up the H2 datasource.

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

The SQL script fills the table with data.

com/zetcode/model/City.java
  

package com.zetcode.model;

public record City(Long id, String name, Integer population) {}

This is the City model class.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;

import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAll();
    City findById(Long id);
}

There are two contract methods in the ICityService.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import org.springframework.jdbc.core.DataClassRowMapper;
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

        return jtm.query(sql, DataClassRowMapper.newInstance(City.class));
    }

    @Override
    public City findById(Long id) {
        String sql = "SELECT * FROM cities WHERE id = ?";
        return jtm.queryForObject(sql, new DataClassRowMapper&lt;&gt;(City.class), id);
    }
}

We have the implementations of the two contract methods, using the
DataClassRowMapper. The column values are mapped based on matching
the column name as obtained from result set meta-data to corresponding Java
record properties.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.service.ICityService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private final ICityService cityService;

    public MyRunner(ICityService cityService) {
        this.cityService = cityService;
    }

    @Override
    public void run(String... args) throws Exception {

        var city = cityService.findById(1L);
        System.out.println(city);

        var data = cityService.findAll();
        System.out.println(data);
    }
}

In the MyRunner, we find one city by its Id and then find all cities.

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
...
City[id=1, name=Bratislava, population=432000]
[City[id=1, name=Bratislava, population=432000], City[id=2, name=Budapest, population=1759000],
City[id=3, name=Prague, population=1280000], City[id=4, name=Warsaw, population=1748000],
City[id=5, name=Los Angeles, population=3971000], City[id=6, name=New York, population=8550000],
City[id=7, name=Edinburgh, population=464000], City[id=8, name=Berlin, population=3671000]]
...

In this article we have worked with Spring Boot DataClassRowMapper.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).