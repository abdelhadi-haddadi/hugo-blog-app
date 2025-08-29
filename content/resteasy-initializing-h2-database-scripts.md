+++
title = "RESTEasy initializing H2 database scripts"
date = 2025-08-29T20:01:59.219+01:00
draft = false
description = "RESTEasy initializing H2 database scripts tutorial shows how to initialize database scripts in a RESTful web application created with RESTEasy."
image = ""
imageBig = ""
categories = ["jaxrs"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# RESTEasy initializing H2 database scripts

last modified January 10, 2023 

RESTEasy initializing H2 database scripts tutorial shows how to initialize
database scripts in a RESTful web application created with RESTEasy.

## RESTEasy

RESTEasy is a Java framework for developing RESTful Web Services. 
It is a fully certified and portable implementation of the JAX-RS 2.0 specification.
JAX-RS 2.0 specification is a JCP (Java Community Process) specification that provides 
a Java API for RESTful Web Services over the HTTP protocol.

RESTEasy can run in any Servlet container. 

## Web listeners

Web listeners track key events in web applications. They allow efficient resource management 
and automated processing based on event status. Web listeners are declared in the web.xml
deployment descriptor or with the @WebListener annotation.

## RESTEasy initializing database scripts example

The following example is a simple RESTful application, which returns a list of 
cities as JSON data to the client. The data is loaded at the start of the application
in a web listener. There are two scripts: the schema.sql creates the 
table and the data.sql inserts data into the table.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    └── main
        ├── java
        │   └── com
        │       └── zetcode
        │           ├── conf
        │           │   ├── AppConfig.java
        │           │   └── MyAppInitializer.java
        │           ├── model
        │           │   └── City.java
        │           ├── resource
        │           │   └── MyResource.java
        │           └── service
        │               ├── CityService.java
        │               └── ICityService.java
        ├── resources
        │   └── sql
        │       ├── data.sql
        │       └── schema.sql
        └── webapp
            ├── META-INF
            │   └── context.xml
            └── WEB-INF
                └── beans.xml

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;RestEasyLoadScripts&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;RestEasyLoadScripts&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        
        &lt;!-- Set up RESTEasy--&gt;
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
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-jackson-provider&lt;/artifactId&gt;
            &lt;version&gt;3.1.4.Final&lt;/version&gt;
        &lt;/dependency&gt;          
                    
        &lt;!-- CDI for RESTEasy--&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.resteasy&lt;/groupId&gt;
            &lt;artifactId&gt;resteasy-cdi&lt;/artifactId&gt;
            &lt;version&gt;3.1.4.Final&lt;/version&gt;
        &lt;/dependency&gt;       
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.jboss.weld.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;weld-servlet-shaded&lt;/artifactId&gt;
            &lt;version&gt;3.0.2.Final&lt;/version&gt;
        &lt;/dependency&gt;                       
        
        &lt;!-- Spring JdbcTemplate --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
            &lt;version&gt;5.0.3.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;
            
        &lt;!-- H2 driver --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.h2database&lt;/groupId&gt;
            &lt;artifactId&gt;h2&lt;/artifactId&gt;
            &lt;version&gt;1.4.196&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;!-- Needed for @WebListener --&gt;
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

This is the Maven POM file. It contains dependencies for RESTEasy, CDI for RESTEasy, Jackson provider,
H2 driver, Spring JdbcTemplate, and Java Servlets (for web listeners).

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/RestEasyLoadScripts"/&gt;

In the Tomcat's context.xml configuration file, we define
the application context path.

beans.xml
  

&lt;?xml version="1.0"?&gt;
&lt;beans xmlns="http://xmlns.jcp.org/xml/ns/javaee"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
http://xmlns.jcp.org/xml/ns/javaee/beans_1_1.xsd"
       version="1.1" bean-discovery-mode="all"&gt;

&lt;/beans&gt;

Applications that use CDI must have a beans.xml file defined. It can
be empty, like in our case. For web applications, the beans.xml file 
must be in the WEB-INF directory. For EJB modules or JAR files, the 
beans.xml file must be in the META-INF directory.

schema.sql
  

CREATE TABLE cities(id INT PRIMARY KEY AUTO_INCREMENT, 
    name VARCHAR(100), population INT);

The schema.sql creates a database schema.

data.sql
  

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

The data.sql inserts data into the database table.

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

With the @ApplicationPath annotation, we set the path to RESTful web services.

MyAppInitializer.java
  

package com.zetcode.conf;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

@WebListener
public class MyAppInitializer implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {

        Logger lgr = Logger.getLogger(MyAppInitializer.class.getName());
        lgr.log(Level.INFO, "executing contextInitialized()");

        String url = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;" 
                + "INIT=RUNSCRIPT FROM 'classpath:/sql/schema.sql'"
                + "\\;RUNSCRIPT FROM 'classpath:/sql/data.sql'";

        SimpleDriverDataSource ds = new SimpleDriverDataSource();
        ds.setDriver(new org.h2.Driver());
        ds.setUrl(url);

        try (Connection con = ds.getConnection()) {

        } catch (SQLException ex) {
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
    }
}

The database scripts are initialized in a web listener. 

@WebListener
public class MyAppInitializer implements ServletContextListener {

The @WebListener annotation is used to declare a web listener.

@Override
public void contextInitialized(ServletContextEvent sce) {

The ServletContextListener's contextInitialized method is
called when the web application initialization starts.

String url = "jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;" 
        + "INIT=RUNSCRIPT FROM 'classpath:/sql/schema.sql'"
        + "\\;RUNSCRIPT FROM 'classpath:/sql/data.sql'";

In this connection string URL, we create an in-memory database called testdb.
The DB_CLOSE_DELAY keeps the content of an in-memory database as long as 
the virtual machine is alive. Otherwise, the database is deleted when the connection is
closed. The RUNSCRIPT command executes the database scripts. 

SimpleDriverDataSource ds = new SimpleDriverDataSource();
ds.setDriver(new org.h2.Driver());
ds.setUrl(url);

We set up a SimpleDriverDataSource. It is a simple data source that
does not support connection pooling. It creates a new connection for each call.

try (Connection con = ds.getConnection()) {

} catch (SQLException ex) {
    lgr.log(Level.SEVERE, ex.getMessage(), ex);
}

By creating a connection, the database scripts are executed. 

City.java
  

package com.zetcode.model;

import java.util.Objects;

public class City {

    private Long id;
    private String name;
    private int population;

    public City() {
    }

    public City(String name, int population) {
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
        hash = 71 * hash + Objects.hashCode(this.id);
        hash = 71 * hash + Objects.hashCode(this.name);
        hash = 71 * hash + this.population;
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
    
    @Override
    public String toString() {
        
        StringBuilder builder = new StringBuilder();
        builder.append("City{id=").append(id).append(", name=")
                .append(name).append(", population=")
                .append(population).append("}");
        
        return builder.toString();
    }
}

This is a City model class. It contains three attributes:
id, name, and population.

ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {
    
    public List&lt;City&gt; findAll();
}

ICityService contains the findAll contract method.

CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class CityService implements ICityService {

    @Override
    public List&lt;City&gt; findAll() {

        SimpleDriverDataSource ds = new SimpleDriverDataSource();
        ds.setDriver(new org.h2.Driver());
        ds.setUrl("jdbc:h2:mem:testdb");

        String query = "SELECT * FROM cities;";

        JdbcTemplate jtm = new JdbcTemplate(ds);
        List&lt;City&gt; cities = jtm.query(query, 
                new BeanPropertyRowMapper(City.class));

        return cities;
    }
}

CityService contains the implementation for the findAll
method. It retrieves all city objects from the testdb in-memory database.

MyResource.java
  

package com.zetcode.resource;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("cities")
public class MyResource {
    
    @Inject 
    private ICityService cityService;
    
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List&lt;City&gt; message() {
        
        List&lt;City&gt; cities = cityService.findAll();

        return cities;
    }
}

This is the MyResource class.

@Path("cities")
public class MyResource {

The @Path specifies the URL to which the resource responds.

@Inject 
private ICityService cityService;

With the @Inject annotation, we inject the city service object
into the cityService field.

@GET
@Produces(MediaType.APPLICATION_JSON)
public List&lt;City&gt; message() {
    
    List&lt;City&gt; cities = cityService.findAll();

    return cities;
}

The @GET annotation indicates that the annotated method 
responds to HTTP GET requests. With the @Produces annotation, 
we define that the method produces JSON. We call a service method and return
a list of cities. The message body writer converts the Java classes to JSON
and writes it to the response body.

$ curl localhost:8084/RestEasyLoadScripts/rest/cities
[{"id":1,"name":"Bratislava","population":432000},{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},{"id":8,"name":"Berlin","population":3671000}]

After the application is deployed on Tomcat, we send a GET request to the
application with curl. We get the data created in the database initialization
scripts.

In this tutorial, we have showed how to create database initialization scripts in 
a simple RESTFul application with RESTEasy and H2 database.
We used Spring's JdbcTemplate to connect to H2. The application was deployed on Tomcat.