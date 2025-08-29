+++
title = "JasperReports scriptlets"
date = 2025-08-29T19:48:33.362+01:00
draft = false
description = "JasperReports Scriptlets tutorial shows how to use JasperReports scriptlets, which provide some additional functionality to JasperReports."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JasperReports scriptlets

last modified July 13, 2020 

In this tutorial, we work with JasperReport scriptlets.

JasperReports is an open-source reporting library. It can create reports in 
various formats including PDF, HTML, XLS, or CSV. JasperReports creates page-oriented, 
ready-to-print documents in a simple and flexible manner.

Scriptlets are Java classes that provide additional functionality to JasperReports. We can use 
scriptlets when report expressions cannot execute more complex operations. Scriptlets are 
executed every time a report event occurs. Values of report variables can be affected 
through scriptlets.

## Calculating a geometric mean

The following application calculates geometric mean of interest rates.
The geometric mean is defined as the nth root of the product of n numbers. 
It is used in growth rates, like population growth or interest rates, where simple
arithmetic mean does not give accurate results.

$ tree
.
├── pom.xml
└── src
    └── main
        ├── java
        │   └── com
        │       └── zetcode
        │           └── main
        │               ├── CommandLineRunner.java
        │               ├── JasperScriptletGeoMean.java
        │               └── MyScriptlet.java
        └── resources
            └── report2.xml

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JasperScriptletGeoMean&lt;/artifactId&gt;
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
            &lt;groupId&gt;org.apache.commons&lt;/groupId&gt;
            &lt;artifactId&gt;commons-math3&lt;/artifactId&gt;
            &lt;version&gt;3.6.1&lt;/version&gt;
        &lt;/dependency&gt;
        
    &lt;/dependencies&gt;
    &lt;name&gt;JasperScriptletGeoMean&lt;/name&gt;
&gt;/project&gt;

The Maven pom.xml file contains these dependencies: 
jasperreports and commons-math3.
The jasperreports dependency is the JasperReports library;
the commons-math3 library contains the formula for the geometric
mean.

report2.xml
  

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
    
    &lt;scriptlet name="MyScriptlet" class="com.zetcode.main.MyScriptlet" /&gt;
    
    &lt;parameter name="rets" class="java.util.List"/&gt;
    &lt;variable name="gmean" class="java.lang.Double"/&gt;
     
    &lt;summary&gt;
        &lt;band height="30"&gt;
            
            &lt;staticText&gt;
                &lt;reportElement x="0" y="0" width="90" height="15" /&gt;
            
                &lt;textElement /&gt;
            
                &lt;text&gt;&lt;![CDATA[Geometric mean: ]]&gt;&lt;/text&gt;
            &lt;/staticText&gt;                        
            
            &lt;textField&gt;
                &lt;reportElement x="100" y="0" width="200" height="15"/&gt;
             
                &lt;textElement /&gt;
            
                &lt;textFieldExpression class="java.lang.Double"&gt;
                    &lt;![CDATA[$V{gmean}]]&gt;
                &lt;/textFieldExpression&gt;

            &lt;/textField&gt;    
        &lt;/band&gt;
    &lt;/summary&gt;    

&lt;/jasperReport&gt;

This is the report template file. The template contains the summary band where
we have one variable: gmean.

&lt;scriptlet name="MyScriptlet" class="com.zetcode.main.MyScriptlet" /&gt; 

A scriptlet is referenced with the &lt;scriptlet /&gt; tag.
It is a class that contains the calculation of the geometric mean.

&lt;parameter name="rets" class="java.util.List"/&gt;
&lt;variable name="gmean" class="java.lang.Double"/&gt;

We have a parameter and a variable. The parameter is a list of interest rate values.
The variable is the computed geometric mean.

&lt;textFieldExpression class="java.lang.Double"&gt;
    &lt;![CDATA[$V{gmean}]]&gt;
&lt;/textFieldExpression&gt;

In the &lt;textFieldExpression&gt; tag we output the geometric mean.

com/zetcode/JasperScriptletGeoMean.java
  

package com.zetcode.main;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;

public class JasperScriptletGeoMean {

    public void start() throws JRException {

        String xmlFile = "src/main/resources/report2.xml";
        JasperReport jreport = JasperCompileManager.compileReport(xmlFile);
        
        ArrayList&lt;Double&gt; rets = new ArrayList&lt;&gt;();

        rets.add(1.2);
        rets.add(1.8);
        rets.add(-1.2);
        rets.add(1.1);

        Map params = new HashMap();
        params.put("rets", rets);
                
        JasperPrint jprint = JasperFillManager.fillReport(jreport,
                params, new JREmptyDataSource());

        JasperExportManager.exportReportToPdfFile(jprint,
                "src/main/resources/report2.pdf");
    }
}

The JasperScriptletGeoMean creates a JasperPrint file from 
the data source. JasperPrint represents a page-oriented 
document that can be viewed, printed, or exported to other formats. In our case, 
it is going to be exported into a PDF file.

String xmlFile = "src/main/resources/table.xml";
JasperReport jreport = JasperCompileManager.compileReport(xmlFile);

We compile the XML template file into a JasperReport.
JasperReport is a compiled template ready to be filled
with data.

ArrayList&lt;Double&gt; rets = new ArrayList&lt;&gt;();

rets.add(1.2);
rets.add(1.8);
rets.add(-1.2);
rets.add(1.1);

These values are our interest rates.

Map params = new HashMap();
params.put("rets", rets);

The ArrayList is placed into the parameters. The list maps 
to the &lt;parameter name="rets" class="java.util.List"/&gt; 
element created in the report.

JasperPrint jprint = JasperFillManager.fillReport(jreport,
        params, new JREmptyDataSource());

A JasperPrint object is created; an object that can be 
viewed, printed, or exported to other formats.

JasperExportManager.exportReportToPdfFile(jprint,
        "src/main/resources/report2.pdf");    

The JasperExportManager.exportReportToPdfFile method
exports the JasperPrint into a PDF file.

com/zetcode/MyScriptlet.java
  

package com.zetcode.main;

import java.util.List;
import net.sf.jasperreports.engine.JRDefaultScriptlet;
import net.sf.jasperreports.engine.JRScriptletException;
import org.apache.commons.math3.stat.descriptive.DescriptiveStatistics;

public class MyScriptlet extends JRDefaultScriptlet {
    
    private DescriptiveStatistics stats;

    @Override
    public void afterReportInit() throws JRScriptletException {
        
        List&lt;Double&gt; rets = (List&lt;Double&gt;) getParameterValue("rets");

        stats = new DescriptiveStatistics();

        rets.forEach((ret) -&gt; {
            stats.addValue(ret);
        });
    }

    @Override
    public void afterDetailEval() throws JRScriptletException {
    
        setVariableValue("gmean", stats.getMean());
    }
}

This is our scriptlet. It derives from the JRDefaultScriptlet.
JRDefaultScriptlet provides default empty implementations for scriptlet events.

@Override
public void afterReportInit() throws JRScriptletException {
    
    List&lt;Double&gt; rets = (List&lt;Double&gt;) getParameterValue("rets");

    stats = new DescriptiveStatistics();

    rets.forEach((ret) -&gt; {
        stats.addValue(ret);
    });
}

After the report has been initialized, we get the rets parameter
containing the interest rate values and insert them into the DescriptiveStatistics.

@Override
public void afterDetailEval() throws JRScriptletException {

    setVariableValue("gmean", stats.getMean());
}

After the afterDetailEval event, the geometric mean is calculated and set 
to the gmean variable.

com/zetcode/CommandLineRunner.java
  

package com.zetcode.main;

public class CommandLineRunner {

    public static void main(String[] args) throws Exception {

        JasperScriptletGeoMean app = new JasperScriptletGeoMean();
        app.start();
    }
}

The CommandLineRunner sets up the application.

## Creating a chart

The following application creates a pie chart. It uses the JFreeChart library.

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
    │   │               ├── JasperJFreeChart.java
    │   │               └── MyScriptlet.java
    │   └── resources
    │       └── report2.xml
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
    &lt;artifactId&gt;JasperJFreeChart&lt;/artifactId&gt;
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
        
    &lt;/dependencies&gt;
    &lt;name&gt;JasperJFreeChart&lt;/name&gt;
&lt;/project&gt;

We only need the jasperreports dependency; JFreeChart is already included
in this dependency.

report2.xml
  

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
    
    &lt;scriptlet name="MyScriptlet" class="com.zetcode.main.MyScriptlet" /&gt;    

    &lt;parameter name="langs" class="java.util.Map"/&gt;
    &lt;variable name="Chart" class="net.sf.jasperreports.renderers.JCommonDrawableRendererImpl" 
              calculation="System"/&gt;
    
    &lt;detail&gt;
        &lt;band height="430"&gt;
            &lt;image scaleImage="Clip" hAlign="Center"&gt;
                &lt;reportElement x="0" y="0" width="515" height="300" /&gt;
                &lt;imageExpression&gt;
                    &lt;![CDATA[ $V{Chart} ]]&gt;
                &lt;/imageExpression&gt;
            &lt;/image&gt;       
            
        &lt;/band&gt;
    &lt;/detail&gt;

&lt;/jasperReport&gt;

In the report template template file we have the detail band where
we have the &lt;image&gt; element, which displays the chart.

&lt;scriptlet name="MyScriptlet" class="com.zetcode.main.MyScriptlet" /&gt; 

The scriptlet is a Java class that creates the chart object.

&lt;parameter name="langs" class="java.util.Map"/&gt;
&lt;variable name="Chart" class="net.sf.jasperreports.renderers.JCommonDrawableRendererImpl" 
            calculation="System"/&gt;

We have a parameter and a variable. The parameter is a map of values to be displayed in
the chart. The variable contains the chart object.

com/zetcode/JasperScriptletGeoMean.java
  

package com.zetcode.main;

import java.util.HashMap;
import java.util.Map;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;

public class JasperJFreeChart {

    public void start() throws JRException {

        String xmlFile = "src/main/resources/report2.xml";
        JasperReport jreport = JasperCompileManager.compileReport(xmlFile);
        
        Map params = new HashMap();
        params.put("langs", createData());

        JasperPrint jprint = JasperFillManager.fillReport(jreport,
                params, new JREmptyDataSource());

        JasperExportManager.exportReportToPdfFile(jprint,
                "src/main/resources/report2.pdf");
    }
    
    private Map&lt;String, Double&gt; createData() {
        
        Map&lt;String, Double&gt; langs = new HashMap&lt;&gt;();
        langs.put("Java", 43.2);
        langs.put("C#", 10.0);
        langs.put("C/C++", 17.5);
        langs.put("PHP", 32.5);
        langs.put("Clojure", 1.1);
        
        return langs;
    }
}

The JasperJFreeChart compiles the report template and creates 
a PDF file. 

Map params = new HashMap();
params.put("langs", createData());

The data is passed as a langs parameter.

private Map&lt;String, Double&gt; createData() {
    
    Map&lt;String, Double&gt; langs = new HashMap&lt;&gt;();
    langs.put("Java", 43.2);
    langs.put("C#", 10.0);
    langs.put("C/C++", 17.5);
    langs.put("PHP", 32.5);
    langs.put("Clojure", 1.1);
    
    return langs;
}

The values in this map are going to be displayed in the pie chart.

com/zetcode/MyScriptlet.java
  

package com.zetcode.main;

import java.util.Map;
import net.sf.jasperreports.engine.JRDefaultScriptlet;
import net.sf.jasperreports.engine.JRScriptletException;
import net.sf.jasperreports.renderers.JCommonDrawableRendererImpl;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PiePlot3D;
import org.jfree.data.general.DefaultPieDataset;
import org.jfree.util.Rotation;

public class MyScriptlet extends JRDefaultScriptlet {

      @Override
      public void afterReportInit() throws JRScriptletException {
          
        Map&lt;String, Double&gt; langs = (Map&lt;String, Double&gt;) getParameterValue("langs");  
          
        DefaultPieDataset dataset = new DefaultPieDataset();
        
        langs.forEach((k,v) -&gt; {
            dataset.setValue(k, v);
        });
        
        JFreeChart chart
                = ChartFactory.createPieChart3D(
                        "Computer languages",
                        dataset,
                        true,
                        true,
                        false
                );

        PiePlot3D plot = (PiePlot3D) chart.getPlot();
        plot.setStartAngle(290);
        plot.setDirection(Rotation.CLOCKWISE);
        plot.setForegroundAlpha(0.5f);
        plot.setNoDataMessage("No data to display");

        this.setVariableValue("Chart", new JCommonDrawableRendererImpl(chart));
    }
}

This scriptlet retrieves the data from the langs parameter and 
generates a pie chart. The chart is set to the report template variable.

Map&lt;String, Double&gt; langs = (Map&lt;String, Double&gt;) getParameterValue("langs"); 

After the report has been initialized, we get the langs parameter
containing the chart data.

DefaultPieDataset dataset = new DefaultPieDataset();

langs.forEach((k,v) -&gt; {
    dataset.setValue(k, v);
});

The data is set to the DefaultPieDataset.

JFreeChart chart
        = ChartFactory.createPieChart3D(
                "Computer languages",
                dataset,
                true,
                true,
                false
        );

PiePlot3D plot = (PiePlot3D) chart.getPlot();
plot.setStartAngle(290);
plot.setDirection(Rotation.CLOCKWISE);
plot.setForegroundAlpha(0.5f);
plot.setNoDataMessage("No data to display");

A 3D pie chart is generated.

this.setVariableValue("Chart", new JCommonDrawableRendererImpl(chart));

The generated chart is set to the Chart report template variable.

com/zetcode/CommandLineRunner.java
  

package com.zetcode.main;

public class CommandLineRunner {

    public static void main(String[] args) throws Exception {

        JasperJFreeChart app = new JasperJFreeChart();
        app.start();
    }
}

The CommandLineRunner sets up the application.

In this tutorial, we have worked with scriptlets; we have calculated a geometric mean
from interest rates and generated a 3D pie chart.