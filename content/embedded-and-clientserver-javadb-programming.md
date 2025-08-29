+++
title = "Embedded and client/server JavaDB programming"
date = 2025-08-27T23:20:45.312+01:00
draft = false
description = "In this tutorial, we create Java applications with JavaDB in embedded and client/server modes."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Embedded and client/server JavaDB programming

last modified July 13, 2020 

In this tutorial, we create Java applications with JavaDB in embedded and client/server modes.
We use JdbcTemplate to execute SQL statements.

JdbcTemplate is a tool for simplifying programming with the JDBC. It takes care 
of tedious and error-prone low-level details such as handling transactions, 
cleaning up resources, and correctly handling exceptions. JdbcTemplate is included 
in Spring's spring-jdbc module. 

## JavaDB

JavaDB is Apache Derby database shipped with JDK. Derby is a relational database management 
system written in Java. It implements an SQL-92 core subset, as well as some SQL-99 features. 
It uses IBM DB2 SQL syntax. Derby has a small footprint around 2MB. It has transaction support. 
The database format used by Derby is portable and platform independent.

$ ls $JAVA_HOME/db
3RDPARTY  bin  lib  LICENSE  NOTICE  README-JDK.html  RELEASE-NOTES.html

The JavaDB home directory can is located at $JAVA_HOME/db
directory.

## JDBC

JDBC is an API for the Java programming language that defines how a client 
may access a database. It provides methods for querying and updating data in 
a database. JDBC is oriented towards relational databases. From a technical 
point of view, the API is as a set of classes in the java.sql package. 
To use JDBC with a particular database, we need a JDBC driver for that database.

## Client/server and embedded Derby applications

Derby can be used in Java applications in two basic ways: client/server and embedded.
For client/server applications, we use org.apache.derby.jdbc.ClientDriver
and for Derby embedded applications, we org.apache.derby.jdbc.EmbeddedDriver.

### Maven dependencies

There are two Maven dependencies for Derby drivers: derby and derbynet. The 
derby dependency is used for embedded applications and derbynet
for client/server applications.

&lt;dependency&gt;
    &lt;groupId&gt;org.apache.derby&lt;/groupId&gt;
    &lt;artifactId&gt;derby&lt;/artifactId&gt;
    &lt;version&gt;10.13.1.1&lt;/version&gt;
&lt;/dependency&gt;

This is the Maven dependency containing the derby driver.

&lt;dependency&gt;
    &lt;groupId&gt;org.apache.derby&lt;/groupId&gt;
    &lt;artifactId&gt;derbyclient&lt;/artifactId&gt;
    &lt;version&gt;10.13.1.1&lt;/version&gt;
&lt;/dependency&gt;

This is the Maven dependency containing the derbyclient driver.

### Connection strings

The connection strings are different for the client/server and embedded
applications.

jdbc:derby://localhost:1527/dbname

This is the connection URL for client/server applications.

jdbc:derby:dbname

This is the connection URL for embedded applications.

## The CARS table

In our applications, we use the following table:

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

$ $DERBY_HOME/bin/ij
ij version 10.11
ij&gt; CONNECT 'jdbc:derby:testdb';
ij&gt; RUN 'cars.sql';

With the ij tool, we create the table from the SQL script.

## JavaDB embedded application

In the following example, we retrieve all cars from the CARS table.
The application uses JavaDB in embedded mode.

When an application accesses a Derby database using the embedded driver,
the Derby engine does not run in a separate process, and there are no separate database
processes to start up and shut down. Instead, the Derby database engine runs inside 
the same Java Virtual Machine (JVM) as the application.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JavaDBEmbedded&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;    
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.derby&lt;/groupId&gt;
            &lt;artifactId&gt;derby&lt;/artifactId&gt;
            &lt;version&gt;10.13.1.1&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
            &lt;version&gt;4.3.7.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;        
        
    &lt;/dependencies&gt;       
    
&lt;/project&gt;

This is the Maven POM file. It contains these dependencies: 
derby and spring-jdbc.

com/zetcode/Car.java
  

package com.zetcode.bean;

public class Car {

    private Long Id;
    private String name;
    private int price;

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}

This is our Car bean. The instantiated class is filled with
database records from the CARS table.

com/zetcode/JavaDBEmbedded.java
  

package com.zetcode;

import com.zetcode.bean.Car;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class JavaDBEmbedded {
    
    public static void main(String[] args) {
        
        System.setProperty("derby.system.home", "/home/janbodnar/.derby");

        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setDriver(new org.apache.derby.jdbc.EmbeddedDriver());
        dataSource.setUrl("jdbc:derby:testdb;user=USER12");

        String sql = "SELECT * FROM Cars WHERE Id=?";
        Long id = 1L;
                
        JdbcTemplate jtm = new JdbcTemplate(dataSource);
        
        Car car = (Car) jtm.queryForObject(sql, new Object[] {id}, 
                new BeanPropertyRowMapper(Car.class));        

        System.out.printf("%d ", car.getId());
        System.out.printf("%s ", car.getName());
        System.out.printf("%d ", car.getPrice());
    }
}

The example connects to Derby in embedded mode. It retrieves a car object identified
by its ID.

System.setProperty("derby.system.home", "/home/janbodnar/.derby");

We tell where to look for the testdb database by setting
the Derby system home directory.

SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
dataSource.setDriver(new org.apache.derby.jdbc.EmbeddedDriver());

We set the EmbeddedDriver to the datasource.

dataSource.setUrl("jdbc:derby:testdb;user=USER12");

This is the URL to connect to the testdb database in the 
embedded mode and with the USER12 schema. 

String sql = "SELECT * FROM Cars WHERE Id=?";

This SQL statement selects a car object from the database.

JdbcTemplate jtm = new JdbcTemplate(dataSource);

A JdbcTemplate is created; it takes a data source 
as a parameter.

Car car = (Car) jtm.queryForObject(sql, new Object[] {id}, 
        new BeanPropertyRowMapper(Car.class));

We query for an object with the queryForObject method.
We provide the SQL statement, the parameter, and the row mapper. The BeanPropertyRowMapper
converts a row into a new instance of the Car target class. 

System.out.printf("%d ", car.getId());
System.out.printf("%s ", car.getName());
System.out.printf("%d ", car.getPrice());

We print the car data to the terminal.

1 Audi 52642 

This is the output of the application.

## JavaDB client/server application

In the second example, we create a JavaDB application in 
client/server mode. In this mode, Derby server is separated from 
the Java application.

$ $DERBY_HOME/bin/startNetworkServer &amp;

We start the Derby network server with the startNetworkServer tool.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;JavaDBClientServer&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;
    
    &lt;dependencies&gt;    
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.derby&lt;/groupId&gt;
            &lt;artifactId&gt;derbyclient&lt;/artifactId&gt;
            &lt;version&gt;10.13.1.1&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
            &lt;version&gt;4.3.7.RELEASE&lt;/version&gt;
        &lt;/dependency&gt;        
        
    &lt;/dependencies&gt;       
    
&lt;/project&gt;

This is the Maven POM file. It contains these dependencies: 
derbyclient and spring-jdbc.

com/zetcode/Car.java
  

package com.zetcode.bean;

public class Car {

    private Long Id;
    private String name;
    private int price;

    // getters and setter
}

This is our Car bean. 

com/zetcode/JavaDBClientServer.java
  

package com.zetcode.main;

import com.zetcode.bean.Car;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class JavaDBClientServer {

    public static void main(String[] args) {

        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setDriver(new org.apache.derby.jdbc.ClientDriver());
        dataSource.setUrl("jdbc:derby://localhost:1527/testdb;user=USER12");

        String sql = "SELECT * FROM Cars WHERE Id=?";
        Long id = 1L;

        JdbcTemplate jtm = new JdbcTemplate(dataSource);

        Car car = (Car) jtm.queryForObject(sql, new Object[]{id},
                new BeanPropertyRowMapper(Car.class));

        System.out.printf("%d ", car.getId());
        System.out.printf("%s ", car.getName());
        System.out.printf("%d ", car.getPrice());
    }
}

In the JavaDBClientServer, we connect to the Derby network server
and retrieve a car from the CARS table.

dataSource.setDriver(new org.apache.derby.jdbc.ClientDriver());

For the client/server application, we need ClientDriver.

dataSource.setUrl("jdbc:derby://localhost:1527/testdb;user=USER12");

We use the connection string for the network server.

In this tutorial, we have learned how to create Java applications that use
JavaDB in embedded and client/server modes.