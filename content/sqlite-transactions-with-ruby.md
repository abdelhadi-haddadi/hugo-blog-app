+++
title = "SQLite transactions with Ruby"
date = 2025-08-29T19:53:00.390+01:00
draft = false
description = "In this part of the SQLite Ruby tutorial, we work with database transactions and the autocommit mode."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../meta/)

# SQLite transactions with Ruby

last modified July 6, 2020 

In this chapter, we will work with transactions. First, we provide some
basic definitions. Then we present Ruby scripts that show, how to work
with transactions in Ruby sqlite3 module. We will also talk 
about the autocommit mode, which is essential to understand when dealing with 
transactions. 

## Definitions

A *transaction* is an atomic unit of database operations against 
the data in one or more databases. The effects of all the SQL 
statements in a transaction can be either all committed 
to the database or all rolled back. In the *autocommit mode*
the changes are immediately effective. To work with transactions we
start a transaction with the transaction method. The 
transaction is ended with either the commit or 
rollback methods. 

The database connection is in the autocommit mode by default. Note
that the default mode depends on the driver. In the SQLite Python
driver, the autocommit is turned off by default. 

In SQLite, any command other than the SELECT will start an implicit 
transaction. Also, within a transaction a command like CREATE TABLE ..., 
VACUUM, PRAGMA will commit previous changes before executing. 
Manual transactions are started with the BEGIN TRANSACTION statement and 
finished with the COMMIT or ROLLBACK statements.

SQLite supports three non-standard transaction levels: DEFERRED, 
IMMEDIATE, and EXCLUSIVE. 

## Examples

Now we will have some scripts that work with transactions and the
autocommit mode. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
    
    db.execute "DROP TABLE IF EXISTS Friends"
    db.execute "CREATE TABLE Friends(Id INTEGER PRIMARY KEY, Name TEXT)"
    db.execute "INSERT INTO Friends(Name) VALUES ('Tom')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Rebecca')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Jim')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Robert')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Julian')"
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

We create a Friends table and fill it with data. We do not 
explicitly start a transaction, nor do we call commit or rollback methods. 
Yet the data is written to the table. This is because the default working 
mode is autocommit. In this mode each SQL statement is immediately effective.

db.execute "DROP TABLE IF EXISTS Friends"
db.execute "CREATE TABLE Friends(Id INTEGER PRIMARY KEY, Name TEXT)"

We drop the Friends table if it already exists. Then we create 
the table with the CREATE TABLE statement. 

db.execute "INSERT INTO Friends(Name) VALUES ('Tom')"
db.execute "INSERT INTO Friends(Name) VALUES ('Rebecca')"
...

We insert data. 

$ ./autocommit.rb
$ sqlite3 test.db 
SQLite version 3.7.7 2011-06-23 19:49:22
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite&gt; SELECT * FROM Friends;
1|Tom
2|Rebecca
3|Jim
4|Robert
5|Julian

We execute the script and check the table with the sqlite3 command
line tool. The Friends table is successfully created.

In the second example we will start a transaction with
the transaction method.

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"

    db.transaction
    db.execute "DROP TABLE IF EXISTS Friends"
    db.execute "CREATE TABLE Friends(Id INTEGER PRIMARY KEY, Name TEXT)"
    db.execute "INSERT INTO Friends(Name) VALUES ('Tom')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Rebecca')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Jim')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Robert')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Julian')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Michael')"
    db.commit
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    db.rollback
    
ensure
    db.close if db
end

We recreate the Friends table. After the transaction 
method call, every statement is within a transaction until we call the 
commit method. We either save all changes or save nothing. This 
is the basic idea behind transactions.

db.transaction

The transaction method begins a new transaction. The method takes
an optional mode parameter, where we can specify the transaction level. The
default level DEFERRED. 

db.commit

The changes are written to the database. If we commented the line, the changes
would not be saved. 

db.rollback

In case of an error, we rollback the changes. 

sqlite&gt; SELECT * FROM Friends;
1|Tom
2|Rebecca
3|Jim
4|Robert
5|Julian
6|Michael

We verify with the sqlite3 command line tool that the changes 
were written.

When there is an error in the transaction, the transaction is rolled back
an no changes are committed to the database. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"

    db.transaction
    db.execute "UPDATE Friends SET Name='Thomas' WHERE Id=1"
    db.execute "UPDATE Friend SET Name='Bob' WHERE Id=4"
    db.commit
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    db.rollback
    
ensure
    db.close if db
end

In the code example we want to change two names. There are two 
statements that form a transaction. There is an error in the 
second SQL statement. Therefore the transaction is rolled back.

db.execute "UPDATE Friend SET Name='Bob' WHERE Id=4"

The name of the table is incorrect. There is no Friend table in
the database. 

$ ./rollingback.rb
Exception occurred
no such table: Friend

Running the example will display this error message. The transaction is 
rolled back. 

sqlite&gt; SELECT * FROM Friends;
1|Tom
2|Rebecca
3|Jim
4|Robert
5|Julian

The Friends table was not changed, even though 
the first UPDATE statement was correct.

We will again try to change two rows, this time in autocommit mode.

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.new "test.db"
    
    db.execute "UPDATE Friends SET Name='Thomas' WHERE Id=1"
    db.execute "UPDATE Friend SET Name='Bob' WHERE Id=4"
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

We try to update two names in the Friends table, changing 
Tom to Thomas and Robert to Bob.

db.execute "UPDATE Friends SET Name='Thomas' WHERE Id=1"
db.execute "UPDATE Friend SET Name='Bob' WHERE Id=4"

The second of the UPDATE statements is incorrect. 

$ ./autocommit2.rb
Exception occurred
no such table: Friend

We receive the same error message as in the previous example.

sqlite&gt; SELECT * FROM Friends;
1|Thomas
2|Rebecca
3|Jim
4|Robert
5|Julian

However this time, the first UPDATE statement was saved. The second one
was not. 

In this part of the SQLite Ruby tutorial, we have worked with transactions.

[Contents](..)
[Previous](../meta/)