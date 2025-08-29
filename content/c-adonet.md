+++
title = "C# ADO.NET"
date = 2025-08-29T19:50:26.143+01:00
draft = false
description = "C# ADO.NET tutorial shows how to do database programming in C# using ADO.NET technology. ADO.NET is a set of classes used for database access."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# ADO.NET

last modified July 5, 2023

 

C# ADO.NET tutorial shows how to do database programming in C# using ADO.NET
technology. 

## ADO.NET

ADO.NET is a set of classes for database access. It is a
specification that unifies access to relational databases, XML files, and other
application data. The ADO.NET classes are found in System.Data
namespace.

Each database must provide an implementation of the ADO.NET specification: MySQL
has MySQL.Data, PostgreSQL has Npgsql, and SQLite has
System.Data.SQLite or Microsoft.Data.Sqlite.

$ dotnet add package System.Data.SQLite

To work with SQLite database, we need to add the System.Data.SQLite
nuget package.

The DataSet object is used for offline work with a mass of data. It is a
disconnected data representation that can hold data from a variety of different
sources.

SQLiteConnection, SQLiteCommand, SQLiteDataReader,
SQLiteDataAdapter are the core elements of the .NET data provider model.
The SQLiteConnection creates a connection to a specific data source.
The SQLiteCommand object executes an SQL statement against a data source.
The SQLiteDataReader reads streams of data from a  data source.
A SQLiteDataAdapter is an intermediary
between the DataSet and the data source. It populates a DataSet
and resolves updates with the data source.

 -->

## ADO.NET SQLite example

In the first example, we work with an SQLite database. 

Program.cs
  

using System.Data.SQLite;

string cs = "Data Source=:memory:";
string stm = "SELECT SQLITE_VERSION()";

using var con = new SQLiteConnection(cs);
con.Open();

using var cmd = new SQLiteCommand(stm, con);
string? version = cmd.ExecuteScalar().ToString();

Console.WriteLine($"SQLite version: {version}");

The example prints the version of SQLite.

string cs = "Data Source=:memory:";

We use an in-memory database.

string stm = "SELECT SQLITE_VERSION()";

This SQL statement determines the version of SQLite.

using var con = new SQLiteConnection(cs);
con.Open();

The SQLiteConnection creates a connection to a specific data
source. The parameters are the SQL statement and the connection object. 

using var cmd = new SQLiteCommand(stm, con);

The SQLiteCommand object executes an SQL statement against a data
source. The using declaration disposes the con variable at the end of the
enclosing scope. 

string? version = cmd.ExecuteScalar().ToString();

The ExecuteScalar returns the first column of the first row of the
resultset (if present), or null if no resultset was returned.

$ dotnet run 
SQLite version: 3.38.5.1

## ADO.NET MySQL example

In the second example, we work with MySQL.

Program.cs
  

using MySql.Data.MySqlClient;

string cs = @"server=localhost;userid=user12;password=s$cret;database=testdb";

using var con = new MySqlConnection(cs);
con.Open();

var stm = "SELECT VERSION()";
var cmd = new MySqlCommand(stm, con);

var version = cmd.ExecuteScalar().ToString();
Console.WriteLine($"MySQL version: {version}");

There are a several changes. 

using MySql.Data.MySqlClient;

We use MySQL namespace.

string cs = @"server=localhost;userid=user12;password=s$cret;database=testdb";

The connection strings is suited for MySQL.

using var con = new MySqlConnection(cs);

We use MySqlConnection instead of SQLiteConnection.

var stm = "SELECT VERSION()";

The SQL statement is specific to MySQL.

var cmd = new MySqlCommand(stm, con);

The command is called MySqlCommand.

$ dotnet run
MySQL version: 8.0.29-0ubuntu0.22.04.2

## ADO.NET create table

In the following example, we create a database table and fill it with data.

Program.cs
  

using System.Data.SQLite;

string cs = @"URI=file:test.db";    

using var con = new SQLiteConnection(cs);
con.Open();

using var cmd = new SQLiteCommand(con);

cmd.CommandText = "DROP TABLE IF EXISTS cars";
cmd.ExecuteNonQuery();

cmd.CommandText = @"CREATE TABLE cars(id INTEGER PRIMARY KEY,
            name TEXT, price INT)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Audi',52642)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Mercedes',57127)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Skoda',9000)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Volvo',29000)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Bentley',350000)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Citroen',21000)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Hummer',41400)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Volkswagen',21600)";
cmd.ExecuteNonQuery();

Console.WriteLine("table cars created");

In the example, we create a cars table with eight rows.

cmd.CommandText = "DROP TABLE IF EXISTS cars";
cmd.ExecuteNonQuery();

First we drop the table if it already exists. We use the
ExecuteNonQuery method if we do not want a
result set, for example for DROP, INSERT,
or DELETE statements.

cmd.CommandText = @"CREATE TABLE cars(id INTEGER PRIMARY KEY,
            name TEXT, price INT)";
cmd.ExecuteNonQuery();

The cars table is created. The INTEGER PRIMARY KEY
column is auto-incremented in SQLite.

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Audi',52642)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Mercedes',57127)";
cmd.ExecuteNonQuery();

We insert two rows into the table.

$ dotnet run
table cars created

We run the program.

$ sqlite3 test.db

We open the test.db database with the sqlite3 tool.

sqlite&gt; SELECT * FROM cars;
1|Audi|52642
2|Mercedes|57127
3|Skoda|9000
4|Volvo|29000
5|Bentley|350000
6|Citroen|21000
7|Hummer|41400
8|Volkswagen|21600

We verify the data.

## ADO.NET read data

In SQLite driver, we use the SQLiteDataReader to fetch data from the
database. It is used with the SQLiteCommand class to execute a
SELECT statement and then access the returned rows.

Program.cs
  

using System.Data.SQLite;

string cs = @"URI=file:test.db";

using var con = new SQLiteConnection(cs);
con.Open();

string stm = "SELECT * FROM cars LIMIT 5";

using var cmd = new SQLiteCommand(stm, con);
using SQLiteDataReader rdr = cmd.ExecuteReader();

while (rdr.Read())
{
    Console.WriteLine($"{rdr.GetInt32(0)} {rdr.GetString(1)} {rdr.GetInt32(2)}");
}

We get five rows from the cars table and print them to the
terminal.

using SQLiteDataReader rdr = cmd.ExecuteReader();

To create an SQLiteDataReader object, we call
the ExecuteReader method of the SQLiteCommand object.

while (rdr.Read())
{
    Console.WriteLine($"{rdr.GetInt32(0)} {rdr.GetString(1)} {rdr.GetInt32(2)}");
}

The Read method advances the data reader to the next record.
It returns true if there are more rows; otherwise false. We can retrieve
the value using the array index notation, or use a specific method to access
column values in their native data types. The latter is more efficient.

$ dotnet run
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000

## ADO.NET LINQ example

We can use LINQ in ADO.NET. SQLiteDataAdapter is a bridge between a
System.Data.DataSet and a data source.

Program.cs
  

using System.Data.SQLite;
using System.Data;
string cs = @"URI=file:test.db";

using var ds = new DataSet();
using var con = new SQLiteConnection(cs);
using var sad = new SQLiteDataAdapter("SELECT * FROM cars", con);

sad.Fill(ds);

var res = from dt in ds?.Tables[0]?.AsEnumerable()
          select new
          {
              Id = dt.Field&lt;long&gt;("id"),
              Name = dt.Field&lt;string&gt;("name"),
              Price = dt.Field&lt;int&gt;("price"),
          };

foreach (var e in res)
{
    Console.WriteLine(e);
}

Console.WriteLine(res.Count());

SQLiteDataAdapter is used to fill a DataSet, from
which we create an enumerable. A LINQ query is executed on that enumerable.

$ dotnet run
{ Id = 1, Name = Audi, Price = 52642 }
{ Id = 2, Name = Mercedes, Price = 57127 }
{ Id = 3, Name = Skoda, Price = 9000 }
{ Id = 4, Name = Volvo, Price = 29000 }
{ Id = 5, Name = Bentley, Price = 350000 }
{ Id = 6, Name = Citroen, Price = 21000 }
{ Id = 7, Name = Hummer, Price = 41400 }
{ Id = 8, Name = Volkswagen, Price = 21600 }
8

## Source

[ADO.NET framework documentation](https://learn.microsoft.com/en-us/dotnet/framework/data/adonet/ado-net-overview)

In this article we have worked with ADO.NET.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).