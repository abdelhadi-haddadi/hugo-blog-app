+++
title = "JasperReports bubble chart"
date = 2025-08-29T19:57:54.226+01:00
draft = false
description = "Learn how to create stunning bubble charts using JasperReports. This tutorial provides step-by-step guidance for effective data visualization."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports bubble chart

last modified February 12, 2024 

JasperReports bubble chart tutorial shows how to create a bubble chart in
JasperReports library.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV.

Bubble chart is a variation of a scatter chart with an additional dimension.
Instead of data points, we use with bubbles. The first two dimensions are
visualized as coordinates. The size of the bubbles represents the additional
dimension.

## JasperReports bubble chart example

In the following example, we place a bubble chart into a report; the chart
displays products.

report.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
            http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
        name="report" pageWidth="595" pageHeight="842" columnWidth="555"
        leftMargin="20" rightMargin="20" topMargin="20" bottomMargin="20"&gt;

    &lt;queryString language="SQL"&gt;
        &lt;![CDATA[SELECT name, price, quantity, market_share FROM products]]&gt;
    &lt;/queryString&gt;

    &lt;field name="name"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;
    &lt;field name="quantity" class="java.lang.Integer"/&gt;
    &lt;field name="market_share" class="java.lang.Integer"/&gt;

    &lt;summary&gt;
        &lt;band height="450" splitType="Stretch"&gt;
            &lt;bubbleChart&gt;
                &lt;chart evaluationTime="Report"&gt;
                    &lt;reportElement x="20" y="20" width="450" height="400"/&gt;
                    &lt;chartTitle position="Top"&gt;
                        &lt;titleExpression&gt;&lt;![CDATA["Products"]]&gt;&lt;/titleExpression&gt;
                    &lt;/chartTitle&gt;
                    &lt;chartSubtitle/&gt;
                    &lt;chartLegend/&gt;
                &lt;/chart&gt;
                &lt;xyzDataset&gt;
                    &lt;dataset/&gt;
                    &lt;xyzSeries&gt;
                        &lt;seriesExpression&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/seriesExpression&gt;
                        &lt;xValueExpression&gt;&lt;![CDATA[$F{quantity}]]&gt;&lt;/xValueExpression&gt;
                        &lt;yValueExpression&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/yValueExpression&gt;
                        &lt;zValueExpression&gt;&lt;![CDATA[$F{market_share} * 5]]&gt;&lt;/zValueExpression&gt;
                    &lt;/xyzSeries&gt;
                &lt;/xyzDataset&gt;
                &lt;bubblePlot&gt;
                    &lt;plot/&gt;
                    &lt;xAxisLabelExpression&gt;&lt;![CDATA["Quantity"]]&gt;&lt;/xAxisLabelExpression&gt;
                    &lt;xAxisFormat&gt;
                        &lt;axisFormat/&gt;
                    &lt;/xAxisFormat&gt;
                    &lt;yAxisLabelExpression&gt;&lt;![CDATA["Price"]]&gt;&lt;/yAxisLabelExpression&gt;
                    &lt;yAxisFormat&gt;
                        &lt;axisFormat/&gt;
                    &lt;/yAxisFormat&gt;
                    &lt;domainAxisMinValueExpression&gt;&lt;![CDATA[0]]&gt;&lt;/domainAxisMinValueExpression&gt;
                    &lt;domainAxisMaxValueExpression&gt;&lt;![CDATA[80]]&gt;&lt;/domainAxisMaxValueExpression&gt;
                    &lt;rangeAxisMinValueExpression&gt;&lt;![CDATA[0]]&gt;&lt;/rangeAxisMinValueExpression&gt;
                    &lt;rangeAxisMaxValueExpression&gt;&lt;![CDATA[1000]]&gt;&lt;/rangeAxisMaxValueExpression&gt;
                &lt;/bubblePlot&gt;
            &lt;/bubbleChart&gt;
        &lt;/band&gt;
    &lt;/summary&gt;
&lt;/jasperReport&gt;

The bubble chart uses the bubbleChart tag.

&lt;queryString language="SQL"&gt;
    &lt;![CDATA[SELECT name, price, quantity, market_share FROM products]]&gt;
&lt;/queryString&gt;

The SQL query selects four columns.

&lt;field name="name"/&gt;
&lt;field name="price" class="java.lang.Integer"/&gt;
&lt;field name="quantity" class="java.lang.Integer"/&gt;
&lt;field name="market_share" class="java.lang.Integer"/&gt;

The fields are mapped to the columns.

&lt;xyzDataset&gt;
    &lt;dataset/&gt;
    &lt;xyzSeries&gt;
        &lt;seriesExpression&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/seriesExpression&gt;
        &lt;xValueExpression&gt;&lt;![CDATA[$F{quantity}]]&gt;&lt;/xValueExpression&gt;
        &lt;yValueExpression&gt;&lt;![CDATA[$F{price}]]&gt;&lt;/yValueExpression&gt;
        &lt;zValueExpression&gt;&lt;![CDATA[$F{market_share} * 5]]&gt;&lt;/zValueExpression&gt;
    &lt;/xyzSeries&gt;
&lt;/xyzDataset&gt;

The $F{name} is used for the labels. The $F{quantity}
is placed on the x-axis while the $F{price} on the y-axis.
The $F{market_share} is used for the z-coordinates; it represents
the bubbles. The scale is manually adjusted by multiplying the values with 5.

&lt;domainAxisMinValueExpression&gt;&lt;![CDATA[0]]&gt;&lt;/domainAxisMinValueExpression&gt;
&lt;domainAxisMaxValueExpression&gt;&lt;![CDATA[80]]&gt;&lt;/domainAxisMaxValueExpression&gt;
&lt;rangeAxisMinValueExpression&gt;&lt;![CDATA[0]]&gt;&lt;/rangeAxisMinValueExpression&gt;
&lt;rangeAxisMaxValueExpression&gt;&lt;![CDATA[1000]]&gt;&lt;/rangeAxisMaxValueExpression&gt;

We adjust the axis values.

report.gvy
  

package com.zetcode

@GrabConfig(systemClassLoader=true)
@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')
@Grab(group='com.h2database', module='h2', version='1.4.200')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JasperFillManager
import groovy.sql.Sql

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def createTable = '''
CREATE TABLE products(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), price INT, quantity INT, market_share INT);
INSERT INTO products(name, price, quantity, market_share) VALUES('Product A', 642, 50, 23);
INSERT INTO products(name, price, quantity, market_share) VALUES('Product B', 540, 23, 47);
INSERT INTO products(name, price, quantity, market_share) VALUES('Product C', 188, 19, 30);
'''

def url = "jdbc:h2:mem:"

Sql.withInstance(url) { sql -&gt;

    sql.execute(createTable)

    def params = [:]
    def jPrint = JasperFillManager.fillReport(jrReport, params, sql.connection)

    JasperExportManager.exportReportToPdfFile(jPrint, "report.pdf")
}

This is the Groovy code to generate the report. We create the data in the
in-memory H2 database.

In this article we have used a bubble chart in our report created with
JasperReports library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).