+++
title = "Connecting to the SQLite database"
date = 2025-08-29T19:52:59.304+01:00
draft = false
description = "In this chapter of the SQLite Ruby tutorial, we create a connection to a database."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../queries/)

# Connecting to the SQLite database

last modified July 6, 2020 

This part of the SQLite Ruby tutorial will show you how to connect to 
a database and do a few simple things with the database.

## Before we start

The SQLite comes with the sqlite3 command line utility. It 
can be used to issue SQL commands against a database. Now we are going to use 
the sqlite3 command line tool to create a new database. 

$ sqlite3 test.db
SQLite version 3.6.22
Enter ".help" for instructions
Enter SQL statements terminated with a ";"

We provide a parameter to the sqlite3 tool. The test.db 
is a database name. It is a single file on our disk. If it is present, 
it is opened. If not, it is created. 

sqlite&gt; .tables
sqlite&gt; .exit
$ ls
test.db

The .tables command gives a list of tables in the test.db
database. There are currently no tables. The .exit command
terminates the interactive session of the sqlite3 command line tool. 
The ls Unix command shows the contents of the current working directory. 
We can see the test.db file. All data will be stored in this single file.

The sqlite-ruby interface is used to interact with SQLite database with
the Ruby language.

$ sudo apt-get install libsqlite3-ruby

The above command installs the module on Debian based Linux systems.

The first step is to create a Database object. The 
Database class encapsulates a single connection to an SQLite 
database. The database object is closed with the close method.

SQLite3::Database.new dbname
SQLite3::Database.open dbname

The new method creates a new Database object that opens the given
dbname file. If the file does not exist, it will be created if possible.
By default, the new database will return result rows as arrays.
The open method opens the database contained in the given file. 

SQLite3::Database.new ":memory:"

It is possible to create an in-memory database if we provide a special 
string :memory: for the file name.

## Sources

The [sqlite-ruby.rubyforge.org](http://sqlite-ruby.rubyforge.org/)
website was consulted when creating this tutorial.

## Version

In the first code example, we will get the version of the SQLite database.

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.new ":memory:"
    puts db.get_first_value 'SELECT SQLITE_VERSION()'
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

In the above Ruby script we create a new in-memory database. 
We execute an SQL statement which returns the version of the 
SQLite database. 

require 'sqlite3'

We use sqlite3 Ruby module to connect to the SQLite database.

db = SQLite3::Database.new ":memory:"

We create a new database object. The Database class encapsulates a single 
connection to an SQLite database. The database is created in memory. So it
is not permanent. 

puts db.get_first_value 'SELECT SQLITE_VERSION()'

We call the get_first_value method of the db object. 
It executes the SQL statement and obtains the first value of the first row of 
a result set.

rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e

We check for errors. This is important, since working with databases is
error prone. 

ensure
    db.close if db
end

In the end, we release the resources. 

$ ./version.rb
3.7.7

The output might look like the above. 

## Inserting data

We will create a Cars table and insert several rows to it.

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
    db.execute "CREATE TABLE IF NOT EXISTS Cars(Id INTEGER PRIMARY KEY, 
        Name TEXT, Price INT)"
    db.execute "INSERT INTO Cars VALUES(1,'Audi',52642)"
    db.execute "INSERT INTO Cars VALUES(2,'Mercedes',57127)"
    db.execute "INSERT INTO Cars VALUES(3,'Skoda',9000)"
    db.execute "INSERT INTO Cars VALUES(4,'Volvo',29000)"
    db.execute "INSERT INTO Cars VALUES(5,'Bentley',350000)"
    db.execute "INSERT INTO Cars VALUES(6,'Citroen',21000)"
    db.execute "INSERT INTO Cars VALUES(7,'Hummer',41400)"
    db.execute "INSERT INTO Cars VALUES(8,'Volkswagen',21600)"
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

The above script creates a Carstable and inserts 8 rows 
into the table. 

db = SQLite3::Database.open "test.db"

We connect to the test.db database. 

db.execute "CREATE TABLE IF NOT EXISTS Cars(Id INTEGER PRIMARY KEY, 
    Name TEXT, Price INT)"

The execute method executes the given SQL statement. 
A new Cars table is created if it does not already exist.

db.execute "INSERT INTO Cars VALUES(1,'Audi',52642)"
db.execute "INSERT INTO Cars VALUES(2,'Mercedes',57127)"

These two lines insert two cars into the table. Note that by default, we are in
the *autocommit mode*, where all changes to the table are immediately effective. 

sqlite&gt; .mode column  
sqlite&gt; .headers on

We verify the written data with the sqlite3 tool. First we 
modify the way the data is displayed in the console. We use the column 
mode and turn on the headers. 

sqlite&gt; SELECT * FROM Cars;
Id          Name        Price     
----------  ----------  ----------
1           Audi        52642     
2           Mercedes    57127     
3           Skoda       9000      
4           Volvo       29000     
5           Bentley     350000    
6           Citroen     21000     
7           Hummer      41400     
8           Volkswagen  21600 

This is the data that we have written to the Cars table.

## The last inserted row id

Sometimes we need to determine the id of the last inserted
row. We use the last_insert_row_id method
to find it. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.new ":memory:"
    
    db.execute "CREATE TABLE Friends(Id INTEGER PRIMARY KEY, Name TEXT)"
    db.execute "INSERT INTO Friends(Name) VALUES ('Tom')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Rebecca')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Jim')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Robert')"
    db.execute "INSERT INTO Friends(Name) VALUES ('Julian')"
    
    id = db.last_insert_row_id
    puts "The last id of the inserted row is #{id}"
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

We create a Friends table in memory. The Id is 
automatically incremented. 

db.execute "CREATE TABLE Friends(Id INTEGER PRIMARY KEY, Name TEXT)"

In SQLite, INTEGER PRIMARY KEY column is auto incremented. 
There is also an AUTOINCREMENT keyword. When used in 
INTEGER PRIMARY KEY AUTOINCREMENT a slightly different algorithm
for Id creation is used. 

db.execute "INSERT INTO Friends(Name) VALUES ('Tom')"
db.execute "INSERT INTO Friends(Name) VALUES ('Rebecca')"
db.execute "INSERT INTO Friends(Name) VALUES ('Jim')"
db.execute "INSERT INTO Friends(Name) VALUES ('Robert')"
db.execute "INSERT INTO Friends(Name) VALUES ('Julian')"

These five SQL statements insert five rows into the Friends table. 

id = db.last_insert_row_id

Using the last_insert_row_id method, we get the last 
inserted row Id.  

$ ./last_rowid.rb 
The last id of the inserted row is 5

We see the output of the script. 

## Fetching data

In the last example of this chapter we fetch some data. More about data 
fetching will be discussed in the Queries chapter. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
    
    stm = db.prepare "SELECT * FROM Cars LIMIT 5" 
    rs = stm.execute 
    
    rs.each do |row|
        puts row.join "\s"
    end
           
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    stm.close if stm
    db.close if db
end

In the example we fetch 5 rows from the Cars table. 

stm = db.prepare "SELECT * FROM Cars LIMIT 5" 
rs = stm.execute 

We prepare an SQL statement for execution with the prepare method. 
The method returns a statement object. Then the SQL statement is executed using
the execute method. It returns a result set. The ResutlSet 
object is a simple cursor over the data that the query returns.

rs.each do |row|
    puts row.join "\s"
end

With the each method we traverse the data in the result set. 
In each cycle, it returns a row. The row is an array of fields. These
fields are joined with a empty space to form a line. 

$ ./fetch.rb 
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000

This is the output of the fetch.rb script. 

In this chapter of the SQLite Ruby tutorial, we have shown how to establish 
a database connection to the SQLite database. We have explained scripts
which do some basic work with a database.

[Contents](..)
[Next](../queries/)