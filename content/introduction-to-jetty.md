+++
title = "Introduction to Jetty"
date = 2025-08-29T19:59:37.970+01:00
draft = false
description = "This is an introductory chapter to Jetty tutorial where we briefly describe Jetty."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../admin/)

# Introduction to Jetty

last modified January 27, 2024

 

This is an introductory Jetty tutorial. The purpose of this tutorial is to get
you started with Jetty. The tutorial has been created and tested on Linux. This
tutorial covers Jetty version 11.

## About Jetty

Jetty is an open source project providing an HTTP server, an HTTP client, and a
Java servlet container. The project is a part of the Eclipse Foundation. Jetty
is a mature project, which started in 1995. Jetty can be easily embedded in
devices, tools, frameworks, application servers, and clusters.

Jetty also supports additional Java technologies including:

    - SPDY

    - WebSockets

    - JNDI

    - JAAS

    - OSGi

    - AJP

    - JMX

## Installing Jetty

In this article we work on a local computer. Detailed instructions to install
Jetty on a remote server are provided in a separate chapter. First, we download
Jetty from the Eclipse's download
page to a directory of our choice.

$ unzip jetty-home-11.0.7.zip

We unpack the compressed file.

$ ls jetty-home-11.0.7
bin  etc  lib  LICENSE.txt  modules  NOTICE.txt  README.adoc  start.jar  VERSION.txt

We list the contents of the directory. The bin directory contains
utility scripts to help run Jetty on Unix systems. The lib
directory contains all JAR files necessary to run Jetty. The
modules directory has module definitions where a module is a
configuration file that includes all the libraries, dependencies, XML and
template INI files for a Jetty feature. The start.jar is used to
invoke Jetty.

$ export JETTY_HOME=/home/janbodnar/bin/jetty-home-11.0.7

A JETTY_HOME environment variable is created.

## Running Jetty

To run the Jetty server, we use the start.jar file.

$ java -jar $JETTY_HOME/start.jar --add-modules=server,http

We create start.d directory which contains the configuration of the
server.

$ java -jar $JETTY_HOME/start.jar

We run the server passing the start.jar file to the
java command. The start.jar builds a classpath and
executes a main java class with a classloader built from that classpath.  By
default the start.jar mechanism is configured to start the Jetty
server, but it can be configured to start any Java main class.

We can now navigate a browser at this server at
[http://localhost:8080](http://localhost:8080).

$ curl localhost:8080
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;title&gt;Error 404 - Not Found&lt;/title&gt;
&lt;meta charset="utf-8"&gt;
&lt;style&gt;body { font-family: sans-serif; } table, ...
&lt;/head&gt;
&lt;body&gt;
&lt;h2&gt;Error 404 - Not Found.&lt;/h2&gt;
...

We use a command line tool curl to do the HTTP request. The server
returns a 404 error—there is no application in the webapps
directory yet. 

## JETTY_HOME &amp; JETTY_BASE

Starting with Jetty 9.1, it is possible to maintain a separation between the
binary installation of the standalone Jetty called *Jetty home*, and the
customizations for a specific environment called *Jetty base*. Jetty home
is the location for the Jetty distribution binaries, default XML configurations,
and default module definitions. Jetty base is the location for configurations
and customizations to the Jetty distribution.

$ mkdir my-base
$ cd my-base/

We create a my-base directory which will be our Jetty base.

$ export JETTY_BASE=/home/janbodnar/prog/jetty/my-base

A JETTY_BASE environment variable is created. Jetty determines the
Jetty home and Jetty base locations either from environment variables or from
properties.

Three important items of a Jetty base are the start.d configuration
directory, the start.ini configuration file, and the
webapps directory. We use the start.jar to enable necessary modules
of Jetty. The --add-module option adds the given module to the list
of modules enabled at when Jetty starts.

$ java -jar $JETTY_HOME/start.jar --add-module=deploy

The start.ini file is created and the deploy module is added to it.
Also the webapps directory is created.

$ java -jar $JETTY_HOME/start.jar --add-module=http

The http module configuration named http.ini is created in the
start.d directory.

$ tree
.
├── resources
│&nbsp;&nbsp; └── jetty-logging.properties
├── start.d
│&nbsp;&nbsp; ├── deploy.ini
│&nbsp;&nbsp; ├── http.ini
│&nbsp;&nbsp; └── server.ini
└── webapps

3 directories, 4 files

At this moment we have this content in our Jetty base directory. Actually, we have
enabled more than two modules—modules may have dependent modules and
these were enabled as well. For instance, by enabling the http module
we have activated the server module as well.

$ java -jar $JETTY_HOME/start.jar --list-modules
...
Enabled Modules:
----------------
    0) resources       transitive provider of resources for logging-jetty
    1) logging/slf4j   transitive provider of logging/slf4j for logging-jetty
                       dynamic dependency of logging-jetty
    2) logging-jetty   transitive provider of logging for threadpool
                       transitive provider of logging for bytebufferpool
                       transitive provider of logging for server
    3) bytebufferpool  transitive provider of bytebufferpool for server
                       init template available with --add-module=bytebufferpool
    4) threadpool      transitive provider of threadpool for server
                       init template available with --add-module=threadpool
    5) server          ${jetty.base}/start.d/server.ini
    6) security        transitive provider of security for webapp
    7) servlet         transitive provider of servlet for webapp
    8) webapp          transitive provider of webapp for deploy
                       init template available with --add-module=webapp
    9) deploy          ${jetty.base}/start.d/deploy.ini
   10) http            ${jetty.base}/start.d/http.ini

The --list-modules option list all modules, both active and
inactive. At the end of the output we have a tree of active modules.

$ pwd
/home/janbodnar/prog/jetty/my-base
$ java -jar $JETTY_HOME/start.jar

It is recommended to sit in the Jetty base directory and to start the server by
referencing the start.jar remotely.

## First web application

We create and deploy our first web application with Jetty. The application
will display a simple JSP page. We create a Jetty base from scratch to enable
running JSP pages.

$ cd $JETTY_BASE
$ java -jar $JETTY_HOME/start.jar --add-to-start=http,deploy,jsp,jstl,annotations

These modules are needed for web application having JSP pages.

$ java -jar $JETTY_HOME/start.jar

The server is started.

Now we are going to create a simple web application.

$ cd ..
$ mkdir first
$ cd first
$ mkdir -p src/web/WEB-INF
$ touch src/web/index.jsp
$ touch build.xml

We create a welcome index.jsp page and the ANT build.xml file.

index.jsp
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
&lt;p&gt;
   Today's date: &lt;%= (new java.util.Date()).toLocaleString()%&gt;
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

The index.jsp page prints the current date in the localized form.

build.xml
  

&lt;?xml version="1.0"?&gt;

&lt;project name="First" default="archive"&gt;

    &lt;property name="name" value="first"/&gt;
    &lt;property name="dist.dir" location="dist"/&gt;
    &lt;property name="web.dir" location="src/web"/&gt;
    &lt;property name="jetty.base" location="/home/janbodnar/prog/jetty/my-base"/&gt;
    &lt;property name="deploy.path" location="${jetty.base}/webapps"/&gt;

    &lt;target name="init"&gt;
        &lt;mkdir dir="${dist.dir}"/&gt;
    &lt;/target&gt;

    &lt;target name="archive" depends="init"&gt;
        &lt;war destfile="${dist.dir}/${name}.war" needxmlfile="false"&gt;
            &lt;fileset dir="${web.dir}"/&gt;
        &lt;/war&gt;
        &lt;echo&gt;Archive created&lt;/echo&gt;
    &lt;/target&gt;

    &lt;target name="deploy" depends="archive"&gt;
        &lt;copy file="${dist.dir}/${name}.war" overwrite="true"
              todir="${deploy.path}"/&gt;
        &lt;echo&gt;Archive deployed&lt;/echo&gt;
    &lt;/target&gt;

    &lt;target name="clean" depends="init"&gt;
        &lt;delete dir="${dist.dir}"/&gt;
        &lt;echo&gt;Cleaning completed&lt;/echo&gt;
    &lt;/target&gt;

&lt;/project&gt;

This Ant build file has targets to create a build directory and distribution directory
and to clean (delete) them.
It creates a web archive (a WAR file) containing a single index.jsp file.
The deploy target deploys the WAR file to the webapps directory of the Jetty base.

$ ant deploy
Buildfile: /home/janbodnar/prog/jetty/first/build.xml
init:
archive:
     [echo] Archive created
deploy:
     [copy] Copying 1 file to /home/janbodnar/prog/jetty/my-base/webapps
     [echo] Archive deployed
BUILD SUCCESSFUL
Total time: 0 seconds

We run Ant with the deploy task. A web archive is created and deployed.

$ curl localhost:8080/first/
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;body&gt;
&lt;p&gt;
   Today's date: Sep 16, 2014 10:43:45 AM
&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;

The web application's context is detemined from the name of the archive
file: first.war. The application successfully returns the current date.

We have enabled a JSP module for our Jetty base but we have not explicitly configured the
usage of JSP pages. (For instance in the web.xml file.) A default configuration
is included by enabling the deploy module.

$ java -jar $JETTY_HOME/start.jar --list-config
...
Jetty Active XMLs:
------------------
 ${jetty.home}/etc/jetty.xml
 ${jetty.home}/etc/jetty-http.xml
 ${jetty.home}/etc/jetty-deploy.xml
 ${jetty.home}/etc/jetty-plus.xml
 ${jetty.home}/etc/jetty-annotations.xml

The --list-config option lists the configuration that will be used
to start Jetty. At the end of the output, we have XML files
that are loaded by the server. For each module an XML file is
loaded. The jetty-deploy.xml is one of them.

&lt;Set name="defaultsDescriptor"&gt;&lt;Property name="jetty.home"
    default="." /&gt;/etc/webdefault.xml&lt;/Set&gt;

The jetty-deploy.xml has this line that loads the webdefault.xml
configuration file, which contains the configuration of JSP pages.

&lt;servlet id="jsp"&gt;
  &lt;servlet-name&gt;jsp&lt;/servlet-name&gt;
  &lt;servlet-class&gt;org.apache.jasper.servlet.JspServlet&lt;/servlet-class&gt;
...
&lt;/servlet&gt;

This is an excerpt from the webdefault.xml file configuring
the support of JSP pages.

## Sources

Jetty's official [reference](http://www.eclipse.org/jetty/documentation/current/)
guide was used to create this tutorial.

This chapter was an introduction to Jetty.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).

[Contents](..)
[Next](../admin/)