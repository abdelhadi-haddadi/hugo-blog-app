+++
title = "C# XmlDocument"
date = 2025-08-29T19:51:37.902+01:00
draft = false
description = "C# XmlDocument tutorial shows how to work with XML in C# with XmlDocument. The code XmlDocument represents an XML document; it can be use to load, modify, validate, an navigate XML documents."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# XmlDocument

last modified July 5, 2023

 

C# XmlDocument tutorial shows how to work with XML in C# with XmlDocument. 

Extensible Markup Language (XML) is a markup language that defines a
set of rules for encoding documents in a format that is both human-readable and
machine-readable. XML is often used for application configuration, data storage 
and exchange.

XML is similar to HTML, but does not have predefined tags; we can design our own
tags.

## XmlDocument

The XmlDocument represents an XML document. It can be use to load,
modify, validate, an navigate XML documents.

The XmlDocument class is an in-memory representation of an XML
document. It implements the W3C XML Document Object Model (DOM). 

The Document Object Model (DOM)  is a language-independent
programming interface for HTML and XML documents. It represents a page. Through
the DOM interface, the programs can change the document structure, style, and
content. The DOM represents the document as nodes and objects.

The XmlElement is a common node in the XmlDocument.

XPath (XML Path Language)  is a query language for selecting nodes
from an XML document. It can be also used to compute values from the content of
an XML document. 

In the examples, we  with the following files:

words.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;words&gt;
    &lt;word&gt;falcon&lt;/word&gt;
    &lt;word&gt;sky&lt;/word&gt;
    &lt;word&gt;bottom&lt;/word&gt;
    &lt;word&gt;cup&lt;/word&gt;
    &lt;word&gt;book&lt;/word&gt;
    &lt;word&gt;rock&lt;/word&gt;
    &lt;word&gt;sand&lt;/word&gt;
    &lt;word&gt;river&lt;/word&gt;
&lt;/words&gt;

This is the words.xml file. 

users.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;users&gt;
  &lt;user id="1"&gt;
    &lt;name&gt;John Doe&lt;/name&gt;
    &lt;occupation&gt;gardener&lt;/occupation&gt;
  &lt;/user&gt;
  &lt;user id="2"&gt;
    &lt;name&gt;Jane Doe&lt;/name&gt;
    &lt;occupation&gt;teacher&lt;/occupation&gt;
  &lt;/user&gt;
  &lt;user id="3"&gt;
    &lt;name&gt;Roger Roe&lt;/name&gt;
    &lt;occupation&gt;driver&lt;/occupation&gt;
  &lt;/user&gt;
  &lt;user id="4"&gt;
    &lt;name&gt;Lucia Smith&lt;/name&gt;
    &lt;occupation&gt;shopkeeper&lt;/occupation&gt;
  &lt;/user&gt;
&lt;/users&gt;

This is the users.xml file. 

continents.xml
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;continents&gt;
    &lt;europe&gt;
        &lt;slovakia&gt;
            &lt;capital&gt;Bratislava&lt;/capital&gt;
            &lt;population&gt;421000&lt;/population&gt;
        &lt;/slovakia&gt;
        &lt;hungary&gt;
            &lt;capital&gt;Budapest&lt;/capital&gt;
            &lt;population&gt;1759000&lt;/population&gt;
        &lt;/hungary&gt;
        &lt;poland&gt;
            &lt;capital&gt;Warsaw&lt;/capital&gt;
            &lt;population&gt;1735000&lt;/population&gt;
        &lt;/poland&gt;
    &lt;/europe&gt;
    &lt;asia&gt;
        &lt;china&gt;
            &lt;capital&gt;Beijing&lt;/capital&gt;
            &lt;population&gt;21700000&lt;/population&gt;
        &lt;/china&gt;
        &lt;vietnam&gt;
            &lt;capital&gt;Hanoi&lt;/capital&gt;
            &lt;population&gt;7500000&lt;/population&gt;
        &lt;/vietnam&gt;
    &lt;/asia&gt;
&lt;/continents&gt;

This is the continents.xml file. 

## C# XmlDocument DocumentElement

The DocumentElement returns the root XmlElement for
the document.

Program.cs
  

using System.Xml;

var xmlData = @"&lt;?xml version=""1.0"" encoding=""UTF-8""?&gt;
    &lt;words&gt;
    &lt;word&gt;falcon&lt;/word&gt;
    &lt;word&gt;sky&lt;/word&gt;
    &lt;word&gt;bottom&lt;/word&gt;
    &lt;word&gt;cup&lt;/word&gt;
    &lt;word&gt;book&lt;/word&gt;
    &lt;word&gt;rock&lt;/word&gt;
    &lt;word&gt;sand&lt;/word&gt;
    &lt;word&gt;river&lt;/word&gt;
    &lt;/words&gt;
    ";

var doc = new XmlDocument();
doc.LoadXml(xmlData);

Console.WriteLine(doc.DocumentElement?.Name);
Console.WriteLine(doc.DocumentElement?.FirstChild?.InnerText);
Console.WriteLine(doc.DocumentElement?.LastChild?.InnerText);
Console.WriteLine(doc.DocumentElement?.OuterXml);
Console.WriteLine(doc.DocumentElement?.InnerXml);

We load XML data into the XmlDocument and get the root element of 
the document; we call properties of the root node.

var xmlData = @"&lt;?xml version=""1.0"" encoding=""UTF-8""?&gt;
  &lt;words&gt;
  &lt;word&gt;falcon&lt;/word&gt;
  &lt;word&gt;sky&lt;/word&gt;
  &lt;word&gt;bottom&lt;/word&gt;
  &lt;word&gt;cup&lt;/word&gt;
  &lt;word&gt;book&lt;/word&gt;
  &lt;word&gt;rock&lt;/word&gt;
  &lt;word&gt;sand&lt;/word&gt;
  &lt;word&gt;river&lt;/word&gt;
  &lt;/words&gt;
  ";

We have XML data as a multi-line string.

var doc = new XmlDocument();
doc.LoadXml(xmlData);

We create an XmlDocument and load the XML data with
LoadXml method. 

Console.WriteLine(doc.DocumentElement?.Name);

The Name property returns the name of the node.

Console.WriteLine(doc.DocumentElement?.FirstChild?.InnerText);
Console.WriteLine(doc.DocumentElement?.LastChild?.InnerText);

We get the first and last child of the root node with FirstChild
and LastChild. The InnerText property 
returns the values of the node and all its child nodes.

Console.WriteLine(doc.DocumentElement?.OuterXml);

The OuterXml property gets the markup containing this node and all
its child nodes.

Console.WriteLine(doc.DocumentElement?.InnerXml);

The InnerXml property gets or sets the markup representing only the
child nodes of this node.

$ dotnet run 
words
falcon
river
&lt;words&gt;&lt;word&gt;falcon&lt;/word&gt;&lt;word&gt;sky&lt;/word&gt;&lt;word&gt;bottom&lt;/word&gt;&lt;word&gt;cup&lt;/word&gt;...
&lt;word&gt;falcon&lt;/word&gt;&lt;word&gt;sky&lt;/word&gt;&lt;word&gt;bottom&lt;/word&gt;&lt;word&gt;cup&lt;/word&gt;...

## C# XmlNode.RemoveChild

The XmlNode.RemoveChild method removes the specified child node.

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/users.xml";

var doc = new XmlDocument();
doc.Load(xmlFile);

XmlElement root = doc.DocumentElement;
XmlNode userNode = root?.LastChild;

if (userNode != null)
{
    root.RemoveChild(userNode);
}

var xmlFile2 = "/home/janbodnar/Documents/users2.xml";

doc.Save(xmlFile2);

In the example, we remove the last child in the document. Note that the method 
does not modify the original file; it modifies the in-memory representation of 
the document and the modified document is saved into a new file.

## C# XmlDocument.CreateElement

The XmlDocument.CreateElement method creates an element with the
specified name.

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/words.xml";

var doc = new XmlDocument();
doc.Load(xmlFile);

XmlElement root = doc.DocumentElement;

XmlElement e1 = doc.CreateElement("word");
e1.InnerText = "eagle";
root?.InsertAfter(e1, root.LastChild);

XmlElement e2 = doc.CreateElement("word");
e2.InnerText = "cheetah";
root?.InsertBefore(e2, root.FirstChild);

var xmlFile2 = "/home/janbodnar/Documents/words2.xml";
doc.Save(xmlFile2);

In the example, we create two new elements. 

XmlElement e1 = doc.CreateElement("word");
e1.InnerText = "eagle";

A new element named word is created with
CreateElement. Its text is set with InnerText
property.

root?.InsertAfter(e1, root.LastChild);

The newly created element is inserted after the last child with
InsertAfter.

XmlElement e2 = doc.CreateElement("word");
e2.InnerText = "cheetah";
root?.InsertBefore(e2, root.FirstChild);

The second element is inserted before the first element with
InsertBefore.

## C# XmlDocument create new document

In the following example, we create a new XML document.

Program.cs
  

using System.Xml;

var users = new Dictionary&lt;long, User&gt;();
users.Add(1, new User(1L, "John Doe", "gardener"));
users.Add(2, new User(2L, "Jane Doe", "teacher"));
users.Add(3, new User(3L, "Roger Roe", "driver"));
users.Add(4, new User(4L, "Lucia Smith", "shopkeeper"));

var doc = new XmlDocument();
XmlDeclaration xmlDeclaration = doc.CreateXmlDeclaration("1.0",
    "UTF-8", string.Empty);

doc.AppendChild(xmlDeclaration);

XmlElement usersNode = doc.CreateElement("users");
doc.AppendChild(usersNode);

foreach (var (_, value) in users)
{
    XmlElement userEl = doc.CreateElement("user");
    usersNode.AppendChild(userEl);

    XmlAttribute e = doc.CreateAttribute("id");
    e.Value = value.Id.ToString();
    userEl.Attributes.Append(e);

    XmlElement e2 = doc.CreateElement("name");
    e2.InnerText = value.Name;
    userEl.AppendChild(e2);
    
    XmlElement e3 = doc.CreateElement("occupation");
    e3.InnerText = value.Occupation;
    userEl.AppendChild(e3);
}

doc.Save(Console.Out);

internal record User(long Id, string Name, string Occupation);

A new XML document is created from a dictionary of user objects.

var users = new Dictionary&lt;long, User&gt;();
users.Add(1, new User(1L, "John Doe", "gardener"));
users.Add(2, new User(2L, "Jane Doe", "teacher"));
users.Add(3, new User(3L, "Roger Roe", "driver"));
users.Add(4, new User(4L, "Lucia Smith", "shopkeeper"));

We have  a dictionary of users.

var doc = new XmlDocument();
XmlDeclaration xmlDeclaration = doc.CreateXmlDeclaration("1.0",
    "UTF-8", string.Empty);

An XmlDocument and a XmlDeclaration are created.

doc.AppendChild(xmlDeclaration);

The XmlDeclaration is appended to the document with
AppendChild. The declaration tag is the first tag in the document.

XmlElement usersNode = doc.CreateElement("users");
doc.AppendChild(usersNode);

We create the root node of the document.

foreach (var (_, value) in users)
{
    XmlElement userEl = doc.CreateElement("user");
    usersNode.AppendChild(userEl);

    XmlAttribute e = doc.CreateAttribute("id");
    e.Value = value.Id.ToString();
    userEl.Attributes.Append(e);

    XmlElement e2 = doc.CreateElement("name");
    e2.InnerText = value.Name;
    userEl.AppendChild(e2);
    
    XmlElement e3 = doc.CreateElement("occupation");
    e3.InnerText = value.Occupation;
    userEl.AppendChild(e3);
}

We go through the dictionary and create necessary elements and an attribute for 
each user object.

doc.Save(Console.Out);

This time we output the XML data to the console.

$ dotnet run
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;users&gt;
  &lt;user id="1"&gt;
    &lt;name&gt;John Doe&lt;/name&gt;
    &lt;occupation&gt;gardener&lt;/occupation&gt;
  &lt;/user&gt;
  &lt;user id="2"&gt;
    &lt;name&gt;Jane Doe&lt;/name&gt;
    &lt;occupation&gt;teacher&lt;/occupation&gt;
  &lt;/user&gt;
  &lt;user id="3"&gt;
    &lt;name&gt;Roger Roe&lt;/name&gt;
    &lt;occupation&gt;driver&lt;/occupation&gt;
  &lt;/user&gt;
  &lt;user id="4"&gt;
    &lt;name&gt;Lucia Smith&lt;/name&gt;
    &lt;occupation&gt;shopkeeper&lt;/occupation&gt;
  &lt;/user&gt;
&lt;/users&gt;

## C# XmlNode.ChildNodes

The XmlNode.ChildNodes returns all the children of the given node.
The property returns the XmlNodeList, which represents an ordered
collection of nodes.

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/words.xml";

var doc = new XmlDocument();
doc.Load(xmlFile);
XmlElement root = doc.DocumentElement;
XmlNodeList childNodes = root?.ChildNodes;

if (childNodes == null)
{
    Console.WriteLine("no nodes found");
    Environment.Exit(1);
}

foreach (XmlNode node in childNodes)
{
    Console.WriteLine(node.InnerText);
}

In the example, we get all the children of the root node and print their inner 
text content.

$ dotnet run
falcon
sky
bottom
cup
book
rock
sand
river

## C# XmlNodeList.Count

The XmlNodeList.Count property gets the number of nodes in the
XmlNodeList.

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/words.xml";
    
var doc = new XmlDocument();
doc.Load(xmlFile);

XmlElement root = doc.DocumentElement;
int? n = root?.ChildNodes.Count;

Console.WriteLine($"There are {n} elements");

We get the number of elements inside the root node.

$ dotnet run 
There are 8 elements

## C# XmlNode.SelectSingleNode

The XmlNode.SelectSingleNode selects the first XmlNode that matches
the XPath expression.

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/users.xml";

var doc = new XmlDocument();
doc.Load(xmlFile);

int id = 2;

XmlNode node = doc.SelectSingleNode($"/users/user[@id='{id}']");

if (node == null)
{
    Console.WriteLine("node not found");
    Environment.Exit(1);
}

var name = node.ChildNodes[0]?.InnerText;
var occupation = node.ChildNodes[1]?.InnerText;
var uid = node.Attributes?["id"]?.Value;

Console.WriteLine($"Id: {uid}");
Console.WriteLine($"Name: {name}");
Console.WriteLine($"Occupation: {occupation}");

From the words.xml file, we select the word node with Id attribute
6.

XmlNode node = doc.SelectSingleNode($"/users/user[@id='{id}']");

A single node is selected with SelectSingleNode; the 
/users/user[@id='{id}'] is the query expression to get to the 
desired node.

var name = node.ChildNodes[0]?.InnerText;
var occupation = node.ChildNodes[1]?.InnerText;
var uid = node.Attributes?["id"]?.Value;

We get the node's text and attribute.

$ dotnet run
Id: 2
Name: Jane Doe
Occupation: teacher

## C# XmlNode.SelectNodes

The XmlNode.SelectNodes selects a list of nodes matching the XPath
expression.

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/users.xml";

var doc = new XmlDocument();
doc.Load(xmlFile);
XmlNodeList nodes = doc.SelectNodes("/users/user");

var users = new List&lt;User&gt;();

if (nodes == null)
{
    Console.WriteLine("No users found");
    Environment.Exit(1);
}

foreach (XmlNode node in nodes)
{
    long id = long.Parse(node.Attributes?.GetNamedItem("id")?.Value!);
    string name = node.ChildNodes[0]?.InnerText;
    string occupation = node.ChildNodes[1]?.InnerText;

    var user = new User(id, name, occupation);
    users.Add(user);
}

users.ForEach(Console.WriteLine);

record User(long Id, string Name, string Occupation);

In the example, we select all users from the users.xml file.

XmlNodeList nodes = doc.SelectNodes("/users/user");

The /users/user is the path to get all users. The
SelectNodes method returns an XmlNodeList.

foreach (XmlNode node in nodes)
{
    long id = long.Parse(node.Attributes?.GetNamedItem("id")?.Value!);
    string name = node.ChildNodes[0]?.InnerText;
    string occupation = node.ChildNodes[1]?.InnerText;

    var user = new User(id, name, occupation);
    users.Add(user);
}

We go through the XmlNodeList and create a User object 
from the retrieved data.

$ dotnet run
User { Id = 1, Name = John Doe, Occupation = gardener }
User { Id = 2, Name = Jane Doe, Occupation = teacher }
User { Id = 3, Name = Roger Roe, Occupation = driver }
User { Id = 4, Name = Lucia Smith, Occupation = shopkeeper }

## C# XmlElement.GetElementsByTagName

The XmlElement.GetElementsByTagName returns an
XmlNodeList containing a list of all descendant elements that match
the specified tag name.

 

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/continents.xml";

XmlDocument doc = new XmlDocument();
doc.Load(xmlFile);

XmlNodeList nodes = doc.GetElementsByTagName("capital");
Console.WriteLine("All capitals:");

foreach (XmlNode node in nodes)
{
    var text = node.InnerText;
    Console.WriteLine(text);
}

We go over the capital tags in the continents.xml
file. 

$ dotnet run
All capitals:
Bratislava
Budapest
Warsaw
Beijing
Hanoi

## C# XmlDocument.CreateNavigator

The XmlDocument.CreateNavigator creates a
XPathNavigator object for navigating the document. The
XPathNodeIterator provides an iterator over a selected set of
nodes.

Program.cs
  

using System.Xml;
using System.Xml.XPath;

var xmlFile = "/home/janbodnar/Documents/users.xml";

var doc = new XmlDocument();
doc.Load(xmlFile);

XPathNavigator rootNav = doc.CreateNavigator();
XPathNodeIterator it = rootNav?.Select("descendant::users/user");

if (it == null)
{
    Console.WriteLine("no users found");
    Environment.Exit(1);
}

while (it.MoveNext())
{
    
    XPathNavigator nav = it.Current;

    var uId = nav?.GetAttribute("id", string.Empty);
    Console.WriteLine(uId);
    
    XPathNodeIterator nodeIt = nav?.SelectChildren(XPathNodeType.Element);

    if (nodeIt != null)
    {
        foreach (var e in nodeIt)
        {
            Console.WriteLine(e);
        }
    }

    Console.WriteLine("--------------------");
}

We use the XPathNavigator and the XPathNodeIterator to
go over users in the users.xml file. 

XPathNavigator rootNav = doc.CreateNavigator();
XPathNodeIterator it = rootNav?.Select("descendant::users/user");
...
while (it.MoveNext())

First, we go over the user tags.

XPathNavigator nav = it.Current;

var uId = nav?.GetAttribute("id", string.Empty);
Console.WriteLine(uId);

XPathNodeIterator nodeIt = nav?.SelectChildren(XPathNodeType.Element);

if (nodeIt != null)
{
    foreach (var e in nodeIt)
    {
        Console.WriteLine(e);
    }
}

Then we go over the elements of each user tag.

$ dotnet run
1
John Doe
gardener
--------------------
2
Jane Doe
teacher
--------------------
3
Roger Roe
driver
--------------------
4
Lucia Smith
shopkeeper
--------------------

## C# XmlDocument recursive loop

In the following example, we recursively loop over the tags of the
users.xml file.

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/users.xml";

var doc = new XmlDocument();
doc.Load(xmlFile);

traverse(doc.DocumentElement);

void traverse(XmlNode node)
{
    if (node is XmlElement)
    {
        if (node.Name == "users")
        {
            Console.WriteLine(node.Name);
        }
        else if (node.Name == "user")
        {
            Console.WriteLine("--------------------");
            Console.WriteLine(node.Name);
        }
        else
        {
            Console.WriteLine($"  {node.Name}");
        }

        if (node.HasChildNodes)
        {
            traverse(node.FirstChild);
        }

        if (node.NextSibling != null)
        {
            traverse(node.NextSibling);
        }
    }
    else if (node is XmlText)
    {
        var text = ((XmlText) node).Value;
        Console.WriteLine($"    {text}");
    }
}

We parse the users.xml with a recursive algorithm.

traverse(doc.DocumentElement);

We start by passing the root element to the traverse method.

if (node is XmlElement)
{
  ...
}
else if (node is XmlText)
{
    var text = ((XmlText) node).Value;
    Console.WriteLine($"    {text}");
}

We check if the node is an XmlElement or an XmlText. 
In the latter case, we output the textual content of the node.

if (node.HasChildNodes)
{
    traverse(node.FirstChild);
}

If the node has children, we recursively call the traverse method 
passing it its first child. 

if (node.NextSibling != null)
{
    traverse(node.NextSibling);
}

We go recursively to the next sibling if there is any.

$ dotnet run
users
--------------------
user
  name
    John Doe
  occupation
    gardener
--------------------
user
  name
    Jane Doe
  occupation
    teacher
--------------------
user
  name
    Roger Roe
  occupation
    driver
--------------------
user
  name
    Lucia Smith
  occupation
    shopkeeper

In this article we have worked with XML data in C# using
XmlDocument.

## C# XmlDocument read currency rates

In the following example, we read data from European Central Bank.

Program.cs
  

using System.Xml;

var xmlRes = "http://www.ecb.int/stats/eurofxref/eurofxref-daily.xml";

var doc = new XmlDocument();
doc.Load(xmlRes);

XmlNodeList nodes = doc.DocumentElement?.ChildNodes[2]?.ChildNodes[0]?.ChildNodes;

foreach (XmlNode xmlNode in nodes!)
{
    if (xmlNode.Attributes == null) continue;

    var cur = xmlNode.Attributes["currency"]?.Value;
    var rate = xmlNode.Attributes["rate"]?.Value;

    Console.WriteLine($"{cur}: {rate}");
}

We get the currency rates for Euro.

$ dotnet run
USD: 1.1904
JPY: 130.20
BGN: 1.9558
CZK: 26.031
DKK: 7.4369
GBP: 0.86518
HUF: 356.43
PLN: 4.5246
RON: 4.9203
SEK: 10.1975
CHF: 1.0998
ISK: 151.90
NOK: 10.0940
HRK: 7.5673
RUB: 91.9588
...

## C# XmlDocument validate

An XML document with a correct syntax is said to be well formed. Validation is
the process of checking an XML document to confirm that it is both well-formed
and also valid. A valid document adheres the rules dictated by a particular DTD
or XML schema.

XML Schema, or XML Schema Definition (XSD), is a formal description of the 
the structure and the content of an XML document. It is used to validate the 
XML document.

users.xsd
  

&lt;?xml version="1.0" encoding="UTF-8"?&gt;
&lt;xs:schema elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema"&gt;
    &lt;xs:element name="users" type="usersType"/&gt;

    &lt;xs:complexType name="userType"&gt;
        &lt;xs:sequence&gt;
            &lt;xs:element name="name" type="xs:string"/&gt;
            &lt;xs:element name="occupation" type="xs:string"/&gt;
        &lt;/xs:sequence&gt;
        &lt;xs:attribute type="xs:string" name="id"/&gt;
    &lt;/xs:complexType&gt;

    &lt;xs:complexType name="usersType"&gt;
        &lt;xs:sequence&gt;
            &lt;xs:element name="user" type="userType" maxOccurs="unbounded" minOccurs="0"/&gt;
        &lt;/xs:sequence&gt;
    &lt;/xs:complexType&gt;
  
&lt;/xs:schema&gt;

We have the schema definition for the users.xml file.

Program.cs
  

using System.Xml;
using System.Xml.Schema;

var xmlFile = "/home/janbodnar/Documents/users.xml";
var xmlSchema = "/home/janbodnar/Documents/users.xsd";

try
{
    var settings = new XmlReaderSettings();
    settings.Schemas.Add(null, xmlSchema);
    settings.ValidationType = ValidationType.Schema;
    settings.ValidationEventHandler += ValidationEventHandler;
    
    XmlReader reader = XmlReader.Create(xmlFile, settings);
    var doc = new XmlDocument();
    doc.Load(reader);

    Console.WriteLine("validation passed");
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

void ValidationEventHandler(object sender, ValidationEventArgs e)
{
    Console.WriteLine($"Document validation error: {e.Message}");
    Environment.Exit(1);
}

We validate the users.xml document against the
users.xsd schema.

## C# XmlDocument event

There are event handlers to react to nodes being changed, inserted, or removed.

Program.cs
  

using System.Xml;

var xmlFile = "/home/janbodnar/Documents/words.xml";

var doc = new XmlDocument();
doc.Load(xmlFile);

XmlElement root = doc.DocumentElement;

doc.NodeChanged += MyNodeChangedEvent;
doc.NodeInserted += MyNodeInsertedEvent;
doc.NodeRemoved += MyNodeRemovedEvent;

XmlNode node = root?.LastChild;
root?.RemoveChild(node!);

XmlElement e1 = doc.CreateElement("word");
e1.InnerText = "eagle";
root?.AppendChild(e1);

XmlNode n1 = doc.SelectSingleNode("//words/word[text()='bottom']");
Console.WriteLine(n1?.InnerText);
if (n1 != null) n1.InnerText = "star";
doc.Save("/home/janbodnar/Documents/words3.xml");

void MyNodeChangedEvent(Object src, XmlNodeChangedEventArgs args)
{
    Console.WriteLine($"Node Changed Event Fired for node {args.Node?.Name}");
    Console.WriteLine(args.Node?.Value);
}

void MyNodeInsertedEvent(Object src, XmlNodeChangedEventArgs args)
{
    Console.WriteLine($"Node Inserted Event Fired for node {args.Node?.Name}");
    Console.WriteLine(args.Node?.Value);
}

void MyNodeRemovedEvent(Object src, XmlNodeChangedEventArgs args)
{
    Console.WriteLine($"Node Removed Event Fired for node {args.Node?.Name}");
    Console.WriteLine(args.Node?.Value);
}

In the example, we create three event handlers.

doc.NodeChanged += MyNodeChangedEvent;
doc.NodeInserted += MyNodeInsertedEvent;
doc.NodeRemoved += MyNodeRemovedEvent;

We plug event handlers for nodes being changed, inserted, and removed.

XmlNode node = root?.LastChild;
root?.RemoveChild(node!);

We remove the last child. This triggers the MyNodeRemovedEvent.

XmlElement e1 = doc.CreateElement("word");
e1.InnerText = "eagle";
root?.AppendChild(e1);

We create a new node. This triggers the two pieces of
MyNodeInsertedEvent: one for inserting text and one for inserting 
the node.

XmlNode n1 = doc.SelectSingleNode("//words/word[text()='bottom']");
Console.WriteLine(n1?.InnerText);
if (n1 != null) n1.InnerText = "star";

We modify the content of a node. This triggers the
MyNodeChangedEvent.

$ dotnet run 
Node Removed Event Fired for node word
Node Inserted Event Fired for node #text
eagle
Node Inserted Event Fired for node word
bottom
Node Changed Event Fired for node #text
star

## Source

[XmlDocument class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.xml.xmldocument?view=net-8.0)

In this article we have worked with XML data in C# using
XmlDocument.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).