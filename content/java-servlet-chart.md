+++
title = "Java Servlet chart"
date = 2025-08-29T20:01:44.914+01:00
draft = false
description = "Java Servlet chart tutorial shows how to create a chart with JFreeChart and serve it in Servlet. The example produces a pie chart and a bar chart."
image = ""
imageBig = ""
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet chart

last modified August 24, 2023

In this article we show how to create a chart with JFreeChart and serve it in
Servlet. The example produces a pie chart and a bar chart.

Servlet is a Java class which responds to a particular type of
network request - most commonly an HTTP request. Servlets are used to implement
web applications in Java. They run in a servlet container such as Tomcat or
Jetty. In modern days, Java web programmers use frameworks that are built on top
of servlets to develop applications.

Jetty is an HTTP server and Servlet container capable of serving
static and dynamic content either from a standalone or embedded instantiations.

JFreeChart is a popular Java chart library. It allows to create a
variety of both interactive and non-interactive charts.

## Java Servlet chart example

The following example creates a pie chart with JFreeChart library and
serves it in a Java Servlet.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;org.example&lt;/groupId&gt;
    &lt;artifactId&gt;ServletChart&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;jakarta.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;jakarta.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;6.0.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.jfree&lt;/groupId&gt;
            &lt;artifactId&gt;jfreechart&lt;/artifactId&gt;
            &lt;version&gt;1.5.3&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.2.2&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;11.0.11&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;webApp&gt;
                        &lt;contextPath&gt;/app&lt;/contextPath&gt;
                    &lt;/webApp&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

The javax.servlet-api dependency is a library for building Java
servlets. The jfreechart is a dependency for JFreeChart
library.

The maven-war-plugin collects all artifact dependencies,
classes and resources of the web application and packages them into a
web application archive (WAR). The jetty-maven-plugin allows
us to run embedded Jetty server with mvn jetty:run.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           └───web
│   │                   DoChart.java
│   ├───resources
│   └───webapp
│           index.html
└───test
    └───java

This is the project structure.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Chart&lt;/title&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="showChart"&gt;Show chart&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

In the index.html file, we have a link that calls a
servlet, which servers the pie chart.

com/zetcode/web/DoChart.java
  

package com.zetcode.web;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.data.general.DefaultPieDataset;

import java.io.IOException;
import java.io.OutputStream;

@WebServlet(name = "DoChart", urlPatterns = {"/showChart"})
public class DoChart extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        response.setContentType("image/png");

        OutputStream os = response.getOutputStream();

        JFreeChart chart = getChart();
        int width = 500;
        int height = 350;

        ChartUtils.writeChartAsPNG(os, chart, width, height);
    }

    public JFreeChart getChart() {

        var dataset = new DefaultPieDataset&lt;String&gt;();

        dataset.setValue("Croatia", 22);
        dataset.setValue("Bohemia", 34);
        dataset.setValue("Bulgaria", 18);
        dataset.setValue("Spain", 5);
        dataset.setValue("Others", 21);

        JFreeChart chart = ChartFactory.createPieChart("Popular destinations",
                dataset, true, false, false);

        chart.setBorderVisible(false);

        return chart;
    }
}

The DoChart servlet returns a pie chart to the client.

@WebServlet(name = "DoChart", urlPatterns = {"/showChart"})

The @WebServlet annotation maps the request with
showChart URL pattern to the DoChart servlet.

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {

The request is a GET request, so we serve it in the doGet() method.

response.setContentType("image/png");

The chart is served as an image in the PNG format; therefore, we set the
content type of the response to image/png.

OutputStream os = response.getOutputStream();

From the response object, we get the OutputStream.
We serve the chart to the client by writing to the servlet's OutputStream.

ChartUtils.writeChartAsPNG(os, chart, width, height);

The ChartUtils.writeChartAsPNG() converts the chart into a PNG file
and writes it into the output stream.

public JFreeChart getChart() {

    var dataset = new DefaultPieDataset&lt;String&gt;();

    dataset.setValue("Croatia", 22);
    dataset.setValue("Bohemia", 34);
    dataset.setValue("Bulgaria", 18);
    dataset.setValue("Spain", 5);
    dataset.setValue("Others", 21);

    JFreeChart chart = ChartFactory.createPieChart("Popular destinations",
            dataset, true, false, false);

    chart.setBorderVisible(false);

    return chart;
}

In the getChart method, we generate the chart. The
DefaultPieDataset contains the data for the pie chart.

JFreeChart chart = ChartFactory.createPieChart("Popular destinations",
        dataset, true, false, false);

The pie chart is created with ChartFactory.createPieChart().

## Bar chart

The following code is an alternative solution sending a bar chart.

public JFreeChart getChart() {

    DefaultCategoryDataset dataset = new DefaultCategoryDataset();
    dataset.setValue(46, "Gold medals", "USA");
    dataset.setValue(38, "Gold medals", "China");
    dataset.setValue(29, "Gold medals", "UK");
    dataset.setValue(22, "Gold medals", "Russia");
    dataset.setValue(13, "Gold medals", "South Korea");
    dataset.setValue(11, "Gold medals", "Germany");

    JFreeChart barChart = ChartFactory.createBarChart(
            "Olympic gold medals in London",
            "",
            "Gold medals",
            dataset,
            PlotOrientation.VERTICAL,
            false, true, false);

    return barChart;
}

A bar chart is created with ChartFactory.createBarChart.

$ mvn jetty:run

Run the Jetty server and navigate to the localhost:8080/app/.

In this article we have used created a pie chart and a bar chart with
JFreeChart library in a Java servlet and served it to the client.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java Servlet tutorials](/all/#servlets).