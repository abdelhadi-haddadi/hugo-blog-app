+++
title = "Spring Boot iText"
date = 2025-08-27T23:20:54.527+01:00
draft = false
description = "In this tutorial, we show how to create
a PDF report with iText and Spring Boot. The data is retrieved from H2 database."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot iText

last modified July 13, 2020

In this tutorial, we show how to create a PDF report with iText and Spring Boot. The data
is loaded from a table in an H2 in-memory database.

iText is an open source library for creating and manipulating PDF files in Java.

Spring is a Java application framework for developing Java
enterprise applications. It also helps integrate various enterprise components.
Spring Boot makes it easy to create Spring-powered, production-grade applications
and services with minimum setup requirements.

H2 is an open source relational database management system implemented entirely in Java.
It can be embedded in Java applications or run in the client-server mode.
It has small footprint and is easy to deploy and install. It contains a browser based
console application for viewing and editing datatabase tables.

JdbcTemplate is a Spring library that helps programmers create
applications that work with relational databases and JDBC. It takes care of many
tedious and error-prone low-level details such as handling transactions,
cleaning up resources, and correctly handling exceptions.
JdbcTemplate is shipped in Spring's spring-jdbc module.

## Application

The following Spring Boot application loads data from a database table
and produces a PDF report from it with iText library. The application
runs with embedded Tomcat server.

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
    │   │           │   └── AppConfig.java
    │   │           ├── controller
    │   │           │   └── MyController.java
    │   │           ├── service
    │   │           │   ├── CarService.java
    │   │           │   └── ICarService.java
    │   │           └── view
    │   │               ├── AbstractPdfView.java
    │   │               └── MyPdfView.java
    │   └── resources
    │       ├── application.yml
    │       ├── data-h2.sql
    │       ├── schema-h2.sql
    │       └── static
    │           └── index.html
    └── test
        └── java

This is the project structure.

pom.xml
  

&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                             http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;

    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;SpringBootItext&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;1.5.3.RELEASE&lt;/version&gt;
    &lt;/parent&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.h2database&lt;/groupId&gt;
            &lt;artifactId&gt;h2&lt;/artifactId&gt;
            &lt;scope&gt;runtime&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-jdbc&lt;/artifactId&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.lowagie&lt;/groupId&gt;
            &lt;artifactId&gt;itext&lt;/artifactId&gt;
            &lt;version&gt;4.2.2&lt;/version&gt;
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

The Maven pom.xml file contains dependencies for iText library,
H2 driver, and Spring framework.

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
    url: jdbc:h2:mem:testdb;DB_CLOSE_ON_EXIT=FALSE
    username: sa
    password:
    driverClassName: org.h2.Driver

spring:
    datasource:
        platform: h2
    h2:
        console:
            enabled: true
            path: /console/

The application.yml is the main Spring Boot configuration
file. It contains the datasource and MVC settings. We have chosen H2 as
a database system. The database runs in memory.
We enable the browser based console application.

url: jdbc:h2:mem:testdb;DB_CLOSE_ON_EXIT=FALSE

The database name is testdb and it is created in memory.
(Spring Boot automatically creates an in-memory database when it spots
H2 on the Maven POM file but we show how to do it explicitly.)

spring:
    datasource:
        platform: h2

The platform value is used in SQL initialization scripts: schema-${platform}.sql
and data-${platform}.sql.

h2:
    console:
        enabled: true
        path: /console/

The H2 web console application is enabled; it is available at localhost:8080/console/
path.

schema-h2.sql
  

CREATE TABLE Cars(ID BIGINT PRIMARY KEY AUTO_INCREMENT, NAME VARCHAR(30), PRICE INT);

This SQL script creates the Cars table.

data-h2.sql
  

INSERT INTO Cars(Name, Price) VALUES('Audi', 52642);
INSERT INTO Cars(Name, Price) VALUES('Mercedes', 57127);
INSERT INTO Cars(Name, Price) VALUES('Skoda', 9000);
INSERT INTO Cars(Name, Price) VALUES('Volvo', 29000);
INSERT INTO Cars(Name, Price) VALUES('Bentley', 350000);
INSERT INTO Cars(Name, Price) VALUES('Citroen', 21000);
INSERT INTO Cars(Name, Price) VALUES('Hummer', 41400);
INSERT INTO Cars(Name, Price) VALUES('Volkswagen', 21600);

This script fills the table with data. Both scripts are located
in the root of the classpath.

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
the data source bean from the application.yml configuration file.

com/zetcode/AbstractPdfView.java
  

package com.zetcode.view;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import java.io.ByteArrayOutputStream;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.view.AbstractView;

public abstract class AbstractPdfView extends AbstractView {

    public AbstractPdfView() {

        initView();
    }

    private void initView() {

        setContentType("application/pdf");
    }

    @Override
    protected boolean generatesDownloadContent() {
        return true;
    }

    @Override
    protected final void renderMergedOutputModel(Map&lt;String, Object&gt; model,
            HttpServletRequest request, HttpServletResponse response) throws Exception {

        ByteArrayOutputStream baos = createTemporaryOutputStream();

        Document document = new Document(PageSize.A4);
        PdfWriter writer = PdfWriter.getInstance(document, baos);
        prepareWriter(model, writer, request);
        buildPdfMetadata(model, document, request);

        document.open();
        buildPdfDocument(model, document, writer, request, response);
        document.close();

        writeToResponse(response, baos);
    }

    protected void prepareWriter(Map&lt;String, Object&gt; model, PdfWriter writer,
            HttpServletRequest request) throws DocumentException {
        writer.setViewerPreferences(getViewerPreferences());
    }

    protected int getViewerPreferences() {
        return PdfWriter.ALLOW_PRINTING | PdfWriter.PageLayoutSinglePage;
    }

    protected void buildPdfMetadata(Map&lt;String, Object&gt; model, Document document,
            HttpServletRequest request) {
    }

    protected abstract void buildPdfDocument(Map&lt;String, Object&gt; model,
            Document document, PdfWriter writer, HttpServletRequest request,
            HttpServletResponse response) throws Exception;
}

Spring's AbstractPdfView is based on an older iText library.
Therefore, we need to create our own abstract class, which is basically a copy with
updated imports.

com/zetcode/MyPdfView.java
  

package com.zetcode.view;

import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.zetcode.bean.Car;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyPdfView extends AbstractPdfView {

    @Override
    protected void buildPdfDocument(Map&lt;String, Object&gt; model,
            Document document, PdfWriter writer, HttpServletRequest request,
            HttpServletResponse response) throws Exception {

        List&lt;Car&gt; cars = (List&lt;Car&gt;) model.get("cars");

        PdfPTable table = new PdfPTable(3);
        table.setWidthPercentage(60);
        table.setWidths(new int[] {1, 3, 3});

        Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

        PdfPCell hcell;
        hcell = new PdfPCell(new Phrase("Id", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        hcell = new PdfPCell(new Phrase("Name", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        hcell = new PdfPCell(new Phrase("Price", headFont));
        hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table.addCell(hcell);

        for (Car car : cars) {

            PdfPCell cell;

            cell = new PdfPCell(new Phrase(car.getId().toString()));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(car.getName()));
            cell.setPaddingLeft(5);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_LEFT);
            table.addCell(cell);

            cell = new PdfPCell(new Phrase(String.valueOf(car.getPrice())));
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
            cell.setPaddingRight(5);
            table.addCell(cell);
        }

        document.add(table);
    }
}

MyPdfView inherits from the customized AbstractPdfView.
In the buildPdfDocument method, we build the PDF file.

List&lt;Car&gt; cars = (List&lt;Car&gt;) model.get("cars");

First, we get the data from the model.

PdfPTable table = new PdfPTable(3);

We will put our data in a table; for this, we have the PdfPTable class.
The table has three columns: Id, Name, and Price.

Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

For the table header, we use bold Helvetica font.

PdfPCell hcell;
hcell = new PdfPCell(new Phrase("Id", headFont));
hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
table.addCell(hcell);

The data is placed inside table cells, represented by PdfPCell.
The text is horizontally aligned using the setHorizontalAlignment method.

document.add(table);

In the end, the table is inserted into the PDF document.

com/zetcode/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.Car;
import com.zetcode.service.ICarService;
import com.zetcode.view.MyPdfView;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MyController {

    @Autowired
    private ICarService carService;

    @RequestMapping(path = "/report", method = RequestMethod.GET)
    public ModelAndView report() {

        Map&lt;String, Object&gt; model = new HashMap&lt;&gt;();

        List&lt;Car&gt; cars = carService.findAll();
        model.put("cars", cars);

        return new ModelAndView(new MyPdfView(), model);
    }
}

In the MyController, we have one mapping.

@Autowired
private ICarService carService;

We inject CarService object into the attribute. The service
object is used to retrieve data from the database.

@RequestMapping(path = "/report", method = RequestMethod.GET)
public ModelAndView report() {

    Map&lt;String, Object&gt; model = new HashMap&lt;&gt;();

    List&lt;Car&gt; cars = carService.findAll();
    model.put("cars", cars);

    return new ModelAndView(new MyPdfView(), model);
}

In the report method, we find all cars with
the findAll method. We return a custom MyPdfView
back to the client.

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
the Cars table with the help of the JdbcTemplate.

@Autowired
private JdbcTemplate jtm;

JdbcTemplate is injected.

String sql = "SELECT * FROM Cars";

This is SQL to be executed. We select all cars from the Cars table.

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
        &lt;a href="/report.html"&gt;Generate report&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.html file contains a link to generate PDF report.
Static files are served from predefined directories; one of them
is static, located in src/main/resources.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

The Application sets up the Spring Boot application.

$ mvn spring-boot:run

We start Spring Boot application.

Navigate to http://localhost:8080/ to test the application. The H2 console
application is available at http://localhost:8080/console/. The JDBC url
for the console application is jdbc:h2:mem:testdb. The password is empty.

In this tutorial, we have created a PDF report with iText from a database table
in H2 database. The application used Spring Boot framework and was run in a web
environment.