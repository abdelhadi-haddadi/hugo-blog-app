+++
title = "C# YAML"
date = 2025-08-29T19:51:39.012+01:00
draft = false
description = "Learn how to work with YAML in C# using YamlDotNet. This tutorial covers YAML parsing, serialization, and practical examples for .NET developers."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# YAML

last modified May 1, 2025

 

In this article we show how to work with the YAML format in C# using the
YamlDotNet library.

## Understanding YAML

YAML (**YAML Ain't Markup Language**) is a human-friendly,
data-serialization format widely used for **configuration files**,
data storage (e.g., debugging output), and **data transmission**
(e.g., document headers).

It natively supports three fundamental data types:

    - **Scalars** - Strings, integers, and floats.

    - **Lists** - Ordered sequences of values.

    - **Associative arrays** - Key-value mappings.

YAML files typically use the .yaml extension, which is the
officially recommended format.

### Using YAML in .NET

The *YamlDotNet* library allows .NET developers to parse and serialize
YAML data efficiently. To install the package, run the following command:

$ dotnet add package YamlDotNet

Once installed, the library can be integrated into your project to handle
YAML-based data structures.

## C# YamlStream

YamlStream allows us to read YAML data via a stream. 

Program.cs
  

using YamlDotNet.RepresentationModel;

string doc = @"
cities:
  - Bratislava
  - Kosice
  - Trnava
  - Moldava
  - Trencin
name: John Doe
occupation: gardener";

using var sr = new StringReader(doc);

var yaml = new YamlStream();
yaml.Load(sr);

var root = (YamlMappingNode) yaml.Documents[0].RootNode;

foreach (var e in root.Children)
{
    Console.WriteLine(e);
    Console.WriteLine($"{e.Key} {e.Value}");
}

Console.WriteLine("------------------------------");

Console.WriteLine(root["name"]);
Console.WriteLine(root["occupation"]);
Console.WriteLine(root["cities"]);

In the example, we read YAML from a string using YamlStream.

string doc = @"
cities:
    - Bratislava
    - Kosice
    - Trnava
    - Moldava
    - Trencin
name: John Doe
occupation: gardener";

This is the YAML data defined inside a C# string.

using var sr = new StringReader(doc);

var yaml = new YamlStream();
yaml.Load(sr);

We pass the string to the StringReader. The
StringReader is then loaded to the YamlStream with
Load.

var root = (YamlMappingNode) yaml.Documents[0].RootNode;

We get the root node of the document.

foreach (var e in root.Children)
{
    Console.WriteLine(e);
    Console.WriteLine($"{e.Key} {e.Value}");
}

We iterate over the children of the root node. Each node has a key and value.

Console.WriteLine(root["name"]);
Console.WriteLine(root["occupation"]);
Console.WriteLine(root["cities"]);

This is another way to access the keys. 

$ dotnet run 
[cities, [ Bratislava, Kosice, Trnava, Moldava, Trencin ]]
cities [ Bratislava, Kosice, Trnava, Moldava, Trencin ]
[name, John Doe]
name John Doe
[occupation, gardener]
occupation gardener
------------------------------
John Doe
gardener
[ Bratislava, Kosice, Trnava, Moldava, Trencin ]

## YAML documents

YAML documents are separated with ---.

data.yaml
  

name: Document 1
cities:
  - Bratislava
  - Kosice
  - Trnava
  - Moldava
  - Trencin
---
name: Document 2
companies:
  - Eset
  - Slovnaft
  - Duslo Sala
  - Matador Puchov

We have two documents in the YAML file.

Program.cs
  

using YamlDotNet.RepresentationModel;

string data = File.ReadAllText("data.yaml");
using var sr = new StringReader(data);

var yaml = new YamlStream();
yaml.Load(sr);

int n = yaml.Documents.Count;

for (int i = 0; i &lt; n; i++)
{
    var root = (YamlMappingNode)yaml.Documents[i].RootNode;
    foreach (var e in root.Children)
    {
        Console.WriteLine($"{e.Key} {e.Value}");
    }

    Console.WriteLine("-------------------------------");
}

The program reads both documents with YamlStream.

string data = File.ReadAllText("data.yaml");

We read the data from the file into a string with File.ReadALlText.

int n = yaml.Documents.Count;

We get the number of documents using Count.

for (int i = 0; i &lt; n; i++)
{
    var root = (YamlMappingNode)yaml.Documents[i].RootNode;
    foreach (var e in root.Children)
    {
        Console.WriteLine($"{e.Key} {e.Value}");
    }

    Console.WriteLine("-------------------------------");
}

We iterate over the children of the documents.

$ dotnet run 
name Document 1
cities [ Bratislava, Kosice, Trnava, Moldava, Trencin ]
-------------------------------
name Document 2
companies [ Eset, Slovnaft, Duslo Sala, Matador Puchov ]

## Serialize data

YAML serializing is the process of transforming C# objects into YAML strings.
This is done with the SerializerBuilder.

Program.cs
  

using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

var users = new List&lt;User&gt;
{
    new ("John Doe", "gardener") ,
    new ("Roger Roe", "driver") ,
    new ("Valeria Smith", "teacher"),
};

var serializer = new SerializerBuilder()
    .WithNamingConvention(CamelCaseNamingConvention.Instance)
    .Build();
var yaml = serializer.Serialize(users);

Console.WriteLine(yaml);

record User(string Name, string Occupation);

The program transforms a list of User objects into a YAML string.

var serializer = new SerializerBuilder()
    .WithNamingConvention(CamelCaseNamingConvention.Instance)
    .Build();

We create the SerializerBuilder and configure it.

var yaml = serializer.Serialize(users);

We serialize the data using the Serialize method.

$ dotnet run 
- name: John Doe
  occupation: gardener
- name: Roger Roe
  occupation: driver
- name: Valeria Smith
  occupation: teacher

## Deserialize data

Deserializing is the process of transforming a YAML string into C# objects.

users.yaml
  

- Name: John Doe
  Occupation: gardener
- Name: Roger Roe
  Occupation: driver
- Name: Valeria Smith
  Occupation: teacher

We have a list of users in the users.yaml file.

Program.cs
  

using YamlDotNet.Serialization;

var deserializer = new DeserializerBuilder()
     .Build();

using var sr = File.OpenText("users.yaml");
List&lt;User&gt; users = deserializer.Deserialize&lt;List&lt;User&gt;&gt;(sr);

foreach (var user in users)
{
    Console.WriteLine(user);
}

class User
{
    public string? Name { get; set; }
    public string? Occupation { get; set; }

    public override string ToString()
    {
        return $"{this.Name} {this.Occupation}";
    }
}

In the program, we read the data from the file and deserialize it into a list 
of User objects.

$ dotnet run 
John Doe gardener
Roger Roe driver
Valeria Smith teacher

## Source

[YamlDotNet Github page](https://github.com/aaubry/YamlDotNet)

In this article, we explored how to work with the YAML format in C# using the
YamlDotNet library. By leveraging its capabilities, developers can
efficiently parse, serialize, and manage YAML data within .NET applications.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).