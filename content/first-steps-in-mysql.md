+++
title = "First steps in MySQL"
date = 2025-08-29T20:03:45.337+01:00
draft = false
description = "In this part of the MySQL tutorial, we do first steps in MySQL. We show how to start MySQL, create a connection, and issue SQL commands."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../installation/)
[Next](../quick/)

# First steps in MySQL

last modified May 18, 2021

In this chapter, we are going to make our first steps with MySQL. We will
start the server, connect to the server with a client tool, create a new
user and issue our first SQL statements. 

## Starting/stopping the MySQL server

MySQL server is a daemon which runs in the background. The way you start 
MySQL depends on your system and the installation type that you have done. 

$ sudo /etc/init.d/mysqld start
$ sudo /etc/init.d/mysqld stop

On traditional init based systems, we would use the above commands to start 
and stop the MySQL server.

$ sudo systemctl start mysql
$ sudo systemctl start stop

On systems that use systemd, we would start and stop MySQL server 
using the above commands. 

$ sudo /usr/local/mysql/support-files/mysql.server start
$ sudo /usr/local/mysql/support-files/mysql.server stop

If we have installed MySQL from sources, we can use the mysql.server
command to start and stop MySQL.

On Ubuntu, the root account is not enabled by default. Here we show, how to enable it.
Then we can use the su (switch user) command to switch to root to start 
the MySQL daemon. 

After we have started the server, we can check if it is alive.

-->

## Checking MySQL status

We are going to show how to check the status of MySQL server.

$ systemctl status mysql
● mysql.service - LSB: Start and stop the mysql database server daemon
     Loaded: loaded (/etc/init.d/mysql; generated)
     Active: active (running) since Tue 2021-05-18 13:34:02 CEST; 12s ago
       Docs: man:systemd-sysv-generator(8)
    Process: 127538 ExecStart=/etc/init.d/mysql start (code=exited, status=0/SUCCESS)
      Tasks: 33 (limit: 9079)
     Memory: 100.8M
        CPU: 569ms
...

We check the status with the systemctl status mysql command.

$ mysqladmin -u root -p ping
Enter password: 
mysqld is alive

We use the mysqladmin tool to check if MySQL server 
is running. The -u option specifies the user which 
pings the server. The -p option is a password for the 
user. If the password is omitted, the mysqladmin prompts 
for one. The characters that you type after the prompt are not visible. 
This is a more secure solution for working with mysqladmin. 
This way no one behind your back can see the password you have typed 
and it is not stored in the history of the shell. 

## The mysqladmin tool

The mysqladmin is a client for performing administrative operations. 

$ mysqladmin -uroot -p shutdown

We use the mysqladmin tool to shut down the MySQL server. 

$ mysqladmin -u root -p version
Enter password: 
...
Server version          5.7.17-0ubuntu0.16.04.1
Protocol version        10
Connection              Localhost via UNIX socket
UNIX socket             /var/run/mysqld/mysqld.sock
Uptime:                 45 sec
...

We use mysqladmin to check the version of MySQL server.

$ mysqladmin -u root -p create testdb

It is possible to create a database with mysqladmin.

$ mysqladmin -u root -p drop testdb

This command deletes a database.

$ mysqladmin -u root -p password 
Enter password: 
New password: 
Confirm new password: 

We can use mysqladmin to change user password.
We enter the old password and two times the new one.

## The mysql tool

The mysql is a MySQL command line tool. It is a simple shell. 
It supports interactive and non-interactive use. 

$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 10
Server version: 5.7.17-0ubuntu0.16.04.1 (Ubuntu)

Copyright (c) 2000, 2016, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql&gt;

We connect to the server with the mysql tool. Note that we have 
omitted the password after the -p option. We type the password 
after the 'Enter password' prompt.

The mysql command line tool has mysql&gt; as prompt. At this prompt 
we can issue both mysql built-in commands and SQL statements. 
We need to familiarise ourselves with the mysql tool. 
The Ctrl+L clears the screen, the Ctrl+D 
or the quit command quit 
the mysql. We need to distinguish between mysql 
commands and SQL statements. SQL statements are terminated with a semicolon.

mysql&gt; help

For information about MySQL products and services, visit:
   http://www.mysql.com/
For developer information, including the MySQL Reference Manual, visit:
   http://dev.mysql.com/
To buy MySQL Enterprise support, training, or other products, visit:
   https://shop.mysql.com/

List of all MySQL commands:
Note that all text commands must be first on line and end with ';'
?         (\?) Synonym for `help'.
clear     (\c) Clear the current input statement.
connect   (\r) Reconnect to the server. Optional arguments are db and host.
delimiter (\d) Set statement delimiter.
edit      (\e) Edit command with $EDITOR.
ego       (\G) Send command to mysql server, display result vertically.
exit      (\q) Exit mysql. Same as quit.
go        (\g) Send command to mysql server.
help      (\h) Display this help.
nopager   (\n) Disable pager, print to stdout.
notee     (\t) Don't write into outfile.
pager     (\P) Set PAGER [to_pager]. Print the query results via PAGER.
print     (\p) Print current command.
prompt    (\R) Change your mysql prompt.
quit      (\q) Quit mysql.
...

Type help to get a full list of mysql commands. 

mysql&gt; system pwd
/home/janbodnar

The system command can execute a shell command. We have launched 
the pwd command to find out our current working directory. 

mysql&gt; quit
Bye

The quit command terminates the mysql shell. 

$ mysql --version
mysql  Ver 14.14 Distrib 5.7.17, for Linux (x86_64) using  EditLine wrapper

The mysql can be used also non-interactively. Here we get the version
of the tool.

## Creating a database

Now we are going to create our database. 

mysql&gt; SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0,00 sec)

The SHOW DATABASES statement shows all available databases on our
system. Note that SQL statements are terminated with a semicolon. There are four
databases present. The information_schema, mysql, 
and performance_schema are MySQL system databases. 
The sys is a set of schema objects used for tuning and diagnosis 
use cases. There are no user defined databases yet.
test 
database is available as a workspace for users to try things out. It is empty; 
there are no tables. -->

mysql&gt; CREATE DATABASE mydb;
Query OK, 1 row affected (0,00 sec)

This statement creates a new database. Throughout this tutorial, we will use the 
mydb database. To create a new database, we need to have certain 
privileges. Remember that we have connected to the server with the root user, which 
is a superuser and has all privileges.

mysql&gt; SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mydb               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0,00 sec)

Showing all databases, the mydb database is among them. 

mysql&gt; USE mydb;
Database changed

In order to work with a database, we must first select it. 
We select a specific database with the USE command. 

mysql&gt; SHOW TABLES;
Empty set (0.00 sec)

The SHOW TABLES statement shows all available tables in 
a database. Since it is a newly created database, no tables are found. 

mysql&gt; source cars.sql
Database changed
Query OK, 0 rows affected (0.20 sec)

Query OK, 1 row affected (0.08 sec)

...

In the first chapter, we have provided some SQL scripts to create
some tables. We use the source command to execute the cars.sql 
script, which creates a Cars table for us.

mysql&gt; SHOW TABLES;
+----------------+
| Tables_in_mydb |
+----------------+
| Cars           |
+----------------+
1 row in set (0,00 sec)

Now the SHOW TABLES statement displays one table available. 

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
8 rows in set (0,00 sec)

And this is the data in the table. 

## Creating a new user

Similarly to a Unix root account, it is advised not to use the MySQL
superuser root account for our daily tasks. We should use the root
account only when it is necessary. We create a new account
that we will use. This user will have limited privileges. 
When using the root user we could accidentally do a lot of harm to
our data. 

mysql&gt; CREATE USER user12@localhost IDENTIFIED BY '34klq*';

The above command creates a new user called user12. 
The accout has password 34klq*. The user is created, 
but he has no privileges. 

mysql&gt; GRANT ALL ON mydb.* TO user12@localhost;

This statement grants all privileges to user12 for all database 
objects on the mydb database. These privileges will be sufficient 
for the examples in this tutorial.

mysql&gt; quit
Bye
$ mysql -u user12 -p

Now we can connect to MySQL with the new user account.

$ mysql -u user12 -p mydb -e "SELECT * FROM Cars"
Enter password: 
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

We connect to the mydb database non-interactivly and 
execute an SQL statement. The statement to execute is specified after
the -e option.

In this chapter, we did our first steps with MySQL database system. 

[Contents](..) 
[Previous](../installation/)
[Next](../quick/)