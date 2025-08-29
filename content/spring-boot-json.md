+++
title = "Spring Boot JSON"
date = 2025-08-29T20:12:20.809+01:00
draft = false
description = "Spring Boot JSON tutorial shows how to serve JSON data in a Spring Boot annotation. JSON (JavaScript Object Notation) is a lightweight data-interchange format."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot JSON

last modified July 28, 2023

Spring Boot JSON tutorial shows how to serve JSON data in a Spring Boot
annotation.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring that helps create stand-alone, production-grade Spring 
based applications easily.

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. The official Internet media type for JSON is
application/json. The JSON filename extension is
.json.

## Spring Boot JSON

Spring Boot provides integration with three JSON mapping libraries:

    - Gson

    - Jackson

    - JSON-B

Jackson is the preferred and default library.

spring.http.converters.preferred-json-mapper=jsonb

The preferred JSON converter can be set with the 
spring.http.converters.preferred-json-mapper property.

### Jackson

Jackson is a suite of data-processing tools for Java. It allows to 
read and write data in JSON, Avro, BSON, CBOR, CSV, Smile, (Java) Properties,
Protobuf, XML or YAML format.

Jackson is auto-configured. It comes with the
spring-boot-starter-json. When Jackson is on the classpath an
ObjectMapper bean is automatically configured. The
spring-boot-starter-json is pulled with the 
spring-boot-starter-web. 

In Spring objects are automatically convered to JSON with the Jackson library. 
Spring can be configured to convert to XML as well.

spring.jackson.date-format= # For instance, `yyyy-MM-dd HH:mm:ss`.
spring.jackson.default-property-inclusion= # including properties during serialization. 
spring.jackson.deserialization.*= # Jackson on/off features for deserialization.
spring.jackson.generator.*= # Jackson on/off features for generators.
spring.jackson.joda-date-time-format= # Joda date time format string.
spring.jackson.locale= # Locale used for formatting.
spring.jackson.mapper.*= # Jackson general purpose on/off features.
spring.jackson.parser.*= # Jackson on/off features for parsers.
spring.jackson.property-naming-strategy= # PropertyNamingStrategy.
spring.jackson.serialization.*= # Jackson on/off features for serialization.
spring.jackson.time-zone= #  Time zone
spring.jackson.visibility.*= # To limit which methods (and fields) are auto-detected.

Jackson can be configured with application properties. 

@Configuration
public class WebConfig 
{
    @Bean
    public ObjectMapper customJson() {

        return new Jackson2ObjectMapperBuilder()
            .indentOutput(true)
            .propertyNamingStrategy(PropertyNamingStrategy.UPPER_CAMEL_CASE)
            .build();
    }
}

Jackson can be configured with the Jackson2ObjectMapperBuilder.

@Bean
public Jackson2ObjectMapperBuilderCustomizer customJson()
{
    return builder -&gt; {

        builder.indentOutput(true);
        builder.propertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
    };
}

Existing configuration can be modified with the Jackson2ObjectMapperBuilderCustomizer.

## Spring Boot JSON example

The following application return JSON data to the client. The Jackson is 
configured in three different ways.

build.gradle 
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───config
│   │           │       WebConfig.java
│   │           ├───controller
│   │           │       MyController.java
│   │           ├───model
│   │           │       City.java
│   │           └───service
│   │                   CityService.java
│   │                   ICityService.java
│   └───resources
│           application.yml
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
}

This is the Gradle build.gradle file.

resources/application.yml
  

spring:
  main:
    log-startup-info: false

  jackson:
    property-naming-strategy: UPPER_CAMEL_CASE
    serialization:
      indent-output: true

In the application.yml file, we set Jackson properties. These
settings can be overwritten or customized with the configuration beans.

com/zetcode/model/City.java
  

package com.zetcode.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Objects;

public class City {

    @JsonIgnore
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

We have a City model class. 

@JsonIgnore
private Long id;

With the @JsonIgnore, we remove the id from 
JSON serialization.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;

import java.util.List;

public interface ICityService {

    List&lt;City&gt; getCities();
}

The ICityService contains the getCities contract 
method. 

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CityService implements ICityService {

    public List&lt;City&gt; getCities() {

        List&lt;City&gt; cities = new ArrayList&lt;&gt;();

        cities.add(new City(1L, "Bratislava", 432000));
        cities.add(new City(2L, "Budapest", 1759000));
        cities.add(new City(3L, "Prague", 1280000));
        cities.add(new City(4L, "Warsaw", 1748000));
        cities.add(new City(5L, "Los Angeles", 3971000));
        cities.add(new City(6L, "New York", 8550000));
        cities.add(new City(7L, "Edinburgh", 464000));
        cities.add(new City(8L, "Berlin", 3671000));

        return cities;
    }
}

The CityService returns a list of city objects. We do not use 
a database to make the example simpler. 

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class WebConfig {

    //    @Bean
    public ObjectMapper configureJson() {
        return new Jackson2ObjectMapperBuilder()
                .indentOutput(true)
                .propertyNamingStrategy(PropertyNamingStrategies.UPPER_CAMEL_CASE)
                .build();
    }

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer customizeJson() {
        return builder -&gt; {

            builder.indentOutput(true);
            builder.propertyNamingStrategy(PropertyNamingStrategies.UPPER_CAMEL_CASE);
        };
    }
}

In WebConfig, we have beans that overwrite and customize Jackson
settings. Play with the different settings and see how they are applied. 
Enable or disable the beans (by commenting the @Bean) and compare 
the outcome.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyController {

    private final ICityService cityService;

    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/cities")
    public List&lt;City&gt; getCities() {

        return cityService.getCities();
    }
}

In order to write data to the response body, we use the @RestController 
or the @Controller/@ResponseBody combination.

@GetMapping("/cities")
public List&lt;City&gt; getCities() {

    return cityService.getCities();
}

The getCities method returns a list of city objects. The 
objects are automatically serialized into JSON.

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
application. 

We run the application with ./gradlew bootRun.

$ curl localhost:8080/cities
[ {
  "Name" : "Bratislava",
  "Population" : 432000
}, {
  "Name" : "Budapest",
  "Population" : 1759000
}, {
  "Name" : "Prague",
  "Population" : 1280000
}, {
  "Name" : "Warsaw",
  "Population" : 1748000
}, {
  "Name" : "Los Angeles",
  "Population" : 3971000
}, {
  "Name" : "New York",
  "Population" : 8550000
}, {
  "Name" : "Edinburgh",
  "Population" : 464000
}, {
  "Name" : "Berlin",
  "Population" : 3671000
} ]

This is a sample output. The JSON data is indented and the property naming
strategy is UPPER_CAMEL_CASE.

In this article we have shown how to serve JSON data to the client in a Spring
Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).