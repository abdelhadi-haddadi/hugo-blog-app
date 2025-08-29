+++
title = "WebSocket in Jetty"
date = 2025-08-29T19:59:39.247+01:00
draft = false
description = "This part of Jetty tutorial shows how to create WebSocket applications using Jetty's WebSocket implementation."
image = "images/websocket.png"
imageBig = "images/websocket.png"
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../fastcgi/)
[Next](../install/)

# WebSocket in Jetty

last modified January 27, 2024

 

*WebSocket* is an Internet protocol providing two-way communication
between a client and a server. WebSocket was designed to be implemented in 
web browsers and web servers, but it can be used by any client or 
server application. 

Messages can be delivered in either UTF-8 TEXT or BINARY format.

## WebSocketServlet

Jetty's WebSocketServlet is a servlet that connects servlet technology
to the WebSocket API. Inside WebSocketServlet's configure method we
register our WebSockets with a WebSocketServletFactory. 
The WebSockets are Java classes that deal with incoming WebSocket upgrade requests.

In the following example, a servlet deals with WebSocket requests from a webbrowser
client. 

$ tree
.
├── build.xml
└── src
    ├── com
    │   └── zetcode
    │       ├── MyServlet.java
    │       └── MySocket.java
    └── web
        ├── index.html
        ├── index.js
        └── WEB-INF

5 directories, 5 files

These are the contents of the project directory.

index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;body&gt;
        &lt;script src="index.js"&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;

The index.html file contains a &lt;script&gt; tag
which loads an external script. 

index.js
  

var ws = new WebSocket("ws://localhost:8080/ws/wsexample");

ws.onopen = function() {
    document.write("WebSocket opened &lt;br&gt;");
    ws.send("Hello Server");
};

ws.onmessage = function(evt) {
    document.write("Message: " + evt.data);
};

ws.onclose = function() {
    document.write("&lt;br&gt;WebSocket closed");
};

ws.onerror = function(err) {
    document.write("Error: " + err);
};

This JavaScript code creates a connection to a WebSocket. It defines
four callback functions to WebSocket events. 

var ws = new WebSocket("ws://localhost:8080/ws/wsexample");

A WebSocket object is created. The ws is an URI scheme 
for websocket connections. The constructor takes an URI which identifies a 
websocket server and resource name.

ws.onopen = function() {
    document.write("WebSocket opened &lt;br&gt;");
    ws.send("Hello Server");
};

When a connection to a WebSocket is created, an Open event is triggered.
The send method transmits data to the WebSocket.

ws.onmessage = function(evt) {
    document.write("Message: " + evt.data);
};

A message received from a WebSocket server is written to the HTML page using
the document.write method.

MyServlet.java
  

package com.zetcode;
 
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.annotation.WebServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServlet;
import org.eclipse.jetty.websocket.servlet.WebSocketServletFactory;
 
@WebServlet(name = "WebSocket Servlet", urlPatterns = { "/wsexample" })
public class MyServlet extends WebSocketServlet {

    @Override
    public void doGet(HttpServletRequest request,
            HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().println("HTTP GET method not implemented.");
    }

    @Override
    public void configure(WebSocketServletFactory factory) {
        factory.getPolicy().setIdleTimeout(10000);
        factory.register(MySocket.class);
    }
}

In the MyServlet.java class, we register a WebSocket to a 
WebSocketServletFactory in the configure method.

@Override
public void doGet(HttpServletRequest request,
        HttpServletResponse response) throws ServletException, IOException {
    response.getWriter().println("HTTP GET method not implemented.");
}

WebSocket requests are different from HTTP GET requests. Our servlet
returns a message that the GET method is not implemented for attempts
to connect to this servlet via a GET method. If we did not implement 
this method, we would receive an HTTP ERROR 405—HTTP method GET is not 
supported by this URL—error message from Jetty.

factory.getPolicy().setIdleTimeout(10000);

The connection will time out after ten seconds. A Close event will
be triggered.

MySocket.java
  

package com.zetcode;

import java.io.IOException;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketError;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

@WebSocket
public class MySocket {

    @OnWebSocketClose
    public void onClose(int statusCode, String reason) {
        System.out.println("Close: " + reason);
    }

    @OnWebSocketError
    public void onError(Throwable t) {
        System.out.println("Error: " + t.getMessage());
    }

    @OnWebSocketConnect
    public void onConnect(Session session) {
        System.out.println("Connect: " + session.getRemoteAddress().getAddress());
        
        try {
            session.getRemote().sendString("Hello Webbrowser");
        } catch (IOException e) {
            System.out.println("IO Exception");
        }
    }

    @OnWebSocketMessage
    public void onMessage(String message) {
        System.out.println("Message: " + message);
    }
}

This is a Java class that deals with WebSocket requests.

@WebSocket
public class MySocket {
...
}

The @WebSocket is an annotation that identifies a WebSocket class.

@OnWebSocketConnect
public void onConnect(Session session) {
    System.out.println("Connect: " + session.getRemoteAddress().getAddress());
    
    try {
        session.getRemote().sendString("Hello Webbrowser");
    } catch (IOException e) {
        System.out.println("IO Exception");
    }
}

The @OnWebSocketConnect annotation tags a method that
receives connection Open events. The sendString method
sends a message back to the client.

@OnWebSocketMessage
public void onMessage(String message) {
    System.out.println("Message: " + message);
}

The @OnWebSocketMessage annotation tags a method that receives 
message events from the client. The message is written to the 
console from which we started Jetty.

build.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="WebSocket" default="compile"&gt;
    
    &lt;property name="name" value="ws"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="web.dir" value="${src.dir}/web" /&gt;
    &lt;property name="build.dir" location="${web.dir}/WEB-INF/classes"/&gt;
    &lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
    &lt;property name="dist.dir" location="dist"/&gt;
    &lt;property name="deploy.path" location="${env.JETTY_BASE}/webapps"/&gt;
  
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${jetty.lib.dir}"/&gt;
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

This is the Ant build.xml file for the project. 

$ java -jar $JETTY_HOME/start.jar --add-to-start=websocket

We need to add the WebSocket module to the Jetty base if it is 
not already enabled. 

$ curl localhost:8080/ws/wsexample
HTTP GET method not implemented.

Sending an HTTP GET request produces this output.

![websocket.png](images/websocket.png)

Figure: WebSocket client

A browser is a client that connects to the WebSocket server
and sends a message. It also receives the "Hello Webbrowser" message from the 
server.

...
2014-09-06 17:08:42.193:INFO:oejs.Server:main: Started @4094ms
Connect: /127.0.0.1
Message: Hello Server
Error: Timeout on Read
Close: Idle Timeout

These are the messages that appear on Jetty's console.

## WebSocket client

In this section we will show how to create a WebSocket request 
from two different clients. The first client is a Python script
which uses the Python websocket library.

$ sudo apt-get install python-websocket

We need to install the python-websocket library.

#!/usr/bin/python

import websocket

websocket.enableTrace(True)
ws = websocket.create_connection("ws://localhost:8080/ws/wsexample")
print "Sending message"
ws.send("Hello server")
result = ws.recv()
print "Received '%s'" % result 

The script sends a message to our WebSocket server and receives the 
answer.

$ ./pyclient.py 
Sending message
Received 'Hello client'

Running the program we get this output.

In the second client, we use Jetty's WebSocketClient
and ClientUpgradeRequest classes to establish a WebSocket
connection and send and receive a message.

package com.zetcode;

import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;
import org.eclipse.jetty.websocket.client.ClientUpgradeRequest;
import org.eclipse.jetty.websocket.client.WebSocketClient;
import java.io.IOException;
import java.net.URI;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class JettyWebSocketClient {

    public static void main(String[] args) throws Exception {
        
        JettyWebSocketClient app = new JettyWebSocketClient();
        app.start();
    }
    
    public void start() throws Exception {

        WebSocketClient client = new WebSocketClient();
        MyWebSocket socket = new MyWebSocket();
        
        client.start();
        
        URI destUri = new URI("ws://localhost:8080/ws/wsexample");
        
        ClientUpgradeRequest request = new ClientUpgradeRequest();
        System.out.println("Connecting to: " + destUri);
        client.connect(socket, destUri, request);
        socket.awaitClose(5, TimeUnit.SECONDS);

        client.stop();
    }

    @WebSocket
    public class MyWebSocket {
    
        private final CountDownLatch closeLatch = new CountDownLatch(1);

        @OnWebSocketConnect
        public void onConnect(Session session) throws IOException {
        
            System.out.println("Sending message: Hello server");
            session.getRemote().sendString("Hello server");
        }

        @OnWebSocketMessage
        public void onMessage(String message) {
            System.out.println("Message from Server: " + message);
        }

        @OnWebSocketClose
        public void onClose(int statusCode, String reason) {
            System.out.println("WebSocket Closed. Code:" + statusCode);
        }

        public boolean awaitClose(int duration, TimeUnit unit) 
                throws InterruptedException {
            return this.closeLatch.await(duration, unit);
        }
    }
}

This example is a Java WebSocket client. 

URI destUri = new URI("ws://localhost:8080/ws/wsexample");

An URI pointing to our websocket endpoint is created.

ClientUpgradeRequest request = new ClientUpgradeRequest();

The initial conversation to open a websocket connection is 
done over the HTTP protocol. The client sends an *Upgrade*
request to the server. If the server supports WebSocket
protocol, it agrees to the protocol switch. Jetty uses 
ClientUpgradeRequest class to create an Upgrade
request.

client.connect(socket, destUri, request);

We connect to the specified URI via the established WebSocket and
send the Upgrade request. 

session.getRemote().sendString("Hello server");

The message is sent with the sendString method.

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;project name="JettyWebSocketClient" default="compile"&gt;
    
    &lt;property name="name" value="wsclient"/&gt;
    &lt;property environment="env"/&gt;
    &lt;property name="src.dir" value="src"/&gt;
    &lt;property name="build.dir" location="build"/&gt;
    &lt;property name="jetty.lib.dir" location="${env.JETTY_HOME}/lib"/&gt;
  
    &lt;path id="compile.classpath"&gt;
        &lt;fileset dir="${jetty.lib.dir}"/&gt;
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
        &lt;java classname="com.zetcode.JettyWebSocketClient" 
                classpathref="run.classpath"/&gt;
    &lt;/target&gt; 
    
&lt;/project&gt;

This is the Ant build file to compile and run the WebSocket client.

$ ant run
Buildfile: /home/janbodnar/prog/jetty/websocket3/build.xml
init:
compile:
     [echo] Compilation completed
run:
     [echo] Running the program
     [java] 2014-09-07 23:13:39.796:INFO::main: Logging initialized @1230ms
     [java] Connecting to: ws://localhost:8080/ws/wsexample
     [java] Sending message: Hello server
     [java] Message from server: Hello client
     [java] WebSocket closed. Code:1001
BUILD SUCCESSFUL
Total time: 6 seconds

We get this output when we run the code.

In this chapter of the Jetty tutorial, we have established WebSocket connections
in Jetty.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).

[Contents](..)
[Previous](../fastcgi/)
[Next](../install/)