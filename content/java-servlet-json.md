+++
title = "Java servlet JSON"
date = 2025-08-29T20:01:46.045+01:00
draft = false
description = "Java servlet JSON tutorial shows how to return JSON data from a Java servlet. The web application is deployed on Jetty server."
image = ""
imageBig = ""
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java servlet JSON

last modified August 24, 2023

Java servlet JSON tutorial shows how to return JSON data from a Java servlet. We
use Gson library to work with JSON data format. The web application is deployed
on Jetty server.

Jetty is an open-source project providing an HTTP server, HTTP
client, and Java Servlet container.
Gson is an open source Java library to serialize and deserialize
Java objects to (and from) JSON.

## Java Servlet

Servlet is a Java class which responds to a particular type of
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty.
Modern-day Java web development uses frameworks that are built on top of servlets.

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange format.
It is easy for humans to read and write and for machines to parse and generate.
The official Internet media type for JSON is application/json.
The JSON filename extension is .json.

## Java servlet JSON application

The following web application uses a Java servlet to send data (list of cities) to the client in
JSON format.

pom.xml
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── model
│   │           │   └── City.java
│   │           ├── service
│   │           │   ├── CityService.java
│   │           │   └── ICityService.java
│   │           ├── util
│   │           │   └── JsonConverter.java
│   │           └── web
│   │               └── GetCities.java
│   ├── resources
│   └── webapp
│       └── index.html
└── test
    └── java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;org.example&lt;/groupId&gt;
    &lt;artifactId&gt;ServletJson&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;jakarta.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;jakarta.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;6.0.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
            &lt;artifactId&gt;gson&lt;/artifactId&gt;
            &lt;version&gt;2.9.0&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.2.3&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;11.0.11&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;webApp&gt;
                        &lt;contextPath&gt;/app&lt;/contextPath&gt;
                    &lt;/webApp&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven POM file. We have two artifacts: javax.servlet-api
for servlets and gson for JSON processing in Java. The
maven-war-plugin is responsible for collecting all artifact
dependencies, classes and resources of the web application and packaging them
into a web application archive (WAR).

The jetty-maven-plugin is a useful Maven plugin for rapid
development and testing. It creates a web application, starts a Jetty web
server, and deploys the application on the server.

com/zetcode/model/City.java
  

package com.zetcode.model;

import java.util.Objects;

public class City {

    private Long id;
    private String name;
    private int population;

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
        int hash = 3;
        hash = 97 * hash + Objects.hashCode(this.id);
        hash = 97 * hash + Objects.hashCode(this.name);
        hash = 97 * hash + this.population;
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
}

This is the City bean. It has three attributes: id, name, and
population.

com/zetcode/web/GetCities.java
  

package com.zetcode.web;

import com.zetcode.model.City;
import com.zetcode.service.CityService;
import com.zetcode.util.JsonConverter;

import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "GetCities", urlPatterns = {"/GetCities"})
public class GetCities extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/json;charset=UTF-8");

        ServletOutputStream out = response.getOutputStream();

        List&lt;City&gt; cities = new CityService().getCities();

        var converter = new JsonConverter();
        String output = converter.convertToJson(cities);

        out.print(output);
    }
}

This is the GetCities servlet. It retrieves data from a service
class and returns them to the client in JSON format.

response.setContentType("application/json;charset=UTF-8");

We set the content type of the response object to application/json.

ServletOutputStream out = response.getOutputStream();

We get the ServletOutputStream which is used to send data
to the client.

List&lt;City&gt; cities = new CityService().getCities();

From the CityService, we get the list of cities.

var converter = new JsonConverter();
String output = converter.convertToJson(cities);

We convert the list of cities into JSON string with JsonConverter.

out.print(output);

The JSON string is written to the ServletOutputStream.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; getCities();
}

ICityService contains the getCities contract method.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;

import java.util.List;

public class CityService implements ICityService {

    @Override
    public List&lt;City&gt; getCities() {

        var cities = List.of(
                new City(1L, "Bratislava", 432000),
                new City(2L, "Budapest", 1759000),
                new City(3L, "Prague", 1280000),
                new City(4L, "Warsaw", 1748000),
                new City(5L, "Los Angeles", 3971000),
                new City(6L, "New York", 8550000),
                new City(7L, "Edinburgh", 464000),
                new City(8L, "Berlin", 3671000));

        return cities;
    }
}

The CityService's getCities method returns a list of
city objects.

com/zetcode/util/JsonConverter.java
  

package com.zetcode.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.zetcode.model.City;

import java.util.List;

public class JsonConverter {

    private final Gson gson;

    public JsonConverter() {

        gson = new GsonBuilder().create();
    }

    public String convertToJson(List&lt;City&gt; cities) {

        JsonArray jarray = gson.toJsonTree(cities).getAsJsonArray();
        var jsonObject = new JsonObject();
        jsonObject.add("cities", jarray);

        return jsonObject.toString();
    }
}

JsonConverter converts a list of cities into a JSON string.
We use the Gson library.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="GetCities"&gt;GetCities&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

The home page contains a link to call the servlet.

$ mvn jetty:run

We run the Jetty server and navigate to localhost:8080/app/.

## Creating a request with curl

The curl is a tool to transfer data from or to a server,
using one of the supported protocols.

$ curl localhost:8080/app/GetCities
[{"id":1,"name":"Bratislava","population":432000},{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},{"id":8,"name":"Berlin","population":3671000}]

This is the output. With the curl command, we issue a HTTP GET
request to the GetCities servlet.

## Naming the JSON array

In case we wanted to name the returned JSON array, we can use the following
code:

Gson gson = new GsonBuilder().create();
JsonArray jarray = gson.toJsonTree(cities).getAsJsonArray();
JsonObject jsonObject = new JsonObject();
jsonObject.add("cities", jarray);

out.print(jsonObject.toString());

In the servlet, we place the JSON array into another JSON object and
name the property cities.

In this article we have sent JSON data from a Java servlet.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java Servlet tutorials](/all/#servlets).