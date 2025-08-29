+++
title = "MySQL transactions"
date = 2025-08-29T20:03:49.816+01:00
draft = false
description = "In this part of the MySQL tutorial, we will mention transactions. A transaction is an atomic unit of database operations against the data in one or more databases."
image = ""
imageBig = ""
categories = ["mysql"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

[Contents](..)
[Previous](../views/)
[Next](../routines/)

# MySQL transactions

last modified January 10, 2023 

In this part of the MySQL tutorial, we will mention transactions.

## Definition of a transaction

A *transaction* is an atomic unit of database operations against the data
in one or more databases. The effects of all the SQL statements in a transaction
can be either all committed to the database or all rolled back.

MySQL supports several storage engines. The InnoDB is fully ACID compliant. The
ACID stands for Atomicity, Consistency, Isolation and Durability. Reliable 
transactions must support all these four properties. 

Operations within a transaction must be *atomic*. This means that either
all operations succeed or fail. This is all or nothing rule. 
The *consistency* property ensures that the database is in a consistent
state after the transaction is finished. The data is valid and there are no
half-finished records. For example there are no customers left with 
no payment records or there are no payment records without customers.
*Isolation* is the requirement that other operations cannot access data 
that has been modified during a transaction that has not yet completed. 
The question of isolation occurs in case of concurrent transactions.
Without isolation, the data may end up in inconsistent state. 
*Durability* is the ability of the database system to recover the 
committed transaction updates against any kind of system failure.

## Isolation levels

In a highly concurrent environment, highly isolated transactions may lead to 
deadlocks. A deadlock is a situation, where transactions compete over resources
and effectively prevent each other from accessing the resource. 
Furthermore there is a tradeoff between isolation level and performance of the
database. Therefore, database systems offer several levels of isolation for
transactions. 

MySQL offers four levels of transaction isolation:

  - Serializable

  - Repeatable read

  - Read committed

  - Read uncommitted

In the *serializable* isolation level all transactions occur in a completely
isolated fashion. All transactions are executed one after the other. In a
*repeatable read* isolation level statements cannot read data that has been 
modified but not yet committed by other transactions. No other transactions can modify 
data that has been read by the current transaction until the current transaction completes.
It is the default isolation level for InnoDB. In a *read committed* isolation level
statements cannot read data that has been modified but not committed by other transactions.
Statements wait until rows of data that are write-locked by other transactions are unlocked
before they acquire their own locks. This prevents them from reading dirty data.
In a *read uncommitted* isolation level, statements can read rows that have been 
modified by other transactions but not yet committed.

Phantom reads, non-repeatable reads and dirty reads are issues, which can be 
encountered, when the transactions are not completely separated.
A *phantom read* occurs when a transaction re-executes a query
returning a set of rows that satisfy a search condition and finds that 
the set of rows satisfying the condition has changed due to another 
recently-committed transaction. A *non-repeatable read* occurs when a 
transaction re-reads data it has previously read and finds that data has been 
modified by another transaction. That committed since the initial read.
A *dirty read* occurs when a transaction reads data from a row that
has been modified by another transaction, but not yet committed. 

The following table shows all isolation levels and possible issues encountered with 
them. 

 
   
    Isolation level 
    Phantom read
    Nonrepeatable read 
    Dirty read
   
   
    Serializable 
    Not possible     
    Not possible
    Not possible
   
   
    Repeatable read 
    Possible     
    Not possible
    Not possible
   
   
    Read committed 
    Possible     
    Possible
    Not possible
   
   
    Read uncommitted 
    Possible     
    Possible
    Possible
   
 

The default transaction isolation level for MySQL is repeatable read.

mysql&gt; SELECT @@tx_isolation;
+-----------------+
| @@tx_isolation  |
+-----------------+
| REPEATABLE-READ |
+-----------------+

The current isolation level is stored in the tx_isolation server
variable.

mysql&gt; SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

mysql&gt; SELECT @@tx_isolation;
+----------------+
| @@tx_isolation |
+----------------+
| SERIALIZABLE   |
+----------------+

We can change the isolation level with the SET TRANSACTION ISOLATION LEVEL
statement. 

## Autocommit

MySQL also automatically commits statements that are not part of a transaction. 
The results of any UPDATE or INSERT statement not preceded 
with a START will immediately be visible to all connections.

mysql&gt; SELECT @@autocommit;
+--------------+
| @@autocommit |
+--------------+
|            1 |
+--------------+

The autocommit variable is set by default. 

mysql&gt; SET autocommit=0;

mysql&gt; SELECT @@autocommit;
+--------------+
| @@autocommit |
+--------------+
|            0 |
+--------------+

The autocommit can be turned off.

Now we are going to demonstrate the autocommint variable. 

mysql&gt; SELECT @@autocommit;
+--------------+
| @@autocommit |
+--------------+
|            1 |
+--------------+

CREATE TABLE Test(Num INTEGER NOT NULL) engine=InnoDB;

The autocommit is set. We create a simple Test table with InnoDB 
storage engine, which supports transactions. 

mysql&gt; INSERT INTO Test VALUES (1), (2), (3);

mysql&gt; SELECT * FROM Test;
+-----+
| Num |
+-----+
|   1 |
|   2 |
|   3 |
+-----+

We insert three rows into the column of the table. The values are immediately 
committed. 

mysql&gt; SET autocommit=0;

mysql&gt; INSERT INTO Test VALUES (4), (5);

mysql&gt; SELECT * FROM Test;
+-----+
| Num |
+-----+
|   1 |
|   2 |
|   3 |
|   4 |
|   5 |
+-----+

Now we set the autocommit variable to false. We insert two values
and select all data from the table. We have now 5 rows in the table.

mysql&gt; ROLLBACK;

mysql&gt; SELECT * FROM Test;
+-----+
| Num |
+-----+
|   1 |
|   2 |
|   3 |
+-----+

However, the data is not permanently written to the table. With 
the ROLLBACK statement, we take them back. 

mysql&gt; INSERT INTO Test VALUES (4), (5);

mysql&gt; COMMIT;

mysql&gt; ROLLBACK;

mysql&gt; SELECT * FROM Test;
+-----+
| Num |
+-----+
|   1 |
|   2 |
|   3 |
|   4 |
|   5 |
+-----+

Now we insert values 4, 5 again. This time, the rows are committed
with the COMMIT statement. Subsequent rollback statement
has no effect. 

## Starting transactions

With autocommit enabled, each single SQL statement is wrapped automatically
in its own transaction. To start our own transaction, we issue the 
START TRANSACTION statement. The transaction is later finished
with the COMMIT or ROLLBACK statements. Multiple
statements may be issued in the body of the transaction. All are either committed 
or rolled back as one unit. 

mysql&gt; TRUNCATE Test;
Query OK, 0 rows affected (0.02 sec)

mysql&gt; SELECT * FROM Test;
Empty set (0.00 sec)

We will work with the same Test table. We truncate the data in the table. 

mysql&gt; START TRANSACTION;

mysql&gt; INSERT INTO Test VALUES (1), (2);

mysql&gt; INSERT INTO Test VALUES (3), (4);

mysql&gt; SELECT * FROM Test;
+-----+
| Num |
+-----+
|   1 |
|   2 |
|   3 |
|   4 |
+-----+

In the above code, we start a transaction and insert four rows into 
the table. The values are not yet committed. From the current connection
the rows are visible. 

$ mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 65
Server version: 5.1.41-3ubuntu12.9 (Ubuntu)

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql&gt; SELECT * FROM mydb.Test;
Empty set (0.00 sec)

However, from a different connection, the Test table is empty. We launch a new
instance of a mysql client program. This is a different connection 
to the MySQL database. From this connection, the values are not yet visible. 

mysql&gt; COMMIT;

Finally, the COMMIT statement commits the data to the table.
The rows are visible from both connections. 

We start another transaction. This time the data will be rolled back.

mysql&gt; START TRANSACTION;

mysql&gt; INSERT INTO Test VALUES (5), (6);

mysql&gt; INSERT INTO Test VALUES (7), (8);

mysql&gt; ROLLBACK;

mysql&gt; SELECT * FROM Test;
+-----+
| Num |
+-----+
|   1 |
|   2 |
|   3 |
|   4 |
+-----+

In the above SQL code, we start a new transaction. We insert four values
into the Test table. We roll the changes back with the ROLLBACK
statement. Subsequent select from the table shows that the data was not 
committed to the table. 

In this part of the MySQL tutorial, we have worked with transactions.

[Contents](..) 
[Previous](../views/)
[Next](../routines/)