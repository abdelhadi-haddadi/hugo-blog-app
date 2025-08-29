+++
title = "Java servlet Log4j"
date = 2025-08-27T23:20:48.168+01:00
draft = false
description = "Java servlet Log4j tutorial shows how to do logging with Log4j in Java servlets."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java servlet Log4j

last modified July 13, 2020 

Java servlet Log4j tutorial shows how to do logging with Log4j in Java servlets.
This tutorial covers Log4j version 2.

## Java Servlet

Servlet is a Java class which responds to a particular type of 
network request - most commonly an HTTP request. Java servlets are used to
create web applications. They run in servlet containers such as Tomcat or Jetty. 
Modern-day Java web development uses frameworks that are built on top of servlets.

## Log4j

Apache Log4j  is a Java-based logging utility. It is a project of the Apache Software Foundation.
Log4j can be configured through Java code or in a configuration file. Configuration files can be 
written in XML, JSON, YAML, or properties file format.

Log4j has three main components: loggers, appenders, and layouts. Loggers are named destinations that
capture capture log messages and send them to appenders. Appenders deliver log messages to their 
destinations, such as files or consoles. Layouts are used to define the formatting of log messages.

## Java servlet logging example

The following web application is doing logging with Log4j. In Servlet 3.0+ applications,
Log4j works out of the box. It automatically starts when the application deploys and shuts 
down when the application undeploys.

$ tree
.
├── pom.xml
└── src
    └── main
        ├── java
        │   └── com
        │       └── zetcode
        │           ├── service
        │           │   └── MyService.java
        │           └── web
        │               └── MyServlet.java
        ├── resources
        │   └── log4j2.xml
        └── webapp
            ├── index.html
            ├── META-INF
            │   └── context.xml
            └── WEB-INF

This is the project structure. The Log4j configuration file is 
placed in the src/main/resources/ directory.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JavaServletLog4j&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;name&gt;JavaServletLog4j&lt;/name&gt;

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
            &lt;groupId&gt;org.apache.logging.log4j&lt;/groupId&gt;
            &lt;artifactId&gt;log4j-web&lt;/artifactId&gt;
            &lt;version&gt;2.8.2&lt;/version&gt;
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

This is the Maven POM file. We have two artifacts: javax.servlet-api 
for servlets and log4j-web for logging with Log4j in web applications. 
The maven-war-plugin is responsible for collecting all artifact dependencies, 
classes and resources of the web application and packaging them into a web application archive (WAR).

context.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Context path="/JavaServletLog4j"/&gt;

In the Tomcat context.xml file, we define the context path. It
is the name of the web application.

log4j2.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;Configuration status="info"&gt;

  &lt;Properties&gt;
    &lt;Property name="logdir"&gt;/home/janbodnar/tmp&lt;/Property&gt;
    &lt;Property name="layout"&gt;%d [%t] %-5p %c- %m%n&lt;/Property&gt;
  &lt;/Properties&gt;
  
  &lt;Appenders&gt;

    &lt;RollingFile name="LOCALHOST"
        fileName="${logdir}/localhost.log"
        filePattern="${logdir}/localhost.%d{yyyy-MM-dd}-%i.log"&gt;
      &lt;PatternLayout pattern="${layout}"/&gt;
      &lt;Policies&gt;
        &lt;TimeBasedTriggeringPolicy /&gt;
        &lt;SizeBasedTriggeringPolicy size="1 MB" /&gt;
      &lt;/Policies&gt;
      &lt;DefaultRolloverStrategy max="10" /&gt;
    &lt;/RollingFile&gt;

  &lt;/Appenders&gt;
  
  &lt;Loggers&gt;

    &lt;Logger name="com.zetcode"
        level="info" additivity="false"&gt;
      &lt;AppenderRef ref="LOCALHOST" /&gt;
    &lt;/Logger&gt;
    
    &lt;Root level="error"&gt;
    &lt;/Root&gt;    

  &lt;/Loggers&gt;
&lt;/Configuration&gt;

Log4j is configured in the log4j2.xml. In our example, we have chosen
the XML file format.

&lt;Properties&gt;
  &lt;Property name="logdir"&gt;/home/janbodnar/tmp&lt;/Property&gt;
  &lt;Property name="layout"&gt;%d [%t] %-5p %c - %m%n&lt;/Property&gt;
&lt;/Properties&gt;

In the Properties tag, we set the logging directory and layout. 
The layouts define the format of the log. 

The pattern layout consists of conversion
specifiers. Each specifier starts with a percent sign and is followed by optional format
modifier and mandatory conversion character. The %d outputs the date of the logging event.
The %t outputs the name of the thread that generated the logging event.
The %-5p outputs the level of the logging event, where the level name has
minimum of five characters and the characters are left justified. The %c outputs the name of the 
logger that published the logging event. The %m prints the application message associated 
with the logging event and the %n is the platform dependent line separator character 
or characters.

&lt;Appenders&gt;
...
&lt;/Appenders&gt;

Appenders are objects which define where logging messages are saved. There are several
possible destinations including consoles, files, database tables, or sockects.

&lt;RollingFile name="LOCALHOST"
    fileName="${logdir}/localhost.log"
    filePattern="${logdir}/localhost.%d{yyyy-MM-dd}-%i.log"&gt;
  &lt;PatternLayout pattern="${layout}" /&gt;
...
  &lt;DefaultRolloverStrategy max="10" /&gt;
&lt;/RollingFile&gt;

We set the location of the log file. We use a rolling file appender, 
which automatically rolls or archives the current log file and resumes logging in 
a new file. The PatternLayout sets the layout of the log messages.
The DefaultRolloverStrategy deletes older archives if the number of
archives reaches ten.

&lt;Policies&gt;
  &lt;TimeBasedTriggeringPolicy /&gt;
  &lt;SizeBasedTriggeringPolicy size="1 MB" /&gt;
&lt;/Policies&gt;

The triggering policies are defined in the Policies tag.
They control the conditions under which rollovers occur. Here we use two
policies: TimeBasedTriggeringPolicy and SizeBasedTriggeringPolicy.
The TimeBasedTriggeringPolicy starts a rollover according to the most
specific date and time pattern; in our case, every hour. The SizeBasedTriggeringPolicy 
starts a rollover if the size of the log file reaches 1 MB.

&lt;Loggers&gt;

  &lt;Logger name="com.zetcode"
      level="info" additivity="false"&gt;
    &lt;AppenderRef ref="LOCALHOST" /&gt;
  &lt;/Logger&gt;
    
  &lt;Root level="error"&gt;
  &lt;/Root&gt;    

&lt;/Loggers&gt;

In the Loggers tag we define loggers. They are named log message destinations. 
Each logger can have different level of logging configured. We define a logger with info
logging level. We append the rolling file appender that we have previously defined to this
logger. With additivity set to false, the log messages are not propagated
to their ancestors.

com/zetcode/MyServlet.java
  

package com.zetcode.web;

import com.zetcode.service.MyService;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@WebServlet(name = "MyServlet", urlPatterns = {"/MyServlet"})
public class MyServlet extends HttpServlet {

    final static Logger logger = LogManager.getLogger(MyService.class);

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        logger.info("MyServlet's doGet() called");

        MyService service = new MyService();
        service.doWork();

        response.setContentType("text/plain;charset=UTF-8");

        PrintWriter out = response.getWriter();
        out.print("MyServlet called");
    }
}

This is the MyServlet servlet. It calls a service method and sends text data
back to the client. 

final static Logger logger = LogManager.getLogger(MyService.class);

We get the logger from the LogManager.

logger.info("MyServlet's doGet() called");

We log an information level message.

MyService service = new MyService();
service.doWork();

We call a dummy service method.

PrintWriter out = response.getWriter();
out.print("MyServlet called");

We send text data to the client.

com/zetcode/MyService.java
  

package com.zetcode.service;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class MyService {
    
    final static Logger logger = LogManager.getLogger(MyService.class);
    
    public void doWork() {
    
        logger.info("MyService's doWork() called");
    }
}

The MyService's doWork method logs an information level 
message.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;Home Page&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;a href="MyServlet"&gt;Call Servlet&lt;/a&gt;
    &lt;/body&gt;
&lt;/html&gt;

The home page contains a link which calls MyServlet.

$ cat localhost.log 
2017-11-14 16:50:30,157 [http-nio-8084-exec-5] INFO  com.zetcode.service.MyService- MyServlet's doGet() called
2017-11-14 16:50:31,044 [http-nio-8084-exec-5] INFO  com.zetcode.service.MyService- MyService's doWork() called

This is a sample output of logged messages.

In this tutorial, we have done some logging with Log4j in a Java web application.