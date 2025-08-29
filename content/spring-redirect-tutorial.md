+++
title = "Spring redirect tutorial"
date = 2025-08-29T20:11:58.646+01:00
draft = false
description = "Spring redirect tutorial shows how to redirect a request in a Spring web application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring redirect tutorial

last modified October 18, 2023

Spring redirect tutorial shows how to redirect a request in a Spring web
application.

Spring is a popular Java application framework for creating enterprise
applications. 

## Redirect

The special redirect: prefix in a view name performs a redirect to
different URL. The net effect is the same as if the controller had returned a
RedirectView. Redirects are applied in Post/Redirect/Get (PRG)
scenarios; PGR is a web development design pattern that prevents duplicate form
submissions. By default status code 302 is sent. If we want to change that we can
annotate the return type of the handler method with @ResponseStatus.

RedirectAttributes is a specialization of the Model interface that
controllers can use to select attributes for a redirect scenario.

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

## Spring Redirect example

The following application uses redirects to a different URL after a form submission.
It performs a redirect with the redirect: prefix.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           ├───bean
│   │           │       User.java
│   │           ├───config
│   │           │       MyWebInitializer.java
│   │           │       WebConfig.java
│   │           └───controller
│   │                   MyController.java
│   └───resources
│       │   logback.xml
│       │
│       └───templates
│               addUser.html
│               showUserAdded.html
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
    &lt;artifactId&gt;springredirectex&lt;/artifactId&gt;
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

com/zetcode/bean/User.java
  

package com.zetcode.bean;

public class User {

    private String name;
    private String occupation;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    @Override
    public String toString() {

        final StringBuilder sb = new StringBuilder("User{");
        sb.append("name='").append(name).append('\'');
        sb.append(", occupation='").append(occupation).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

This is the User bean. It is filled with data from the form.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class MyController {

    private static final Logger logger = LoggerFactory.getLogger(MyController.class);

    @GetMapping("/addUser")
    public String sendForm(User user) {

        return "addUser";
    }

    @PostMapping("/addUser")
    public String processForm(User user, RedirectAttributes redirectAttrs) {

        logger.info("User {} has been saved", user.getName());

        redirectAttrs.addAttribute("name", user.getName());

        return "redirect:userAdded";
    }

    @GetMapping("/userAdded")
    public String userAdded() {

        return "showUserAdded";
    }
}

MyController provides mappings between request paths and handler methods.

@GetMapping("/addUser")
public String sendForm(User user) {

    return "addUser";
}

This mapping sends the form to the user.

@PostMapping("/addUser")
public String processForm(User user, RedirectAttributes redirectAttrs) {

    logger.info("User {} has been saved", user.getName());

    redirectAttrs.addAttribute("name", user.getName());

    return "redirect:userAdded";
}

This mapping processes the form. A new user is "saved" and a redirect is performed.
User's name is added to the redirect attributes with addAttribute.

resources/templates/addUser.html
  

&lt;!DOCTYPE HTML&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;title&gt;Add user&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;Add User&lt;/h1&gt;

&lt;form action="#" th:action="@{/addUser}" th:object="${user}" method="post"&gt;
    &lt;p&gt;
        Name: &lt;input type="text" th:field="*{name}"&gt;
    &lt;/p&gt;
    &lt;p&gt;
        Occupation: &lt;input type="text" th:field="*{occupation}"&gt;
    &lt;/p&gt;
    &lt;p&gt;
        &lt;input type="submit" value="Submit"/&gt; &lt;input type="reset" value="Reset"&gt;
    &lt;/p&gt;
&lt;/form&gt;

&lt;/body&gt;
&lt;/html&gt;

The addUser.html template provides a form to the user. The entered fields 
are automatically inserted into the User's attributes.

resources/templates/showUserAdded.html
  

&lt;!DOCTYPE HTML&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;title&gt;User saved&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;User has been saved&lt;/h2&gt;

&lt;p th:text="'Name: ' + ${#request.getParameter('name')}"&gt;&lt;/p&gt;
&lt;a href="/addUser"&gt;Add another user&lt;/a&gt;

&lt;/body&gt;
&lt;/html&gt;

This templates shows a message to the user after the form submission.
It reads the redirect attribute with ${#request.getParameter('name')}.

$ mvn jetty:run

We run the server and locate to localhost:8080/addUser.

In this article we have performed a redirect in a Spring controller.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).