+++
title = "Embedded Jetty"
date = 2025-08-29T19:59:36.719+01:00
draft = false
description = "This chapter of Jetty tutorial covers embedded Jetty."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../admin/)
[Next](../servlets/)

# Embedded Jetty

last modified January 27, 2024

 

Jetty can be run in embedded mode. It means that it is not necessary to build a WAR file
and deploy it in a standalone Jetty server. Jetty is a software component that can 
be instantiated and used just like any other POJO (Plain Old Java Object).

## Simple handler

A Handler is a component that deals with incoming requests.
The requests are processed in the handle method.
Handlers are passed the servlet API request and response object, but they are 
not servlets.

$ mkdir simplehandler
$ cd simplehandler/
$ mkdir -p src/com/zetcode
$ mkdir build
$ touch src/com/zetcode/SimpleHandlerEx.java

We create a new project directory and its structure.

SimpleHandlerEx.java

```
package com.zetcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;
 
public class SimpleHandlerEx extends AbstractHandler {
 
    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request, 
        HttpServletResponse response) throws IOException, ServletException {
        
        response.setContentType("text/plain;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        baseRequest.setHandled(true);
        response.getWriter().println("Hello there");
    }
 
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);
        server.setHandler(new SimpleHandlerEx());
        server.start();
        server.join();
    }
}

```

A server is started and a handler is set for incoming requests.

response.setContentType("text/plain;charset=utf-8");

Since we only output simple text, we set the text/plain media type.
An Internet media type is a standard identifier used on the Internet to 
indicate the type of data that a file contains. 

response.getWriter().println("Hello there");

As a response, we send a simple message. The getWriter method 
returns a PrintWriter object that sends character text to the client.

server.join();

The join method makes the server thread join with the current thread.
It is blocking until server is ready. The method also waits until the server
fully stops.

build.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="SimpleHandlerEx" default="compile"&gt;
    
    &lt;property name="name" value="simplehandler"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="build.dir" value="build"/&gt;
    &lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
    
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${jetty.lib.dir}"&gt; 
            &lt;include name="**/*.jar"/&gt; 
        &lt;/fileset&gt;     
    &lt;/path&gt;
        
    &lt;path id="run.classpath"&gt;
        &lt;pathelement path="${build.dir}"/&gt;
        &lt;fileset dir="${jetty.lib.dir}"&gt; 
            &lt;include name="**/*.jar"/&gt; 
        &lt;/fileset&gt;
    &lt;/path&gt;   
        
    &lt;target name="init"&gt;
        &lt;mkdir dir="${build.dir}"/&gt;
    &lt;/target&gt;     
    
    &lt;target name="compile" depends="init"&gt;
        &lt;javac srcdir="${src.dir}" destdir="${build.dir}" 
                  includeantruntime="false"&gt;
            &lt;classpath refid="compile.classpath"/&gt;
        &lt;/javac&gt;
        &lt;echo&gt;Compilation completed&lt;/echo&gt;
    &lt;/target&gt;
    
    &lt;target name="run" depends="compile"&gt;
        &lt;echo&gt;Running the program&lt;/echo&gt;
        &lt;java classname="com.zetcode.SimpleHandlerEx" 
                 classpathref="run.classpath"/&gt;
    &lt;/target&gt;         
    
    &lt;target name="clean" depends="init"&gt;
        &lt;delete dir="${build.dir}"/&gt;
        &lt;echo&gt;Cleaning completed&lt;/echo&gt;
    &lt;/target&gt;  
    
&lt;/project&gt;

The build file includes a run task, which executes the compiled application.

&lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;

To compile and run our examples, we need a handful of JARs. They are located in
the lib/ subdirectory of the Jetty home.

$ ant run
$ curl localhost:8080
Hello there

We receive this message when we send a simple GET request with the 
curl application.

## Defining the context root

The context root of a web application determines what URLs will be delegated
to the application. Jetty has the ContextHandler to define the
application's context. 

ContextEx.java

```
package com.zetcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;
import org.eclipse.jetty.server.handler.ContextHandler;

class MyHandler extends AbstractHandler {

    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request,
            HttpServletResponse response) throws IOException, ServletException {

        response.setContentType("text/plain;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        baseRequest.setHandled(true);
        response.getWriter().println("Hello there");
    }
}

public class ContextEx {

    public static void main(String[] args) throws Exception {

        Server server = new Server(8080);

        ContextHandler con = new ContextHandler();
        con.setContextPath("/path");
        con.setHandler(new MyHandler());
        
        server.setHandler(con);

        server.start();
        server.join();
    }
}

```

The handler of our application will be called for context 
root named /path.

ContextHandler context = new ContextHandler();
context.setContextPath("/path");

A ContextHandler is instantiated and a path is set.

context.setHandler(new MyHandler());

The handler is set for the context handler object.

server.setHandler(context);

We set the context handler object to the server with the setHandler
method.

$ curl localhost:8080/path/
Hello there

We send the request to the defined context root. For non-matching contexts, Jetty
returns the 404 error message.

## Simple servlet

In the following example a Java servlet will be launched upon
sending a request with a specific URL to the embedded Jetty.

$ mkdir simpleservlet
$ cd simpleservlet/
$ mkdir -p src/com/zetcode/
$ touch src/com/zetcode/SimpleServlet.java
$ touch src/com/zetcode/SimpleApp.java
$ touch src/web/WEB-INF/web.xml
$ touch build.xml

We create a project directory and its structure. We use Ant to build the project 
and a web.xml deployment descriptor to configure our web application.

$ tree
.
├── build.xml
└── src
    ├── com
    │   └── zetcode
    │       ├── SimpleApp.java
    │       └── SimpleServlet.java
    └── web
        └── WEB-INF
            └── web.xml

5 directories, 4 files

At this moment these are the contents of the project directory.

SimpleApp.java
  

package com.zetcode;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

public class SimpleApp {

    public static void main(String[] args) throws Exception {

        String webdir = "src/web/";

        Server server = new Server(8080);
        WebAppContext wcon = new WebAppContext();

        wcon.setContextPath("/simserv");
        wcon.setDescriptor(webdir + "/WEB-INF/web.xml");
        wcon.setResourceBase(webdir);
        
        wcon.setParentLoaderPriority(true);

        server.setHandler(wcon);

        server.start();
        server.join();
    }
}

To configure our web application in the embedded mode, we utilize the 
WebAppContext class. This class  is an extension of the 
ContextHandler that coordinates the construction and configuration 
of handlers for web applications.

wcon.setContextPath("/simserv");

A context path is defined with the setContextPath method.

wcon.setDescriptor(webdir + "/WEB-INF/web.xml");

The deployment descriptor is set with the setDescriptor method.

wcon.setResourceBase(webdir);

We set the document root for our application. It is a directory 
(or collection of directories or URL) that contains the static resources 
for the context. These can be images, HTML files, or JSP files.

SimpleServlet.java
  

package com.zetcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.*;

public class SimpleServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/plain");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("Simple servlet");
    }
}

The SimpleServlet will respond with a plain text message.

web.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
             http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1"&gt;
         
  &lt;servlet&gt;
    &lt;servlet-name&gt;SimpleServlet&lt;/servlet-name&gt;
    &lt;servlet-class&gt;com.zetcode.SimpleServlet&lt;/servlet-class&gt;
  &lt;/servlet&gt;
  
  &lt;servlet-mapping&gt;
    &lt;servlet-name&gt;SimpleServlet&lt;/servlet-name&gt;
    &lt;url-pattern&gt;simple.do&lt;/url-pattern&gt;
  &lt;/servlet-mapping&gt;
  
&lt;/web-app&gt;

In the web.xml file, the execution of the com.zetcode.SimpleServlet 
is mapped to the simple.do string. This has to be specified at 
the end of the request URL.

build.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="SimpleServlet" default="compile"&gt;
  
    &lt;property name="name" value="simple"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="web.dir" value="${src.dir}/web"/&gt;
    &lt;property name="build.dir" location="${web.dir}/WEB-INF/classes"/&gt;
    &lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
  
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${jetty.lib.dir}"&gt; 
            &lt;include name="**/*.jar"/&gt; 
        &lt;/fileset&gt;     
    &lt;/path&gt;
        
    &lt;path id="run.classpath"&gt;
        &lt;pathelement path="${build.dir}" /&gt;
        &lt;fileset dir="${jetty.lib.dir}"&gt; 
            &lt;include name="**/*.jar"/&gt; 
        &lt;/fileset&gt;
    &lt;/path&gt;  
  
    &lt;target name="init"&gt;
        &lt;mkdir dir="${build.dir}"/&gt;
    &lt;/target&gt;     
  
    &lt;target name="compile" depends="init"&gt;
        &lt;javac srcdir="${src.dir}" destdir="${build.dir}" 
               includeantruntime="false"&gt;
            &lt;classpath refid="compile.classpath"/&gt;
        &lt;/javac&gt;
        &lt;echo&gt;Compilation completed&lt;/echo&gt;
    &lt;/target&gt;
  
    &lt;target name="clean" depends="init"&gt;
        &lt;delete dir="${build.dir}"/&gt;
        &lt;echo&gt;Cleaning completed&lt;/echo&gt;
    &lt;/target&gt;  
    
    &lt;target name="run" depends="compile"&gt;
        &lt;echo&gt;Running the program&lt;/echo&gt;
        &lt;java classname="com.zetcode.SimpleApp" 
              classpathref="run.classpath"/&gt;
    &lt;/target&gt;      
    
&lt;/project&gt;

This is the accompanying Ant build file.

$ ant run
$ curl localhost:8080/simserv/simple.do
Simple servlet

We build and run the application. Sending a GET message to 
localhost:8080/simserv/simple.do returns "Simple servlet" plain message.

## The @WebServlet annotation

The @WebServlet annotation is used to declare a servlet. The annotation is 
processed by the servlet container at deploy time. The declared servlet is 
available at the specified URL pattern.

$ tree
.
├── build.xml
└── src
    ├── com
    │   └── zetcode
    │       ├── AnnotatedAppEx.java
    │       └── MyServlet.java
    └── web
        └── WEB-INF

5 directories, 3 files

These are the contents of our project directory. In this example we do not 
include the web.xml file, since with Servlet 3.1 API the 
inclusion of this file is optional.

AnnotatedAppEx.java
package com.zetcode;

import org.eclipse.jetty.annotations.AnnotationConfiguration;
import org.eclipse.jetty.plus.webapp.EnvConfiguration;
import org.eclipse.jetty.plus.webapp.PlusConfiguration;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.Configuration;
import org.eclipse.jetty.webapp.FragmentConfiguration;
import org.eclipse.jetty.webapp.MetaInfConfiguration;
import org.eclipse.jetty.webapp.WebAppContext;
import org.eclipse.jetty.webapp.WebInfConfiguration;
import org.eclipse.jetty.webapp.WebXmlConfiguration;

public class AnnotatedAppEx {

    public static void main(String[] args) throws Exception {
    
        String webdir = "src/web/";

        Server server = new Server(8080);
        WebAppContext wcon = new WebAppContext();
        wcon.setResourceBase(webdir);

        wcon.setContextPath("/annotated");

        wcon.setConfigurations(new Configuration[] {
            new AnnotationConfiguration(), new WebXmlConfiguration(),
            new WebInfConfiguration(), new PlusConfiguration(), 
            new MetaInfConfiguration(), new FragmentConfiguration(), 
            new EnvConfiguration() });    

        wcon.setParentLoaderPriority(true);

        server.setHandler(wcon);
        server.start();
        server.join();
    }
}

This class starts an embedded Jetty server with annotations enabled.

wcon.setConfigurations(new Configuration[] {
    new AnnotationConfiguration(), new WebXmlConfiguration(),
    new WebInfConfiguration(), new PlusConfiguration(), 
    new MetaInfConfiguration(), new FragmentConfiguration(), 
    new EnvConfiguration() });  

To enable annotations, we need to set these configuration classes. This gives support 
for multiple features.

MyServlet.java
package com.zetcode;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet(urlPatterns = { "/aserv" })
public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("text/plain");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().println("MyServlet called");
    }
}

In the MyServlet.java file we provide the @WebServlet annotation.
The servlet is available at the /aserv url.

build.xml
&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="AnnotatedServlet" default="compile"&gt;
  
    &lt;property name="name" value="annotated"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="web.dir" value="${src.dir}/web"/&gt;
    &lt;property name="build.dir" location="${web.dir}/WEB-INF/classes"/&gt;
    &lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
  
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${jetty.lib.dir}"&gt; 
            &lt;include name="**/*.jar"/&gt; 
        &lt;/fileset&gt;     
    &lt;/path&gt;
        
    &lt;path id="run.classpath"&gt;
        &lt;pathelement path="${build.dir}"/&gt;
        &lt;fileset dir="${jetty.lib.dir}"&gt; 
            &lt;include name="**/*.jar"/&gt; 
        &lt;/fileset&gt;
    &lt;/path&gt;         
  
    &lt;target name="init"&gt;
        &lt;mkdir dir="${build.dir}"/&gt;
    &lt;/target&gt;     
  
    &lt;target name="compile" depends="init"&gt;
        &lt;javac srcdir="${src.dir}" destdir="${build.dir}" 
               includeantruntime="false"&gt;
            &lt;classpath refid="compile.classpath"/&gt;
        &lt;/javac&gt;
        &lt;echo&gt;Compilation completed&lt;/echo&gt;
    &lt;/target&gt;
  
    &lt;target name="clean" depends="init"&gt;
        &lt;delete dir="${build.dir}"/&gt;
        &lt;echo&gt;Cleaning completed&lt;/echo&gt;
    &lt;/target&gt;  
    
    &lt;target name="run" depends="compile"&gt;
        &lt;echo&gt;Running the program&lt;/echo&gt;
        &lt;java classname="com.zetcode.AnnotatedAppEx" 
              classpathref="run.classpath"/&gt;
    &lt;/target&gt;         
    
&lt;/project&gt;

This is the Ant build file for our project. 

$ ant run
$ curl localhost:8080/annotated/aserv
MyServlet called

The MyServlet was succesfully launched.

## Enabling JavaServer Pages

In order to enable JavaServer Pages in the embedded Jetty mode, 
we need to create a temporary servlet directory, set a non-system
classloader, add a jsp servlet, and add a default
servlet.

In the following example, we create a simple JavaServer Page and build
a WAR archive. This archive will be set to Jetty started in embedded mode.

$ pwd
/home/janbodnar/prog/jetty/jspexample
$ tree
.
├── build.xml
└── src
    ├── com
    │   └── zetcode
    │       └── JSPExample.java
    └── web
        ├── index.jsp
        └── WEB-INF

5 directories, 3 files

This is the project structure.

index.jsp
&lt;!DOCTYPE html&gt;
&lt;html&gt; 
&lt;body&gt;
&lt;p&gt;
   Today's date: &lt;%= (new java.util.Date()).toLocaleString() %&gt;
&lt;/p&gt;
&lt;/body&gt; 
&lt;/html&gt;

Our JSP will output the current localized date.

package com.zetcode;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.List;
import org.apache.jasper.servlet.JspServlet;
import org.apache.tomcat.InstanceManager;
import org.apache.tomcat.SimpleInstanceManager;
import org.eclipse.jetty.annotations.ServletContainerInitializersStarter;
import org.eclipse.jetty.apache.jsp.JettyJasperInitializer;
import org.eclipse.jetty.plus.annotation.ContainerInitializer;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.DefaultServlet;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.webapp.WebAppContext;

public class JSPExample {
    
    private void startServer() throws Exception {
        
        String jetty_base = "/home/janbodnar/prog/jetty/my-base";

        File tmpdir = new File(System.getProperty("java.io.tmpdir"));
        File scdir = new File(tmpdir.toString(), "embedded-jetty-jsp");

        if (!scdir.exists()) {
            if (!scdir.mkdirs()) {
                throw new IOException("Unable to create scratch directory: " + scdir);
            }
        }        

        Server server = new Server(8080);

        WebAppContext wcon = new WebAppContext();
        wcon.setParentLoaderPriority(true);
        wcon.setContextPath("/");
        wcon.setAttribute("javax.servlet.wcon.tempdir", scdir);
        wcon.setAttribute(InstanceManager.class.getName(), 
            new SimpleInstanceManager());
        server.setHandler(wcon);
        
        JettyJasperInitializer sci = new JettyJasperInitializer();
        ServletContainerInitializersStarter sciStarter = 
            new ServletContainerInitializersStarter(wcon);
        ContainerInitializer initializer = new ContainerInitializer(sci, null);
        List&lt;ContainerInitializer&gt; initializers = new ArrayList&lt;&gt;();
        initializers.add(initializer);

        wcon.setAttribute("org.eclipse.jetty.containerInitializers", initializers);
        wcon.addBean(sciStarter, true);
        
        ClassLoader jspClassLoader = new URLClassLoader(new URL[0], 
            this.getClass().getClassLoader());
        wcon.setClassLoader(jspClassLoader);
        
        ServletHolder holderJsp = new ServletHolder("jsp", JspServlet.class);
        holderJsp.setInitOrder(0);
        holderJsp.setInitParameter("fork","false");
        holderJsp.setInitParameter("keepgenerated", "true");
        wcon.addServlet(holderJsp, "*.jsp");
        
        ServletHolder holderDefault = new ServletHolder("default", 
            DefaultServlet.class);
        holderDefault.setInitParameter("dirAllowed", "true");
        wcon.addServlet(holderDefault, "/");        
        
        wcon.setWar(jetty_base + "/webapps/jspexample.war");
        server.setHandler(wcon);

        server.start();
        server.join();        
    }

    public static void main(String[] args) throws Exception {

        JSPExample ex = new JSPExample();
        ex.startServer();
    }
}

We enable JSP support and set a WAR file called jspexample.war 
to the web application context.

File tmpdir = new File(System.getProperty("java.io.tmpdir"));
File scdir = new File(tmpdir.toString(), "embedded-jetty-jsp");

if (!scdir.exists()) {
    if (!scdir.mkdirs()) {
        throw new IOException("Unable to create scratch directory: " + scdir);
    }
}        

We create a scratch directory for the servlet context. It is used during
JSP compilation.

System.setProperty("org.apache.jasper.compiler.disablejsr199","false");

This line forces to use standard javac. (There is also one used by Eclipse.)

JettyJasperInitializer sci = new JettyJasperInitializer();
ServletContainerInitializersStarter sciStarter = 
    new ServletContainerInitializersStarter(wcon);
ContainerInitializer initializer = new ContainerInitializer(sci, null);
List&lt;ContainerInitializer&gt; initializers = new ArrayList&lt;&gt;();
initializers.add(initializer);

wcon.setAttribute("org.eclipse.jetty.containerInitializers", initializers);
wcon.addBean(sciStarter, true);

This is JSP initialization code.

ClassLoader jspClassLoader = new URLClassLoader(new URL[0], 
    this.getClass().getClassLoader());
wcon.setClassLoader(jspClassLoader);

JSP require a non-System classloader, this simply wraps the
embedded System classloader in a way that makes it suitable
for JSP to use.

ServletHolder holderJsp = new ServletHolder("jsp", JspServlet.class);
holderJsp.setInitOrder(0);
holderJsp.setInitParameter("fork","false");
holderJsp.setInitParameter("keepgenerated", "true");
wcon.addServlet(holderJsp, "*.jsp");

We add a JspServlet. Its name must be "jsp".

ServletHolder holderDefault = new ServletHolder("default", 
    DefaultServlet.class);
holderDefault.setInitParameter("dirAllowed", "true");
wcon.addServlet(holderDefault, "/");   

We add a DefaultServlet. Its name must be "default".

wcon.setWar(jetty_base + "/webapps/jspexample.war");

The WAR file is set to the web application context.

build.xml
&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="JSPExample" default="compile"&gt;
  
    &lt;property name="name" value="jspexample"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="web.dir" value="${src.dir}/web"/&gt;
    &lt;property name="build.dir" location="${web.dir}/WEB-INF/classes"/&gt;
    &lt;property name="dist.dir" location="dist"/&gt;
    &lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
    &lt;property name="jetty.base" location="${env.JETTY_BASE}"/&gt;
    &lt;property name="deploy.path" location="${jetty.base}/webapps"/&gt;
    
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${jetty.lib.dir}"&gt; 
            &lt;include name="**/*.jar"/&gt; 
        &lt;/fileset&gt;     
    &lt;/path&gt;
        
    &lt;path id="run.classpath"&gt;
        &lt;pathelement path="${build.dir}"/&gt;
        &lt;fileset dir="${jetty.lib.dir}"&gt; 
            &lt;include name="**/*.jar"/&gt; 
        &lt;/fileset&gt;
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
        &lt;copy file="${dist.dir}/${name}.war" todir="${deploy.path}"/&gt;
        &lt;echo&gt;Archive deployed&lt;/echo&gt;
    &lt;/target&gt;        
    
    &lt;target name="run" depends="deploy"&gt;
        &lt;echo&gt;Running the program&lt;/echo&gt;
        &lt;java classname="com.zetcode.JSPExample" 
              classpathref="run.classpath"/&gt;
    &lt;/target&gt;     
    
&lt;/project&gt;

This is the Ant build for our project. All necessary jars are found in the 
lib subdirectory of the JETTY_HOME directory. 

Issuing ant run leads to the following security exception: 
java.security.AccessControlException: access denied ("java.lang.RuntimePermission" "getClassLoader").

We need to add a configuration option to the java.policy file.

$ vi $JAVA_HOME/jre/lib/security/java.policy

We edit the java.policy file.

permission java.lang.RuntimePermission "getClassLoader", "read";

We add this permission.

$ ant run
$ curl localhost:8080/index.jsp
&lt;!DOCTYPE html&gt;
&lt;html&gt; 
&lt;body&gt;
&lt;p&gt;
    Today's date: Sep 16, 2014 1:54:05 PM
&lt;/p&gt;
&lt;/body&gt; 
&lt;/html&gt;

The JSP returns the current date.

In this part of the Jetty tutorial, we have worked with Jetty in embedded mode. 
We have defined a simple handler and servlet, utilized a @WebServlet annotation,
and enabled JSP support. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).

[Contents](..)
[Previous](../admin/)
[Next](../servlets/)