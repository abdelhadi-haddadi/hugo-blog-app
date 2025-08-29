+++
title = "FreeMarker"
date = 2025-08-29T19:58:44.207+01:00
draft = false
description = "This is an introductory tutorial of the FreeMarker Java template engine. It contains console, servlet, Spring, and Spring Boot applications."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# FreeMarker

last modified January 27, 2024

 

This is an introductory tutorial of the FreeMarker Java template engine. We
introduce the FreeMarker template engine and create several console and web
applications. Maven is used to build our examples. NetBeans is used to manage
the applications.

## Table of contents

- [FreeMarker template engine](#free)

- [FreeMarker interpolations](#inter)

- [FreeMarker list directive](#list)

- [FreeMarker directives](#dire)

- [FreeMarker with Spark](#spark)

- [FreeMarker with Spring Boot](#boot)

FreeMarker is a template engine for the Java programming language.
Templates are written in the FreeMarker Template Language (FTL).

## FreeMarker template engine

A template engine combines static data with dynamic data to produce content.
A template is an intermediate representation of the content; it specifies how
the output will be generated.

The advantages of a template engine are:

- separation of concerns,

- avoiding repetition of code,

- easier switching between views,

- reusability.

A FreeMarker template file has by convention a .ftl extension.

FreeMarker is not restricted to templates for HTML pages; it can be used to
generate e-mails, configuration files, source code etc.

implementation 'org.freemarker:freemarker:2.3.31'

We use this FreeMarker dependency in a Gradle project.

## FreeMarker interpolations

Interpolations are expressions put between the ${ } characters.
FreeMarker will replace an interpolation in the output with the actual value of
the expression inside the curly brackets.

In the following example, we use a FreeMarker template file to generate simple
text output.

com/zetcode/FreeMarkerConsoleEx.java
  

package com.zetcode;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.Version;
import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

public class FreeMarkerConsoleEx {

    public static void main(String[] args) throws IOException,
            TemplateException {

        var cfg = new Configuration(new Version("2.3.31"));

        cfg.setClassForTemplateLoading(FreeMarkerConsoleEx.class, "/views");
        cfg.setDefaultEncoding("UTF-8");

        Template template = cfg.getTemplate("test.ftlh");

        Map&lt;String, Object&gt; templateData = new HashMap&lt;&gt;();
        templateData.put("msg", "Today is a beautiful day");

        try (StringWriter out = new StringWriter()) {

            template.process(templateData, out);
            System.out.println(out.getBuffer().toString());

            out.flush();
        }
    }
}

The example prints a simple text to the console. The final text was processed
by a template engine.

var cfg = new Configuration(new Version("2.3.31"));

Configuration is used to set the FreeMarker settings; it takes the
version of the FreeMarker library as a parameter.

cfg.setClassForTemplateLoading(FreeMarkerConsoleEx.class, "/views");

The setClassForTemplateLoading sets the class whose method will be
used to load templates. The templates are located in the views
subdirectory of src/main/resources directory.

Template template = cfg.getTemplate("test.ftlh");

With the getTemplate method, we retrieve the test.ftlh
template file.

Map&lt;String, Object&gt; templateData = new HashMap&lt;&gt;();
templateData.put("msg", "Today is a beautiful day");

The data model is created. The data from the model will be dynamically placed
into the FreeMarker template file.

try (StringWriter out = new StringWriter()) {

    template.process(templateData, out);
    System.out.println(out.getBuffer().toString());

    out.flush();
}

The process method executes the template, using the provided data
model and writing the generated output to the supplied writer.

resources/views/test.ftlh
  

The message is: ${msg}

The test.ftlh template file contains one interpolation; it will be
replaced with the generated string.

build.gradle
  

version '1.0'

apply plugin: 'java'
apply plugin: 'application'

sourceCompatibility = 17

mainClassName = "com.zetcode.FreeMarkerConsoleEx"

repositories {
    mavenCentral()
}

dependencies {

    implementation 'org.freemarker:freemarker:2.3.31'
}

This is the Gradle build file.

$ gradle run -q
The message is: Today is a beautiful day

## FreeMarker list directive

The #list directive lists a collection of data.

The next example produces a list of cars.

com/zetcode/Car.java
  

package com.zetcode;

public class Car {

    private String name;
    private int price;

    public Car() {
    }

    public Car(String name, int price) {

        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}

We have a Car bean. It has two attributes: name and price.

com/zetcode/FreeMarkerConsoleEx.java
  

package com.zetcode;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import freemarker.template.Version;
import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class FreeMarkerConsoleEx {

    public static void main(String[] args) throws IOException,
            TemplateException {

        var cfg = new Configuration(new Version("2.3.31"));

        cfg.setClassForTemplateLoading(FreeMarkerConsoleEx.class, "/views");
        cfg.setDefaultEncoding("UTF-8");

        Template template = cfg.getTemplate("test.ftlh");

        Map&lt;String, Object&gt; templateData = new HashMap&lt;&gt;();

        var c1 = new Car("Audi", 52642);
        var c2 = new Car("Volvo", 29000);
        var c3 = new Car("Skoda", 9000);

        var cars = new ArrayList&lt;&gt;();
        cars.add(c1);
        cars.add(c2);
        cars.add(c3);

        templateData.put("cars", cars);

        try (StringWriter out = new StringWriter()) {

            template.process(templateData, out);
            System.out.println(out.getBuffer().toString());

            out.flush();
        }
    }
}

This example is a Java console program, which uses FreeMarker to dynamically
create a text output containing a list of cars.

Map&lt;String, Object&gt; templateData = new HashMap&lt;&gt;();

var c1 = new Car("Audi", 52642);
var c2 = new Car("Volvo", 29000);
var c3 = new Car("Skoda", 9000);

var cars = new ArrayList&lt;&gt;();
cars.add(c1);
cars.add(c2);
cars.add(c3);

templateData.put("cars", cars);

Here we create a list of Car objects and put it into the data
model.

resources/views/test.ftlh
  

&lt;#list cars as car&gt;
${car.name}: ${car.price}
&lt;/#list&gt;

The template file contains a #list directive which prints the
attributes of the car objects; the attributes are accessed with the dot
character.

$ gradle run -q
Audi: 52,642
Volvo: 29,000
Skoda: 9,000

## FreeMarker directives

FreeMarker directives are special tags that perform an action. There are two
kinds of directives: built-in and custom.

The &lt;#assign&gt; tag creates a new plain variable. It can be
accessed with the ${} construct. The variable is created in the
template. If there is an equally named variable in the data model, the template
variable hides it.

assignment.ftl
  

&lt;#assign name = "Robert"&gt;

His name is ${name}.

The &lt;#assign&gt; directive creates a new name
variable. The value of the variable is printed with the ${name}
syntax.

His name is Robert.

The example prints this line.

Conditional processing of template sections can be done with he &lt;#if&gt;,
&lt;#elseif&gt;, and &lt;#else&gt; directives.

conditions.ftl
  

&lt;#assign value = 4&gt;

&lt;#if value &lt; 0&gt;
  The number is negative
&lt;#elseif value == 0&gt;
  The number is zero
&lt;#else&gt;
  The number is positive
&lt;/#if&gt;

The example creates a new value variable and uses conditional
directives to test the value.

The number is positive

The &lt;#list&gt; directive is used for traversing a sequence.

listing.ftl
  

&lt;#assign colours = ["red", "green", "blue", "yellow"]&gt;

&lt;#list colours as col&gt;
${col}
&lt;/#list&gt;

In the example, we assing a new sequence of colour names to the
colours variable. The &lt;#list&gt; directive goes
through the collection and prints each item.

red
green
blue
yellow

The example gives this output.

listing2.ftl
  

&lt;#assign items = {"pens": 3, "cups": 2, "tables": 1}&gt;

&lt;#list items?values as v&gt;
${v}
&lt;/#list&gt;

&lt;#list items?keys as k&gt;
${k}
&lt;/#list&gt;

In this example, we create a hash variable and use the &lt;#list&gt;
to output the values and the keys of the hash.

3
2
1

pens
cups
tables

The example gives this output.

The &lt;#compress&gt; directive removes superfluous white-space when
we use a white-space insensitive format (e.g. HTML or XML)

compressing.ftl
  

&lt;#assign value="\t\tweather\n\n"&gt;

&lt;#compress&gt;
${value}
        Today is a wonderful day.
   1 2   3       4     5
&lt;/#compress&gt;

We have text with spaces, tabs, and new lines.

weather
Today is a wonderful day.
1 2 3 4 5

The program removed all superfluous white-space.

## FreeMarker with Spark

In the following example, we are going to integrate the FreeMarker template
engine into our Spark application.

build.gradle
src
└── main
    ├── java
    │   └── com
    │       └── zetcode
    │           └── SparkFreeMarkerEx.java
    └── resources
        └── views
            └── hello.ftlh

This is the directory structure of the project.

build.gradle
  

apply plugin: 'java'
apply plugin: 'application'

archivesBaseName = "spark-freemarker"
version = '1.0'
mainClassName = "com.zetcode.SparkFreemarkerEx"

repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.sparkjava:spark-core:2.9.4'
  implementation 'com.sparkjava:spark-template-freemarker:2.7.1'
  implementation 'org.slf4j:slf4j-simple:1.7.36'
}

Here we have the Gradle build file, which includes the
spark-template-freemarker dependency.

com/zetcode/SparkFreeMarkerEx.java
  

package com.zetcode;

import freemarker.template.Configuration;
import freemarker.template.Version;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import spark.ModelAndView;
import spark.Request;
import spark.Response;
import static spark.Spark.get;
import spark.template.freemarker.FreeMarkerEngine;

public class SparkFreemarkerEx {

    public static void main(String[] args) throws IOException {
        
        Configuration conf = new Configuration(new Version(2, 3, 26));
        conf.setClassForTemplateLoading(SparkFreemarkerEx.class, "/views");

        get("/hello/:name/", SparkFreemarkerEx::message, new FreeMarkerEngine(conf));
    }

    public static ModelAndView message(Request req, Response res) {

        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("name", req.params(":name"));
        return new ModelAndView(params, "hello.ftlh");
    }
}

We set up the same application for FreeMarker.

Configuration conf = new Configuration(new Version(2, 3, 26));
conf.setClassForTemplateLoading(SparkFreemarkerEx.class, "/views");

We configure FreeMarker with the Configuration class. The template
files are going to be placed into the views directory, which must
be located on the classpath. 

get("/hello/:name/", SparkFreemarkerEx::message, new FreeMarkerEngine(conf));

The FreeMarkerEngine is passed to the get method.

resources/views/hello.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;Hello ${name}&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the hello.ftlh template file; it refers to the name variable
which was passed with the ModelAndView object.

$ curl localhost:4567/hello/Lucy/
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;Hello Lucy&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

## Spring Boot FreeMarker

In the next application, we integrate FreeMarker into a Spring Boot web
application.

build.gradle
src
└── main
    ├── java
    │   └── com
    │       └── zetcode
    │           ├── Application.java
    │           └── controller
    │               └── MyController.java
    └── resources
        └── templates
            ├── hello.ftlh
            └── index.ftlh

This is the project structure.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '2.7.1'
    id 'io.spring.dependency-management' version '1.0.11.RELEASE'
    id 'java'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
}

This is the Gradle build file. It includes dependencies for Spring Boot and
FreeMarker. There is no need to configure the FreeMarker in Spring Boot. Upon
finding the FreeMarker dependency in the POM file, Spring Boot automatically
takes care of the configuration. 

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

The Application sets up the Spring Boot application. The
@SpringBootApplication annotation defines the class as a
configuration class,enables auto-configuration, and enables component scanning.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyController {

    @GetMapping("/")
    public String index(Model model) {
        return "index";
    }

    @GetMapping("/hello")
    public String hello(Model model, @RequestParam(value="msg", required=false,
            defaultValue="Freemarker") String msg) {

        model.addAttribute("message", msg);
        return "hello";
    }
}

This is the controller class for the Spring Boot web application. The controller
has two mappings. The first mapping resolves to the index.ftl file
and the second mapping to the hello.ftlh file.

resources/templates/index.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Spring Boot Form&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;form action="/hello" method="get"&gt;
            &lt;p&gt;Message: &lt;input type="text" name="msg"&gt;&lt;/p&gt;
            &lt;p&gt;
                &lt;input type="submit" value="Submit"&gt;
                &lt;input type="reset" value="Reset"&gt;
            &lt;/p&gt;
        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the index.ftlh file. It has an HTML form which sends a message
to the server.

resources/templates/hello.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Freemarker example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;p&gt;${message}&lt;p&gt;
&lt;/body&gt;
&lt;/html&gt;

The server responds with a message back to the client. The response is created
from the hello.ftlh template file.

$ ./gradlew bootRun

The Spring Boot starts an embedded Tomcat server, listening on port 8080.

## Source

[Java FreeMarker manual](https://freemarker.apache.org/docs/index.html)

In this tutorial we have worked with the FreeMarker template engine.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).