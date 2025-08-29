+++
title = "Java servlet check box"
date = 2025-08-27T23:20:47.935+01:00
draft = false
description = "In this tutorial, we create a classic web application in Java using servlets that reads a value from a HTML check box. The web application is deployed on Tomcat server."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java servlet check box

last modified July 13, 2020 

In this tutorial, we create a classic web application that reads a value from 
a HTML check box. The form values are validated with a filter class. The views
are created with FreeMarker template.
The web application is created with a Java servlet and deployed on Tomcat server.

Servlet is a Java class which responds to a particular 
type of network request - most commonly an HTTP request. Servlets are used 
to implement web applications. They run in a servlet container such as Tomcat
or Jetty. In modern-day Java web development programmers use frameworks that
are built on top of servlets.

A Java filter is an object that performs filtering tasks on 
either the request to a resource (a servlet or static content), or on the response 
from a resource, or both. It is used for tasks such as authentication, auditing,
logging, data encryption, or data validation.

FreeMarker is a template engine for the Java programming language. 
Templates are written in the FreeMarker Template Language (FTL). Templates are used
in web applications to create the UI.

Apache Tomcat is an open source Java Servlet Container developed 
by the Apache Software Foundation (ASF). It is the most popular Java web servers.

Bootstrap is an HTML, CSS, and JS framework for developing responsive, 
mobile first projects on the web. It contains HTML and CSS design templates 
for typography, forms, buttons, navigation and other interface components, 
as well as optional JavaScript extension.

## Application

The following web application has a simple web form that consists of a check box
and an input text. The values are send to the web application's controller, which 
is a Java servlet. Before the request reaches the controller, the values are validated
in a Java filter. In the end, the values are shown in a HTML file, which is built
with FreeMarker template. FreeMarker joins HTML with data.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;FormCheckBox&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;FormCheckBox&lt;/name&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;3.1.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.freemarker&lt;/groupId&gt;
            &lt;artifactId&gt;freemarker&lt;/artifactId&gt;
            &lt;version&gt;2.3.25-incubating&lt;/version&gt;
        &lt;/dependency&gt;             
        
    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
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

The javax.servlet-api dependency is a library for building Java 
servlets. The freemarker artifact is for FreeMarker template engine. 
The maven-war-plugin collects all artifact dependencies, 
classes and resources of the web application and packages them into a 
web application archive (WAR).

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── filter
    │   │           │   └── FormFilter.java
    │   │           └── web
    │   │               └── MyController.java
    │   ├── resources
    │   └── webapp
    │       ├── index.html
    │       ├── META-INF
    │       │   └── context.xml
    │       └── WEB-INF
    │           ├── template
    │           │   ├── show.ftl
    │           │   └── unknown.ftl
    │           └── web.xml
    └── test
        └── java

With the tree command we show the project directory structure.

web.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;web-app version="3.1" xmlns="http://xmlns.jcp.org/xml/ns/javaee" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"&gt;
    
    &lt;servlet&gt;
        &lt;servlet-name&gt;freemarker&lt;/servlet-name&gt;
        &lt;servlet-class&gt;freemarker.ext.servlet.FreemarkerServlet&lt;/servlet-class&gt;

        &lt;init-param&gt;
            &lt;param-name&gt;TemplatePath&lt;/param-name&gt;
            &lt;param-value&gt;/WEB-INF/template/&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;NoCache&lt;/param-name&gt;
            &lt;param-value&gt;true&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;ResponseCharacterEncoding&lt;/param-name&gt;
            &lt;param-value&gt;fromTemplate&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;ExceptionOnMissingTemplate&lt;/param-name&gt;
            &lt;param-value&gt;true&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;incompatible_improvements&lt;/param-name&gt;
            &lt;param-value&gt;2.3.25-incubating&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;template_exception_handler&lt;/param-name&gt;
            &lt;param-value&gt;html_debug&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;template_update_delay&lt;/param-name&gt;
            &lt;param-value&gt;0 s&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;default_encoding&lt;/param-name&gt;
            &lt;param-value&gt;UTF-8&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;output_encoding&lt;/param-name&gt;
            &lt;param-value&gt;UTF-8&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;locale&lt;/param-name&gt;
            &lt;param-value&gt;en_US&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;number_format&lt;/param-name&gt;
            &lt;param-value&gt;0.##########&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;
    &lt;/servlet&gt;

    &lt;servlet-mapping&gt;
        &lt;servlet-name&gt;freemarker&lt;/servlet-name&gt;
        &lt;url-pattern&gt;*.ftl&lt;/url-pattern&gt;
    &lt;/servlet-mapping&gt;
    
    &lt;security-constraint&gt;
        &lt;web-resource-collection&gt;
            &lt;web-resource-name&gt;FreeMarker MVC Views&lt;/web-resource-name&gt;
            &lt;url-pattern&gt;*.ftl&lt;/url-pattern&gt;
        &lt;/web-resource-collection&gt;
        &lt;auth-constraint&gt;
        &lt;/auth-constraint&gt;
    &lt;/security-constraint&gt; 
    &lt;session-config&gt;
        &lt;session-timeout&gt;
            30
        &lt;/session-timeout&gt;
    &lt;/session-config&gt;
&lt;/web-app&gt;

In the web.xml file, we set up the FreeMarker template. It works via 
the freemarker.ext.servlet.FreemarkerServlet. The template directory
is set to /WEB-INF/template/.

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/FormCheckBox"/&gt;

The context.xml file is Tomcat's configuration file. Inside the file we set 
the context path (the application name). The file is located in the META-INF
subdirectory.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Check box&lt;/title&gt;
        &lt;link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div class="container"&gt;
            &lt;div class="form"&gt;

                &lt;form action="MyController"&gt;

                    &lt;input type="hidden" name="action" value="show"&gt;

                    &lt;div class="form-group"&gt;
                        &lt;label&gt;Name:&lt;/label&gt;    
                        &lt;input type="text" name="name" class="form-control"&gt;
                    &lt;/div&gt;

                    &lt;div class="checkbox"&gt;
                        &lt;label&gt;&lt;input type="checkbox" name="adult"&gt;Adult&lt;/label&gt;    
                    &lt;/div&gt;

                    &lt;button type="submit" class="btn btn-default"&gt;Submit&lt;/button&gt;

                &lt;/form&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.html file is the home page of our application. It contains an HTML
form with a text input and a check box. The look of the page is created with the Bootstrap library.

&lt;input type="hidden" name="action" value="show"&gt;

This hidden input tag defines an action parameter, which is used in the controller
servlet.

com/zetcode/FormFilter.java
  

package com.zetcode.filter;

import java.io.IOException;
import java.util.Map;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;

@WebFilter(filterName = "FormFilter", servletNames = {"MyController"})
public class FormFilter implements Filter {

    public FormFilter() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain)
            throws IOException, ServletException {

        Map&lt;String, String[]&gt; params = request.getParameterMap();
        
        params.keySet().stream().forEach(key -&gt; {
            
            String value = params.get(key)[0];
            
            if (key != null &amp;&amp; ! value.trim().isEmpty())
                request.setAttribute(key, params.get(key)[0]);
            
        });
        
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
    }

    @Override
    public void init(FilterConfig filterConfig) {

    }
}

The FormFilter processes the request before reaching the MyController
servlet. It retrieves all parameters from the request and validates them; we need to 
ensure that the values are not null or empty.

Map&lt;String, String[]&gt; params = request.getParameterMap();

We get all the parameters from the request with the getParameterMap method.

params.keySet().stream().forEach(key -&gt; {
    
    String value = params.get(key)[0];
    
    if (key != null &amp;&amp; ! value.trim().isEmpty())
        request.setAttribute(key, params.get(key)[0]);
    
});

We need to turn request parameters into request attributes.
We set an attribute to the request if it is not null or empty.
These attributes are available for the FreeMarker template engine to process
them. 

chain.doFilter(request, response);

The request continues to the mapped servlet.

com/zetcode/MyController.java
  

package com.zetcode.web;

import com.zetcode.util.Validate;
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MyController", urlPatterns = {"/MyController"})
public class MyController extends HttpServlet {

    private static final String SHOW_ACTION = "show";
    private static final String SHOW_VIEW = "show.ftl";
    private static final String UNKNOW_VIEW = "unknown.ftl";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String action = request.getParameter("action");
    
        String path = UNKNOW_VIEW;

        if (SHOW_ACTION.equals(action)) {

            path = SHOW_VIEW;
        } 

        response.setContentType("text/html;charset=UTF-8");

        RequestDispatcher dispatcher = request.getRequestDispatcher(path);
        dispatcher.forward(request, response);
    }
}

The MyController servlet will handle a request aftet it was
processed by a filter.

@WebServlet(name = "MyController", urlPatterns = {"/MyController"})

The @WebServlet annotation maps the request with MyController 
URL pattern to the MyController servlet.

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

The request is a GET request, so we serve it in the doGet method.

response.setContentType("text/html;charset=UTF-8");

With the setContentType method, we set the content type (HTML)
and charset.

RequestDispatcher dispatcher = request.getRequestDispatcher(path);
dispatcher.forward(request, response);

With the RequestDispatcher, we forward the request to the view.
The view is a FreeMarker template which is transformed into HTML page.

show.ftl
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Show page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
&lt;body&gt;
    
    &lt;#if adult??&gt;
        &lt;p&gt;${name!"Guest"} is adult&lt;/p&gt;
    &lt;#else&gt;
        &lt;p&gt;${name!"Guest"} is minor&lt;/p&gt;
    &lt;/#if&gt;
        
&lt;/body&gt;
&lt;/html&gt;

This is the show.ftl template. Two attributes were passed
to the template: adult and name. FreeMarker uses
the ${} syntax to get the value of a request attribute.

&lt;#if adult??&gt;

With the #if directive, we check if the adult attribute
is set. The ?? tells if the left hand operand's value is missing.

&lt;p&gt;${name!"Guest"} is adult&lt;/p&gt;

The ! is used to give a default value when a value is missing. 
(Remember that we did not set attributes for parameters that were empty or null.)
If the name variable is set, it is displayed; otherwise, "Guest" is shown.

unknown.ftl
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Unknow action&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;Unknown action&lt;/p&gt;
        
&lt;/body&gt;
&lt;/html&gt;

This is the unknown.ftl template file.

In this tutorial, we have sent data from an HTML form to a Java servlet.
The form contained an input tag and a check box. The request parameters were
validated in a Java filter and turned into request attributes and send 
to a FreeMarker template to be displayed.