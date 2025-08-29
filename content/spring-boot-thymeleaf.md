+++
title = "Spring Boot Thymeleaf"
date = 2025-08-29T20:12:36.633+01:00
draft = false
description = "Spring Boot Thymeleaf tutorial shows how to create a simple Spring Boot web application with the Thymeleaf template engine and H2 database."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Thymeleaf

last modified July 29, 2023

In this article we show how to create a simple Spring Boot web application with
the Thymeleaf template engine and H2 database.

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications with minimal effort.

H2 is an open source relational database management system created
entirely in Java. It can be embedded in Java applications or run in the
client-server mode. It is easy to deploy and install and has small footprint.

## Thymeleaf

Thymeleaf is a modern server-side Java template engine for both web
and standalone environments. It builds on the he concept of natural templates:
template files that can be directly opened in browsers and that still display
correctly as web pages. 

## Spring Boot Thymeleaf example

The next example creates a Spring Boot web application that uses Thymeleaf
engine. The data is stored in H2 database.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── controller
│   │           │   └── MyController.java
│   │           ├── model
│   │           │   └── City.java
│   │           └── service
│   │               ├── CityService.java
│   │               └── ICityService.java
│   └── resources
│       ├── application.properties
│       ├── application.yml
│       ├── data-h2.sql
│       ├── schema-h2.sql
│       ├── static
│       │   └── css
│       │       └── style.css
│       └── templates
│           ├── cities.html
│           └── index.html
└── test
    ├── java
    └── resources

This is the project structure. Thymeleaf template files are located in the
src/main/resources/templates directory by default.

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
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'

    runtimeOnly 'com.h2database:h2'
}

The spring-boot-starter-thymeleaf is a starter for building Spring
MVC applications with Thymeleaf. The spring-boot-starter-jdbc is a
starter for using JDBC in Spring Boot. The h2 contains the H2
database engine.

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

This is City model class. It contains item id, name, and population
attributes.

resources/application.yml
  

spring:
  main:
    banner-mode: off
    log-startup-info: false
  sql:
    init:
      platform: h2

The application.yml is the main Spring Boot configuration
file. With the banner-mode property we turn off the Spring banner.
With the log-startup-info property we turn off the Spring Boot
startup log messages. The platform value is used in SQL initialization scripts:
schema-${platform}.sql and data-${platform}.sql.

Notice that we do not configure the datasource; Spring automatically configures
H2 in the in-memory mode if there is no configuration data. We wanted to have an
in-memory database, so we leave Spring to do the automatic configuration.

resources/schema-h2.sql
  

CREATE TABLE cities(id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), population INT);

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

This script fills the table with data. Both scripts are located
in the root of the classpath.

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
findAll method. We retrieve all cities from the
cities table with the help of the JdbcTemplate.

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

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class MyController {

    private final ICityService cityService;

    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/")
    public String index(Model model) {

        return "index";
    }

    @GetMapping("/cities")
    public ModelAndView showCities() {

        List&lt;City&gt; cities = cityService.findAll();

        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("cities", cities);

        return new ModelAndView("cities", params);
    }
}

This is the controller class for the Spring Boot web application. A controller
is decorated with the @Controller annotation. The  controller has
two mappings: one mapping for the home page and one for listing all cites.

private final ICityService cityService;

public MyController(ICityService cityService) {
    this.cityService = cityService;
}

We inject the CityService into the field.

@GetMapping("/")
public String index(Model model) {

    return "index";
}

The "index" is the name of the view located in the predefined
template directory. It is a simple static home page.

@GetMapping("/cities")
public ModelAndView showCities() {

    List&lt;City&gt; cities = cityService.findAll();

    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    params.put("cities", cities);

    return new ModelAndView("cities", params);
}

This controller method serves a list of cities. We find all city objects from
the city service and place the resulting list into the parameters. Spring will
locate the Thymeleaf view named cities and let the engine join the
template with the model data.

resources/static/css/style.css
  

h2 {color: blue}

The style.css is a static file located in the
src/main/resources/static/css directory. It sets the h2
tag to blue colour.

resources/templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en" xmlns:th="http://www.thymeleaf.org"&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"/&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"/&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="cities"&gt;Show cities&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.html is the home page of the application. It contains
a link to retrieve all cities.

resources/templates/cities.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en" xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;title&gt;Cities&lt;/title&gt;
    &lt;link rel="stylesheet" th:href="@{/css/style.css}" /&gt;
    &lt;meta charset="UTF-8"/&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"/&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;List of cities&lt;/h2&gt;

&lt;table&gt;

    &lt;tr&gt;
        &lt;th&gt;Id&lt;/th&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;th&gt;Population&lt;/th&gt;
    &lt;/tr&gt;

    &lt;tr th:each="city : ${cities}"&gt;
        &lt;td th:text="${city.id}"&gt;id&lt;/td&gt;
        &lt;td th:text="${city.name}"&gt;name&lt;/td&gt;
        &lt;td th:text="${city.population}"&gt;price&lt;/td&gt;
    &lt;/tr&gt;

&lt;/table&gt;

&lt;/body&gt;
&lt;/html&gt;

The cities.html is a Thymeleaf template file that contains
placeholders to be filled with data from the model. To access the data, we use
the ${} variable expressions.

&lt;link rel="stylesheet" th:href="@{/css/style.css}" /&gt;

We include the static CSS file with the Thymeleaf link
expression@{}. The link expression automatically adds the server
context path.

&lt;tr th:each="city : ${cities}"&gt;
    &lt;td th:text="${city.id}"&gt;id&lt;/td&gt;
    &lt;td th:text="${city.name}"&gt;name&lt;/td&gt;
    &lt;td th:text="${city.population}"&gt;price&lt;/td&gt;
&lt;/tr&gt;

We iterate over the list of cities and put each city details into one table row.

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

We run the application and locate to localhost:8080.

In this article we have created a Spring Boot web application with Thymeleaf
and H2.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).