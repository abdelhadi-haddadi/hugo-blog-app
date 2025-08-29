+++
title = "Java 11 new features"
date = 2025-08-29T19:48:34.488+01:00
draft = false
description = "In this article we cover some new features of Java 11. Java 11 was released on 25.9. 2018."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java 11 new features

last modified July 13, 2020 

In this article we cover some new features of Java 11. Java 11 was
released on 25.9. 2018. In this article we will focus on new programming
features of Java 11. 

## Java 11 organizational changes

Java 11 did a lot of house-keeping. Java EE, CORBA, and Java FX have
been removed from JDK. They will be available from Maven repositories. 
JavaScript Nashorn engine has been deprecated. Java applets have been
removed for good. 

## Dowloading Java 11

We download either [OpenJDK](http://jdk.java.net/11) or
[Oracle JDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html).

IntelliJ IDEA 2018.2.4 Community Edition already has support for
Java 11. 

$ ~/bin/jdk-11/bin/java --version
openjdk 11 2018-09-25
OpenJDK Runtime Environment 18.9 (build 11+28)
OpenJDK 64-Bit Server VM 18.9 (build 11+28, mixed mode)

In our examples we have used OpenJDK.

## Java 11 - launching single-file source files

It is possible to launch single-file Java source files without prior
compilation with javac. This helps new programmers learn
the basics of Java and promotes creating simpler programs. 

We do not clutter up our space with byte-code files and we do not need
to worry about Java packaging rules. 

com/zetcode/SimpleEx.java
  

package com.zetcode;

public class SimpleEx {

    public static void main(String[] args) {

        System.out.println("Java 11 example");
    }
}

This is a simple Java source file. Note that the file does not have
to be located in com/zetcode subdirectory.

$ ~/bin/jdk-11/bin/java SimpleEx.java
Java 11 example

We launch the program with java tool.

## HttpClient standardized

The new HttpClient has been standardized. It is located in the 
java.net.http package.

com/zetcode/HttpClientEx.java
  

package com.zetcode;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;

public class HttpClientEx {

    public static void main(String[] args) {

        var client = HttpClient.newHttpClient();
        var request = HttpRequest.newBuilder()
            .uri(URI.create("http://webcode.me"))
            .build();
            
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .thenAccept(System.out::println)
            .join();
    }
}

In the example, we create a new http client. Then we generage 
an asynchronous HTTP request to webcode.me website. 

$ ~/bin/jdk-11/bin/java HttpClientEx.java
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
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

The server responds with this HTTP file.

## Java 11 new string methods

There are new String methods in Java 11.

com/zetcode/StringMethodsEx.java
  

package com.zetcode;

public class StringMethodsEx {

    public static void main(String[] args) {

        var word = "falcon ";

        System.out.println(word.repeat(5));

        var word2 = "\tnice blue\t";
        System.out.println(word2 + "sky");
        System.out.println(word2.stripTrailing() + "sky");
        System.out.println(word2.stripLeading() + "sky");
        System.out.println(word2.strip() + "sky");

        var word3 = "  ";
        System.out.println(word3.isEmpty());
        System.out.println(word3.isBlank());

        var words = "falcon\neagle\nsky\nwood\nforest";
        words.lines().forEach(System.out::println);
    }
}

In the example, we demonstrate the usage of the new String
methods.

System.out.println(word.repeat(5));

The repeat method returns the string repeated n times.

System.out.println(word2.stripTrailing() + "sky");
System.out.println(word2.stripLeading() + "sky");
System.out.println(word2.strip() + "sky");

The stringTailing method returns the string with all 
trailing white space removed. The stringTailing method returns 
the string with all leading white space removed. The stringTailing method returns 
the string with all leading and trailing white space removed.

System.out.println(word3.isBlank());

The isBlank returns true if the string is empty or 
contains only white space.

words.lines().forEach(System.out::println);

The lines method returns a stream of lines extracted from 
the string, separated by line terminators. 

$ ~/bin/jdk-11/bin/java StringMethodsEx.java
falcon falcon falcon falcon falcon 
    nice blue   sky
    nice bluesky
nice blue   sky
nice bluesky
false
true
falcon
eagle
sky
wood
forest

This is the output.

## The asMatchPredicate method

There is a new asMatchPredicate method for working with
regular expressions.

com/zetcode/AsMatchPredicateEx.java
  

package com.zetcode;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AsMatchPredicateEx {

    public static void main(String[] args) {

        var words = Arrays.asList("dog", "Dog", "DOG", "Doggy");

        var pred = Pattern.compile("dog", 
            Pattern.CASE_INSENSITIVE).asMatchPredicate();

        words.forEach((word) -&gt; {
            
            if (pred.test(word)) {
                System.out.printf("%s matches%n", word);
            } else {
                System.out.printf("%s does not match%n", word);
            }
        });
    }
}

The asMatchPredicate method creates a new predicate from
the compiled pattern. On the predicate we call the test
method.

$ ~/bin/jdk-11/bin/java AsMatchPredicateEx.java
dog matches
Dog matches
DOG matches
Doggy does not match

This is the output.

## Files readString and writeString

The readString method reads all content from a file into 
a string and the writeString method writes a 
CharSequence to a file.

com/zetcode/WriteStringEx.java
  

package com.zetcode;

import java.nio.file.Path;
import java.nio.file.Files;
import java.io.IOException;

public class WriteStringEx {

    public static void main(String[] args) throws IOException {

        var words = "forest\nwood\nsky\nrock";

        Files.writeString(Path.of("words.txt"), words);
    }
}

In this example, we write four words into the words.txt file.

com/zetcode/ReadStringEx.java
  

package com.zetcode;

import java.nio.file.Path;
import java.nio.file.Files;
import java.io.IOException;

public class ReadStringEx {

    public static void main(String[] args) throws IOException {

        var fileName = "words.txt";

        var data = Files.readString(Path.of("words.txt"));

        System.out.println(data);
    }
}

In this example, we read the contents of the words.txt file
and write it to the console.

$ ~/bin/jdk-11/bin/java ReadStringEx.java
forest
wood
sky
rock

In this tutorial, we have looked at the new programming features
of Java 11.