+++
title = "C# Excel"
date = 2025-08-27T23:22:59.656+01:00
draft = false
description = "Learn how to read, write, and manipulate Excel files in C# using the ClosedXML library. This tutorial covers essential techniques for handling Excel 2007+ (.xlsx, .xlsm) files with .NET."
image = ""
imageBig = ""
categories = ["csharp"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C# Excel

last modified May 1, 2025

 

C# Excel tutorial shows how to work with Excel files in C# with ClosedXML
library. 

## Understanding Excel File Formats

In this article, we focus on .xlsx files—an Open XML spreadsheet
format widely used in Microsoft Excel. Unlike older formats, .xlsx
is based on the **Office Open XML** standard, offering better
compression and data integrity.

Other related Excel formats include:

    - **.xlsm** - Supports macros, allowing automated actions within spreadsheets.

    - **.xltm** - Macro-enabled template files for reusable document structures.

    - **.xls** - The legacy binary format, used in older versions of Excel.

## Introducing ClosedXML

ClosedXML is a powerful .NET library designed for working with Excel 2007+
(.xlsx, .xlsm) files in C#. It provides an intuitive API for reading, modifying,
and writing Excel spreadsheets without needing to interact directly with Excel
itself.

### Installation

To integrate ClosedXML into your .NET project, install it via NuGet using the
following command:

$ dotnet add package ClosedXML

Once installed, ClosedXML enables seamless spreadsheet manipulation, making it
ideal for data processing and automation tasks.

## C# Excel simple example

In the first example, we create a new xlsx file with ClosedXML. 

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook();

var ws = wbook.Worksheets.Add("Sheet1");
ws.Cell("A1").Value = "150";

wbook.SaveAs("simple.xlsx");

We create a new Excel file and write a value to a cell.

using var wbook = new XLWorkbook();

A new XLWorkbook is created.

var ws = wbook.Worksheets.Add("Sheet1");

We add a new sheet to the workbook.

ws.Cell("A1").Value = "150";

A value is written to cell with A1 address.

wbook.SaveAs("simple.xlsx");

The workbook is saved with the SaveAs method.

## C# Excel cell

A cell is an intersection of a row and a column. Each cell has a unique address
made up of its column letter and row number. For instance, the first cell
located in the upper-left corner of a sheet has address A1.

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook();

var ws = wbook.AddWorksheet("Sheet1");

ws.FirstCell().Value = 150;

ws.Cell(3, 2).Value = "Hello there!";
ws.Cell("A6").SetValue("falcon").SetActive();

ws.Column(2).AdjustToContents();

wbook.SaveAs("data.xlsx");

In the example, we work with cells.

ws.FirstCell().Value = 150;

The FirstCell retrieves the reference to the first cell in 
the sheet. We set its value to 150 using the Value property.

ws.Cell(3, 2).Value = "Hello there!";

Another way to reference a cell is used an overloaded Cell method, 
which takes the row and column numbers as parameters.

ws.Cell("A6").SetValue("falcon").SetActive();

Here, we get a cell via its address (A6), and use the SetValue
method to write a string to the cell. The SetActive method makes
the cell active. 

ws.Column(2).AdjustToContents();

We adjust the width of the second column to the contents; the Hello
there! value is fully visible.

## C# read Excel file

In the next example, we read from the previously created Excel file. 

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook("simple.xlsx");

var ws1 = wbook.Worksheet(1); 
var data = ws1.Cell("A1").GetValue&lt;string&gt;();

Console.WriteLine(data);

The example reads a value from a cell.

using var wbook = new XLWorkbook("simple.xlsx");

We open a workbook.

var ws1 = wbook.Worksheet(1); 

We navigate to the first sheet.

var data = ws1.Cell("A1").GetValue&lt;string&gt;();

Using the GetValue method, we read a value from cell A1.

## C# Excel apply style

A style can be applied via the Style property.

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook();

var ws = wbook.Worksheets.Add("Sheet1");

var c1 = ws.Column("A");
c1.Width = 25;

var c2 = ws.Column("B");
c2.Width = 15;

ws.Cell("A3").Value = "an old falcon";
ws.Cell("B2").Value = "150";
ws.Cell("B5").Value = "Sunny day";

ws.Cell("A3").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
ws.Cell("A3").Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
ws.Cell("A3").Style.Font.Italic = true;

ws.Cell("B2").Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
ws.Cell("B5").Style.Font.FontColor = XLColor.Red;

wbook.SaveAs("styled.xlsx");

In the example, apply styles to cells.

var c1 = ws.Column("A");
c1.Width = 25;

var c2 = ws.Column("B");
c2.Width = 15;

We set the widths of A and B columns.

ws.Cell("A3").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
ws.Cell("A3").Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
ws.Cell("A3").Style.Font.Italic = true;

In the A3 cell, we center the text horizontally and vertically and choose a 
cursive font.

ws.Cell("B2").Style.Border.OutsideBorder = XLBorderStyleValues.Thin;

We set a thin border for B2 cell.

ws.Cell("B5").Style.Font.FontColor = XLColor.Red;

In cell B5, the font color is set to red.

## C# Excel ranges

A range is a group of one or more cells. A range address is specified with a 
upper-left cell address and a lower-bottom address, separated by a colon.

A single range is created with Range; multiple ranges are created 
with Ranges.

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook();

var ws = wbook.Worksheets.Add("Sheet1");

ws.Range("D2:E2").Style.Fill.BackgroundColor = XLColor.Gray;
ws.Ranges("C5, F5:G8").Style.Fill.BackgroundColor = XLColor.Gray;

var rand = new Random();
var range = ws.Range("C10:E15");

foreach (var cell in range.Cells())
{
    cell.Value = rand.Next();
}

ws.Column("C").AdjustToContents();
ws.Column("D").AdjustToContents();
ws.Column("E").AdjustToContents();

wbook.SaveAs("ranges.xlsx");

In the example, we work with ranges.

ws.Range("D2:E2").Style.Fill.BackgroundColor = XLColor.Gray;

We change the background colour for D2:E2 range.

ws.Ranges("C5, F5:G8").Style.Fill.BackgroundColor = XLColor.Gray;

Here, we change the background colour for two ranges.

var rand = new Random();
var range = ws.Range("C10:E15");

foreach (var cell in range.Cells())
{
    cell.Value = rand.Next();
}

In each cell of the C10:E15 range, we set a random value. We use 
the Cells method to get the cells of the range.

ws.Column("C").AdjustToContents();

We adjust the width of the column C to the written contents so that
the whole value is visible.

## C# Excel merge cells

To merge cells, we use the Merge method. 

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook();

var ws = wbook.Worksheets.Add("Sheet1");

ws.Cell("A1").Value = "Sunny day";
ws.Cell("A1").Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
ws.Cell("A1").Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;

ws.Range("A1:B2").Merge();

wbook.SaveAs("merged.xlsx");

We merge four cells into one.

ws.Range("A1:B2").Merge();

We call the Merge method on a range of four cells; A1 through B2.

## C# Excel sorting

A column can be sorted with the Sort method.

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook();

var ws = wbook.Worksheets.Add("Sheet1");

var rand = new Random();
var range = ws.Range("A1:A15");

foreach (var cell in range.Cells())
{
    cell.Value = rand.Next(1, 100);
}

ws.Sort("A");

wbook.SaveAs("sorted.xlsx");

We add fifteen random values to the A column. Then we sort the column with 
Sort.

## C# Excel CellsUsed

The CellsUsed method returns a collection of cells that have a 
value.

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook();

var ws = wbook.Worksheets.Add("Sheet1");

ws.Cell("A1").Value = "sky";
ws.Cell("A2").Value = "cloud";
ws.Cell("A3").Value = "book";
ws.Cell("A4").Value = "cup";
ws.Cell("A5").Value = "snake";
ws.Cell("A6").Value = "falcon";
ws.Cell("B1").Value = "in";
ws.Cell("B2").Value = "tool";
ws.Cell("B3").Value = "war";
ws.Cell("B4").Value = "snow";
ws.Cell("B5").Value = "tree";
ws.Cell("B6").Value = "ten";

var n = ws.Range("A1:C10").CellsUsed().Count();
Console.WriteLine($"There are {n} words in the range");

Console.WriteLine("The following words have three latin letters:");

var words = ws.Range("A1:C10")
    .CellsUsed()
    .Select(c =&gt; c.Value.ToString())
    .Where(c =&gt; c?.Length == 3)
    .ToList();

words.ForEach(Console.WriteLine);

wbook.SaveAs("usedcells.xlsx");

In the example, we write twelve words to two columns of a sheet.

var n = ws.Range("A1:C10").CellsUsed().Count();
Console.WriteLine($"There are {n} words in the range");

We define a range that is larger than the cells we have written to. With 
the help of the CellsUsed method, we get all non-empty cells. 
The Count method counts the number of non-empty cells.

var words = ws.Range("A1:C10")
    .CellsUsed()
    .Select(c =&gt; c.Value.ToString())
    .Where(c =&gt; c?.Length == 3)
    .ToList();

Here we filter all words that have three latin letters.

## C# Excel expression evaluation

With Evaluate, we can evaluate an expression.

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook("data.xlsx");

var ws = wbook.Worksheet(1); 

var sum = ws.Evaluate("SUM(A1:A7)");
var max = ws.Evaluate("MAX(A1:A7)");

Console.WriteLine($"The sum is: {sum}");
Console.WriteLine($"The maximum valus is: {max}");

In the example, we have values in the A column. We evaluate SUM and MAX 
expressions on the values.

## C# Excel formula

With the FormulaA1 property, we can insert a formula in the cell.

Program.cs
  

using ClosedXML.Excel;

using var wbook = new XLWorkbook("data.xlsx");

var ws = wbook.Worksheet(1); 

ws.Cell("A8").FormulaA1 = "SUM(A1:A7)";
ws.Cell("A8").Style.Font.Bold = true;

wbook.SaveAs("data2.xlsx");

In the example, we insert the SUM formula in the cell below the 
values.

## Source

[ClosedXML Github page](https://github.com/ClosedXML/ClosedXML)

In this article we have demonstrated how to work with Excel files with C#
using ClosedXMLlibrary. 

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C# tutorials](/csharp/).