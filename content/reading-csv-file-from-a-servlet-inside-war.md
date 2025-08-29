+++
title = "Reading CSV file from a servlet inside WAR"
date = 2025-08-29T19:48:49.597+01:00
draft = false
description = "In this tutorial we read data from a CSV file located in the WEB-INF directory. The tutorial uses Servlet, Opencsv, JSTL, and Jetty."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Reading CSV file from a servlet inside WAR

last modified July 13, 2020 

In this tutorial we read data from a CSV file located in the WEB-INF directory.
We use servlets, JSP files, and JSTL library. The web application is deployed
on Jetty. The Opencsv library is used to read CSV data.

## CSV

CSV (Comma Separated Values) format is a very popular import and export format 
used in spreadsheets and databases.

In the following web application, we read data from a CSV file inside a WAR file and 
display the data in a web page. The countries with population larger than a hundred
million are marked.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           ├───bean
│   │           │       Country.java
│   │           ├───service
│   │           │       CountryService.java
│   │           └───web
│   │                   ReadCountries.java
│   ├───resources
│   │       countries.csv
│   └───webapp
│           index.jsp
│           listCountries.jsp
│           showError.jsp
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;readcsvfromwar&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;12&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;12&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.opencsv&lt;/groupId&gt;
            &lt;artifactId&gt;opencsv&lt;/artifactId&gt;
            &lt;version&gt;4.6&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;jstl&lt;/groupId&gt;
            &lt;artifactId&gt;jstl&lt;/artifactId&gt;
            &lt;version&gt;1.2&lt;/version&gt;
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
                &lt;version&gt;9.4.14.v20181114&lt;/version&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

The project uses the following dependencies: avax.servlet-api,
opencsv, and jstl.

resources/countries.csv
  

Name, Population
Slovakia,5429000
Norway,5271000
Croatia,4225000
Russia,143439000
Mexico,122273000
Vietnam,95261000
Sweden,9967000
Iceland,337600
Israel,8622000
Hungary,9830000
Germany,82175700
Japan,126650000

This is the countries.csv file. It is located in the
src/main/resources directory. After building the application, 
the file is copied to the WAR's WEB-INF/classes
directory.

com/zetcode/bean/Country.java
  

package com.zetcode.bean;

import com.opencsv.bean.CsvBindByName;

import java.util.Objects;

public class Country {

    @CsvBindByName
    private String name;

    @CsvBindByName
    private int population;

    public Country() {
    }

    public Country(String name, int population) {

        this.name = name;
        this.population = population;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Country country = (Country) o;
        return population == country.population &amp;&amp;
                Objects.equals(name, country.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, population);
    }
}

This is a Country bean that has two attributes:
name and population.

@CsvBindByName
private String name;

The @CsvBindByName maps the name attribute 
to a field in the Name column.

com/zetcode/CountryService.java
  

package com.zetcode.service;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import com.zetcode.bean.Country;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

public class CountryService {

    public static Optional&lt;List&lt;Country&gt;&gt; getListOfCountries() throws IOException {

        List&lt;Country&gt; countries;

        try (InputStream is = CountryService.class.getClassLoader()
                .getResourceAsStream("countries.csv")) {

            if (is == null) {

                return Optional.empty();
            }

            HeaderColumnNameMappingStrategy&lt;Country&gt; strategy
                    = new HeaderColumnNameMappingStrategy&lt;&gt;();
            strategy.setType(Country.class);

            try (var br = new BufferedReader(
                    new InputStreamReader(is, StandardCharsets.UTF_8))) {

                CsvToBean&lt;Country&gt; csvToBean = new CsvToBeanBuilder&lt;Country&gt;(br)
                        .withType(Country.class)
                        .withMappingStrategy(strategy)
                        .withIgnoreLeadingWhiteSpace(true)
                        .build();

                 countries = csvToBean.parse();
            }
        }

        return Optional.of(countries);
    }
}

The CountryService reads data from the CSV file. 

try (InputStream is = CountryService.class.getClassLoader()
    .getResourceAsStream("countries.csv")) {

We get the InputStream to the countries.csv file with the 
getResourceAsStream method.

if (is == null) {

    return Optional.empty();
}

If the input stream was not opened, we return an empty Optional. 
This is used to avoid the null value.

HeaderColumnNameMappingStrategy&lt;Country&gt; strategy
    = new HeaderColumnNameMappingStrategy&lt;&gt;();
strategy.setType(Country.class);

We use the Opencsv's HeaderColumnNameMappingStrategy to 
map Country beans to lines in CSV file. Each line is transformed
into a bean. The mapping is done with the help of the @CsvBindByName
annotations.

try (var br = new BufferedReader(
        new InputStreamReader(is, StandardCharsets.UTF_8))) {

    CsvToBean&lt;Country&gt; csvToBean = new CsvToBeanBuilder&lt;Country&gt;(br)
            .withType(Country.class)
            .withMappingStrategy(strategy)
            .withIgnoreLeadingWhiteSpace(true)
            .build();

     countries = csvToBean.parse();
}

With the CsvToBeanBuilder, we parse the CSV file and transform the 
lines into a list of Country beans.

com/zetcode/web/ReadCountries.java
  

package com.zetcode.web;

import com.zetcode.bean.Country;
import com.zetcode.service.CountryService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@WebServlet(name = "ReadCountries", urlPatterns = {"/read"})
public class ReadCountries extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");

        Optional&lt;List&lt;Country&gt;&gt; countries = CountryService.getListOfCountries();

        String templateName;

        if (countries.isPresent()) {

            request.setAttribute("countries", countries.get());
            templateName = "listCountries.jsp";
        } else {

            templateName = "showError.jsp";
        }

        var dispatcher = request.getRequestDispatcher(templateName);
        dispatcher.forward(request, response);
    }
}

In the ReadCountries servlet, we call the getListOfCountries
service method. If there are some countries, we set the returned list of countries to the 
request object as an attribute. The processing is transferred to the 
listCountries.jsp. If there was no data found, an error message is 
returned.

webapp/listCountries.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Countries&lt;/title&gt;
    &lt;style&gt;
        .marked { color: chocolate }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;table&gt;

    &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Country&lt;/th&gt;
            &lt;th&gt;Population&lt;/th&gt;
        &lt;/tr&gt;
    &lt;/thead&gt;

    &lt;tbody&gt;

        &lt;c:forEach items="${countries}" var="count"&gt;

            &lt;c:if test="${count.population &gt; 100000000}"&gt;
                &lt;tr class="marked"&gt;
                    &lt;td&gt;
                        &lt;c:out value="${count.name}"/&gt;
                    &lt;/td&gt;
                    &lt;td&gt;
                        &lt;fmt:formatNumber type="number" value="${count.population}" /&gt;
                    &lt;/td&gt;                   
                &lt;/tr&gt;
            &lt;/c:if&gt;
            &lt;c:if test="${count.population &lt; 100000000}"&gt;
                &lt;tr&gt;
                    &lt;td&gt;
                        &lt;c:out value="${count.name}"/&gt;
                    &lt;/td&gt;
                    &lt;td&gt;
                        &lt;fmt:formatNumber type="number" value="${count.population}" /&gt;
                    &lt;/td&gt;                   
                &lt;/tr&gt;
            &lt;/c:if&gt;
        &lt;/c:forEach&gt;

    &lt;/tbody&gt;
    &lt;/table&gt;
&lt;/body&gt;
&lt;/html&gt;

In the listCountries.jsp file, we display the data in an HTML table.

&lt;%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %&gt;

We use two JSTL tag libraries: the core and the formatting library.

&lt;c:forEach items="${countries}" var="count"&gt;

With the &lt;c:forEach&gt; tag we iterate over the 
countries object.

&lt;c:if test="${count.population &gt; 100000000}"&gt;
    &lt;tr class="marked"&gt;
        &lt;td&gt;
            &lt;c:out value="${count.name}"/&gt;
        &lt;/td&gt;
        &lt;td&gt;
            &lt;fmt:formatNumber type="number" value="${count.population}" /&gt;
        &lt;/td&gt;                   
    &lt;/tr&gt;
&lt;/c:if&gt;

If the country's population is larger than one hundred million, we use the marked
class for the row; it displyas the row in a different colour. The test is performed with 
the JSTL's &lt;c:if&gt; tag. The &lt;fmt:formatNumber&gt; tag is used to format
the value.

webapp/index.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;List countries&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="read"&gt;List countries&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.jsp contains a link that calls the ReadCountries
servlet. The servlet reads the data from a CSV file and returns the data in a view
back to the browser.

webapp/showError.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;Error&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;No countries found&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

This template file shows an error message.

In this tutorial, we have shown how to read CSV data located inside the WAR file.