+++
title = "Servlets & Java Server Pages"
date = 2025-08-29T19:59:39.085+01:00
draft = false
description = "This chapter covers Servlets and Java Server Pages with Jetty."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../embedded/)
[Next](../logging/)

# Servlets &amp; Java Server Pages

last modified January 27, 2024

 

A *servlet* is a Java Web component that generates dynamic content. 
Servlets are managed by containers like Jetty or Tomcat; they are
classes used to build web applications based on request-response programming
model. *Java Server Pages (JSP)* technology allows us to easily create web 
content that has both static and dynamic components. JSPs are compiled 
into servlets by a JSP compiler.

This chapter will show how to set up servlets and Java Server Pages 
in Jetty.

## Processing a POST request

An HTTP POST request sends data from a client to a server.
An HTML form sends data to server using the POST method.

In our example a servlet processes the data sent by the client.
It retrieves the values and sends it back to the client.

 tree
.
├── build.xml
└── src
    ├── com
    │   └── zetcode
    │       └── MyServlet.java
    └── web
        ├── index.html
        └── WEB-INF
            └── web.xml

5 directories, 4 files

This is how our project directory looks like.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;

&lt;form id="contact" method="post" action="process.do"&gt;
 
&lt;label for="name"&gt;Name:&lt;/label&gt;
&lt;input type="text" name="name"&gt;
&lt;br&gt; 
&lt;label for="age"&gt;Age:&lt;/label&gt;
&lt;input type="text" name="age"&gt;
 
&lt;input type="submit" value="Submit"&gt;
 
&lt;/form&gt;
 
&lt;/body&gt;
&lt;/html&gt;

The index.html file contains an HTML form. It has
two input tags to get data from the user. The values can be retrieved
later from the request parameters whose names match the input's name 
attributes. The action attribute of the form tag
provides a URL pattern that is mapped to a specific servlet to 
process.

web.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
         http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1"&gt;
    
&lt;/web-app&gt;

The web.xml is empty. The mapping of the URL to 
the servlet is created using an annotation. Actually, the file
is not needed in our example. However, since not all features
can be replaced by annotations, the web.xml file
is included in larger projects.

MyServlet.java
  

package com.zetcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet(urlPatterns = "/process.do")
public class MyServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().format("Name: %s%n", request.getParameter("name"));
        response.getWriter().format("Age: %s%n", request.getParameter("age"));
    }
}

This is the code of our processing servlet.

@WebServlet(urlPatterns = "/process.do")

The WebServlet annotation maps com.zetcode.MyServlet 
to the /process.do URL pattern.

response.getWriter().format("Name: %s%n", request.getParameter("name"));

We retrieve the name value from the request object using the getParameter
method. The name parameter corresponds to the name attribute of the input tag.

build.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="ProcessForm" default="compile"&gt;
  
    &lt;property name="name" value="myform"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="web.dir" value="${src.dir}/web"/&gt;
    &lt;property name="build.dir" location="${web.dir}/WEB-INF/classes"/&gt;
    &lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
    &lt;property name="dist.dir" location="dist"/&gt;
    &lt;property name="deploy.path" location="${env.JETTY_BASE}/webapps"/&gt;
  
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${jetty.lib.dir}"/&gt;
    &lt;/path&gt;
  
    &lt;target name="init"&gt;
        &lt;mkdir dir="${build.dir}"/&gt;
        &lt;mkdir dir="${dist.dir}"/&gt;
    &lt;/target&gt;     
  
    &lt;target name="compile" depends="init"&gt;
        &lt;javac srcdir="${src.dir}" destdir="${build.dir}" 
               includeantruntime="false"&gt;
            &lt;classpath refid="compile.classpath"/&gt;
        &lt;/javac&gt;
        &lt;echo&gt;Compilation completed&lt;/echo&gt;
    &lt;/target&gt;
  
    &lt;target name="archive" depends="compile"&gt;
        &lt;war destfile="${dist.dir}/${name}.war" 
             webxml="${web.dir}/WEB-INF/web.xml"&gt;
            &lt;fileset dir="${web.dir}"/&gt;
        &lt;/war&gt;
        &lt;echo&gt;Archive created&lt;/echo&gt;
    &lt;/target&gt; 
  
    &lt;target name="clean" depends="init"&gt;
        &lt;delete dir="${build.dir}"/&gt;
        &lt;delete dir="${dist.dir}"/&gt;
        &lt;echo&gt;Cleaning completed&lt;/echo&gt;
    &lt;/target&gt;  
    
    &lt;target name="deploy" depends="archive"&gt;
        &lt;copy file="${dist.dir}/${name}.war" overwrite="true" 
              todir="${deploy.path}"/&gt;
        &lt;echo&gt;Archive deployed&lt;/echo&gt;
    &lt;/target&gt;    
    
&lt;/project&gt;

This is the Ant build file.

$ curl --data "name=Robert&amp;age=33" localhost:8080/myform/process.do
Name: Robert
Age: 33

We do a POST request with the curl tool and the servlet responds 
with these two lines.

## Custom 404 error page

This example sets up a custom JSP page for displaying an HTTP 404 error.
The 404 or Not Found error message is a HTTP standard response code indicating 
that the client was able to communicate with a given server, but the server could 
not find what was requested.

$ tree
.
├── build.xml
└── src
    ├── com
    │   └── zetcode
    │       └── MyServlet.java
    └── web
        ├── error404.jsp
        └── WEB-INF
            └── web.xml

5 directories, 4 files

These are the contents of the project directory.

error404.jsp
  

&lt;%@ page language="java" isErrorPage="true" contentType="text/html; 
    charset=UTF-8" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Error page&lt;/title&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;button onclick="history.back()"&gt;Back to Previous Page&lt;/button&gt;
    &lt;h1&gt;404 Page Not Found.&lt;/h1&gt;
    &lt;p&gt;&lt;b&gt;Error code:&lt;/b&gt; ${pageContext.errorData.statusCode}&lt;/p&gt;
    &lt;p&gt;&lt;b&gt;Request URI:&lt;/b&gt; 
    ${pageContext.request.scheme}://${header.host}${pageContext.errorData.requestURI}
    &lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

This JSP page will be displayed if Jetty cannot find a requested page.

MyServlet.java
  

package com.zetcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/plain");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("MyServlet called");
    }
}

A simple servlet is created. The servlet sends a plain message back to the
client.

web.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
         http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1"&gt;
    
    &lt;display-name&gt;MyServlet&lt;/display-name&gt;
    
    &lt;servlet id="jsp"&gt;
        &lt;servlet-name&gt;jsp&lt;/servlet-name&gt;
        &lt;servlet-class&gt;org.apache.jasper.servlet.JspServlet&lt;/servlet-class&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;fork&lt;/param-name&gt;
            &lt;param-value&gt;false&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;init-param&gt;
            &lt;param-name&gt;keepgenerated&lt;/param-name&gt;
            &lt;param-value&gt;true&lt;/param-value&gt;
        &lt;/init-param&gt;
        &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;
    &lt;/servlet&gt;    
    
    &lt;servlet&gt;
        &lt;servlet-name&gt;MyServlet&lt;/servlet-name&gt;
        &lt;servlet-class&gt;com.zetcode.MyServlet&lt;/servlet-class&gt;
    &lt;/servlet&gt;
    
    &lt;servlet-mapping&gt;
        &lt;servlet-name&gt;MyServlet&lt;/servlet-name&gt;
        &lt;url-pattern&gt;/myservlet.do&lt;/url-pattern&gt;
    &lt;/servlet-mapping&gt;
    
    &lt;servlet-mapping&gt;
        &lt;servlet-name&gt;jsp&lt;/servlet-name&gt;
        &lt;url-pattern&gt;*.jsp&lt;/url-pattern&gt;
    &lt;/servlet-mapping&gt;    
    
    &lt;error-page&gt;
        &lt;error-code&gt;404&lt;/error-code&gt;
        &lt;location&gt;/error404.jsp&lt;/location&gt;
    &lt;/error-page&gt;    
    
&lt;/web-app&gt;

The web.xml file registers a JspServlet which
handles JSP pages, registers our MyServlet, and maps 
the error404.jsp file to the 404 error.

build.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="CustomErrorPage" default="compile"&gt;
  
    &lt;property name="name" value="customerror"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="web.dir" value="${src.dir}/web"/&gt;
    &lt;property name="build.dir" location="${web.dir}/WEB-INF/classes"/&gt;
    &lt;property name="lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
    &lt;property name="dist.dir" location="dist"/&gt;
    &lt;property name="deploy.path" location="${env.JETTY_BASE}/webapps"/&gt;
  
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${lib.dir}"/&gt;
    &lt;/path&gt;
  
    &lt;target name="init"&gt;
        &lt;mkdir dir="${build.dir}"/&gt;
        &lt;mkdir dir="${dist.dir}"/&gt;
    &lt;/target&gt;     
  
    &lt;target name="compile" depends="init"&gt;
        &lt;javac srcdir="${src.dir}" destdir="${build.dir}" 
               includeantruntime="false"&gt;
            &lt;classpath refid="compile.classpath"/&gt;
        &lt;/javac&gt;
        &lt;echo&gt;Compilation completed&lt;/echo&gt;
    &lt;/target&gt;
  
    &lt;target name="archive" depends="compile"&gt;
        &lt;war destfile="${dist.dir}/${name}.war" 
             webxml="${web.dir}/WEB-INF/web.xml"&gt;
            &lt;fileset dir="${web.dir}"/&gt;
        &lt;/war&gt;
        &lt;echo&gt;Archive created&lt;/echo&gt;
    &lt;/target&gt; 
  
    &lt;target name="clean" depends="init"&gt;
        &lt;delete dir="${build.dir}"/&gt;
        &lt;delete dir="${dist.dir}"/&gt;
        &lt;echo&gt;Cleaning completed&lt;/echo&gt;
    &lt;/target&gt;  
    
    &lt;target name="deploy" depends="archive"&gt;
        &lt;copy file="${dist.dir}/${name}.war" overwrite="true" 
              todir="${deploy.path}"/&gt;
        &lt;echo&gt;Archive deployed&lt;/echo&gt;
    &lt;/target&gt;    
    
&lt;/project&gt;

This is the Ant build file.

$ java -jar $JETTY_HOME/start.jar --add-to-start=http,deploy,jsp,jstl,annotations

These modules must be enabled in the Jetty base.

$ java -jar $JETTY_HOME/start.jar
$ curl localhost:8080/customerror/myservlet.do
MyServlet called

We start Jetty and make a valid request.

$ curl localhost:8080/customerror/servlet.do
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Error page&lt;/title&gt;
    &lt;meta http-equiv="Content-Type" content="text/html; charset=UTF-8"&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;button onclick="history.back()"&gt;Back to Previous Page&lt;/button&gt;
    &lt;h1&gt;404 Page Not Found.&lt;/h1&gt;
    &lt;p&gt;&lt;b&gt;Error code:&lt;/b&gt; 404&lt;/p&gt;
    &lt;p&gt;&lt;b&gt;Request URI:&lt;/b&gt; http://localhost:8080/customerror/servlet.do&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

Trying to reach a non-existing resource causes Jetty to send our
custom 404 error page.

In this chapter of the Jetty tutorial, we have worked with Java servlets 
and JSPs.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).

[Contents](..)
[Previous](../embedded/)
[Next](../logging/)