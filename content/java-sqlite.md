+++
title = "Java SQLite"
date = 2025-08-29T20:00:33.546+01:00
draft = false
description = "Java SQLite tutorial shows how to do database programming in SQLite with Java."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java SQLite

last modified July 15, 2024

 

In this article we show how to do database programming in SQLite with Java.

SQLite is a serverless, self-contained, and embedded database engine. It's a
library integrated within applications, allowing them to interact directly with
database files. SQLite supports ACID-compliant transactions and uses dynamic
types for tables. It's widely used in various systems, including web browsers,
operating systems, and mobile phones.

&lt;dependencies&gt;

    &lt;dependency&gt;
        &lt;groupId&gt;org.xerial&lt;/groupId&gt;
        &lt;artifactId&gt;sqlite-jdbc&lt;/artifactId&gt;
        &lt;version&gt;3.46.0.0&lt;/version&gt;
    &lt;/dependency&gt;

    &lt;dependency&gt;
        &lt;groupId&gt;org.jdbi&lt;/groupId&gt;
        &lt;artifactId&gt;jdbi3-core&lt;/artifactId&gt;
        &lt;version&gt;3.45.2&lt;/version&gt;
    &lt;/dependency&gt;

&lt;/dependencies&gt;

In the examples we use the sqlite-jdbc and jdbi3-core
artifacts.

## SQLite version

In the first example, we print the version of the SQLite database. We use Java
JDBC.

Main.java
  

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;

void main() {

    String query = "SELECT SQLITE_VERSION()";

    try (Connection con = DriverManager.getConnection("jdbc:sqlite:test.db");
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery(query)) {

        if (rs.next()) {

            System.out.println(rs.getString(1));
        }

    } catch (SQLException ex) {

        Logger lgr = Logger.getLogger(getClass().getName());
        lgr.log(Level.SEVERE, ex.getMessage(), ex);
    }
}

The program prints the version of the SQLite database. 

String query = "SELECT SQLITE_VERSION()";

To get the version of the database, we call the SQLITE_VERSION
function.

try (Connection con = DriverManager.getConnection("jdbc:sqlite:test.db");
        Statement st = con.createStatement();
        ResultSet rs = st.executeQuery(query)) {
    ...
}

We get the connection to the database. From the connection object, we create 
the statement. Later, we execute the query with executeQuery.

if (rs.next()) {

    System.out.println(rs.getString(1));
}

The next method moves the cursor forward one row from its current
position.

System.out.println(rs.getString(1));

The getString method retrieves the value of the designated column
in the current row of this ResultSet object as a
String. 

$ java Main.java
3.46.0

In the next example, we use Jdbi.

Main.java
  

import org.jdbi.v3.core.Jdbi;

void main() {

    String jdbcUrl = "jdbc:sqlite:test.db";

    Jdbi jdbi = Jdbi.create(jdbcUrl);

    String res = jdbi.withHandle(handle -&gt; handle.createQuery("SELECT SQLITE_VERSION()")
            .mapTo(String.class)
            .one());

    System.out.println(res);
}

We create a handle to the database with withHandle. Then we 
create a query with createQuery, map the result to String wtih 
mapTo and get the value with one.

## Batches

A batch refers to a group of SQL statements that are submitted and executed
together as a single unit. This functionality offers performance benefits and
simplifies code for certain database operations.

In the example, we use Jdbi.

Main.java
  

import org.jdbi.v3.core.Jdbi;

void main() {

    String jdbcUrl = "jdbc:sqlite:test.db";

    Jdbi jdbi = Jdbi.create(jdbcUrl);

    jdbi.withHandle(handle -&gt; handle.createBatch()
            .add("DROP TABLE IF EXISTS cars")
            .add("CREATE TABLE cars(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER)")
            .add("INSERT INTO cars(name, price) VALUES('Audi',52642)")
            .add("INSERT INTO cars(name, price) VALUES('Mercedes',57127)")
            .add("INSERT INTO cars(name, price) VALUES('Skoda',9000)")
            .add("INSERT INTO cars(name, price) VALUES('Volvo',29000)")
            .add("INSERT INTO cars(name, price) VALUES('Bentley',350000)")
            .add("INSERT INTO cars(name, price) VALUES('Citroen',21000)")
            .add("INSERT INTO cars(name, price) VALUES('Hummer',41400)")
            .add("INSERT INTO cars(name, price) VALUES('Volkswagen',21600)")
            .execute());

    System.out.println("Table created and data inserted using JDBI batch.");
}

In the test.db database, we create a new cars table. The statements are placed 
in a single batch. 

## Selecting a specific value

In the next example, we select a specific cell from a row. We use Jdbi.

Main.java
  

import org.jdbi.v3.core.Jdbi;

import java.util.Optional;

void main() {

    String jdbcUrl = "jdbc:sqlite:test.db";

    Jdbi jdbi = Jdbi.create(jdbcUrl);

    int id = 3;

    Optional&lt;String&gt; res = jdbi.withHandle(handle -&gt;
            handle.select("SELECT name FROM cars WHERE id = ?", id)
                    .mapTo(String.class)
                    .findOne());

    res.ifPresentOrElse(System.out::println, () -&gt; System.out.println("N/A"));
}

The findOne method returns the only row in the result set, if any.
It returns Optional.empty if zero rows are returned, or if the row
itself is null.

$ java Main.java
Skoda

## Retrieve rows

In the next example, we retrieve all rows from the table. We use JDBC.

Main.java
  

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

void main() {

    String query = "SELECT * FROM cars";

    try (Connection con = DriverManager.getConnection("jdbc:sqlite:test.db");
            PreparedStatement pst = con.prepareStatement(query);
            ResultSet rs = pst.executeQuery()) {

        while (rs.next()) {

            System.out.printf("%d %s %d%n", rs.getInt(1),
                    rs.getString(2), rs.getInt(3));
        }

    } catch (SQLException ex) {

        Logger lgr = Logger.getLogger(getClass().getName());
        lgr.log(Level.SEVERE, ex.getMessage(), ex);
    }
}

We execute the SELECT * FROM cars query. 

while (rs.next()) {

    System.out.printf("%d %s %d%n", rs.getInt(1),
            rs.getString(2), rs.getInt(3));
}

We loop over the result set and print all the rows.

$ java Main.java
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

In the next example, we retrieve all rows with Jdbi.

Main.java
  

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;

import java.util.List;

void main() {

    String jdbcUrl = "jdbc:sqlite:test.db";

    Jdbi jdbi = Jdbi.create(jdbcUrl);

    List&lt;Car&gt; cars = jdbi.withHandle(handle -&gt;
            handle.select("SELECT * FROM cars")
                    .registerRowMapper(Car.class, ConstructorMapper.of(Car.class))
                    .mapTo(Car.class)
                    .list());

    if (cars.isEmpty()) {

        System.out.println("No cars found.");
    } else {

        System.out.println("List of cars:");
        cars.forEach(System.out::println);
    }
}

public record Car(int id, String name, int price) {
}

The example uses a row mapper to automatically map each row to a
Car record.

## Prepared statements

When we write prepared statements, we use placeholders instead of directly
writing the values into the statements. Prepared statements increase security
and performance.

A PreparedStatement is an object which represents a precompiled SQL
statement in JDBC.

Main.java
  

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

void main() {

    int carPrice = 23999;
    String carName = "Oldsmobile";

    String sql = "INSERT INTO cars(name, price) VALUES(?, ?)";

    try (Connection con = DriverManager.getConnection("jdbc:sqlite:test.db")) {

        try (PreparedStatement pst = con.prepareStatement(sql)) {

            pst.setString(1, carName);
            pst.setInt(2, carPrice);
            pst.executeUpdate();

            System.out.println("A new car has been inserted");
        }

    } catch (SQLException ex) {

        Logger lgr = Logger.getLogger(getClass().getName());
        lgr.log(Level.SEVERE, ex.getMessage(), ex);
    }
}

The example inserts a new row into a table.

String sql = "INSERT INTO cars(name, price) VALUES(?, ?)";

When we write prepared statements, we use placeholders instead of directly
writing the values into the statements. Prepared statements are faster and guard
against SQL injection attacks. The ? is a placeholder which is going to be
filled later.

try (PreparedStatement pst = con.prepareStatement(sql)) {

    pst.setString(1, carName);
    pst.setInt(2, carPrice);
    pst.executeUpdate();

    System.out.println("A new car has been inserted");
}

We create a PreparedStatement with prepareStatement
and pass values to the placeholders. Then we execute the statements with 
executeUpdate.

In Jdbi, we use the bind method.

Main.java
  

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;

import java.util.Optional;

void main() {

    String jdbcUrl = "jdbc:sqlite:test.db";

    Jdbi jdbi = Jdbi.create(jdbcUrl);
    int id = 3;

    Optional&lt;Car&gt; res = jdbi.withHandle(handle -&gt; 
            handle.select("SELECT * FROM cars WHERE id = ?")
                    .registerRowMapper(Car.class, ConstructorMapper.of(Car.class))
                    .bind(0, id)
                    .mapTo(Car.class)
                    .findOne());

    res.ifPresentOrElse(System.out::println, () -&gt; System.out.println("N/A"));
}

public record Car(int id, String name, int price) {
}

The example selects a specific row and maps it into the Car record.
The binding of a value to a placeholder is done with bind.

$ java Main.java
Car[id=3, name=Skoda, price=9000]

## Source

[The sqlite-jdbc Github page](https://github.com/xerial/sqlite-jdbc)

In this article we have shown how to split strings in Java. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).