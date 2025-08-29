+++
title = "JasperReports variable"
date = 2025-08-29T19:58:02.096+01:00
draft = false
description = "Learn how to create and use variables in JasperReports. This tutorial provides step-by-step guidance for adding dynamic data to your reports."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports variable

last modified February 12, 2024 

JasperReports variable tutorial shows how to create a variable in JasperReports
library.

JasperReports is an open-source reporting library. It can create reports in 
various formats including PDF, HTML, XLS, or CSV. JasperReports creates page-oriented, 
ready-to-print documents.

## JasperReports variable

A variable is used to store partial results and to do complex
calculations with the data extracted from data source. They can be used in
other parts of the report, including other variables. We refer to the variable 
with the $V{var_name} syntax.

A variable is defined with the &lt;variable&gt; tag. The expression
to calculate the variable is defined in the
&lt;variableExpression&gt; tag. Inside the expression, we can 
use functions, operators, fields, or other variables. JasperReports contains several
built-in variables such as PAGE_NUMBER, COLUMN_NUMER, or
REPORT_COUNT.

## JasperReports variable example

The following application creates a sum variable, which sums the price 
of cars.

pom.xml
src
└───main
    ├───java
    │   └───com
    │       └───zetcode
    │           ├───main
    │           │       CommandLineRunner.java
    │           │       JasperVariableSum.java
    │           └───model
    │                   Car.java
    └───resources
            report2.xml

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;sumex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
        &lt;exec.mainClass&gt;com.zetcode.main.CommandLineRunner&lt;/exec.mainClass&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;net.sf.jasperreports&lt;/groupId&gt;
            &lt;artifactId&gt;jasperreports&lt;/artifactId&gt;
            &lt;version&gt;6.9.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;net.sf.jasperreports&lt;/groupId&gt;
            &lt;artifactId&gt;jasperreports-fonts&lt;/artifactId&gt;
            &lt;version&gt;6.9.0&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

&lt;/project&gt;

The Maven pom.xml file contains the
jasperreports and the jasperreports-fonts dependencies. 
The fonts are needed because we display the sum in bold. 

com/zetcode/model/Car.java
  

package com.zetcode.model;

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
        final StringBuilder sb = new StringBuilder("Car{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", price=").append(price);
        sb.append('}');
        return sb.toString();
    }
}

This is Car bean class. It contains car id, car name, and car price
attributes.

src/resources/report2.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns = "http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation = "http://jasperreports.sourceforge.net/jasperreports
                                    http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report2" topMargin="20" bottomMargin="20"&gt;

    &lt;style name="sum" isBold="true"/&gt;

    &lt;field name="Price" class="java.lang.Integer"&gt;
        &lt;fieldDescription&gt;&lt;![CDATA[price]]&gt;&lt;/fieldDescription&gt;
    &lt;/field&gt;

    &lt;variable name="sum" class="java.lang.Integer" calculation="Sum"&gt;
        &lt;variableExpression&gt;&lt;![CDATA[$F{Price}]]&gt;&lt;/variableExpression&gt;
    &lt;/variable&gt;

    &lt;columnHeader&gt;
        &lt;band height="20"&gt;
            &lt;staticText&gt;
                &lt;reportElement x="0" y="0" width="100" height="20"/&gt;
                &lt;box leftPadding="10"/&gt;
                &lt;textElement textAlignment="Center"/&gt;
                &lt;text&gt;&lt;![CDATA[Car price]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
        &lt;/band&gt;
    &lt;/columnHeader&gt;

    &lt;detail&gt;
        &lt;band height="20"&gt;
            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="100" height="20" /&gt;
                &lt;textElement textAlignment="Right"/&gt;
                &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{Price}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
        &lt;/band&gt;
    &lt;/detail&gt;

    &lt;summary&gt;
        &lt;band height="20"&gt;
            &lt;textField&gt;
                &lt;reportElement style="sum" x="0" y="0" width="100" height="20"/&gt;
                &lt;textElement textAlignment="Right"/&gt;

                &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$V{sum}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
        &lt;/band&gt;
    &lt;/summary&gt;

&lt;/jasperReport&gt;

This is the report template file. The template contains the column header and the 
detail bands.

&lt;style name="sum" isBold="true"/&gt;

We define a style for the sum; it is rendered in bold font. 

&lt;field name="Price" class="java.lang.Integer"&gt;
    &lt;fieldDescription&gt;&lt;![CDATA[price]]&gt;&lt;/fieldDescription&gt;
&lt;/field&gt;

The Price field is mapped to the car's price attribute.
In the example, we display only car prices.

&lt;variable name="sum" class="java.lang.Integer" calculation="Sum"&gt;
    &lt;variableExpression&gt;&lt;![CDATA[$F{Price}]]&gt;&lt;/variableExpression&gt;
&lt;/variable&gt;

We define the sum variable. The calculation attribute 
defines the function applied on the variable expression. In our case, we 
have the $F{Price}, which returns the price field from the 
data source. 

&lt;summary&gt;
    &lt;band height="20"&gt;
        &lt;textField&gt;
            &lt;reportElement style="sum" x="0" y="0" width="100" height="20"/&gt;
            &lt;textElement textAlignment="Right"/&gt;

            &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$V{sum}]]&gt;&lt;/textFieldExpression&gt;
        &lt;/textField&gt;
    &lt;/band&gt;
&lt;/summary&gt; 

We display the sum variable in the summary band with the $V{sum} syntax.

com/zetcode/main/JasperVariableSum.java
  

package com.zetcode.main;

import com.zetcode.model.Car;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import java.util.ArrayList;
import java.util.HashMap;

public class JasperVariableSum {

    public void start() throws JRException {

        var cars = new ArrayList&lt;Car&gt;();

        cars.add(new Car(1L, "Audi", 52642));
        cars.add(new Car(2L, "Mercedes", 57127));
        cars.add(new Car(3L, "Skoda", 9000));
        cars.add(new Car(4L, "Volvo", 29000));
        cars.add(new Car(5L, "Bentley", 350000));
        cars.add(new Car(6L, "Citroen", 21000));
        cars.add(new Car(7L, "Hummer", 41400));
        cars.add(new Car(8L, "Volkswagen", 21600));

        var ds = new JRBeanCollectionDataSource(cars);

        var xmlFile = "src/main/resources/report2.xml";
        var jasperReport = JasperCompileManager.compileReport(xmlFile);

        var params = new HashMap&lt;String, Object&gt;();
        var jasperPrint = JasperFillManager.fillReport(jasperReport,
                params, ds);

        JasperExportManager.exportReportToPdfFile(jasperPrint,
                "src/main/resources/report2.pdf");
    }
}

The data source in the example is a collection of Java beans.

com/zetcode/main/CommandLineRunner.java
  

package com.zetcode.main;

import net.sf.jasperreports.engine.JRException;

public class CommandLineRunner {

    public static void main(String[] args) throws JRException {

        var app = new JasperVariableSum();
        app.start();
    }
}

The CommandLineRunner sets up the application.

$ mvn exec:java

We run the application.

In this article we have created a sum variable to calculate the sum of car
prices.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).