+++
title = "C# CSV - read write CSV data"
date = 2025-08-29T19:50:36.358+01:00
draft = false
description = "C# CSV tutorial shows how to read and write CSV data in C#. CSV (Comma Separated Values) is popular import and export data format used in spreadsheets and databases."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# CSV - read write CSV data

last modified July 5, 2023

 

C# CSV tutorial shows how to read and write CSV data in C#.

## CSV

CSV (Comma Separated Values) is a very popular import and export data
format used in spreadsheets and databases. Each line in a CSV file is a data
record. Each record consists of one or more fields, separated by commas. While
CSV is a very simple data format, there can be many differences, such as
different delimiters, new lines, or quoting characters.

In this article we read and write CSV data with the CsvHelper
library. 

$ dotnet add package CsvHelper

We need to add the CsvHelper package to our projects.

## C# CSV read data by records

In the following example, we read a CSV file by records.

users.csv
  

FirstName,LastName,Occupation
John,Doe,gardener
Roger,Roe,driver
Lucy,Smith,teacher

We have this users.csv file.

Program.cs
  

using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;

var csvConfig = new CsvConfiguration(CultureInfo.CurrentCulture)
{
    HasHeaderRecord = false
};

using var streamReader = File.OpenText("users.csv");
using var csvReader = new CsvReader(streamReader, csvConfig);

string value;

while (csvReader.Read())
{
    for (int i = 0; csvReader.TryGetField&lt;string&gt;(i, out value); i++)
    {
        Console.Write($"{value} ");
    }

    Console.WriteLine();
}

The Read method advances the reader to the next record. We read the
fields of the record with TryGetField.

$ dotnet run
FirstName LastName Occupation 
John Doe gardener 
Roger Roe driver 
Lucy Smith teacher 

## C# CSV read data into objects

In the next example, we read the data into objects with GetRecords.

Program.cs
  

using System.Globalization;
using CsvHelper;

using var streamReader = File.OpenText("users.csv");
using var csvReader = new CsvReader(streamReader, CultureInfo.CurrentCulture);

var users = csvReader.GetRecords&lt;User&gt;();

foreach (var user in users)
{
    Console.WriteLine(user);
}

record User(string FirstName, String LastName, string Occupation);

In the example, we define the User class and read the records 
of the users.csv file into instances of this class. The 
GetRecords returns the IEnumerable of the given 
type.

$ dotnet run
User { FirstName = John, LastName = Doe, Occupation = gardener }
User { FirstName = Roger, LastName = Roe, Occupation = driver }
User { FirstName = Lucy, LastName = Smith, Occupation = teacher }

## C# CSV configuration

In the following example, we are going to have a CSV file with semicolon
separators and a comment. In order to parse such a different "CSV" file, we need
to configure the parser.

users.csv
  

# this is users.csv file

John;Doe;gardener
Roger;Roe;driver
Lucy;Smith;teacher

We have this users.csv file.

Program.cs
  

using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration; 

var csvConfig = new CsvConfiguration(CultureInfo.CurrentCulture)
{
    HasHeaderRecord = false,
    Comment = '#',
    AllowComments = true,
    Delimiter = ";",
};

using var streamReader = File.OpenText("users.csv");
using var csvReader = new CsvReader(streamReader, csvConfig);

while (csvReader.Read())
{
    var firstName = csvReader.GetField(0);
    var lastName = csvReader.GetField(1);
    var occupation = csvReader.GetField(2);

    Console.WriteLine($"{firstName} {lastName} is {occupation}");
}

The reader is configured with CsvConfiguration. 

var csvConfig = new CsvConfiguration(CultureInfo.CurrentCulture)
{
    HasHeaderRecord = false,
    Comment = '#',
    AllowComments = true,
    Delimiter = ";",
};

We tell the reader that there is no header and that the comment character is #. 
We allow comments in the file and set the comment's character. (Actually, we 
don't have to set the comment character because by default the # is used.)
We set the delimiter to semicolon character. (The blank lines are ignored by
default.)

using var csvReader = new CsvReader(streamReader, csvConfig);

The configuration file is passed to the CsvReader.

$ dotnet run
John Doe is gardener
Roger Roe is driver
Lucy Smith is teacher

## C# CSV quote fields

In the following example, we show how to quote fields.

Program.cs
  

using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;

var csvConfig = new CsvConfiguration(CultureInfo.CurrentCulture)
{
    ShouldQuote = args =&gt; args.Row.Index == 1
};

var users = new List&lt;User&gt; 
{
    new (1, "John Doe", "gardener", "12/5/1997"),
    new (2, "Lucy Smith", "teacher", "5/12/1983"),
    new (3, "Roger Roe", "driver", "4/2/2001"),
    new (4, "Robert Smith", "cook", "21/11/1976"),
    new (5, "Maria Smith", "accountant", "5/9/1986"),
};

using var fs = new StreamWriter("users.csv");
using var csvWriter = new CsvWriter(fs, csvConfig);

csvWriter.WriteHeader&lt;User&gt;();
csvWriter.NextRecord(); 
csvWriter.WriteRecords(users);

record User(int Id, string Name, string Occupation, string DateOfBirth);

We have a list of users. We decide to quote the second field of each row.

var csvConfig = new CsvConfiguration(CultureInfo.CurrentCulture)
{
    ShouldQuote = args =&gt; args.Row.Index == 1
};

In the CsvConfiguration, we set the ShouldQuote
property to return true for the second field.

$ dotnet run
$ cat users.csv 
Id,"Name",Occupation,DateOfBirth
1,"John Doe",gardener,12/5/1997
2,"Lucy Smith",teacher,5/12/1983
3,"Roger Roe",driver,4/2/2001
4,"Robert Smith",cook,21/11/1976
5,"Maria Smith",accountant,5/9/1986

## C# CSV WriteField

A field from a record is written with WriteField.

Program.cs
  

using System.Globalization;
using System.Text;
using CsvHelper;

var users = new List&lt;User&gt;
{
    new ("John", "Doe", "gardener"),
    new ("Roger", "Roe", "driver"),
    new ("Lucy", "Smith", "teacher"),
};

using var mem = new MemoryStream();
using var writer = new StreamWriter(mem);
using var csvWriter = new CsvWriter(writer, CultureInfo.CurrentCulture);

csvWriter.WriteField("FirstName");
csvWriter.WriteField("LastName");
csvWriter.WriteField("Occupation");
csvWriter.NextRecord();

foreach (var user in users)
{
    csvWriter.WriteField(user.FirstName);
    csvWriter.WriteField(user.LastName);
    csvWriter.WriteField(user.Occupation);
    csvWriter.NextRecord();
}

writer.Flush();
var res = Encoding.UTF8.GetString(mem.ToArray());
Console.WriteLine(res);

record User(string FirstName, string LastName, string Occupation);

In the example, we write CSV data into memory and then to the console. 

csvWriter.WriteField("FirstName");
csvWriter.WriteField("LastName");
csvWriter.WriteField("Occupation");
csvWriter.NextRecord();

First, we write the header. The NextRecord method adds a newline.

foreach (var user in users)
{
    csvWriter.WriteField(user.FirstName);
    csvWriter.WriteField(user.LastName);
    csvWriter.WriteField(user.Occupation);
    csvWriter.NextRecord();
}

The WriteField writes the field to the CSV file. A new record is 
started with NextRecord. 

writer.Flush();

To actually write the data, we need to call Flush.

var result = Encoding.UTF8.GetString(mem.ToArray());
Console.WriteLine(result);

We write the data from the memory to the console.

$ dotnet run
FirstName,LastName,Occupation
John,Doe,gardener
Roger,Roe,driver
Lucy,Smith,teacher

## C# CSV write data with WriteRecords

In the following example, we write all the records in one shot with 
WriteRecords.

Program.cs
  

using System.Globalization;
using CsvHelper;

var users = new List&lt;User&gt; 
{
    new ("John", "Doe", "gardener"),
    new ("Lucy", "Smith", "teacher"),
    new ("Roger", "Roe", "writer"),
};

using var writer = new StreamWriter(Console.OpenStandardOutput());
using var csvWriter = new CsvWriter(writer, CultureInfo.CurrentCulture);

csvWriter.WriteHeader&lt;User&gt;();
csvWriter.NextRecord(); // adds new line after header
csvWriter.WriteRecords(users);

record User(string FirstName, string LastName, string Occupation);

In the example, we write the data from the list of user objects into console. 
The WriteHeader writes the header record from the given members.

## C# CSV custom solution

Generally, it is recommended to use an existing library for working with CSV. 
Despite its perceived simplicity, it is not easy to provide a robust 
solution. (For instance, fields may be quoted.)

data.csv
  

John Doe, gardener, 12/5/1997
Jane Doe, teacher, 5/10/1983
Robert Smith, driver, 4/2/2001
Maria Smith, cook, 9/11/1976

This is data.csv file.

Program.cs
  

using System.Text;

var path = "data.csv";
var lines = File.ReadLines(path, Encoding.UTF8);

var users = from line in lines
            let fields = line.Replace(", ", ",").Split(",")
            select new User(fields[0], fields[1], DateTime.Parse(fields[2]));

var sorted = from user in users
             orderby user.DateOfBirth descending
             select user;

foreach (var user in sorted)
{
    Console.WriteLine(user);
}

public record User(string Name, string Occupation, DateTime DateOfBirth);

The example parses a CSV file using Linq. It also sorts the users by their 
birthday in descending order. 

$ dotnet run
User { Name = Robert Smith, Occupation = driver, DateOfBirth = 4/2/2001 12:00:00 AM }
User { Name = John Doe, Occupation = gardener, DateOfBirth = 12/5/1997 12:00:00 AM }
User { Name = Jane Doe, Occupation = teacher, DateOfBirth = 5/10/1983 12:00:00 AM }
User { Name = Maria Smith, Occupation = cook, DateOfBirth = 9/11/1976 12:00:00 AM }

## C# export HTML table into CSV file

In the next example, we scrape an HTML table from a web site and export 
the data into a CSV file.

For web scraping, we use the *AngleSharp* library.

Program.cs
  

using System.Globalization;
using AngleSharp;
using CsvHelper;

var config = Configuration.Default.WithDefaultLoader();
using var context = BrowsingContext.New(config);

var url = "https://nrf.com/resources/top-retailers/top-100-retailers/top-100-retailers-2020";
using var doc = await context.OpenAsync(url);

var htable = doc.GetElementById("stores-list--section-23906");
var trs = htable.QuerySelectorAll("tr").Skip(1);

using var fs = new StreamWriter("data.csv");
using var writer = new CsvWriter(fs, CultureInfo.CurrentCulture);

var rows = new List&lt;Row&gt;();

foreach (var tr in trs)
{
    var tds = tr.QuerySelectorAll("td").Take(3);
    var fields = (from e in tds select e.TextContent).ToArray();
    var row = new Row(fields[0], fields[1], fields[2]);

    rows.Add(row);
}

writer.WriteRecords(rows);

record Row(string Rank, string Company, string Sales);

We scrape data from a table that contains 100 top US retailers for 2020.

var config = Configuration.Default.WithDefaultLoader();
using var context = BrowsingContext.New(config);

var url = "https://nrf.com/resources/top-retailers/top-100-retailers/top-100-retailers-2020";
using var doc = await context.OpenAsync(url);

We set up the AngleSharp context and retrieve a document from the provided link.

var htable = doc.GetElementById("stores-list--section-23906");
var trs = htable.QuerySelectorAll("tr").Skip(1);

We locate the HTML table and select all the rows except for the header.

using var fs = new StreamWriter("data.csv");
using var writer = new CsvWriter(fs, CultureInfo.CurrentCulture);

We set up the CsvWriter.

foreach (var tr in trs)
{
    var tds = tr.QuerySelectorAll("td").Take(3);
    var fields = (from e in tds select e.TextContent).ToArray();
    var row = new Row(fields[0], fields[1], fields[2]);

    rows.Add(row);
}

We get the data from the first three columns of the table.

writer.WriteRecords(rows);

Finally, the records are written to the file with WriteRecords.

## Source

[CsvHelper Github page](https://github.com/JoshClose/CsvHelper)

In this article we have read and written CSV data in C# with the
CsvHelper library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).