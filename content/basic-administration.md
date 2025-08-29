+++
title = "Basic administration"
date = 2025-08-29T19:59:36.736+01:00
draft = false
description = "In this chapter of the Jetty tutorial, we do some basic administration of Jetty."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../introduction/)
[Next](../embedded/)

# Basic administration

last modified January 27, 2024

 

This part of the Jetty tutorial covers basic administration and configuration
of Jetty.

First, we need to have set the basic Jetty environment variables.
The environment variables are set in the system-wide /etc/environment&gt;
file or user's .profile or .bashrc (for Bash shell) files.

$ echo $JETTY_HOME
/home/janbodnar/bin/jetty
$ echo $JETTY_BASE
/home/janbodnar/prog/jetty/my-base

We can now refer to Jetty home and Jetty base using these two variables in our
commands.

## Jetty base

Jetty base is our customised Jetty environment, where we place our own
configuration files, logs, and where we have the deployment directory. The
deployment directory's default name is webapps.

To create a Jetty base, we create a new directory and enable necessary
modules with the start.jar command. Jetty is then started
from this directory. Alternatively, we specify jetty.base property
as a command line option.

$ cd $JETTY_BASE
$ java -jar $JETTY_HOME/start.jar

These two commands start Jetty from the Jetty base directory.
Jetty automatically loads configuration files located in the
directory—the start.ini file, and optionally, files 
located in resources, modules, and 
etc subdirectories.

$ java -jar $JETTY_HOME/start.jar jetty.base=$JETTY_BASE

If we are not located in the Jetty base directory, we can
enable Jetty base environment by specifying the jetty.base
command line option.

## The start.jar command

The start.jar tool, located in Jetty home, is used to start
Jetty, provide information, and perform some configuration settings.

$ java -jar $JETTY_HOME/start.jar --help

The --help option prints the current list of command line options 
and some basic usage help.

$ ls -l $JETTY_BASE
total 0
$ cd $JETTY_BASE
$ java -jar $JETTY_HOME/start.jar --add-to-start=deploy,http
INFO: deploy          initialised in ${jetty.base}/start.ini (appended)
MKDIR: ${jetty.base}/webapps
INFO: webapp          initialised transitively
INFO: servlet         initialised transitively
INFO: security        initialised transitively
INFO: server          initialised transitively
INFO: http            initialised in ${jetty.base}/start.ini (appended)
INFO: server          initialised transitively
$ ls
start.ini  webapps

Jetty is a highly modular system. The --add-to-start option enables 
Jetty modules by appending them to the ${jetty.base}/start.ini file.
The command enabled the deploy and HTTP modules, and also modules on which they
depend. The command also created the start.ini file and the
*webapps* deployment directory. The start.ini file is loaded by 
Jetty at startup time.

$ java -jar $JETTY_HOME/start.jar --list-modules
...
Jetty Active Module Tree:
-------------------------
 + Module: server [enabled]
   + Module: http [enabled]
   + Module: security [enabled]
   + Module: servlet [enabled]
     + Module: webapp [enabled]
       + Module: deploy [enabled]
...

Here we see a partial output of the --list-modules option.
It lists all available Jetty modules—active and inactive. 

$ java -jar $JETTY_HOME/start.jar --list-config
...
Jetty Active XMLs:
------------------
 ${jetty.home}/etc/jetty.xml
 ${jetty.home}/etc/jetty-http.xml
 ${jetty.home}/etc/jetty-deploy.xml

The --list-config option lists configuration settings
including Java and Jetty environments, JVM arguments, properties, 
Server classpath, and XML configuration files. The partial output shows
active XML configuration files loaded by Jetty. 

## The deployment directory

The deployment directory is a directory where we deploy our WAR
files. The default name of the directory is *webapps*. 
The directory is located in Jetty home and Jetty base directories.

...
&lt;Set name="monitoredDirName"&gt;&lt;Property name="jetty.base" default="." /&gt;/
&lt;Property name="jetty.deploy.monitoredDirName" default="webapps"/&gt;&lt;/Set&gt;
...

The default deployment directory's name is specified in the 
$JETTY_HOME/etc/jetty-deploy.xml file. 

$ java -jar $JETTY_HOME/start.jar jetty.deploy.monitoredDirName=webapps2

We can set the property value on the command line.

$ cat start.ini 
#
# Initialize module deploy
#
--module=deploy
## DeployManager configuration
# Monitored Directory name (relative to jetty.base)
jetty.deploy.monitoredDirName=webapps3

Another possibility is to set the deployment directory name 
inside the start.ini file's deploy module section.

$ cat myjetty.properties 
jetty.deploy.monitoredDirName=webapps4
$ java -jar $JETTY_HOME/start.jar myjetty.properties 

The deployment directory can be set in a properties file, which 
is passed to the start.jar tool.

We have shown four places where the deployment directory can be set. 
If there is a conflict, the value is taken from the option with
the highest order. The order is the following: (a) the Java property file;
(b) the command line option; (c) the Jetty base start.ini 
file; and (d) the jetty-deploy.xml file located in Java 
home's etc directory.

## Jetty XML files

Jetty can be configured with XML configuration files. The jetty.xml
is a default Jetty configuration file. It configures the server class, the ThreadPool,
the connectors, the handler structure, the deployment manager, the login
service, and the request log. The jetty-web.xml is a Jetty configuration 
file that can be bundled with a specific web application. The jetty-env.xml 
is an optional Jetty configuration file that arranges JNDI resources for an individual web
application. The webdefault.xml configuration file is applied to a web 
application before its own web.xml file. It is used to save a web application from 
having to define a lot of house-keeping and container-specific elements in their 
own web.xml files. The override-web.xml is a web application configuration file
that is applied after the application's own web.xml file.

## Application context

A *context path* is a part of a URL path that is used to select 
the web application to which an incoming request is routed. The context
path can be set with a method call (in embedded Jetty), derived from 
the name of the WAR file, specified in the deployer XML file or in
the jetty-web.xml. The next example will use the jetty-web.xml
file to set the application's context path. The file is located inside
the WEB-INF directory.

$ tree
.
├── build.xml
└── src
    ├── com
    │   └── zetcode
    └── web
        ├── index.html
        └── WEB-INF
            └── jetty-web.xml

5 directories, 3 files

We list the directory structure of the project.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt; 
&lt;body&gt;

Simple page.

&lt;/body&gt; 
&lt;/html&gt;

This is a simple HTML file. 

jetty-web.xml
  

&lt;?xml version="1.0"  encoding="ISO-8859-1"?&gt;
&lt;!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" 
    "http://www.eclipse.org/jetty/configure.dtd"&gt;
 
&lt;Configure class="org.eclipse.jetty.webapp.WebAppContext"&gt;
  &lt;Set name="contextPath"&gt;/myapp&lt;/Set&gt;  
  &lt;Get class="org.eclipse.jetty.util.log.Log" name="rootLogger"&gt;
    &lt;Call name="warn"&gt;&lt;Arg&gt;Web application is deployed&lt;/Arg&gt;&lt;/Call&gt;
  &lt;/Get&gt;    
&lt;/Configure&gt;

In the jetty-web.xml file, we set the context to /myapp. 
We also log a message upon deployment.

build.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="AppContext" default="archive"&gt;
    
    &lt;property name="name" value="appcontext"/&gt;
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

This is Ant build file.

&lt;property environment="env"/&gt;

The environment atttribute sets the prefix to use OS environment
variables.

&lt;property name="deploy.path" location="${env.JETTY_BASE}/webapps"/&gt;

We use the JETTY_BASE environment variable to define the
deployment path.

$ curl localhost:8080/myapp/
&lt;!DOCTYPE html&gt;
&lt;html&gt; 
&lt;body&gt;
Simple page.
&lt;/body&gt; 
&lt;/html&gt;

We connect to the web application using the selected context path.
If we have not specified the context file explicitly, it would be
derived from the WAR file name, which is given in the third line
of the build.xml file.

## Deployment descriptor

Deployment descriptors are XML files used to deploy web applications.
The name of the XML file must match the name of the WAR file. If
both WAR file and XML file are present in the deployment directory, 
the XML file is used for the deployment. 

We use the previous example code.

appcontext.xml
  

&lt;?xml version="1.0"  encoding="ISO-8859-1"?&gt;
&lt;!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" 
    "http://www.eclipse.org/jetty/configure_9_0.dtd"&gt;

&lt;Configure class="org.eclipse.jetty.webapp.WebAppContext"&gt;
  &lt;Set name="contextPath"&gt;/myapp2&lt;/Set&gt;
  &lt;Set name="war"&gt;/home/janbodnar/prog/jetty/appcontext/dist/appcontext.war&lt;/Set&gt;
&lt;/Configure&gt;

Inside the deployment descriptor, we set the context path and specify the
WAR file using an absolute location path.

jetty-web.xml
  

&lt;?xml version="1.0"  encoding="ISO-8859-1"?&gt;
&lt;!DOCTYPE Configure PUBLIC "-//Jetty//Configure//EN" 
    "http://www.eclipse.org/jetty/configure.dtd"&gt;
 
&lt;Configure class="org.eclipse.jetty.webapp.WebAppContext"&gt;
&lt;!--   &lt;Set name="contextPath"&gt;/myapp&lt;/Set&gt;   --&gt;
  &lt;Get class="org.eclipse.jetty.util.log.Log" name="rootLogger"&gt;
    &lt;Call name="warn"&gt;&lt;Arg&gt;Web application is deployed&lt;/Arg&gt;&lt;/Call&gt;
  &lt;/Get&gt;    
&lt;/Configure&gt;

The jetty-web.xml is called after all other configuration has been applied to 
the web application. Therefore, we comment the line specifying the context path.

$ curl localhost:8080/myapp2/
&lt;!DOCTYPE html&gt;
&lt;html&gt; 
&lt;body&gt;
Simple page.
&lt;/body&gt; 
&lt;/html&gt;

The modified context path works.

In this chapter, we have showed some basic administration of the Jetty server.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).

[Contents](..)
[Previous](../introduction/)
[Next](../embedded/)