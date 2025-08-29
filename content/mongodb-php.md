+++
title = "MongoDB PHP"
date = 2025-08-29T19:52:44.053+01:00
draft = false
description = "In this tutorial, we show how to work with MongoDB in PHP. We use the new mongodb driver for PHP."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# MongoDB PHP

last modified July 6, 2020 

In this tutorial we show how to work with MongoDB in PHP. We use the new mongodb
driver for PHP.
There is a concise [PHP tutorial](/lang/php/) on ZetCode.

MongoDB is a NoSQL cross-platform document-oriented database. It is one of the most
popular databases available. 
MongoDB is developed by MongoDB Inc. and is published as free and open-source software.

A *record* in MongoDB is a document, which is a data structure composed of field and value 
pairs. MongoDB *documents* are similar to JSON objects. The values of fields may include 
other documents, arrays, and arrays of documents. MongoDB stores documents in *collections*. 
Collections are analogous to tables in relational databases and documents to rows.

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
MongoDB shell version: 2.4.9
connecting to: testdb
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

## Installing PHP driver

There are two drivers available: the legacy mongo driver
and the new mongodb driver. In this tutorial, we 
work with the new mongodb driver.

Next, we show how to manually install the PHP MongoDB driver.

$ git clone https://github.com/mongodb/mongo-php-driver.git
$ cd mongo-php-driver
$ git submodule sync &amp;&amp; git submodule update --init
$ phpize
$ ./configure
$ make 
$ sudo make install

We download the sources and install the driver from them.

extension=mongodb.so

We add the mongodb.so extension to the php.ini file.

## Database statistics

The first example connects to the testdb database and 
gets its statistics.

MongoDB\Driver\Manager is responsible for maintaining connections 
to MongoDB. MongoDB\Driver\Command represents a database command.
On success, the command returns MongoDB\Driver\Cursor.

dbstats.php
  

&lt;?php

try {

    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");

    $stats = new MongoDB\Driver\Command(["dbstats" =&gt; 1]);
    $res = $mng-&gt;executeCommand("testdb", $stats);
    
    $stats = current($res-&gt;toArray());

    print_r($stats);

} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e-&gt;getMessage(), "\n";
    echo "In file:", $e-&gt;getFile(), "\n";
    echo "On line:", $e-&gt;getLine(), "\n";       
}
    
?&gt;

The example connects to the testdb database and executes
the dbstats command. It shows some database statistics.

$mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");

With the MongoDB\Driver\Manager class, we connect to the 
testdb database. The 27017 is the default port on which
the MongoDB server listens.

$res = $mng-&gt;executeCommand("testdb", $stats);

The MongoDB\Driver\Command is used to execute the
dbstats command.

$stats = current($res-&gt;toArray());

The toArray method returns an array containing all results 
for this cursor and the current function returns the array's
current element. In our case, the array has one element.

print_r($stats);

The print_r function prints a human-readable representation
of the $stats variable.

$ php dbstats.php 
stdClass Object
(
    [db] =&gt; testdb
    [collections] =&gt; 3
    [objects] =&gt; 12
    [avgObjSize] =&gt; 52.666666666667
    [dataSize] =&gt; 632
    [storageSize] =&gt; 12288
    [numExtents] =&gt; 3
    [indexes] =&gt; 1
    [indexSize] =&gt; 8176
    [fileSize] =&gt; 201326592
    [nsSizeMB] =&gt; 16
    [dataFileVersion] =&gt; stdClass Object
        (
            [major] =&gt; 4
            [minor] =&gt; 5
        )

    [ok] =&gt; 1
)

This is the output of the dbstats.php program.

## Listing databases

The listDatabases command provides a list of all existing databases.

list_databases.php
  

&lt;?php

try {

    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");

    $listdatabases = new MongoDB\Driver\Command(["listDatabases" =&gt; 1]);
    $res = $mng-&gt;executeCommand("admin", $listdatabases);

    $databases = current($res-&gt;toArray());

    foreach ($databases-&gt;databases as $el) {
    
        echo $el-&gt;name . "\n";
    }

} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e-&gt;getMessage(), "\n";
    echo "In file:", $e-&gt;getFile(), "\n";
    echo "On line:", $e-&gt;getLine(), "\n";       
}

?&gt;

The example prints available databases in MongoDB.

$listdatabases = new MongoDB\Driver\Command(["listDatabases" =&gt; 1]);
$res = $mng-&gt;executeCommand("admin", $listdatabases);

We execute the listDatabases command. The command
is executed on the admin database.

$databases = current($res-&gt;toArray());

The command returns a single result document, which contains the 
information for all databases in the databases array field.

foreach ($databases-&gt;databases as $el) {

    echo $el-&gt;name . "\n";
}

We go through the databases array and print the names of the available
databases.

$ php list_databases.php 
testdb
test
local

On our local machine, we have these three databases.

## Reading data

MongoDB\Driver\Query is a value object that represents a database query.

read_all.php
  

&lt;?php

try {

    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $query = new MongoDB\Driver\Query([]); 
     
    $rows = $mng-&gt;executeQuery("testdb.cars", $query);
    
    foreach ($rows as $row) {
    
        echo "$row-&gt;name : $row-&gt;price\n";
    }
    
} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e-&gt;getMessage(), "\n";
    echo "In file:", $e-&gt;getFile(), "\n";
    echo "On line:", $e-&gt;getLine(), "\n";       
}

?&gt;

The example reads all data from the testdb.cars collection.

$query = new MongoDB\Driver\Query([]); 

A MongoDB\Driver\Query object is created. If we pass an empty array,
it reads all data.

$rows = $mng-&gt;executeQuery("testdb.cars", $query);

The executeQuery executes the query. The first parameter is
the collection name and the second parameter is the query.

foreach ($rows as $row) {

    echo "$row-&gt;name : $row-&gt;price\n";
}

We iterate over all matched documents.

$ php read_all.php 
Audi : 52642
Mercedes : 57127
Skoda : 9000
Volvo : 29000
Bentley : 350000
Citroen : 21000
Hummer : 41400
Volkswagen : 21600

This is the output of the read_all.php script.

## Filtering data

The MongoDB\Driver\Query contains a filter parameter which
is used to filter the data. 

filtering.php
  

&lt;?php

try {
         
    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    
    $filter = [ 'name' =&gt; 'Volkswagen' ]; 
    $query = new MongoDB\Driver\Query($filter);     
    
    $res = $mng-&gt;executeQuery("testdb.cars", $query);
    
    $car = current($res-&gt;toArray());
    
    if (!empty($car)) {
    
        echo $car-&gt;name, ": ", $car-&gt;price, PHP_EOL;
    } else {
    
        echo "No match found\n";
    }
    
} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e-&gt;getMessage(), "\n";
    echo "In file:", $e-&gt;getFile(), "\n";
    echo "On line:", $e-&gt;getLine(), "\n";    
}

?&gt;

The example searches for the price of a Volkswagen car.

$filter = [ 'name' =&gt; 'Volkswagen' ]; 
$query = new MongoDB\Driver\Query($filter); 

We provide the filter parameter to the MongoDB\Driver\Query.

$car = current($res-&gt;toArray());

if (!empty($car)) {

    echo $car-&gt;name, ": ", $car-&gt;price, PHP_EOL;
} else {

    echo "No match found\n";
}

We print the name and the price of the chosen car. We ensure that
the returned variable is not empty with the empty function.

$ php filtering.php 
Volkswagen: 21600

This is the output of the filtering.php script.

## Projections

Projections can be used to specify which fields should be
returned.

projection.php
  

&lt;?php

try {
     
    $filter = [];
    $options = ["projection" =&gt; ['_id' =&gt; 0]];
    
    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $query = new MongoDB\Driver\Query($filter, $options);
    
    $rows = $mng-&gt;executeQuery("testdb.cars", $query);
       
    foreach ($rows as $row) {
          
           print_r($row);
    }    
        
} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e-&gt;getMessage(), "\n";
    echo "In file:", $e-&gt;getFile(), "\n";
    echo "On line:", $e-&gt;getLine(), "\n";    
}

?&gt;

In the example, we hide the first field—the _id.

$options = ["projection" =&gt; ['_id' =&gt; 0]];

Projections are specified in a projection array. Here
we hide the _id field.

$query = new MongoDB\Driver\Query($filter, $options);     

The projections are passed in the second argument of the MongoDB\Driver\Query.

$ php projection.php 
stdClass Object
(
    [name] =&gt; Audi
    [price] =&gt; 52642
)
stdClass Object
(
    [name] =&gt; Mercedes
    [price] =&gt; 57127
)
...

This is the partial output of the projection.php script. Only the name and
price fields are returned. 

## Limiting data output

The limit query option specifies the number of documents 
to be returned and the sort option the sort order.

read_limit.php
  

&lt;?php

try {
     
    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    $query = new MongoDB\Driver\Query([], ['sort' =&gt; [ 'name' =&gt; 1], 'limit' =&gt; 5]);     
    
    $rows = $mng-&gt;executeQuery("testdb.cars", $query);
    
    foreach ($rows as $row) {
    
        echo "$row-&gt;name : $row-&gt;price\n";
    }
    
} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e-&gt;getMessage(), "\n";
    echo "In file:", $e-&gt;getFile(), "\n";
    echo "On line:", $e-&gt;getLine(), "\n";       
}

?&gt;

The example reads all data from the testdb.cars collection, limits 
the output to five cars, and sorts according to the car name in ascending order.

$query = new MongoDB\Driver\Query([], ['sort' =&gt; [ 'name' =&gt; 1], 'limit' =&gt; 5]); 

We specify the sort and limit options in the second
parameter of the query.

$ php read_limit.php 
Audi : 52642
Bentley : 350000
Citroen : 21000
Hummer : 41400
Mercedes : 57127

This is the output of the read_limit.php script.

## Bulk write

The MongoDB\Driver\Manager::executeBulkWrite method executes one or 
more write operations, including inserts, updates, and deletes.

bulkwrite.php
  

&lt;?php

try {
     
    $mng = new MongoDB\Driver\Manager("mongodb://localhost:27017");
    
    $bulk = new MongoDB\Driver\BulkWrite;
    
    $doc = ['_id' =&gt; new MongoDB\BSON\ObjectID, 'name' =&gt; 'Toyota', 'price' =&gt; 26700];
    $bulk-&gt;insert($doc);
    $bulk-&gt;update(['name' =&gt; 'Audi'], ['$set' =&gt; ['price' =&gt; 52000]]);
    $bulk-&gt;delete(['name' =&gt; 'Hummer']);
    
    $mng-&gt;executeBulkWrite('testdb.cars', $bulk);
        
} catch (MongoDB\Driver\Exception\Exception $e) {

    $filename = basename(__FILE__);
    
    echo "The $filename script has experienced an error.\n"; 
    echo "It failed with the following exception:\n";
    
    echo "Exception:", $e-&gt;getMessage(), "\n";
    echo "In file:", $e-&gt;getFile(), "\n";
    echo "On line:", $e-&gt;getLine(), "\n";    
}

?&gt;

The script inserts a new car, updates one car, and deletes one car.

$bulk = new MongoDB\Driver\BulkWrite();

The MongoDB\Driver\BulkWrite collects one or more write 
operations that should be sent to the server. 

$doc = ['_id' =&gt; new MongoDB\BSON\ObjectID, 'name' =&gt; 'Toyota', 'price' =&gt; 26700];

This is a new document to be inserted. The MongoDB\BSON\ObjectID generates
a new ObjectId. It is a value used to uniquely identify documents in a collection.

$bulk-&gt;insert($doc);

An insert operation is created with the insert method.

$bulk-&gt;update(['name' =&gt; 'Audi'], ['$set' =&gt; ['price' =&gt; 52000]]);

An update operation is created with the update method.
The $set operator replaces the value of a field with the 
specified value.

$bulk-&gt;delete(['name' =&gt; 'Hummer']);

A delete operation is created with the delete method.

$mng-&gt;executeBulkWrite('testdb.cars', $bulk);

The executeBulkWrite executes the three operations 
on the testdb.cars collection.

&gt; db.cars.find()
{ "_id" : ObjectId("571e05a6c4a3bc7dc758b457"), "name" : "Audi", "price" : 52000 }
{ "_id" : ObjectId("571e05b5c4a3bc7dc758b458"), "name" : "Mercedes", "price" : 57127 }
{ "_id" : ObjectId("571e05bec4a3bc7dc758b459"), "name" : "Skoda", "price" : 9000 }
{ "_id" : ObjectId("571e05c7c4a3bc7dc758b45a"), "name" : "Volvo", "price" : 29000 }
{ "_id" : ObjectId("571e05d0c4a3bc7dc758b45b"), "name" : "Bentley", "price" : 350000 }
{ "_id" : ObjectId("571e05e0c4a3bc7dc758b45c"), "name" : "Citroen", "price" : 21000 }
{ "_id" : ObjectId("571e05fcc4a3bc7dc758b45e"), "name" : "Volkswagen", "price" : 21600 }
{ "_id" : ObjectId("5720a4e581365b0e9414d0e1"), "name" : "Toyota", "price" : 26700 }

With the mongo tool we confirm the changes.

In this tutorial, we have worked with MongoDB and PHP.