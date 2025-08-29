+++
title = "Spring Boot CSV"
date = 2025-08-29T20:12:09.998+01:00
draft = false
description = "Spring Boot CSV tutorial shows how to serve content in CSV in a Spring Boot RESTful application. We use Opencsv library and Spring Data JPA."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot CSV

last modified August 2, 2023

In this article we are going to serve content in CSV in a Spring Boot RESTful
application. We use Opencsv library.

CSV (Comma Separated Values) is simple data format where values are
(mostly) separated by a comma character and each line represents one record. The
data is stored in a plain text file. It is very popular as import and export
format used in spreadsheets and databases. Opencsv is an open source,
simple CSV parser library for Java.

## Spring Boot CSV example

Our application is a Spring Boot RESTful application which returns data from an
H2 database in a CSV format.

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
│   │           ├── repository
│   │           │   └── CityRepository.java
│   │           ├── service
│   │           │   ├── CityService.java
│   │           │   └── ICityService.java
│   │           └── util
│   │               └── WriteCsvToResponse.java
│   └── resources
│       ├── application.yml
│       └── import.sql
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
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'com.opencsv:opencsv:5.6'

    runtimeOnly 'com.h2database:h2'
}

This is the Gradle build file. The h2 dependency adds a driver for
H2 database. The opencsv dependency adds a driver for the Opencsv
library.

Spring Boot starters are a set of convenient dependency descriptors we can
include in our application. They greatly simplify application configuration. The
spring-boot-starter-web is a starter for building web, including
RESTful, applications using Spring MVC. It uses Tomcat as the default embedded
container. The spring-boot-starter-data-jpa is a starter for using
Spring Data JPA with Hibernate.

resources/application.yml
  

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

The application.yml file contains various configuration settings of
a Spring Boot application. With the banner-mode property we turn
off the Spring banner.

The JPA database value specifies the target database to operate on.
We specify the Hibernate dialect, org.hibernate.dialect.H2Dialect
in our case. The ddl-auto is the data definition language mode; the
create-drop option automatically creates and drops the database
schema.

The H2 database is run in memory. Also, we set the logging level for spring
framework to ERROR. The application.yml file is located in the in
the src/main/resources directory.

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
things defined: @Entity annotation and an Id field with
@Id annotation. We have set the ddl-auto option
to create-drop which means that Hibernate will create the
table schema from this entity.

@Entity
@Table(name = "cities")
public class City {

The @Entity annotation specifies that the class is an
entity and is mapped to a database table. The @Table entity
specifies the name of the database table to be used for mapping.

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

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

By extending from the Spring CrudRepository, we will have
some methods for our data repository implemented, including findAll
and findById. This way we save a lot of boilerplate code.

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
import com.zetcode.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final CityRepository repository;

    public CityService(CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public List&lt;City&gt; findAll() {

        return  (List&lt;City&gt;) repository.findAll();
    }

    @Override
    public City findById(Long id) {

        return repository.findById(id).orElse(new City());
    }
}

CityService contains the implementation of the
findAll and findById methods. We use repository to
retrieve data from the database.

private final CityRepository repository;

public CityService(CityRepository repository) {
    this.repository = repository;
}

CityRepository is injected.

return  (List&lt;City&gt;) repository.findAll();

The findAll method of the repository returns the list of
cities.

return repository.findById(id).orElse(new City());

The findById method of the repository returns one specific city
object. If no city is found, we send an empty city object.

com/zetcode/controller/CityController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import com.zetcode.util.WriteCsvToResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class CityController {

    private final ICityService cityService;

    public CityController(ICityService cityService) {
        this.cityService = cityService;
    }

    @RequestMapping(value = "/cities", produces = "text/csv")
    public void findCities(HttpServletResponse response) throws IOException {

        List&lt;City&gt; cities = cityService.findAll();

        WriteCsvToResponse.writeCities(response.getWriter(), cities);
    }

    @RequestMapping(value = "/cities/{cityId}", produces = "text/csv")
    public void findCity(@PathVariable Long cityId, HttpServletResponse response) throws IOException {

        City city = cityService.findById(cityId);
        WriteCsvToResponse.writeCity(response.getWriter(), city);
    }
}

This is the controller class for the Spring Boot RESTful application. The
@RestController annotation creates a RESTful controller. While the
traditional MVC controller uses ModelAndView, the RESTful
controller simply returns the object and the object data is written directly to
the HTTP response (usually) in JSON or XML format. In our case, we chose CSV
format.

private final ICityService cityService;

public CityController(ICityService cityService) {
    this.cityService = cityService;
}

We inject a ICityService into the countryService
field.

@RequestMapping(value = "/cities", produces = "text/csv")
public void findCities(HttpServletResponse response) throws IOException {

...
}

The @RequestMapping annotation is used to map web requests to Spring
controller methods. The produces option sets the media type, which is
text/csv in our case. We map a request with the /cities path
to the controller's findCities method. The default request is
a GET request.

List&lt;City&gt; cities = cityService.findAll();

WriteCsvToResponse.writeCities(response.getWriter(), cities);

We call the cityService's findAll to
get all the cities. We write the CSV data into the HttpServletResponse
object. The mapping of Java beans to CSV data is delegated to the
WriteCsvToResponse class.

@RequestMapping(value = "/cities/{cityId}", produces = "text/csv")
public void findCity(@PathVariable Long cityId, HttpServletResponse response) throws IOException {

    City city = cityService.findById(cityId);
    WriteCsvToResponse.writeCity(response.getWriter(), city);
}

In the second method, we have an URL path that contains the Id of the city
to be retrieved; we use the @PathVariable annotation to bind the
URL template variable to the method cityId parameter.

com/zetcode/util/WriteCsvToResponse.java
  

package com.zetcode.util;

import com.opencsv.CSVWriter;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import com.opencsv.exceptions.CsvException;
import com.zetcode.model.City;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.PrintWriter;
import java.util.List;

public class WriteCsvToResponse {

    private static final Logger LOGGER = LoggerFactory.getLogger(WriteCsvToResponse.class);

    public static void writeCities(PrintWriter writer, List&lt;City&gt; cities) {

        try {

            var builder = getStatefulBean(writer);
            builder.write(cities);

        } catch (CsvException ex) {

            LOGGER.error("Error mapping Bean to CSV", ex);
        }
    }

    public static void writeCity(PrintWriter writer, City city) {

        try {

            var builder = getStatefulBean(writer);
            builder.write(city);

        } catch (CsvException ex) {

            LOGGER.error("Error mapping Bean to CSV", ex);
        }
    }

    private static StatefulBeanToCsv&lt;City&gt; getStatefulBean(PrintWriter writer) {

        ColumnPositionMappingStrategy&lt;City&gt; mapStrategy
                = new ColumnPositionMappingStrategy&lt;&gt;();

        mapStrategy.setType(City.class);

        String[] columns = new String[]{"id", "name", "population"};
        mapStrategy.setColumnMapping(columns);

        StatefulBeanToCsv&lt;City&gt; builder = new StatefulBeanToCsvBuilder&lt;City&gt;(writer)
                .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
                .withMappingStrategy(mapStrategy)
                .withSeparator(',')
                .build();

        return builder;
    }
}

In WriteCsvToResponse, we use Opencsv library to convert Java beans
to CSV and write the final output into the HttpServletResponse.

ColumnPositionMappingStrategy&lt;City&gt; mapStrategy
    = new ColumnPositionMappingStrategy&lt;&gt;();

mapStrategy.setType(City.class);

A MappingStrategy defines how Java attributes are mapped to CSV
column names. ColumnPositionMappingStrategy uses column position to
do the mapping.

String[] columns = new String[]{"id", "name", "population"};
mapStrategy.setColumnMapping(columns);

We set the column names.

StatefulBeanToCsv&lt;City&gt; builder = new StatefulBeanToCsvBuilder&lt;City&gt;(writer)
    .withQuotechar(CSVWriter.NO_QUOTE_CHARACTER)
    .withMappingStrategy(mapStrategy)
    .withSeparator(',')
    .build();

StatefulBeanToCsv class writes beans out in CSV format to writer
keeping state information and making an intelligent guess at the mapping
strategy to be applied.

var builder = getStatefulBean(writer);
builder.write(cities);

The beans are written to the response object.

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

We run the application.

$ curl localhost:8080/cities
1,Bratislava,432000
2,Budapest,1759000
3,Prague,1280000
4,Warsaw,1748000
5,Los Angeles,3971000
6,New York,8550000
7,Edinburgh,464000
8,Berlin,3671000

With the curl command, we get all cities.

$ curl localhost:8080/cities/1
1,Bratislava,432000

Here we get one city identified by its Id.

In this article we have returned data to the client in CSV format from a
Spring Boot RESTful application. We used Opencsv library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).