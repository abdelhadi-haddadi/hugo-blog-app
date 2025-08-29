+++
title = "Derby tools"
date = 2025-08-29T19:52:42.552+01:00
draft = false
description = "In this part of the Apache Derby tutorial, we cover Derby tools."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../install/)
[Next](../ij/)

# Derby tools

last modified July 6, 2020 

In this chapter, we mention Derby tools. Derby tools and utilities 
are a set of scripts supplied with Derby. They are typically used to create, 
inspect, and update a Derby database.

In this page, we will mention the sysinfo, dblook, 
ij, startNetworkServer, and stopNetworkServer 
tools. 

## Launching Derby tools

Derby tools can be run in two ways. We use the script names located in the
bin directory of the Derby installation directory or we can use the
derbyrun.jar file to launch them.

$ $DERBY_HOME/bin/ij
$ java -jar $DERBY_HOME/lib/derbyrun.jar ij

We can launch the ij tool by specifying the 
name of the script in the terminal. The second line runs the ij 
using the derbyrun.jar file. 

## sysinfo

The sysinfo tool provides information about the Operating system, Java
and Derby. It will print among others Java version, Java home directory,
OS version, Java runtime version, Derby version, current and supported locales.
The tool can be useful to track down some installation or configuration issues 
with Derby.

$ $DERBY_HOME/bin/sysinfo
------------------ Java Information ------------------
Java Version:    1.8.0_111
Java Vendor:     Oracle Corporation
Java home:       /home/janbodnar/bin/jdk1.8.0_111/jre
Java classpath:  /home/janbodnar/bin/jdk1.8.0_111/db/lib/derby.jar:/home/janbodnar/bin/jdk1.8.0_111/db/lib/derbynet.jar:/home/janbodnar/bin/jdk1.8.0_111/db/lib/derbytools.jar:/home/janbodnar/bin/jdk1.8.0_111/db/lib/derbyoptionaltools.jar:/home/janbodnar/bin/jdk1.8.0_111/db/lib/derbyclient.jar
OS name:         Linux
OS architecture: amd64
OS version:      4.4.0-66-generic
...

This is an excerpt from the information provided on a particular system.

## ij

The ij is an interactive scripting tool. It is used for running scripts or 
interactive queries against a Derby database.

$ cat cars.sql
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

We have a cars.sql file which creates a database schema and a 
CARS table. 

$ $DERBY_HOME/bin/ij
ij version 10.11
ij&gt; CONNECT 'jdbc:derby:testdb;user=user12;create=true';

We start the ij tool. We create a testdb database 
and make a connection to it. 

ij&gt; SHOW CONNECTIONS;
CONNECTION0* - jdbc:derby:testdb
* = current connection

The SHOW CONNECTIONS statement displays opened connections
to Derby databases. 

ij&gt; RUN 'cars.sql';
ij&gt; CREATE SCHEMA USER12;
0 rows inserted/updated/deleted
ij&gt; CREATE TABLE CARS(ID INT PRIMARY KEY, NAME VARCHAR(30), PRICE INT);
0 rows inserted/updated/deleted
ij&gt; INSERT INTO CARS VALUES(1, 'Audi', 52642);
1 row inserted/updated/deleted
ij&gt; INSERT INTO CARS VALUES(2, 'Mercedes', 57127);
1 row inserted/updated/deleted
ij&gt; INSERT INTO CARS VALUES(3, 'Skoda', 9000);
...

We load and execute the cars.sql site. We are informed about the 
ongoing operations.

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

We select all rows from the CARS table. 

ij&gt; CONNECT 'jdbc:derby:testdb;shutdown=true';
ERROR 08006: Database 'testdb' shutdown.

Shutting down a database in Derby results in an exception. 
The ERROR 08006 is expected. 

ij&gt; SHOW CONNECTIONS;
No current connection

The connection is closed.

ij&gt; EXIT;

We quit the ij tool with the EXIT command. Note that each command is 
followed by semicolon. 

## dblook

The dblook tool is used to save the data definition language of 
database objects including tables, views, indexes, and triggers. 

$DERBY_HOME/bin/dblook -d jdbc:derby:testdb
-- Timestamp: 2017-03-13 20:05:43.281
-- Source database is: testdb
-- Connection URL is: jdbc:derby:testdb
-- appendLogs: false

-- ----------------------------------------------
-- DDL Statements for schemas
-- ----------------------------------------------

CREATE SCHEMA "USER12";

-- ----------------------------------------------
-- DDL Statements for tables
-- ----------------------------------------------

CREATE TABLE "USER12"."CARS" ("ID" INTEGER NOT NULL, "NAME" VARCHAR(30), "PRICE" INTEGER);

CREATE TABLE "APP"."CARS" ("ID" BIGINT NOT NULL GENERATED ALWAYS AS IDENTITY (START WITH 1, INCREMENT BY 1), "NAME" VARCHAR(30), "PRICE" INTEGER);

-- ----------------------------------------------
-- DDL Statements for keys
-- ----------------------------------------------

-- PRIMARY/UNIQUE
ALTER TABLE "APP"."CARS" ADD CONSTRAINT "SQL170313140819740" PRIMARY KEY ("ID");

ALTER TABLE "USER12"."CARS" ADD CONSTRAINT "SQL170313200304680" PRIMARY KEY ("ID");

In the above example, we have dumped the objects from the testdb database.
With the -d option we have provided the connection URL to the database. 
In our case the dblook tool saved a database schema and one table. 
With the -o option the output can be redirected to a file. 

## startNetworkServer and stopNetworkServer

The scripts start and stop the Derby Network server. In case of a networked
server, multiple connections to a Derby database may be created. 

$ $DERBY_HOME/bin/startNetworkServer &amp;
[1] 12421
$ Mon Mar 13 20:12:39 CET 2017 : Security manager installed using the Basic server security policy.
Mon Mar 13 20:12:40 CET 2017 : Apache Derby Network Server - 10.11.1.2 - (1629631) started and ready to accept connections 

Here we start the Derby Network Server with the startNetworkServer script.

ij&gt; CONNECT 'jdbc:derby://localhost:1527/testdb';

Here we connect to the testdb database via the Derby Network Server. 
The connection URL is different for networked connections. 

ij&gt; SELECT * FROM USER12.CARS;
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

We select all cars from the CARS table. Since we have not provided the
database schema in the connection URL, we must specify it now. The database
schema is the user name; in our case USER12. 

$ $DERBY_HOME/bin/stopNetworkServer
Mon Mar 13 20:15:42 CET 2017 : Apache Derby Network Server - 10.11.1.2 - (1629631) shutdown
$ Mon Mar 13 20:15:42 CET 2017 : Apache Derby Network Server - 10.11.1.2 - (1629631) shutdown

We have stopped the server with the stopNetworkServer script. 

## NetworkServerControl

NetworkServerControl is a system tool which enables to start and stop 
Derby network server and configure or retreive diagnostic information. With the exception 
of ping, all commands can only be performed from the machine 
on which the server is running.

$ $DERBY_HOME/bin/NetworkServerControl start &amp;

With the start command, we start the Derby server.

$ $DERBY_HOME/bin/NetworkServerControl ping
Tue Mar 21 15:53:29 CET 2017 : Connection obtained for host: localhost, port number 1527.

The ping command tests whether the Derby server is up.

$ $DERBY_HOME/bin/NetworkServerControl sysinfo
--------- Derby Network Server Information --------
Version: CSS10110/10.11.1.2 - (1629631)  Build: 1629631  DRDA Product Id: CSS10110
-- listing properties --
derby.drda.traceDirectory=/home/janbodnar/.derby/
derby.drda.maxThreads=0
derby.drda.sslMode=off
derby.drda.keepAlive=true
...

The sysinfo command provides system information.

$ $DERBY_HOME/bin/NetworkServerControl runtimeinfo
--- Derby Network Server Runtime Information ---
---------- Session Information ---------------
Session # :3
-------------------------------------------------------------
# Connection Threads : 1
# Active Sessions : 1
# Waiting  Sessions : 0

Total Memory : 78643200	Free Memory : 75359512

The runtimeinfo command provides extensive debbugging information about 
sessions, threads, prepared statements, and memory usage for the running Network Server.

$ $DERBY_HOME/bin/NetworkServerControl shutdown
Tue Mar 21 15:56:43 CET 2017 : Apache Derby Network Server - 10.11.1.2 - (1629631) shutdown
Tue Mar 21 15:56:44 CET 2017 : Apache Derby Network Server - 10.11.1.2 - (1629631) shutdown

The shutdown command stops the Derby server.

In the chapter, we have written about Derby tools.

[Contents](..)
[Previous](../install/)
[Next](../ij/)