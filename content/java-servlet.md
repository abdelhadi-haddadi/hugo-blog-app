+++
title = "Java Servlet"
date = 2025-08-29T20:00:31.297+01:00
draft = false
description = "Java Servlet tutorial shows how to create a simple Java servlet. We use embedded Jetty server."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet

last modified January 27, 2024

 

Java Servlet tutorial shows how to create a simple servlet in Java. We use
embedded Jetty server.

## Java Servlet

Servlet is a Java class which responds to a network request. This is
mostly an HTTP request. Java servlets are used to create web applications. They
run in servlet containers such as Tomcat or Jetty. Modern-day Java web
development uses frameworks that are built on top of servlets. For instance,
Spring or Vaadin frameworks use servlets.

The javax.servlet and javax.servlet.http packages provide
interfaces and classes for writing servlets.

## Java Servlet example

In the following example, we use the @WebServlet annotation to
create a Java Servlet. Alternatively, the mapping can be created in the 
web.xml file.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               HelloServlet.java
│   ├───resources
│   └───webapp
│           index.html
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
            http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;org.example&lt;/groupId&gt;
    &lt;artifactId&gt;JavaServlet&lt;/artifactId&gt;
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

This is the Maven POM file. The jakarta.servlet-api provides the
Servlet API. The provided scope makes the dependency available at
compile time and indicates that it is already available at runtime. In is
included with the Servlet container such as Jetty.

The maven-war-plugin  is responsible for collecting all artifact
dependencies, classes and resources of the web application and packaging them
into a web application archive. The jetty-maven-plugin
allows us to run embedded Jetty server with mvn jetty:run.

&lt;configuration&gt;
    &lt;webApp&gt;
        &lt;contextPath&gt;/app&lt;/contextPath&gt;
    &lt;/webApp&gt;
&lt;/configuration&gt;

In the Jetty Maven plugin, we set the context path to /app.

com/zetcode/HelloServlet.java
  

package com.zetcode;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet(name = "HelloServlet", urlPatterns = {"/hello"})
public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("text/plain;charset=UTF-8");
        var out = response.getOutputStream();

        out.print("Hello there from Servlet");
    }
}

The HelloServlet returns a simple text message back to the client.

@WebServlet(name = "HelloServlet", urlPatterns = {"/hello"})

The Java class is decorated with the @WebServlet annotation. It is
mapped to the hello URL pattern.

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {

The doGet method is called for GET requests. The method receives
HttpServletRequest and HttpServletResponse objects.

response.setContentType("text/plain;charset=UTF-8");

The servlet sends output data in plain text and the encoding of the data is set
to UTF-8.

var out = response.getOutputStream();

With the getOutputStream method, we get the servlet output stream.
Note that we do not close the output stream; this is a task for the container.

out.print("Hello there from Servlet");

We write a text message with the print method.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    This is home page. Call &lt;a href="/app/hello"&gt;HelloServlet&lt;/a&gt;
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

In the home page, we have a link that calls the servlet.

$ mvn jetty:run

We run the embedded Jetty server and navigate the browser to
http://localhost:8080/app/.

## Source

[Jakarta Servlet documentation](https://jakarta.ee/specifications/servlet/)

In this article we have shown how to create a simple Java Servlet with embedded
Jetty server.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).