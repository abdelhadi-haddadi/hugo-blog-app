+++
title = "Dart PDF"
date = 2025-08-29T19:52:10.326+01:00
draft = false
description = "Dart PDF tutorial shows how to generate PDF files in Dart"
image = ""
imageBig = ""
categories = ["dart"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Dart PDF

last modified January 28, 2024

In this article we show how to create PDF documents in Dart language.

Portable Document Format (PDF) is a versatile file format created by
Adobe that gives people an easy, reliable way to present and exchange documents.

$ dart pub add pdf

To produce PDF files in Dart, we use the pdf package.

## Dart PDF simple example

The following is a simple Dart example which produces a PDF document.

main.dart
  

import 'dart:io';

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

void main() async {
  final pdf = pw.Document();

  pdf.addPage(pw.Page(
      pageFormat: PdfPageFormat.a4,
      build: (pw.Context context) {
        return pw.Center(
          child: pw.Text("An old falcon"),
        );
      }));

  final file = File('simple.pdf');
  await file.writeAsBytes(await pdf.save());
}

The program creates a new PDF file and writes it to the disk. It contains
centered text.

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

We import the required packages.

final pdf = pw.Document();

A new empty document is created.

pdf.addPage(pw.Page(
    pageFormat: PdfPageFormat.a4,
    build: (pw.Context context) {
      return pw.Center(
        child: pw.Text("An old falcon"),
      );
    }));

A page is added with addPage. We provide the page format and the
content. The content consists of a Text widged which is centered 
on the page with Center.

final file = File('simple.pdf');
await file.writeAsBytes(await pdf.save());

The document is written to a file.

## Dart PDF header

A document header is created with Header.

main.dart
  

import 'dart:io';

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

void main() async {
  final txt = '''
The Battle of Thermopylae was fought between an alliance of Greek city-states, 
led by King Leonidas of Sparta, and the Persian Empire of Xerxes I over the 
course of three days, during the second Persian invasion of Greece.
''';

  final pdf = pw.Document();

  pdf.addPage(pw.Page(
    pageFormat: PdfPageFormat.a4,
    build: (pw.Context context) {
      return pw.Column(children: [
        pw.Header(level: 0, text: 'The Battle of Thermopylae'),
        pw.Paragraph(text: txt)
      ]);
    },
  ));

  final file = File('header.pdf');
  await file.writeAsBytes(await pdf.save());
}

The document contains a header and a paragraph of text.

pdf.addPage(pw.Page(
  pageFormat: PdfPageFormat.a4,
  build: (pw.Context context) {
    return pw.Column(children: [
      pw.Header(level: 0, text: 'The Battle of Thermopylae'),
      pw.Paragraph(text: txt)
    ]);
  },
));

The header and the paragraph are added to a column widget. We specify the level
and text for the header and text for the paragraph.

## Dart PDF bullets

A bullet is created with the Bullet widget.

main.dart
  

import 'dart:io';

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

void main() async {
  final pdf = pw.Document();

  pdf.addPage(pw.Page(
      pageFormat: PdfPageFormat.a4,
      build: (pw.Context context) {
        return pw.Column(children: [
          pw.Header(level: 1, text: 'Programming languages'),
          pw.Bullet(text: 'Dart'),
          pw.Bullet(text: 'F#'),
          pw.Bullet(text: 'Clojure'),
          pw.Bullet(text: 'Go'),
          pw.Bullet(text: 'Groovy'),
          pw.Bullet(text: 'Raku'),
          pw.Bullet(text: 'Python'),
        ]);
      }));

  final file = File('bullets.pdf');
  await file.writeAsBytes(await pdf.save());
}

We have a header and a list of programming languages. Each language is displayed
as a bullet.

## Dart PDF rectangles

A rectangle is created with Rectangle.

main.dart
  

import 'dart:io';

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

void main() async {
  final pdf = pw.Document();

  pdf.addPage(pw.Page(
      pageFormat: PdfPageFormat.a4,
      build: (pw.Context context) {
        return pw.Row(children: [
          pw.SizedBox(
            width: 80,
            height: 80,
            child: pw.Rectangle(fillColor: PdfColors.grey),
          ),
          pw.Spacer(flex: 1),
          pw.SizedBox(
            width: 80,
            height: 80,
            child: pw.Rectangle(fillColor: PdfColors.amber300),
          ),
          pw.Spacer(flex: 1),
          pw.SizedBox(
            width: 80,
            height: 80,
            child: pw.Rectangle(fillColor: PdfColors.green500),
          ),
          pw.Spacer(flex: 1),
          pw.SizedBox(
            width: 80,
            height: 80,
            child: pw.Rectangle(fillColor: PdfColors.blue600),
          ),
        ]);
      })); // Pa

  final file = File('rectangles.pdf');
  await file.writeAsBytes(await pdf.save());
}

We create a row of SizedBox widgets. In the boxes, we place
recangle widgets.

pw.SizedBox(
  width: 80,
  height: 80,
  child: pw.Rectangle(fillColor: PdfColors.grey),
),

For each rectangle, we define a fill colour.

## Dart PDF footer

In the next example, we add a footer to our pages.

main.dart
  

import 'dart:io';

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

void main() async {
  final pdf = pw.Document(pageMode: PdfPageMode.outlines);

  final title = pw.LoremText();

  pdf.addPage(
    pw.MultiPage(
      footer: _buildFooter,
      build: (context) =&gt; [
        pw.Header(level: 1, text: title.sentence(1)),
        pw.SizedBox(height: 20),
        pw.Lorem(length: 50),
        pw.SizedBox(height: 20),
        pw.Lorem(length: 70),
        pw.SizedBox(height: 20),
        pw.Lorem(length: 150),
        pw.SizedBox(height: 20),
        pw.Lorem(length: 250),
        pw.SizedBox(height: 20),
        pw.Lorem(length: 350),
      ],
    ),
  );

  final file = File('footer.pdf');
  await file.writeAsBytes(await pdf.save());
}

pw.Widget _buildFooter(pw.Context context) {
  return pw.Row(
    mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
    crossAxisAlignment: pw.CrossAxisAlignment.end,
    children: [
      pw.Text(
        'Page ${context.pageNumber}/${context.pagesCount}',
        style: const pw.TextStyle(
          fontSize: 12,
          color: PdfColors.blue700,
        ),
      )
    ],
  );
}

The footer consists of a row that contains the current and the total page
numbers.

final title = pw.LoremText();

The lorem methods provide some filler text for the document. This is a common 
practice in desktop publishing when testing.

pdf.addPage(
  pw.MultiPage(
    footer: _buildFooter,
    build: (context) =&gt; [
      pw.Header(level: 1, text: title.sentence(1)),
      pw.SizedBox(height: 20),
      pw.Lorem(length: 50),
      pw.SizedBox(height: 20),
      pw.Lorem(length: 70),
      pw.SizedBox(height: 20),
      pw.Lorem(length: 150),
      pw.SizedBox(height: 20),
      pw.Lorem(length: 250),
      pw.SizedBox(height: 20),
      pw.Lorem(length: 350),
    ],
  ),
);

We have a multi-page document. The creation of the footer is delegated to the 
_buildFooter function.

pw.SizedBox(height: 20),
pw.Lorem(length: 50),

We add some empty space with SizedBox. The Lorem
method adds 50 characters of some latin text.

pw.Widget _buildFooter(pw.Context context) {
  return pw.Row(
    mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
    crossAxisAlignment: pw.CrossAxisAlignment.end,
    children: [
      pw.Text(
        'Page ${context.pageNumber}/${context.pagesCount}',
        style: const pw.TextStyle(
          fontSize: 12,
          color: PdfColors.blue700,
        ),
      )
    ],
  );
}

This builds the footer. It is a row with Text widget. It contains 
the current page number and the count of all pages. Also, we style the text: 
we define its size and colour.

## Dart PDF table

A table is created with the Table widget. It is a complex widget 
having many options.

main.dart
  

import 'dart:io';

import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

class User {
  late String name;
  late String occupation;

  User(String name, String occupation) {
    this.name = name;
    this.occupation = occupation;
  }

  String getIndex(int idx) {
    switch (idx) {
      case 0:
        return name;
      case 1:
        return occupation;
    }
    return '';
  }
}

final users = &lt;User&gt;[
  User("John Doe", "gardener"),
  User("Roder Roe", "driver"),
  User("Joe Smith", "teacher"),
];

void main() async {
  final pdf = pw.Document();

  pdf.addPage(pw.Page(
      pageFormat: PdfPageFormat.a4,
      build: (pw.Context ctx) {
        return genTable(ctx);
      }));

  final file = File('table.pdf');
  await file.writeAsBytes(await pdf.save());
}

pw.Widget genTable(pw.Context ctx) {
  const headers = [
    'Name',
    'Occupation',
  ];

  return pw.Table.fromTextArray(
    border: null,
    cellAlignment: pw.Alignment.centerLeft,
    headerDecoration: pw.BoxDecoration(
      borderRadius: const pw.BorderRadius.all(pw.Radius.circular(1)),
      color: PdfColors.blue500,
    ),
    headerHeight: 25,
    cellHeight: 40,
    cellAlignments: {
      0: pw.Alignment.centerLeft,
      1: pw.Alignment.centerLeft,
    },
    headerStyle: pw.TextStyle(
      color: PdfColors.white,
      fontSize: 10,
      fontWeight: pw.FontWeight.bold,
    ),
    cellStyle: const pw.TextStyle(
      color: PdfColors.blueGrey800,
      fontSize: 10,
    ),
    rowDecoration: pw.BoxDecoration(
      border: pw.Border(
        bottom: pw.BorderSide(
          color: PdfColors.blueGrey900,
          width: .5,
        ),
      ),
    ),
    headers: List&lt;String&gt;.generate(
      headers.length,
      (col) =&gt; headers[col],
    ),
    data: List&lt;List&lt;String&gt;&gt;.generate(
      users.length,
      (row) =&gt; List&lt;String&gt;.generate(
        headers.length,
        (col) =&gt; users[row].getIndex(col),
      ),
    ),
  );
}

We display users in a table.

class User {
  late String name;
  late String occupation;

  User(String name, String occupation) {
    this.name = name;
    this.occupation = occupation;
  }

  String getIndex(int idx) {
    switch (idx) {
      case 0:
        return name;
      case 1:
        return occupation;
    }
    return '';
  }
}

The table displays users. The getIndex method is called by table's
data function. It returns the corresponding fields.

final users = &lt;User&gt;[
  User("John Doe", "gardener"),
  User("Roder Roe", "driver"),
  User("Joe Smith", "teacher"),
];

The datasource for the table is a list of users.

headerHeight: 25,
cellHeight: 40,
cellAlignments: {
  0: pw.Alignment.centerLeft,
  1: pw.Alignment.centerLeft,
},

We have options that define the look of the table. Here we define the header and 
cell heights and cell alignments. 

rowDecoration: pw.BoxDecoration(
  border: pw.Border(
    bottom: pw.BorderSide(
      color: PdfColors.blueGrey900,
      width: .5,
    ),
  ),
),

We define table bottom borders. We set the border colour and size.

headers: List&lt;String&gt;.generate(
  headers.length,
  (col) =&gt; headers[col],
),

We set the headers for the table.

data: List&lt;List&lt;String&gt;&gt;.generate(
  users.length,
  (row) =&gt; List&lt;String&gt;.generate(
    headers.length,
    (col) =&gt; users[row].getIndex(col),
  ),
),

The table is filled with data.

## Source

[Dart pdf library - documentation](https://pub.dev/documentation/pdf/latest/)

In this article we how shown how to generate PDF documents in Dart.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Dart tutorials](/dart/).