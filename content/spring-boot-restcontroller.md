+++
title = "Spring Boot @RestController"
date = 2025-08-29T20:12:30.964+01:00
draft = false
description = "Spring Boot @RestController tutorial shows how to use the @RestController annotation in a Spring application to build a Restful controller."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @RestController

last modified July 18, 2023

Spring Boot @RestController tutorial shows how to use the
@RestController annotation in a Spring  application to build a
Restful controller.

Spring is a popular Java application framework and Spring Boot 
is an evolution of Spring that helps create stand-alone, production-grade Spring 
based applications easily.

## Spring MVC

Spring MVC is the primary web framework built on the Servlet API. It
is build on the popular MVC design pattern. MVC
(Model-View-Controller) is a software architecture pattern, which
separates application into three areas: model, view, and controller. The model
represents a Java object carrying data. The view represents the visualization of
the data that the model contains. The controller controls the data flow into
model object and updates the view when the data changes. It separates the view
and model.

Spring Framework 5.0 introduced a parallel reactive stack web framework called
*Spring WebFlux*.

## @RestController

@RestController is a convenience annotation for creating Restful
controllers. It is a specialization of @Component and is
autodetected through classpath scanning. It adds the @Controller
and @ResponseBody annotations. It converts the response to JSON or
XML. It does not work with the view technology, so the methods cannot return
ModelAndView. It is typically used in combination with annotated
handler methods based on the @RequestMapping annotation. 

The ResponseEntity class represents an HTTP response, including
headers, body, and status. It is used to return data. 

The @Controller annotation is used with the view technology.

## Restful application

A RESTFul application follows the REST architectural style, which is
used for designing networked applications. RESTful applications generate HTTP
requests performing CRUD (Create/Read/Update/Delete) operations on resources.
RESTFul applications typically return data in JSON or XML format. 

## Spring Boot @RestController example

In the following application, we demonstrate the usage of
@RestController. The application returns a list of cities as JSON
data.

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
│   │           └── service
│   │               ├── CityService.java
│   │               └── ICityService.java
│   └── resources
│       └── application.properties
└── test

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
}

This is the Gradle build file. The spring-boot-starter-web is a
starter for building web, including RESTful, applications using Spring MVC. 

resources/application.properties
  

spring.main.banner-mode=off

This is the main properties file.

com/zetcode/model/City.java
  

package com.zetcode.model;

public record City(Long id, String name, Integer population) {}

This is a City bean. It has id, name, and 
population attributes.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyController {

    private final ICityService cityService;

    @Autowired
    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping(value = "/cities")
    public ResponseEntity&lt;List&lt;City&gt;&gt; getCities() {

        return cityService.findAll();
    }

    @GetMapping(value = "/cities/{id}")
    public ResponseEntity&lt;City&gt; getCity(@PathVariable("id") int id) {

        return cityService.findById(id);
    }
}

This is MyController. It returns a list of cities in JSON format.

@RestController
public class MyController {

MyController is annotated with the @RestController
annotation.

private final ICityService cityService;

@Autowired
public MyController(ICityService cityService) {
    this.cityService = cityService;
}

We inject the CityService into the cityService field.

@GetMapping(value = "/cities")
public ResponseEntity&lt;List&lt;City&gt;&gt; getCities() {

    return cityService.findAll();
}

The getCities method is mapped to the /cities URL
pattern; it returns a list of cities, which is converted to JSON by a message
converter.

@GetMapping(value = "/cities/{id}")
public ResponseEntity&lt;City&gt; getCity(@PathVariable("id") int id) {

    return cityService.findById(id);
}

The getCity method returns a single city.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import java.util.List;

import com.zetcode.model.City;

import org.springframework.http.ResponseEntity;

public interface ICityService {

    ResponseEntity&lt;List&lt;City&gt;&gt; findAll();
    ResponseEntity&lt;City&gt; findById(int id);
}

The ICityService contains the findAll and 
findById contract methods.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CityService implements ICityService {

    private final List&lt;City&gt; cities = new ArrayList&lt;&gt;();

    public CityService() {

        cities.add(new City(1L, "Bratislava", 432000));
        cities.add(new City(2L, "Budapest", 1759000));
        cities.add(new City(3L, "Prague", 1280000));
        cities.add(new City(4L, "Warsaw", 1748000));
        cities.add(new City(5L, "Los Angeles", 3971000));
        cities.add(new City(6L, "New York", 8550000));
        cities.add(new City(7L, "Edinburgh", 464000));
        cities.add(new City(8L, "Berlin", 3671000));
    }

    @Override
    public ResponseEntity&lt;List&lt;City&gt;&gt; findAll() {

        return ResponseEntity.ok(cities);
    }

    public ResponseEntity&lt;City&gt; findById(int id) {

        if (id &lt; 0 || id &gt;= cities.size()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(cities.get(id));
    }
}

The CityService contains the implementation of the
findAll and findById methods.

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

$ ./gradlew bootRun

We run the application.

$ curl localhost:8080/cities/2 -i
HTTP/1.1 200
Content-Type: application/json
Transfer-Encoding: chunked
Date: Wed, 19 Jul 2023 14:25:22 GMT

{"id":3,"name":"Prague","population":1280000}

```
$ curl localhost:8080/cities
[{"id":1,"name":"Bratislava","population":432000},{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},{"id":8,"name":"Berlin","population":3671000}]

```

```
$ curl localhost:8080/cities/26 -i
HTTP/1.1 404
Content-Length: 0
Date: Wed, 19 Jul 2023 14:26:24 GMT

```

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).