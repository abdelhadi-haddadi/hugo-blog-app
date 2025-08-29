+++
title = "VBScript Excel.Worksheet Object"
date = 2025-08-29T20:15:21.010+01:00
draft = false
description = "Learn about VBScript Excel.Worksheet Object, including cell manipulation, data operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Excel.Worksheet Object

last modified April 9, 2025

The Excel.Worksheet object in VBScript represents a single worksheet
in an Excel workbook. It provides methods and properties to manipulate worksheet
data and formatting. This object is part of Excel's automation interface,
accessible through VBScript.

With Worksheet, you can read and write cell values, format cells,
and manage worksheet structure. It's essential for automating Excel tasks in
VBScript. This tutorial covers Worksheet with practical examples
to demonstrate its usage.

## Worksheet Object Overview

The Worksheet object is a member of the Worksheets
collection. Each worksheet contains cells organized in rows and columns. You
access worksheets by name or index from the collection.

Key properties include Name, Cells, and
Range. Important methods include Activate,
Copy, and Delete. Understanding this object helps
create robust Excel automation scripts.

## Accessing a Worksheet

This example demonstrates how to access a worksheet in an Excel workbook. It
shows both by name and by index approaches. The script creates an Excel
instance and accesses the first worksheet.

access_worksheet.vbs
  

Set excel = CreateObject("Excel.Application")
Set workbook = excel.Workbooks.Add()

' Access by index (1-based)
Set sheet1 = workbook.Worksheets(1)

' Access by name
Set sheet2 = workbook.Worksheets.Add()
sheet2.Name = "DataSheet"
Set namedSheet = workbook.Worksheets("DataSheet")

excel.Visible = True
WScript.Echo "Active sheet: " &amp; namedSheet.Name

' Cleanup
Set namedSheet = Nothing
Set sheet1 = Nothing
Set workbook = Nothing
Set excel = Nothing

The script creates an Excel application and adds a new workbook. It accesses
the first worksheet by index (1) and another by name. The worksheet name is
displayed using the Name property.

## Writing Data to Cells

This example shows how to write data to worksheet cells. It demonstrates both
individual cell access and range operations. The values are written to specific
cells in the worksheet.

write_cells.vbs
  

Set excel = CreateObject("Excel.Application")
Set workbook = excel.Workbooks.Add()
Set sheet = workbook.Worksheets(1)

' Write to individual cells
sheet.Cells(1, 1).Value = "Product"
sheet.Cells(1, 2).Value = "Price"

' Write using Range
sheet.Range("A2").Value = "Laptop"
sheet.Range("B2").Value = 999.99

' Write to multiple cells
sheet.Range("A3:B3").Value = Array("Phone", 599.99)

excel.Visible = True

' Cleanup
Set sheet = Nothing
Set workbook = Nothing
Set excel = Nothing

The script writes headers to row 1 and product data below. It uses both
Cells and Range properties. The Array
function writes multiple values at once. Excel becomes visible to show results.

## Reading Data from Worksheet

This example demonstrates reading data from worksheet cells. It shows how to
retrieve values from individual cells and ranges. The read values are displayed
using WScript.Echo.

read_cells.vbs
  

Set excel = CreateObject("Excel.Application")
Set workbook = excel.Workbooks.Add()
Set sheet = workbook.Worksheets(1)

' Write sample data
sheet.Range("A1:B2").Value = Array(Array("Item", "Qty"), Array("Apples", 5))

' Read individual cell
item = sheet.Cells(2, 1).Value
quantity = sheet.Cells(2, 2).Value

' Read range
Set dataRange = sheet.Range("A1:B2")
WScript.Echo "Data range has " &amp; dataRange.Rows.Count &amp; " rows"

' Display values
WScript.Echo item &amp; ": " &amp; quantity

' Cleanup
Set dataRange = Nothing
Set sheet = Nothing
Set workbook = Nothing
Set excel = Nothing

The script first writes sample data to a range. It then reads values from
specific cells and the entire range. The row count of the range is displayed,
followed by specific cell values.

## Formatting Worksheet Cells

This example demonstrates basic cell formatting in a worksheet. It shows how to
set font properties, cell colors, and number formats. Formatting makes data
more readable and professional.

format_cells.vbs
  

Set excel = CreateObject("Excel.Application")
Set workbook = excel.Workbooks.Add()
Set sheet = workbook.Worksheets(1)

' Write data
sheet.Range("A1:B1").Value = Array("Date", "Amount")
sheet.Range("A2:B2").Value = Array(Date(), 1250.75)

' Format headers
With sheet.Range("A1:B1").Font
    .Bold = True
    .Color = RGB(255, 255, 255)
End With

' Format cells
sheet.Range("A1:B1").Interior.Color = RGB(0, 0, 128)
sheet.Columns("A").NumberFormat = "mm/dd/yyyy"
sheet.Columns("B").NumberFormat = "$#,##0.00"

excel.Visible = True

' Cleanup
Set sheet = Nothing
Set workbook = Nothing
Set excel = Nothing

The script writes sample data and applies various formatting options. Headers
get bold white text on dark blue background. Date and currency columns receive
appropriate number formats. Excel becomes visible to show the results.

## Working with Multiple Worksheets

This example shows how to work with multiple worksheets in a workbook. It
demonstrates adding, naming, and copying worksheets. The script also shows
how to navigate between worksheets.

multiple_sheets.vbs
  

Set excel = CreateObject("Excel.Application")
Set workbook = excel.Workbooks.Add()

' Add and name new worksheets
Set sheet1 = workbook.Worksheets(1)
sheet1.Name = "Main"

Set sheet2 = workbook.Worksheets.Add()
sheet2.Name = "Backup"

' Copy data between sheets
sheet1.Range("A1").Value = "Original Data"
sheet1.Range("A1").Copy sheet2.Range("A1")

' Activate different sheets
sheet2.Activate
WScript.Echo "Active sheet: " &amp; excel.ActiveSheet.Name

excel.Visible = True

' Cleanup
Set sheet2 = Nothing
Set sheet1 = Nothing
Set workbook = Nothing
Set excel = Nothing

The script creates a workbook with two named worksheets. It copies data from
the first sheet to the second. The Activate method switches
between sheets. The active sheet name is displayed before showing Excel.

## Source

[Excel Worksheet Object Documentation](https://learn.microsoft.com/en-us/office/vba/api/excel.worksheet)

In this article, we have explored the Worksheet object in VBScript,
covering its usage and practical applications. From basic cell operations to
formatting and multi-sheet management, these examples demonstrate Excel
automation. With this knowledge, you can create powerful Excel automation
scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).