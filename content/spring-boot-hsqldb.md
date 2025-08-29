+++
title = "Spring Boot HSQLDB"
date = 2025-08-29T20:12:18.622+01:00
draft = false
description = "Spring Boot HSQLDB tutorial shows how to use HSQLDB database in Spring Boot applications."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot HSQLDB

last modified July 16, 2023

Spring Boot HSQLDB tutorial shows how to use HSQLDB database in Spring Boot
applications.

## HSQLDB

HSQLDB is an open source relational database management system created
entirely in Java. It offers a small, fast multithreaded and transactional database
engine with in-memory and disk-based tables and supports embedded and server modes.
It includes a powerful command line SQL tool and simple GUI query tools.

## Spring Boot HSQLDB example

The following example is a Spring Boot web application that uses HSQLDB
database.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── controller
│   │           │   └── CityController.java
│   │           ├── model
│   │           │   └── City.java
│   │           └── service
│   │               ├── CityService.java
│   │               └── ICityService.java
│   └── resources
│       ├── application.yaml
│       ├── data-hsqldb.sql
│       ├── schema-hsqldb.sql
│       ├── static
│       │   ├── css
│       │   │   └── style.css
│       │   └── index.html
│       └── templates
│           └── showCities.mustache
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
    implementation 'org.springframework.boot:spring-boot-starter-mustache'
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'

    runtimeOnly 'org.hsqldb:hsqldb'
}

This is the Gradle build file. The spring-boot-starter-mustache
is starter for building Spring MVC applications with Mustache. The
hsqldb is a driver for HSQLDB. The
spring-boot-starter-jdbc is a starter for using JDBC in Spring
Boot.

com/zetcode/model/City.java
  

package com.zetcode.model;

import java.util.Objects;

public class City {

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

This is the City class. It contains the id, name, and population
fields.

resources/application.yml
  

spring:
  main:
    banner-mode: off
  sql:
    init:
      platform: hsqldb

The application.yml is the main Spring Boot configuration file.
With the banner-mode property we turn off the Spring banner. The
platform value is used in SQL initialization scripts:
schema-${platform}.sql and data-${platform}.sql.

Notice that we do not configure the datasource; Spring automatically configures
HSQLDB in the in-memory mode if there is no configuration data. We wanted to
have an in-memory database, so we leave Spring to do the automatic
configuration.

resources/schema-hsqldb.sql
  

CREATE TABLE cities(id BIGINT IDENTITY PRIMARY KEY,
    name VARCHAR(255), population INT);

This SQL script creates the cities table. HSQLDB uses
IDENTITY clause to create auto-incremented columns. By default, the
ids start from zero.

resources/data-hsqldb.sql
  

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

This script fills the table with data. Both scripts are located in the root of
the classpath.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAll();
}

ICityService provides a contract method to get all cities from the
data source.

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
}

CityService contains the implementation of the
findAll method. We retrieve all cities from the cities
table with the help of the JdbcTemplate.

private final JdbcTemplate jtm;

public CityService(JdbcTemplate jtm) {
    this.jtm = jtm;
}

JdbcTemplate is injected.

String sql = "SELECT * FROM cities";

This is SQL to be executed. We select all cities from the cities
table.

return jtm.query(sql, new BeanPropertyRowMapper&lt;&gt;(City.class));

BeanPropertyRowMapper converts a row into a new instance of the
specified mapped target class.

com/zetcode/controller/CityController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CityController {

    private final ICityService cityService;

    public CityController(ICityService cityService) {
        this.cityService = cityService;
    }

    @RequestMapping("/showCities")
    public ModelAndView showCities() {

        List&lt;City&gt; cities = cityService.findAll();

        System.out.println(cities);

        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("cities", cities);

        return new ModelAndView("showCities", params);
    }
}

This is the controller class for the Spring Boot web application. A controller
is decorated with the @Controller annotation. The
/showCities mapping lists all cities.

private final ICityService cityService;

public CityController(ICityService cityService) {
    this.cityService = cityService;
}

We inject the ICityService into the field.

@RequestMapping("/showCities")
public ModelAndView showCities() {

    List&lt;City&gt; cities = cityService.findAll();

    System.out.println(cities);

    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    params.put("cities", cities);

    return new ModelAndView("showCities", params);
}

This controller method serves a list of cities. We find all city objects from
the city service and place the resulting list into the parameters. Spring will
locate the Mustache view named showCities and let the engine join
the template with the data.

resources/static/css/style.css
  

h2 {color: blue}

td:nth-child(3) {
    text-align: right;
}

The style.css is a static file located in the
src/main/resources/static/css directory. It sets the h2 tag to blue
colour and right aligns the data of the third column.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"/&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"/&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="showCities"&gt;Show cities&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.html template file is the home page of the application.
It contains a link to retrieve all city objects.

resources/templates/showCities.mustache
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;title&gt;Cities&lt;/title&gt;
    &lt;link rel="stylesheet" href="css/style.css" /&gt;
    &lt;meta charset="UTF-8"/&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"/&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;Cities&lt;/h2&gt;

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Id&lt;/th&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;th&gt;Population&lt;/th&gt;
    &lt;/tr&gt;
    {{#cities}}
        &lt;tr&gt;
            &lt;td&gt;{{id}}&lt;/td&gt;
            &lt;td&gt;{{name}}&lt;/td&gt;
            &lt;td&gt;{{population}}&lt;/td&gt;
        &lt;/tr&gt;
    {{/cities}}
&lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;

The showCities.mustache is a Mustache template file that contains
placeholders to be filled with data from the model. Mustache uses
{{}} syntax.

&lt;link rel="stylesheet" href="css/style.css" /&gt;

We include the static CSS file.

{{#cities}}
    &lt;tr&gt;
        &lt;td&gt;{{id}}&lt;/td&gt;
        &lt;td&gt;{{name}}&lt;/td&gt;
        &lt;td&gt;{{population}}&lt;/td&gt;
    &lt;/tr&gt;
{{/cities}}

The {{#cities}} syntax is called a section. Sections render blocks
of text one or more times, depending on the value of the key in the current
context. A section begins with {{#name}} and ends with
{{/name}}. If the value is a non-empty list the section will be
displayed multiple times. In each case the context of the section will be set to
the element in the list.

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

We set up the Spring Boot application. The @SpringBootApplication
annotation enables auto-configuration and component scanning.

$ ./gradlew bootRun

We run the application and navigate to localhost:8080.

In this article we have created a Spring Boot web application with HSQLDB and
Mustache.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).