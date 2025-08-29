+++
title = "Creating PDF report in Spring Boot"
date = 2025-08-27T23:20:55.857+01:00
draft = false
description = "Spring Boot PDF report tutorial shows how to serve PDF file in Spring Boot RESTful web application."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Creating PDF report in Spring Boot

last modified July 13, 2020 

In this tutorial, we show how to serve PDF file in Spring Boot RESTful web application. The 
PDF file is generated with iText and the data is loaded from a table in an H2 in-memory database.

iText is an open source library for creating and manipulating PDF files in Java.

Spring is a Java application framework for developing Java
enterprise applications. It also helps integrate various enterprise components. 
Spring Boot makes it easy to create Spring-powered, production-grade applications 
and services with minimum setup requirements.

H2 is an open source relational database management system implemented entirely in Java. 
It can be embedded in Java applications or run in the client-server mode.
It has small footprint and is easy to deploy and install. It contains a browser based 
console application for viewing and editing datatabase tables.

Spring Data JPA is part of the umbrella Spring Data project that makes it 
easier to implement JPA based repositories. Spring Data JPA uses JPA to store data in 
a relational database. It can create repository implementations automatically, 
at runtime, from a repository interface.

## Application

The following Spring Boot application loads data from a database table
and produces a PDF report from it with iText library. It uses ResponseEntity
and InputStreamResource to send PDF data to the client.

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
    │   │           │   └── City.java
    │   │           ├── controller
    │   │           │   └── MyController.java
    │   │           ├── repository
    │   │           │   └── CityRepository.java
    │   │           ├── service
    │   │           │   ├── CityService.java
    │   │           │   └── ICityService.java
    │   │           └── util
    │   │               └── GeneratePdfReport.java
    │   └── resources
    │       ├── application.yml
    │       └── import.sql
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
    &lt;artifactId&gt;SpringBootPdfReport&lt;/artifactId&gt;
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
            &lt;artifactId&gt;spring-boot-starter-data-jpa&lt;/artifactId&gt;
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
    &lt;name&gt;SpringBootPdfReport&lt;/name&gt;
&lt;/project&gt;

This is the Maven build file. The h2 dependency includes the H2 database
driver.

Spring Boot starters are a set of useful dependency descriptors which greatly simplify Maven configuration.
The spring-boot-starter-parent has some common configurations for a Spring Boot
application. The spring-boot-starter-web is a starter for building web applications with Spring MVC. 
It uses Tomcat as the default embedded container. 
The spring-boot-starter-data-jpa is a starter for using Spring Data JPA with Hibernate.

The spring-boot-maven-plugin provides Spring Boot support in Maven, allowing us 
to package executable JAR or WAR archives. Its spring-boot:run goal runs the 
Spring Boot application.

com/zetcode/City.java
  

package com.zetcode.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CITIES")
public class City {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private int population;

    public City() {
    }

    public City(Long id, String name, int population) {
        this.id = id;
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
    public String toString() {
        return "City{" + "id=" + id + ", name=" + name
                + ", population=" + population + '}';
    }
}

This is the City entity. Each entity must have at least two
annotations defined: @Entity and @Id. Previously, we 
have set the ddl-auto option 
to create-drop which means that Hibernate will create the
table schema from this entity.

@Entity
@Table(name = "CITIES")
public class City {

The @Entity annotation specifies that the class is an
entity and is mapped to a database table. The @Table entity
specifies the name of the database table to be used for mapping.

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
  

The @Id annotation specifies the primary key of an entity and 
the @GeneratedValue provides for the specification of generation 
strategies for the values of primary keys.

application.yml
  

server:
    context-path: /rest

spring: 
    main:
        banner-mode: "off"       

logging: 
    level: 
        org: 
            springframework: ERROR

The application.yml is the main Spring Boot configuration
file. The context-path sets the context path (application name). 
With the banner-mode property we turn off the Spring banner.
The spring framework logging is set to ERROR.

import.sql
  

INSERT INTO CITIES(NAME, POPULATION) VALUES('Bratislava', 432000);
INSERT INTO CITIES(NAME, POPULATION) VALUES('Budapest', 1759000);
INSERT INTO CITIES(NAME, POPULATION) VALUES('Prague', 1280000);
INSERT INTO CITIES(NAME, POPULATION) VALUES('Warsaw', 1748000);
INSERT INTO CITIES(NAME, POPULATION) VALUES('Los Angeles', 3971000);
INSERT INTO CITIES(NAME, POPULATION) VALUES('New York', 8550000);
INSERT INTO CITIES(NAME, POPULATION) VALUES('Edinburgh', 464000);
INSERT INTO CITIES(NAME, POPULATION) VALUES('Berlin', 3671000);

The schema is automatically created by Hibernate; later, the import.sql
file is executed to fill the table with data.

com/zetcode/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.bean.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

}

By extending from the Spring CrudRepository, we will have
some methods for our data repository implemented, including findAll
and findOne. This way we do not have to write a lot of boilerplate code.

com/zetcode/ICityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;
import java.util.List;

public interface ICityService {

    public List&lt;City&gt; findAll();
}

ICityService provides a contract method to 
get all cities from the database.

com/zetcode/CityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;
import com.zetcode.repository.CityRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService implements ICityService {

    @Autowired
    private CityRepository repository;

    @Override
    public List&lt;City&gt; findAll() {

        List&lt;City&gt; cities = (List&lt;City&gt;) repository.findAll();
        
        return cities;
    }
}

CityService contains the implementation of the findAll 
method. We use repository to retrieve data from the database.

@Autowired
private CityRepository repository;

CityRepository is injected.

List&lt;City&gt; cities = (List&lt;City&gt;) repository.findAll();

The findAll method of the repository returns the list of
cities.

com/zetcode/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.City;
import com.zetcode.service.ICityService;
import com.zetcode.util.GeneratePdfReport;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @Autowired
    ICityService cityService;

    @RequestMapping(value = "/pdfreport", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity&lt;InputStreamResource&gt; citiesReport() throws IOException {

        List&lt;City&gt; cities = (List&lt;City&gt;) cityService.findAll();

        ByteArrayInputStream bis = GeneratePdfReport.citiesReport(cities);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=citiesreport.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}

By decorating MyController with @RestController, we have
a RESTful controller. Its citiesReport method returns the generated
PDF report. The Resource interface abstracts access to low-level resources;
InputStreamResource is its implementation for stream resources.

@Autowired
ICityService cityService;

We inject ICityService object into the attribute. The service
object is used to retrieve data from the database.

List&lt;City&gt; cities = (List&lt;City&gt;) cityService.findAll();

We find all cities with the findAll method.

ByteArrayInputStream bis = GeneratePdfReport.citiesReport(cities);

The GeneratePdfReport.citiesReport generates PDF file 
from the list of cities using iText library.

HttpHeaders headers = new HttpHeaders();
headers.add("Content-Disposition", "inline; filename=citiesreport.pdf");

By setting the Content-Disposition to inline, 
the PDF file is shown directly in browser.

return ResponseEntity
        .ok()
        .headers(headers)
        .contentType(MediaType.APPLICATION_PDF)
        .body(new InputStreamResource(bis));

We create a response with ResponseEntity. We specify the
headers, content type, and body. The body is an InputStreamResource.

com/zetcode/GeneratePdfReport.java
  

package com.zetcode.util;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.FontFactory;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.zetcode.bean.City;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class GeneratePdfReport {

    public static ByteArrayInputStream citiesReport(List&lt;City&gt; cities) {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfPTable table = new PdfPTable(3);
            table.setWidthPercentage(60);
            table.setWidths(new int[]{1, 3, 3});

            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

            PdfPCell hcell;
            hcell = new PdfPCell(new Phrase("Id", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Name", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Population", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            for (City city : cities) {

                PdfPCell cell;

                cell = new PdfPCell(new Phrase(city.getId().toString()));
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase(city.getName()));
                cell.setPaddingLeft(5);
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_LEFT);
                table.addCell(cell);

                cell = new PdfPCell(new Phrase(String.valueOf(city.getPopulation())));
                cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
                cell.setHorizontalAlignment(Element.ALIGN_RIGHT);
                cell.setPaddingRight(5);
                table.addCell(cell);
            }

            PdfWriter.getInstance(document, out);
            document.open();
            document.add(table);
            
            document.close();
            
        } catch (DocumentException ex) {
        
            Logger.getLogger(GeneratePdfReport.class.getName()).log(Level.SEVERE, null, ex);
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}

GeneratePdfReport creates PDF file from the provided data.

ByteArrayOutputStream out = new ByteArrayOutputStream();

The data will be written to ByteArrayOutputStream.

PdfPTable table = new PdfPTable(3);

We will put our data in a table; for this, we have the PdfPTable class.
The table has three columns: Id, Name, and Population.

Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

For the table header, we use bold Helvetica font.

PdfPCell hcell;
hcell = new PdfPCell(new Phrase("Id", headFont));
hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
table.addCell(hcell);

The data is placed inside table cells, represented by PdfPCell.
The text is horizontally aligned using the setHorizontalAlignment method.

PdfWriter.getInstance(document, out);

With PdfWriter, the document is written to 
the ByteArrayOutputStream.

document.open();
document.add(table);

The table is inserted into the PDF document.

document.close();

In order for the data to be written to the ByteArrayOutputStream, 
the document must be closed.

return new ByteArrayInputStream(out.toByteArray());

In the end, the data is returned as ByteArrayInputStream.

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

We navigate to http://localhost:8080/rest/pdfreport to generate the report.

In this tutorial, we have shown how to send a generated PDF file back to the client.
The PDF report was generated with iText and the data came an H2 database.
We used Spring Data JPA to access data.