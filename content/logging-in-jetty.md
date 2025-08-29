+++
title = "Logging in Jetty"
date = 2025-08-29T19:59:39.111+01:00
draft = false
description = "This chapter of the Jetty tutorial covers logging. We configure the built-in logging and show how to enable log4j library."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../servlets/)
[Next](../httpclient/)

# Logging in Jetty

last modified January 27, 2024

 

*Logging* is recording the activity of a program during its lifetime.
Logging is used for problem diagnosis, auditing, debugging, 
or information gathering.

There are several logging frameworks available in Java. If we do not
specify a logging framework, Jetty defaults to its built-in 
org.eclipse.jetty.util.log.StdErrLog implementation. 

## Default logging

In this section we show how to configure Jetty's standard logging.

$ java -jar $JETTY_HOME/start.jar
2014-09-12 12:06:25.699:INFO::main: Logging initialized @496ms
2014-09-12 12:06:25.973:INFO:oejs.Server:main: jetty-9.2.2.v20140723
2014-09-12 12:06:26.006:INFO:oejdp.ScanningAppProvider:main: Deployment monitor 
[file:/home/janbodnar/prog/jetty/my-base/webapps/] at interval 1
...

By default, Jetty prints messages to the console. The messages appear at the 
console where we started the server.

$ java -jar $JETTY_HOME/start.jar --add-to-start=logging
INFO: logging         initialised in ${jetty.base}/start.ini (appended)
MKDIR: ${jetty.base}/logs

To start configuring the logging facility, we need to enable Jetty's logging module.
The logs directory is created as well.

$ pwd
/home/janbodnar/prog/jetty/my-base
$ mkdir resources
$ cat resources/jetty-logging.properties 
org.eclipse.jetty.util.log.class=org.eclipse.jetty.util.log.StrErrLog
org.eclipse.jetty.LEVEL=INFO
jetty.logs=logs

Inside our Jetty base directory, we create the resources directory.
In the jetty-logging.properties file we configure the 
standard logging. The messages are directed to the logs
subdirectory.

$ java -jar $JETTY_HOME/start.jar
2014-09-12 17:05:41.535:INFO::main: Logging initialized @2575ms
2014-09-12 17:05:42.040:INFO::main: Redirecting stderr/stdout to 
    /home/janbodnar/prog/jetty/my-base/logs/2014_09_12.stderrout.log

Starting Jetty, we learn that logging is redirected to the logs
subdirectory.

$ ls -1 logs/
2014_09_12.stderrout.log
2014_09_12.stderrout.log.105458616
2014_09_12.stderrout.log.150542014

The log files are created in the logs subdirectory.

## Enabling log4j

Apache log4j is a popular logging library. Jetty supporst log4j
via Jetty via the Slf4j facade and the Slf4j 
binding layer for log4j.

The *Simple Logging Facade for Java (SLF4J)* serves as a simple facade or abstraction 
for various logging frameworks, such as java.util.logging, 
logback, and log4j. It allows to plug in the desired logging 
framework at deployment time.

$ cat resources/jetty-logging.properties 
org.eclipse.jetty.util.log.class=org.eclipse.jetty.util.log.Slf4jLog

In the jetty-logging.properties file, we choose the simple logging
facade for doing logging in Jetty.

$ mkdir -p lib/logging/
$ mv ~/Downloads/log4j-1.2.17.jar lib/logging/
$ mv ~/Downloads/slf4j-api-1.7.7.jar  lib/logging/
$ mv ~/Downloads/slf4j-log4j12-1.7.7.jar lib/logging/

The lib/logging directory is created. The necessary JAR files
are downloaded from a Maven repository and moved to the newly
created directory.

$ java -jar $JETTY_HOME/start.jar --list-modules
...
Jetty Active Module Tree:
-------------------------
 + Module: jsp-impl [enabled]
 + Module: jstl-impl [enabled]
 + Module: logging [enabled]
...

Remember that the logging module must be enabled for Jetty base.

MyLoggingServlet.java
  

package com.zetcode;

import org.apache.log4j.Logger;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;

@WebServlet(urlPatterns = "/mylogservlet")
public class MyLoggingServlet extends HttpServlet {

    static Logger log = Logger.getLogger(MyLoggingServlet.class.getName());

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
            
        response.setContentType("text/plain");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("MyLogginServlet called");
        log.info("MyLoggingServlet called");
    }
}

We create a simple Java servlet in which we do some basic logging.

static Logger log = Logger.getLogger(MyLoggingServlet.class.getName());

The Logger class is created.

log.info("MyLoggingServlet called");

A message having INFO level is written.

log4j.properties
  

log4j.rootLogger=INFO, filer
log4j.appender.filer=org.apache.log4j.FileAppender
log4j.appender.filer.layout=org.apache.log4j.PatternLayout
log4j.appender.filer.layout.ConversionPattern=[%d] %p %c - %m%n
log4j.appender.filer.File=${jetty.base}/logs/jetty.log
log4j.appender.filer.append=true

The log4j.properties is a configuration file for log4j. 
We place it inside the resources directory. Inside the configuration
file, we choose logging into a file with a specific logging pattern.
The log messages will contain the date, the log level, and the 
application message. 

build.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="MyLoggingServlet" default="compile"&gt;
    
    &lt;property name="name" value="mls"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="web.dir" value="${src.dir}/web"/&gt;
    &lt;property name="build.dir" location="${web.dir}/WEB-INF/classes"/&gt;
    &lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
    &lt;property name="log4j.lib.dir" location="${env.JETTY_BASE}/lib/logging"/&gt;
    &lt;property name="dist.dir" location="dist"/&gt;
    &lt;property name="deploy.path" location="${env.JETTY_BASE}/webapps"/&gt;
  
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${jetty.lib.dir}"/&gt;
        &lt;fileset dir="${log4j.lib.dir}"/&gt;
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
        &lt;war destfile="${dist.dir}/${name}.war" needxmlfile="false"&gt;
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

This is the Ant build file for our example.

$ ant deploy
$ curl localhost:8080/mls/mylogservlet
MyLogginServlet called

The web archive containing our servlet is built and deployed. 
The servlet is called.

$ tail -2 logs/jetty.log 
[2014-09-16 15:11:25,254] INFO org.eclipse.jetty.server.Server - Started @2719ms
[2014-09-16 15:11:42,214] INFO com.zetcode.MyLoggingServlet - MyLoggingServlet called

After building and running the example, we find out the logging message in
the log file.

## Request log

Requests are logged to provide useful statistics for website owners. Jetty has
NCSARequestLog class to save incoming request logs. The class can
use the NCSA common and NCSA extended log formats. (NCSA HTTPd was an early web 
server developed at National Center for Supercomputing Applications.)
These formats have items including client's IP address and user agent, time of 
request, status code, and HTTP method. They are understood by most 
web analysis software. 

The example shows how to enable request logging in Jetty.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;

Simple page.

&lt;/body&gt;
&lt;/html&gt;

Our application will display this simple web page.

build.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="RequestLog" default="archive"&gt;
    
    &lt;property name="name" value="relog"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="web.dir" value="${src.dir}/web"/&gt;
    &lt;property name="dist.dir" location="dist"/&gt;
    &lt;property name="deploy.path" location="${env.JETTY_BASE}/webapps"/&gt;
  
    &lt;target name="init"&gt;
        &lt;mkdir dir="${dist.dir}"/&gt;
    &lt;/target&gt;     
  
    &lt;target name="archive"&gt;
        &lt;war destfile="${dist.dir}/${name}.war" needxmlfile="false"&gt;
            &lt;fileset dir="${web.dir}"/&gt;
        &lt;/war&gt;
        &lt;echo&gt;Archive created&lt;/echo&gt;
    &lt;/target&gt; 
  
    &lt;target name="clean" depends="init"&gt;
        &lt;delete dir="${dist.dir}"/&gt;
        &lt;echo&gt;Cleaning completed&lt;/echo&gt;
    &lt;/target&gt;  
    
    &lt;target name="deploy" depends="archive"&gt;
        &lt;copy file="${dist.dir}/${name}.war" overwrite="true" 
            todir="${deploy.path}"/&gt;
        &lt;echo&gt;Archive deployed&lt;/echo&gt;
    &lt;/target&gt;    
    
&lt;/project&gt;

This is Ant build file for for the example code.

relog.xml
  

&lt;?xml version="1.0"  encoding="ISO-8859-1"?&gt;
&lt;!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" 
    "http://www.eclipse.org/jetty/configure_9_0.dtd"&gt;

&lt;Configure class="org.eclipse.jetty.webapp.WebAppContext"&gt;
  &lt;Set name="contextPath"&gt;/relog&lt;/Set&gt;
  &lt;Set name="war"&gt;/home/janbodnar/prog/jetty/logging2/dist/relog.war&lt;/Set&gt;
  &lt;Set name="handler"&gt;
    &lt;New id="RequestLog" 
            class="org.eclipse.jetty.server.handler.RequestLogHandler"&gt;
      &lt;Set name="requestLog"&gt;
        &lt;New id="RequestLogImpl" 
                class="org.eclipse.jetty.server.NCSARequestLog"&gt;
          &lt;Set name="filename"&gt;&lt;Property name="jetty.logs" 
                         default="./logs"/&gt;/access-yyyy_mm_dd.request.log&lt;/Set&gt;
          &lt;Set name="filenameDateFormat"&gt;yyyy_MM_dd&lt;/Set&gt;
          &lt;Set name="LogTimeZone"&gt;CET&lt;/Set&gt;
          &lt;Set name="retainDays"&gt;90&lt;/Set&gt;
          &lt;Set name="append"&gt;true&lt;/Set&gt;
          &lt;Set name="logLatency"&gt;true&lt;/Set&gt;
        &lt;/New&gt;
      &lt;/Set&gt;
    &lt;/New&gt;
  &lt;/Set&gt;
&lt;/Configure&gt;

This is XML configuration for our web application. The request log handler is 
enabled only for this web application. Each day a new log file is created. Log files 
are kept for 90 days before being deleted.

$ cp relog.xml $JETTY_BASE/webapps

The relog.xml file is copied to the webapps directory of 
the Jetty base. The file serves as the application deployer. 

$ curl localhost:8080/relog/
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
Simple page.
&lt;/body&gt;
&lt;/html&gt;

A request is made from a curl client. 

$ tail -1 logs/access-2014_09_13.request.log 
127.0.0.1 -  -  [13/Sep/2014:13:29:11 +0200] "GET /relog/ HTTP/1.1" 200 
    60 "-" "curl/7.35.0" 18

This is a sample of a request logged in the access log file.

In this chapter of the Jetty tutorial, we have done some basic logging. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).

[Contents](..)
[Previous](../servlets/)
[Next](../httpclient/)