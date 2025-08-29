+++
title = "JasperReports import tag"
date = 2025-08-29T19:57:57.603+01:00
draft = false
description = "Learn how to use the import tag in JasperReports templates. This tutorial simplifies the process of template design."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports import tag

last modified February 12, 2024

In this article we show how use the import tag in JasperReports template.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

The import tag is used to import Java classes into the report. It 
eliminates the need to specify full class names in the report expressions.

&lt;import value="java.time.LocalDateTime"/&gt;

This code imports the LocalDateTime class into the report. We can 
use it now without the fully qualified name. The class name is specified in the 
value attribute.

## Example

The example uses the import statement.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import net.sf.jasperreports.engine.JREmptyDataSource

def xmlFile = 'report.xml'
def jrReport = JasperCompileManager.compileReport(xmlFile)

def params = [:]
def jrPrint = JasperFillManager.fillReport(jrReport, params, new JREmptyDataSource())

JasperExportManager.exportReportToPdfFile(jrPrint, 'report.pdf')

The Groovy code compiles, fills, and exports the report.

report.gvy
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns = "http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation = "http://jasperreports.sourceforge.net/jasperreports
                                    http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;import value="java.time.LocalDateTime"/&gt;

    &lt;detail&gt;
        &lt;band height="70"&gt;

            &lt;textField&gt;
                &lt;reportElement x="5" y="5" width="190" height="15"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[LocalDateTime.now()]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="5" y="45" width="190" height="15"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[java.time.Instant.now()]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;
                
        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

In the report, we use two classes: LocalDateTime and
Instant. The first one is imported and can be used without the
package name. The second one must be used with fully qualified name. 

&lt;import value="java.time.LocalDateTime"/&gt;

We import the LocalDateTime into the report.

&lt;textFieldExpression&gt;
    &lt;![CDATA[LocalDateTime.now()]]&gt;
&lt;/textFieldExpression&gt;

In the textFieldExpression, we call the
LocalDateTime.now method.

&lt;textFieldExpression&gt;
    &lt;![CDATA[java.time.Instant.now()]]&gt;
&lt;/textFieldExpression&gt;

Here, we use the full name of the Instant class: 
java.time.Instant.

In this article we have shown how to import Java classes into report expressions
to simplify them.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).