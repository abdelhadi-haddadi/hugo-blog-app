+++
title = "JasperReports JSON"
date = 2025-08-29T19:57:57.582+01:00
draft = false
description = "Learn how to work with JSON data in JasperReports. This tutorial provides step-by-step guidance for JSON data integration."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports JSON

last modified February 12, 2024 

JasperReports JSON tutorial shows how to work with JSON data in JasperReports
library.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

JsonDataSource is a data source for JSON data.
JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. The official Internet media type for JSON is
application/json. The JSON filename extension is
.json.

## JasperReports JSON example

The following application reads JSON data from an online testing service and
creates a report from it with JasperReports library.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name"/&gt;
    &lt;field name="username"/&gt;

    &lt;detail&gt;
        &lt;band height="15"&gt;

            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="50" height="15"/&gt;
                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression class="java.lang.Long"&gt;
                    &lt;![CDATA[$F{id}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="70" y="0" width="100" height="15" /&gt;

                &lt;textElement textAlignment="Left" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$F{name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="190" y="0" width="100" height="15" /&gt;
                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$F{username}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The template contains the detail band, in
which each element is repeated for every record provided by the data source.

&lt;field name="id" class="java.lang.Long"/&gt;
&lt;field name="name"/&gt;
&lt;field name="username"/&gt;

We have three fields. These are automatically mapped to the JSON properties.

report.gvy
  

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.data.JsonDataSource

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def url = 'https://jsonplaceholder.typicode.com/users'
def is = new URL(url).openStream()
def ds = new JsonDataSource(is)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

In the example, we take data from a JsonDataSource.

def url = 'https://jsonplaceholder.typicode.com/users'
def is = new URL(url).openStream()
def ds = new JsonDataSource(is)

We create an input stream to the specified URL. The input stream is then passed
to the JsonDataSource.

def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

The created data source is passed to JasperFillManager.fillReport.

## JasperReports JSON data adapter example

In the second example, we create a data adapter for JSON.

json-adapter.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;jsonDataAdapter class="net.sf.jasperreports.data.json.JsonDataAdapterImpl"&gt;
    &lt;name&gt;json-adapter&lt;/name&gt;
    &lt;dataFile xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="httpDataLocation"&gt;
          &lt;url&gt;https://jsonplaceholder.typicode.com/users&lt;/url&gt;
    &lt;/dataFile&gt;

    &lt;language&gt;json&lt;/language&gt;
    &lt;useConnection&gt;false&lt;/useConnection&gt;
    &lt;timeZone xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:java="http://java.sun.com" xsi:type="java:java.lang.String"&gt;Europe/Prague&lt;/timeZone&gt;
    &lt;locale xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:java="http://java.sun.com" xsi:type="java:java.lang.String"&gt;en_US&lt;/locale&gt;
    &lt;selectExpression&gt;&lt;/selectExpression&gt;

&lt;/jsonDataAdapter&gt;

The data adapter for JSON is created with jsonDataAdapter.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;property name="net.sf.jasperreports.data.adapter" value="json-adapter.xml"/&gt;

    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name"/&gt;
    &lt;field name="username"/&gt;

    &lt;detail&gt;
        &lt;band height="15"&gt;

            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="50" height="15"/&gt;
                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression class="java.lang.Long"&gt;
                    &lt;![CDATA[$F{id}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="70" y="0" width="100" height="15" /&gt;

                &lt;textElement textAlignment="Left" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$F{name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="190" y="0" width="100" height="15" /&gt;
                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$F{username}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the template file.

&lt;property name="net.sf.jasperreports.data.adapter" value="json-adapter.xml"/&gt;

The data adapter is set with the net.sf.jasperreports.data.adapter
property.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='org.apache.httpcomponents', module='httpclient', version='4.5.13')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JREmptyDataSource

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, 
    new JREmptyDataSource())

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

The Groovy file just generates the report. Since JasperReports internally uses 
the Apache HTTP client, we add the necessary dependency.

In this article we have created a PDF file report from JSON data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).