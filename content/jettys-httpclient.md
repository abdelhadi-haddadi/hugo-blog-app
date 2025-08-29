+++
title = "Jetty's HTTPClient"
date = 2025-08-29T19:59:37.987+01:00
draft = false
description = "This chapter of the Jetty tutorial covers the HTTP client module."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../logging/)
[Next](../fastcgi/)

# Jetty's HTTPClient

last modified January 27, 2024

 

The Jetty HTTP client is a module to perform HTTP and HTTPS requests. It can be used
to create both asynchronous and synchronous requests. The Java class to perform HTTP requests
is called HttpClient.

The HttpClient is by its nature asynchronous. The code sending a
request does not wait for the response to arrive before continuing. 

## HTTP GET method

HTTP GET method is a request to retrieve information from a server.
The HttpClient class has an equally named GET
method to perform such a request. The GET method sends
a request synchronously—it blocks processing until the request is 
completed.

package com.zetcode;

import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.ContentResponse;

public class HttpClientGetMethod {

    public static void main(String[] args) throws Exception {
        
        HttpClient client = new HttpClient();
        client.start();

        ContentResponse res = client.GET("http://www.something.com");
        
        System.out.println(res.getContentAsString());
        
        client.stop();
    }
}

Our example retrieves the contents of the specified home page. 

HttpClient client = new HttpClient();
client.start();

We create an instance of the HttpClient. The start
method starts its life cycle.

ContentResponse res = client.GET("http://www.something.com");

We retrieve an HTML page from the specified website. The data
is sent in the form of the ContentResponse. 
The content length is limited by default to 2 MB. 

System.out.println(res.getContentAsString());

From the response, we get the content using the getContentAsString method.

client.stop();

The stop method ends the life cycle of the HTTP client.

$ javac -d bin -cp :../lib/jetty-all-9.2.2.jar com/zetcode/HttpClientGetMethod.java 
$ java -cp :bin:../lib/jetty-all-9.2.2.jar com.zetcode.HttpClientGetMethod 
2014-09-02 23:06:24.279:INFO::main: Logging initialized @132ms
&lt;html&gt;&lt;head&gt;&lt;title&gt;Something.&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;Something.&lt;/body&gt;
&lt;/html&gt;

We compile and run the example. We use an aggregate jetty-all JAR file, which can 
be downloaded from a maven repository. 

## HEAD request

The HEAD method is identical to the GET method except that the server does not return a 
message body in the response. We use the newRequest method
of the HttpClient if we want to customise our request. 

package com.zetcode;

import java.util.concurrent.TimeUnit;
import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.Response;
import org.eclipse.jetty.http.HttpMethod;
import org.eclipse.jetty.http.HttpVersion;

public class HttpClientHead {

    public static void main(String[] args) throws Exception {
        
        HttpClient client = new HttpClient();
        client.start();

        Response response = client.newRequest("www.google.com", 80)
                .scheme("http")
                .agent("Jetty HTTP client")
                .version(HttpVersion.HTTP_1_1)
                .method(HttpMethod.HEAD)
                .timeout(5, TimeUnit.SECONDS)
                .send();

        System.out.println(response.getStatus());

        client.stop();       
    }
}

The example sends a HEAD request to a specified website. We get the status code
from the response.

Response response = client.newRequest("www.google.com", 80)
        .scheme("http")
        .agent("Jetty HTTP client")
        .version(HttpVersion.HTTP_1_1)
        .method(HttpMethod.HEAD)
        .timeout(5, TimeUnit.SECONDS)
        .send();

The request is customised by a chained invocation of methods on the request object. 
For instance, the agent method specifies the client software originating
the request. The method specifies the HTTP method to be performed.
Passing HttpMethod.HEAD as a parameter, we create an HTTP HEAD request.

Since the HEAD request returns only a header without the content, we use the 
Response type. If we are interested in the content, supposing that the 
method returns it, we use the ContentResponse type.

$ javac -d bin -cp ../lib/jetty-all-9.2.2.jar com/zetcode/HttpClientHead.java 
$ java -cp :bin:../lib/jetty-all-9.2.2.jar com.zetcode.HttpClientHead 
2014-09-03 14:18:38.403:INFO::main: Logging initialized @138ms
200

The example returns HTTP 200 status code, which is a standard code for
a successful response.

## Asynchronous requests

Asynchronous requests are non-blocking requests that do not wait for the
request-response conversation to finish. In Jetty, asynchronous requests
are implemented using listeners. Listeners are invoked at various stages of the
request and response processing. For instance, the CompleteListener
is invoked when the conversation has ended, either successfully or not.

package com.zetcode;

import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.Response;
import org.eclipse.jetty.client.api.Result;

public class HttpClientAsync {

    public static void main(String[] args) throws Exception {
        
        HttpClient client = new HttpClient();
        client.start();

        client.newRequest("http://www.something.com")
                .send(new Response.CompleteListener()
                {
                    @Override
                    public void onComplete(Result result)
                    {
                        System.out.println(result.getResponse().getStatus());
                        System.out.println("Request completed");
                    }
                });
        
        //client.stop();       
    }
}

An asynchronous GET request is sent to a specified website. 

client.newRequest("http://www.something.com")
        .send(new Response.CompleteListener()
        {

An asynchronous request is created by passing a listener to the
send method.

@Override
public void onComplete(Result result)
{
    System.out.println(result.getResponse().getStatus());
    System.out.println("Request completed");
}

The onComplete method is a callback method invoked when
the request-response conversation has ended.

//client.stop();       

In non-blocking processing, calling stop may lead to an
exception. The method must be called outside of the client thread.
The application has to be ended with the Ctrl+C key 
combination or by explicitly killing the process. The next example brings a cleaner
solution.

## CountDownLatch

A CountDownLatch is a synchronisation aid that allows a
thread to wait until a set of operations being performed in another 
thread completes.

package com.zetcode;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;
import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.Response;
import org.eclipse.jetty.client.api.Result;

public class HttpClientLatch {

    public static void main(String[] args) throws Exception {

        HttpClient client = new HttpClient();
        client.start();

        final AtomicReference&lt;Response&gt; responseRef = new AtomicReference&lt;&gt;();
        final CountDownLatch latch = new CountDownLatch(1);

        client.newRequest("http://www.something.com")
                .send(new Response.CompleteListener() {

                    @Override
                    public void onComplete(Result result) {
                        if (result.isSucceeded()) {
                            responseRef.set(result.getResponse());
                            latch.countDown();
                        }
                    }
                });

        boolean val = latch.await(10, TimeUnit.SECONDS);
        
        if (!val) {
            System.out.println("Time has elapsed.");
            System.exit(1);
        }
        
        Response response = responseRef.get();
        System.out.println(response.getStatus());
        
        client.stop();
    }
}

The example sends an asynchronous GET request to a specified website. With the help of
the CountDownLatch class, we wait for the response to arrive and stop the 
client. We do not have to kill the application.

final AtomicReference&lt;Response&gt; responseRef = new AtomicReference&lt;&gt;();

AtomicReference is used when we need to share an immutable 
object between multiple threads to ensure its correctness.
Our code shares a reference to the response object.

final CountDownLatch latch = new CountDownLatch(1);

The CountDownLatch takes a number as a parameter. It denotes the 
number of times the countDown must be invoked before a thread can 
pass through the await method.

responseRef.set(result.getResponse());

The response is set to the atomic reference. 

latch.countDown();

The countDown method decrements the count of the latch.
If the new count is zero, then all waiting threads are re-enabled for 
thread scheduling purposes.

boolean val = latch.await(10, TimeUnit.SECONDS);

The await method causes the current thread to wait until 
the latch has counted down to zero, unless the thread is interrupted, or 
the specified waiting time elapses. The method returns true if the
count reaches zero. It returns false if the specified waiting time elapses.

if (!val) {
    System.out.println("Time has elapsed.");
    System.exit(1);
}

If the time has elapsed, we print a message to the console and exit the
application.

Response response = responseRef.get();
System.out.println(response.getStatus());

If all went OK, we get the response object and print the status code
to the console.

## POST request

An HTTP POST request is used to send data to the server. A POST request
is created with the HttpClient's FORM method.

package com.zetcode;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.ContentResponse;
import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.AbstractHandler;
import org.eclipse.jetty.util.Fields;
import org.eclipse.jetty.util.Fields.Field;

class MyHandler extends AbstractHandler {

    @Override
    public void handle(String target, Request baseRequest,
            HttpServletRequest request,
            HttpServletResponse response)
            throws IOException, ServletException {

        response.setContentType("text/plain;charset=utf-8");
        response.setStatus(HttpServletResponse.SC_OK);
        baseRequest.setHandled(true);

        PrintWriter out = response.getWriter();
        
        for (Enumeration&lt;String&gt; e = baseRequest.getParameterNames(); 
                e.hasMoreElements();) {
            String name = e.nextElement();
            out.format("%s: %s%n", name, baseRequest.getParameter(name));
        }
    }
}

public class HttpClientSendForm {

    private Server server;
    private HttpClient client;

    private void startServer() throws Exception {

        server = new Server(8080);
        server.setHandler(new MyHandler());
        server.start();
    }

    private void startClient() throws Exception {

        client = new HttpClient();
        client.start();

        Field name = new Field("Name", "Robert");
        Field age = new Field("Age", "32");
        Fields fields = new Fields();
        fields.put(name);
        fields.put(age);

        ContentResponse res = client.FORM("http://localhost:8080", fields);
        System.out.println(res.getContentAsString());
    }

    private void stopClientServer() throws Exception {
        client.stop();
        server.stop();
    }

    public static void main(String[] args) throws Exception {

        HttpClientSendForm smp = new HttpClientSendForm();
        smp.startServer();
        smp.startClient();
        smp.stopClientServer();
    }
}

The example creates a local server to which it sends form data. 

PrintWriter out = response.getWriter();

for (Enumeration&lt;String&gt; e = baseRequest.getParameterNames(); 
        e.hasMoreElements();) {
    String name = e.nextElement();
    out.format("%s: %s%n", name, baseRequest.getParameter(name));
}

Inside the server's handler, we get the request parameters with
the getParameterNames method. We go through them
and print them to the output writer. 

Field name = new Field("Name", "Robert");
Field age = new Field("Age", "32");
Fields fields = new Fields();
fields.put(name);
fields.put(age);

Request parameter names and their values are created; they are put into fields. 

ContentResponse res = client.FORM("http://localhost:8080", fields);

The FORM method sends the fields to the local server.

System.out.println(res.getContentAsString());

From the ContentResponse, we get the content using
the getContentAsString method.

In this chapter of Jetty tutorial we have presented the Jetty's HttpClient. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).

[Contents](..)
[Previous](../logging/)
[Next](../fastcgi/)