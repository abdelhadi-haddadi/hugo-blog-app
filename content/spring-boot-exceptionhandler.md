+++
title = "Spring Boot @ExceptionHandler"
date = 2025-08-29T20:12:15.256+01:00
draft = false
description = "Spring Boot @ExceptionHandler tutorial shows how to handle exceptions with Spring @ExceptionHandler."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @ExceptionHandler

last modified July 16, 2023

Spring Boot @ExceptionHandler tutorial shows how to handle exceptions with
Spring @ExceptionHandler.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

@ExceptionHandler is an annotation for handling exceptions in
specific handler classes or handler methods. In Servlet environments, we can
combine the @ExceptionHandler annotation with
@ResponseStatus to define the response status for the HTTP
response.

## Spring Boot @ExceptionHandler example

In the following application, we demonstrate the usage of the
@ExceptionHandler. A HTML link in the home page calls a
controller's method, which either returns data or throws an exception.

build.gradle
...
src
├── main
│&nbsp;&nbsp; ├── java
│&nbsp;&nbsp; │&nbsp;&nbsp; └── com
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── zetcode
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── Application.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── controller
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── MyController.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── exception
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── MyDataException.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         └── service
│&nbsp;&nbsp; │&nbsp;&nbsp;             ├── IDataService.java
│&nbsp;&nbsp; │&nbsp;&nbsp;             └── MyDataService.java
│&nbsp;&nbsp; └── resources
│&nbsp;&nbsp;     ├── static
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── index.html
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── showError.html
│&nbsp;&nbsp;     └── templates
│&nbsp;&nbsp;         └── showData.ftlh
└── test
    ├── java
    └── resources

This is the project structure of the Spring application.

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
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
}

This is the Gradle build file. The spring-boot-starter-freemarker
is a dependency for Freemarker template engine.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.exception.MyDataException;
import com.zetcode.service.IDataService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.Map;

@Controller
public class MyController {

    private final IDataService dataService;

    public MyController(IDataService dataService) {
        this.dataService = dataService;
    }

    @RequestMapping(value = "/getData")
    public ModelAndView getData() {

        var data = dataService.findAll();

        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("values", data);

        return new ModelAndView("showData", params);
    }

    @ExceptionHandler(MyDataException.class)
    public String handleError(MyDataException e) {

        return "redirect:/showError.html";
    }
}

The MyController's getData method calls a service
method and stores the retrieved data into a list. The data is sent to the
showData view. In case of a MyDataException, the
controller redirects to an error page.

@ExceptionHandler(MyDataException.class)
public String handleError(MyDataException e) {

    return "redirect:/showError.html";
}

The handleError is decorated with @ExceptionHandler.
The handler is activated for the MyDataException. In the body of
the method, we redirect to the showError.html page.

com/zetcode/exception/MyDataException.java
  

package com.zetcode.exception;

public class MyDataException extends RuntimeException {

    public MyDataException(String message) {
        super(message);
    }
}

We define a custom MyDataException.

com/zetcode/service/IDataService.java
  

package com.zetcode.service;

import java.util.List;

public interface IDataService {

    List&lt;String&gt; findAll();
}

IDataService contains the contract method.

com/zetcode/service/MyDataService.java
  

package com.zetcode.service;

import com.zetcode.exception.MyDataException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.springframework.stereotype.Service;

@Service
public class MyDataService implements IDataService {

    @Override
    public List&lt;String&gt; findAll() {

        var r = new Random();

        if (r.nextBoolean()) {

            throw new MyDataException("Failed to retrieve data");
        }

        var data = new ArrayList&lt;String&gt;();

        data.add("yellow moon");
        data.add("brisk pace");
        data.add("empty bottle");
        data.add("beautiful weather");

        return data;
    }
}

MyDataService implements IDataService's
findAll method. The method either returns data or throws a
MyDataException.

var r = new Random();

if (r.nextBoolean()) {

    throw new MyDataException("Failed to retrieve data");
}

The findAll method randomly throws MyDataException.
The exception is then handled in the controller.

var data = new ArrayList&lt;&gt;();

data.add("yellow moon");
data.add("brisk pace");
data.add("empty bottle");
data.add("beautiful weather");

return data;

When there is no exception, we return a list of strings.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="/getData"&gt;Get data&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains a link that calls our controller method to
fetch some data.

resources/static/showError.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Error&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;Failed to retrieve data&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is an error page. It is shown when MyDataException is thrown.

resources/templates/showData.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Data&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;

    &lt;body&gt;

        &lt;h2&gt;Data&lt;/h2&gt;

        &lt;ul&gt;
            &lt;#list values as val&gt;
            &lt;li&gt;&lt;td&gt;${val}&lt;/td&gt;&lt;/li&gt;
            &lt;/#list&gt;
        &lt;/ul&gt;
    
    &lt;/body&gt;
&lt;/html&gt;

The showData.ftlh is a Freemarker template file which shows all
retrieved data in an HTML list.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

Application is the entry point which bootstraps Spring Boot
application.

In this article we have shown how to handle exceptions in a Spring application
with @ExceptionHandler.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).