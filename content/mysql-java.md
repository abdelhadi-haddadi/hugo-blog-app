+++
title = "MySQL Java"
date = 2025-08-29T19:52:46.910+01:00
draft = false
description = "This is MySQL Java tutorial. This tutorial covers the basics of MySQL programming in Java with JDBC."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# MySQL Java

last modified July 6, 2020 

This is a Java tutorial for the MySQL database. It covers the basics of 
MySQL programming in Java with JDBC. ZetCode has a complete *e-book* for MySQL Java:
[MySQL Java programming e-book](/ebooks/mysqljava/).

In this tutorial, we use the 
*MySQL Connector/J* driver. It is the official JDBC driver for MySQL.
The examples were created and tested on Ubuntu Linux. You might also want
to check [Java tutorial](/lang/java/), 
[Java PostgreSQL tutorial](/java/postgresql/),
[MySQL tutorial](/mysql/), or 
[Spring JdbcTemplate tutorial](/db/jdbctemplate/) on ZetCode.

## JDBC

*JDBC* is an API for the Java programming language that defines how a 
client may access a database. It provides methods for querying and updating 
data in a database. JDBC is oriented towards relational databases. 
From a technical point of view, the API is as a set of classes in the java.sql package.
To use JDBC with a particular database, we need a JDBC driver for that database.

JDBC is a cornerstone for database programming in Java. Today, it
is considered to be very low-level and prone to errors. Solutions
such as MyBatis or JdbcTemplate were created to ease the burden of
JDBC programming. However, under the hood, these solutions still use JDBC.
JDBC is part of the Java Standard Edition platform.

JDBC manages these three main programming activities:

    - connecting to a database;

    - sending queries and update statements to the database;

    retrieving and processing the results received from the database in answer to
    the query.

## MySQL Connector/J

To connect to MySQL in Java, MySQL provides MySQL Connector/J, a driver 
that implements the JDBC API. MySQL Connector/J is a JDBC Type 4 driver. 
The Type 4 designation means that the driver is a pure Java 
implementation of the MySQL protocol and does not rely on the 
MySQL client libraries. In this tutorial, we use MySQL Connector/J 5.1.41, 
which is a maintenance release of the 5.1 production branch.

## Connection string

A database connection is defined with a connection string. It contains 
information such as database type, database name, server
name, and port number. It also may contain additional key/value
pairs for configuration. Each database has its own connection string
format.

The following is a syntax of a MySQL connection string:

jdbc:mysql://[host1][:port1][,[host2][:port2]]...[/[database]] 
    [?propertyName1=propertyValue1[&amp;propertyName2=propertyValue2]...]

It is possible to specify multiple hosts for a server failover setup.
The items in square brackets are optional. If no host is specified, 
the host name defaults to localhost. If the port for a host is not 
specified, it defaults to 3306, the default port number for MySQL servers.

jdbc:mysql://localhost:3306/testdb?useSSL=false

This is an example of a MySQL connection string. 
The jdbc:mysql:// is known
as a sub-protocol and is constant for MySQL. We connect to the 
localhost on MySQL standard port 3306. The database name
is testdb. The additional key/value pairs follow the 
question mark character (?). The useSSL=false tells MySQL 
that there will be no secure connection.

## About MySQL database

MySQL is a leading open source database management system. It is a multi user, 
multithreaded database management system. MySQL is especially popular on the web. 
It is one part of the very popular *LAMP* platform consisting of Linux, Apache, 
MySQL, and PHP. Currently MySQL is owned by Oracle. MySQL database is available on 
most important OS platforms. It runs on BSD Unix, Linux, Windows, or Mac OS.
Wikipedia and YouTube use MySQL. These sites manage millions of queries
each day. MySQL comes in two versions: MySQL server system and MySQL
embedded system.

## Setting up MySQL

In this section, we are going to install MySQL server, create a testdb
database, and a test user.

$ sudo apt-get install mysql-server

This command installs the MySQL server and various other packages. 
While installing the package, we are prompted to enter a password 
for the MySQL root account.

Next, we are going to create a new database user and a new database. 
We use the mysql client.

$ sudo service mysql status
mysql start/running, process 5129

We check if the MySQL server is running. If not, we need
to start the server. On Ubuntu Linux, this can be done
with the sudo service mysql start command. 

$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 43
Server version: 5.7.21-0ubuntu0.16.04.1 (Ubuntu)

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql&gt; SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema | 
| mysql              | 
+--------------------+
2 rows in set (0.00 sec)

We use the *mysql monitor* client application to connect to the 
server. We connect to the database using the root account. We show all available
databases with the SHOW DATABASES statement. 

mysql&gt; CREATE DATABASE testdb;
Query OK, 1 row affected (0.02 sec)

We create a new testdb database. We will use this database throughout 
the tutorial.

mysql&gt; CREATE USER 'testuser'@'localhost' IDENTIFIED BY 'test623';
Query OK, 0 rows affected (0.00 sec)

mysql&gt; USE testdb;
Database changed

mysql&gt; GRANT ALL ON testdb.* TO 'testuser'@'localhost';
Query OK, 0 rows affected (0.00 sec)

mysql&gt; quit;
Bye

We create a new database user. We grant all privileges to this user
for all tables of the testdb database. 

## Maven file

We use the following Maven file:

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;AppName&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;5.1.45&lt;/version&gt;
        &lt;/dependency&gt;    
    &lt;/dependencies&gt;
        
    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
                &lt;artifactId&gt;exec-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;1.6.0&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;mainClass&gt;com.zetcode.AppName&lt;/mainClass&gt;
                    &lt;cleanupDaemonThreads&gt;false&lt;/cleanupDaemonThreads&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;             

    &lt;name&gt;AppName&lt;/name&gt;
&lt;/project&gt;

The POM file has a dependency for the MySQL driver. We also include the exec-maven-plugin
for executing Java programs from Maven. Between the &lt;mainClass&gt;&lt;/mainClass&gt; tags
we provide the full name of the application.

## Java MySQL version

If the following program runs OK, then we have everything
installed OK. We check the version of the MySQL server. 

JdbcMySQLVersion.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcMySQLVersion {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";
        
        String query = "SELECT VERSION()";

        try (Connection con = DriverManager.getConnection(url, user, password);
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery(query)) {

            if (rs.next()) {
                
                System.out.println(rs.getString(1));
            }

        } catch (SQLException ex) {
            
            Logger lgr = Logger.getLogger(JdbcMySQLVersion.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        } 
    }
}

We connect to the database and get some info about the MySQL server.

String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";

This is the connection URL for the MySQL database. Each driver
has a different syntax for the URL. In our case, we provide a 
host, a port, and a database name. 

try (Connection con = DriverManager.getConnection(url, user, password);
    Statement st = con.createStatement();
    ResultSet rs = st.executeQuery(query)) {

We establish a connection to the database, using the connection URL,
user name, and password. The connection is established with the 
getConnection method.

The createStatement method of the connection
object creates a Statement object for sending SQL 
statements to the database.

The executeQuery method of the connection
object executes the given SQL statement, which returns a single ResultSet object.
The ResultSet is a table of data returned by a specific SQL statement. 

The try-with-resources syntax ensures that the resources are cleaned up
in the end.

if (result.next()) {

    System.out.println(result.getString(1));
}

A ResultSet object maintains a cursor pointing to its current row of data. 
Initially the cursor is positioned before the first row. The next
method moves the cursor to the next row. If there are no rows left, the method
returns false. The getString method retrieves the value 
of a specified column. The first column has index 1. 

} catch (SQLException ex) {
    
    Logger lgr = Logger.getLogger(JdbcMySQLVersion.class.getName());
    lgr.log(Level.SEVERE, ex.getMessage(), ex);
} 

In case of an exception, we log the error message. For this console
example, the message is displayed in the terminal. 

$ mvn exec:java -q
5.7.21-0ubuntu0.16.04.1

We run the program from the command line. The Manen's -q option runs Maven
in quiet mode; i.e. we only see error messages. 

## Creating and populating tables

Next we are going to create database tables and fill them
with data. These tables will be used throughout this tutorial.  

mysql_tables.sql
  

USE testdb;

DROP TABLE IF EXISTS Books, Authors, Testing, Images;

CREATE TABLE Authors(Id BIGINT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(100));
CREATE TABLE Books(Id BIGINT PRIMARY KEY AUTO_INCREMENT, AuthorId BIGINT, 
    Title VARCHAR(100), FOREIGN KEY(AuthorId) REFERENCES Authors(Id) 
    ON DELETE CASCADE);
CREATE TABLE Testing(Id INT);
CREATE TABLE Images(Id INT PRIMARY KEY AUTO_INCREMENT, Data MEDIUMBLOB);

INSERT INTO Authors(Id, Name) VALUES(1, 'Jack London');
INSERT INTO Authors(Id, Name) VALUES(2, 'Honore de Balzac');
INSERT INTO Authors(Id, Name) VALUES(3, 'Lion Feuchtwanger');
INSERT INTO Authors(Id, Name) VALUES(4, 'Emile Zola');
INSERT INTO Authors(Id, Name) VALUES(5, 'Truman Capote');

INSERT INTO Books(Id, AuthorId, Title) VALUES(1, 1, 'Call of the Wild');
INSERT INTO Books(Id, AuthorId, Title) VALUES(2, 1, 'Martin Eden');
INSERT INTO Books(Id, AuthorId, Title) VALUES(3, 2, 'Old Goriot');
INSERT INTO Books(Id, AuthorId, Title) VALUES(4, 2, 'Cousin Bette');
INSERT INTO Books(Id, AuthorId, Title) VALUES(5, 3, 'Jew Suess');
INSERT INTO Books(Id, AuthorId, Title) VALUES(6, 4, 'Nana');
INSERT INTO Books(Id, AuthorId, Title) VALUES(7, 4, 'The Belly of Paris');
INSERT INTO Books(Id, AuthorId, Title) VALUES(8, 5, 'In Cold blood');
INSERT INTO Books(Id, AuthorId, Title) VALUES(9, 5, 'Breakfast at Tiffany');

The SQL commands create four database tables: Authors, 
Books, Testing, and Images. The tables are 
of InnoDB type. InnoDB databases support foreign key constraints and
transactions. We place a foreign key constraint on the AuthorId 
column of the Books table. We fill the Authors and Books 
tables with initial data. 

mysql&gt; source mysql_tables.sql
Query OK, 0 rows affected (0.07 sec)
Query OK, 0 rows affected (0.12 sec)
Query OK, 1 row affected (0.04 sec)
...

We use the source command to execute the tables.sql script.

## Java MySQL prepared statements

Now we will concern ourselves with prepared statements. 
When we write prepared statements, we use placeholders instead 
of directly writing the values into the statements. 
Prepared statements increase security and performance.

In Java a PreparedStatement is an object
which represents a precompiled SQL statement. 

JdbcPrepared.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcPrepared {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";
        
        String author = "Trygve Gulbranssen";
        String sql = "INSERT INTO Authors(Name) VALUES(?)";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(sql)) {

            pst.setString(1, author);
            pst.executeUpdate();
            
            System.out.println("A new author has been inserted");

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JdbcPrepared.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);

        }
    }
}

We add a new author to the Authors table. 

try (Connection con = DriverManager.getConnection(url, user, password);
        PreparedStatement pst = con.prepareStatement(sql)) {

Here we create a prepared statement. When we write prepared statements, we use 
placeholders instead of directly writing the values into the statements. 
Prepared statements are faster and guard against SQL injection attacks. 
The ? is a placeholder which is going to be filled later. 

pst.setString(1, author);

A value is bound to the placeholder. 

pst.executeUpdate();

The prepared statement is executed. We use the executeUpdate
method of the statement object when we don't expect any data to be returned. 
This is when we create databases or execute INSERT, UPDATE, 
DELETE statements. 

$ mvn exec:java -q
A new author has been inserted
mysql&gt; select * from Authors;
+----+--------------------+
| Id | Name               |
+----+--------------------+
|  1 | Jack London        |
|  2 | Honore de Balzac   |
|  3 | Lion Feuchtwanger  |
|  4 | Emile Zola         |
|  5 | Truman Capote      |
|  6 | Trygve Gulbranssen |
+----+--------------------+
6 rows in set (0.00 sec)

We have a new author inserted into the table. 

## Testing MySQL prepared and not prepared statements

For the following two examples, we will use the Testing
table. We will execute a normal statement and a prepared
statement 5000 times. We check if there is some difference
in execution time. 

JdbcNotPreparedTesting.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcNotPreparedTesting {

    public static void main(String[] args) {

        String cs = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        try (Connection con = DriverManager.getConnection(cs, user, password);
                Statement st = con.createStatement()) {

            for (int i = 1; i &lt;= 5000; i++) {

                String sql = "INSERT INTO Testing(Id) VALUES(" + 2 * i + ")";
                st.executeUpdate(sql);
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JdbcNotPreparedTesting.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

The first example uses the normal Statement object. 

for (int i = 1; i &lt;= 5000; i++) {

    String sql = "INSERT INTO Testing(Id) VALUES(" + 2 * i + ")";
    st.executeUpdate(sql);
}

We build the query and execute it 5000 times. 

$ time mvn exec:java -q

real    4m14.716s
user    0m6.820s
sys     0m0.404s

It 4.14 minutes to finish the 5000 inserts.

JdbcPreparedTesting.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcPreparedTesting {

    public static void main(String[] args) {

        String cs = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        String sql = "INSERT INTO Testing(Id) VALUES(?)";

        try (Connection con = DriverManager.getConnection(cs, user, password);
                PreparedStatement pst = con.prepareStatement(sql)) {

            for (int i = 1; i &lt;= 5000; i++) {

                pst.setInt(1, i * 2);
                pst.executeUpdate();
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JdbcPreparedTesting.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

Now we use the PreparedStatement to do the same task.

try (Connection con = DriverManager.getConnection(cs, user, password);
        PreparedStatement pst = con.prepareStatement(sql)) {

We create the prepared statement using the prepareStatement
method. 

for (int i = 1; i &lt;= 5000; i++) {

    pst.setInt(1, i * 2);
    pst.executeUpdate();
}

We bind a value to the prepared statement, execute it in a loop
thousand times.

$ time mvn exec:java -q

real    3m53.962s
user    0m6.280s
sys     0m0.380s

Now it took 3.53 minutes to finish the 5000 inserts. We saved 20 seconds.

## Java MySQL retrieving data

Next we will show how to retrieve data from a database table.
We get all data from the Authors table. 

JdbcRetrieve.java
  

package com.zetcode;

import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcRetrieve {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";
        
        String query = "SELECT * FROM Authors";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {

                System.out.print(rs.getInt(1));
                System.out.print(": ");
                System.out.println(rs.getString(2));
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JdbcRetrieve.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We get all authors from the Authors table and print them to 
the console. 

String query = "SELECT * FROM Authors";

try (Connection con = DriverManager.getConnection(url, user, password);
        PreparedStatement pst = con.prepareStatement(query);
        ResultSet rs = pst.executeQuery()) {

We execute a query that selects all columns from the Authors table.
We use the executeQuery method. The method executes the given 
SQL statement, which returns a single ResultSet object. 
The ResultSet is the data table returned by the SQL query.

while (rs.next()) {

      System.out.print(rs.getInt(1));
      System.out.print(": ");
      System.out.println(rs.getString(2));
}

The next method advances the cursor to the next record.
It returns false when there are no more rows in the result set. 
The getInt and getString methods 
retrieve the value of the designated column in the current row of this 
ResultSet object as an int and String 
of the Java programming language.

$ mvn exec:java -q
1: Jack London
2: Honore de Balzac
3: Lion Feuchtwanger
4: Emile Zola
5: Truman Capote
6: Trygve Gulbranssen

We execute the program; we have IDs and names of authors printed to the console. 

## Properties

It is a common practice to put the configuration data outside the
program in a separate file. This way the programmers are more 
flexible. We can change the user, a password or a connection url
without needing to recompile the program. It is especially useful
in a dynamic environment, where is a need for a lot of testing,
debugging, securing data etc.

In Java, the Properties is a class used
often for this. The class is used for easy reading and saving
of key/value properties. 

db.properties
  

db.url=jdbc:mysql://localhost:3306/testdb?useSSL=false
db.user=testuser
db.passwd=test623

We have a db.properties file in which we have three
key/value pairs. These are dynamically loaded during the execution
of the program.

JdbcProperties.java
  

package com.zetcode;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcProperties {

    private static Properties getConnectionData() {

        Properties props = new Properties();

        String fileName = "src/main/resources/db.properties";

        try (FileInputStream in = new FileInputStream(fileName)) {
            props.load(in);
        } catch (IOException ex) {
            Logger lgr = Logger.getLogger(JdbcProperties.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }

        return props;
    }

    public static void main(String[] args) {

        Properties props = getConnectionData();

        String url = props.getProperty("db.url");
        String user = props.getProperty("db.user");
        String passwd = props.getProperty("db.passwd");
        
        String query = "SELECT * FROM Authors";

        try (Connection con = DriverManager.getConnection(url, user, passwd);
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {

                System.out.print(rs.getInt(1));
                System.out.print(": ");
                System.out.println(rs.getString(2));
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JdbcProperties.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We connect to the testdb database and print the contents of the 
Authors table to the console. This time, we load the connection 
properties from a file. They are not hard coded in the proram. 

Properties props = new Properties();

String fileName = "src/main/resources/db.properties";

try (FileInputStream in = new FileInputStream(fileName)) {
    props.load(in);
} catch (IOException ex) {
    Logger lgr = Logger.getLogger(JdbcProperties.class.getName());
    lgr.log(Level.SEVERE, ex.getMessage(), ex);
}

The Properties class is created. The data is loaded
from the file called db.properties, where we have our configuration
data.

String url = props.getProperty("db.url");
String user = props.getProperty("db.user");
String passwd = props.getProperty("db.passwd");

The values are retrieved with the getProperty
method. 

## Java MySQL datasource

In this example, we connect to the database using a data source. The usage of a data 
source improves application's performance and scalability. Using a  datasource has several 
advantages over the DriverManager: increased portability, connection pooling, 
and distributed transactions.

The MysqlDataSource is a class for creating datasources.

db.properties
  

# mysql properties
mysql.driver=com.mysql.jdbc.Driver
mysql.url=jdbc:mysql://localhost:3306/testdb?useSSL=false
mysql.username=testuser
mysql.password=test623

The are the properties for the MySQL database.

ComLineDSEx.java
  

package com.zetcode;

import com.mysql.jdbc.jdbc2.optional.MysqlDataSource;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.PreparedStatement;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class ComLineDSEx {

    public static MysqlDataSource getMySQLDataSource() {

        Properties props = new Properties();

        String fileName = "src/main/resources/db.properties";

        try (FileInputStream fis = new FileInputStream(fileName)) {
            props.load(fis);
        } catch (IOException ex) {
            Logger lgr = Logger.getLogger(ComLineDSEx.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }

        MysqlDataSource ds = new MysqlDataSource();
        ds.setURL(props.getProperty("mysql.url"));
        ds.setUser(props.getProperty("mysql.username"));
        ds.setPassword(props.getProperty("mysql.password"));

        return ds;
    }

    public static void main(String[] args) {

        MysqlDataSource ds = getMySQLDataSource();

        String query = "SELECT VERSION()";

        try (Connection con = ds.getConnection();
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet rs = pst.executeQuery()) {

            if (rs.next()) {

                String version = rs.getString(1);
                System.out.println(version);
            }
        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(ComLineDSEx.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In this example, we connect to the database using a datasource.

String fileName = "src/main/resources/db.properties";

try (FileInputStream fis = new FileInputStream(fileName)) {
    props.load(fis);
} catch (IOException ex) {
    Logger lgr = Logger.getLogger(ComLineDSEx.class.getName());
    lgr.log(Level.SEVERE, ex.getMessage(), ex);
}

The database properties are read from the db.properties file.

MysqlDataSource ds = new MysqlDataSource();
ds.setURL(props.getProperty("mysql.url"));
ds.setUser(props.getProperty("mysql.username"));
ds.setPassword(props.getProperty("mysql.password"));

A MysqlDataSource is created and the datasource properties are set.

try (Connection con = ds.getConnection();
        PreparedStatement pst = con.prepareStatement(query);
        ResultSet rs = pst.executeQuery()) {

A connection object is created from the datasource.

## Java MySQL multiple statements

It is possible to execute multiple SQL statements in one query.
The allowMultiQueries must be set to enable multiple
statements in MySQL. 

JdbcMulStat.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class JdbcMulStat {

    public static void main(String[] args) throws SQLException {

        String cs = "jdbc:mysql://localhost:3306/"
                + "testdb?allowMultiQueries=true&amp;useSSL=false";
        String user = "testuser";
        String password = "test623";

        String query = "SELECT Id, Name FROM Authors WHERE Id=1;"
                + "SELECT Id, Name FROM Authors WHERE Id=2;"
                + "SELECT Id, Name FROM Authors WHERE Id=3";

        try (Connection con = DriverManager.getConnection(cs, user, password);
                PreparedStatement pst = con.prepareStatement(query);) {

            boolean isResult = pst.execute();

            do {
                try (ResultSet rs = pst.getResultSet()) {

                    while (rs.next()) {

                        System.out.print(rs.getInt(1));
                        System.out.print(": ");
                        System.out.println(rs.getString(2));
                    }

                    isResult = pst.getMoreResults();
                }

            } while (isResult);
        }
    }
}

In the code example, we retrieve three rows from the Authors table. 
We use three SELECT statements to get three rows. 

String cs = "jdbc:mysql://localhost:3306/"
        + "testdb?allowMultiQueries=true&amp;useSSL=false";

We enable multiple statements queries in the database URL by setting
the allowMultiQueries parameter to true. 

String query = "SELECT Id, Name FROM Authors WHERE Id=1;"
        + "SELECT Id, Name FROM Authors WHERE Id=2;"
        + "SELECT Id, Name FROM Authors WHERE Id=3";

Here we have a query with multiple statements. The statements are separated
by a semicolon. 

boolean isResult = pst.execute();

We call the execute method of the prepared statement
object. The method returns a boolean value indicating if the first result
is a ResultSet object. Subsequent results are called using
the getMoreResults method. 

do {
    try (ResultSet rs = pst.getResultSet()) {

        while (rs.next()) {

            System.out.print(rs.getInt(1));
            System.out.print(": ");
            System.out.println(rs.getString(2));
        }

        isResult = pst.getMoreResults();
    }

} while (isResult);

The processing of the results is done inside the do while loop. 
The ResultSet is retrieved with the getResultSet
method call. To find out if there are other results, we call the 
getMoreResults method. 

$ mvn exec:java -q
1: Jack London
2: Honore de Balzac
3: Lion Feuchtwanger

This is the output of the example. The first three rows were retrieved from the
Authors table. 

## Java MySQL column headers

The following example shows how to print column headers with the data
from the database table. We refer to column names as MetaData. 
MetaData is data about the core data in the database.

JdbcColumnHeaders.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcColumnHeaders {

    public static void main(String[] args) {

        String cs = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        String query = "SELECT Name, Title From Authors, "
                + "Books WHERE Authors.Id=Books.AuthorId";

        try (Connection con = DriverManager.getConnection(cs, user, password);
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet rs = pst.executeQuery()) {

            ResultSetMetaData meta = rs.getMetaData();

            String colname1 = meta.getColumnName(1);
            String colname2 = meta.getColumnName(2);

            String header = String.format("%-21s%s", colname1, colname2);
            System.out.println(header);

            while (rs.next()) {

                String row = String.format("%-21s", rs.getString(1));
                System.out.print(row);
                System.out.println(rs.getString(2));
            }
        } catch (SQLException ex) {
            
            Logger lgr = Logger.getLogger(JdbcColumnHeaders.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In this program, we select authors from the Authors table
and their books from the Books table. We print the names 
of the columns returned in the result set. The output is formatted.

String query = "SELECT Name, Title From Authors, " +
    "Books WHERE Authors.Id=Books.AuthorId";

This is the SQL statement which joins authors with their
books. 

ResultSetMetaData meta = rs.getMetaData();

To get the column names we need to get the ResultSetMetaData.
It is an object that can be used to get information about the types and properties 
of the columns in a ResultSet object. 

String colname1 = meta.getColumnName(1);
String colname2 = meta.getColumnName(2);

From the obtained metadata, we get the column names. 

String header = String.format("%-21s%s", colname1, colname2);
System.out.println(header);

We print the column names to the console. 

while (rs.next()) {

    String row = String.format("%-21s", rs.getString(1));
    System.out.print(row);
    System.out.println(rs.getString(2));
}

We print the data to the console. The first column is 21 characters wide 
and is aligned to the left. 

$ mvn exec:java -q
NAME                 Title
Jack London          Call of the Wild
Jack London          Martin Eden
Honore de Balzac     Old Goriot
Honore de Balzac     Cousin Bette
Lion Feuchtwanger    Jew Suess
Emile Zola           Nana
Emile Zola           The Belly of Paris
Truman Capote        In Cold blood
Truman Capote        Breakfast at Tiffany

This is the output of the program. 

## MySQL Java auto-generated keys

MySQL's AUTO_INCREMENT attribute generates a unique ID 
for new rows. The following example shows how we can use JDBC to retrieve 
an auto-generated key value.

JdbcAutoGenKey.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcAutoGenKey {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        String author = "Oscar Wilde";
        String sql = "INSERT INTO Authors(Name) VALUES(?)";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(sql,
                        Statement.RETURN_GENERATED_KEYS)) {

            pst.setString(1, author);
            pst.executeUpdate();

            try (ResultSet rs = pst.getGeneratedKeys()) {

                if (rs.first()) {

                    System.out.printf("The ID of new author: %d", rs.getLong(1));
                }
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JdbcAutoGenKey.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In the example, we add a new author to a table that has its primary key
auto-incremented by MySQL. We retrieve the generated ID.

try (Connection con = DriverManager.getConnection(url, user, password);
        PreparedStatement pst = con.prepareStatement(sql,
                Statement.RETURN_GENERATED_KEYS)) {

As the first step, we have to pass the Statement.RETURN_GENERATED_KEYS
to the prepareStatement method. 

try (ResultSet rs = pst.getGeneratedKeys()) {

Then we retrieve the generated key(s) with the getGeneratedKeys method.

if (rs.first()) {
    
    System.out.printf("The ID of new author: %d", rs.getLong(1));
}

Since we have only one insert statement, we use first
to navigate to the value.

$ mvn exec:java -q
The ID of new author: 7

This is a sample output.

## MySQL Java writing images

Some people prefer to put their images into the database, some prefer to keep them 
on the file system for their applications. Technical difficulties arise when we 
work with lots of images. Images are binary data. MySQL database has a special 
data type to store binary data called BLOB (Binary Large Object). 

For this example, we use the Images table.

JdbcWriteImage.java
  

package com.zetcode;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcWriteImage {

    public static void main(String[] args) {

        String cs = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        String sql = "INSERT INTO Images(Data) VALUES(?)";

        try (Connection con = DriverManager.getConnection(cs, user, password);
                PreparedStatement pst = con.prepareStatement(sql)) {

            File myFile = new File("src/main/resources/tree.png");

            try (FileInputStream fin = new FileInputStream(myFile)) {

                pst.setBinaryStream(1, fin, (int) myFile.length());
                pst.executeUpdate();
                
            } catch (IOException ex) {
                
                Logger lgr = Logger.getLogger(JdbcWriteImage.class.getName());
                lgr.log(Level.SEVERE, ex.getMessage(), ex);
            }
        } catch (SQLException ex) {
            
            Logger lgr = Logger.getLogger(JdbcWriteImage.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In the preceding example, we read a PNG image from the current
working directory and insert in into the Images table. 

String sql = "INSERT INTO Images(Data) VALUES(?)";

This is the SQL to insert an image. 

File myFile = new File("src/main/resources/tree.png");

try (FileInputStream fin = new FileInputStream(myFile)) {

We create a File object for the image file. To 
read bytes from this file, we create a FileInputStream
object. 

pst.setBinaryStream(1, fin, (int) myFile.length());

The binary stream is set to the prepared statement. The parameters of
the setBinaryStream method are the parameter
index to bind, the input stream, and the number of bytes in the stream.

pst.executeUpdate();

We execute the statement. 

## MySQL Java reading images

In the previous example, we have inserted an image into the database 
table. Now we are going to read the image back from the table. 

JdbcReadImage.java
  

package com.zetcode;

import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcReadImage {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        String query = "SELECT Data FROM Images LIMIT 1";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet result = pst.executeQuery()) {

            if (result.next()) {

                String fileName = "src/main/resources/tree.png";
                
                try (FileOutputStream fos = new FileOutputStream(fileName)) {

                    Blob blob = result.getBlob("Data");
                    int len = (int) blob.length();

                    byte[] buf = blob.getBytes(1, len);

                    fos.write(buf, 0, len);
                    
                } catch (IOException ex) {
                
                    Logger lgr = Logger.getLogger(JdbcReadImage.class.getName());
                    lgr.log(Level.SEVERE, ex.getMessage(), ex);
                }
            }
        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JdbcReadImage.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We read one image from the Images table. 

String query = "SELECT Data FROM Images LIMIT 1";

We select one record from the table. 

String fileName = "src/main/resources/tree.png";

try (FileOutputStream fos = new FileOutputStream(fileName)) {

The FileOutputStream object is created
to write to a file. It is meant for writing streams of raw 
bytes such as image data.

Blob blob = result.getBlob("Data");

We get the image data from the Data column by calling
the getBlob method. 

int len = (int) blob.length();

We figure out the length of the blob data. In other words,
we get the number of bytes. 

byte[] buf = blob.getBytes(1, len);

The getBytes method retrieves 
all bytes of the Blob object, as an array of bytes.

fos.write(buf, 0, len);

The bytes are written to the output stream. The image is created
on the filesystem. 

## Transaction support

A transaction is an atomic unit of database operations 
against the data in one or more databases. The effects of all the SQL statements
in a transaction can be either all committed to the database or all rolled back.

The MySQL database has different types of storage engines. The most common are the MyISAM
and the InnoDB engines. There is a trade-off between data security and
database speed. The MyISAM tables are faster to process and they do 
not support transactions. On the other hand, the InnoDB tables are more safe 
against the data loss. They support transactions and are slower to process. 

JdbcTransaction.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcTransaction {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        try (Connection con = DriverManager.getConnection(url, user, password)) {

            try (Statement st = con.createStatement()) {

                con.setAutoCommit(false);

                st.executeUpdate("UPDATE Authors SET Name = 'Leo Tolstoy'"
                        + "WHERE Id = 1");
                st.executeUpdate("UPDATE Books SET Title = 'War and Peace'"
                        + "WHERE Id = 1");
                st.executeUpdate("UPDATE Books SET Titl = 'Anna Karenina'"
                        + "WHERE Id = 2");

                con.commit();

            } catch (SQLException ex) {

                try {

                    con.rollback();
                } catch (SQLException ex1) {

                    Logger lgr = Logger.getLogger(JdbcTransaction.class.getName());
                    lgr.log(Level.WARNING, ex1.getMessage(), ex1);
                }

                Logger lgr = Logger.getLogger(JdbcTransaction.class.getName());
                lgr.log(Level.SEVERE, ex.getMessage(), ex);

            }
        } catch (SQLException ex) {
            Logger.getLogger(JdbcTransaction.class.getName()).log(
                Level.SEVERE, null, ex);
        }
    }
}

In this program, we want to change the name of the author
on the first row of the Authors table. We must also change the
books associated with this author. This is a good example where a 
transaction is necessary. If we change the author and do not
change the author's books, the data is corrupted. 

con.setAutoCommit(false);

To work with transactions, we must set the autocommit mode to false.
By default, a database connection is in autocommit mode. In this 
mode each statement is committed to the database as soon as it
is executed. A statement cannot be undone. When the autocommit is
turned off, we commit the changes by calling the 
commit or roll it back by calling the
rollback method.

st.executeUpdate("UPDATE Books SET Titl = 'Anna Karenina' "
        + "WHERE Id = 2");

The third SQL statement has an error. There is no Titl column in the
table. 

con.commit();

If there is no exception, the transaction is committed.

try {

    con.rollback();
} catch (SQLException ex1) {

    Logger lgr = Logger.getLogger(JdbcTransaction.class.getName());
    lgr.log(Level.WARNING, ex1.getMessage(), ex1);
}

In case of an exception, the transaction is rolled back. 
No changes are committed to the database. 

Feb 21, 2018 2:35:14 PM com.zetcode.JdbcTransaction main
SEVERE: Unknown column 'Titl' in 'field list'
com.mysql.jdbc.exceptions.jdbc4.MySQLSyntaxErrorException: 
Unknown column 'Titl' in 'field list'

The application ends with an exception.

mysql&gt; SELECT Name, Title From Authors, Books WHERE Authors.Id=Books.AuthorId;
+-------------------+----------------------+
| Name              | Title                |
+-------------------+----------------------+
| Jack London       | Call of the Wild     |
| Jack London       | Martin Eden          |
| Honore de Balzac  | Old Goriot           |
| Honore de Balzac  | Cousin Bette         |
| Lion Feuchtwanger | Jew Suess            |
| Emile Zola        | Nana                 |
| Emile Zola        | The Belly of Paris   |
| Truman Capote     | In Cold blood        |
| Truman Capote     | Breakfast at Tiffany |
+-------------------+----------------------+
9 rows in set (0.01 sec)

The transaction was rolled back and no changes took place. 

However, without a transaction, the data is not safe.

JdbcNoTransaction.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcNoTransaction {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        try (Connection con = DriverManager.getConnection(url, user, password);
                Statement st = con.createStatement()) {

            st.executeUpdate("UPDATE Authors SET Name = 'Leo Tolstoy'"
                    + "WHERE Id = 1");
            st.executeUpdate("UPDATE Books SET Title = 'War and Peace'"
                    + "WHERE Id = 1");
            st.executeUpdate("UPDATE Books SET Titl = 'Anna Karenina'"
                    + "WHERE Id = 2");

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JdbcNoTransaction.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We have the same example. This time, without the transaction support. 

mysql&gt; SELECT Name, Title From Authors, Books WHERE Authors.Id=Books.AuthorId;
+-------------------+----------------------+
| Name              | Title                |
+-------------------+----------------------+
| Leo Tolstoy       | War and Peace        |
| Leo Tolstoy       | Martin Eden          |
| Honore de Balzac  | Old Goriot           |
| Honore de Balzac  | Cousin Bette         |
| Lion Feuchtwanger | Jew Suess            |
| Emile Zola        | Nana                 |
| Emile Zola        | The Belly of Paris   |
| Truman Capote     | In Cold blood        |
| Truman Capote     | Breakfast at Tiffany |
+-------------------+----------------------+
9 rows in set (0.00 sec)

An exception is thrown again. Leo Tolstoy did not write Martin Eden; 
the data is corrupted. 

## Batch updates

When we need to update data with multiple statements, we can use
batch updates. Batch updates are available for INSERT, 
UPDATE, DELETE, statements as well as for 
CREATE TABLE and DROP TABLE statements. 

JdbcBatchUpdate.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcBatchUpdate {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        try (Connection con = DriverManager.getConnection(url, user, password)) {

            try (Statement st = con.createStatement()) {

                con.setAutoCommit(false);

                st.addBatch("DROP TABLE IF EXISTS Authors2");
                st.addBatch("CREATE TABLE Authors2(Id INT PRIMARY KEY, "
                        + "Name VARCHAR(100))");
                st.addBatch("INSERT INTO Authors2(Id, Name) "
                        + "VALUES(1, 'Jack London')");
                st.addBatch("INSERT INTO Authors2(Id, Name) "
                        + "VALUES(2, 'Honore de Balzac')");
                st.addBatch("INSERT INTO Authors2(Id, Name) "
                        + "VALUES(3, 'Lion Feuchtwanger')");
                st.addBatch("INSERT INTO Authors2(Id, Name) "
                        + "VALUES(4, 'Emile Zola')");
                st.addBatch("INSERT INTO Authors2(Id, Name) "
                        + "VALUES(5, 'Truman Capote')");
                st.addBatch("INSERT INTO Authors2(Id, Name) "
                        + "VALUES(6, 'Umberto Eco')");

                int counts[] = st.executeBatch();

                con.commit();

                System.out.printf("Committed %d updates", counts.length);
                
            } catch (SQLException ex) {
                try {

                    con.rollback();
                } catch (SQLException ex2) {

                    Logger lgr = Logger.getLogger(JdbcBatchUpdate.class.getName());
                    lgr.log(Level.FINEST, ex2.getMessage(), ex2);
                }

                Logger lgr = Logger.getLogger(JdbcBatchUpdate.class.getName());
                lgr.log(Level.FINEST, ex.getMessage(), ex);
            }
        } catch (SQLException ex) {
            Logger lgr = Logger.getLogger(JdbcBatchUpdate.class.getName());
            lgr.log(Level.FINEST, ex.getMessage(), ex);
        }
    }
}

This is an example program for a batch update. We delete all data from the
Authors table and insert new data. We add one new author, Umberto Eco to 
see the changes. 

st.addBatch("DROP TABLE IF EXISTS Authors2");
st.addBatch("CREATE TABLE Authors2(Id INT PRIMARY KEY, "
        + "Name VARCHAR(100))");
st.addBatch("INSERT INTO Authors2(Id, Name) "
        + "VALUES(1, 'Jack London')");
...

We use teh addBatch method to add a new command to the statement. 

int counts[] = st.executeBatch();

After adding all commands, we call the executeBatch to perform a
batch update. The method returns an array of committed changes. 

con.commit();

Batch updates are committed in a transaction. 

} catch (SQLException ex) {
    try {

        con.rollback();
    } catch (SQLException ex2) {

        Logger lgr = Logger.getLogger(JdbcBatchUpdate.class.getName());
        lgr.log(Level.FINEST, ex2.getMessage(), ex2);
    }

    Logger lgr = Logger.getLogger(JdbcBatchUpdate.class.getName());
    lgr.log(Level.FINEST, ex.getMessage(), ex);
}

We call rollback in case the batch updates failed.

$ mvn exec:java -q
Committed 8 updates

mysql&gt; SELECT * from Authors2;
+----+-------------------+
| Id | Name              |
+----+-------------------+
|  1 | Jack London       |
|  2 | Honore de Balzac  |
|  3 | Lion Feuchtwanger |
|  4 | Emile Zola        |
|  5 | Truman Capote     |
|  6 | Umberto Eco       |
+----+-------------------+
6 rows in set (0.00 sec)

We execute the BatchUpdate program. The SELECT statement 
shows that the Authors2 table was successfully updated. It has a new author, 
Umerto Eco.

## Exporting data to a CSV file

The next example exports data into a CSV file.

We need to have proper file permissions for our testuser; otherwise, 
we get access denied error message.

mysql&gt; GRANT FILE ON *.* TO 'testuser'@'localhost';

We set the FILE permission.

mysql&gt; SHOW VARIABLES LIKE "secure_file_priv";
+------------------+-----------------------+
| Variable_name    | Value                 |
+------------------+-----------------------+
| secure_file_priv | /var/lib/mysql-files/ |
+------------------+-----------------------+
1 row in set (0.26 sec)

For security reasons, MySQL starts with --secure-file-priv option enabled, which only 
allows to work with files in a certain directory.
The directory is specified in the secure_file_priv variable. On Windows, the
path is something like 'C:/ProgramData/MySQL/MySQL Server 5.7/Uploads'.

ExportCSV.java
  

package com.zetcode;

import java.sql.PreparedStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JdbcExportCSV {

    public static void main(String[] args) {

        String url = "jdbc:mysql://localhost:3306/testdb?useSSL=false";
        String user = "testuser";
        String password = "test623";

        String query = "SELECT Name, Title INTO OUTFILE "
                + "'/var/lib/mysql-files/authors_books.csv' "
                + "FIELDS TERMINATED BY ',' "
                + "FROM Authors, Books WHERE "
                + "Authors.Id=Books.AuthorId";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query)) {

            pst.execute();
        } catch (SQLException ex) {
            
            Logger lgr = Logger.getLogger(JdbcExportCSV.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We export the authors and their corresponding books to the /var/lib/mysql-files/authors_books.csv
file.

String query = "SELECT Name, Title INTO OUTFILE "
        + "'/var/lib/mysql-files/authors_books.csv' "
        + "FIELDS TERMINATED BY ',' "
        + "FROM Authors, Books WHERE "
        + "Authors.Id=Books.AuthorId";

To export data into a file, we use the SELECT INTO OUTFILE SQL statement.

$ cat /var/lib/mysql-files/authors_books.csv
Jack London,Call of the Wild
Jack London,Martin Eden
Honore de Balzac,Old Goriot
Honore de Balzac,Cousin Bette
Lion Feuchtwanger,Jew Suess
Emile Zola,Nana
Emile Zola,The Belly of Paris
Truman Capote,In Cold blood
Truman Capote,Breakfast at Tiffany

We verify the data.

This was the MySQL Java tutorial. You might be also interested in 
[JDBI tutorial](/db/jdbi/),
[Java H2 tutorial](/java/h2database/),
[Java PostgreSQL tutorial](/java/postgresql/),
[Java MongoDB tutorial](/java/mongodb/), or
[MySQL tutorial](/mysql/).