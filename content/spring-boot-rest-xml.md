+++
title = "Spring Boot REST XML"
date = 2025-08-29T20:12:30.988+01:00
draft = false
description = "Spring Boot REST XML tutorial shows how to serve XML data in a Spring Boot RESTFul application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot REST XML

last modified August 2, 2023

In this article we show how to serve XML data in a Spring Boot RESTFul
application. We create test methods for the RESTful controller.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is the next step in evolution of
Spring framework. It helps create stand-alone, production-grade Spring based
applications with minimal effort. It promotes using the 
*convention over configuration* principle over XML configurations.

## RESTFul application

A RESTFul application follows the REST architectural style, which is used for
designing networked applications. RESTful applications generate HTTP requests
performing CRUD (Create/Read/Update/Delete) operations on resources. RESTFul
applications typically return data in JSON or XML format.

Extensible Markup Language (XML) is a markup language that defines
a set of rules for encoding documents in a format that is both human-readable
and machine-readable. XML is often used in data exchange between applications.

## Spring Boot REST XML example

The following application is a Spring Boot RESTful application which returns
data in XML format from an H2 database using Spring Data JPA.

build.gradle
...
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── Application.java
│   │           ├── model
│   │           │   ├── Cities.java
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
        └── com
            └── zetcode
                └── test
                    └── MyControllerTest.java

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
    implementation 'com.fasterxml.jackson.dataformat:jackson-dataformat-xml'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    runtimeOnly 'com.h2database:h2'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. The h2 dependency includes the H2
database driver. The jackson-dataformat-xml adds Jackson XML
serializer and deserializer.

The spring-boot-starter-web is a starter for building web
applications with Spring MVC including RESTFul applictions. It uses Tomcat as
the default embedded container. 

The spring-boot-starter-data-jpa is a starter for using Spring Data
JPA with Hibernate. The spring-boot-starter-test is a starter for
testing Spring Boot applications with libraries including JUnit, Hamcrest and
Mockito.

resources/application.yml
  

server:
  port: 8086
  servlet:
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

In the application.yml file we write various configuration settings
of a Spring Boot application. The port sets for server port and the
context-path context path (application name). After these settings,
we access the application at localhost:8086/rest/. With the
banner-mode property we turn off the Spring banner.

The JPA database value specifies the target database to operate on.
We specify the Hibernate dialect, org.hibernate.dialect.H2Dialect
in our case. The ddl-auto is the data definition language mode; the
create-drop option automatically creates and drops the database schema.

The H2 database is run in memory. Also, we set the logging level for spring
framework to ERROR. The application.yml file is located in the in
the src/main/resources directory.

com/zetcode/model/City.java
  

package com.zetcode.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "cities")
@JacksonXmlRootElement(localName = "City")
public class City implements Serializable {

    @Serial
    private static final long serialVersionUID = 21L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JacksonXmlProperty(isAttribute = true)
    private Long id;

    @JacksonXmlProperty
    private String name;

    @JacksonXmlProperty
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
        return "City{" + "id=" + id + ", name=" + name
                + ", population=" + population + '}';
    }

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 37 * hash + Objects.hashCode(this.id);
        hash = 37 * hash + Objects.hashCode(this.name);
        hash = 37 * hash + this.population;
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
}

This is the City entity. Each entity must have at least two
annotations defined: @Entity and @Id. Previously, we
have set the ddl-auto option to create-drop which
means that Hibernate will create the table schema from this entity.

@Entity
@Table(name = "cities")
@JacksonXmlRootElement(localName = "City")
public class City implements Serializable {

The @Entity annotation specifies that the class is an
entity and is mapped to a database table. The @Table annotation
specifies the name of the database table to be used for mapping. With the
@JacksonXmlRootElement(localName = "City") annotation we set the
name for the XML output root element.

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@JacksonXmlProperty(isAttribute = true)
private Long id;

The @Id annotation specifies the primary key of an entity and
the @GeneratedValue provides the strategy for generating values
of primary keys. With the @JacksonXmlProperty(isAttribute = true)
we set the id to be an attribute of the City element
in the XML output.

@JacksonXmlProperty
private String name;

@JacksonXmlProperty
private int population;

With the @JacksonXmlProperty we set the name and
population attributes to be the properties of City element in
the XML output.

com/zetcode/model/Cities.java
  

package com.zetcode.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@JacksonXmlRootElement
public class Cities implements Serializable {

    @Serial
    private static final long serialVersionUID = 22L;

    @JacksonXmlProperty(localName = "City")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List&lt;City&gt; cities = new ArrayList&lt;&gt;();

    public List&lt;City&gt; getCities() {
        return cities;
    }

    public void setCities(List&lt;City&gt; cities) {
        this.cities = cities;
    }
}

The Cities bean is a helper bean which is used to get nicer XML
output.

@JacksonXmlProperty(localName = "City")
@JacksonXmlElementWrapper(useWrapping = false)
private List&lt;City&gt; cities = new ArrayList&lt;&gt;();

With @JacksonXmlProperty and @JacksonXmlElementWrapper
annotations we ensure that we have City elements nested in the
Cities element for a an ArrayList of city objects.

resources/import.sql
  

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

The schema is automatically created by Hibernate; later, the import.sql
file is executed to fill the H2 table with data.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.bean.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

}

By extending from the Spring CrudRepository, we will have some
methods for our data repository implemented, including findAll and
findById. This way we save a lot of boilerplate code.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.Cities;
import com.zetcode.model.City;

public interface ICityService {

    Cities findAll();
    City findById(Long id);
}

ICityService provides contract methods to get all cities and get
one city by its Id.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.Cities;
import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final CityRepository repository;

    @Autowired
    public CityService(CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public Cities findAll() {

        var cities = (List&lt;City&gt;) repository.findAll();
        var mycities = new Cities();
        mycities.setCities(cities);

        return mycities;
    }

    @Override
    public City findById(Long id) {

        return repository.findById(id).orElse(new City());
    }
}

CityService contains the implementation of the findAll
and findById methods. We use repository to work with data.

private final CityRepository repository;

@Autowired
public CityService(CityRepository repository) {
    this.repository = repository;
}

CityRepository is injected.

@Override
public Cities findAll() {

    var cities = (List&lt;City&gt;) repository.findAll();
    var mycities = new Cities();
    mycities.setCities(cities);

    return mycities;
}

Note that the findAll method returns the Cities
bean.

@Override
public City findById(Long id) {

    return repository.findById(id).orElse(new City());
}

The findById service method calls the repositorie's
findById method to get the city by its Id; if the city is not
found, an empty city is returned.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.Cities;
import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    private final ICityService cityService;

    @Autowired
    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping(value = "/cities", produces = MediaType.APPLICATION_XML_VALUE)
    public Cities findCities() {

        return cityService.findAll();
    }

    @GetMapping(value = "/cities/{cityId}", produces = MediaType.APPLICATION_XML_VALUE)
    public City findCity(@PathVariable Long cityId) {

        return cityService.findById(cityId);
    }
}

This is the controller class for the Spring Boot RESTful application. The
@RestController annotation creates a RESTful controller. While the
traditional MVC controller uses ModelAndView, the RESTful
controller simply returns the object and the object data is written directly to
the HTTP response (usually) in JSON or XML format.

private final ICityService cityService;

@Autowired
public MyController(ICityService cityService) {
    this.cityService = cityService;
}

We inject a ICityService into the cityService
field.

@GetMapping(value="/cities", produces=MediaType.APPLICATION_XML_VALUE)
public Cities findCities() {

    return cityService.findAll();
}

We map a request with the /cities path to the controller's
findCities method. The default request is
a GET request. By using MediaType.APPLICATION_XML_VALUE,
Spring uses a message converter that produces XML data.

@GetMapping(value="/cities/{cityId}", produces=MediaType.APPLICATION_XML_VALUE)
public City findCity(@PathVariable Long cityId) {

    return cityService.findById(cityId);
}

In the second method, we return a specific city. The URL path contains the Id
of the city to be retrieved; we use the @PathVariable annotation
to bind the URL template variable to the cityId parameter.

com/zetcode/test/MyControllerTest.java
  

package com.zetcode.test;

import com.zetcode.model.City;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;

import java.util.List;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class MyControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Value("http://localhost:${local.server.port}/${server.servlet.context-path}/cities")
    private String appPath;

    private City c1, c2, c3;

    @BeforeEach
    public void setUp() {

        this.c1 = new City(1L, "Bratislava", 432000);
        this.c2 = new City(2L, "Budapest", 1759000);
        this.c3 = new City(3L, "Prague", 1280000);
    }

    @Test
    public void allCitiesTest() {

        var paramType = new ParameterizedTypeReference&lt;List&lt;City&gt;&gt;() { };
        var cities = restTemplate.exchange(appPath, HttpMethod.GET, null, paramType);

        Assertions.assertThat(cities.getBody()).hasSize(8);
        Assertions.assertThat(cities.getBody()).contains(this.c1, this.c2, this.c3);
    }

    @Test
    public void oneCity() {

        var city = this.restTemplate.getForObject(appPath + "/1", City.class);
        Assertions.assertThat(city).extracting("name", "population").containsExactly("Bratislava",
                432000);
    }
}

The MytControllerTest contains two methods that test the controller
methods.

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
&lt;Cities&gt;
&lt;City id="1"&gt;&lt;name&gt;Bratislava&lt;/name&gt;&lt;population&gt;432000&lt;/population&gt;&lt;/City&gt;
&lt;City id="2"&gt;&lt;name&gt;Budapest&lt;/name&gt;&lt;population&gt;1759000&lt;/population&gt;&lt;/City&gt;
&lt;City id="3"&gt;&lt;name&gt;Prague&lt;/name&gt;&lt;population&gt;1280000&lt;/population&gt;&lt;/City&gt;
&lt;City id="4"&gt;&lt;name&gt;Warsaw&lt;/name&gt;&lt;population&gt;1748000&lt;/population&gt;&lt;/City&gt;
&lt;City id="5"&gt;&lt;name&gt;Los Angeles&lt;/name&gt;&lt;population&gt;3971000&lt;/population&gt;&lt;/City&gt;
&lt;City id="6"&gt;&lt;name&gt;New York&lt;/name&gt;&lt;population&gt;8550000&lt;/population&gt;&lt;/City&gt;
&lt;City id="7"&gt;&lt;name&gt;Edinburgh&lt;/name&gt;&lt;population&gt;464000&lt;/population&gt;&lt;/City&gt;
&lt;City id="8"&gt;&lt;name&gt;Berlin&lt;/name&gt;&lt;population&gt;3671000&lt;/population&gt;&lt;/City&gt;
&lt;/Cities&gt;

With the curl command, we get all cities.

$ curl localhost:8086/rest/cities/1
&lt;City id="1"&gt;&lt;name&gt;Bratislava&lt;/name&gt;&lt;population&gt;432000&lt;/population&gt;&lt;/City&gt;

Here we get one city identified by its Id.

In this article we have returned data to the client in XML format from a Spring
Boot RESTful application. We used Spring Data JPA to retrieve data from H2
database. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).