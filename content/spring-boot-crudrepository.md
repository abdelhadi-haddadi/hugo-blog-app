+++
title = "Spring Boot CrudRepository"
date = 2025-08-29T20:12:09.985+01:00
draft = false
description = "SpringBoot CrudRepository tutorial shows how to use CrudRepository to manage data in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot CrudRepository

last modified July 20, 2023

SpringBoot CrudRepository tutorial shows how to use CrudRepository to manage
data in a Spring Boot application.

Spring is a popular Java application framework.
Spring Boot is an effort to create stand-alone, production-grade
Spring based applications with minimal effort.

## Spring Data

Spring Data is Spring-based programming model for data access. It
reduces the amount of code needed for working with databases and datastores. It
consists of several modules. The Spring Data JPA simplifies the development of
Spring applications that use JPA technology.

With Spring Data, we define a repository interface for each domain entity in the
application. A repository contains methods for performing CRUD operations,
sorting and paginating data. @Repository is a marker annotation,
which indicates that the underlying interface is a repository. A repository is
created by extending specific repository interfaces, such as
CrudRepository, PagingAndSortingRepository, or
JpaRepository.

Spring Data has advanced integration with Spring MVC controllers and
provides dynamic query derivation from repository method names.

## CrudRepository

CrudRepository implements basic CRUD operations, including count,
delete, deleteById, save, saveAll, findById, and findAll.

## Spring Boot CrudRepository example

The following Spring Boot application manages a User entity with
CrudRepository. The data is saved in H2 database. We use a RESTful
controller.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───controller
│   │           │       MyController.java
│   │           ├───model
│   │           │       User.java
│   │           ├───repository
│   │           │       UserRepository.java
│   │           └───service
│   │                   UserService.java
│   └───resources
└───test
    ├── java
    └── resources

This is the project structure.

build.gradle
  

plugins {
    id 'org.springframework.boot' version '3.1.1'
    id 'io.spring.dependency-management' version '1.1.0'
    id 'java'
}

group = 'com.zetcode'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '17'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'com.h2database:h2'
}

This is the Gradle build file. The spring-boot-starter-web is
starter for building web, including RESTful, applications using Spring MVC. The
spring-boot-starter-data-jpa is a starter for using Spring Data JPA
with Hibernate. The h2 brings the H2 test databse into the project.

com/zetcode/model/User.java
  

package com.zetcode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

    public User() {}

    public User(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {

        this.firstName = firstName;
    }

    public String getLastName() {

        return lastName;
    }

    public void setLastName(String lastName) {

        this.lastName = lastName;
    }

    public String getEmail() {

        return email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &amp;&amp;
                Objects.equals(firstName, user.firstName) &amp;&amp;
                Objects.equals(lastName, user.lastName) &amp;&amp;
                Objects.equals(email, user.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, email);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("User{");
        sb.append("id=").append(id);
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", email='").append(email).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

This is the User entity.

com/zetcode/service/UserService.java
  

package com.zetcode.service;

import com.zetcode.model.User;
import com.zetcode.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List&lt;User&gt; findAll() {

        var it = userRepository.findAll();

        var users = new ArrayList&lt;User&gt;();
        it.forEach(users::add);

        return users;
    }

    public Long count() {

        return userRepository.count();
    }

    public void deleteById(Long userId) {

        userRepository.deleteById(userId);
    }
}

This is the service class. The class provides three methods for finding all
users, counting users, and deleting a user by Id.

@Service
public class UserService {

Service classes are decorated with the @Service annotation in Spring.

private final UserRepository userRepository;

@Autowired
public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
}

We inject the UserRepository.

public List&lt;User&gt; findAll() {

    var it = userRepository.findAll();

    var users = new ArrayList&lt;User&gt;();
    it.forEach(e -&gt; users.add(e));

    return users;
}

The findAll method calls userRepository's
findAll method and retrieves all users.

com/zetcode/repository/UserRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository&lt;User, Long&gt; {
}

The UserRepository extends from the CrudRepository.
It provides the type of the entity and of its primary key.

com/zetcode/controller/MyController.java
  

package com.zetcode.controller;

import com.zetcode.model.User;
import com.zetcode.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MyController {

    private final UserService userService;

    @Autowired
    public MyController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List&lt;User&gt; allUsers() {

        return userService.findAll();
    }

    @GetMapping("/users/count")
    public Long count() {

        return userService.count();
    }

    @DeleteMapping("/users/{id}")
    public void delete(@PathVariable String id) {

        Long userId = Long.parseLong(id);
        userService.deleteById(userId);
    }
}

The controller class provides mapping for three requests. We can get all users,
count the number of users, and delete a user by its id. The data is returned in
JSON format.

@GetMapping("/users")
public List&lt;User&gt; allUsers() {

    return userService.findAll();
}

For getting all users, we use the @GetMapping annotation.

@DeleteMapping("/users/{id}")
public void delete(@PathVariable String id) {

    Long userId = Long.parseLong(id);
    userService.deleteById(userId);
}

We use @DeleteMapping for deleting a specific user.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.User;
import com.zetcode.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    private final UserRepository userRepository;

    @Autowired
    public MyRunner(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        logger.info("initializing users");

        var u1 = new User("Paul", "Smith", "paul.smith@gmail.com");
        userRepository.save(u1);

        var u2 = new User("Robert", "Black", "rb34@gmail.com");
        userRepository.save(u2);

        var u3 = new User("John", "Doe", "jdoe@gmail.com");
        userRepository.save(u3);
    }
}

In the MyRunner, we set up the data for the application.

var u1 = new User("Paul", "Smith", "paul.smith@gmail.com");
userRepository.save(u1);

We create a new user and save it with the repository's save
method.

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

$ ./gradlew bootRun

We start the application.

$ curl localhost:8080/users
[{"id":1,"firstName":"Paul","lastName":"Smith","email":"paul.smith@gmail.com"},
{"id":2,"firstName":"Robert","lastName":"Black","email":"rb34@gmail.com"},
{"id":3,"firstName":"John","lastName":"Doe","email":"jdoe@gmail.com"}]

We test the application with the curl tool.

In this article we have managed our application data with
CrudRepository.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).