+++
title = "Java H2"
date = 2025-08-29T19:59:00.902+01:00
draft = false
description = "Java H2 tutorial shows how to do database programming in H2 with Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java H2

last modified January 27, 2024

 

Java H2 tutorial shows how to do database programming in H2 with Java.

H2 is a relational database management system written in Java. It can
be embedded in Java applications or run in the client-server mode. It can be
used also in a memory mode.

H2 has a very small footprint. It somes with a browser based management
application called H2 Console.

## Downloading H2

From the H2's home page, we download the database in a ZIP file.

$ unzip h2-2022-06-13.zip

We unzip the archive.

## Java H2 memory example

In the first example, we connect to an in-memory H2 database.
The H2 server does not need to run for this example.

bin
com
└── zetcode
    └── SimpleEx.java
lib
└── h2-2.1.214.jar

This is our project structure.

com/zetcode/SimpleEx.java
  

package com.zetcode;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SimpleEx {

    public static void main(String[] args) {

        var url = "jdbc:h2:mem:";

        try (var con = DriverManager.getConnection(url);
             var stm = con.createStatement();
             var rs = stm.executeQuery("SELECT 1+1")) {

            if (rs.next()) {

                System.out.println(rs.getInt(1));
            }

        } catch (SQLException ex) {

            var lgr = Logger.getLogger(SimpleEx.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

The example connects to an H2 in-memory database and executes a query.
An in-memory private database for one connection only is created. The database
is closed when the connection to the database is closed.

var url = "jdbc:h2:mem:";

This URL is for H2 database in memory mode.

$ javac com/zetcode/SimpleEx.java -d bin

We compile the program.

$ java -cp bin:lib/* com.zetcode.SimpleEx
2

We run the program.

## Creating a database

In the older versions of H2, a database was automatically created if it did not
exist. Due to security reasons this is not possible anymore. We need to create a
database before connecting to it.

$ java -cp lib/h2-2.1.214.jar org.h2.tools.Shel

Welcome to H2 Shell 2.1.214 (2022-06-13)
Exit with Ctrl+C
[Enter]   jdbc:h2:~/test
URL       jdbc:h2:~/tmp/h2dbs/testdb
[Enter]   org.h2.Driver
Driver
[Enter]   sa
User
Password

A new database called testdb can be created with the shell tool.

## Starting H2 server

Now we are going to start H2 server.

$ java -jar lib/h2-2.1.214.jar -baseDir ~/tmp/h2dbs

We move to the installation directory and run H2 in server mode. The command
starts a web console application and two local connections; the PG server is a
PostgreSQL compatibility mode with PostgreSQL protocol. The directory where the
database files are generated is set to ~/tmp/h2dbs, where ~ stands
for home directory.

We go to the web console and connect to the testdb database with
the jdbc:h2:~/tmp/h2dbs/testdb URL. The database is generated in
~/tmp/h2dbs directory. The default user is sa.

ALTER USER sa SET PASSWORD 's$cret'

While in the console, we can set a password for user sa with the
ALTER USER statement.

cars_h2.sql
  

CREATE TABLE cars(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), price INT);
INSERT INTO cars(name, price) VALUES('Audi', 52642);
INSERT INTO cars(name, price) VALUES('Mercedes', 57127);
INSERT INTO cars(name, price) VALUES('Skoda', 9000);
INSERT INTO cars(name, price) VALUES('Volvo', 29000);
INSERT INTO cars(name, price) VALUES('Bentley', 350000);
INSERT INTO cars(name, price) VALUES('Citroen', 21000);
INSERT INTO cars(name, price) VALUES('Hummer', 41400);
INSERT INTO cars(name, price) VALUES('Volkswagen', 21600);

This is the SQL to create the cars table. We use this table in
one example.

## Java H2 Server example

In the next example, we select data from the cars table that we have created 
earlier.

$ java -jar lib/h2-2.1.214.jar -baseDir ~/tmp/h2dbs

For this example, we start the H2 server with:

com/zetcode/SimpleEx.java
  

package com.zetcode;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SimpleEx {

    public static void main(String[] args) {

        var url = "jdbc:h2:tcp://localhost:9092/~/tmp/h2dbs/testdb";
        var user = "sa";
        var passwd = "s$cret";

        var query = "SELECT * FROM cars";

        try (var con = DriverManager.getConnection(url, user, passwd);
             var st = con.createStatement();
             var rs = st.executeQuery(query)) {

            while (rs.next()) {

                System.out.printf("%d %s %d%n", rs.getInt(1),
                        rs.getString(2), rs.getInt(3));
            }

        } catch (SQLException ex) {

            var lgr = Logger.getLogger(SimpleEx.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

The example connects to the H2 server and executes a query. It returns all rows
from the cars table.

var url = "jdbc:h2:tcp://localhost:9092/~/tmp/h2dbs/testdb";

This is the URL for connecting to the H2 Server's testdb database.

$ javac com/zetcode/SimpleEx.java -d bin
$ java -cp bin:lib/* com.zetcode.SimpleEx 
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

We compile and run the program.

## Source

[H2 database tutorial](https://www.h2database.com/html/tutorial.html)

Java H2 tutorial showed how to program H2 database in Java.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).