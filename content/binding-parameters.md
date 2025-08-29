+++
title = "Binding parameters"
date = 2025-08-29T19:52:58.165+01:00
draft = false
description = "In this chapter of the SQLite Ruby tutorial, we bind parameters."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../queries/)
[Next](../images/)

# Binding parameters

last modified July 6, 2020 

SQL statements are often dynamically built. A user provides some input and
this input is built into the statement. A programmer must be cautious every time 
he deals with an input from a user. It has some serious security implications. 
The recommended way to dynamically build SQL statements is to use parameter binding. 

When we bind parameters, we create place holders in the statement. The placeholder
is a special mark in the SQL statement. It is often a question mark ?. 
Later a parameter is bound to the placeholder with a bind_param, execute, query etc. methods.
Binding parameters guards the program against SQL injections. It automatically escapes
some special characters and allows them to be handled correctly. 

Database performance is often improved when statements are prepared and their 
parameters bound prior to statement execution. In sqlite3 Ruby module 
the statements are always prepared. Even if we do not call the prepare 
method and call directly the execute method of the database object, 
the statement is prepared behind the scenes by the sqlite3 Ruby module. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.new "test.db"

    name = "Volkswagen"
    
    stm = db.prepare "SELECT * FROM Cars WHERE Name = ?"
    stm.bind_param 1, name
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

The example selects a row from the Cars table for a specific car name. 

name = "Volkswagen"

This is a value that could come from a user: for example, from a HTML form.

stm = db.prepare "SELECT * FROM Cars WHERE Name = ?"

The question mark ? is a placeholder for a value. It is added 
later in the script. 

stm.bind_param 1, name
rs = stm.execute

With the bind_param method, the name variable is associated
with the placeholder in the statement. The execute method will
return the result set. 

$ ./bindparam1.rb 
8 Volkswagen 21600

This is the output of the example.

Next we present another way of binding parameters. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.new "test.db"

    id = 4
    
    stm = db.prepare "SELECT * FROM Cars WHERE Id = :id"
    rs = stm.execute id
    
    row = rs.next    
    puts row.join "\s"
            
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    stm.close if stm
    db.close if db
end

We select a row from the Cars table for a specific Id. 

stm = db.prepare "SELECT * FROM Cars WHERE Id = :id"

Previously we have seen a question mark as a placeholder. SQLite Ruby 
supports named place holders too.

rs = stm.execute id

The parameter is bound in the execute method. 

We provide yet another way for binding parameters. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.new "test.db"

    id = 3
    row = db.get_first_row "SELECT * FROM Cars WHERE Id = ?", id       
    puts row.join "\s"
            
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

This time, everything—preparing the statement, binding the parameter 
and executing the statement—is done using one method.

row = db.get_first_row "SELECT * FROM Cars WHERE Id = ?", id    

The get_first_row is a convenience method, where three
things are done in one step.

In our final example, we will bind several parameters in one statement.

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.new ":memory:"
   
    stm = db.prepare "SELECT 2 + ? + 6 + ? + ?"
    stm.bind_params 3, 4, 6
    rs = stm.execute
    
    row = rs.next    
    puts row
            
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    stm.close if stm
    db.close if db
end

In the example, we have more place holders in the SQL statement.

stm = db.prepare "SELECT 2 + ? + 6 + ? + ?"

There are three place holders in the SELECT statement. 

stm.bind_params 3, 4, 6

We bind three values with the bind_params method.

$ ./bindparams.rb
21

This is the output of the bindparams.rb program.

In this part of the SQLite Ruby tutorial we talked about binding parameters.

[Contents](..)
[Previous](../queries/)
[Next](../images/)