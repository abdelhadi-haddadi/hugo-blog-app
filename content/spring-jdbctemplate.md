+++
title = "Spring JdbcTemplate"
date = 2025-08-29T19:52:44.077+01:00
draft = false
description = "Spring JdbcTemplate tutorial shows how to work with data using Spring's JdbcTemplate. We create classic Spring and Spring Boot applications which use JdbcTemplate."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring JdbcTemplate

last modified September 1, 2020 

Spring JdbcTemplate tutorial shows how to work with data using Spring's JdbcTemplate.
We MySQL database. We create classic Spring and Spring Boot applications which use
JdbcTemplate. ZetCode has a complete *e-book* for MySQL Java, which contains
an extended JdbcTemplate chapter: [MySQL Java programming e-book](/ebooks/mysqljava/).

## Table of contents

1. $1

2. $1

3. $1

4. $1

5. $1

6. $1

7. $1

8. $1

9. $1

## Spring

Spring is a popular Java application framework. JdbcTemplate is a
tool for simplifying programming with the JDBC. It takes care of tedious and error-prone
low-level details such as handling transactions, cleaning up resources,
and correctly handling exceptions. JdbcTemplate is included in Spring's
spring-jdbc module.
Spring Boot is a Spring's solution to create stand-alone, production-grade
Spring based applications.

MySQL is an open-source relational database management system. It is one
of the most popular databases. It is often used in web applications.

## MySQL create database

We use the mysql monitor to create a new testdb
database. 

cars_mysql.sql
  

DROP TABLE IF EXISTS cars;
CREATE TABLE cars(id INT PRIMARY KEY AUTO_INCREMENT,
                  name VARCHAR(255), price INTEGER) ENGINE=InnoDB;

INSERT INTO cars(name, price) VALUES('Audi', 52642);
INSERT INTO cars(name, price) VALUES('Mercedes', 57127);
INSERT INTO cars(name, price) VALUES('Skoda', 9000);
INSERT INTO cars(name, price) VALUES('Volvo', 29000);
INSERT INTO cars(name, price) VALUES('Bentley', 350000);
INSERT INTO cars(name, price) VALUES('Citroen', 21000);
INSERT INTO cars(name, price) VALUES('Hummer', 41400);
INSERT INTO cars(name, price) VALUES('Volkswagen', 21600);

This is the SQL to create the cars table in MySQL.

To create the database and the table, we use the mysql
monitor tool.

$ sudo service mysql start

MySQL is started with sudo service mysql start command.

$ mysql -u user7 -p

We connect to the database with the mysql monitor.

mysql&gt; CREATE DATABASE testdb;
Query OK, 1 row affected (0.02 sec)

With the CREATE DATABASE statement, a new database is created.

mysql&gt; USE testdb;
mysql&gt; SOURCE cars_mysql.sql

With the source command, we load and execute the cars_mysql.sql
file.

mysql&gt; SELECT * FROM cars;
+----+------------+--------+
| id | name       | price  |
+----+------------+--------+
|  1 | Audi       |  52642 |
|  2 | Mercedes   |  57127 |
|  3 | Skoda      |   9000 |
|  4 | Volvo      |  29000 |
|  5 | Bentley    | 350000 |
|  6 | Citroen    |  21000 |
|  7 | Hummer     |  41400 |
|  8 | Volkswagen |  21600 |
+----+------------+--------+
8 rows in set (0.00 sec)

We verify the data.

## Maven dependencies

For our applications, we need to download the database drivers and the
Spring modules. We do it with Maven.

&lt;dependency&gt;
    &lt;groupId&gt;org.springframework&lt;/groupId&gt;
    &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
    &lt;version&gt;5.1.3.RELEASE&lt;/version&gt;
&lt;/dependency&gt;

This will download the spring-jdbc module.

&lt;dependency&gt;
    &lt;groupId&gt;mysql&lt;/groupId&gt;
    &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
    &lt;version&gt;5.1.47&lt;/version&gt;
&lt;/dependency&gt;

This is the Maven dependency for the MySQL driver.

## The queryForObject() method

The queryForObject method executes an SQL query and
returns a result object. The result type is specified in the arguments.

com/zetcode/SpringDBQueryObjectEx.java
  

package com.zetcode;

import java.sql.SQLException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class SpringDBQueryObjectEx {

    public static void main(String[] args) throws SQLException {

        var ds = new SimpleDriverDataSource();
        ds.setDriver(new com.mysql.jdbc.Driver());
        ds.setUrl("jdbc:mysql://localhost:3306/testdb");
        ds.setUsername("user7");
        ds.setPassword("s$cret");

        var sql = "SELECT COUNT(*) FROM cars";

        var jtm = new JdbcTemplate(ds);
        int numOfCars = jtm.queryForObject(sql, Integer.class);

        System.out.format("There are %d cars in the table", numOfCars);
    }
}

In the example, we use the queryForObject method to get
the number of cars in the cars table.

var sql = "SELECT COUNT(*) FROM cars";

This SQL returns the number of rows in the cars table.

int numOfCars = jtm.queryForObject(sql, Integer.class);

The second parameter of the queryForObject method specifies
the type of the result; an Integer in our case.

## RowMapper

RowMapper maps rows of a result set on a per-row basis.
Implementations of this interface perform the actual
work of mapping each row to a result object.

com/zetcode/model/Car.java
  

package com.zetcode.model;

import java.util.Objects;

public class Car {

    private Long id;
    private String name;
    private int price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return price == car.price &amp;&amp;
                Objects.equals(id, car.id) &amp;&amp;
                Objects.equals(name, car.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, price);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Car{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", price=").append(price);
        sb.append('}');
        return sb.toString();
    }
}

We have a Car bean. It has id, name, and
price attributes.

com/zetcode/SpringDBRowMapper.java
  

package com.zetcode;

import java.sql.ResultSet;
import java.sql.SQLException;

import com.zetcode.model.Car;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

public class SpringDBRowMapper {

    public static void main(String[] args) throws SQLException {

        var ds = new SimpleDriverDataSource();
        ds.setDriver(new com.mysql.jdbc.Driver());
        ds.setUrl("jdbc:mysql://localhost:3306/testdb");
        ds.setUsername("user7");
        ds.setPassword("s$cret");

        var rm = (RowMapper&lt;Car&gt;) (ResultSet result, int rowNum) -&gt; {

            var car = new Car();

            car.setId(result.getLong("id"));
            car.setName(result.getString("name"));
            car.setPrice(result.getInt("price"));

            return car;
        };

        var sql = "SELECT * FROM cars WHERE id=?";
        Long id = 1L;

        var jtm = new JdbcTemplate(ds);
        var car = (Car) jtm.queryForObject(sql, new Object[]{id}, rm);

        System.out.println(car);
    }
}

In the example we use the RowMapper to map rows of the
result set to the Car object.

var rm = (RowMapper&lt;Car&gt;) (ResultSet result, int rowNum) -&gt; {

    var car = new Car();
    car.setId(result.getLong("id"));
    car.setName(result.getString("name"));
    car.setPrice(result.getInt("price"));

    return car;
};

This is the mapping of the result set rows to the Car object.

var car = (Car) jtm.queryForObject(sql, new Object[] {id}, rm);

The instance of the RowMapper is passed to the
queryForObject as the third parameter.

## BeanPropertyRowMapper

BeanPropertyRowMapper is a RowMapper implementation that
converts a row into a new instance of the specified mapped target class.
The mapped target class must be a top-level class and it must have a default
or no-arg constructor. Column names from the result set metadata are matched to
the public setters for the corresponding properties.

com/zetcode/model/Car.java
  

package com.zetcode.model;

public class Car {

    private Long id;
    private String name;
    private int price;

    // getters and setters etc.
}

This is the Car bean to which we map the cars table rows.

com/zetcode/SpringBeanPropertyRowMapper.java
  

package com.zetcode;

import com.zetcode.model.Car;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import java.sql.SQLException;

public class SpringBeanPropertyRowMapper {

    public static void main(String[] args) throws SQLException {

        var dataSource = new SimpleDriverDataSource();

        dataSource.setDriver(new com.mysql.jdbc.Driver());
        dataSource.setUrl("jdbc:mysql://localhost:3306/testdb");
        dataSource.setUsername("user7");
        dataSource.setPassword("s$cret");

        var sql = "SELECT * FROM cars WHERE id=?";
        Long id = 1L;

        var jtm = new JdbcTemplate(dataSource);

        var car = (Car) jtm.queryForObject(sql, new Object[]{id},
                 BeanPropertyRowMapper.newInstance(Car.class));

        System.out.println(car);
    }
}

The example connects to the testdb database and
retrieves one car from the cars table.

var sql = "SELECT * FROM cars WHERE id=?";

This SQL statement selects a car object from the database.

var jtm = new JdbcTemplate(dataSource);

JdbcTemplate is created; it takes a data source
as a parameter.

var car = (Car) jtm.queryForObject(sql, new Object[]{id},
    BeanPropertyRowMapper.newInstance(Car.class));

With the queryForObject method, we query for an object. We
provide the SQL statement, the parameter, and the row mapper. The
BeanPropertyRowMapper
converts a row into a new instance of the Car target class.

System.out.println(car);

The retrieved car is printed to the terminal.

Car{id=1, name='Audi', price=52642}

The application prints the first row from the cars table.

## The queryForList() method

The queryForList method executes a query for a result list.
In the following example, we retrieve all cars from the cars table.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │               SpringDBQueryForList.java
│   └───resources
│           db.properties
└───test
    └───java

This is the project structure.

We place the datasource attributes into the db.properties file.
It is better to separate resources from the Java files.

resources/db.properties
  

jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/testdb
jdbc.username=user7
jdbc.password=s$cret

These are the properties for the MySQL database.

com/zetcode/SpringDBQueryForList.java
  

package com.zetcode;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Driver;
import java.util.List;
import java.util.Map;
import java.util.Properties;

public class SpringDBQueryForList {

    public static void main(String[] args) throws IOException,
            ClassNotFoundException {

        var prop = new Properties();
        prop.load(new FileInputStream("src/main/resources/db.properties"));

        var ds = new SimpleDriverDataSource();

        ds.setDriverClass(((Class&lt;Driver&gt;) Class.forName(prop.getProperty("jdbc.driver"))));
        ds.setUrl(prop.getProperty("jdbc.url"));
        ds.setUsername(prop.getProperty("jdbc.username"));
        ds.setPassword(prop.getProperty("jdbc.password"));

        var sql = "SELECT * FROM cars";

        var jtm = new JdbcTemplate(ds);
        var rows = (List&lt;Map&lt;String, Object&gt;&gt;) jtm.queryForList(sql);

        rows.forEach(System.out::println);
    }
}

The example connects to the MySQL testdb database and retrieves all rows
from the cars table.

var prop = new Properties();
prop.load(new FileInputStream("src/main/resources/db.properties"));

The data source properties are loaded from the db.properties file.

var ds = new SimpleDriverDataSource();

ds.setDriverClass(((Class&lt;Driver&gt;) Class.forName(prop.getProperty("jdbc.driver"))));
ds.setUrl(prop.getProperty("jdbc.url"));
ds.setUsername(prop.getProperty("jdbc.username"));
ds.setPassword(prop.getProperty("jdbc.password"));

We fill the SimpleDriverDataSource's attributes with the properties.

var jtm = new JdbcTemplate(ds);
var rows = (List&lt;Map&lt;String, Object&gt;&gt;) jtm.queryForList(sql);

JdbcTemplate's queryForList method returns
a list of rows from the table.

rows.forEach(System.out::println);

We go through the list and print the data to the terminal.

{id=1, name=Audi, price=52642}
{id=2, name=Mercedes, price=57127}
{id=3, name=Skoda, price=9000}
{id=4, name=Volvo, price=29000}
{id=5, name=Bentley, price=350000}
{id=6, name=Citroen, price=21000}
{id=7, name=Hummer, price=41400}
{id=8, name=Volkswagen, price=21600}

This is the output of the example.

## Using named parameters

NamedParameterJdbcTemplate is a template class with a basic set of
JDBC operations, allowing the use of named parameters rather than traditional
'?' placeholders.

resources/db.properties
  

jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/testdb
jdbc.username=user7
jdbc.password=s$cret

These are the properties for the MySQL database.

com/zetcode/model/Car.java
  

package com.zetcode.model;

public class Car {

    private Long id;
    private String name;
    private int price;

    // getters and setters etc.
}

This is the Car bean.

com/zetcode/SpringDBNamedParameters.java
  

package com.zetcode;

import com.zetcode.model.Car;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Driver;
import java.util.Properties;

public class SpringDBNamedParameters {

    public static void main(String[] args) throws IOException,
            ClassNotFoundException {

        var prop = new Properties();
        prop.load(new FileInputStream("src/main/resources/db.properties"));

        var ds = new SimpleDriverDataSource();
        ds.setDriverClass(((Class&lt;Driver&gt;) Class.forName(prop.getProperty("jdbc.driver"))));
        ds.setUrl(prop.getProperty("jdbc.url"));
        ds.setUsername(prop.getProperty("jdbc.username"));
        ds.setPassword(prop.getProperty("jdbc.password"));

        var sql = "SELECT * FROM cars WHERE name LIKE :name";
        var carName = "Volvo";

        var jtm = new NamedParameterJdbcTemplate(ds);

        var namedParams = new MapSqlParameterSource("name", carName);
        var car = (Car) jtm.queryForObject(sql, namedParams,
                BeanPropertyRowMapper.newInstance(Car.class));

        System.out.println(car);
    }
}

The example looks for a car name; its SQL code uses a named parameter.

var sql = "SELECT * FROM cars WHERE Name LIKE :name";

The SQL has the :name token, which is a named parameter.

var jtm = new NamedParameterJdbcTemplate(ds);

NamedParameterJdbcTemplate is used for named parameters.

var namedParams = new MapSqlParameterSource("name", carName);

MapSqlParameterSource is used to pass in a simple Map of parameter
values to the methods of the NamedParameterJdbcTemplate class.

var car = (Car) jtm.queryForObject(sql, namedParams,
        BeanPropertyRowMapper.newInstance(Car.class));

The named parameter is passed as the second argument to the queryForObject
method.

Car{id=4, name='Volvo', price=29000}

This is the output of the example.

## Classic Spring example with JdbcTemplate

In the following example, we create a classic command line Spring application that uses 
JdbcTemplate to connect to the database and issue SQL statements.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   ClassicSpringJdbcTemplate.java
│   │           ├───config
│   │           │       DBConfig.java
│   │           ├───model
│   │           │       Car.java
│   │           └───service
│   │                   CarService.java
│   │                   ICarService.java
│   └───resources
│           db.properties
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;classicspringex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;properties&gt;

        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.1.3.RELEASE&lt;/spring-version&gt;

    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;5.1.47&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-core&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-beans&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-context&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

&lt;/project&gt;

The Maven pom.xml file contains dependencies for the MySQL
driver, core Spring libraries, and JdbcTemplate.

com/zetcode/model/Car.java
  

package com.zetcode.model;

public class Car {

    private Long id;
    private String name;
    private int price;

    // getters and setters etc.
}

This is the Car bean.

resources/db.properties
  

jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/testdb
jdbc.username=user7
jdbc.password=s$cret

These are the database properties.

com/zetcode/config/DBConfig.java
  

package com.zetcode.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
@PropertySource(value = "classpath:db.properties", ignoreResourceNotFound = true)
public class DBConfig {

    @Autowired
    private Environment env;

    @Bean
    public DataSource dataSource() {

        var dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(env.getProperty("jdbc.driver"));
        dataSource.setUrl(env.getProperty("jdbc.url"));
        dataSource.setUsername(env.getProperty("jdbc.username"));
        dataSource.setPassword(env.getProperty("jdbc.password"));

        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate() {

        var template = new JdbcTemplate();
        template.setDataSource(dataSource());

        return template;
    }
}

DBConfig generates two beans: dataSource and 
jdbcTemplate. The database attributes are read from 
db.properties.

com/zetcode/service/ICarService.java
  

package com.zetcode.service;

import com.zetcode.model.Car;

import java.util.List;

public interface ICarService {

    Car findById(Long id);
    List&lt;Car&gt; all();
}

ICarService defines two contract methods: findById and 
all.

com/zetcode/service/CarService.java
  

package com.zetcode.service;

import com.zetcode.model.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService implements ICarService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List&lt;Car&gt; all() {

        return jdbcTemplate.query("SELECT * FROM cars",
                BeanPropertyRowMapper.newInstance(Car.class));
    }

    public Car findById(Long id) {

        var sql = "SELECT * FROM cars WHERE id=?";

        return jdbcTemplate.queryForObject(sql, new Object[]{id},
                BeanPropertyRowMapper.newInstance(Car.class));
    }
}

CarService has code that works with JdbcTemplate.

@Autowired
private JdbcTemplate jdbcTemplate;

Spring allows to inject dependencies with @Autowired. 
Using field injection, we add the jdbcTemplate bean which 
was generated in DBConfig.

com/zetcode/ClassicSpringJdbcTemplate.java
  

package com.zetcode;

import com.zetcode.model.Car;
import com.zetcode.service.ICarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan("com.zetcode")
public class ClassicSpringJdbcTemplate {

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(ClassicSpringJdbcTemplate.class);
        var app = ctx.getBean(ClassicSpringJdbcTemplate.class);

        app.run();

        ctx.close();
    }

    @Autowired
    private ICarService carService;

    private void run() {

        System.out.println("Fetching a car with Id 3");
        Long id = 3L;
        var car = (Car) carService.findById(id);
        System.out.println(car);

        System.out.println("Fetching all cars");
        var cars = carService.all();
        cars.forEach(System.out::println);
    }
}

The example  retrieves a specific row and all rows from the table with JdbcTemplate.

var ctx = new AnnotationConfigApplicationContext(ClassicSpringJdbcTemplate.class);

AnnotationConfigApplicationContext allows to create Spring beans with 
specific annotations such as @Service or @Configuration.

@Autowired
private CarService carService;

The database functionality is delegated to CarService, which is 
injected with @Autowired.

private void run() {

    System.out.println("Fetching a car with Id 3");
    Long id = 3L;
    var car = (Car) carService.findById(id);
    System.out.println(car);

    System.out.println("Fetching all cars");
    var cars = carService.all();
    cars.forEach(System.out::println);
}

We call the service methods to fetch specific row and fetch all rows.

Fetching a car with Id 3
Car{id=3, name='Skoda', price=9000}
Fetching all cars
Car{id=1, name='Audi', price=52642}
Car{id=2, name='Mercedes', price=57127}
Car{id=3, name='Skoda', price=9000}
Car{id=4, name='Volvo', price=29000}
Car{id=5, name='Bentley', price=350000}
Car{id=6, name='Citroen', price=21000}
Car{id=7, name='Hummer', price=41400}
Car{id=8, name='Volkswagen', price=21600}

This is the output.

## Spring Boot example with JdbcTemplate

In this example, we create a command line Spring Boot application that will use JdbcTemplate
to connect to the database. We will have two datasources: one for Derby and one
for MySQL. The project is available at the author's
[Github](https://github.com/janbodnar/Spring-Boot-JdbcTemplate) page.

pom.xml
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───config
│   │           │       AppConfig.java
│   │           ├───model
│   │           │       Car.java
│   │           ├───repository
│   │           │       CarRepository.java
│   │           │       ICarRepository.java
│   │           └───service
│   │                   CarService.java
│   │                   ICarService.java
│   └───resources
│           application.properties
└───test
    └───java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;springbootjdbctemplate&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;parent&gt;
        &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
        &lt;artifactId&gt;spring-boot-starter-parent&lt;/artifactId&gt;
        &lt;version&gt;2.1.1.RELEASE&lt;/version&gt;
    &lt;/parent&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;8.0.20&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
            &lt;artifactId&gt;spring-boot-starter-jdbc&lt;/artifactId&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
                &lt;artifactId&gt;spring-boot-maven-plugin&lt;/artifactId&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

The pom.xml file contains dependencies for the Spring Boot and MySQL.

resources/application.properties
  

mysql.datasource.driverClassName=com.mysql.cj.jdbc.Driver
mysql.datasource.jdbcUrl=jdbc:mysql://localhost:3306/testdb?serverTimezone=UTC
mysql.datasource.username=user7
mysql.datasource.password=s$cret

In the application.properties file, we define the MySQL datasource.

com/zetcode/config/AppConfig.java
  

package com.zetcode.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class AppConfig {

    @Bean
    @ConfigurationProperties(prefix = "mysql.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
}

In AppConfig, we create a MySQL datasource with DataSourceBuilder.

com/zetcode/model/Car.java
  

package com.zetcode.model;

public class Car {

    private Long id;
    private String name;
    private int price;

    // getters and setters etc.
}

This is the Car bean.

com/zetcode/repository/ICarRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.Car;

import java.util.List;

public interface ICarRepository {

    void saveCar(Car car);
    Car findCarByName(String name);
    List&lt;Car&gt; findAll();
}

ICarRepository contains methods for saving a new car, fetching 
a car by it name, and fetching all cars.

com/zetcode/repository/CarRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CarRepository implements ICarRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void saveCar(Car car) {

        var sql = "INSERT INTO cars(name, price) VALUES (?, ?)";
        Object[] params = new Object[] {car.getName(), car.getPrice()};

        jdbcTemplate.update(sql, params);
    }

    @Override
    public Car findCarByName(String name) {

        var sql = "SELECT * FROM cars WHERE name = ?";
        Object[] param = new Object[] {name};

        return jdbcTemplate.queryForObject(sql, param,
                BeanPropertyRowMapper.newInstance(Car.class));
    }

    @Override
    public List&lt;Car&gt; findAll() {

        var sql = "SELECT * FROM cars";

        return jdbcTemplate.query(sql, BeanPropertyRowMapper.newInstance(Car.class));
    }
}

CarRepository contains implementations of 
ICarRepository contracts. This is the layer that works with
JdbcTemplate.

com/zetcode/service/ICarService.java
  

package com.zetcode.service;

import com.zetcode.model.Car;

import java.util.List;

public interface ICarService {

    Car findByName(String name);
    List&lt;Car&gt; findAll();
}

We have two contract service methods.

com/zetcode/service/CarService.java
  

package com.zetcode.service;

import com.zetcode.model.Car;
import com.zetcode.repository.ICarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService implements ICarService {

    @Autowired
    private ICarRepository carRepository;

    public Car findByName(String name) {

        return carRepository.findCarByName(name);
    }

    public List&lt;Car&gt; findAll() {

        return carRepository.findAll();
    }
}

CarService contains implementations of ICarService
contracts. The service methods delegate to ICarRepository.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.Car;
import com.zetcode.service.ICarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    @Autowired
    private ICarService carService;

    @Override
    public void run(String... args) {

        try {
            var car = carService.findByName("Citroen");
            System.out.println(car);

        } catch (EmptyResultDataAccessException e) {
            System.out.println("Car was not found");
        }

        var cars = carService.findAll();

        for (Car car: cars) {
            System.out.println(car);
        }
    }
}

The Spring Boot command line application must implement the CommandLineRunner
interface. We put the code to be executed into the run method.

@Autowired
private ICarService carService;

Spring injects the carService bean.

try {
    var car = carService.findByName("Citroen");
    System.out.println(car);

} catch (EmptyResultDataAccessException e) {
    System.out.println("Car was not found");
}

We try to find a car with the name Citroen. If there is no
such a car, Spring throws an EmptyResultDataAccessException
exception.

var cars = carService.findAll();

for (Car car: cars) {
    System.out.println(car);
}

We retrieve all cars from the database with the findAll
method. The data is printed to the console.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {

        SpringApplication.run(Application.class, args);
    }
}

This is the entry point to Spring Boot application.

In this tutorial, we have presented the Spring's JdbcTemplate module. We have created a Spring
Boot application that utilizes JdbcTemplate. ZetCode has the following related tutorials:
[Java tutorial](/lang/java/),
[Spring JdbcTemplate tutorial](/articles/springjdbctemplate/),
[Spring EmbeddedDatabaseBuilder tutorial](/spring/embeddeddatabasebuilder/),
[EclipseLink tutorial](/java/eclipselink/), [Hibernate Derby tutorial](/db/hibernatederby/),
[Servlet FreeMarker JdbcTemplate tutorial](/articles/servletfreemarker/),
[MySQL Java tutorial](/db/mysqljava/), and
[PostgreSQL Java tutorial](/java/postgresql/).