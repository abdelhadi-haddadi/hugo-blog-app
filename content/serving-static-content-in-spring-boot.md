+++
title = "Serving static content in Spring Boot"
date = 2025-08-29T20:12:34.371+01:00
draft = false
description = "Spring Boot static content shows how to serve static content in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Serving static content in Spring Boot

last modified July 20, 2023

Spring Boot static content shows how to serve static content in a Spring Boot
application.

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications with minimal effort.

Spring Boot automatically adds static web resources located within any of the
following directories:

- /META-INF/resources/

- /resources/

- /static/

- /public/

The directories are located in the classpath or in the root of the
ServletContext.

In our application, we have one HTML file which contains a simple link.
The link triggers a response from the web Boot application. It returns
a plain text message.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───controller
│   │           │       MyController.java
│   │           └───model
│   │                   Message.java
│   └───resources
│       │   application.properties
│       └───static
│           │   index.html
│           └───css
│                   main.css
└───test
    └───java
        └───com
            └───zetcode
                └───controller
                        MyControllerTest.java

This is the project structure of the Spring Boot application.

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
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

This is the gradle build file. The spring-boot-starter-web is
starter for building web applications using Spring MVC. The
spring-boot-starter-test imports necessary testing modules.

com/zetcode/model/Message.java
  

package com.zetcode.model;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Message {

    @Value("${app.message}")
    private String message;

    public String get() {
        return message;
    }
}

Message is a model class which contains a simple text message for
the client.

@Value("${app.message}")
private String message;

We inject a value from the application.properties into the
message variable.

resources/application.properties
  

app.message=Hello there

The application.properties file contains various configuration
settings of a Spring Boot application. We define a custom property having a text
message.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.Message;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class MyController {

    private final Message message;

    public MyController(Message message) {
        this.message = message;
    }

    @GetMapping(path = "/message")
    @ResponseBody
    public String message() {

        return message.get();
    }
}

This is the controller class for the Spring Boot web application. A controller
is decorated with the @Controller annotation. The  controller has
one mapping; it is mapped to the /message path and returns a plain
text message.

private final Message message;

public MyController(Message message) {
    this.message = message;
}

A Message object is injected into the property.

@GetMapping(path = "/message")
@ResponseBody
public String message() {

    return message.get();
}

The message method responds to a GET request. The
@ResponseBody annotation puts the string value to the web response
body.

resources/static/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link href="css/main.css" rel="stylesheet" type="text/css"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;h2&gt;Home page&lt;/h2&gt;

&lt;a href="/message"&gt;Get message&lt;/a&gt;
&lt;/body&gt;
&lt;/html&gt;

In the  index.html file we have a link that invokes a response from
the web application. The file is located in the
src/main/resources/static directory, which is a default directory
where Spring looks for static content.

&lt;link href="css/main.css" rel="stylesheet" type="text/css"&gt;

In the link tag we refer to the main.css static resource, which is
located in the src/main/resources/static/css directory.

resources/static/css/main.css
  

h2 { color: blue }

In the main.css file, we set the h2 tag to blue colour.

com/zetcode/controller/MyControllerTest.java
  

package com.zetcode.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class MyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getHome() throws Exception {
        this.mockMvc.perform(get("/"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(forwardedUrl("index.html"));
    }

    @Test
    public void getMessage() throws Exception {
        this.mockMvc.perform(get("/message"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string("Hello there"));
    }
}

In the MyControllerTest we have two tests: one for the home page
and one for the returned message text.

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

In this article we have served static context in a Spring Boot application. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).