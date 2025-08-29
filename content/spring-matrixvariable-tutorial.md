+++
title = "Spring @MatrixVariable tutorial"
date = 2025-08-29T20:11:54.229+01:00
draft = false
description = "Spring @MatrixVariable tutorial shows how to parse URL parameters with @MatrixVariable."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring @MatrixVariable tutorial

last modified October 18, 2023

Spring @MatrixVariable tutorial shows how to parse URL parameters
with @MatrixVariable.

Spring is a popular Java application framework for creating enterprise
applications. 

## @MatrixVariable

@MatrixVariable is used to parse name-value pairs within a path segment
and bind them to method parameters. Multiple pairs are separated with semicolon. 
Matrix variables must be enabled first. 

## Spring @MatrixVariable example

The following application parses name-value pairs from the URL path segments.

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
│   ├───resources
│   └───webapp
│           index.html
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
    &lt;artifactId&gt;matrixvariableex&lt;/artifactId&gt;
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

In the pom.xml file, we have the project dependencies.

com/zetcode/config/MyWebInitializer.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.FrameworkServlet;
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
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.util.UrlPathHelper;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.zetcode"})
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        var urlPathHelper = new UrlPathHelper();
        urlPathHelper.setRemoveSemicolonContent(false);
        configurer.setUrlPathHelper(urlPathHelper);
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}

The WebConfig configures the Spring web application.

@Override
public void configurePathMatch(PathMatchConfigurer configurer) {
    var urlPathHelper = new UrlPathHelper();
    urlPathHelper.setRemoveSemicolonContent(false);
    configurer.setUrlPathHelper(urlPathHelper);
}

Here we enable matrix variables.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.MatrixVariable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class MyController {

    @GetMapping(value = "/user/{first}/{last}",
            produces = MediaType.TEXT_PLAIN_VALUE)
    public String handler1(@MatrixVariable("first") String first,
                       @MatrixVariable("last") String last) {

        return String.format("Hello %s %s", first, last);
    }

    @GetMapping(value = "/data/{user:.*}",
            produces = MediaType.TEXT_PLAIN_VALUE)
    public String handler2(@MatrixVariable Map&lt;String, String&gt; data) {

        return String.format("Id: %s\nFirst name: %s\nLast Name: %s\nEmail: %s\n",
                data.get("id"), data.get("first"), data.get("last"), data.get("email"));
    }

    @GetMapping(value = "/geo/{continent}",
            produces = MediaType.TEXT_PLAIN_VALUE)
    public String handler3(@PathVariable("continent") String continent,
                         @MatrixVariable("country") String country,
                         @MatrixVariable("capital") String capital) {

        return String.format("Continent: %s\nCountry: %s\nCapital: %s\n",
                continent, country, capital);
    }
}

MyController contains mappings of request paths to handler methods.

@GetMapping(value = "/user/{first}/{last}",
        produces = MediaType.TEXT_PLAIN_VALUE)
public String handler1(@MatrixVariable("first") String first,
                    @MatrixVariable("last") String last) {

    return String.format("Hello %s %s", first, last);
}

Here we bind multiple matrix variables to method parameters with @MatrixVariable.

@GetMapping(value = "/data/{user:.*}",
        produces = MediaType.TEXT_PLAIN_VALUE)
public String handler2(@MatrixVariable Map&lt;String, String&gt; data) {

    return String.format("Id: %s\nFirst name: %s\nLast Name: %s\nEmail: %s\n",
            data.get("id"), data.get("first"), data.get("last"), data.get("email"));
}

Here we map multiple name-value pairs into a map.

@GetMapping(value = "/geo/{continent}",
        produces = MediaType.TEXT_PLAIN_VALUE)
public String handler3(@PathVariable("continent") String continent,
                        @MatrixVariable("country") String country,
                        @MatrixVariable("capital") String capital) {

    return String.format("Continent: %s\nCountry: %s\nCapital: %s\n",
            continent, country, capital);
}

In the third case, we combine @MatrixVariable with @PathVariable.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    &lt;a href="http://localhost:8080/user/first=John/last=Doe"&gt;Greet user&lt;/a&gt;
&lt;/p&gt;

&lt;p&gt;
    &lt;a href="http://localhost:8080/data/id=1;first=John;last=Doe;email=johndoe@gmail.com"&gt;Show user data&lt;/a&gt;
&lt;/p&gt;

&lt;p&gt;
    &lt;a href="http://localhost:8080/geo/Europe;country=Slovakia;capital=Bratislava"&gt;Show country info&lt;/a&gt;
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the home page. We have three links that contain name-value pairs which are parsed with 
@MatrixVariable annotations.

In this article we have used @MatrixVariable to parse name-value pairs on the 
path segments and bind them to method parameters.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).