+++
title = "MySQL functions"
date = 2025-08-29T20:03:46.460+01:00
draft = false
description = "In this part of the MySQL tutorial, we cover MySQL functions."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../joins/)
[Next](../views/)

# MySQL functions

last modified January 10, 2023 

In this part of the MySQL tutorial, we will cover MySQL built-in functions. 

MySQL built-in functions can be categorised into several groups.

- Mathematical functions

- Aggregate functions

- String functions

- Date and time functions

- System Functions

Here we show only a portion of all MySQL functions. To get
the full list of available functions, consult the MySQL 
reference manual.

## Mathematical functions

MySQL supports multiple mathematical functions.

mysql&gt; SELECT RAND();
+-------------------+
| RAND()            |
+-------------------+
| 0.786536605829873 |
+-------------------+

The RAND() function returns a random number
from the &lt;0, 1&gt; interval.

mysql&gt; SELECT ABS(-3), PI(), SIN(0.5);
+---------+----------+-------------------+
| ABS(-3) | PI()     | SIN(0.5)          |
+---------+----------+-------------------+
|       3 | 3.141593 | 0.479425538604203 |
+---------+----------+-------------------+

The ABS() function returns the absolute value
of a number. The PI() function gives the value
of PI. And the SIN() function computes the sine
of an argument. 

mysql&gt; SELECT BIN(22), OCT(22), HEX(22);
+---------+---------+---------+
| BIN(22) | OCT(22) | HEX(22) |
+---------+---------+---------+
| 10110   | 26      | 16      |
+---------+---------+---------+

We use functions to give binary, octal and hexadecimal
representation of decimal 22.

mysql&gt; SELECT CEIL(11.256), FLOOR(11.256), ROUND(11.256, 2);
+--------------+---------------+------------------+
| CEIL(11.256) | FLOOR(11.256) | ROUND(11.256, 2) |
+--------------+---------------+------------------+
|           12 |            11 |            11.26 |
+--------------+---------------+------------------+

The CEIL() function rounds the value to the
smallest following integer. The FLOOR() function
rounds the value to the largest previous integer. 
The ROUND() returns a number rounded to a 
specified number of decimal places.

mysql&gt; SELECT POW(3, 3), SQRT(9);
+-----------+---------+
| POW(3, 3) | SQRT(9) |
+-----------+---------+
|        27 |       3 |
+-----------+---------+

The power and the square root functions.

mysql&gt; SELECT DEGREES(2*PI());
+-----------------+
| DEGREES(2*PI()) |
+-----------------+
|             360 |
+-----------------+

The DEGREES() function computes degrees from radians.

## Aggregate functions

Aggregate functions operate on sets of values.

mysql&gt; SELECT * FROM Cars;
+----+------------+--------+
| Id | Name       | Cost   |
+----+------------+--------+
|  1 | Audi       |  52642 |
|  2 | Mercedes   |  57127 |
|  3 | Skoda      |   9000 |
|  4 | Volvo      |  29000 |
|  5 | Bentley    | 350000 |
|  6 | Citroen    |  21000 |
|  7 | Hummer     |  41400 |
|  8 | Volkswagen |  21600 |
+----+------------+--------+

We have the Cars table.

mysql&gt; SELECT MIN(Cost), MAX(Cost), AVG(Cost)
    -&gt; FROM Cars;
+-----------+-----------+------------+
| MIN(Cost) | MAX(Cost) | AVG(Cost)  |
+-----------+-----------+------------+
|      9000 |    350000 | 72721.1250 |
+-----------+-----------+------------+

We use the MIN(), MAX() and AVG()
aggregate functions to compute the minimal price, maximal price and
the average price of cars in the table.

mysql&gt; SELECT SUM(Cost), COUNT(Id), STD(Cost), 
    -&gt; VARIANCE(Cost) FROM Cars;
+-----------+-----------+-------------+------------------+
| SUM(Cost) | COUNT(Id) | STD(Cost)   | VARIANCE(Cost)   |
+-----------+-----------+-------------+------------------+
|    581769 |         8 | 105931.1676 | 11221412265.3594 |
+-----------+-----------+-------------+------------------+

We use the SUM() function to get the sum of all values in 
the Cost column. We count the number of cars
in the table with the COUNT() function. Finally,
we get the standard deviation and variance using the STD()
and VARIANCE() functions.

## String functions

In this group we have various strings related functions.

mysql&gt; SELECT LENGTH('ZetCode'), UPPER('ZetCode'), LOWER('ZetCode');
+-------------------+------------------+------------------+
| LENGTH('ZetCode') | UPPER('ZetCode') | LOWER('ZetCode') |
+-------------------+------------------+------------------+
|                 7 | ZETCODE          | zetcode          |
+-------------------+------------------+------------------+

The LENGTH() function returns the length of a string.
The UPPER() function converts characters into upper-case
letters. The LOWER() function converts characters into
lower-case letters.

ysql&gt; SELECT LPAD(RPAD("ZetCode", 10, "*"), 13, "*");
+-----------------------------------------+
| LPAD(RPAD("ZetCode", 10, "*"), 13, "*") |
+-----------------------------------------+
| ***ZetCode***                           |
+-----------------------------------------+

We use the LPAD() and RPAD() functions to 
append and prepend characters to a specified string. The "ZetCode"
string has 7 characters. The RPAD() function appends
3 '*' characters to the string, which will be now 10 characters long.

mysql&gt; SELECT REVERSE('ZetCode'), REPEAT('*', 6);
+--------------------+----------------+
| REVERSE('ZetCode') | REPEAT('*', 6) |
+--------------------+----------------+
| edoCteZ            | ******         |
+--------------------+----------------+

The REVERSE() function reverses the characters in a string.
The REPEAT() function repeats a string specified number of
times.

mysql&gt; SELECT LEFT('ZetCode', 3), RIGHT('ZetCode', 3), 
    -&gt; SUBSTRING('ZetCode', 3, 3);
+--------------------+---------------------+----------------------------+
| LEFT('ZetCode', 3) | RIGHT('ZetCode', 3) | SUBSTRING('ZetCode', 3, 3) |
+--------------------+---------------------+----------------------------+
| Zet                | ode                 | tCo                        |
+--------------------+---------------------+----------------------------+

The LEFT() function returns 3 leftmost characters, the RIGHT()
function returns 3 characters from the right. The SUBSTRING() function
returns three characters from the third position of the string.

mysql&gt; SELECT STRCMP('byte', 'byte'), CONCAT('three', ' apples');
+------------------------+----------------------------+
| STRCMP('byte', 'byte') | CONCAT('three', ' apples') |
+------------------------+----------------------------+
|                      0 | three apples               |
+------------------------+----------------------------+

The STRCMP() compares two strings and returns 0 if they 
are the same. The CONCAT() function concatenates two
strings. 

mysql&gt; SELECT REPLACE('basketball', 'basket', 'foot');
+-----------------------------------------+
| REPLACE('basketball', 'basket', 'foot') |
+-----------------------------------------+
| football                                |
+-----------------------------------------+

The REPLACE() function returns a string, in which 
we have replaced some text. The first parameter is the original string.
The second parameter is a string, we want to replace. And the last
parameter is the new replacing string.

## Date &amp; time functions

In this group we have various date and time functions.

mysql&gt; SELECT DAYNAME('2011-01-23'), YEAR('2011/01/23'),
    -&gt; MONTHNAME('110123');
+-----------------------+--------------------+---------------------+
| DAYNAME('2011-01-23') | YEAR('2011/01/23') | MONTHNAME('110123') |
+-----------------------+--------------------+---------------------+
| Sunday                |               2011 | January             |
+-----------------------+--------------------+---------------------+

In MySQL, date is written in the format YYYY-MM-DD. Year is 
followed by month and day. They can be separated by slash or by hyphen. 
MySQL also supports a shortened date format, without separators. 
Time is written in a standard form, HH:MM:SS. 
Hours followed by minutes and seconds.

mysql&gt; SELECT NOW();
+---------------------+
| NOW()               |
+---------------------+
| 2011-01-22 00:24:49 |
+---------------------+

The NOW() function returns the current date and time.

mysql&gt; SELECT CURTIME(), CURDATE();
+-----------+------------+
| CURTIME() | CURDATE()  |
+-----------+------------+
| 00:25:03  | 2011-01-22 |
+-----------+------------+

The CURTIME() returns the current time and the CURDATE()
returns the current date.

mysql&gt; SELECT DATEDIFF('2011-3-12', '2011-1-12');
+------------------------------------+
| DATEDIFF('2011-3-12', '2011-1-12') |
+------------------------------------+
|                                 59 |
+------------------------------------+

With the DATEDIFF() we get the number of days between
two dates. 

mysql&gt; SELECT DAYNAME('1982-4-12'), MONTHNAME('1982-4-12') ;
+----------------------+------------------------+
| DAYNAME('1982-4-12') | MONTHNAME('1982-4-12') |
+----------------------+------------------------+
| Monday               | April                  |
+----------------------+------------------------+

The DAYNAME() function returns the day name of a date.
The MONTHNAME() function returns a month name of a date.

mysql&gt; SELECT WEEKOFYEAR('110123'), WEEKDAY('110123'),
    -&gt; QUARTER('110123');
+----------------------+-------------------+-------------------+
| WEEKOFYEAR('110123') | WEEKDAY('110123') | QUARTER('110123') |
+----------------------+-------------------+-------------------+
|                    3 |                 6 |                 1 |
+----------------------+-------------------+-------------------+

January 23, 2011 can be written in a shortened date format, 110123. 
We use the WEEKOFYEAR() to find out the week of the year. 
The WEEKDAY() returns 6, which is Sunday. And the
QUARTER() function returns the quarter of the year.

mysql&gt; SELECT DATE_FORMAT('110123', '%d-%m-%Y');
+-----------------------------------+
| DATE_FORMAT('110123', '%d-%m-%Y') |
+-----------------------------------+
| 23-01-2011                        |
+-----------------------------------+

To display date in a different format, we use the DATE_FORMAT().

mysql&gt; SELECT DATE_ADD('110123', INTERVAL 45 DAY), 
    -&gt; SUBDATE('110309', INTERVAL 45 DAY);
+-------------------------------------+------------------------------------+
| DATE_ADD('110123', INTERVAL 45 DAY) | SUBDATE('110309', INTERVAL 45 DAY) |
+-------------------------------------+------------------------------------+
| 2011-03-09                          | 2011-01-23                         |
+-------------------------------------+------------------------------------+

We can use DATE_ADD() to add time intervals to a date and 
SUBDATE() to subtract time intervals from a date. 

## System functions

System functions provide some system information about MySQL database.

mysql&gt; SELECT VERSION(), DATABASE();
+--------------------+------------+
| VERSION()          | DATABASE() |
+--------------------+------------+
| 5.1.41-3ubuntu12.8 | mydb       |
+--------------------+------------+

We get the version of the MySQL database and the current database name.

mysql&gt; SELECT USER();
+----------------+
| USER()         |
+----------------+
| root@localhost |
+----------------+

The USER() function returns the user name and the host name 
provided by the client.

mysql&gt; SELECT CHARSET('ZetCode'), COLLATION('ZetCode');
+--------------------+----------------------+
| CHARSET('ZetCode') | COLLATION('ZetCode') |
+--------------------+----------------------+
| utf8               | utf8_general_ci      |
+--------------------+----------------------+

The CHARSET() function returns the character set of the
argument. The COLLATION() returns the collation of the
current string argument. They depend on the charset and collation
of the client in use.

In this part of the MySQL tutorial, we worked with the built-in MySQL functions. 

[Contents](..)
[Previous](../joins/)
[Next](../views/)