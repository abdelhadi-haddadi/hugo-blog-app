+++
title = "C# MongoDB tutorial"
date = 2025-08-29T19:51:05.951+01:00
draft = false
description = "C# MongoDB tutorial shows how to program MongoDB in C#. We create queries, modify documents, or perform projections."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# MongoDB tutorial

last modified July 5, 2023

 

C# MongoDB tutorial shows how to program MongoDB in C#.

## MongoDB

*MongoDB* is a NoSQL cross-platform document-oriented database. It is one
of the most popular databases available. MongoDB is developed by MongoDB Inc.
and is published as free and open-source software.

A record in MongoDB is a document, which is a data structure composed of
field and value pairs. MongoDB documents are similar to JSON objects. The
values of fields may include other documents, arrays, and arrays of
documents. MongoDB stores documents in collections. Collections are
analogous to tables in relational databases and documents to rows.

MongoDB represents JSON documents in binary-encoded format called
BSON behind the scenes. BSON extends the
JSON model to provide additional data types, ordered fields, and to
be efficient for encoding and decoding within different languages. The .NET
driver uses BsonDocument to represent BSON.

## MongoDB.Driver

*MongoDB.Driver* is the fficial .NET driver for MongoDB.

$ dotnet add package MongoDB.Driver

We need to add the MongoDB.Driver package to each .NET Core project.

## MongoDB create database

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

We create a testdb database and insert eight documents in the
cars collection. We will work with this data in the tutorial.

## C# MongoDB list databases

The first example connects to the MongoDB server and retrieves its databases.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace SimpleEx
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");
            var dbList = dbClient.ListDatabases().ToList();

            Console.WriteLine("The list of databases are:");

            foreach (var item in dbList)
            {
                Console.WriteLine(item);
            }
        }
    }
}

The example connects to the MongoDB server and retrieves all its databases.

var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

A MongoClient class is used to connect to the MongoDB server.  The
27017 is the default port on which the MongoDB server listens.

var dbList = dbClient.ListDatabases().ToList();

We get the list of the databases with the ListDatabases method.

foreach (var item in dbList)
{
    Console.WriteLine(item);
}

We go through the list and print the items.

$ dotnet run
The list of databases are:
{ "name" : "admin", "sizeOnDisk" : 32768.0, "empty" : false }
{ "name" : "config", "sizeOnDisk" : 86016.0, "empty" : false }
{ "name" : "local", "sizeOnDisk" : 81920.0, "empty" : false }
{ "name" : "test", "sizeOnDisk" : 212992.0, "empty" : false }
{ "name" : "testdb", "sizeOnDisk" : 155648.0, "empty" : false }

## C# MongoDB RunCommand

The RunCommand method runs a command on the database.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace MongoCommand
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

            IMongoDatabase db = dbClient.GetDatabase("testdb");

            var command = new BsonDocument { { "dbstats", 1 } };
            var result = db.RunCommand&lt;BsonDocument&gt;(command);
            Console.WriteLine(result.ToJson());
        }
    }
}

The example connects to the testdb database and gets its statistics.

IMongoDatabase db = dbClient.GetDatabase("testdb");

We get the database with the GetDatabase method.

var command = new BsonDocument { { "dbstats", 1 } };
var result = db.RunCommand&lt;BsonDocument&gt;(command);

With the RunCommand method, we execute the dbstats
command. The command returns a document which is a representation of a MongoDB
document.

Console.WriteLine(result.ToJson());

We print the document to the console in the JSON format.

$ dotnet run
{ "db" : "testdb", "collections" : 3, "views" : 0, "objects" : 15, "avgObjSize" : 57.0,
"dataSize" : 855.0, "storageSize" : 77824.0, "numExtents" : 0, "indexes" : 3,
"indexSize" : 77824.0, "fsUsedSize" : 160688828416.0, "fsTotalSize" : 254721126400.0, "ok" : 1.0 }

## C# MongoDB find document

We query for a document with a specific filter. The filter is given to the
Find method, which looks for a document applying the given
filter.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace FindDocument
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

            IMongoDatabase db = dbClient.GetDatabase("testdb");
            var cars = db.GetCollection&lt;BsonDocument&gt;("cars");

            var filter = Builders&lt;BsonDocument&gt;.Filter.Eq("price", 29000);

            var doc = cars.Find(filter).FirstOrDefault();
            Console.WriteLine(doc.ToString());
        }
    }
}

The example finds a document with a car whose price is 29000.

var cars = db.GetCollection&lt;BsonDocument&gt;("cars");

We get the cars collection with the GetCollection method.

var filter = Builders&lt;BsonDocument&gt;.Filter.Eq("price", 29000);

A filter is created; we look for a car with price equal to 29000.

var doc = cars.Find(filter).FirstOrDefault();

We pass the filter to the Find method and retrieve it
with the FirstOrDefault method.

$ dotnet run
{ "_id" : ObjectId("5d4d1408463315268eb7376e"), "name" : "Volvo", "price" : 29000.0 }

## C# MongoDB find all documents

If we do not specify a filter condition for the Find method,
we get all documents.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace FindAll
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");
            IMongoDatabase db = dbClient.GetDatabase("testdb");

            var cars = db.GetCollection&lt;BsonDocument&gt;("cars");
            var documents = cars.Find(new BsonDocument()).ToList();

            foreach (BsonDocument doc in documents)
            {
                Console.WriteLine(doc.ToString());
            }
        }
    }
}

The example retrieves all documents from the cars collection.

$ dotnet run
{ "_id" : ObjectId("5d4d13d6463315268eb7376b"), "name" : "Audi", "price" : 52000 }
{ "_id" : ObjectId("5d4d13f5463315268eb7376c"), "name" : "Mercedes", "price" : 57127.0 }
{ "_id" : ObjectId("5d4d1408463315268eb7376e"), "name" : "Volvo", "price" : 29000.0 }
{ "_id" : ObjectId("5d4d140d463315268eb7376f"), "name" : "Bentley", "price" : 350000.0 }
{ "_id" : ObjectId("5d4d1411463315268eb73770"), "name" : "Citroen", "price" : 21000.0 }
{ "_id" : ObjectId("5d4d1415463315268eb73771"), "name" : "Hummer", "price" : 41400.0 }
{ "_id" : ObjectId("5d4d1419463315268eb73772"), "name" : "Volkswagen", "price" : 21600.0 }

We get all seven documents.

## C# MongoDB query

Mongo support several query filtering operators such as Gt, Lt,
or Gte.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace MongoQuery
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

            IMongoDatabase db = dbClient.GetDatabase("testdb");
            var cars = db.GetCollection&lt;BsonDocument&gt;("cars");

            var builder = Builders&lt;BsonDocument&gt;.Filter;
            var filter = builder.Gt("price", 30000) &amp; builder.Lt("price", 55000);

            var docs = cars.Find(filter).ToList();

            docs.ForEach(doc =&gt; {
                Console.WriteLine(doc);
            });
        }
    }
}

The example prints all documents whose car prices are between 30000 and 55000.

var filter = builder.Gt("price", 30000) &amp; builder.Lt("price", 55000);

We build a filter with two operators: Gt and Lt.

$ dotnet run
{ "_id" : ObjectId("5d4d13d6463315268eb7376b"), "name" : "Audi", "price" : 52000 }
{ "_id" : ObjectId("5d4d1415463315268eb73771"), "name" : "Hummer", "price" : 41400.0 }

We have found two documents that match the criteria.

## C# MongoDB insert document

A new document is inserted into the collection with the InsertOne
method.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace InsertDocument
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

            IMongoDatabase db = dbClient.GetDatabase("testdb");

            var cars = db.GetCollection&lt;BsonDocument&gt;("cars");

            var doc = new BsonDocument
            {
                {"name", "BMW"},
                {"price", 34621}
            };

            cars.InsertOne(doc);
        }
    }
}

The example inserts a new car document into the cars collection.

var doc = new BsonDocument
{
    {"name", "BMW"},
    {"price", 34621}
};

A new BsonDocument is created.

cars.InsertOne(doc);

The document is inserted into the collection with the InsertOne
method.

## C# MongoDB skip and limit

The limit query option specifies the number of documents to be
returned and the skip option skips the specified number of
documents.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace LimitSkip
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

            IMongoDatabase db = dbClient.GetDatabase("testdb");

            var cars = db.GetCollection&lt;BsonDocument&gt;("cars");
            var docs = cars.Find(new BsonDocument()).Skip(3).Limit(3).ToList();

            docs.ForEach(doc =&gt;
            {
                Console.WriteLine(doc);
            });
        }
    }
}

The example reads from the testdb.cars collection, skips the first three
documents, and limits the output to three documents.

$ dotnet run
{ "_id" : ObjectId("5d4d140d463315268eb7376f"), "name" : "Bentley", "price" : 350000.0 }
{ "_id" : ObjectId("5d4d1411463315268eb73770"), "name" : "Citroen", "price" : 21000.0 }
{ "_id" : ObjectId("5d4d1415463315268eb73771"), "name" : "Hummer", "price" : 41400.0 }

The output contains three documents.

## C# MongoDB projections

Projections determine which fields are going to be included in the query
output.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace Projections
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

            IMongoDatabase db = dbClient.GetDatabase("testdb");

            var cars = db.GetCollection&lt;BsonDocument&gt;("cars");
            var docs = cars.Find(new BsonDocument()).Project("{_id: 0}").ToList();

            docs.ForEach(doc =&gt;
            {
                Console.WriteLine(doc);
            });
        }
    }
}

In the example, we find all documents. We exclude the _id from the output.

$ dotnet run
{ "name" : "Audi", "price" : 52000 }
{ "name" : "Mercedes", "price" : 57127.0 }
{ "name" : "Volvo", "price" : 29000.0 }
{ "name" : "Bentley", "price" : 350000.0 }
{ "name" : "Citroen", "price" : 21000.0 }
{ "name" : "Hummer", "price" : 41400.0 }
{ "name" : "Volkswagen", "price" : 21600.0 }

The output of the documents does not contain the _id field.

## C# MongoDB delete document

A document is deleted with the deleteOne method.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace DeleteDocument
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

            IMongoDatabase db = dbClient.GetDatabase("testdb");

            var cars = db.GetCollection&lt;BsonDocument&gt;("cars");
            var filter = Builders&lt;BsonDocument&gt;.Filter.Eq("name", "BMW");

            cars.DeleteOne(filter);
        }
    }
}

The example deletes a document whose car name is BMW.

## C# MongoDB update document

A document is updated with the UpdateOne method.

Program.cs
  

using MongoDB.Driver;
using MongoDB.Bson;

namespace UpdateDocument
{
    class Program
    {
        static void Main(string[] args)
        {
            var dbClient = new MongoClient("mongodb://127.0.0.1:27017");

            IMongoDatabase db = dbClient.GetDatabase("testdb");

            var cars = db.GetCollection&lt;BsonDocument&gt;("cars");

            var filter = Builders&lt;BsonDocument&gt;.Filter.Eq("name", "Audi");
            var update = Builders&lt;BsonDocument&gt;.Update.Set("price", 52000);

            cars.UpdateOne(filter, update);
        }
    }
}

The example updates a car document whose name is Audi. It sets a new price for
this document.

cars.UpdateOne(filter, update);

The UpdateOne method takes a filter to find the exact document
and the update operation to perform the actual change.

## Source

[MongoDB C# Driver](https://www.mongodb.com/docs/drivers/csharp/current/)

In this article we have worked with MongoDB in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).