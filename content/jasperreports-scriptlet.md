+++
title = "JasperReports scriptlet"
date = 2025-08-29T19:58:00.995+01:00
draft = false
description = "Learn how to use scriptlets in JasperReports to extend report functionality. Step-by-step tutorial for advanced customization."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports scriptlet

last modified February 12, 2024 

In this article we work with JasperReport scriptlets.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents in a simple and flexible manner.

Scriptlets are Java classes that provide additional functionality to
JasperReports. We can use scriptlets when report expressions cannot execute more
complex operations. Scriptlets are executed every time a report event occurs.
Values of report variables can be affected through scriptlets.

## Calculating a geometric mean

The following application calculates geometric mean of interest rates. The
geometric mean is defined as the nth root of the product of n numbers. It is
used in growth rates, like population growth or interest rates, where simple
arithmetic mean does not give accurate results.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
                        http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;scriptlet name="MyScriptlet" class="com.zetcode.MyScriptlet"/&gt;

    &lt;parameter name="vals" class="java.util.List"/&gt;
    &lt;variable name="gmean" class="java.lang.Double"/&gt;

    &lt;summary&gt;
        &lt;band height="30"&gt;

            &lt;staticText&gt;
                &lt;reportElement x="0" y="0" width="90" height="15"/&gt;
                &lt;textElement/&gt;
                &lt;text&gt;&lt;![CDATA[Geometric mean: ]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;

            &lt;textField&gt;
                &lt;reportElement x="100" y="0" width="200" height="15"/&gt;
                &lt;textElement/&gt;
                &lt;textFieldExpression class="java.lang.Double"&gt;
                    &lt;![CDATA[$V{gmean}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;
        &lt;/band&gt;
    &lt;/summary&gt;

&lt;/jasperReport&gt;

This is the report template file. The template contains the summary band where
we have one variable: gmean.

&lt;scriptlet name="MyScriptlet" class="com.zetcode.MyScriptlet"/&gt;

A scriptlet is referenced with the scriptlet tag. It is a class
that contains the calculation of the geometric mean.

&lt;parameter name="rets" class="java.util.List"/&gt;
&lt;variable name="gmean" class="java.lang.Double"/&gt;

We have a parameter and a variable. The parameter is a list of interest rate
values. The variable is the computed geometric mean.

&lt;textFieldExpression class="java.lang.Double"&gt;
    &lt;![CDATA[$V{gmean}]]&gt;
&lt;/textFieldExpression&gt;

In the textFieldExpression tag we output the geometric mean.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='org.apache.commons', module='commons-math3', version='3.6.1')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import java.util.List
import net.sf.jasperreports.engine.JRDefaultScriptlet
import net.sf.jasperreports.engine.JREmptyDataSource
import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.renderers.JCommonDrawableRendererImpl

import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics

// Report generation

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def vals = [1.2, 1.8, -1.2, 0.9, 1.1, 3.5, -2.7]

def params = [:]
params.put("vals", vals)

def jrPrint = JasperFillManager.fillReport(jrReport,
        params, new JREmptyDataSource())

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

// Scriptlet class

class MyScriptlet extends JRDefaultScriptlet {

    private DescriptiveStatistics stats

    void afterReportInit() {

        def vals = getParameterValue("vals")
        stats = new DescriptiveStatistics()

        vals.forEach((val) -&gt; stats.addValue(val))
    }

    void afterDetailEval() {
        setVariableValue("gmean", stats.getMean())
    }
}

The Groovy script generates the report.

def vals = [1.2, 1.8, -1.2, 0.9, 1.1, 3.5, -2.7]

These values are our interest rates.

params.put("vals", vals)

The list is placed into the parameters. The list maps to the &lt;parameter
name="vals" class="java.util.List"/&gt; element created in the report.

class MyScriptlet extends JRDefaultScriptlet {

The scriptlet derives from the JRDefaultScriptlet. It provides
default empty implementations for scriptlet events.

private DescriptiveStatistics stats

void afterReportInit() {

    def vals = getParameterValue("vals")
    stats = new DescriptiveStatistics()

    vals.forEach((val) -&gt; stats.addValue(val))
}

After the report has been initialized, we get the vals parameter
containing the interest rate values and insert them into the
DescriptiveStatistics.

void afterDetailEval() {
    setVariableValue("gmean", stats.getMean())
}

After the afterDetailEval event, the geometric mean is calculated
and set to the gmean variable.

## Chart scriptlet

The following application creates a pie chart. It uses the JFreeChart library.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
   "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns = "http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation = "http://jasperreports.sourceforge.net/jasperreports
                        http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report" pageWidth="595" pageHeight="842"
              columnWidth="555" leftMargin="20" rightMargin="20"
              topMargin="20" bottomMargin="20"&gt;

    &lt;scriptlet name="MyScriptlet" class="com.zetcode.MyScriptlet"/&gt;

    &lt;parameter name="langs" class="java.util.Map"/&gt;
    &lt;variable name="Chart" class="net.sf.jasperreports.renderers.JCommonDrawableRendererImpl"
              calculation="System"/&gt;

    &lt;detail&gt;
        &lt;band height="430"&gt;
            &lt;image scaleImage="Clip" hAlign="Center"&gt;
                &lt;reportElement x="0" y="0" width="515" height="300"/&gt;
                &lt;imageExpression&gt;
                    &lt;![CDATA[ $V{Chart} ]]&gt;
                &lt;/imageExpression&gt;
            &lt;/image&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

In the report template template file we have the detail band where
we have the &lt;image&gt; element, which displays the chart.

&lt;scriptlet name="MyScriptlet" class="com.zetcode.MyScriptlet" /&gt;

The scriptlet is a Groovy class that creates the chart object.

&lt;parameter name="langs" class="java.util.Map"/&gt;
&lt;variable name="Chart" class="net.sf.jasperreports.renderers.JCommonDrawableRendererImpl"
            calculation="System"/&gt;

We have a parameter and a variable. The parameter is a map of values to be
displayed in the chart. The variable contains the chart object.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JREmptyDataSource
import net.sf.jasperreports.engine.JRException
import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JRDefaultScriptlet
import net.sf.jasperreports.renderers.JCommonDrawableRendererImpl

import org.jfree.chart.ChartFactory
import org.jfree.data.general.DefaultPieDataset
import org.jfree.util.Rotation

// Report generation

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def langs = [ "Python": 30.2, "C#": 10.0, "Java": 17.5,
    "PHP": 8.5, "Clojure": 1.1]

def params = ["langs": langs]

def jrPrint = JasperFillManager.fillReport(jrReport,
        params, new JREmptyDataSource())

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

// Scriptlet class

class MyScriptlet extends JRDefaultScriptlet {

    void afterReportInit() {

        def langs = getParameterValue("langs")
        def dataset = new DefaultPieDataset()

        langs.forEach(dataset::setValue)

        def chart = ChartFactory.createPieChart3D(
                "Computer languages",
                dataset,
                true,
                true,
                false
        )

        def plot = chart.getPlot()

        plot.setStartAngle(290)
        plot.setDirection(Rotation.CLOCKWISE)
        plot.setForegroundAlpha(0.5f)
        plot.setNoDataMessage("No data to display")

        this.setVariableValue("Chart", new JCommonDrawableRendererImpl(chart))
    }
}

The script compiles the report template and creates a PDF file.

def langs = [ "Python": 30.2, "C#": 10.0, "Java": 17.5,
    "PHP": 8.5, "Clojure": 1.1]

The values in this map are going to be displayed in the pie chart.

def params = ["langs": langs]

The data is passed as a langs parameter.

class MyScriptlet extends JRDefaultScriptlet {

This scriptlet retrieves the data from the langs parameter and
generates a pie chart. The chart is set to the report template variable.

def langs = getParameterValue("langs")

After the report has been initialized, we get the langs parameter
containing the chart data.

def dataset = new DefaultPieDataset()

langs.forEach(dataset::setValue)

The data is set to the DefaultPieDataset.

def chart = ChartFactory.createPieChart3D(
    "Computer languages",
    dataset,
    true,
    true,
    false
)

def plot = chart.getPlot()

plot.setStartAngle(290)
plot.setDirection(Rotation.CLOCKWISE)
plot.setForegroundAlpha(0.5f)
plot.setNoDataMessage("No data to display")

A 3D pie chart is generated.

this.setVariableValue("Chart", new JCommonDrawableRendererImpl(chart))

The generated chart is set to the Chart report template variable.

In this article we have worked with scriptlets; we have calculated a geometric
mean from interest rates and generated a 3D pie chart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).