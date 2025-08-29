+++
title = "Java JSON"
date = 2025-08-29T19:59:40.519+01:00
draft = false
description = "Java JSON tutorial shows how to do JSON serialization and deserialization in Java with JSON-Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java JSON

last modified January 27, 2024

 

Java JSON tutorial shows how to do JSON serialization and deserialization in
Java with JSON-java.

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. It is less verbose and more readable than XML. The official Internet
media type for JSON is application/json. The JSON filename
extension is .json. JSON is directly consumable by JavaScript.

## JSON-Java

JSON-Java is a Java serialization/deserialization library. It parses
JSON documents into Java objects and generates new JSON documents from the Java
classes.

## JSON-Java dependency

implementation 'org.json:json:20220924'

This is a Gradle dependency for JSON-Java.

## JSON-Java features

These are JSON-Java features:

- Reliable and consistent results.

- No external dependencies.

- Adherence to the JSON specification.

- Fast execution and low memory footprint.

- Backward compatibility.

## Java JSONObject

JSONObject is an unordered collection of name/value pairs. Its
external form is a string wrapped in curly braces with colons between the names
and values, and commas between the values and names. 

The internal form is an object having get and opt methods for accessing the
values by name, and put methods for adding or replacing values by name. 

JSonObject is transformed into a JSON string with the
toString method.

com/zetcode/JSonObjectEx.java
  

package com.zetcode;

import org.json.JSONObject;

public class JSonObjectEx {

    public static void main(String[] args) {

        var user = new JSONObject();

        user.put("name", "John Doe");
        user.put("occupation", "gardener");
        user.put("siblings", Integer.valueOf(2));
        user.put("height", Double.valueOf(172.35));
        user.put("married", Boolean.TRUE);

        var userJson = user.toString();

        System.out.println(userJson);
    }
}

We create a JSONObject and transform it into a JSON string.

{"siblings":2,"occupation":"gardener","name":"John Doe","married":true,"height":172.35}

This is the final JSON string.

## Java JSONObject from a Map

In the following example, we create a JSONObject from a Map.

com/zetcode/JsonObjectFromMap.java
  

package com.zetcode;

import org.json.JSONObject;

import java.util.HashMap;

public class JsonObjectFromMap {

    public static void main(String[] args) {
        
        var data = new HashMap&lt;String, String&gt;();
        data.put("name", "John Doe");
        data.put("occupation", "gardener");
        data.put("siblings", "2");
        data.put("height", "172.35");
        data.put("married", "true");

        var user = new JSONObject(data);
        var userJson = user.toString();

        System.out.println(userJson);
    }
}

We create a HashMap. The map is passed to the constructor of 
the JSONObject.

## Java parse JSON string

In the next example, we parse a JSON string.

com/zetcode/JsonParse.java
  

package com.zetcode;

import org.json.JSONObject;

public class JsonParse {

    public static void main(String[] args) {

        String data = """
                {"name": "John Doe",
                "occupation": "gardener",
                "siblings": "2",
                "height": "172.35",
                "married": "true"}""";

        var user = new JSONObject(data);

        System.out.println(user.get("name"));
        System.out.println(user.get("occupation"));
        System.out.println(user.get("siblings"));
    }
}

The JSON string is parsed into a JSONObject by simply passing the 
JSON string to the JSONObject constructor.

John Doe
gardener
2

We have retrieved three values from the JSONObject.

## Java class to JSONObject

In the following example, we transform a Java class into a
JSONObject.

com/zetcode/User.java
  

package com.zetcode;

import java.util.Objects;

public class User {

    private String name;
    private String occupation;
    private int siblings;
    private double height;
    private boolean married;

    public User(String name, String occupation, int siblings, 
            double height, boolean married) {

        this.name = name;
        this.occupation = occupation;
        this.siblings = siblings;
        this.height = height;
        this.married = married;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public int getSiblings() {
        return siblings;
    }

    public void setSiblings(int siblings) {
        this.siblings = siblings;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public boolean isMarried() {
        return married;
    }

    public void setMarried(boolean married) {
        this.married = married;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return siblings == user.siblings &amp;&amp; Double.compare(user.height, height) == 0
                &amp;&amp; married == user.married &amp;&amp; Objects.equals(name, user.name)
                &amp;&amp; Objects.equals(occupation, user.occupation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, occupation, siblings, height, married);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("User{");
        sb.append("name='").append(name).append('\'');
        sb.append(", occupation='").append(occupation).append('\'');
        sb.append(", siblings=").append(siblings);
        sb.append(", height=").append(height);
        sb.append(", married=").append(married);
        sb.append('}');
        return sb.toString();
    }
}

We have a User class.

com/zetcode/Java2JsonObject.java
  

package com.zetcode;

import org.json.JSONObject;

public class Java2JsonObject {

    public static void main(String[] args) {

        var user = new User("John Doe", "gardener",
                2, 172.35, true);

        var userjo = new JSONObject(user);

        System.out.println(userjo);

        System.out.println(userjo.get("name"));
        System.out.println(userjo.get("occupation"));
        System.out.println(userjo.get("siblings"));
    }
}

A User object is created. The object is passed to the constructor
of the JSONObject. Later, we print three values of the
JSONObject.

## Java JSONArray

JSONArray is an ordered sequence of values. Its external text form
is a string wrapped in square brackets with commas separating the values. The
constructor can convert a JSON text into a Java object. The toString method
converts to JSON text. 

com/zetcode/JsonArrayEx.java
  

package com.zetcode;

import org.json.JSONArray;
import org.json.JSONObject;

public class JsonArrayEx {

    public static void main(String[] args) {

        var user = new JSONObject();

        user.put("name", "John Doe");
        user.put("occupation", "gardener");
        user.put("siblings", Integer.valueOf(2));
        user.put("height", Double.valueOf(172.35));
        user.put("married", Boolean.TRUE);

        var cols = new JSONArray();
        cols.put("red");
        cols.put("blue");
        cols.put("navy");

        user.put("favCols", cols);

        var userJson = user.toString();

        System.out.println(userJson);
    }
}

We have a JSONObject representing a user. A JSONArray
is list of favourite colours of the user.

{"siblings":2,"occupation":"gardener","name":"John Doe","married":true,
 "favCols":["red","blue","navy"],"height":172.35}

In JSON, an array is represented as a pair of square brackets with values
separated by comma.

var userJson = new JSONObject(user);
var favCols = List.of("red", "blue", "navy");

userJson.put("favCols", favCols);

A JSONArray can be automatically created from a Java
List.

## Java JSONWriter

JSONWriter provides a quick and convenient way of producing JSON
text. It is a low-level streaming API.

com/zetcode/JsonWriterEx.java
  

package com.zetcode;

import org.json.JSONWriter;

public class JsonWriterEx {

    public static void main(String[] args) {

        var user = new StringBuilder();

        var writer = new JSONWriter(user);

        writer.object();
        writer.key("name").value("John Doe");
        writer.key("occupation").value("gardener");
        writer.key("siblings").value(2);
        writer.key("married").value(true);

        writer.key("favCols");
        writer.array();
        writer.value("red");
        writer.value("blue");
        writer.value("navy");
        writer.endArray();

        writer.endObject();

        System.out.println(user);
    }
}

The example generates a JSON string with JSONWriter.

## JSON-Java CDL

The CDL provides support for converting between JSON and comma delimited lists.

src/main/resources/data.csv
  

name, occupation, siblings, height, married
John Doe, gardener, 2, 172.35, true
Jane Doe, teacher, 1, 168.23, true
Roger Roe, driver, 3, 178.59, false

This is the data.csv file. It has three users and includes a
header.

com/zetcode/JsonParseCsv.java
  

package com.zetcode;

import org.json.CDL;
import org.json.JSONArray;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

public class JsonParseCsv {

    public static void main(String[] args) throws IOException {

        var data = Files.readString(Paths.get("src/main/resources/data.csv"),
                StandardCharsets.UTF_8);

        JSONArray usersJson = CDL.toJSONArray(data);
        usersJson.forEach(System.out::println);
    }
}

The example reads the data from the CSV file and transforms it into JSON.

{"name":"John Doe","siblings":"2","occupation":"gardener","married":"true","height":"172.35"}
{"name":"Jane Doe","siblings":"1","occupation":"teacher","married":"true","height":"168.23"}
{"name":"Roger Roe","siblings":"3","occupation":"driver","married":"false","height":"178.59"}

## Java JSON web application

In the following example, we return JSON data from a web application. 
We use Undertow web server.

implementation 'org.json:json:20210307'
implementation 'io.undertow:undertow-core:2.0.36.Final'

We use these two dependencies.

com/zetcode/User.java
  

package com.zetcode;

import java.util.Objects;

public class User {

    private String name;
    private String occupation;
    private int siblings;
    private double height;
    private boolean married;

    public User(String name, String occupation, int siblings, 
            double height, boolean married) {

        this.name = name;
        this.occupation = occupation;
        this.siblings = siblings;
        this.height = height;
        this.married = married;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public int getSiblings() {
        return siblings;
    }

    public void setSiblings(int siblings) {
        this.siblings = siblings;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public boolean isMarried() {
        return married;
    }

    public void setMarried(boolean married) {
        this.married = married;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return siblings == user.siblings &amp;&amp; Double.compare(user.height, height) == 0
                &amp;&amp; married == user.married &amp;&amp; Objects.equals(name, user.name)
                &amp;&amp; Objects.equals(occupation, user.occupation);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, occupation, siblings, height, married);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("User{");
        sb.append("name='").append(name).append('\'');
        sb.append(", occupation='").append(occupation).append('\'');
        sb.append(", siblings=").append(siblings);
        sb.append(", height=").append(height);
        sb.append(", married=").append(married);
        sb.append('}');
        return sb.toString();
    }
}

We have a User class.

com/zetcode/UsersHandler.java
  

package com.zetcode;

import io.undertow.server.HttpHandler;
import io.undertow.server.HttpServerExchange;
import io.undertow.util.Headers;
import org.json.JSONArray;

import java.nio.charset.StandardCharsets;
import java.util.List;

public class UsersHandler implements HttpHandler {

    List&lt;User&gt; users = List.of(new User("John Doe", "gardener", 2, 172.35, true),
            new User("Jane Doe", "teacher", 1, 168.23, true),
            new User("Roger Roe", "driver", 3, 178.59, false));

    @Override
    public void handleRequest(HttpServerExchange exchange) {

        exchange.getResponseHeaders().put(Headers.CONTENT_TYPE, "application/json");

        JSONArray usersJson = new JSONArray(users);

        exchange.getResponseSender().send(usersJson.toString(), StandardCharsets.UTF_8);
    }
}

In the handleRequest method, we set the content type of the
response to application/json and send the JSON string in the
send method. The JSON string is an array of users.

com/zetcode/JsonWebApp.java
  

package com.zetcode;

import io.undertow.Undertow;

import static io.undertow.Handlers.path;

public class JsonWebApp {

    public static void main(String[] args) {

        Undertow server = Undertow.builder()
                .addHttpListener(8080, "0.0.0.0")
                .setHandler(path().addPrefixPath("/users", new UsersHandler()))
                .build();
        server.start();
    }
}

In the JsonWebApp, we set up the web application. The
UsersHandler is mapped to the /users endpoint.

$ curl localhost:8080/users
[{"siblings":2,"occupation":"gardener","name":"John Doe","married":true,"height":172.35},
{"siblings":1,"occupation":"teacher","name":"Jane Doe","married":true,"height":168.23},
{"siblings":3,"occupation":"driver","name":"Roger Roe","married":false,"height":178.59}]

We start the application and generate a request with curl.

## Source

[JSON-java Github page](https://github.com/stleary/JSON-java)

In this article we have shown how to work with JSON in Java with JSON-java
library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).