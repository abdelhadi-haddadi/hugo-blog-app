+++
title = "VBScript Excel.Workbook Object"
date = 2025-08-29T20:15:19.874+01:00
draft = false
description = "Learn about VBScript Excel.Workbook object, including workbook operations, Excel automation, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Excel.Workbook Object

last modified April 9, 2025

The Excel.Workbook object in VBScript represents an Excel workbook
file. It is part of the Excel Object Model used for automation. This object
provides methods and properties to manipulate Excel workbooks programmatically.
Through VBScript, you can create, open, modify, and save Excel files.

Workbook objects are accessed through the Excel Application object.
They contain Worksheets collection and various workbook-specific properties.
This tutorial covers Workbook object with practical examples to
demonstrate its usage in automation scenarios.

## Excel.Workbook Object Overview

The Workbook object is the central object for working with Excel
files in VBScript. It represents a single .xls or .xlsx file. The object
provides access to all worksheets, charts, and workbook-level settings.

Key properties include Name, Path, and
Worksheets. Important methods include Save,
Close, and SaveAs. Understanding this object is
essential for Excel automation with VBScript.

## Opening an Existing Workbook

This example demonstrates how to open an existing Excel workbook using VBScript.
The script creates an Excel application instance and opens a specified file. It
then displays basic information about the workbook.

open_workbook.vbs
  

Set excelApp = CreateObject("Excel.Application")
Set workbook = excelApp.Workbooks.Open("C:\Reports\Sales.xlsx")

WScript.Echo "Workbook Name: " &amp; workbook.Name
WScript.Echo "Path: " &amp; workbook.Path

workbook.Close
excelApp.Quit

Set workbook = Nothing
Set excelApp = Nothing

The script creates an Excel application object and opens "Sales.xlsx". It
displays the workbook name and path before closing it. Always release objects
with Set obj = Nothing to prevent memory leaks.

## Creating a New Workbook

This example shows how to create a brand new Excel workbook using VBScript. The
Add method of the Workbooks collection creates a new workbook. The
default workbook contains three worksheets.

create_workbook.vbs
  

Set excelApp = CreateObject("Excel.Application")
excelApp.Visible = True ' Make Excel visible

Set workbook = excelApp.Workbooks.Add

WScript.Echo "New workbook created with " &amp; workbook.Worksheets.Count &amp; " sheets"
workbook.SaveAs "C:\Reports\NewReport.xlsx"

Set workbook = Nothing
Set excelApp = Nothing

The script creates a visible Excel instance and adds a new workbook. It displays
the sheet count and saves the file. The Visible property makes
Excel visible during development but should be False in production.

## Saving and Closing a Workbook

This example demonstrates proper workbook saving and closing procedures. It shows
both Save for existing files and SaveAs for new
files. Always close workbooks properly to avoid file locks.

save_workbook.vbs
  

Set excelApp = CreateObject("Excel.Application")
Set workbook = excelApp.Workbooks.Add

' Add data to worksheet
workbook.Worksheets(1).Cells(1, 1).Value = "Sample Data"

' Save options
workbook.SaveAs "C:\Reports\Sample.xlsx" ' Save new file
' workbook.Save ' Use for existing files

workbook.Close False ' Close without saving changes
excelApp.Quit

Set workbook = Nothing
Set excelApp = Nothing

The script creates a workbook, adds data, and saves it. The Close
method's parameter determines whether to save changes. Use Quit to
close the Excel application completely.

## Working with Worksheets in a Workbook

This example shows how to access and manipulate worksheets within a workbook. The
Worksheets collection contains all sheets in the workbook. You can
add, delete, and modify worksheets programmatically.

workbook_worksheets.vbs
  

Set excelApp = CreateObject("Excel.Application")
Set workbook = excelApp.Workbooks.Add

' Add a new worksheet
Set newSheet = workbook.Worksheets.Add
newSheet.Name = "Data Sheet"

' Access existing sheet
Set sheet1 = workbook.Worksheets(1)
sheet1.Cells(1, 1).Value = "Header"

WScript.Echo "Sheet count: " &amp; workbook.Worksheets.Count

workbook.Close False
excelApp.Quit

Set sheet1 = Nothing
Set newSheet = Nothing
Set workbook = Nothing
Set excelApp = Nothing

The script adds a new worksheet and renames it. It then accesses the first sheet
to add data. The Worksheets collection is 1-indexed in VBScript.
Always clean up all objects when done.

## Protecting and Unprotecting a Workbook

This example demonstrates workbook protection features. You can protect the
workbook structure to prevent sheet modifications. Protection can be applied
with or without a password.

protect_workbook.vbs
  

Set excelApp = CreateObject("Excel.Application")
Set workbook = excelApp.Workbooks.Add

' Protect workbook structure
workbook.Protect "mypassword", True, False

WScript.Echo "Workbook protected: " &amp; workbook.ProtectStructure

' Unprotect workbook
workbook.Unprotect "mypassword"

workbook.Close False
excelApp.Quit

Set workbook = Nothing
Set excelApp = Nothing

The script protects the workbook with a password and verifies protection status.
It then unprotects the workbook. Workbook protection is different from worksheet
protection which protects cell contents.

## Source

[Excel Workbook Object Documentation](https://learn.microsoft.com/en-us/office/vba/api/excel.workbook)

In this article, we have explored the Excel.Workbook object in
VBScript, covering its usage and practical applications. From basic operations
to workbook protection, these examples demonstrate Excel automation. With this
knowledge, you can automate Excel tasks efficiently using VBScript.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).