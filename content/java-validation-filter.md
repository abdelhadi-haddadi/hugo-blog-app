+++
title = "Java validation filter"
date = 2025-08-29T20:00:56.796+01:00
draft = false
description = "Java validation filter tutorial shows how to validate data entered by the user in a web application using a validation filter."
image = "images/validation_project.png"
imageBig = "images/validation_project.png"
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java validation filter

last modified January 27, 2024

 

In this article we show how to validate data entered by the user in 
a web application. Validation is a common task and is covered in Java web 
frameworks such as Stripes, Ninja framework, or Play framework. 
In this article we will validate data with a simple custom validation filter.
The sources are available at the author's 
[Github repository](https://github.com/janbodnar/ValidationFilter).

A filter is an object that performs filtering tasks on either the request to a resource, 
or on the response from a resource, or both. Filters perform filtering in the 
doFilter method. 

Filters can be used for various tasks such as authentication, logging, data compression,
image conversion, or encryption. In our example, we use a filter to validate input data.

In our application, we have a HTML form that takes input from a user. The form
has two input tags: user name and email. The input is being validated with a filter.
To validate the email format, we use the Apache Commons Validator.
The project is built with Maven in NetBeans IDE. We deploy the application on Tomcat.

![validation_project.png](images/validation_project.png)

Figure: Structure

The figure shows the project structure in NetBeans. We have three JSP pages, two Java
classes, and two XML configuration files.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                        http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;Validation&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;Validation&lt;/name&gt;
    
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
            &lt;groupId&gt;commons-validator&lt;/groupId&gt;
            &lt;artifactId&gt;commons-validator&lt;/artifactId&gt;
            &lt;version&gt;1.5.1&lt;/version&gt;
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
                    &lt;compilerArguments&gt;
                        &lt;endorseddirs&gt;${endorsed.dir}&lt;/endorseddirs&gt;
                    &lt;/compilerArguments&gt;
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

This is the pom.xml build file. It contains dependencies for
dependencies for JSTL and Apache Commons Validator.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/Validation"/&gt;

In the context.xml file we specify the context path for
the application. It is used to uniquely identify the application.

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

The index.jsp is the entry point of the application. It has
a HTML form with two fields. The values entered into these fields will 
be validated by the application.

&lt;form method="post" action="Greet"&gt;
...
&lt;/form&gt;

Upon submitting the form, the Greet servlet is invoked.
Before reaching the servlet, a filter will process the request.

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
is displayed. It shows the entered data.

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
            &lt;c:out value="${errMsg}"/&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

If the validation fails, the valError.jsp is displayed. It shows
the error message stored in the errMsg attribute. The attribute
is set in the validation filter.

ValidationFilter.java
  

package com.zetcode.web;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import org.apache.commons.validator.routines.EmailValidator;

@WebFilter(filterName = "ValidationFilter", urlPatterns = {"/Greet"})
public class ValidationFilter implements Filter {

    public ValidationFilter() { }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {
              
        String erpg = "valError.jsp";

        String userName = request.getParameter("username");
        String email = request.getParameter("email");
        boolean valid = EmailValidator.getInstance().isValid(email);

        if (userName == null || "".equals(userName)
                || email == null || "".equals(email)) {

            request.setAttribute("errMsg", "One or both fields are empty");

            RequestDispatcher rd = request.getRequestDispatcher(erpg);
            rd.include(request, response);

        } else if (!valid) {
            
            request.setAttribute("errMsg", "Email format not valid");
            RequestDispatcher rd = request.getRequestDispatcher(erpg);
            rd.include(request, response);
        } else {
            
            chain.doFilter(request, response); 
        }

    }

    @Override
    public void destroy() { }

    @Override
    public void init(FilterConfig filterConfig) { }

}

The validation of data is performed in the ValidationFilter class.

@WebFilter(filterName = "ValidationFilter", urlPatterns = {"/Greet"})

The @WebFilter annotation declares a servlet filter.
The filter is applied on the specified URL pattern. In our case, it is 
invoked before the invocation of the Greet servlet. 

public class ValidationFilter implements Filter {

A filter implements the Filter interface.

@Override
public void doFilter(ServletRequest request, ServletResponse response,
        FilterChain chain)
        throws IOException, ServletException {
...         
}

The actual work is done in the doFilter method.

String userName = request.getParameter("username");
String email = request.getParameter("email");

With the getParameter method, we get the data sent
by the HTML form.

boolean valid = EmailValidator.getInstance().isValid(email);

Using the Apache Commons Validator's EmailValidator we 
check the validity of the email format.

if (userName == null || "".equals(userName)
        || email == null || "".equals(email)) {

    request.setAttribute("errMsg", "One or both fields are empty");

    RequestDispatcher rd = request.getRequestDispatcher(erpg);
    rd.include(request, response);

} else if (!valid) {
    
    request.setAttribute("errMsg", "Email format not valid");
    RequestDispatcher rd = request.getRequestDispatcher(erpg);
    rd.include(request, response);
} else {
    
    chain.doFilter(request, response); 
}

If the data fails to validate, the processing is dispatched to the 
error page with the RequestDispatcher. Otherwise, the 
request continues its trip to the destination servlet.

Greeting.java
  

package com.zetcode.web;

import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "Greeting", urlPatterns = {"/Greet"})
public class Greeting extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        String page = "/hello.jsp";
        RequestDispatcher disp = getServletContext().getRequestDispatcher(page);
        disp.forward(request, response);
    }
}

The Greeting servlet simply dispatches the request to the hello.jsp page
with the RequestDispatcher.

![error_message.png](images/error_message.png)

Figure: Error message

The application responds with an error message if the email has an incorrect format.

This was the validation filter tutorial. We have built a web application using 
JSTL, JSP, Apache Commons Validator, Tomcat, and Maven. 

## Source

[Jakarta Servlet Filter](https://jakarta.ee/specifications/servlet/5.0/apidocs/jakarta/servlet/filter)

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).