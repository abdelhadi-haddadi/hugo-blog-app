+++
title = "Spring Boot submit form"
date = 2025-08-29T20:12:35.487+01:00
draft = false
description = "SpringBoot submit form tutorial shows how to submit a form in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot submit form

last modified July 29, 2023

In this article we show how to submit a form in a Spring Boot application.

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications with minimal effort.

## Spring Boot submit form example

The following application contains a simple form. The data from a form is
automatically inserted into a UI bean and is available for a view. Thymeleaf is
used as a view engine.

The application shows only the simple process of sending and processing a form.
In reality, form submission requires extensive validation and security checks.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───bean
│   │           │       User.java
│   │           └───controller
│   │                   MyController.java
│   └───resources
│       └───templates
│               addUser.html
│               showMessage.html
└───test
    └───java

This is the project structure.

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

test {
    useJUnitPlatform()
}

This is the Gradle build file. The spring-boot-starter-web is
starter for building web, including RESTful, applications using Spring MVC. The
spring-boot-starter-thymeleaf is a starter for the Thymeleaf
engine.

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
}

This is the User bean. It is automatically filled with data from
the form request. The attributes must match the form fields.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.bean.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MyController {

    @GetMapping("/addUser")
    public String sendForm(User user) {

        return "addUser";
    }

    @PostMapping("/addUser")
    public String processForm(User user) {

        return "showMessage";
    }
}

The controller class sends and reads a form view.

@PostMapping("/addUser")
public String processForm(User user) {

    return "showMessage";
}

The User bean is passed as a parameter to the
processForm handler. Spring tries to fill the bean with the request
data. The data is also automatically available for the Thymeleaf
showMessage view.

resources/templates/addUser.html
  

&lt;!DOCTYPE HTML&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;title&gt;Add user&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
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

This view contains the form.

&lt;form action="#" th:action="@{/addUser}" th:object="${user}" method="post"&gt;

The th:object refers to the user form bean. This is not a
class name, but a Spring bean name; therefore it is in lowercase.

&lt;p&gt;
    Name: &lt;input type="text" th:field="*{name}"&gt;
&lt;/p&gt;

With the *{} syntax, we refer to the defined object.

resources/templates/showMessage.html
  

&lt;!DOCTYPE HTML&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;title&gt;Show message&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h1&gt;Result&lt;/h1&gt;

&lt;p th:text="'Name: ' + ${user.name}"&gt;&lt;/p&gt;
&lt;p th:text="'Occupation: ' + ${user.occupation}"&gt;&lt;/p&gt;
&lt;a href="/addUser"&gt;Submit another message&lt;/a&gt;

&lt;/body&gt;
&lt;/html&gt;

This template shows the data entered in the form.

&lt;p th:text="'Name: ' + ${user.name}"&gt;&lt;/p&gt;

We refer to the form bean attributes with the ${} syntax.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

The Application sets up the Spring Boot application.

Navigate to the localhost:8080/addUser to run the application.

In this article we have shown how to submit a simple form in a Spring Boot
application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).