+++
title = "Java Servlet RESTFul client"
date = 2025-08-29T20:01:47.196+01:00
draft = false
description = "Java Servlet RESTFul client tutorial shows how to create a RESTFul client in a Java Servlet with RESTEasy."
image = ""
imageBig = ""
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet RESTFul client

last modified August 24, 2023

In Java Servlet RESTFul client tutorial, we create a RESTFul client in 
a Java Servlet with JAX-RS.

Java API for RESTful Web Services (JAX-RS) is a Java API
specification that provides support in creating web services according to the
Representational State Transfer (REST) architectural pattern.

RESTEasy is a Java RESTful Web Services Framework and a
JAX-RS implementation from JBoss.

Servlet is a Java class which responds to a particular type of
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty.
Modern-day Java web development uses frameworks that are built on top of
servlets.

## Java Servlet application

The following web application creates a request to the api.randomuser.me
site, which is a random user generator.

The Java servlet uses ClientBuilder to create a 
Client, which is the main entry point to the fluent API 
used to build and execute client requests in order to consume 
responses returned. 

pom.xml
src
├── main
│&nbsp;&nbsp; ├── java
│&nbsp;&nbsp; │&nbsp;&nbsp; └── com
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── zetcode
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── model
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; ├── Location.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; ├── Name.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; ├── Person.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── PersonsList.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── service
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── PersonService.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         └── web
│&nbsp;&nbsp; │&nbsp;&nbsp;             └── MyServlet.java
│&nbsp;&nbsp; ├── resources
│&nbsp;&nbsp; └── webapp
│&nbsp;&nbsp;     ├── index.html
│&nbsp;&nbsp;     └── show.jsp
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
    &lt;artifactId&gt;JavaServletRestClient&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;14&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;14&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;jstl&lt;/groupId&gt;
            &lt;artifactId&gt;jstl&lt;/artifactId&gt;
            &lt;version&gt;1.2&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-servlet-initializer&lt;/artifactId&gt;
            &lt;version&gt;4.5.5.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-client&lt;/artifactId&gt;
            &lt;version&gt;4.5.5.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-jackson2-provider&lt;/artifactId&gt;
            &lt;version&gt;4.5.5.Final&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.0&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;9.4.30.v20200611&lt;/version&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven POM file. We have the following artifacts: javax.servlet-api 
for servlets, jstl for the standard JSP tags library, 
resteasy-servlet-initializer for integrating RESTEasy with servlets,
resteasy-client for the RESTFul core client implementation 
and resteasy-jackson2-provide for JSON/Java model data binding.

In the application, we have three model classes; these models will be filled
with data from the response.

com/zetcode/model/Location.java
  

package com.zetcode.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Location {

    private String city;
    private String state;
    private String postcode;

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Location{");
        sb.append("city='").append(city).append('\'');
        sb.append(", state='").append(state).append('\'');
        sb.append(", postcode='").append(postcode).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

The Location stores the address of the user.

@JsonIgnoreProperties(ignoreUnknown = true)

With the @JsonIgnoreProperties annotation we tell the
Jackson to ignore properties not listed in the Person.

com/zetcode/model/Name.java
  

package com.zetcode.model;

public class Name {

    private String first;
    private String last;
    private String title;

    public String getFirst() {
        return first;
    }

    public void setFirst(String firstName) {
        first = firstName;
    }

    public String getLast() {
        return last;
    }

    public void setLast(String lastName) {
        last = lastName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {

        StringBuilder sb = new StringBuilder();
        sb.append(title).append(" ").append(first)
                .append(" ").append(last);
        return sb.toString();
    }
}

The Name stores the user name details.

com/zetcode/model/Person.java
  

package com.zetcode.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Person {

    private Name name;
    private Location location;
    private String email;
    private String gender;

    public void setName(Name name) {
        this.name = name;
    }

    public Name getName() {
        return name;
    }    

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {

        StringBuilder sb = new StringBuilder();
        sb.append("Name: ").append(name)
                .append("Address: ").append(location)
                .append("Email ").append(email)
                .append("Gender: ").append(gender);
        return sb.toString();
    }
}

The Person class stores data about the user, including
name, address, email, and gender. 

com/zetcode/PersonsList.java
  

package com.zetcode.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PersonsList {

    private List&lt;Person&gt; results;

    public List&lt;Person&gt; getResults() {
        return results;
    }

    public void setResults(List&lt;Person&gt; result) {
        results = result;
    }
}

This is the list of Person objects. The web service fills
this list with data.

com/zetcode/web/MyServlet.java
  

package com.zetcode.web;

import com.zetcode.model.Person;
import com.zetcode.service.PersonService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");

        List&lt;Person&gt; people = PersonService.fetchPeople(0, 50);

        request.setAttribute("people", people);
        request.getRequestDispatcher("show.jsp").forward(request, response);
    }
}

The MyServlet servlet calls the 
PersonService.fetchPeople(), which returns a list of 
Person objects.
The list is stored as an attribute and the processing is dispatched 
to the show.jsp page. The JSP page renders the list of
Person objects.

com/zetcode/service/PersonService.java
  

package com.zetcode.service;

import com.zetcode.model.Person;
import com.zetcode.model.PersonsList;
import java.util.List;

import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;

public class PersonService {

    private static WebTarget resource = ClientBuilder.newBuilder()
            .build().target("https://api.randomuser.me/");
 
    public static List&lt;Person&gt; fetchPeople(int offset, int num) {
        PersonsList res = resource.queryParam("seed", 1)
                .queryParam("results", num).queryParam("page", 1)
                .request(MediaType.APPLICATION_JSON).get(PersonsList.class);
        return res.getResults();
    }      
}

PersonService contains a fetchPeople() method
to perform a query on api.randomuser.me web service.
The service returns randomly user objects.

private static WebTarget resource = ClientBuilder.newBuilder()
        .build().target("https://api.randomuser.me/");

With the ClientBuilder, we create a web resource target.
The api.randomuser.me website returns randomly a list
of users.

public static List&lt;Person&gt; fetchPeople(int offset, int num) {
    PersonsList res = resource.queryParam("seed", 1)
            .queryParam("results", num).queryParam("page", 1)
            .request(MediaType.APPLICATION_JSON).get(PersonsList.class);
    return res.getResults();
}    

 
We send a query to the web resouce; the data is stored in 
PersonsList.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="MyServlet"&gt;List people&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains a link to call the 
MyServlet.

webapp/show.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;Show people&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;table&gt;
            &lt;thead&gt;
                &lt;tr&gt;
                    &lt;th&gt;Title&lt;/th&gt;
                    &lt;th&gt;First name&lt;/th&gt;
                    &lt;th&gt;Last name&lt;/th&gt;
                    &lt;th&gt;City&lt;/th&gt;
                    &lt;th&gt;State&lt;/th&gt;
                    &lt;th&gt;Postcode&lt;/th&gt;
                    &lt;th&gt;Email&lt;/th&gt;
                    &lt;th&gt;Gender&lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            &lt;tbody&gt;

                &lt;c:forEach var="per" items="${people}"&gt;
                    &lt;tr&gt;
                        &lt;td&gt;&lt;c:out value="${per.name.title}"/&gt;&lt;/td&gt;
                        &lt;td&gt;&lt;c:out value="${per.name.first}"/&gt;&lt;/td&gt;
                        &lt;td&gt;&lt;c:out value="${per.name.last}"/&gt;&lt;/td&gt;
                        &lt;td&gt;&lt;c:out value="${per.location.city}"/&gt;&lt;/td&gt;
                        &lt;td&gt;&lt;c:out value="${per.location.state}"/&gt;&lt;/td&gt;
                        &lt;td&gt;&lt;c:out value="${per.location.postcode}"/&gt;&lt;/td&gt;
                        &lt;td&gt;&lt;c:out value="${per.email}"/&gt;&lt;/td&gt;
                        &lt;td&gt;&lt;c:out value="${per.gender}"/&gt;&lt;/td&gt;
                    &lt;/tr&gt;
                &lt;/c:forEach&gt;
            &lt;/tbody&gt;
        &lt;/table&gt;
    &lt;/body&gt;    
&lt;/html&gt;

The show.jsp page displays data in a HTML table using
c:forEach and c:out tags from the JSTL library.

$ mvn jetty:run 

We start the application and locate to localhost:8080.

In this article we created a RESTEasy client request to a web service
that generates randomly users. The request was sent from a Java servlet.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java Servlet tutorials](/all/#servlets).