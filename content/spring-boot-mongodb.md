+++
title = "Spring Boot MongoDB"
date = 2025-08-29T20:12:24.279+01:00
draft = false
description = "Spring Boot MongoDB tutorial shows how to access data in MongoDB in Spring Boot framework."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot MongoDB

last modified July 16, 2023

Spring Boot MongoDB tutorial shows how to access data in MongoDB in Spring Boot framework.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring which helps create stand-alone, production-grade Spring 
based applications easily.

## MongoDB

MongoDB is a NoSQL cross-platform document-oriented database. It is one of 
the most popular databases available. MongoDB is developed by MongoDB Inc. and is 
published as free and open-source software.

The Spring Data MongoDB project provides integration with the MongoDB document database. 

## Installing MongoDB

The following command can be used to install MongoDB on a Debian-based Linux.

$ sudo apt-get install mongodb

The command installs the necessary packages that come with MongoDB.

$ sudo service mongodb status
mongodb start/running, process 975

With the sudo service mongodb status command we check
the status of the mongodb server.

$ sudo service mongodb start
mongodb start/running, process 6448

The mongodb server is started with the sudo service mongodb start
command.

## Spring Boot MongoDB example

In the following example we create a simple Spring Boot application that
uses MongoDB database. Note that by default, without any specific configuration, 
Spring Boot attempts to connect to a locally hosted instance of MongoDB, using 
the test database name.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───model
│   │           │       Country.java
│   │           └───repository
│   │                   CountryRepository.java
│   └───resources
│           application.properties
└───test
    └───java
        └───com
            └───zetcode
                    MongoTest.java

This is the project structure of the Spring application.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;springbootmongodb&lt;/artifactId&gt;
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
            &lt;artifactId&gt;spring-boot-starter-data-mongodb&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-test&lt;/artifactId&gt;
            &lt;scope&gt;test&lt;/scope&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;2.6.7&lt;/version&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

This is the Maven pom.xml file.

Spring Boot starters are a set of convenient dependency descriptors which
greatly simplify Maven configuration. The spring-boot-starter-parent
has some common configurations for a Spring Boot application. 
The spring-boot-starter-data-mongodb is a
starter for using MongoDB document-oriented database and Spring Data MongoDB.
The spring-boot-starter-test is a starter for testing Spring Boot
applications with libraries including JUnit, Hamcrest and Mockito.

The spring-boot-maven-plugin provides Spring Boot support in Maven, allowing us 
to package executable JAR or WAR archives. Its spring-boot:run goal runs the 
Spring Boot application.

resources/application.properties
  

spring.main.banner-mode=off
logging.level.org.springframework=ERROR

In the application.properties, we turn of the Spring Boot banner 
and set the logging properties. Spring Boot by default attempts to connect to 
a locally hosted instance of MongoDB, using the test database.

# mongodb
spring.data.mongodb.host=localhost
spring.data.mongodb.port=27017
spring.data.mongodb.database=testdb

If we want to configure MongoDB, we can set the corresponding properties. 

com/zetcode/model/Country.java
  

package com.zetcode.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document
public class Country {

    @Id
    private String id;
    private String name;
    private int population;

    public Country(String name, int population) {
        this.name = name;
        this.population = population;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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
        sb.append("id='").append(id).append('\'');
        sb.append(", name='").append(name).append('\'');
        sb.append(", population=").append(population);
        sb.append('}');
        return sb.toString();
    }
}

This is the Country bean which has three attributes: id, 
name, and population.

@Document
public class Country {

The bean is decorated with the optional @Document annotation.

@Id
private String id;

The id is decorated with the @Id annotation.
Spring automatically generates a new id for a newly generated country object.

com/zetcode/repository/CountryRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.Country;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CountryRepository extends MongoRepository&lt;Country, String&gt; {

}

By extending from the MongoRepository, we get many operations out-of-the-box, 
including standard CRUD operations.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.Country;
import com.zetcode.repository.CountryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    @Autowired
    private CountryRepository repository;

    @Override
    public void run(String... args) throws Exception {

        repository.deleteAll();

        repository.save(new Country("China", 1382050000));
        repository.save(new Country("India", 1313210000));

        repository.findAll().forEach((country) -&gt; {
            logger.info("{}", country);
        });
    }
}

We have a command line runner. In its run method
we access the MongoDB. 

@Autowired
private CountryRepository repository;

CountryRepository is injected with the @Autowired
annotation.

repository.deleteAll();

We delete all countries with deleteAll, if there are any.

repository.save(new Country("China", 1382050000));

We save a country with save.

repository.findAll().forEach((country) -&gt; {
    logger.info("{}", country);
});

We use the findAll method to iterate over all countries
in the database.

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

This code sets up the Spring Boot application.

com/zetcode/MongoTest.java
  

package com.zetcode;

import com.zetcode.model.Country;
import com.zetcode.repository.CountryRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static junit.framework.TestCase.assertEquals;
import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MongoTest {

    @Autowired
    private CountryRepository repository;

    private static final int NUMBER_OF_COUNTRIES = 6;

    @Before
    public void init() {

        repository.deleteAll();

        repository.save(new Country("China", 1382050000));
        repository.save(new Country("India", 1313210000));
        repository.save(new Country("USA", 324666000));
        repository.save(new Country("Indonesia", 260581000));
        repository.save(new Country("Brazil", 207221000));
        repository.save(new Country("Pakistan", 196626000));
    }

    @Test
    public void countAllCountries() {

        var countries = repository.findAll();
        assertEquals(NUMBER_OF_COUNTRIES, countries.size());
    }

    @Test
    public void countOneCountry() {

        Example&lt;Country&gt; example = Example.of(new Country("China", 1382050000));

        assertThat(repository.count(example)).isEqualTo(1L);
    }

    @Test
    public void setsIdOnSave() {

        Country nigeria = repository.save(new Country("Nigeria", 186988000));
        assertThat(nigeria.getId()).isNotNull();
    }

    @Test
    public void findOneCountry() {

        Example&lt;Country&gt; example = Example.of(new Country("India", 1313210000));

        Optional&lt;Country&gt; country = repository.findOne(example);
        assertThat(country.get().getName()).isEqualTo("India");
    }
}

We have four test methods. 

@Before
public void init() {

    repository.deleteAll();

    repository.save(new Country("China", 1382050000));
    repository.save(new Country("India", 1313210000));
    repository.save(new Country("USA", 324666000));
    repository.save(new Country("Indonesia", 260581000));
    repository.save(new Country("Brazil", 207221000));
    repository.save(new Country("Pakistan", 196626000));
}

In the init method, we save six countries.

@Test
public void countAllCountries() {

    var countries = repository.findAll();
    assertEquals(NUMBER_OF_COUNTRIES, countries.size());
}

We test that there are six countries in the database.

@Test
public void countOneCountry() {

    Example&lt;Country&gt; example = Example.of(new Country("China", 1382050000));

    assertThat(repository.count(example)).isEqualTo(1L);
}

This method tests that there is only one China in the database.

@Test
public void setsIdOnSave() {

    Country nigeria = repository.save(new Country("Nigeria", 186988000));
    assertThat(nigeria.getId()).isNotNull();
}

We test that when we save a new country, an automatically generated id is 
not equal to null.

@Test
public void findOneCountry() {

    Example&lt;Country&gt; example = Example.of(new Country("India", 1313210000));

    Optional&lt;Country&gt; country = repository.findOne(example);
    assertThat(country.get().getName()).isEqualTo("India");
}

We test that findOne methods finds one country, namely India.

In this article we have learned how to use MongoDB in a Spring Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).