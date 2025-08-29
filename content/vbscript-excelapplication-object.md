+++
title = "VBScript Excel.Application Object"
date = 2025-08-29T20:15:19.900+01:00
draft = false
description = "Learn about VBScript Excel.Application object, including Excel automation, workbook operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Excel.Application Object

last modified April 9, 2025

The Excel.Application object in VBScript provides automation 
capabilities for Microsoft Excel. It allows scripts to create, modify, and 
manipulate Excel workbooks programmatically. This object is part of Excel's 
Object Model and enables powerful spreadsheet automation.

Through Excel.Application, you can control Excel's interface, 
work with cells, and perform calculations. It supports creating charts, 
formatting data, and applying formulas. This tutorial covers key features 
with practical examples to demonstrate its usage.

## Excel.Application Object Overview

The Excel.Application object represents the entire Excel 
application. It serves as the root object for Excel automation. From it, 
you can access workbooks, worksheets, ranges, and other Excel components.

Key properties include Visible to control Excel's visibility 
and Workbooks to access open workbooks. Methods like 
Quit close Excel. Understanding this object is essential for 
Excel automation with VBScript.

## Creating a New Excel Workbook

This example demonstrates how to create a new Excel instance and workbook. 
It shows basic Excel automation including making the application visible. 
The script creates a blank workbook and waits before closing.

create_workbook.vbs
  

Set excelApp = CreateObject("Excel.Application")
excelApp.Visible = True
Set workbook = excelApp.Workbooks.Add()

WScript.Echo "New workbook created. Press OK to close Excel."
excelApp.Quit

Set workbook = Nothing
Set excelApp = Nothing

The script creates an Excel application object and makes it visible. 
A new workbook is added using the Add method. After showing 
a message, Excel is closed cleanly. Always release objects to free resources.

## Opening and Modifying an Existing Workbook

This example shows how to open an existing Excel file and modify cell 
values. It demonstrates accessing worksheets and ranges. The changes are 
saved back to the file.

modify_workbook.vbs
  

Set excelApp = CreateObject("Excel.Application")
Set workbook = excelApp.Workbooks.Open("C:\Data\Report.xlsx")
Set sheet = workbook.Worksheets(1)

sheet.Range("A1").Value = "Updated Report"
sheet.Range("B2").Value = Now()

workbook.Save
excelApp.Quit

Set sheet = Nothing
Set workbook = Nothing
Set excelApp = Nothing

The script opens "Report.xlsx" and accesses its first worksheet. It updates 
cell A1 with text and B2 with current date/time. After saving changes, 
Excel closes. Proper error handling should be added for production use.

## Reading Data from Excel

This example demonstrates reading values from an Excel worksheet. It shows 
how to access cell values and iterate through a range. The data is displayed 
using WScript.Echo.

read_data.vbs
  

Set excelApp = CreateObject("Excel.Application")
Set workbook = excelApp.Workbooks.Open("C:\Data\Products.xlsx")
Set sheet = workbook.Worksheets("Inventory")

For row = 1 To 5
    product = sheet.Cells(row, 1).Value
    quantity = sheet.Cells(row, 2).Value
    WScript.Echo product &amp; ": " &amp; quantity
Next

excelApp.Quit

Set sheet = Nothing
Set workbook = Nothing
Set excelApp = Nothing

The script opens "Products.xlsx" and accesses the "Inventory" worksheet. 
It reads the first five rows of data from columns A and B. Each product 
and quantity pair is displayed. Excel closes after reading the data.

## Creating a Chart from Worksheet Data

This example shows how to create a chart from worksheet data. It 
demonstrates chart creation and basic formatting. The chart is embedded 
in the worksheet.

create_chart.vbs
  

Set excelApp = CreateObject("Excel.Application")
excelApp.Visible = True
Set workbook = excelApp.Workbooks.Add()
Set sheet = workbook.Worksheets(1)

' Add sample data
sheet.Range("A1").Value = "Month"
sheet.Range("B1").Value = "Sales"
sheet.Range("A2:A5").Value = Array("Jan", "Feb", "Mar", "Apr")
sheet.Range("B2:B5").Value = Array(120, 150, 180, 210)

' Create chart
Set chart = sheet.Shapes.AddChart.Chart
chart.ChartType = 51 'xlColumnClustered
chart.SetSourceData sheet.Range("A1:B5")

WScript.Echo "Chart created. Press OK to close Excel."
excelApp.Quit

Set chart = Nothing
Set sheet = Nothing
Set workbook = Nothing
Set excelApp = Nothing

The script creates a new workbook with sample sales data. A clustered column 
chart is created from the data range. The chart type is specified using 
Excel's built-in constants. Always clean up objects after use.

## Using Excel Formulas

This example demonstrates applying Excel formulas through VBScript. It shows 
how to set formulas in cells and display results. The workbook includes 
basic calculations.

excel_formulas.vbs
  

Set excelApp = CreateObject("Excel.Application")
excelApp.Visible = True
Set workbook = excelApp.Workbooks.Add()
Set sheet = workbook.Worksheets(1)

' Add data
sheet.Range("A1").Value = "Value 1"
sheet.Range("B1").Value = "Value 2"
sheet.Range("A2").Value = 15
sheet.Range("B2").Value = 25

' Add formulas
sheet.Range("C1").Value = "Sum"
sheet.Range("C2").Formula = "=SUM(A2:B2)"
sheet.Range("D1").Value = "Average"
sheet.Range("D2").Formula = "=AVERAGE(A2:B2)"

WScript.Echo "Formulas applied. Press OK to close Excel."
excelApp.Quit

Set sheet = Nothing
Set workbook = Nothing
Set excelApp = Nothing

The script creates a workbook with two input values. It applies SUM
and AVERAGE formulas to calculate results. Excel's formula syntax
is used directly. The workbook remains visible for inspection before closing.

## Source

[Excel.Application Object Documentation](https://learn.microsoft.com/en-us/office/vba/api/excel.application(object))

In this article, we have explored the Excel.Application object 
in VBScript, covering its usage and practical applications. From basic 
workbook operations to charts and formulas, these examples demonstrate 
powerful Excel automation capabilities. With this knowledge, you can 
enhance your scripts with robust Excel integration.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).