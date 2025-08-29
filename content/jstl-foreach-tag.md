+++
title = "JSTL forEach tag"
date = 2025-08-29T19:48:43.388+01:00
draft = false
description = "JSTL forEach tutorial shows how to use the forEach tag from the JSTL library."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JSTL forEach tag

last modified July 13, 2020 

JSTL forEach tutorial shows how to use the forEach tag from the JSTL library.

## JSTL

JavaServer Pages Standard Tag Library (JSTL) is a collection of useful 
JSP tags that provide the core functionality common to many JSP applications.

## forEach tag

JSTL &lt;c:forEach&gt; tag is a basic iteration tag. It iterates over
various Java collection types.

The &lt;c:forEach&gt; tag contains the following attributes:

- items — collection of items to iterate

- begin — index of the starting item

- end — index of the ending item

- step — iteration step

- var — variable for the current item of the iteration

## forEach taglib declaration

The &lt;c:forEach&gt; tag belongs to the core JSTL tags.

&lt;%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;

To use the tag, we need to include this declaration.

## JSTL Maven artifact

To use the JSTL library, we need the following Maven dependency:

&lt;dependency&gt;
    &lt;groupId&gt;jstl&lt;/groupId&gt;
    &lt;artifactId&gt;jstl&lt;/artifactId&gt;
    &lt;version&gt;1.2&lt;/version&gt;
&lt;/dependency&gt;

## forEach tag example

The following JSP page contains the &lt;c:forEach&gt; tag. In addiction to &lt;c:forEach&gt; tag,
we also use &lt;c:out&gt; for displaying variables.

index.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;JSP Page&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;c:forEach var="counter" begin="1" end="8"&gt;
            &lt;c:out value="${counter}"/&gt;
        &lt;/c:forEach&gt;
    &lt;/body&gt;
&lt;/html&gt;

The example shows values 1..8 in the output.

## forEach tag example II

The next JSP example reads parameters sent from a link.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Start Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        
        &lt;a href="target.jsp?name=Jane&amp;age=23&amp;occupation=accountant"&gt;Show page&lt;/a&gt;
        
    &lt;/body&gt;
&lt;/html&gt;

The index.html page contains a link that sends three parameters to 
the target.jsp page.

target.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;JSP Page&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;c:forEach var="par" items="${param}"&gt;

            &lt;c:out value="${par.key}"/&gt;: &lt;c:out value="${par.value}"/&gt; &lt;br&gt;

        &lt;/c:forEach&gt;
    &lt;/body&gt;
&lt;/html&gt;

The JSP page receives parameters in the implicit param object, which is a map.

&lt;c:forEach var="par" items="${param}"&gt;

    &lt;c:out value="${par.key}"/&gt;: &lt;c:out value="${par.value}"/&gt; &lt;br&gt;

&lt;/c:forEach&gt;

We go over the map and print the key/value pairs.

## forEach tag example III

The HTML &lt;select&gt; is a control that provides 
a menu of options. With its multiple attribute, the user can select
multiple values form the control.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Languages&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;form action="target.jsp"&gt;
            &lt;div&gt;Select languages:&lt;/div&gt;

            &lt;select name="languages" size="7" multiple="multiple"&gt;
                &lt;option value='Ada'&gt;Ada&lt;/option&gt;
                &lt;option value='C'&gt;C&lt;/option&gt;
                &lt;option value='C++'&gt;C++&lt;/option&gt;
                &lt;option value='Cobol'&gt;Cobol&lt;/option&gt;
                &lt;option value='Eiffel'&gt;Eiffel&lt;/option&gt;
                &lt;option value='Objective-C'&gt;Objective-C&lt;/option&gt;
                &lt;option value='Java'&gt;Java&lt;/option&gt;
            &lt;/select&gt;

            &lt;button type="submit"&gt;Submit&lt;/button&gt;

        &lt;/form&gt;

    &lt;/body&gt;
&lt;/html&gt;

We create a &lt;select&gt; control that contains seven values. When 
we submit the form, the selected values are sent to the target.jsp file.

target.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;Languages&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;c:forEach items="${paramValues.languages}" var="lang"&gt;
            &lt;c:out value="${lang}"/&gt;
        &lt;/c:forEach&gt;
    &lt;/body&gt;
&lt;/html&gt;

The valuues from the &lt;select&gt; control are available from 
the implicit paramValues object, which is a map. The key is
the request parameter name (languages) and the values are 
in an array of strings.

&lt;c:forEach items="${paramValues.languages}" var="lang"&gt;
    &lt;c:out value="${lang}"/&gt;
&lt;/c:forEach&gt;

We go over the array and print its elements.

## forEach tag example IV

The following example displays data in an HTML table.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Start Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;a href="MyServlet"&gt;Show all cities&lt;/a&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

In the index.html page we have a link that calls MyServlet.
The servlet loads data with a service method and dispatches to the JSP page.

com/zetcode/City.java
  

package com.zetcode.bean;

public class City {
    
    private Long id;
    private String name;
    private int population;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public City(Long id, String name, int population) {
        this.id = id;
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
}

This is the City class; it contains id, 
name, and population attributes.

com/zetcode/MyServlet.java
  

package com.zetcode.web;

import com.zetcode.bean.City;
import com.zetcode.service.CityService;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");
        
        List&lt;City&gt; cities = CityService.getAllCities();
        
        request.setAttribute("cities", cities);
        
        request.getRequestDispatcher("showCities.jsp").forward(request, response);
    }
}

The servlet reads data with CityService.getAllCities, sets the list
object to the attributes with setAttribute, and forwards to 
the showCities.jsp.

com/zetcode/CityService.java
  

package com.zetcode.service;

import com.zetcode.bean.City;
import java.util.ArrayList;
import java.util.List;

public class CityService {
    
    public static List&lt;City&gt; getAllCities() {
    
       List&lt;City&gt; cities = new ArrayList&lt;&gt;();
        
        cities.add(new City(1L, "Bratislava", 432000));
        cities.add(new City(2L, "Budapest", 1759000));
        cities.add(new City(3L, "Prague", 1280000));
        cities.add(new City(4L, "Warsaw", 1748000));
        cities.add(new City(5L, "Los Angeles", 3971000));
        cities.add(new City(6L, "New York", 8550000));
        cities.add(new City(7L, "Edinburgh", 464000));
        cities.add(new City(8L, "Berlin", 3671000));
        
        return cities;
    }
}

The getAllCities method returns a list of cities.

showCities.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;Cities&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;h2&gt;Cities&lt;/h2&gt;
        
        &lt;table&gt;
            &lt;thead&gt;
                &lt;tr&gt;
                    &lt;th&gt;Id&lt;/th&gt;
                    &lt;th&gt;Name&lt;/th&gt;
                    &lt;th&gt;Population&lt;/th&gt;
                &lt;/tr&gt;
            &lt;/thead&gt;
            
            &lt;tbody&gt;
                &lt;c:forEach items="${cities}" var="city"&gt;
                &lt;tr&gt;
                    &lt;td&gt;${city.id}&lt;/td&gt;
                    &lt;td&gt;${city.name}&lt;/td&gt;
                    &lt;td&gt;${city.population}&lt;/td&gt;
                &lt;/tr&gt;
                &lt;/c:forEach&gt;   
            &lt;/tbody&gt;
        &lt;/table&gt;
    &lt;/body&gt;
&lt;/html&gt;

In the showCities.jsp, we display the cities in the HTML table with 
the &lt;c:forEach&gt; tag.

&lt;td&gt;${city.id}&lt;/td&gt;
&lt;td&gt;${city.name}&lt;/td&gt;
&lt;td&gt;${city.population}&lt;/td&gt;

The attributes are read from the city object with the dot operator.

In this tutorial, we have covered the &lt;c:forEach&gt; tag from 
the JSTL library.