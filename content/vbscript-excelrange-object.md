+++
title = "VBScript Excel.Range Object"
date = 2025-08-29T20:15:19.892+01:00
draft = false
description = "Learn about VBScript Excel.Range object, including cell manipulation, data operations, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Excel.Range Object

last modified April 9, 2025

The Excel.Range object in VBScript represents a cell, a row, a column,
or a selection of cells in an Excel worksheet. It is the primary object for
interacting with worksheet data. The Range object provides properties and
methods to read, write, and manipulate Excel cells programmatically.

With the Range object, you can access cell values, apply formatting, perform
calculations, and more. This tutorial covers the Range object with practical
examples to demonstrate its usage in Excel automation with VBScript.

## Excel.Range Object Overview

The Excel.Range object is part of the Excel object model accessed
through VBScript. It can reference single cells (like "A1") or multiple cells
(like "A1:B10"). The object provides numerous properties and methods for cell
manipulation.

Key properties include Value for cell content, Formula
for formulas, and Font for text formatting. Methods include
Copy, Clear, and Select. Understanding
this object is essential for Excel automation with VBScript.

## Accessing a Single Cell

This example demonstrates how to access and modify a single cell's value using
the Range object. It shows basic Excel automation with VBScript. The script
creates an Excel instance, accesses a worksheet, and modifies cell A1.

single_cell.vbs
  

Set excel = CreateObject("Excel.Application")
excel.Visible = True
Set workbook = excel.Workbooks.Add()
Set worksheet = workbook.Worksheets(1)

' Access and modify cell A1
Set rng = worksheet.Range("A1")
rng.Value = "Hello, Excel!"

' Clean up
Set rng = Nothing
Set worksheet = Nothing
Set workbook = Nothing
Set excel = Nothing

The script starts Excel, creates a new workbook, and gets the first worksheet.
It then accesses cell A1 using the Range object and sets its value. Finally,
it cleans up by releasing all object references. Excel remains visible.

## Working with Multiple Cells

This example shows how to work with a range of multiple cells. It demonstrates
setting values for a block of cells and reading them back. The Range object
can reference rectangular cell areas using the "A1:B2" notation.

multiple_cells.vbs
  

Set excel = CreateObject("Excel.Application")
excel.Visible = True
Set workbook = excel.Workbooks.Add()
Set worksheet = workbook.Worksheets(1)

' Set values for range A1:B2
Set rng = worksheet.Range("A1:B2")
rng.Value = Array(Array(1, 2), Array(3, 4))

' Read and display values
For Each cell In rng
    WScript.Echo "Cell " &amp; cell.Address &amp; " = " &amp; cell.Value
Next

' Clean up
Set rng = Nothing
Set worksheet = Nothing
Set workbook = Nothing
Set excel = Nothing

The script creates a 2x2 array of values and assigns it to range A1:B2. It then
iterates through each cell in the range and displays its address and value. The
Array function creates a two-dimensional array for the range assignment.

## Formatting Cells

This example demonstrates cell formatting using the Range object. It shows how to
change font properties, cell colors, and number formatting. Formatting enhances
data presentation in automated Excel reports.

cell_formatting.vbs
  

Set excel = CreateObject("Excel.Application")
excel.Visible = True
Set workbook = excel.Workbooks.Add()
Set worksheet = workbook.Worksheets(1)

' Set cell value and apply formatting
Set rng = worksheet.Range("A1")
rng.Value = 1234.56
rng.Font.Bold = True
rng.Font.Color = RGB(255, 0, 0) ' Red
rng.NumberFormat = "$#,##0.00"

' Format a range of cells
Set rng2 = worksheet.Range("B1:D3")
rng2.Interior.Color = RGB(200, 200, 255) ' Light blue
rng2.Font.Name = "Arial"
rng2.Font.Size = 12

' Clean up
Set rng2 = Nothing
Set rng = Nothing
Set worksheet = Nothing
Set workbook = Nothing
Set excel = Nothing

The script formats cell A1 with bold red font and currency formatting. It then
formats range B1:D3 with light blue background, Arial font, and 12pt size. The
RGB function specifies colors using red, green, and blue components.

## Using Cells Property

This example shows how to use the Cells property to access ranges
by row and column numbers. The Cells property provides an alternative to A1
notation. It's useful for programmatic cell access in loops.

cells_property.vbs
  

Set excel = CreateObject("Excel.Application")
excel.Visible = True
Set workbook = excel.Workbooks.Add()
Set worksheet = workbook.Worksheets(1)

' Fill 5x5 grid using Cells property
For row = 1 To 5
    For col = 1 To 5
        Set cell = worksheet.Cells(row, col)
        cell.Value = row * col
    Next
Next

' Access a range using Cells
Set rng = worksheet.Range(worksheet.Cells(1,1), worksheet.Cells(5,5))
rng.Font.Bold = True

' Clean up
Set rng = Nothing
Set worksheet = Nothing
Set workbook = Nothing
Set excel = Nothing

The script fills a 5x5 grid with multiplication table values using nested loops.
It then accesses the entire range using the Cells property and makes all text
bold. The Cells property takes row and column numbers as parameters.

## Working with Formulas

This example demonstrates how to work with Excel formulas using the Range object.
It shows setting formulas, reading calculated values, and using relative
references. Formulas are powerful tools for automated calculations.

formulas.vbs
  

Set excel = CreateObject("Excel.Application")
excel.Visible = True
Set workbook = excel.Workbooks.Add()
Set worksheet = workbook.Worksheets(1)

' Set values and formulas
worksheet.Range("A1").Value = 10
worksheet.Range("A2").Value = 20
worksheet.Range("A3").Formula = "=A1+A2"
worksheet.Range("A4").Formula = "=SUM(A1:A3)"

' Display formula and value
Set rng = worksheet.Range("A3")
WScript.Echo "Formula: " &amp; rng.Formula &amp; ", Value: " &amp; rng.Value

' Clean up
Set rng = Nothing
Set worksheet = Nothing
Set workbook = Nothing
Set excel = Nothing

The script sets values in A1 and A2, then adds formulas in A3 and A4. The A3
formula adds A1 and A2, while A4 sums the range A1:A3. It then displays A3's
formula and calculated value. Excel automatically calculates formula results.

## Source

[Excel Range Object Documentation](https://learn.microsoft.com/en-us/office/vba/api/excel.range(object))

In this article, we have explored the Excel.Range object in VBScript, covering
its usage and practical applications. From basic cell access to advanced
formatting and formulas, these examples demonstrate Excel automation
capabilities. With this knowledge, you can create powerful Excel automation
scripts using VBScript.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).