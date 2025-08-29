+++
title = "VBScript Word.Application Object"
date = 2025-08-29T20:15:22.144+01:00
draft = false
description = "Learn about VBScript Word.Application object, including document creation, formatting, and automation. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Word.Application Object

last modified April 9, 2025

The Word.Application object in VBScript provides automation 
capabilities for Microsoft Word. It allows scripts to create, modify, and 
control Word documents programmatically. This object is part of Word's COM 
automation interface. It enables full control over Word's functionality.

With Word.Application, you can generate reports, format text, 
and manipulate documents. This tutorial covers the object with practical 
examples. You'll learn to automate common Word tasks through VBScript.

## Word.Application Object Overview

The Word.Application object represents the Word application 
itself. It provides access to documents, templates, and Word's features. 
The object model includes Documents, Selection, and Range objects. These 
allow precise document manipulation.

Key properties include Visible to control the UI display and Documents 
to access open files. Methods like Quit close Word programmatically. 
Understanding this object enables powerful document automation.

## Creating a New Word Document

This example demonstrates creating a new Word document using VBScript. 
It shows basic Word.Application object initialization. The script creates 
a visible Word instance and adds a blank document. This is the foundation 
for Word automation.

create_document.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True ' Make Word visible
Set newDoc = wordApp.Documents.Add()

' Add some text to the document
wordApp.Selection.TypeText "Hello, Word Automation!"
wordApp.Selection.TypeParagraph

' Save and close
newDoc.SaveAs "C:\Temp\NewDocument.docx"
newDoc.Close
wordApp.Quit

Set newDoc = Nothing
Set wordApp = Nothing

The script creates a Word application object and makes it visible. 
It adds a new document and inserts text. The document is saved and 
closed properly. Always release objects to free resources.

## Opening and Modifying an Existing Document

This example shows how to open an existing Word document and modify it. 
The script demonstrates file opening and text manipulation. It finds and 
replaces text in the document. This is useful for template processing.

modify_document.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True

' Open existing document
Set doc = wordApp.Documents.Open("C:\Temp\ReportTemplate.docx")

' Replace placeholder text
With doc.Content.Find
    .Text = "[COMPANY_NAME]"
    .Replacement.Text = "ACME Corporation"
    .Execute Replace:=2 ' wdReplaceAll
End With

' Save changes
doc.SaveAs "C:\Temp\FinalReport.docx"
doc.Close
wordApp.Quit

Set doc = Nothing
Set wordApp = Nothing

The script opens a template document and replaces placeholder text. 
The Find object provides powerful search capabilities. Changes are 
saved to a new file. The original template remains unchanged.

## Formatting Document Text

This example demonstrates text formatting in a Word document. It shows 
font property manipulation and paragraph formatting. The script creates 
a document with styled text. Formatting includes font, size, and color.

format_text.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add()

' Format heading
With wordApp.Selection
    .Font.Name = "Arial"
    .Font.Size = 16
    .Font.Bold = True
    .Font.Color = RGB(0, 0, 255) ' Blue
    .TypeText "Document Title"
    .TypeParagraph
End With

' Format body text
With wordApp.Selection
    .Font.Name = "Calibri"
    .Font.Size = 11
    .TypeText "This is formatted body text."
    .TypeParagraph
End With

doc.SaveAs "C:\Temp\FormattedDocument.docx"
doc.Close
wordApp.Quit

Set doc = Nothing
Set wordApp = Nothing

The script creates a document with styled heading and body text. 
Font properties are set using the Font object. RGB values specify 
text color. Each formatting block applies to subsequent text.

## Creating a Table in Word

This example demonstrates table creation in a Word document. It shows 
how to add a table and populate it with data. The script creates a 
3x3 table with formatted cells. Tables are useful for data presentation.

create_table.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add()

' Add a table (3 rows, 3 columns)
Set myTable = doc.Tables.Add(wordApp.Selection.Range, 3, 3)

' Populate and format table
With myTable
    ' Header row
    .Cell(1, 1).Range.Text = "Product"
    .Cell(1, 2).Range.Text = "Price"
    .Cell(1, 3).Range.Text = "Stock"
    
    ' Data rows
    .Cell(2, 1).Range.Text = "Laptop"
    .Cell(2, 2).Range.Text = "$999"
    .Cell(2, 3).Range.Text = "15"
    
    .Cell(3, 1).Range.Text = "Mouse"
    .Cell(3, 2).Range.Text = "$25"
    .Cell(3, 3).Range.Text = "42"
    
    ' Apply formatting
    .Range.Font.Name = "Calibri"
    .Range.Font.Size = 11
    .Rows(1).Range.Font.Bold = True
End With

doc.SaveAs "C:\Temp\TableDocument.docx"
doc.Close
wordApp.Quit

Set myTable = Nothing
Set doc = Nothing
Set wordApp = Nothing

The script creates a table and populates it with product data. 
Cell references use row and column indices. Formatting is applied 
to both the table and specific rows. Tables provide structured 
data presentation in documents.

## Generating a Multi-page Report

This example creates a complete multi-page report with various 
elements. It combines text, formatting, tables, and page breaks. 
The script demonstrates comprehensive document automation. Reports 
can be generated automatically with this approach.

generate_report.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add()

' Add title
With wordApp.Selection
    .Font.Name = "Arial"
    .Font.Size = 18
    .Font.Bold = True
    .ParagraphFormat.Alignment = 1 ' wdAlignParagraphCenter
    .TypeText "Quarterly Sales Report"
    .TypeParagraph
    .Font.Size = 12
    .Font.Bold = False
    .TypeText "Q1 2025"
    .TypeParagraph
    .TypeParagraph
End With

' Add summary section
With wordApp.Selection
    .Font.Name = "Calibri"
    .Font.Size = 12
    .Font.Bold = True
    .TypeText "Executive Summary:"
    .TypeParagraph
    .Font.Bold = False
    .TypeText "Sales increased by 15% compared to last quarter."
    .TypeParagraph
    .TypeParagraph
End With

' Add sales table
Set salesTable = doc.Tables.Add(wordApp.Selection.Range, 5, 3)
With salesTable
    .Cell(1, 1).Range.Text = "Product"
    .Cell(1, 2).Range.Text = "Q4 2024"
    .Cell(1, 3).Range.Text = "Q1 2025"
    
    ' Fill table data
    .Cell(2, 1).Range.Text = "Product A"
    .Cell(2, 2).Range.Text = "$45,000"
    .Cell(2, 3).Range.Text = "$52,000"
    
    .Cell(3, 1).Range.Text = "Product B"
    .Cell(3, 2).Range.Text = "$32,000"
    .Cell(3, 3).Range.Text = "$38,500"
    
    .Cell(4, 1).Range.Text = "Product C"
    .Cell(4, 2).Range.Text = "$28,000"
    .Cell(4, 3).Range.Text = "$29,750"
    
    .Cell(5, 1).Range.Text = "Total"
    .Cell(5, 2).Range.Text = "$105,000"
    .Cell(5, 3).Range.Text = "$120,250"
    
    ' Format table
    .Range.Font.Name = "Calibri"
    .Range.Font.Size = 11
    .Rows(1).Range.Font.Bold = True
    .Rows(5).Range.Font.Bold = True
End With

' Add page break and appendix
wordApp.Selection.InsertBreak 7 ' wdPageBreak

With wordApp.Selection
    .Font.Name = "Calibri"
    .Font.Size = 14
    .Font.Bold = True
    .TypeText "Appendix: Detailed Metrics"
    .TypeParagraph
    .Font.Size = 11
    .Font.Bold = False
    .TypeText "Additional data available upon request."
    .TypeParagraph
End With

' Save final report
doc.SaveAs "C:\Temp\QuarterlyReport.docx"
doc.Close
wordApp.Quit

Set salesTable = Nothing
Set doc = Nothing
Set wordApp = Nothing

The script generates a complete sales report with multiple sections. 
It includes formatted text, a data table, and page breaks. The report 
demonstrates professional document automation. All elements are created 
programmatically without user interaction.

## Source

[Word.Application Object Documentation](https://learn.microsoft.com/en-us/office/vba/api/word.application)

In this article, we have explored the Word.Application object in 
VBScript. From basic document creation to complex report generation, these 
examples demonstrate powerful Word automation. With this knowledge, you can 
automate document processing tasks efficiently. VBScript and Word automation 
provide robust solutions for business needs.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).