+++
title = "JasperReports textField's textAdjust"
date = 2025-08-29T19:58:02.091+01:00
draft = false
description = "Learn how to use the textAdjust attribute in JasperReports. This tutorial provides step-by-step guidance for enhancing text presentation."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports textField's textAdjust

last modified February 21, 2024

In this article we cover textField's textAdjust attribute in JasperReports
library.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

The textAdjust attribute in JasperReports is used to control the
behavior of a text field when the content is too large for the defined
dimensions. It was introduced in JasperReports Library 7.5.0, replacing the
deprecated isStretchWithOverflow attribute.

It can take the following values:

    - StretchHeight - allows the text field to expand vertically if the content overflows

    - CutText - cuts off the text if it's longer than the width of the field

    - ScaleFont - scales the font size to fit the text within the field

## Example

The next example demonstrates all three options.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns = "http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation = "http://jasperreports.sourceforge.net/jasperreports
                                    http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;style name="defFont" isDefault="true" vAlign="Top" hAlign="Left"/&gt;
    &lt;parameter name="text"/&gt;

    &lt;detail&gt;
        &lt;band height="330"&gt;

            &lt;rectangle&gt;
                &lt;reportElement x="3" y="3" width="490" height="85"/&gt;
            &lt;/rectangle&gt;

            &lt;textField textAdjust="CutText"&gt;
                &lt;reportElement x="5" y="5" width="490" height="80"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$P{text}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;rectangle&gt;
                &lt;reportElement x="3" y="90" width="490" height="105"/&gt;
            &lt;/rectangle&gt;

            &lt;textField textAdjust="StretchHeight"&gt;
                &lt;reportElement x="5" y="95" width="490" height="80"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$P{text}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;rectangle&gt;
                &lt;reportElement x="3" y="200" width="490" height="85"/&gt;
            &lt;/rectangle&gt;

            &lt;textField textAdjust="ScaleFont"&gt;
                &lt;reportElement x="5" y="205" width="490" height="80"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$P{text}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

We have three text fields in the report.

&lt;parameter name="text"/&gt;

The larger text is passed to the report via the name parameter.

&lt;textField textAdjust="CutText"&gt;
    &lt;reportElement x="5" y="5" width="490" height="80"/&gt;
    &lt;textFieldExpression&gt;
        &lt;![CDATA[$P{text}]]&gt;
    &lt;/textFieldExpression&gt;
&lt;/textField&gt;

In this textField, we set the textAdjust property 
to CutText value.

&lt;rectangle&gt;
    &lt;reportElement x="3" y="90" width="490" height="105"/&gt;
&lt;/rectangle&gt;

To understand where the text fields begin and end, we place rectangles around 
them.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JREmptyDataSource

def text = '''
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id justo 
lacus. Nullam semper sed nulla finibus semper. Sed tristique ipsum et
ullamcorper ullamcorper. In interdum sapien eu scelerisque faucibus. Sed nec ex
at tortor varius aliquet. Donec cursus lorem massa, faucibus auctor neque
dignissim id. Quisque eu ultrices nisl, et commodo ligula. Phasellus neque nunc,
interdum quis lectus a, cursus egestas tellus. Fusce dictum ligula sed porta
scelerisque. 
'''

def xmlFile = 'report.xml'
def jreport = JasperCompileManager.compileReport(xmlFile)

def params = ['text': text]
def jrPrint = JasperFillManager.fillReport(jreport, params,
        new JREmptyDataSource())

JasperExportManager.exportReportToPdfFile(jrPrint, 'report.pdf')

This Groovy file builds the report. We define the text and passed it via a 
text parameter to the report.

In this article we have worked with the textField's textAdjust
attribute.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).