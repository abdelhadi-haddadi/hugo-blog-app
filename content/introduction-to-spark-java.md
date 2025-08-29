+++
title = "Introduction to Spark Java"
date = 2025-08-29T20:00:32.433+01:00
draft = false
description = "This is an introductory tutorial of the Spark Java web framework."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Spark Java

last modified January 27, 2024

 

This is an introductory tutorial of the Spark Java web framework. We introduce
the Spark Java framework and provide three code examples.

## Spark Java

Spark is a Java micro framework for creating web applications in Java
8 with minimal effort. Spark framework is a simple and lightweight Java web
framework built for rapid development. It was inspired by *Sinatra*, a
popular Ruby micro framework.

Spark uses lambda expressions extensively, which makes Spark applications a lot
less verbose. In contrast to other Java web frameworks, Spark does not use
heavily XML files or annotations.

## Routes

A Spark application contains a set of routes. A route maps URL patterns to Java handlers.

A route has three parts:

- a verb, including get, post, put, delete, head, trace, connect, and options

- a path such as /first or /hello/:name

- a callback (request, response) -&gt; { }

## Spark first example

The first application returns a simple message. Gradle is used to build the
application.

build.gradle
src
└── main
    └── java
        └── com
            └── zetcode
                └── FirstSparkEx.java

This is the project structure. The Gradle's Java plugin expects the
Java production code to be located in src/main/java directory.

build.gradle
  

apply plugin: 'java'
apply plugin: 'application'

archivesBaseName = "first"
version = '1.0'
mainClassName = "com.zetcode.FirstSparkEx"

repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.sparkjava:spark-core:2.9.4'
  implementation 'org.slf4j:slf4j-simple:1.7.36'
}

This is the Gradle build file. It includes dependencies for Spark core
components and the slf4j simple logger.

com/zetcode/FirstSpark.java
  

package com.zetcode;

import static spark.Spark.get;

public class FirstSparkEx {

    public static void main(String[] args) {

        get("/hello", (req, res) -&gt; "Hello there!");
    }
}

The applications returns the "First Spark application message" to the GET
request. When we run the application, Spark starts an embedded Jetty web server.

get("/hello", (req, res) -&gt; "Hello there!");

The get method maps the routes for HTTP GET requests. In the Spark
lingo, a route is a handler A *route* is a URL pattern that is mapped to
a handler. A handler can be a physical file or a 

$ gradle run

We run the application with gradle run command. 
An embedded Jetty server is started.

$ curl localhost:4567/hello
Hello there!

We send a GET request to the server with the curl tool. The
built-in embedded Jetty server listens on port 4567 by default.

## Spark request parameter

The second application will respond with a greeting to the user. The client
sends a name with the URL and the application responds with a greeting to the
user.

build.gradle
  

apply plugin: 'java'
apply plugin: 'application'

archivesBaseName = "hello"
version = '1.0'
mainClassName = "com.zetcode.HelloSparkEx"

repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.sparkjava:spark-core:2.9.4'
  implementation 'org.slf4j:slf4j-simple:1.7.36'
}

This is the Gradle build file of the application.

build.gradle
src
└── main
    └── java
        └── com
            └── zetcode
                └── HelloSparkEx.java

This is the project structure.

com/zetcode/HelloSparkEx.java
  

package com.zetcode.hellospark;

import static spark.Spark.get;

public class HelloSparkEx {
    public static void main(String[] args) {
        get("/hello/:name/", (req, res) -&gt; "Hello " + req.params(":name"));
    }
}

The Spark application retrieves the request parameter, builds a message, and
returns it to the caller.

get("/hello/:name/", (req, res) -&gt; "Hello " + req.params(":name"));

The params method returns the value of the provided route 
pattern parameter.

$ gradle run

We run the application.

$ curl localhost:4567/hello/Peter/
Hello Peter

We send a request to the server; the URL includes a name. The application sends
back a greeting.

## Template engines

Spark does not have its own templating system; it uses third-party engines.
In the following two examples, we use Thymeleaf and FreeMarker.

### Using Thymeleaf

In the following example, we are going to integrate the Thymeleaf template
engine into our Spark application. Thymeleaf is a modern server-side
Java template engine for both web and standalone environments.

build.gradle
src
└── main
    ├── java
    │   └── com
    │       └── zetcode
    │           └── SparkThymeleafEx.java
    └── resources
        └── templates
            └── hello.html

This is the directory structure of the project. The template files are located
in the src/main/resources/templates directory.

build.gradle
  

apply plugin: 'java'
apply plugin: 'application'

archivesBaseName = "spark-thymeleaf"
version = '1.0'
mainClassName = "com.zetcode.SparkThymeleafEx"

repositories {
  mavenCentral()
}

dependencies {
  implementation 'com.sparkjava:spark-core:2.9.4'
  implementation 'com.sparkjava:spark-template-thymeleaf:2.7.1'
  implementation 'org.slf4j:slf4j-simple:1.7.36'
}

Here we have the Gradle build file, which includes the spark-template-thymeleaf
dependency.

com/zetcode/SparkThymeleafEx.java
  

package com.zetcode;

import java.util.HashMap;
import java.util.Map;
import spark.ModelAndView;
import spark.Request;
import spark.Response;
import spark.template.thymeleaf.ThymeleafTemplateEngine;
import static spark.Spark.get;
import static spark.Spark.staticFileLocation;

public class SparkThymeleafEx {

    public static void main(String[] args) {

        get("/hello/:name/", SparkThymeleafEx::message, new ThymeleafTemplateEngine());
    }

    public static ModelAndView message(Request req, Response res) {
        
        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("name", req.params(":name"));
        return new ModelAndView(params, "hello");
    }
}

The application reads the request parameter and puts it into the
ModelAndView object. 

get("/hello/:name/", SparkThymeleafEx::message, new ThymeleafTemplateEngine());

An instance of the ThymeleafTemplateEngine is passed to the
get method.

resources/templates/hello.html
  

&lt;pre class="code"&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;&lt;/meta&gt;
    &lt;title&gt;Hello user&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p th:inline="text"&gt;Hello, [[${name}]]!&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the hello.html template file. It refers to the name variable
which was passed with the ModelAndView object.

$ curl localhost:4567/hello/Peter/
&lt;!DOCTYPE html&gt;

&lt;html lang="en" xmlns="http://www.w3.org/1999/xhtml"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8" /&gt;
    &lt;title&gt;Hello user&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;Hello, Peter!&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

### FreeMarker

In the following example, we are going to integrate the FreeMarker
template engine into our Spark application. FreeMarker is a well 
established  Java template engine.

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

This is the directory structure of the project. The template file is located
in the src/main/resources/views directory.

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

We configure FreeMarker with the Configuration class. 
The template files are going to be placed into the views directory, 
which must be located on the classpath. 

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

## Source

[Java Spark documentation](https://sparkjava.com/documentation)

In this article we have introduced the Spark Java framework. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).