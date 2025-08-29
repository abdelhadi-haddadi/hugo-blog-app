+++
title = "C# XmlWriter"
date = 2025-08-29T19:51:37.864+01:00
draft = false
description = "C# XmlWriter tutorial shows how to write XML data in C# with XmlWriter. XmlWriter represents a writer that provides a fast, non-cached, forward-only way to generate streams or files with XML data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# XmlWriter

last modified July 5, 2023

 

C# XmlWriter tutorial shows how to write XML data in C# with XmlWriter.

## XmlWriter

XmlWriter represents a writer that provides a fast, non-cached,
forward-only way to generate streams or files with XML.

The XmlWriter is available in the System.Xml
namespace.

## C# XmlWriter example

The following example creates a simple C# XmlWriter.

Program.cs
  

using System.Xml;

var sts = new XmlWriterSettings()
{
    Indent = true,
};

using XmlWriter writer = XmlWriter.Create("data.xml", sts);

writer.WriteStartDocument();

writer.WriteStartElement("value");
writer.WriteValue(6); 
writer.WriteEndElement();

writer.WriteEndDocument();

Console.WriteLine("XML document created");

We create a new XML document. It contains the XML declaration and a single XML
tag.

var sts = new XmlWriterSettings()
{
    Indent = true,
};

using XmlWriter writer = XmlWriter.Create("data.xml", sts);

The XmlWriter is created with the Create method. We 
pass the name of the document and the settings to the method.

writer.WriteStartDocument();

The WriteStartDocument method starts a new document. 

writer.WriteStartElement("value");
writer.WriteValue(6); 
writer.WriteEndElement();

The WriteStartElement and the WriteEndElement pair is
used to add a new element to the document. The WriteValue writes a
single simple-typed value.

writer.WriteEndDocument();

The WriteEndDocument closes any open elements or attributes and
puts the writer back in the start state.

$ dotnet run 
XML document created

$ cat data.xml 
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;value&gt;6&lt;/value&gt;

## C# XmlWriter example II

The following example creates an XML file with two books.

Program.cs
  

using System.Xml;

var sts = new XmlWriterSettings()
{
    Indent = true,
};

using var writer = XmlWriter.Create("books.xml", sts);

writer.WriteStartDocument();
writer.WriteStartElement("bookstore");

writer.WriteStartElement("book");
writer.WriteAttributeString("genre", "Science Fiction");

writer.WriteStartElement("title");
writer.WriteString("Dune");
writer.WriteEndElement();

writer.WriteStartElement("author");
writer.WriteString("Frank Herbert");
writer.WriteEndElement();

writer.WriteStartElement("price");
writer.WriteString("8.99");
writer.WriteEndElement();

writer.WriteEndElement(); // end of book

writer.WriteStartElement("book");
writer.WriteAttributeString("genre", "Novel");

writer.WriteStartElement("title");
writer.WriteString("Old Goriot");
writer.WriteEndElement();

writer.WriteStartElement("author");
writer.WriteString("Honoré de Balzac");
writer.WriteEndElement();

writer.WriteStartElement("price");
writer.WriteString("9.0");
writer.WriteEndElement();

writer.WriteEndElement(); // end of book
writer.WriteEndDocument();

Console.WriteLine("XML document created");

In addition to XML tags, we also create attributes with
WriteAttributeString.

$ dotnet run
XML document created

$ cat books.xml 
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;bookstore&gt;
  &lt;book genre="Science Fiction"&gt;
    &lt;title&gt;Dune&lt;/title&gt;
    &lt;author&gt;Frank Herbert&lt;/author&gt;
    &lt;price&gt;8.99&lt;/price&gt;
  &lt;/book&gt;
  &lt;book genre="Novel"&gt;
    &lt;title&gt;Old Goriot&lt;/title&gt;
    &lt;author&gt;Honoré de Balzac&lt;/author&gt;
    &lt;price&gt;9.0&lt;/price&gt;
  &lt;/book&gt;
&lt;/bookstore&gt;

## C# XmlWriter example III

The next example creates an XML file with products.

Program.cs
  

using System.Xml;

var sts = new XmlWriterSettings()
{
    Indent = true,
};

using var writer = XmlWriter.Create("products.xml", sts);

var products = new List&lt;Product&gt;
{
    new Product(1, "Product A", 12.2M),
    new Product(2, "Product B", 11.3M),
    new Product(3, "Product C", 9M),
    new Product(4, "Product D", 5.6M),
    new Product(5, "Product E", 11.7M)
};

writer.WriteStartDocument();
writer.WriteStartElement("products");

foreach (var product in products)
{
    writer.WriteStartElement("product");

    writer.WriteStartElement("id");
    writer.WriteValue(product.id);
    writer.WriteEndElement();

    writer.WriteStartElement("name");
    writer.WriteValue(product.name);
    writer.WriteEndElement();

    writer.WriteStartElement("price");
    writer.WriteValue(product.price);
    writer.WriteEndElement();

    writer.WriteEndElement();  // end product
}

writer.WriteEndElement();
writer.WriteEndDocument();

Console.WriteLine("XML document created");

record Product(int id, string name, decimal price);

We have a list of products created with C# record type. We go over the list and 
generate an XML file from the objects.

$ dotnet run
XML document created
$ cat products.xml 
&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;products&gt;
  &lt;product&gt;
    &lt;id&gt;1&lt;/id&gt;
    &lt;name&gt;Product A&lt;/name&gt;
    &lt;price&gt;12.2&lt;/price&gt;
  &lt;/product&gt;
  &lt;product&gt;
    &lt;id&gt;2&lt;/id&gt;
    &lt;name&gt;Product B&lt;/name&gt;
    &lt;price&gt;11.3&lt;/price&gt;
  &lt;/product&gt;
  &lt;product&gt;
    &lt;id&gt;3&lt;/id&gt;
    &lt;name&gt;Product C&lt;/name&gt;
    &lt;price&gt;9&lt;/price&gt;
  &lt;/product&gt;
  &lt;product&gt;
    &lt;id&gt;4&lt;/id&gt;
    &lt;name&gt;Product D&lt;/name&gt;
    &lt;price&gt;5.6&lt;/price&gt;
  &lt;/product&gt;
  &lt;product&gt;
    &lt;id&gt;5&lt;/id&gt;
    &lt;name&gt;Product E&lt;/name&gt;
    &lt;price&gt;11.7&lt;/price&gt;
  &lt;/product&gt;
&lt;/products&gt;

## Source

[XmlWriter class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.xml.xmlwriter?view=net-8.0)

In this article we have written XML data with XmlWriter.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).