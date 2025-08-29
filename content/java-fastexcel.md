+++
title = "Java FastExcel"
date = 2025-08-29T19:58:37.518+01:00
draft = false
description = "Java FastExcel tutorial shows how to read and write Excel files in Java with the FastExcel library."
image = ""
imageBig = ""
categories = ["java"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Java FastExcel

last modified January 27, 2024

 

Java FastExcel tutorial shows how to read and write Excel files in Java with the
FastExcel library.

## Excel xlsx

In this article we work with xlsx files. The xlsx is a file extension for an
open XML spreadsheet file format used by Microsoft Excel. The xlsm files support
macros. The xltm  are macro-enabled template files. The xls format is a
proprietary binary format while xlsx is based on Office Open XML format.

## FastExcel library

FastExcel is a library for reading and writing Excel files in Java 
using the free xlsx format. It is an alternative to the Apache POI library. 

FastExcel supports a limited set of features - it focuses on speed and memory
reduction.

implementation 'org.dhatim:fastexcel:0.12.15'

This is the dependency for writing Excel files.

implementation 'org.dhatim:fastexcel-reader:0.12.15'

This is the dependency for reading Excel files.

## Java FastExcel simple write exampe

The following example creates a new Excel file.

com/zetcode/FastExcelSimpleWrite.java
  

package com.zetcode;

import org.dhatim.fastexcel.Workbook;
import org.dhatim.fastexcel.Worksheet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;

public class FastExcelSimpleWrite {

    public static void main(String[] args) throws IOException {

        var words = List.of("sky", "blue", "work", "falcon");

        int row = 0;
        int col = 0;

        var f = new File("/home/janbodnar/tmp/words.xlsx");

        try (var fos = new FileOutputStream(f)) {

            var wb = new Workbook(fos, "Application", "1.0");
            Worksheet ws = wb.newWorksheet("Sheet 1");

            for (var word : words) {

                ws.value(row, col, word);
                row++;
            }

            wb.finish();
        }
    }
}

We have a list of words. We write the words into the first column of the sheet.

var wb = new Workbook(fos, "Application", "1.0");

A new workbook is created.

Worksheet ws = wb.newWorksheet("Sheet 1");

A new worksheet is created with newWorksheet.

for (var word : words) {

    ws.value(row, col, word);
    row++;
}

We iterate over the list of words and write the words to the first column of 
the sheet. The words are inserted into cells with value.

wb.finish();

The finish method cmpletes the workbook generation; it saves the 
worksheets.

## Java FastExcel read

The following example reads data from the Excel file.

com/zetcode/FastExcelRead.java
  

package com.zetcode;

import org.dhatim.fastexcel.reader.ReadableWorkbook;
import org.dhatim.fastexcel.reader.Row;
import org.dhatim.fastexcel.reader.Sheet;

import java.io.File;
import java.io.IOException;
import java.util.stream.Stream;

public class FastExcelRead {

    public static void main(String[] args) throws IOException {

        var f = new File("/home/janbodnar/tmp/words.xlsx");

        try (var wb = new ReadableWorkbook(f)) {

            Sheet sheet = wb.getFirstSheet();

            try (Stream&lt;Row&gt; rows = sheet.openStream()) {

                var it = rows.iterator();

                int i = 0;
                while (it.hasNext()) {

                    var row = it.next();
                    row.stream().forEach(cell -&gt; System.out.println(cell.getText()));

                    i++;
                }
            }
        }
    }
}

The example reads data from the words.xlsx file.

try (var wb = new ReadableWorkbook(f)) {

We read the file with ReadableWorkbook.

Sheet sheet = wb.getFirstSheet();

We get the handle of the first sheet with getFirstSheet.

try (Stream&lt;Row&gt; rows = sheet.openStream()) {

    var it = rows.iterator();

    int i = 0;
    while (it.hasNext()) {

        var row = it.next();
        row.stream().forEach(cell -&gt; System.out.println(cell.getText()));

        i++;
    }
}

We retrieve the data using streams.

## Java FastExcel style

A style can be created via the style method. 

com/zetcode/FastExcelStyle.java
  

package com.zetcode;

import org.dhatim.fastexcel.Workbook;
import org.dhatim.fastexcel.Worksheet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FastExcelStyle {

    public static void main(String[] args) throws IOException {

        var f = new File("/home/janbodnar/tmp/styled.xlsx");

        try (var fos = new FileOutputStream(f)) {

            var wb = new Workbook(fos, "Application", "1.0");
            Worksheet ws = wb.newWorksheet("Sheet 1");

            ws.value(1, 1, "old falcon");
            ws.style(1, 1).horizontalAlignment("center").bold().italic().set();

            wb.finish();
        }
    }
}

In the example, we apply style to a single cell.

ws.value(1, 1, "old falcon");

We write text into the B2 cell (second row, second column).

ws.style(1, 1).horizontalAlignment("center").bold().italic().set();

The style is created with the style method. We make text is
horizontally centered with horizontalAlignment. We make it bold
with bold and italic with italic. The style is finally
applied with set.

## Java FastExcel merge cells

To merge cells, we use the merge method. 

com/zetcode/FastExcelMerge.java
  

package com.zetcode;

import org.dhatim.fastexcel.Workbook;
import org.dhatim.fastexcel.Worksheet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FastExcelMerge {

    public static void main(String[] args) throws IOException {

        var f = new File("/home/janbodnar/tmp/merged.xlsx");

        try (var fos = new FileOutputStream(f)) {

            var wb = new Workbook(fos, "Application", "1.0");
            Worksheet ws = wb.newWorksheet("Sheet 1");

            ws.range(1, 1, 4, 4).merge();

            ws.value(1, 1, "old falcon");
            ws.style(1, 1).horizontalAlignment("center").verticalAlignment("center")
                    .bold().italic().set();

            wb.finish();
        }
    }
}

We merge four cells into one. 

ws.range(1, 1, 4, 4).merge();

We create a range of four cells and merge them with merge.

ws.value(1, 1, "old falcon");
ws.style(1, 1).horizontalAlignment("center").verticalAlignment("center")
        .bold().italic().set();

We write a styled text into the merged cell.

## Java FastExcel formula

With the formula method, we can insert a formula into the cell. 

com/zetcode/FastExcelFormula.java
  

package com.zetcode;

import org.dhatim.fastexcel.Workbook;
import org.dhatim.fastexcel.Worksheet;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class FastExcelFormula {

    public static void main(String[] args) throws IOException {

        var f = new File("/home/janbodnar/tmp/formula.xlsx");

        try (var fos = new FileOutputStream(f)) {

            var wb = new Workbook(fos, "Application", "1.0");
            Worksheet ws = wb.newWorksheet("Sheet 1");

            ws.value(0, 0, 1);
            ws.value(1, 0, 2);
            ws.value(2, 0, 3);
            ws.value(3, 0, 4);
            ws.value(4, 0, 5);
            ws.value(5, 0, 6);
            ws.value(6, 0, 7);

            ws.formula(7, 0, "SUM(A1:A6)");

            ws.width(0, 8);
            ws.style(7, 0).bold().set();

            wb.finish();
        }
    }
}

In the example, we insert the SUM formula in the cell below the values. 

## Source

[FastExcel Github page](https://github.com/dhatim/fastexcel)

In this article we have read and written Excel files in Java with the
FastExcel library.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Java tutorials](/java/).