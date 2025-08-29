+++
title = "Hibernate JPQL SELECT tutorial"
date = 2025-08-29T19:57:51.984+01:00
draft = false
description = "Hibernate JPQL SELECT tutorial shows how to execute JPQL SELECT statements in Hibernate. We use MySQL database."
image = ""
imageBig = ""
categories = ["hibernate"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Hibernate JPQL SELECT tutorial

last modified July 16, 2020

Hibernate JPQL SELECT tutorial shows how to execute JPQL SELECT statements in
Hibernate. We use MySQL database.

## Hibernate

Hibernate is an object-relational mapping tool for the Java
programming language. It provides a framework for mapping an object-oriented
domain model to a relational database.

## JPQL

Java Persistence Query Language (JPQL) is a platform-independent
object-oriented query language defined as part of the Java Persistence API (JPA)
specification. JPQL is used to make queries against entities stored in a
relational database. JPQL is inspired by SQL.

JPQL is object-oriented. In JPQL we work with entities and collection of
entities, while in SQL we work with columns and rows.

JPQL SELECT statement has the following syntax:

SELECT {select clause}
FROM {from clause}
[WHERE {where clause}]
[ORDER BY {order by clause}]
[GROUP BY {group by clause}]
[HAVING {having clause}]

The WHERE, ORDER BY, GROUP BY, and
HAVING clauses are optional.

## Hibernate JPQL SELECT example

The following application executes a couple of JPQL SELECT statements.

cities_mysql.sql
  

DROP TABLE IF EXISTS cities;
CREATE TABLE cities(id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100), population INT);

INSERT INTO cities(name, population) VALUES('Bratislava', 432000);
INSERT INTO cities(name, population) VALUES('Budapest', 1759000);
INSERT INTO cities(name, population) VALUES('Prague', 1280000);
INSERT INTO cities(name, population) VALUES('Warsaw', 1748000);
INSERT INTO cities(name, population) VALUES('Los Angeles', 3971000);
INSERT INTO cities(name, population) VALUES('New York', 8550000);
INSERT INTO cities(name, population) VALUES('Edinburgh', 464000);
INSERT INTO cities(name, population) VALUES('Berlin', 3671000);

This is SQL to create a cities table in MySQL.

$ tree
.
├── nbactions.xml
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── HibernateJpqlSelect.java
    │   │           └── model
    │   │               └── City.java
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
    &lt;artifactId&gt;HibernateJpqlSelect&lt;/artifactId&gt;
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
                    &lt;mainClass&gt;com.zetcode.HibernateJpqlSelect&lt;/mainClass&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;
&lt;/project&gt;

This is the Maven build file. The mysql-connector-java is a MySQL driver,
the hibernate-core brings the core Hibernate functionality, and
the log4j-slf4j-impl is a simple logging facade to the Log4j2 library.

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
      &lt;property name="hibernate.dialect" value="org.hibernate.dialect.MySQL5Dialect"/&gt;
    &lt;/properties&gt;
  &lt;/persistence-unit&gt;
&lt;/persistence&gt;

The persistence.xml file is a standard configuration file in JPA.
It has to be included in the META-INF directory inside the JAR file
that contains the entity beans. The persistence.xml file must
define a persistence-unit with a unique name in the current scoped classloader.
The provider attribute specifies the underlying implementation of the JPA
EntityManager.

We provide configuration options for the MySQL connection. The
hibernate.dialect is set to MySQL Hibernate dialect.

City.java
  

package com.zetcode.model;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cities")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private int population;

    public City() {
    }

    public City(String name, int population) {
        this.name = name;
        this.population = population;
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
    public int hashCode() {
        int hash = 7;
        hash = 79 * hash + Objects.hashCode(this.id);
        hash = 79 * hash + Objects.hashCode(this.name);
        hash = 79 * hash + this.population;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final City other = (City) obj;
        if (this.population != other.population) {
            return false;
        }
        if (!Objects.equals(this.name, other.name)) {
            return false;
        }
        return Objects.equals(this.id, other.id);
    }

    @Override
    public String toString() {

        StringBuilder builder = new StringBuilder();
        builder.append("City{id=").append(id).append(", name=")
                .append(name).append(", population=")
                .append(population).append("}");

        return builder.toString();
    }
}

This is the City entity.

@Entity
@Table(name = "cities")
public class City {

The @Entity annotation specifies that the class is an entity.
The @Table annotation specifies the primary table for the annotated entity.

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;

The @Id annotation specifies the primary key of an entity while the
@GeneratedValue provides for the specification of generation strategies
for the values of primary keys.

HibernateJpqlSelect.java
  

package com.zetcode;

import com.zetcode.model.City;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class HibernateJpqlSelect {

    private static final String PERSISTENCE_UNIT_NAME = "my-pu";

    public static void main(String[] args) {

        EntityManagerFactory emf = Persistence.createEntityManagerFactory(
                PERSISTENCE_UNIT_NAME);
        EntityManager entityManager = emf.createEntityManager();

        try {

            entityManager.getTransaction().begin();

            String qlQuery = "SELECT c FROM City c";
            Query query = entityManager.createQuery(qlQuery);
            List&lt;City&gt; cities = query.getResultList();

            cities.stream().forEach((x) -&gt; System.out.println(x));

            String qlQuery2 = "SELECT COUNT(c) FROM City c";
            Query query2 = entityManager.createQuery(qlQuery2);
            Long nOfCities = (Long) query2.getSingleResult();

            System.out.printf("There are %d cities%n", nOfCities);

            String qlQuery3 = "SELECT c.name FROM City c WHERE c.population=1759000";
            Query query3 = entityManager.createQuery(qlQuery3);
            List&lt;String&gt; names = query3.getResultList();

            names.stream().forEach((x) -&gt; System.out.println(x));

            String qlQuery4 = "SELECT c FROM City c ORDER BY population DESC";
            Query query4 = entityManager.createQuery(qlQuery4);
            List&lt;City&gt; cities2 = query4.getResultList();

            cities2.stream().forEach((x) -&gt; System.out.println(x));

            String qlQuery5 = "SELECT SUM(c.population) FROM City c";
            Query query5 = entityManager.createQuery(qlQuery5);
            Long popSum = (Long) query5.getSingleResult();

            System.out.printf("Sum of city populations %d%n", popSum);

            entityManager.getTransaction().commit();

        } finally {

            entityManager.close();
            emf.close();
        }
    }
}

The example runs five JPQL SELECT statements.

EntityManagerFactory emf = Persistence.createEntityManagerFactory(
        PERSISTENCE_UNIT_NAME);
EntityManager entityManager = emf.createEntityManager();

An EntityManager is created from an EntityManagerFactory.
It is an interface to interact with the persistence context.

String qlQuery = "SELECT c FROM City c";
Query query = entityManager.createQuery(qlQuery);
List&lt;City&gt; cities = query.getResultList();

cities.stream().forEach((x) -&gt; System.out.println(x));

The SELECT c FROM City c is a JPQL query that returns all cities.
A Query is created with EntityManager's createQuery().
From a Query we get the result with getResultList().

String qlQuery2 = "SELECT COUNT(c) FROM City c";

With SELECT COUNT(c) FROM City c, we get the number of City entities.

String qlQuery3 = "SELECT c.name FROM City c WHERE c.population=1759000";

With SELECT c.name FROM City c WHERE c.population=1759000, we select an entity
whose population is equal to 1759000.

String qlQuery4 = "SELECT c FROM City c ORDER BY population DESC";

With SELECT c FROM City c ORDER BY population DESC, we have a list of entities
ordered by population in descending order.

String qlQuery5 = "SELECT SUM(c.population) FROM City c";

With SELECT SUM(c.population) FROM City c, we get the sum of all
city populations.

$ mvn exec:java -q
City{id=1, name=Bratislava, population=432000}
City{id=2, name=Budapest, population=1759000}
City{id=3, name=Prague, population=1280000}
City{id=4, name=Warsaw, population=1748000}
City{id=5, name=Los Angeles, population=3971000}
City{id=6, name=New York, population=8550000}
City{id=7, name=Edinburgh, population=464000}
City{id=8, name=Berlin, population=3671000}
There are 8 cities
Budapest
City{id=6, name=New York, population=8550000}
City{id=5, name=Los Angeles, population=3971000}
City{id=8, name=Berlin, population=3671000}
City{id=2, name=Budapest, population=1759000}
City{id=4, name=Warsaw, population=1748000}
City{id=3, name=Prague, population=1280000}
City{id=7, name=Edinburgh, population=464000}
City{id=1, name=Bratislava, population=432000}
Sum of city populations 21875000

In this tutorial, we have used JPQL SELECT statements in Hibernate.