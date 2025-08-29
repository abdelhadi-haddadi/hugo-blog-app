+++
title = "Spring Boot DataSourceBuilder"
date = 2025-08-29T20:12:13.549+01:00
draft = false
description = "Spring Boot DataSourceBuilder tutorial shows how to use DataSourceBuilder to create datasources in a command line Spring Boot application. We show how to integrate HikariCP connection pool."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot DataSourceBuilder

last modified July 29, 2023

In this article we show how to use DataSourceBuilder to create datasources in a
command line Spring Boot application. A HikariCP connection pool is used.

DataSourceBuilder is a Java convenience class to create a data source
with common implementations and properties.

H2 is an open source relational database management system created
entirely in Java. It can be embedded in Java applications or run in the
client-server mode. It is easy to deploy and install and has small footprint.

Spring is a Java application framework for developing Java enterprise
applications. It also helps integrate various enterprise components. Spring Boot
makes it easy to create Spring-powered, production-grade applications and
services with minimum setup requirements.

## Spring Boot DataSourceBuilder example

The following is a simple Spring Boot console application. It retrieves
data from the H2 in-memory database and displays it in the terminal. To 
configure the datasource, we use the DataSourceBuilder class.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───config
│   │           │       AppConfig.java
│   │           └───model
│   │                   Car.java
│   └───resources
│           application.yml
│           data.sql
│           logback.xml
│           schema.sql
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
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    runtimeOnly 'com.h2database:h2'
}

In the build.gradle we declare the necessary dependencies.

com/zetcode/model/Car.java
  

package com.zetcode.model;

import java.util.Objects;

public class Car {

    private Long id;
    private String name;
    private int price;

    public Car() {}

    public Car(Long id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return price == car.price &amp;&amp;
                Objects.equals(id, car.id) &amp;&amp;
                Objects.equals(name, car.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Car{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", price=").append(price);
        sb.append('}');
        return sb.toString();
    }
}

This is Car bean class. It contains item id, name, and price.

resources/schema.sql
  

CREATE TABLE cars(id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), price INT);

This SQL script creates the cars table.

resources/data.sql
  

INSERT INTO cars(name, price) VALUES('Audi', 52642);
INSERT INTO cars(name, price) VALUES('Mercedes', 57127);
INSERT INTO cars(name, price) VALUES('Skoda', 9000);
INSERT INTO cars(name, price) VALUES('Volvo', 29000);
INSERT INTO cars(name, price) VALUES('Bentley', 350000);
INSERT INTO cars(name, price) VALUES('Citroen', 21000);
INSERT INTO cars(name, price) VALUES('Hummer', 41400);
INSERT INTO cars(name, price) VALUES('Volkswagen', 21600);

This script fills the table with data. Both scripts are located
in the root of the classpath.

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;include resource="org/springframework/boot/logging/logback/base.xml" /&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="DEBUG"/&gt;
    &lt;logger name="com.zaxxer.hikari" level="INFO"/&gt;
&lt;/configuration&gt;

In the logback.xml file, we configre the logging levels. We set the
logging level for Spring framework to ERROR so that our output is
not cluttered with unnecessary details.

resources/application.yml
  

spring:
  main:
      banner-mode: "off"
  datasource:
      jdbcUrl: jdbc:h2:mem:testdb

The main Spring Boot configuration file is called application.yml.  
In datasource property we configure the datasource.
We use an in-memory H2 database. 

With the banner-mode property we turn off Spring Boot banner. Spring Boot
determines the database from the jdbcUrl property. It initializes
the database table running schema.sql and data.sql
SQL scripts.

com/zetcode/config/AppConfig.java
  

package com.zetcode.conf;

import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class AppConfig {

    @Bean
    public DataSource primaryDataSource() {

        return DataSourceBuilder.create()
                .username("sa")
                .password("")
                .url("jdbc:h2:mem:testdb;DB_CLOSE_ON_EXIT=FALSE")
                .driverClassName("org.h2.Driver")
                .build();
    }
}

We build the datasource in Java code. Spring Boot automatically configures
HikariCP connection pool.

 -->

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class AppConfig {

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
}

A datasource is generated in AppConfig.
With the @ConfigurationProperties annotation, we have externalized
the configuration into the YAML file.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {
    
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MyRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {

        var sql = "SELECT * FROM cars";
        var cars = jdbcTemplate.query(sql, 
            BeanPropertyRowMapper.newInstance(Car.class));

        for (Car car : cars) {

            System.out.println(car);
        }
    }
}

MyRunner executes an SQL query and shows the output in the console.

private final JdbcTemplate jdbcTemplate;

@Autowired
public MyRunner(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
}

JdbcTemplate is injected.

var sql = "SELECT * FROM cars";

This is SQL to be executed. We select all cars from the cars table.

var cars = jdbcTemplate.query(sql, 
    BeanPropertyRowMapper.newInstance(Car.class));

BeanPropertyRowMapper converts a row into a new instance of the 
specified mapped target class.

for (Car car: cars) {
    
    System.out.println(car);
}

We iterate over all car objects and print them to the console.

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

$ ./gradlew bootRun
... 
Car{id=1, name='Audi', price=52642}
Car{id=2, name='Mercedes', price=57127}
Car{id=3, name='Skoda', price=9000}
Car{id=4, name='Volvo', price=29000}
Car{id=5, name='Bentley', price=350000}
Car{id=6, name='Citroen', price=21000}
Car{id=7, name='Hummer', price=41400}
Car{id=8, name='Volkswagen', price=21600}
...

We run the Spring Boot application. The eight cars are displayed. 

In this article we used DataSourceBuilder in a Spring Boot console application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).