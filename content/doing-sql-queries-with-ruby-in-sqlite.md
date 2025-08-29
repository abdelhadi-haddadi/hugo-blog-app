+++
title = "Doing SQL queries with Ruby in SQLite"
date = 2025-08-29T19:53:00.397+01:00
draft = false
description = "In this part of the SQLite Ruby tutorial, we perform several queries."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../connect/)
[Next](../bind/)

# Doing SQL queries with Ruby in SQLite

last modified July 6, 2020 

We have already established a connection to the database. Now we 
are going modify and fetch the data from the database. 

Data is retrieved from the database with the SELECT statement. 
In SQLite Ruby module, first we prepare the SQL statement with the 
prepare method. The SQL string is sent to the database engine, 
which checks the statement validity, syntax and in
some databases also the user permissions to perform certain queries. If all is OK, a
statement object is returned to the Ruby script. The next step
is the call to the execute method. The method executes the query
within the database. The data is retrieved. 

The Ruby SQLite module has several methods to fetch data from database 
tables. After the SQL statement was prepared and executed, we can go 
through the returned data.

## Fetching data

In the first example we fetch one row from the Cars table.

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.new "test.db"
    
    id = 1
    
    stm = db.prepare "SELECT * FROM Cars WHERE Id=?"
    stm.bind_param 1, id
    rs = stm.execute
    
    row = rs.next
    
    puts row.join "\s"
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    stm.close if stm
    db.close if db
end

In the example we do all the steps to get the first row
from the Cars table.

stm = db.prepare "SELECT * FROM Cars WHERE Id=?"

The SELECT statement is prepared with the prepare 
method. A statement object is returned. 

stm.bind_param 1, id

A parameter is bound to the placeholder in the statement.

rs = stm.execute

The statement is executed. A ResultSet object is returned. 

row = rs.next

We obtain the next row from the result set. Since we want to 
fetch only one row, we call the next method
once. 

puts row.join "\s"

The row is a Ruby array. The three fields are joined with a
space character to form a line using the join method.

$ ./fetch.rb
1 Audi 52642

This is the output of the example.

In the following example, we will fetch five rows. 
We put the next method in a while loop. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
        
    stm = db.prepare "SELECT * FROM Cars LIMIT 5"
    rs = stm.execute
    
    while (row = rs.next) do
        puts row.join "\s"
    end
        
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    stm.close if stm
    db.close if db
end

In this script we connect to the database and fetch 5 rows
of the Cars table.

stm = db.prepare "SELECT * FROM Cars LIMIT 5"

This is the SQL statement for fetching 5 rows. 

while (row = rs.next) do
    puts row.join "\s"
end

The next method is put inside the 
while loop. It returns the next row from the result set.
If no more rows are left, the method returns nil and the 
while loop is terminated.

We can get data from the result set using the each
method.

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

Again we select five rows from the Cars table. 

rs.each do |row|
    puts row.join "\s"
end

We use the each method to iterate over
the result set. 

The next example shows the database object's execute method.
It is a convenience method that saves a few keystrokes. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
        
    rows = db.execute "SELECT * FROM Cars LIMIT 5"
        
    for row in rows do
        puts row.join "\s"
    end
            
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

The example selects and prints five rows from the Cars table.

rows = db.execute "SELECT * FROM Cars LIMIT 5"

Here we do two jobs in one step. We prepare the statement and
execute it. The method returns the data in a Ruby array.

for row in rows do
    puts row.join "\s"
end

We print the data from the Ruby array. 

So far we have seen data returned in the form of a ResultSet 
or an array. The next example will return the data in the form of 
an array of hashes. This way we can identify field values by 
their column names. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
    db.results_as_hash = true
        
    ary = db.execute "SELECT * FROM Cars LIMIT 5"    
        
    ary.each do |row|
        printf "%s %s %s\n", row['Id'], row['Name'], row['Price']
    end
             
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

In the example we get fields by their column names. 

db.results_as_hash = true

We set the results_as_hash property to true. 
All rows will be returned as Hash objects, with the column names 
as the keys. 

ary.each do |row|
    printf "%s %s %s\n", row['Id'], row['Name'], row['Price']
end

We get the fields by their column names.

$ ./fetch_hash.rb
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000

We see the output of the example.

## Fetching a row or a value

Ruby SQLite module has two convenience methods for retrieving a 
row or a value. In the first example, we will get a single row
from a table. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
      
    row = db.get_first_row "SELECT * FROM Cars WHERE Id=1"       
    puts row.join "\s"
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

We get the data for the first row of the Cars table. 

row = db.get_first_row "SELECT * FROM Cars WHERE Id=1" 

The get_first_row method gets the first row
and discards all other rows. 

puts row.join "\s"

The row is printed to the console. 

$ ./fetchrow.rb
1 Audi 52642

Here we see the output of the fetchrow.rb example.

In the last example, we select a single value.

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open "test.db"
      
    val = db.get_first_value "SELECT Price FROM Cars WHERE Name='Bentley'"       
    puts val
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

We select a price for a specific car. 

val = db.get_first_value "SELECT Price FROM Cars WHERE Name='Bentley'"      

With the get_first_value method we select a specific field
of a row. In our case it is the price of the Bentley car. 

$ ./fetchvalue.rb
350000    

This is the output.

In this part of the SQLite Ruby tutorial, we have demonstrated how to fetch data
from the database using various methods. 

[Contents](..)
[Previous](../connect/)
[Next](../bind/)