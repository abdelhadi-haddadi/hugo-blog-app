+++
title = "C# SqlKata"
date = 2025-08-29T19:51:26.600+01:00
draft = false
description = "C# Sqlkata tutorial shows how to program databases in C# with SqlKata library. SqlKata uses SqlBuilder pattern to define queries."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# SqlKata

last modified July 13, 2023

 

In this article we show how to program databases in C# with SqlKata library.
SqlKata uses SqlBuilder pattern to define queries.

*SqlKata* is a fluent SQL query builder for C#. It allows us to create 
SQL statements easily with method chaining. 

$ dotnet add project SqlKata
$ dotnet add project SqlKata.Execution

We add the SqlKata packages.

$ dotnet add project Npgsql

We add the driver for PostgreSQL database.

cars_postgre.sql
  

CREATE TABLE cars(id serial PRIMARY KEY, name VARCHAR(255), price INT);
INSERT INTO cars(name, price) VALUES('Audi', 52642);
INSERT INTO cars(name, price) VALUES('Mercedes', 57127);
INSERT INTO cars(name, price) VALUES('Skoda', 9000);
INSERT INTO cars(name, price) VALUES('Volvo', 29000);
INSERT INTO cars(name, price) VALUES('Bentley', 350000);
INSERT INTO cars(name, price) VALUES('Citroen', 21000);
INSERT INTO cars(name, price) VALUES('Hummer', 41400);
INSERT INTO cars(name, price) VALUES('Volkswagen', 21600);

In the examples we use this table.

## SqlKata query single row

In the first example, we query a single row. 

Program.cs
  

using Npgsql;
using SqlKata.Compilers;
using SqlKata.Execution;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var compiler = new PostgresCompiler();
var db = new QueryFactory(con, compiler);

var car = db.Query("cars").Where("id", 1).First();

Console.WriteLine(car);
Console.WriteLine($"{car.id} {car.name} {car.price}");

We select the row with Id equal to 1. 

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

First, we define the connection string and open a database connection.

var compiler = new PostgresCompiler();
var db = new QueryFactory(con, compiler);

We choose the compiler for our database and define a QueryFactory. 
The QueryFactory is the object that is used to build SQL queries.

var car = db.Query("cars").Where("id", 1).First();

The query is build by chainging three method calls: Query, which 
selects the table name, Where, which defines the WHERE SQL clause, 
and the First, which returns the first row from the result.

$ dotnet run 
{DapperRow, id = '1', name = 'Audi', price = '52642'}
1 Audi 52642

## SqlKata fetch all rows

In the next example, we fetch all rows.

Program.cs
  

using Npgsql;
using SqlKata.Compilers;
using SqlKata.Execution;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var compiler = new PostgresCompiler();
var db = new QueryFactory(con, compiler);

var cars = db.Query("cars").OrderByDesc("name").Get();
foreach (var car in cars)
{
    Console.WriteLine($"{car.id} {car.name} {car.price}");
}

The program takes all rows from the table and orders the output by name in
descending order.

var cars = db.Query("cars").OrderByDesc("name").Get();

We get the result by chaining Query, OrderByDesc, 
and Get calls. 

$ dotnet run 
4 Volvo 29000
8 Volkswagen 21600
3 Skoda 9000
2 Mercedes 57127
7 Hummer 41400
6 Citroen 21000
5 Bentley 350000
1 Audi 52642

## SqlKata insert row

In the next example, we insert a new row into the table.

Program.cs
  

using Npgsql;
using SqlKata.Compilers;
using SqlKata.Execution;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var compiler = new PostgresCompiler();
var db = new QueryFactory(con, compiler);

int n = db.Query("cars").Insert(new
{
    name = "Toyota",
    price = 27890
});

if (n == 1)
{
    Console.WriteLine("New row inserted");
}

The Insert method is used to generate an INSERT SQL statement.

## SqlKata delete row

In the next example, we delete a row from the table.

Program.cs
  

using Npgsql;
using SqlKata.Compilers;
using SqlKata.Execution;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var compiler = new PostgresCompiler();
var db = new QueryFactory(con, compiler);

int id = 9;
int n = db.Query("cars").Where("id", id).Delete();

if (n == 1)
{
    Console.WriteLine("row succesfully deleted");
}

The program deletes a row with id equal to 9.

int n = db.Query("cars").Where("id", id).Delete();

To create the statement, we used the Query, Where, 
and Delete method calls.

## SQL Server example

We have worked with PostgreSQL database. The next example shows how to create 
a simple example for SQL Server. 

$ dotnet add package SqlKata
$ dotnet add package SqlKata.Execution
$ dotnet add package System.Data.SqlClient

We add these three packages to our project.

cars_sqlserver.sql
  

DROP TABLE IF EXISTS cars;
CREATE TABLE cars(id INT PRIMARY KEY IDENTITY(1, 1), name VARCHAR(255), price INT);

INSERT INTO cars(name, price) VALUES('Audi',52642);
INSERT INTO cars(name, price) VALUES('Mercedes',57127);
INSERT INTO cars(name, price) VALUES('Skoda',9000);
INSERT INTO cars(name, price) VALUES('Volvo',29000);
INSERT INTO cars(name, price) VALUES('Bentley',350000);
INSERT INTO cars(name, price) VALUES('Citroen',21000);
INSERT INTO cars(name, price) VALUES('Hummer',41400);
INSERT INTO cars(name, price) VALUES('Volkswagen',21600);

We have the SQL for the SQL Server.

Program.cs
  

using System.Data.SqlClient;
using SqlKata.Compilers;
using SqlKata.Execution;

string cs = @"Server=localhost\SQLEXPRESS;Database=testdb;Trusted_Connection=True;";

using var con = new SqlConnection(cs);
con.Open();

var compiler = new SqlServerCompiler();
var db = new QueryFactory(con, compiler);

var cars = db.Query("cars").Get&lt;Car&gt;();

foreach (var car in cars)
{
    Console.WriteLine(car);
}

class Car
{
    public int Id { get; init; }
    public string Name { get; init; }
    public int Price { get; init; }
    
    public Car(int Id, string Name, int Price)
    {
        this.Id = Id;
        this.Name = Name;
        this.Price = Price;
    }

    public override string ToString()
    {
        return $"[{this.Id} {this.Name} {this.Price}]";
    }
}

In the example, we fetch all the rows from the table of an SQL Server database.

using System.Data.SqlClient;

The namespace is built into the .NET Core.

using var con = new SqlConnection(cs);

We use SqlConnection. 

var compiler = new SqlServerCompiler();

We use SqlServerCompiler.

## Source

[Sqlkata documentation](https://sqlkata.com/docs)

In this article we have shown how to program databases in C# with SqlKata.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).