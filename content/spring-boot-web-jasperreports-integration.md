+++
title = "Spring Boot web JasperReports integration"
date = 2025-08-29T19:48:33.377+01:00
draft = false
description = "In this tutorial, we show how to use JasperReports with Spring Boot framework in a web application."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot web JasperReports integration

last modified July 13, 2020

In this tutorial, we show how to use JasperReports with Spring Boot framework. We create
a web application.

JasperReports is a Java open source reporting library. It can create reports in
various formats including PDF, HTML, XLS, or CSV. JasperReports creates page-oriented,
ready-to-print documents in a simple and flexible manner.

JdbcTemplate is a Spring library that helps programmers create
applications that work with relational databases and JDBC. It takes care of many
tedious and error-prone low-level details such as handling transactions,
cleaning up resources, and correctly handling exceptions.
JdbcTemplate is shipped in Spring's spring-jdbc module.

Spring is a Java application framework for developing Java
enterprise applications. It also helps integrate various enterprise components.
Spring Boot makes it easy to create Spring-powered, production-grade applications
and services with minimum setup requirements.

Apache Derby is an open source relational database implemented entirely in Java.
It has small footprint and is easy to deploy and install. It can be run in
embedded and client/server modes.

## The CARS table

We use the following table:

cars.sql
  

-- SQL for the CARS table

CREATE TABLE CARS(ID BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    (START WITH 1, INCREMENT BY 1), NAME VARCHAR(30), PRICE INT);
INSERT INTO CARS(Name, Price) VALUES('Audi', 52642);
INSERT INTO CARS(Name, Price) VALUES('Mercedes', 57127);
INSERT INTO CARS(Name, Price) VALUES('Skoda', 9000);
INSERT INTO CARS(Name, Price) VALUES('Volvo', 29000);
INSERT INTO CARS(Name, Price) VALUES('Bentley', 350000);
INSERT INTO CARS(Name, Price) VALUES('Citroen', 21000);
INSERT INTO CARS(Name, Price) VALUES('Hummer', 41400);
INSERT INTO CARS(Name, Price) VALUES('Volkswagen', 21600);

The cars.sql file creates the CARS table.

$ $DERBY_HOME/bin/ij
ij version 10.11
ij&gt; CONNECT 'jdbc:derby:testdb';
ij&gt; RUN 'cars.sql';

One option is to use the ij tool to create the table from the SQL script.
Refer to [Apache Derby tutorial](/db/apachederbytutorial/) to familiarize yourself
with Derby.

$ $DERBY_HOME/bin/NetworkServerControl start &amp;

Derby server is started with NetworkServerControl tool.

## Application

The following Spring Boot application loads data from a database table
and produces a PDF report from it with JasperReports library. The application
runs with embedded Tomcat server.

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── Application.java
    │   │           ├── bean
    │   │           │   └── Car.java
    │   │           ├── conf
    │   │           │   ├── AppConfig.java
    │   │           │   └── MvcConf.java
    │   │           ├── controller
    │   │           │   └── MyController.java
    │   │           └── service
    │   │               ├── CarService.java
    │   │               └── ICarService.java
    │   └── resources
    │       ├── application.yml
    │       ├── report2.jrxml
    │       └── static
    │           └── index.html
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
    &lt;artifactId&gt;JasperSpringBootWeb&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;1.5.2.RELEASE&lt;/version&gt;
    &lt;/parent&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.derby&lt;/groupId&gt;
            &lt;artifactId&gt;derbyclient&lt;/artifactId&gt;
            &lt;version&gt;10.13.1.1&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;net.sf.jasperreports&lt;/groupId&gt;
            &lt;artifactId&gt;jasperreports&lt;/artifactId&gt;
            &lt;version&gt;6.4.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-context-support&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-jdbc&lt;/artifactId&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

The Maven pom.xml file contains dependencies for JasperReports library,
Derby driver, and Spring Boot.

report2.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
   "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report2" pageWidth="595" pageHeight="842"
              columnWidth="555" leftMargin="20" rightMargin="20"
              topMargin="20" bottomMargin="20"&gt;

    &lt;field name="Id" class="java.lang.Long"&gt;
        &lt;fieldDescription&gt;&lt;![CDATA[id]]&gt;&lt;/fieldDescription&gt;
    &lt;/field&gt;

    &lt;field name="Name" class="java.lang.String"&gt;
        &lt;fieldDescription&gt;&lt;![CDATA[name]]&gt;&lt;/fieldDescription&gt;
    &lt;/field&gt;

    &lt;field name="Price" class="java.lang.Integer"&gt;
        &lt;fieldDescription&gt;&lt;![CDATA[price]]&gt;&lt;/fieldDescription&gt;
    &lt;/field&gt;

    &lt;detail&gt;
        &lt;band height="15"&gt;

            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="50" height="15" /&gt;

                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;

                &lt;textFieldExpression class="java.lang.Long"&gt;
                    &lt;![CDATA[$F{Id}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="150" y="0" width="100" height="15" /&gt;

                &lt;textElement textAlignment="Left" verticalAlignment="Middle"/&gt;

                &lt;textFieldExpression class="java.lang.String"&gt;
                    &lt;![CDATA[$F{Name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="200" y="0" width="100" height="15"/&gt;
                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;

                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[$F{Price}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. It is located in the src/main/resources directory.
The template contains only the detail band.  Inside a detail band, each element is repeated for
every record provided by the data source.

&lt;field name="Id" class="java.lang.Long"&gt;
    &lt;fieldDescription&gt;&lt;![CDATA[id]]&gt;&lt;/fieldDescription&gt;
&lt;/field&gt;

&lt;field name="Name" class="java.lang.String"&gt;
    &lt;fieldDescription&gt;&lt;![CDATA[name]]&gt;&lt;/fieldDescription&gt;
&lt;/field&gt;

&lt;field name="Price" class="java.lang.Integer"&gt;
    &lt;fieldDescription&gt;&lt;![CDATA[price]]&gt;&lt;/fieldDescription&gt;
&lt;/field&gt;

We have three fields in the report.  The fields are mapped to the elements of
the data source beans.

&lt;textField&gt;
    &lt;reportElement x="0" y="0" width="50" height="15" /&gt;

    &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;

    &lt;textFieldExpression class="java.lang.Long"&gt;
        &lt;![CDATA[$F{Id}]]&gt;
    &lt;/textFieldExpression&gt;
&lt;/textField&gt;

A text field is an element that is filled with dynamic data.
We place a value from a field inside the text field. We refer to the
variable with the $F{} syntax.

com/zetcode/Car.java
  

package com.zetcode.bean;

public class Car {

    private Long id;
    private String name;
    private int price;

    public Car() {}

    public Car(Long id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
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

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Car{" + "id=" + id + ", name=" + name + ", price=" + price + '}';
    }
}

This is Car bean class. It contains item ID, name, and price.

application.yml
  

datasource:
  url: jdbc:derby://localhost:1527/testdb
  username: app
  password: app
  driverClassName: org.apache.derby.jdbc.ClientDriver

The application.yml is the main Spring Boot configuration
file. It contains the Derby datasource.

com/zetcode/AppConfig.java
  

package com.zetcode.conf;

import javax.sql.DataSource;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class AppConfig {

    @Bean
    @Primary
    @ConfigurationProperties(prefix = "datasource")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }
}

The AppConfig is a Java configuration class. It creates
the data source bean from the configuration file.

com/zetcode/MyController.java
  

package com.zetcode.controller;

import com.zetcode.service.ICarService;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsPdfView;

@Controller
public class MyController {

    @Autowired
    private ApplicationContext appContext;

    @Autowired
    private ICarService carService;

    @RequestMapping(path = "/pdf", method = RequestMethod.GET)
    public ModelAndView report() {

        JasperReportsPdfView view = new JasperReportsPdfView();
        view.setUrl("classpath:report2.jrxml");
        view.setApplicationContext(appContext);

        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("datasource", carService.findAll());

        return new ModelAndView(view, params);
    }
}

In the MyController, we have two methods that react to two
requests.

@Autowired
private ICarService carService;

We inject CarService object into the attribute. The service
object is used to retrieve data from the database.

@RequestMapping(path = "/pdf", method = RequestMethod.GET)
public ModelAndView report() {

    JasperReportsPdfView view = new JasperReportsPdfView();
    view.setUrl("classpath:report2.jrxml");
    view.setApplicationContext(appContext);

    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    params.put("datasource", carService.getCars());

    return new ModelAndView(view, params);
}

In the report method, a report is generated and sent
back to the client. The JasperReportsPdfView is a Spring
class that generates a PDF report from the provided template and data.

com/zetcode/ICarService.java
  

package com.zetcode.service;

import com.zetcode.bean.Car;
import java.util.List;

public interface ICarService {

    public List&lt;Car&gt; findAll();
}

ICarService provides a contract method to
get all cars from the data source.

com/zetcode/CarService.java
  

package com.zetcode.service;

import com.zetcode.bean.Car;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class CarService implements ICarService {

    @Autowired
    private JdbcTemplate jtm;

    @Override
    public List&lt;Car&gt; findAll() {

        String sql = "SELECT * FROM Cars";

        List&lt;Car&gt; cars = jtm.query(sql, new BeanPropertyRowMapper(Car.class));

        return cars;
    }
}

CarService contains the implementation of
the findAll method. We retrieve all cars from
the CARS table with the help of the JdbcTemplate.

@Autowired
private JdbcTemplate jtm;

JdbcTemplate is injected.

String sql = "SELECT * FROM Cars";

This is SQL to be executed. We select all cars from the CARS table.

List&lt;Car&gt; cars = jtm.query(sql, new BeanPropertyRowMapper(Car.class));

BeanPropertyRowMapper converts a row into a new instance of the
specified mapped target class.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;Home Page&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="/pdf.html"&gt;Generate report&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.html file contains a link to generate the PDF report.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }
}

The Application sets up the Spring Boot application.

In this tutorial, we have created a PDF report with JasperReports. The
application used Spring Boot framework and was run in a web environment.