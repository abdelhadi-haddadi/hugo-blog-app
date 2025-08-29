+++
title = "Java resources"
date = 2025-08-29T20:00:27.828+01:00
draft = false
description = "Java resources tutorial shows how to read resource files in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java resources

last modified January 27, 2024

 

In this article we show how to read resource files in Java.

## Resource

A resource is data, such as images, audio, text, that a program needs to 
access in a way that is independent of the location of the program code.

## RequestDispatcher methods

RequestDispatcher has two methods:

- forward — forwards a request from a servlet to another resource

- include — includes the content of a resource in the response

The difference between the two methods is that the forward method will close 
the output stream after it has been invoked, whereas the include method 
leaves the output stream open. The include method takes the content from 
another resource and includes it in the servlet. The forward method sends
the request to another resource.

## Getting RequestDispatcher

RequestDispatcher can be obtained from a request object or from a servlet
context.

RequestDispatcher dispatcher = request.getRequestDispatcher("greet.jsp");
dispatcher.forward(request, response);

We can get the RequestDispatcher from the request object with the
getRequestDispatcher method.

RequestDispatcher dispatcher = getServletContext().getRequestDispatcher("/greet.jsp");
dispatcher.forward(request, response);

Here we get the RequestDispatcher from the servlet context. In this case, 
the path must begin with a slash character.

## Java RequestDispatcher Forward to JSP

The following example sends a request from the client to a JSP page.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Start Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;form action="MyServlet"&gt;

            &lt;label&gt;Enter your name:
                &lt;input type="text" name="name"&gt;
            &lt;/label&gt;
            
            &lt;button type="submit"&gt;Submit&lt;/button&gt;

        &lt;/form&gt;
    &lt;/body&gt;
&lt;/html&gt;

In the home page we have a simple form: it takes a value from 
the user and sends it as a request parameter to MyServlet.

MyServlet.java
  

package com.zetcode.web;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");

        request.getRequestDispatcher("greet.jsp").forward(request, response);
    }
}

In the MyServlet, we forward to the greet.jsp page
using the RequestDispatcher.

greet.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset="UTF-8"&gt;
        &lt;title&gt;JSP Page&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;Hello ${param.name}!&lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

In the greet.jsp page, we display the name parameter,
which was set by the user in the form.

## Java RequestDispatcher Forward to Servlet

The following example sends a request from the client to a servlet, which 
forwards the processing to another servlet.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Start Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;a href="MyServlet"&gt;Call servlet&lt;/a&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

The home page contains a link that calls MyServlet.

MyServlet.java
  

package com.zetcode.web;

import java.io.IOException;
import java.time.Instant;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html;charset=UTF-8");

        request.setAttribute("now", Instant.now());
        
        request.getRequestDispatcher("AnotherServlet").forward(request, response);
    }
}

The request goes first to MyServlet.

request.setAttribute("now", Instant.now());

We set an attribute to the request; it is the current time instant.

request.getRequestDispatcher("AnotherServlet").forward(request, response);

The request, including the new attribute, is sent to AnotherServlet.

AnotherServlet.java
  

package com.zetcode.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "AnotherServlet", urlPatterns = {"/AnotherServlet"})
public class AnotherServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/plain;charset=UTF-8");

        PrintWriter out = response.getWriter();

        DateTimeFormatter formatter
                = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)
                        .withLocale(Locale.ENGLISH)
                        .withZone(ZoneId.of("UTC"));

        Instant now = (Instant) request.getAttribute("now");

        String output = formatter.format(now);
        out.println(output);
    }
}

AnotherServlet formats the instant object to a short English
datetime format and prints it into the output stream.

DateTimeFormatter formatter
        = DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)
                .withLocale(Locale.ENGLISH)
                .withZone(ZoneId.of("UTC"));

We format the datetime with DateTimeFormatter class.

Instant now = (Instant) request.getAttribute("now");

We retrieve the attribute from the request with the getAttribute
method.

String output = formatter.format(now);
out.println(output);

The instant is formatted and printed into the output.

## Java RequestDispatcher include

The next example includes output from another servlet into the calling
servlet.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Start Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            &lt;a href="MyServlet"&gt;Call servlet&lt;/a&gt;
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

The home page contains a link which calls MyServlet.

MyServlet.java
  

package com.zetcode.web;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/plain;charset=UTF-8");
        
        PrintWriter out = response.getWriter();
        out.println("Hello from MyServlet");
        
        request.getRequestDispatcher("AnotherServlet").include(request, response);
    }
}

MyServlet prints data to the output stream and forwards 
to AnotherServlet.

AnotherServlet.java
  

package com.zetcode.web;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "AnotherServlet", urlPatterns = {"/AnotherServlet"})
public class AnotherServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/plain;charset=UTF-8");
        
        PrintWriter out = response.getWriter();
        
        out.println("Hello from AnotherServlet");
    }
}

AnotherServlet also prints data to the output stream. In 
the end, we have both messages written to the output stream and sent
to the client.

## Source

[Resource](https://jakarta.ee/specifications/platform/9/apidocs/jakarta/faces/application/resource)

In this article we showe how to read resource files in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).