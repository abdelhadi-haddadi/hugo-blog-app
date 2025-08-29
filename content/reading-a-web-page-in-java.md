+++
title = "Reading a web page in Java"
date = 2025-08-29T20:00:09.716+01:00
draft = false
description = "Reading a web page in Java is a tutorial that presents several ways to to read a web page in Java. It contains seven examples of downloading an HTTP source from a web page."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Reading a web page in Java

last modified January 27, 2024

 

Reading a web page in Java is a tutorial that presents several ways to to read a
web page in Java. It contains seven examples of downloading an HTTP source from 
a small web page. 

## Java reading web page tools

Java has built-in tools and third-party libraries for reading/downloading web
pages. In the examples, we use HttpClient, URL, JSoup, HtmlCleaner, Apache
HttpClient, Jetty HttpClient, and HtmlUnit.

In the following examples, we download HTML source from the [webcode.me](http://webcode.me) tiny web page.

## Java read web page with HttpClient

Java 11 introduced HttpClient library.

com/zetcode/ReadWebPage.java
  

package com.zetcode;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ReadWebPage {

    public static void main(String[] args) throws IOException, InterruptedException {

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("http://webcode.me"))
                .GET() // GET is default
                .build();

        HttpResponse&lt;String&gt; response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}

We use the Java HttpClient to download the web page.

HttpClient client = HttpClient.newHttpClient();

A new HttpClient is created with the newHttpClient
factory method.

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://webcode.me"))
    .build();

We build a synchronous request to the webpage. The default method is GET.

HttpResponse&lt;String&gt; response = client.send(request,
    HttpResponse.BodyHandlers.ofString());

System.out.println(response.body());

We send the request and retrieve the content of the response and print it 
to the console. We use HttpResponse.BodyHandlers.ofString
since we expect a string HTML response.

## Reading a web page with URL

URL represents a Uniform Resource Locator, a pointer to a resource
on the World Wide Web.

com/zetcode/ReadWebPageEx.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

public class ReadWebPageEx {

    public static void main(String[] args) throws IOException {

        var url = new URL("http://webcode.me");
        try (var br = new BufferedReader(new InputStreamReader(url.openStream()))) {

            String line;

            var sb = new StringBuilder();

            while ((line = br.readLine()) != null) {

                sb.append(line);
                sb.append(System.lineSeparator());
            }

            System.out.println(sb);
        }
    }
}

The code example reads the contents of a web page.

try (var br = new BufferedReader(new InputStreamReader(url.openStream()))) {

The openStream method opens a connection to the specified url and returns an
InputStream for reading from that connection. The InputStreamReader is 
a bridge from byte streams to character streams. It reads bytes and decodes them into characters 
using a specified charset. In addition, BufferedReader is used for better performance.

var sb = new StringBuilder();

while ((line = br.readLine()) != null) {

    sb.append(line);
    sb.append(System.lineSeparator());
}

The HTML data is read line by line with the readLine method. The source 
is appended to the StringBuilder.

System.out.println(sb);

In the end, the contents of the StringBuilder are printed to the terminal.

## Reading a web page with JSoup

*JSoup* is a popular Java HTML parser.

&lt;dependency&gt;
    &lt;groupId&gt;org.jsoup&lt;/groupId&gt;
    &lt;artifactId&gt;jsoup&lt;/artifactId&gt;
    &lt;version&gt;1.12.1&lt;/version&gt;
&lt;/dependency&gt;

We have used this Maven dependency.

com/zetcode/ReadWebPageEx2.java
  

package com.zetcode;

import org.jsoup.Jsoup;
import java.io.IOException;

public class ReadWebPageEx2 {

    public static void main(String[] args) throws IOException {

        String webPage = "http://webcode.me";

        String html = Jsoup.connect(webPage).get().html();

        System.out.println(html);
    }
}

The code example uses JSoup to download and print a tiny web page.

String html = Jsoup.connect(webPage).get().html();

The connect method connects to the specified web page.
The get method issues a GET request. Finally, the
html method retrieves the HTML source.

## Reading a web page with HtmlCleaner

*HtmlCleaner* is an open source HTML parser written in Java. 

&lt;dependency&gt;
    &lt;groupId&gt;net.sourceforge.htmlcleaner&lt;/groupId&gt;
    &lt;artifactId&gt;htmlcleaner&lt;/artifactId&gt;
    &lt;version&gt;2.16&lt;/version&gt;
&lt;/dependency&gt;

For this example, we use the htmlcleaner Maven dependency.

com/zetcode/ReadWebPageEx3.java
  

package com.zetcode;

import java.io.IOException;
import java.net.URL;
import org.htmlcleaner.CleanerProperties;
import org.htmlcleaner.HtmlCleaner;
import org.htmlcleaner.SimpleHtmlSerializer;
import org.htmlcleaner.TagNode;

public class ReadWebPageEx3 {

    public static void main(String[] args) throws IOException {

        var url = new URL("http://webcode.me");

        var props = new CleanerProperties();
        props.setOmitXmlDeclaration(true);

        var cleaner = new HtmlCleaner(props);
        TagNode node = cleaner.clean(url);

        var htmlSerializer = new SimpleHtmlSerializer(props);
        htmlSerializer.writeToStream(node, System.out);
    }
}

The example uses HtmlCleaner to download a web page.

var props = new CleanerProperties();
props.setOmitXmlDeclaration(true);

In the properties, we set to omit the XML declaration.

var htmlSerializer = new SimpleHtmlSerializer(props);
htmlSerializer.writeToStream(node, System.out);    

A SimpleHtmlSerializer creates the resulting HTML without 
any indenting and/or compacting.

## Reading a web page with Apache HttpClient

*Apache HttpClient* is a HTTP/1.1 compliant HTTP agent implementation. It
can scrape a web page using the request and response process. An HTTP client
implements the client side of the HTTP and HTTPS protocols.

&lt;dependency&gt;
    &lt;groupId&gt;org.apache.httpcomponents&lt;/groupId&gt;
    &lt;artifactId&gt;httpclient&lt;/artifactId&gt;
    &lt;version&gt;4.5.10&lt;/version&gt;
&lt;/dependency&gt;

We use this Maven dependency for the Apache HTTP client.

com/zetcode/ReadWebPageEx4.java
  

package com.zetcode;

import java.io.IOException;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

public class ReadWebPageEx4 {

    public static void main(String[] args) throws IOException {

        HttpGet request = null;

        try {

            String url = "http://webcode.me";
            HttpClient client = HttpClientBuilder.create().build();
            request = new HttpGet(url);

            request.addHeader("User-Agent", "Apache HTTPClient");
            HttpResponse response = client.execute(request);

            HttpEntity entity = response.getEntity();
            String content = EntityUtils.toString(entity);
            System.out.println(content);

        } finally {

            if (request != null) {

                request.releaseConnection();
            }
        }
    }
}

In the code example, we send a GET HTTP request to the specified
web page and receive an HTTP response. From the response, we 
read the HTML source.

HttpClient client = HttpClientBuilder.create().build();

An HttpClient is built.

request = new HttpGet(url);

HttpGet is a class for the HTTP GET method.

request.addHeader("User-Agent", "Apache HTTPClient");
HttpResponse response = client.execute(request);

A GET method is executed and an HttpResponse is
received.

HttpEntity entity = response.getEntity();
String content = EntityUtils.toString(entity);
System.out.println(content);

From the response, we get the content of the web page.

## Reading a web page with Jetty HttpClient

Jetty project has an HTTP client as well.

&lt;dependency&gt;
    &lt;groupId&gt;org.eclipse.jetty&lt;/groupId&gt;
    &lt;artifactId&gt;jetty-client&lt;/artifactId&gt;
    &lt;version&gt;9.4.25.v20191220&lt;/version&gt;
&lt;/dependency&gt;

This is a Maven dependency for the Jetty HTTP client.

com/zetcode/ReadWebPageEx5.java
  

package com.zetcode;

import org.eclipse.jetty.client.HttpClient;
import org.eclipse.jetty.client.api.ContentResponse;

public class ReadWebPageEx5 {

    public static void main(String[] args) throws Exception {

        HttpClient client = null;

        try {

            client = new HttpClient();
            client.start();

            String url = "http://webcode.me";

            ContentResponse res = client.GET(url);

            System.out.println(res.getContentAsString());

        } finally {

            if (client != null) {

                client.stop();
            }
        }
    }
}

In the example, we get the HTML source of a web page with the Jetty
HTTP client.

client = new HttpClient();
client.start();

An HttpClient is created and started.

ContentResponse res = client.GET(url);

A GET request is issued to the specified URL.

System.out.println(res.getContentAsString());

The content is retrieved from the response with the 
getContentAsString method.

## Reading a web page with HtmlUnit

*HtmlUnit* is a Java unit testing framework for testing Web based applications.

&lt;dependency&gt;
    &lt;groupId&gt;net.sourceforge.htmlunit&lt;/groupId&gt;
    &lt;artifactId&gt;htmlunit&lt;/artifactId&gt;
    &lt;version&gt;2.36.0&lt;/version&gt;
&lt;/dependency&gt;

We use this Maven dependency.

com/zetcode/ReadWebPageEx6.java
  

package com.zetcode;

import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebResponse;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import java.io.IOException;

public class ReadWebPageEx6 {

    public static void main(String[] args) throws IOException {

        try (var webClient = new WebClient()) {

            String url = "http://webcode.me";

            HtmlPage page = webClient.getPage(url);
            WebResponse response = page.getWebResponse();
            String content = response.getContentAsString();

            System.out.println(content);
        }
    }
}

The example downloads a web page and prints it using the HtmlUnit
library.

## Source

[Java HttpClient](https://docs.oracle.com/en/java/javase/21/docs/api/java.net.http/java/net/http/HttpClient.html)

In this article we have scraped a web page in Java using various tools,
including HttpClient, URL, JSoup, HtmlCleaner, Apache HttpClient, Jetty
HttpClient, and HtmlUnit.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).