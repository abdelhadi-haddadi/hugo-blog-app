+++
title = "Apache Derby"
date = 2025-08-29T19:52:37.374+01:00
draft = false
description = "This is Apache Derby tutorial. In this tutorial, we learn the fundamentals of the Apache Derby database system."
image = ""
imageBig = ""
categories = ["db"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Apache Derby

last modified July 6, 2020 

This is Apache Derby tutorial. This tutorial will cover the Derby
database engine, the SQL understood by Derby and programming
Derby with the JDBC. 

## Table of Contents

    - [Introducing Derby](derby/)

    - [Installation &amp; configuration](install/)

    - [Tools](tools/)

    - [The ij tool](ij/)

    - [SQL](sql/)

    - [Programming with JDBC](jdbc/)

    - [Security](sec/)

    - [Working with Tomcat](tomcat/)

    - [Derby with NetBeans](netbeans/)

## Derby

Derby is a database engine written in Java language. It has a relatively
small footprint of 2-3MB. It works in two modes: embedded and client-server.

Derby has roots in 1996 as JBMS. Later it was renamed to Cloudscape. 
In 1999 the company developing Cloudscape was bought by Informix, which
was later acquired by IBM. In 2004 IBM contributed the code to the 
Apache Software Foundation. The Derby project was born. Sun joined
the project and included the Derby in Java 6. The project is rebranded
as Java DB in JDK. 

## Related tutorials

In [Introduction to EJBs](/java/ejb/), we use Derby database to save
entities. A [Tomcat Derby](/java/tomcatderby/) tutorial
shows how to create a Java web application with Tomcat, Derby, and NetBeans.
In a [Displaying database data in datagrid](/articles/easyuidatagrid/) tutorial
we show how to display data from a Derby database in a EasyUI datagrid control.