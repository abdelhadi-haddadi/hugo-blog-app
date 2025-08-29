+++
title = "Web URL in a Jersey application"
date = 2025-08-27T23:21:01.657+01:00
draft = false
description = "In this tutorial we create a RESTful Java web application that inspects the incoming URL. The application uses Jersey."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Web URL in a Jersey application

last modified July 13, 2020 

In this tutorial we create a RESTful Java web application that inspects the 
incoming URL. The application uses Jersey.

A Uniform Resource Locator (URL), is a reference to a web resource that 
specifies its location on a computer network and a mechanism for retrieving it.
A web resource is any data that can be obtained via web, such as HTML documents, 
PDF files, PNG images, JSON data, or plain text.

A generic URL has the following form:

scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]

The square brackets indicate that the part is optional. A scheme is a way of 
addressing resources, such as http, ftp, mailto, or file. 

The part following
two slashes is called the authority part. The authority part contains 1) an optional 
authentication section of a user name and password, separated by a colon, followed by an at symbol (@)
2) a host, which is either a host name of or an IP address, 3) an optional port number, separated 
from the host by a colon. 

A path is a road to the resource on the host. It may or may not 
resemble or map exactly to a file system path. Query string is used to add some criteria to the 
request for the resource. It is often a sequence of key/value pairs. The final part is an 
optional fragment, which points to a secondary resource, such as a heading.
It is separated from the query string by a hash (#).

## RESTful application with Jersey

In the following RESTful application, we retrieve the parts of the URL and return
them to the client. We use Jersey, which is an open source framework for developing 
RESTful Web Services in Java. It is a reference implementation of the 
Java API for RESTful Web Services (JAX-RS) specification.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── app
    │   │           │   └── ApplicationConfig.java
    │   │           └── restex
    │   │               └── MyInfo.java
    │   ├── resources
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
    &lt;artifactId&gt;RestEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;RestEx&lt;/name&gt;

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
                &lt;version&gt;2.6&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;failOnMissingWebXml&gt;false&lt;/failOnMissingWebXml&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt; 
    &lt;/build&gt;
&lt;/project&gt;

This is the Maven POM file. It contains the necessary dependencies for Jersey.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/RestEx"/&gt;

In the Tomcat's context.xml configuration file, we define
the application context path.

com/zetcode/ApplicationConfig.java
  

package com.zetcode.app;

import com.zetcode.restex.MyInfo;
import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("rest")
public class ApplicationConfig extends Application {

    @Override
    public Set&lt;Class&lt;?&gt;&gt; getClasses() {
        Set&lt;Class&lt;?&gt;&gt; set = new HashSet&lt;&gt;();
        set.add(MyInfo.class);
        return set;
    }
}

This is the application configuration class. Since Servlet 3.0 it is possible to 
deploy application without the web.xml file—in Jersey, we create 
a configuration class that extends the abstract Application
and use the @ApplicationPath annotation. The Application
defines the components of a JAX-RS application and supplies additional meta-data. 
Here we register resource classes, providers, or properties the application needs.

@ApplicationPath("rest")

With the @ApplicationPath annotation, we set the path to REST web services.

@Override
public Set&lt;Class&lt;?&gt;&gt; getClasses() {
    Set&lt;Class&lt;?&gt;&gt; set = new HashSet&lt;&gt;();
    set.add(MyInfo.class);
    return set;
}

Inside the getClasses method, we add the resource classes. In our case,
we have one MyInfo class.

com/zetcode/MyInfo.java
  

package com.zetcode.restex;

import java.net.URI;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

@Path("mypath")
public class MyInfo {

    @Context
    private UriInfo info;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String getInfo() {
        
        URI uri = info.getRequestUri();
        
        int port = uri.getPort();
        String path = uri.getPath();
        String query = uri.getQuery();
        String host = uri.getHost();
        String scheme = uri.getScheme();
        
        String fmt = "Scheme: %s%nHost: %s%nPort: %s%nPath: %s%nQuery: %s%n";
        
        String out = String.format(fmt, scheme, host, port, 
                path, query);

        return out;
    }
}

This is the resource class.

@Path("mypath")
public class MyInfo {

The @Path annotation specifies the URL path to which 
the resource responds.

@Context
private UriInfo info;

With the @Context annotation, we inject the UrlInfo
object. It provides access to application and request URL information.

@GET
@Produces(MediaType.TEXT_PLAIN)

The @GET annotation indicates that the method responds to 
HTTP GET requests.
The @Produces annotation defines the media type(s) that 
the method of a resource class can produce. In our case, the getInfo
method returns plain text.

URI uri = info.getRequestUri();

We get the URI with the getRequestUri method.

int port = uri.getPort();
String path = uri.getPath();
String query = uri.getQuery();
String host = uri.getHost();
String scheme = uri.getScheme();

We retrieve the port, path, query, host, and scheme parts of
the URL.

$ curl http://localhost:8084/RestEx/rest/mypath?name=Jan
Scheme: http
Host: localhost
Port: 8084
Path: /RestEx/rest/mypath
Query: name=Jan

With the curl tool, we test the application.

In this tutorial, we have looked more deeply at URL. We have created
a Java RESTful application with Jersey and identified parts of the incoming URL.