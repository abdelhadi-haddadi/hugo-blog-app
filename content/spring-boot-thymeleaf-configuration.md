+++
title = "Spring Boot Thymeleaf configuration"
date = 2025-08-27T23:20:57.415+01:00
draft = false
description = "Spring Boot Thymeleaf configuration tutorial shows how to configure Thymeleaf with Spring Boot web application."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Thymeleaf configuration

last modified July 13, 2020 

In Spring Boot Thymeleaf configuration tutorial, we are going to show how to configure Thymeleaf with Spring Boot web application.
When Spring Boot finds Thymeleaf dependency in the Maven POM file, it automatically configures
Thymeleaf template engine. This tutorial shows how to do in manually in Java configuration.

Spring is a popular Java application framework. 
Spring Boot is an effort to create stand-alone, production-grade 
Spring based applications with minimal effort.

## Thymeleaf

Thymeleaf is a modern server-side Java template engine for both web 
and standalone environments. It is built on the he concept of natural templates: 
template files that can be directly opened in browsers and that still display 
correctly as web pages. 

## Spring Boot Thymeleaf example

The following example uses Java configuration to set up Thymeleaf with Spring Boot.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───config
│   │                   WebConfig.java
│   └───resources
│       └───mytemplates
│               index.html
└───test
    └───java

This is the project structure. Thymeleaf template files are located in the 
custom src/main/resources/mytemplates directory. The default
template directory is src/main/resources/templates.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
            http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;thymeleafconfigex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;2.1.0.RELEASE&lt;/version&gt;
    &lt;/parent&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-devtools&lt;/artifactId&gt;
            &lt;optional&gt;true&lt;/optional&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
            &lt;optional&gt;true&lt;/optional&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-thymeleaf&lt;/artifactId&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven build file. The spring-boot-devtools enables hot swapping,
disables template cache and enables live reloading. The spring-boot-starter-thymeleaf 
is a starter for building Spring MVC applications with Thymeleaf. The spring-boot-starter-web
is a starter for web applications.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    @Description("Thymeleaf template resolver serving HTML 5")
    public ClassLoaderTemplateResolver templateResolver() {

        var templateResolver = new ClassLoaderTemplateResolver();

        templateResolver.setPrefix("mytemplates/");
        templateResolver.setCacheable(false);
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode("HTML5");
        templateResolver.setCharacterEncoding("UTF-8");

        return templateResolver;
    }

    @Bean
    @Description("Thymeleaf template engine with Spring integration")
    public SpringTemplateEngine templateEngine() {

        var templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver());

        return templateEngine;
    }

    @Bean
    @Description("Thymeleaf view resolver")
    public ViewResolver viewResolver() {

        var viewResolver = new ThymeleafViewResolver();

        viewResolver.setTemplateEngine(templateEngine());
        viewResolver.setCharacterEncoding("UTF-8");

        return viewResolver;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
    }
}

In the WebConfig we configure Thymeleaf and set a view and 
controller for the home page. The template engine is configured in Java code.

@Bean
@Description("Thymeleaf template resolver serving HTML 5")
public ClassLoaderTemplateResolver templateResolver() {

This bean defines a template resolver. A template resolver resolves templates 
into TemplateResolution objects that contain additional 
information such as template mode, caching, prefix and suffix of templates.
ClassLoaderTemplateResolver is used for loading templates located
on the classpath.

templateResolver.setPrefix("mytemplates/");

We set the template directory to mytemplates.
When using ClassLoaderTemplateResolver, there is no classpath:
in the prefix.

templateResolver.setTemplateMode("HTML5");

The template engine will serve HTML5 content.

@Bean
@Description("Thymeleaf template engine with Spring integration")
public SpringTemplateEngine templateEngine() {
    
    var templateEngine = new SpringTemplateEngine();
    templateEngine.setTemplateResolver(templateResolver());

    return templateEngine;
}

A Thymeleaf template engine with Spring integration is created.

@Bean
@Description("Thymeleaf view resolver")
public ViewResolver viewResolver() {

    var viewResolver = new ThymeleafViewResolver();
    
    viewResolver.setTemplateEngine(templateEngine());
    viewResolver.setCharacterEncoding("UTF-8");

    return viewResolver;
}    

Here we configure a bean which creates a ThymeleafViewResolver.
View resolvers are responsible for obtaining View objects for a specific operation and locale. 
The view objects are then rendered into HTML file.

@Override
public void addViewControllers(ViewControllerRegistry registry) {
    registry.addViewController("/").setViewName("index");
}

In this simple application, we do not have a specific controller class. We define
an automated controller with the addViewController method.

resources/templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"/&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"/&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
        &lt;span th:text="'Today is: ' + ${#dates.format(#dates.createNow(), 'dd MMM yyyy HH:mm')}" th:remove="tag"&gt;&lt;/span&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is a Thymeleaf template file. It displays the current date.

com/zetcodeApplication.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

This code sets up the Spring Boot application. The @SpringBootApplication
enables auto-configuration and component scanning.

$ mvn spring-boot:run

We start the application.

$ curl localhost:8080
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
    Today is: 17 Jan 2019 23:46
&lt;/p&gt;
&lt;/body&gt;    

In this tutorial, we have created a Spring Boot web application with Thymeleaf.