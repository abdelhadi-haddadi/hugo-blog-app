+++
title = "Java Servlet upload file"
date = 2025-08-29T20:01:48.413+01:00
draft = false
description = "Java servlet upload file shows how to upload a file in a Java web application using Servlet technology."
image = ""
imageBig = ""
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet upload file

last modified August 24, 2023

Java Servlet upload file shows how to upload a single file in a Java web application 
using servlet technology.

## Java Servlet

Servlet is a Java class which responds to a particular type of 
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty. 
Modern-day Java web development uses frameworks that are built on top of servlets.

## HTML form encoding types

There are three encoding HTML form methods for a POST request:

- application/x-www-form-urlencoded

- multipart/form-data

- text/plain

The application/x-www-form-urlencoded is the default encoding. 
The values are encoded in key-value tuples separated by &amp;. The = 
character is used between the key and the value. Non-alphanumeric characters are 
percent encoded. This encoding type is not suitable for binary files.

The multipart/form-data is used for non-acsii data and binary files.
The input element's type attribute is set to 
file.

The text/plain is used for debugging.

## Java Servlet upload file example

In the following application, we have a web form to select a file to be uploaded
to the server. The form calls a Java servlet, which reads the file and saves it
into the directory.

### Upload directory

The /var/www/ directory is a standard directory for web content in
Debian Linux.

$ ls -ld /var/www/upload/
drwxr-xr-x 2 www-data www-data 4096 Jul 24 11:36 /var/www/upload/

We are going to upload files to the /var/www/upload/ directory.
The directory files can be modified by users who are in the www-data
group. So the user who runs the web server must be in this group.

### Application

This is a Maven web application; it is deployed on embedded Jetty server.

pom.xml
src
├── main
│&nbsp;&nbsp; ├── java
│&nbsp;&nbsp; │&nbsp;&nbsp; └── com
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── zetcode
│&nbsp;&nbsp; │&nbsp;&nbsp;         └── web
│&nbsp;&nbsp; │&nbsp;&nbsp;             └── UploadFile.java
│&nbsp;&nbsp; ├── resources
│&nbsp;&nbsp; └── webapp
│&nbsp;&nbsp;     └── index.html
└── test
    └── java

This is the project structure. 

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JavaServletUploadFile&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;14&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;14&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.0&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;9.4.30.v20200611&lt;/version&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven POM file. The javax.servlet-api artifact is for
servlets. 

The maven-war-plugin is responsible for collecting all artifact
dependencies, classes and resources of the web application and packaging them
into a web application archive (WAR). The jetty-maven-plugin is a
useful Maven plugin for rapid development and testing. It creates a web
application, starts a Jetty web server, and deploys the application on the
server.

com/zetcode/web/UploadFile.java
  

package com.zetcode.web;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebInitParam;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@WebServlet(name = "UploadFile", urlPatterns = {"/UploadFile"},
        initParams = { @WebInitParam(name = "uploadpath", value = "/var/www/upload/") })
@MultipartConfig
public class UploadFile extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws IOException, ServletException {

        response.setContentType("text/plain;charset=UTF-8");

        ServletOutputStream os = response.getOutputStream();

        ServletConfig sc = getServletConfig();
        String path = sc.getInitParameter("uploadpath");

        Part filePart = request.getPart("myfile");

        String fileName = filePart.getSubmittedFileName();

        InputStream is = filePart.getInputStream();

        Files.copy(is, Paths.get(path + fileName),
                StandardCopyOption.REPLACE_EXISTING);

        os.print("File successfully uploaded");
    }
}

The UploadFile uploads a file to the /var/www/upload/ directory.

@WebServlet(name = "UploadFile", urlPatterns = {"/UploadFile"},
    initParams = { @WebInitParam(name = "uploadpath", value = "/var/www/upload/") })

With the @WebServlet annotation, we map the servlet to the
/UploadFile URL pattern and define an initial uploadpath variable.

@MultipartConfig

The servlet is also decorated with @MultipartConfig.
The @MultipartConfig annotation indicates that the servlet expects requests to be 
made using the multipart/form-data MIME type.

@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws IOException, ServletException {

POST requests are handled by the doPost() method.

ServletOutputStream os = response.getOutputStream();

We get the servlet output stream with getOutputStream() method.

ServletConfig sc = getServletConfig();
String path = sc.getInitParameter("uploadpath");

We retrieve the initial parameter. It is the directory where we are going to upload a file.

Part filePart = request.getPart("myfile");

The file part is retrieved with the getPart() method.

String fileName = filePart.getSubmittedFileName(); 
InputStream is = filePart.getInputStream();

We get the part's file name and input stream.

Files.copy(is, Paths.get(path + fileName),
        StandardCopyOption.REPLACE_EXISTING);

With Files.copy(), we copy the file to the destination directory.

os.print("File successfully uploaded");

In the end, we write a message back to the client.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Uploading a file&lt;/title&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css"
          integrity="sha384-cg6SkqEOCV1NbJoCu11+bm0NvBRc8IYLRGXkmNrqUBfTjmMYwNKPWBTIKyw9mHNJ" 
          crossorigin="anonymous"&gt;
    &lt;style&gt;
        main { margin:1em }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;main&gt;
&lt;form class="pure-form pure-form-stacked" method="post" action="UploadFile"
      enctype="multipart/form-data"&gt;
    &lt;fieldset&gt;
        &lt;legend&gt;File:&lt;/legend&gt;
        &lt;input  type="file" name="myfile"&gt;
        &lt;button type="submit" class="pure-button pure-button-primary"&gt;Upload&lt;/button&gt;
    &lt;/fieldset&gt;
&lt;/form&gt;
&lt;/main&gt;
&lt;/body&gt;
&lt;/html&gt;

This is the home page to select a file to be uploaded. It contains an HTML form. Upon 
submitting the form, the processing is sent to the UploadFile.

&lt;link rel="stylesheet" href="https://unpkg.com/purecss@2.0.3/build/pure-min.css"
        integrity="sha384-cg6SkqEOCV1NbJoCu11+bm0NvBRc8IYLRGXkmNrqUBfTjmMYwNKPWBTIKyw9mHNJ" 
        crossorigin="anonymous"&gt;

We include the Pure.css library for creating responsible pages. 

&lt;form class="pure-form pure-form-stacked" method="post" action="UploadFile"
    enctype="multipart/form-data"&gt;

The method attribute is post, because we send data to the server.
The action attribute specifies the name of the servlet, which 
processes the request. The enctype attribute specifies the 
multipart/form-data encoding type, which is required for uploading
a file with an HTML form.

&lt;input type="file" name="myfile"&gt;

The type attribute of the input tag lets a user choose a
single file.

&lt;button type="submit" class="pure-button pure-button-primary"&gt;Upload&lt;/button&gt;

This is the Submit button.

In this article we have shown how to upload a single file with a Java servlet.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java Servlet tutorials](/all/#servlets).