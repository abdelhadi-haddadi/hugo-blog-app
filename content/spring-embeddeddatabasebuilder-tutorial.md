+++
title = "Spring EmbeddedDatabaseBuilder tutorial"
date = 2025-08-29T20:11:52.011+01:00
draft = false
description = "Spring EmbeddedDatabaseBuilder tutorial shows how to use EmbeddedDatabaseBuilder to create an H2 embedded database in a Spring application."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring EmbeddedDatabaseBuilder tutorial

last modified October 18, 2023

Spring EmbeddedDatabaseBuilder tutorial shows how to use EmbeddedDatabaseBuilder 
to create an H2 embedded database in a Spring application.

Spring is a popular Java application framework. 

## EmbeddedDatabaseBuilder

EmbeddedDatabaseBuilder is a Spring builder which provides convenient 
API to create an embedded datbase in a Spring application.

## Spring EmbeddedDatabaseBuilder example

The following example uses EmbeddedDatabaseBuilder to build 
an embedded H2 database. We use Spring JdbcTemplate to interact with the database.

pom.xml
src    
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           ├───config
│   │           │       DBConfig.java
│   │           └───model
│   │                   Car.java
│   └───resources
│       │   logback.xml
│       └───db
│               create-db.sql
│               insert-data.sql
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
    &lt;artifactId&gt;embeddeddatabasebuilderex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.3.23&lt;/spring-version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;com.h2database&lt;/groupId&gt;
            &lt;artifactId&gt;h2&lt;/artifactId&gt;
            &lt;version&gt;1.4.197&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;
            &lt;artifactId&gt;logback-classic&lt;/artifactId&gt;
            &lt;version&gt;1.4.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-context&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-core&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-jdbc&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
                &lt;artifactId&gt;exec-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;3.1.0&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;mainClass&gt;com.zetcode.Application&lt;/mainClass&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

This is the Maven build file for our Spring application.

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="INFO"/&gt;

    &lt;appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender"&gt;
        &lt;encoder&gt;
            &lt;Pattern&gt;%d{HH:mm:ss.SSS} %blue(%-5level) %magenta(%logger{36}) - %msg %n
            &lt;/Pattern&gt;
        &lt;/encoder&gt;
    &lt;/appender&gt;

    &lt;root&gt;
        &lt;level value="INFO" /&gt;
        &lt;appender-ref ref="consoleAppender" /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;

This is the Logback configuration file. 

The following two SQL scripts will be used by EmbeddedDatabaseBuilder
to create a cars table and insert data into it.

resources/db/schema.sql
  

CREATE TABLE cars(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(150), price INT);

The schema.sql creates the database table.

resources/db/data.sql
  

INSERT INTO cars(name, price) VALUES('Audi', 52642);
INSERT INTO cars(name, price) VALUES('Mercedes', 57127);
INSERT INTO cars(name, price) VALUES('Skoda', 9000);
INSERT INTO cars(name, price) VALUES('Volvo', 29000);
INSERT INTO cars(name, price) VALUES('Bentley', 350000);
INSERT INTO cars(name, price) VALUES('Citroen', 21000);
INSERT INTO cars(name, price) VALUES('Hummer', 41400);
INSERT INTO cars(name, price) VALUES('Volkswagen', 21600);

The data.sql inserts data into the table.

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

This is a Car class.

com/zetcode/config/DBConfig.java
  

package com.zetcode.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;

import javax.sql.DataSource;

@Configuration
public class DBConfig  {

    @Bean
    public DataSource dataSource() {

        var builder = new EmbeddedDatabaseBuilder();
        var db = builder
                .setType(EmbeddedDatabaseType.H2) // HSQL or DERBY
                .addScript("db/schema.sql")
                .addScript("db/data.sql")
                .build();
        return db;
    }

    @Bean
    public JdbcTemplate createJdbcTeamplate() {

        var template = new JdbcTemplate();
        template.setDataSource(dataSource());

        return template;
    }
}

The DBConfig uses the EmbeddedDatabaseBuilder to create 
an embedded H2 database. We also create a JdbcTemplate bean.

@Bean
public DataSource dataSource() {

    var builder = new EmbeddedDatabaseBuilder();
    var db = builder
            .setType(EmbeddedDatabaseType.H2) // HSQL or DERBY
            .addScript("db/schema.sql")
            .addScript("db/data.sql")
            .build();
    return db;
}

The method creates a datasource with EmbeddedDatabaseBuilder's build 
method. We specify the databas type with setType and add SQL scripts with 
addScript methods.

@Bean
public JdbcTemplate createJdbcTeamplate() {

    var template = new JdbcTemplate();
    template.setDataSource(dataSource());

    return template;
}

This method generates a new JdbcTemplate. We set the generated 
datasource to the template with setDataSource.

        

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.model.Car;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

@ComponentScan(basePackages = "com.zetcode")
public class Application {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    public static void main(String[] args) {

        var ctx = new AnnotationConfigApplicationContext(Application.class);
        var app = ctx.getBean(Application.class);

        app.run();

        ctx.close();
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private void run() {

        var sql = "SELECT * FROM cars";

        var cars = jdbcTemplate.query(sql, new BeanPropertyRowMapper&lt;&gt;(Car.class));

        cars.forEach(car -&gt; logger.info("{}", car));
    }
}

In the application, we execute a query which finds all cars. 

@Autowired
private JdbcTemplate jdbcTemplate;

A JdbcTemplate bean is injected.

var cars = jdbcTemplate.query(sql, new BeanPropertyRowMapper&lt;&gt;(Car.class));

An SQL query is executed with JdbcTemplate's query method.

cars.forEach(car -&gt; logger.info("{}", car));

The retrieved cars are written to the console.

$ mvn -q exec:java
19:13:35.753 INFO  com.zetcode.Application - Car{id=1, name='Audi', price=52642}
19:13:35.768 INFO  com.zetcode.Application - Car{id=2, name='Mercedes', price=57127}
19:13:35.768 INFO  com.zetcode.Application - Car{id=3, name='Skoda', price=9000}
19:13:35.768 INFO  com.zetcode.Application - Car{id=4, name='Volvo', price=29000}
19:13:35.768 INFO  com.zetcode.Application - Car{id=5, name='Bentley', price=350000}
19:13:35.768 INFO  com.zetcode.Application - Car{id=6, name='Citroen', price=21000}
19:13:35.768 INFO  com.zetcode.Application - Car{id=7, name='Hummer', price=41400}
19:13:35.768 INFO  com.zetcode.Application - Car{id=8, name='Volkswagen', price=21600}

We run the application.

In this article we have used EmbeddedDatabaseBuilder to create an 
embedded H2 database in a Spring application.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).