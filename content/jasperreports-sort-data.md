+++
title = "JasperReports sort data"
date = 2025-08-29T19:58:00.986+01:00
draft = false
description = "Learn how to sort data in JasperReports. This tutorial provides step-by-step guidance for organizing your reports effectively."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports sort data

last modified February 12, 2024 

In this article we show how to sort data in a report created with
JasperReports library. The sortField tag is used to sort data.

JasperReports is an open-source reporting library. It can create reports in
various formats including PDF, HTML, XLS, or CSV. JasperReports creates page-oriented,
ready-to-print documents in a simple and flexible manner.

## JasperReports sort data example

The following application loads data from a bean collection data source and
creates a report from it with JasperReports library. The report is a PDF file.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
   "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
   xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
   name="report" pageWidth="595" pageHeight="842"
   columnWidth="555" leftMargin="20" rightMargin="20"
   topMargin="20" bottomMargin="20"&gt;

   &lt;style name="textRight" hAlign="Right" vAlign="Middle"/&gt;

   &lt;field name="id" class="java.lang.Long"/&gt;
   &lt;field name="name"/&gt;
   &lt;field name="price" class="java.lang.Integer"/&gt;

   &lt;sortField name="name" order="Descending"/&gt;

    &lt;detail&gt;
      &lt;band height="15"&gt;

         &lt;textField&gt;
            &lt;reportElement x="0" y="0" width="50" height="15"/&gt;
            &lt;textElement/&gt;
            &lt;textFieldExpression class="java.lang.Long"&gt;
               &lt;![CDATA[$F{id}]]&gt;
            &lt;/textFieldExpression&gt;
         &lt;/textField&gt;

         &lt;textField&gt;
            &lt;reportElement x="150" y="0" width="100" height="15"/&gt;
            &lt;textElement/&gt;
            &lt;textFieldExpression class="java.lang.String"&gt;
               &lt;![CDATA[$F{name}]]&gt;
            &lt;/textFieldExpression&gt;
         &lt;/textField&gt;

         &lt;textField&gt;
            &lt;reportElement x="200" y="0" width="100" height="15" style="textRight"/&gt;
            &lt;textElement/&gt;
            &lt;textFieldExpression class="java.lang.Integer"&gt;
               &lt;![CDATA[$F{price}]]&gt;
            &lt;/textFieldExpression&gt;
         &lt;/textField&gt;

      &lt;/band&gt;
   &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The template contains only the detail band. In
a detail band, each element is repeated for every record provided by the data
source.

&lt;sortField name="name" order="Descending"/&gt;

With the sortField tag, we sort the data by name field
in descending order.

&lt;textField&gt;
    &lt;reportElement x="150" y="0" width="100" height="15"/&gt;
    &lt;textElement/&gt;
    &lt;textFieldExpression class="java.lang.String"&gt;
       &lt;![CDATA[$F{name}]]&gt;
    &lt;/textFieldExpression&gt;
 &lt;/textField&gt;

The name field is shown in the textField tag with the
$F{} expression.

report.gvy
  

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource
import groovy.transform.Immutable

@Immutable
class Car {
    Long id;
    String name;
    int price;
}

def cars = [
    new Car(1L, 'Audi', 52642),
    new Car(2L, 'Mercedes', 57127),
    new Car(3L, 'Skoda', 9000),
    new Car(4L, 'Volvo', 29000),
    new Car(5L, 'Bentley', 350000),
    new Car(6L, 'Citroen', 21000),
    new Car(7L, 'Hummer', 41400),
    new Car(8L, 'Volkswagen', 21600),
]

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def ds = new JRBeanCollectionDataSource(cars)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

In the Groovy file, we pass a list of Car objects to the report. 

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

We compile the XML template file into a JasperReport.
JasperReport is a compiled template ready to be filled with data.

def cars = [
    new Car(1L, 'Audi', 52642),
    new Car(2L, 'Mercedes', 57127),
    new Car(3L, 'Skoda', 9000),
    new Car(4L, 'Volvo', 29000),
    new Car(5L, 'Bentley', 350000),
    new Car(6L, 'Citroen', 21000),
    new Car(7L, 'Hummer', 41400),
    new Car(8L, 'Volkswagen', 21600),
]

A list of cars is our data.

var ds = new JRBeanCollectionDataSource(cars);

JRBeanCollectionDataSource is a data source implementation
that wraps a collection of Java bean objects. We put four Car
beans into the data source.

def ds = new JRBeanCollectionDataSource(cars)

A JasperPrint object is created; an object that can be viewed,
printed, or exported to other formats.

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

The JasperExportManager.exportReportToPdfFile method exports the
JasperPrint into a PDF file.

In this article we have created a PDF file report with sorted data. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).