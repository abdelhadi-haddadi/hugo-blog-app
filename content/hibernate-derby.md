+++
title = "Hibernate Derby"
date = 2025-08-29T19:57:51.991+01:00
draft = false
description = "Hibernate Derby tutorial shows how to use the Hibernate ORM with the Derby database."
image = ""
imageBig = ""
categories = ["hibernate"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Hibernate Derby

last modified August 31, 2020

Hibernate Derby tutorial shows how to use the Hibernate ORM with the Derby
database.

## Hibernate

Hibernate is an object-relational mapping framework for the Java
language. It provides a framework for mapping an object-oriented domain model to
a relational database.
Object-relational mapping (ORM) is a programming technique for
converting data between incompatible type systems in object-oriented programming
languages.

Hibernate Query Language (HQL) is an object-oriented query language
similar to SQL. While SQL operates on tables and columns, HQL operates on
persistent objects and their properties. HQL understands inheritance,
polymorphism, and association. HQL queries are in the end translated by
Hibernate into SQL queries, which do some action on the database.

In addition to its native API, Hibernate contains an implementation of the Java
Persistence API (JPA).

## Apache Derby

Apache Derby is an is an open source relational database implemented
entirely in Java. Derby has a small footprint and is easy to deploy and install.
It supports both embedded and client/server modes.

## Hibernate artifacts

The hibernate.cfg.xml file defines the Hibernate configuration
information. It contains information about the database connection, resource
mappings, and other connection properties.

SessionFactory is the factory class through which we get sessions
and perform database operations. Session is the main runtime interface
between a Java application and Hibernate. The main function of the session is to
offer create, read, and delete operations for instances of mapped entity classes.

## Creating a database in Derby

We download Derby from the [https://downloads.apache.org/db/derby/](https://downloads.apache.org/db/derby/)
webpage. We unpack the file into a chosen directory.

~/bin/derby-10.15$ ls
bin  demo  derby_cars.sql  derby.log  docs  index.html  javadoc  KEYS  lib
LICENSE  NOTICE  RELEASE-NOTES.html  test  testdb

These are the contents of the Derby installation directory.

~/bin/derby-10.15$ java -jar lib/derbyrun.jar sysinfo
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
------------------ Java Information ------------------
Java Version:    13.0.4
Java Vendor:     Debian
Java home:       /usr/lib/jvm/java-13-openjdk-amd64
Java classpath:  lib/derbyrun.jar
OS name:         Linux
OS architecture: amd64
...

We get the system information.

We create a new testdb database in Derby. It will have a simple
cars table.

cars_derby.sql
  

CREATE TABLE cars(id INTEGER NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    (START WITH 1, INCREMENT BY 1), name VARCHAR(255), price INT);

INSERT INTO cars(name, price) VALUES('Audi', 52642);
INSERT INTO cars(name, price) VALUES('Mercedes', 57127);
INSERT INTO cars(name, price) VALUES('Skoda', 9000);
INSERT INTO cars(name, price) VALUES('Volvo', 29000);
INSERT INTO cars(name, price) VALUES('Bentley', 350000);
INSERT INTO cars(name, price) VALUES('Citroen', 21000);
INSERT INTO cars(name, price) VALUES('Hummer', 41400);
INSERT INTO cars(name, price) VALUES('Volkswagen', 21600);

This is the SQL to create the cars table; the id
of the car object is auto-incremented.

~/bin/derby-10.15$ java -jar lib/derbyrun.jar ij
Picked up _JAVA_OPTIONS: -Dawt.useSystemAAFontSettings=on -Dswing.aatext=true
ij version 10.15
ij&gt; CONNECT 'jdbc:derby:testdb;user=user7;create=true';

We run the ij tool and create the testdb database.

ij&gt; RUN 'cars_derby.sql'

We run the RUN command, we create the cars table.

~/bin/derby-10.15$ bin/startNetworkServer &amp;

We start the database with the startNetworkServer command.

## Derby with native Hibernate API and XML mapping

In this section, we create a Java console application that performs
some database tasks on a Derby database. We use the Hibernate native API and
XML mapping.

pom.xml
src
├── main
│&nbsp;&nbsp; ├── java
│&nbsp;&nbsp; │&nbsp;&nbsp; └── com
│&nbsp;&nbsp; │&nbsp;&nbsp;     └── zetcode
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── bean
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── Car.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── hibernate
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── Car.hbm.xml
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── main
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── HibernateDerbyEx.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         ├── service
│&nbsp;&nbsp; │&nbsp;&nbsp;         │&nbsp;&nbsp; └── CarService.java
│&nbsp;&nbsp; │&nbsp;&nbsp;         └── util
│&nbsp;&nbsp; │&nbsp;&nbsp;             └── HibernateUtils.java
│&nbsp;&nbsp; └── resources
│&nbsp;&nbsp;     └── hibernate.cfg.xml
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
    &lt;artifactId&gt;HibernateDerbyEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;properties&gt;
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;13&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;13&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.derby&lt;/groupId&gt;
            &lt;artifactId&gt;derbyclient&lt;/artifactId&gt;
            &lt;version&gt;10.15.2.0&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;org.hibernate&lt;/groupId&gt;
            &lt;artifactId&gt;hibernate-core&lt;/artifactId&gt;
            &lt;version&gt;5.4.10.Final&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;resources&gt;
            &lt;resource&gt;
                &lt;directory&gt;src/main/java&lt;/directory&gt;
                &lt;includes&gt;
                    &lt;include&gt;**/*.xml&lt;/include&gt;
                &lt;/includes&gt;
            &lt;/resource&gt;
            &lt;resource&gt;
                &lt;directory&gt;src/main/resources&lt;/directory&gt;
            &lt;/resource&gt;
        &lt;/resources&gt;
    &lt;/build&gt;

&lt;/project&gt;

In the pom.xml file, we define two dependencies: the hibernate-core
libraries and the derbyclient driver. In the &lt;build&gt; element,
we let the build system include XML files — we are going to place XML mapping files
into the src/main/java directory.

src/main/java/resources/hibernate.cfg.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;

&lt;hibernate-configuration&gt;
    &lt;session-factory&gt;
        &lt;property name="hibernate.connection.username"&gt;app&lt;/property&gt;
        &lt;property name="hibernate.connection.password"&gt;app&lt;/property&gt;
        &lt;property name="hibernate.connection.url"&gt;jdbc:derby://localhost:1527/testdb&lt;/property&gt;

        &lt;!-- Enable Hibernate's automatic session context management --&gt;
        &lt;property name="current_session_context_class"&gt;thread&lt;/property&gt;

        &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.DerbyTenSevenDialect&lt;/property&gt;
        &lt;mapping resource="com/zetcode/hibernate/Car.hbm.xml"/&gt;
    &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;

In the Hibernate configuration file, we provide the connection properties to the Derby database.
We enable Hibernate's automatic session context management and specify a Derby SQL dialect.
The mappings are added with the &lt;mapping&gt; element. We have one mapping — of a Car
object to the cars table.

com/zetcode/bean/Car.java
  

package com.zetcode.bean;

import java.util.Objects;

public class Car {

    private Long Id;
    private String Name;
    private Integer Price;

    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public Integer getPrice() {
        return Price;
    }

    public void setPrice(Integer Price) {
        this.Price = Price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Objects.equals(Id, car.Id) &amp;&amp;
                Objects.equals(Name, car.Name) &amp;&amp;
                Objects.equals(Price, car.Price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id, Name, Price);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Car{");
        sb.append("Id=").append(Id);
        sb.append(", Name='").append(Name).append('\'');
        sb.append(", Price=").append(Price);
        sb.append('}');
        return sb.toString();
    }
}

This is a Car bean. It has three attributes and corresponding
getters and setters.

com/zetcode/hibernate/Car.hbm.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-mapping PUBLIC "-//Hibernate/Hibernate Mapping DTD//EN"
"http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd"&gt;

&lt;hibernate-mapping&gt;
    &lt;class name="com.zetcode.bean.Car" table="cars" catalog="app"&gt;
        &lt;id name="Id" type="java.lang.Long"&gt;
            &lt;column name="Id" /&gt;
            &lt;generator class="identity" /&gt;
        &lt;/id&gt;
        &lt;property name="Name" type="string"&gt;
            &lt;column name="Name" length="30"/&gt;
        &lt;/property&gt;
        &lt;property name="Price" type="integer"&gt;
            &lt;column name="Price" /&gt;
        &lt;/property&gt;
    &lt;/class&gt;
&lt;/hibernate-mapping&gt;

In the Car.hbm.xml file, we provide the mapping between the Car
class and the CARS table. We map the attributes of the class to the columns
of the database table. The mapping is specified between the &lt;hibernate-mapping&gt;
and &lt;/hibernate-mapping&gt; elements.

&lt;generator class="identity" /&gt;

The generator element informs Hibernate what strategy is used
to generate primary keys. The identity generator class allows an
integer/bigint column to be auto-incremented on demand. This generator is supported by Derby.

com/zetcode/util/HibernateUtils.java
  

package com.zetcode.util;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtils {

    private HibernateUtils() {}

    private static final SessionFactory sessionFactory;

    static {
        try {
            sessionFactory = new Configuration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

   public static void shutdown() {

        getSessionFactory().close();
    }
}

The HibernateUtils is a helper class which handles startup and accesses
SessionFactory to obtain a session object. The session object is then
used to access the database.

sessionFactory = new Configuration().configure().buildSessionFactory();

This line creates a SessionFactory from the hibernate.cfg.xml
file.

getSessionFactory().close();

This line closes caches and connection pools.

com/zetcode/service/CarService.java
  

package com.zetcode.service;

import com.zetcode.bean.Car;
import com.zetcode.util.HibernateUtils;
import java.util.List;
import org.hibernate.Session;

public class CarService {

    private CarService() {};

    public static Car getCarById(Long id) {

        Car car;
        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            car = session.get(Car.class, id);
        }

        return car;
    }

    @SuppressWarnings("unchecked")
    public static List&lt;Car&gt; getCars() {

        List&lt;Car&gt; cars;
        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            cars = session.createQuery("from Car").list();
        }
        return cars;
    }

    public static void save(Car car) {

        try (Session session = HibernateUtils.getSessionFactory().openSession()) {
            session.beginTransaction();

            session.save(car);

            session.getTransaction().commit();
        }
    }
}

In the CarService class we have service methods to obtain a car by
its ID, get all cars, and save a new car.

try (Session session = HibernateUtils.getSessionFactory().openSession()) {
    car = session.get(Car.class, id);
}

The HibernateUtils is used to obtain and open a session object.
The Session's get() method returns the persistent
instance of the given entity class with the given identifier, or null
if there is no such persistent instance.

cars = session.createQuery("from Car").list();

The createQuery method creates a new instance of Query
for the given HQL query string. The from Car query returns
all instances of the Car class.

session.save(car);

The save method persists the given instance.

com/zetcode/main/HibernateDerbyEx.java
  

package com.zetcode.main;

import com.zetcode.bean.Car;
import com.zetcode.service.CarService;
import com.zetcode.util.HibernateUtils;
import java.util.List;

public class HibernateDerbyEx {

    public static void main(String[] args) {

        Long id = 1L;

        Car car = CarService.getCarById(id);

        System.out.println(car);

        Car newCar = new Car();

        newCar.setName("Toyota");
        newCar.setPrice(34500);

        CarService.save(newCar);

        List&lt;Car&gt; cars = CarService.getCars();

        for (Car mycar : cars) {

            System.out.println(mycar);
        }

        HibernateUtils.shutdown();
    }
}

This is the main application class. We get a car by its ID, save a new
car, and list all cars from the database table.

Long id = 1L;

Car car = CarService.getCarById(id);

We use a CarService's getCarById() method to
retrieve a car by its ID.

Car newCar = new Car();

newCar.setName("Toyota");
newCar.setPrice(34500);

CarService.save(newCar);

A new car is created and saved into the database.

List&lt;Car&gt; cars = CarService.getCars();

for (Car mycar : cars) {

    System.out.println(mycar);
}

We list all cars from the cars table.

HibernateUtils.shutdown();

In the end, we close opened resources.

## Derby with native Hibernate API and annotation mapping

In this section, we create a Java console application that performs some
database tasks on a Derby database. We use the Hibernate native API and
annotation mapping.

The pom.xml, CarService.java, HibernateDerbyEx.java,
HibernateUtils.java files do not change. The hibernate.cfg.xml 
and Car.java do change.

src/main/resources/hibernate.cfg.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE hibernate-configuration PUBLIC "-//Hibernate/Hibernate Configuration DTD//EN"
"http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd"&gt;

&lt;hibernate-configuration&gt;
    &lt;session-factory&gt;
        &lt;property name="hibernate.connection.username"&gt;app&lt;/property&gt;
        &lt;property name="hibernate.connection.password"&gt;ap&lt;/property&gt;
        &lt;property name="hibernate.connection.url"&gt;jdbc:derby://localhost:1527/testdb&lt;/property&gt;

        &lt;!-- Enable Hibernate's automatic session context management --&gt;
        &lt;property name="current_session_context_class"&gt;thread&lt;/property&gt;

        &lt;property name="hibernate.dialect"&gt;org.hibernate.dialect.DerbyTenSevenDialect&lt;/property&gt;
        &lt;mapping class="com.zetcode.bean.Car"&gt;&lt;/mapping&gt;
    &lt;/session-factory&gt;
&lt;/hibernate-configuration&gt;

In the hibernate.cfg.xml file, the &lt;mapping&gt; element has changed.

&lt;mapping class="com.zetcode.bean.Car"&gt;&lt;/mapping&gt;

We use a class attribute to point to the Java Entity, which
contains the mapping annotations.

com/zetcode/bean/Car.java
  

package com.zetcode.bean;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import java.util.Objects;

@Entity
@Table(name="cars")
public class Car {

    private Long Id;
    private String Name;
    private Integer Price;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return Id;
    }

    public void setId(Long Id) {
        this.Id = Id;
    }

    public String getName() {
        return Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public Integer getPrice() {
        return Price;
    }

    public void setPrice(Integer Price) {
        this.Price = Price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Objects.equals(Id, car.Id) &amp;&amp;
                Objects.equals(Name, car.Name) &amp;&amp;
                Objects.equals(Price, car.Price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(Id, Name, Price);
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Car{");
        sb.append("Id=").append(Id);
        sb.append(", Name='").append(Name).append('\'');
        sb.append(", Price=").append(Price);
        sb.append('}');
        return sb.toString();
    }
}

In the Car.java class, we define the mappings with the annotations.
The names of the class attributes and the names of the table columns are
automatically paired. If the names were different, we would have to specify the
column names with the @Column annotation.

@Entity
@Table(name="cars")
public class Car implements Serializable {

The class is decorated with the @Entity annotation; the @Table
annotation specifies the primary table for the annotated entity.

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
public Long getId() {

The @Id annotation specifies the primary key of an entity and
the @GeneratedValue provides for the specification of generation
strategies for the values of primary keys.

In this tutorial, we have presented the Hibernate ORM. We have used the Derby
database.