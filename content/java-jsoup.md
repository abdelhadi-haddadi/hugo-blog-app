+++
title = "Java JSoup"
date = 2025-08-29T19:59:43.599+01:00
draft = false
description = "Java JSoup tutorial is an introductory guide to the JSoup HTML parser. It shows how to extract and manipulate HTML data."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java JSoup

last modified July 4, 2024

 

JSoup tutorial an introductory guide to the JSoup HTML parser. In the tutorial
we are going to parse HTML data from a HTML string, local HTML file, and a web
page. We are going to sanitize data and perform a Google search.

JSoup is a Java library for extracting and manipulating HTML data. It
implements the HTML5 specification, and parses HTML to the same DOM as modern
browsers.

With JSoup we are able to:

- scrape and parse HTML from a URL, file, or string

- find and extract data, using DOM traversal or CSS selectors

- manipulate the HTML elements, attributes, and text

- clean user-submitted content against a safe white-list, to prevent XSS attacks

- output tidy HTML

## Dependency

In the examples of this tutorial, we use the following Maven dependency.

&lt;dependency&gt;
    &lt;groupId&gt;org.jsoup&lt;/groupId&gt;
    &lt;artifactId&gt;jsoup&lt;/artifactId&gt;
    &lt;version&gt;1.17.2&lt;/version&gt;
&lt;/dependency&gt;

JSoup class provides the core public access point to the jsoup
functionality via its static methods. For instance, the clean
methods sanitize HTML code, the connect method creates a connection
to URL, or parse methods parse HTML content.

## HTML file

In some of the examples, we use the following HTML file:

words.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;List of words&lt;/p&gt;
&lt;ul&gt;
    &lt;li&gt;dark&lt;/li&gt;
    &lt;li&gt;smart&lt;/li&gt;
    &lt;li&gt;war&lt;/li&gt;
    &lt;li&gt;cloud&lt;/li&gt;
    &lt;li&gt;park&lt;/li&gt;
    &lt;li&gt;cup&lt;/li&gt;
    &lt;li&gt;worm&lt;/li&gt;
    &lt;li&gt;water&lt;/li&gt;
    &lt;li&gt;rock&lt;/li&gt;
    &lt;li&gt;warm&lt;/li&gt;
&lt;/ul&gt;
&lt;footer&gt;footer for words&lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;

## Parse HTML string

The JSoup.parse method perses an HTML string into a document.

Main.java
  

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

void main() {

    String htmlString = """
            &lt;html&gt;&lt;head&gt;&lt;title&gt;My title&lt;/title&gt;&lt;/head&gt;
            &lt;body&gt;Body content&lt;/body&gt;&lt;/html&gt;""";

    Document doc = Jsoup.parse(htmlString);
    String title = doc.title();
    String body = doc.body().text();

    System.out.printf("Title: %s%n", title);
    System.out.printf("Body: %s", body);
}

The example parses a HTML string and outputs its title and body content.

String htmlString = """
    &lt;html&gt;&lt;head&gt;&lt;title&gt;My title&lt;/title&gt;&lt;/head&gt;
    &lt;body&gt;Body content&lt;/body&gt;&lt;/html&gt;""";

This string contains simple HTML data.

Document doc = Jsoup.parse(htmlString);

With the Jsoup's parse method, we parse the HTML string. The method
returns a HTML document.

String title = doc.title();

The document's title method gets the string contents of the
document's title element.

String body = doc.body().text();

The document's body method returns the body element; its
text method gets the text of the element.

## JSoup parse local HTML file

In the second example, we are going to parse a local HTML file. We use the
overloaded Jsoup.parse method that takes a File object
as its first parameter.

src/main/resources/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;title&gt;My title&lt;/title&gt;
        &lt;meta charset="UTF-8"&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;div id="mydiv"&gt;Contents of a div element&lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;

For the example, we use the above HTML file.

Main.java
  

import java.io.File;
import java.io.IOException;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

void main() throws IOException {

    String fileName = "src/main/resources/index.html";

    Document doc = Jsoup.parse(new File(fileName), "utf-8");
    Optional&lt;Element&gt; divTag = Optional.ofNullable(doc.getElementById("mydiv"));

    divTag.ifPresent(e -&gt; System.out.println(e.text()));
}

The example parses the index.html file, which is located 
in the src/main/resources/ directory.

Document doc = Jsoup.parse(new File(fileName), "utf-8"); 

We parse the HTML file with the Jsoup.parse method.

Optional&lt;Element&gt; divTag = Optional.ofNullable(doc.getElementById("mydiv"));

With the document's getElementById method, we get the element by
its ID.

divTag.ifPresent(e -&gt; System.out.println(e.text()));

The text of the tag is retrieved with the element's text method.

## Read web site's title

In the following example, we scrape and parse a web page and retrieve the
content of the title element.

Main.java
  

import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

void main() throws IOException {
    
    String url = "https://webcode.me";
    
    Document doc = Jsoup.connect(url).get();
    String title = doc.title();
    System.out.println(title);
}

In the code example, we read the title of a specified web page.

Document doc = Jsoup.connect(url).get();

The Jsoup's connect method creates a connection to 
the given URL. The get method executes a GET request 
and parses the result; it returns a HTML document.

String title = doc.title();

With the document's title method, we get the title
of the HTML document.

## Read web page

The next example retrieves the HTML source of a web page. 

Main.java
  

import java.io.IOException;
import org.jsoup.Jsoup;

void main() throws IOException {

    String webPage = "https://webcode.me";
    String html = Jsoup.connect(webPage).get().html();

    System.out.println(html);
}

The example prints the HTML of a web page.

String html = Jsoup.connect(webPage).get().html();

The html method returns the HTML of an element; in our case the
HTML source of the whole document.

## Metadata information

Meta information of a HTML document provides structured metadata about a Web
page, such as its description and keywords.

Main.java
  

import java.io.IOException;
import java.util.Optional;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

void main() throws IOException {

    String url = "https://jsoup.org";
    Document doc = Jsoup.connect(url).get();

    Optional&lt;Element&gt; el1 = Optional.ofNullable(doc.select("meta[name=description]").first());
    el1.ifPresent(e -&gt; System.out.println(e.attr("content")));

    Optional&lt;Element&gt; el2 = Optional.ofNullable(doc.select("meta[name=keywords]").first());
    el2.ifPresent(e -&gt; System.out.println(e.attr("content")));
}

The code example retrieves meta information about a specified web page.

Optional&lt;Element&gt; el2 = Optional.ofNullable(doc.select("meta[name=keywords]").first());
el2.ifPresent(e -&gt; System.out.println(e.attr("content")));

The document's select method finds elements that match the 
given query. The first method returns the first matched element.
With the attr method, we get the value of the content
attribute. We use Optional to handle possible NullPointerExceptions. 

## Get all tags

To get all tags, we pass the * character to the select
method.

Main.java
  

import org.jsoup.Jsoup;

import java.io.File;
import java.io.IOException;

void main() throws IOException {

    var fileName = "src/main/resources/words.html";
    var myFile = new File(fileName);

    var doc = Jsoup.parse(myFile, "UTF-8");
    var all = doc.body().select("*");

    all.forEach(e -&gt; System.out.println(e.tagName()));
}

We get all the tags from the words.html document.

var all = doc.body().select("*");

We get all elements.

all.forEach(e -&gt; System.out.println(e.tagName()));

We go over all the elements and print their tag names with tagName.

## The text method

The text method gets the combined text of this element and all its
children. The whitespace is normalized and trimmed.

Main.java
  

import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

void main() throws IOException {

    var fileName = "src/main/resources/words.html";
    var myFile = new File(fileName);

    var doc = Jsoup.parse(myFile, "UTF-8");

    System.out.println(doc.text());

    System.out.println("---------------------------");
    System.out.println(doc.body().text());

    System.out.println("---------------------------");
    Optional&lt;Element&gt; e1 = Optional.ofNullable(doc.select("body&gt;p").first());
    e1.ifPresent(e -&gt; System.out.println(e.text()));

    System.out.println("---------------------------");
    Optional&lt;Element&gt; e2 = Optional.ofNullable(doc.select("body&gt;ul").first());
    e2.ifPresent(e -&gt; System.out.println(e.text()));

    System.out.println("---------------------------");
    e2.ifPresent(e -&gt; {
        Elements lis = e.children();

        Optional&lt;Element&gt; ch1 = Optional.ofNullable(lis.first());
        ch1.ifPresent(ce -&gt; System.out.println(ce.text()));

        Optional&lt;Element&gt; ch2 = Optional.ofNullable(lis.last());
        ch2.ifPresent(ce -&gt; System.out.println(ce.text()));
    });
}

In the example, we get the text data from the whole document, body, paragraph, 
unordered list, and first and last list item.

Document title List of words dark smart cloud park cup water rock footer for words
---------------------------
List of words dark smart cloud park cup water rock footer for words
---------------------------
List of words
---------------------------
dark smart cloud park cup water rock
---------------------------
dark
rock

## Modify text

The overloaded text method sets the text of the specified element.

Main.java
  

import org.jsoup.Jsoup;

void main() {

    String htmlString = """
            &lt;html&gt;&lt;head&gt;&lt;title&gt;My title&lt;/title&gt;&lt;/head&gt;
            &lt;body&gt;Body content&lt;/body&gt;&lt;/html&gt;""";

    var doc = Jsoup.parse(htmlString);
    doc.body().text("Lorem ipsum dolor sit amet");

    System.out.println(doc);
}

In the example, we change the text inside the body tag.

## Modify document

There are multiple methods for modifying the HTML document. For instance, the
append method appends a tag and the prepend method
prepends a tag to an element.

Main.java
  

import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import java.util.Optional;

void main() {

    String htmlString = """
            &lt;html&gt;&lt;head&gt;&lt;title&gt;My title&lt;/title&gt;&lt;/head&gt;
            &lt;body&gt;&lt;/body&gt;&lt;/html&gt;""";

    var doc = Jsoup.parse(htmlString);
    Optional&lt;Element&gt; bodyEl = Optional.ofNullable(doc.select("body").first());

    bodyEl.ifPresent(e -&gt; {
        e.append("&lt;p&gt;hello there!&lt;/p&gt;");
        e.prepend("&lt;h1&gt;Heading&lt;/h1&gt;");
    });

    System.out.println(doc);
}

In the example, we add h1 and p tags to the document.

&lt;html&gt;
 &lt;head&gt;
  &lt;title&gt;My title&lt;/title&gt;
 &lt;/head&gt; 
 &lt;body&gt;
  &lt;h1&gt;Heading&lt;/h1&gt;
  &lt;p&gt;hello there!&lt;/p&gt;
 &lt;/body&gt;
&lt;/html&gt;

## Parse links

The next example parses links from a HTML page.

Main.java
  

import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

void main() throws IOException {
    
    String url = "https://jsoup.org";

    Document document = Jsoup.connect(url).get();
    Elements links = document.select("a[href]");
    
    for (Element link : links) {
        
        System.out.println("link : " + link.attr("href"));
        System.out.println("text : " + link.text());
    }
}

In the example, we connect to a web page and parse all its link
elements.

Elements links = document.select("a[href]");

To get a list of links, we use the document's select 
method.

## Sanitize HTML data

JSoup provides methods for sanitizing HTML data. 

Main.java
  

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.safety.Cleaner;
import org.jsoup.safety.Safelist;

void main() {

    String htmlString = """
            &lt;html&gt;&lt;head&gt;&lt;title&gt;My title&lt;/title&gt;&lt;/head&gt;
            &lt;body&gt;&lt;center&gt;Body content&lt;/center&gt;&lt;/body&gt;&lt;/html&gt;
            """;

    boolean valid = Jsoup.isValid(htmlString, Safelist.basic());

    if (valid) {

        System.out.println("The document is valid");
    } else {

        System.out.println("The document is not valid.");
        System.out.println("Cleaned document");

        Document dirtyDoc = Jsoup.parse(htmlString);
        Document cleanDoc = new Cleaner(Safelist.basic()).clean(dirtyDoc);

        System.out.println(cleanDoc.html());
    }
}

In the example, we sanitize and clean HTML data.

String htmlString = """
        &lt;html&gt;&lt;head&gt;&lt;title&gt;My title&lt;/title&gt;&lt;/head&gt;
        &lt;body&gt;&lt;center&gt;Body content&lt;/center&gt;&lt;/body&gt;&lt;/html&gt;
        """;

The HTML string contains the center element, which is deprecated.

boolean valid = Jsoup.isValid(htmlString, Safelist.basic());

The isValid method determines whether the string is a valid HTML.
A white list is a list of HTML (elements and attributes) that can pass through the cleaner.
The Whitelist.basic defines a set of basic clean HTML tags.

Document dirtyDoc = Jsoup.parse(htmlString);
Document cleanDoc = new Cleaner(Safelist.basic()).clean(dirtyDoc);

With the help of the Cleaner, we clean the dirty HTML document. 

The document is not valid.
Cleaned document
&lt;html&gt;
 &lt;head&gt;&lt;/head&gt;
 &lt;body&gt;
  Body content
 &lt;/body&gt;
&lt;/html&gt;

We can see that the center element was removed.

Main.java
  

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

Matcher matcher;
final String DOMAIN_NAME_PATTERN
        = "([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,15}";
Pattern patrn = Pattern.compile(DOMAIN_NAME_PATTERN);

String getDomainName(String url) {

    String domainName = "";
    matcher = patrn.matcher(url);
    
    if (matcher.find()) {
        domainName = matcher.group(0).toLowerCase().trim();
    }
    
    return domainName;
}

void main() throws IOException {

    String query = "Milky Way";

    String url = "https://www.google.com/search?q=" + query + "&amp;num=10";

    Document doc = Jsoup
            .connect(url)
            .userAgent("Jsoup client")
            .timeout(5000).get();

    Elements links = doc.select("a[href]");

    Set&lt;String&gt; result = new HashSet&lt;&gt;();

    for (Element link : links) {

        String attr1 = link.attr("href");
        String attr2 = link.attr("class");
        
        if (!attr2.startsWith("_Zkb") &amp;&amp; attr1.startsWith("/url?q=")) {
        
            result.add(getDomainName(attr1));
        }
    }

    for (String el : result) {
        System.out.println(el);
    }
}

The example creates a search request for the "Milky Way" term. It prints
ten domain names that match the term.

final String DOMAIN_NAME_PATTERN
        = "([a-zA-Z0-9]([a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,15}";
Pattern patrn = Pattern.compile(DOMAIN_NAME_PATTERN);

A Google search returns long links from which we want to get the domain names.
For this we use a regular expression pattern.

String getDomainName(String url) {

    String domainName = "";
    matcher = patrn.matcher(url);
    
    if (matcher.find()) {
        domainName = matcher.group(0).toLowerCase().trim();
    }
    
    return domainName;
}

The getDomainName returns a domain name from the search link
using the regular expression matcher.

String query = "Milky Way";

This is our search term.

String url = "https://www.google.com/search?q=" + query + "&amp;num=10";

This is the URL to perform a Google search.

Document doc = Jsoup
        .connect(url)
        .userAgent("Jsoup client")
        .timeout(5000).get();

We connect to the URL, set a 5 s time out, and send a GET request.
A HTML document is returned.

Elements links = doc.select("a[href]");

From the document, we select the links.

Set&lt;String&gt; result = new HashSet&lt;&gt;();

for (Element link : links) {

    String attr1 = link.attr("href");
    String attr2 = link.attr("class");
    
    if (!attr2.startsWith("_Zkb") &amp;&amp; attr1.startsWith("/url?q=")) {
    
        result.add(getDomainName(attr1));
    }
}

We look for links that do not have class="_Zkb" attribute and have
href="/url?q=" attribute. Note that these are hard-coded values that
might change in the future.

for (String el : result) {
    System.out.println(el);
}

Finally, we print the domain names to the terminal.

en.wikipedia.org
www.space.com
www.nasa.gov
sk.wikipedia.org
www.bbc.co.uk
imagine.gsfc.nasa.gov
www.forbes.com
www.milkywayproject.org
www.youtube.com
www.universetoday.com

These are top Google search results for the "Milky Way" term.

 -->

## Source

[Jsoup documentation](https://jsoup.org/apidocs/)

This tutorial was dedicated to the JSoup HTML parser.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).