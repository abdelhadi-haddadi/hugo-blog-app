+++
title = "JasperReports map data sources"
date = 2025-08-29T19:57:58.719+01:00
draft = false
description = "Learn how to use JRMapArrayDataSource and JRMapCollectionDataSource in JasperReports. This tutorial covers advanced data handling techniques."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports map data sources

last modified February 12, 2024

In this article we show how to use JRMapArrayDataSource and
JRMapCollectionDataSource as data sources in JasperReports library.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

JasperReports has two data sources that work with maps of data. 
JRMapArrayDataSource is a datasource that contains data as an 
array of maps. JRMapCollectionDataSource is a datasource that 
contains data as a list of maps. 

## JasperReports map datasource example

In the following example, we generate a report from a collection/array of map 
objects. 

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns = "http://jasperreports.sourceforge.net/jasperreports"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation = "http://jasperreports.sourceforge.net/jasperreports
        http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
    name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;field name="id" class="java.lang.Integer"&gt;
        &lt;fieldDescription&gt;&lt;![CDATA[id]]&gt;&lt;/fieldDescription&gt;
    &lt;/field&gt;

    &lt;field name="name"&gt;
        &lt;fieldDescription&gt;&lt;![CDATA[name]]&gt;&lt;/fieldDescription&gt;
    &lt;/field&gt;

    &lt;field name="occupation"&gt;
        &lt;fieldDescription&gt;&lt;![CDATA[occupation]]&gt;&lt;/fieldDescription&gt;
    &lt;/field&gt;

    &lt;detail&gt;
        &lt;band height="20"&gt;
            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="50" height="20"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{id}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="70" y="0" width="80" height="20"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="170" y="0" width="80" height="20"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{occupation}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

The report template uses three fields: id, name, and 
occupation.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.data.JRMapCollectionDataSource

def users = [
    ['id': 1, 'name': 'John Doe', 'occupation': 'gardener'],
    ['id': 2, 'name': 'Roger Roe', 'occupation': 'driver'],
    ['id': 3, 'name': 'Jane Doe', 'occupation': 'teacher'],
    ['id': 4, 'name': 'Tomas Mudry', 'occupation': 'shopkeeper'],
    ['id': 5, 'name': 'Paul Smith', 'occupation': 'programmer'],
    ['id': 6, 'name': 'Roman Nikolaj', 'occupation': 'programmer'],
    ['id': 7, 'name': 'Lucia Smutna', 'occupation': 'student'],
    ['id': 8, 'name': 'Kevin Smith', 'occupation': 'manager'],
]

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def ds = new JRMapCollectionDataSource(users)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

This example uses the JRMapCollectionDataSource as the data source.

def users = [
    ['id': 1, 'name': 'John Doe', 'occupation': 'gardener'],
    ['id': 2, 'name': 'Roger Roe', 'occupation': 'driver'],
    ['id': 3, 'name': 'Jane Doe', 'occupation': 'teacher'],
    ['id': 4, 'name': 'Tomas Mudry', 'occupation': 'shopkeeper'],
    ['id': 5, 'name': 'Paul Smith', 'occupation': 'programmer'],
    ['id': 6, 'name': 'Roman Nikolaj', 'occupation': 'programmer'],
    ['id': 7, 'name': 'Lucia Smutna', 'occupation': 'student'],
    ['id': 8, 'name': 'Kevin Smith', 'occupation': 'manager'],
]

We define a list of maps. Each map represents user data. The id, 
name, and occupation keys are mapped to the template 
fields. 

def ds = new JRMapCollectionDataSource(users)

From the list of map objects, we create the JRMapCollectionDataSource.

def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

The data source is passed to the JasperFillManager.fillReport
method.

Map[] users = [
    ['id': 1, 'name': 'John Doe', 'occupation': 'gardener'],
    ['id': 2, 'name': 'Roger Roe', 'occupation': 'driver'],
    ['id': 3, 'name': 'Jane Doe', 'occupation': 'teacher'],
    ['id': 4, 'name': 'Tomas Mudry', 'occupation': 'shopkeeper'],
    ['id': 5, 'name': 'Paul Smith', 'occupation': 'programmer'],
    ['id': 6, 'name': 'Roman Nikolaj', 'occupation': 'programmer'],
    ['id': 7, 'name': 'Lucia Smutna', 'occupation': 'student'],
    ['id': 8, 'name': 'Kevin Smith', 'occupation': 'Manager'],
]

def ds = new JRMapArrayDataSource(users)

Alternatively, we can use the JRMapArrayDataSource, which takes 
an array of maps.

In this article we have used JRMapArrayDataSource and JRMapCollectionDataSource
as data sources in JasperReports library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).