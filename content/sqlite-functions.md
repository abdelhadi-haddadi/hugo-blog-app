+++
title = "SQLite functions"
date = 2025-08-29T19:52:55.882+01:00
draft = false
description = "In this part of the SQLite tutorial, we will cover functions. We work with core, aggregate, and date & time function."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../joins/)
[Next](../viewstriggerstransactions/)

# SQLite functions

last modified July 6, 2020 

In this part of the SQLite tutorial, we will cover SQLite built-in functions. 
There are three types of functions in SQLite database: core, aggregate, 
and date &amp; time functions. 

We will cover some functions from each group of SQLite functions. 

## SQLite core functions

In this group we have various functions. Some are numerical functions, 
some work with text. Others do some very specific things. 

sqlite&gt; SELECT sqlite_version() AS 'SQLite Version';
SQLite Version
--------------
3.16.2

The sqlite_version function returns the version
of the SQLite library.

sqlite&gt; SELECT random() AS Random;
Random             
-------------------
1056892254869386643   

The random function returns a pseudo-random integer 
between -9223372036854775808 and +9223372036854775807. 

sqlite&gt; SELECT abs(11), abs(-5), abs(0), abs(NULL);
abs(11)             abs(-5)      abs(0)      abs(NULL) 
------------------  -----------  ----------  ----------
11                  5            0           NULL  

The abs function returns the absolute value of a numeric argument.

sqlite&gt; SELECT max(Price), min(Price) FROM Cars;
max(Price)  min(Price)
----------  ----------
350000      9000  

In our example, the max and min functions return the 
most and the least expensive cars from the Cars table. 

sqlite&gt; .width 18
sqlite&gt; SELECT upper(Name) AS 'Names in capitals' FROM Friends;
Names in capitals 
------------------
JANE              
THOMAS            
FRANK             
ELISABETH         
MARY              
LUCY              
JACK  

The upper function converts characters into upper-case letters. 

sqlite&gt; SELECT lower(Name) AS 'Names in lowercase' FROM Friends
   ...&gt; WHERE Id IN (1, 2, 3);
Names in lowercase
------------------
jane              
thomas            
frank  

With the lower function we change the names of first three rows
into lower-case letters.

sqlite&gt; SELECT length('ZetCode');
length('ZetCode') 
------------------
7 

The length function returns the length of a string.

sqlite&gt; SELECT total_changes() AS 'Total changes';
Total changes
-------------
3    

The total_changes function returns the number of 
row changes caused by INSERT, UPDATE, 
or DELETE statements since the current database connection 
was opened. In the current database connection, we have done
three INSERT statements, so total changes is equal to three. 

sqlite&gt; .width 5
sqlite&gt; SELECT sqlite_compileoption_used('SQLITE_DEFAULT_FOREIGN_KEYS') AS 'FK';
FK   
-----
0  

The sqlite_compileoption_used function returns a boolean value, 
depending on whether or not that option was used during the build. In our case
we check if the FOREIGN KEY constraint is enforced by default. 
The function returns 0, which means that the constraint is not enforced by 
default. We use the PRAGMA statement to change it. 
(PRAGMA foreign_keys = 1;)

sqlite&gt; SELECT typeof(12), typeof('ZetCode'), typeof(33.2), typeof(NULL), 
   ...&gt; typeof(x'345edb');
typeof(12)    typeof('ZetCode')   typeof(33.2)  typeof(NULL)  typeof(x'345edb')
------------  ------------------  ------------  ------------  -----------------
integer       text                real          null          blob  

The typeof function returns the data type of the argument.

## SQLite aggregate functions

With aggregate functions, we get some statistical data. Aggregate functions that take a single 
argument can be preceded by the DISTINCT keyword. In such cases, duplicate elements 
are filtered before being passed into the aggregate function.

We recapitulate what we have in the Cars table. 

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

Notice that there are no duplicate records. 

sqlite&gt; SELECT count(*) AS '# of cars' FROM Cars;
# of cars 
----------
8     

The count function returns the number of rows in the
table—there are eight cars.

In the Orders table, we do have duplicate records of customers. 

sqlite&gt; SELECT * FROM Orders;
Id          OrderPrice  Customer  
----------  ----------  ----------
1           1200        Williamson
2           200         Robertson 
3           40          Robertson 
4           1640        Smith     
5           100         Robertson 
6           50          Williamson
7           150         Smith     
8           250         Smith     
9           840         Brown     
10          440         Black     
11          20          Brown    

Logically, each customer can make multiple orders. How do we count 
the number of orders and how do we count the number of customers?

sqlite&gt; SELECT count(Customer) AS '# of orders'  FROM Orders;
# of orders
-----------
11   

This SQL statement returns the number of orders. To calculate the 
number of unique customers, we have to utilise the DISTINCT clause.

sqlite&gt; SELECT count(DISTINCT Customer) AS '# of customers' FROM Orders;
# of customers
--------------
5   

We have 5 customers in our Orders table. They placed 11 orders.

Next we are going to demonstrate the difference between the count(*) 
and count(ColumnName) functions. The difference is the way they 
handle NULL values. 

sqlite&gt; .nullvalue NULL

First, we change how sqlite3 shows NULL 
values. By default, the NULL value is shown as an empty string. 

sqlite&gt; CREATE TABLE TESTING(Id INTEGER);
sqlite&gt; INSERT INTO Testing VALUES (1), (2), (3), (NULL), (NULL);

Here we create table Testing with 3 numerical and 2 
NULL values.

sqlite&gt; SELECT last_insert_rowid();
5    

The last_insert_rowid function returns the Id of the last
inserted row.

sqlite&gt; SELECT count(*) AS '# of rows' FROM Testing;
# of rows 
----------
5  

The count(*) returns the number of rows in the table.
It takes NULL values into account. 

sqlite&gt; SELECT count(Id) AS '# of non NULL values' FROM Testing;
# of non NULL values
--------------------
3 

The count(Id) counts only non NULL values. 

sqlite&gt; SELECT avg(Price) AS 'Average price' FROM Cars;
Average price
-------------
72721.125   

The avg function returns the average value
of all non NULL records. In our example, we show the average price
of the car in the Cars table. 

 

Finally, we mention the sum function. It sums
all non NULL values. 

sqlite&gt; SELECT sum(OrderPrice) AS Sum FROM Orders;
Sum     
--------
4930   

Here we count how many orders our customers placed.

## SQLite date and time funcions

SQLite has functions for working with date and time. These functions
take various time strings, modifiers, and formats. 

sqlite&gt; .header OFF
sqlite&gt; SELECT date('now');
2014-11-17    

The date function with the now string returns
the current date.  

sqlite&gt; SELECT datetime('now');
2018-07-20 09:57:38

The datetime function returns the current date and time. 

sqlite&gt; SELECT time('now');
09:57:56

The time function gives the current time.

sqlite&gt; SELECT time(), time('now');
09:58:30    09:58:30  
sqlite&gt; SELECT date(), date('now');
2018-07-20  2018-07-20 

The now string can be omitted.

The first parameter of the date, time, 
and datetime functions is the time string. It can be 
followed by one or more modifiers.

sqlite&gt; SELECT date('now', '2 months');
2018-09-20

In this example, '2 months' is a modifier. It adds two months to the 
current date. So the function returns the date two months from today.

sqlite&gt; SELECT date('now', '-55 days');
2018-05-26

Negative modifiers can be also used. In this example, we extract 
55 days from today.

sqlite&gt; SELECT date('now', 'start of year');
2018-01-01

Using the start of year modifier, we get the date of the start
of the year, e.g. January 1st. 

sqlite&gt; SELECT datetime('now', 'start of day');
2018-07-20 00:00:00 

With the help of the start of day modifier, we get the beginning of
the current day. 

sqlite&gt; SELECT date('now', 'weekday 6');
2018-07-21  

The weekday modifier advances to the next date, where Sunday 
is 0, Monday 1, ..., Saturday 6. In this example, we get the date of 
the nearest Saturday.

The modifiers can be combined. 

sqlite&gt; SELECT date('now', 'start of year', '10 months', 'weekday 4');
2018-11-01 

This SQL statement returns the first Thursday of the November for the 
current year. In this example, we used three modifiers: start of year, 
+x months and weekday x. The now time string 
gives the current date. The start of year shifts the date backwards 
to the beginning of the year. The 10 months adds 10 months to the 
current month (January). Finally, the weekday 4 modifier advances 
the date forward to the first Thursday. 

The strftime function returns the date and time formatted according 
to the format string specified as the first argument. The second parameter is 
the time string. It can be followed by one or more modifiers.

sqlite&gt; SELECT strftime('%d-%m-%Y');
20-07-2018  

We can use the strftime function to return a date
in a different format. 

sqlite&gt; SELECT 'Current day: ' || strftime('%d');
Current day: 20   

This SQL statement returns the current day of the month. We used the 
strftime function.

sqlite&gt; SELECT 'Days to XMas: ' || (strftime('%j', '2018-12-24') - strftime('%j', 'now'));
Days to XMas: 157

Here we have computed the number of days till Christmas. The %j 
modifier gives the day of the year for the time string.

In this part of the SQLite tutorial, we worked with built-in SQLite functions. 

[Contents](..)
[Previous](../joins/)
[Next](../viewstriggerstransactions/)