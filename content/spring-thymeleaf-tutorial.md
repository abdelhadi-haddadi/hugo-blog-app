+++
title = "Spring Thymeleaf tutorial"
date = 2025-08-29T20:12:02.068+01:00
draft = false
description = "Spring Thymeleaf tutorial shows how to use Thymeleaf template engine in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Thymeleaf tutorial

last modified October 18, 2023

Spring Thymeleaf tutorial shows how to use Thymeleaf template engine in a
Spring application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Thymeleaf

*Thymeleaf* is a server-side Java template engine for both web and
standalone environments. It provides full Spring Framework integration.

## Spring Thymeleaf example

The following application uses Thymeleaf to generate views.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           ├───config
│   │           │       MyWebInitializer.java
│   │           │       WebConfig.java
│   │           ├───controller
│   │           │       MyController.java
│   │           └───service
│   │                   WordService.java
│   └───resources
│       │   logback.xml
│       └───templates
│               index.html
│               showWords.html
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
    &lt;artifactId&gt;springthymeleafex&lt;/artifactId&gt;
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
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;5.1.4.RELEASE&lt;/version&gt;
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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
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
        templateResolver.setPrefix("classpath:/templates/");
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

WebConfig configures Thymeleaf template engine. We set the 
template files location to templates directory on the classpath. 
(The resources is on the classpath.)

com/zetcode/service/WordService.java
  

package com.zetcode.service;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class WordService {

    private final List&lt;String&gt; words = List.of("pen", "sky",
            "rock", "forest", "falcon", "eagle");

    public List&lt;String&gt; all() {

        return words;
    }
}

The WordService returns a few words.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.service.WordService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping(value = "/")
    public String home() {

        return "index";
    }

    @GetMapping(value = "/words")
    public String showWords(Model model, WordService wordService) {

        var words = wordService.all();
        model.addAttribute("words", words);

        return "showWords";
    }
}

MyController provides mappings between request paths and handler methods.
We have two mappings: the home page and the showWords page.

var words = wordService.all();
model.addAttribute("words", words);

We retrieve all the words using the wordService and put
it into the model. The model is passed to Thymeleaf which will process the 
data in the template. 

resources/templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    &lt;a href="words"&gt;Show words&lt;/a&gt;
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

The home page contains the anchor which shows all words.

resources/templates/showWords.html
  

&lt;!DOCTYPE html&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;title&gt;Words&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;

&lt;body&gt;

&lt;h2&gt;List of words&lt;/h2&gt;

&lt;ul th:each="word : ${words}"&gt;
    &lt;li th:text="${word}"&gt;word&lt;/li&gt;
&lt;/ul&gt;

&lt;/body&gt;
&lt;/html&gt;

With the Thymeleaf's th:each directive, we show all 
the words in an HTML list.

$ mvn jetty:run

We run the server and locate to localhost:8080 to get the home page, 
which has the anchor.

In this article we have worked with the Thymeleaf template engine.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).