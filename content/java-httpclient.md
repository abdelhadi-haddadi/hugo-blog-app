+++
title = "Java HttpClient"
date = 2025-08-29T19:59:03.200+01:00
draft = false
description = "Learn how to create HTTP requests in Java using the HttpClient library. This comprehensive tutorial covers GET and POST requests, query parameters, asynchronous requests, form data, and timeouts, with practical examples for building robust HTTP clients."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java HttpClient

Last modified: April 17, 2025

This Java HttpClient tutorial demonstrates how to use the HttpClient library in
Java to create HTTP requests. It covers constructing simple GET and POST
requests, along with advanced examples like handling query parameters,
asynchronous requests, form data, and timeouts, providing a comprehensive guide
for making HTTP calls.

## HTTP

The Hypertext Transfer Protocol (HTTP) is a stateless
application-layer protocol designed for distributed, collaborative, hypermedia
information systems. It underpins data communication on the World Wide Web,
enabling clients (such as web browsers or applications) to request resources
from servers and receive responses. HTTP supports various methods like GET,
POST, PUT, and DELETE, facilitating diverse operations such as retrieving web
pages, submitting forms, or updating server data.

In this tutorial, we use httpbin.org, a free, open-source HTTP
request and response service that provides endpoints for testing a wide range of
HTTP operations, including redirects, authentication, and data manipulation.
Additionally, we leverage webcode.me, a lightweight HTML page
specifically designed for testing HTTP requests, offering a simple and reliable
target for our examples.

    
    Method
    Description
    Common Use Cases
    Idempotent
    

    
    GET
    Requests a representation of a specified resource without modifying it.
    Retrieving web pages, fetching API data, accessing images or files.
    Yes
    
    
    POST
    Submits data to the server to create or update a resource.
    Submitting forms, uploading files, creating new database records.
    No
    
    
    PUT
    Replaces or updates a resource with the provided data.
    Updating user profiles, replacing files, modifying API resources.
    Yes
    
    
    DELETE
    Removes a specified resource from the server.
    Deleting user accounts, removing database entries, erasing files.
    Yes
    
    
    HEAD
    Requests the headers of a resource without retrieving its body.
    Checking resource metadata, verifying link validity, testing server responses.
    Yes
    

  

Idempotency in HTTP refers to the property of certain methods where repeating
the same request multiple times produces the same result without additional side
effects on the server. Idempotent methods, such as GET, PUT, DELETE, and HEAD,
ensure that subsequent identical requests do not alter the server's state beyond
the initial request, making them safe for retries in case of network issues. In
contrast, non-idempotent methods like POST may create new resources each time,
affecting the server's state with each request.

## HttpClient

Introduced in Java 11, the HttpClient library provides a modern,
flexible, and powerful API for making HTTP requests in Java. Before Java 11,
developers often used the rudimentary URLConnection class, which
lacked advanced features, or relied on third-party libraries like Apache
HttpClient or OkHttp for robust HTTP communication. The built-in
HttpClient simplifies HTTP operations with a streamlined, chainable
API and native support for synchronous and asynchronous requests.

The Java HttpClient supports both HTTP/1.1 and HTTP/2 protocols,
defaulting to HTTP/2 for better performance through features like multiplexing
and header compression. If a server does not support HTTP/2, the client
automatically downgrades to HTTP/1.1, ensuring compatibility. Additionally,
HttpClient offers advanced capabilities such as redirect handling,
authentication, and timeouts, making it a versatile tool for modern web
interactions.

client = HttpClient.newHttpClient();
client = HttpClient.newBuilder().build();

You can create an HttpClient instance in two ways: using
newHttpClient for a client with default settings, or
newBuilder for a customizable client where you can configure
options like timeouts, redirect policies, or proxy settings. These methods
provide a foundation for building HTTP requests tailored to your application's
needs.

## HttpClient Status

In the first example, we check the status of a web page.

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
                .GET() // GET is default
                .build();

        HttpResponse&lt;Void&gt; response = client.send(request,
                HttpResponse.BodyHandlers.discarding());

        System.out.println(response.statusCode());
    }
}

This example creates a GET request to the webcode.me website and
retrieves an HTTP response. From the response, we extract the status code.

HttpClient client = HttpClient.newHttpClient();

A new HttpClient instance is created.

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://webcode.me"))
    .GET() // GET is default
    .build();

A new HttpRequest is constructed. We specify the URI
and the request method. (If the method is unspecified, GET is used by default.)

HttpResponse response = client.send(request,
    HttpResponse.BodyHandlers.discarding());

We send the request. As we are not interested in the response body,
we discard it using HttpResponse.BodyHandlers.discarding.

System.out.println(response.statusCode());

We retrieve the status code using the statusCode method.

## HEAD Request

A HEAD request is a GET request without a message body.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newHttpClient()) {

        var request = HttpRequest.newBuilder(URI.create("https://webcode.me"))
                .method("HEAD", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse&lt;Void&gt; response = client.send(request,
                HttpResponse.BodyHandlers.discarding());

        HttpHeaders headers = response.headers();

        headers.map().forEach((key, values) -&gt; {
            System.out.printf("%s: %s%n", key, values);
        });
    }
}

This example constructs a HEAD request.

var request = HttpRequest.newBuilder(URI.create("https://webcode.me"))
    .method("HEAD", HttpRequest.BodyPublishers.noBody())
    .build();

We create a HEAD request. We use HttpRequest.BodyPublishers.noBody
since the request contains no body.

HttpResponse response = client.send(request,
    HttpResponse.BodyHandlers.discarding());

We send the request and receive a response.

HttpHeaders headers = response.headers();

headers.map().forEach((key, values) -&gt; {
    System.out.printf("%s: %s%n", key, values);
});

We obtain the headers from the response and display them on the console.

$ java Main.java
accept-ranges: [bytes]
connection: [keep-alive]
content-length: [395]
content-type: [text/html]
date: [Wed, 09 Oct 2024 13:22:09 GMT]
etag: ["64f33c9f-18b"]
last-modified: [Sat, 02 Sep 2023 13:46:07 GMT]
server: [nginx/1.18.0 (Ubuntu)]

## GET Request

The HTTP GET method requests a representation of a specified resource.
Requests using GET should only retrieve data.

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

We generate a GET request to the webcode.me webpage.

try (HttpClient client = HttpClient.newHttpClient()) {

A new HttpClient is instantiated with the newHttpClient
factory method.

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://webcode.me"))
    .build();

We construct a synchronous request to the webpage. The default method is GET.

HttpResponse response = client.send(request,
    HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());

We send the request, retrieve the response content, and print it to the
console. We use HttpResponse.BodyHandlers.ofString since we expect
an HTML string response.

## File BodyHandler

With a file body handler, we can conveniently save the response
text to a file.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Path;
import java.nio.file.Paths;

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://webcode.me"))
                .GET() // GET is default
                .build();

        String fileName = "src/main/resources/index.html";

        HttpResponse&lt;Path&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofFile(Paths.get(fileName)));

        System.out.println(response.statusCode());
    }
}

This example saves the HTML page to src/main/resources/index.html.

String fileName = "src/main/resources/index.html";

HttpResponse&lt;Path&gt; response = client.send(request,
        HttpResponse.BodyHandlers.ofFile(Paths.get(fileName)));

The file body handler is created using HttpResponse.BodyHandlers.ofFile.

## POST Request

The HTTP POST method transmits data to the server. It is commonly used for
uploading files or submitting completed web forms.

&lt;dependency&gt;
    &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
    &lt;artifactId&gt;gson&lt;/artifactId&gt;
    &lt;version&gt;2.11.0&lt;/version&gt;
&lt;/dependency&gt;

We require the gson dependency.

Main.java
  

import com.google.gson.Gson;

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

    Gson gson = new Gson();
    String requestBody = gson.toJson(values);

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
    put("occupation", "gardener");
}};

Gson gson = new Gson();
String requestBody = gson.toJson(values);

First, we construct the request body using Gson.

try (HttpClient client = HttpClient.newHttpClient()) {
    
    HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://httpbin.org/post"))
            .POST(HttpRequest.BodyPublishers.ofString(requestBody))
            .build();
    ...
}

We create the POST request. With BodyPublishers.ofString, we
generate a new BodyPublisher. It converts high-level Java objects
into a flow of byte buffers suitable for sending as a request body.

HttpResponse&lt;String&gt; response = client.send(request,
        HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());

We send the request and retrieve the response.

## HttpClient Redirect

Redirection involves forwarding one URL to another. The HTTP response status
code 301 Moved Permanently indicates a permanent URL redirection, while
302 Found signifies a temporary redirection.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

// toggle HttpClient.Redirect.ALWAYS / HttpClient.Redirect.NEVER

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.ALWAYS).build()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/redirect/3"))
                .GET()
                .build();

        HttpResponse&lt;Void&gt; response = client.send(request,
                HttpResponse.BodyHandlers.discarding());

        System.out.println(response.statusCode());
    }
}

In this example, we send a request that is redirected.

try (HttpClient client = HttpClient.newBuilder()
        .followRedirects(HttpClient.Redirect.ALWAYS).build()) {
    ...
}

To configure redirection, we use the followRedirects method.

HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://httpbin.org/redirect/3"))
        .GET()
        .build();

The https://httpbin.org/redirect/3 URL is a test endpoint that
redirects the request three times.

HttpResponse response = client.send(request,
        HttpResponse.BodyHandlers.discarding());

System.out.println(response.statusCode());

The request is sent, and the response status is displayed.

## HttpClient Read Favicon

The following example retrieves a small image from a website.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://webcode.me/favicon.ico"))
                .build();

        HttpResponse&lt;byte[]&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofByteArray());

        byte[] data = response.body();

        int i = 0;
        for (byte c : data) {

            System.out.printf("%02x ", c);

            i++;

            if (i % 10 == 0) {

                System.out.println();
            }
        }
    }
}

This example fetches a favicon from a website and prints its contents in
hexadecimal format.

HttpResponse&lt;byte[]&gt; response = client.send(request,
    HttpResponse.BodyHandlers.ofByteArray());

Using HttpResponse.BodyHandlers.ofByteArray, we read binary data.

byte[] data = response.body();

We extract the array of bytes from the response body.

int i = 0;
for (byte c : data) {

    System.out.printf("%02x ", c);

    i++;

    if (i % 10 == 0) {

        System.out.println();
    }
}

In a for loop, we print the bytes in hexadecimal format.

## GET Request with Query Parameters

This example demonstrates how to include query parameters in a GET request.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

void main() throws IOException, InterruptedException {

    String query = "name=" + URLEncoder.encode("John Doe", StandardCharsets.UTF_8) +
                   "&amp;occupation=" + URLEncoder.encode("gardener", StandardCharsets.UTF_8);

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/get?" + query))
                .GET()
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}

This example sends a GET request with query parameters to https://httpbin.org/get.

String query = "name=" + URLEncoder.encode("John Doe", StandardCharsets.UTF_8) +
               "&amp;occupation=" + URLEncoder.encode("gardener", StandardCharsets.UTF_8);

We construct the query string, encoding parameters to handle special characters.

HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://httpbin.org/get?" + query))
        .GET()
        .build();

The query string is appended to the URL in the GET request.

## Asynchronous GET Request

This example shows how to perform an asynchronous GET request using HttpClient.

Main.java
  

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

void main() {

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://webcode.me"))
                .GET()
                .build();

        CompletableFuture&lt;HttpResponse&lt;String&gt;&gt; responseFuture = client.sendAsync(request,
                HttpResponse.BodyHandlers.ofString());

        responseFuture.thenAccept(response -&gt; {
            System.out.println("Status Code: " + response.statusCode());
            System.out.println("Body: " + response.body());
        }).join();
    }
}

This example sends an asynchronous GET request and processes the response when
it arrives.

CompletableFuture&lt;HttpResponse&lt;String&gt;&gt; responseFuture = client.sendAsync(request,
        HttpResponse.BodyHandlers.ofString());

The sendAsync method returns a CompletableFuture for
asynchronous processing.

responseFuture.thenAccept(response -&gt; {
    System.out.println("Status Code: " + response.statusCode());
    System.out.println("Body: " + response.body());
}).join();

We handle the response using thenAccept and wait for completion
with join.

## POST Request with Form Data

This example demonstrates sending a POST request with form data.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

void main() throws IOException, InterruptedException {

    Map&lt;String, String&gt; formData = new HashMap&lt;&gt;();
    formData.put("username", "john_doe");
    formData.put("email", "john@example.com");

    String requestBody = formData.entrySet().stream()
            .map(entry -&gt; URLEncoder.encode(entry.getKey(), 
                StandardCharsets.UTF_8) + "=" + URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8))
            .collect(Collectors.joining("&amp;"));

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/post"))
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}

This example sends a POST request with form data to https://httpbin.org/post.

String requestBody = formData.entrySet().stream()
        .map(entry -&gt; URLEncoder.encode(entry.getKey(), StandardCharsets.UTF_8) + "=" +
                      URLEncoder.encode(entry.getValue(), StandardCharsets.UTF_8))
        .collect(Collectors.joining("&amp;"));

We encode form data as a URL-encoded string.

.header("Content-Type", "application/x-www-form-urlencoded")

We set the Content-Type header to indicate form data.

## HttpClient with Timeout

This example shows how to configure a timeout for an HTTP request.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

void main() throws InterruptedException {

    try (HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .build()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/delay/10"))
                .timeout(Duration.ofSeconds(3))
                .GET()
                .build();

        try {
            HttpResponse&lt;String&gt; response = client.send(request,
                    HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
        } catch (IOException e) {
            System.err.println("Request timed out: " + e.getMessage());
        }
    }
}

This example sets a connection timeout and a request timeout, handling a timeout
exception.

try (HttpClient client = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(5))
        .build()) {

We set a 5-second connection timeout for the client.

.timeout(Duration.ofSeconds(3))

We set a 3-second timeout for the request.

try {
    HttpResponse&lt;String&gt; response = client.send(request,
            HttpResponse.BodyHandlers.ofString());
    System.out.println(response.body());
} catch (IOException e) {
    System.err.println("Request timed out: " + e.getMessage());
}

We catch and handle timeout exceptions.

## PUT Request

This example demonstrates how to send a PUT request to update data on a server.

Main.java
  

import com.google.gson.Gson;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.HashMap;

void main() throws IOException, InterruptedException {

    var values = new HashMap&lt;String, String&gt;() {{
        put("name", "Jane Doe");
        put("occupation", "developer");
    }};

    Gson gson = new Gson();
    String requestBody = gson.toJson(values);

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/put"))
                .header("Content-Type", "application/json")
                .method("PUT", HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}

This example sends a PUT request with JSON data to https://httpbin.org/put.

var values = new HashMap&lt;String, String&gt;() {{
    put("name", "Jane Doe");
    put("occupation", "developer");
}};

Gson gson = new Gson();
String requestBody = gson.toJson(values);

We create a JSON payload using Gson for the PUT request.

.header("Content-Type", "application/json")

We set the Content-Type header to indicate JSON data.

.method("PUT", HttpRequest.BodyPublishers.ofString(requestBody))

We specify the PUT method and include the JSON payload in the request body.

## Handling JSON Response

This example shows how to parse a JSON response from a GET request.

Main.java
  

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/get"))
                .GET()
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        Gson gson = new Gson();
        JsonObject jsonResponse = gson.fromJson(response.body(), JsonObject.class);

        String url = jsonResponse.get("url").getAsString();
        System.out.println("Requested URL: " + url);
    }
}

This example sends a GET request and parses the JSON response to extract
specific data.

HttpResponse&lt;String&gt; response = client.send(request,
        HttpResponse.BodyHandlers.ofString());

We retrieve the response body as a string.

Gson gson = new Gson();
JsonObject jsonResponse = gson.fromJson(response.body(), JsonObject.class);

We use Gson to parse the response body into a JSON object.

String url = jsonResponse.get("url").getAsString();
System.out.println("Requested URL: " + url);

We extract and print the "url" field from the JSON response.

## Custom Headers

This example demonstrates how to add custom headers to an HTTP request.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/headers"))
                .header("X-Custom-Header", "MyCustomValue")
                .header("User-Agent", "Java HttpClient client")
                .GET()
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}

This example sends a GET request with custom headers to
https://httpbin.org/headers.

.header("X-Custom-Header", "MyCustomValue")

We add a custom header named X-Custom-Header with a specific value.

.header("User-Agent", "Java HttpClient client")

We override the default User-Agent header with a custom value.

HttpResponse&lt;String&gt; response = client.send(request,
        HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());

We send the request and print the response, which includes the headers sent.

## Streaming Response Data

This example shows how to handle a response as a stream of lines.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.stream.Stream;

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/stream/5"))
                .GET()
                .build();

        HttpResponse&lt;Stream&lt;String&gt;&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofLines());

        response.body().forEach(line -&gt; System.out.println("Line: " + line));
    }
}

This example sends a GET request and processes the response as a stream of lines.

HttpResponse&lt;Stream&lt;String&gt;&gt; response = client.send(request,
        HttpResponse.BodyHandlers.ofLines());

We use BodyHandlers.ofLines to handle the response as a stream of
strings.

response.body().forEach(line -&gt; System.out.println("Line: " + line));

We iterate over the stream of lines and print each one.

## DELETE Request

This example demonstrates how to send a DELETE request to remove a resource from
a server.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

void main() throws IOException, InterruptedException {

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/delete"))
                .method("DELETE", HttpRequest.BodyPublishers.noBody())
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
}

This example sends a DELETE request to https://httpbin.org/delete and prints the response.

HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://httpbin.org/delete"))
        .method("DELETE", HttpRequest.BodyPublishers.noBody())
        .build();

We create a DELETE request with no body using BodyPublishers.noBody.

HttpResponse&lt;String&gt; response = client.send(request,
        HttpResponse.BodyHandlers.ofString());

We send the request and retrieve the response as a string.

System.out.println("Status Code: " + response.statusCode());
System.out.println("Response: " + response.body());

We print the status code and response body to verify the request's outcome.

## HTTP Basic Authentication

This example shows how to include HTTP Basic Authentication in a request.

Main.java
  

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;

void main() throws IOException, InterruptedException {

    String credentials = Base64.getEncoder().encodeToString("user:passwd".getBytes());

    try (HttpClient client = HttpClient.newHttpClient()) {

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://httpbin.org/basic-auth/user/passwd"))
                .header("Authorization", "Basic " + credentials)
                .GET()
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println("Status Code: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
}

This example sends a GET request with Basic Authentication to https://httpbin.org/basic-auth/user/passwd.

String credentials = Base64.getEncoder().encodeToString("user:passwd".getBytes());

We encode the username and password in Base64 for Basic Authentication.

.header("Authorization", "Basic " + credentials)

We add the Authorization header with the encoded credentials.

HttpResponse&lt;String&gt; response = client.send(request,
        HttpResponse.BodyHandlers.ofString());

System.out.println("Status Code: " + response.statusCode());
System.out.println("Response: " + response.body());

We send the request and print the status code and response body.

## Concurrent Requests

This example demonstrates how to send multiple HTTP requests concurrently using HttpClient.

Main.java
  

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

void main() {

    try (HttpClient client = HttpClient.newHttpClient()) {

        List&lt;HttpRequest&gt; requests = List.of(
                HttpRequest.newBuilder().uri(URI.create("https://httpbin.org/get")).GET().build(),
                HttpRequest.newBuilder().uri(URI.create("https://webcode.me")).GET().build()
        );

        List&lt;CompletableFuture&lt;HttpResponse&lt;String&gt;&gt;&gt; futures = requests.stream()
                .map(request -&gt; client.sendAsync(request, HttpResponse.BodyHandlers.ofString()))
                .toList();

        CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

        for (CompletableFuture&lt;HttpResponse&lt;String&gt;&gt; future : futures) {
            HttpResponse&lt;String&gt; response = future.join();
            System.out.println("Status: " + response.statusCode() + ", URI: " + response.uri());
        }
    }
}

This example sends multiple GET requests concurrently and processes their responses.

List&lt;HttpRequest&gt; requests = List.of(
    HttpRequest.newBuilder().uri(URI.create("https://httpbin.org/get")).GET().build(),
    HttpRequest.newBuilder().uri(URI.create("https://webcode.me")).GET().build()
);

We create a list of HTTP requests to be sent concurrently.

List&lt;CompletableFuture&lt;HttpResponse&lt;String&gt;&gt;&gt; futures = requests.stream()
        .map(request -&gt; client.sendAsync(request, HttpResponse.BodyHandlers.ofString()))
        .toList();

We map each request to an asynchronous CompletableFuture using sendAsync.

CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

for (CompletableFuture&lt;HttpResponse&lt;String&gt;&gt; future : futures) {
    HttpResponse&lt;String&gt; response = future.join();
    System.out.println("Status: " + response.statusCode() + ", URI: " + response.uri());
}

We wait for all requests to complete and print their status codes and URIs.

## Source

[Java HttpClient - Language Reference](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html)

In this article, we have utilized Java HttpClient to create HTTP requests.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than eight years of experience in teaching programming.

View [all Java tutorials](/all/#java).