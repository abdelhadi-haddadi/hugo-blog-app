+++
title = "Java Jdbi"
date = 2025-08-29T19:59:35.579+01:00
draft = false
description = "Learn how to use JDBI, a lightweight Java library built on top of JDBC. This tutorial covers its features, advantages, and best practices for efficient database interaction."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java Jdbi

last modified June 6, 2025

 

In this tutorial, we explore how to efficiently work with data using
JDBI, a powerful, lightweight library that simplifies database
interaction in Java. 

JDBI is built on top of JDBC, making database programming more
intuitive and less error-prone. It provides automatic exception handling,
efficient resource management, and robust tools for mapping query results
directly to Java objects. This significantly reduces boilerplate code and
improves maintainability.

At the core of JDBI is the DBI instance, which facilitates
connections to the database through Handle instances. A
Handle represents an active connection to the database, acting as a
wrapper around the standard JDBC Connection object. This
abstraction allows for cleaner transaction management and enhanced control over
queries.

JDBI supports two distinct styles of interaction:

  **Fluent API:** Provides a more dynamic, expressive way to
  build queries in a chainable manner, reducing redundant code.
  **Object API:** Maps SQL query results directly to Java
  objects, eliminating the need for manual result set processing.

By leveraging JDBI, developers can perform CRUD operations, manage transactions,
and integrate with advanced SQL techniques effortlessly. In the upcoming
sections, we will demonstrate practical examples, including inserting, retrieving,
updating, and deleting records using both APIs.

In the examples, we work with H2 and PostgreSQL databases.

&lt;dependency&gt;
    &lt;groupId&gt;org.jdbi&lt;/groupId&gt;
    &lt;artifactId&gt;jdbi3-core&lt;/artifactId&gt;
    &lt;version&gt;3.45.2&lt;/version&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
    &lt;groupId&gt;org.postgresql&lt;/groupId&gt;
    &lt;artifactId&gt;postgresql&lt;/artifactId&gt;
    &lt;version&gt;42.7.3&lt;/version&gt;
&lt;/dependency&gt;

&lt;dependency&gt;
    &lt;groupId&gt;com.h2database&lt;/groupId&gt;
    &lt;artifactId&gt;h2&lt;/artifactId&gt;
    &lt;version&gt;2.2.224&lt;/version&gt;
&lt;/dependency&gt;

For the examples, we need the following artifacts: jdbi3-core, 
postgresql, and h2.

## Simple query

In the next example, we execute a simple query.

Main.java
  

import org.jdbi.v3.core.Jdbi;

void main() {

    String jdbcUrl = "jdbc:h2:mem:";

    Jdbi jdbi = Jdbi.create(jdbcUrl);

    int res = jdbi.withHandle(handle -&gt; handle.createQuery("SELECT 2 + 2")
            .mapTo(Integer.class)
            .one());

    System.out.println(res);
}

The example creates an in-memory H2 database and executes the SELECT 2 +
2 statement. 

String jdbcUrl = "jdbc:h2:mem:";

This is the connection to an in-memory H2 database.

Jdbi jdbi = Jdbi.create(jdbcUrl);

We create the main entry point with Jdbi.create. It is a
configurable wrapper around a JDBC datasource. Use it to obtain
Handle instances and provide configuration for all handles obtained
from it.

int res = jdbi.withHandle(handle -&gt; handle.createQuery("SELECT 2 + 2")
        .mapTo(Integer.class)
        .one());

The withHandle is a convenience function which manages the
lifecycle of a handle and yields it to a callback for use by clients. A
Handle represents a connection to the database system. It is a
wrapper around a JDBC Connection object. Handle provides essential
methods for transaction management, statement creation, and other operations
tied to the database session.

The query returns an integer so we map the result to an integer with
mapTo. Since the returned value is a scalar, we call
one. It returns the only row in the result set. Returns null if the
row itself is null.

$ java Main.java
4

## Calling a database function

We call the H2VERSION function which returns the version of H2
database. 

Main.java
  

import org.jdbi.v3.core.Jdbi;

void main() {

    String jdbcUrl = "jdbc:h2:mem:";

    Jdbi jdbi = Jdbi.create(jdbcUrl);

    String res = jdbi.withHandle(handle -&gt; handle.createQuery("SELECT H2VERSION()")
            .mapTo(String.class)
            .one());

    System.out.println(res);
}

Since the function returns a string, we map thre result to a string with
mapTo. 

$ java Main.java 
2.2.224

For PostgreSQL, the VERSION database function returns the database 
version.

Main.java
  

import org.jdbi.v3.core.Jdbi;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

    String res = jdbi.withHandle(handle -&gt; handle.createQuery("SELECT VERSION()")
            .mapTo(String.class)
            .one());

    System.out.println(res);
}

For this example we also provide the username and password.

$ java Main.java 
PostgreSQL 16.0, compiled by Visual C++ build 1935, 64-bit

## Batches

A batch refers to a group of SQL statements that are submitted and executed
together as a single unit. This functionality offers performance benefits and
simplifies code for certain database operations.

Main.java
  

import org.jdbi.v3.core.Jdbi;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

    jdbi.withHandle(handle -&gt; handle.createBatch()
            .add("DROP TABLE IF EXISTS cars")
            .add("CREATE TABLE cars(id serial PRIMARY KEY, name VARCHAR(255), price INT)")
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

The example creates a cars table in the database. A new batch is created with
the createBatch method. Statements are added with the
add method. Finally, the whole batch is run with
execute.

## The one method

Queries are executed with select. The one method
returns when you expect the result to contain exactly one row. This method
returns null only if the returned row maps to null and
throws an exception if the result has zero or multiple rows.

Main.java
  

import org.jdbi.v3.core.Jdbi;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

    String res = jdbi.withHandle(handle -&gt; 
            handle.select("SELECT name FROM cars WHERE id = ?", 3)
                    .mapTo(String.class)
                    .one());

    System.out.println(res);
}

The example returns the name of a car for the specified Id. 

$ java Main.java
Skoda

## The findOne method

The findOne method returns an Optional.

Main.java
  

import org.jdbi.v3.core.Jdbi;

import java.util.Optional;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

    int id = 3;

    Optional&lt;String&gt; res = jdbi.withHandle(handle -&gt;
            handle.select("SELECT name FROM cars WHERE id = ?", id)
                    .mapTo(String.class)
                    .findOne());

    res.ifPresentOrElse(System.out::println, () -&gt; System.out.println("N/A"));
}

The example uses the Optional type for the return value. 

## Binding of parameters

Parameter binding is a mechanism to prevent SQL injection vulnerabilities and
improve code readability. You can bind values to placeholders within your SQL
statements, and JDBI handles setting the actual values for the database
execution.

Types of binding:

    - positional

    - named

    - bean binding

The following is a positional binding example:

Main.java
  

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;

import java.util.Optional;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

    int id = 3;

    Optional&lt;Car&gt; res = jdbi.withHandle(handle -&gt; 
            handle.select("SELECT * FROM cars WHERE id = ?", id)
                    .registerRowMapper(Car.class, ConstructorMapper.of(Car.class))
                    .mapTo(Car.class)
                    .findOne());

    res.ifPresentOrElse(System.out::println, () -&gt; System.out.println("N/A"));
}

public record Car(int id, String name, int price) {
}

The example maps a row to a Car record. The
registerRowMapper method registers an automatic mapper for the
Car.

The following example uses a named binding. 

Main.java
  

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;

import java.util.Optional;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

    int id = 3;

    Optional&lt;Car&gt; res = jdbi.withHandle(handle -&gt; 
            handle.select("SELECT * FROM cars WHERE id = :id")
                    .registerRowMapper(Car.class, ConstructorMapper.of(Car.class))
                    .bind("id", id)
                    .mapTo(Car.class)
                    .findOne());

    res.ifPresentOrElse(System.out::println, () -&gt; System.out.println("N/A"));
}

public record Car(int id, String name, int price) {
}

In addition, rather than passing the value in the select method, 
we call the bind method in which we bind the id name 
to the id variable's value.

$ java Main.java
Car[id=3, name=Skoda, price=9000]

## Mapping rows to a list

In the next example we map multiple rows to a list of cars.

Main.java
  

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;

import java.util.List;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

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

In the example, we select all cars from the table. We map the returned rows 
to a list of cars. 

$ java Main.java
List of cars:
Car[id=1, name=Audi, price=52642]
Car[id=2, name=Mercedes, price=57127]
Car[id=3, name=Skoda, price=9000]
Car[id=4, name=Volvo, price=29000]
Car[id=5, name=Bentley, price=350000]
Car[id=6, name=Citroen, price=21000]
Car[id=7, name=Hummer, price=41400]
Car[id=8, name=Volkswagen, price=21600]

## Transaction management

JDBI makes it easy to manage transactions. You can execute multiple operations
within a transaction and roll back if an error occurs.

Main.java
  

import org.jdbi.v3.core.Jdbi;

void main() {
    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);

    try {
        jdbi.useTransaction(handle -&gt; {
            handle.execute("INSERT INTO cars(name, price) VALUES('Toyota', 25000)");
            handle.execute("INSERT INTO cars(name, price) VALUES('Mazda', 22000)");
            // Uncomment the next line to simulate an error and trigger rollback
            // if (true) throw new RuntimeException("Simulated error");
        });
        System.out.println("Transaction committed.");
    } catch (Exception e) {
        System.out.println("Transaction rolled back: " + e.getMessage());
    }
}

The useTransaction method ensures that all statements are executed
in a transaction. If an exception is thrown, the transaction is rolled back.

## Custom RowMapper

You can create a custom RowMapper to map complex query results to
Java objects, such as when joining tables.

Main.java
  

package com.zetcode;

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;
import org.h2.jdbcx.JdbcDataSource;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

class CarWithOwner {
    public final String carName;
    public final String ownerName;

    public CarWithOwner(String carName, String ownerName) {
        this.carName = carName;
        this.ownerName = ownerName;
    }

    public String toString() {
        return carName + " owned by " + ownerName;
    }
}

class CarWithOwnerMapper implements RowMapper&lt;CarWithOwner&gt; {
    @Override
    public CarWithOwner map(ResultSet rs, StatementContext ctx) throws SQLException {
        return new CarWithOwner(rs.getString("car_name"), rs.getString("owner_name"));
    }
}

public class Main {
    public static void main(String[] args) {
        // Setup H2 Database
        JdbcDataSource dataSource = new JdbcDataSource();
        dataSource.setURL("jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1");
        dataSource.setUser("sa");
        dataSource.setPassword("");

        Jdbi jdbi = Jdbi.create(dataSource);

        // Create tables
        jdbi.useHandle(handle -&gt; {
            handle.execute("""
                CREATE TABLE owners (
                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255)
                )
            """);

            handle.execute("""
                CREATE TABLE cars (
                    id BIGINT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255),
                    owner_id BIGINT,
                    FOREIGN KEY (owner_id) REFERENCES owners(id)
                )
            """);

            // Insert test data
            handle.execute("INSERT INTO owners (name) VALUES (?)", "Alice");
            handle.execute("INSERT INTO owners (name) VALUES (?)", "Bob");

            handle.execute("INSERT INTO cars (name, owner_id) VALUES (?, ?)", "Toyota", 1);
            handle.execute("INSERT INTO cars (name, owner_id) VALUES (?, ?)", "Honda", 2);
        });

        // Query data with JDBI
        List&lt;CarWithOwner&gt; list = jdbi.withHandle(handle -&gt;
            handle.createQuery("SELECT c.name AS car_name, o.name AS owner_name FROM cars c JOIN owners o ON c.owner_id = o.id")
                .map(new CarWithOwnerMapper())
                .list()
        );

        // Print results
        list.forEach(System.out::println);
    }
}

This example demonstrates mapping joined table results to a custom object using
a custom RowMapper.

## SqlObjects

Jdbi SqlObjects is an extension for the Jdbi library that provides a declarative
way to interact with relational databases in Java.

&lt;dependency&gt;
    &lt;groupId&gt;org.jdbi&lt;/groupId&gt;
    &lt;artifactId&gt;jdbi3-sqlobject&lt;/artifactId&gt;
    &lt;version&gt;3.45.2&lt;/version&gt;
&lt;/dependency&gt;

We need to add the jdbi3-sqlobject dependency.

Main.java
  

import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.reflect.ConstructorMapper;
import org.jdbi.v3.sqlobject.SqlObject;
import org.jdbi.v3.sqlobject.SqlObjectPlugin;
import org.jdbi.v3.sqlobject.statement.SqlQuery;

import java.util.Optional;

void main() {

    String jdbcUrl = "jdbc:postgresql://localhost:5432/testdb";
    String user = "postgres";
    String password = "s$cret";

    Jdbi jdbi = Jdbi.create(jdbcUrl, user, password);
    jdbi.installPlugin(new SqlObjectPlugin());

    jdbi.registerRowMapper(Car.class, ConstructorMapper.of(Car.class));
    CarDao carDao = jdbi.onDemand(CarDao.class);

    int searchId = 2;
    Optional&lt;Car&gt; car = carDao.findById(searchId);

    if (car.isPresent()) {
        System.out.println("Car found: " + car.get());
    } else {
        System.out.println("Car with id " + searchId + " not found.");
    }

}

public record Car(int id, String name, int price) {
}

public interface CarDao extends SqlObject {

    @SqlQuery("SELECT * FROM cars WHERE id = ?")
    Optional&lt;Car&gt; findById(int id);
}

In the program, we define the query with the @SqlQuery for the 
function declaration in the CarDao interface.

CarDao carDao = jdbi.onDemand(CarDao.class);

The DAO object is created with onDemand.

int searchId = 2;
Optional&lt;Car&gt; car = carDao.findById(searchId);

We call the findById on the DAO object.

## Source

[JDBI documentation](https://jdbi.org/).

In this article we have worked with Java Jdbi library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).