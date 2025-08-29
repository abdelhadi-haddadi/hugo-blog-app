+++
title = "Jersey application with embedded Jetty"
date = 2025-08-29T19:48:40.843+01:00
draft = false
description = "In this tutorial, we create a simple Java REST application with Jersey and embedded Jetty. We show how to create an uber JAR."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Jersey application with embedded Jetty

last modified July 13, 2020 

In this tutorial, we create a simple Java REST application with
Jersey and embedded Jetty. We also show how to pack the application into an 
executable uber JAR.

Jersey is an open source framework for developing RESTful Web Services in Java. It is a reference implementation 
of the Java API for RESTful Web Services (JAX-RS) specification.

Jetty is a Java HTTP (Web) server and Java Servlet container. It can be easily embedded 
in devices, tools, frameworks, application servers, and clusters.

## RESTFul application

A RESTFul application creates a system (API) that follows the REST architectural style, 
which is used for designing networked applications. RESTful applications use HTTP requests 
perform CRUD (Create/Read/Update/Delete) operations on resources.

## Code example

The following is a very simple Java RESTful application created with Jersey 
and embedded Jetty server.

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── app
    │   │           │   └── Main.java
    │   │           └── res
    │   │               └── MyMessage.java
    │   └── resources
    └── test
        └── java

This is our project structure.

The project consists of two Java source files and the Maven POM file.

pom.xml
  

&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/maven-v4_0_0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JerseyJettyEx&lt;/artifactId&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;name&gt;JerseyJettyEx&lt;/name&gt;
    
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;        
    &lt;/properties&gt;    

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.containers&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-container-jetty-http&lt;/artifactId&gt;
            &lt;version&gt;2.25&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
            &lt;artifactId&gt;jetty-util&lt;/artifactId&gt;
            &lt;version&gt;9.4.0.v20161208&lt;/version&gt;
        &lt;/dependency&gt;        
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.core&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-server&lt;/artifactId&gt;
            &lt;version&gt;2.25&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.jersey.containers&lt;/groupId&gt;
            &lt;artifactId&gt;jersey-container-servlet-core&lt;/artifactId&gt;
            &lt;version&gt;2.25&lt;/version&gt;
        &lt;/dependency&gt;        
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
            &lt;artifactId&gt;jetty-servlet&lt;/artifactId&gt;
            &lt;version&gt;9.4.0.v20161208&lt;/version&gt;
        &lt;/dependency&gt;        
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
            &lt;artifactId&gt;jetty-server&lt;/artifactId&gt;
            &lt;version&gt;9.4.0.v20161208&lt;/version&gt;
        &lt;/dependency&gt;        
        
    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;finalName&gt;JerseyJettyEx&lt;/finalName&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
                &lt;artifactId&gt;exec-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;1.5.0&lt;/version&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;java&lt;/goal&gt;
                        &lt;/goals&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
                &lt;configuration&gt;
                    &lt;mainClass&gt;com.zetcode.app.Main&lt;/mainClass&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;
    
&lt;/project&gt;

In the pom.xml file, we have necessary Jersey and Jetty dependencies.
We also use the exec-maven-plugin, which is used for executing Java
programs.

MyMessage
  

package com.zetcode.res;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("msg")
public class MyMessage {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getMessage() {
        
        return "My message\n";
    }
}

We define a resource. It responds to a HTTP GET request and returns plain text.

@Path("msg")
public class MyMessage {

The @Path annotation identifies the URL path to which 
the resource responds.

com/zetcode/Main.java
  

package com.zetcode.app;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.glassfish.jersey.servlet.ServletContainer;

public class Main {

    public static void main(String[] args) {

        Server server = new Server(8080);

        ServletContextHandler ctx = 
                new ServletContextHandler(ServletContextHandler.NO_SESSIONS);
                
        ctx.setContextPath("/");
        server.setHandler(ctx);

        ServletHolder serHol = ctx.addServlet(ServletContainer.class, "/rest/*");
        serHol.setInitOrder(1);
        serHol.setInitParameter("jersey.config.server.provider.packages", 
                "com.zetcode.res");

        try {
            server.start();
            server.join();
        } catch (Exception ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        } finally {

            server.destroy();
        }
    }
}

In Main.java, we set up and start Jetty.

Server server = new Server(8080);

Jetty server is started listening on 8080 port.

ServletContextHandler ctx = 
        new ServletContextHandler(ServletContextHandler.NO_SESSIONS);

The next step is to create a ServletContextHandler object.

ctx.setContextPath("/");

With the setContextPath method we set the path to which 
the application is mapped.

ServletHolder serHol = ctx.addServlet(ServletContainer.class, "/rest/*");

We add the Jersey ServletContainer to the Jetty servlet holder.
This essentially joins Jersey with Jetty.

serHol.setInitParameter("jersey.config.server.provider.packages", 
        "com.zetcode.res");

Here we tell Jersey where to look for resources.

## Building and running application

In the following steps, we build and run the application.

$ mvn package

We build the application with mvn package command.

$ mvn exec:java

The application is started with mvn exec:java command.

$ curl localhost:8080/rest/msg
My message

We use curl tool to issue a HTTP GET request to our resource.

## Uber JAR

Uber JAR is a JAR that contains both our package and all its
dependencies in one single JAR file. Such JAR is also called a fat JAR.

maven-shade-plugin
  

&lt;plugin&gt;
    &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
    &lt;artifactId&gt;maven-shade-plugin&lt;/artifactId&gt;
    &lt;version&gt;2.4.3&lt;/version&gt;
    &lt;configuration&gt;
        &lt;createDependencyReducedPom&gt;true&lt;/createDependencyReducedPom&gt;
        &lt;filters&gt;
            &lt;filter&gt;
                &lt;artifact&gt;*:*&lt;/artifact&gt;
                &lt;excludes&gt;
                    &lt;exclude&gt;META-INF/*.SF&lt;/exclude&gt;
                    &lt;exclude&gt;META-INF/*.DSA&lt;/exclude&gt;
                    &lt;exclude&gt;META-INF/*.RSA&lt;/exclude&gt;
                &lt;/excludes&gt;
            &lt;/filter&gt;
        &lt;/filters&gt;
    &lt;/configuration&gt;

    &lt;executions&gt;
        &lt;execution&gt;
            &lt;phase&gt;package&lt;/phase&gt;
            &lt;goals&gt;
                &lt;goal&gt;shade&lt;/goal&gt;
            &lt;/goals&gt;
            &lt;configuration&gt;
                &lt;transformers&gt;
                    &lt;transformer
                        implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer" /&gt;
                    &lt;transformer
                        implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer"&gt;
                        &lt;manifestEntries&gt;
                            &lt;Main-Class&gt;com.zetcode.app.Main&lt;/Main-Class&gt;
                        &lt;/manifestEntries&gt;
                    &lt;/transformer&gt;
                &lt;/transformers&gt;
            &lt;/configuration&gt;
        &lt;/execution&gt;
    &lt;/executions&gt;
&lt;/plugin&gt;

With the maven-shade-plugin we can create one executable JAR containing all
dependencies. 

&lt;transformer
   implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer"&gt;
   &lt;manifestEntries&gt;
       &lt;Main-Class&gt;com.zetcode.app.Main&lt;/Main-Class&gt;
   &lt;/manifestEntries&gt;
&lt;/transformer&gt;

In order to make the JAR executable, it must have a main class in the manifest. This is
achieved with the ManifestResourceTransformer.

$ mvn clean package

We clean and build the application.

$ java -jar target/JerseyJettyEx-1.0-SNAPSHOT.jar

We use this command to start the application.

In this tutorial, we have created a simple Java REST application with
Jersey and embedded Jetty. We have shown how to create an uber JAR.