+++
title = "Spring forward tutorial"
date = 2025-08-29T20:11:52.003+01:00
draft = false
description = "Spring forward tutorial shows how to forward a request in a Spring web application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring forward tutorial

last modified October 18, 2023

Spring forward tutorial shows how to forward a request in a Spring web
application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Forward

The special forward: prefix in a view name performs a forward to
different URL. Forwarding a URL transfers the request internally within the
same server without involving the client browser. Forwards are performed 
less often than redirects.

## Redirect vs Forward

A request can be basically processed in three ways: a) resolved by Spring in a 
controller action, b) forwarded to a different controller action, c) redirected 
to client to fetch another URL.

Forward:

    - performed internally by Spring

    - the browser is completely unaware of forward, so its original URL remains intact

    - a browser reload of the resulting page repeats the original request, with the original URL

    - data sent in the request is available to the forwarded action

    

Redirect:

    - is a two step process

    - Spring instructs the browser to fetch a second URL, which differs from the original

    - a browser reload of the second URL will not repeat the original request, but will rather fetch the second URL

    - data sent in the original request scope is not available to the second request

## Spring Forward example

The following application uses forwards to a different URL after a form submission.
It performs a forward with the forward: prefix.

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
│       │
│       └───templates
│               show.ftl
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
    &lt;artifactId&gt;springforwardex&lt;/artifactId&gt;
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
            &lt;version&gt;5.3.23&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-context-support&lt;/artifactId&gt;
            &lt;version&gt;5.3.23&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.freemarker&lt;/groupId&gt;
            &lt;artifactId&gt;freemarker&lt;/artifactId&gt;
            &lt;version&gt;2.3.28&lt;/version&gt;
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
        resolver.setSuffix(".ftl");
        return resolver;
    }

    @Bean
    public FreeMarkerConfigurer freemarkerConfig() {

        var freeMarkerConfigurer = new FreeMarkerConfigurer();
        freeMarkerConfigurer.setTemplateLoaderPath("classpath:/templates/");
        return freeMarkerConfigurer;
    }
}

WebConfig configures Freemarker. We set the template files location
to templates directory on the classpath. (The
resources is on the classpath.)

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MyController {

    private static final Logger logger = LoggerFactory.getLogger(MyController.class);

    @GetMapping(value = "/sendname")
    public String send(@RequestParam(defaultValue = "guest") String name, Model model) {

        logger.info("sendname called");

        model.addAttribute("name", name);

        return "forward:/newpage";
    }

    @GetMapping(value = "/newpage")
    public String newpage() {

        logger.info("newpage called");

        return "show";
    }
}

MyController provides two GET mappings.

@GetMapping(value = "/sendname")
public String send(@RequestParam(defaultValue = "guest") String name, Model model) {

    logger.info("send name called");

    model.addAttribute("name", name);

    return "forward:/newpage";
}

A request sent to /sendname is processed by send action. 
A request parameter is read and added to the model. In the end, it is forwarded 
to a new controller action.

@GetMapping(value = "/newpage")
public String newpage() {

    logger.info("newpage called");

    return "show";
}

The newpage action resolves the request to a show
view. 

resources/templates/show.ftl
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Show&lt;/title&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
User name: ${name}
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

The show.ftl display the user name.

$ mvn jetty:run

We run the server and locate to localhost:8080/sendname?name=Peter.

09:52:11.636 INFO  com.zetcode.controller.MyController - sendname called 
09:52:11.653 INFO  com.zetcode.controller.MyController - newpage called 

The server log contains these lines.

In this article we have performed a forward in a Spring controller.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).