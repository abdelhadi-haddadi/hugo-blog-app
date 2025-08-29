+++
title = "JdbcTemplate in a classic Spring application"
date = 2025-08-27T23:20:58.571+01:00
draft = false
description = "In this tutorial, we show how to 
create a classic Spring application with JdbcTemplate. The Spring application
is configured with XML."
image = ""
imageBig = ""
categories = ["articles"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JdbcTemplate in a classic Spring application

last modified July 13, 2020 

In this tutorial, we show how to create a classic Spring application with JdbcTemplate.
The application connects to a MySQL database and issues SQL statements using JdbcTemplate.

Spring is a popular Java application framework for developing enterprise 
applications in Java. It is also a very good integration system
that helps glue together various enterprise components.

JdbcTemplate is a library that helps programmers create applications that work
with relational databases and JDBC. It handles many tedious and error-prone low-level 
details such as handling transactions, cleaning up resources, and correctly handling 
exceptions. JdbcTemplate is shipped in Spring's spring-jdbc module.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0" 
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
                             http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.zetcode&lt;/groupId&gt;
    &lt;artifactId&gt;SpringJdbcTemplateEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;packaging&gt;jar&lt;/packaging&gt;
    
    &lt;properties&gt;
        
        &lt;project.build.sourceEncoding&gt;UTF-8&lt;/project.build.sourceEncoding&gt;
        &lt;maven.compiler.source&gt;1.8&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;1.8&lt;/maven.compiler.target&gt;
        &lt;spring-version&gt;4.3.0.RELEASE&lt;/spring-version&gt;
        
    &lt;/properties&gt;
    
    &lt;dependencies&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;mysql&lt;/groupId&gt;
            &lt;artifactId&gt;mysql-connector-java&lt;/artifactId&gt;
            &lt;version&gt;5.1.40&lt;/version&gt;
        &lt;/dependency&gt;        
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-core&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
        &lt;/dependency&gt;
        
        &lt;dependency&gt;
            &lt;groupId&gt;org.springframework&lt;/groupId&gt;
            &lt;artifactId&gt;spring-beans&lt;/artifactId&gt;
            &lt;version&gt;${spring-version}&lt;/version&gt;
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
    
    &lt;/dependencies&gt;    

&lt;/project&gt;

In the Maven build file, we provide the dependencies for the core of 
the Spring application, JdbcTemplate library, and MySQL driver.

com/zetcode/Friend.java
  

package com.zetcode.bean;

public class Friend {

    private int id;
    private String name;
    private int age;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Friend{" + "id=" + id + ", name=" + 
                name + ", age=" + age + '}';
    }
}

This is a Friend class. A row from the database
table will be mapped to this class.

my-beans.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;

&lt;beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd"&gt;

    &lt;bean id="dataSource" class="org.springframework.jdbc.datasource.DriverManagerDataSource"&gt;
        &lt;property name="driverClassName" value="com.mysql.jdbc.Driver"/&gt;
        &lt;property name="url" value="jdbc:mysql://localhost:3306/testdb?useSSL=false"/&gt;
        &lt;property name="username" value="testuser"/&gt;
        &lt;property name="password" value="test623"/&gt;
    &lt;/bean&gt;
    
    &lt;bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate"&gt;
        &lt;property name="dataSource" ref="dataSource"/&gt;
    &lt;/bean&gt;    
    
&lt;/beans&gt;

In the application context XML file, which we call my-beans.xml, we define two
beans: data source bean and jdbcTemplate bean. The data source bean contains the 
data source properties; the jdbcTemplate refers to the dataSource 
bean via the ref attribute. The my-beans.xml is located in 
the src/main/resources subdirectory. 

com/zetcode/SpringJdbcTemplateEx.java
  

package com.zetcode;

import com.zetcode.bean.Friend;
import java.util.List;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

public class SpringJdbcTemplateEx {

    public static void main(String[] args) {

        ApplicationContext ctx
                = new ClassPathXmlApplicationContext("my-beans.xml");

        JdbcTemplate jdbcTemplate = (JdbcTemplate) ctx.getBean("jdbcTemplate");

        jdbcTemplate.execute("DROP TABLE IF EXISTS Friends");
        jdbcTemplate.execute("CREATE TABLE Friends(Id INT, Name VARCHAR(30), "
                + "Age INT)");
        jdbcTemplate.update("INSERT INTO Friends VALUES(1, 'Paul', 27)");
        jdbcTemplate.update("INSERT INTO Friends VALUES(2, 'Monika', 34)");
        jdbcTemplate.update("INSERT INTO Friends VALUES(3, 'Peter', 20)");
        jdbcTemplate.update("INSERT INTO Friends VALUES(4, 'Lucy', 45)");
        jdbcTemplate.update("INSERT INTO Friends VALUES(5, 'Roman', 57)");

        int id = 1;
        String sql = "SELECT * FROM Friends WHERE Id=?";

        Friend f = (Friend) jdbcTemplate.queryForObject(sql, new Object[]{id},
                new BeanPropertyRowMapper(Friend.class));

        System.out.println(f);

        List&lt;Friend&gt; allFriends = jdbcTemplate.query("SELECT * FROM Friends",
                new BeanPropertyRowMapper(Friend.class));
        
        allFriends.stream().forEach(System.out::println);
    }
}

The SpringJdbcTemplateEx sets up the Spring application. 

ApplicationContext context = 
        new ClassPathXmlApplicationContext("my-beans.xml");

From the my-beans.xml file, we create the ApplicationContext.
Spring ApplicationContext is a central interface to provide configuration 
for an application. ClassPathXmlApplicationContext is an implementation of
the ApplicationContext that loads configuration definition from an XML file, 
which is located on the classpath. 

JdbcTemplate jdbcTemplate = (JdbcTemplate) ctx.getBean("jdbcTemplate");

From the application context, we get the jdbcTemplate bean.

jdbcTemplate.execute("DROP TABLE IF EXISTS Friends");
jdbcTemplate.execute("CREATE TABLE Friends(Id INT, Name VARCHAR(30), "
        + "Age INT)");

With the JdbcTemplate's execute method, we 
create a Friends table.

jdbcTemplate.update("INSERT INTO Friends VALUES(1, 'Paul', 27)");

We use the JdbcTemplate's update method to 
insert a statement.

int id = 1;
String sql = "SELECT * FROM Friends WHERE Id=?";

In this SQL statement, we select a friend identified by its ID.

Friend f = (Friend) jdbcTemplate.queryForObject(sql, new Object[]{id},
        new BeanPropertyRowMapper(Friend.class));

The JdbcTemplate's queryForObject method executes the SQL query and
returns the result object. The result object is mapped to the Friend
object using the BeanPropertyRowMapper.

List&lt;Friend&gt; allFriends = jdbcTemplate.query("SELECT * FROM Friends",
        new BeanPropertyRowMapper(Friend.class));

allFriends.stream().forEach(System.out::println);

With the JdbcTemplate's query method, we retrieve all
friends and print them to the console.

Friend{id=1, name=Paul, age=27}
Friend{id=1, name=Paul, age=27}
Friend{id=2, name=Monika, age=34}
Friend{id=3, name=Peter, age=20}
Friend{id=4, name=Lucy, age=45}
Friend{id=5, name=Roman, age=57}

In this tutorial, we have created a classic Spring application that issued SQL 
statements with JdbcTemplate. The Spring application was configured in XML.