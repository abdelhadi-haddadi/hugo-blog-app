+++
title = "Spring WebJars tutorial"
date = 2025-08-29T20:12:02.051+01:00
draft = false
description = "Spring WebJars tutorial shows how to use WebJars in a Spring web application. WebJars are client-side web libraries (e.g. jQuery or Semantic UI) packaged into JAR (Java Archive) files."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring WebJars tutorial

last modified October 18, 2023

Spring WebJars tutorial shows how to use WebJars in a Spring web application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Webjars

WebJars are client-side web libraries (e.g. jQuery or Semantic UI) packaged
into JAR (Java Archive) files. WebJars automate the work with frontend 
libraries and assets.

## Spring WebJar example

In the following example, we use Semantic-UI WebJar. Semantic-UI is a popular 
CSS framework.

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
│               index.html
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
    &lt;artifactId&gt;WebJarEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.1.4.RELEASE&lt;/spring-version&gt;
        &lt;thymeleaf-version&gt;3.0.11.RELEASE&lt;/thymeleaf-version&gt;
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

        &lt;dependency&gt;
            &lt;groupId&gt;org.webjars&lt;/groupId&gt;
            &lt;artifactId&gt;Semantic-UI&lt;/artifactId&gt;
            &lt;version&gt;2.4.1&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.webjars&lt;/groupId&gt;
            &lt;artifactId&gt;webjars-locator&lt;/artifactId&gt;
            &lt;version&gt;0.34&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.thymeleaf&lt;/groupId&gt;
            &lt;artifactId&gt;thymeleaf-spring5&lt;/artifactId&gt;
            &lt;version&gt;${thymeleaf-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.thymeleaf&lt;/groupId&gt;
            &lt;artifactId&gt;thymeleaf&lt;/artifactId&gt;
            &lt;version&gt;${thymeleaf-version}&lt;/version&gt;
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

In the pom.xml we have the project dependencies. 

&lt;dependency&gt;
    &lt;groupId&gt;org.webjars&lt;/groupId&gt;
    &lt;artifactId&gt;Semantic-UI&lt;/artifactId&gt;
    &lt;version&gt;2.4.1&lt;/version&gt;
&lt;/dependency&gt;

We use the Semantic-UI WebJar.

&lt;dependency&gt;
    &lt;groupId&gt;org.webjars&lt;/groupId&gt;
    &lt;artifactId&gt;webjars-locator&lt;/artifactId&gt;
    &lt;version&gt;0.34&lt;/version&gt;
&lt;/dependency&gt;

The webjars-locator allows us to refer to the assets without 
referring to the version of the asset, which is automatically detected.

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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.zetcode"})
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private ApplicationContext applicationContext;

    @Bean
    public SpringResourceTemplateResolver templateResolver() {

        var templateResolver = new SpringResourceTemplateResolver();

        templateResolver.setApplicationContext(applicationContext);
        templateResolver.setPrefix("classpath:templates/");
        templateResolver.setSuffix(".html");

        return templateResolver;
    }

    @Bean
    public SpringTemplateEngine templateEngine() {

        var templateEngine = new SpringTemplateEngine();
        templateEngine.setTemplateResolver(templateResolver());
        templateEngine.setEnableSpringELCompiler(true);

        return templateEngine;
    }

    @Bean
    public ViewResolver viewResolver() {

        var resolver = new ThymeleafViewResolver();
        var registry = new ViewResolverRegistry(null, applicationContext);

        resolver.setTemplateEngine(templateEngine());
        registry.viewResolver(resolver);

        return resolver;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
                .addResourceHandler("/webjars/**")
                .addResourceLocations("/webjars/").resourceChain(false);
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}

The WebConfig configures the Thymeleaf template engine, tells 
Spring where to look for WebJars and enables forwarding to the default servlet
for handling of static resources.

@Override
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
            .addResourceHandler("/webjars/**")
            .addResourceLocations("/webjars/").resourceChain(false);
}

We will refer to the WebJars via the /webjars/ path. 
The resourceChain method must be called for version-agnostic 
WebJars.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MyController {

    @GetMapping(value = "/")
    public String home(Model model) {

        var words = List.of("wood", "star", "cloud", "water",
                "river", "spring");

        model.addAttribute("words", words);

        return "index";
    }
}  

MyController contains one route for the home page. We send some 
data to the template. The data will be presented in an HTML table, which will 
be styled with Semantic-UI.

resources/templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;link rel="stylesheet" th:href="@{/webjars/Semantic-UI/semantic.css}"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;section class="ui container"&gt;

    &lt;h2&gt;English words&lt;/h2&gt;

    &lt;table class="ui striped celled table"&gt;
        &lt;thead&gt;
        &lt;tr&gt;
            &lt;th&gt;Index&lt;/th&gt;
            &lt;th&gt;Word&lt;/th&gt;
        &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
        &lt;tr th:each="word : ${words}"&gt;
            &lt;td th:text="${wordStat.index + 1}"&gt;Index&lt;/td&gt;
            &lt;td th:text="${word}"&gt;A word&lt;/td&gt;
        &lt;/tr&gt;
        &lt;/tbody&gt;
    &lt;/table&gt;

&lt;/section&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the home page.

&lt;link rel="stylesheet" th:href="@{/webjars/Semantic-UI/semantic.css}"&gt;

We link to the semantic.css file, which comes from the WebJar.

&lt;table class="ui striped celled table"&gt;

The CSS classes come from the Semantic-UI library.

In this article we have created used a Semantic-UI WebJar to style an HTML 
table.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).