+++
title = "Spring Boot CORS"
date = 2025-08-29T20:12:08.822+01:00
draft = false
description = "Spring Boot CORS tutorial shows how to set up Cross-Origin Resource Sharing in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot CORS

last modified August 2, 2023

In this article we show how to set up Cross-Origin Resource Sharing in a Spring
Boot application.

## CORS

Cross-Origin Resource Sharing (CORS) is a security policy that uses
HTTP headers to tell a browser to let a web application running at one origin
(domain) have permission to access selected resources from a server at a
different origin.

A web page can embed cross-origin images, stylesheets, scripts, iframes, and
videos. Some cross-domain requests, notably Ajax requests, are forbidden by
default by the same-origin security policy.

XMLHttpRequest and the Fetch API follow the same-origin policy. Therefore;
a web application using those APIs can only request HTTP resources from the same
origin the application was loaded from, unless the response from the other
origin includes the right CORS headers.

## Spring Boot CORS example

The following Spring Boot application uses Angular for the frontend.
The Angular SPA is run on localhost:4200 and makes a request
to the Spring Boot backend, which runs on localhost:8080.
For this to work, we need to enable CORS in the Spring Boot application.

## Spring Boot Backend

The backend will be created in Spring Boot.

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
│   │           │       AppConf.java
│   │           ├───controller
│   │           │       MyController.java
│   │           ├───model
│   │           │       City.java
│   │           └───repository
│   │                   CityRepository.java
│   └───resources
│       │   application.properties
│       └───static
│               index.html
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
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    runtimeOnly 'com.h2database:h2'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file.

resources/application.properties
  

spring.main.banner-mode=off

The application.properties is the main Spring Boot configuration
file. With the spring.main.banner-mode property we turn off the
Spring banner.

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

This is the City entity. It contains the following
attributes: id, name, and population.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository&lt;City, Long&gt; {

}

The CityRepository extends from the JpaRepository.
It provides the type of the entity and of its primary key.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyController {

    private final CityRepository cityRepository;

    @Autowired
    public MyController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @GetMapping(value = "/cities")
    public List&lt;City&gt; cities() {

        return cityRepository.findAll();
    }
}

In MyController we have an endpoint that returns all cities.

**Note: ** In Java enterprise applications it is a good practice
to define a service layer that works with repositories. For simplicity reasons,
we skip the service layer.

com/zetcode/conf/AppConf.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConf implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET");
    }
}

With the CorsRegistry we enable CORS. We set the allowed origin
and request method.

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
    }
}

In the MyRunner, we add data to the in-memory H2 database.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    This is home page
&lt;/p&gt;

&lt;script&gt;
fetch('http://localhost:8080/cities')
    .then(res =&gt; res.json())
    .then(data =&gt; console.log('Output: ', data))
    .catch(err =&gt; console.error(err));
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

In the home page, we use the Fetch API to create a request to
get all cities. This request is made from the same origin, so no
CORS is needed here.

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

## Angular frontend

The frontend of the applicaiton is created with Angular.

$ npm i -g @angular/cli
$ ng new frontend
$ cd frontend

We create a new Angular application.

src/app/app.module.ts
  

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

In the app.module.ts, we enable the http module, which
is used to make a request.

src/app/app.component.ts
  

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private http: HttpClient) { }
    title = 'frontend';
    httpdata: any;

    ngOnInit() {
        this.http.get('http://localhost:8080/cities')
        .subscribe((data) =&gt; this.displaydata(data));
    }

    displaydata(data: Object) { this.httpdata = data; }
}

In the ngOnInit method, we create a GET request
to the backend. The data is stored in httpdata.

src/app/app.component.html
  

&lt;h2&gt;List of cities&lt;/h2&gt;

&lt;ul *ngFor = "let data of httpdata"&gt;
  &lt;li&gt;Name : {{data.name}} Population: {{data.population}}&lt;/li&gt;
&lt;/ul&gt;

We display the data in an HTML list with *ngFor directive.

$ ng serve

We start the Angular server.

$ ./gradlew bootRun

We run the backend server.

In this article we have enabled CORS support for a Spring Boot application
with Angular frontend. The CORS is needed since the two parts are run
on different domains.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).