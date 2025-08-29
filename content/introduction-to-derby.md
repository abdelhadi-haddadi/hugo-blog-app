+++
title = "Introduction to Derby"
date = 2025-08-29T19:52:37.366+01:00
draft = false
description = "This chapter is an introduction to the Derby database. We mention modes in which Derby can run, configuration settings and the connection URL."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Next](../install/)

# Introduction to Derby

last modified July 6, 2020 

In this chapter, we cover basic concepts and definitions of Derby. 

*Derby* is a relational database management system written in Java. 
It implements an SQL-92 core subset, as well as some SQL-99 features.
It uses IBM DB2 SQL syntax. Derby has a small footprint around 2MB. 
It has transaction support. The database
format used by Derby is portable and platform independent.

## Deployment options

Derby can operate in two modes: embedded or client-server. In the *embedded mode*
the Derby engine runs within the Java Virtual Machine of the application. 
The application is accessing the database directly and exclusively. No other
application can access the database simultaneously. There is no need to set up
a Derby server before connecting to the database. The Derby engine is started 
when we load the embedded driver.

In the *client-server* mode Derby provides multi-user connectivity across 
a network. The Derby engine runs in the JVM of the server. Other applications can 
connect to the Database from different JVMs. We must start a database server 
before connecting to the database. This is similar to other RDBMS like Oracle or MySQL. 

## The Derby system

The Derby system consists of an instance of the Derby engine and
its environment. It includes the system directory, the databases
and the system-wide configuration. Each database is located in a
subdirectory of the system directory having the same name as the
database. In addition it has an error log file and an optional 
derby.properties file. Derby writes information and 
error messages to a log file with a default name derby.log. 
The properties file contains configuration data and parameters 
specific to the Derby system. The derby system is not persistent. 
We must provide the location of the system at every startup. 

The Derby system is specified with the derby.system.home
property. If the directory specified in the property does not exist,
Derby creates it automatically. If we do not specify the property
explicitly, the current directory is used. The current directory is
the value of the JVM user.dir property. It is recommended
to always specify the derby.system.home explicitly. 

-Dderby.system.home=/home/janbodnar/.derby

The property can be set on the command line, in an environment variable, 
in a dialog box in case we use an IDE, or in the derby.properties file. 

## The Derby properties

The derby.properties is a configuration file for the Derby system.
It is a simple text file which enables us to configure the entire
Derby system, a specific database or a conglomerate. A conglomerate
is a table or index in Derby. We can configure several options, such as 
user authorisation, which databases to boot, the name of the log file, 
the location of the system directory. The derby.properties 
is not created automatically; we must create the file if we want to use it. 

## Starting &amp; ending Derby database

In the embedded mode, the database is started when an application first 
makes a connection to it. It is possible to configure the Derby system to 
boot all available databases when it starts with the derby.system.bootAll property. 
When the database has started, a message is written to the derby.log file. 
A database is shut down by specifying the shutdown=true attribute
in the connection URL. We can shutdown a database or an entire Derby system.

DriverManager.getConnection("jdbc:derby:testdb;shutdown=true");
DriverManager.getConnection("jdbc:derby:;shutdown=true");

The first JDBC call shuts down the testdb database. The second call ends
the whole Derby system. Note that an SQLExpection is raised when a system
shuts down. This exception should be programmatically handled. We should also
close all existing resources before shutting down the database or the system.

In the client-server mode, the Derby server is started with the startNetworkServer
script and ended with the stopNetworkServer script. They are located in the bin
subdirectory of the installation directory. 

## The JAR files

Inside the lib subdirectory of the installation directory, we can 
find several libraries. Each of the JAR files serves a specific function. 

$ ls lib
derbyclient.jar        derbyLocale_it.jar     derbyLocale_zh_TW.jar
derby.jar              derbyLocale_ja_JP.jar  derbynet.jar
derbyLocale_cs.jar     derbyLocale_ko_KR.jar  derbyoptionaltools.jar
derbyLocale_de_DE.jar  derbyLocale_pl.jar     derbyrun.jar
derbyLocale_es.jar     derbyLocale_pt_BR.jar  derbytools.jar
derbyLocale_fr.jar     derbyLocale_ru.jar     derby.war
derbyLocale_hu.jar     derbyLocale_zh_CN.jar

The derby.jar is  a library used for embedded databases. We need to 
have this JAR file in our classpath in embedded applications. In client-server mode, 
this library must be on the server. The derbynet.jar is used to start 
the Derby Network Server.
The derbyclient.jar is used by clients connecting to the Derby Network Server.
The derbytools.jar is used with Derby tools. The derbyrun.jar 
file is a special jar file that simplifies how we invoke the Derby tools and the Network Server.
Finally, there are some locale libraries. They are used to provide translated
messages. For example, the derbyLocale_cs.jar provides Czech messages. 

## The Derby schema

In database theory, a *schema* is a structure of a database. It is described
in a formal language (SQL). It refers to the organisation of data. The formal
definition of a database schema is a set of formulas called integrity constraints
imposed on a database. 

In Derby, a database schema has a narrower meaning. It is a container which is used to
logically group objects. It is similar to Java packages or C++ namespaces. 
A Derby database may have multiple schemas. We can create two tables with the same
names provided that they are placed in two different schemas. Derby default schema is APP. If 
we do not provide any schema, a database object is assigned to this default schema. 

A schema is created in Derby with CREATE SCHEMA statement. 
If we connect to a database, the user name that we have provided in the connection 
URL becomes the *current schema* of the connection. All database objects will
be created within this schema. The current schema can be changed
with the SET SCHEMA statement. There is another built-in schema called
SYS which is used to isolate system tables.

Derby has a tool called dblook which dumps a database and its schemas. The output of the
tool is the formal description of the database in DDL (data definition language). 

## The connection URL

After the driver is loaded, a connection to the database is created. A connection
is a session with a database. At the end of the work, the connection to the database
is closed. To establish a connection, we call the getConnection method
of the DriverManager class. 

The connection URL specifies the characteristics of a connection. 

jdbc:derby:[subsubprotocol:][databaseName][;attribute=value]*

The above is a syntax for a Derby database connection URL. The default
subprotocol is directory: and it is often omitted. We can work with
databases only in memory when we specify the memory: subprotocol.
The databaseName is the name of the database that we want to create and/or
connect to.

We can use several attributes in the connection URL. We can use attributes to
create a database, to connect to a secured database with a user name and a
password. Further we use the connection attributes to shut down a database or a
Derby system, to encrypt data or to restore a database from a backup. 

jdbc:derby:testdb
jdbc:derby://localhost:1527/testdb

We use different connection strings to connect to a embedded and to
client-server Derby system. The first connection string connects to an embedded
database the second one to the client-server database. The default port for
Derby is 1527.

jdbc:derby:testdb;create=true
jdbc:derby:testdb;shutdown=true
jdbc:derby:memory:testdb

We have another three connection strings. The first connection string creates
the testdb database. The second one shuts down the testdb database. The third
one connects to a testdb created in memory.

## SQL files

In the following two SQL files, cars.sql and authors_books.sql, 
we create three tables which we will use throughout this tutorial. 

cars.sql
  

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

The cars.sql file creates the CARS table. 

authors_books.sql
  

-- SQL for AUTHORS and BOOKS tables

SET SCHEMA USER12;

CREATE TABLE AUTHORS(ID BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
    (START WITH 1, INCREMENT BY 1), NAME VARCHAR(25));
CREATE TABLE BOOKS(ID BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY 
    (START WITH 1, INCREMENT BY 1), AUTHOR_ID BIGINT, TITLE VARCHAR(150), 
    FOREIGN KEY(AUTHOR_ID) REFERENCES AUTHORS(ID));

INSERT INTO AUTHORS(NAME) VALUES('Jack London');
INSERT INTO AUTHORS(NAME) VALUES('Honore de Balzac');
INSERT INTO AUTHORS(NAME) VALUES('Lion Feuchtwanger');
INSERT INTO AUTHORS(NAME) VALUES('Emile Zola');
INSERT INTO AUTHORS(NAME) VALUES('Truman Capote');

INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(1, 'Call of the Wild');
INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(1, 'Martin Eden');
INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(2, 'Old Goriot');
INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(2, 'Cousin Bette');
INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(3, 'Jew Suess');
INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(4, 'Nana');
INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(4, 'The Belly of Paris');
INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(5, 'In Cold blood');
INSERT INTO BOOKS(AUTHOR_ID, TITLE) VALUES(5, 'Breakfast at Tiffany');

The authors_books.sql file creates two tables: 
AUTHORS and BOOKS. 

## Sources

The following materials were used to create this tutorial: 
Derby Developer's Guide, Derby Server and Administration Guide, 
Getting Started with Derby, Derby Tools and Utilities Guide,
and Derby Reference Manual.

In the chapter, we have introduced the basic concepts of the Derby database. 

[Contents](..)
[Next](../install/)