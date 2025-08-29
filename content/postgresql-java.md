+++
title = "PostgreSQL Java"
date = 2025-08-29T20:00:06.385+01:00
draft = false
description = "PostgreSQL Java tutorial tutorial covers the basics of PostgreSQL programming in Java language. PostgreSQL Java examples cover queries, prepared statements, binary files, or batch updates."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PostgreSQL Java

last modified January 27, 2024

 

This is a Java tutorial for the PostgreSQL database. It covers the basics of 
PostgreSQL programming with Java. 

There are similar related tutorials 
[MySQL Java tutorial](/db/mysqljava/),
[Spring JdbcTemplate tutorial](/db/jdbctemplate/), and
[Apache Derby tutorial](/db/apachederbytutorial/) on ZetCode.

## JDBC

*JDBC* is an API for the Java programming language that defines how a 
client may access a database. It provides methods for querying and updating 
data in a database. JDBC is oriented towards relational databases. 
From a technical point of view, the API is as a set of classes in the 
java.sql package. To use JDBC with a particular database, we need 
a JDBC driver for that database.

## About PostgreSQL database

PostgreSQL is a powerful, open source object-relational database system.
It is a multi-user database management system. 
It runs on multiple platforms including Linux, FreeBSD, Solaris, 
Microsoft Windows, and Mac OS X.
PostgreSQL is developed by the PostgreSQL Global Development Group.

## PostgreSQL driver

To include the PostgreSQL Java driver, we need to add the following
Maven dependency:

&lt;dependency&gt;
    &lt;groupId&gt;org.postgresql&lt;/groupId&gt;
    &lt;artifactId&gt;postgresql&lt;/artifactId&gt;
    &lt;version&gt;42.2.0&lt;/version&gt;
&lt;/dependency&gt; 
        

## Maven Exec plugin

In order to run command line applications from Maven, we can uset 
the following Maven plugin. 

&lt;build&gt;
    &lt;plugins&gt;
        &lt;plugin&gt;
            &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
            &lt;artifactId&gt;exec-maven-plugin&lt;/artifactId&gt;
            &lt;version&gt;1.6.0&lt;/version&gt;
            &lt;configuration&gt;
                &lt;mainClass&gt;com.zetcode.AppName&lt;/mainClass&gt;
            &lt;/configuration&gt;
        &lt;/plugin&gt;
    &lt;/plugins&gt;
&lt;/build&gt;   
   

We can run the application with mvn -q exec:java command. 
In the mainClass tag, we write the fully qualified name of
the main class, such as com.zetcode.JavaPostgreSqlVersion.
The -q runs Maven in quite mode; it disables all Maven 
messages except error messages.

## PostgreSQL setup

We are going to show how to install PostgreSQL database on a Debian Linux system.

$ sudo apt-get install postgresql  

This command installs PostgreSQL server and related packages. 

$ /etc/init.d/postgresql status

We check the status of the database with postgresql status command.

$ sudo -u postgres psql postgres
psql (9.5.10)
Type "help" for help.

postgres=# \password postgres
Enter new password: 
Enter it again: 

After the installation, a postgres user with administration priviliges 
was created with empty default password. As the first step, we need to set 
a password for postgres.

$ sudo -u postgres createuser --interactive --password user12
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) y
Shall the new role be allowed to create more new roles? (y/n) n
Password: 

We create a new database user. 

$ sudo -u postgres createdb testdb -O user12

We create a new testdb database with createdb command,
which is going to be owned by user12.

$ sudo vi /etc/postgresql/9.5/main/pg_hba.conf

We edit the pg_hba.conf file.

# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust

In order to be able to run a Spring Boot application with a local PostgreSQL installation, 
we change the authentication method for the Unix domain socket and local 
connections to trust.

$ sudo service postgresql restart

We restart PostgreSQL to enable the changes.

$ psql -U user12 -d testdb -W
Password for user user12: 
psql (9.5.10)
Type "help" for help.

testdb=&gt; 

Now we can use the psql tool to connect to the database.

## Removing PostgreSQL from startup scripts

If we install the PostgreSQL database from packages, it is automatically
added to the start up scripts of the operating system. If we are only learning
to work with the database, it is unnecessary to start the database each time we
boot the system. 

$ sudo update-rc.d -f postgresql remove
 Removing any system startup links for /etc/init.d/postgresql ...
   /etc/rc0.d/K21postgresql
   /etc/rc1.d/K21postgresql
   /etc/rc2.d/S19postgresql
   /etc/rc3.d/S19postgresql
   /etc/rc4.d/S19postgresql
   /etc/rc5.d/S19postgresql
   /etc/rc6.d/K21postgresql

The above command removes any system startup links for
the PostgreSQL database. 

## Java PostgreSQL version

If the following program runs OK, then we have everything
installed OK. We check the version of the PostgreSQL server. 

JavaPostgreSqlVersion.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlVersion {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        try (Connection con = DriverManager.getConnection(url, user, password);
                Statement st = con.createStatement();
                ResultSet rs = st.executeQuery("SELECT VERSION()")) {

            if (rs.next()) {
                System.out.println(rs.getString(1));
            }

        } catch (SQLException ex) {
        
            Logger lgr = Logger.getLogger(JavaPostgreSqlVersion.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We connect to the database and get some info about the PostgreSQL server.

String url = "jdbc:postgresql://localhost:5432/testdb";

This is the connection URL for the PostgreSQL database. Each driver
has a different syntax for the URL. In our case, we provide a 
host (localhost), a port (5432), and a database name (testdb). 

try (Connection con = DriverManager.getConnection(url, user, password);
        Statement st = con.createStatement();
        ResultSet rs = st.executeQuery("SELECT VERSION()")) {

A connection is established to the database with getConnection.
The createStatement method of the connection
object creates a Statement object for sending SQL statements 
to the database. The executeQuery executes the given SQL statement, 
which returns a single ResultSet object.
The ResultSet is a table of data returned by a specific SQL statement. 

The try-with-resources statement ensures that each resource is closed at the end 
of the statement.

if (rs.next()) {
    System.out.println(rs.getString(1));
}

A ResultSet object maintains a cursor pointing to its current row of data. 
Initially the cursor is positioned before the first row. The next
method moves the cursor to the next row. If there are no rows left, the method
returns false. The getString method retrieves the value 
of a specified column. The first column has index 1. 

} catch (SQLException ex) {

    Logger lgr = Logger.getLogger(JavaPostgreSqlVersion.class.getName());
    lgr.log(Level.SEVERE, ex.getMessage(), ex);
}

In case of an exception, we log the error message. 

$ mvn -q exec:java
PostgreSQL 9.5.10 on x86_64-pc-linux-gnu, compiled by gcc (Ubuntu 5.4.0-6ubuntu1~16.04.4) 5.4.0 20160609, 64-bit

This is a sample output of the program.

## Creating and populating tables

Next we are going to create database tables and fill them
with data. These tables will be used throughout this tutorial.  

authors_books_postgresql.sql
  

DROP TABLE IF EXISTS books, authors, testing, images;

CREATE TABLE IF NOT EXISTS authors (
    id serial PRIMARY KEY, 
    name VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS books (
    id serial PRIMARY KEY, 
    author_id INT references authors(id), title VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS testing(id INT);
CREATE TABLE IF NOT EXISTS images(id serial, data bytea);

INSERT INTO authors(id, name) VALUES(1, 'Jack London');
INSERT INTO authors(id, name) VALUES(2, 'Honore de Balzac');
INSERT INTO authors(id, name) VALUES(3, 'Lion Feuchtwanger');
INSERT INTO authors(id, name) VALUES(4, 'Emile Zola');
INSERT INTO authors(id, name) VALUES(5, 'Truman Capote');

INSERT INTO books(id, author_id, title) VALUES(1, 1, 'Call of the Wild');
INSERT INTO books(id, author_id, title) VALUES(2, 1, 'Martin Eden');
INSERT INTO books(id, author_id, title) VALUES(3, 2, 'Old Goriot');
INSERT INTO books(id, author_id, title) VALUES(4, 2, 'Cousin Bette');
INSERT INTO books(id, author_id, title) VALUES(5, 3, 'Jew Suess');
INSERT INTO books(id, author_id, title) VALUES(6, 4, 'Nana');
INSERT INTO books(id, author_id, title) VALUES(7, 4, 'The Belly of Paris');
INSERT INTO books(id, author_id, title) VALUES(8, 5, 'In Cold blood');
INSERT INTO books(id, author_id, title) VALUES(9, 5, 'Breakfast at Tiffany');

We have a authors_books_postgresql.sql file. It creates four database tables, authors, 
books, testing, and images. We place a foreign key constraint on the 
author_id column of the books table. We fill the authors and books 
tables with initial data. 

$ psql -U user12 -d testdb -W
Password for user user12: 
psql (9.5.10)
Type "help" for help.

testdb=&gt; \i authors_books_postgresql.sql 
psql:authors_books_postgresql.sql:1: NOTICE:  table "books" does not exist, skipping
psql:authors_books_postgresql.sql:1: NOTICE:  table "authors" does not exist, skipping
psql:authors_books_postgresql.sql:1: NOTICE:  table "testing" does not exist, skipping
psql:authors_books_postgresql.sql:1: NOTICE:  table "images" does not exist, skipping
DROP TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
CREATE TABLE
INSERT 0 1
INSERT 0 1
...

The *psql* is a terminal-based front-end to PostgreSQL.
We can use it to perfom interactive queries, issue them to 
PostgreSQL, and see the query results. Inside the psql 
tool, we import and execute the authors_books_postgresql.sql file. 

testdb=&gt; \dt
         List of relations
 Schema |  Name   | Type  | Owner  
--------+---------+-------+--------
 public | authors | table | user12
 public | books   | table | user12
 public | cities  | table | user12
 public | images  | table | user12
 public | testing | table | user12
(5 rows)

We check the created tables. 

## Java PostgreSQL prepared statements

Now we will concern ourselves with prepared statements. 
When we write prepared statements, we use placeholders instead 
of directly writing the values into the statements. 
Prepared statements increase security and performance.

In Java a PreparedStatement is an object
which represents a precompiled SQL statement. 

JavaPostgreSqlPrepared.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlPrepared {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        int id = 6;
        String author = "Trygve Gulbranssen";
        String query = "INSERT INTO authors(id, name) VALUES(?, ?)";

        try (Connection con = DriverManager.getConnection(url, user, password);
             PreparedStatement pst = con.prepareStatement(query)) {
            
            pst.setInt(1, id);
            pst.setString(2, author);
            pst.executeUpdate();

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JavaPostgreSqlPrepared.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We add a new author to the authors table. 

String query = "INSERT INTO authors(id, name) VALUES(?, ?)";

try (Connection con = DriverManager.getConnection(url, user, password);
        PreparedStatement pst = con.prepareStatement(query)) {

Here we create a prepared statement. When we write prepared statements, we use 
placeholders instead of directly writing the values into the statements. 
Prepared statements are faster and guard against SQL injection attacks. 
The ? is a placeholder, which is going to be filled later. In our case 
we will fill two values: an integer id and a string name. 

pst.setInt(1, id);

An integer value is bound to the placeholder. 

pst.setString(2, author); 

A string value is bound to the placeholder. 

pst.executeUpdate();

The prepared statement is executed. We use the executeUpdate
method of the statement object when we do not expect any data to be returned. 
This is when we create databases or execute INSERT, UPDATE, 
and DELETE statements. 

testdb=&gt; SELECT * FROM Authors;
 id |        name        
----+--------------------
  1 | Jack London
  2 | Honore de Balzac
  3 | Lion Feuchtwanger
  4 | Emile Zola
  5 | Truman Capote
  6 | Trygve Gulbranssen
(6 rows)

We have a new author inserted into the table. 

Testing
table. We will execute a normal statement and a prepared statement 
1000 times. We check if there is some difference in execution time. 

&lt;build&gt;
    &lt;plugins&gt;
        &lt;plugin&gt;
            &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
            &lt;artifactId&gt;exec-maven-plugin&lt;/artifactId&gt;
            &lt;version&gt;1.6.0&lt;/version&gt;
            &lt;configuration&gt;
                &lt;mainClass&gt;com.zetcode.JavaPostgreSqlTestingNotPrepared&lt;/mainClass&gt;
            &lt;/configuration&gt;
        &lt;/plugin&gt;
    &lt;/plugins&gt;
&lt;/build&gt; 

In order to run the project from the command line, we add the exec-maven-plugin 
to the POM file.

JavaPostgreSqlTestingNotPrepared.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlTestingNotPrepared {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        try (Connection con = DriverManager.getConnection(url, user, password);
                Statement st = con.createStatement()) {

            for (int i = 1; i &lt;= 1000; i++) {
                String query = "INSERT INTO Testing(Id) VALUES(" + 2 * i + ")";
                st.executeUpdate(query);
            }

        } catch (SQLException ex) {
            Logger lgr = Logger.getLogger(JavaPostgreSqlTestingNotPrepared.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);

        }
    }
}

The first example uses Statement. 

for (int i=1; i&lt;=1000; i++) {
    String query = "INSERT INTO Testing(Id) VALUES(" + 2*i + ")";
    st.executeUpdate(query);
}

We build the query and execute it 1000 times. 

$ javac zetcode/NotPrepared.java
$ /usr/bin/time java -cp .:lib/postgresql.jdbc4.jar zetcode.NotPrepared
0.81user 0.14system 0:32.27elapsed 2%CPU (0avgtext+0avgdata 89824maxresident)k
960inputs+88outputs (1major+6008minor)pagefaults 0swaps

We use the time command to measure the time which the program ran. Note that
we use a standard Linux command, not the built-in bash time command. It took
32s to insert 1000 rows into the table using the Statement object. 

package zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Prepared2 {

    public static void main(String[] args) {

        Connection con = null;
        PreparedStatement pst = null;
        
        String url = "jdbc:postgresql://localhost/testdb";
        String user = "user12";
        String password = "34klq*";

        try {

            con = DriverManager.getConnection(url, user, password);

            pst = con.prepareStatement("INSERT INTO Testing(Id) VALUES(?)");

            for (int i = 1; i &lt;= 1000; i++) {
                pst.setInt(1, i * 2);
                pst.executeUpdate();
            }

        } catch (SQLException ex) {
            Logger lgr = Logger.getLogger(Prepared2.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);

        } finally {

            try {
                if (pst != null) {
                    pst.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                Logger lgr = Logger.getLogger(Prepared2.class.getName());
                lgr.log(Level.SEVERE, ex.getMessage(), ex);
            }
        }
    }
}

Now we use the PreparedStatement to do the same
task.

pst = con.prepareStatement("INSERT INTO Testing(Id) VALUES(?)");

We create the prepared statement using the prepareStatement
method. 

for (int i = 1; i &lt;= 1000; i++) {
    pst.setInt(1, i * 2);
    pst.executeUpdate();
}

We bind a value to the prepared statement, execute it in a loop
thousand times.

$ javac zetcode/Prepared2.java
$ /usr/bin/time java -cp .:lib/postgresql.jdbc4.jar zetcode.Prepared2 
0.59user 0.11system 0:15.08elapsed 4%CPU (0avgtext+0avgdata 76912maxresident)k
0inputs+64outputs (0major+4941minor)pagefaults 0swaps

This time it took 15s to insert 1000 rows. We have saved 17s using 
prepared statements. 

-->

## Java PostgreSQL retrieving data

Next we will show, how to retrieve data from a database table.
We get all data from the authors table.

JavaPostgreSqlRetrieve.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlRetrieve {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement("SELECT * FROM authors");
                ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {
            
                System.out.print(rs.getInt(1));
                System.out.print(": ");
                System.out.println(rs.getString(2));
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JavaPostgreSqlRetrieve.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We get all authors from the authors table and print them to 
the console. 

try (Connection con = DriverManager.getConnection(url, user, password);
        PreparedStatement pst = con.prepareStatement("SELECT * FROM authors");
        ResultSet rs = pst.executeQuery()) {

We execute a query that selects all columns from the authors table.
We use the executeQuery method. The method executes the given 
SQL statement, which returns a single 
ResultSet object. The ResultSet is the data
table returned by the SQL query.

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
in the Java programming language.

$ mvn -q exec:java
1: Jack London
2: Honore de Balzac
3: Lion Feuchtwanger
4: Emile Zola
5: Truman Capote
6: Trygve Gulbranssen

The Ids and names of authors are printed to the console. 

## Properties

It is a common practice to put the configuration data outside the
program in a separate file. This way the programmers are more 
flexible. We can change the user, the password or the connection URL
without needing to recompile the program. 

In Java, the Properties is a class used
often for this. The class is used for easy reading and saving
of key/value properties. 

database.properties
  

db.url=jdbc:postgresql://localhost:5432/testdb
db.user=user12
db.passwd=34klq*

We have a database.properties file, in which we have three
key/value pairs. They are loaded during the execution of the program.

JavaPostgreSqlRetrieveProperties.java
  

package com.zetcode;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlRetrieveProperties {

    public static Properties readProperties() {

        Properties props = new Properties();
        Path myPath = Paths.get("src/main/resources/database.properties");

        try {
            BufferedReader bf = Files.newBufferedReader(myPath, 
                StandardCharsets.UTF_8);

            props.load(bf);
        } catch (IOException ex) {
            Logger.getLogger(JavaPostgreSqlRetrieveProperties.class.getName()).log(
                    Level.SEVERE, null, ex);
        }

        return props;
    }

    public static void main(String[] args) {

        Properties props = readProperties();

        String url = props.getProperty("db.url");
        String user = props.getProperty("db.user");
        String passwd = props.getProperty("db.passwd");

        try (Connection con = DriverManager.getConnection(url, user, passwd);
                PreparedStatement pst = con.prepareStatement("SELECT * FROM Authors");
                ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {
                System.out.print(rs.getInt(1));
                System.out.print(": ");
                System.out.println(rs.getString(2));
            }

        } catch (SQLException ex) {
            
            Logger lgr = Logger.getLogger(
                JavaPostgreSqlRetrieveProperties.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We connect to the testdb database and print the contents of the authors
table to the console. This time, we load the connection properties from a
file. They are not hard coded in the proram. 

public static Properties readProperties() {

    Properties props = new Properties();
    Path myPath = Paths.get("src/main/resources/database.properties");

    try {
        BufferedReader bf = Files.newBufferedReader(myPath, StandardCharsets.UTF_8);

        props.load(bf);
    } catch (IOException ex) {
        Logger.getLogger(JavaPostgreSqlRetrieveProperties.class.getName()).log(
                Level.SEVERE, null, ex);
    }

    return props;
}

The properties are loaded into the Properties class with load. 
The data is read from the database.properties file, located 
in src/main/resources.

String url = props.getProperty("db.url");
String user = props.getProperty("db.user");
String passwd = props.getProperty("db.passwd");

The values are retrieved with the getProperty method. 

## Java PostgreSQL multiple statements

It is possible to execute multiple SQL statements in one query.

JavaPostgreSqlMultipleStatements.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlMultipleStatements {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        String query = "SELECT id, name FROM authors WHERE Id=1;"
                + "SELECT id, name FROM authors WHERE Id=2;"
                + "SELECT id, name FROM authors WHERE Id=3";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query)) {

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

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(
                    JavaPostgreSqlMultipleStatements.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In the code example, we retrieve three rows from the authors table. 
We use three SELECT statements to get three rows. 

String query = "SELECT id, name FROM authors WHERE Id=1;"
        + "SELECT id, name FROM authors WHERE Id=2;"
        + "SELECT id, name FROM authors WHERE Id=3";

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

The processing of the results is done inside the do/while loop. The 
ResultSet is retrieved with the getResultSet
method call. To find out if there are other results, we call the 
getMoreResults method. 

$ mvn -q exec:java
1: Jack London
2: Honore de Balzac
3: Lion Feuchtwanger

The first three rows were retrieved from the authors table. 

## Metadata

Metadata is information about the data in the database. Metadata in a 
PostgreSQL database contains information about the tables and columns, 
in which we store data. The number of rows affected by an SQL statement is 
a metadata. The number of rows and columns returned in a result set belongs
to metadata as well.

Metadata in PostgreSQL can be obtained by calling the getMetaData
method of the result set object or from the *information_schema* table.

In the next example we print column headers with the data from the database table. 

JavaPostgreSqlColumnHeaders.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Formatter;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlColumnHeaders {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        String query = "SELECT name, title From authors, "
                + "books WHERE authors.id=books.author_id";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet rs = pst.executeQuery()) {

            ResultSetMetaData meta = rs.getMetaData();

            String colname1 = meta.getColumnName(1);
            String colname2 = meta.getColumnName(2);

            Formatter fmt1 = new Formatter();
            fmt1.format("%-21s%s", colname1, colname2);
            System.out.println(fmt1);

            while (rs.next()) {
                
                Formatter fmt2 = new Formatter();
                fmt2.format("%-21s", rs.getString(1));
                System.out.print(fmt2);
                System.out.println(rs.getString(2));
            }

        } catch (SQLException ex) {
            
            Logger lgr = Logger.getLogger(
                    JavaPostgreSqlColumnHeaders.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In this program, we select authors from the authors table
and their books from the books table. We print the names 
of the columns returned in the result set. We format the 
output.

String query = "SELECT name, title From authors, " +
    "books WHERE authors.id=books.author_id";

This is the SQL statement which joins authors with their
books. 

ResultSetMetaData meta = rs.getMetaData();

To get the column names we need to get the ResultSetMetaData.
It is an object that can be used to get information about the types and properties 
of the columns in a ResultSet object. 

String colname1 = meta.getColumnName(1);
String colname2 = meta.getColumnName(2);

From the obtained metadata, we get the column names. 

Formatter fmt1 = new Formatter();
fmt1.format("%-21s%s", colname1, colname2);
System.out.println(fmt1)

We print the column names to the console. We use 
the Formatter object to format the 
data.

while (rs.next()) {

    Formatter fmt2 = new Formatter();
    fmt2.format("%-21s", rs.getString(1));
    System.out.print(fmt2);
    System.out.println(rs.getString(2));
}

We print the data to the console. We again use the 
Formatter object to format the 
data. The first column is 21 characters wide and is aligned
to the left. 

$ mvn exec:java -q
name                 title
Jack London          Call of the Wild
Jack London          Martin Eden
Honore de Balzac     Old Goriot
Honore de Balzac     Cousin Bette
Lion Feuchtwanger    Jew Suess
Emile Zola           Nana
Emile Zola           The Belly of Paris
Truman Capote        In Cold blood
Truman Capote        Breakfast at Tiffany

In the following example we list all tables in the testdb
database.

JavaPostgreSqlListTables.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlListTables {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        String query = "SELECT table_name FROM information_schema.tables "
                + "WHERE table_schema = 'public'";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet rs = pst.executeQuery()) {

            while (rs.next()) {

                System.out.println(rs.getString(1));
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JavaPostgreSqlListTables.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

The code example prints all available tables in the current database to the terminal.

String query = "SELECT table_name FROM information_schema.tables "
        + "WHERE table_schema = 'public'";

The table names are stored inside the system information_schema table.

$ mvn -q exec:java
authors
books
images
testing
cities

Listing available tables in the testdb database. 

## Writing images

Some people prefer to put their images into the database, some prefer to keep them 
on the file system for their applications. Technical difficulties arise when we 
work with lots of images. Images are binary data. PostgreSQL database has a special 
data type to store binary data called bytea. This is a non-standard data type. 
The standard data type in databases is BLOB. 

For this example, we use the images table.

JavaPostgreSqlWriteImage.java
  

package com.zetcode;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlWriteImage {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost/testdb";
        String user = "user12";
        String password = "34klq*";

        String query = "INSERT INTO images(data) VALUES(?)";
        
        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query)) {

            File img = new File("src/main/resources/sid.jpg");

            try (FileInputStream fin = new FileInputStream(img)) {

                pst.setBinaryStream(1, fin, (int) img.length());
                pst.executeUpdate();
            } catch (IOException ex) {
                Logger.getLogger(JavaPostgreSqlWriteImage.class.getName()).log(
                        Level.SEVERE, ex.getMessage(), ex);
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JavaPostgreSqlWriteImage.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In the preceding example, we read a JPG image from the current
working directory and insert in into the images table. 

String query = "INSERT INTO images(data) VALUES(?)";

This is the SQL to insert an image. 

File img = new File("src/main/resources/sid.jpg");

try (FileInputStream fin = new FileInputStream(img)) {

We create a File object for the image file. To 
read bytes from this file, we create a FileInputStream
object. 

pst.setBinaryStream(1, fin, (int) img.length());

The binary stream is set to the prepared statement. The parameters of
the setBinaryStream method are the parameter
index to bind, the input stream and the number of bytes in the stream.

pst.executeUpdate();

We execute the statement. 

testdb=&gt; select count(id) from images;
 count 
-------
     1
(1 row)

We look in the table if we have written the image.

## Reading images

In the previous example, we have inserted an image into the database 
table. Now we are going to read the image back from the table. 

Warning: if we are using PostgreSQL 9 and later, we must also use
the latest JDBC driver. PostgreSQL has changed the way bytea data is
stored. Therefore we run into troubles when using older driver with
the PostgreSQL 9.x. Notice that NetBeans or other applications might use older 
drivers. 

JavaPostgreSqlReadImage.java
  

package com.zetcode;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlReadImage {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        String query = "SELECT data, LENGTH(data) FROM images WHERE id = 1";

        try (Connection con = DriverManager.getConnection(url, user, password);
                PreparedStatement pst = con.prepareStatement(query);
                ResultSet rs = pst.executeQuery()) {

            rs.next();
            
            File myFile = new File("src/main/resources/sid.jpg");

            try (FileOutputStream fos = new FileOutputStream(myFile)) {

                int len = rs.getInt(2);
                byte[] buf = rs.getBytes("data");
                fos.write(buf, 0, len);
            }

        } catch (IOException | SQLException ex) {

            Logger lgr = Logger.getLogger(JavaPostgreSqlReadImage.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We read one image from the images table. 

String query = "SELECT data, LENGTH(data) FROM images WHERE id = 1";

We select the data and the size of the image from the 
database table. 

File myFile = new File("src/main/resources/sid.jpg");

try (FileOutputStream fos = new FileOutputStream(myFile)) {

The FileOutputStream object is created
to write to a file. It is meant for writing streams of raw 
bytes such as image data.

int len = result.getInt(2);

We get the length of the image data in bytes.

byte[] buf = result.getBytes("data");

The getBytes method retrieves all bytes from the result set 
as an array of bytes.

fos.write(buf, 0, len);

The bytes are written to the output stream. The image is created
on the filesystem. 

## Transaction support

A *transaction* is an atomic unit of database operations 
against the data in one or more databases. The effects of all the SQL statements
in a transaction can be either all committed to the database or all rolled back.

When a connection is created, it is in *autocommit* mode. This means that each 
individual SQL statement is treated as a transaction and is automatically 
committed right after it is executed. This is true for all JDBC drivers, including
the PostgreSQL's one. To start a new transaction, we turn the autocommit off. 

In direct SQL, a transaction is started with BEGIN TRANSACTION 
statement and ended with END TRANSACTION, COMMIT statement. 
In PostgreSQL these statements are BEGIN and COMMIT. 
However, when working with drivers these statements are omitted. They
are handled by the driver. Exact details are specific to the driver. 
For example the psycopg2 Python driver starts a transaction after 
the first SQL statement. The autocommit mode must be set by setting the autocommit
property to True. In constrast, JDBC driver is by default in the autocommit
mode. And to start a new transaction, the autocommit must be turned off.

JavaPostgreSqlTransactionEx.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlTransactionEx {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        try (Connection con = DriverManager.getConnection(url, user, password)) {

            try (Statement st = con.createStatement()) {

                con.setAutoCommit(false);
                st.executeUpdate("UPDATE authors SET name = 'Leo Tolstoy' "
                        + "WHERE Id = 1");
                st.executeUpdate("UPDATE books SET title = 'War and Peace' "
                        + "WHERE Id = 1");
                st.executeUpdate("UPDATE books SET titl = 'Anna Karenina' "
                        + "WHERE Id = 2");

                con.commit();

            } catch (SQLException ex) {

                if (con != null) {
                    try {
                        con.rollback();
                    } catch (SQLException ex1) {
                        Logger lgr = Logger.getLogger(JavaPostgreSqlTransactionEx.class.getName());
                        lgr.log(Level.WARNING, ex1.getMessage(), ex1);
                    }
                }

                Logger lgr = Logger.getLogger(JavaPostgreSqlTransactionEx.class.getName());
                lgr.log(Level.SEVERE, ex.getMessage(), ex);
            }
        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(JavaPostgreSqlTransactionEx.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In this program, we want to change the name of the author
in the first row of the authors table. We must also change the
books associated with this author. A good example where a 
transaction is necessary. If we change the author and do not
change the author's books, the data is corrupted. 

con.setAutoCommit(false);

To work with transactions, we must set the autocommit to false.
By default, a database connection is in autocommit mode. In this 
mode each statement is committed to the database as soon as it
is executed. A statement cannot be undone. When the autocommit is
turned off, we commit the changes by calling the 
commit or roll it back by calling the
rollback method.

st.executeUpdate("UPDATE books SET titl = 'Anna Karenina' "
        + "WHERE Id = 2");

The third SQL statement has an error. There is no titl column in the
table. 

con.commit();

If there is no exception, the transaction is committed. If the autocommit
is turned off, we must explicitly call the commit method.

if (con != null) {
    try {
        con.rollback();
    } catch (SQLException ex1) {
        Logger lgr = Logger.getLogger(JavaPostgreSqlTransactionEx.class.getName());
        lgr.log(Level.WARNING, ex1.getMessage(), ex1);
    }
}

In case of an exception, the transaction is rolled back. 
No changes are committed to the database. 

testdb=&gt; SELECT name, title FROM authors, books WHERE authors.id=books.author_id;
       name        |        title         
-------------------+----------------------
 Jack London       | Call of the Wild
 Jack London       | Martin Eden
 Honore de Balzac  | Old Goriot
 Honore de Balzac  | Cousin Bette
 Lion Feuchtwanger | Jew Suess
 Emile Zola        | Nana
 Emile Zola        | The Belly of Paris
 Truman Capote     | In Cold blood
 Truman Capote     | Breakfast at Tiffany
(9 rows)

After we run the application, we verify the data. The transaction was rolled back 
and no changes took place. 

However, without a transaction, the data is not safe.

JavaPostgreSqlNoTransactionEx.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlNoTransactionEx {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        try (Connection con = DriverManager.getConnection(url, user, password);
                Statement st = con.createStatement()) {

            st.executeUpdate("UPDATE authors SET name = 'Leo Tolstoy' "
                    + "WHERE Id = 1");
            st.executeUpdate("UPDATE books SET title = 'War and Peace' "
                    + "WHERE Id = 1");
            st.executeUpdate("UPDATE books SET titl = 'Anna Karenina' "
                    + "WHERE Id = 2");

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(
                    JavaPostgreSqlNoTransactionEx.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

We have the same example. This time without the transaction support. 

testdb=&gt; SELECT name, title FROM authors, books WHERE authors.id=books.author_id;
       name        |        title         
-------------------+----------------------
 Leo Tolstoy       | Martin Eden
 Honore de Balzac  | Old Goriot
 Honore de Balzac  | Cousin Bette
 Lion Feuchtwanger | Jew Suess
 Emile Zola        | Nana
 Emile Zola        | The Belly of Paris
 Truman Capote     | In Cold blood
 Truman Capote     | Breakfast at Tiffany
 Leo Tolstoy       | War and Peace
(9 rows)

Leo Tolstoy did not write Martin Eden. The data is corrupted. 

## Batch updates

When we need to update data with multiple statements, we can use
batch updates. Batch updates are available for INSERT, 
UPDATE, and DELETE statements as well as for 
CREATE TABLE and DROP TABLE statements. 

JavaPostgreSqlBatchUpdates.java
  

package com.zetcode;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaPostgreSqlBatchUpdates {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        try (Connection con = DriverManager.getConnection(url, user, password)) {

            try (Statement st = con.createStatement()) {

                con.setAutoCommit(false);

                st.addBatch("DROP TABLE IF EXISTS friends");
                st.addBatch("CREATE TABLE friends(id serial, name VARCHAR(10))");
                st.addBatch("INSERT INTO friends(name) VALUES ('Jane')");
                st.addBatch("INSERT INTO friends(name) VALUES ('Tom')");
                st.addBatch("INSERT INTO friends(name) VALUES ('Rebecca')");
                st.addBatch("INSERT INTO friends(name) VALUES ('Jim')");
                st.addBatch("INSERT INTO friends(name) VALUES ('Robert')");

                int counts[] = st.executeBatch();

                con.commit();

                System.out.println("Committed " + counts.length + " updates");
                
            } catch (SQLException ex) {

                if (con != null) {
                    try {
                        con.rollback();
                    } catch (SQLException ex1) {
                        Logger lgr = Logger.getLogger(
                                JavaPostgreSqlBatchUpdates.class.getName());
                        lgr.log(Level.WARNING, ex1.getMessage(), ex1);
                    }
                }

                Logger lgr = Logger.getLogger(
                        JavaPostgreSqlBatchUpdates.class.getName());
                lgr.log(Level.SEVERE, ex.getMessage(), ex);
            }

        } catch (SQLException ex) {

            Logger lgr = Logger.getLogger(
                    JavaPostgreSqlBatchUpdates.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

This is an example program for a batch update. We create a new table called
friends and insert five rows into it. 

con.setAutoCommit(false);

Autocommit should always be turned off when doing batch updates.

st.addBatch("DROP TABLE IF EXISTS friends");
st.addBatch("CREATE TABLE friends(id serial, name VARCHAR(10))");
st.addBatch("INSERT INTO friends(name) VALUES ('Jane')");
st.addBatch("INSERT INTO friends(name) VALUES ('Tom')");
...

We use teh addBatch method to add a new command to the statement. 

int counts[] = st.executeBatch();

After adding all commands, we call the executeBatch to perform a
batch update. The method returns an array of committed changes. 

con.commit();

Batch updates are committed in a transaction. 

$ mvn -q exec:java
Committed 7 updates

We execute the BatchUpdate program. We have created a new 
friends table and successfully inserted 5 rows. DROP TABLE
and CREATE TABLE statements are also included in the updates count.

## Export and import of data

PostgreSQL has a COPY statement which can be used to
copy data between a table and a file. From the JDBC point of view, it
is an extension to the standard. 

JavaPostgreSqlCopyToTextFile.java
  

package com.zetcode;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;

public class JavaPostgreSqlCopyToTextFile {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        try {

            Connection con = DriverManager.getConnection(url, user, password);
            CopyManager cm = new CopyManager((BaseConnection) con);

            String fileName = "src/main/resources/friends.txt";

            try (FileOutputStream fos = new FileOutputStream(fileName);
                    OutputStreamWriter osw = new OutputStreamWriter(fos, 
                            StandardCharsets.UTF_8)) {

                cm.copyOut("COPY friends TO STDOUT WITH DELIMITER AS '|'", osw);
            }

        } catch (SQLException | IOException ex) {
            
            Logger lgr = Logger.getLogger(
                    JavaPostgreSqlCopyToTextFile.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

In the previous example a simple friends table was created. In the above
code, we will copy the friends table to a file. 

CopyManager cm = new CopyManager((BaseConnection) con);

Here we create an instance of the CopyManager.
The CopyManager is the API for PostgreSQL COPY bulk
data transfer. 

String fileName = "src/main/resources/friends.txt";

try (FileOutputStream fos = new FileOutputStream(fileName);
        OutputStreamWriter osw = new OutputStreamWriter(fos, 
                StandardCharsets.UTF_8)) {

We create an OutputStreamWriter to the friends.txt file. 

cm.copyOut("COPY friends TO STDOUT WITH DELIMITER AS '|'", fw);

We pass the results of a COPY TO STDOUT query from 
database into a writer using the copyOut method.
The columns will be delimited with the | character. 

$ cat src/main/resources/friends.txt 
1|Jane
2|Tom
3|Rebecca
4|Jim
5|Robert

This is the file created. 

In the second example, we do the reverse operation. 
We copy the data from the file into the database table. 

JavaPostgreSqlCopyFromTextFile.java
  

package com.zetcode;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.postgresql.copy.CopyManager;
import org.postgresql.core.BaseConnection;

public class JavaPostgreSqlCopyFromTextFile {

    public static void main(String[] args) {

        String url = "jdbc:postgresql://localhost:5432/testdb";
        String user = "user12";
        String password = "34klq*";

        try (Connection con = DriverManager.getConnection(url, user, password)) {

            CopyManager cm = new CopyManager((BaseConnection) con);
            
            String fileName = "src/main/resources/friends.txt";

            try (FileInputStream fis = new FileInputStream(fileName);
                    InputStreamReader isr = new InputStreamReader(fis, 
                            StandardCharsets.UTF_8)) {

                cm.copyIn("COPY friends FROM STDIN WITH DELIMITER '|'", isr);
            }

        } catch (SQLException | IOException ex) {
            Logger lgr = Logger.getLogger(
                    JavaPostgreSqlCopyFromTextFile.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);

        }
    }
}

The example uses the FileReader class to read the contents
of the friends.txt table and the COPY statement 
to transfer the data to the friends class. 

String fileName = "src/main/resources/friends.txt";

try (FileInputStream fis = new FileInputStream(fileName);
        InputStreamReader isr = new InputStreamReader(fis, 
                StandardCharsets.UTF_8)) {

We will read from the friends.txt file. 

cm.copyIn("COPY friends FROM STDIN WITH DELIMITER '|'", fr);

We copy the data from the file using the COPY statement.

testdb=&gt; delete from friends;
DELETE 5

We delete the data from the friends table.

$ mvn -q exec:java

We run the program.

testdb=&gt; select * from friends;
 id |  name   
----+---------
  1 | Jane
  2 | Tom
  3 | Rebecca
  4 | Jim
  5 | Robert
(5 rows)

We check the contents of the friends table. 

## Source

[Java PostgreSQL documentation](https://jdbc.postgresql.org/documentation/)

This was the PostgreSQL Java tutorial. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).