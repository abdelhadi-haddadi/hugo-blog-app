+++
title = "C# Scriban"
date = 2025-08-29T19:51:21.048+01:00
draft = false
description = "C# Scriban tutorial shows how to usie Scriban template engine in C#. A template engine is used to combine templates with a data model to produce documents."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Scriban

last modified July 5, 2023

 

C# Scriban tutorial shows how to usie Scriban template engine in C#. 

## Scriban template engine

A template engine or template processor is a library designed to combine
templates with a data model to produce documents. Template engines are often
used to generate large amounts of emails, in source code preprocessing, or
producing dynamic HTML pages.

We create a template engine, where we define static parts and dynamic parts.
The dynamic parts are later replaced with data. The rendering function later
combines the templates with data. A template engine is used to combine
templates with a data model to produce documents.

Scriban uses {{ }} for code blocks and {%{  }%} for
escape blocks. Any other text is considered as a text block and simply output as
is.

The Template.Parse method parses the text data into a template and
the Template.Render renders the template into the final output
using the provided data model.

$ dotnet add package Scriban

We need to add the Scriban package to our projects.

## Scriban simple example

The following is a simple Scriban example.

Program.cs
  

using Scriban;

var name = "John Doe";

var tpl = Template.Parse("Hello {{name}}!");
var res = tpl.Render(new { name = name });

Console.WriteLine(res);

The program prints a small message to the console.

var tpl = Template.Parse("Hello {{name}}!");

The Template.Parse method parses the specified scripting text into
a template. With {{ }} we output the content of the
name variable.

var res = tpl.Render(new { Name = name });

The Render method renders the template using the specified object
model.

$ dotnet run
Hello John Doe!

In the next example, we pass two variables to the template engine.

Program.cs
  

using Scriban;

var name = "John Doe";
var occupation = "gardener";

var txt = "{{name}} is a {{occupation}}";
var tpl = Template.Parse(txt);
var res = tpl.Render(new { name, occupation });

Console.WriteLine(res);

The program prints a message using data from two variables: name
and occupation.

$ dotnet run
John Doe is a gardener

## Scriban for loop

Loops are created with for directive.

Program.cs
  

using Scriban;

string[] words = { "sky", "blue", "falcon", "book", "ocean", "dog" };

var html = @"
&lt;ul&gt;
{{- for word in words }}
    &lt;li&gt; {{ word }} &lt;/li&gt;
{{- end }}
&lt;/ul&gt;
";

var tpl = Template.Parse(html);
var res = tpl.Render(new { words = words });

Console.WriteLine(res);

The example uses the for directive to output an array of words into 
an HTML list.

{{- for word in words }}
    &lt;li&gt; {{ word }} &lt;/li&gt;
{{- end }}

We iterate over the array of words. The - character strips white 
space characters on the left.

$ dotnet run 
&lt;ul&gt;
    &lt;li&gt;sky&lt;/li&gt;
    &lt;li&gt;blue&lt;/li&gt;
    &lt;li&gt;falcon&lt;/li&gt;
    &lt;li&gt;book&lt;/li&gt;
    &lt;li&gt;ocean&lt;/li&gt;
    &lt;li&gt;dog&lt;/li&gt;
&lt;/ul&gt;

## Scriban string functions

We can use several string functions in the templates.

Program.cs
  

using Scriban;

var msg = "an old falcon";

var data = @"
{{ msg | string.capitalize }}
{{ msg | string.upcase }}
The message has {{ msg | string.size }} characters.
The message has {{ msg | string.split ' ' | array.size }} words.
";

var tpl = Template.Parse(data);
var res = tpl.Render(new { msg = msg });

Console.WriteLine(res);

We have a string message. We apply several string functions on the message.

{{ msg | string.capitalize }}
{{ msg | string.upcase }}

We capitalize and upcase the message.

The message has {{ msg | string.size }} characters.

We count the number of characters in the message.

The message has {{ msg | string.split ' ' | array.size }} words.

We count the number of words in the message. In addition to
string.split function, we use the array.size to get
the size of the array of split strings.

$ dotnet run
An old falcon
AN OLD FALCON
The message has 13 characters.
The message has 3 words.

## Scriban array functions 

Scriban supports array functions.

Program.cs
  

using Scriban;

int[] vals = { 2, 1, -3, 0, -1, -2, 3 };

var data = @"
The array has {{ vals.size }} elements
First element: {{ vals[0] }}
Last element: {{ vals[-1] }}
Sorted elements: {{ vals | array.sort}}
";

var tpl = Template.Parse(data);
var res = tpl.Render(new { vals = vals });

Console.WriteLine(res);

We have an array of integers. With built-in array functions, we count the 
elements and sort them.

$ dotnet run 
The array has 7 elements
First element: 2
Last element: 3
Sorted elements: [-3, -2, -1, 0, 1, 2, 3]

## Scriban conditions

We can use if/else if/else conditions in templates.

Program.cs
  

using Scriban;

string?[] names = { "John", "Nelly", null, "George" };

var data = @"
{{- for name in names -}}
  {{ if !name  }}
Hello there!
  {{ else }}
Hello {{name}}!
  {{ end }}
{{- end }}";

var tpl = Template.Parse(data);
var res = tpl.Render(new { names = names });

Console.WriteLine(res);

We have an array of names. With the if condition, we check if the element is 
not null.

$ dotnet run
Hello John!

Hello Nelly!

Hello there!

Hello George!

## Scriban read template from file

In the following example, we read the tempate file from a file.

users.tpl
  

&lt;table&gt;
    &lt;thead&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;th&gt;Occupation&lt;/th&gt;
    &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
    {{- for user in users }}
    &lt;tr&gt;
        &lt;td&gt;{{ user.name }}&lt;/td&gt;
        &lt;td&gt;{{ user.occupation }}&lt;/td&gt;
    &lt;/tr&gt;
    {{- end }}
    &lt;/tbody&gt;
&lt;/table&gt;

The template file outputs data in an HTML table.

Program.cs
  

using Scriban;

var users = new List&lt;User&gt;
{
    new ( "John Doe", "gardener"),
    new ( "Roger Roe", "driver"),
    new ( "Lucy Smith", "teacher")
};

var fileName = "users.tpl";
var data = File.ReadAllText(fileName);

var tpl = Template.Parse(data);
var res = tpl.Render(new { users = users });

Console.WriteLine(res);

record User(string Name, string Occupation);

The data is stored in a list of records. The template file is loaded with 
the File.ReadAllText method.

$ dotnet run 
&lt;table&gt;
    &lt;thead&gt;
    &lt;tr&gt;
        &lt;th&gt;Name&lt;/th&gt;
        &lt;th&gt;Occupation&lt;/th&gt;
    &lt;/tr&gt;
    &lt;/thead&gt;
    &lt;tbody&gt;
    &lt;tr&gt;
        &lt;td&gt;John Doe&lt;/td&gt;
        &lt;td&gt;gardener&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Roger Roe&lt;/td&gt;
        &lt;td&gt;driver&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
        &lt;td&gt;Lucy Smith&lt;/td&gt;
        &lt;td&gt;teacher&lt;/td&gt;
    &lt;/tr&gt;
    &lt;/tbody&gt;
&lt;/table&gt;

## Source

[Scriban Github page](https://github.com/scriban/scriban)

In this article we have worked with the Scriban template engine in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).