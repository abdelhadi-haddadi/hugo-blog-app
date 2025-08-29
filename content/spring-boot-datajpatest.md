+++
title = "Spring Boot @DataJpaTest"
date = 2025-08-29T20:12:12.344+01:00
draft = false
description = "Spring Boot @DataJpaTest tutorial shows how to test JPA repositories using @DataJpaTest annotation."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @DataJpaTest

last modified July 28, 2023

In this article we show how to test JPA repositories using @DataJpaTest
annotation.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## @DataJpaTest

@DataJpaTest is used to test JPA repositories. The annotation
disables full auto-configuration and applies only configuration relevant to JPA
tests. By default, tests annotated with @DataJpaTest use an
embedded in-memory database.

In our tests, we can inject a DataSource, @JdbcTemplate, @EntityManager or any
Spring Data repository from our application.

The application context containing all these components, including the in-memory
database, is shared between all test methods within all test classes annotated
with @DataJpaTest. Therefore, each test method runs in its own
transaction, which is rolled back after the method has executed. This way the
tests stay independent from each other.

## Spring @DataJpaTest example

The following application creates a custom JPA query method. The method is
tested in a test class annotated with @DataJpaTest.

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
│           application.properties
│           data-h2.sql
│           schema-h2.sql
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

group = 'com.zetcode'
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

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2
spring.jpa.hibernate.ddl-auto=none

The application.properties is the main Spring Boot configuration
file. With the spring.main.banner-mode property we turn off the
Spring banner. The spring.sql.init.platform sets the vendor name of
the database. It is used in the initialization scripts. Finally, the
spring.jpa.hibernate.ddl-auto disables the automatic creation of
schemas from entities.

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
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

    @Query("SELECT c FROM City c WHERE c.name LIKE CONCAT('%',:ending, '%') AND c.population &lt; :num")
    List&lt;City&gt; findByNameEndingWithAndPopulationLessThan(@Param("ending") String ending,
                                                         @Param("num") Integer num);
}

CityRepository contains the custom findByNameEndingWithAndPopulationLessThan
method. With the method we get all city names that end with the specified string
and their population is lower than the specified value.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.repository.CityRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    @Autowired
    private CityRepository cityRepository;

    @Override
    public void run(String... args) throws Exception {

        var cities = cityRepository.findByNameEndingWithAndPopulationLessThan("est", 1800000);
        cities.forEach(city -&gt; logger.info("{}", city));
    }
}

In MyRunner we use the
findByNameEndingWithAndPopulationLessThan method.

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

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class CityRepositoryTest {

    @Autowired
    private CityRepository repository;

    @Test
    public void should_find_all_customers() {

        Iterable&lt;City&gt; cities = repository.findAll();

        int nOfCities = 12;
        assertThat(cities).hasSize(nOfCities);
    }

    @Test
    public void should_find_with_name_ending_population_less_than() {

        var cities = repository.findByNameEndingWithAndPopulationLessThan("est", 150000);

        assertThat(cities).isNotEmpty();
    }
}

In CityRepositoryTest, we test the custom JPA method.

@DataJpaTest
public class CityRepositoryTest {

The CityRepositoryTest is annotated with @DataJpaTest.
The in-memory H2 database is used to perform the integration tests.

@Test
public void should_find_with_name_ending_population_less_than() {

    var cities = repository.findByNameEndingWithAndPopulationLessThan("est", 150000);

    assertThat(cities).isNotEmpty();
}

This method tests that there is at least one city with name ending
in 'est' and with population less than 150000.

$ ./gradlew bootRun

We run the tests.

In this article we have showed how to test a custom JPA repository method
utilizing @DataJpaTest.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).