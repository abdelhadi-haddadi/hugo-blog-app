+++
title = "Spring Boot basic annotations"
date = 2025-08-29T20:12:04.269+01:00
draft = false
description = "Spring Boot basic annotations tutorial shows how to use basic Spring Boot annotations including @Bean, @Service, @Configuration, @Controller, @RequestMapping, @Repository, @Autowired, and @SpringBootApplication."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot basic annotations

last modified August 2, 2023

In this article we show how to use basic Spring Boot annotations including
@Bean, @Service, @Configuration, @Controller, @RequestMapping, @Repository,
@Autowired, and @SpringBootApplication.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is the next step in evolution of
Spring framework. It helps create stand-alone, production-grade Spring based
applications with minimal effort. It does not use XML configurations anymore and 
implements the *convention over configuration* principle.

Annotation is a form of metadata which provides data about a program
that is not part of the program itself. Annotations do not have direct effect on
the operation of the code they annotate.

## Spring Boot basic annotations

In the example application, we have these Spring Boot annotations:

- @Bean - indicates that a method produces a bean to be managed by Spring.

- @Service - indicates that an annotated class is a service class.

@Repository - indicates that an annotated class is a repository, which
is an abstraction of data access and storage.
@Configuration - indicates that a class is a configuration class that
may contain bean definitions.
- @Controller -  marks the class as web controller, capable of handling the requests.

- @RequestMapping - maps HTTP request with a path to a controller method.

@Autowired - marks a constructor, field, or setter method to be autowired
by Spring dependency injection.
- @SpringBootApplication - enables Spring Boot autoconfiguration and component scanning.

@Component is a generic stereotype for a Spring managed component.
It turns the class into a Spring bean at the auto-scan time. Classes decorated
with this annotation are considered as candidates for auto-detection when using
annotation-based configuration and classpath scanning.
@Repository, @Service, and @Controller
are specializations of @Component for more specific use cases.

There are also Hibernate @Entity, @Table, @Id,
and @GeneratedValue annotations in the example.

## Spring Boot basic annotations example

The following application is a Spring Boot application which returns data from
an H2 database using Spring Data JPA. The application uses FreeMarker as a
template engine.

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
│   │           ├── repository
│   │           │   └── CityRepository.java
│   │           └── service
│   │               ├── CityService.java
│   │               └── ICityService.java
│   └── resources
│       ├── application.yml
│       ├── import.sql
│       ├── static
│       │   └── css
│       │       └── style.css
│       └── templates
│           ├── index.ftlh
│           └── showCities.ftlh
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
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'com.h2database:h2'
}

This is the Gradle build file. It contains dependencies for Freemaker, Spring
Data JPA, and H2 database. When Spring Boot finds Freemaker and H2 in the build
file, it automatically configures them. We can use them right away.

resources/application.yml
  

server:
  servlet:
    context-path: /myapp

spring:
  main:
    banner-mode: "off"
datasource:
    platform: h2

In the application.yml file we write various configuration settings
of a Spring Boot application.

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

    public City(Long id, String name, int population) {

        this.id = id;
        this.name = name;
        this.population = population;
    }

    public Long getId() {
        return id;
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
        final StringBuilder sb = new StringBuilder("City{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", population=").append(population);
        sb.append('}');
        return sb.toString();
    }
}

This is the City entity. Each entity must have at least two
annotations defined: @Entity and @Id.
The @Entity annotation specifies that the class is an
entity and is mapped to a database table. The @Table annotation
specifies the name of the database table to be used for mapping.
The @Id annotation specifies the primary key of an entity and
the @GeneratedValue provides for the specification of generation
strategies for the values of primary keys.

resources/import.sql
  

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

The schema is automatically created by Hibernate; later, the
import.sql file is executed to fill the table with data.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

}

The @Repository annotation is used to define a repository.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAll();
}

ICityService provides a contract method to get all cities.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List&lt;City&gt; findAll() {

        return (List&lt;City&gt;) cityRepository.findAll();
    }
}

The @Service annotation declares CityService to be a
service class: a class that provides business services. The optional
@Autowired annotation marks cityRepository field to be
injected with CityRepository.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MyController {

    private final ICityService cityService;

    @Autowired
    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @RequestMapping("/")
    public String index(Model model) {

        return "index";
    }

    @RequestMapping("/cities")
    public ModelAndView showCities() {

        var cities = cityService.findAll();

        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("cities", cities);

        return new ModelAndView("showCities", params);
    }
}

The @Controller annotation marks a class as a web controller. The
@RequestMapping maps HTTP request with a path to a controller
method. In the second case, it maps the /cities URL to the
showCities
method.

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

This is the index.ftlh template file. It contains a link to create
a request to show all cities.

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

This is the showCities.ftlh template file. It uses FreeMarker
#list macro to display all city objects.

resources/static/css/style.css
  

h2 {color: blue}

td:nth-child(3) {
    text-align: right;
}

This is the style.css template file.

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

The @SpringBootApplication enables auto-configuration and component
scanning.

$ ./gradlew bootRun

We run the application and locate to the localhost:8080/myapp
address.

In this article we have covered a few basic Spring Boot annotations.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).