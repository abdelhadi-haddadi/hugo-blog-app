+++
title = "Java JAXB"
date = 2025-08-29T19:59:35.566+01:00
draft = false
description = "Java JAXB tutorial shows how to use JAXB library to work with XML. The examples write Java objects into XML files and read XML data into Java objects."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java JAXB

last modified January 27, 2024

 

Java JAXB tutorial shows how to use JAXB library to work with XML. 
The examples write Java objects into XML files and read XML data into Java objects.

## JAXB

Java Architecture for XML Binding (JAXB) is a software framework 
that allows Java developers to map Java classes to XML representations. 
JAXB enables to marshal Java objects into XML and unmarshal XML back into 
Java objects.

In Java 9, JAXB has moved into a separate module java.xml. 
In Java 9 and Java 10 we need to use the --add-modules=java.xml.bind 
option. In Java 11, JAXB has been removed from JDK and we need to add it 
to the project as a separate library via Maven or Gradle.

In our examples, we use JDK 11 and Maven to create our applications.

## JAXB definitions

Marshalling is the process of transforming Java objects 
into XML documents. Unmarshalling is the process of 
reading XML documents into Java objects.
The JAXBContext class provides the client's entry point to 
the JAXB API. It provides API for marshalling, unmarshalling and validating. 

## JAXB POM settings

The following POM file includes the necessary JAXB JARs.

pom.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd"&gt;
    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;

    &lt;groupId&gt;JavaWriteXmlJaxbEx&lt;/groupId&gt;
    &lt;artifactId&gt;JavaWriteXmlJaxbEx&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;

    &lt;properties&gt;
        &lt;maven.compiler.source&gt;11&lt;/maven.compiler.source&gt;
        &lt;maven.compiler.target&gt;11&lt;/maven.compiler.target&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.xml.bind&lt;/groupId&gt;
            &lt;artifactId&gt;jaxb-api&lt;/artifactId&gt;
            &lt;version&gt;2.2.11&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.sun.xml.bind&lt;/groupId&gt;
            &lt;artifactId&gt;jaxb-core&lt;/artifactId&gt;
            &lt;version&gt;2.2.11&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;com.sun.xml.bind&lt;/groupId&gt;
            &lt;artifactId&gt;jaxb-impl&lt;/artifactId&gt;
            &lt;version&gt;2.2.11&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;javax.activation&lt;/groupId&gt;
            &lt;artifactId&gt;activation&lt;/artifactId&gt;
            &lt;version&gt;1.1.1&lt;/version&gt;
        &lt;/dependency&gt;

    &lt;/dependencies&gt;

    &lt;build&gt;
        &lt;plugins&gt;
            &lt;plugin&gt;
                &lt;artifactId&gt;maven-assembly-plugin&lt;/artifactId&gt;
                &lt;executions&gt;
                    &lt;execution&gt;
                        &lt;phase&gt;package&lt;/phase&gt;
                        &lt;goals&gt;
                            &lt;goal&gt;single&lt;/goal&gt;
                        &lt;/goals&gt;
                    &lt;/execution&gt;
                &lt;/executions&gt;
                &lt;configuration&gt;
                    &lt;descriptorRefs&gt;
                        &lt;descriptorRef&gt;jar-with-dependencies&lt;/descriptorRef&gt;
                    &lt;/descriptorRefs&gt;

                    &lt;archive&gt;
                        &lt;manifest&gt;
                            &lt;mainClass&gt;com.zetcode.JavaWriteXmlJaxbEx&lt;/mainClass&gt;
                        &lt;/manifest&gt;
                    &lt;/archive&gt;
                &lt;/configuration&gt;
            &lt;/plugin&gt;
        &lt;/plugins&gt;
    &lt;/build&gt;

&lt;/project&gt;

In addition to including JAXB dependencies, we use the maven-assembly-plugin
to pack all the dependencies into one JAR.

## JAXB write XML example

In the first example, we write Java objects into an XML file.

Book.java
  

package com.zetcode;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "book")

// Defining order
@XmlType(propOrder = { "author", "name", "publisher", "isbn" })
public class Book {

    private String name;
    private String author;
    private String publisher;
    private String isbn;

    // Changing to title
    @XmlElement(name = "title")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("Book{");
        sb.append("name='").append(name).append('\'');
        sb.append(", author='").append(author).append('\'');
        sb.append(", publisher='").append(publisher).append('\'');
        sb.append(", isbn='").append(isbn).append('\'');
        sb.append('}');
        return sb.toString();
    }
}

This is the Book bean. This bean is going to be transformed
into a specific XML tag.

@XmlRootElement(name = "book")

With the @XmlRootElement annotation, we define the XML
tag name. 

@XmlType(propOrder = { "author", "name", "publisher", "isbn" })

With the @XmlType's propOrder attribute we
define the order of the subelements.

@XmlElement(name = "title")
public String getName() {
    return name;
}

We can change the default element name to title.

BookStore.java
  

package com.zetcode;

import java.util.ArrayList;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;

//This statement means that class "Bookstore.java" is the root-element of our example
@XmlRootElement(namespace = "com.zetcode")
public class BookStore {

    // XmLElementWrapper generates a wrapper element around XML representation
    @XmlElementWrapper(name = "bookList")
    // XmlElement sets the name of the entities
    @XmlElement(name = "book")
    private ArrayList&lt;Book&gt; bookList;
    private String name;
    private String location;

    public void setBookList(ArrayList&lt;Book&gt; bookList) {
        this.bookList = bookList;
    }

    public ArrayList&lt;Book&gt; getBooksList() {
        return bookList;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}

The BookStore is a class that contains a list where
we place our book objects.

@XmlRootElement(namespace = "com.zetcode")
public class BookStore {

We define the root element with the @XmlRootElement annotation.

// XmLElementWrapper generates a wrapper element around XML representation
@XmlElementWrapper(name = "bookList")
// XmlElement sets the name of the entities
@XmlElement(name = "book")
private ArrayList&lt;Book&gt; bookList;

The @XmlElementWrapper annotation defines a wrapper element
around the book elements. The @XmlElement annotation defines
the name of the XML element that goes inside the wrapper.

JavaWriteXmlJaxbEx.java
  

package com.zetcode;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import java.io.File;
import java.util.ArrayList;

public class JavaWriteXmlJaxbEx {

    private static final String BOOKSTORE_XML = "src/main/resources/bookstore.xml";

    public static void main(String[] args) throws JAXBException {

        var bookList = new ArrayList&lt;Book&gt;();

        // create books
        var book1 = new Book();
        book1.setIsbn("978-0060554736");
        book1.setName("The Game");
        book1.setAuthor("Neil Strauss");
        book1.setPublisher("Harpercollins");
        bookList.add(book1);

        var book2 = new Book();
        book2.setIsbn("978-3832180577");
        book2.setName("Feuchtgebiete");
        book2.setAuthor("Charlotte Roche");
        book2.setPublisher("Dumont Buchverlag");
        bookList.add(book2);

        // create bookstore, assign books
        var bookstore = new BookStore();
        bookstore.setName("Fraport Bookstore");
        bookstore.setLocation("Livres belles");
        bookstore.setBookList(bookList);

        // create JAXB context and instantiate marshaller
        var context = JAXBContext.newInstance(BookStore.class);
        var m = context.createMarshaller();
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

        // Write to System.out
        m.marshal(bookstore, System.out);

        // Write to File
        m.marshal(bookstore, new File(BOOKSTORE_XML));
    }
}

In the example, we create book objects, add them to the bookstore and 
transform the bookstore into an XML file.

// create books
var book1 = new Book();
book1.setIsbn("978-0060554736");
book1.setName("The Game");
book1.setAuthor("Neil Strauss");
book1.setPublisher("Harpercollins");
bookList.add(book1);

var book2 = new Book();
book2.setIsbn("978-3832180577");
book2.setName("Feuchtgebiete");
book2.setAuthor("Charlotte Roche");
book2.setPublisher("Dumont Buchverlag");
bookList.add(book2);

We create two book objects.

// create bookstore, assign books
var bookstore = new BookStore();
bookstore.setName("Fraport Bookstore");
bookstore.setLocation("Livres belles");
bookstore.setBookList(bookList);

A bookstore is created and books are placed into it.

// create JAXB context and instantiate marshaller
var context = JAXBContext.newInstance(BookStore.class);

We create a new JAXBContext. We pass a list of classes that 
the new context object has to recognize. (In our case it is one class.)

var m = context.createMarshaller();
m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);

From the context we get a marshaller with createMarshaller.
We set a property to get formatted output.

// Write to System.out
m.marshal(bookstore, System.out);

// Write to File
m.marshal(bookstore, new File(BOOKSTORE_XML));

We write the data into the system output and a file.

## JAXB read XML example

In the second example, we read the marshalled data back into Java objects.

JavaReadXmlJaxbEx.java
  

package com.zetcode;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class JavaReadXmlJaxbEx {

    private static final String BOOKSTORE_XML = "src/main/resources/bookstore.xml";

    public static void main(String[] args) throws JAXBException, 
            FileNotFoundException {

        // create JAXB context and unmarshaller
        var context = JAXBContext.newInstance(BookStore.class);
        var um = context.createUnmarshaller();

        var bookstore = (BookStore) um.unmarshal(new InputStreamReader(
                new FileInputStream(BOOKSTORE_XML), StandardCharsets.UTF_8));
        var bookList = bookstore.getBooksList();

        bookList.forEach((book) -&gt; {
            System.out.println(book);
        });
    }
}

The example reads books from bookstore.xml document.

// create JAXB context and unmarshaller
var context = JAXBContext.newInstance(BookStore.class);
var um = context.createUnmarshaller();

We create a JAXB context and get a new unmarshaller.

var bookstore = (BookStore) um.unmarshal(new InputStreamReader(
        new FileInputStream(BOOKSTORE_XML), StandardCharsets.UTF_8));

With unmarshal, we read the data from the XML document.

var bookList = bookstore.getBooksList();

bookList.forEach((book) -&gt; {
    System.out.println(book);
});

We get the list of books and iterate over it.

Book{name='The Game', author='Neil Strauss', publisher='Harpercollins', isbn='978-0060554736'}
Book{name='Feuchtgebiete', author='Charlotte Roche', publisher='Dumont Buchverlag', isbn='978-3832180577'}

## Source

[JAXB documentation](https://javaee.github.io/jaxb-v2/)

In this article we have read and written XML files with Java JAXB library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).