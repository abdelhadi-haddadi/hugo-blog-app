+++
title = "Spring Boot Thymeleaf configuration"
date = 2025-08-29T20:12:36.614+01:00
draft = false
description = "Spring Boot Thymeleaf configuration tutorial shows how to configure Thymeleaf in a Spring Boot web application. Thymeleaf is a modern server-side Java template engine for both web and standalone environments."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Thymeleaf configuration

last modified July 29, 2023

In this article we show how to configure Thymeleaf with Spring Boot web
application. When Spring Boot finds Thymeleaf dependency in the Gradle build
file, it automatically configures Thymeleaf template engine. This tutorial shows
how to do it manually with Java configuration.

Spring is a popular Java application framework. 
Spring Boot is an effort to create stand-alone, production-grade 
Spring based applications with minimal effort.

## Thymeleaf

Thymeleaf is a modern server-side Java template engine for both web 
and standalone environments. It is built on the concept of natural templates: 
template files that can be directly opened in browsers and that still display 
correctly as web pages. 

## Spring Boot Thymeleaf configuration example

The following example uses Java configuration to set up Thymeleaf with Spring
Boot.

build.gradle
...
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

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
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
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
}

This is the build file. The spring-boot-starter-thymeleaf 
is a starter for building Spring MVC applications with Thymeleaf. The
spring-boot-starter-web is a starter for web applications.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.view.ThymeleafViewResolver;
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

We set the template directory to mytemplates. When using
ClassLoaderTemplateResolver, there is no classpath:
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

com/zetcode/Application.java
  

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

$ ./gradlew bootRun

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
    Today is: 21 Jul 2023 17:08
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

In this article we have created a Spring Boot web application with Thymeleaf
template engine. We showed how to configure Thymeleaf.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).