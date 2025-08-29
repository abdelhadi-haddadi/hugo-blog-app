+++
title = "VBScript Word.Selection Object"
date = 2025-08-29T20:15:23.266+01:00
draft = false
description = "Learn about VBScript Word.Selection object, including text manipulation, formatting, and more. Understand how to use it effectively with practical examples."
image = ""
imageBig = ""
categories = ["vbscript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# VBScript Word.Selection Object

last modified April 9, 2025

The Word.Selection object in VBScript represents the current 
selection in a Microsoft Word document. It provides access to the text, 
formatting, and properties of the selected content. The object is part of 
Word's automation model and is essential for document manipulation.

Selection allows dynamic interaction with document content. It 
supports text insertion, deletion, formatting, and navigation operations. 
This tutorial covers Selection with practical examples to 
demonstrate its capabilities in Word automation.

## Word.Selection Object Overview

The Selection object represents the current cursor position or 
highlighted text in Word. It provides properties and methods to manipulate 
document content programmatically. The object is accessed through the 
Word Application object model.

Key features include text manipulation, formatting control, and document 
navigation. Selection changes dynamically as the cursor moves. 
Understanding this object is crucial for advanced Word automation tasks. 
It works with both visible and hidden Word instances.

## Inserting Text at Selection

This example demonstrates basic text insertion at the current selection 
point. It shows how to create a Word instance, access the selection, and 
insert text. The script ensures proper object cleanup after execution.

insert_text.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
wordApp.Documents.Add

wordApp.Selection.TypeText "Hello, Word Automation!"
wordApp.Selection.TypeParagraph

Set wordApp = Nothing

The script starts Word and creates a new document. TypeText 
inserts text at the selection point. TypeParagraph adds a 
new line. The Word instance is made visible for demonstration purposes. 
Always release objects when done.

## Formatting Selected Text

This example shows how to apply formatting to selected text. It demonstrates 
font property modification including bold, italic, and color changes. The 
script selects text before applying formatting for clarity.

format_text.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add

doc.Content.Text = "Sample text for formatting"
wordApp.Selection.WholeStory
wordApp.Selection.Font.Bold = True
wordApp.Selection.Font.Italic = True
wordApp.Selection.Font.Color = RGB(255, 0, 0)

Set doc = Nothing
Set wordApp = Nothing

The script creates a document with sample text. WholeStory 
selects all content. Font properties are then modified through the 
Selection object. RGB values specify the text color. Multiple formatting 
properties can be combined.

## Navigating with Selection

This example demonstrates document navigation using Selection methods. 
It shows moving the cursor, selecting text ranges, and manipulating 
content. The script creates a multi-paragraph document for demonstration.

navigate_document.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add

doc.Content.Text = "First paragraph" &amp; vbCr &amp; "Second paragraph"
wordApp.Selection.HomeKey 6 ' Move to start of document
wordApp.Selection.MoveDown 1, 1 ' Move down one paragraph
wordApp.Selection.TypeText "Modified "

Set doc = Nothing
Set wordApp = Nothing

The script creates a two-paragraph document. HomeKey moves 
to the document start. MoveDown navigates between paragraphs. 
Text is inserted at the new selection point. Navigation units can be 
characters, words, or paragraphs.

## Copying and Pasting with Selection

This example demonstrates clipboard operations using the Selection object. 
It shows how to copy selected content and paste it elsewhere in the 
document. The script creates sample content to manipulate.

copy_paste.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add

doc.Content.Text = "Original text to copy"
wordApp.Selection.WholeStory
wordApp.Selection.Copy
wordApp.Selection.EndKey 6 ' Move to end
wordApp.Selection.Paste

Set doc = Nothing
Set wordApp = Nothing

The script creates content and selects it entirely. Copy 
places the content in the clipboard. EndKey moves to the 
document end. Paste inserts the copied content. Clipboard 
operations work across Word instances.

## Finding and Replacing Text

This example shows how to use Selection for search and replace operations. 
It demonstrates finding specific text and replacing it with new content. 
The script includes case sensitivity and whole word options.

find_replace.vbs
  

Set wordApp = CreateObject("Word.Application")
wordApp.Visible = True
Set doc = wordApp.Documents.Add

doc.Content.Text = "Replace old text with new text"
wordApp.Selection.Find.Execute "old text", False, False, False, False, , _
    True, 1, False, "new text", 2

Set doc = Nothing
Set wordApp = Nothing

The script creates a document with sample text. Find.Execute 
searches for "old text" and replaces it. Parameters control search options 
like case sensitivity. The replacement text is specified as an argument. 
Wildcards can be used in search patterns.

## Source

[Word Selection Object Documentation](https://learn.microsoft.com/en-us/office/vba/api/word.selection)

In this article, we have explored the Word.Selection object in 
VBScript, covering its usage and practical applications. From basic text 
insertion to advanced formatting and navigation, these examples demonstrate 
powerful document automation. With this knowledge, you can create robust 
Word automation scripts.

## Author

My name is Jan Bodnar and I am a passionate programmer with many years of
programming experience. I have been writing programming articles since 2007. So
far, I have written over 1400 articles and 8 e-books. I have over eight years of
experience in teaching programming.

List [all VBScript tutorials](/vbscript/).