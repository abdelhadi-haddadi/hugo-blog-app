+++
title = "PouchDB tutorial"
date = 2025-08-29T20:01:33.525+01:00
draft = false
description = "Learn how to perform database operations in JavaScript using PouchDB, with examples and best practices."
image = "images/storage_browser.png"
imageBig = "images/storage_browser.png"
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PouchDB tutorial

last modified last modified October 18, 2023

 

PouchDB tutorial shows how work with PouchDB in JavaScript. PouchDB code
examples in this tutorial insert, remove, and delete documents in the database.

## PouchDB

PouchDB is a JavaScript implementation of CouchDB. PouchDB can be
used in the browser, locally in Node, and remotely via HTTP protocol.

By default, PouchDB ships with the IndexedDB adapter for the browser, LevelDB
adapter in Node.js, and CouchDB adapter for remote databases.

Apache CouchDB is open source document-oriented NoSQL database. It is
implemented in the Erlang language and uses JSON to store data, JavaScript as
its query language, and HTTP for an API.

## PouchDB create database

To create a new database, we instantiate a new PouchDB
object. It creates a reference to the database if the database already
exists.

const db = new PouchDB('mydb');

We create a new mydb database. Depending where it is run, it creates a new
database in the browser, in Node, or in a remote CouchDB database server.

## PouchDB in browser

We show how to use PouchDB in a browser.

public/index.html
  

&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;

&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;meta http-equiv="X-UA-Compatible" content="ie=edge"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;

&lt;body&gt;
    &lt;script src="js/pouchdb-7.0.0.min.js"&gt;&lt;/script&gt;
    &lt;script&gt;

        const db = new PouchDB('users');

        db.info()
            .then((info) =&gt; {
                console.log(info);
            })
    &lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;

We download a minified version of pouchdb and include
it in a script tag. Then we create a new users
database and write some information about it into the console. To check the
created database, we go to the storage inspector of the browser developer tools.

![storage_browser.png](images/storage_browser.png)

Figure: Storage browser in Chrome

This is the storage browser in Google Chrome. The data is persistent as long as
the tab exists.

## PouchDB installation on Node

We install PouchDB on Node.

$ npm init -y
$ npm i pouchdb

We create a new Node project and install PouchDB.

## PouchDB create document

A new PouchDB document is created with put method.

insert_doc.js
  

const PouchDB = require('pouchdb');

const db = new PouchDB('mydb');

doc = {
    _id: new Date().toISOString(),
    name: 'Peter',
    age: 23,
    occupation: 'designer'
};

db.put(doc).then((res) =&gt; {
    console.log("Document inserted OK");
}).catch((err) =&gt; {
    console.error(err);
});

The example creates a new mydb database locally.

doc = {
    _id: new Date().toISOString(),
    name: 'Peter',
    age: 23,
    occupation: 'designer'
}

This is a new document to be inserted into the database. We provide an
_id.

db.put(doc).then((res) =&gt; {
    console.log("Document inserted OK");
}).catch((err) =&gt; {
    console.error(err);
});

The document is inserted into the database.

$ ls mydb/
000022.ldb  000024.ldb  000025.log  CURRENT  LOCK  LOG  LOG.old  MANIFEST-000023

A new database is created locally in the mydb directory.

Alternatively, we can create a new document with post. When using
post, the _id is automatically generated for us.

insert_doc2.js
  

const PouchDB = require('pouchdb');

const db = new PouchDB('mydb');

doc = {
    name: 'Peter',
    age: 23,
    occupation: 'designer'
};

db.post(doc).then((res) =&gt; {
    console.log("Document inserted OK");
}).catch((err) =&gt; {
    console.error(err);
});

In the example, we create a new document with post. The document is
given an auto-generated _id such as
b781309e-0423-4b3e-96ad-238cf50debce.

## PouchDB get document

To retrieve a document from a database, we use the get
function.

get_doc.js
  

const PouchDB = require('pouchdb');

const db = new PouchDB('mydb');

db.get('b781309e-0423-4b3e-96ad-238cf50debce').then((doc) =&gt; {
    console.log(`${doc.name}, ${doc.age}, ${doc.occupation}`);
}).catch((err) =&gt; {
    console.error(err);
});

We retrieve a document from a database. We provide an _id
to the get method.

$ node get_doc.js
Peter, 23, designer

## PouchDB remove document

To remove a document from a database, we use the remove
function.

get_doc.js
  

const PouchDB = require('pouchdb');

const db = new PouchDB('mydb');

db.get('b781309e-0423-4b3e-96ad-238cf50debce').then((doc) =&gt; {
    return db.remove(doc);
}).then((res) =&gt; {
    console.log("The document has been removed");
}).catch((err) =&gt; {
    console.error(err);
});

In order to delete a document, we must first fetch with with get
and delete it later with remove.

## PouchDB bulkDocs

With the bulkDocs method, we can write many documents to the
database in a single bulk operation.

create_users.js
  

const PouchDB = require('pouchdb');

const db = new PouchDB('users');

doc1 = { _id: 'peter43@gmail.com', name: 'Peter', age: 23, occupation: 'designer' };
doc2 = { _id: 'sofia23@gmail.com', name: 'Sofia', age: 44, occupation: 'teacher' };
doc3 = { _id: 'paul54@gmail.com', name: 'Paul', age: 25, occupation: 'driver' };
docs = [doc1, doc2, doc3];

db.bulkDocs(docs).then((res) =&gt; {

    console.log("Documents inserted OK");
}).catch(() =&gt; {
    console.error(err);
});

In the example, we create a new database users and insert three documents
with bulkDocs.

## PouchDB allDocs

The allDocs is another PouchDB bulk method; it retrieves
many documents in one step.

all_docs.js
  

const PouchDB = require('pouchdb');

const db = new PouchDB('users');

db.allDocs({ include_docs: true, descending: true }, (err, doc) =&gt; {

    doc.rows.forEach(e =&gt; {
        console.log(e.doc);
    });

}).catch((err) =&gt; {
    console.error(err);
});;

In the example, we get all documents from the users database.

$ node all_docs.js
{ name: 'Sofia',
  age: 44,
  occupation: 'teacher',
  _id: 'sofia23@gmail.com',
  _rev: '1-80b0fba21acf487fc20ac499e928acd7' }
{ name: 'Peter',
  age: 23,
  occupation: 'designer',
  _id: 'peter43@gmail.com',
  _rev: '1-182869c3c446731fa8b6106910b87d8e' }
{ name: 'Paul',
  age: 25,
  occupation: 'driver',
  _id: 'paul54@gmail.com',
  _rev: '1-31bfc20f010c9a6127cb44d6621cee5c' }

## PouchDB update document

In the following example, we show how to update a document.

update_doc.js
  

const PouchDB = require('pouchdb');

const db = new PouchDB('users');

db.get('sofia23@gmail.com').then((doc) =&gt; {

    doc.age = 45;
    return db.put(doc);
}).then(() =&gt; {

    return db.get('sofia23@gmail.com');
}).then((doc) =&gt; {

    console.log(doc);
}).catch((err) =&gt; {

    console.error(err);
});

In order to update a document, we retrieve it, modify its attributes and put it
back to the database.

## Source

[PouchDB Guides](https://pouchdb.com/guides/)

In this article we have worked with PouchDB database. We have created several
code examples that show how to create JavaScript programs that interact with
PouchDB.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)