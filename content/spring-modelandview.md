+++
title = "Spring ModelAndView"
date = 2025-08-29T20:11:55.329+01:00
draft = false
description = "Spring ModelAndView tutorial shows how to use ModelAndView in a controller in a Spring web application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring ModelAndView

last modified October 18, 2023

Spring ModelAndView tutorial shows how to use ModelAndView in a controller in a
Spring web application.

Spring is a popular Java application framework for creating enterprise
applications. 

## ModelAndView

ModelAndView is a holder for both Model and
View in the web MVC framework. These two classes are distinct;
ModelAndView merely holds both to make it possible for a controller
to return both model and view in a single return value. 

The view is resolved by a ViewResolver object; the model is data
stored in a Map.

## Spring ModelAndView example

The following application uses ModelAndView to return a model and a view in one
step in a Spring controller. We use Freemarker for view resolving.

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
│   └───resources
│       │   logback.xml
│       └───templates
│               index.ftlh
│               show.ftlh
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
    &lt;artifactId&gt;springmodelandview&lt;/artifactId&gt;
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
            &lt;artifactId&gt;spring-context-support&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.freemarker&lt;/groupId&gt;
            &lt;artifactId&gt;freemarker&lt;/artifactId&gt;
            &lt;version&gt;2.3.31&lt;/version&gt;
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

In the pom.xml we have the necessary dependencies.

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

The logback.xml is a configuration file for the Logback logging library.

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

MyWebInitializer registers the Spring DispatcherServlet, which 
is a front controller for a Spring web application.

@Override
protected Class&lt;?&gt;[] getServletConfigClasses() {
    
    return new Class[]{WebConfig.class};
}

The getServletConfigClasses returns a web configuration class.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.zetcode"})
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public FreeMarkerViewResolver freemarkerViewResolver() {

        var resolver = new FreeMarkerViewResolver();
        resolver.setCache(true);
        resolver.setSuffix(".ftlh");
        return resolver;
    }

    @Bean
    public FreeMarkerConfigurer freemarkerConfig() {

        var freeMarkerConfigurer = new FreeMarkerConfigurer();
        freeMarkerConfigurer.setTemplateLoaderPath("classpath:/templates/");
        return freeMarkerConfigurer;
    }
}

WebConfig configures FreeMarker template engine. We set the 
template files location to templates directory on the classpath. 
(The resources is on the classpath.)

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
public class MyController {

    @GetMapping(value = "/")
    public String home() {

        return "index";
    }

    @GetMapping(value = "/show")
    public ModelAndView show() {

        var mav = new ModelAndView();

        var now = LocalDateTime.now();
        var formatter = DateTimeFormatter.ISO_DATE_TIME;
        var dateTimeFormatted = formatter.format(now);

        mav.addObject("now", dateTimeFormatted);
        mav.setViewName("show");

        return mav;
    }
}

MyController provides two GET mappings.

@GetMapping(value = "/show")
public ModelAndView show() {

The show method returns a ModelAndView.

var mav = new ModelAndView();

var now = LocalDateTime.now();
var formatter = DateTimeFormatter.ISO_DATE_TIME;
var dateTimeFormatted = formatter.format(now);

mav.addObject("now", dateTimeFormatted);
mav.setViewName("show");

return mav;

A ModelAndView is created and filled with data. The data 
is a formatted datetime object. The view name is set with setViewName.
Spring resolves the view name to show.ftl.

resources/templates/index.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;p&gt;
            &lt;a href="show"&gt;Show today's datetime&lt;/a&gt;
        &lt;/p&gt;

    &lt;/body&gt;
&lt;/html&gt;

The home page contains a link to show today's datetime.

resources/templates/show.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Today's date&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;p&gt;
            Today is: ${now}
        &lt;/p&gt;

    &lt;/body&gt;
&lt;/html&gt;

In the show.ftlh view we show the current datetime with ${}
syntax.

$ mvn jetty:run

We run the server and locate to localhost:8080 to get the home page, 
which has the link.

In this article we have organized model and view with ModelAndView.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).