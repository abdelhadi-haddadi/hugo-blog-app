+++
title = "Spring Boot @OneToMany"
date = 2025-08-29T20:12:25.357+01:00
draft = false
description = "Spring Boot @OneToMany tutorial shows how to create one-to-many relationship in a Spring Boot application."
image = ""
imageBig = ""
categories = ["springboot"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Spring Boot @OneToMany

last modified July 27, 2023

In this article we show how to create one-to-many relationship in a Spring Boot
application.

Spring is a popular Java application framework and Spring Boot
is an evolution of Spring which helps create stand-alone, production-grade Spring
based applications easily.

Entity is a Java object that is going to be persisted. Entity classes
are decorated with annotations such as @Id, @Table, or
@Column. There are relationships between entities (also called
associations.) The basic associations are one-to-one, one-to-many, and
many-to-many.

## The one-to-many relationship

In a one-to-many relationship, one record in a table can be associated with
one or more records in another table. For example, one customer can have
many orders.

Relationships may be unidirectional or bidirectional. In a unidirectional
relationship we have a navigational access in one direction, in a
bidirectional relationship, we have access in both directions. Suppose we
have two entities: User and Post. There is a one-to-many relationship
between the entities; one user may have multiple posts. In a unidirectional
relationship, we can get posts from a user. In a bidirectional, we can get
the user from the posts as well.

## Spring one-to-many unidirectional example

In the following example we create a simple Spring Boot application
with a unidirectional one-to-many relationship between two entities.

In the example, we have User and Post entities.
A user can have multiple posts; so there is a one-to-many relationship
between the two entities.

build.gradle
...
src
├───main
│   ├───java
│   │   └───com
│   │       └───zetcode
│   │           │   Application.java
│   │           │   MyRunner.java
│   │           ├───model
│   │           │       Post.java
│   │           │       User.java
│   │           └───repository
│   │                   PostRepository.java
│   │                   UserRepository.java
│   └───resources
│           application.properties
└───test
    └───java

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
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'com.h2database:h2'
}

This is the Gradle build.gradle file. We add the
spring-boot-starter-data-jpa starter and the in-memory H2 database.

resources/application.properties
  

spring.main.banner-mode=off
spring.jpa.show-sql=true
logging.pattern.console=%clr(%d{yy-MM-dd E HH:mm:ss.SSS}){blue} %clr(%-5p) %clr(%logger{0}){blue} %clr(%m){faint}%n

In the application.properties, we turn off the Spring banner,
enable SQL logging, and customize overall logging patterns.

com/zetcode/model/User.java
  

package com.zetcode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @OneToMany
    @JoinColumn
    private Set&lt;Post&gt; posts;

    public User() {}

    public User(String firstName, String lastName) {

        this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) &amp;&amp;
                Objects.equals(firstName, user.firstName) &amp;&amp;
                Objects.equals(lastName, user.lastName) &amp;&amp;
                Objects.equals(posts, user.posts);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastName, posts);
    }

    public Long getId() {
        return id;
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

    public Set&lt;Post&gt; getPosts() {
        return posts;
    }

    public void setPosts(Set&lt;Post&gt; posts) {
        this.posts = posts;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("User{");
        sb.append("id=").append(id);
        sb.append(", firstName='").append(firstName).append('\'');
        sb.append(", lastName='").append(lastName).append('\'');
        sb.append(", posts=").append(posts);
        sb.append('}');
        return sb.toString();
    }
}

This is the User model class. It has the following
fields: id, firstName, and lastName.

@OneToMany
@JoinColumn
private Set&lt;Post&gt; posts;

With the @OneToMany annotation and the Set collection,
we create a one-to-many relationship. The @JoinColumn creates a foreign
key in the corresponding users table. Without the @JoinColumn
annotation, Hibernate would create a users_posts join table.

com/zetcode/mode/Post.java
  

package com.zetcode.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;

@Entity
@Table(name="tasks")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    public Post() {}

    public Post(String name) {

        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id) &amp;&amp;
                Objects.equals(name, post.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Post{");
        sb.append("id=").append(id);
        sb.append(", name='").append(name).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

This is the Post model class. It has the following attributes:
id and name. It has no extra annotations for the
relationship.

**Note:** In Java enterprise applications it is a good practice to
define a service layer that works with repositories. For simplicity reasons, we
skip the service layer.

com/zetcode/repository/PostRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository&lt;Post, Long&gt; {

}

The PostRepository defines a storage place for post objects.

com/zetcode/repository/UserRepository.java
  

package com.zetcode.repository;

import com.zetcode.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository&lt;User, Long&gt; {

}

The UserRepository defines a storage place for user objects.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.Post;
import com.zetcode.model.User;
import com.zetcode.repository.PostRepository;
import com.zetcode.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class MyRunner implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(MyRunner.class);

    private final UserRepository userRepository;
    private final PostRepository postRepository;

    @Autowired
    public MyRunner(UserRepository userRepository, PostRepository postRepository) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {

        logger.info("Saving data");

        var p1 = new Post("Post 1");
        var p2 = new Post("Post 2");
        var p3 = new Post("Post 3");
        var p4 = new Post("Post 4");
        var p5 = new Post("Post 5");

        var u1 = new User("John", "Doe");
        var u2 = new User("Bobby", "Brown");
        var u3 = new User("Lucy", "Smith");

        u1.setPosts(Set.of(p1, p2, p3));
        u2.setPosts(Set.of(p4));
        u3.setPosts(Set.of(p5));

        postRepository.saveAll(List.of(p1, p2, p3, p4, p5));
        userRepository.saveAll(List.of(u1, u2, u3));

        userRepository.findById(1L).ifPresent(user -&gt;
                logger.info("{} {} has Posts: {}", user.getFirstName(),
                        user.getLastName(), user.getPosts()));

        userRepository.findById(2L).ifPresent(user -&gt;
                logger.info("{} {} has Posts: {}", user.getFirstName(),
                        user.getLastName(), user.getPosts()));
    }
}

In the MyRunner, we create users and posts. We define relationships
between users and posts.

private final UserRepository userRepository;
private final PostRepository postRepository;

@Autowired
public MyRunner(UserRepository userRepository, PostRepository postRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
}

We inject the two repositories.

@Override
@Transactional
public void run(String... args) throws Exception {

The database operations must be decorated with the @Transactional
annotation.

var p1 = new Post("Post 1");
var p2 = new Post("Post 2");
var p3 = new Post("Post 3");
var p4 = new Post("Post 4");
var p5 = new Post("Post 5");

var u1 = new User("John", "Doe");
var u2 = new User("Bobby", "Brown");
var u3 = new User("Lucy", "Smith");

We create five posts and three users.

u1.setPosts(Set.of(p1, p2, p3));
u2.setPosts(Set.of(p4));
u3.setPosts(Set.of(p5));

We associate posts with users.

postRepository.saveAll(List.of(p1, p2, p3, p4, p5));
userRepository.saveAll(List.of(u1, u2, u3));

The user and post objects are saved.

userRepository.findById(1L).ifPresent(User -&gt;
logger.info("{} {} has Posts: {}", User.getFirstName(),
        User.getLastName(), User.getPosts()));

We find all posts of user with Id 1.

com/zetcode/Application.java
  

package com.zetcode;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application  {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

This code sets up the Spring Boot application.

In this article we have worked with one-to-many relationship.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Spring Boot tutorials](/springboot/).