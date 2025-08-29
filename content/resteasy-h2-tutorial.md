+++
title = "RESTEasy H2 tutorial"
date = 2025-08-29T20:01:58.070+01:00
draft = false
description = "RESTEasy H2 tutorial shows how to use H2 database in a RESTful web application created with RESTEasy."
image = ""
imageBig = ""
categories = ["jaxrs"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# RESTEasy H2 tutorial

last modified January 10, 2023

RESTEasy H2 tutorial shows how to use H2 database in a RESTful web application
created with RESTEasy.

## RESTEasy

RESTEasy is a Java framework for developing RESTful Web Services. It
is a fully certified and portable implementation of the JAX-RS 2.0
specification. JAX-RS 2.0 specification is a JCP (Java Community Process)
specification that provides a Java API for RESTful Web Services over the HTTP
protocol.

RESTEasy can run in any Servlet container. It contains a rich set of providers,
such as XML, JSON, YAML, Fastinfoset, Multipart, XOP, and Atom.

## H2

H2 is a relational database management system written in Java. It can be
embedded in Java applications or run in the client-server mode. It can be used
also in a memory mode.

## RESTEasy H2 example

The following example is a simple RESTful application, which returns the version
of the H2 database. To connect to a database and execute a query, we use Spring's
JdbcTemplate, which is a Java library on top of plain JDBC.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── conf
    │   │           │   └── AppResConfig.java
    │   │           ├── resource
    │   │           │   └── MyResource.java
    │   │           └── service
    │   │               └── VersionService.java
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
    &lt;artifactId&gt;RestEasyH2&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;RestEasyH2&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-jaxrs&lt;/artifactId&gt;
            &lt;version&gt;3.1.4.Final&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-servlet-initializer&lt;/artifactId&gt;
            &lt;version&gt;3.1.4.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
            &lt;version&gt;5.0.3.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.h2database&lt;/groupId&gt;
            &lt;artifactId&gt;h2&lt;/artifactId&gt;
            &lt;version&gt;1.4.196&lt;/version&gt;
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

This is the Maven POM file. It contains dependencies for RESTEasy, H2, and Spring JdbcTemplate.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/RestEasyH2"/&gt;

In the Tomcat's context.xml configuration file, we define
the application context path.

AppConfig.java
  

package com.zetcode.conf;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("rest")
public class AppConfig extends Application {

}

This is the application configuration class. The Application
defines the components of a JAX-RS application and supplies additional meta-data.

@ApplicationPath("rest")

With the @ApplicationPath annotation, we set the path to RESTful
web services.

VersionService.java
  

package com.zetcode.service;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class VersionService {

    public static String getVersion() {

        SimpleDriverDataSource ds = new SimpleDriverDataSource();
        ds.setDriver(new org.h2.Driver());
        ds.setUrl("jdbc:h2:mem:");

        String sql = "SELECT H2VERSION()";

        JdbcTemplate jtm = new JdbcTemplate(ds);
        String version = jtm.queryForObject(sql, String.class);

        return version;
    }
}

VersionService connects to the H2 database created in memory and
returns its version.

SimpleDriverDataSource ds = new SimpleDriverDataSource();
ds.setDriver(new org.h2.Driver());
ds.setUrl("jdbc:h2:mem:");

We create a simple data source. With jdbc:h2:mem: URL string, we create
an in-memory private database for one connection only. The database is closed when
the connection to the database is closed.

String sql = "SELECT H2VERSION()";

This SQL statement returns the version of H2.

JdbcTemplate jtm = new JdbcTemplate(ds);
String version = jtm.queryForObject(sql, String.class);

We use Spring JdbcTemplate to execute the sql query.

MyResource.java
  

package com.zetcode.resource;

import com.zetcode.service.VersionService;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("version")
public class MyResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String message() {

        String h2Version = VersionService.getVersion();

        String message = String.format("H2 version: %s", h2Version);
        return message;
    }
}

This is the MyResource class.

@Path("version")
public class MyResource {

With the @Path annotation, we specify the URL to which
the resource responds.

@GET
@Produces(MediaType.TEXT_PLAIN)
public String message() {

    String h2Version = VersionService.getVersion();

    String message = String.format("H2 version on Tomcat 9: %s", h2Version);
    return message;
}

The @GET annotation indicates that the annotated method responds to
HTTP GET requests. With the @Produces annotation, we define that
the method produces plain text. We call a service method and return a message
string.

$ curl localhost:8080/RestEasyH2/rest/version
H2 version: 1.4.196

After the application is deployed on Tomcat, we send a GET request to the
application with curl. We get the version of H2 database.

In this tutorial, we have created a simple RESTFul application with RESTEasy and
H2 database. We used Spring's JdbcTemplate to connect to H2. The application was
deployed on Tomcat.