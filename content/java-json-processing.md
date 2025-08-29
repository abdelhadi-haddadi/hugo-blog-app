+++
title = "Java JSON Processing"
date = 2025-08-29T19:59:43.619+01:00
draft = false
description = "Java JSON Processing tutorial shows how to use JSON-P library to work with JSON. The examples write Java objects into JSON files and read JSON data into Java objects."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java JSON Processing

last modified January 27, 2024

 

Java JSON processing tutorial shows how to use JSON-P library to work with JSON. 
The examples write Java objects into JSON files and read JSON data into Java objects.
The code examples are available at the author's Github 
[repository](https://github.com/janbodnar/Java-Advanced/tree/master/json/jsonp).

## JSON-P

Java API for JSON Processing (JSON-P) provides portable APIs to parse, generate,
transform, and query JSON using object model and streaming APIs. There are two 
ways two work with JSON in JSON-P: streaming API and object model API.

## JSON-P Streaming API

The streaming API hands over parsing and generation control to the programmer. The
streaming API provides an event-based parser and allows an application
developer to ask for the next event rather than handling the event in a
callback. This is called a pull method.

    
        Name
        Description
    

    
        Json
        Contains static methods to create JSON parsers, generators, and their factories.
        

    
        JsonParser
        Represents an event-based parser reads JSON data from a stream.
        

    
        JsonGenerator
        Writes JSON data to a stream one value at a time.
    

## JSON-P Object model API

The object model API creates a tree-like structure that represents the JSON 
data in memory. The tree can be flexibly navigated and queried. On the other 
hand, the object model API is often less efficient as the streaming model and
requires more memory.

    
        Name
        Description
    

    
        Json
        Contains static methods to create JSON parsers, generators, and their factories.
    

    
        JsonObjectBuilder
        Creates an object model in memory by adding values from application code.
    
    
    
        JsonArrayBuilder
        Creates an array model in memory by adding values from application code.
    
    
    
        JsonReader
        Reads a JsonObject or a JsonArray from an input source.
    

    
        JsonWriter
        Writes a JsonObject or a JsonArray to an output source.
    

The JsonValue, JsonObject, JsonArray, 
JsonString, and JsonNumber are JSON data types.

In our examples, we use JDK 11 and Maven to create our applications.

&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;javax.json&lt;/groupId&gt;
        &lt;artifactId&gt;javax.json-api&lt;/artifactId&gt;
        &lt;version&gt;1.1&lt;/version&gt;
    &lt;/dependency&gt;

    &lt;dependency&gt;
        &lt;groupId&gt;org.glassfish&lt;/groupId&gt;
        &lt;artifactId&gt;javax.json&lt;/artifactId&gt;
        &lt;version&gt;1.1&lt;/version&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;    

In the projects, we use javax.json-api and javax.json
dependencies.

## JSON-P JsonObjectBuilder example

In the first example, we use an object builder to create a JSON 
string.

JsonObjectBuilderEx.java
  

package com.zetcode;

import javax.json.Json;
import java.time.LocalDate;

public class JsonObjectBuilderEx {

    public static void main(String[] args) {

        var born = LocalDate.of(1992, 3, 2).toString();

        var json = Json.createObjectBuilder()
                .add("name", "John Doe")
                .add("occupation", "gardener")
                .add("born", born).build();

        var result = json.toString();

        System.out.println(result);
    }
}

A JSON string is printed to the console.

var json = Json.createObjectBuilder()
    .add("name", "John Doe")
    .add("occupation", "gardener")
    .add("born", born).build();

A JsonObjectBuilder is created with createObjectBuilder.
New pairs are inserted with add. Finally, the string is finished 
with build.

var result = json.toString();

We transform the JsonObject to a string with toString.

{"name":"John Doe","occupation":"gardener","born":"1992-03-02"}

## Pretty printing

With JsonGenerator.PRETTY_PRINTING configuration setting, 
we can set the writer for pretty printing.

JsonPrettyPrintEx.java
  

package com.zetcode;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import java.io.StringWriter;
import java.time.LocalDate;
import java.util.HashMap;

public class JsonPrettyPrintEx {

    public static void main(String[] args) {

        var born = LocalDate.of(1992, 3, 2).toString();

        var json = Json.createObjectBuilder()
                .add("name", "John Doe")
                .add("occupation", "gardener")
                .add("born", born).build();

        var config = new HashMap&lt;String, Boolean&gt;();
        config.put(JsonGenerator.PRETTY_PRINTING, true);

        var jwf = Json.createWriterFactory(config);
        var sw = new StringWriter();

        try (var jsonWriter = jwf.createWriter(sw)) {

            jsonWriter.writeObject(json);
            System.out.println(sw.toString());
        }
    }
}

In the example, we create a JSON object and print it to the console. 
The output is pretty-printed.

var config = new HashMap&lt;String, Boolean&gt;();
config.put(JsonGenerator.PRETTY_PRINTING, true);

var jwf = Json.createWriterFactory(config);

The configuration file is passed to the JsonWriterFactory.

{
    "name": "John Doe",
    "occupation": "gardener",
    "born": "1992-03-02"
}

## JSON-P JsonArrayBuilder

JsonArrayBuilder is a builder for creating and modifying JsonArray
objects.

JsonArrayBuilderEx.java
  

package com.zetcode;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import java.io.StringWriter;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

public class JsonArrayBuilderEx {

    public static void main(String[] args) {

        var ab = Json.createArrayBuilder();

        var users = createUsers();

        users.forEach(user -&gt; {

            var ob = Json.createObjectBuilder();
            ob.add("name", user.getName());
            ob.add("occupation", user.getOccupation());
            ob.add("born", user.getBorn().toString());

            ab.add(ob);
        });

        var config = new HashMap&lt;String, Boolean&gt;();
        config.put(JsonGenerator.PRETTY_PRINTING, true);

        var jwf = Json.createWriterFactory(config);
        var sw = new StringWriter();

        try (var jsonWriter = jwf.createWriter(sw)) {

            jsonWriter.writeArray(jsonArray);

            System.out.println(sw);
        }
    }

    public static List&lt;User&gt; createUsers() {

        var born1 = LocalDate.of(1992, 3, 2);
        var u1 = new User("John Doe", "gardener", born1);

        var born2 = LocalDate.of(1967, 11, 22);
        var u2 = new User("Brian Flemming", "teacher", born2);

        var born3 = LocalDate.of(1995, 4, 7);
        var u3 = new User("Lucy Black", "accountant", born3);

        var born4 = LocalDate.of(1972, 8, 30);
        var u4 = new User("John Doe", "gardener", born4);

        return List.of(u1, u2, u3, u4);
    }
}

In the example, we create a list of user objects and transform it into a 
JsonArray.

var ab = Json.createArrayBuilder();

A JsonArrayBuilder is created with createArrayBuilder.

users.forEach(user -&gt; {

    var ob = Json.createObjectBuilder();
    ob.add("name", user.getName());
    ob.add("occupation", user.getOccupation());
    ob.add("born", user.getBorn().toString());

    ab.add(ob);
});

In this for loop, we create JSON objects and add them to the builder.

var jsonArray = ab.build();

The build method creates a JsonArray from 
the builder.

jsonWriter.writeArray(jsonArray);

The JsonArray is written to the writer.

[
    {
        "name": "John Doe",
        "occupation": "gardener",
        "born": "1992-03-02"
    },
    {
        "name": "Brian Flemming",
        "occupation": "teacher",
        "born": "1967-11-22"
    },
    {
        "name": "Lucy Black",
        "occupation": "accountant",
        "born": "1995-04-07"
    },
    {
        "name": "John Doe",
        "occupation": "gardener",
        "born": "1972-08-30"
    }
]

## JSON-P JsonParser

JsonParser parses JSON using the pull parsing programming model. In this
model the client code controls the thread and calls the method next to
advance the parser to the next state after processing each element.

The parser generates one of the following events: START_OBJECT, END_OBJECT,
START_ARRAY, END_ARRAY, KEY_NAME, VALUE_STRING, 
VALUE_NUMBER, VALUE_TRUE, VALUE_FALSE, and VALUE_NULL. 

users.json
  

[
  {
    "name": "John Doe",
    "occupation": "gardener",
    "born": "1992-03-02"
  },
  {
    "name": "Brian Flemming",
    "occupation": "teacher",
    "born": "1967-11-22"
  },
  {
    "name": "Lucy Black",
    "occupation": "accountant",
    "born": "1995-04-07"
  },
  {
    "name": "William Bean",
    "occupation": "pilot",
    "born": "1977-10-31"
  }
]

We are going to parse the users.json file.

JsonParserSimpleEx.java
  

package com.zetcode;

import javax.json.Json;
import javax.json.stream.JsonParser;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.nio.charset.StandardCharsets;

public class JsonParserSimpleEx {

    public static void main(String[] args) throws FileNotFoundException {

        var is = new FileInputStream("src/main/resources/users.json");

        var factory = Json.createParserFactory(null);
        var parser = factory.createParser(is, StandardCharsets.UTF_8);

        if (!parser.hasNext() &amp;&amp; parser.next() != JsonParser.Event.START_ARRAY) {

            return;
        }

        // looping over object attributes
        while (parser.hasNext()) {

            var event = parser.next();

            // starting object
            if (event == JsonParser.Event.START_OBJECT) {

                while (parser.hasNext()) {

                    event = parser.next();

                    if (event == JsonParser.Event.KEY_NAME) {

                        var key = parser.getString();

                        switch (key) {

                            case "name":
                                parser.next();

                                System.out.printf("Name: %s%n", parser.getString());
                                break;

                            case "occupation":
                                parser.next();

                                System.out.printf("Occupation: %s%n", parser.getString());
                                break;

                            case "born":
                                parser.next();

                                System.out.printf("Born: %s%n%n", parser.getString());
                                break;
                        }
                    }
                }
            }
        }
    }
}

In the example, we parse the users.json file using the JSON-P streaming API.

var is = new FileInputStream("src/main/resources/users.json");

var factory = Json.createParserFactory(null);
var parser = factory.createParser(is, StandardCharsets.UTF_8);

A JsonParser is created from JsonParserFactory.

if (!parser.hasNext() &amp;&amp; parser.next() != JsonParser.Event.START_ARRAY) {

    return;
}

First, we pass the beginning of the array.

// looping over object attributes
while (parser.hasNext()) {

    var event = parser.next();

    // starting object
    if (event == JsonParser.Event.START_OBJECT) {
...        

Then we go through the array in a while loop. The parser's hasNext
method returns false when we reach the end of the array. We pull
the next parsing event with next.

while (parser.hasNext()) {

    event = parser.next();

    if (event == JsonParser.Event.KEY_NAME) {
...

In another while loop, we go through the keys of the current object.

var key = parser.getString();

switch (key) {

    case "name":
        parser.next();

        System.out.printf("Name: %s%n", parser.getString());
        break;
...        

In the switch statement we check for the key name and 
get its value with getString.

Name: John Doe
Occupation: gardener
Born: 1992-03-02

Name: Brian Flemming
Occupation: teacher
Born: 1967-11-22

Name: Lucy Black
Occupation: accountant
Born: 1995-04-07

Name: William Bean
Occupation: pilot
Born: 1977-10-31

In the second example, we connect to a website and fetch JSON data 
from a path.    

JsonParserEx.java
  

package com.zetcode;

import javax.json.Json;
import javax.json.stream.JsonParser;
import java.io.IOException;
import java.net.URL;

public class JsonParserEx {

    public static void main(String[] args) throws IOException {

        var url = new URL("https://jsonplaceholder.typicode.com/posts");

        try (var in = url.openStream(); var parser = Json.createParser(in)) {

            // starting array
            parser.next();

            while (parser.hasNext()) {

                // starting object
                var event1 = parser.next();

                if (event1 == JsonParser.Event.START_OBJECT) {

                    while (parser.hasNext()) {

                        var event = parser.next();

                        if (event == JsonParser.Event.KEY_NAME) {

                            switch (parser.getString()) {

                                case "userId":
                                    parser.next();

                                    System.out.printf("User Id: %d%n", parser.getInt());
                                    break;

                                case "id":
                                    parser.next();

                                    System.out.printf("Post Id: %d%n", parser.getInt());
                                    break;

                                case "title":
                                    parser.next();

                                    System.out.printf("Post title: %s%n", parser.getString());
                                    break;

                                case "body":
                                    parser.next();

                                    System.out.printf("Post body: %s%n%n", parser.getString());
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }
}

The example processes one hundred posts from jsonplaceholder.typicode.com website, which 
is a fake online REST API for testing and prototyping.

## JSON-P JsonGenerator

JsonGenerator writes JSON data to an output source in a streaming way. 
The JsonGeneratorFactory contains methods to create JsonGenerator 
instances.

JsonGeneratorEx.java
  

package com.zetcode;

import javax.json.Json;
import javax.json.stream.JsonGenerator;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

public class JsonGeneratorEx {

    public static void main(String[] args) throws IOException {

        var myPath = Paths.get("src/main/resources/users.json");

        var config = new HashMap&lt;String, Boolean&gt;();
        config.put(JsonGenerator.PRETTY_PRINTING, true);

        var factory = Json.createGeneratorFactory(config);
        var generator = factory.createGenerator(Files.newBufferedWriter(myPath,
                StandardCharsets.UTF_8));

        generator.writeStartArray();

        var users = generateUsers();

        users.forEach(user -&gt; {

            generator.writeStartObject();

            generator.write("name", user.getName());
            generator.write("occupation", user.getOccupation());
            generator.write("born", user.getBorn().toString());

            generator.writeEnd();
        });

        generator.writeEnd();

        generator.flush();
    }

    public static List&lt;User&gt; generateUsers() {

        var born1 = LocalDate.of(1992, 3, 2);
        var u1 = new User("John Doe", "gardener", born1);

        var born2 = LocalDate.of(1967, 11, 22);
        var u2 = new User("Brian Flemming", "teacher", born2);

        var born3 = LocalDate.of(1995, 4, 7);
        var u3 = new User("Lucy Black", "accountant", born3);

        var born4 = LocalDate.of(1977, 10, 31);
        var u4 = new User("William Bean", "pilot", born4);

        return List.of(u1, u2, u3, u4);
    }
}

The example creates a users.json file from a list of users.

var myPath = Paths.get("src/main/resources/users.json");

var config = new HashMap&lt;String, Boolean&gt;();
config.put(JsonGenerator.PRETTY_PRINTING, true);

var factory = Json.createGeneratorFactory(config);
var generator = factory.createGenerator(Files.newBufferedWriter(myPath,
        StandardCharsets.UTF_8));

A JsonGenerator is created with a JsonGeneratorFactory.
The factory receives configuration data which enable pretty printing.

generator.writeStartArray();

An array is started with writeStartArray. It is later ended
with writeEnd.

users.forEach(user -&gt; {

    generator.writeStartObject();

    generator.write("name", user.getName());
    generator.write("occupation", user.getOccupation());
    generator.write("born", user.getBorn().toString());

    generator.writeEnd();
});

JSON objects are written in a forEach loop. A JSON 
object is started with writeStartObject and ended 
with writeEnd. The key/value pairs are written using 
write.

generator.flush();

The data is flushed to the data source from the buffer with flush.

## Source

[JSON-P documentation](https://javaee.github.io/jsonp/getting-started.html)

In this article we have read and written JSON files with Java JSON-P.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).