+++
title = "Spring Boot GeneratedKeyHolder"
date = 2025-08-29T20:12:17.516+01:00
draft = false
description = "Spring Boot GeneratedKeyHolder tutorial shows how to get auto-generated Ids from JDBC inserts. GeneratedKeyHolder is used to hold auto-generated keys potentionally returend from JDBC insert statements."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot GeneratedKeyHolder

last modified July 28, 2023

In this article we show how to get auto-generated Ids from JDBC inserts.
GeneratedKeyHolder is used to hold auto-generated keys potentionally returend
from JDBC insert statements.

Spring is a popular Java application framework for creating
enterprise applications. Spring Boot is an evolution of Spring
framework which helps create stand-alone, production-grade Spring based
applications with minimal effort.

## GeneratedKeyHolder

GeneratedKeyHolder is a standard implementation of the
KeyHolder interface, which is used for holding auto-generated keys.
The auto-generated keys are potentially returned by JDBC insert statements.

## Spring Boot GeneratedKeyHolder example

In the following example we use the GeneratedKeyHolder to retrieve
the Id of the created user. In a typical scenario, the applicaiton returns
the object that was created back to the user.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───mapper
│   │           │       UserMapper.java
│   │           ├───model
│   │           │       MaritalStatus.java
│   │           │       User.java
│   │           └───service
│   │                   IUserService.java
│   │                   UserService.java
│   └───resources
│           application.properties
│           schema-h2.sql
└───test
    └───java

This is the project structure.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    runtimeOnly 'com.h2database:h2'
}

This is the build.gradle file. The GeneratedKeyHolder
resides in the spring-boot-starter-jdbc dependency.

resources/application.properties
  

spring.main.banner-mode=off
spring.sql.init.platform=h2
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.url=jdbc:h2:mem:testdb

In the application.properties we turn off the banner and set
the database driver.

resources/schema-h2.sql
  

CREATE TABLE users(id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255), marital_status SMALLINT);

This is the SQL to create the users table.

com/zetcode/model/User.java
  

package com.zetcode.model;

import java.util.Objects;
import java.util.StringJoiner;

public class User {

    private Long id;
    private String name;
    private MaritalStatus maritalStatus;

    public User() {
    }

    public User(Long id, String name, MaritalStatus maritalStatus) {
        this.id = id;
        this.name = name;
        this.maritalStatus = maritalStatus;
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

    public MaritalStatus getMaritalStatus() {
        return maritalStatus;
    }

    public void setMaritalStatus(MaritalStatus maritalStatus) {
        this.maritalStatus = maritalStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &amp;&amp;
                Objects.equals(name, user.name) &amp;&amp;
                maritalStatus == user.maritalStatus;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, maritalStatus);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", User.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("name='" + name + "'")
                .add("maritalStatus=" + maritalStatus)
                .toString();
    }
}

This is the User model.

com/zetcode/model/MaritalStatus.java
  

package com.zetcode.model;

public enum MaritalStatus {
    SINGLE, MARRIED, DIVORCED, NOT_SPECIFIED
}

We have the MaritalStatus enumeration.

com/zetcode/mapper/UserMapper.java
  

package com.zetcode.mapper;

import com.zetcode.model.MaritalStatus;
import com.zetcode.model.User;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserMapper implements RowMapper&lt;User&gt; {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {

        return new User(rs.getLong("id"), rs.getString("name"),
                MaritalStatus.values()[rs.getInt("marital_status")]);
    }
}

The UserMapper maps a row from the result set to the User
model class.

com/zetcode/service/UserService.java
  

package com.zetcode.service;

import com.zetcode.model.MaritalStatus;
import com.zetcode.model.User;
import java.util.List;

public interface IUserService {

    List&lt;User&gt; findAll();
    User findById(Long id);
    User create(String name, MaritalStatus status);
}

We have three contract methods in the IUserService.

com/zetcode/service/UserService.java
  

package com.zetcode.service;

import com.zetcode.mapper.UserMapper;
import com.zetcode.model.MaritalStatus;
import com.zetcode.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreatorFactory;
import org.springframework.jdbc.core.SqlParameter;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Service;

import java.sql.Types;
import java.util.List;
import java.util.Objects;

@Service
public class UserService implements IUserService {

    @Autowired
    private JdbcTemplate jtm;

    @Override
    public List&lt;User&gt; findAll() {

        String sql = "SELECT * FROM users";

        return jtm.query(sql, new UserMapper());
    }

    @Override
    public User findById(Long id) {

        String sql = "SELECT * FROM users WHERE id = ?";

        return jtm.queryForObject(sql, new UserMapper(), id);
    }

    @Override
    public User create(String name, MaritalStatus status) {

        String sql = "INSERT INTO users(name, marital_status) VALUES (?, ?)";

        var decParams = List.of(new SqlParameter(Types.VARCHAR, "name"),
                new SqlParameter(Types.INTEGER, "marital_status"));

        var pscf = new PreparedStatementCreatorFactory(sql, decParams) {
            {
                setReturnGeneratedKeys(true);
                setGeneratedKeysColumnNames("id");
            }
        };

        var psc = pscf.newPreparedStatementCreator(List.of(name, status.ordinal()));

        var keyHolder = new GeneratedKeyHolder();
        jtm.update(psc, keyHolder);

        var uid = Objects.requireNonNull(keyHolder.getKey()).longValue();

        return findById(uid);
    }
}

We have the implementations of the three contract methods.

@Override
public List&lt;User&gt; findAll() {

    String sql = "SELECT * FROM users";

    return jtm.query(sql, new UserMapper());
}

The findAll method finds all users.

@Override
public User findById(Long id) {

    String sql = "SELECT * FROM users WHERE id = ?";

    return jtm.queryForObject(sql, new UserMapper(), id);
}

The findById method finds a user specified by its Id.

String sql = "INSERT INTO users(name, marital_status) VALUES (?, ?)";

This is the SQL to insert a new user to the users table.

var decParams = List.of(new SqlParameter(Types.VARCHAR, "name"),
    new SqlParameter(Types.INTEGER, "marital_status"));

We declare the two SqlParameters for the PreparedStatementCreatorFactory.

var pscf = new PreparedStatementCreatorFactory(sql, decParams) {
    {
        setReturnGeneratedKeys(true);
        setGeneratedKeysColumnNames("id");
    }
};

PreparedStatementCreatorFactory is a helper class that creates
multiple PreparedStatementCreator objects with different parameters
based on an SQL statement and a single set of parameter declarations.

var psc = pscf.newPreparedStatementCreator(List.of(name, status.ordinal()));

The newPreparedStatementCreator returns a new
PreparedStatementCreator for the given parameters.

var keyHolder = new GeneratedKeyHolder();
jtm.update(psc, keyHolder);

A GeneratedKeyHolder is created and passed with the
PreparedStatementCreator to the JdbcTemplate's update
method.

var uid = Objects.requireNonNull(keyHolder.getKey()).longValue();

We retrieve the auto-generated key value.

return findById(uid);

The retrieved key value is used to find the newly generated user object that
is returned back to the caller.

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

The Application sets up the Spring Boot application.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.MaritalStatus;
import com.zetcode.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(Application.class);

    private final IUserService userService;
    
    @Autowired
    public MyRunner(IUserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {

        var u1 = userService.create("John Doe", MaritalStatus.SINGLE);
        logger.info("{} created", u1);

        var u2 = userService.create("Bill Dennis", MaritalStatus.MARRIED);
        logger.info("{} created", u2);

        var u3 = userService.create("Lucia Smith", MaritalStatus.SINGLE);
        logger.info("{} created", u3);

        var u4 = userService.create("Robert Brown", MaritalStatus.NOT_SPECIFIED);
        logger.info("{} created", u4);

        var users = userService.findAll();
        logger.info("{}", users);
    }
}

In the MyRunner class, we create four users and later retrieve them
all.

$ ./gradlew bootRun

We start the application.

... Started Application in 1.304 seconds (JVM running for 1.74)
... User[id=1, name='John Doe', maritalStatus=SINGLE] created
... User[id=2, name='Bill Dennis', maritalStatus=MARRIED] created
... User[id=3, name='Lucia Smith', maritalStatus=SINGLE] created
... User[id=4, name='Robert Brown', maritalStatus=NOT_SPECIFIED] created
... [User[id=1, name='John Doe', maritalStatus=SINGLE], User[id=2, name='Bill Dennis' ...

The created and retrieved users are shown in the log.

In this article we have worked with the Spring Boot GeneratedKeyHolder.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).