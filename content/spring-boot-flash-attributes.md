+++
title = "Spring Boot Flash attributes"
date = 2025-08-29T20:12:16.387+01:00
draft = false
description = "Spring Boot Flash attributes tutorial shows how to create flash attributes in Spring Boot applications."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot Flash attributes

last modified July 24, 2023

In this article we show how to create flash messages in Spring Boot
applications.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring that helps create stand-alone, production-grade Spring
based applications easily.

Flash messages are temporary data used for user notifications or storing form
input. They are stored in a session and vanish as soon as they are retrieved.

Flash messages in Spring are created as flash attributes using RedirectAttributes's
addFlashAttribute. They are used in conjunction with RedirectView.

## Spring Boot Flash attributes example

In the following application, we create flash attributes for notifications and
for remembering form input values. We have a form with two inputs. If the input
values do not meet the validation criteria, the application redirects to the
form page and shows error messages; these messages are sent as flash attributes.

In addition, the correct values of a form are remembered.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           └───controller
│   │                   MyController.java
│   │
│   └───resources
│       └───templates
│               index.html
│               showMessage.html
└───test
    └───java

This is the project structure of the Spring application.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-thymeleaf'
    implementation 'org.hibernate.validator:hibernate-validator:8.0.1.Final'
}

This is the Gradle build file. We use spring-boot-starter-thymeleaf
for templating with Thymeleaf and hibernate-validator for
validation of form data.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.constraints.Size;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;
import org.thymeleaf.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
@Validated
public class MyController {

    @RequestMapping("/")
    public String index(Model model) {

        return "index";
    }

    @RequestMapping("/message")
    public ModelAndView message(@RequestParam @Size(min = 2, max = 255) String name,
                                @RequestParam @Size(min = 2, max = 255) String occupation) {

        var msg = String.format("%s is a %s", name, occupation);

        Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put("message", msg);

        return new ModelAndView("showMessage", params);

    }

    @ExceptionHandler(ConstraintViolationException.class)
    public RedirectView handleError(ConstraintViolationException ex,
                                    WebRequest request,
                                    RedirectAttributes atts) {

        var name = request.getParameter("name");
        var occupation = request.getParameter("occupation");

        var errorMessages = new ArrayList&lt;String&gt;();
        var violations = ex.getConstraintViolations();

        violations.forEach(violation -&gt; {
            var error = String.format("%s: %s", violation.getPropertyPath(),
                    violation.getMessage());
            errorMessages.add(error);
        });

        if (!StringUtils.isEmptyOrWhitespace(name)) {
            atts.addFlashAttribute("name", name);
        }

        if (!StringUtils.isEmptyOrWhitespace(occupation)) {

            atts.addFlashAttribute("occupation", occupation);
        }

        atts.addFlashAttribute("messages", errorMessages);

        return new RedirectView("/");
    }
}

This is MyController. It responds to the request from the client.
It finds out the current date and time and resolves the processing to the
showMessage.ftl template, passing it data.

@Controller
@Validated
public class MyController {

The @Validated annotation validates annotated request parameters.
In our case, we use two @Size annotations.

@RequestMapping("/")
public String index(Model model) {

    return "index";
}

The root page returns the index view, which sends a form to the client.

@RequestMapping("/message")
public ModelAndView message(@RequestParam @Size(min = 2, max = 255) String name,
                            @RequestParam @Size(min = 2, max = 255) String occupation) {

    var msg = String.format("%s is a %s", name, occupation);

    Map&lt;String, Object&gt; params = new HashMap&lt;&gt;();
    params.put("message", msg);

    return new ModelAndView("showMessage", params);
}

This action responds to the form submission. The two input parameters, name and occupation,
are annotated with @Size. If all goes OK, a message is built from the parameters
and is sent to the client with the showMessage view.

@ExceptionHandler(ConstraintViolationException.class)
public RedirectView handleError(ConstraintViolationException ex,
                                WebRequest request,
                                RedirectAttributes atts) {

If the input parameters fail to validate, a ConstraintViolationException
is thrown. We react to the exception in the provided exception handler.

var name = request.getParameter("name");
var occupation = request.getParameter("occupation");

We get the request parameters. They are used to keep the correct
form input values.

var errorMessages = new ArrayList&lt;String&gt;();
var violations = ex.getConstraintViolations();

violations.forEach(violation -&gt; {
    var error = String.format("%s: %s", violation.getPropertyPath(),
            violation.getMessage());
    errorMessages.add(error);
});

We get the constraint violations and build a list of error messages.
The error messages are going to be shown in the index form page above
the form.

if (!StringUtils.isEmptyOrWhitespace(name)) {
    atts.addFlashAttribute("name", name);
}

if (!StringUtils.isEmptyOrWhitespace(occupation)) {

    atts.addFlashAttribute("occupation", occupation);
}

We store the filled input parameters as flash attributes with
addFlashAttribute if they are not empty and do not contain only
blank spaces.

atts.addFlashAttribute("messages", errorMessages);

The error messages are stored as a flash attribute.

return new RedirectView("/");

We redirect to the form page with RedirectView.

templates/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en" xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css"
            rel="stylesheet"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;section class="ui container"&gt;

    &lt;ul th:each="message : ${messages}"&gt;
        &lt;li th:text="${message}" class="ui error message" /&gt;
    &lt;/ul&gt;

    &lt;form class="ui form" action="message" method="post"&gt;

        &lt;div class="field"&gt;
            &lt;label&gt;Name:&lt;/label&gt;
            &lt;input type="text" name="name" th:value="${name}"&gt;
        &lt;/div&gt;

        &lt;div class="field"&gt;
            &lt;label&gt;Occupation:&lt;/label&gt;
            &lt;input type="text" name="occupation" th:value="${occupation}"&gt;
        &lt;/div&gt;

        &lt;button class="ui button" type="submit"&gt;Send&lt;/button&gt;

    &lt;/form&gt;
&lt;/section&gt;

&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the home page template. It sends a form with two inputs: name and
occupation. The styling is done with Semantic UI library.

&lt;ul th:each="message : ${messages}"&gt;
    &lt;li th:text="${message}" class="ui error message" /&gt;
&lt;/ul&gt;

If there are any error messages, they are displayed.

templates/showMessage.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en" xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Message&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p th:text="${message}"/&gt;

&lt;/body&gt;
&lt;/html&gt;

The showMessage template shows a message when the form was
successfully processed.

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

Application is the entry point which sets up Spring Boot
application.

In this article we have worked with flash attributes in Spring Boot.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).