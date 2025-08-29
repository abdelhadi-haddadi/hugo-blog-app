+++
title = "C# PostgreSQL"
date = 2025-08-29T19:51:14.185+01:00
draft = false
description = "C# PostgreSQL tutorial shows how to program PostgreSQL in C#. PostgreSQL is a powerful, open source, object-relational database system."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# PostgreSQL

last modified July 5, 2023

 

C# PostgreSQL tutorial shows how to program PostgreSQL in C#. It covers the
basics of PostgreSQL programming with C#.

## PostgreSQL

PostgreSQL is a powerful, open source, object-relational database system. It is
a multi-user database management system. It runs on multiple platforms,
including Linux, FreeBSD, Solaris, Microsoft Windows, and Mac OS X. PostgreSQL
is developed by the PostgreSQL Global Development Group.

PostgreSQL has sophisticated features such as Multi-Version Concurrency Control
(MVCC), point in time recovery, tablespaces, asynchronous replication, nested
transactions (savepoints), online/hot backups, a sophisticated query
planner/optimizer, and write ahead logging for fault tolerance. It supports
international character sets, multibyte character encodings, Unicode, and it is
locale-aware for sorting, case-sensitivity, and formatting.

## ADO.NET

*ADO.NET* is an essential part of the .NET. It is a specification that
unifies access to relational databases, XML files and other application data.
*Npgsql* is an implementation of the ADO.NET specification for the
PostgreSQL database. It is a driver written in C# language and is available for
all .NET languages.

$ dotnet add package Npgsql

We include the package to our .NET Core project.

The NpgsqlConnection, NpgsqlCommand,
NpgsqlDataReader, DataSet, and
NpgsqlDataProvider are the core elements of the .NET data provider
model. The NpgsqlConnection creates a connection to a specific data
source. The NpgsqlCommand object executes an SQL statement against
a data source. The NpgsqlDataReader reads streams of data from a
data source.

The DataSet object is used for offline work with a mass of data. It
is a disconnected data representation that can hold data from a variety of
different sources. Both NpgsqlDataReader and DataSet
are used to work with data; they are used under different circumstances. If we only
need to read the results of a query, the NpgsqlDataReader is the better
choice. If we need more extensive processing of data, or we want to bind a Winforms
control to a database table, the DataSet is preferred.

## C# PostgreSQL version

If the following program we check the version of the PostgreSQL server.

Program.cs
  

using Npgsql;

var cs = "Host=localhost;Username=postgres;Password=s$cret;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var sql = "SELECT version()";

using var cmd = new NpgsqlCommand(sql, con);

var version = cmd.ExecuteScalar().ToString();
Console.WriteLine($"PostgreSQL version: {version}");

We connect to the database and get some info about the PostgreSQL server.

using Npgsql;

We import the elements of the PostgreSQL data provider.

var cs = "Host=localhost;Username=postgres;Password=s$cret;Database=testdb";

This is the connection string. It is used by the data provider to establish a
connection to the database. We specify the host name, user name, password and a
database name.

using var con = new NpgsqlConnection(cs);

A NpgsqlConnection object is created. This object is used to open a
connection to a database. The using statement releases the database
connection resource when the variable goes out of scope.

con.Open();

This line opens the database connection.

var sql = "SELECT version()";

This is the SQL SELECT statement. It returns the version of the database. The
version is a built-in PostgreSQL function.

using var cmd = new NpgsqlCommand(sql, con);

The NpgsqlCommand is an object which is used to execute a query on
the database. The parameters are the SQL statement and the connection object.

var version = cmd.ExecuteScalar().ToString();

There are queries which return only a scalar value. In our case, we want a
simple string specifying the version of the database. The
ExecuteScalar is used in such situations.

Console.WriteLine($"PostgreSQL version: {version}");

We print the version of PostgreSQL to the console.

$ dotnet run
PostgreSQL version: PostgreSQL 11.1, compiled by Visual C++ build 1914, 64-bit

## C# PostgreSQL create table

In the following example, we create a database table and fill it with data.

Program.cs
  

using Npgsql;

var cs = "Host=localhost;Username=postgres;Password=s$cret;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

using var cmd = new NpgsqlCommand();
cmd.Connection = con;

cmd.CommandText = "DROP TABLE IF EXISTS cars";
cmd.ExecuteNonQuery();

cmd.CommandText = @"CREATE TABLE cars(id SERIAL PRIMARY KEY,
        name VARCHAR(255), price INT)";
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
ExecuteNonQuery method if we do not want a result set, for
example for DROP, INSERT, or DELETE
statements.

cmd.CommandText = @"CREATE TABLE cars(id SERIAL PRIMARY KEY,
    name VARCHAR(255), price INT)";
cmd.ExecuteNonQuery();

The cars table is created. The SERIAL
keyword makes the column auto-incremented in PostgreSQL.

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Audi',52642)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Mercedes',57127)";
cmd.ExecuteNonQuery();
...

Here we insert two rows into the table.

$ dotnet run
Table cars created

We run the program.

$ psql -U postgres testdb
psql (11.1)
Type "help" for help.

We connect to the PostgreSQL server with the psql tool.

testdb=# SELECT * FROM cars;
id |    name    | price
----+------------+--------
1  | Audi       |  52642
2  | Mercedes   |  57127
3  | Skoda      |   9000
4  | Volvo      |  29000
5  | Bentley    | 350000
6  | Citroen    |  21000
7  | Hummer     |  41400
8  | Volkswagen |  21600
(10 rows)

We verify the data. The cars table was successfully created.

## C# PostgreSQL prepared statements

Prepared statements increase security and performance. When we write prepared
statements, we use placeholders instead of directly writing the values into the
statements.

Program.cs
  

using Npgsql;

var cs = "Host=localhost;Username=postgres;Password=s$cret;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var sql = "INSERT INTO cars(name, price) VALUES(@name, @price)";
using var cmd = new NpgsqlCommand(sql, con);

cmd.Parameters.AddWithValue("name", "BMW");
cmd.Parameters.AddWithValue("price", 36600);
cmd.Prepare();

cmd.ExecuteNonQuery();

Console.WriteLine("row inserted");

We add a new car to the cars table. We use a parameterized command.

var sql = "INSERT INTO cars(name, price) VALUES(@name, @price)";
using var cmd = new NpgsqlCommand(sql, con);

When we write prepared statements, we use placeholders instead of directly
writing the values into the statements. Prepared statements are faster and guard
against SQL injection attacks. The @name and @price
are placeholders, which are going to be filled later.

cmd.Parameters.AddWithValue("name", "BMW");
cmd.Parameters.AddWithValue("price", 36600);
cmd.Prepare();

Values are bound to the placeholders with the AddWithValue method.

cmd.ExecuteNonQuery();

The prepared statement is executed. We use the ExecuteNonQuery
method of the NpgsqlCommand object when we don't expect any
data to be returned.

## C# NpgsqlDataReader

The NpgsqlDataReader is an object used to retrieve data from the
database. It provides fast, forward-only, read-only access to query results. It
is the most efficient way to retrieve data from tables.

Program.cs
  

using Npgsql;

var cs = "Host=localhost;Username=postgres;Password=s$cret;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

string sql = "SELECT * FROM cars";
using var cmd = new NpgsqlCommand(sql, con);

using NpgsqlDataReader rdr = cmd.ExecuteReader();

while (rdr.Read())
{
    Console.WriteLine("{0} {1} {2}", rdr.GetInt32(0), rdr.GetString(1),
            rdr.GetInt32(2));
}

We get all rows from the cars table and print them to
the console.

using NpgsqlDataReader rdr = cmd.ExecuteReader();

To create a NpgsqlDataReader, we call the
ExecuteReader method of the NpgsqlCommand object.

while (rdr.Read())
{
    Console.WriteLine("{0} {1} {2}", rdr.GetInt32(0), rdr.GetString(1),
            rdr.GetInt32(2));
}

The Read method advances the data reader to the next record. It
returns true if there are more rows; otherwise false.
We can retrieve the value using the array index notation, or use a specific
method to access column values in their native data types. The latter is more
efficient.

$ dotnet run
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600
9 BMW 36600

## C# PostgreSQL column headers

In the following example we print column headers with the data from a database
table.

Program.cs
  

using Npgsql;

var cs = "Host=localhost;Username=postgres;Password=s$cret;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var sql = "SELECT * FROM cars";

using var cmd = new NpgsqlCommand(sql, con);

using NpgsqlDataReader rdr = cmd.ExecuteReader();
Console.WriteLine($"{rdr.GetName(0),-4} {rdr.GetName(1),-10} {rdr.GetName(2),10}");

while (rdr.Read())
{
  Console.WriteLine($"{rdr.GetInt32(0),-4} {rdr.GetString(1),-10} {rdr.GetInt32(2),10}");
}

In the example, we select all rows from the cars table with their
column names.

Console.WriteLine($"{rdr.GetName(0),-4} {rdr.GetName(1),-10} {rdr.GetName(2),10}");

We get the names of the columns with the GetName method of the
reader.

while (rdr.Read())
{
  Console.WriteLine($"{rdr.GetInt32(0),-4} {rdr.GetString(1),-10} {rdr.GetInt32(2),10}");
}

We print the data that was returned by the SQL statement
to the terminal.

$ dotnet run
id   name            price
1    Audi            52642
2    Mercedes        57127
3    Skoda            9000
4    Volvo           29000
5    Bentley        350000
6    Citroen         21000
7    Hummer          41400
8    Volkswagen      21600
9    BMW             36600

## Source

[Npgsql Github page](https://github.com/npgsql/npgsql)

In this article we have shown how to program PostgreSQL databases in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).