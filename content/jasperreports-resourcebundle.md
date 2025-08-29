+++
title = "JasperReports ResourceBundle"
date = 2025-08-29T19:57:59.853+01:00
draft = false
description = "Learn how to create multilingual reports in JasperReports using ResourceBundle. Step-by-step tutorial for effective localization."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports ResourceBundle

last modified February 21, 2024 

In this article we create a report in multiple languages in JasperReports
library. The sources for the example can be found at the author's Github 
[repository](https://github.com/janbodnar/JasperReports-Skolenie/tree/main/examples/advanced/locale).

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

A resource bundle is a Java properties file that contains
locale-specific data. It is a way of internationalizing Java applications by
making the code locale-independent.

## Localized report in JasperReports

The following application creates a report that can be generated in three
different languages.

flags
├── england.png
├── russia.png
└── slovakia.png
in18
├── labels.properties
├── labels_ru.properties
└── labels_sk.properties
report.gvy
report.xml

This is the project structure. 

in18/labels.properties
  

message=Tea report
flag=flags/england.png

These are English properties.

in18/labels_ru.properties
  

message=Чайный oтчет
flag=flags/russia.png

These are Russian properties.

in18/labels_sk.properties
  

message=Čajový report
flag=flags/slovakia.png

These are Slovak properties.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
   "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns = "http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation = "http://jasperreports.sourceforge.net/jasperreports
                                    http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report2" pageWidth="595" pageHeight="842"
              columnWidth="555" leftMargin="20" rightMargin="20"
              topMargin="20" bottomMargin="20"&gt;

    &lt;style name="title" fontSize="18" fontName="DejaVu Sans" hAlign="Center" /&gt;

    &lt;background&gt;
        &lt;band height="802"&gt;
            &lt;staticText&gt;
                &lt;reportElement mode="Opaque" x="0" y="0" width="555"
                               height="802" backcolor="#cccccc"/&gt;
                &lt;textElement/&gt;
                &lt;text&gt;&lt;![CDATA[]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
        &lt;/band&gt;
    &lt;/background&gt;

    &lt;title&gt;
        &lt;band height="200"&gt;

            &lt;textField&gt;
                &lt;reportElement x="0" y="10" width="595" height="25" style="title" /&gt;
                &lt;textElement /&gt;

                &lt;textFieldExpression class = "java.lang.String"&gt;
                    &lt;![CDATA[$R{message}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;image&gt;
                &lt;reportElement x="15" y="50" width="150" height="100" /&gt;
                &lt;imageExpression&gt;&lt;![CDATA[$R{flag}]]&gt;&lt;/imageExpression&gt;
            &lt;/image&gt;

        &lt;/band&gt;
    &lt;/title&gt;

&lt;/jasperReport&gt;

This is the report template file. It displays a localized text and image.

&lt;background&gt;
    &lt;band height="802"&gt;
        &lt;staticText&gt;
            &lt;reportElement mode="Opaque" x="0" y="0" width="555"
                            height="802" backcolor="#cccccc"/&gt;
            &lt;textElement/&gt;
            &lt;text&gt;&lt;![CDATA[]]&gt;&lt;/text&gt;
        &lt;/staticText&gt;
    &lt;/band&gt;
&lt;/background&gt;

Some flags have a white stripe; therefore, we change the background colour of
the report using the backcolor tag.

&lt;textFieldExpression class = "java.lang.String"&gt;
    &lt;![CDATA[$R{message}]]&gt;
&lt;/textFieldExpression&gt;

The message of the report is retrieved from the properties file with the
$R{} syntax.

&lt;image&gt;
    &lt;reportElement x="15" y="50" width="150" height="100" /&gt;
    &lt;imageExpression&gt;&lt;![CDATA[$R{flag}]]&gt;&lt;/imageExpression&gt;
&lt;/image&gt;

Similarly, we get the path to the flag with the $R{} syntax. The
path is passed to the imageExpression tag.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='net.sf.jasperreports', module='jasperreports-fonts', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JREmptyDataSource

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def bundle = ResourceBundle.getBundle("in18/labels", new Locale("ru", "RU"))

def params = ["REPORT_RESOURCE_BUNDLE": bundle]
def jrPrint = JasperFillManager.fillReport(jrReport, params, 
    new JREmptyDataSource())

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

The JasperResourceBundle creates a JasperPrint file
from the data source and the report.xml template.
JasperPrintrepresents a page-oriented document that can be viewed,
printed, or exported to other formats.

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

The XML template file is compiled into a JasperReport.
JasperReport is a compiled template ready to be filled
with data.

def bundle = ResourceBundle.getBundle("in18/labels", new Locale("ru", "RU"))

A ResourceBundle is created. Is specifies the location of the
properties files and the current locale used.

def params = ["REPORT_RESOURCE_BUNDLE": bundle]

The bundle is passed as a REPORT_RESOURCE_BUNDLE parameter to the
report.

def jrPrint = JasperFillManager.fillReport(jrReport, params, 
    new JREmptyDataSource())

A JasperPrint object is created; an object that can be viewed,
printed, or exported to other formats. We pass an empty data source and
parameters to the JasperFillManager.fillReport method.

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

The JasperExportManager.exportReportToPdfFile method exports the
JasperPrint into a PDF file.

In this article we have generated a multi-language report in JasperReports.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).