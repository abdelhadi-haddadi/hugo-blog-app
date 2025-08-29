+++
title = "Spring Boot @SpringBootTest"
date = 2025-08-29T20:12:34.360+01:00
draft = false
description = "@SpringBootTest tutorial describes the @SpringBootTest annotation and shows how to use it in testing."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @SpringBootTest

last modified July 28, 2023

In this article, we describe the @SpringBootTest annotation and show how to use
it in testing.

## @SpringBootTest annotation

@SpringBootTest is a primary annotation to create unit and
integration tests in Spring Boot applications. The annotation enables additional
features such as custom environment properties, different web environment modes,
random ports, TestRestTemplate and WebTestClient
beans.

## Example application

In the following application we create a few test methods utilizing
@SpringBootTest. We are going to test the home controller.

build.gradle
...
src
├── main
│  ├── java
│  │  └── com
│  │      └── zetcode
│  │          ├── Application.java
│  │          └── controller
│  │              └── HomeController.java
│  └── resources
│      └── templates
│          └── index.ftlh
└── test
    ├── java
    │  └── com
    │      └── zetcode
    │          └── controller
    │              └── HomeControllerTest.java
    └── resources

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
    implementation 'org.springframework.boot:spring-boot-starter-freemarker'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

test {
    useJUnitPlatform()
}

This is the Gradle build file. The spring-boot-starter-test adds
testing support in Spring. The useJUnitPlatform method specifies
that JUnit Platform should be used to discover and execute the tests.

com/zetcode/controller/HomeController.java
  

package com.zetcode.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDate;
import java.util.HashMap;

@Controller
public class HomeController {

    @RequestMapping(path = "/")
    public ModelAndView index() {

        var params = new HashMap&lt;String, String&gt;();

        var today = LocalDate.now();
        var dayOfWeek = today.getDayOfWeek().toString().toLowerCase();
        params.put("dow", dayOfWeek);

        return new ModelAndView("index", params);
    }
}

We have a simple HomeController which sends the current weekday
to the view.

resources/templates/index.ftlh
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;title&gt;Cities&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    Hello there! Today is ${dow}.
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

The view displays a greeting and the weekday.

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

Application is the entry point which sets up Spring Boot
application.

com/zetcode/controller/HomeControllerTest.java
  

package com.zetcode.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class HomeControllerTest {

    @Autowired
    private HomeController controller;

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void contextLoads() throws Exception {
        assertThat(controller).isNotNull();
    }

    @Test
    public void testHome() throws Exception {
        this.mockMvc.perform(get("/"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void testHelloMessage() throws Exception {

        var today = LocalDate.now();
        var dayOfWeek = today.getDayOfWeek().toString().toLowerCase();
        var expected = String.format("Hello there! Today is %s", dayOfWeek);

        this.mockMvc.perform(get("/")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(containsString(expected)));
    }
}

In HomeControllerTest, we have three test methods.

@SpringBootTest
@AutoConfigureMockMvc
class HomeControllerTest {

The class is annotated with @SpringBootTest and the
@AutoConfigureMockMvc. The latter mocks the web layer.

@Test
public void contextLoads() throws Exception {
    assertThat(controller).isNotNull();
}

We ensure that the controller is loaded.

@Test
public void testHome() throws Exception {
    this.mockMvc.perform(get("/"))
            .andDo(print())
            .andExpect(status().isOk());
}

In this method, we test the response status code.

@Test
public void testHelloMessage() throws Exception {

    var today = LocalDate.now();
    var dayOfWeek = today.getDayOfWeek().toString().toLowerCase();
    var expected = String.format("Hello there! Today is %s", dayOfWeek);

    this.mockMvc.perform(get("/")).andDo(print()).andExpect(status().isOk())
            .andExpect(content().string(containsString(expected)));
}

Finally, we test the content of the response.

$ ./gradlew test --info

We run the tests.

In this article we have shown how to use @SpringBootTest to
create tests in a Spring Boot application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).