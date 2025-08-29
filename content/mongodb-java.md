+++
title = "MongoDB Java"
date = 2025-08-29T20:00:02.903+01:00
draft = false
description = "This is MongoDB Java tutorial. In this article we show how to work with MongoDB in Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# MongoDB Java

last modified January 27, 2024

 

In this article we show how to work with MongoDB in Java.
There is a concise [Java tutorial](/lang/java/) on ZetCode.

MongoDB is a NoSQL cross-platform document-oriented database. It is one of the most
popular databases available. MongoDB is developed by MongoDB Inc. and is published as free
and open-source software.

A record in MongoDB is a document, which is a data structure composed of field and value
pairs. MongoDB documents are similar to JSON objects. The values of fields may include
other documents, arrays, and arrays of documents. MongoDB stores documents in collections.
Collections are analogous to tables in relational databases and documents to rows.

MongoDB represents JSON documents in binary-encoded format called
BSON behind the scenes. BSON extends the
JSON model to provide additional data types, ordered fields, and to
be efficient for encoding and decoding within different languages. The .NET
driver uses BsonDocument to represent BSON.

## Installing MongoDB

The following command can be used to install MongoDB on a Debian-based Linux.

$ sudo apt-get install mongodb

The command installs the necessary packages that come with MongoDB.

$ sudo service mongodb status
mongodb start/running, process 975

With the sudo service mongodb status command we check
the status of the mongodb server.

$ sudo service mongodb start
mongodb start/running, process 6448

The mongodb server is started with the sudo service mongodb start
command.

## Creating a database

The mongo tool is an interactive JavaScript shell interface to
MongoDB, which provides an interface for systems administrators as well as
a way for developers to test queries and operations directly with the database.

$ mongo testdb
MongoDB shell version v4.0.7
connecting to: mongodb://127.0.0.1:27017/testdb?gssapiServiceName=mongodb
...
&gt; db
testdb
&gt; db.cars.insert({name: "Audi", price: 52642})
&gt; db.cars.insert({name: "Mercedes", price: 57127})
&gt; db.cars.insert({name: "Skoda", price: 9000})
&gt; db.cars.insert({name: "Volvo", price: 29000})
&gt; db.cars.insert({name: "Bentley", price: 350000})
&gt; db.cars.insert({name: "Citroen", price: 21000})
&gt; db.cars.insert({name: "Hummer", price: 41400})
&gt; db.cars.insert({name: "Volkswagen", price: 21600})

We create a testdb database and insert eight
documents in the cars collection.

## Java MongoDB driver

We use the following Maven declaration to include the MongoDB
Java driver in our project.

&lt;dependency&gt;
    &lt;groupId&gt;org.mongodb&lt;/groupId&gt;
    &lt;artifactId&gt;mongo-java-driver&lt;/artifactId&gt;
    &lt;version&gt;x.y.z&lt;/version&gt;
&lt;/dependency&gt;

It is an all-in-one JAR, which embeds the core driver and BSON.
BSON, short for Bin­ary JSON, is a bin­ary-en­coded seri­al­iz­a­tion of
JSON-like doc­u­ments.

## Java MongoDB list database collections

The first example connects to the testdb database and
retrieves its collections.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;mongocommand&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.mongodb&lt;/groupId&gt;
            &lt;artifactId&gt;mongo-java-driver&lt;/artifactId&gt;
            &lt;version&gt;3.10.2&lt;/version&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;

&lt;/project&gt;

This is our pom.xml file.

com/zetcode/MongoListCollections.java
  

package com.zetcode;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

import java.util.logging.Level;
import java.util.logging.Logger;

public class MongoListCollections {

    public static void main(String[] args) {

        Logger mongoLogger = Logger.getLogger("org.mongodb.driver");
        mongoLogger.setLevel(Level.SEVERE);

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            MongoDatabase database = mongoClient.getDatabase("testdb");

            for (String name : database.listCollectionNames()) {

                System.out.println(name);
            }
        }
    }
}

The example connects to the testdb database and
retrieves all its collections.

Logger mongoLogger = Logger.getLogger("org.mongodb.driver");
mongoLogger.setLevel(Level.SEVERE);

We set the logging level for MongoDB. We only show SEVERE error
messages.

try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

A MongoClient class is used to connect to the MongoDB server.
It is created with the MongoClients.create method call.
The 27017 is the default port on which the MongoDB server listens.

MongoDatabase database = mongoClient.getDatabase("testdb");

With the getDatabase method, we retrieve the
testdb database.

for (String name : database.listCollectionNames()) {

    System.out.println(name);
}

The listCollectionNames method finds all the collections in
the testdb database.

cars
cities

In our database, we have these two collections.

## Java MongoDB database statistics

The next example connects to the testdb database and
gets its statistics.

com/zetcode/MongoCommand.java
  

package com.zetcode;

import com.mongodb.client.MongoClients;
import org.bson.Document;

import java.util.Map;

public class MongoCommand {

    public static void main(String[] args) {

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            var database = mongoClient.getDatabase("testdb");

            var stats = database.runCommand(new Document("dbstats", 1));

            for (Map.Entry&lt;String, Object&gt; set : stats.entrySet()) {

                System.out.format("%s: %s%n", set.getKey(), set.getValue());
            }
        }
    }
}

The example connects to the testdb database and executes
the dbstats command. It shows some database statistics.

var stats = database.runCommand(new Document("dbstats", 1));

With the runCommand method, we execute the
dbstats command. The command returns a Document, which
is a representation of a MongoDB document as a map.

for (Map.Entry&lt;String, Object&gt; set : stats.entrySet()) {

    System.out.format("%s: %s%n", set.getKey(), set.getValue());
}

We iterate through the entries of the document.

db: testdb
collections: 2
views: 0
objects: 9
avgObjSize: 48.111111111111114
dataSize: 433.0
storageSize: 57344.0
numExtents: 0
indexes: 2
indexSize: 57344.0
fsUsedSize: 1.4818904064E11
fsTotalSize: 2.547211264E11
ok: 1.0

## Java MongoDB read data

MongoCollection is used to store mongo documents
returned from a collection. MongoCursor is a cursor to iterate
through the results of a database query. It makes sure that it is closed
in case of an exception.

com/zetcode/MongoReadAll.java
  

package com.zetcode;

import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import org.bson.Document;

import java.util.ArrayList;

public class MongoReadAll {

    public static void main(String[] args) {

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            var database = mongoClient.getDatabase("testdb");

            MongoCollection&lt;Document&gt; collection = database.getCollection("cars");

            try (MongoCursor&lt;Document&gt; cur = collection.find().iterator()) {

                while (cur.hasNext()) {

                    var doc = cur.next();
                    var cars = new ArrayList&lt;&gt;(doc.values());

                    System.out.printf("%s: %s%n", cars.get(1), cars.get(2));
                }
            }
        }
    }
}

In the example, we iterate over all data of the cars collection.

MongoCollection&lt;Document&gt; collection = database.getCollection("cars");

We retrieve the cars collection with the getCollection
method.

try (MongoCursor&lt;Document&gt; cur = collection.find().iterator()) {

    while (cur.hasNext()) {

        var doc = cur.next();
        var cars = new ArrayList&lt;&gt;(doc.values());

        System.out.printf("%s: %s%n", cars.get(1), cars.get(2));
    }
}

We iterate through the documents of the collection. The find method
finds all documents in the collection.

Audi: 52642.0
Mercedes: 57127.0
Skoda: 9000.0
Volvo: 29000.0
Bentley: 350000.0
Citroen: 21000.0
Hummer: 41400.0
Volkswagen: 21600.0

## Java MongoDB query operators

It is possible to filter the data using MongoDB query operators such as
$gt, $lt, or $ne. The query operators
can be specified in the BasicDBObject class.

com/zetcode/MongoReadGreaterThan.java
  

package com.zetcode;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import java.util.function.Consumer;

public class MongoReadGreaterThan {

    public static void main(String[] args) {

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            var database = mongoClient.getDatabase("testdb");

            MongoCollection&lt;Document&gt; collection = database.getCollection("cars");

            var query = new BasicDBObject("price",
                    new BasicDBObject("$gt", 30000));

            collection.find(query).forEach((Consumer&lt;Document&gt;) doc -&gt;
                     System.out.println(doc.toJson()));
        }
    }
}

The example prints all documents whose car prices' are greater than 30,000.

var query = new BasicDBObject("price",
    new BasicDBObject("$gt", 30000));

We use the $gt query operator.

collection.find(query).forEach((Consumer&lt;Document&gt;) doc -&gt;
    System.out.println(doc.toJson()));

The forEach method is a syntactic sugar to avoid the need
for the application code to worry about having to close the cursor manually.
The data is printed in the JSON format using the toJson method.

{"_id": {"$oid": "5d4d13d6463315268eb7376b"}, "name": "Audi", "price": 52642.0}
{"_id": {"$oid": "5d4d13f5463315268eb7376c"}, "name": "Mercedes", "price": 57127.0}
{"_id": {"$oid": "5d4d140d463315268eb7376f"}, "name": "Bentley", "price": 350000.0}
{"_id": {"$oid": "5d4d1415463315268eb73771"}, "name": "Hummer", "price": 41400.0}

This is the output of the example in the JSON format. Only cars more expensive
than 30,000 are included.

## Java MongoDB factory filter query methods

The Java MongoDB driver contains factory methods for query filters.

com/zetcode/MongoFilter.java
  

package com.zetcode;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.ArrayList;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.gt;
import static com.mongodb.client.model.Filters.lt;

public class MongoFilter {

    public static void main(String[] args) {

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            var database = mongoClient.getDatabase("testdb");

            MongoCollection&lt;Document&gt; collection = database.getCollection("cars");

            FindIterable fit = collection.find(and(lt("price", 50000),
                    gt("price", 20000))).sort(new Document("price", -1));

            var docs = new ArrayList&lt;Document&gt;();

            fit.into(docs);

            for (Document doc : docs) {

                System.out.println(doc);
            }
        }
    }
}

In the example, we retrieve cars whose prices fall between 20,000 and 50,000.

FindIterable fit = collection.find(and(lt("price", 50000),
    gt("price", 20000))).sort(new Document("price", -1));

The and, gt, and lt are factory
filter methods. In addition, the data is sorted with the sort
method.

Document{{_id=5d4d1415463315268eb73771, name=Hummer, price=41400.0}}
Document{{_id=5d4d1408463315268eb7376e, name=Volvo, price=29000.0}}
Document{{_id=5d4d1419463315268eb73772, name=Volkswagen, price=21600.0}}
Document{{_id=5d4d1411463315268eb73770, name=Citroen, price=21000.0}}

## Java MongoDB projections

The Projections class provides static factory methods for all
the MongoDB projection operators. By default, all fields of each document
are projected. We can use the include and exclude
methods to determine which fields should be projected into our output.

com/zetcode/MongoProjection.java
  

package com.zetcode;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import java.util.ArrayList;

import static com.mongodb.client.model.Projections.excludeId;

public class MongoProjection {

    public static void main(String[] args) {

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            var database = mongoClient.getDatabase("testdb");

            MongoCollection&lt;Document&gt; collection = database.getCollection("cars");

            FindIterable it = collection.find().projection(excludeId());

            var docs = new ArrayList&lt;Document&gt;();

            it.into(docs);

            for (Document doc : docs) {

                System.out.println(doc);
            }
        }
    }
}

The example excludes the _id field from the output.

FindIterable it = collection.find().projection(excludeId());

The projection method sets a document describing the fields
to return for all matching documents. The excludeId is
a synonym for exclude("_id").

Document{{name=Audi, price=52642.0}}
Document{{name=Mercedes, price=57127.0}}
Document{{name=Skoda, price=9000.0}}
Document{{name=Volvo, price=29000.0}}
Document{{name=Bentley, price=350000.0}}
Document{{name=Citroen, price=21000.0}}
Document{{name=Hummer, price=41400.0}}
Document{{name=Volkswagen, price=21600.0}}

## Java MongoDB limit data output

The limit query option specifies the number of documents
to be returned and the skip option skips the specified 
number of documents.

com/zetcode/MongoSkipLimit.java
  

package com.zetcode;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import java.util.function.Consumer;

public class MongoSkipLimit {

    public static void main(String[] args) {

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            var database = mongoClient.getDatabase("testdb");

            MongoCollection&lt;Document&gt; collection = database.getCollection("cars");
            FindIterable&lt;Document&gt; fit = collection.find().skip(2).limit(5);

            fit.forEach((Consumer&lt;Document&gt;) System.out::println);
        }
    }
}

The example reads from the testdb.cars collection, skips the first
two documents, and limits the output to five documents.

FindIterable&lt;Document&gt; fit = collection.find().skip(2).limit(5);

The FindIterable's skip method skips the first two documents
and the limit method limits the output to five documents.

fit.forEach((Consumer&lt;Document&gt;) System.out::println);

Here we use Java 8 construct to print the documents.

Document{{_id=5d4d13fb463315268eb7376d, name=Skoda, price=9000.0}}
Document{{_id=5d4d1408463315268eb7376e, name=Volvo, price=29000.0}}
Document{{_id=5d4d140d463315268eb7376f, name=Bentley, price=350000.0}}
Document{{_id=5d4d1411463315268eb73770, name=Citroen, price=21000.0}}
Document{{_id=5d4d1415463315268eb73771, name=Hummer, price=41400.0}}

## Java MongoDB create collection

The MongoDatabase's createCollection method
creates a new collection in the database. The MongoCollection's
insertMany method inserts one or more documents into the
collection.

com/zetcode/MongoCreateCollection.java
  

package com.zetcode;

import com.mongodb.MongoCommandException;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import java.util.ArrayList;

public class MongoCreateCollection {

    public static void main(String[] args) {

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            var database = mongoClient.getDatabase("testdb");

            try {

                database.createCollection("cars");
            } catch (MongoCommandException e) {

                database.getCollection("cars").drop();
            }

            var docs = new ArrayList&lt;Document&gt;();

            MongoCollection&lt;Document&gt; collection = database.getCollection("cars");

            var d1 = new Document("_id", 1);
            d1.append("name", "Audi");
            d1.append("price", 52642);
            docs.add(d1);

            var d2 = new Document("_id", 2);
            d2.append("name", "Mercedes");
            d2.append("price", 57127);
            docs.add(d2);

            var d3 = new Document("_id", 3);
            d3.append("name", "Skoda");
            d3.append("price", 9000);
            docs.add(d3);

            var d4 = new Document("_id", 4);
            d4.append("name", "Volvo");
            d4.append("price", 29000);
            docs.add(d4);

            var d5 = new Document("_id", 5);
            d5.append("name", "Bentley");
            d5.append("price", 350000);
            docs.add(d5);

            var d6 = new Document("_id", 6);
            d6.append("name", "Citroen");
            d6.append("price", 21000);
            docs.add(d6);

            var d7 = new Document("_id", 7);
            d7.append("name", "Hummer");
            d7.append("price", 41400);
            docs.add(d7);

            var d8 = new Document("_id", 8);
            d8.append("name", "Volkswagen");
            d8.append("price", 21600);
            docs.add(d8);

            collection.insertMany(docs);
        }
    }
}

The example creates a cars collection and inserts nine
documents into it.

try {

    database.createCollection("cars");
} catch (MongoCommandException e) {

    database.getCollection("cars").drop();
}

A new collection is created with the createCollection method.
If the collection already exists, it is dropped.

MongoCollection&lt;Document&gt; collection = database.getCollection("cars");

A MongoCollection of documents is created with the
getCollection method.

var d1 = new Document("_id", 1);
d1.append("name", "Audi");
d1.append("price", 52642);
docs.add(d1);

A new Document is created. It contains the information about the
car—its ID, name, and price.

collection.insertMany(docs);

The documents are written to the collection with the insertMany
method.

## Java MongoDB create collection from JSON

The JSON class has methods for parsing JSON documents.
JSON (JavaScript Object Notation) is a lightweight data-interchange
format. It is easy for humans to read and write.

com/zetcode/MongoCollectionFromJSON.java
  

package com.zetcode;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.bson.types.ObjectId;

public class MongoCollectionFromJSON {

    public static void main(String[] args) {

        try (var mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            var database = mongoClient.getDatabase("testdb");

            MongoCollection&lt;Document&gt; collection = database.getCollection("continents");

            var africa = BasicDBObject.parse("{_id : '" + ObjectId.get() + "', name : 'Africa'}");
            var asia = BasicDBObject.parse("{_id : '" + ObjectId.get() + "', name : 'Asia'}");
            var europe = BasicDBObject.parse("{_id : '" + ObjectId.get() + "', name : 'Europe'}");
            var america = BasicDBObject.parse("{_id : '" + ObjectId.get() + "', name : 'America'}");
            var australia = BasicDBObject.parse("{_id : '" + ObjectId.get() + "', name : 'Australia'}");
            var antarctica = BasicDBObject.parse("{_id : '" + ObjectId.get() + "', name : 'Antarctica'}");

            collection.insertOne(new Document(africa));
            collection.insertOne(new Document(asia));
            collection.insertOne(new Document(europe));
            collection.insertOne(new Document(america));
            collection.insertOne(new Document(australia));
            collection.insertOne(new Document(antarctica));
        }
    }
}

The example creates a continents collection from JSON data.

var africa = BasicDBObject.parse("{_id : '" + ObjectId.get() + "', name : 'Africa'}");

JSON data is parsed with the BasicDBObject.parse method. 

collection.insertOne(new Document(africa));

The BasicDBObject is passed to Document and inserted
into the collection with the insertOne method.

&gt; db.continents.find()
{ "_id" : "5d4af89645ffb636567b6448", "name" : "Africa" }
{ "_id" : "5d4af89645ffb636567b6449", "name" : "Asia" }
{ "_id" : "5d4af89645ffb636567b644a", "name" : "Europe" }
{ "_id" : "5d4af89645ffb636567b644b", "name" : "America" }
{ "_id" : "5d4af89645ffb636567b644c", "name" : "Australia" }
{ "_id" : "5d4af89645ffb636567b644d", "name" : "Antarctica" }

We show the created collection with mongo.

## Java MongoDB modify documents

The MongoCollection's deleteOne method is used to
delete a document and updateOne to update a document.

com/zetcode/MongoModify.java
  

package com.zetcode;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

import static com.mongodb.client.model.Filters.eq;

public class MongoModify {

    public static void main(String[] args) {

        try (var mongoClient = new MongoClient("localhost", 27017)) {

            var database = mongoClient.getDatabase("testdb");

            MongoCollection&lt;Document&gt; collection = database.getCollection("cars");

            collection.deleteOne(eq("name", "Skoda"));
            collection.updateOne(new Document("name", "Audi"),
                    new Document("$set", new Document("price", 52000)));

        }
    }
}

The example deletes a document containing Skoda and updates the price
of Audi.

collection.deleteOne(eq("name", "Skoda"));

The deleteOne deletes the document of Skoda.
The eq creates a filter that matches all documents where
the value of the field name equals the specified value.

collection.updateOne(new Document("name", "Audi"),
    new Document("$set", new Document("price", 52000)));

The price of Audi is changed to 52,000 with the updateOne method.

&gt; db.cars.find()
{ "_id" : ObjectId("5d4d13d6463315268eb7376b"), "name" : "Audi", "price" : 52000 }
{ "_id" : ObjectId("5d4d13f5463315268eb7376c"), "name" : "Mercedes", "price" : 57127 }
{ "_id" : ObjectId("5d4d1408463315268eb7376e"), "name" : "Volvo", "price" : 29000 }
{ "_id" : ObjectId("5d4d140d463315268eb7376f"), "name" : "Bentley", "price" : 350000 }
{ "_id" : ObjectId("5d4d1411463315268eb73770"), "name" : "Citroen", "price" : 21000 }
{ "_id" : ObjectId("5d4d1415463315268eb73771"), "name" : "Hummer", "price" : 41400 }
{ "_id" : ObjectId("5d4d1419463315268eb73772"), "name" : "Volkswagen", "price" : 21600 }

We confirm the changes with the mongo tool.

## Source

[MongoDB Java documentation](https://www.mongodb.com/languages/java)

In this article we have worked with MongoDB and Java. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).