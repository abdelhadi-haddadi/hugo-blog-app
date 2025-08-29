+++
title = "Hibernate one-to-one mapping tutorial"
date = 2025-08-29T19:57:53.098+01:00
draft = false
description = "Hibernate one-to-one mapping tutorial shows how to create a one-to-one mapping between two entities in Hibernate with annotations."
image = ""
imageBig = ""
categories = ["hibernate"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Hibernate one-to-one mapping tutorial

last modified July 16, 2020

Hibernate one-to-one mapping tutorial shows how to create a one-to-one mapping
between two entities in Hibernate with annotations.

Hibernate is an object-relational mapping tool for the Java
programming language. It provides a framework for mapping an object-oriented
domain model to a relational database.

Entity is a Java object that is going to be persisted. Entity classes are decorated with
Java annotations such as @Id, @Table, or @Column.

## @OneToOne

@OneToOne annotation marks the relationship between two entities
with one-to-one multiplicity. It is not normally necessary to specify the
associated target entity explicitly since it can usually be inferred from the
type of the object being referenced.  If the relationship is bidirectional, the
non-owning side must use the mappedBy element of the
@OneToOne annotation to specify the relationship field or property
of the owning side.

## Hibernate one-to-one mapping example

The following application creates a one-to-one mapping between two classes:
User and UserProfile. The one-to-one association is
bidirectional; i.e. we can refer to a UserProfile from
User and vice versa. We use MySQL.

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── HibernateOneToOne.java
    │   │           └── model
    │   │               ├── Gender.java
    │   │               ├── User.java
    │   │               └── UserProfile.java
    │   └── resources
    │       ├── log4j2.xml
    │       └── META-INF
    │           └── persistence.xml
    └── test
        └── java

This is the project structure.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;

    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;HibernateOneToOne&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;5.1.45&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;
            &lt;version&gt;5.2.8.Final&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.logging.log4j&lt;/groupId&gt;
            &lt;artifactId&gt;log4j-slf4j-impl&lt;/artifactId&gt;
            &lt;version&gt;2.10.0&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
                &lt;artifactId&gt;exec-maven-plugin&lt;/artifactId&gt;
                &lt;version&gt;1.5.0&lt;/version&gt;
                &lt;configuration&gt;
                    &lt;mainClass&gt;com.zetcode.HibernateOneToOne&lt;/mainClass&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

This is the Maven build file. The mysql-connector-java is a MySQL driver
and hibernate-core brings the core Hibernate functionality.
The log4j and slf4j-log4j12 are logging artifacts.

persistence.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;persistence version="2.1" xmlns="http://xmlns.jcp.org/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/persistence
http://xmlns.jcp.org/xml/ns/persistence/persistence_2_1.xsd"&gt;

  &lt;persistence-unit name="my-pu" transaction-type="RESOURCE_LOCAL"&gt;
    &lt;provider&gt;org.hibernate.jpa.HibernatePersistenceProvider&lt;/provider&gt;
    &lt;properties&gt;
      &lt;property name="javax.persistence.jdbc.url"
          value="jdbc:mysql://localhost:3306/testdb?useSSL=false"/&gt;
      &lt;property name="javax.persistence.jdbc.user" value="testuser"/&gt;
      &lt;property name="javax.persistence.jdbc.driver" value="com.mysql.jdbc.Driver"/&gt;
      &lt;property name="javax.persistence.jdbc.password" value="test623"/&gt;
      &lt;property name="hibernate.cache.provider_class"
          value="org.hibernate.cache.NoCacheProvider"/&gt;
      &lt;property name="hibernate.hbm2ddl.auto" value="update"/&gt;
      &lt;property name="hibernate.dialect" value="org.hibernate.dialect.MySQL5Dialect"/&gt;
    &lt;/properties&gt;
  &lt;/persistence-unit&gt;
&lt;/persistence&gt;

The persistence.xml file is a standard configuration file in JPA. It has to be
included in the META-INF directory inside the JAR file that contains the entity beans.
The persistence.xml file must define a persistence-unit with a unique name in the
current scoped classloader. The provider attribute specifies the underlying implementation
of the JPA EntityManager.

We provide configuration options for the MySQL connection. The hibernate.dialect
is set to MySQL Hibernate dialect. The hibernate.hbm2ddl.auto is set to update,
which means that the database schema is updated. If it does not exist, it is created.

log4j2.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;Configuration&gt;
  &lt;Appenders&gt;

    &lt;Console name="Console" target="SYSTEM_OUT"&gt;
      &lt;PatternLayout pattern="%d [%t] %-5level %logger - %m%n" /&gt;
    &lt;/Console&gt;

  &lt;/Appenders&gt;
  &lt;Loggers&gt;
    &lt;!-- Log everything in Hibernate --&gt;
    &lt;Logger name="org.hibernate" level="error" additivity="false"&gt;
      &lt;AppenderRef ref="Console" /&gt;
    &lt;/Logger&gt;

    &lt;!-- Log SQL statements --&gt;
    &lt;Logger name="org.hibernate.SQL" level="error" additivity="false"&gt;
      &lt;AppenderRef ref="Console" /&gt;
    &lt;/Logger&gt;

    &lt;!-- Log custom packages --&gt;
    &lt;Logger name="com.zetcode" level="error" additivity="false"&gt;
      &lt;AppenderRef ref="Console" /&gt;
    &lt;/Logger&gt;

    &lt;Root level="error"&gt;
      &lt;AppenderRef ref="Console" /&gt;
    &lt;/Root&gt;
  &lt;/Loggers&gt;
&lt;/Configuration&gt;

The log4j2.xml file is a configuration file for Log4j2.

User.java
  

package com.zetcode.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    @Column(name = "user_id")
    private Long id;

    private String name;
    private String email;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private UserProfile userProfile;

    public User() {
    }

    public User(String name, String email) {
        this.name = name;
        this.email = email;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserProfile getUserProfile() {
        return userProfile;
    }

    public void setUserProfile(UserProfile userProfile) {
        this.userProfile = userProfile;
    }

    @Override
    public String toString() {

        StringBuilder builder = new StringBuilder();
        builder.append("User{id=").append(id).append(", name=")
                .append(name).append(", email=")
                .append(email).append(", userProfile=")
                .append(userProfile).append("}");

        return builder.toString();
    }
}

This is the User entity.

@Entity
@Table(name = "users")
public class User {

The @Entity annotation specifies that the class is an entity.
The @Table annotation specifies the primary table for the annotated entity.
So in our code example, Hibernate creates a users table in the MySQL testdb
database.

@Id
@GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
@GenericGenerator(name = "native", strategy = "native")
@Column(name = "user_id")
private Long id;

The @Id annotation specifies the primary key of an entity while the
@GeneratedValue and @GenericGenerator provide for the
specification of generation strategies for the values of primary keys.

@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
@JoinColumn(name = "up_id", nullable = false)
private UserProfile userProfile;

A user can has only one profile. We use the @OneToOne mapping which
creates a one-to-one mapping between User and UserProfile entities.
The @JoinColumn annotation defines the foreign key; it is the column
that associates the two tables.

The CascadeType specifies what operations are propagated to the
related entities. The FetchType.LAZY strategy is a hint to the persistence provider
runtime that data should be fetched lazily when it is first accessed.

UserProfile.java
  

package com.zetcode.model;

import java.time.LocalDate;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    @Column(name="up_id")
    private Long id;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(length = 10)
    private Gender gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    private String address;

    @OneToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL,
        mappedBy = "userProfile")
    private User user;

    public UserProfile() {
    }

    public UserProfile(String phoneNumber, Gender gender,
            LocalDate dateOfBirth, String address) {
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {

        StringBuilder builder = new StringBuilder();
        builder.append("UserProfile{id=").append(id).append(", phoneNumber=")
                .append(phoneNumber).append(", gender=").append(gender)
                .append(", dateOfBirth=").append(dateOfBirth)
                .append(", address=").append(address).append("}");

        return builder.toString();
    }
}

This is the UserProfile entity.

@OneToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL, mappedBy = "userProfile")
private User user;

The mappedBy option is set on the non-owning side; it tells Hibernate
that the owner of the relationship is User's userProfile field.

Gender.java
  

package com.zetcode.model;

public enum Gender {

    MALE,
    FEMALE
}

This is the Gender enumeration.

HibernateOneToOne.java
  

package com.zetcode;

import com.zetcode.model.Gender;
import com.zetcode.model.User;
import com.zetcode.model.UserProfile;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class HibernateOneToOne {

    private static final String PERSISTENCE_UNIT_NAME = "my-pu";

    public static void main(String[] args) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory(
                PERSISTENCE_UNIT_NAME);
        EntityManager entityManager = emf.createEntityManager();

        try {

            entityManager.getTransaction().begin();

            User user1 = new User("Peter", "peter6@gmail.com");
            UserProfile uprof1 = new UserProfile("0956909433", Gender.MALE,
                    LocalDate.of(1987, Month.MARCH, 20), "Sturova 9, Bratislava");

            user1.setUserProfile(uprof1);
            uprof1.setUser(user1);

            entityManager.persist(user1);

            User user2 = new User("Lucia", "lucia12@yahoo.com");
            UserProfile uprof2 = new UserProfile("0854919671", Gender.FEMALE,
                    LocalDate.of(1993, Month.JULY, 12), "Bazova 12, Brezno");

            user2.setUserProfile(uprof2);
            uprof2.setUser(user2);

            entityManager.persist(user2);

            String qlQuery = "SELECT u FROM User u";
            Query query = entityManager.createQuery(qlQuery);
            List&lt;User&gt; users = query.getResultList();

            users.stream().forEach((user) -&gt; {

                System.out.println(user.getUserProfile().getDateOfBirth());

            });

            String qlQuery2 = "SELECT up FROM UserProfile up";
            Query query2 = entityManager.createQuery(qlQuery2);
            List&lt;UserProfile&gt; user_profiles = query2.getResultList();

            user_profiles.stream().forEach((user_profile) -&gt; {

                System.out.println(user_profile.getUser().getName());

            });

            entityManager.getTransaction().commit();

        } finally {

            entityManager.close();
            emf.close();
        }
    }
}

In the HibernateOneToOne, we create some entity classes, save them, and perform
two queries.

User user1 = new User("Peter", "peter6@gmail.com");
UserProfile uprof1 = new UserProfile("0956909433", Gender.MALE,
        LocalDate.of(1987, Month.MARCH, 20), "Sturova 9, Bratislava");

user1.setUserProfile(uprof1);
uprof1.setUser(user1);

A user and his profile is created. Note that we set a user to a profile and
a profile to a user.

entityManager.persist(user1);

A user is saved with the persist() method.

String qlQuery = "SELECT u FROM User u";
Query query = entityManager.createQuery(qlQuery);
List&lt;User&gt; users = query.getResultList();

users.stream().forEach((user) -&gt; {

    System.out.println(user.getUserProfile().getDateOfBirth());

});

In this query, we refer to the user profile via the user.

String qlQuery2 = "SELECT up FROM UserProfile up";
Query query2 = entityManager.createQuery(qlQuery2);
List&lt;UserProfile&gt; user_profiles = query2.getResultList();

user_profiles.stream().forEach((user_profile) -&gt; {

    System.out.println(user_profile.getUser().getName());

});

In the second query, we refer to a user via a user profile. This is the
essence of the bidirectional mapping between the two entities.

1987-03-20
1993-07-12
Peter
Lucia

This is the output.

mysql&gt; select * from users;
+---------+-------------------+-------+-------+
| user_id | email             | name  | up_id |
+---------+-------------------+-------+-------+
|       1 | peter6@gmail.com  | Peter |     1 |
|       2 | lucia12@yahoo.com | Lucia |     2 |
+---------+-------------------+-------+-------+
2 rows in set (0.00 sec)

mysql&gt; select * from user_profiles;
+-------+-----------------------+---------------+--------+--------------+
| up_id | address               | date_of_birth | gender | phone_number |
+-------+-----------------------+---------------+--------+--------------+
|     1 | Sturova 9, Bratislava | 1987-03-20    | MALE   | 0956909433   |
|     2 | Bazova 12, Brezno     | 1993-07-12    | FEMALE | 0854919671   |
+-------+-----------------------+---------------+--------+--------------+
2 rows in set (0.00 sec)

This is how Hibernate created the tables. The up_id is the foreign
key and is set in the relationship owner - the users table.

In this tutorial, we have presented a one-to-one association between entities
in Hibernate.