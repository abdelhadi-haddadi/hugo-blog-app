+++
title = "JasperReports - programatically creating a report"
date = 2025-08-29T19:48:32.022+01:00
draft = false
description = "In this tutorial, we show how to programatically create a report with JasperReports library. The data is fetched from the Derby database."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports - programatically creating a report

last modified July 13, 2020 

In this tutorial, we show how to programatically create a report with JasperReports.
We create a PDF report from a CARS table. We use Derby database 
in our application. 

A report is a document containing information organized in a narrative, graphic, 
or tabular form, prepared on ad hoc, periodic, recurring, regular, or as required basis.
JasperReports is an open-source reporting library. It loads data from a data source
and creates a report from it. The report is a file in a PDF, HTML, RTF, XLS, ODT, CSV, or XML format.

JasperReports uses a template to define a document structure. The template is
defined either in an XML file or created with the programming API. In this tutorial
we use the latter option.

cars.sql
  

-- SQL for the CARS table

CREATE TABLE CARS(ID BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
    (START WITH 1, INCREMENT BY 1), NAME VARCHAR(30), PRICE INT);

INSERT INTO CARS(Name, Price) VALUES('Audi', 52642);
INSERT INTO CARS(Name, Price) VALUES('Mercedes', 57127);
INSERT INTO CARS(Name, Price) VALUES('Skoda', 9000);
INSERT INTO CARS(Name, Price) VALUES('Volvo', 29000);
INSERT INTO CARS(Name, Price) VALUES('Bentley', 350000);
INSERT INTO CARS(Name, Price) VALUES('Citroen', 21000);
INSERT INTO CARS(Name, Price) VALUES('Hummer', 41400);
INSERT INTO CARS(Name, Price) VALUES('Volkswagen', 21600);

In the code example, we use this table.

## Creating testdb database in Derby

Derby can be managed using the command line tools or from the Services
tab of the NetBeans IDE. You can find out more about Derby in 
[Apache Derby tutorial](/db/apachederbytutorial/).

$ export DERBY_HOME=$JAVA_HOME/db

We set the DERBY_HOME directory. Derby comes with JDK, so 
we do not need to install it separately.

$ export DERBY_OPTS=-Dderby.system.home=/home/janbodnar/.derby

We set the derby system directory. The database and the derby log is created 
in this directory.

$ $DERBY_HOME/bin/ij

We start the ij system tool.

ij&gt; CONNECT 'jdbc:derby:testdb;create=true';

Using the CONNECT command, we create the testdb
database.

ij&gt; run 'cars.sql';

With the run command, we issue the SQL statements in the cars.sql
file.

ij&gt; SELECT * FROM CARS;
ID                  |NAME                          |PRICE      
---------------------------------------------------------------
1                   |Audi                          |52642      
2                   |Mercedes                      |57127      
3                   |Skoda                         |9000       
4                   |Volvo                         |29000      
5                   |Bentley                       |350000     
6                   |Citroen                       |21000      
7                   |Hummer                        |41400      
8                   |Volkswagen                    |21600  

This is the created CARS table.

ij&gt; exit;

We exit the ij tool.

$ $DERBY_HOME/bin/startNetworkServer &amp;

We start the Derby network server.

## The application

The following application connects to the Derby server, loads
data from the CARS table and creates a PDF file
from the data with JasperReports.

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           └── main
    │   │               ├── CommandLineRunner.java
    │   │               ├── JasperProgrammatic.java
    │   │               └── ReportBuilder.java
    │   └── resources
    └── test
        └── java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JasperProgrammatic3&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;net.sf.jasperreports&lt;/groupId&gt;
            &lt;artifactId&gt;jasperreports&lt;/artifactId&gt;
            &lt;version&gt;6.4.0&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.derby&lt;/groupId&gt;
            &lt;artifactId&gt;derbyclient&lt;/artifactId&gt;
            &lt;version&gt;10.13.1.1&lt;/version&gt;
        &lt;/dependency&gt;           
             
    &lt;/dependencies&gt;        
    
&lt;/project&gt;

In the Maven pom.xml file, we have the jasperreports and
derbyclient dependencies.

com/zetcode/CommandLineRunner.java
  

package com.zetcode.main;

public class CommandLineRunner {

    public static void main(String[] args) throws Exception {

        JasperProgrammatic app = new JasperProgrammatic();
        app.start();
    }
}

The CommandLineRunner sets up the application and 
calls its start method.

com/zetcode/ReportBuilder.java
  

package com.zetcode.main;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.design.JRDesignBand;
import net.sf.jasperreports.engine.design.JRDesignExpression;
import net.sf.jasperreports.engine.design.JRDesignField;
import net.sf.jasperreports.engine.design.JRDesignParameter;
import net.sf.jasperreports.engine.design.JRDesignQuery;
import net.sf.jasperreports.engine.design.JRDesignSection;
import net.sf.jasperreports.engine.design.JRDesignStaticText;
import net.sf.jasperreports.engine.design.JRDesignStyle;
import net.sf.jasperreports.engine.design.JRDesignTextField;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.type.HorizontalTextAlignEnum;

public class ReportBuilder {

    public JasperDesign build() throws JRException {
        
        JasperDesign jasDes = new JasperDesign();
        jasDes.setName("myreport");
        jasDes.setPageWidth(595);
        jasDes.setPageHeight(842);
        jasDes.setLeftMargin(20);
        jasDes.setRightMargin(20);
        jasDes.setTopMargin(20);
        jasDes.setBottomMargin(20);
        jasDes.setColumnWidth(555);

        // Style
        JRDesignStyle mystyle = new JRDesignStyle();
        mystyle.setName("mystyle");
        mystyle.setDefault(true);
        mystyle.setFontName("DejaVu Sans");
        mystyle.setFontSize(22f);
        mystyle.setPdfFontName("Helvetica");
        mystyle.setPdfEncoding("UTF-8");
        jasDes.addStyle(mystyle);

        // Fields
        JRDesignField field1 = new JRDesignField();
        field1.setName("id");
        field1.setValueClass(String.class);
        jasDes.addField(field1);

        JRDesignField field2 = new JRDesignField();
        field2.setName("name");
        field2.setValueClass(String.class);
        jasDes.addField(field2);

        JRDesignField field3 = new JRDesignField();
        field3.setName("price");
        field3.setValueClass(String.class);
        jasDes.addField(field3);

        // Parameter
        JRDesignParameter par = new JRDesignParameter();
        par.setName("CarPrice");
        par.setValueClass(Integer.class);
        jasDes.addParameter(par);

        // Query
        JRDesignQuery query = new JRDesignQuery();
        query.setText("SELECT * FROM Cars WHERE Price &gt; $P{CarPrice}");
        jasDes.setQuery(query);

        // Title
        JRDesignBand titleBand = new JRDesignBand();
        titleBand.setHeight(50);

        JRDesignStaticText titleText = new JRDesignStaticText();
        titleText.setText("Expensive cars");
        titleText.setX(0);
        titleText.setY(10);
        titleText.setWidth(515);
        titleText.setHeight(30);
        titleText.setHorizontalTextAlign(HorizontalTextAlignEnum.CENTER);
        titleText.setFontSize(22f);
        titleBand.addElement(titleText);
        jasDes.setTitle(titleBand);

        // Detail
        JRDesignBand detailBand = new JRDesignBand();
        detailBand.setHeight(60);

        JRDesignTextField tf1 = new JRDesignTextField();
        tf1.setBlankWhenNull(true);
        tf1.setX(0);
        tf1.setY(10);
        tf1.setWidth(60);
        tf1.setHeight(30);
        tf1.setHorizontalTextAlign(HorizontalTextAlignEnum.CENTER);
        tf1.setStyle(mystyle);
        tf1.setExpression(new JRDesignExpression("$F{id}"));
        detailBand.addElement(tf1);

        JRDesignTextField tf2 = new JRDesignTextField();
        tf2.setBlankWhenNull(true);
        tf2.setX(80);
        tf2.setY(10);
        tf2.setWidth(120);
        tf2.setHeight(30);
        tf2.setHorizontalTextAlign(HorizontalTextAlignEnum.LEFT);
        tf2.setStyle(mystyle);
        tf2.setExpression(new JRDesignExpression("$F{name}"));
        detailBand.addElement(tf2);

        JRDesignTextField tf3 = new JRDesignTextField();
        tf3.setBlankWhenNull(true);
        tf3.setX(200);
        tf3.setY(10);
        tf3.setWidth(100);
        tf3.setHeight(30);
        tf3.setHorizontalTextAlign(HorizontalTextAlignEnum.RIGHT);
        tf3.setStyle(mystyle);
        tf3.setExpression(new JRDesignExpression("$F{price}"));
        detailBand.addElement(tf3);

        ((JRDesignSection) jasDes.getDetailSection()).addBand(detailBand);

        return jasDes;
    }
}

In the ReportBuilder class we programatically create a Jasper report.

JasperDesign jasDes = new JasperDesign();
jasDes.setName("myreport");
jasDes.setPageWidth(595);
jasDes.setPageHeight(842);
jasDes.setLeftMargin(20);
jasDes.setRightMargin(20);
jasDes.setTopMargin(20);
jasDes.setBottomMargin(20);
jasDes.setColumnWidth(555);

JasperDesign is instrumental in creating the report with the 
programming API. With its setter methods, we define the report name and its
basic settings.

// Style
JRDesignStyle mystyle = new JRDesignStyle();
mystyle.setName("mystyle");
mystyle.setDefault(true);
mystyle.setFontName("DejaVu Sans");
mystyle.setFontSize(22f);
mystyle.setPdfFontName("Helvetica");
mystyle.setPdfEncoding("UTF-8");
jasDes.addStyle(mystyle);

JRDesignStyle is used to define a custom style. Using a style
avoids code repetition. 

// Fields
JRDesignField field1 = new JRDesignField();
field1.setName("id");
field1.setValueClass(String.class);
jasDes.addField(field1);

JRDesignField field2 = new JRDesignField();
field2.setName("name");
field2.setValueClass(String.class);
jasDes.addField(field2);

JRDesignField field3 = new JRDesignField();
field3.setName("price");
field3.setValueClass(String.class);
jasDes.addField(field3);

We have three fields that correspond to the three columns of the
CARS table. Report fields are elements, which represent 
mapping of data between datasource and report template. 

// Parameter
JRDesignParameter par = new JRDesignParameter();
par.setName("CarPrice");
par.setValueClass(Integer.class);
jasDes.addParameter(par);

JRDesignParameter defines a dynamic parameter passed to 
the report-filling operation of the report engine.

// Query
JRDesignQuery query = new JRDesignQuery();
query.setText("SELECT * FROM Cars WHERE Price &gt; $P{CarPrice}");
jasDes.setQuery(query);

JRDesignQuery defines the SQL query to fetch the data 
from the database. The $P{CarPrice} placeholder is filled 
with the value of the parameter that is passed to the report engine. 

// Title
JRDesignBand titleBand = new JRDesignBand();
titleBand.setHeight(50);

JRDesignStaticText titleText = new JRDesignStaticText();
titleText.setText("Expensive cars");
titleText.setX(0);
titleText.setY(10);
titleText.setWidth(515);
titleText.setHeight(30);
titleText.setHorizontalTextAlign(HorizontalTextAlignEnum.CENTER);
titleText.setFontSize(22f);
titleBand.addElement(titleText);
jasDes.setTitle(titleBand);

Here we create a report title. A title is an instance of the JRDesignStaticText. 
A report template consists of several parts, including title, column header, detail, 
and summary. Each part is placed into a horizontal section called band.

// Detail
JRDesignBand detailBand = new JRDesignBand();
detailBand.setHeight(60);

JRDesignTextField tf1 = new JRDesignTextField();
tf1.setBlankWhenNull(true);
tf1.setX(0);
tf1.setY(10);
tf1.setWidth(60);
tf1.setHeight(30);
tf1.setHorizontalTextAlign(HorizontalTextAlignEnum.CENTER);
tf1.setStyle(mystyle);
tf1.setExpression(new JRDesignExpression("$F{id}"));
detailBand.addElement(tf1);
...

Detail is a band where report data is placed. Each row in a table is
represented by one line in the detail band. The detail band consists
of three JRDesignTextFields, which produce dynamic data
from the given expressions. The $F{id} expression gives
the ID of the current table row. 

com/zetcode/JasperProgrammatic.java
  

package com.zetcode.main;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;

public class JasperProgrammatic {

    private Connection con;

    public void start() throws JRException, SQLException {

        try {
            String url = "jdbc:derby://localhost:1527/testdb";
            String user = "app";
            String password = "app";

            DriverManager.registerDriver(new org.apache.derby.jdbc.ClientDriver());
            con = DriverManager.getConnection(url, user, password);
            
            JasperDesign jdes = new ReportBuilder().build();

            JasperReport report = JasperCompileManager.compileReport(jdes);

            HashMap params = new HashMap();
            params.put("CarPrice", 30000);

            JasperPrint jprint = JasperFillManager.fillReport(report, params, con);

            JasperExportManager.exportReportToPdfFile(jprint,
                    "src/main/resources/expensivecars.pdf");
                    
        } catch (SQLException ex) {
            Logger.getLogger(JasperProgrammatic.class.getName()).log(Level.SEVERE, null, ex);
            
        } finally {
            if (con != null) {
                con.close();
            }
        }
    }
}

In the JasperProgrammatic class, we build, compile, and export the report. 

JasperDesign jdes = new ReportBuilder().build();

Using the ReportBuilder class to create a JasperDesign,
which is a report template created by programming API.

JasperReport report = JasperCompileManager.compileReport(jdes);

With the JasperCompileManager, we compile the template into 
an intermediary JasperReport object.

HashMap params = new HashMap();
params.put("CarPrice", 30000);

Our map of parameters contains one parameter: the CarPrice, which is used
to filter the data. Only expensive cars are shown in the report.

JasperPrint jprint = JasperFillManager.fillReport(report, params, con);

The next step is to fill the compiled JasperReport object 
with data. The operation results in a JasperPrint object, 
which can be viewed, printed, or exported to other formats.

JasperExportManager.exportReportToPdfFile(jprint,
        "src/main/resources/expensivecars.pdf");

We use the JasperExportManager to export 
the JasperPrint object into a PDF file. The generated 
PDF file is written into the src/main/resources/ directory.

In this tutorial, we have created a PDF file report with the programming API 
of the JasperReports library.