+++
title = "Jersey JSON"
date = 2025-08-29T20:02:00.337+01:00
draft = false
description = "Jersey JSON tutorial shows how to serve JSON from a RESTFul application in Jersey. The application is deployed on Tomcat."
image = ""
imageBig = ""
categories = ["jersey"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Jersey JSON

last modified January 10, 2023

Jersey JSON tutorial shows how to serve JSON from a RESTFul application in
Jersey. The application is deployed on Tomcat.

## Jersey

Jersey is a framework for developing RESTful Web Services in Java. It
is a reference implementation of the Java API for RESTful Web Services (JAX-RS)
specification. Another popular JAX-RS implementation is JBoss' RESTEasy.

## JSON

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. The official Internet media type for JSON is
application/json. The JSON filename extension is
.json.

## Jersey JSON example

The following example is a simple RESTful application, which returns JSON data to the client.

├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── conf
    │   │           │   └── AppResConfig.java
    │   │           ├── model
    │   │           │   └── City.java
    │   │           ├── service
    │   │           │   ├── CityService.java
    │   │           │   └── ICityService.java
    │   │           └── ws
    │   │               └── MyResource.java
    │   ├── resources
    │   └── webapp
    │       ├── META-INF
    │       │   └── context.xml
    │       └── WEB-INF
    │           └── beans.xml
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

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JerseyJsonTomcat&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;JerseyJsonTomcat&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencyManagement&gt;
        &lt;dependencies&gt;
            &lt;dependency&gt;
                &lt;groupId&gt;org.glassfish.jersey&lt;/groupId&gt;
                &lt;artifactId&gt;jersey-bom&lt;/artifactId&gt;
                &lt;version&gt;2.26&lt;/version&gt;
                &lt;type&gt;pom&lt;/type&gt;
                &lt;scope&gt;import&lt;/scope&gt;
            &lt;/dependency&gt;
        &lt;/dependencies&gt;
    &lt;/dependencyManagement&gt;
    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.inject&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-hk2&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.containers&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-container-servlet&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.ext.cdi&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-cdi1x-servlet&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.enterprise&lt;/groupId&gt;
            &lt;artifactId&gt;cdi-api&lt;/artifactId&gt;
            &lt;version&gt;2.0-EDR1&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.core&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-server&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.media&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-media-json-jackson&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.weld.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;weld-servlet-shaded&lt;/artifactId&gt;
            &lt;version&gt;3.0.2.Final&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;2.3&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;failOnMissingWebXml&gt;false&lt;/failOnMissingWebXml&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven POM file. It contains dependencies for enabling Jersey, converting
Java classes to JSON, and dependency injection.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/JerseyJsonTomcat"&gt;
  &lt;Resource auth="Container"
            factory="org.jboss.weld.resources.ManagerObjectFactory"
            name="BeanManager" type="javax.enterprise.inject.spi.BeanManager"/&gt;
&lt;/Context&gt;

In the Tomcat's context.xml configuration file, we define
the application context path. We also register Weld's BeanManager factory.

beans.xml
  

&lt;?xml version="1.0"?&gt;
&lt;beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
http://xmlns.jcp.org/xml/ns/javaee/beans_1_1.xsd"
       version="1.1" bean-discovery-mode="all"&gt;

&lt;/beans&gt;

In the WEB-INF directory, we have an empty beans.xml
file. It is a deployment descriptor for CDI. It can be used for configuring interceptors,
decorators, and other things. Even if we do no configurations, we need to add
an empty beans.xml for registering CDI.

City.java
  

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
    public int hashCode() {
        int hash = 3;
        hash = 71 * hash + Objects.hashCode(this.id);
        hash = 71 * hash + Objects.hashCode(this.name);
        hash = 71 * hash + this.population;
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
        return "City{" + "id=" + id + ", name=" + name +
                ", population=" + population + '}';
    }
}

This is a City class.

AppResConfig.java
  

package com.zetcode.conf;

import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("rest")
public class AppResConfig extends ResourceConfig {

    public AppResConfig() {

        packages(true, "com.zetcode");
    }
}

ResourceConfig is the resource configuration for configuring a web
application. With the packages method, we specify the packages to
be searched for components.

@ApplicationPath("rest")

With the @ApplicationPath annotation, we set the path to RESTful
web services.

ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    public List&lt;City&gt; findAll();
}

ICityService contains a findAll contract method.

CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.ArrayList;
import java.util.List;

public class CityService implements ICityService {

    @Override
    public List&lt;City&gt; findAll() {

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

CityService contains the implementation of the findAll
method. It returns a list of cities.

MyResource.java
  

package com.zetcode.ws;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("cities")
public class MyResource {

    @Inject
    private ICityService cityService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response message() {

        List&lt;City&gt; cities = cityService.findAll();

        GenericEntity&lt;List&lt;City&gt;&gt; myEntity = new GenericEntity&lt;List&lt;City&gt;&gt;(cities) {};

        return Response.status(200).entity(myEntity).build();
    }
}

This is the MyResource class.

@Path("cities")
public class MyResource {

The @Path specifies the URL to which the resource responds.

@Inject
private ICityService cityService;

With @Inject annotation, we inject the city service into the cityService
field.

@GET
@Produces(MediaType.APPLICATION_JSON)
public Response message() {

The @GET annotation indicates that the annotated method
responds to HTTP GET requests. With the @Produces annotation,
we define that the method produces JSON data.

List&lt;City&gt; cities = cityService.findAll();

GenericEntity&lt;List&lt;City&gt;&gt; myEntity = new GenericEntity&lt;List&lt;City&gt;&gt;(cities) {};

We call the city service and create a GenericEntity from the returned list
of cities.

return Response.status(200).entity(myEntity).build();

We send a response containing the JSON data to the client. A message body writer
transforms the list of cities into JSON.

$ curl localhost:8084/JerseyJsonTomcat/rest/cities
[{"id":1,"name":"Bratislava","population":432000},{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},{"id":8,"name":"Berlin","population":3671000}]

After the application is deployed on Tomcat, we send a GET request to the
application with curl.

In this tutorial, we have used create a RESTFul application which sends JSON data
to the client. We used Tomcat web server and Jersey framework.