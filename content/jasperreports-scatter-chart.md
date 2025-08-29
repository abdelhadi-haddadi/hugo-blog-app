+++
title = "JasperReports scatter chart"
date = 2025-08-29T19:58:00.981+01:00
draft = false
description = "Learn how to create scatter charts in JasperReports. This tutorial provides step-by-step guidance for visualizing data relationships."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports scatter chart

last modified February 12, 2024 

JasperReports scatter chart tutorial shows how to create a scatter chart in
JasperReports library.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV.

Scatter chart uses Cartesian coordinates to display values for sets of numerical
data, with one variable on each axis.

## JasperReports scatter chart example

In the following example, we place a scatter chart into a report; the chart
displays temperature values.

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
            &lt;scatterChart&gt;
                &lt;chart isShowLegend="true"&gt;
                    &lt;reportElement x="0" y="0" width="450" height="400"/&gt;
                    &lt;chartTitle/&gt;
                    &lt;chartSubtitle/&gt;
                    &lt;chartLegend/&gt;
                &lt;/chart&gt;
                &lt;xyDataset&gt;
                    &lt;dataset/&gt;
                    &lt;xySeries&gt;
                        &lt;seriesExpression&gt;&lt;![CDATA[ "Temperatures" ]]&gt;&lt;/seriesExpression&gt;
                        &lt;xValueExpression&gt;&lt;![CDATA[ $F{id} ]]&gt;&lt;/xValueExpression&gt;
                        &lt;yValueExpression&gt;&lt;![CDATA[ $F{val} ]]&gt;&lt;/yValueExpression&gt;
                    &lt;/xySeries&gt;
                &lt;/xyDataset&gt;
                &lt;scatterPlot isShowLines="false" isShowShapes="true"&gt;
                    &lt;plot backcolor="#959696" backgroundAlpha="0.1"/&gt;
                    &lt;xAxisFormat&gt;
                        &lt;axisFormat/&gt;
                    &lt;/xAxisFormat&gt;
                    &lt;yAxisFormat&gt;
                        &lt;axisFormat/&gt;
                    &lt;/yAxisFormat&gt;
                &lt;/scatterPlot&gt;
            &lt;/scatterChart&gt;
        &lt;/band&gt;
    &lt;/summary&gt;
&lt;/jasperReport&gt;

The scatter chart uses the scatterChart tag.

&lt;field name="id" class="java.lang.Long"/&gt;
&lt;field name="date"/&gt;
&lt;field name="val" class="java.lang.Double"/&gt;

There are three fields in the template. Fields are mapped to the elements of the
data source. In the chart, we utilize the id and the
val fields.

&lt;xyDataset&gt;
    &lt;dataset/&gt;
    &lt;xySeries&gt;
        &lt;seriesExpression&gt;&lt;![CDATA[ "Temperatures" ]]&gt;&lt;/seriesExpression&gt;
        &lt;xValueExpression&gt;&lt;![CDATA[ $F{id} ]]&gt;&lt;/xValueExpression&gt;
        &lt;yValueExpression&gt;&lt;![CDATA[ $F{val} ]]&gt;&lt;/yValueExpression&gt;
    &lt;/xySeries&gt;
&lt;/xyDataset&gt;

On the x-axis, we put the ids and on the y-axis, we put the temperature values.

&lt;scatterPlot isShowLines="false" isShowShapes="true"&gt;
    &lt;plot backcolor="#959696" backgroundAlpha="0.1"/&gt;
    &lt;xAxisFormat&gt;
        &lt;axisFormat/&gt;
    &lt;/xAxisFormat&gt;
    &lt;yAxisFormat&gt;
        &lt;axisFormat/&gt;
    &lt;/yAxisFormat&gt;
&lt;/scatterPlot&gt;

In the scatterPlot, we can customize the chart a bit.

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

We have a list of temperature values.

def ds = new JRBeanCollectionDataSource(data)

def params = [:]
def jPrint = JasperFillManager.fillReport(jrReport, params, ds)

The data is sent to the report engine in the
JRBeanCollectionDataSource.

## Using JRChartCustomizer

In the report template, we have only a limited set of tags and attributes to
modify the scatter chart. For more customizations, we can use the
JRChartCustomizer.

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
            &lt;scatterChart&gt;
                &lt;chart isShowLegend="true" customizerClass="com.zetcode.ScatterChartCustomizer" &gt;
                    &lt;reportElement x="0" y="0" width="450" height="400"/&gt;
                    &lt;chartTitle/&gt;
                    &lt;chartSubtitle/&gt;
                    &lt;chartLegend/&gt;
                &lt;/chart&gt;
                &lt;xyDataset&gt;
                    &lt;dataset/&gt;
                    &lt;xySeries&gt;
                        &lt;seriesExpression&gt;&lt;![CDATA[ "Temperatures" ]]&gt;&lt;/seriesExpression&gt;
                        &lt;xValueExpression&gt;&lt;![CDATA[ $F{id} ]]&gt;&lt;/xValueExpression&gt;
                        &lt;yValueExpression&gt;&lt;![CDATA[ $F{val} ]]&gt;&lt;/yValueExpression&gt;
                    &lt;/xySeries&gt;
                &lt;/xyDataset&gt;
                &lt;scatterPlot isShowLines="false" isShowShapes="true"&gt;
                    &lt;plot/&gt;
                    &lt;xAxisFormat&gt;
                        &lt;axisFormat/&gt;
                    &lt;/xAxisFormat&gt;
                    &lt;yAxisFormat&gt;
                        &lt;axisFormat/&gt;
                    &lt;/yAxisFormat&gt;
                &lt;/scatterPlot&gt;
            &lt;/scatterChart&gt;
        &lt;/band&gt;
    &lt;/summary&gt;
&lt;/jasperReport&gt;

The chart customizer is specified in the chart tag.

lt;chart isShowLegend="true" customizerClass="com.zetcode.ScatterChartCustomizer" &gt;

We apply the chart customizer in the customizerClass attribute of
the chart tag.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource
import groovy.transform.Immutable

import net.sf.jasperreports.engine.JRChart
import net.sf.jasperreports.engine.JRChartCustomizer
import org.jfree.chart.JFreeChart

import java.awt.geom.Ellipse2D
import java.awt.Color

// Report generation

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

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

def ds = new JRBeanCollectionDataSource(data)

def params = [:]
params.put("data", data)

def jPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jPrint, "report.pdf")

// Chart customizer

class ScatterChartCustomizer implements JRChartCustomizer {

    void customize(JFreeChart chart, JRChart jasperChart) {

        def xyPlot = chart.getXYPlot()
        def xyItemRenderer = xyPlot.getRenderer()

        def shape = new Ellipse2D.Double(0, 0, 8, 8)

        xyItemRenderer.setSeriesShape(0, shape)
        xyItemRenderer.setSeriesPaint(0, new Color(0, 124, 156))

        xyPlot.setDomainGridlinesVisible(false)
        xyPlot.setRangeGridlinesVisible(false)
    }
}

The second script uses the JRChartCustomizer to customize the
scatter chart.

void customize(JFreeChart chart, JRChart jasperChart) {

The customization is done in the customize method. The
chart gives access to the methods of the underlying JFreeChart
library while the jasperChart to the methods of the JasperReports'
abstractions.

def xyPlot = chart.getXYPlot()
def xyItemRenderer = xyPlot.getRenderer()

We get hold of the chart renderer.

def shape = new Ellipse2D.Double(0, 0, 8, 8)

xyItemRenderer.setSeriesShape(0, shape)
xyItemRenderer.setSeriesPaint(0, new Color(0, 124, 156))

We change the shape and the colour of the scatter items.

xyPlot.setDomainGridlinesVisible(false)
xyPlot.setRangeGridlinesVisible(false)

We turn off the grid lines.

In this article we have used a scatter chart in our report created with
JasperReports library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).