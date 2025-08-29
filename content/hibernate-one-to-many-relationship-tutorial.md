+++
title = "Hibernate one-to-many relationship tutorial"
date = 2025-08-29T19:57:53.146+01:00
draft = false
description = "Hibernate one-to-many relationship tutorial shows how to create a one-to-many relationship between two entities in Hibernate with annotations."
image = ""
imageBig = ""
categories = ["hibernate"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Hibernate one-to-many relationship tutorial

last modified July 16, 2020 

Hibernate one-to-many relationship tutorial shows how to create a one-to-many 
relationship between two entities in Hibernate with annotations.

Hibernate is an object-relational mapping tool for the Java
programming language. It provides a framework for mapping an object-oriented
domain model to a relational database. 

Entity is a Java object that is going to be persisted. Entity classes are decorated with
Java annotations such as @Id, @Table, or @Column.

## @OneToMany

 

@OneToMany defines an association between two entities with one-to-many multiplicity. 
If the relationship is between the entities is bidirectional, the mappedBy element 
must be used to specify the relationship ownership. The mappedBy element is specified
in the non-owner side.

## Hibernate one-to-many mapping example

In our application, we create a one-to-many relationship between two classes: Continent
and Country. We use native Hibernate configuration. In the example we use 
MySQL database.

$ tree
.
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   │   └── com
    │   │       └── zetcode
    │   │           ├── bean
    │   │           │   ├── Continent.java
    │   │           │   └── Country.java
    │   │           ├── main
    │   │           │   └── Application.java
    │   │           └── util
    │   │               ├── HibernateUtil.java
    │   │               └── HibernateUtils.java
    │   └── resources
    │       ├── hibernate.cfg.xml
    │       └── log4j.properties
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
    &lt;artifactId&gt;HibernateOneToMany&lt;/artifactId&gt;
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
            &lt;version&gt;5.1.42&lt;/version&gt;
        &lt;/dependency&gt;    
    
        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;
            &lt;version&gt;5.2.8.Final&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;log4j&lt;/groupId&gt;
            &lt;artifactId&gt;log4j&lt;/artifactId&gt;
            &lt;version&gt;1.2.17&lt;/version&gt;
        &lt;/dependency&gt;        
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.slf4j&lt;/groupId&gt;
            &lt;artifactId&gt;slf4j-log4j12&lt;/artifactId&gt;
            &lt;version&gt;1.7.25&lt;/version&gt;
        &lt;/dependency&gt;           

    &lt;/dependencies&gt;
&lt;/project&gt;

This is the Maven build file. The mysql-connector-java is a MySQL driver
and hibernate-core brings the core Hibernate functionality.
The log4j and slf4j-log4j12 are logging artifacts.

hibernate.cfg.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD//EN" 
"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;

&lt;hibernate-configuration&gt;
    &lt;session-factory&gt;
        &lt;property name="hibernate.connection.driver_class"&gt;com.mysql.jdbc.Driver&lt;/property&gt;
        &lt;property name="hibernate.connection.username"&gt;testuser&lt;/property&gt;
        &lt;property name="hibernate.connection.password"&gt;test623&lt;/property&gt;
        &lt;property name="hibernate.connection.url"&gt;jdbc:mysql://localhost:3306/testdb?useSSL=false&lt;/property&gt;

        &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.MySQLDialect&lt;/property&gt;
        &lt;property name="hibernate.hbm2ddl.auto"&gt;create&lt;/property&gt;
        &lt;mapping class="com.zetcode.bean.Continent"&gt;&lt;/mapping&gt;
        &lt;mapping class="com.zetcode.bean.Country"&gt;&lt;/mapping&gt;
       
    &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;

The hibernate.cfg.xml is a standard Hibernate native configuration file. 
It is located in the src/main/resources directory.

We provide configuration options for the MySQL connection. The hibernate.dialect 
is set to MySQL Hibernate dialect. The hibernate.hbm2ddl.auto is set to create,
which means that the database schema is created at the application startup from the entities.
With the mapping tags, we specify two entities used in our application:
Continent and Country.

log4j.properties
  

log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target=System.out
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%d{HH:mm:ss,SSS} %-5p [%c] - %m%n

log4j.rootLogger=error, stdout
log4j.logger.org.hibernate=error

In the log4j.properties we set the logging level for org.hibernate
to error. This turns off many info messages from the output.

Continent.java
  

package com.zetcode.bean;

import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Continents")
public class Continent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int continent_id;

    @Column(name = "continent_name")
    private String name;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "continent_id")
    private Set&lt;Country&gt; countries;

    public Continent() {
    }

    public Continent(String name) {

        this.name = name;
    }

    public int getId() {
        return continent_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set&lt;Country&gt; getCountries() {
        return countries;
    }

    public void setCountries(Set&lt;Country&gt; countries) {
        this.countries = countries;
    }

    @Override
    public String toString() {
        return "Continent{" + "id=" + continent_id + ", name="
                + name + ", countries=" + countries + '}';
    }
}

This is the Continent entity.

@Entity
@Table(name = "Continents")
public class Continent {

The @Entity annotation specifies that the class is an entity. 
The @Table annotation specifies the primary table for the annotated entity. 

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private int continent_id;

The @Id annotation specifies the primary key of an entity while the 
@GeneratedValue provides for the specification of generation strategies 
for the values of primary keys.

@OneToMany(cascade = CascadeType.ALL)
@JoinColumn(name = "continent_id")
private Set&lt;Country&gt; countries;

A continent has multiple countries; this gives a *unidirectional* one-to-many
relationship between Continents and Countries. The multiplicity
is described by the Set interface in Java. 
The @OneToMany relationship defines a one-to-many relationship; 
the source object has an attribute that stores a collection of target objects.
The CascadeType specifies what operations are propagated to the 
related entities.

The @JoinColumn annotation defines the foreign key; it is the column
that associates the two tables.

Country.java
  

package com.zetcode.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Countries")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name="country_name")
    private String name;

    public Country() {
    }

    public Country(String name) {

        this.name = name;
    }

    public int getId() {
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
        return "Country{" + "id=" + id + ", name=" + name + '}';
    }
}

This is the Country entity.

HibernateUtil.java
  

package com.zetcode.util;

import org.hibernate.SessionFactory;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;

public class HibernateUtil {

    private SessionFactory sessionFactory;

    public HibernateUtil() {

        createSessionFactory();
    }

    private void createSessionFactory() {

        StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
                .configure() 
                .build();

        sessionFactory = new MetadataSources(registry).buildMetadata().buildSessionFactory();
    }

    public SessionFactory getSessionFactory() {

        return sessionFactory;
    }

    public void shutdown() {

        getSessionFactory().close();
    }
}

HibernateUtil is a utility class configures, builds, and closes 
the Hibernate SessionFactory. SessionFactory's main
job is to create sessions, which provide the central API for persistence operations.

Application.java
  

package com.zetcode.main;

import com.zetcode.bean.Continent;
import com.zetcode.bean.Country;
import com.zetcode.util.HibernateUtil;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.persistence.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class Application {

    public static void main(String[] args) {

        HibernateUtil hutil = new HibernateUtil();
        SessionFactory sessionFactory = hutil.getSessionFactory();

        try (Session session = sessionFactory.openSession()) {

            session.beginTransaction();

            Continent europe = new Continent("Europe");
            Continent asia = new Continent("Asia");

            Country svk = new Country("Slovakia");
            Country hun = new Country("Hungary");
            Country pol = new Country("Poland");

            Set&lt;Country&gt; europeCountries = new HashSet&lt;&gt;();
            europeCountries.add(svk);
            europeCountries.add(hun);
            europeCountries.add(pol);
            europe.setCountries(europeCountries);

            Country chi = new Country("China");
            Country afg = new Country("Afghanistan");

            Set&lt;Country&gt; asiaCountries = new HashSet&lt;&gt;();

            asiaCountries.add(chi);
            asiaCountries.add(afg);
            asia.setCountries(asiaCountries);

            session.save(europe);
            session.save(asia);

            Query query = session.createQuery("SELECT c FROM Country c");
            List&lt;Country&gt; countries = query.getResultList();

            countries.stream().forEach((x) -&gt; System.out.println(x));
            
            Query query2 = session.createQuery("SELECT DISTINCT cont FROM "
                    + "Continent cont JOIN cont.countries t WHERE cont.name='Europe'");
            Continent europe_cont = (Continent) query2.getSingleResult();

            System.out.println(europe_cont);  
            
            session.getTransaction().commit();

        } finally {

            hutil.shutdown();
        }
    }
}

In the Application, we create some entity classes and save them
to the database. Later, we do some queries.

HibernateUtil hutil = new HibernateUtil();
SessionFactory sessionFactory = hutil.getSessionFactory();

We build the SessionFactory.

try (Session session = sessionFactory.openSession()) {

From the session factory, we get the Session object, which
is the main interface to create, read, and delete operations.

session.beginTransaction();

The beginTransaction() method starts a transaction.

Continent europe = new Continent("Europe");
Continent asia = new Continent("Asia");

Country svk = new Country("Slovakia");
Country hun = new Country("Hungary");
Country pol = new Country("Poland");

Set&lt;Country&gt; europeCountries = new HashSet&lt;&gt;();
europeCountries.add(svk);
europeCountries.add(hun);
europeCountries.add(pol);
europe.setCountries(europeCountries);

Country chi = new Country("China");
Country afg = new Country("Afghanistan");

Set&lt;Country&gt; asiaCountries = new HashSet&lt;&gt;();

asiaCountries.add(chi);
asiaCountries.add(afg);
asia.setCountries(asiaCountries);

We create continents and countries. Since both continents and countries
are unique, we use Java sets.

session.save(europe);
session.save(asia);

With the save() method, two continents and their corresponding
countries are saved to the database.

Query query = session.createQuery("SELECT c FROM Country c");
List&lt;Country&gt; countries = query.getResultList();

The createQuery() method creates a new instance of Query 
for the given HQL query string. The query returns all instances of the 
Country class.

countries.stream().forEach((x) -&gt; System.out.println(x));

The countries are printed to the console.

Query query2 = session.createQuery("SELECT DISTINCT cont FROM "
        + "Continent cont JOIN cont.countries t WHERE cont.name='Europe'");
Continent europe_cont = (Continent) query2.getSingleResult();

System.out.println(europe_cont); 

The second query is a JOIN statement which finds all countries is Europe
continent.

session.getTransaction().commit();

The transaction is committed.

hutil.shutdown();

The session factory is closed.

Country{id=2, name=Slovakia}
Country{id=3, name=Poland}
Country{id=4, name=Hungary}
Country{id=6, name=China}
Country{id=7, name=Afghanistan}
Continent{id=1, name=Europe, countries=[Country{id=2, name=Slovakia}, 
  Country{id=3, name=Poland}, Country{id=4, name=Hungary}]}

This is the output.

mysql&gt; SELECT continent_name, country_name FROM Continents NATURAL LEFT JOIN Countries;
+----------------+--------------+
| continent_name | country_name |
+----------------+--------------+
| Europe         | Hungary      |
| Europe         | Slovakia     |
| Asia           | China        |
| Asia           | Afghanistan   |
+----------------+--------------+

A NATURAL LEFT JOIN gives this output.

In this tutorial, we have presented a one-to-many relationship between entities
in Hibernate.