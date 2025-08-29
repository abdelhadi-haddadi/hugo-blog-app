+++
title = "Spring Boot ResponseEntity"
date = 2025-08-29T20:12:29.861+01:00
draft = false
description = "Spring Boot ResponseEntity tutorial shows how to use ResponseEntity in a Spring application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot ResponseEntity

last modified July 16, 2023

Spring Boot ResponseEntity tutorial shows how to use ResponseEntity
in a Spring application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

## ResponseEntity

ResponseEntity represents an HTTP response, including headers,
body, and status. While @ResponseBody puts the return value into
the body of the response, ResponseEntity also allows us to add
headers and status code.

## Groovy examples

We show some controller methods utilizing ResponseEntity classes to
create responses.

app.groovy
  

package com.zetcode

@RestController
class MyApp {

    @GetMapping("/status")
    ResponseEntity&lt;String&gt; home() {
        ResponseEntity.status(HttpStatus.OK).body("OK")
    }

    @GetMapping("/notfound")
    ResponseEntity&lt;String&gt; notfound() {
        ResponseEntity.notFound().build()
    }

    @GetMapping("/badrequest")
    ResponseEntity&lt;String&gt; badRequest() {
        ResponseEntity.badRequest().body("Bad request")
    }
}

The example shows how to create common status OK, not found, and bad request
responses. 

$ curl -i localhost:8080/status
HTTP/1.1 200 
Content-Type: text/plain;charset=UTF-8
Content-Length: 2
Date: Sun, 22 May 2022 21:11:20 GMT

```
$ curl -i localhost:8080/notfound
HTTP/1.1 404 
Content-Length: 0
Date: Sun, 22 May 2022 21:11:51 GMT

```

```
$ curl -i localhost:8080/badrequest
HTTP/1.1 400 
Content-Type: text/plain;charset=UTF-8
Content-Length: 11
Date: Sun, 22 May 2022 21:12:15 GMT
Connection: close

```

app.groovy
  

```
package com.zetcode

import java.time.LocalDate
import groovy.transform.Immutable

@Immutable
class User {
    String name
    String occupation
 }

@RestController
class MyApp {

    def users = [

        new User('John Doe', 'gardener'),
        new User('Roger Roe', 'driver'),
        new User('Kim Smith', 'teacher'),
        new User('Joe Nigel', 'artist'),
        new User('Liam Strong', 'teacher'),
        new User('Robert Young', 'gardener')
    ]

    @GetMapping("/users")
    ResponseEntity&lt;User&gt; home() {
        ResponseEntity.ok().body(users)
    }

    @GetMapping("/random-user")
    ResponseEntity&lt;User&gt; notfound() {

        def rnd = new Random()
        def ru = users.get(rnd.nextInt(users.size()))
        ResponseEntity.ok().body(ru)
    }
}

```

In the example, we have two URL paths that send a list of users and a random 
user utilizing ResponseEntity.

$ curl localhost:8080/random-user
{"name":"Roger Roe","occupation":"driver"}
$ curl localhost:8080/users
[{"name":"John Doe","occupation":"gardener"},
{"name":"Roger Roe","occupation":"driver"},
{"name":"Kim Smith","occupation":"teacher"},
{"name":"Joe Nigel","occupation":"artist"},
{"name":"Liam Strong","occupation":"teacher"},
{"name":"Robert Young","occupation":"gardener"}]

## Spring Boot ResponseEntity example

In the following application, we demonstrate the usage of
ResponseEntity. The application has two methods: one method uses
ResponseEntity to create an HTTP response, the other one
@ResponseBody.

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
│   │           └── model
│   │               └── Country.java
│   └── resources
│       └── static
│           └── index.html
└── test
    ├── java
    └── resources

This is the project structure of the Spring application.

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

This is the Gradle build file. The spring-boot-starter-web is a
dependency for creating Spring Boot web applications using Spring MVC.

com/zetcode/model/Country.java
  

package com.zetcode.model;

import java.util.Objects;

public class Country {

    private String name;
    private int population;

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
        return population == country.population &amp;&amp; Objects.equals(name, country.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, population);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Country{");
        sb.append("name='").append(name).append('\'');
        sb.append(", population=").append(population);
        sb.append('}');
        return sb.toString();
    }
}

This is the Country bean. It has two attributes: name
and population.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.Country;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    @RequestMapping(value = "/getCountry")
    public ResponseEntity&lt;Country&gt; getCountry() {

        var c = new Country();
        c.setName("France");
        c.setPopulation(66984000);

        var headers = new HttpHeaders();
        headers.add("Responded", "MyController");

        return ResponseEntity.accepted().headers(headers).body(c);
    }

    @RequestMapping(value = "/getCountry2")
    @ResponseBody
    public Country getCountry2() {

        var c = new Country();
        c.setName("France");
        c.setPopulation(66984000);

        return c;
    }
}

The controller contains two methods. The first one uses ResponseEntity,
the second one @ResponseBody.

@RequestMapping(value = "/getCountry")
public ResponseEntity&lt;Country&gt; getCountry() {

The getCountry method is mapped to the getCountry
URL pattern; it returns a ResponseEntity of type
Country.

var c = new Country();
c.setName("France");
c.setPopulation(66984000);

We create a Country bean; this bean is returned in the response.

var headers = new HttpHeaders();
headers.add("Responded", "MyController");

We create an instance of HttpHeaders and add a new header value.

return ResponseEntity.accepted().headers(headers).body(c);

A ResponseEntity is returned. We give ResponseEntity
a custom status code, headers, and a body.

@RequestMapping(value = "/getCountry2")
@ResponseBody
public Country getCountry2() {

    var c = new Country();
    c.setName("France");
    c.setPopulation(66984000);

    return c;
}

With @ResponseBody, only the body is returned. The headers and
status code are provided by Spring.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;a href="getCountry"&gt;Get country 1&lt;/a&gt;
        &lt;/p&gt;

        &lt;p&gt;
            &lt;a href="getCountry2"&gt;Get country 2&lt;/a&gt;
        &lt;/p&gt;

    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains two links.

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

$ curl localhost:8080/getCountry -I
HTTP/1.1 202 
Responded: MyController
Content-Type: application/json
Transfer-Encoding: chunked
Date: Sat, 14 May 2022 10:48:33 GMT

When calling the first method, we can see the chosen 202 status code and the
custom header value.

In this article we have shown how to use ResponseEntity in a
Spring Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).