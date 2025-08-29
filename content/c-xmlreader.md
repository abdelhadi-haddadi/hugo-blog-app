+++
title = "C# XmlReader"
date = 2025-08-29T19:51:37.869+01:00
draft = false
description = "C# XmlReader tutorial shows how to read XML data in C# with XmlReader. XmlReader represents a reader that provides fast, noncached, forward-only access to XML data."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# XmlReader

last modified July 5, 2023

 

C# XmlReader tutorial shows how to use read XML data in C# with XmlReader.

## XmlReader

XmlReader represents a reader that provides fast, noncached, 
forward-only access to XML data.

The XmlReader is available in the System.Xml namespace.

## C# XmlReader example

The following example creates a simple C# XmlReader.

data.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;value&gt;6&lt;/value&gt;

We have a very simple XML file.

Program.cs
  

using System.Xml;

using var reader = XmlReader.Create("data.xml");

reader.MoveToContent();
var data = reader.ReadElementContentAsString();

Console.WriteLine(data);

In the example, we read the value from the simple XML document with
XmlReader.

using var reader = XmlReader.Create("data.xml");

The XmlReader is created with the Create method.

reader.MoveToContent();

The MoveToContent method skips the non-content nodes and moves to 
the next content node or to the end of the file.

var data = reader.ReadElementContentAsString();

The ReadElementContentAsString reads the current element and
returns the contents as a string.

$ dotnet run 
6

## C# XmlReader ReadToFollowing

The ReadToFollowing method advances the reader to the next
following element that matches the specified name and returns true if a matching
element is found.

books.xml
  

&lt;bookstore&gt;
    &lt;book genre='Science Fiction'&gt;
        &lt;title&gt;Dune&lt;/title&gt;
        &lt;author&gt;Frank Herbert&lt;/author&gt;
        &lt;price&gt;8.99&lt;/price&gt;
    &lt;/book&gt;
    &lt;book genre='Novel'&gt;
        &lt;title&gt;Old Goriot&lt;/title&gt;
        &lt;author&gt;Honoré de Balzac&lt;/author&gt;
        &lt;price&gt;9.0&lt;/price&gt;
    &lt;/book&gt;
&lt;/bookstore&gt;

This XML file contains books.

Program.cs
  

using System.Xml;

using var reader = XmlReader.Create("books.xml");

reader.ReadToFollowing("book");

do
{
    reader.MoveToFirstAttribute();
    Console.WriteLine($"genre: {reader.Value}");

    reader.ReadToFollowing("title");
    Console.WriteLine($"title: {reader.ReadElementContentAsString()}");

    reader.ReadToFollowing("author");
    Console.WriteLine($"author: {reader.ReadElementContentAsString()}");

    reader.ReadToFollowing("price");
    Console.WriteLine($"price: {reader.ReadElementContentAsString()}");

    Console.WriteLine("-------------------------");

} while (reader.ReadToFollowing("book"));

The example reads two books from the books.xml file.

reader.ReadToFollowing("book");

We start by advancing to the first book element.

reader.MoveToFirstAttribute();
Console.WriteLine($"genre: {reader.Value}");

We read the genre attribute with MoveToFirstAttribute.

reader.ReadToFollowing("title");
Console.WriteLine($"title: {reader.ReadElementContentAsString()}");

We read the contents of the title element.

} while (reader.ReadToFollowing("book"));

With the while loop we go through all the book elements in the 
XML file.

$ dotnet run
genre: Science Fiction
title: Dune
author: Frank Herbert
price: 8.99
-------------------------
genre: Novel
title: Old Goriot
author: Honoré de Balzac
price: 9.0
-------------------------

## C# XmlReader Read

The Read method reads the next node from the stream. 

products.xml
  

&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;products&gt;
    &lt;product&gt;
        &lt;id&gt;1&lt;/id&gt;
        &lt;name&gt;Product A&lt;/name&gt;
        &lt;price&gt;1200&lt;/price&gt;
    &lt;/product&gt;

    &lt;product&gt;
        &lt;id&gt;2&lt;/id&gt;
        &lt;name&gt;Product B&lt;/name&gt;
        &lt;price&gt;1100&lt;/price&gt;
    &lt;/product&gt;
&lt;/products&gt;

In this XML file, we have products.

Program.cs
  

using System.Xml;

Console.WriteLine("Products");
Console.WriteLine("----------------------");

using var reader = XmlReader.Create("products.xml");

reader.MoveToContent();

while (reader.Read())
{
    string result = reader.NodeType switch
    {
        XmlNodeType.Element when reader.Name == "product" =&gt; $"{reader.Name}\n",
        XmlNodeType.Element =&gt; $"{reader.Name}: ",
        XmlNodeType.Text =&gt; $"{reader.Value}\n",
        XmlNodeType.EndElement when reader.Name == "product" =&gt;  "-------------------\n",
        _ =&gt; ""
    };

    Console.Write(result);
    
}

The example presents the classic approach to reading XML files. We read the 
document node by node and in the switch statement or expression deal with the 
particular element, text, attribute or other type of node.

reader.MoveToContent();

We skip the root element and go right to the content of the document.

while (reader.Read())
{

The Read method reads the next node until the end of the document.

string result = reader.NodeType switch
{
    XmlNodeType.Element when reader.Name == "product" =&gt; $"{reader.Name}\n",
    XmlNodeType.Element =&gt; $"{reader.Name}: ",
    XmlNodeType.Text =&gt; $"{reader.Value}\n",
    XmlNodeType.EndElement when reader.Name == "product" =&gt;  "-------------------\n",
    _ =&gt; ""
};

We use the switch expression to process the different node types. The Name
property gives name of the current node. The Value property gets 
the text value of the current node.

$ dotnet run
Products
----------------------
product
id: 1
name: Product A
price: 1200
----------------------
product
id: 2
name: Product B
price: 1100
----------------------

## Source

[XmlReader class - language reference](https://learn.microsoft.com/en-us/dotnet/api/system.xml.xmlreader?view=net-8.0)

In this article we have read XML data with XmlReader.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).