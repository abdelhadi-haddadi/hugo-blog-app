+++
title = "JAX-RS @Context"
date = 2025-08-29T20:01:59.205+01:00
draft = false
description = "JAX-RS @Context tutorial shows how use the @Context annotation in a RESTful Java web application with Jersey framework."
image = ""
imageBig = ""
categories = ["jersey"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JAX-RS @Context

last modified January 10, 2023 

JAX-RS @Context tutorial shows how use the @Context annotation in a 
RESTful Java web application with Jersey framework.

## Jersey

Jersey is a framework for developing RESTful Web Services in Java. 
It is a reference implementation of the Java API for RESTful Web Services 
(JAX-RS) specification. Another popular JAX-RS implementation is JBoss' RESTEasy.

## JAX-RS @Context

The JAX-RS @Context annotation allows to inject context related information 
into a class field, bean property or method parameter.

## JAX-RS @Context example

The following example is a simple RESTful application, which returns some
context related data to the client as plain text.

├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── conf
    │   │           │   └── ApplicationConfig.java
    │   │           └── ws
    │   │               └── MyResource.java
    │   ├── resources
    │   └── webapp
    │       └── META-INF
    │           └── context.xml
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
    &lt;artifactId&gt;JerseyContext&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;JerseyContext&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.containers&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-container-servlet&lt;/artifactId&gt;
            &lt;version&gt;2.25&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.core&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-server&lt;/artifactId&gt;
            &lt;version&gt;2.25&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.0&lt;/version&gt;
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

This is the Maven POM file. It contains the jersey-container-servlet, 
jersey-server, and javax.servlet dependencies.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/JerseyContext"/&gt;

In the Tomcat's context.xml configuration file, we define
the application context path.

ApplicationConfig.java
  

package com.zetcode.conf;

import com.zetcode.ws.HelloResource;
import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("rest")
public class ApplicationConfig extends Application {

    @Override
    public Set&lt;Class&lt;?&gt;&gt; getClasses() {
        Set&lt;Class&lt;?&gt;&gt; set = new HashSet&lt;&gt;();
        set.add(MyResource.class);
        return set;
    }
}

This is the application configuration class. Since Servlet 3.0 it is possible to 
deploy application without the web.xml file.  The Application
defines the components of a JAX-RS application and supplies additional meta-data. 
Here we register resource classes, providers, or properties the application needs.

@ApplicationPath("rest")

With the @ApplicationPath annotation, we set the path to RESTful web services.

@Override
public Set&lt;Class&lt;?&gt;&gt; getClasses() {
    Set&lt;Class&lt;?&gt;&gt; set = new HashSet&lt;&gt;();
    set.add(MyResource.class);
    return set;
}

Inside the getClasses method, we add the resource classes. In our
case, we have one MyResource class.

MyResource.java
  

package com.zetcode.ws;

import javax.inject.Inject;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

@Path("myresource")
public class MyResource {
    
    @Context
    private UriInfo info;
    
    @Context
    private HttpServletRequest servletRequest;    
    
    @Context 
    private ServletContext servletContext;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response message() {

        StringBuilder builder = new StringBuilder();
        
        String baseUri = info.getBaseUri().toASCIIString();
        String method = servletRequest.getMethod();
        String serverInfo = servletContext.getServerInfo();
        
        builder.append("Base uri: ").append(baseUri)
                .append("; HTTP method: ").append(method)
                .append("; Server info: ").append(serverInfo);
        
        String output = builder.toString();
        
        return Response.status(200).entity(output).build();
    }
}

This is the MyResource class.

@Path("myresource")
public class MyResource {

The @Path specifies the URL to which the resource responds.

@Context
private UriInfo info;

@Context
private HttpServletRequest servletRequest;    

@Context 
private ServletContext servletContext;

Here we inject UriInfo, HttpServletRequest, 
and ServletContext into class fields with @Context.

@GET
@Produces(MediaType.TEXT_PLAIN)
public Response message() {

The @GET annotation indicates that the annotated method responds to
HTTP GET requests. With the @Produces annotation, we define that
the method produces plain text.

StringBuilder builder = new StringBuilder();

String baseUri = info.getBaseUri().toASCIIString();
String method = servletRequest.getMethod();
String serverInfo = servletContext.getServerInfo();

builder.append("Base uri: ").append(baseUri)
        .append("; HTTP method: ").append(method)
        .append("; Server info: ").append(serverInfo);

String output = builder.toString();

From the injected classes, we get the base URI, HTTP method, and server info.
We build an output from the gathered information.

return Response.status(200).entity(output).build();

We send a response containing the information to the client.

$ curl localhost:8084/JerseyContext/rest/myresource
Base uri: http://localhost:8084/JerseyContext/rest/; HTTP method: GET; 
Server info: Apache Tomcat/8.0.27

After the application is deployed on Tomcat, we send a GET request to the
application with curl. 

In this tutorial, we have used the JAX-RS @Context annotation.