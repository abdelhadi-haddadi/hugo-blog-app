+++
title = "Spring Boot @ResponseBody"
date = 2025-08-29T20:12:29.853+01:00
draft = false
description = "Spring Boot @ResponseBody shows how to bind controller return values to response body."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @ResponseBody

last modified July 16, 2023

In Spring Boot @ResponseBody tutorial, we are going to use the Spring
@ResponseBody annotation in a controller to write data to the body
of the response object.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring which helps create stand-alone, production-grade Spring
based applications easily.

WebJars are client-side web libraries (such as jQuery or Bootstrap)
packaged into JAR files. They allow easy management of client-side dependencies
in Java web applications

JQuery is a popular open source JavaScript library designed to
simplify the client-side scripting of HTML.

## Spring @ResponseBody

@ResponseBody is a Spring annotation which binds a method return
value to the web response body. It is not interpreted as a view name. It uses
HTTP Message converters to convert the return value to HTTP response body, based
on the content-type in the request HTTP header.

## Spring @ResponseBody example

The following example creates a Spring Boot web application which returns JSON
data to the client. The home page is handled with the MVC mechanism; FreeMarker
is used to create the template for the home page. The home page contains a
button which sends a request to get JSON data. The Spring Boot web application
sends data in JSON format with the help of the @ResponseBody
annotation.

build.gradle
...
src
├── main
│&nbsp;  ├── java
│&nbsp;  │&nbsp;  └── com
│&nbsp;  │&nbsp;      └── zetcode
│&nbsp;  │&nbsp;          ├── Application.java
│&nbsp;  │&nbsp;          ├── controller
│&nbsp;  │&nbsp;          │&nbsp;  └── MyController.java
│&nbsp;  │&nbsp;          ├── model
│&nbsp;  │&nbsp;          │&nbsp;  └── City.java
│&nbsp;  │&nbsp;          └── service
│&nbsp;  │&nbsp;              ├── CityService.java
│&nbsp;  │&nbsp;              └── ICityService.java
│&nbsp;  └── resources
│&nbsp;      └── templates
│&nbsp;          └── index.ftlh
└── test
    ├── java
    └── resources

This is the project structure of the application.

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
    implementation 'org.springframework.boot:spring-boot-starter'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
    implementation 'org.webjars:webjars-locator:0.45'
    implementation 'org.webjars:jquery:3.6.0'
}

The spring-boot-starter-freemarker is a starter for building Spring
MVC web applications using FreeMarker views. We use a webjar for JQuery. The
webjars-locator automatically resolves the version of any WebJars
assets. The application is packaged into a JAR file and uses Tomcat as an
embedded web server.

com/zetcode/model/City.java
  

package com.zetcode.model;

import java.util.Objects;

public class City {

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        City city = (City) o;
        return population == city.population &amp;&amp;
                Objects.equals(id, city.id) &amp;&amp;
                Objects.equals(name, city.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, population);
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

This is the City bean. It has id, name, 
and population attributes.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAll();
}

ICityService contains the contract method to get all cities.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CityService implements ICityService {

    @Override
    public List&lt;City&gt; findAll() {

        var cities = new ArrayList&lt;City&gt;();

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

CityService returns eight city objects.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.City;
import com.zetcode.service.ICityService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    @Autowired
    ICityService cityService;

    @RequestMapping(path = "/")
    public String index() {

        return "index";
    }

    @RequestMapping(path = "/GetCities", produces = "application/json; charset=UTF-8")
    @ResponseBody
    public List&lt;City&gt; findCities() {

        var cities = (List&lt;City&gt;) cityService.findAll();

        return cities;
    }
}

The controller has two methods. The index method returns a view for
the home page. The findCities method returns a list of cities as
JSON data.

@Controller
public class MyController {

The @Controller annotation indicates that we have a controller class.

@RequestMapping(path = "/")
public String index() {

    return "index";
}

The index method returns the index string, which is
resolved to index.ftlh view. The view is located in the
src/main/resources/templates directory. When Spring locates
spring-boot-starter-freemarker artifact in the POM file, it
automatically configures FreeMarker.

@RequestMapping(path = "/GetCities", produces = "application/json; charset=UTF-8")
@ResponseBody
public List&lt;City&gt; findCities() {

    var cities = (List&lt;City&gt;) cityService.findAll();

    return cities;
}

For the GetCities path, the findCities method is
called. The produces parameter indicates that the method returns
JSON data; Spring RequestResponseBodyMethodProcessor handles return
values from methods annotated with @ResponseBody by writing to the
body of the response with an HttpMessageConverter. The message
converter in our case is MappingJackson2HttpMessageConverter, which
reads and writes JSON using Jackson's ObjectMapper. (Jackson is a popular Java
JSON library.)

resources/templates/index.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;script src="webjars/jquery/jquery.min.js"&gt;&lt;/script&gt;
    &lt;/head&gt;
&lt;body&gt;

    &lt;button id="mybtn"&gt;Get cities&lt;/button&gt;

    &lt;div&gt;
        &lt;ul id="output"&gt;

        &lt;/ul&gt;
    &lt;/div&gt;

    &lt;script&gt;
        $('#mybtn').click(function () {

            $.getJSON('GetCities', function (data) {

                $("ul#output &gt; li").remove();

                $.each(data, function (key, value) {
                    $("#output").append('&lt;li&gt;' + value['name'] + " " + value['population'] + '&lt;/li&gt;');
                });
            });
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

The index.ftl file is the template for the home page. It cointains
a button which executes an asynchronous request to the web application. It loads
a list of cities and writes them to the HTML list.

&lt;script src="webjars/jquery/jquery.min.js"&gt;&lt;/script&gt;

We include the JQuery library. Thanks to webjars-locator, we can include
a version agnostic JQuery library. So we do not have to update the link if the version
of JQuery changes.

&lt;script&gt;
    $('#mybtn').click(function () {

        $.getJSON('GetCities', function (data) {

            $("ul#output &gt; li").remove();

            $.each(data, function (key, value) {
                $("#output").append('&lt;li&gt;' + value['name'] + " " + value['population'] + '&lt;/li&gt;');
            });
        });
    });
&lt;/script&gt;

With $.getJSON method, we load data in JSON format using a HTTP
GET request. The data is traversed with $.each and written to the
HTML list.

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

In this article we have used the @ResponseBody annotation in a
Spring Boot web application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).