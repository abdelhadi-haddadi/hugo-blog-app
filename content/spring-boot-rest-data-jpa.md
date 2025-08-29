+++
title = "Spring Boot REST Data JPA"
date = 2025-08-27T23:20:56.013+01:00
draft = false
description = "In this tutorial, we show how to create a Spring Boot RESTful application with Data JPA. We use H2 database."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot REST Data JPA

last modified July 13, 2020 

In this tutorial, we create a Spring Boot RESTful application with Data JPA.

Spring is a popular Java application framework for creating enterprise applications.
Spring Boot is the next step in evolution of Spring framework. It helps create 
stand-alone, production-grade Spring based applications with minimal effort. It does not
use XML configurations anymore and implements the *convention over configuration* principle.

H2 is an Java open source relational database management. 
It can run in the client-server mode or it can be embedded in Java applications.
H2 is easy to deploy and install and has small footprint.

Spring Data JPA is part of the umbrella Spring Data project that 
makes it easier to implement JPA based repositories. Spring Data JPA uses JPA to store 
data in a relational database. It can create repository implementations automatically, 
at runtime, from a repository interface.

A RESTFul application follows the REST architectural 
style, which is used for designing networked applications. RESTful applications 
generate HTTP requests performing CRUD (Create/Read/Update/Delete) operations 
on resources. RESTFul applications typically return data in JSON or XML format.

## Application

The following application is a Spring Boot RESTful application which returns data in JSON format
from an H2 database using Spring Data JPA.

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── Application.java
    │   │           ├── bean
    │   │           │   └── City.java
    │   │           ├── controller
    │   │           │   └── MyController.java
    │   │           ├── repository
    │   │           │   └── CityRepository.java
    │   │           └── service
    │   │               ├── CityService.java
    │   │               └── ICityService.java
    │   └── resources
    │       ├── application.yml
    │       └── import.sql
    └── test
        └── java   

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;SpringBootRestDataJPA&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;1.5.3.RELEASE&lt;/version&gt;
    &lt;/parent&gt;
    
    &lt;dependencies&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;com.h2database&lt;/groupId&gt;
            &lt;artifactId&gt;h2&lt;/artifactId&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;
    
    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;    
&lt;/project&gt;

This is the Maven build file. The h2 dependency includes the H2 database
driver.

Spring Boot starters are a set of convenient dependency descriptors which greatly simplify Maven configuration.
The spring-boot-starter-parent has some common configurations for a Spring Boot
application. The spring-boot-starter-web is a starter for building web applications with Spring MVC. 
It uses Tomcat as the default embedded container. 
The spring-boot-starter-data-jpa is a starter for using Spring Data JPA with Hibernate.

The spring-boot-maven-plugin provides Spring Boot support in Maven, allowing us 
to package executable JAR or WAR archives. Its spring-boot:run goal runs the 
Spring Boot application.

application.yml
  

server:
    port: 8086
    context-path: /rest

spring: 
    main:
        banner-mode: "off"     
    jpa:
        database: h2
        hibernate:
            dialect: org.hibernate.dialect.H2Dialect
            ddl-auto: create-drop

logging: 
    level: 
        org: 
            springframework: ERROR

In the application.yml file we write various configuration settings of a Spring Boot
application. The port sets for server port and the context-path context path 
(application name). After these settings, we access the application at localhost:8086/rest/. 
With the banner-mode property we turn off the Spring banner.

The JPA database value specifies the target database to operate on.
We specify the Hibernate dialect, org.hibernate.dialect.H2Dialect in our case.
The ddl-auto is the data definition language mode; the create-drop
option automatically creates and drops the database schema.

The H2 database is run in memory. Also, we set the logging level for spring framework to ERROR. 
The application.yml file is located in the in the src/main/resources directory.

com/zetcode/City.java
  

package com.zetcode.bean;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

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
        hash = 13 * hash + Objects.hashCode(this.id);
        hash = 13 * hash + Objects.hashCode(this.name);
        hash = 13 * hash + this.population;
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
        
        StringBuilder builder = new StringBuilder();
        builder.append("City{id=").append(id).append(", name=")
                .append(name).append(", population=")
                .append(population).append("}");
        
        return builder.toString();
    }
}

This is the City entity. Each entity must have at least two
annotations defined: @Entity and @Id. Previously, we 
have set the ddl-auto option 
to create-drop which means that Hibernate will create the
table schema from this entity.

@Entity
@Table(name = "cities")
public class City {

The @Entity annotation specifies that the class is an
entity and is mapped to a database table. The @Table annotation
specifies the name of the database table to be used for mapping.

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
  

The @Id annotation specifies the primary key of an entity and 
the @GeneratedValue provides for the specification of generation 
strategies for the values of primary keys.

import.sql
  

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

The schema is automatically created by Hibernate; later, the import.sql
file is executed to fill the table with data.

com/zetcode/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.bean.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

}

By extending from the Spring CrudRepository, we will have
some methods for our data repository implemented, including findAll
and findOne. This way we save a lot of boilerplate code. 

com/zetcode/ICityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;
import java.util.List;

public interface ICityService {

    public List&lt;City&gt; findAll();
    public City findById(Long id);
}

ICityService provides contract methods to 
get all cities and get a city by its ID from the data source.

com/zetcode/CityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;
import com.zetcode.repository.CityRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService implements ICityService {

    @Autowired
    private CityRepository repository;

    @Override
    public List&lt;City&gt; findAll() {

        List&lt;City&gt; cities = (List&lt;City&gt;) repository.findAll();
        
        return cities;
    }

    @Override
    public City findById(Long id) {

        City city = repository.findOne(id);
        return city;
    }
}

CityService contains the implementation of 
the findAll and findById methods. We use 
repository to retrieve data from the database.

@Autowired
private CityRepository repository;

CityRepository is injected.

List&lt;City&gt; cities = (List&lt;City&gt;) repository.findAll();

The findAll method of the repository returns the list of
cities.

City city = repository.findOne(id);

The findOne method of the repository returns one city object
identified by its ID.

com/zetcode/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.City;
import com.zetcode.service.ICityService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
    
    @Autowired
    ICityService cityService;

    @RequestMapping("/cities")
    public List&lt;City&gt; findCities() {
        
        List&lt;City&gt; cities = (List&lt;City&gt;) cityService.findAll();
        return cities;
    }

    @RequestMapping("/cities/{userId}")
    public City findCity(@PathVariable Long userId) {
        
        City city = cityService.findById(userId);
        return city;
    }
}

This is the controller class for the Spring Boot RESTful application. The @RestController annotation 
creates a RESTful controller. While the traditional 
MVC controller uses ModelAndView, the RESTful controller 
simply returns the object and the object data is written directly to the HTTP response (usually)
in JSON or XML format. 

@Autowired
private ICityService cityService;

We inject a ICityService into the countryService
field.

@RequestMapping("/cities")
public List&lt;City&gt; findCities() {
    
    List&lt;City&gt; cities = (List&lt;City&gt;) cityService.findAll();
    return cities;
}

We map a request with the /cities path to the controller's 
findCities method. The default request is
a GET request. The method returns a list of all cities found.

@RequestMapping("/cities/{userId}")
public City findCity(@PathVariable Long userId) {
    
    City city = cityService.findById(userId);
    return city;
}

In the second method, we return a specific city. The URL path contains the ID 
of the city to be retrieved; we use the @PathVariable annotation 
to bind the URL template variable to the cityId parameter.

We do not need to convert the City domain object to JSON manually. Because Jackson 2 is 
on the classpath, (included via spring-boot-starter-web, Spring chooses 
MappingJackson2HttpMessageConverter automatically to convert 
the City instance to JSON.

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

$ mvn spring-boot:run

With mvn spring-boot:run command, we run the application.
The application is deployed on embedded Tomcat server.

$ curl localhost:8086/rest/cities
[{"id":1,"name":"Bratislava","population":432000},
{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},
{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},
{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},
{"id":8,"name":"Berlin","population":3671000}]

With the curl command, we get all cities.

$ curl localhost:8086/rest/cities/1
{"id":1,"name":"Bratislava","population":432000}

Here we get one city identified by its ID.

In this tutorial, we have returned data to the client in JSON format from a
Spring Boot RESTful application. We used Spring Data JPA to retrieve data from
H2 database.