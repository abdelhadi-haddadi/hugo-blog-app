+++
title = "C# SQL Server"
date = 2025-08-29T19:51:26.595+01:00
draft = false
description = "C# SQL Server tutorial shows how to program SQL Server in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# SQL Server

last modified July 5, 2023

 

C# SQL Server tutorial shows how to program SQL Server in C#.

## SQL Server

SQL Server is a relational database management system developed by Microsoft.
There are different editions of Microsoft SQL Server.

Microsoft SQL Server Express is a version of Microsoft's SQL Server
relational database management system that is free to download, distribute
and use.

$ net start MSSQL$SQLEXPRESS
$ net stop MSSQL$SQLEXPRESS

The SQL Server can be started and stopped with these commands.

*Azure Data Studio* is a free desktop tool from Microsoft, which
can be used to manage SQL Server databases.

## ADO.NET

*ADO.NET* is an essential part of the .NET. It is a specification that
unifies access to relational databases, XML files and other application data.

*System.Data.SqlClient* is an implementation of the ADO.NET specification
for SQL Server. It is a driver written in C# language and is available for all
.NET languages.

$ dotnet add package System.Data.SqlClient

We include the package to our .NET Core project.

The SqlConnection, SqlCommand, SqlDataReader,
DataSet, and SqlDataProvider are the core elements
of the .NET data provider model. The SqlConnection creates a
connection to a specific data source. The SqlCommand object
executes an SQL statement against a data source. The SqlDataReader
reads streams of data from a data source.

The DataSet object is used for offline work with a mass
of data. It is a disconnected data representation that can hold data from
a variety of different sources. Both SqlDataReader and DataSet
are used to work with data; they are used under different circumstances. If we only
need to read the results of a query, the SqlDataReader is the better
choice. If we need more extensive processing of data, or we want to bind a Winforms
control to a database table, the DataSet is preferred.

## C# SQL Server version

If the following program we check the version of the SQL Server server.

Program.cs
  

using System.Data.SqlClient;

namespace Version
{
    class Program
    {
        static void Main(string[] args)
        {
            var cs = @"Server=localhost\SQLEXPRESS;Database=testdb;Trusted_Connection=True;";
            var stm = "SELECT @@VERSION";

            using var con = new SqlConnection(cs);
            con.Open();

            using var cmd = new SqlCommand(stm, con);
            string version = cmd.ExecuteScalar().ToString();

            Console.WriteLine(version);
        }
    }
}

We connect to the database and get some info about the SQL Server.

using System.Data.SqlClient;

We import the elements of the SQL Server data provider.

var cs = @"Server=localhost\SQLEXPRESS;Database=testdb;Trusted_Connection=True;";

This is the connection string. It is used by the data provider to establish a
connection to the database. With Trusted_Connection set to True,
the Windows Authentication mode is assumed.

var stm = "SELECT @@VERSION";

This is the SQL SELECT statement. It returns the system and build
information for the current installation of SQL Server. The
@@VERSION is a built-in SQL Server configuration function.

using var con = new SqlConnection(cs);

A SqlConnection object is created. This object is used to
open a connection to a database. The using statement releases
the database connection resource when the variable goes out of scope.

con.Open();

This line opens the database connection.

using var cmd = new SqlCommand(stm, con);

The SqlCommand is an object which is used to execute a query on
the database. The parameters are the SQL statement and the connection object.

var version = cmd.ExecuteScalar().ToString();

There are queries which return only a scalar value. In our case, we want a
simple string specifying the version of the database. The
ExecuteScalar is used in such situations.

Console.WriteLine(version);

We print the version of SQL Server to the console.

$ dotnet run
Microsoft SQL Server 2019 (RTM) - 15.0.2000.5 (X64)
        Sep 24 2019 13:48:23
        Copyright (C) 2019 Microsoft Corporation
        Express Edition (64-bit) on Windows 10 Pro 10.0 &lt;X64&gt; (Build 18362: ) (Hypervisor)

## C# SQL Server create table

In the following example, we create a database table and fill it with data.

Program.cs
  

using System.Data.SqlClient;

namespace CreateTable
{
    class Program
    {
        static void Main(string[] args)
        {
            var cs = @"Server=localhost\SQLEXPRESS;Database=testdb;Trusted_Connection=True;";

            using var con = new SqlConnection(cs);
            con.Open();

            using var cmd = new SqlCommand();
            cmd.Connection = con;

            cmd.CommandText = "DROP TABLE IF EXISTS cars";
            cmd.ExecuteNonQuery();

            cmd.CommandText = @"CREATE TABLE cars(
                id int identity(1,1) NOT NULL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                price INT
            )";
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
        }
    }
}

In the example, we create a cars table with eight rows.

cmd.CommandText = "DROP TABLE IF EXISTS cars";
cmd.ExecuteNonQuery();

First we drop the table if it already exists. We use the
ExecuteNonQuery method if we do not want a result set, for
example for DROP, INSERT, or DELETE
statements.

cmd.CommandText = @"CREATE TABLE cars(
    id int identity(1,1) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT
)";
cmd.ExecuteNonQuery();

The cars table is created. In SQL Server, an auto-incremented
column is created with the identity property.

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Audi',52642)";
cmd.ExecuteNonQuery();

cmd.CommandText = "INSERT INTO cars(name, price) VALUES('Mercedes',57127)";
cmd.ExecuteNonQuery();
...

Here we insert two rows into the table.

## C# SQL Server prepared statements

Prepared statements increase security and performance. When we write
prepared statements, we use placeholders instead of directly writing the
values into the statements.

Program.cs
  

using System.Data.SqlClient;
using System.Data;

namespace PreparedStatement
{
    class Program
    {
        static void Main(string[] args)
        {
            var cs = @"Server=localhost\SQLEXPRESS;Database=testdb;Trusted_Connection=True;";

            using var con = new SqlConnection(cs);
            con.Open();

            var query = "INSERT INTO cars(name, price) VALUES(@name, @price)";
            using var cmd = new SqlCommand(query, con);

            cmd.Parameters.Add(new SqlParameter("@name", SqlDbType.VarChar, 255)).Value="BMW";
            cmd.Parameters.Add("@price", SqlDbType.Int).Value=36600;
            cmd.Prepare();

            cmd.ExecuteNonQuery();

            Console.WriteLine("row inserted");
        }
    }
}

We add a new car to the cars table. We use a parameterized command.

var sql = "INSERT INTO cars(name, price) VALUES(@name, @price)";
using var cmd = new SqlCommand(sql, con);

When we write prepared statements, we use placeholders instead of directly
writing the values into the statements. Prepared statements are faster and guard
against SQL injection attacks. The @name and @price
are placeholders, which are going to be filled later.

cmd.Parameters.Add(new SqlParameter("@name", SqlDbType.VarChar, 255)).Value="BMW";
cmd.Parameters.Add("@price", SqlDbType.Int).Value=36600;
cmd.Prepare();

Values are bound to the placeholders with the Add method.

cmd.ExecuteNonQuery();

The prepared statement is executed. We use the ExecuteNonQuery
method of the SQLCommand object when we don't expect any
data to be returned.

## C# SqlDataReader

The SqlDataReader is an object used to retrieve data from the
database. It provides fast, forward-only, read-only access to query results. It
is the most efficient way to retrieve data from tables.

Program.cs
  

using System.Data.SqlClient;

namespace RetrieveCars
{
    class Program
    {
        static void Main(string[] args)
        {
            var cs = @"Server=localhost\SQLEXPRESS;Database=testdb;Trusted_Connection=True;";

            using var con = new SqlConnection(cs);
            con.Open();

            string sql = "SELECT * FROM cars";
            using var cmd = new SqlCommand(sql, con);

            using SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                Console.WriteLine("{0} {1} {2}", rdr.GetInt32(0), rdr.GetString(1),
                        rdr.GetInt32(2));
            }
        }
    }
}

We get all rows from the cars table and print them to
the console.

string sql = "SELECT * FROM cars";
using var cmd = new SqlCommand(sql, con);

We create a command to select all cars.

using SqlDataReader rdr = cmd.ExecuteReader();

To create a SqlDataReader, we call the ExecuteReader
method of the SqlCommand object.

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

This is the output of the example.

## C# SQL Server column headers

In the following example we print column headers with the data from a database
table.

Program.cs
  

using System.Data.SqlClient;

namespace ColumnHeaders
{
    class Program
    {
        static void Main(string[] args)
        {
            string cs = @"Server=localhost\SQLEXPRESS;Database=testdb;Trusted_Connection=True;";

            using var con = new SqlConnection(cs);
            con.Open();

            var sql = "SELECT * FROM cars";
            using var cmd = new SqlCommand(sql, con);

            using SqlDataReader rdr = cmd.ExecuteReader();
            Console.WriteLine($"{rdr.GetName(0),-4} {rdr.GetName(1),-10} {rdr.GetName(2),10}");

            while (rdr.Read())
            {
                Console.WriteLine($"{rdr.GetInt32(0),-4} {rdr.GetString(1),-10} {rdr.GetInt32(2),10}");
            }
        }
    }
}

In the example, we select all rows from the cars table with their
column names.

Console.WriteLine($"{rdr.GetName(0),-4} {rdr.GetName(1),-10} {rdr.GetName(2),10}");

We get the names of the columns with the GetName
method of the reader.

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

[How do I use SQL Server with C# and .NET](https://learn.microsoft.com/en-us/shows/on-net/how-do-i-use-sql-server-with-csharp-and-dotnet)

In this article we have shown how to program SQL Server databases in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).