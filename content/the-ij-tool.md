+++
title = "The ij tool"
date = 2025-08-29T19:52:38.506+01:00
draft = false
description = "This chapter of the Apache Derby tutorial covers the ij tool."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../tools/)
[Next](../sql/)

# The ij tool

last modified July 6, 2020 

In the fourth chapter, we are going to look at Derby's ij tool in
a greater detail.

The ij is an interactive scripting tool supplied with Derby. It 
is a command line client for the Derby database system. It can be used in two ways: 
either run SQL files or interactively execute SQL statements. The ij is 
located in the bin directory of the Derby installation directory.

$ ls $DERBY_HOME/bin | grep ij
ij
ij.bat

There are two scripts: the one with the .bat extension is for Windows.

## Starting ij

The ij can be started in three basic ways. 

$ $DERBY_HOME/bin/ij
ij version 10.11
ij&gt; 

Derby ij can be started with the ij script.  

$ java -cp $DERBY_HOME/lib/derbytools.jar org.apache.derby.tools.ij
ij version 10.11
ij&gt; 

Another way is to execute the compiled Java program. We must have the 
derbytools.jar in our classpath. The first way does essentially 
the same within the script file. It also works with environment variables. 

$ java -jar $DERBY_HOME/lib/derbyrun.jar ij
ij version 10.11
ij&gt; 

In the third way, we use the derbyrun.jar file to start ij. 

## Running SQL scripts

Unlike MySQL or PostgreSQL command line tools, ij is very simplistic. It
does not have a history of commands. Cursor keys cannot be used.

$ cat cars.sql 
-- SQL for the CARS table

SET SCHEMA USER12;
CREATE TABLE CARS(ID BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
    (START WITH 1, INCREMENT BY 1), NAME VARCHAR(30), PRICE INT);
INSERT INTO CARS(Name, Price) VALUES('Audi', 52642);
INSERT INTO CARS(Name, Price) VALUES('Mercedes', 57127);
INSERT INTO CARS(Name, Price) VALUES('Skoda', 9000);
INSERT INTO CARS(Name, Price) VALUES('Volvo', 29000);
INSERT INTO CARS(Name, Price) VALUES('Bentley', 350000);
INSERT INTO CARS(Name, Price) VALUES('Citroen', 21000);
INSERT INTO CARS(Name, Price) VALUES('Hummer', 41400);
INSERT INTO CARS(Name, Price) VALUES('Volkswagen', 21600);

A CARS table is created in schema USER12 and five 
rows are inserted.

ij&gt;  RUN 'cars.sql';
ij&gt; -- SQL for the CARS table

SET SCHEMA USER12;
0 rows inserted/updated/deleted
ij&gt; CREATE TABLE CARS(ID BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
    (START WITH 1, INCREMENT BY 1), NAME VARCHAR(30), PRICE INT);
0 rows inserted/updated/deleted
ij&gt; INSERT INTO CARS(Name, Price) VALUES('Audi', 52642);
1 row inserted/updated/deleted
ij&gt; INSERT INTO CARS(Name, Price) VALUES('Mercedes', 57127);
1 row inserted/updated/deleted
...

We use the RUN command to execute the cars.sql file. 
The file is located in the same directory, where ij was launched. 

ij&gt; SELECT * FROM CARS;
ID         |NAME                          |PRICE      
------------------------------------------------------
1          |Audi                          |52642      
2          |Mercedes                      |57127      
3          |Skoda                         |9000       
4          |Volvo                         |29000      
5          |Bentley                       |350000     
6          |Citroen                       |21000      
7          |Hummer                        |41400      
8          |Volkswagen                    |21600      

8 rows selected

We check the data. The table was successfully created.

An SQL file name can be taken by the ij tool as a parameter. 

$ cat cars2.sql 
CONNECT 'jdbc:derby://localhost:1527/testdb';

SET SCHEMA USER12;
CREATE TABLE CARS(ID BIGINT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
    (START WITH 1, INCREMENT BY 1), NAME VARCHAR(30), PRICE INT);
INSERT INTO CARS(Name, Price) VALUES('Audi', 52642);
INSERT INTO CARS(Name, Price) VALUES('Mercedes', 57127);
INSERT INTO CARS(Name, Price) VALUES('Skoda', 9000);
INSERT INTO CARS(Name, Price) VALUES('Volvo', 29000);
INSERT INTO CARS(Name, Price) VALUES('Bentley', 350000);
INSERT INTO CARS(Name, Price) VALUES('Citroen', 21000);
INSERT INTO CARS(Name, Price) VALUES('Hummer', 41400);
INSERT INTO CARS(Name, Price) VALUES('Volkswagen', 21600);

We add a CONNECT statement to the cars2.sql file. 
When we launch the ij tool, we are not yet connected to the database.

ij&gt; DROP TABLE CARS;
0 rows inserted/updated/deleted
ij&gt; EXIT;
$

We drop the table before we execute the cars2.sql script.

 
$ java -Dderby.system.home=/home/janbodnar/.derby \
&gt; -jar $DERBY_HOME/lib/derbyrun.jar ij cars2.sql

We set the Derby system directory and launch the ij tool with 
the cars2.sql as a parameter. The CARS table is 
created again.

## Basic commands

We can issue two kinds of commands. Commands specific to the ij tool
and SQL statements. Each command in ij is terminated with 
a semicolon. All ij commands, identifiers, and keywords are case-insensitive.

ij&gt; HELP;
 
 Supported commands include:
 
  PROTOCOL 'JDBC protocol' [ AS ident ];
                               -- sets a default or named protocol
  DRIVER 'class for driver';   -- loads the named class
  CONNECT 'url for database' [ PROTOCOL namedProtocol ] [ AS connectionName ];
                               -- connects to database URL
                               -- and may assign identifier
...

The HELP command shows a list of ij commands

ij&gt; CONNECT 'jdbc:derby://localhost:1527/testdb';

The CONNECT command connects to a database. In our case the database
name is testdb. This example assumes that we have set the Derby system
directory. (More about it in the next section.) Derby by default does
not require a user name and a password. We can configure Derby to require it.

ij&gt; SHOW CONNECTIONS;
CONNECTION0* - 	jdbc:derby://localhost:1527/testdb
* = current connection

The SHOW CONNECTIONS statement lists all opened connections.
In our case we can see an opened connection to the testdb database. 

ij&gt; SHOW TABLES;
TABLE_SCHEM         |TABLE_NAME                    |REMARKS             
------------------------------------------------------------------------
SYS                 |SYSALIASES                    |                    
SYS                 |SYSCHECKS                     |                    
SYS                 |SYSCOLPERMS                   | 
...

The SHOW TABLES command shows all tables in a database.
There are a few SYS tables. 

ij&gt; SHOW TABLES IN USER12;
TABLE_SCHEM         |TABLE_NAME                    |REMARKS             
------------------------------------------------------------------------
USER12              |CARS                          |                    

1 row selected

We can list tables in a specific schema. The 
SHOW TABLES IN USER12 shows tables in the USER12
schema. 

ij&gt; DESCRIBE USER12.CARS;
COLUMN_NAME         |TYPE_NAME|DEC&amp;|NUM&amp;|COLUM&amp;|COLUMN_DEF|CHAR_OCTE&amp;|IS_NULL&amp;
------------------------------------------------------------------------------
ID                  |BIGINT   |0   |10  |19    |AUTOINCRE&amp;|NULL      |NO      
NAME                |VARCHAR  |NULL|NULL|30    |NULL      |60        |YES     
PRICE               |INTEGER  |0   |10  |10    |NULL      |NULL      |YES     

3 rows selected

The DESCRIBE command provides a decription of the specified 
table or view. If the USER12 schema is not the current schema 
of the connection, we have to specify
it before the table name. The current schema is specified in the connection string
as the user name. 

ij&gt; DISCONNECT;
ij&gt; SHOW CONNECTIONS;
No connections available.

The DISCONNECT command disconnects from the database.
The subsequent SHOW CONNECTIONS command shows no available 
connections. 

ij&gt; EXIT;
$ 

Finally, we exit the ij tool. In case of an embedded environment, 
it also shuts down the database. Which is equivalent to the 
CONNECT 'jdbc:derby:testdb;shutdown=true'; command. 

## SQL statements

The main purpose of the ij tool is to issue SQL commands. We 
reconnect to the testdb database. 

$ $DERBY_HOME/bin/ij
ij version 10.11
ij&gt; CONNECT 'jdbc:derby://localhost/testdb;user=USER12';

Now the current schema is the USER12 schema. When issuing SQL 
statements for tables located in the USER12 schema, we can omit 
the schema name.

ij&gt; SELECT * FROM CARS WHERE ID IN (1, 3, 5);
ID         |NAME                          |PRICE      
------------------------------------------------------
1          |Audi                          |52642      
3          |Skoda                         |9000       
5          |Bentley                       |350000     

3 rows selected

In the above SQL statement, we select all three columns for rows with
IDs 1, 3, and 5.

friends.sql
  

CREATE TABLE APP.FRIENDS(ID INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
    (START WITH 1, INCREMENT BY 1), NAME VARCHAR(25));
INSERT INTO APP.FRIENDS(NAME) VALUES('Jane');
INSERT INTO APP.FRIENDS(NAME) VALUES('Thomas');
INSERT INTO APP.FRIENDS(NAME) VALUES('Beky');

We have a FRIENDS table in the APP schema.

ij&gt; SELECT * FROM APP.FRIENDS;
ID         |NAME                     
-------------------------------------
1          |Jane                     
2          |Thomas                   
3          |Beka                     

3 rows selected

Three rows from the FRIENDS table were selected. Since the table 
is not located in the current schema, we must fully qualify the table name. 

ij&gt; INSERT INTO APP.FRIENDS(Name) VALUES ('Robert');
1 row inserted/updated/deleted
ij&gt; SELECT ID, NAME FROM APP.FRIENDS WHERE ID=4;
ID         |NAME                     
-------------------------------------
4          |Robert                   

1 row selected

We insert a new row into the FRIENDS table and later select it. 

## Specifying the Derby system directory

The Derby system directory contains database files, configuration data or a
log file. If we do not provide a Derby system directory a current directory
is assumed to be the Derby system one. To provide the Derby system directory,
we assign the derby.system.home property. It can be done via
JVM option, configuration file, environment variable, or in a Java file. 

$ java -Dderby.system.home=/home/janbodnar/.derby \
&gt; -jar $DERBY_HOME/lib/derbyrun.jar ij
ij version 10.11

Here we specify the Derby system directory with the -D JVM option.
The derby.log file is created in the system directory. The derby.log
file is recreated each time we connect to a Derby database. We can 
look at the timestamp. If the derby.log file appears ouside the intended
directory, we have not set the Derby system directory correctly.

We might not want to specify the Derby system directory each time.
We could utilize the DERBY_OPTS environment variable. 

$ export DERBY_OPTS=-Dderby.system.home=/home/janbodnar/.derby

Derby will automatically try to connect to databases in the specified
system directory.

## The ij properties

When starting up the ij tool, we can specify properties on the 
command line or in a properties file. The properties are various parameters 
taken by the ij tool. They can save us some repetitive work.

$ java -Dij.user=USER12 -Dij.database=testdb -Dij.protocol=jdbc:derby://localhost/ \
&gt; -Dderby.system.home=/home/janbodnar/.derby \ 
&gt; -jar $DERBY_HOME/lib/derbyrun.jar ij
ij version 10.11
CONNECTION0* - jdbc:derby://localhost:1527/testdb
* = current connection
ij&gt; SELECT * FROM CARS WHERE ID = 1;
ID         |NAME                          |PRICE      
------------------------------------------------------
1          |Audi                          |52642      

1 row selected
ij&gt;

We provide three ij properties on the command line with the -D option. 
The ij.user specifies the user name to establish a connection. The supplied 
user name becomes the current schema. The ij.database has the database name to 
which we connect. The ij.protocol property specifies the default protocol 
of the database connection URL. We are ready to launch SQL statements. 

In the next example, we create an ij.properties file, where we set 
three ij properties. 

$ cat ij.properties 
ij.user=USER12
ij.database=testdb
ij.protocol=jdbc:derby://localhost:1527/

With the cat command, we show the contents of the ij.properties 
file. We set the same properties as in the first example.

$ java -Dderby.system.home=/home/janbodnar/.derby \
&gt; -jar $DERBY_HOME/lib/derbyrun.jar ij -p ij.properties
ij version 10.11
CONNECTION0* - jdbc:derby://localhost:1527/testdb
* = current connection
ij&gt; SELECT * FROM CARS WHERE ID=2;
ID         |NAME                          |PRICE      
------------------------------------------------------
2          |Mercedes                      |57127      

1 row selected

The -p option of the ij tool takes the properties 
file name. 

In this chapter, we have covered the ij tool. 

[Contents](..)
[Previous](../tools/)
[Next](../sql/)