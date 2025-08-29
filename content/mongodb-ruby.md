+++
title = "MongoDB Ruby"
date = 2025-08-29T19:52:45.494+01:00
draft = false
description = "MongoDB Ruby tutorial shows how to program MongoDB in Ruby. MongoDB is a NoSQL cross-platform document-oriented database."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# MongoDB Ruby

last modified January 28, 2021

In this tutorial, we show how to work with MongoDB in Ruby. There is a concise
[Ruby tutorial](/lang/rubytutorial/) on ZetCode.

A record in MongoDB is a document, which is a data structure composed
of field and value pairs. MongoDB documents are similar to JSON
objects. The values of fields may include other documents, arrays, and arrays of
documents. MongoDB stores documents in collections.
Collections are analogous to tables in relational databases and
documents to rows.

$ sudo gem install mongo

The MongoDB Ruby driver is installed with sudo gem install mongo
command.

## Creating a database

The mongo tool is an interactive JavaScript shell interface to
MongoDB, which provides an interface for systems administrators as well as
a way for developers to test queries and operations directly with the database.

$ mongo testdb
MongoDB shell version v4.4.3
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
cars collection.

## Listing database collections

The Mongo::Client's collections method lists available
collections in a database.

list_collections.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

client.collections.each { |coll| puts coll.name }

client.close

The example connects to the testdb database and
retrieves all its collections.

require 'mongo'

We include the mongo driver.

Mongo::Logger.logger.level = ::Logger::FATAL

The default logging level is ::Logger::DEBUG which includes many
debugging information. For our output to be more readable, we choose
::Logger::FATAL debugging level.

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

Mongo::Client is used to connect to the MongoDB server.
We specify the URL and the database name. The 27017 is the default port
on which the MongoDB server listens.

client.collections.each { |coll| puts coll.name }

We go through the list of collections and print their names to
the console.

client.close

At the end, we close the connection. Generally, it is not recommended for
applications to call close. The connections are expensive and are
being reused. But since it is a one-off program and not a long running application
which reuses connections, we do call the method.

$ ./list_collections.rb
cars

## Server selection timeout

The :server_selection_timeout is the timeout in seconds for
selecting a server for an operation. Mongo::Error::NoServerAvailable
is raised when we cannot connect to the database server.

server_selection_timeout.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::DEBUG

begin

    client = Mongo::Client.new([ '127.0.0.1:2717' ], :database =&gt; "testdb",
                               :server_selection_timeout =&gt; 5)

    client[:cars].find.each { |doc| puts doc }

    client.close

rescue Mongo::Error::NoServerAvailable =&gt; e

    p "Cannot connect to the server"
    p e

end

The example has a wrong port number. By default, the server selection timeout
is thirty seconds. We set it to five seconds.

rescue Mongo::Error::NoServerAvailable =&gt; e

Mongo::Error::NoServerAvailable is thrown when the connection is not established
and the timeout has expired.

$ ./server_selection_timeout.rb
D, [2021-01-28T11:51:05.109837 #200040] DEBUG -- : MONGODB | Topology type 'unknown' initializing.
D, [2021-01-28T11:51:05.110081 #200040] DEBUG -- : MONGODB | There was a change in the members of the 'Unknown' topology.
D, [2021-01-28T11:51:05.110254 #200040] DEBUG -- : MONGODB | Server 127.0.0.1:2717 initializing.
...

The debug logging level provides these messages while trying to connect to the
server.

## Database statistics

The dbstats command gets statistics of a database.

dbstats.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ])

db = client.use("testdb")

db.command({"dbstats" =&gt; 1}).documents[0].each do |key, value|

    puts "#{key}: #{value}"
end

client.close

The example connects to the testdb database and shows its
statistics. The command method of the database object is used to
execute a command.

db = client.use("testdb")

The use method selects the testdb database.

db.command({"dbstats" =&gt; 1}).documents[0].each do |key, value|

    puts "#{key}: #{value}"
end

The command method executes the dbstats command and
parses the returned hash value.

$ ./dbstats.rb
db: testdb
collections: 1
views: 0
objects: 8
avgObjSize: 54.5
dataSize: 436.0
storageSize: 36864.0
indexes: 1
indexSize: 36864.0
totalSize: 73728.0
scaleFactor: 1.0
fsUsedSize: 222740852736.0
fsTotalSize: 483050881024.0
ok: 1.0

## Reading data

The find method finds documents in the collection.

read_all.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

client[:cars].find.each { |doc| puts doc }

client.close

In the example, we iterate over all data of the cars collection.

client[:cars].find.each { |doc| puts doc }

Passing an empty query returns all documents. We iterate through the documents
of the :cars collection using the each method.

$ ./read_all.rb
{"_id"=&gt;BSON::ObjectId('60129621ce69ba1028119242'), "name"=&gt;"Audi", "price"=&gt;52642.0}
{"_id"=&gt;BSON::ObjectId('60129627ce69ba1028119243'), "name"=&gt;"Mercedes", "price"=&gt;57127.0}
{"_id"=&gt;BSON::ObjectId('6012962fce69ba1028119244'), "name"=&gt;"Skoda", "price"=&gt;9000.0}
{"_id"=&gt;BSON::ObjectId('60129634ce69ba1028119245'), "name"=&gt;"Volvo", "price"=&gt;29000.0}
{"_id"=&gt;BSON::ObjectId('6012963ace69ba1028119246'), "name"=&gt;"Bentley", "price"=&gt;350000.0}
{"_id"=&gt;BSON::ObjectId('6012963ece69ba1028119247'), "name"=&gt;"Citroen", "price"=&gt;21000.0}
{"_id"=&gt;BSON::ObjectId('60129643ce69ba1028119248'), "name"=&gt;"Hummer", "price"=&gt;41400.0}
{"_id"=&gt;BSON::ObjectId('60129647ce69ba1028119249'), "name"=&gt;"Volkswagen", "price"=&gt;21600.0

## Counting documents

The count method returns the number of matching
documents in the collection.

count_documents.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

docs = client[:cars].find

puts "There are #{docs.count} documents"

client.close

The example counts the number of documents in the :cars collection.

docs = client[:cars].find

We retrieve all documents from the cars collection.

puts "There are #{docs.count} documents"

We print the number of returned documents.

$ ./count_documents.rb
There are 8 documents

## Reading one document

The find method takes an optional filter parameter which is used to
filter the incoming data.

read_one.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

client[:cars].find(:name =&gt; 'Volkswagen').each do |doc|

    puts doc
end

client.close

The example reads one document from the :cars collection.

client[:cars].find(:name =&gt; 'Volkswagen').each do |doc|

The find method only shows the document containing the Volkswagen
car.

$ ./read_one.rb
{"_id"=&gt;BSON::ObjectId('60129647ce69ba1028119249'), "name"=&gt;"Volkswagen", "price"=&gt;21600.0}

## Query operators

It is possible to filter data using MongoDB query operators such as
$gt, $lt, or $ne.

read_op.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

puts client[:cars].find("price" =&gt; {'$lt' =&gt; 30000}).to_a

puts "**************************"

client[:cars].find("price" =&gt; {'$gt' =&gt; 30000}).each do |doc|

    puts doc
end

client.close

The example prints all documents whose car prices' are lower than 30000 and
later all documents whose car prices' are greater than 30000.

puts client[:cars].find("price" =&gt; {'$lt' =&gt; 30000}).to_a

The $lt operator is used to get cars whose prices are lower
than 30000.

$ ./read_op.rb
{"_id"=&gt;BSON::ObjectId('6012962fce69ba1028119244'), "name"=&gt;"Skoda", "price"=&gt;9000.0}
{"_id"=&gt;BSON::ObjectId('60129634ce69ba1028119245'), "name"=&gt;"Volvo", "price"=&gt;29000.0}
{"_id"=&gt;BSON::ObjectId('6012963ece69ba1028119247'), "name"=&gt;"Citroen", "price"=&gt;21000.0}
{"_id"=&gt;BSON::ObjectId('60129647ce69ba1028119249'), "name"=&gt;"Volkswagen", "price"=&gt;21600.0}
**************************
{"_id"=&gt;BSON::ObjectId('60129621ce69ba1028119242'), "name"=&gt;"Audi", "price"=&gt;52642.0}
{"_id"=&gt;BSON::ObjectId('60129627ce69ba1028119243'), "name"=&gt;"Mercedes", "price"=&gt;57127.0}
{"_id"=&gt;BSON::ObjectId('6012963ace69ba1028119246'), "name"=&gt;"Bentley", "price"=&gt;350000.0}
{"_id"=&gt;BSON::ObjectId('60129643ce69ba1028119248'), "name"=&gt;"Hummer", "price"=&gt;41400.0}

The $and and $or logical operators can be used to
combine multiple expressions.

read_and_or.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

puts client[:cars].find('$or' =&gt; [{:name =&gt; "Audi"}, {:name =&gt; "Skoda" }]).to_a

puts "*************************************"

puts client[:cars].find('$and' =&gt; [{:price =&gt; {'$gt' =&gt; 20000}},
    {:price =&gt; {'$lt' =&gt; 50000 }}]).to_a

client.close

The example presents both $or and $and operators.

puts client[:cars].find('$or' =&gt; [{:name =&gt; "Audi"}, {:name =&gt; "Skoda" }]).to_a

The $or operator is used to return documents whose names are either
Audi or Skoda.

puts client[:cars].find('$and' =&gt; [{:price =&gt; {'$gt' =&gt; 20000}},
    {:price =&gt; {'$lt' =&gt; 50000 }}]).to_a

The $and operator retrieves cars whose prices fall between 20000
and 50000.

$ ./read_and_or.rb
{"_id"=&gt;BSON::ObjectId('60129621ce69ba1028119242'), "name"=&gt;"Audi", "price"=&gt;52642.0}
{"_id"=&gt;BSON::ObjectId('6012962fce69ba1028119244'), "name"=&gt;"Skoda", "price"=&gt;9000.0}
*************************************
{"_id"=&gt;BSON::ObjectId('60129634ce69ba1028119245'), "name"=&gt;"Volvo", "price"=&gt;29000.0}
{"_id"=&gt;BSON::ObjectId('6012963ece69ba1028119247'), "name"=&gt;"Citroen", "price"=&gt;21000.0}
{"_id"=&gt;BSON::ObjectId('60129643ce69ba1028119248'), "name"=&gt;"Hummer", "price"=&gt;41400.0}
{"_id"=&gt;BSON::ObjectId('60129647ce69ba1028119249'), "name"=&gt;"Volkswagen", "price"=&gt;21600.0}

## Projections

Projections determine which fields to include or exclude from each document in
the result set.

projection.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

cursor = client[:cars].find({}, { :projection =&gt; {:_id =&gt; 0} })

cursor.each { |doc| puts doc }

client.close

The example excludes the _id field from the output.

cursor = client[:cars].find({}, { :projection =&gt; {:_id =&gt; 0} })

We specify the :projection option in the second parameter of the
find method.

$ ./projection.rb
{"name"=&gt;"Audi", "price"=&gt;52642.0}
{"name"=&gt;"Mercedes", "price"=&gt;57127.0}
{"name"=&gt;"Skoda", "price"=&gt;9000.0}
{"name"=&gt;"Volvo", "price"=&gt;29000.0}
{"name"=&gt;"Bentley", "price"=&gt;350000.0}
{"name"=&gt;"Citroen", "price"=&gt;21000.0}
{"name"=&gt;"Hummer", "price"=&gt;41400.0}
{"name"=&gt;"Volkswagen", "price"=&gt;21600.0}

The _id has not been included.

## Limiting data output

The limit method specifies the number of documents to be returned
and the skip method the number of documents to skip.

skip_limit.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

docs = client[:cars].find().skip(2).limit(5)

docs.each do |doc|

    puts doc
end

client.close

The example reads from the testdb.cars collection, skips the first
two documents, and limits the output to five documents.

docs = client[:cars].find().skip(2).limit(5)

The skip method skips the first two documents and the
limit method limits the output to five documents.

$ ./skip_limit.rb
{"_id"=&gt;BSON::ObjectId('6012962fce69ba1028119244'), "name"=&gt;"Skoda", "price"=&gt;9000.0}
{"_id"=&gt;BSON::ObjectId('60129634ce69ba1028119245'), "name"=&gt;"Volvo", "price"=&gt;29000.0}
{"_id"=&gt;BSON::ObjectId('6012963ace69ba1028119246'), "name"=&gt;"Bentley", "price"=&gt;350000.0}
{"_id"=&gt;BSON::ObjectId('6012963ece69ba1028119247'), "name"=&gt;"Citroen", "price"=&gt;21000.0}
{"_id"=&gt;BSON::ObjectId('60129643ce69ba1028119248'), "name"=&gt;"Hummer", "price"=&gt;41400.0}

## Aggregations

Aggregations calculate aggregate values for the data in a collection.

sum_all_cars.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

agr = [{"$group" =&gt; {:_id =&gt; 1, :all =&gt; { "$sum" =&gt; "$price" } }}];

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

client[:cars].aggregate(agr).each { |doc| puts doc }

The example calculates the prices of all cars in the collection.

agr = [{"$group" =&gt; {:_id =&gt; 1, :all =&gt; { "$sum" =&gt; "$price" } }}];

The $sum operator calculates and returns the sum of numeric values.
The $group operator groups input documents by a specified identifier
expression and applies the accumulator expression(s), if specified, to each group.

client[:cars].aggregate(agr).each { |doc| puts doc }

The aggregate method applies the aggregation operation on the
cars collection.

$ ./sum_all_cars.rb
{"_id"=&gt;1, "all"=&gt;581769.0}

The sum of all prices is 581769.

We can use the $match operator to select specific cars to
aggregate.

sum_two_cars.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

agr = [{"$match" =&gt; {"$or" =&gt; [ { :name =&gt; "Audi" }, { :name =&gt; "Volvo" }]}},
       {"$group" =&gt; {:_id =&gt; 1, :sumOfTwo =&gt; { "$sum" =&gt; "$price" } }}];

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

client[:cars].aggregate(agr).each { |doc| puts doc }

client.close

The example calculates the sum of prices of Audi and Volvo cars.

agr = [{"$match" =&gt; {"$or" =&gt; [ { :name =&gt; "Audi" }, { :name =&gt; "Volvo" }]}},
       {"$group" =&gt; {:_id =&gt; 1, :sumOfTwo =&gt; { "$sum" =&gt; "$price" } }}];

The expression uses $match, $or, $group,
and $sum operators to do the task.

$ ./sum_two_cars.rb
{"_id"=&gt;1, "sumOfTwo"=&gt;81642.0}

The sum of the two cars' prices is 81642.

## Inserting a document

The insert_one method inserts a single document into
a collection.

insert_doc.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

doc = { :_id =&gt; BSON::ObjectId.new, :name =&gt; "Toyota", :price =&gt; 37600 }

client[:cars].insert_one doc

client.close

The example inserts one car into the cars collection.

doc = { :_id =&gt; BSON::ObjectId.new, :name =&gt; "Toyota", :price =&gt; 37600 }

This is the document to be inserted.

client[:cars].insert_one doc

The insert_one method inserts the document into
the collection.

&gt; db.cars.find({name:"Toyota"})
{ "_id" : ObjectId("60129c9e4c9be8109fc53ddc"), "name" : "Toyota", "price" : 37600 }

We confirm the insertion with the mongo tool.

## Inserting many documents

The insert_many method inserts multiple documents into a collection.

create_collection.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

result = client[:continents].insert_many([
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Africa' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'America' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Antarctica' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Australia' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Asia' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Europe' }
])

puts "#{result.inserted_count} documents were inserted"

client.close

The example creates a continents collection and inserts six documents into it.

result = client[:continents].insert_many([
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Africa' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'America' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Antarctica' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Australia' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Asia' },
  { :_id =&gt; BSON::ObjectId.new, :name =&gt; 'Europe' }
])

An array of six records is inserted into the new collection with the
insert_many method. BSON::ObjectId.new creates a new
ObjectID, which is a unique value used to identify documents instead of
integers.

puts "#{result.inserted_count} documents were inserted"

The inserted_count from the returned result gives the number of
successfully inserted documents.

&gt; db.continents.find()
{ "_id" : ObjectId("60129bbd4c9be8102bc1ee37"), "name" : "Africa" }
{ "_id" : ObjectId("60129bbd4c9be8102bc1ee38"), "name" : "America" }
{ "_id" : ObjectId("60129bbd4c9be8102bc1ee39"), "name" : "Antarctica" }
{ "_id" : ObjectId("60129bbd4c9be8102bc1ee3a"), "name" : "Australia" }
{ "_id" : ObjectId("60129bbd4c9be8102bc1ee3b"), "name" : "Asia" }
{ "_id" : ObjectId("60129bbd4c9be8102bc1ee3c"), "name" : "Europe" }

The continents collection has been successfully created.

## Modifying documents

The delete_one method is used to delete a document and
update_one to update a document.

modify.rb
  

#!/usr/bin/ruby

require 'mongo'

Mongo::Logger.logger.level = ::Logger::FATAL

client = Mongo::Client.new([ '127.0.0.1:27017' ], :database =&gt; 'testdb')

client[:cars].delete_one({:name =&gt; "Skoda"})
client[:cars].update_one({:name =&gt; "Audi"}, '$set' =&gt; {:price =&gt; 52000})

client.close

The example deletes a document containing Skoda and updates the price of Audi.

client[:cars].delete_one({:name =&gt; "Skoda"})

The delete_one deletes the document of Skoda.

client[:cars].update_one({:name =&gt; "Audi"}, '$set' =&gt; {:price =&gt; 52000})

The price of Audi is changed to 52000 with the update_one method.
The $set operator is used to change the price.

&gt; db.cars.find()
{ "_id" : ObjectId("60129621ce69ba1028119242"), "name" : "Audi", "price" : 52000 }
{ "_id" : ObjectId("60129627ce69ba1028119243"), "name" : "Mercedes", "price" : 57127 }
{ "_id" : ObjectId("60129634ce69ba1028119245"), "name" : "Volvo", "price" : 29000 }
{ "_id" : ObjectId("6012963ace69ba1028119246"), "name" : "Bentley", "price" : 350000 }
{ "_id" : ObjectId("6012963ece69ba1028119247"), "name" : "Citroen", "price" : 21000 }
{ "_id" : ObjectId("60129643ce69ba1028119248"), "name" : "Hummer", "price" : 41400 }
{ "_id" : ObjectId("60129647ce69ba1028119249"), "name" : "Volkswagen", "price" : 21600 }
{ "_id" : ObjectId("60129c9e4c9be8109fc53ddc"), "name" : "Toyota", "price" : 37600 }

We confirm the changes with the mongo tool.

In this tutorial, we have worked with MongoDB and Ruby.