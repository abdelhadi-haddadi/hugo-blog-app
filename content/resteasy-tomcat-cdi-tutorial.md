+++
title = "RESTEasy Tomcat CDI tutorial"
date = 2025-08-29T20:01:59.210+01:00
draft = false
description = "RESTEasy Tomcat CDI tutorial shows how to create a RESTful web application with RESTEasy, Tomcat, and CDI."
image = ""
imageBig = ""
categories = ["jaxrs"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# RESTEasy Tomcat CDI tutorial

last modified January 10, 2023

RESTEasy Tomcat CDI tutorial shows how to create a RESTful web application
with RESTEasy, Tomcat, and CDI.

## RESTEasy

RESTEasy is a framework for developing RESTful Web Services in Java.
It is a fully certified and portable implementation of the JAX-RS 2.0 specification.
JAX-RS 2.0 specification is a JCP (Java Community Process) specification that provides
a Java API for RESTful Web Services over the HTTP protocol.

RESTEasy can run in any Servlet container. It contains a rich set of providers, such as
XML, JSON, YAML, Fastinfoset, Multipart, XOP, and Atom.

## CDI

Contexts and Dependency Injection (CDI) defines a powerful set of complementary
services that help improve the structure of application code. CDI allows to bind the lifecycle
and interactions of stateful components to well-defined but extensible lifecycle contexts and
to inject components into an application in a typesafe way.
The advantages of CDI are: loose coupling, easier testing, better layering,
interface-based design promotion, and dynamic proxies.

JBoss Weld is a reference implementation of the CDI specification.

## RESTEasy Tomcat CDI example

The following example is a simple RESTful application, which returns some
context related data to the client as JSON data. The application uses Weld and
is deployed on Tomcat.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── conf
    │   │           │   └── AppConfig.java
    │   │           ├── model
    │   │           │   └── City.java
    │   │           ├── resource
    │   │           │   └── MyResource.java
    │   │           └── service
    │   │               ├── CityService.java
    │   │               └── ICityService.java
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
    &lt;artifactId&gt;RestEasyTomcatCdi&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;RestEasyTomcatCdi&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-jaxrs&lt;/artifactId&gt;
            &lt;version&gt;3.1.4.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-servlet-initializer&lt;/artifactId&gt;
            &lt;version&gt;3.1.4.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.weld.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;weld-servlet-shaded&lt;/artifactId&gt;
            &lt;version&gt;3.0.2.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-jackson-provider&lt;/artifactId&gt;
            &lt;version&gt;3.1.0.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-cdi&lt;/artifactId&gt;
            &lt;version&gt;3.1.4.Final&lt;/version&gt;
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

This is the Maven POM file. It contains dependencies for RESTEasy, Weld, and Jackson
provider.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/RestEasyTomcatCdi"/&gt;

In the Tomcat's context.xml configuration file, we define
the application context path.

beans.xml
  

&lt;?xml version="1.0"?&gt;
&lt;beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
http://xmlns.jcp.org/xml/ns/javaee/beans_1_1.xsd"
       version="1.1" bean-discovery-mode="all"&gt;

&lt;/beans&gt;

Applications that use CDI must have a beans.xml file defined. It can
be empty, like in our case. For web applications, the beans.xml file
must be in the WEB-INF directory. For EJB modules or JAR files, the
beans.xml file must be in the META-INF directory.

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
        return "City{" + "id=" + id + ", name=" + name
                + ", population=" + population + '}';
    }
}

This is a City model class. It contains three attributes:
id, name, and population.

AppConfig.java
  

package com.zetcode.conf;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("rest")
public class AppConfig extends Application {

}

This is the application configuration class. The Application
defines the components of a JAX-RS application and supplies additional meta-data.

@ApplicationPath("rest")

With the @ApplicationPath annotation, we set the path to RESTful web services.

ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    public List&lt;City&gt; findAll();
}

ICityService contains the findAll contract method.

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

CityService contains the implementation for the findAll
method. It simply returns a list of cities. This is usually retrieved from a data source
such as database.

MyResource.java
  

package com.zetcode.resource;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("cities")
public class MyResource {

    @Inject
    private ICityService cityService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List&lt;City&gt; message() {

        List&lt;City&gt; cities = cityService.findAll();

        return cities;
    }
}

This is the MyResource class.

@Path("cities")
public class MyResource {

The @Path specifies the URL to which the resource responds.

@Inject
private ICityService cityService;

With the @Inject annotation, we inject the city service object
into the cityService field.

@GET
@Produces(MediaType.APPLICATION_JSON)
public List&lt;City&gt; message() {

    List&lt;City&gt; cities = cityService.findAll();

    return cities;
}

The @GET annotation indicates that the annotated method responds to
HTTP GET requests. With the @Produces annotation, we define that
the method produces JSON. We call a service method and return a list of cities.
The message body writer converts the Java classes to JSON and writes it to the
response body.

$ curl localhost:8084/RestEasyTomcatCdi/rest/cities
[{"id":1,"name":"Bratislava","population":432000},{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},{"id":8,"name":"Berlin","population":3671000}]

After the application is deployed on Tomcat, we send a GET request to the
application with curl. We get JSON data.

In this tutorial, we have created a simple RESTFul application with RESTEasy and
Weld. The application was deployed on Tomcat.