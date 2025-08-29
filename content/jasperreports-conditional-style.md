+++
title = "JasperReports conditional style"
date = 2025-08-29T19:57:55.372+01:00
draft = false
description = "Master conditional styling in JasperReports. Learn how to apply dynamic styles to your reports based on specific conditions."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports conditional style

last modified February 12, 2024 

In this article we use conditional styling in JasperReports library. Conditional
styles can be set with conditionalStyle and
conditionExpression tags.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

## JasperReports conditional style example

The following application uses a bold text for every second row in the report.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
                                    http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;style name="alt"&gt;
        &lt;conditionalStyle&gt;
            &lt;conditionExpression&gt;
                &lt;![CDATA[$V{COLUMN_COUNT} % 2 == 0]]&gt;
            &lt;/conditionExpression&gt;

            &lt;style isBold="true"/&gt;
        &lt;/conditionalStyle&gt;
    &lt;/style&gt;

    &lt;field name="name"/&gt;
    &lt;field name="quantity" class="java.lang.Integer"/&gt;

    &lt;detail&gt;
        &lt;band height="20"&gt;
            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="80" height="20" style="alt"/&gt;
                &lt;textElement textAlignment="Right"/&gt;
                &lt;textFieldExpression class="java.lang.String"&gt;
                    &lt;![CDATA[$F{name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="100" y="0" width="80" height="20" style="alt"/&gt;
                &lt;textElement textAlignment="Right"/&gt;
                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[$F{quantity}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file. The report contains two columns.

&lt;style name="alt"&gt;
    &lt;conditionalStyle&gt;
        &lt;conditionExpression&gt;
            &lt;![CDATA[$V{COLUMN_COUNT} % 2 == 0]]&gt;
        &lt;/conditionExpression&gt;

        &lt;style isBold="true"/&gt;
    &lt;/conditionalStyle&gt;
&lt;/style&gt;

The conditionalStyle and conditionExpression tags are
used to define a conditional style. The $V{COLUMN_COUNT} % 2 == 0
expression applies the style on every second row. The COLUMN_COUNT
is a built-in variable referring to the current row being processed by
JasperReports. (The name of the variable is misleading.)

&lt;staticText&gt;
    &lt;reportElement mode="Opaque" x="0" y="0" width="260"
                   height="16" style="alt"/&gt;
    &lt;textElement /&gt;
    &lt;text&gt;&lt;![CDATA[]]&gt; &lt;/text&gt;
&lt;/staticText&gt;

The style is specified with the style attribute of the 
reportElement; the element must be opaque.

&lt;field name="name"/&gt;
&lt;field name="quantity" class="java.lang.Integer"/&gt;;

The fields are mapped to the map keys.

&lt;textField&gt;
    &lt;reportElement x="60" y="0" width="80" height="16" style="row"/&gt;
    &lt;textElement /&gt;
    &lt;textFieldExpression class="java.lang.String"&gt;
        &lt;![CDATA[$F{Name}]]&gt;
    &lt;/textFieldExpression&gt;
&lt;/textField&gt;

The value of the Name field is shown in the textField
using the $F{} syntax.

report.gvy
  

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='net.sf.jasperreports', module='jasperreports-fonts', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.data.JRMapCollectionDataSource

def data = [
    ['name': 'pen', 'quantity': 5],
    ['name': 'table', 'quantity': 3],
    ['name': 'book', 'quantity': 20],
    ['name': 'cup', 'quantity': 7]
]

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def ds = new JRMapCollectionDataSource(data)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

The example generates a report where every second row is displayed in bold.

@Grab(group='net.sf.jasperreports', module='jasperreports-fonts', version='6.21.0')

We need the jasperreports-fonts library to display text in bold.

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

The XML template file is compiled into a JasperReport.
JasperReport is a compiled template ready to be filled with data.

def data = [
    ['name': 'pen', 'quantity': 5],
    ['name': 'table', 'quantity': 3],
    ['name': 'book', 'quantity': 20],
    ['name': 'cup', 'quantity': 7]
]

The data is a simple list of maps.

def ds = new JRMapCollectionDataSource(data)

The data source is a JRMapCollectionDataSource.

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

A JasperPrint object is created; an object that can be
viewed, printed, or exported to other formats. We pass the data source to
the JasperFillManager.fillReport method. There are no
parameters.

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

The JasperExportManager.exportReportToPdfFile method
exports the JasperPrint into a PDF file.

In this article we have applied conditional styling on a report.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).