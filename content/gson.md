+++
title = "Gson"
date = 2025-08-29T19:59:00.948+01:00
draft = false
description = "Gson tutorial shows how to work with JSON in Java using Gson library. We use three different Gson APIs to work with JSON."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Gson

last modified October 10, 2024

 

Gson tutorial shows how to work with JSON in Java using Gson library.
We use three different Gson APIs to work with JSON. Source code is available at author's
Github [repository](https://github.com/janbodnar/Java-Gson-Examples).

JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write and for machines to parse and
generate. It is less verbose and more readable than XML. The official Internet
media type for JSON is application/json. The JSON filename
extension is .json. JSON is directly consumable by JavaScript.

Gson is a Java serialization/deserialization library to
convert Java Objects into JSON and back. Gson was created by
Google for internal use and later open sourced.

## Gson Maven dependency

&lt;dependency&gt;
    &lt;groupId&gt;com.google.code.gson&lt;/groupId&gt;
    &lt;artifactId&gt;gson&lt;/artifactId&gt;
    &lt;version&gt;2.11.0&lt;/version&gt;
&lt;/dependency&gt;

This is a Maven dependency for Gson.

## Gson features

These are Gson features:

- Simple tools for Java object JSON serialization and deserialization.

- Extensive support of Java Generics.

- Custom representations for objects.

- Support for arbitrarily complex objects.

- Fast with low memory footprint.

- Allows compact output and pretty printing.

## Gson API

Gson has three types of API:

- Data binding API

- Tree model API

- Streaming API

Data binding API converts JSON to and from POJO using property
accessors. Gson processes JSON data using data type adapters. It is similar to
XML JAXB parser.

Tree model API creates an in-memory tree representation of the JSON
document. It builds a tree of JsonElements. It is similar to XML
DOM parser.

Streaming API is a low-level API that reads and writes JSON content
as discrete tokens with JsonReader and JsonWriter.
These classes read data as JsonTokens. This API has the lowest
overhead and is fast in read/write operations. It is similar to Stax parser for
XML.

## Java Gson class

Gson is the main class for using Gson library. There are two
basic ways to create Gson:

- new Gson()

- new GsonBuilder().create()

GsonBuilder can be used to build Gson with various
configuration settings.

## The toJson method

The toJson method serializes the specified object into its
equivalent JSON representation.

Main.java
  

import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;

void main() {

    Map&lt;Integer, String&gt; colours = new HashMap&lt;&gt;();
    colours.put(1, "blue");
    colours.put(2, "yellow");
    colours.put(3, "green");

    Gson gson = new Gson();

    String output = gson.toJson(colours);

    System.out.println(output);
}

In the example, we serialize a map into JSON with toJSon method.

## The fromJson method

The fromJson method deserializes the specified JSON into an object
of the specified class.

Main.java
  

import com.google.gson.Gson;

void main() {
    
    String json_string = """
            {"firstName":"Tom", "lastName": "Broody"}""";

    Gson gson = new Gson();
    User user = gson.fromJson(json_string, User.class);

    System.out.println(user);
}

record User(String firstName, String lastName) {
}

The example uses fromJson method to read JSON into a Java object.

## GsonBuilder

GsonBuilder builds Gson with various
configuration settings. GsonBuilder follows the builder pattern,
and it is typically used by first invoking various configuration methods
to set desired options, and finally calling create.

Main.java
  

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.PrintStream;
import java.nio.charset.StandardCharsets;

void main() {

    try (var prs = new PrintStream(System.out, true,
            StandardCharsets.UTF_8)) {

        Gson gson = new GsonBuilder()
                .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
                .create();

        User user = new User("Peter", "Flemming");
        gson.toJson(user, prs);
    }
}

record User(String firstName, String lastName) {
}

In the example, we write an object into JSON. We use GsonBuilder
to create Gson.

Gson gson = new GsonBuilder()
        .setFieldNamingPolicy(FieldNamingPolicy.UPPER_CAMEL_CASE)
        .create();

We create and configure Gson with GsonBuilder. The field
naming policy is set to FieldNamingPolicy.UPPER_CAMEL_CASE.

## Gson pretty printing

Gson has two output modes: compact and pretty.

Main.java
  

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.HashMap;
import java.util.Map;

void main() {

    Gson gson = new GsonBuilder().setPrettyPrinting().create();

    Map&lt;String, Integer&gt; items = new HashMap&lt;&gt;();

    items.put("chair", 3);
    items.put("pencil", 1);
    items.put("book", 5);

    gson.toJson(items, System.out);
}

The example pretty prints the JSON output.

Gson gson = new GsonBuilder().setPrettyPrinting().create();

The setPrettyPrinting method sets the pretty printing mode.

{
  "chair": 3,
  "book": 5,
  "pencil": 1
}

## Serializing null values

Gson by default does not serialize fields with null values to JSON.
If a field in a Java object is null, Gson excludes it.
We can force Gson to serialize null values via the
GsonBuilder by using serializeNulls method.

Main.java
  

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

class User {

    private String firstName;
    private String lastName;

    public User() {};

    public User(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("User{").append("First name: ")
                .append(firstName).append(", Last name: ")
                .append(lastName).append("}").toString();
    }
}

void main() {

    GsonBuilder builder = new GsonBuilder();

    builder.serializeNulls();

    Gson gson = builder.create();

    User user = new User();
    user.setFirstName("Norman");

    String json = gson.toJson(user);
    System.out.println(json);

}

The example shows how to serialize null values.

{"firstName":"Norman","lastName":null}

## Java Gson write list

The following example writes a list of JSON objects into a file.

Main.java
  

import com.google.gson.Gson;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

void main() throws IOException {

    String fileName = "src/main/resources/items.json";

    try (FileOutputStream fos = new FileOutputStream(fileName);
         OutputStreamWriter isr = new OutputStreamWriter(fos, StandardCharsets.UTF_8)) {

        Gson gson = new Gson();

        Item item1 = new Item("chair", 4);
        Item item2 = new Item("book", 5);
        Item item3 = new Item("pencil", 1);

        List&lt;Item&gt; items = new ArrayList&lt;&gt;();
        items.add(item1);
        items.add(item2);
        items.add(item3);

        gson.toJson(items, isr);
    }

    System.out.println("Items written to file");
}

record Item(String name, int quantity) {
}

The example writes JSON data into items.json file.

## Java Gson read into array

The next example reads data into a Java array.

$ cat users.json
[{"firstName":"Peter","lastName":"Flemming"}, {"firstName":"Nicole","lastName":"White"},
     {"firstName":"Robin","lastName":"Bullock"} ]

These are the contents of the users.json file.

Main.java
  

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;

void main() throws IOException {

    Gson gson = new GsonBuilder().create();

    String fileName = "src/main/resources/users.json";
    Path path = new File(fileName).toPath();

    try (Reader reader = Files.newBufferedReader(path,
            StandardCharsets.UTF_8)) {

        User[] users = gson.fromJson(reader, User[].class);

        Arrays.stream(users).forEach(System.out::println);
    }
}

record User(String firstName, String lastName) {
}

The example reads data from items.json file into
an array. We print the contents of the array to the console.

User[] users = gson.fromJson(reader, User[].class);

The second parameter of fromJson is an array class.

## Java Gson read JSON from URL

The following example reads JSON data from a web page. We get JSON data from
http://time.jsontest.com.

{
    "date": "10-09-2024",
    "milliseconds_since_epoch": 1728466050756,
    "time": "09:27:30 AM"
}

The GET request returns this JSON string.

Main.java
  

import com.google.gson.Gson;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URI;
import java.nio.charset.StandardCharsets;

void main() throws IOException {

    String webPage = "http://time.jsontest.com";

    try (InputStream is = URI.create(webPage).toURL().openStream();
         Reader reader = new InputStreamReader(is, StandardCharsets.UTF_8)) {

        Gson gson = new Gson();
        TimeData td = gson.fromJson(reader, TimeData.class);

        System.out.println(td);
    }
}

record TimeData(String time, Long milliseconds_since_epoch, String date) {}

The code example reads JSON data from http://time.jsontest.com.

TimeData[time=09:31:21 AM, milliseconds_since_epoch=1728466281476, date=10-09-2024]

## Java Gson excluding fields with @Expose

@Expose annotation indicates that a member should be exposed for
JSON serialization or deserialization. The @Expose annotation can
take two boolean parameters: serialize and
deserialize. The @Expose annotation must be explicitly
enabled with excludeFieldsWithoutExposeAnnotation
method.

Main.java
  

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;

enum MaritalStatus {

    SINGLE,
    MARRIED,
    DIVORCED,
    UNKNOWN
}

record Person(@Expose String firstName, @Expose String lastName,
              MaritalStatus maritalStatus) {
}

void main() {

    Gson gson = new GsonBuilder()
            .excludeFieldsWithoutExposeAnnotation()
            .setPrettyPrinting()
            .create();

    Person p = new Person("Jack", "Sparrow",
            MaritalStatus.UNKNOWN);

    String json = gson.toJson(p);
    System.out.println(json);
}

In the example, we exclude one field from serialization.

record Person(@Expose String firstName, @Expose String lastName,
    MaritalStatus maritalStatus) {

The marital status field will not be serialized, because it is not decorated
with the @Expose annotation.

Gson gson = new GsonBuilder()
        .excludeFieldsWithoutExposeAnnotation()
        .setPrettyPrinting()
        .create();

The field exclusion by @Expose annotation is enabled
with excludeFieldsWithoutExposeAnnotation method.

{
  "firstName": "Jack",
  "lastName": "Sparrow"
}

## Data binding API

The data binding API converts JSON to and from POJO using
property accessors. Gson processes JSON data using data type adapters.

### Data binding API write

In the following example, we write data with the data binding API.

Main.java
  

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

void main() throws IOException {

    List&lt;Car&gt; cars = new ArrayList&lt;&gt;();
    cars.add(new Car("Audi", "2012", 22000, new String[]{"gray", "red", "white"}));
    cars.add(new Car("Skoda", "2016", 14000, new String[]{"black", "gray", "white"}));
    cars.add(new Car("Volvo", "2010", 19500, new String[]{"black", "silver", "beige"}));

    String fileName = "src/main/resources/cars.json";
    Path path = Paths.get(fileName);

    try (Writer writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        gson.toJson(cars, writer);
    }

    System.out.println("Cars written to file");
}

record Car(String name, String model, int price, String[] colours) {
}

In the example, we create a list of car objects and serialize it with Gson data
binding API.

Gson gson = new GsonBuilder().setPrettyPrinting().create();
gson.toJson(cars, writer);

We pass the cars list to the toJson method. Gson
automatically maps car objects to JSON.

### Gson data binding API read

In the following example, we read data with the data binding API.

Main.java
  

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

void main() throws IOException {

    String fileName = "src/main/resources/cars.json";
    Path path = Paths.get(fileName);

    try (Reader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {

        Gson gson = new Gson();
        List&lt;Car&gt; cars = gson.fromJson(reader, new TypeToken&lt;List&lt;Car&gt;&gt;() {
        }.getType());

        cars.forEach(System.out::println);
    }
}

record Car(String name, String model, int price, String[] colours) {
}

In the example, we read data from a JSON file into a list of car objects with
Gson data binding API.

List&lt;Car&gt; cars = gson.fromJson(reader, new TypeToken&lt;List&lt;Car&gt;&gt;() {
    }.getType());

Gson automatically maps JSON into Car objects. Because the type
information is lost at runtime, we need to use the TypeToken to let
Gson know what type we use.

## Java Gson tree model API

Tree model API creates a tree representation of the JSON document in memory. It
builds a tree of JsonElements. JsonElement is a class
representing an element of Json. It could either be a JsonObject, a
JsonArray, a JsonPrimitive, or a
JsonNull.

### Gson tree model write

In the following example, we use the Gson tree model API to write Java objects
into JSON.

Main.java
  

import com.google.gson.Gson;
import com.google.gson.JsonElement;

import java.io.IOException;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

void main() throws IOException {

    List&lt;Car&gt; cars = new ArrayList&lt;&gt;();
    cars.add(new Car("Audi", "2012", 22000,
            new String[]{"gray", "red", "white"}));
    cars.add(new Car("Skoda", "2016", 14000,
            new String[]{"black", "gray", "white"}));
    cars.add(new Car("Volvo", "2010", 19500,
            new String[]{"black", "silver", "beige"}));

    String fileName = "src/main/resources/cars.json";
    Path path = Paths.get(fileName);

    try (Writer writer = Files.newBufferedWriter(path, StandardCharsets.UTF_8)) {

        Gson gson = new Gson();

        JsonElement tree = gson.toJsonTree(cars);
        gson.toJson(tree, writer);
    }

    System.out.println("Cars written to file");
}

record Car(String name, String model, int price, String[] colours) {
}

A list of car objects is serialized into JSON format.

JsonElement tree = gson.toJsonTree(cars);

The toJsonTree method serializes the specified object
into its equivalent representation as a tree of JsonElements.

### Gson tree model read

In the following example, we use the Gson tree model API to read Java objects
from JSON.

cars.json
  

[{"name":"Audi","model":"2012","price":22000,"colours":["gray","red","white"]},
 {"name":"Skoda","model":"2009","price":14000,"colours":["black","gray","white"]},
 {"name":"Volvo","model":"2010","price":19500,"colours":["black","silver","beige"]}]

This is the JSON data in the cars.json file.

Main.java
  

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.IOException;
import java.io.Reader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

void main() throws IOException {

    String fileName = "src/main/resources/cars.json";
    Path path = Paths.get(fileName);

    try (Reader reader = Files.newBufferedReader(path, StandardCharsets.UTF_8)) {

        JsonElement tree = JsonParser.parseReader(reader);
        JsonArray array = tree.getAsJsonArray();

        for (JsonElement element : array) {

            if (element.isJsonObject()) {

                JsonObject car = element.getAsJsonObject();

                System.out.println("********************");
                System.out.println(car.get("name").getAsString());
                System.out.println(car.get("model").getAsString());
                System.out.println(car.get("price").getAsInt());

                JsonArray cols = car.getAsJsonArray("colours");

                cols.forEach(System.out::println);
            }
        }
    }
}

In the example, we read JSON data from a file into a tree of JsonElements.

JsonElement tree = JsonParser.parseReader(reader);

JsonParser parses JSON into a tree structure of
JsonElements.

JsonArray array = tree.getAsJsonArray();

We get the tree as JsonArray.

for (JsonElement element : array) {

    if (element.isJsonObject()) {

        JsonObject car = element.getAsJsonObject();

        System.out.println("********************");
        System.out.println(car.get("name").getAsString());
        System.out.println(car.get("model").getAsString());
        System.out.println(car.get("price").getAsInt());

        JsonArray cols = car.getAsJsonArray("colours");

        cols.forEach(System.out::println);
    }
}

We go through the JsonArray and print the contents
of its elements.

## Java Gson streaming API

Gson streaming API is a low-level API that reads and writes JSON as discrete
tokens (JsonTokens). The main classes are JsonReader
and JsonWriter. JsonToken is a structure, name or value
type in a JSON-encoded string.

These are the JsonToken types:

- BEGIN_ARRAY — opening of a JSON array

- END_ARRAY — closing of a JSON array

- BEGIN_OBJECT — opening of JSON object

- END_OBJECT — closing of JSON object

- NAME — a JSON property name

- STRING — a JSON string

- NUMBER — a JSON number (double, long, or int)

- BOOLEAN — a JSON boolean value

- NULL — a JSON null

- END_DOCUMENT — ehe end of the JSON stream. 

### Gson JsonWriter

JsonWriter writes a JSON encoded value to a stream, one token at a
time. The stream includes both literal values (strings, numbers, booleans, and
nulls) as well as the begin and end delimiters of objects and arrays. Each JSON
document must contain one top-level array or object.

Objects are created with beginObject and endObject
method calls. Within objects, tokens alternate between names and their values.
Arrays are created within beginArray and endArray
method calls.

Main.java
  

import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

void main() throws IOException {

    String fileName = "src/main/resources/cars.json";
    Path path = Paths.get(fileName);

    try (JsonWriter writer = new JsonWriter(Files.newBufferedWriter(path,
            StandardCharsets.UTF_8))) {

        writer.beginObject();
        writer.name("name").value("Audi");
        writer.name("model").value("2012");
        writer.name("price").value(22000);

        writer.name("colours");
        writer.beginArray();
        writer.value("gray");
        writer.value("red");
        writer.value("white");
        writer.endArray();

        writer.endObject();
    }

    System.out.println("Data written to file");
}

In the example, we write one car object into JSON file.

try (JsonWriter writer = new JsonWriter(Files.newBufferedWriter(path,
        StandardCharsets.UTF_8))) {

A new JsonWriter is created.

writer.beginObject();
...
writer.endObject();

As we stated above, each JSON document must have a top-level array or object.
In our case, we have a top-level object.

writer.name("name").value("Audi");
writer.name("model").value("2012");
writer.name("price").value(22000);

We write key-value pairs to the document.

writer.name("colours");
writer.beginArray();
writer.value("gray");
writer.value("red");
writer.value("white");
writer.endArray();

Here we create an array.

### Gson JsonReader

JsonReader reads a JSON encoded value as a stream of tokens.

Main.java
  

import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;

import java.io.IOException;
import java.io.StringReader;

void main() throws IOException {

    String json_string = """
            {"name":"chair","quantity":3}""";

    try (JsonReader reader = new JsonReader(new StringReader(json_string))) {

        while (reader.hasNext()) {

            JsonToken nextToken = reader.peek();

            if (JsonToken.BEGIN_OBJECT.equals(nextToken)) {

                reader.beginObject();

            } else if (JsonToken.NAME.equals(nextToken)) {

                reader.nextName();

            } else if (JsonToken.STRING.equals(nextToken)) {

                String value = reader.nextString();
                System.out.format("%s: ", value);

            } else if (JsonToken.NUMBER.equals(nextToken)) {

                long value = reader.nextLong();
                System.out.println(value);

            }
        }
    }
}

The example reads data from a JSON string with JsonReader.

JsonReader reader = new JsonReader(new StringReader(json_string));

JsonReader object is created. It reads from a JSON string.

while (reader.hasNext()) {

In the while loop, we iterate over the tokens in the stream.

JsonToken nextToken = reader.peek();

We get the type of the next token with the peek method.

reader.beginObject();

The beginObject method consumes the next token from
the JSON stream and asserts that it is the beginning of a new object.

reader.nextName();

The nextName method returns the next JsonToken
and consumes it.

String value = reader.nextString();
System.out.format("%s: ", value);

We get the next string value and print it to the console.

## Source

[Gson Github page](https://github.com/google/gson)

In this article we have shown how to work with JSON with Gson library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).