+++
title = "JasperReports group"
date = 2025-08-29T19:57:56.496+01:00
draft = false
description = "Learn how to group data effectively in JasperReports. This tutorial provides step-by-step guidance for creating organized reports."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports group

last modified February 12, 2024 

A group in JasperReports helps to build structure in our data. It is defined by
an expression containing fields and variables that define the criteria for
inclusion in that group.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

A report group has three elements:

    - Group expression − indicates the data that must change to start a new data group

    - Group header − places label at the beginning of the grouped data

    - Group footer − places label at the end of the grouped data

The header and/or footer is optional.

These are the group attributes:

    - name - references the group in report expressions by name

    - isStartNewColumn - each data group begins on a new column

    - isStartNewPage - each data group begins on a new page

    - isResetPageNumber - the report page number is reset every time a new group starts

    - isReprintHeaderOnEachPage - the group header will be reprinted on every page

    - minHeightToStartNewPage - defines minimum amount of vertical space needed at the bottom of the column in order to place the group header on the current column; the amount is specified in report units.

    - footerPosition - renders position of the group footer on the page, as well as its behavior in relation to the report sections that follow it (Normal, StackAtBottom, ForceAtBottom, and CollateAtBottom. Default value is Normal)

    - keepTogether - prevents the group from splitting on its first break attempt

## JasperReports group data example

The example divides cars into two groups: automatic and manual transmissions.
For correct output, the data must be sorted. When we create a new group, a new
GROUPNAME_COUNT variable is created; in our case
am_group_COUNT.

cars.csv
  

"name","mpg","cyl","disp","hp","drat","wt","qsec","vs","am","gear","carb"
"Mazda RX4",21,6,160,110,3.9,2.62,16.46,0,1,4,4
"Mazda RX4 Wag",21,6,160,110,3.9,2.875,17.02,0,1,4,4
"Datsun 710",22.8,4,108,93,3.85,2.32,18.61,1,1,4,1
"Hornet 4 Drive",21.4,6,258,110,3.08,3.215,19.44,1,0,3,1
"Hornet Sportabout",18.7,8,360,175,3.15,3.44,17.02,0,0,3,2
"Valiant",18.1,6,225,105,2.76,3.46,20.22,1,0,3,1
"Duster 360",14.3,8,360,245,3.21,3.57,15.84,0,0,3,4
"Merc 240D",24.4,4,146.7,62,3.69,3.19,20,1,0,4,2
"Merc 230",22.8,4,140.8,95,3.92,3.15,22.9,1,0,4,2
"Merc 280",19.2,6,167.6,123,3.92,3.44,18.3,1,0,4,4
"Merc 280C",17.8,6,167.6,123,3.92,3.44,18.9,1,0,4,4
"Merc 450SE",16.4,8,275.8,180,3.07,4.07,17.4,0,0,3,3
"Merc 450SL",17.3,8,275.8,180,3.07,3.73,17.6,0,0,3,3
"Merc 450SLC",15.2,8,275.8,180,3.07,3.78,18,0,0,3,3
"Cadillac Fleetwood",10.4,8,472,205,2.93,5.25,17.98,0,0,3,4
"Lincoln Continental",10.4,8,460,215,3,5.424,17.82,0,0,3,4
"Chrysler Imperial",14.7,8,440,230,3.23,5.345,17.42,0,0,3,4
"Fiat 128",32.4,4,78.7,66,4.08,2.2,19.47,1,1,4,1
"Honda Civic",30.4,4,75.7,52,4.93,1.615,18.52,1,1,4,2
"Toyota Corolla",33.9,4,71.1,65,4.22,1.835,19.9,1,1,4,1
"Toyota Corona",21.5,4,120.1,97,3.7,2.465,20.01,1,0,3,1
"Dodge Challenger",15.5,8,318,150,2.76,3.52,16.87,0,0,3,2
"AMC Javelin",15.2,8,304,150,3.15,3.435,17.3,0,0,3,2
"Camaro Z28",13.3,8,350,245,3.73,3.84,15.41,0,0,3,4
"Pontiac Firebird",19.2,8,400,175,3.08,3.845,17.05,0,0,3,2
"Fiat X1-9",27.3,4,79,66,4.08,1.935,18.9,1,1,4,1
"Porsche 914-2",26,4,120.3,91,4.43,2.14,16.7,0,1,5,2
"Lotus Europa",30.4,4,95.1,113,3.77,1.513,16.9,1,1,5,2
"Ford Pantera L",15.8,8,351,264,4.22,3.17,14.5,0,1,5,4
"Ferrari Dino",19.7,6,145,175,3.62,2.77,15.5,0,1,5,6
"Maserati Bora",15,8,301,335,3.54,3.57,14.6,0,1,5,8
"Volvo 142E",21.4,4,121,109,4.11,2.78,18.6,1,1,4,2

This is the cars.csv file.

These are the column names descriptions:

    - mpg - Miles/(US) gallon

    - cyl - # of cyllinders

    - disp - displacement (cu.in.)

    - hp - gross horsepower

    - dtrat - rear axle ration

    - wt - weight (1000 lbs)

    - qsec - 1/4 mile time

    - vs - Engine (0 - V-shaped, 1 - straight)

    - am - transmission (0 - automatic, 1 - manual)

    - gear - # of forward gears

    - carb - # of carburators

report.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
    http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
    name="report" pageWidth="595" pageHeight="842" columnWidth="555" leftMargin="20" rightMargin="20"
    topMargin="20" bottomMargin="20"&gt;

    &lt;field name="name" class="java.lang.String"/&gt;
    &lt;field name="mpg" class="java.lang.Double"/&gt;
    &lt;field name="cyl" class="java.lang.Integer"/&gt;
    &lt;field name="disp" class="java.lang.Double"/&gt;
    &lt;field name="hp" class="java.lang.Integer"/&gt;
    &lt;field name="drat" class="java.lang.Double"/&gt;
    &lt;field name="wt" class="java.lang.Double"/&gt;
    &lt;field name="qsec" class="java.lang.Double"/&gt;
    &lt;field name="vs" class="java.lang.Integer"/&gt;
    &lt;field name="am" class="java.lang.Integer"/&gt;
    &lt;field name="gear" class="java.lang.Integer"/&gt;
    &lt;field name="carb" class="java.lang.Integer"/&gt;
    &lt;sortField name="am"/&gt;

    &lt;group name="am_group" isStartNewPage="true" isReprintHeaderOnEachPage="true"&gt;

        &lt;groupExpression&gt;&lt;![CDATA[$F{am}]]&gt;&lt;/groupExpression&gt;
        &lt;groupHeader&gt;
            &lt;band height="42"&gt;

                &lt;textField&gt;
                    &lt;reportElement x="0" y="5" width="100" height="30"/&gt;
                    &lt;textElement&gt;
                        &lt;font isBold="true"/&gt;
                    &lt;/textElement&gt;
                    &lt;textFieldExpression&gt;&lt;![CDATA[ $F{am} == 0 ? "Automatic" : "Manual" ]]&gt;&lt;/textFieldExpression&gt;
                &lt;/textField&gt;

                &lt;line direction="BottomUp"&gt;
                    &lt;reportElement x="0" y="21" width="569" height="1"&gt;
                        &lt;printWhenExpression&gt;&lt;![CDATA[$V{COLUMN_COUNT} == $V{am_group_COUNT}]]&gt;&lt;/printWhenExpression&gt;
                    &lt;/reportElement&gt;
                &lt;/line&gt;
            &lt;/band&gt;
        &lt;/groupHeader&gt;

        &lt;groupFooter&gt;
            &lt;band height="52"&gt;
                &lt;textField&gt;
                    &lt;reportElement x="0" y="11" width="100" height="30"/&gt;
                    &lt;textElement&gt;
                        &lt;font isBold="true"/&gt;
                    &lt;/textElement&gt;
                    &lt;textFieldExpression&gt;&lt;![CDATA[$V{am_group_COUNT}]]&gt;&lt;/textFieldExpression&gt;
                &lt;/textField&gt;
            &lt;/band&gt;
        &lt;/groupFooter&gt;

    &lt;/group&gt;

    &lt;columnHeader&gt;
        &lt;band height="44" splitType="Stretch"&gt;
            &lt;staticText&gt;
                &lt;reportElement x="0" y="0" width="49" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[name]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="58" y="0" width="40" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[mpg]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="104" y="0" width="46" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[cyl]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="150" y="0" width="38" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[disp]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="198" y="0" width="46" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[hp]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="244" y="0" width="46" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[drat]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="290" y="0" width="46" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[wt]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="340" y="0" width="64" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[qsec]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="410" y="0" width="20" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[vs]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="450" y="0" width="26" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[am]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="490" y="0" width="32" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[gear]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
            &lt;staticText&gt;
                &lt;reportElement x="530" y="0" width="38" height="30"/&gt;
                &lt;text&gt;&lt;![CDATA[carb]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
        &lt;/band&gt;
    &lt;/columnHeader&gt;

    &lt;detail&gt;
        &lt;band height="49" splitType="Stretch"&gt;
            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="49" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{name}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="58" y="0" width="46" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{mpg}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="104" y="0" width="46" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{cyl}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="150" y="0" width="38" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{disp}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="198" y="0" width="46" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{hp}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="244" y="0" width="46" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{drat}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="290" y="0" width="46" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{wt}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="340" y="0" width="64" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{qsec}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="410" y="0" width="20" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{vs}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="450" y="0" width="26" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{am}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="490" y="0" width="32" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{gear}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
            &lt;textField&gt;
                &lt;reportElement x="530" y="0" width="38" height="30"/&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$F{carb}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template file.

&lt;group name="am_group" isStartNewPage="true" isReprintHeaderOnEachPage="true"&amp;gr;

The am_group group is defined.

&lt;groupExpression&gt;&lt;![CDATA[$F{am}]]&gt;&lt;/groupExpression&gt;

The data is separated by the $F{am} field into two groups.

&lt;textField&gt;
    &lt;reportElement x="0" y="5" width="100" height="30"/&gt;
    &lt;textElement&gt;
        &lt;font isBold="true"/&gt;
    &lt;/textElement&gt;
    &lt;textFieldExpression&gt;&lt;![CDATA[ $F{am} == 0 ? "Automatic" : "Manual" ]]&gt;&lt;/textFieldExpression&gt;
&lt;/textField&gt;

&lt;line direction="BottomUp"&gt;
    &lt;reportElement x="0" y="21" width="569" height="1"&gt;
        &lt;printWhenExpression&gt;&lt;![CDATA[$V{COLUMN_COUNT} == $V{am_group_COUNT}]]&gt;&lt;/printWhenExpression&gt;
    &lt;/reportElement&gt;
&lt;/line&gt;

In the group header, we have the description and a horizontal line. The line is
displayed only when a new group is started; i.e. twice.

&lt;textField&gt;
    &lt;reportElement x="0" y="11" width="100" height="30"/&gt;
    &lt;textElement&gt;
        &lt;font isBold="true"/&gt;
    &lt;/textElement&gt;
    &lt;textFieldExpression&gt;&lt;![CDATA[$V{am_group_COUNT}]]&gt;&lt;/textFieldExpression&gt;
&lt;/textField&gt;

In the group footer, we display the number of items in that particular group.
We utilize the am_group_COUNT variable.

report.gvy
  

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.data.JRCsvDataSource

def xmlFile = "report.xml"
def jrReport = JasperCompileManager.compileReport(xmlFile)

def fileName = "cars.csv"
def ds = new JRCsvDataSource(fileName)
ds.setUseFirstRowAsHeader(true)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, ds)

JasperExportManager.exportReportToPdfFile(jrPrint, "report.pdf")

We load the data from the CSV file using JRCsvDataSource.

ds.setUseFirstRowAsHeader(true)

With setUseFirstRowAsHeader we tell JasperReports that the first
line of the CSV file are headers.

In this article we have created a PDF file report with grouped data.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).