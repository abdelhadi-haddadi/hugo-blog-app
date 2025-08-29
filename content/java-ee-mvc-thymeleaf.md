+++
title = "Java EE MVC Thymeleaf"
date = 2025-08-29T19:48:36.942+01:00
draft = false
description = "Java EE MVC Thymeleaf tutorial shows how to use integrame Thymeleaf template engine with Java EE MVC web framework."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java EE MVC Thymeleaf

last modified July 13, 2020 

Java EE MVC Thymeleaf tutorial shows how to use integrame Thymeleaf template engine
with Java EE MVC web framework. We use Tomcat web server.

## Thymeleaf

Thymeleaf is a modern server-side Java template engine for 
both web and standalone environments.

In web applications Thymeleaf aims to be a complete substitute for JSP. 
It is a natural template engine: template files can be directly opened 
in browsers and that still display correctly as web pages.

## Java EE MVC

Java MVC is a specification (JSR-371) for a new Java action-based web 
framework. It is an alternative to the traditional component-based JSF. 
The MVC API is layered on top of JAX-RS and integrates with existing 
Java EE technologies like CDI and Bean Validation. Eclipse Ozark is an 
implementation of Java MVC. It currently contains support for RESTEasy, 
Jersey, and Apache CXF. 

## Java MVC Thymeleaf example

In the following web application, we create a simple Java MVC application.
It displays data with Thymeleaf.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── config
    │   │           │   └── ApplicationConfig.java
    │   │           ├── controller
    │   │           │   ├── CityController.java
    │   │           │   └── HelloController.java
    │   │           └── model
    │   │               ├── City.java
    │   │               └── Message.java
    │   ├── resources
    │   └── webapp
    │       ├── index.html
    │       ├── META-INF
    │       │   └── context.xml
    │       └── WEB-INF
    │           ├── beans.xml
    │           └── views
    │               ├── cities.html
    │               └── hello.html
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
    &lt;artifactId&gt;JavaMVCThymeleaf&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;JavaMVCThymeleaf&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.mvc-spec.ozark&lt;/groupId&gt;
            &lt;artifactId&gt;ozark-resteasy&lt;/artifactId&gt;
            &lt;version&gt;1.0.0-m03&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.mvc&lt;/groupId&gt;
            &lt;artifactId&gt;javax.mvc-api&lt;/artifactId&gt;
            &lt;version&gt;1.0-pr&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.mvc-spec.ozark&lt;/groupId&gt;
            &lt;artifactId&gt;ozark-core&lt;/artifactId&gt;
            &lt;version&gt;1.0.0-m03&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;javax.enterprise&lt;/groupId&gt;
            &lt;artifactId&gt;cdi-api&lt;/artifactId&gt;
            &lt;version&gt;2.0&lt;/version&gt;
        &lt;/dependency&gt;     
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.weld.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;weld-servlet-shaded&lt;/artifactId&gt;
            &lt;version&gt;3.0.4.Final&lt;/version&gt;
        &lt;/dependency&gt;        
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-validator&lt;/artifactId&gt;
            &lt;version&gt;5.4.2.Final&lt;/version&gt;
        &lt;/dependency&gt;                           
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-servlet-initializer&lt;/artifactId&gt;
            &lt;version&gt;3.5.1.Final&lt;/version&gt;
        &lt;/dependency&gt;        
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-cdi&lt;/artifactId&gt;
            &lt;version&gt;3.5.1.Final&lt;/version&gt;
        &lt;/dependency&gt;    
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.mvc-spec.ozark.ext&lt;/groupId&gt;
            &lt;artifactId&gt;ozark-thymeleaf&lt;/artifactId&gt;
            &lt;version&gt;1.0.0-m03&lt;/version&gt;
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

This is the Maven POM file. It contains all the neccessary libraries
to build our application, including Java MVC framework, Weld
container, and Thymeleaf engine.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/JavaMVCThymeleaf"&gt;
    
    &lt;Resource name="BeanManager" 
               auth="Container"
               type="javax.enterprise.inject.spi.BeanManager"
               factory="org.jboss.weld.resources.ManagerObjectFactory" /&gt;
     
&lt;/Context&gt;

In the Tomcat context.xml file, we define the context path 
and register Weld's BeanManager factory.

beans.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
http://xmlns.jcp.org/xml/ns/javaee/beans_1_1.xsd"
       bean-discovery-mode="all"&gt;
    
&lt;/beans&gt;

In the WEB-INF directory, we have an empty beans.xml
file. It is a deployment descriptor for CDI. It can be used for configuring interceptors, 
decorators, and other things. Even if we do no configurations, we need to add 
an empty beans.xml for registering CDI.

com/zetcode/ApplicationConfig.java
  

package com.zetcode.config;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("mvc")
public class ApplicationConfig extends Application {

}

ApplicationConfig is the application configuration class. It is possible to 
omit the web.xml file since Servlet 3.0. In JAX-RS, we create 
a configuration class that extends the abstract Application
and use the @ApplicationPath annotation. The Application
defines the components of a JAX-RS application and supplies additional meta-data. 
Here we register resource classes, providers, or properties the application needs.

com/zetcode/City.java
  

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
        int hash = 5;
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
        if (!Objects.equals(this.id, other.id)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "City{" + "id=" + id + ", name=" + name 
                + ", population=" + population + '}';
    }
}

The City bean holds data of a city object. It 
has three attributes: id, name, and
population.

com/zetcode/Message.java
  

package com.zetcode.model;

import javax.enterprise.context.RequestScoped;

@RequestScoped
public class Message {
    
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}

This is a simple model which contains a message.

@RequestScoped
public class Message {

An object which is defined as @RequestScoped is created once 
for every request and is shared by all the beans that inject it throughout a request.

com/zetcode/HelloController.java
  

package com.zetcode.controller;

import com.zetcode.model.Message;
import javax.inject.Inject;
import javax.mvc.Models;
import javax.mvc.annotation.Controller;
import javax.mvc.annotation.View;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("hello")
@Controller
public class HelloController {

    @Inject
    private Message message;

    @Inject
    private Models models;

    @GET
    @Produces("text/html")
    @View("hello.html")
    public void hello() {
        
        message.setText("Today is a sunny day");

        models.put("message", message);
    }
}

The HelloController returns a simple message to the client.

@Path("hello")
@Controller
public class HelloController {

The @Controller annotation defines a controller and 
the @Path annotation the route to the controller.

@GET
@Produces("text/html")
@View("hello.html")
public void hello() {

The @GET annotation defines the method for which the
hello method is called. The @Produces
annotation defines the media type of the response. The @View
annotation defines the view name. It is the name of the Thymeleaf 
template file.

message.setText("Today is a sunny day");

models.put("message", message);

We set the message and place the message bean to the models object.
The model contains the data to be displayed by the views.

com/zetcode/CityController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Inject;
import javax.mvc.Models;
import javax.mvc.annotation.Controller;
import javax.mvc.annotation.View;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Path("cities")
@Controller
public class CityController {

    @Inject
    private Models models;

    @GET
    @Produces("text/html")
    @View("cities.html")
    public void getCities() {
        
        List&lt;City&gt; cities = new ArrayList&lt;&gt;();
        cities.add(new City(1L, "Bratislava", 432000));
        cities.add(new City(2L, "Budapest", 1759000));
        cities.add(new City(3L, "Prague", 1280000));
        cities.add(new City(4L, "Los Angeles", 1748000));
        cities.add(new City(5L, "New York", 3971000));
        
        models.put("cities", cities);
    }
}

The CityController returns a list of cities. 

hello.html
  

&lt;html&gt;
    &lt;head&gt;
      &lt;title&gt;Message&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;      
    &lt;/head&gt;
    &lt;body&gt;
      &lt;p th:text="${message.text}"&gt;Message text&lt;/span&gt;
&lt;/body&gt;
&lt;/html&gt;

The hello.html is the first Thymeleaf template. The templates
are located in the default WEB-INF/views directory.

&lt;p th:text="${message.text}"&gt;Message text&lt;/span&gt;

The text from the bean is displayed with the Thymeleaf 
th:text="${message.text}" directive.

cities.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Cities&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h2&gt;Cities&lt;/h2&gt;

        &lt;ul&gt;
            &lt;li th:each="c : ${cities}" th:text="${c.name + ': ' + c.population}"&gt;city&lt;/li&gt;
        &lt;/ul&gt;

    &lt;/body&gt;
&lt;/html&gt;

In the second view file, we show the list of cities in an HTML list 
with Thymeleaf's th:each directive.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;a href="mvc/hello"&gt;Get message&lt;/a&gt;
        &lt;/p&gt;
        
        &lt;p&gt;
            &lt;a href="mvc/cities"&gt;Get cities&lt;/a&gt;
        &lt;/p&gt;        
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains two links to execute two actions
on the server.

In this tutorial we have shown how to integrate Thymeleaf into 
Java EE MVC framework.