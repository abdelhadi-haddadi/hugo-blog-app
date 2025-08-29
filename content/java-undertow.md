+++
title = "Java Undertow"
date = 2025-08-29T20:00:55.586+01:00
draft = false
description = "Java Undertow tutorial shows how to create web applications in Java with Undertow. Undertow is a flexible performant web server written in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Undertow

last modified January 27, 2024

 

Java Undertow tutorial shows how to create web applications in Java with
Undertow. Examples can be found at the
author's [repository](https://github.com/janbodnar/Java-Advanced/tree/master/web/undertow).

## Undertow

Undertow is a flexible performant web server written in Java.
It is sponsored by JBoss and is the default web server in the Wildfly
Application Server.

Features of Undertow:

    - provides both blocking and non-blocking API

    - provides support for Servlet 4.0 API

    - contains easy to use fluent builder API

    - it is embeddable

    - provides HTTP Upgrade support

    - includes Websocket support

To work with Undertow, we need the undertow-core dependency.

## Java Undertow simple example

The following is a simple example that uses Undertow server.

com/zetcode/UndertowSimple.java
  

package com.zetcode;

import io.undertow.Undertow;
import io.undertow.util.Headers;

public class UndertowSimple {

    public static void main(String[] args) {

        Undertow server = Undertow.builder()
                .addHttpListener(8080, "localhost")
                .setHandler(exchange -&gt; {
                    exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "text/plain");
                    exchange.getResponseSender().send("Hello there");
                }).build();

        server.start();
    }
}

In the example, we create an embedded web server which listenes on 8080 port.
We set a simple handler that returns plain text message.

$ curl localhost:8080
Hello there

After the applicaiton is run, we create a GET request to the web server with
the curl tool.

## Java Undertow welcome page

In the following example, we show how to send an HTML welcome page.

pom.xml
src
├── main
│&nbsp;&nbsp; ├── java
│&nbsp;&nbsp; │&nbsp;&nbsp; └── com
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── zetcode
│&nbsp;&nbsp; │&nbsp;&nbsp;         └── WelcomePage.java
│&nbsp;&nbsp; └── resources
│&nbsp;&nbsp;     └── public
│&nbsp;&nbsp;         └── index.html
└── test
    └── java

This is the project structure.

src/main/resources/public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Home page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;
    Home page.
&lt;/p&gt;

&lt;/body&gt;
&lt;/html&gt;

This is a simple welcome page.

com/zetcode/WelcomePage.java
  

package com.zetcode;

import io.undertow.Undertow;
import io.undertow.server.handlers.resource.ClassPathResourceManager;

import static io.undertow.Handlers.path;
import static io.undertow.Handlers.resource;

public class WelcomePage {

    public static void main(String[] args) {

        Undertow server = Undertow.builder()
                .addHttpListener(8080, "localhost")
                .setHandler(path().addPrefixPath("/",
                        resource(new ClassPathResourceManager(
                                    WelcomePage.class.getClassLoader()))
                                .addWelcomeFiles("public/index.html")))
                .build();

        server.start();
    }
}

We welcome page is added with resource and addWelcomeFiles.

## Java Undertow query string

A query string is a part of a uniform resource locator (URL) that assigns values
to specified parameters. A query string commonly includes fields added to a base
URL by a browser or other client application. This is often done in an HTML
form.

com/zetcode/UndertowQueryParam.java
  

package com.zetcode;

import io.undertow.Undertow;
import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;

import static io.undertow.Handlers.path;

class ItemHandler implements HttpHandler {

    @Override
    public void handleRequest(HttpServerExchange exchange) {

        exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "text/plain");

        var value = exchange.getQueryParameters().get("name");

        String msg;

        if (value == null) {

            msg = "Hello there";
        } else {

            msg = String.format("Hello %s", value.getFirst());
        }

        exchange.getResponseSender().send(msg);
    }
}

public class UndertowQueryParam {

    public static void main(String[] args) {

        Undertow server = Undertow.builder()
                .addHttpListener(8080, "0.0.0.0")
                .setHandler(path().addPrefixPath("/greet", new ItemHandler()))
                .build();
        server.start();
    }
}

The example reads a name parameter from the query string, builds
a message and sends it back to the client.

var value = exchange.getQueryParameters().get("name");

We get the query parameter.

$ curl localhost:8080/greet?name=Peter
Hello Peter

## Java Undertow routing

A route is A route is a map from a URL path to a handler. For instance, the
/about URL is mapped to the about handler.

com/zetcode/PlainTextHandler.java
  

package com.zetcode;

import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;

public class PlainTextHandler implements HttpHandler {

    private final String value;

    public PlainTextHandler(String value) {
        this.value = value;
    }

    @Override
    public void handleRequest(HttpServerExchange exchange) {

        exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "text/plain");
        exchange.getResponseSender().send(value + "\n");
    }
}

The PlainTextHandler sends a plain text message to the client.

com/zetcode/RoutingHandlers.java
  

package com.zetcode;

import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;

public class RoutingHandlers {

    public static HttpHandler plainTextHandler(String value) {

        return new PlainTextHandler(value);
    }

    public static void notFoundHandler(HttpServerExchange exchange) {

        exchange.setStatusCode(404);
        exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "text/plain");
        exchange.getResponseSender().send("Page Not Found");
    }
}

In the RoutingHandlers, we group the existing routes. We have
a plain text handler and a not found handler.

com/zetcode/UndertowRouting.java
  

package com.zetcode;

import io.undertow.Undertow;
import io.undertow.server.HttpHandler;
import io.undertow.server.RoutingHandler;

public class UndertowRouting {

    public static void main(String[] args) {

        Undertow server = Undertow.builder()
                .addHttpListener(8080, "localhost", ROUTES)
                .build();

        server.start();
    }

    private static HttpHandler ROUTES = new RoutingHandler()
            .get("/", RoutingHandlers.plainTextHandler("GET - My Homepage"))
            .get("/about", RoutingHandlers.plainTextHandler("GET - about"))
            .post("/about", RoutingHandlers.plainTextHandler("POST - about"))
            .get("/new*", RoutingHandlers.plainTextHandler("GET - new*"))
            .setFallbackHandler(RoutingHandlers::notFoundHandler);
}

We set up several get and post routes. If a path is not recognized, the request
is handled with the notFoundHandler.

$ curl localhost:8080/about
GET - about
$ curl -X POST localhost:8080/about
POST - about
$ curl  localhost:8080/contact
Page Not Found

We generate three requests to the application.

## Source

[Java Undertow documentation](https://undertow.io/documentation.html)

In this article we have created simple web applications with embedded
Untertow server.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).