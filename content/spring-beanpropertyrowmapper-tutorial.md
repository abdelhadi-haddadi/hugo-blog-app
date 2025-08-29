+++
title = "Spring BeanPropertyRowMapper tutorial"
date = 2025-08-29T20:11:47.280+01:00
draft = false
description = "Spring BeanPropertyRowMapper tutorial shows how to convert a table row into a new instance of a specified bean class with BeanPropertyRowMapper."
image = ""
imageBig = ""
categories = ["spring"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring BeanPropertyRowMapper tutorial

last modified October 18, 2023

Spring BeanPropertyRowMapper tutorial shows how to convert a table row into
a new instance of a specified bean class with BeanPropertyRowMapper.

Spring is a popular Java application framework for creating enterprise
applications.

## Spring BeanPropertyRowMapper

BeanPropertyRowMapper is a RowMapper implementation that 
converts a table row into a new instance of the specified mapped target class. The mapped 
target class must be a top-level class and it must have a default or no-arg constructor. 

## Spring BeanPropertyRowMapper example

The following application reads all rows from a coutries table 
using BeanPropertyRowMapper. In the example, we use MySQL database.

countries.sql
  

CREATE TABLE countries(id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), population INT);

INSERT INTO countries(name, population) VALUES('China', 1382050000);
INSERT INTO countries(name, population) VALUES('India', 1313210000);
INSERT INTO countries(name, population) VALUES('USA', 324666000);
INSERT INTO countries(name, population) VALUES('Indonesia', 260581000);
INSERT INTO countries(name, population) VALUES('Brazil', 207221000);
INSERT INTO countries(name, population) VALUES('Pakistan', 196626000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Bangladesh', 162099000);
INSERT INTO countries(name, population) VALUES('Nigeria', 186988000);
INSERT INTO countries(name, population) VALUES('Russia', 146838000);
INSERT INTO countries(name, population) VALUES('Japan', 126830000);
INSERT INTO countries(name, population) VALUES('Mexico', 122273000);
INSERT INTO countries(name, population) VALUES('Philippines', 103738000);

This is some test data for our example.

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
│   │                   Country.java
│   └───resources
│           db.properties
│           logback.xml
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
    &lt;artifactId&gt;springbeanpropertyrowmapperex&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;17&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;17&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;5.3.23&lt;/spring-version&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;ch.qos.logback&lt;/groupId&gt;
            &lt;artifactId&gt;logback-classic&lt;/artifactId&gt;
            &lt;version&gt;1.4.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;5.1.47&lt;/version&gt;
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

        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-core&lt;/artifactId&gt;
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

In the pom.xml file we declare basic Spring dependencies. 
The BeanPropertyRowMapper is part of the spring-jdbc.

resources/db.properties
  

jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mydb
jdbc.username=user7
jdbc.password=s$cret

We have basic database properties in external file. 

resources/logback.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;configuration&gt;
    &lt;logger name="org.springframework" level="ERROR"/&gt;
    &lt;logger name="com.zetcode" level="INFO"/&gt;

    &lt;appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender"&gt;
        &lt;encoder&gt;
            &lt;Pattern&gt;%d{HH:mm:ss.SSS} [%thread] %blue(%-5level) %magenta(%logger{36}) - %msg %n
            &lt;/Pattern&gt;
        &lt;/encoder&gt;
    &lt;/appender&gt;

    &lt;root&gt;
        &lt;level value="INFO" /&gt;
        &lt;appender-ref ref="consoleAppender" /&gt;
    &lt;/root&gt;
&lt;/configuration&gt;

The logback.xml is a configuration file for the Logback logging library.

com/zetcode/model/Country.java
  

package com.zetcode.model;

import java.util.Objects;

public class Country {

    private Long id;
    private String name;
    private int population;

    public Country() {
    }

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

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Country country = (Country) o;
        return population == country.population &amp;&amp;
                Objects.equals(id, country.id) &amp;&amp;
                Objects.equals(name, country.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, population);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Country{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append(", population=").append(population);
        sb.append('}');
        return sb.toString();
    }
}

This is Country bean. It has id, name, 
and population attributes.

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
@PropertySource(value="classpath:db.properties", ignoreResourceNotFound=true)
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

DBConfig configures dataSource and jdbcTemplate
beans. It reads configuration data from db.properties file.

com/zetcode/Application.java
  

package com.zetcode;

import com.zetcode.model.Country;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

@ComponentScan("com.zetcode")
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

        var sql = "SELECT * FROM countries";

        var rowMapper = BeanPropertyRowMapper.newInstance(Country.class);
        var countries = jdbcTemplate.query(sql, rowMapper);

        countries.forEach(country -&gt; logger.info("{}", country));
    }
}

This is the main application class.

var sql = "SELECT * FROM countries";

We define a query to retrieve all rows from the countries table.

var rowMapper = BeanPropertyRowMapper.newInstance(Country.class);

We create a new instance of the BeanPropertyRowMapper for the Country
class.

var countries = jdbcTemplate.query(sql, rowMapper);

JdbcTemplate's query executes the SQL query. Table columns are automatically
mapped to bean attributes thanks to BeanPropertyRowMapper.

$ mvn -q exec:java
12:47:37.079 INFO  com.zetcode.Application - Country{id=1, name='China', population=1382050000}
12:47:37.082 INFO  com.zetcode.Application - Country{id=2, name='India', population=1313210000}
12:47:37.083 INFO  com.zetcode.Application - Country{id=3, name='USA', population=324666000}
12:47:37.084 INFO  com.zetcode.Application - Country{id=4, name='Indonesia', population=260581000}
12:47:37.084 INFO  com.zetcode.Application - Country{id=5, name='Brazil', population=207221000}
12:47:37.085 INFO  com.zetcode.Application - Country{id=6, name='Pakistan', population=196626000}
12:47:37.086 INFO  com.zetcode.Application - Country{id=7, name='Nigeria', population=186988000}
12:47:37.087 INFO  com.zetcode.Application - Country{id=8, name='Bangladesh', population=162099000}
12:47:37.088 INFO  com.zetcode.Application - Country{id=9, name='Nigeria', population=186988000}
12:47:37.088 INFO  com.zetcode.Application - Country{id=10, name='Russia', population=146838000}
12:47:37.089 INFO  com.zetcode.Application - Country{id=11, name='Japan', population=126830000}
12:47:37.090 INFO  com.zetcode.Application - Country{id=12, name='Mexico', population=122273000}
12:47:37.090 INFO  com.zetcode.Application - Country{id=13, name='Philippines', population=103738000}

We run the application. 

In this article we have used BeanPropertyRowMapper to map table rows 
to bean attributes.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring tutorials](/all/#spring).