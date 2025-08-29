+++
title = "Java DOM"
date = 2025-08-29T19:58:35.054+01:00
draft = false
description = "Java DOM tutorial shows how to use Java DOM API to read and validate XML documents."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java DOM

last modified January 27, 2024

 

Java DOM tutorial shows how to use Java DOM API to read and write XML documents.

## DOM

Document Object Model (DOM) is a standard tree structure, where each
node contains one of the components from an XML structure. Element nodes and
text nodes are the two most common types of nodes. With DOM functions we can
create nodes, remove nodes, change their contents, and traverse the node
hierarchy.

## Java DOM

DOM is part of the Java API for XML processing (JAXP). Java DOM parser traverses
the XML file and creates the corresponding DOM objects. These DOM objects are
linked together in a tree structure. The parser reads the whole XML structure
into the memory.

SAX is an alternative JAXP API to DOM. SAX parsers are event-based; they are
faster and require less memory. On the other hand, DOM is easier to use and
there are tasks, such as sorting elements, rearranging elements or looking up
elements, that are faster with DOM. A DOM parser comes with JDK, so there is no
need to download a dependency.

DocumentBuilderFactory enables applications to obtain a parser that
produces DOM object trees from XML documents.
DocumentBuilder defines the API to obtain DOM Document instances
from an XML document or to create a new DOM Document.
DocumentTraversal contains methods that create iterators to
traverse a node and its children. NodeFilter
is used to filter out nodes. NodeIterator is used to go through a
set of nodes. TreeWalker is used to navigate a document tree or
subtree using the view of the document defined by their whatToShow
flags and filter of the document.

## Node types

The following is a list of some important Node types:

  Node types
  
  
    Type
    Description
  
  
    Attr
    represents an attribute in an Element object
  
  
    CDATASection
    escapes blocks of text containing characters that would otherwise be regarded as markup
  
  
    Comment
    represents the content of a comment
  
  
    Document
    represents the entire HTML or XML document
  
  
    DocumentFragment
    a lightweight or minimal Document object used to represent portions of an XML Document larger than a single node
  
  
    Element
    element nodes are basic branches of a DOM tree; most items except text are elements
  
  
    Node
    the primary datatype for the entire DOM and each of its elements
  
  
    NodeList
    an ordered collection of nodes
  
  
    Text
    represents the textual content (called character data in XML) of an Element or Attr
  

## XML example files

We use the following XML files:

users.xml
  

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

This is the users.xml file.

continents.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;continents&gt;
    &lt;europe&gt;
        &lt;slovakia&gt;
            &lt;capital&gt;
                Bratislava
            &lt;/capital&gt;
            &lt;population&gt;
                421000
            &lt;/population&gt;
        &lt;/slovakia&gt;
        &lt;hungary&gt;
            &lt;capital&gt;
                Budapest
            &lt;/capital&gt;
            &lt;population&gt;
                1759000
            &lt;/population&gt;
        &lt;/hungary&gt;
        &lt;poland&gt;
            &lt;capital&gt;
                Warsaw
            &lt;/capital&gt;
            &lt;population&gt;
                1735000
            &lt;/population&gt;
        &lt;/poland&gt;
    &lt;/europe&gt;
    &lt;asia&gt;
        &lt;china&gt;
            &lt;capital&gt;
                Beijing
            &lt;/capital&gt;
            &lt;population&gt;
                21700000
            &lt;/population&gt;
        &lt;/china&gt;

        &lt;vietnam&gt;
            &lt;capital&gt;
                Hanoi
            &lt;/capital&gt;
            &lt;population&gt;
                7500000
            &lt;/population&gt;
        &lt;/vietnam&gt;
    &lt;/asia&gt;
&lt;/continents&gt;

This is the continents.xml file.

&lt;build&gt;
    &lt;plugins&gt;
        &lt;plugin&gt;
            &lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
            &lt;artifactId&gt;exec-maven-plugin&lt;/artifactId&gt;
            &lt;version&gt;1.6.0&lt;/version&gt;
            &lt;configuration&gt;
                &lt;mainClass&gt;com.zetcode.JavaReadXmlDomEx&lt;/mainClass&gt;
            &lt;/configuration&gt;
        &lt;/plugin&gt;
    &lt;/plugins&gt;
&lt;/build&gt;

The examples use the exec-maven-plugin to execute the Java main class from Maven.

## Java DOM reading example

In the following example, we read an XML file with a DOM parser.

JavaXmlDomReadEx.java
  

package com.zetcode;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.w3c.dom.Element;
import java.io.File;
import java.io.IOException;
import javax.xml.parsers.ParserConfigurationException;
import org.xml.sax.SAXException;

public class JavaXmlDomReadEx {

    public static void main(String argv[]) throws SAXException,
            IOException, ParserConfigurationException {

        File xmlFile = new File("src/main/resources/users.xml");

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder dBuilder = factory.newDocumentBuilder();
        Document doc = dBuilder.parse(xmlFile);

        doc.getDocumentElement().normalize();

        System.out.println("Root element: " + doc.getDocumentElement().getNodeName());

        NodeList nList = doc.getElementsByTagName("user");

        for (int i = 0; i &lt; nList.getLength(); i++) {

            Node nNode = nList.item(i);

            System.out.println("\nCurrent Element: " + nNode.getNodeName());

            if (nNode.getNodeType() == Node.ELEMENT_NODE) {

                Element elem = (Element) nNode;

                String uid = elem.getAttribute("id");

                Node node1 = elem.getElementsByTagName("firstname").item(0);
                String fname = node1.getTextContent();

                Node node2 = elem.getElementsByTagName("lastname").item(0);
                String lname = node2.getTextContent();

                Node node3 = elem.getElementsByTagName("occupation").item(0);
                String occup = node3.getTextContent();

                System.out.printf("User id: %s%n", uid);
                System.out.printf("First name: %s%n", fname);
                System.out.printf("Last name: %s%n", lname);
                System.out.printf("Occupation: %s%n", occup);
            }
        }
    }
}

The example parses the users.xml file. It utilizes the names of
the tags in the code; for instance: elem.getElementsByTagName("lastname").

DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder dBuilder = factory.newDocumentBuilder();

From the DocumentBuilderFactory, we get the
DocumentBuilder. DocumentBuilder contains the API to
obtain DOM Document instances from an XML document.

Document doc = dBuilder.parse(xmlFile);

The parse method parses the XML file into a Document.

doc.getDocumentElement().normalize();

Normalizing the document helps generate correct results.

System.out.println("Root element:" + doc.getDocumentElement().getNodeName());

We get the root element of the document.

NodeList nList = doc.getElementsByTagName("user");

We get a NodeList of user elements in the document with
getElementsByTagName.

for (int i = 0; i &lt; nList.getLength(); i++) {

We go through the list with a for loop.

String uid = elem.getAttribute("id");

We get the element attribute with getAttribute.

Node node1 = elem.getElementsByTagName("firstname").item(0);
String fname = node1.getTextContent();

Node node2 = elem.getElementsByTagName("lastname").item(0);
String lname = node2.getTextContent();

Node node3 = elem.getElementsByTagName("occupation").item(0);
String occup = node3.getTextContent();

We get the text content of the three subelements of the user element.

System.out.printf("User id: %s%n", uid);
System.out.printf("First name: %s%n", fname);
System.out.printf("Last name: %s%n", lname);
System.out.printf("Occupation: %s%n", occup);

We print the text of the current user to the console.

$ mvn -q exec:java
Root element: users

Current Element: user
User id: 1
First name: Peter
Last name: Brown
Occupation: programmer

Current Element: user
User id: 2
First name: Martin
Last name: Smith
Occupation: accountant

Current Element: user
User id: 3
First name: Lucy
Last name: Gordon
Occupation: teacher

## Java DOM reading elements with NodeIterator

DocumentTraversal contains methods that create
NodeIterators and TreeWalkers to traverse a
node and its children in depth first, pre-order document order. This
order is equivalent to the order in which the start tags occur
in the text representation of the document.

JavaXmlDomReadElements.java
  

package com.zetcode;

import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.DocumentTraversal;
import org.w3c.dom.traversal.NodeFilter;
import org.w3c.dom.traversal.NodeIterator;
import org.xml.sax.SAXException;

public class JavaXmlDomReadElements {

    public static void main(String[] args) throws ParserConfigurationException,
            SAXException, IOException {

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder loader = factory.newDocumentBuilder();
        Document document = loader.parse("src/main/resources/continents.xml");

        DocumentTraversal trav = (DocumentTraversal) document;

        NodeIterator it = trav.createNodeIterator(document.getDocumentElement(),
                NodeFilter.SHOW_ELEMENT, null, true);

        int c = 1;

        for (Node node = it.nextNode(); node != null;
                node = it.nextNode()) {

            String name = node.getNodeName();

            System.out.printf("%d %s%n", c, name);
            c++;
        }
    }
}

The example prints all the node elements of the continents.xml
file.

DocumentTraversal trav = (DocumentTraversal) document;

From the document we get a DocumentTraversal object.

NodeIterator it = trav.createNodeIterator(document.getDocumentElement(),
        NodeFilter.SHOW_ELEMENT, null, true);

We create a NodeIterator. With NodeFilter.SHOW_ELEMENT
set, it is showing only node elements.

for (Node node = it.nextNode(); node != null;
        node = it.nextNode()) {

    String name = node.getNodeName();

    System.out.printf("%d %s%n", c, name);
    c++;
}

In a for loop, we traverse the nodes and print their names.

$ mvn -q exec:java
1 continents
2 europe
3 slovakia
4 capital
5 population
6 hungary
7 capital
8 population
9 poland
10 capital
11 population
12 asia
13 china
14 capital
15 population
16 vietnam
17 capital
18 population

The continents.xml contains these eighteen elements.

## Java DOM reading text with NodeIterator

In the following example, we read text data with NodeIterator.

JavaXmlDomReadText.java
  

package com.zetcode;

import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.DocumentTraversal;
import org.w3c.dom.traversal.NodeFilter;
import org.w3c.dom.traversal.NodeIterator;
import org.xml.sax.SAXException;

public class JavaXmlDomReadText {

    public static void main(String[] args) throws ParserConfigurationException,
            SAXException, IOException {

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder loader = factory.newDocumentBuilder();
        Document document = loader.parse("src/main/resources/continents.xml");

        DocumentTraversal traversal = (DocumentTraversal) document;

        NodeIterator iterator = traversal.createNodeIterator(
                document.getDocumentElement(), NodeFilter.SHOW_TEXT, null, true);

        for (Node n = iterator.nextNode(); n != null; n = iterator.nextNode()) {

            String text = n.getTextContent().trim();

            if (!text.isEmpty()) {
                System.out.println(text);
            }
        }
    }
}

The example reads character data from the continents.xml file.

NodeIterator iterator = traversal.createNodeIterator(
        document.getDocumentElement(), NodeFilter.SHOW_TEXT, null, true);

The node filter is set to NodeFilter.SHOW_TEXT.

String text = n.getTextContent().trim();

if (!text.isEmpty()) {
    System.out.println(text);
}

We trim the white spaces and print the text if it is not empty.

$ mvn -q exec:java
Bratislava
421000
Budapest
1759000
Warsaw
1735000
Beijing
21700000
Hanoi
7500000

## Java DOM custom NodeFilter

The following example uses a custom DOM filter. A custom DOM filter must
implement the NodeFilter interface.

JavaXmlCustomFilter.java
  

package com.zetcode;

import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.DocumentTraversal;
import org.w3c.dom.traversal.NodeFilter;
import org.w3c.dom.traversal.NodeIterator;
import org.xml.sax.SAXException;

public class JavaXmlCustomFilter {

    public static void main(String[] args) throws ParserConfigurationException,
            SAXException, IOException {

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder loader = factory.newDocumentBuilder();
        Document document = loader.parse("src/main/resources/continents.xml");

        DocumentTraversal trav = (DocumentTraversal) document;

        MyFilter filter = new MyFilter();

        NodeIterator it = trav.createNodeIterator(document.getDocumentElement(),
                NodeFilter.SHOW_ELEMENT, filter, true);

        for (Node node = it.nextNode(); node != null;
                node = it.nextNode()) {

            String name = node.getNodeName();
            String text = node.getTextContent().trim().replaceAll("\\s+", " ");
            System.out.printf("%s: %s%n", name, text);
        }
    }

    static class MyFilter implements NodeFilter {

        @Override
        public short acceptNode(Node thisNode) {
            if (thisNode.getNodeType() == Node.ELEMENT_NODE) {

                Element e = (Element) thisNode;
                String nodeName = e.getNodeName();

                if ("slovakia".equals(nodeName) || "poland".equals(nodeName)) {
                    return NodeFilter.FILTER_ACCEPT;
                }
            }

            return NodeFilter.FILTER_REJECT;
        }
    }
}

The example shows only slovakia and poland nodes from the XML file.

MyFilter filter = new MyFilter();

NodeIterator it = trav.createNodeIterator(document.getDocumentElement(),
        NodeFilter.SHOW_ELEMENT, filter, true);

We create the MyFilter and set it to the createNodeIterator
method.

String text = node.getTextContent().trim().replaceAll("\\s+", " ");

The text content contains spaces and new line characters; therefore, we remove
the unnecessary spaces with a regular expression.

static class MyFilter implements NodeFilter {

    @Override
    public short acceptNode(Node thisNode) {
        if (thisNode.getNodeType() == Node.ELEMENT_NODE) {

            Element e = (Element) thisNode;
            String nodeName = e.getNodeName();

            if ("slovakia".equals(nodeName) || "poland".equals(nodeName)) {
                return NodeFilter.FILTER_ACCEPT;
            }
        }

        return NodeFilter.FILTER_REJECT;
    }
}

In the acceptNode method, we control which nodes to use by
returning NodeFilter.FILTER_ACCEPT and
NodeFilter.FILTER_REJECT.

$ mvn -q exec:java
slovakia: Bratislava 421000
poland: Warsaw 1735000

## Java DOM reading XML with TreeWalker

TreeWalker has more methods for traversing than
NodeIterator.

JavaXmlDomTreeWalkerEx.java
  

package com.zetcode;

import java.io.IOException;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.traversal.DocumentTraversal;
import org.w3c.dom.traversal.NodeFilter;
import org.w3c.dom.traversal.TreeWalker;
import org.xml.sax.SAXException;

public class JavaXmlDomTreeWalkerEx {

    public static void main(String[] args) throws SAXException, IOException,
            ParserConfigurationException {

        DocumentBuilderFactory factory
                = DocumentBuilderFactory.newInstance();
        DocumentBuilder loader = factory.newDocumentBuilder();
        Document document = loader.parse("src/main/resources/continents.xml");

        DocumentTraversal traversal = (DocumentTraversal) document;

        TreeWalker walker = traversal.createTreeWalker(
                document.getDocumentElement(),
                NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, true);

        traverseLevel(walker, "");
    }

    private static void traverseLevel(TreeWalker walker,
            String indent) {

        Node node = walker.getCurrentNode();

        if (node.getNodeType() == Node.ELEMENT_NODE) {
            System.out.println(indent + node.getNodeName());
        }

        if (node.getNodeType() == Node.TEXT_NODE) {

            String content_trimmed = node.getTextContent().trim();

            if (content_trimmed.length() &gt; 0) {
                System.out.print(indent);
                System.out.printf("%s%n", content_trimmed);
            }
        }

        for (Node n = walker.firstChild(); n != null;
                n = walker.nextSibling()) {

            traverseLevel(walker, indent + "  ");
        }

        walker.setCurrentNode(node);
    }
}

The example reads the elements and the text of a continents.xml file
with TreeWalker.

TreeWalker walker = traversal.createTreeWalker(
        document.getDocumentElement(),
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, true);

A TreeWalker is created with createTreeWalker
from a DocumentTraversal. We will process elements and text nodes.
Note that empty text such as indentation is considered text too.

traverseLevel(walker, "");

The processing is delegated to the traverseLevel method, which is called
recursively.

if (node.getNodeType() == Node.ELEMENT_NODE) {
    System.out.println(indent + node.getNodeName());
}

We print the name of the element with some indentation.

if (node.getNodeType() == Node.TEXT_NODE) {

    String content_trimmed = node.getTextContent().trim();

    if (content_trimmed.length() &gt; 0) {
        System.out.print(indent);
        System.out.printf("%s%n", content_trimmed);
    }
}

We print the text data. Since we are interested only in the capital and
population data, we skip all empty strings.

for (Node n = walker.firstChild(); n != null;
        n = walker.nextSibling()) {

    traverseLevel(walker, indent + "  ");
}

In this for loop, we recursively go deeply into a branch of a tree.

walker.setCurrentNode(node);

After we have finished processing a branch, we go to the same level with
setCurrentNode so that we can continue with another tree branch.

$ mvn -q exec:java
continents
  europe
    slovakia
      capital
        Bratislava
      population
        421000
    hungary
      capital
        Budapest
      population
        1759000
    poland
      capital
        Warsaw
      population
        1735000
  asia
    china
      capital
        Beijing
      population
        21700000
    vietnam
      capital
        Hanoi
      population
        7500000

## Java DOM writing example

In the following example, we create an XML file.

JavaXmlDomWrite.java
  

package com.zetcode;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class JavaXmlDomWrite {

    public static void main(String[] args) throws ParserConfigurationException,
            TransformerException {

        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        Document doc = builder.newDocument();

        Element root = doc.createElementNS("zetcode.com", "users");
        doc.appendChild(root);

        root.appendChild(createUser(doc, "1", "Robert", "Brown", "programmer"));
        root.appendChild(createUser(doc, "2", "Pamela", "Kyle", "writer"));
        root.appendChild(createUser(doc, "3", "Peter", "Smith", "teacher"));

        TransformerFactory transformerFactory = TransformerFactory.newInstance();
        Transformer transf = transformerFactory.newTransformer();

        transf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
        transf.setOutputProperty(OutputKeys.INDENT, "yes");
        transf.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");

        DOMSource source = new DOMSource(doc);

        File myFile = new File("src/main/resources/users.xml");

        StreamResult console = new StreamResult(System.out);
        StreamResult file = new StreamResult(myFile);

        transf.transform(source, console);
        transf.transform(source, file);
    }

    private static Node createUser(Document doc, String id, String firstName,
            String lastName, String occupation) {

        Element user = doc.createElement("user");

        user.setAttribute("id", id);
        user.appendChild(createUserElement(doc, "firstname", firstName));
        user.appendChild(createUserElement(doc, "lastname", lastName));
        user.appendChild(createUserElement(doc, "occupation", occupation));

        return user;
    }

    private static Node createUserElement(Document doc, String name,
            String value) {

        Element node = doc.createElement(name);
        node.appendChild(doc.createTextNode(value));

        return node;
    }
}

The example creates a new users.xml file in the
src/main/resources directory.

DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();

A new document builder is created from a document builder factory.

Document doc = builder.newDocument();

From the document builder, we create a new document with newDocument.

Element root = doc.createElementNS("zetcode.com", "users");
doc.appendChild(root);

We create a root element and add it to the document with appendChild.

root.appendChild(createUser(doc, "1", "Robert", "Brown", "programmer"));
root.appendChild(createUser(doc, "2", "Pamela", "Kyle", "writer"));
root.appendChild(createUser(doc, "3", "Peter", "Smith", "teacher"));

We append three child elements to the root element.

TransformerFactory transformerFactory = TransformerFactory.newInstance();
Transformer transf = transformerFactory.newTransformer();

Java DOM uses a Transformer to generate the XML file. It is called
transformer, because it can also transform the document with XSLT language. In
our case, we only write to the XML file.

transf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
transf.setOutputProperty(OutputKeys.INDENT, "yes");
transf.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");

We set the encoding and indentation of the document.

DOMSource source = new DOMSource(doc);

The DOMSource holds the DOM tree.

StreamResult console = new StreamResult(System.out);
StreamResult file = new StreamResult(myFile);

We are going to write to a console and to a file. StreamResult
is a holder of a transformation result.

transf.transform(source, console);
transf.transform(source, file);

We write the XML sources to the stream results.

private static Node createUser(Document doc, String id, String firstName,
        String lastName, String occupation) {

    Element user = doc.createElement("user");

    user.setAttribute("id", id);
    user.appendChild(createUserElement(doc, "firstname", firstName));
    user.appendChild(createUserElement(doc, "lastname", lastName));
    user.appendChild(createUserElement(doc, "occupation", occupation));

    return user;
}

A new user element is created in the createUser method with
createElement. An attribute of the element is set with
setAttribute.

private static Node createUserElement(Document doc, String name,
        String value) {

    Element node = doc.createElement(name);
    node.appendChild(doc.createTextNode(value));

    return node;
}

An element is added to its parent with appendChild and
a text node is created with createTextNode.

## Source

[Java Document Object Model - reference](https://docs.oracle.com/javase/tutorial/jaxp/dom/index.html)

In this article we have read and written XML files with Java DOM API.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).