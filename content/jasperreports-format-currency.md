+++
title = "JasperReports format currency"
date = 2025-08-29T19:57:56.483+01:00
draft = false
description = "Learn how to format currency in JasperReports. This tutorial provides step-by-step guidance for creating professional financial reports."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports format currency

last modified February 12, 2024 

JasperReports format currency tutorial shows how to format currency in a report
created with JasperReports library.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

Different cultures use different ways to represent numbers. For instance, the
way currencies are formatted is very different in the countries around the
world.

## JasperReports format currency

The following application loads data from a CSV file and formats the price
values.

jasperreports.properties
  

net.sf.jasperreports.default.locale=sk_SK

We can set the default local with the
net.sf.jasperreports.default.locale property.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
   "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report2" pageWidth="595" pageHeight="842"
              columnWidth="555" leftMargin="20" rightMargin="20"
              topMargin="20" bottomMargin="20"&gt;

    &lt;style name="currency" vAlign="Middle" hAlign="Center" fontName="DejaVu Sans"/&gt;

    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;

    &lt;detail&gt;
        &lt;band height="15"&gt;
            &lt;textField&gt;
                &lt;reportElement x="10" y="0" width="50" height="15" /&gt;
                &lt;textElement textAlignment="Left" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression class="java.lang.Long"&gt;
                    &lt;![CDATA[$F{id}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="60" y="0" width="100" height="15" /&gt;
                &lt;textElement textAlignment="Left" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$F{name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="170" y="0" width="100" height="15" style="currency"/&gt;
                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;
                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[ NumberFormat.getCurrencyInstance($P{REPORT_LOCALE}).format($F{price}) ]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template.

&lt;![CDATA[ NumberFormat.getCurrencyInstance($P{REPORT_LOCALE}).format($F{price}) ]]&gt;

We format the price of the car with NumberFormat; we retrieve the
current locale with $P{REPORT_LOCALE}.

report.gvy
  

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='net.sf.jasperreports', module='jasperreports-fonts', version='6.21.0')
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

def params = [REPORT_LOCALE: new Locale("sk", "SK")]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

In the example, we take data from a JRBeanCollectionDataSource.

def params = [REPORT_LOCALE: new Locale("sk", "SK")]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

One way to choose the current locale is by setting the
REPORT_LOCALE parameter. This takes precedence over the property
in the jasperreports.properties file.

In this article we have created a PDF file report in which we formatted the
currency values.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).