+++
title = "Spring Boot @ControllerAdvice"
date = 2025-08-29T20:12:08.831+01:00
draft = false
description = "SpringBoot @ControllerAdvice tutorial shows how to use @ControllerAdvice annotation to manage exceptions in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @ControllerAdvice

last modified July 18, 2023

SpringBoot @ControllerAdvice tutorial shows how to use @ControllerAdvice
annotation to manage exceptions in a Spring Boot application.

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications with minimal effort.

## @ControllerAdvice

@ControllerAdvice is a specialization of the @Component
annotation which allows to handle exceptions across the whole application in one
global handling component. It can be viewed as an interceptor of exceptions
thrown by methods annotated with @RequestMapping and similar.

It declares @ExceptionHandler, @InitBinder, or
@ModelAttribute methods to be shared across multiple
@Controller classes.

ResponseEntityExceptionHandler is a convenient base class for 
@ControllerAdvice classes that wish to provide centralized exception 
handling across all @RequestMapping methods through 
@ExceptionHandler methods. It  provides an  methods for handling
internal Spring MVC exceptions. It returns a ResponseEntity in
contrast to DefaultHandlerExceptionResolver which returns a
ModelAndView.

## Spring Boot @ControllerAdvice example

In the following Spring Boot application we use @ControllerAdvice
to handle three exceptions: when a city is not found, when there is no 
data, and when a data for a new city to be saved is not valid.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───controller
│   │           │       MyController.java
│   │           ├───exception
│   │           │       CityNotFoundException.java
│   │           │       ControllerAdvisor.java
│   │           │       NoDataFoundException.java
│   │           ├───model
│   │           │       City.java
│   │           ├───repository
│   │           │       CityRepository.java
│   │           └───service
│   │                   CityService.java
│   │                   ICityService.java
│   └───resources
│           application.properties
└───test
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
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'com.h2database:h2'
}

This is the Gradle build file. Since Spring Boot 2.3 the 
spring-boot-starter-validation dependency must be explicitly
specified.

src/resources/application.properties
  

spring.main.banner-mode=off

The application.properties is the main Spring Boot configuration
file. With the spring.main.banner-mode property we turn off the
Spring banner. 

com/zetcode/model/City.java
  

package com.zetcode.model;

import org.hibernate.validator.constraints.Range;

import java.util.Objects;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    private String name;

    @Range(min=10, max=100_000_000)
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

This is the City entity. It contains the following
attributes: id, name, and population.

@NotEmpty
private String name;

@Range(min=10, max=100_000_000)
private int population;

We have validation annotations for the city data. An exception is thrown 
when the name is empty and the population does not fit the specified range.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

}

The CityRepository extends from the CrudRepository.
It provides the type of the entity and of its primary key. A repository is 
a storage of city objects.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;

import java.util.List;

public interface ICityService {

    City findById(Long id);
    City save(City city);
    List&lt;City&gt; findAll();
}

ICityService provides contract methods to save a city, to get all
cities and get a city by its Id from the data source. 

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.exception.CityNotFoundException;
import com.zetcode.exception.NoDataFoundException;
import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public City findById(Long id) {

        return cityRepository.findById(id)
                .orElseThrow(() -&gt; new CityNotFoundException(id));
    }

    @Override
    public City save(City city) {

        return cityRepository.save(city);
    }

    @Override
    public List&lt;City&gt; findAll() {

        var cities = (List&lt;City&gt;) cityRepository.findAll();

        if (cities.isEmpty()) {

            throw new NoDataFoundException();
        }

        return cities;
    }
}

CityService contains the implementation of the 
findAll, save, and findById 
methods. We use repository to retrieve data from the database. 

return cityRepository.findById(id)
    .orElseThrow(() -&gt; new CityNotFoundException(id));

If a city cannot be found, the CityNotFoundException is thrown.

if (cities.isEmpty()) {

    throw new NoDataFoundException();
}

If there are no data in the database, the NoDataFoundException
is thrown.

com/zetcode/exception/CityNotFoundException.java
  

package com.zetcode.exception;

public class CityNotFoundException extends RuntimeException {

    public CityNotFoundException(Long id) {

        super(String.format("City with Id %d not found", id));
    }
}

This is the CityNotFoundException.

com/zetcode/exception/NoDataFoundException.java
  

package com.zetcode.exception;

public class NoDataFoundException extends RuntimeException {

    public NoDataFoundException() {

        super("No data found");
    }
}

This is the NoDataFoundException.

com/zetcode/exception/ControllerAdvisor.java
  

package com.zetcode.exception;

import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

    @ExceptionHandler(CityNotFoundException.class)
    public ResponseEntity&lt;Object&gt; handleCityNotFoundException(
            CityNotFoundException ex, WebRequest request) {

        Map&lt;String, Object&gt; body = new LinkedHashMap&lt;&gt;();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", "City not found");

        return new ResponseEntity&lt;&gt;(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NoDataFoundException.class)
    public ResponseEntity&lt;Object&gt; handleNodataFoundException(
            NoDataFoundException ex, WebRequest request) {

        Map&lt;String, Object&gt; body = new LinkedHashMap&lt;&gt;();
        body.put("timestamp", LocalDateTime.now());
        body.put("message", "No cities found");

        return new ResponseEntity&lt;&gt;(body, HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity&lt;Object&gt; handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {

        Map&lt;String, Object&gt; body = new LinkedHashMap&lt;&gt;();
        body.put("timestamp", LocalDate.now());
        body.put("status", status.value());

        List&lt;String&gt; errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.toList());

        body.put("errors", errors);

        return new ResponseEntity&lt;&gt;(body, HttpStatus.BAD_REQUEST);
    }
}

The ControllerAdvisor is a component which handles all three
exceptions in one place.

@ControllerAdvice
public class ControllerAdvisor extends ResponseEntityExceptionHandler {

The ResponseEntityExceptionHandler inherits from the 
ResponseEntityExceptionHandler, which is a convenient base class
for controller advisor components.

@ExceptionHandler(CityNotFoundException.class)
public ResponseEntity&lt;Object&gt; handleCityNotFoundException(
    CityNotFoundException ex, WebRequest request) {

    Map&lt;String, Object&gt; body = new LinkedHashMap&lt;&gt;();
    body.put("timestamp", LocalDateTime.now());
    body.put("message", "City not found");

    return new ResponseEntity&lt;&gt;(body, HttpStatus.NOT_FOUND);
}

This is a handler method for the CityNotFoundException. 
We send a ResponseEntity with a timestamp, error message 
and a status code to the client.

@Override
protected ResponseEntity&lt;Object&gt; handleMethodArgumentNotValid(
    MethodArgumentNotValidException ex, HttpHeaders headers, 
    HttpStatusCode status, WebRequest request) {

The handleMethodArgumentNotValid handles the 
MethodArgumentNotValidException which is thrown when 
validation on an argument annotated with @Valid fails.

List&lt;String&gt; errors = ex.getBindingResult()
    .getFieldErrors()
    .stream()
    .map(DefaultMessageSourceResolvable::getDefaultMessage)
    .collect(Collectors.toList());

body.put("errors", errors);

We get the error fields. 

return new ResponseEntity&lt;&gt;(body, HttpStatus.BAD_REQUEST);

A ResponseEntity is returned with the error messages 
and the status code.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import java.util.List;

@RestController
public class MyController {

    private final ICityService cityService;

    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping(value = "/cities/{id}")
    public City getCity(@PathVariable Long id) {

        return cityService.findById(id);
    }

    @PostMapping(value = "/cities", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public City createCity(@RequestBody @Valid City city) {

        return cityService.save(city);
    }

    @GetMapping(value = "/cities")
    public List&lt;City&gt; findAll() {

        return cityService.findAll();
    }
}

MyController is a Restful controller. It contains mappings for
retrieving a city, saving a city and retrieving all cities. 

@PostMapping(value = "/cities", consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
public City createCity(@RequestBody @Valid City city) {

With the @Valid annotation we ensure that the data fits the
validation rules.

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
        cityRepository.save(new City("Los Angeles", 3971000));
        cityRepository.save(new City("New York", 8550000));
        cityRepository.save(new City("Edinburgh", 464000));
        cityRepository.save(new City("Suzhou", 4327066));
        cityRepository.save(new City("Zhengzhou", 4122087));
        cityRepository.save(new City("Berlin", 3671000));
    }
}

In the MyRunner, we save a couple of city objects into the 
database.

private final CityRepository cityRepository;

@Autowired
public MyRunner(CityRepository cityRepository) {
    this.cityRepository = cityRepository;
}

We inject the CityRepository into the cityRepository
field.

cityRepository.save(new City("Bratislava", 432000));

A new city is inserted with save.

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

$ curl localhost:8080/cities/23
{"timestamp":"2023-07-18T19:06:10.1986204","message":"City not found"}

There is no city with id 23.

$ curl localhost:8080/cities -H "Content-Type: application/json" -X POST -d '{"name":"Sydney", "population":"2"}'
{"timestamp":"2023-07-18","status":400,"errors":["must be between 10 and 100000000"]}

We get an error message when we provide invalid population value. 
(Use -d "{\"name\":\"Sydney\", \"population\":\"2\"}" on Windows.)

In this article we have worked with the @ControllerAdvice
annotation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).