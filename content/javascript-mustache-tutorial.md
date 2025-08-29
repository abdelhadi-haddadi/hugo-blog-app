+++
title = "JavaScript Mustache tutorial"
date = 2025-08-29T20:01:29.765+01:00
draft = false
description = "Learn how to use the Mustache template engine in JavaScript applications, with examples and best practices."
image = "images/javascript_json_mustache.png"
imageBig = "images/javascript_json_mustache.png"
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript Mustache tutorial

last modified last modified October 18, 2023

 

In JavaScript Mustache tutorial, we show how to use Mustache template engine.

## Mustache

Mustache is a simple web template system. It is available for many
programming languages including JavaScript and Java. Mustache is described as a
logic-less template engine because it does not have any explicit control flow
statements, such as if and else conditionals or for loops. Looping and
conditional evaluation can be achieved using section tags processing lists and
lambdas.

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. The application/json is the official Internet media type
for JSON. The JSON filename extension is .json.

jQuery is a JavaScript library which is used to manipulate DOM. With
jQuery, we can find, select, traverse, and manipulate parts of a HTML document.

&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"&gt;&lt;/script&gt;

Mustache is a JavaScript library, which can be referenced from a CDN (Content
Delivery Network).

## Mustache basic template example

In the first example, we have a basic template example.

basic.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;title&gt;JavaScript Mustache template&lt;/title&gt;

&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;

&lt;script src="https://code.jquery.com/jquery-3.2.1.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"&gt;&lt;/script&gt;

&lt;/head&gt;

&lt;body&gt;

&lt;div id="mypanel"&gt;&lt;/div&gt;

&lt;button id="btn"&gt;Load&lt;/button&gt;

&lt;script&gt;
$("#btn").on('click', function() {

    var data = { name: "Jonathan" };
    var template = "Hello {{ name }}";

    var text = Mustache.render(template, data);

    $("#mypanel").html(text);
});
&lt;/script&gt;

&lt;/body&gt;
&lt;/html&gt;

Clicking on the button we get a message written on the page.

&lt;script src="https://code.jquery.com/jquery-3.2.1.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"&gt;&lt;/script&gt;

In the example, we use JQuery and Mustache JavaScript libraries.

$("#btn").on('click', function() {
...
}

We create a handler that reacts to the button click event.

var data = { name: "Jonathan" };

This is the data.

var template = "Hello {{ name }}";

This is the Mustache template. The {{ name }} is a Mustache tag
which is replaced with the data value.

var text = Mustache.render(template, data);

The final output is rendered with the Mustache.render function. A
template engine joins template with data to generate output.

$("#mypanel").html(text);

The rendered text is written to the panel element.

## Mustache using template tag

In the second example, we use a template tag. Currently the
&lt;script type="text/template"&gt; is used but it is going to be
replaced with &lt;template&gt; tag in the near future. The tag
holds client-side content that is not to be rendered when a page is loaded but
is instantiated during runtime using JavaScript.

json_url.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;title&gt;JavaScript Mustache template&lt;/title&gt;

&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;

&lt;script src="https://code.jquery.com/jquery-3.2.1.min.js"&gt;&lt;/script&gt;
&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"&gt;&lt;/script&gt;

&lt;/head&gt;

&lt;body&gt;

&lt;script id="mp_template" type="text/template"&gt;
    Date: {{ time }}
    &lt;br&gt;
    Time: {{ date }}
    &lt;br&gt;
    Unix time: {{ milliseconds_since_epoch }}
&lt;/script&gt;

&lt;div id="mypanel"&gt;&lt;/div&gt;

&lt;button id="btn"&gt;Load&lt;/button&gt;

&lt;script&gt;

    $(function() {

        $("#btn").on('click', function() {

            $.getJSON('http://time.jsontest.com', function(data) {

                    var template = $("#mp_template").html();
                    var text = Mustache.render(template, data);

                    $("#mypanel").html(text);
            });
        });
    });
&lt;/script&gt;

In this example, we make a request to time.jsontest.com, which
returns a JSON response with three attributes: time, date,
and milliseconds_since_epoch (Unix time).

&lt;script id="mp_template" type="text/template"&gt;
    Date: {{ time }}
    &lt;br&gt;
    Time: {{ date }}
    &lt;br&gt;
    Unix time: {{ milliseconds_since_epoch }}
&lt;/script&gt;

We define the template inside the &lt;script id="mp_template" type="text/template"&gt; tag.

$.getJSON('http://time.jsontest.com', function(data) {

With $.getJSON, we load JSON-encoded data from a server using a GET
HTTP request.

var template = $("#mp_template").html();

With JQuery's html method, we get the template data.

var text = Mustache.render(template, data);

The output is rendered with Mustache.render.

$("#mypanel").html(text);

The final text is written to the panel element.

## Mustache with Java Servlet

In the third example, we create a Java web application with a servlet.

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── bean
    │   │           │   └── City.java
    │   │           └── web
    │   │               └── GetCities.java
    │   └── webapp
    │       ├── index.html
    │       ├── META-INF
    │       │   └── context.xml
    │       └── WEB-INF
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
    &lt;artifactId&gt;ServletJsonMustache&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;ServletJsonMustache&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;3.1.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
            &lt;artifactId&gt;gson&lt;/artifactId&gt;
            &lt;version&gt;2.8.0&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;2.3&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;failOnMissingWebXml&gt;false&lt;/failOnMissingWebXml&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

This is the Maven POM file. We have two artifacts: javax.servlet-api
for servlets and gson for JSON processing in Java.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/ServletJsonMustache"/&gt;

In the Tomcat context.xml file, we define the context path. It is
the name of the web application.

City.java
  

package com.zetcode.bean;

public class City {

    private Long id;
    private String name;
    private int population;

    public City() {
    }

    public City(Long id, String name, int population) {
        this.id = id;
        this.name = name;
        this.population = population;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
    public String toString() {
        return "City{" + "id=" + id + ", name=" + name +
                ", population=" + population + '}';
    }
}

This is the City bean. It has three attributes: id, name, and
population.

GetCities.java
  

package com.zetcode.web;

import com.google.gson.Gson;
import com.zetcode.bean.City;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "GetCities", urlPatterns = {"/GetCities"})
public class GetCities extends HttpServlet {

    private static final List&lt;City&gt; cities;

    static {

        cities = new ArrayList&lt;&gt;();
        cities.add(new City(1L, "Bratislava", 432000));
        cities.add(new City(2L, "Budapest", 1759000));
        cities.add(new City(3L, "Prague", 1280000));
        cities.add(new City(4L, "Warsaw", 1748000));
        cities.add(new City(5L, "Los Angeles", 3971000));
        cities.add(new City(6L, "New York", 8550000));
        cities.add(new City(7L, "Edinburgh", 464000));
        cities.add(new City(8L, "Berlin", 3671000));
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("application/json;charset=UTF-8");

        try (ServletOutputStream os = response.getOutputStream()) {
            os.print(new Gson().toJson(cities));
        }
    }
}

This is the GetCities servlet.

response.setContentType("application/json;charset=UTF-8");

The content type of the response object is set to application/json.

try (ServletOutputStream os = response.getOutputStream()) {
    os.print(new Gson().toJson(cities));
}

We use the Gson library to transform a Java list into JSON array.
The array is written to the response output stream. The array was not not given
a name.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Cities&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
        &lt;script src="https://code.jquery.com/jquery-3.2.1.min.js"&gt;&lt;/script&gt;
        &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"&gt;&lt;/script&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;script id="mp_template" type="text/template"&gt;
            &lt;table&gt;
                &lt;thead&gt;
                    &lt;tr&gt;
                        &lt;th&gt;Id&lt;/th&gt;
                        &lt;th&gt;Name&lt;/th&gt;
                        &lt;th&gt;Price&lt;/th&gt;
                    &lt;/tr&gt;
                &lt;/thead&gt;

                &lt;tbody&gt;
                {{#.}}
                    &lt;tr&gt;
                        &lt;td&gt;{{id}}&lt;/td&gt;
                        &lt;td&gt;{{name}}&lt;/td&gt;
                        &lt;td&gt;{{population}}&lt;/td&gt;
                    &lt;/tr&gt;
                {{/.}}
                &lt;/tbody&gt;
            &lt;/table&gt;
        &lt;/script&gt;

        &lt;div id="mypanel"&gt;&lt;/div&gt;

        &lt;button id="btn"&gt;Load&lt;/button&gt;

        &lt;script&gt;

            $(function () {

                $("#btn").on('click', function () {

                    $.getJSON('http://localhost:8084/ServletJsonMustache/GetCities', function (cities) {

                        var template = $("#mp_template").html();
                        var text = Mustache.render(template, cities);

                        $("#mypanel").html(text);
                    });
                });
            });
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page.

&lt;script id="mp_template" type="text/template"&gt;
...
&lt;/script&gt;

The Mustache template is placed in the
&lt;script id="mp_template" type="text/template"&gt; tag.

&lt;tbody&gt;
{{#.}}
    &lt;tr&gt;
        &lt;td&gt;{{id}}&lt;/td&gt;
        &lt;td&gt;{{name}}&lt;/td&gt;
        &lt;td&gt;{{population}}&lt;/td&gt;
    &lt;/tr&gt;
{{/.}}
&lt;/tbody&gt;

 With {{#.}} {{/.}} syntax we go through the unnamed JSON array
 returned from the servlet and replace Mustache tags with values.

$.getJSON('http://localhost:8084/ServletJsonMustache/GetCities', function (cities) {

With $.getJSON we call the GetCities servlet. The
servlet returns JSON data, which are processed with Mustache.

### Naming the JSON array

In case we wanted to name the returned JSON array, we can use the following
code:

Gson gson = new GsonBuilder().create();
JsonArray jarray = gson.toJsonTree(cities).getAsJsonArray();
JsonObject jsonObject = new JsonObject();
jsonObject.add("cities", jarray);

os.print(jsonObject.toString());

In the servlet, we place the JSON array into another JSON object and name the
property cities.

&lt;tbody&gt;
{{#cities}}
    &lt;tr&gt;
        &lt;td&gt;{{id}}&lt;/td&gt;
        &lt;td&gt;{{name}}&lt;/td&gt;
        &lt;td&gt;{{population}}&lt;/td&gt;
    &lt;/tr&gt;
{{/cities}}
&lt;/tbody&gt;

In the Mustache template, we use this syntax: {{#cities}} {{/cities}}.

![javascript_json_mustache.png](images/javascript_json_mustache.png)

Figure: Rendering JSON data from Servlet with Mustache

## Source

[Mustache.js Github page](https://github.com/janl/mustache.js)

In this article we have worked with the Mustache template engine.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)