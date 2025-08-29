+++
title = "Introduction to Spring web applications"
date = 2025-08-29T19:48:46.930+01:00
draft = false
description = "Spring first web application tutorials shows how create simple web applications in Spring. Each of the applications is configured in a different way: with XML, Java config classes, and Spring Boot autoconfiguration."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to Spring web applications

last modified July 13, 2020 

In this tutorial, we are going to create simple web applications in 
Spring. Three web applications are created; each of the applications
is configured in a different way. 

In our Spring web applications, we use Spring 5 and Thymeleaf 3.    

Spring is a popular Java application framework. 
Spring Boot is an effort to create stand-alone, production-grade 
Spring based applications with minimal effort.

There are three basic approaches to configure a Spring web application:

  - XML

  - Java Config

  - Spring Boot autoconfiguration

Traditionally, Spring has used XML files to configure applications. Later, a new approach 
was created where the configuration is done in the Java configuration classes. Spring Boot
autoconfiguration magic is the latest approach to configure Spring web applications.

## Spring web application configuration with XML

In the first example, we create a Spring web application configured in XML files.

pom.mxl
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           └───controller
│   │                   HomeController.java
│   ├───resources
│   └───webapp
│       │   index.html
│       └───WEB-INF
│           │   spring-servlet.xml
│           │   web.xml
│           └───templates
│                   showMessage.html
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
    &lt;artifactId&gt;springwebfirst&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.slf4j&lt;/groupId&gt;
            &lt;artifactId&gt;slf4j-api&lt;/artifactId&gt;
            &lt;version&gt;1.7.25&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.slf4j&lt;/groupId&gt;
            &lt;artifactId&gt;slf4j-simple&lt;/artifactId&gt;
            &lt;version&gt;1.7.25&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
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
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;5.1.3.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.2.2&lt;/version&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven build file. We have the following dependencies: slf4j-api, 
and slf4j-simple for logging, javax.servlet-api for Java Servlet 
technology, thymeleaf-spring5 and thymeleaf
for the Thymeleaf template engine, and spring-webmvc for creating Spring Web MVC 
applications. 

The maven-war-plugin creates web archives (WAR).

WEB-INF/spring-servlet.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:mvc="http://www.springframework.org/schema/mvc"
        xsi:schemaLocation="http://www.springframework.org/schema/beans 
        http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context 
    http://www.springframework.org/schema/context/spring-context.xsd 
    http://www.springframework.org/schema/mvc 
    http://www.springframework.org/schema/mvc/spring-mvc.xsd"&gt;

    &lt;context:component-scan base-package="com.zetcode"/&gt;
    &lt;mvc:annotation-driven/&gt;
    &lt;mvc:default-servlet-handler/&gt;

    &lt;bean id="templateResolver" 
            class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver"&gt;
        &lt;property name="prefix" value="/WEB-INF/templates/"/&gt;
        &lt;property name="suffix" value=".html"/&gt;
        &lt;property name="templateMode" value="HTML"/&gt;
    &lt;/bean&gt;

    &lt;bean class="org.thymeleaf.spring5.view.ThymeleafViewResolver"&gt;
        &lt;property name="templateEngine" ref="templateEngine"/&gt;
    &lt;/bean&gt;

    &lt;bean id="templateEngine" class="org.thymeleaf.spring5.SpringTemplateEngine"&gt;
        &lt;property name="templateResolver" ref="templateResolver"/&gt;
    &lt;/bean&gt;

&lt;/beans&gt;

The spring-servlet.xml configures the Spring web application. 
It enables component scanning, Spring web annotations (@Controller) and configures 
the Thymeleaf template.

&lt;context:component-scan base-package="com.zetcode" /&gt;

This tells Spring where to look for classes with @Controller, 
@Repository, @Service, @Component  
annotations and register them. In our case, we have a controller with 
the @Controller annotation.

&lt;mvc:annotation-driven/&gt;

The &lt;mvc:annotation-driven/&gt; enables web based Spring annotations.

&lt;mvc:default-servlet-handler/&gt;

We need this tag to enable static HTML files. We have one static index.html
for the home page.

&lt;bean id="templateResolver" 
        class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver"&gt;
    &lt;property name="prefix" value="/WEB-INF/templates/"/&gt;
    &lt;property name="suffix" value=".html"/&gt;
    &lt;property name="templateMode" value="HTML"/&gt;
&lt;/bean&gt;

&lt;bean class="org.thymeleaf.spring5.view.ThymeleafViewResolver"&gt;
    &lt;property name="templateEngine" ref="templateEngine"/&gt;
&lt;/bean&gt;

&lt;bean id="templateEngine" class="org.thymeleaf.spring5.SpringTemplateEngine"&gt;
    &lt;property name="templateResolver" ref="templateResolver"/&gt;
&lt;/bean&gt;

These lines configure Thymeleaf with a template engine, template view resolver, and 
a template resolver. In the template resolver we specify where the templates are located 
and their extensions.

WEB-INF/web.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
            http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
            version="4.0"&gt;
    
    &lt;welcome-file-list&gt;
        &lt;welcome-file&gt;index.html&lt;/welcome-file&gt;
    &lt;/welcome-file-list&gt;      
    
    &lt;servlet&gt;
        &lt;servlet-name&gt;spring&lt;/servlet-name&gt;
        &lt;servlet-class&gt;
            org.springframework.web.servlet.DispatcherServlet
        &lt;/servlet-class&gt;
        &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;
    &lt;/servlet&gt;
    
    &lt;servlet-mapping&gt;
        &lt;servlet-name&gt;spring&lt;/servlet-name&gt;
        &lt;url-pattern&gt;/&lt;/url-pattern&gt;
    &lt;/servlet-mapping&gt;    
    
    &lt;session-config&gt;
        &lt;session-timeout&gt;
            30
        &lt;/session-timeout&gt;
    &lt;/session-config&gt;
&lt;/web-app&gt;

In the web.xml file, we set up the Spring DispatcherServlet and 
choose the welcome file. The DispatcherServlet is the Spring's front controller.
The servlet is mapped to the URL having *.html extension.

com/zetcode/controller/HomeController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/message")
    public String message() {

        return "showMessage";
    }
}

HTTP requests are handled by a controller. It prepares a model and returns a view.
The returned showMessage string is mapped to the showMessage.html
file located in the WEB-INF/templates/ directory.

WEB-INF/templates/showMessage.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Message&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    Hello there
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

The showMessage.html file displays a message.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
    &lt;a href="message"&gt;Show message&lt;/a&gt;
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

The index.html is a home page. It contains a link. 

## Spring web application configuration with Java config

In the second example, we create a Spring web application configured in Java
config classes. In this example, web.xml and spring-servlet.xml
are replaced with MyWebInitializer.java and WebConfig.java.

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
│                   showMessage.html
└───test
    └───java

This is the project structure. The pom.xml file is the same
as in the first example.

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

The WebConfig.java is used instead of the spring-servlet.xml file.
In the WebConfig, we enable Spring web annotations with @EnableWebMvc, 
enable component scanning with @ComponentScan and configure the Thymeleaf template engine.

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

The MyWebInitializer class is used instead of the web.xml file.
We specify the name of the servlet configuration class.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/message")
    public String message() {
        return "showMessage";
    }
}

This is the controller. We have mappings for the home page and for a showMessage
page.

WEB-INF/templates/showMessage.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Message&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;Today is a sunny day!&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

The showMessage.html file displays a message.

WEB-INF/templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
    &lt;a href="message.html"&gt;Show message&lt;/a&gt;
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

The index.html is a home page. It contains a link. 

## Spring Boot web application

In the third example, we create a web application with Spring Boot. 
Spring Boot uses a different default approach. It uses JAR archives 
with an embedded web server.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───controller
│   │                   MyController.java
│   └───resources
│       │   application.properties
│       ├───static
│       │       index.html
│       └───templates
│               showMessage.html
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
    &lt;artifactId&gt;springbootwebfirst&lt;/artifactId&gt;
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
            &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
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

This is the Maven build file. The spring-boot-starter-web is a starter POM 
for building web, including RESTful, applications using Spring MVC. 
The spring-boot-starter-thymeleaf is a starter POM for Thymeleaf template 
engine.

Note that the packaging is set to JAR.    

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {

    @GetMapping("/message")
    public String message() {

        return "showMessage";
    }
}

This is the controller class for the Spring Boot web application. A controller is decorated with 
the @Controller annotation. The controller has one mapping. The mapping resolves 
to the showMessage.html template, which is located in the 
WEB-INF/templates directory.

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

The Application sets up the Spring Boot application. 

WEB-INF/templates/showMessage.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Message&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;Today is a cold day&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

The showMessage.html shows a simple message.

WEB-INF/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
    &lt;a href="message"&gt;Show message&lt;/a&gt;
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

The index.html is the home page of the application containing
a link. Static resources such as plain HTML files are put into static
directory.

In this tutorial, we have created our first Spring web application.