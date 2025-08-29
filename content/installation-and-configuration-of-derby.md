+++
title = "Installation & configuration of Derby"
date = 2025-08-29T19:52:38.493+01:00
draft = false
description = "In this chapter of the Apache Derby tutorial, we cover the installation & configuration of Derby. We create a temporary database and a table within this database."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../derby/)
[Next](../tools/)

# Installation &amp; configuration of Derby

last modified July 6, 2020 

In the following pages, we will show how to install Derby and
will configure Derby to our needs. 

We download the latest version of Derby from
[db.apache.org/derby/](http://db.apache.org/derby/). 
We create an installation directory and unpack the compressed files
to this directory. 

$ wget http://tux.rainside.sk/apache//db/derby/db-derby-10.13.1.1/db-derby-10.13.1.1-bin.zip

With the wget tool, we download Derby version 10.13.1.

$ unzip db-derby-10.13.1.1-bin.zip 
$ cd db-derby-10.13.1.1-bin/

We unzip the archive and go the directory.

$ ls
bin   docs        javadoc  lib      NOTICE              test
demo  index.html  KEYS     LICENSE  RELEASE-NOTES.html

We list the contents of the installation directory. In the bin 
subdirectory, we have several Derby tools. The docs directory 
provides documentation for Derby, in HTML and PDF format. In the lib 
subdirectory there are various JAR files needed for working with Derby.

## The Java DB

Derby is included in the JDK since Java 6. Java DB is a supported version 
of Apache Derby and contains the same binaries as Apache Derby.

$ ls $JAVA_HOME/db
3RDPARTY  bin  lib  LICENSE  NOTICE  README-JDK.html  RELEASE-NOTES.html

In the JDK installation directory, we have a subdirectory called db, 
where we find the Java DB files. 

In the Overview section of the release notes we read the following:
Derby is a pure Java relational database engine using standard SQL 
and JDBC as its APIs.

Derby functionality includes:

    - Embedded engine with JDBC drivers

    - Network Server

    - Network client JDBC drivers

    Command line tools: ij (SQL scripting), dblook 
        (schema dump) and sysinfo (system info)

## Environment variables

Setting environment variables is optional. Using environment variables will make the
life easier for us.

$ export DERBY_HOME=~/bin/derby
$ export PATH=$PATH:~/bin/derby/bin
$ export DERBY_OPTS=-Dderby.system.home=/home/janbodnar/.derby

We set a DERBY_HOME variable to the Derby installation directory. 
Some tools may use this variable. Then we add a bin subdirectory 
to the PATH variable. This way we do not have to fully specify the 
path to the Derby tools. In the DERBY_OPTS environment variable 
we can set various Derby or Java related options. For example, we set the
derby.system.home property. 

$ java -jar $DERBY_HOME/lib/derbyrun.jar sysinfo
------------------ Java Information ------------------
Java Version:    1.8.0_111
Java Vendor:     Oracle Corporation
Java home:       /home/janbodnar/bin/jdk1.8.0_111/jre
Java classpath:  /home/janbodnar/bin/jdk1.8.0_111/db/lib/derbyrun.jar
OS name:         Linux
OS architecture: amd64
OS version:      4.4.0-66-generic
...

We use the derbyrun.jar file to execute the sysinfo 
tool to get some info about the Java and Derby. 

## Creating a database

Derby does not have a CREATE DATABASE statement like MySQL or Oracle.
We have to create a database by creating a connection and setting a connection
property create=true.

 -jar $DERBY_HOME/lib/derbyrun.jar ij

ij version 10.8
ij>
-->

```
$ $DERBY_HOME/bin/ij
ij version 10.11
ij&gt;

```

We start the ij tool. 

ij&gt; CONNECT 'jdbc:derby:tmpdb;user=tmpuser;create=true';

A tmpdb database is created inside the Derby system 
directory and a connection is made to the newly created database. 
The connection is created in the embedded mode. 

$ ls ~/.derby/
derby.log  testdb  tmpdb

The database is created in the Derby system directory.

ij&gt; CREATE TABLE FRIENDS(ID INT PRIMARY KEY, NAME VARCHAR(25));
0 rows inserted/updated/deleted
ij&gt; INSERT INTO FRIENDS(ID, NAME) VALUES(1, 'Jane');
1 row inserted/updated/deleted
ij&gt; INSERT INTO FRIENDS(ID, NAME) VALUES(2, 'Thomas');
1 row inserted/updated/deleted
ij&gt; INSERT INTO FRIENDS(ID, NAME) VALUES(3, 'Beky');
1 row inserted/updated/deleted

We create a FRIENDS table and add three rows to it. 

ij&gt; SELECT * FROM FRIENDS;
ID         |NAME                     
-------------------------------------
1          |Jane                     
2          |Thomas                   
3          |Beky                     

3 rows selected

We check the data. 

ij&gt; SHOW TABLES IN TMPUSER;
TABLE_SCHEM         |TABLE_NAME                    |REMARKS             
------------------------------------------------------------------------
TMPUSER             |FRIENDS                       |                    

1 row selected

When we created a connection, we have specified a user name. The user
name is the database schema, in which the FRIENDS table is created.

ij&gt; DISCONNECT;
ij&gt; SHOW CONNECTIONS;
No connections available.
ij&gt; EXIT;
$ 

We disconnect from the tmpdb database. The SHOW CONNECTIONS
statement informs that there are no open connections. We exit the ij
tool with the EXIT command. 

$ rm -rf ~/.derby/tmpdb/

We delete the database from the Derby system. Derby has no DROP DATABASE
statement. 

This is the end of the Derby tutorial chapter, in which we have installed and configured Derby.

[Contents](..)
[Previous](../derby/)
[Next](../tools/)