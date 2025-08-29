+++
title = "Embedded Tomcat"
date = 2025-08-29T20:15:47.726+01:00
draft = false
description = "In this tutorial, we show how work with embedded Tomcat server. Tomcat can be run in embedded mode; it means that it is not necessary to build a WAR file and deploy it in a standalone Tomcat server."
image = "images/project_structure.png"
imageBig = "images/project_structure.png"
categories = ["web"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Embedded Tomcat

last modified January 10, 2023

In this tutorial, we show how work with embedded Tomcat server.
Tomcat can be run in embedded mode; it means that it is not necessary to build 
a WAR file and deploy it in a standalone Tomcat server. The examples in this
tutorial are built with Maven.

## Tomcat

Apache Tomcat is an open source implementation of the Java Servlet, JavaServer Pages, 
Java Expression Language and Java WebSocket technologies. 

Apache Maven is a software project management and comprehension tool. 
The project is described in an XML file called pom.xml. It contains
project dependencies on other external modules and components, the build order, directories, 
and required plug-ins.

## Creating a servlet

In the following example, we create a command line Java application with embedded
Tomcat server. The application attaches a simple servlet.

![project_structure.png](images/project_structure.png)

Figure: Project structure

The figure shows the project structure in NetBeans. Notice that we use a Java Maven
console application, not a Maven web application.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
         
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;EmbeddedTomcatEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
        &lt;tomcat.version&gt;9.0.0.M6&lt;/tomcat.version&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;3.1.0&lt;/version&gt;
        &lt;/dependency&gt;         
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.tomcat.embed&lt;/groupId&gt;
            &lt;artifactId&gt;tomcat-embed-core&lt;/artifactId&gt;
            &lt;version&gt;${tomcat.version}&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.tomcat.embed&lt;/groupId&gt;
            &lt;artifactId&gt;tomcat-embed-logging-juli&lt;/artifactId&gt;
            &lt;version&gt;${tomcat.version}&lt;/version&gt;
        &lt;/dependency&gt;
        
       
    &lt;/dependencies&gt;    
    
    &lt;build&gt;    
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
                &lt;artifactId&gt;appassembler-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;1.1.1&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;assembleDirectory&gt;target&lt;/assembleDirectory&gt;
                    &lt;programs&gt;
                        &lt;program&gt;
                            &lt;mainClass&gt;com.zetcode.embedded.EmbeddedTomcatEx&lt;/mainClass&gt;
                            &lt;name&gt;webapp&lt;/name&gt;
                        &lt;/program&gt;
                    &lt;/programs&gt;
                &lt;/configuration&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;phase&gt;package&lt;/phase&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;assemble&lt;/goal&gt;
                        &lt;/goals&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;    
    &lt;/build&gt;
    
&lt;/project&gt;

The Maven pom.xml contains dependencies for the embedded Tomcat server
and the assembler plugin, which builds the application. Dependencies for JSP container
are not included in this application, since we only have a servlet.

EmbeddedTomcatEx.java
  

package com.zetcode.embedded;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.io.Writer;
import org.apache.catalina.Context;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

public class EmbeddedTomcatEx {

    public static void main(String[] args) throws LifecycleException,
            InterruptedException, ServletException {

        Tomcat tomcat = new Tomcat();
        tomcat.setPort(8082);

        Context ctx = tomcat.addContext("/", new File(".").getAbsolutePath());

        Tomcat.addServlet(ctx, "Embedded", new HttpServlet() {
            @Override
            protected void service(HttpServletRequest req, HttpServletResponse resp) 
                    throws ServletException, IOException {
                
                Writer w = resp.getWriter();
                w.write("Embedded Tomcat servlet.\n");
                w.flush();
                w.close();
            }
        });

        ctx.addServletMapping("/*", "Embedded");

        tomcat.start();
        tomcat.getServer().await();
    }
}

The EmbeddedTomcatEx is a Java console application, which includes
an embedded Tomcat server.

Tomcat tomcat = new Tomcat();
tomcat.setPort(8082);

Tomcat is started on port 8082. The default port is 8080; NetBeans uses 
8084 for its built-in Tomcat server. We chose another port so that there is
not collision.

Context ctx = tomcat.addContext("/", new File(".").getAbsolutePath());

Each application is mapped to a context. With the addContext method,
we create an application that does not support JSP files and has no web.xml
file. We use a root context path and a current working directory for the document base.

Tomcat.addServlet(ctx, "Embedded", new HttpServlet() {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        
        Writer w = resp.getWriter();
        w.write("Embedded Tomcat servlet.\n");
        w.flush();
        w.close();
    }
});

A new servlet is added with the addServlet method. The servlet simply
responds with some ASCII text.

ctx.addServletMapping("/*", "Embedded");

The servlet mappping controls how the servlet, named Embedded, is accessed. For our example,
any URLs end up calling our servlet.

tomcat.start();
tomcat.getServer().await();

Tomcat server is started.

$ curl localhost:8082/
Embedded Tomcat servlet.

We run the application and test it with the curl tool.

## JSP file

In the second example, we use embedded Tomcat server to serve a JSP file.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;EmbeddedTomcatEx2&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
        &lt;tomcat.version&gt;9.0.0.M6&lt;/tomcat.version&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;3.1.0&lt;/version&gt;
        &lt;/dependency&gt;         
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.tomcat.embed&lt;/groupId&gt;
            &lt;artifactId&gt;tomcat-embed-core&lt;/artifactId&gt;
            &lt;version&gt;${tomcat.version}&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.tomcat.embed&lt;/groupId&gt;
            &lt;artifactId&gt;tomcat-embed-logging-juli&lt;/artifactId&gt;
            &lt;version&gt;${tomcat.version}&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.tomcat&lt;/groupId&gt;
            &lt;artifactId&gt;tomcat-jasper&lt;/artifactId&gt;
            &lt;version&gt;${tomcat.version}&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.tomcat&lt;/groupId&gt;
            &lt;artifactId&gt;tomcat-jasper-el&lt;/artifactId&gt;
            &lt;version&gt;${tomcat.version}&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.tomcat&lt;/groupId&gt;
            &lt;artifactId&gt;tomcat-jsp-api&lt;/artifactId&gt;
            &lt;version&gt;${tomcat.version}&lt;/version&gt;
        &lt;/dependency&gt;        
        
    &lt;/dependencies&gt;    
    
    &lt;build&gt;
    
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
                &lt;artifactId&gt;appassembler-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;1.1.1&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;assembleDirectory&gt;target&lt;/assembleDirectory&gt;
                    &lt;programs&gt;
                        &lt;program&gt;
                            &lt;mainClass&gt;com.zetcode.embedded.EmbeddedTomcatEx2&lt;/mainClass&gt;
                            &lt;name&gt;webapp&lt;/name&gt;
                        &lt;/program&gt;
                    &lt;/programs&gt;
                &lt;/configuration&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;phase&gt;package&lt;/phase&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;assemble&lt;/goal&gt;
                        &lt;/goals&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;    
    &lt;/build&gt;
    &lt;name&gt;EmbeddedTomcatEx2&lt;/name&gt;
&lt;/project&gt;

In this pom.xml file, we also include dependencies for 
embedded Tomcat JSP container: tomcat-jasper, tomcat-jasper-el,  
and tomcat-jsp-api.

index.jsp
  

&lt;%@page contentType="text/html" pageEncoding="UTF-8"%&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;JSP file&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            This is a simple JSP file.            
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

This is a simple JSP file to be served by embedded Tomcat server.

EmbeddedTomcatEx2.java
  

package com.zetcode.embedded;

import javax.servlet.ServletException;
import java.io.File;
import org.apache.catalina.LifecycleException;
import org.apache.catalina.startup.Tomcat;

public class EmbeddedTomcatEx2 {

    public static void main(String[] args) throws LifecycleException,
            InterruptedException, ServletException {

        String docBase = "src/main/webapp/";
        
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(8082);

        tomcat.addWebapp("/", new File(docBase).getAbsolutePath());

        tomcat.start();
        tomcat.getServer().await();
    }
}

The application serves a JSP file. The file is located in the src/main/webapp
subdirectory.

tomcat.addWebapp("/", new File(docBase).getAbsolutePath());

This time we use the addWebapp to add our application
to the Tomcat server.

$ curl localhost:8082/

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;JSP file&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;p&gt;
            This is a simple JSP file.            
        &lt;/p&gt;
    &lt;/body&gt;
&lt;/html&gt;

We get this when we access the application.

This was the Embedded Tomcat tutorial. With the embedded Tomcat, we served a servlet and
a JSP file. We have used Apache Tomcat, Maven, and NetBeans. You might also want to check some 
related tutorials: [Jersey application with embedded Jetty](/articles/jerseyembeddedjetty/), 
[Jetty tutorial](/java/jetty/), [Java tutorial](/lang/java/), or [SQL Query tag utorial](/java/sqlquerytag/).