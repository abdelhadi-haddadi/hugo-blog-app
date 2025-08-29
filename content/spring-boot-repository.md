+++
title = "Spring Boot @Repository"
date = 2025-08-29T20:12:28.775+01:00
draft = false
description = "Spring Boot @Repository tutorial shows how to use the @Repository annotation in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @Repository

last modified August 2, 2023

Spring Boot @Repository tutorial shows how to use the @Repository 
annotation in a Spring application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## @Repository

@Repository is a Spring annotation that indicates that the
decorated class is a repository. A repository is a mechanism for encapsulating
storage, retrieval, and search behavior which emulates a collection of objects.
It is a specialization of the @Component annotation allowing for
implementation classes to be autodetected through classpath scanning.

@ComponentScan ensures that the classes decorated with
@Component and their derivatives including @Repository
are found and registered as Spring beans.
@ComponentScan is automatically included with
@SpringBootApplication.

## Spring Boot @Repository example

The following application demonstrates the usage of @Repository.
It shows a list of countries in an HTML table to the user.

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
│   │           │   └── Country.java
│   │           ├── repository
│   │           │   └── CountryRepository.java
│   │           └── service
│   │               ├── CountryService.java
│   │               └── ICountryService.java
│   └── resources
│       ├── application.yml
│       ├── import.sql
│       ├── static
│       │   └── index.html
│       └── templates
│           └── showCountries.ftlh
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

group = 'com.example'
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

This is the Gradle build file. The h2 dependency includes the H2
database driver.

Spring Boot starters are a set of convenient dependency descriptors which
greatly simplify configuration. The spring-boot-starter-web enables
web applications, both classic and RESTFul. The
spring-boot-starter-web-freemarker is a starter for building web
applications with Freemarker template engine. It uses Tomcat as the default
embedded container. The spring-boot-starter-data-jpa is a starter
for using Spring Data JPA with Hibernate.

resources/application.yml
  

server:
  port: 8086
  servlet:
    context-path: /SpringBootRepository
  
spring:
  main:
    banner-mode: "off"
  jpa:
    database: h2
    hibernate:
      dialect: org.hibernate.dialect.H2Dialect
      ddl-auto: create-drop

In the application.yml file we write various configuration settings
of a Spring Boot application. The port sets for server port and the
context-path context path (application name). After these settings,
we access the application at localhost:8086/SpringBootRepository/.
With the banner-mode property we turn off the Spring banner.

The JPA database value specifies the target database to operate on.
We specify the Hibernate dialect, org.hibernate.dialect.H2Dialect in our case.
The ddl-auto is the data definition language mode; the create-drop
option automatically creates and drops the database schema. The H2 database is run in memory.

resources/import.sql
  

INSERT INTO countries(name, population) VALUES('China', 1382050000);
INSERT INTO countries(name, population) VALUES('India', 1313210000);
INSERT INTO countries(name, population) VALUES('USA', 324666000);
INSERT INTO countries(name, population) VALUES('Indonesia', 260581000);
INSERT INTO countries(name, population) VALUES('Brazil', 207221000);
INSERT INTO countries(name, population) VALUES('Pakistan', 196626000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Bangladesh', 162099000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Russia', 146838000);
INSERT INTO countries(name, population) VALUES('Japan', 126830000);
INSERT INTO countries(name, population) VALUES('Mexico', 122273000);
INSERT INTO countries(name, population) VALUES('Philippines', 103738000);
INSERT INTO countries(name, population) VALUES('Ethiopia', 101853000);
INSERT INTO countries(name, population) VALUES('Vietnam', 92700000);
INSERT INTO countries(name, population) VALUES('Egypt', 92641000);
INSERT INTO countries(name, population) VALUES('Germany', 82800000);
INSERT INTO countries(name, population) VALUES('the Congo', 82243000);
INSERT INTO countries(name, population) VALUES('Iran', 82800000);
INSERT INTO countries(name, population) VALUES('Turkey', 79814000);
INSERT INTO countries(name, population) VALUES('Thailand', 68147000);
INSERT INTO countries(name, population) VALUES('France', 66984000);
INSERT INTO countries(name, population) VALUES('United Kingdom', 60589000);
INSERT INTO countries(name, population) VALUES('South Africa', 55908000);
INSERT INTO countries(name, population) VALUES('Myanmar', 51446000);
INSERT INTO countries(name, population) VALUES('South Korea', 68147000);
INSERT INTO countries(name, population) VALUES('Colombia', 49129000);
INSERT INTO countries(name, population) VALUES('Kenya', 47251000);
INSERT INTO countries(name, population) VALUES('Spain', 46812000);
INSERT INTO countries(name, population) VALUES('Argentina', 43850000);
INSERT INTO countries(name, population) VALUES('Ukraine', 42603000);
INSERT INTO countries(name, population) VALUES('Sudan', 41176000);
INSERT INTO countries(name, population) VALUES('Algeria', 40400000);
INSERT INTO countries(name, population) VALUES('Poland', 38439000);

The schema is automatically created by Hibernate; later, the
import.sql file is executed to fill the table with data.

com/zetcode/model/Country.java
  

package com.zetcode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "countries")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int population;

    public Country() {
    }

    public Country(Long id, String name, int population) {
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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Country country = (Country) o;
        return population == country.population &amp;&amp;
                Objects.equals(id, country.id) &amp;&amp;
                Objects.equals(name, country.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, population);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Country{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", population=").append(population);
        sb.append('}');
        return sb.toString();
    }
}

This is the Country entity. Each entity must have at least two
annotations defined: @Entity and @Id. Previously, we
have set the ddl-auto option to create-drop which means
that Hibernate will create the table schema from this entity.

@Entity
@Table(name = "countries")
public class Country {

The @Entity annotation specifies that the class is an
entity and is mapped to a database table. The @Table annotation
specifies the name of the database table to be used for mapping.

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

The @Id annotation specifies the primary key of an entity and
the @GeneratedValue gives the generation strategy for the values
of primary keys.

com/zetcode/repository/CountryRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.Country;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CountryRepository extends CrudRepository&lt;Country, Long&gt; {

}

CountryRepository is decorated with the @Repository
annotation.

By extending from the Spring CrudRepository, we have
some methods for our data repository implemented, including findAll.
This saves some boilerplate code.

com/zetcode/service/ICountryService.java
  

package com.zetcode.service;

import com.zetcode.model.Country;
import java.util.List;

public interface ICountryService {

    List&lt;Country&gt; findAll();
}

ICountryService contains the findAll contract method.

com/zetcode/service/CountryService.java
  

package com.zetcode.service;

import com.zetcode.model.Country;
import com.zetcode.repository.CountryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CountryService implements ICountryService {

    private final CountryRepository repository;

    public CountryService(CountryRepository repository) {
        this.repository = repository;
    }

    @Override
    public List&lt;Country&gt; findAll() {

        return (List&lt;Country&gt;) repository.findAll();
    }
}

CountryService contains the implementation of the
findAll method.

private final CountryRepository repository;

public CountryService(CountryRepository repository) {
    this.repository = repository;
}

CountryRepository is injected.

@Override
public List&lt;Country&gt; findAll() {

    return (List&lt;Country&gt;) repository.findAll();
}

The findAll method returns the list of all countries from the
database.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.Country;
import com.zetcode.service.ICountryService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;

@Controller
public class MyController {

    private final ICountryService countryService;

    public MyController(ICountryService countryService) {
        this.countryService = countryService;
    }

    @GetMapping("/countries")
    public ModelAndView getCountries() {

        var countries = (List&lt;Country&gt;) countryService.findAll();

        var params = new HashMap&lt;String, Object&gt;();
        params.put("countries", countries);

        return new ModelAndView("showCountries", params);
    }
}

MyController handles a request from the client.

@Controller
public class MyController {

A controller is annotated with @Controller annotation.

private final ICountryService countryService;

public MyController(ICountryService countryService) {
    this.countryService = countryService;
}

ICountryService is injected into the countryService
attribute.

var countries = (List&lt;Country&gt;) countryService.findAll();

From the service object, we retrieve all countries with the findAll
method.

var params = new HashMap&lt;String, Object&gt;();
params.put("countries", countries);

return new ModelAndView("showCountries", params);

The processing is send to the showCountries.ftlh template file,
along with the list of countries.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;a href="countries"&gt;Show countries&lt;/a&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains a link to get all countries.

resources/templates/showCountries.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Show countries&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;/head&gt;

    &lt;body&gt;

        &lt;h2&gt;List of countries&lt;/h2&gt;

        &lt;table&gt;
            &lt;tr&gt;
                &lt;th&gt;Id&lt;/th&gt;
                &lt;th&gt;Name&lt;/th&gt;
                &lt;th&gt;Population&lt;/th&gt;
            &lt;/tr&gt;

            &lt;#list countries as country&gt;
                &lt;tr&gt;
                    &lt;td&gt;${country.id}&lt;/td&gt;
                    &lt;td&gt;${country.name}&lt;/td&gt;
                    &lt;td&gt;${country.population}&lt;/td&gt;
                &lt;/tr&gt;
            &lt;/#list&gt;
        &lt;/table&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the showCountries.ftlh template file. With the
#list directive, we show all the items from the list.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

Application is the entry point which sets up Spring Boot
application. The @SpringBootApplication annotation enables
auto-configuration and component scanning. It is a convenience annotation for
@Configuration, @EnableAutoConfiguration, and
@ComponentScan annotations.

$ ./gradlew bootRun

We run the application and navigate to localhost:8086/SpringBootRepository/.

In this article we have shown how to use @Repository annotation
in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).