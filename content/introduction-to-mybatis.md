+++
title = "Introduction to MyBatis"
date = 2025-08-29T19:52:45.687+01:00
draft = false
description = "This is MyBatis Java tutorial. This tutorial covers the basics of MySQL programming with Java and MyBatis."
image = "images/mybatis_project.png"
imageBig = "images/mybatis_project.png"
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Introduction to MyBatis

last modified July 6, 2020 

This is MyBatis Java tutorial. This tutorial covers the basics
of MySQL programming with Java and MyBatis.

ZetCode has a complete *e-book* for MySQL Java, which contains
a MyBatis chapter: [MySQL Java programming e-book](/ebooks/mysqljava/).

## MyBatis

MyBatis is a Java persistence framework that couples objects with stored 
procedures or SQL statements using an XML descriptor or annotations. Unlike ORM frameworks, 
MyBatis does not map Java objects to database tables but Java methods to SQL statements. 
MyBatis allows to use all database functionality like stored procedures, views, queries of 
any complexity and vendor proprietary features.

The benefits of using MyBatis are:

- out-of-the-box table/query caching

- reduction of much of the JDBC boilerplate

- increased productivity

- separation of SQL code from Java classes

## About MySQL database

MySQL is a leading open source database management system. It is a multi user, 
multithreaded database management system. MySQL is especially popular on the web. 
MySQL comes in two versions: MySQL server system and MySQL
embedded system.

## Maven dependencies

In the pom.xml file, we add the following dependencies:

&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;mysql&lt;/groupId&gt;
        &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
        &lt;version&gt;5.1.40&lt;/version&gt;
    &lt;/dependency&gt;    
    
    &lt;dependency&gt;
        &lt;groupId&gt;org.mybatis&lt;/groupId&gt;
        &lt;artifactId&gt;mybatis&lt;/artifactId&gt;
        &lt;version&gt;3.4.2&lt;/version&gt;
    &lt;/dependency&gt;      
    
&lt;/dependencies&gt;           

The POM file has two dependencies: the MyBatis libraries and MySQL driver.

## MyBooks table

Some examples in this tutorial use the MyBooks table.

mybooks.sql
  

CREATE TABLE MyBooks(Id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  Author VARCHAR(30), Title VARCHAR(60),  Published INTEGER, Remark VARCHAR(150));
INSERT INTO MyBooks(Author, Title, Published, Remark) VALUES ('Leo Tolstoy', 'War and Peace', 1869, 'Napoleonic wars');    
INSERT INTO MyBooks(Author, Title, Published, Remark) VALUES ('Leo Tolstoy', 'Anna Karenina', 1878, 'Greatest book of love');
INSERT INTO MyBooks(Author, Title, Published, Remark) VALUES ('Jeff Prosise', 'Programming Windows with MFC', 1999, 'Classic book about MFC');
INSERT INTO MyBooks(Author, Title, Published, Remark) VALUES ('Tom Marrs', 'JBoss at Work', 2005, 'JBoss practical guide');
INSERT INTO MyBooks(Author, Title, Published, Remark) VALUES ('Debu Panda', 'EJB3 in Action', 2007, 'Introduction to Enterprice Java Beans');

These SQL commands create a MyBooks table in MySQL testdb database.

## MySQL version

In the first example, we get the version of MySQL. In this example we 
map objects to SQL statements using annotations.

![mybatis_project.png](images/mybatis_project.png)

Figure: MyBatisMySQLVersion project structure

This is the project structure in NetBeans.

mybatis-config.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd"&gt;
&lt;configuration&gt;
    &lt;environments default="development"&gt;
        &lt;environment id="development"&gt;
            &lt;transactionManager type="JDBC"/&gt;
            &lt;dataSource type="POOLED"&gt;
                &lt;property name="driver" value="com.mysql.jdbc.Driver"/&gt;
                &lt;property name="url" value="jdbc:mysql://localhost:3306/testdb"/&gt;
                &lt;property name="username" value="testuser"/&gt;
                &lt;property name="password" value="test623"/&gt;
            &lt;/dataSource&gt;
        &lt;/environment&gt;
    &lt;/environments&gt;
&lt;/configuration&gt;

Each MyBatis project has a primary XML configuration file. Here 
we have defined a datasource for MySQL.

MyMapper.java
  

package com.zetcode.version;

import org.apache.ibatis.annotations.Select;

public interface MyMapper {

    @Select("SELECT VERSION()")
    public String getMySQLVersion();
}

With the @Select annotation, we map the getMySQLVersion 
method to the SQL statement specified in the annotation. The SQL statement to 
get the version of MySQL is SELECT VERSION.

MyBatisMySQLVersion.java
  

package com.zetcode.version;

import java.io.IOException;
import java.io.Reader;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MyBatisMySQLVersion {

    private static SqlSessionFactory factory = null;

    public static void main(String[] args) throws IOException {

        String resource = "mybatis-config.xml";
        Reader reader = null;
        SqlSession session = null;

        reader = Resources.getResourceAsReader(resource);

        factory = new SqlSessionFactoryBuilder().build(reader);
        factory.getConfiguration().addMapper(MyMapper.class);
        
        reader.close();

        try {
            session = factory.openSession();
            String version = session.selectOne("getMySQLVersion");
            System.out.println(version);

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }
}

We connect to the database and get the version of MySQL.

String resource = "mybatis-config.xml";
Reader reader = null;
SqlSession session = null;

reader = Resources.getResourceAsReader(resource);

The configuration file is read.

factory = new SqlSessionFactoryBuilder().build(reader);

The SqlSessionFactoryBuilder is used to build SqlSession
instances.

factory.getConfiguration().addMapper(MyMapper.class);

With the addMapper method, we add the mapping class to 
the factory.

session = factory.openSession();

The openSession method creates an SqlSession.
SqlSession is the primary Java interface for working with MyBatis. Through 
this interface we execute commands, get mappers and manage transactions.

String version = session.selectOne("getMySQLVersion");

The selectOne method retrieves a single row mapped 
from the statement key. The statement key is the name of the method
in the mapper class.

System.out.println(version);

The version is printed to the console.

} finally {

    if (session != null) {
        session.close();
    }
}

In the end, the session is closed.

## MySQL version 2

In the second example, we are going to retrieve the version of MySQL too; 
this time we use an XML mapper instead of annotations.

mybatis-config.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd"&gt;
&lt;configuration&gt;
    &lt;environments default="development"&gt;
        &lt;environment id="development"&gt;
            &lt;transactionManager type="JDBC"/&gt;
            &lt;dataSource type="POOLED"&gt;
                &lt;property name="driver" value="com.mysql.jdbc.Driver"/&gt;
                &lt;property name="url" value="jdbc:mysql://localhost:3306/testdb"/&gt;
                &lt;property name="username" value="testuser"/&gt;
                &lt;property name="password" value="test623"/&gt;
            &lt;/dataSource&gt;
        &lt;/environment&gt;
    &lt;/environments&gt;
    
    &lt;mappers&gt;
        &lt;mapper resource="mymapper.xml"/&gt;
    &lt;/mappers&gt;    
    
&lt;/configuration&gt;

With the &lt;mappers&gt; tag, we specify the mapping file.

mymapper.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd"&gt;
  
&lt;mapper namespace="com.zetcode"&gt;
    
    &lt;select id="mysqlVersion" resultType="String"&gt;
        SELECT VERSION()
    &lt;/select&gt;
    
&lt;/mapper&gt;

We define the mapping with the &lt;select&gt; tag.

MyBatisMySQLVersion2.java
  

package com.zetcode.version2;

import java.io.IOException;
import java.io.Reader;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MyBatisMySQLVersion2 {

    private static SqlSessionFactory factory = null;

    public static void main(String[] args) throws IOException {

        String resource = "mybatis-config.xml";
        Reader reader = null;
        SqlSession session = null;

        reader = Resources.getResourceAsReader(resource);

        factory = new SqlSessionFactoryBuilder().build(reader);
        
        reader.close();

        try {
            session = factory.openSession();
            String version = session.selectOne("mysqlVersion");
            System.out.println(version);

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }
}

This is the main class. The difference is that we do not add a mapper with 
the addMapper, but it is read from the configuration file.

## MyBatis Java Config

It is possible to configure MyBatis in pure Java without using XML. In
the following example, we are going to find out the number of books
in the table.

MyMapper.java
  

package com.zetcode.map;

import org.apache.ibatis.annotations.Select;

public interface MyMapper {

    @Select("SELECT COUNT(*) FROM MyBooks")
    public int getNumberOfBooks();
}

MyMapper contains SQL code that counts the number of
rows in the MyBooks table.

MyDataSourceFactory.java
  

package com.zetcode.jconfig;

import java.util.Properties;
import javax.sql.DataSource;
import org.apache.ibatis.datasource.DataSourceFactory;
import org.apache.ibatis.datasource.pooled.PooledDataSource;

public class MyDataSourceFactory implements DataSourceFactory {
    
    private Properties prop;

    @Override
    public DataSource getDataSource() {

        PooledDataSource ds = new PooledDataSource();
        
        ds.setDriver(prop.getProperty("driver"));
        ds.setUrl(prop.getProperty("url"));
        ds.setUsername(prop.getProperty("user"));
        ds.setPassword(prop.getProperty("password"));
        
        return ds;
    }

    @Override
    public void setProperties(Properties prprts) {
         
        prop = prprts;
    }
}

MyDataSourceFactory creates a PooledDataSource
from the given properties. PooledDataSource is a simple, synchronous, 
thread-safe database connection pool.

MyBatisJavaConfClient.java
  

package com.zetcode.client;

import com.zetcode.jconfig.MyDataSourceFactory;
import com.zetcode.jconfig.MyMapper;
import java.io.IOException;
import java.util.Properties;
import javax.sql.DataSource;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.transaction.TransactionFactory;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;

public class MyBatisJavaConfClient {

    private static SqlSessionFactory sesFact = null;

    public static void main(String[] args) throws IOException {

        Properties prop = new Properties();
        prop.setProperty("driver", "com.mysql.jdbc.Driver");
        prop.setProperty("url", "jdbc:mysql://localhost:3306/testdb");
        prop.setProperty("user", "testuser");
        prop.setProperty("password", "test623");
        
        MyDataSourceFactory mdsf = new MyDataSourceFactory();
        mdsf.setProperties(prop);
        DataSource ds = mdsf.getDataSource();
        
        TransactionFactory trFact = new JdbcTransactionFactory();
        Environment environment = new Environment("development", trFact, ds);
        Configuration config = new Configuration(environment);
        config.addMapper(MyMapper.class);
        
        sesFact = new SqlSessionFactoryBuilder().build(config);

        try (SqlSession session = sesFact.openSession()) {
            
            int numOfBooks = session.selectOne("getNumberOfBooks");
            System.out.format("There are %d books", numOfBooks);
        }
    }
}

In the MyBatisJavaConfClient, we configure MyBatis with Java code, build 
the SQL session, and execute the getNumberOfBooks method.

Properties prop = new Properties();
prop.setProperty("driver", "com.mysql.jdbc.Driver");
prop.setProperty("url", "jdbc:mysql://localhost:3306/testdb");
prop.setProperty("user", "testuser");
prop.setProperty("password", "test623");

Here we set up the database properties.

MyDataSourceFactory mdsf = new MyDataSourceFactory();
mdsf.setProperties(prop);
DataSource ds = mdsf.getDataSource();

We get the data source with MyDataSourceFactory.

TransactionFactory trFact = new JdbcTransactionFactory();
Environment environment = new Environment("development", trFact, ds);
Configuration config = new Configuration(environment);
config.addMapper(MyMapper.class);

This code replaces the XML configuration. We use JdbcTransactionFactory, 
Environment, and Configuration classes.

sesFact = new SqlSessionFactoryBuilder().build(config);

The instance of the Configuration class is passed to the SqlSessionFactoryBuilder's
build method.

## Dynamic SQL

Dynamic SQL allows us to create dynamic SQL queries with tags such
as &lt;if&gt;, &lt;where&gt;, 
or &lt;foreach&gt;.

mybatis-config.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd"&gt;
&lt;configuration&gt;
    
    &lt;typeAliases&gt;
        &lt;typeAlias alias="Book" 
                   type="com.zetcode.mybatisdynamicsql.bean.Book"/&gt;  
    &lt;/typeAliases&gt;      
    
    &lt;environments default="development"&gt;
        &lt;environment id="development"&gt;
            &lt;transactionManager type="JDBC"/&gt;
            &lt;dataSource type="POOLED"&gt;
                &lt;property name="driver" value="com.mysql.jdbc.Driver"/&gt;
                &lt;property name="url" 
                          value="jdbc:mysql://localhost:3306/testdb"/&gt;
                &lt;property name="username" value="testuser"/&gt;
                &lt;property name="password" value="test623"/&gt;
            &lt;/dataSource&gt;
        &lt;/environment&gt;
    &lt;/environments&gt;
    
    &lt;mappers&gt;
        &lt;mapper resource="mymapper.xml"/&gt;
    &lt;/mappers&gt;    
    
&lt;/configuration&gt;

First we provide the mybatis-config.xml configuration file.

mymapper.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd"&gt;
  
&lt;mapper namespace="com.zetcode"&gt;
    
    &lt;select id = "getBook" resultType = "Book"&gt;
        SELECT * FROM MyBooks
    
        &lt;where&gt;
            &lt;if test = "_parameter != null"&gt;
                Id = #{id}
            &lt;/if&gt;
        &lt;/where&gt;
        
    &lt;/select&gt;    
            
&lt;/mapper&gt;

The mymapper.xml contains the dynamic SQL expression.

&lt;where&gt;
    &lt;if test = "_parameter != null"&gt;
        Id = #{id}
    &lt;/if&gt;
&lt;/where&gt;

The content of the &lt;where&gt; tag is included only if the 
Id parameter is not null. In effect, the SQL expression 
returns one book identified by its ID or all books otherwise.

Book.java
  

package com.zetcode.mybatisdynamicsql.bean;

public class Book {

    private Long id;
    private String author;
    private String title;
    private int published;
    private String remark;
    
    public Book() {};

    public Book(String author, String title, int published, 
            String remark) {
        
        this.author = author;
        this.title = title;
        this.published = published;
        this.remark = remark;
    }    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPublished() {
        return published;
    }

    public void setPublished(int published) {
        this.published = published;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    
    @Override
    public String toString() {
        return "Book{" + "id=" + id + ", author=" + author + ", "
                + "title=" + title + ", published=" + published 
                + ", remark=" + remark + '}';
    }    
}

This is the Book bean that is mapped to our result data.

Book.java
  

package com.zetcode.mybatisdynamicsql;

import com.zetcode.mybatisdynamicsql.bean.Book;
import java.io.IOException;
import java.io.Reader;
import java.util.List;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class MyBatisDynamicSQL {

    private static SqlSessionFactory factory = null;

    public static void main(String[] args) throws IOException {

        String resource = "mybatis-config.xml";
        Reader reader = null;
        SqlSession session = null;

        reader = Resources.getResourceAsReader(resource);

        factory = new SqlSessionFactoryBuilder().build(reader);

        try {
            session = factory.openSession();
            Book book = session.selectOne("getBook", 1);
            System.out.println(book);
            
            List&lt;Book&gt; books = session.selectList("getBook");

            for (Book b : books) {
                System.out.println(b);
            }            

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }
}

Using one statement key, we retrieve one particular book and all books.

Book book = session.selectOne("getBook", 1);

Here we retrieve one book identified by its ID.

List&lt;Book&gt; books = session.selectList("getBook");

Here we retrieve all books; the second parameter is not passed.

## Books

In the next example, we will insert and read books from a database
table.

![mybatis_project2.png](images/mybatis_project2.png)

Figure: MyBatisMySQLBooks project structure

This is the project structure in NetBeans.

Book.java
  

package com.zetcode.books.bean;

public class Book {

    private Long id;
    private String author;
    private String title;
    private int published;
    private String remark;
    
    public Book() {};

    public Book(String author, String title, int published, 
            String remark) {
        
        this.author = author;
        this.title = title;
        this.published = published;
        this.remark = remark;
    }    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getPublished() {
        return published;
    }

    public void setPublished(int published) {
        this.published = published;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    
    @Override
    public String toString() {
        return "Book{" + "id=" + id + ", author=" + author + ", "
                + "title=" + title + ", published=" + published 
                + ", remark=" + remark + '}';
    }    
}

This is the Book bean. MyBatis will map table columns
to this class. Notice the explicit usage of empty constructor.

mybatis-config.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd"&gt;
&lt;configuration&gt;
  
    &lt;typeAliases&gt;
        &lt;typeAlias alias="Book" type="com.zetcode.books.bean.Book"/&gt;  
    &lt;/typeAliases&gt;  

    &lt;environments default="development"&gt;
        &lt;environment id="development"&gt;
            &lt;transactionManager type="JDBC"/&gt;
            &lt;dataSource type="POOLED"&gt;
                &lt;property name="driver" value="com.mysql.jdbc.Driver"/&gt;
                &lt;property name="url" value="jdbc:mysql://localhost:3306/testdb"/&gt;
                &lt;property name="username" value="testuser"/&gt;
                &lt;property name="password" value="test623"/&gt;
            &lt;/dataSource&gt;
        &lt;/environment&gt;
    &lt;/environments&gt;

&lt;/configuration&gt;

In the mybatis-config.xml file, we define the new Book 
type with the &lt;typeAlias&gt; tag.

MyMapper.java
  

package com.zetcode.map;

import com.zetcode.books.bean.Book;
import java.util.List;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

public interface MyMapper {

    @Select("SELECT * FROM MyBooks WHERE Id = #{id}")
    public Book getBookById(Long id);
    
    @Select("SELECT * FROM MyBooks WHERE Author = #{author}")
    public List&lt;Book&gt; getBooksByAuthor(String author);   
    
    @Insert("INSERT INTO MyBooks(Author, Title, Published, Remark) "
            + "VALUES(#{author}, #{title}, #{published}, #{remark})")
    public void insertBook(String author, String title, int published, 
            String remark);
}

In the MyMapper interface, we have three annotations.

@Select("SELECT * FROM MyBooks WHERE Id = #{id}")
public Book getBookById(Long id);

This annotation maps the getBookById method to the specified
SELECT statement; the method returns a Book object. 

@Select("SELECT * FROM MyBooks WHERE Author = #{author}")
public List&lt;Book&gt; getBooksByAuthor(String author);

We map a SELECT statement to a list of getBooksByAuthor method, 
which returns a list of book objects.

@Insert("INSERT INTO MyBooks(Author, Title, Published, Remark) "
        + "VALUES(#{author}, #{title}, #{published}, #{remark})")
public void insertBook(String author, String title, int published, 
        String remark);

With the @Insert annotation, we map an INSERT statement
to the insertBook method name.

MyBatisBooks.java
  

package com.zetcode.client;

import com.zetcode.map.MyMapper;
import com.zetcode.books.bean.Book;
import com.zetcode.util.MyBatisUtils;
import java.io.IOException;
import java.util.List;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class MyBatisBooks {

    private static SqlSessionFactory factory = null;

    public static void main(String[] args) throws IOException {

        SqlSession session = null;
        
        factory = MyBatisUtils.getSqlSessionFactory();
        factory.getConfiguration().addMapper(MyMapper.class);
        
        try {
            session = factory.openSession();
            Book book = session.selectOne("getBookById", 4L);
            System.out.println(book);

            List&lt;Book&gt; books = session.selectList("getBooksByAuthor", "Leo Tolstoy");

            for (Book b : books) {
                System.out.println(b);
            }

            Book newBook = new Book("Miguel de Cervantes", "Don Quixote",
                    1605, "First modern novel");

            session.update("insertBook", newBook);
            session.commit();

        } finally {

            if (session != null) {
                session.close();
            }
        }
    }
}

In the main class, we select a book by its ID, select all books from an
author, and insert a new book into the table.

Book book = session.selectOne("getBookById", 4L);

A new book is retrieved using session's selectOne method.

List&lt;Book&gt; books = session.selectList("getBooksByAuthor", "Leo Tolstoy");

for (Book b : books) {
    System.out.println(b);
}

All books from Leo Tolstoy are retrieved using session's selectList
method.

session.update("insertBook", newBook);
session.commit();

A new books is inserted with the session's update method. 
The method takes a Book instance as the second parameter. 
The changes are committed to the database with commit.

This was the MyBatis tutorial. You might be also interested in 
[JDBI tutorial](/db/jdbi/),
[PostgreSQL Java tutorial](/java/postgresql/),
[Java MongoDB tutorial](/java/mongodb/), or
[MySQL tutorial](/mysql/).