+++
title = "C# DataFrame"
date = 2025-08-29T19:51:05.945+01:00
draft = false
description = "C# Microsoft Data Analysis DataFrame tutorial shows how to work with a dataframe in C#."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# DataFrame

last modified August 23, 2023

 

In this article we work with a DataFrame in C#. The
DataFrame is located in the Microsoft.Data.Analysis namespace.

A DataFrame is a data structure that organizes data into a
2-dimensional table of rows and columns, much like a spreadsheet.

$ dotnet add package Microsoft.Data.Analysis

We add the library to the project.

products.csv
  

id,product_name,category,unit_price,units_in_stock
1,Chai,Beverages,18.0,39
2,Chang,Beverages,19.0,17
3,Aniseed Syrup,Condiments,10.0,13
4,Chef Anton's Cajun Seasoning,Condiments,22.0,53
5,Chef Anton's Gumbo Mix,Condiments,21.35,0
6,Grandma's Boysenberry Spread,Condiments,25.0,120
7,Uncle Bob's Organic Dried Pears,Produce,30.0,15
8,Northwoods Cranberry Sauce,Condiments,40.0,6
9,Mishi Kobe Niku,Meat/Poultry,97.0,29
10,Ikura,Seafood,31.0,31
11,Queso Cabrales,Dairy Products,21.0,22
12,Queso Manchego La Pastora,Dairy Products,38.0,86
13,Konbu,Seafood,6.0,24
14,Tofu,Produce,23.25,35
15,Genen Shouyu,Condiments,15.5,39
16,Pavlova,Confections,17.45,29
17,Alice Mutton,Meat/Poultry,39.0,0
18,Carnarvon Tigers,Seafood,62.5,42
19,Teatime Chocolate Biscuits,Confections,9.2,25
20,Sir Rodney's Marmalade,Confections,81.0,40
21,Sir Rodney's Scones,Confections,10.0,3
22,Gustaf's Knäckebröd,Grains/Cereals,21.0,104
23,Tunnbröd,Grains/Cereals,9.0,61
24,Guaraná Fantástica,Beverages,4.5,20
25,NuNuCa Nuß-Nougat-Creme,Confections,14.0,76
26,Gumbär Gummibärchen,Confections,31.23,15
27,Schoggi Schokolade,Confections,43.9,49
28,Rössle Sauerkraut,Produce,45.6,26
29,Thüringer Rostbratwurst,Meat/Poultry,123.79,0
30,Nord-Ost Matjeshering,Seafood,25.89,10
31,Gorgonzola Telino,Dairy Products,12.5,0
32,Mascarpone Fabioli,Dairy Products,32.0,9
33,Geitost,Dairy Products,2.5,112
34,Sasquatch Ale,Beverages,14.0,111
35,Steeleye Stout,Beverages,18.0,20
36,Inlagd Sill,Seafood,19.0,112
37,Gravad lax,Seafood,26.0,11
38,Côte de Blaye,Beverages,263.5,17
39,Chartreuse verte,Beverages,18.0,69
40,Boston Crab Meat,Seafood,18.4,123
41,Jack'England Clam Chowder,Seafood,9.65,85
42,Singaporean Hokkien Fried Mee,Grains/Cereals,14.0,26
43,Ipoh Coffee,Beverages,46.0,17
44,Gula Malacca,Condiments,19.45,27
45,Rogede sild,Seafood,9.5,5
46,Spegesild,Seafood,12.0,95
47,Zaanse koeken,Confections,9.5,36
48,Chocolade,Confections,12.75,15
49,Maxilaku,Confections,20.0,10
50,Valkoinen suklaa,Confections,16.25,65
51,Manjimup Dried Apples,Produce,53.0,20
52,Filo Mix,Grains/Cereals,7.0,38
53,Perth Pasties,Meat/Poultry,32.8,0
54,Tourtière,Meat/Poultry,7.45,21
55,Pâté chinois,Meat/Poultry,24.0,115
56,Gnocchi di nonna Alice,Grains/Cereals,38.0,21
57,Ravioli Angelo,Grains/Cereals,19.5,36
58,Escargots de Bourgogne,Seafood,13.25,62
59,Raclette Courdavault,Dairy Products,55.0,79
60,Camembert Pierrot,Dairy Products,34.0,19
61,Sirop d'érable,Condiments,28.5,113
62,Tarte au sucre,Confections,49.3,17
63,Vegie-spread,Condiments,43.9,24
64,Wimmers gute Semmelknödel,Grains/Cereals,33.25,22
65,Louisiana Fiery Hot Pepper Sauce,Condiments,21.05,76
66,Louisiana Hot Spiced Okra,Condiments,17.0,4
67,Laughing Lumberjack Lager,Beverages,14.0,52
68,Scottish Longbreads,Confections,12.5,6
69,Gudbrandsdalsost,Dairy Products,36.0,26
70,Outback Lager,Beverages,15.0,15
71,Flotemysost,Dairy Products,21.5,26
72,Mozzarella di Giovanni,Dairy Products,34.8,14
73,Röd Kaviar,Seafood,15.0,101
74,Longlife Tofu,Produce,10.0,4
75,Rhönbräu Klosterbier,Beverages,7.75,125
76,Lakkalikööri,Beverages,18.0,57
77,Original Frankfurter grüne Soße,Condiments,13.0,32

In the examples, we use this CSV file.

## C# DataFrame simple example

The following is a simple DataFrame example.

Program.cs
  

using Microsoft.Data.Analysis;

var fname = Path.GetFullPath("products.csv");
var df = DataFrame.LoadCsv(fname);

Console.WriteLine(df.Info());
Console.WriteLine(df.Description());

We load data from the products.csv file and call Info
and Description methods on the dataframe.

var df = DataFrame.LoadCsv(fname);

The data is loaded from the CSV file using DataFrame.LoadCsv method.

The DataFrame.LoadCsv infers the column types automatically.
We can explicitly specify the column data types with the dataTypes
option.

Program.cs
  

using Microsoft.Data.Analysis;

var fname = Path.GetFullPath("products.csv");
var df = DataFrame.LoadCsv(fname,
    dataTypes: new Type[] { typeof(int), typeof(string), typeof(string), 
        typeof(decimal), typeof(decimal) });

Console.WriteLine(df.Info());

In the example, we specify the data types for the five columns.

## C# DataFrame Head/Tail

The Head method returns the first n rows, while the
Tail the last n rows.

Program.cs
  

using Microsoft.Data.Analysis;

var fname = Path.GetFullPath("products.csv");
var df = DataFrame.LoadCsv(fname);

Console.WriteLine(df.Head(4));
Console.WriteLine(df.Tail(4));

The example shows the first four and the last four rows from the dataframe.

## C# DataFrame Filter

We can use the Filter method to filter data.

Program.cs
  

using Microsoft.Data.Analysis;

var fname = Path.GetFullPath("products.csv");
var df = DataFrame.LoadCsv(fname);

PrimitiveDataFrameColumn&lt;bool&gt; fil = df["unit_price"].ElementwiseGreaterThan(100);
Console.WriteLine(df.Filter(fil));

Console.WriteLine(df.Filter(df.Columns[4].ElementwiseLessThan(10)));

In the program, we apply two filters. 

PrimitiveDataFrameColumn&lt;bool&gt; fil = df["unit_price"].ElementwiseGreaterThan(100);
Console.WriteLine(df.Filter(fil));

In the first filter, we show all products whose price is greater than 100.

Console.WriteLine(df.Filter(df.Columns[4].ElementwiseLessThan(10)));

The second filter is used to display products with stocks supply less than 10.

## Console output with Spectre.Console

In the following example, we use the Spectre.Console library to 
output the data in a nice table.

$ dotnet add project Spectre.Console

We add the library to the project.

Program.cs
  

using Microsoft.Data.Analysis;
using Spectre.Console;

var fname = Path.GetFullPath("products.csv");
var df = DataFrame.LoadCsv(fname);

var table = new Table()
    .Border(TableBorder.Ascii)
    .BorderColor(Color.SteelBlue)
    .AddColumn(new TableColumn("Id").RightAligned())
    .AddColumn(new TableColumn("Product name"))
    .AddColumn(new TableColumn("Category").LeftAligned())
    .AddColumn(new TableColumn("Unit price").RightAligned())
    .AddColumn(new TableColumn("Units in stock").RightAligned());

foreach (var e in df.Rows)
{
    string[] row = { $"{e[0]}", $"{e[1]}", $"{e[2]}", $"{e[3]:0.00}", $"{e[4]:0.00}" };
    table.AddRow(row);
}

AnsiConsole.Write(table);

In the program we display all products in a neat console table.

var table = new Table()
    .Border(TableBorder.Ascii)
    .BorderColor(Color.SteelBlue)
    .AddColumn(new TableColumn("Id").RightAligned())
    .AddColumn(new TableColumn("Product name"))
    .AddColumn(new TableColumn("Category").LeftAligned())
    .AddColumn(new TableColumn("Unit price").RightAligned())
    .AddColumn(new TableColumn("Units in stock").RightAligned());

We build up the table. We set the border and the columns. 

foreach (var e in df.Rows)
{
    string[] row = { $"{e[0]}", $"{e[1]}", $"{e[2]}", $"{e[3]:0.00}", $"{e[4]:0.00}" };
    table.AddRow(row);
}

We go over the rows of the dataframe and add each row to the console table.

AnsiConsole.Write(table);

We output the table with AnsiConsole.Write.

$ dotnet run 
+--------------------------------------------------------------------------------------+
| Id | Product name                     | Category       | Unit price | Units in stock |
|----+----------------------------------+----------------+------------+----------------|
|  1 | Chai                             | Beverages      |      18.00 |          39.00 |
|  2 | Chang                            | Beverages      |      19.00 |          17.00 |
|  3 | Aniseed Syrup                    | Condiments     |      10.00 |          13.00 |
|  4 | Chef Anton's Cajun Seasoning     | Condiments     |      22.00 |          53.00 |
|  5 | Chef Anton's Gumbo Mix           | Condiments     |      21.35 |           0.00 |
|  6 | Grandma's Boysenberry Spread     | Condiments     |      25.00 |         120.00 |
|  7 | Uncle Bob's Organic Dried Pears  | Produce        |      30.00 |          15.00 |
|  8 | Northwoods Cranberry Sauce       | Condiments     |      40.00 |           6.00 |
|  9 | Mishi Kobe Niku                  | Meat/Poultry   |      97.00 |          29.00 |
...
| 71 | Flotemysost                      | Dairy Products |      21.50 |          26.00 |
| 72 | Mozzarella di Giovanni           | Dairy Products |      34.80 |          14.00 |
| 73 | Röd Kaviar                       | Seafood        |      15.00 |         101.00 |
| 74 | Longlife Tofu                    | Produce        |      10.00 |           4.00 |
| 75 | Rhönbräu Klosterbier             | Beverages      |       7.75 |         125.00 |
| 76 | Lakkalikööri                     | Beverages      |      18.00 |          57.00 |
| 77 | Original Frankfurter grüne Soße  | Condiments     |      13.00 |          32.00 |
+--------------------------------------------------------------------------------------+

## C# DataFrame sort

We sort data with OrderBy.

  

using Microsoft.Data.Analysis;
using Spectre.Console;

var file = Path.GetFullPath("products.csv");
var df = DataFrame.LoadCsv(file);

var table = new Table()
    .Border(TableBorder.Ascii)
    .BorderColor(Color.SteelBlue)
    .AddColumn(new TableColumn("Id").RightAligned())
    .AddColumn(new TableColumn("Product name"))
    .AddColumn(new TableColumn("Category").LeftAligned())
    .AddColumn(new TableColumn("Unit price").RightAligned())
    .AddColumn(new TableColumn("Units in stock").RightAligned());

foreach (var e in df.OrderBy("unit_price").Rows)
{
    string[] row = { $"{e[0]}", $"{e[1]}", $"{e[2]}", $"{e[3]:0.00}", $"{e[4]:0.00}" };
    table.AddRow(row);
}

AnsiConsole.Write(table);

In the program, we sort data by unit price.

$ dotnet run
+--------------------------------------------------------------------------------------+
| Id | Product name                     | Category       | Unit price | Units in stock |
|----+----------------------------------+----------------+------------+----------------|
| 33 | Geitost                          | Dairy Products |       2.50 |         112.00 |
| 24 | Guaraná Fantástica               | Beverages      |       4.50 |          20.00 |
| 13 | Konbu                            | Seafood        |       6.00 |          24.00 |
| 52 | Filo Mix                         | Grains/Cereals |       7.00 |          38.00 |
| 54 | Tourtière                        | Meat/Poultry   |       7.45 |          21.00 |
| 75 | Rhönbräu Klosterbier             | Beverages      |       7.75 |         125.00 |
| 23 | Tunnbröd                         | Grains/Cereals |       9.00 |          61.00 |
...
|  9 | Mishi Kobe Niku                  | Meat/Poultry   |      97.00 |          29.00 |
| 29 | Thüringer Rostbratwurst          | Meat/Poultry   |     123.79 |           0.00 |
| 38 | Côte de Blaye                    | Beverages      |     263.50 |          17.00 |
+--------------------------------------------------------------------------------------+

## C# DataFrame GroupBy

The GroupBy method groups the rows of the DataFrame by
unique values in the column name. It returns a GroupBy object that
stores the group information.

Program.cs
  

using Microsoft.Data.Analysis;
using Spectre.Console;

var file = Path.GetFullPath("products.csv");
var df = DataFrame.LoadCsv(file);

var table = new Table()
    .Border(TableBorder.Ascii)
    .BorderColor(Color.SteelBlue)
    .AddColumn(new TableColumn("Id").RightAligned())
    .AddColumn(new TableColumn("Product name"))
    .AddColumn(new TableColumn("Category"))
    .AddColumn(new TableColumn("Unit price").RightAligned())
    .AddColumn(new TableColumn("Units in stock").RightAligned());

var g = df.GroupBy("category");

foreach (var e in g.Head(100).Rows)
{
    string[] row = { $"{e[1]}", $"{e[2]}", $"{e[0]}", $"{e[3]:0.00}", $"{e[4]:0.00}" };
    table.AddRow(row);
}

AnsiConsole.Write(table);

In the example, we group products by category and display them in a table.

$ dotnet run
+--------------------------------------------------------------------------------------+
| Id | Product name                     | Category       | Unit price | Units in stock |
|----+----------------------------------+----------------+------------+----------------|
|  1 | Chai                             | Beverages      |      18.00 |          39.00 |
|  2 | Chang                            | Beverages      |      19.00 |          17.00 |
| 24 | Guaraná Fantástica               | Beverages      |       4.50 |          20.00 |
| 34 | Sasquatch Ale                    | Beverages      |      14.00 |         111.00 |
| 35 | Steeleye Stout                   | Beverages      |      18.00 |          20.00 |
| 38 | Côte de Blaye                    | Beverages      |     263.50 |          17.00 |
| 39 | Chartreuse verte                 | Beverages      |      18.00 |          69.00 |
| 43 | Ipoh Coffee                      | Beverages      |      46.00 |          17.00 |
| 67 | Laughing Lumberjack Lager        | Beverages      |      14.00 |          52.00 |
| 70 | Outback Lager                    | Beverages      |      15.00 |          15.00 |
| 75 | Rhönbräu Klosterbier             | Beverages      |       7.75 |         125.00 |
| 76 | Lakkalikööri                     | Beverages      |      18.00 |          57.00 |
|  3 | Aniseed Syrup                    | Condiments     |      10.00 |          13.00 |
|  4 | Chef Anton's Cajun Seasoning     | Condiments     |      22.00 |          53.00 |
|  5 | Chef Anton's Gumbo Mix           | Condiments     |      21.35 |           0.00 |
|  6 | Grandma's Boysenberry Spread     | Condiments     |      25.00 |         120.00 |
|  8 | Northwoods Cranberry Sauce       | Condiments     |      40.00 |           6.00 |
...
| 52 | Filo Mix                         | Grains/Cereals |       7.00 |          38.00 |
| 56 | Gnocchi di nonna Alice           | Grains/Cereals |      38.00 |          21.00 |
| 57 | Ravioli Angelo                   | Grains/Cereals |      19.50 |          36.00 |
| 64 | Wimmers gute Semmelknödel        | Grains/Cereals |      33.25 |          22.00 |
+--------------------------------------------------------------------------------------+

On the grouped data, we can calculate aggregate operations such as max, min, or
sum. 

Program.cs
  

using Microsoft.Data.Analysis;
using Spectre.Console;

var file = Path.GetFullPath("products.csv");
var df = DataFrame.LoadCsv(file);

var table = new Table()
    .Border(TableBorder.Ascii)
    .BorderColor(Color.SteelBlue)
    .AddColumn(new TableColumn("Category"))
    .AddColumn(new TableColumn("Max price").RightAligned());

var g = df.GroupBy("category");
var df2 = g.Max("unit_price");

foreach (var e in df2.Rows)
{
    string[] row = { $"{e[0]}", $"{e[1]:0.00}" };
    table.AddRow(row);
}

AnsiConsole.Write(table);

In the example, we calculate the max price for each category.

var g = df.GroupBy("category");

We group the data by category.

var df2 = g.Max("unit_price");

We calculate the max price for each category.

$ dotnet run
+----------------------------+
| Category       | Max price |
|----------------+-----------|
| Beverages      |    263.50 |
| Condiments     |     43.90 |
| Produce        |     53.00 |
| Meat/Poultry   |    123.79 |
| Seafood        |     62.50 |
| Dairy Products |     55.00 |
| Confections    |     81.00 |
| Grains/Cereals |     38.00 |
+----------------------------+

## Source

[Getting started with DataFrames](https://learn.microsoft.com/en-us/dotnet/machine-learning/how-to-guides/getting-started-dataframe)

In this article we have worked with Microsoft Data Analysis DataFrame in C#.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).