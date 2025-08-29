+++
title = "JasperReports line chart"
date = 2025-08-29T19:57:58.760+01:00
draft = false
description = "Learn how to create line charts in JasperReports. This tutorial provides step-by-step guidance for effective trend visualization."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports line chart

last modified February 12, 2024 

In this article we show how to create a line chart in JasperReports library.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV.

Line chart is a type of chart that displays values which change over time. In
this chart a series of (x, y) values are drawn and connected with lines.

## JasperReports line chart example

In the following example, we place a line chart into a report; the chart shows
temperaturs over time.

report.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
            http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
        name="report" pageWidth="595" pageHeight="842" columnWidth="555"
        leftMargin="20" rightMargin="20" topMargin="20" bottomMargin="20"&gt;

    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="date"/&gt;
    &lt;field name="val" class="java.lang.Double"/&gt;

    &lt;summary&gt;
        &lt;band height="450" splitType="Stretch"&gt;
            &lt;lineChart&gt;
                &lt;chart evaluationTime="Report"&gt;
                    &lt;reportElement x="20" y="20" width="540" height="400"/&gt;
                    &lt;chartTitle position="Top"&gt;
                        &lt;titleExpression&gt;&lt;![CDATA["Line chart"]]&gt;&lt;/titleExpression&gt;
                    &lt;/chartTitle&gt;
                    &lt;chartSubtitle/&gt;
                    &lt;chartLegend/&gt;
                &lt;/chart&gt;
                &lt;categoryDataset&gt;
                    &lt;dataset/&gt;
                    &lt;categorySeries&gt;
                        &lt;seriesExpression&gt;&lt;![CDATA["Temperatures"]]&gt;&lt;/seriesExpression&gt;
                        &lt;categoryExpression&gt;&lt;![CDATA[ $F{date} ]]&gt;&lt;/categoryExpression&gt;
                        &lt;valueExpression&gt;&lt;![CDATA[ $F{val} ]]&gt;&lt;/valueExpression&gt;
                    &lt;/categorySeries&gt;
                &lt;/categoryDataset&gt;
                &lt;linePlot&gt;
                    &lt;plot/&gt;
                    &lt;categoryAxisLabelExpression&gt;&lt;![CDATA["Date"]]&gt;&lt;/categoryAxisLabelExpression&gt;
                    &lt;categoryAxisFormat&gt;
                        &lt;axisFormat/&gt;
                    &lt;/categoryAxisFormat&gt;
                    &lt;valueAxisLabelExpression&gt;&lt;![CDATA["Temperature"]]&gt;&lt;/valueAxisLabelExpression&gt;
                    &lt;valueAxisFormat&gt;
                        &lt;axisFormat/&gt;
                    &lt;/valueAxisFormat&gt;
                &lt;/linePlot&gt;
            &lt;/lineChart&gt;
        &lt;/band&gt;
    &lt;/summary&gt;
&lt;/jasperReport&gt;

The line chart uses the lineChart tag.

&lt;field name="id" class="java.lang.Long"/&gt;
&lt;field name="date"/&gt;
&lt;field name="val" class="java.lang.Double"/&gt;

We have three fields mapped to the datasource. In the chart, we use two of them:
date and val.

&lt;chartTitle position="Top"&gt;
    &lt;titleExpression&gt;&lt;![CDATA["Line chart"]]&gt;&lt;/titleExpression&gt;
&lt;/chartTitle&gt;

The title of the chart is set with chartTitle.

&lt;categoryDataset&gt;
    &lt;dataset/&gt;
    &lt;categorySeries&gt;
        &lt;seriesExpression&gt;&lt;![CDATA["Temperatures"]]&gt;&lt;/seriesExpression&gt;
        &lt;categoryExpression&gt;&lt;![CDATA[ $F{date} ]]&gt;&lt;/categoryExpression&gt;
        &lt;valueExpression&gt;&lt;![CDATA[ $F{val} ]]&gt;&lt;/valueExpression&gt;
    &lt;/categorySeries&gt;
&lt;/categoryDataset&gt;

The $F{date} is used for the x-axis and the $F{val}
for the y-axis.

&lt;linePlot&gt;
    &lt;plot/&gt;
    &lt;categoryAxisLabelExpression&gt;&lt;![CDATA["Date"]]&gt;&lt;/categoryAxisLabelExpression&gt;
    &lt;categoryAxisFormat&gt;
        &lt;axisFormat/&gt;
    &lt;/categoryAxisFormat&gt;
    &lt;valueAxisLabelExpression&gt;&lt;![CDATA["Temperature"]]&gt;&lt;/valueAxisLabelExpression&gt;
    &lt;valueAxisFormat&gt;
        &lt;axisFormat/&gt;
    &lt;/valueAxisFormat&gt;
&lt;/linePlot&gt;

In the linePlot, we can do some formatting of the chart; we add
the labels for the axes.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource
import groovy.transform.Immutable

@Immutable
class Temp {
    long id;
    String date;
    double val;
}

def data = [
    new Temp(1L, "Jan 1", -7.3),
    new Temp(2L, "Jan 10", -3.4),
    new Temp(3L, "Jan 12", -5.0),
    new Temp(4L, "Jan 20", -0.9),
    new Temp(5L, "Jan 30", -2.2),
    new Temp(6L, "Feb 1", 4.8),
    new Temp(7L, "Feb 2", 5.1),
    new Temp(9L, "Feb 5", -1.9),
    new Temp(10L, "Feb 8", 0),
    new Temp(11L, "Feb 12", 2.6)
]

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def ds = new JRBeanCollectionDataSource(data)

def params = [:]
def jPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jPrint, "report.pdf")

This is the Groovy code to generate the report.

def data = [
    new Temp(1L, "Jan 1", -7.3),
    new Temp(2L, "Jan 10", -3.4),
    new Temp(3L, "Jan 12", -5.0),
    new Temp(4L, "Jan 20", -0.9),
    new Temp(5L, "Jan 30", -2.2),
    new Temp(6L, "Feb 1", 4.8),
    new Temp(7L, "Feb 2", 5.1),
    new Temp(9L, "Feb 5", -1.9),
    new Temp(10L, "Feb 8", 0),
    new Temp(11L, "Feb 12", 2.6)
]

This is the data displayed in the line chart.

def ds = new JRBeanCollectionDataSource(data)

We pass the list of data to the JRBeanCollectionDataSource.

def jPrint = JasperFillManager.fillReport(jrReport, params, ds)

The datasource is passed to the JasperFillManager.fillReport.

In this article we have created a line chart with JasperReports library. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).