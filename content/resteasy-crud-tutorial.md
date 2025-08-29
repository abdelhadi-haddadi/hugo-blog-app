+++
title = "RESTEasy CRUD tutorial"
date = 2025-08-29T20:01:58.098+01:00
draft = false
description = "RESTEasy CRUD tutorial shows how to create a JAX-RS CRUD example with RESTEasy."
image = ""
imageBig = ""
categories = ["jaxrs"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# RESTEasy CRUD tutorial

last modified January 10, 2023

RESTEasy CRUD tutorial shows how to create a JAX-RS CRUD example with RESTEasy.

## RESTEasy

RESTEasy is a Java framework for developing RESTful Web Services. It
is a fully certified and portable implementation of the JAX-RS 2.0
specification. JAX-RS 2.0 specification is a JCP (Java Community Process)
specification that provides a Java API for RESTful Web Services over the HTTP
protocol.

RESTEasy can run in any Servlet container.

## JAX-RS HTTP annotations

JAX-RS has annotations for responding to HTTP requests.

- @GET - indicates that the annotated method responds to HTTP GET request

- @POST - indicates that the annotated method responds to HTTP POST request

- @DELETE - indicates that the annotated method responds to HTTP DELETE request

- @PUT - indicates that the annotated method responds to HTTP PUT request

## RESTEasy CRUD example

The following example is a simple RESTful CRUD application.
Create, Read, Update, and Delete (CRUD) are the four basic
functions of persistent storage.

The data is loaded at the start of the application in a web listener.
There are two scripts: the schema.sql creates the
table and the data.sql inserts data into the table.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    ├── main
    │&nbsp;&nbsp; ├── java
    │&nbsp;&nbsp; │&nbsp;&nbsp; └── com
    │&nbsp;&nbsp; │&nbsp;&nbsp;     └── zetcode
    │&nbsp;&nbsp; │&nbsp;&nbsp;         ├── conf
    │&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; ├── AppConfig.java
    │&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── MyAppInitializer.java
    │&nbsp;&nbsp; │&nbsp;&nbsp;         ├── dao
    │&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; ├── CityDao.java
    │&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── ICityDao.java
    │&nbsp;&nbsp; │&nbsp;&nbsp;         ├── model
    │&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── City.java
    │&nbsp;&nbsp; │&nbsp;&nbsp;         ├── resource
    │&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── MyResource.java
    │&nbsp;&nbsp; │&nbsp;&nbsp;         └── service
    │&nbsp;&nbsp; │&nbsp;&nbsp;             ├── CityService.java
    │&nbsp;&nbsp; │&nbsp;&nbsp;             └── ICityService.java
    │&nbsp;&nbsp; ├── resources
    │&nbsp;&nbsp; │&nbsp;&nbsp; └── sql
    │&nbsp;&nbsp; │&nbsp;&nbsp;     ├── data.sql
    │&nbsp;&nbsp; │&nbsp;&nbsp;     └── schema.sql
    │&nbsp;&nbsp; └── webapp
    │&nbsp;&nbsp;     ├── META-INF
    │&nbsp;&nbsp;     │&nbsp;&nbsp; └── context.xml
    │&nbsp;&nbsp;     └── WEB-INF
    │&nbsp;&nbsp;         └── beans.xml
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
&lt;Context path="/RestEasyCrud"/&gt;

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
defines the components of a JAX-RS application and supplies additional
meta-data.

@ApplicationPath("rest")

With the @ApplicationPath annotation, we set the path to RESTful
web services.

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

The database scripts are executed when the connection is created.

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

    public boolean save(City city);

    public City find(Long id);

    public boolean update(City city, Long id);

    public boolean delete(Long id);
}

ICityService contains the CRUD contract methods. We have
methods for finding cities, saving a city, updating a city, and deleting
a city.

CityService.java
  

package com.zetcode.service;

import com.zetcode.dao.ICityDao;
import com.zetcode.model.City;
import java.util.List;
import javax.inject.Inject;

public class CityService implements ICityService {

    @Inject
    private ICityDao cityDao;

    @Override
    public List&lt;City&gt; findAll() {

        return cityDao.findAll();
    }

    @Override
    public boolean save(City city) {

        return cityDao.save(city);
    }

    @Override
    public City find(Long id) {

        return cityDao.find(id);
    }

    @Override
    public boolean update(City city, Long id) {

        return cityDao.update(city, id);
    }

    @Override
    public boolean delete(Long id) {

        return cityDao.delete(id);
    }
}

CityService contains the implementation for the service
methods. It delegates the actual job to the CityDao.

ICityDao.java
  

package com.zetcode.dao;

import com.zetcode.model.City;
import java.util.List;

public interface ICityDao {

    public List&lt;City&gt; findAll();

    public boolean save(City city);

    public City find(Long id);

    public boolean update(City city, Long id);

    public boolean delete(Long id);
}

The ICityDao contains the contract methods.

CityDao.java
  

package com.zetcode.dao;

import com.zetcode.conf.AppConfig;
import com.zetcode.model.City;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class CityDao implements ICityDao {

    @Override
    public List&lt;City&gt; findAll() {

        SimpleDriverDataSource ds = new SimpleDriverDataSource();
        ds.setDriver(new org.h2.Driver());
        ds.setUrl("jdbc:h2:mem:testdb");

        List&lt;City&gt; cities = new ArrayList&lt;&gt;();

        String query = "SELECT * FROM cities;";

        try {
            JdbcTemplate jtm = new JdbcTemplate(ds);
            cities = jtm.query(query,
                    new BeanPropertyRowMapper(City.class));
        } catch (DataAccessException dae) {
            Logger lgr = Logger.getLogger(CityDao.class.getName());
            lgr.log(Level.SEVERE, dae.getMessage(), dae);
        }

        return cities;
    }

    @Override
    public boolean save(City city) {

        SimpleDriverDataSource ds = new SimpleDriverDataSource();
        ds.setDriver(new org.h2.Driver());
        ds.setUrl("jdbc:h2:mem:testdb");

        String sql = "INSERT INTO cities(name, population) VALUES (?, ?)";

        boolean ret = true;

        try {
            JdbcTemplate jtm = new JdbcTemplate(ds);
            jtm.update(sql, new Object[]{city.getName(),
                city.getPopulation()});

        } catch (DataAccessException dae) {
            Logger lgr = Logger.getLogger(CityDao.class.getName());
            lgr.log(Level.SEVERE, dae.getMessage(), dae);

            ret = false;
        }

        return ret;
    }

    @Override
    public City find(Long id) {

        SimpleDriverDataSource ds = new SimpleDriverDataSource();
        ds.setDriver(new org.h2.Driver());
        ds.setUrl("jdbc:h2:mem:testdb");

        String sql = "SELECT * FROM cities WHERE Id=?";

        City city = new City();

        try {
            JdbcTemplate jtm = new JdbcTemplate(ds);
            city = (City) jtm.queryForObject(sql, new Object[]{id},
                    new BeanPropertyRowMapper(City.class));
        } catch (DataAccessException dae) {
            Logger lgr = Logger.getLogger(CityDao.class.getName());
            lgr.log(Level.SEVERE, dae.getMessage(), dae);
        }

        return city;
    }

    @Override
    public boolean update(City city, Long id) {

        SimpleDriverDataSource ds = new SimpleDriverDataSource();
        ds.setDriver(new org.h2.Driver());
        ds.setUrl("jdbc:h2:mem:testdb");

        boolean ret = true;

        String sql = "UPDATE cities SET name=?, population=? WHERE Id=?";

        try {
            JdbcTemplate jtm = new JdbcTemplate(ds);
            int nOfRows = jtm.update(sql, new Object[]{city.getName(),
                city.getPopulation(), id});
            if (nOfRows != 1) {
                ret = false;
            }
        } catch (DataAccessException dae) {
            Logger lgr = Logger.getLogger(CityDao.class.getName());
            lgr.log(Level.SEVERE, dae.getMessage(), dae);
            ret = false;
        }

        return ret;
    }

    @Override
    public boolean delete(Long id) {

        SimpleDriverDataSource ds = new SimpleDriverDataSource();
        ds.setDriver(new org.h2.Driver());
        ds.setUrl("jdbc:h2:mem:testdb");

        boolean ret = true;

        String sql = "DELETE FROM cities WHERE Id=?";
        try {
            JdbcTemplate jtm = new JdbcTemplate(ds);
            int nOfRows = jtm.update(sql, new Object[]{id});
            if (nOfRows != 1) {
                ret = false;
            }
        } catch (DataAccessException dae) {
            Logger lgr = Logger.getLogger(CityDao.class.getName());
            lgr.log(Level.SEVERE, dae.getMessage(), dae);
            ret = false;
        }

        return ret;
    }
}

CityDao cointains the implementation of the ICityDao methods.

SimpleDriverDataSource ds = new SimpleDriverDataSource();
ds.setDriver(new org.h2.Driver());
ds.setUrl("jdbc:h2:mem:testdb");

SimpleDriverDataSource is used to build a data source
for the in-memory H2 database.

JdbcTemplate jtm = new JdbcTemplate(ds);
cities = jtm.query(query,
        new BeanPropertyRowMapper(City.class));

Spring's JdbcTemplate is used to execute queries and
other JDBC statements.

} catch (DataAccessException dae) {
    Logger lgr = Logger.getLogger(CityDao.class.getName());
    lgr.log(Level.SEVERE, dae.getMessage(), dae);
}

Spring's DataAccessException is thrown for all kinds of
JDBC exceptions

@Override
public boolean save(City city) {

The save method, as well as the update
and delete methods, return a boolean value indicating
whether the task completed OK. This is used for determining the
status code of the response.

MyResource.java
  

package com.zetcode.resource;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import java.util.List;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("cities")
public class MyResource {

    @Inject
    private ICityService cityService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCities() {

        List&lt;City&gt; cities = cityService.findAll();

        if (!cities.isEmpty()) {

            return Response.ok(cities).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @Path("/{id}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response findCity(@PathParam("id") Long id) {

        City city = cityService.find(id);

        if (city.getId() != null) {
            return Response.ok(city).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response saveCity(@FormParam("name") String name,
            @FormParam("population") int population) {

        City city = new City();
        city.setName(name);
        city.setPopulation(population);

        boolean r = cityService.save(city);

        if (r) {
            return Response.ok().status(Response.Status.CREATED).build();
        } else {
            return Response.notModified().build();
        }
    }

    @Path("/{id}")
    @PUT
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response updateCity(@FormParam("name") String name,
            @FormParam("population") int population,
            @PathParam("id") Long id) {

        City city = new City();
        city.setName(name);
        city.setPopulation(population);

        boolean r = cityService.update(city, id);

        if (r) {
            return Response.ok().status(Response.Status.NO_CONTENT).build();
        } else {
            return Response.notModified().build();
        }
    }

    @Path("/{id}")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteCity(@PathParam("id") Long id) {

        boolean r = cityService.delete(id);

        if (r) {
            return Response.ok().status(Response.Status.NO_CONTENT).build();
        } else {
            return Response.notModified().build();
        }
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
public Response getCities() {

The @GET annotation indicates that the annotated method
responds to HTTP GET requests. With the @Produces annotation,
we define that the method produces JSON.

List&lt;City&gt; cities = cityService.findAll();

if (!cities.isEmpty()) {

    return Response.ok(cities).build();
} else {
    return Response.status(Response.Status.NOT_FOUND).build();
}

We call the findAll service method and return
a list of all cities. On success, we return data with
Response.ok(cities).build If the service method does not
find any data, we return Response.Status.NOT_FOUND.

@Path("/{id}")
@GET
@Produces(MediaType.APPLICATION_JSON)
public Response findCity(@PathParam("id") Long id) {

For finding a particular city by its Id, we have a path parameter
with @Path("/{id}"). The id is retrieved with
@PathParam("id") annotation.

@POST
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
public Response saveCity(@FormParam("name") String name,
        @FormParam("population") int population) {

When creating a new resource, we use the @POST annotation.
With the @Consumes(MediaType.APPLICATION_FORM_URLENCODED) we
set that the saveCity receives enconded data from the body
of the request. The data from the body request is retrieved with
the @FormParam annotation.

return Response.ok().status(Response.Status.CREATED).build();

For a newly created resource, we send back Response.Status.CREATED.

@Path("/{id}")
@PUT
@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
public Response updateCity(@FormParam("name") String name,
        @FormParam("population") int population,
        @PathParam("id") Long id) {

To modify a resource, we use the @PUT annotation. The Id
of the resource is retrieved from the path, the modified data from
the body of the request.

@Path("/{id}")
@DELETE
@Produces(MediaType.APPLICATION_JSON)
public Response deleteCity(@PathParam("id") Long id) {

To delete a resource, we use the @DELETE annotation.

return Response.ok().status(Response.Status.NO_CONTENT).build();

The Response.Status.NO_CONTENT can be used for resource
updating and deletion.

$ curl localhost:8084/RestEasyCrud/rest/cities/ -i
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Type: application/json
Content-Length: 383
Date: Mon, 19 Feb 2018 12:19:24 GMT

[{"id":1,"name":"Bratislava","population":432000},
{"id":2,"name":"Budapest","population":1759000},
{"id":3,"name":"Prague","population":1280000},
{"id":4,"name":"Warsaw","population":1748000},
{"id":5,"name":"Los Angeles","population":3971000},
{"id":6,"name":"New York","population":8550000},
{"id":7,"name":"Edinburgh","population":464000},
{"id":8,"name":"Berlin","population":3671000}]

We get all the cities with a GET request.

$ curl -X POST -d name=Kiev -d population=2877000 localhost:8084/RestEasyCrud/rest/cities/ -i
HTTP/1.1 201 Created
Server: Apache-Coyote/1.1
Content-Length: 0
Date: Mon, 19 Feb 2018 12:21:25 GMT

We create a new city resource with a POST request.

$ curl -X DELETE localhost:8084/RestEasyCrud/rest/cities/1 -i
HTTP/1.1 204 No Content
Server: Apache-Coyote/1.1
Date: Mon, 19 Feb 2018 12:23:20 GMT

We delete a resource with a DELETE request.

$ curl localhost:8084/RestEasyCrud/rest/cities/ -i
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Type: application/json
Content-Length: 428
Date: Mon, 19 Feb 2018 12:24:42 GMT

We modify a resource with a PUT request.

In this tutorial, we have created a CRUD RESTFul application with
RESTEasy and H2 database. We used Spring's JdbcTemplate to connect to H2.
The application was deployed on Tomcat.