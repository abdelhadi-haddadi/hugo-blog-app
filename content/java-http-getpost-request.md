+++
title = "Java HTTP GET/POST request"
date = 2025-08-29T19:58:59.814+01:00
draft = false
description = "Java HTTP GET/POST tutorial shows how to send a GET and a POST request in Java. We use built-in HttpURLConnection class and standard Java and Apache HttpClient class."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java HTTP GET/POST request

last modified July 10, 2024

 

In this article we show how to send a GET and a POST request in Java. We use the 
built-in HttpURLConnection class and the standard Java and 
Apache HttpClient class.

## HTTP

The Hypertext Transfer Protocol (HTTP) is an application 
protocol for distributed, collaborative, hypermedia information systems. 
HTTP is the foundation of data communication for the World Wide Web.

In the examples, we use httpbin.org, which is a freely available 
HTTP request and response service, and the webcode.me, which is 
a tiny HTML page for testing.

## HTTP GET

The HTTP GET method requests a representation of the specified resource. 
Requests using GET should only retrieve data.

## HTTP POST

The HTTP POST method sends data to the server. It is often used when 
uploading a file or when submitting a completed web form.

## GET request with Java HttpClient

Since Java 11, we can use the java.net.http.HttpClient. 

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newHttpClient()) {
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://webcode.me"))
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}

We create a GET request to the webcode.me webpage.

try (HttpClient client = HttpClient.newHttpClient()) {
    ...
}

A new HttpClient is created with the newHttpClient
factory method.

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://webcode.me"))
    .build();

We build a synchronous request to the webpage. The default method is GET.

HttpResponse&lt;String&gt; response = client.send(request,
    HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());

We send the request and retrieve the content of the response and print it 
to the console.

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My html page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;p&gt;
        Today is a beautiful day. We go swimming and fishing.
    &lt;/p&gt;
    
    &lt;p&gt;
         Hello there. How are you?
    &lt;/p&gt;
    
&lt;/body&gt;
&lt;/html&gt;

## HTTP POST request with Java HttpClient

The next example creates a POST request with Java HttpClient.

implementation 'com.fasterxml.jackson.core:jackson-databind:2.13.3'

We need the jackson-databind dependency.

Main.java
  

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;

void main() throws IOException, InterruptedException {

    var values = new HashMap&lt;String, String&gt;() {{
        put("name", "John Doe");
        put("occupation", "gardener");
    }};

    var objectMapper = new ObjectMapper();
    String requestBody = objectMapper.writeValueAsString(values);

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/post"))
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}

We send a POST request to the https://httpbin.org/post page.

var values = new HashMap&lt;String, String&gt;() {{
    put("name", "John Doe");
    put ("occupation", "gardener");
}};

var objectMapper = new ObjectMapper();
String requestBody = objectMapper
        .writeValueAsString(values);

First, we build the request body with the Jackson's ObjectMapper.

try (HttpClient client = HttpClient.newHttpClient()) {

    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://httpbin.org/post"))
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();
    ...
}

We build the POST request. With BodyPublishers.ofString we create a
new BodyPublisher. It converts high-level Java objects into a flow
of byte buffers suitable for sending as a request body.

HttpResponse&lt;String&gt; response = client.send(request,
        HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());

We send the request and retrieve the response.

## HTTP GET request with HttpURLConnection

The following example uses HttpURLConnection to create a GET
request.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;

HttpURLConnection con;

void main() throws IOException {

    var url = "https://webcode.me";

    try {

        var myurl = URI.create(url).toURL();
        con = (HttpURLConnection) myurl.openConnection();

        con.setRequestMethod("GET");

        StringBuilder content;

        try (BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()))) {

            String line;
            content = new StringBuilder();

            while ((line = in.readLine()) != null) {

                content.append(line);
                content.append(System.lineSeparator());
            }
        }

        System.out.println(content);

    } finally {

        con.disconnect();
    }
}

The example retrieves a web page with HTTP GET request.

var url = "https://webcode.me";

We retrieve the contents of this tiny webpage.

var myurl = URI.create(url).toURL();
con = (HttpURLConnection) myurl.openConnection();

A connection to the specified URL is created.

con.setRequestMethod("GET");

We set the request method type with the setRequestMethod method.

try (BufferedReader in = new BufferedReader(
        new InputStreamReader(con.getInputStream()))) {
    ...
}

An input stream is created from the HTTP connection object. The input stream is
used to read the returned data.

content = new StringBuilder();

We use StringBuilder to build the content string.

while ((line = in.readLine()) != null) {

    content.append(line);
    content.append(System.lineSeparator());
}

We read the data from the input stream line by line with readLine.
Each line is added to StringBuilder. After each line we append a 
system-dependent line separator.

System.out.println(content);

We print the content to the terminal.

## HTTP POST request with HttpURLConnection

The following example uses HttpURLConnection to create a POST
request.

Main.java
  

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.nio.charset.StandardCharsets;

HttpURLConnection con;

void main() throws IOException {

    var url = "https://httpbin.org/post";
    var urlParameters = "name=Jack&amp;occupation=programmer";
    byte[] postData = urlParameters.getBytes(StandardCharsets.UTF_8);

    try {

        var myurl = URI.create(url).toURL();
        con = (HttpURLConnection) myurl.openConnection();

        con.setDoOutput(true);
        con.setRequestMethod("POST");
        con.setRequestProperty("User-Agent", "Java client");
        con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

        try (var wr = new DataOutputStream(con.getOutputStream())) {

            wr.write(postData);
        }

        StringBuilder content;

        try (var br = new BufferedReader(
                new InputStreamReader(con.getInputStream()))) {

            String line;
            content = new StringBuilder();

            while ((line = br.readLine()) != null) {
                content.append(line);
                content.append(System.lineSeparator());
            }
        }

        System.out.println(content);

    } finally {

        con.disconnect();
    }
}

The example sends a POST request to https://httpbin.org/post.

var urlParameters = "name=Jack&amp;occupation=programmer";
byte[] postData = urlParameters.getBytes(StandardCharsets.UTF_8);

We are going to write these two key/value pairs. We transform the strings into
an array of bytes.

con.setDoOutput(true);

With the setDoOutput method we indicate that we are going to
write data to the URL connection.

con.setRequestMethod("POST");

The HTTP request type is set with setRequestMethod.

con.setRequestProperty("User-Agent", "Java client");

We set the user age property with the setRequestProperty method.

try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {

    wr.write(postData);
}

We write the bytes or our data to the URL connection.

StringBuilder content;

try (var br = new BufferedReader(
        new InputStreamReader(con.getInputStream()))) {

    String line;
    content = new StringBuilder();

    while ((line = br.readLine()) != null) {

        content.append(line);
        content.append(System.lineSeparator());
    }
}

System.out.println(content);

We read the input stream of the connection and write the retrieved content to
the console.

## HTTP GET request with Apache HttpClient

The following example uses Apache HttpClient to create
a GET request.

implementation 'org.apache.httpcomponents:httpclient:4.5.14'

For the examples, we need this Maven dependency.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;

void main() throws IOException {

    try (CloseableHttpClient client = HttpClientBuilder.create().build()) {

        var request = new HttpGet("https://webcode.me");
        HttpResponse response = client.execute(request);

        var bufReader = new BufferedReader(new InputStreamReader(
                response.getEntity().getContent()));

        var builder = new StringBuilder();

        String line;

        while ((line = bufReader.readLine()) != null) {
            
            builder.append(line);
            builder.append(System.lineSeparator());
        }

        System.out.println(builder);
    }
}

The example sends a GET request to read the home page of the specified webpage.

try (CloseableHttpClient client = HttpClientBuilder.create().build()) {
    ...
}

CloseableHttpClient is built with HttpClientBuilder.

var request = new HttpGet("https://webcode.me");

HttpGet is used to create an HTTP GET request.

HttpResponse response = client.execute(request);

We execute the request and get a response.

var bufReader = new BufferedReader(new InputStreamReader(
    response.getEntity().getContent()));

From the response object, we read the content.

while ((line = bufReader.readLine()) != null) {

    builder.append(line);
    builder.append(System.lineSeparator());
}

We read the content line by line and dynamically build a string message.

## HTTP POST with Apache HttpClient

The following example uses HttpPost to create a POST request.

Main.java
  

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;

void main() throws IOException {

    try (CloseableHttpClient client = HttpClientBuilder.create().build()) {

        var request = new HttpPost("https://httpbin.org/post");
        request.setHeader("User-Agent", "Java client");
        request.setEntity(new StringEntity("My test data"));

        HttpResponse response = client.execute(request);

        var bufReader = new BufferedReader(new InputStreamReader(
                response.getEntity().getContent()));

        var builder = new StringBuilder();

        String line;

        while ((line = bufReader.readLine()) != null) {

            builder.append(line);
            builder.append(System.lineSeparator());
        }

        System.out.println(builder);
    }
}

The example sends a POST request to https://httpbin.org/post.

var request = new HttpPost("https://httpbin.org/post");

HttpPost is used to create a POST request.

request.setEntity(new StringEntity("My test data"));

The data is set with the setEntity method.

request.setHeader("User-Agent", "Java client");

We set a header to the request with the setHeader method.

HttpResponse response = client.execute(request);

We execute the request and get the response. 

var bufReader = new BufferedReader(new InputStreamReader(
    response.getEntity().getContent()));

var builder = new StringBuilder();

String line;

while ((line = bufReader.readLine()) != null) {

    builder.append(line);
    builder.append(System.lineSeparator());
}

System.out.println(builder);

We read the response and print it to the terminal.

## Source

[Java HttpClient - language reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html)

In this article we have created a GET and a POST request in Java with 
HttpURLConnection and standard Java and Apache HttpClient.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).