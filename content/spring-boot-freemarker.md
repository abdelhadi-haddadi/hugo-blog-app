+++
title = "Spring Boot FreeMarker"
date = 2025-08-29T20:12:17.521+01:00
draft = false
description = "Spring Boot FreeMarker tutorial shows how to create a simple Spring Boot web application with FreeMarker template engine and H2 database."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot FreeMarker

last modified August 2, 2023

In this article we create a simple Spring Boot web application with FreeMarker
template engine and H2 database.

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications without musch hassle.

H2 is an open source relational database management system created
entirely in Java. It can be embedded in Java applications or run in the
client-server mode. It is easy to deploy and install and has small footprint.

## FreeMarker

FreeMarker is a server-side Java template engine for both web and
standalone environments. Templates are written in the FreeMarker Template
Language (FTL), which is a simple, specialized language.

**Note: ** Spring Boot recently changed the default extension from
.ftl to .ftlh.

spring.freemarker.template-loader-path=classpath:/templates
spring.freemarker.suffix=.ftl

The default suffix and the templates directory can be changed with
the above settings.

## Spring Boot FreeMarker example

The following example uses FreeMarker template engine.

build.gradle
...
src
├── main
│  ├── java
│  │  └── com
│  │      └── zetcode
│  │          ├── Application.java
│  │          ├── controller
│  │          │  └── MyController.java
│  │          ├── model
│  │          │  └── City.java
│  │          └── service
│  │              ├── CityService.java
│  │              └── ICityService.java
│  └── resources
│      ├── application.properties
│      ├── data-h2.sql
│      ├── schema-h2.sql
│      ├── static
│      │  └── css
│      │      └── style.css
│      └── templates
│          ├── index.ftlh
│          └── showCities.ftlh
└── test
    ├── java
    └── resources

This is the project structure. FreeMarker template files have .ftlh
suffix; they are located in the src/main/resources/template
directory by default.

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
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    runtimeOnly 'com.h2database:h2'
}

This is the Gradle build file. The h2 package adds H2 database.
The spring-boot-starter-web is used for building web,
including RESTful, applications using Spring MVC. It uses Tomcat as the
default embedded container. The spring-boot-starter-freemarker
is starter for building Spring MVC applications with FreeMarker. The
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
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + Objects.hashCode(this.id);
        hash = 29 * hash + Objects.hashCode(this.name);
        hash = 29 * hash + this.population;
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
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("City{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", population=").append(population);
        sb.append('}');
        return sb.toString();
    }
}

This is City bean class. It contains item id, name, and population.

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2

The application.properties is the main Spring Boot configuration
file. With the banner-mode property we turn off the Spring banner.
The platform value is used in SQL initialization scripts: schema-${platform}.sql
and data-${platform}.sql.

Notice that we do not configure the datasource; Spring automatically configures
H2 in the in-memory mode if there is no configuration data. We wanted to have an
in-memory database, so we leave Spring to do the automatic configuration.

resources/schema-h2.sql
  

CREATE TABLE cities(id INT PRIMARY KEY AUTO_INCREMENT,
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

ICityService provides a contract method to
get all cities from the data source.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final JdbcTemplate jdbcTemplate;

    public CityService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List&lt;City&gt; findAll() {

        var sql = "SELECT * FROM cities";

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper&lt;&gt;(City.class));
    }
}

CityService contains the implementation of
the findAll method. We retrieve all cities from
the cities table with the help of the JdbcTemplate.

public CityService(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
}

JdbcTemplate is injected via constructor injection.

var sql = "SELECT * FROM cities";

This is SQL to be executed. We select all cities from the cities table.

return jdbcTemplate.query(sql, new BeanPropertyRowMapper&lt;&gt;(City.class));

BeanPropertyRowMapper converts a row into a new instance of the
specified mapped target class.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.service.ICityService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;

@Controller
public class MyController {

    private final ICityService cityService;

    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping(value = "/")
    public String index(Model model) {

        return "index";
    }

    @GetMapping(value="/cities")
    public ModelAndView showCities() {

        var cities = cityService.findAll();

        var params = new HashMap&lt;String, Object&gt;();
        params.put("cities", cities);

        return new ModelAndView("showCities", params);
    }
}

This is the controller class for the Spring Boot web application. A controller
is decorated with the @Controller annotation. The  controller has
two mappings: one mapping for the home page and one for listing all cities.

public MyController(ICityService cityService) {
    this.cityService = cityService;
}

We inject the ICityService into the cityService field.

@GetMapping(value = "/")
public String index(Model model) {

    return "index";
}

The index is the name of the view located in the predefined
template directory.

@GetMapping(value="/cities")
public ModelAndView showCities() {

    var cities = cityService.findAll();

    var params = new HashMap&lt;String, Object&gt;();
    params.put("cities", cities);

    return new ModelAndView("showCities", params);
}

This controller method serves a list of cities. We find all city objects
from the city service and place the resulting list into the parameters.
Spring will locate the FreeMarker view named showCities and
let the engine join the template with the model data.

resources/static/css/style.css
  

h2 {color: blue}

td:nth-child(3) {
    text-align: right;
}

The style.css is a static file located in the
src/main/resources/static/css directory. It sets the H2
tag to blue colour and right aligns the data of the third column.

resources/templates/index.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;

    &lt;body&gt;
        &lt;a href="cities"&gt;Show cities&lt;/a&gt;
    &lt;/body&gt;

&lt;/html&gt;

The index.ftlh template file is the home page of the application. It contains
a link to retrieve all cities.

resources/templates/showCities.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Cities&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;link rel="stylesheet" href="css/style.css"&gt;
        &lt;/head&gt;
    &lt;body&gt;
        &lt;h2&gt;List of cities&lt;/h2&gt;

        &lt;table&gt;
            &lt;tr&gt;
                &lt;th&gt;Id&lt;/th&gt;
                &lt;th&gt;Name&lt;/th&gt;
                &lt;th&gt;Population&lt;/th&gt;
            &lt;/tr&gt;

            &lt;#list cities as city&gt;
                &lt;tr&gt;
                    &lt;td&gt;${city.id}&lt;/td&gt;
                    &lt;td&gt;${city.name}&lt;/td&gt;
                    &lt;td&gt;${city.population}&lt;/td&gt;
                &lt;/tr&gt;
            &lt;/#list&gt;
        &lt;/table&gt;

    &lt;/body&gt;
&lt;/html&gt;

The showCities.ftlh is a FreeMarker template file that contains
placeholders to be filled with data from the model. To access the data,
we use the ${} variable expressions.

&lt;link rel="stylesheet" href="css/style.css"&gt;

We include the static CSS file.

&lt;#list cities as city&gt;
    &lt;tr&gt;
        &lt;td&gt;${city.id}&lt;/td&gt;
        &lt;td&gt;${city.name}&lt;/td&gt;
        &lt;td&gt;${city.population}&lt;/td&gt;
    &lt;/tr&gt;
&lt;/#list&gt;

We iterate over the list of cities and put each city details into one
table row. The #list directive is used to list a collection of
data.

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

In this article we have created a Spring Boot web application with FreeMarker
and H2.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).