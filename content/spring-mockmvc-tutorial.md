+++
title = "Spring MockMvc tutorial"
date = 2025-08-29T20:11:55.319+01:00
draft = false
description = "Spring MockMvc tutorial shows how to test Spring MVC application with MockMvc."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring MockMvc tutorial

last modified October 18, 2023

Spring MockMvc tutorial shows how to test Spring MVC application 
with MockMvc.

Spring is a popular Java application framework for creating enterprise
applications. 

## MockMvc

MockMvc is defined as a main entry point for server-side Spring MVC testing.
Tests with MockMvc lie somewhere between between unit and integration tests.

## Spring MockMvc example

The following application uses MockMvc to test a Spring MVC application.
We create a test for a template and for a RESTful controller method.

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
│       └───WEB-INF
│           └───templates
│                   index.html
└───test
    └───java
        └───com
            └───zetcode
                └───controller
                        MyControllerTest.java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;mockmvcex&lt;/artifactId&gt;
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
            &lt;groupId&gt;junit&lt;/groupId&gt;
            &lt;artifactId&gt;junit&lt;/artifactId&gt;
            &lt;version&gt;4.12&lt;/version&gt;
            &lt;scope&gt;test&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-test&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.thymeleaf&lt;/groupId&gt;
            &lt;artifactId&gt;thymeleaf-spring5&lt;/artifactId&gt;
            &lt;version&gt;3.0.11.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.thymeleaf&lt;/groupId&gt;
            &lt;artifactId&gt;thymeleaf&lt;/artifactId&gt;
            &lt;version&gt;3.0.11.RELEASE&lt;/version&gt;
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

In the pom.xml file we have the following dependencies: logback-classic, 
javax.servlet-api, junit, spring-webmvc, 
spring-test, thymeleaf-spring5 and thymeleaf.

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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ViewResolverRegistry;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring5.view.ThymeleafViewResolver;

@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.zetcode"})
public class WebConfig {

    @Autowired
    private ApplicationContext applicationContext;

    @Bean
    public SpringResourceTemplateResolver templateResolver() {

        var templateResolver = new SpringResourceTemplateResolver();

        templateResolver.setApplicationContext(applicationContext);
        templateResolver.setPrefix("/WEB-INF/templates/");
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
}

The WebConfig enables Spring MVC annotations with @EnableWebMvc
and configures component scanning for the com.zetcode package. It sets up
the Thymeleaf engine.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDateTime;

@Controller
public class MyController {

    @GetMapping(value = "/", produces = MediaType.TEXT_HTML_VALUE)
    public String home(Model model) {

        model.addAttribute("now", LocalDateTime.now());

        return "index";
    }

    @GetMapping(value = "/message", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String message() {

        return "Hello there!";
    }
}

MyController provides two handler methods. The home method
return a view with a single attribute and the message method returns 
a plain text message. In our tests we test these two methods.

WEB-INF/templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
Today is: &lt;span th:text="${now}"&gt;&lt;/span&gt;
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is the index.html view.

com/zetcode/controller/MyControllerTest.java
  

package com.zetcode.controller;

import org.junit.Before;
import org.junit.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

public class MyControllerTest {

    private MockMvc mockMvc;

    @Before
    public void setup() {
        this.mockMvc = MockMvcBuilders.standaloneSetup(new MyController()).build();
    }

    @Test
    public void testHomePage() throws Exception {
        this.mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andDo(MockMvcResultHandlers.print())
                .andReturn();
    }

    @Test
    public void testMessagePage() throws Exception {
        this.mockMvc.perform(get("/message")).andExpect(status().isOk())
                .andExpect(content().string("Hello there!"));
    }
}

MyControllerTest tests the two handlers.

private MockMvc mockMvc;

@Before
public void setup() {
    this.mockMvc = MockMvcBuilders.standaloneSetup(new MyController()).build();
}

We set up the MockMvc. We add the MyController to the 
standalone setup. The MockMvcBuilders.standaloneSetup allows to register 
one or more controllers without the need to use the full WebApplicationContext.      

@Test
public void testHomePage() throws Exception {
    this.mockMvc.perform(get("/"))
            .andExpect(status().isOk())
            .andExpect(view().name("index"))
            .andDo(MockMvcResultHandlers.print());
}

We test the home page. We verify the status and the returned view name.
We also print the result.

@Test
public void testMessagePage() throws Exception {
    this.mockMvc.perform(get("/message")).andExpect(status().isOk())
            .andExpect(content().string("Hello there!"));
}

We test the message page. Since it is a RESTful method, we verify the status and 
the returned string. 

$ mvn -q test

We run the tests with mvn -q test.

In this article we have created tests for Spring MVC with MockMvc.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).