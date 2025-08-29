+++
title = "Java HttpServletMapping"
date = 2025-08-29T19:59:04.503+01:00
draft = false
description = "Java HttpServletMapping tutorial shows how to use HttpServletMapping to discover URL mappings at runtime."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java HttpServletMapping

last modified January 27, 2024

 

In this article we show how to use HttpServletMapping to discover URL mappings
at runtime.

## HttpServletMapping

HttpServletMapping is the new Servlet 4.0 API which can be used for
the runtime discovery of URL mappings.

The servlet mapping is obtained from an HttpServletRequest instance,
which has four methods:

- getMappingMatch — returns the type of the match

- getPattern — returns the URL pattern that activated the servlet request

- getMatchValue — returns the String that was matched

- getServletName — returns the fully qualified name of the servlet class that was activated with the request

## Java HttpServletMapping example

In the following example, we use HttpServletMapping to find out information
about URL mappings. The example is run on Tomcat. Note that we have to choose a recent Tomcat
version which has JARs with Servlet 4.0 API.

├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           └── MyServlet.java
    │   ├── resources
    │   └── webapp
    │       ├── index.html
    │       └── WEB-INF
    └── test
        └── java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;HttpServletMappingEx&lt;/artifactId&gt;
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

This is the pom.xml file.

com/zetcode/MyServlet.java
  

package com.zetcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletMapping;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MyServlet", urlPatterns = {"/getMessage"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/plain;charset=UTF-8");

        HttpServletMapping mapping = request.getHttpServletMapping();
        String mapName = mapping.getMappingMatch().name();
        String value = mapping.getMatchValue();
        String pattern = mapping.getPattern();
        String servletName = mapping.getServletName();

        StringBuilder builder = new StringBuilder();
        builder.append("Mapping type: ").append(mapName)
                .append("; Match value: ").append(value)
                .append("; Pattern: ").append(pattern)
                .append("; Servlet name: ").append(servletName);

        ServletOutputStream out = response.getOutputStream();
        out.println(builder.toString());
    }
}

We get the mapping info and send it to the client as text data.

@WebServlet(name = "MyServlet", urlPatterns = {"/getMessage"})

We set the URL patter to which the servlet is bound declaratively with @WebServlet.

HttpServletMapping mapping = request.getHttpServletMapping();
String mapName = mapping.getMappingMatch().name();
String value = mapping.getMatchValue();
String pattern = mapping.getPattern();
String servletName = mapping.getServletName();

From the request object, we get the servlet mapping with getHttpServletMapping.
We call all four methods.

StringBuilder builder = new StringBuilder();
builder.append("Mapping type: ").append(mapName)
        .append("; Match value: ").append(value)
        .append("; Pattern: ").append(pattern)
        .append("; Servlet name: ").append(servletName);

From the data we build one string.

ServletOutputStream out = response.getOutputStream();
out.println(builder.toString());

We send the string to the client.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="getMessage"&gt;Get message&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is a home page. It has a link that calls the servlet.

$ curl localhost:8080/app/getMessage
Mapping type: EXACT; Match value: getMessage; Pattern: /getMessage; Servlet name: MyServlet

We create a request with the curl tool.

In this article we have shown how to use the HttpServletMapping.

## Source

[Java HttpServletMapping - documentation](https://tomee.apache.org/jakartaee-9.0/javadoc/jakarta/servlet/http/HttpServletMapping.html)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).