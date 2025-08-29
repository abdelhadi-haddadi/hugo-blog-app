+++
title = "MySQL Ruby"
date = 2025-08-29T19:52:46.843+01:00
draft = false
description = "This is MySQL Ruby tutorial. It covers the basics of programming MySQL in Ruby language."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# MySQL Ruby

last modified July 6, 2020 

This is a Ruby programming tutorial for the MySQL database. It covers the basics 
of MySQL programming with Ruby. It uses the mysql module. The examples 
were created and tested on Ubuntu Linux. 

There is a similar [MySQL C API tutorial](/db/mysqlc/), 
[MySQL Visual Basic tutorial](/db/mysqlvb/), 
or [MySQL Python tutorial](/db/mysqlpython/) on ZetCode.

You may also consider 
to look at the [MySQL tutorial](/mysql/), too.

## MySQL &amp; Ruby

*MySQL* is a leading open source database management system. It is a multi user, 
multithreaded database management system. MySQL is especially popular on the web. 
It is on part of the very popular *LAMP* platform consisting of Linux, Apache, 
MySQL, and PHP. Currently MySQL is owned by Oracle. MySQL database is available on most 
important OS platforms. 
*Ruby* is a dynamic, reflective, general-purpose object-oriented programming language.
Recently it became very popular in web programming, mainly due to the successful
Ruby on Rails framework.

## mysql module

The mysql module is a Ruby interface to the MySQL server. 
It provides the same functions for Ruby programs that the 
MySQL C API provides for C programs.

$ sudo gem1.9 install mysql

Here we install the Ruby module for the MySQL database. 

## Before we start

 
We are going to create a new database user and a new database. 
To do this, we use the mysql client program.

 
$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 30
Server version: 5.0.67-0ubuntu6 (Ubuntu)
 
Type 'help;' or '\h' for help. Type '\c' to clear the buffer.
 
mysql&gt; SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema | 
| mysql              | 
+--------------------+
2 rows in set (0.00 sec)
 
 
 
We connect to the MySQL server using the root account. We show all available
databases with the SHOW DATABASES statement. 

 
 
mysql&gt; CREATE DATABASE mydb;
Query OK, 1 row affected (0.02 sec)
 
 
 
We create a new mydb database. We will use this database throughout 
the tutorial.

 
 
mysql&gt; CREATE USER user12@localhost IDENTIFIED BY '34klq*';
Query OK, 0 rows affected (0.00 sec)
 
mysql&gt; USE mydb;
Database changed
 
mysql&gt; GRANT ALL ON mydb.* to user12@localhost;
Query OK, 0 rows affected (0.00 sec)
 
mysql&gt; quit;
Bye
 
 
 
We create a new database user. We grant all privileges to this user
for all tables of the mydb database. 

 

## MySQL server version

In the first example, we will get the version of
the MySQL database. 

#!/usr/bin/ruby

require 'mysql'

begin
    con = Mysql.new 'localhost', 'user12', '34klq*'
    puts con.get_server_info
    rs = con.query 'SELECT VERSION()'
    puts rs.fetch_row    
    
rescue Mysql::Error =&gt; e
    puts e.errno
    puts e.error
    
ensure
    con.close if con
end

In this script, we get the server version. We do it in two different ways. 

require 'mysql'

We import the mysql module. The module has the classes and
methods to work with the MySQL database. 

con = Mysql.new 'localhost', 'user12', '34klq*'

We create the connection object. The parameters include the host name, user name
and password. In our case the host name is localhost, e.g. our computer.

puts con.get_server_info

The Mysql object that we have created has a get_server_info method.
It returns the version of the MySQL server installed. 

rs = con.query 'SELECT VERSION()'
puts rs.fetch_row    

Another way to get the version is to execute the SELECT VERSION
SQL statement. We fetch the data. Since we retrieve only one record, we
call the fetch_row method.

rescue Mysql::Error =&gt; e
    puts e.errno
    puts e.error

We check for errors. This is important, since working with databases is
error prone. 

ensure
    con.close if con
end

In the end, we release the resources. 

$ ./version.rb
5.5.9
5.5.9

The output might look like the above. 

## Listing databases

The MySQL Ruby module has a list_dbs method, which returns
available databases. 

#!/usr/bin/ruby

require 'mysql'

begin
    con = Mysql.new 'localhost', 'user12', '34klq*'

    con.list_dbs.each do |db|
        puts db
    end
    
rescue Mysql::Error =&gt; e
    puts e.errno
    puts e.error
    
ensure
    con.close if con
end

In this script, we print all available databases 
on our MySQL server. 

con.list_dbs.each do |db|
    puts db
end

The list_dbs method returns an array of available database
names. Using the each method of the array, we print each item 
of the array to the console.

$ ./listdb.rb
information_schema
mydb
test
world

On my system, I had the above databases created. 

## Creating and populating a table

We create a table and populate it with some data.

#!/usr/bin/ruby

require 'mysql'

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'
   
    con.query("CREATE TABLE IF NOT EXISTS \
        Writers(Id INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(25))")
    con.query("INSERT INTO Writers(Name) VALUES('Jack London')")
    con.query("INSERT INTO Writers(Name) VALUES('Honore de Balzac')")
    con.query("INSERT INTO Writers(Name) VALUES('Lion Feuchtwanger')")
    con.query("INSERT INTO Writers(Name) VALUES('Emile Zola')")
    con.query("INSERT INTO Writers(Name) VALUES('Truman Capote')")   
    
rescue Mysql::Error =&gt; e
    puts e.errno
    puts e.error
    
ensure
    con.close if con
end

We create a Writers table and add five authors to it. 

con.query("CREATE TABLE IF NOT EXISTS \
        Writers(Id INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(25))")

To execute an SQL statement, we use the query method.
This SQL statement creates a new database table called Writers. It has
two columns. Id and Name. 

con.query("INSERT INTO Writers(Name) VALUES('Jack London')")
con.query("INSERT INTO Writers(Name) VALUES('Honore de Balzac')")
...

We use the INSERT statement to insert authors to the table. Here
we add two rows. 

mysql&gt; SELECT * FROM Writers;
+----+-------------------+
| Id | Name              |
+----+-------------------+
|  1 | Jack London       |
|  2 | Honore de Balzac  |
|  3 | Lion Feuchtwanger |
|  4 | Emile Zola        |
|  5 | Truman Capote     |
+----+-------------------+
5 rows in set (0.00 sec)

After executing the script, we use the mysql client tool to 
select all data from the Writers table. 

## Retrieving data

Now that we have inserted some data into the database, we can retrieve it back.

#!/usr/bin/ruby

require "mysql"

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'

    rs = con.query("SELECT * FROM Writers")
    n_rows = rs.num_rows
    
    puts "There are #{n_rows} rows in the result set"
    
    n_rows.times do
        puts rs.fetch_row.join("\s")
    end
 
rescue Mysql::Error =&gt; e
    puts e.errno
    puts e.error
    
ensure
    con.close if con
end

In this example, we retrieve all data from the Writers table. 

con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'

The last parameter of the constructor is the database name, to 
which we connect. 

rs = con.query("SELECT * FROM Writers")

This SQL statement selects all data from the Writers table. 

n_rows = rs.num_rows

We get the number of rows in the result set using the num_rows
method of the result set object. 

n_rows.times do
    puts rs.fetch_row.join("\s")
end

Here we fetch each row with the fetch_row method. It returns
a row as an array of fields. By default, the fields are separated by new 
line, when printed. With the join method, we print each row 
on one line. The fields are separated by one space. 

$ ./retrieve1.rb
There are 5 rows in the result set
1 Jack London
2 Honore de Balzac
3 Lion Feuchtwanger
4 Emile Zola
5 Truman Capote

Next we present another way to retrieve data from the table. 

#!/usr/bin/ruby

require "mysql"

begin
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'

    rs = con.query("SELECT * FROM Writers")
    
    rs.each do |row|
        puts row.join("\s")
    end
        
rescue Mysql::Error =&gt; e
    puts e.errno
    puts e.error
    
ensure
    con.close if con
end

We print all data from the Writers table. This time we use
an each method of the result set to traverse the data. 

rs.each do |row|
    puts row.join("\s")
end

We iterate through the result set using the each method. 

$ ./retrieve2.rb
1 Jack London
2 Honore de Balzac
3 Lion Feuchtwanger
4 Emile Zola
5 Truman Capote

This is the output of the example. 

We can traverse data in form of a Ruby hash. 

#!/usr/bin/ruby

require 'mysql'

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'    
    rs = con.query "SELECT * FROM Writers WHERE Id IN (1, 2, 3)"
    puts "We have #{rs.num_rows} row(s)"
    
    rs.each_hash do |row|
       puts row['Id'] + " " + row['Name']
    end      
    
rescue Mysql::Error =&gt; e
    puts e    
ensure
    con.close if con
end

In the example, we use the each_hash iterator. Records from
the result set can be retrieved by their column names. 

rs.each_hash do |row|
    puts row['Id'] + " " + row['Name']
end     

We go through the result set with the each_hash method. 
Each returned row is a Ruby hash; a collection of key-value pairs. The keys
are the column names. 

$ ./retrieve3.rb
We have 3 row(s)
1 Jack London
2 Honore de Balzac
3 Lion Feuchtwanger

Ouput of the example. 

## Multiple statements

MySQL supports multiple statement execution. This must be enabled by a special 
option. 

#!/usr/bin/ruby

require 'mysql'

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'
    con.set_server_option Mysql::OPTION_MULTI_STATEMENTS_ON

    rs = con.query "SELECT Name FROM Writers WHERE Id=1;
                    SELECT Name FROM Writers WHERE Id=2;
                    SELECT Name FROM Writers WHERE Id=3"

    puts rs.fetch_row        
            
    while con.next_result
        rs = con.store_result    
        puts rs.fetch_row
    end       
         
rescue Mysql::Error =&gt; e
    puts e.errno
    puts e.error
    
ensure
    con.close if con
end

In this example, we have three SELECT statements in one query. 

con.set_server_option Mysql::OPTION_MULTI_STATEMENTS_ON

First we need to enable the multiple statements processing 
with the Mysql::OPTION_MULTI_STATEMENTS_ON.

rs = con.query "SELECT Name FROM Writers WHERE Id=1;
                SELECT Name FROM Writers WHERE Id=2;
                SELECT Name FROM Writers WHERE Id=3"

Here we define three SELECT statements. They are separated by 
a semicolon. 

puts rs.fetch_row 

The query method returns the first result set. We fetch a row from 
this result set. 

while con.next_result
    rs = con.store_result    
    puts rs.fetch_row
end   

We get additional result sets until there are no more statements left to 
process. 

$ ./multiplest.rb
Jack London
Honore de Balzac
Lion Feuchtwanger

Running the example. 

## Metadata

Metadata is information about the data in the database. Metadata in a MySQL
system contains information about the tables and columns, in which we store
data. Number of rows affected by an SQL statement is a metadata. Number of 
rows and columns returned in a result set belong to metadata as well. 

#!/usr/bin/ruby

require 'mysql'

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'    
    rs = con.query "SELECT * FROM Writers WHERE Id IN (1, 2, 3)"
    puts "We have #{con.field_count} fields"
    puts "We have #{rs.num_rows} row(s)"
    puts rs.fetch_row.join("\s")
    
rescue Mysql::Error =&gt; e
    puts e    
ensure
    con.close if con
end

In this script, we find out the number of rows and columns from 
an SQL query. 

rs = con.query "SELECT * FROM Writers WHERE Id IN (1, 2, 3)"

This SQL statement returns three rows. Each row has two columns. 

puts "We have #{con.field_count} fields"
puts "We have #{rs.num_rows} row(s)"

These two lines return the number of columns and rows in the result set.
Note that here a field is a synonym for a column. The returned data
is metadata. 

puts rs.fetch_row.join("\s")

Here we return one row from the result set. This is the original data stored
in our database table. 

For INSERT, DELETE and UPDATE statements
there is a method called rows_affected. This method returns the number
of rows affected by these three statements. 

#!/usr/bin/ruby

require 'mysql'

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'    
    con.query "DELETE FROM Writers WHERE Id IN (1, 2, 3)"
    
    puts "The query has affected #{con.affected_rows} rows"
    
rescue Mysql::Error =&gt; e
    puts e    
ensure
    con.close if con
end

In our example, we delete first three rows from the Writers table.

con.query "DELETE FROM Writers WHERE Id IN (1, 2, 3)"

An SQL statement, which deletes first three rows of the Writers table. 

puts "The query has affected #{con.affected_rows} rows"

Here we get the number of rows that were affected by the above SQL statement.
This number belongs to the metadata. 

$ ./affected.rb
The query has affected 3 rows

mysql&gt; SELECT * FROM Writers;
+----+---------------+
| Id | Name          |
+----+---------------+
|  4 | Emile Zola    |
|  5 | Truman Capote |
+----+---------------+
2 rows in set (0.00 sec)

We execute the affected.rb script and check for changes in the 
Writers table. Three rows have been deleted. 

In the next example, we are going to check for metadata about a field. 

#!/usr/bin/ruby

require 'mysql'

begin
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'
    rs = con.query "SELECT * FROM Writers WHERE Id=1"
    field = rs.fetch_field_direct 1
    
    puts "Table name: #{field.table}"
    puts "Field name: #{field.name}"
    puts "Field length: #{field.length}"
    puts "Field type: #{field.type}"
    
rescue Mysql::Error =&gt; e
    puts e
    
ensure
    con.close if con
end

We get one record from the database. We get the field's table name,
colum name, length and type. 

rs = con.query "SELECT * FROM Writers WHERE Id=1"

This query returns one row. It has two columns. 

field = rs.fetch_field_direct 1

Using the fetch_field_direct method, we get 
a specific record. More precisely, the record from the 
intersection of the first row, second column. 

puts "Table name: #{field.table}"
puts "Field name: #{field.name}"
puts "Field length: #{field.length}"
puts "Field type: #{field.type}"

We get the metadata using attribute readers of the field object. 

$ ./metadata.rb
Table name: Writers
Field name: Name
Field length: 25
Field type: 253

This is the output of the example. 

In our last example relating to the metadata, we will
print all rows from the table with their column names.

#!/usr/bin/ruby

require 'mysql'

begin
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'
    rs = con.query "SELECT * FROM Writers"
    
    fields = rs.fetch_fields    
    puts "%3s %s" % [fields[0].name, fields[1].name]
    
    rs.each_hash do |row|
        puts "%3s %s" % [row['Id'], row['Name']]
    end
    
rescue Mysql::Error =&gt; e
    puts e
    
ensure
    con.close if con
end

We print the contents of the Writers table to the
console. Now, we include the names of the columns too.

fields = rs.fetch_fields    
puts "%3s %s" % [fields[0].name, fields[1].name]

In the first step, we get the column names. They are printed
using the standard Ruby string formatting abilities. 

rs.each_hash do |row|
    puts "%3s %s" % [row['Id'], row['Name']]
end

Now the data is fechted and printed to the console. 
We do some formatting too. 

$ ./columnheaders.rb
 Id Name
  1 Jack London
  2 Honore de Balzac
  3 Lion Feuchtwanger
  4 Emile Zola
  5 Truman Capote

Ouput of the script. 

## Prepared statements

Now we will concern ourselves with prepared statements. When we write
prepared statements, we use placeholders instead of directly writing the
values into the statements. Prepared statements increase security 
and performance. 

#!/usr/bin/ruby

require 'mysql'

name = "Stefan Zweig"

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'    
    pst = con.prepare "INSERT INTO Writers(Name) VALUES(?)"
    pst.execute name
        
rescue Mysql::Error =&gt; e
    puts e    
    
ensure
    con.close if con
    pst.close if pst
end

In the above example, we insert a new row into the Writers
table. We use a prepared statement.

pst = con.prepare "INSERT INTO Writers(Name) VALUES(?)"

The prepare method is used to create a prepared
statement. The ? character is a placeholder. Later 
we bind a value to this placeholder.

pst.execute name

We bind a value from the name variable to the placeholder and
execute the prepared statement. 

pst.close if pst

The prepared statement is closed. 

mysql&gt; SELECT * FROM Writers;
+----+-------------------+
| Id | Name              |
+----+-------------------+
|  1 | Jack London       |
|  2 | Honore de Balzac  |
|  3 | Lion Feuchtwanger |
|  4 | Emile Zola        |
|  5 | Truman Capote     |
|  6 | Stefan Zweig      |
+----+-------------------+
6 rows in set (0.00 sec)

After the script was successfully run, we see a new author in the
Writers table. 

## Writing images

Some people prefer to put their images into the database, some prefer to keep them 
on the file system for their applications. Technical difficulties arise when we 
work with lots of images. Images are binary data. MySQL database has a special 
data type to store binary data called BLOB (Binary Large Object). 

mysql&gt; CREATE TABLE Images(Id INT PRIMARY KEY AUTO_INCREMENT, Data MEDIUMBLOB);
Query OK, 0 rows affected (0.06 sec)

For this example, we create a new table called Images. 

#!/usr/bin/ruby

require 'mysql'

begin
    
    fin = File.open("woman.jpg" , "rb")
    img = fin.read
    
rescue SystemCallError =&gt; e      
    puts e
ensure
    fin.close if fin 
end

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'  
    pst = con.prepare("INSERT INTO Images SET Data='%s'" % img.unpack('H*'))
    pst.execute    
    
rescue Mysql::Error =&gt; e
    puts e
    
ensure
    con.close if con
    pst.close if pst
end

In the above script, we read a JPG image and insert it into the Images table. 

fin = File.open("woman.jpg" , "rb")
img = fin.read

We open and read an image. The read
method returns the data as string. 

pst = con.prepare("INSERT INTO Images SET Data='%s'" % img.unpack('H*'))

This string data is placed into the prepared statement. Before doing so, it is 
decoded using the unpack method of the Ruby string object. 
Decoding is necessary, because the image object has many special characters which cannot
be processed normally.

## Reading images

In the previous example, we have inserted an image into the database table. 
Now we are going to read the image back from the table.

#!/usr/bin/ruby

require 'mysql'

begin
    
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'          
    rs = con.query "SELECT Data FROM Images LIMIT 1"    
    f = File.new "woman2.jpg", "wb"
    f.write rs.fetch_row.pack 'H*'

rescue Mysql::Error, SystemCallError =&gt; e
    puts e
    
ensure
    con.close if con
    f.close if f
end

We read one image from the Images table.

rs = con.query "SELECT Data FROM Images LIMIT 1" 

We select one record from the table. 

f = File.new "woman2.jpg", "wb"

We create a writable binary file. 

f.write rs.fetch_row.pack 'H*'

We fetch the data from the previous SQL statement and write it to 
the file. The fetch_row method returns an array object. 
Before the data is written to the
file, it is put back into the original format with the pack
method of the array. For both operations, decoding and reversing, we use
the same directive, 'H*'. It stands for hex string.

Now we should have an image called woman2.jpg in
our current directory. We can check if it is the same
image that we have inserted into the table. 

## Transaction support

A transaction is an atomic unit of database operations 
against the data in one or more databases. The effects of all the 
SQL statements in a transaction can be either all committed to 
the database or all rolled back.

By default, MySQL runs in the autocommit mode. In this mode, all changes to the tables 
are immediately effective. To prevent this, we have to turn off the autocommit mode. 
After disabling autocommit, changes to
transaction-aware tables are not permanent immediately. To store the changes,
we must call the COMMIT statement or ROLLBACK
to revert them. The Ruby MySQL has convenience methods for these SQL statements,
commit and rollback.

The MySQL database has different types of storage engines. The most common are the MyISAM
and the InnoDB engines. There is a trade-off between data security and
database speed. The MyISAM tables are faster to process and they do not support transactions.
The commit and rollback methods are not implemented. 
They do nothing. On the other hand, the InnoDB tables are more safe against the data loss. 
They support transactions. They are slower to process. 

mysql&gt; SELECT TABLE_NAME, ENGINE FROM information_schema.TABLES 
    -&gt; where TABLE_SCHEMA = 'mydb' AND TABLE_NAME='Writers';
+------------+--------+
| TABLE_NAME | ENGINE |
+------------+--------+
| Writers    | InnoDB |
+------------+--------+
1 row in set (0.00 sec)

The engine of the Writers table is InnoDB, which 
supports transactions.

#!/usr/bin/ruby

require 'mysql'

begin
    con = Mysql.new 'localhost', 'user12', '34klq*', 'mydb'

    con.autocommit false
    
    pst = con.prepare "UPDATE Writers SET Name = ? WHERE Id = ?"
    pst.execute "Leo Tolstoy", "1"
    pst.execute "Boris Pasternak", "2"
    pst.execute "Leonid Leonov"

    con.commit
    
rescue Mysql::Error =&gt; e
    puts e
    con.rollback
    
ensure
    pst.close if pst
    con.close if con
end

In this script, we try to update three rows. 

con.autocommit false

The autocommit mode is disabled. 

pst = con.prepare "UPDATE Writers SET Name = ? WHERE Id = ?"
pst.execute "Leo Tolstoy", "1"
pst.execute "Boris Pasternak", "2"
pst.execute "Leonid Leonov"

We execute three UPDATE statements. The last one
is incorrect. The second parameter is missing. 

con.commit 

If all is OK, changes are committed to the table. 

rescue Mysql::Error =&gt; e
    puts e
    con.rollback

In case of an error, changes are rolled back. 

$ ./update.rb
execute: param_count(2) != number of argument(1)

mysql&gt; SELECT * FROM Writers;
+----+-------------------+
| Id | Name              |
+----+-------------------+
|  1 | Jack London       |
|  2 | Honore de Balzac  |
|  3 | Lion Feuchtwanger |
|  4 | Emile Zola        |
|  5 | Truman Capote     |
|  6 | Stefan Zweig      |
+----+-------------------+
6 rows in set (0.00 sec)

Running the script gives an error. However, the transaction
was rolled back and the first two rows were not changed. 

This was MySQL Ruby tutorial. You may be also interested in [PostgreSQL Ruby tutorial](/db/postgresqlruby/),
[PyMySQL tutorial](/python/pymysql/), [SQLite Ruby tutorial](/db/sqliteruby/), or [MongoDB Ruby tutorial](/db/mongodbruby/).