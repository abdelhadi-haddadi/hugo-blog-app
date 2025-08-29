+++
title = "Java Servlet serve PDF"
date = 2025-08-29T20:01:48.424+01:00
draft = false
description = "Java servlet PDF tutorial shows how to return PDF data from a Java servlet."
image = ""
imageBig = ""
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet serve PDF

last modified August 24, 2023

Java servlet PDF tutorial shows how to return PDF data from a Java servlet. We
use iText library to work with PDF.

## PDF

The Portable Document Format (PDF) is a file format used to present
documents in a manner independent of application software, hardware, and
operating systems. Invented by Adobe, PDF is now an open standard maintained by
the International Organization for Standardization (ISO).

## Java Servlet

Servlet is a Java class which responds to a particular type of
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty.
Modern-day Java web development uses frameworks that are built on top of
servlets.

## iText

iText is an open source library for creating and manipulating PDF
files in Java.

## Java servlet PDF application

The following web application uses a Java servlet to send a PDF file to the client.
It generates PDF from a list of objects.

pom.xml
src
├── main
│  ├── java
│  │  └── com
│  │      └── zetcode
│  │          ├── bean
│  │          │  └── City.java
│  │          ├── service
│  │          │  └── CityService.java
│  │          ├── util
│  │          │  └── GeneratePdf.java
│  │          └── web
│  │              └── MyServlet.java
│  └── resources
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

    &lt;groupId&gt;org.example&lt;/groupId&gt;
    &lt;artifactId&gt;JavaServletPdf&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;jakarta.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;jakarta.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;6.0.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.itextpdf&lt;/groupId&gt;
            &lt;artifactId&gt;itextpdf&lt;/artifactId&gt;
            &lt;version&gt;5.5.13.3&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.2.3&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;11.0.11&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;webApp&gt;
                        &lt;contextPath&gt;/app&lt;/contextPath&gt;
                    &lt;/webApp&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven POM file. We have two artifacts: jakarta.servlet-api 
for servlets and itextpdf for PDF generation in Java. The
maven-war-plugin is responsible for collecting all artifact
dependencies, classes and resources of the web application and packaging them
into a web application archive (WAR). The jetty-maven-plugin is 
a helper plugin for easy tesing and integration of Jetty witn Maven.

&lt;configuration&gt;
    &lt;webApp&gt;
        &lt;contextPath&gt;/app&lt;/contextPath&gt;
    &lt;/webApp&gt;
&lt;/configuration&gt;

In the Jetty Maven plugin, we set the context path to /app.

com/zetcode/bean/City.java
  

package com.zetcode.bean;

public class City {

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
        return "City{" + "id=" + id + ", name=" + name + 
                ", population=" + population + '}';
    }
}

This is the City bean. It has three attributes: id,
name, and population.

com/zetcode/web/MyServlet.java
  

package com.zetcode.web;

import com.zetcode.bean.City;
import com.zetcode.service.CityService;
import com.zetcode.util.GeneratePdf;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "MyServlet", urlPatterns = {"/pdf"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("application/pdf;charset=UTF-8");

        response.addHeader("Content-Disposition", "inline; filename=" + "cities.pdf");
        ServletOutputStream out = response.getOutputStream();

        List&lt;City&gt; cities = CityService.getCities();

        ByteArrayOutputStream baos = GeneratePdf.getPdfFile(cities);
        baos.writeTo(out);
    }
}

This is the MyServlet servlet. It retrieves data from a service
class, generates PDF file from the data, and returns the PDF file to the client.

response.setContentType("application/pdf;charset=UTF-8");

We set the content type of the response object to application/pdf.

response.addHeader("Content-Disposition", "inline; filename=" + "cities.pdf");

The Content-Disposition response header indicates that the content is 
expected to be displayed inline in the browser, that is, as a Web page 
or as part of a Web page, or as an attachment, that is downloaded and 
saved locally. The optional filename directive specifies the name of 
the file transmitted.

ServletOutputStream out = response.getOutputStream();

We get the ServletOutputStream from the response object.

List&lt;City&gt; cities = CityService.getCities();

From the CityService, we get the list of cities.

ByteArrayOutputStream baos = GeneratePdf.getPdfFile(cities);
baos.writeTo(out);

We generate a PDF file from the data and write the returned 
ByteArrayOutputStream to the ServletOutputStream.

com/zetcode/service/CityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;

import java.util.List;

public class CityService {

    public static List&lt;City&gt; getCities() {

        var cities = List.of(
                new City(1L, "Bratislava", 432000),
                new City(2L, "Budapest", 1759000),
                new City(3L, "Prague", 1280000),
                new City(4L, "Warsaw", 1748000),
                new City(5L, "Los Angeles", 3971000),
                new City(6L, "New York", 8550000),
                new City(7L, "Edinburgh", 464000),
                new City(8L, "Berlin", 3671000));

        return cities;
    }
}

The CityService's getCities method returns a list of
city objects.

com/zetcode/util/GeneratePdf.java
  

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

import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class GeneratePdf {

    public static ByteArrayOutputStream getPdfFile(List&lt;City&gt; cities) {

        var document = new Document();
        var bout = new ByteArrayOutputStream();

        try {

            var table = new PdfPTable(3);
            table.setWidthPercentage(60);
            table.setWidths(new int[]{1, 3, 3});

            Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

            var hcell = new PdfPCell(new Phrase("Id", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Name", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            hcell = new PdfPCell(new Phrase("Population", headFont));
            hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(hcell);

            for (City city : cities) {

                var cell = new PdfPCell(new Phrase(city.getId().toString()));
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

            PdfWriter.getInstance(document, bout);
            document.open();
            document.add(table);

            document.close();

        } catch (DocumentException ex) {

            Logger.getLogger(GeneratePdf.class.getName()).log(Level.SEVERE, null, ex);
        }

        return bout;
    }
}

GeneratePdf creates PDF file from the provided data.

var bout = new ByteArrayOutputStream();

The data will be written to ByteArrayOutputStream.
ByteArrayOutputStream implements an output stream in which the data
is written into a byte array. 

var table = new PdfPTable(3);

We will put our data in a table; for this, we have the PdfPTable
class. The table has three columns: Id, Name, and Population.

Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);

We use bold Helvetica font for the table header.

var hcell = new PdfPCell(new Phrase("Id", headFont));
hcell.setHorizontalAlignment(Element.ALIGN_CENTER);
table.addCell(hcell);

The data is placed inside table cells, represented by PdfPCell.
The setHorizontalAlignment method horizontally alignes the text.

PdfWriter.getInstance(document, bout);

With PdfWriter, the document is written to 
the ByteArrayOutputStream.

document.open();
document.add(table);

The table is inserted into the PDF document.

document.close();

In order for the data to be written to the ByteArrayOutputStream, 
the document must be closed.

return bout; 

In the end, the data is returned as ByteArrayOutputStream.

$ mvn jetty:run

Start the Jetty server and navigate to localhost:8080/app/pdf.

In this article we have sent PDF data from a Java servlet.

List [all Java Servlet](/all/#servlets) tutorials.