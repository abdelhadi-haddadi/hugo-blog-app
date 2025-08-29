+++
title = "Java SAX"
date = 2025-08-29T20:00:29.027+01:00
draft = false
description = "Java SAX tutorial shows how to use Java SAX API to read and validate XML documents."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java SAX

last modified January 27, 2024

 

Java SAX tutorial shows how to use Java SAX API to read and validate XML
documents.

## SAX

SAX (Simple API for XML) is an event-driven algorithm for parsing XML
documents. SAX is an alternative to the Document Object Model (DOM). Where the
DOM reads the whole document to operate on XML, SAX parsers read XML node by
node, issuing parsing events while making a step through the input stream. SAX
processes documents state-independently (the handling of an element does not
depend on the elements that came before). SAX parsers are read-only.

SAX parsers are faster and require less memory. On the other hand, DOM is easier
to use and there are tasks, such as sorting elements, rearranging elements or
looking up elements, that are faster with DOM.

A SAX parser comes with JDK, so there is no need to dowload a dependency.

## Java SAX parsing example

In the following example, we read an XML file with a SAX parser.

resources/users.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;users&gt;
    &lt;user id="1"&gt;
        &lt;firstname&gt;Peter&lt;/firstname&gt;
        &lt;lastname&gt;Brown&lt;/lastname&gt;
        &lt;occupation&gt;programmer&lt;/occupation&gt;
    &lt;/user&gt;
    &lt;user id="2"&gt;
        &lt;firstname&gt;Martin&lt;/firstname&gt;
        &lt;lastname&gt;Smith&lt;/lastname&gt;
        &lt;occupation&gt;accountant&lt;/occupation&gt;
    &lt;/user&gt;
    &lt;user id="3"&gt;
        &lt;firstname&gt;Lucy&lt;/firstname&gt;
        &lt;lastname&gt;Gordon&lt;/lastname&gt;
        &lt;occupation&gt;teacher&lt;/occupation&gt;
    &lt;/user&gt;
&lt;/users&gt;

We are going to read this XML file.

com/zetcode/model/User.java
  

package com.zetcode.model;

public class User {

    int id;
    private String firstName;
    private String lastName;
    private String occupation;

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public String getOccupation() {
        return occupation;
    }

    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    @Override
    public String toString() {

        StringBuilder builder = new StringBuilder();
        builder.append("User{").append("id=").append(id)
                .append(", firstName=").append(firstName)
                .append(", lastName=").append(lastName)
                .append(", occupation=").append(occupation).append("}");

        return builder.toString();
    }
}

This is the user bean; it will hold data from XML nodes.

com/zetcode/MyRunner.java
  

package com.zetcode;

import com.zetcode.model.User;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class MyRunner {

    private SAXParser saxParser = null;

    private SAXParser createSaxParser() {

        try {

            SAXParserFactory factory = SAXParserFactory.newInstance();
            factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            saxParser = factory.newSAXParser();

            return saxParser;
        } catch (ParserConfigurationException | SAXException ex) {

            Logger lgr = Logger.getLogger(MyRunner.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);

            return saxParser;
        }
    }

    public List&lt;User&gt; parseUsers() {

        var handler = new MyHandler();
        String fileName = "src/main/resources/users.xml";
        File xmlDocument = Paths.get(fileName).toFile();

        try {

            SAXParser parser = createSaxParser();
            parser.parse(xmlDocument, handler);

        } catch (SAXException | IOException ex) {

            Logger lgr = Logger.getLogger(MyRunner.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }

        return handler.getUsers();
    }
}

MyRunner creates a SAX parser and launches parsing.
The parseUsers returns the parsed data in a list of User
objects.

SAXParserFactory factory = SAXParserFactory.newInstance();
factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
saxParser = factory.newSAXParser();

From the SAXParserFactory, we get the SAXParser.

SAXParser parser = createSaxParser();
parser.parse(xmlDocument, handler);

We parse the document with the parse method. The second parameter
of the method is the handler object, which contains the event handlers.

com/zetcode/MyHandler.java
  

package com.zetcode;

import com.zetcode.model.User;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import java.util.ArrayList;
import java.util.List;

public class MyHandler extends DefaultHandler {

    private List&lt;User&gt; users = new ArrayList&lt;&gt;();
    private User user;

    private boolean bfn = false;
    private boolean bln = false;
    private boolean boc = false;

    @Override
    public void startElement(String uri, String localName, 
                             String qName, Attributes attributes) {

        if ("user".equals(qName)) {

            user = new User();

            int id = Integer.parseInt(attributes.getValue("id"));
            user.setId(id);
        }

        switch (qName) {
            case "firstname" -&gt; bfn = true;
            case "lastname" -&gt; bln = true;
            case "occupation" -&gt; boc = true;
        }
    }

    @Override
    public void characters(char[] ch, int start, int length) {

        if (bfn) {
            user.setFirstName(new String(ch, start, length));
            bfn = false;
        }

        if (bln) {
            user.setLastName(new String(ch, start, length));
            bln = false;
        }

        if (boc) {
            user.setOccupation(new String(ch, start, length));
            boc = false;
        }
    }

    @Override
    public void endElement(String uri, String localName, String qName)  {

        if ("user".equals(qName)) {
            users.add(user);
        }
    }

    public List&lt;User&gt; getUsers() {

        return users;
    }
}

In the MyHandler class, we have the implementations of the event
handlers.

public class MyHandler extends DefaultHandler {

The handler class must extend from the DefaultHandler, where
we have the event methods.

@Override
public void startElement(String uri, String localName, 
                            String qName, Attributes attributes) {

    if ("user".equals(qName)) {

        user = new User();

        int id = Integer.parseInt(attributes.getValue("id"));
        user.setId(id);
    }

    switch (qName) {
        case "firstname" -&gt; bfn = true;
        case "lastname" -&gt; bln = true;
        case "occupation" -&gt; boc = true;
    }
}

The startElement method is called when the parser starts parsing
a new element. We create a new user if the element is &lt;user&gt;.
For other types of elements, we set boolean values.

@Override
public void characters(char[] ch, int start, int length) {

    if (bfn) {
        user.setFirstName(new String(ch, start, length));
        bfn = false;
    }

    if (bln) {
        user.setLastName(new String(ch, start, length));
        bln = false;
    }

    if (boc) {
        user.setOccupation(new String(ch, start, length));
        boc = false;
    }
}

The characters method is called when the parser encounters text
inside elements. Depending on the boolean variable, we set the user attributes.

@Override
public void endElement(String uri, String localName, String qName)  {

    if ("user".equals(qName)) {
        users.add(user);
    }
}

At the end of the &lt;user&gt; element, we add the user object
to the list of users.

com/zetcode/JavaReadXmlSaxEx.java
  

package com.zetcode;

import com.zetcode.model.User;

import java.util.List;

public class JavaReadXmlSaxEx  {

    public static void main(String[] args) {

        var runner = new MyRunner();
        List&lt;User&gt; lines = runner.parseUsers();

        lines.forEach(System.out::println);
    }
}

JavaReadXmlSaxEx starts the application. It delegates the parsing
tasks to MyRunner. In the end, the retrieved data is printed to the
console.

## Java SAX validation example

The following example uses the XSD language to validate an XML file.
XSD (XML Schema Definition) is the current standard schema language
for all XML documents and data. (There are other alternative schema languages
such as DTD and RELAX NG.) XSD is a set of rules to which an XML document must
conform in order to be considered valid according to the schema.

resources/users.xsd
  

&lt;?xml version="1.0"?&gt;

&lt;xs:schema version="1.0"
           xmlns:xs="http://www.w3.org/2001/XMLSchema"
           elementFormDefault="qualified"&gt;

    &lt;xs:element name="users"&gt;
        &lt;xs:complexType&gt;
            &lt;xs:sequence&gt;
                &lt;xs:element name="user" maxOccurs="unbounded" minOccurs="0"&gt;
                    &lt;xs:complexType&gt;
                        &lt;xs:sequence&gt;
                            &lt;xs:element type="xs:string" name="firstname"/&gt;
                            &lt;xs:element type="xs:string" name="lastname"/&gt;
                            &lt;xs:element type="xs:string" name="occupation"/&gt;
                        &lt;/xs:sequence&gt;
                        &lt;xs:attribute name="id" type="xs:int" use="required"/&gt;
                    &lt;/xs:complexType&gt;
                &lt;/xs:element&gt;
            &lt;/xs:sequence&gt;
        &lt;/xs:complexType&gt;
    &lt;/xs:element&gt;

&lt;/xs:schema&gt;

This is the XSD file for validating users. It declares, for instance, that the
&lt;user&gt; element must be within the &lt;users&gt; element
or that the id attribute of &lt;user&gt; must be and integer
and is mandatory.

resources/users.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;users&gt;
...

We have the same file.

com/zetcode/JavaSaxValidation.java
  

package com.zetcode;

import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.XMLConstants;
import javax.xml.transform.sax.SAXSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JavaSaxValidation {

    public static void main(String[] args) {

        var xsdFile = new File("src/main/resources/users.xsd");

        try {

            Path xmlPath = Paths.get("src/main/resources/users.xml");
            Reader reader = Files.newBufferedReader(xmlPath);

            String schemaLang = XMLConstants.W3C_XML_SCHEMA_NS_URI;
            SchemaFactory factory = SchemaFactory.newInstance(schemaLang);
            factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            Schema schema = factory.newSchema(xsdFile);

            Validator validator = schema.newValidator();

            var source = new SAXSource(new InputSource(reader));
            validator.validate(source);

            System.out.println("The document was validated OK");

        } catch (SAXException ex) {

            Logger lgr = Logger.getLogger(JavaSaxValidation.class.getName());
            lgr.log(Level.SEVERE, "The document failed to validate");
            lgr.log(Level.SEVERE, ex.getMessage(), ex);

        } catch (IOException ex) {

            Logger lgr = Logger.getLogger(JavaSaxValidation.class.getName());
            lgr.log(Level.SEVERE, ex.getMessage(), ex);
        }
    }
}

The example uses the users.xsd schema to validate the
users.xml file.

String schemaLang = XMLConstants.W3C_XML_SCHEMA_NS_URI;
SchemaFactory factory = SchemaFactory.newInstance(schemaLang);
factory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
Schema schema = factory.newSchema(xsdFile);

With the SchemaFactory we choose the W3C XML schema for our schema
definition. In other words, our custom schema definition must also adhere to
certain rules.

Validator validator = schema.newValidator();

A new validator is generated from the schema.

var source = new SAXSource(new InputSource(reader));
validator.validate(source);

We validate the XML document against the provided schema.

} catch (SAXException ex) {

    Logger lgr = Logger.getLogger(JavaXmlSchemaValidationEx.class.getName());
    lgr.log(Level.SEVERE, "The document failed to validate");
    lgr.log(Level.SEVERE, ex.getMessage(), ex);
}

By default, if the document is not valid, a SAXException is thrown.

## Source

[Java SAX tutorial](https://docs.oracle.com/javase/tutorial/jaxp/sax/parsing.html)

In this article we have read and validated an XML document with Java SAX.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).