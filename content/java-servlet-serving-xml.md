+++
title = "Java Servlet serving XML"
date = 2025-08-27T23:20:49.331+01:00
draft = false
description = "Java servlet pagination tutorial shows how to
do pagination using Java servlets. Bootstrap is used for UI."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet serving XML

last modified July 13, 2020

Java Servlet serving XML shows how to serve XML data from a Java servlet. The data is stored
in MySQL table. The web application is deployed on Tomcat web server.

## XML

Extensible Markup Language (XML) is a popular human-readable
and machine-readable markup language. The design goals of XML emphasize simplicity, generality,
and usability across the Internet. It is a textual data format with strong
support via Unicode for different human languages.  Originally designed for large-scale electronic
publishing, XML is widely used in the exchange of a large variety of data among software components,
systems, and enterprices.

XML is an industry standard developed by World Wide Web Consortium (W3C). It is not
tied to any programming language or software vendor. XML is extensible, platform-independent,
and supports internationalization.

## JAXB

The Java Architecture for XML Binding (JAXB) provides an API and tools that
automate the mapping between XML documents and Java objects. JAXB allows to unmarshal XML
content into a Java representation, access and update the Java representation, and marshal
the Java representation of the XML content into XML content.

## Java Servlet

Servlet is a Java class which responds to a particular type of
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty.
Modern-day Java web development uses frameworks that are built on top of servlets.

## Java Servlet serving XML example

In the following web application, we load data from MySQL table and display it
as XML to the client. We use JAXB parser to transform Java classes to
XML.

cars_mysql.sql
  

-- SQL for the Cars table

CREATE TABLE Cars(Id BIGINT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(150),
    Price INTEGER);
INSERT INTO Cars(Name, Price) VALUES('Audi', 52642);
INSERT INTO Cars(Name, Price) VALUES('Mercedes', 57127);
INSERT INTO Cars(Name, Price) VALUES('Skoda', 9000);
INSERT INTO Cars(Name, Price) VALUES('Volvo', 29000);
INSERT INTO Cars(Name, Price) VALUES('Bentley', 350000);
INSERT INTO Cars(Name, Price) VALUES('Citroen', 21000);
INSERT INTO Cars(Name, Price) VALUES('Hummer', 41400);
INSERT INTO Cars(Name, Price) VALUES('Volkswagen', 21600);

This SQL script creates the Cars table in MySQL.

$ tree
.
├── nb-configuration.xml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── converter
    │   │           │   └── CarsXmlConverter.java
    │   │           ├── dao
    │   │           │   ├── CarsDAO.java
    │   │           │   └── ICarsDAO.java
    │   │           ├── model
    │   │           │   ├── Car.java
    │   │           │   └── CarList.java
    │   │           ├── service
    │   │           │   ├── CarsService.java
    │   │           │   └── ICarsService.java
    │   │           ├── util
    │   │           │   └── ServiceLocator.java
    │   │           └── web
    │   │               ├── GetCar.java
    │   │               └── GetCars.java
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
    &lt;artifactId&gt;JavaServletServeXml&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;JavaServletServeXml&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
            &lt;version&gt;5.0.2.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;5.1.45&lt;/version&gt;
        &lt;/dependency&gt;

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

This is the Maven POM file. The javax.servlet-api artifact is
for servlets. The spring-jdbc dependency is used for the JdbcTemplate library,
which simplifies database programming in Java. The mysql-connector-java
is a MySQL driver for Java language.
The maven-war-plugin is responsible for collecting all artifact dependencies,
classes and resources of the web application and packaging them into a web application archive (WAR).

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/JavaServletServeXml"&gt;

    &lt;Resource name="jdbc/testdb"
              auth="Container"
              type="javax.sql.DataSource"
              username="user12"
              password="s$cret"
              driverClassName="com.mysql.jdbc.Driver"
              url="jdbc:mysql://localhost:3306/testdb"
              maxActive="10"
              maxIdle="4"/&gt;

&lt;/Context&gt;

In the Tomcat context.xml file, we define the context path and
the MySQL datasource.

com/zetcode/Car.java
  

package com.zetcode.model;

import java.util.Objects;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "car")
@XmlType(propOrder = {"id", "name", "price"})
public class Car {

    private Long id;
    private String name;
    private int price;

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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.name);
        hash = 79 * hash + this.price;
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
        final Car other = (Car) obj;
        if (this.price != other.price) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        return Objects.equals(this.id, other.id);
    }
}

The Car bean holds one row from the
Cars database table.

@XmlRootElement(name = "car")
@XmlType(propOrder = {"id", "name", "price"})

With the @XmlRootElement annotation we set the name
of the element. The @XmlType is used to set the order
in which the element tags are generated.

com/zetcode/CarList.java
  

package com.zetcode.model;

import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(namespace = "com.zetcode")
@XmlAccessorType(XmlAccessType.FIELD)
public class CarList {

    @XmlElementWrapper(name = "cars")
    @XmlElement(name = "car")
    private List&lt;Car&gt; cars;

    public List&lt;Car&gt; getCars() {
        return cars;
    }

    public void setCars(List&lt;Car&gt; cars) {
        this.cars = cars;
    }
}

CarList is a helper class that contains JAXB mapping annotations to
create a wrapper around car tags in XML output.

@XmlElementWrapper(name = "cars")

The @XmlElementWrapper annotation creates a wrapper around the
elements in the list.

@XmlElement(name = "car")

The @XmlElement annotation sets the name of the elements that are wrapped.

com/zetcode/ServiceLocator.java
  

package com.zetcode.util;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

public class ServiceLocator {

    public static DataSource getDataSource(String jndiName) {

        Context ctx = null;
        DataSource ds = null;

        try {
            ctx = new InitialContext();
            ds = (DataSource) ctx.lookup(jndiName);
        } catch (NamingException ex) {
            Logger.getLogger(ServiceLocator.class.getName()).log(
                Level.SEVERE, null, ex);
        }

        return ds;
    }
}

ServiceLocator looks up the data source by its given JNDI name
and returns it to the caller.

com/zetcode/ICarsService.java
  

package com.zetcode.service;

import com.zetcode.model.Car;
import java.util.List;

public interface ICarsService {

    public Car findCarById(long id);
    public List&lt;Car&gt; findAllCars();
}

ICarsService contains two service contract methods:
findCarById and findAllCars.

com/zetcode/CarsService.java
  

package com.zetcode.service;

import com.zetcode.dao.CarsDAO;
import com.zetcode.model.Car;
import java.util.List;

public class CarsService implements ICarsService {

    private CarsDAO carsDao;

    public CarsService() {

        carsDao = createDao();
    }

    @Override
    public Car findCarById(long id) {

        Car car = carsDao.findById(id);
        return car;
    }

    @Override
    public List&lt;Car&gt; findAllCars() {

        List&lt;Car&gt; cars = carsDao.findAll();
        return cars;
    }

    private CarsDAO createDao() {

        carsDao = new CarsDAO();
        return carsDao;
    }
}

CarsService contains the implementations of the ICarsService
interface. The service class calls the methods of the DAO object, which is an intermediary
layer to the database.

com/zetcode/ICarsDAO.java
  

package com.zetcode.dao;

import com.zetcode.model.Car;
import java.util.List;

public interface ICarsDAO {

    public Car findById(long id);
    public List&lt;Car&gt; findAll();
}

Here we have the DAO contract methods.

com/zetcode/CarsDAO.java
  

package com.zetcode.dao;

import com.zetcode.model.Car;
import com.zetcode.util.ServiceLocator;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sql.DataSource;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class CarsDAO implements ICarsDAO {

    private JdbcTemplate jtm;

    public CarsDAO() {

        createJdbcTemplate();
    }

    @Override
    public Car findById(long id) {

        String sql = "SELECT * FROM Cars WHERE Id=?";

        Car car = new Car();

        try {
            car = (Car) jtm.queryForObject(sql, new Object[]{id},
                    new BeanPropertyRowMapper(Car.class));
        } catch (EmptyResultDataAccessException ex) {
            Logger.getLogger(CarsDAO.class.getName()).log(
                    Level.SEVERE, null, ex);
        }

        return car;
    }

    @Override
    public List&lt;Car&gt; findAll() {

        String sql = "SELECT * FROM Cars";

        List&lt;Car&gt; cars = new ArrayList&lt;&gt;();

        try {
            cars = jtm.query(sql,
                    new BeanPropertyRowMapper(Car.class));

        } catch (EmptyResultDataAccessException ex) {
            Logger.getLogger(CarsDAO.class.getName()).log(
                    Level.SEVERE, null, ex);
        }

        return cars;
    }

    private JdbcTemplate createJdbcTemplate() {

        DataSource ds = ServiceLocator.getDataSource("java:comp/env/jdbc/testdb");
        jtm = new JdbcTemplate(ds);
        return jtm;
    }
}

The CarsDAO contains the implementations of the DAO methods.
We use Spring's JdbcTemplate module to access the database.

private JdbcTemplate createJdbcTemplate() {

    DataSource ds = ServiceLocator.getDataSource("java:comp/env/jdbc/testdb");
    jtm = new JdbcTemplate(ds);
    return jtm;
}

In the createJdbcTemplate method, we look up the data source and
create a JdbcTemplate.

com/zetcode/CarsXmlConverter.java
  

package com.zetcode.converter;

import com.zetcode.model.Car;
import com.zetcode.model.CarList;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

public class CarsXmlConverter {

    private ByteArrayOutputStream bos;

    public ByteArrayOutputStream convertList(List&lt;Car&gt; cars) {

        bos = new ByteArrayOutputStream();

        try {
            JAXBContext context = JAXBContext.newInstance(CarList.class);
            Marshaller m = context.createMarshaller();
            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

            CarList carsList = new CarList();
            carsList.setCars(cars);

            m.marshal(carsList, bos);

        } catch (JAXBException ex) {
            Logger.getLogger(CarsXmlConverter.class.getName()).log(Level.SEVERE, null, ex);
        }

        return bos;
    }

    public ByteArrayOutputStream convertObject(Car car) {

        bos = new ByteArrayOutputStream();

        try {
            JAXBContext context = JAXBContext.newInstance(Car.class);
            Marshaller m = context.createMarshaller();
            m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            m.marshal(car, bos);

        } catch (JAXBException ex) {
            Logger.getLogger(CarsXmlConverter.class.getName()).log(Level.SEVERE, null, ex);
        }

        return bos;
    }
}

CarsXmlConverter contains methods to convert Java classes to XML data.

public ByteArrayOutputStream convertList(List&lt;Car&gt; cars) {

The methods return a ByteArrayOutputStream.

JAXBContext context = JAXBContext.newInstance(CarList.class);
Marshaller m = context.createMarshaller();
m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

A JAXB marshaller is created.

CarList carsList = new CarList();
carsList.setCars(cars);

m.marshal(carsList, bos);

We marshall the Java representation into ByteArrayOutputStream.

com/zetcode/GetCars.java
  

package com.zetcode.web;

import com.zetcode.converter.CarsXmlConverter;
import com.zetcode.model.Car;
import com.zetcode.service.CarsService;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "GetCars", urlPatterns = {"/GetCars"})
public class GetCars extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/xml;charset=UTF-8");

        CarsService carsService = new CarsService();
        List&lt;Car&gt; cars = carsService.findAllCars();

        CarsXmlConverter xmlConverter = new CarsXmlConverter();

        try (ByteArrayOutputStream bos = xmlConverter.convertList(cars)) {
            OutputStream os = response.getOutputStream();
            bos.writeTo(os);
        }
    }
}

The GetCars servlet returns all data from the Cars table
as XML data.

@WebServlet(name = "GetCars", urlPatterns = {"/GetCars"})

The Java class is decorated with the @WebServlet annotation. It is mapped
to the GetCars URL pattern.

response.setContentType("application/xml;charset=UTF-8");

The servlet will output data in XML and the encoding of the data is set to UTF-8.

CarsService carsService = new CarsService();
List&lt;Car&gt; cars = carsService.findAllCars();

With CarsService's findAllCars, we retrieve all
cars from the database.

CarsXmlConverter xmlConverter = new CarsXmlConverter();

try (ByteArrayOutputStream bos = xmlConverter.convertList(cars)) {
    OutputStream os = response.getOutputStream();
    bos.writeTo(os);
}

We convert the data into XML with CarsXmlConverter and write
the bytes into the ServletOutputStream.

com/zetcode/GetCar.java
  

package com.zetcode.web;

import com.zetcode.converter.CarsXmlConverter;
import com.zetcode.model.Car;
import com.zetcode.service.CarsService;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "GetCar", urlPatterns = {"/GetCar"})
public class GetCar extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        long id = Long.parseLong(request.getParameter("carId"));

        response.setContentType("application/xml;charset=UTF-8");

        CarsService carsService = new CarsService();
        Car car = carsService.findCarById(id);

        CarsXmlConverter xmlConverter = new CarsXmlConverter();

        try (ByteArrayOutputStream bos = xmlConverter.convertObject(car)) {
            OutputStream os = response.getOutputStream();
            bos.writeTo(os);
        }
    }
}

The GetCar servlet returns one car in XML format.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;a href="GetCars"&gt;Get cars&lt;/a&gt;
        &lt;br&gt;
        &lt;a href="GetCar?carId=5"&gt;Get car with id 5&lt;/a&gt;

    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains two links. One retrieves all cars and
the other one a car with Id 5.

In this tutorial we have created a Java web application which selects data from
a MySQL database, transforms it into XML, and returns the XML data back to the client.