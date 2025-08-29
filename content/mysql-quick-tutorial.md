+++
title = "MySQL quick tutorial"
date = 2025-08-29T20:03:47.593+01:00
draft = false
description = "This chapter is a quick MySQL tutorial. Here we cover some basic SQL queries in MySQL."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../firststeps/)
[Next](../storageengines/)

# MySQL quick tutorial

last modified January 10, 2023 

The MySQL quick tutorial will quickly introduce you to the basics of the MySQL database.

## The world database

The MySQL [documentation](http://dev.mysql.com/doc/index-other.html) website 
offers some example databases. We are going to use a world database. 
The data is outdated but it does not matter for our test purposes.

$ wget http://downloads.mysql.com/docs/world.sql.gz

We download the compressed file with the wget tool.

$ ls -sh world.sql.gz 
92K world.sql.gz

The compressed file has about 92KB. 

$ gunzip world.sql.gz

We unzip the file. We have a world.sql file. 

$ ls -hs world.sql 
392K world.sql

The uncompressed file has 392KB.

$ mysql -uroot -p

We connect to the server with the root account. We need the root
account to create a new database and give permissions to our test 
account for the new database.

mysql&gt; CREATE DATABASE world;

The world database is created. 

mysql&gt; USE world;

We change to the world database. Now the world database is the 
current database.

mysql&gt; source world.sql

We build the tables of the world database by executing
world.sql SQL script. It takes some time. 

mysql&gt; GRANT ALL ON world.* TO 'user12'@'localhost';

We grant privileges to all objects of the world database to the
user12. 

mysql&gt; quit
Bye

$ mysql -u user12 -p
Enter password: 

mysql&gt; USE world;

We quit the connection. Reconnect with the user12 test account 
and change to the world database. We are ready for work. 

## Examining the database

In this section, we are going to look at the tables of the world 
database in general. 

mysql&gt; SHOW TABLES;
+-----------------+
| Tables_in_world |
+-----------------+
| city            |
| country         |
| countrylanguage |
+-----------------+
3 rows in set (0,00 sec)

We show all available tables with the SHOW TABLES statement. There
are three. 

mysql&gt; DESCRIBE city;
+-------------+----------+------+-----+---------+----------------+
| Field       | Type     | Null | Key | Default | Extra          |
+-------------+----------+------+-----+---------+----------------+
| ID          | int(11)  | NO   | PRI | NULL    | auto_increment |
| Name        | char(35) | NO   |     |         |                |
| CountryCode | char(3)  | NO   | MUL |         |                |
| District    | char(20) | NO   |     |         |                |
| Population  | int(11)  | NO   |     | 0       |                |
+-------------+----------+------+-----+---------+----------------+
5 rows in set (0,00 sec)

With the DESCRIBE statement, we can see the table structure
of the City table. We see the column names and their data 
types. Plus other important information.

mysql&gt; SHOW CREATE TABLE city;

If we wanted to find out the SQL to create the City table, we would
issue the SHOW CREATE TABLE city statement. 

$ mysqldump -u root -p world city &gt; city.sql

Here we use the mysqldump tool to back up the 
city table. 

mysql&gt; DROP TABLE city;

mysql&gt; SHOW TABLES;
+-----------------+
| Tables_in_world |
+-----------------+
| country         |
| countrylanguage |
+-----------------+
2 rows in set (0,00 sec)

We use the DROP TABLE statement to drop the 
city table. Subsequent statement verifies that the table 
was removed. 

mysql&gt; source city.sql

mysql&gt; SHOW TABLES;
+-----------------+
| Tables_in_world |
+-----------------+
| city            |
| country         |
| countrylanguage |
+-----------------+
3 rows in set (0,00 sec)

We recreate the city table from the backup. The 
source command executes the backup city.sql 
script. 

## Queries

Queries are used to look up data from the database tables. 

### Limiting data output

There are thousands of rows in the tables of the database. They
cannot be displayed all on the screen. We can control the number
of rows to be displayed with the LIMIT clause. 

mysql&gt; SELECT Id, Name, Population FROM city limit 10;
+----+----------------+------------+
| Id | Name           | Population |
+----+----------------+------------+
|  1 | Kabul          |    1780000 |
|  2 | Qandahar       |     237500 |
|  3 | Herat          |     186800 |
|  4 | Mazar-e-Sharif |     127800 |
|  5 | Amsterdam      |     731200 |
|  6 | Rotterdam      |     593321 |
|  7 | Haag           |     440900 |
|  8 | Utrecht        |     234323 |
|  9 | Eindhoven      |     201843 |
| 10 | Tilburg        |     193238 |
+----+----------------+------------+
10 rows in set (0,00 sec)

In the above query, we show three of the five columns of the 
City table. There are lots of rows in the table. We limit 
the query to the first 10 rows. 

mysql&gt; SELECT Id, Name, Population FROM city limit 15, 5;
+----+-------------------+------------+
| Id | Name              | Population |
+----+-------------------+------------+
| 16 | Haarlem           |     148772 |
| 17 | Almere            |     142465 |
| 18 | Arnhem            |     138020 |
| 19 | Zaanstad          |     135621 |
| 20 | ´s-Hertogenbosch  |     129170 |
+----+-------------------+------------+
5 rows in set (0,00 sec)

The LIMIT clause can be followed by two numbers. The first one 
is the offset and the second one is the number of rows to display. Our 
query shows rows 16-20. 

mysql&gt; pager less
PAGER set to 'less'
mysql&gt; SELECT * FROM city;
+------------------------------------+------------+
| Name                               | Population |
+------------------------------------+------------+
| Kabul                              |    1780000 |
| Qandahar                           |     237500 |
| Herat                              |     186800 |
...
:

Since the city table has more than four thousand rows, we 
cannot see them in one screen. We can use the pager command to show the data in a
less program. We can navigate through the data with the cursor keys or
page down, page up keys. If we want to go the the default setting, simply 
hit the pager without any argument. 

$ mysql -u user12 -p world -e "SELECT * FROM city" &gt; city
Enter password: 
$ ls -sh city
144K city

The mysql command tool can be used in a non-interactive way. 
We specify the SQL statement after the -e option and redirect 
the result to the city file. Now we can use any text editor to display the data. 

### The COUNT(), MAX(), MIN() functions

The COUNT(), MAX(), MIN() are MySQL aggregate functions which compute
some value from aggregate data.

mysql&gt; SELECT COUNT(Id) AS '# of cities' FROM city;
+-------------+
| # of cities |
+-------------+
|        4079 |
+-------------+
1 row in set (0,00 sec)

There are 4079 cities in the table. We use the built-in 
COUNT() function to find out the number of rows. 

mysql&gt; SELECT Name, Population FROM city                                            
    -&gt; WHERE Population = (SELECT Max(Population) FROM city);
+-----------------+------------+
| Name            | Population |
+-----------------+------------+
| Mumbai (Bombay) |   10500000 |
+-----------------+------------+
1 row in set (0,08 sec)

The above query shows the most populated city in the table. The SQL is 
a special type of a query called a *subquery*. The outer query uses
the data returned by the inner query. The inner query is bounded by parentheses.

mysql&gt; SELECT Name, Population FROM city 
    -&gt; WHERE Population = (SELECT Min(Population) FROM city);
+-----------+------------+
| Name      | Population |
+-----------+------------+
| Adamstown |         42 |
+-----------+------------+
1 row in set (0,02 sec)

This subquery shows the least populated city in the table.

### Selecting specific rows with the WHERE clause

The WHERE clause can be used to filter the results. It provides 
a selection criteria to select only specific rows from the data. 

mysql&gt; SELECT Name, Population FROM city
    -&gt; WHERE Population &gt; 1000000;
+--------------------------+------------+
| Name                     | Population |
+--------------------------+------------+
| Kabul                    |    1780000 |
| Alger                    |    2168000 |
| Luanda                   |    2022000 |
| Buenos Aires             |    2982146 |
| La Matanza               |    1266461 |
| Córdoba                  |    1157507 |
| Yerevan                  |    1248700 |
| Sydney                   |    3276207 |
...

The above SQL statement returns all cities with a population above 
one million people. 

mysql&gt; SELECT Name FROM city WHERE Name LIKE 'Kal%';
+-------------+
| Name        |
+-------------+
| Kalookan    |
| Kalyan      |
| Kalemie     |
| Kallithea   |
| Kalisz      |
| Kaliningrad |
| Kaluga      |
+-------------+
7 rows in set (0,00 sec)

Here we select all city names which begin with 'Kal'. We have found seven
cities in the table. We can look for a specific pattern in the column with 
the LIKE clause. 

mysql&gt; SELECT Name, Population FROM city WHERE ID IN (5, 23, 432, 2021);
+------------+------------+
| Name       | Population |
+------------+------------+
| Amsterdam  |     731200 |
| Dordrecht  |     119811 |
| Eunápolis  |      96610 |
| Jining     |     265248 |
+------------+------------+
4 rows in set (0,05 sec)

This SQL code returns cities and their populations for rows
with ID 5, 23, 432, and 2021. 

mysql&gt; SELECT * FROM city WHERE Name = 'Bratislava';
+------+------------+-------------+------------+------------+
| ID   | Name       | CountryCode | District   | Population |
+------+------------+-------------+------------+------------+
| 3209 | Bratislava | SVK         | Bratislava |     448292 |
+------+------------+-------------+------------+------------+
1 row in set (0,00 sec)

With the above SQL statement we select all columns for one
specific city, namely Bratislava. 

mysql&gt; SELECT Name, Population FROM city
    -&gt; WHERE Population BETWEEN 670000 AND 700000;
+----------------+------------+
| Name           | Population |
+----------------+------------+
| Teresina       |     691942 |
| Natal          |     688955 |
| Bandar Lampung |     680332 |
| Gwalior        |     690765 |
| Kermanshah     |     692986 |
| Palermo        |     683794 |
| Toronto        |     688275 |
| Huainan        |     700000 |
| Jixi           |     683885 |
| Antananarivo   |     675669 |
| Chihuahua      |     670208 |
| Kano           |     674100 |
| Tunis          |     690600 |
+----------------+------------+
13 rows in set (0,03 sec)

Say we wanted to find out cities with a population between two specific
values. There is a BETWEEN operator for this. We have found
thirteen cities with a population in the range 670,000 and 700,000. 

### Ordering data

Ordering data can be done with the ORDER BY clause. 

mysql&gt; SELECT Name, Population FROM city
    -&gt; ORDER BY Population DESC LIMIT 10;
+-------------------+------------+
| Name              | Population |
+-------------------+------------+
| Mumbai (Bombay)   |   10500000 |
| Seoul             |    9981619 |
| São Paulo         |    9968485 |
| Shanghai          |    9696300 |
| Jakarta           |    9604900 |
| Karachi           |    9269265 |
| Istanbul          |    8787958 |
| Ciudad de México  |    8591309 |
| Moscow            |    8389200 |
| New York          |    8008278 |
+-------------------+------------+
10 rows in set (0,03 sec)

We find the ten most populated cities. We order the data by population from 
the most populated to the least populated city. We limit the output with the
LIMIT clause. 

mysql&gt; SELECT Name, Population FROM city
    -&gt; ORDER BY Population ASC LIMIT 10;
+---------------------+------------+
| Name                | Population |
+---------------------+------------+
| Adamstown           |         42 |
| West Island         |        167 |
| Fakaofo             |        300 |
| Città del Vaticano  |        455 |
| Bantam              |        503 |
| Yaren               |        559 |
| The Valley          |        595 |
| Alofi               |        682 |
| Flying Fish Cove    |        700 |
| Kingston            |        800 |
+---------------------+------------+
10 rows in set (0,02 sec)

Here we get the least populated cities. This time we order the data
in the ascending order. For this we use the ASC keyword. 

mysql&gt; SELECT Name, Population FROM city ORDER By Name LIMIT 10;
+------------------------+------------+
| Name                   | Population |
+------------------------+------------+
| A Coruña (La Coruña)   |     243402 |
| Aachen                 |     243825 |
| Aalborg                |     161161 |
| Aba                    |     298900 |
| Abadan                 |     206073 |
| Abaetetuba             |     111258 |
| Abakan                 |     169200 |
| Abbotsford             |     105403 |
| Abeokuta               |     427400 |
| Aberdeen               |     213070 |
+------------------------+------------+
10 rows in set (0.01 sec)

In the above SQL statement we order data by city name and get the
first ten cities.

### Grouping data

The GROUP BY clause is used to combine database records with 
identical values into a single record. It is often used with the 
aggregation functions.

mysql&gt; SELECT District, SUM(Population) FROM city
    -&gt; WHERE District = 'New York' GROUP BY District;
+----------+-----------------+
| District | SUM(Population) |
+----------+-----------------+
| New York |         8958085 |
+----------+-----------------+
1 row in set (0,09 sec)

The above SQL statement returns the total number of people in the towns
of the New York district, which are listed in our database. 

mysql&gt; SELECT Name, District FROM city WHERE District = 'New York';
+-----------+----------+
| Name      | District |
+-----------+----------+
| New York  | New York |
| Buffalo   | New York |
| Rochester | New York |
| Yonkers   | New York |
| Syracuse  | New York |
| Albany    | New York |
+-----------+----------+
6 rows in set (0,00 sec)

The previous number is a sum of these six cities. 

mysql&gt; SELECT District, SUM(Population) FROM city
    -&gt; WHERE CountryCode = 'USA' GROUP BY District
    -&gt; HAVING SUM(Population) &gt; 3000000;
+------------+-----------------+
| District   | SUM(Population) |
+------------+-----------------+
| Arizona    |         3178903 |
| California |        16716706 |
| Florida    |         3151408 |
| Illinois   |         3737498 |
| New York   |         8958085 |
| Texas      |         9208281 |
+------------+-----------------+
6 rows in set (0,28 sec)

We select all districts which have population over 3 million people. When
we work with groups of data, we use the HAVING clause instead
of the WHERE clause.

### Updating, deleting, and inserting data

Next we will concern ourselves with updating, deleting, and inserting data.

mysql&gt; SELECT Name, HeadOfState FROM country WHERE Name = 'United States';
+---------------+----------------+
| Name          | HeadOfState    |
+---------------+----------------+
| United States | George W. Bush |
+---------------+----------------+
1 row in set (0,12 sec)

As we have already stated, the world database is outdated. George Bush 
is not the president of the USA anymore. 

mysql&gt; UPDATE country SET HeadOfState = 'Donald Trump'
    -&gt; WHERE Name = 'United States';

With the UPDATE statement we change the row to the
actual data. 

mysql&gt; SELECT Name, HeadOfState FROM country WHERE Name = 'United States';
+---------------+--------------+
| Name          | HeadOfState  |
+---------------+--------------+
| United States | Donald Trump |
+---------------+--------------+
1 row in set (0,02 sec)

We have successfully updated the row. 

mysql&gt; CREATE TABLE toptencities engine=MEMORY SELECT * FROM city LIMIT 10;

We create a temporary table in the memory. It will contain first ten cities
from the city table. 

mysql&gt; SELECT * FROM toptencities;
+----+----------------+-------------+---------------+------------+
| ID | Name           | CountryCode | District      | Population |
+----+----------------+-------------+---------------+------------+
|  1 | Kabul          | AFG         | Kabol         |    1780000 |
|  2 | Qandahar       | AFG         | Qandahar      |     237500 |
|  3 | Herat          | AFG         | Herat         |     186800 |
|  4 | Mazar-e-Sharif | AFG         | Balkh         |     127800 |
|  5 | Amsterdam      | NLD         | Noord-Holland |     731200 |
|  6 | Rotterdam      | NLD         | Zuid-Holland  |     593321 |
|  7 | Haag           | NLD         | Zuid-Holland  |     440900 |
|  8 | Utrecht        | NLD         | Utrecht       |     234323 |
|  9 | Eindhoven      | NLD         | Noord-Brabant |     201843 |
| 10 | Tilburg        | NLD         | Noord-Brabant |     193238 |
+----+----------------+-------------+---------------+------------+
10 rows in set (0,00 sec)

This is the contents of the toptencities table. 

mysql&gt; DELETE FROM toptencities WHERE ID IN (2, 4, 6, 8, 10);

With the DELETE FROM statement and the WHERE
clause we delete every second row from the toptencities table. 

mysql&gt; SELECT * FROM toptencities;
+----+-----------+-------------+---------------+------------+
| ID | Name      | CountryCode | District      | Population |
+----+-----------+-------------+---------------+------------+
|  1 | Kabul     | AFG         | Kabol         |    1780000 |
|  3 | Herat     | AFG         | Herat         |     186800 |
|  5 | Amsterdam | NLD         | Noord-Holland |     731200 |
|  7 | Haag      | NLD         | Zuid-Holland  |     440900 |
|  9 | Eindhoven | NLD         | Noord-Brabant |     201843 |
+----+-----------+-------------+---------------+------------+
5 rows in set (0.00 sec)

We have five rows left in the table.

mysql&gt; TRUNCATE TABLE toptencities;
Query OK, 0 rows affected (0.00 sec)

mysql&gt; SELECT * FROM toptencities;
Empty set (0,00 sec)

We delete all rows from the table with the TRUNCATE statement. 
There is no data left. 

mysql&gt; INSERT INTO toptencities VALUES(1, 'Kabul', 'AFG', 'Kabol', 1780000);

mysql&gt; SELECT * FROM toptencities;;
+----+-------+-------------+----------+------------+
| ID | Name  | CountryCode | District | Population |
+----+-------+-------------+----------+------------+
|  1 | Kabul | AFG         | Kabol    |    1780000 |
+----+-------+-------------+----------+------------+
1 row in set (0.00 sec)

With the INSERT INTO statement, we insert one row into the table.

mysql&gt; DROP TABLE toptencities;
Query OK, 0 rows affected (0,06 sec)

We drop the table from the database.

In this chapter, we have quickly introduced some basics of the MySQL database. 
We go into more details in the following chapters. 

[Contents](..) 
[Previous](../firststeps/)
[Next](../storageengines/)