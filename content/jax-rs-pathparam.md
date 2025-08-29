+++
title = "JAX-RS @PathParam"
date = 2025-08-29T20:02:00.326+01:00
draft = false
description = "JAX-RS @PathParam tutorial shows how use the @PathParam annotation in a RESTful Java web application with Jersey framework."
image = ""
imageBig = ""
categories = ["jersey"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JAX-RS @PathParam

last modified January 10, 2023 

JAX-RS @PathParam tutorial shows how use the @PathParam annotation in a 
RESTful Java web application with Jersey framework.

## Jersey

Jersey is a framework for developing RESTful Web Services in Java. 
It is a reference implementation of the Java API for RESTful Web Services 
(JAX-RS) specification. 

## JAX-RS @PathParam

The JAX-RS @PathParam annotation binds the value of a URI template parameter or a path segment
containing the template parameter to a resource method parameter, resource class field, or resource class
bean property.

## JAX-RS @PathParam example

The following example is a simple RESTful application, which returns a reversed 
word back to the clien in plain text.

├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── conf
    │   │           │   └── ApplicationConfig.java
    │   │           └── ws
    │   │               └── ReverseResource.java
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
    &lt;artifactId&gt;JerseyPathParam&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;JerseyPathParam&lt;/name&gt;

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

This is the Maven POM file. It contains the jersey-container-servlet and 
jersey-server dependencies.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/JerseyPathParam"/&gt;

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
        set.add(ReverseResource.class);
        return set;
    }
}

This is the application configuration class. Since Servlet 3.0 it is possible to 
deploy application without the web.xml file. In Jersey, we create 
a configuration class that extends the abstract Application
and use the @ApplicationPath annotation. The Application
defines the components of a JAX-RS application and supplies additional meta-data. 
Here we register resource classes, providers, or properties the application needs.

@ApplicationPath("rest")

With the @ApplicationPath annotation, we set the path to RESTful web services.

@Override
public Set&lt;Class&lt;?&gt;&gt; getClasses() {
    Set&lt;Class&lt;?&gt;&gt; set = new HashSet&lt;&gt;();
    set.add(ReverseResource.class);
    return set;
}

Inside the getClasses method, we add the resource classes. In our case,
we have one ReverseResource class.

ReverseResource.java
  

package com.zetcode.ws;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("reverse")
public class ReverseResource {
    
    @GET
    @Path("/{word}")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getMsg(@PathParam("word") String msg) {

        StringBuilder builder = new StringBuilder(msg);
        String output = builder.reverse().toString();

        return Response.status(200).entity(output).build();
    }    
}

This is the ReverseResource class.

@Path("reverse")
public class ReverseResource {

The @Path specifies the URL to which the resource responds.

@GET
@Path("/{word}")
@Produces(MediaType.TEXT_PLAIN)
public Response getMsg(@PathParam("word") String msg) {

The @PathParam("word") binds the value from the path segment to 
the msg method parameter.

StringBuilder builder = new StringBuilder(msg);
String output = builder.reverse().toString();

return Response.status(200).entity(output).build();

We reverse the received value and send it back to the client as plain text.

$ curl http://localhost:8084/JerseyPathParam/rest/reverse/summer
remmus

After the application is deployed to Tomcat, we send a GET request to the
application with curl. The summer world is read from the path segment 
by the @PathParam annotation.

In this tutorial, we have used the JAX-RS @PathParam annotation.