+++
title = "Java Servlet serve plain text"
date = 2025-08-29T20:01:47.206+01:00
draft = false
description = "In Java Servlet plaint text tutorial, we show how to return plain text from a Java servlet. The web application is deployed on Jetty."
image = ""
imageBig = ""
categories = ["javaservlet"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Servlet serve plain text

last modified August 24, 2023

In Java Servlet text tutorial, we show how to return plain text from a Java
servlet. The web application is deployed on Jetty.

Servlet is a Java class which responds to a particular type of
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty.
Modern-day Java web development uses frameworks that are built on top of servlets.

Jetty is an open source Java Servlet Container by JBoss. It can be
used in embedded mode.

## Java servlet application

The following web application uses a Java servlet to send plain text to the client.
The text is read from a file in the resources directory.

pom.xml
src
├── main
│   ├── java
│   │   └── com
│   │       └── zetcode
│   │           ├── util
│   │           │   └── ReadTextUtil.java
│   │           └── web
│   │               └── GetText.java
│   ├── resources
│   │   └── thermopylae.txt
│   └── webapp
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

This is the Maven POM file. The jakarta.servlet-api dependency is
for servlets.

The maven-war-plugin is responsible for collecting all artifact
dependencies, classes and resources of the web application and packaging them
into a web application archive (WAR). The jetty-maven-plugin is a
useful Maven plugin for rapid development and testing. It creates a web
application, starts a Jetty web server, and deploys the application on the
server.

resources/thermopylae.txt
  

The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

This is the text file to be read and sent from the web application to the client.

com/zetcode/web/GetText.java
  

package com.zetcode.web;

import com.zetcode.util.ReadTextUtil;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "GetText", urlPatterns = {"/GetText"})
public class GetText extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/plain;charset=UTF-8");

        ServletOutputStream sout = response.getOutputStream();
        String content = ReadTextUtil.getContents();

        sout.print(content);
    }
}

This is the GetText servlet. It reads data from the text file
located in the resources directory and sends the text to the client in plain
text format.

response.setContentType("text/plain;charset=UTF-8");

We set the content type of the response object to text/plain.

ServletOutputStream sout = response.getOutputStream();

We get the ServletOutputStream which is used to send character text
to the client.

String content = ReadTextUtil.getContents();

We read the text into the content variable.

sout.print(content);

The text content is written to the writer.

com/zetcode/util/ReadTextUtil.java
  

package com.zetcode.util;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ReadTextUtil {

    public static String getContents()  {

        String data = "";
        String fileName = "thermopylae.txt";

        URL url = ReadTextUtil.class.getClassLoader().getResource(fileName);

        if (url == null) {
            data = "no text data found";
        }

        try {
            data = Files.readString(Paths.get(url.toURI()), StandardCharsets.UTF_8);
        } catch (IOException | URISyntaxException ex) {
            Logger.getLogger(ReadTextUtil.class.getName()).log(Level.SEVERE, null, ex);
        }

        return data;
    }
}

ReadTextUtil is an utility class to read the contents of the file.

URL url = ReadTextUtil.class.getClassLoader().getResource(fileName);

We get the file resource with the getResource method.

data = Files.readString(Paths.get(url.toURI()), StandardCharsets.UTF_8);

With Files.readString method to read the whole file in one shot.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Start Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="GetText"&gt;Get text&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is the home page. It contains a link to call the GetText servlet.

$ mvn jetty:run

We run the Jetty server.

$ curl -I localhost:8080/app/GetText
HTTP/1.1 200 OK
Date: Mon, 19 Sep 2022 10:53:27 GMT
Content-Type: text/plain;charset=utf-8
Content-Length: 223
Server: Jetty(11.0.11)

We fetch the header of the response with the curl command. From the
server output we can see that the content type is text.

$ curl localhost:8080/app/GetText
The Battle of Thermopylae was fought between an alliance of Greek city-states,
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the
course of three days, during the second Persian invasion of Greece.

We retrieve the text.

In this article we have sent text data from a Java servlet.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java Servlet tutorials](/all/#servlets).