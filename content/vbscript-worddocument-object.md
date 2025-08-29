+++
title = "VBScript Word.Document Object"
date = 2025-08-29T20:15:22.113+01:00
draft = false
description = "Learn about VBScript Word.Document object, including document creation, text manipulation, formatting, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Word.Document Object

last modified April 9, 2025

The Word.Document object in VBScript represents a Microsoft Word
document. It provides access to document content, formatting, and properties.
This object is part of Word's automation model, allowing programmatic control.
Through it, you can create, modify, and save Word documents from scripts.

Word.Document enables text insertion, formatting, and document
manipulation. It works with paragraphs, tables, styles, and other Word features.
This tutorial covers Word.Document with practical examples to
demonstrate its capabilities in automation scenarios.

## Word.Document Object Overview

The Word.Document object is the central interface for working with
Word documents programmatically. It's accessed through the Word Application
object. The object provides methods and properties for document manipulation.

Key features include content editing, formatting control, and document
management. It supports text insertion, paragraph manipulation, and style
application. Understanding this object enables powerful Word automation through
VBScript.

## Creating a New Word Document

This example demonstrates creating a new Word document using VBScript. It shows
basic Word automation setup and document creation. The script creates Word
application and document objects.

create_document.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True ' Make Word visible

Set doc = wordApp.Documents.Add() ' Create new document
doc.Content.Text = "This is a new Word document created with VBScript"

' Save and close (optional)
' doc.SaveAs "C:\temp\newdoc.docx"
' doc.Close
' wordApp.Quit

Set doc = Nothing
Set wordApp = Nothing

The script creates a Word application instance and makes it visible. A new
document is added to the Documents collection. Text is inserted into the
document's content. Commented lines show optional save and close operations.

## Adding Formatted Text to Document

This example shows how to add formatted text to a Word document. It demonstrates
font property manipulation and paragraph formatting. The script creates styled
content with different formatting options.

formatted_text.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add()

' Add heading
Set heading = doc.Paragraphs.Add.Range
heading.Text = "Document Title" &amp; vbCrLf
heading.Font.Name = "Arial"
heading.Font.Size = 16
heading.Font.Bold = True
heading.ParagraphFormat.Alignment = 1 ' wdAlignParagraphCenter

' Add body text
Set body = doc.Paragraphs.Add.Range
body.Text = "This is the document body with normal formatting." &amp; vbCrLf
body.Font.Name = "Calibri"
body.Font.Size = 11

Set body = Nothing
Set heading = Nothing
Set doc = Nothing
Set wordApp = Nothing

The script creates a document with a centered, bold title and normal body text.
Different fonts and sizes are applied to each section. Paragraph formatting
controls text alignment. The example shows basic text styling capabilities.

## Working with Document Paragraphs

This example demonstrates working with document paragraphs programmatically. It
shows how to access, modify, and format paragraphs. The script creates multiple
paragraphs with different properties.

document_paragraphs.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add()

' Add three paragraphs with different formatting
For i = 1 To 3
    Set para = doc.Paragraphs.Add.Range
    para.Text = "This is paragraph " &amp; i &amp; vbCrLf
    
    Select Case i
        Case 1
            para.Font.Bold = True
        Case 2
            para.Font.Italic = True
        Case 3
            para.ParagraphFormat.Alignment = 1 ' Center
    End Select
Next

' Access existing paragraphs
Set firstPara = doc.Paragraphs(1).Range
firstPara.Text = "Modified first paragraph text" &amp; vbCrLf

Set firstPara = Nothing
Set para = Nothing
Set doc = Nothing
Set wordApp = Nothing

The script creates three paragraphs with distinct formatting styles. It then
modifies the first paragraph's text. This demonstrates both paragraph creation
and access. The example shows basic paragraph manipulation techniques.

## Inserting Tables into Document

This example shows how to insert and format tables in a Word document. It
demonstrates table creation, cell access, and formatting. The script creates a
simple table with data.

document_tables.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add()

' Add a 3x3 table
Set tableRange = doc.Content
tableRange.Collapse 0 ' wdCollapseEnd
Set myTable = doc.Tables.Add(tableRange, 3, 3)

' Fill table cells
For row = 1 To 3
    For col = 1 To 3
        myTable.Cell(row, col).Range.Text = "Row " &amp; row &amp; ", Col " &amp; col
    Next
Next

' Format table
myTable.Borders.Enable = True
myTable.Rows(1).Range.Font.Bold = True ' Header row

Set myTable = Nothing
Set tableRange = Nothing
Set doc = Nothing
Set wordApp = Nothing

The script creates a 3x3 table and populates it with data. Table borders are
enabled and the first row is bolded. This demonstrates basic table creation and
formatting. The example shows how to work with table cells programmatically.

## Saving and Closing Documents

This example demonstrates document saving and closing operations. It shows how to
save documents in different formats. The script includes error handling for file
operations.

save_document.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add()

doc.Content.Text = "This document will be saved and closed."

On Error Resume Next ' Error handling for file operations

' Save in different formats
doc.SaveAs "C:\temp\mydoc.docx" ' Word format
' doc.SaveAs "C:\temp\mydoc.pdf", 17 ' PDF format
' doc.SaveAs "C:\temp\mydoc.rtf", 6 ' RTF format

If Err.Number &lt;&gt; 0 Then
    WScript.Echo "Error saving document: " &amp; Err.Description
End If

On Error GoTo 0 ' Reset error handling

doc.Close
wordApp.Quit

Set doc = Nothing
Set wordApp = Nothing

The script creates a document and demonstrates saving in different formats.
Error handling prevents script failures during file operations. The document is
properly closed and resources are released. This shows proper document
management practices.

## Source

[Word.Document Object Documentation](https://learn.microsoft.com/en-us/office/vba/api/word.document)

In this article, we have explored the Word.Document object in
VBScript, covering its usage and practical applications. From document creation
to formatting and saving, these examples demonstrate Word automation
capabilities. With this knowledge, you can automate Word document processing in
your scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).