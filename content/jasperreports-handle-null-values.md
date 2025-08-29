+++
title = "JasperReports handle null values"
date = 2025-08-29T19:57:56.489+01:00
draft = false
description = "Learn how to handle null values in JasperReports. This tutorial provides practical steps for managing missing data in reports."
image = ""
imageBig = ""
categories = ["jasperreports"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports handle null values

last modified February 12, 2024

In this article we show how to handle null values in JasperReports.

JasperReports is an open-source reporting library. It can create
reports in various formats including PDF, HTML, XLS, or CSV. JasperReports
creates page-oriented, ready-to-print documents.

Data sources often contain null values. These do not look good in our reports; 
therefore, we show how to replace them with empty strings or more descriptive 
messages such as 'N/A'.

&lt;textField isBlankWhenNull="true"&gt;

In order to deal with null values, we can set the isBlankWhenNull
attribute of the textField to true. 

$F{salary} != null ? $F{salary} : 'N/A'

Another option is to use a ternary operator in the textFieldExpression.

class CleanData {

    static String removeNull(def oldval, def newval = '') {
        if (oldval == null) {
            newval
        } else {
            oldval
        }
    }
}

Another option is to define an external method. 

## Example

In the next example, we use the isBlankWhenNull attribute and 
the ternary operator.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')
@Grab(group='com.h2database', module='h2', version='1.4.200')
@GrabConfig(systemClassLoader=true)

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import groovy.sql.Sql

def xmlFile = 'report.xml'
def jrReport = JasperCompileManager.compileReport(xmlFile)

def createTable = '''
CREATE TABLE users(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), occupation VARCHAR(255), salary INT);
INSERT INTO users(name, occupation, salary) VALUES('John Doe', 'gardener', NULL);
INSERT INTO users(name, occupation, salary) VALUES('Roger Roe', 'driver', 940);
INSERT INTO users(name, occupation, salary) VALUES('Roman Novy', 'programmer', 1980);
INSERT INTO users(name, occupation, salary) VALUES('Lucia Biela', NULL, NULL);
INSERT INTO users(name, occupation, salary) VALUES('Tomas Gerber', 'soldier', 1250);
INSERT INTO users(name, occupation, salary) VALUES('Maria Smith', 'teacher', NULL);
INSERT INTO users(name, occupation, salary) VALUES('Oleg Vasil', NULL, 2550);
INSERT INTO users(name, occupation, salary) VALUES('Martin Krajci', 'optician', 2050);
'''

def url = "jdbc:h2:mem:"
Sql.withInstance(url) { sql -&gt;

    sql.execute(createTable)

    def params = [:]
    def jPrint = JasperFillManager.fillReport(jrReport, params, sql.connection)

    JasperExportManager.exportReportToPdfFile(jPrint, "report.pdf")
}

We define a users table inside an in-memory H2 database.

def createTable = '''
CREATE TABLE users(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), occupation VARCHAR(255), salary INT);
INSERT INTO users(name, occupation, salary) VALUES('John Doe', 'gardener', NULL);
INSERT INTO users(name, occupation, salary) VALUES('Roger Roe', 'driver', 940);
INSERT INTO users(name, occupation, salary) VALUES('Roman Novy', 'programmer', 1980);
INSERT INTO users(name, occupation, salary) VALUES('Lucia Biela', NULL, NULL);
INSERT INTO users(name, occupation, salary) VALUES('Tomas Gerber', 'soldier', 1250);
INSERT INTO users(name, occupation, salary) VALUES('Maria Smith', 'teacher', NULL);
INSERT INTO users(name, occupation, salary) VALUES('Oleg Vasil', NULL, 2550);
INSERT INTO users(name, occupation, salary) VALUES('Martin Krajci', 'optician', 2050);
'''

The table contains nulls in the occupation and salary
columns.

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              language="groovy"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;queryString language="SQL"&gt;
        &lt;![CDATA[ SELECT id, name, occupation, salary from users ]]&gt;
    &lt;/queryString&gt;

    &lt;field name="id" class="java.lang.Integer"/&gt;
    &lt;field name="name"/&gt;
    &lt;field name="occupation"/&gt;
    &lt;field name="salary" class="java.lang.Integer" /&gt;

    &lt;title&gt;
        &lt;band height="60"&gt;
            &lt;staticText&gt;
                &lt;reportElement x="0" y="0" width="595" height="35"/&gt;
                &lt;textElement textAlignment="Center"/&gt;
                &lt;text&gt;&lt;![CDATA[Users]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
        &lt;/band&gt;
    &lt;/title&gt;

    &lt;detail&gt;
        &lt;band height="30"&gt;

            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="25" height="25"/&gt;
                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[$F{id}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="30" y="0" width="100" height="25"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$F{name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField isBlankWhenNull="true"&gt;
                &lt;reportElement x="140" y="0" width="70" height="25"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[ $F{occupation} ]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="220" y="0" width="70" height="25"/&gt;
                &lt;textElement textAlignment="Right"/&gt;
                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[ $F{salary} != null ? $F{salary} : 'N/A'  ]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

This is the report template.

&lt;textField isBlankWhenNull="true"&gt;
    &lt;reportElement x="140" y="0" width="70" height="25"/&gt;
    &lt;textFieldExpression&gt;
        &lt;![CDATA[ $F{occupation} ]]&gt;
    &lt;/textFieldExpression&gt;
&lt;/textField&gt;

We set the isBlankWhenNull to true for the
occupation field. Cells with null values will be empty.

&lt;textField&gt;
    &lt;reportElement x="220" y="0" width="70" height="25"/&gt;
    &lt;textElement textAlignment="Right"/&gt;
    &lt;textFieldExpression class="java.lang.Integer"&gt;
        &lt;![CDATA[ $F{salary} != null ? $F{salary} : 'N/A'  ]]&gt;
    &lt;/textFieldExpression&gt;
&lt;/textField&gt;

For the salary field, we use a ternary operator. Nulls will be 
replaced with N/A strings.

In the next example we define an external method that handles nulls.

report.gvy
  

package com.zetcode

@Grab(group='net.sf.jasperreports', module='jasperreports', version='6.21.0')
@Grab(group='com.github.librepdf', module='openpdf', version='1.3.39')
@Grab(group='net.sf.jasperreports', module='jasperreports-fonts', version='6.21.0')
@Grab(group='com.h2database', module='h2', version='1.4.200')
@GrabConfig(systemClassLoader=true)

import net.sf.jasperreports.engine.JasperCompileManager
import net.sf.jasperreports.engine.JasperFillManager
import net.sf.jasperreports.engine.JasperExportManager
import groovy.sql.Sql

def xmlFile = 'report.xml'
def jrReport = JasperCompileManager.compileReport(xmlFile)

def createTable = '''
CREATE TABLE users(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), occupation VARCHAR(255), salary INT);
INSERT INTO users(name, occupation, salary) VALUES('John Doe', 'gardener', NULL);
INSERT INTO users(name, occupation, salary) VALUES('Roger Roe', 'driver', 940);
INSERT INTO users(name, occupation, salary) VALUES('Roman Novy', 'programmer', 1980);
INSERT INTO users(name, occupation, salary) VALUES('Lucia Biela', NULL, NULL);
INSERT INTO users(name, occupation, salary) VALUES('Tomas Gerber', 'soldier', 1250);
INSERT INTO users(name, occupation, salary) VALUES('Maria Smith', 'teacher', NULL);
INSERT INTO users(name, occupation, salary) VALUES('Oleg Vasil', NULL, 2550);
INSERT INTO users(name, occupation, salary) VALUES('Martin Krajci', 'optician', 2050);
'''

def url = "jdbc:h2:mem:"
Sql.withInstance(url) { sql -&gt;

    sql.execute(createTable)

    def params = [:]
    def jPrint = JasperFillManager.fillReport(jrReport, params, sql.connection)

    JasperExportManager.exportReportToPdfFile(jPrint, "report.pdf")
}

class CleanData {

    static String removeNull(def oldval, def newval = '') {
        if (oldval == null) {
            newval
        } else {
            oldval
        }
    }
}

In the Groovy code, we define the CleanData and its
removeNull method. It allows us to select a specific message to 
be used instead of the null. 

report.xml
  

&lt;?xml version = "1.0" encoding = "UTF-8"?&gt;
&lt;!DOCTYPE jasperReport PUBLIC "//JasperReports//DTD Report Design//EN"
        "http://jasperreports.sourceforge.net/dtds/jasperreport.dtd"&gt;

&lt;jasperReport xmlns="http://jasperreports.sourceforge.net/jasperreports"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://jasperreports.sourceforge.net/jasperreports
   http://jasperreports.sourceforge.net/xsd/jasperreport.xsd"
              language="groovy"
              name="report" topMargin="20" bottomMargin="20"&gt;

    &lt;import value="com.zetcode.CleanData"/&gt;

    &lt;queryString language="SQL"&gt;
        &lt;![CDATA[ SELECT id, name, occupation, salary from users ]]&gt;
    &lt;/queryString&gt;

    &lt;field name="id" class="java.lang.Integer"/&gt;
    &lt;field name="name"/&gt;
    &lt;field name="occupation"/&gt;
    &lt;field name="salary" class="java.lang.Integer" /&gt;

    &lt;variable name="sumsal" class="java.lang.Integer" calculation="Sum"&gt;
        &lt;variableExpression&gt;&lt;![CDATA[$F{salary}]]&gt;&lt;/variableExpression&gt;
    &lt;/variable&gt;

    &lt;title&gt;
        &lt;band height="60"&gt;
            &lt;staticText&gt;
                &lt;reportElement x="0" y="0" width="595" height="35"/&gt;
                &lt;textElement textAlignment="Center"/&gt;
                &lt;text&gt;&lt;![CDATA[Users]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;
        &lt;/band&gt;
    &lt;/title&gt;

    &lt;detail&gt;
        &lt;band height="30"&gt;

            &lt;textField&gt;
                &lt;reportElement x="0" y="0" width="25" height="25"/&gt;
                &lt;textFieldExpression class="java.lang.Integer"&gt;
                    &lt;![CDATA[$F{id}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="30" y="0" width="100" height="25"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[$F{name}]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="140" y="0" width="70" height="25"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[ CleanData.removeNull($F{occupation}, 'N/A') ]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

            &lt;textField&gt;
                &lt;reportElement x="220" y="0" width="70" height="25"/&gt;
                &lt;textElement textAlignment="Right"/&gt;
                &lt;textFieldExpression&gt;
                    &lt;![CDATA[ CleanData.removeNull($F{salary}, 'N/A') ]]&gt;
                &lt;/textFieldExpression&gt;
            &lt;/textField&gt;

        &lt;/band&gt;
    &lt;/detail&gt;

    &lt;summary&gt;
        &lt;band height="25"&gt;
            &lt;textField&gt;
                &lt;reportElement x="220" y="0" width="70" height="25"/&gt;
                &lt;textElement textAlignment="Right"&gt;
                    &lt;font isBold = "true"/&gt;
                &lt;/textElement&gt;
                &lt;textFieldExpression&gt;&lt;![CDATA[$V{sumsal}]]&gt;&lt;/textFieldExpression&gt;
            &lt;/textField&gt;
        &lt;/band&gt;
    &lt;/summary&gt;

&lt;/jasperReport&gt;

In this report, we use the external CleanData.removeNull method.

&lt;import value="com.zetcode.CleanData"/&gt;

We import the class to the report.

&lt;textField&gt;
    &lt;reportElement x="140" y="0" width="70" height="25"/&gt;
    &lt;textFieldExpression&gt;
        &lt;![CDATA[ CleanData.removeNull($F{occupation}, 'N/A') ]]&gt;
    &lt;/textFieldExpression&gt;
&lt;/textField&gt;

We pass the CleanData.removeNull the $F{occupation} 
value and the optional string to replace the potential null value.

In this article we demonstrated how to replace null values with empty strings or 
more descriptive messages.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JasperReports tutorials](/all/#jasper).