+++
title = "Java ServletConfig"
date = 2025-08-27T23:20:48.172+01:00
draft = false
description = "Java ServletConfig tutorial shows how to pass initialization data to a servlet with ServletConfig."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java ServletConfig

last modified July 13, 2020 

Java ServletConfig tutorial shows how to pass initialization data to a servlet with ServletConfig.

ServletConfig is a servlet configuration object used by a 
servlet container to pass information to a servlet during initialization.
Servlet container creates a ServletConfig for each servlet in 
a web application.

## Java Servlet

Servlet is a Java class which responds to a particular type of 
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty. 
Modern-day Java web development uses frameworks that are built on top of servlets.

## Pure.css

Pure.css is a set of small, responsive CSS modules 
that can be used in every web project. The library is created by Yahoo.

## Java ServletConfig example

In the following web application, we have a simple web form. We sent a name parameter
to the servlet. If the parameter is empty, we read an initialization parameter through 
ServletConfig. In the example, we also use Yahoo's *Pure.css* library.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           └── web
    │   │               └── MyServlet.java
    │   └── webapp
    │       ├── index.html
    │       ├── META-INF
    │       │   └── context.xml
    │       └── WEB-INF
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
    &lt;artifactId&gt;JavaServletConfigEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;JavaServletConfigEx&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;3.1.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
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

This is the Maven pom.xml file. The javax.servlet-api artifact is
used for Java servlets. The maven-war-plugin is responsible for collecting all 
artifact dependencies, classes and resources of the web application and packaging them 
into a web application archive (WAR).

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/JavaServletConfigEx"/&gt;

In the Tomcat context.xml file, we define the context path. It
is the name of the web application.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
        &lt;link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;form class="pure-form" action="MyServlet"&gt;
            &lt;fieldset&gt;
                &lt;legend&gt;Enter your name&lt;/legend&gt;

                &lt;input type="text" name="name"&gt;
                &lt;button type="submit" class="pure-button pure-button-primary"&gt;Submit&lt;/button&gt;
            &lt;/fieldset&gt;
        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains an HTML form. Upon submitting the form,
the processing is sent to the MyServlet.

&lt;link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css"&gt;

We include the Pure.css library.

&lt;form class="pure-form" action="MyServlet"&gt;

The form tag uses the pure-form class from the Pure.css
library. The action attribute points to the MyServlet.

&lt;input type="text" name="name"&gt;

The name value entered by the user will be sent to the servlet as a name parameter.

&lt;button type="submit" class="pure-button pure-button-primary"&gt;Submit&lt;/button&gt;

The Submit button uses pure-button and pure-button-primary classes.

com/zetcode/MyServlet.java
  

package com.zetcode.web;

import java.io.IOException;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"}, initParams = {
    @WebInitParam(name = "name", value = "Guest")})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/plain;charset=UTF-8");

        String name = request.getParameter("name");
        name = name.trim();
        
        if (name.isEmpty()) {

            ServletConfig sc = getServletConfig();

            name = sc.getInitParameter("name");
        }

        ServletOutputStream os = response.getOutputStream();
        os.println("Hello " + name);
    }
}

The MyServlet reads the name attribute from the request and
generates output. The output is plain text.

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"}, initParams = {
    @WebInitParam(name = "name", value = "Guest")})

With @WebInitParam, we initialize a name parameter
to the "Guest" value.

String name = request.getParameter("name");
name = name.trim();

We read the name parameter from the request object and trim spaces.

if (name.isEmpty()) {

    ServletConfig sc = getServletConfig();

    name = sc.getInitParameter("name");
}

If no value was entered by the user, we read the name 
initialization parameter using ServletConfig. ServletConfig 
is retrieved with getServletConfig. The parameter is retrieved with 
getInitParameter.

ServletOutputStream os = response.getOutputStream();
os.println("Hello " + name);

We write the text message to the ServletOutputStream.

In this tutorial, we have used ServletConfig to read an
initialization parameter in a Java servlet.