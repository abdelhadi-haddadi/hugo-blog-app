+++
title = "C# SQLite"
date = 2025-08-29T19:51:26.606+01:00
draft = false
description = "C# SQLite tutorial shows how to program SQLite databases in C#. SQLite is an embedded relational database engine."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# SQLite

last modified July 5, 2023

 

C# SQLite tutorial shows how to program SQLite databases in C#.

## SQLite

SQLite is an embedded relational database engine. It is a self-contained,
serverless, zero-configuration and transactional SQL database engine. SQLite
implements most of the SQL-92 standard for SQL. The SQLite engine is not a
standalone process. Instead, it is statically or dynamically linked into the
application. An SQLite database is a single ordinary disk file that can be
located anywhere in the directory hierarchy.

## ADO.NET

ADO.NET is an important part of the .NET. It is a specification
that unifies access to relational databases, XML files, and other application
data. From the programmer's point of view it is a set of libraries and classes
to work with database and other data sources.
System.Data.SQLite.Core is an implementation of the ADO.NET
specification for the SQLite database. It is a driver written in C# language and
is available for all .NET languages.

$ dotnet add package System.Data.SQLite.Core

We need to include the package to our .NET Core project.

SQLiteConnection, SQLiteCommand, SQLiteDataReader,
SQLiteDataAdapter are the core elements of the .NET data provider model.
The SQLiteConnection creates a connection to a specific data source.
The SQLiteCommand object executes an SQL statement against a data source.
The SQLiteDataReader reads streams of data from a  data source.
A SQLiteDataAdapter is an intermediary
between the DataSet and the data source. It populates a DataSet
and resolves updates with the data source.

The DataSet object is used for offline work with a mass of data. It
is a disconnected data representation that can hold data from a variety of
different sources. Both SQLiteDataReader and DataSet
are used to work with data; they are used under different circumstances. If we
only need to read the results of a query, the SQLiteDataReader is
the better choice. If we need more extensive processing of data, or we want to
bind a Winforms control to a database table, the DataSet is
preferred.

## SQLite C# version

If the first program, we check the version of the SQLite database.

Program.cs
  

using System.Data.SQLite;

string cs = "Data Source=:memory:";
string stm = "SELECT SQLITE_VERSION()";

using var con = new SQLiteConnection(cs);
con.Open();

using var cmd = new SQLiteCommand(stm, con);
string version = cmd.ExecuteScalar().ToString();

Console.WriteLine($"SQLite version: {version}");

We connect to an in-memory database and select an SQLite version.

using System.Data.SQLite;

We import the elements of the SQLite data provider.

string cs = "Data Source=:memory:";

This is the connection string. It is used by the data provider to establish a
connection to the database. We create an in-memory database.

string stm = "SELECT SQLITE_VERSION()";

We create a SELECT statement. The SQLITE_VERSION is a built-in
SQLite function, which returns the version of SQLite.

using var con = new SQLiteConnection(cs);

A SQLiteConnection object is created. This object is used to
open a connection to a database. The using declaration disposes
the con variable at the end of the enclosing scope

con.Open();

The Open method opens the database connection.

using var cmd = new SQLiteCommand(stm, con);

The SQLiteCommand is an object, which is used to execute a query on
the database. The parameters are the SQL statement and the connection object.

string version = cmd.ExecuteScalar().ToString();

There are queries which return only a scalar value. In our case, we want a
simple string specifying the version of the database. The
ExecuteScalar is used in such situations. We avoid the overhead
of using more complex objects.

Console.WriteLine($"SQLite version: {version}");

The version of the database is printed to the console.

$ dotnet run
SQLite version: 3.30.1

## C# SQLite create table

In the following example, we create a database table and fill it with data.

Program.cs
  

using System.Data.SQLite;

string cs = @"URI=file:C:\Users\Jano\Documents\test.db";

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

Console.WriteLine("Table cars created");

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
Table cars created

We run the program.

$ sqlite3 test.db

We open the test.db database with the sqlite3 tool.

sqlite&gt; .mode column
sqlite&gt; .headers on

We modify the default way the data is displayed in the console. We use the
column mode and turn on the headers.

sqlite&gt; SELECT * FROM cars;
id          name        price
----------  ----------  ----------
1           Audi        52642
2           Mercedes    57127
3           Skoda       9000
4           Volvo       29000
5           Bentley     350000
6           Citroen     21000
7           Hummer      41400
8           Volkswagen  21600

We verify the data. The cars table was successfully created.

## C# SQLite prepared statements

Prepared statements increase security and performance. When we write prepared
statements, we use placeholders instead of directly writing the values into the
statements.

Program.cs
  

using System.Data.SQLite;

string cs = @"URI=file:C:\Users\Jano\Documents\test.db";

using var con = new SQLiteConnection(cs);
con.Open();

using var cmd = new SQLiteCommand(con);
cmd.CommandText = "INSERT INTO cars(name, price) VALUES(@name, @price)";

cmd.Parameters.AddWithValue("@name", "BMW");
cmd.Parameters.AddWithValue("@price", 36600);
cmd.Prepare();

cmd.ExecuteNonQuery();

Console.WriteLine("row inserted");

We add a row to the cars table. We use a parameterized command.

cmd.CommandText = "INSERT INTO cars(name, price) VALUES(@name, @price)";

When we write prepared statements, we use placeholders instead of directly
writing the values into the statements. Prepared statements are faster and guard
against SQL injection attacks. The @name and @price
are placeholders, which are going to be filled later.

cmd.Parameters.AddWithValue("@name", "BMW");
cmd.Parameters.AddWithValue("@price", 36600);
cmd.Prepare();

Values are bound to the placeholders.

cmd.ExecuteNonQuery();

The prepared statement is executed. We use the ExecuteNonQuery
method of the SQLiteCommand object when we do not expect any
data to be returned.

sqlite&gt; SELECT * FROM cars WHERE id=8;
id          name        price
----------  ----------  ----------
8           Volkswagen  21600

We verify that the row was inserted OK.

## C# SQLiteDataReader

The SQLiteDataReader is a class used to retrieve data from the
database. It is used with the SQLiteCommand class to execute a
SELECT statement and then access the returned rows. It provides fast,
forward-only, read-only access to query results. It is the most efficient way to
retrieve data from tables.

We create an instance of the SQLiteDataReader
by calling the ExecuteReader method of the
SQLiteCommand object. While the SqlDataReader is being
used, the associated SQLiteConnection serves the
SqlDataReader. No other operations can be performed on the
SQLiteConnection other than closing it.

Program.cs
  

using System.Data.SQLite;

string cs = @"URI=file:C:\Users\Jano\Documents\test.db";

using var con = new SQLiteConnection(cs);
con.Open();

string stm = "SELECT * FROM cars LIMIT 5";

using var cmd = new SQLiteCommand(stm, con);
using SQLiteDataReader rdr = cmd.ExecuteReader();

while (rdr.Read())
{
    Console.WriteLine($"{rdr.GetInt32(0)} {rdr.GetString(1)} {rdr.GetInt32(2)}");
}

We get five rows from the cars table and print them to the console.

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

## C# SQLite column headers

In the following example we print column headers with the data from a database
table.

Program.cs
  

using System.Data.SQLite;

string cs = @"URI=file:C:\Users\Jano\Documents\test.db";

using var con = new SQLiteConnection(cs);
con.Open();

string stm = "SELECT * FROM cars LIMIT 5";

using var cmd = new SQLiteCommand(stm, con);

using SQLiteDataReader rdr = cmd.ExecuteReader();
Console.WriteLine($"{rdr.GetName(0), -3} {rdr.GetName(1), -8} {rdr.GetName(2), 8}");

while (rdr.Read())
{
    Console.WriteLine($@"{rdr.GetInt32(0), -3} {rdr.GetString(1), -8} {rdr.GetInt32(2), 8}");
}

In the example, we select five rows from the cars table with their
column names.

using SQLiteDataReader rdr = cmd.ExecuteReader();

An SQLiteDataReader object is created.

Console.WriteLine($"{rdr.GetName(0), -3} {rdr.GetName(1), -8} {rdr.GetName(2), 8}");

We get the names of the columns with the GetName method of the
reader.

while (rdr.Read())
{
    Console.WriteLine($@"{rdr.GetInt32(0), -3} {rdr.GetString(1), -8} {rdr.GetInt32(2), 8}");
}

We print the data that was returned by the SQL statement to the terminal.

$ dotnet run
id  name        price
1   Audi        52642
2   Mercedes    57127
3   Skoda        9000
4   Volvo       29000
5   Bentley    350000

## Source

[System.Data.Sqlite documentation](https://system.data.sqlite.org/index.html/doc/trunk/www/index.wiki)

In this article we have shown how to program SQLite databases in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).