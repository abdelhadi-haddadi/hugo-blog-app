+++
title = "Working with images with PHP in PostgreSQL"
date = 2025-08-29T19:52:49.208+01:00
draft = false
description = "In this part of the PostgreSQL PHP tutorial, we work with images. We insert an image to the database and retrieve it back."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../read/)
[Next](../meta/)

# Working with images with PHP in PostgreSQL

last modified July 6, 2020 

In this chapter of the PostgreSQL PHP tutorial, we will work with image files.
Some people do not agree with putting images into databases. Here we 
only show how to do it. We do not dwell into technical issues of whether to 
save images in databases or not. 

testdb=&gt; CREATE TABLE images(id INT PRIMARY KEY, data BYTEA);

For this example, we create a new table called images. For the images, we use
the BYTEA data type. It allows to store binary strings.

## Inserting images

In the first example, we are going to insert an image into the 
PostgreSQL database. 

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n");

$file_name = "woman.jpg";

$img = fopen($file_name, 'r') or die("cannot read image\n");
$data = fread($img, filesize($file_name));

$es_data = pg_escape_bytea($data);
fclose($img);

$query = "INSERT INTO images(id, data) Values(1, '$es_data')";
pg_query($con, $query); 

pg_close($con); 

?&gt;

We read an image from the current working directory 
and write it into the images table of the PostgreSQL 
testdb database. 

$file_name = "woman.jpg";

This is the name of the image file that we will insert
into the database. The image is located in the current working
directory.

$img = fopen($file_name, 'r') or die("cannot read image\n");
$data = fread($img, filesize($file_name));

We read binary data from the filesystem. 

$es_data = pg_escape_bytea($data);

Binary data might have characters that may cause problems when inserting
them into a database table. The pg_escape_bytea function
escapes the string for insertion into a bytea field. Later, 
when reading binary data from the database, the data must be un-escaped. 

fclose($img);

The handle pointing to the image file is closed.

$query = "INSERT INTO images(id, data) Values(1, '$es_data')";
pg_query($con, $query); 

The image is inserted into the database. 

## Reading images

In this section, we are going to perform the reverse operation.
We will read an image from the database table. 

&lt;?php 

$host = "localhost"; 
$user = "user12"; 
$pass = "34klq*"; 
$db = "testdb"; 

$con = pg_connect("host=$host dbname=$db user=$user password=$pass")
    or die ("Could not connect to server\n");

$query = "SELECT data FROM images WHERE id=1";
$res = pg_query($con, $query) or die (pg_last_error($con)); 

$data = pg_fetch_result($res, 'data');
$unes_image = pg_unescape_bytea($data);

$file_name = "woman2.jpg";
$img = fopen($file_name, 'wb') or die("cannot open image\n");
fwrite($img, $unes_image) or die("cannot write image data\n");
fclose($img);

pg_close($con); 

?&gt;

We read image data from the images table and write it
to another file, which we call woman2.jpg. 

$query = "SELECT data FROM images WHERE id=1";

This line is a SQL SELECT statement to retrieve the image data 
from the table.

$data = pg_fetch_result($res, 'data');

We fetch the data from the data column of the images table.

$unes_image = pg_unescape_bytea($data);

When we inserted the image data into the database, we have escaped
it. Now we have to un-escape it back to the original. 

$file_name = "woman2.jpg";
$img = fopen($file_name, 'wb') or die("cannot open image\n");

We open a file for writing. The new file name will be woman2.jpg.

fwrite($img, $unes_image) or die("cannot write image data\n");

The data is written to the filesystem.

This part of the PostgreSQL PHP tutorial was dedicated to reading and writing 
images. 

[Contents](..)
[Previous](../read/)
[Next](../meta/)