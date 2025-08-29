+++
title = "Working with images"
date = 2025-08-29T19:52:59.273+01:00
draft = false
description = "In this part of the SQLite Ruby tutorial, we work with images. We insert an image to the database and retrieve it back."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../bind/)
[Next](../meta/)

# Working with images

last modified July 6, 2020 

In this chapter of the SQLite Ruby tutorial, we will work with image 
files. Note that some people oppose putting images into databases. Here 
we only show how to do it. We do not dwell into technical issues of whether 
to save images in databases or not. 

sqlite&gt; CREATE TABLE Images(Id INTEGER PRIMARY KEY, Data BLOB);

For this example, we create a new table called Images. For the images, we use
the BLOB data type, which stands for Binary Large Object. 

## Inserting images

In the first example, we are going to insert an image to the 
SQLite database. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    fin = File.open "woman.jpg" , "rb"
    img = fin.read
    
rescue SystemCallError =&gt; e      
    puts e
ensure
    fin.close if fin 
end

begin
    
    db = SQLite3::Database.open 'test.db'
    blob = SQLite3::Blob.new img
    db.execute "INSERT INTO Images VALUES(1, ?)", blob
    
rescue SQLite3::Exception =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    db.close if db
end

We read an image from the current working directory and write it into 
the Images table of the SQLite test.db database. 

fin = File.open "woman.jpg" , "rb"
img = fin.read

We open and read a JPG image. The read method returns the 
data as string.

blob = SQLite3::Blob.new img

We create an instance of the SQLite3::Blob class. It
is intended for working with binary data. 

db.execute "INSERT INTO Images VALUES(1, ?)", blob

The image is written to the database. 

## Reading images

In this section, we are going to perform the reverse operation.
We will read an image from the database table. 

#!/usr/bin/ruby

require 'sqlite3'

begin
    
    db = SQLite3::Database.open 'test.db'   
    data = db.get_first_value "SELECT Data FROM Images LIMIT 1"    

    f = File.new "woman2.jpg", "wb"
    f.write data

rescue SQLite3::Exception, SystemCallError =&gt; e 
    
    puts "Exception occurred"
    puts e
    
ensure
    f.close if f
    db.close if db
end

We read image data from the Images table and write it
to another file, which we call woman2.jpg. 

data = db.get_first_value "SELECT Data FROM Images LIMIT 1"  

This line selects the image data from the table.

f = File.new "woman2.jpg", "wb"
f.write data

We open a new image file and write the retrieved data
into that file. Then we close the file.  

This part of the SQLite Ruby tutorial was dedicated to reading and writing
images. 

[Contents](..)
[Previous](../bind/)
[Next](../meta/)