+++
title = "JasperReports noData"
date = 2025-08-29T19:57:59.864+01:00
draft = false
description = "Learn how to handle scenarios with no data in JasperReports. This tutorial provides practical steps for generating empty reports gracefully."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports noData

last modified February 12, 2024 

JasperReports noData tutorial shows how to generate report when no data is
available.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

## JasperReports noData section

The noData section can be used in a report when the datasource is
empty. When there is no data, JasperReports generates a blank page. 
To generate the noData section with empty datasource, we define 
the section in the report and set the whenNoDataType of the 
jasperReport tag to NoDataSection. 
(The default is BlankPage).

## JasperReports noData example

The following application generates the noData section when there
is an empty datasource.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              whenNoDataType="NoDataSection"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;field name="id" class="java.lang.Long"/&gt;
    &lt;field name="name"/&gt;
    &lt;field name="price" class="java.lang.Integer"/&gt;

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
                &lt;reportElement x="150" y="0" width="100" height="15" /&gt;

                &lt;textElement textAlignment="Left" verticalAlignment="Middle"/&gt;

                &lt;textFieldExpression class="java.lang.String"&gt;
                    &lt;![CDATA[$F{name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="200" y="0" width="100" height="15" /&gt;
                &lt;textElement textAlignment="Right" verticalAlignment="Middle"/&gt;

                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[$F{price}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

    &lt;noData&gt;
        &lt;band height="15"&gt;
            &lt;staticText&gt;
                &lt;reportElement x="0" y="0" width="200" height="15"/&gt;
                &lt;box&gt;
                    &lt;bottomPen lineWidth="1.0" lineColor="#CCCCCC"/&gt;
                &lt;/box&gt;
                &lt;textElement /&gt;
                &lt;text&gt;&lt;![CDATA[The report has no data]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
        &lt;/band&gt;
    &lt;/noData&gt;

&lt;/jasperReport&gt;

This is the report template file. The template contains the detail
band and the noData band. The former is generated when there is
some data, the latter when there is no data. 

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
    whenNoDataType="NoDataSection"
    name="report" topMargin="20" bottomMargin="20"&gt;

The whenNoDataType attribute is set to NoDataSection.
By default, the attribute is set to blankPage.

&lt;noData&gt;
    &lt;band height="15"&gt;
        &lt;staticText&gt;
            &lt;reportElement x="0" y="0" width="200" height="15"/&gt;
            &lt;box&gt;
                &lt;bottomPen lineWidth="1.0" lineColor="#CCCCCC"/&gt;
            &lt;/box&gt;
            &lt;textElement /&gt;
            &lt;text&gt;&lt;![CDATA[The report has no data]]&gt;&lt;/text&gt;
        &lt;/staticText&gt;
    &lt;/band&gt;
&lt;/noData&gt;

The noData contains a static text that is displayed in case 
there is no data. The static text says: *The report has no data*.

report.gvy
  

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
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

def data = [
    new Car(1L, 'Audi', 52642),
    new Car(2L, 'Mercedes', 57127),
    new Car(3L, 'Skoda', 9000),
    new Car(4L, 'Volvo', 29000),
    new Car(5L, 'Bentley', 350000),
    new Car(6L, 'Citroen', 21000),
    new Car(7L, 'Hummer', 41400),
    new Car(8L, 'Volkswagen', 21600),
]

def empty = []

def xmlFile = "report.xml"

def jrReport = JasperCompileManager.compileReport(xmlFile)
def ds = new JRBeanCollectionDataSource(empty)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

We have two lists; one of them is empty. Depending on which container we pass to
the JRBeanCollectionDataSource, the report either generates data
from the detail band or the message *The report has no data*.

In this article we have presented the noData section of
JasperReports. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).