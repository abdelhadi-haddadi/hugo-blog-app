+++
title = "Java servlet send image"
date = 2025-08-29T20:01:46.047+01:00
draft = false
description = "Java Servlet send image tutorial shows how to send an image to the client with Java servlet. The web application is deployed on Jetty server."
image = ""
imageBig = ""
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java servlet send image

last modified August 24, 2023

In Java servlet send image tutorial, we create a classic web application in Java
using a servlet. The servlet sends an image to the client. The web application
is deployed on Jetty server.

## Java servlet

Servlet is a Java class which responds to a particular
type of network request - most commonly an HTTP request. Servlets are used
to implement web applications. They run in a servlet container such as Tomcat
or Jetty. In modern-day Java web development programmers use frameworks that
are built on top of servlets.

Eclipse Jetty  is a Java HTTP server and Java Servlet container.
Jetty can be easily embedded in devices, tools, frameworks, application servers,
and clusters.

## Java servlet image example

The following web application sends an image to the client. The web application
uses a Java servlet.

pom.xml
src
├── main
│&nbsp;  ├── java
│   │   └── com
│   │       └── zetcode
│   │               └── SendImage.java
│   ├── resources
│   └── webapp
│       ├── images
│       │   └── sid.jpg
│       └── index.html
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
    &lt;artifactId&gt;HttpServletMappingEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;jakarta.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;jakarta.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;6.0.0&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.2.3&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;11.0.11&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;webApp&gt;
                        &lt;contextPath&gt;/app&lt;/contextPath&gt;
                    &lt;/webApp&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the pom.xml file.

com/zetcode/web/SendImage.java
  

package com.zetcode.web;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

@WebServlet(name = "SendImage", urlPatterns = {"/image"})
public class SendImage extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        ServletContext sc = getServletContext();

        try (InputStream is = sc.getResourceAsStream("/images/sid.jpg")) {

            // it is the responsibility of the container to close output stream
            OutputStream os = response.getOutputStream();

            if (is == null) {

                response.setContentType("text/plain");
                os.write("Failed to send image".getBytes());
            } else {

                response.setContentType("image/jpeg");

                byte[] buffer = new byte[1024];
                int bytesRead;

                while ((bytesRead = is.read(buffer)) != -1) {

                    os.write(buffer, 0, bytesRead);
                }
            }
        }
    }
}

The SendImage servlet returns an image file to the client.

@WebServlet(name = "SendImage", urlPatterns = {"/image"})

The @WebServlet annotation maps the request with image
URL pattern to the SendImage servlet.

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response)
        throws IOException {

The request is a GET request, so we serve it in the doGet method.

ServletContext sc = getServletContext();

We get the ServletContext, which contains a set of methods that a
servlet uses to communicate with its servlet container, for example, to get the
MIME type of a file, dispatch requests, or write to a log file.

try (InputStream is = sc.getResourceAsStream("/images/sid.jpg")) {

We get the image resource stream with getResourceAsStream.

OutputStream os = response.getOutputStream();

We get the servlet output stream. We write image data to this stream. It is the
responsibility of the container to close servlet output stream.

if (is == null) {

    response.setContentType("text/plain");
    os.write("Failed to send image".getBytes());
} else {

If we fail to open an image input stream, we send an error message back
to the client.

response.setContentType("image/jpeg");

The image has JPEG format; therefore, we set the content type of the response
to image/jpeg.

byte[] buffer = new byte[1024];
int bytesRead;

while ((bytesRead = is.read(buffer)) != -1) {

    os.write(buffer, 0, bytesRead);
}

If we successfully opened the image input stream, we read the data
and write it to the servlet output stream.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Servlet image&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="image"&gt;Get image&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.html file is the home page of our application. It has a
link that calls a servlet which servers an image file.

$ mvn jetty:run

We run the Jetty server and navigate to localhost:8080/app/.

In this article we have used a Java servlet to send an image to the client.

List [Java Servlet tutorials](/all/#servlets).