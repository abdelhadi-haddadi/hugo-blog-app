+++
title = "Python xlsxwriter"
date = 2025-08-29T20:11:12.745+01:00
draft = false
description = "Python xlsxwriter tutorial shows how to write Excel xlsx files in Python with xlsxwriter. The xlsxwriter is a Python library to write files in the Excel 2007+ XLSX file format."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python xlsxwriter

last modified January 29, 2024

Python xlsxwriter tutorial shows how to write Excel xlsx files in Python with
xlsxwriter. 

## xlsxwriter

The xlsxwriter is a Python library to write files in the Excel 2007+
XLSX file format.

## Excel xlsx

In this article we work with xlsx files. The xlsx is a file extension for an
open XML spreadsheet file format used by Microsoft Excel. The xlsm files support
macros. The xls format is a proprietary binary format while xlsx is based on
Office Open XML format.

$ pip install xlsxwriter

We install xlsxwriter with the pip tool.

## Python xlsxwriter first example

The following program creates a simple Excel file.

first.py
  

#!/usr/bin/python

import xlsxwriter

wb = xlsxwriter.Workbook('first.xlsx')
ws = wb.add_worksheet()

ws.write('A1', 'misty mountains')
ws.write(2, 0, 123)

wb.close()

In the example, we write data into two cells.

import xlsxwriter

We import the module. 

wb = xlsxwriter.Workbook('first.xlsx')

A new workbook is created. A workbook is the container for all other parts of
the document. The parameter is the name of the Excel file.

ws = wb.add_worksheet()

We add a new worksheet with add_worksheet.

ws.write('A1', 'misty mountains')
ws.write(2, 0, 123)

We write to two cells. There are two basic ways of identifying cells. The 
Excel key A1 denotes the top-left cell of the sheet. In the second case, 
the first two parameters are the row and column of the cell. The indexing start
from zero.

wb.close()

In the end, we close the file.

## Python write_xlsx write data

There are various methods to write data to the sheet.

writing.py
  

#!/usr/bin/python

from datetime import datetime
import xlsxwriter
import datetime

wb = xlsxwriter.Workbook('writing.xlsx')
ws = wb.add_worksheet()

ws.set_column('A:A', 25)

ws.write_string('A1', 'misty mountains')
ws.write_number(1, 0, 123)
ws.write_url('A3', 'http://webcode.me')

df = wb.add_format({'num_format': 'dd/mm/yy'})
ws.write_datetime('A4', datetime.datetime.now(), df)

ital = wb.add_format({'italic': True})
bold = wb.add_format({'bold': True})
cent = wb.add_format({'align': 'center'})

ws.write_rich_string('A5', bold, 'an old falcon ',
                     ital, 'wild river', cent)

ws.write_boolean('A6', True)

wb.close()

In the example, we write a number, a string, an URL, a datetime, a rich string, 
and a boolean.

ws.set_column('A:A', 25)

We enlarge the first column with set_column. The width is set in 
character units.

ws.write_string('A1', 'misty mountains')
ws.write_number(1, 0, 123)

A string is written with write_string; a number is written with 
write_number.

ws.write_url('A3', 'http://webcode.me')

An URL is written with write_url.

df = wb.add_format({'num_format': 'dd/mm/yy'})
ws.write_datetime('A4', datetime.datetime.now(), df)

A datetime is written with write_datetime. We also specify the 
datetime format. 

ital = wb.add_format({'italic': True})
bold = wb.add_format({'bold': True})
cent = wb.add_format({'align': 'center'})

ws.write_rich_string('A5', bold, 'an old falcon ',
                        ital, 'wild river', cent)

With add_format, we create three format units. A rich string is 
written with write_rich_string. A format is applied to the adjacent 
text. The last format (cent in our case) is applied to the whole text.

ws.write_boolean('A6', True)

Finally, a boolean value is written with write_boolean.

## Python xlsxwriter write_row &amp; write_column

To write a column of data, we use the write_column method. To write
a row of data, we use the write_row method. 

rows_cols.py
  

#!/usr/bin/python

import xlsxwriter

wb = xlsxwriter.Workbook('rows_cols.xlsx')
ws = wb.add_worksheet()

vals = [12, 14, 25, 29, 19, 35]

ws.write_column('A1', vals)
ws.write_row(8, 0, vals)

wb.close()

We have a list of integers. We write those integers in a single column and a
single row.

It is common to store data in dictionaries.

dics.py
  

#!/usr/bin/python

import xlsxwriter

wb = xlsxwriter.Workbook('dics.xlsx')
ws = wb.add_worksheet()

sales = {'Product A': [104, 411, 122, 345], 'Product B': [
    807, 913, 932, 567], 'Product C': [89, 91, 82, 88]}

cn = 0
for k, v in sales.items():

    ws.write(0, cn, k)
    ws.write_column(1, cn, v)
    cn += 1

wb.close()

In the example, we write data stored in a dictionary.

sales = {'Product A': [104, 411, 122, 345], 'Product B': [
    807, 913, 932, 567], 'Product C': [89, 91, 82, 88]}

We have sales of three products in a Python dictionary.

cn = 0
for k, v in sales.items():

    ws.write(0, cn, k)
    ws.write_column(1, cn, v)
    cn += 1

We go over the dictionary and print each dictionary item in a single column, 
having a key as a header and value as column data. 

## Python xlsxwriter merge_range

The merge_range function merge a range of cells. Its parameters are
the row and column of the top-left and bottom-right cells, the data to write,
and the optional cell format.

merge.py
  

#!/usr/bin/python

import xlsxwriter

wb = xlsxwriter.Workbook('merging.xlsx')
ws = wb.add_worksheet()

mf = wb.add_format({'align': 'center', 'valign': 'vcenter'})
ws.merge_range(1, 1, 2, 2, 'an old falcon', mf)

ws.merge_range('E5:G6', 'misty mountains', mf)

wb.close()

In the example, we merge two groups of cells.

## Python xlsxwriter insert_image

An image is inserted into a sheet with insert_image method.

image.py
  

#!/usr/bin/python

import xlsxwriter

wb = xlsxwriter.Workbook('image.xlsx')
ws = wb.add_worksheet()

ws.write('A1', 'Sid, the sloth')

ws.insert_image('A3', 'sid.jpg')

wb.close()

The example inserts a JPEG image into a cell.

## Python xlsxwriter write_formula

A formula is written with write_formula. Note that the worksheet 
must be recalculated for it to work. 

formula.py
  

#!/usr/bin/python

import xlsxwriter

vals = [12, 32, 12, 4, 99, 78]

wb = xlsxwriter.Workbook('formula.xlsx')
ws = wb.add_worksheet()

for idx, e in enumerate(vals):
    ws.write_number(idx, 0, e)

ws.write_formula(7, 0, '=SUM(A1:A6)')

wb.close()

The example writes the SUM formula into a cell, which calculates 
the sum of values of the A column.

## Source

[Creating Excel files with Python and XlsxWriter](https://xlsxwriter.readthedocs.io/)

In this article we have worked with the xlsxwriter library. We have created 
some basic Excel files with xlsxwriter.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).