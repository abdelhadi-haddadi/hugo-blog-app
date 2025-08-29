+++
title = "Java Servlet Weld"
date = 2025-08-27T23:20:50.646+01:00
draft = false
description = "Java Servlet Weld tutorial shows how to use dependency injectinon in a Java Servlet with Weld."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet Weld

last modified July 13, 2020 

Java Servlet Weld tutorial shows how to use dependency injection in a Java Servlet with Weld.
We use Weld with Tomcat web server.

## Dependency injection

Dependency injection (DI) is a technique where one object supplies the dependencies 
of another object. In case of Java applications, it is a specific library that injects dependencies
into the classes. The major benefit of DI is loose coupling and ease of use. 
DI makes classes more cohesive because they have fewer responsibilities.

Java EE standardized dependency injection by introducing the Context and Dependency Injection (CDI)
specification. It is standard for dependency injection and contextual lifecycle management. 

## @Inject annotation

The @Inject annotation is used to inject a dependency into a Java class. 
The dependency that is to be injected can be optionally decorated with @ManagedBean
annotation.

## Weld

Weld is the reference implementation of CDI for the Java EE Platform. 
Weld is integrated into many Java EE application servers such as WildFly, JBoss, 
GlassFish, and others. Weld can also be used in plain servlet containers 
(Tomcat, Jetty) or Java SE.

## Java Servlet Weld example

In the following web application, we create a servlet that returns a list of city
objects in an HTML file. In the application, we use dependency injection
with the help of the Weld library.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── bean
    │   │           │   └── City.java
    │   │           ├── dao
    │   │           │   ├── CityDao.java
    │   │           │   └── ICityDao.java
    │   │           ├── service
    │   │           │   ├── CityService.java
    │   │           │   └── ICityService.java
    │   │           └── web
    │   │               └── GetCities.java
    │   └── webapp
    │       ├── index.html
    │       ├── listCities.jsp
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
    &lt;artifactId&gt;JavaServletWeld&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;JavaServletWeld&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;
               
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;jstl&lt;/artifactId&gt;
            &lt;version&gt;1.2&lt;/version&gt;
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
                &lt;version&gt;3.2.0&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;failOnMissingWebXml&gt;false&lt;/failOnMissingWebXml&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
 
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven POM file. The javax.servlet-api artifact is
for servlets. The weld-servlet-shaded dependency enables Weld to 
be run in a Servlet container. The jstl adds the JSTL library to 
the project. JSTL includes a set of useful tags for JSP applications.
The maven-war-plugin is responsible for collecting all artifact dependencies, 
classes and resources of the web application and packaging them into a web application archive (WAR).

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/JavaServletWeld"&gt;
    
    &lt;Resource name="BeanManager" 
               auth="Container"
               type="javax.enterprise.inject.spi.BeanManager"
               factory="org.jboss.weld.resources.ManagerObjectFactory" /&gt;
     
&lt;/Context&gt;

In the Tomcat context.xml file, we define the context path 
and register Weld's BeanManager factory.

com/zetcode/City.java
  

package com.zetcode.bean;

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

The City bean holds data of a city object. It 
has three attributes: id, name, and
population.

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

com/zetcode/ICityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;
import java.util.List;

public interface ICityService {
    
    public List&lt;City&gt; getCities();
}

ICityService contains the getCities contract method.

com/zetcode/CityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;
import com.zetcode.dao.ICityDao;
import java.util.List;
import javax.annotation.ManagedBean;
import javax.inject.Inject;

@ManagedBean
public class CityService implements ICityService {
    
    @Inject
    private ICityDao cityDao;
    
    @Override
    public List&lt;City&gt; getCities() {

        return cityDao.findAll();
    }
}

CityService contains the implementation of the ICityService
interface. The service class calls the method of the DAO object, which is an intermediary
layer to the database.

@ManagedBean
public class CityService implements ICityService {

@ManagedBean is an optional annotation which indicates that the 
CityService is going to be managed by Weld.

@Inject
private ICityDao cityDao;

With the @Inject annotation, we inject the CityDao into
the cityDao attribute.

com/zetcode/ICityDao.java
  

package com.zetcode.dao;

import com.zetcode.bean.City;
import java.util.List;

public interface ICityDao {
    
    public List&lt;City&gt; findAll();
}

Here we have the DAO findAll contract method.

com/zetcode/CityDao.java
  

package com.zetcode.dao;

import com.zetcode.bean.City;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.ManagedBean;

@ManagedBean
public class CityDao implements ICityDao {

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

CityDao contains the implementations of the findAll DAO method.
For simplicity reasons, we do not connect to the database but simply return
a list of City objects.

@ManagedBean
public class CityDao implements ICityDao {

CityDao is also a managed bean.

com/zetcode/GetCities.java
  

package com.zetcode.web;

import com.zetcode.bean.City;
import com.zetcode.service.ICityService;
import java.io.IOException;
import java.util.List;
import javax.inject.Inject;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "GetCities", urlPatterns = {"/GetCities"})
public class GetCities extends HttpServlet {

    @Inject
    ICityService cityService;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/html;charset=UTF-8");

        List&lt;City&gt; cities = cityService.getCities();
        request.setAttribute("cities", cities);
        
        RequestDispatcher dispatcher = request.getRequestDispatcher("listCities.jsp");
        dispatcher.forward(request, response);
    }
}

The GetCities servlet calls the city service's getCities 
method and responds with a HTML pages which contains all cities in an HTML table.

@WebServlet(name = "GetCities", urlPatterns = {"/GetCities"})

The Java class is decorated with the @WebServlet annotation. It is mapped
to the GetCities URL pattern.

@Inject
ICityService cityService;

With the @Inject annotation, we inject the CityService into
the CityService attribute.

response.setContentType("application/html;charset=UTF-8");

The servlet will output data in HTML and the encoding of the data is set to UTF-8.

List&lt;City&gt; cities = cityService.getCities();
request.setAttribute("cities", cities);

With CityService's getCities, we retrieve all
cities.

request.setAttribute("cities", cities);

We set the list into the request. 

RequestDispatcher dispatcher = request.getRequestDispatcher("listCities.jsp");
dispatcher.forward(request, response);

Using the RequestDispatcher, we send the processing to the listCities.jsp
page. It is a template file which joins data with HTML and produces the final output to the
client. 

listCities.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;Cities&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h2&gt;Cities&lt;/h2&gt;
        
        &lt;table&gt;
            &lt;thead&gt;
                &lt;tr&gt;
                    &lt;th&gt;Id&lt;/th&gt;
                    &lt;th&gt;Name&lt;/th&gt;
                    &lt;th&gt;Population&lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            
            &lt;tbody&gt;
                &lt;c:forEach items="${cities}" var="city"&gt;
                &lt;tr&gt;
                    &lt;td&gt;${city.id}&lt;/td&gt;
                    &lt;td&gt;${city.name}&lt;/td&gt;
                    &lt;td&gt;${city.population}&lt;/td&gt;
                &lt;/tr&gt;
                &lt;/c:forEach&gt;   
            &lt;/tbody&gt;
        &lt;/table&gt;
    &lt;/body&gt;
&lt;/html&gt;

The listCities.jsp uses a c:forEach tag
to generate an HTML table from the supplied data. 

index.html
  

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

This is the home page. It contains a link to call the servlet.

In this tutorial we have shown how to include a Weld library in a Java Servlet
web application and use to to manage dependencies.