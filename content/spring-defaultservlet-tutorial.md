+++
title = "Spring DefaultServlet tutorial"
date = 2025-08-29T20:11:50.867+01:00
draft = false
description = "Spring DefaultServlet tutorial shows how to enable default servlet in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring DefaultServlet tutorial

last modified October 18, 2023

Spring DefaultServlet tutorial shows how to enable default servlet in a Spring application.

Spring is a popular Java application framework. In the tutorial, 
we use Spring 5 version.

## DefaultServlet

DefaultServlet is a default resource-serving servlet for most web applications, 
used to serve static resources such as HTML pages and images.     

DefaultServletHttpRequestHandler attempts to auto-detect the
default Servlet for the containers, such as Tomcat, Jetty, Wildfly, and Resin, 
at startup time. If the default Servlet has been custom configured with 
a different name then the default Servlet's name must be explicitly provided.

If we rewrite the DefaultServlet's route (/), we can enable it with 
DefaultServletHandlerConfigurer's enable method so that we can still 
serve static resoruces with the container's default servlet.

## Spring DefaultServlet example

In the following application we configure the Spring dispatcher servlet 
to the / path, which rewrites the default servlet's one.
We enable the default servlet with DefaultServletHandlerConfigurer.

The application serves a simple HTML home page, which is a static resource.    

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           └───config
│   │                   MyWebInitializer.java
│   │                   WebConfig.java
│   ├───resources
│   │       logback.xml
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
    &lt;artifactId&gt;defaultservletex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;
            &lt;artifactId&gt;logback-classic&lt;/artifactId&gt;
            &lt;version&gt;1.4.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;5.3.23&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.2&lt;/version&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven build file. We have the following dependencies: 
javax.servlet-api for Java Servlet technology, logback-classic
for logging, and spring-webmvc for creating Spring Web MVC 
applications. 

The maven-war-plugin creates web archives (WAR).

com/zetcode/config/MyWebInitializer.java
  

package com.zetcode.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

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

MyWebInitializer initializes a Spring web application.

@Override
protected String[] getServletMappings() {
    return new String[]{"/"};
}

We register the Spring DispatcherServlet to the /
path. This replaces the DefaultServlet; therefore we have to 
register a default servlet handler in the configuration file.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}

WebConfig enables Spring MVC with @EnableWebMvc and 
configures the DefaultServlet with DefaultServletHandlerConfigurer's
enable method. 

@Override
public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
}

The configureDefaultServletHandling configures a 
DefaultServletHttpRequestHandler with a URL mapping of 
/** and the lowest priority relative to other URL mappings.
This way the static resource requests are handled by the container's default Servlet. 

webapp/index.html
  

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

This is the home page. It is a static resource and is automatically served 
by the DefaultServlet.

$ curl localhost:8080
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

When we run the application, the home page is served.    

In this article we shown how to register a default servlet in a Spring application. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).