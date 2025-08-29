+++
title = "MySQL data types"
date = 2025-08-29T20:03:44.218+01:00
draft = false
description = "In this part of the MySQL tutorial, we will cover MySQL data types."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../storageengines/)
[Next](../tables/)

# MySQL data types

last modified January 10, 2023 

In this part of the MySQL tutorial, we cover MySQL data types. 

A data type is a set of representable values. Each value belongs to 
one data type. Items that can be referenced by a name, such as SQL 
parameters, columns, fields, attributes, and variables, also have declared types. 

MySQL supports these groups of data types:

    - [Numeric](#numbers)

    - [Date &amp; time](#datetime)

    - [String](#strings)

    - [JSON](#json)

Choosing the right data types for columns is a part of the initial design
of the database. Data types ensure the correctness of the data provided. 
They ensure that the data is used in a meaningful way. This is important when
we do comparisons, ordering of data. For example dates are compared differently than
numbers. Other developers using our tables will know what data to expect from the
database schema. Data types enable MySQL to do validation on the data inserted. 
Finally, with correct data types for table columns, we allow MySQL to optimise
the queries and use less disk space. 

## Numbers

Numeric types can be either integers or floating point numbers.

  Integers
    
      1. $1
      
      2. $1

      3. $1

      4. $1

      5. $1

    

   
  Floating points
    
      1. $1

      2. $1

      3. $1

    

### Integers

Integers are a subset of the real numbers. They are written without a 
fraction or a decimal component. Integers fall within a set 
Z = {..., -2, -1, 0, 1, 2, ...} Integers are infinite.
Computers can practically work only with a subset of integer values, 
because computers have finite capacity. Integers are used to count discrete 
entities. We can have 3, 4, 6 cars, but we cannot have 3.33 cars. 
We can have 3.33 kilograms.

The following is a table of integer types in MySQL: TINYINT, 
MEDIUMINT and BIGINT are MySQL extensions to the 
SQL standard. 

 
Table 1: Signed integer types
   
    Data type 
    Bytes
    Minimum value 
    Maximum value
   
   
    TINYINT 
    1     
    -128
    127
   
   
    SMALLINT 
    2     
    -32768
    32767
   
   
    MEDIUMINT 
    3     
    -8388608
    8388607
   
   
    INTEGER 
    4     
    -2147483648
    2147483647
   
   
    BIGINT 
    8     
    -9223372036854775808
    9223372036854775807
   
 

The integer types differ in their storage. We can choose values that
fit our requirements. 

mysql&gt; CREATE TABLE Ages(Id SMALLINT, Age TINYINT) ENGINE=Memory;

We have created a temporary Ages table. This will be only a 
temporary testing table, so there will be only a few rows. 
The SMALLINT will suffice. We do not know anyone older than 130 years, so 
TINYINT will be OK for the Age column. 

mysql&gt; INSERT INTO Ages VALUES(1, 43);
Query OK, 1 row affected (0.00 sec)

We insert a row into the table.

mysql&gt; INSERT INTO Ages VALUES (2, 128);
ERROR 1264 (22003): Out of range value for column 'Age' at row 1

Trying to insert a value outside the range of the column type leads
to an error.

When we are dealing with ages, we do not need negative integer values. 
MySQL supports unsigned integers. This way we can further optimise our
table definitions.

 
Table 2: Unsigned integer types
   
    Data type 
    Bytes
    Minimum value 
    Maximum value
   
   
    TINYINT 
    1     
    0
    255
   
   
    SMALLINT 
    2     
    0
    65535
   
   
    MEDIUMINT 
    3     
    0
    16777215
   
   
    INTEGER 
    4     
    0
    4294967295
   
   
    BIGINT 
    8     
    0
    18446744073709551615
   
 

We use the SQL statement to change the Age column to have a
TINYINT UNSIGNED data type.

mysql&gt; ALTER TABLE Ages MODIFY Age TINYINT UNSIGNED;

Now we can insert values from 0 to 255. 

mysql&gt; INSERT INTO Ages VALUES(2, 128);
Query OK, 1 row affected (0,00 sec)

mysql&gt; SELECT * FROM Ages;
+------+------+
| ID   | Age  |
+------+------+
|    1 |   43 |
|    2 |  128 |
+------+------+
2 rows in set (0,00 sec)

We have inserted a hypothetical age 128. Now the column accepts it. 

### Floating point values

Floating point numbers represent real numbers in computing. 
Real numbers measure continuous quantities, like weight, 
height or speed.

MySQL has floating point types for approximate values: 
FLOAT and DOUBLE and fixed-point 
types for exact values: DECIMAL and NUMERIC.

FLOAT is a single precision floating point number.
MySQL uses four bytes to store a FLOAT value.
DOUBLE is a double precision floating point number.
MySQL uses eight bytes to store a DOUBLE value. 

MySQL treats DOUBLE as a synonym for DOUBLE PRECISION 
(a non-standard extension). In addition, MySQL also treats REAL as 
a synonym for DOUBLE PRECISION, unless the REAL_AS_FLOAT 
SQL mode is enabled.

DECIMAL and NUMERIC types store exact numeric data values. 
These types are used when it is important to preserve exact precision, for example 
with monetary data. In MySQL, NUMERIC is a synonym for 
DECIMAL.

Floats, doubles, and decimals may have specified their precision and scale.
In DECIMAL[M, D] the M is the maximum number of digits, the precision.
The D is the number of digits to the right of the decimal point. It is the scale. 
If you have a column with DECIMAL(3, 1), you can insert numbers 
with maximum of three digits: wwo before and one after the decimal point.

mysql&gt; SELECT 1/3;
+--------+
| 1/3    |
+--------+
| 0.3333 |
+--------+
1 row in set (0,00 sec)

mysql&gt; SELECT 0.3333 = 1/3;
+--------------+
| 0.3333 = 1/3 |
+--------------+
|            0 |
+--------------+
1 row in set (0,00 sec)

You might expect that the comparison in the second SQL statement
returns true, but it does not. The reason is the way how floating
point values are stored. 

Caution must be exercised when working with floating point values. Floats 
and doubles are faster to deal with, but they are not accurate to the last
digit. There is a
small rounding error, which is OK in many cases. In many real word
situations, we just need to have an approximate value. For example, you have
a shop in which you have 7.5321 kg of apples and 4.372 kg of oranges. It is 
OK to store these two values as 7.5 kg and 4.4 kg. No big deal.
On the other hand, in exact scientific or monetary calculations
high precision necessray. For such cases, we use the DECIMAL data type.

mysql&gt; CREATE TABLE Numbers (Id TINYINT, Floats FLOAT, Decimals DECIMAL(3, 2));

We create a table in which we are going to store a few floats and decimals.

mysql&gt; INSERT INTO Numbers VALUES (1, 1.1, 1.1), (2, 1.1, 1.1), (3, 1.1, 1.1);

We insert three rows into the newly created table. 

mysql&gt; SELECT * FROM Numbers;
+------+--------+----------+
| Id   | Floats | Decimals |
+------+--------+----------+
|    1 |    1.1 |     1.10 |
|    2 |    1.1 |     1.10 |
|    3 |    1.1 |     1.10 |
+------+--------+----------+
3 rows in set (0,00 sec)

This is how the table looks. 

mysql&gt; SELECT SUM(Floats), SUM(Decimals) FROM Numbers;
+--------------------+---------------+
| SUM(Floats)        | SUM(Decimals) |
+--------------------+---------------+
| 3.3000000715255737 |          3.30 |
+--------------------+---------------+
1 row in set (0,08 sec)

The two results differ. The decimal calculation is more precise. 
Due to some internal rounding, the sum of floats is not accurate.

## Date &amp; time values

MySQL has data types for storing dates and times: DATE,
TIME, DATETIME, YEAR, 
and TIMESTAMP. MySQL tries to interpret date and time values in several 
formats but the date parts must always be given in year/month/day order.
MySQL automatically converts a date or time value to a number if the value 
is used in a numeric context and vice versa.

### Date

The DATE is used to store dates. MySQL retrieves and displays date values
in YYYY-MM-DD format. The supported range is from 
1000-01-01 to 9999-12-31.

mysql&gt; SELECT CURDATE();
+------------+
| CURDATE()  |
+------------+
| 2017-01-31 |
+------------+
1 row in set (0,00 sec)

The CURDATE() function returns the current date.

mysql&gt; SELECT DATE('2017-01-31 12:01:00');
+-----------------------------+
| DATE('2017-01-31 12:01:00') |
+-----------------------------+
| 2017-01-31                  |
+-----------------------------+
1 row in set (0,00 sec)

The DATE() function returns the date part of the
date and time value.

mysql&gt; SELECT ADDDATE('2017-01-20', 8);
+--------------------------+
| ADDDATE('2017-01-20', 8) |
+--------------------------+
| 2017-01-28               |
+--------------------------+
1 row in set (0,00 sec)

The ADDDATE() function adds days to a date. It returns
the calculated date.

mysql&gt; CREATE TABLE Dates(Id TINYINT, Dates DATE);
mysql&gt; INSERT INTO Dates VALUES(1, '2017-01-24');
mysql&gt; INSERT INTO Dates VALUES(2, '2017/01/25');
mysql&gt; INSERT INTO Dates VALUES(3, '20170126');
mysql&gt; INSERT INTO Dates VALUES(4, '170127');
mysql&gt; INSERT INTO Dates VALUES(5, '2017+01+28');

Dates are displayed in MySQL in one format, but we can use various 
date formats in our SQL statements. The YYYY-MM-DD
is the standard format. It is possible to use any punctuation character
between the date parts.

mysql&gt; SELECT * FROM Dates;
+------+------------+
| Id   | Dates      |
+------+------------+
|    1 | 2017-01-24 |
|    2 | 2017-01-25 |
|    3 | 2017-01-26 |
|    4 | 2017-01-27 |
|    5 | 2017-01-28 |
+------+------------+
5 rows in set (0,00 sec)

We have used multiple formats to insert dates into the table. MySQL
uses one format to display the dates. 

mysql&gt; INSERT INTO Dates VALUES (6, '10000-01-01');
ERROR 1292 (22007): Incorrect date value: '10000-01-01' for column 'Dates' at row 1

In case we go beyond the range of supported date values an error occurs.

### Time

The TIME data type is used to display time in MySQL. It shows
values in HH:MM:SS format. 
MySQL retrieves and displays TIME values in 'HH:MM:SS' format 
or 'HHH:MM:SS' format for large hours values. The range is from -838:59:59 
to 838:59:59. The hours part of the time format may be greater 
than 24. It is because TIME data type can be used to denote time 
intervals. This is also why we can have negative time values. 

mysql&gt; SELECT CURTIME();
+-----------+
| CURTIME() |
+-----------+
| 11:47:36  |
+-----------+
1 row in set (0,00 sec)

The CURTIME() function returns the current time.

mysql&gt; SELECT TIMEDIFF('23:34:32', '22:00:00');
+----------------------------------+
| TIMEDIFF('23:34:32', '22:00:00') |
+----------------------------------+
| 01:34:32                         |
+----------------------------------+
1 row in set (0,02 sec)

The TIMEDIFF() function is used to subtract two time values.

mysql&gt; SELECT TIME('2017-01-31 11:06:43');
+-----------------------------+
| TIME('2017-01-31 11:06:43') |
+-----------------------------+
| 11:06:43                    |
+-----------------------------+
1 row in set (0,00 sec)

We can use the TIME() function to extract the time
part of the date and time value. 

mysql&gt; SELECT TIMEDIFF('211344', 201123);
+----------------------------+
| TIMEDIFF('211344', 201123) |
+----------------------------+
| 01:02:21                   |
+----------------------------+
1 row in set (0,00 sec)

We can write time values in different formats too. The first
parameter is a time value in a string format without delimiters.
The second is a time value specified as a number.

### Datetime

The DATETIME values contain both date and time. MySQL retrieves and
displays values in YYYY-MM-DD HH:MM:SS format. The supported range 
is from 1000-01-01 00:00:00 to 9999-12-31 23:59:59.

mysql&gt; SELECT NOW();
+---------------------+
| NOW()               |
+---------------------+
| 2017-01-31 11:57:53 |
+---------------------+
1 row in set (0,00 sec)

The NOW() function returns current datetime.

mysql&gt; SELECT DAYNAME('2017@01@31 11@12@12');
+--------------------------------+
| DAYNAME('2017@01@31 11@12@12') |
+--------------------------------+
| Tuesday                        |
+--------------------------------+
1 row in set (0,02 sec)

MySQL displays date and time in only one format. But in our SQL statements,
we can use different formats. Any punctuation character may be used as 
the delimiter between date parts or time parts. In our case, we have used
the @ character. 

### Year

The YEAR is a data type used for representing years. 
MySQL displays YEAR values in YYYY format. 
It allows us to assign values to YEAR columns using either strings or 
numbers. The allowable range is from 1901 to 2155, or 0000. Illegal year 
values are converted to 0000. 

mysql&gt; SELECT YEAR(CURDATE()) AS 'Current year';
+--------------+
| Current year |
+--------------+
|         2017 |
+--------------+
1 row in set (0,02 sec)

In the above SQL statement, we have retrieved the current year.

### Timestamp

A *timestamp* is a sequence of characters, denoting the
date and/or time at which a certain event occurred. Timestamps are
typically used for logging events. In MySQL we have a 
TIMESTAMP data type for creating timestamps. 
A TIMESTAMP column is useful for recording the date and 
time of an INSERT or UPDATE operation. It 
automatically sets to the date and time of the most recent operation if 
you do not give it a value yourself. The TIMESTAMP data type 
has a range of 1970-01-01 00:00:01 UTC to 
2038-01-19 03:14:07 UTC.

The following table summarises the supported TIMESTAMP
formats. 

 
   
    Data type 
    Format
   
   
    TIMESTAMP(14) 
    YYYYMMDDHHMMSS     
   
   
    TIMESTAMP(12) 
    YYMMDDHHMMSS     
   
   
    TIMESTAMP(10) 
    YYMMDDHHMM     
   
   
    TIMESTAMP(8) 
    YYYYMMDD     
   
   
    TIMESTAMP(6) 
    YYMMDD     
   
   
    TIMESTAMP(4) 
    YYMM     
   
   
    TIMESTAMP(2) 
    YY     
   

The TIMESTAMP data type offers automatic initialisation and 
updating. We can restrict this data type to have only automatic initialisation or
automatic update only.

mysql&gt; CREATE TABLE Prices(Id TINYINT PRIMARY KEY, Price DECIMAL(8, 2), Stamp TIMESTAMP);
mysql&gt; INSERT INTO Prices(Id, Price) VALUES(1, 234.34);
mysql&gt; INSERT INTO Prices(Id, Price) VALUES(2, 344.12);

We create a table with a TIMESTAMP column. We insert two rows 
into the table. The Stamp column is not included in the SQL statements. 
MySQL automatically fills the column. 

mysql&gt; SELECT * FROM Prices;
+----+--------+---------------------+
| Id | Price  | Stamp               |
+----+--------+---------------------+
|  1 | 234.34 | 2017-01-31 12:12:25 |
|  2 | 344.12 | 2017-01-31 12:15:10 |
+----+--------+---------------------+
2 rows in set (0,00 sec)

The timestamps for the two rows were created. This is the auto-initialisation
of the TIMESTAMP data type. This can be turned off by 
Stamp TIMESTAMP DEFAULT 0 ON UPDATE CURRENT_TIMESTAMP SQL code
when creating the table.

mysql&gt; UPDATE Prices SET Price=250.50 WHERE Id=1;

We execute the SQL statement to update the Price column in the first row.

mysql&gt; SELECT * FROM Prices;
+----+--------+---------------------+
| Id | Price  | Stamp               |
+----+--------+---------------------+
|  1 | 250.50 | 2017-01-31 12:17:21 |
|  2 | 344.12 | 2017-01-31 12:15:10 |
+----+--------+---------------------+
2 rows in set (0,00 sec)

The timestamp of the first column was updated.
If we wanted to turn off the auto-update of the TIMESTAMP, we could
use the Stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP SQL code when 
creating the table.

## Strings

MySQL has the following string data types:

  - CHAR

  - VARCHAR

  - BINARY

  - VARBINARY

  - BLOB

  - TEXT

  - ENUM

  - SET

### Char

A CHAR is a fixed length character data type. 
It is declared with a length, CHAR(x), where x can
be between 0 to 255. CHAR always uses the same 
amount of storage space per entry. In case we specify an item
which is shorter than the declared length, the value is right-padded
with spaces to the specified length. Trailing spaces are removed 
when the value is retrieved. 

mysql&gt; CREATE TABLE Chars(Id TINYINT PRIMARY KEY, Chars CHAR(3));
mysql&gt; INSERT INTO Chars VALUES (1, 'a'), (2, 'ab'), (3, 'abc'), (4, 'abb');

In the above SQL code, we have created a Chars table which has one
column of the CHAR data type. The maximum length is set to three characters. 

mysql&gt; INSERT INTO Chars VALUES (5, 'abcd');
ERROR 1406 (22001): Data too long for column 'Chars' at row 1

Trying to insert a larger string than specified leads to an error.

mysql&gt; SELECT * FROM Chars;
+------+-------+
| Id   | Chars |
+------+-------+
|    1 | a     |
|    2 | ab    |
|    3 | abc   |
|    4 | abb   |
+------+-------+
4 rows in set (0,00 sec)

This is what we have in the table. 

mysql&gt; SELECT Id, LENGTH(Chars) AS Length FROM Chars;
+------+--------+
| Id   | Length |
+------+--------+
|    1 |      1 |
|    2 |      2 |
|    3 |      3 |
|    4 |      3 |
+------+--------+
4 rows in set (0,00 sec)

We have retrieved Ids and the length of the characters that we have
inserted. Previously we have stated that chars are stored at fixed size. 
Why do we have different size values for the rows now? We would expect each
row to have exactly 3 characters. The reason is that MySQL trims spaces
for chars at the data retrieval. By setting the sql_mode
to PAD_CHAR_TO_FULL_LENGTH the spaces are also trimmed. 

mysql&gt; SET sql_mode = 'PAD_CHAR_TO_FULL_LENGTH';
Query OK, 0 rows affected, 1 warning (0,00 sec)

mysql&gt; SELECT Id, LENGTH(Chars) AS Length FROM Chars;
+------+--------+
| Id   | Length |
+------+--------+
|    1 |      3 |
|    2 |      3 |
|    3 |      3 |
|    4 |      3 |
+------+--------+
4 rows in set (0,00 sec)

By changing the sql_mode, we get the expected results. 

### Varchar

VARCHAR data types stores variable-length strings. The length
of the string can be from 0 to 65535. VARCHAR values are not 
padded when they are stored. Trailing spaces are retained when values 
are stored and retrieved. Most shorter string data types are stored in
this data type; for example emails, names of people, of merchandise, or
addresses.

mysql&gt; CREATE TABLE FirstNames(Id TINYINT, Firstname VARCHAR(20));
mysql&gt; INSERT INTO FirstNames VALUES (1, 'Tom'), (2, 'Lucy'), (3, 'Alice'),
    -&gt; (4, 'Robert'), (5, 'Timothy'), (6, 'Alexander');

We create a FirstNames table in which we store six first names.

mysql&gt; SELECT Id, LENGTH(FirstName) AS Length FROM FirstNames;
+------+--------+
| Id   | Length |
+------+--------+
|    1 |      3 |
|    2 |      4 |
|    3 |      5 |
|    4 |      6 |
|    5 |      7 |
|    6 |      9 |
+------+--------+
6 rows in set (0,00 sec)

We can see that names in a VARCHAR column type are stored
in variable length. This saves disk space.

### Binary and varbinary

BINARY and VARBINARY are binary byte data types. 
They contain byte strings rather than character strings. 
They have no character sets. Sorting and comparison are based on the numeric 
values of the bytes in the values.
The range of the BINARY data types is from 0 to 255. It stores values
in fixed length. The range of the VARBINARY is from 0 to 65535. 

### Blob

A BLOB is a binary large object data type. It can hold a variable
amount of binary data. It can be used to store binary data like images or
documents. BLOB has four types:

 
   
    Blog type 
    Range in bytes
   
   
    TINYBLOB 
    0 - 255     
   
   
    BLOB 
    0 - 65535 
   
   
    MEDIUMBLOB 
    0 - 16777215     
   
   
    LONGBLOB 
    0 - 4294967295 
   

Next, we are going to read and write an image.

mysql&gt; CREATE TABLE Images(Id INT PRIMARY KEY, Img LONGBLOB);

A table with a LONGBLOB column is created.

mysql&gt; SHOW VARIABLES LIKE "secure_file_priv";
+------------------+-----------------------+
| Variable_name    | Value                 |
+------------------+-----------------------+
| secure_file_priv | /var/lib/mysql-files/ |
+------------------+-----------------------+
1 row in set (0,02 sec)

MySQL has security restrictions on loading and dumping data. The 
secure_file_priv shows a directory path where such operations are allowed.

mysql&gt; INSERT INTO Images VALUES (1, LOAD_FILE('/var/lib/mysql-files/image1.jpg'));

With the help of the LOAD_FILE() function, we insert an image into 
the Images table.

mysql&gt; SELECT Img FROM Images WHERE Id=1 INTO DUMPFILE '/var/lib/mysql-files/image_bck.jpg';

We select the image from the table and write it into a file in the /var/lib/mysql-files
directory.

$ sudo ls /var/lib/mysql-files/ -l
total 608
-rw-r--r-- 1 root  root  309262 jan 31 13:08 image1.jpg
-rw-rw-rw- 1 mysql mysql 309262 jan 31 13:12 image_bck.jpg

Now we should have these two files in the directory.

### Text

A TEXT datatype is used for storing large textual data. 
For example articles, blogs, or pages. TEXT valuse are 
best used when VARCHAR and other string-based data objects 
are insufficient to handle storing the desired amount of information.

 
   
    Blog type 
    Range in bytes
   
   
    TINYTEXT 
    0 - 255     
   
   
    TEXT 
    0 - 65535 
   
   
    MEDIUMTEXT 
    0 - 16777215     
   
   
    LONGTEXT 
    0 - 4294967295 
   

There is no padding on insert and no bytes are stripped on select.

### Enum

The ENUM is a string object with a value 
chosen from a permitted list of values. They are enumerated explicitly in 
the column specification. We can insert only one value from the list. 

mysql&gt; CREATE TABLE Sizes(Size ENUM('S', 'M', 'L', 'XL', 'XXL'));

We create a table, which has one column of the ENUM type. The 
list of permitted values is explicitly stated. 

mysql&gt; INSERT INTO SizeTable VALUES ('S'), ('L');

We insert two rows in the table. 

mysql&gt; INSERT INTO Sizes VALUES ('Large');
ERROR 1265 (01000): Data truncated for column 'Size' at row 1

Since 'Large' was not mentioned in the list, we get an error 
message. 

mysql&gt; SELECT * FROM Sizes;
+------+
| Size |
+------+
| S    |
| L    |
+------+
2 rows in set (0,00 sec)

We have two regular values in the table. 

### Set

A SET is a string object that can have zero or more values,
each of which must be chosen from a list of permitted values. It is similar
to the ENUM data type. The difference is that it can contain 
zero or more values from the list of permitted values. 

mysql&gt; CREATE TABLE Letters(Let SET('a', 'b', 'c', 'd', 'e'));

We create a table that allows a set of letters on a column.

mysql&gt; INSERT INTO Letters VALUES ('a');
mysql&gt; INSERT INTO Letters VALUES ('b');
mysql&gt; INSERT INTO Letters VALUES ('b,a');
mysql&gt; INSERT INTO Letters VALUES ('');
mysql&gt; INSERT INTO Letters VALUES ('a,b,c');

mysql&gt; SELECT * FROM Letters;
+-------+
| Let   |
+-------+
| a     |
| b     |
| a,b   |
|       |
| a,b,c |
+-------+
5 rows in set (0,00 sec)

We have added various combinations of letters allowed by SET.

## JSON

Since MySQL 5.7.8, MySQL supports a native JSON data type.

JSON (JavaScript Object Notation) is a lightweight data-interchange format. 
It is easy for humans to read and write and for machines to parse and generate.

MySQL automaticcally validates JSON documents stored in JSON columns. Invalid 
documents produce an error. JSON documents stored in JSON columns are optimized
for efficient access. JSON columns cannot have a default value.

mysql&gt; CREATE TABLE t1 (Doc JSON);

A table with a JSON column is created.

mysql&gt; INSERT INTO t1 VALUES('{"chair": "5", "table": "4", "lamp": "6"}');

A document is added to the table.

mysql&gt; SELECT * FROM t1;
+-------------------------------------------+
| Doc                                       |
+-------------------------------------------+
| {"lamp": "6", "chair": "5", "table": "4"} |
+-------------------------------------------+
1 row in set (0,00 sec)

We show the contents of the table.

mysql&gt; SELECT JSON_ARRAY('pen', 4, 'pencil', 2, 'rubber', 1);
+------------------------------------------------+
| JSON_ARRAY('pen', 4, 'pencil', 2, 'rubber', 1) |
+------------------------------------------------+
| ["pen", 4, "pencil", 2, "rubber", 1]           |
+------------------------------------------------+
1 row in set (0,02 sec)

The JSON_ARRAY() function takes a list of values and transforms
them into a JSON array.

mysql&gt; SELECT JSON_OBJECT('pen', 4, 'pencil', 2, 'rubber', 1);
+-------------------------------------------------+
| JSON_OBJECT('pen', 4, 'pencil', 2, 'rubber', 1) |
+-------------------------------------------------+
| {"pen": 4, "pencil": 2, "rubber": 1}            |
+-------------------------------------------------+
1 row in set (0,00 sec)

The JSON_OBJECT() function takes a list of key/value pairs a
nd returns a JSON object containing those pairs. 

This part of the MySQL tutorial was dedicated to MySQL data types.

[Contents](..) 
[Previous](../storageengines/)
[Next](../tables/)