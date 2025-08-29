+++
title = "Spring BindingResult"
date = 2025-08-29T20:11:48.481+01:00
draft = false
description = "Spring BindingResult tutorial shows how to use BindingResult to get the result of a validation."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring BindingResult

last modified October 18, 2023

Spring BindingResult tutorial shows how to use BindingResult to get the result
of a validation.

Spring is a popular Java application framework for creating enterprise
applications.

## BindingResult

BindingResult holds the result of a validation and binding
and contains errors that may have occurred. The BindingResult must
come right after the model object that is validated or else Spring fails to
validate the object and throws an exception.

## Spring BindingResult example

The following application validates a user form and uses BindingResult to store
the validation results.

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
│   │           └───form
│   │                   UserForm.java
│   └───resources
│       └───templates
│               form.html
│               showInfo.html
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
    &lt;artifactId&gt;bindingresultex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.3.23&lt;/spring-version&gt;
        &lt;thymeleaf-version&gt;3.0.15.RELEASE&lt;/thymeleaf-version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;
            &lt;artifactId&gt;logback-classic&lt;/artifactId&gt;
            &lt;version&gt;1.4.1&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate.validator&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-validator&lt;/artifactId&gt;
            &lt;version&gt;6.2.5.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.thymeleaf&lt;/groupId&gt;
            &lt;artifactId&gt;thymeleaf-spring5&lt;/artifactId&gt;
            &lt;version&gt;${thymeleaf-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.thymeleaf&lt;/groupId&gt;
            &lt;artifactId&gt;thymeleaf&lt;/artifactId&gt;
            &lt;version&gt;${thymeleaf-version}&lt;/version&gt;
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

In the pom.xml file, we have the project dependencies.

&lt;dependency&gt;
    &lt;groupId&gt;org.hibernate.validator&lt;/groupId&gt;
    &lt;artifactId&gt;hibernate-validator&lt;/artifactId&gt;
    &lt;version&gt;6.2.5.Final&lt;/version&gt;
&lt;/dependency&gt;

We use hibernate-validator for validation.

com/zetcode/config/MyWebInitializer.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.FrameworkServlet;
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

MyWebInitializer initializes the Spring web application. It contains one
configuration class: WebConfig.

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

The WebConfig configures the Thymeleaf template engine. The Thymeleaf
template files are located in the templates subdirectory on the classpath.

com/zetcode/form/UserForm.java
  

package com.zetcode.form;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserForm {

    @NotBlank
    @Size(min = 2)
    private String name;

    @NotBlank
    @Email
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

This is a form bean. It contains some validation annotations.

@NotBlank
@Size(min = 2)
private String name;

The name attribute must not be blank and must have at least 2 characters.

@NotBlank
@Email
private String email;

The email attribute must not be blank and must be a well-formed email.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.form.UserForm;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@Controller
public class MyController {

    @GetMapping(value = "/")
    public String form(UserForm userForm) {

        return "form";
    }

    @PostMapping("/")
    public String checkForm(@Valid UserForm userForm, BindingResult bindingResult,
                            RedirectAttributes atts) {

        if (bindingResult.hasErrors()) {
            return "form";
        }

        atts.addAttribute("name", userForm.getName());
        atts.addAttribute("email", userForm.getEmail());

        return "redirect:/showInfo";
    }

    @GetMapping("/showInfo")
    public String showInfo(@ModelAttribute("name") String name,
                           @ModelAttribute("email") String email) {

        return "showInfo";
    }
}

MyController contains mappings of request paths to handler methods.

@GetMapping(value = "/")
public String form(UserForm userForm) {

    return "form";
}

The home page returns a view that contains a form. The UserForm
bean is backing a form. It is going to be populated with data from the form.

@PostMapping("/")
public String checkForm(@Valid UserForm userForm, BindingResult bindingResult,
                        RedirectAttributes atts) {
...

We validate the UserForm bean with @Valid. The validation
results are stored in BindingResult.

if (bindingResult.hasErrors()) {
    return "form";
}

If the binding result contains errors, we return to the form.

atts.addAttribute("name", userForm.getName());
atts.addAttribute("email", userForm.getEmail());

return "redirect:/showInfo";

Adhering to the redirect after post pattern, we redirect to the
showInfo view after successful validation. In order not to lose the
inputs, we store them in RedirectAttributes.

@GetMapping("/showInfo")
public String showInfo(@ModelAttribute("name") String name,
                        @ModelAttribute("email") String email) {

    return "showInfo";
}

The @ModelAttribute takes the request attributes nad puts them into
the model object, which is then sent to the showInfo view.

resources/templates/form.html
  

&lt;!DOCTYPE html&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;User form&lt;/title&gt;
    &lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;section class="ui container"&gt;

    &lt;form action="#" class="ui form" th:action="@{/}" th:object="${userForm}" method="post"&gt;
        &lt;div class="field"&gt;
            &lt;label&gt;Name:&lt;/label&gt;
            &lt;input type="text" th:field="*{name}"&gt;
            &lt;span th:if="${#fields.hasErrors('name')}" th:errors="*{name}"&gt;Name Error&lt;/span&gt;
        &lt;/div&gt;

        &lt;div class="field"&gt;

            &lt;label&gt;Email:&lt;/label&gt;

            &lt;input type="text" th:field="*{email}"&gt;
            &lt;span th:if="${#fields.hasErrors('email')}" th:errors="*{email}"&gt;Email Error&lt;/span&gt;
        &lt;/div&gt;

        &lt;button class="ui button" type="submit"&gt;Submit&lt;/button&gt;

    &lt;/form&gt;

&lt;/section&gt;

&lt;/body&gt;
&lt;/html&gt;

The root page contains the form.

&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"&gt;

The form is styled using *Semantic UI*.

&lt;form action="#" class="ui form" th:action="@{/}" th:object="${userForm}" method="post"&gt;

The th:object refers to the user form bean. This is not a class name,
but a Spring bean name; therefore it is in lowercase.

&lt;input type="text" th:field="*{name}"&gt;

The input is mapped to the name attribute of the userForm.

&lt;span th:if="${#fields.hasErrors('name')}" th:errors="*{name}"&gt;Name Error&lt;/span&gt;

This line displays possible validation errors.

resources/templates/showInfo.html
  

&lt;!DOCTYPE html&gt;
&lt;html xmlns:th="http://www.thymeleaf.org"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Show info&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;p&gt;
    Successfully added user &lt;span th:text="${name}" th:remove="tag"&gt;&lt;/span&gt; with email
    &lt;span th:text="${email}" th:remove="tag"&gt;&lt;/span&gt;
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This view shows the entered information.

In this article we have used BindingResult when validating a form.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).