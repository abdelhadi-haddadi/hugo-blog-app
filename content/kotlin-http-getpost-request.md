+++
title = "Kotlin HTTP GET/POST request"
date = 2025-08-29T20:02:36.142+01:00
draft = false
description = "Kotlin HTTP GET/POST request tutorial shows how to send a GET and a POST request in Kotlin. We use HttpClient and Fuel library."
image = ""
imageBig = ""
categories = ["kotlin"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Kotlin HTTP GET/POST request

last modified January 29, 2024

This article shows how to send a GET and a POST request in Kotlin. We use
HttpClient and Fuel library.

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

## Kotlin GET request with HttpClient

HttpClient is a tool for generating http requests in Java.

GetRequest.kt
  

package com.zetcode

import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

fun main() {
    val client = HttpClient.newBuilder().build();
    val request = HttpRequest.newBuilder()
        .uri(URI.create("http://webcode.me"))
        .build();
        
    val response = client.send(request, HttpResponse.BodyHandlers.ofString());
    println(response.body())
}

We create a GET request to the webcode.me webpage.

val client = HttpClient.newBuilder().build();

A client is created.

val request = HttpRequest.newBuilder()
    .uri(URI.create("http://webcode.me"))
    .build();

We build a synchronous request to the webpage. The default method is GET.

val response = client.send(request, HttpResponse.BodyHandlers.ofString());
println(response.body())

We send the request, retrieve the content of the response, and print it to the
console.

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

## GET query parameters with HttpClient

The following example appends some query parameters to the URL.

GetRequestParams.kt
  

package com.zetcode

import java.net.URI
import java.net.URLEncoder
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

fun String.utf8(): String = URLEncoder.encode(this, "UTF-8")

fun main() {

    val params = mapOf("name" to "John Doe", "occupation" to "gardener")
    val urlParams = params.map {(k, v) -&gt; "${(k.utf8())}=${v.utf8()}"}
        .joinToString("&amp;")

    val client = HttpClient.newBuilder().build();
    val request = HttpRequest.newBuilder()
        .uri(URI.create("https://httpbin.org/get?${urlParams}"))
        .build();
        
    val response = client.send(request, HttpResponse.BodyHandlers.ofString());
    println(response.body())
}

We create a GET request to the httpbin.org/get with some URL 
parameters.

fun String.utf8(): String = URLEncoder.encode(this, "UTF-8")

This is a string extension method for encoding URL paramaters.

val params = mapOf("name" to "John Doe", "occupation" to "gardener")
val urlParams = params.map {(k, v) -&gt; "${(k.utf8())}=${v.utf8()}"}
    .joinToString("&amp;")

We have a map of values. We endcode them for the URL path with the custom 
extension method.

val request = HttpRequest.newBuilder()
    .uri(URI.create("https://httpbin.org/get?${urlParams}"))
    .build();

We append the parameters to the URL.

{
  "args": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "headers": {
    "Host": "httpbin.org", 
    "User-Agent": "Java-http-client/14.0.1", 
    "X-Amzn-Trace-Id": "Root=1-6000269f-2389dad80db13d002a8a9003"
  }, 
  ... 
  "url": "https://httpbin.org/get?name=John+Doe&amp;amp;occupation=gardener"
}

## Kotlin POST JSON data request with HttpClient

The following example sends a POST request with HttpClient. The data is sent 
in JSON format.

dependencies {
    testImplementation(kotlin("test-junit"))
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.12.1")
}

For this example, we need the jackson-module-kotlin dependency.

PostRequestJson.kt
  

package com.zetcode

import com.fasterxml.jackson.databind.ObjectMapper
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

fun main() {

    val values = mapOf("name" to "John Doe", "occupation" to "gardener")

    val objectMapper = ObjectMapper()
    val requestBody: String = objectMapper
        .writeValueAsString(values)

    val client = HttpClient.newBuilder().build();
    val request = HttpRequest.newBuilder()
        .uri(URI.create("https://httpbin.org/post"))
        .POST(HttpRequest.BodyPublishers.ofString(requestBody))
        .build()
    val response = client.send(request, HttpResponse.BodyHandlers.ofString());
    println(response.body())
}

We generate a POST request to the httpbin.org/post webpage. 
The post data are taken from a map and transformed into a string with 
Jackson's ObjectMapper.

val request = HttpRequest.newBuilder()
    .uri(URI.create("https://httpbin.org/post"))
    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
    .build()

A POST request is generated via the POST method.

[Success: {
  "args": {}, 
  "data": "{\"name\":\"John Doe\",\"occupation\":\"gardener\"}", 
  "files": {}, 
  "form": {}, 
  "headers": {
    "Accept": "text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2", 
    "Content-Length": "43", 
    "Content-Type": "application/json", 
    "Host": "httpbin.org", 
    "User-Agent": "Java/14.0.1", 
    "X-Amzn-Trace-Id": "Root=1-60004591-5248fddb69a2221616147220"
  }, 
  "json": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "origin": "188.167.250.74", 
  "url": "https://httpbin.org/post"
}
]

## Kotlin POST FORM data request with HttpClient

With application/x-www-form-urlencoded the data is sent in the body 
of the request; the keys and values are encoded in key-value tuples separated by
'&amp;', with a '=' between the key and the value. 

PostRequstForm.kt
  

package com.zetcode

import java.net.URI
import java.net.URLEncoder
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

fun main() {

    val values = mapOf("name" to "John Doe", "occupation" to "gardener")

    val client = HttpClient.newBuilder().build();
    val request = HttpRequest.newBuilder()
        .uri(URI.create("https://httpbin.org/post"))
        .POST(formData(values))
        .header("Content-Type", "application/x-www-form-urlencoded")
        .build()
    val response = client.send(request, HttpResponse.BodyHandlers.ofString());
    println(response.body())
}

fun String.utf8(): String = URLEncoder.encode(this, "UTF-8")

fun formData(data: Map&lt;String, String&gt;): HttpRequest.BodyPublisher? {

    val res = data.map {(k, v) -&gt; "${(k.utf8())}=${v.utf8()}"}
        .joinToString("&amp;")

    return HttpRequest.BodyPublishers.ofString(res)
}

We generate a POST request with FORM data to httpbin.org/post.

.header("Content-Type", "application/x-www-form-urlencoded")

We set the content type header to
application/x-www-form-urlencoded.

fun String.utf8(): String = URLEncoder.encode(this, "UTF-8")

fun formData(data: Map&lt;String, String&gt;): HttpRequest.BodyPublisher? {

    val res = data.map {(k, v) -&gt; "${(k.utf8())}=${v.utf8()}"}
        .joinToString("&amp;")

    return HttpRequest.BodyPublishers.ofString(res)
}

With the String.uft8 and formData helper functions, we
create a body publisher with url encoded values.

{
  "args": {}, 
  "data": "", 
  "files": {}, 
  "form": {
    "name": "John Doe", 
    "occupation": "gardener"
  }, 
  "headers": {
    "Content-Length": "33", 
    "Content-Type": "application/x-www-form-urlencoded", 
    "Host": "httpbin.org", 
    "User-Agent": "Java-http-client/14.0.1", 
    "X-Amzn-Trace-Id": "Root=1-600030bb-7c7f4d026883523b438f2e63"
  }, 
  "json": null, 
  ...
  "url": "https://httpbin.org/post"
}

## Kotlin GET request with Fuel

Fuel is an easy-to-use HTTP networking library for Kotlin.

dependencies {
    testImplementation(kotlin("test-junit"))
    implementation("com.github.kittinunf.fuel:fuel:2.3.1")
}

We need to add the fuel dependency.

FuelGetRequest.kt
  

package com.zetcode

import com.github.kittinunf.fuel.httpGet

fun main() {

    val (_, _, result) = "http://webcode.me".httpGet().responseString()
    println(result)
}

The example sends a simple GET request to webcode.me.

## GET query parameters with Fuel

The following example sends some query parameters with the GET request.

FuelGetRequestQueryParams.kt
  

package com.zetcode

import com.github.kittinunf.fuel.httpGet

fun main() {

    val (_, _, result) = "http://httpbin.org/get"
        .httpGet(listOf("name" to "John Doe", "occupation" to "gardener"))
        .responseString()
    println(result)
}

The Fuel library automatically takes care of encoding the parameters in 
httpGet.

## Kotlin POST JSON data request with Fuel

We set a POST request with JSON data. This time we use the Gson library.

dependencies {
    testImplementation(kotlin("test-junit"))
    implementation("com.github.kittinunf.fuel:fuel:2.3.1")
    implementation("com.github.kittinunf.fuel:fuel-gson:2.3.1")
    implementation("com.google.code.gson:gson:2.8.6")
}

We have additional dependencies for the Gson library.

FuelPostRequestJson.kt
  

package com.zetcode

import com.github.kittinunf.fuel.core.extensions.jsonBody
import com.github.kittinunf.fuel.httpPost
import com.google.gson.Gson

data class User(var name: String, var occupation: String)

fun main() {

    val user = User("John Doe", "gardener")

    val (_, _, result) = "https://httpbin.org/post".httpPost()
        .jsonBody(Gson().toJson(user).toString())
        .responseString()
    println(result)
}

We serialize the user object into a JSON string with the toJson
method. We set a JSON body with the jsonBody method.

## Kotlin POST FORM data request with Fuel

In the following example, we send a POST request with FORM data.

FuelPostRequestForm.kt
  

package com.zetcode

import com.github.kittinunf.fuel.httpPost

fun main() {

    val (_, _, result) = "https://httpbin.org/post"
        .httpPost(listOf("name" to "John Doe", "occupation" to "gardener"))
        .responseString()
    println(result)
}

Fuel automatically tranforms the data to application/x-www-form-urlencoded
content type in httpPost.

## Source

[Kotlin Fuel Github page](https://github.com/kittinunf/fuel)

This article showed how to send a GET and a POST request in Kotlin. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Kotlin tutorials](/kotlin/).