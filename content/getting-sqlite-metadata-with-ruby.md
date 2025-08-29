+++
title = "Getting SQLite metadata with Ruby"
date = 2025-08-29T19:52:59.298+01:00
draft = false
description = "In this part of the SQLite Ruby tutorial, we work with database metadata."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../images/)
[Next](../trans/)

# Getting SQLite metadata with Ruby

last modified July 6, 2020 

Metadata is information about the data in a database. Metadata in 
SQLite contains information about the tables and columns in which 
we store data. The number of rows that an SQL statement affects 
is metadata. The number of rows and columns returned in a result set 
are metadata as well.

Metadata in SQLite can be obtained using the PRAGMA command. 
SQLite objects may have attributes, which are metadata. Finally, we can
also obtain specific metatada from querying the SQLite system 
sqlite_master table. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
    pst = db.prepare "SELECT * FROM Cars LIMIT 6"    
    
    puts pst.columns
    puts pst.types
    puts pst.column_count
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    pst.close if pst
    db.close if db
end

In the above example, we get the column names, column types, and
the number of columns of a prepared statement. 

puts pst.columns
puts pst.types
puts pst.column_count

These three methods return the column names, column types, and
the number of columns of a prepared statement. 

$ ./cols_fields.rb
Id
Name
Price
INTEGER
TEXT
INT
3

The output shows three column names: Id, Name, 
and Price. The types are INTEGER, TEXT, 
and INT. 

The following example shows how to retrieve the number of changes produced 
by a particular SQL command.

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
    db.execute "DELETE FROM Friends WHERE Id IN (3, 4, 5)"
    
    n = db.changes
    puts "There has been #{n} changes"
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

We create a Friends table in memory. In the last SQL command, we delete three
rows. We use the changes method to get the number of changes done
by the last SQL operation. 

db.execute "DELETE FROM Friends WHERE Id IN (3, 4, 5)"

In this SQL statement, we delete three rows. 

n = db.changes
puts "There has been #{n} changes"

We find out the number of changes done by the last SQL
statement. 

$ ./changes.rb
There has been 3 changes

Example output.

In the next example, we will find out some data about the
Cars table. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db" 
    
    stm = db.prepare "PRAGMA table_info('Cars')" 
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

In this example, we issue the PRAGMA table_info(tableName) command
to get some metadata info about our Cars table. 

stm = db.prepare "PRAGMA table_info('Cars')" 
rs = stm.execute 

The PRAGMA table_info(Cars) command returns one row for each 
column in the Cars table. Columns in the result set include the column order 
number, column name, data type, whether or not the column can be 
NULL, and the default value for the column.

rs.each do |row|
    puts row.join "\s"
end    

We iterate over the result set and print the data. 

$ ./table_info.rb
0 Id INTEGER 0  1
1 Name TEXT 0  0
2 Price INT 0  0

Output of the example. 

Next we will print 5 rows from the Cars table with 
their column names.

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"

    rows = db.execute2 "SELECT * FROM Cars LIMIT 5"
      
    rows.each do |row|
        puts "%3s %-8s %s" % [row[0], row[1], row[2]]
    end    
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

We print five rows of the Cars table to the console. 
Now, we include the names of the columns too. The records are aligned
with the column names. 

rows = db.execute2 "SELECT * FROM Cars LIMIT 5"

The execute2 method executes the given SQL statement. 
The first row returned is the names of the columns.

rows.each do |row|
    puts "%3s %-8s %s" % [row[0], row[1], row[2]]
end 

The data is retrieved, formatted, and printed to the terminal.

$ ./column_names.rb
 Id Name     Price
  1 Audi     52642
  2 Mercedes 57127
  3 Skoda    9000
  4 Volvo    29000
  5 Bentley  350000

Output. 

In our last example related to the metadata, we will 
list all tables in the test.db database. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
    rows = db.execute &lt;&lt;SQL
        SELECT name FROM sqlite_master
            WHERE type='table'
            ORDER BY name;"
SQL
     
    rows.each do |row|
        puts row
    end    
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

The code example prints all available tables in the current database
to the terminal. 

    rows = db.execute &lt;&lt;SQL
        SELECT name FROM sqlite_master
            WHERE type='table'
            ORDER BY name;"
SQL

The table names are retrieved from the sqlite_master table.

$ ./list_tables.rb
Cars
Friends
Images

These were the tables on our system. 

In this part of the SQLite Ruby tutorial, we have worked with database
metadata. 

[Contents](..)
[Previous](../images/)
[Next](../trans/)