+++
title = "Creating PDF report in Spring Boot"
date = 2025-08-29T20:12:33.244+01:00
draft = false
description = "Spring Boot Serve PDF report tutorial shows how to serve PDF file in Spring Boot web application. The report is generated with openpdf library."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Creating PDF report in Spring Boot

last modified August 2, 2023

In this article we shows how to serve PDF file in Spring Boot web application.
The report is generated with iText library.

The *openpdf* is an open source library for creating and manipulating PDF
files in Java.

Spring is a Java application framework for developing Java enterprise
applications. It also helps integrate various enterprise components. Spring Boot
makes it easy to create Spring-powered, production-grade applications and
services with minimum setup requirements.

H2 is an open source relational database management system
implemented entirely in Java. It can be embedded in Java applications or run in
the client-server mode. It has small footprint and is easy to deploy and
install. It contains a browser based console application for viewing and editing
datatabase tables.

Spring Data JPA is part of the umbrella Spring Data project that
makes it easier to implement JPA based repositories. Spring Data JPA uses JPA to
store data in a relational database. It can create repository implementations
automatically, at runtime, from a repository interface.

## Spring Boot Serve PDF example

The following Spring Boot application loads data from a database table and
produces a PDF report from it with iText library. It uses
ResponseEntity and InputStreamResource to send PDF
data to the client.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───controller
│   │           │       MyController.java
│   │           ├───model
│   │           │       City.java
│   │           ├───repository
│   │           │       CityRepository.java
│   │           ├───service
│   │           │       CityService.java
│   │           │       ICityService.java
│   │           └───util
│   │                   GeneratePdfReport.java
│   └───resources
│           application.yml
│           import.sql
└───test
    └───java

This is the project structure.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'com.github.librepdf:openpdf:1.3.30'
    runtimeOnly 'com.h2database:h2'
}

This is the Gradle build file.

Spring Boot starters are a set of useful dependency descriptors which greatly
simplify the application configuration. The spring-boot-starter-web
is a starter for building web applications with Spring MVC. It uses Tomcat as
the default embedded container. The spring-boot-starter-data-jpa is
a starter for using Spring Data JPA with Hibernate.

In addition, we include dependencies for H2 database and openpdf library.

com/zetcode/model/City.java
  

package com.zetcode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Objects;

@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.name);
        hash = 79 * hash + this.population;
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

        var builder = new StringBuilder();
        builder.append("City{id=").append(id).append(", name=")
                .append(name).append(", population=")
                .append(population).append("}");

        return builder.toString();
    }
}

This is the City entity. Each entity must have at least two
annotations defined: @Entity and @Id. The default
value of the spring.jpa.hibernate.ddl-auto property is
create-drop which means that Hibernate will create the table schema
from this entity.

@Entity
@Table(name = "cities")
public class City {

The @Entity annotation specifies that the class is an
entity and is mapped to a database table. The @Table entity
specifies the name of the database table to be used for mapping.

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

The @Id annotation specifies the primary key of an entity and
the @GeneratedValue provides for the specification of generation
strategies for the values of primary keys.

resources/application.yml
  

spring:
    main:
      banner-mode: "off"
    sql:
      init:
        platform=h2
  
  logging:
    level:
      org:
        springframework: ERROR

The application.yml is the main Spring Boot configuration
file. With the banner-mode property we turn off the Spring banner.
The spring framework logging is set to ERROR. We inform that we use H2 database.

resources/import.sql
  

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Suzhou', 4327066);
INSERT INTO cities(name, population) VALUES('Zhengzhou', 4122087);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);
INSERT INTO cities(name, population) VALUES('Brest', 139163);
INSERT INTO cities(name, population) VALUES('Bucharest', 1836000);

The schema is automatically created by Hibernate; later, the
import.sql file is executed to fill the table with data.

com/zetcode/repository/CityRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.City;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends CrudRepository&lt;City, Long&gt; {

}

By extending from the Spring CrudRepository, we have
some methods for our data repository implemented, including findAll
and findOne. This way we do not have to write a lot of boilerplate code.

com/zetcode/service/ICityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import java.util.List;

public interface ICityService {

    List&lt;City&gt; findAll();
}

ICityService provides a contract method to
get all cities from the database.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.model.City;
import com.zetcode.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements ICityService {

    private final CityRepository repository;

    @Autowired
    public CityService(CityRepository repository) {
        this.repository = repository;
    }

    @Override
    public List&lt;City&gt; findAll() {

        return (List&lt;City&gt;) repository.findAll();
    }
}

CityService contains the implementation of the findAll
method. We use repository to retrieve data from the database.

private final CityRepository repository;

@Autowired
public CityService(CityRepository repository) {
    this.repository = repository;
}

CityRepository is injected.

return (List&lt;City&gt;) repository.findAll();

The findAll method of the repository returns the list of
cities.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.City;
import com.zetcode.service.ICityService;
import com.zetcode.util.GeneratePdfReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.io.ByteArrayInputStream;
import java.util.List;

@Controller
public class MyController {

    private final ICityService cityService;

    @Autowired
    public MyController(ICityService cityService) {
        this.cityService = cityService;
    }

    @RequestMapping(value = "/pdfreport", method = RequestMethod.GET,
            produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity&lt;InputStreamResource&gt; citiesReport() {

        var cities = (List&lt;City&gt;) cityService.findAll();

        ByteArrayInputStream bis = GeneratePdfReport.citiesReport(cities);

        var headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=citiesreport.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(bis));
    }
}

The citiesReport method returns the generated PDF report. The
Resource interface abstracts access to low-level resources;
InputStreamResource is its implementation for stream resources.

private final ICityService cityService;

@Autowired
public MyController(ICityService cityService) {
    this.cityService = cityService;
}

We inject ICityService object into the attribute. The service
object is used to retrieve data from the database.

var cities = (List&lt;City&gt;) cityService.findAll();

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
headers, content type, and body. The content type is MediaType.APPLICATION_PDF.
The body is an InputStreamResource.

com/zetcode/util/GeneratePdfReport.java
  

package com.zetcode.util;

import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.zetcode.model.City;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

public class GeneratePdfReport {

    private static final Logger logger = LoggerFactory.getLogger(GeneratePdfReport.class);

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

            logger.error("Error occurred: {0}", ex);
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}

GeneratePdfReport creates PDF file from the provided data.

ByteArrayOutputStream out = new ByteArrayOutputStream();

The data will be written to ByteArrayOutputStream.

PdfPTable table = new PdfPTable(3);

We put our data in a table; for this, we have the PdfPTable class.
The table has three columns: Id, Name, and Population.

Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

For the table header, we use bold Helvetica font.

PdfPCell hcell;
hcell = new PdfPCell(new Phrase("Id", headFont));
hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
table.addCell(hcell);

The data is placed inside table cells, represented by PdfPCell. The
text is horizontally aligned using the setHorizontalAlignment
method.

PdfWriter.getInstance(document, out);

With PdfWriter, the document is written to the 
ByteArrayOutputStream.

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

$ ./gradlew bootRun

We start Spring Boot application.

We navigate to http://localhost:8080/pdfreport to generate the report.

In this article we have shown how to send a generated PDF file back to the
client. The PDF report was generated with iText and the data came an H2
database. We used Spring Data JPA to access data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).