+++
title = "Spring @RequestMapping"
date = 2025-08-29T20:11:59.744+01:00
draft = false
description = "Spring @RequestMapping shows how to use @RequestMapping annotation in a Spring web application. The annotation is used for mapping web requests onto handler methods in request-handling classes."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @RequestMapping

last modified October 18, 2023

In this article we show how to use @RequestMapping annotation in a classic
Spring web application. The annotation is used for mapping web requests onto
handler methods in request-handling classes.

Spring is a popular Java application framework for creating
enterprise applications.

## @RequestMapping

@RequestMapping is used for mapping web requests onto handler methods in
request-handling classes. The process of mapping web requests to handler methods
is also called routing.

@RequestMapping has the following specializations:

    - @GetMapping

    - @PostMapping

    - @PutMapping

    - @DeleteMapping

    - @PatchMapping

The annotation can be used both at the class and at the method level. If used on
both levels, the request paths are combined.

## Spring @RequestMapping example

In the following example, we demonstrate the usage of the
@RequestMapping annotation.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           ├───config
│   │           │       MyWebInitializer.java
│   │           │       WebConfig.java
│   │           └───controller
│   │                   MyController.java
│   │                   TestController.java
│   └───resources
│           index.html
│           logback.xml
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
    &lt;artifactId&gt;RequestMappingEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.3.23&lt;/spring-version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;
            &lt;artifactId&gt;logback-classic&lt;/artifactId&gt;
            &lt;version&gt;1.4.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.2&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;9.4.49.v20220914&lt;/version&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

In the pom.xml we have the project dependencies.

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="INFO"/&gt;

    &lt;appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender"&gt;
        &lt;encoder&gt;
            &lt;Pattern&gt;%d{HH:mm:ss.SSS} %blue(%-5level) %magenta(%logger{36}) - %msg %n
            &lt;/Pattern&gt;
        &lt;/encoder&gt;
    &lt;/appender&gt;

    &lt;root&gt;
        &lt;level value="INFO" /&gt;
        &lt;appender-ref ref="consoleAppender" /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;

This is the logback.xml configuration

resources/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    This is home page.
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is a home page.

com/zetcode/config/MyWebInitializer.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

@Configuration
public class MyWebInitializer extends
        AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class&lt;?&gt;[] getRootConfigClasses() {
        return null;
    }

    @Override
    protected Class&lt;?&gt;[] getServletConfigClasses() {

        return new Class[]{WebConfig.class};
    }

    @Override
    protected String[] getServletMappings() {

        return new String[]{"/"};
    }
}

MyWebInitializer initializes the Spring web application. It contains one
configuration class: WebConfig.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.zetcode"})
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}

The WebConfig configures the Spring web application.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalTime;

@RestController
public class MyController {

    @RequestMapping(value = "/")
    public String home() {

        return "This is Home page";
    }

    @RequestMapping(value = "/about", method = RequestMethod.POST)
    public String about() {

        return "This is About page; POST request";
    }

    @RequestMapping(value = "/fresh", method = {RequestMethod.POST, RequestMethod.GET})
    public String fresh() {

        return "This is Fresh page; GET/POST request";
    }

    @RequestMapping(value = "/todo", consumes = "text/plain")
    public String todo() {

        return "This is Todo page; text/plain content type";
    }

    @RequestMapping(value = "/time", params = { "info=time" })
    public String showTime() {

        var now = LocalTime.now();

        return String.format("%s", now.toString());
    }
}

MyController various route definitions with @RequestMapping.

@RequestMapping(value = "/")
public String home() {

    return "This is Home page";
}

With value option, we map the / request path to the
home handler method. If not expplicitly specified, the default request
method is GET. The value is an alias to the path option.

@RequestMapping(value = "/about", method = RequestMethod.POST)
public String about() {

    return "This is About page; POST request";
}

With the method option, we can narrow the handler mapping to
POST requests having the /about path.

@RequestMapping(value = "/fresh", method = {RequestMethod.POST, RequestMethod.GET})
public String fresh() {

    return "This is Fresh page; GET/POST request";
}

This method can accept both GET and POST requests.

@RequestMapping(value = "/todo", consumes = "text/plain")
public String todo() {

    return "This is Todo page; text/plain content type";
}

With the consumes option we can narrow down the mapping to the
requests with defined content type.

@RequestMapping(value = "/time", params = { "info=time" })
public String showTime() {

    var now = LocalTime.now();

    return String.format("%s", now.toString());
}

With the params option we narrow down the mapping to the GET requests
with /time path and info=time request parameter.

com/zetcode/controller/TestController.java
  

package com.zetcode.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/test")
public class TestController {

    @RequestMapping(value = "/info")
    public String info() {

        return "This is info page";
    }

    @RequestMapping(path="*.do")
    public String somePage() {

        return "This is some page";
    }
}

TestController has additional two mappings.

@RestController
@RequestMapping(value="/test")
public class TestController {

We can place @RequestMapping on class, too. The path is then combined
with the method paths.

@RequestMapping(value = "/info")
public String info() {

    return "This is info page";
}

This handler is mapped to the /test/info path.

@RequestMapping(path="*.do")
public String somePage() {

    return "This is some page";
}

The path option is equivalent to the value. It can accept Ant-style
URL mappings.

$ mvn jetty:run

We run the Jetty server.

$ curl localhost:8080
This is Home page

We generate a GET request to the home page with curl tool.

$ curl -X POST localhost:8080/about
This is About page; POST request

This is a POST request to the /about path.

$ curl -X POST localhost:8080/fresh
This is Fresh page; GET/POST request
$ curl -X GET localhost:8080/fresh
This is Fresh page; GET/POST request

The /fresh page accepts both GET and POST requests.

$ curl -d "info=time" localhost:8080/time
13:24:29.934670700

We send a request with a parameter to the /time page.

$ curl localhost:8080/test/info
This is info page

The class-level and method-level annotations are combined into the /test/info
path.

$ curl localhost:8080/test/produce.do
This is some page

Finally, the ant-style mapping.

In this article we have created created various routes with @RequestMapping
annotation.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).