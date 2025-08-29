+++
title = "JasperReports pie chart"
date = 2025-08-29T19:57:59.858+01:00
draft = false
description = "Learn how to create pie charts in JasperReports. This tutorial provides step-by-step guidance for creating stunning data visuals."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports pie chart

last modified February 12, 2024 

JasperReports pie chart tutorial shows how to create a pie chart in
JasperReports library.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. 

Pie chart is a type of chart that displays data in a circle, divided into
slices. The slices represent the proportions of the values to the total size.

## JasperReports pie chart example

In the following example, we place a pie chart into a report; the chart shows
various fruits and their quantities.

report.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports 
        http://jasperreports.sourceforge.net/xsd/jasperreport.xsd" 
    name="report" pageWidth="595" pageHeight="842" columnWidth="555" 
    leftMargin="20" rightMargin="20" topMargin="20" bottomMargin="20"&gt;

    &lt;field name="name"/&gt;
    &lt;field name="quantity" class="java.lang.Integer"/&gt;

    &lt;summary&gt;
        &lt;band height="450" splitType="Stretch"&gt;
            &lt;pieChart&gt;

                &lt;chart evaluationTime="Report"&gt;
                    &lt;reportElement x="0" y="0" width="350" height="300"/&gt;
                    &lt;chartTitle position="Top"&gt;
                        &lt;titleExpression&gt;&lt;![CDATA["Fruits"]]&gt;&lt;/titleExpression&gt;
                    &lt;/chartTitle&gt;
                    &lt;chartSubtitle/&gt;
                    &lt;chartLegend/&gt;
                &lt;/chart&gt;

                &lt;pieDataset&gt;
                    &lt;dataset resetType="Report"/&gt;
                    &lt;keyExpression&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/keyExpression&gt;
                    &lt;valueExpression&gt;&lt;![CDATA[$F{quantity}]]&gt;&lt;/valueExpression&gt;
                &lt;/pieDataset&gt;

                &lt;piePlot labelFormat="{2}"&gt;
                    &lt;plot/&gt;
                    &lt;itemLabel/&gt;
                &lt;/piePlot&gt;

            &lt;/pieChart&gt;
        &lt;/band&gt;
    &lt;/summary&gt;
&lt;/jasperReport&gt;

The pie chart uses the pieChart tag.

&lt;field name="name"/&gt;
&lt;field name="quantity" class="java.lang.Integer"/&gt;

We have two fields mapped to the datasource: name and
quantity.

&lt;chartTitle position="Top"&gt;
    &lt;titleExpression&gt;&lt;![CDATA["Fruits"]]&gt;&lt;/titleExpression&gt;
&lt;/chartTitle&gt;

The title of the chart is set with chartTitle.

&lt;piePlot labelFormat="{2}"&gt;
    &lt;plot/&gt;
    &lt;itemLabel/&gt;
&lt;/piePlot&gt;

With the labelFormat attribute, we show the percentages in the 
slices.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.data.JRMapCollectionDataSource

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def fruits = [ 
    [ "name": "Oranges", "quantity": 38], 
    [ "name": "Pears", "quantity": 45], 
    [ "name": "Plums", "quantity": 24], 
    [ "name": "Cherries", "quantity": 10], 
]

def ds = new JRMapCollectionDataSource(fruits)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

This is the Groovy code to generate the report. 

def fruits = [ 
    [ "name": "Oranges", "quantity": 38], 
    [ "name": "Pears", "quantity": 45], 
    [ "name": "Plums", "quantity": 24], 
    [ "name": "Cherries", "quantity": 10], 
]

This is the data displayed in the pie chart; it is a list of maps.

def ds = new JRMapCollectionDataSource(fruits)

We use the JRMapCollectionDataSource as the datasource.

def jPrint = JasperFillManager.fillReport(jrReport, params, ds)

The datasource is passed to the JasperFillManager.fillReport.

In this article we have created a pie chart with JasperReports library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).