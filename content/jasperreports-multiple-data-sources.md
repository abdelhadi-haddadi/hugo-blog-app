+++
title = "JasperReports multiple data sources"
date = 2025-08-29T19:57:58.754+01:00
draft = false
description = "Learn how to use multiple data sources in JasperReports. This tutorial provides step-by-step guidance for seamless data integration."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports multiple data sources

last modified February 12, 2024 

JasperReporte data sources in a s multiple data sources tutorial shows how use
multiplreport generated with JasperReports library.

JasperReports is an open-source reporting library. It can create reports in
various formats including PDF, HTML, XLS, or CSV. JasperReports creates page-oriented,
ready-to-print documents.

## JasperReports multiple data sources example

The following application displays data from two different data sources
in a report.

pom.xml
src
└── main
    ├── java
    │   └── com
    │       └── zetcode
    │           ├── model
    │           │   ├── Car.java
    │           │   └── Country.java
    │           └── main
    │               ├── CommandLineRunner.java
    │               └── JasperMultipleDataSources.java
    └── resources
        └── report2.xml

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;multipledatasets&lt;/artifactId&gt;
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

    &lt;/dependencies&gt;

&lt;/project&gt;

The Maven pom.xml file contains the
jasperreports dependency.

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
        return "Car{" + "id=" + id + ", name=" +
                name + ", price=" + price + '}';
    }
}

This is a Car bean class. It contains car id, name, and price
attributes.

com/zetcode/model/Country.java
  

package com.zetcode.model;

public class Country {

    private Long id;
    private String name;
    private int population;

    public Country(Long id, String name, int population) {
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
}

This is a Country bean class. It contains country id, name, and
population attributes.

src/resources/report2.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
   "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="freport" pageWidth="595" pageHeight="842"
              columnWidth="555" leftMargin="20" rightMargin="20"
              topMargin="20" bottomMargin="20"&gt;

&lt;style name="field" fontSize="11" /&gt;
&lt;style name="textRight" style="field" hAlign="Right" /&gt;

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

&lt;detail&gt;
    &lt;band height="15"&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two list components. The list
components load data from the list parameters passed to the report.

&lt;subDataset name="dataset1"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

&lt;subDataset name="dataset2"&gt;
    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="population" class="java.lang.Integer"/&gt;
&lt;/subDataset&gt;

We have two subdatasets; each of them has three fields. The fields
are mapped to the attributes of the Java beans.

&lt;parameter name="datasource1" class="java.util.List"/&gt;
&lt;parameter name="datasource2" class="java.util.List"/&gt;

The report accepts two java.util.List parameters.

```
&lt;componentElement&gt;
    &lt;reportElement x="0" y="0" width="100" height="15"/&gt;
    &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset2"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource2})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{population}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

        &lt;componentElement&gt;
            &lt;reportElement x="250" y="0" width="100" height="15"/&gt;
            &lt;jr:list xmlns:jr="http://jasperreports.sourceforge.net/jasperreports/components"
                        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports/components
                                            http://jasperreports.sourceforge.net/xsd/components.xsd"&gt;

                &lt;datasetRun subDataset="dataset1"&gt;
                    &lt;dataSourceExpression&gt;&lt;![CDATA[new net.sf.jasperreports.engine.data.JRBeanCollectionDataSource($P{datasource1})]]&gt;&lt;/dataSourceExpression&gt;
                &lt;/datasetRun&gt;

                &lt;jr:listContents height="15" width="220"&gt;
                    &lt;textField&gt;
                        &lt;reportElement x="0" y="0" width="20" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Long"&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="50" y="0" width="80" height="15" style="field" /&gt;

                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.String"&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                    &lt;textField&gt;
                        &lt;reportElement x="130" y="0" width="80" height="15" style="textRight" /&gt;
                        &lt;textElement /&gt;

                        &lt;textFieldExpression class="java.lang.Integer"&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/textFieldExpression&gt;
                    &lt;/textField&gt;

                &lt;/jr:listContents&gt;
            &lt;/jr:list&gt;
        &lt;/componentElement&gt;

    &lt;/band&gt;
&lt;/detail&gt;

&lt;/jasperReport&gt;

```