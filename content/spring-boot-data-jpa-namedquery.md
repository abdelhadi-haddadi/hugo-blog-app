+++
title = "Spring Boot Data JPA @NamedQuery"
date = 2025-08-29T20:12:11.130+01:00
draft = false
description = "Spring Boot Data JPA @NamedQuery tutorial shows how to create custom queries with JPA @NamedQuery."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Data JPA @NamedQuery

last modified July 25, 2023

Spring Boot Data JPA @NamedQuery tutorial shows how to create custom queries
with JPA @NamedQuery.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## Spring Data JPA

Spring Data JPA facilitates the implementation of JPA based repositories. It
enhances support for JPA based data access layers. It makes it easier to build
Spring-powered applications that use data access technologies. Spring Data JPA
is a part of the larger Spring Data family.

## JPA @NamedQuery

@NamedQuery annotation is a predefined query that we create and associate with a
container-managed entity.
@Query annotation is a similar annotation, which declares finder queries directly on repository methods.
While @NamedQuery is used on domain classes, Spring Data JPA @Query annotation is used
on Repository interface. This frees the domain classes from persistence specific information, which is
a good thing.

## Spring Boot Data JPA @NamedQuery example

The following application is a simple Spring Boot web application, which
uses JPA @NamedQuery to create a custom query. The data for the example is stored
in a memory based H2 database. The database is initialized at the start of the application.

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
│       │   application.properties
│       │   data-h2.sql
│       │   schema-h2.sql
│       ├───static
│       │       index.html
│       └───templates
│               showCities.ftlh
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
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'com.h2database:h2'
}

The Gradle build file contains dependencies for H2 database, Freemarker, and
Spring Boot Data JPA.

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2
logging.level.org.hibernate.SQL=DEBUG
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=none

In the application.properties file we have various configuration
settings. With the spring.main.banner-mode property we turn off the
Spring banner.

The spring.sql.init.platform sets the vendor name of the database.
It is used in the initialization scripts. The spring.jpa.show-sql
enables logging of SQL statements. Finally, the
spring.jpa.hibernate.ddl-auto disables the automatic creation of
schemas from entities.

com/zetcode/model/City.java
  

package com.zetcode.model;

import java.util.Objects;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;

@Entity
@Table(name = "cities")
@NamedQuery(name = "City.findAllOrderedByNameDescending",
        query = "SELECT c FROM City c ORDER BY c.name DESC")
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

This is the City entity. It contains a named query.

@Entity
@Table(name = "cities")
@NamedQuery(name = "City.findAllOrderedDescending",
        query = "SELECT c FROM City c ORDER BY c.name DESC")
public class City {

The @Entity annotation specifies that the class is an
entity and is mapped to a database table. The @Table annotation
specifies the name of the database table to be used for mapping.
The @NamedQuery defines a named query, which returns all cities
ordered by name in descending order.

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

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

    List&lt;City&gt; findAllOrderedByNameDescending();
}

We add the declaration of the findAllOrderedByNameDescending into
the repository interface.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAllOrderedByNameDescending();
}

ICityService contains a contract method to
get all cities ordered by name in descending order.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService implements ICityService {

    private final CityRepository repository;

    @Autowired
    public CityService(CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public List&lt;City&gt; findAllOrderedByNameDescending() {

        return repository.findAllOrderedByNameDescending();
    }
}

CityService contains the implementation of the
findAllOrderedByNameDescending method. We use the repository to
retrieve data from the database.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MyController {

    private final ICityService cityService;

    @Autowired
    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/showCities")
    public String findAllOrderedByNameDescending(Model model) {

        var cities = (List&lt;City&gt;) cityService.findAllOrderedByNameDescending();

        model.addAttribute("cities", cities);

        return "showCities";
    }
}

The MyController class is annotated with @Controller.

private final ICityService cityService;

@Autowired
public MyController(ICityService cityService) {
    this.cityService = cityService;
}

We inject a ICityService into the countryService
field.

@GetMapping("/showCities")
public String findAllOrderedByNameDescending(Model model) {

    var cities = (List&lt;City&gt;) cityService.findAllOrderedByNameDescending();

    model.addAttribute("cities", cities);

    return "showCities";
}

We map a request with the showCities path to the controller's
findAllOrderedByNameDescending method. The model gains a list of
cities ordered by name in descending order and the processing is sent to the
showCities.ftlh Freemarker template file.

resources/templates/showCities.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Cities&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;/head&gt;
    &lt;body&gt;
        &lt;h2&gt;List of cities ordered by name in descending order&lt;/h2&gt;

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

In the showCities.ftlh template file, we display the data in
an HTML table.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"/&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"/&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="showCities"&gt;Show ordered cities by name in descending order&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

In the index.html there is a link to show the ordered cities.

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

After the application is run, we can navigate to localhost:8080.

In this article we have showed how to use the JPA @NamedQuery annotation in a
Spring Boot application to create a custom JPQL query. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).