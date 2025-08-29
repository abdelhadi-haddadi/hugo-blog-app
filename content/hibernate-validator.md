+++
title = "Hibernate Validator"
date = 2025-08-29T19:59:03.396+01:00
draft = false
description = "Hibernate validator tutorial shows how to validate data with Hibernate validator."
image = "images/project_structure.png"
imageBig = "images/project_structure.png"
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Hibernate Validator

last modified January 27, 2024

 

In this article we show how to validate data with Hibernate validator. 
Validating input received from the user to maintain data integrity is an 
important part of application logic. Validation is incorporated in Java web 
frameworks such as Stripes, Ninja framework, or Play framework. 

## Bean validation

Bean Validation is a validation model introduced in Java EE 6 platform. The Bean Validation
model is supported by constraints in the form of annotations placed on a field, method, or class 
of a JavaBeans component. It is also possible to use XML validation descriptors.

## Hibernate validator definition

Hibernate Validator is the reference implementation of Bean Validation. Hibernate 
Validator allows to express and validate application constraints. The default metadata source are 
annotations, with the ability to override and extend through the use of XML. It is not tied to a 
specific application tier or programming model and is available for both server 
and client application programming.

## Hibernate validator command line application

In the following example, we use the Hibernate Validator in a simple command line application.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;HibernateValidation&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.el&lt;/groupId&gt;
            &lt;artifactId&gt;javax.el-api&lt;/artifactId&gt;
            &lt;version&gt;2.2.4&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.web&lt;/groupId&gt;
            &lt;artifactId&gt;javax.el&lt;/artifactId&gt;
            &lt;version&gt;2.2.4&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-validator-cdi&lt;/artifactId&gt;
            &lt;version&gt;5.2.4.Final&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;
            &lt;artifactId&gt;lombok&lt;/artifactId&gt;
            &lt;version&gt;1.16.8&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;        
        
    &lt;/dependencies&gt;
    
&lt;/project&gt;

The Maven pom.xml contains dependencies for the Hibernate Validator and
for the Lombok library. The Lombok is used to reduce some boilerplate.

Car.java
  

package com.zetcode.bean;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.Data;

@Data
public class Car {
    
    private Long Id;
    
    @NotNull
    @Size(min=4, max=50)
    private String name;
        
    @Min(value = 1000)
    @Max(value = 5000000, message="There is no such expensive car")
    private int price;
    
    public Car() {}
    
    public Car(String name, int price) {
        
        this.name = name;
        this.price = price;
    } 
}

We have a Car bean where we validate data.

@Data
public class Car {

The Car bean is decorated with the lombok's @Data annotation. 
It automatically creates the getter and setter methods, equals method, 
toString method, and hashCode method.

@NotNull
@Size(min=4, max=50)
private String name;

The @NotNull annotation says that the name property
may not be null. The @Size annotation sets the 
minimum and maximum size for the property.

@Min(value = 1000)
@Max(value = 5000000, message="There is no such expensive car")
private int price;

The @Min constraint sets the minimum value for the price
property. The message element is used to create the error message.

ClientApp.java
  

package com.zetcode.client;

import com.zetcode.bean.Car;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class ClientApp {

    private static Validator validator;

    public static void main(String[] args) {

        Car car1 = new Car("Volvo", 29000);
        Car car2 = new Car("Skoda", 900);
        Car car3 = new Car(null, 29000);
        Car car4 = new Car("Cit", 21000);
        Car car5 = new Car("Bentley", 8000000);

        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
        
        validate(car1);
        validate(car2);
        validate(car3);
        validate(car4);
        validate(car5);        
    }

    public static void validate(Car car) {

        Set&lt;ConstraintViolation&lt;Car&gt;&gt; cvs = validator.validate(car);

        for (ConstraintViolation&lt;Car&gt; cv : cvs) {
            System.out.println(cv.getPropertyPath() + ": " + cv.getMessage());
        }        
    }
}

In the client application, we create five car objects and validate them.

Car car1 = new Car("Volvo", 29000);
Car car2 = new Car("Skoda", 900);
Car car3 = new Car(null, 29000);
Car car4 = new Car("Cit", 21000);
Car car5 = new Car("Bentley", 8000000);

Five car objects are created. Four cars have values that do 
not pass the validation process. For example, the price of the Skoda
car is too low; i.e. below the minimum 1000 value.

ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
validator = factory.getValidator();

A validation factory is used with the buildDefaultValidatorFactory method.
From the factory, we get the validator with the getValidator method.
It is *recommended* to cache the validator factory because it is expensive to create.

Set&lt;ConstraintViolation&lt;Car&gt;&gt; cvs = validator.validate(car);

A car is validated using the validator's validate method.

for (ConstraintViolation&lt;Car&gt; cv : cvs) {
    System.out.println(cv.getPropertyPath() + ": " + cv.getMessage());
}

We print the error messages for constraint violations.

price: must be greater than or equal to 1000
name: may not be null
name: size must be between 4 and 50
price: There is no such expensive car

When running the application, we receive these error messages.

## Hibernate validator web application

In the second example, we utilize Hibernate Validator in a web application.
The application is deployed on Apache Tomcat server. The sources for this
application are available at author's [Github repository](https://github.com/janbodnar/HibernateValidator).

![project_structure.png](images/project_structure.png)

Figure: Project structure

The figure shows the project structure in NetBeans.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/HibernateValidation"/&gt;

The context.xml file contains the context path of
the application.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;HibernateValidation2&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;HibernateValidation2&lt;/name&gt;

 
    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;javax&lt;/groupId&gt;
            &lt;artifactId&gt;javaee-web-api&lt;/artifactId&gt;
            &lt;version&gt;7.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;jstl&lt;/groupId&gt;
            &lt;artifactId&gt;jstl&lt;/artifactId&gt;
            &lt;version&gt;1.2&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;javax.el&lt;/groupId&gt;
            &lt;artifactId&gt;javax.el-api&lt;/artifactId&gt;
            &lt;version&gt;2.2.4&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.glassfish.web&lt;/groupId&gt;
            &lt;artifactId&gt;javax.el&lt;/artifactId&gt;
            &lt;version&gt;2.2.4&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-validator-cdi&lt;/artifactId&gt;
            &lt;version&gt;5.2.4.Final&lt;/version&gt;
        &lt;/dependency&gt;        
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.projectlombok&lt;/groupId&gt;
            &lt;artifactId&gt;lombok&lt;/artifactId&gt;
            &lt;version&gt;1.16.8&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;           
                        
    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-compiler-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.1&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;source&gt;1.8&lt;/source&gt;
                    &lt;target&gt;1.8&lt;/target&gt;

                &lt;/configuration&gt;
            &lt;/plugin&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;2.3&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;failOnMissingWebXml&gt;false&lt;/failOnMissingWebXml&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

The Maven pom.xml contains dependencies for the Java EE Web API, 
Hibernate Validator, and for the Lombok library. 

index.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;
        &lt;title&gt;Validation&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;

        &lt;p&gt;
            Enter your name and email:
        &lt;/p&gt;

        &lt;form method="post" action="Greet"&gt;

            Name: &lt;input type="text" name="username"&gt; &lt;br&gt;
            Email: &lt;input type="text" name="email"&gt; &lt;br&gt;

            &lt;input type="submit" value="Submit"&gt; 

        &lt;/form&gt;

    &lt;/body&gt;
&lt;/html&gt;

The index.jsp is the entry point to our application. It contains
a HTML form with two fields: username and email. The values entered into these 
fields are going to be validated by the application.

&lt;form method="post" action="Greet"&gt;
...
&lt;/form&gt;

Upon submitting the form, the Greet servlet is invoked.

hello.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;
        &lt;title&gt;Greeting&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        Hello &lt;c:out value="${param.username}"/&gt;! &lt;br&gt;
        Your email is &lt;c:out value="${param.email}"/&gt;.
    &lt;/body&gt;
&lt;/html&gt;

When the input data passes the validation test, the hello.jsp page
is displayed. It displays the entered data.

valError.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;
        &lt;title&gt;Error&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;c:forEach var="err" items="${errMsg}"&gt;
                &lt;c:out value="${err}"/&gt;
                &lt;br&gt;
            &lt;/c:forEach&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

If the validation fails, the valError.jsp is displayed. It shows
the error messages stored in the errMsg attribute. The attribute
is set during the validation process.

User.java
  

package com.zetcode.bean;

import javax.validation.constraints.Pattern;
import lombok.Data;
import org.hibernate.validator.constraints.NotEmpty;

@Data
public class User {
    
    @NotEmpty
    private String name;
    
    @NotEmpty
    @Pattern(regexp="^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,5}", 
            message="Please provide a valid email address")    
    private String email;
}

The User bean is decorated with Lombok and Hibernate Validator
annotations.

@NotEmpty
private String name;

The @NotEmpty annotation causes that the user name may not be empty.

@NotEmpty
@Pattern(regexp="^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\\.[a-zA-Z.]{2,5}", 
        message="Please provide a valid email address")    
private String email;

The email may not be empty and must match the given patter. The pattern
is set with the @Pattern annotation.

DoValidate.java
  

package com.zetcode.util;

import com.zetcode.bean.User;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

public class DoValidate {

    public static  List&lt;String&gt; validate(User user) {

        List&lt;String&gt; errors = new ArrayList();
        
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();

        Set&lt;ConstraintViolation&lt;User&gt;&gt; cvs = validator.validate(user);

        if (!cvs.isEmpty()) {

            for (ConstraintViolation&lt;User&gt; cv : cvs) {

                StringBuilder err = new StringBuilder();
                err.append(cv.getPropertyPath());
                err.append(" ");
                err.append(cv.getMessage());
                errors.add(err.toString());
            }
        }
        
        return errors;
    }
}

The validation is performed in the DoValidate utility class.

if (!cvs.isEmpty()) {

    for (ConstraintViolation&lt;User&gt; cv : cvs) {

        StringBuilder err = new StringBuilder();
        err.append(cv.getPropertyPath());
        err.append(" ");
        err.append(cv.getMessage());
        errors.add(err.toString());
    }
}

When there are constraint violations, we create a list of error messages.
The getMessage method gets the error message of the constraint
violation.

return errors;

The list of error messages are returned to the caller. The list is empty if
no violations were detected.

Greeting.java
  

package com.zetcode.web;

import com.zetcode.bean.User;
import com.zetcode.util.DoValidate;
import java.io.IOException;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "Greeting", urlPatterns = {"/Greet"})
public class Greeting extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, 
            HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");

        String page = "/hello.jsp";
        
        String username = request.getParameter("username");
        String email = request.getParameter("email");

        User user = new User();
        user.setName(username);
        user.setEmail(email);

        List&lt;String&gt; errors = DoValidate.validate(user);

        if (!errors.isEmpty()) {

            request.setAttribute("errMsg", errors);

            page = "/valError.jsp";

        } else {

            request.setAttribute("user", user);
        }

        RequestDispatcher disp = getServletContext().getRequestDispatcher(page);
        disp.forward(request, response);
    }
}

The Greeting servlet retrieves the request data and calls the 
DoValidate.validate utility method. Depending on the outcome
of the validation, the servlet dispatches to the hello.jsp or
valError.jsp pages.

![error_message.png](images/error_message.png)

Figure: Error message

The application responds with an error message if the email has an incorrect format.

## Source

[Hibernate Validator documentation](https://hibernate.org/validator/documentation/getting-started/)

This was the validation filter tutorial. We have built a console and a web application using 
Hibernate Validator, JSTL, JSP, Apache Tomcat, and Maven. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).