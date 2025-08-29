+++
title = "C# Dapper"
date = 2025-08-27T23:22:54.026+01:00
draft = false
description = "C# Dapper tutorial shows how to program databases
in C# with Dapper. Dapper is a simple object mapper for the .NET platform."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Dapper

last modified July 23, 2023

 

In this article we show how to program databases in C# with Dapper. In the
examples we work with PostgreSQL.

## Dapper

Dapper is a simple object mapper for the  .NET platform. It is a
framework for mapping an object-oriented domain model to a traditional
relational database.

Dapper's goals are code simplicity and performance.

Dapper has no DB specific implementation details, it works across all .NET
ADO providers including SQLite, SQL CE, Firebird, Oracle, MySQL, PostgreSQL
and SQL Server. Dapper was created by team at Stack Overflow.

$ dotnet add package Dapper

To utilize Dapper, we add the package reference to the project
with the dotnet tool.

$ dotnet add package Npgsql

We include also the driver for the PostgreSQL.

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

In our examples, we use this table.

## C# Dapper ExecuteScalar

The ExecuteScalar method executes a query that selects a single
value.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var ver = con.ExecuteScalar&lt;string&gt;("SELECT version()");
Console.WriteLine(ver);

The example retrieves the version of the PostgreSQL database.

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

We provide the connection string for the PostgreSQL database.

using var con = new NpgsqlConnection(cs);

We create a new NpgsqlConnection.

con.Open();

The Open method opens a new connection to the database.

var version = con.ExecuteScalar&lt;string&gt;("SELECT version()");

The ExecuteScalar method executes the SELECT version()
query, which returns a single value: the version of PostgreSQL.

$ dotnet run
PostgreSQL 11.1, compiled by Visual C++ build 1914, 64-bit

## C# Dapper Query

The Query method executes a query and maps it to a
list of dynamic objects.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var cars = con.Query&lt;Car&gt;("SELECT * FROM cars").ToList();
cars.ForEach(car =&gt; Console.WriteLine(car));

record Car(int Id, string Name, int Price);

The example retrieves all rows from the cars table.

var cars = con.Query&lt;Car&gt;("SELECT * FROM cars").ToList();

The Query method executes the SELECT * FROM cars
statement and returns a list of objects.

cars.ForEach(car =&gt; Console.WriteLine(car));

We go through the list and print all elements to the console.

$ dotnet run
1 Audi 52642
2 Mercedes 57127
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600

## C# Dapper ExecuteReader

The ExecuteReader executes the SQL and returns an
IDataReader . This is typically used when the results of a query
are not processed by Dapper, for example, used to fill a DataTable
or DataSet.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var reader = con.ExecuteReader("SELECT * FROM cars");

while (reader.Read())
{
    long id = reader.GetInt64(0);
    string name = reader.GetString(1);
    int price = reader.GetInt32(2);

    Console.WriteLine($"{id} {name} {price}");
}

In the example, we retrieve all rows from the table using
ExecuteReader.

while (reader.Read())
{
    long id = reader.GetInt64(0);
    string name = reader.GetString(1);
    int price = reader.GetInt32(2);

    Console.WriteLine($"{id} {name} {price}");
}

Here, no mapping is done by Dapper. We process the columns manually.

$ dotnet run
1 Audi 52642
3 Skoda 9000
4 Volvo 29000
5 Bentley 350000
6 Citroen 21000
7 Hummer 41400
8 Volkswagen 21600
2 Mercedes 52000

## C# Dapper Execute

The Execute method executes an SQL statement. It is used to
execute INSERT, UPDATE, and DELETE statement.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

int affectedRows = con.Execute("UPDATE cars SET price = 52000 WHERE id = 1");
Console.WriteLine($"UPDATE affected rows: {affectedRows}");

The example updates the price of a single car and returns the number of affected
rows.

int affectedRows = con.Execute("UPDATE cars SET price = 52000 WHERE id = 1");

The UPDATE statement updates the price of a car. The Execute method
returns the number of updated rows.

Console.WriteLine($"UPDATE affected rows: {affectedRows}");

The number of updated rows is printed to the terminal.

$ dotnet run
UPDATE affected rows: 1

## C# Dapper parameterized query

Parameterized queries increase security and performance. When we write
parameterized queries, we use placeholders instead of directly writing the
values into the queries.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var car = con.QueryFirst&lt;Car&gt;("SELECT * FROM cars WHERE id=@id",
    new { id = 3 });

Console.WriteLine(car);

record Car(int Id, string Name, int Price);

The example selects a specific row from the table.

var car = con.QueryFirst&lt;Car&gt;("SELECT * FROM cars WHERE id=@id",
    new { id = 3 });

The QueryFirst returns the first result of the SQL query. The
@id is a placeholder to be filled. The second argument is the
parameter to fill the placeholder.

$ dotnet run
Car { Id = 3, Name = Skoda, Price = 9000 }

The next example provides multiple parameters.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var cars = con.Query&lt;Car&gt;("SELECT * FROM cars WHERE id IN (@id1, @id2)",
    new { id1 = 1, id2 = 2 });

Console.WriteLine(string.Join("\n", cars));

record Car(int Id, string Name, int Price);

We query for two cars. We provide an anonymous object with the given ids.

$ dotnet run
Car { Id = 1, Name = Audi, Price = 52642 }
Car { Id = 2, Name = Mercedes, Price = 52000 }

## C# Dapper delete row

The following example deletes a row from the table.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

int delRows = con.Execute(@"DELETE FROM cars WHERE Id = @Id", new { Id = 1 });

if (delRows &gt; 0)
{
    Console.WriteLine("car deleted");
}

The example deletes a row with the Execute method.

## C# Dapper QueryMultiple

The QueryMultiple method executes a command that returns multiple
result sets and returns each in turn.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var sql = @"select * from cars where Id = @id1;
            select * from cars where Id = @id2;
            select * from cars where Id = @id3";

using var multi = con.QueryMultiple(sql, new { id1 = 1, id2 = 2, id3 = 3});

var c1 = multi.Read&lt;Car&gt;().Single();
var c2 = multi.Read&lt;Car&gt;().Single();
var c3 = multi.Read&lt;Car&gt;().Single();

Console.WriteLine(c1);
Console.WriteLine(c2);
Console.WriteLine(c3);

record Car(int Id, string Name, int Price);

The example returns three SELECT statements in one go.

var sql = @"select * from cars where Id = @id1;
            select * from cars where Id = @id2;
            select * from cars where Id = @id3";

We define a multiple select statement. Each of the statements is separated by a
semicolon.

using var multi = con.QueryMultiple(sql, new { id1 = 1, id2 = 2, id3 = 3});

The statements are executed with QueryMultiple. We provide the
ids in the params object.

var c1 = multi.Read&lt;Car&gt;().Single();
var c2 = multi.Read&lt;Car&gt;().Single();
var c3 = multi.Read&lt;Car&gt;().Single();

We read the car objects with Read.

$ dotnet run
Car { Id = 1, Name = Audi, Price = 52642 }
Car { Id = 2, Name = Mercedes, Price = 57127 }
Car { Id = 3, Name = Skoda, Price = 9000 }

## C# Dapper DynamicParameters

The DynamicParameters is a bag of parameters that can be passed to
the Dapper Query and Execute methods.

Program.cs
  

using System.Data;
using Npgsql;
using Dapper;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var query = "INSERT INTO cars(name, price) VALUES(@name, @price)";

var dp = new DynamicParameters();
dp.Add("@name", "Lada", DbType.AnsiString, ParameterDirection.Input, 255);
dp.Add("@price", 36600);

int res = con.Execute(query, dp);

if (res &gt; 0)
{
    Console.WriteLine("row inserted");
}

The example inserts a new row into the cars table.

var dp = new DynamicParameters();
dp.Add("@name", "Lada", DbType.AnsiString, ParameterDirection.Input, 255);
dp.Add("@price", 36600);

We dynamically provide the parameter values and their types.

int res = con.Execute(query, dp);

The dynamic parameters are passed as the second argument of the
Execute method.

## C# Dapper bulk insert

We can insert multiple rows with Execute.

Program.cs
  

using Dapper;
using Npgsql;

string cs = @"User ID=postgres;Password=passwd;Host=localhost;Port=5432;Database=testdb";

using var con = new NpgsqlConnection(cs);
con.Open();

var stm = "INSERT INTO cars(name, price) VALUES(@name, @price)";

var data = new List&lt;Car&gt;
{
    new Car (Name: "Lada 2", Price : 63444 ),
    new Car (Name: "Toyota 2", Price : 63330 )
};

int n = con.Execute(stm, data);

Console.WriteLine($"{n} cars inserted");

record Car(string Name, int Price);

The program inserts two cars into the table.

int n = con.Execute(stm, data);

The Execute method takes the statement and the list of objects as
parameters.

## Source

[Dapper Github page](https://github.com/DapperLib/Dapper)

In this article we have shown how to program databases in C# with Dapper.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).