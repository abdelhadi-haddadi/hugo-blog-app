+++
title = "Derby security"
date = 2025-08-29T19:52:39.676+01:00
draft = false
description = "In this chapter of the Apache Derby tutorial, we cover security."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../jdbc/)
[Next](../tomcat/)

# Derby security

last modified July 6, 2020 

In the next chapter, we will mention security options with Derby.

There are two basic security concepts that we will briefly mention
in this chapter. The user authentication and user authorisation.
*User authentication* is verifying user credentials before giving
access to the Derby system. *User authorisation* is a means of
giving permissions to read and/or write to a Derby database. 

Furthermore, Derby allows to encrypt database files stored on the
disk. Derby network traffic may be encrypted with SSL/TLS cryptographic
protocols. 

## The Derby defaults

By default, Derby does not require user authentication. The user name
becomes the default schema in the program and the user password is
ignored. To enable authentication, we must modify the Derby properties.
The user authorisation is turned off. Also Derby does not have a database superuser. 

## The database owner

The database owner is the user that has created the database. 
If the database is created without supplying a user  
the database owner is set to the default authorisation identifier, APP. 
Controlling the database owner is important when we enable SQL authorisation.

## Database encryption

Derby provides a way for us to encrypt the data on disk.
The user who boots the database must provide a boot password.
A database can be encrypted at the moment of its creation. It is also possible
to encrypt an existing non-encrypted database. When we encrypt a 
database we must also specify a boot password, which is an alpha-numeric string 
used to generate the encryption key.

ij&gt; CONNECT 'jdbc:derby:testdb;create=true;dataEncryption=true;
bootPassword=3344kkllqq**';

We can encrypt the database, when we create it. We set the dataEncryption 
property to true and provide a boot password. Now every time the database is booted, 
we must provide the boot password. 

ij&gt; CONNECT 'jdbc:derby:testdb';
ERROR XJ040: Failed to start database 'testdb' with class loader 
sun.misc.Launcher$AppClassLoader@360be0, see the next exception for details.
ERROR XBM06: Startup failed. An encrypted database cannot be accessed without 
the correct boot password.

In the embedded mode, when we connect to the database, we also boot it. The Derby
shows the above error message, when we try to connect to an encrypted database without
the boot password. 

ij&gt; CONNECT 'jdbc:derby:testdb;bootPassword=3344kkllqq**';
ij&gt; SHOW CONNECTIONS;
CONNECTION0* -  jdbc:derby:testdb
* = current connection

With the correct boot password, we have successfully connected to the 
testdb database.

## Authentication

Authentication is restricting access to the proper users. Authentication
is turned off by default in Derby. 

Derby has three ways to provide authentication. 

    - External authentication with LDAP

    - Custom Java class

    - Built-in system

The official Derby documentation warns that the Derby's built-in 
authentication mechanism is suitable only for development and 
testing purposes. It is strongly recommended that production systems 
rely on LDAP or a user-defined class for authentication.

### Embedded

Authentication can be set at two levels. At a system level or at a
database level. 

ij&gt; CALL SYSCS_UTIL.SYSCS_SET_DATABASE_PROPERTY('derby.user.user12', '34klq*');
0 rows inserted/updated/deleted
ij&gt; CALL SYSCS_UTIL.SYSCS_SET_DATABASE_PROPERTY('derby.connection.requireAuthentication', 
'true');
0 rows inserted/updated/deleted

The above two statements enable user authentication for the currently connected
database at a database level. We have created a user with a password and have 
enabled the derby.connection.requireAuthentication property. 

ij&gt; CONNECT 'jdbc:derby:testdb';
ERROR 08004: Connection authentication failure occurred.  Reason: Invalid authentication..
ij&gt; CONNECT 'jdbc:derby:testdb;user=user12;password=34klq*';
ij&gt; SHOW CONNECTIONS;
CONNECTION0* -  jdbc:derby:testdb
* = current connection

After enabling user authentication, we must provide user credentials, when we
want to connect to the testdb database. 

### Client/Server

In the next examples, we will work with the Derby in the Client/Server mode.
We have an encrypted testdb database. 

$ startNetworkServer &amp;

The Derby server is started. 

ij&gt; CONNECT 'jdbc:derby://localhost:1527/dbs/testdb;bootPassword=3344kkllqq**';

When we connect to the testdb database for the first time, we must 
provide the boot password. It is because previously we have encrypted the 
testdb database. 

ij&gt; CONNECT 'jdbc:derby://localhost:1527/dbs/testdb';
ij&gt; SHOW CONNECTIONS;
CONNECTION0* -  jdbc:derby://localhost:1527/dbs/testdb
* = current connection

We do not need to boot the database in the Client/Server mode once it is 
already started. Unlike in the embedded mode, where each time we connect to the
database, we also boot it. 

In the next step, we are going to enable the user authentication in the Client/Server
mode. For this, we need to edit the derby.properties file. 

$ stopNetworkServer

First, we stop the Derby server if it is running. Note that after user authentication
was enabled we need to provide user credentials to stop the server. The 
stopNetworkServer script takes -user and -password options.

$ cat dbs/derby.properties 
derby.connection.requireAuthentication=true
derby.user.user12=34klq*
derby.authentication.provider=BUILTIN

In the Derby system directory, we modify the derby.properties file. 
If the file is not present, we create it. In the property file we  
enable the authentication and create a user with a password. We also
set the authentication provider to the Derby BUILTIN. 

$ startNetworkServer &amp;

We start the Derby server. 

$ java  -Dderby.system.home=/home/janbodnar/programming/derby/dbs \
-Dij.protocol=jdbc:derby: -jar $DERBY_HOME/lib/derbyrun.jar ij
ij version 10.8
ij&gt; 

We launch the ij tool. 

ij&gt; CONNECT 'jdbc:derby:testdb;bootPassword=3344kkllqq**';
ERROR 08004: Connection authentication failure occurred.  Reason: Invalid authentication..

We try to connect to the testdb database. Since the Derby server 
was restarted, we provide the boot password. However, we see an error message. 
This is because we have enabled user authentication. We must also provide user 
credentials. 

ij&gt; CONNECT 'jdbc:derby:testdb;user=user12;password=34klq*;
bootPassword=3344kkllqq**';

With this connection string, we have successfully connected to 
the testdb database. 

## User authorisation

User authorisation in Derby enables to grant and revoke permissions to access a system,
database, object or SQL action. We can set the user authorisation properties in 
Derby as system-level properties or database-level properties.

Derby has several properties that affect the user authorisation. 
The derby.database.defaultConnectionMode property controls the default 
access mode. If the property is not set, the property defaults to fullAccess, 
which is read-write access. The other two options are noAccess and 
readOnlyAccess. With the derby.database.fullAccessUsers 
and derby.database.readOnlyAccessUsers we control
which users can have read-write and which read-only access to a database. 
The derby.database.sqlAuthorization property enables SQL standard authorisation.
When the derby.database.sqlAuthorization property is set to true, object 
owners can use the GRANT and REVOKE SQL statements to set 
the user permissions for specific database objects or for specific SQL actions.

The privileges that we can grant or revoke are: DELETE, EXECUTE, 
INSERT, SELECT, REFERENCES, TRIGGER, and 
UPDATE. 

The access mode specified for the derby.database.defaultConnectionMode 
property overrides the permissions that are granted by the owner of a database object.

$ cat dbs/derby.properties 
derby.connection.requireAuthentication=true
derby.user.user12=34klq*
derby.user.user13=33kl33
derby.user.user14=14kl14
derby.user.user15=35rr++
derby.authentication.provider=BUILTIN
derby.database.defaultConnectionMode=readOnlyAccess
derby.database.fullAccessUsers=user12

We modify the derby.properties file. We add three users. One user,
user12 has full access to the database. The other three have the 
default, read-only access. 

export DERBY_OPTS=-Dderby.system.home=/home/janbodnar/programming/derby/dbs

Note that for the network server to know where the system directory with the 
derby.property is, we have set the DERBY_OPTS variable to contain the
derby system directory.

$ stopNetworkServer
$ startNetworkServer &amp;
$ java  -Dderby.system.home=/home/janbodnar/programming/derby/dbs \
-Dij.protocol=jdbc:derby: -jar $DERBY_HOME/lib/derbyrun.jar ij

We restart the network server and launch the ij tool.

ij&gt; CONNECT 'jdbc:derby://localhost/testdb;user=user13;
password=33kl33;bootPassword=3344kkllqq**';

We connect to the testdb database with the user13 
user. Since we are connecting to the database for the first time we also boot it. So
we need the boot password, because the database was previously encrypted. 

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

The user13 has permissions to see the data from the CARS table
located in the USER12 schema. 

ij&gt; INSERT INTO USER12.CARS VALUES(9, 'Toyota', 27000);
ERROR 25502: An SQL data change is not permitted for a read-only connection, 
user or database.

However, trying to modify data in the CARS table leads to an error. 
Permission is not granted to perform changes. 

ij&gt; DISCONNECT;
ij&gt; CONNECT 'jdbc:derby://localhost/testdb;user=user12;
password=34klq*';

We close the connection and connect as user12. This user was 
given full access in the properties file. Even if user12 is 
the owner of the database and owner of the CARS
table, he cannot modify the table unless given full access with the Derby properties.

ij&gt; INSERT INTO CARS VALUES(9, 'Toyota', 27000);
1 row inserted/updated/deleted
ij&gt; SELECT * FROM CARS WHERE ID = 9;
ID         |NAME                          |PRICE      
------------------------------------------------------
9          |Toyota                        |27000      

1 row selected

We have successfully added a new row into the CARS table. 

### SQL authorisation

The owner of the database or an object like table can further restrict permissions
to work with database objects. We can use GRANT and REVOKE 
statements to give or withdraw permissions. The owner of the database and table is 
the current user that has created them. Note that the 
derby.database.defaultConnectionMode overrides the permissions given by 
the GRANT statement. So if a user has readOnlyAccess
given by the default connection mode it cannot modify database objects even if he
was given permission by the GRANT statement. 

When the derby.database.sqlAuthorization property is set to true, object owners can use 
the GRANT and REVOKE SQL statements to set the user permissions for 
specific database objects or for specific SQL actions. Note that setting system-wide 
property in the derby.properties file is *effective only for new databases*.
For existing databases, we can only set database-wide derby.database.sqlAuthorization
property. After we set the derby.database.sqlAuthorization property to true, we cannot 
set the property back to false.

ij&gt; CALL SYSCS_UTIL.SYSCS_SET_DATABASE_PROPERTY('derby.database.sqlAuthorization', 
'true');

The derby.database.sqlAuthorization property has been set to true. 
The property is static. We must reboot the testdb database to make the 
property work. 

ij&gt; CONNECT 'jdbc:derby://localhost/testdb;shutdown=true;
user=user12;password=34klq*';

ij&gt; CONNECT 'jdbc:derby://localhost/testdb;user=user12;
password=34klq*;bootPassword=3344kkllqq**';

We shut down the testdb database and start it again.

ij(CONNECTION1)&gt; GRANT SELECT ON CARS TO user15;
0 rows inserted/updated/deleted

We provide SELECT privileges to user15 
on table CARS. 

ij(CONNECTION1)&gt; UPDATE CARS SET PRICE=27001 WHERE ID=9;
1 row inserted/updated/deleted

ij(CONNECTION1)&gt; SELECT * FROM CARS;
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
9          |Toyota                        |27001 

The user12 as the owner of the table has full privileges. The above
commands confirm that he has UPDATE and SELECT privileges 
on the CARS table.

ij(CONNECTION1)&gt; DISCONNECT;
ij&gt; CONNECT 'jdbc:derby://localhost/testdb;user=user14;
password=14kl14';
ij(CONNECTION1)&gt; SELECT * FROM USER12.CARS;
ERROR 42502: User 'USER14' does not have SELECT permission 
on column 'ID' of table 'USER12'.'CARS'.

We disconnect from the database and connect as user14. Trying to 
execute SELECT statement leads to an error. The user14 
does not have the privileges to SELECT data from the CARS table. 

ij(CONNECTION1)&gt; DISCONNECT;
ij&gt; CONNECT 'jdbc:derby://localhost/testdb;user=user15;
password=35rr++';

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
9          |Toyota                        |27000      

8 rows selected

Next we connect as user15. The user can select data from the 
CARS table. 

ij(CONNECTION1)&gt; SELECT * FROM USER12.AUTHORS;
ERROR 42502: User 'USER15' does not have SELECT 
permission on column 'ID' of table 'USER12'.'AUTHORS'.

But he cannot select data from the AUTHORS table. Permissions to 
select data from this table were not given by the table owner user12. 

ij(CONNECTION1)&gt; UPDATE USER12.CARS SET PRICE=27000 WHERE ID=9;
ERROR 25502: An SQL data change is not permitted for a read-only 
connection, user or database.

The user15 also has no UPDATE privileges on 
the CARS table. 

In the chapter, we dealt with security options in Derby.

[Contents](..)
[Previous](../jdbc/)
[Next](../tomcat/)