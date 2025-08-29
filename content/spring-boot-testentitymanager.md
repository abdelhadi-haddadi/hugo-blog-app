+++
title = "Spring Boot TestEntityManager"
date = 2025-08-29T20:12:35.480+01:00
draft = false
description = "Spring Boot TestEntityManager tutorial shows how to use TestEntityManager in JPA tests. TestEntityManager provides a subset of EntityManager methods that are useful for tests as well as helper methods for common testing tasks such as persist or find."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot TestEntityManager

last modified July 29, 2023

In this article we show how to use TestEntityManager in JPA tests.
TestEntityManager provides a subset of EntityManager methods that are useful for
tests as well as helper methods for common testing tasks such as persist or
find.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## TestEntityManager

TestEntityManager allows to use EntityManager
in tests. Spring Repository is an abstraction over
EntityManager; it shields developers from lower-level details of
JPA and brings many convenient methods. But Spring allows to use
EntityManager when needed in application code and tests.

In our tests, we can inject a DataSource, @JdbcTemplate, @EntityManager or any
Spring Data repository from our application.

## Spring TestEntityManager example

The following application uses TestEntityManager to save a few
city entities in a test method.

build.gradle
...
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
└───test
    └───java
        └───com
            └───zetcode
                └───repository
                        CityRepositoryTest.java

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
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    runtimeOnly 'com.h2database:h2'
}

test {
    useJUnitPlatform()
}

The Gradle build file contains dependencies for Spring Data JPA, testing, and H2
database.

com/zetcode/model/City.java
  

package com.zetcode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Objects;

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
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

    List&lt;City&gt; findByName(String name);
}

CityRepository contains the custom findByName
method. Spring inspects the name of the method and derives a query from its
keywords.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    private final CityRepository cityRepository;

    @Autowired
    public MyRunner(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        logger.info("Saving cities");

        cityRepository.save(new City("Bratislava", 432000));
        cityRepository.save(new City("Budapest", 1759000));
        cityRepository.save(new City("Prague", 1280000));
        cityRepository.save(new City("Warsaw", 1748000));

        logger.info("Retrieving cities");

        var cities = cityRepository.findAll();
        cities.forEach(city -&gt; logger.info("{}", city));
    }
}

In MyRunner we use the CityRepository to save and
retrieve entities. The data is stored in the in-memory H2 database.

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

com/zetcode/repository/CityRepositoryTest.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class CityRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CityRepository repository;

    @Test
    public void testFindByName() {

        entityManager.persist(new City("Bratislava", 432000));
        entityManager.persist(new City("Budapest", 1759000));
        entityManager.persist(new City("Prague", 1280000));
        entityManager.persist(new City("Warsaw", 1748000));

        var cities = repository.findByName("Bratislava");
        assertEquals(1, cities.size());

        assertThat(cities).extracting(City::getName).containsOnly("Bratislava");
    }
}

In CityRepositoryTest, we test the custom JPA method.

@Autowired
private TestEntityManager entityManager;

We inject the TestEntityManager.

@DataJpaTest
public class CityRepositoryTest {

@DataJpaTest is used to test JPA repositories. The annotation
disables full auto-configuration and applies only configuration relevant to JPA
tests. By default, tests annotated with @DataJpaTest use an embedded in-memory
database.

entityManager.persist(new City("Bratislava", 432000));
entityManager.persist(new City("Budapest", 1759000));
entityManager.persist(new City("Prague", 1280000));
entityManager.persist(new City("Warsaw", 1748000));

We save four cities with EntityManager's persist
method.

var cities = repository.findByName("Bratislava");
assertEquals(1, cities.size());

We test that the findByName method returns one city.

assertThat(cities).extracting(City::getName).containsOnly("Bratislava");

Here we test the name of the city.

$ ./gradlew test

We run the tests.

In this article we have used TestEntityManager in our tests.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).