+++
title = "Spring WebSocket"
date = 2025-08-29T20:12:03.165+01:00
draft = false
description = "Spring WebSocket tutorial shows how to work with WebSocket in a Spring web application. WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring WebSocket

last modified October 18, 2023

Spring WebSocket tutorial shows how to work with WebSocket in a Spring web
application.

Spring is a popular Java application framework for creating enterprise
applications. 

## WebSocket

WebSocket is a computer communications protocol, providing full-duplex
communication channels over a single TCP connection. WebSockets are used 
in highly interactive applications such as games, chats, or stock markets.

## TextWebSocketHandler

Spring uses WebSocketHandler to handle WebSocket messages and lifecycle events.    
TextWebSocketHandler is a WebSocketHandler implementation which 
processes text messages.

## Spring TextWebSocketHandler example

The following application uses TextWebSocketHandler to process text messages
via WebSocket.

web.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           ├───config
│   │           │       MyWebInitializer.java
│   │           │       WebConfig.java
│   │           │       WebSocketConfig.java
│   │           └───handler
│   │                   MyWebSocketHandler.java
│   ├───resources
│   └───webapp
│       │   index.html
│       └───WEB-INF
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;textwebsocketex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;war&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.3.23&lt;/spring-version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-webmvc&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-websocket&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.servlet&lt;/groupId&gt;
            &lt;artifactId&gt;javax.servlet-api&lt;/artifactId&gt;
            &lt;version&gt;4.0.1&lt;/version&gt;
            &lt;scope&gt;provided&lt;/scope&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
                &lt;artifactId&gt;maven-war-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.3.2&lt;/version&gt;
            &lt;/plugin&gt;

            &lt;plugin&gt;
                &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
                &lt;artifactId&gt;jetty-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;9.4.49.v20220914&lt;/version&gt;
            &lt;/plugin&gt;

        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

In the pom.xml file we have the following dependencies:
spring-webmvc, javax.servlet-api, and
spring-websocket.

com/zetcode/config/MyWebInitializer.java
  

package com.zetcode.config;

import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

public class MyWebInitializer extends
        AbstractAnnotationConfigDispatcherServletInitializer {

    @Override
    protected Class&lt;?&gt;[] getRootConfigClasses() {
        return null;
    }

    @Override
    protected Class&lt;?&gt;[] getServletConfigClasses() {
        return new Class[]{WebConfig.class, WebSocketConfig.class};
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}

MyWebInitializer initializes Spring web application. It provides
two configuration classes: WebConfig and WebSocket.

com/zetcode/config/WebConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
@ComponentScan("com.zetcode")
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}

The WebConfig configures the DefaultServlet. In our
application, we have a static index.html page, which is processed
by the DefaultServlet.

com/zetcode/config/WebSocketConfig.java
  

package com.zetcode.config;

import com.zetcode.handler.MyWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private MyWebSocketHandler myWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(myWebSocketHandler, "/socketHandler");
    }
}

WebSocketConfig configures WebSocket in a Spring web application
with @EnableWebSocket.

@Autowired
private MyWebSocketHandler myWebSocketHandler;

We inject our MyWebSocketHandler. It is registered with
registerWebSocketHandlers.

com/zetcode/handler/MyWebSocketHandler.java
  

package com.zetcode.handler;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import java.time.LocalTime;

@Component
public class MyWebSocketHandler extends TextWebSocketHandler {

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {

        var clientMessage = message.getPayload();

        if (clientMessage.startsWith("hello") || clientMessage.startsWith("greet")) {
            session.sendMessage(new TextMessage("Hello there!"));
        } else if (clientMessage.startsWith("time")) {
            var currentTime = LocalTime.now();
            session.sendMessage(new TextMessage(currentTime.toString()));
        } else {

            session.sendMessage(new TextMessage("Unknown command"));
        }
    }
}

In the MyWebSocketHandler, we react to the socket messages. 

var clientMessage = message.getPayload();

With the getPayLoad method, we get the client message.

if (clientMessage.startsWith("hello") || clientMessage.startsWith("greet")) {
    session.sendMessage(new TextMessage("Hello there!"));
} else if (clientMessage.startsWith("time")) {
    var currentTime = LocalTime.now();
    session.sendMessage(new TextMessage(currentTime.toString()));
} else {

    session.sendMessage(new TextMessage("Unknown command"));
}

Depending on the message, we send a TextMessage back to the client.

webapp/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
    &lt;link href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
            rel="stylesheet"&gt;
&lt;/head&gt;
&lt;body&gt;

&lt;div class="ui container"&gt;

    &lt;h1&gt;Spring MVC 5 WebSocket&lt;/h1&gt;

    &lt;div class="two column grid"&gt;
        &lt;div class="row"&gt;
            &lt;div class="column"&gt;
                &lt;label for="myMessage"&gt;Message&lt;/label&gt;
            &lt;/div&gt;

            &lt;div class="column"&gt;
                &lt;div class="ui input"&gt;
                    &lt;input type="text" id="myMessage"&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="row"&gt;
            &lt;div class="column"&gt;
                &lt;label for="output"&gt;Response from Server&lt;/label&gt;
            &lt;/div&gt;

            &lt;div class="column"&gt;
                &lt;textarea rows="8" cols="50" id="output" readonly="readonly"&gt;&lt;/textarea&gt;
            &lt;/div&gt;
        &lt;/div&gt;

        &lt;div class="row"&gt;
            &lt;button class="ui button" onclick="send()"&gt;Send&lt;/button&gt;
        &lt;/div&gt;

    &lt;/div&gt;
&lt;/div&gt;

&lt;script&gt;
    const socketConn = new WebSocket('ws://localhost:8080/socketHandler');

    function send() {
        const clientMsg = document.getElementById('myMessage');

        if (clientMsg.value) {
            socketConn.send(clientMsg.value);
        }
    }

    socketConn.onmessage = (e) =&gt; {

        const output = document.getElementById('output');

        output.value += `${e.data}\n`;
    }
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;

The index.html contains a client interface to the application.

const socketConn = new WebSocket('ws://localhost:8080/socketHandler');

In JavaScript, we create a socket connection.

function send() {
    const clientMsg = document.getElementById('myMessage');

    if (clientMsg.value) {
        socketConn.send(clientMsg.value);
    }
}

Upon button click, we send a text message with send.

socketConn.onmessage = (e) =&gt; {

    const output = document.getElementById('output');

    output.value += `${e.data}\n`;
}

The onmessage event handler is called upon receiving a 
response. We get the response data and add it to the text area.

In this article we have created a simple Spring web application with support for
WebSocket.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).