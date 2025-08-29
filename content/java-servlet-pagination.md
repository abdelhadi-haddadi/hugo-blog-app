+++
title = "Java Servlet pagination"
date = 2025-08-29T20:01:47.330+01:00
draft = false
description = "Java servlet pagination tutorial shows how to do pagination using Java servlets. Bootstrap is used for UI."
image = "images/pagination.png"
imageBig = "images/pagination.png"
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet pagination

last modified August 24, 2023

Java servlet pagination tutorial shows how to do pagination using Java servlets.
In the example, Bootstrap is used for the UI.

## Pagination

Pagination is the process of dividing content into several pages.
The user has a navigation interface for accessing these pages with specific page
links. The navigation often includes previous/next and first/last links.
Pagination is used when there is lots of data in the database or there are
many comments to be shown in one page.

## Java Servlet

Servlet is a Java class which responds to a particular type of
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty.
Modern-day Java web development uses frameworks that are built on top of servlets.

## Bootstrap

Bootstrap is a UI library from Twitter for creating responsive, mobile-first web
applications.

## Java Servlet pagination example

In the following web application, we load data from MySQL database and display it
in the table. There is a navigation system to go over all data from the database
table. Before the data is displayed in the table, the user has an option to choose
how many rows the table will display. The web application is deployed on Jetty 
server.

**Note: ** Some functionality including data validation or 
database connection pooling has been omitted to make the application more 
accessible.

In addition to fetching data from the database table, we also need to know
the number of all rows in the database table, the number of records per page,
and the number of pages to display in the navigation. The number of all rows
in the database is figured out by an SQL statement. The number of records per page
is selected by user in an HTML form. Finally, the number of pages in the pagination
is computed from the other two values.

countries_mysql.sql
  

CREATE TABLE countries(id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), population INT);

INSERT INTO countries(name, population) VALUES('China', 1382050000);
INSERT INTO countries(name, population) VALUES('India', 1313210000);
INSERT INTO countries(name, population) VALUES('USA', 324666000);
INSERT INTO countries(name, population) VALUES('Indonesia', 260581000);
INSERT INTO countries(name, population) VALUES('Brazil', 207221000);
INSERT INTO countries(name, population) VALUES('Pakistan', 196626000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Bangladesh', 162099000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Russia', 146838000);
INSERT INTO countries(name, population) VALUES('Japan', 126830000);
INSERT INTO countries(name, population) VALUES('Mexico', 122273000);
INSERT INTO countries(name, population) VALUES('Philippines', 103738000);
INSERT INTO countries(name, population) VALUES('Ethiopia', 101853000);
INSERT INTO countries(name, population) VALUES('Vietnam', 92700000);
INSERT INTO countries(name, population) VALUES('Egypt', 92641000);
INSERT INTO countries(name, population) VALUES('Germany', 82800000);
INSERT INTO countries(name, population) VALUES('the Congo', 82243000);
INSERT INTO countries(name, population) VALUES('Iran', 82800000);
INSERT INTO countries(name, population) VALUES('Turkey', 79814000);
INSERT INTO countries(name, population) VALUES('Thailand', 68147000);
INSERT INTO countries(name, population) VALUES('France', 66984000);
INSERT INTO countries(name, population) VALUES('United Kingdom', 60589000);
INSERT INTO countries(name, population) VALUES('South Africa', 55908000);
INSERT INTO countries(name, population) VALUES('Myanmar', 51446000);
INSERT INTO countries(name, population) VALUES('South Korea', 68147000);
INSERT INTO countries(name, population) VALUES('Colombia', 49129000);
INSERT INTO countries(name, population) VALUES('Kenya', 47251000);
INSERT INTO countries(name, population) VALUES('Spain', 46812000);
INSERT INTO countries(name, population) VALUES('Argentina', 43850000);
INSERT INTO countries(name, population) VALUES('Ukraine', 42603000);
INSERT INTO countries(name, population) VALUES('Sudan', 41176000);
INSERT INTO countries(name, population) VALUES('Algeria', 40400000);
INSERT INTO countries(name, population) VALUES('Poland', 38439000);

This SQL script creates the countries table in MySQL.

pom.xml
src
├── main
│&nbsp;&nbsp; ├── java
│&nbsp;&nbsp; │&nbsp;&nbsp; └── com
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── zetcode
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── model
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── Country.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── service
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; ├── CountryService.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── ICountryService.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         └── web
│&nbsp;&nbsp; │&nbsp;&nbsp;             └── ReadCountries.java
│&nbsp;&nbsp; ├── resources
│&nbsp;&nbsp; └── webapp
│&nbsp;&nbsp;     ├── index.html
│&nbsp;&nbsp;     └── listCountries.jsp
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
    &lt;artifactId&gt;PaginationEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;13&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;13&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
            &lt;version&gt;5.2.3.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;8.0.20&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;jstl&lt;/artifactId&gt;
            &lt;version&gt;1.2&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.0&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;9.4.30.v20200611&lt;/version&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven POM file. The javax.servlet-api artifact is
for servlets. The spring-jdbc dependency is used for the JdbcTemplate library,
which simplifies database programming in Java. The mysql-connector-java
is a MySQL driver for Java language. The jstl dependency provides
some additional functionality to JSP pages.

The maven-war-plugin is responsible for collecting all artifact dependencies,
classes and resources of the web application and packaging them into a web application archive (WAR).
The jetty-maven-plugin is a useful Maven plugin for rapid development
and testing. It creates a web application, starts a Jetty web server, and deploys
the application on the server.

com/zetcode/model/Country.java
  

package com.zetcode.model;

import java.util.Objects;

public class Country {

    private String name;
    private int population;

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

The Country bean holds one row from the
countries database table.

com/zetcode/web/ReadCountries.java
  

package com.zetcode.web;

import com.zetcode.model.Country;
import com.zetcode.service.CountryService;
import java.io.IOException;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "ReadCountries", urlPatterns = {"/ReadCountries"})
public class ReadCountries extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");

        int currentPage = Integer.parseInt(request.getParameter("currentPage"));
        int recordsPerPage = Integer.parseInt(request.getParameter("recordsPerPage"));

        var countryService = new CountryService();

        List&lt;Country&gt; countries = countryService.findCountries(currentPage,
                recordsPerPage);

        request.setAttribute("countries", countries);

        int rows = countryService.getNumberOfRows();

        int nOfPages = rows / recordsPerPage;

        if (nOfPages % recordsPerPage &gt; 0) {

            nOfPages++;
        }

        request.setAttribute("noOfPages", nOfPages);
        request.setAttribute("currentPage", currentPage);
        request.setAttribute("recordsPerPage", recordsPerPage);

        RequestDispatcher dispatcher = request.getRequestDispatcher("listCountries.jsp");
        dispatcher.forward(request, response);
    }
}

The ReadCountries servlet determines how much data will be
retrieved from the request attributes and reads the specified amount of rows
from the database table.

@WebServlet(name = "ReadCountries", urlPatterns = {"/ReadCountries"})

The Java class is decorated with the @WebServlet annotation. It is mapped
to the ReadCountries URL pattern.

response.setContentType("text/html;charset=UTF-8");

The servlet will output data in HTML and the encoding of the data is set to UTF-8.

int currentPage = Integer.parseInt(request.getParameter("currentPage"));
int recordsPerPage = Integer.parseInt(request.getParameter("recordsPerPage"));

From the request we get two important values: the current page and the number
of records per page. (The validation of the values is skipped.)

var countryService = new CountryService();

List&lt;Country&gt; countries = countryService.findCountries(currentPage,
        recordsPerPage);

request.setAttribute("countries", countries);

CountryService is a service class for connecting to the database
and reading data. The list of countries is retrieved and set as an attribute to
the request. It will be used later by the target JSP page.

int rows = countryService.getNumberOfRows();

int nOfPages = rows / recordsPerPage;

if (nOfPages % recordsPerPage &gt; 0) {
    nOfPages++;
}

We get the number of all rows from the database table with the
getNumberOfRows service method. We calculate the number of pages in
the navigation.

request.setAttribute("noOfPages", nOfPages);
request.setAttribute("currentPage", currentPage);
request.setAttribute("recordsPerPage", recordsPerPage);

The number of pages, the current page, and the number of records per page are
values that we need to build the pagination.

var dispatcher = request.getRequestDispatcher("listCountries.jsp");
dispatcher.forward(request, response);

The processing is forwarded to the listCountries.jsp page.

com/zetcode/service/ICountryService.java
  

package com.zetcode.service;

import com.zetcode.model.Country;
import java.util.List;

public interface ICountryService  {

    List&lt;Country&gt; findCountries(int currentPage, int numOfRecords);
    Integer getNumberOfRows();
}

The ICountryService contains two contract methods: findCountries
and getNumberOfRows.

com/zetcode/service/CountryService.java
  

package com.zetcode.service;

import com.zetcode.model.Country;
import java.sql.SQLException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class CountryService implements ICountryService {

    @Override
    public List&lt;Country&gt; findCountries(int currentPage, int recordsPerPage)  {

        List&lt;Country&gt; countries = null;

        int start = currentPage * recordsPerPage - recordsPerPage;

        try {
            String sql = "SELECT * FROM countries LIMIT ?, ?";

            var ds = new SimpleDriverDataSource();
            ds.setDriver(new com.mysql.jdbc.Driver());
            ds.setUrl("jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC");
            ds.setUsername("user7");
            ds.setPassword("7user");

            var jtm = new JdbcTemplate(ds);
            countries = jtm.query(sql, new Object[] {start, recordsPerPage},
                    new BeanPropertyRowMapper&lt;&gt;(Country.class));

        } catch (SQLException ex) {
            Logger.getLogger(CountryService.class.getName()).log(Level.SEVERE,
                    null, ex);
        }

        return countries;
    }

    @Override
    public Integer getNumberOfRows() {

        Integer numOfRows = 0;

        try {
            String sql = "SELECT COUNT(id) FROM countries";

            var ds = new SimpleDriverDataSource();
            ds.setDriver(new com.mysql.jdbc.Driver());
            ds.setUrl("jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC");
            ds.setUsername("user7");
            ds.setPassword("7user");

            var jtm = new JdbcTemplate(ds);
            numOfRows = jtm.queryForObject(sql, Integer.class);

        } catch (SQLException ex) {
            Logger.getLogger(CountryService.class.getName()).log(Level.SEVERE,
                    null, ex);
        }

        return numOfRows;
    }
}

The CountryService contains the implementation of the two contract methods.

String sql = "SELECT * FROM countries LIMIT ?, ?";

The SQL LIMIT clause is used to fetch the amount of rows for the current page.

var jtm = new JdbcTemplate(ds);
countries = jtm.query(sql, new Object[] {start, recordsPerPage},
        new BeanPropertyRowMapper(Country.class));

JdbcTemplate is used to execute the SQL statement. The rows are automatically
mapped to the Country bean with the help of the BeanPropertyRowMapper.

String sql = "SELECT COUNT(id) FROM countries";

With this SQL statement, we get the number of rows from the database table.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" 
          crossorigin="anonymous"&gt;
&lt;/head&gt;

&lt;body&gt;

&lt;main class="m-3"&gt;

    &lt;h1&gt;Show countries&lt;/h1&gt;

    &lt;form action="ReadCountries"&gt;

        &lt;input type="hidden" name="currentPage" value="1"&gt;

        &lt;div class="form-group col-md-4"&gt;

            &lt;label for="records"&gt;Select records per page:&lt;/label&gt;

            &lt;select class="form-control" id="records" name="recordsPerPage"&gt;
                &lt;option value="5"&gt;5&lt;/option&gt;
                &lt;option value="10" selected&gt;10&lt;/option&gt;
                &lt;option value="15"&gt;15&lt;/option&gt;
            &lt;/select&gt;

        &lt;/div&gt;

        &lt;button type="submit" class="btn btn-primary"&gt;Submit&lt;/button&gt;

    &lt;/form&gt;
&lt;/main&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains an HTML form to select the number of records per page
with the select tag. The form uses style classes from the Bootstrap library.
Upon submitting the form, the processing is sent to the ReadCountries servlet.

&lt;input type="hidden" name="currentPage" value="1"&gt;

The form contains a hidden input tag which sets the currentPage
parameter to 1.

&lt;select class="form-control" id="records" name="recordsPerPage"&gt;
    &lt;option value="5"&gt;5&lt;/option&gt;
    &lt;option value="10" selected&gt;10&lt;/option&gt;
    &lt;option value="15"&gt;15&lt;/option&gt;
&lt;/select&gt;

The select tags allows to choose 5, 10, or 15 records per page.

&lt;button type="submit" class="btn btn-primary"&gt;Submit&lt;/button&gt;

The Submit button executes the form.

webapp/listCountries.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Countries&lt;/title&gt;
    &lt;link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"&gt;
&lt;/head&gt;

&lt;body&gt;

&lt;main class="m-3"&gt;
    &lt;div class="row col-md-6"&gt;
        &lt;table class="table table-striped table-bordered table-sm"&gt;
            &lt;tr&gt;
                &lt;th&gt;Name&lt;/th&gt;
                &lt;th&gt;Population&lt;/th&gt;
            &lt;/tr&gt;

            &lt;c:forEach items="${countries}" var="country"&gt;
                &lt;tr&gt;
                    &lt;td&gt;${country.getName()}&lt;/td&gt;
                    &lt;td&gt;${country.getPopulation()}&lt;/td&gt;
                &lt;/tr&gt;
            &lt;/c:forEach&gt;
        &lt;/table&gt;
    &lt;/div&gt;

    &lt;nav aria-label="Navigation for countries"&gt;
        &lt;ul class="pagination"&gt;
            &lt;c:if test="${currentPage != 1}"&gt;
                &lt;li class="page-item"&gt;&lt;a class="page-link"
                    href="ReadCountries?recordsPerPage=${recordsPerPage}¤tPage=${currentPage-1}"&gt;Previous&lt;/a&gt;
                &lt;/li&gt;
            &lt;/c:if&gt;

            &lt;c:forEach begin="1" end="${noOfPages}" var="i"&gt;
                &lt;c:choose&gt;
                    &lt;c:when test="${currentPage eq i}"&gt;
                        &lt;li class="page-item active"&gt;&lt;a class="page-link"&gt;
                                ${i} &lt;span class="sr-only"&gt;(current)&lt;/span&gt;&lt;/a&gt;
                        &lt;/li&gt;
                    &lt;/c:when&gt;
                    &lt;c:otherwise&gt;
                        &lt;li class="page-item"&gt;&lt;a class="page-link"
                            href="ReadCountries?recordsPerPage=${recordsPerPage}¤tPage=${i}"&gt;${i}&lt;/a&gt;
                        &lt;/li&gt;
                    &lt;/c:otherwise&gt;
                &lt;/c:choose&gt;
            &lt;/c:forEach&gt;

            &lt;c:if test="${currentPage lt noOfPages}"&gt;
                &lt;li class="page-item"&gt;&lt;a class="page-link"
                    href="ReadCountries?recordsPerPage=${recordsPerPage}¤tPage=${currentPage+1}"&gt;Next&lt;/a&gt;
                &lt;/li&gt;
            &lt;/c:if&gt;
        &lt;/ul&gt;
    &lt;/nav&gt;
&lt;/main&gt;

&lt;/body&gt;
&lt;/html&gt;

The listCountries.jsp displays the data in the table and the
pagination system. The Bootstrap is used to make the UI responsive and look
good.

&lt;table class="table table-striped table-bordered table-sm"&gt;

The table, table-striped, table-bordered,
table-sm are all Bootstrap classes.

&lt;c:forEach items="${countries}" var="country"&gt;
    &lt;tr&gt;
        &lt;td&gt;${country.getName()}&lt;/td&gt;
        &lt;td&gt;${country.getPopulation()}&lt;/td&gt;
    &lt;/tr&gt;
&lt;/c:forEach&gt;

With the JSTL's forEach tag, we display all data for the current
page.

&lt;c:if test="${currentPage != 1}"&gt;
    &lt;li class="page-item"&gt;&lt;a class="page-link"
        href="ReadCountries?recordsPerPage=${recordsPerPage}&amp;currentPage=${currentPage-1}"&gt;Previous&lt;/a&gt;
    &lt;/li&gt;
&lt;/c:if&gt;

With the c:if tag we only show the Previous link when there is one. In the link, we
pass the recordsPerPage and currentPage values to the request object.

&lt;c:forEach begin="1" end="${noOfPages}" var="i"&gt;
    &lt;c:choose&gt;
        &lt;c:when test="${currentPage eq i}"&gt;
            &lt;li class="page-item active"&gt;&lt;a class="page-link"&gt;
                    ${i} &lt;span class="sr-only"&gt;(current)&lt;/span&gt;&lt;/a&gt;
            &lt;/li&gt;
        &lt;/c:when&gt;
        &lt;c:otherwise&gt;
            &lt;li class="page-item"&gt;&lt;a class="page-link"
                href="ReadCountries?recordsPerPage=${recordsPerPage}&amp;currentPage=${i}"&gt;${i}&lt;/a&gt;
            &lt;/li&gt;
        &lt;/c:otherwise&gt;
    &lt;/c:choose&gt;
&lt;/c:forEach&gt;

With the forEach tag, we display all the page links.

$ mvn jetty:run

We run the Jetty server and navigate to localhost:8080.

![pagination.png](images/pagination.png)

Figure: Java Servlet Pagination

The example shows a table filled with data and the pagination system. The currently
selected page is highlighted.

In this article we have shown how to create a pagination system in a web application
with a Java Servlet.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java Servlet tutorials](/all/#servlets).