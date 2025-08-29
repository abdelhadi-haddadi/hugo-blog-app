+++
title = "Spring Boot MySQL"
date = 2025-08-29T20:12:25.350+01:00
draft = false
description = "Spring Boot MySQL tutorial shows how to use MySQL database in a Spring Boot application. MySQL is a leading open source database management system."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot MySQL

last modified August 2, 2023

In this article we show how to use MySQL database in a Spring Boot application.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## MySQL

MySQL is a leading open source database management system. It is a
multi-user, multithreaded database management system. MySQL is especially
popular on the web. It is one part of the very popular LAMP platform, which
includes Linux, Apache, MySQL, and PHP. MySQL database is available on most
important OS platforms. It runs on BSD Unix, Linux, Windows, and Mac.

## MySQL setup

We are going to show how to install MySQL database on a Debian Linux system.

$ sudo apt-get install mysql-server

This command installs MySQL server and related packages.

$ sudo systemctl mysql start
$ sudo systemctl mysql stop

These two commands are used to start and stop MySQL.

$ sudo systemctl status mysql

We check the status of the database with systemctl status mysql
command.

$ sudo mysql -u root -p

Now we need to reset the root password. We start the mysql command line tool.
(The server must be running.) We connect as root.

mysql&gt; ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpasswd';

We set a new password for root.

mysql&gt; CREATE DATABASE testdb;

We create a new testdb database.

mysql&gt; CREATE USER user12@localhost IDENTIFIED BY 's$cret';
mysql&gt; GRANT ALL ON testdb.* TO user12@localhost;

We create a new MySQL user and grant it privileges to the testdb
database.

## Creating MySQL table

Now we are going to create a new MySQL table called cities.

cities_mysql.sql
  

DROP TABLE IF EXISTS cities;
CREATE TABLE cities(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255),
    population INT);

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

This is SQL to create the cities table.

mysql&gt; use testdb;
mysql&gt; source cities_mysql.sql

With the source command, we execute the SQL statements.

## Spring Boot MySQL example

The following application is a simple Spring Boot web application, which uses
MySQL database. We have a home page with a link to display data from a database
table. We use Mustache templating system to join data with HTML.

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
│       ├── application.properties
│       ├── static
│       │   └── index.html
│       └── templates
│           └── showCities.mustache
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
    implementation 'org.springframework.boot:spring-boot-starter-mustache'
    runtimeOnly 'mysql:mysql-connector-java'
}

Spring Boot starters are a set of convenient dependency descriptors which
greatly simplify the application configuration. The
spring-boot-starter-web is a starter for building web, including
RESTful, applications using Spring MVC. 

The spring-boot-starter-mustache is a starter for building MVC web
applications using Mustache views. The spring-boot-starter-data-jpa 
is a starter for using Spring Data JPA with Hibernate.

The mysql-connector-java dependency is for the MySQL database driver.

resources/application.properties
  

spring.main.banner-mode=off
logging.level.org.springframework=ERROR

spring.datasource.url=jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC
spring.datasource.username=user12
spring.datasource.password=s$cret

spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQLDialect

In the application.properties file we write various configuration
settings of a Spring Boot application. With the spring.main.banner-mode 
property we turn off the Spring banner. With the
logging.level.org.springframework we set the logging level for
spring framework to ERROR. In the spring datasource properties we
set up the MySQL datasource. We also set the Hibernate dialect.

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

@Entity
@Table(name = "cities")
public class City {

The @Entity annotation specifies that the class is an entity and is
mapped to a database table while the @Table annotation specifies
the name of the database table to be used for mapping.

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;

The primary key of an entity is specified with the @Id annotation.
The @GeneratedValue gives a strategy for generating the values of 
primary keys.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

}

By extending from the Spring CrudRepository, we will have
some methods for our data repository implemented, including findAll.
This way we save a lot of boilerplate code.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAll();
}

ICityService provides the findAll contract method
declaration to get all cities from the data source.

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

        return (List&lt;City&gt;) repository.findAll();
    }
}

CityService contains the implementation of the findAll 
method. We use the repository to retrieve data from the database.

private final CityRepository repository;

public CityService(CityRepository repository) {
    this.repository = repository;
}

CityRepository is injected.

return (List&lt;City&gt;) repository.findAll();

The findAll method of the repository returns the list of cities.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MyController {

    private final ICityService cityService;

    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/cities")
    public String findCities(Model model) {

        var cities = (List&lt;City&gt;) cityService.findAll();

        model.addAttribute("cities", cities);

        return "showCities";
    }
}

MyController class is annotated with @Controller.

private final ICityService cityService;

public MyController(ICityService cityService) {
    this.cityService = cityService;
    }

We inject an ICityService into the cityService field.

@GetMapping("/cities")
public String findCities(Model model) {

    var cities = (List&lt;City&gt;) cityService.findAll();

    model.addAttribute("cities", cities);

    return "showCities";
}

We map a request with the /cities path to the controller's
findCities method. The @GetMapping annotation maps a
GET request to the method. The model gains a list of cities and the processing
is sent to the showCities.mustache Mustache template file.

resources/templates/showCities.mustache
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;title&gt;Cities&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h2&gt;List of cities&lt;/h2&gt;

&lt;table&gt;
    &lt;tr&gt;
        &lt;th&gt;Id&lt;/th&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;th&gt;Population&lt;/th&gt;
    &lt;/tr&gt;

    {{#cities}}
    &lt;tr&gt;
        &lt;td&gt;{{id}}&lt;/td&gt;
        &lt;td&gt;{{name}}&lt;/td&gt;
        &lt;td&gt;{{population}}&lt;/td&gt;
    &lt;/tr&gt;
    {{/cities}}

&lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;

In the showCities.mustache template file, we display the data in
an HTML table.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;meta charset="UTF-8"/&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"/&gt;
&lt;/head&gt;

&lt;body&gt;
&lt;a href="/cities"&gt;Show cities&lt;/a&gt;
&lt;/body&gt;

&lt;/html&gt;

In the index.html there is a link to show all cities.

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

The Application sets up the Spring Boot application. The
@SpringBootApplication enables auto-configuration and component
scanning.

$ ./gradlew bootRun

After the application is run, we can navigate to localhost:8080.

In this article we have showed how to use MySQL database in a Spring Boot
application. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).