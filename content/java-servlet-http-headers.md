+++
title = "Java Servlet HTTP headers"
date = 2025-08-29T20:01:46.068+01:00
draft = false
description = "In this article we talk about HTTP headers and show how to display HTTP header fields in a Java servlet and a JSP file"
image = ""
imageBig = ""
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet HTTP headers

last modified August 24, 2023

In this article we talk about HTTP headers and show how to display HTTP
headers in a Java servlet and a JSP file.

HTTP header fields are components of the header section of request and response
messages in the Hypertext Transfer Protocol (HTTP). They define the operating
parameters of an HTTP transaction.

HTTP headers allow the client and the server to pass additional information with
the request or the response. They are used for various tasks such as
authentication, cookies, caching, connection management, or content negotiation.

For instance, the User-Agent specifies the user aget (the client
application that made the request such as browser) and Date
specifies the date and time when the message was originated.

There are several types of headers:

- General header - applies to both requests and responses but has no relation to the data eventually transmitted in the body.

- Request header - contains more information about the resource to be fetched or about the client itself.

- Response header - contains additional information about the response, like its location or about the server itself (name and version etc.).

- Entity header - contains more information about the body of the entity, like its content length or its MIME-type.

## Showing header fields with a Java servlet

In the first example, we display HTTP headers in a servlet.

├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           └── MyServlet.java
    │   ├── resources
    │   └── webapp
    │       ├── showHeaders.jsp
    │       └── WEB-INF
    └── test
        └── java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
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

com/zetcode/ShowHeaders.java
  

package com.zetcode;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

@WebServlet(name = "ShowHeaders", urlPatterns = {"/ShowHeaders"})
public class ShowHeaders extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {

        PrintWriter out = response.getWriter();

        response.setContentType("text/html");
        out.println("&lt;!DOCTYPE html&gt;");
        out.println("&lt;html lang=\"en\"&gt;");
        out.println("&lt;head&gt;");
        out.println("&lt;title&gt;HTTP headers&lt;/title&gt;");
        out.println("&lt;body&gt;");
        out.println("&lt;p&gt;Headers&lt;/p&gt;");

        Enumeration&lt;String&gt; headerNames = request.getHeaderNames();

        out.println("&lt;ol&gt;");

        while (headerNames.hasMoreElements()) {

            out.print("&lt;li&gt;");
            String headerName = headerNames.nextElement();
            out.print(headerName + " = ");
            String headerValue = request.getHeader(headerName);
            out.print(headerValue);
            out.println("&lt;/li&gt;");
        }

        out.println("&lt;/ol&gt;");

        out.println("&lt;/body&gt;");
        out.println("&lt;/html&gt;");
    }
}

The ShowHeaders servlet finds out HTTP headers sent by the client
and sends them back in a HTML file.

PrintWriter out = response.getWriter()

We directly write to the PrintWriter. Note that while it is
possible to do this direct writing, modern Java web applications use templates
such as Thymeleaf, FreeMarker, or JSP to create HTML pages.

response.setContentType("text/html");

The content type of the response is set to text/html.

Enumeration&lt;String&gt; headerNames = request.getHeaderNames();

We get the header names with the getHeaderNames method. It returns
an enumeration of strings.

String headerName = headerNames.nextElement();

We get the next header name from the enumeration with the
nextElement method.

String headerValue = request.getHeader(headerName);

With the getHeader, we get the header value.

Navigate to localhost:8080/app/ShowHeaders to get the headers
through a servlet.

## Showing header fields in a JSP file

In the second example, we display HTTP headers in a JSP file. We also
use the JSTL library.

webapp/showHeaders.jsp
  

&lt;%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core' %&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;title&gt;HTTP headers&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;p&gt;HTTP headers:&lt;/p&gt;
    &lt;ol&gt;
      &lt;c:forEach var="nextHeader" items="${header}"&gt;
          &lt;li&gt;&lt;c:out value="${nextHeader.key}" /&gt; = &lt;c:out value="${nextHeader.value}" /&gt;&lt;/li&gt;
      &lt;/c:forEach&gt;
    &lt;/ol&gt;
  &lt;/body&gt;
&lt;/html&gt;

A JSP file has a header implicit object, which is a map of header
names and their values.

&lt;c:forEach var="nextHeader" items="${header}"&gt;
    &lt;li&gt;&lt;c:out value="${nextHeader.key}" /&gt; = &lt;c:out value="${nextHeader.value}" /&gt;&lt;/li&gt;
&lt;/c:forEach&gt;

Using the JSTL's forEach tag, we iterate over the map and display
the header names and their values.

Navigate to localhost:8080/app/showHeaders.jsp to get the headers
through a JSP.

In this article we worked with HTTP header fields.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java Servlet tutorials](/all/#servlets).