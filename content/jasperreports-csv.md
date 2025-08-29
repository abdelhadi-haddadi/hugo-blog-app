+++
title = "JasperReports CSV"
date = 2025-08-29T19:57:55.365+01:00
draft = false
description = "Learn how to generate reports from CSV data sources using JasperReports. Step-by-step tutorial for effective report creation."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports CSV

last modified February 12, 2024 

JasperReports CSV tutorial shows how to create a report from a CSV data source.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JRCsvDataSource is
a datasource implementation that reads a CSV stream.

## JasperReports CSV example

The following application creates a report from from a CSV file with
JasperReports library. The report is a PDF file.

cars.csv
  

id,name,price
1,Audi,52642
2,Mercedes,57127
3,Skoda,9000
4,Volvo,29000
5,Bentley,350000
6,Citroen,21000
7,Hummer,41400
8,Volkswagen,21600
9,BMW,36600

The cars.csv contains the data to be used in our report.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;field name="id" class="java.lang.Integer"/&gt;
    &lt;field name="name"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;

    &lt;detail&gt;
        &lt;band height="15"&gt;

            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="50" height="15"/&gt;

                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;

                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[$F{id}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="150" y="0" width="100" height="15" /&gt;

                &lt;textElement textAlignment="Left" verticalAlignment="Middle"/&gt;

                &lt;textFieldExpression class="java.lang.String"&gt;
                    &lt;![CDATA[$F{name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="200" y="0" width="100" height="15" /&gt;
                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;

                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[$F{price}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The template contains two bands: columnHeader
and detail.

&lt;field name="id" class="java.lang.Integer"/&gt;
&lt;field name="name"/&gt;
&lt;field name="price" class="java.lang.Integer"/&gt;

There are three fields in the template. Fields are mapped to the elements of the
data source. In our case, fields are mapped to the CSV column names.

&lt;textField&gt;
    &lt;reportElement x="150" y="0" width="100" height="15" /&gt;

    &lt;textElement textAlignment="Left" verticalAlignment="Middle"/&gt;

    &lt;textFieldExpression class="java.lang.String"&gt;
        &lt;![CDATA[$F{name}]]&gt;
    &lt;/textFieldExpression&gt;
&lt;/textField&gt;

A text field is an element that has an associated expression, which is evaluated
with every iteration in the data source to obtain the text content. This text
field displays the name of the car. A text field in a detail band is evaluated
for each record in the data source. Since we have nine records in the CSV file,
the text field is evaluated nine times.

report.gvy
  

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.data.JRCsvDataSource

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

// def columnNames = ["id", "name", "price"] as String[]

def fileName = "cars.csv"
def ds = new JRCsvDataSource(fileName)
ds.setUseFirstRowAsHeader(true)
// ds.setColumnNames(columnNames)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

The code example generates a PDF report.

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

The XML template file is compiled into a JasperReport.
JasperReport is a compiled template ready to be filled with data.

def fileName = "cars.csv"
def ds = new JRCsvDataSource(fileName)
ds.setUseFirstRowAsHeader(true)

JRCsvDataSource is a data source implementation that reads data
from a CSV file. With setUseFirstRowAsHeader method, we tell
Jasper to use the first row as a header. Alternatively, we can use the
setColumnNames method.

def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

With the JasperFillManager.fillReport method, we create a
JasperPrint object; an object that can be viewed, printed or
exported to other formats.

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

The JasperExportManager.exportReportToPdfFile method transforms
the JasperPrint object into a PDF file.

In this article we have created a report with JasperReports library from
a CSV file.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).