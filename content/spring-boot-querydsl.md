+++
title = "Spring Boot Querydsl"
date = 2025-08-29T20:12:28.727+01:00
draft = false
description = "Spring Boot Querydsl tutorial shows how to use Querydsl to create database queries in a Spring Boot application. Querydsl is a framework that enables the construction of statically typed SQL-like queries through its fluent API."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Querydsl

last modified July 16, 2023

Spring Boot Querydsl tutorial shows how to use Querydsl to create database
queries in a Spring Boot application. 

## Querydsl

Querydsl is a framework that enables the construction of statically
typed SQL-like queries through its fluent API. Spring Data modules offer
integration with Querydsl through QuerydslPredicateExecutor.

## Spring Querydsl example

The following application creates queries with Querydsl using an entity manager 
and a repository.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───model
│   │           │       City.java
│   │           └───repository
│   │                   CityRepository.java
│   └───resources
│           application.properties
│           data-h2.sql
│           schema-h2.sql
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;springbootquerydsl&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;2.6.7&lt;/version&gt;
    &lt;/parent&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.h2database&lt;/groupId&gt;
            &lt;artifactId&gt;h2&lt;/artifactId&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.querydsl&lt;/groupId&gt;
            &lt;artifactId&gt;querydsl-apt&lt;/artifactId&gt;
            &lt;version&gt;4.2.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.querydsl&lt;/groupId&gt;
            &lt;artifactId&gt;querydsl-jpa&lt;/artifactId&gt;
            &lt;version&gt;4.2.1&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;2.6.7&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;!--Plugin for query-dsl--&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;com.mysema.maven&lt;/groupId&gt;
                &lt;artifactId&gt;apt-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;1.1.3&lt;/version&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;phase&gt;generate-sources&lt;/phase&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;process&lt;/goal&gt;
                        &lt;/goals&gt;
                        &lt;configuration&gt;
                            &lt;outputDirectory&gt;target/generated-sources/java&lt;/outputDirectory&gt;
                            &lt;processor&gt;com.querydsl.apt.jpa.JPAAnnotationProcessor&lt;/processor&gt;
                        &lt;/configuration&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

The Maven POM file contains dependencies for Spring Data JPA, H2 database, and
Querydsl. JPAAnnotationProcessor finds domain types
annotated with Entity and generates query types for
them.

Annotation processing is a tool build in javac for scanning and
processing annotations at compile time.    

resources/application.properties
  

spring.main.banner-mode=off
spring.datasource.platform=h2
spring.jpa.hibernate.ddl-auto=none
logging.pattern.console=%d{dd-MM-yyyy HH:mm:ss} %magenta([%thread]) %highlight(%-5level) %logger.%M - %msg%n

The application.properties is the main Spring Boot configuration
file. With the spring.main.banner-mode property we turn off the
Spring banner. The spring.datasource.platform
sets the vendor name of the database. It is used in the initialization scripts.
Finally, the spring.jpa.hibernate.ddl-auto disables the automatic
creation of schemas from entities. The logging.pattern.console defines 
the log pattern for the console.

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
INSERT INTO cities(name, population) VALUES('Brest', 139163);
INSERT INTO cities(name, population) VALUES('Bucharest', 1836000);

Later, the data-h2.sql file is executed. It fills the
table with data.

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

This is the City entity.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt;,
        QuerydslPredicateExecutor&lt;City&gt; {

}

To enable Querydsl in our repository, we extend from QuerydslPredicateExecutor.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.zetcode.model.QCity;
import com.zetcode.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Component
@SuppressWarnings({ "rawtypes", "unchecked" })
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private CityRepository cityRepository;

    @Override
    public void run(String... args) throws Exception {

        var qCity = QCity.city;

        var query = new JPAQuery(entityManager);

        query.from(qCity).where(qCity.name.eq("Bratislava")).distinct();
        var c1 = query.fetch();

        logger.info("{}", c1);

        var query2 = new JPAQuery(entityManager);
        query2.from(qCity).where(qCity.name.endsWith("est").and(qCity.population.lt(1800000)));
        var cities = query2.fetch();

        logger.info("{}", cities);

        BooleanExpression booleanExpression = qCity.population.goe(2_000_000);
        OrderSpecifier&lt;String&gt; orderSpecifier = qCity.name.asc();
        var cities2 = cityRepository.findAll(booleanExpression, orderSpecifier);

        logger.info("{}", cities2);
    }
}

We use EntityManager and CityRepository to create 
Querydsl queries.

var qCity = QCity.city;

Querydsl creates a QCity type.

var query = new JPAQuery(entityManager);

In the first two queries, we use entity manager.

query.from(qCity).where(qCity.name.eq("Bratislava")).distinct();
var c1 = query.fetch();

logger.info("{}", c1);

Using the Querydsl's fluent API, we fetch a distinct city object. 

var query2 = new JPAQuery(entityManager);
query2.from(qCity).where(qCity.name.endsWith("est").and(qCity.population.lt(1800000)));
var cities = query2.fetch();

logger.info("{}", cities);

A more complex query fetches multiple cities.

BooleanExpression booleanExpression = qCity.population.goe(2_000_000);
OrderSpecifier&lt;String&gt; orderSpecifier = qCity.name.asc();
var cities2 = cityRepository.findAll(booleanExpression, orderSpecifier);

logger.info("{}", cities2);

In the third query, we utilize the repository.

**Note: ** In Java enterprise applications it is a good practice 
to define a service layer that works with repositories. For simplicity reasons, 
we skip the service layer.

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
...
04-06-2019 13:22:13 [main] INFO  com.zetcode.MyRunner.run - [City{id=1, name=Bratislava, population=432000}]
04-06-2019 13:22:13 [main] INFO  com.zetcode.MyRunner.run - [City{id=2, name=Budapest, population=1759000}, 
City{id=11, name=Brest, population=139163}]
04-06-2019 13:22:13 [main] INFO  com.zetcode.MyRunner.run - [City{id=10, name=Berlin, population=3671000}, 
City{id=5, name=Los Angeles, population=3971000}, City{id=6, name=New York, population=8550000}, 
City{id=8, name=Suzhou, population=4327066}, City{id=9, name=Zhengzhou, population=4122087}]
...

We run the application.

In this article we have showed how to use Querydsl to generate queries in a 
Spring Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).